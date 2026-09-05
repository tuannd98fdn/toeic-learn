export type GrammarCategory = 'Part of Speech' | 'Verb Tense' | 'Preposition' | 'Conjunction' | 'Vocabulary';

export interface Part5Question {
  id: string;
  source: string; // Tên bộ đề (vd: ETS 2022, ETS 2023)
  sentence: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  category: GrammarCategory;
  explanation: string;
}

export const PART5_DATA: Part5Question[] = [
  {
    id: "ets22_001",
    source: "ETS 2022 - Test 1",
    sentence: "The new accounting software is designed to help businesses process transactions more ___.",
    options: {
      A: "efficient",
      B: "efficiently",
      C: "efficiency",
      D: "efficiencies"
    },
    correctAnswer: "B",
    category: "Part of Speech",
    explanation: "Cần một trạng từ (adverb) để bổ nghĩa cho động từ 'process' (xử lý các giao dịch một cách hiệu quả hơn)."
  },
  {
    id: "ets22_002",
    source: "ETS 2022 - Test 1",
    sentence: "___ the renovations are complete, the public library will resume its normal operating hours.",
    options: {
      A: "Once",
      B: "During",
      C: "Despite",
      D: "However"
    },
    correctAnswer: "A",
    category: "Conjunction",
    explanation: "Cần một liên từ nối 2 mệnh đề. 'Once' mang nghĩa 'Một khi' (Một khi việc cải tạo hoàn tất, thư viện sẽ mở cửa lại). 'During' và 'Despite' là giới từ cộng danh từ."
  },
  {
    id: "ets22_003",
    source: "ETS 2022 - Test 1",
    sentence: "All employees must present their identification badges to the security guard ___ entering the building.",
    options: {
      A: "upon",
      B: "into",
      C: "over",
      D: "within"
    },
    correctAnswer: "A",
    category: "Preposition",
    explanation: "Cấu trúc 'upon + V-ing' nghĩa là 'ngay khi làm việc gì đó' (ngay khi bước vào tòa nhà)."
  },
  {
    id: "ets22_004",
    source: "ETS 2022 - Test 2",
    sentence: "Mr. Patel is widely respected for his ___ to resolving customer complaints quickly.",
    options: {
      A: "commit",
      B: "committing",
      C: "commitment",
      D: "commits"
    },
    correctAnswer: "C",
    category: "Part of Speech",
    explanation: "Sau tính từ sở hữu 'his' cần một danh từ. 'Commitment' (sự cam kết)."
  },
  {
    id: "ets22_005",
    source: "ETS 2022 - Test 2",
    sentence: "The board of directors requested that the marketing manager ___ the proposed budget by Friday.",
    options: {
      A: "submit",
      B: "submits",
      C: "submitted",
      D: "submitting"
    },
    correctAnswer: "A",
    category: "Verb Tense",
    explanation: "Câu bàng thái cách (Subjunctive) với 'requested that'. Động từ theo sau chủ ngữ (the marketing manager) phải ở dạng nguyên thể không 'to' (submit)."
  },
  {
    id: "ets23_001",
    source: "ETS 2023 - Test 1",
    sentence: "Because of the heavy snow, the flight to Denver has been ___ until further notice.",
    options: {
      A: "delayed",
      B: "prevented",
      C: "declined",
      D: "resisted"
    },
    correctAnswer: "A",
    category: "Vocabulary",
    explanation: "Dựa vào nghĩa của câu: Chuyến bay bị 'trì hoãn' (delayed) do tuyết rơi dày."
  },
  {
    id: "ets23_002",
    source: "ETS 2023 - Test 1",
    sentence: "Sales representatives are eligible for a bonus if they exceed their sales ___ for the quarter.",
    options: {
      A: "quarters",
      B: "targets",
      C: "receipts",
      D: "accounts"
    },
    correctAnswer: "B",
    category: "Vocabulary",
    explanation: "Cụm từ đi chung: 'exceed sales targets' (vượt chỉ tiêu doanh số)."
  },
  {
    id: "ets23_003",
    source: "ETS 2023 - Test 2",
    sentence: "The committee will review the applications and contact the ___ candidates for an interview.",
    options: {
      A: "success",
      B: "successful",
      C: "successfully",
      D: "succeed"
    },
    correctAnswer: "B",
    category: "Part of Speech",
    explanation: "Đứng trước danh từ 'candidates' cần một tính từ. 'Successful candidates' (các ứng viên thành công/đạt yêu cầu)."
  },
  {
    id: "ets23_004",
    source: "ETS 2023 - Test 2",
    sentence: "___ of the attendees at yesterday's conference expressed interest in the new software system.",
    options: {
      A: "Much",
      B: "Every",
      C: "Many",
      D: "Almost"
    },
    correctAnswer: "C",
    category: "Vocabulary",
    explanation: "'Attendees' là danh từ đếm được số nhiều, nên dùng 'Many' (Nhiều người tham dự). 'Much' dùng cho danh từ không đếm được. 'Every' không đứng trước 'of'."
  },
  {
    id: "ets23_005",
    source: "ETS 2023 - Test 3",
    sentence: "The newly hired technician will ___ to the maintenance department on Monday.",
    options: {
      A: "report",
      B: "reports",
      C: "reporting",
      D: "reported"
    },
    correctAnswer: "A",
    category: "Verb Tense",
    explanation: "Sau trợ động từ tương lai 'will' phải là động từ nguyên mẫu."
  }
];

export const getRandomPart5Questions = (count: number = 5): Part5Question[] => {
  const shuffled = [...PART5_DATA].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
