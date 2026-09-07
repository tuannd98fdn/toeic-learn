'use client';

import { useState } from 'react';
import { VocabularyWord } from '@/data/vocabulary';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useLeitner } from '@/hooks/useLeitner';
import { useAudio } from '@/hooks/useAudio';
import { VolumeIcon } from '@/components/icons/AppIcons';
import styles from './page.module.css';

const LEVELS = ["All", 1, 2, 3, 4, 5];
const SOURCES = [
  { value: 'All', label: 'Tất cả nguồn' },
  { value: 'system', label: 'Hệ thống' },
  { value: 'user', label: 'Từ của tôi' }
];

export default function VocabularyPage() {
  const { mounted: vocabMounted, allWords, addWord, removeWord } = useVocabulary();
  const { progress, mounted: leitnerMounted } = useLeitner();
  const { speak } = useAudio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState<string | number>('All');
  const [selectedSource, setSelectedSource] = useState<'All' | 'system' | 'user'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [isAddingWord, setIsAddingWord] = useState(false);
  const [newWordData, setNewWordData] = useState({
    word: '', ipa: '', vietnamese: '', partOfSpeech: 'noun', category: 'Custom', examples: '', mnemonicTip: '', emoji: '📝'
  });

  const mounted = vocabMounted && leitnerMounted;
  if (!mounted) return <div className={styles.loading}>Loading...</div>;

  const CATEGORIES = ["All", ...Array.from(new Set(allWords.map(w => w.category)))];

  // Filter words
  const filteredWords = allWords.filter(word => {
    // Search filter
    const matchesSearch = 
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      word.vietnamese.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'All' || word.category === selectedCategory;
    
    // Level filter
    const wordBox = progress[word.id]?.box || 0;
    const matchesLevel = selectedLevel === 'All' || wordBox === selectedLevel;

    // Source filter
    const matchesSource = selectedSource === 'All' || word.source === selectedSource;

    return matchesSearch && matchesCategory && matchesLevel && matchesSource;
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
    setNewWordData({ word: '', ipa: '', vietnamese: '', partOfSpeech: 'noun', category: 'Custom', examples: '', mnemonicTip: '', emoji: '📝' });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 className={styles.title}>Thư viện từ vựng</h1>
          <button 
            className="button-primary"
            onClick={() => setIsAddingWord(true)}
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '14px' }}
          >
            + Thêm từ mới
          </button>
        </div>
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
            <span className={styles.filterLabel}>Nguồn:</span>
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

      {isAddingWord && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Thêm từ vựng mới</h3>
          <form onSubmit={handleAddWord} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Từ vựng (Ví dụ: hello)" required value={newWordData.word} onChange={e => setNewWordData({...newWordData, word: e.target.value})} className={styles.searchInput} style={{ flex: 1, minWidth: '200px' }} />
              <input type="text" placeholder="Nghĩa tiếng Việt (Ví dụ: xin chào)" required value={newWordData.vietnamese} onChange={e => setNewWordData({...newWordData, vietnamese: e.target.value})} className={styles.searchInput} style={{ flex: 1, minWidth: '200px' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Phiên âm (Ví dụ: /həˈləʊ/)" value={newWordData.ipa} onChange={e => setNewWordData({...newWordData, ipa: e.target.value})} className={styles.searchInput} style={{ flex: 1, minWidth: '150px' }} />
              <input type="text" placeholder="Từ loại (Danh từ, động từ...)" value={newWordData.partOfSpeech} onChange={e => setNewWordData({...newWordData, partOfSpeech: e.target.value})} className={styles.searchInput} style={{ flex: 1, minWidth: '150px' }} />
              <input type="text" placeholder="Chủ đề (Ví dụ: Giao tiếp)" value={newWordData.category} onChange={e => setNewWordData({...newWordData, category: e.target.value})} className={styles.searchInput} style={{ flex: 1, minWidth: '150px' }} />
            </div>
            <textarea placeholder="Các ví dụ (mỗi dòng 1 ví dụ)" value={newWordData.examples} onChange={e => setNewWordData({...newWordData, examples: e.target.value})} className={styles.searchInput} style={{ minHeight: '80px', padding: '12px' }} />
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Mẹo nhớ" value={newWordData.mnemonicTip} onChange={e => setNewWordData({...newWordData, mnemonicTip: e.target.value})} className={styles.searchInput} style={{ flex: 2, minWidth: '200px' }} />
              <input type="text" placeholder="Emoji (📝)" value={newWordData.emoji} onChange={e => setNewWordData({...newWordData, emoji: e.target.value})} className={styles.searchInput} style={{ flex: 1, minWidth: '80px' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setIsAddingWord(false)} style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>Hủy</button>
              <button type="submit" className="button-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}>Lưu từ vựng</button>
            </div>
          </form>
        </div>
      )}

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
                  <h3 className={styles.word}>
                    {word.word}
                    {word.source === 'user' && <span style={{fontSize: '12px', marginLeft: '8px', backgroundColor: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '12px', color: 'var(--text-secondary)'}}>User</span>}
                  </h3>
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
                <VolumeIcon size={20} className={styles.audioIcon} />
              </button>

              {isExpanded && (
                <div className={styles.expandedContent}>
                  <div className={styles.categoryBadge}>{word.category}</div>
                  
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>Ví dụ:</div>
                    {word.examples.map((ex, i) => (
                      <p key={i} className={styles.example}>• {ex}</p>
                    ))}
                    {word.examples.length === 0 && <p className={styles.example} style={{ color: 'var(--text-tertiary)' }}>Không có ví dụ</p>}
                  </div>
                  
                  {(word.mnemonicTip || word.emoji) && (
                    <div className={styles.section}>
                      <div className={styles.sectionTitle}>Mẹo nhớ:</div>
                      <div className={styles.mnemonic}>
                        <span className={styles.emoji}>{word.emoji}</span>
                        <span>{word.mnemonicTip}</span>
                      </div>
                    </div>
                  )}

                  {word.source === 'user' && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', textAlign: 'right' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeWord(word.id); }}
                        style={{ background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
                      >
                        Xóa từ này
                      </button>
                    </div>
                  )}
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
