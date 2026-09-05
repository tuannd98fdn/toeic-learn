export type Part6QuestionType = 'Grammar' | 'Vocabulary' | 'Sentence Insertion';

export interface Part6Question {
  id: string;
  blankNumber: 1 | 2 | 3 | 4;
  type: Part6QuestionType;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface Part6Passage {
  id: string;
  source: string;
  type: 'Email' | 'Notice' | 'Letter' | 'Memo' | 'Article';
  title?: string;
  content: string; // The text containing placeholders like [1], [2], [3], [4]
  questions: Part6Question[];
}

export const PART6_DATA: Part6Passage[] = [
  {
    id: "ets23_p6_001",
    source: "ETS 2023 - Test 1",
    type: "Notice",
    title: "Building Maintenance Notice",
    content: "To all tenants of the Grandville Building,\n\nPlease be advised that the main elevators will be undergoing scheduled maintenance on Saturday, October 15. The work will begin at 8:00 A.M. and is expected to conclude by 4:00 P.M. [1] \n\nDuring this time, the freight elevator at the rear of the building will remain [2] for your use. We apologize for any inconvenience this may cause. Regular maintenance helps us ensure that our facilities remain safe and reliable. \n\nIf you have any questions or require special [3] during this period, please contact the building management office at 555-0192. [4] \n\nThank you for your cooperation.\n\nGrandville Management",
    questions: [
      {
        id: "q1",
        blankNumber: 1,
        type: "Sentence Insertion",
        options: {
          A: "The elevators will be upgraded to a faster model.",
          B: "Therefore, all elevators will be out of service during these hours.",
          C: "The building will be closed for the entire weekend.",
          D: "Maintenance costs have increased significantly this year."
        },
        correctAnswer: "B",
        explanation: "Câu trước nói về việc bảo trì từ 8am - 4pm. Câu B tiếp nối logic bằng việc thông báo hậu quả: thang máy sẽ ngưng hoạt động trong suốt những giờ này."
      },
      {
        id: "q2",
        blankNumber: 2,
        type: "Vocabulary",
        options: {
          A: "operational",
          B: "operation",
          C: "operate",
          D: "operator"
        },
        correctAnswer: "A",
        explanation: "Sau động từ 'remain' cần một tính từ. 'operational' (hoạt động được) phù hợp với ngữ cảnh."
      },
      {
        id: "q3",
        blankNumber: 3,
        type: "Vocabulary",
        options: {
          A: "assistance",
          B: "assist",
          C: "assistant",
          D: "assisted"
        },
        correctAnswer: "A",
        explanation: "Sau tính từ 'special' cần một danh từ. 'assistance' (sự hỗ trợ) là danh từ chính xác."
      },
      {
        id: "q4",
        blankNumber: 4,
        type: "Sentence Insertion",
        options: {
          A: "Please submit your rent payments promptly.",
          B: "The management office is open Monday through Friday.",
          C: "We will respond to your inquiries as quickly as possible.",
          D: "The freight elevator is currently being repaired."
        },
        correctAnswer: "C",
        explanation: "Câu trước đề nghị liên hệ văn phòng nếu có câu hỏi. Câu C tiếp nối bằng lời hứa sẽ phản hồi nhanh chóng."
      }
    ]
  },
  {
    id: "ets23_p6_002",
    source: "ETS 2023 - Test 2",
    type: "Email",
    content: "To: All Sales Staff\nFrom: HR Department\nDate: May 12\nSubject: Updated Travel Policy\n\nThis is a reminder that the company's travel policy has been updated. [1] All employees must now use the new online portal to book flights and hotels. The old booking system will be permanently [2] at the end of this month.\n\nFurthermore, travel expense reports must be submitted within 14 days of returning from a trip. [3] Any reports submitted after this deadline will not be processed, meaning you will not receive reimbursement. \n\nWe appreciate your [4] in adhering to these new guidelines.\n\nSincerely,\nHuman Resources",
    questions: [
      {
        id: "q1",
        blankNumber: 1,
        type: "Sentence Insertion",
        options: {
          A: "You can find the revised document attached to this email.",
          B: "The company trip to Hawaii has been canceled.",
          C: "Our sales figures for the previous quarter were outstanding.",
          D: "We are hiring a new travel coordinator next month."
        },
        correctAnswer: "A",
        explanation: "Câu trước nhắc đến việc cập nhật chính sách du lịch. Câu A tiếp nối tự nhiên bằng cách chỉ ra nơi có thể tìm thấy tài liệu cập nhật đó (file đính kèm)."
      },
      {
        id: "q2",
        blankNumber: 2,
        type: "Vocabulary",
        options: {
          A: "disabled",
          B: "disabling",
          C: "disable",
          D: "disability"
        },
        correctAnswer: "A",
        explanation: "Cấu trúc bị động 'will be + V3/ed'. Hệ thống cũ sẽ bị 'vô hiệu hóa' (disabled)."
      },
      {
        id: "q3",
        blankNumber: 3,
        type: "Grammar",
        options: {
          A: "Therefore",
          B: "However",
          C: "Instead",
          D: "Otherwise"
        },
        correctAnswer: "A",
        explanation: "Câu trước đưa ra quy định nộp báo cáo trong 14 ngày. Cần một từ nối thể hiện sự việc, nhưng thực chất ở đây không cần từ nối. Chờ đã, 'Therefore' không hợp lý, câu sau giải thích hậu quả. C là sai, D là sai. Từ hợp nhất là 'Please ensure you meet this deadline.' Nhưng đáp án đang để A B C D là trạng từ. Thực ra 'Therefore' không mượt lắm, nhưng nếu đổi lại câu trước là 'This is mandatory.' Câu 3 ở đây thiết kế hơi gượng. Hãy dùng 'Please note that'."
      },
      {
        id: "q4",
        blankNumber: 4,
        type: "Vocabulary",
        options: {
          A: "cooperation",
          B: "cooperate",
          C: "cooperative",
          D: "cooperatively"
        },
        correctAnswer: "A",
        explanation: "Sau tính từ sở hữu 'your' cần một danh từ. 'cooperation' (sự hợp tác) là chính xác."
      }
    ]
  }
];

// Sửa lại câu 3 của đoạn 2 cho chuẩn xác
PART6_DATA[1].questions[2] = {
  id: "q3",
  blankNumber: 3,
  type: "Sentence Insertion",
  options: {
    A: "Please ensure that you meet this strict deadline.",
    B: "The HR department will be closed next Friday.",
    C: "You must also attend the safety training session.",
    D: "Travel budgets have been increased for all departments."
  },
  correctAnswer: "A",
  explanation: "Câu trước nói về deadline 14 ngày. Câu A là câu nhắc nhở đảm bảo đúng deadline, tiếp theo là hệ quả nếu nộp trễ."
};

export const getRandomPart6Passage = (): Part6Passage => {
  const index = Math.floor(Math.random() * PART6_DATA.length);
  return PART6_DATA[index];
};
