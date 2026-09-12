import fs from 'fs';
import path from 'path';

const words650 = [
  // Original 650+ preserved with cleaned emoji
  {
    id: "v2",
    word: "firm",
    ipa: "/fɜːrm/",
    vietnamese: "công ty, hãng tư vấn; kiên quyết, vững chắc",
    partOfSpeech: "noun/adj",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "She accepted a partner position at a prestigious downtown law firm.",
      "Management remained firm on its commitment to cost reduction."
    ],
    mnemonicTip: "Accounting firm (công ty kiểm toán) / law firm (văn phòng luật)",
    emoji: ""
  },
  {
    id: "v3",
    word: "brochure",
    ipa: "/broʊˈʃʊr/",
    vietnamese: "cuốn sách quảng cáo, tập gấp giới thiệu",
    partOfSpeech: "noun",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "The full-color sales brochures highlight our new residential developments.",
      "Please take a complimentary travel brochure from the display rack."
    ],
    mnemonicTip: "Tập tài liệu gấp giới thiệu dịch vụ/sản phẩm",
    emoji: ""
  },
  {
    id: "v6",
    word: "estate",
    ipa: "/ɪˈsteɪt/",
    vietnamese: "bất động sản, điền trang, khối tài sản",
    partOfSpeech: "noun",
    category: "Real Estate & Location",
    targetBand: "650+",
    examples: [
      "Commercial real estate prices increased significantly in the metropolitan area.",
      "He invested his personal savings in suburban residential estate."
    ],
    mnemonicTip: "Real estate = bất động sản; Real estate agent = môi giới nhà đất",
    emoji: ""
  },
  {
    id: "v10",
    word: "luncheon",
    ipa: "/ˈlʌntʃən/",
    vietnamese: "bữa tiệc trưa trang trọng",
    partOfSpeech: "noun",
    category: "Travel & Hospitality",
    targetBand: "650+",
    examples: [
      "The annual charity luncheon was held in the luxury hotel dining hall.",
      "Executives discussed future regional expansion during the business luncheon."
    ],
    mnemonicTip: "Lunch trang trọng nhân dịp gặp gỡ ngoại giao / kinh doanh",
    emoji: ""
  },
  {
    id: "v11",
    word: "council",
    ipa: "/ˈkaʊnsl/",
    vietnamese: "hội đồng, ban cố vấn",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The municipal council voted unanimously in favor of the infrastructure project.",
      "She serves as an elected representative on the regional advisory council."
    ],
    mnemonicTip: "City council = hội đồng thành phố; Advisory council = hội đồng cố vấn",
    emoji: ""
  },
  {
    id: "v12",
    word: "like-minded",
    ipa: "/ˌlaɪk ˈmaɪndɪd/",
    vietnamese: "cùng chí hướng, cùng quan điểm tư tưởng",
    partOfSpeech: "adj",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "The conference provided networking opportunities with like-minded professionals.",
      "Entrepreneurs benefit from collaborating with like-minded colleagues."
    ],
    mnemonicTip: "Like (giống) + minded (suy nghĩ) = người đồng chí hướng",
    emoji: ""
  },
  {
    id: "v15",
    word: "nutritional",
    ipa: "/njuːˈtrɪʃənl/",
    vietnamese: "thuộc về dinh dưỡng, giá trị dinh dưỡng",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Consumers are increasingly attentive to the nutritional information on food labels.",
      "The company cafeteria revised its menu to offer healthier nutritional options."
    ],
    mnemonicTip: "Nutritional value = giá trị dinh dưỡng",
    emoji: ""
  },
  {
    id: "v19",
    word: "texture",
    ipa: "/ˈtekstʃər/",
    vietnamese: "kết cấu, độ thô ráp mịn màng của chất liệu",
    partOfSpeech: "noun",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "The interior designer selected upholstery fabrics with a rich, soft texture.",
      "The quality control inspector checked the rough surface texture of the polymer."
    ],
    mnemonicTip: "Texture của vải hoặc bề mặt vật liệu trong kiểm định sản phẩm",
    emoji: ""
  },
  {
    id: "v22",
    word: "precision",
    ipa: "/prɪˈsɪʒn/",
    vietnamese: "độ chính xác, sự chuẩn xác",
    partOfSpeech: "noun",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "The automated cutting machine operates with microscopic precision.",
      "Financial forecasting requires meticulous attention and mathematical precision."
    ],
    mnemonicTip: "Precision instruments = các thiết bị đo lường chuẩn xác",
    emoji: ""
  },
  {
    id: "v24",
    word: "fast-paced",
    ipa: "/ˌfæst ˈpeɪst/",
    vietnamese: "nhịp độ nhanh, dồn dập",
    partOfSpeech: "adj",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "The sales executive thrives in a fast-paced and challenging work environment.",
      "Financial traders must make crucial decisions in a fast-paced market."
    ],
    mnemonicTip: "Fast-paced environment: môi trường làm việc tốc độ cao, thường gặp trong tin tuyển dụng",
    emoji: ""
  },
  {
    id: "v25",
    word: "substitute",
    ipa: "/ˈsʌbstɪtuːt/",
    vietnamese: "thay thế, người/vật thay thế",
    partOfSpeech: "verb/noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "Ms. Parker will substitute for the department director while he is on medical leave.",
      "There is no substitute for rigorous training when learning technical procedures."
    ],
    mnemonicTip: "Substitute A for B = thay thế B bằng A",
    emoji: ""
  },
  {
    id: "v27",
    word: "inquiry",
    ipa: "/ˈɪnkwəri/",
    vietnamese: "thắc mắc, câu hỏi hỏi thăm thông tin; cuộc điều tra",
    partOfSpeech: "noun",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Direct all media inquiries to our corporate public relations officer.",
      "We received an inquiry concerning wholesale bulk pricing yesterday."
    ],
    mnemonicTip: "Make an inquiry = gửi câu hỏi thắc mắc",
    emoji: ""
  },
  {
    id: "v28",
    word: "indicate",
    ipa: "/ˈɪndɪkeɪt/",
    vietnamese: "chỉ ra, cho thấy, biểu thị",
    partOfSpeech: "verb",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Preliminary market surveys indicate strong consumer interest in electric scooters.",
      "Please indicate your meal preference on the registration form."
    ],
    mnemonicTip: "As indicated in the report = như được chỉ rõ trong báo cáo",
    emoji: ""
  },
  {
    id: "v32",
    word: "flourish",
    ipa: "/ˈflʌrɪʃ/",
    vietnamese: "phát triển thịnh vượng, nở rộ",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The regional branch continued to flourish despite unpredictable market conditions.",
      "Creative startups tend to flourish in tech-friendly incubator hubs."
    ],
    mnemonicTip: "Đồng nghĩa với thrive / prosper",
    emoji: ""
  },

  // 146 Additional High-Frequency 650+ Words
  {
    id: "v144",
    word: "accommodate",
    ipa: "/əˈkɑːmədeɪt/",
    vietnamese: "đáp ứng (yêu cầu), cung cấp chỗ ở/chỗ ngồi",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The newly renovated auditorium can accommodate up to five hundred attendees.",
      "We will do our best to accommodate your special dietary requests."
    ],
    mnemonicTip: "Accommodate needs/requests = đáp ứng nhu cầu/yêu cầu",
    emoji: ""
  },
  {
    id: "v145",
    word: "accomplish",
    ipa: "/əˈkɑːmplɪʃ/",
    vietnamese: "hoàn thành xuất sắc, đạt được mục tiêu",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The project task force accomplished all milestones ahead of schedule.",
      "Hard work and dedication enabled her to accomplish her career objectives."
    ],
    mnemonicTip: "Accomplish a task/goal = hoàn thành một nhiệm vụ/mục tiêu",
    emoji: ""
  },
  {
    id: "v146",
    word: "acquire",
    ipa: "/əˈkwaɪər/",
    vietnamese: "mua lại, thâu tóm (doanh nghiệp); đạt được (kỹ năng)",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The telecom giant plans to acquire a European cloud software provider.",
      "He acquired extensive logistical expertise during his decade overseas."
    ],
    mnemonicTip: "Acquisition = thương vụ thâu tóm",
    emoji: ""
  },
  {
    id: "v147",
    word: "adequate",
    ipa: "/ˈædɪkwət/",
    vietnamese: "đầy đủ, thỏa đáng, đáp ứng yêu cầu",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Ensure that there is adequate lighting and ventilation in the workshop.",
      "The compensation package was deemed adequate by the union representatives."
    ],
    mnemonicTip: "Adequate preparation = sự chuẩn bị đầy đủ",
    emoji: ""
  },
  {
    id: "v148",
    word: "adhere",
    ipa: "/ədˈhɪr/",
    vietnamese: "tuân thủ chặt chẽ (luật, quy định), dính chặt",
    partOfSpeech: "verb",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "All chemical plant employees must adhere strictly to environmental safety regulations.",
      "The contractor failed to adhere to the agreed construction schedule."
    ],
    mnemonicTip: "Adhere to policies/guidelines/rules = tuân theo quy định",
    emoji: ""
  },
  {
    id: "v149",
    word: "allocate",
    ipa: "/ˈæləkeɪt/",
    vietnamese: "phân bổ (ngân sách, nhân lực, thời gian)",
    partOfSpeech: "verb",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "The board allocated two million dollars to renewable energy research.",
      "Project managers must allocate resources judiciously to prevent bottlenecks."
    ],
    mnemonicTip: "Allocate funds/budget = phân bổ ngân quỹ",
    emoji: ""
  },
  {
    id: "v150",
    word: "alteration",
    ipa: "/ˌɔːltəˈreɪʃn/",
    vietnamese: "sự sửa đổi, điều chỉnh",
    partOfSpeech: "noun",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Any alterations to the architectural blueprints must be approved by the chief engineer.",
      "The tailor provides complimentary alterations on formal business suits."
    ],
    mnemonicTip: "Động từ alter = thay đổi, sửa đổi",
    emoji: ""
  },
  {
    id: "v151",
    word: "amendment",
    ipa: "/əˈmendmənt/",
    vietnamese: "điều khoản sửa đổi bổ sung hợp đồng",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "The legal teams drafted an amendment to extend the lease agreement.",
      "The proposed amendment was adopted following intensive discussions."
    ],
    mnemonicTip: "Amend a contract -> contract amendment",
    emoji: ""
  },
  {
    id: "v152",
    word: "anticipate",
    ipa: "/ænˈtɪsɪpeɪt/",
    vietnamese: "dự đoán trước, lường trước",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Retailers anticipate strong sales growth during the festive holiday season.",
      "We did not anticipate such high shipping costs when pricing the catalog."
    ],
    mnemonicTip: "Anticipate changes/growth/problems = lường trước sự thay đổi",
    emoji: ""
  },
  {
    id: "v153",
    word: "appraisal",
    ipa: "/əˈpreɪzl/",
    vietnamese: "sự đánh giá năng lực nhân viên, thẩm định giá trị",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "Employees undergo an annual performance appraisal every December.",
      "The bank ordered an independent property appraisal prior to granting the mortgage."
    ],
    mnemonicTip: "Performance appraisal = đánh giá hiệu quả công việc",
    emoji: ""
  },
  {
    id: "v154",
    word: "asset",
    ipa: "/ˈæset/",
    vietnamese: "tài sản; người/vật quý giá mang lại lợi thế",
    partOfSpeech: "noun",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Her fluency in Mandarin proved to be a tremendous asset during the negotiation.",
      "The corporation's total liquid assets exceed fifty million dollars."
    ],
    mnemonicTip: "Valuable asset = tài sản quý giá",
    emoji: ""
  },
  {
    id: "v155",
    word: "assign",
    ipa: "/əˈsaɪn/",
    vietnamese: "phân công, giao phó trách nhiệm",
    partOfSpeech: "verb",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "The department head assigned the software audit to two senior programmers.",
      "Tasks were assigned according to individual team member strengths."
    ],
    mnemonicTip: "Assignment = nhiệm vụ được giao",
    emoji: ""
  },
  {
    id: "v156",
    word: "assurance",
    ipa: "/əˈʃʊrəns/",
    vietnamese: "sự cam đoan, bảo đảm chất lượng",
    partOfSpeech: "noun",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "The manufacturer gave firm assurances that the delayed shipment would arrive by noon.",
      "He works as a specialist in the corporate quality assurance division."
    ],
    mnemonicTip: "Quality assurance (QA) = bảo đảm chất lượng",
    emoji: ""
  },
  {
    id: "v157",
    word: "audit",
    ipa: "/ˈɔːdɪt/",
    vietnamese: "sự kiểm toán, thanh tra sổ sách kế toán",
    partOfSpeech: "noun/verb",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "The external accounting firm will conduct the annual financial audit next month.",
      "Tax authorities audited the corporation's travel and entertainment expenses."
    ],
    mnemonicTip: "Financial audit = kiểm toán tài chính",
    emoji: ""
  },
  {
    id: "v158",
    word: "authorize",
    ipa: "/ˈɔːθəraɪz/",
    vietnamese: "ủy quyền, cho phép chính thức",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Only the managing director can authorize corporate expenditures over ten thousand dollars.",
      "Please sign the purchase requisition to authorize the equipment purchase."
    ],
    mnemonicTip: "Authorized personnel only = chỉ người có thẩm quyền mới được vào",
    emoji: ""
  },
  {
    id: "v159",
    word: "benchmark",
    ipa: "/ˈbentʃmɑːrk/",
    vietnamese: "tiêu chuẩn đối sánh, mốc chuẩn mực",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The factory's safety record serves as an industry benchmark for competitors.",
      "We benchmarked our customer service response times against the top three competitors."
    ],
    mnemonicTip: "Benchmark = thước đo chuẩn mực",
    emoji: ""
  },
  {
    id: "v160",
    word: "beneficial",
    ipa: "/ˌbenɪˈfɪʃl/",
    vietnamese: "có lợi, mang lại lợi ích",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Regular technical training sessions are highly beneficial to career advancement.",
      "The merger was mutually beneficial to both technology firms."
    ],
    mnemonicTip: "Mutually beneficial = đôi bên cùng có lợi",
    emoji: ""
  },
  {
    id: "v161",
    word: "broaden",
    ipa: "/ˈbrɔːdn/",
    vietnamese: "mở rộng, nâng cao tầm vóc",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The electronics manufacturer plans to broaden its product line into smart home appliances.",
      "Attending overseas trade expos helps executives broaden their global business network."
    ],
    mnemonicTip: "Broaden the client base = mở rộng tệp khách hàng",
    emoji: ""
  },
  {
    id: "v162",
    word: "campaign",
    ipa: "/kæmˈpeɪn/",
    vietnamese: "chiến dịch (quảng bá, tiếp thị)",
    partOfSpeech: "noun",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "The nationwide advertising campaign boosted brand recognition by twenty percent.",
      "The marketing agency launched an interactive social media campaign."
    ],
    mnemonicTip: "Ad campaign = chiến dịch quảng cáo",
    emoji: ""
  },
  {
    id: "v163",
    word: "capacity",
    ipa: "/kəˈpæsəti/",
    vietnamese: "công suất, sức chứa, năng lực sản xuất",
    partOfSpeech: "noun",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "The assembly plant is currently operating at ninety percent capacity.",
      "The auditorium has a seating capacity of twelve hundred people."
    ],
    mnemonicTip: "Operate at full capacity = hoạt động hết công suất",
    emoji: ""
  },
  {
    id: "v164",
    word: "clause",
    ipa: "/klɔːz/",
    vietnamese: "điều khoản trong hợp đồng văn bản luật",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "A penalty clause in the vendor contract requires compensation for late deliveries.",
      "Review the confidentiality clause carefully before signing the agreement."
    ],
    mnemonicTip: "Confidentiality clause = điều khoản bảo mật",
    emoji: ""
  },
  {
    id: "v165",
    word: "collaborate",
    ipa: "/kəˈlæbəreɪt/",
    vietnamese: "hợp tác, phối hợp làm việc",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Engineers from both divisions collaborated on the new electric vehicle motor.",
      "Our design department collaborates closely with external marketing consultants."
    ],
    mnemonicTip: "Collaborate with someone on something = hợp tác với ai làm gì",
    emoji: ""
  },
  {
    id: "v166",
    word: "commence",
    ipa: "/kəˈmens/",
    vietnamese: "bắt đầu, khởi sự (trang trọng)",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The quarterly shareholders' meeting is scheduled to commence at ten o'clock.",
      "Construction work on the subway extension will commence next spring."
    ],
    mnemonicTip: "Từ vựng trang trọng của begin / start trong đề thi TOEIC",
    emoji: ""
  },
  {
    id: "v167",
    word: "commitment",
    ipa: "/kəˈmɪtmənt/",
    vietnamese: "sự cam kết, trách nhiệm tận tụy",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The corporation demonstrated a firm commitment to reducing greenhouse gas emissions.",
      "Her unwavering commitment to customer excellence earned her employee of the year."
    ],
    mnemonicTip: "Demonstrate commitment to = thể hiện sự cam kết đối với",
    emoji: ""
  },
  {
    id: "v168",
    word: "compensation",
    ipa: "/ˌkɑːmpenˈseɪʃn/",
    vietnamese: "khoản tiền thù lao lương bổng; sự đền bù thiệt hại",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "The executive compensation package includes stock options and performance bonuses.",
      "Passengers received airline vouchers as compensation for the cancelled flight."
    ],
    mnemonicTip: "Workers' compensation = bảo hiểm bồi thường người lao động",
    emoji: ""
  },
  {
    id: "v169",
    word: "compliance",
    ipa: "/kəmˈplaɪəns/",
    vietnamese: "sự tuân thủ đúng quy định pháp luật",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "All medical equipment is manufactured in strict compliance with safety guidelines.",
      "The company appointed a compliance officer to monitor regulatory updates."
    ],
    mnemonicTip: "In compliance with = tuân thủ theo",
    emoji: ""
  },
  {
    id: "v170",
    word: "comprehensive",
    ipa: "/ˌkɑːmprɪˈhensɪv/",
    vietnamese: "toàn diện, bao quát đầy đủ",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "New employees participate in a comprehensive two-week orientation program.",
      "The audit produced a comprehensive assessment of internal financial controls."
    ],
    mnemonicTip: "Comprehensive review / comprehensive coverage: đánh giá toàn diện",
    emoji: ""
  },
  {
    id: "v171",
    word: "compromise",
    ipa: "/ˈkɑːmprəmaɪz/",
    vietnamese: "sự thỏa hiệp, thỏa hiệp nhượng bộ",
    partOfSpeech: "noun/verb",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "After several hours of bargaining, union negotiators reached a fair compromise.",
      "We cannot compromise on product quality or workplace safety standards."
    ],
    mnemonicTip: "Reach a compromise = đạt được thỏa hiệp",
    emoji: ""
  },
  {
    id: "v172",
    word: "concession",
    ipa: "/kənˈseʃn/",
    vietnamese: "sự nhượng bộ; gian hàng nhượng quyền",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "Management made wage concessions to avert a potential factory strike.",
      "The stadium concession stand sells refreshments and team souvenirs."
    ],
    mnemonicTip: "Make a concession = đưa ra nhượng bộ khi đàm phán",
    emoji: ""
  },
  {
    id: "v173",
    word: "conduct",
    ipa: "/kənˈdʌkt/",
    vietnamese: "tiến hành, thực hiện (nghiên cứu, khảo sát)",
    partOfSpeech: "verb",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "The market research firm will conduct a customer survey across ten major cities.",
      "Independent inspectors conducted a thorough audit of the assembly facility."
    ],
    mnemonicTip: "Conduct a survey / conduct an interview / conduct an investigation",
    emoji: ""
  },
  {
    id: "v174",
    word: "confidential",
    ipa: "/ˌkɑːnfɪˈdenʃl/",
    vietnamese: "tuyệt mật, bí mật nội bộ",
    partOfSpeech: "adj",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "Employees must treat all client financial documents as strictly confidential.",
      "The confidential report was stored in an encrypted corporate database."
    ],
    mnemonicTip: "Strictly confidential = hoàn toàn bảo mật",
    emoji: ""
  },
  {
    id: "v175",
    word: "consecutive",
    ipa: "/kənˈsekjətɪv/",
    vietnamese: "liên tiếp, liền nhau",
    partOfSpeech: "adj",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "The retail chain recorded increased profits for four consecutive quarters.",
      "The factory achieved three consecutive years without an on-site injury."
    ],
    mnemonicTip: "Consecutive days/months/quarters = các ngày/tháng/quý liên tiếp",
    emoji: ""
  },
  {
    id: "v176",
    word: "consensus",
    ipa: "/kənˈsensəs/",
    vietnamese: "sự đồng thuận, nhất trí",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The executive board reached a general consensus on the revised expansion budget.",
      "Building a consensus among team leaders took several rounds of dialogue."
    ],
    mnemonicTip: "Reach a consensus = đạt được sự nhất trí chung",
    emoji: ""
  },
  {
    id: "v177",
    word: "consent",
    ipa: "/kənˈsent/",
    vietnamese: "sự ưng thuận, đồng ý bằng văn bản",
    partOfSpeech: "noun/verb",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "No proprietary data may be shared without prior written consent from the client.",
      "The property owner consented to the proposed boundary wall repairs."
    ],
    mnemonicTip: "Prior written consent = sự đồng ý trước bằng văn bản",
    emoji: ""
  },
  {
    id: "v178",
    word: "consequently",
    ipa: "/ˈkɑːnsəkwentli/",
    vietnamese: "hậu quả là, do đó vì vậy",
    partOfSpeech: "adv",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Raw material costs surged; consequently, the company had to adjust retail prices.",
      "The supplier missed the deadline, and consequently production was delayed."
    ],
    mnemonicTip: "Từ nối biểu thị kết quả trong Part 5 & 6",
    emoji: ""
  },
  {
    id: "v179",
    word: "considerable",
    ipa: "/kənˈsɪdərəbl/",
    vietnamese: "đáng kể, to lớn",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "The new software automation generated considerable time savings for accountants.",
      "The firm made a considerable investment in cybersecurity infrastructure."
    ],
    mnemonicTip: "Considerable amount / considerable savings: một lượng đáng kể",
    emoji: ""
  },
  {
    id: "v180",
    word: "consolidate",
    ipa: "/kənˈsɑːlɪdeɪt/",
    vietnamese: "hợp nhất, củng cố vị thế",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The company decided to consolidate its three regional distribution centers into one.",
      "The merger helped the firm consolidate its leading market share."
    ],
    mnemonicTip: "Consolidate debts / operations = gom lại, tinh giản",
    emoji: ""
  },
  {
    id: "v181",
    word: "contractor",
    ipa: "/ˈkɑːntræktər/",
    vietnamese: "nhà thầu khoán",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "The building owners hired a licensed general contractor to manage the renovation.",
      "Independent contractors submit project invoices twice a month."
    ],
    mnemonicTip: "General contractor = tổng thầu xây dựng",
    emoji: ""
  },
  {
    id: "v182",
    word: "coordinate",
    ipa: "/koʊˈɔːrdɪneɪt/",
    vietnamese: "điều phối, sắp xếp ăn khớp",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The event manager will coordinate catering, audio equipment, and guest registrations.",
      "Our logistics team coordinates closely with overseas sea freight carriers."
    ],
    mnemonicTip: "Project coordinator = điều phối viên dự án",
    emoji: ""
  },
  {
    id: "v183",
    word: "crucial",
    ipa: "/ˈkruːʃl/",
    vietnamese: "cốt yếu, mang tính quyết định",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Accurate inventory tracking plays a crucial role in preventing supply shortages.",
      "Securing the municipal permit was crucial to the project's continuation."
    ],
    mnemonicTip: "Play a crucial role in = đóng vai trò sống còn trong",
    emoji: ""
  },
  {
    id: "v184",
    word: "deductible",
    ipa: "/dɪˈdʌktəbl/",
    vietnamese: "khoản khấu trừ bảo hiểm; có thể khấu trừ thuế",
    partOfSpeech: "noun/adj",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "The commercial vehicle insurance policy carries a five-hundred-dollar deductible.",
      "Certain business travel expenses are tax-deductible under state law."
    ],
    mnemonicTip: "Tax-deductible = được khấu trừ thuế thu nhập",
    emoji: ""
  },
  {
    id: "v185",
    word: "defective",
    ipa: "/dɪˈfektɪv/",
    vietnamese: "bị lỗi, có khiếm khuyết kỹ thuật",
    partOfSpeech: "adj",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "Customers who receive defective electronics may request an immediate replacement.",
      "Quality assurance identified a defective circuit board on the assembly conveyor."
    ],
    mnemonicTip: "Defective item/product = sản phẩm lỗi",
    emoji: ""
  },
  {
    id: "v186",
    word: "delegate",
    ipa: "/ˈdelɪɡeɪt/",
    vietnamese: "ủy thác, giao phó quyền hạn; đại biểu hội nghị",
    partOfSpeech: "verb/noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "An effective manager must learn how to delegate routine tasks to subordinates.",
      "Over four hundred international delegates registered for the energy conference."
    ],
    mnemonicTip: "Delegate authority/tasks = ủy quyền, giao việc",
    emoji: ""
  },
  {
    id: "v187",
    word: "demographic",
    ipa: "/ˌdeməˈɡræfɪk/",
    vietnamese: "nhân khẩu học, nhóm đối tượng khách hàng",
    partOfSpeech: "noun/adj",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "The latest streaming service appeals primarily to the eighteen-to-twenty-five demographic.",
      "Market analysts gathered demographic data before launching the apparel brand."
    ],
    mnemonicTip: "Target demographic = nhóm khách hàng mục tiêu",
    emoji: ""
  },
  {
    id: "v188",
    word: "designate",
    ipa: "/ˈdezɪɡneɪt/",
    vietnamese: "chỉ định, bổ nhiệm, ấn định",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The board designated Ms. Cho as the interim chief financial officer.",
      "Please park only in designated visitor stalls marked with green paint."
    ],
    mnemonicTip: "Designated parking / designated area = khu vực được chỉ định",
    emoji: ""
  },
  {
    id: "v189",
    word: "deteriorate",
    ipa: "/dɪˈtɪriəreɪt/",
    vietnamese: "xuống cấp, xấu đi",
    partOfSpeech: "verb",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "Road conditions deteriorated rapidly following the overnight freezing rain.",
      "Without regular maintenance, the factory roof will continue to deteriorate."
    ],
    mnemonicTip: "Deteriorate = degrade = suy giảm chất lượng",
    emoji: ""
  },
  {
    id: "v190",
    word: "disclose",
    ipa: "/dɪsˈkloʊz/",
    vietnamese: "tiết lộ, công bố thông tin",
    partOfSpeech: "verb",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "Employees signed an agreement promising not to disclose confidential client data.",
      "The company disclosed its fourth-quarter financial figures yesterday morning."
    ],
    mnemonicTip: "Non-disclosure agreement (NDA) = thỏa thuận bảo mật",
    emoji: ""
  },
  {
    id: "v191",
    word: "dispatch",
    ipa: "/dɪˈspætʃ/",
    vietnamese: "gửi đi, điều phối xuất phát",
    partOfSpeech: "verb/noun",
    category: "Logistics & Shipping",
    targetBand: "650+",
    examples: [
      "The distribution warehouse dispatched three delivery vans at dawn.",
      "Emergency maintenance technicians were dispatched immediately to the broken pipeline."
    ],
    mnemonicTip: "Dispatch an order = chuyển gửi đơn hàng",
    emoji: ""
  },
  {
    id: "v192",
    word: "distribution",
    ipa: "/ˌdɪstrɪˈbjuːʃn/",
    vietnamese: "sự phân phối, phân phát hàng hóa",
    partOfSpeech: "noun",
    category: "Logistics & Shipping",
    targetBand: "650+",
    examples: [
      "The new logistics hub will streamline product distribution across three states.",
      "Distribution costs decreased after renegotiating agreements with local carriers."
    ],
    mnemonicTip: "Distribution center = trung tâm phân phối hàng",
    emoji: ""
  },
  {
    id: "v193",
    word: "diversify",
    ipa: "/daɪˈvɜːrsɪfaɪ/",
    vietnamese: "đa dạng hóa (danh mục, nguồn doanh thu)",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The investment group advised the firm to diversify its asset portfolio.",
      "Automakers are diversifying into electric battery manufacturing."
    ],
    mnemonicTip: "Diversify the business / portfolio = đa dạng hóa",
    emoji: ""
  },
  {
    id: "v194",
    word: "duplicate",
    ipa: "/ˈduːplɪkət/",
    vietnamese: "bản sao giống hệt; nhân bản",
    partOfSpeech: "noun/verb",
    category: "Office & Technology",
    targetBand: "650+",
    examples: [
      "Always retain a duplicate copy of the signed warranty for your records.",
      "The digital tool quickly detected and removed duplicate customer entries."
    ],
    mnemonicTip: "In duplicate = thành 2 bản sao giống nhau",
    emoji: ""
  },
  {
    id: "v195",
    word: "duration",
    ipa: "/duˈreɪʃn/",
    vietnamese: "khoảng thời gian kéo dài",
    partOfSpeech: "noun",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "The warranty remains valid for the full duration of the lease period.",
      "Audience members were asked to silence their mobile phones for the duration of the lecture."
    ],
    mnemonicTip: "For the duration of = trong suốt khoảng thời gian",
    emoji: ""
  },
  {
    id: "v196",
    word: "efficiency",
    ipa: "/ɪˈfɪʃnsi/",
    vietnamese: "hiệu suất, tính hiệu quả cao",
    partOfSpeech: "noun",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "Automating the invoice verification improved department operational efficiency.",
      "The new refrigeration compressors boast superior energy efficiency."
    ],
    mnemonicTip: "Energy efficiency = hiệu quả năng lượng",
    emoji: ""
  },
  {
    id: "v197",
    word: "eligible",
    ipa: "/ˈelɪdʒəbl/",
    vietnamese: "đủ điều kiện, đủ tư cách hưởng quyền lợi",
    partOfSpeech: "adj",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "Employees with six months of service are eligible for paid parental leave.",
      "Only full-time students are eligible to apply for the summer research fellowship."
    ],
    mnemonicTip: "Eligible for + danh từ / eligible to + động từ",
    emoji: ""
  },
  {
    id: "v198",
    word: "eliminate",
    ipa: "/ɪˈlɪmɪneɪt/",
    vietnamese: "loại trừ, xóa bỏ",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Digital scanning helped eliminate redundant paper files throughout the office.",
      "Management aims to eliminate production waste through lean manufacturing methods."
    ],
    mnemonicTip: "Eliminate waste/errors = loại bỏ lãng phí/sai sót",
    emoji: ""
  },
  {
    id: "v199",
    word: "emphasize",
    ipa: "/ˈemfəsaɪz/",
    vietnamese: "nhấn mạnh tầm quan trọng",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The safety director emphasized the necessity of wearing protective eyewear at all times.",
      "The marketing presentation emphasized the product's durable construction."
    ],
    mnemonicTip: "Emphasize the importance of = nhấn mạnh tầm quan trọng của",
    emoji: ""
  },
  {
    id: "v200",
    word: "endorse",
    ipa: "/ɪnˈdɔːrs/",
    vietnamese: "chứng thực, ủng hộ công khai; ký hậu (séc)",
    partOfSpeech: "verb",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "A renowned professional tennis athlete agreed to endorse the sports drink.",
      "The board of directors officially endorsed the proposed merger agreement."
    ],
    mnemonicTip: "Celebrity endorsement = sự quảng cáo bởi người nổi tiếng",
    emoji: ""
  }
