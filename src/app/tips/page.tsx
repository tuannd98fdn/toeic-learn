'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  LightbulbIcon,
  SearchIcon,
  AlertCircleIcon,
  TargetIcon,
  BookIcon,
  ZapIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CheckCircleIcon,
  CheckIcon,
  CopyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
} from '@/components/icons/AppIcons';
import { TOEIC_TIPS, TipType, TargetBand, ToeicPart } from '@/data/strategies';
import { useTipsMastery } from '@/hooks/useTipsMastery';
import styles from './page.module.css';

const PART_OPTIONS: { label: string; value: 'all' | ToeicPart }[] = [
  { label: 'Tất cả Part', value: 'all' },
  { label: 'Part 1: Tranh', value: 'Part 1' },
  { label: 'Part 2: Hỏi - Đáp', value: 'Part 2' },
  { label: 'Part 3: Hội thoại', value: 'Part 3' },
  { label: 'Part 4: Bài nói', value: 'Part 4' },
  { label: 'Part 5: Điền câu', value: 'Part 5' },
  { label: 'Part 6: Đoạn văn', value: 'Part 6' },
  { label: 'Part 7: Đọc hiểu', value: 'Part 7' },
  { label: 'General: Tổng quát', value: 'General' },
];

const TYPE_OPTIONS: { label: string; value: 'all' | TipType }[] = [
  { label: 'Tất cả loại', value: 'all' },
  { label: 'Bẫy đề thi (Traps)', value: 'trap' },
  { label: 'Chiến thuật làm bài (Strategies)', value: 'strategy' },
  { label: 'Ngữ pháp cốt tử (Grammar)', value: 'grammar' },
];

const BAND_OPTIONS: { label: string; value: 'all' | TargetBand }[] = [
  { label: 'Tất cả Band', value: 'all' },
  { label: 'Mục tiêu 450+', value: '450+' },
  { label: 'Mục tiêu 650+', value: '650+' },
  { label: 'Mục tiêu 800+', value: '800+' },
];

type QuickPreset = 'all' | 'traps' | 'formulas' | 'bookmarked' | 'unmastered';

