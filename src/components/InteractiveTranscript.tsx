'use client';

import React, { useMemo, useState } from 'react';
import {
  parseTranscript,
  speakSentence,
  TranscriptLine
} from '@/utils/transcriptParser';
import {
  FileTextIcon,
  CheckCircleIcon,
  VolumeIcon,
  HeadphonesIcon,
  LightbulbIcon
} from '@/components/icons/AppIcons';
import styles from './InteractiveTranscript.module.css';

interface InteractiveTranscriptProps {
  transcriptHtml?: string;
  part: 'part1' | 'part2' | 'part3' | 'part4';
  correctAnswer?: string;
  title?: string;
  onStartDictation?: () => void;
  explanationHtml?: string;
}

export default function InteractiveTranscript({
  transcriptHtml = '',
  part,
  correctAnswer,
  title = 'Lời thoại tương tác (Interactive Transcript)',
  onStartDictation,
  explanationHtml,
}: InteractiveTranscriptProps) {
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  const lines: TranscriptLine[] = useMemo(() => {
    return parseTranscript(transcriptHtml, part, correctAnswer);
  }, [transcriptHtml, part, correctAnswer]);

  const handleSpeakLine = (line: TranscriptLine) => {
    setActiveSpeakingId(line.id);
    speakSentence(line.text);
    setTimeout(() => {
      setActiveSpeakingId((prev) => (prev === line.id ? null : prev));
    }, 2500);
  };

  const handleSpeakWord = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    speakSentence(word);
  };

  const getSpeakerClass = (speaker?: string) => {
    if (!speaker) return styles.option;
    const s = speaker.toUpperCase();
    if (s.startsWith('W')) return styles.woman;
    if (s.startsWith('M')) return styles.man;
    if (s === 'Q') return styles.prompt;
    return styles.option;
  };

  if (!transcriptHtml || lines.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <span className={styles.titleIcon}>
            <FileTextIcon size={18} />
          </span>
          <span className={styles.titleText}>{title}</span>
        </div>

        {onStartDictation && (
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.dictateBtn}
              onClick={onStartDictation}
            >
              <HeadphonesIcon size={16} />
              <span>Chép chính tả bài này</span>
            </button>
          </div>
        )}
      </div>

      <div className={styles.linesList}>
        {lines.map((line) => (
          <div
            key={line.id}
            className={`${styles.lineItem} ${line.isCorrect ? styles.isCorrect : ''}`}
          >
            <div className={lineTopClass(styles, line)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  className={`${styles.speakerBadge} ${getSpeakerClass(line.speaker)}`}
                >
                  {line.speakerLabel || line.speaker}
                </span>
                {line.isCorrect && (
                  <span className={styles.correctTag}>
                    <CheckCircleIcon size={14} /> Đáp án đúng
                  </span>
                )}
              </div>
            </div>

            <div className={styles.lineContentRow}>
              <div className={styles.lineText}>
                {line.text.split(' ').map((word, wIdx) => (
                  <React.Fragment key={wIdx}>
                    <span
                      className={styles.clickableWord}
                      onClick={(e) => handleSpeakWord(e, word)}
                      title="Click để nghe phát âm từ này"
                    >
                      {word}
                    </span>{' '}
                  </React.Fragment>
                ))}
              </div>

              <button
                type="button"
                className={styles.lineAudioBtn}
                onClick={() => handleSpeakLine(line)}
                title="Nghe phát âm chuẩn câu này"
                aria-label="Play pronunciation for this line"
                style={
                  activeSpeakingId === line.id
                    ? { color: 'var(--primary)', borderColor: 'var(--primary)' }
                    : {}
                }
              >
                <VolumeIcon size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {explanationHtml && explanationHtml !== transcriptHtml && (
        <div style={{ marginTop: '1rem', padding: '14px 18px', borderRadius: 12, backgroundColor: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)' }}>
            <LightbulbIcon size={16} /> Lời giải chi tiết
          </div>
          <div
            style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--foreground)' }}
            dangerouslySetInnerHTML={{ __html: explanationHtml }}
          />
        </div>
      )}

      <div className={styles.hintNote}>
        <LightbulbIcon size={14} style={{ color: 'var(--warning, #f59e0b)' }} />
        <span>
          Mẹo âm học: Click vào từng từ bất kỳ để nghe phát âm riêng từ đó, hoặc bấm nút loa để nghe toàn bộ câu thoại.
        </span>
      </div>
    </div>
  );
}

function lineTopClass(styles: Record<string, string>, line: TranscriptLine): string {
  return styles.lineTop;
}
