import json

part7_sets = [
    # SET 1: Q147-148 (Sign)
    {
        "id": "ets22_t2_p7_s01",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s01_p1",
                "type": "Notice",
                "title": "Sign",
                "content": "<div style='border: 2px solid var(--border-color, #444); padding: 16px; border-radius: 8px; text-align: center;'><h3 style='margin-top:0; text-transform: uppercase;'>WHAT’S GOING ON HERE?</h3><p style='font-size: 1.1em;'><b>Work in progress:</b> Commercial<br/><b>Anticipated completion date:</b> March 1</p><div style='display: flex; justify-content: space-around; margin: 16px 0; text-align: left;'><div><b>Owner</b><br/>Walker Booksellers<br/>4634 Goosetown Drive<br/>Arden, NC</div><div><b>General Contractor</b><br/>Matthiesen Builders<br/>4500 Smith Street<br/>Raleigh, NC</div></div><p style='font-size: 0.9em; margin-bottom: 8px;'>All work permits are on file with the Department of Planning.</p><p style='font-size: 0.95em;'>To report a problem at this work site, call <b>919-555-0134</b>.</p></div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_147",
                "number": 147,
                "text": "Where would the sign most likely appear?",
                "options": {
                    "A": "Above a book display",
                    "B": "At a construction site",
                    "C": "On a residential building",
                    "D": "In a university classroom"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Biển báo này có nhiều khả năng xuất hiện ở đâu nhất?<br/>(A) Phía trên một quầy trưng bày sách.<br/>(B) Tại một công trường xây dựng.<br/>(C) Trên một tòa nhà dân cư.<br/>(D) Trong một lớp học đại học.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Biển báo có các thông tin đặc trưng của một công trường xây dựng: <i>'Work in progress: Commercial'</i> (Công trình đang thi công: Thương mại), <i>'Anticipated completion date: March 1'</i> (Ngày hoàn thành dự kiến: 1 tháng 3), <i>'General Contractor: Matthiesen Builders'</i> (Tổng thầu xây dựng), <i>'work permits'</i> (giấy phép xây dựng), và <i>'To report a problem at this work site...'</i> (Để báo cáo sự cố tại công trường này...). Do đó, biển báo xuất hiện tại một công trường xây dựng (construction site).</p><p><b>Mẹo làm bài & Bẫy ETS:</b> Các từ khóa nhận diện công trường: <i>Work in progress, Contractor, Builders, work site, work permits</i>.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Suy luận địa điểm dựa trên các từ khóa đặc trưng về thi công, tổng thầu và giấy phép xây dựng."
            },
            {
                "id": "ets22_t2_p7_148",
                "number": 148,
                "text": "Why should a reader of the sign call the phone number?",
                "options": {
                    "A": "To file a permit",
                    "B": "To apply for a job",
                    "C": "To confirm a date",
                    "D": "To report a problem"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Tại sao người đọc biển báo nên gọi vào số điện thoại?<br/>(A) Để nộp giấy phép.<br/>(B) Để nộp đơn xin việc.<br/>(C) Để xác nhận ngày tháng.<br/>(D) Để báo cáo sự cố.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Dòng cuối cùng của biển báo ghi rõ: <i>'To report a problem at this work site, call 919-555-0134.'</i> (Để báo cáo sự cố tại công trường này, hãy gọi 919-555-0134). Do đó chọn (D).</p><p><b>Mẹo làm bài & Bẫy ETS:</b> Câu hỏi chi tiết trực tiếp, dùng kỹ thuật quét nhanh (scanning) tìm dãy số điện thoại để đọc thông tin ngay trước nó.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Tìm vị trí số điện thoại ở cuối thông báo để đọc mục đích của cuộc gọi."
            }
        ]
    },

    # SET 2: Q149-151 (Information)
    {
        "id": "ets22_t2_p7_s02",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s02_p1",
                "type": "Text",
                "title": "Information",
                "content": "<p>On Saturday, August 1, the Durhamtown Symphony Orchestra will be giving a free educational performance at the Cardona Culture Center, 498 Mahogany Ave. Among other things, the musicians will discuss the origins and development of their instruments as well as some musical styles. Audience members will have an opportunity to ask questions. The event will conclude with the orchestra performing works by some of today’s well-known musicians and song writers.</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_149",
                "number": 149,
                "text": "What is the purpose of the information?",
                "options": {
                    "A": "To announce a change of location",
                    "B": "To publicize an upcoming event",
                    "C": "To describe some instruments",
                    "D": "To review a performance"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Mục đích của bản tin là gì?<br/>(A) Để thông báo về việc đổi địa điểm.<br/>(B) Để quảng bá một sự kiện sắp tới.<br/>(C) Để mô tả một số nhạc cụ.<br/>(D) Để đánh giá một buổi biểu diễn.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn văn mở đầu bằng: <i>'On Saturday, August 1, the Durhamtown Symphony Orchestra will be giving a free educational performance at the Cardona Culture Center...'</i> (Vào thứ Bảy, ngày 1 tháng 8, Dàn nhạc Giao hưởng Durhamtown sẽ tổ chức một buổi biểu diễn giáo dục miễn phí tại Trung tâm Văn hóa Cardona...). Đây là thông báo để quảng bá sự kiện âm nhạc sắp diễn ra.</p><p><b>Mẹo làm bài & Bẫy ETS:</b> Thì tương lai <i>'will be giving...'</i> kết hợp với mốc thời gian sắp tới (Saturday, August 1) cho thấy mục đích là quảng bá sự kiện tương lai (publicize an upcoming event).</p>",
                "questionType": "Main Idea",
                "subCategory": "Main Idea & Purpose",
                "strategyHint": "Xác định câu mở đầu nêu mốc thời gian và hành động diễn ra trong tương lai."
            },
            {
                "id": "ets22_t2_p7_150",
                "number": 150,
                "text": "According to the information, what will the audience members be able to do?",
                "options": {
                    "A": "Sing along",
                    "B": "Request songs",
                    "C": "Talk to the musicians",
                    "D": "Sign up for music lessons"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Theo thông tin trên, khán giả sẽ có thể làm gì?<br/>(A) Hát theo.<br/>(B) Yêu cầu bài hát.<br/>(C) Trò chuyện với các nhạc công.<br/>(D) Đăng ký các buổi học âm nhạc.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn văn nêu rõ: <i>'Audience members will have an opportunity to ask questions.'</i> (Khán giả sẽ có cơ hội đặt câu hỏi). Việc đặt câu hỏi cho các nhạc công được diễn đạt tương đương (paraphrase) bằng <i>'Talk to the musicians'</i> (Trò chuyện với các nhạc công).</p><p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>have an opportunity to ask questions = talk to the musicians</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét từ khóa 'Audience members' để tìm quyền lợi/hoạt động của khán giả."
            },
            {
                "id": "ets22_t2_p7_151",
                "number": 151,
                "text": "The word “conclude” in line 5 is closest in meaning to",
                "options": {
                    "A": "raise",
                    "B": "decide",
                    "C": "believe",
                    "D": "finish"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Từ “conclude” ở dòng 5 gần nghĩa nhất với từ nào?<br/>(A) nâng lên.<br/>(B) quyết định.<br/>(C) tin tưởng.<br/>(D) kết thúc.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Ngữ cảnh: <i>'The event will conclude with the orchestra performing works...'</i> (Sự kiện sẽ kết thúc với phần trình diễn của dàn nhạc...). Từ <b>conclude</b> trong ngữ cảnh một sự kiện mang nghĩa là khép lại, kết thúc, đồng nghĩa với <b>finish</b> hoặc <b>end</b>.</p><p><b>Mẹo làm bài & Bẫy ETS:</b> Phân biệt <i>conclude</i> nghĩa kết luận (decide/deduce) vs kết thúc sự kiện (finish/end).</p>",
                "questionType": "Vocabulary",
                "subCategory": "Vocabulary in Context",
                "strategyHint": "Thay thế từng từ vào ngữ cảnh sự kiện để kiểm tra tính hợp lý."
            }
        ]
    },

    # SET 3: Q152-153 (Online chat discussion)
    {
        "id": "ets22_t2_p7_s03",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s03_p1",
                "type": "Chat",
                "title": "Online Chat Discussion",
                "content": "<p><b>Bonnie Ruiz [2:40 P.M.]:</b> Good morning; welcome to Ship With Us.<br/><b>Nick Portier [2:41 P.M.]:</b> Hi. I’m Nick, and I’m having trouble getting into my account.<br/><b>Bonnie Ruiz [2:42 P.M.]:</b> Hi, Nick. I’m happy to help. Have you tried resetting your password?<br/><b>Nick Portier [2:43 P.M.]:</b> I have, and I’m still not able to get in. I need to send a large shipment of brochures and catalogs in the next 15 minutes, and I’m a little anxious.<br/><b>Bonnie Ruiz [2:44 P.M.]:</b> Don’t worry. I’m here to help! Your account number is X58292J, right? I can reset your account on my end.<br/><b>Nick Portier [2:45 P.M.]:</b> That’s it.<br/><b>Bonnie Ruiz [2:46 P.M.]:</b> Great. I’ve sent a new password to the e-mail address associated with that account number, and you should receive it within the next two minutes. I’ll stay available until I’ve heard from you to make sure that you’ve accessed your account.<br/><b>Nick Portier [2:46 P.M.]:</b> Wonderful. Thanks!</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_152",
                "number": 152,
                "text": "What most likely is Ms. Ruiz’ occupation?",
                "options": {
                    "A": "Bank teller",
                    "B": "Graphic designer",
                    "C": "Software developer",
                    "D": "Customer-support specialist"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Nghề nghiệp của cô Ruiz nhiều khả năng là gì nhất?<br/>(A) Giao dịch viên ngân hàng.<br/>(B) Nhà thiết kế đồ họa.<br/>(C) Nhà phát triển phần mềm.<br/>(D) Chuyên viên hỗ trợ khách hàng.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Cô Ruiz chào: <i>'Good morning; welcome to Ship With Us... I’m happy to help... I can reset your account on my end.'</i> (Chào buổi sáng; chào mừng bạn đến với Ship With Us... Tôi rất vui lòng hỗ trợ... Tôi có thể đặt lại tài khoản của bạn từ phía tôi). Đây là công việc của một chuyên viên hỗ trợ khách hàng (customer-support specialist).</p><p><b>Mẹo làm bài & Bẫy ETS:</b> Các câu thoại hỗ trợ đăng nhập, đặt lại mật khẩu và hỗ trợ tài khoản là dấu hiệu điển hình của Customer Support.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Dựa vào lời thoại chào hỏi và xử lý tài khoản cho khách hàng để suy luận nghề nghiệp."
            },
            {
                "id": "ets22_t2_p7_153",
                "number": 153,
                "text": "At 2:45 P.M., what does Mr. Portier most likely mean when he writes, “That’s it”?",
                "options": {
                    "A": "A password has been changed.",
                    "B": "He is able to access his account.",
                    "C": "He has received Ms. Ruiz’ e-mail.",
                    "D": "Ms. Ruiz has the information she needs."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Vào lúc 2:45 chiều, ông Portier có ý gì nhất khi viết “That’s it”?<br/>(A) Mật khẩu đã được thay đổi.<br/>(B) Ông ấy đã có thể truy cập vào tài khoản của mình.<br/>(C) Ông ấy đã nhận được email của cô Ruiz.<br/>(D) Cô Ruiz đã có thông tin mà cô ấy cần.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Ngay trước đó lúc 2:44 P.M., cô Ruiz hỏi: <i>'Your account number is X58292J, right?'</i> (Số tài khoản của bạn là X58292J, đúng không?). Khi ông Portier đáp lại: <i>'That’s it.'</i> (Chính là nó/Đúng số đó rồi), ông ấy đang xác nhận rằng thông tin số tài khoản cô Ruiz đưa ra là chính xác và cô ấy đã có đủ thông tin để thao tác (Ms. Ruiz has the information she needs).</p><p><b>Mẹo làm bài & Bẫy ETS:</b> Dạng câu hỏi hàm ý (Intent Question): Luôn đọc câu thoại ngay liền trước của đối phương để hiểu ngữ cảnh phản hồi.</p>",
                "questionType": "Sentence Placement & Intent",
                "subCategory": "Sentence Placement & Intent",
                "strategyHint": "Đọc câu thoại trước đó lúc 2:44 PM để hiểu điều ông Portier đang xác nhận."
            }
        ]
    },

    # SET 4: Q154-155 (Advertisement)
    {
        "id": "ets22_t2_p7_s04",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s04_p1",
                "type": "Advertisement",
                "title": "Advertisement",
                "content": "<div style='border: 1px solid var(--border-color, #444); padding: 16px; border-radius: 8px;'><h3 style='margin-top:0;'>Adnan’s Auto Garage</h3><p>5 Warner Place<br/><b>Serving Manchester for 20 years!</b><br/><b>Open:</b> Monday to Friday, 8 A.M. to 5 P.M.; Saturday, 9 A.M. to 1 P.M.</p><p>Adnan's Auto Garage is a full-service repair shop where customer service is our top priority! Our founder, Adnan Haddad, learned his skills as the head technician for a racing team. He and his staff of professional mechanics now service all makes and models of cars and trucks, both foreign and domestic. We'll keep your vehicle on the road!</p><p>We also sell used cars at competitive prices.<br/>Interested in selling your car? Call us now! <b>0161 496 0437</b></p></div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_154",
                "number": 154,
                "text": "What is indicated about Adnan’s Auto Garage?",
                "options": {
                    "A": "It will move to a new location in Manchester.",
                    "B": "It has been in business for two decades.",
                    "C": "It offers evening hours once a week.",
                    "D": "It repairs locally manufactured cars only."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Điều gì được chỉ ra về Gara Ô tô của Adnan?<br/>(A) Nó sẽ chuyển đến một địa điểm mới ở Manchester.<br/>(B) Nó đã hoạt động kinh doanh được hai thập kỷ.<br/>(C) Nó mở cửa buổi tối một lần mỗi tuần.<br/>(D) Nó chỉ sửa chữa xe sản xuất tại địa phương.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Quảng cáo ghi rõ: <i>'Serving Manchester for 20 years!'</i> (Phục vụ Manchester trong 20 năm qua!). Khoảng thời gian 20 năm (20 years) tương đương chính xác với hai thập kỷ (two decades).</p><p><b>Mẹo làm bài & Bẫy ETS:</b> Phép biến đổi từ vựng kinh điển trong TOEIC: <i>20 years = two decades</i>; <i>10 years = a decade</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Tìm thông tin về số năm hoạt động và quy đổi sang đơn vị thập kỷ (decades)."
            },
            {
                "id": "ets22_t2_p7_155",
                "number": 155,
                "text": "According to the advertisement, who is invited to call the phone number?",
                "options": {
                    "A": "Car owners",
                    "B": "Auto mechanics",
                    "C": "Race car technicians",
                    "D": "Truck drivers"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Theo quảng cáo, ai được mời gọi vào số điện thoại?<br/>(A) Những chủ xe ô tô.<br/>(B) Thợ sửa xe cơ giới.<br/>(C) Kỹ thuật viên xe đua.<br/>(D) Tài xế xe tải.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Dòng cuối quảng cáo nêu: <i>'Interested in selling your car? Call us now! 0161 496 0437'</i> (Bạn có quan tâm đến việc bán xe ô tô của mình không? Hãy gọi cho chúng tôi ngay!). Những người có xe ô tô để bán chính là các chủ sở hữu xe (car owners).</p><p><b>Mẹo làm bài & Bẫy ETS:</b> <i>selling your car ➔ car owners</i> (chủ sở hữu xe ô tô).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Xem đối tượng được hướng tới qua câu mời chào 'Interested in selling your car?'."
            }
        ]
    },

    # SET 5: Q156-158 (Notice)
    {
        "id": "ets22_t2_p7_s05",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s05_p1",
                "type": "Notice",
                "title": "Notice",
                "content": "<div style='border: 1px solid var(--border-color, #444); padding: 16px; border-radius: 8px;'><h3 style='margin-top:0; text-align:center;'>Watford Shredding Day</h3><p>Do you need to safely dispose of piles of confidential paperwork? Come to Watford Community Shredding Day on April 8 from 8:00 A.M. to 11:00 A.M.</p><p>A number of Security Too shredders will be conveniently located behind the Watford municipal parking garage. [1] Bring any unneeded bank statements, tax documents, and bills. [2] They will be securely shredded and recycled on the spot. Please note that the event is open to Watford Township residents only, and there is a five-kilo limit per household. [3] Security Too representatives will be on hand to talk about ways to protect your private information.</p><p>Community Shredding Day is brought to you by radio station 82.9 WQYX and Security Too. [4]</p><p>For more information, visit <b>www.watfordtownship/shreddingday.org</b>.</p></div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_156",
                "number": 156,
                "text": "What is the purpose of the notice?",
                "options": {
                    "A": "To notify residents of a due date",
                    "B": "To promote a service",
                    "C": "To welcome a new business to town",
                    "D": "To advertise a contest"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Mục đích của thông báo là gì?<br/>(A) Để thông báo cho cư dân về một ngày đến hạn.<br/>(B) Để quảng bá một dịch vụ.<br/>(C) Để chào đón một doanh nghiệp mới đến thị trấn.<br/>(D) Để quảng cáo một cuộc thi.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Thông báo giới thiệu sự kiện tiêu hủy tài liệu cộng đồng: <i>'Do you need to safely dispose of piles of confidential paperwork? Come to Watford Community Shredding Day...'</i> (Bạn có cần tiêu hủy an toàn các chồng giấy tờ mật không? Hãy đến với Ngày hội tiêu hủy tài liệu cộng đồng Watford...). Đây là hoạt động quảng bá dịch vụ tiêu hủy và tái chế giấy tờ (promote a service).</p>",
                "questionType": "Main Idea",
                "subCategory": "Main Idea & Purpose",
                "strategyHint": "Đọc câu hỏi dẫn nhập ở đầu thông báo để xác định dịch vụ đang được giới thiệu."
            },
            {
                "id": "ets22_t2_p7_157",
                "number": 157,
                "text": "What will most likely happen on April 8?",
                "options": {
                    "A": "Paper will be recycled.",
                    "B": "A bank representative will meet clients.",
                    "C": "A new parking garage will open.",
                    "D": "An informational seminar will be offered."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Điều gì nhiều khả năng sẽ xảy ra vào ngày 8 tháng 4 nhất?<br/>(A) Giấy sẽ được tái chế.<br/>(B) Một đại diện ngân hàng sẽ gặp gỡ khách hàng.<br/>(C) Một nhà để xe mới sẽ mở cửa.<br/>(D) Một buổi hội thảo thông tin sẽ được tổ chức.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 2 nêu rõ: <i>'Bring any unneeded bank statements, tax documents, and bills... They will be securely shredded and recycled on the spot.'</i> (Hãy mang theo bất kỳ sao kê ngân hàng, tài liệu thuế và hóa đơn không cần thiết nào... Chúng sẽ được cắt nhỏ an toàn và tái chế ngay tại chỗ). Do đó, giấy sẽ được tái chế (Paper will be recycled).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét từ 'April 8' và đọc chi tiết hành động diễn ra tại chỗ (recycled on the spot)."
            },
            {
                "id": "ets22_t2_p7_158",
                "number": 158,
                "text": "In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong?\n“Simply drive up and drop them off.”",
                "options": {
                    "A": "[1]",
                    "B": "[2]",
                    "C": "[3]",
                    "D": "[4]"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Câu sau đây phù hợp nhất ở vị trí nào: “Chỉ cần lái xe đến và để chúng lại.”<br/>(A) [1]<br/>(B) [2]<br/>(C) [3]<br/>(D) [4]</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Câu trước vị trí [2] nói: <i>'Bring any unneeded bank statements, tax documents, and bills.'</i> (Hãy mang theo sao kê ngân hàng, tài liệu thuế, hóa đơn). Đại từ <i>'them'</i> trong câu cần điền quy chiếu hoàn hảo đến các giấy tờ này (bank statements, tax documents, and bills). Sau khi thả tài liệu lại tại [2], câu tiếp sau tiếp nối bằng: <i>'They will be securely shredded and recycled on the spot.'</i> (Chúng sẽ được cắt vụn an toàn và tái chế tại chỗ). Vì vậy vị trí [2] là hoàn toàn chuẩn xác.</p>",
                "questionType": "Sentence Placement & Intent",
                "subCategory": "Sentence Placement & Intent",
                "strategyHint": "Tìm đại từ quy chiếu 'them' liên kết với danh từ số nhiều (documents, bills) ở câu đứng trước."
            }
        ]
    },

    # SET 6: Q159-160 (E-mail)
    {
        "id": "ets22_t2_p7_s06",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s06_p1",
                "type": "Email",
                "title": "E-mail",
                "content": "<p><b>To:</b> Kamini Das &lt;k.das@armail.net&gt;<br/><b>From:</b> Customer Service &lt;customerservice@sandringsuites.com.au&gt;<br/><b>Date:</b> 7 February<br/><b>Subject:</b> Regarding your visit</p><p>Dear Ms. Das,<br/>Thank you for your recent stay with us at Sandring Suites. Our top priority is to provide our guests with an exceptional experience. We ask that you complete a three-minute survey to rate your time with us. Please visit www.sandringsuites.com.au and click the survey link in the top right corner of the Web page. Use code SAN5341 to complete the survey. To thank you for participating, we will enter your name in our monthly raffle to win a complimentary two-night stay at one of our hotels.<br/><br/>Regards,<br/>Silvia Monier<br/>Customer Service, Sandring Suites</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_159",
                "number": 159,
                "text": "What is Ms. Das being asked to do?",
                "options": {
                    "A": "Confirm her contact information",
                    "B": "Provide some feedback",
                    "C": "Complete a purchase",
                    "D": "Renew a subscription"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Cô Das được yêu cầu làm gì?<br/>(A) Xác nhận thông tin liên lạc của cô ấy.<br/>(B) Cung cấp một số phản hồi.<br/>(C) Hoàn tất một giao dịch mua hàng.<br/>(D) Gia hạn gói đăng ký.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Email viết: <i>'We ask that you complete a three-minute survey to rate your time with us.'</i> (Chúng tôi yêu cầu bạn hoàn thành một khảo sát 3 phút để đánh giá thời gian lưu trú của bạn với chúng tôi). Hoàn thành khảo sát đánh giá tương đương với việc cung cấp phản hồi (Provide some feedback).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Tìm động từ yêu cầu 'ask that you...' và cụm từ tương đương với 'survey' là 'feedback'."
            },
            {
                "id": "ets22_t2_p7_160",
                "number": 160,
                "text": "What does Ms. Monier indicate she will do for Ms. Das?",
                "options": {
                    "A": "Extend her hotel stay free of charge",
                    "B": "Assist her in using a Web site",
                    "C": "Give her a chance to win a prize",
                    "D": "Provide a discount code for a future hotel stay"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Cô Monier chỉ ra rằng cô ấy sẽ làm gì cho cô Das?<br/>(A) Gia hạn kỳ nghỉ khách sạn miễn phí.<br/>(B) Hỗ trợ cô ấy sử dụng một trang web.<br/>(C) Cho cô ấy cơ hội giành giải thưởng.<br/>(D) Cung cấp mã giảm giá cho lần lưu trú khách sạn sau này.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Email nêu: <i>'To thank you for participating, we will enter your name in our monthly raffle to win a complimentary two-night stay at one of our hotels.'</i> (Để cảm ơn sự tham gia của bạn, chúng tôi sẽ đưa tên bạn vào buổi quay số rút thăm trúng thưởng hàng tháng để có cơ hội giành kỳ nghỉ 2 đêm miễn phí tại một trong các khách sạn của chúng tôi). Tham gia rút thăm trúng thưởng (raffle) đồng nghĩa với việc cho cơ hội trúng giải (Give her a chance to win a prize).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét từ khóa 'raffle to win' tương đương với 'chance to win a prize'."
            }
        ]
    }
]

with open('/private/tmp/part7_sets_1_6.json', 'w', encoding='utf-8') as f:
    json.dump(part7_sets, f, ensure_ascii=False, indent=2)

print("Saved sets 1-6!")
