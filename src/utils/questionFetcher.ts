import { MistakeData } from '../hooks/useMistakeNotebook';

export interface LoadedQuestion {
  mistakeId: string;
  wrongCount: number;
  testId: string;
  part: string;
  questionId: string;
  qData: any; // The question JSON
}

/**
 * Fetches question data for a list of mistake IDs.
 * Groups fetches by test and part to minimize network requests.
 */
export const fetchMistakeQuestions = async (
  mistakeIds: string[],
  mistakes: MistakeData
): Promise<LoadedQuestion[]> => {
  const results: LoadedQuestion[] = [];
  
  // Group by testId and part to minimize fetch calls
  const fetchGroup: Record<string, Record<string, string[]>> = {};
  
  mistakeIds.forEach(id => {
    const m = mistakes[id];
    if (m && m.type === 'exam' && m.testId && m.part && m.questionId) {
      if (!fetchGroup[m.testId]) fetchGroup[m.testId] = {};
      if (!fetchGroup[m.testId][m.part]) fetchGroup[m.testId][m.part] = [];
      fetchGroup[m.testId][m.part].push(m.questionId);
    }
  });

  for (const testId of Object.keys(fetchGroup)) {
    // e.g. testId = 'ets2022_test1'
    const match = testId.match(/ets(\d+)_test(\d+)/);
    if (!match) continue;
    const pathBase = `/data/ets${match[1]}/test${match[2]}`;

    for (const part of Object.keys(fetchGroup[testId])) {
      try {
        const res = await fetch(`${pathBase}/${part}.json`);
        if (!res.ok) continue;
        const partData = await res.json();
        
        // For parts 3,4,6,7, questions might be nested under sets/passages
        const flattenQuestions = (data: any, partType: string) => {
          let flat: any[] = [];
          if (['p1', 'p2', 'p5'].includes(partType)) {
            flat = data;
          } else if (['p3', 'p4'].includes(partType)) {
            data.forEach((set: any) => {
              if (set.questions) {
                set.questions.forEach((q: any) => {
                  flat.push({ ...q, audioUrl: set.audioUrl, image: set.image, transcript: set.transcript });
                });
              }
            });
          } else if (['p6', 'p7'].includes(partType)) {
            data.forEach((passage: any) => {
              const passageContent = passage.passages 
                ? passage.passages.map((p: any) => p.content).join('\n\n') 
                : passage.content;
              if (passage.questions) {
                passage.questions.forEach((q: any) => {
                  flat.push({ ...q, passageText: passageContent });
                });
              }
            });
          }
          return flat;
        };
        
        const flatQuestions = flattenQuestions(partData, part);
        const neededIds = fetchGroup[testId][part];
        
        neededIds.forEach(qid => {
          const q = flatQuestions.find((item: any) => item.id === qid);
          if (q) {
            const mistakeId = `exam_${testId}_${part}_${qid}`;
            results.push({
              mistakeId,
              wrongCount: mistakes[mistakeId]?.wrongCount || 1,
              testId,
              part,
              questionId: qid,
              qData: q
            });
          }
        });
      } catch (err) {
        console.error(`Error loading ${testId} ${part}`, err);
      }
    }
  }
  
  return results;
};
