import { storage } from './storage';

export interface PlanTask {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'vocab' | 'practice' | 'review' | 'exam';
  estimatedMinutes: number;
  completed: boolean;
  subCategory?: string; // e.g. 'Word Form' or 'Verb Tense'
  part?: string;        // e.g. 'p5' or 'p7'
}

export interface PlanDay {
  dayNumber: number;
  dateStr: string;
  phaseName: string;
  tasks: PlanTask[];
  completed: boolean;
}

export interface StudyPlan {
  id: string;
  createdAt: string;
  lastSyncedAt?: string;
  currentScore: number;
  targetScore: number;
  daysTotal: number;
  dailyMinutes: number;
  weakestParts: string[]; // e.g. ['p2', 'p5', 'p7']
  topGrammarWeaknesses?: string[]; // e.g. ['Word Form', 'Verb Tense']
  examDate?: string;
  days: PlanDay[];
}

export interface LearnerGaps {
  latestScore: number;
  scoreSource: 'exam' | 'diagnostic' | 'default';
  weakestParts: string[];
  topGrammarWeaknesses: string[];
  dueMistakeCount: number;
  totalMistakes: number;
  lastEvaluatedAt: string;
}

const STORAGE_KEY = 'toeic_adaptive_study_plan';

export function getStudyPlan(): StudyPlan | null {
  return storage.get<StudyPlan | null>(STORAGE_KEY, null);
}

export function saveStudyPlan(plan: StudyPlan): void {
  storage.set(STORAGE_KEY, plan);
}

export function removeStudyPlan(): void {
  storage.remove(STORAGE_KEY);
}

export function toggleTaskCompleted(dayNumber: number, taskId: string): StudyPlan | null {
  const plan = getStudyPlan();
  if (!plan) return null;

  const day = plan.days.find((d) => d.dayNumber === dayNumber);
  if (!day) return null;

  const task = day.tasks.find((t) => t.id === taskId);
  if (!task) return null;

  task.completed = !task.completed;
  day.completed = day.tasks.every((t) => t.completed);

  saveStudyPlan(plan);
  return plan;
}

/**
 * Analyzes learner data across exam history, diagnostic results, and mistake notebook
 * to determine live gaps and priorities.
 */
export function analyzeLearnerGaps(): LearnerGaps {
  // 1. Check latest exam history
  const examHistory = storage.get<any[]>('toeic_exam_history', []);
  const latestExam = examHistory.length > 0 ? examHistory[0] : null;

  // 2. Check diagnostic result
  const diagResult = storage.get<any>('toeic_diagnostic_result', null);

  let latestScore = 450;
  let scoreSource: 'exam' | 'diagnostic' | 'default' = 'default';
  const weakPartsMap: Record<string, number> = {};

  if (latestExam && latestExam.totalScore) {
    latestScore = latestExam.totalScore;
    scoreSource = 'exam';
    if (latestExam.partScores) {
      Object.entries(latestExam.partScores).forEach(([pKey, pVal]: [string, any]) => {
        weakPartsMap[pKey] = pVal.accuracy ?? 50;
      });
    }
  } else if (diagResult && diagResult.totalScore) {
    latestScore = diagResult.totalScore;
    scoreSource = 'diagnostic';
    if (diagResult.partScores) {
      Object.entries(diagResult.partScores).forEach(([pKey, pVal]: [string, any]) => {
        weakPartsMap[pKey] = pVal.accuracy ?? 50;
      });
    }
  }

  // 3. Analyze mistake notebook
  const mistakes = storage.get<Record<string, any>>('mistake_notebook', {});
  const mistakeEntries = Object.values(mistakes);
  const grammarMistakeCounts: Record<string, number> = {};
  let dueMistakeCount = 0;
  const now = new Date();

  mistakeEntries.forEach((m: any) => {
    // Check due date
    if (m.nextReviewDate && new Date(m.nextReviewDate) <= now) {
      dueMistakeCount++;
    }
    // Count grammar mistakes for Part 5 & 6
    if (m.type === 'exam' && m.subCategory) {
      grammarMistakeCounts[m.subCategory] = (grammarMistakeCounts[m.subCategory] || 0) + (m.wrongCount || 1);
    }
    // Count part mistakes to further weight weakest parts
    if (m.part) {
      const pNorm = m.part.replace(/^part/, 'p');
      weakPartsMap[pNorm] = (weakPartsMap[pNorm] ?? 70) - (m.wrongCount || 1) * 3;
    }
  });

  // Sort weakest parts ascending (lowest accuracy first)
  const sortedWeakParts = Object.entries(weakPartsMap)
    .sort((a, b) => a[1] - b[1])
    .map(([p]) => p);

  const weakestParts = sortedWeakParts.length > 0
    ? sortedWeakParts.slice(0, 3)
    : (diagResult?.weakestPartsList?.length > 0 ? diagResult.weakestPartsList : ['p5', 'p2', 'p7']);

  // Sort grammar weaknesses descending (most mistakes first)
  const topGrammarWeaknesses = Object.entries(grammarMistakeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([sub]) => sub);

  return {
    latestScore,
    scoreSource,
    weakestParts,
    topGrammarWeaknesses: topGrammarWeaknesses.length > 0 ? topGrammarWeaknesses : ['Word Form', 'Verb Tense', 'Preposition & Conjunction'],
    dueMistakeCount,
    totalMistakes: mistakeEntries.length,
    lastEvaluatedAt: new Date().toISOString(),
  };
}

