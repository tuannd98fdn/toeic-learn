'use client';

import { useState } from 'react';
import { HighScoreChallenge } from '@/schema/masterclass';
import { TargetIcon, HelpCircleIcon, CheckCircleIcon, ArrowRightIcon, SparklesIcon } from '@/components/icons/AppIcons';
import styles from './HighScoreChallengeCard.module.css';

interface HighScoreChallengeCardProps {
  questions: HighScoreChallenge[];
  onComplete?: () => void;
}

export default function HighScoreChallengeCard({ questions, onComplete }: HighScoreChallengeCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showClue, setShowClue] = useState(false);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const currentAnswer = selectedAnswers[currentIndex];
  const isAnswered = Boolean(currentAnswer);
  const isCorrect = currentAnswer === currentQ.correctAnswer;

  const handleSelectOption = (letter: string) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: letter
    }));
  };

  const handleNext = () => {
    setShowClue(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress & Meta Header */}
      <div className={styles.header}>
        <div className={styles.metaLeft}>
          <span className={styles.partBadge}>{currentQ.part}</span>
          <span className={styles.bandBadge}>Mục tiêu {currentQ.targetBand}</span>
          <span className={styles.trapBadge}>{currentQ.trapType}</span>
        </div>
        <div className={styles.stepIndicator}>
          Câu {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Question Card */}
      <div className={styles.questionCard}>
        <p className={styles.questionText}>{currentQ.question}</p>

        {/* Clue Hint Button */}
        {!isAnswered && (
          <div className={styles.clueArea}>
            <button
              type="button"
              className={styles.clueBtn}
              onClick={() => setShowClue(!showClue)}
            >
              <HelpCircleIcon size={16} />
              <span>{showClue ? 'Ẩn gợi ý tư duy' : 'Gợi ý manh mối tư duy (Clue Hint)'}</span>
            </button>
            {showClue && (
              <div className={styles.clueBox}>
                <span className={styles.clueLabel}>Manh mối suy luận:</span>
                <p className={styles.clueContent}>{currentQ.clueHint}</p>
              </div>
            )}
          </div>
        )}

        {/* Options Grid */}
        <div className={styles.optionsGrid}>
          {currentQ.options.map((opt) => {
            const letter = opt.trim().slice(0, 1);
            let btnClass = styles.optionBtn;

            if (isAnswered) {
              if (letter === currentQ.correctAnswer) {
                btnClass += ` ${styles.correctOption}`;
              } else if (letter === currentAnswer) {
                btnClass += ` ${styles.wrongOption}`;
              }
            } else if (letter === currentAnswer) {
              btnClass += ` ${styles.selectedOption}`;
            }

            return (
              <button
                key={opt}
                type="button"
                className={btnClass}
                onClick={() => handleSelectOption(letter)}
                disabled={isAnswered}
              >
                <span className={styles.optionLetter}>{letter}</span>
                <span className={styles.optionText}>{opt.slice(3)}</span>
                {isAnswered && letter === currentQ.correctAnswer && (
                  <CheckCircleIcon size={18} className={styles.checkIcon} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer Explanation & Syntax Visualizer */}
      {isAnswered && (
        <div className={styles.explanationSection}>
          <div className={styles.resultBanner} data-correct={isCorrect}>
            <span className={styles.resultIcon}>
              {isCorrect ? <CheckCircleIcon size={20} /> : <TargetIcon size={20} />}
            </span>
            <span className={styles.resultText}>
              {isCorrect
                ? 'Tuyệt vời! Bạn đã vượt qua bẫy câu hỏi điểm 850+'
                : `Chưa chính xác. Đáp án đúng là (${currentQ.correctAnswer}).`}
            </span>
          </div>

          {/* Syntax Visualizer */}
          {currentQ.syntaxBreakdown && (
            <div className={styles.syntaxCard}>
              <span className={styles.syntaxTitle}>
                <SparklesIcon size={16} />
                Phân Tích Cú Pháp Câu (Syntax Visualizer):
              </span>
              <div className={styles.syntaxGrid}>
                <div className={styles.syntaxPill} data-role="subject">
                  <span className={styles.pillLabel}>Chủ ngữ (S)</span>
                  <span className={styles.pillText}>{currentQ.syntaxBreakdown.subject}</span>
                </div>
                <div className={styles.syntaxPill} data-role="predicate">
                  <span className={styles.pillLabel}>Vị ngữ (V)</span>
                  <span className={styles.pillText}>{currentQ.syntaxBreakdown.predicate}</span>
                </div>
                <div className={styles.syntaxPill} data-role="object">
                  <span className={styles.pillLabel}>Tân ngữ / Thành phần</span>
                  <span className={styles.pillText}>{currentQ.syntaxBreakdown.objectOrComplement}</span>
                </div>
                <div className={styles.syntaxPill} data-role="target">
                  <span className={styles.pillLabel}>Vai trò chỗ trống</span>
                  <span className={styles.pillText}>{currentQ.syntaxBreakdown.targetModifier}</span>
                </div>
              </div>
            </div>
          )}

          {/* Pedagogical Explanation */}
          <div className={styles.pedagogicalCard}>
            <h5 className={styles.pedagogicalHeading}>Lời Giải Sư Phạm Chi Tiết:</h5>
            <div
              className={styles.pedagogicalBody}
              dangerouslySetInnerHTML={{ __html: currentQ.pedagogicalExplanation }}
            />
          </div>

          {/* Next Button */}
          <button type="button" className={styles.nextBtn} onClick={handleNext}>
            <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành thử thách 850+'}</span>
            <ArrowRightIcon size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
