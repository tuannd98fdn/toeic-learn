export const part7MultiSets = [
  // Set 11: Q176-180 (Double Passage: Service Review + Executive Response Email)
  {
    id: "ets22_t3_p7_s11",
    type: "Double Passage",
    passages: [
      {
        id: "ets22_t3_p7_s11_p1",
        type: "Webpage",
        title: "Client Feedback Form",
        content: "<p><b>Customer Service Review: MetroLink Cloud Storage</b><br/><b>Submitted by:</b> Angela Hughes, IT Director, Summit Financial<br/><b>Date:</b> October 14 | <b>Overall Rating:</b> 3 out of 5 stars<br/><br/>Summit Financial migrated approximately twelve terabytes of historical financial records to MetroLink's Cloud Enterprise Tier last month. The migration process itself was relatively seamless, and our daily data access speeds have been consistently high.<br/><br/>However, we experienced significant friction regarding monthly billing invoices. Our initial sales agreement included a 15% promotional volume discount for our first year of service. Yet, both our September and October invoices were billed at the standard rate of $1,200 per month without applying the deduction. When I phoned customer support on October 8, the representative informed me that the billing ticket would be reviewed within 24 hours, but I have not received any follow-up correspondence. I expect our billing records to be reconciled promptly.</p>"
      },
      {
        id: "ets22_t3_p7_s11_p2",
        type: "Email",
        title: "Executive Resolution",
        sender: "d.foster@metrolinkcloud.com",
        recipient: "ahughes@summitfinancial.com",
        date: "October 16",
        content: "<p><b>To:</b> Angela Hughes &lt;ahughes@summitfinancial.com&gt;<br/><b>From:</b> Daniel Foster, Vice President of Client Accounts<br/><b>Date:</b> October 16<br/><b>Subject:</b> Resolution of Billing Adjustment — Account #MF-8842</p><p>Dear Ms. Hughes,</p><p>Thank you for bringing your billing concern to our leadership team's attention. I reviewed your account history and discovered that while your promotional volume discount was correctly approved during sales onboarding, our automated accounting billing system failed to apply the code to your recurring billing profile.</p><p>I have manually corrected this error. Your account has been credited $360 to cover the overcharged amounts from September and October ($180 per month). Furthermore, your November statement will reflect your discounted rate of $1,020 per month for the remainder of your annual contract.</p><p>I also apologize for the lack of communication following your support call on October 8. Our support management has instituted a mandatory ticket escalation policy to ensure that enterprise clients receive status updates within four business hours. To express our gratitude for your patience, we have enabled three months of complimentary advanced data encryption backup valued at $150 per month.</p><p>Sincerely,<br/>Daniel Foster<br/>MetroLink Cloud Services</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t3_p7_q176",
        number: 176,
        text: "What positive aspect of MetroLink's service did Ms. Hughes mention?",
        options: {
          A: "Consistently fast data access speeds",
          B: "Extremely affordable hardware repair costs",
          C: "Free 24-hour telephone customer assistance",
          D: "Convenient downtown data center locations"
        },
        correctAnswer: "A",
        explanation: "<p><b>Dịch nghĩa:</b> Khía cạnh tích cực nào của dịch vụ MetroLink được cô Hughes đề cập?<br/><b>Bằng chứng:</b> Trong bài đánh giá, cô Hughes nhận xét: <i>\"our daily data access speeds have been consistently high\"</i> (tốc độ truy cập dữ liệu hàng ngày luôn ở mức cao). Chọn <b>(A) Consistently fast data access speeds</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q177",
        number: 177,
        text: "What was the main reason for Ms. Hughes's complaint?",
        options: {
          A: "Data loss during file migration",
          B: "Failure to apply an agreed promotional discount to invoices",
          C: "An unscheduled server outage during market trading hours",
          D: "Difficulty installing software on employee laptops"
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Lý do chính khiến cô Hughes phàn nàn là gì?<br/><b>Bằng chứng:</b> Cô Hughes nêu rõ: <i>\"both our September and October invoices were billed at the standard rate... without applying the deduction\"</i> (cả hóa đơn tháng 9 và tháng 10 đều tính theo giá tiêu chuẩn mà không áp dụng giảm giá). Chọn <b>(B)</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q178",
        number: 178,
        text: "In the email, what explanation does Mr. Foster give for the billing mistake?",
        options: {
          A: "The client provided an invalid corporate credit card.",
          B: "The automated billing system failed to apply the discount code.",
          C: "The promotional period expired earlier than scheduled.",
          D: "An accounting employee entered incorrect bank account information."
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Trong email, ông Foster đưa ra lời giải thích nào cho sự cố hóa đơn?<br/><b>Bằng chứng:</b> Ông Foster viết: <i>\"our automated accounting billing system failed to apply the code to your recurring billing profile\"</i>. Chọn <b>(B)</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q179",
        number: 179,
        text: "What is the discounted monthly rate for Summit Financial's cloud service?",
        options: {
          A: "$150",
          B: "$360",
          C: "$1,020",
          D: "$1,200"
        },
        correctAnswer: "C",
        explanation: "<p><b>Dịch nghĩa:</b> Mức giá hàng tháng sau chiết khấu của Summit Financial là bao nhiêu?<br/><b>Bằng chứng:</b> Đoạn 3 email nêu rõ: <i>\"Furthermore, your November statement will reflect your discounted rate of $1,020 per month...\"</i>. Chọn <b>(C) $1,020</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q180",
        number: 180,
        text: "What additional benefit does Mr. Foster provide to compensate Ms. Hughes?",
        options: {
          A: "Three months of free advanced data encryption backup",
          B: "A complimentary hardware server unit",
          C: "Free passes to an executive technology conference",
          D: "A lifetime discount on data storage expansion"
        },
        correctAnswer: "A",
        explanation: "<p><b>Dịch nghĩa:</b> Quyền lợi bổ sung nào được ông Foster cung cấp để đền bù cho cô Hughes?<br/><b>Bằng chứng:</b> Cuối email: <i>\"we have enabled three months of complimentary advanced data encryption backup valued at $150 per month\"</i>. Chọn <b>(A)</b>.</p>",
        questionType: "Inference & Suggestion",
        subCategory: "Inference & Suggestion"
      }
    ]
  },

  // Set 12: Q181-185 (Double Passage: Proposal / Estimate + Procurement Confirmation Email)
  {
    id: "ets22_t3_p7_s12",
    type: "Double Passage",
    passages: [
      {
        id: "ets22_t3_p7_s12_p1",
        type: "Proposal",
        title: "Cost Quotation",
        content: "<p><b>PINNACLE PRINTING SOLUTIONS — COMMERCIAL QUOTATION</b><br/><b>Prepared For:</b> Oakridge Healthcare System<br/><b>Date:</b> September 5 | <b>Quotation Ref:</b> PPS-4412<br/><br/><b>Itemized Specifications:</b><br/>• <b>Item 1:</b> 5,000 Patient Welcome Folders (Heavy glossy cardstock, embossed silver foil logo) — $2,500<br/>• <b>Item 2:</b> 10,000 Tri-Fold Health Awareness Brochures (Full-color double-sided print, recycled satin paper) — $1,800<br/>• <b>Item 3:</b> 2,500 Medical Staff Appointment Planners (Wire-bound, custom leatherette cover) — $3,750<br/>• <b>Delivery Service:</b> Standard freight delivery (7 business days) — Free | Expedited courier delivery (3 business days) — $250<br/><br/><i>Terms & Conditions: A 10% volume discount applies to orders with a merchandise subtotal exceeding $7,000 before delivery fees. Quotation is valid for 30 calendar days from the date of issue.</i></p>"
      },
      {
        id: "ets22_t3_p7_s12_p2",
        type: "Email",
        title: "Purchase Authorization",
        sender: "t.nakamura@oakridgehealth.org",
        recipient: "sales@pinnacleprint.com",
        date: "September 12",
        content: "<p><b>To:</b> Sales Department &lt;sales@pinnacleprint.com&gt;<br/><b>From:</b> Taro Nakamura, Director of Communications<br/><b>Date:</b> September 12<br/><b>Subject:</b> Purchase Confirmation for Quotation #PPS-4412</p><p>Dear Pinnacle Sales Team,</p><p>We have approved Quotation #PPS-4412 and would like to proceed with the production of all three items listed in your proposal: the patient welcome folders, health brochures, and appointment planners.</p><p>Because our annual community wellness fair opens on Monday, September 24, we cannot risk delivery delays. Therefore, please apply the expedited 3-day courier delivery option to our purchase order. In addition, based on your stated terms, our merchandise subtotal of $8,050 qualifies for the 10% volume discount.</p><p>Enclosed is our official purchase order form signed by our Chief Financial Officer. Please send us digital proofs of the brochure layout by tomorrow afternoon so our editorial team can give final approval before you begin the press run.</p><p>Sincerely,<br/>Taro Nakamura<br/>Oakridge Healthcare System</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t3_p7_q181",
        number: 181,
        text: "What item in the quotation has an embossed silver foil logo?",
        options: {
          A: "Patient Welcome Folders",
          B: "Health Awareness Brochures",
          C: "Staff Appointment Planners",
          D: "Courier Packaging Envelopes"
        },
        correctAnswer: "A",
        explanation: "<p><b>Dịch nghĩa:</b> Mặt hàng nào trong bảng báo giá có logo dập nổi lá bạc?<br/><b>Bằng chứng:</b> Mục 1 báo giá: <i>\"Item 1: 5,000 Patient Welcome Folders (Heavy glossy cardstock, embossed silver foil logo)\"</i>. Chọn <b>(A) Patient Welcome Folders</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q182",
        number: 182,
        text: "Why does Mr. Nakamura choose the expedited delivery option?",
        options: {
          A: "The standard shipping route is blocked by construction.",
          B: "Materials are needed for an upcoming community wellness fair.",
          C: "The expedited shipping fee was waived by the vendor.",
          D: "Pinnacle Printing offered a discount on courier deliveries."
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Tại sao ông Nakamura chọn dịch vụ giao hàng hỏa tốc?<br/><b>Bằng chứng:</b> Trong email, ông Nakamura giải thích: <i>\"Because our annual community wellness fair opens on Monday, September 24, we cannot risk delivery delays\"</i>. Chọn <b>(B)</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q183",
        number: 183,
        text: "What is the delivery fee Oakridge Healthcare will pay?",
        options: {
          A: "Free",
          B: "$100",
          C: "$250",
          D: "$805"
        },
        correctAnswer: "C",
        explanation: "<p><b>Dịch nghĩa:</b> Phí vận chuyển mà Oakridge Healthcare sẽ trả là bao nhiêu?<br/><b>Bằng chứng:</b> Báo giá ghi: <i>\"Expedited courier delivery (3 business days) — $250\"</i> và ông Nakamura đã chọn gói này trong email. Chọn <b>(C) $250</b>.</p>",
        questionType: "Inference & Suggestion",
        subCategory: "Inference & Suggestion"
      },
      {
        id: "ets22_t3_p7_q184",
        number: 184,
        text: "What discount percentage will be applied to the merchandise subtotal?",
        options: {
          A: "5 percent",
          B: "10 percent",
          C: "15 percent",
          D: "20 percent"
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Tỷ lệ chiết khấu nào sẽ được áp dụng cho tổng phụ tiền hàng?<br/><b>Bằng chứng:</b> Cả hai văn bản đều nêu điều kiện đơn hàng trên $7,000 được giảm 10% (subtotal là $8,050). Chọn <b>(B) 10 percent</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q185",
        number: 185,
        text: "What does Mr. Nakamura ask the sales team to send tomorrow afternoon?",
        options: {
          A: "Physical paper material samples",
          B: "Digital layout proofs of the brochure",
          C: "A revised corporate billing invoice",
          D: "Tracking numbers for the freight containers"
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Ông Nakamura yêu cầu đội bán hàng gửi thứ gì vào chiều mai?<br/><b>Bằng chứng:</b> Cuối email: <i>\"Please send us digital proofs of the brochure layout by tomorrow afternoon...\"</i>. Chọn <b>(B) Digital layout proofs of the brochure</b>.</p>",
        questionType: "Next Action",
        subCategory: "Next Action"
      }
    ]
  },

  // Set 13: Q186-190 (Triple Passage: Memo + Real Estate Email + Inspection Report)
  {
    id: "ets22_t3_p7_s13",
    type: "Triple Passage",
    passages: [
      {
        id: "ets22_t3_p7_s13_p1",
        type: "Memo",
        title: "Relocation Announcement",
        content: "<p><b>INTERNAL MEMO: FACILITY EXPANSION SEARCH</b><br/><b>To:</b> Executive Leadership Committee<br/><b>From:</b> Beatrice Holloway, Chief Operations Officer<br/><b>Date:</b> May 2 | <b>Subject:</b> Downtown Office Relocation Criteria<br/><br/>Due to the hiring of thirty software engineers over the past two quarters, our current office at Parkview Center has reached maximum occupancy. The facilities committee has outlined criteria for our new corporate headquarters:<br/><br/>1. Total usable floor area between 25,000 and 30,000 square feet.<br/>2. Location within four blocks of an express subway station.<br/>3. Minimum of 60 dedicated parking spaces for staff.<br/>4. Building must hold LEED Gold or Platinum green energy certification.<br/><br/>We have retained Commercial Property Associates to identify prospective leasehold candidates.</p>"
      },
      {
        id: "ets22_t3_p7_s13_p2",
        type: "Email",
        title: "Agent Proposal",
        sender: "g.sullivan@cpa-realty.com",
        recipient: "bholloway@vanguardsoft.com",
        date: "May 10",
        content: "<p><b>To:</b> Beatrice Holloway &lt;bholloway@vanguardsoft.com&gt;<br/><b>From:</b> Gregory Sullivan, Senior Broker, CPA Realty<br/><b>Date:</b> May 10<br/><b>Subject:</b> Prospective Properties for Vanguard Software</p><p>Dear Ms. Holloway,</p><p>Based on your stated relocation criteria, we have evaluated commercial properties across the Financial District. We identified two strong contenders: the Meridian Commerce Tower and the Trinity Exchange Building.</p><p>While the Meridian Tower offers 32,000 square feet, it only has 40 parking stalls. In contrast, the Trinity Exchange Building (floors 6 through 8) offers exactly 28,500 square feet, 75 underground parking spots, and sits just two blocks from City Hall Metro Station. It also received LEED Platinum certification last year.</p><p>The landlord has authorized an on-site building inspection this Thursday at 10:00 A.M. I have commissioned Apex Engineering to inspect the building's structural and climate control systems beforehand.</p><p>Best regards,<br/>Gregory Sullivan</p>"
      },
      {
        id: "ets22_t3_p7_s13_p3",
        type: "Report",
        title: "Inspection Summary",
        content: "<p><b>APEX ENGINEERING: PRE-LEASE INSPECTION AUDIT</b><br/><b>Property:</b> Trinity Exchange Building (Floors 6–8)<br/><b>Inspected By:</b> Ronald Chang, PE | <b>Date:</b> May 12<br/><br/><b>Executive Findings:</b><br/>• <b>Structural & Electrical:</b> The electrical wiring, backup generators, and fiber-optic telecommunication cables are in pristine condition, supporting high-density server racks.<br/>• <b>Climate Controls (HVAC):</b> The primary air-handling units servicing floor 7 were modernized in 2024, providing excellent filtration.<br/>• <b>Minor Recommendation:</b> Several emergency exit signs on the 8th floor require battery replacement, which the building manager agreed to rectify within 48 hours.<br/>• <b>Conclusion:</b> The property exceeds standard commercial standards and is fully ready for tenant occupancy.</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t3_p7_q186",
        number: 186,
        text: "Why is Vanguard Software planning to relocate?",
        options: {
          A: "Its existing office lease has been cancelled.",
          B: "Its current facility has reached maximum occupancy.",
          C: "It wants to downsize operational staff.",
          D: "It needs to reduce monthly rental expenditures."
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Tại sao Vanguard Software lên kế hoạch chuyển văn phòng?<br/><b>Bằng chứng:</b> Trong bản ghi nhớ, bà Holloway giải thích: <i>\"Due to the hiring of thirty software engineers... our current office at Parkview Center has reached maximum occupancy\"</i>. Chọn <b>(B)</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q187",
        number: 187,
        text: "Why does Mr. Sullivan consider Meridian Commerce Tower less suitable?",
        options: {
          A: "It lacks modern high-speed elevators.",
          B: "It does not provide enough parking spaces.",
          C: "It is located too far from the financial district.",
          D: "It lacks LEED green building certification."
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Tại sao ông Sullivan đánh giá Meridian Commerce Tower ít phù hợp hơn?<br/><b>Bằng chứng:</b> Tiêu chí yêu cầu tối thiểu 60 chỗ đỗ xe. Ông Sullivan chỉ ra: <i>\"While the Meridian Tower offers 32,000 square feet, it only has 40 parking stalls\"</i> (chỉ có 40 chỗ đỗ). Chọn <b>(B)</b>.</p>",
        questionType: "Inference & Suggestion",
        subCategory: "Inference & Suggestion"
      },
      {
        id: "ets22_t3_p7_q188",
        number: 188,
        text: "How much usable floor space does the Trinity Exchange Building provide?",
        options: {
          A: "25,000 square feet",
          B: "28,500 square feet",
          C: "30,000 square feet",
          D: "32,000 square feet"
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Tòa nhà Trinity Exchange cung cấp diện tích sàn sử dụng là bao nhiêu?<br/><b>Bằng chứng:</b> Email của ông Sullivan nêu rõ: <i>\"the Trinity Exchange Building (floors 6 through 8) offers exactly 28,500 square feet...\"</i>. Chọn <b>(B) 28,500 square feet</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q189",
        number: 189,
        text: "What minor repair is recommended in the inspection report?",
        options: {
          A: "Replacing batteries in emergency exit signs",
          B: "Repairing leaking water pipes on the 6th floor",
          C: "Upgrading backup power diesel generators",
          D: "Repainting the underground parking lanes"
        },
        correctAnswer: "A",
        explanation: "<p><b>Dịch nghĩa:</b> Sửa chữa nhỏ nào được khuyến nghị trong báo cáo kiểm định?<br/><b>Bằng chứng:</b> Mục Minor Recommendation trong báo cáo ghi: <i>\"Several emergency exit signs on the 8th floor require battery replacement...\"</i>. Chọn <b>(A)</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q190",
        number: 190,
        text: "What is indicated about the Trinity Exchange Building in all three documents?",
        options: {
          A: "It was constructed within the past two years.",
          B: "It satisfies Vanguard Software's relocation requirements.",
          C: "Its monthly rent is cheaper than Parkview Center.",
          D: "It is currently undergoing extensive exterior remodeling."
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về tòa nhà Trinity Exchange trong cả ba tài liệu?<br/><b>Bằng chứng:</b> Đối chiếu tiêu chí trong Memo (25k-30k sq ft, gần metro, >60 chỗ đỗ, LEED Gold/Platinum), email của môi giới (28.5k sq ft, 2 block từ metro, 75 chỗ đỗ, LEED Platinum), và báo cáo kiểm định kỹ thuật (hoàn hảo sẵn sàng sử dụng). Tòa nhà đáp ứng trọn vẹn mọi tiêu chí của công ty. Chọn <b>(B)</b>.</p>",
        questionType: "Inference & Suggestion",
        subCategory: "Inference & Suggestion"
      }
    ]
  },

  // Set 14: Q191-195 (Triple Passage: Program Webpage + Speaker Cancellation Memo + Participant Confirmation)
  {
    id: "ets22_t3_p7_s14",
    type: "Triple Passage",
    passages: [
      {
        id: "ets22_t3_p7_s14_p1",
        type: "Webpage",
        title: "Conference Schedule",
        content: "<p><b>PACIFIC HEALTHCARE INFORMATICS CONGRESS</b><br/><b>Date:</b> Friday, October 26 | <b>Venue:</b> San Diego Maritime Convention Center<br/><br/><b>Morning Program:</b><br/>• <b>9:00 A.M. – 10:15 A.M.:</b> Keynote: \"Artificial Intelligence in Medical Diagnostic Imaging\" by Dr. Alan Chen (Grand Ballroom)<br/>• <b>10:30 A.M. – 11:45 A.M.:</b> Breakout Session A: \"Cloud Security for Electronic Health Records\" by Ms. Fiona Gallagher (Room 102)<br/>• <b>10:30 A.M. – 11:45 A.M.:</b> Breakout Session B: \"Telemedicine Implementation in Rural Hospitals\" by Dr. Marcus Brody (Room 105)<br/>• <b>12:00 P.M. – 1:30 P.M.:</b> Luncheon & Healthcare Technology Exhibition (Pavilion 3)</p>"
      },
      {
        id: "ets22_t3_p7_s14_p2",
        type: "Memo",
        title: "Schedule Revision",
        content: "<p><b>CONFERENCE ORGANIZING COMMITTEE — URGENT NOTICE</b><br/><b>To:</b> All Registered Delegates<br/><b>Date:</b> October 22 | <b>Subject:</b> Program Revision for Morning Sessions<br/><br/>Please be advised that Dr. Alan Chen has unfortunately been called away for emergency medical duties and cannot deliver the opening keynote speech on Friday, October 26.<br/><br/>In light of this change, Ms. Fiona Gallagher has graciously agreed to move her presentation on \"Cloud Security for Electronic Health Records\" into the 9:00 A.M. keynote slot in the Grand Ballroom. Consequently, Dr. Brody's session in Room 105 will now be the sole breakout presentation at 10:30 A.M., allowing all delegates to attend without scheduling conflicts. Attendees who originally signed up for Dr. Chen's session are invited to download his research paper from the conference app.</p>"
      },
      {
        id: "ets22_t3_p7_s14_p3",
        type: "Email",
        title: "Attendee Schedule",
        sender: "k.weber@valleyhospital.org",
        recipient: "s.morales@valleyhospital.org",
        date: "October 24",
        content: "<p><b>To:</b> Sofia Morales &lt;s.morales@valleyhospital.org&gt;<br/><b>From:</b> Kevin Weber, Chief Information Officer<br/><b>Date:</b> October 24<br/><b>Subject:</b> Friday's Healthcare Informatics Congress in San Diego</p><p>Hi Sofia,</p><p>I reviewed the revised schedule for this Friday's congress. Since Ms. Gallagher's cloud security presentation was moved to the opening keynote, this works out conveniently for our schedule! We can both attend her speech at 9:00 A.M. in the Grand Ballroom, which directly impacts our hospital's current cloud migration initiative.</p><p>After that, while you attend Dr. Brody's rural healthcare session at 10:30 A.M., I will visit the exhibition pavilion early to meet with medical imaging software representatives. Let's reconvene at 12:00 P.M. for the catered lunch.</p><p>See you at the airport on Thursday evening,<br/>Kevin</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t3_p7_q191",
        number: 191,
        text: "What was the original keynote topic scheduled for 9:00 A.M.?",
        options: {
          A: "Cloud Security for Electronic Health Records",
          B: "Artificial Intelligence in Medical Diagnostic Imaging",
          C: "Telemedicine Implementation in Rural Hospitals",
          D: "Mobile Applications for Patient Scheduling"
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Chủ đề bài phát biểu khai mạc ban đầu được lên lịch lúc 9:00 sáng là gì?<br/><b>Bằng chứng:</b> Trên trang web hội nghị: <i>\"9:00 A.M. – 10:15 A.M.: Keynote: 'Artificial Intelligence in Medical Diagnostic Imaging' by Dr. Alan Chen\"</i>. Chọn <b>(B)</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q192",
        number: 192,
        text: "Why was the conference schedule altered?",
        options: {
          A: "Severe storm damage to the convention center",
          B: "A key speaker had urgent professional commitments",
          C: "Low registration numbers for breakout sessions",
          D: "Audio visual equipment delivery delays"
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Tại sao lịch trình hội nghị bị thay đổi?<br/><b>Bằng chứng:</b> Bản ghi nhớ thông báo: <i>\"Dr. Alan Chen has unfortunately been called away for emergency medical duties...\"</i> (Tiến sĩ Chen bận nhiệm vụ y tế khẩn cấp). Chọn <b>(B)</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q193",
        number: 193,
        text: "Where will Ms. Gallagher deliver her presentation on Friday morning?",
        options: {
          A: "Room 102",
          B: "Room 105",
          C: "The Grand Ballroom",
          D: "Pavilion 3"
        },
        correctAnswer: "C",
        explanation: "<p><b>Dịch nghĩa:</b> Cô Gallagher sẽ trình bày bài thuyết trình của mình ở đâu vào sáng thứ Sáu?<br/><b>Bằng chứng:</b> Bản ghi nhớ và email đều nêu rõ bài thuyết trình của cô Gallagher được chuyển lên: <i>\"into the 9:00 A.M. keynote slot in the Grand Ballroom\"</i>. Chọn <b>(C) The Grand Ballroom</b>.</p>",
        questionType: "Inference & Suggestion",
        subCategory: "Inference & Suggestion"
      },
      {
        id: "ets22_t3_p7_q194",
        number: 194,
        text: "What will Mr. Weber do at 10:30 A.M.?",
        options: {
          A: "Attend Dr. Brody's telemedicine lecture",
          B: "Visit the technology exhibition pavilion",
          C: "Deliver a presentation on cloud security",
          D: "Catch a return flight to Valley Hospital"
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Ông Weber sẽ làm gì lúc 10:30 sáng?<br/><b>Bằng chứng:</b> Trong email, ông Weber viết: <i>\"while you attend Dr. Brody's rural healthcare session at 10:30 A.M., I will visit the exhibition pavilion early...\"</i>. Chọn <b>(B) Visit the technology exhibition pavilion</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q195",
        number: 195,
        text: "Why is Ms. Gallagher's presentation particularly relevant to Valley Hospital?",
        options: {
          A: "Valley Hospital is currently undergoing a cloud migration initiative.",
          B: "Ms. Gallagher is a former physician at Valley Hospital.",
          C: "The hospital is facing a government data audit next week.",
          D: "Valley Hospital developed the cloud software being demonstrated."
        },
        correctAnswer: "A",
        explanation: "<p><b>Dịch nghĩa:</b> Tại sao bài thuyết trình của cô Gallagher lại đặc biệt liên quan đến Bệnh viện Valley?<br/><b>Bằng chứng:</b> Ông Weber chỉ ra trong email: <i>\"which directly impacts our hospital's current cloud migration initiative\"</i> (ảnh hưởng trực tiếp đến sáng kiến chuyển đổi dữ liệu đám mây hiện tại của bệnh viện chúng ta). Chọn <b>(A)</b>.</p>",
        questionType: "Inference & Suggestion",
        subCategory: "Inference & Suggestion"
      }
    ]
  },

  // Set 15: Q196-200 (Triple Passage: Product Catalog + Online Order Form + Customer Support Email)
  {
    id: "ets22_t3_p7_s15",
    type: "Triple Passage",
    passages: [
      {
        id: "ets22_t3_p7_s15_p1",
        type: "Catalog",
        title: "Product Specifications",
        content: "<p><b>MODERNOVA OFFICE SYSTEMS — ERGONOMIC DESK SERIES</b><br/><br/>• <b>Model E-100 (Standard Manual):</b> Hand-crank height adjustment (28\"–44\"), laminated desktop, maximum weight capacity 150 lbs. — $299<br/>• <b>Model E-200 (Dual-Motor Electric):</b> Digital memory keypad with 4 presets, bamboo wood top, anti-collision sensor, capacity 250 lbs. — $499<br/>• <b>Model E-300 (Executive L-Shaped):</b> Triple-motor electric lift, solid walnut desktop, integrated wireless charging pad and cable management tray, capacity 350 lbs. — $799<br/>• <b>Model E-400 (Collaborative Conference):</b> Quad-motor dual standing conference table with integrated power hubs, seating for eight, capacity 500 lbs. — $1,299<br/><br/><i>Warranty: All electric motors are covered by a five-year replacement warranty. Desktops carry a ten-year structural guarantee.</i></p>"
      },
      {
        id: "ets22_t3_p7_s15_p2",
        type: "Order Form",
        title: "Purchase Order",
        content: "<p><b>ORDER CONFIRMATION: #MN-78902</b><br/><b>Customer:</b> Patrick O'Connor, BrightPath Consulting<br/><b>Shipping Address:</b> 450 Lexington Avenue, Suite 1200, New York, NY<br/><b>Order Date:</b> November 3 | <b>Payment Method:</b> Corporate Visa<br/><br/><b>Order Summary:</b><br/>• <b>Item:</b> Model E-200 (Dual-Motor Electric Desk)<br/>• <b>Desktop Finish:</b> Natural Bamboo<br/>• <b>Quantity:</b> 12 units @ $499.00 = $5,988.00<br/>• <b>Accessories:</b> 12 Under-Desk Cable Management Trays @ $30.00 = $360.00<br/>• <b>Freight Shipping:</b> White-Glove On-Site Assembly Delivery = $350.00<br/>• <b>Total Paid:</b> $6,698.00<br/><br/><b>Expected Delivery Window:</b> November 10–12</p>"
      },
      {
        id: "ets22_t3_p7_s15_p3",
        type: "Email",
        title: "Delivery Status Update",
        sender: "support@modernova.com",
        recipient: "poconnor@brightpath.com",
        date: "November 9",
        content: "<p><b>To:</b> Patrick O'Connor &lt;poconnor@brightpath.com&gt;<br/><b>From:</b> Customer Logistics &lt;support@modernova.com&gt;<br/><b>Date:</b> November 9<br/><b>Subject:</b> Update regarding Order #MN-78902 Delivery Schedule</p><p>Dear Mr. O'Connor,</p><p>We are writing to update you regarding your delivery of twelve Model E-200 standing workstations. Our carrier dispatched your shipment from our regional warehouse in Pennsylvania yesterday. However, during the assembly staging inspection, our quality team noted that the under-desk cable management trays were inadvertently omitted from the primary freight pallet.</p><p>Your twelve desks will still be delivered and assembled by our white-glove team as scheduled on Monday, November 12, between 9:00 A.M. and 1:00 P.M. The twelve missing cable management trays have been shipped separately via express priority courier and are scheduled to arrive on Tuesday, November 13.</p><p>To apologize for this packaging oversight, we have refunded the $350 white-glove assembly fee back to your corporate Visa card. Thank you for choosing Modernova Office Systems.</p><p>Best regards,<br/>Modernova Logistics Team</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t3_p7_q196",
        number: 196,
        text: "What feature distinguishes the Model E-200 from the Model E-100?",
        options: {
          A: "A hand-crank manual adjustment mechanism",
          B: "A dual-motor electric lift with digital memory presets",
          C: "A solid walnut L-shaped desktop",
          D: "Seating capacity for up to eight employees"
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Đặc điểm nào phân biệt mẫu E-200 với mẫu E-100?<br/><b>Bằng chứng:</b> Bảng thông số: Model E-100 là <i>\"Hand-crank height adjustment\"</i> (tay quay thủ công), trong khi Model E-200 là <i>\"Dual-Motor Electric: Digital memory keypad with 4 presets\"</i>. Chọn <b>(B)</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q197",
        number: 197,
        text: "How much did BrightPath Consulting spend on desk units alone?",
        options: {
          A: "$360.00",
          B: "$499.00",
          C: "$5,988.00",
          D: "$6,698.00",
        },
        correctAnswer: "C",
        explanation: "<p><b>Dịch nghĩa:</b> BrightPath Consulting đã chi bao nhiêu chỉ riêng cho các bàn làm việc?<br/><b>Bằng chứng:</b> Đơn hàng ghi: <i>\"12 units @ $499.00 = $5,988.00\"</i>. Chọn <b>(C) $5,988.00</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q198",
        number: 198,
        text: "What problem occurred with BrightPath Consulting's order?",
        options: {
          A: "Several bamboo desktops arrived scratched.",
          B: "Cable management trays were omitted from the primary shipment.",
          C: "The delivery address was entered incorrectly.",
          D: "The electric motors failed quality testing."
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Vấn đề gì đã xảy ra với đơn hàng của BrightPath Consulting?<br/><b>Bằng chứng:</b> Email logistics giải thích: <i>\"under-desk cable management trays were inadvertently omitted from the primary freight pallet\"</i> (các khay luồn dây cáp đã vô tình bị bỏ quên khỏi kiện hàng chính). Chọn <b>(B)</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      },
      {
        id: "ets22_t3_p7_q199",
        number: 199,
        text: "When will the primary desks be delivered and assembled?",
        options: {
          A: "November 3",
          B: "November 9",
          C: "November 12",
          D: "November 13"
        },
        correctAnswer: "C",
        explanation: "<p><b>Dịch nghĩa:</b> Khi nào các bàn làm việc chính sẽ được giao và lắp ráp?<br/><b>Bằng chứng:</b> Email nêu: <i>\"Your twelve desks will still be delivered and assembled... on Monday, November 12, between 9:00 A.M. and 1:00 P.M.\"</i>. Chọn <b>(C) November 12</b>.</p>",
        questionType: "Inference & Suggestion",
        subCategory: "Inference & Suggestion"
      },
      {
        id: "ets22_t3_p7_q200",
        number: 200,
        text: "What compensation does Modernova provide for the inconvenience?",
        options: {
          A: "A free upgrade to the Model E-300 desk",
          B: "A refund of the $350 assembly delivery fee",
          C: "A ten percent discount on all future orders",
          D: "An extension of the motor replacement warranty"
        },
        correctAnswer: "B",
        explanation: "<p><b>Dịch nghĩa:</b> Modernova cung cấp khoản bồi thường nào cho sự bất tiện?<br/><b>Bằng chứng:</b> Cuối email: <i>\"we have refunded the $350 white-glove assembly fee back to your corporate Visa card\"</i>. Chọn <b>(B) A refund of the $350 assembly delivery fee</b>.</p>",
        questionType: "Detail & Factual",
        subCategory: "Detail & Factual"
      }
    ]
  }
];
