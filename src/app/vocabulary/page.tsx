'use client';

import { useState } from 'react';
import { VocabularyWord, TargetBand } from '@/data/vocabulary';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useLeitner } from '@/hooks/useLeitner';
import { useAudio } from '@/hooks/useAudio';
import EmptyState from '@/components/illustrations/EmptyState';
import { VolumeIcon, SparklesIcon, FileTextIcon, TargetIcon, CheckCircleIcon, BrainIcon, LinkIcon } from '@/components/icons/AppIcons';
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
  const { mounted: vocabMounted, allWords, addWord, removeWord } = useVocabulary();
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
  const [newWordData, setNewWordData] = useState<{
    word: string;
    ipa: string;
    vietnamese: string;
    partOfSpeech: string;
    category: string;
    targetBand: TargetBand;
    examples: string;
    mnemonicTip: string;
    emoji: string;
  }>({
    word: '', ipa: '', vietnamese: '', partOfSpeech: 'noun', category: 'Custom', targetBand: '650+', examples: '', mnemonicTip: '', emoji: '📝'
  });

  // AI Generator States
  const [addMode, setAddMode] = useState<'manual' | 'ai'>('manual');
  const [aiInputType, setAiInputType] = useState<'text_list' | 'topic' | 'url'>('text_list');
  const [aiPayload, setAiPayload] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWords, setGeneratedWords] = useState<Omit<VocabularyWord, 'id' | 'source'>[]>([]);

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

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWordData.word || !newWordData.vietnamese) return;
    addWord({
      ...newWordData,
      examples: newWordData.examples.split('\n').filter(ex => ex.trim() !== '')
    });
    setIsAddingWord(false);
    setNewWordData({ word: '', ipa: '', vietnamese: '', partOfSpeech: 'noun', category: 'Custom', targetBand: '650+', examples: '', mnemonicTip: '', emoji: '📝' });
  };

  const handleGenerateAI = async () => {
    if (!aiPayload.trim()) return;
    setIsGenerating(true);
    setGeneratedWords([]);
    try {
      const res = await fetch('/api/generate-vocab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: aiInputType, payload: aiPayload })
      });
      const data = await res.json();
      if (data.words) {
        setGeneratedWords(data.words);
      } else {
        alert(data.error || 'Có lỗi xảy ra.');
      }
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi tạo từ vựng.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveGenerated = () => {
    generatedWords.forEach(word => {
      addWord({ ...word, examples: word.examples || [] });
    });
    setGeneratedWords([]);
    setAiPayload('');
    setIsAddingWord(false);
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
        <div className={`${styles.addWordContainer} animate-scale-in`}>
          <div className={styles.addWordTabs}>
            <button 
              className={`${styles.tabBtn} ${addMode === 'manual' ? styles.activeTab : ''}`}
              onClick={() => setAddMode('manual')}
            >
              ✍️ Thêm thủ công
            </button>
            <button 
              className={`${styles.tabBtn} ${addMode === 'ai' ? styles.activeTab : ''}`}
              onClick={() => setAddMode('ai')}
            >
              <SparklesIcon size={16} /> Tạo bằng AI
            </button>
          </div>

          {addMode === 'manual' && (
            <form onSubmit={handleAddWord} className={styles.formContainer}>
              <div className={styles.formRow}>
                <input type="text" placeholder="Từ vựng (Ví dụ: hello)" required value={newWordData.word} onChange={e => setNewWordData({...newWordData, word: e.target.value})} className={styles.formInput} />
                <input type="text" placeholder="Nghĩa tiếng Việt" required value={newWordData.vietnamese} onChange={e => setNewWordData({...newWordData, vietnamese: e.target.value})} className={styles.formInput} />
              </div>
              <div className={styles.formRow}>
                <input type="text" placeholder="Phiên âm (/həˈləʊ/)" value={newWordData.ipa} onChange={e => setNewWordData({...newWordData, ipa: e.target.value})} className={styles.formInput} />
                <input type="text" placeholder="Từ loại" value={newWordData.partOfSpeech} onChange={e => setNewWordData({...newWordData, partOfSpeech: e.target.value})} className={styles.formInput} />
                <input type="text" placeholder="Chủ đề" value={newWordData.category} onChange={e => setNewWordData({...newWordData, category: e.target.value})} className={styles.formInput} />
                <select
                  value={newWordData.targetBand}
                  onChange={e => setNewWordData({...newWordData, targetBand: e.target.value as TargetBand})}
                  className={styles.formInput}
                >
                  <option value="450+">Band 450+</option>
                  <option value="650+">Band 650+</option>
                  <option value="800+">Band 800+</option>
                </select>
              </div>
              <textarea placeholder="Các ví dụ (mỗi dòng 1 ví dụ)" value={newWordData.examples} onChange={e => setNewWordData({...newWordData, examples: e.target.value})} className={`${styles.formInput} ${styles.formTextarea}`} />
              <div className={styles.formRow}>
                <input type="text" placeholder="Mẹo nhớ" value={newWordData.mnemonicTip} onChange={e => setNewWordData({...newWordData, mnemonicTip: e.target.value})} className={styles.formInput} style={{ flex: 2 }} />
                <input type="text" placeholder="Emoji (📝)" value={newWordData.emoji} onChange={e => setNewWordData({...newWordData, emoji: e.target.value})} className={styles.formInput} style={{ flex: 1 }} />
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={() => setIsAddingWord(false)} className="btn-secondary btn-sm">Hủy</button>
                <button type="submit" className="btn-primary btn-sm">Lưu từ vựng</button>
              </div>
            </form>
          )}

          {addMode === 'ai' && (
            <div className={styles.aiContainer}>
              <div className={styles.aiInputTypes}>
                <button 
                  className={`${styles.aiTypeBtn} ${aiInputType === 'text_list' ? styles.activeAiType : ''}`}
                  onClick={() => setAiInputType('text_list')}
                >
                  <FileTextIcon size={18} />
                  Từ danh sách chữ
                </button>
                <button 
                  className={`${styles.aiTypeBtn} ${aiInputType === 'topic' ? styles.activeAiType : ''}`}
                  onClick={() => setAiInputType('topic')}
                >
                  <TargetIcon size={18} />
                  Theo chủ đề
                </button>
                <button 
                  className={`${styles.aiTypeBtn} ${aiInputType === 'url' ? styles.activeAiType : ''}`}
                  onClick={() => setAiInputType('url')}
                >
                  <LinkIcon size={18} />
                  Từ link bài báo
                </button>
              </div>

              <textarea 
                placeholder={aiInputType === 'text_list' 
                  ? "Dán danh sách các từ tiếng Anh (ví dụ: revenue, budget, evaluate)..." 
                  : aiInputType === 'topic' 
                  ? "Nhập chủ đề muốn học (ví dụ: Sân bay, Ký hợp đồng, Marketing)..."
                  : "Dán đường link bài báo hoặc trang web (ví dụ: https://www.itpro.com/...)"}
                value={aiPayload}
                onChange={e => setAiPayload(e.target.value)}
                className={`${styles.formInput} ${styles.formTextarea}`}
                disabled={isGenerating}
              />

              <div className={styles.formActions}>
                <button type="button" onClick={() => setIsAddingWord(false)} className="btn-secondary btn-sm" disabled={isGenerating}>Hủy</button>
                <button type="button" onClick={handleGenerateAI} className="btn-primary btn-sm" disabled={isGenerating || !aiPayload.trim()}>
                  {isGenerating ? 'Đang tạo...' : '✨ Bắt đầu tạo'}
                </button>
              </div>

              {isGenerating && (
                <div className={styles.aiLoading}>
                  <BrainIcon size={36} className={styles.pulseIcon} />
                  <p>AI đang phân tích và tạo flashcard...</p>
                  <div className={styles.loadingBar}><div className={styles.loadingFill} /></div>
                </div>
              )}

              {generatedWords.length > 0 && !isGenerating && (
                <div className={styles.generatedResults}>
                  <div className={styles.resultsHeader}>
                    <h4>Đã tạo {generatedWords.length} từ vựng!</h4>
                    <button onClick={handleSaveGenerated} className="btn-success btn-sm">
                      <CheckCircleIcon size={16} />
                      Lưu tất cả vào thư viện
                    </button>
                  </div>
                  <div className={styles.resultsList}>
                    {generatedWords.map((word, idx) => (
                      <div key={idx} className={styles.resultItem}>
                        <div className={styles.resultWord}>
                          <strong>{word.word}</strong> <span className={styles.resultIpa}>{word.ipa}</span>
                        </div>
                        <div className={styles.resultMeaning}>{word.vietnamese}</div>
                        <div className={styles.resultMnemonic}>{word.emoji} {word.mnemonicTip}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
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
                    
                    {(word.mnemonicTip || word.emoji) && (
                      <div className={styles.expandSection}>
                        <div className={styles.expandLabel}>Mẹo nhớ</div>
                        <div className={styles.mnemonic}>
                          <span className={styles.emoji}>{word.emoji}</span>
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
