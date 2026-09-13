'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { VocabularyWord, getParaphrasingPairs } from '@/data/vocabulary';
import { AwardIcon, CheckCircleIcon, RotateCcwIcon, CardsIcon, ZapIcon } from '@/components/icons/AppIcons';
import styles from '@/app/study/page.module.css';

interface MatchItem {
  id: string;
  passageText: string;
  optionText: string;
  vietnamese: string;
}

interface ParaphraseMatchGameProps {
  onWordReviewed?: () => void;
  onSwitchMode?: (mode: 'flashcard' | 'drill') => void;
}

function initRoundData(allPairs: VocabularyWord[], round: number) {
  if (!allPairs || allPairs.length === 0) {
    return { items: [], passages: [], options: [] };
  }

  const startIndex = (round * 5) % allPairs.length;
  const selected: VocabularyWord[] = [];
  for (let i = 0; i < Math.min(5, allPairs.length); i++) {
    selected.push(allPairs[(startIndex + i) % allPairs.length]);
  }

  const formattedItems: MatchItem[] = selected.map(w => ({
    id: w.id,
    passageText: w.paraphrasePair?.passageText || w.examples[0] || w.word,
    optionText: w.paraphrasePair?.optionText || w.word,
    vietnamese: w.vietnamese,
  }));

  const passages = [...formattedItems]
    .sort(() => Math.random() - 0.5)
    .map(item => ({ id: item.id, text: item.passageText, vietnamese: item.vietnamese }));

  const options = [...formattedItems]
    .sort(() => Math.random() - 0.5)
    .map(item => ({ id: item.id, text: item.optionText }));

  return { items: formattedItems, passages, options };
}

