import React from 'react';
import { VocabularyWord } from '@/data/vocabulary';
import { getWordCandidates } from './stemmer';

export type SearchMode = 'all' | 'en' | 'vi';

export interface BilingualMatchResult {
  matched: boolean;
  score: number;
  matchedField?: 'word' | 'vietnamese' | 'example' | 'mnemonic';
}

/**
 * Normalizes a Vietnamese string by removing diacritical marks (tones)
 * and converting 'đ' / 'Đ' to 'd' / 'D'.
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/**
 * Evaluates whether a vocabulary word matches the search query under the specified search mode.
 * Returns match status, matched field, and priority relevance score for sorting.
 */
export function matchBilingualWord(
  word: VocabularyWord,
  rawQuery: string,
  mode: SearchMode = 'all'
): BilingualMatchResult {
  const query = rawQuery.trim();
  if (!query) {
    return { matched: true, score: 0 };
  }

  const queryLower = query.toLowerCase();
  const queryNorm = removeVietnameseTones(queryLower);
  const englishCandidates = getWordCandidates(queryLower);

  const wordLower = word.word.toLowerCase();
  const vietnameseLower = word.vietnamese.toLowerCase();
  const vietnameseNorm = removeVietnameseTones(vietnameseLower);

  let bestScore = 0;
  let matchedField: 'word' | 'vietnamese' | 'example' | 'mnemonic' | undefined = undefined;

  // 1. Check English (if mode is 'all' or 'en')
  if (mode === 'all' || mode === 'en') {
    // Exact English word match
    if (wordLower === queryLower) {
      return { matched: true, score: 100, matchedField: 'word' };
    }
    // Prefix English word match
    if (wordLower.startsWith(queryLower)) {
      const score = 85;
      if (score > bestScore) {
        bestScore = score;
        matchedField = 'word';
      }
    } else if (wordLower.includes(queryLower)) {
      const score = 70;
      if (score > bestScore) {
        bestScore = score;
        matchedField = 'word';
      }
    }

    // English stemming candidates (e.g. searching "invoices" matches "invoice", "policies" matches "policy")
    for (const cand of englishCandidates) {
      if (wordLower === cand) {
        const score = 90;
        if (score > bestScore) {
          bestScore = score;
          matchedField = 'word';
        }
      } else if (wordLower.startsWith(cand)) {
        const score = 75;
        if (score > bestScore) {
          bestScore = score;
          matchedField = 'word';
        }
      } else if (wordLower.includes(cand)) {
        const score = 65;
        if (score > bestScore) {
          bestScore = score;
          matchedField = 'word';
        }
      }
    }

    // English examples
    if (word.examples && word.examples.length > 0) {
      const inExample = word.examples.some(ex => ex.toLowerCase().includes(queryLower));
      if (inExample && bestScore < 30) {
        bestScore = 30;
        matchedField = 'example';
      }
    }
  }

  // 2. Check Vietnamese (if mode is 'all' or 'vi')
  if (mode === 'all' || mode === 'vi') {
    // Exact Vietnamese match (with tones)
    if (vietnameseLower === queryLower) {
      const score = 95;
      if (score > bestScore) {
        bestScore = score;
        matchedField = 'vietnamese';
      }
    }
    // Exact Vietnamese match (normalized tones)
    else if (vietnameseNorm === queryNorm) {
      const score = 90;
      if (score > bestScore) {
        bestScore = score;
        matchedField = 'vietnamese';
      }
    }
    // Prefix Vietnamese match
    else if (vietnameseNorm.startsWith(queryNorm)) {
      const score = 80;
      if (score > bestScore) {
        bestScore = score;
        matchedField = 'vietnamese';
      }
    }
    // Substring in Vietnamese (direct or tone-removed)
    else if (vietnameseLower.includes(queryLower) || vietnameseNorm.includes(queryNorm)) {
      const score = 65;
      if (score > bestScore) {
        bestScore = score;
        matchedField = 'vietnamese';
      }
    }
  }

  // 3. Check extra context in 'all' mode (mnemonicTip, paraphrasePair)
  if (mode === 'all') {
    // Mnemonic tip
    if (word.mnemonicTip) {
      const mnemLower = word.mnemonicTip.toLowerCase();
      const mnemNorm = removeVietnameseTones(mnemLower);
      if (mnemLower.includes(queryLower) || mnemNorm.includes(queryNorm)) {
        if (bestScore < 35) {
          bestScore = 35;
          matchedField = 'mnemonic';
        }
      }
    }

    // Paraphrase pair explanation
    if (word.paraphrasePair) {
      const { passageText, optionText, explanation } = word.paraphrasePair;
      if (
        passageText.toLowerCase().includes(queryLower) ||
        optionText.toLowerCase().includes(queryLower) ||
        (explanation && (explanation.toLowerCase().includes(queryLower) || removeVietnameseTones(explanation).includes(queryNorm)))
      ) {
        if (bestScore < 30) {
          bestScore = 30;
          matchedField = 'example';
        }
      }
    }
  }

  return {
    matched: bestScore > 0,
    score: bestScore,
    matchedField,
  };
}

