'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Confetti from '@/components/Confetti';
import { 
  ZapIcon,
  ClockIcon,
  RotateCcwIcon,
  SparklesIcon,
  LightbulbIcon,
  ArrowRightIcon,
  TargetIcon,
  BookOpenIcon,
  HelpCircleIcon,
  InfoIcon,
  CheckCircleIcon,
  CloseIcon,
  AwardIcon,
  BookIcon,
  HomeIcon,
  AlertCircleIcon,
} from '@/components/icons/AppIcons';
import { Part5Question, Part5DataSchema } from '@/schema/toeic';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import { storage } from '@/utils/storage';
import { getNextStudyTask, completeActiveTaskByType, AutoCompleteTaskResult } from '@/utils/studyPlanEngine';
import { GRAMMAR_CHEATSHEETS } from '@/data/grammarCheatsheets';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import PracticeFooter from '@/components/PracticeFooter';
import styles from './page.module.css';

const TIME_LIMIT = 20; // 20 seconds per question

function formatSeconds(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface ParsedExplanation {
  translation?: string;
  analysis?: string;
  fastTip?: string;
}

function parseExplanationSections(html: string): ParsedExplanation | null {
  if (!html || typeof html !== 'string') return null;

  const pMatches = html.match(/<p[\s\S]*?<\/p>/gi);
  if (!pMatches || pMatches.length === 0) return null;

  let translation = '';
  let analysis = '';
  let fastTip = '';

  for (const p of pMatches) {
    const inner = p.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '').trim();

    if (/<b>\s*Dịch nghĩa\s*:?\s*<\/b>/i.test(inner)) {
      translation = inner.replace(/<b>\s*Dịch nghĩa\s*:?\s*<\/b>\s*:?/i, '').trim();
    } else if (/<b>\s*Phân tích\s*(?:ngữ pháp|từ vựng)\s*:?\s*<\/b>/i.test(inner)) {
      analysis = inner.replace(/<b>\s*Phân tích\s*(?:ngữ pháp|từ vựng)\s*:?\s*<\/b>\s*:?/i, '').trim();
    } else if (/<b>\s*Mẹo giải nhanh[\s\S]*?<\/b>/i.test(inner)) {
      fastTip = inner.replace(/<b>\s*Mẹo giải nhanh[\s\S]*?<\/b>\s*:?/i, '').trim();
    }
  }

  if (!translation && !analysis && !fastTip) {
    return null;
  }

  return { translation, analysis, fastTip };
}

export const PART5_SUB_SKILLS = [
  { key: 'all', label: 'Tất cả câu hỏi' },
  { key: 'Word Form', label: 'Từ loại' },
  { key: 'Verb Tense', label: 'Thì động từ' },
  { key: 'Preposition & Conjunction', label: 'Giới từ & Liên từ' },
  { key: 'Business Vocabulary', label: 'Từ vựng công sở' },
  { key: 'Pronoun', label: 'Đại từ' },
  { key: 'Relative Clause', label: 'Mệnh đề quan hệ' },
  { key: 'Sentence Structure', label: 'Cấu trúc câu' },
];

export default function Part5Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading Trainer...</div>}>
      <Part5SpeedTrainer />
    </Suspense>
  );
}

