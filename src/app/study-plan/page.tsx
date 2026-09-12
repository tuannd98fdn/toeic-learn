'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Confetti from '@/components/Confetti';
import {
  StudyPlan,
  getStudyPlan,
  generateAdaptivePlan,
  toggleTaskCompleted,
  removeStudyPlan,
  syncAdaptivePlan,
} from '@/utils/studyPlanEngine';
import {
  TargetIcon,
  CompassIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  RotateCcwIcon,
  ClockIcon,
  CardsIcon,
  QuizIcon,
  NotebookIcon,
  ExamIcon,
  MapIcon,
  ZapIcon,
} from '@/components/icons/AppIcons';
import { storage } from '@/utils/storage';
import styles from './page.module.css';

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

  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  useEffect(() => {
    const existingPlan = getStudyPlan();
    if (existingPlan && !fromDiagnostic) {
      setPlan(existingPlan);
      setIsEditing(false);
    } else if (existingPlan && fromDiagnostic) {
      // Auto-sync existing plan with fresh diagnostic data
      const { plan: syncedPlan, gaps } = syncAdaptivePlan();
      if (syncedPlan) {
        setPlan(syncedPlan);
        setIsEditing(false);
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

  const handleToggleTask = (dayNumber: number, taskId: string) => {
    const updated = toggleTaskCompleted(dayNumber, taskId);
    if (updated) {
      setPlan({ ...updated });
    }
  };

  const handleResetPlan = () => {
    if (confirm('Bạn có chắc chắn muốn thiết lập lại lộ trình học tập này không?')) {
      removeStudyPlan();
      setPlan(null);
      setIsEditing(true);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Đang khởi tạo lộ trình...</div>;
  }

  // --- FORM VIEW: CREATE / EDIT PLAN ---
  if (isEditing || !plan) {
    return (
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CompassIcon size={28} className="" />
              <h1 className={styles.formTitle}>Lộ Trình Ôn Thi TOEIC Cá Nhân Hóa</h1>
            </div>
            <p className={styles.formSubtitle}>
              Thiết kế kế hoạch học tập thích ứng theo phương pháp Spaced Repetition & Target Practice
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

          {/* Target Score */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Điểm TOEIC Mục Tiêu Của Bạn</label>
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
          </div>

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

          <button onClick={handleGeneratePlan} className={styles.generateBtn}>
            <TargetIcon size={20} /> Kích Hoạt Lộ Trình Thông Minh
          </button>

          {plan && (
            <button
              onClick={() => setIsEditing(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              Hủy bỏ & quay lại lộ trình hiện tại
            </button>
          )}
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

  // Identify today's day (first day with incomplete tasks, or day 1)
  const activeDay = plan.days.find((d) => !d.completed) || plan.days[0];

  // Filter days for roadmap tabs
  const filteredDays = plan.days.filter((d) => {
    if (selectedPhaseTab === 'all') return true;
    if (selectedPhaseTab === 'phase1') return d.phaseName.includes('Giai đoạn 1');
    if (selectedPhaseTab === 'phase2') return d.phaseName.includes('Giai đoạn 2');
    if (selectedPhaseTab === 'phase3') return d.phaseName.includes('Giai đoạn 3');
    return true;
  });

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'vocab':
        return <CardsIcon size={18} />;
      case 'exam':
        return <ExamIcon size={18} />;
      case 'review':
        return <NotebookIcon size={18} />;
      default:
        return <QuizIcon size={18} />;
    }
  };

  return (
    <div className={styles.container}>
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Plan Header */}
      <header className={styles.planHeader}>
        <div className={styles.titleArea}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CompassIcon size={24} />
            <h1 className={styles.planTitle}>Lộ Trình Mục Tiêu: {plan.targetScore}+ Điểm</h1>
          </div>
          <p className={styles.planSubtitle}>
            Điểm xuất phát: <strong>{plan.currentScore}</strong> &rarr; Mục tiêu: <strong>{plan.targetScore}</strong> ({plan.daysTotal} ngày)
          </p>
        </div>

        <div className={styles.headerMetrics}>
          <div className={styles.metricBadge}>
            <span className={styles.metricValue}>{overallProgress}%</span>
            <span className={styles.metricLabel}>Tiến độ hoàn thành</span>
          </div>
          <div className={styles.metricBadge}>
            <span className={styles.metricValue}>Ngày {activeDay?.dayNumber || plan.daysTotal}/{plan.daysTotal}</span>
            <span className={styles.metricLabel}>Tiến trình ngày</span>
          </div>
          <div className={styles.metricBadge}>
            <span className={styles.metricValue}>{completedTasks}/{totalTasks}</span>
            <span className={styles.metricLabel}>Nhiệm vụ xong</span>
          </div>
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
              Điểm hiện tại: <strong>{plan.currentScore}</strong> • Trọng tâm gỡ điểm: <strong>{plan.weakestParts.map((p) => p.toUpperCase()).join(', ')}</strong>
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
        <div className={styles.diagnosticNotice} style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: 'var(--foreground)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircleIcon size={18} style={{ color: '#10b981' }} />
            <span>{syncNotice}</span>
          </div>
        </div>
      )}

      {/* Today's Tasks Card */}
      {activeDay && (
        <section className={styles.todayCard}>
          <div className={styles.todayHeader}>
            <h2 className={styles.todayTitle}>
              <TargetIcon size={24} />
              Nhiệm Vụ Hôm Nay (Ngày {activeDay.dayNumber})
            </h2>
            <span className={styles.dayBadge}>
              {activeDay.tasks.filter((t) => t.completed).length} / {activeDay.tasks.length} Hoàn thành
            </span>
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
                    {task.completed && <CheckCircleIcon size={16} />}
                  </button>

                  <div className={styles.taskContent}>
                    <div className={`${styles.taskTitle} ${task.completed ? styles.strikethrough : ''}`}>
                      {task.title}
                      {task.subCategory && (
                        <span className={styles.subCatTag}>{task.subCategory}</span>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h2 className={styles.timelineTitle}>
            <MapIcon size={24} />
            Toàn Bộ Lộ Trình ({plan.daysTotal} Ngày)
          </h2>

          <button onClick={handleResetPlan} className={styles.resetBtn}>
            <RotateCcwIcon size={14} /> Thiết lập lại lộ trình
          </button>
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

        {/* Days List */}
        <div className={styles.daysGrid}>
          {filteredDays.map((day) => {
            const isCurrent = day.dayNumber === activeDay?.dayNumber;

            return (
              <div
                key={day.dayNumber}
                className={styles.dayCard}
                style={{
                  borderColor: isCurrent ? 'var(--primary)' : undefined,
                  boxShadow: isCurrent ? '0 0 0 1px var(--primary)' : undefined,
                }}
              >
                <div className={styles.dayCardHeader}>
                  <div>
                    <span className={styles.dayNumber}>
                      Ngày {day.dayNumber} {isCurrent && '(Hôm nay)'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                      • {day.phaseName.split(':')[0]}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: day.completed ? '#16a34a' : 'var(--text-secondary)',
                    }}
                  >
                    {day.completed ? '✓ Hoàn thành' : `${day.tasks.filter((t) => t.completed).length}/${day.tasks.length}`}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {day.tasks.map((task) => (
                    <div
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleTask(day.dayNumber, task.id)}
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            border: '1.5px solid var(--border)',
                            background: task.completed ? '#16a34a' : 'transparent',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          {task.completed && '✓'}
                        </button>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.6 : 1 }}>
                          {task.title}
                          {task.subCategory && (
                            <span className={styles.subCatTag}>{task.subCategory}</span>
                          )}
                        </span>
                      </div>

                      <Link
                        href={task.link}
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--primary)',
                          fontWeight: 700,
                          textDecoration: 'none',
                        }}
                      >
                        Vào làm
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