export default function ParaphraseMatchGame({
  onWordReviewed,
  onSwitchMode,
}: ParaphraseMatchGameProps) {
  const allPairs = useMemo(() => getParaphrasingPairs(), []);
  const [round, setRound] = useState(0);

  const [roundData, setRoundData] = useState(() => initRoundData(allPairs, 0));
  const [selectedPassageId, setSelectedPassageId] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ passageId: string; optionId: string } | null>(null);
  const [triesCount, setTriesCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Re-init when round changes
  useEffect(() => {
    const data = initRoundData(allPairs, round);
    setRoundData(data);
    setMatchedIds(new Set());
    setSelectedPassageId(null);
    setSelectedOptionId(null);
    setWrongPair(null);
    setTriesCount(0);
    setIsFinished(false);
  }, [allPairs, round]);

  // Check matching whenever both sides are selected
  const checkMatch = useCallback((passageId: string, optionId: string) => {
    setTriesCount(prev => prev + 1);

    if (passageId === optionId) {
      // Match success
      setMatchedIds(prev => {
        const next = new Set(prev);
        next.add(passageId);
        if (next.size === roundData.items.length) {
          setIsFinished(true);
        }
        return next;
      });
      setSelectedPassageId(null);
      setSelectedOptionId(null);
      onWordReviewed?.();
    } else {
      // Wrong match
      setWrongPair({ passageId, optionId });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedPassageId(null);
        setSelectedOptionId(null);
      }, 500);
    }
  }, [roundData.items.length, onWordReviewed]);

  const handleSelectPassage = (id: string) => {
    if (matchedIds.has(id) || wrongPair) return;

    if (selectedPassageId === id) {
      setSelectedPassageId(null);
      return;
    }

    setSelectedPassageId(id);

    if (selectedOptionId) {
      checkMatch(id, selectedOptionId);
    }
  };

  const handleSelectOption = (id: string) => {
    if (matchedIds.has(id) || wrongPair) return;

    if (selectedOptionId === id) {
      setSelectedOptionId(null);
      return;
    }

    setSelectedOptionId(id);

    if (selectedPassageId) {
      checkMatch(selectedPassageId, id);
    }
  };

  const handleNextRound = () => {
    setRound(prev => prev + 1);
  };

  if (isFinished) {
    return (
      <div className={styles.interactiveContainer}>
        <div className={styles.emptyCard} style={{ margin: '20px auto' }}>
          <div className={styles.iconWrapper}>
            <AwardIcon size={44} className={styles.glowIcon} />
          </div>
          <h2>Hoàn thành ván ghép cặp!</h2>
          <p>
            Bạn đã ghép đúng <strong>5/5 cặp Paraphrase</strong> của đề thi ETS với <strong>{triesCount}</strong> lượt thử.
          </p>
          <div className={styles.actions}>
            <button onClick={handleNextRound} className="btn-primary" style={{ cursor: 'pointer', width: '100%', justifyContent: 'center' }}>
              <RotateCcwIcon size={18} style={{ marginRight: '8px' }} />
              Luyện tiếp 5 cặp mới
            </button>
            {onSwitchMode && (
              <button onClick={() => onSwitchMode('drill')} className="btn-secondary" style={{ cursor: 'pointer', width: '100%', justifyContent: 'center' }}>
                <ZapIcon size={18} style={{ marginRight: '8px' }} />
                Luyện phản xạ Collocations
              </button>
            )}
            {onSwitchMode && (
              <button onClick={() => onSwitchMode('flashcard')} className="btn-secondary" style={{ cursor: 'pointer', width: '100%', justifyContent: 'center', border: 'none', background: 'transparent' }}>
                <CardsIcon size={18} style={{ marginRight: '8px' }} />
                Trở về Thẻ ghi nhớ SRS
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.interactiveContainer}>
      <div className={styles.interactiveHeader}>
        <div className={styles.interactiveBadge}>
          ETS Paraphrasing Challenge
        </div>
        <h2 className={styles.interactiveTitle}>Thử Thách Ghép Cặp Paraphrase Part 7</h2>
        <p className={styles.interactiveDesc}>
          Nối cụm từ xuất hiện trong bài đọc với cách diễn đạt tương đương trong câu hỏi đáp án ETS.
        </p>
      </div>

      <div className={styles.matchStatsBar}>
        <span>Tiến độ: <strong>{matchedIds.size}/{roundData.items.length}</strong> cặp hoàn thành</span>
        <span>Lượt thử: <strong>{triesCount}</strong></span>
      </div>

      <div className={styles.matchBoard}>
        {/* Column 1: Passage Context (Bài đọc) */}
        <div className={styles.matchCol}>
          <div className={styles.matchColLabel}>
            Trong Đoạn Văn (Passage)
          </div>
          {roundData.passages.map(item => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedPassageId === item.id;
            const isWrong = wrongPair?.passageId === item.id;

            return (
              <div
                key={`passage-${item.id}`}
                data-testid="match-card-passage"
                className={`${styles.matchCard} ${isSelected ? styles.selectedCard : ''} ${isMatched ? styles.matchedCard : ''} ${isWrong ? styles.wrongCard : ''}`}
                onClick={() => handleSelectPassage(item.id)}
                role="button"
                tabIndex={0}
              >
                {isMatched && <CheckCircleIcon size={16} className={styles.matchedIcon} />}
                <div>&ldquo;{item.text}&rdquo;</div>
                <div className={styles.cardMeaning}>{item.vietnamese}</div>
              </div>
            );
          })}
        </div>

        {/* Column 2: Option Paraphrase (Đáp án) */}
        <div className={styles.matchCol}>
          <div className={styles.matchColLabel}>
            Trong Đáp Án (ETS Option)
          </div>
          {roundData.options.map(item => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedOptionId === item.id;
            const isWrong = wrongPair?.optionId === item.id;

            return (
              <div
                key={`option-${item.id}`}
                data-testid="match-card-option"
                className={`${styles.matchCard} ${isSelected ? styles.selectedCard : ''} ${isMatched ? styles.matchedCard : ''} ${isWrong ? styles.wrongCard : ''}`}
                onClick={() => handleSelectOption(item.id)}
                role="button"
                tabIndex={0}
              >
                {isMatched && <CheckCircleIcon size={16} className={styles.matchedIcon} />}
                <div>&ldquo;{item.text}&rdquo;</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
