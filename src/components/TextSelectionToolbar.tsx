'use client';
import { useState, useEffect, useMemo } from 'react';
import { useVocabulary } from '@/hooks/useVocabulary';
import { CloseIcon, FileTextIcon, CheckCircleIcon, VolumeIcon, ZapIcon } from '@/components/icons/AppIcons';
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
  const [isAIFetching, setIsAIFetching] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
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
  
  const handleOpenModal = async (e: React.MouseEvent) => {
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
      setIsAIFetching(false);
    } else {
      setVietnamese('');
      setPartOfSpeech('Danh từ');
      setMatchedIpa('');
      setIsAutoFilled(false);
      setIsAIFetching(true);
      
      try {
        const res = await fetch('/api/generate-vocab', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'context_word',
            payload: { word: selectedText, context: contextSentence }
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.words && data.words.length > 0) {
            const wordData = data.words[0];
            setVietnamese(wordData.vietnamese);
            const posMap: Record<string, string> = {
              noun: 'Danh từ', verb: 'Động từ', adjective: 'Tính từ', adverb: 'Trạng từ',
              preposition: 'Giới từ', conjunction: 'Liên từ', idiom: 'Thành ngữ', 'phrasal verb': 'Cụm động từ'
            };
            setPartOfSpeech(posMap[wordData.partOfSpeech] || 'Danh từ');
            setMatchedIpa(wordData.ipa);
          }
        }
      } catch (error) {
        console.error('Failed to fetch AI vocab', error);
      } finally {
        setIsAIFetching(false);
      }
    }
  };

  const handleQuickSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setPosition(null);
    setToastMessage('Đang dịch tự động...');
    
    try {
      // 1. Check if it's already in DB
      const match = wordLookup.get(selectedText.toLowerCase());
      if (match) {
        setToastMessage('Từ này đã có trong sổ!');
        setTimeout(() => setToastMessage(''), 2000);
        return;
      }
      
      // 2. Fetch AI translation
      const res = await fetch('/api/generate-vocab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'context_word',
          payload: { word: selectedText, context: contextSentence }
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.words && data.words.length > 0) {
          const wordData = data.words[0];
          const posMap: Record<string, string> = {
            noun: 'Danh từ', verb: 'Động từ', adjective: 'Tính từ', adverb: 'Trạng từ',
            preposition: 'Giới từ', conjunction: 'Liên từ', idiom: 'Thành ngữ', 'phrasal verb': 'Cụm động từ'
          };
          
          // 3. Save to DB directly
          addWord({
            word: selectedText,
            ipa: wordData.ipa,
            vietnamese: wordData.vietnamese,
            partOfSpeech: posMap[wordData.partOfSpeech] || 'Danh từ',
            category: 'Lưu nhanh bằng AI',
            examples: contextSentence ? [contextSentence] : [],
            mnemonicTip: '',
            emoji: '',
            targetBand: '650+',
          });
          
          setToastMessage(`Đã lưu: ${selectedText} - ${wordData.vietnamese}`);
        } else {
          setToastMessage('Lỗi dịch từ vựng');
        }
      }
    } catch (error) {
      setToastMessage('Lỗi kết nối mạng');
    }
    
    window.getSelection()?.removeAllRanges();
    setTimeout(() => setToastMessage(''), 3000);
  };
  
  const playAudio = () => {
    if (!selectedText) return;
    // Ngắt các âm thanh đang phát (nếu có) để tránh đè nhau
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
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
          <div className={styles.toolbarButtonGroup}>
            <button className={styles.toolbarBtnQuick} onClick={handleQuickSave}>
              <ZapIcon size={14} style={{ marginRight: 6 }} /> Lưu Nhanh
            </button>
            <div className={styles.toolbarDivider}></div>
            <button className={styles.toolbarBtn} onClick={handleOpenModal} title="Xem và sửa">
              <FileTextIcon size={14} />
            </button>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toastNotification}>
          {toastMessage}
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
              <div className={`${styles.matchBadge} ${isAutoFilled ? styles.matchFound : (isAIFetching ? styles.matchPending : styles.matchNotFound)}`}>
                {isAutoFilled ? (
                  <><CheckCircleIcon size={14} /> Đã lưu trong kho từ vựng</>
                ) : isAIFetching ? (
                  <>Đang phân tích nghĩa bằng AI...</>
                ) : (
                  <>AI đã tự động điền (Bạn có thể sửa)</>
                )}
              </div>
              
              <div className={styles.formGroup}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ margin: 0 }}>Từ vựng (English)</label>
                  <button type="button" onClick={playAudio} className={styles.audioBtn} title="Nghe phát âm">
                    <VolumeIcon size={16} /> Phát âm
                  </button>
                </div>
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
                  className={`${styles.input} ${isAIFetching ? styles.loadingInput : ''}`}
                  autoFocus={!isAutoFilled}
                  disabled={isAIFetching}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Từ loại</label>
                <select 
                  value={partOfSpeech} 
                  onChange={e => setPartOfSpeech(e.target.value)} 
                  className={`${styles.input} ${isAIFetching ? styles.loadingInput : ''}`}
                  disabled={isAIFetching}
                >
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
                <button className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Hủy</button>
                <button 
                  className={styles.saveBtn} 
                  onClick={handleSave} 
                  disabled={!vietnamese.trim() || isAIFetching}
                >
                  {isAIFetching ? 'Đang dịch...' : 'Lưu vào sổ'}
                </button>
              </div>
          </div>
        </div>
      )}
    </>
  );
}
