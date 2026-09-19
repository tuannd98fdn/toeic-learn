'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { VocabularyWord } from '@/data/vocabulary';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useAudio } from '@/hooks/useAudio';
import Link from 'next/link';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import { isDueForReview } from '@/utils/spacedRepetition';
import ExamMistakeList from './ExamMistakeList';
import SessionHistoryList from './SessionHistoryList';
import styles from './page.module.css';
import {
  BotIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  VolumeIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ZapIcon,
} from '@/components/icons/AppIcons';

export default function NotebookPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải Sổ tay lỗi sai...</div>}>
      <NotebookContent />
    </Suspense>
  );
}

function getBoxLabel(box?: number): string {
  switch (box) {
    case 2:
      return 'Hộp 2 • Ôn 2 ngày';
    case 3:
      return 'Hộp 3 • Ôn 4 ngày';
    case 4:
      return 'Hộp 4 • Ôn 7 ngày';
    case 5:
      return 'Hộp 5 • Nắm vững';
    case 1:
    default:
      return 'Hộp 1 • Ôn mỗi ngày';
  }
}

function NotebookContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get('tab') === 'exam' || searchParams?.get('subCategory') ? 'exam' : 'vocabulary';

  const { mounted: vocabMounted, allWords } = useVocabulary();
  const {
    mounted: notebookMounted,
    getMistakes,
    mistakes,
    removeMistake,
    updateMistakeRootCause,
    masterMistake,
    unmasterMistake
  } = useMistakeNotebook();

  const { speak, speaking } = useAudio();
  const [activeSpeakingWord, setActiveSpeakingWord] = useState<string | null>(null);

  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'exam' | 'history'>(initialTab);
  const [vocabFilterMode, setVocabFilterMode] = useState<'all' | 'due'>('all');
  const [vocabSearchQuery, setVocabSearchQuery] = useState('');
  const [expandedWordIds, setExpandedWordIds] = useState<Record<string, boolean>>({});

  if (!vocabMounted || !notebookMounted) {
    return <div className={styles.loading}>Đang khởi tạo sổ tay...</div>;
  }

  const mistakeIds = getMistakes();
  
  const vocabMistakeIds = mistakeIds.filter(id => !mistakes[id]?.type || mistakes[id]?.type === 'vocabulary');
  const examMistakeIds = mistakeIds.filter(id => mistakes[id]?.type === 'exam');

  // Get full word data and sort by wrongCount descending
  const mistakeWords = (vocabMistakeIds
    .map(id => {
      const word = allWords.find(w => w.id === id);
      return word ? { ...word, wrongCount: mistakes[id].wrongCount } : null;
    })
    .filter(w => w !== null)) as (VocabularyWord & { wrongCount: number })[];
    
  mistakeWords.sort((a, b) => b.wrongCount - a.wrongCount);

  const vocabDueCount = vocabMistakeIds.filter(
    id => mistakes[id]?.nextReviewDate && isDueForReview(mistakes[id].nextReviewDate)
  ).length;

  const examDueCount = examMistakeIds.filter(
    id => mistakes[id]?.nextReviewDate && isDueForReview(mistakes[id].nextReviewDate)
  ).length;

  const filteredMistakeWords = mistakeWords.filter(word => {
    const m = mistakes[word.id];
    if (vocabFilterMode === 'due') {
      const due = m?.nextReviewDate ? isDueForReview(m.nextReviewDate) : false;
      if (!due) return false;
    }
    if (vocabSearchQuery.trim()) {
      const q = vocabSearchQuery.toLowerCase().trim();
      const matchWord = word.word.toLowerCase().includes(q);
      const matchMeaning = word.vietnamese.toLowerCase().includes(q);
      return matchWord || matchMeaning;
    }
    return true;
  });

  const handleSpeak = (text: string) => {
    setActiveSpeakingWord(text);
    speak(text);
    setTimeout(() => setActiveSpeakingWord(null), 1200);
  };

  const toggleWordDetails = (id: string) => {
    setExpandedWordIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeftIcon size={16} />
          <span>Quay lại</span>
        </Link>
        <h1>Sổ tay lỗi sai</h1>
        <p className={styles.subtitle}>
          Bạn đang có {vocabMistakeIds.length} từ vựng ({vocabDueCount} đến hạn) và {examMistakeIds.length} câu hỏi đề thi ({examDueCount} đến hạn) cần ôn tập.
        </p>
      </header>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'vocabulary' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('vocabulary')}
        >
          Từ vựng ({vocabMistakeIds.length})
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'exam' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('exam')}
        >
          Đề thi ({examMistakeIds.length})
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'history' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Lịch Sử & Chat AI
        </button>
      </div>

      {activeTab === 'vocabulary' && (
        <>
          {vocabMistakeIds.length === 0 ? (
            <div className={`${styles.emptyState} card-minimal animate-slide-up`}>
              <div className={styles.emptyIcon}><CheckCircleIcon size={48} /></div>
              <h2>Sổ tay trống rỗng!</h2>
              <p>Tuyệt vời, bạn chưa mắc lỗi từ vựng nào.<br/>Hãy tiếp tục học từ vựng mới để mở rộng vốn từ nhé!</p>
              <div className={styles.actions}>
                <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
                <Link href="/study" className={styles.primaryBtn}>Học từ vựng mới</Link>
              </div>
            </div>
          ) : (
            <>
              <section className={styles.actionSection}>
                <div className={`${styles.ctaCard} card-minimal`}>
                  <h2>Sẵn sàng "chuộc lỗi"?</h2>
                  <p>
                    Bạn có <strong>{vocabDueCount}</strong> từ vựng đến hạn ôn tập hôm nay
                    {vocabMistakeIds.length > vocabDueCount && (
                      <> (trong tổng số <strong>{vocabMistakeIds.length}</strong> từ sai)</>
                    )}.
                  </p>
                  <div className={styles.ctaButtonsRow}>
                    <Link href="/notebook/quiz" className={`${styles.primaryBtn} btn-accent`}>
                      <ZapIcon size={16} />
                      <span>Bắt đầu test chuộc lỗi</span>
                    </Link>
                    {vocabDueCount > 0 && (
                      <button
                        type="button"
                        className={styles.secondaryBtn}
                        onClick={() => setVocabFilterMode('due')}
                      >
                        Chỉ xem từ đến hạn ({vocabDueCount})
                      </button>
                    )}
                  </div>
                </div>
              </section>

              <section className={styles.listSection}>
                <div className={styles.listHeaderRow}>
                  <h2>Danh sách từ cần ôn</h2>
                  <div className={styles.vocabControlsBar}>
                    <div className={styles.vocabSearchWrapper}>
                      <span className={styles.vocabSearchIcon}>
                        <SearchIcon size={16} />
                      </span>
                      <input
                        type="text"
                        placeholder="Tìm từ vựng, nghĩa tiếng Việt..."
                        value={vocabSearchQuery}
                        onChange={(e) => setVocabSearchQuery(e.target.value)}
                        className={styles.vocabSearchInput}
                      />
                    </div>
                    <div className={styles.vocabFilterPills}>
                      <button
                        type="button"
                        className={`${styles.vocabFilterBtn} ${vocabFilterMode === 'all' ? styles.vocabFilterBtnActive : ''}`}
                        onClick={() => setVocabFilterMode('all')}
                      >
                        Tất cả ({mistakeWords.length})
                      </button>
                      <button
                        type="button"
                        className={`${styles.vocabFilterBtn} ${vocabFilterMode === 'due' ? styles.vocabFilterBtnActive : ''}`}
                        onClick={() => setVocabFilterMode('due')}
                      >
                        Đến hạn ({vocabDueCount})
                      </button>
                    </div>
                  </div>
                </div>

                {filteredMistakeWords.length === 0 ? (
                  <div className={`${styles.emptyState} card-minimal`}>
                    <p>Không tìm thấy từ vựng nào khớp với bộ lọc hiện tại.</p>
                    <button 
                      type="button" 
                      onClick={() => { setVocabSearchQuery(''); setVocabFilterMode('all'); }}
                      className={styles.secondaryBtn}
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                ) : (
                  <div className={styles.wordGrid}>
                    {filteredMistakeWords.map(word => {
                      const m = mistakes[word.id];
                      const isDue = m?.nextReviewDate ? isDueForReview(m.nextReviewDate) : false;
                      const box = m?.box || 1;
                      const isExpanded = Boolean(expandedWordIds[word.id]);
                      const hasDetails = Boolean(word.mnemonicTip || (word.examples && word.examples.length > 0));

                      return (
                        <div key={word.id} className={`${styles.wordCard} card-minimal`}>
                          <div className={styles.wordHeader}>
                            <div className={styles.wordTitleGroup}>
                              <span className={styles.wordTitle}>{word.word}</span>
                              <button
                                type="button"
                                onClick={() => handleSpeak(word.word)}
                                className={`${styles.pronounceBtn} ${activeSpeakingWord === word.word && speaking ? styles.pronounceBtnSpeaking : ''}`}
                                title={`Nghe phát âm ${word.word}`}
                                aria-label={`Nghe phát âm ${word.word}`}
                              >
                                <VolumeIcon size={15} />
                              </button>
                            </div>
                            <div className={styles.badgesGroup}>
                              <span className={styles.boxBadge}>{getBoxLabel(box)}</span>
                              {isDue && <span className={styles.dueBadge}>Tới hạn ôn</span>}
                              <span className={styles.wrongCountBadge}>Sai {word.wrongCount} lần</span>
                            </div>
                          </div>

                          {word.ipa && <p className={styles.wordIpa}>{word.ipa}</p>}
                          <p className={styles.wordMeaning}>{word.vietnamese}</p>
                          <p className={styles.wordType}>{word.partOfSpeech}</p>

                          {hasDetails && (
                            <button
                              type="button"
                              className={styles.toggleDetailsBtn}
                              onClick={() => toggleWordDetails(word.id)}
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUpIcon size={14} />
                                  <span>Ẩn mẹo nhớ & ví dụ</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDownIcon size={14} />
                                  <span>Xem mẹo nhớ & ví dụ</span>
                                </>
                              )}
                            </button>
                          )}

                          {isExpanded && (
                            <>
                              {word.mnemonicTip && (
                                <div className={styles.mnemonicBox}>
                                  <strong>Mẹo nhớ:</strong> {word.mnemonicTip}
                                </div>
                              )}
                              {word.examples && word.examples[0] && (
                                <div className={styles.exampleBox}>
                                  "{word.examples[0]}"
                                </div>
                              )}
                            </>
                          )}

                          <div className={styles.wordActionsRow}>
                            <button
                              type="button"
                              onClick={() => setTutorContext({
                                partTitle: 'Sổ tay lỗi sai: Từ vựng TOEIC',
                                text: `Từ vựng hay quên: "${word.word}" (${word.ipa}) - ${word.partOfSpeech}. Nghĩa tiếng Việt: "${word.vietnamese}". Thí sinh đã sai ${word.wrongCount} lần. Ví dụ: "${word.examples[0] || ''}". Mẹo nhớ: "${word.mnemonicTip}".`,
                                options: {
                                  A: word.vietnamese,
                                  B: 'Gợi ý mẹo nhớ từ vựng lâu (Mnemonic)',
                                  C: 'Cụm từ (Collocations) hay xuất hiện trong đề thi TOEIC',
                                  D: 'Các bẫy từ loại thường gặp liên quan đến từ này'
                                },
                                correctAnswer: 'A',
                                explanation: `Ví dụ mẫu TOEIC: ${word.examples[0] || ''}. Mẹo: ${word.mnemonicTip}`
                              })}
                              className={styles.tutorBtn}
                            >
                              <BotIcon size={15} />
                              <span>Hỏi Gia sư cách nhớ</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => removeMistake(word.id)}
                              className={styles.masterWordBtn}
                              title="Xóa từ này khỏi danh sách từ sai"
                            >
                              <CheckCircleIcon size={14} />
                              <span>Đã thuộc</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </>
          )}
        </>
      )}

      {activeTab === 'exam' && (
        <>
          {examMistakeIds.length === 0 ? (
            <div className={`${styles.emptyState} card-minimal animate-slide-up`}>
              <div className={styles.emptyIcon}><CheckCircleIcon size={48} /></div>
              <h2>Sổ tay trống rỗng!</h2>
              <p>Tuyệt vời, bạn chưa có lỗi sai nào trong đề thi.<br/>Hãy thử sức với một bài thi mới để kiểm tra trình độ nhé!</p>
              <div className={styles.actions}>
                <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
                <Link href="/exam" className={styles.primaryBtn}>Thi thử ngay</Link>
              </div>
            </div>
          ) : (
            <section className={styles.listSection}>
              <ExamMistakeList 
                mistakeIds={examMistakeIds} 
                mistakes={mistakes} 
                updateMistakeRootCause={updateMistakeRootCause}
                masterMistake={masterMistake}
                unmasterMistake={unmasterMistake}
              />
            </section>
          )}
        </>
      )}

      {activeTab === 'history' && (
        <section className={styles.listSection}>
          <h2>Lịch sử các phiên học</h2>
          <SessionHistoryList />
        </section>
      )}

      {tutorContext && (
        <AITutorDrawer
          isOpen={!!tutorContext}
          onClose={() => setTutorContext(null)}
          questionContext={tutorContext}
        />
      )}
    </div>
  );
}

