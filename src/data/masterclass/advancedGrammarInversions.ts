import { HighScoreChallenge } from '@/schema/masterclass';

export const HIGH_SCORE_CHALLENGES: HighScoreChallenge[] = [
  {
    id: 'hsc_1_inversion_type1',
    part: 'Part 5',
    targetBand: '850+',
    question:
      '_______ any delegates require special dietary accommodations during the gala dinner, please notify the hospitality coordinator before Thursday afternoon.',
    options: ['A) Would', 'B) Should', 'C) Unless', 'D) Whether'],
    correctAnswer: 'B',
    trapType: 'Đảo ngữ câu điều kiện loại 1 (Conditional Inversion Type 1)',
    clueHint: 'Mệnh đề có dạng: [Chỗ trống] + S (any delegates) + V nguyên thể (require) ..., đi kèm mệnh đề mệnh lệnh "please notify...". Đây là đảo ngữ của "If any delegates should require...".',
    syntaxBreakdown: {
      subject: 'any delegates',
      predicate: 'require',
      objectOrComplement: 'special dietary accommodations',
      targetModifier: 'Should (Trợ động từ đảo ngữ thay thế If)'
    },
    pedagogicalExplanation:
      '<b>Dịch nghĩa:</b> Nếu có bất kỳ đại biểu nào cần sắp xếp chế độ ăn uống đặc biệt trong bữa tiệc gala, vui lòng thông báo cho điều phối viên trước chiều thứ Năm.<br/><br/>' +
      '<b>Phân tích ngữ pháp:</b> Khi bỏ "If" trong câu điều kiện loại 1 mang tính trang trọng, ta đảo trợ động từ "Should" lên trước chủ ngữ: <code>Should + S + V-inf, (S + will + V / V-mệnh lệnh)</code>. Các phương án khác sai vì: "Would" không dùng mở đầu câu điều kiện; "Unless" là liên từ cần có mệnh đề hoàn chỉnh đi kèm nhưng "any delegates require" nếu đi với Unless thì nghĩa phủ định bị phi lý ("trừ khi đại biểu cần..."); "Whether" cần đi kèm "or".'
  },
  {
    id: 'hsc_2_negative_inversion',
    part: 'Part 5',
    targetBand: '900+',
    question:
      'Rarely _______ an enterprise expanded its market capitalization so dramatically within the initial fiscal quarter following a public offering.',
    options: ['A) has', 'B) have', 'C) is', 'D) having'],
    correctAnswer: 'A',
    trapType: 'Đảo ngữ với phó từ phủ định đứng đầu câu (Negative Adverb Inversion)',
    clueHint: 'Đứng đầu câu là phó từ phủ định "Rarely", theo sau là [Trợ động từ] + S (an enterprise - số ít) + V3 (expanded).',
    syntaxBreakdown: {
      subject: 'an enterprise (số ít)',
      predicate: 'has expanded',
      objectOrComplement: 'its market capitalization',
      targetModifier: 'Rarely (Phó từ tần suất phủ định gây đảo ngữ)'
    },
    pedagogicalExplanation:
      '<b>Dịch nghĩa:</b> Hiếm khi có một doanh nghiệp nào gia tăng giá trị vốn hóa thị trường ngoạn mục đến vậy ngay trong quý tài chính đầu tiên sau khi phát hành cổ phiếu ra công chúng.<br/><br/>' +
      '<b>Phân tích ngữ pháp:</b> Khi các phó từ mang nghĩa phủ định hoặc bán phủ định (Rarely, Seldom, Hardly, Scarcely, Never, Little) đứng đầu câu để nhấn mạnh, trật tự câu bắt buộc phải đảo ngữ: <code>Phó từ phủ định + Trợ động từ (has/have/do/does/did) + S + V chính</code>. Vì chủ ngữ là "an enterprise" (danh từ số ít) và động từ chính là "expanded" (V3/ed) -> chọn trợ động từ "has".'
  },
  {
    id: 'hsc_3_subjunctive_mood',
    part: 'Part 5',
    targetBand: '850+',
    question:
      'The chief compliance officer strongly mandated that every subsidiary _______ its environmental impact assessment before the upcoming government audit.',
    options: ['A) finalize', 'B) finalizes', 'C) finalized', 'D) will finalize'],
    correctAnswer: 'A',
    trapType: 'Thể giả định bắt buộc (Subjunctive Mood with Mandate that S + V-inf)',
    clueHint: 'Động từ chính là "mandated that", chủ ngữ mệnh đề sau là "every subsidiary". Dù là số ít nhưng động từ theo sau phải ở dạng nguyên thể không chia (bare infinitive).',
    syntaxBreakdown: {
      subject: 'every subsidiary',
      predicate: '(should) finalize',
      objectOrComplement: 'its environmental impact assessment',
      targetModifier: 'The chief compliance officer strongly mandated that...'
    },
    pedagogicalExplanation:
      '<b>Dịch nghĩa:</b> Giám đốc tuân thủ yêu cầu bắt buộc rằng mọi công ty con phải hoàn tất báo cáo đánh giá tác động môi trường trước kỳ kiểm toán sắp tới của chính phủ.<br/><br/>' +
      '<b>Phân tích ngữ pháp:</b> Các động từ chỉ yêu cầu, đề xuất, bắt buộc (mandate, recommend, suggest, require, demand, insist) + that + S + <b>(should) V-nguyên thể không chia</b>. Đa số thí sinh chọn "finalizes" (thêm -s theo chủ ngữ số ít) hoặc "finalized" (theo thì quá khứ của mandated) và đều mắc bẫy của ETS.'
  },
  {
    id: 'hsc_4_inversion_type3',
    part: 'Part 5',
    targetBand: '900+',
    question:
      '_______ the engineering team anticipated the structural fatigue in the turbine blades, the subsequent operational shutdown could have been completely averted.',
    options: ['A) If', 'B) Had', 'C) Should', 'D) Were'],
    correctAnswer: 'B',
    trapType: 'Đảo ngữ câu điều kiện loại 3 (Past Unreal Conditional Inversion)',
    clueHint: 'Quan sát mệnh đề chính: "could have been completely averted" (loại 3). Mệnh đề phụ có cấu trúc [Chỗ trống] + S (the engineering team) + V3 (anticipated) -> Đảo Had lên đầu thay If.',
    syntaxBreakdown: {
      subject: 'the engineering team',
      predicate: 'Had anticipated',
      objectOrComplement: 'the structural fatigue in the turbine blades',
      targetModifier: 'Mệnh đề kết quả: could have been completely averted'
    },
    pedagogicalExplanation:
      '<b>Dịch nghĩa:</b> Nếu như đội ngũ kỹ thuật dự liệu trước được hiện tượng mỏi kết cấu trong các cánh tuabin, sự cố đình chỉ hoạt động sau đó đã có thể được ngăn chặn hoàn toàn.<br/><br/>' +
      '<b>Phân tích ngữ pháp:</b> Câu điều kiện loại 3 gốc: <code>If the engineering team had anticipated...</code>. Khi bỏ "If", cấu trúc đảo ngữ chuẩn là <code>Had + S + V3/ed, S + could/would have + V3/ed</code>. Nếu chọn "If", câu phải có "had" đằng sau ("If the engineering team had anticipated"), nhưng ở đây thiếu "had" nên A sai.'
  },
  {
    id: 'hsc_5_advanced_preposition',
    part: 'Part 5',
    targetBand: '850+',
    question:
      '_______ fluctuating foreign exchange rates and regional trade tensions, the export consortium surpassed its annual revenue target by twelve percent.',
    options: ['A) Notwithstanding', 'B) Regardless', 'C) Although', 'D) Whereas'],
    correctAnswer: 'A',
    trapType: 'Giới từ chỉ sự nhượng bộ trang trọng (Formal Concession Preposition)',
    clueHint: 'Phía sau chỗ trống là một cụm danh từ: "fluctuating foreign exchange rates and regional trade tensions" (không có mệnh đề S-V). Ta cần một giới từ mang nghĩa "mặc dù".',
    syntaxBreakdown: {
      subject: 'the export consortium',
      predicate: 'surpassed',
      objectOrComplement: 'its annual revenue target by twelve percent',
      targetModifier: 'Notwithstanding + Noun Phrase (Cụm giới từ nhượng bộ)'
    },
    pedagogicalExplanation:
      '<b>Dịch nghĩa:</b> Mặc dù tỷ giá hối đoái biến động và căng thẳng thương mại khu vực gia tăng, liên minh xuất khẩu vẫn vượt mục tiêu doanh thu thường niên 12%.<br/><br/>' +
      '<b>Phân tích ngữ pháp:</b> Phía sau là Cụm danh từ (Noun Phrase) nên loại các liên từ "Although" và "Whereas" (vốn cần theo sau bởi mệnh đề S + V). "Regardless" phải đi kèm giới từ "of" (Regardless of) mới đứng trước danh từ. Giới từ cao cấp "Notwithstanding" (= Despite / In spite of) đứng độc lập trước cụm danh từ và thường xuyên xuất hiện ở các câu hỏi điểm 850-990 trong Part 5 & 6.'
  }
];
