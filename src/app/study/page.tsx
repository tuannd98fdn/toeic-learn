'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FlashCard from '@/components/FlashCard';
import Confetti from '@/components/Confetti';
import ParaphraseMatchGame from '@/components/ParaphraseMatchGame';
import CollocationDrill from '@/components/CollocationDrill';
import QuizPage from '@/app/quiz/page';
import VocabularyPage from '@/app/vocabulary/page';
import {
  SparklesIcon,
  AwardIcon,
  CompassIcon,
  ArrowRightIcon,
  RotateCcwIcon,
  HomeIcon,
  VolumeIcon,
  VolumeXIcon,
  CardsIcon,
  LinkIcon,
  ZapIcon,
  QuizIcon,
  BookIcon,
  TargetIcon,
} from '@/components/icons/AppIcons';
import { useLeitner } from '@/hooks/useLeitner';
import { useStreak } from '@/hooks/useStreak';
import { useDailyMission } from '@/hooks/useDailyMission';
import { VocabularyWord, TOEIC_TOPICS } from '@/data/vocabulary';
import VocabTopicMasteryMatrix from '@/components/VocabTopicMasteryMatrix';
import { completeActiveTaskByType, AutoCompleteTaskResult } from '@/utils/studyPlanEngine';
import styles from './page.module.css';

const BANDS = [
  { value: 'All', label: 'Tất cả Band' },
  { value: '450+', label: 'Band 450+' },
  { value: '650+', label: 'Band 650+' },
  { value: '800+', label: 'Band 800+' },
  { value: 'Reading Part 6 & 7', label: 'Part 6 & 7' },
];

type StudyMode = 'flashcard' | 'match' | 'drill';
type VocabTab = 'flashcard' | 'quiz' | 'dictionary';

export default function StudyPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải trung tâm từ vựng...</div>}>
      <StudyPageContent />
    </Suspense>
  );
}