,
{
  "id": "v201",
  "word": "enhance",
  "ipa": "/ɪnˈhæns/",
  "vietnamese": "nâng cao, cải thiện chất lượng",
  "partOfSpeech": "verb",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The software update will enhance system security and processing speed.",
    "Participating in public speaking workshops enhanced her presentation skills."
  ],
  "mnemonicTip": "Enhance efficiency / enhance reputation = nâng cao hiệu quả / danh tiếng",
  "emoji": ""
},
{
  "id": "v202",
  "word": "enrollment",
  "ipa": "/ɪnˈroʊlmənt/",
  "vietnamese": "sự ghi danh, số lượng đăng ký học/tham gia",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "Online course enrollment increased by thirty percent this semester.",
    "The deadline for health benefits enrollment is next Friday."
  ],
  "mnemonicTip": "Enroll in a course -> open enrollment (mở đăng ký)",
  "emoji": ""
},
{
  "id": "v203",
  "word": "enterprise",
  "ipa": "/ˈentərpraɪz/",
  "vietnamese": "doanh nghiệp, tổ chức kinh doanh quy mô lớn",
  "partOfSpeech": "noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The state government provides financial grants to support small tech enterprises.",
    "Commercial enterprises must comply with newly passed data privacy regulations."
  ],
  "mnemonicTip": "Enterprise software = phần mềm cho doanh nghiệp",
  "emoji": ""
},
{
  "id": "v204",
  "word": "enthusiastic",
  "ipa": "/ɪnˌθuːziˈæstɪk/",
  "vietnamese": "nhiệt tình, hăng hái",
  "partOfSpeech": "adj",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "The client gave an enthusiastic response to our marketing pitch.",
    "We are seeking enthusiastic individuals to join our international sales team."
  ],
  "mnemonicTip": "Enthusiastic about something = hào hứng với điều gì",
  "emoji": ""
},
{
  "id": "v205",
  "word": "evaluation",
  "ipa": "/ɪˌvæljuˈeɪʃn/",
  "vietnamese": "sự đánh giá, thẩm định",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "The committee conducted an objective evaluation of all submitted bids.",
    "Employee evaluations are held bi-annually to review performance targets."
  ],
  "mnemonicTip": "Job evaluation = đánh giá công việc",
  "emoji": ""
},
{
  "id": "v206",
  "word": "exceed",
  "ipa": "/ɪkˈsiːd/",
  "vietnamese": "vượt quá (kỳ vọng, ngân sách, giới hạn)",
  "partOfSpeech": "verb",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Third-quarter revenues exceeded executive board projections.",
    "Luggage weight must not exceed twenty-three kilograms per bag."
  ],
  "mnemonicTip": "Exceed expectations = vượt ngoài mong đợi",
  "emoji": ""
},
{
  "id": "v207",
  "word": "exceptional",
  "ipa": "/ɪkˈsepʃənl/",
  "vietnamese": "xuất sắc, phi thường, nổi bật",
  "partOfSpeech": "adj",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "The candidate demonstrated exceptional analytical and leadership abilities.",
    "The boutique hotel is renowned for its exceptional customer service."
  ],
  "mnemonicTip": "Exceptional service / performance = dịch vụ / thành tích xuất chúng",
  "emoji": ""
},
{
  "id": "v208",
  "word": "exclusive",
  "ipa": "/ɪkˈskluːsɪv/",
  "vietnamese": "độc quyền, riêng biệt",
  "partOfSpeech": "adj",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "Our firm obtained exclusive distribution rights for the organic coffee brand.",
    "Gold club members receive exclusive access to VIP airport lounges."
  ],
  "mnemonicTip": "Exclusive rights = quyền độc quyền",
  "emoji": ""
},
{
  "id": "v209",
  "word": "execute",
  "ipa": "/ˈeksɪkjuːt/",
  "vietnamese": "thực thi, thực hiện (kế hoạch, hợp đồng)",
  "partOfSpeech": "verb",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The operations team executed the software migration without any downtime.",
    "Both companies executed the contract terms following lengthy negotiations."
  ],
  "mnemonicTip": "Execute a plan/contract = thi hành kế hoạch / ký hợp đồng",
  "emoji": ""
},
{
  "id": "v210",
  "word": "exempt",
  "ipa": "/ɪɡˈzempt/",
  "vietnamese": "được miễn trừ (thuế, nghĩa vụ)",
  "partOfSpeech": "adj/verb",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Nonprofit educational organizations are exempt from corporate income tax.",
    "Certain salaried managerial employees are exempt from overtime regulations."
  ],
  "mnemonicTip": "Tax-exempt = được miễn thuế",
  "emoji": ""
},
{
  "id": "v211",
  "word": "exhibition",
  "ipa": "/ˌeksɪˈbɪʃn/",
  "vietnamese": "triển lãm thương mại, trưng bày",
  "partOfSpeech": "noun",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "Our sales team will host an interactive booth at the international trade exhibition.",
    "The museum's architecture exhibition attracted thousands of weekend visitors."
  ],
  "mnemonicTip": "Trade exhibition = hội chợ triển lãm thương mại",
  "emoji": ""
},
{
  "id": "v212",
  "word": "expansion",
  "ipa": "/ɪkˈspænʃn/",
  "vietnamese": "sự mở rộng quy mô kinh doanh",
  "partOfSpeech": "noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The retail chain announced a five-million-dollar expansion into Southeast Asia.",
    "Facility expansion plans were approved by the municipal planning board."
  ],
  "mnemonicTip": "Expand (động từ) -> expansion (danh từ)",
  "emoji": ""
},
{
  "id": "v213",
  "word": "expedite",
  "ipa": "/ˈekspədaɪt/",
  "vietnamese": "đẩy nhanh tiến độ, giải quyết gấp",
  "partOfSpeech": "verb",
  "category": "Logistics & Shipping",
  "targetBand": "650+",
  "examples": [
    "Customers can pay an additional courier fee to expedite international shipment.",
    "Management intervened to expedite the regulatory approval process."
  ],
  "mnemonicTip": "Expedite delivery = giao hàng hỏa tốc",
  "emoji": ""
},
{
  "id": "v214",
  "word": "expenditure",
  "ipa": "/ɪkˈspendɪtʃər/",
  "vietnamese": "khoản chi tiêu, tổng chi phí",
  "partOfSpeech": "noun",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Capital expenditures on factory machinery increased in the third quarter.",
    "The CFO urged department heads to curtail non-essential operational expenditures."
  ],
  "mnemonicTip": "Capital expenditure (CapEx) = chi phí đầu tư tài sản cố định",
  "emoji": ""
},
{
  "id": "v215",
  "word": "expertise",
  "ipa": "/ˌekspɜːrˈtiːz/",
  "vietnamese": "chuyên môn sâu, sự am hiểu sâu sắc",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "We hired an engineering consultant with specialized expertise in bridge design.",
    "Her financial expertise proved invaluable during the debt restructuring."
  ],
  "mnemonicTip": "Area of expertise = lĩnh vực chuyên môn",
  "emoji": ""
},
{
  "id": "v216",
  "word": "facilitate",
  "ipa": "/fəˈsɪlɪteɪt/",
  "vietnamese": "tạo điều kiện thuận lợi, hỗ trợ tiến trình",
  "partOfSpeech": "verb",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The new digital platform was created to facilitate seamless team communication.",
    "A skilled mediator was brought in to facilitate discussions between union leaders."
  ],
  "mnemonicTip": "Facilitate communication/trade = thúc đẩy giao thương/trao đổi",
  "emoji": ""
},
{
  "id": "v217",
  "word": "feasible",
  "ipa": "/ˈfiːzəbl/",
  "vietnamese": "khả thi, có thể thực hiện được",
  "partOfSpeech": "adj",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The consulting firm concluded that the proposed light rail project is economically feasible.",
    "We need to evaluate whether working remotely on a permanent basis is feasible."
  ],
  "mnemonicTip": "Feasibility study = nghiên cứu tính khả thi",
  "emoji": ""
},
{
  "id": "v218",
  "word": "fiscal",
  "ipa": "/ˈfɪskl/",
  "vietnamese": "thuộc về tài chính công ty, tài khóa",
  "partOfSpeech": "adj",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "The company's fiscal year ends on December thirty-first.",
    "Prudent fiscal management helped the corporation weather the economic downturn."
  ],
  "mnemonicTip": "Fiscal year (FY) = năm tài chính / năm ngân sách",
  "emoji": ""
},
{
  "id": "v219",
  "word": "fluctuate",
  "ipa": "/ˈflʌktʃueɪt/",
  "vietnamese": "dao động lên xuống bất thường",
  "partOfSpeech": "verb",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Fuel prices fluctuated wildly throughout the preceding summer months.",
    "Stock market indices fluctuated in response to interest rate announcements."
  ],
  "mnemonicTip": "Fluctuate between A and B = dao động giữa A và B",
  "emoji": ""
},
{
  "id": "v220",
  "word": "forecast",
  "ipa": "/ˈfɔːrkæst/",
  "vietnamese": "dự báo kinh tế/thời tiết",
  "partOfSpeech": "noun/verb",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Economic forecasts suggest a steady recovery in consumer spending next year.",
    "The marketing analyst forecasted a ten percent increase in retail orders."
  ],
  "mnemonicTip": "Sales forecast = dự báo doanh số bán hàng",
  "emoji": ""
},
{
  "id": "v221",
  "word": "forthcoming",
  "ipa": "/ˌfɔːrθˈkʌmɪŋ/",
  "vietnamese": "sắp xảy ra, sắp được xuất bản/công bố",
  "partOfSpeech": "adj",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "Details regarding the company retreat will be shared in a forthcoming email.",
    "Her forthcoming book examines sustainable commercial agriculture."
  ],
  "mnemonicTip": "Forthcoming publication/event = sự kiện/ấn phẩm sắp tới",
  "emoji": ""
},
{
  "id": "v222",
  "word": "fulfill",
  "ipa": "/fʊlˈfɪl/",
  "vietnamese": "hoàn thành, đáp ứng thỏa mãn (đơn hàng, yêu cầu)",
  "partOfSpeech": "verb",
  "category": "Logistics & Shipping",
  "targetBand": "650+",
  "examples": [
    "The automated warehouse can fulfill and dispatch online orders within hours.",
    "Applicants must fulfill all job criteria to be considered for an interview."
  ],
  "mnemonicTip": "Fulfill an order / fulfill requirements",
  "emoji": ""
},
{
  "id": "v223",
  "word": "fundamental",
  "ipa": "/ˌfʌndəˈmentl/",
  "vietnamese": "cơ bản, nền tảng cốt lõi",
  "partOfSpeech": "adj",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "Clear communication is fundamental to successful project execution.",
    "The seminar covers fundamental concepts of international corporate taxation."
  ],
  "mnemonicTip": "Fundamental principle = nguyên tắc cơ bản cốt lõi",
  "emoji": ""
},
{
  "id": "v224",
  "word": "guideline",
  "ipa": "/ˈɡaɪdlaɪn/",
  "vietnamese": "nguyên tắc hướng dẫn, đường lối chỉ đạo",
  "partOfSpeech": "noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "Please adhere strictly to corporate cybersecurity guidelines when working remotely.",
    "The board published revised ethical guidelines for procurement officers."
  ],
  "mnemonicTip": "Follow the guidelines = tuân theo hướng dẫn",
  "emoji": ""
},
{
  "id": "v225",
  "word": "hesitate",
  "ipa": "/ˈhezɪteɪt/",
  "vietnamese": "do dự, ngập ngừng",
  "partOfSpeech": "verb",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "Do not hesitate to contact our technical helpline if you experience any errors.",
    "She did not hesitate to recommend him for the managerial vacancy."
  ],
  "mnemonicTip": "Cụm Part 2-7: 'Please do not hesitate to contact us'",
  "emoji": ""
},
{
  "id": "v226",
  "word": "illustration",
  "ipa": "/ˌɪləˈstreɪʃn/",
  "vietnamese": "hình ảnh minh họa; ví dụ minh chứng",
  "partOfSpeech": "noun",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "The user manual contains detailed illustrations showing assembly procedures.",
    "The chart serves as a clear illustration of our year-over-year growth."
  ],
  "mnemonicTip": "By way of illustration = để làm ví dụ minh họa",
  "emoji": ""
},
{
  "id": "v227",
  "word": "implement",
  "ipa": "/ˈɪmplɪment/",
  "vietnamese": "triển khai thực hiện (kế hoạch, chính sách)",
  "partOfSpeech": "verb",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The executive board decided to implement flexible work hours starting in July.",
    "Our IT department successfully implemented the new inventory management software."
  ],
  "mnemonicTip": "Implement a policy / implement a strategy",
  "emoji": ""
},
{
  "id": "v228",
  "word": "implication",
  "ipa": "/ˌɪmplɪˈkeɪʃn/",
  "vietnamese": "hệ quả tiềm tàng, tác động gián tiếp",
  "partOfSpeech": "noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "Economists analyzed the financial implications of the new tariff regulations.",
    "The unexpected delay has serious financial implications for the contractor."
  ],
  "mnemonicTip": "Implications of something = những hệ quả đi kèm",
  "emoji": ""
},
{
  "id": "v229",
  "word": "incentive",
  "ipa": "/ɪnˈsentɪv/",
  "vietnamese": "sự khích lệ, tiền thưởng động viên",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "The corporation offers generous cash incentives to sales reps who surpass quarterly targets.",
    "Tax incentives were introduced to encourage commercial investment in renewable tech."
  ],
  "mnemonicTip": "Incentive program = chương trình khen thưởng",
  "emoji": ""
},
{
  "id": "v230",
  "word": "incorporate",
  "ipa": "/ɪnˈkɔːrpəreɪt/",
  "vietnamese": "kết hợp, sáp nhập, lồng ghép",
  "partOfSpeech": "verb",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The revised prototype incorporates valuable user suggestions from the focus group.",
    "The software developer plans to incorporate artificial intelligence into its search engine."
  ],
  "mnemonicTip": "Incorporate A into B = lồng ghép A vào B",
  "emoji": ""
},
{
  "id": "v231",
  "word": "initiative",
  "ipa": "/ɪˈnɪʃətɪv/",
  "vietnamese": "sáng kiến, kế hoạch hành động mới",
  "partOfSpeech": "noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "Management launched a green office initiative to eliminate single-use plastics.",
    "She showed tremendous initiative by resolving the customer dispute independently."
  ],
  "mnemonicTip": "Take the initiative = chủ động khởi xướng hành động",
  "emoji": ""
},
{
  "id": "v232",
  "word": "innovative",
  "ipa": "/ˈɪnəveɪtɪv/",
  "vietnamese": "mang tính đổi mới, sáng tạo đột phá",
  "partOfSpeech": "adj",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "The technology startup was recognized for its innovative water purification device.",
    "Our creative team develops innovative marketing concepts for global clients."
  ],
  "mnemonicTip": "Innovative design / solution = thiết kế / giải pháp sáng tạo",
  "emoji": ""
},
{
  "id": "v233",
  "word": "inspection",
  "ipa": "/ɪnˈspekʃn/",
  "vietnamese": "sự thanh tra, kiểm tra kỹ thuật định kỳ",
  "partOfSpeech": "noun",
  "category": "Manufacturing & Quality",
  "targetBand": "650+",
  "examples": [
    "Health officials conducted a routine sanitation inspection of the hotel kitchen.",
    "The boiler passed its annual safety inspection without any recorded citations."
  ],
  "mnemonicTip": "Undergo an inspection = trải qua cuộc thanh tra",
  "emoji": ""
},
{
  "id": "v234",
  "word": "installment",
  "ipa": "/ɪnˈstɔːlmənt/",
  "vietnamese": "khoản trả góp từng kỳ",
  "partOfSpeech": "noun",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Customers can pay for luxury furniture in twelve equal monthly installments.",
    "The initial installment of the contract fee was wired upon project kickoff."
  ],
  "mnemonicTip": "Pay in installments = trả góp theo từng kỳ",
  "emoji": ""
},
{
  "id": "v235",
  "word": "insurance",
  "ipa": "/ɪnˈʃʊrəns/",
  "vietnamese": "bảo hiểm",
  "partOfSpeech": "noun",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "The shipping company provides comprehensive cargo insurance against transit loss.",
    "Make sure your health insurance policy covers international emergency medical care."
  ],
  "mnemonicTip": "Insurance policy = hợp đồng bảo hiểm",
  "emoji": ""
},
{
  "id": "v236",
  "word": "intend",
  "ipa": "/ɪnˈtend/",
  "vietnamese": "có ý định, dự định làm việc gì",
  "partOfSpeech": "verb",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The airline intends to expand direct flight service to three new European destinations.",
    "The brochure is intended primarily for prospective international students."
  ],
  "mnemonicTip": "Intended for = được dành riêng cho đối tượng nào",
  "emoji": ""
},
{
  "id": "v237",
  "word": "interaction",
  "ipa": "/ˌɪntərˈækʃn/",
  "vietnamese": "sự tương tác, tiếp xúc trao đổi",
  "partOfSpeech": "noun",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "Positive customer interaction is key to building lasting brand loyalty.",
    "The workshops encourage active peer-to-peer interaction among attendees."
  ],
  "mnemonicTip": "Social / professional interaction = sự tương tác nghề nghiệp",
  "emoji": ""
},
{
  "id": "v238",
  "word": "interfere",
  "ipa": "/ˌɪntərˈfɪr/",
  "vietnamese": "gây cản trở, can thiệp vào làm gián đoạn",
  "partOfSpeech": "verb",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "Heavy construction noise interfered with conference presentations next door.",
    "Personal matters should not interfere with the timely fulfillment of duties."
  ],
  "mnemonicTip": "Interfere with something = cản trở điều gì",
  "emoji": ""
},
{
  "id": "v239",
  "word": "investigation",
  "ipa": "/ɪnˌvestɪˈɡeɪʃn/",
  "vietnamese": "cuộc điều tra xác minh sự việc",
  "partOfSpeech": "noun",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "Safety regulators opened a formal investigation into the warehouse accident.",
    "A preliminary investigation revealed that the disruption was caused by power failure."
  ],
  "mnemonicTip": "Conduct an investigation = tiến hành điều tra",
  "emoji": ""
},
{
  "id": "v240",
  "word": "investment",
  "ipa": "/ɪnˈvestmənt/",
  "vietnamese": "khoản đầu tư vốn",
  "partOfSpeech": "noun",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Upgrading factory robotics represents a sound long-term capital investment.",
    "The firm attracted five million dollars in foreign venture capital investment."
  ],
  "mnemonicTip": "Return on investment (ROI) = tỷ suất sinh lời trên vốn đầu tư",
  "emoji": ""
},
{
  "id": "v241",
  "word": "itemized",
  "ipa": "/ˈaɪtəmaɪzd/",
  "vietnamese": "được liệt kê chi tiết từng danh mục",
  "partOfSpeech": "adj",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Please request an itemized billing receipt showing each service charge separately.",
    "The itemized expense statement made accounting reconciliation effortless."
  ],
  "mnemonicTip": "Itemized bill/receipt = hóa đơn chi tiết từng khoản mục",
  "emoji": ""
},
{
  "id": "v242",
  "word": "lease",
  "ipa": "/liːs/",
  "vietnamese": "hợp đồng thuê dài hạn; cho thuê",
  "partOfSpeech": "noun/verb",
  "category": "Real Estate & Location",
  "targetBand": "650+",
  "examples": [
    "The commercial tenant signed a three-year office lease for the eighth floor.",
    "The company decided to lease delivery trucks rather than purchase them outright."
  ],
  "mnemonicTip": "Sign a lease / renew a lease = ký / gia hạn hợp đồng thuê",
  "emoji": ""
},
{
  "id": "v243",
  "word": "legislation",
  "ipa": "/ˌledʒɪsˈleɪʃn/",
  "vietnamese": "luật pháp, đạo luật quy định",
  "partOfSpeech": "noun",
  "category": "Contracts & Legal",
  "targetBand": "650+",
  "examples": [
    "New environmental legislation requires manufacturers to curb carbon output.",
    "Parliament passed legislation safeguarding consumer digital financial rights."
  ],
  "mnemonicTip": "Pass legislation = thông qua đạo luật",
  "emoji": ""
},
{
  "id": "v244",
  "word": "leverage",
  "ipa": "/ˈlevərɪdʒ/",
  "vietnamese": "tận dụng đòn bẩy thế mạnh; đòn bẩy tài chính",
  "partOfSpeech": "verb/noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "The brand plans to leverage its strong international presence to enter Latin America.",
    "They leveraged cutting-edge technology to reduce operational overhead."
  ],
  "mnemonicTip": "Leverage an advantage = tận dụng lợi thế cạnh tranh",
  "emoji": ""
},
{
  "id": "v245",
  "word": "liability",
  "ipa": "/ˌlaɪəˈbɪləti/",
  "vietnamese": "nghĩa vụ pháp lý, gánh nặng nợ nần",
  "partOfSpeech": "noun",
  "category": "Contracts & Legal",
  "targetBand": "650+",
  "examples": [
    "The shipping company accepted full financial liability for the lost cargo.",
    "The corporate balance sheet lists both current assets and long-term liabilities."
  ],
  "mnemonicTip": "Limited liability company (LLC) = công ty trách nhiệm hữu hạn",
  "emoji": ""
},
{
  "id": "v246",
  "word": "liquidation",
  "ipa": "/ˌlɪkwɪˈdeɪʃn/",
  "vietnamese": "sự thanh lý tài sản, bán tháo hàng tồn",
  "partOfSpeech": "noun",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "The bankrupt department store held a massive store-wide liquidation sale.",
    "Proceeds from the asset liquidation were distributed to verified creditors."
  ],
  "mnemonicTip": "Liquidation sale = đợt xả hàng thanh lý",
  "emoji": ""
},
{
  "id": "v247",
  "word": "lucrative",
  "ipa": "/ˈluːkrətɪv/",
  "vietnamese": "sinh lợi lớn, đem lại nhiều tiền",
  "partOfSpeech": "adj",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "The law firm secured a lucrative multi-year corporate advisory contract.",
    "Exporting organic farm produce proved to be an exceptionally lucrative business."
  ],
  "mnemonicTip": "Lucrative market / contract = thị trường / hợp đồng béo bở",
  "emoji": ""
},
{
  "id": "v248",
  "word": "mandatory",
  "ipa": "/ˈmændətɔːri/",
  "vietnamese": "mang tính bắt buộc theo quy định",
  "partOfSpeech": "adj",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "Attendance at the annual workplace cybersecurity briefing is strictly mandatory.",
    "The airline introduced mandatory safety training for all ground handling crew."
  ],
  "mnemonicTip": "Mandatory requirement = yêu cầu bắt buộc",
  "emoji": ""
},
{
  "id": "v249",
  "word": "merchandise",
  "ipa": "/ˈmɜːrtʃəndaɪs/",
  "vietnamese": "hàng hóa thương mại buôn bán",
  "partOfSpeech": "noun",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "Retail associates restocked shelves with incoming seasonal merchandise.",
    "Damaged merchandise should be returned to the central warehouse with an invoice."
  ],
  "mnemonicTip": "Danh từ không đếm được: goods / products",
  "emoji": ""
},
{
  "id": "v250",
  "word": "morale",
  "ipa": "/məˈræl/",
  "vietnamese": "tinh thần, nhuệ khí làm việc của tập thể",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "Flexible work arrangements and recognition bonuses boosted employee morale.",
    "Poor communication during the restructuring caused office morale to decline."
  ],
  "mnemonicTip": "Boost employee morale = nâng cao tinh thần nhân viên (chú ý trọng âm âm 2)",
  "emoji": ""
},
{
  "id": "v251",
  "word": "negotiate",
  "ipa": "/nɪˈɡoʊʃieɪt/",
  "vietnamese": "đàm phán, thương lượng hợp đồng",
  "partOfSpeech": "verb",
  "category": "Contracts & Legal",
  "targetBand": "650+",
  "examples": [
    "The procurement director negotiated a fifteen percent discount on bulk raw materials.",
    "Both parties are scheduled to negotiate the final licensing terms next Tuesday."
  ],
  "mnemonicTip": "Negotiate a contract/price = đàm phán hợp đồng/giá",
  "emoji": ""
},
{
  "id": "v252",
  "word": "niche",
  "ipa": "/niːʃ/",
  "vietnamese": "thị trường ngách, vị trí thích hợp",
  "partOfSpeech": "noun",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "The company carved out a profitable niche in ergonomic office furniture.",
    "Targeting a niche market allows smaller businesses to avoid giant competitors."
  ],
  "mnemonicTip": "Niche market = thị trường ngách",
  "emoji": ""
},
{
  "id": "v253",
  "word": "notable",
  "ipa": "/ˈnoʊtəbl/",
  "vietnamese": "đáng chú ý, nổi bật",
  "partOfSpeech": "adj",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "The quarterly financial report highlighted several notable achievements.",
    "One notable exception to the general sales decline was online subscriptions."
  ],
  "mnemonicTip": "Notable feature / notable achievement = thành tựu đáng chú ý",
  "emoji": ""
},
{
  "id": "v254",
  "word": "obligation",
  "ipa": "/ˌɑːblɪˈɡeɪʃn/",
  "vietnamese": "nghĩa vụ, bổn phận ràng buộc",
  "partOfSpeech": "noun",
  "category": "Contracts & Legal",
  "targetBand": "650+",
  "examples": [
    "Tenants have a legal obligation to pay their rent on the first of each month.",
    "The supplier failed to meet its contractual obligations, resulting in penalties."
  ],
  "mnemonicTip": "Legal / contractual obligation = nghĩa vụ pháp lý / hợp đồng",
  "emoji": ""
},
{
  "id": "v255",
  "word": "occupant",
  "ipa": "/ˈɑːkjəpənt/",
  "vietnamese": "người cư ngụ, người thuê phòng/tòa nhà",
  "partOfSpeech": "noun",
  "category": "Real Estate & Location",
  "targetBand": "650+",
  "examples": [
    "All building occupants were evacuated safely during the scheduled fire drill.",
    "The previous occupant left the office suite in immaculate condition."
  ],
  "mnemonicTip": "Building occupants = những người ở trong tòa nhà",
  "emoji": ""
},
{
  "id": "v256",
  "word": "optimize",
  "ipa": "/ˈɑːptɪmaɪz/",
  "vietnamese": "tối ưu hóa",
  "partOfSpeech": "verb",
  "category": "Office & Technology",
  "targetBand": "650+",
  "examples": [
    "The logistics software helps optimize delivery routes to reduce transit fuel costs.",
    "Web developers worked to optimize the e-commerce site for mobile devices."
  ],
  "mnemonicTip": "Optimize performance / efficiency = tối ưu hiệu năng",
  "emoji": ""
},
{
  "id": "v257",
  "word": "orientation",
  "ipa": "/ˌɔːriənˈteɪʃn/",
  "vietnamese": "buổi định hướng người mới",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "All new hires must attend the HR orientation session on Monday morning.",
    "The orientation handbook outlines company policies, benefits, and paid leave."
  ],
  "mnemonicTip": "Orientation session = buổi tập huấn định hướng",
  "emoji": ""
},
{
  "id": "v258",
  "word": "outstanding",
  "ipa": "/aʊtˈstændɪŋ/",
  "vietnamese": "xuất sắc nổi bật; chưa thanh toán (hóa đơn)",
  "partOfSpeech": "adj",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Please settle your outstanding balance before the fifteenth of the month.",
    "She received an award for her outstanding contributions to software development."
  ],
  "mnemonicTip": "Outstanding bill/balance = hóa đơn chưa thanh toán",
  "emoji": ""
},
{
  "id": "v259",
  "word": "oversee",
  "ipa": "/ˌoʊvərˈsiː/",
  "vietnamese": "giám sát, trông nom bao quát",
  "partOfSpeech": "verb",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "A senior vice president was appointed to oversee the merger transition process.",
    "The construction manager oversees safety compliance across three job sites."
  ],
  "mnemonicTip": "Oversee operations / a project = giám sát hoạt động",
  "emoji": ""
},
{
  "id": "v260",
  "word": "payroll",
  "ipa": "/ˈpeɪroʊl/",
  "vietnamese": "bảng lương công ty, tổng quỹ lương",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "Direct deposit ensures employee paychecks are credited to payroll accounts on time.",
    "The company currently has over four hundred skilled technicians on its payroll."
  ],
  "mnemonicTip": "On the payroll = trong danh sách nhận lương của công ty",
  "emoji": ""
},
{
  "id": "v261",
  "word": "penalty",
  "ipa": "/ˈpenəlti/",
  "vietnamese": "tiền phạt, hình phạt theo hợp đồng",
  "partOfSpeech": "noun",
  "category": "Contracts & Legal",
  "targetBand": "650+",
  "examples": [
    "The contract stipulates a financial penalty for every day the construction is delayed.",
    "Borrowers face a penalty for early withdrawal of long-term fixed deposits."
  ],
  "mnemonicTip": "Pay a penalty = nộp phạt",
  "emoji": ""
},
{
  "id": "v262",
  "word": "penetrate",
  "ipa": "/ˈpenətreɪt/",
  "vietnamese": "thâm nhập thị trường",
  "partOfSpeech": "verb",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "The smartphone maker succeeded in penetrating the competitive Asian market.",
    "Aggressive pricing strategies helped the new brand penetrate the market quickly."
  ],
  "mnemonicTip": "Penetrate the market = thâm nhập thị trường",
  "emoji": ""
},
{
  "id": "v263",
  "word": "pension",
  "ipa": "/ˈpenʃn/",
  "vietnamese": "lương hưu trí",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "The corporation matches employee contributions to the corporate pension fund.",
    "He retired comfortably on a generous company pension after thirty years of service."
  ],
  "mnemonicTip": "Pension plan/scheme = chương trình lương hưu",
  "emoji": ""
},
{
  "id": "v264",
  "word": "permanent",
  "ipa": "/ˈpɜːrmənənt/",
  "vietnamese": "vĩnh viễn, dài hạn cố định",
  "partOfSpeech": "adj",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "After completing a three-month probation, she was offered a permanent contract.",
    "The company relocated its permanent corporate headquarters to Chicago."
  ],
  "mnemonicTip": "Permanent position = vị trí làm việc chính thức lâu dài",
  "emoji": ""
},
{
  "id": "v265",
  "word": "persistent",
  "ipa": "/pərˈsɪstənt/",
  "vietnamese": "kiên trì, dai dẳng bền bỉ",
  "partOfSpeech": "adj",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "Thanks to persistent efforts by the sales staff, the contract was successfully renewed.",
    "IT technicians resolved persistent software errors in the accounting module."
  ],
  "mnemonicTip": "Persistent effort = nỗ lực bền bỉ không bỏ cuộc",
  "emoji": ""
},
{
  "id": "v266",
  "word": "perspective",
  "ipa": "/pərˈspektɪv/",
  "vietnamese": "góc nhìn, quan điểm thấu đáo",
  "partOfSpeech": "noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "Hiring external consultants provides a fresh perspective on corporate challenges.",
    "From an investor's perspective, the quarterly dividends were very attractive."
  ],
  "mnemonicTip": "From someone's perspective = theo quan điểm của ai",
  "emoji": ""
},
{
  "id": "v267",
  "word": "portfolio",
  "ipa": "/pɔːrtˈfoʊlioʊ/",
  "vietnamese": "danh mục đầu tư; hồ sơ năng lực dự án",
  "partOfSpeech": "noun",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Financial advisors recommend holding a well-diversified investment portfolio.",
    "The architect presented an impressive design portfolio during the client interview."
  ],
  "mnemonicTip": "Investment portfolio = danh mục đầu tư",
  "emoji": ""
},
{
  "id": "v268",
  "word": "precaution",
  "ipa": "/prɪˈkɔːʃn/",
  "vietnamese": "biện pháp phòng ngừa rủi ro",
  "partOfSpeech": "noun",
  "category": "Manufacturing & Quality",
  "targetBand": "650+",
  "examples": [
    "Laboratory personnel take strict precautions when handling volatile chemicals.",
    "As a safety precaution, backup power generators were tested before the storm."
  ],
  "mnemonicTip": "Take precautions = áp dụng các biện pháp phòng ngừa",
  "emoji": ""
},
{
  "id": "v269",
  "word": "preliminary",
  "ipa": "/prɪˈlɪmɪneri/",
  "vietnamese": "sơ bộ, bước đầu",
  "partOfSpeech": "adj",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "Preliminary audit results show a substantial increase in quarterly profit margins.",
    "The architect presented preliminary floor plans at the municipal planning meeting."
  ],
  "mnemonicTip": "Preliminary results / findings = kết quả sơ bộ",
  "emoji": ""
},
{
  "id": "v270",
  "word": "premises",
  "ipa": "/ˈpremɪsɪz/",
  "vietnamese": "khuôn viên, cơ sở địa ốc kinh doanh",
  "partOfSpeech": "noun",
  "category": "Real Estate & Location",
  "targetBand": "650+",
  "examples": [
    "Smoking is strictly prohibited everywhere on hospital premises.",
    "Security cameras monitor all entry and exit points on the corporate premises."
  ],
  "mnemonicTip": "On the premises = trong khuôn viên công ty",
  "emoji": ""
},
{
  "id": "v271",
  "word": "priority",
  "ipa": "/praɪˈɔːrəti/",
  "vietnamese": "sự ưu tiên hàng đầu",
  "partOfSpeech": "noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "Ensuring passenger safety is the highest priority for the airline company.",
    "Project managers must set clear priorities when operating under tight deadlines."
  ],
  "mnemonicTip": "Top priority = ưu tiên số một",
  "emoji": ""
},
{
  "id": "v272",
  "word": "probation",
  "ipa": "/proʊˈbeɪʃn/",
  "vietnamese": "thời gian thử việc nhân viên mới",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "New employees undergo a ninety-day probation before receiving health benefits.",
    "Her performance during the probation period exceeded all manager expectations."
  ],
  "mnemonicTip": "Probation period = thời gian thử việc",
  "emoji": ""
},
{
  "id": "v273",
  "word": "procedure",
  "ipa": "/prəˈsiːdʒər/",
  "vietnamese": "quy trình, thủ tục hành chính/kỹ thuật",
  "partOfSpeech": "noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "Follow standard operating procedures when rebooting the main server cluster.",
    "The bank updated its loan application procedure to make approvals faster."
  ],
  "mnemonicTip": "Standard operating procedure (SOP) = quy trình thao tác chuẩn",
  "emoji": ""
},
{
  "id": "v274",
  "word": "procure",
  "ipa": "/prəˈkjʊr/",
  "vietnamese": "thu mua, mua sắm vật tư trang thiết bị",
  "partOfSpeech": "verb",
  "category": "Logistics & Shipping",
  "targetBand": "650+",
  "examples": [
    "The purchasing officer managed to procure industrial steel at favorable rates.",
    "It took several weeks to procure the specialized replacement parts from Germany."
  ],
  "mnemonicTip": "Procurement department = phòng mua sắm trang thiết bị",
  "emoji": ""
},
{
  "id": "v275",
  "word": "productivity",
  "ipa": "/ˌproʊdʌkˈtɪvəti/",
  "vietnamese": "năng suất lao động, hiệu suất tạo ra sản phẩm",
  "partOfSpeech": "noun",
  "category": "Manufacturing & Quality",
  "targetBand": "650+",
  "examples": [
    "Ergonomic office seating contributed to a noticeable increase in worker productivity.",
    "The factory introduced automated assembly conveyors to boost hourly productivity."
  ],
  "mnemonicTip": "Increase productivity = nâng cao năng suất",
  "emoji": ""
},
{
  "id": "v276",
  "word": "prohibit",
  "ipa": "/prəˈhɪbɪt/",
  "vietnamese": "nghiêm cấm theo luật lệ",
  "partOfSpeech": "verb",
  "category": "Contracts & Legal",
  "targetBand": "650+",
  "examples": [
    "Company policy strictly prohibits the personal use of corporate credit cards.",
    "State regulations prohibit commercial fishing in designated marine sanctuaries."
  ],
  "mnemonicTip": "Prohibit someone from doing something = cấm ai làm việc gì",
  "emoji": ""
},
{
  "id": "v277",
  "word": "promotional",
  "ipa": "/prəˈmoʊʃənl/",
  "vietnamese": "mang tính khuyến mãi, xúc tiến quảng bá",
  "partOfSpeech": "adj",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "The marketing team distributed promotional flyers and free product samples.",
    "Special promotional pricing is available exclusively during the grand opening week."
  ],
  "mnemonicTip": "Promotional campaign / discount = chiến dịch / ưu đãi khuyến mãi",
  "emoji": ""
},
{
  "id": "v278",
  "word": "prospective",
  "ipa": "/prəˈspektɪv/",
  "vietnamese": "có tiềm năng, có triển vọng trở thành (khách hàng, ứng viên)",
  "partOfSpeech": "adj",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "Sales associates sent detailed product brochures to prospective corporate clients.",
    "The human resources team interviewed several prospective candidates on Tuesday."
  ],
  "mnemonicTip": "Prospective client / buyer = khách hàng / người mua tiềm năng",
  "emoji": ""
},
{
  "id": "v279",
  "word": "protocol",
  "ipa": "/ˈproʊtəkɑːl/",
  "vietnamese": "nghi thức ngoại giao, quy thức chuẩn an toàn",
  "partOfSpeech": "noun",
  "category": "Corporate & Management",
  "targetBand": "650+",
  "examples": [
    "Strict laboratory safety protocols prevent accidental chemical contamination.",
    "Diplomatic protocol requires welcoming foreign trade delegates at the airport."
  ],
  "mnemonicTip": "Safety protocol = quy thức an toàn",
  "emoji": ""
},
{
  "id": "v280",
  "word": "provision",
  "ipa": "/prəˈvɪʒn/",
  "vietnamese": "điều khoản quy định; sự chu cấp dự phòng",
  "partOfSpeech": "noun",
  "category": "Contracts & Legal",
  "targetBand": "650+",
  "examples": [
    "The lease contains a provision allowing the tenant to sublease unused desk space.",
    "The agreement includes provisions for annual inflation adjustments."
  ],
  "mnemonicTip": "Contract provision = điều khoản hợp đồng",
  "emoji": ""
},
{
  "id": "v281",
  "word": "punctual",
  "ipa": "/ˈpʌŋktʃuəl/",
  "vietnamese": "đúng giờ, chuẩn xác về mặt thời gian",
  "partOfSpeech": "adj",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "Being punctual for job interviews and client briefings demonstrates professional respect.",
    "The high-speed passenger train has an outstanding record of punctual arrivals."
  ],
  "mnemonicTip": "Punctual delivery = giao hàng đúng giờ",
  "emoji": ""
},
{
  "id": "v282",
  "word": "qualification",
  "ipa": "/ˌkwɑːlɪfɪˈkeɪʃn/",
  "vietnamese": "trình độ chuyên môn, văn bằng chứng chỉ",
  "partOfSpeech": "noun",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "Applicants must possess relevant academic qualifications and five years of experience.",
    "Her professional certifications and qualifications made her the standout candidate."
  ],
  "mnemonicTip": "Meet the qualifications = đáp ứng các tiêu chuẩn chuyên môn",
  "emoji": ""
},
{
  "id": "v283",
  "word": "quarterly",
  "ipa": "/ˈkwɔːrtərli/",
  "vietnamese": "hàng quý, mỗi ba tháng một lần",
  "partOfSpeech": "adj/adv",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Shareholders review the company's quarterly financial performance statements.",
    "Department heads submit budget reviews quarterly to the finance director."
  ],
  "mnemonicTip": "Quarterly report = báo cáo tài chính quý",
  "emoji": ""
},
{
  "id": "v284",
  "word": "reimburse",
  "ipa": "/ˌriːɪmˈbɜːrs/",
  "vietnamese": "hoàn trả tiền chi tiêu, bồi hoàn công tác phí",
  "partOfSpeech": "verb",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "The company will reimburse employees for business meals and hotel accommodation.",
    "Submit valid original receipts to receive full reimbursement for travel expenses."
  ],
  "mnemonicTip": "Reimburse expenses = hoàn trả chi phí công tác",
  "emoji": ""
},
{
  "id": "v285",
  "word": "reluctant",
  "ipa": "/rɪˈlʌktənt/",
  "vietnamese": "miễn cưỡng, ngần ngại",
  "partOfSpeech": "adj",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "Investors were reluctant to commit additional capital given the market uncertainty.",
    "Management was reluctant to raise prices despite higher supply chain costs."
  ],
  "mnemonicTip": "Reluctant to do something = ngần ngại làm điều gì",
  "emoji": ""
},
{
  "id": "v286",
  "word": "reputable",
  "ipa": "/ˈrepjətəbl/",
  "vietnamese": "có uy tín, danh tiếng đáng tin cậy",
  "partOfSpeech": "adj",
  "category": "Marketing & Sales",
  "targetBand": "650+",
  "examples": [
    "Always purchase industrial equipment from reputable and certified manufacturers.",
    "The financial institution has been a reputable community partner for fifty years."
  ],
  "mnemonicTip": "Reputable company / vendor = doanh nghiệp có uy tín",
  "emoji": ""
},
{
  "id": "v287",
  "word": "revenue",
  "ipa": "/ˈrevənuː/",
  "vietnamese": "doanh thu, tổng thu nhập kinh doanh",
  "partOfSpeech": "noun",
  "category": "Finance & Accounting",
  "targetBand": "650+",
  "examples": [
    "Total annual revenue surpassed twenty million dollars for the first time.",
    "Online subscription services account for forty percent of total corporate revenue."
  ],
  "mnemonicTip": "Generate revenue = tạo ra doanh thu",
  "emoji": ""
},
{
  "id": "v288",
  "word": "specialize",
  "ipa": "/ˈspeʃəlaɪz/",
  "vietnamese": "chuyên môn hóa về một lĩnh vực",
  "partOfSpeech": "verb",
  "category": "Personnel & HR",
  "targetBand": "650+",
  "examples": [
    "Our architectural studio specializes in sustainable commercial office design.",
    "He chose to specialize in corporate patent law after finishing law school."
  ],
  "mnemonicTip": "Specialize in = chuyên sâu về",
  "emoji": ""
},
{
  "id": "v289",
  "word": "substantially",
  "ipa": "/səbˈstænʃəli/",
  "vietnamese": "đáng kể, rất nhiều",
  "partOfSpeech": "adv",
  "category": "General Business",
  "targetBand": "650+",
  "examples": [
    "Operating overhead decreased substantially after adopting solar power.",
    "Customer satisfaction ratings improved substantially over the past six months."
  ],
  "mnemonicTip": "Increase / decrease substantially = tăng / giảm đáng kể",
  "emoji": ""
},
{
  "id": "v290",
  "word": "terminate",
  "ipa": "/ˈtɜːrmɪneɪt/",
  "vietnamese": "chấm dứt (hợp đồng, việc làm), kết thúc",
  "partOfSpeech": "verb",
  "category": "Contracts & Legal",
  "targetBand": "650+",
  "examples": [
    "Either party may terminate the consulting contract with thirty days' written notice.",
    "The supplier terminated the delivery agreement due to chronic non-payment."
  ],
  "mnemonicTip": "Terminate a contract / terminate employment = chấm dứt hợp đồng",
  "emoji": ""
}
];

// Write file for 650
const content650 = `import { VocabularyWord } from '../vocabulary';

export const VOCAB_650: VocabularyWord[] = ${JSON.stringify(words650, null, 2)};
`;

fs.writeFileSync(path.resolve('src/data/vocab/vocab_650.ts'), content650, 'utf-8');
console.log(`Successfully generated vocab_650.ts with ${words650.length} words.`);
