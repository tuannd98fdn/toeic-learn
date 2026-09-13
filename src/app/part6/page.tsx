'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Confetti from '@/components/Confetti';
import { NormalizedPart6Passage, Part6DataSchema } from '@/schema/toeic';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import { storage } from '@/utils/storage';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import { 
  AwardIcon, 
  BookIcon, 
  RotateCcwIcon, 
  HomeIcon, 
  ClockIcon, 
  TargetIcon, 
  ZapIcon 
} from '@/components/icons/AppIcons';
import PracticeFooter from '@/components/PracticeFooter';
import styles from './page.module.css';

export const TEST_OPTIONS = [
  { key: 'ets2022_test1', label: 'ETS 2022 Test 1' },
  { key: 'ets2022_test2', label: 'ETS 2022 Test 2' },
  { key: 'all', label: 'Liên đề (Test 1 + Test 2)' },
];

export const PART6_SUB_SKILLS = [
  { key: 'all', label: 'Tất cả dạng câu' },
  { key: 'Sentence Insertion', label: 'Điền cả câu văn' },
  { key: 'Grammar', label: 'Ngữ pháp (Thì, Dạng từ, Cấu trúc)' },
  { key: 'Business Vocabulary', label: 'Từ vựng công sở' },
  { key: 'Preposition & Conjunction', label: 'Giới từ & Liên từ' },
];

interface PassagePacingRecord {
  passageTitle: string;
  passageType: string;
  elapsedSeconds: number;
  score: number;
  totalQuestions: number;
  secondsPerQuestion: number;
  status: 'Ahead' | 'On Track' | 'Behind';
}

const TARGET_PACE_SECONDS = 120; // 120s (2 minutes) per 4-question passage

function matchesSubSkill(q: { subCategory?: string; grammarTag?: string }, subSkill: string): boolean {
  if (subSkill === 'all') return true;
  const sub = (q.subCategory || '').toLowerCase();
  const gram = (q.grammarTag || '').toLowerCase();

  if (subSkill === 'Sentence Insertion') {
    return gram.includes('sentence insertion') || sub.includes('contextual completion');
  }
  if (subSkill === 'Grammar') {
    return (
      sub.includes('verb tense') ||
      sub.includes('word form') ||
      sub.includes('sentence structure') ||
      sub.includes('pronoun') ||
      sub.includes('relative clause') ||
      gram.includes('verb') ||
      gram.includes('passive') ||
      gram.includes('adjective') ||
      gram.includes('pronoun') ||
      gram.includes('parallel')
    );
  }
  if (subSkill === 'Business Vocabulary') {
    return sub.includes('business vocabulary') || gram.includes('vocabulary') || gram.includes('idiom');
  }
  if (subSkill === 'Preposition & Conjunction') {
    return sub.includes('preposition') || sub.includes('conjunction') || gram.includes('conjunction') || gram.includes('preposition');
  }
  return false;
}

export default function Part6Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải dữ liệu bài thi...</div>}>
      <Part6Trainer />
    </Suspense>
  );
}

