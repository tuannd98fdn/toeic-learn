'use client';

import { useState } from 'react';
import { ConnectedSpeechLesson } from '@/schema/masterclass';
import { HeadphonesIcon, PlayIcon, CheckCircleIcon, VolumeIcon } from '@/components/icons/AppIcons';
import styles from './ConnectedSpeechPlayer.module.css';

interface ConnectedSpeechPlayerProps {
  lesson: ConnectedSpeechLesson;
  onCompleted?: () => void;
}

export default function ConnectedSpeechPlayer({ lesson, onCompleted }: ConnectedSpeechPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const playAudio = (rate: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(lesson.audioSimulatedText);
    utterance.rate = rate;

    // Pick voice by accent if available
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;
    if (lesson.accent === 'British') {
      selectedVoice = voices.find((v) => v.lang.includes('en-GB') || v.name.includes('UK') || v.name.includes('British'));
    } else if (lesson.accent === 'Australian') {
      selectedVoice = voices.find((v) => v.lang.includes('en-AU') || v.name.includes('Australia'));
    } else {
      selectedVoice = voices.find((v) => v.lang.includes('en-US') || v.name.includes('US'));
    }
    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayNormal = () => {
    setPlaybackRate(1.0);
    playAudio(1.0);
  };

  const handlePlaySlow = () => {
    setPlaybackRate(0.75);
    playAudio(0.75);
  };

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);
    if (idx === lesson.drillQuestion.correctIndex && onCompleted) {
      onCompleted();
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Banner */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.accentBadge}>
            <HeadphonesIcon size={16} />
            <span>Giọng {lesson.accent}</span>
          </div>
          <span className={styles.phenomenonTag}>{lesson.phoneticPhenomenon}</span>
        </div>
      </div>

      <h3 className={styles.lessonTitle}>{lesson.title}</h3>

      {/* Acoustic Wave & Transcription Card */}
      <div className={styles.acousticCard}>
        <div className={styles.transcriptionRow}>
          <div className={styles.scriptBlock}>
            <span className={styles.blockLabel}>Chữ Viết Trong Đề ETS:</span>
            <p className={styles.writtenText}>&ldquo;{lesson.writtenSentence}&rdquo;</p>
          </div>
          <div className={styles.phoneticBlock}>
            <span className={styles.blockLabel}>Âm Thanh Thực Tế Phát Ra (Phonetics):</span>
            <p className={styles.spokenIpa}>{lesson.spokenTranscription}</p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className={styles.audioControls}>
          <button
            type="button"
            className={`${styles.playBtn} ${playbackRate === 1.0 && isPlaying ? styles.activePlay : ''}`}
            onClick={handlePlayNormal}
            title="Nghe tốc độ chuẩn ETS (1.0x)"
          >
            <PlayIcon size={16} />
            <span>Nghe chuẩn 1.0x</span>
          </button>
          <button
            type="button"
            className={`${styles.playSlowBtn} ${playbackRate === 0.75 && isPlaying ? styles.activePlay : ''}`}
            onClick={handlePlaySlow}
            title="Nghe chậm bóc tách âm (0.75x)"
          >
            <VolumeIcon size={16} />
            <span>Nghe chậm 0.75x (Bóc tách âm)</span>
          </button>
        </div>
      </div>

      {/* Pedagogical Explanation */}
      <div className={styles.explanationBox}>
        <h4 className={styles.explanationTitle}>Cơ chế âm học &amp; Bẫy đề ETS:</h4>
        <p className={styles.explanationText}>{lesson.explanation}</p>
      </div>

      {/* Interactive Quick Drill */}
      <div className={styles.drillBox}>
        <div className={styles.drillHeader}>
          <span className={styles.drillBadge}>Kiểm Tra Phản Xạ Nghe</span>
          <span className={styles.drillQuestionText}>{lesson.drillQuestion.question}</span>
        </div>

        <div className={styles.optionsList}>
          {lesson.drillQuestion.options.map((opt, idx) => {
            const isCorrect = idx === lesson.drillQuestion.correctIndex;
            const isSelected = selectedOption === idx;
            let btnClass = styles.optionBtn;

            if (isSubmitted) {
              if (isCorrect) btnClass += ` ${styles.correctOption}`;
              else if (isSelected) btnClass += ` ${styles.wrongOption}`;
            } else if (isSelected) {
              btnClass += ` ${styles.selectedOption}`;
            }

            return (
              <button
                key={opt}
                type="button"
                className={btnClass}
                onClick={() => handleSelectOption(idx)}
                disabled={isSubmitted}
              >
                <span>{opt}</span>
                {isSubmitted && isCorrect && <CheckCircleIcon size={16} className={styles.checkIcon} />}
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div className={styles.drillFeedback}>
            <p className={styles.drillExplanation}>{lesson.drillQuestion.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
