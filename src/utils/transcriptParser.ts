/**
 * Utility for parsing ETS TOEIC transcripts, tokenized word diffing, and Cloze blank generation.
 * Zero external dependencies, pure TypeScript, fast and robust.
 */

export interface TranscriptLine {
  id: string;
  speaker?: string; // 'W', 'M', 'Q', 'A', 'B', 'C', 'D', 'Narrator'
  speakerLabel?: string; // 'Người phụ nữ', 'Người đàn ông', 'Câu hỏi', 'Đáp án (A)', etc.
  text: string;
  isCorrect?: boolean;
}

export interface WordDiffToken {
  word: string;
  status: 'correct' | 'incorrect' | 'missing' | 'extra';
  expected?: string;
}

export interface WordDiffResult {
  tokens: WordDiffToken[];
  accuracy: number; // 0 - 100
  correctWords: number;
  totalWords: number;
  isPassed: boolean; // accuracy >= 80%
}

export interface ClozeBlankItem {
  id: string;
  originalWord: string;
  cleanWord: string;
  isMasked: boolean;
  hintLetter: string;
}

/**
 * Speaks a sentence or word with en-US pronunciation using the native Web Speech API.
 * 0 latency, 0 bundle size, works across modern browsers.
 */
export function speakSentence(text: string, rate: number = 0.95): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore if speech synthesis is not permitted or fails
  }
}

/**
 * Strips HTML tags and decodes common HTML entities.
 */
export function cleanHtmlText(html: string): string {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalizes a word for comparison: lowercases and strips leading/trailing punctuation.
 */
export function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/^[^\w\s]+|[^\w\s]+$/g, '')
    .trim();
}

/**
 * Parses raw HTML transcripts from ETS Part 1 - 4 into structured TranscriptLine items.
 */
