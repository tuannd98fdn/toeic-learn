'use client';

import { useState, useMemo } from 'react';
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
} from '@/components/icons/AppIcons';
import { TOEIC_TIPS, ToeicTip, TipType, TargetBand, ToeicPart } from '@/data/strategies';
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

export default function TipsPage() {
  const [selectedPart, setSelectedPart] = useState<'all' | ToeicPart>('all');
  const [selectedType, setSelectedType] = useState<'all' | TipType>('all');
  const [selectedBand, setSelectedBand] = useState<'all' | TargetBand>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTips = useMemo(() => {
    return TOEIC_TIPS.filter((tip) => {
      // 1. Part Filter
      if (selectedPart !== 'all' && tip.part !== selectedPart) return false;

      // 2. Type Filter
      if (selectedType !== 'all' && tip.type !== selectedType) return false;

      // 3. Band Filter
      if (selectedBand !== 'all' && tip.targetBand !== 'all' && tip.targetBand !== selectedBand)
        return false;

      // 4. Search Filter
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
  }, [selectedPart, selectedType, selectedBand, searchQuery]);

  const hasActiveFilter =
    selectedPart !== 'all' ||
    selectedType !== 'all' ||
    selectedBand !== 'all' ||
    searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedPart('all');
    setSelectedType('all');
    setSelectedBand('all');
    setSearchQuery('');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link
            href="/"
            className="btn-secondary btn-sm"
            style={{ padding: '0.45rem', display: 'inline-flex', alignItems: 'center' }}
            title="Về Trang chủ"
          >
            <HomeIcon size={20} />
          </Link>
          <div>
            <h1 className={styles.headerTitle}>
              <LightbulbIcon size={26} style={{ color: 'var(--primary)' }} />
              <span>Kho Chiến Thuật & Bẫy Đề Thi TOEIC</span>
            </h1>
            <p className={styles.headerSubtitle}>
              Tuyển tập 30 chiến thuật làm bài, giải mã bẫy đề ETS và công thức vàng cho 7 phần thi
            </p>
          </div>
        </div>
      </header>

      {/* Multi-dimensional Filter Card */}
      <section className={styles.filterCard}>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <SearchIcon size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Tìm kiếm theo từ khóa, bẫy, công thức (ví dụ: is being, paraphrasing, liên từ...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Filter Groups */}
        <div className={styles.filterGroups}>
          {/* Part Filter */}
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Phần thi:</span>
            <div className={styles.filterPills}>
              {PART_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.filterPill} ${
                    selectedPart === opt.value ? styles.active : ''
                  }`}
                  onClick={() => setSelectedPart(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

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

        {/* Stats Row & Reset */}
        <div className={styles.statsRow}>
          <span className={styles.resultCount}>
            Hiển thị <strong>{filteredTips.length}</strong> / {TOEIC_TIPS.length} chiến thuật & bẫy
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
            {filteredTips.map((tip) => (
              <article key={tip.id} className={styles.tipCard}>
                <div className={styles.cardTop}>
                  {/* Badge Row */}
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
                    </div>
                    <span className={styles.bandBadge}>
                      {tip.targetBand === 'all' ? 'Mọi Band' : `Band ${tip.targetBand}`}
                    </span>
                  </div>

                  {/* Title & Short Summary */}
                  <h3 className={styles.tipTitle}>{tip.title}</h3>
                  <p className={styles.shortSummary}>{tip.shortSummary}</p>

                  {/* Content */}
                  <p className={styles.tipContent}>{tip.content}</p>

                  {/* Trap Warning Box */}
                  {tip.trapWarning && (
                    <div className={styles.trapBox}>
                      <div className={styles.trapHeader}>
                        <AlertCircleIcon size={14} />
                        <span>Cảnh báo bẫy ETS</span>
                      </div>
                      <p className={styles.trapText}>{tip.trapWarning}</p>
                    </div>
                  )}

                  {/* Rule Formula Box */}
                  {tip.ruleFormula && (
                    <div className={styles.formulaBox}>
                      <div className={styles.formulaHeader}>
                        <ZapIcon size={14} />
                        <span>Quy tắc vàng</span>
                      </div>
                      <p className={styles.formulaText}>{tip.ruleFormula}</p>
                    </div>
                  )}

                  {/* Examples Section */}
                  {tip.examples && tip.examples.length > 0 && (
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
                    <Link href={tip.practiceLink} className={styles.practiceBtn}>
                      <ZapIcon size={15} />
                      <span>{tip.practiceTitle || 'Áp dụng vào bài luyện ngay'}</span>
                      <ArrowRightIcon size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
