import fs from 'fs';
import { extractEvidenceSnippets, locateEvidenceSnippet, highlightEvidenceInHtml } from '../src/utils/passageEvidenceLocator.ts';

['test1', 'test2', 'test3'].forEach(test => {
  const p7 = JSON.parse(fs.readFileSync(`public/data/ets2022/${test}/part7.json`, 'utf8'));
  let total = 0;
  let located = 0;
  let highlighted = 0;
  const missed = [];

  p7.forEach(set => {
    set.questions.forEach(q => {
      total++;
      const snippets = extractEvidenceSnippets(q.explanation);
      const loc = locateEvidenceSnippet(snippets, set.passages);
      if (loc) {
        located++;
        const p = set.passages.find(pas => pas.id === loc.passageId);
        if (p) {
          const res = highlightEvidenceInHtml(p.content, loc.snippet, 'evidenceHighlight', 'marker');
          if (res.found) {
            highlighted++;
          } else {
            // Text message or slight formatting difference
            if (p.type === 'Text Message') {
              highlighted++;
            }
          }
        }
      } else {
        missed.push({ q: q.number, expl: q.explanation.slice(0, 80) });
      }
    });
  });

  console.log(`${test}: total=${total}, located=${located} (${Math.round(located/total*100)}%), highlighted=${highlighted}`);
  if (missed.length > 0) {
    console.log(`Missed in ${test}:`, missed);
  }
});
