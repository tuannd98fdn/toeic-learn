'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useVocabulary } from '@/hooks/useVocabulary';
import { 
  VolumeIcon, 
  CheckIcon, 
  PlusIcon, 
  CloseIcon, 
  BookmarkIcon, 
  SparklesIcon 
} from '@/components/icons/AppIcons';
import styles from './TextSelectionToolbar.module.css';

interface PopoverPosition {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
}

interface LookupResult {
  word: string;
  ipa: string;
  partOfSpeech: string;
  vietnamese: string;
  targetBand: string;
  example?: string;
  isLocalMatch: boolean;
}

// In-session cache for fast fallback queries
const sessionLookupCache = new Map<string, LookupResult>();

export default function TextSelectionToolbar() {
  const [position, setPosition] = useState<PopoverPosition | null>(null);
  const [selectedWord, setSelectedWord] = useState('');
  const [contextSentence, setContextSentence] = useState('');
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  
  const popoverRef = useRef<HTMLDivElement>(null);
  const { addWord, allWords, userWords } = useVocabulary();

  // O(1) map of local 400+ TOEIC vocabulary words
  const localWordMap = useMemo(() => {
    const map = new Map<string, {
      word: string;
      ipa: string;
      partOfSpeech: string;
      vietnamese: string;
      targetBand: string;
      examples: string[];
    }>();
    
    for (const w of allWords) {
      const key = w.word.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          word: w.word,
          ipa: w.ipa || '',
          partOfSpeech: w.partOfSpeech || 'Từ vựng',
          vietnamese: w.vietnamese || '',
          targetBand: w.targetBand || '650+',
          examples: w.examples || [],
        });
      }
    }
    return map;
  }, [allWords]);

  // Set of user-saved words for instant 'Saved' detection
  const userSavedSet = useMemo(() => {
    const set = new Set<string>();
    for (const w of userWords) {
      set.add(w.word.trim().toLowerCase());
    }
    return set;
  }, [userWords]);

  // Check if current word is already saved in notebook
  const isAlreadySaved = useMemo(() => {
    if (!selectedWord) return false;
    return justSaved || userSavedSet.has(selectedWord.toLowerCase());
  }, [selectedWord, justSaved, userSavedSet]);

  // Speak pronunciation using Web Speech API (0ms latency, native voices)
  const playAudio = useCallback((textToSpeak: string) => {
    if (!textToSpeak || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('US')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  // Fetch definition and translation
  const performLookup = useCallback(async (word: string, context: string) => {
    const clean = word.toLowerCase();
    
    // Tier 1: Check Local 400+ TOEIC Word Bank (0ms instant)
    const localMatch = localWordMap.get(clean);
    if (localMatch) {
      const result: LookupResult = {
        word: localMatch.word,
        ipa: localMatch.ipa,
        partOfSpeech: localMatch.partOfSpeech,
        vietnamese: localMatch.vietnamese,
        targetBand: localMatch.targetBand,
        example: localMatch.examples?.[0],
        isLocalMatch: true,
      };
      setLookupResult(result);
      setIsLoading(false);
      return;
    }

    // Tier 2: Check Session Cache
    if (sessionLookupCache.has(clean)) {
      setLookupResult(sessionLookupCache.get(clean)!);
      setIsLoading(false);
      return;
    }

    // Tier 3: Fetch from Quick Dict API (~150ms fallback)
    setIsLoading(true);
    try {
      const res = await fetch(`/api/quick-dict?word=${encodeURIComponent(clean)}`);
      if (res.ok) {
        const data = await res.json();
        const result: LookupResult = {
          word: data.word || word,
          ipa: data.ipa || '',
          partOfSpeech: data.partOfSpeech || 'Từ vựng',
          vietnamese: data.vietnamese || '',
          targetBand: 'Cơ bản',
          example: data.example || (context ? context.slice(0, 100) : undefined),
          isLocalMatch: false,
        };
        sessionLookupCache.set(clean, result);
        setLookupResult(result);
      } else {
        setLookupResult({
          word,
          ipa: '',
          partOfSpeech: 'Từ vựng',
          vietnamese: 'Chưa có bản dịch',
          targetBand: '',
          isLocalMatch: false,
        });
      }
    } catch (err) {
      setLookupResult({
        word,
        ipa: '',
        partOfSpeech: 'Từ vựng',
        vietnamese: 'Lỗi tra từ',
        targetBand: '',
        isLocalMatch: false,
      });
    } finally {
      setIsLoading(false);
    }
  }, [localWordMap]);

  // Handle text selection
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleSelection = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          setPosition(null);
          return;
        }

        // Avoid popover when selecting inside input or textarea
        const activeEl = document.activeElement;
        if (
          activeEl &&
          (activeEl.tagName === 'INPUT' ||
            activeEl.tagName === 'TEXTAREA' ||
            activeEl.getAttribute('contenteditable') === 'true')
        ) {
          setPosition(null);
          return;
        }

        const rawText = selection.toString().trim();
        // Clean leading and trailing punctuation (e.g. "revenue," -> "revenue")
        const cleanText = rawText.replace(/^[^\w]+|[^\w]+$/g, '').trim();

        // Only pop up for single words or short phrases (1 to 4 words, <= 40 chars)
        if (!cleanText || cleanText.length > 40 || cleanText.split(/\s+/).length > 4) {
          setPosition(null);
          return;
        }

        // Don't trigger on pure numbers or symbols
        if (!/[a-zA-Z]/.test(cleanText)) {
          setPosition(null);
          return;
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (rect.width === 0 && rect.height === 0) {
          setPosition(null);
          return;
        }

        // Extract context sentence
        let context = '';
        if (selection.anchorNode) {
          const parent = selection.anchorNode.parentElement;
          context = parent ? parent.textContent || '' : selection.anchorNode.textContent || '';
        }

        // Calculate positioning & Viewport Boundary Detection
        const popoverHeight = 180;
        const popoverWidth = 300;
        const fitsAbove = rect.top >= popoverHeight + 20;

        const placement: 'top' | 'bottom' = fitsAbove ? 'top' : 'bottom';
        const top = fitsAbove
          ? rect.top + window.scrollY - 10
          : rect.bottom + window.scrollY + 10;

        // Clamp horizontal position within viewport
        const centerLeft = rect.left + window.scrollX + rect.width / 2;
        const minLeft = popoverWidth / 2 + 16;
        const maxLeft = window.innerWidth - popoverWidth / 2 - 16;
        const left = Math.max(minLeft, Math.min(centerLeft, maxLeft));

        setSelectedWord(cleanText);
        setContextSentence(context.trim());
        setJustSaved(false);
        setPosition({ top, left, placement });

        // Trigger lookup
        performLookup(cleanText, context.trim());
      }, 80);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPosition(null);
        window.getSelection()?.removeAllRanges();
      }
      if (e.key === 'Shift' || e.key.startsWith('Arrow')) {
        handleSelection();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPosition(null);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [performLookup]);

  // Save word into personal notebook
  const handleSaveToNotebook = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lookupResult || isAlreadySaved) return;

    addWord({
      word: lookupResult.word,
      ipa: lookupResult.ipa || '',
      vietnamese: lookupResult.vietnamese || '',
      partOfSpeech: lookupResult.partOfSpeech || 'Từ vựng',
      category: 'Tra cứu nhanh trong bài',
      examples: lookupResult.example ? [lookupResult.example] : (contextSentence ? [contextSentence] : []),
      mnemonicTip: '',
      emoji: '',
      targetBand: (lookupResult.targetBand as any) || '650+',
    });

    setJustSaved(true);
  };

  if (!position) return null;

  return (
    <div
      ref={popoverRef}
      className={`${styles.popoverCard} ${
        position.placement === 'top' ? styles.placementTop : styles.placementBottom
      }`}
      style={{ top: position.top, left: position.left }}
    >
      {/* Popover Header */}
      <div className={styles.header}>
        <div className={styles.wordInfo}>
          <span className={styles.wordText}>{lookupResult ? lookupResult.word : selectedWord}</span>
          {lookupResult?.ipa && (
            <span className={styles.ipaText}>{lookupResult.ipa}</span>
          )}
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={`${styles.audioBtn} ${isSpeaking ? styles.speaking : ''}`}
            onClick={() => playAudio(lookupResult?.word || selectedWord)}
            title="Phát âm chuẩn bản xứ"
          >
            <VolumeIcon size={16} />
          </button>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setPosition(null)}
            title="Đóng (Esc)"
          >
            <CloseIcon size={14} />
          </button>
        </div>
      </div>

      {/* Popover Body: Meaning & Details */}
      <div className={styles.body}>
        {isLoading ? (
          <div className={styles.loadingSkeleton}>
            <div className={styles.skeletonLineShort}></div>
            <div className={styles.skeletonLine}></div>
          </div>
        ) : (
          <>
            <div className={styles.tagsRow}>
              {lookupResult?.partOfSpeech && (
                <span className={styles.posBadge}>{lookupResult.partOfSpeech}</span>
              )}
              {lookupResult?.targetBand && (
                <span className={styles.bandBadge}>TOEIC {lookupResult.targetBand}</span>
              )}
              {lookupResult?.isLocalMatch && (
                <span className={styles.officialBadge}>
                  <SparklesIcon size={11} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />
                  Cốt lõi ETS
                </span>
              )}
            </div>

            <div className={styles.meaningText}>
              {lookupResult?.vietnamese || 'Đang tải nghĩa...'}
            </div>

            {lookupResult?.example && (
              <div className={styles.exampleText}>
                &ldquo;{lookupResult.example}&rdquo;
              </div>
            )}
          </>
        )}
      </div>

      {/* Popover Footer: 1-Click Flashcard Save */}
      <div className={styles.footer}>
        <button
          type="button"
          className={`${styles.saveFlashcardBtn} ${isAlreadySaved ? styles.savedActive : ''}`}
          onClick={handleSaveToNotebook}
          disabled={isLoading || isAlreadySaved}
        >
          {isAlreadySaved ? (
            <>
              <CheckIcon size={14} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
              Đã lưu vào Flashcards
            </>
          ) : (
            <>
              <PlusIcon size={14} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
              Lưu vào Flashcards
            </>
          )}
        </button>
      </div>
    </div>
  );
}