export function parseTranscript(
  rawHtml: string,
  part: 'part1' | 'part2' | 'part3' | 'part4',
  correctAnswer?: string
): TranscriptLine[] {
  if (!rawHtml) return [];

  // Break by <br>, <p>, or newlines
  const htmlWithNewlines = rawHtml
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/div>/gi, '\n');

  const rawLines = htmlWithNewlines
    .split('\n')
    .map(line => cleanHtmlText(line))
    .filter(line => line.length > 0 && !line.toLowerCase().startsWith('transcript'));

  const result: TranscriptLine[] = [];

  if (part === 'part1') {
    // Expected lines: (A) ... (B) ... (C) ... (D) ...
    rawLines.forEach((line, idx) => {
      const match = line.match(/^\(([A-D])\)\s*(.*)/i);
      if (match) {
        const optionLetter = match[1].toUpperCase();
        const text = match[2].trim();
        result.push({
          id: `p1_line_${idx}`,
          speaker: optionLetter,
          speakerLabel: `Lựa chọn (${optionLetter})`,
          text: text,
          isCorrect: optionLetter === correctAnswer?.toUpperCase(),
        });
      } else if (line.trim()) {
        result.push({
          id: `p1_line_${idx}`,
          speaker: String.fromCharCode(65 + idx),
          speakerLabel: `Lựa chọn (${String.fromCharCode(65 + idx)})`,
          text: line.trim(),
          isCorrect: String.fromCharCode(65 + idx) === correctAnswer?.toUpperCase(),
        });
      }
    });
  } else if (part === 'part2') {
    // Expected format: First line is the prompt/question, subsequent lines are (A), (B), (C)
    let promptFound = false;
    rawLines.forEach((line, idx) => {
      const optionMatch = line.match(/^\(([A-C])\)\s*(.*)/i);
      if (optionMatch) {
        const optionLetter = optionMatch[1].toUpperCase();
        const text = optionMatch[2].trim();
        result.push({
          id: `p2_line_${idx}`,
          speaker: optionLetter,
          speakerLabel: `Đáp án (${optionLetter})`,
          text: text,
          isCorrect: optionLetter === correctAnswer?.toUpperCase(),
        });
      } else if (!promptFound && line.trim()) {
        promptFound = true;
        result.push({
          id: `p2_prompt`,
          speaker: 'Q',
          speakerLabel: 'Câu hỏi / Phát biểu',
          text: line.trim(),
        });
      }
    });
  } else if (part === 'part3') {
    // Expected format: W: ... M: ... or W-Am: ... M-Au: ...
    rawLines.forEach((line, idx) => {
      const speakerMatch = line.match(/^([WwMmBbGg][\w-]*)\s*:\s*(.*)/);
      if (speakerMatch) {
        const rawSpeaker = speakerMatch[1].toUpperCase();
        const isWoman = rawSpeaker.startsWith('W') || rawSpeaker.startsWith('G');
        const text = speakerMatch[2].trim();
        result.push({
          id: `p3_line_${idx}`,
          speaker: isWoman ? 'W' : 'M',
          speakerLabel: isWoman ? 'Người phụ nữ (Woman)' : 'Người đàn ông (Man)',
          text: text,
        });
      } else if (line.trim()) {
        result.push({
          id: `p3_line_${idx}`,
          speaker: 'Narrator',
          speakerLabel: 'Người nói',
          text: line.trim(),
        });
      }
    });
  } else {
    // Part 4: Short Talks (Monologue)
    // Strip ETS question indicators like (71), (72), (73)
    rawLines.forEach((line) => {
      let cleanLine = line.replace(/\(\d{1,3}\)/g, '').replace(/\s+/g, ' ').trim();
      if (!cleanLine) return;

      let speaker = 'Narrator';
      let speakerLabel = 'Người thuyết trình / Độc thoại';

      const speakerMatch = cleanLine.match(/^([WwMm][\w-]*)\s*:\s*(.*)/);
      if (speakerMatch) {
        const isWoman = speakerMatch[1].toUpperCase().startsWith('W');
        speaker = isWoman ? 'W' : 'M';
        speakerLabel = isWoman ? 'Người nói (Woman)' : 'Người nói (Man)';
        cleanLine = speakerMatch[2].trim();
      }

      // Split monologue into sentences, protecting titles like Dr., Mr., Ms., Mrs., Prof.
      const protectedText = cleanLine.replace(/\b(Dr|Mr|Ms|Mrs|Prof|Sr|Jr|Inc|Ltd|Co|vs)\.\s+/gi, '$1.__PROTECTED_DOT__ ');
      const sentences = protectedText
        .split(/(?<=[.?!])\s+/)
        .map(s => s.replace(/__PROTECTED_DOT__/g, '').trim())
        .filter(s => s.length > 0);

      sentences.forEach((sentence, sIdx) => {
        result.push({
          id: `p4_line_${result.length}_${sIdx}`,
          speaker,
          speakerLabel,
          text: sentence,
        });
      });
    });
  }

  // Fallback if parsing resulted in empty array: split raw string by sentence
  if (result.length === 0 && cleanHtmlText(rawHtml)) {
    const fullText = cleanHtmlText(rawHtml);
    const protectedText = fullText.replace(/\b(Dr|Mr|Ms|Mrs|Prof|Sr|Jr|Inc|Ltd|Co|vs)\.\s+/gi, '$1.__PROTECTED_DOT__ ');
    const sentences = protectedText
      .split(/(?<=[.?!])\s+/)
      .map(s => s.replace(/__PROTECTED_DOT__/g, '').trim())
      .filter(s => s.length > 0);
    sentences.forEach((s, idx) => {
      result.push({
        id: `fallback_${idx}`,
        speaker: 'Narrator',
        speakerLabel: 'Câu thoại',
        text: s.trim(),
      });
    });
  }

  return result;
}

/**
 * Word diffing algorithm to evaluate user typed transcription against target text.
 * Uses sequence alignment to highlight correct, incorrect, and missing words.
 */
