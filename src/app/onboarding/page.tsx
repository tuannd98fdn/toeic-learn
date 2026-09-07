'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Confetti from '@/components/Confetti';

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [targetScore, setTargetScore] = useState('');
  const [examDate, setExamDate] = useState('');
  const [level, setLevel] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [animKey, setAnimKey] = useState(0); // forces re-mount for animation

  const goToStep = useCallback((nextStep: number) => {
    setAnimKey(prev => prev + 1);
    setStep(nextStep);
  }, []);

  const handleComplete = () => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', targetScore);
    localStorage.setItem('toeic_exam_date', examDate);
    localStorage.setItem('toeic_current_level', level);
    
    setShowConfetti(true);
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Confetti show={showConfetti} />
      
      <div className={`${styles.card} animate-slide-up`}>
        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`${styles.stepDot} ${s === step ? styles.stepDotActive : ''} ${s < step ? styles.stepDotDone : ''}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div key={`step1-${animKey}`} className={styles.slideEnter}>
            <h1 className={styles.title}>Chào mừng bạn!</h1>
            <p className={styles.subtitle}>Hãy để TOEIC Master thiết kế lộ trình riêng cho bạn.</p>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Mục tiêu điểm số của bạn là?</label>
              <div className={styles.optionsGrid}>
                {['500+', '600+', '750+', '900+'].map((score) => (
                  <button
                    key={score}
                    className={`${styles.optionBtn} ${targetScore === score ? styles.optionSelected : ''}`}
                    onClick={() => {
                      setTargetScore(score);
                      setTimeout(() => goToStep(2), 300);
                    }}
                  >
                    Mục tiêu {score}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div key={`step2-${animKey}`} className={styles.slideEnter}>
            <button className={styles.backBtn} onClick={() => goToStep(1)}>
              ← Quay lại
            </button>
            <h1 className={styles.title}>Trình độ hiện tại?</h1>
            <p className={styles.subtitle}>Chúng tôi sẽ điều chỉnh độ khó bài tập.</p>
            
            <div className={styles.formGroup}>
              <div className={styles.optionsGrid} style={{ gridTemplateColumns: '1fr' }}>
                {[
                  { id: 'beginner', label: 'Mất gốc / Mới bắt đầu (< 300)' },
                  { id: 'intermediate', label: 'Đã có nền tảng cơ bản (300 - 550)' },
                  { id: 'advanced', label: 'Khá giỏi, muốn luyện đề (550+)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.optionBtn} ${level === item.id ? styles.optionSelected : ''}`}
                    onClick={() => {
                      setLevel(item.id);
                      setTimeout(() => goToStep(3), 300);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div key={`step3-${animKey}`} className={styles.slideEnter}>
            <button className={styles.backBtn} onClick={() => goToStep(2)}>
              ← Quay lại
            </button>
            <h1 className={styles.title}>Khi nào bạn thi?</h1>
            <p className={styles.subtitle}>Để chúng tôi lên lịch nhắc nhở mỗi ngày.</p>
            
            <div className={styles.formGroup}>
              <input 
                type="date" 
                className={styles.inputField}
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <button 
              className={styles.submitBtn}
              onClick={handleComplete}
              disabled={!examDate}
              style={{ opacity: !examDate ? 0.5 : 1 }}
            >
              Bắt đầu lộ trình ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
