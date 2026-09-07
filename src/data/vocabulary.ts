export interface VocabularyWord {
  id: string;
  word: string;
  ipa: string;
  vietnamese: string;
  partOfSpeech: string;
  category: string;
  examples: string[];
  mnemonicTip: string;
  emoji: string;
  source?: 'system' | 'user';
}

export const VOCABULARY_DATA: VocabularyWord[] = [
  // Business & Corporate
  {
    id: "v1",
    word: "corporate merger",
    ipa: "/ˈkɔːrpərət ˈmɜːrdʒər/",
    vietnamese: "sáp nhập doanh nghiệp",
    partOfSpeech: "noun",
    category: "Business & Corporate",
    examples: [
      "The corporate merger created a larger company.",
      "Rumors of a corporate merger caused the stock price to jump."
    ],
    mnemonicTip: "Hai công ty 'merge' thành một",
    emoji: "🏗️"
  },
  {
    id: "v2",
    word: "firm",
    ipa: "/fɜːrm/",
    vietnamese: "công ty, hãng",
    partOfSpeech: "noun",
    category: "Business & Corporate",
    examples: [
      "She works for a law firm downtown.",
      "The accounting firm is hiring new graduates."
    ],
    mnemonicTip: "'Firm' = vững chắc, công ty vững chắc",
    emoji: "💪"
  },
  {
    id: "v3",
    word: "brochures",
    ipa: "/broʊˈʃʊrz/",
    vietnamese: "tờ rơi quảng cáo",
    partOfSpeech: "noun",
    category: "Business & Corporate",
    examples: [
      "The brochures describe our new services.",
      "Please take one of our travel brochures."
    ],
    mnemonicTip: "'Bro, sure!' - anh ơi, chắc chắn lấy tờ rơi",
    emoji: "📄"
  },
  {
    id: "v4",
    word: "advertisement",
    ipa: "/ˌædvərˈtaɪzmənt/",
    vietnamese: "quảng cáo",
    partOfSpeech: "noun",
    category: "Business & Corporate",
    examples: [
      "The advertisement appeared in the newspaper.",
      "They spent a lot of money on TV advertisements."
    ],
    mnemonicTip: "'Ad' = quảng cáo ngắn gọn",
    emoji: "📺"
  },
  {
    id: "v5",
    word: "conference",
    ipa: "/ˈkɑːnfərəns/",
    vietnamese: "hội nghị",
    partOfSpeech: "noun",
    category: "Business & Corporate",
    examples: [
      "The annual conference attracted many attendees.",
      "He is speaking at a medical conference next week."
    ],
    mnemonicTip: "'Con ference' = con họp mặt",
    emoji: "🎤"
  },
  // Real Estate & Location
  {
    id: "v6",
    word: "estate",
    ipa: "/ɪˈsteɪt/",
    vietnamese: "bất động sản",
    partOfSpeech: "noun",
    category: "Real Estate & Location",
    examples: [
      "The real estate market is booming.",
      "He left his entire estate to his children."
    ],
    mnemonicTip: "'E-state' = trạng thái bất động (sản)",
    emoji: "🏠"
  },
  {
    id: "v7",
    word: "loft",
    ipa: "/lɒft/",
    vietnamese: "gác xép, căn hộ trên cao",
    partOfSpeech: "noun",
    category: "Real Estate & Location",
    examples: [
      "They converted the loft into a studio.",
      "She lives in a spacious loft apartment."
    ],
    mnemonicTip: "'Loft' = lofty = cao, ở trên cao",
    emoji: "⬆️"
  },
  {
    id: "v8",
    word: "downtown",
    ipa: "/ˈdaʊntaʊn/",
    vietnamese: "trung tâm thành phố",
    partOfSpeech: "noun/adv",
    category: "Real Estate & Location",
    examples: [
      "The new office is located downtown.",
      "We went downtown for dinner."
    ],
    mnemonicTip: "'Down' + 'town' = xuống phố, trung tâm",
    emoji: "🏙️"
  },
  // People & Social
  {
    id: "v9",
    word: "farewell",
    ipa: "/ˌferˈwel/",
    vietnamese: "lời tạm biệt",
    partOfSpeech: "noun",
    category: "People & Social",
    examples: [
      "We organized a farewell party for the director.",
      "He bid a fond farewell to his colleagues."
    ],
    mnemonicTip: "'Fare well' = chúc bạn đi tốt đẹp",
    emoji: "👋"
  },
  {
    id: "v10",
    word: "luncheon",
    ipa: "/ˈlʌntʃən/",
    vietnamese: "bữa trưa trang trọng",
    partOfSpeech: "noun",
    category: "People & Social",
    examples: [
      "The business luncheon was held at a hotel.",
      "She attended a charity luncheon."
    ],
    mnemonicTip: "'Lunch' + 'eon' = lunch sang trọng",
    emoji: "🍽️"
  },
  {
    id: "v11",
    word: "town council",
    ipa: "/taʊn ˈkaʊnsl/",
    vietnamese: "hội đồng thị trấn",
    partOfSpeech: "noun",
    category: "People & Social",
    examples: [
      "The town council approved the budget.",
      "She was elected to the town council."
    ],
    mnemonicTip: "Hội đồng quản lý thị trấn",
    emoji: "🏛️"
  },
  {
    id: "v12",
    word: "like-minded",
    ipa: "/ˈlaɪk ˈmaɪndɪd/",
    vietnamese: "cùng chí hướng",
    partOfSpeech: "adj",
    category: "People & Social",
    examples: [
      "She surrounded herself with like-minded colleagues.",
      "It's great to work with a group of like-minded individuals."
    ],
    mnemonicTip: "'Like mind' = cùng suy nghĩ",
    emoji: "🤝"
  },
  // Products & Consumer
  {
    id: "v13",
    word: "soaps",
    ipa: "/soʊps/",
    vietnamese: "xà phòng",
    partOfSpeech: "noun",
    category: "Products & Consumer",
    examples: [
      "The store sells organic soaps.",
      "These artisanal soaps smell wonderful."
    ],
    mnemonicTip: "Soap opera = phim dài như rửa bát",
    emoji: "🧼"
  },
  {
    id: "v14",
    word: "lotions",
    ipa: "/ˈloʊʃənz/",
    vietnamese: "kem dưỡng da",
    partOfSpeech: "noun",
    category: "Products & Consumer",
    examples: [
      "Apply lotions after showering.",
      "We offer a variety of skin lotions."
    ],
    mnemonicTip: "'Lotion' gần giống 'loshion' = dưỡng",
    emoji: "🧴"
  },
  {
    id: "v15",
    word: "nutritional",
    ipa: "/njuːˈtrɪʃənl/",
    vietnamese: "thuộc về dinh dưỡng",
    partOfSpeech: "adj",
    category: "Products & Consumer",
    examples: [
      "Check the nutritional information on the label.",
      "The meal has high nutritional value."
    ],
    mnemonicTip: "'Nutri' = nutrients = chất dinh dưỡng",
    emoji: "🥗"
  },
  {
    id: "v16",
    word: "frozen foods",
    ipa: "/ˈfroʊzən fuːdz/",
    vietnamese: "thực phẩm đông lạnh",
    partOfSpeech: "noun",
    category: "Products & Consumer",
    examples: [
      "The frozen foods section has new products.",
      "We rely on frozen foods when we don't have time to cook."
    ],
    mnemonicTip: "'Frozen' = đông cứng như phim Frozen",
    emoji: "🧊"
  },
  {
    id: "v17",
    word: "convenience",
    ipa: "/kənˈviːniəns/",
    vietnamese: "sự tiện lợi",
    partOfSpeech: "noun",
    category: "Products & Consumer",
    examples: [
      "The store offers great convenience for shoppers.",
      "Please call me at your earliest convenience."
    ],
    mnemonicTip: "Convenience store = cửa hàng tiện lợi",
    emoji: "🏪"
  },
  // Descriptive & Quality
  {
    id: "v18",
    word: "mosaic",
    ipa: "/moʊˈzeɪɪk/",
    vietnamese: "tranh khảm",
    partOfSpeech: "noun",
    category: "Descriptive & Quality",
    examples: [
      "The mosaic on the wall depicts a landscape.",
      "They created a beautiful mosaic using colorful glass."
    ],
    mnemonicTip: "'Mo-say-ic' = mỗi mảnh ghép nói lên điều gì",
    emoji: "🎨"
  },
  {
    id: "v19",
    word: "texture",
    ipa: "/ˈtekstʃər/",
    vietnamese: "kết cấu, chất liệu",
    partOfSpeech: "noun",
    category: "Descriptive & Quality",
    examples: [
      "The fabric has a smooth texture.",
      "This paint creates a rough texture on the wall."
    ],
    mnemonicTip: "'Text' + 'ure' = kết cấu của text",
    emoji: "🧵"
  },
  {
    id: "v20",
    word: "spectrum",
    ipa: "/ˈspektrəm/",
    vietnamese: "quang phổ, phạm vi",
    partOfSpeech: "noun",
    category: "Descriptive & Quality",
    examples: [
      "The product appeals to a broad spectrum of customers.",
      "The light was separated into its full spectrum."
    ],
    mnemonicTip: "'Spec' = spectacle = cảnh tượng rộng lớn",
    emoji: "🌈"
  },
  {
    id: "v21",
    word: "minerals",
    ipa: "/ˈmɪnərəlz/",
    vietnamese: "khoáng chất",
    partOfSpeech: "noun",
    category: "Descriptive & Quality",
    examples: [
      "The water contains essential minerals.",
      "These vitamins are packed with important minerals."
    ],
    mnemonicTip: "'Mine' + 'rals' = đào mỏ lấy khoáng",
    emoji: "⛏️"
  },
  {
    id: "v22",
    word: "precision",
    ipa: "/prɪˈsɪʒn/",
    vietnamese: "sự chính xác",
    partOfSpeech: "noun",
    category: "Descriptive & Quality",
    examples: [
      "The machine operates with great precision.",
      "He measured the ingredients with extreme precision."
    ],
    mnemonicTip: "'Pre-cision' = cắt trước, cắt chính xác",
    emoji: "🎯"
  },
  {
    id: "v23",
    word: "ideal",
    ipa: "/aɪˈdiːəl/",
    vietnamese: "lý tưởng",
    partOfSpeech: "adj",
    category: "Descriptive & Quality",
    examples: [
      "This is the ideal location for a new branch.",
      "She is the ideal candidate for the job."
    ],
    mnemonicTip: "'I deal' = tôi xử lý = cách lý tưởng",
    emoji: "💭"
  },
  {
    id: "v24",
    word: "fast-paced",
    ipa: "/ˌfæst ˈpeɪst/",
    vietnamese: "nhịp độ nhanh",
    partOfSpeech: "adj",
    category: "Descriptive & Quality",
    examples: [
      "She thrives in a fast-paced environment.",
      "The movie was an exciting, fast-paced thriller."
    ],
    mnemonicTip: "'Fast pace' = bước chân nhanh",
    emoji: "🏃"
  },
  // Actions & Processes
  {
    id: "v25",
    word: "substituted",
    ipa: "/ˈsʌbstɪtuːtɪd/",
    vietnamese: "được thay thế",
    partOfSpeech: "verb",
    category: "Actions & Processes",
    examples: [
      "A new manager was substituted for the old one.",
      "You can substitute oil for butter in this recipe."
    ],
    mnemonicTip: "'Sub' = thay thế (substitute teacher)",
    emoji: "🔄"
  },
  {
    id: "v26",
    word: "protective",
    ipa: "/prəˈtektɪv/",
    vietnamese: "bảo vệ",
    partOfSpeech: "adj",
    category: "Actions & Processes",
    examples: [
      "Workers must wear protective equipment.",
      "He is very protective of his younger sister."
    ],
    mnemonicTip: "'Protect' + 'ive' = có tính bảo vệ",
    emoji: "🛡️"
  },
  {
    id: "v27",
    word: "inquiry",
    ipa: "/ɪnˈkwaɪəri/",
    vietnamese: "sự thẩm tra, hỏi",
    partOfSpeech: "noun",
    category: "Actions & Processes",
    examples: [
      "Please direct your inquiry to the front desk.",
      "The police launched an inquiry into the incident."
    ],
    mnemonicTip: "'In-query' = đặt câu hỏi vào trong",
    emoji: "🔍"
  },
  {
    id: "v28",
    word: "indicate",
    ipa: "/ˈɪndɪkeɪt/",
    vietnamese: "chỉ ra, cho thấy",
    partOfSpeech: "verb",
    category: "Actions & Processes",
    examples: [
      "The results indicate a positive trend.",
      "Please indicate your preference on the form."
    ],
    mnemonicTip: "'Indi-cate' = index = chỉ số, chỉ ra",
    emoji: "👉"
  },
  {
    id: "v29",
    word: "sacrificing",
    ipa: "/ˈsækrɪfaɪsɪŋ/",
    vietnamese: "hy sinh",
    partOfSpeech: "verb",
    category: "Actions & Processes",
    examples: [
      "She is sacrificing her free time for work.",
      "They are sacrificing profits to gain market share."
    ],
    mnemonicTip: "'Sacred' + 'fice' = hiến dâng thiêng liêng",
    emoji: "⚔️"
  },
  {
    id: "v30",
    word: "seeking",
    ipa: "/ˈsiːkɪŋ/",
    vietnamese: "tìm kiếm",
    partOfSpeech: "verb",
    category: "Actions & Processes",
    examples: [
      "The company is seeking qualified applicants.",
      "He is actively seeking a new position."
    ],
    mnemonicTip: "'Seek' = hide and seek = trốn tìm",
    emoji: "🔎"
  },
  {
    id: "v31",
    word: "shine",
    ipa: "/ʃaɪn/",
    vietnamese: "tỏa sáng",
    partOfSpeech: "verb",
    category: "Actions & Processes",
    examples: [
      "Her talent really shines in presentations.",
      "Please shine a light over here."
    ],
    mnemonicTip: "'Shine' = sunshine = ánh nắng tỏa sáng",
    emoji: "✨"
  },
  {
    id: "v32",
    word: "flourish",
    ipa: "/ˈflʌrɪʃ/",
    vietnamese: "phát triển, nở rộ",
    partOfSpeech: "verb",
    category: "Actions & Processes",
    examples: [
      "The business continued to flourish despite the economy.",
      "Plants flourish in this rich soil."
    ],
    mnemonicTip: "'Flour-ish' = bột nở, nở rộ",
    emoji: "🌸"
  },
  {
    id: "v33",
    word: "refracting",
    ipa: "/rɪˈfræktɪŋ/",
    vietnamese: "khúc xạ",
    partOfSpeech: "verb",
    category: "Actions & Processes",
    examples: [
      "The prism is refracting the light.",
      "Water is refracting the sun's rays."
    ],
    mnemonicTip: "'Re-fract' = bẻ gãy lại tia sáng",
    emoji: "🔬"
  },
  {
    id: "v34",
    word: "plenty",
    ipa: "/ˈplenti/",
    vietnamese: "nhiều, dồi dào",
    partOfSpeech: "pronoun/adv",
    category: "Actions & Processes",
    examples: [
      "There is plenty of time to finish the project.",
      "We have plenty of food for everyone."
    ],
    mnemonicTip: "'Plenty' gần 'plant' = trồng nhiều, thu nhiều",
    emoji: "🎁"
  }
];

export const getWordsByCategory = (category: string) => {
  if (category === "All") return VOCABULARY_DATA;
  return VOCABULARY_DATA.filter(w => w.category === category);
};

export const getRandomWords = (n: number, excludeIds: string[] = []) => {
  const available = VOCABULARY_DATA.filter(w => !excludeIds.includes(w.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};
