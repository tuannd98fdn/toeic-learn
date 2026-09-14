import { BusinessScenario } from '@/schema/masterclass';

export const BUSINESS_SCENARIOS: BusinessScenario[] = [
  {
    id: 'bs_semiconductor_logistics',
    title: 'Báo Cáo Tình Huống: Nghẽn Chuỗi Cung Ứng Bán Dẫn & Phí Lưu Bãi Cảng Biển',
    industry: 'Chuỗi Cung Ứng & Logistics Quốc Tế (Supply Chain & Global Trade)',
    readTimeMinutes: 6,
    executiveSummary:
      'Hãng vận tải Apex Maritime thông báo về tình trạng ùn tắc kéo dài tại các cảng Bờ Tây, dẫn đến việc kích hoạt điều khoản bất khả kháng và chuyển hướng các lô hàng linh kiện điện tử sang tuyến đường dự phòng để tránh phát sinh phụ phí lưu bãi.',
    content: `MEMORANDUM

TO: Regional Logistics Coordinators
FROM: Marcus Vance, Vice President of Supply Chain Operations
DATE: October 14, 2026
SUBJECT: Contingency Protocols for Trans-Pacific Semiconductor Shipments

Due to unprecedented cargo congestion at West Coast deepwater terminals, several of our primary maritime carriers have issued formal notifications regarding extended vessel turnaround cycles. Terminal operators have instituted stringent demurrage fees for containers remaining on the wharf beyond the five-day complimentary grace period. 

To mitigate crippling fiscal penalties and prevent manufacturing interruptions at our assembly plants, management has authorized an emergency rerouting initiative. Effective immediately, high-priority consignments of microprocessors and circuit boards will be diverted through regional air freight hubs in Seattle and Vancouver. 

Although air transportation incurs substantially higher freight expenditures, our financial simulations demonstrate that this expedient measure will safeguard client delivery deadlines and avert severe breach-of-contract liabilities. All coordinators are mandated to verify customs clearance documentation prior to cargo departure to preclude administrative bottlenecks at entry checkpoints.`,
    vocabHighlights: [
      {
        id: 'vh_demurrage',
        word: 'demurrage fees',
        ipa: '/dɪˈmɜːrɪdʒ fiːz/',
        vietnamese: 'phí phạt lưu container tại bãi cảng (do quá hạn nhận hàng)',
        collocationTip: 'incur demurrage fees (bị phạt phí lưu bãi); waive demurrage (miễn phí phạt)',
        exampleInContext: 'Terminal operators have instituted stringent demurrage fees for containers remaining on the wharf.'
      },
      {
        id: 'vh_contingency',
        word: 'contingency protocol',
        ipa: '/kənˈtɪndʒənsi ˈproʊtəkɔːl/',
        vietnamese: 'quy trình xử lý tình huống khẩn cấp / phương án dự phòng',
        collocationTip: 'implement a contingency plan; devise emergency protocols',
        exampleInContext: 'SUBJECT: Contingency Protocols for Trans-Pacific Semiconductor Shipments'
      },
      {
        id: 'vh_consignments',
        word: 'consignments',
        ipa: '/kənˈsaɪnmənts/',
        vietnamese: 'lô hàng gửi ủy thác, kiện hàng vận chuyển',
        collocationTip: 'dispatch consignments; inspect inbound consignments',
        exampleInContext: 'high-priority consignments of microprocessors and circuit boards will be diverted'
      },
      {
        id: 'vh_expedient',
        word: 'expedient measure',
        ipa: '/ɪkˈspiːdiənt ˈmɛʒər/',
        vietnamese: 'biện pháp xử lý tình thế cấp bách, giải pháp đối phó nhanh',
        collocationTip: 'an expedient solution; adopt expedient procedures',
        exampleInContext: 'this expedient measure will safeguard client delivery deadlines'
      },
      {
        id: 'vh_breach_of_contract',
        word: 'breach-of-contract',
        ipa: '/briːtʃ əv ˈkɑːntrækt/',
        vietnamese: 'vi phạm hợp đồng, không thực hiện đúng cam kết thỏa thuận',
        collocationTip: 'sue for breach of contract; avoid contractual liabilities',
        exampleInContext: 'avert severe breach-of-contract liabilities'
      }
    ],
    paraphraseMatrix: [
      {
        tier: 1,
        tierLabel: 'Tầng 1: Thay thế bằng từ đồng nghĩa (Synonym Replacement)',
        passageText: 'substantially higher freight expenditures',
        etsOptionText: 'considerably greater shipping costs',
        trapDistractor: 'subsidized transportation budget (Bẫy từ gốc sub- nhưng nghĩa sai lệch)',
        pedagogicalNote: 'ETS thay "substantially" -> "considerably", "freight expenditures" -> "shipping costs". Thí sinh tìm từ "expenditures" trong bài đọc sẽ bị mất dấu nếu không nắm vững từ đồng nghĩa.'
      },
      {
        tier: 2,
        tierLabel: 'Tầng 2: Khái quát hóa sang chi tiết cụ thể (Category to Concrete Item)',
        passageText: 'consignments of microprocessors and circuit boards',
        etsOptionText: 'shipments of electronic components',
        trapDistractor: 'raw industrial minerals',
        pedagogicalNote: 'Bài đọc nêu tên cụ thể các linh kiện (microprocessors, circuit boards), câu hỏi ETS sẽ quy về danh từ phạm trù rộng hơn (electronic components).'
      },
      {
        tier: 3,
        tierLabel: 'Tầng 3: Biến đổi logic nguyên nhân -> kết quả (Cause-to-Effect Inversion)',
        passageText: 'containers remaining on the wharf beyond the five-day complimentary grace period',
        etsOptionText: 'cargo not retrieved within the designated time frame',
        trapDistractor: 'containers damaged during loading',
        pedagogicalNote: 'ETS biến đổi câu chủ động chỉ điều kiện ("ở quá 5 ngày miễn phí") thành câu bị động chỉ hệ quả ("hàng không được lấy trong khung thời gian quy định").'
      },
      {
        tier: 4,
        tierLabel: 'Tầng 4: Diễn đạt phủ định của trái nghĩa (Affirmation via Negation)',
        passageText: 'safeguard client delivery deadlines',
        etsOptionText: 'ensure orders do not arrive late',
        trapDistractor: 'cancel upcoming customer reservations',
        pedagogicalNote: 'Khẳng định "bảo vệ đúng thời hạn" được paraphrase thành dạng phủ định "đảm bảo đơn hàng không bị trễ hẹn". Đây là cách diễn đạt đặc trưng trong câu 190-200 Part 7.'
      }
    ]
  },
  {
    id: 'bs_corporate_merger_audit',
    title: 'Báo Cáo Tình Huống: Thẩm Định Tài Chính & Giám Sát Chống Độc Quyền Trong Thương Vụ M&A',
    industry: 'Tài Chính Doanh Nghiệp & Pháp Lý Sáp Nhập (Corporate Finance & M&A)',
    readTimeMinutes: 7,
    executiveSummary:
      'Hội đồng quản trị tập đoàn Sterling BioTech công bố nghị quyết mua lại đối thủ cạnh tranh NexaPharma sau khi vượt qua vòng rà soát chống độc quyền nghiêm ngặt và tái cơ cấu bảng cân đối kế toán.',
    content: `EXECUTIVE BRIEFING

TO: Board of Governors, Sterling BioTech Group
FROM: Elena Rostova, Chief Financial Officer & Lead Deal Architect
DATE: November 03, 2026
SUBJECT: Regulatory Clearance and Balance Sheet Consolidation for NexaPharma Acquisition

We are pleased to inform the Board that the federal antitrust regulatory agency has formally concluded its preliminary inquiry regarding our proposed acquisition of NexaPharma, issuing an unconditional clearance statement. Consequently, our legal advisory consortium has removed the final closing contingency.

The valuation assessment completed by independent forensic auditors affirms that NexaPharma’s intellectual property portfolio, which encompasses fourteen proprietary oncology patents, justifies the agreed cash-and-stock buyout package of $4.2 billion. To optimize post-transaction liquidity, our treasury department has secured a syndicated credit facility with prime institutional lenders at favorable interest margins.

Moreover, to allay shareholder concerns regarding potential dilution of equity, the executive committee recommends an aggressive stock repurchase program following the integration phase. A mandatory extraordinary shareholder assembly has been convened for December 12 to formally ratify the merger deed.`,
    vocabHighlights: [
      {
        id: 'vh_antitrust',
        word: 'antitrust regulatory agency',
        ipa: '/ˌæntiˈtrʌst ˈrɛɡjələtɔːri ˈeɪdʒənsi/',
        vietnamese: 'cơ quan quản lý chống độc quyền thương mại',
        collocationTip: 'face antitrust scrutiny; comply with antitrust regulations',
        exampleInContext: 'the federal antitrust regulatory agency has formally concluded its preliminary inquiry'
      },
      {
        id: 'vh_unconditional',
        word: 'unconditional clearance',
        ipa: '/ˌʌnkənˈdɪʃənl ˈklɪrəns/',
        vietnamese: 'sự phê duyệt / cấp phép không kèm điều kiện ràng buộc',
        collocationTip: 'grant regulatory clearance; obtain government clearance',
        exampleInContext: 'issuing an unconditional clearance statement'
      },
      {
        id: 'vh_forensic',
        word: 'forensic auditors',
        ipa: '/fəˈrɛnsɪk ˈɔːdɪtərz/',
        vietnamese: 'kiểm toán viên pháp lý / kiểm toán điều tra chuyên sâu',
        collocationTip: 'conduct forensic audit; forensic accounting examination',
        exampleInContext: 'The valuation assessment completed by independent forensic auditors affirms...'
      },
      {
        id: 'vh_syndicated',
        word: 'syndicated credit facility',
        ipa: '/ˈsɪndɪkeɪtɪd ˈkrɛdɪt fəˈsɪləti/',
        vietnamese: 'khoản vay hợp vốn ngân hàng (nhiều ngân hàng cùng tài trợ vốn)',
        collocationTip: 'secure a syndicated loan; arrange a credit facility',
        exampleInContext: 'our treasury department has secured a syndicated credit facility'
      },
      {
        id: 'vh_ratify',
        word: 'ratify the merger deed',
        ipa: '/ˈrætɪfaɪ ðə ˈmɜːrdʒər diːd/',
        vietnamese: 'thông qua / phê chuẩn chính thức hợp đồng sáp nhập',
        collocationTip: 'ratify an agreement; pending formal ratification',
        exampleInContext: 'convened for December 12 to formally ratify the merger deed'
      }
    ],
    paraphraseMatrix: [
      {
        tier: 1,
        tierLabel: 'Tầng 1: Thay thế bằng từ đồng nghĩa (Synonym Replacement)',
        passageText: 'unconditional clearance statement',
        etsOptionText: 'approval without any restrictions',
        trapDistractor: 'conditional settlement offer',
        pedagogicalNote: 'ETS biến "unconditional clearance" -> "approval without any restrictions". Thí sinh cần nhận diện "clearance" trong ngữ cảnh cơ quan công quyền nghĩa là "phê duyệt (approval)".'
      },
      {
        tier: 2,
        tierLabel: 'Tầng 2: Khái quát hóa sang chi tiết cụ thể (Category to Concrete Item)',
        passageText: 'fourteen proprietary oncology patents',
        etsOptionText: 'exclusive medical technology rights',
        trapDistractor: 'scientific research laboratories',
        pedagogicalNote: 'Các bằng sáng chế thuốc điều trị ung thư (oncology patents) được ETS khái quát hóa thành quyền sở hữu công nghệ y khoa (medical technology rights).'
      },
      {
        tier: 3,
        tierLabel: 'Tầng 3: Biến đổi logic nguyên nhân -> kết quả (Cause-to-Effect Inversion)',
        passageText: 'our legal advisory consortium has removed the final closing contingency',
        etsOptionText: 'the transaction can proceed to completion',
        trapDistractor: 'the deal has been postponed indefinitely',
        pedagogicalNote: 'Việc dỡ bỏ điều kiện đình chỉ pháp lý cuối cùng (contingency removed) đồng nghĩa với việc giao dịch có thể tiến hành hoàn tất (proceed to completion).'
      },
      {
        tier: 4,
        tierLabel: 'Tầng 4: Diễn đạt phủ định của trái nghĩa (Affirmation via Negation)',
        passageText: 'allay shareholder concerns regarding potential dilution of equity',
        etsOptionText: 'prevent investor ownership shares from losing value',
        trapDistractor: 'distribute immediate cash bonuses to executives',
        pedagogicalNote: '"Giải tỏa nỗi lo pha loãng cổ phần" được diễn đạt lại thành "ngăn chặn tỷ lệ sở hữu của nhà đầu tư bị giảm giá trị".'
      }
    ]
  }
];
