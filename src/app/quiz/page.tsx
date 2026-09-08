'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import QuizCard from '@/components/QuizCard';
import Confetti from '@/components/Confetti';
import MascotSVG from '@/components/illustrations/MascotSVG';
import ShareButton from '@/components/ShareButton';
import { VocabularyWord } from '@/data/vocabulary';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useDailyMission } from '@/hooks/useDailyMission';
import { useStreak } from '@/hooks/useStreak';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useAudio } from '@/hooks/useAudio';
import { soundEffects } from '@/utils/soundEffects';
import { storage } from '@/utils/storage';
import {
  AwardIcon,
  ZapIcon,
  ClockIcon,
  TargetIcon,
  RotateCcwIcon,
  ArrowRightIcon,
  BookIcon,
  HomeIcon,
  VolumeIcon,
  SparklesIcon,
  CheckCircleIcon,
  NotebookIcon
} from '@/components/icons/AppIcons';
import styles from './page.module.css';

const QUIZ_LENGTH = 10;

interface AnswerRecord {
  word: VocabularyWord;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export default function QuizPage() {
  const { mounted: vocabMounted, allWords, getRandomWords } = useVocabulary();
  const { recordQuizCompleted } = useDailyMission();
  const { recordStudy, streakData } = useStreak();
  const { addMistake, removeMistake, mistakes } = useMistakeNotebook();
  const { speak } = useAudio();

  const [questions, setQuestions] = useState<{ word: VocabularyWord; options: string[] }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [xpEarned, setXpEarned] = useState(0);

  // Initialize Quiz questions
  const generateQuiz = useCallback((wordsList?: VocabularyWord[]) => {
    const sourceWords = wordsList && wordsList.length > 0 
      ? wordsList 
      : getRandomWords(Math.min(QUIZ_LENGTH, allWords.length));
    
    const generated = sourceWords.map(word => {
      const wrongWords = getRandomWords(3, [word.id]);
      const options = [word.vietnamese, ...wrongWords.map(w => w.vietnamese)];
      const shuffledOptions = options.sort(() => 0.5 - Math.random());
      return { word, options: shuffledOptions };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setUserAnswers([]);
    setIsFinished(false);
    setShowConfetti(false);
  }, [allWords.length, getRandomWords]);

  useEffect(() => {
    if (!vocabMounted) return;
    generateQuiz();
  }, [vocabMounted, generateQuiz]);

  const handleAnswer = (isCorrect: boolean, selectedOption?: string) => {
    const currentQ = questions[currentIndex];
    const newAnswer: AnswerRecord = {
      word: currentQ.word,
      selectedAnswer: selectedOption || (isCorrect ? currentQ.word.vietnamese : 'Chưa chọn'),
      correctAnswer: currentQ.word.vietnamese,
      isCorrect
    };

    const nextAnswers = [...userAnswers, newAnswer];
    setUserAnswers(nextAnswers);

    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setScore(nextScore);
      setCombo(prev => {
        const next = prev + 1;
        setMaxCombo(m => Math.max(m, next));
        return next;
      });
    } else {
      setCombo(0);
      addMistake(currentQ.word.id, { type: 'vocabulary' });
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finished Quiz
      setIsFinished(true);
      recordQuizCompleted();
      recordStudy();

      const percentage = (nextScore / questions.length) * 100;
      const calculatedXp = (nextScore * 10) + (nextScore === questions.length ? 30 : 0) + (maxCombo >= 5 ? 15 : 0);
      setXpEarned(calculatedXp);

      // Save XP cumulative progress
      const currentXp = storage.get<number>('toeic_user_xp', 0);
      storage.set('toeic_user_xp', currentXp + calculatedXp);

      if (percentage >= 70) {
        setShowConfetti(true);
        soundEffects.playVictory();
      }
    }
  };

  // Retry only mistaken words
  const handleRetryMistakes = () => {
    const wrongWords = userAnswers.filter(a => !a.isCorrect).map(a => a.word);
    if (wrongWords.length > 0) {
      generateQuiz(wrongWords);
    }
  };

  // Notebook toggle in review card
  const handleToggleNotebook = (wordId: string) => {
    if (mistakes[wordId]) {
      removeMistake(wordId);
    } else {
      addMistake(wordId, { type: 'vocabulary' });
    }
  };

  if (!vocabMounted || questions.length === 0) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Đang chuẩn bị bộ câu hỏi trắc nghiệm...</p>
      </div>
    );
  }