export function diffWords(targetText: string, userInputText: string): WordDiffResult {
  const targetWords = targetText.split(/\s+/).filter(w => w.length > 0);
  const userWords = userInputText.split(/\s+/).filter(w => w.length > 0);

  if (targetWords.length === 0) {
    return {
      tokens: [],
      accuracy: 100,
      correctWords: 0,
      totalWords: 0,
      isPassed: true,
    };
  }

  const tokens: WordDiffToken[] = [];
  let correctCount = 0;

  // Simple token alignment using dynamic programming or two-pointer lookahead
  let targetIdx = 0;
  let userIdx = 0;

  while (targetIdx < targetWords.length || userIdx < userWords.length) {
    if (targetIdx >= targetWords.length) {
      // Extra words typed by user
      tokens.push({
        word: userWords[userIdx],
        status: 'extra',
      });
      userIdx++;
      continue;
    }

    if (userIdx >= userWords.length) {
      // Remaining target words are missing
      tokens.push({
        word: targetWords[targetIdx],
        status: 'missing',
      });
      targetIdx++;
      continue;
    }

    const tNorm = normalizeWord(targetWords[targetIdx]);
    const uNorm = normalizeWord(userWords[userIdx]);

    if (tNorm === uNorm) {
      tokens.push({
        word: targetWords[targetIdx],
        status: 'correct',
      });
      correctCount++;
      targetIdx++;
      userIdx++;
    } else {
      // Check if user missed one word (lookahead 1 in target)
      const nextTNorm = targetIdx + 1 < targetWords.length ? normalizeWord(targetWords[targetIdx + 1]) : null;
      const nextUNorm = userIdx + 1 < userWords.length ? normalizeWord(userWords[userIdx + 1]) : null;

      if (nextTNorm && nextTNorm === uNorm) {
        // Target word at targetIdx was skipped
        tokens.push({
          word: targetWords[targetIdx],
          status: 'missing',
        });
        targetIdx++;
      } else if (nextUNorm && nextUNorm === tNorm) {
        // User typed an extra word
        tokens.push({
          word: userWords[userIdx],
          status: 'extra',
        });
        userIdx++;
      } else {
        // Mismatched / typo word
        tokens.push({
          word: userWords[userIdx],
          status: 'incorrect',
          expected: targetWords[targetIdx],
        });
        targetIdx++;
        userIdx++;
      }
    }
  }

  const accuracy = Math.min(100, Math.max(0, Math.round((correctCount / targetWords.length) * 100)));

  return {
    tokens,
    accuracy,
    correctWords: correctCount,
    totalWords: targetWords.length,
    isPassed: accuracy >= 80,
  };
}

/**
 * Generates Cloze Blank items for gap-filling dictation mode.
 * Masks key content words (length >= 4 or specific patterns), leaving punctuation intact.
 */
export function generateClozeBlanks(text: string, blankPercentage: number = 0.4): ClozeBlankItem[] {
  const rawWords = text.split(/\s+/).filter(w => w.length > 0);
  const commonStopwords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use']);

  const eligibleIndices: number[] = [];
  rawWords.forEach((word, idx) => {
    const clean = normalizeWord(word);
    if (clean.length >= 3 && !commonStopwords.has(clean)) {
      eligibleIndices.push(idx);
    }
  });

  // Pick target blanks based on percentage (at least 1, at most 60%)
  const numBlanks = Math.max(1, Math.min(eligibleIndices.length, Math.round(rawWords.length * blankPercentage)));
  
  // Pick evenly spaced indices
  const maskedSet = new Set<number>();
  if (eligibleIndices.length > 0) {
    const step = Math.max(1, Math.floor(eligibleIndices.length / numBlanks));
    for (let i = 0; i < eligibleIndices.length && maskedSet.size < numBlanks; i += step) {
      maskedSet.add(eligibleIndices[i]);
    }
  }

  return rawWords.map((word, idx) => {
    const clean = normalizeWord(word);
    const isMasked = maskedSet.has(idx);
    return {
      id: `blank_${idx}`,
      originalWord: word,
      cleanWord: clean,
      isMasked,
      hintLetter: clean.length > 0 ? clean[0].toUpperCase() : '',
    };
  });
}
