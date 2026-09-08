'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Part3Set, Part3DataSchema } from '@/schema/toeic';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import Confetti from '@/components/Confetti';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import PracticeFooter from '@/components/PracticeFooter';
import styles from './page.module.css';

export default function Part3Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải Part 3 Conversations...</div>}>
      <Part3Trainer />
    </Suspense>
  );
}

function Part3Trainer() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('test') || 'ets2022_test1';

  const [sets, setSets] = useState<Part3Set[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  // Track selected answer per question id: { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSetScore, setCurrentSetScore] = useState(0);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  const { addMistake } = useMistakeNotebook();

  useEffect(() => {
    const fetchPart3 = async () => {
      try {
        setLoading(true);
        const match = testId.match(/ets(\d+)_test(\d+)/);
        if (!match) throw new Error('Invalid test ID format');

        const res = await fetch(`/data/ets${match[1]}/test${match[2]}/part3.json`);
        if (!res.ok) throw new Error('Không thể tải dữ liệu Part 3');

        const data = await res.json();
        const validated = Part3DataSchema.parse(data);
        setSets(validated);
      } catch (err: any) {
        console.error('Error loading Part 3:', err);
        setError(err.message || 'Lỗi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchPart3();
  }, [testId]);

  if (loading) {
    return <div className={styles.loading}>Đang nạp đề Part 3 Conversations...</div>;
  }

  if (error || sets.length === 0) {
    return (
      <div className={styles.errorState}>
        <p>⚠️ {error || 'Không tìm thấy bài nghe Part 3 nào.'}</p>
        <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
      </div>
    );
  }

  const currentSet = sets[currentSetIndex];
  const allQuestionsCount = sets.reduce((acc, s) => acc + s.questions.length, 0);

  const handleSelectOption = (questionId: string, letter: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: letter,
    }));
  };

  const isAllAnsweredInSet = currentSet.questions.every((q) => selectedAnswers[q.id]);

  const handleSubmitSet = () => {
    if (!isAllAnsweredInSet || isSubmitted) return;
    setIsSubmitted(true);

    let setScore = 0;
    currentSet.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        setScore++;
      } else {
        addMistake(`exam_${testId}_part3_${q.id}`, {
          type: 'exam',
          testId: testId,
          part: 'part3',
          questionId: q.id
        });
      }
    });

    setCurrentSetScore(setScore);
    setTotalScore((prev) => prev + setScore);
  };

  const handleNextSet = () => {
    if (currentSetIndex + 1 < sets.length) {
      setCurrentSetIndex((prev) => prev + 1);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setShowTranscript(false);
    } else {
      setIsFinished(true);
      if ((totalScore / allQuestionsCount) >= 0.7) {
        setShowConfetti(true);
      }
    }
  };

  const handleRestart = () => {
    setCurrentSetIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowTranscript(false);
    setTotalScore(0);
    setIsFinished(false);
    setShowConfetti(false);
  };

  if (isFinished) {
    const percentage = Math.round((totalScore / allQuestionsCount) * 100);
    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />
        <div className={styles.resultsCard}>
          <span className={styles.resultsIcon}>{percentage >= 70 ? '🎉' : '📚'}</span>
          <h1 className={styles.resultsTitle}>Hoàn thành Part 3 Conversations!</h1>
          <div className={styles.scoreBanner}>
            Kết quả: {totalScore} / {allQuestionsCount} ({percentage}%)
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px' }}>
            {percentage >= 80
              ? 'Khả năng đọc trước câu hỏi và bắt thông tin chi tiết qua đối thoại của bạn rất tốt!'
              : 'Hãy luyện tập đọc lướt 3 câu hỏi trước khi audio phát để định vị từ khóa quan trọng!'}
          </p>

          <div className={styles.resultsActions}>
            <button onClick={handleRestart} className={styles.submitBtn}>Làm lại đề này 🔄</button>
            <Link href="/" className={styles.secondaryBtn}>Về Dashboard 🏠</Link>
          </div>
        </div>
      </div>
    );
  }

  const firstQNum = currentSet.questions[0]?.number;
  const lastQNum = currentSet.questions[currentSet.questions.length - 1]?.number;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.navRow}>
          <Link href="/" className={styles.backLink}>← Về Dashboard</Link>
          <span className={styles.testBadge}>{testId.toUpperCase()}</span>
        </div>

        <div className={styles.progressInfo}>
          <span>Part 3: Short Conversations (Hội thoại ngắn)</span>
          <span>Set {currentSetIndex + 1} / {sets.length} (Câu {firstQNum} - {lastQNum})</span>
        </div>

        <div className={styles.progressBarBg}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${((currentSetIndex + 1) / sets.length) * 100}%` }}
          />
        </div>
      </header>

      <div className={styles.card}>
        {currentSet.context && (
          <div className={styles.contextBanner}>
            📌 {currentSet.context}
          </div>
        )}

        {currentSet.image && (
          <div className={styles.graphicWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentSet.image}
              alt={`TOEIC Part 3 Graphic for questions ${firstQNum}-${lastQNum}`}
              className={styles.graphicImage}
            />
          </div>
        )}

        <div style={{ padding: '0.8rem', backgroundColor: 'var(--warning-light, #fff8e1)', borderLeft: '4px solid #ffc107', borderRadius: '4px', marginBottom: '1rem', color: '#555', fontSize: '0.9rem' }}>
          <strong>Mẹo:</strong> Hãy dành 8-10 giây đọc lướt 3 câu hỏi dưới đây trước khi bấm nút Play audio!
        </div>

        <ListeningAudioPlayer
          src={currentSet.audioUrl}
          title={`Audio Hội thoại (Câu ${firstQNum} - ${lastQNum})`}
          autoPlay={false}
        />

        <div className={styles.questionsList}>
          {currentSet.questions.map((q) => {
            const userChoice = selectedAnswers[q.id];

            return (
              <div key={q.id} className={styles.questionItem}>
                <div className={styles.questionTitle}>
                  <span className={styles.qNumber}>#{q.number}.</span>
                  <span>{q.text}</span>
                </div>

                <div className={styles.optionsCol}>
                  {['A', 'B', 'C', 'D'].map((letter) => {
                    let stateClass = '';
                    if (isSubmitted) {
                      if (letter === q.correctAnswer) stateClass = styles.correct;
                      else if (letter === userChoice) stateClass = styles.incorrect;
                    } else if (userChoice === letter) {
                      stateClass = styles.selected;
                    }

                    return (
                      <button
                        key={letter}
                        type="button"
                        className={`${styles.optionBtn} ${stateClass}`}
                        onClick={() => handleSelectOption(q.id, letter)}
                        disabled={isSubmitted}
                      >
                        <span className={styles.optionLetter}>{letter}</span>
                        <span>{q.options[letter] || `Option (${letter})`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!isSubmitted ? (
          <div className={styles.actionRow}>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmitSet}
              disabled={!isAllAnsweredInSet}
            >
              Nộp bài Set này ({Object.keys(selectedAnswers).length}/{currentSet.questions.length} câu) ➔
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              type="button"
              className={styles.secondaryBtn}
              style={{ alignSelf: 'flex-start', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              onClick={() => setShowTranscript((prev) => !prev)}
            >
              {showTranscript ? 'Ẩn Transcript' : 'Xem Transcript hội thoại'}
            </button>

            {showTranscript && currentSet.transcript && (
              <div className={styles.transcriptCard}>
                <div className={styles.transcriptHeader}>
                  <span>Lời thoại hội thoại</span>
                </div>
                <div
                  className={styles.transcriptBody}
                  dangerouslySetInnerHTML={{ __html: currentSet.transcript }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <PracticeFooter
        isAnswered={isSubmitted}
        isCorrect={currentSetScore === currentSet.questions.length}
        correctMessage={`Xuất sắc! Bạn trả lời đúng cả ${currentSet.questions.length} câu.`}
        incorrectMessage={`Bạn trả lời đúng ${currentSetScore}/${currentSet.questions.length} câu.`}
        onNext={handleNextSet}
        onAITutor={() => setTutorContext({
          partTitle: 'Part 3: Short Conversations',
          number: firstQNum || 0,
          text: `Context: ${currentSet.context || 'Conversation'}. Questions: ${firstQNum}-${lastQNum}`,
          options: { A: 'See full set details in transcript' },
          correctAnswer: 'A',
          transcript: currentSet.transcript,
          audioUrl: currentSet.audioUrl,
        })}
        nextLabel={currentSetIndex + 1 === sets.length ? 'Xem tổng kết 🎉' : 'Set tiếp theo ➔'}
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