  // ============================================
  // FINISHED STATE — TOP 1 VIETNAM EDTECH STANDARDS
  // ============================================
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const wrongCount = userAnswers.filter(a => !a.isCorrect).length;

    // Determine performance tier
    let tierBadge = 'CHIẾN THẦN TỪ VỰNG';
    let tierAura = styles.auraGold;
    let badgeClass = styles.badgeGold;
    let mascotMood: 'happy' | 'idle' | 'thinking' = 'happy';
    let gradientStart = '#f59e0b';
    let gradientEnd = '#ec4899';
    let estimatedBand = 'Band 850+';
    let feedback = 'Xuất sắc tuyệt đối! Bạn phản xạ ngữ nghĩa chuẩn xác như một thí sinh TOEIC 900+. Tiếp tục giữ vững phong độ này nhé!';

    if (percentage === 100) {
      tierBadge = 'PERFECT SCORE • 100%';
      tierAura = styles.auraGold;
      badgeClass = styles.badgeGold;
      mascotMood = 'happy';
      gradientStart = '#f59e0b';
      gradientEnd = '#ec4899';
      estimatedBand = 'Band 900+';
      feedback = 'Điểm số tuyệt đối 10/10! Trí nhớ ngữ nghĩa và phản xạ từ vựng của bạn đạt chuẩn thí sinh mục tiêu 900+ TOEIC.';
    } else if (percentage >= 80) {
      tierBadge = 'XUẤT SẮC • ADVANCED';
      tierAura = styles.auraEmerald;
      badgeClass = styles.badgeEmerald;
      mascotMood = 'happy';
      gradientStart = '#10b981';
      gradientEnd = '#06b6d4';
      estimatedBand = 'Band 800+';
      feedback = 'Rất ấn tượng! Bạn đã làm chủ hầu hết các từ vựng cốt lõi. Hãy củng cố nốt các từ chưa chắc chắn bên dưới.';
    } else if (percentage >= 60) {
      tierBadge = 'TIẾN BỘ TỐT • ON TRACK';
      tierAura = styles.auraBlue;
      badgeClass = styles.badgeBlue;
      mascotMood = 'idle';
      gradientStart = '#3b82f6';
      gradientEnd = '#8b5cf6';
      estimatedBand = 'Band 650+';
      feedback = 'Khá tốt! Bạn đã nắm được ngữ nghĩa cơ bản, nhưng cần chú ý một số bẫy từ vựng hay gặp trong đề thi.';
    } else {
      tierBadge = 'CẦN ÔN TẬP • CHALLENGE';
      tierAura = styles.auraAmber;
      badgeClass = styles.badgeAmber;
      mascotMood = 'thinking';
      gradientStart = '#f97316';
      gradientEnd = '#ef4444';
      estimatedBand = 'Band 500+';
      feedback = 'Đừng nản lòng! Hãy ôn lại các từ sai ở danh sách phân tích bên dưới hoặc luyện tập Flashcard để khắc phục ngay.';
    }

    // SVG Radial Gauge calculation
    const radius = 64;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Filter review questions
    const filteredAnswers = userAnswers.filter(ans => {
      if (reviewFilter === 'correct') return ans.isCorrect;
      if (reviewFilter === 'wrong') return !ans.isCorrect;
      return true;
    });