/**
 * Rebalances uncompleted days in an existing study plan based on fresh learner gaps.
 * Preserves completed days and completed tasks.
 */
export function rebalanceStudyPlan(plan: StudyPlan, gaps: LearnerGaps): StudyPlan {
  plan.currentScore = gaps.latestScore;
  plan.weakestParts = gaps.weakestParts;
  plan.topGrammarWeaknesses = gaps.topGrammarWeaknesses;
  plan.lastSyncedAt = gaps.lastEvaluatedAt;

  const partLabels: Record<string, { title: string; link: string; part: string }> = {
    p1: { title: 'Luyện Part 1: Bẫy mô tả tranh', link: '/part1', part: 'p1' },
    p2: { title: 'Luyện Part 2: Phản xạ hỏi đáp', link: '/part2', part: 'p2' },
    p3: { title: 'Luyện Part 3: Bắt keyword hội thoại', link: '/part3', part: 'p3' },
    p4: { title: 'Luyện Part 4: Bài nói ngắn', link: '/part4', part: 'p4' },
    p5: { title: 'Luyện Part 5: Tốc độ ngữ pháp 20s', link: '/part5', part: 'p5' },
    p6: { title: 'Luyện Part 6: Điền từ đoạn văn', link: '/part6', part: 'p6' },
    p7: { title: 'Luyện Part 7: Kỹ năng đọc quét', link: '/part7', part: 'p7' },
  };

  const primaryGrammarWeakness = gaps.topGrammarWeaknesses[0] || 'Word Form';
  const secondaryGrammarWeakness = gaps.topGrammarWeaknesses[1] || 'Verb Tense';

  let uncompletedDayCount = 0;

  plan.days.forEach((day) => {
    // Preserve completed days
    if (day.completed) return;

    uncompletedDayCount++;

    day.tasks.forEach((task) => {
      // Preserve completed tasks
      if (task.completed) return;

      if (task.type === 'practice') {
        const weakPart = gaps.weakestParts[(uncompletedDayCount - 1) % gaps.weakestParts.length] || 'p5';

        if (weakPart === 'p5') {
          const chosenSubSkill = uncompletedDayCount % 2 === 1 ? primaryGrammarWeakness : secondaryGrammarWeakness;
          task.title = `Luyện Part 5: Chuyên đề ${chosenSubSkill}`;
          task.description = `Lấp lỗ hổng ${chosenSubSkill} phát hiện từ lỗi sai thực tế`;
          task.link = `/part5?subCategory=${encodeURIComponent(chosenSubSkill)}`;
          task.subCategory = chosenSubSkill;
          task.part = 'p5';
        } else if (weakPart === 'p7') {
          const readingTypes = ['Main Idea', 'Detail', 'Inference', 'NOT / TRUE', 'Vocabulary', 'Sentence Placement'];
          const matchedReadingGap = gaps.topGrammarWeaknesses.find(w => readingTypes.includes(w)) || 'Inference';
          task.title = `Luyện Part 7: Dạng câu hỏi ${matchedReadingGap}`;
          task.description = `Rèn luyện kỹ năng đọc hiểu và bẫy ETS dạng ${matchedReadingGap}`;
          task.link = `/part7?questionType=${encodeURIComponent(matchedReadingGap)}`;
          task.subCategory = matchedReadingGap;
          task.part = 'p7';
        } else {
          const pInfo = partLabels[weakPart] || partLabels.p5;
          task.title = pInfo.title;
          task.description = `Củng cố độ chính xác cho ${weakPart.toUpperCase()} (Lỗ hổng ưu tiên)`;
          task.link = pInfo.link;
          task.part = weakPart;
          task.subCategory = undefined;
        }
      } else if (task.type === 'review') {
        if (gaps.dueMistakeCount > 0) {
          task.title = `Ôn tập ${gaps.dueMistakeCount} câu hỏi đến hạn trong Sổ tay lỗi sai`;
          task.description = 'Làm lại các câu hỏi đã tới hạn theo thuật toán lặp lại ngắt quãng';
          task.link = '/notebook?tab=exam&filter=due';
        } else {
          task.title = 'Ôn tập Sổ tay lỗi sai';
          task.description = 'Rà soát các câu hỏi và từ vựng đã từng làm sai';
          task.link = '/notebook';
        }
      }
    });
  });

  saveStudyPlan(plan);
  return plan;
}

