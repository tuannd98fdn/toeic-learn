'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { VocabularyWord, TargetBand } from '@/data/vocabulary';
import { 
  SearchIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  CloseIcon, 
  FileTextIcon, 
  TargetIcon, 
  LinkIcon, 
  BrainIcon 
} from '@/components/icons/AppIcons';
import styles from './SmartVocabQuickAdd.module.css';

interface SmartVocabQuickAddProps {
  allWords: VocabularyWord[];
  userWords: VocabularyWord[];
  onAddWord: (word: Omit<VocabularyWord, 'id' | 'source'>) => void;
  onClose: () => void;
}

export default function SmartVocabQuickAdd({
  allWords,
  userWords,
  onAddWord,
  onClose
}: SmartVocabQuickAddProps) {
  const [activeTab, setActiveTab] = useState<'quick' | 'batch' | 'manual'>('quick');
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick Add states
  const [inputWord, setInputWord] = useState('');
  const [previewWord, setPreviewWord] = useState<Omit<VocabularyWord, 'id' | 'source'> | null>(null);
  const [previewSource, setPreviewSource] = useState<'local' | 'ai'>('local');
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [notFoundInLocal, setNotFoundInLocal] = useState(false);
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Editable fields in preview
  const [editVietnamese, setEditVietnamese] = useState('');
  const [editIpa, setEditIpa] = useState('');
  const [editPartOfSpeech, setEditPartOfSpeech] = useState('noun');
  const [editCategory, setEditCategory] = useState('Doanh nghiệp');
  const [editTargetBand, setEditTargetBand] = useState<TargetBand>('650+');
  const [editExamples, setEditExamples] = useState('');
  const [editMnemonic, setEditMnemonic] = useState('');

  // Batch AI states
  const [aiInputType, setAiInputType] = useState<'text_list' | 'topic' | 'url'>('text_list');
  const [aiPayload, setAiPayload] = useState('');
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);
  const [generatedWords, setGeneratedWords] = useState<Omit<VocabularyWord, 'id' | 'source'>[]>([]);

  // Manual states
  const [manualWord, setManualWord] = useState('');
  const [manualVietnamese, setManualVietnamese] = useState('');
  const [manualIpa, setManualIpa] = useState('');
  const [manualPartOfSpeech, setManualPartOfSpeech] = useState('noun');
  const [manualCategory, setManualCategory] = useState('Custom');
  const [manualTargetBand, setManualTargetBand] = useState<TargetBand>('650+');
  const [manualExamples, setManualExamples] = useState('');
  const [manualMnemonic, setManualMnemonic] = useState('');

  // Lookup map for fast local matching
  const localMap = useMemo(() => {
    const map = new Map<string, VocabularyWord>();
    for (const w of allWords) {
      const key = w.word.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, w);
      }
    }
    return map;
  }, [allWords]);

  // Set of user-added words to detect duplicates
  const userWordSet = useMemo(() => {
    return new Set(userWords.map(w => w.word.trim().toLowerCase()));
  }, [userWords]);

  // Auto-focus input when opened
  useEffect(() => {
    if (activeTab === 'quick') {
      inputRef.current?.focus();
    }
  }, [activeTab]);

  // Debounced local search
  useEffect(() => {
    const trimmed = inputWord.trim();
    if (!trimmed) {
      setPreviewWord(null);
      setNotFoundInLocal(false);
      return;
    }

    const timer = setTimeout(() => {
      const match = localMap.get(trimmed.toLowerCase());
      if (match) {
        const enriched: Omit<VocabularyWord, 'id' | 'source'> = {
          word: match.word,
          ipa: match.ipa || '',
          vietnamese: match.vietnamese,
          partOfSpeech: match.partOfSpeech || 'noun',
          category: match.category || 'Doanh nghiệp',
          targetBand: match.targetBand || '650+',
          examples: match.examples || [],
          mnemonicTip: match.mnemonicTip || '',
          emoji: ''
        };
        setPreviewWord(enriched);
        setPreviewSource('local');
        setNotFoundInLocal(false);
        syncEditFields(enriched);
      } else {
        setPreviewWord(null);
        setNotFoundInLocal(true);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [inputWord, localMap]);

  const syncEditFields = (w: Omit<VocabularyWord, 'id' | 'source'>) => {
    setEditVietnamese(w.vietnamese);
    setEditIpa(w.ipa);
    setEditPartOfSpeech(w.partOfSpeech);
    setEditCategory(w.category);
    setEditTargetBand(w.targetBand || '650+');
    setEditExamples((w.examples || []).join('\n'));
    setEditMnemonic(w.mnemonicTip || '');
  };

  const handleFetchAI = async () => {
    const trimmed = inputWord.trim();
    if (!trimmed || isSearchingAI) return;

    setIsSearchingAI(true);
    setNotFoundInLocal(false);

    try {
      const res = await fetch('/api/generate-vocab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'single_word', payload: trimmed })
      });

      const data = await res.json();
      if (data.words && data.words.length > 0) {
        const wordData = data.words[0];
        const enriched: Omit<VocabularyWord, 'id' | 'source'> = {
          word: wordData.word || trimmed,
          ipa: wordData.ipa || '',
          vietnamese: wordData.vietnamese || '',
          partOfSpeech: wordData.partOfSpeech || 'noun',
          category: wordData.category || 'Doanh nghiệp',
          targetBand: wordData.targetBand || '650+',
          examples: wordData.examples || [],
          mnemonicTip: wordData.mnemonicTip || '',
          emoji: ''
        };
        setPreviewWord(enriched);
        setPreviewSource('ai');
        syncEditFields(enriched);
      } else {
        alert(data.error || 'Không tìm thấy thông tin từ vựng.');
      }
    } catch (err) {
      console.error('AI fetch failed:', err);
      alert('Có lỗi xảy ra khi tra cứu với AI.');
    } finally {
      setIsSearchingAI(false);
    }
  };

  const handleQuickSave = () => {
    if (!previewWord) return;

    const finalWord: Omit<VocabularyWord, 'id' | 'source'> = {
      ...previewWord,
      vietnamese: editVietnamese.trim() || previewWord.vietnamese,
      ipa: editIpa.trim() || previewWord.ipa,
      partOfSpeech: editPartOfSpeech || previewWord.partOfSpeech,
      category: editCategory.trim() || previewWord.category,
      targetBand: editTargetBand || previewWord.targetBand,
      examples: editExamples ? editExamples.split('\n').filter(e => e.trim()) : previewWord.examples,
      mnemonicTip: editMnemonic.trim() || previewWord.mnemonicTip
    };

    onAddWord(finalWord);

    const savedName = finalWord.word;
    setSuccessToast(`Đã lưu "${savedName}" vào sổ từ vựng thành công!`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3000);

    // Reset input for next word
    setInputWord('');
    setPreviewWord(null);
    setShowEditDetails(false);
    setNotFoundInLocal(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (previewWord) {
        handleQuickSave();
      } else if (inputWord.trim() && !isSearchingAI) {
        handleFetchAI();
      }
    }
  };

  // Batch AI logic
  const handleGenerateBatchAI = async () => {
    if (!aiPayload.trim() || isGeneratingBatch) return;
    setIsGeneratingBatch(true);
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
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi tạo từ vựng.');
    } finally {
      setIsGeneratingBatch(false);
    }
  };

  const handleSaveBatch = () => {
    generatedWords.forEach(word => {
      onAddWord({ ...word, examples: word.examples || [] });
    });
    setGeneratedWords([]);
    setAiPayload('');
    onClose();
  };

  // Manual save logic
  const handleManualSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualWord || !manualVietnamese) return;

    onAddWord({
      word: manualWord.trim(),
      vietnamese: manualVietnamese.trim(),
      ipa: manualIpa.trim(),
      partOfSpeech: manualPartOfSpeech,
      category: manualCategory.trim() || 'Custom',
      targetBand: manualTargetBand,
      examples: manualExamples ? manualExamples.split('\n').filter(ex => ex.trim()) : [],
      mnemonicTip: manualMnemonic.trim(),
      emoji: ''
    });

    setManualWord('');
    setManualVietnamese('');
    setManualIpa('');
    setManualExamples('');
    setManualMnemonic('');
    onClose();
  };

  const isDuplicateInUser = previewWord ? userWordSet.has(previewWord.word.trim().toLowerCase()) : false;

  return (
    <div className={`${styles.container} animate-scale-in`}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h2 className={styles.title}>Thêm từ vựng mới</h2>
          <p className={styles.subtitle}>Gõ từ tiếng Anh để tự động điền nghĩa, phiên âm và ví dụ TOEIC tức thì.</p>
        </div>
        <button className={styles.closeBtn} onClick={onClose} title="Đóng">
          <CloseIcon size={18} />
        </button>
      </header>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'quick' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('quick')}
        >
          <SparklesIcon size={16} /> Thêm nhanh (1-Click)
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'batch' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('batch')}
        >
          <BrainIcon size={16} /> Tạo hàng loạt (AI)
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'manual' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('manual')}
        >
          <FileTextIcon size={16} /> Nhập thủ công
        </button>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className={styles.successBanner}>
          <CheckCircleIcon size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {/* ══════════════ TAB 1: QUICK ADD ══════════════ */}
      {activeTab === 'quick' && (
        <div className={styles.quickAddSection}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputIcon}>
              <SearchIcon size={20} />
            </div>
            <input
              ref={inputRef}
              type="text"
              className={styles.mainInput}
              placeholder="Gõ từ tiếng Anh (ví dụ: revenue, schedule, evaluate)..."
              value={inputWord}
              onChange={e => setInputWord(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSearchingAI}
            />
            {notFoundInLocal && (
              <button
                type="button"
                className={styles.aiTriggerBtn}
                onClick={handleFetchAI}
                disabled={isSearchingAI || !inputWord.trim()}
              >
                <SparklesIcon size={16} />
                {isSearchingAI ? 'Đang tra cứu...' : 'Tra cứu với AI'}
              </button>
            )}
          </div>

          {/* AI Loading State */}
          {isSearchingAI && (
            <div className={styles.loadingBox}>
              <BrainIcon size={24} className={styles.spinningIcon} />
              <span>AI đang phân tích ngữ cảnh đề thi TOEIC và tạo flashcard...</span>
            </div>
          )}

          {/* Not Found In Local Notice */}
          {notFoundInLocal && !isSearchingAI && !previewWord && (
            <div className={styles.notFoundBox}>
              <p className={styles.notFoundText}>
                Từ <strong>&quot;{inputWord}&quot;</strong> chưa có trong kho từ điển TOEIC nội bộ.
              </p>
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={handleFetchAI}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <SparklesIcon size={15} /> Tự động điền với AI (Nhấn Enter)
              </button>
            </div>
          )}

          {/* Enriched Preview Card */}
          {previewWord && !isSearchingAI && (
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <div className={styles.previewWordTitle}>
                  <span className={styles.wordText}>{previewWord.word}</span>
                  {previewWord.ipa && <span className={styles.ipaText}>{previewWord.ipa}</span>}
                  {previewWord.partOfSpeech && (
                    <span className={styles.posBadge}>{previewWord.partOfSpeech}</span>
                  )}
                </div>

                <div className={styles.previewBadges}>
                  <span className={`${styles.sourceBadge} ${previewSource === 'local' ? styles.sourceBadgeLocal : styles.sourceBadgeAi}`}>
                    {previewSource === 'local' ? 'Kho hệ thống' : 'AI phân tích'}
                  </span>
                  {isDuplicateInUser && (
                    <span className={`${styles.sourceBadge} ${styles.duplicateBadge}`}>
                      Đã có trong sổ từ
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.previewMeaning}>
                {editVietnamese || previewWord.vietnamese}
              </div>

              {previewWord.examples && previewWord.examples.length > 0 && (
                <div className={styles.previewExamples}>
                  {previewWord.examples.map((ex, idx) => (
                    <div key={idx} className={styles.exampleItem}>
                      • &quot;{ex}&quot;
                    </div>
                  ))}
                </div>
              )}

              {previewWord.mnemonicTip && (
                <div className={styles.previewMnemonic}>
                  <strong>Mẹo nhớ:</strong> {previewWord.mnemonicTip}
                </div>
              )}

              <div className={styles.previewMeta}>
                <span>Chủ đề: {previewWord.category}</span>
                <span>Band: {previewWord.targetBand || '650+'}</span>
              </div>

              {/* Inline Editable Drawer */}
              {showEditDetails && (
                <div className={styles.inlineEditForm}>
                  <div className={styles.editInputRow}>
                    <input
                      type="text"
                      className={styles.editInput}
                      placeholder="Nghĩa tiếng Việt"
                      value={editVietnamese}
                      onChange={e => setEditVietnamese(e.target.value)}
                    />
                    <input
                      type="text"
                      className={styles.editInput}
                      placeholder="Phiên âm IPA"
                      value={editIpa}
                      onChange={e => setEditIpa(e.target.value)}
                    />
                    <input
                      type="text"
                      className={styles.editInput}
                      placeholder="Từ loại"
                      value={editPartOfSpeech}
                      onChange={e => setEditPartOfSpeech(e.target.value)}
                    />
                  </div>
                  <textarea
                    className={`${styles.editInput} ${styles.editTextarea}`}
                    placeholder="Câu ví dụ (mỗi dòng 1 câu)"
                    value={editExamples}
                    onChange={e => setEditExamples(e.target.value)}
                  />
                  <input
                    type="text"
                    className={styles.editInput}
                    placeholder="Mẹo nhớ tiếng Việt"
                    value={editMnemonic}
                    onChange={e => setEditMnemonic(e.target.value)}
                  />
                </div>
              )}

              <div className={styles.previewActions}>
                <button
                  type="button"
                  className={styles.editToggleBtn}
                  onClick={() => setShowEditDetails(!showEditDetails)}
                >
                  {showEditDetails ? 'Thu gọn chỉnh sửa' : 'Chỉnh sửa chi tiết'}
                </button>

                <button
                  type="button"
                  className={styles.saveBtn}
                  onClick={handleQuickSave}
                >
                  <CheckCircleIcon size={18} />
                  {isDuplicateInUser ? 'Lưu thêm bản ghi (Enter)' : 'Lưu vào sổ từ (Enter)'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════ TAB 2: BATCH AI ══════════════ */}
      {activeTab === 'batch' && (
        <div className={styles.batchSection}>
          <div className={styles.aiInputTypes}>
            <button
              type="button"
              className={`${styles.aiTypeBtn} ${aiInputType === 'text_list' ? styles.activeAiType : ''}`}
              onClick={() => setAiInputType('text_list')}
            >
              <FileTextIcon size={16} /> Từ danh sách chữ
            </button>
            <button
              type="button"
              className={`${styles.aiTypeBtn} ${aiInputType === 'topic' ? styles.activeAiType : ''}`}
              onClick={() => setAiInputType('topic')}
            >
              <TargetIcon size={16} /> Theo chủ đề TOEIC
            </button>
            <button
              type="button"
              className={`${styles.aiTypeBtn} ${aiInputType === 'url' ? styles.activeAiType : ''}`}
              onClick={() => setAiInputType('url')}
            >
              <LinkIcon size={16} /> Từ link bài báo
            </button>
          </div>

          <textarea
            className={styles.batchTextarea}
            placeholder={
              aiInputType === 'text_list'
                ? "Dán danh sách các từ tiếng Anh (ví dụ: revenue, budget, evaluate)..."
                : aiInputType === 'topic'
                ? "Nhập chủ đề muốn học (ví dụ: Sân bay, Ký hợp đồng, Marketing, Khách sạn)..."
                : "Dán đường link bài báo hoặc trang web (ví dụ: https://www.bbc.com/...)"
            }
            value={aiPayload}
            onChange={e => setAiPayload(e.target.value)}
            disabled={isGeneratingBatch}
          />

          <div className={styles.batchActions}>
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={onClose}
              disabled={isGeneratingBatch}
            >
              Hủy
            </button>
            <button
              type="button"
              className="btn-primary btn-sm"
              onClick={handleGenerateBatchAI}
              disabled={isGeneratingBatch || !aiPayload.trim()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <SparklesIcon size={15} />
              {isGeneratingBatch ? 'Đang tạo...' : 'Bắt đầu tạo'}
            </button>
          </div>

          {isGeneratingBatch && (
            <div className={styles.loadingBox}>
              <BrainIcon size={24} className={styles.spinningIcon} />
              <span>AI đang phân tích và tạo flashcard hàng loạt...</span>
            </div>
          )}

          {generatedWords.length > 0 && !isGeneratingBatch && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0 8px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Đã tạo {generatedWords.length} từ vựng!</h4>
                <button type="button" onClick={handleSaveBatch} className="btn-success btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircleIcon size={16} /> Lưu tất cả vào thư viện
                </button>
              </div>
              <div className={styles.resultsList}>
                {generatedWords.map((word, idx) => (
                  <div key={idx} className={styles.resultItem}>
                    <div className={styles.resultHeader}>
                      <span className={styles.resultWord}>{word.word}</span>
                      {word.ipa && <span className={styles.resultIpa}>{word.ipa}</span>}
                    </div>
                    <div className={styles.resultMeaning}>{word.vietnamese}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════ TAB 3: MANUAL FORM ══════════════ */}
      {activeTab === 'manual' && (
        <form onSubmit={handleManualSave} className={styles.manualForm}>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Từ vựng tiếng Anh (Ví dụ: delegate)"
              required
              value={manualWord}
              onChange={e => setManualWord(e.target.value)}
              className={styles.formInput}
            />
            <input
              type="text"
              placeholder="Nghĩa tiếng Việt"
              required
              value={manualVietnamese}
              onChange={e => setManualVietnamese(e.target.value)}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Phiên âm (/ˈdelɪɡət/)"
              value={manualIpa}
              onChange={e => setManualIpa(e.target.value)}
              className={styles.formInput}
            />
            <input
              type="text"
              placeholder="Từ loại (Danh từ, Động từ...)"
              value={manualPartOfSpeech}
              onChange={e => setManualPartOfSpeech(e.target.value)}
              className={styles.formInput}
            />
            <input
              type="text"
              placeholder="Chủ đề (ví dụ: Nhân sự)"
              value={manualCategory}
              onChange={e => setManualCategory(e.target.value)}
              className={styles.formInput}
            />
            <select
              value={manualTargetBand}
              onChange={e => setManualTargetBand(e.target.value as TargetBand)}
              className={styles.formInput}
            >
              <option value="450+">Band 450+</option>
              <option value="650+">Band 650+</option>
              <option value="800+">Band 800+</option>
            </select>
          </div>
          <textarea
            placeholder="Các câu ví dụ TOEIC (mỗi dòng 1 ví dụ)"
            value={manualExamples}
            onChange={e => setManualExamples(e.target.value)}
            className={`${styles.formInput} ${styles.formTextarea}`}
          />
          <input
            type="text"
            placeholder="Mẹo nhớ tiếng Việt"
            value={manualMnemonic}
            onChange={e => setManualMnemonic(e.target.value)}
            className={styles.formInput}
          />
          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className="btn-secondary btn-sm">
              Hủy
            </button>
            <button type="submit" className="btn-primary btn-sm">
              Lưu từ vựng
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
