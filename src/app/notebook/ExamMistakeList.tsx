'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MistakeData } from '@/hooks/useMistakeNotebook';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import styles from './page.module.css';

interface ExamMistakeListProps {
  mistakeIds: string[];
  mistakes: MistakeData;
}

interface LoadedQuestion {
  mistakeId: string;
  wrongCount: number;
  testId: string;
  part: string;
  questionId: string;
  qData: any; // The question JSON
}

export default function ExamMistakeList({ mistakeIds, mistakes }: ExamMistakeListProps) {
  const [loadedQuestions, setLoadedQuestions] = useState<LoadedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const results: LoadedQuestion[] = [];
      
      // Group by testId and part to minimize fetch calls
      const fetchGroup: Record<string, Record<string, string[]>> = {};
      
      mistakeIds.forEach(id => {
        const m = mistakes[id];
        if (m.type === 'exam' && m.testId && m.part && m.questionId) {
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
      
      results.sort((a, b) => b.wrongCount - a.wrongCount);
      setLoadedQuestions(results);
      setLoading(false);
    };

    if (mistakeIds.length > 0) {
      fetchQuestions();
    } else {
      setLoadedQuestions([]);
      setLoading(false);
    }
  }, [mistakeIds, mistakes]);

  if (loading) {
    return <div>Đang tải dữ liệu câu hỏi sai...</div>;
  }
  
  if (loadedQuestions.length === 0) {
    return (
      <div className={`${styles.emptyState} card-minimal animate-slide-up`}>
        <h2>Không có câu hỏi đề thi nào!</h2>
        <p>Bạn chưa sai câu hỏi nào trong phần thi thử.</p>
        <Link href="/practice" className={styles.primaryBtn}>Vào Practice</Link>
      </div>
    );
  }

  const partLabels: Record<string, string> = {
    p1: 'Part 1: Photographs',
    p2: 'Part 2: Question-Response',
    p3: 'Part 3: Conversations',
    p4: 'Part 4: Short Talks',
    p5: 'Part 5: Sentences',
    p6: 'Part 6: Text Completion',
    p7: 'Part 7: Reading Comprehension',
  };

  return (
    <div className={styles.wordGrid}>
      {loadedQuestions.map(({ mistakeId, wrongCount, testId, part, qData }) => {
        const testName = testId === 'ets2022_test1' ? 'ETS 2022 Test 1' : testId;
        
        return (
          <div key={mistakeId} className={`${styles.wordCard} card-minimal`}>
            <div className={styles.wordHeader}>
              <span className={styles.wordTitle}>{testName}</span>
              <span className={styles.wrongCountBadge}>Sai {wrongCount} lần</span>
            </div>
            <p className={styles.wordIpa}>{partLabels[part] || part} - Câu {qData.number}</p>
            <p className={styles.wordMeaning}>{qData.text}</p>
            
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
              <strong>Đáp án: </strong> 
              <span style={{ color: 'var(--success)' }}>{qData.correctAnswer}</span>
            </div>

            <button
              type="button"
              onClick={() => setTutorContext({
                partTitle: partLabels[part] || part,
                number: qData.number,
                text: qData.text,
                options: qData.options,
                correctAnswer: qData.correctAnswer,
                userAnswer: '', // We don't have the last user answer stored
                transcript: qData.transcript,
                passageText: qData.passageText,
                explanation: qData.explanation,
                audioUrl: qData.audioUrl,
              })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--primary)',
                borderRadius: '16px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '1rem',
                width: 'fit-content'
              }}
            >
              🤖 Hỏi Gia sư về câu này
            </button>
          </div>
        );
      })}
      
      {tutorContext && (
        <AITutorDrawer
          isOpen={!!tutorContext}
          onClose={() => setTutorContext(null)}
          questionContext={tutorContext}
        />
      )}
    </div>
  );
}
