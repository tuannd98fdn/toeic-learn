import { NextResponse } from 'next/server';

interface DictResponse {
  word: string;
  ipa?: string;
  partOfSpeech?: string;
  vietnamese?: string;
  definition?: string;
  example?: string;
}

// In-memory cache for speed during session
const memoryCache = new Map<string, DictResponse>();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawWord = searchParams.get('word')?.trim().toLowerCase();

    if (!rawWord) {
      return NextResponse.json({ error: 'Thiếu từ cần tra' }, { status: 400 });
    }

    // Clean word: remove numbers, punctuation
    const cleanWord = rawWord.replace(/[^a-zA-Z\s-]/g, '').trim();
    if (!cleanWord) {
      return NextResponse.json({ error: 'Từ không hợp lệ' }, { status: 400 });
    }

    if (memoryCache.has(cleanWord)) {
      return NextResponse.json(memoryCache.get(cleanWord));
    }

    let ipa = '';
    let partOfSpeech = 'Từ vựng';
    let definition = '';
    let example = '';

    // 1. Fetch from Free Dictionary API (0 latency, open source, no key needed)
    try {
      const freeDictRes = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`,
        { next: { revalidate: 86400 } }
      );

      if (freeDictRes.ok) {
        const data = await freeDictRes.json();
        if (Array.isArray(data) && data.length > 0) {
          const entry = data[0];
          
          // Extract IPA
          if (entry.phonetic) {
            ipa = entry.phonetic;
          } else if (Array.isArray(entry.phonetics)) {
            const phon = entry.phonetics.find((p: any) => p.text);
            if (phon) ipa = phon.text;
          }

          // Extract part of speech and definition
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
    } catch (dictErr) {
      console.warn('Free Dictionary API lookup failed:', dictErr);
    }

    // 2. Try simple translation or Google Generative AI if key exists
    let vietnamese = '';

    // If we have Gemini API Key, try quick contextual translation
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (geminiKey) {
      try {
        const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
        const { generateText } = await import('ai');
        const google = createGoogleGenerativeAI({ apiKey: geminiKey });

        const prompt = `Dịch từ tiếng Anh "${cleanWord}" sang tiếng Việt trong ngữ cảnh công sở / bài thi TOEIC. Chỉ trả về 1 nghĩa tiếng Việt ngắn gọn nhất (tối đa 4 từ), không giải thích gì thêm, không dùng emoji.`;
        const { text } = await generateText({
          model: google('gemini-2.0-flash'),
          prompt,
        });

        if (text) {
          vietnamese = text.trim().replace(/^["']|["']$/g, '');
        }
      } catch (aiErr) {
        console.warn('AI translation fallback error:', aiErr);
      }
    }

    // Default fallback if no vietnamese found
    if (!vietnamese && definition) {
      vietnamese = definition.slice(0, 60);
    } else if (!vietnamese) {
      vietnamese = cleanWord;
    }

    const result: DictResponse = {
      word: cleanWord,
      ipa: ipa || '',
      partOfSpeech,
      vietnamese,
      definition,
      example,
    };

    memoryCache.set(cleanWord, result);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Quick dict error:', error);
    return NextResponse.json({ error: error.message || 'Lỗi tra cứu từ' }, { status: 500 });
  }
}
