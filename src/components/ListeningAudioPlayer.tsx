'use client';

import { useState, useRef, useEffect } from 'react';
import { BookIcon } from '@/components/icons/AppIcons';
import styles from './ListeningAudioPlayer.module.css';

interface ListeningAudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  title?: string;
  transcript?: string;
}

export default function ListeningAudioPlayer({
  src,
  autoPlay = false,
  onEnded,
  title = 'Audio bài nghe',
  transcript,
}: ListeningAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [pointA, setPointA] = useState<number | null>(null);
  const [pointB, setPointB] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  // When src changes, reset state and load new audio
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setPointA(null);
    setPointB(null);
    setShowTranscript(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      if (autoPlay) {
        window.dispatchEvent(new CustomEvent('audioPlay', { detail: { player: audioRef.current } }));
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.log('Autoplay prevented:', e));
      }
    }
  }, [src, autoPlay]);

  useEffect(() => {
    const handleOtherAudioPlay = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.player !== audioRef.current && isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('audioPlay', handleOtherAudioPlay);
    return () => {
      window.removeEventListener('audioPlay', handleOtherAudioPlay);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      window.dispatchEvent(new CustomEvent('audioPlay', { detail: { player: audioRef.current } }));
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error('Play error:', e));
    }
  };

  const handleRewind = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
  };

  const handleForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(duration || 0, audioRef.current.currentTime + 5);
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    setCurrentTime(current);

    // A-B Repeat Logic
    if (pointA !== null && pointB !== null && current >= pointB) {
      audioRef.current.currentTime = pointA;
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleABRepeat = () => {
    if (pointA === null) {
      setPointA(currentTime);
    } else if (pointB === null) {
      if (currentTime > pointA + 0.5) { // Minimum 0.5s gap
        setPointB(currentTime);
        // Automatically jump back to A to start looping
        if (audioRef.current) {
          audioRef.current.currentTime = pointA;
        }
      } else {
        setPointA(currentTime); // Reset A if clicked too soon
      }
    } else {
      setPointA(null);
      setPointB(null);
    }
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnded) onEnded();
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={styles.playerContainer}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          <div className={`${styles.audioWave} ${!isPlaying ? styles.paused : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>{title}</span>
        </div>

        <div className={styles.speedGroup}>
          {[0.75, 1.0, 1.25, 1.5].map((rate) => (
            <button
              key={rate}
              type="button"
              className={`${styles.speedBtn} ${playbackRate === rate ? styles.active : ''}`}
              onClick={() => handleSpeedChange(rate)}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.mainBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"></rect>
              <rect x="14" y="4" width="4" height="16" rx="1"></rect>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
          )}
        </button>

        <button
          type="button"
          className={styles.rewindBtn}
          onClick={handleRewind}
          title="Lùi lại 5 giây"
          aria-label="Rewind 5 seconds"
        >
          -5s
        </button>

        <button
          type="button"
          className={styles.rewindBtn}
          onClick={handleForward}
          title="Tua tới 5 giây"
          aria-label="Forward 5 seconds"
        >
          +5s
        </button>

        <button
          type="button"
          className={`${styles.abBtn} ${pointA !== null && pointB === null ? styles.active : ''} ${pointA !== null && pointB !== null ? styles.looping : ''}`}
          onClick={handleABRepeat}
          title="Lặp đoạn A-B (Shadowing)"
          aria-label="A-B Repeat"
        >
          {pointA !== null && pointB !== null ? 'A-B' : pointA !== null ? 'A-' : 'A-B'}
        </button>

        <div className={styles.progressContainer}>
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className={styles.progressBar}
            aria-label="Audio progress"
          />
          <div className={styles.timeRow}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {transcript && (
        <div className={styles.transcriptSection}>
          <button
            type="button"
            className={styles.transcriptToggleBtn}
            onClick={() => setShowTranscript(prev => !prev)}
          >
            <BookIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            <span>{showTranscript ? 'Ẩn Transcript bài nghe' : 'Xem Transcript & Lời thoại'}</span>
          </button>
          {showTranscript && (
            <div 
              className={styles.transcriptContent}
              dangerouslySetInnerHTML={{ __html: transcript }}
            />
          )}
        </div>
      )}
    </div>
  );
}
