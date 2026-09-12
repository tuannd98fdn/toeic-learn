export interface ToeicTip {
  id: string;
  part: string;
  title: string;
  content: string;
  examples?: string[];
  type: 'strategy' | 'grammar';
}

export const TOEIC_TIPS: ToeicTip[] = [
  {
    id: "tip_p1_1",
    part: "Part 1",
    title: "Mẹo tranh tả người",
    type: "strategy",
    content: "Luôn chú ý đến ĐỘNG TỪ (đang làm gì) và DANH TỪ (đối tượng nào). Đa số các câu sai ở Part 1 thường sai ở hành động hoặc đối tượng. Cẩn thận với bẫy thì hiện tại tiếp diễn thể bị động (is being + V3) khi không có người trong tranh.",
    examples: [
      "Tranh không có người: 'The car is being repaired' -> SAI (is being = đang được ai đó làm).",
      "Đúng: 'The car has been parked in the garage.'"
    ]
  },
  {
    id: "tip_p2_1",
    part: "Part 2",
    title: "Bẫy đồng âm / lặp từ",
    type: "strategy",
    content: "Các phương án chứa từ giống hệt hoặc đồng âm với từ trong câu hỏi thường là BẪY (khoảng 80%). Nếu không nghe rõ, hãy tránh chọn đáp án có từ lặp lại.",
    examples: [
      "Q: When is the new manager starting? (Bao giờ quản lý mới bắt đầu?)",
      "A: I'm staring at the computer. (staring - đồng âm với starting -> SAI)"
    ]
  },
  {
    id: "tip_p3_1",
    part: "Part 3",
    title: "Kỹ năng đoán trước câu hỏi (Anticipation)",
    type: "strategy",
    content: "Luôn đọc trước 3 câu hỏi và các đáp án TRƯỚC KHI đoạn hội thoại bắt đầu. Hãy xác định từ khóa để biết mình cần nghe thông tin gì (địa điểm, nghề nghiệp, vấn đề, hành động tiếp theo).",
    examples: [
      "Câu hỏi: 'Where does the conversation take place?' -> Tập trung nghe các từ vựng chỉ địa điểm ở ngay 2-3 câu đầu tiên."
    ]
  },
  {
    id: "tip_grammar_1",
    part: "Grammar",
    title: "Phân biệt V-ing và V-ed (Phân từ)",
    type: "grammar",
    content: "V-ing dùng cho TÍNH CHẤT của sự vật/sự việc (gây ra cảm giác đó). V-ed dùng cho CẢM XÚC của con người (bị tác động).",
    examples: [
      "The meeting was very boring. (Cuộc họp mang tính chất nhàm chán)",
      "The employees were bored. (Nhân viên cảm thấy nhàm chán)"
    ]
  },
  {
    id: "tip_p5_1",
    part: "Part 5",
    title: "Câu hỏi từ loại (Word Form)",
    type: "strategy",
    content: "Nếu 4 đáp án chung 1 gốc từ (ví dụ: create, creation, creative, creatively), đừng cố dịch nghĩa. Hãy phân tích cấu trúc xung quanh ô trống. Ví dụ: Trước danh từ điền tính từ; sau động từ điền trạng từ.",
    examples: [
      "The manager reviewed the ____ report. (report là danh từ -> cần tính từ bổ nghĩa).",
      "She sings ____. (sings là động từ -> cần trạng từ bổ nghĩa)."
    ]
  },
  {
    id: "tip_p7_1",
    part: "Part 7",
    title: "Kỹ năng Paraphrasing (Viết lại câu)",
    type: "strategy",
    content: "Part 7 là bài kiểm tra từ đồng nghĩa. Đáp án ĐÚNG hiếm khi lặp lại y hệt từ vựng trong bài đọc. Hãy tìm các từ khóa đồng nghĩa (Synonyms).",
    examples: [
      "Trong bài: 'annual conference'",
      "Đáp án đúng: 'yearly convention'"
    ]
  },
  {
    id: "tip_p7_2",
    part: "Part 7",
    title: "Kỹ năng Skimming và Scanning",
    type: "strategy",
    content: "Đừng đọc từng chữ! Sử dụng Skimming (Đọc lướt lấy ý chính) bằng cách đọc tiêu đề và câu đầu/câu cuối mỗi đoạn. Sử dụng Scanning (Đọc quét tìm dữ liệu) để tìm chính xác ngày tháng, tên riêng, con số theo từ khóa trong câu hỏi.",
    examples: [
      "Skimming: Nắm được đoạn văn nói về chính sách hoàn trả hàng mới.",
      "Scanning: Mắt quét thật nhanh để tìm con số '30 days' khi câu hỏi hỏi về thời hạn."
    ]
  }
];
