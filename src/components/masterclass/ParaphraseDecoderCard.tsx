'use client';

import { useState } from 'react';
import { BusinessScenario, VocabHighlight } from '@/schema/masterclass';
import { BookOpenIcon, ClockIcon, LightbulbIcon, LayersIcon, CloseIcon } from '@/components/icons/AppIcons';
import styles from './ParaphraseDecoderCard.module.css';

interface ParaphraseDecoderCardProps {
  scenario: BusinessScenario;
}

export default function ParaphraseDecoderCard({ scenario }: ParaphraseDecoderCardProps) {
  const [selectedVocab, setSelectedVocab] = useState<VocabHighlight | null>(null);
  const [activeTab, setActiveTab] = useState<'passage' | 'matrix'>('passage');

  // Render passage with clickable highlights
  const renderInteractivePassage = () => {
    let rawText = scenario.content;
    const highlights = scenario.vocabHighlights;

    // Split text into tokens and wrap highlighted terms
    const sortedHighlights = [...highlights].sort((a, b) => b.word.length - a.word.length);
    const regexPattern = new RegExp(`(${sortedHighlights.map(h => h.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

    const parts = rawText.split(regexPattern);

    return (
      <div className={styles.passageContent}>
        {parts.map((part, i) => {
          const match = highlights.find(h => h.word.toLowerCase() === part.toLowerCase());
          if (match) {
            return (
              <button
                key={`${match.id}-${i}`}
                type="button"
                className={styles.highlightPill}
                onClick={() => setSelectedVocab(match)}
                title="Bấm xem phiên âm, dịch nghĩa & collocation"
              >
                {part}
              </button>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className={styles.cardContainer}>
      {/* Header Info */}
      <div className={styles.header}>
        <div className={styles.metaRow}>
          <span className={styles.industryBadge}>
            <BookOpenIcon size={14} />
            {scenario.industry}
          </span>
          <span className={styles.readTimeBadge}>
            <ClockIcon size={14} />
            {scenario.readTimeMinutes} phút đọc sâu
          </span>
        </div>
        <h3 className={styles.title}>{scenario.title}</h3>
      </div>

      {/* Executive Summary */}
      <div className={styles.summaryBox}>
        <span className={styles.summaryLabel}>Tóm Tắt Điều Hành (Executive Summary):</span>
        <p className={styles.summaryText}>{scenario.executiveSummary}</p>
      </div>

      {/* View Switcher Tabs */}
      <div className={styles.tabNav}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'passage' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('passage')}
        >
          <BookOpenIcon size={16} />
          <span>Văn Bản Thương Mại &amp; Từ Khóa</span>
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'matrix' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('matrix')}
        >
          <LayersIcon size={16} />
          <span>Ma Trận Paraphrase 4 Tầng ETS</span>
        </button>
      </div>

      {/* Tab 1: Interactive Passage */}
      {activeTab === 'passage' && (
        <div className={styles.passageWrapper}>
          <div className={styles.tipBar}>
            <LightbulbIcon size={16} className={styles.tipIcon} />
            <span>Mẹo: Bấm vào các <strong>từ vựng in màu</strong> bên dưới để xem phiên âm IPA, dịch nghĩa và collocations.</span>
          </div>

          <div className={styles.passageCard}>
            {renderInteractivePassage()}
          </div>
        </div>
      )}

      {/* Tab 2: 4-Tier Paraphrase Matrix */}
      {activeTab === 'matrix' && (
        <div className={styles.matrixWrapper}>
          <div className={styles.matrixNotice}>
            <p>
              <strong>Cơ Chế Khảo Thí ETS 800+:</strong> Đề thi thật không bao giờ lặp lại y nguyên từ ngữ trong bài đọc. Hãy quan sát 4 tầng biến đổi ý nghĩa dưới đây để nhận diện đáp án đúng:
            </p>
          </div>

          <div className={styles.matrixList}>
            {scenario.paraphraseMatrix.map((item, idx) => (
              <div key={idx} className={styles.matrixItem}>
                <div className={styles.matrixHeader}>
                  <span className={styles.tierTag}>{item.tierLabel}</span>
                </div>

                <div className={styles.comparisonGrid}>
                  <div className={styles.colPassage}>
                    <span className={styles.colHeader}>Trong Bài Đọc:</span>
                    <p className={styles.colTextPassage}>&ldquo;{item.passageText}&rdquo;</p>
                  </div>
                  <div className={styles.colEts}>
                    <span className={styles.colHeader}>Trong Đáp Án Đúng ETS:</span>
                    <p className={styles.colTextEts}>&ldquo;{item.etsOptionText}&rdquo;</p>
                  </div>
                </div>

                {item.trapDistractor && (
                  <div className={styles.trapBox}>
                    <span className={styles.trapLabel}>Bẫy Gây Nhiễu (Distractor Trap):</span>
                    <p className={styles.trapText}>{item.trapDistractor}</p>
                  </div>
                )}

                <div className={styles.pedagogicalBox}>
                  <span className={styles.pedagogicalLabel}>Phân Tích Sư Phạm:</span>
                  <p className={styles.pedagogicalText}>{item.pedagogicalNote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vocab Modal/Popup */}
      {selectedVocab && (
        <div className={styles.modalOverlay} onClick={() => setSelectedVocab(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h4 className={styles.vocabWord}>{selectedVocab.word}</h4>
                <span className={styles.vocabIpa}>{selectedVocab.ipa}</span>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelectedVocab(null)}
                title="Đóng"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.vocabSection}>
                <span className={styles.modalSectionLabel}>Dịch nghĩa tiếng Việt:</span>
                <p className={styles.vocabMeaning}>{selectedVocab.vietnamese}</p>
              </div>

              <div className={styles.vocabSection}>
                <span className={styles.modalSectionLabel}>Collocation thực chiến:</span>
                <p className={styles.vocabCollocation}><code>{selectedVocab.collocationTip}</code></p>
              </div>

              <div className={styles.vocabSection}>
                <span className={styles.modalSectionLabel}>Câu mẫu trong ngữ cảnh:</span>
                <p className={styles.vocabContext}>&ldquo;{selectedVocab.exampleInContext}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
