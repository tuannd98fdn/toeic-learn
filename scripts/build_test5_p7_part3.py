import json

part3_sets = [
    # Set 11: Q176 - Q180 (Double Passage)
    {
        "id": "ets22_t5_p7_s11",
        "type": "Double Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s11_p1",
                "type": "E-mail",
                "title": "E-mail",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>To:</b> Brody Dimmick &lt;bdimmick@greerscoffee.com.au&gt;<br/>"
                           "<b>From:</b> Fawzia Gurmani &lt;fgurmani@greerscoffee.com.au&gt;<br/>"
                           "<b>Subject:</b> Following up on your recent call<br/>"
                           "<b>Date:</b> 17 September<br/>"
                           "<b>Attachment:</b> Proposal</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #eee); margin: 12px 0;'/>"
                           "<p>Dear Mr. Dimmick,</p>"
                           "<p>Thank you for your recent call. We are always pleased to hear from one of our many local store managers. I think your idea to reinstate the Greer’s Coffee Club is excellent, and I am also pleased to know your customers have been asking about the club punch cards. I agree that this is a good time to bring back the program, as we are working on rebranding the company. I have drawn up your proposal and will forward it to Ms. So-Ra Oh, vice president of marketing, tomorrow. Before I do that, can you please look it over and let me know if I have missed any details? Please send me your feedback by the end of the day.</p>"
                           "<p>Thank you,<br/>Fawzia Gurmani<br/>Regional Director</p>"
                           "</div>"
            },
            {
                "id": "ets22_t5_p7_s11_p2",
                "type": "Web Page",
                "title": "Web Page",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<p style='color: #666; font-size: 0.85rem; margin-top: 0;'>http://www.greerscoffee.com.au/rewards</p>"
                           "<p>Greer’s, the place for coffee, conversation, and snacks, is now even better!</p>"
                           "<p>We have brought back the Greer’s Coffee Club, but with an update: it is now even easier to use! Simply download our new mobile app and register. Use the app to scan your receipt every time you visit any Greer’s Coffee location, and you will earn points. Each time you accrue 100 points, you can redeem the points for discounts on coffee, food, and other items.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_176",
                "number": 176,
                "text": "Why did Ms. Gurmani send the e-mail?",
                "options": {
                    "A": "To welcome a new employee",
                    "B": "To describe how to join a club",
                    "C": "To invite Mr. Dimmick to a meeting",
                    "D": "To confirm the details of a proposal"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao cô Gurmani lại gửi email?<br/>(A) Để chào đón nhân viên mới.<br/>(B) Để mô tả cách tham gia một câu lạc bộ.<br/>(C) Để mời ông Dimmick đến dự một cuộc họp.<br/>(D) Để xác nhận các chi tiết của một đề xuất (To confirm the details of a proposal).</p><p><b>Bằng chứng trích dẫn:</b> Trong email, cô Gurmani viết: <i>'I have drawn up your proposal and will forward it to Ms. So-Ra Oh... Before I do that, can you please look it over and let me know if I have missed any details? Please send me your feedback by the end of the day.'</i> (Tôi đã lập đề xuất của ông... Trước khi gửi, ông vui lòng xem qua và cho tôi biết nếu tôi bỏ sót chi tiết nào không?).</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "look it over and let me know if I have missed any details = confirm the details of a proposal."
            },
            {
                "id": "ets22_t5_p7_177",
                "number": 177,
                "text": "Who is Mr. Dimmick?",
                "options": {
                    "A": "A new supplier",
                    "B": "A store manager",
                    "C": "A vice president",
                    "D": "A regional director"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Ông Dimmick là ai?<br/>(A) Một nhà cung cấp mới.<br/>(B) Một quản lý cửa hàng (A store manager).<br/>(C) Một phó chủ tịch.<br/>(D) Một giám đốc khu vực.</p><p><b>Bằng chứng trích dẫn:</b> Cô Gurmani viết ở đầu email: <i>'We are always pleased to hear from one of our many local store managers.'</i> (Chúng tôi luôn vui mừng khi nhận được tin từ một trong số nhiều nhà quản lý cửa hàng địa phương của chúng tôi). Do đó ông Dimmick là một quản lý cửa hàng.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "pleased to hear from one of our many local store managers."
            },
            {
                "id": "ets22_t5_p7_178",
                "number": 178,
                "text": "What does Ms. Gurmani suggest about Greer’s Coffee?",
                "options": {
                    "A": "It has had a coffee club before.",
                    "B": "It is a new company.",
                    "C": "It hired a marketing consultant.",
                    "D": "It is launching a new coffee flavor."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Gurmani ám chỉ điều gì về Greer's Coffee?<br/>(A) Công ty đã từng có câu lạc bộ cà phê trước đây.<br/>(B) Đây là một công ty mới.<br/>(C) Công ty đã thuê cố vấn tiếp thị.<br/>(D) Công ty đang tung ra hương vị cà phê mới.</p><p><b>Bằng chứng trích dẫn:</b> Email có câu: <i>'I think your idea to <b>reinstate</b> the Greer’s Coffee Club is excellent'</i> và <i>'a good time to <b>bring back</b> the program'</i>. Từ <i>reinstate</i> (khôi phục lại) và <i>bring back</i> (mang trở lại) chứng minh chương trình này đã từng tồn tại trước đó.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "reinstate / bring back the program = had a coffee club before."
            },
            {
                "id": "ets22_t5_p7_179",
                "number": 179,
                "text": "What does the Web page suggest about Greer’s Coffee Club?",
                "options": {
                    "A": "It allows customers to place orders online.",
                    "B": "It no longer requires the use of a punch card.",
                    "C": "It is no longer offered at all locations.",
                    "D": "It requires customers to make a monthly purchase."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Trang web ám chỉ điều gì về Greer’s Coffee Club?<br/>(A) Cho phép khách hàng đặt hàng trực tuyến.<br/>(B) Nó không còn yêu cầu sử dụng thẻ bấm lỗ giấy nữa (no longer requires the use of a punch card).<br/>(C) Nó không còn được áp dụng ở tất cả các địa điểm.<br/>(D) Nó yêu cầu khách hàng phải mua sắm hàng tháng.</p><p><b>Bằng chứng trích dẫn:</b> Ở email nhắc đến việc khách hỏi về <i>'club punch cards'</i> (thẻ bấm lỗ). Nhưng trên trang web công bố thể lệ mới: <i>'with an update: it is now even easier to use! Simply download our new mobile app and register. Use the app to scan your receipt'</i>. Thay vì bấm lỗ thẻ giấy, khách dùng ứng dụng quét hóa đơn, tức là không còn dùng thẻ bấm lỗ giấy nữa.</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "punch cards -> updated to mobile app scanning receipts = no longer requires a punch card."
            },
            {
                "id": "ets22_t5_p7_180",
                "number": 180,
                "text": "On the Web page, the word “redeem” in line 4 is closest in meaning to",
                "options": {
                    "A": "trade in",
                    "B": "pay off",
                    "C": "set free",
                    "D": "win over"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Trên trang web, từ 'redeem' gần nghĩa nhất với từ nào?<br/>(A) trade in (đổi lấy).<br/>(B) pay off (thanh toán hết).<br/>(C) set free (giải phóng).<br/>(D) win over (thuyết phục/chiếm được cảm tình).</p><p><b>Bằng chứng trích dẫn:</b> <i>'redeem the points for discounts on coffee, food'</i> mang nghĩa đổi tích điểm lấy phiếu giảm giá, đồng nghĩa với <i>trade in</i> (đổi lấy thứ gì).</p>",
                "questionType": "Vocabulary in Context",
                "subCategory": "Vocabulary",
                "strategyHint": "redeem points for discounts = trade in."
            }
        ]
    },

    # Set 12: Q181 - Q185 (Double Passage)
    {
        "id": "ets22_t5_p7_s12",
        "type": "Double Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s12_p1",
                "type": "Job Advertisement",
                "title": "Job Advertisement",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>Job Posted:</b> April 10<br/>"
                           "<b>Seeking:</b> Highly Experienced Finance Director<br/>"
                           "<b>Employer:</b> Vimaxo Financial Services (VFS)</p>"
                           "<p><b>Duties include:</b></p>"
                           "<ul style='margin: 0; padding-left: 20px;'>"
                           "<li>Setting annual financial targets</li>"
                           "<li>Managing the duties of accounting staff</li>"
                           "<li>Overseeing investments and cash flow</li>"
                           "<li>Developing sound financial strategies</li>"
                           "</ul>"
                           "<p style='margin-top: 10px;'><b>Prerequisites:</b></p>"
                           "<ul style='margin: 0; padding-left: 20px;'>"
                           "<li>5 years of experience as a finance director</li>"
                           "<li>A university degree in economics or similar field</li>"
                           "<li>Excellent communication skills</li>"
                           "<li>Outstanding analytical skills</li>"
                           "</ul>"
                           "<p style='margin-top: 12px;'><b>To apply:</b> Send application and supporting documents to our director of Human Resources, Celeste Zomorodi, at zomorodi.c@vfs.com by <b>May 15</b>. We aim to hire the ideal applicant by June 21 and have him/her begin work on July 1.</p>"
                           "</div>"
            },
            {
                "id": "ets22_t5_p7_s12_p2",
                "type": "E-mail",
                "title": "E-mail",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<p><b>From:</b> Noritaka Hosokawa<br/>"
                           "<b>To:</b> Celeste Zomorodi<br/>"
                           "<b>Date:</b> April 11<br/>"
                           "<b>Subject:</b> Finance director</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #eee); margin: 12px 0;'/>"
                           "<p>Dear Celeste,</p>"
                           "<p>I wanted to ask you about the finance director job posting released by our department just yesterday. I have a friend named Michaela Shabiby who I think may be a good fit for this position. May I encourage her to apply?</p>"
                           "<p>Michaela graduated with a Master’s degree in Finance from the University of Grenada three years ago and has worked since then as finance director at Southside Investment Bank. She is an experienced trainer, and her analytical skills are unparalleled. Please let me know.</p>"
                           "<p>Thanks,<br/>Noritaka Hosokawa</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_181",
                "number": 181,
                "text": "According to the job advertisement, what will be one responsibility of the successful candidate?",
                "options": {
                    "A": "Reviewing tax policies",
                    "B": "Overseeing financial planning",
                    "C": "Evaluating promotional campaigns",
                    "D": "Meeting with fund-raising coordinators"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo bài quảng cáo tuyển dụng, một trong những trách nhiệm của ứng viên trúng tuyển là gì?<br/>(A) Xem xét các chính sách thuế.<br/>(B) Giám sát việc lập kế hoạch tài chính (Overseeing financial planning).<br/>(C) Đánh giá các chiến dịch quảng bá.<br/>(D) Gặp gỡ các điều phối viên gây quỹ.</p><p><b>Bằng chứng trích dẫn:</b> Mục Duties include có: <i>'Setting annual financial targets'</i> và <i>'Developing sound financial strategies'</i>. Các nhiệm vụ này chính là hoạt động lập kế hoạch tài chính (<i>financial planning</i>).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Developing sound financial strategies / setting annual financial targets = Overseeing financial planning."
            },
            {
                "id": "ets22_t5_p7_182",
                "number": 182,
                "text": "When is the job application deadline?",
                "options": {
                    "A": "April 10",
                    "B": "May 15",
                    "C": "June 21",
                    "D": "July 1"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Hạn chót nộp hồ sơ xin việc là khi nào?<br/>(A) Ngày 10 tháng 4.<br/>(B) Ngày 15 tháng 5.<br/>(C) Ngày 21 tháng 6.<br/>(D) Ngày 1 tháng 7.</p><p><b>Bằng chứng trích dẫn:</b> Trong phần To apply ghi rõ: <i>'Send application and supporting documents to our director of Human Resources, Celeste Zomorodi, at zomorodi.c@vfs.com by May 15.'</i></p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "by May 15 = deadline."
            },
            {
                "id": "ets22_t5_p7_183",
                "number": 183,
                "text": "What most likely is true about Mr. Hosokawa and Ms. Zomorodi?",
                "options": {
                    "A": "They met at university.",
                    "B": "They are friends of Ms. Shabiby’s.",
                    "C": "They work in Human Resources.",
                    "D": "They have known each other since childhood."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì nhiều khả năng là đúng về ông Hosokawa và bà Zomorodi?<br/>(A) Họ gặp nhau ở trường đại học.<br/>(B) Họ đều là bạn của cô Shabiby.<br/>(C) Họ làm việc ở phòng Nhân sự (They work in Human Resources).<br/>(D) Họ đã quen biết nhau từ thời thơ ấu.</p><p><b>Bằng chứng trích dẫn:</b> Bài quảng cáo tuyển dụng ghi Celeste Zomorodi là <i>'director of Human Resources'</i>. Trong email, Noritaka Hosokawa viết: <i>'the finance director job posting released by <b>our department</b> just yesterday'</i> (bài đăng tuyển dụng do phòng ban của chúng ta phát hành vào ngày hôm qua). Điều này chứng minh cả hai cùng làm trong phòng Nhân sự (HR).</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "Celeste is director of HR + 'released by our department' = both work in Human Resources."
            },
            {
                "id": "ets22_t5_p7_184",
                "number": 184,
                "text": "In the e-mail, the word “fit” in paragraph 1, line 2, is closest in meaning to",
                "options": {
                    "A": "agreement",
                    "B": "success",
                    "C": "match",
                    "D": "preparation"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Trong email, từ 'fit' ở đoạn 1, dòng 2 gần nghĩa nhất với từ nào?<br/>(A) agreement (sự thỏa thuận).<br/>(B) success (thành công).<br/>(C) match (sự phù hợp / đối tượng tương thích).<br/>(D) preparation (sự chuẩn bị).</p><p><b>Bằng chứng trích dẫn:</b> Cụm từ <i>'be a good fit for this position'</i> mang nghĩa rất phù hợp/tương xứng với vị trí công việc, do đó <i>fit</i> đồng nghĩa với <i>match</i>.</p>",
                "questionType": "Vocabulary in Context",
                "subCategory": "Vocabulary",
                "strategyHint": "a good fit for this position = a good match."
            },
            {
                "id": "ets22_t5_p7_185",
                "number": 185,
                "text": "From Ms. Zomorodi’s description, what position requirement might Ms. Shabiby NOT meet?",
                "options": {
                    "A": "Job-related experience",
                    "B": "A university degree",
                    "C": "Good communication skills",
                    "D": "Outstanding analytical skills"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Từ mô tả trong bài quảng cáo của bà Zomorodi, yêu cầu công việc nào cô Shabiby có thể KHÔNG đáp ứng được?<br/>(A) Kinh nghiệm liên quan đến công việc (Job-related experience).<br/>(B) Bằng đại học.<br/>(C) Kỹ năng giao tiếp tốt.<br/>(D) Kỹ năng phân tích vượt trội.</p><p><b>Bằng chứng trích dẫn:</b> Bài quảng cáo yêu cầu: <i>'5 years of experience as a finance director'</i> (5 năm kinh nghiệm làm giám đốc tài chính). Trong khi đó, email của Hosokawa cho biết: cô Shabiby chỉ mới tốt nghiệp thạc sĩ 3 năm trước và làm việc từ đó đến nay: <i>'graduated... three years ago and has worked since then as finance director'</i> (tức là chỉ có tối đa 3 năm kinh nghiệm, chưa đủ 5 năm).</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "Yêu cầu 5 năm kinh nghiệm, trong khi Michaela mới tốt nghiệp và đi làm được 3 năm -> thiếu kinh nghiệm làm việc (job-related experience)."
            }
        ]
    },

    # Set 13: Q186 - Q190 (Triple Passage)
    {
        "id": "ets22_t5_p7_s13",
        "type": "Triple Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s13_p1",
                "type": "Web Page",
                "title": "Web Page",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p style='color: #666; font-size: 0.85rem; margin-top: 0;'>http://www.nozawamotors.ca/newsroom</p>"
                           "<div style='display: flex; gap: 16px; font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 12px;'>"
                           "<span style='color: var(--primary, #0284c7);'>Newsroom</span><span>About Nozawa</span><span>Driver Stories</span><span>Forums</span>"
                           "</div>"
                           "<p>The new Nozawa 10 is finally here! We have made our dashboard navigation system fully voice enabled. With our Nozawa Navigation Interface (NNI), drivers can stay focused on the road. We have also added cupholders between the front seats, enhanced the back-seat speakers, and expanded the cargo area by 29 liters. Check out our new model at your Nozawa Motors dealer, and let us know what you think!</p>"
                           "</div>"
            },
            {
                "id": "ets22_t5_p7_s13_p2",
                "type": "Survey Response",
                "title": "Survey Response",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<p><b>Do you have any comments, questions, or concerns?</b></p>"
                           "<p>I’ve been a Nozawa customer for more than a decade, and I recently got a new Nozawa 10. Overall, I am happy with my purchase, but I am not pleased with the new position of the cupholders. Some air vents could have been placed there instead, and it would have made the heating and cooling system more efficient.</p>"
                           "<p>Like other drivers, I too have had some problems with the NNI system. I do, however, really like being able to fit more in the trunk, and this model’s acceleration power seems to have improved compared with previous models.</p>"
                           "<p style='font-size: 0.9rem; color: #444; border-top: 1px dashed #ccc; padding-top: 8px;'><i>If you would like to receive a personal reply to your survey response, please enter your contact information.</i><br/>"
                           "<b>E-mail address:</b> mherrera@notezip.com<br/>"
                           "<b>Name:</b> Michelle Herrera</p>"
                           "</div>"
            },
            {
                "id": "ets22_t5_p7_s13_p3",
                "type": "Memo",
                "title": "Memo",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<h4 style='margin-top: 0; text-align: center;'>MEMO</h4>"
                           "<p><b>From:</b> Tabitha Marks<br/>"
                           "<b>To:</b> Nozawa Service Center Managers<br/>"
                           "<b>Subject:</b> New release</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #eee); margin: 12px 0;'/>"
                           "<p>We received negative customer feedback about the new Nozawa 10 model’s NNI system. In response we have just released a new NNI software update that fixes the bugs. Please begin installing this update immediately to all current year Nozawa 10s that are brought to your shops for servicing. You can expect an increase in Nozawa 10s being brought in for service as we will be notifying all owners that this update is available.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_186",
                "number": 186,
                "text": "What is the purpose of the Web page?",
                "options": {
                    "A": "To describe recent consumer research",
                    "B": "To explain delays to a product release",
                    "C": "To announce updates to a vehicle",
                    "D": "To report on a vehicle usability test"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của trang web là gì?<br/>(A) Để mô tả nghiên cứu người tiêu dùng gần đây.<br/>(B) Để giải thích sự chậm trễ trong việc phát hành sản phẩm.<br/>(C) Để thông báo các bản cập nhật/cải tiến cho một phương tiện xe hơi (To announce updates to a vehicle).<br/>(D) Để báo cáo về bài kiểm tra khả năng sử dụng của xe.</p><p><b>Bằng chứng trích dẫn:</b> Trang web thông báo mẫu xe Nozawa 10 mới với các nâng cấp: hệ thống định vị điều khiển bằng giọng nói NNI, thêm giá để cốc, loa ghế sau cải tiến, khoang hành lý mở rộng: <i>'The new Nozawa 10 is finally here!... Check out our new model at your Nozawa Motors dealer'</i>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "The new Nozawa 10 is finally here! We have made... = announce updates to a vehicle."
            },
            {
                "id": "ets22_t5_p7_187",
                "number": 187,
                "text": "According to the Web page, what is bigger in the new Nozawa 10?",
                "options": {
                    "A": "The storage space",
                    "B": "The steering wheel",
                    "C": "The engine",
                    "D": "The mirrors"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo trang web, thứ gì lớn hơn ở mẫu Nozawa 10 mới?<br/>(A) Không gian chứa đồ (The storage space).<br/>(B) Vô lăng.<br/>(C) Động cơ.<br/>(D) Gương chiếu hậu.</p><p><b>Bằng chứng trích dẫn:</b> Trang web ghi: <i>'expanded the cargo area by 29 liters'</i> (mở rộng khoang chứa đồ thêm 29 lít). Trong đó <i>cargo area</i> tương đương với <i>storage space</i> (không gian chứa đồ).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "expanded the cargo area = bigger storage space."
            },
            {
                "id": "ets22_t5_p7_188",
                "number": 188,
                "text": "What does Ms. Herrera indicate in the survey response?",
                "options": {
                    "A": "She contacted the district manager.",
                    "B": "She plans to have the dealership repair her vehicle.",
                    "C": "She has recently been promoted to a new position.",
                    "D": "She has driven more than one Nozawa vehicle."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Herrera chỉ ra điều gì trong câu trả lời khảo sát?<br/>(A) Cô đã liên hệ với người quản lý khu vực.<br/>(B) Cô dự định nhờ đại lý sửa chữa xe của mình.<br/>(C) Gần đây cô đã được thăng chức lên vị trí mới.<br/>(D) Cô đã lái nhiều hơn một chiếc xe Nozawa (She has driven more than one Nozawa vehicle).</p><p><b>Bằng chứng trích dẫn:</b> Cô Herrera viết: <i>'I’ve been a Nozawa customer for more than a decade, and I recently got a new Nozawa 10... acceleration power seems to have improved compared with previous models.'</i> (Tôi là khách hàng của Nozawa hơn một thập kỷ, và mẫu này có khả năng tăng tốc cải thiện hơn so với các mẫu trước). Điều này chứng minh cô đã từng sở hữu và lái nhiều chiếc xe Nozawa trước đây.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "customer for more than a decade + compared with previous models = driven more than one Nozawa vehicle."
            },
            {
                "id": "ets22_t5_p7_189",
                "number": 189,
                "text": "Where in the vehicle would Ms. Herrera prefer to have air vents?",
                "options": {
                    "A": "Near the rear seats",
                    "B": "Between the front seats",
                    "C": "Next to the display screen",
                    "D": "On the dashboard"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Herrera muốn có các cửa gió điều hòa ở vị trí nào trong xe?<br/>(A) Gần hàng ghế sau.<br/>(B) Ở giữa hai ghế trước (Between the front seats).<br/>(C) Bên cạnh màn hình hiển thị.<br/>(D) Trên bảng điều khiển.</p><p><b>Bằng chứng trích dẫn:</b> Ở văn bản 1 ghi: <i>'added cupholders between the front seats'</i> (thêm giá để cốc giữa các ghế trước). Ở văn bản 2, cô Herrera nhận xét: <i>'I am not pleased with the new position of the cupholders. Some air vents could have been placed there instead'</i> (Lẽ ra nên đặt một số cửa gió điều hòa ở vị trí đó thay vì giá để cốc). Do đó cô muốn cửa gió ở giữa hai ghế trước.</p>",
                "questionType": "Cross-Passage Detail",
                "subCategory": "Detail",
                "strategyHint": "cupholders between the front seats -> air vents placed there instead."
            },
            {
                "id": "ets22_t5_p7_190",
                "number": 190,
                "text": "What needs to be corrected?",
                "options": {
                    "A": "The vehicle service records",
                    "B": "A navigation device",
                    "C": "Customer contact information",
                    "D": "The stereo system"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Thứ gì cần phải được sửa chữa/hiệu chỉnh?<br/>(A) Hồ sơ dịch vụ xe.<br/>(B) Một thiết bị định vị (A navigation device).<br/>(C) Thông tin liên lạc của khách hàng.<br/>(D) Hệ thống âm thanh stereo.</p><p><b>Bằng chứng trích dẫn:</b> Văn bản 2 và 3 nhắc đến lỗi của hệ thống định vị NNI: <i>'Like other drivers, I too have had some problems with the NNI system'</i> và Memo nêu: <i>'negative customer feedback about the new Nozawa 10 model’s NNI system... released a new NNI software update that fixes the bugs.'</i> Trong đó NNI là viết tắt của Nozawa Navigation Interface (thiết bị/hệ thống định vị).</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "NNI (Nozawa Navigation Interface) bugs and software update = navigation device."
            }
        ]
    },

    # Set 14: Q191 - Q195 (Triple Passage)
    {
        "id": "ets22_t5_p7_s14",
        "type": "Triple Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s14_p1",
                "type": "Web Page",
                "title": "Web Page",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p style='color: #666; font-size: 0.85rem; margin-top: 0;'>http://www.pinkbegoniafarms.com</p>"
                           "<h3 style='margin-top: 4px; text-align: center;'>Pink Begonia Farms</h3>"
                           "<p>Pink Begonia Farms is your one-stop shop for all your plant-related needs. Whether you are a landscape professional, a backyard gardener, or a houseplant enthusiast, we have just about everything you need! Some seeds, fertilizer, and equipment can be ordered online, but please come visit our nursery in person for a much larger selection.</p>"
                           "<p>Our sizable facility is divided into four distinct sections as follows:</p>"
                           "<ul style='margin: 0; padding-left: 20px;'>"
                           "<li><b>North Gate:</b> indoor houseplants, tropical plants, exotics</li>"
                           "<li><b>South Gate:</b> plants and landscaping products sold in bulk quantities at wholesale prices</li>"
                           "<li><b>East Gate:</b> local landscape plants that grow well in our area and require little maintenance</li>"
                           "<li><b>West Gate:</b> herbs, vegetable plants, fruit and nut trees, and other edibles</li>"
                           "</ul>"
                           "</div>"
            },
            {
                "id": "ets22_t5_p7_s14_p2",
                "type": "Notice",
                "title": "Notice",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px; background-color: var(--bg-surface, #fafafa);'>"
                           "<h4 style='margin-top: 0; text-align: center;'>Attention Pink Begonia Farms Customers!</h4>"
                           "<p>We are changing to new ownership on April 1. Several other changes will follow, most notably renovation work that will cause the area where we service our bulk-order customers to be closed from April 1 through May 5.</p>"
                           "<p>Also, we would kindly request that if you use our baskets or wagons to move your purchased items to your car, please do not leave them in the middle of the parking area. Thanks!</p>"
                           "</div>"
            },
            {
                "id": "ets22_t5_p7_s14_p3",
                "type": "Review",
                "title": "Review",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<p style='color: #666; font-size: 0.85rem; margin-top: 0;'>http://www.retaileropinion.com/reviews/pinkbegoniafarms</p>"
                           "<p>I had a wonderful experience shopping at Pink Begonia Farms. Recently I was preparing a client’s property for sale, and I needed extensive landscaping work to be done. The front entryway needed extra color and greenery before I could show the house to potential buyers. Knowing nothing about plants, I asked the store staff to help me pick out an assortment of local favorites that would require very little manual watering or care. When finished, the house looked so much more inviting. Thanks Pink Begonia Farms for your excellent service!</p>"
                           "<p>— Daphne Weigand<br/>April 15</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_191",
                "number": 191,
                "text": "What does the Web site mention about the online store?",
                "options": {
                    "A": "It offers specials on a seasonal basis.",
                    "B": "It is scheduled to be launched in April.",
                    "C": "It features the most popular plants on its home page.",
                    "D": "It offers fewer items for sale than the physical store does."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Trang web đề cập điều gì về cửa hàng trực tuyến?<br/>(A) Cung cấp các chương trình đặc biệt theo mùa.<br/>(B) Dự kiến ra mắt vào tháng Tư.<br/>(C) Giới thiệu các loại cây phổ biến nhất trên trang chủ.<br/>(D) Bán ít mặt hàng hơn so với cửa hàng thực tế (offers fewer items for sale than the physical store does).</p><p><b>Bằng chứng trích dẫn:</b> Trang web ghi: <i>'Some seeds, fertilizer, and equipment can be ordered online, but please come visit our nursery in person for a much larger selection.'</i> (Một số hạt giống, phân bón và dụng cụ có thể đặt trực tuyến, nhưng hãy trực tiếp đến vườn ươm để có sự lựa chọn phong phú hơn nhiều).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "visit our nursery in person for a much larger selection = online store offers fewer items."
            },
            {
                "id": "ets22_t5_p7_192",
                "number": 192,
                "text": "What does the notice suggest about Pink Begonia Farms?",
                "options": {
                    "A": "It provides containers for transporting plants.",
                    "B": "Its name will be changed soon.",
                    "C": "Its parking area is under construction.",
                    "D": "It will no longer allow discounted items to be returned."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Thông báo ám chỉ điều gì về Pink Begonia Farms?<br/>(A) Nơi đây cung cấp các vật dụng đựng/chở để vận chuyển cây (provides containers for transporting plants).<br/>(B) Tên của nó sẽ sớm được thay đổi.<br/>(C) Khu vực đỗ xe đang được xây dựng.<br/>(D) Sẽ không còn cho phép trả lại các mặt hàng giảm giá.</p><p><b>Bằng chứng trích dẫn:</b> Trong đoạn thông báo ghi: <i>'if you use our baskets or wagons to move your purchased items to your car, please do not leave them in the middle of the parking area.'</i> Giỏ (baskets) và xe kéo (wagons) của cửa hàng chính là <i>containers for transporting plants</i>.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "baskets or wagons to move your purchased items = containers for transporting plants."
            },
            {
                "id": "ets22_t5_p7_193",
                "number": 193,
                "text": "What area of Pink Begonia Farms will reopen in May?",
                "options": {
                    "A": "North Gate",
                    "B": "South Gate",
                    "C": "East Gate",
                    "D": "West Gate"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Khu vực nào của Pink Begonia Farms sẽ mở cửa trở lại vào tháng Năm?<br/>(A) Cổng Bắc.<br/>(B) Cổng Nam (South Gate).<br/>(C) Cổng Đông.<br/>(D) Cổng Tây.</p><p><b>Bằng chứng trích dẫn:</b> Thông báo nêu: <i>'renovation work that will cause the area where we service our bulk-order customers to be closed from April 1 through May 5'</i> (khu vực phục vụ khách mua số lượng lớn sẽ đóng cửa đến ngày 5 tháng 5). Đối chiếu với trang web: <i>'South Gate - plants and landscaping products sold in bulk quantities at wholesale prices'</i>. Do đó khu vực mở lại vào tháng Năm là <b>South Gate</b>.</p>",
                "questionType": "Cross-Passage Detail",
                "subCategory": "Detail",
                "strategyHint": "bulk-order customers closed until May 5 + South Gate = plants sold in bulk quantities."
            },
            {
                "id": "ets22_t5_p7_194",
                "number": 194,
                "text": "What most likely is Ms. Weigand’s job?",
                "options": {
                    "A": "Landscaper",
                    "B": "Event planner",
                    "C": "Real estate agent",
                    "D": "Nursery worker"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Nghề nghiệp của cô Weigand nhiều khả năng là gì nhất?<br/>(A) Người làm vườn / thiết kế cảnh quan.<br/>(B) Người lên kế hoạch sự kiện.<br/>(C) Môi giới bất động sản (Real estate agent).<br/>(D) Nhân viên vườn ươm.</p><p><b>Bằng chứng trích dẫn:</b> Trong bài đánh giá của mình, Daphne Weigand viết: <i>'Recently I was preparing a client’s property for sale, and I needed extensive landscaping work to be done. The front entryway needed extra color and greenery before I could show the house to potential buyers.'</i> (Chuẩn bị bất động sản của khách hàng để rao bán, dọn dẹp lối vào trước khi dẫn khách mua tiềm năng đi xem nhà). Công việc này đặc trưng của một người môi giới bất động sản.</p>",
                "questionType": "Inference",
                "subCategory": "Overview",
                "strategyHint": "preparing a client's property for sale, show the house to potential buyers = Real estate agent."
            },
            {
                "id": "ets22_t5_p7_195",
                "number": 195,
                "text": "What is implied about Ms. Weigand?",
                "options": {
                    "A": "She has flowers delivered on a regular basis.",
                    "B": "She learned of the store through one of her clients.",
                    "C": "She plans to buy a house in the near future.",
                    "D": "She shopped in the East Gate section of the nursery."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được ám chỉ về cô Weigand?<br/>(A) Cô thường xuyên được giao hoa định kỳ.<br/>(B) Cô biết đến cửa hàng thông qua một trong những khách hàng của mình.<br/>(C) Cô dự định mua nhà trong tương lai gần.<br/>(D) Cô đã mua sắm ở khu vực Cổng Đông (East Gate) của vườn ươm.</p><p><b>Bằng chứng trích dẫn:</b> Trong bài đánh giá, cô Weigand viết: <i>'I asked the store staff to help me pick out an assortment of <b>local favorites</b> that would require <b>very little manual watering or care</b>.'</i> Đối chiếu với trang web phần Cổng Đông: <i>'East Gate - <b>local landscape plants</b> that grow well in our area and <b>require little maintenance</b>'</i>. Do đó cô đã mua cây ở khu vực East Gate.</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "local favorites requiring very little care = East Gate: local landscape plants requiring little maintenance."
            }
        ]
    },

    # Set 15: Q196 - Q200 (Triple Passage)
    {
        "id": "ets22_t5_p7_s15",
        "type": "Triple Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s15_p1",
                "type": "E-mail",
                "title": "E-mail 1",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>To:</b> Thanda Peterson &lt;thandapeterson@thandapeterson.com&gt;<br/>"
                           "<b>From:</b> Milos Adamek &lt;milosa@wistartravel.org&gt;<br/>"
                           "<b>Subject:</b> Travel arrangements<br/>"
                           "<b>Date:</b> April 17</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #eee); margin: 12px 0;'/>"
                           "<p>Hello Thanda,</p>"
                           "<p>I hope you are well. I looked into available flights from Concord to Sumneyfeld for your writers’ conference and discovered that discount carrier Alterr Airlines offers daily direct service on that route. The tentative itinerary would be:</p>"
                           "<p style='padding-left: 16px; font-family: monospace; font-size: 0.9rem;'>"
                           "Concord depart: Friday, May 8, 8:50 A.M.<br/>"
                           "Sumneyfeld arrive: Friday, May 8, 11:05 A.M.<br/>"
                           "Sumneyfeld depart: Monday, May 11, 1:20 P.M.<br/>"
                           "Concord arrive: Monday, May 11, 3:35 P.M."
                           "</p>"
                           "<p>I will book this as soon as you confirm. Keep in mind on your return trip that the Sumneyfeld Airport is advising passengers to arrive a full two hours before departure because of extensive renovations being done there.</p>"
                           "<p>By the way, you might be interested in an excellent Peruvian lunch place near the Sumneyfeld Airport. Just let me know and I will give you the name.</p>"
                           "<p>Best,<br/>Milos</p>"
                           "</div>"
            },
            {
                "id": "ets22_t5_p7_s15_p2",
                "type": "E-mail",
                "title": "E-mail 2",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<p><b>To:</b> Milos Adamek &lt;milosa@wistartravel.org&gt;<br/>"
                           "<b>From:</b> Thanda Peterson &lt;thandapeterson@thandapeterson.com&gt;<br/>"
                           "<b>Subject:</b> Re: Travel arrangements<br/>"
                           "<b>Date:</b> April 18</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #eee); margin: 12px 0;'/>"
                           "<p>Milos,</p>"
                           "<p>Quick update before you book. I will need a few days to consider whether I should depart for Sumneyfeld on May 8 or leave one day earlier. There is an early conference workshop the evening of May 7 that I might attend. Actually, a publisher representative with whom I would like to talk regarding my latest manuscript may be in attendance! I will let you know shortly.</p>"
                           "<p>Thanks so much for your help, as always.</p>"
                           "<p>Thanda</p>"
                           "</div>"
            },
            {
                "id": "ets22_t5_p7_s15_p3",
                "type": "Receipt",
                "title": "Receipt",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px; max-width: 400px;'>"
                           "<h4 style='margin-top: 0; text-align: center;'>Sumneyfeld QuickTaxi</h4>"
                           "<p style='text-align: center; margin-top: -8px; font-size: 0.85rem;'>555-0194</p>"
                           "<p><b>Date:</b> May 7<br/>"
                           "<b>From:</b> Sumneyfeld Airport<br/>"
                           "<b>To:</b> Peru Dreaming Cafe, 98 Treetop Avenue<br/>"
                           "<b>Pickup:</b> 11:55 A.M.<br/>"
                           "<b>Drop off:</b> 12:04 P.M.<br/>"
                           "<b>Distance:</b> 1.2 miles<br/>"
                           "<b>Total:</b> $8.00</p>"
                           "<p><b>Payment type:</b> [X] credit card [ ] cash<br/>"
                           "<b>Name on Credit Card:</b> Thanda Peterson<br/>"
                           "<b>Credit Card Number:</b> xxxx xxxx xxxx 5523</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_196",
                "number": 196,
                "text": "What is indicated about the Sumneyfeld Airport?",
                "options": {
                    "A": "It is very near Ms. Peterson’s hotel.",
                    "B": "It has new check-in staff.",
                    "C": "It is undergoing construction work.",
                    "D": "It often has delayed flight departures."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về Sân bay Sumneyfeld?<br/>(A) Nó rất gần khách sạn của cô Peterson.<br/>(B) Nó có nhân viên làm thủ tục mới.<br/>(C) Nó đang trải qua công việc xây dựng/sửa chữa (undergoing construction work).<br/>(D) Nó thường xuyên bị hoãn các chuyến bay cất cánh.</p><p><b>Bằng chứng trích dẫn:</b> Trong email 1, Milos khuyên: <i>'Sumneyfeld Airport is advising passengers to arrive a full two hours before departure because of <b>extensive renovations</b> being done there.'</i> (vì các hoạt động cải tạo quy mô lớn đang được tiến hành ở đó = construction work).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "extensive renovations = undergoing construction work."
            },
            {
                "id": "ets22_t5_p7_197",
                "number": 197,
                "text": "What is suggested about Ms. Peterson?",
                "options": {
                    "A": "She frequently flies on Alterr Airlines.",
                    "B": "She has visited Sumneyfeld in the past.",
                    "C": "She often goes on business trips for her company.",
                    "D": "She has used Mr. Adamek's services before."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được gợi ý về cô Peterson?<br/>(A) Cô thường xuyên bay trên hãng hàng không Alterr Airlines.<br/>(B) Cô đã từng đến thăm Sumneyfeld trong quá khứ.<br/>(C) Cô thường xuyên đi công tác cho công ty.<br/>(D) Cô đã từng sử dụng dịch vụ của ông Adamek trước đây (used Mr. Adamek's services before).</p><p><b>Bằng chứng trích dẫn:</b> Ở cuối email thứ hai, cô Peterson cảm ơn: <i>'Thanks so much for your help, <b>as always</b>.'</i> Cụm 'như mọi khi' (as always) cho thấy cô đã nhờ ông Adamek (đại lý du lịch) đặt vé nhiều lần trước đây.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Thanks so much for your help, as always = has used his services before."
            },
            {
                "id": "ets22_t5_p7_198",
                "number": 198,
                "text": "Who most likely is Ms. Peterson?",
                "options": {
                    "A": "A news journalist",
                    "B": "A travel-magazine writer",
                    "C": "A food critic",
                    "D": "A book author"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Peterson nhiều khả năng là ai nhất?<br/>(A) Một nhà báo đưa tin tức.<br/>(B) Một nhà văn viết tạp chí du lịch.<br/>(C) Một nhà phê bình ẩm thực.<br/>(D) Một tác giả sách (A book author).</p><p><b>Bằng chứng trích dẫn:</b> Email nhắc tới chuyến đi tham dự <i>'your writers’ conference'</i> (hội nghị các nhà văn). Thêm vào đó cô muốn gặp <i>'a publisher representative with whom I would like to talk regarding my latest manuscript'</i> (đại diện nhà xuất bản để trao đổi về bản thảo mới nhất của tôi). Tác giả có bản thảo gửi nhà xuất bản chính là tác giả sách (book author).</p>",
                "questionType": "Inference",
                "subCategory": "Overview",
                "strategyHint": "writers' conference + talk with publisher representative regarding my latest manuscript = book author."
            },
            {
                "id": "ets22_t5_p7_199",
                "number": 199,
                "text": "What did Ms. Peterson most likely do in response to advice?",
                "options": {
                    "A": "She visited a restaurant.",
                    "B": "She took advantage of a free shuttle service.",
                    "C": "She met with a representative.",
                    "D": "She changed airlines."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Peterson nhiều khả năng đã làm gì theo lời khuyên?<br/>(A) Cô đã ghé thăm một nhà hàng (visited a restaurant).<br/>(B) Cô đã tận dụng dịch vụ xe đưa đón miễn phí.<br/>(C) Cô đã gặp gỡ một người đại diện.<br/>(D) Cô đã đổi hãng hàng không.</p><p><b>Bằng chứng trích dẫn:</b> Trong email 1, Milos gợi ý: <i>'you might be interested in an excellent Peruvian lunch place near the Sumneyfeld Airport.'</i> Đến ngày 7 tháng 5, hóa đơn taxi của cô cho thấy điểm đến là: <i>'Peru Dreaming Cafe'</i> vào lúc gần 12 giờ trưa (11:55 A.M. đến 12:04 P.M. - giờ ăn trưa). Như vậy cô đã ghé thăm nhà hàng theo lời khuyên của Milos.</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "Milos advises: excellent Peruvian lunch place -> Taxi receipt destination: Peru Dreaming Cafe."
            },
            {
                "id": "ets22_t5_p7_200",
                "number": 200,
                "text": "What can be concluded about Ms. Peterson based on the receipt?",
                "options": {
                    "A": "She paid in cash for transportation.",
                    "B": "She arrived at the airport later than recommended.",
                    "C": "She rode a bus to the conference venue.",
                    "D": "She decided to attend an extra conference event."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Có thể kết luận điều gì về cô Peterson dựa trên hóa đơn?<br/>(A) Cô đã thanh toán tiền mặt cho phương tiện đi lại.<br/>(B) Cô đến sân bay muộn hơn so với khuyến nghị.<br/>(C) Cô đã đi xe buýt đến địa điểm tổ chức hội nghị.<br/>(D) Cô đã quyết định tham dự một sự kiện hội nghị bổ sung (attend an extra conference event).</p><p><b>Bằng chứng trích dẫn:</b> Trong email 2, cô Peterson phân vân: <i>'whether I should depart for Sumneyfeld on May 8 or leave one day earlier. There is an early conference workshop the evening of May 7 that I might attend.'</i> Hóa đơn taxi xác nhận cô đã có mặt ở Sumneyfeld vào ngày 7 tháng 5 (May 7), chứng tỏ cô đã chọn đi sớm hơn 1 ngày để tham dự buổi hội thảo bổ sung vào tối hôm đó.</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "May 7 taxi receipt confirms she arrived early for the conference workshop on the evening of May 7."
            }
        ]
    }
]

with open("/private/tmp/ets5_extract/p7_part3.json", "w", encoding="utf-8") as f:
    json.dump(part3_sets, f, indent=2, ensure_ascii=False)

print(f"Generated {len(part3_sets)} sets ({sum(len(s['questions']) for s in part3_sets)} questions) in p7_part3.json")
