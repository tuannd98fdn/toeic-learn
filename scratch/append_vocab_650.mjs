import fs from 'fs';
import path from 'path';

const additional650 = [
  {
    id: "v201",
    word: "enhance",
    ipa: "/ɪnˈhæns/",
    vietnamese: "nâng cao, cải thiện chất lượng",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The software update will enhance system security and processing speed.",
      "Participating in public speaking workshops enhanced her presentation skills."
    ],
    mnemonicTip: "Enhance efficiency / enhance reputation = nâng cao hiệu quả / danh tiếng",
    emoji: ""
  },
  {
    id: "v202",
    word: "enrollment",
    ipa: "/ɪnˈroʊlmənt/",
    vietnamese: "sự ghi danh, số lượng đăng ký học/tham gia",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "Online course enrollment increased by thirty percent this semester.",
      "The deadline for health benefits enrollment is next Friday."
    ],
    mnemonicTip: "Enroll in a course -> open enrollment (mở đăng ký)",
    emoji: ""
  },
  {
    id: "v203",
    word: "enterprise",
    ipa: "/ˈentərpraɪz/",
    vietnamese: "doanh nghiệp, tổ chức kinh doanh quy mô lớn",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The state government provides financial grants to support small tech enterprises.",
      "Commercial enterprises must comply with newly passed data privacy regulations."
    ],
    mnemonicTip: "Enterprise software = phần mềm cho doanh nghiệp",
    emoji: ""
  },
  {
    id: "v204",
    word: "enthusiastic",
    ipa: "/ɪnˌθuːziˈæstɪk/",
    vietnamese: "nhiệt tình, hăng hái",
    partOfSpeech: "adj",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "The client gave an enthusiastic response to our marketing pitch.",
      "We are seeking enthusiastic individuals to join our international sales team."
    ],
    mnemonicTip: "Enthusiastic about something = hào hứng với điều gì",
    emoji: ""
  },
  {
    id: "v205",
    word: "evaluation",
    ipa: "/ɪˌvæljuˈeɪʃn/",
    vietnamese: "sự đánh giá, thẩm định",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "The committee conducted an objective evaluation of all submitted bids.",
      "Employee evaluations are held bi-annually to review performance targets."
    ],
    mnemonicTip: "Job evaluation = đánh giá công việc",
    emoji: ""
  },
  {
    id: "v206",
    word: "exceed",
    ipa: "/ɪkˈsiːd/",
    vietnamese: "vượt quá (kỳ vọng, ngân sách, giới hạn)",
    partOfSpeech: "verb",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Third-quarter revenues exceeded executive board projections.",
      "Luggage weight must not exceed twenty-three kilograms per bag."
    ],
    mnemonicTip: "Exceed expectations = vượt ngoài mong đợi",
    emoji: ""
  },
  {
    id: "v207",
    word: "exceptional",
    ipa: "/ɪkˈsepʃənl/",
    vietnamese: "xuất sắc, phi thường, nổi bật",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "The candidate demonstrated exceptional analytical and leadership abilities.",
      "The boutique hotel is renowned for its exceptional customer service."
    ],
    mnemonicTip: "Exceptional service / performance = dịch vụ / thành tích xuất chúng",
    emoji: ""
  },
  {
    id: "v208",
    word: "exclusive",
    ipa: "/ɪkˈskluːsɪv/",
    vietnamese: "độc quyền, riêng biệt",
    partOfSpeech: "adj",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "Our firm obtained exclusive distribution rights for the organic coffee brand.",
      "Gold club members receive exclusive access to VIP airport lounges."
    ],
    mnemonicTip: "Exclusive rights = quyền độc quyền",
    emoji: ""
  },
  {
    id: "v209",
    word: "execute",
    ipa: "/ˈeksɪkjuːt/",
    vietnamese: "thực thi, thực hiện (kế hoạch, hợp đồng)",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The operations team executed the software migration without any downtime.",
      "Both companies executed the contract terms following lengthy negotiations."
    ],
    mnemonicTip: "Execute a plan/contract = thi hành kế hoạch / ký hợp đồng",
    emoji: ""
  },
  {
    id: "v210",
    word: "exempt",
    ipa: "/ɪɡˈzempt/",
    vietnamese: "được miễn trừ (thuế, nghĩa vụ)",
    partOfSpeech: "adj/verb",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Nonprofit educational organizations are exempt from corporate income tax.",
      "Certain salaried managerial employees are exempt from overtime regulations."
    ],
    mnemonicTip: "Tax-exempt = được miễn thuế",
    emoji: ""
  },
  {
    id: "v211",
    word: "exhibition",
    ipa: "/ˌeksɪˈbɪʃn/",
    vietnamese: "triển lãm thương mại, trưng bày",
    partOfSpeech: "noun",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "Our sales team will host an interactive booth at the international trade exhibition.",
      "The museum's architecture exhibition attracted thousands of weekend visitors."
    ],
    mnemonicTip: "Trade exhibition = hội chợ triển lãm thương mại",
    emoji: ""
  },
  {
    id: "v212",
    word: "expansion",
    ipa: "/ɪkˈspænʃn/",
    vietnamese: "sự mở rộng quy mô kinh doanh",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The retail chain announced a five-million-dollar expansion into Southeast Asia.",
      "Facility expansion plans were approved by the municipal planning board."
    ],
    mnemonicTip: "Expand (động từ) -> expansion (danh từ)",
    emoji: ""
  },
  {
    id: "v213",
    word: "expedite",
    ipa: "/ˈekspədaɪt/",
    vietnamese: "đẩy nhanh tiến độ, giải quyết gấp",
    partOfSpeech: "verb",
    category: "Logistics & Shipping",
    targetBand: "650+",
    examples: [
      "Customers can pay an additional courier fee to expedite international shipment.",
      "Management intervened to expedite the regulatory approval process."
    ],
    mnemonicTip: "Expedite delivery = giao hàng hỏa tốc",
    emoji: ""
  },
  {
    id: "v214",
    word: "expenditure",
    ipa: "/ɪkˈspendɪtʃər/",
    vietnamese: "khoản chi tiêu, tổng chi phí",
    partOfSpeech: "noun",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Capital expenditures on factory machinery increased in the third quarter.",
      "The CFO urged department heads to curtail non-essential operational expenditures."
    ],
    mnemonicTip: "Capital expenditure (CapEx) = chi phí đầu tư tài sản cố định",
    emoji: ""
  },
  {
    id: "v215",
    word: "expertise",
    ipa: "/ˌekspɜːrˈtiːz/",
    vietnamese: "chuyên môn sâu, sự am hiểu sâu sắc",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "We hired an engineering consultant with specialized expertise in bridge design.",
      "Her financial expertise proved invaluable during the debt restructuring."
    ],
    mnemonicTip: "Area of expertise = lĩnh vực chuyên môn",
    emoji: ""
  },
  {
    id: "v216",
    word: "facilitate",
    ipa: "/fəˈsɪlɪteɪt/",
    vietnamese: "tạo điều kiện thuận lợi, hỗ trợ tiến trình",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The new digital platform was created to facilitate seamless team communication.",
      "A skilled mediator was brought in to facilitate discussions between union leaders."
    ],
    mnemonicTip: "Facilitate communication/trade = thúc đẩy giao thương/trao đổi",
    emoji: ""
  },
  {
    id: "v217",
    word: "feasible",
    ipa: "/ˈfiːzəbl/",
    vietnamese: "khả thi, có thể thực hiện được",
    partOfSpeech: "adj",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The consulting firm concluded that the proposed light rail project is economically feasible.",
      "We need to evaluate whether working remotely on a permanent basis is feasible."
    ],
    mnemonicTip: "Feasibility study = nghiên cứu tính khả thi",
    emoji: ""
  },
  {
    id: "v218",
    word: "fiscal",
    ipa: "/ˈfɪskl/",
    vietnamese: "thuộc về tài chính công ty, tài khóa",
    partOfSpeech: "adj",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "The company's fiscal year ends on December thirty-first.",
      "Prudent fiscal management helped the corporation weather the economic downturn."
    ],
    mnemonicTip: "Fiscal year (FY) = năm tài chính / năm ngân sách",
    emoji: ""
  },
  {
    id: "v219",
    word: "fluctuate",
    ipa: "/ˈflʌktʃueɪt/",
    vietnamese: "dao động lên xuống bất thường",
    partOfSpeech: "verb",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Fuel prices fluctuated wildly throughout the preceding summer months.",
      "Stock market indices fluctuated in response to interest rate announcements."
    ],
    mnemonicTip: "Fluctuate between A and B = dao động giữa A và B",
    emoji: ""
  },
  {
    id: "v220",
    word: "forecast",
    ipa: "/ˈfɔːrkæst/",
    vietnamese: "dự báo kinh tế/thời tiết",
    partOfSpeech: "noun/verb",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Economic forecasts suggest a steady recovery in consumer spending next year.",
      "The marketing analyst forecasted a ten percent increase in retail orders."
    ],
    mnemonicTip: "Sales forecast = dự báo doanh số bán hàng",
    emoji: ""
  },
  {
    id: "v221",
    word: "forthcoming",
    ipa: "/ˌfɔːrθˈkʌmɪŋ/",
    vietnamese: "sắp xảy ra, sắp được xuất bản/công bố",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Details regarding the company retreat will be shared in a forthcoming email.",
      "Her forthcoming book examines sustainable commercial agriculture."
    ],
    mnemonicTip: "Forthcoming publication/event = sự kiện/ấn phẩm sắp tới",
    emoji: ""
  },
  {
    id: "v222",
    word: "fulfill",
    ipa: "/fʊlˈfɪl/",
    vietnamese: "hoàn thành, đáp ứng thỏa mãn (đơn hàng, yêu cầu)",
    partOfSpeech: "verb",
    category: "Logistics & Shipping",
    targetBand: "650+",
    examples: [
      "The automated warehouse can fulfill and dispatch online orders within hours.",
      "Applicants must fulfill all job criteria to be considered for an interview."
    ],
    mnemonicTip: "Fulfill an order / fulfill requirements",
    emoji: ""
  },
  {
    id: "v223",
    word: "fundamental",
    ipa: "/ˌfʌndəˈmentl/",
    vietnamese: "cơ bản, nền tảng cốt lõi",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Clear communication is fundamental to successful project execution.",
      "The seminar covers fundamental concepts of international corporate taxation."
    ],
    mnemonicTip: "Fundamental principle = nguyên tắc cơ bản cốt lõi",
    emoji: ""
  },
  {
    id: "v224",
    word: "guideline",
    ipa: "/ˈɡaɪdlaɪn/",
    vietnamese: "nguyên tắc hướng dẫn, đường lối chỉ đạo",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Please adhere strictly to corporate cybersecurity guidelines when working remotely.",
      "The board published revised ethical guidelines for procurement officers."
    ],
    mnemonicTip: "Follow the guidelines = tuân theo hướng dẫn",
    emoji: ""
  },
  {
    id: "v225",
    word: "hesitate",
    ipa: "/ˈhezɪteɪt/",
    vietnamese: "do dự, ngập ngừng",
    partOfSpeech: "verb",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Do not hesitate to contact our technical helpline if you experience any errors.",
      "She did not hesitate to recommend him for the managerial vacancy."
    ],
    mnemonicTip: "Cụm Part 2-7: 'Please do not hesitate to contact us'",
    emoji: ""
  },
  {
    id: "v226",
    word: "illustration",
    ipa: "/ˌɪləˈstreɪʃn/",
    vietnamese: "hình ảnh minh họa; ví dụ minh chứng",
    partOfSpeech: "noun",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "The user manual contains detailed illustrations showing assembly procedures.",
      "The chart serves as a clear illustration of our year-over-year growth."
    ],
    mnemonicTip: "By way of illustration = để làm ví dụ minh họa",
    emoji: ""
  },
  {
    id: "v227",
    word: "implement",
    ipa: "/ˈɪmplɪment/",
    vietnamese: "triển khai thực hiện (kế hoạch, chính sách)",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The executive board decided to implement flexible work hours starting in July.",
      "Our IT department successfully implemented the new inventory management software."
    ],
    mnemonicTip: "Implement a policy / implement a strategy",
    emoji: ""
  },
  {
    id: "v228",
    word: "implication",
    ipa: "/ˌɪmplɪˈkeɪʃn/",
    vietnamese: "hệ quả tiềm tàng, tác động gián tiếp",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Economists analyzed the financial implications of the new tariff regulations.",
      "The unexpected delay has serious financial implications for the contractor."
    ],
    mnemonicTip: "Implications of something = những hệ quả đi kèm",
    emoji: ""
  },
  {
    id: "v229",
    word: "incentive",
    ipa: "/ɪnˈsentɪv/",
    vietnamese: "sự khích lệ, tiền thưởng động viên",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "The corporation offers generous cash incentives to sales reps who surpass quarterly targets.",
      "Tax incentives were introduced to encourage commercial investment in renewable tech."
    ],
    mnemonicTip: "Incentive program = chương trình khen thưởng",
    emoji: ""
  },
  {
    id: "v230",
    word: "incorporate",
    ipa: "/ɪnˈkɔːrpəreɪt/",
    vietnamese: "kết hợp, sáp nhập, lồng ghép",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The revised prototype incorporates valuable user suggestions from the focus group.",
      "The software developer plans to incorporate artificial intelligence into its search engine."
    ],
    mnemonicTip: "Incorporate A into B = lồng ghép A vào B",
    emoji: ""
  },
  {
    id: "v231",
    word: "initiative",
    ipa: "/ɪˈnɪʃətɪv/",
    vietnamese: "sáng kiến, kế hoạch hành động mới",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Management launched a green office initiative to eliminate single-use plastics.",
      "She showed tremendous initiative by resolving the customer dispute independently."
    ],
    mnemonicTip: "Take the initiative = chủ động khởi xướng hành động",
    emoji: ""
  },
  {
    id: "v232",
    word: "innovative",
    ipa: "/ˈɪnəveɪtɪv/",
    vietnamese: "mang tính đổi mới, sáng tạo đột phá",
    partOfSpeech: "adj",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "The technology startup was recognized for its innovative water purification device.",
      "Our creative team develops innovative marketing concepts for global clients."
    ],
    mnemonicTip: "Innovative design / solution = thiết kế / giải pháp sáng tạo",
    emoji: ""
  },
  {
    id: "v233",
    word: "inspection",
    ipa: "/ɪnˈspekʃn/",
    vietnamese: "sự thanh tra, kiểm tra kỹ thuật định kỳ",
    partOfSpeech: "noun",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "Health officials conducted a routine sanitation inspection of the hotel kitchen.",
      "The boiler passed its annual safety inspection without any recorded citations."
    ],
    mnemonicTip: "Undergo an inspection = trải qua cuộc thanh tra",
    emoji: ""
  },
  {
    id: "v234",
    word: "installment",
    ipa: "/ɪnˈstɔːlmənt/",
    vietnamese: "khoản trả góp từng kỳ",
    partOfSpeech: "noun",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Customers can pay for luxury furniture in twelve equal monthly installments.",
      "The initial installment of the contract fee was wired upon project kickoff."
    ],
    mnemonicTip: "Pay in installments = trả góp theo từng kỳ",
    emoji: ""
  },
  {
    id: "v235",
    word: "insurance",
    ipa: "/ɪnˈʃʊrəns/",
    vietnamese: "bảo hiểm",
    partOfSpeech: "noun",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "The shipping company provides comprehensive cargo insurance against transit loss.",
      "Make sure your health insurance policy covers international emergency medical care."
    ],
    mnemonicTip: "Insurance policy = hợp đồng bảo hiểm",
    emoji: ""
  },
  {
    id: "v236",
    word: "intend",
    ipa: "/ɪnˈtend/",
    vietnamese: "có ý định, dự định làm việc gì",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The airline intends to expand direct flight service to three new European destinations.",
      "The brochure is intended primarily for prospective international students."
    ],
    mnemonicTip: "Intended for = được dành riêng cho đối tượng nào",
    emoji: ""
  },
  {
    id: "v237",
    word: "interaction",
    ipa: "/ˌɪntərˈækʃn/",
    vietnamese: "sự tương tác, tiếp xúc trao đổi",
    partOfSpeech: "noun",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Positive customer interaction is key to building lasting brand loyalty.",
      "The workshops encourage active peer-to-peer interaction among attendees."
    ],
    mnemonicTip: "Social / professional interaction = sự tương tác nghề nghiệp",
    emoji: ""
  },
  {
    id: "v238",
    word: "interfere",
    ipa: "/ˌɪntərˈfɪr/",
    vietnamese: "gây cản trở, can thiệp vào làm gián đoạn",
    partOfSpeech: "verb",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Heavy construction noise interfered with conference presentations next door.",
      "Personal matters should not interfere with the timely fulfillment of duties."
    ],
    mnemonicTip: "Interfere with something = cản trở điều gì",
    emoji: ""
  },
  {
    id: "v239",
    word: "investigation",
    ipa: "/ɪnˌvestɪˈɡeɪʃn/",
    vietnamese: "cuộc điều tra xác minh sự việc",
    partOfSpeech: "noun",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Safety regulators opened a formal investigation into the warehouse accident.",
      "A preliminary investigation revealed that the disruption was caused by power failure."
    ],
    mnemonicTip: "Conduct an investigation = tiến hành điều tra",
    emoji: ""
  },
  {
    id: "v240",
    word: "investment",
    ipa: "/ɪnˈvestmənt/",
    vietnamese: "khoản đầu tư vốn",
    partOfSpeech: "noun",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Upgrading factory robotics represents a sound long-term capital investment.",
      "The firm attracted five million dollars in foreign venture capital investment."
    ],
    mnemonicTip: "Return on investment (ROI) = tỷ suất sinh lời trên vốn đầu tư",
    emoji: ""
  },
  {
    id: "v241",
    word: "itemized",
    ipa: "/ˈaɪtəmaɪzd/",
    vietnamese: "được liệt kê chi tiết từng danh mục",
    partOfSpeech: "adj",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Please request an itemized billing receipt showing each service charge separately.",
      "The itemized expense statement made accounting reconciliation effortless."
    ],
    mnemonicTip: "Itemized bill/receipt = hóa đơn chi tiết từng khoản mục",
    emoji: ""
  },
  {
    id: "v242",
    word: "lease",
    ipa: "/liːs/",
    vietnamese: "hợp đồng thuê dài hạn; cho thuê",
    partOfSpeech: "noun/verb",
    category: "Real Estate & Location",
    targetBand: "650+",
    examples: [
      "The commercial tenant signed a three-year office lease for the eighth floor.",
      "The company decided to lease delivery trucks rather than purchase them outright."
    ],
    mnemonicTip: "Sign a lease / renew a lease = ký / gia hạn hợp đồng thuê",
    emoji: ""
  },
  {
    id: "v243",
    word: "legislation",
    ipa: "/ˌledʒɪsˈleɪʃn/",
    vietnamese: "luật pháp, đạo luật quy định",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "New environmental legislation requires manufacturers to curb carbon output.",
      "Parliament passed legislation safeguarding consumer digital financial rights."
    ],
    mnemonicTip: "Pass legislation = thông qua đạo luật",
    emoji: ""
  },
  {
    id: "v244",
    word: "leverage",
    ipa: "/ˈlevərɪdʒ/",
    vietnamese: "tận dụng đòn bẩy thế mạnh; đòn bẩy tài chính",
    partOfSpeech: "verb/noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "The brand plans to leverage its strong international presence to enter Latin America.",
      "They leveraged cutting-edge technology to reduce operational overhead."
    ],
    mnemonicTip: "Leverage an advantage = tận dụng lợi thế cạnh tranh",
    emoji: ""
  },
  {
    id: "v245",
    word: "liability",
    ipa: "/ˌlaɪəˈbɪləti/",
    vietnamese: "nghĩa vụ pháp lý, gánh nặng nợ nần",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "The shipping company accepted full financial liability for the lost cargo.",
      "The corporate balance sheet lists both current assets and long-term liabilities."
    ],
    mnemonicTip: "Limited liability company (LLC) = công ty trách nhiệm hữu hạn",
    emoji: ""
  },
  {
    id: "v246",
    word: "liquidation",
    ipa: "/ˌlɪkwɪˈdeɪʃn/",
    vietnamese: "sự thanh lý tài sản, bán tháo hàng tồn",
    partOfSpeech: "noun",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "The bankrupt department store held a massive store-wide liquidation sale.",
      "Proceeds from the asset liquidation were distributed to verified creditors."
    ],
    mnemonicTip: "Liquidation sale = đợt xả hàng thanh lý",
    emoji: ""
  },
  {
    id: "v247",
    word: "lucrative",
    ipa: "/ˈluːkrətɪv/",
    vietnamese: "sinh lợi lớn, đem lại nhiều tiền",
    partOfSpeech: "adj",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "The law firm secured a lucrative multi-year corporate advisory contract.",
      "Exporting organic farm produce proved to be an exceptionally lucrative business."
    ],
    mnemonicTip: "Lucrative market / contract = thị trường / hợp đồng béo bở",
    emoji: ""
  },
  {
    id: "v248",
    word: "mandatory",
    ipa: "/ˈmændətɔːri/",
    vietnamese: "mang tính bắt buộc theo quy định",
    partOfSpeech: "adj",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Attendance at the annual workplace cybersecurity briefing is strictly mandatory.",
      "The airline introduced mandatory safety training for all ground handling crew."
    ],
    mnemonicTip: "Mandatory requirement = yêu cầu bắt buộc",
    emoji: ""
  },
  {
    id: "v249",
    word: "merchandise",
    ipa: "/ˈmɜːrtʃəndaɪs/",
    vietnamese: "hàng hóa thương mại buôn bán",
    partOfSpeech: "noun",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "Retail associates restocked shelves with incoming seasonal merchandise.",
      "Damaged merchandise should be returned to the central warehouse with an invoice."
    ],
    mnemonicTip: "Danh từ không đếm được: goods / products",
    emoji: ""
  },
  {
    id: "v250",
    word: "morale",
    ipa: "/məˈræl/",
    vietnamese: "tinh thần, nhuệ khí làm việc của tập thể",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "Flexible work arrangements and recognition bonuses boosted employee morale.",
      "Poor communication during the restructuring caused office morale to decline."
    ],
    mnemonicTip: "Boost employee morale = nâng cao tinh thần nhân viên (chú ý trọng âm âm 2)",
    emoji: ""
  },
  {
    id: "v251",
    word: "negotiate",
    ipa: "/nɪˈɡoʊʃieɪt/",
    vietnamese: "đàm phán, thương lượng hợp đồng",
    partOfSpeech: "verb",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "The procurement director negotiated a fifteen percent discount on bulk raw materials.",
      "Both parties are scheduled to negotiate the final licensing terms next Tuesday."
    ],
    mnemonicTip: "Negotiate a contract/price = đàm phán hợp đồng/giá",
    emoji: ""
  },
  {
    id: "v252",
    word: "niche",
    ipa: "/niːʃ/",
    vietnamese: "thị trường ngách, vị trí thích hợp",
    partOfSpeech: "noun",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "The company carved out a profitable niche in ergonomic office furniture.",
      "Targeting a niche market allows smaller businesses to avoid giant competitors."
    ],
    mnemonicTip: "Niche market = thị trường ngách",
    emoji: ""
  },
  {
    id: "v253",
    word: "notable",
    ipa: "/ˈnoʊtəbl/",
    vietnamese: "đáng chú ý, nổi bật",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "The quarterly financial report highlighted several notable achievements.",
      "One notable exception to the general sales decline was online subscriptions."
    ],
    mnemonicTip: "Notable feature / notable achievement = thành tựu đáng chú ý",
    emoji: ""
  },
  {
    id: "v254",
    word: "obligation",
    ipa: "/ˌɑːblɪˈɡeɪʃn/",
    vietnamese: "nghĩa vụ, bổn phận ràng buộc",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "Tenants have a legal obligation to pay their rent on the first of each month.",
      "The supplier failed to meet its contractual obligations, resulting in penalties."
    ],
    mnemonicTip: "Legal / contractual obligation = nghĩa vụ pháp lý / hợp đồng",
    emoji: ""
  },
  {
    id: "v255",
    word: "occupant",
    ipa: "/ˈɑːkjəpənt/",
    vietnamese: "người cư ngụ, người thuê phòng/tòa nhà",
    partOfSpeech: "noun",
    category: "Real Estate & Location",
    targetBand: "650+",
    examples: [
      "All building occupants were evacuated safely during the scheduled fire drill.",
      "The previous occupant left the office suite in immaculate condition."
    ],
    mnemonicTip: "Building occupants = những người ở trong tòa nhà",
    emoji: ""
  },
  {
    id: "v256",
    word: "optimize",
    ipa: "/ˈɑːptɪmaɪz/",
    vietnamese: "tối ưu hóa",
    partOfSpeech: "verb",
    category: "Office & Technology",
    targetBand: "650+",
    examples: [
      "The logistics software helps optimize delivery routes to reduce transit fuel costs.",
      "Web developers worked to optimize the e-commerce site for mobile devices."
    ],
    mnemonicTip: "Optimize performance / efficiency = tối ưu hiệu năng",
    emoji: ""
  },
  {
    id: "v257",
    word: "orientation",
    ipa: "/ˌɔːriənˈteɪʃn/",
    vietnamese: "buổi định hướng người mới",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "All new hires must attend the HR orientation session on Monday morning.",
      "The orientation handbook outlines company policies, benefits, and paid leave."
    ],
    mnemonicTip: "Orientation session = buổi tập huấn định hướng",
    emoji: ""
  },
  {
    id: "v258",
    word: "outstanding",
    ipa: "/aʊtˈstændɪŋ/",
    vietnamese: "xuất sắc nổi bật; chưa thanh toán (hóa đơn)",
    partOfSpeech: "adj",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Please settle your outstanding balance before the fifteenth of the month.",
      "She received an award for her outstanding contributions to software development."
    ],
    mnemonicTip: "Outstanding bill/balance = hóa đơn chưa thanh toán",
    emoji: ""
  },
  {
    id: "v259",
    word: "oversee",
    ipa: "/ˌoʊvərˈsiː/",
    vietnamese: "giám sát, trông nom bao quát",
    partOfSpeech: "verb",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "A senior vice president was appointed to oversee the merger transition process.",
      "The construction manager oversees safety compliance across three job sites."
    ],
    mnemonicTip: "Oversee operations / a project = giám sát hoạt động",
    emoji: ""
  },
  {
    id: "v260",
    word: "payroll",
    ipa: "/ˈpeɪroʊl/",
    vietnamese: "bảng lương công ty, tổng quỹ lương",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "Direct deposit ensures employee paychecks are credited to payroll accounts on time.",
      "The company currently has over four hundred skilled technicians on its payroll."
    ],
    mnemonicTip: "On the payroll = trong danh sách nhận lương của công ty",
    emoji: ""
  },
  {
    id: "v261",
    word: "penalty",
    ipa: "/ˈpenəlti/",
    vietnamese: "tiền phạt, hình phạt theo hợp đồng",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "The contract stipulates a financial penalty for every day the construction is delayed.",
      "Borrowers face a penalty for early withdrawal of long-term fixed deposits."
    ],
    mnemonicTip: "Pay a penalty = nộp phạt",
    emoji: ""
  },
  {
    id: "v262",
    word: "penetrate",
    ipa: "/ˈpenətreɪt/",
    vietnamese: "thâm nhập thị trường",
    partOfSpeech: "verb",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "The smartphone maker succeeded in penetrating the competitive Asian market.",
      "Aggressive pricing strategies helped the new brand penetrate the market quickly."
    ],
    mnemonicTip: "Penetrate the market = thâm nhập thị trường",
    emoji: ""
  },
  {
    id: "v263",
    word: "pension",
    ipa: "/ˈpenʃn/",
    vietnamese: "lương hưu trí",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "The corporation matches employee contributions to the corporate pension fund.",
      "He retired comfortably on a generous company pension after thirty years of service."
    ],
    mnemonicTip: "Pension plan/scheme = chương trình lương hưu",
    emoji: ""
  },
  {
    id: "v264",
    word: "permanent",
    ipa: "/ˈpɜːrmənənt/",
    vietnamese: "vĩnh viễn, dài hạn cố định",
    partOfSpeech: "adj",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "After completing a three-month probation, she was offered a permanent contract.",
      "The company relocated its permanent corporate headquarters to Chicago."
    ],
    mnemonicTip: "Permanent position = vị trí làm việc chính thức lâu dài",
    emoji: ""
  },
  {
    id: "v265",
    word: "persistent",
    ipa: "/pərˈsɪstənt/",
    vietnamese: "kiên trì, dai dẳng bền bỉ",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Thanks to persistent efforts by the sales staff, the contract was successfully renewed.",
      "IT technicians resolved persistent software errors in the accounting module."
    ],
    mnemonicTip: "Persistent effort = nỗ lực bền bỉ không bỏ cuộc",
    emoji: ""
  },
  {
    id: "v266",
    word: "perspective",
    ipa: "/pərˈspektɪv/",
    vietnamese: "góc nhìn, quan điểm thấu đáo",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Hiring external consultants provides a fresh perspective on corporate challenges.",
      "From an investor's perspective, the quarterly dividends were very attractive."
    ],
    mnemonicTip: "From someone's perspective = theo quan điểm của ai",
    emoji: ""
  },
  {
    id: "v267",
    word: "portfolio",
    ipa: "/pɔːrtˈfoʊlioʊ/",
    vietnamese: "danh mục đầu tư; hồ sơ năng lực dự án",
    partOfSpeech: "noun",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Financial advisors recommend holding a well-diversified investment portfolio.",
      "The architect presented an impressive design portfolio during the client interview."
    ],
    mnemonicTip: "Investment portfolio = danh mục đầu tư",
    emoji: ""
  },
  {
    id: "v268",
    word: "precaution",
    ipa: "/prɪˈkɔːʃn/",
    vietnamese: "biện pháp phòng ngừa rủi ro",
    partOfSpeech: "noun",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "Laboratory personnel take strict precautions when handling volatile chemicals.",
      "As a safety precaution, backup power generators were tested before the storm."
    ],
    mnemonicTip: "Take precautions = áp dụng các biện pháp phòng ngừa",
    emoji: ""
  },
  {
    id: "v269",
    word: "preliminary",
    ipa: "/prɪˈlɪmɪneri/",
    vietnamese: "sơ bộ, bước đầu",
    partOfSpeech: "adj",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Preliminary audit results show a substantial increase in quarterly profit margins.",
      "The architect presented preliminary floor plans at the municipal planning meeting."
    ],
    mnemonicTip: "Preliminary results / findings = kết quả sơ bộ",
    emoji: ""
  },
  {
    id: "v270",
    word: "premises",
    ipa: "/ˈpremɪsɪz/",
    vietnamese: "khuôn viên, cơ sở địa ốc kinh doanh",
    partOfSpeech: "noun",
    category: "Real Estate & Location",
    targetBand: "650+",
    examples: [
      "Smoking is strictly prohibited everywhere on hospital premises.",
      "Security cameras monitor all entry and exit points on the corporate premises."
    ],
    mnemonicTip: "On the premises = trong khuôn viên công ty",
    emoji: ""
  },
  {
    id: "v271",
    word: "priority",
    ipa: "/praɪˈɔːrəti/",
    vietnamese: "sự ưu tiên hàng đầu",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Ensuring passenger safety is the highest priority for the airline company.",
      "Project managers must set clear priorities when operating under tight deadlines."
    ],
    mnemonicTip: "Top priority = ưu tiên số một",
    emoji: ""
  },
  {
    id: "v272",
    word: "probation",
    ipa: "/proʊˈbeɪʃn/",
    vietnamese: "thời gian thử việc nhân viên mới",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "New employees undergo a ninety-day probation before receiving health benefits.",
      "Her performance during the probation period exceeded all manager expectations."
    ],
    mnemonicTip: "Probation period = thời gian thử việc",
    emoji: ""
  },
  {
    id: "v273",
    word: "procedure",
    ipa: "/prəˈsiːdʒər/",
    vietnamese: "quy trình, thủ tục hành chính/kỹ thuật",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Follow standard operating procedures when rebooting the main server cluster.",
      "The bank updated its loan application procedure to make approvals faster."
    ],
    mnemonicTip: "Standard operating procedure (SOP) = quy trình thao tác chuẩn",
    emoji: ""
  },
  {
    id: "v274",
    word: "procure",
    ipa: "/prəˈkjʊr/",
    vietnamese: "thu mua, mua sắm vật tư trang thiết bị",
    partOfSpeech: "verb",
    category: "Logistics & Shipping",
    targetBand: "650+",
    examples: [
      "The purchasing officer managed to procure industrial steel at favorable rates.",
      "It took several weeks to procure the specialized replacement parts from Germany."
    ],
    mnemonicTip: "Procurement department = phòng mua sắm trang thiết bị",
    emoji: ""
  },
  {
    id: "v275",
    word: "productivity",
    ipa: "/ˌproʊdʌkˈtɪvəti/",
    vietnamese: "năng suất lao động, hiệu suất tạo ra sản phẩm",
    partOfSpeech: "noun",
    category: "Manufacturing & Quality",
    targetBand: "650+",
    examples: [
      "Ergonomic office seating contributed to a noticeable increase in worker productivity.",
      "The factory introduced automated assembly conveyors to boost hourly productivity."
    ],
    mnemonicTip: "Increase productivity = nâng cao năng suất",
    emoji: ""
  },
  {
    id: "v276",
    word: "prohibit",
    ipa: "/prəˈhɪbɪt/",
    vietnamese: "nghiêm cấm theo luật lệ",
    partOfSpeech: "verb",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "Company policy strictly prohibits the personal use of corporate credit cards.",
      "State regulations prohibit commercial fishing in designated marine sanctuaries."
    ],
    mnemonicTip: "Prohibit someone from doing something = cấm ai làm việc gì",
    emoji: ""
  },
  {
    id: "v277",
    word: "promotional",
    ipa: "/prəˈmoʊʃənl/",
    vietnamese: "mang tính khuyến mãi, xúc tiến quảng bá",
    partOfSpeech: "adj",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "The marketing team distributed promotional flyers and free product samples.",
      "Special promotional pricing is available exclusively during the grand opening week."
    ],
    mnemonicTip: "Promotional campaign / discount = chiến dịch / ưu đãi khuyến mãi",
    emoji: ""
  },
  {
    id: "v278",
    word: "prospective",
    ipa: "/prəˈspektɪv/",
    vietnamese: "có tiềm năng, có triển vọng trở thành (khách hàng, ứng viên)",
    partOfSpeech: "adj",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "Sales associates sent detailed product brochures to prospective corporate clients.",
      "The human resources team interviewed several prospective candidates on Tuesday."
    ],
    mnemonicTip: "Prospective client / buyer = khách hàng / người mua tiềm năng",
    emoji: ""
  },
  {
    id: "v279",
    word: "protocol",
    ipa: "/ˈproʊtəkɑːl/",
    vietnamese: "nghi thức ngoại giao, quy thức chuẩn an toàn",
    partOfSpeech: "noun",
    category: "Corporate & Management",
    targetBand: "650+",
    examples: [
      "Strict laboratory safety protocols prevent accidental chemical contamination.",
      "Diplomatic protocol requires welcoming foreign trade delegates at the airport."
    ],
    mnemonicTip: "Safety protocol = quy thức an toàn",
    emoji: ""
  },
  {
    id: "v280",
    word: "provision",
    ipa: "/prəˈvɪʒn/",
    vietnamese: "điều khoản quy định; sự chu cấp dự phòng",
    partOfSpeech: "noun",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "The lease contains a provision allowing the tenant to sublease unused desk space.",
      "The agreement includes provisions for annual inflation adjustments."
    ],
    mnemonicTip: "Contract provision = điều khoản hợp đồng",
    emoji: ""
  },
  {
    id: "v281",
    word: "punctual",
    ipa: "/ˈpʌŋktʃuəl/",
    vietnamese: "đúng giờ, chuẩn xác về mặt thời gian",
    partOfSpeech: "adj",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "Being punctual for job interviews and client briefings demonstrates professional respect.",
      "The high-speed passenger train has an outstanding record of punctual arrivals."
    ],
    mnemonicTip: "Punctual delivery = giao hàng đúng giờ",
    emoji: ""
  },
  {
    id: "v282",
    word: "qualification",
    ipa: "/ˌkwɑːlɪfɪˈkeɪʃn/",
    vietnamese: "trình độ chuyên môn, văn bằng chứng chỉ",
    partOfSpeech: "noun",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "Applicants must possess relevant academic qualifications and five years of experience.",
      "Her professional certifications and qualifications made her the standout candidate."
    ],
    mnemonicTip: "Meet the qualifications = đáp ứng các tiêu chuẩn chuyên môn",
    emoji: ""
  },
  {
    id: "v283",
    word: "quarterly",
    ipa: "/ˈkwɔːrtərli/",
    vietnamese: "hàng quý, mỗi ba tháng một lần",
    partOfSpeech: "adj/adv",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Shareholders review the company's quarterly financial performance statements.",
      "Department heads submit budget reviews quarterly to the finance director."
    ],
    mnemonicTip: "Quarterly report = báo cáo tài chính quý",
    emoji: ""
  },
  {
    id: "v284",
    word: "reimburse",
    ipa: "/ˌriːɪmˈbɜːrs/",
    vietnamese: "hoàn trả tiền chi tiêu, bồi hoàn công tác phí",
    partOfSpeech: "verb",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "The company will reimburse employees for business meals and hotel accommodation.",
      "Submit valid original receipts to receive full reimbursement for travel expenses."
    ],
    mnemonicTip: "Reimburse expenses = hoàn trả chi phí công tác",
    emoji: ""
  },
  {
    id: "v285",
    word: "reluctant",
    ipa: "/rɪˈlʌktənt/",
    vietnamese: "miễn cưỡng, ngần ngại",
    partOfSpeech: "adj",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Investors were reluctant to commit additional capital given the market uncertainty.",
      "Management was reluctant to raise prices despite higher supply chain costs."
    ],
    mnemonicTip: "Reluctant to do something = ngần ngại làm điều gì",
    emoji: ""
  },
  {
    id: "v286",
    word: "reputable",
    ipa: "/ˈrepjətəbl/",
    vietnamese: "có uy tín, danh tiếng đáng tin cậy",
    partOfSpeech: "adj",
    category: "Marketing & Sales",
    targetBand: "650+",
    examples: [
      "Always purchase industrial equipment from reputable and certified manufacturers.",
      "The financial institution has been a reputable community partner for fifty years."
    ],
    mnemonicTip: "Reputable company / vendor = doanh nghiệp có uy tín",
    emoji: ""
  },
  {
    id: "v287",
    word: "revenue",
    ipa: "/ˈrevənuː/",
    vietnamese: "doanh thu, tổng thu nhập kinh doanh",
    partOfSpeech: "noun",
    category: "Finance & Accounting",
    targetBand: "650+",
    examples: [
      "Total annual revenue surpassed twenty million dollars for the first time.",
      "Online subscription services account for forty percent of total corporate revenue."
    ],
    mnemonicTip: "Generate revenue = tạo ra doanh thu",
    emoji: ""
  },
  {
    id: "v288",
    word: "specialize",
    ipa: "/ˈspeʃəlaɪz/",
    vietnamese: "chuyên môn hóa về một lĩnh vực",
    partOfSpeech: "verb",
    category: "Personnel & HR",
    targetBand: "650+",
    examples: [
      "Our architectural studio specializes in sustainable commercial office design.",
      "He chose to specialize in corporate patent law after finishing law school."
    ],
    mnemonicTip: "Specialize in = chuyên sâu về",
    emoji: ""
  },
  {
    id: "v289",
    word: "substantially",
    ipa: "/səbˈstænʃəli/",
    vietnamese: "đáng kể, rất nhiều",
    partOfSpeech: "adv",
    category: "General Business",
    targetBand: "650+",
    examples: [
      "Operating overhead decreased substantially after adopting solar power.",
      "Customer satisfaction ratings improved substantially over the past six months."
    ],
    mnemonicTip: "Increase / decrease substantially = tăng / giảm đáng kể",
    emoji: ""
  },
  {
    id: "v290",
    word: "terminate",
    ipa: "/ˈtɜːrmɪneɪt/",
    vietnamese: "chấm dứt (hợp đồng, việc làm), kết thúc",
    partOfSpeech: "verb",
    category: "Contracts & Legal",
    targetBand: "650+",
    examples: [
      "Either party may terminate the consulting contract with thirty days' written notice.",
      "The supplier terminated the delivery agreement due to chronic non-payment."
    ],
    mnemonicTip: "Terminate a contract / terminate employment = chấm dứt hợp đồng",
    emoji: ""
  }
];

// Append to build_vocab_650.mjs
const buildPath = path.resolve('scratch/build_vocab_650.mjs');
let content = fs.readFileSync(buildPath, 'utf-8');

// replace closing of words650 array
content = content.replace('];\n\n// Write file for 650', `,
${additional650.map(w => JSON.stringify(w, null, 2)).join(',\n')}
];\n\n// Write file for 650`);

fs.writeFileSync(buildPath, content, 'utf-8');
console.log(`Added ${additional650.length} more words to build_vocab_650.mjs`);
