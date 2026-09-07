'use client';

import { useState } from 'react';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { VocabularyWord } from '@/data/vocabulary';
import { useVocabulary } from '@/hooks/useVocabulary';
import Link from 'next/link';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import { isDueForReview } from '@/utils/spacedRepetition';
import ExamMistakeList from './ExamMistakeList';
import styles from './page.module.css';

export default function NotebookPage() {
  const { mounted: vocabMounted, allWords } = useVocabulary();
  const { mounted: notebookMounted, getMistakes, mistakes } = useMistakeNotebook();
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'exam'>('vocabulary');

  if (!vocabMounted || !notebookMounted) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const mistakeIds = getMistakes();
  
  const vocabMistakeIds = mistakeIds.filter(id => !mistakes[id].type || mistakes[id].type === 'vocabulary');
  const examMistakeIds = mistakeIds.filter(id => mistakes[id].type === 'exam');

  // Get full word data and sort by wrongCount descending
    const mistakeWords = vocabMistakeIds
      .map(id => {
        const word = allWords.find(w => w.id === id);
        return word ? { ...word, wrongCount: mistakes[id].wrongCount } : null;
      })
      .filter((w) => w !== null) as (VocabularyWord & { wrongCount: number })[];
      
    mistakeWords.sort((a, b) => b.wrongCount - a.wrongCount);

  const vocabDueCount = vocabMistakeIds.filter(id => mistakes[id].nextReviewDate && isDueForReview(mistakes[id].nextReviewDate)).length;
  const examDueCount = examMistakeIds.filter(id => mistakes[id].nextReviewDate && isDueForReview(mistakes[id].nextReviewDate)).length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>← Quay lại</Link>
        <h1>Sổ tay lỗi sai 📓</h1>
        <p className={styles.subtitle}>
          Bạn đang có {vocabMistakeIds.length} từ vựng ({vocabDueCount} đến hạn) và {examMistakeIds.length} câu hỏi đề thi ({examDueCount} đến hạn) cần ôn tập.
        </p>
      </header>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'vocabulary' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('vocabulary')}
        >
          Từ vựng ({vocabMistakeIds.length})
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'exam' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('exam')}
        >
          Đề thi ({examMistakeIds.length})
        </button>
      </div>

      {activeTab === 'vocabulary' && (
        <>
          {vocabMistakeIds.length === 0 ? (
            <div className={`${styles.emptyState} card-minimal animate-slide-up`}>
              <span className={styles.emptyIcon}>🎉</span>
              <h2>Sổ tay trống rỗng!</h2>
              <p>Tuyệt vời, bạn chưa mắc lỗi từ vựng nào.<br/>Hãy tiếp tục học từ vựng mới để mở rộng vốn từ nhé!</p>
              <div className={styles.actions}>
                <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
                <Link href="/study" className={styles.primaryBtn}>Học từ vựng mới ➔</Link>
              </div>
            </div>
          ) : (
            <>
              <section className={styles.actionSection}>
                <div className={`${styles.ctaCard} card-minimal`}>
                  <h2>Sẵn sàng "chuộc lỗi"?</h2>
                  <p>Bạn có <strong>{vocabDueCount}</strong> từ vựng đến hạn ôn tập hôm nay.</p>
                  <Link href="/notebook/quiz" className={`${styles.primaryBtn} btn-accent`}>
                    Bắt đầu test chuộc lỗi 🚀
                  </Link>
                </div>
              </section>

              <section className={styles.listSection}>
                <h2>Danh sách từ cần ôn</h2>
                <div className={styles.wordGrid}>
                  {mistakeWords.map(word => (
                    <div key={word.id} className={`${styles.wordCard} card-minimal`}>
                      <div className={styles.wordHeader}>
                        <span className={styles.wordTitle}>{word.word}</span>
                        <span className={styles.wrongCountBadge}>Sai {word.wrongCount} lần</span>
                      </div>
                      <p className={styles.wordIpa}>{word.ipa}</p>
                      <p className={styles.wordMeaning}>{word.vietnamese}</p>
                      <p className={styles.wordType}>{word.partOfSpeech}</p>

                      <button
                        type="button"
                        onClick={() => setTutorContext({
                          partTitle: 'Sổ tay lỗi sai: Từ vựng TOEIC',
                          text: `Từ vựng hay quên: "${word.word}" (${word.ipa}) - ${word.partOfSpeech}. Nghĩa tiếng Việt: "${word.vietnamese}". Thí sinh đã sai ${word.wrongCount} lần. Ví dụ: "${word.examples[0] || ''}". Mẹo nhớ: "${word.mnemonicTip}".`,
                          options: {
                            A: word.vietnamese,
                            B: 'Gợi ý mẹo nhớ từ vựng lâu (Mnemonic)',
                            C: 'Cụm từ (Collocations) hay xuất hiện trong đề thi TOEIC',
                            D: 'Các bẫy từ loại thường gặp liên quan đến từ này'
                          },
                          correctAnswer: 'A',
                          explanation: `Ví dụ mẫu TOEIC: ${word.examples[0] || ''}. Mẹo: ${word.mnemonicTip}`
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
                          marginTop: '0.5rem',
                          width: 'fit-content'
                        }}
                      >
                        🤖 Hỏi Gia sư cách nhớ & Collocations
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}

      {activeTab === 'exam' && (
        <>
          {examMistakeIds.length === 0 ? (
            <div className={`${styles.emptyState} card-minimal animate-slide-up`} style={{ marginTop: '2rem' }}>
              <span className={styles.emptyIcon}>🎉</span>
              <h2>Sổ tay trống rỗng!</h2>
              <p>Tuyệt vời, bạn chưa có lỗi sai nào trong đề thi.<br/>Hãy thử sức với một bài thi mới để kiểm tra trình độ nhé!</p>
              <div className={styles.actions}>
                <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
                <Link href="/exam" className={styles.primaryBtn}>Thi thử ngay ➔</Link>
              </div>
            </div>
          ) : (
            <>
              <section className={styles.actionSection} style={{ marginBottom: '2rem' }}>
                <div className={`${styles.ctaCard} card-minimal`}>
                  <h2>Ôn Tập Đề Thi</h2>
                  <p>Bạn có <strong>{examDueCount}</strong> câu hỏi đến hạn ôn tập hôm nay.</p>
                  <Link href="/notebook/quiz/exam" className={`${styles.primaryBtn} btn-accent`}>
                    Bắt đầu làm Quiz Đề thi 🎯
                  </Link>
                </div>
              </section>
              <section className={styles.listSection}>
                <h2>Danh sách câu hỏi đề thi cần ôn</h2>
                <ExamMistakeList mistakeIds={examMistakeIds} mistakes={mistakes} />
              </section>
            </>
          )}
        </>
      )}

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
