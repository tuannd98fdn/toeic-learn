'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Confetti from '@/components/Confetti';
import {
  StudyPlan,
  PlanDay,
  PlanTask,
  getStudyPlan,
  generateAdaptivePlan,
  toggleTaskCompleted,
  removeStudyPlan,
  syncAdaptivePlan,
  updatePlanSettings,
} from '@/utils/studyPlanEngine';
import {
  TargetIcon,
  CompassIcon,
  CheckCircleIcon,
  CheckIcon,
  ArrowRightIcon,
  RotateCcwIcon,
  ClockIcon,
  CardsIcon,
  QuizIcon,
  NotebookIcon,
  ExamIcon,
  MapIcon,
  ZapIcon,
  HeadphonesIcon,
  ReadingIcon,
  SettingsIcon,
  SparklesIcon,
  ChevronDownIcon,
  CalendarIcon,
  BookIcon,
} from '@/components/icons/AppIcons';
import { storage } from '@/utils/storage';
import { soundEffects } from '@/utils/soundEffects';
import styles from './page.module.css';

const PART_DEFINITIONS = [
  { id: 'p1', label: 'Part 1: Mô Tả Tranh', desc: 'Bẫy mô tả hành động, vật thể, góc chụp' },
  { id: 'p2', label: 'Part 2: Hỏi - Đáp', desc: 'Phản xạ câu hỏi Wh-, Yes/No, câu hỏi gián tiếp' },
  { id: 'p3', label: 'Part 3: Đối Thoại', desc: 'Bắt keyword hội thoại 2-3 người, biểu đồ map' },
  { id: 'p4', label: 'Part 4: Độc Thoại', desc: 'Thông báo sân bay, tin nhắn thoại, bản tin' },
  { id: 'p5', label: 'Part 5: Ngữ Pháp', desc: 'Tốc độ phản xạ từ loại, thì, cấu trúc 15s/câu' },
  { id: 'p6', label: 'Part 6: Điền Đoạn Văn', desc: 'Điền câu văn liên kết, từ nối & ngữ cảnh' },
  { id: 'p7', label: 'Part 7: Đọc Hiểu', desc: 'Kỹ năng đọc quét, suy luận ngụ ý, đoạn đa' },
];

export default function StudyPlanPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải lộ trình học...</div>}>
      <StudyPlanContainer />
    </Suspense>
  );
}

