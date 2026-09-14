import { NextResponse } from 'next/server';
import { BILINGUAL_LEXICON } from '@/data/bilingualLexicon';
import { getWordCandidates } from '@/utils/stemmer';

interface DictResponse {
  word: string;
  ipa?: string;
  partOfSpeech?: string;
  vietnamese?: string;
  definition?: string;
  example?: string;
  targetBand?: string;
  source?: 'lexicon' | 'api';
}

// In-memory server cache for 0ms sub-millisecond response
const memoryCache = new Map<string, DictResponse>();

// Clean up phonetic text: e.g. "/ 'vælju:z/ " -> "/ˈvælju:z/"
function formatIpa(rawIpa: string): string {
  if (!rawIpa) return '';
  const trimmed = rawIpa.trim().replace(/^\/+|\/+$/g, '').trim();
  return trimmed ? `/${trimmed}/` : '';
}

// Fast bilingual translation engine
async function translateToVietnamese(word: string): Promise<string> {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  // 1. Primary: Gemini 3.6-flash with 1800ms strict timeout
  if (geminiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Dịch từ tiếng Anh "${word}" sang tiếng Việt trong ngữ cảnh công sở / bài thi TOEIC. Chỉ trả về 1 nghĩa tiếng Việt ngắn gọn nhất (tối đa 4 từ), không giải thích, không emoji, không dấu ngoặc kép.`,
                  },
                ],
              },
            ],
          }),
        }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text) {
          return text.replace(/^["'`]|["'`]$/g, '').trim();
        }
      }
    } catch (e) {
      // Proceed to secondary fallback on timeout/error
    }
  }

  // 2. Secondary Fast Fallback: MyMemory Translation API with 1200ms timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|vi`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const text = data?.responseData?.translatedText;
      if (text && typeof text === 'string' && !text.toLowerCase().includes('mymemory')) {
        return text.trim().toLowerCase();
      }
    }
  } catch (e) {
    // Silent fail
  }

  return '';
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawWord = searchParams.get('word')?.trim().toLowerCase();

    if (!rawWord) {
      return NextResponse.json({ error: 'Thiếu từ cần tra' }, { status: 400 });
    }

    // Clean word: keep letters, hyphens
    const cleanWord = rawWord.replace(/[^a-zA-Z\s-]/g, '').trim();
    if (!cleanWord) {
      return NextResponse.json({ error: 'Từ không hợp lệ' }, { status: 400 });
    }

    // Tier 0: In-memory cache check (0ms)
    if (memoryCache.has(cleanWord)) {
      return NextResponse.json(memoryCache.get(cleanWord));
    }

    // Tier 1: Check BILINGUAL_LEXICON with lemmatizer candidates (0ms)
    const candidates = getWordCandidates(cleanWord);
    for (const cand of candidates) {
      const entry = BILINGUAL_LEXICON[cand];
      if (entry) {
        const responseData: DictResponse = {
          word: cleanWord,
          ipa: entry.ipa,
          partOfSpeech: entry.pos,
          vietnamese: entry.vi,
          targetBand: entry.band || '450+',
          example: entry.example,
          source: 'lexicon',
        };
        memoryCache.set(cleanWord, responseData);
        return NextResponse.json(responseData);
      }
    }

    // Tier 2: Outside lexicon -> Fetch Free Dictionary API + Parallel Translation
    let ipa = '';
    let partOfSpeech = 'Từ vựng';
    let definition = '';
    let example = '';

    // Run Free Dictionary fetch with 1500ms timeout
    const fetchDictPromise = (async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`,
          { signal: controller.signal, next: { revalidate: 86400 } }
        );
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const entry = data[0];
            if (entry.phonetic) {
              ipa = formatIpa(entry.phonetic);
            } else if (Array.isArray(entry.phonetics)) {
              const phon = entry.phonetics.find((p: any) => p.text);
              if (phon) ipa = formatIpa(phon.text);
            }

            if (Array.isArray(entry.meanings) && entry.meanings.length > 0) {
              const m = entry.meanings[0];
              const posMap: Record<string, string> = {
                noun: 'Danh từ',
                verb: 'Động từ',
                adjective: 'Tính từ',
                adverb: 'Trạng từ',
                preposition: 'Giới từ',
                conjunction: 'Liên từ',
                pronoun: 'Đại từ',
                interjection: 'Thán từ',
              };
              partOfSpeech = posMap[m.partOfSpeech] || m.partOfSpeech || 'Từ vựng';

              if (Array.isArray(m.definitions) && m.definitions.length > 0) {
                definition = m.definitions[0].definition || '';
                example = m.definitions[0].example || '';
              }
            }
          }
        }
      } catch (err) {
        // Free Dictionary API failed or timed out
      }
    })();

    // Run translation in parallel
    const [_, vietnamese] = await Promise.all([
      fetchDictPromise,
      translateToVietnamese(cleanWord),
    ]);

    // Construct response - NEVER put English definition in vietnamese field!
    const result: DictResponse = {
      word: cleanWord,
      ipa: ipa || '',
      partOfSpeech,
      vietnamese: vietnamese || cleanWord,
      definition,
      example,
      targetBand: 'Cơ bản',
      source: 'api',
    };

    memoryCache.set(cleanWord, result);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Quick dict error:', error);
    return NextResponse.json({ error: error.message || 'Lỗi tra cứu từ' }, { status: 500 });
  }
}