function StudyPageContent() {
  const searchParams = useSearchParams();
  const initialTab: VocabTab = searchParams?.get('tab') === 'quiz'
    ? 'quiz'
    : (searchParams?.get('tab') === 'dictionary' || searchParams?.get('tab') === 'vocab')
      ? 'dictionary'
      : 'flashcard';

  const [vocabTab, setVocabTab] = useState<VocabTab>(initialTab);
  const { mounted, getPacedStudyQueue, rateWord, progress } = useLeitner();
  const { recordStudy } = useStreak();
  const { recordNewWordLearned, recordWordReviewed } = useDailyMission();
  
  const [selectedBand, setSelectedBand] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>(searchParams?.get('category') || 'All');
  const [showTopicMatrix, setShowTopicMatrix] = useState<boolean>(false);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [studyMode, setStudyMode] = useState<StudyMode>('flashcard');
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [sessionStats, setSessionStats] = useState({ reviewCount: 0, newCount: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [nextRoutine, setNextRoutine] = useState<AutoCompleteTaskResult | null>(null);

  // Sync category from URL parameter if navigated with ?category=...
  useEffect(() => {
    const urlCategory = searchParams?.get('category');
    if (urlCategory && urlCategory !== selectedTopic) {
      setSelectedTopic(urlCategory);
    }
  }, [searchParams, selectedTopic]);

  // Initialize autoplay setting & band from user's onboarding target score
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAutoPlay = localStorage.getItem('toeic_vocab_autoplay');
      if (savedAutoPlay !== null) {
        setAutoPlayAudio(savedAutoPlay === 'true');
      }

      const targetScore = localStorage.getItem('toeic_target_score');
      if (targetScore === '500+') setSelectedBand('450+');
      else if (targetScore === '600+' || targetScore === '750+') setSelectedBand('650+');
      else if (targetScore === '900+') setSelectedBand('800+');
    }
  }, []);

  const toggleAutoPlay = () => {
    setAutoPlayAudio(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('toeic_vocab_autoplay', String(next));
      }
      return next;
    });
  };

  const loadSession = useCallback((band: string, topic?: string) => {
    if (!mounted) return;
    const currentTopic = topic !== undefined ? topic : selectedTopic;
    const { queue, reviewCount, newCount } = getPacedStudyQueue(
      band,
      10,
      currentTopic !== 'All' ? currentTopic : undefined
    );
    setWords(queue);
    setSessionStats({ reviewCount, newCount });
    setCurrentIndex(0);
    setIsFinished(false);
    recordStudy();
  }, [mounted, getPacedStudyQueue, recordStudy, selectedTopic]);

  useEffect(() => {
    const sessionKey = `${selectedBand}_${selectedTopic}`;
    if (mounted && sessionKey !== loadedKey) {
      loadSession(selectedBand, selectedTopic);
      setLoadedKey(sessionKey);
    }
  }, [mounted, selectedBand, selectedTopic, loadedKey, loadSession]);

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
      const autoRes = completeActiveTaskByType('vocab');
      setNextRoutine(autoRes);
    }
  };

  const handleBandChange = (newBand: string) => {
    setSelectedBand(newBand);
  };

  const handleTopicChange = (newTopic: string) => {
    setSelectedTopic(newTopic);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newTopic === 'All') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', newTopic);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  if (!mounted) return <div className={styles.loading}>Loading...</div>;

  const renderFlashCardView = () => {
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
                : `Bạn đã ôn tập xong các từ vựng thuộc ${selectedBand} cho hôm nay.`}
            </p>
            <div className={styles.actions}>
              {selectedBand !== 'All' && (
                <button onClick={() => setSelectedBand('All')} className="btn-secondary" style={{ cursor: 'pointer' }}>
                  <RotateCcwIcon size={18} style={{ marginRight: '8px' }} />
                  Ôn tập tất cả các Band
                </button>
              )}
              {selectedTopic !== 'All' && (
                <button onClick={() => handleTopicChange('All')} className="btn-secondary" style={{ cursor: 'pointer' }}>
                  <RotateCcwIcon size={18} style={{ marginRight: '8px' }} />
                  Ôn tập tất cả các Chủ đề
                </button>
              )}
              <button onClick={() => setShowTopicMatrix(prev => !prev)} className="btn-secondary" style={{ cursor: 'pointer' }}>
                <TargetIcon size={18} style={{ marginRight: '8px' }} />
                {showTopicMatrix ? 'Ẩn bản đồ năng lực' : 'Xem Bản Đồ Năng Lực 12 Chủ Đề'}
              </button>
              <button onClick={() => setStudyMode('match')} className="btn-secondary" style={{ cursor: 'pointer' }}>
                <LinkIcon size={18} style={{ marginRight: '8px' }} />
                Luyện ghép cặp Paraphrase Part 7
              </button>
              <button onClick={() => setStudyMode('drill')} className="btn-secondary" style={{ cursor: 'pointer' }}>
                <ZapIcon size={18} style={{ marginRight: '8px' }} />
                Luyện phản xạ Collocation Part 5 & 6
              </button>
              <Link href="/vocabulary" className="btn-secondary">
                <CompassIcon size={18} style={{ marginRight: '8px' }} />
                Khám phá thư viện từ
              </Link>
              <button
                type="button"
                onClick={() => handleTabChange('quiz')}
                className="btn-primary"
                style={{ cursor: 'pointer' }}
              >
                Làm Quiz củng cố
                <ArrowRightIcon size={18} style={{ marginLeft: '8px' }} />
              </button>
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

            {/* Next Routine Step Bridging Card */}
            {nextRoutine?.nextTask ? (
              <div className={styles.nextStepCard}>
                <div className={styles.nextStepBadgeRow}>
                  <span className={styles.stepDoneBadge}>Bước 01 Hoàn Thành</span>
                  <span className={styles.stepXpBadge}>+15 XP</span>
                </div>
                <h3 className={styles.nextStepTitle}>
                  Tiếp tục Bước 02: {nextRoutine.nextTask.title}
                </h3>
                <p className={styles.nextStepDesc}>{nextRoutine.nextTask.description}</p>
                <Link
                  href={nextRoutine.nextTask.link}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700 }}
                >
                  <span>Học Bước 02 Ngay</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            ) : nextRoutine?.isDayCompleted ? (
              <div className={styles.nextStepCard}>
                <div className={styles.nextStepBadgeRow}>
                  <span className={styles.stepDoneBadge} style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
                    100% Mục Tiêu Hoàn Thành
                  </span>
                  <span className={styles.stepXpBadge}>+50 XP</span>
                </div>
                <h3 className={styles.nextStepTitle}>
                  Xuất sắc! Bạn đã hoàn thành toàn bộ mục tiêu hôm nay
                </h3>
                <Link
                  href="/"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700 }}
                >
                  <span>Về Dashboard xem tiến độ</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            ) : null}

            <div className={styles.actions}>
              <button onClick={() => loadSession(selectedBand, selectedTopic)} className="btn-secondary" style={{ cursor: 'pointer' }}>
                <RotateCcwIcon size={18} style={{ marginRight: '8px' }} />
                Học thêm 10 từ mới nữa
              </button>
              {selectedTopic !== 'All' && (
                <button onClick={() => handleTopicChange('All')} className="btn-secondary" style={{ cursor: 'pointer' }}>
                  <RotateCcwIcon size={18} style={{ marginRight: '8px' }} />
                  Học các chủ đề khác
                </button>
              )}
              <button onClick={() => setShowTopicMatrix(prev => !prev)} className="btn-secondary" style={{ cursor: 'pointer' }}>
                <TargetIcon size={18} style={{ marginRight: '8px' }} />
                {showTopicMatrix ? 'Ẩn bản đồ năng lực' : 'Xem Đánh Giá 12 Chủ Đề'}
              </button>
              <button onClick={() => setStudyMode('match')} className="btn-secondary" style={{ cursor: 'pointer' }}>
                <LinkIcon size={18} style={{ marginRight: '8px' }} />
                Luyện ghép cặp Paraphrase Part 7
              </button>
              <button onClick={() => setStudyMode('drill')} className="btn-secondary" style={{ cursor: 'pointer' }}>
                <ZapIcon size={18} style={{ marginRight: '8px' }} />
                Luyện phản xạ Collocations
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('quiz')}
                className="btn-primary"
                style={{ cursor: 'pointer' }}
              >
                Làm Quiz ngay
                <ArrowRightIcon size={18} style={{ marginLeft: '8px' }} />
              </button>
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
      <>
        {/* Streamlined Session Status Strip */}
        <div className={styles.sessionStatusBar}>
          <div className={styles.statusBarLeft}>
            <span className={`${styles.progressCounter} ${styles.progressText}`}>
              Từ <strong>{currentIndex + 1}</strong> / {words.length}
            </span>
            <div className={styles.miniProgressBar}>
              <div 
                className={styles.miniProgressBarFill} 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>

          <div className={styles.statusBarCenter}>
            <span className={styles.statChip}>
              <strong>{sessionStats.reviewCount}</strong> cần ôn
            </span>
            <span className={styles.statDivider}>•</span>
            <span className={styles.statChip}>
              <strong>{sessionStats.newCount}</strong> từ mới
            </span>
          </div>

          <div className={styles.statusBarRight}>
            <button
              type="button"
              className={`${styles.compactAutoPlayBtn} ${autoPlayAudio ? styles.compactAutoPlayActive : ''}`}
              onClick={toggleAutoPlay}
              title={autoPlayAudio ? 'Đang bật tự động phát âm (Click để tắt)' : 'Đang tắt tự động phát âm (Click để bật)'}
              aria-label="Tự động phát âm"
            >
              {autoPlayAudio ? <VolumeIcon size={14} /> : <VolumeXIcon size={14} />}
              <span>Tự động phát âm: <strong>{autoPlayAudio ? 'Bật' : 'Tắt'}</strong></span>
            </button>
          </div>
        </div>

        <main className={styles.main}>
          <FlashCard 
            word={words[currentIndex]} 
            onRate={handleRate}
            autoPlay={autoPlayAudio}
          />
        </main>
      </>
    );
  };

  const handleTabChange = (tab: VocabTab) => {
    setVocabTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (tab === 'flashcard') url.searchParams.delete('tab');
      else url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <div className={`${styles.container} ${vocabTab !== 'flashcard' || showTopicMatrix ? styles.wideContainer : ''}`}>
      {/* ═══════════════ TOP HUB HEADER & TABS ═══════════════ */}
      <div className={styles.topHubHeader}>
        <div className={styles.topHubTitleArea}>
          <h1 className={styles.topHubTitle}>
            Trung Tâm Từ Vựng <span className="text-gradient">TOEIC Master</span>
          </h1>
          <p className={styles.topHubSubtitle}>
            Luyện trí nhớ dài hạn Spaced Repetition (SRS) • Kiểm tra phản xạ Quiz 10 câu • Tra cứu kho 400+ từ chuẩn ETS
          </p>
        </div>

        <div className={styles.topHubTabs}>
          <button
            type="button"
            className={`${styles.topHubTab} ${vocabTab === 'flashcard' ? styles.topHubTabActive : ''}`}
            onClick={() => handleTabChange('flashcard')}
          >
            <CardsIcon size={17} />
            <span>Thẻ Flashcards SRS</span>
          </button>
          <button
            type="button"
            className={`${styles.topHubTab} ${vocabTab === 'quiz' ? styles.topHubTabActive : ''}`}
            onClick={() => handleTabChange('quiz')}
          >
            <QuizIcon size={17} />
            <span>Làm Quiz 10 Câu</span>
          </button>
          <button
            type="button"
            className={`${styles.topHubTab} ${vocabTab === 'dictionary' ? styles.topHubTabActive : ''}`}
            onClick={() => handleTabChange('dictionary')}
          >
            <BookIcon size={17} />
            <span>Kho Từ &amp; Tra Cứu</span>
          </button>
        </div>
      </div>

      {vocabTab === 'quiz' && <QuizPage />}
      {vocabTab === 'dictionary' && <VocabularyPage />}
      {vocabTab === 'flashcard' && (
        <>
          <header className={styles.studyHeader}>
            <div className={styles.studyControlBox}>
              {/* Mode Switcher */}
              <div className={styles.modeRow}>
                <div className={styles.modeSwitcher}>
                  <button
                    type="button"
                    className={`${styles.modeTab} ${studyMode === 'flashcard' ? styles.activeModeTab : ''}`}
                    onClick={() => setStudyMode('flashcard')}
                  >
                    <CardsIcon size={15} />
                    <span>Thẻ Ghi Nhớ SRS</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.modeTab} ${studyMode === 'match' ? styles.activeModeTab : ''}`}
                    onClick={() => setStudyMode('match')}
                  >
                    <LinkIcon size={15} />
                    <span>Ghép Cặp Paraphrase</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.modeTab} ${studyMode === 'drill' ? styles.activeModeTab : ''}`}
                    onClick={() => setStudyMode('drill')}
                  >
                    <ZapIcon size={15} />
                    <span>Phản Xạ Collocations</span>
                  </button>
                </div>
              </div>

              {/* Band Selector & Topic Controls (Used for Flashcard SRS) */}
              {studyMode === 'flashcard' && (
                <>
                  <div className={styles.bandRow}>
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
                  </div>

                  <div className={styles.topicControlRow}>
                    <div className={styles.topicSelectWrapper}>
                      <label htmlFor="topic-filter-select" className={styles.topicSelectLabel}>
                        Chủ đề ETS:
                      </label>
                      <select
                        id="topic-filter-select"
                        className={styles.topicSelectDropdown}
                        value={selectedTopic}
                        onChange={(e) => handleTopicChange(e.target.value)}
                      >
                        <option value="All">Tất cả 12 Chủ Đề ETS (453 từ)</option>
                        {TOEIC_TOPICS.map((topic) => (
                          <option key={topic.id} value={topic.nameEn}>
                            {topic.nameVi} ({topic.nameEn})
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      className={`${styles.matrixToggleBtn} ${showTopicMatrix ? styles.matrixToggleBtnActive : ''}`}
                      onClick={() => setShowTopicMatrix(prev => !prev)}
                      title="Bật/tắt Bản đồ Đánh giá Năng lực 12 Chủ Đề"
                    >
                      <TargetIcon size={14} />
                      <span>{showTopicMatrix ? 'Ẩn Đánh Giá' : 'Đánh Giá Năng Lực 12 Chủ Đề'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Collapsible 12-Topic Mastery Matrix */}
          {showTopicMatrix && (
            <div className={styles.matrixWrapper}>
              <VocabTopicMasteryMatrix
                onSelectTopic={(topicNameEn) => {
                  handleTopicChange(topicNameEn);
                  setShowTopicMatrix(false);
                }}
              />
            </div>
          )}

          {/* Main Body depending on Active Study Mode */}
          {studyMode === 'flashcard' && renderFlashCardView()}
          {studyMode === 'match' && (
            <ParaphraseMatchGame
              onWordReviewed={recordWordReviewed}
              onSwitchMode={setStudyMode}
            />
          )}
          {studyMode === 'drill' && (
            <CollocationDrill
              onWordReviewed={recordWordReviewed}
              onSwitchMode={setStudyMode}
            />
          )}
        </>
      )}
    </div>
  );
}
