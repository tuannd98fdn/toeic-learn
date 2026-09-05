'use client';

import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { VOCABULARY_DATA, VocabularyWord } from '@/data/vocabulary';
import Link from 'next/link';
import styles from './page.module.css';

export default function NotebookPage() {
  const { mounted, getMistakes, mistakes } = useMistakeNotebook();

  if (!mounted) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const mistakeIds = getMistakes();
  
  if (mistakeIds.length === 0) {
    return (
      <div className={styles.container}>
        <div className={`${styles.emptyState} card-minimal animate-slide-up`}>
          <span className={styles.emptyIcon}>🎉</span>
          <h2>Sổ tay trống rỗng!</h2>
          <p>Tuyệt vời, bạn không có từ vựng nào cần "chuộc lỗi".<br/>Hãy tiếp tục làm Quiz để thử thách trí nhớ nhé!</p>
          <div className={styles.actions}>
            <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
            <Link href="/quiz" className={styles.primaryBtn}>Làm Quiz ngay</Link>
          </div>
        </div>
      </div>
    );
  }

  // Get full word data and sort by wrongCount descending
  const mistakeWords: (VocabularyWord & { wrongCount: number })[] = mistakeIds
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
        <p className={styles.subtitle}>Bạn đang có {mistakeWords.length} từ vựng cần ôn tập đặc biệt.</p>
      </header>

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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
