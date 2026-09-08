'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import MascotSVG from '@/components/illustrations/MascotSVG';
import { 
  CardsIcon, 
  BrainIcon, 
  ExamIcon,
  CompassIcon
} from '@/components/icons/AppIcons';
import styles from './landing.module.css';

/* ==========================================================
   Spotlight Card Component (Mouse Tracking)
   ========================================================== */
function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      className={`${styles.spotlightCard} ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div 
        className={styles.spotlightGlow}
        style={{ 
          opacity,
          '--x': `${position.x}px`, 
          '--y': `${position.y}px` 
        } as React.CSSProperties}
      />
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
}

/* ==========================================================
   Main Landing Page
   ========================================================== */
export default function LandingPage() {
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoArea}>
          <MascotSVG mood="idle" size={32} />
          <span className={styles.brandName}>TOEIC Master</span>
        </div>
        <div className={styles.navActions}>
          <Link href="/login" className={styles.loginLink}>Đăng nhập</Link>
          <Link href="/login" className={styles.ctaButton}>Bắt đầu miễn phí</Link>
        </div>
      </nav>

      <main className={styles.main}>
        {/* ================= HERO SECTION ================= */}
        <section className={styles.hero}>
          {/* Micro-UI Floating Elements */}
          <div className={styles.microUiContainer}>
            <div className={`${styles.floatingUi} ${styles.uiChart}`}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' }}>
                <div style={{ width: '12px', height: '40%', background: 'var(--primary)', borderRadius: '2px' }}/>
                <div style={{ width: '12px', height: '70%', background: 'var(--primary)', borderRadius: '2px' }}/>
                <div style={{ width: '12px', height: '100%', background: 'var(--secondary)', borderRadius: '2px' }}/>
                <div style={{ width: '12px', height: '60%', background: 'var(--primary)', borderRadius: '2px' }}/>
              </div>
            </div>
            
            <div className={`${styles.floatingUi} ${styles.uiFlashcard}`}>
              Acknowledge
            </div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeHighlight}>Bản Beta 1.0</span> — Trải nghiệm giới hạn
            </div>
            
            <h1 className={styles.headline}>
              Học TOEIC không cần<br/>
              <span className={styles.gradientText}>cày cuốc mù quáng</span>
            </h1>
            
            <p className={styles.subheadline}>
              Thuật toán AI tự động thiết kế lộ trình, Flashcard Spaced Repetition và phòng thi ETS ảo. Tăng 150 điểm chỉ sau 30 ngày.
            </p>

            <Link href="/login" className={styles.primaryCta}>
              Trải nghiệm hệ thống ngay
            </Link>
          </div>
        </section>

        {/* ================= BENTO BOX FEATURES ================= */}
        <section className={styles.bentoSection}>
          <div className={styles.bentoHeader}>
            <h2>Mọi thứ bạn cần để đạt đỉnh</h2>
          </div>

          <div className={styles.bentoGrid}>
            
            {/* 1. Main Feature (Large Left) */}
            <SpotlightCard className={styles.cardMain}>
              <div className={styles.cardIcon}>
                <CompassIcon size={24} />
              </div>
              <h3>Lộ Trình Trí Tuệ Nhân Tạo</h3>
              <p>AI phân tích dữ liệu từ bài thi chẩn đoán của bạn để thiết kế một lộ trình học độc nhất. Tập trung chính xác vào lỗ hổng kiến thức thay vì học dàn trải mất thời gian.</p>
              
              <div className={styles.bentoMockup}>
                <div className={styles.mockupChart}>
                  {/* Fake UI Chart */}
                  <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '60%', background: 'linear-gradient(0deg, rgba(var(--primary-rgb), 0.2), transparent)' }} />
                  <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', bottom: 0 }}>
                    <path d="M0 50 Q 25 30 50 40 T 100 10" fill="none" stroke="var(--primary)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </SpotlightCard>

            {/* 2. Top Right Feature */}
            <SpotlightCard className={styles.cardTopRight}>
              <div className={styles.cardIcon}>
                <CardsIcon size={24} />
              </div>
              <h3>Spaced Repetition</h3>
              <p>Hệ thống Flashcard 3D thông minh ghi nhớ thời điểm bạn chuẩn bị quên từ vựng để nhắc nhở học lại.</p>
            </SpotlightCard>

            {/* 3. Bottom Right Feature */}
            <SpotlightCard className={styles.cardBottomRight}>
              <div className={styles.cardIcon}>
                <ExamIcon size={24} />
              </div>
              <h3>Phòng Thi Ảo ETS</h3>
              <p>Thi thử sát với đề thi thực tế nhất. Giao diện thi được tinh chỉnh giúp bạn không bỡ ngỡ khi bước vào phòng thi thật.</p>
            </SpotlightCard>

          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <MascotSVG mood="idle" size={24} style={{ opacity: 0.5, marginBottom: 12 }} />
        <p>© 2026 TOEIC Master Vietnam. The Future of EdTech.</p>
      </footer>
    </div>
  );
}
