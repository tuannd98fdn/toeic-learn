'use client';
import { useState, useEffect, useMemo } from 'react';
import { useVocabulary } from '@/hooks/useVocabulary';
import { CloseIcon, FileTextIcon, CheckCircleIcon } from '@/components/icons/AppIcons';
import styles from './TextSelectionToolbar.module.css';

interface ToolbarPosition {
  top: number;
  left: number;
}

export default function TextSelectionToolbar() {
  const [position, setPosition] = useState<ToolbarPosition | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [contextSentence, setContextSentence] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addWord, allWords } = useVocabulary();
  
  const [vietnamese, setVietnamese] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('Danh từ');
  const [matchedIpa, setMatchedIpa] = useState('');
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  
  // Build a lookup map for O(1) word matching
  const wordLookup = useMemo(() => {
    const map = new Map<string, { vietnamese: string; partOfSpeech: string; ipa: string }>();
    for (const w of allWords) {
      const key = w.word.toLowerCase();
      if (!map.has(key)) {
        map.set(key, { vietnamese: w.vietnamese, partOfSpeech: w.partOfSpeech, ipa: w.ipa });
      }
    }
    return map;
  }, [allWords]);
  
  useEffect(() => {
    const handleSelection = () => {
      if (isModalOpen) return;
      
      // Delay slightly to let the selection finish updating
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          setPosition(null);
          return;
        }
        
        const text = selection.toString().trim();
        // Ignore if text is too long (likely not trying to select a vocab word) or empty
        if (!text || text.length > 60 || text.split(/\s+/).length > 6) {
          setPosition(null);
          return;
        }
        
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Don't show if the selection is somehow not visible or invalid bounds
        if (rect.width === 0 && rect.height === 0) {
          setPosition(null);
          return;
        }
        
        // Extract context sentence
        let context = '';
        if (selection.anchorNode) {
          const parentElement = selection.anchorNode.parentElement;
          if (parentElement) {
            context = parentElement.textContent || '';
          } else {
            context = selection.anchorNode.textContent || '';
          }
        }
        
        setSelectedText(text);
        setContextSentence(context.trim());
        
        setPosition({
          top: rect.top + window.scrollY - 10,
          left: rect.left + window.scrollX + rect.width / 2,
        });
      }, 50);
    };
    
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Shift' || e.key.startsWith('Arrow')) {
        handleSelection();
      }
    });
    
    // Hide when scrolling to prevent floating away
    const handleScroll = () => {
      if (position && !isModalOpen) {
        setPosition(null);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isModalOpen, position]);
  
  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
    setPosition(null);
    
    // Auto-fill from existing vocabulary
    const match = wordLookup.get(selectedText.toLowerCase());
    if (match) {
      setVietnamese(match.vietnamese);
      setPartOfSpeech(match.partOfSpeech);
      setMatchedIpa(match.ipa);
      setIsAutoFilled(true);
    } else {
      setVietnamese('');
      setPartOfSpeech('Danh từ');
      setMatchedIpa('');
      setIsAutoFilled(false);
    }
  };
  
  const handleSave = () => {
    addWord({
      word: selectedText,
      ipa: matchedIpa,
      vietnamese,
      partOfSpeech,
      category: 'Từ vựng mới (Lưu thủ công)',
      examples: contextSentence ? [contextSentence] : [],
      mnemonicTip: '',
      emoji: '',
      targetBand: '650+',
    });
    setIsModalOpen(false);
    window.getSelection()?.removeAllRanges();
  };
  
  return (
    <>
      {position && !isModalOpen && (
        <div 
          className={styles.toolbar}
          style={{ top: position.top, left: position.left }}
        >
          <button className={styles.toolbarBtn} onClick={handleOpenModal}>
            <FileTextIcon size={14} style={{ marginRight: 6 }} /> Lưu từ
          </button>
        </div>
      )}
      
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Thêm vào Sổ từ vựng</h3>
              <button onClick={() => setIsModalOpen(false)} className={styles.closeBtn}>
                <CloseIcon size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* Auto-match status badge */}
              <div className={`${styles.matchBadge} ${isAutoFilled ? styles.matchFound : styles.matchNotFound}`}>
                {isAutoFilled ? (
                  <><CheckCircleIcon size={14} /> Da tim thay trong kho tu vung</>
                ) : (
                  'Tu moi - Nhap thu cong'
                )}
              </div>
              
              <div className={styles.formGroup}>
                <label>Từ vựng (English)</label>
                <input type="text" value={selectedText} onChange={e => setSelectedText(e.target.value)} className={styles.input} />
                {matchedIpa && (
                  <div className={styles.ipaRow}>
                    <span className={styles.ipaText}>{matchedIpa}</span>
                  </div>
                )}
              </div>
              
              <div className={styles.formGroup}>
                <label>Nghĩa tiếng Việt</label>
                <input 
                  type="text" 
                  value={vietnamese} 
                  onChange={e => setVietnamese(e.target.value)} 
                  placeholder="Nhập nghĩa (vd: phát triển, cải thiện...)" 
                  className={styles.input} 
                  autoFocus={!isAutoFilled}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Từ loại</label>
                <select value={partOfSpeech} onChange={e => setPartOfSpeech(e.target.value)} className={styles.input}>
                  <option value="Danh từ">Danh từ (Noun)</option>
                  <option value="Động từ">Động từ (Verb)</option>
                  <option value="Tính từ">Tính từ (Adjective)</option>
                  <option value="Trạng từ">Trạng từ (Adverb)</option>
                  <option value="Cụm từ">Cụm từ (Phrase)</option>
                  <option value="noun/adj">Danh từ / Tính từ</option>
                  <option value="verb/noun">Động từ / Danh từ</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Ngữ cảnh (Câu chứa từ gốc)</label>
                <textarea 
                  value={contextSentence} 
                  onChange={e => setContextSentence(e.target.value)} 
                  className={styles.textarea}
                  rows={3}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>Hủy</button>
              <button onClick={handleSave} className={styles.saveBtn} disabled={!selectedText.trim() || !vietnamese.trim()}>
                Lưu vào sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
