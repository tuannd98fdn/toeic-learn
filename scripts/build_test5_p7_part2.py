import json

part2_sets = [
    # Set 6: Q159 - Q161 (Web Page)
    {
        "id": "ets22_t5_p7_s06",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s06_p1",
                "type": "Web Page",
                "title": "Web Page",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p style='color: #666; font-size: 0.85rem; margin-top: 0;'>http://www.coltonhotels.com.au/accommodations</p>"
                           "<p>— [1] —. The Melbourne Colton Hotel is pleased to announce that construction of the new Yarra River wing is now completed. — [2] —. This new section offers extended-stay apartments, which are ideal for executives who are relocating or for people on company travel for more than a week. We offer furnished one- and two-bedroom apartments with a living room, work space, and full kitchen. — [3] —.</p>"
                           "<p>We offer:</p>"
                           "<ul style='margin: 0; padding-left: 20px;'>"
                           "<li>Different levels of pricing for housekeeping</li>"
                           "<li>A variety of low-cost Internet and phone plans</li>"
                           "<li>Conference facilities that can be booked for a minimal fee</li>"
                           "<li>Short-term gym memberships at several nearby fitness centers</li>"
                           "<li>Complimentary coffee served each morning in the lobby</li>"
                           "</ul>"
                           "<p style='margin-top: 12px;'>The Melbourne Colton Hotel is close to transportation, tourist sites, and shopping.</p>"
                           "<p>Contact reservations@coltonhotels.com.au for more information or call 61 3 7010 9921. — [4] —.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_159",
                "number": 159,
                "text": "For whom is the information mainly intended?",
                "options": {
                    "A": "Business travelers",
                    "B": "Tourists",
                    "C": "Hotel staff members",
                    "D": "Construction workers"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Thông tin này chủ yếu dành cho ai?<br/>(A) Những người đi công tác (Business travelers).<br/>(B) Khách du lịch.<br/>(C) Nhân viên khách sạn.<br/>(D) Công nhân xây dựng.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn văn ghi: <i>'This new section offers extended-stay apartments, which are ideal for executives who are relocating or for people on company travel for more than a week.'</i> (lý tưởng cho các nhà điều hành chuyển địa điểm công tác hoặc những người đi công tác của công ty trên một tuần). Do đó đối tượng chính là <b>Business travelers</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Overview",
                "strategyHint": "executives who are relocating or for people on company travel = Business travelers."
            },
            {
                "id": "ets22_t5_p7_160",
                "number": 160,
                "text": "What does the hotel provide at no charge?",
                "options": {
                    "A": "Housekeeping",
                    "B": "Internet",
                    "C": "Conference rooms",
                    "D": "Coffee"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Khách sạn cung cấp thứ gì miễn phí (at no charge)?<br/>(A) Dịch vụ dọn phòng.<br/>(B) Mạng Internet.<br/>(C) Các phòng hội nghị.<br/>(D) Cà phê.</p><p><b>Bằng chứng trích dẫn:</b> Trong danh sách dịch vụ cung cấp, gạch đầu dòng cuối ghi: <i>'Complimentary coffee served each morning in the lobby'</i> (cà phê miễn phí được phục vụ mỗi buổi sáng tại sảnh). Trong đó <i>complimentary</i> = <i>at no charge</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Complimentary coffee = provide coffee at no charge."
            },
            {
                "id": "ets22_t5_p7_161",
                "number": 161,
                "text": "In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong? “In addition, optional services are available for extended-stay guests.”",
                "options": {
                    "A": "[1]",
                    "B": "[2]",
                    "C": "[3]",
                    "D": "[4]"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Câu 'Ngoài ra, các dịch vụ tùy chọn có sẵn cho khách lưu trú dài ngày' phù hợp nhất ở vị trí nào?<br/><b>Bằng chứng trích dẫn:</b> Sau vị trí [3] là danh sách các dịch vụ tùy chọn kèm theo giá/phí: <i>'We offer: Different levels of pricing for housekeeping, A variety of low-cost Internet... Conference facilities... for a minimal fee'</i>. Câu này đóng vai trò câu dẫn vào danh sách dịch vụ tùy chọn, do đó vị trí [3] là chính xác nhất.</p>",
                "questionType": "Sentence Insertion",
                "subCategory": "Structure",
                "strategyHint": "Nhận diện câu dẫn 'optional services are available' trước danh sách liệt kê các dịch vụ có tính phí/lựa chọn."
            }
        ]
    },

    # Set 7: Q162 - Q163 (Text-Message Chain)
    {
        "id": "ets22_t5_p7_s07",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s07_p1",
                "type": "Text-Message Chain",
                "title": "Text-Message Chain",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; background-color: var(--bg-surface, #fafafa);'>"
                           "<p style='margin: 6px 0;'><b>[2:11 P.M.] Frank Stern:</b> Hi, Petra. A customer wants 1,000 glossy color posters, double-sided. Any chance we can do this today? If not, they might take the job elsewhere.</p>"
                           "<p style='margin: 6px 0;'><b>[2:12 P.M.] Petra Kitzos:</b> Probably not. We’re backed up with a big job for Noble Architects. How about first thing tomorrow?</p>"
                           "<p style='margin: 6px 0;'><b>[2:12 P.M.] Frank Stern:</b> I’ll ask.</p>"
                           "<p style='margin: 6px 0;'><b>[2:13 P.M.] Frank Stern:</b> They want to know if it can be done by 10 A.M.</p>"
                           "<p style='margin: 6px 0;'><b>[2:13 P.M.] Petra Kitzos:</b> Sure.</p>"
                           "<p style='margin: 6px 0;'><b>[2:14 P.M.] Frank Stern:</b> That’s a relief. Thanks.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_162",
                "number": 162,
                "text": "Where do Mr. Stern and Ms. Kitzos most likely work?",
                "options": {
                    "A": "At a shipping store",
                    "B": "At an architecture firm",
                    "C": "At an accounting office",
                    "D": "At a print shop"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Ông Stern và cô Kitzos nhiều khả năng làm việc ở đâu nhất?<br/>(A) Tại một cửa hàng vận chuyển.<br/>(B) Tại một công ty kiến trúc.<br/>(C) Tại một văn phòng kế toán.<br/>(D) Tại một xưởng/tiệm in ấn (print shop).</p><p><b>Bằng chứng trích dẫn:</b> Khách hàng yêu cầu: <i>'1,000 glossy color posters, double-sided'</i> (1.000 áp phích màu bóng, in hai mặt). Nơi thực hiện công việc in áp phích màu chính là tiệm in (print shop).</p>",
                "questionType": "Inference",
                "subCategory": "Overview",
                "strategyHint": "1,000 glossy color posters, double-sided = print shop."
            },
            {
                "id": "ets22_t5_p7_163",
                "number": 163,
                "text": "At 2:14 P.M., what does Mr. Stern most likely mean when he writes, “That’s a relief”?",
                "options": {
                    "A": "He is grateful to Ms. Kitzos for working overtime.",
                    "B": "He is no longer worried that his company might lose a client.",
                    "C": "He appreciates how quickly Ms. Kitzos responded.",
                    "D": "He is glad that he does not need to come in early in the morning."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Vào lúc 2:14 chiều, ông Stern có ý gì nhất khi viết 'That’s a relief' (Thật nhẹ nhõm)?<br/>(A) Ông biết ơn cô Kitzos vì đã làm thêm giờ.<br/>(B) Ông không còn lo lắng công ty có thể mất đi một khách hàng.<br/>(C) Ông đánh giá cao việc cô Kitzos phản hồi nhanh chóng.<br/>(D) Ông vui vì không phải đến làm sớm vào buổi sáng.</p><p><b>Bằng chứng trích dẫn:</b> Lúc 2:11 P.M., Frank Stern nói: <i>'If not, they might take the job elsewhere.'</i> (Nếu không kịp thì họ có thể mang công việc này đi chỗ khác). Khi Petra đồng ý hoàn thành trước 10 giờ sáng mai, nỗi lo mất khách hàng đã được giải tỏa.</p>",
                "questionType": "Context Clue / Speaker Meaning",
                "subCategory": "Inference",
                "strategyHint": "Liên hệ với câu đầu: 'If not, they might take the job elsewhere' thể hiện sự lo lắng mất khách."
            }
        ]
    },

    # Set 8: Q164 - Q167 (Article)
    {
        "id": "ets22_t5_p7_s08",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s08_p1",
                "type": "Article",
                "title": "Article",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; line-height: 1.6;'>"
                           "<h3 style='margin-top: 0;'>Houkcomm Eyes Downtown Roseville</h3>"
                           "<p><b>(April 22)</b>—Houkcomm, one of the state's leading telecommunications companies, will likely establish operations in Roseville. Houkcomm is reportedly looking to open a Roseville office as part of a new venture for the company: an expansion into the digital media industry. Houkcomm spokespeople have not offered any details on the plan, but two architects involved with the project confirmed that one proposed office building design would accommodate over 100 workers. The likely location for this soon-to-be constructed building, according to these sources, is a property adjacent to Behr Square in central Roseville.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_164",
                "number": 164,
                "text": "What is Houkcomm planning to do in Roseville?",
                "options": {
                    "A": "Offer a new telephone service",
                    "B": "Lease space to subcontractors",
                    "C": "Relocate its headquarters",
                    "D": "Open a new business division"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Houkcomm đang lên kế hoạch làm gì ở Roseville?<br/>(A) Cung cấp một dịch vụ điện thoại mới.<br/>(B) Cho các nhà thầu phụ thuê lại mặt bằng.<br/>(C) Di dời trụ sở chính.<br/>(D) Mở một bộ phận/mảng kinh doanh mới.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn văn nêu: <i>'Houkcomm is reportedly looking to open a Roseville office as part of a new venture for the company: an expansion into the digital media industry.'</i> (mở văn phòng như một phần của dự án kinh doanh mới: mở rộng sang ngành truyền thông kỹ thuật số). <i>new venture / expansion into digital media</i> tương ứng với <i>Open a new business division</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "new venture / expansion into digital media = Open a new business division."
            },
            {
                "id": "ets22_t5_p7_165",
                "number": 165,
                "text": "What is true about Houkcomm?",
                "options": {
                    "A": "It is the only telecommunications company in the state.",
                    "B": "It is currently leasing space in central Roseville.",
                    "C": "It has recently hired more than 100 new workers.",
                    "D": "It already has a major presence in the state."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì là đúng về Houkcomm?<br/>(A) Đây là công ty viễn thông duy nhất trong bang.<br/>(B) Hiện đang thuê mặt bằng ở trung tâm Roseville.<br/>(C) Gần đây đã thuê hơn 100 công nhân mới.<br/>(D) Đã có sự hiện diện lớn trong bang.</p><p><b>Bằng chứng trích dẫn:</b> Câu đầu tiên: <i>'Houkcomm, one of the state's leading telecommunications companies'</i> (một trong những công ty viễn thông hàng đầu của bang). Điều này chứng tỏ công ty đã có quy mô và hiện diện lớn trong bang (<i>major presence in the state</i>).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "one of the state's leading telecommunications companies = already has a major presence in the state."
            },
            {
                "id": "ets22_t5_p7_166",
                "number": 166,
                "text": "How did the reporter most likely obtain information for the article?",
                "options": {
                    "A": "From a press release written by Houkcomm representatives",
                    "B": "By interviewing employees of a firm that is doing work for Houkcomm",
                    "C": "Through public documents and construction permits",
                    "D": "By attending a press conference in Roseville"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Phóng viên nhiều khả năng đã thu thập thông tin cho bài báo bằng cách nào?<br/>(A) Từ một thông cáo báo chí do đại diện Houkcomm viết.<br/>(B) Bằng cách phỏng vấn nhân viên của một công ty đang làm việc cho Houkcomm.<br/>(C) Thông qua các tài liệu công khai và giấy phép xây dựng.<br/>(D) Bằng cách tham dự một cuộc họp báo ở Roseville.</p><p><b>Bằng chứng trích dẫn:</b> Bài báo ghi: <i>'Houkcomm spokespeople have not offered any details... but two architects involved with the project confirmed that one proposed office building design would accommodate over 100 workers.'</i> Kiến trúc sư tham gia dự án chính là những người làm việc cho bên thiết kế được thuê bởi Houkcomm.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "two architects involved with the project confirmed = interviewing employees of a firm doing work for Houkcomm."
            },
            {
                "id": "ets22_t5_p7_167",
                "number": 167,
                "text": "According to the article, what is likely to happen soon?",
                "options": {
                    "A": "Construction will begin on a new building.",
                    "B": "All Behr Square residences will be purchased.",
                    "C": "Houkcomm will negotiate new supply contracts.",
                    "D": "Manufacturing jobs will increase in Roseville."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo bài báo, điều gì nhiều khả năng sẽ diễn ra sớm?<br/>(A) Việc xây dựng tòa nhà mới sẽ bắt đầu.<br/>(B) Toàn bộ nhà ở tại Quảng trường Behr sẽ được mua lại.<br/>(C) Houkcomm sẽ đàm phán hợp đồng cung ứng mới.<br/>(D) Việc làm trong ngành sản xuất sẽ tăng ở Roseville.</p><p><b>Bằng chứng trích dẫn:</b> Câu cuối bài báo: <i>'The likely location for this soon-to-be constructed building... is a property adjacent to Behr Square'</i>. Cụm <i>soon-to-be constructed building</i> cho biết việc xây dựng tòa nhà mới sắp bắt đầu.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "soon-to-be constructed building = Construction will begin on a new building."
            }
        ]
    },

    # Set 9: Q168 - Q171 (E-mail)
    {
        "id": "ets22_t5_p7_s09",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s09_p1",
                "type": "E-mail",
                "title": "E-mail",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>From:</b> Takeshi Ishiguro<br/>"
                           "<b>To:</b> All Sevastya employees<br/>"
                           "<b>Subject:</b> Update<br/>"
                           "<b>Date:</b> December 13</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #eee); margin: 12px 0;'/>"
                           "<p>Dear Sevastya employees,</p>"
                           "<p>I am writing to give you an update on this year’s sales so far. — [1] —. I am happy to report that currently our sales volume is up 20% from last year. This is due in part to the fact that we have been very successful in expanding our international reach.</p>"
                           "<p>— [2] —. In Brazil, sales increased 57%, which can be attributed to the Rio de Janeiro Fashion Show where our evening wear was featured. A similar trend emerged in Russia, where sales were up by 32%. — [3] —. There we anticipate sustained growth for the rest of the year, especially in our winter apparel line. We also saw sales growth in the United Arab Emirates (UAE), but growth was a modest 10% due to fierce competition. That said, in this market, sign-ups for our credit card were strong. Finally, in Korea, where we have had our most successful international market launch thus far, favorable news articles about our products drove very strong sales.</p>"
                           "<p>— [4] —. Thus, overall, it’s been an excellent year so far. I am confident that our new program, which offers discounts to customers who invite others to shop with us, will begin to boost sales growth at all locations.</p>"
                           "<p>Sincerely,<br/>Takeshi Ishiguro<br/>Vice President of Sales</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_168",
                "number": 168,
                "text": "What kind of business is Sevastya?",
                "options": {
                    "A": "A travel agency",
                    "B": "A magazine publisher",
                    "C": "A clothing retailer",
                    "D": "A hotel chain"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Sevastya là loại hình doanh nghiệp nào?<br/>(A) Công ty du lịch.<br/>(B) Nhà xuất bản tạp chí.<br/>(C) Nhà bán lẻ quần áo/thời trang.<br/>(D) Chuỗi khách sạn.</p><p><b>Bằng chứng trích dẫn:</b> Email đề cập đến <i>'Rio de Janeiro Fashion Show where our evening wear was featured'</i> (trình diễn thời trang Rio nơi trang phục dạ hội của chúng tôi được giới thiệu) và <i>'winter apparel line'</i> (dòng trang phục mùa đông). Do đó đây là nhà bán lẻ quần áo (<b>clothing retailer</b>).</p>",
                "questionType": "Inference",
                "subCategory": "Overview",
                "strategyHint": "fashion show, evening wear, winter apparel line = clothing retailer."
            },
            {
                "id": "ets22_t5_p7_169",
                "number": 169,
                "text": "According to the e-mail, where was the company’s product seen by an audience?",
                "options": {
                    "A": "In Brazil",
                    "B": "In Russia",
                    "C": "In the UAE",
                    "D": "In Korea"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo email, sản phẩm của công ty đã được khán giả trông thấy ở đâu?<br/>(A) Ở Brazil.<br/>(B) Ở Nga.<br/>(C) Ở UAE.<br/>(D) Ở Hàn Quốc.</p><p><b>Bằng chứng trích dẫn:</b> Email nêu: <i>'In Brazil, sales increased 57%, which can be attributed to the Rio de Janeiro Fashion Show where our evening wear was featured.'</i> (Ở Brazil, doanh số tăng 57% nhờ vào Buổi trình diễn thời trang Rio de Janeiro nơi trang phục dạ hội được trình diễn cho khán giả thưởng thức).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Rio de Janeiro Fashion Show (Brazil) where our evening wear was featured."
            },
            {
                "id": "ets22_t5_p7_170",
                "number": 170,
                "text": "According to Mr. Ishiguro, what will likely bring increased business in the future?",
                "options": {
                    "A": "Television commercials",
                    "B": "An expanded credit card program",
                    "C": "Company-sponsored contests",
                    "D": "Referrals from customers"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo ông Ishiguro, điều gì nhiều khả năng sẽ mang lại sự gia tăng kinh doanh trong tương lai?<br/>(A) Quảng cáo truyền hình.<br/>(B) Chương trình thẻ tín dụng mở rộng.<br/>(C) Các cuộc thi do công ty tài trợ.<br/>(D) Sự giới thiệu từ khách hàng (Referrals from customers).</p><p><b>Bằng chứng trích dẫn:</b> Đoạn cuối email: <i>'our new program, which offers discounts to customers who invite others to shop with us, will begin to boost sales growth at all locations.'</i> (chương trình giảm giá cho khách hàng mời người khác đến mua sắm cùng chúng tôi = sự giới thiệu từ khách hàng / referrals).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "invite others to shop with us = referrals from customers."
            },
            {
                "id": "ets22_t5_p7_171",
                "number": 171,
                "text": "In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong? “Here are some figures from around the world.”",
                "options": {
                    "A": "[1]",
                    "B": "[2]",
                    "C": "[3]",
                    "D": "[4]"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Câu 'Dưới đây là một số số liệu từ khắp nơi trên thế giới' phù hợp nhất ở vị trí nào?<br/><b>Bằng chứng trích dẫn:</b> Ngay sau vị trí [2] là đoạn văn phân tích cụ thể số liệu từng quốc gia trên thế giới: <i>'In Brazil, sales increased 57%... A similar trend emerged in Russia... in the United Arab Emirates... in Korea'</i>. Do đó câu mở đầu giới thiệu số liệu toàn cầu đặt ở vị trí [2] là hoàn toàn chuẩn xác.</p>",
                "questionType": "Sentence Insertion",
                "subCategory": "Structure",
                "strategyHint": "Câu giới thiệu 'figures from around the world' đứng trước đoạn liệt kê các nước Brazil, Russia, UAE, Korea."
            }
        ]
    },

    # Set 10: Q172 - Q175 (Text-Message Chain)
    {
        "id": "ets22_t5_p7_s10",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s10_p1",
                "type": "Text-Message Chain",
                "title": "Text-Message Chain",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; background-color: var(--bg-surface, #fafafa);'>"
                           "<p style='margin: 6px 0;'><b>Lynda McCann (1:08 P.M.)</b> Hello, Bernadette and Harrison. We urgently need to schedule a team meeting, so we can get working on our project.</p>"
                           "<p style='margin: 6px 0;'><b>Bernadette Ecco (1:10 P.M.)</b> Sure. Are you wanting an all-marketing-staff meeting? Let me know if I can assist.</p>"
                           "<p style='margin: 6px 0;'><b>Lynda McCann (1:12 P.M.)</b> No, I was thinking of the O'Neil project, so only the three of us who are on that team need to meet.</p>"
                           "<p style='margin: 6px 0;'><b>Bernadette Ecco (1:14 P.M.)</b> Okay. I’m free either this Wednesday or Friday during the early afternoon.</p>"
                           "<p style='margin: 6px 0;'><b>Harrison Miller (1:15 P.M.)</b> I thought I had been reassigned to the McMillan project instead.</p>"
                           "<p style='margin: 6px 0;'><b>Bernadette Ecco (1:17 P.M.)</b> No, the final slot on that team was filled by Jacob Aikens, since he’s worked on similar projects in the past, like the Greller project and the Allford project.</p>"
                           "<p style='margin: 6px 0;'><b>Harrison Miller (1:18 P.M.)</b> Okay, I see.</p>"
                           "<p style='margin: 6px 0;'><b>Lynda McCann (1:19 P.M.)</b> I'm available on Wednesday and Friday as well, but only before 3 P.M.; I’ll be meeting with the sales team on Wednesday at 3 P.M. and the research team on Friday at 3:30 P.M.</p>"
                           "<p style='margin: 6px 0;'><b>Harrison Miller (1:21 P.M.)</b> Wednesday won’t work for me, but I could do Friday at 1 P.M.</p>"
                           "<p style='margin: 6px 0;'><b>Lynda McCann (1:23 P.M.)</b> Sounds good! Bernadette?</p>"
                           "<p style='margin: 6px 0;'><b>Bernadette Ecco (1:23 P.M.)</b> Perfect! I’ll reserve the small conference room for us.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_172",
                "number": 172,
                "text": "In what department do the writers most likely work?",
                "options": {
                    "A": "Sales",
                    "B": "Marketing",
                    "C": "Billing",
                    "D": "Research"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người viết tin nhắn nhiều khả năng làm việc ở phòng ban nào nhất?<br/>(A) Phòng Bán hàng.<br/>(B) Phòng Tiếp thị (Marketing).<br/>(C) Phòng Thanh toán hóa đơn.<br/>(D) Phòng Nghiên cứu.</p><p><b>Bằng chứng trích dẫn:</b> Bernadette Ecco hỏi lúc 1:10 P.M.: <i>'Are you wanting an all-marketing-staff meeting? Let me know if I can assist.'</i> (Bạn có muốn một cuộc họp toàn bộ nhân viên phòng marketing không?). Ngoài ra ở tin nhắn 1:19 P.M., Lynda nhắc cô sẽ họp với 'the sales team' và 'the research team' như các đối tác phòng ban khác.</p>",
                "questionType": "Inference",
                "subCategory": "Overview",
                "strategyHint": "all-marketing-staff meeting -> phòng Marketing."
            },
            {
                "id": "ets22_t5_p7_173",
                "number": 173,
                "text": "To what project are the three writers assigned?",
                "options": {
                    "A": "The O’Neil project",
                    "B": "The McMillan project",
                    "C": "The Greller project",
                    "D": "The Allford project"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Ba người viết được phân công vào dự án nào?<br/>(A) Dự án O’Neil.<br/>(B) Dự án McMillan.<br/>(C) Dự án Greller.<br/>(D) Dự án Allford.</p><p><b>Bằng chứng trích dẫn:</b> Lynda nói ở tin nhắn 1:12 P.M.: <i>'No, I was thinking of the O'Neil project, so only the three of us who are on that team need to meet.'</i> (chỉ ba chúng ta, những người thuộc nhóm dự án O'Neil, cần họp).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "the O'Neil project, so only the three of us who are on that team need to meet."
            },
            {
                "id": "ets22_t5_p7_174",
                "number": 174,
                "text": "At 1:18 P.M., what does Mr. Miller most likely mean when he writes, “Okay, I see”?",
                "options": {
                    "A": "He understands that he was not moved to another team.",
                    "B": "He recognizes that he did not come to a meeting on time.",
                    "C": "He accepts that he is not going to meet with a client.",
                    "D": "He acknowledges that he did not complete a task."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Vào lúc 1:18 P.M., ông Miller có ý gì nhất khi viết 'Okay, I see' (Tôi hiểu rồi)?<br/>(A) Ông hiểu rằng mình đã không bị chuyển sang nhóm khác.<br/>(B) Ông nhận ra mình đã không đến cuộc họp đúng giờ.<br/>(C) Ông chấp nhận rằng mình sẽ không gặp khách hàng.<br/>(D) Ông thừa nhận mình đã không hoàn thành nhiệm vụ.</p><p><b>Bằng chứng trích dẫn:</b> Trước đó lúc 1:15 P.M. Harrison Miller thắc mắc: <i>'I thought I had been reassigned to the McMillan project instead.'</i> Sau khi Bernadette giải thích rằng vị trí cuối cùng của dự án McMillan đã được Jacob Aikens đảm nhận, Harrison nói 'Okay, I see' nghĩa là ông hiểu mình vẫn ở nhóm hiện tại (dự án O'Neil) chứ không bị chuyển đi.</p>",
                "questionType": "Context Clue / Speaker Meaning",
                "subCategory": "Inference",
                "strategyHint": "Harrison tưởng mình chuyển sang McMillan, Bernadette nói vị trí đó do Jacob giữ -> hiểu rằng mình không bị chuyển nhóm."
            },
            {
                "id": "ets22_t5_p7_175",
                "number": 175,
                "text": "Why was the meeting scheduled for Friday rather than Wednesday?",
                "options": {
                    "A": "Ms. McCann has a commitment with another team on that day.",
                    "B": "Ms. Ecco’s schedule is very busy this month.",
                    "C": "Mr. Miller is unavailable on Wednesday.",
                    "D": "A sales team will be using the conference room on Wednesday."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao cuộc họp được lên lịch vào thứ Sáu thay vì thứ Tư?<br/>(A) Cô McCann có lịch bận với nhóm khác vào ngày đó.<br/>(B) Lịch trình của cô Ecco rất bận trong tháng này.<br/>(C) Ông Miller không rảnh vào thứ Tư (Mr. Miller is unavailable on Wednesday).<br/>(D) Đội bán hàng sẽ sử dụng phòng hội nghị vào thứ Tư.</p><p><b>Bằng chứng trích dẫn:</b> Harrison Miller nói lúc 1:21 P.M.: <i>'Wednesday won’t work for me, but I could do Friday at 1 P.M.'</i> (Thứ Tư tôi không thể họp được, nhưng thứ Sáu lúc 1 giờ chiều thì được).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Wednesday won't work for me = Mr. Miller is unavailable on Wednesday."
            }
        ]
    }
]

with open("/private/tmp/ets5_extract/p7_part2.json", "w", encoding="utf-8") as f:
    json.dump(part2_sets, f, indent=2, ensure_ascii=False)

print(f"Generated {len(part2_sets)} sets ({sum(len(s['questions']) for s in part2_sets)} questions) in p7_part2.json")
