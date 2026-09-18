import json

part1_sets = [
    # Set 1: Q147 - Q148 (Advertisement)
    {
        "id": "ets22_t6_p7_s01",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s01_p1",
                "type": "Advertisement",
                "title": "Advertisement",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0; text-align: center;'>Kendricks Appliances Sale</h3>"
                           "<p style='text-align: center; font-weight: bold;'>March 5 and 6</p>"
                           "<p>This event is our way of saying thank you to our friends and neighbors for welcoming our new business to the South Waterfront neighborhood one year ago. Members of the community who live east of Broad Avenue and west of Riverside Avenue are invited to stop in and claim an additional discount on selected merchandise this weekend. Just remember to bring proof of residency.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_147",
                "number": 147,
                "text": "What is being advertised?",
                "options": {
                    "A": "The recent relocation of a business",
                    "B": "The grand opening of a branch store",
                    "C": "A special promotion for local residents",
                    "D": "The introduction of new product brands"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì đang được quảng cáo?<br/>(A) Việc di dời địa điểm kinh doanh gần đây.<br/>(B) Sự kiện đại khai trương một cửa hàng chi nhánh.<br/>(C) Một chương trình khuyến mãi đặc biệt dành cho cư dân địa phương (A special promotion for local residents).<br/>(D) Sự ra mắt của các thương hiệu sản phẩm mới.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn quảng cáo ghi: <i>'Members of the community who live east of Broad Avenue and west of Riverside Avenue are invited to stop in and claim an additional discount on selected merchandise this weekend. Just remember to bring proof of residency.'</i> (Cư dân trong khu vực mang theo giấy tờ chứng minh cư trú để nhận thêm giảm giá). Chọn <b>(C)</b>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "Cụm 'members of the community... proof of residency' chứng minh chương trình nhắm vào cư dân địa phương."
            },
            {
                "id": "ets22_t6_p7_148",
                "number": 148,
                "text": "What is indicated about Kendricks Appliances?",
                "options": {
                    "A": "It has been in business for one year.",
                    "B": "It has a store on Broad Avenue.",
                    "C": "Its delivery service is limited to South Waterfront.",
                    "D": "Its hours are extended on the weekend."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về Kendricks Appliances?<br/>(A) Nó đã kinh doanh được một năm (It has been in business for one year).<br/>(B) Nó có một cửa hàng trên Đại lộ Broad.<br/>(C) Dịch vụ giao hàng của nó giới hạn trong South Waterfront.<br/>(D) Giờ mở cửa được kéo dài vào cuối tuần.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn quảng cáo nêu rõ: <i>'for welcoming our new business to the South Waterfront neighborhood one year ago.'</i> (cảm ơn vì đã chào đón doanh nghiệp của chúng tôi một năm trước). Do đó cửa hàng đã hoạt động được 1 năm <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Chi tiết 'welcoming our new business... one year ago'."
            }
        ]
    },

    # Set 2: Q149 - Q150 (Memo)
    {
        "id": "ets22_t6_p7_s02",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s02_p1",
                "type": "Memo",
                "title": "Memorandum",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>To:</b> All Eastland Regional Hospital staff<br/>"
                           "<b>From:</b> Patrick Menzales<br/>"
                           "<b>Date:</b> February 1<br/>"
                           "<b>Subject:</b> Referrals</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #ccc); margin: 12px 0;'/>"
                           "<p>Eastland Regional Hospital is planning to hire more registered nurses, x-ray technicians, and cafeteria and housekeeping staff. We will be holding a hiring and information event on Wednesday, February 27, from 2 P.M. to 5 P.M. in the Winkler Auditorium. If you have friends or family interested in working here, this is a great opportunity for them to find out about open positions. There is no fee for entry. It is not necessary to make an appointment.</p>"
                           "<p>As a valued employee, you will receive a bonus if you refer a candidate who is hired and whose employment lasts at least three months. Ask the candidate to include your name on the application in the space labeled “referred by.” The bonus will be added to your paycheck.</p>"
                           "<p>Please contact me if you have any questions.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_149",
                "number": 149,
                "text": "What is indicated about the hiring and information event?",
                "options": {
                    "A": "It will be held in the cafeteria.",
                    "B": "An admission fee will be charged.",
                    "C": "It will take place in the afternoon.",
                    "D": "Attendees will be asked to register in advance."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về sự kiện tuyển dụng và thông tin?<br/>(A) Nó sẽ được tổ chức trong căng tin.<br/>(B) Phí vào cửa sẽ được tính.<br/>(C) Nó sẽ diễn ra vào buổi chiều (It will take place in the afternoon).<br/>(D) Những người tham dự sẽ được yêu cầu đăng ký trước.</p><p><b>Bằng chứng trích dẫn:</b> Bản thông báo ghi: <i>'on Wednesday, February 27, from 2 P.M. to 5 P.M. in the Winkler Auditorium.'</i> Khoảng thời gian từ 2 giờ chiều đến 5 giờ chiều là vào buổi chiều (in the afternoon). Chọn <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "2 P.M. to 5 P.M. tương ứng với 'in the afternoon'."
            },
            {
                "id": "ets22_t6_p7_150",
                "number": 150,
                "text": "What does Mr. Menzales encourage employees to do?",
                "options": {
                    "A": "Volunteer to lead a project",
                    "B": "Refer applicants for employment",
                    "C": "Earn a bonus by working overtime",
                    "D": "Apply for a better-paying position"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Ông Menzales khuyến khích nhân viên làm điều gì?<br/>(A) Tình nguyện dẫn dắt một dự án.<br/>(B) Giới thiệu các ứng viên xin việc (Refer applicants for employment).<br/>(C) Nhận tiền thưởng bằng cách làm thêm giờ.<br/>(D) Nộp đơn cho một vị trí có mức lương tốt hơn.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 nêu rõ: <i>'you will receive a bonus if you refer a candidate who is hired... Ask the candidate to include your name on the application in the space labeled “referred by.”'</i> Tiêu đề cũng ghi rõ: <i>Subject: Referrals</i>. Chọn <b>(B)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Từ khóa 'refer a candidate' tương đương với 'refer applicants for employment'."
            }
        ]
    },

    # Set 3: Q151 - Q152 (Notice)
    {
        "id": "ets22_t6_p7_s03",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s03_p1",
                "type": "Notice",
                "title": "Meeting Notice",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0; text-align: center;'>Meeting of the Chelmsbury Civic Association</h3>"
                           "<p><b>Where:</b> Alvar Madsen Community Center, 4141 Hoover Road<br/>"
                           "<b>When:</b> Tuesday, June 14, 7:00 P.M.–8:30 P.M.</p>"
                           "<p><b>Agenda:</b><br/>"
                           "• Introduce new neighbors<br/>"
                           "• Update on road construction<br/>"
                           "• Election of vice president<br/>"
                           "• Refreshments</p>"
                           "<p><b>Please note:</b><br/>"
                           "We are currently collecting dues for the year. The dues are $25. If you have not yet paid your dues, please do so. You may pay at the meeting, or you may send your payment to Bob Robsen at 595 Shelton Drive.</p>"
                           "<p>We hope to see you at the meeting!</p>"
                           "<p>Susan Wolfe, President, Chelmsbury Civic Association<br/>"
                           "784 Harmony Drive</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_151",
                "number": 151,
                "text": "What is stated about the upcoming meeting?",
                "options": {
                    "A": "It will be held on Harmony Drive.",
                    "B": "It will include voting for an office.",
                    "C": "It will be led by Mr. Robsen.",
                    "D": "It will have a speaker from the local community center."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được nêu về cuộc họp sắp tới?<br/>(A) Nó sẽ được tổ chức trên đường Harmony Drive.<br/>(B) Nó sẽ bao gồm việc bỏ phiếu bầu một chức vụ (It will include voting for an office).<br/>(C) Nó sẽ do ông Robsen chủ trì.<br/>(D) Nó sẽ có một diễn giả từ trung tâm cộng đồng địa phương.</p><p><b>Bằng chứng trích dẫn:</b> Chương trình cuộc họp (Agenda) có mục: <i>'Election of vice president'</i> (bầu cử phó chủ tịch). Việc bầu cử chức vụ tương đương với <i>voting for an office</i>. Chọn <b>(B)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Election of vice president = voting for an office."
            },
            {
                "id": "ets22_t6_p7_152",
                "number": 152,
                "text": "What is true about Mr. Robsen?",
                "options": {
                    "A": "He is the vice president of the association.",
                    "B": "He forgot to pay his membership fee.",
                    "C": "He provides refreshments at meetings.",
                    "D": "He collects association members’ dues."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì đúng về ông Robsen?<br/>(A) Ông ấy là phó chủ tịch hiệp hội.<br/>(B) Ông ấy quên đóng phí thành viên.<br/>(C) Ông ấy cung cấp đồ ăn nhẹ tại các cuộc họp.<br/>(D) Ông ấy thu hội phí của các thành viên hiệp hội (He collects association members' dues).</p><p><b>Bằng chứng trích dẫn:</b> Mục Please note ghi: <i>'We are currently collecting dues for the year... you may send your payment to Bob Robsen at 595 Shelton Drive.'</i> (gửi khoản đóng hội phí tới Bob Robsen). Do đó ông ấy là người thu hội phí <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Chi tiết 'send your payment to Bob Robsen' tương ứng với 'collects members' dues'."
            }
        ]
    },

    # Set 4: Q153 - Q154 (Text Message Chain)
    {
        "id": "ets22_t6_p7_s04",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s04_p1",
                "type": "Text Message Chain",
                "title": "Text Message Chain",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; background: var(--bg-card, #fafafa);'>"
                           "<p><b>Eric Ozawa (12:06 P.M.)</b><br/>Hi Kara. I wanted to let you know that my train is going to be late.</p>"
                           "<p><b>Kara Murato (12:10 P.M.)</b><br/>Oh, that's too bad. Will you make it to the 3:00 meeting?</p>"
                           "<p><b>Eric Ozawa (12:11 P.M.)</b><br/>I'm not sure. The conductor thinks it will be at least another hour before we leave.</p>"
                           "<p><b>Kara Murato (12:12 P.M.)</b><br/>Should we postpone the meeting?</p>"
                           "<p><b>Eric Ozawa (12:14 P.M.)</b><br/>I think you should get started. The plans for the new hospital wing are on my desk. You know everything about the changes to the original design. You can call me if the client has any questions that you are unable to answer.</p>"
                           "<p><b>Kara Murato (12:15 P.M.)</b><br/>Sounds good. Let me know when you have an update on your arrival time.</p>"
                           "<p><b>Eric Ozawa (12:16 P.M.)</b><br/>Sure. Thanks.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_153",
                "number": 153,
                "text": "Why does Mr. Ozawa contact Ms. Murato?",
                "options": {
                    "A": "To introduce her to a new client",
                    "B": "To inform her of a delay",
                    "C": "To ask her to book a train ticket",
                    "D": "To thank her for changing a project’s deadline"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao ông Ozawa liên lạc với cô Murato?<br/>(A) Để giới thiệu cô với một khách hàng mới.<br/>(B) Để thông báo cho cô ấy về sự chậm trễ (To inform her of a delay).<br/>(C) Để nhờ cô đặt vé tàu.<br/>(D) Để cảm ơn cô vì đã thay đổi thời hạn dự án.</p><p><b>Bằng chứng trích dẫn:</b> Tin nhắn đầu tiên lúc 12:06 P.M. ông Ozawa viết: <i>'I wanted to let you know that my train is going to be late.'</i> (Tôi muốn báo cho bạn biết tàu của tôi sẽ bị trễ). Chọn <b>(B)</b>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "'my train is going to be late' = 'inform her of a delay'."
            },
            {
                "id": "ets22_t6_p7_154",
                "number": 154,
                "text": "At 12:15 P.M., what does Ms. Murato most likely mean when she writes, “Sounds good”?",
                "options": {
                    "A": "She will contact Mr. Ozawa if she has questions.",
                    "B": "She will attend a meeting by phone.",
                    "C": "She will drive Mr. Ozawa to the station.",
                    "D": "She will reschedule a consultation."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Vào lúc 12:15 P.M., cô Murato nhiều khả năng có ý gì khi viết 'Sounds good'?<br/>(A) Cô ấy sẽ liên lạc với ông Ozawa nếu có thắc mắc (She will contact Mr. Ozawa if she has questions).<br/>(B) Cô ấy sẽ tham gia cuộc họp qua điện thoại.<br/>(C) Cô ấy sẽ lái xe đưa ông Ozawa ra ga.<br/>(D) Cô ấy sẽ xếp lại lịch tư vấn.</p><p><b>Bằng chứng trích dẫn:</b> Tin nhắn ngay trước đó lúc 12:14 P.M. ông Ozawa đề xuất: <i>'I think you should get started... You can call me if the client has any questions that you are unable to answer.'</i> (Bạn cứ bắt đầu cuộc họp, nếu khách hỏi gì mà bạn chưa trả lời được thì gọi cho tôi). Cô Murato đáp: <i>'Sounds good'</i>, đồng ý với phương án sẽ gọi cho ông Ozawa khi có câu hỏi chưa giải đáp được. Chọn <b>(A)</b>.</p>",
                "questionType": "Inference / Text Message",
                "subCategory": "Inference",
                "strategyHint": "Đối chiếu đề xuất trước đó: 'You can call me if the client has any questions'."
            }
        ]
    },

    # Set 5: Q155 - Q157 (Email)
    {
        "id": "ets22_t6_p7_s05",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s05_p1",
                "type": "Email",
                "title": "Email Message",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>From:</b> noreply@vacationsiteseer.com<br/>"
                           "<b>To:</b> vneuman@gzetmail.com<br/>"
                           "<b>Date:</b> July 16, 2:52 P.M.<br/>"
                           "<b>Subject:</b> Your upcoming trip</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #ccc); margin: 12px 0;'/>"
                           "<p>Mr. Neuman:</p>"
                           "<p>Your trip to Milan is only a week away. [1] Your room at the Classico Hotel has been confirmed. Check-in is on July 23 at 2 P.M., and checkout is on July 28 at 11 A.M. There is no need to pay now, as payment is not required until you have checked out. [2]</p>"
                           "<p>We urge you to plan ahead regarding car rentals. As a Vacation Siteseer customer, you are entitled to a discount of 20% if you book your car now. Our car rental partners are offering this special deal only until July 20, so do not wait. [3]</p>"
                           "<p>Thank you for choosing Vacation Siteseer to book your stay in Milan. [4]</p>"
                           "<p>Enjoy your journey!<br/>"
                           "Vacation Siteseer Team</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_155",
                "number": 155,
                "text": "When will Mr. Neuman begin his stay in Milan?",
                "options": {
                    "A": "On July 16",
                    "B": "On July 20",
                    "C": "On July 23",
                    "D": "On July 28"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Khi nào ông Neuman sẽ bắt đầu kỳ lưu trú tại Milan?<br/>(A) Vào ngày 16 tháng 7.<br/>(B) Vào ngày 20 tháng 7.<br/>(C) Vào ngày 23 tháng 7 (On July 23).<br/>(D) Vào ngày 28 tháng 7.</p><p><b>Bằng chứng trích dẫn:</b> Email nêu rõ: <i>'Check-in is on July 23 at 2 P.M., and checkout is on July 28 at 11 A.M.'</i> (Nhận phòng vào ngày 23/7). Do đó kỳ nghỉ bắt đầu vào 23/7 <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Chi tiết 'Check-in is on July 23'."
            },
            {
                "id": "ets22_t6_p7_156",
                "number": 156,
                "text": "What offer is included in the e-mail?",
                "options": {
                    "A": "A car rental discount",
                    "B": "Late checkout times",
                    "C": "A hotel room upgrade",
                    "D": "Free sightseeing tours"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Ưu đãi nào được bao gồm trong email?<br/>(A) Giảm giá thuê xe ô tô (A car rental discount).<br/>(B) Giờ trả phòng muộn.<br/>(C) Nâng cấp phòng khách sạn.<br/>(D) Các chuyến tham quan ngắm cảnh miễn phí.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 cho biết: <i>'As a Vacation Siteseer customer, you are entitled to a discount of 20% if you book your car now.'</i> (được giảm giá 20% thuê xe). Chọn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Từ khóa 'discount of 20% if you book your car' = 'car rental discount'."
            },
            {
                "id": "ets22_t6_p7_157",
                "number": 157,
                "text": "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n“Explore your options on our Web site and make a reservation today.”",
                "options": {
                    "A": "[1]",
                    "B": "[2]",
                    "C": "[3]",
                    "D": "[4]"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Câu 'Khám phá các lựa chọn trên trang web của chúng tôi và đặt chỗ ngay hôm nay' thuộc về vị trí nào hợp lý nhất?<br/>(A) [1]<br/>(B) [2]<br/>(C) [3]<br/>(D) [4]</p><p><b>Phân tích logic liên kết:</b> Đoạn 2 đang bàn về dịch vụ thuê xe ô tô (car rentals), nêu ưu đãi giảm giá 20% và kêu gọi: <i>'Our car rental partners are offering this special deal only until July 20, so do not wait.'</i> (đừng chần chừ). Do đó, câu kêu gọi hành động tiếp theo: <i>'Explore your options on our Web site and make a reservation today'</i> đặt tại vị trí <b>[3]</b> là ăn khớp hoàn hảo nhất về mặt mạch văn. Chọn <b>(C)</b>.</p>",
                "questionType": "Sentence Insertion",
                "subCategory": "Sentence Insertion",
                "strategyHint": "Câu kêu gọi hành động đặt chỗ kết nối với lời khuyên 'do not wait' về thuê xe tại vị trí [3]."
            }
        ]
    },

    # Set 6: Q158 - Q161 (Article)
    {
        "id": "ets22_t6_p7_s06",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s06_p1",
                "type": "Article",
                "title": "Newspaper Article",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0;'>Craverton Returns to Business as Usual</h3>"
                           "<p style='color: #666; font-style: italic;'>—Brieanna Wible, Staff Reporter</p>"
                           "<p>A power outage yesterday caused a number of businesses and area attractions in downtown Craverton to close. [1] The cause of the outage is still unknown, but the early morning’s stormy weather most likely played a part.</p>"
                           "<p>Sung Min Nam, who was leading a tour of some of the historic sites downtown, changed his itinerary. “Fortunately, I know the area well,” Mr. Nam said. “I led the group back to the bus, and we headed to a different part of the city to discover alternative sites, such as Grantwood Park and Holtrop Tower.” [2]</p>"
                           "<p>For the Craverton Art Museum, the outage did not make a difference in earnings because its galleries are closed to the public on Tuesdays. [3] Craverton University canceled its classes, but generators powered residence halls and cafeterias. Power was restored to most area businesses by late yesterday afternoon. [4] And today Craverton returned to business as usual.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_158",
                "number": 158,
                "text": "What is the main topic of the article?",
                "options": {
                    "A": "Reasons to move to Craverton",
                    "B": "An unexpected situation in Craverton",
                    "C": "Reliable weather forecasting sources",
                    "D": "Possible sites for a tourist attraction"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Chủ đề chính của bài báo là gì?<br/>(A) Những lý do nên chuyển đến Craverton.<br/>(B) Một tình huống bất ngờ xảy ra ở Craverton (An unexpected situation in Craverton).<br/>(C) Các nguồn dự báo thời tiết đáng tin cậy.<br/>(D) Các địa điểm tiềm năng cho điểm thu hút khách du lịch.</p><p><b>Bằng chứng trích dẫn:</b> Toàn bài báo thuật lại sự cố mất điện đột ngột hôm qua ở Craverton (<i>A power outage yesterday caused a number of businesses... to close</i>) và cách các đơn vị xử lý sự cố. Đây là một tình huống bất ngờ xảy ra <b>(B)</b>.</p>",
                "questionType": "Gist / Topic",
                "subCategory": "Overview",
                "strategyHint": "Sự cố cúp điện bất ngờ (power outage) = an unexpected situation."
            },
            {
                "id": "ets22_t6_p7_159",
                "number": 159,
                "text": "Who most likely is Mr. Nam?",
                "options": {
                    "A": "A reporter",
                    "B": "A professor",
                    "C": "An art historian",
                    "D": "A tour guide"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Ông Nam nhiều khả năng là ai?<br/>(A) Một phóng viên.<br/>(B) Một giáo sư.<br/>(C) Một nhà sử học nghệ thuật.<br/>(D) Một hướng dẫn viên du lịch (A tour guide).</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 giới thiệu: <i>'Sung Min Nam, who was leading a tour of some of the historic sites downtown, changed his itinerary... I led the group back to the bus'</i> (người dẫn đoàn tour tham quan di tích lịch sử). Do đó ông ấy là hướng dẫn viên du lịch <b>(D)</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview",
                "strategyHint": "Cụm 'leading a tour... led the group back to the bus' xác nhận nghề tour guide."
            },
            {
                "id": "ets22_t6_p7_160",
                "number": 160,
                "text": "What does the article mention about the Craverton Art Museum?",
                "options": {
                    "A": "It did not lose money yesterday.",
                    "B": "It is located near downtown Craverton.",
                    "C": "It is open to visitors on Tuesdays.",
                    "D": "It will be starting a series of art classes."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Bài báo đề cập điều gì về Bảo tàng Nghệ thuật Craverton?<br/>(A) Nó không bị mất tiền/doanh thu vào ngày hôm qua (It did not lose money yesterday).<br/>(B) Nó nằm gần trung tâm thành phố Craverton.<br/>(C) Nó mở cửa cho khách tham quan vào các ngày thứ Ba.<br/>(D) Nó sẽ bắt đầu một loạt lớp học nghệ thuật.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 3 nêu: <i>'For the Craverton Art Museum, the outage did not make a difference in earnings because its galleries are closed to the public on Tuesdays.'</i> (sự cố cúp điện không ảnh hưởng đến doanh thu vì thứ Ba là ngày bảo tàng đóng cửa). <i>did not make a difference in earnings = did not lose money</i>. Chọn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "'did not make a difference in earnings' tương đương 'did not lose money'."
            },
            {
                "id": "ets22_t6_p7_161",
                "number": 161,
                "text": "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n“However, staff members did get the day off.”",
                "options": {
                    "A": "[1]",
                    "B": "[2]",
                    "C": "[3]",
                    "D": "[4]"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Câu 'Tuy nhiên, các nhân viên vẫn được nghỉ làm ngày hôm đó' thuộc về vị trí nào hợp lý nhất?<br/>(A) [1]<br/>(B) [2]<br/>(C) [3]<br/>(D) [4]</p><p><b>Phân tích logic liên kết:</b> Ngay trước vị trí [3] đề cập đến việc Bảo tàng Nghệ thuật Craverton đóng cửa vào thứ Ba nên việc mất điện không ảnh hưởng doanh thu. Câu <i>'However, staff members did get the day off'</i> (Tuy nhiên, nhân viên bảo tàng đã được cho nghỉ ngày hôm đó do cúp điện) bổ sung thông tin nhân sự của bảo tàng một cách liền mạch tại vị trí <b>[3]</b>. Chọn <b>(C)</b>.</p>",
                "questionType": "Sentence Insertion",
                "subCategory": "Sentence Insertion",
                "strategyHint": "Vị trí [3] tiếp nối mạch nói về việc bảo tàng đóng cửa và nhân viên được nghỉ."
            }
        ]
    }
]
