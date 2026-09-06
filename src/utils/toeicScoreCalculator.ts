// Official ETS TOEIC Raw to Scaled Score conversion table (0-100 questions -> 5-495 score)
const LC_TABLE: number[] = [
  5, 5, 5, 5, 5, 5, 5, 10, 15, 20, // 0-9
  25, 30, 35, 40, 45, 50, 55, 60, 65, 70, // 10-19
  75, 80, 85, 90, 95, 100, 110, 115, 120, 125, // 20-29
  130, 135, 140, 145, 150, 160, 165, 170, 175, 180, // 30-39
  185, 190, 195, 200, 210, 215, 220, 225, 230, 235, // 40-49
  240, 250, 255, 260, 265, 270, 280, 285, 290, 295, // 50-59
  300, 310, 315, 320, 325, 330, 340, 345, 350, 355, // 60-69
  360, 370, 375, 380, 385, 390, 400, 405, 410, 415, // 70-79
  420, 425, 430, 435, 440, 445, 450, 455, 460, 465, // 80-89
  470, 475, 480, 485, 490, 495, 495, 495, 495, 495, // 90-99
  495 // 100
];

const RC_TABLE: number[] = [
  5, 5, 5, 5, 5, 5, 5, 5, 5, 10, // 0-9
  15, 20, 25, 30, 35, 40, 45, 50, 55, 60, // 10-19
  65, 70, 75, 80, 85, 90, 95, 100, 105, 110, // 20-29
  115, 120, 125, 130, 135, 140, 145, 150, 155, 160, // 30-39
  165, 170, 175, 180, 185, 190, 195, 200, 205, 210, // 40-49
  215, 220, 225, 230, 235, 240, 245, 250, 255, 260, // 50-59
  265, 270, 275, 280, 285, 290, 295, 300, 305, 310, // 60-69
  315, 320, 325, 330, 335, 340, 345, 350, 355, 360, // 70-79
  365, 370, 375, 380, 385, 390, 395, 400, 405, 410, // 80-89
  420, 430, 440, 450, 460, 470, 480, 485, 490, 495, // 90-99
  495 // 100
];

export interface PartScore {
  total: number;
  correct: number;
  accuracy: number; // 0 to 100%
}

export interface ExamScoreSummary {
  testId: string;
  testName: string;
  date: string;
  durationSeconds: number;
  rawLC: number;
  rawRC: number;
  scaledLC: number;
  scaledRC: number;
  totalScore: number;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  partScores: Record<string, PartScore>; // 'p1', 'p2', ..., 'p7'
  weakestPart: {
    part: string;
    partName: string;
    accuracy: number;
    advice: string;
  };
}

export function calculateScaledScore(rawLC: number, rawRC: number): {
  scaledLC: number;
  scaledRC: number;
  totalScore: number;
} {
  const safeLC = Math.max(0, Math.min(100, Math.round(rawLC)));
  const safeRC = Math.max(0, Math.min(100, Math.round(rawRC)));

  const scaledLC = LC_TABLE[safeLC] ?? 5;
  const scaledRC = RC_TABLE[safeRC] ?? 5;
  const totalScore = scaledLC + scaledRC;

  return { scaledLC, scaledRC, totalScore };
}

export function getCefrLevel(totalScore: number): 'A1' | 'A2' | 'B1' | 'B2' | 'C1' {
  if (totalScore >= 850) return 'C1';
  if (totalScore >= 785) return 'B2';
  if (totalScore >= 550) return 'B1';
  if (totalScore >= 225) return 'A2';
  return 'A1';
}

const PART_NAMES: Record<string, string> = {
  p1: 'Part 1: Photographs (Hình ảnh)',
  p2: 'Part 2: Question-Response (Hỏi - Đáp)',
  p3: 'Part 3: Short Conversations (Hội thoại ngắn)',
  p4: 'Part 4: Short Talks (Bài nói ngắn)',
  p5: 'Part 5: Incomplete Sentences (Điền câu)',
  p6: 'Part 6: Text Completion (Điền đoạn văn)',
  p7: 'Part 7: Reading Comprehension (Đọc hiểu)',
};

const PART_ADVICE: Record<string, string> = {
  p1: 'Chú ý quan sát bao quát tranh (hành động người vs vị trí vật thể), cẩn thận bẫy âm gần giống (similar-sounding words).',
  p2: 'Tập trung cao độ vào từ để hỏi đầu câu (Who, When, Where, Why, How). Chú ý bẫy lặp lại từ cùng âm nhưng khác nghĩa.',
  p3: 'Tận dụng thời gian đọc trước 3 câu hỏi trước khi audio phát. Luyện thói quen nghe bắt keyword theo mạch hội thoại.',
  p4: 'Xác định nhanh bối cảnh bài nói (sân bay, đài phát thanh, công ty). Chú ý mục đích của người nói ở 1-2 câu đầu.',
  p5: 'Củng cố các chủ điểm ngữ pháp cốt lõi: thì của động từ, mệnh đề quan hệ, từ loại (Word Formation) và giới từ.',
  p6: 'Đọc hiểu ngữ cảnh liên kết giữa các câu thay vì chỉ nhìn vào chỗ trống đơn lẻ. Chú ý liên từ nối (transition words).',
  p7: 'Rèn luyện kỹ năng Skimming (đọc lướt ý chính) & Scanning (tìm dữ liệu cụ thể). Phân bổ thời gian tối đa 55 giây/câu.',
};

export function diagnoseWeakness(partScores: Record<string, PartScore>): {
  part: string;
  partName: string;
  accuracy: number;
  advice: string;
} {
  const parts = Object.keys(partScores);
  if (parts.length === 0) {
    return {
      part: 'p5',
      partName: PART_NAMES.p5,
      accuracy: 0,
      advice: PART_ADVICE.p5,
    };
  }

  // Find part with lowest accuracy
  let lowestPart = parts[0];
  let lowestAcc = partScores[lowestPart].accuracy;

  for (const p of parts) {
    if (partScores[p].accuracy < lowestAcc) {
      lowestAcc = partScores[p].accuracy;
      lowestPart = p;
    }
  }

  return {
    part: lowestPart,
    partName: PART_NAMES[lowestPart] || lowestPart,
    accuracy: lowestAcc,
    advice: PART_ADVICE[lowestPart] || 'Cần luyện tập thêm phần này để cải thiện điểm số.',
  };
}
