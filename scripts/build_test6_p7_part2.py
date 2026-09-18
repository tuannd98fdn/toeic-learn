import json

part2_sets = [
    # Set 7: Q162 - Q165 (Text Message Chain)
    {
        "id": "ets22_t6_p7_s07",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s07_p1",
                "type": "Text Message Chain",
                "title": "Text Message Chain",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; background: var(--bg-card, #fafafa);'>"
                           "<p><b>Isabelle Porter (8:15 A.M.):</b> Hi. Our new intern, Mila Erben, arrives tomorrow. Do you have any tasks for Mila to start on?</p>"
                           "<p><b>Omar Shirani (8:16 A.M.):</b> I’m really sorry. I was out of the office last week at the JNTD Convention. Can I get back to you later today?</p>"
                           "<p><b>Rico Alvarez (8:16 A.M.):</b> I don’t have anything for Mila right now.</p>"
                           "<p><b>Isabelle Porter (8:17 A.M.):</b> I’m confused. Your department manager mentioned that your team would greatly benefit from having an intern. Can you work together to find something for her to do?</p>"
                           "<p><b>Omar Shirani (8:17 A.M.):</b> Can you remind us what she’s studying at the university?</p>"
                           "<p><b>Isabelle Porter (8:18 A.M.):</b> Accounting. Her resume says she’d like to become an auditor.</p>"
                           "<p><b>Rico Alvarez (8:19 A.M.):</b> Well, I might have a few tasks, although they may be a bit dull.</p>"
                           "<p><b>Isabelle Porter (8:20 A.M.):</b> That will do. And I might have some documents for her to copy. That ought to be enough for Mila’s first week. But I’d appreciate it if you could meet with your team by Thursday and organize additional tasks for Mila for next week.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_162",
                "number": 162,
                "text": "What is suggested about Ms. Erben?",
                "options": {
                    "A": "She is an accountant.",
                    "B": "She is a department manager.",
                    "C": "She is a convention planner.",
                    "D": "She is a student."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được gợi ý về cô Erben?<br/>(A) Cô ấy là một kế toán viên.<br/>(B) Cô ấy là một trưởng phòng.<br/>(C) Cô ấy là người lập kế hoạch hội nghị.<br/>(D) Cô ấy là một sinh viên (She is a student).</p><p><b>Bằng chứng trích dẫn:</b> Ông Shirani hỏi: <i>'Can you remind us what she’s studying at the university?'</i> (nhắc lại xem cô ấy đang học ngành gì ở trường đại học) và cô Porter đáp: <i>'Accounting. Her resume says she’d like to become an auditor.'</i> Do đó cô ấy hiện là sinh viên thực tập (intern) <b>(D)</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Chi tiết 'what she's studying at the university' chứng minh cô ấy là sinh viên."
            },
            {
                "id": "ets22_t6_p7_163",
                "number": 163,
                "text": "What did Mr. Shirani do last week?",
                "options": {
                    "A": "Attend a convention",
                    "B": "Work at a branch office",
                    "C": "Take a vacation",
                    "D": "Start a new job"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Ông Shirani đã làm gì vào tuần trước?<br/>(A) Tham dự một hội nghị (Attend a convention).<br/>(B) Làm việc tại một văn phòng chi nhánh.<br/>(C) Đi nghỉ phép.<br/>(D) Bắt đầu một công việc mới.</p><p><b>Bằng chứng trích dẫn:</b> Lúc 8:16 A.M., ông Shirani giải thích: <i>'I was out of the office last week at the JNTD Convention.'</i> (Tôi vắng mặt ở văn phòng tuần trước vì dự Hội nghị JNTD). Chọn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "'at the JNTD Convention' = 'Attend a convention'."
            },
            {
                "id": "ets22_t6_p7_164",
                "number": 164,
                "text": "At 8:20 A.M., what does Ms. Porter most likely mean when she writes, “That will do”?",
                "options": {
                    "A": "She will complete a project by herself.",
                    "B": "She thinks the work will take two weeks to do.",
                    "C": "She agrees with the idea Mr. Alvarez proposed.",
                    "D": "She will give Mr. Shirani more information later."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Lúc 8:20 A.M., cô Porter có ý gì khi viết 'That will do'?<br/>(A) Cô ấy sẽ tự mình hoàn thành một dự án.<br/>(B) Cô ấy nghĩ công việc sẽ mất hai tuần để làm.<br/>(C) Cô ấy đồng ý với ý kiến mà ông Alvarez đề xuất (She agrees with the idea Mr. Alvarez proposed).<br/>(D) Cô ấy sẽ cung cấp thêm thông tin cho ông Shirani sau.</p><p><b>Bằng chứng trích dẫn:</b> Trước đó ông Alvarez vừa nói: <i>'Well, I might have a few tasks, although they may be a bit dull.'</i> (Tôi có thể có một vài việc, dù có thể hơi nhàm chán). Cô Porter phản hồi ngay: <i>'That will do'</i> (Như vậy là được rồi/ổn rồi), đồng ý tiếp nhận những đầu việc mà ông Alvarez vừa đề xuất. Chọn <b>(C)</b>.</p>",
                "questionType": "Inference / Text Message",
                "subCategory": "Inference",
                "strategyHint": "'That will do' là thành ngữ đồng ý chấp nhận phương án vừa được đưa ra."
            },
            {
                "id": "ets22_t6_p7_165",
                "number": 165,
                "text": "What does Ms. Porter ask the writers to do before Thursday?",
                "options": {
                    "A": "Hire an intern",
                    "B": "Copy documents",
                    "C": "Send her an e-mail",
                    "D": "Plan a set of tasks"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Porter yêu cầu những người tham gia đoạn chat làm gì trước thứ Năm?<br/>(A) Thuê một thực tập sinh.<br/>(B) Photo tài liệu.<br/>(C) Gửi email cho cô ấy.<br/>(D) Lên kế hoạch cho một tập hợp nhiệm vụ (Plan a set of tasks).</p><p><b>Bằng chứng trích dẫn:</b> Cô Porter dặn ở cuối: <i>'But I’d appreciate it if you could meet with your team by Thursday and organize additional tasks for Mila for next week.'</i> (họp nhóm trước thứ Năm và sắp xếp các nhiệm vụ bổ sung). <i>organize tasks = plan a set of tasks</i>. Chọn <b>(D)</b>.</p>",
                "questionType": "Request / Action",
                "subCategory": "Action",
                "strategyHint": "'organize additional tasks' tương đương 'plan a set of tasks'."
            }
        ]
    },

    # Set 8: Q166 - Q168 (Email)
    {
        "id": "ets22_t6_p7_s08",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s08_p1",
                "type": "Email",
                "title": "Email Message",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>From:</b> Vera Fernandez &lt;vfernandez@dolinafoundation.org&gt;<br/>"
                           "<b>To:</b> Carla Rosa<br/>"
                           "<b>Sent:</b> June 07, 12:47 P.M.<br/>"
                           "<b>Subject:</b> Initiatives for distance learning</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #ccc); margin: 12px 0;'/>"
                           "<p>Dear Ms. Rosa,</p>"
                           "<p>I am contacting you on behalf of the Dolina Foundation. Our mission is to promote the use of distance-learning platforms in rural areas and communities that are isolated geographically. We do so through a network of partners in the technology industry. We would be honored to have your company join our network.</p>"
                           "<p>At 2:00 P.M. on June 25, Dolina is sponsoring a presentation entitled “Distance Learning in Rural Libraries.” The presentation will be given online as a webinar, using some of the technologies our partners have developed. Jay Ralston, the foundation’s director of systems integration, will describe technologies being used to support academic and vocational education programs. In addition, five librarians will discuss how they offer a variety of education programs in their regions using technologies developed and delivered by our business partners. To register for the webinar, and to learn more about our foundation’s projects, visit our Web site at www.dolinafoundation.org.</p>"
                           "<p>Feel free to contact me if you have any questions. We hope that you will consider our invitation.</p>"
                           "<p>With kind regards,<br/>"
                           "Vera Fernandez, Outreach Coordinator</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_166",
                "number": 166,
                "text": "What does the Dolina Foundation do?",
                "options": {
                    "A": "Sell software to schools",
                    "B": "Print textbooks used in schools",
                    "C": "Use technology to support learning",
                    "D": "Build libraries in large cities"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Quỹ Dolina Foundation làm công việc gì?<br/>(A) Bán phần mềm cho các trường học.<br/>(B) In sách giáo khoa dùng trong trường học.<br/>(C) Sử dụng công nghệ để hỗ trợ việc học tập (Use technology to support learning).<br/>(D) Xây dựng thư viện ở các thành phố lớn.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 nêu rõ sứ mệnh: <i>'Our mission is to promote the use of distance-learning platforms in rural areas... through a network of partners in the technology industry.'</i> (thúc đẩy sử dụng các nền tảng học từ xa thông qua đối tác công nghệ). Do đó tổ chức này ứng dụng công nghệ để hỗ trợ học tập <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Overview",
                "strategyHint": "'promote the use of distance-learning platforms' = 'Use technology to support learning'."
            },
            {
                "id": "ets22_t6_p7_167",
                "number": 167,
                "text": "What is Ms. Rosa asked to do?",
                "options": {
                    "A": "Approve a grant",
                    "B": "Participate in a webinar",
                    "C": "Apply for a job opening",
                    "D": "Visit some libraries"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Rosa được mời làm gì?<br/>(A) Phê duyệt một khoản tài trợ.<br/>(B) Tham gia một hội thảo trực tuyến (Participate in a webinar).<br/>(C) Ứng tuyển vào một vị trí tuyển dụng.<br/>(D) Đến thăm một số thư viện.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 giới thiệu buổi hội thảo trực tuyến ngày 25/6 và hướng dẫn: <i>'To register for the webinar, and to learn more about our foundation’s projects, visit our Web site... We hope that you will consider our invitation.'</i> (đăng ký tham gia webinar). Chọn <b>(B)</b>.</p>",
                "questionType": "Request / Invitation",
                "subCategory": "Action",
                "strategyHint": "'register for the webinar... consider our invitation' = 'Participate in a webinar'."
            },
            {
                "id": "ets22_t6_p7_168",
                "number": 168,
                "text": "Who most likely is Ms. Fernandez?",
                "options": {
                    "A": "A student in a foundation program",
                    "B": "An executive at a technology firm",
                    "C": "A researcher at a rural library",
                    "D": "An employee of the foundation"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Fernandez nhiều khả năng là ai?<br/>(A) Một sinh viên trong chương trình của quỹ.<br/>(B) Một giám đốc tại một công ty công nghệ.<br/>(C) Một nhà nghiên cứu tại thư viện nông thôn.<br/>(D) Một nhân viên của quỹ (An employee of the foundation).</p><p><b>Bằng chứng trích dẫn:</b> Cuối thư cô Fernandez ký tên với chức danh: <i>'Vera Fernandez, Outreach Coordinator'</i> (Điều phối viên tiếp cận cộng đồng) và mở đầu thư: <i>'I am contacting you on behalf of the Dolina Foundation.'</i> Do đó cô ấy là nhân viên của quỹ Dolina <b>(D)</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview",
                "strategyHint": "Chức danh 'Outreach Coordinator' của Dolina Foundation."
            }
        ]
    },

    # Set 9: Q169 - Q171 (Letter)
    {
        "id": "ets22_t6_p7_s09",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s09_p1",
                "type": "Letter",
                "title": "Letter",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>29 July</b></p>"
                           "<p>Shari MacCauley<br/>"
                           "103 Easton Lane<br/>"
                           "Tomintoul, Ballindalloch AB37 9EX</p>"
                           "<p>Dear Ms. MacCauley,</p>"
                           "<p>It was a privilege to stay in your home during the week of 22 July as part of the Scottish Connections home exchange program.</p>"
                           "<p>The location was the perfect setting for our family gathering. My daughter and son-in-law relished the peace and quiet of the village, while their children enjoyed playing in the wide-open space behind your home. And my husband was quite pleased with the large-screen television set in the living room.</p>"
                           "<p>It was very thoughtful of you to provide so many extra blankets. We did not expect it to be so cold at night in July.</p>"
                           "<p>As I said in the note I left on your dining room table on 25 July, the day of my wedding anniversary party, the lid of your food processor cracked as we were preparing our meal. We ordered a replacement lid that same day, which should be delivered to your home soon, assuming it hasn’t been already. I sincerely apologize for the mishap.</p>"
                           "<p>I hope that you and your friends enjoyed our apartment here in Aberdeen just as much as we enjoyed your mountain home. If so, we hope you will be willing to exchange homes with us again in the future.</p>"
                           "<p>Sincerely,<br/>"
                           "Clara Brinwall</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_169",
                "number": 169,
                "text": "What is a purpose of the letter?",
                "options": {
                    "A": "To explain a family tradition",
                    "B": "To confirm that a package was received",
                    "C": "To express appreciation for a house",
                    "D": "To outline the benefits of taking vacation"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của bức thư là gì?<br/>(A) Để giải thích một truyền thống gia đình.<br/>(B) Để xác nhận rằng một gói hàng đã được nhận.<br/>(C) Để bày tỏ sự cảm kích đối với một ngôi nhà (To express appreciation for a house).<br/>(D) Để vạch ra những lợi ích của việc đi nghỉ mát.</p><p><b>Bằng chứng trích dẫn:</b> Toàn bộ bức thư của bà Clara Brinwall gửi để cảm ơn về kỳ nghỉ tuyệt vời tại nhà của bà MacCauley trong chương trình trao đổi nhà: <i>'It was a privilege to stay in your home... The location was the perfect setting for our family gathering... It was very thoughtful of you...'</i>. Chọn <b>(C)</b>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "Bức thư cảm ơn và khen ngợi các tiện nghi của ngôi nhà trong chuyến trao đổi nhà."
            },
            {
                "id": "ets22_t6_p7_170",
                "number": 170,
                "text": "What happened on July 25?",
                "options": {
                    "A": "An item was damaged.",
                    "B": "An order was delivered.",
                    "C": "An event was catered.",
                    "D": "A wedding was held."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì đã xảy ra vào ngày 25 tháng 7?<br/>(A) Một món đồ đã bị hỏng (An item was damaged).<br/>(B) Một đơn hàng đã được giao.<br/>(C) Một sự kiện được phục vụ tiệc.<br/>(D) Một đám cưới đã được tổ chức.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 4 nêu rõ: <i>'As I said in the note I left on your dining room table on 25 July, the day of my wedding anniversary party, the lid of your food processor cracked as we were preparing our meal.'</i> (nắp máy xay thực phẩm bị nứt/vỡ). Do đó một món đồ đã bị hư hỏng <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "'the lid of your food processor cracked' = 'An item was damaged'."
            },
            {
                "id": "ets22_t6_p7_171",
                "number": 171,
                "text": "What is suggested about Ms. MacCauley?",
                "options": {
                    "A": "She heads the home exchange program.",
                    "B": "She lives in a mountainous area.",
                    "C": "She is a relative of Ms. Brinwall’s.",
                    "D": "She plans to move to Aberdeen."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được gợi ý về bà MacCauley?<br/>(A) Bà ấy đứng đầu chương trình trao đổi nhà.<br/>(B) Bà ấy sống ở một khu vực miền núi (She lives in a mountainous area).<br/>(C) Bà ấy là họ hàng của bà Brinwall.<br/>(D) Bà ấy dự định chuyển đến Aberdeen.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn cuối bức thư viết: <i>'I hope that you and your friends enjoyed our apartment here in Aberdeen just as much as we enjoyed your mountain home.'</i> (ngôi nhà trên núi của bạn). Do đó bà MacCauley sống ở vùng miền núi <b>(B)</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Cụm 'your mountain home' chỉ ra bà MacCauley sống ở khu vực miền núi."
            }
        ]
    },

    # Set 10: Q172 - Q175 (Email)
    {
        "id": "ets22_t6_p7_s10",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s10_p1",
                "type": "Email",
                "title": "Email Message",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>To:</b> Hien Pham &lt;hpham@ngoc.com&gt;<br/>"
                           "<b>From:</b> Theresa Griffin &lt;tgriffin@throngsoftware.com&gt;<br/>"
                           "<b>Subject:</b> Information<br/>"
                           "<b>Date:</b> September 20</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #ccc); margin: 12px 0;'/>"
                           "<p>Dear Mr. Pham:</p>"
                           "<p>Welcome to Throng Software. We are pleased that you are joining the company. On your first day of work, Monday, October 3, please report to building 14 at 8:45 A.M. You can check in at the front desk, where you will be given a temporary ID badge. I will meet you there, show you to your office, and then take you on a tour of the building to introduce you to your colleagues. You will then go to Information Technology (IT) to receive your laptop, passwords, and security information. When you are finished, someone will guide you to Human Resources in building 12 so you can fill out payroll and benefits forms.</p>"
                           "<p>Please join me and several colleagues at 11:30 A.M. We will take you to one of our favorite restaurants near the office. The rest of the afternoon will be free for you to get settled into your office and review the information you receive during the day. I will stop by your office later in the day to make sure you know where all the office equipment is.</p>"
                           "<p>I look forward to seeing you then.</p>"
                           "<p>Sincerely,<br/>"
                           "Theresa Griffin<br/>"
                           "Human Resources, Throng Software</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_172",
                "number": 172,
                "text": "What will happen on October 3?",
                "options": {
                    "A": "New laptops will be issued to employees.",
                    "B": "A luncheon will be held in the cafeteria.",
                    "C": "Tours of a renovated building will be given.",
                    "D": "A new employee will start work."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì sẽ xảy ra vào ngày 3 tháng 10?<br/>(A) Máy tính xách tay mới sẽ được cấp cho nhân viên.<br/>(B) Một bữa ăn trưa sẽ được tổ chức trong căng tin.<br/>(C) Các chuyến tham quan tòa nhà mới cải tạo sẽ được tổ chức.<br/>(D) Một nhân viên mới sẽ bắt đầu đi làm (A new employee will start work).</p><p><b>Bằng chứng trích dẫn:</b> Thư mở đầu: <i>'Welcome to Throng Software. We are pleased that you are joining the company. On your first day of work, Monday, October 3...'</i> (ngày làm việc đầu tiên của bạn là thứ Hai, ngày 3 tháng 10). Do đó nhân viên mới bắt đầu đi làm <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Overview",
                "strategyHint": "Cụm 'On your first day of work, Monday, October 3'."
            },
            {
                "id": "ets22_t6_p7_173",
                "number": 173,
                "text": "Where will Mr. Pham complete some documents?",
                "options": {
                    "A": "In building 12",
                    "B": "In building 14",
                    "C": "In his office",
                    "D": "In the IT office"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Ông Phạm sẽ hoàn thành một số giấy tờ/tài liệu ở đâu?<br/>(A) Tại tòa nhà 12 (In building 12).<br/>(B) Tại tòa nhà 14.<br/>(C) Trong văn phòng của ông ấy.<br/>(D) Trong phòng IT.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 nêu rõ: <i>'someone will guide you to Human Resources in building 12 so you can fill out payroll and benefits forms.'</i> (điền các mẫu đơn bảng lương và phúc lợi tại tòa nhà 12). Chọn <b>(A)</b>.</p>",
                "questionType": "Location",
                "subCategory": "Detail",
                "strategyHint": "Cụm 'Human Resources in building 12 so you can fill out payroll and benefits forms'."
            },
            {
                "id": "ets22_t6_p7_174",
                "number": 174,
                "text": "The word “rest” in paragraph 2, line 2, is closest in meaning to",
                "options": {
                    "A": "majority",
                    "B": "remainder",
                    "C": "break",
                    "D": "purpose"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Từ 'rest' trong đoạn 2, dòng 2 gần nghĩa nhất với từ nào?<br/>(A) phần lớn.<br/>(B) phần còn lại (remainder).<br/>(C) sự nghỉ ngơi.<br/>(D) mục đích.</p><p><b>Phân tích ngữ cảnh:</b> Trong câu <i>'The rest of the afternoon will be free for you to get settled into your office'</i>, cụm <i>the rest of the afternoon</i> có nghĩa là phần thời gian còn lại của buổi chiều. Từ đồng nghĩa chính xác là <b>(B) remainder</b> (phần còn lại).</p>",
                "questionType": "Vocabulary in Context",
                "subCategory": "Vocabulary",
                "strategyHint": "the rest of... = the remainder of... (phần còn lại)."
            },
            {
                "id": "ets22_t6_p7_175",
                "number": 175,
                "text": "What will Mr. Pham do in the afternoon?",
                "options": {
                    "A": "Test some equipment",
                    "B": "Visit Ms. Griffin’s office",
                    "C": "Review some project proposals",
                    "D": "Learn where equipment is located"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Ông Phạm sẽ làm gì vào buổi chiều?<br/>(A) Thử nghiệm một số thiết bị.<br/>(B) Đến thăm văn phòng của cô Griffin.<br/>(C) Xem xét một số đề xuất dự án.<br/>(D) Tìm hiểu xem các thiết bị được đặt ở đâu (Learn where equipment is located).</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 cho biết: <i>'I will stop by your office later in the day to make sure you know where all the office equipment is.'</i> (cô Griffin sẽ ghé phòng vào cuối ngày để đảm bảo ông Phạm biết nơi để các thiết bị văn phòng). Chọn <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "make sure you know where all the office equipment is = learn where equipment is located."
            }
        ]
    },

    # Set 11: Q176 - Q180 (Double Passage: Review and Letter)
    {
        "id": "ets22_t6_p7_s11",
        "type": "Double Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s11_p1",
                "type": "Customer Review",
                "title": "Online Review",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h4 style='margin-top: 0;'>Calbo Cuts</h4>"
                           "<p>My visit to Calbo Cuts as a first-time customer was disappointing. When I arrived, the sign on the door said “Walk-ins welcome,” but the receptionist bluntly told me that I would need to wait about an hour for my haircut, even though only one other customer was in the shop and three stylists were there. The quality of the work was fine; the haircut was fairly priced at just $15, and I was happy with my standard men’s cut. The stylist, though, cut my hair without saying a word. I understand that not everyone likes to make small talk, but I found my stylist’s total silence to be rude. When she finished my haircut, she removed the haircutting cape without even offering to blow-dry my hair.</p>"
                           "<p><i>—Martin Silver, Bishopville</i></p>"
                           "</div>"
            },
            {
                "id": "ets22_t6_p7_s11_p2",
                "type": "Letter",
                "title": "Letter",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<p style='text-align: center; font-size: 0.9rem; color: #555;'>Calbo Cuts • 678 Seventh Street • Lamar, South Carolina • 29069</p>"
                           "<p>Martin Silver<br/>"
                           "51 Oak Street<br/>"
                           "Bishopville, South Carolina 29010</p>"
                           "<p>Dear Mr. Silver,</p>"
                           "<p>Thank you for taking the time to leave us a review. We always try to provide the best service available. If you feel that any of our staff were unaccommodating or unprofessional, then I would like to hear more details regarding your complaint. Feel free to call me directly at 803-555-0110.</p>"
                           "<p>At Calbo Cuts, we are serious about earning your continued business. I would be happy to schedule an appointment for you for a haircut and blow-dry with Marissa Lopez, as I believe she can provide you with the haircut experience you are looking for. In addition, on your next visit to Calbo Cuts, we would like to offer you a complimentary bottle of our all-natural shampoo, one of our best-selling products.</p>"
                           "<p>We hope you will come back to Calbo Cuts in the future whenever you need a trim.</p>"
                           "<p>Best regards,<br/>"
                           "Jenna Makowski<br/>"
                           "Owner, Calbo Cuts</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_176",
                "number": 176,
                "text": "According to the review, what is suggested about Mr. Silver?",
                "options": {
                    "A": "He was late for an appointment.",
                    "B": "He did not ask for a standard haircut.",
                    "C": "He has been to Calbo Cuts only once.",
                    "D": "He did not see a sign on the door."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo bài đánh giá, điều gì được gợi ý về ông Silver?<br/>(A) Ông ấy đến muộn trong một cuộc hẹn.<br/>(B) Ông ấy không yêu cầu cắt tóc kiểu tiêu chuẩn.<br/>(C) Ông ấy mới chỉ đến Calbo Cuts một lần duy nhất (He has been to Calbo Cuts only once).<br/>(D) Ông ấy không nhìn thấy biển báo trên cửa.</p><p><b>Bằng chứng trích dẫn:</b> Câu mở đầu bài đánh giá ghi: <i>'My visit to Calbo Cuts as a first-time customer was disappointing.'</i> (Chuyến đến Calbo Cuts của tôi với tư cách là khách hàng lần đầu). Do đó ông ấy mới chỉ đến tiệm một lần <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "first-time customer = has been to Calbo Cuts only once."
            },
            {
                "id": "ets22_t6_p7_177",
                "number": 177,
                "text": "What aspect of his experience at Calbo Cuts disappointed Mr. Silver?",
                "options": {
                    "A": "The price",
                    "B": "The location",
                    "C": "The shop hours",
                    "D": "The customer service"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Khía cạnh nào trong trải nghiệm tại Calbo Cuts khiến ông Silver thất vọng?<br/>(A) Giá cả.<br/>(B) Vị trí.<br/>(C) Giờ mở cửa tiệm.<br/>(D) Dịch vụ khách hàng / thái độ phục vụ (The customer service).</p><p><b>Bằng chứng trích dẫn:</b> Ông Silver khen giá rẻ ($15) và chất lượng tóc cắt ổn, nhưng bức xúc vì lễ tân cộc cằn bắt chờ 1 tiếng dù quán vắng, và thợ cắt tóc im lặng tuyệt đối không nói lời nào cũng như không thèm sấy tóc (<i>receptionist bluntly told me... stylist's total silence to be rude... without even offering to blow-dry</i>). Tất cả đều là vấn đề dịch vụ khách hàng <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Các phàn nàn về thái độ lễ tân và thợ cắt tóc thuộc về 'customer service'."
            },
            {
                "id": "ets22_t6_p7_178",
                "number": 178,
                "text": "Why did Ms. Makowski suggest that Mr. Silver contact her?",
                "options": {
                    "A": "To change an appointment",
                    "B": "To provide additional details",
                    "C": "To arrange a personal meeting",
                    "D": "To update contact information"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao bà Makowski đề nghị ông Silver liên hệ với bà ấy?<br/>(A) Để đổi lịch hẹn.<br/>(B) Để cung cấp thêm chi tiết (To provide additional details).<br/>(C) Để sắp xếp một cuộc gặp mặt cá nhân.<br/>(D) Để cập nhật thông tin liên lạc.</p><p><b>Bằng chứng trích dẫn:</b> Trong thư, chủ tiệm viết: <i>'If you feel that any of our staff were unaccommodating or unprofessional, then I would like to hear more details regarding your complaint. Feel free to call me directly at 803-555-0110.'</i> (Tôi muốn nghe thêm thông tin chi tiết về lời phàn nàn của bạn). Chọn <b>(B)</b>.</p>",
                "questionType": "Reason",
                "subCategory": "Detail",
                "strategyHint": "'hear more details regarding your complaint' = 'provide additional details'."
            },
            {
                "id": "ets22_t6_p7_179",
                "number": 179,
                "text": "What is suggested about Ms. Lopez?",
                "options": {
                    "A": "She takes a full hour to give a haircut.",
                    "B": "She does not accept walk-in customers.",
                    "C": "She is now the most popular stylist.",
                    "D": "She enjoys talking to customers."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được gợi ý về cô Lopez?<br/>(A) Cô ấy mất đúng một giờ để cắt tóc.<br/>(B) Cô ấy không nhận khách vãng lai không đặt trước.<br/>(C) Cô ấy hiện là nhà tạo mẫu tóc nổi tiếng nhất.<br/>(D) Cô ấy thích trò chuyện với khách hàng (She enjoys talking to customers).</p><p><b>Bằng chứng trích dẫn chéo:</b> Ở văn bản 1, ông Silver phàn nàn rằng thợ cắt tóc im lặng suốt từ đầu đến cuối không hề trò chuyện (<i>not everyone likes to make small talk, but I found my stylist's total silence to be rude</i>). Ở văn bản 2, bà chủ tiệm gợi ý đặt lịch với Marissa Lopez vì: <i>'I believe she can provide you with the haircut experience you are looking for'</i> (trải nghiệm thân thiện, có trò chuyện vui vẻ mà ông tìm kiếm). Do đó cô Lopez là người thích giao tiếp, trò chuyện với khách <b>(D)</b>.</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "Liên kết chi tiết khách muốn 'make small talk' và lời khuyên đặt lịch với cô Lopez để có trải nghiệm mong muốn."
            },
            {
                "id": "ets22_t6_p7_180",
                "number": 180,
                "text": "What will Mr. Silver receive for free on his next visit to Calbo Cuts?",
                "options": {
                    "A": "A bottle of shampoo",
                    "B": "A haircut",
                    "C": "A blow-dry",
                    "D": "A new product"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Ông Silver sẽ nhận được gì miễn phí trong lần ghé thăm tiếp theo tại Calbo Cuts?<br/>(A) Một chai dầu gội đầu (A bottle of shampoo).<br/>(B) Một lần cắt tóc.<br/>(C) Một lần sấy tóc.<br/>(D) Một sản phẩm mới.</p><p><b>Bằng chứng trích dẫn:</b> Bà chủ tiệm viết: <i>'we would like to offer you a complimentary bottle of our all-natural shampoo'</i> (tặng một chai dầu gội tự nhiên miễn phí, <i>complimentary = for free</i>). Chọn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "'complimentary bottle of our all-natural shampoo' = 'A bottle of shampoo for free'."
            }
        ]
    },

    # Set 12: Q181 - Q185 (Double Passage: Article and Email)
    {
        "id": "ets22_t6_p7_s12",
        "type": "Double Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s12_p1",
                "type": "Article",
                "title": "Business Happenings",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0;'>Business Happenings</h3>"
                           "<p style='color: #666; font-style: italic;'>By Harriet Mellors</p>"
                           "<p><b>LONDON (1 April)</b>—It is often hard for managers or team leaders to learn the best way to give feedback to employees and colleagues. Sarnia Bishara’s new book, <i>Facts on Feedback</i> (Fox Mill Press), offers advice on this subject. Ms. Bishara is an expert consultant on company management problems and solutions. She advises managers to give facts and reactions, rather than advice and criticism.</p>"
                           "<p>Ms. Bishara will be speaking at Stonecliff Bookstore on Monday, 6 April at 2:00 P.M. For more details, visit www.stonecliff.co.uk.</p>"
                           "</div>"
            },
            {
                "id": "ets22_t6_p7_s12_p2",
                "type": "Email",
                "title": "Email Message",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<p><b>To:</b> Oscar Burton &lt;oburton@harstonindustries.com.hk&gt;<br/>"
                           "<b>From:</b> Mi-Sook Pan &lt;mpan@harstonindustries.kr&gt;<br/>"
                           "<b>Subject:</b> Suggestion<br/>"
                           "<b>Date:</b> 10 April</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #ccc); margin: 12px 0;'/>"
                           "<p>Hello Oscar,</p>"
                           "<p>I understand that we have not yet booked all of the workshop leaders for our upcoming professional development program at the Onyx Hotel. I was in London a few days ago working on the Phillips account. While there, on 6 April, I had a chance to meet Sarnia Bishara and hear her speak on the topic of her new book, <i>Facts on Feedback</i>. I believe she would be an excellent choice to lead one of our workshops. I will gather further details about Ms. Bishara’s background and availability and send that to you shortly. I look forward to joining you during Thursday's teleconference planning meeting.</p>"
                           "<p>Sincerely,<br/>"
                           "Mi-Sook Pan</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_181",
                "number": 181,
                "text": "In the article, the word “hard” in paragraph 1, line 1, is closest in meaning to",
                "options": {
                    "A": "durable",
                    "B": "difficult",
                    "C": "solid",
                    "D": "true"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Trong bài báo, từ 'hard' trong đoạn 1, dòng 1 gần nghĩa nhất với từ nào?<br/>(A) bền bỉ.<br/>(B) khó khăn (difficult).<br/>(C) rắn chắc.<br/>(D) đúng, thật.</p><p><b>Phân tích ngữ cảnh:</b> Câu văn viết: <i>'It is often hard for managers or team leaders to learn the best way to give feedback...'</i> (Các nhà quản lý thường cảm thấy khó khăn khi học cách tốt nhất để đưa ra phản hồi). Do đó <i>hard</i> ở đây đồng nghĩa với <b>(B) difficult</b>.</p>",
                "questionType": "Vocabulary in Context",
                "subCategory": "Vocabulary",
                "strategyHint": "hard = difficult (khó khăn)."
            },
            {
                "id": "ets22_t6_p7_182",
                "number": 182,
                "text": "What is a purpose of the article?",
                "options": {
                    "A": "To announce an upcoming event",
                    "B": "To report on a new book publisher",
                    "C": "To advertise a consultant’s services",
                    "D": "To promote a new bookstore"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của bài báo là gì?<br/>(A) Thông báo về một sự kiện sắp tới (To announce an upcoming event).<br/>(B) Báo cáo về một nhà xuất bản sách mới.<br/>(C) Quảng cáo các dịch vụ của một chuyên gia tư vấn.<br/>(D) Quảng bá một hiệu sách mới.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 thông báo về sự kiện diễn thuyết sắp tới: <i>'Ms. Bishara will be speaking at Stonecliff Bookstore on Monday, 6 April at 2:00 P.M. For more details, visit...'</i>. Chọn <b>(A)</b>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "Bài báo thông báo sự kiện tác giả diễn thuyết tại hiệu sách vào ngày 6/4."
            },
            {
                "id": "ets22_t6_p7_183",
                "number": 183,
                "text": "What is suggested about Ms. Pan in the e-mail?",
                "options": {
                    "A": "She has returned from a business trip.",
                    "B": "She is interested in writing a book.",
                    "C": "She is not able to attend an event.",
                    "D": "She plans to move to London."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được gợi ý về cô Pan trong email?<br/>(A) Cô ấy đã trở về từ một chuyến công tác (She has returned from a business trip).<br/>(B) Cô ấy quan tâm đến việc viết một cuốn sách.<br/>(C) Cô ấy không thể tham dự một sự kiện.<br/>(D) Cô ấy có kế hoạch chuyển đến London.</p><p><b>Bằng chứng trích dẫn:</b> Cô Pan viết vào ngày 10/4 từ chi nhánh Hàn Quốc (<i>mpan@harstonindustries.kr</i>): <i>'I was in London a few days ago working on the Phillips account. While there, on 6 April...'</i> (Tôi đã ở London vài ngày trước để làm việc với khách hàng Phillips). Do đó cô ấy vừa trở về từ chuyến công tác London <b>(A)</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Chi tiết 'I was in London a few days ago working on the Phillips account'."
            },
            {
                "id": "ets22_t6_p7_184",
                "number": 184,
                "text": "Where did Ms. Pan most likely meet Ms. Bishara?",
                "options": {
                    "A": "At a hotel",
                    "B": "At a planning meeting",
                    "C": "At an accounting office",
                    "D": "At a bookstore"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Pan nhiều khả năng đã gặp cô Bishara ở đâu?<br/>(A) Tại một khách sạn.<br/>(B) Tại một cuộc họp lập kế hoạch.<br/>(C) Tại một văn phòng kế toán.<br/>(D) Tại một hiệu sách (At a bookstore).</p><p><b>Bằng chứng trích dẫn chéo:</b> Văn bản 1 thông báo: <i>'Ms. Bishara will be speaking at Stonecliff Bookstore on Monday, 6 April at 2:00 P.M.'</i> (diễn thuyết tại Hiệu sách Stonecliff vào thứ Hai 6/4). Văn bản 2 cô Pan xác nhận: <i>'While there, on 6 April, I had a chance to meet Sarnia Bishara and hear her speak on the topic of her new book'</i>. Do đó cô Pan đã gặp diễn giả tại hiệu sách <b>(D)</b>.</p>",
                "questionType": "Cross-Passage Detail",
                "subCategory": "Detail",
                "strategyHint": "Ghép nối: 6/4 Bishara nói chuyện tại Stonecliff Bookstore + cô Pan nghe Bishara nói vào ngày 6/4."
            },
            {
                "id": "ets22_t6_p7_185",
                "number": 185,
                "text": "What does Ms. Pan plan to give to Mr. Burton?",
                "options": {
                    "A": "A budget proposal",
                    "B": "A conference program",
                    "C": "Some information about a business consultant",
                    "D": "Documents related to the Phillips account"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Pan dự định gửi cho ông Burton cái gì?<br/>(A) Một đề xuất ngân sách.<br/>(B) Một chương trình hội nghị.<br/>(C) Một số thông tin về một chuyên gia tư vấn doanh nghiệp (Some information about a business consultant).<br/>(D) Các tài liệu liên quan đến khách hàng Phillips.</p><p><b>Bằng chứng trích dẫn:</b> Cô Pan hứa: <i>'I will gather further details about Ms. Bishara’s background and availability and send that to you shortly.'</i> Mà ở văn bản 1, cô Bishara được giới thiệu: <i>'Ms. Bishara is an expert consultant on company management problems and solutions.'</i> Do đó cô Pan gửi thông tin về chuyên gia tư vấn doanh nghiệp <b>(C)</b>.</p>",
                "questionType": "Cross-Passage Detail",
                "subCategory": "Detail",
                "strategyHint": "Ms. Bishara là business consultant; cô Pan gửi 'details about Ms. Bishara's background and availability'."
            }
        ]
    }
]
