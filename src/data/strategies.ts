export type TipType = 'strategy' | 'trap' | 'grammar';
export type TargetBand = '450+' | '650+' | '800+' | 'all';
export type ToeicPart =
  | 'Part 1'
  | 'Part 2'
  | 'Part 3'
  | 'Part 4'
  | 'Part 5'
  | 'Part 6'
  | 'Part 7'
  | 'General';

export interface TipExample {
  context?: string;
  incorrect?: string;
  correct: string;
  explanation: string;
}

export interface ToeicTip {
  id: string;
  part: ToeicPart;
  type: TipType;
  targetBand: TargetBand;
  title: string;
  shortSummary: string;
  content: string;
  trapWarning?: string;
  ruleFormula?: string;
  examples?: TipExample[];
  tags: string[];
  practiceLink?: string;
  practiceTitle?: string;
}

export const TOEIC_TIPS: ToeicTip[] = [
  // ==================== PART 1: PHOTOGRAPHS ====================
  {
    id: 'tip_p1_being',
    part: 'Part 1',
    type: 'trap',
    targetBand: '450+',
    title: 'Bẫy bị động tiếp diễn "is being + V3" trong tranh tĩnh',
    shortSummary: 'Tranh không có người mà nghe thấy "is being + V3" thì 99% là đáp án sai.',
    content: 'Cấu trúc "is/are being + V3" diễn tả hành động đang được một người nào đó thực hiện lên đồ vật. Nếu bức tranh chỉ có đồ vật, cảnh vật mà không có người đang thao tác, phương án này chắc chắn là bẫy.',
    trapWarning: 'ETS rất thích đưa câu "The car is being repaired" hoặc "Boxes are being loaded" vào các bức tranh chụp đường phố vắng người hoặc kho hàng tĩnh.',
    ruleFormula: 'Tranh KHÔNG có người + Nghe thấy "being" -> LOẠI NGAY.',
    examples: [
      {
        context: 'Tranh chụp chiếc xe ô tô đỗ bên đường, xung quanh không có ai.',
        incorrect: 'A) The car is being washed. (Sai vì không có người đang rửa xe)',
        correct: 'B) The car is parked next to the curb.',
        explanation: '"Is parked" chỉ trạng thái chiếc xe đã đỗ sẵn, phù hợp với tranh tĩnh.'
      }
    ],
    tags: ['Part 1', 'Bị động', 'Tranh tĩnh'],
    practiceLink: '/part1',
    practiceTitle: 'Luyện Part 1: Bẫy mô tả tranh'
  },
  {
    id: 'tip_p1_wearing',
    part: 'Part 1',
    type: 'trap',
    targetBand: '450+',
    title: 'Bẫy hành động (Putting on) vs Trạng thái (Wearing)',
    shortSummary: 'Phân biệt hành động đang xỏ tay vào áo với trạng thái đã mặc sẵn trên người.',
    content: '"Putting on / Trying on" miêu tả hành động đang mặc đồ, đang đội mũ, đang đeo kính (tay đang cầm vào vật đó). Trong khi đó, "Wearing" miêu tả trạng thái đồ vật đã ở sẵn trên người.',
    trapWarning: '90% tranh Part 1 nhân vật đã mặc sẵn quần áo/mũ bảo hiểm. Do đó "putting on" gần như luôn là bẫy hành động.',
    ruleFormula: 'Nhân vật đã mặc đồ xong -> Chọn "Wearing", Bỏ "Putting on / Trying on".',
    examples: [
      {
        context: 'Tranh kỹ sư công trường đang đứng kiểm tra bản vẽ, trên đầu đã đội sẵn mũ bảo hộ.',
        incorrect: 'A) He is putting on a hard hat. (Sai vì tay anh ta không cầm mũ để đội)',
        correct: 'B) He is wearing a protective helmet.',
        explanation: 'Anh ấy đã đội mũ sẵn nên chỉ dùng "wearing".'
      }
    ],
    tags: ['Part 1', 'Hành động vs Trạng thái', 'Từ vựng'],
    practiceLink: '/part1',
    practiceTitle: 'Luyện Part 1: Nhận diện hành động'
  },
  {
    id: 'tip_p1_minor_object',
    part: 'Part 1',
    type: 'trap',
    targetBand: '650+',
    title: 'Bẫy chi tiết phụ ở góc tranh làm phân tâm chủ thể',
    shortSummary: 'ETS cố tình miêu tả đồ vật nhỏ bé ở góc để lừa người nghe không bao quát hết bức tranh.',
    content: 'Đôi khi chủ thể trung tâm của bức tranh là 2 người đang nói chuyện, nhưng cả 4 phương án không hề nhắc tới người đó mà lại miêu tả vị trí của một chậu cây, một bức tranh treo tường, hoặc một cánh cửa mở hé.',
    trapWarning: 'Đừng chỉ tập trung nhìn vào người ở trung tâm. Hãy quan sát nhanh cả hậu cảnh (background) và tiền cảnh (foreground).',
    ruleFormula: 'Không nghe thấy từ về người -> Lập tức quét mắt tìm các đồ vật tĩnh xung quanh.',
    examples: [
      {
        context: 'Hai người ngồi bàn ăn, nhưng đáp án không nói về họ.',
        incorrect: 'A) They are preparing a meal. (Sai vì đồ ăn đã dọn xong rồi)',
        correct: 'B) A lamp is hanging above the dining table.',
        explanation: 'Mô tả chính xác đồ vật ở hậu cảnh bức tranh.'
      }
    ],
    tags: ['Part 1', 'Hậu cảnh', 'Bao quát tranh'],
    practiceLink: '/part1',
    practiceTitle: 'Luyện Part 1: Quan sát hậu cảnh'
  },
  {
    id: 'tip_p1_elimination',
    part: 'Part 1',
    type: 'strategy',
    targetBand: '450+',
    title: 'Chiến thuật loại trừ 3 đáp án sai',
    shortSummary: 'Thay vì tìm câu đúng 100%, hãy gạch bỏ ngay những câu có từ sai.',
    content: 'Trong Part 1, chỉ cần nghe thấy một từ sai (sai chủ ngữ, sai động từ, hoặc sai giới từ chỉ vị trí) là có thể gạch bỏ phương án đó ngay lập tức mà không cần nghe hết câu.',
    ruleFormula: 'Sai 1 từ = Sai cả câu -> Gạch ngay trong đầu hoặc dùng đầu bút định vị.',
    examples: [
      {
        context: 'Một người phụ nữ đang đọc sách trong thư viện.',
        incorrect: 'A) A woman is writing on a notebook. (Nghe thấy "writing" là gạch ngay)',
        correct: 'B) A woman is holding an open book.',
        explanation: 'Loại trừ các câu có động từ không khớp với tranh.'
      }
    ],
    tags: ['Part 1', 'Kỹ thuật loại trừ', 'Chiến thuật'],
    practiceLink: '/part1',
    practiceTitle: 'Luyện Part 1: Kỹ thuật làm bài'
  },

  // ==================== PART 2: QUESTION-RESPONSE ====================
  {
    id: 'tip_p2_sound',
    part: 'Part 2',
    type: 'trap',
    targetBand: '450+',
    title: 'Bẫy từ đồng âm / gần âm và lặp từ trong câu hỏi',
    shortSummary: 'Đáp án chứa từ lặp lại y hệt hoặc phát âm na ná từ trong câu hỏi có tỷ lệ sai lên đến 80%.',
    content: 'Não bộ người học có xu hướng bị thu hút bởi những từ quen thuộc vừa nghe được. ETS khai thác tâm lý này bằng cách đưa các từ lặp lại hoặc từ đồng âm (homophones) vào các phương án gây nhiễu.',
    trapWarning: 'Nếu bạn không nghe hiểu trọn vẹn cả câu mà chỉ bắt được 1-2 từ khóa, tuyệt đối TRÁNH chọn đáp án lặp lại từ khóa đó.',
    ruleFormula: 'Từ trong đáp án nghe GIỐNG từ trong câu hỏi -> 80% là BẪY.',
    examples: [
      {
        context: 'Câu hỏi hỏi về việc nộp bản báo cáo.',
        incorrect: 'Q: Where did you file the report? -> A: I reported it yesterday. (Lặp lại "report" -> SAI)',
        correct: 'B: In the cabinet behind the desk.',
        explanation: 'Đáp án đúng trả lời trực tiếp cho câu hỏi nơi chốn "Where".'
      },
      {
        context: 'Từ gần âm gây nhầm lẫn.',
        incorrect: 'Q: Could you send me the copy? -> A: I take my coffee black. (copy vs coffee -> SAI)',
        correct: 'B: Sure, right away.',
        explanation: '"Coffee" phát âm gần giống "copy" là bẫy đồng âm kinh điển.'
      }
    ],
    tags: ['Part 2', 'Bẫy đồng âm', 'Lặp từ'],
    practiceLink: '/part2',
    practiceTitle: 'Luyện Part 2: Phản xạ hỏi đáp'
  },
  {
    id: 'tip_p2_wh_yesno',
    part: 'Part 2',
    type: 'trap',
    targetBand: '450+',
    title: 'Bẫy trả lời Yes / No cho câu hỏi Wh-',
    shortSummary: 'Câu hỏi bắt đầu bằng Who, Where, When, Why, What, How tuyệt đối KHÔNG trả lời bằng Yes/No.',
    content: 'Các câu hỏi lấy thông tin (Wh-questions) yêu cầu người đáp cung cấp dữ liệu cụ thể (người, địa điểm, thời gian, lý do, phương thức). Các phương án bắt đầu bằng "Yes", "No", "Sure", "Of course" là bẫy loại ngay từ giây đầu tiên.',
    trapWarning: 'Chỉ cần nghe thấy từ đầu tiên là Wh- và đáp án bắt đầu bằng Yes/No -> Loại ngay lập tức.',
    ruleFormula: 'Wh- question + (Yes / No / Sure) -> LOẠI NGAY LẬP TỨC.',
    examples: [
      {
        context: 'Hỏi về thời gian cuộc họp bắt đầu.',
        incorrect: 'Q: When does the board meeting start? -> A: Yes, in room 402. (Sai vì trả lời Yes)',
        correct: 'B: At two o\'clock sharp.',
        explanation: 'Hỏi "When" cần câu trả lời chỉ thời gian, không dùng Yes/No.'
      }
    ],
    tags: ['Part 2', 'Wh-questions', 'Loại trừ nhanh'],
    practiceLink: '/part2',
    practiceTitle: 'Luyện Part 2: Bắt từ hỏi đầu câu'
  },
  {
    id: 'tip_p2_indirect',
    part: 'Part 2',
    type: 'strategy',
    targetBand: '650+',
    title: 'Chiến thuật giải quyết câu trả lời gián tiếp (Indirect Answers)',
    shortSummary: 'Trong đề thi mới, đáp án đúng thường không trả lời trực tiếp mà né tránh hoặc dùng câu hỏi ngược.',
    content: 'Xu hướng đề thi TOEIC hiện đại tăng mạnh các câu trả lời mang tính đời sống thực tế: "Tôi không biết", "Hãy hỏi người khác", "Lịch bị hoãn rồi", hoặc đưa ra câu trả lời bằng một câu hỏi.',
    ruleFormula: 'Không nghe thấy câu trả lời trực tiếp -> Tìm câu trả lời mang tính logic đời thường (I haven\'t checked, Ask Sarah, It was rescheduled).',
    examples: [
      {
        context: 'Hỏi ai sẽ phụ trách dự án mới.',
        incorrect: 'Q: Who will lead the marketing campaign? -> A: Yes, he is leading. (Bẫy Yes/No)',
        correct: 'B: The director hasn\'t decided yet.',
        explanation: '"Giám đốc vẫn chưa quyết định" là câu trả lời gián tiếp hoàn toàn hợp lý.'
      },
      {
        context: 'Hỏi giờ chuyến bay.',
        incorrect: 'Q: Do you know when the flight arrives? -> A: Yes, at the airport.',
        correct: 'B: Let me check the schedule on my phone.',
        explanation: 'Người đáp không biết giờ nên bảo sẽ kiểm tra lịch trình.'
      }
    ],
    tags: ['Part 2', 'Câu trả lời gián tiếp', 'Band 650+'],
    practiceLink: '/part2',
    practiceTitle: 'Luyện Part 2: Câu trả lời gián tiếp'
  },
  {
    id: 'tip_p2_negative_tag',
    part: 'Part 2',
    type: 'trap',
    targetBand: '650+',
    title: 'Bẫy câu hỏi phủ định và câu hỏi đuôi (Negative & Tag Questions)',
    shortSummary: 'Trong tiếng Anh, Yes luôn là CÓ và No luôn là KHÔNG, bất kể câu hỏi có chữ "Not" hay không.',
    content: 'Người Việt hay nhầm lẫn: "Bạn chưa ăn cơm à? - Ừ (nghĩa là chưa ăn)". Nhưng trong tiếng Anh: "Haven\'t you eaten? - No, I haven\'t" (No nghĩa là chưa ăn) và "Yes, I have" (Yes nghĩa là đã ăn rồi).',
    trapWarning: 'Bỏ qua từ "Not" trong câu hỏi để hiểu nghĩa bản chất của hành động, sau đó chọn Yes/No theo sự thật khách quan.',
    ruleFormula: 'Tập trung vào hành động chính: Sự thật ĐÃ LÀM -> Chọn Yes; Sự thật CHƯA LÀM -> Chọn No.',
    examples: [
      {
        context: 'Câu hỏi phủ định về việc gửi hóa đơn.',
        incorrect: 'Q: Didn\'t you send the invoice? -> A: Yes, I didn\'t have time. (Mâu thuẫn logic)',
        correct: 'B: No, I will do it this afternoon.',
        explanation: '"No" nghĩa là chưa gửi, kèm lời giải thích sẽ làm vào chiều nay.'
      }
    ],
    tags: ['Part 2', 'Câu hỏi phủ định', 'Câu hỏi đuôi'],
    practiceLink: '/part2',
    practiceTitle: 'Luyện Part 2: Câu hỏi phủ định'
  },
  {
    id: 'tip_p2_choice_or',
    part: 'Part 2',
    type: 'trap',
    targetBand: '450+',
    title: 'Bẫy câu hỏi lựa chọn có từ "Or"',
    shortSummary: 'Câu hỏi lựa chọn (A or B) KHÔNG ĐƯỢC trả lời bằng Yes hoặc No.',
    content: 'Khi người nói hỏi bạn muốn chọn phương án nào ("Would you prefer tea or coffee?"), bạn phải chọn 1 trong 2, hoặc chọn cả hai (Both), hoặc không chọn cái nào (Neither), hoặc đưa ra lựa chọn thứ 3. Tuyệt đối không chọn Yes/No.',
    ruleFormula: 'Câu hỏi chứa "Or" + Đáp án bắt đầu bằng Yes/No -> LOẠI NGAY.',
    examples: [
      {
        context: 'Hỏi phương tiện đi lại.',
        incorrect: 'Q: Should we take a taxi or the subway? -> A: Yes, it\'s fast. (Bẫy Yes/No -> SAI)',
        correct: 'B: The subway is usually quicker at this hour.',
        explanation: 'Người đáp chọn "the subway" và đưa ra lý do hợp lý.'
      }
    ],
    tags: ['Part 2', 'Câu hỏi lựa chọn', 'Or'],
    practiceLink: '/part2',
    practiceTitle: 'Luyện Part 2: Câu hỏi lựa chọn'
  },

  // ==================== PART 3 & PART 4: CONVERSATIONS & TALKS ====================
  {
    id: 'tip_p3_read_ahead',
    part: 'Part 3',
    type: 'strategy',
    targetBand: '450+',
    title: 'Kỹ năng đọc trước 3 câu hỏi (Anticipation) trong 8 giây nghỉ',
    shortSummary: 'Luôn đọc xong câu hỏi và gạch chân từ khóa TRƯỚC KHI đoạn băng phát sóng.',
    content: 'Thứ tự vàng khi làm Part 3 & 4: Khi băng đọc câu hỏi 32, 33, 34 thì bạn đã phải khoanh xong đáp án và mắt chuyển sang đọc lướt câu hỏi 35, 36, 37. Xác định rõ: Ai đang nói? Họ nói về chủ đề gì? Cần chú ý nghe số liệu hay hành động?',
    ruleFormula: 'Quy tắc cuốn chiếu: Vừa nghe vừa khoanh -> Băng đọc câu hỏi là lúc đọc đoạn kế tiếp.',
    examples: [
      {
        context: 'Đọc trước câu hỏi: "Where does the woman work?"',
        correct: 'Não bộ chuẩn bị sẵn sàng bắt các từ khóa về địa điểm (hotel, hospital, library, car dealership) ngay trong câu đầu tiên của người phụ nữ.',
        explanation: 'Đoán trước thông tin giúp bạn không bị động khi nghe băng.'
      }
    ],
    tags: ['Part 3', 'Part 4', 'Đọc trước câu hỏi', 'Quản lý thời gian'],
    practiceLink: '/part3',
    practiceTitle: 'Luyện Part 3: Bắt keyword hội thoại'
  },
  {
    id: 'tip_p3_three_fingers',
    part: 'Part 3',
    type: 'strategy',
    targetBand: '650+',
    title: 'Kỹ thuật 3 ngón tay định vị đáp án trên tờ đề',
    shortSummary: 'Đặt 3 ngón tay lên 3 câu hỏi để giữ nhịp làm bài, không bị mất tập trung.',
    content: 'Khi nghe đoạn hội thoại, đặt ngón trỏ vào câu 1, ngón giữa vào câu 2, ngón áp út vào câu 3. Nghe thấy từ khóa của câu nào thì ngón tay đó lập tức trỏ vào đáp án tương ứng. Đến cuối bài, bạn chỉ mất 2 giây để tô trọn vẹn cả 3 đáp án.',
    ruleFormula: '3 ngón tay cố định vị trí = Giảm 80% áp lực trí nhớ ngắn hạn khi nghe.',
    examples: [
      {
        context: 'Đoạn hội thoại nói nhanh gồm 3 câu hỏi liên tiếp.',
        correct: 'Ngón 1 bắt địa điểm ở câu mở đầu -> Ngón 2 bắt vấn đề ở giữa -> Ngón 3 bắt hành động tiếp theo ở câu kết.',
        explanation: 'Phương pháp này triệt tiêu hoàn toàn thói quen nghe xong mới đọc câu hỏi rồi quên mất thông tin.'
      }
    ],
    tags: ['Part 3', 'Part 4', 'Kỹ thuật 3 ngón tay'],
    practiceLink: '/part3',
    practiceTitle: 'Luyện Part 3: Kỹ thuật phản xạ'
  },
  {
    id: 'tip_p3_mind_change',
    part: 'Part 3',
    type: 'trap',
    targetBand: '650+',
    title: 'Bẫy đổi ý phút chót (Mind-changing signal words)',
    shortSummary: 'Người nói đồng ý thông tin lúc đầu nhưng lập tức thay đổi bằng "Actually, However, Wait".',
    content: 'ETS rất hay cho nhân vật đưa ra một thời gian hoặc địa điểm ở câu đầu, nhưng ngay sau đó lại nói: "Actually, I have a conflict at that time, let\'s move it to Friday". Nếu thí sinh vội vàng khoanh đáp án đầu tiên sẽ rơi vào bẫy.',
    trapWarning: 'Cảnh giác cao độ với các từ chuyển hướng: "Actually", "Wait a minute", "However", "On second thought", "Unfortunately".',
    ruleFormula: 'Nghe thấy từ chuyển ý (Actually/However) -> Thông tin ĐỨNG SAU mới là đáp án đúng.',
    examples: [
      {
        context: 'Hỏi về thời gian tổ chức sự kiện.',
        incorrect: 'Speaker A: "Can we schedule it for Tuesday morning?" -> Thí sinh chọn Tuesday là SAI.',
        correct: 'Speaker B: "Tuesday is fine, but actually my flight gets in late, so let\'s make it Wednesday." -> Đáp án đúng: Wednesday.',
        explanation: 'Từ "actually" phủ định đề xuất thứ Ba ban đầu.'
      }
    ],
    tags: ['Part 3', 'Part 4', 'Đổi ý phút chót', 'Từ chuyển hướng'],
    practiceLink: '/part4',
    practiceTitle: 'Luyện Part 4: Bài nói ngắn'
  },
  {
    id: 'tip_p4_graphic',
    part: 'Part 4',
    type: 'strategy',
    targetBand: '800+',
    title: 'Chiến thuật xử lý câu hỏi đối chiếu biểu đồ / hình ảnh đồ họa',
    shortSummary: 'Nghe thông tin ở cột này nhưng đáp án đúng lại nằm ở cột đối ứng kia.',
    content: 'Đối với các câu hỏi có dòng chữ "Look at the graphic", người nói KHÔNG BAO GIỜ đọc thẳng từ vựng trong đáp án. Nếu đáp án là tên người ở cột A, người nói sẽ đọc nhiệm vụ hoặc chức danh ở cột B. Nhiệm vụ của bạn là đối chiếu từ cột B sang cột A.',
    ruleFormula: 'Nhìn vào câu hỏi hỏi cột nào -> Tập trung nghe thông tin ở CỘT ĐỐI DIỆN.',
    examples: [
      {
        context: 'Bảng giá vé máy bay: Hạng ghế (Economy, Business) và Mức giá ($200, $500). Câu hỏi: "Which ticket will the speaker purchase?" (Đáp án: A) Economy B) Business).',
        correct: 'Người nói sẽ KHÔNG nói từ "Economy" mà nói: "I have a budget of under $300 for this flight". Đối chiếu $300 với bảng -> chọn Economy ($200).',
        explanation: 'Đối chiếu chéo giữa thông tin trong bài nói và biểu đồ.'
      }
    ],
    tags: ['Part 4', 'Look at the graphic', 'Đồ họa', 'Band 800+'],
    practiceLink: '/part4',
    practiceTitle: 'Luyện Part 4: Câu hỏi biểu đồ'
  },
  {
    id: 'tip_p4_speaker_role',
    part: 'Part 4',
    type: 'strategy',
    targetBand: '650+',
    title: 'Bắt vai trò người nói và địa điểm qua từ vựng chuyên ngành',
    shortSummary: 'Nhận diện người nói là ai qua các cụm từ xưng hô và thuật ngữ công sở đặc trưng.',
    content: 'Trong Part 4 (Bài nói đơn lẻ: Announcement, Voicemail, Tour, Advertisement), danh tính người nói không được nêu thẳng mà suy ra từ lời mở đầu và từ vựng đặc thù.',
    ruleFormula: 'Nghe từ vựng ngữ cảnh: "flight/boarding" -> Sân bay; "passengers/train" -> Ga tàu; "recipe/specials" -> Nhà hàng.',
    examples: [
      {
        context: 'Câu hỏi: "Who most likely is the speaker?"',
        correct: 'Mở đầu bài nói: "Welcome aboard flight 412, please fasten your seatbelts..." -> Người nói là Flight Attendant / Pilot.',
        explanation: 'Nhận diện ngay nghề nghiệp qua từ "welcome aboard" và "seatbelts".'
      }
    ],
    tags: ['Part 4', 'Ngữ cảnh', 'Vai trò người nói'],
    practiceLink: '/part4',
    practiceTitle: 'Luyện Part 4: Bài nói ngắn'
  },

  // ==================== PART 5: INCOMPLETE SENTENCES ====================
  {
    id: 'tip_p5_20s_rule',
    part: 'Part 5',
    type: 'strategy',
    targetBand: '450+',
    title: 'Quy tắc 20 giây / câu và Kỹ thuật nhận diện từ loại (Word Form)',
    shortSummary: '4 đáp án chung 1 gốc từ thì TUYỆT ĐỐI KHÔNG DỊCH NGHĨA, hãy nhìn trước và sau chỗ trống.',
    content: 'Part 5 có 30 câu, bạn chỉ được phép làm trong tối đa 10-12 phút (trung bình 20s/câu). Đối với dạng câu hỏi từ loại (chung gốc từ, khác đuôi), chỉ cần xác định từ loại còn thiếu dựa vào cấu trúc ngữ pháp xung quanh.',
    ruleFormula: 'Công thức cụm danh từ kinh điển: (a/the/tính từ sở hữu) + [ADJECTIVE] + NOUN.',
    examples: [
      {
        context: 'Câu hỏi cần điền tính từ.',
        incorrect: 'The manager submitted a ____ report yesterday. (A: create, B: creation, C: creative, D: creatively)',
        correct: 'C: creative',
        explanation: '"a" là mạo từ, "report" là danh từ -> Giữa mạo từ và danh từ bắt buộc là Tính từ (creative).'
      }
    ],
    tags: ['Part 5', 'Từ loại', 'Quy tắc 20s', 'Tốc độ'],
    practiceLink: '/part5?subCategory=Word%20Form',
    practiceTitle: 'Luyện Part 5: Chuyên đề Từ loại'
  },
  {
    id: 'tip_p5_conj_prep',
    part: 'Part 5',
    type: 'trap',
    targetBand: '650+',
    title: 'Bẫy Liên từ (Conjunction) vs Giới từ (Preposition)',
    shortSummary: 'Liên từ nối 2 mệnh đề (S + V), còn Giới từ chỉ đi kèm Cụm danh từ / V-ing.',
    content: 'ETS rất thích đưa các cặp từ cùng mang nghĩa "Mặc dù" hoặc "Bởi vì" vào chung 4 đáp án: Although vs Despite/In spite of; Because vs Because of/Due to. Cách làm duy nhất là nhìn phía sau ô trống có động từ chia thì hay không.',
    trapWarning: 'Đừng dịch nghĩa vì các từ này nghĩa giống hệt nhau. Dịch nghĩa sẽ dẫn tới chọn bừa.',
    ruleFormula: 'Phía sau có [S + V] -> Chọn LIÊN TỪ (Although, Because, While). Phía sau chỉ có [Cụm Danh Từ / V-ing] -> Chọn GIỚI TỪ (Despite, Because of, Due to).',
    examples: [
      {
        context: 'Phía sau chỗ trống là mệnh đề có chủ ngữ và động từ.',
        incorrect: '____ it rained heavily, the outdoor concert continued. -> Chọn "Despite" là SAI.',
        correct: 'Although it rained heavily, the outdoor concert continued.',
        explanation: '"it rained" có chủ ngữ (it) và động từ (rained) -> Bắt buộc dùng liên từ "Although".'
      },
      {
        context: 'Phía sau chỉ có cụm danh từ.',
        incorrect: '____ the heavy rain, the concert was canceled. -> Chọn "Because" là SAI.',
        correct: 'Due to the heavy rain, the concert was canceled.',
        explanation: '"the heavy rain" là cụm danh từ không có động từ chia thì -> Dùng giới từ "Due to".'
      }
    ],
    tags: ['Part 5', 'Liên từ', 'Giới từ', 'Bẫy ngữ pháp'],
    practiceLink: '/part5?subCategory=Preposition%20%26%20Conjunction',
    practiceTitle: 'Luyện Part 5: Giới từ & Liên từ'
  },
  {
    id: 'tip_p5_reduced_relative',
    part: 'Part 5',
    type: 'grammar',
    targetBand: '650+',
    title: 'Mệnh đề quan hệ rút gọn: Chủ động dùng V-ing, Bị động dùng V-ed',
    shortSummary: 'Rút gọn mệnh đề quan hệ khi câu đã có động từ chính chia thì.',
    content: 'Khi một câu đã có động từ chính đầy đủ, chỗ trống đứng sau một danh từ thường là mệnh đề quan hệ rút gọn. Nếu danh từ đó tự thực hiện hành động -> dùng V-ing. Nếu danh từ bị tác động -> dùng V-ed / V3.',
    ruleFormula: 'Danh từ + V-ing (Chủ động - có tân ngữ phía sau) / Danh từ + V-ed (Bị động - thường có giới từ phía sau).',
    examples: [
      {
        context: 'Danh từ chủ động thực hiện hành động.',
        incorrect: 'Passengers ____ at Gate 4 should board immediately. (A: arrive, B: arrived, C: arriving)',
        correct: 'C: arriving',
        explanation: 'Hành khách tự đến (chủ động) -> rút gọn của "who arrive" thành "arriving". Động từ chính là "should board".'
      },
      {
        context: 'Danh từ bị tác động.',
        incorrect: 'Goods ____ in our factory meet high quality standards. (A: produce, B: producing, C: produced)',
        correct: 'C: produced',
        explanation: 'Hàng hóa được sản xuất (bị động) -> rút gọn của "which are produced" thành "produced".'
      }
    ],
    tags: ['Part 5', 'Mệnh đề quan hệ', 'Rút gọn', 'Ngữ pháp'],
    practiceLink: '/part5?subCategory=Relative%20Clause',
    practiceTitle: 'Luyện Part 5: Mệnh đề quan hệ'
  },
  {
    id: 'tip_p5_reflexive_pronoun',
    part: 'Part 5',
    type: 'grammar',
    targetBand: '450+',
    title: 'Bẫy đại từ phản thân (-self) vs Tính từ sở hữu và Tân ngữ',
    shortSummary: 'Trước danh từ luôn là Tính từ sở hữu; sau giới từ "by" hoặc tân ngữ cùng chủ ngữ mới là Đại từ phản thân.',
    content: 'Các câu hỏi về đại từ (Pronouns) luôn xuất hiện 1-2 câu trong đề thi. Cần nhớ: Đứng trước danh từ bắt buộc phải là Tính từ sở hữu (their, her, his). Đại từ phản thân (themselves, himself, herself) chỉ đứng sau giới từ "by" (by himself = on his own) hoặc làm tân ngữ khi chủ ngữ và tân ngữ là cùng một người.',
    ruleFormula: '____ + Danh từ -> Điền TÍNH TỪ SỞ HỮU (their, our, your). S + V + O + ____ -> Điền ĐẠI TỪ PHẢN THÂN để nhấn mạnh.',
    examples: [
      {
        context: 'Trước danh từ chỉ tài sản hoặc thành tích.',
        incorrect: 'Employees must submit ____ timesheets by Friday. (A: they, B: them, C: their, D: themselves)',
        correct: 'C: their',
        explanation: '"timesheets" là danh từ, do đó phía trước bắt buộc là tính từ sở hữu "their".'
      },
      {
        context: 'Tự làm một mình không ai giúp.',
        correct: 'Mr. Tanaka fixed the printer by himself.',
        explanation: '"by himself" = một mình anh ấy tự sửa.'
      }
    ],
    tags: ['Part 5', 'Đại từ', 'Pronoun'],
    practiceLink: '/part5?subCategory=Pronoun',
    practiceTitle: 'Luyện Part 5: Chuyên đề Đại từ'
  },
  {
    id: 'tip_p5_subjunctive',
    part: 'Part 5',
    type: 'grammar',
    targetBand: '800+',
    title: 'Bẫy thể giả định (Subjunctive Mood) sau động từ đề xuất / yêu cầu',
    shortSummary: 'Sau recommend, suggest, require, insist + THAT thì động từ luôn ở dạng NGUYÊN THỂ (Bare Infinitive).',
    content: 'Cấu trúc giả định thức yêu cầu mệnh đề sau "that" luôn có động từ ở dạng nguyên mẫu không chia (vì đã ẩn đi trợ động từ "should"). Kể cả khi chủ ngữ là ngôi thứ ba số ít (he, she, it) hay danh từ số ít, động từ vẫn KHÔNG THÊM S/ES.',
    ruleFormula: 'S1 + (recommend / suggest / insist / request / require) + THAT + S2 + [ĐỘNG TỪ NGUYÊN MẪU KHÔNG CHIA].',
    examples: [
      {
        context: 'Chủ ngữ là ngôi thứ ba số ít nhưng động từ không chia.',
        incorrect: 'The CEO recommended that Mr. Davis ____ the meeting. (A: attends, B: attended, C: attend)',
        correct: 'C: attend',
        explanation: 'Sau "recommended that", động từ giữ nguyên mẫu (ẩn "should attend"), bất kể Mr. Davis là số ít.'
      }
    ],
    tags: ['Part 5', 'Giả định thức', 'Subjunctive', 'Band 800+'],
    practiceLink: '/part5?subCategory=Verb%20Tense',
    practiceTitle: 'Luyện Part 5: Thì & Thể động từ'
  },
  {
    id: 'tip_p5_parallel',
    part: 'Part 5',
    type: 'grammar',
    targetBand: '650+',
    title: 'Bẫy cấu trúc song hành (Parallel Structure: and, but, or, as well as)',
    shortSummary: 'Các từ nối đẳng lập đòi hỏi từ loại ở hai vế phải cùng dạng ngữ pháp.',
    content: 'Khi gặp các liên từ kết hợp như "and", "but", "or", "as well as", từ loại hoặc dạng thức của từ ở hai vế trước và sau từ nối phải hoàn toàn tương đương nhau: Danh từ nối với Danh từ, Tính từ nối với Tính từ, V-ing nối với V-ing.',
    ruleFormula: 'X and Y -> Nếu X là Tính từ thì Y cũng phải là Tính từ; Nếu X là V-ing thì Y cũng là V-ing.',
    examples: [
      {
        context: 'Hai tính từ bổ nghĩa được nối bằng and.',
        incorrect: 'The seminar was both informative and ____. (A: inspire, B: inspiration, C: inspiring)',
        correct: 'C: inspiring',
        explanation: '"informative" là tính từ -> sau "and" cũng phải là tính từ "inspiring".'
      }
    ],
    tags: ['Part 5', 'Cấu trúc song hành', 'Parallelism'],
    practiceLink: '/part5?subCategory=Sentence%20Structure',
    practiceTitle: 'Luyện Part 5: Cấu trúc câu'
  },

  // ==================== PART 6: TEXT COMPLETION ====================
  {
    id: 'tip_p6_sentence_insertion',
    part: 'Part 6',
    type: 'strategy',
    targetBand: '650+',
    title: 'Chiến thuật câu hỏi điền cả câu vào đoạn văn (Sentence Insertion)',
    shortSummary: 'Đọc kỹ câu liền trước và liền sau chỗ trống, tìm từ nối logic và đại từ thay thế.',
    content: 'Mỗi bài Part 6 luôn có 1 câu hỏi yêu cầu chọn cả một câu văn hoàn chỉnh điền vào chỗ trống. Để làm đúng, hãy tìm mối liên kết giữa câu cần điền với câu trước và câu sau thông qua: 1) Đại từ chỉ định (This, These, Such); 2) Từ nối quan hệ nhân quả/đối lập (However, Therefore, For example).',
    ruleFormula: 'Quy tắc "Mỏ neo ngữ cảnh": Câu điền vào phải trả lời hoặc nối tiếp trực tiếp ý của câu đứng trước.',
    examples: [
      {
        context: 'Câu trước nói: "We are introducing a new software system next Monday."',
        correct: 'Đáp án điền vào: "Comprehensive training sessions will be held to help staff adapt."',
        explanation: 'Câu điền vào liên kết chặt chẽ với việc giới thiệu hệ thống mới (tổ chức đào tạo để nhân viên thích nghi).'
      }
    ],
    tags: ['Part 6', 'Điền cả câu', 'Mạch văn bản'],
    practiceLink: '/part6',
    practiceTitle: 'Luyện Part 6: Điền từ đoạn văn'
  },
  {
    id: 'tip_p6_date_stamp',
    part: 'Part 6',
    type: 'trap',
    targetBand: '650+',
    title: 'Bẫy mốc thời gian và thì động từ trong thư từ/email',
    shortSummary: 'Luôn nhìn ngày gửi thư (Date Header) để làm mốc quy chiếu xác định quá khứ hay tương lai.',
    content: 'Trong email hoặc thông báo công ty, ngày gửi thư đóng vai trò là "hiện tại". Một sự kiện diễn ra sau ngày gửi thư sẽ chia thì tương lai (will/is going to); sự kiện diễn ra trước ngày gửi thư chia thì quá khứ đơn hoặc hiện tại hoàn thành.',
    trapWarning: 'Đừng chỉ nhìn lướt vào ô trống. Hãy liếc mắt lên dòng ngày tháng (Date: March 15) ở đầu bức thư.',
    ruleFormula: 'Sự kiện SAU ngày gửi thư -> Tương lai. Sự kiện TRƯỚC ngày gửi thư -> Quá khứ.',
    examples: [
      {
        context: 'Email gửi ngày 10/10. Chỗ trống nói về hội nghị ngày 15/10.',
        incorrect: 'The conference ____ place on October 15. (A: took, B: has taken, C: will take)',
        correct: 'C: will take',
        explanation: 'Ngày 15/10 diễn ra sau ngày gửi email (10/10) nên phải dùng thì tương lai đơn.'
      }
    ],
    tags: ['Part 6', 'Thì động từ', 'Mốc thời gian'],
    practiceLink: '/part6',
    practiceTitle: 'Luyện Part 6: Điền từ đoạn văn'
  },
  {
    id: 'tip_p6_transitions',
    part: 'Part 6',
    type: 'grammar',
    targetBand: '650+',
    title: 'Bẫy từ nối chuyển đoạn logic (Transition Words)',
    shortSummary: 'Phân biệt chính xác giữa Tương phản (However), Bổ sung (In addition) và Nhân quả (Therefore).',
    content: 'ETS thường kiểm tra khả năng đọc hiểu mạch văn thông qua việc chọn từ nối đứng đầu câu có dấu phẩy đi kèm (____, S + V). Cần xác định mối quan hệ giữa câu trước và câu sau:',
    ruleFormula: 'Tương phản -> However / Nevertheless. Nguyên nhân - Kết quả -> Therefore / Consequently / As a result. Bổ sung ý -> Furthermore / In addition / Moreover.',
    examples: [
      {
        context: 'Câu 1: Dự án rất khó khăn. Câu 2: Đội ngũ đã hoàn thành đúng hạn.',
        incorrect: 'The project was challenging. ____, the team finished on time. (A: Therefore, B: However)',
        correct: 'B: However',
        explanation: 'Ý tương phản giữa "khó khăn" và "hoàn thành đúng hạn" -> dùng "However".'
      }
    ],
    tags: ['Part 6', 'Từ nối', 'Liên từ chuyển ý'],
    practiceLink: '/part6',
    practiceTitle: 'Luyện Part 6: Đoạn văn'
  },

  // ==================== PART 7: READING COMPREHENSION ====================
  {
    id: 'tip_p7_time_allocation',
    part: 'Part 7',
    type: 'strategy',
    targetBand: '650+',
    title: 'Chiến thuật phân bổ 54 phút cho 54 câu Part 7',
    shortSummary: 'Không quá 1 phút/câu: 28 phút cho bài đọc đơn và 26 phút cho bài đọc đôi/ba.',
    content: 'Lý do 80% thí sinh không đạt điểm mong muốn ở Part 7 là THIẾU THỜI GIAN và phải khoanh bừa 10-15 câu cuối. Bạn cần phân bổ thời gian nghiêm ngặt: Single Passages (câu 147-175: 29 câu) làm trong 28 phút; Multiple Passages (câu 176-200: 25 câu) làm trong 26 phút.',
    ruleFormula: 'Đến mốc còn 26 phút trên đồng hồ thi -> BẮT BUỘC phải chuyển sang làm từ câu 176 (Bài đọc đôi).',
    examples: [
      {
        context: 'Quản lý thời gian trong phòng thi thực chiến.',
        correct: 'Nếu gặp 1 câu khó ở bài đọc đơn, đánh dấu cờ (Flag) và nhảy sang câu tiếp theo sau 60s, không để bị kẹt làm mất thời gian của các bài đọc đôi dễ lấy điểm phía sau.',
        explanation: 'Đảm bảo đọc hết tất cả các bài đọc đôi/ba vì chúng thường có nhiều câu hỏi tìm dữ liệu dễ.'
      }
    ],
    tags: ['Part 7', 'Quản lý thời gian', 'Chiến thuật phòng thi'],
    practiceLink: '/part7',
    practiceTitle: 'Luyện Part 7: Kỹ năng đọc quét'
  },
  {
    id: 'tip_p7_paraphrasing',
    part: 'Part 7',
    type: 'strategy',
    targetBand: '650+',
    title: 'Kỹ năng nhận diện Paraphrasing (Từ đồng nghĩa cốt lõi của ETS)',
    shortSummary: 'Part 7 là bài thi từ đồng nghĩa; đáp án đúng hiếm khi lặp lại y hệt từ ngữ trong bài.',
    content: 'ETS gần như không bao giờ sao chép nguyên văn từ trong đoạn văn xuống đáp án đúng. Họ luôn dùng kỹ thuật "Paraphrase" (diễn đạt lại bằng từ đồng nghĩa hoặc câu tương đương).',
    ruleFormula: 'Tìm cặp từ đồng nghĩa ETS: renovate = remodel; purchase = buy; postpone = delay = put off; annual = yearly.',
    examples: [
      {
        context: 'Trong bài đọc: "The company will remodel the downtown cafeteria next month."',
        incorrect: 'Phương án chứa từ "cafeteria" nhưng nói sai hành động -> Bẫy lặp từ.',
        correct: 'Đáp án đúng: "A dining facility will be renovated."',
        explanation: 'remodel -> renovated; cafeteria -> dining facility. Cặp paraphrasing kinh điển.'
      }
    ],
    tags: ['Part 7', 'Paraphrasing', 'Từ đồng nghĩa'],
    practiceLink: '/part7',
    practiceTitle: 'Luyện Part 7: Đọc hiểu'
  },
  {
    id: 'tip_p7_cross_passage',
    part: 'Part 7',
    type: 'strategy',
    targetBand: '800+',
    title: 'Chiến thuật xử lý câu hỏi liên kết chéo đa đoạn (Cross-passage Inference)',
    shortSummary: 'Câu hỏi thứ 4 hoặc thứ 5 của bài đọc đôi/ba bắt buộc phải kết hợp thông tin từ 2 đoạn khác nhau.',
    content: 'Trong bài đọc kép (Double) hoặc bài đọc ba (Triple), luôn có ít nhất 1-2 câu hỏi mà câu trả lời không nằm trọn vẹn ở 1 bài. Bạn phải lấy dữ liệu từ bài 1 (ví dụ: mã hàng hoặc ngày tháng) đối chiếu sang bài 2 (bảng giá hoặc hóa đơn) để suy ra đáp án.',
    ruleFormula: 'Dấu hiệu câu hỏi chéo: Hỏi người gửi sẽ trả bao nhiêu tiền? Sự kiện sẽ diễn ra ở phòng nào? -> Tìm mấu chốt chung giữa 2 văn bản.',
    examples: [
      {
        context: 'Đoạn 1 là email khách hàng đặt mua gói "Premium Membership". Đoạn 2 là bảng quyền lợi hội viên.',
        correct: 'Câu hỏi: "What service is the customer entitled to?" -> Nhìn Đoạn 1 biết khách mua gói Premium, đối chiếu sang Đoạn 2 xem gói Premium có quyền lợi gì (ví dụ: free parking).',
        explanation: 'Kết nối thông tin giữa 2 văn bản để đưa ra kết luận chính xác.'
      }
    ],
    tags: ['Part 7', 'Đọc đôi', 'Đọc ba', 'Cross-passage', 'Band 800+'],
    practiceLink: '/part7',
    practiceTitle: 'Luyện Part 7: Đọc hiểu nâng cao'
  },
  {
    id: 'tip_p7_true_wrong_q',
    part: 'Part 7',
    type: 'trap',
    targetBand: '650+',
    title: 'Bẫy thông tin có thật trong bài nhưng không trả lời câu hỏi',
    shortSummary: 'Phương án nêu hoàn toàn đúng một sự thật trong bài, nhưng lại trả lời cho câu hỏi khác.',
    content: 'Đây là bẫy tinh vi nhất trong Part 7. ETS trích dẫn một câu văn có thật 100% trong bài đọc và đưa vào đáp án. Thí sinh đọc thấy quen mắt liền vội vàng chọn, mà không để ý câu hỏi đang hỏi về đối tượng nào hoặc thời điểm nào.',
    trapWarning: 'Luôn gạch chân CHỦ THỂ và TỪ ĐỂ HỎI trong câu hỏi trước khi so sánh với đáp án.',
    ruleFormula: 'Thông tin ĐÚNG TRONG BÀI chưa chắc là ĐÁP ÁN ĐÚNG cho câu hỏi hiện tại.',
    examples: [
      {
        context: 'Bài đọc kể: Công ty A đã mở chi nhánh ở Tokyo năm ngoái và sẽ mở chi nhánh ở Seoul vào năm tới. Câu hỏi: "Where did Company A open an office LAST YEAR?"',
        incorrect: 'A) Seoul. (Có xuất hiện trong bài nhưng là kế hoạch năm tới)',
        correct: 'B) Tokyo.',
        explanation: 'Tokyo mới là địa điểm mở vào năm ngoái (last year).'
      }
    ],
    tags: ['Part 7', 'Bẫy đọc hiểu', 'Câu hỏi lừa'],
    practiceLink: '/part7',
    practiceTitle: 'Luyện Part 7: Đọc hiểu'
  },
  {
    id: 'tip_p7_not_least',
    part: 'Part 7',
    type: 'strategy',
    targetBand: '450+',
    title: 'Kỹ thuật loại trừ cho dạng câu hỏi phủ định NOT / LEAST',
    shortSummary: 'Dùng phương pháp quét tìm 3 đáp án CÓ TRONG BÀI để gạch bỏ; đáp án còn lại là câu trả lời đúng.',
    content: 'Dạng câu hỏi "What is NOT mentioned about...?" hoặc "Which of the following is LEAST likely...?" đòi hỏi bạn tìm điều KHÔNG ĐÚNG hoặc KHÔNG ĐƯỢC NHẮC TỚI. Cách làm nhanh nhất là dùng Scanning để gạch bỏ 3 phương án có xuất hiện.',
    ruleFormula: 'Dạng NOT/LEAST: Thấy trong bài -> GẠCH BỎ. Không thấy / Sai sự thật -> CHỌN.',
    examples: [
      {
        context: 'Thông báo tuyển dụng nêu yêu cầu: Bằng đại học, 3 năm kinh nghiệm, thành thạo Excel. Câu hỏi: "What is NOT a requirement?" (A: Degree, B: 3 years experience, C: Fluency in French, D: Excel skills).',
        correct: 'C: Fluency in French',
        explanation: 'Degree, 3 years, Excel đều có trong bài nên gạch bỏ. Tiếng Pháp không được nhắc tới -> Đáp án đúng.'
      }
    ],
    tags: ['Part 7', 'NOT questions', 'Kỹ thuật loại trừ'],
    practiceLink: '/part7',
    practiceTitle: 'Luyện Part 7: Kỹ năng đọc quét'
  },

  // ==================== GENERAL / EXAM TACTICS ====================
  {
    id: 'tip_general_pacing',
    part: 'General',
    type: 'strategy',
    targetBand: 'all',
    title: 'Chiến lược phân bổ 120 phút phòng thi TOEIC thực chiến',
    shortSummary: 'Quy tắc chia nhịp thời gian giúp giữ vững 100% thể lực và độ tập trung xuyên suốt 200 câu hỏi.',
    content: 'Bài thi TOEIC kéo dài 2 tiếng liên tục không nghỉ. Trong 45 phút Listening (Part 1-4), băng chạy liên tục không thể dừng. Trong 75 phút Reading (Part 5-7), bạn phải tự chia đồng hồ: Part 5 (10-12 phút), Part 6 (8-10 phút), Part 7 (54 phút).',
    ruleFormula: 'Thời gian vàng RC: 75p = 11p (Part 5) + 9p (Part 6) + 55p (Part 7).',
    examples: [
      {
        context: 'Luyện tập thi thử tại nhà.',
        correct: 'Bấm giờ đúng 75 phút cho RC, tuyệt đối không cho phép bản thân làm thêm giờ để rèn luyện tốc độ phản xạ thực tế.',
        explanation: 'Luyện tập dưới áp lực thời gian thực tế giúp bạn không bị ngợp trong phòng thi.'
      }
    ],
    tags: ['General', 'Phòng thi', 'Phân bổ thời gian'],
    practiceLink: '/exam',
    practiceTitle: 'Làm bài Thi thử Full 200 câu'
  },
  {
    id: 'tip_general_guessing',
    part: 'General',
    type: 'strategy',
    targetBand: 'all',
    title: 'Chiến thuật xử lý câu hỏi không nghe kịp / không làm kịp',
    shortSummary: 'Không bao giờ để trống câu trả lời; luôn chọn 1 phương án nhất quán khi đoán bừa.',
    content: 'TOEIC không trừ điểm câu sai. Do đó, việc bỏ trống câu trả lời là điều tối kỵ. Trong phần Listening, nếu bạn lỡ mất 1 câu, hãy lập tức chọn ngay 1 đáp án bất kỳ và chuyển mắt sang đọc trước câu tiếp theo; tuyệt đối không được tiếc nuối nghĩ về câu đã qua vì sẽ làm hỏng cả chuỗi câu phía sau.',
    ruleFormula: 'Lỡ nghe 1 câu -> Khoanh bừa trong 1s -> Quên ngay lập tức để cứu 3 câu kế tiếp.',
    examples: [
      {
        context: 'Băng đã đọc xong câu 45 mà bạn vẫn chưa nghe ra.',
        correct: 'Khoanh ngay 1 đáp án (ví dụ: B) và lập tức tập trung toàn bộ tâm trí đọc câu hỏi 46, 47, 48.',
        explanation: 'Cứu vãn những câu hỏi phía sau quan trọng hơn cố nhớ lại câu đã qua.'
      }
    ],
    tags: ['General', 'Tâm lý phòng thi', 'Chiến thuật khoanh'],
    practiceLink: '/mini-test',
    practiceTitle: 'Thực hành Mini-test 20 câu'
  }
];
