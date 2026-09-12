export const part7SingleSets = [
  // Set 1: Q147-148 (Notice / Advertisement)
  {
    id: "ets22_t2_p7_s01",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s01_p1",
        type: "Notice",
        title: "Advertisement",
        content: "<p><b>GREENSPARK SOLAR WORKSHOP</b><br/><br/>Are you interested in reducing your business's carbon footprint while slashing monthly electricity expenditures? Join GreenSpark Energy for a complimentary two-hour workshop on commercial solar panel installation.<br/><br/><b>Date:</b> Wednesday, October 24<br/><b>Time:</b> 10:00 A.M. – 12:00 P.M.<br/><b>Location:</b> Oakridge Business Center, Suite 400<br/><br/>During this interactive session, certified renewable energy consultants will evaluate state clean energy tax credits, roof structural requirements, and battery storage solutions. Attendees will also receive a free personalized site feasibility assessment valued at $200.<br/><br/>Space is strictly limited to 35 business owners. To secure your reservation, please visit <b>www.greensparkenergy.com/workshop</b> by October 20.</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q147",
        number: 147,
        text: "What is the primary topic of the workshop?",
        options: {
          A: "Commercial solar panel systems",
          B: "Office interior decorating",
          C: "Corporate tax accounting software",
          D: "Electric vehicle charging stations"
        },
        correctAnswer: "A",
        explanation: "<p>Đoạn văn nêu rõ: <i>'a complimentary two-hour workshop on commercial solar panel installation'</i> => Hệ thống pin năng lượng mặt trời thương mại.</p>"
      },
      {
        id: "ets22_t2_p7_q148",
        number: 148,
        text: "What benefit is offered to workshop attendees?",
        options: {
          A: "A free lunch buffet",
          B: "A complimentary site feasibility assessment",
          C: "Discounted office rental space",
          D: "A certificate in electrical engineering"
        },
        correctAnswer: "B",
        explanation: "<p>Thông tin nằm ở câu: <i>'Attendees will also receive a free personalized site feasibility assessment valued at $200'</i> => Bản đánh giá tính khả thi địa điểm miễn phí.</p>"
      }
    ]
  },

  // Set 2: Q149-150 (Text Message Chain)
  {
    id: "ets22_t2_p7_s02",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s02_p1",
        type: "Text Message",
        title: "Chat Discussion",
        content: "<p><b>Lucas Vance [9:14 A.M.]:</b> Hi Nadia, did you get a chance to look over the presentation slides for our 11 o'clock client meeting with Pinnacle Financial?<br/><br/><b>Nadia Keller [9:16 A.M.]:</b> Yes, I reviewed them on my commute. The overall structure is very clear, but slide 8 still displays last year's market share numbers instead of the updated Q3 report.<br/><br/><b>Lucas Vance [9:18 A.M.]:</b> Good catch! I will replace that chart right now with the new figures from David's department.<br/><br/><b>Nadia Keller [9:20 A.M.]:</b> Thanks! Also, please print six color handouts once you make the correction. I am stuck in a client phone call until 10:30.</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q149",
        number: 149,
        text: "What error does Ms. Keller point out?",
        options: {
          A: "A meeting time was scheduled incorrectly",
          B: "Slide 8 contains outdated market share data",
          C: "The client company name is misspelled",
          D: "A financial calculation is missing taxes"
        },
        correctAnswer: "B",
        explanation: "<p>Ms. Keller nói: <i>'slide 8 still displays last year's market share numbers instead of the updated Q3 report'</i> => Slide 8 chứa số liệu thị phần cũ của năm ngoái.</p>"
      },
      {
        id: "ets22_t2_p7_q150",
        number: 150,
        text: "What does Ms. Keller ask Mr. Vance to do?",
        options: {
          A: "Reschedule the client presentation",
          B: "Print six copies of the updated handouts",
          C: "Call Pinnacle Financial directly",
          D: "Attend a training session with David"
        },
        correctAnswer: "B",
        explanation: "<p>Ms. Keller nhắn: <i>'please print six color handouts once you make the correction'</i> => In 6 bản tài liệu màu.</p>"
      }
    ]
  },

  // Set 3: Q151-152 (Email)
  {
    id: "ets22_t2_p7_s03",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s03_p1",
        type: "Email",
        title: "Email Message",
        sender: "h.garrison@summitlogistics.com",
        recipient: "allstaff@summitlogistics.com",
        date: "September 14",
        content: "<p><b>To:</b> All Staff<br/><b>From:</b> Henry Garrison, HR Director<br/><b>Date:</b> September 14<br/><b>Subject:</b> Nominations for the Annual Excellence Award</p><p>Dear Colleagues,</p><p>Nominations are now officially open for Summit Logistics' Annual Excellence Award. This prestigious award recognizes employees who have demonstrated outstanding dedication, exemplary teamwork, and innovative problem-solving over the past calendar year.</p><p>Any full-time staff member who has completed at least twelve months of service with our company is eligible for nomination. To submit a nominee, please complete the nomination form on the company intranet under the HR tab. You must include a brief statement (maximum 300 words) describing the nominee's specific contributions.</p><p>All nominations must be received by 5:00 P.M. on Friday, October 8. The recipient will be announced at our annual gala in December and will receive a plaque along with an educational travel stipend.</p><p>Best regards,<br/>Henry Garrison</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q151",
        number: 151,
        text: "Who is eligible to be nominated for the award?",
        options: {
          A: "Independent contractors only",
          B: "Full-time employees with at least one year of service",
          C: "Department directors and executive staff",
          D: "Interns who joined this month"
        },
        correctAnswer: "B",
        explanation: "<p>Đoạn email nêu rõ điều kiện: <i>'Any full-time staff member who has completed at least twelve months of service with our company is eligible'</i> => Nhân viên toàn thời gian làm việc ít nhất 1 năm (12 tháng).</p>"
      },
      {
        id: "ets22_t2_p7_q152",
        number: 152,
        text: "What must be included when submitting a nomination?",
        options: {
          A: "Letters of recommendation from customers",
          B: "A brief statement detailing contributions",
          C: "A copy of the employee's college diploma",
          D: "An audio recording of an interview"
        },
        correctAnswer: "B",
        explanation: "<p>Email quy định: <i>'You must include a brief statement (maximum 300 words) describing the nominee's specific contributions'</i> => Bản mô tả ngắn gọn đóng góp của người được đề cử.</p>"
      }
    ]
  },

  // Set 4: Q153-154 (Web Page / Job Posting)
  {
    id: "ets22_t2_p7_s04",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s04_p1",
        type: "Webpage",
        title: "Career Opportunity",
        content: "<p><b>CAREERS AT APEX CAPITAL MANAGEMENT</b><br/><br/><b>Position:</b> Senior Financial Analyst<br/><b>Location:</b> Chicago, IL (Hybrid: 3 days in office, 2 days remote)<br/><b>Department:</b> Portfolio Strategy & Risk Management<br/><br/><b>Job Summary:</b><br/>Apex Capital Management is seeking an experienced Senior Financial Analyst to join our expanding quantitative analytics team. The successful candidate will conduct detailed econometric modeling, assess market risks, and draft investment memorandums for institutional clients.<br/><br/><b>Key Requirements:</b><br/>• Bachelor’s degree in Finance, Economics, or Mathematics (Master’s or CFA preferred)<br/>• Minimum of four years of experience in equity research or portfolio analysis<br/>• Advanced proficiency in Python, SQL, and financial modeling software<br/>• Exceptional written and verbal communication skills<br/><br/><b>Compensation & Benefits:</b><br/>We offer a highly competitive base salary, annual performance bonus, comprehensive medical and dental insurance, and a 401(k) retirement match up to 6 percent.<br/><br/>To apply, submit your resume and a portfolio sample to <b>careers@apexcap.com</b> by November 15.</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q153",
        number: 153,
        text: "What work arrangement does this position offer?",
        options: {
          A: "Fully remote with no office visits",
          B: "Hybrid schedule combining office and remote days",
          C: "Full-time night shift hours",
          D: "Weekend-only consulting hours"
        },
        correctAnswer: "B",
        explanation: "<p>Thông tin ghi: <i>'Hybrid: 3 days in office, 2 days remote'</i> => Lịch làm việc kết hợp giữa văn phòng và từ xa (hybrid).</p>"
      },
      {
        id: "ets22_t2_p7_q154",
        number: 154,
        text: "What is mentioned as a requirement for applicants?",
        options: {
          A: "Willingness to travel abroad every week",
          B: "At least four years of related analytical experience",
          C: "Fluency in three foreign languages",
          D: "Prior managerial experience leading large teams"
        },
        correctAnswer: "B",
        explanation: "<p>Phần yêu cầu nêu: <i>'Minimum of four years of experience in equity research or portfolio analysis'</i> => Tối thiểu 4 năm kinh nghiệm phân tích liên quan.</p>"
      }
    ]
  },

  // Set 5: Q155-157 (Memo / Announcement)
  {
    id: "ets22_t2_p7_s05",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s05_p1",
        type: "Memo",
        title: "Internal Memorandum",
        content: "<p><b>MEMORANDUM</b><br/><br/><b>To:</b> All Headquarters Personnel<br/><b>From:</b> Building Facilities & Operations<br/><b>Date:</b> August 3<br/><b>Subject:</b> Cafeteria Modernization Project</p><p>Beginning on Monday, August 16, our ground-floor employee cafeteria will undergo a comprehensive renovation to update seating areas, install energy-efficient kitchen equipment, and introduce a modern self-service salad and smoothie bar. Construction is scheduled to conclude on Friday, September 10.</p><p>While construction is underway, the main dining hall and hot meal service will be completely closed. However, to ensure all staff members have convenient dining alternatives, management has made the following arrangements:</p><p>1. <b>Meal Vouchers:</b> Every full-time employee will receive three $10 lunch vouchers per week, redeemable at participating neighborhood cafes and sandwich shops on Elm Street.<br/>2. <b>Temporary Break Stations:</b> Refrigerator space, microwave ovens, and complimentary coffee will be available in Conference Rooms 104 and 208.<br/>3. <b>Food Trucks:</b> Two gourmet food trucks will park in the rear courtyard from 11:30 A.M. to 2:00 P.M. each weekday.</p><p>We appreciate your cooperation during these improvements.</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q155",
        number: 155,
        text: "When will the cafeteria renovation project begin?",
        options: {
          A: "August 3",
          B: "August 16",
          C: "September 10",
          D: "October 1"
        },
        correctAnswer: "B",
        explanation: "<p>Thông báo nêu rõ: <i>'Beginning on Monday, August 16, our ground-floor employee cafeteria will undergo...'</i> => Ngày 16 tháng 8.</p>"
      },
      {
        id: "ets22_t2_p7_q156",
        number: 156,
        text: "What will employees receive during the construction period?",
        options: {
          A: "Daily cash stipends",
          B: "Lunch vouchers for local eateries",
          C: "Free grocery delivery service",
          D: "Gift cards for an online retailer"
        },
        correctAnswer: "B",
        explanation: "<p>Thông tin tại mục 1: <i>'Every full-time employee will receive three $10 lunch vouchers per week, redeemable at participating neighborhood cafes...'</i> => Phiếu ăn trưa tại các quán ăn địa phương.</p>"
      },
      {
        id: "ets22_t2_p7_q157",
        number: 157,
        text: "Where will temporary microwave ovens and refrigerators be set up?",
        options: {
          A: "In the rear courtyard",
          B: "In Conference Rooms 104 and 208",
          C: "In the main lobby",
          D: "In the parking garage office"
        },
        correctAnswer: "B",
        explanation: "<p>Thông tin tại mục 2: <i>'available in Conference Rooms 104 and 208'</i>.</p>"
      }
    ]
  },

  // Set 6: Q158-160 (Letter / Catering Confirmation)
  {
    id: "ets22_t2_p7_s06",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s06_p1",
        type: "Letter",
        title: "Confirmation Letter",
        content: "<p><b>BELLA VISTA CATERING SERVICES</b><br/>820 Harbor Boulevard, Suite 300<br/>San Diego, CA 92101<br/><br/>June 18<br/><br/>Ms. Julianne Vance<br/>Director of Event Logistics<br/>Pacific Maritime Association<br/>San Diego, CA 92103<br/><br/>Dear Ms. Vance,<br/><br/>Thank you for choosing Bella Vista Catering for the Pacific Maritime Association's Annual Gala on Saturday, July 24, at the Marina Pavilion. We are delighted to confirm our catering agreement for your anticipated 160 guests.<br/><br/>Based on our consultation on June 12, we have finalized your menu selections. Dinner will commence with our signature seasonal arugula and goat cheese salad, followed by a choice between grilled wild Alaskan salmon or braised beef tenderloin. For guests with plant-based dietary preferences, our chef will prepare roasted butternut squash risotto.<br/><br/>Please provide your final guest head count and individual entrée selections by July 14 so we can order fresh ingredients from our suppliers. A 50 percent advance deposit of $4,200 has been received, with the remaining balance due within seven days following the event.<br/><br/>Sincerely,<br/>Marco Rossi<br/>Executive Catering Coordinator</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q158",
        number: 158,
        text: "What event is Bella Vista Catering providing food for?",
        options: {
          A: "A wedding anniversary dinner",
          B: "An annual association gala",
          C: "A business trade exhibition",
          D: "A university graduation party"
        },
        correctAnswer: "B",
        explanation: "<p>Bức thư nêu mục đích: <i>'Pacific Maritime Association's Annual Gala on Saturday, July 24'</i> => Dạ tiệc thường niên của hiệp hội.</p>"
      },
      {
        id: "ets22_t2_p7_q159",
        number: 159,
        text: "What entrée will be served to guests requesting vegetarian meals?",
        options: {
          A: "Grilled wild Alaskan salmon",
          B: "Braised beef tenderloin",
          C: "Roasted butternut squash risotto",
          D: "Arugula and goat cheese salad"
        },
        correctAnswer: "C",
        explanation: "<p>Bức thư nói: <i>'For guests with plant-based dietary preferences, our chef will prepare roasted butternut squash risotto'</i>.</p>"
      },
      {
        id: "ets22_t2_p7_q160",
        number: 160,
        text: "What must Ms. Vance submit by July 14?",
        options: {
          A: "The remaining balance payment",
          B: "Final guest count and entrée selections",
          C: "Signed rental contracts for the pavilion",
          D: "Contact details for the guest speakers"
        },
        correctAnswer: "B",
        explanation: "<p>Thư nêu: <i>'Please provide your final guest head count and individual entrée selections by July 14'</i> => Số lượng khách chính thức và lựa chọn món chính.</p>"
      }
    ]
  },

  // Set 7: Q161-163 (Newspaper Article)
  {
    id: "ets22_t2_p7_s07",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s07_p1",
        type: "Article",
        title: "News Report",
        content: "<p><b>AUSTIN BUSINESS CHRONICLE</b><br/><br/><b>BioNano Health Secures $45M Series B Funding</b><br/><i>By Teresa Gomez</i><br/><br/>AUSTIN — BioNano Health, a local biotechnology firm pioneering non-invasive glucose monitoring sensors, announced on Thursday that it has successfully raised $45 million in Series B financing. The funding round was spearheaded by Horizon Venture Partners, with additional participation from existing European healthcare funds.<br/><br/>Founded five years ago by former medical university researchers, BioNano Health has developed a wearable sensor patch that measures blood glucose levels continuously without requiring painful finger pricks. The device syncs data seamlessly via Bluetooth to a smartphone app, allowing patients and physicians to track trends in real time.<br/><br/>According to CEO Dr. Raymond Chen, the newly acquired capital will be deployed to expand clinical manufacturing facilities in north Austin and accelerate clinical trials required for federal regulatory clearance. The company aims to obtain official regulatory approval by late next year and begin commercial distribution shortly thereafter.</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q161",
        number: 161,
        text: "What product has BioNano Health developed?",
        options: {
          A: "An artificial heart valve",
          B: "A wearable glucose monitoring patch",
          C: "An automated surgical robot",
          D: "A hospital billing software"
        },
        correctAnswer: "B",
        explanation: "<p>Bài báo miêu tả sản phẩm: <i>'wearable sensor patch that measures blood glucose levels continuously'</i> => Miếng dán cảm biến theo dõi đường huyết đeo trên người.</p>"
      },
      {
        id: "ets22_t2_p7_q162",
        number: 162,
        text: "Who led the investment funding round?",
        options: {
          A: "Austin Municipal Bank",
          B: "Horizon Venture Partners",
          C: "A federal medical agency",
          D: "Oxford University Endowment"
        },
        correctAnswer: "B",
        explanation: "<p>Bài báo nêu: <i>'The funding round was spearheaded by Horizon Venture Partners'</i>.</p>"
      },
      {
        id: "ets22_t2_p7_q163",
        number: 163,
        text: "How does the company plan to use the new funds?",
        options: {
          A: "To open retail pharmacies",
          B: "To expand manufacturing and advance clinical trials",
          C: "To acquire a competitor's patents",
          D: "To relocate headquarters to Europe"
        },
        correctAnswer: "B",
        explanation: "<p>Thông tin: <i>'deployed to expand clinical manufacturing facilities... and accelerate clinical trials'</i> => Mở rộng nhà máy sản xuất và đẩy nhanh thử nghiệm lâm sàng.</p>"
      }
    ]
  },

  // Set 8: Q164-167 (Schedule & Guidelines with Sentence Insertion)
  {
    id: "ets22_t2_p7_s08",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s08_p1",
        type: "Schedule",
        title: "Conference Guidelines",
        content: "<p><b>MIDWEST MANUFACTURING INNOVATION EXPO</b><br/>Columbus Convention Center | November 17–18<br/><br/><b>Exhibitor Setup Guidelines & Schedule:</b><br/><br/><b>Setup Times:</b><br/>Wednesday, November 16: 1:00 P.M. – 8:00 P.M.<br/>Thursday, November 17: 7:00 A.M. – 8:30 A.M. (Minor adjustments only)<br/><br/><b>General Regulations:</b><br/>All display booths must be completely assembled before the exhibition floor opens to attendees at 9:00 A.M. on Thursday. [1] Exhibitors are prohibited from placing signs or literature racks in public walkways outside their rented booth boundaries. [2] Heavy machinery displays exceeding 1,000 pounds require prior authorization from convention floor engineers to verify structural load capacity. [3] Electrical cords running across walkways must be secured with approved rubber protective ramps supplied by the facility. [4] Dismantling of booths may not begin until the exhibition officially concludes at 4:30 P.M. on Friday. Early breakdown will result in a $300 penalty and forfeiture of priority booth selection for next year's expo.</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q164",
        number: 164,
        text: "What time do exhibition halls open to attendees on Thursday?",
        options: {
          A: "7:00 A.M.",
          B: "8:30 A.M.",
          C: "9:00 A.M.",
          D: "1:00 P.M."
        },
        correctAnswer: "C",
        explanation: "<p>Thông tin ghi: <i>'before the exhibition floor opens to attendees at 9:00 A.M. on Thursday'</i> => 9 giờ sáng.</p>"
      },
      {
        id: "ets22_t2_p7_q165",
        number: 165,
        text: "What special requirement applies to machinery weighing over 1,000 pounds?",
        options: {
          A: "It must be operated by union technicians",
          B: "It requires approval from floor engineers",
          C: "It must be located in the outdoor parking area",
          D: "It is covered by mandatory insurance"
        },
        correctAnswer: "B",
        explanation: "<p>Văn bản nêu: <i>'Heavy machinery displays exceeding 1,000 pounds require prior authorization from convention floor engineers'</i> => Phải có sự chấp thuận của kỹ sư mặt sàn.</p>"
      },
      {
        id: "ets22_t2_p7_q166",
        number: 166,
        text: "What consequence is mentioned for dismantling a booth early?",
        options: {
          A: "Immediate eviction from the hotel",
          B: "A $300 fine and loss of priority booth selection",
          C: "Confiscation of display equipment",
          D: "Permanent ban from all future expos"
        },
        correctAnswer: "B",
        explanation: "<p>Quy định ghi: <i>'Early breakdown will result in a $300 penalty and forfeiture of priority booth selection for next year's expo'</i>.</p>"
      },
      {
        id: "ets22_t2_p7_q167",
        number: 167,
        text: "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?<br/><i>'Failure to keep walkways clear can cause safety hazards during peak visiting hours.'</i>",
        options: {
          A: "[1]",
          B: "[2]",
          C: "[3]",
          D: "[4]"
        },
        correctAnswer: "B",
        explanation: "<p>Vị trí [2] đứng ngay sau câu cấm đặt biển báo hoặc giá sách báo ở lối đi bộ công cộng (<i>'placing signs or literature racks in public walkways'</i>). Câu điền vào giải thích lý do vì việc này gây nguy hiểm an toàn trong giờ cao điểm.</p>"
      }
    ]
  },

  // Set 9: Q168-171 (Email Exchange with Sentence Insertion)
  {
    id: "ets22_t2_p7_s09",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s09_p1",
        type: "Email",
        title: "Client Feedback",
        sender: "k.morrison@crestviewrealty.com",
        recipient: "sales@cloudpulse.io",
        date: "May 19",
        content: "<p><b>To:</b> CloudPulse Software Sales &lt;sales@cloudpulse.io&gt;<br/><b>From:</b> Kevin Morrison &lt;k.morrison@crestviewrealty.com&gt;<br/><b>Date:</b> May 19<br/><b>Subject:</b> Enterprise CRM Deployment Review</p><p>Dear CloudPulse Support Team,</p><p>Our real estate brokerage completed our six-month evaluation of your CloudPulse CRM enterprise platform last week. Overall, our sixty agents have experienced significant productivity improvements. [1] The automated document generation module and electronic signing capabilities have reduced paperwork turnaround time by nearly forty percent.</p><p>However, we have encountered persistent latency when loading property photo galleries on mobile devices. [2] In the field, agents frequently need to present high-resolution images to buyers on tablets during open houses. [3] When image rendering stalls, it reflects poorly on our agency's professionalism. [4]</p><p>We are eager to renew our annual enterprise subscription in July, provided this mobile performance issue can be addressed. Could someone from your mobile engineering division contact our technical coordinator, Priya Patel, to explore optimization strategies or server caching settings?</p><p>Sincerely,<br/>Kevin Morrison<br/>Chief Operating Officer, Crestview Realty</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q168",
        number: 168,
        text: "What feature of CloudPulse CRM does Mr. Morrison praise?",
        options: {
          A: "Video conference integration",
          B: "Automated document generation and e-signing",
          C: "Employee payroll tracking",
          D: "Social media advertising tools"
        },
        correctAnswer: "B",
        explanation: "<p>Mr. Morrison khen ngợi: <i>'The automated document generation module and electronic signing capabilities have reduced paperwork turnaround time'</i> => Tính năng tạo tài liệu tự động và ký điện tử.</p>"
      },
      {
        id: "ets22_t2_p7_q169",
        number: 169,
        text: "What difficulty have agents experienced?",
        options: {
          A: "Passwords expiring too quickly",
          B: "Slow loading of property images on mobile tablets",
          C: "Accidental deletion of client files",
          D: "High monthly subscription fees"
        },
        correctAnswer: "B",
        explanation: "<p>Bức thư nêu vấn đề: <i>'persistent latency when loading property photo galleries on mobile devices'</i> => Tốc độ tải ảnh bất động sản chậm trên thiết bị di động.</p>"
      },
      {
        id: "ets22_t2_p7_q170",
        number: 170,
        text: "Who should the CloudPulse engineering team reach out to?",
        options: {
          A: "Kevin Morrison",
          B: "Priya Patel",
          C: "David Lin",
          D: "Elena Rostova"
        },
        correctAnswer: "B",
        explanation: "<p>Thư viết: <i>'contact our technical coordinator, Priya Patel'</i> => Liên hệ bà Priya Patel.</p>"
      },
      {
        id: "ets22_t2_p7_q171",
        number: 171,
        text: "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?<br/><i>'Fast access to visual media is therefore critical to our daily sales interactions.'</i>",
        options: {
          A: "[1]",
          B: "[2]",
          C: "[3]",
          D: "[4]"
        },
        correctAnswer: "C",
        explanation: "<p>Vị trí [3] đứng ngay sau câu mô tả môi trường thực tế khi môi giới trình chiếu hình ảnh độ phân giải cao cho người mua nhà (<i>'present high-resolution images to buyers on tablets'</i>). Câu chèn vào tổng kết rằng việc tiếp cận nhanh hình ảnh thị giác là rất quan trọng.</p>"
      }
    ]
  },

  // Set 10: Q172-175 (Company Newsletter)
  {
    id: "ets22_t2_p7_s10",
    type: "Single Passage",
    passages: [
      {
        id: "ets22_t2_p7_s10_p1",
        type: "Article",
        title: "Company Spotlight",
        content: "<p><b>OAKWOOD PHARMACEUTICALS EMPLOYEE SPOTLIGHT</b><br/><i>Volume 18 | Issue 4 | October Edition</i><br/><br/>This month, Oakwood Pharmaceuticals proudly spotlights Dr. Sunita Rao, Principal Research Scientist in our Oncology Discovery Unit. Dr. Rao recently celebrated her tenth anniversary with Oakwood and was honored with the prestigious 2026 Biotechnology Innovation Medal at the European Medicinal Chemistry Congress in Vienna.<br/><br/>During her tenure, Dr. Rao has spearheaded twelve research initiatives and holds seven international patents on targeted drug delivery mechanisms. Her latest project, which focuses on utilizing biodegradable nanoparticle carriers to deliver therapeutic compounds directly to affected cells, has successfully advanced into Phase II human clinical trials.<br/><br/>Beyond her scientific achievements, Dr. Rao is passionate about mentoring the next generation of researchers. She coordinates Oakwood's Summer STEM Fellowship, welcoming eight university undergraduates each year for twelve weeks of immersive laboratory research. 'Mentorship is about providing young scientists with the confidence to test ambitious hypotheses,' Dr. Rao remarked.<br/><br/>Outside the lab, Dr. Rao is an avid distance runner and will participate in the Boston Marathon this coming April. Please join us in congratulating Dr. Rao on her extraordinary accomplishments!</p>"
      }
    ],
    questions: [
      {
        id: "ets22_t2_p7_q172",
        number: 172,
        text: "What milestone did Dr. Rao recently celebrate?",
        options: {
          A: "Her promotion to chief executive officer",
          B: "Her tenth anniversary with Oakwood Pharmaceuticals",
          C: "Her retirement from laboratory research",
          D: "Her graduation from medical school"
        },
        correctAnswer: "B",
        explanation: "<p>Bản tin ghi: <i>'Dr. Rao recently celebrated her tenth anniversary with Oakwood'</i> => Kỷ niệm 10 năm công tác tại công ty.</p>"
      },
      {
        id: "ets22_t2_p7_q173",
        number: 173,
        text: "What award did Dr. Rao receive in Vienna?",
        options: {
          A: "The Biotechnology Innovation Medal",
          B: "The Young Scientist Fellowship",
          C: "The Global Green Enterprise Award",
          D: "The International Mentor Prize"
        },
        correctAnswer: "A",
        explanation: "<p>Bài viết nêu: <i>'honored with the prestigious 2026 Biotechnology Innovation Medal... in Vienna'</i>.</p>"
      },
      {
        id: "ets22_t2_p7_q174",
        number: 174,
        text: "What does Dr. Rao do as coordinator of the Summer STEM Fellowship?",
        options: {
          A: "She manages corporate grant donations",
          B: "She mentors university undergraduates in laboratory research",
          C: "She drafts university chemistry textbooks",
          D: "She recruits executive board members"
        },
        correctAnswer: "B",
        explanation: "<p>Bài viết nêu: <i>'welcoming eight university undergraduates each year for twelve weeks of immersive laboratory research'</i> => Hướng dẫn nghiên cứu sinh viên đại học.</p>"
      },
      {
        id: "ets22_t2_p7_q175",
        number: 175,
        text: "What personal hobby of Dr. Rao is mentioned?",
        options: {
          A: "Landscape photography",
          B: "Distance running",
          C: "Gourmet cooking",
          D: "Mountain climbing"
        },
        correctAnswer: "B",
        explanation: "<p>Cuối bài viết nhắc đến: <i>'avid distance runner and will participate in the Boston Marathon'</i> => Chạy cự ly dài (distance running).</p>"
      }
    ]
  }
];
