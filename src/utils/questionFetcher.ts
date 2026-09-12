import { MistakeData } from '../hooks/useMistakeNotebook';

export interface LoadedQuestion {
  mistakeId: string;
  wrongCount: number;
  testId: string;
  part: string;
  questionId: string;
  qData: any; // The question JSON
  subCategory?: string;
  grammarTag?: string;
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
  
  // Group by testId and normalized part (e.g. 'part1'..'part7')
  interface TargetItem {
    id: string;
    qid: string;
    origPart: string;
  }
  const fetchGroup: Record<string, Record<string, TargetItem[]>> = {};
  
  mistakeIds.forEach(id => {
    const m = mistakes[id];
    if (m && m.type === 'exam' && m.testId && m.part && m.questionId) {
      const partNum = m.part.replace(/^p(art)?/, '');
      const partKey = `part${partNum}`;
      if (!fetchGroup[m.testId]) fetchGroup[m.testId] = {};
      if (!fetchGroup[m.testId][partKey]) fetchGroup[m.testId][partKey] = [];
      fetchGroup[m.testId][partKey].push({ id, qid: m.questionId, origPart: m.part });
    }
  });

  for (const testId of Object.keys(fetchGroup)) {
    // e.g. testId = 'ets2022_test1'
    const match = testId.match(/ets(\d+)_test(\d+)/);
    if (!match) continue;
    const pathBase = `/data/ets${match[1]}/test${match[2]}`;

    for (const partKey of Object.keys(fetchGroup[testId])) {
      try {
        const res = await fetch(`${pathBase}/${partKey}.json`);
        if (!res.ok) continue;
        const partData = await res.json();
        const partNum = partKey.replace('part', '');
        
        // For parts 3,4,6,7, questions might be nested under sets/passages
        const flattenQuestions = (data: any, pNum: string) => {
          let flat: any[] = [];
          if (['1', '2', '5'].includes(pNum)) {
            flat = data;
          } else if (['3', '4'].includes(pNum)) {
            data.forEach((set: any) => {
              if (set.questions) {
                set.questions.forEach((q: any) => {
                  flat.push({ ...q, audioUrl: set.audioUrl, image: set.image, transcript: set.transcript });
                });
              }
            });
          } else if (['6', '7'].includes(pNum)) {
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
        
        const flatQuestions = flattenQuestions(partData, partNum);
        const neededItems = fetchGroup[testId][partKey];
        
        neededItems.forEach(({ id, qid, origPart }) => {
          const q = flatQuestions.find((item: any) => item.id === qid);
          if (q) {
            results.push({
              mistakeId: id,
              wrongCount: mistakes[id]?.wrongCount || 1,
              testId,
              part: origPart,
              questionId: qid,
              qData: q,
              subCategory: mistakes[id]?.subCategory || q.subCategory || q.type,
              grammarTag: mistakes[id]?.grammarTag || q.grammarTag
            });
          }
        });
      } catch (err) {
        console.error(`Error loading ${testId} ${partKey}`, err);
      }
    }
  }
  
  return results;
};