    return (
      <div className={styles.finishedWrapper}>
        <Confetti show={showConfetti} />

        {/* Hero Victory Card */}
        <div id="quiz-result-hero" className={`${styles.heroCard} animate-slide-up`}>
          <div className={`${styles.heroAura} ${tierAura}`} />
          
          <div className={styles.heroContent}>
            <div className={styles.mascotFloating}>
              <MascotSVG mood={mascotMood} size={90} />
            </div>

            <div className={`${styles.achievementBadge} ${badgeClass}`}>
              <SparklesIcon size={16} />
              {tierBadge}
            </div>

            <h1 className={styles.heroTitle}>Kết quả Luyện Quiz</h1>

            {/* Animated SVG Radial Gauge */}
            <div className={styles.gaugeContainer}>
              <svg className={styles.gaugeSvg} viewBox="0 0 160 160">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={gradientStart} />
                    <stop offset="100%" stopColor={gradientEnd} />
                  </linearGradient>
                </defs>
                <circle
                  className={styles.gaugeBg}
                  cx="80"
                  cy="80"
                  r={radius}
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  className={styles.gaugeFill}
                  cx="80"
                  cy="80"
                  r={radius}
                  strokeWidth="10"
                  fill="transparent"
                  stroke="url(#gaugeGradient)"
                  strokeDasharray={circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                />
              </svg>

              <div className={styles.gaugeInner}>
                <div className={styles.gaugeScore}>
                  {score}<span className={styles.gaugeTotal}>/{questions.length}</span>
                </div>
                <div className={styles.gaugePercent}>{percentage}% chính xác</div>
              </div>
            </div>

            <p className={styles.feedbackText}>{feedback}</p>

            {/* 4-Stat Gamification Metrics Grid */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>
                  <TargetIcon size={18} />
                </div>
                <div className={styles.statValue}>{percentage}%</div>
                <div className={styles.statLabel}>Độ chính xác</div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
                  <ZapIcon size={18} />
                </div>
                <div className={styles.statValue}>+{xpEarned}</div>
                <div className={styles.statLabel}>Kinh nghiệm XP</div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--danger)' }}>
                  <ClockIcon size={18} />
                </div>
                <div className={styles.statValue}>{streakData?.currentStreak || 1} Ngày</div>
                <div className={styles.statLabel}>Chuỗi Streak</div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(79, 70, 229, 0.15)', color: 'var(--primary)' }}>
                  <AwardIcon size={18} />
                </div>
                <div className={styles.statValue}>{estimatedBand}</div>
                <div className={styles.statLabel}>Ước lượng Band</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.heroActions}>
              {wrongCount > 0 ? (
                <button 
                  onClick={handleRetryMistakes} 
                  className={styles.ctaBtnRetryMistakes}
                >
                  <RotateCcwIcon size={18} />
                  Luyện lại {wrongCount} từ sai
                </button>
              ) : null}

              <button 
                onClick={() => generateQuiz()} 
                className={styles.ctaBtnPrimary}
              >
                Luyện 10 từ mới tiếp theo
                <ArrowRightIcon size={18} />
              </button>

              <button 
                onClick={() => generateQuiz(questions.map(q => q.word))} 
                className={styles.ctaBtnSecondary}
              >
                <RotateCcwIcon size={18} />
                Làm lại bài này
              </button>

              <ShareButton 
                elementId="quiz-result-hero"
                title={`Kỷ lục TOEIC: Đạt ${score}/${questions.length} câu Quiz!`}
                text={`Tôi vừa hoàn thành bài trắc nghiệm từ vựng TOEIC với độ chính xác ${percentage}% trên TOEIC Master!`}
                className={styles.ctaBtnSecondary}
              />
            </div>
          </div>
        </div>

        {/* Detailed Question Review & Sửa sai */}
        <section className={styles.reviewSection}>
          <div className={styles.reviewHeader}>
            <div className={styles.reviewTitleGroup}>
              <h3>Phân tích chi tiết câu hỏi</h3>
              <p className={styles.reviewSubtitle}>
                Xem lại ngữ nghĩa, nghe phát âm bản ngữ và lưu từ cần ôn vào sổ tay
              </p>
            </div>

            {/* Filter Tabs */}
            <div className={styles.filterTabs}>
              <button
                className={`${styles.filterBtn} ${reviewFilter === 'all' ? styles.activeFilterBtn : ''}`}
                onClick={() => setReviewFilter('all')}
              >
                Tất cả ({userAnswers.length})
              </button>
              <button
                className={`${styles.filterBtn} ${reviewFilter === 'correct' ? styles.activeFilterBtn : ''}`}
                onClick={() => setReviewFilter('correct')}
              >
                Đúng ({correctCount})
              </button>
              <button
                className={`${styles.filterBtn} ${reviewFilter === 'wrong' ? styles.activeFilterBtn : ''}`}
                onClick={() => setReviewFilter('wrong')}
              >
                Sai ({wrongCount})
              </button>
            </div>
          </div>

          {/* List of Questions */}
          <div className={styles.reviewList}>
            {filteredAnswers.length === 0 ? (
              <div className={styles.emptyReviewFilter}>
                Không có câu hỏi nào trong mục này.
              </div>
            ) : (
              filteredAnswers.map((item, idx) => {
                const isSavedInNotebook = !!mistakes[item.word.id];

                return (
                  <div 
                    key={item.word.id} 
                    className={`${styles.reviewCard} ${item.isCorrect ? styles.cardCorrect : styles.cardWrong}`}
                  >
                    <div className={styles.reviewCardTop}>
                      <div className={styles.wordDetails}>
                        <div className={styles.questionIdxBadge}>
                          {idx + 1}
                        </div>
                        <span className={styles.reviewWordText}>{item.word.word}</span>
                        {item.word.partOfSpeech && (
                          <span className={styles.reviewPosBadge}>{item.word.partOfSpeech}</span>
                        )}
                        {item.word.targetBand && (
                          <span className={styles.reviewBandBadge}>Band {item.word.targetBand}</span>
                        )}
                        <span className={styles.reviewIpa}>{item.word.ipa}</span>
                        
                        <button
                          className={styles.reviewAudioBtn}
                          onClick={() => speak(item.word.word)}
                          title="Phát âm từ vựng"
                          aria-label="Phát âm"
                        >
                          <VolumeIcon size={16} />
                        </button>
                      </div>

                      <button
                        className={`${styles.bookmarkBtn} ${isSavedInNotebook ? styles.isSaved : ''}`}
                        onClick={() => handleToggleNotebook(item.word.id)}
                        title="Lưu hoặc xóa khỏi Sổ tay từ vựng"
                      >
                        <NotebookIcon size={15} />
                        {isSavedInNotebook ? 'Đã lưu sổ tay' : 'Lưu sổ tay'}
                      </button>
                    </div>

                    {/* Answers Comparison */}
                    <div className={styles.answersComparison}>
                      <div className={styles.userChoiceRow}>
                        <span 
                          className={`${styles.choiceTag} ${
                            item.isCorrect ? styles.choiceTagUserCorrect : styles.choiceTagUserWrong
                          }`}
                        >
                          {item.isCorrect ? 'Bạn đã chọn đúng' : 'Bạn đã chọn'}
                        </span>
                        <span className={styles.choiceMeaning}>{item.selectedAnswer}</span>
                      </div>

                      {!item.isCorrect && (
                        <div className={styles.correctChoiceRow}>
                          <span className={`${styles.choiceTag} ${styles.choiceTagCorrectTarget}`}>
                            Đáp án chính xác
                          </span>
                          <span className={styles.choiceMeaning}>{item.correctAnswer}</span>
                        </div>
                      )}
                    </div>

                    {/* Pedagogical Extras */}
                    <div className={styles.pedagogyExtras}>
                      {item.word.mnemonicTip && (
                        <div className={styles.mnemonicBox}>
                          <span className={styles.mnemonicLabel}>💡 Mẹo nhớ:</span>
                          <span>{item.word.mnemonicTip}</span>
                        </div>
                      )}
                      {item.word.examples && item.word.examples[0] && (
                        <div className={styles.exampleBox}>
                          &ldquo;{item.word.examples[0]}&rdquo;
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Bottom Navigation Group */}
        <div className={styles.bottomNavGroup}>
          <Link href="/study" className={styles.ctaBtnSecondary}>
            <BookIcon size={18} />
            Ôn Flashcard chuyên sâu
          </Link>
          <Link href="/" className={styles.ctaBtnSecondary}>
            <HomeIcon size={18} />
            Về Trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // ============================================
  // QUIZ TAKING STATE
  // ============================================
  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.quizTopBar}>
          <Link href="/study" className={styles.exitBtn}>
            ← Thoát Quiz
          </Link>

          <div className={styles.liveStats}>
            {combo >= 2 && (
              <div className={styles.comboBadge}>
                🔥 Combo {combo}x!
              </div>
            )}
            <div className={styles.questionBadge}>
              Câu {currentIndex + 1} / {questions.length}
            </div>
          </div>
        </div>

        <div className={styles.progressBarBg}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </header>

      <main className={styles.main}>
        <QuizCard 
          word={currentQ.word} 
          options={currentQ.options} 
          onAnswer={handleAnswer} 
        />
      </main>
    </div>
  );
}
