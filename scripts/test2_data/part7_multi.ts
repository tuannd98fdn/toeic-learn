export const part7MultiSets = [
  // Set 11: Q176-180 (Double Passage: Review + Manager Email)
  {
    id: "ets22_t2_p7_s11",
    type: "Double Passage",
    passages: [
      {
        id: "ets22_t2_p7_s11_p1",
        type: "Webpage",
        title: "Customer Review",
        content: "<p><b>Traveler Review: The Kensington Grand Hotel</b><br/><b>Posted by:</b> Jonathan Miller, Seattle, WA<br/><b>Rating:</b> ★★★☆☆ (3 out of 5 stars)<br/><b>Stay Date:</b> October 4–7<br/><br/>I stayed at The Kensington Grand for three nights while attending the International Renewable Energy Forum at the nearby convention center. The hotel location is fantastic—only a five-minute walk to the venue and surrounded by excellent restaurants. My deluxe room on the twelfth floor was impeccably clean, and the bed was very comfortable.<br/><br/>However, my experience was marred by two issues. First, the in-room Wi-Fi was extremely sluggish and repeatedly disconnected, making it virtually impossible for me to join evening video conferences with my team back in Seattle. Second, despite having paid for the executive breakfast package in advance, the front desk clerk initially failed to include breakfast vouchers on my room keycard, forcing me to wait twenty minutes in the lobby on my first morning to resolve the error. While the concierge staff was very polite, for a five-star property charging premium rates, these technical and administrative mishaps were disappointing.</p>"
      },
      {
        id: "ets22_t2_p7_s11_p2",
        type: "Email",
        title: "Manager Response",
        sender: "c.delgado@kensingtongrand.com",
        recipient: "jmiller@millerconsulting.net",
        date: "October 10",
        content: "<p><b>To:</b> Jonathan Miller &lt;jmiller@millerconsulting.net&gt;<br/><b>From:</b> Clara Delgado, Guest Experience Director<br/><b>Date:</b> October 10<br/><b>Subject:</b> Sincere apologies regarding your recent stay</p><p>Dear Mr. Miller,</p><p>Thank you for taking the time to share your feedback following your stay at The Kensington Grand Hotel. We deeply appreciate both your kind words regarding our cleanliness and location, as well as your constructive comments regarding our service delivery.</p><p>I want to apologize personally for the frustrating Wi-Fi connectivity and the breakfast billing oversight you encountered. Our engineering department has identified that an auxiliary router servicing rooms 1201 through 1215 experienced a hardware failure during that week; the unit has since been replaced with a high-bandwidth enterprise router. Furthermore, we have retrained our front desk team to ensure package amenities are verified systematically upon arrival.</p><p>To demonstrate our commitment to your satisfaction, I have credited 5,000 loyalty points to your Kensington Rewards account and processed a full refund of $75 for your breakfast package. Should your business travel bring you back to Chicago, please contact me directly, and I will be delighted to arrange a complimentary room upgrade.</p><p>Warm regards,<br/>Clara Delgado<br/>Guest Experience Director, The Kensington Grand</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q176",
        number: 176,
        text: "Why did Mr. Miller visit the city?",
        options: {
          A: "To vacation with his family",
          B: "To attend an energy forum",
          C: "To interview for an executive position",
          D: "To perform hotel inspections"
        },
        correctAnswer: "B",
        explanation: "<p>Trong bài đánh giá, Mr. Miller nói: <i>'while attending the International Renewable Energy Forum'</i> => Tham dự diễn đàn năng lượng tái tạo.</p>"
      },
      {
        id: "ets22_t2_p7_q177",
        number: 177,
        text: "What problem with the room did Mr. Miller report?",
        options: {
          A: "The air conditioner was noisy",
          B: "The Wi-Fi connection was slow and unstable",
          C: "The bathroom lacked hot water",
          D: "The window view was obstructed"
        },
        correctAnswer: "B",
        explanation: "<p>Mr. Miller phản ánh: <i>'in-room Wi-Fi was extremely sluggish and repeatedly disconnected'</i> => Wi-Fi rất chậm và chập chờn.</p>"
      },
      {
        id: "ets22_t2_p7_q178",
        number: 178,
        text: "According to Ms. Delgado, what caused the Internet problem?",
        options: {
          A: "A citywide power outage",
          B: "A hardware failure of a 12th-floor router",
          C: "Excessive usage by conference attendees",
          D: "Severe lightning damage to hotel cables"
        },
        correctAnswer: "B",
        explanation: "<p>Trong email, bà Delgado giải thích: <i>'an auxiliary router servicing rooms 1201 through 1215 experienced a hardware failure'</i> => Lỗi phần cứng bộ định tuyến phục vụ tầng 12.</p>"
      },
      {
        id: "ets22_t2_p7_q179",
        number: 179,
        text: "How much money did Ms. Delgado refund to Mr. Miller?",
        options: {
          A: "$20",
          B: "$50",
          C: "$75",
          D: "$120"
        },
        correctAnswer: "C",
        explanation: "<p>Email nêu rõ: <i>'processed a full refund of $75 for your breakfast package'</i> => Hoàn tiền 75 USD.</p>"
      },
      {
        id: "ets22_t2_p7_q180",
        number: 180,
        text: "What offer does Ms. Delgado make for Mr. Miller's next stay?",
        options: {
          A: "A free dinner for two",
          B: "A complimentary room upgrade",
          C: "Free airport limousine service",
          D: "A 50% discount on conference room rental"
        },
        correctAnswer: "B",
        explanation: "<p>Cuối thư, bà Delgado đề xuất: <i>'I will be delighted to arrange a complimentary room upgrade'</i> => Nâng cấp hạng phòng miễn phí.</p>"
      }
    ]
  },

  // Set 12: Q181-185 (Double Passage: Warranty Policy + Claim Form)
  {
    id: "ets22_t2_p7_s12",
    type: "Double Passage",
    passages: [
      {
        id: "ets22_t2_p7_s12_p1",
        type: "Document",
        title: "Warranty Guide",
        content: "<p><b>VORTEX POWER TOOLS: LIMITED 3-YEAR COMMERCIAL WARRANTY</b><br/><br/>Vortex Power Tools guarantees all brushless commercial power tools against defects in materials and manufacturing workmanship for three years from the verified date of retail purchase. Under this warranty, Vortex will repair or replace any defective unit at our discretion without charge for parts or labor.<br/><br/><b>Warranty Exclusions:</b><br/>• Normal wear and tear on expendable accessories (saw blades, drill bits, carrying cases, sanding pads)<br/>• Damage caused by chemical immersion, unauthorized repairs, or operating on improper electrical voltage<br/>• Tools registered more than 30 days after initial purchase date<br/><br/><b>How to File a Claim:</b><br/>1. Complete our online Warranty Claim Form at www.vortextools.com/claims.<br/>2. Attach a scanned copy of your original purchase receipt indicating purchase date and retailer name.<br/>3. Ship the defective tool along with your generated RMA barcode to our National Service Center in Louisville, Kentucky. Customers are responsible for inward shipping; Vortex pays return shipping on approved claims.</p>"
      },
      {
        id: "ets22_t2_p7_s12_p2",
        type: "Email",
        title: "Warranty Claim",
        sender: "claims-dept@vortextools.com",
        recipient: "brian.carter@carterbuilders.com",
        date: "November 14",
        content: "<p><b>To:</b> Brian Carter &lt;brian.carter@carterbuilders.com&gt;<br/><b>From:</b> Vortex Customer Warranty Support<br/><b>Date:</b> November 14<br/><b>Subject:</b> RMA Confirmation #VTX-83921</p><p>Dear Mr. Carter,</p><p>Thank you for submitting your warranty claim regarding your Vortex Pro-Duty 20V Cordless Circular Saw (Model #CS-20X). We have verified your original receipt from Builder's Warehouse dated March 12 of this year, confirming your tool is well within our 3-year warranty window.</p><p>Based on your description of the drive motor cutting out during regular framing work, your tool has been assigned Return Merchandise Authorization (RMA) number VTX-83921. Please print the attached shipping label and barcode slip, place them securely inside your shipping box, and dispatch the package to our Louisville Service Depot.</p><p>Our certified technicians expect to inspect and service your saw within five business days of arrival. Once repaired, your tool will be shipped back via UPS Ground at no cost to you. You can track service status anytime by entering your RMA number on our portal.</p><p>Sincerely,<br/>Customer Warranty Support Team<br/>Vortex Power Tools</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q181",
        number: 181,
        text: "What does the Vortex warranty cover?",
        options: {
          A: "Defects in materials and manufacturing workmanship",
          B: "Damage caused by chemical immersion",
          C: "Routine replacement of drill bits and saw blades",
          D: "Loss of tools due to theft at job sites"
        },
        correctAnswer: "A",
        explanation: "<p>Chính sách bảo hành nêu: <i>'guarantees all brushless commercial power tools against defects in materials and manufacturing workmanship'</i> => Các lỗi về vật liệu và tay nghề chế tạo.</p>"
      },
      {
        id: "ets22_t2_p7_q182",
        number: 182,
        text: "Who is responsible for inward shipping of the defective tool?",
        options: {
          A: "Builder's Warehouse",
          B: "The customer",
          C: "UPS Logistics",
          D: "The local state government"
        },
        correctAnswer: "B",
        explanation: "<p>Văn bản ghi: <i>'Customers are responsible for inward shipping; Vortex pays return shipping on approved claims'</i> => Khách hàng chịu phí gửi đi.</p>"
      },
      {
        id: "ets22_t2_p7_q183",
        number: 183,
        text: "Where is the Vortex National Service Center located?",
        options: {
          A: "Seattle, Washington",
          B: "Chicago, Illinois",
          C: "Louisville, Kentucky",
          D: "Dallas, Texas"
        },
        correctAnswer: "C",
        explanation: "<p>Địa điểm được nêu: <i>'National Service Center in Louisville, Kentucky'</i>.</p>"
      },
      {
        id: "ets22_t2_p7_q184",
        number: 184,
        text: "What tool did Mr. Carter submit for warranty service?",
        options: {
          A: "A cordless drill",
          B: "A cordless circular saw",
          C: "An electric sander",
          D: "A pneumatic nailer"
        },
        correctAnswer: "B",
        explanation: "<p>Email xác nhận: <i>'Vortex Pro-Duty 20V Cordless Circular Saw (Model #CS-20X)'</i> => Máy cưa đĩa dùng pin.</p>"
      },
      {
        id: "ets22_t2_p7_q185",
        number: 185,
        text: "How quickly do technicians expect to inspect the tool after it arrives?",
        options: {
          A: "Within 24 hours",
          B: "Within five business days",
          C: "Within two weeks",
          D: "Within thirty days"
        },
        correctAnswer: "B",
        explanation: "<p>Email nêu: <i>'expect to inspect and service your saw within five business days of arrival'</i> => Trong vòng 5 ngày làm việc.</p>"
      }
    ]
  },

  // Set 13: Q186-190 (Triple Passage: Conference Brochure + Confirmation Email + Survey)
  {
    id: "ets22_t2_p7_s13",
    type: "Triple Passage",
    passages: [
      {
        id: "ets22_t2_p7_s13_p1",
        type: "Brochure",
        title: "Conference Brochure",
        content: "<p><b>ANNUAL DIGITAL MARKETING SUMMIT (ADMS 2026)</b><br/>Metro Trade Center, Atlanta | March 25–26<br/><br/><b>Keynote Sessions & Tracks:</b><br/>• <b>Track 1: AI in Content Strategy:</b> Moderated by Dr. Angela Brooks, VP of Media Tech. Explores generative content pipelines, automated SEO analytics, and audience segmentation algorithms.<br/>• <b>Track 2: Omnichannel Customer Engagement:</b> Led by Marcus Thorne, CMO of RetailSync. Focuses on bridging in-store retail experiences with mobile app personalization.<br/>• <b>Track 3: High-Converting Video Advertising:</b> Presented by Chloe Dupuis, Creative Director at Lumina Studio. Case studies on short-form viral storytelling.<br/>• <b>Track 4: Privacy-First Data Measurement:</b> Taught by Samuel O'Reilly, Cyber Compliance Expert. Strategies for post-cookie attribution modeling.</p>"
      },
      {
        id: "ets22_t2_p7_s13_p2",
        type: "Email",
        title: "Registration Invoice",
        sender: "registration@admsummit.org",
        recipient: "t.nakamura@solarisdigital.com",
        date: "February 12",
        content: "<p><b>To:</b> Taro Nakamura &lt;t.nakamura@solarisdigital.com&gt;<br/><b>From:</b> ADMS 2026 Registration Desk<br/><b>Date:</b> February 12<br/><b>Subject:</b> Registration Confirmation & Payment Receipt #ADMS-4091</p><p>Dear Mr. Nakamura,</p><p>We are delighted to confirm your registration for the Annual Digital Marketing Summit (ADMS 2026). Below are your booking details:</p><p><b>Attendee:</b> Taro Nakamura<br/><b>Company:</b> Solaris Digital Marketing Agency<br/><b>Pass Type:</b> All-Access Conference Pass ($795 Early Bird rate)<br/><b>Workshop Selection:</b> Track 1 (AI in Content Strategy)<br/><b>Networking Dinner:</b> Included (Wednesday, March 25 at 7:00 P.M.)<br/><b>Payment Status:</b> PAID IN FULL (Visa ending in 9812)</p><p>Please present this confirmation email (printed or digital) at the attendee check-in desk in the main atrium on March 25 to collect your badge and summit bag.</p>"
      },
      {
        id: "ets22_t2_p7_s13_p3",
        type: "Survey",
        title: "Post-Event Feedback",
        content: "<p><b>ADMS 2026 ATTENDEE EVALUATION SURVEY</b><br/><b>Respondent:</b> Taro Nakamura (Solaris Digital)<br/><br/><b>Overall Experience:</b> 4 / 5 Stars<br/><br/><b>Workshop Feedback:</b><br/>The session on generative content pipelines led by Dr. Angela Brooks was outstanding! The practical framework she provided for automating audience segmentation will save our agency dozens of hours each month. Her live demonstration of prompt architecture was the highlight of the entire summit.<br/><br/><b>Facilities & Logistics:</b><br/>The conference venue was very easy to reach by subway. However, the venue temperature in the Track 1 breakout hall was uncomfortably cold throughout the afternoon. Also, although the networking dinner food was delicious, vegetarian entrée options ran out within the first fifteen minutes. I hope the organizers coordinate better head counts with banquet staff next year.</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q186",
        number: 186,
        text: "Who led the workshop that Mr. Nakamura attended?",
        options: {
          A: "Marcus Thorne",
          B: "Dr. Angela Brooks",
          C: "Chloe Dupuis",
          D: "Samuel O'Reilly"
        },
        correctAnswer: "B",
        explanation: "<p>Trong xác nhận đăng ký, Mr. Nakamura chọn Track 1 (AI in Content Strategy). Tờ rơi hội nghị nêu rõ Track 1 do <b>Dr. Angela Brooks</b> chủ trì.</p>"
      },
      {
        id: "ets22_t2_p7_q187",
        number: 187,
        text: "How much did Mr. Nakamura pay for his conference pass?",
        options: {
          A: "$450",
          B: "$650",
          C: "$795",
          D: "$950"
        },
        correctAnswer: "C",
        explanation: "<p>Hóa đơn xác nhận ghi rõ: <i>'All-Access Conference Pass ($795 Early Bird rate)'</i> => 795 USD.</p>"
      },
      {
        id: "ets22_t2_p7_q188",
        number: 188,
        text: "What specific benefit did Mr. Nakamura highlight about Dr. Brooks's presentation?",
        options: {
          A: "It introduced free video editing tools",
          B: "It provided an automated framework that will save his agency time",
          C: "It explained European legal regulations",
          D: "It offered discounts on advertising software"
        },
        correctAnswer: "B",
        explanation: "<p>Trong bản khảo sát, Mr. Nakamura nhận xét: <i>'The practical framework she provided for automating audience segmentation will save our agency dozens of hours each month'</i>.</p>"
      },
      {
        id: "ets22_t2_p7_q189",
        number: 189,
        text: "What complaint did Mr. Nakamura have about the venue hall?",
        options: {
          A: "The room was too crowded",
          B: "The room temperature was uncomfortably cold",
          C: "The audio microphones malfunctioned",
          D: "The chairs were broken"
        },
        correctAnswer: "B",
        explanation: "<p>Bản khảo sát nêu: <i>'the venue temperature in the Track 1 breakout hall was uncomfortably cold'</i> => Nhiệt độ phòng quá lạnh.</p>"
      },
      {
        id: "ets22_t2_p7_q190",
        number: 190,
        text: "What issue occurred during the networking dinner?",
        options: {
          A: "The dinner was delayed by two hours",
          B: "Vegetarian food options ran out quickly",
          C: "Beverages were not included",
          D: "Music was played too loudly"
        },
        correctAnswer: "B",
        explanation: "<p>Mr. Nakamura phản ánh: <i>'vegetarian entrée options ran out within the first fifteen minutes'</i> => Món ăn chay hết sạch chỉ trong 15 phút đầu.</p>"
      }
    ]
  },

  // Set 14: Q191-195 (Triple Passage: Real Estate Listing + Application + Approval)
  {
    id: "ets22_t2_p7_s14",
    type: "Triple Passage",
    passages: [
      {
        id: "ets22_t2_p7_s14_p1",
        type: "Webpage",
        title: "Commercial Property Listing",
        content: "<p><b>PRIME COMMERCIAL LEASING: PARKVIEW PLAZA</b><br/>400 West Monroe Street, Chicago, IL<br/><br/>Parkview Plaza offers premium Class-A office suites overlooking Grant Park. Available immediately:<br/><br/>• <b>Suite 310:</b> 1,800 sq ft | 3 private offices, conference room, reception area | $4,200/mo<br/>• <b>Suite 520:</b> 3,200 sq ft | 6 private offices, open work area, kitchenette | $7,500/mo<br/>• <b>Suite 840:</b> 5,000 sq ft | Entire partial wing, executive boardroom, dedicated server room | $11,800/mo<br/><br/><b>Building Amenities:</b> 24/7 lobby security, underground heated parking, fitness facility with showers, fiber-optic internet ready. Leases of 24 months or longer include two months of free base rent and five complimentary parking passes.</p>"
      },
      {
        id: "ets22_t2_p7_s14_p2",
        type: "Form",
        title: "Lease Application",
        content: "<p><b>COMMERCIAL LEASE APPLICATION SUMMARY</b><br/><b>Applicant Organization:</b> BlueWave Fintech Solutions<br/><b>Contact Person:</b> Sandra Sterling, Chief Financial Officer<br/><b>Desired Suite:</b> Suite 520 (3,200 sq ft)<br/><b>Intended Lease Term:</b> 36 Months<br/><b>Move-In Target Date:</b> November 1<br/><b>Number of Employees On-Site:</b> 14 full-time employees<br/><b>Required Customizations:</b> Installation of glass partition doors in the executive office and additional wall data ports in the open work area.<br/><b>Credit Verification:</b> Dun & Bradstreet Rating: A+ | Annual Corporate Revenue: $4.2M</p>"
      },
      {
        id: "ets22_t2_p7_s14_p3",
        type: "Letter",
        title: "Approval Letter",
        sender: "leasing@parkviewplaza.com",
        recipient: "s.sterling@bluewavefintech.com",
        date: "October 15",
        content: "<p>Dear Ms. Sterling,</p><p>On behalf of Monroe Property Management, I am thrilled to inform you that BlueWave Fintech Solutions' application to lease Suite 520 at Parkview Plaza has been officially approved!</p><p>Because you have committed to a 36-month lease term, your contract qualifies for our long-term tenant package: your first two months of base rent will be entirely abated (November and December), and your account will receive five assigned parking passes in our underground garage at no monthly cost.</p><p>Regarding your customization requests, our building maintenance contractors will install the requested glass partition doors and additional Ethernet ports prior to your November 1 occupancy date. Please review and sign the attached lease agreement and wire the initial security deposit of $7,500 by October 22.</p><p>Sincerely,<br/>Gregory Vance<br/>Director of Commercial Leasing, Parkview Plaza</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q191",
        number: 191,
        text: "What is the monthly rent for Suite 520?",
        options: {
          A: "$4,200",
          B: "$7,500",
          C: "$11,800",
          D: "$15,000"
        },
        correctAnswer: "B",
        explanation: "<p>Bản niêm yết nêu rõ giá thuê Suite 520 là <b>$7,500/mo</b>.</p>"
      },
      {
        id: "ets22_t2_p7_q192",
        number: 192,
        text: "How long of a lease term did BlueWave Fintech Solutions request?",
        options: {
          A: "12 months",
          B: "24 months",
          C: "36 months",
          D: "48 months"
        },
        correctAnswer: "C",
        explanation: "<p>Đơn đăng ký ghi: <i>'Intended Lease Term: 36 Months'</i> => 36 tháng (3 năm).</p>"
      },
      {
        id: "ets22_t2_p7_q193",
        number: 193,
        text: "What incentive did BlueWave receive for signing a long-term lease?",
        options: {
          A: "Free office furniture",
          B: "Two months of free base rent and five parking passes",
          C: "Discounted electricity rates",
          D: "Free daily lunch catering"
        },
        correctAnswer: "B",
        explanation: "<p>Thư phê duyệt nêu: <i>'your first two months of base rent will be entirely abated... and five assigned parking passes'</i>.</p>"
      },
      {
        id: "ets22_t2_p7_q194",
        number: 194,
        text: "When does BlueWave intend to move into the suite?",
        options: {
          A: "October 15",
          B: "October 22",
          C: "November 1",
          D: "December 31"
        },
        correctAnswer: "C",
        explanation: "<p>Đơn đăng ký và thư đều ghi ngày chuyển vào là <b>November 1</b>.</p>"
      },
      {
        id: "ets22_t2_p7_q195",
        number: 195,
        text: "What must Ms. Sterling submit by October 22?",
        options: {
          A: "A proof of corporate insurance",
          B: "Signed lease agreement and $7,500 deposit",
          C: "Photos of previous office spaces",
          D: "Employee background checks"
        },
        correctAnswer: "B",
        explanation: "<p>Cuối thư, Gregory Vance yêu cầu: <i>'sign the attached lease agreement and wire the initial security deposit of $7,500 by October 22'</i>.</p>"
      }
    ]
  },

  // Set 15: Q196-200 (Triple Passage: RFP + Vendor Proposal + Purchase Agreement)
  {
    id: "ets22_t2_p7_s15",
    type: "Triple Passage",
    passages: [
      {
        id: "ets22_t2_p7_s15_p1",
        type: "Notice",
        title: "Request for Proposals",
        content: "<p><b>REQUEST FOR PROPOSALS (RFP #2026-IT)</b><br/><b>Issuing Entity:</b> City of Riverside Municipal Water District<br/><b>Date Issued:</b> April 4<br/><b>Project:</b> Enterprise Cloud Data Backup & Disaster Recovery Solution<br/><br/>The Riverside Municipal Water District invites competitive proposals from qualified cloud infrastructure service providers to deploy an automated, geographically redundant cloud backup system. Requirements include:<br/>1. Real-time incremental backup of 50 terabytes of SCADA and billing database files<br/>2. 99.999% uptime SLA with recovery time objective (RTO) under fifteen minutes<br/>3. End-to-end 256-bit AES encryption complying with federal cybersecurity guidelines<br/>4. 24/7 dedicated telephone technical support with assigned account engineer<br/><br/>Proposals must be submitted electronically to <b>procurement@riversidewater.gov</b> by May 1.</p>"
      },
      {
        id: "ets22_t2_p7_s15_p2",
        type: "Document",
        title: "Vendor Proposal Summary",
        content: "<p><b>PROPOSAL FOR RIVERSIDE MUNICIPAL WATER DISTRICT</b><br/><b>Vendor:</b> StrataCloud Infrastructure Solutions, Austin, TX<br/><b>Date Submitted:</b> April 26<br/><br/><b>Proposed Architecture: SecureVault GovCloud</b><br/>• Automated multi-zone replication across Virginia and Oregon data centers<br/>• Instantaneous failover capability with verified 8-minute RTO<br/>• Full AES-256 encryption at rest and in transit (FedRAMP High Certified)<br/>• Dedicated Level 3 technical team with 15-minute phone response guarantee<br/><br/><b>Pricing Structure:</b><br/>• Implementation & System Migration: $12,500 (One-time fee)<br/>• Annual Cloud Storage & Disaster Recovery License: $48,000/year (billed quarterly at $12,000)<br/>• Special Government Incentive: 10 percent discount on annual license fees for 3-year contract commitments.</p>"
      },
      {
        id: "ets22_t2_p7_s15_p3",
        type: "Document",
        title: "Contract Award Notice",
        content: "<p><b>BOARD OF COMMISSIONERS RESOLUTION #842</b><br/>City of Riverside Municipal Water District<br/>May 18<br/><br/><b>Subject:</b> Award of Enterprise Cloud Backup Contract (RFP #2026-IT)<br/><br/>WHEREAS, the District received five competitive proposals in response to RFP #2026-IT, and the IT Technical Evaluation Committee conducted thorough technical audits and security compliance verifications;<br/><br/>THEREFORE, BE IT RESOLVED that the Board of Commissioners hereby approves the award of the cloud disaster recovery contract to <b>StrataCloud Infrastructure Solutions</b> for a firm three-year term commencing June 1, 2026.<br/><br/>Under the terms of the accepted multi-year commitment, the District will benefit from StrataCloud's government discount, reducing the annual license cost from $48,000 to $43,200 per year. The total authorized expenditure for Year 1, including one-time migration and setup fees, shall not exceed $55,700.</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q196",
        number: 196,
        text: "What was the purpose of the initial RFP issued by Riverside Water District?",
        options: {
          A: "To construct a new water treatment plant",
          B: "To procure a cloud data backup and disaster recovery solution",
          C: "To replace municipal water pipes",
          D: "To hire cybersecurity instructors"
        },
        correctAnswer: "B",
        explanation: "<p>RFP nêu rõ mục đích: <i>'Enterprise Cloud Data Backup & Disaster Recovery Solution'</i> => Tìm kiếm giải pháp sao lưu và phục hồi dữ liệu đám mây.</p>"
      },
      {
        id: "ets22_t2_p7_q197",
        number: 197,
        text: "What recovery time objective (RTO) did StrataCloud achieve in its proposal?",
        options: {
          A: "5 minutes",
          B: "8 minutes",
          C: "15 minutes",
          D: "30 minutes"
        },
        correctAnswer: "B",
        explanation: "<p>Bản đề xuất của StrataCloud cam kết: <i>'verified 8-minute RTO'</i> => Thời gian phục hồi 8 phút.</p>"
      },
      {
        id: "ets22_t2_p7_q198",
        number: 198,
        text: "Why did the district receive a discount on annual license fees?",
        options: {
          A: "Because they made an upfront cash payment",
          B: "Because they committed to a 3-year contract",
          C: "Because they referred another municipal client",
          D: "Because they purchased additional storage capacity"
        },
        correctAnswer: "B",
        explanation: "<p>Bản đề xuất và nghị quyết đều ghi: <i>'10 percent discount on annual license fees for 3-year contract commitments'</i>.</p>"
      },
      {
        id: "ets22_t2_p7_q199",
        number: 199,
        text: "What is the discounted annual license cost approved for StrataCloud?",
        options: {
          A: "$12,500",
          B: "$43,200",
          C: "$48,000",
          D: "$55,700"
        },
        correctAnswer: "B",
        explanation: "<p>Nghị quyết nêu rõ: <i>'reducing the annual license cost from $48,000 to $43,200 per year'</i> => 43.200 USD/năm.</p>"
      },
      {
        id: "ets22_t2_p7_q200",
        number: 200,
        text: "When does the approved contract officially take effect?",
        options: {
          A: "April 4",
          B: "April 26",
          C: "May 18",
          D: "June 1"
        },
        correctAnswer: "D",
        explanation: "<p>Nghị quyết ghi ngày bắt đầu hợp đồng: <i>'for a firm three-year term commencing June 1, 2026'</i> => Bắt đầu từ ngày 1 tháng 6.</p>"
      }
    ]
  }
];
