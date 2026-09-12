'use client';

import { useEffect, useState } from 'react';
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
} from '@/components/icons/AppIcons';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const { mounted: streakMounted, streakData, recordStudy } = useStreak();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  
  // Onboarding Data
  const [onboardingData, setOnboardingData] = useState<{ target: string; daysLeft: number | null }>({ target: '750+', daysLeft: null });
  
  // Test selection state
  const [testsIndex, setTestsIndex] = useState<{id: string, name: string}[]>([]);
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [testStats, setTestStats] = useState<{
    p1: number; p2: number; p3: number; p4: number;
    p5: number; p6: number; p7: number;
  } | null>(null);
  const [partProgress, setPartProgress] = useState<Record<string, boolean>>({});

  const nextStudyTask = getNextStudyTask();

  useEffect(() => {
    if (!selectedTest) return;
    
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

    const target = localStorage.getItem('toeic_target_score') || '750+';
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
    setStudyPlan(syncRes.plan || getStudyPlan());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
              {onboardingData.daysLeft !== null 
                ? <span className={styles.countdown}>Chỉ còn <strong>{onboardingData.daysLeft}</strong> ngày nữa là thi. Cố lên!</span>
                : 'Cùng AI Master lộ trình luyện thi chuẩn ETS'}
            </p>
            <div className={styles.heroCtaRow}>
              <Link href={nextStudyTask.link} className={styles.heroPrimaryCta}>
                <div className={styles.heroCtaInfo}>
                  <span className={styles.heroCtaTag}>Tiếp tục lộ trình • 1-Click</span>
                  <span className={styles.heroCtaTitle}>HỌC TIẾP: {nextStudyTask.title}</span>
                </div>
                <span className={styles.heroCtaArrow}><ArrowRightIcon size={18} /></span>
              </Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <StreakCounter currentStreak={streakData.currentStreak} bestStreak={streakData.bestStreak} />
            <div className={styles.mascotFloat}>
              <MascotSVG mood={streakData.currentStreak > 0 ? 'happy' : 'idle'} size={80} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DAILY GOALS ═══════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon} data-color="primary">
            <TargetIcon size={20} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Mục tiêu Vàng hôm nay</h2>
            <p className={styles.sectionSubtitle}>Hoàn thành để nhận XP &amp; giữ chuỗi</p>
          </div>
        </div>

        {studyPlan ? (() => {
          const activeDay = studyPlan.days.find((d) => !d.completed) || studyPlan.days[0];
          const completedToday = activeDay.tasks.filter((t) => t.completed).length;
          const totalToday = activeDay.tasks.length;
          const progressPercent = Math.round((completedToday / totalToday) * 100);

          return (
            <div className={`${styles.dailyCard} card-glow`}>
              <div className={styles.dailyHeader}>
                <div className={styles.dailyInfo}>
                  <span className={styles.dayLabel}>Ngày {activeDay.dayNumber}/{studyPlan.daysTotal}</span>
                  <span className={styles.progressLabel}>{progressPercent}%</span>
                </div>
                <Link
                  href="/study-plan"
                  className="btn-ghost btn-sm"
                  style={{ fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>Chi tiết lộ trình</span>
                  <ArrowRightIcon size={14} />
                </Link>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className={styles.planList}>
                {activeDay.tasks.map((task: any) => (
                  <div key={task.id} className={styles.planItem} data-completed={task.completed}>
                    <div className={styles.planItemInfo}>
                      <button
                        className={styles.checkButton}
                        onClick={(e) => {
                          const btn = e.currentTarget;
                          btn.classList.remove('animate-bounce-check');
                          void btn.offsetWidth;
                          btn.classList.add('animate-bounce-check');
                          const updated = toggleTaskCompleted(activeDay.dayNumber, task.id);
                          if (updated) setStudyPlan({ ...updated });
                        }}
                      >
                        {task.completed && '✓'}
                      </button>
                      <div className={styles.planItemTextGroup}>
                        <div className={styles.planItemHeaderRow}>
                          <span className={styles.planItemTitle}>{task.title}</span>
                          {task.subCategory && (
                            <span className={styles.subCatTag}>{task.subCategory}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link href={task.link} className={`${task.completed ? 'btn-secondary' : 'btn-primary'} btn-sm`}>
                      {task.completed ? 'ÔN LẠI' : 'HỌC NGAY'}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })() : (
          <div className={styles.noPlanCard}>
            <div className={styles.noPlanContent}>
              <MascotSVG mood="thinking" size={72} />
              <div>
                <h3 className={styles.noPlanTitle}>Bạn chưa có lộ trình!</h3>
                <p className={styles.noPlanDesc}>
                  Làm bài Test Nhanh (28 câu) để AI thiết kế lộ trình riêng cho bạn.
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

      {/* ═══════════════ EXAM MAP ═══════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderRow}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon} data-color="secondary">
              <CompassIcon size={20} />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Bản Đồ Đề Thi</h2>
              <p className={styles.sectionSubtitle}>Chọn đề và chinh phục các trạm</p>
            </div>
          </div>
          
          <select 
            className={styles.testSelector} 
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
          >
            {testsIndex.map(test => (
              <option key={test.id} value={test.id}>{test.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.stationGrid}>
          {/* Listening Station */}
          <div className={`${styles.stationCard} card-glow`}>
            <div className={styles.stationInfo}>
              <div className={`${styles.stationIcon} ${styles.iconPrimary}`}>
                <HeadphonesIcon size={28} />
              </div>
              <div className={styles.stationText}>
                <h3>Trạm Nghe</h3>
                <p>{testStats ? `${testStats.p1 + testStats.p2 + testStats.p3 + testStats.p4} câu chuẩn ETS` : 'Listening Station'}</p>
              </div>
            </div>
            <div className={styles.stationActions}>
              {[1, 2, 3, 4].map(part => (
                <Link key={part} href={`/part${part}?test=${selectedTest}`} className={`btn-secondary btn-sm ${partProgress[`part${part}`] ? styles.partCompleted : ''}`}>
                  Part {part} {partProgress[`part${part}`] && '✓'}
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
                <h3>Trạm Đọc</h3>
                <p>{testStats ? `${testStats.p5 + testStats.p6 + testStats.p7} câu sát đề thật` : 'Reading Station'}</p>
              </div>
            </div>
            <div className={styles.stationActions}>
              {[5, 6, 7].map(part => (
                <Link key={part} href={`/part${part}?test=${selectedTest}`} className={`btn-secondary btn-sm ${partProgress[`part${part}`] ? styles.partCompleted : ''}`}>
                  Part {part} {partProgress[`part${part}`] && '✓'}
                </Link>
              ))}
            </div>
          </div>

          {/* Mini Test */}
          <div className={`${styles.stationCard} card-glow`}>
            <div className={styles.stationInfo}>
              <div className={`${styles.stationIcon} ${styles.iconSuccess}`}>
                <ZapIcon size={28} />
              </div>
              <div className={styles.stationText}>
                <h3>Trạm Nhanh</h3>
                <p>20 câu ngẫu nhiên — 15 phút</p>
              </div>
            </div>
            <div className={styles.stationActions}>
              <Link href={`/mini-test?test=${selectedTest}`} className="btn-accent btn-sm">
                THI NGAY (15P)
              </Link>
            </div>
          </div>

          {/* Full Test — Featured */}
          <div className={`${styles.stationCard} ${styles.stationFeatured}`}>
            <div className={styles.stationInfo}>
              <div className={`${styles.stationIcon} ${styles.iconFeatured}`}>
                <ExamIcon size={28} />
              </div>
              <div className={styles.stationText}>
                <h3>Đấu Trường</h3>
                <p>200 Câu — 120 Phút mô phỏng phòng thi thật</p>
              </div>
            </div>
            <div className={styles.stationActions}>
              <Link href={`/exam?test=${selectedTest}`} className={styles.featuredBtn}>
                VÀO THI NGAY
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ VOCABULARY TOOLS ═══════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon} data-color="warning">
            <ZapIcon size={20} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Kho Vũ Khí</h2>
            <p className={styles.sectionSubtitle}>Nạp từ vựng siêu tốc mỗi ngày</p>
          </div>
        </div>

        <div className={styles.toolsGrid}>
          <Link href="/study" className={`${styles.toolCard} card-glow`}>
            <div className={`${styles.toolIcon} ${styles.iconPrimary}`}>
              <CardsIcon size={22} />
            </div>
            <h4>Flashcards</h4>
            <p>Học lặp lại ngắt quãng</p>
          </Link>
          <Link href="/quiz" className={`${styles.toolCard} card-glow`}>
            <div className={`${styles.toolIcon} ${styles.iconWarning}`}>
              <QuizIcon size={22} />
            </div>
            <h4>Làm Quiz</h4>
            <p>Kiểm tra trí nhớ</p>
          </Link>
          <Link href="/vocabulary" className={`${styles.toolCard} card-glow`}>
            <div className={`${styles.toolIcon} ${styles.iconSecondary}`}>
              <BookIcon size={22} />
            </div>
            <h4>Từ điển</h4>
            <p>Khám phá kho từ</p>
          </Link>
          <Link href="/tips" className={`${styles.toolCard} card-glow`}>
            <div className={`${styles.toolIcon} ${styles.iconInfo}`}>
              <LightbulbIcon size={22} />
            </div>
            <h3>Mẹo thi</h3>
            <p>Chiến thuật làm bài</p>
          </Link>
          <Link href="/notebook" className={`${styles.toolCard} card-glow`}>
            <div className={`${styles.toolIcon} ${styles.iconSuccess}`}>
              <NotebookIcon size={22} />
            </div>
            <h3>Sổ tay lỗi</h3>
            <p>Khắc phục điểm yếu</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