function StudyPlanContainer() {
  const searchParams = useSearchParams();
  const fromDiagnostic = searchParams.get('fromDiagnostic') === 'true';
  const paramScore = searchParams.get('score');
  const paramWeak = searchParams.get('weak');

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPhaseTab, setSelectedPhaseTab] = useState<'all' | 'phase1' | 'phase2' | 'phase3'>('all');
  const [showConfetti, setShowConfetti] = useState(false);

  // Form State
  const [targetScore, setTargetScore] = useState<number>(650);
  const [currentScore, setCurrentScore] = useState<number>(
    paramScore ? parseInt(paramScore, 10) : 450
  );
  const [daysTotal, setDaysTotal] = useState<number>(30);
  const [dailyMinutes, setDailyMinutes] = useState<number>(30);
  const [weakestParts, setWeakestParts] = useState<string[]>(
    paramWeak ? paramWeak.split(',') : ['p5', 'p2', 'p7']
  );

  // Active day and Inspected Day state
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [inspectedDayNumber, setInspectedDayNumber] = useState<number | null>(null);

  // Open weeks state (set of week numbers currently expanded)
  const [openWeeks, setOpenWeeks] = useState<Record<number, boolean>>({});

  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const initActiveDayFromPlan = (p: StudyPlan) => {
    const firstIncomplete = p.days.find((d) => !d.completed);
    const todayStr = new Date().toISOString().slice(0, 10);
    const celebratedToday = typeof window !== 'undefined' && localStorage.getItem('toeic_celebration_date') === todayStr;

    if (celebratedToday && p.days[0].completed && firstIncomplete && firstIncomplete.dayNumber > 1) {
      setActiveDayNumber(firstIncomplete.dayNumber - 1);
    } else {
      setActiveDayNumber(firstIncomplete ? firstIncomplete.dayNumber : 1);
    }
  };

  useEffect(() => {
    const existingPlan = getStudyPlan();
    if (existingPlan && !fromDiagnostic) {
      setPlan(existingPlan);
      setIsEditing(false);
      setTargetScore(existingPlan.targetScore);
      setCurrentScore(existingPlan.currentScore);
      setDaysTotal(existingPlan.daysTotal);
      setDailyMinutes(existingPlan.dailyMinutes);
      if (existingPlan.weakestParts && existingPlan.weakestParts.length > 0) {
        setWeakestParts(existingPlan.weakestParts);
      }
      initActiveDayFromPlan(existingPlan);
    } else if (existingPlan && fromDiagnostic) {
      // Auto-sync existing plan with fresh diagnostic data
      const { plan: syncedPlan, gaps } = syncAdaptivePlan();
      if (syncedPlan) {
        setPlan(syncedPlan);
        setIsEditing(false);
        initActiveDayFromPlan(syncedPlan);
        setSyncNotice(`Lộ trình đã tự động đồng bộ theo kết quả bài Test Chẩn đoán mới nhất (${gaps.latestScore} điểm)!`);
        setTimeout(() => setSyncNotice(null), 5000);
      }
    } else {
      // If no existing plan, check if we have diagnostic or exam data to auto-generate adaptive plan!
      const hasDiagnostic = storage.get('toeic_diagnostic_result', null);
      const examHistory = storage.get('toeic_exam_history', []);
      if (hasDiagnostic || (examHistory && (examHistory as any[]).length > 0) || fromDiagnostic) {
        const { plan: newPlan, gaps } = syncAdaptivePlan();
        if (newPlan) {
          setPlan(newPlan);
          setIsEditing(false);
          initActiveDayFromPlan(newPlan);
          setSyncNotice(`AI đã tự động thiết lập lộ trình thích ứng theo bài Test Chẩn đoán (${gaps.latestScore} điểm)!`);
          setTimeout(() => setSyncNotice(null), 5000);
        } else {
          setIsEditing(true);
        }
      } else {
        setIsEditing(true);
        if (paramScore) {
          const scoreNum = parseInt(paramScore, 10);
          setCurrentScore(scoreNum);
          if (scoreNum < 500) setTargetScore(650);
          else if (scoreNum < 650) setTargetScore(750);
          else if (scoreNum < 750) setTargetScore(850);
          else setTargetScore(900);
        }
        if (paramWeak) {
          setWeakestParts(paramWeak.split(','));
        }
      }
    }
    setLoading(false);
  }, [fromDiagnostic, paramScore, paramWeak]);

  // True active day being studied
  const trueActiveDay = useMemo(() => {
    if (!plan || plan.days.length === 0) return null;
    return plan.days.find((d) => d.dayNumber === activeDayNumber) || plan.days[0];
  }, [plan, activeDayNumber]);

  // Current displayed day in focus card (either inspectedDay or activeDayNumber)
  const activeDay = useMemo(() => {
    if (!plan || plan.days.length === 0) return null;
    const targetDayNum = inspectedDayNumber !== null ? inspectedDayNumber : activeDayNumber;
    return plan.days.find((d) => d.dayNumber === targetDayNum) || plan.days[0];
  }, [plan, inspectedDayNumber, activeDayNumber]);

  // Determine which week activeDay belongs to and auto-open it
  useEffect(() => {
    if (activeDay) {
      const currentWeekNum = Math.ceil(activeDay.dayNumber / 7);
      setOpenWeeks((prev) => ({
        ...prev,
        [currentWeekNum]: true,
      }));
    }
  }, [activeDay]);

  // Check if current active day is 100% completed
  const isTodayCompleted = useMemo(() => {
    if (!plan) return false;
    const day = plan.days.find((d) => d.dayNumber === activeDayNumber);
    return day ? day.completed : false;
  }, [plan, activeDayNumber]);

  // Auto-play victory sound and show celebration confetti when day is completed
  const handleToggleTask = (dayNumber: number, taskId: string) => {
    const updated = toggleTaskCompleted(dayNumber, taskId);
    if (updated) {
      setPlan({ ...updated });

      // Check if day just completed
      const day = updated.days.find((d) => d.dayNumber === dayNumber);
      if (day && day.completed) {
        const todayStr = new Date().toISOString().slice(0, 10);
        const celebrated = localStorage.getItem(`toeic_celebrated_day_${dayNumber}`);
        if (celebrated !== todayStr) {
          soundEffects.playVictory();
          setShowConfetti(true);
          localStorage.setItem(`toeic_celebrated_day_${dayNumber}`, todayStr);
        }
      }
    }
  };

  const handleSyncPlan = () => {
    const { plan: syncedPlan, gaps } = syncAdaptivePlan();
    if (syncedPlan) {
      setPlan({ ...syncedPlan });
      setSyncNotice(
        `Đã đồng bộ thành công! Lộ trình đã được điều chỉnh theo ${gaps.totalMistakes} lỗi sai và điểm thi mới (${gaps.latestScore} điểm).`
      );
      setTimeout(() => setSyncNotice(null), 5000);
    }
  };

  const handleGeneratePlan = () => {
    const newPlan = generateAdaptivePlan({
      currentScore,
      targetScore,
      daysTotal,
      dailyMinutes,
      weakestParts,
    });
    setPlan(newPlan);
    setIsEditing(false);
    setShowConfetti(true);
  };

  const handleUpdateExistingPlan = () => {
    const updated = updatePlanSettings({
      targetScore,
      dailyMinutes,
      daysTotal,
      weakestParts,
    });
    if (updated) {
      setPlan({ ...updated });
      setIsEditing(false);
      setSyncNotice('Đã cập nhật mục tiêu & tái cân bằng các ngày học tiếp theo thành công (tiến trình cũ được bảo lưu)!');
      setTimeout(() => setSyncNotice(null), 5000);
    }
  };

  const handleResetPlan = () => {
    if (confirm('Bạn có chắc chắn muốn thiết lập lại từ đầu? Toàn bộ tiến trình đã hoàn thành sẽ bị xóa trắng.')) {
      removeStudyPlan();
      setPlan(null);
      setIsEditing(true);
    }
  };

  const toggleWeakPart = (partId: string) => {
    setWeakestParts((prev) => {
      if (prev.includes(partId)) {
        if (prev.length === 1) return prev; // Keep at least 1
        return prev.filter((p) => p !== partId);
      } else {
        if (prev.length >= 4) return prev; // Max 4
        return [...prev, partId];
      }
    });
  };

  const toggleWeekOpen = (weekNum: number) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [weekNum]: !prev[weekNum],
    }));
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'vocab':
        return <CardsIcon size={18} />;
      case 'exam':
        return <ExamIcon size={18} />;
      case 'review':
        return <NotebookIcon size={18} />;
      case 'masterclass':
        return <HeadphonesIcon size={18} />;
      default:
        return <QuizIcon size={18} />;
    }
  };

  // Group days into 7-day Weekly Clusters
  const weeklyGroups = useMemo(() => {
    if (!plan) return [];

    const filtered = plan.days.filter((d) => {
      if (selectedPhaseTab === 'all') return true;
      if (selectedPhaseTab === 'phase1') return d.phaseName.includes('Giai đoạn 1');
      if (selectedPhaseTab === 'phase2') return d.phaseName.includes('Giai đoạn 2');
      if (selectedPhaseTab === 'phase3') return d.phaseName.includes('Giai đoạn 3');
      return true;
    });

    const groups: {
      weekNumber: number;
      startDay: number;
      endDay: number;
      days: PlanDay[];
      completedCount: number;
      isCompleted: boolean;
      phaseSummary: string;
    }[] = [];

    const totalDays = plan.daysTotal;
    const numWeeks = Math.ceil(totalDays / 7);

    for (let w = 1; w <= numWeeks; w++) {
      const startDay = (w - 1) * 7 + 1;
      const endDay = Math.min(w * 7, totalDays);
      const weekDays = filtered.filter((d) => d.dayNumber >= startDay && d.dayNumber <= endDay);

      if (weekDays.length > 0) {
        const completedCount = weekDays.filter((d) => d.completed).length;
        groups.push({
          weekNumber: w,
          startDay,
          endDay,
          days: weekDays,
          completedCount,
          isCompleted: completedCount === weekDays.length,
          phaseSummary: weekDays[0].phaseName.split(':')[0],
        });
      }
    }

    return groups;
  }, [plan, selectedPhaseTab]);

  if (loading) {
    return <div className={styles.loading}>Đang khởi tạo lộ trình...</div>;
  }

  // --- FORM VIEW: CREATE / EDIT PLAN ---
  if (isEditing || !plan) {
    const isTargetTooLow = targetScore <= currentScore;

    return (
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CompassIcon size={28} />
              <h1 className={styles.formTitle}>
                {plan ? 'Chỉnh Sửa Lộ Trình Học' : 'Lộ Trình Ôn Thi TOEIC Cá Nhân Hóa'}
              </h1>
            </div>
            <p className={styles.formSubtitle}>
              {plan
                ? 'Điều chỉnh mục tiêu và thời gian học mà không làm mất các ngày bạn đã hoàn thành'
                : 'Thiết kế kế hoạch học tập thích ứng theo phương pháp Spaced Repetition & Target Practice'}
            </p>
          </div>

          {fromDiagnostic && (
            <div className={styles.diagnosticNotice}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <TargetIcon size={22} />
                <div>
                  <strong>Đã tích hợp kết quả Test Chẩn đoán:</strong> Điểm hiện tại: {currentScore} điểm.
                  Ưu tiên tập trung: {weakestParts.map((p) => p.toUpperCase()).join(', ')}.
                </div>
              </div>
            </div>
          )}

          {/* Current Score */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Điểm TOEIC Hiện Tại (hoặc Dự Đoán)</label>
            <input
              type="number"
              min={10}
              max={990}
              step={5}
              value={currentScore}
              onChange={(e) => setCurrentScore(Number(e.target.value))}
              className={styles.numberInput}
            />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Chưa biết điểm hiện tại?{' '}
              <Link href="/diagnostic" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                Làm bài Test Chẩn Đoán 20 Phút
              </Link>
            </div>
          </div>

          {/* Target Score */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>
              <span>Điểm TOEIC Mục Tiêu Của Bạn</span>
              {isTargetTooLow && (
                <span style={{ fontSize: '0.8rem', color: 'var(--warning)', fontWeight: 600 }}>
                  Khuyến nghị mục tiêu cao hơn điểm hiện tại
                </span>
              )}
            </label>
            <div className={styles.pillsRow}>
              {[550, 650, 750, 850, 900].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setTargetScore(score)}
                  className={`${styles.pillBtn} ${targetScore === score ? styles.selectedPill : ''}`}
                >
                  {score}+ Điểm
                </button>
              ))}
            </div>

            {isTargetTooLow && (
              <div className={styles.scoreValidationWarning}>
                <TargetIcon size={16} />
                <span>
                  Điểm mục tiêu ({targetScore}) hiện chưa cao hơn điểm xuất phát ({currentScore}). Hãy chọn band điểm bứt phá để AI tối ưu hóa bài tập!
                </span>
              </div>
            )}
          </div>

          {/* Weakest Parts Selector */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>
              <span>Phần Thi Ưu Tiên Tập Trung (Chọn 1 - 3 phần)</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Đã chọn: {weakestParts.length}/3
              </span>
            </label>
            <div className={styles.partPillsGrid}>
              {PART_DEFINITIONS.map((part) => {
                const isSelected = weakestParts.includes(part.id);
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => toggleWeakPart(part.id)}
                    className={`${styles.partPillBtn} ${isSelected ? styles.partPillActive : ''}`}
                  >
                    <div className={styles.partPillHeader}>
                      <span className={styles.partPillName}>{part.label}</span>
                      {isSelected ? (
                        <CheckIcon size={16} style={{ color: 'var(--primary)' }} />
                      ) : (
                        <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid var(--border)' }} />
                      )}
                    </div>
                    <span className={styles.partPillDesc}>{part.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Days until exam */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Thời Gian Ôn Luyện</label>
            <div className={styles.pillsRow}>
              {[
                { days: 15, label: '15 Ngày (Cấp tốc)' },
                { days: 30, label: '30 Ngày (Tiêu chuẩn)' },
                { days: 45, label: '45 Ngày' },
                { days: 60, label: '60 Ngày (Vững vàng)' },
                { days: 90, label: '90 Ngày (Dài hạn)' },
              ].map((item) => (
                <button
                  key={item.days}
                  type="button"
                  onClick={() => setDaysTotal(item.days)}
                  className={`${styles.pillBtn} ${daysTotal === item.days ? styles.selectedPill : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Daily study time */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Thời Gian Học Mỗi Ngày</label>
            <div className={styles.pillsRow}>
              {[
                { mins: 20, label: '20 Phút' },
                { mins: 30, label: '30 Phút' },
                { mins: 45, label: '45 Phút' },
                { mins: 60, label: '60 Phút' },
              ].map((item) => (
                <button
                  key={item.mins}
                  type="button"
                  onClick={() => setDailyMinutes(item.mins)}
                  className={`${styles.pillBtn} ${dailyMinutes === item.mins ? styles.selectedPill : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formActions}>
            {plan ? (
              <>
                <button onClick={handleUpdateExistingPlan} className={styles.generateBtn}>
                  <TargetIcon size={20} /> Lưu Thay Đổi & Cập Nhật Lộ Trình
                </button>
                <button onClick={() => setIsEditing(false)} className={styles.cancelEditBtn}>
                  Hủy bỏ & quay lại lộ trình hiện tại
                </button>
              </>
            ) : (
              <button onClick={handleGeneratePlan} className={styles.generateBtn}>
                <TargetIcon size={20} /> Kích Hoạt Lộ Trình Thông Minh
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW: ACTIVE PLAN ---
  const totalTasks = plan.days.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedTasks = plan.days.reduce(
    (acc, d) => acc + d.tasks.filter((t) => t.completed).length,
    0
  );
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const isInspectingAnotherDay = inspectedDayNumber !== null && inspectedDayNumber !== activeDayNumber;

  return (
    <div className={styles.container}>
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Plan Header */}
      <header className={styles.planHeader}>
        <div className={styles.titleArea}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CompassIcon size={26} />
            <h1 className={styles.planTitle}>Lộ Trình Mục Tiêu: {plan.targetScore}+ Điểm</h1>
          </div>
          <p className={styles.planSubtitle}>
            Điểm xuất phát: <strong>{plan.currentScore}</strong> &rarr; Mục tiêu: <strong>{plan.targetScore}</strong> ({plan.daysTotal} ngày • {plan.dailyMinutes}p/ngày)
          </p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.headerMetrics}>
            <div className={styles.metricBadge}>
              <span className={styles.metricValue}>{overallProgress}%</span>
              <span className={styles.metricLabel}>Hoàn thành</span>
            </div>
            <div className={styles.metricBadge}>
              <span className={styles.metricValue}>Ngày {trueActiveDay?.dayNumber || plan.daysTotal}/{plan.daysTotal}</span>
              <span className={styles.metricLabel}>Tiến trình</span>
            </div>
            <div className={styles.metricBadge}>
              <span className={styles.metricValue}>{completedTasks}/{totalTasks}</span>
              <span className={styles.metricLabel}>Nhiệm vụ</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className={styles.editPlanBtn}
            title="Điều chỉnh mục tiêu, thời gian hoặc phần thi yếu mà không làm mất lịch sử"
          >
            <SettingsIcon size={16} />
            <span>Chỉnh sửa</span>
          </button>
        </div>
      </header>

      {/* Adaptive Sync Banner */}
      <div className={styles.adaptiveBanner}>
        <div className={styles.adaptiveBannerLeft}>
          <div className={styles.adaptiveIconWrapper}>
            <ZapIcon size={20} />
          </div>
          <div>
            <div className={styles.adaptiveTitle}>
              Lộ Trình Thích Ứng Thông Minh (Adaptive TOEIC Engine)
            </div>
            <div className={styles.adaptiveDesc}>
              Điểm hiện tại: <strong>{plan.currentScore}</strong> • Trọng tâm gỡ điểm:{' '}
              <strong>{plan.weakestParts.map((p) => p.toUpperCase()).join(', ')}</strong>
              {plan.topGrammarWeaknesses && plan.topGrammarWeaknesses.length > 0 && (
                <span> • Chuyên đề ngữ pháp: <strong>{plan.topGrammarWeaknesses.slice(0, 2).join(', ')}</strong></span>
              )}
              {plan.lastSyncedAt && (
                <span className={styles.syncTime}> (Đồng bộ: {new Date(plan.lastSyncedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })})</span>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSyncPlan}
          className={styles.syncBtn}
          title="Tái cân bằng các ngày học còn lại theo điểm thi và lỗi sai mới nhất"
        >
          <RotateCcwIcon size={14} />
          <span>Đồng bộ theo lỗi sai mới</span>
        </button>
      </div>

      {syncNotice && (
        <div className={styles.diagnosticNotice}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircleIcon size={18} style={{ color: '#10b981' }} />
            <span>{syncNotice}</span>
          </div>
        </div>
      )}

      {/* Today Celebration Card (When Today is 100% Completed) */}
      {isTodayCompleted && !isInspectingAnotherDay && (
        <div className={styles.celebrationCard}>
          <div className={styles.celebrationLeft}>
            <div className={styles.celebrationIconBox}>
              <SparklesIcon size={22} />
            </div>
            <div>
              <div className={styles.celebrationTitle}>
                Mục tiêu Ngày {activeDay?.dayNumber} hoàn thành xuất sắc!
              </div>
              <div className={styles.celebrationDesc}>
                Bạn đã hoàn thành trọn vẹn {activeDay?.tasks.length} nhiệm vụ hôm nay. Hãy duy trì nhịp độ vững vàng này!
              </div>
            </div>
          </div>

          <div className={styles.celebrationRight}>
            <span className={styles.xpBadge}>+50 XP</span>
            {activeDay && activeDay.dayNumber < plan.daysTotal && (
              <button
                type="button"
                onClick={() => {
                  setActiveDayNumber(activeDay.dayNumber + 1);
                  setInspectedDayNumber(null);
                }}
                className={styles.previewNextDayBtn}
              >
                <span>Xem trước Ngày {activeDay.dayNumber + 1}</span>
                <ArrowRightIcon size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Focus / Today Tasks Card */}
      {activeDay && (
        <section className={styles.todayCard}>
          <div className={styles.todayHeader}>
            <h2 className={styles.todayTitle}>
              <TargetIcon size={24} />
              {isInspectingAnotherDay
                ? `Chi Tiết Nhiệm Vụ (Ngày ${activeDay.dayNumber})`
                : `Nhiệm Vụ Hôm Nay (Ngày ${activeDay.dayNumber})`}
            </h2>

            <div className={styles.todayHeaderBadges}>
              {isInspectingAnotherDay && (
                <button
                  type="button"
                  onClick={() => setInspectedDayNumber(null)}
                  className={styles.inspectingBadge}
                  title="Quay lại ngày hiện tại đang học"
                >
                  Đang xem lại • Bấm để về Hôm nay
                </button>
              )}
              <span className={styles.dayBadge}>
                {activeDay.tasks.filter((t) => t.completed).length} / {activeDay.tasks.length} Hoàn thành
              </span>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {activeDay.phaseName}
          </div>

          <div className={styles.tasksList}>
            {activeDay.tasks.map((task) => (
              <div
                key={task.id}
                className={`${styles.taskItem} ${task.completed ? styles.taskDone : ''}`}
              >
                <div className={styles.taskLeft}>
                  <button
                    type="button"
                    onClick={() => handleToggleTask(activeDay.dayNumber, task.id)}
                    className={`${styles.checkboxBtn} ${task.completed ? styles.checked : ''}`}
                    title="Đánh dấu hoàn thành"
                  >
                    {task.completed && <CheckIcon size={14} />}
                  </button>

                  <div className={styles.taskContent}>
                    <div className={`${styles.taskTitle} ${task.completed ? styles.strikethrough : ''}`}>
                      {task.title}
                      {task.subCategory && (
                        <span className={styles.subCatTag}>{task.subCategory}</span>
                      )}
                      {task.type === 'masterclass' && (
                        <span className={styles.subCatTag} style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
                          Masterclass 30&apos;
                        </span>
                      )}
                    </div>
                    <div className={styles.taskDesc}>{task.description}</div>
                  </div>
                </div>

                <div className={styles.taskRight}>
                  <div className={styles.timeTag}>
                    <ClockIcon size={14} /> {task.estimatedMinutes}p
                  </div>
                  <Link href={task.link} className={styles.actionBtn}>
                    {getTaskIcon(task.type)} Vào làm
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Full Timeline Roadmap */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineHeader}>
          <h2 className={styles.timelineTitle}>
            <MapIcon size={24} />
            Toàn Bộ Lộ Trình ({plan.daysTotal} Ngày)
          </h2>

          <div className={styles.timelineActions}>
            {trueActiveDay && (
              <button
                type="button"
                onClick={() => {
                  setInspectedDayNumber(trueActiveDay.dayNumber);
                  const w = Math.ceil(trueActiveDay.dayNumber / 7);
                  setOpenWeeks((prev) => ({ ...prev, [w]: true }));
                }}
                className={styles.jumpTodayBtn}
                title="Xem ngày học của hôm nay"
              >
                <CalendarIcon size={14} />
                <span>Hôm nay (Ngày {trueActiveDay.dayNumber})</span>
              </button>
            )}

            <button onClick={handleResetPlan} className={styles.resetBtn} title="Xóa trắng lộ trình và thiết lập lại">
              <RotateCcwIcon size={13} /> Thiết lập lại từ đầu
            </button>
          </div>
        </div>

        {/* Phase Tabs */}
        <div className={styles.phaseTabs}>
          <button
            type="button"
            onClick={() => setSelectedPhaseTab('all')}
            className={`${styles.phaseTab} ${selectedPhaseTab === 'all' ? styles.activeTab : ''}`}
          >
            Tất cả ({plan.days.length} ngày)
          </button>
          <button
            type="button"
            onClick={() => setSelectedPhaseTab('phase1')}
            className={`${styles.phaseTab} ${selectedPhaseTab === 'phase1' ? styles.activeTab : ''}`}
          >
            GĐ 1: Nền tảng & Điểm yếu
          </button>
          <button
            type="button"
            onClick={() => setSelectedPhaseTab('phase2')}
            className={`${styles.phaseTab} ${selectedPhaseTab === 'phase2' ? styles.activeTab : ''}`}
          >
            GĐ 2: Tăng tốc & Bẫy đề
          </button>
          <button
            type="button"
            onClick={() => setSelectedPhaseTab('phase3')}
            className={`${styles.phaseTab} ${selectedPhaseTab === 'phase3' ? styles.activeTab : ''}`}
          >
            GĐ 3: Thi thử & Về đích
          </button>
        </div>

        {/* Weekly Clusters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {weeklyGroups.map((week) => {
            const isOpen = openWeeks[week.weekNumber] ?? true;

            return (
              <div key={week.weekNumber} className={styles.weekCluster}>
                <div
                  className={styles.weekHeader}
                  onClick={() => toggleWeekOpen(week.weekNumber)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleWeekOpen(week.weekNumber);
                    }
                  }}
                >
                  <div className={styles.weekHeaderLeft}>
                    <span className={styles.weekTitle}>
                      Tuần {week.weekNumber} (Ngày {week.startDay} - {week.endDay})
                    </span>
                    <span className={styles.weekPhaseTag}>• {week.phaseSummary}</span>
                  </div>

                  <div className={styles.weekHeaderRight}>
                    <span
                      className={`${styles.weekProgressPill} ${
                        week.isCompleted ? styles.weekCompleted : ''
                      }`}
                    >
                      {week.completedCount}/{week.days.length} Ngày xong
                    </span>
                    <ChevronDownIcon
                      size={18}
                      className={`${styles.chevronIcon} ${isOpen ? styles.chevronOpen : ''}`}
                    />
                  </div>
                </div>

                {isOpen && (
                  <div className={styles.weekDaysGrid}>
                    {week.days.map((day) => {
                      const isToday = day.dayNumber === trueActiveDay?.dayNumber;
                      const isInspecting = day.dayNumber === activeDay?.dayNumber;

                      return (
                        <div
                          key={day.dayNumber}
                          className={`${styles.roadmapDayCard} ${
                            isInspecting ? styles.currentDayCard : ''
                          } ${day.completed ? styles.completedDayCard : ''}`}
                        >
                          <div className={styles.roadmapDayHeader}>
                            <div className={styles.roadmapDayTitle}>
                              <span>Ngày {day.dayNumber}</span>
                              {isToday && <span className={styles.currentDayChip}>Hôm nay</span>}
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                • {day.dateStr}
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                className={`${styles.roadmapDayStatus} ${
                                  day.completed ? styles.statusDone : ''
                                }`}
                              >
                                {day.completed
                                  ? 'Đã hoàn thành'
                                  : `${day.tasks.filter((t) => t.completed).length}/${day.tasks.length} xong`}
                              </span>

                              <button
                                type="button"
                                onClick={() => setInspectedDayNumber(day.dayNumber)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'var(--primary)',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  padding: '2px 6px',
                                }}
                              >
                                {isInspecting ? 'Đang chọn' : 'Xem chi tiết'}
                              </button>
                            </div>
                          </div>

                          <div className={styles.roadmapTaskList}>
                            {day.tasks.map((task) => (
                              <div
                                key={task.id}
                                className={`${styles.roadmapTaskItem} ${
                                  task.completed ? styles.roadmapTaskDone : ''
                                }`}
                              >
                                <div className={styles.roadmapTaskLeft}>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleTask(day.dayNumber, task.id)}
                                    className={`${styles.checkboxBtn} ${task.completed ? styles.checked : ''}`}
                                    style={{ width: 20, height: 20 }}
                                    title="Đánh dấu hoàn thành"
                                  >
                                    {task.completed && <CheckIcon size={12} />}
                                  </button>

                                  <div className={styles.roadmapTaskIconBox}>
                                    {getTaskIcon(task.type)}
                                  </div>

                                  <span
                                    className={`${styles.roadmapTaskTitle} ${
                                      task.completed ? styles.strikethrough : ''
                                    }`}
                                  >
                                    {task.title}
                                    {task.subCategory && (
                                      <span className={styles.subCatTag}>{task.subCategory}</span>
                                    )}
                                    {task.type === 'masterclass' && (
                                      <span
                                        className={styles.subCatTag}
                                        style={{
                                          background: 'rgba(99, 102, 241, 0.15)',
                                          color: '#818cf8',
                                        }}
                                      >
                                        Masterclass
                                      </span>
                                    )}
                                  </span>
                                </div>

                                <div className={styles.roadmapTaskRight}>
                                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                    {task.estimatedMinutes}p
                                  </span>
                                  <Link href={task.link} className={styles.roadmapActionBtn}>
                                    Vào làm
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
