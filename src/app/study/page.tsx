'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import FlashCard from '@/components/FlashCard';
import Confetti from '@/components/Confetti';
import { SparklesIcon, AwardIcon, CompassIcon, ArrowRightIcon, RotateCcwIcon, HomeIcon } from '@/components/icons/AppIcons';
import { useLeitner } from '@/hooks/useLeitner';
import { useStreak } from '@/hooks/useStreak';
import { useDailyMission } from '@/hooks/useDailyMission';
import { VocabularyWord } from '@/data/vocabulary';
import styles from './page.module.css';

const BANDS = [
  { value: 'All', label: 'Tất cả Band' },
  { value: '450+', label: 'Band 450+' },
  { value: '650+', label: 'Band 650+' },
  { value: '800+', label: 'Band 800+' },
];

export default function StudyPage() {
  const { mounted, getPacedStudyQueue, rateWord, progress } = useLeitner();
  const { recordStudy } = useStreak();
  const { recordNewWordLearned, recordWordReviewed } = useDailyMission();
  
  const [selectedBand, setSelectedBand] = useState<string>('All');
  const [loadedBand, setLoadedBand] = useState<string | null>(null);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [sessionStats, setSessionStats] = useState({ reviewCount: 0, newCount: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize band from user's onboarding target score
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const targetScore = localStorage.getItem('toeic_target_score');
      if (targetScore === '500+') setSelectedBand('450+');
      else if (targetScore === '600+' || targetScore === '750+') setSelectedBand('650+');
      else if (targetScore === '900+') setSelectedBand('800+');
    }
  }, []);

  const loadSession = useCallback((band: string) => {
    if (!mounted) return;
    const { queue, reviewCount, newCount } = getPacedStudyQueue(band, 10);
    setWords(queue);
    setSessionStats({ reviewCount, newCount });
    setCurrentIndex(0);
    setIsFinished(false);
    recordStudy();
  }, [mounted, getPacedStudyQueue, recordStudy]);

  useEffect(() => {
    if (mounted && selectedBand !== loadedBand) {
      loadSession(selectedBand);
      setLoadedBand(selectedBand);
    }
  }, [mounted, selectedBand, loadedBand, loadSession]);

  const handleRate = (rating: 1 | 2 | 3 | 4) => {
    const currentWord = words[currentIndex];
    if (!currentWord) return;
    
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

  const handleBandChange = (newBand: string) => {
    setSelectedBand(newBand);
  };

  if (!mounted) return <div className={styles.loading}>Loading...</div>;

  if (words.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={`${styles.emptyCard} animate-fade-in`}>
          <div className={styles.iconWrapper}>
            <AwardIcon size={48} className={styles.glowIcon} />
          </div>
          <h2>Tuyệt vời!</h2>
          <p>
            {selectedBand === 'All'
              ? 'Bạn đã ôn tập xong tất cả từ vựng cho hôm nay.'
              : `Bạn đã ôn tập xong các từ vựng thuộc Band ${selectedBand} cho hôm nay.`}
          </p>
          <div className={styles.actions}>
            {selectedBand !== 'All' && (
              <button onClick={() => setSelectedBand('All')} className="btn-secondary" style={{ cursor: 'pointer' }}>
                <RotateCcwIcon size={18} style={{ marginRight: '8px' }} />
                Ôn tập tất cả các Band
              </button>
            )}
            <Link href="/vocabulary" className="btn-secondary">
              <CompassIcon size={18} style={{ marginRight: '8px' }} />
              Khám phá thư viện từ
            </Link>
            <Link href="/quiz" className="btn-primary">
              Làm Quiz củng cố
              <ArrowRightIcon size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className={styles.finishedContainer}>
        <Confetti show={true} />
        <div className={`${styles.finishedCard} animate-slide-up`}>
          <div className={styles.iconWrapper}>
            <SparklesIcon size={48} className={styles.glowIcon} />
          </div>
          <h2>Hoàn thành phiên học!</h2>
          <p>
            Bạn đã hoàn thành <strong>{words.length}</strong> từ ({sessionStats.reviewCount} từ ôn tập + {sessionStats.newCount} từ mới) trong phiên này.
          </p>
          <div className={styles.actions}>
            <button onClick={() => loadSession(selectedBand)} className="btn-secondary" style={{ cursor: 'pointer' }}>
              <RotateCcwIcon size={18} style={{ marginRight: '8px' }} />
              Học thêm 10 từ mới nữa
            </button>
            <Link href="/quiz" className="btn-primary">
              Làm Quiz ngay
              <ArrowRightIcon size={18} style={{ marginLeft: '8px' }} />
            </Link>
            <Link href="/" className="btn-secondary" style={{ border: 'none', background: 'transparent' }}>
              <HomeIcon size={18} style={{ marginRight: '8px' }} />
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentIndex) / words.length) * 100;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {/* Band Selector */}
        <div className={styles.bandSelector}>
          {BANDS.map(b => (
            <button
              key={b.value}
              className={`${styles.bandPill} ${selectedBand === b.value ? styles.activeBandPill : ''}`}
              onClick={() => handleBandChange(b.value)}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Session Stats */}
        <div className={styles.sessionStats}>
          <span>Hôm nay:</span>
          <strong>{sessionStats.reviewCount}</strong> từ cần ôn + <strong>{sessionStats.newCount}</strong> từ mới
        </div>

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