/**
 * Highlights matches within text using React nodes. Supports case-insensitive and Vietnamese tone-insensitive matching.
 */
export function highlightMatch(
  text: string,
  rawQuery: string,
  highlightClassName: string = ''
): React.ReactNode {
  if (!text || !rawQuery || !rawQuery.trim()) {
    return text;
  }

  const query = rawQuery.trim();
  const queryLower = query.toLowerCase();
  const queryNorm = removeVietnameseTones(queryLower);

  const textNorm = removeVietnameseTones(text);

  // If normalized lengths don't match (fallback), standard case-insensitive match
  if (textNorm.length !== text.length) {
    const idx = text.toLowerCase().indexOf(queryLower);
    if (idx === -1) return text;
    return React.createElement(
      React.Fragment,
      null,
      text.slice(0, idx),
      React.createElement('mark', { className: highlightClassName }, text.slice(idx, idx + query.length)),
      text.slice(idx + query.length)
    );
  }

  // Find all match ranges using normalized text
  const ranges: { start: number; end: number }[] = [];
  let searchIdx = 0;

  while (searchIdx < textNorm.length) {
    const foundIdx = textNorm.indexOf(queryNorm, searchIdx);
    if (foundIdx === -1) break;

    ranges.push({
      start: foundIdx,
      end: foundIdx + queryNorm.length,
    });
    searchIdx = foundIdx + Math.max(1, queryNorm.length);
  }

  // If no match found via queryNorm, check English stem candidates
  if (ranges.length === 0) {
    const candidates = getWordCandidates(queryLower).filter(c => c.length >= 3);
    for (const cand of candidates) {
      let cIdx = 0;
      while (cIdx < textNorm.length) {
        const fIdx = textNorm.indexOf(cand, cIdx);
        if (fIdx === -1) break;
        ranges.push({
          start: fIdx,
          end: fIdx + cand.length,
        });
        cIdx = fIdx + Math.max(1, cand.length);
      }
      if (ranges.length > 0) break;
    }
  }

  if (ranges.length === 0) {
    return text;
  }

  // Sort and merge overlapping ranges
  ranges.sort((a, b) => a.start - b.start);
  const mergedRanges: { start: number; end: number }[] = [];
  for (const r of ranges) {
    if (mergedRanges.length === 0) {
      mergedRanges.push({ ...r });
    } else {
      const prev = mergedRanges[mergedRanges.length - 1];
      if (r.start <= prev.end) {
        prev.end = Math.max(prev.end, r.end);
      } else {
        mergedRanges.push({ ...r });
      }
    }
  }

  // Build React elements
  const elements: React.ReactNode[] = [];
  let lastIdx = 0;

  mergedRanges.forEach((range, i) => {
    if (range.start > lastIdx) {
      elements.push(text.slice(lastIdx, range.start));
    }
    elements.push(
      React.createElement('mark', { key: i, className: highlightClassName }, text.slice(range.start, range.end))
    );
    lastIdx = range.end;
  });

  if (lastIdx < text.length) {
    elements.push(text.slice(lastIdx));
  }

  return React.createElement(React.Fragment, null, ...elements);
}
