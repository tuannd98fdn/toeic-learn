import { storage } from './storage';

export interface PlanTask {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'vocab' | 'practice' | 'review' | 'exam';
  estimatedMinutes: number;
  completed: boolean;
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
  currentScore: number;
  targetScore: number;
  daysTotal: number;
  dailyMinutes: number;
  weakestParts: string[]; // e.g. ['p2', 'p5', 'p7']
  examDate?: string;
  days: PlanDay[];
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

export function generateAdaptivePlan(params: {
  currentScore: number;
  targetScore: number;
  daysTotal: number;
  dailyMinutes: number;
  weakestParts?: string[];
}): StudyPlan {
  const { currentScore, targetScore, daysTotal, dailyMinutes } = params;
  const weakestParts = params.weakestParts && params.weakestParts.length > 0
    ? params.weakestParts
    : ['p5', 'p2', 'p7'];

  const days: PlanDay[] = [];
  const today = new Date();

  // 3 Phase distribution
  const phase1Days = Math.max(3, Math.round(daysTotal * 0.35));
  const phase2Days = Math.max(3, Math.round(daysTotal * 0.40));
  const phase3Days = daysTotal - phase1Days - phase2Days;

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
      // Focus on weakest part
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

      const pInfo = partLabels[weakPart] || partLabels.p5;
      tasks.push({
        id: `task_${i}_practice`,
        title: pInfo.title,
        description: 'Tập trung lấp lỗ hổng kiến thức đã chẩn đoán',
        link: pInfo.link,
        type: 'practice',
        estimatedMinutes: Math.round(dailyMinutes * 0.45),
        completed: false,
      });
    } else if (i <= phase1Days + phase2Days) {
      // Speed and mixed practice
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
        tasks.push({
          id: `task_${i}_practice`,
          title: 'Luyện Tốc độ Đọc Hiểu Part 5 & 7',
          description: 'Rèn luyện phản xạ ngữ pháp 15s/câu và kỹ năng đọc lướt',
          link: i % 3 === 0 ? '/part7' : '/part5',
          type: 'practice',
          estimatedMinutes: Math.round(dailyMinutes * 0.45),
          completed: false,
        });
      }
    } else {
      // Mock exams & full review
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
      title: 'Ôn tập Sổ tay lỗi sai 📓',
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
    currentScore,
    targetScore,
    daysTotal,
    dailyMinutes,
    weakestParts,
    days,
  };

  saveStudyPlan(newPlan);
  return newPlan;
}
