export interface GrammarCheatsheet {
  key: string;
  title: string;
  tagline: string;
  ruleFormula: string;
  suffixes?: {
    category: string;
    endings: string;
    examples: string;
  }[];
  keyRules: {
    title: string;
    formula: string;
    explanation: string;
  }[];
  solvingSteps: string[];
  commonTraps: string[];
}

export const GRAMMAR_CHEATSHEETS: Record<string, GrammarCheatsheet> = {
  'Word Form': {
    key: 'Word Form',
    title: 'Chuyên Đề: Từ Loại (Word Form)',
    tagline: '4 đáp án chung 1 gốc từ: Tuyệt đối không dịch nghĩa, chỉ nhìn trước và sau chỗ trống.',
    ruleFormula: '(Mạo từ / Sở hữu) + [TÍNH TỪ] + DANH TỪ  |  ĐỘNG TỪ + [TRẠNG TỪ]',
    suffixes: [
      {
        category: 'Danh từ (Noun)',
        endings: '-tion, -sion, -ment, -ance, -ence, -ty, -ness, -er, -or, -ee, -ist',
        examples: 'decision, development, attendance, safety, manager, employee'
      },
      {
        category: 'Tính từ (Adjective)',
        endings: '-ful, -able, -ible, -ive, -ous, -al, -ic, -ed, -ing',
        examples: 'helpful, reliable, flexible, creative, dangerous, professional'
      },
      {
        category: 'Trạng từ (Adverb)',
        endings: 'Tính từ + -ly = Trạng từ',
        examples: 'quickly, carefully, unexpectedly, completely, highly'
      },
      {
        category: 'Động từ (Verb)',
        endings: '-ize, -ate, -en, -ify',
        examples: 'organize, participate, shorten, notify, verify'
      }
    ],
    keyRules: [
      {
        title: 'Vị trí 1: Bổ nghĩa cho Danh từ',
        formula: 'a / an / the / my / your / his / her + [TÍNH TỪ] + DANH TỪ',
        explanation: 'Tính từ luôn đứng trước danh từ để miêu tả đặc điểm tính chất của danh từ đó.'
      },
      {
        title: 'Vị trí 2: Đứng sau Động từ to be',
        formula: 'S + be (am/is/are/was/were) + [TÍNH TỪ]',
        explanation: 'Sau to be thường là Tính từ chỉ trạng thái, trừ khi là thể bị động (be + V3/ed).'
      },
      {
        title: 'Vị trí 3: Bổ nghĩa cho Động từ thường',
        formula: 'ĐỘNG TỪ + [TRẠNG TỪ]  hoặc  [TRẠNG TỪ] + ĐỘNG TỪ',
        explanation: 'Trạng từ đuôi -ly bổ nghĩa cho hành động. Trạng từ có thể đứng sau tân ngữ hoặc đứng ngay trước động từ thường.'
      },
      {
        title: 'Vị trí 4: Kẹp giữa trợ động từ và động từ chính',
        formula: 'be + [TRẠNG TỪ] + V3/ed  hoặc  have/has + [TRẠNG TỪ] + V3/ed',
        explanation: 'Khi câu đã có đủ cấu trúc thì (is ... located, has ... completed), vị trí ở giữa 99% là Trạng từ (-ly).'
      }
    ],
    solvingSteps: [
      'Bước 1: Liếc nhanh 4 đáp án A-B-C-D. Thấy chung gốc từ, khác đuôi -> Biết ngay câu hỏi Từ loại, KHÔNG cần dịch nghĩa câu.',
      'Bước 2: Nhìn từ đứng NGAY TRƯỚC và NGAY SAU chỗ trống để xác định vị trí còn thiếu (Cần Danh từ, Tính từ, hay Trạng từ).',
      'Bước 3: Dò đuôi từ loại tương ứng trong 4 đáp án và chọn ngay trong 5 - 10 giây.'
    ],
    commonTraps: [
      'Bẫy Danh từ kép: Một số danh từ có thể đứng liền nhau tạo thành cụm (safety procedures, customer service, sales department).',
      'Bẫy tính từ đuôi -ly: Một số từ đuôi -ly là Tính từ chứ không phải Trạng từ (timely, costly, friendly, daily).'
    ]
  },

  'Verb Tense': {
    key: 'Verb Tense',
    title: 'Chuyên Đề: Thì & Dạng Động Từ (Verb Tense & Voice)',
    tagline: 'Xác định: (1) Động từ chính hay rút gọn? (2) Chủ động hay Bị động? (3) Dấu hiệu thời gian.',
    ruleFormula: 'Bị động: be + V3/ed (Chủ ngữ là vật / Phía sau có giới từ by/in/at)',
    keyRules: [
      {
        title: 'Quy tắc 1: Kiểm tra Động từ chính của câu',
        formula: 'Một câu hoàn chỉnh bắt buộc phải có ít nhất 1 động từ chia thì.',
        explanation: 'Nếu câu chưa có động từ chính, loại ngay các đáp án dạng V-ing (standing alone) hoặc To-V vì chúng không thể làm động từ vị ngữ.'
      },
      {
        title: 'Quy tắc 2: Chủ động vs Bị động (Active vs Passive)',
        formula: 'Chủ động: S + V + Tân ngữ (O)  |  Bị động: S + be + V3/ed (+ Giới từ)',
        explanation: 'Nếu phía sau chỗ trống có Tân ngữ (Danh từ nhận tác động) -> Chọn Chủ động. Nếu phía sau có Giới từ (by, at, for) hoặc hết câu -> Chọn Bị động.'
      },
      {
        title: 'Quy tắc 3: Hòa hợp Chủ ngữ - Động từ (Subject-Verb Agreement)',
        formula: 'Chủ ngữ số ít -> Động từ thêm s/es hoặc is/has/was.',
        explanation: 'Luôn tìm danh từ chính đứng trước giới từ để xác định số ít hay số nhiều (Ví dụ: The manager of the branches -> manager là số ít).'
      },
      {
        title: 'Quy tắc 4: Dấu hiệu thời gian kinh điển',
        formula: 'since/for -> Hiện tại hoàn thành (have/has + V3) | yesterday/ago/last -> Quá khứ đơn (V2/ed) | next/tomorrow -> Tương lai (will + V).',
        explanation: 'Dò nhanh trạng từ chỉ thời gian ở đầu hoặc cuối câu để chọn đúng thì.'
      }
    ],
    solvingSteps: [
      'Bước 1: Tìm xem câu đã có động từ chính chưa. Nếu chưa -> Loại phương án V-ing và To-V.',
      'Bước 2: Xem Chủ ngữ là người hay vật. Nhìn sau chỗ trống có Tân ngữ hay Giới từ để quyết định Chủ động hay Bị động.',
      'Bước 3: Dò trạng từ chỉ thời gian (last, next, since, usually) và kiểm tra hòa hợp số ít / số nhiều.'
    ],
    commonTraps: [
      'Bẫy cụm giới từ xen giữa Chủ ngữ và Động từ (The quality [of these products] is high -> Chủ ngữ là quality số ít).',
      'Bẫy động từ theo sau đề xuất (recommend/suggest/require that S + [V-nguyên thể]).'
    ]
  },

  'Preposition & Conjunction': {
    key: 'Preposition & Conjunction',
    title: 'Chuyên Đề: Giới Từ & Liên Từ (Preposition & Conjunction)',
    tagline: 'Sau Liên từ là Mệnh đề (S + V). Sau Giới từ chỉ là Cụm Danh từ hoặc V-ing.',
    ruleFormula: 'LIÊN TỪ + [S + V]   |   GIỚI TỪ + [Cụm Danh Từ / V-ing]',
    keyRules: [
      {
        title: 'Cặp đối kháng 1: Mặc dù',
        formula: 'Although / Even though / Though + [S + V]   vs   Despite / In spite of + [Cụm N / V-ing]',
        explanation: 'Cùng mang nghĩa "mặc dù" nhưng nếu phía sau có động từ chia thì bắt buộc chọn Although; nếu chỉ có danh từ chọn Despite.'
      },
      {
        title: 'Cặp đối kháng 2: Bởi vì',
        formula: 'Because / Since / As + [S + V]   vs   Because of / Due to / Owing to + [Cụm N / V-ing]',
        explanation: 'Phía sau có S + V chọn Because; phía sau chỉ có cụm danh từ chọn Because of / Due to.'
      },
      {
        title: 'Cặp đối kháng 3: Trong khi / Trong suốt',
        formula: 'While + [S + V hoặc V-ing]   vs   During + [Danh từ chỉ khoảng thời gian/sự kiện]',
        explanation: 'During the meeting, during the summer (chỉ đi với Danh từ); While he was speaking (đi với mệnh đề).'
      },
      {
        title: 'Cặp đối kháng 4: Trước / Sau',
        formula: 'Before / After vừa có thể làm liên từ (+ S + V) vừa làm giới từ (+ Cụm N / V-ing).',
        explanation: 'Before submitting the report = Before you submit the report.'
      }
    ],
    solvingSteps: [
      'Bước 1: Dò thành phần đứng SAU chỗ trống: Có động từ chia thì (S + V) hay chỉ có Cụm Danh từ?',
      'Bước 2: Nếu có S + V -> Loại ngay các phương án Giới từ (Due to, Despite, In spite of).',
      'Bước 3: Nếu chỉ có Cụm Danh từ -> Loại ngay các phương án Liên từ (Because, Although, Unless).'
    ],
    commonTraps: [
      'Bẫy mệnh đề quan hệ ẩn sau danh từ: Danh từ có mệnh đề quan hệ bổ nghĩa làm câu dài ra, người học tưởng là S + V nhưng thực chất vẫn chỉ là Cụm Danh từ.',
      'Nhầm lẫn giữa "Because" (liên từ) và "Because of" (giới từ).'
    ]
  },

  'Pronoun': {
    key: 'Pronoun',
    title: 'Chuyên Đề: Đại Từ (Pronouns)',
    tagline: 'Trước danh từ chọn Tính từ sở hữu; sau giới từ "by" hoặc tân ngữ cùng chủ ngữ chọn Đại từ phản thân.',
    ruleFormula: '[TÍNH TỪ SỞ HỮU] + Danh từ   |   by + [ĐẠI TỪ PHẢN THÂN (-self)]',
    suffixes: [
      {
        category: 'Chủ ngữ (Subject)',
        endings: 'I, You, We, They, He, She, It',
        examples: 'Đứng đầu câu trước động từ làm chủ ngữ.'
      },
      {
        category: 'Tân ngữ (Object)',
        endings: 'Me, You, Us, Them, Him, Her, It',
        examples: 'Đứng sau động từ hoặc sau giới từ làm tân ngữ.'
      },
      {
        category: 'Tính từ sở hữu (Possessive Adj)',
        endings: 'My, Your, Our, Their, His, Her, Its',
        examples: 'Bắt buộc phải có Danh từ đứng ngay phía sau (their report, her office).'
      },
      {
        category: 'Đại từ sở hữu (Possessive Pronoun)',
        endings: 'Mine, Yours, Ours, Theirs, His, Hers',
        examples: 'Thay thế cho cả cụm (Tính từ sở hữu + Noun), không đứng trước danh từ.'
      },
      {
        category: 'Đại từ phản thân (Reflexive Pronoun)',
        endings: 'Myself, Yourself, Ourselves, Themselves, Himself, Herself, Itself',
        examples: 'Nhấn mạnh hành động tự làm (by himself = on his own = tự mình).'
      }
    ],
    keyRules: [
      {
        title: 'Quy tắc 1: Trước Danh từ luôn là Tính từ sở hữu',
        formula: '____ + Danh từ -> Điền Tính từ sở hữu (their, her, his, our, its).',
        explanation: 'Đây là câu hỏi cho điểm phổ biến nhất trong Part 5 (chiếm 1-2 câu mỗi đề thi).'
      },
      {
        title: 'Quy tắc 2: Tự thân hành động',
        formula: 'S + V + O + [ĐẠI TỪ PHẢN THÂN]  hoặc  by + [ĐẠI TỪ PHẢN THÂN]',
        explanation: 'Mr. Tanaka fixed the printer by himself / Mr. Tanaka fixed the printer himself.'
      },
      {
        title: 'Quy tắc 3: Đại từ chỉ định',
        formula: 'those who + V (những người mà) | that of / those of (thay thế danh từ đã nhắc trước đó)',
        explanation: 'Those who wish to participate should sign up by Friday.'
      }
    ],
    solvingSteps: [
      'Bước 1: Nhìn ngay sau chỗ trống xem có Danh từ hay không. Có Danh từ -> Chọn ngay Tính từ sở hữu (their, her, his, its).',
      'Bước 2: Nếu chỗ trống đứng cuối câu hoàn chỉnh hoặc sau "by" -> Chọn Đại từ phản thân (-self).',
      'Bước 3: Nếu chỗ trống đứng đầu câu trước động từ chính -> Chọn Đại từ nhân xưng chủ ngữ (They, She, He).'
    ],
    commonTraps: [
      'Nhầm giữa "their" (tính từ sở hữu + N) và "theirs" (đại từ sở hữu đứng một mình).',
      'Nhầm "its" (tính từ sở hữu của vật) với "it\'s" (viết tắt của it is).'
    ]
  },

  'Relative Clause': {
    key: 'Relative Clause',
    title: 'Chuyên Đề: Mệnh Đề Quan Hệ (Relative Clauses)',
    tagline: 'Who (người), Which (vật), Whose (sở hữu). Rút gọn: Chủ động dùng V-ing, Bị động dùng V-ed.',
    ruleFormula: 'Danh từ (Người) + WHO + V   |   Danh từ (Vật) + WHICH + V   |   N1 + WHOSE + N2',
    keyRules: [
      {
        title: 'Quy tắc 1: Chọn đại từ quan hệ',
        formula: 'Người + WHO / WHOM | Vật + WHICH | Người/Vật + THAT | Danh từ + WHOSE + Danh từ',
        explanation: 'Nhìn danh từ đứng trước đại từ quan hệ để xác định người hay vật. Nếu là sở hữu giữa 2 danh từ -> Chọn Whose.'
      },
      {
        title: 'Quy tắc 2: Rút gọn Chủ động (Active Reduction)',
        formula: 'Danh từ + [V-ING] + Tân ngữ',
        explanation: 'Khi danh từ tự thực hiện hành động: "The woman [who works here] -> The woman [working here]".'
      },
      {
        title: 'Quy tắc 3: Rút gọn Bị động (Passive Reduction)',
        formula: 'Danh từ + [V3/ED] + (Giới từ)',
        explanation: 'Khi danh từ bị tác động: "Products [which are made in Vietnam] -> Products [made in Vietnam]".'
      }
    ],
    solvingSteps: [
      'Bước 1: Xác định câu đã có động từ chính chưa. Nếu câu đã có đủ động từ chính -> Chỗ trống là mệnh đề quan hệ rút gọn (chọn V-ing hoặc V-ed).',
      'Bước 2: Nếu câu cần đại từ quan hệ nối 2 mệnh đề: Xem danh từ đứng trước là người hay vật.',
      'Bước 3: Xem phía sau có danh từ sở hữu hay không để cân nhắc "whose".'
    ],
    commonTraps: [
      'Bẫy 2 động từ trong 1 câu: Người học không nhận ra câu đã có động từ chính, chọn thêm một động từ chia thì nữa làm câu sai ngữ pháp.',
      'Không dùng "that" sau dấu phẩy (mệnh đề quan hệ không xác định).'
    ]
  },

  'Sentence Structure': {
    key: 'Sentence Structure',
    title: 'Chuyên Đề: Cấu Trúc Câu (Sentence Structure)',
    tagline: 'Cấu trúc song hành: 2 vế của and/but/or/as well as phải có cùng từ loại và dạng thức.',
    ruleFormula: 'Tính từ AND [Tính từ]   |   V-ing AND [V-ing]   |   Danh từ AND [Danh từ]',
    keyRules: [
      {
        title: 'Quy tắc 1: Cấu trúc song hành (Parallelism)',
        formula: 'A and B / A or B / A but B / not only A but also B',
        explanation: 'Từ loại của A và B bắt buộc phải tương đương nhau. Nếu A là Tính từ thì B cũng phải là Tính từ.'
      },
      {
        title: 'Quy tắc 2: Liên từ tương quan cặp đôi',
        formula: 'either ... or (hoặc cái này hoặc cái kia) | neither ... nor (không cái này cũng không cái kia) | both ... and (cả hai)',
        explanation: 'Thấy "either" ở trước thì chọn "or"; thấy "neither" thì chọn "nor"; thấy "both" thì chọn "and".'
      },
      {
        title: 'Quy tắc 3: Đảo ngữ có điều kiện (Inversion)',
        formula: 'Should you have any questions = If you have any questions',
        explanation: 'Trong TOEIC, cấu trúc "Should S + V-nguyên thể" đứng đầu câu thay thế cho mệnh đề "If".'
      }
    ],
    solvingSteps: [
      'Bước 1: Tìm các liên từ đẳng lập (and, but, or, as well as) hoặc cặp từ tương quan (either...or, both...and).',
      'Bước 2: So sánh từ loại ở vế đã có (trước liên từ) để suy ra từ loại tương đương cần điền ở vế còn lại.',
      'Bước 3: Chọn từ có cùng dạng thức ngữ pháp (cùng đuôi -ing, cùng tính từ, cùng danh từ).'
    ],
    commonTraps: [
      'Bẫy xen kẽ trạng từ trước tính từ: "and extremely ____" -> Từ cần điền vẫn là Tính từ vì extremely chỉ là trạng từ bổ nghĩa.'
    ]
  },

  'Business Vocabulary': {
    key: 'Business Vocabulary',
    title: 'Chuyên Đề: Từ Vựng Công Sở & Cụm Cố Định (Collocations)',
    tagline: 'Nhận diện cụm từ đi liền nhau theo thói quen của người bản xứ trong môi trường làm việc.',
    ruleFormula: 'ĐỘNG TỪ ĐI KÈM DANH TỪ CỐ ĐỊNH (e.g. conduct a survey, reach a consensus)',
    keyRules: [
      {
        title: 'Nhóm 1: Sự kiện & Hội nghị',
        formula: 'hold / host a meeting, luncheon, seminar, conference',
        explanation: 'Tổ chức sự kiện luôn dùng "hold" (dạng bị động: be held in/at).'
      },
      {
        title: 'Nhóm 2: Khảo sát & Nghiên cứu',
        formula: 'conduct / perform / carry out a survey, research, study, inspection',
        explanation: 'Tiến hành khảo sát, kiểm tra công sở luôn dùng "conduct".'
      },
      {
        title: 'Nhóm 3: Đáp ứng yêu cầu & Tiêu chuẩn',
        formula: 'meet / satisfy requirements, standards, specifications, expectations, deadlines',
        explanation: '"Meet the deadline" (kịp hạn chót), "meet the requirements" (đáp ứng yêu cầu).'
      },
      {
        title: 'Nhóm 4: Cụm giới từ công sở kinh điển',
        formula: 'in compliance with (tuân thủ), under warranty (được bảo hành), in recognition of (công nhận thành tích)',
        explanation: 'Các cụm cố định này luôn xuất hiện trong đề thi ETS.'
      }
    ],
    solvingSteps: [
      'Bước 1: Khi 4 đáp án là 4 từ vựng hoàn toàn khác nhau cùng từ loại -> Xác định đây là câu hỏi Từ vựng / Collocation.',
      'Bước 2: Nhìn các danh từ hoặc động từ đi liền kề để nhận diện cụm từ cố định quen thuộc (meet deadline, conduct survey, hold conference).',
      'Bước 3: Nếu không phải cụm cố định, dịch nhanh nghĩa của câu dựa trên ngữ cảnh công sở.'
    ],
    commonTraps: [
      'Dịch từng từ theo tiếng Việt (Word-by-word translation) dẫn tới chọn sai động từ đi kèm (ví dụ: làm nghiên cứu tiếng Việt là "do research" nhưng TOEIC chuộng "conduct research").'
    ]
  }
};
