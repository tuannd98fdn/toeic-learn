'use client';

import { useState } from 'react';
import { VocabularyWord, TargetBand } from '@/data/vocabulary';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useLeitner } from '@/hooks/useLeitner';
import { useAudio } from '@/hooks/useAudio';
import EmptyState from '@/components/illustrations/EmptyState';
import { VolumeIcon } from '@/components/icons/AppIcons';
import SmartVocabQuickAdd from '@/components/SmartVocabQuickAdd';
import styles from './page.module.css';

const LEVELS = ["All", 1, 2, 3, 4, 5];
const SOURCES = [
  { value: 'All', label: 'Tất cả nguồn' },
  { value: 'system', label: 'Hệ thống' },
  { value: 'user', label: 'Từ của tôi' }
];
const TARGET_BANDS = [
  { value: 'All', label: 'Tất cả Band' },
  { value: '450+', label: 'Band 450+' },
  { value: '650+', label: 'Band 650+' },
  { value: '800+', label: 'Band 800+' }
];

export default function VocabularyPage() {
  const { mounted: vocabMounted, allWords, userWords, addWord, removeWord } = useVocabulary();
  const { progress, mounted: leitnerMounted } = useLeitner();
  const { speak } = useAudio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState<string | number>('All');
  const [selectedSource, setSelectedSource] = useState<'All' | 'system' | 'user'>('All');
  const [selectedBand, setSelectedBand] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isAddingWord, setIsAddingWord] = useState(false);

  const mounted = vocabMounted && leitnerMounted;
  if (!mounted) return (
    <div className={styles.container}>
      <div className={`${styles.skeletonHeader} skeleton`} />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${styles.skeletonCard} skeleton`} />
        ))}
      </div>
    </div>
  );

  const CATEGORIES = ["All", ...Array.from(new Set(allWords.map(w => w.category)))];

  // Count active filters
  const activeFilterCount = [
    selectedBand !== 'All',
    selectedSource !== 'All',
    selectedCategory !== 'All',
    selectedLevel !== 'All',
  ].filter(Boolean).length;

  // Filter words
  const filteredWords = allWords.filter(word => {
    const matchesSearch = 
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      word.vietnamese.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || word.category === selectedCategory;
    const wordBox = progress[word.id]?.box || 0;
    const matchesLevel = selectedLevel === 'All' || wordBox === selectedLevel;
    const matchesSource = selectedSource === 'All' || word.source === selectedSource;
    const matchesBand = selectedBand === 'All' || (word.targetBand || '650+') === selectedBand;
    return matchesSearch && matchesCategory && matchesLevel && matchesSource && matchesBand;
  });

  const handleCardClick = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const getLevelColor = (box: number) => {
    if (box === 0) return 'var(--text-tertiary)';
    return `var(--box-${box})`;
  };



  const clearAllFilters = () => {
    setSelectedBand('All');
    setSelectedSource('All');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSearchTerm('');
  };

  return (
    <div className={styles.container}>
      {/* ═══════════════ HEADER ═══════════════ */}
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Thư viện từ vựng</h1>
          <button 
            className="btn-primary btn-sm"
            onClick={() => setIsAddingWord(true)}
          >
            + Thêm từ mới
          </button>
        </div>

        {/* Search + Filter Bar */}
        <div className={styles.searchRow}>
          <div className={styles.searchBar}>
            <svg className={styles.searchSvg} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Tìm kiếm tiếng Anh hoặc tiếng Việt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button 
            className={`${styles.filterToggle} ${showFilters ? styles.filterActive : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Bộ lọc
            {activeFilterCount > 0 && <span className={styles.filterCount}>{activeFilterCount}</span>}
          </button>
        </div>

        {/* Collapsible Filter Panel */}
        {showFilters && (
          <div className={`${styles.filterPanel} animate-slide-up`}>
            <div className={styles.filterPanelHeader}>
              <span className={styles.filterPanelTitle}>Bộ lọc nâng cao</span>
              {activeFilterCount > 0 && (
                <button className={styles.clearBtn} onClick={clearAllFilters}>
                  Xóa tất cả ({activeFilterCount})
                </button>
              )}
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Band mục tiêu</span>
              <div className={styles.chips}>
                {TARGET_BANDS.map(band => (
                  <button
                    key={band.value}
                    className={`${styles.chip} ${selectedBand === band.value ? styles.activeChip : ''}`}
                    onClick={() => setSelectedBand(band.value)}
                  >
                    {band.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Nguồn</span>
              <div className={styles.chips}>
                {SOURCES.map(src => (
                  <button
                    key={src.value}
                    className={`${styles.chip} ${selectedSource === src.value ? styles.activeChip : ''}`}
                    onClick={() => setSelectedSource(src.value as any)}
                  >
                    {src.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Chủ đề</span>
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
              <span className={styles.filterLabel}>Mức độ thuộc (Leitner)</span>
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
        )}
      </header>

      {/* ═══════════════ ADD WORD ═══════════════ */}
      {isAddingWord && (
        <SmartVocabQuickAdd
          allWords={allWords}
          userWords={userWords}
          onAddWord={addWord}
          onClose={() => setIsAddingWord(false)}
        />
      )}

      {/* ═══════════════ WORD COUNT ═══════════════ */}
      <div className={styles.wordCount}>
        {filteredWords.length} từ
        {activeFilterCount > 0 && <span className={styles.wordCountFilter}> (đã lọc)</span>}
      </div>

      {/* ═══════════════ WORD GRID ═══════════════ */}
      <main className={`${styles.grid} stagger-children`}>
        {filteredWords.map(word => {
          const isExpanded = expandedId === word.id;
          const box = progress[word.id]?.box || 0;
          
          return (
            <div 
              key={word.id} 
              className={styles.card}
              onClick={() => handleCardClick(word.id)}
              data-level={box}
            >
              <div className={styles.cardLevel} style={{ backgroundColor: getLevelColor(box) }} />
              
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <div className={styles.wordInfo}>
                    <h3 className={styles.word}>{word.word}</h3>
                    <span className={styles.bandBadge}>{word.targetBand || '650+'}</span>
                    {word.source === 'user' && <span className={styles.userBadge}>Tôi</span>}
                  </div>
                  <button 
                    className={styles.audioBtn}
                    onClick={(e) => { e.stopPropagation(); speak(word.word); }}
                    aria-label={`Phát âm ${word.word}`}
                  >
                    <VolumeIcon size={18} />
                  </button>
                </div>
                
                <span className={styles.ipa}>{word.ipa}</span>
                <div className={styles.vietnamese}>{word.vietnamese}</div>

                {isExpanded && (
                  <div className={`${styles.expandedContent} animate-slide-up`}>
                    <div className={styles.categoryBadge}>{word.category}</div>
                    
                    <div className={styles.expandSection}>
                      <div className={styles.expandLabel}>Ví dụ</div>
                      {word.examples.length > 0 ? word.examples.map((ex, i) => (
                        <p key={i} className={styles.example}>• {ex}</p>
                      )) : (
                        <p className={styles.example} style={{ color: 'var(--text-tertiary)' }}>Không có ví dụ</p>
                      )}
                    </div>
                    
                    {word.mnemonicTip && (
                      <div className={styles.expandSection}>
                        <div className={styles.expandLabel}>Mẹo nhớ</div>
                        <div className={styles.mnemonic}>
                          {word.emoji ? <span className={styles.emoji}>{word.emoji}</span> : null}
                          <span>{word.mnemonicTip}</span>
                        </div>
                      </div>
                    )}

                    {word.source === 'user' && (
                      <div className={styles.cardFooter}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeWord(word.id); }}
                          className={styles.deleteBtn}
                        >
                          Xóa từ này
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </main>

      {filteredWords.length === 0 && (
        <EmptyState 
          title="Không tìm thấy từ vựng nào"
          description="Thử thay đổi bộ lọc hoặc thêm từ mới vào thư viện."
          mascotMood="thinking"
        />
      )}
    </div>
  );
}