function Part6Trainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTest = searchParams.get('test') || 'ets2022_test1';
  const initialSubSkill = searchParams.get('subCategory') || 'all';

  const [testId, setTestId] = useState<string>(initialTest);
  const [selectedSubSkill, setSelectedSubSkill] = useState<string>(initialSubSkill);

  const [allPassages, setAllPassages] = useState<NormalizedPart6Passage[]>([]);
  const [passages, setPassages] = useState<NormalizedPart6Passage[]>([]);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const passage = passages[currentPassageIndex] || null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeBlank, setActiveBlank] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSetScore, setCurrentSetScore] = useState(0);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  // Pacing Tracking State
  const passageStartTimeRef = useRef<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimeAttack, setIsTimeAttack] = useState(false);
  const [sessionPacingHistory, setSessionPacingHistory] = useState<PassagePacingRecord[]>([]);

  const { addMistake } = useMistakeNotebook();
  useLeaveWarning(Object.keys(answers).length > 0 && !isSubmitted);

  // Load Time Attack preference
  useEffect(() => {
    const savedTimeAttack = localStorage.getItem('toeic_part6_time_attack');
    if (savedTimeAttack === 'true') {
      setIsTimeAttack(true);
    }
  }, []);

  const toggleTimeAttack = () => {
    const nextVal = !isTimeAttack;
    setIsTimeAttack(nextVal);
    localStorage.setItem('toeic_part6_time_attack', String(nextVal));
  };

  // Sync state with URL params
  useEffect(() => {
    const sub = searchParams.get('subCategory');
    if (sub && sub !== selectedSubSkill) {
      setSelectedSubSkill(sub);
    }
    const t = searchParams.get('test');
    if (t && t !== testId) {
      setTestId(t);
    }
  }, [searchParams]);

  // Fetch passages (Single test or Cross-test pooling)
  useEffect(() => {
    const fetchPassages = async () => {
      try {
        setLoading(true);
        setError(null);

        let rawLoadedPassages: any[] = [];

        if (testId === 'all') {
          // Cross-test pooling: Load both Test 1 and Test 2
          const [res1, res2] = await Promise.all([
            fetch('/data/ets2022/test1/part6.json'),
            fetch('/data/ets2022/test2/part6.json'),
          ]);

          if (!res1.ok || !res2.ok) throw new Error('Không thể tải dữ liệu liên đề');
          const [d1, d2] = await Promise.all([res1.json(), res2.json()]);
          const v1 = Part6DataSchema.parse(d1).map(p => ({ ...p, source: 'ETS 2022 Test 1' }));
          const v2 = Part6DataSchema.parse(d2).map(p => ({ ...p, source: 'ETS 2022 Test 2' }));
          rawLoadedPassages = [...v1, ...v2];
        } else {
          const match = testId.match(/ets(\d+)_test(\d+)/);
          if (!match) throw new Error('Mã đề thi không hợp lệ');

          const path = `/data/ets${match[1]}/test${match[2]}/part6.json`;
          const res = await fetch(path);
          if (!res.ok) throw new Error('Không thể tải dữ liệu đề thi');

          const data = await res.json();
          const validated = Part6DataSchema.parse(data);
          rawLoadedPassages = validated.map(p => ({
            ...p,
            source: `ETS ${match[1]} Test ${match[2]}`,
          }));
        }

        if (rawLoadedPassages.length > 0) {
          const normalized = rawLoadedPassages.map(p => ({
            ...p,
            questions: p.questions.map((q: any, idx: number) => ({
              ...q,
              blankNumber: idx + 1,
            })),
          }));
          setAllPassages(normalized as NormalizedPart6Passage[]);
        } else {
          setError('Không tìm thấy đoạn văn nào');
        }
      } catch (err: any) {
        console.error('Error loading Part 6 data:', err);
        setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchPassages();
  }, [testId]);

  // Filter passages based on selectedSubSkill
  useEffect(() => {
    if (allPassages.length === 0) return;

    let filtered = allPassages;
    if (selectedSubSkill !== 'all') {
      filtered = allPassages.filter(p => 
        p.questions.some(q => matchesSubSkill(q, selectedSubSkill))
      );
    }

    setPassages(filtered);
    setCurrentPassageIndex(0);
    setAnswers({});
    setIsSubmitted(false);
    setIsFinished(false);
    setTotalScore(0);
    setTotalQuestions(0);
    setShowConfetti(false);
    setSessionPacingHistory([]);
    passageStartTimeRef.current = Date.now();
    setElapsedSeconds(0);

    // Focus on first matching blank in the first passage
    if (filtered.length > 0 && selectedSubSkill !== 'all') {
      const matchIndex = filtered[0].questions.findIndex(q => matchesSubSkill(q, selectedSubSkill));
      setActiveBlank(matchIndex !== -1 ? matchIndex + 1 : 1);
    } else {
      setActiveBlank(1);
    }
  }, [allPassages, selectedSubSkill]);

  // Pacing Timer Interval
  useEffect(() => {
    if (isSubmitted || isFinished || loading || !passage) return;

    const interval = setInterval(() => {
      const seconds = Math.max(0, Math.round((Date.now() - passageStartTimeRef.current) / 1000));
      setElapsedSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted, isFinished, loading, passage, currentPassageIndex]);

  const handleSubSkillChange = (newSubSkill: string) => {
    setSelectedSubSkill(newSubSkill);
    router.push(`/part6?test=${testId}&subCategory=${encodeURIComponent(newSubSkill)}`);
  };

  const handleTestChange = (newTest: string) => {
    setTestId(newTest);
    router.push(`/part6?test=${newTest}&subCategory=${encodeURIComponent(selectedSubSkill)}`);
  };

  const getPacingStatus = (seconds: number): 'Ahead' | 'On Track' | 'Behind' => {
    if (seconds < 90) return 'Ahead';
    if (seconds <= TARGET_PACE_SECONDS) return 'On Track';
    return 'Behind';
  };

  const handleSelectAnswer = (blankNumber: number, optionKey: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [blankNumber]: optionKey }));

    // Auto move to next blank if not on the last one
    if (blankNumber < 4) {
      setActiveBlank(blankNumber + 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let score = 0;
    passage?.questions.forEach((q) => {
      if (answers[q.blankNumber] === q.correctAnswer) {
        score++;
      } else {
        addMistake(`exam_${testId}_part6_${q.id}`, {
          type: 'exam',
          testId: testId,
          part: 'part6',
          questionId: q.id,
          subCategory: q.subCategory || q.type,
          grammarTag: q.grammarTag,
        });
      }
    });

    const finalSeconds = Math.max(1, Math.round((Date.now() - passageStartTimeRef.current) / 1000));
    const status = getPacingStatus(finalSeconds);
    const pacingRecord: PassagePacingRecord = {
      passageTitle: passage?.title && passage.title !== 'Part 6 Passage' 
        ? passage.title 
        : `Bài đọc ${currentPassageIndex + 1}`,
      passageType: passage?.type || 'Thông báo / Email',
      elapsedSeconds: finalSeconds,
      score,
      totalQuestions: passage?.questions.length || 4,
      secondsPerQuestion: Math.round(finalSeconds / (passage?.questions.length || 4)),
      status,
    };
    setSessionPacingHistory(prev => [...prev, pacingRecord]);

    setCurrentSetScore(score);
    setTotalScore(prev => prev + score);
    if (score === (passage?.questions.length || 0)) {
      setShowConfetti(true);
    }
  };

  const handleNextPassage = () => {
    if (currentPassageIndex < passages.length - 1) {
      setTotalQuestions(prev => prev + (passage?.questions.length || 0));
      const nextIndex = currentPassageIndex + 1;
      setCurrentPassageIndex(nextIndex);
      setAnswers({});
      setIsSubmitted(false);
      setShowConfetti(false);
      passageStartTimeRef.current = Date.now();
      setElapsedSeconds(0);

      // Auto focus on matching blank if subSkill filter active
      const nextPassage = passages[nextIndex];
      if (selectedSubSkill !== 'all' && nextPassage) {
        const matchIdx = nextPassage.questions.findIndex(q => matchesSubSkill(q, selectedSubSkill));
        setActiveBlank(matchIdx !== -1 ? matchIdx + 1 : 1);
      } else {
        setActiveBlank(1);
      }
    } else {
      // Finalize and show results
      const finalTotal = totalScore;
      const finalQuestions = totalQuestions + (passage?.questions.length || 0);
      setTotalScore(finalTotal);
      setTotalQuestions(finalQuestions);
      setIsFinished(true);
      storage.set(`progress_${testId}_part6`, true);
      if ((finalTotal / finalQuestions) >= 0.7) {
        setShowConfetti(true);
      }
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (!passage || isSubmitted) return;

      const key = e.key.toUpperCase();
      const currentQ = passage.questions[activeBlank - 1];

      if (['A', 'B', 'C', 'D'].includes(key)) {
        if (currentQ?.options && currentQ.options[key as keyof typeof currentQ.options]) {
          handleSelectAnswer(activeBlank, key);
        }
      } else if (e.key === 'ArrowLeft') {
        setActiveBlank(prev => Math.max(1, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveBlank(prev => Math.min(4, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu bài thi...</div>;
  }

  if (error) {
    return <div className={styles.loading} style={{ color: 'var(--danger)' }}>Lỗi: {error}</div>;
  }

  if (passages.length === 0) {
    return (
      <div className={styles.pageContainer}>
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h2>Không có bài đọc nào phù hợp với bộ lọc hiện tại</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            Dạng câu hỏi <strong>{selectedSubSkill}</strong> không tìm thấy trong bộ đề đã chọn.
          </p>
          <button 
            onClick={() => handleSubSkillChange('all')}
            className="btn-primary" 
            style={{ marginTop: 16 }}
          >
            Xem tất cả dạng câu hỏi
          </button>
        </div>
      </div>
    );
  }

  if (!passage) {
    return <div className={styles.loading}>Đang tải bài đọc...</div>;
  }

  const renderPassage = () => {
    let content = passage.content;

    passage.questions.forEach((q) => {
      const regex = new RegExp(`\\(${q.number}\\)\\s*_{3,}`, 'g');
      const hasAnswer = !!answers[q.blankNumber];
      const isCurrentActive = activeBlank === q.blankNumber;
      const isTargetedBlank = selectedSubSkill !== 'all' && matchesSubSkill(q, selectedSubSkill);

      let blankContent = String(q.blankNumber);
      let blankClasses = [styles.blank];

      if (isTargetedBlank) {
        blankClasses.push(styles.focusedSubSkillBlank);
      }

      if (hasAnswer) {
        const selectedKey = answers[q.blankNumber] as 'A' | 'B' | 'C' | 'D';
        blankContent = q.options[selectedKey];
        blankClasses.push(styles.hasAnswer);
      }

      if (isCurrentActive && !isSubmitted) {
        blankClasses.push(styles.activeBlank);
      }

      if (isSubmitted) {
        if (answers[q.blankNumber] === q.correctAnswer) {
          blankClasses.push(styles.correctBlank);
        } else {
          blankClasses.push(styles.wrongBlank);
          const correctKey = q.correctAnswer as 'A' | 'B' | 'C' | 'D';
          blankContent = `<span class="${styles.correctionText}"><del>${blankContent}</del> ${q.options[correctKey]}</span>`;
        }
      }

      const htmlSpan = `<span class="${blankClasses.join(' ')}" data-blank="${q.blankNumber}">${blankContent}</span>`;
      content = content.replace(regex, htmlSpan);
    });

    return (
      <div
        className={styles.passageText}
        dangerouslySetInnerHTML={{ __html: content }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const blankElement = target.closest('[data-blank]');
          if (blankElement) {
            const blankNumber = parseInt(blankElement.getAttribute('data-blank') || '0', 10);
            if (blankNumber) setActiveBlank(blankNumber);
          }
        }}
      />
    );
  };

  const currentQuestion = passage.questions[activeBlank - 1];
  const allAnswered = Object.keys(answers).length === 4;
  const isCurrentQTargeted = selectedSubSkill !== 'all' && matchesSubSkill(currentQuestion, selectedSubSkill);

  // Time format helper
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Pacing status for live badge
  const liveStatus = getPacingStatus(elapsedSeconds);

  // Màn hình kết thúc (Session Pacing Report)
  if (isFinished) {
    const percentage = Math.round((totalScore / totalQuestions) * 100);
    const totalElapsedSeconds = sessionPacingHistory.reduce((acc, curr) => acc + curr.elapsedSeconds, 0);
    const avgSecPerQ = totalQuestions > 0 ? Math.round(totalElapsedSeconds / totalQuestions) : 30;

    return (
      <div className={styles.pageContainer}>
        <Confetti show={showConfetti} />
        <div
          className={styles.resultsCard}
          style={{
            margin: '30px auto',
            maxWidth: 720,
            padding: 36,
            textAlign: 'center',
            backgroundColor: 'var(--card)',
            borderRadius: 24,
            border: '1px solid var(--border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            {percentage >= 70 ? (
              <AwardIcon size={56} style={{ color: 'var(--primary)' }} />
            ) : (
              <BookIcon size={56} style={{ color: 'var(--text-secondary)' }} />
            )}
          </div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 8, color: 'var(--foreground)' }}>
            Hoàn thành Luyện tập Part 6!
          </h1>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: 20 }}>
            {selectedSubSkill === 'all'
              ? 'Tất cả dạng câu hỏi'
              : `Chuyên đề: ${PART6_SUB_SKILLS.find(s => s.key === selectedSubSkill)?.label}`} ({testId === 'all' ? 'Liên đề' : testId})
          </p>

          <div style={{ backgroundColor: 'var(--muted)', padding: '16px 28px', borderRadius: 16, display: 'inline-block', marginBottom: 24 }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>
              Điểm số: {totalScore} / {totalQuestions} ({percentage}%)
            </span>
          </div>

          {/* Session Pacing Report Table */}
          <div className={styles.pacingReportSection}>
            <div className={styles.pacingReportTitle}>
              <ClockIcon size={20} />
              Báo cáo Phân Bổ Thời Gian (ETS Pacing Report)
            </div>

            <div className={styles.pacingSummaryGrid}>
              <div className={styles.pacingStatCard}>
                <div className={styles.pacingStatValue}>{formatTime(totalElapsedSeconds)}</div>
                <div className={styles.pacingStatLabel}>Tổng thời gian</div>
              </div>
              <div className={styles.pacingStatCard}>
                <div className={styles.pacingStatValue}>{avgSecPerQ}s / câu</div>
                <div className={styles.pacingStatLabel}>Tốc độ trung bình</div>
              </div>
              <div className={styles.pacingStatCard}>
                <div className={styles.pacingStatValue}>≤ 30s / câu</div>
                <div className={styles.pacingStatLabel}>Chuẩn ETS đề xuất</div>
              </div>
            </div>

            <div className={styles.pacingTableWrapper}>
              <table className={styles.pacingTable}>
                <thead>
                  <tr>
                    <th>Bài đọc</th>
                    <th>Thời gian</th>
                    <th>Tốc độ (s/câu)</th>
                    <th>Điểm số</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionPacingHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{item.passageTitle}</td>
                      <td>{formatTime(item.elapsedSeconds)}</td>
                      <td>{item.secondsPerQuestion}s</td>
                      <td>{item.score} / {item.totalQuestions}</td>
                      <td>
                        <span
                          className={`${styles.pacingBadge} ${
                            item.status === 'Ahead'
                              ? styles.badgeAhead
                              : item.status === 'On Track'
                              ? styles.badgeOnTrack
                              : styles.badgeBehind
                          }`}
                        >
                          {item.status === 'Ahead' ? 'Nhanh' : item.status === 'On Track' ? 'Đúng chuẩn' : 'Chậm'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.pacingAdviceBox}>
              <strong>Chiến lược phân bổ thời gian: </strong>
              {avgSecPerQ <= 30
                ? 'Tốc độ xuất sắc! Bạn duy trì nhịp độ làm bài lý tưởng dưới 30s/câu, tiết kiệm được ít nhất 2 - 3 phút quý giá cho phần Đọc hiểu Part 7 dài 54 câu.'
                : avgSecPerQ <= 38
                ? 'Tốc độ làm bài tốt! Bạn nằm trong khung thời gian chuẩn 8 - 10 phút của ETS cho Part 6.'
                : 'Bạn đang dành hơn 38s/câu cho Part 6. Hãy rèn luyện phản xạ nhìn nhanh từ loại và liên từ để tránh bị thiếu giờ khi làm Part 7.'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 28 }}>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <RotateCcwIcon size={16} /> Luyện lại bộ này
            </button>
            <Link
              href="/"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <HomeIcon size={16} /> Về Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Confetti show={showConfetti} />

      {/* Header with Navigation & Title */}
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" className={styles.backBtn}>
              &larr; Về Dashboard
            </Link>
            <div>
              <h1 className={styles.title} style={{ margin: 0, fontSize: '1.35rem' }}>
                Part 6: Text Completion
              </h1>
              <p className={styles.subtitle} style={{ margin: 0 }}>
                {passage.source} - Đoạn {currentPassageIndex + 1}/{passages.length}
              </p>
            </div>
          </div>

          {/* Live Pacing Bar */}
          <div className={styles.pacingBar}>
            <span className={styles.pacingTime}>
              <ClockIcon size={15} />
              {isTimeAttack 
                ? formatTime(Math.max(0, TARGET_PACE_SECONDS - elapsedSeconds)) 
                : formatTime(elapsedSeconds)}
            </span>
            <span className={styles.pacingTarget}>Mục tiêu: ≤ 2:00</span>
            <span
              className={`${styles.pacingBadge} ${
                liveStatus === 'Ahead'
                  ? styles.badgeAhead
                  : liveStatus === 'On Track'
                  ? styles.badgeOnTrack
                  : styles.badgeBehind
              }`}
            >
              {liveStatus === 'Ahead' ? 'Nhanh' : liveStatus === 'On Track' ? 'Đúng chuẩn' : 'Chậm'}
            </span>

            <button
              onClick={toggleTimeAttack}
              className={`${styles.timeAttackToggle} ${isTimeAttack ? styles.timeAttackToggleActive : ''}`}
              title="Chế độ đếm ngược thời gian mục tiêu 120s"
            >
              <ZapIcon size={13} />
              {isTimeAttack ? 'Đếm ngược 2:00' : 'Bật Time Attack'}
            </button>
          </div>
        </div>

        {/* Controls Bar: Test Selector & Sub-skills Tabs */}
        <div className={styles.controlsBar}>
          <div className={styles.filterGroup}>
            <select
              value={testId}
              onChange={(e) => handleTestChange(e.target.value)}
              className={styles.testSelect}
              aria-label="Chọn bộ đề"
            >
              {TEST_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.subSkillTabs}>
            {PART6_SUB_SKILLS.map((skill) => {
              const isActive = selectedSubSkill === skill.key;
              return (
                <button
                  key={skill.key}
                  className={`${styles.subSkillTab} ${isActive ? styles.subSkillTabActive : ''}`}
                  onClick={() => handleSubSkillChange(skill.key)}
                >
                  {skill.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Split View */}
      <div className={styles.splitView}>
        {/* Left Side: Passage */}
        <section className={`${styles.passageSection} card-minimal`}>
          {passage.title && passage.title !== 'Part 6 Passage' && (
            <h2 className={styles.passageTitle}>{passage.title}</h2>
          )}
          {renderPassage()}
        </section>

        {/* Right Side: Questions & Review */}
        <section className={styles.questionSection}>
          {!isSubmitted ? (
            <div className={`${styles.questionCard} card-minimal`}>
              <div className={styles.qHeader}>
                <span className={styles.blankIndicator}>Chỗ trống {activeBlank} / 4</span>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <span className={styles.qType}>Câu {currentQuestion.number}</span>
                  {isCurrentQTargeted && (
                    <span className={styles.targetedBadge}>
                      <TargetIcon size={12} />
                      Mục tiêu
                    </span>
                  )}
                  {currentQuestion.subCategory && (
                    <span
                      className={styles.blankIndicator}
                      style={{
                        background: 'rgba(99, 102, 241, 0.12)',
                        color: 'var(--primary)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {currentQuestion.subCategory}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.optionsList}>
                {(Object.entries(currentQuestion.options) as [string, string][]).map(([key, val]) => {
                  const isSelected = answers[activeBlank] === key;
                  return (
                    <button
                      key={key}
                      className={`${styles.optionBtn} ${isSelected ? styles.selectedOption : ''}`}
                      onClick={() => handleSelectAnswer(activeBlank, key)}
                    >
                      <span className={styles.optionLetter}>{key}</span>
                      <span className={styles.optionText}>{val}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation below question */}
              <div className={styles.qNavigation}>
                <button
                  className={styles.navBtn}
                  disabled={activeBlank === 1}
                  onClick={() => setActiveBlank((prev) => prev - 1)}
                >
                  &larr; Câu trước
                </button>
                <button
                  className={styles.navBtn}
                  disabled={activeBlank === 4}
                  onClick={() => setActiveBlank((prev) => prev + 1)}
                >
                  Câu tiếp &rarr;
                </button>
              </div>

              {allAnswered && (
                <button className={`${styles.submitBtn} animate-slide-up`} onClick={handleSubmit}>
                  Nộp bài & Xem giải thích
                </button>
              )}
            </div>
          ) : (
            <div className={styles.reviewSection}>
              <h2 className={styles.reviewTitle}>Giải thích chi tiết</h2>
              <div className={styles.explanationsList}>
                {passage.questions.map((q) => {
                  const isCorrect = answers[q.blankNumber] === q.correctAnswer;
                  return (
                    <div key={q.id} className={`${styles.explanationCard} card-minimal`}>
                      <div className={styles.exHeader}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className={styles.exNumber}>
                            Chỗ trống [{q.blankNumber}] - Câu {q.number}
                          </span>
                          {q.subCategory && (
                            <span
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '4px',
                                background: 'rgba(99, 102, 241, 0.12)',
                                color: 'var(--primary)',
                                fontWeight: 600,
                              }}
                            >
                              {q.subCategory}
                            </span>
                          )}
                        </div>
                        <span className={isCorrect ? styles.badgeCorrect : styles.badgeWrong}>
                          {isCorrect ? 'Đúng' : 'Chưa đúng'}
                        </span>
                      </div>
                      <div className={styles.exContent}>
                        <p>
                          <strong>Bạn chọn:</strong> {answers[q.blankNumber] || 'Chưa làm'}
                        </p>
                        <p>
                          <strong>Đáp án đúng:</strong> {q.correctAnswer} -{' '}
                          {q.options[q.correctAnswer as keyof typeof q.options]}
                        </p>
                        <div
                          className={styles.exBox}
                          dangerouslySetInnerHTML={{ __html: q.explanation }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      <PracticeFooter
        isAnswered={isSubmitted}
        isCorrect={currentSetScore === passage.questions.length}
        correctMessage={`Xuất sắc! Bạn điền đúng cả ${passage.questions.length} chỗ trống.`}
        incorrectMessage={`Bạn điền đúng ${currentSetScore}/${passage.questions.length} chỗ trống.`}
        onNext={handleNextPassage}
        onAITutor={() =>
          setTutorContext({
            partTitle: 'Part 6: Text Completion',
            number: passage.questions[0].number,
            text: `Passage Title: ${passage.title || 'Text Completion'}. Questions: ${passage.questions
              .map((q) => q.number)
              .join(', ')}`,
            options: { A: 'Xem bài đọc và giải thích chi tiết' },
            correctAnswer: 'A',
            explanation: passage.questions
              .map((q) => `Blank ${q.blankNumber} (Q${q.number}): ${q.explanation}`)
              .join('<br/><br/>'),
            subCategory: Array.from(
              new Set(passage.questions.map((q) => q.subCategory).filter(Boolean))
            ).join(', '),
          })
        }
        nextLabel={currentPassageIndex + 1 === passages.length ? 'Xem tổng kết' : 'Đoạn văn tiếp theo'}
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
