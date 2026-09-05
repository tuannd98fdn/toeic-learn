export type Part7QuestionType = 'Main Idea' | 'Detail' | 'Inference' | 'Vocabulary' | 'Sentence Insertion';

export interface Part7Question {
  id: string;
  number: number; // Question number (e.g., 147)
  type: Part7QuestionType;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface Part7Passage {
  id: string;
  type: 'Email' | 'Article' | 'Web Page' | 'Invoice' | 'Advertisement' | 'Text Message';
  title?: string;
  sender?: string;
  recipient?: string;
  date?: string;
  content: string; // Text or basic HTML (using \n for breaks)
  // For text messages, we can store structured data in content using a specific format or just plain text.
  // We'll use a JSON stringified format for text messages to render them as bubbles: 
  // '[{"sender":"John","time":"10:00","text":"Hi"},{"sender":"Mary","time":"10:05","text":"Hello"}]'
}

export interface Part7PassageSet {
  id: string;
  source: string; // ETS 2023, etc.
  type: 'Single' | 'Double' | 'Triple'; // Currently only supporting Single
  passages: Part7Passage[];
  questions: Part7Question[];
}

export const PART7_DATA: Part7PassageSet[] = [
  {
    id: "ets23_p7_001",
    source: "ETS 2023 - Test 1",
    type: "Single",
    passages: [
      {
        id: "p1",
        type: "Email",
        title: "Subject: Office Relocation Update",
        sender: "To: All Employees",
        recipient: "From: Management Team",
        date: "Date: October 12",
        content: "As you know, we will be moving to our new office building on November 1st. [1] To ensure a smooth transition, we ask that all employees pack their personal belongings by Friday, October 28. Moving boxes and labels will be provided by the facilities department starting next Monday. [2]\n\nPlease label all boxes clearly with your name and your new office number. If you are unsure of your new office number, please consult the floor plan posted in the break room. [3]\n\nIT staff will disconnect all computers and phones on the evening of October 28. [4] Do not attempt to disconnect these devices yourself. They will be set up in your new offices over the weekend so that you can begin work promptly on Monday morning."
      }
    ],
    questions: [
      {
        id: "q147",
        number: 147,
        type: "Main Idea",
        text: "What is the main purpose of the email?",
        options: {
          A: "To announce a change in company leadership",
          B: "To provide instructions for an upcoming move",
          C: "To request volunteers for a weekend project",
          D: "To explain how to use new computer equipment"
        },
        correctAnswer: "B",
        explanation: "Email chủ yếu đưa ra các hướng dẫn (instructions) cho việc chuyển văn phòng sắp tới (đóng gói đồ đạc, dán nhãn)."
      },
      {
        id: "q148",
        number: 148,
        type: "Detail",
        text: "What should employees do if they don't know their new office number?",
        options: {
          A: "Ask their supervisor",
          B: "Contact the facilities department",
          C: "Check the diagram in the break room",
          D: "Email the IT staff"
        },
        correctAnswer: "C",
        explanation: "Trong đoạn 2 có câu: 'If you are unsure of your new office number, please consult the floor plan posted in the break room.' (floor plan = diagram)."
      },
      {
        id: "q149",
        number: 149,
        type: "Inference",
        text: "What is implied about the IT staff?",
        options: {
          A: "They will be working on the weekend.",
          B: "They are moving to a different building.",
          C: "They will provide the moving boxes.",
          D: "They need new computers."
        },
        correctAnswer: "A",
        explanation: "Đoạn cuối nói: 'They (IT staff) will be set up in your new offices over the weekend...' Suy ra họ sẽ làm việc vào cuối tuần."
      },
      {
        id: "q150",
        number: 150,
        type: "Sentence Insertion",
        text: "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n'We kindly ask for your patience during this busy time.'",
        options: {
          A: "[1]",
          B: "[2]",
          C: "[3]",
          D: "[4]"
        },
        correctAnswer: "A",
        explanation: "Vị trí [1] là hợp lý nhất. Mở đầu bằng thông báo chuyển văn phòng, sau đó mong mọi người kiên nhẫn, rồi mới đi vào hướng dẫn chi tiết."
      }
    ]
  },
  {
    id: "ets23_p7_002",
    source: "ETS 2023 - Test 2",
    type: "Single",
    passages: [
      {
        id: "p2",
        type: "Text Message",
        title: "Text Message Chain",
        content: JSON.stringify([
          { sender: "Sarah Jenkins", time: "9:15 A.M.", text: "Hi Mark, did you get the caterer's final invoice for the client luncheon tomorrow?" },
          { sender: "Mark Owens", time: "9:18 A.M.", text: "Not yet. I emailed them yesterday afternoon but haven't heard back." },
          { sender: "Sarah Jenkins", time: "9:20 A.M.", text: "Can you call them? We need to submit the payment request to accounting by noon today." },
          { sender: "Mark Owens", time: "9:25 A.M.", text: "I'm on it. I'll let you know as soon as I have the numbers." },
          { sender: "Mark Owens", time: "9:45 A.M.", text: "Just got off the phone. They are emailing it right now. The total is $450." },
          { sender: "Sarah Jenkins", time: "9:46 A.M.", text: "Perfect. Please forward it to me so I can get the manager's signature." }
        ])
      }
    ],
    questions: [
      {
        id: "q151",
        number: 151,
        type: "Detail",
        text: "What are the speakers discussing?",
        options: {
          A: "A bill for an upcoming event",
          B: "A schedule for a meeting",
          C: "A menu for a restaurant",
          D: "A problem with a client"
        },
        correctAnswer: "A",
        explanation: "Họ đang nói về 'the caterer's final invoice for the client luncheon tomorrow' (hóa đơn từ nhà cung cấp dịch vụ ăn uống cho bữa trưa khách hàng ngày mai)."
      },
      {
        id: "q152",
        number: 152,
        type: "Vocabulary",
        text: "At 9:25 A.M., what does Mr. Owens most likely mean when he writes, 'I'm on it'?",
        options: {
          A: "He is standing on the document.",
          B: "He will handle the task immediately.",
          C: "He has found the missing email.",
          D: "He is currently on the phone."
        },
        correctAnswer: "B",
        explanation: "'I'm on it' là một idiom phổ biến có nghĩa là 'Tôi sẽ lo việc đó / xử lý ngay lập tức' (gọi điện thoại cho bên caterer)."
      }
    ]
  }
];

export const getRandomPart7Passage = (): Part7PassageSet => {
  const index = Math.floor(Math.random() * PART7_DATA.length);
  return PART7_DATA[index];
};
