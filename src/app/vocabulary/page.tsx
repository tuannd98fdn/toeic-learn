'use client';

import { useState, useMemo } from 'react';
import { VocabularyWord, TargetBand } from '@/data/vocabulary';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useLeitner } from '@/hooks/useLeitner';
import { useAudio } from '@/hooks/useAudio';
import EmptyState from '@/components/illustrations/EmptyState';
import { VolumeIcon, SearchIcon, CloseIcon } from '@/components/icons/AppIcons';
import SmartVocabQuickAdd from '@/components/SmartVocabQuickAdd';
import { matchBilingualWord, highlightMatch, SearchMode } from '@/utils/bilingualSearch';
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

const QUICK_SEARCH_CHIPS = [
  { label: 'Hợp đồng', query: 'hợp đồng' },
  { label: 'Báo cáo', query: 'báo cáo' },
  { label: 'Lịch trình', query: 'lịch trình' },
  { label: 'Thanh toán', query: 'thanh toán' },
  { label: 'Nhân sự', query: 'nhân sự' },
  { label: 'Đàm phán', query: 'đàm phán' },
  { label: 'Giao hàng', query: 'giao hàng' },
  { label: 'Thông báo', query: 'thông báo' },
];

export default function VocabularyPage() {
  const { mounted: vocabMounted, allWords, userWords, addWord, removeWord } = useVocabulary();
  const { progress, mounted: leitnerMounted } = useLeitner();
  const { speak } = useAudio();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('all');
  const [activeQuickChip, setActiveQuickChip] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState<string | number>('All');
  const [selectedSource, setSelectedSource] = useState<'All' | 'system' | 'user'>('All');
  const [selectedBand, setSelectedBand] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isAddingWord, setIsAddingWord] = useState(false);

  const CATEGORIES = useMemo(() => ["All", ...Array.from(new Set(allWords.map(w => w.category)))], [allWords]);

  // Count active filters
  const activeFilterCount = [
    selectedBand !== 'All',
    selectedSource !== 'All',
    selectedCategory !== 'All',
    selectedLevel !== 'All',
  ].filter(Boolean).length;

  // Filter and rank words using bilingual search engine
  const filteredWords = useMemo(() => {
    const trimmed = searchTerm.trim();
    return allWords
      .map(word => {
        const matchRes = matchBilingualWord(word, trimmed, searchMode);
        return { word, matchRes };
      })
      .filter(({ word, matchRes }) => {
        if (!matchRes.matched) return false;
        const matchesCategory = selectedCategory === 'All' || word.category === selectedCategory;
        const wordBox = progress[word.id]?.box || 0;
        const matchesLevel = selectedLevel === 'All' || wordBox === selectedLevel;
        const matchesSource = selectedSource === 'All' || word.source === selectedSource;
        const matchesBand = selectedBand === 'All' || (word.targetBand || '650+') === selectedBand;
        return matchesCategory && matchesLevel && matchesSource && matchesBand;
      })
      .sort((a, b) => {
        if (trimmed) {
          if (b.matchRes.score !== a.matchRes.score) {
            return b.matchRes.score - a.matchRes.score;
          }
        }
        return a.word.word.localeCompare(b.word.word);
      })
      .map(item => item.word);
  }, [allWords, searchTerm, searchMode, selectedCategory, progress, selectedLevel, selectedSource, selectedBand]);

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
    setActiveQuickChip(null);
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
            <SearchIcon className={styles.searchSvg} size={18} />
            <input
              type="text"
              placeholder="Tra cứu song ngữ Anh - Việt (VD: contract, hợp đồng, bao cao...)"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (!e.target.value) setActiveQuickChip(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchTerm('');
                  setActiveQuickChip(null);
                }
              }}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => {
                  setSearchTerm('');
                  setActiveQuickChip(null);
                }}
                aria-label="Xóa tìm kiếm"
              >
                <CloseIcon size={16} />
              </button>
            )}
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

        {/* Bilingual Search Mode & Quick Topic Suggestions */}
        <div className={styles.bilingualControls}>
          <div className={styles.searchModeGroup}>
            <span className={styles.bilingualLabel}>Tìm theo:</span>
            <div className={styles.modeTabs}>
              <button
                type="button"
                className={`${styles.modeTab} ${searchMode === 'all' ? styles.activeModeTab : ''}`}
                onClick={() => setSearchMode('all')}
              >
                Song ngữ (Tất cả)
              </button>
              <button
                type="button"
                className={`${styles.modeTab} ${searchMode === 'en' ? styles.activeModeTab : ''}`}
                onClick={() => setSearchMode('en')}
              >
                Tiếng Anh (EN)
              </button>
              <button
                type="button"
                className={`${styles.modeTab} ${searchMode === 'vi' ? styles.activeModeTab : ''}`}
                onClick={() => setSearchMode('vi')}
              >
                Tiếng Việt (VI)
              </button>
            </div>
          </div>

          <div className={styles.quickSearchRow}>
            <span className={styles.quickSearchLabel}>Gợi ý nhanh:</span>
            <div className={styles.quickSearchChips}>
              {QUICK_SEARCH_CHIPS.map(chip => {
                const isActive = activeQuickChip === chip.label || searchTerm.trim().toLowerCase() === chip.query.toLowerCase();
                return (
                  <button
                    key={chip.label}
                    type="button"
                    className={`${styles.quickChip} ${isActive ? styles.activeQuickChip : ''}`}
                    onClick={() => {
                      if (isActive) {
                        setSearchTerm('');
                        setActiveQuickChip(null);
                      } else {
                        setSearchTerm(chip.query);
                        setActiveQuickChip(chip.label);
                      }
                    }}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
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

      {/* ═══════════════ WORD COUNT & SEARCH FEEDBACK ═══════════════ */}
      <div className={styles.wordCountRow}>
        <div className={styles.wordCount}>
          {filteredWords.length} từ
          {activeFilterCount > 0 && <span className={styles.wordCountFilter}> (đã lọc)</span>}
          {searchTerm.trim() && (
            <span className={styles.searchFeedback}>
              {' '}• Khớp với &ldquo;<strong>{searchTerm}</strong>&rdquo; ({searchMode === 'all' ? 'Song ngữ' : searchMode === 'en' ? 'Tiếng Anh' : 'Tiếng Việt'})
            </span>
          )}
        </div>
        {searchTerm && (
          <button
            type="button"
            className={styles.resetSearchInlineBtn}
            onClick={() => {
              setSearchTerm('');
              setActiveQuickChip(null);
            }}
          >
            Xóa tìm kiếm
          </button>
        )}
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
                    <h3 className={styles.word}>
                      {highlightMatch(word.word, searchTerm, styles.highlight)}
                    </h3>
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
                <div className={styles.vietnamese}>
                  {highlightMatch(word.vietnamese, searchTerm, styles.highlight)}
                </div>

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
                          <span>{highlightMatch(word.mnemonicTip, searchTerm, styles.highlight)}</span>
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
        <div className={styles.emptyStateWrapper}>
          <EmptyState 
            title="Không tìm thấy từ vựng nào"
            description={
              searchTerm.trim()
                ? `Không tìm thấy từ vựng nào khớp với "${searchTerm}". Thử tìm không dấu (VD: "hop dong", "bao cao") hoặc đổi sang chế độ "Song ngữ".`
                : "Thử thay đổi bộ lọc hoặc thêm từ mới vào thư viện."
            }
            mascotMood="thinking"
          />
          {searchTerm.trim() && (
            <div className={styles.emptyActionRow}>
              <button 
                type="button" 
                className="btn-secondary btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setActiveQuickChip(null);
                  setSearchMode('all');
                }}
              >
                Xóa tìm kiếm & Xem tất cả
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
