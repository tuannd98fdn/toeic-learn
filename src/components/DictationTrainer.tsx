'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  TranscriptLine,
  diffWords,
  generateClozeBlanks,
  speakSentence,
  normalizeWord,
  WordDiffResult,
  ClozeBlankItem,
} from '@/utils/transcriptParser';
import { soundEffects } from '@/utils/soundEffects';
import {
  HeadphonesIcon,
  RotateCcwIcon,
  CheckCircleIcon,
  LightbulbIcon,
  VolumeIcon,
  ArrowRightIcon,
  AlertCircleIcon,
} from '@/components/icons/AppIcons';
import styles from './DictationTrainer.module.css';

interface DictationTrainerProps {
  lines: TranscriptLine[];
  audioUrl?: string;
  title?: string;
  onBackToStandard?: () => void;
  onComplete?: () => void;
}

export default function DictationTrainer({
  lines,
  title = 'Luyện nghe chép chính tả (Dictation)',
  onBackToStandard,
  onComplete,
}: DictationTrainerProps) {
  const [activeMode, setActiveMode] = useState<'cloze' | 'full'>('cloze');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Full Dictation State
  const [fullInput, setFullInput] = useState('');
  const [diffResult, setDiffResult] = useState<WordDiffResult | null>(null);

  // Cloze Blanks State
  const [clozeInputs, setClozeInputs] = useState<Record<string, string>>({});
  const [showClozeHints, setShowClozeHints] = useState(false);
  const [clozeChecked, setClozeChecked] = useState(false);

  const currentLine = lines[currentLineIndex] || lines[0] || null;

  // Generate Cloze blanks for current sentence
  const clozeItems: ClozeBlankItem[] = useMemo(() => {
    if (!currentLine) return [];
    return generateClozeBlanks(currentLine.text, 0.4);
  }, [currentLine]);

  // Reset inputs when switching sentence
  useEffect(() => {
    setFullInput('');
    setDiffResult(null);
    setClozeInputs({});
    setShowClozeHints(false);
    setClozeChecked(false);
  }, [currentLineIndex, activeMode]);

  const handleNextSentence = () => {
    if (currentLineIndex + 1 < lines.length) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  const handlePrevSentence = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex((prev) => prev - 1);
    }
  };

  const handlePlayLineAudio = () => {
    if (currentLine) {
      speakSentence(currentLine.text);
    }
  };

  // Full Dictation Check
  const handleCheckFullDictation = () => {
    if (!currentLine) return;
    const result = diffWords(currentLine.text, fullInput);
    setDiffResult(result);

    if (result.isPassed) {
      soundEffects.playCorrect();
    } else if (result.accuracy < 50) {
      soundEffects.playWrong();
    }
  };

  // Cloze Mode: Handle input change
  const handleClozeInputChange = (blankId: string, val: string) => {
    setClozeInputs((prev) => ({
      ...prev,
      [blankId]: val,
    }));
  };

  // Cloze Mode Check
  const handleCheckCloze = () => {
    if (!currentLine) return;
    setClozeChecked(true);

    const maskedItems = clozeItems.filter((item) => item.isMasked);
    const allCorrect = maskedItems.every((item) => {
      const userVal = normalizeWord(clozeInputs[item.id] || '');
      return userVal === item.cleanWord;
    });

    if (allCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
    }
  };

  // Cloze Mode: Auto reveal answers
  const handleRevealCloze = () => {
    const revealed: Record<string, string> = {};
    clozeItems.forEach((item) => {
      if (item.isMasked) {
        revealed[item.id] = item.cleanWord;
      }
    });
    setClozeInputs(revealed);
    setClozeChecked(true);
  };

  if (!currentLine) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Không tìm thấy nội dung bài nghe để chép chính tả.
        </div>
      </div>
    );
  }

  const isLastLine = currentLineIndex === lines.length - 1;

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <div className={styles.topBar}>
        <div className={styles.titleGroup}>
          <span className={styles.titleIcon}>
            <HeadphonesIcon size={20} />
          </span>
          <span className={styles.title}>{title}</span>
        </div>

        <div className={styles.modeToggleGroup}>
          <button
            type="button"
            className={`${styles.modeBtn} ${activeMode === 'cloze' ? styles.active : ''}`}
            onClick={() => setActiveMode('cloze')}
          >
            Điền từ khuyết (Cloze)
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${activeMode === 'full' ? styles.active : ''}`}
            onClick={() => setActiveMode('full')}
          >
            Chép cả câu (Full)
          </button>
        </div>
      </div>

      {/* Sentence Navigation */}
      {lines.length > 1 && (
        <div className={styles.lineNavigation}>
          <div className={styles.lineBadge}>
            <span className={styles.speakerTag}>
              {currentLine.speakerLabel || currentLine.speaker || 'Câu'}
            </span>
            <span>
              Câu {currentLineIndex + 1} / {lines.length}
            </span>
          </div>

          <div className={styles.navBtns}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handlePrevSentence}
              disabled={currentLineIndex === 0}
            >
              ← Câu trước
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handleNextSentence}
              disabled={isLastLine}
            >
              Câu tiếp →
            </button>
          </div>
        </div>
      )}

      {/* Dictation Working Area */}
      <div className={styles.dictationArea}>
        {activeMode === 'cloze' ? (
          // CLOZE BLANKS MODE
          <div className={styles.clozeSentenceBox}>
            {clozeItems.map((item) => {
              if (!item.isMasked) {
                return (
                  <span key={item.id} className={styles.clozeWordSpan}>
                    {item.originalWord}
                  </span>
                );
              }

              const userVal = clozeInputs[item.id] || '';
              const isMatch = normalizeWord(userVal) === item.cleanWord;
              const inputStateClass = clozeChecked
                ? isMatch
                  ? styles.correct
                  : styles.incorrect
                : '';

              return (
                <span key={item.id} className={styles.clozeWordSpan}>
                  <input
                    type="text"
                    className={`${styles.clozeInput} ${inputStateClass}`}
                    placeholder={
                      showClozeHints
                        ? `${item.hintLetter}...`
                        : `(${item.cleanWord.length} chữ)`
                    }
                    value={userVal}
                    onChange={(e) => handleClozeInputChange(item.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCheckCloze();
                    }}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </span>
              );
            })}
          </div>
        ) : (
          // FULL SENTENCE DICTATION MODE
          <textarea
            className={styles.fullTextarea}
            placeholder="Lắng nghe audio và gõ trọn vẹn câu thoại bạn nghe được vào đây..."
            value={fullInput}
            onChange={(e) => setFullInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCheckFullDictation();
              }
            }}
          />
        )}

        {/* Action Controls */}
        <div className={styles.actionRow}>
          <div className={styles.leftControls}>
            <button
              type="button"
              className={styles.audioAssistBtn}
              onClick={handlePlayLineAudio}
              title="Nghe phát âm chuẩn câu này"
            >
              <VolumeIcon size={16} />
              <span>Nghe câu này</span>
            </button>

            {activeMode === 'cloze' && (
              <>
                <button
                  type="button"
                  className={styles.hintBtn}
                  onClick={() => setShowClozeHints((prev) => !prev)}
                >
                  <LightbulbIcon size={16} />
                  <span>{showClozeHints ? 'Ẩn gợi ý' : 'Gợi ý chữ cái đầu'}</span>
                </button>

                <button
                  type="button"
                  className={styles.audioAssistBtn}
                  onClick={handleRevealCloze}
                >
                  <span>Hiện đáp án</span>
                </button>
              </>
            )}

            {activeMode === 'full' && (
              <button
                type="button"
                className={styles.hintBtn}
                onClick={() => {
                  const words = currentLine.text.split(' ');
                  const hintWords = words.slice(0, 3).join(' ');
                  setFullInput((prev) => (prev ? prev : hintWords + ' '));
                }}
              >
                <LightbulbIcon size={16} />
                <span>Gợi ý 3 từ đầu</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {activeMode === 'cloze' ? (
              <button
                type="button"
                className={styles.checkBtn}
                onClick={handleCheckCloze}
              >
                <CheckCircleIcon size={18} />
                <span>Kiểm tra từ điền</span>
              </button>
            ) : (
              <button
                type="button"
                className={styles.checkBtn}
                onClick={handleCheckFullDictation}
              >
                <CheckCircleIcon size={18} />
                <span>Kiểm tra chính tả</span>
              </button>
            )}

            {lines.length > 1 && (
              <button
                type="button"
                className={styles.checkBtn}
                style={{ background: 'var(--surface-hover)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                onClick={handleNextSentence}
              >
                <span>{isLastLine ? 'Hoàn thành' : 'Câu tiếp theo'}</span>
                <ArrowRightIcon size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Full Dictation Diff Evaluation */}
        {activeMode === 'full' && diffResult && (
          <div className={styles.feedbackCard}>
            <div className={styles.feedbackHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  className={`${styles.accuracyBadge} ${
                    diffResult.isPassed ? styles.passed : styles.failed
                  }`}
                >
                  {diffResult.isPassed ? (
                    <CheckCircleIcon size={16} />
                  ) : (
                    <AlertCircleIcon size={16} />
                  )}
                  Độ chính xác: {diffResult.accuracy}% ({diffResult.correctWords}/
                  {diffResult.totalWords} từ đúng)
                </span>
              </div>

              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {diffResult.isPassed
                  ? 'Tuyệt vời! Khả năng bắt âm của bạn rất tốt.'
                  : 'Hãy chú ý các từ bị thiếu (màu cam) hoặc sai âm đuôi/chính tả (gạch đỏ).'}
              </span>
            </div>

            <div className={styles.diffTokensContainer}>
              {diffResult.tokens.map((token, idx) => {
                if (token.status === 'correct') {
                  return (
                    <span key={idx} className={styles.tokenCorrect}>
                      {token.word}
                    </span>
                  );
                }
                if (token.status === 'incorrect') {
                  return (
                    <span
                      key={idx}
                      className={styles.tokenIncorrect}
                      title={`Kỳ vọng: ${token.expected}`}
                    >
                      {token.word} ({token.expected})
                    </span>
                  );
                }
                if (token.status === 'missing') {
                  return (
                    <span
                      key={idx}
                      className={styles.tokenMissing}
                      title="Từ này bị thiếu trong bài nghe"
                    >
                      [{token.word}]
                    </span>
                  );
                }
                return (
                  <span key={idx} className={styles.tokenExtra}>
                    {token.word}
                  </span>
                );
              })}
            </div>

            <div className={styles.targetSentenceRevealed}>
              <strong>Câu thoại chuẩn:</strong> {currentLine.text}
            </div>
          </div>
        )}

        {/* Cloze Evaluation Summary */}
        {activeMode === 'cloze' && clozeChecked && (
          <div className={styles.feedbackCard}>
            <div className={styles.feedbackHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {clozeItems
                  .filter((item) => item.isMasked)
                  .every(
                    (item) =>
                      normalizeWord(clozeInputs[item.id] || '') === item.cleanWord
                  ) ? (
                  <span className={`${styles.accuracyBadge} ${styles.passed}`}>
                    <CheckCircleIcon size={16} /> Hoàn hảo! Bạn đã điền chính xác tất cả các từ khuyết.
                  </span>
                ) : (
                  <span className={`${styles.accuracyBadge} ${styles.failed}`}>
                    <AlertCircleIcon size={16} /> Có từ chưa chính xác. Hãy quan sát ô viền đỏ hoặc bấm "Gợi ý chữ cái đầu".
                  </span>
                )}
              </div>
            </div>

            <div className={styles.targetSentenceRevealed}>
              <strong>Câu thoại hoàn chỉnh:</strong> {currentLine.text}
            </div>
          </div>
        )}
      </div>

      {onBackToStandard && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: 8 }}>
          <button
            type="button"
            className={styles.audioAssistBtn}
            onClick={onBackToStandard}
          >
            <RotateCcwIcon size={14} />
            <span>Quay lại làm bài trắc nghiệm ETS</span>
          </button>
        </div>
      )}
    </div>
  );
}
