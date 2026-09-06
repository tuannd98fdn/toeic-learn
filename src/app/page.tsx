'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StreakCounter from '@/components/StreakCounter';
import ProgressRing from '@/components/ProgressRing';
import LeitnerBox from '@/components/LeitnerBox';
import DailyMission from '@/components/DailyMission';
import { useLeitner } from '@/hooks/useLeitner';
import { useStreak } from '@/hooks/useStreak';
import { VOCABULARY_DATA } from '@/data/vocabulary';
import { StudyPlan, getStudyPlan, toggleTaskCompleted } from '@/utils/studyPlanEngine';
import {
  CardsIcon,
  QuizIcon,
  BookIcon,
  NotebookIcon,
  ExamIcon,
  HeadphonesIcon,
  ReadingIcon,
  PhotoIcon,
  ZapIcon,
  UsersIcon,
  MicIcon,
  ClockIcon,
  FileTextIcon,
  LayersIcon,
  CompassIcon,
  TargetIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@/components/icons/AppIcons';
import styles from './page.module.css';

export default function Home() {
  const { mounted: leitnerMounted, getDueWords, getStats } = useLeitner();
  const { mounted: streakMounted, streakData, recordStudy } = useStreak();
  const [greeting, setGreeting] = useState('');
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  
  // Test selection state
  const [testsIndex, setTestsIndex] = useState<{id: string, name: string}[]>([]);
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [testStats, setTestStats] = useState<{
    p1: number;
    p2: number;
    p3: number;
    p4: number;
    p5: number;
    p6: number;
    p7: number;
  } | null>(null);


  // Fetch test stats when selectedTest changes
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
          
          let p3Questions = 0;
          d3.forEach((s: any) => { p3Questions += s.questions?.length || 0; });

          let p4Questions = 0;
          d4.forEach((s: any) => { p4Questions += s.questions?.length || 0; });

          let p6Questions = 0;
          d6.forEach((p: any) => { p6Questions += p.questions?.length || 0; });
          
          let p7Questions = 0;
          d7.forEach((p: any) => { p7Questions += p.questions?.length || 0; });
          
          setTestStats({
            p1: d1.length,
            p2: d2.length,
            p3: p3Questions,
            p4: p4Questions,
            p5: d5.length,
            p6: p6Questions,
            p7: p7Questions,
          });
        }
      } catch (err) {
        console.error("Failed to load stats for test", err);
      }
    };
    
    fetchStats();
  }, [selectedTest]);

  useEffect(() => {
    // Record app open as a study day to maintain streak if they just open to check
    recordStudy();
    
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Chào buổi sáng');
    else if (hour < 18) setGreeting('Chào buổi chiều');
    else setGreeting('Chào buổi tối');

    // Fetch tests index
    fetch('/data/tests_index.json')
      .then(res => res.json())
      .then(data => {
        setTestsIndex(data);
        if (data.length > 0) {
          setSelectedTest(data[0].id);
        }
      })
      .catch(err => console.error("Could not load tests index:", err));

    // Load study plan
    const plan = getStudyPlan();
    setStudyPlan(plan);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!leitnerMounted || !streakMounted) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const dueWords = getDueWords();
  const stats = getStats();
  const totalWords = VOCABULARY_DATA.length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>{greeting}! 👋</h1>
          <p className={styles.subtitle}>Sẵn sàng để master từ vựng & đề thi TOEIC chuẩn ETS?</p>
        </div>
        <StreakCounter currentStreak={streakData.currentStreak} bestStreak={streakData.bestStreak} />
      </header>

      {/* Smart Roadmap / Diagnostic Top Hero Widget */}
      {studyPlan && (() => {
        const activeDay = studyPlan.days.find((d) => !d.completed) || studyPlan.days[0];
        const completedToday = activeDay.tasks.filter((t) => t.completed).length;
        const totalToday = activeDay.tasks.length;

        return (
          <div style={{
            background: 'var(--card)',
            border: '1.5px solid var(--primary)',
            borderRadius: 'var(--radius)',
            padding: '1.25rem 1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CompassIcon size={22} />
                <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
                  Lộ Trình TOEIC {studyPlan.targetScore}+: Ngày {activeDay.dayNumber}/{studyPlan.daysTotal}
                </h2>
                <span style={{
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '10px'
                }}>
                  {completedToday}/{totalToday} hoàn thành
                </span>
              </div>

              <Link
                href="/study-plan"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                Xem chi tiết lộ trình <ArrowRightIcon size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              {activeDay.tasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: task.completed ? 'var(--bg-secondary)' : 'var(--card)',
                    opacity: task.completed ? 0.75 : 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = toggleTaskCompleted(activeDay.dayNumber, task.id);
                        if (updated) setStudyPlan({ ...updated });
                      }}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: '1.5px solid var(--border)',
                        background: task.completed ? 'var(--success)' : 'transparent',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                        flexShrink: 0,
                      }}
                    >
                      {task.completed && '✓'}
                    </button>
                    <span style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textDecoration: task.completed ? 'line-through' : 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {task.title}
                    </span>
                  </div>

                  <Link
                    href={task.link}
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      textDecoration: 'none',
                      flexShrink: 0,
                      marginLeft: '0.5rem',
                    }}
                  >
                    Vào ➔
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {!studyPlan && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(99, 102, 241, 0.12) 100%)',
          border: '1.5px dashed var(--primary)',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>
              <TargetIcon size={14} /> Chẩn đoán năng lực & Lộ trình
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.4rem 0 0.2rem 0', color: 'var(--foreground)' }}>
              Chưa biết bắt đầu từ đâu để đạt mục tiêu TOEIC?
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '560px' }}>
              Làm bài Test Nhanh 20 phút (28 câu Part 1-7 chuẩn ETS) để nhận dự đoán band điểm 10-990 và hệ thống AI tự thiết kế lộ trình theo ngày riêng cho bạn.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              href="/diagnostic"
              style={{
                background: 'var(--primary)',
                color: '#ffffff',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius)',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
              }}
            >
              <TargetIcon size={18} /> Test Chẩn Đoán 20p ➔
            </Link>
            <Link
              href="/study-plan"
              style={{
                background: 'var(--card)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                padding: '0.75rem 1.15rem',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
                fontSize: '0.92rem',
                textDecoration: 'none',
              }}
            >
              Tự tạo lộ trình
            </Link>
          </div>
        </div>
      )}

      <section className={styles.overviewSection}>

        <div className={`${styles.progressCard} card-minimal`}>
          <ProgressRing 
            value={stats.mastered} 
            max={totalWords} 
            size={140}
            label="Mastered"
          />
          <div className={styles.progressStats}>
            <div className={styles.statRow}>
              <span className={styles.statDot} style={{ background: 'var(--success)' }}></span>
              <span>Đã thuộc: {stats.mastered}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statDot} style={{ background: 'var(--warning)' }}></span>
              <span>Đang học: {stats.learning}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statDot} style={{ background: 'var(--text-tertiary)' }}></span>
              <span>Chưa học: {stats.unstudied}</span>
            </div>
          </div>
        </div>

        <DailyMission />
      </section>

      <section className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Từ vựng (Vocabulary Mastery)</h2>
        <div className={styles.actionGrid}>
          <Link href="/study" className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconPrimary}`}>
              <CardsIcon size={24} />
            </div>
            <h3>Flashcards</h3>
            <p>Ôn tập bằng Spaced Repetition</p>
          </Link>
          <Link href="/quiz" className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconAccent}`}>
              <QuizIcon size={24} />
            </div>
            <h3>Làm Quiz</h3>
            <p>Kiểm tra trí nhớ nhanh</p>
          </Link>
          <Link href="/vocabulary" className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconSecondary}`}>
              <BookIcon size={24} />
            </div>
            <h3>Từ điển</h3>
            <p>Khám phá tất cả từ vựng</p>
          </Link>
          <Link href="/notebook" className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconSuccess}`}>
              <NotebookIcon size={24} />
            </div>
            <h3>Lỗi sai</h3>
            <p>Ôn tập các từ hay quên</p>
          </Link>
        </div>

        {/* Full Mock Test Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #4f46e5 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius)',
          padding: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2.5rem',
          boxShadow: 'var(--shadow-lg)',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ExamIcon size={16} /> Full Test Simulation
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.5rem 0 0.25rem 0', color: '#fff' }}>
              Thi Thử Trọn Vẹn 200 Câu (120 Phút)
            </h2>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem', maxWidth: '540px' }}>
              Mô phỏng áp lực phòng thi thật chuẩn ETS: 100 câu Nghe + 100 câu Đọc, tính giờ 120 phút, bảng quy đổi điểm 10 - 990 và chẩn đoán điểm yếu cá nhân.
            </p>
          </div>
          
          <Link
            href={`/exam?test=${selectedTest}`}
            style={{
              background: '#ffffff',
              color: '#1e3a8a',
              padding: '0.85rem 1.75rem',
              borderRadius: 'var(--radius)',
              fontWeight: 800,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              whiteSpace: 'nowrap',
            }}
          >
            Vào thi ngay ➔
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Luyện từng phần (Practice by Part)</h2>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Đề thi chuẩn ETS có đầy đủ Audio, Hình ảnh và Lời giải chi tiết
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {testStats && (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.35rem 0.85rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                Tổng: <strong>{testStats.p1 + testStats.p2 + testStats.p3 + testStats.p4 + testStats.p5 + testStats.p6 + testStats.p7} câu</strong> (LC: {testStats.p1 + testStats.p2 + testStats.p3 + testStats.p4} | RC: {testStats.p5 + testStats.p6 + testStats.p7})
              </div>
            )}
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
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 0.75rem 0', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HeadphonesIcon size={20} /> Phần Nghe (Listening Section - 100 câu)
        </h3>
        
        <div className={styles.actionGrid}>
          <Link href={`/part1?test=${selectedTest}`} className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconPrimary}`}>
              <PhotoIcon size={24} />
            </div>
            <h3>Part 1: Photographs</h3>
            <p>{testStats ? `${testStats.p1} câu hình ảnh` : '6 câu mô tả tranh'}</p>
          </Link>
          <Link href={`/part2?test=${selectedTest}`} className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconAccent}`}>
              <ZapIcon size={24} />
            </div>
            <h3>Part 2: Question-Response</h3>
            <p>{testStats ? `${testStats.p2} câu phản xạ` : '25 câu hỏi đáp'}</p>
          </Link>
          <Link href={`/part3?test=${selectedTest}`} className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconSecondary}`}>
              <UsersIcon size={24} />
            </div>
            <h3>Part 3: Conversations</h3>
            <p>{testStats ? `${testStats.p3} câu hội thoại` : '39 câu đối thoại'}</p>
          </Link>
          <Link href={`/part4?test=${selectedTest}`} className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconSuccess}`}>
              <MicIcon size={24} />
            </div>
            <h3>Part 4: Short Talks</h3>
            <p>{testStats ? `${testStats.p4} câu bài nói` : '30 câu thông báo/thuyết trình'}</p>
          </Link>
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '2rem 0 0.75rem 0', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ReadingIcon size={20} /> Phần Đọc (Reading Section - 100 câu)
        </h3>
        
        <div className={styles.actionGrid}>
          <Link href={`/part5?test=${selectedTest}`} className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconPrimary}`}>
              <ClockIcon size={24} />
            </div>
            <h3>Part 5: Speed Trainer</h3>
            <p>{testStats ? `${testStats.p5} câu hoàn thành câu` : '30 câu ngữ pháp'}</p>
          </Link>
          <Link href={`/part6?test=${selectedTest}`} className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconSecondary}`}>
              <FileTextIcon size={24} />
            </div>
            <h3>Part 6: Text Completion</h3>
            <p>{testStats ? `${testStats.p6} câu điền đoạn` : '16 câu đoạn văn'}</p>
          </Link>
          <Link href={`/part7?test=${selectedTest}`} className={`${styles.gridCard} card-minimal`}>
            <div className={`${styles.cardIconWrapper} ${styles.iconAccent}`}>
              <LayersIcon size={24} />
            </div>
            <h3>Part 7: Reading Comprehension</h3>
            <p>{testStats ? `${testStats.p7} câu đọc hiểu` : '54 câu đơn/đôi/ba'}</p>
          </Link>
        </div>
      </section>

      <section className={styles.leitnerSection}>
        <LeitnerBox stats={stats.boxes} totalWords={totalWords} />
      </section>
    </div>
  );
}
