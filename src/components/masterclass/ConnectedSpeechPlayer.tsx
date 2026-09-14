'use client';

import { useState, useRef, useEffect } from 'react';
import { ConnectedSpeechLesson, WordAlignmentItem } from '@/schema/masterclass';
import {
  HeadphonesIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  VolumeIcon,
  SlidersIcon,
  LightbulbIcon,
} from '@/components/icons/AppIcons';
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
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio on unmount or lesson change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lesson.id]);

  const playAudioFile = (audioUrl: string, rate: number) => {
    // If audio is currently playing the same rate, pause it
    if (audioRef.current && isPlaying && playbackRate === rate) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setPlaybackRate(rate);

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      // Fallback to Web Speech API if audio file fails
      playSystemFallback(rate);
    };

    audio.play().catch(() => {
      playSystemFallback(rate);
    });
  };

  const playSystemFallback = (rate: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(lesson.audioSimulatedText);
    utterance.rate = rate;

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
    if (lesson.audioNormalUrl) {
      playAudioFile(lesson.audioNormalUrl, 1.0);
    } else {
      setPlaybackRate(1.0);
      playSystemFallback(1.0);
    }
  };

  const handlePlaySlow = () => {
    if (lesson.audioSlowUrl) {
      playAudioFile(lesson.audioSlowUrl, 0.75);
    } else {
      setPlaybackRate(0.75);
      playSystemFallback(0.75);
    }
  };

  const playIsolatedWord = (word: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;

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

    window.speechSynthesis.speak(utterance);
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

        <div className={styles.studioBadge}>
          <span className={styles.pulsingDot} />
          <span>Giọng Bản Xứ Chuẩn ETS (Studio HD)</span>
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

        {/* Studio Audio Controls */}
        <div className={styles.audioControls}>
          <button
            type="button"
            className={`${styles.playBtn} ${playbackRate === 1.0 && isPlaying ? styles.activePlay : ''}`}
            onClick={handlePlayNormal}
            title="Nghe tốc độ chuẩn ETS (1.0x)"
          >
            {playbackRate === 1.0 && isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
            <span>Nghe chuẩn 1.0x</span>
          </button>
          <button
            type="button"
            className={`${styles.playSlowBtn} ${playbackRate === 0.75 && isPlaying ? styles.activePlay : ''}`}
            onClick={handlePlaySlow}
            title="Nghe chậm bóc tách âm (0.75x)"
          >
            {playbackRate === 0.75 && isPlaying ? <PauseIcon size={16} /> : <VolumeIcon size={16} />}
            <span>Nghe chậm 0.75x (Bóc tách âm)</span>
          </button>

          <span className={styles.audioStatusInfo}>
            {isPlaying ? (playbackRate === 1.0 ? 'Đang phát: 1.0x chuẩn bản xứ' : 'Đang phát: 0.75x bóc tách âm') : 'Tốc độ studio HD'}
          </span>
        </div>
      </div>

      {/* Word-by-Word Acoustic Alignment Interactive Grid */}
      {lesson.wordAlignments && lesson.wordAlignments.length > 0 && (
        <div className={styles.alignmentSection}>
          <div className={styles.alignmentHeader}>
            <div className={styles.alignmentTitleGroup}>
              <SlidersIcon size={16} />
              <span>Bóc Tách Âm Học Đối Chiếu: Chữ Viết vs Phiên Âm Thực Tế</span>
            </div>
            <span className={styles.alignmentHint}>Chạm vào từng từ để xem phân tích âm học</span>
          </div>

          <div className={styles.wordPillsContainer}>
            {lesson.wordAlignments.map((w: WordAlignmentItem, idx: number) => {
              const isSelected = activeWordIndex === idx;
              let pillClass = styles.wordPill;
              if (w.isKeyPhenomenon) pillClass += ` ${styles.keyWordPill}`;
              if (isSelected) pillClass += ` ${styles.activeWordPill}`;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveWordIndex(isSelected ? null : idx)}
                  className={pillClass}
                  title={`Xem hiện tượng âm học của từ "${w.word}"`}
                >
                  <span className={styles.writtenWord}>{w.word}</span>
                  <span className={styles.ipaWord}>{w.ipa}</span>
                  {w.isKeyPhenomenon && (
                    <span className={styles.keyBadge}>Trọng tâm</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Word Deep-dive Box */}
          {activeWordIndex !== null && lesson.wordAlignments[activeWordIndex] && (
            <div className={styles.activeWordDetailBox}>
              <div className={styles.activeWordTop}>
                <div className={styles.activeWordMeta}>
                  <span className={styles.activeWordTitle}>
                    &ldquo;{lesson.wordAlignments[activeWordIndex].word}&rdquo;
                  </span>
                  <span className={styles.activeWordIpa}>
                    {lesson.wordAlignments[activeWordIndex].ipa}
                  </span>
                  {lesson.wordAlignments[activeWordIndex].isKeyPhenomenon && (
                    <span className={styles.phenomenonHighlightTag}>Hiện tượng biến âm trọng tâm ETS</span>
                  )}
                </div>

                <button
                  type="button"
                  className={styles.playWordBtn}
                  onClick={() => playIsolatedWord(lesson.wordAlignments![activeWordIndex].word)}
                  title="Nghe phát âm từ này"
                >
                  <VolumeIcon size={14} />
                  <span>Nghe từ này</span>
                </button>
              </div>

              <p className={styles.activeWordNote}>
                {lesson.wordAlignments[activeWordIndex].phenomenonNote ||
                  'Từ vựng trong chuỗi câu phát âm tự nhiên của người bản xứ.'}
              </p>
            </div>
          )}
        </div>
      )}

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