function Part5SpeedTrainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testIdParam = searchParams.get('test') || 'ets2022_test1';
  const subCategoryParam = searchParams.get('subCategory') || 'all';

  const [selectedTest, setSelectedTest] = useState(testIdParam);
  const [selectedSubSkill, setSelectedSubSkill] = useState(subCategoryParam);

  const [practiceMode, setPracticeMode] = useState<'study' | 'speed'>('study');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [showClueHint, setShowClueHint] = useState(false);

  const [questions, setQuestions] = useState<Part5Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isFinished, setIsFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<{ question: Part5Question; userAnswer?: string }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [nextRoutine, setNextRoutine] = useState<AutoCompleteTaskResult | null>(null);

  const nextTask = getNextStudyTask();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const explanationRef = useRef<HTMLDivElement | null>(null);

  const { addMistake } = useMistakeNotebook();
  useLeaveWarning(currentIndex > 0 && !isFinished);

  const sessionKey = `toeic_p5sess_${selectedTest}_${selectedSubSkill}`;
  type SavedSession = {
    currentIndex: number;
    score: number;
    streak: number;
    wrongAnswers: { question: Part5Question; userAnswer?: string }[];
    selectedAnswer: string | null;
    showAnswer: boolean;
    isFinished: boolean;
    savedAt: number;
  };

  // Smooth scroll to explanation on mobile/narrow screens when answer is revealed
  useEffect(() => {
    if (showAnswer && typeof window !== 'undefined' && window.innerWidth < 992 && explanationRef.current) {
      explanationRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showAnswer]);

  // Load saved practice mode on mount
  useEffect(() => {
    const savedMode = storage.get<'study' | 'speed'>('toeic_part5_mode', 'study');
    if (savedMode === 'study' || savedMode === 'speed') {
      setPracticeMode(savedMode);
    }
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const sub = searchParams.get('subCategory');
    if (sub) {
      setSelectedSubSkill(sub);
    } else {
      setSelectedSubSkill('all');
    }
    const t = searchParams.get('test');
    if (t) {
      setSelectedTest(t);
    }
  }, [searchParams]);

  // Fetch questions (either single test or cross-test subskill pool)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        if (selectedSubSkill !== 'all') {
          // Official ETS tests (ETS 2022 Test 1 to Test 6)
          const testConfigs = [
            { id: 'ets2022_test1', path: '/data/ets2022/test1/part5.json' },
            { id: 'ets2022_test2', path: '/data/ets2022/test2/part5.json' },
            { id: 'ets2022_test3', path: '/data/ets2022/test3/part5.json' },
            { id: 'ets2022_test4', path: '/data/ets2022/test4/part5.json' },
            { id: 'ets2022_test5', path: '/data/ets2022/test5/part5.json' },
            { id: 'ets2022_test6', path: '/data/ets2022/test6/part5.json' },
          ];
          const responses = await Promise.all(testConfigs.map(c => fetch(c.path)));
          const allData: any[] = [];
          for (let i = 0; i < responses.length; i++) {
            const res = responses[i];
            if (res.ok) {
              const data = await res.json();
              const parsed = Part5DataSchema.parse(data);
              allData.push(...parsed.map(q => ({ ...q, testId: testConfigs[i].id })));
            }
          }
          const filtered = allData.filter(q => {
            const cat = q.subCategory || q.type || '';
            return cat.toLowerCase() === selectedSubSkill.toLowerCase() ||
                   cat.toLowerCase().includes(selectedSubSkill.toLowerCase());
          });
          setQuestions(filtered);
        } else {
          // Single test sequential mode
          const match = selectedTest.match(/ets(\d+)_test(\d+)/);
          if (!match) throw new Error("Invalid test ID");
          
          const path = `/data/ets${match[1]}/test${match[2]}/part5.json`;
          const res = await fetch(path);
          if (!res.ok) throw new Error("Failed to fetch test data");
          
          const data = await res.json();
          const validated = Part5DataSchema.parse(data);
          setQuestions(validated.map(q => ({ ...q, testId: selectedTest })));
        }

        const saved = storage.get<SavedSession | null>(sessionKey, null);
        const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
        if (saved && typeof saved.currentIndex === 'number' && Date.now() - saved.savedAt < SESSION_TTL_MS) {
          setCurrentIndex(saved.currentIndex);
          setScore(saved.score ?? 0);
          setStreak(saved.streak ?? 0);
          setTimeLeft(TIME_LIMIT);
          setIsFinished(saved.isFinished ?? false);
          setShowAnswer(saved.showAnswer ?? false);
          setShowExplanation(false);
          setSelectedAnswer(saved.selectedAnswer ?? null);
          setWrongAnswers(saved.wrongAnswers ?? []);
          setShowConfetti(false);
          setTutorContext(null);
        } else {
          // Reset session state
          setCurrentIndex(0);
          setScore(0);
          setStreak(0);
          setTimeLeft(TIME_LIMIT);
          setIsFinished(false);
          setShowAnswer(false);
          setShowExplanation(false);
          setSelectedAnswer(null);
          setWrongAnswers([]);
          setShowConfetti(false);
          setTutorContext(null);
        }
      } catch (err: any) {
        console.error("Error loading Part 5 data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [selectedTest, selectedSubSkill]);

  useEffect(() => {
    if (loading || questions.length === 0) return;
    if (isFinished) {
      storage.remove(sessionKey);
      return;
    }
    storage.set<SavedSession>(sessionKey, {
      currentIndex,
      score,
      streak,
      wrongAnswers,
      selectedAnswer,
      showAnswer,
      isFinished,
      savedAt: Date.now(),
    });
  }, [currentIndex, score, streak, wrongAnswers, selectedAnswer, showAnswer, isFinished, loading, questions.length, sessionKey]);

  const handleSelectSubSkill = (key: string) => {
    setSelectedSubSkill(key);
    if (key === 'all') {
      router.push(`/part5?test=${selectedTest}`);
    } else {
      router.push(`/part5?subCategory=${encodeURIComponent(key)}`);
    }
  };

  const handleSelectTest = (tId: string) => {
    setSelectedTest(tId);
    setSelectedSubSkill('all');
    router.push(`/part5?test=${tId}`);
  };

  const openAITutor = (q: Part5Question) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Xử lý testId tương tự recordMistake
    const qTestId = 'ets2022_test1';

    setTutorContext({
      partTitle: 'Part 5: Incomplete Sentences',
      number: q.number,
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
      userAnswer: selectedAnswer || undefined,
      explanation: q.explanation,
      subCategory: q.subCategory || q.type,
      grammarTag: q.grammarTag,
      questionId: q.id,
      testId: qTestId,
    });
  };

  const handleToggleMode = (mode: 'study' | 'speed') => {
    setPracticeMode(mode);
    storage.set('toeic_part5_mode', mode);
    if (mode === 'speed') {
      setTimeLeft(TIME_LIMIT);
    } else {
      setElapsedSeconds(0);
    }
  };

  const handleRestart = () => {
    storage.remove(sessionKey);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(TIME_LIMIT);
    setElapsedSeconds(0);
    setIsFinished(false);
    setShowAnswer(false);
    setShowExplanation(false);
    setShowClueHint(false);
    setSelectedAnswer(null);
    setWrongAnswers([]);
    setShowConfetti(false);
    setTutorContext(null);
  };

  useEffect(() => {
    if (loading || questions.length === 0 || isFinished || showAnswer || tutorContext) return;

    if (practiceMode === 'speed') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isFinished, showAnswer, questions, loading, tutorContext, practiceMode]);

  const recordMistake = (currentQ: Part5Question) => {
    const qTestId = (currentQ as any).testId || (selectedTest.match(/ets(\d+)_test(\d+)/) ? selectedTest : 'ets2022_test1');
    addMistake(`exam_${qTestId}_part5_${currentQ.id}`, {
      type: 'exam',
      testId: qTestId,
      part: 'part5',
      questionId: currentQ.id,
      subCategory: currentQ.subCategory || currentQ.type,
      grammarTag: currentQ.grammarTag,
    });
  };

  const handleTimeUp = () => {
    setShowAnswer(true);
    setShowExplanation(true);
    const currentQ = questions[currentIndex];
    if (currentQ) {
      setWrongAnswers(prev => [...prev, { question: currentQ, userAnswer: undefined }]);
      recordMistake(currentQ);
    }
  };

  const handleAnswer = (answer: string) => {
    if (showAnswer) return;
    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedAnswer(answer);
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    
    setShowExplanation(true);
    if (answer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setShowAnswer(true);
    } else {
      setWrongAnswers(prev => [...prev, { question: currentQ, userAnswer: answer }]);
      setStreak(0);
      recordMistake(currentQ);
      setShowAnswer(true);
    }
  };

  const moveToNextQuestion = () => {
    setTutorContext(null);
    setShowExplanation(false);
    setShowClueHint(false);
    setCurrentIndex(prev => {
      if (prev < questions.length - 1) {
        setTimeLeft(TIME_LIMIT);
        setElapsedSeconds(0);
        setShowAnswer(false);
        setSelectedAnswer(null);
        return prev + 1;
      } else {
        setIsFinished(true);
        if (selectedSubSkill === 'all') {
          storage.set(`progress_${selectedTest}_part5`, true);
        }
        const autoRes = completeActiveTaskByType('practice', {
          subCategory: selectedSubSkill !== 'all' ? selectedSubSkill : undefined,
          part: 'p5',
        });
        setNextRoutine(autoRes);
        return prev;
      }
    });
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (isFinished || questions.length === 0 || tutorContext) return;

      const key = e.key.toUpperCase();
      if (!showAnswer) {
        if (['A', 'B', 'C', 'D'].includes(key)) {
          handleAnswer(key);
        }
      } else {
        if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          moveToNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Confetti on good score
  useEffect(() => {
    if (isFinished && questions.length > 0 && score / questions.length >= 0.7) {
      setShowConfetti(true);
    }
  }, [isFinished, score, questions.length]);

  const activeSubMeta = PART5_SUB_SKILLS.find(s => s.key.toLowerCase() === selectedSubSkill.toLowerCase());
  const currentCheatsheet = selectedSubSkill !== 'all' ? GRAMMAR_CHEATSHEETS[selectedSubSkill] : null;

  if (loading) {
    return <div className={styles.loading}>Loading Trainer...</div>;
  }

  if (error) {
    return <div className={styles.loading} style={{color: 'red'}}>Lỗi: {error}</div>;
  }

  if (questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.subSkillContainer}>
          <div className={styles.subSkillScroll}>
            {PART5_SUB_SKILLS.map(skill => (
              <button
                key={skill.key}
                type="button"
                className={`${styles.subSkillPill} ${selectedSubSkill === skill.key ? styles.subSkillPillActive : ''}`}
                onClick={() => handleSelectSubSkill(skill.key)}
              >
                {skill.key !== 'all' && <TargetIcon size={12} />}
                {skill.label}
              </button>
            ))}
          </div>
        </div>
        <div className={`${styles.finishedCard} card-minimal`}>
          <h2>Không tìm thấy câu hỏi</h2>
          <p className={styles.feedback}>Không có câu hỏi nào khớp với chủ điểm đã chọn.</p>
          <button onClick={() => handleSelectSubSkill('all')} className={styles.primaryBtn}>
            Làm tất cả câu hỏi
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
    const isSubSkillMode = selectedSubSkill !== 'all';

    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />
        
        {/* Modern Hero Performance Dashboard */}
        <div className={`${styles.finishedDashboard} animate-slide-up`}>
          <div className={styles.summaryTopRow}>
            <div className={styles.summaryMeta}>
              <span className={styles.categoryPill}>
                <TargetIcon size={14} />
                {isSubSkillMode ? `Chuyên đề: ${activeSubMeta?.label || selectedSubSkill}` : 'Speed Trainer Part 5'}
              </span>
              <h1 className={styles.summaryTitle}>Tổng kết bài luyện tập</h1>
            </div>
            <div className={styles.summaryPacingBadge}>
              {percentage >= 80 ? (
                <span className={styles.badgeMastered}><AwardIcon size={16} /> Xuất sắc</span>
              ) : percentage >= 50 ? (
                <span className={styles.badgeGood}><CheckCircleIcon size={16} /> Khá tốt</span>
              ) : (
                <span className={styles.badgeNeedsPractice}><AlertCircleIcon size={16} /> Cần củng cố</span>
              )}
            </div>
          </div>

          <div className={styles.dashboardGrid}>
            {/* Left: Score Gauge / Circular Progress */}
            <div className={styles.scoreGaugeCard}>
              <div className={styles.scoreRingWrapper}>
                <svg className={styles.scoreSvg} viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" className={styles.scoreTrack} />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className={styles.scoreProgress}
                    style={{
                      strokeDasharray: 314.16,
                      strokeDashoffset: 314.16 - (314.16 * percentage) / 100,
                      stroke: percentage >= 80 ? 'var(--success, #22c55e)' : percentage >= 50 ? 'var(--primary, #3b82f6)' : 'var(--warning, #f59e0b)',
                    }}
                  />
                </svg>
                <div className={styles.scoreCenter}>
                  <div className={styles.scoreBig}>
                    {score}<span className={styles.scoreDivider}>/{questions.length}</span>
                  </div>
                  <div className={styles.scorePercent}>{Math.round(percentage)}%</div>
                </div>
              </div>
            </div>

            {/* Right: Key Stats & Pedagogical Insight */}
            <div className={styles.statsInsightColumn}>
              <div className={styles.statTilesGrid}>
                <div className={styles.statTile}>
                  <div className={styles.statTileLabel}>Số câu đúng</div>
                  <div className={styles.statTileValueSuccess}>{score} câu</div>
                </div>
                <div className={styles.statTile}>
                  <div className={styles.statTileLabel}>Số câu cần sửa</div>
                  <div className={styles.statTileValueWarning}>{wrongAnswers.length} câu</div>
                </div>
                <div className={styles.statTile}>
                  <div className={styles.statTileLabel}>Chủ điểm</div>
                  <div className={styles.statTileValueSub}>{activeSubMeta?.label || 'Tổng hợp Part 5'}</div>
                </div>
              </div>

              <div className={styles.feedbackCard}>
                <div className={styles.feedbackIconWrap}>
                  <LightbulbIcon size={18} />
                </div>
                <p className={styles.feedbackText}>
                  {percentage >= 80 ? `Tuyệt vời! Bạn nắm rất vững kiến thức ${activeSubMeta?.label || 'Part 5'}. Hãy duy trì phản xạ luyện tập mỗi ngày để giữ vững phong độ.` :
                   percentage >= 50 ? `Khá tốt! Bạn đã vượt qua hơn một nửa số câu hỏi. Hãy xem kỹ phân tích các câu sai bên dưới để bóc tách bẫy và ghi nhớ các quy tắc ngữ pháp quan trọng.` :
                   `Chủ điểm này còn nhiều bẫy ngữ pháp. Hãy xem lại từng câu sai bên dưới, đối chiếu đáp án và lưu lại các câu quan trọng vào Sổ tay.`}
                </p>
              </div>
            </div>
          </div>

          {/* Unified Action Buttons Toolbar */}
          <div className={styles.actionToolbar}>
            {nextRoutine?.nextTask ? (
              <Link
                href={nextRoutine.nextTask.link}
                className={styles.primaryActionBtn}
                style={{ background: 'var(--primary)', color: '#ffffff', fontWeight: 700 }}
              >
                <span>Tiếp tục: {nextRoutine.nextTask.title}</span>
                <ArrowRightIcon size={16} />
              </Link>
            ) : nextRoutine?.isDayCompleted ? (
              <Link
                href="/"
                className={styles.primaryActionBtn}
                style={{ background: 'var(--success)', color: '#ffffff', fontWeight: 700 }}
              >
                <CheckCircleIcon size={16} />
                <span>Mục tiêu hôm nay hoàn thành (+50 XP) • Về Dashboard</span>
              </Link>
            ) : null}

            <button onClick={handleRestart} className={nextRoutine?.nextTask ? styles.secondaryActionBtn : styles.primaryActionBtn}>
              <RotateCcwIcon size={16} /> Luyện lại bài này
            </button>
            {isSubSkillMode ? (
              <>
                <Link href="/stats" className={styles.secondaryActionBtn}>
                  <TargetIcon size={16} /> Xem Biểu đồ Radar Lỗ hổng
                </Link>
                <button onClick={() => handleSelectSubSkill('all')} className={styles.secondaryActionBtn}>
                  <BookIcon size={16} /> Làm đề đầy đủ 30 câu
                </button>
              </>
            ) : !nextRoutine?.nextTask ? (
              <Link href={nextTask.link === '/part5' ? `/part6?test=${selectedTest}` : nextTask.link} className={styles.secondaryActionBtn}>
                Học tiếp: {nextTask.link === '/part5' ? 'Part 6 (Điền đoạn văn)' : nextTask.title} <ArrowRightIcon size={16} />
              </Link>
            ) : null}
            <Link href="/" className={styles.ghostActionBtn}>
              <HomeIcon size={16} /> Về Dashboard
            </Link>
          </div>
        </div>

        {/* Upgraded Wrong Answers Review Section */}
        {wrongAnswers.length > 0 && (
          <div className={styles.wrongAnswersSection}>
            <div className={styles.wrongAnswersHeader}>
              <div className={styles.wrongAnswersTitleRow}>
                <h2 className={styles.wrongAnswersTitle}>
                  Phân tích chi tiết {wrongAnswers.length} câu cần khắc phục
                </h2>
                <span className={styles.wrongCountPill}>
                  {wrongAnswers.length} / {questions.length} câu
                </span>
              </div>
              <p className={styles.wrongAnswersSubtitle}>
                Đối chiếu phương án bạn đã chọn với đáp án chuẩn ETS, bóc tách cấu trúc ngữ pháp và nhận diện bẫy đề thi.
              </p>
            </div>

            <div className={styles.wrongAnswersList}>
              {wrongAnswers.map(({ question: q, userAnswer }) => {
                const parts = q.text.split(/_{3,}/);
                const beforeBlank = parts[0] || '';
                const afterBlank = parts[1] || '';

                return (
                  <div key={q.id} className={styles.wrongCard}>
                    {/* Top Metadata */}
                    <div className={styles.wrongCardTopRow}>
                      <div className={styles.wrongMetaTags}>
                        <span className={styles.qNumTag}>Câu #{q.number}</span>
                        <span className={styles.subCategoryTag}>{q.subCategory || q.type || 'Grammar'}</span>
                        {q.grammarTag && <span className={styles.grammarTagBadge}>{q.grammarTag}</span>}
                      </div>
                      <div className={styles.choiceComparisonPill}>
                        <span className={styles.userChoiceLabel}>
                          Bạn chọn: <strong>({userAnswer || 'Chưa chọn'})</strong>
                        </span>
                        <span className={styles.dividerDot}>•</span>
                        <span className={styles.correctChoiceLabel}>
                          Đáp án đúng: <strong>({q.correctAnswer})</strong>
                        </span>
                      </div>
                    </div>

                    {/* Question Sentence Box */}
                    <div className={styles.questionSentenceBox}>
                      {beforeBlank}
                      <span className={styles.highlightedBlank}>
                        {q.options[q.correctAnswer]}
                      </span>
                      {afterBlank}
                    </div>

                    {/* 4 Options Grid with clear status */}
                    <div className={styles.reviewOptionsGrid}>
                      {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                        const isCorrect = letter === q.correctAnswer;
                        const isUserChoice = letter === userAnswer;
                        let optCardClass = styles.reviewOptNeutral;
                        if (isCorrect) optCardClass = styles.reviewOptCorrect;
                        else if (isUserChoice) optCardClass = styles.reviewOptIncorrect;

                        return (
                          <div key={letter} className={`${styles.reviewOptCard} ${optCardClass}`}>
                            <div className={styles.reviewOptLetter}>{letter}</div>
                            <div className={styles.reviewOptContent}>
                              <span className={styles.reviewOptText}>{q.options[letter]}</span>
                              {isCorrect && (
                                <span className={styles.reviewOptBadgeSuccess}>
                                  <CheckCircleIcon size={12} /> Đáp án đúng
                                </span>
                              )}
                              {isUserChoice && !isCorrect && (
                                <span className={styles.reviewOptBadgeError}>
                                  <CloseIcon size={12} /> Bạn đã chọn
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Structured Pedagogical Explanation */}
                    <div className={styles.structuredExplanation}>
                      <div className={styles.explanationHeader}>
                        <LightbulbIcon size={16} />
                        <span>Lời giải chi tiết & Phân tích ngữ pháp</span>
                      </div>
                      <div
                        className={styles.explanationBody}
                        dangerouslySetInnerHTML={{ __html: q.explanation }}
                      />
                    </div>

                    {/* Bottom Action */}
                    <div className={styles.wrongCardFooter}>
                      <button
                        type="button"
                        className={styles.askAiButton}
                        onClick={() => setTutorContext({
                          partTitle: 'Part 5: Incomplete Sentences',
                          number: q.number,
                          text: q.text,
                          options: q.options,
                          correctAnswer: q.correctAnswer,
                          userAnswer: userAnswer,
                          explanation: q.explanation,
                          subCategory: q.subCategory || q.type,
                          grammarTag: q.grammarTag,
                        })}
                      >
                        <SparklesIcon size={16} />
                        Hỏi Gia Sư AI bóc tách bẫy câu này
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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

  const currentQ = questions[currentIndex];
  const parsedExp = (showAnswer && currentQ?.explanation) ? parseExplanationSections(currentQ.explanation) : null;
  const progressPercent = ((currentIndex) / questions.length) * 100;

  const getButtonClass = (key: string) => {
    if (!showAnswer) return styles.optionBtn;
    if (key === currentQ.correctAnswer) return `${styles.optionBtn} ${styles.correct}`;
    if (key === selectedAnswer) return `${styles.optionBtn} ${styles.incorrect}`;
    return `${styles.optionBtn} ${styles.disabled}`;
  };

  return (
    <div className={styles.container}>
      {/* Sub-skill and Test Selector Pill Bar */}
      <div className={styles.subSkillContainer}>
        <div className={styles.subSkillScroll}>
          {PART5_SUB_SKILLS.map(skill => (
            <button
              key={skill.key}
              type="button"
              className={`${styles.subSkillPill} ${selectedSubSkill === skill.key ? styles.subSkillPillActive : ''}`}
              onClick={() => handleSelectSubSkill(skill.key)}
            >
              {skill.key !== 'all' && <TargetIcon size={12} />}
              {skill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Streamlined Controls Row: Mode Toggle + Cheatsheet Trigger + Sub-skill context */}
      <div className={styles.modeControlRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div className={styles.modeToggleGroup}>
            <button
              type="button"
              className={`${styles.modeBtn} ${practiceMode === 'study' ? styles.modeBtnActive : ''}`}
              onClick={() => handleToggleMode('study')}
            >
              <BookOpenIcon size={14} />
              <span>Học kỹ</span>
            </button>
            <button
              type="button"
              className={`${styles.modeBtn} ${practiceMode === 'speed' ? styles.modeBtnActive : ''}`}
              onClick={() => handleToggleMode('speed')}
            >
              <ClockIcon size={14} />
              <span>Tốc độ (20s)</span>
            </button>
          </div>

          {selectedSubSkill !== 'all' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                ({questions.length} câu ETS)
              </span>
              <button 
                type="button" 
                onClick={() => handleSelectSubSkill('all')}
                className={styles.clearSkillBtn}
              >
                Quay lại cả đề
              </button>
            </div>
          ) : (
            <div className={styles.testSelectorRow}>
              <span>Đề:</span>
              <button
                type="button"
                className={`${styles.testOptionBtn} ${selectedTest === 'ets2022_test1' ? styles.testOptionActive : ''}`}
                onClick={() => handleSelectTest('ets2022_test1')}
              >
                Test 1 (Chuẩn ETS)
              </button>
              <button
                type="button"
                className={`${styles.testOptionBtn} ${selectedTest === 'ets2022_test2' ? styles.testOptionActive : ''}`}
                onClick={() => handleSelectTest('ets2022_test2')}
              >
                Test 2 (Chuẩn ETS)
              </button>
              <button
                type="button"
                className={`${styles.testOptionBtn} ${selectedTest === 'ets2022_test3' ? styles.testOptionActive : ''}`}
                onClick={() => handleSelectTest('ets2022_test3')}
              >
                Test 3 (Chuẩn ETS)
              </button>
              <button
                type="button"
                className={`${styles.testOptionBtn} ${selectedTest === 'ets2022_test4' ? styles.testOptionActive : ''}`}
                onClick={() => handleSelectTest('ets2022_test4')}
              >
                Test 4 (Chuẩn ETS)
              </button>
              <button
                type="button"
                className={`${styles.testOptionBtn} ${selectedTest === 'ets2022_test5' ? styles.testOptionActive : ''}`}
                onClick={() => handleSelectTest('ets2022_test5')}
              >
                Test 5 (Chuẩn ETS)
              </button>
              <button
                type="button"
                className={`${styles.testOptionBtn} ${selectedTest === 'ets2022_test6' ? styles.testOptionActive : ''}`}
                onClick={() => handleSelectTest('ets2022_test6')}
              >
                Test 6 (Chuẩn ETS)
              </button>
            </div>
          )}
        </div>

        {currentCheatsheet && (
          <button 
            type="button" 
            className={styles.cheatsheetToggleBtn}
            onClick={() => setShowCheatsheet(prev => !prev)}
          >
            <BookOpenIcon size={14} style={{ color: 'var(--primary)' }} />
            <span>{showCheatsheet ? 'Thu gọn lý thuyết' : `Lý thuyết: ${currentCheatsheet.title}`}</span>
          </button>
        )}
      </div>

      {/* Expandable Grammar Cheatsheet Modal/Drawer Dropdown */}
      {currentCheatsheet && showCheatsheet && (
        <div className={styles.cheatsheetCard}>
          <div className={styles.cheatsheetBody}>
            <p className={styles.cheatsheetTagline}>{currentCheatsheet.tagline}</p>
            
            <div className={styles.formulaBox}>
              <strong>Công thức cốt lõi: </strong> {currentCheatsheet.ruleFormula}
            </div>

            {currentCheatsheet.suffixes && currentCheatsheet.suffixes.length > 0 && (
              <div className={styles.suffixesGrid}>
                {currentCheatsheet.suffixes.map(s => (
                  <div key={s.category} className={styles.suffixCard}>
                    <div className={styles.suffixCategory}>{s.category}</div>
                    <div className={styles.suffixEndings}>{s.endings}</div>
                    <div className={styles.suffixExamples}>Ví dụ: {s.examples}</div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.rulesList}>
              {currentCheatsheet.keyRules.map((rule, idx) => (
                <div key={idx} className={styles.ruleItem}>
                  <div className={styles.ruleItemTitle}>{rule.title}</div>
                  <div className={styles.ruleItemFormula}>{rule.formula}</div>
                  <div className={styles.ruleItemExplanation}>{rule.explanation}</div>
                </div>
              ))}
            </div>

            <div className={styles.stepsBox}>
              <div className={styles.stepsTitle}>Quy trình 3 bước giải nhanh:</div>
              {currentCheatsheet.solvingSteps.map((step, idx) => (
                <div key={idx} className={styles.stepItem}>{step}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className={styles.header}>
        <div className={styles.topHeaderRow}>
          <div className={styles.progressSection}>
            <div className={styles.statsRow}>
              <span className={styles.questionCount}>Câu #{currentQ.number} ({currentIndex + 1} / {questions.length})</span>
              {streak > 0 && (
                <div className={`${styles.streakBadge} ${styles.streakActive}`}>
                  <span className={styles.streakFire}><ZapIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', color: '#ff9800' }} /></span> {streak} Streak!
                </div>
              )}
            </div>
            <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
          
          <div className={styles.timerSection}>
            <span className={`${styles.timerIcon} ${practiceMode === 'speed' && timeLeft <= 5 ? styles.timerWarningIcon : ''}`}>
              <ClockIcon size={20} />
            </span>
            <span className={`${styles.timerText} ${practiceMode === 'speed' && timeLeft <= 5 ? styles.timerTextWarning : ''}`}>
              {practiceMode === 'speed' ? `${timeLeft}s` : formatSeconds(elapsedSeconds)}
            </span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={`${styles.workspace} ${showAnswer ? styles.workspaceSplit : ''}`}>
          {/* Left Column: Question & Options */}
          <div className={`${styles.questionCard} card-minimal`}>
            <div className={styles.cardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className={styles.categoryBadge}>{currentQ.subCategory || currentQ.type || 'Grammar'}</span>
                {currentQ.grammarTag && (
                  <span className={styles.sourceBadge}>{currentQ.grammarTag}</span>
                )}
              </div>
              {showAnswer && (
                <span className={selectedAnswer === currentQ.correctAnswer ? styles.answeredBadgeCorrect : styles.answeredBadgeWrong}>
                  {selectedAnswer === currentQ.correctAnswer ? 'Chính xác' : `Đáp án: (${currentQ.correctAnswer})`}
                </span>
              )}
            </div>
            <p className={styles.sentence}>
              {currentQ.text.split(/_{3,}/)[0]}
              <span className={styles.blankFill}>
                {showAnswer ? currentQ.options[currentQ.correctAnswer as keyof typeof currentQ.options] : '___'}
              </span>
              {currentQ.text.split(/_{3,}/)[1] || ''}
            </p>

            {/* Clue Hint Button & Box */}
            {!showAnswer && (
              <div className={styles.clueHintRow}>
                <button
                  type="button"
                  className={`${styles.clueHintToggleBtn} ${showClueHint ? styles.clueHintToggleBtnActive : ''}`}
                  onClick={() => setShowClueHint(prev => !prev)}
                >
                  <HelpCircleIcon size={14} />
                  <span>{showClueHint ? 'Ẩn manh mối' : 'Gợi ý manh mối tư duy'}</span>
                </button>
              </div>
            )}

            {showClueHint && !showAnswer && (
              <div className={styles.clueHintBox}>
                <div className={styles.clueHintTitle}>
                  <LightbulbIcon size={15} />
                  <span>Manh Mối Tư Duy (Clue Hint)</span>
                </div>
                <p>
                  {currentQ.clueHint || `Quan sát từ đứng trước và sau chỗ trống: Câu này thuộc chuyên đề ${currentQ.subCategory || 'Ngữ pháp'}. Hãy xác định vai trò của chỗ trống trong câu (cần Danh từ, Tính từ, Trạng từ hay Động từ chia thì) để loại trừ phương án sai.`}
                </p>
              </div>
            )}

            <div className={styles.optionsGrid}>
              {(Object.entries(currentQ.options) as [string, string][]).map(([key, value]) => (
                <button
                  key={key}
                  className={getButtonClass(key)}
                  onClick={() => handleAnswer(key)}
                  disabled={showAnswer}
                >
                  <span className={styles.optionLetter}>{key}</span>
                  <span className={styles.optionText}>{value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dedicated Explanation Board (Side-by-side on desktop, auto-scroll on mobile) */}
          {showAnswer && currentQ.explanation && (
            <div ref={explanationRef} className={`${styles.explanationBoard} card-minimal animate-slide-up`}>
              <div className={styles.explanationBoardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LightbulbIcon size={18} style={{ color: 'var(--primary)' }} />
                  <span className={styles.explanationBoardTitle}>Lời giải chi tiết & Bóc tách bẫy</span>
                </div>
                <span className={styles.pedagogyBadge}>Chuẩn Sư Phạm ETS</span>
              </div>

              <div className={styles.explanationBoardScroll}>
                {/* 1. Mẹo giải nhanh & Bẫy ETS (Highlight on top) */}
                {parsedExp?.fastTip && (
                  <div className={styles.fastTipCallout}>
                    <div className={styles.fastTipCalloutHeader}>
                      <ZapIcon size={16} />
                      <span>Mẹo giải nhanh & Bẫy ETS (3 Giây)</span>
                    </div>
                    <div 
                      className={styles.fastTipCalloutContent}
                      dangerouslySetInnerHTML={{ __html: parsedExp.fastTip }}
                    />
                  </div>
                )}

                {/* 2. Syntax Visualizer */}
                {currentQ.syntaxBreakdown && (
                  <div className={styles.syntaxVisualizerBox}>
                    <div className={styles.syntaxVisualizerTitle}>Trực quan hóa cấu trúc câu (Syntax Visualizer)</div>
                    <div className={styles.syntaxTokensGrid}>
                      {currentQ.syntaxBreakdown.subject && (
                        <div className={`${styles.syntaxToken} ${styles.syntaxTokenSubject}`}>
                          <span className={styles.syntaxTokenLabel}>Chủ ngữ (Subject)</span>
                          <span className={styles.syntaxTokenContent}>{currentQ.syntaxBreakdown.subject}</span>
                        </div>
                      )}
                      {currentQ.syntaxBreakdown.verb && (
                        <div className={`${styles.syntaxToken} ${styles.syntaxTokenVerb}`}>
                          <span className={styles.syntaxTokenLabel}>Động từ chính (Verb)</span>
                          <span className={styles.syntaxTokenContent}>{currentQ.syntaxBreakdown.verb}</span>
                        </div>
                      )}
                      {currentQ.syntaxBreakdown.objectOrComplement && (
                        <div className={`${styles.syntaxToken} ${styles.syntaxTokenObject}`}>
                          <span className={styles.syntaxTokenLabel}>Tân ngữ / Bổ ngữ (Object/Prep)</span>
                          <span className={styles.syntaxTokenContent}>{currentQ.syntaxBreakdown.objectOrComplement}</span>
                        </div>
                      )}
                      {currentQ.syntaxBreakdown.blankRole && (
                        <div className={`${styles.syntaxToken} ${styles.syntaxTokenBlank}`}>
                          <span className={styles.syntaxTokenLabel}>Vai trò chỗ trống</span>
                          <span className={styles.syntaxTokenContent}>{currentQ.syntaxBreakdown.blankRole}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Phân tích ngữ pháp / từ vựng & Loại trừ đáp án */}
                {parsedExp?.analysis && (
                  <div className={styles.analysisBox}>
                    <div className={styles.analysisBoxHeader}>
                      <TargetIcon size={15} />
                      <span>Phân tích chi tiết & Loại trừ</span>
                    </div>
                    <div 
                      className={styles.analysisBoxContent}
                      dangerouslySetInnerHTML={{ __html: parsedExp.analysis }}
                    />
                  </div>
                )}

                {/* 4. Dịch nghĩa toàn câu */}
                {parsedExp?.translation && (
                  <div className={styles.translationBox}>
                    <div className={styles.translationBoxHeader}>
                      <BookOpenIcon size={15} />
                      <span>Dịch nghĩa câu</span>
                    </div>
                    <div 
                      className={styles.translationBoxContent}
                      dangerouslySetInnerHTML={{ __html: parsedExp.translation }}
                    />
                  </div>
                )}

                {/* Fallback if parsing didn't find sections */}
                {!parsedExp && (
                  <div 
                    className={styles.explanationBoxContent}
                    dangerouslySetInnerHTML={{ __html: currentQ.explanation }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <PracticeFooter
        isAnswered={showAnswer}
        isCorrect={selectedAnswer === currentQ.correctAnswer}
        correctMessage="Ngữ pháp rất chắc chắn!"
        incorrectMessage={practiceMode === 'speed' && selectedAnswer === null ? "Hết thời gian!" : `Đáp án đúng là (${currentQ.correctAnswer})`}
        onNext={moveToNextQuestion}
        onAITutor={() => openAITutor(currentQ)}
        nextLabel={currentIndex + 1 === questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}
      />

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