export default function TipsPage() {
  const {
    mounted,
    bookmarkedIds,
    masteredIds,
    toggleBookmark,
    toggleMastered,
    isBookmarked,
    isMastered,
  } = useTipsMastery();

  const [viewMode, setViewMode] = useState<'detailed' | 'cheat_sheet'>('detailed');
  const [quickPreset, setQuickPreset] = useState<QuickPreset>('all');
  const [selectedPart, setSelectedPart] = useState<'all' | ToeicPart>('all');
  const [selectedType, setSelectedType] = useState<'all' | TipType>('all');
  const [selectedBand, setSelectedBand] = useState<'all' | TargetBand>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({});
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // Quick preset click handler
  const handlePresetClick = (preset: QuickPreset) => {
    setQuickPreset(preset);
    if (preset === 'traps') {
      setSelectedType('trap');
    } else if (quickPreset === 'traps') {
      setSelectedType('all');
    }
  };

  // Copy formula to clipboard
  const handleCopyFormula = useCallback((id: string, formula: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(formula);
      setCopiedFormulaId(id);
      setTimeout(() => {
        setCopiedFormulaId(null);
      }, 2000);
    }
  }, []);

  // Toggle example expansion in cheat sheet mode
  const toggleExampleExpand = (id: string) => {
    setExpandedExamples((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalTips = TOEIC_TIPS.length;
  const masteredCount = mounted
    ? masteredIds.filter((id) => TOEIC_TIPS.some((t) => t.id === id)).length
    : 0;
  const bookmarkedCount = mounted
    ? bookmarkedIds.filter((id) => TOEIC_TIPS.some((t) => t.id === id)).length
    : 0;
  const masteryPercent = Math.round((masteredCount / totalTips) * 100);

  const filteredTips = useMemo(() => {
    return TOEIC_TIPS.filter((tip) => {
      // 1. Quick Presets
      if (quickPreset === 'bookmarked') {
        if (!bookmarkedIds.includes(tip.id)) return false;
      } else if (quickPreset === 'unmastered') {
        if (masteredIds.includes(tip.id)) return false;
      } else if (quickPreset === 'formulas') {
        if (!tip.ruleFormula) return false;
      } else if (quickPreset === 'traps') {
        if (tip.type !== 'trap') return false;
      }

      // 2. Part Filter
      if (selectedPart !== 'all' && tip.part !== selectedPart) return false;

      // 3. Type Filter
      if (selectedType !== 'all' && tip.type !== selectedType) return false;

      // 4. Band Filter
      if (selectedBand !== 'all' && tip.targetBand !== 'all' && tip.targetBand !== selectedBand)
        return false;

      // 5. Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = tip.title.toLowerCase().includes(query);
        const inSummary = tip.shortSummary.toLowerCase().includes(query);
        const inContent = tip.content.toLowerCase().includes(query);
        const inWarning = tip.trapWarning?.toLowerCase().includes(query) ?? false;
        const inFormula = tip.ruleFormula?.toLowerCase().includes(query) ?? false;
        const inTags = tip.tags.some((t) => t.toLowerCase().includes(query));
        const inExamples =
          tip.examples?.some(
            (ex) =>
              ex.correct.toLowerCase().includes(query) ||
              (ex.incorrect && ex.incorrect.toLowerCase().includes(query)) ||
              ex.explanation.toLowerCase().includes(query)
          ) ?? false;

        return inTitle || inSummary || inContent || inWarning || inFormula || inTags || inExamples;
      }

      return true;
    });
  }, [
    quickPreset,
    bookmarkedIds,
    masteredIds,
    selectedPart,
    selectedType,
    selectedBand,
    searchQuery,
  ]);

  const activeAdvancedFilterCount =
    (selectedType !== 'all' ? 1 : 0) + (selectedBand !== 'all' ? 1 : 0);

  const hasActiveFilter =
    quickPreset !== 'all' ||
    selectedPart !== 'all' ||
    selectedType !== 'all' ||
    selectedBand !== 'all' ||
    searchQuery.trim() !== '';

  const resetFilters = () => {
    setQuickPreset('all');
    setSelectedPart('all');
    setSelectedType('all');
    setSelectedBand('all');
    setSearchQuery('');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <Link href="/" className={styles.homeBtn} title="Về Trang chủ">
              <HomeIcon size={20} />
            </Link>
            <div className={styles.headerTitleGroup}>
              <h1 className={styles.headerTitle}>
                <LightbulbIcon size={24} style={{ color: 'var(--primary)' }} />
                <span>Kho Chiến Thuật & Bẫy Đề Thi TOEIC</span>
              </h1>
              <p className={styles.headerSubtitle}>
                Tuyển tập 30 chiến thuật làm bài, giải mã bẫy đề ETS và công thức vàng cho 7 phần thi
              </p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className={styles.viewModeSwitcher} role="group" aria-label="Chế độ xem">
            <button
              type="button"
              className={`${styles.viewModeBtn} ${viewMode === 'detailed' ? styles.active : ''}`}
              onClick={() => setViewMode('detailed')}
            >
              <BookIcon size={14} />
              <span>Chế độ Chi tiết</span>
            </button>
            <button
              type="button"
              className={`${styles.viewModeBtn} ${viewMode === 'cheat_sheet' ? styles.active : ''}`}
              onClick={() => setViewMode('cheat_sheet')}
            >
              <ZapIcon size={14} />
              <span>Sổ tay Tóm tắt</span>
            </button>
          </div>
        </div>

        {/* Mastery Progress Card */}
        {mounted && (
          <section className={styles.masteryCard} aria-label="Tiến độ làm chủ chiến thuật">
            <div className={styles.masteryTop}>
              <div className={styles.masteryTitle}>
                <TargetIcon size={18} style={{ color: 'var(--primary)' }} />
                <span>Tiến độ làm chủ chiến thuật & bẫy đề</span>
              </div>
              <span className={styles.masteryPercentBadge}>
                {masteredCount} / {totalTips} ({masteryPercent}%)
              </span>
            </div>
            <div className={styles.masteryProgressTrack}>
              <div
                className={styles.masteryProgressFill}
                style={{ width: `${masteryPercent}%` }}
              />
            </div>
            <div className={styles.masteryStatsRow}>
              <div className={styles.masteryStatsLeft}>
                <span className={styles.masteryStatItem}>
                  <CheckCircleIcon size={14} style={{ color: '#10b981' }} />
                  <span>Đã nắm vững: <strong>{masteredCount}</strong></span>
                </span>
                <span className={styles.masteryStatItem}>
                  <BookmarkIcon size={14} style={{ color: '#d97706' }} />
                  <span>Đã lưu ưu tiên: <strong>{bookmarkedCount}</strong></span>
                </span>
              </div>
              <span>
                Còn <strong>{totalTips - masteredCount}</strong> mẹo cần củng cố
              </span>
            </div>
          </section>
        )}
      </header>

      {/* Multi-dimensional Filter Card */}
      <section className={styles.filterCard} aria-label="Bộ lọc chiến thuật">
        {/* Quick Presets Row */}
        <div className={styles.presetsRow}>
          <button
            type="button"
            className={`${styles.presetBtn} ${quickPreset === 'all' ? styles.active : ''}`}
            onClick={() => handlePresetClick('all')}
          >
            <span>Tất cả</span>
            <span className={styles.presetCount}>{totalTips}</span>
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${quickPreset === 'traps' ? styles.active : ''}`}
            onClick={() => handlePresetClick('traps')}
          >
            <AlertCircleIcon size={13} />
            <span>Bẫy đề thi ETS</span>
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${quickPreset === 'formulas' ? styles.active : ''}`}
            onClick={() => handlePresetClick('formulas')}
          >
            <ZapIcon size={13} />
            <span>Công thức vàng</span>
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${quickPreset === 'bookmarked' ? styles.active : ''}`}
            onClick={() => handlePresetClick('bookmarked')}
          >
            <BookmarkIcon size={13} />
            <span>Đã lưu</span>
            <span className={styles.presetCount}>{bookmarkedCount}</span>
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${quickPreset === 'unmastered' ? styles.active : ''}`}
            onClick={() => handlePresetClick('unmastered')}
          >
            <TargetIcon size={13} />
            <span>Cần ôn tập</span>
            <span className={styles.presetCount}>{totalTips - masteredCount}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <SearchIcon size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Tìm kiếm theo từ khóa, bẫy, công thức (ví dụ: is being, wearing, liên từ...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Horizontal Part Scroll */}
        <div className={styles.partScrollContainer}>
          {PART_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.partPill} ${selectedPart === opt.value ? styles.active : ''}`}
              onClick={() => setSelectedPart(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Collapsible Advanced Filters (Type & Band) */}
        <div>
          <button
            type="button"
            className={styles.advancedFilterToggle}
            onClick={() => setShowAdvancedFilters((prev) => !prev)}
          >
            <FilterIcon size={14} />
            <span>Bộ lọc nâng cao</span>
            {activeAdvancedFilterCount > 0 && (
              <span className={styles.filterBadgeCount}>{activeAdvancedFilterCount}</span>
            )}
            {showAdvancedFilters ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
          </button>

          {showAdvancedFilters && (
            <div className={styles.advancedFilterBody}>
              {/* Type Filter */}
              <div className={styles.filterRow}>
                <span className={styles.filterLabel}>Phân loại:</span>
                <div className={styles.filterPills}>
                  {TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`${styles.filterPill} ${
                        selectedType === opt.value ? styles.active : ''
                      }`}
                      onClick={() => setSelectedType(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Band Filter */}
              <div className={styles.filterRow}>
                <span className={styles.filterLabel}>Mục tiêu:</span>
                <div className={styles.filterPills}>
                  {BAND_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`${styles.filterPill} ${
                        selectedBand === opt.value ? styles.active : ''
                      }`}
                      onClick={() => setSelectedBand(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Row & Reset */}
        <div className={styles.statsRow}>
          <span className={styles.resultCount}>
            Hiển thị <strong>{filteredTips.length}</strong> / {totalTips} chiến thuật & bẫy
          </span>
          {hasActiveFilter && (
            <button type="button" className={styles.resetBtn} onClick={resetFilters}>
              Đặt lại bộ lọc
            </button>
          )}
        </div>
      </section>

      {/* Main Grid List */}
      <main>
        {filteredTips.length === 0 ? (
          <div className={styles.emptyState}>
            <SearchIcon size={44} style={{ color: 'var(--text-tertiary)' }} />
            <h3 className={styles.emptyTitle}>Không tìm thấy chiến thuật hoặc bẫy phù hợp</h3>
            <p className={styles.emptyText}>
              Hãy thử tìm kiếm với từ khóa khác hoặc đặt lại bộ lọc để xem toàn bộ danh mục.
            </p>
            <button type="button" className="btn-primary" onClick={resetFilters}>
              Xem tất cả mẹo thi
            </button>
          </div>
        ) : (
          <div className={styles.tipsGrid}>
            {filteredTips.map((tip) => {
              const tipMastered = mounted && isMastered(tip.id);
              const tipBookmarked = mounted && isBookmarked(tip.id);
              const examplesExpanded = expandedExamples[tip.id] ?? false;

              return (
                <article
                  key={tip.id}
                  className={`${styles.tipCard} ${tipMastered ? styles.mastered : ''}`}
                >
                  <div className={styles.cardTop}>
                    {/* Badge Row & Action Buttons */}
                    <div className={styles.badgeRow}>
                      <div className={styles.badgeLeft}>
                        <span className={styles.partBadge}>{tip.part}</span>
                        {tip.type === 'trap' && (
                          <span className={styles.typeBadgeTrap}>
                            <AlertCircleIcon size={12} />
                            <span>Bẫy đề thi</span>
                          </span>
                        )}
                        {tip.type === 'strategy' && (
                          <span className={styles.typeBadgeStrategy}>
                            <TargetIcon size={12} />
                            <span>Chiến thuật</span>
                          </span>
                        )}
                        {tip.type === 'grammar' && (
                          <span className={styles.typeBadgeGrammar}>
                            <BookIcon size={12} />
                            <span>Ngữ pháp</span>
                          </span>
                        )}
                        <span className={styles.bandBadge}>
                          {tip.targetBand === 'all' ? 'Mọi Band' : `Band ${tip.targetBand}`}
                        </span>
                      </div>

                      <div className={styles.badgeRight}>
                        {/* Bookmark Button */}
                        <button
                          type="button"
                          className={`${styles.iconActionBtn} ${
                            tipBookmarked ? styles.bookmarked : ''
                          }`}
                          onClick={() => toggleBookmark(tip.id)}
                          title={tipBookmarked ? 'Bỏ lưu mẹo này' : 'Lưu mẹo để ôn lại'}
                          aria-label={tipBookmarked ? 'Bỏ lưu mẹo này' : 'Lưu mẹo để ôn lại'}
                        >
                          <BookmarkIcon size={15} />
                        </button>

                        {/* Mastered Button */}
                        <button
                          type="button"
                          className={`${styles.masteredBtn} ${tipMastered ? styles.active : ''}`}
                          onClick={() => toggleMastered(tip.id)}
                          title={tipMastered ? 'Đã nắm vững (Bấm để hủy)' : 'Đánh dấu đã nắm vững'}
                        >
                          {tipMastered ? (
                            <>
                              <CheckCircleIcon size={14} />
                              <span>Đã thuộc</span>
                            </>
                          ) : (
                            <>
                              <CheckIcon size={14} />
                              <span>Chưa thuộc</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Title & Short Summary */}
                    <h3 className={styles.tipTitle}>{tip.title}</h3>
                    <p className={styles.shortSummary}>{tip.shortSummary}</p>

                    {/* Content (Shown in detailed mode or collapsed in cheat sheet mode) */}
                    {viewMode === 'detailed' && (
                      <p className={styles.tipContent}>{tip.content}</p>
                    )}

                    {/* Trap Warning Box */}
                    {tip.trapWarning && (
                      <div className={styles.trapBox}>
                        <div className={styles.trapHeader}>
                          <AlertCircleIcon size={13} />
                          <span>Cảnh báo bẫy ETS</span>
                        </div>
                        <p className={styles.trapText}>{tip.trapWarning}</p>
                        {tip.practiceLink && (
                          <div className={styles.trapActionRow}>
                            <Link
                              href={tip.practiceLink}
                              className={styles.trapPracticeBtn}
                              title={`Luyện ngay bẫy này: ${tip.title}`}
                            >
                              <ZapIcon size={13} />
                              <span>Luyện ngay bẫy này</span>
                              <ArrowRightIcon size={12} />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Rule Formula Box with Copy Button */}
                    {tip.ruleFormula && (
                      <div className={styles.formulaBox}>
                        <div className={styles.formulaHeaderRow}>
                          <div className={styles.formulaHeader}>
                            <ZapIcon size={13} />
                            <span>Quy tắc vàng</span>
                          </div>
                          <button
                            type="button"
                            className={styles.copyFormulaBtn}
                            onClick={() => handleCopyFormula(tip.id, tip.ruleFormula!)}
                            title="Sao chép công thức"
                          >
                            {copiedFormulaId === tip.id ? (
                              <>
                                <CheckIcon size={12} />
                                <span>Đã chép</span>
                              </>
                            ) : (
                              <>
                                <CopyIcon size={12} />
                                <span>Sao chép</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className={styles.formulaText}>{tip.ruleFormula}</p>
                      </div>
                    )}

                    {/* In Cheat Sheet Mode: Toggle for Details & Examples */}
                    {viewMode === 'cheat_sheet' && tip.examples && tip.examples.length > 0 && (
                      <div>
                        <button
                          type="button"
                          className={styles.toggleExamplesBtn}
                          onClick={() => toggleExampleExpand(tip.id)}
                        >
                          <span>
                            {examplesExpanded ? 'Thu gọn ví dụ đối chiếu' : 'Xem ví dụ đối chiếu thực chiến'}
                          </span>
                          {examplesExpanded ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
                        </button>
                      </div>
                    )}

                    {/* Examples Section (Shown in detailed mode or when expanded in cheat sheet mode) */}
                    {tip.examples &&
                      tip.examples.length > 0 &&
                      (viewMode === 'detailed' || examplesExpanded) && (
                        <div className={styles.examplesSection}>
                          <div className={styles.examplesHeader}>Ví dụ đối chiếu thực chiến:</div>
                          {tip.examples.map((ex, idx) => (
                            <div key={idx} className={styles.exampleCard}>
                              {ex.context && <div className={styles.exampleContext}>{ex.context}</div>}
                              {ex.incorrect && (
                                <div className={styles.exampleIncorrect}>
                                  <strong>Sai:</strong> {ex.incorrect}
                                </div>
                              )}
                              <div className={styles.exampleCorrect}>
                                <strong>Đúng:</strong> {ex.correct}
                              </div>
                              <div className={styles.exampleExplanation}>{ex.explanation}</div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Card Bottom: Tags & Practice CTA */}
                  <div className={styles.cardBottom}>
                    <div className={styles.tagsRow}>
                      {tip.tags.map((tag) => (
                        <span key={tag} className={styles.tagPill}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {tip.practiceLink && (
                      <Link
                        href={tip.practiceLink}
                        className={`${styles.practiceBtn} ${tip.type === 'trap' ? styles.practiceBtnTrap : ''}`}
                        title={tip.practiceTitle || (tip.type === 'trap' ? 'Luyện ngay bẫy này' : 'Áp dụng vào bài luyện ngay')}
                      >
                        {tip.type === 'trap' ? <AlertCircleIcon size={15} /> : <ZapIcon size={15} />}
                        <span>
                          {tip.type === 'trap' ? 'Luyện ngay bẫy này' : (tip.practiceTitle || 'Áp dụng vào bài luyện ngay')}
                        </span>
                        <ArrowRightIcon size={14} />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
