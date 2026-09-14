/**
 * Smart Word Stemmer / Lemmatizer for TOEIC Vocabulary Matching
 * Generates candidate root forms (lemmas) for inflected words:
 * - Plural nouns / 3rd person singular verbs (-s, -es, -ies)
 * - Past tense / past participle verbs (-ed, -ied)
 * - Continuous participles (-ing)
 * - Adverbs (-ly, -ily)
 * - Comparatives / Superlatives (-er, -est)
 */

export function getWordCandidates(raw: string): string[] {
  if (!raw) return [];
  const w = raw.toLowerCase().trim().replace(/^[^\w]+|[^\w]+$/g, '');
  if (!w) return [];

  const candidates = new Set<string>();
  // 1. Exact form is always first priority
  candidates.add(w);

  // 2. Plural / 3rd person singular
  if (w.endsWith('ies') && w.length > 4) {
    candidates.add(w.slice(0, -3) + 'y'); // e.g. policies -> policy
  } else if (w.endsWith('es') && w.length > 3) {
    candidates.add(w.slice(0, -2)); // e.g. boxes -> box
    candidates.add(w.slice(0, -1)); // e.g. values -> value, charges -> charge
  } else if (w.endsWith('s') && !w.endsWith('ss') && w.length > 2) {
    candidates.add(w.slice(0, -1)); // e.g. values -> value, reports -> report
  }

  // 3. Past tense / past participle -ed
  if (w.endsWith('ied') && w.length > 4) {
    candidates.add(w.slice(0, -3) + 'y'); // e.g. modified -> modify
  } else if (w.endsWith('ed') && w.length > 3) {
    candidates.add(w.slice(0, -2)); // e.g. checked -> check
    candidates.add(w.slice(0, -1)); // e.g. agreed -> agree, created -> create
    
    // Handle double consonants: e.g. dropped -> drop, submitted -> submit
    const withoutEd = w.slice(0, -2);
    if (
      withoutEd.length >= 3 &&
      withoutEd[withoutEd.length - 1] === withoutEd[withoutEd.length - 2]
    ) {
      candidates.add(withoutEd.slice(0, -1));
    }
  }

  // 4. Present participle / gerund -ing
  if (w.endsWith('ing') && w.length > 4) {
    candidates.add(w.slice(0, -3)); // e.g. asking -> ask
    candidates.add(w.slice(0, -3) + 'e'); // e.g. housing -> house, creating -> create
    
    // Handle double consonants: e.g. running -> run, planning -> plan
    const withoutIng = w.slice(0, -3);
    if (
      withoutIng.length >= 3 &&
      withoutIng[withoutIng.length - 1] === withoutIng[withoutIng.length - 2]
    ) {
      candidates.add(withoutIng.slice(0, -1));
    }
  }

  // 5. Adverb -ly
  if (w.endsWith('ly') && w.length > 4) {
    candidates.add(w.slice(0, -2)); // e.g. quickly -> quick, significantly -> significant
    if (w.endsWith('ily')) {
      candidates.add(w.slice(0, -3) + 'y'); // e.g. easily -> easy
    }
  }

  // 6. Comparative / Superlative
  if (w.endsWith('er') && w.length > 3) {
    candidates.add(w.slice(0, -2)); // e.g. higher -> high
    candidates.add(w.slice(0, -1)); // e.g. larger -> large
  }
  if (w.endsWith('est') && w.length > 4) {
    candidates.add(w.slice(0, -3)); // e.g. highest -> high
    candidates.add(w.slice(0, -2)); // e.g. largest -> large
  }

  return Array.from(candidates);
}
