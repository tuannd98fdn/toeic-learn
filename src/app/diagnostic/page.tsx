'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import { storage } from '@/utils/storage';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import {
  calculateScaledScore,
  getCefrLevel,
  diagnoseWeakness,
  PartScore,
} from '@/utils/toeicScoreCalculator';
import {
  ClockIcon,
  ArrowRightIcon,
  RotateCcwIcon,
  CheckCircleIcon,
  TargetIcon,
} from '@/components/icons/AppIcons';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import styles from './page.module.css';

interface DiagnosticQuestion {
  id: string;
  number: number;
  part: 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7';
  partTitle: string;
  text: string;
  image?: string;
  audioUrl?: string;
  passageText?: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation?: string;
  transcript?: string;
}

export interface DiagnosticResult {
  date: string;
  totalScore: number;
  scaledLC: number;
  scaledRC: number;
  cefrLevel: string;
  correctLC: number;
  correctRC: number;
  weakestPart: {
    part: string;
    partName: string;
    accuracy: number;
    advice: string;
  };
  weakestPartsList: string[];
  partScores: Record<string, PartScore>;
}

const TOTAL_TIME = 20 * 60; // 20 minutes in seconds

export default function DiagnosticPage() {
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Progress state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Result state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  const { addMistake } = useMistakeNotebook();
  useLeaveWarning(Object.keys(userAnswers).length > 0 && !isSubmitted);

  // Load curated 28 questions
  useEffect(() => {
    const loadDiagnosticSet = async () => {
      try {
        setLoading(true);
        const pathBase = '/data/ets2022/test1';
        const responses = await Promise.all([
          fetch(`${pathBase}/part1.json`),
          fetch(`${pathBase}/part2.json`),
          fetch(`${pathBase}/part3.json`),
          fetch(`${pathBase}/part4.json`),
          fetch(`${pathBase}/part5.json`),
          fetch(`${pathBase}/part6.json`),
          fetch(`${pathBase}/part7.json`),
        ]);

        if (responses.some((r) => !r.ok)) {
          throw new Error('Không thể tải bộ đề chẩn đoán.');
        }

        const [p1, p2, p3, p4, p5, p6, p7] = await Promise.all(
          responses.map((r) => r.json())
        );

        const sample: DiagnosticQuestion[] = [];

        // Part 1: 4 questions
        p1.slice(0, 4).forEach((q: any) => {
          sample.push({
            id: q.id,
            number: q.number,
            part: 'p1',
            partTitle: 'Part 1: Photographs',
            text: 'Look at the photograph and choose the statement that best describes what you see.',
            image: q.image,
            audioUrl: q.audioUrl,
            options: q.options,
            correctAnswer: q.correctAnswer,
            transcript: q.transcript,
            explanation: q.explanation,
          });
        });

        // Part 2: 4 questions
        p2.slice(0, 4).forEach((q: any) => {
          sample.push({
            id: q.id,
            number: q.number,
            part: 'p2',
            partTitle: 'Part 2: Question-Response',
            text: 'Listen to the question or statement and choose the best response.',
            audioUrl: q.audioUrl,
            options: q.options,
            correctAnswer: q.correctAnswer,
            transcript: q.transcript,
            explanation: q.explanation,
          });
        });

        // Part 3: 4 questions (3 from first set, 1 from second set)
        if (p3[0]?.questions) {
          p3[0].questions.forEach((q: any) => {
            sample.push({
              id: q.id,
              number: q.number,
              part: 'p3',
              partTitle: 'Part 3: Conversations',
              text: q.text,
              image: p3[0].image,
              audioUrl: p3[0].audioUrl,
              options: q.options,
              correctAnswer: q.correctAnswer,
              transcript: p3[0].transcript,
              explanation: q.explanation,
            });
          });
        }
        if (p3[1]?.questions?.[0]) {
          const q = p3[1].questions[0];
          sample.push({
            id: q.id,
            number: q.number,
            part: 'p3',
            partTitle: 'Part 3: Conversations',
            text: q.text,
            image: p3[1].image,
            audioUrl: p3[1].audioUrl,
            options: q.options,
            correctAnswer: q.correctAnswer,
            transcript: p3[1].transcript,
            explanation: q.explanation,
          });
        }

        // Part 4: 4 questions (3 from first set, 1 from second set)
        if (p4[0]?.questions) {
          p4[0].questions.forEach((q: any) => {
            sample.push({
              id: q.id,
              number: q.number,
              part: 'p4',
              partTitle: 'Part 4: Short Talks',
              text: q.text,
              image: p4[0].image,
              audioUrl: p4[0].audioUrl,
              options: q.options,
              correctAnswer: q.correctAnswer,
              transcript: p4[0].transcript,
              explanation: q.explanation,
            });
          });
        }
        if (p4[1]?.questions?.[0]) {
          const q = p4[1].questions[0];
          sample.push({
            id: q.id,
            number: q.number,
            part: 'p4',
            partTitle: 'Part 4: Short Talks',
            text: q.text,
            image: p4[1].image,
            audioUrl: p4[1].audioUrl,
            options: q.options,
            correctAnswer: q.correctAnswer,
            transcript: p4[1].transcript,
            explanation: q.explanation,
          });
        }

        // Part 5: 4 questions
        p5.slice(0, 4).forEach((q: any) => {
          sample.push({
            id: q.id,
            number: q.number,
            part: 'p5',
            partTitle: 'Part 5: Incomplete Sentences',
            text: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
          });
        });

        // Part 6: 4 questions from first passage
        if (p6[0]?.questions) {
          p6[0].questions.slice(0, 4).forEach((q: any) => {
            sample.push({
              id: q.id,
              number: q.number,
              part: 'p6',
              partTitle: 'Part 6: Text Completion',
              text: q.text,
              passageText: p6[0].content,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
            });
          });
        }

        // Part 7: 4 questions from first set
        if (p7[0]?.questions) {
          const combinedPassage = (p7[0].passages || [])
            .map((p: any) => p.content)
            .join('\n\n--- Passage Divider ---\n\n');

          p7[0].questions.slice(0, 4).forEach((q: any) => {
            sample.push({
              id: q.id,
              number: q.number,
              part: 'p7',
              partTitle: 'Part 7: Reading Comprehension',
              text: q.text,
              passageText: combinedPassage,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
            });
          });
        }

        setQuestions(sample);

        // Check if there was a previous diagnostic test result stored
        const savedResult = storage.get<DiagnosticResult | null>('toeic_diagnostic_result', null);
        if (savedResult) {
          setResult(savedResult);
        }
      } catch (err: any) {
        console.error('Error loading diagnostic test:', err);
        setError(err.message || 'Lỗi tải đề chẩn đoán.');
      } finally {
        setLoading(false);
      }
    };

    loadDiagnosticSet();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || loading || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted, loading, isPaused]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optKey: string) => {
    if (isSubmitted) return;
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.number]: optKey,
    }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    // Calculate score
    const partStats: Record<string, { total: number; correct: number }> = {
      p1: { total: 0, correct: 0 },
      p2: { total: 0, correct: 0 },
      p3: { total: 0, correct: 0 },
      p4: { total: 0, correct: 0 },
      p5: { total: 0, correct: 0 },
      p6: { total: 0, correct: 0 },
      p7: { total: 0, correct: 0 },
    };

    let correctLC = 0;
    let correctRC = 0;

    questions.forEach((q) => {
      const userAns = userAnswers[q.number];
      const isCorrect = userAns && userAns.toUpperCase() === q.correctAnswer.toUpperCase();

      partStats[q.part].total += 1;
      if (isCorrect) {
        partStats[q.part].correct += 1;
        if (['p1', 'p2', 'p3', 'p4'].includes(q.part)) {
          correctLC += 1;
        } else {
          correctRC += 1;
        }
      } else {
        // Diagnostic mode always uses ets2022_test1 currently
        addMistake(`exam_ets2022_test1_${q.part}_${q.id}`, {
          type: 'exam',
          testId: 'ets2022_test1',
          part: q.part,
          questionId: q.id
        });
      }
    });

    // 16 LC questions, 12 RC questions -> Equate to 100 questions scale
    const rawLC = Math.round((correctLC / 16) * 100);
    const rawRC = Math.round((correctRC / 12) * 100);

    const { scaledLC, scaledRC, totalScore } = calculateScaledScore(rawLC, rawRC);
    const cefrLevel = getCefrLevel(totalScore);

    const partScores: Record<string, PartScore> = {};
    Object.keys(partStats).forEach((pKey) => {
      const { total, correct } = partStats[pKey];
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      partScores[pKey] = { total, correct, accuracy };
    });

    const weakness = diagnoseWeakness(partScores);

    // Sort weakest parts by accuracy ascending
    const weakestPartsList = Object.entries(partScores)
      .sort((a, b) => a[1].accuracy - b[1].accuracy)
      .map(([partKey]) => partKey);

    const newResult: DiagnosticResult = {
      date: new Date().toISOString(),
      totalScore,
      scaledLC,
      scaledRC,
      cefrLevel,
      correctLC,
      correctRC,
      weakestPart: weakness,
      weakestPartsList,
      partScores,
    };

    storage.set('toeic_diagnostic_result', newResult);
    setResult(newResult);
    setIsSubmitted(true);
    setShowConfetti(true);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setTimeLeft(TOTAL_TIME);
    setIsSubmitted(false);
    setShowReview(false);
    setShowConfetti(false);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Đang chuẩn bị 28 câu hỏi chẩn đoán năng lực TOEIC...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <p>{error || 'Không tìm thấy câu hỏi chẩn đoán.'}</p>
          <Link href="/" className={styles.navBtn}>Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  // --- RESULT VIEW ---
  if (isSubmitted && result) {
    const answeredCount = Object.keys(userAnswers).length;

    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

        <div className={styles.resultsContainer}>
          <div className={styles.reportCard}>
            <span className={styles.badge}>KẾT QUẢ CHẨN ĐOÁN NĂNG LỰC</span>
            
            <div className={styles.scorePill}>
              <span className={styles.predictedScore}>{result.totalScore}</span>
              <span className={styles.scoreRange}>/ 990</span>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.95rem' }}>
              <span>Trình độ CEFR:</span>
              <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{result.cefrLevel}</span>
            </div>

            <div className={styles.sectionBreakdown}>
              <div className={styles.breakdownBox}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>LISTENING</span>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2563eb' }}>{result.scaledLC}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{result.correctLC}/16 câu đúng</span>
              </div>
              <div className={styles.breakdownBox}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>READING</span>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669' }}>{result.scaledRC}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{result.correctRC}/12 câu đúng</span>
              </div>
            </div>
          </div>

          {/* Weakness Diagnostic Alert */}
          <div className={styles.weaknessCard}>
            <span className={styles.weaknessBadge}>
              ⚠️ Điểm yếu cần cải thiện nhất
            </span>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
              {result.weakestPart.partName} (Độ chính xác: {result.weakestPart.accuracy}%)
            </h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.5 }}>
              {result.weakestPart.advice}
            </p>
          </div>

          {/* Part-by-Part Accuracy Breakdown */}
          <div className={styles.partBarsContainer}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
              Chi tiết độ chính xác 7 phần thi TOEIC
            </h3>
            {Object.entries(result.partScores).map(([pKey, pScore]) => {
              const partTitles: Record<string, string> = {
                p1: 'Part 1: Hình ảnh',
                p2: 'Part 2: Hỏi - Đáp',
                p3: 'Part 3: Hội thoại',
                p4: 'Part 4: Bài nói',
                p5: 'Part 5: Điền câu',
                p6: 'Part 6: Đoạn văn',
                p7: 'Part 7: Đọc hiểu',
              };

              return (
                <div key={pKey} className={styles.partBarRow}>
                  <div className={styles.partBarLabel}>{partTitles[pKey] || pKey}</div>
                  <div className={styles.partBarTrack}>
                    <div
                      className={styles.partBarProgress}
                      style={{
                        width: `${pScore.accuracy}%`,
                        backgroundColor: pScore.accuracy >= 75 ? '#22c55e' : pScore.accuracy >= 50 ? '#3b82f6' : '#f59e0b',
                      }}
                    />
                  </div>
                  <div className={styles.partBarScore}>
                    {pScore.correct}/{pScore.total} ({pScore.accuracy}%)
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to action: Study Plan */}
          <div className={styles.ctaBox}>
            <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>
              Bắt đầu lộ trình bứt phá điểm số mục tiêu!
            </h3>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem', maxWidth: '520px' }}>
              Hệ thống AI đã phân tích điểm mạnh & điểm yếu của bạn. Nhận kế hoạch ôn luyện chia theo ngày được thiết kế riêng.
            </p>
            <Link
              href={`/study-plan?fromDiagnostic=true&score=${result.totalScore}&weak=${result.weakestPartsList.join(',')}`}
              className={styles.planCTA}
            >
              <TargetIcon size={20} /> Tạo Lộ Trình Cá Nhân Hóa Ngay
            </Link>
          </div>

          {/* Buttons to Review or Retake */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowReview(!showReview)}
              className={styles.retakeBtn}
            >
              <CheckCircleIcon size={18} /> {showReview ? 'Ẩn xem lại đáp án' : 'Xem lại 28 câu & Giải thích'}
            </button>
            <button
              onClick={handleRetake}
              className={styles.retakeBtn}
            >
              <RotateCcwIcon size={18} /> Làm lại bài test
            </button>
          </div>

          {/* Review Questions Section */}
          {showReview && (
            <div className={styles.reviewSection}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                Chi tiết 28 câu hỏi ({answeredCount}/28 đã trả lời)
              </h3>

              {questions.map((q, idx) => {
                const userAns = userAnswers[q.number];
                const isCorrect = userAns && userAns.toUpperCase() === q.correctAnswer.toUpperCase();

                return (
                  <div
                    key={q.id}
                    className={`${styles.reviewCard} ${isCorrect ? styles.reviewCorrect : styles.reviewIncorrect}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                        Câu {idx + 1} (ETS #{q.number}) - {q.partTitle}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: isCorrect ? '#15803d' : '#b91c1c' }}>
                        {isCorrect ? '✓ Đúng' : `✗ Sai (Đã chọn: ${userAns || 'Chưa chọn'})`}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: 500, margin: '0.25rem 0' }}>
                      {q.text}
                    </div>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Đáp án đúng: <strong style={{ color: '#15803d' }}>{q.correctAnswer}</strong>
                      {q.options[q.correctAnswer] && ` - ${q.options[q.correctAnswer]}`}
                    </div>

                    {q.explanation && (
                      <div className={styles.explanationText}>
                        💡 <strong>Giải thích:</strong> {q.explanation}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setTutorContext({
                        partTitle: q.partTitle,
                        number: q.number,
                        text: q.text,
                        options: q.options,
                        correctAnswer: q.correctAnswer,
                        userAnswer: userAns,
                        transcript: q.transcript,
                        passageText: q.passageText,
                        explanation: q.explanation,
                        audioUrl: q.audioUrl,
                      })}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '0.4rem 0.9rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        width: 'fit-content',
                        marginTop: '0.5rem',
                        boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
                      }}
                    >
                      🤖 Hỏi Gia Sư AI 990 về câu này
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

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

  // --- RUNNING TEST VIEW ---
  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className={styles.container}>
      {/* Test Header */}
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.badge}>DIAGNOSTIC TEST</span>
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
            Câu {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className={styles.timer}>
          <ClockIcon size={18} />
          <span>{formatTime(timeLeft)}</span>
        </div>

        <button onClick={handleSubmit} className={styles.submitBtn}>
          Nộp bài ({answeredCount}/{questions.length})
        </button>
      </header>

      {/* Progress Bar */}
      <div className={styles.progressBarBg}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <main className={styles.card}>
        <div className={styles.metaRow}>
          <span className={styles.partTag}>{currentQ.partTitle}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            ETS #{currentQ.number}
          </span>
        </div>

        {/* Audio Player for Listening Parts */}
        {currentQ.audioUrl && (
          <div style={{ margin: '0.25rem 0' }}>
            <ListeningAudioPlayer
              key={currentQ.audioUrl}
              src={currentQ.audioUrl}
              title={`Bài nghe ${currentQ.partTitle}`}
            />
          </div>
        )}

        {/* Image for Part 1 or Visual Questions */}
        {currentQ.image && (
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentQ.image}
              alt="Question Illustration"
              className={styles.questionImage}
            />
          </div>
        )}

        {/* Reading Passage if Part 6 or 7 */}
        {currentQ.passageText && (
          <div className={styles.passageBox}>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
              {currentQ.passageText}
            </pre>
          </div>
        )}

        {/* Question Text */}
        <div className={styles.questionTitle}>
          {currentQ.text}
        </div>

        {/* Options List */}
        <div className={styles.optionsList}>
          {Object.entries(currentQ.options).map(([optKey, optVal]) => {
            const isSelected = userAnswers[currentQ.number] === optKey;
            return (
              <button
                key={optKey}
                type="button"
                onClick={() => handleSelectOption(optKey)}
                className={`${styles.optionItem} ${isSelected ? styles.selected : ''}`}
              >
                <div className={styles.optionLetter}>{optKey}</div>
                <div>{optVal}</div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className={styles.navRow}>
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className={styles.navBtn}
          >
            ← Câu trước
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              Hoàn thành bài test ✓
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className={styles.navBtn}
            >
              Câu tiếp theo →
            </button>
          )}
        </div>
      </main>

      {/* Quick Jump Navigator */}
      <div style={{
        background: 'var(--card)',
        padding: '1.25rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          DANH SÁCH 28 CÂU HỎI:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))', gap: '0.5rem' }}>
          {questions.map((q, idx) => {
            const isAnswered = !!userAnswers[q.number];
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                style={{
                  height: '36px',
                  borderRadius: '6px',
                  border: isCurrent ? '2px solid var(--primary)' : '1px solid var(--border)',
                  background: isAnswered ? 'var(--primary-light)' : 'var(--bg-secondary)',
                  color: isAnswered ? 'var(--primary)' : 'var(--foreground)',
                  fontWeight: isCurrent || isAnswered ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

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
