'use client';

import { useState } from 'react';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { VOCABULARY_DATA, VocabularyWord } from '@/data/vocabulary';
import Link from 'next/link';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import ExamMistakeList from './ExamMistakeList';
import styles from './page.module.css';

export default function NotebookPage() {
  const { mounted, getMistakes, mistakes } = useMistakeNotebook();
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'exam'>('vocabulary');

  if (!mounted) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const mistakeIds = getMistakes();
  
  const vocabMistakeIds = mistakeIds.filter(id => !mistakes[id].type || mistakes[id].type === 'vocabulary');
  const examMistakeIds = mistakeIds.filter(id => mistakes[id].type === 'exam');

  // Get full word data and sort by wrongCount descending
  const mistakeWords: (VocabularyWord & { wrongCount: number })[] = vocabMistakeIds
    .map(id => {
      const word = VOCABULARY_DATA.find(w => w.id === id);
      return word ? { ...word, wrongCount: mistakes[id].wrongCount } : null;
    })
    .filter((w): w is (VocabularyWord & { wrongCount: number }) => w !== null)
    .sort((a, b) => b.wrongCount - a.wrongCount);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>← Quay lại</Link>
        <h1>Sổ tay lỗi sai 📓</h1>
        <p className={styles.subtitle}>
          Bạn đang có {vocabMistakeIds.length} từ vựng và {examMistakeIds.length} câu hỏi đề thi cần ôn tập.
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
              <p>Tuyệt vời, bạn không có từ vựng nào cần "chuộc lỗi".<br/>Hãy tiếp tục làm Quiz để thử thách trí nhớ nhé!</p>
              <div className={styles.actions}>
                <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
                <Link href="/quiz" className={styles.primaryBtn}>Làm Quiz ngay</Link>
              </div>
            </div>
          ) : (
            <>
              <section className={styles.actionSection}>
                <div className={`${styles.ctaCard} card-minimal`}>
                  <h2>Sẵn sàng "chuộc lỗi"?</h2>
                  <p>Làm một bài test nhanh với các từ này. Trả lời đúng sẽ xóa từ khỏi sổ tay!</p>
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
        <section className={styles.listSection}>
          <h2>Danh sách câu hỏi đề thi cần ôn</h2>
          <ExamMistakeList mistakeIds={examMistakeIds} mistakes={mistakes} />
        </section>
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
