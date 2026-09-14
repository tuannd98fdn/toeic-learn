/**
 * passageEvidenceLocator.ts
 * Utility module to extract evidence citations from Part 7 explanations,
 * locate the matching sentences across single/multi passages,
 * and safely inject highlighting markers for smooth scrolling.
 */

export interface EvidenceLocation {
  passageId: string;
  snippet: string;
}

/**
 * Extracts candidate evidence snippets quoted in the explanation HTML.
 */
export function extractEvidenceSnippets(explanation: string): string[] {
  if (!explanation) return [];

  const candidates: string[] = [];
  
  // 1. Quoted text inside <i>...</i> e.g. <i>"..."</i> or <i>'...'</i> or <i>“...”</i>
  const regexItalicQuotes = /<i>["'\u201c\u2018](.*?)["'\u201d\u2019]<\/i>/gi;
  let match: RegExpExecArray | null;
  while ((match = regexItalicQuotes.exec(explanation)) !== null) {
    if (match[1]) candidates.push(match[1]);
  }

  // 2. Regular <i>...</i> text
  const regexItalic = /<i>(.*?)<\/i>/gi;
  while ((match = regexItalic.exec(explanation)) !== null) {
    if (match[1]) candidates.push(match[1]);
  }

  // 3. Standalone quotes "..." with at least 15 characters
  const regexQuotes = /["'\u201c\u2018]([A-Za-z0-9\s,\.\-'\$!?:;/]{15,})["'\u201d\u2019]/gi;
  while ((match = regexQuotes.exec(explanation)) !== null) {
    if (match[1]) candidates.push(match[1]);
  }

  // 4. Bold snippets inside <b>...</b> e.g. specific dates or prices
  const regexBold = /<b>([A-Za-z0-9\s,\.\-'\$]{3,35})<\/b>/gi;
  while ((match = regexBold.exec(explanation)) !== null) {
    if (match[1]) candidates.push(match[1]);
  }

  // Clean and filter candidate snippets
  const cleanedList: string[] = [];
  const seen = new Set<string>();

  for (const raw of candidates) {
    let clean = raw
      .replace(/\\"/g, '"')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Strip leading / trailing ellipses, punctuation, dashes
    clean = clean.replace(/^[\.\s\u2026\-"'\(\)]+|[\.\s\u2026\-"'\(\)]+$/g, '').trim();

    // Discard short Vietnamese translations or meta tags
    const lower = clean.toLowerCase();
    if (
      clean.length < 5 ||
      lower.startsWith('dịch') ||
      lower.startsWith('bằng chứng') ||
      lower.startsWith('mẹo') ||
      lower.startsWith('chọn') ||
      lower.includes('đáp án đúng') ||
      seen.has(lower)
    ) {
      continue;
    }

    seen.add(lower);
    cleanedList.push(clean);
  }

  // Sort by length descending to prioritize full sentences over short words
  return cleanedList.sort((a, b) => b.length - a.length);
}

/**
 * Finds the first passage that contains the evidence snippet.
 */
export function locateEvidenceSnippet(
  snippets: string[],
  passages: { id: string; content: string; type: string }[]
): EvidenceLocation | null {
  if (!snippets.length || !passages.length) return null;

  for (const snippet of snippets) {
    // Break snippet into words
    const words = snippet.split(/\s+/).filter((w) => w.length > 0);
    if (words.length === 0) continue;

    for (const p of passages) {
      let textContent = p.content;
      if (p.type === 'Text Message') {
        try {
          const msgs = JSON.parse(p.content) as { sender: string; text: string }[];
          textContent = msgs.map((m) => `${m.sender}: ${m.text}`).join(' ');
        } catch {
          textContent = p.content;
        }
      }

      // 1. Exact match test
      const normalizedPassage = textContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
      const normalizedSnippet = snippet.toLowerCase();

      if (normalizedPassage.includes(normalizedSnippet)) {
        return { passageId: p.id, snippet };
      }

      // 2. Sub-phrase match for long quotes (e.g. first 5 words or middle window)
      if (words.length >= 4) {
        const first5 = words.slice(0, 5).join(' ').toLowerCase();
        if (normalizedPassage.includes(first5)) {
          return { passageId: p.id, snippet: words.slice(0, 5).join(' ') };
        }

        // Try sliding window of 4 words
        for (let i = 0; i <= words.length - 4; i++) {
          const window4 = words.slice(i, i + 4).join(' ').toLowerCase();
          if (normalizedPassage.includes(window4)) {
            return { passageId: p.id, snippet: words.slice(i, i + 4).join(' ') };
          }
        }
      }
    }
  }

  return null;
}

/**
 * Safely wraps the matching phrase with an animated highlight mark inside HTML content
 * without corrupting surrounding HTML tags.
 */
export function highlightEvidenceInHtml(
  htmlContent: string,
  snippet: string,
  highlightClass: string,
  markerId: string = 'active-evidence-marker'
): { html: string; found: boolean } {
  if (!htmlContent || !snippet) {
    return { html: htmlContent, found: false };
  }

  const words = snippet
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (words.length === 0) {
    return { html: htmlContent, found: false };
  }

  // Match words separated by whitespace or inline HTML tags (e.g., <strong>, <br/>)
  const patternStr = `(${words.join('(?:\\s+|<[^>]+>)+')})`;
  const regex = new RegExp(patternStr, 'i');

  if (regex.test(htmlContent)) {
    const replaced = htmlContent.replace(
      regex,
      `<mark class="${highlightClass}" id="${markerId}">$1</mark>`
    );
    return { html: replaced, found: true };
  }

  // Fallback: If full phrase wasn't matched due to punctuation/differences, try first 4 words
  if (words.length >= 4) {
    const subWords = words.slice(0, 4);
    const subPattern = new RegExp(`(${subWords.join('(?:\\s+|<[^>]+>)+')})`, 'i');
    if (subPattern.test(htmlContent)) {
      const replaced = htmlContent.replace(
        subPattern,
        `<mark class="${highlightClass}" id="${markerId}">$1</mark>`
      );
      return { html: replaced, found: true };
    }
  }

  return { html: htmlContent, found: false };
}