/**
 * Synchronizes the study plan with latest diagnostic and mistake data.
 */
export function syncAdaptivePlan(): { plan: StudyPlan | null; gaps: LearnerGaps } {
  const gaps = analyzeLearnerGaps();
  let plan = getStudyPlan();

  if (plan) {
    plan = rebalanceStudyPlan(plan, gaps);
  } else {
    const target = gaps.latestScore < 500 ? 650 : (gaps.latestScore < 700 ? 800 : 900);
    plan = generateAdaptivePlan({
      currentScore: gaps.latestScore,
      targetScore: target,
      daysTotal: 30,
      dailyMinutes: 30,
      weakestParts: gaps.weakestParts,
      topGrammarWeaknesses: gaps.topGrammarWeaknesses,
    });
  }

  return { plan, gaps };
}

export function generateAdaptivePlan(params: {
  currentScore: number;
  targetScore: number;
  daysTotal: number;
  dailyMinutes: number;
  weakestParts?: string[];
  topGrammarWeaknesses?: string[];
}): StudyPlan {
  const { currentScore, targetScore, daysTotal, dailyMinutes } = params;
  const weakestParts = params.weakestParts && params.weakestParts.length > 0
    ? params.weakestParts
    : ['p5', 'p2', 'p7'];
  const topGrammarWeaknesses = params.topGrammarWeaknesses && params.topGrammarWeaknesses.length > 0
    ? params.topGrammarWeaknesses
    : ['Word Form', 'Verb Tense', 'Preposition & Conjunction'];

  const days: PlanDay[] = [];
  const today = new Date();

  // 3 Phase distribution
  const phase1Days = Math.max(3, Math.round(daysTotal * 0.35));
  const phase2Days = Math.max(3, Math.round(daysTotal * 0.40));

  for (let i = 1; i <= daysTotal; i++) {
    const taskDate = new Date(today);
    taskDate.setDate(today.getDate() + (i - 1));
    const dateStr = taskDate.toLocaleDateString('vi-VN', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
    });

    let phaseName = 'Giai đoạn 1: Nền tảng & Khắc phục điểm yếu';
    if (i > phase1Days && i <= phase1Days + phase2Days) {
      phaseName = 'Giai đoạn 2: Tăng tốc phản xạ & Bẫy đề thi';
    } else if (i > phase1Days + phase2Days) {
      phaseName = 'Giai đoạn 3: Tổng ôn thực chiến & Thi thử';
    }

    const tasks: PlanTask[] = [];

    // Task 1: Spaced Repetition Vocabulary (Daily Habit)
    tasks.push({
      id: `task_${i}_vocab`,
      title: 'Học 15 Từ vựng Spaced Repetition',
      description: 'Ôn tập thẻ ghi nhớ bằng hệ thống Leitner để từ vào trí nhớ dài hạn',
      link: '/study',
      type: 'vocab',
      estimatedMinutes: Math.min(15, Math.round(dailyMinutes * 0.35)),
      completed: false,
    });

    // Task 2: Targeted Practice based on Phase & Weakest Parts
    if (i <= phase1Days) {
      const weakPart = weakestParts[(i - 1) % weakestParts.length];
      const partLabels: Record<string, { title: string; link: string }> = {
        p1: { title: 'Luyện Part 1: Bẫy mô tả tranh', link: '/part1' },
        p2: { title: 'Luyện Part 2: Phản xạ hỏi đáp', link: '/part2' },
        p3: { title: 'Luyện Part 3: Bắt keyword hội thoại', link: '/part3' },
        p4: { title: 'Luyện Part 4: Bài nói ngắn', link: '/part4' },
        p5: { title: 'Luyện Part 5: Tốc độ ngữ pháp 20s', link: '/part5' },
        p6: { title: 'Luyện Part 6: Điền từ đoạn văn', link: '/part6' },
        p7: { title: 'Luyện Part 7: Kỹ năng đọc quét', link: '/part7' },
      };

      if (weakPart === 'p5') {
        const subCat = topGrammarWeaknesses[(i - 1) % topGrammarWeaknesses.length] || 'Word Form';
        tasks.push({
          id: `task_${i}_practice`,
          title: `Luyện Part 5: Chuyên đề ${subCat}`,
          description: `Tập trung củng cố kiến thức ${subCat} và phản xạ 20s`,
          link: `/part5?subCategory=${encodeURIComponent(subCat)}`,
          type: 'practice',
          estimatedMinutes: Math.round(dailyMinutes * 0.45),
          completed: false,
          subCategory: subCat,
          part: 'p5',
        });
      } else {
        const pInfo = partLabels[weakPart] || partLabels.p5;
        tasks.push({
          id: `task_${i}_practice`,
          title: pInfo.title,
          description: `Tập trung lấp lỗ hổng ${weakPart.toUpperCase()} đã chẩn đoán`,
          link: pInfo.link,
          type: 'practice',
          estimatedMinutes: Math.round(dailyMinutes * 0.45),
          completed: false,
          part: weakPart,
        });
      }
    } else if (i <= phase1Days + phase2Days) {
      const isListeningDay = i % 2 === 0;
      if (isListeningDay) {
        tasks.push({
          id: `task_${i}_practice`,
          title: 'Luyện Nghe Chuyên sâu Part 3 & 4',
          description: 'Nghe đối thoại và độc thoại, tập trung đọc trước 3 câu hỏi',
          link: i % 4 === 0 ? '/part4' : '/part3',
          type: 'practice',
          estimatedMinutes: Math.round(dailyMinutes * 0.45),
          completed: false,
        });
      } else {
        const subCat = topGrammarWeaknesses[(i - 1) % topGrammarWeaknesses.length] || 'Word Form';
        tasks.push({
          id: `task_${i}_practice`,
          title: `Luyện Tốc độ Đọc Hiểu Part 5 (${subCat}) & Part 7`,
          description: 'Rèn luyện phản xạ ngữ pháp 15s/câu và kỹ năng đọc lướt',
          link: i % 3 === 0 ? '/part7' : `/part5?subCategory=${encodeURIComponent(subCat)}`,
          type: 'practice',
          estimatedMinutes: Math.round(dailyMinutes * 0.45),
          completed: false,
          subCategory: i % 3 === 0 ? undefined : subCat,
        });
      }
    } else {
      if (i === daysTotal || i === daysTotal - 3) {
        tasks.push({
          id: `task_${i}_exam`,
          title: 'Thi thử Full Test 200 câu chuẩn ETS',
          description: 'Canh đúng 120 phút mô phỏng áp lực phòng thi thật',
          link: '/exam',
          type: 'exam',
          estimatedMinutes: dailyMinutes,
          completed: false,
        });
      } else {
        tasks.push({
          id: `task_${i}_practice`,
          title: 'Luyện tập hỗn hợp đề nâng cao',
          description: 'Rà soát các bẫy hay gặp và củng cố độ chính xác',
          link: '/part5',
          type: 'practice',
          estimatedMinutes: Math.round(dailyMinutes * 0.45),
          completed: false,
        });
      }
    }

    // Task 3: Mistake Notebook Review
    tasks.push({
      id: `task_${i}_review`,
      title: 'Ôn tập Sổ tay lỗi sai',
      description: 'Làm lại các câu đã từng sai để không bao giờ mắc lại lỗi cũ',
      link: '/notebook',
      type: 'review',
      estimatedMinutes: Math.min(10, Math.round(dailyMinutes * 0.2)),
      completed: false,
    });

    days.push({
      dayNumber: i,
      dateStr,
      phaseName,
      tasks,
      completed: false,
    });
  }

  const newPlan: StudyPlan = {
    id: `plan_${Date.now()}`,
    createdAt: new Date().toISOString(),
    lastSyncedAt: new Date().toISOString(),
    currentScore,
    targetScore,
    daysTotal,
    dailyMinutes,
    weakestParts,
    topGrammarWeaknesses,
    days,
  };

  saveStudyPlan(newPlan);
  return newPlan;
}

export function getNextStudyTask(): { title: string; link: string; type: string; subCategory?: string } {
  const plan = getStudyPlan();
  if (plan) {
    const activeDay = plan.days.find((d) => !d.completed) || plan.days[0];
    if (activeDay) {
      const nextTask = activeDay.tasks.find((t) => !t.completed);
      if (nextTask) {
        return {
          title: nextTask.title,
          link: nextTask.link,
          type: nextTask.type,
          subCategory: nextTask.subCategory,
        };
      }
    }
  }

  return {
    title: 'Luyện Part 5: Tốc độ ngữ pháp 20s',
    link: '/part5',
    type: 'practice',
  };
}
