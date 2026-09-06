import fs from 'fs';
import path from 'path';

const normalizeImageUrl = (img?: string): string => {
  if (!img) return '';
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  const cleanImg = img.replace(/^kslearning\//, '');
  return `https://storage.googleapis.com/kslearning/${cleanImg}`;
};

const extractOptionLetter = (str: string): string => {
  const m = str.match(/^\(?([A-D])\)?/i);
  return m ? m[1].toUpperCase() : '';
};

const cleanOptionText = (str: string): string => {
  return str.replace(/^\([A-D]\)\s*/i, '').trim();
};

const main = () => {
  const args = process.argv.slice(2);
  const rawFileArg = args[0] || 'scripts/raw_toeic.json';
  const year = parseInt(args[1] || '2022', 10);
  const testNum = parseInt(args[2] || '1', 10);

  const rawFilePath = path.resolve(rawFileArg);

  if (!fs.existsSync(rawFilePath)) {
    console.error(`File not found: ${rawFilePath}`);
    process.exit(1);
  }

  const rawData: any[] = JSON.parse(fs.readFileSync(rawFilePath, 'utf-8'));

  const TYPE_PART1 = 1636615697542;
  const TYPE_PART2 = 1636615720709;
  const TYPE_PART3 = 1636615725762;
  const TYPE_PART4 = 1636615729794;
  const TYPE_PART5 = 1636615733972;
  const TYPE_PART6 = 1636615742506;
  const TYPE_PART7 = 1636615746924;

  const part1: any[] = [];
  const part2: any[] = [];
  const part3: any[] = [];
  const part4: any[] = [];
  const part5: any[] = [];
  const part6: any[] = [];
  const part7: any[] = [];

  let p1Counter = 1;
  let p2Counter = 7;
  let p3Counter = 32;
  let p4Counter = 71;
  let p5Counter = 101;
  let p6Counter = 131;
  let p7Counter = 147;

  rawData.forEach((card: any) => {
    // PART 1
    if (card.type === TYPE_PART1) {
      const correctText = card.answer?.texts?.[0] || '';
      const choices = [correctText, ...(card.answer?.choices || [])];
      choices.sort((a, b) => a.localeCompare(b));

      const optionsMap: Record<string, string> = { A: '(A)', B: '(B)', C: '(C)', D: '(D)' };
      let correctLabel = 'A';

      choices.forEach((opt: string) => {
        const letter = extractOptionLetter(opt);
        if (letter) {
          const text = cleanOptionText(opt);
          optionsMap[letter] = text || `(${letter})`;
          if (opt === correctText || letter === extractOptionLetter(correctText)) {
            correctLabel = letter;
          }
        }
      });

      part1.push({
        id: card._id,
        number: p1Counter++,
        image: normalizeImageUrl(card.question?.image),
        audioUrl: card.question?.sound || '',
        options: optionsMap,
        correctAnswer: correctLabel,
        transcript: card.answer?.hint || '',
        explanation: card.answer?.hint || '',
      });
    }

    // PART 2
    else if (card.type === TYPE_PART2) {
      const correctText = card.answer?.texts?.[0] || '';
      const choices = [correctText, ...(card.answer?.choices || [])];
      choices.sort((a, b) => a.localeCompare(b));

      const optionsMap: Record<string, string> = { A: '(A)', B: '(B)', C: '(C)' };
      let correctLabel = 'A';

      choices.forEach((opt: string) => {
        const letter = extractOptionLetter(opt);
        if (letter) {
          const text = cleanOptionText(opt);
          optionsMap[letter] = text || `(${letter})`;
          if (opt === correctText || letter === extractOptionLetter(correctText)) {
            correctLabel = letter;
          }
        }
      });

      part2.push({
        id: card._id,
        number: p2Counter++,
        audioUrl: card.question?.sound || '',
        options: optionsMap,
        correctAnswer: correctLabel,
        transcript: card.answer?.hint || '',
        explanation: card.answer?.hint || '',
      });
    }

    // PART 3
    else if (card.type === TYPE_PART3) {
      const parsedQuestions: any[] = [];
      if (card.childCards) {
        card.childCards.forEach((child: any) => {
          const correctText = child.answer?.texts?.[0] || '';
          const choices = [correctText, ...(child.answer?.choices || [])];
          choices.sort((a, b) => a.localeCompare(b));

          const qOptionsMap: Record<string, string> = {};
          let qCorrect = 'A';

          choices.forEach((opt: string) => {
            const letter = extractOptionLetter(opt);
            if (letter) {
              qOptionsMap[letter] = cleanOptionText(opt);
              if (opt === correctText || letter === extractOptionLetter(correctText)) {
                qCorrect = letter;
              }
            }
          });

          // Fallback if no letters parsed
          if (Object.keys(qOptionsMap).length === 0) {
            ['A', 'B', 'C', 'D'].forEach((letter, i) => {
              qOptionsMap[letter] = cleanOptionText(choices[i] || '');
              if (choices[i] === correctText) qCorrect = letter;
            });
          }

          parsedQuestions.push({
            id: child._id,
            number: p3Counter++,
            text: child.question?.text || '',
            options: qOptionsMap,
            correctAnswer: qCorrect,
            explanation: child.answer?.hint || '',
          });
        });
      }

      part3.push({
        id: card._id,
        audioUrl: card.question?.sound || '',
        image: normalizeImageUrl(card.question?.image),
        context: card.question?.text || '',
        transcript: card.answer?.hint || '',
        questions: parsedQuestions,
      });
    }

    // PART 4
    else if (card.type === TYPE_PART4) {
      const parsedQuestions: any[] = [];
      if (card.childCards) {
        card.childCards.forEach((child: any) => {
          const correctText = child.answer?.texts?.[0] || '';
          const choices = [correctText, ...(child.answer?.choices || [])];
          choices.sort((a, b) => a.localeCompare(b));

          const qOptionsMap: Record<string, string> = {};
          let qCorrect = 'A';

          choices.forEach((opt: string) => {
            const letter = extractOptionLetter(opt);
            if (letter) {
              qOptionsMap[letter] = cleanOptionText(opt);
              if (opt === correctText || letter === extractOptionLetter(correctText)) {
                qCorrect = letter;
              }
            }
          });

          if (Object.keys(qOptionsMap).length === 0) {
            ['A', 'B', 'C', 'D'].forEach((letter, i) => {
              qOptionsMap[letter] = cleanOptionText(choices[i] || '');
              if (choices[i] === correctText) qCorrect = letter;
            });
          }

          parsedQuestions.push({
            id: child._id,
            number: p4Counter++,
            text: child.question?.text || '',
            options: qOptionsMap,
            correctAnswer: qCorrect,
            explanation: child.answer?.hint || '',
          });
        });
      }

      part4.push({
        id: card._id,
        audioUrl: card.question?.sound || '',
        image: normalizeImageUrl(card.question?.image),
        context: card.question?.text || '',
        transcript: card.answer?.hint || '',
        questions: parsedQuestions,
      });
    }

    // PART 5
    else if (card.type === TYPE_PART5) {
      if (card.question?.text && card.answer?.texts && card.answer?.choices) {
        const allOptions = [card.answer.texts[0], ...card.answer.choices].sort();
        const optionsMap: Record<string, string> = {};
        const labels = ['A', 'B', 'C', 'D'];
        let correctLabel = 'A';

        allOptions.forEach((opt, idx) => {
          const cleanOpt = opt.replace(/^\([A-D]\)/, '').trim();
          optionsMap[labels[idx]] = cleanOpt;
          if (opt === card.answer?.texts?.[0]) {
            correctLabel = labels[idx];
          }
        });

        part5.push({
          id: card._id,
          number: p5Counter++,
          text: card.question.text,
          options: optionsMap,
          correctAnswer: correctLabel,
          explanation: card.answer.hint || '',
        });
      }
    }

    // PART 6 & PART 7
    else if (card.type === TYPE_PART6 || card.type === TYPE_PART7) {
      const isPart6 = card.type === TYPE_PART6;

      const parsedQuestions: any[] = [];
      if (card.childCards) {
        card.childCards.forEach((child: any) => {
          if (!child.answer?.texts || !child.answer?.choices) return;
          const qOptions = [child.answer.texts[0], ...child.answer.choices].sort();
          const qOptionsMap: Record<string, string> = {};
          const qLabels = ['A', 'B', 'C', 'D'];
          let qCorrect = 'A';

          qOptions.forEach((opt, idx) => {
            const cleanOpt = opt.replace(/^\([A-D]\)/, '').trim();
            qOptionsMap[qLabels[idx]] = cleanOpt;
            if (opt === child.answer?.texts?.[0]) {
              qCorrect = qLabels[idx];
            }
          });

          parsedQuestions.push({
            id: child._id,
            number: isPart6 ? p6Counter++ : p7Counter++,
            text: child.question.text || '',
            options: qOptionsMap,
            correctAnswer: qCorrect,
            explanation: child.answer.hint || '',
          });
        });
      }

      if (isPart6) {
        part6.push({
          id: card._id,
          title: 'Part 6 Passage',
          type: 'Text',
          content: card.question?.hint || card.question?.text || '',
          questions: parsedQuestions,
        });
      } else {
        part7.push({
          id: card._id,
          type: 'Single Passage',
          passages: [
            {
              id: `${card._id}_p1`,
              type: 'Text',
              title: 'Passage',
              content: card.question?.hint || card.question?.text || '',
            },
          ],
          questions: parsedQuestions,
        });
      }
    }
  });

  const outDir = path.resolve(__dirname, `../public/data/ets${year}/test${testNum}`);
  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, 'part1.json'), JSON.stringify(part1, null, 2));
  fs.writeFileSync(path.join(outDir, 'part2.json'), JSON.stringify(part2, null, 2));
  fs.writeFileSync(path.join(outDir, 'part3.json'), JSON.stringify(part3, null, 2));
  fs.writeFileSync(path.join(outDir, 'part4.json'), JSON.stringify(part4, null, 2));
  fs.writeFileSync(path.join(outDir, 'part5.json'), JSON.stringify(part5, null, 2));
  fs.writeFileSync(path.join(outDir, 'part6.json'), JSON.stringify(part6, null, 2));
  fs.writeFileSync(path.join(outDir, 'part7.json'), JSON.stringify(part7, null, 2));

  // Update Index
  const indexFile = path.resolve(__dirname, '../public/data/tests_index.json');
  let indexData: any[] = [];
  if (fs.existsSync(indexFile)) {
    indexData = JSON.parse(fs.readFileSync(indexFile, 'utf-8'));
  }

  const testId = `ets${year}_test${testNum}`;
  if (!indexData.find((t) => t.id === testId)) {
    indexData.push({
      id: testId,
      name: `ETS ${year} - Test ${testNum}`,
      year,
      path: `/data/ets${year}/test${testNum}`,
    });
    fs.writeFileSync(indexFile, JSON.stringify(indexData, null, 2));
  }

  const totalLC =
    part1.length +
    part2.length +
    part3.reduce((s, c) => s + c.questions.length, 0) +
    part4.reduce((s, c) => s + c.questions.length, 0);

  const totalRC =
    part5.length +
    part6.reduce((s, c) => s + c.questions.length, 0) +
    part7.reduce((s, c) => s + c.questions.length, 0);

  console.log(`✅ Successfully parsed ETS ${year} Test ${testNum}`);
  console.log(`🎧 Listening Section (${totalLC} questions):`);
  console.log(`   - Part 1: ${part1.length} questions`);
  console.log(`   - Part 2: ${part2.length} questions`);
  console.log(`   - Part 3: ${part3.length} sets (${part3.reduce((s, c) => s + c.questions.length, 0)} questions)`);
  console.log(`   - Part 4: ${part4.length} sets (${part4.reduce((s, c) => s + c.questions.length, 0)} questions)`);
  console.log(`📖 Reading Section (${totalRC} questions):`);
  console.log(`   - Part 5: ${part5.length} questions`);
  console.log(`   - Part 6: ${part6.length} passages (${part6.reduce((s, c) => s + c.questions.length, 0)} questions)`);
  console.log(`   - Part 7: ${part7.length} sets (${part7.reduce((s, c) => s + c.questions.length, 0)} questions)`);
  console.log(`🎉 TOTAL: ${totalLC + totalRC} questions parsed to ${outDir}`);
};

main();
