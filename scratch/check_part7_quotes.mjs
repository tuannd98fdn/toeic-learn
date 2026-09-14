import fs from 'fs';

['test1', 'test2', 'test3'].forEach(test => {
  const p7 = JSON.parse(fs.readFileSync(`public/data/ets2022/${test}/part7.json`, 'utf8'));
  let totalQ = 0;
  let matched = 0;
  const missing = [];
  
  p7.forEach(set => {
    const rawPassage = set.passages.map(p => {
      let c = p.content;
      if (p.type === 'Text Message') {
        try {
          const msgs = JSON.parse(c);
          return msgs.map(m => `${m.sender}: ${m.text}`).join(' ');
        } catch (e) {
          return c;
        }
      }
      return c;
    }).join(' ');

    const cleanPassage = rawPassage.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();

    set.questions.forEach(q => {
      totalQ++;
      // find quotes in <i>...</i>
      const regexQuotes = /<i>["'\u201c\u2018](.*?)["'\u201d\u2019]<\/i>|<i>(.*?)<\/i>|["'\u201c\u2018]([A-Za-z0-9\s,\.\-'\$]{15,})["'\u201d\u2019]/gi;
      let match;
      let found = false;
      let bestSnippet = '';

      while ((match = regexQuotes.exec(q.explanation)) !== null) {
        const candidate = (match[1] || match[2] || match[3] || '').replace(/\\"/g, '"').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const cleanCand = candidate.replace(/^[\.\s\u2026\-]+|[\.\s\u2026\-]+$/g, '').toLowerCase();
        
        // Discard short Vietnamese translations or short tags
        if (cleanCand.length < 10) continue;
        if (cleanCand.includes('dịch') || cleanCand.includes('chọn đáp án')) continue;

        // Check matching
        // Try entire phrase
        if (cleanPassage.includes(cleanCand)) {
          found = true;
          bestSnippet = cleanCand;
          break;
        }
        // Try first 25 chars
        const head = cleanCand.slice(0, 25).trim();
        if (head.length >= 15 && cleanPassage.includes(head)) {
          found = true;
          bestSnippet = head;
          break;
        }
        // Try any 4-word window
        const words = cleanCand.split(' ').filter(w => w.length > 2);
        if (words.length >= 4) {
          for (let i = 0; i <= words.length - 4; i++) {
            const sub = words.slice(i, i + 4).join(' ');
            if (cleanPassage.includes(sub)) {
              found = true;
              bestSnippet = sub;
              break;
            }
          }
        }
        if (found) break;
      }

      if (found) {
        matched++;
      } else {
        missing.push({ qNum: q.number, expl: q.explanation.slice(0, 120) });
      }
    });
  });
  console.log(`${test}: total=${totalQ}, matched=${matched} (${Math.round(matched/totalQ*100)}%)`);
  if (missing.length > 0) {
    console.log(`Sample missing in ${test} (${missing.length}):`, missing.slice(0, 3));
  }
});
