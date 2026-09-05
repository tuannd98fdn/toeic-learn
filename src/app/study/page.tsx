'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FlashCard from '@/components/FlashCard';
import Confetti from '@/components/Confetti';
import { useLeitner } from '@/hooks/useLeitner';
import { useStreak } from '@/hooks/useStreak';
import { useDailyMission } from '@/hooks/useDailyMission';
import { VocabularyWord } from '@/data/vocabulary';
import styles from './page.module.css';

export default function StudyPage() {
  const { mounted, getDueWords, rateWord, progress } = useLeitner();
  const { recordStudy } = useStreak();
  const { recordNewWordLearned, recordWordReviewed } = useDailyMission();
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (mounted) {
      const due = getDueWords();
      setWords(due);
      recordStudy(); // Mark today as studied when they enter study mode
    }
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRate = (rating: 1 | 2 | 3 | 4) => {
    const currentWord = words[currentIndex];
    
    // Check if it's a new word before rating it (box 0 means unstudied)
    const isNew = !progress[currentWord.id] || progress[currentWord.id].box === 0;
    
    rateWord(currentWord.id, rating);

    if (isNew) {
      recordNewWordLearned();
    } else {
      recordWordReviewed();
    }

    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (!mounted) return <div className={styles.loading}>Loading...</div>;

  if (words.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={`${styles.emptyCard} card-minimal`}>
          <span className={styles.emptyIcon}>🎉</span>
          <h2>Tuyệt vời!</h2>
          <p>Bạn đã ôn tập xong tất cả từ vựng cho hôm nay.</p>
          <Link href="/vocabulary" className={styles.primaryBtn}>
            Khám phá từ mới
          </Link>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className={styles.finishedContainer}>
        <Confetti show={true} />
        <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
          <h2>🎉 Hoàn thành xuất sắc!</h2>
          <p>Bạn đã ôn tập xong <strong>{words.length}</strong> từ vựng.</p>
          <div className={styles.actions}>
            <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
            <Link href="/quiz" className={styles.primaryBtn}>Làm Quiz ngay</Link>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentIndex) / words.length) * 100;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.progressText}>
          Từ {currentIndex + 1} / {words.length}
        </div>
        <div className={styles.progressBarBg}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </header>
      
      <main className={styles.main}>
        <FlashCard 
          word={words[currentIndex]} 
          onRate={handleRate} 
        />
      </main>
    </div>
  );
}
