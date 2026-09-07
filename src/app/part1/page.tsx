'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Part1Question, Part1DataSchema } from '@/schema/toeic';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import Confetti from '@/components/Confetti';
import { 
  HeadphonesIcon,
  AwardIcon,
  ThumbsUpIcon,
  RotateCcwIcon,
  HomeIcon,
  EyeIcon,
  LightbulbIcon,
  FileTextIcon,
} from '@/components/icons/AppIcons';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import PracticeFooter from '@/components/PracticeFooter';
import styles from './page.module.css';

export default function Part1Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải Part 1 Photographs...</div>}>
      <Part1Trainer />
    </Suspense>
  );
}

function Part1Trainer() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('test') || 'ets2022_test1';

  const [questions, setQuestions] = useState<Part1Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  const { addMistake } = useMistakeNotebook();

  useEffect(() => {
    const fetchPart1 = async () => {
      try {
        setLoading(true);
        const match = testId.match(/ets(\d+)_test(\d+)/);
        if (!match) throw new Error('Invalid test ID format');

        const res = await fetch(`/data/ets${match[1]}/test${match[2]}/part1.json`);
        if (!res.ok) throw new Error('Không thể tải dữ liệu Part 1');

        const data = await res.json();
        const validated = Part1DataSchema.parse(data);
        setQuestions(validated);
      } catch (err: any) {
        console.error('Error loading Part 1:', err);
        setError(err.message || 'Lỗi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchPart1();
  }, [testId]);

  if (loading) {
    return <div className={styles.loading}>Đang nạp đề Part 1 Photographs... <HeadphonesIcon size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} /></div>;
  }

  if (error || questions.length === 0) {
    return (
      <div className={styles.errorState}>
        <p>⚠️ {error || 'Không tìm thấy câu hỏi Part 1 nào.'}</p>
        <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleSelectOption = (letter: string) => {
    if (isAnswered) return;
    setSelectedAnswer(letter);
    setIsAnswered(true);

    const isCorrect = letter === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      addMistake(`exam_${testId}_part1_${currentQ.id}`, {
        type: 'exam',
        testId: testId,
        part: 'part1',
        questionId: currentQ.id
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowTranscript(false);
    } else {
      setIsFinished(true);
      if ((score / questions.length) >= 0.7) {
        setShowConfetti(true);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowTranscript(false);
    setScore(0);
    setIsFinished(false);
    setShowConfetti(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />
        <div className={styles.resultsCard}>
          <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
          <h2>Kết quả Part 1</h2>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreText}>{score}/{questions.length}</span>
          </div>
          <p className={styles.feedback}>
            {percentage >= 80 ? 'Tuyệt vời! Bạn có kỹ năng quan sát rất nhạy bén.' :
             percentage >= 50 ? 'Khá tốt! Hãy chú ý kỹ hơn vào các chi tiết nhỏ trong hình nhé.' :
             'Đừng nản chí! Nghe nhiều sẽ giúp bạn quen với các từ vựng mô tả hình ảnh.'}
          </p>
          <div className={styles.actions}>
            <button onClick={handleRestart} className={styles.nextBtn}>
              Làm lại đề này <RotateCcwIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
            </button>
            <Link href="/" className={styles.secondaryBtn}>
              Về Dashboard <HomeIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
            </Link>
          </div>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.navRow}>
          <Link href="/" className={styles.backLink}>← Về Dashboard</Link>
          <span className={styles.testBadge}>{testId.toUpperCase()}</span>
        </div>

        <div className={styles.progressInfo}>
          <span>Part 1: Photographs</span>
          <span>Câu {currentIndex + 1} / {questions.length}</span>
        </div>

        <div className={styles.progressBarBg}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      <div className={styles.card}>
        {currentQ.image && (
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentQ.image}
              alt={`TOEIC Part 1 - Question ${currentQ.number}`}
              className={styles.questionImage}
              loading="eager"
            />
          </div>
        )}

        <ListeningAudioPlayer
          src={currentQ.audioUrl}
          title={`Audio Câu ${currentQ.number}`}
          autoPlay={true}
        />

        <div className={styles.optionsGrid}>
          {['A', 'B', 'C', 'D'].map((letter) => {
            let stateClass = '';
            if (isAnswered) {
              if (letter === currentQ.correctAnswer) stateClass = styles.correct;
              else if (letter === selectedAnswer) stateClass = styles.incorrect;
            } else if (selectedAnswer === letter) {
              stateClass = styles.selected;
            }

            return (
              <button
                key={letter}
                type="button"
                className={`${styles.optionBtn} ${stateClass}`}
                onClick={() => handleSelectOption(letter)}
                disabled={isAnswered}
              >
                <span className={styles.optionLetter}>{letter}</span>
                <span>{currentQ.options[letter] || `Option (${letter})`}</span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              type="button"
              className={styles.secondaryBtn}
              style={{ alignSelf: 'flex-start', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              onClick={() => setShowTranscript((prev) => !prev)}
            >
                  {showTranscript ? (
                    <><EyeIcon size={16} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} /> Ẩn Transcript</>
                  ) : (
                    <><LightbulbIcon size={16} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} /> Xem Transcript & Lời giải</>
                  )}
            </button>

            {showTranscript && currentQ.transcript && (
              <div className={styles.transcriptCard}>
                <div className={styles.transcriptHeader}>
                  <FileTextIcon size={16} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} />
                  <span>Transcript & Đáp án</span>
                  <span style={{ color: 'var(--success)', fontWeight: 700 }}>
                    Đáp án đúng: ({currentQ.correctAnswer})
                  </span>
                </div>
                <div
                  className={styles.transcriptBody}
                  dangerouslySetInnerHTML={{ __html: currentQ.transcript }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <PracticeFooter
        isAnswered={isAnswered}
        isCorrect={selectedAnswer === currentQ.correctAnswer}
        correctMessage="Phản xạ nghe rất tốt!"
        incorrectMessage={`Đáp án đúng là (${currentQ.correctAnswer})`}
        onNext={handleNext}
        onAITutor={() => setTutorContext({
          partTitle: 'Part 1: Photographs',
          number: currentQ.number,
          text: 'Look at the photograph and choose the statement that best describes what you see.',
          options: currentQ.options,
          correctAnswer: currentQ.correctAnswer,
          userAnswer: selectedAnswer || undefined,
          transcript: currentQ.transcript,
          audioUrl: currentQ.audioUrl,
        })}
        nextLabel={currentIndex + 1 === questions.length ? 'Xem kết quả' : 'Câu tiếp theo ➔'}
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
