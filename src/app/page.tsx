'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StreakCounter from '@/components/StreakCounter';
import { useStreak } from '@/hooks/useStreak';
import { StudyPlan, getStudyPlan, toggleTaskCompleted } from '@/utils/studyPlanEngine';
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
} from '@/components/icons/AppIcons';
import styles from './page.module.css';

export default function Home() {
  const { mounted: streakMounted, streakData, recordStudy } = useStreak();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  
  // Test selection state
  const [testsIndex, setTestsIndex] = useState<{id: string, name: string}[]>([]);
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [testStats, setTestStats] = useState<{
    p1: number; p2: number; p3: number; p4: number;
    p5: number; p6: number; p7: number;
  } | null>(null);

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
        }
      } catch (err) {
        console.error("Failed to load stats for test", err);
      }
    };
    fetchStats();
  }, [selectedTest]);

  useEffect(() => {
    recordStudy();
    fetch('/data/tests_index.json')
      .then(res => res.json())
      .then(data => {
        setTestsIndex(data);
        if (data.length > 0) setSelectedTest(data[0].id);
      })
      .catch(err => console.error("Could not load tests index:", err));

    setStudyPlan(getStudyPlan());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!streakMounted) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          {/* Slogan mạnh mẽ thay vì "Chào buổi chiều" */}
          <h1 className={styles.greeting}>🔥 Sẵn sàng bứt phá<br/>TOEIC 750+ hôm nay chưa?</h1>
          <p className={styles.subtitle}>Cùng AI Master lộ trình luyện thi chuẩn ETS</p>
        </div>
        <StreakCounter currentStreak={streakData.currentStreak} bestStreak={streakData.bestStreak} />
      </header>

      {/* 1. KHOẢNG MỤC TIÊU VÀNG (Lộ trình hằng ngày) */}
      <section className={styles.pathSection}>
        <div className={styles.sectionHeader}>
          <span style={{ color: 'var(--primary)' }}><TargetIcon size={24} /></span>
          <div>
            <h2 className={styles.sectionTitle}>Mục tiêu Vàng hôm nay</h2>
            <p className={styles.sectionSubtitle}>Hoàn thành để nhận điểm kinh nghiệm & giữ chuỗi</p>
          </div>
        </div>

        {studyPlan ? (() => {
          const activeDay = studyPlan.days.find((d) => !d.completed) || studyPlan.days[0];
          const completedToday = activeDay.tasks.filter((t) => t.completed).length;
          const totalToday = activeDay.tasks.length;
          const progressPercent = Math.round((completedToday / totalToday) * 100);

          return (
            <div className="card-minimal" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0, color: 'var(--foreground)' }}>
                  Ngày {activeDay.dayNumber}/{studyPlan.daysTotal}
                </h3>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {progressPercent}% Hoàn thành
                </span>
              </div>
              
              {/* Progress Bar */}
              <div style={{ width: '100%', height: '12px', background: 'var(--muted)', borderRadius: '6px', marginBottom: '24px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary)', borderRadius: '6px', transition: 'width 0.3s ease' }}></div>
              </div>

              <div className={styles.planList}>
                {activeDay.tasks.map((task) => (
                  <div key={task.id} className={styles.planItem} data-completed={task.completed}>
                    <div className={styles.planItemInfo}>
                      <button
                        className={styles.checkButton}
                        onClick={() => {
                          const updated = toggleTaskCompleted(activeDay.dayNumber, task.id);
                          if (updated) setStudyPlan({ ...updated });
                        }}
                      >
                        {task.completed && '✓'}
                      </button>
                      <span className={styles.planItemTitle}>{task.title}</span>
                    </div>
                    <Link href={task.link} className={task.completed ? "btn-secondary" : "btn-primary"} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                      {task.completed ? 'ÔN LẠI' : 'HỌC NGAY'}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })() : (
          <div className="card-minimal" style={{ padding: '24px', background: 'var(--primary-light)', borderColor: 'var(--primary-shadow)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '8px' }}>Bạn chưa có lộ trình!</h3>
            <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Làm bài Test Nhanh (28 câu) để nhận dự đoán band điểm và hệ thống AI tự thiết kế lộ trình riêng cho bạn.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/diagnostic" className="btn-primary">
                TEST 20 PHÚT ➔
              </Link>
              <Link href="/study-plan" className="btn-secondary">
                TỰ TẠO LỘ TRÌNH
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 2. CHỌN ĐỀ */}
      <section className={styles.pathSection} style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className={styles.sectionHeader}>
            <span style={{ color: 'var(--secondary)' }}><CompassIcon size={24} /></span>
            <div>
              <h2 className={styles.sectionTitle}>Bản Đồ Đề Thi</h2>
              <p className={styles.sectionSubtitle}>Chọn đề và bắt đầu chinh phục các trạm</p>
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

        {/* Trạm 1: Listening */}
        <div className={`${styles.stationCard} card-minimal`}>
          <div className={styles.stationInfo}>
            <div className={`${styles.stationIcon} ${styles.stationIconPrimary}`}>
              <HeadphonesIcon size={32} />
            </div>
            <div className={styles.stationText}>
              <h3>Trạm Nghe (Listening Station)</h3>
              <p>100 câu hỏi Audio sắc nét. {testStats ? `Bao gồm ${testStats.p1 + testStats.p2 + testStats.p3 + testStats.p4} câu chuẩn ETS.` : ''}</p>
            </div>
          </div>
          <div className={styles.stationActions}>
            <Link href={`/part1?test=${selectedTest}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Part 1</Link>
            <Link href={`/part2?test=${selectedTest}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Part 2</Link>
            <Link href={`/part3?test=${selectedTest}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Part 3</Link>
            <Link href={`/part4?test=${selectedTest}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Part 4</Link>
          </div>
        </div>

        {/* Trạm 2: Reading */}
        <div className={`${styles.stationCard} card-minimal`}>
          <div className={styles.stationInfo}>
            <div className={`${styles.stationIcon} ${styles.stationIconAccent}`}>
              <ReadingIcon size={32} />
            </div>
            <div className={styles.stationText}>
              <h3>Trạm Đọc (Reading Station)</h3>
              <p>100 câu Đọc Hiểu nâng cao. {testStats ? `Bao gồm ${testStats.p5 + testStats.p6 + testStats.p7} câu cực sát đề thi thật.` : ''}</p>
            </div>
          </div>
          <div className={styles.stationActions}>
            <Link href={`/part5?test=${selectedTest}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Part 5</Link>
            <Link href={`/part6?test=${selectedTest}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Part 6</Link>
            <Link href={`/part7?test=${selectedTest}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Part 7</Link>
          </div>
        </div>

        {/* Trạm 3: Full Test */}
        <div className={`${styles.stationCard} card-minimal`} style={{ background: 'var(--secondary)', borderColor: 'var(--secondary-shadow)' }}>
          <div className={styles.stationInfo}>
            <div className={`${styles.stationIcon}`} style={{ background: 'rgba(0,0,0,0.2)', color: '#fff' }}>
              <ExamIcon size={32} />
            </div>
            <div className={styles.stationText}>
              <h3 style={{ color: '#fff' }}>Đấu Trường (Full Mock Test)</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)' }}>Thi Thử 200 Câu - 120 Phút mô phỏng áp lực phòng thi thật.</p>
            </div>
          </div>
          <div className={styles.stationActions}>
            <Link href={`/exam?test=${selectedTest}`} className="btn-primary" style={{ background: '#fff', color: 'var(--secondary)', borderBottomColor: '#e5e5e5' }}>
              VÀO THI NGAY ➔
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BỘ CÔNG CỤ TỪ VỰNG */}
      <section className={styles.pathSection} style={{ marginTop: '20px' }}>
        <div className={styles.sectionHeader}>
          <span style={{ color: 'var(--warning)' }}><ZapIcon size={24} /></span>
          <div>
            <h2 className={styles.sectionTitle}>Kho Vũ Khí (Vocabulary)</h2>
            <p className={styles.sectionSubtitle}>Nạp từ vựng siêu tốc mỗi ngày</p>
          </div>
        </div>

        <div className={styles.toolsGrid}>
          <Link href="/study" className={`${styles.toolCard} card-minimal`}>
            <div className={`${styles.toolIcon} ${styles.stationIconPrimary}`}>
              <CardsIcon size={24} />
            </div>
            <h4>Flashcards</h4>
            <p>Học lặp lại ngắt quãng</p>
          </Link>
          <Link href="/quiz" className={`${styles.toolCard} card-minimal`}>
            <div className={`${styles.toolIcon} ${styles.stationIconAccent}`}>
              <QuizIcon size={24} />
            </div>
            <h4>Làm Quiz</h4>
            <p>Kiểm tra trí nhớ</p>
          </Link>
          <Link href="/vocabulary" className={`${styles.toolCard} card-minimal`}>
            <div className={`${styles.toolIcon} ${styles.stationIconSecondary}`}>
              <BookIcon size={24} />
            </div>
            <h4>Từ điển</h4>
            <p>Khám phá kho từ</p>
          </Link>
          <Link href="/notebook" className={`${styles.toolCard} card-minimal`}>
            <div className={`${styles.toolIcon} ${styles.stationIconSuccess}`}>
              <NotebookIcon size={24} />
            </div>
            <h4>Sổ Tay Lỗi</h4>
            <p>Ôn từ hay quên</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
