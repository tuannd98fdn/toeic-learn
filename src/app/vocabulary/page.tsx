'use client';

import { useState } from 'react';
import { VOCABULARY_DATA, VocabularyWord } from '@/data/vocabulary';
import { useLeitner } from '@/hooks/useLeitner';
import { useAudio } from '@/hooks/useAudio';
import styles from './page.module.css';

const CATEGORIES = ["All", ...Array.from(new Set(VOCABULARY_DATA.map(w => w.category)))];
const LEVELS = ["All", 1, 2, 3, 4, 5];

export default function VocabularyPage() {
  const { progress, mounted } = useLeitner();
  const { speak } = useAudio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState<string | number>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!mounted) return <div className={styles.loading}>Loading...</div>;

  // Filter words
  const filteredWords = VOCABULARY_DATA.filter(word => {
    // Search filter
    const matchesSearch = 
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      word.vietnamese.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'All' || word.category === selectedCategory;
    
    // Level filter
    const wordBox = progress[word.id]?.box || 0;
    const matchesLevel = selectedLevel === 'All' || wordBox === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleCardClick = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const getLevelColor = (box: number) => {
    if (box === 0) return 'var(--text-tertiary)';
    return `var(--box-${box})`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Thư viện từ vựng</h1>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm tiếng Anh hoặc tiếng Việt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Chủ đề:</span>
            <div className={styles.chips}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.chip} ${selectedCategory === cat ? styles.activeChip : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Mức độ thuộc (Leitner):</span>
            <div className={styles.chips}>
              {LEVELS.map(level => (
                <button
                  key={level}
                  className={`${styles.chip} ${selectedLevel === level ? styles.activeChip : ''}`}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level === 'All' ? 'Tất cả' : `Level ${level}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className={styles.wordCount}>
        Hiển thị {filteredWords.length} từ
      </div>

      <main className={styles.grid}>
        {filteredWords.map(word => {
          const isExpanded = expandedId === word.id;
          const box = progress[word.id]?.box || 0;
          
          return (
            <div 
              key={word.id} 
              className={`${styles.card} card-minimal`}
              onClick={() => handleCardClick(word.id)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.wordInfo}>
                  <h3 className={styles.word}>{word.word}</h3>
                  <span className={styles.ipa}>{word.ipa}</span>
                </div>
                <div 
                  className={styles.levelIndicator}
                  style={{ backgroundColor: getLevelColor(box) }}
                  title={box === 0 ? 'Chưa học' : `Level ${box}`}
                >
                  {box === 0 ? '-' : box}
                </div>
              </div>
              
              <div className={styles.vietnamese}>{word.vietnamese}</div>
              
              <button 
                className={styles.audioBtn}
                onClick={(e) => { e.stopPropagation(); speak(word.word); }}
              >
                🔊
              </button>

              {isExpanded && (
                <div className={styles.expandedContent}>
                  <div className={styles.categoryBadge}>{word.category}</div>
                  
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>Ví dụ:</div>
                    {word.examples.map((ex, i) => (
                      <p key={i} className={styles.example}>• {ex}</p>
                    ))}
                  </div>
                  
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>Mẹo nhớ:</div>
                    <div className={styles.mnemonic}>
                      <span className={styles.emoji}>{word.emoji}</span>
                      <span>{word.mnemonicTip}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </main>

      {filteredWords.length === 0 && (
        <div className={styles.emptyState}>
          Không tìm thấy từ vựng nào phù hợp với bộ lọc.
        </div>
      )}
    </div>
  );
}
