'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StreakCounter from '@/components/StreakCounter';
import MascotSVG from '@/components/illustrations/MascotSVG';
import { useStreak } from '@/hooks/useStreak';
import { storage } from '@/utils/storage';
import { StudyPlan, getStudyPlan, toggleTaskCompleted, getNextStudyTask, syncAdaptivePlan } from '@/utils/studyPlanEngine';
import {
  CardsIcon,
  QuizIcon,
  BookIcon,
  NotebookIcon,
  ExamIcon,
  HeadphonesIcon,
  ReadingIcon,
  ZapIcon,
  ArrowRightIcon,
  CompassIcon,
  TargetIcon,
  LightbulbIcon,
  AwardIcon,
  SparklesIcon,
  CheckIcon,
  ChevronDownIcon,
} from '@/components/icons/AppIcons';
import { soundEffects } from '@/utils/soundEffects';
import { preloadUpcomingListening } from '@/utils/audioPreloader';
import CompactInsightBar from '@/components/CompactInsightBar';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const { mounted: streakMounted, streakData, recordStudy } = useStreak();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [activeDayNumber, setActiveDayNumber] = useState<number | null>(null);
  
  // Onboarding Data
  const [onboardingData, setOnboardingData] = useState<{ target: string; daysLeft: number | null }>({ target: '750+', daysLeft: null });
  
  // Test selection state
  const [testsIndex, setTestsIndex] = useState<{id: string, name: string}[]>([]);
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [isTestDropdownOpen, setIsTestDropdownOpen] = useState<boolean>(false);
  const testDropdownRef = useRef<HTMLDivElement>(null);
  const [testStats, setTestStats] = useState<{
    p1: number; p2: number; p3: number; p4: number;
    p5: number; p6: number; p7: number;
  } | null>(null);
  const [partProgress, setPartProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (testDropdownRef.current && !testDropdownRef.current.contains(e.target as Node)) {
        setIsTestDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsTestDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nextStudyTask = getNextStudyTask();

  useEffect(() => {
    if (!selectedTest) return;
    preloadUpcomingListening(selectedTest);
    
    const fetchStats = async () => {
      try {
        setTestStats(null);
        const match = selectedTest.match(/ets(\d+)_test(\d+)/);
        if (!match) return;
        
        const pathBase = `/data/ets${match[1]}/test${match[2]}`;
        const resList = await Promise.all([
          fetch(`${pathBase}/part1.json`),
          fetch(`${pathBase}/part2.json`),
          fetch(`${pathBase}/part3.json`),
          fetch(`${pathBase}/part4.json`),
          fetch(`${pathBase}/part5.json`),
          fetch(`${pathBase}/part6.json`),
          fetch(`${pathBase}/part7.json`),
        ]);
        
        if (resList.every(r => r.ok)) {
          const [d1, d2, d3, d4, d5, d6, d7] = await Promise.all(resList.map(r => r.json()));
          
          let p3Questions = 0; d3.forEach((s: any) => { p3Questions += s.questions?.length || 0; });
          let p4Questions = 0; d4.forEach((s: any) => { p4Questions += s.questions?.length || 0; });
          let p6Questions = 0; d6.forEach((p: any) => { p6Questions += p.questions?.length || 0; });
          let p7Questions = 0; d7.forEach((p: any) => { p7Questions += p.questions?.length || 0; });
          
          setTestStats({
            p1: d1.length, p2: d2.length, p3: p3Questions, p4: p4Questions,
            p5: d5.length, p6: p6Questions, p7: p7Questions,
          });

          // Check progress for each part
          const progress: Record<string, boolean> = {};
          [1, 2, 3, 4, 5, 6, 7].forEach(part => {
            progress[`part${part}`] = storage.get<boolean>(`progress_${selectedTest}_part${part}`, false);
          });
          setPartProgress(progress);
        }
      } catch (err) {
        console.error("Failed to load stats for test", err);
      }
    };
    fetchStats();
  }, [selectedTest]);

  useEffect(() => {
    const isDone = localStorage.getItem('toeic_onboarding_done');
    if (!isDone) {
      router.push('/onboarding');
      return;
    }

    const rawTarget = storage.get<string | number>('toeic_target_score', '750+');
    const target = String(rawTarget || '750+').replace(/^["']|["']$/g, '').trim() || '750+';
    if (typeof window !== 'undefined') {
      const rawStored = localStorage.getItem('toeic_target_score');
      if (rawStored && (rawStored.startsWith('"') || rawStored.endsWith('"'))) {
        localStorage.setItem('toeic_target_score', target);
      }
    }
    const examDate = localStorage.getItem('toeic_exam_date');
    
    let daysLeft = null;
    if (examDate) {
      const diff = new Date(examDate).getTime() - new Date().getTime();
      daysLeft = Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
    }
    
    setOnboardingData({ target, daysLeft });

    recordStudy();
    fetch('/data/tests_index.json')
      .then(res => res.json())
      .then(data => {
        setTestsIndex(data);
        if (data.length > 0) setSelectedTest(data[0].id);
      })
      .catch(err => console.error("Could not load tests index:", err));

    const syncRes = syncAdaptivePlan();
    const plan = syncRes.plan || getStudyPlan();
    setStudyPlan(plan);
    if (plan && plan.days.length > 0) {
      const todayStr = new Date().toISOString().slice(0, 10);
      const celebratedToday = localStorage.getItem('toeic_celebration_date') === todayStr;
      const firstIncomplete = plan.days.find(d => !d.completed);
      
      if (celebratedToday && plan.days[0].completed && firstIncomplete && firstIncomplete.dayNumber > 1) {
        setActiveDayNumber(firstIncomplete.dayNumber - 1);
      } else {
        setActiveDayNumber(firstIncomplete ? firstIncomplete.dayNumber : plan.days[0].dayNumber);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const activeDay = studyPlan
    ? (studyPlan.days.find((d) => d.dayNumber === activeDayNumber) || studyPlan.days.find((d) => !d.completed) || studyPlan.days[0])
    : null;
  const completedToday = activeDay ? activeDay.tasks.filter((t) => t.completed).length : 0;
  const totalToday = activeDay ? activeDay.tasks.length : 0;
  const progressPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;
  const isAllCompleted = totalToday > 0 && completedToday === totalToday;

  // Auto-play victory sound and record celebration on 100% completion
  useEffect(() => {
    if (isAllCompleted) {
      const todayStr = new Date().toISOString().slice(0, 10);
      const celebratedDate = localStorage.getItem('toeic_celebration_date');
      if (celebratedDate !== todayStr) {
        soundEffects.playVictory();
        localStorage.setItem('toeic_celebration_date', todayStr);
      }
    }
  }, [isAllCompleted]);

  // Keyboard shortcut listener: Press 1, 2, 3 to navigate to corresponding daily task
  useEffect(() => {
    if (!activeDay || !activeDay.tasks || activeDay.tasks.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName;
        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || target.isContentEditable) {
          return;
        }
      }

      if (document.querySelector('[role="dialog"]')) {
        return;
      }

      if (['1', '2', '3'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        const targetTask = activeDay.tasks[idx];
        if (targetTask && targetTask.link) {
          e.preventDefault();
          router.push(targetTask.link);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDay, router]);

  if (!streakMounted) {
    return (
      <div className={styles.container}>
        {/* Skeleton Hero */}
        <div className={`${styles.heroSkeleton} skeleton`} />
        <div className={`${styles.sectionSkeleton} skeleton`} />
        <div className={`${styles.sectionSkeleton} skeleton`} style={{ height: 120 }} />
      </div>
    );
  }

  const incompleteTaskIndex = activeDay ? activeDay.tasks.findIndex((t: any) => !t.completed) : -1;
  const currentStepNum = incompleteTaskIndex >= 0 ? incompleteTaskIndex + 1 : 1;
  const primaryCtaLink = isAllCompleted 
    ? `/exam?test=${selectedTest || 'ets2022_test1'}` 
    : nextStudyTask.link;
  const primaryCtaTitle = isAllCompleted
    ? 'THI THỬ ETS HOẶC TỰ LUYỆN'
    : completedToday === 0
      ? 'BẮT ĐẦU PHIÊN HỌC HÔM NAY'
      : `TIẾP TỤC: ${nextStudyTask.title}`;
  const primaryCtaTag = isAllCompleted
    ? 'Đã hoàn thành 100% mục tiêu hôm nay'
    : `Bước ${currentStepNum}/3 • ~15-20 phút • 1-Click`;

  const STEP_METAS = [
    { num: '01', phase: 'Khởi động', time: '~5 phút' },
    { num: '02', phase: 'Trọng tâm', time: '~15 phút' },
    { num: '03', phase: 'Củng cố', time: '~5 phút' },
  ];

  return (
    <div className={`${styles.container} stagger-children`}>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Sẵn sàng bứt phá{' '}
              <span className="text-gradient">TOEIC {onboardingData.target}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {onboardingData.daysLeft !== null ? (
                <span className={styles.countdown}>
                  {onboardingData.daysLeft === 0 ? (
                    'Hôm nay là ngày thi! Chúc bạn tự tin đạt điểm tối đa.'
                  ) : onboardingData.daysLeft === 1 ? (
                    'Chỉ còn 1 ngày nữa là thi. Giữ tâm lý thật thoải mái nhé!'
                  ) : onboardingData.daysLeft > 1 ? (
                    <>
                      Chỉ còn <strong>{onboardingData.daysLeft}</strong> ngày nữa là thi. Cố lên!
                    </>
                  ) : (
                    'Cùng AI Master lộ trình luyện thi chuẩn ETS'
                  )}
                </span>
              ) : (
                'Cùng AI Master lộ trình luyện thi chuẩn ETS'
              )}
            </p>
            <div className={styles.heroCtaRow}>
              <Link href={primaryCtaLink} className={styles.heroPrimaryCta}>
                <div className={styles.heroCtaInfo}>
                  <span className={styles.heroCtaTag}>{primaryCtaTag}</span>
                  <span className={styles.heroCtaTitle}>{primaryCtaTitle}</span>
                </div>
                <span className={styles.heroCtaArrow}><ArrowRightIcon size={18} /></span>
              </Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <StreakCounter 
              currentStreak={streakData.currentStreak} 
              bestStreak={streakData.bestStreak} 
              freezeCount={streakData.freezeCount}
              isFrozenToday={streakData.isFrozenToday}
            />
            <div className={styles.mascotFloat}>
              <MascotSVG mood={streakData.currentStreak > 0 ? 'happy' : 'idle'} size={80} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPACT INSIGHT BAR ═══════════════ */}
      <CompactInsightBar />

      {/* ═══════════════ TODAY'S 3-STEP LEARNING ROUTINE ═══════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon} data-color="primary">
            <TargetIcon size={20} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Hành Trình Học Hôm Nay</h2>
            <p className={styles.sectionSubtitle}>
              {studyPlan && activeDay 
                ? `Ngày ${activeDay.dayNumber}/${studyPlan.daysTotal} • Hoàn thành 3 bước để nhận +50 XP và giữ chuỗi` 
                : '3 bước chuẩn sư phạm mỗi ngày để tăng điểm thực chất'}
            </p>
          </div>
        </div>

        {studyPlan && activeDay ? (
          <div className={`${styles.dailyCard} card-glow`}>
            {isAllCompleted && (
              <div className={styles.celebrationBanner} data-testid="celebration-banner">
                <div className={styles.celebrationIconWrap}>
                  <AwardIcon size={22} />
                </div>
                <div className={styles.celebrationText}>
                  <div className={styles.celebrationHeader}>
                    <h4 className={styles.celebrationTitle}>Mục tiêu hôm nay hoàn thành xuất sắc!</h4>
                    <span className={styles.celebrationBadge}>+50 XP</span>
                  </div>
                  <p className={styles.celebrationSub}>
                    Bạn đã hoàn thành toàn bộ 3 bước hôm nay và giữ vững phong độ bứt phá TOEIC {onboardingData.target}.
                  </p>
                </div>
              </div>
            )}

            <div className={styles.dailyHeader}>
              <div className={styles.dailyInfo}>
                <div className={styles.dailyTitleGroup}>
                  <span className={styles.dayLabel}>Tiến độ phiên học: {completedToday}/{totalToday} bước</span>
                  <Link
                    href="/study-plan"
                    className="btn-ghost btn-sm"
                    style={{ fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px' }}
                  >
                    <span>Lộ trình 30 ngày</span>
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
                <span className={styles.progressLabel}>{progressPercent}%</span>
              </div>
              <div className={styles.progressBarBg}>
                <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <div className={styles.routineContainer}>
              {activeDay.tasks.map((task: any, index: number) => {
                const meta = STEP_METAS[index] || { num: `0${index + 1}`, phase: 'Luyện tập', time: '~10 phút' };
                const isCurrent = !task.completed && index === incompleteTaskIndex;

                return (
                  <div
                    key={task.id}
                    className={styles.routineStepCard}
                    data-completed={task.completed}
                    data-current={isCurrent}
                  >
                    <div className={styles.stepLeftArea}>
                      <button
                        className={styles.checkButton}
                        onClick={(e) => {
                          const btn = e.currentTarget;
                          btn.classList.remove('animate-bounce-check');
                          void btn.offsetWidth;
                          btn.classList.add('animate-bounce-check');
                          const updated = toggleTaskCompleted(activeDay.dayNumber, task.id);
                          if (updated) {
                            setStudyPlan({ ...updated });
                            setActiveDayNumber(activeDay.dayNumber);
                            const updatedDay = updated.days.find((d: any) => d.dayNumber === activeDay.dayNumber);
                            if (updatedDay && updatedDay.tasks.every((t: any) => t.completed)) {
                              soundEffects.playVictory();
                              localStorage.setItem('toeic_celebration_date', new Date().toISOString().slice(0, 10));
                            }
                          }
                        }}
                        title={task.completed ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                      >
                        {task.completed && <CheckIcon size={14} />}
                      </button>

                      <div className={styles.stepNumberCircle}>
                        {task.completed ? <CheckIcon size={18} /> : meta.num}
                      </div>

                      <div className={styles.stepBody}>
                        <div className={styles.stepMetaRow}>
                          <span className={styles.stepPhaseBadge}>{meta.phase}</span>
                          <span className={styles.stepTimeLabel}>{meta.time}</span>
                          {task.subCategory && (
                            <span className={styles.stepSubCategoryBadge}>{task.subCategory}</span>
                          )}
                        </div>
                        <span className={styles.stepTitleText}>{task.title}</span>
                      </div>
                    </div>

                    <div className={styles.stepRightArea}>
                      {isCurrent && (
                        <span className={styles.stepCurrentChip}>
                          Bước cần làm
                        </span>
                      )}
                      {index < 3 && (
                        <span className={styles.shortcutKeyBadge} title={`Bấm phím ${index + 1} để học ngay`}>
                          {index + 1}
                        </span>
                      )}
                      <Link
                        href={task.link}
                        className={`${task.completed ? 'btn-secondary' : isCurrent ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      >
                        {task.completed ? 'ÔN LẠI' : 'HỌC NGAY'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={styles.noPlanCard}>
            <div className={styles.noPlanContent}>
              <MascotSVG mood="thinking" size={72} />
              <div>
                <h3 className={styles.noPlanTitle}>Bạn chưa có lộ trình!</h3>
                <p className={styles.noPlanDesc}>
                  Làm bài Test Nhanh (28 câu) để AI thiết kế lộ trình 3 bước mỗi ngày riêng cho bạn.
                </p>
              </div>
            </div>
            <div className={styles.noPlanActions}>
              <Link href="/diagnostic" className="btn-primary">
                TEST 20 PHÚT
                <ArrowRightIcon size={18} />
              </Link>
              <Link href="/study-plan" className="btn-secondary btn-sm">
                TỰ TẠO LỘ TRÌNH
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════ ON-DEMAND PRACTICE & MOCK TEST HUB ═══════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderRow}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon} data-color="secondary">
              <CompassIcon size={20} />
            </div>
            <div>
              <div className={styles.sectionTitleGroup}>
                <h2 className={styles.sectionTitle}>Khu Tự Luyện &amp; Thi Thử Mở Rộng</h2>
                <span className={styles.sectionBadge}>Tự học ngoài giờ</span>
              </div>
              <p className={styles.sectionSubtitle}>Luyện 7 Phần đề thật ETS có audio phòng thu hoặc làm bài thi thử áp lực</p>
            </div>
          </div>
          
          <div className={styles.testDropdownWrapper} ref={testDropdownRef}>
            <button 
              type="button"
              className={`${styles.testSelectorBtn} ${isTestDropdownOpen ? styles.testSelectorBtnActive : ''}`}
              onClick={() => setIsTestDropdownOpen(!isTestDropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={isTestDropdownOpen}
              aria-label="Chọn bộ đề thi ETS"
            >
              <div className={styles.testSelectorBtnLeft}>
                <ExamIcon size={16} className={styles.testSelectorIcon} />
                <span className={styles.selectedTestName}>
                  {testsIndex.find(t => t.id === selectedTest)?.name || 'Chọn đề ETS'}
                </span>
                <span className={styles.testSelectorBadge}>Chuẩn ETS</span>
              </div>
              <ChevronDownIcon size={16} className={`${styles.testSelectorChevron} ${isTestDropdownOpen ? styles.chevronRotated : ''}`} />
            </button>

            {isTestDropdownOpen && (
              <div className={styles.testDropdownMenu} role="listbox">
                <div className={styles.testDropdownHeader}>
                  <span>Bộ Đề Thi Thật ETS 2022</span>
                  <span className={styles.testDropdownHeaderCount}>{testsIndex.length} đề thi</span>
                </div>
                <div className={styles.testDropdownList}>
                  {testsIndex.map(test => {
                    const isSelected = test.id === selectedTest;
                    return (
                      <button
                        key={test.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`${styles.testDropdownItem} ${isSelected ? styles.testDropdownItemActive : ''}`}
                        onClick={() => {
                          setSelectedTest(test.id);
                          setIsTestDropdownOpen(false);
                        }}
                      >
                        <div className={styles.testDropdownItemText}>
                          <span className={styles.testDropdownItemName}>{test.name}</span>
                          <span className={styles.testDropdownItemMeta}>200 câu chuẩn YBM • Audio phòng thu &amp; Bản scan</span>
                        </div>
                        {isSelected && (
                          <span className={styles.testItemCheck}>
                            <CheckIcon size={14} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.stationGrid}>
          {/* Listening Station */}
          <div className={`${styles.stationCard} card-glow`}>
            <div className={styles.stationInfo}>
              <div className={`${styles.stationIcon} ${styles.iconPrimary}`}>
                <HeadphonesIcon size={28} />
              </div>
              <div className={styles.stationText}>
                <h3>Trạm Nghe ETS (Part 1 - 4)</h3>
                <p>{testStats ? `${testStats.p1 + testStats.p2 + testStats.p3 + testStats.p4} câu chuẩn ETS • Audio phòng thu & Dictation` : 'Listening Station'}</p>
              </div>
            </div>
            <div className={styles.stationActions}>
              {[
                { part: 1, title: 'Part 1: 6 câu mô tả tranh (Audio phòng thu)' },
                { part: 2, title: 'Part 2: 25 câu hỏi - đáp phản xạ nhanh' },
                { part: 3, title: 'Part 3: 39 câu đối thoại (13 bài nghe)' },
                { part: 4, title: 'Part 4: 30 câu độc thoại (10 bài nói)' },
              ].map(({ part, title }) => (
                <Link
                  key={part}
                  href={`/part${part}?test=${selectedTest}`}
                  className={`btn-secondary btn-sm ${partProgress[`part${part}`] ? styles.partCompleted : ''}`}
                  title={title}
                >
                  Part {part} {partProgress[`part${part}`] && <CheckIcon size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '3px' }} />}
                </Link>
              ))}
            </div>
          </div>

          {/* Reading Station */}
          <div className={`${styles.stationCard} card-glow`}>
            <div className={styles.stationInfo}>
              <div className={`${styles.stationIcon} ${styles.iconWarning}`}>
                <ReadingIcon size={28} />
              </div>
              <div className={styles.stationText}>
                <h3>Trạm Đọc ETS (Part 5 - 7)</h3>
                <p>{testStats ? `${testStats.p5 + testStats.p6 + testStats.p7} câu sát đề thật • Phân loại ngữ pháp & 6 dạng Part 7` : 'Reading Station'}</p>
              </div>
            </div>
            <div className={styles.stationActions}>
              {[
                { part: 5, title: 'Part 5: 30 câu ngữ pháp & từ vựng chuyên sâu' },
                { part: 6, title: 'Part 6: 16 câu điền đoạn văn (4 bài đọc)' },
                { part: 7, title: 'Part 7: 54 câu đọc hiểu đơn - đôi - ba (15 bài)' },
              ].map(({ part, title }) => (
                <Link
                  key={part}
                  href={`/part${part}?test=${selectedTest}`}
                  className={`btn-secondary btn-sm ${partProgress[`part${part}`] ? styles.partCompleted : ''}`}
                  title={title}
                >
                  Part {part} {partProgress[`part${part}`] && <CheckIcon size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '3px' }} />}
                </Link>
              ))}
              <Link
                href={`/exam?test=${selectedTest}&section=rc`}
                className="btn-accent btn-sm"
                style={{ fontWeight: 700 }}
                title="Luyện tập toàn bộ 100 câu đọc Part 5, 6, 7 trong 75 phút"
              >
                LUYỆN FULL RC (75P)
              </Link>
            </div>
          </div>

          {/* Full Test Arena */}
          <div className={`${styles.stationCard} ${styles.stationFeatured}`}>
            <div className={styles.stationInfo}>
              <div className={`${styles.stationIcon} ${styles.iconFeatured}`}>
                <ExamIcon size={28} />
              </div>
              <div className={styles.stationText}>
                <h3>Đấu Trường Thi Thử Chuẩn ETS</h3>
                <p>Mô phỏng áp lực phòng thi: Mini Test 20P (25 câu 7 Parts) hoặc Full Test 120P (200 câu) có bóc tách lỗ hổng</p>
              </div>
            </div>
            <div className={styles.stationActions} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link
                href={`/mini-test?test=${selectedTest}`}
                className="btn-secondary btn-sm"
                style={{ fontWeight: 700 }}
                title="25 câu hỏi chuẩn hóa đầy đủ 7 Parts trong 20 phút"
              >
                MINI-TEST (20P - 7 PARTS)
              </Link>
              <Link
                href={`/exam?test=${selectedTest}&section=rc`}
                className="btn-secondary btn-sm"
                style={{ fontWeight: 700 }}
                title="Thi thử phòng thi riêng phần Đọc 100 câu trong 75 phút"
              >
                THI THỬ RC (75P)
              </Link>
              <Link
                href={`/exam?test=${selectedTest}`}
                className={styles.featuredBtn}
                title="Thi thử đầy đủ 200 câu Nghe & Đọc chuẩn thời gian ETS 120 phút"
              >
                FULL TEST (120P)
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Supplementary Tools Row */}
        <div className={styles.onDemandToolsRow} style={{ marginTop: '16px' }}>
          <Link href="/study" className={styles.onDemandToolCard}>
            <div className={styles.onDemandToolIcon}>
              <CardsIcon size={20} />
            </div>
            <div className={styles.onDemandToolText}>
              <span className={styles.onDemandToolTitle}>Từ vựng &amp; Flashcards</span>
              <span className={styles.onDemandToolDesc}>SRS Leitner, Quiz 10 câu &amp; Tra từ</span>
            </div>
          </Link>
          <Link href="/notebook" className={styles.onDemandToolCard}>
            <div className={styles.onDemandToolIcon}>
              <NotebookIcon size={20} />
            </div>
            <div className={styles.onDemandToolText}>
              <span className={styles.onDemandToolTitle}>Sổ tay lỗi sai</span>
              <span className={styles.onDemandToolDesc}>Bóc tách nguyên nhân &amp; chữa điểm nghẽn</span>
            </div>
          </Link>
          <Link href="/tips" className={styles.onDemandToolCard}>
            <div className={styles.onDemandToolIcon}>
              <LightbulbIcon size={20} />
            </div>
            <div className={styles.onDemandToolText}>
              <span className={styles.onDemandToolTitle}>Mẹo &amp; Bẫy thi ETS</span>
              <span className={styles.onDemandToolDesc}>30 chiến thuật phòng thi 7 Parts</span>
            </div>
          </Link>
          <Link href="/masterclass" className={styles.onDemandToolCard}>
            <div className={styles.onDemandToolIcon}>
              <SparklesIcon size={20} />
            </div>
            <div className={styles.onDemandToolText}>
              <span className={styles.onDemandToolTitle}>Trạm Masterclass 30&apos;</span>
              <span className={styles.onDemandToolDesc}>Bẻ khóa âm bản xứ &amp; bẫy 800+</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
