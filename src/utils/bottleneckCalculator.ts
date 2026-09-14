import { MistakeData, MistakeRecord } from '@/hooks/useMistakeNotebook';

export const ROOT_CAUSES = [
  'Mắc bẫy',
  'Ngữ pháp',
  'Từ vựng',
  'Bất cẩn / Đọc lướt',
  'Nghe không rõ',
] as const;

export type RootCauseType = typeof ROOT_CAUSES[number];

export interface RootCauseMeta {
  label: string;
  color: string;
  desc: string;
  shortDesc: string;
}

export const ROOT_CAUSE_CONFIG: Record<string, RootCauseMeta> = {
  'Mắc bẫy': {
    label: 'Mắc bẫy ETS',
    color: '#ef4444',
    desc: 'Bị lừa bởi từ đồng âm, bẫy thì hoặc phương án nhiễu tinh vi',
    shortDesc: 'Rèn luyện phản xạ phát hiện bẫy lặp từ, thì sai và phương án nhiễu',
  },
  'Ngữ pháp': {
    label: 'Hổng Ngữ pháp',
    color: '#6366f1',
    desc: 'Chưa vững cấu trúc câu, từ loại, thì động từ hoặc liên từ',
    shortDesc: 'Củng cố cấu trúc S-V-O, dạng động từ và hòa hợp chủ vị',
  },
  'Từ vựng': {
    label: 'Thiếu Từ vựng',
    color: '#f59e0b',
    desc: 'Chưa biết nghĩa từ vựng chuyên ngành hoặc cụm Collocation',
    shortDesc: 'Nạp thêm từ vựng chuyên ngành và cụm Collocation thương mại',
  },
  'Bất cẩn / Đọc lướt': {
    label: 'Bất cẩn / Đọc lướt',
    color: '#ec4899',
    desc: 'Đọc thiếu từ khóa quan trọng (NOT/TRUE, mốc thời gian, người gửi)',
    shortDesc: 'Luyện kỹ năng định vị từ khóa và rà soát câu hỏi phủ định',
  },
  'Nghe không rõ': {
    label: 'Nghe không rõ',
    color: '#06b6d4',
    desc: 'Bị nuốt âm, nối âm hoặc tốc độ đọc bài nói quá nhanh',
    shortDesc: 'Luyện chép chính tả Dictation và bẻ khóa hiện tượng nối âm nuốt âm',
  },
};

export interface TopBottleneckInfo {
  rootCause: string;
  label: string;
  color: string;
  desc: string;
  shortDesc: string;
  count: number;
  percent: number;
  actionLink: string;
}

export interface RootCauseBreakdownItem {
  rootCause: string;
  label: string;
  color: string;
  count: number;
  percent: number;
}

export interface BottleneckStats {
  total: number;
  activeCount: number;
  masteredCount: number;
  remediationRate: number; // 0 to 100
  unassignedCount: number;
  counts: Record<string, number>;
  topBottleneck: TopBottleneckInfo | null;
  breakdown: RootCauseBreakdownItem[];
  status: 'EMPTY' | 'ALL_MASTERED' | 'HAS_BOTTLENECK' | 'NEEDS_TAGGING';
}

/**
 * Calculates bottleneck mastery and root-cause statistics from mistake records.
 */
export function calculateBottleneckStats(mistakes: MistakeData): BottleneckStats {
  const counts: Record<string, number> = {
    'Mắc bẫy': 0,
    'Ngữ pháp': 0,
    'Từ vựng': 0,
    'Bất cẩn / Đọc lướt': 0,
    'Nghe không rõ': 0,
  };

  let total = 0;
  let activeCount = 0;
  let masteredCount = 0;
  let unassignedCount = 0;

  Object.entries(mistakes).forEach(([id, record]) => {
    // Only analyze exam questions
    const isExamMistake = record.type === 'exam' || id.startsWith('exam_') || id.startsWith('minitest_');
    if (!isExamMistake) return;

    total++;

    if (record.isMastered) {
      masteredCount++;
    } else {
      activeCount++;
      const cause = record.rootCause;
      if (cause && counts[cause] !== undefined) {
        counts[cause]++;
      } else {
        unassignedCount++;
      }
    }
  });

  const remediationRate = total > 0 ? Math.round((masteredCount / total) * 100) : 100;

  // Breakdown across the 5 categories
  const breakdown: RootCauseBreakdownItem[] = ROOT_CAUSES.map((rc) => {
    const c = counts[rc];
    const pct = activeCount > 0 ? Math.round((c / activeCount) * 100) : 0;
    return {
      rootCause: rc,
      label: ROOT_CAUSE_CONFIG[rc].label,
      color: ROOT_CAUSE_CONFIG[rc].color,
      count: c,
      percent: pct,
    };
  });

  // Find top bottleneck
  let topBottleneck: TopBottleneckInfo | null = null;
  let maxCount = 0;
  let topCause = '';

  ROOT_CAUSES.forEach((rc) => {
    if (counts[rc] > maxCount) {
      maxCount = counts[rc];
      topCause = rc;
    }
  });

  if (maxCount > 0 && topCause) {
    const pct = activeCount > 0 ? Math.round((maxCount / activeCount) * 100) : 0;
    const cfg = ROOT_CAUSE_CONFIG[topCause];
    topBottleneck = {
      rootCause: topCause,
      label: cfg.label,
      color: cfg.color,
      desc: cfg.desc,
      shortDesc: cfg.shortDesc,
      count: maxCount,
      percent: pct,
      actionLink: `/notebook/exam-quiz?rootCause=${encodeURIComponent(topCause)}`,
    };
  }

  let status: BottleneckStats['status'] = 'HAS_BOTTLENECK';
  if (total === 0) {
    status = 'EMPTY';
  } else if (activeCount === 0) {
    status = 'ALL_MASTERED';
  } else if (!topBottleneck && unassignedCount > 0) {
    status = 'NEEDS_TAGGING';
  }

  return {
    total,
    activeCount,
    masteredCount,
    remediationRate,
    unassignedCount,
    counts,
    topBottleneck,
    breakdown,
    status,
  };
}
