import json

part7_sets_11_15 = [
    # SET 11: Q176-180 (Double Passage)
    {
        "id": "ets22_t2_p7_s11",
        "type": "Double Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s11_p1",
                "type": "Web Page",
                "title": "Web page",
                "content": "<div style='border: 1px solid var(--border-color, #444); padding: 16px; border-radius: 8px;'><div style='display:flex; gap:16px; margin-bottom:12px; font-size:0.9em; border-bottom:1px solid var(--border-color, #444); padding-bottom:8px;'><span>Our Company</span><span>|</span><span style='font-weight:bold;'>Our Products</span><span>|</span><span>Our Partners</span><span>|</span><span>Contact Us</span></div><p>Drymotic is pleased to announce that our revolutionary vacuum-microwave dehydration process is now being used by more than 30 companies in the food and pharmaceutical industries.</p><p>Here's how it works: Batches of raw organic materials, prepared in small pieces, are loaded into the machine's rotating drum. As the drum turns, moisture is removed from the pieces by microwave energy. The final moisture level can be preset by the operator. The dried pieces retain their color, taste, and nutrition, and are then ready for packaging. Drymotic machines produce better results in less time (and at lower cost) than freeze-drying and air-drying.</p><p>Drymotic machines are available in the following sizes:</p><table style='width:100%; border-collapse:collapse; margin-top:8px;' border='1'><thead><tr style='background:rgba(255,255,255,0.05);'><th>Model Number</th><th>Power</th><th>Suggested Use</th></tr></thead><tbody><tr><td>G4200</td><td>10 kW</td><td>Testing new products</td></tr><tr><td>G4260</td><td>50 kW</td><td>Small-scale manufacturers</td></tr><tr><td>H4500</td><td>100 kW</td><td>Large-scale, high-volume manufacturers</td></tr></tbody></table></div>"
            },
            {
                "id": "ets22_t2_p7_s11_p2",
                "type": "Email",
                "title": "E-mail",
                "content": "<p><b>To:</b> customerservice@drymotic.com<br/><b>From:</b> ovolterra@yambrett.com.au<br/><b>Date:</b> 6 May<br/><b>Subject:</b> Malfunctioning unit</p><p>Dear Customer Service,<br/>We purchased a Drymotic unit (product number: G4260, serial number: 01938207) last year for use with our line of instant stew mixes. We had no issues with the unit until the beginning of this month, when we began to notice an increase in processing time. We have followed the recommended cleaning schedule, so this problem cannot be caused by excess residue.<br/><br/>Please let me know if you have any suggestions for resolving this issue in a timely manner. I always prefer to handle minor repairs on my own, but if this issue persists, we may need to schedule a maintenance visit in the near future.<br/><br/>Best regards,<br/>Olivia Volterra<br/>Yambrett Corporation</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_176",
                "number": 176,
                "text": "What are Drymotic processors designed to do?",
                "options": {
                    "A": "Cut food into little pieces",
                    "B": "Preserve food by drying it",
                    "C": "Add moisture to organic material",
                    "D": "Improve a product’s color and taste"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Máy xử lý Drymotic được thiết kế để làm gì?<br/>(A) Cắt thức ăn thành các miếng nhỏ.<br/>(B) Bảo quản thực phẩm bằng cách sấy khô.<br/>(C) Thêm độ ẩm vào vật liệu hữu cơ.<br/>(D) Cải thiện màu sắc và hương vị của sản phẩm.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 1 và 2 của trang web nêu rõ: <i>'vacuum-microwave dehydration process... moisture is removed from the pieces... The dried pieces retain their color, taste, and nutrition...'</i> (quy trình khử nước bằng vi sóng chân không... hơi ẩm được loại bỏ khỏi các mẩu nguyên liệu... Các mẩu đã sấy khô vẫn giữ được màu sắc, hương vị và dinh dưỡng...). Quá trình loại bỏ độ ẩm để giữ nguyên chất dinh dưỡng chính là bảo quản thực phẩm bằng cách sấy khô (Preserve food by drying it).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Từ khóa 'dehydration process' và 'moisture is removed' thể hiện việc sấy khô thực phẩm."
            },
            {
                "id": "ets22_t2_p7_177",
                "number": 177,
                "text": "On the Web page, the word “retain” in paragraph 2, line 4, is closest in meaning to",
                "options": {
                    "A": "remember",
                    "B": "support",
                    "C": "enhance",
                    "D": "keep"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Trên trang web, từ “retain” ở đoạn 2, dòng 4 gần nghĩa nhất với từ nào?<br/>(A) ghi nhớ.<br/>(B) hỗ trợ.<br/>(C) nâng cao.<br/>(D) giữ lại, duy trì.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Ngữ cảnh trong bài: <i>'The dried pieces retain their color, taste, and nutrition...'</i> (Các mẩu đã sấy khô vẫn giữ lại được màu sắc, mùi vị và chất dinh dưỡng của chúng...). Từ <b>retain</b> có nghĩa là duy trì, giữ lại, đồng nghĩa hoàn toàn với từ <b>keep</b>.</p>",
                "questionType": "Vocabulary",
                "subCategory": "Vocabulary in Context",
                "strategyHint": "Thay thế từ 'keep' vào câu: 'keep their color, taste, and nutrition'."
            },
            {
                "id": "ets22_t2_p7_178",
                "number": 178,
                "text": "What is suggested about the Yambrett Corporation?",
                "options": {
                    "A": "It operates a high-volume dehydration machine.",
                    "B": "It produces packaged food on a small scale.",
                    "C": "It recently tested a new product.",
                    "D": "It was founded a year ago."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Điều gì được gợi ý về Tập đoàn Yambrett?<br/>(A) Công ty vận hành một máy khử nước công suất lớn.<br/>(B) Công ty sản xuất thực phẩm đóng gói ở quy mô nhỏ.<br/>(C) Công ty gần đây đã thử nghiệm một sản phẩm mới.<br/>(D) Công ty được thành lập một năm trước.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đây là câu hỏi liên kết hai văn bản (Cross-passage):<br/>- Trong email, cô Olivia Volterra cho biết công ty Yambrett đã mua máy Drymotic model: <b>G4260</b>.<br/>- Đối chiếu bảng thông số trên trang web: Model <b>G4260</b> có công suất 50 kW với mục đích sử dụng khuyến nghị là <b>'Small-scale manufacturers'</b> (Nhà sản xuất quy mô nhỏ).<br/>Kết hợp hai dữ kiện cho thấy Yambrett là nhà sản xuất thực phẩm ở quy mô nhỏ (produces packaged food on a small scale).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Liên kết mã model G4260 trong email với bảng mục đích sử dụng trên trang web."
            },
            {
                "id": "ets22_t2_p7_179",
                "number": 179,
                "text": "Why does Ms. Volterra write to Drymotic’s customer service department?",
                "options": {
                    "A": "To schedule a maintenance visit",
                    "B": "To ask if a unit is covered by a warranty",
                    "C": "To obtain advice on making a repair",
                    "D": "To request a replacement for a machine"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Tại sao cô Volterra viết thư cho bộ phận dịch vụ khách hàng của Drymotic?<br/>(A) Để lên lịch một chuyến thăm bảo trì.<br/>(B) Để hỏi xem máy có được bảo hành hay không.<br/>(C) Để xin lời khuyên về cách tự sửa chữa.<br/>(D) Để yêu cầu thay thế một chiếc máy mới.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Trong đoạn 2 của email, cô Volterra viết: <i>'Please let me know if you have any suggestions for resolving this issue in a timely manner. I always prefer to handle minor repairs on my own...'</i> (Vui lòng cho tôi biết nếu bạn có bất kỳ gợi ý nào để giải quyết vấn đề này kịp thời. Tôi luôn thích tự mình xử lý các sửa chữa nhỏ...). Cô viết thư nhằm xin hướng dẫn/lời khuyên để tự sửa chữa (obtain advice on making a repair).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Đọc câu nêu mục đích: 'suggestions for resolving this issue... handle minor repairs on my own'."
            },
            {
                "id": "ets22_t2_p7_180",
                "number": 180,
                "text": "What problem has developed with the Yambrett Corporation’s processor?",
                "options": {
                    "A": "It is operating more slowly.",
                    "B": "It is making more noise.",
                    "C": "It is using more power.",
                    "D": "It requires cleaning more often."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Vấn đề gì đã nảy sinh với chiếc máy xử lý của Tập đoàn Yambrett?<br/>(A) Nó đang hoạt động chậm hơn.<br/>(B) Nó đang gây ra nhiều tiếng ồn hơn.<br/>(C) Nó đang tiêu thụ nhiều điện năng hơn.<br/>(D) Nó đòi hỏi phải làm sạch thường xuyên hơn.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 1 của email nêu rõ trục trặc: <i>'...until the beginning of this month, when we began to notice an increase in processing time.'</i> (...cho đến đầu tháng này, khi chúng tôi bắt đầu nhận thấy thời gian xử lý tăng lên). Thời gian xử lý tăng lên (increase in processing time) đồng nghĩa với việc máy chạy chậm hơn (operating more slowly).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Paraphrasing: 'increase in processing time' = 'operating more slowly'."
            }
        ]
    },

    # SET 12: Q181-185 (Double Passage)
    {
        "id": "ets22_t2_p7_s12",
        "type": "Double Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s12_p1",
                "type": "Article",
                "title": "Article",
                "content": "<p><b>Spotlight on Carl Ybor</b></p><p>GORE, New Zealand (2 May)—Architect Carl Ybor has created a name for himself by helping clients turn their trash into treasure. He has built dozens of houses in Gore composed almost entirely of reclaimed, recovered, or found materials.</p><p>“As much as possible, I like to use materials that are already available nearby,” says Mr. Ybor. “It just takes some creativity, but that way nothing is wasted and houses can be built for a fraction of the price. Old fencing, discarded bottles, corks, mismatched bricks and tiles—nothing gets overlooked.”</p><p>While Mr. Ybor is fully responsible for creating the design plans for the houses he builds, he always involves homeowners in the building process. With a waiting list of at least a year, Mr. Ybor is able to carefully select his clients. He works solely with homeowners who already know how to operate power tools and are willing to do some of the hands-on work themselves.</p><p>Some of his houses have been featured in magazines, travel shows, and online carpentry demonstrations. Mr. Ybor’s Web site, featuring photos of his projects, can be found at yborhabitats.co.nz.</p>"
            },
            {
                "id": "ets22_t2_p7_s12_p2",
                "type": "Email",
                "title": "E-mail",
                "content": "<p><b>To:</b> contact@yborhabitats.co.nz<br/><b>From:</b> c.holmes@hmail.net<br/><b>Date:</b> 4 May<br/><b>Subject:</b> Proposal</p><p>Dear Mr. Ybor,<br/>I just read an article about you. I was excited to learn about your services and how you work with the owners to create unique spaces. I have two projects I want to work on:<br/><br/>1. I want to add an extension to my current house, incorporating leftover materials I have from the patio that I had built a few years ago.<br/>2. My roof needs to be replaced. I have researched ways to cut the cost, and one suggestion was to leave the existing roof intact and just install new metal sheeting on top. I like this idea!<br/><br/>Are you available and interested in doing this work? I would like to start as early as next month. I can pay half the money up front by credit card to secure an appointment.<br/><br/>Cynthia Holmes</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_181",
                "number": 181,
                "text": "What does the article state about the houses Mr. Ybor builds?",
                "options": {
                    "A": "They are large.",
                    "B": "They are expensive.",
                    "C": "They are located throughout New Zealand.",
                    "D": "They are built with used materials."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Bài báo nêu điều gì về những ngôi nhà mà ông Ybor xây dựng?<br/>(A) Chúng có diện tích lớn.<br/>(B) Chúng rất đắt đỏ.<br/>(C) Chúng nằm rải rác trên khắp New Zealand.<br/>(D) Chúng được xây dựng bằng các vật liệu đã qua sử dụng.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 1 nêu: <i>'...turn their trash into treasure. He has built dozens of houses in Gore composed almost entirely of reclaimed, recovered, or found materials.'</i> (...biến rác thải thành kho báu. Ông đã xây hàng chục ngôi nhà bao gồm gần như hoàn toàn từ các vật liệu tái chế, tận dụng hoặc nhặt được). Các vật liệu này là vật liệu đã qua sử dụng (used materials).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Paraphrasing: 'reclaimed, recovered materials' = 'used materials'."
            },
            {
                "id": "ets22_t2_p7_182",
                "number": 182,
                "text": "What does Mr. Ybor ask his clients to do?",
                "options": {
                    "A": "Replace old fencing",
                    "B": "Create decorative tiles",
                    "C": "Submit design plans",
                    "D": "Use power tools"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Ông Ybor yêu cầu khách hàng của mình làm gì?<br/>(A) Thay hàng rào cũ.<br/>(B) Tạo ra các viên gạch trang trí.<br/>(C) Nộp các bản vẽ thiết kế.<br/>(D) Sử dụng các dụng cụ máy móc cơ điện.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 3 bài báo viết: <i>'He works solely with homeowners who already know how to operate power tools and are willing to do some of the hands-on work themselves.'</i> (Ông chỉ làm việc với những chủ nhà đã biết cách vận hành các dụng cụ máy móc cơ điện và sẵn sàng tự mình làm một số công việc tay chân). Do đó chọn (D) Use power tools.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét cụm từ 'operate power tools' trong tiêu chí lựa chọn khách hàng của Mr. Ybor."
            },
            {
                "id": "ets22_t2_p7_183",
                "number": 183,
                "text": "According to the article, why should people visit yborhabitats.co.nz?",
                "options": {
                    "A": "To request a cost estimate",
                    "B": "To view images of Mr. Ybor’s work",
                    "C": "To register for a carpentry class",
                    "D": "To read client reviews"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Theo bài báo, tại sao mọi người nên truy cập trang web yborhabitats.co.nz?<br/>(A) Để yêu cầu báo giá chi phí.<br/>(B) Để xem hình ảnh các công trình của ông Ybor.<br/>(C) Để đăng ký lớp học mộc.<br/>(D) Để đọc nhận xét của khách hàng.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Dòng cuối bài báo nêu rõ: <i>'Mr. Ybor’s Web site, featuring photos of his projects, can be found at yborhabitats.co.nz.'</i> (Trang web của ông Ybor, có các bức ảnh chụp các dự án của ông, có thể tìm thấy tại yborhabitats.co.nz). <i>photos of his projects</i> tương đương với <i>images of Mr. Ybor’s work</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Paraphrasing: 'photos of his projects' = 'images of his work'."
            },
            {
                "id": "ets22_t2_p7_184",
                "number": 184,
                "text": "What does Ms. Holmes want to do?",
                "options": {
                    "A": "Remove her old roof",
                    "B": "Replace the tiles in her patio",
                    "C": "Increase the size of her house",
                    "D": "Build a new house"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Cô Holmes muốn làm gì?<br/>(A) Dỡ bỏ mái nhà cũ.<br/>(B) Thay gạch lát ở sân hiên.<br/>(C) Tăng diện tích/kích thước ngôi nhà của mình.<br/>(D) Xây một ngôi nhà mới.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Trong email dự án 1, cô Holmes nói: <i>'1. I want to add an extension to my current house...'</i> (Tôi muốn xây thêm một phần mở rộng cho ngôi nhà hiện tại của mình...). Xây phần mở rộng (add an extension) chính là làm tăng diện tích/kích thước của ngôi nhà (Increase the size of her house).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Paraphrasing: 'add an extension to my house' = 'increase the size of her house'."
            },
            {
                "id": "ets22_t2_p7_185",
                "number": 185,
                "text": "What part of Ms. Holmes’s proposal will Mr. Ybor most likely refuse?",
                "options": {
                    "A": "The starting date",
                    "B": "The suggested price",
                    "C": "The method of payment",
                    "D": "The choice of materials"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Phần nào trong đề xuất của cô Holmes nhiều khả năng ông Ybor sẽ từ chối nhất?<br/>(A) Ngày bắt đầu công trình.<br/>(B) Mức giá đề xuất.<br/>(C) Phương thức thanh toán.<br/>(D) Sự lựa chọn vật liệu.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Câu hỏi liên kết thông tin đa văn bản (Cross-passage):<br/>- Trong email, cô Holmes đề xuất: <i>'I would like to start as early as next month.'</i> (Tôi muốn bắt đầu sớm nhất vào tháng tới).<br/>- Tuy nhiên, trong bài báo ở đoạn 3 nêu rõ: <i>'With a waiting list of at least a year, Mr. Ybor is able to carefully select his clients.'</i> (Với danh sách chờ ít nhất là một năm, ông Ybor có thể cẩn thận lựa chọn khách hàng). Vì danh sách chờ dài ít nhất 1 năm nên ông Ybor không thể bắt đầu vào tháng sau, ông chắc chắn sẽ từ chối ngày bắt đầu (The starting date).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Đối chiếu mong muốn 'start as early as next month' với dữ kiện 'waiting list of at least a year'."
            }
        ]
    },

    # SET 13: Q186-190 (Triple Passage)
    {
        "id": "ets22_t2_p7_s13",
        "type": "Triple Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s13_p1",
                "type": "Email",
                "title": "E-mail 1",
                "content": "<p><b>To:</b> All CFA Staff<br/><b>From:</b> Yung-Chien Chou<br/><b>Date:</b> 16 October<br/><b>Subject:</b> Plans<br/><b>Attachment:</b> Agenda</p><p>Dear Colleagues,<br/>Hagit Caspi will be visiting for a couple of days next week to interview for the position of executive vice president here at Cliff Feiring Associates (CFA). She is highly qualified, and her background in international finance makes her particularly well suited for this role. Please make every effort to welcome her.<br/><br/>It is important to the CFA leadership that everyone has the opportunity to get to know Ms. Caspi. As such, I am asking all of you to attend certain events with her. Please see the attached agenda, and add the events marked CFA to your calendar. More details will follow.<br/><br/>Best,<br/>Yung-Chien Chou<br/>CEO, Cliff Feiring Associates</p>"
            },
            {
                "id": "ets22_t2_p7_s13_p2",
                "type": "Notice",
                "title": "Agenda",
                "content": "<div style='border: 1px solid var(--border-color, #444); padding: 12px; border-radius: 8px;'><h4 style='margin-top:0; text-align:center;'>Agenda for Hagit Caspi's Visit</h4><table style='width:100%; border-collapse:collapse;' border='1'><thead><tr style='background:rgba(255,255,255,0.05);'><th>Date</th><th>Time</th><th>Event</th><th>Invitees</th></tr></thead><tbody><tr><td>23 October</td><td>9:00 A.M.</td><td>Breakfast at La Brunch</td><td>Board members</td></tr><tr><td>23 October</td><td>12:30 P.M.</td><td>Lunch in office</td><td>Department heads</td></tr><tr><td>23 October</td><td>3:00 P.M.</td><td>Question-and-answer session</td><td>CFA</td></tr><tr><td>23 October</td><td>7:00 P.M.</td><td>Dinner at Medium Hills Bistro</td><td>Board members</td></tr><tr><td>24 October</td><td>9:00 A.M.</td><td>Breakfast in office</td><td>CFA</td></tr></tbody></table></div>"
            },
            {
                "id": "ets22_t2_p7_s13_p3",
                "type": "Email",
                "title": "E-mail 2",
                "content": "<p><b>To:</b> Yung-Chien Chou &lt;chou@clifffeiring.ca&gt;<br/><b>From:</b> Hagit Caspi &lt;hagit.caspi@volumel.co.il&gt;<br/><b>Date:</b> 27 October<br/><b>Subject:</b> Follow-up</p><p>Dear Mr. Chou,<br/>Many thanks for hosting me last week. I truly enjoyed meeting everyone. I particularly appreciated my conversation with Mr. Georgopoulos at Medium Hills Bistro. He told me some amazing stories about CFA’s history.<br/><br/>Again, I am sorry for not attending the event on the 24th. The weather was worrying, and I did not want to miss my flight to Tel Aviv.<br/><br/>Last but certainly not least, thank you for your offer, which I received this morning. I would be honoured to take on the role of executive vice president of CFA starting in January. The job description covers everything we discussed. The hours you noted for the position seem appropriate, and I am very pleased with the benefits. I look forward to working closely with you.<br/><br/>Most sincerely,<br/>Hagit Caspi</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_186",
                "number": 186,
                "text": "What is a purpose of the first e-mail?",
                "options": {
                    "A": "To notify staff of an upcoming visit",
                    "B": "To advertise a job opening",
                    "C": "To recommend an employee for promotion",
                    "D": "To introduce a new colleague"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Mục đích của email thứ nhất là gì?<br/>(A) Để thông báo cho nhân viên về một chuyến thăm sắp tới.<br/>(B) Để quảng cáo một vị trí tuyển dụng.<br/>(C) Để đề xuất một nhân viên được thăng chức.<br/>(D) Để giới thiệu một đồng nghiệp mới.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Email thứ nhất gửi cho All CFA Staff thông báo: <i>'Hagit Caspi will be visiting for a couple of days next week to interview for the position of executive vice president...'</i> (Hagit Caspi sẽ đến thăm trong vài ngày vào tuần tới để phỏng vấn cho vị trí phó chủ tịch điều hành...). Mục đích là thông báo cho toàn bộ nhân viên về chuyến thăm này (notify staff of an upcoming visit).</p>",
                "questionType": "Main Idea",
                "subCategory": "Main Idea & Purpose",
                "strategyHint": "Đọc câu mở đầu của Email 1 để xác định thông tin chính được truyền đạt tới nhân viên."
            },
            {
                "id": "ets22_t2_p7_187",
                "number": 187,
                "text": "What meal were all employees asked to add to their calendars?",
                "options": {
                    "A": "Breakfast on October 23",
                    "B": "Lunch on October 23",
                    "C": "Dinner on October 23",
                    "D": "Breakfast on October 24"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Bữa ăn nào mà tất cả nhân viên được yêu cầu thêm vào lịch làm việc của họ?<br/>(A) Bữa sáng ngày 23 tháng 10.<br/>(B) Bữa trưa ngày 23 tháng 10.<br/>(C) Bữa tối ngày 23 tháng 10.<br/>(D) Bữa sáng ngày 24 tháng 10.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Liên kết văn bản 1 và 2:<br/>- Email 1 hướng dẫn: <i>'...add the events marked CFA to your calendar.'</i> (thêm các sự kiện được đánh dấu CFA vào lịch của các bạn).<br/>- Trong lịch trình (Agenda), có 2 sự kiện ghi đối tượng là CFA: buổi hỏi đáp lúc 3:00 P.M. ngày 23/10 và <b>Breakfast in office</b> (Bữa sáng tại văn phòng) lúc 9:00 A.M. ngày <b>24 October</b>. Do đó, bữa ăn dành cho toàn bộ nhân viên là Bữa sáng ngày 24/10.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Tìm sự kiện là bữa ăn (meal) có cột Invitees ghi 'CFA' trong bảng Agenda."
            },
            {
                "id": "ets22_t2_p7_188",
                "number": 188,
                "text": "What is indicated about Ms. Caspi in the second e-mail?",
                "options": {
                    "A": "She requested a salary increase.",
                    "B": "An employment offer was accepted.",
                    "C": "She decided not to move to Canada.",
                    "D": "A flight delay occurred."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Điều gì được chỉ ra về cô Caspi trong email thứ hai?<br/>(A) Cô ấy đã yêu cầu tăng lương.<br/>(B) Một lời mời làm việc đã được chấp nhận.<br/>(C) Cô ấy quyết định không chuyển đến Canada.<br/>(D) Một sự chậm trễ chuyến bay đã xảy ra.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Trong email thứ hai, cô Caspi viết: <i>'Last but certainly not least, thank you for your offer, which I received this morning. I would be honoured to take on the role of executive vice president of CFA starting in January.'</i> (Cuối cùng nhưng không kém phần quan trọng, cảm ơn lời đề nghị của bạn... Tôi rất vinh dự được đảm nhận vai trò phó chủ tịch điều hành của CFA bắt đầu từ tháng Giêng). Việc cô đồng ý nhận chức vụ đồng nghĩa với việc lời mời làm việc đã được chấp nhận (An employment offer was accepted).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Paraphrasing: 'honoured to take on the role' = 'employment offer was accepted'."
            },
            {
                "id": "ets22_t2_p7_189",
                "number": 189,
                "text": "Who most likely is Mr. Georgopoulos?",
                "options": {
                    "A": "A Medium Hills Bistro employee",
                    "B": "A board member",
                    "C": "A department head",
                    "D": "A worker in the human resources department"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Ông Georgopoulos nhiều khả năng là ai nhất?<br/>(A) Nhân viên quán Medium Hills Bistro.<br/>(B) Một thành viên hội đồng quản trị.<br/>(C) Một trưởng bộ phận.<br/>(D) Một nhân viên phòng nhân sự.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Liên kết văn bản 2 và 3:<br/>- Trong email 2, cô Caspi viết: <i>'I particularly appreciated my conversation with Mr. Georgopoulos at Medium Hills Bistro.'</i> (Tôi đặc biệt trân trọng cuộc trò chuyện với ông Georgopoulos tại Medium Hills Bistro).<br/>- Đối chiếu bảng Agenda ngày 23/10 lúc 7:00 P.M.: Sự kiện <i>'Dinner at Medium Hills Bistro'</i> chỉ dành riêng cho khách mời là: <b>Board members</b> (Thành viên hội đồng quản trị). Do đó, ông Georgopoulos là một thành viên hội đồng quản trị (A board member).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Liên kết địa điểm gặp gỡ 'Medium Hills Bistro' với danh sách khách mời trong Agenda."
            },
            {
                "id": "ets22_t2_p7_190",
                "number": 190,
                "text": "What does the second e-mail indicate about the job?",
                "options": {
                    "A": "It will begin in January.",
                    "B": "It will be based in Tel Aviv.",
                    "C": "It involves working overtime.",
                    "D": "It requires frequent international travel."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Email thứ hai chỉ ra điều gì về công việc?<br/>(A) Nó sẽ bắt đầu vào tháng Giêng.<br/>(B) Nó sẽ đặt trụ sở tại Tel Aviv.<br/>(C) Nó bao gồm việc làm thêm giờ.<br/>(D) Nó đòi hỏi phải đi công tác quốc tế thường xuyên.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn cuối email 2, cô Caspi nêu rõ: <i>'I would be honoured to take on the role of executive vice president of CFA starting in January.'</i> (...đảm nhận vai trò phó chủ tịch điều hành của CFA bắt đầu vào tháng Giêng). Do đó chọn (A) It will begin in January.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét mốc thời gian bắt đầu công việc: 'starting in January'."
            }
        ]
    },

    # SET 14: Q191-195 (Triple Passage)
    {
        "id": "ets22_t2_p7_s14",
        "type": "Triple Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s14_p1",
                "type": "Article",
                "title": "Article",
                "content": "<p><b>TRIVESS (1 February)</b>—Alacritum, Inc., has announced plans to build charging stations for electric vehicles along Highway 1. With over 400 stations across Asia already, Alacritum brings a wealth of experience to this large-scale undertaking. The Highway 1 stations, known as PRO stations, will provide vehicles with up to 200 kilowatts of power, achieving an 80 percent charge in 30 minutes. The system will periodically notify waiting drivers of the status of their battery charge by sending texts to their cell phones or other mobile devices. The company promises to provide motorists with clean, comfortable, brightly lit waiting facilities. A testing location will open at the beginning of next month in Logred.</p>"
            },
            {
                "id": "ets22_t2_p7_s14_p2",
                "type": "Chart",
                "title": "Chart",
                "content": "<div style='border: 1px solid var(--border-color, #444); padding: 12px; border-radius: 8px;'><h4 style='margin-top:0; text-align:center;'>PRO Stations: Proposed Distribution</h4><table style='width:100%; border-collapse:collapse;' border='1'><thead><tr style='background:rgba(255,255,255,0.05);'><th>Region</th><th>Number of Stations</th><th>Customers per Day</th></tr></thead><tbody><tr><td>Elondell</td><td>26</td><td>9,220</td></tr><tr><td>Southern Borelvia</td><td>14</td><td>4,970</td></tr><tr><td>Western Borelvia</td><td>20</td><td>6,390</td></tr><tr><td>North Shore</td><td>10</td><td>3,560</td></tr></tbody></table></div>"
            },
            {
                "id": "ets22_t2_p7_s14_p3",
                "type": "Email",
                "title": "E-mail",
                "content": "<p><b>To:</b> lhsiao@alacritum.com<br/><b>From:</b> ctrigg@alacritum.com<br/><b>Date:</b> 15 March<br/><b>Subject:</b> Meeting</p><p>Dear Mr. Hsiao,<br/>Following the meeting with our community partners in Western Borelvia this week, I suggest adding air-conditioning to the waiting areas in that region because of the desert conditions there. Although the addition entails higher costs, it will ensure the comfort and safety of the customers. I have also learned firsthand that poor cell service along Highway 1 will make the wireless networks at most PRO stations unreliable, so we will need a technological solution for that as well. I will send a full report by the end of the week.<br/><br/>Chuck Trigg</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_191",
                "number": 191,
                "text": "What does the article indicate about Alacritum, Inc.?",
                "options": {
                    "A": "It operates 80 percent of the charging stations in Asia.",
                    "B": "It is moving its head office to Logred in February.",
                    "C": "It built 400 PRO stations along Highway 1.",
                    "D": "It will test a station site in March."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Bài báo chỉ ra điều gì về Alacritum, Inc.?<br/>(A) Công ty vận hành 80% trạm sạc ở Châu Á.<br/>(B) Công ty đang chuyển trụ sở chính đến Logred vào tháng Hai.<br/>(C) Công ty đã xây dựng 400 trạm PRO dọc theo Đường cao tốc 1.<br/>(D) Công ty sẽ thử nghiệm một trạm sạc vào tháng Ba.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Bài báo được xuất bản vào ngày 1 tháng 2: <i>'TRIVESS (1 February)... A testing location will open at the beginning of next month in Logred.'</i> (Một địa điểm thử nghiệm sẽ mở cửa vào đầu tháng tới tại Logred). Tháng sau của tháng Hai (February) chính là tháng Ba (March). Do đó công ty sẽ thử nghiệm địa điểm vào tháng 3 (test a station site in March).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Tính toán mốc thời gian: Bài báo ngày 1/2, 'next month' là tháng 3."
            },
            {
                "id": "ets22_t2_p7_192",
                "number": 192,
                "text": "According to the chart, what region is expected to have the most customers?",
                "options": {
                    "A": "Elondell",
                    "B": "Southern Borelvia",
                    "C": "Western Borelvia",
                    "D": "North Shore"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Theo biểu đồ, khu vực nào dự kiến sẽ có nhiều khách hàng nhất?<br/>(A) Elondell.<br/>(B) Southern Borelvia.<br/>(C) Western Borelvia.<br/>(D) North Shore.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Quan sát cột 'Customers per Day' trong bảng số liệu:<br/>- Elondell: <b>9,220</b> khách/ngày (con số cao nhất).<br/>- Western Borelvia: 6,390.<br/>- Southern Borelvia: 4,970.<br/>- North Shore: 3,560.<br/>Do đó, Elondell là khu vực có lượng khách đông nhất.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "So sánh các giá trị ở cột 'Customers per Day' để tìm số lớn nhất."
            },
            {
                "id": "ets22_t2_p7_193",
                "number": 193,
                "text": "What is indicated about Western Borelvia?",
                "options": {
                    "A": "It has 14 PRO stations.",
                    "B": "It is located in a hot climate.",
                    "C": "It will have the first PRO station.",
                    "D": "It has reliable wireless networks."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Điều gì được chỉ ra về Western Borelvia?<br/>(A) Khu vực này có 14 trạm PRO.<br/>(B) Khu vực này nằm trong vùng khí hậu nóng bức.<br/>(C) Khu vực này sẽ có trạm PRO đầu tiên.<br/>(D) Khu vực này có mạng không dây đáng tin cậy.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Trong email của Chuck Trigg viết: <i>'...I suggest adding air-conditioning to the waiting areas in that region because of the desert conditions there.'</i> (tôi đề xuất lắp thêm điều hòa nhiệt độ cho các khu vực chờ ở vùng đó vì điều kiện sa mạc ở đó). Điều kiện sa mạc (desert conditions) thể hiện đặc trưng khí hậu khô nóng (hot climate).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Suy luận từ cụm từ 'desert conditions' và việc cần lắp 'air-conditioning'."
            },
            {
                "id": "ets22_t2_p7_194",
                "number": 194,
                "text": "What system at PRO stations will require a technological solution?",
                "options": {
                    "A": "The cleaning system",
                    "B": "The food vending system",
                    "C": "The lighting system",
                    "D": "The text notification system"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Hệ thống nào tại các trạm PRO sẽ đòi hỏi một giải pháp công nghệ?<br/>(A) Hệ thống dọn dẹp.<br/>(B) Hệ thống bán đồ ăn tự động.<br/>(C) Hệ thống chiếu sáng.<br/>(D) Hệ thống thông báo bằng tin nhắn văn bản.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Liên kết văn bản 1 và 3:<br/>- Bài báo nêu cơ chế thông báo: <i>'The system will periodically notify waiting drivers of the status of their battery charge by sending texts to their cell phones...'</i> (Hệ thống sẽ định kỳ thông báo cho các tài xế đang chờ bằng cách gửi tin nhắn văn bản đến điện thoại di động của họ).<br/>- Email ngày 15/3 báo cáo: <i>'poor cell service along Highway 1 will make the wireless networks at most PRO stations unreliable, so we will need a technological solution for that as well.'</i> (sóng di động kém dọc theo Đường cao tốc 1 sẽ khiến mạng không dây tại hầu hết các trạm không đáng tin cậy, vì vậy chúng ta cũng sẽ cần một giải pháp công nghệ cho vấn đề đó). Sóng di động kém ảnh hưởng trực tiếp đến việc gửi tin nhắn thông báo (text notification system).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Kết nối việc gửi tin nhắn văn bản (sending texts) với sóng di động kém (poor cell service)."
            },
            {
                "id": "ets22_t2_p7_195",
                "number": 195,
                "text": "How many stations will need air-conditioned waiting areas?",
                "options": {
                    "A": "10",
                    "B": "14",
                    "C": "20",
                    "D": "26"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Có bao nhiêu trạm sẽ cần khu vực chờ được trang bị điều hòa không khí?<br/>(A) 10.<br/>(B) 14.<br/>(C) 20.<br/>(D) 26.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Liên kết bảng số liệu và email:<br/>- Trong email, ông Trigg đề xuất: <i>'I suggest adding air-conditioning to the waiting areas in that region [Western Borelvia]...'</i> (Tôi đề xuất lắp điều hòa cho các khu vực chờ ở vùng Western Borelvia).<br/>- Tra cứu bảng số liệu ở văn bản 2: Vùng <b>Western Borelvia</b> có số trạm là: <b>20</b> (Number of Stations: 20).<br/>Do đó, có 20 trạm cần lắp đặt điều hòa.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Đối chiếu vùng Western Borelvia được đề xuất lắp điều hòa với số trạm trên biểu đồ."
            }
        ]
    },

    # SET 15: Q196-200 (Triple Passage)
    {
        "id": "ets22_t2_p7_s15",
        "type": "Triple Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s15_p1",
                "type": "Email",
                "title": "E-mail 1",
                "content": "<p><b>From:</b> cbeker@yourworkstyle.net<br/><b>To:</b> lroytenberg@charlottes.com; ajordan@charlottes.com<br/><b>Date:</b> January 27, 10:02 A.M.<br/><b>Subject:</b> First draft of press release<br/><b>Attachment:</b> Press release draft</p><p>Dear Mr. Roytenberg and Ms. Jordan,<br/>My first draft of the press release is attached. As we previously discussed by phone, my contract includes one additional half-hour meeting to discuss the project and any changes you would like me to make before I submit the press release to my contacts at Pinetown Weekly.<br/><br/>Please let me know if I can stop by this week. I would like to take photos of the space. I remember your mentioning that the historic architecture of the building would be a draw for customers.<br/><br/>In addition, I will need to get a direct quotation from either of you or from Chef Vaux. I know from working with Pinetown Weekly in the past that they will not run a piece like this without at least one quotation.<br/><br/>Best regards,<br/>Cathy Beker</p>"
            },
            {
                "id": "ets22_t2_p7_s15_p2",
                "type": "Article",
                "title": "Press Release Draft",
                "content": "<div style='border: 1px solid var(--border-color, #444); padding: 14px; border-radius: 8px;'><p style='text-align:center; font-weight:bold; font-size:0.9em; margin-top:0;'>- DRAFT -</p><h4 style='text-align:center; margin-top:4px;'>Charlotte’s Opens for Business</h4><p>Charlotte’s, located at Avenue D and Oak Street, will open its doors on Friday, February 5. Owners Levon Roytenberg and Aubree Jordan are excited to welcome patrons for an aromatic cup of coffee or steaming espresso, specialty pastries, and savory cafe fare. Their aim is for Charlotte’s to be a gathering place that indulges all the senses, where guests will be met with comfort and hospitality.</p><p>Award-winning executive chef Michel Vaux, most recently of Kahn’s in Bloomington, has created an enticing menu featuring fresh-baked breads and grass-fed meats, with locally sourced vegetable dishes as accompaniments. Offerings will include breakfast and lunch selections. Chef Vaux will also bring to Charlotte’s his elegant hot and cold beverages utilizing teas and herbal infusions.</p></div>"
            },
            {
                "id": "ets22_t2_p7_s15_p3",
                "type": "Email",
                "title": "E-mail 2",
                "content": "<p><b>From:</b> ajordan@charlottes.com<br/><b>To:</b> cbeker@yourworkstyle.net<br/><b>Cc:</b> lroytenberg@charlottes.com<br/><b>Date:</b> January 28, 8:34 A.M.<br/><b>Subject:</b> RE: First draft of press release</p><p>Hi Ms. Beker,<br/>Mr. Roytenberg is in Boston for the next several days, and he has asked me to take the lead on the press release. I know you had asked to come by the site—are you available tomorrow, January 29, at 3:00 P.M.? I will be there all day decorating for the grand opening.<br/><br/>You have put together an excellent first draft. The only major problem I see is that you have mixed up the location of our corporate office and the cafe. The cafe is actually on the corner of Avenue C and Maple Street. Also, Mr. Roytenberg would like to include the operating hours, which are 8:00 A.M. to 4:00 P.M. daily. Please call Chef Vaux at 952-555-0133 for a quotation about specialty items on the menu.<br/><br/>All my best,<br/>Aubree Jordan</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_196",
                "number": 196,
                "text": "Who most likely is Ms. Beker?",
                "options": {
                    "A": "An architect",
                    "B": "A freelance writer",
                    "C": "A professional chef",
                    "D": "An assistant to Mr. Roytenberg"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Cô Beker nhiều khả năng là ai nhất?<br/>(A) Một kiến trúc sư.<br/>(B) Một người viết bài tự do (freelance writer).<br/>(C) Một đầu bếp chuyên nghiệp.<br/>(D) Trợ lý của ông Roytenberg.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Trong email đầu tiên, cô Beker gửi bản thảo thông cáo báo chí (first draft of the press release), nhắc đến điều khoản hợp đồng của cô (my contract includes...), và việc cô sẽ gửi bài cho các mối liên hệ tại tòa soạn báo Pinetown Weekly. Đây là công việc của một người viết nội dung/truyền thông tự do (freelance writer).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Dựa vào việc cô Beker soạn thảo thông cáo báo chí theo hợp đồng để gửi cho báo chí."
            },
            {
                "id": "ets22_t2_p7_197",
                "number": 197,
                "text": "According to the first e-mail, what must be added to the press release?",
                "options": {
                    "A": "A quotation",
                    "B": "A company logo",
                    "C": "The menu prices",
                    "D": "The operating hours"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Theo email thứ nhất, điều gì bắt buộc phải được thêm vào thông cáo báo chí?<br/>(A) Một lời trích dẫn.<br/>(B) Logo công ty.<br/>(C) Giá thực đơn.<br/>(D) Giờ hoạt động.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 3 của email 1 viết: <i>'In addition, I will need to get a direct quotation from either of you or from Chef Vaux. I know from working with Pinetown Weekly in the past that they will not run a piece like this without at least one quotation.'</i> (Ngoài ra, tôi sẽ cần lấy một lời trích dẫn trực tiếp từ bạn hoặc từ Bếp trưởng Vaux... họ sẽ không đăng một bài như thế này nếu không có ít nhất một lời trích dẫn). Do đó, cần thêm một lời trích dẫn (A quotation).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét từ khóa 'In addition, I will need to get a direct quotation'."
            },
            {
                "id": "ets22_t2_p7_198",
                "number": 198,
                "text": "What will customers be able to purchase at Charlotte’s?",
                "options": {
                    "A": "Cooking supplies",
                    "B": "Herbal plant seedlings",
                    "C": "An espresso drink",
                    "D": "Bottled teas"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Khách hàng sẽ có thể mua gì tại Charlotte's?<br/>(A) Dụng cụ nấu ăn.<br/>(B) Cây giống thảo mộc.<br/>(C) Đồ uống cà phê espresso.<br/>(D) Trà đóng chai.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Bản thảo thông cáo báo chí đoạn 1 viết: <i>'Owners Levon Roytenberg and Aubree Jordan are excited to welcome patrons for an aromatic cup of coffee or steaming espresso, specialty pastries, and savory cafe fare.'</i> (Hai chủ sở hữu rất hào hứng chào đón thực khách đến thưởng thức tách cà phê thơm lừng hoặc cà phê espresso nóng hổi, các loại bánh ngọt đặc sản...). Vì vậy khách hàng có thể mua đồ uống espresso (An espresso drink).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét các món ăn thức uống được phục vụ trong bản thông cáo báo chí: 'steaming espresso'."
            },
            {
                "id": "ets22_t2_p7_199",
                "number": 199,
                "text": "Why does Ms. Jordan invite Ms. Beker to visit Charlotte’s on January 29?",
                "options": {
                    "A": "To sample a sandwich",
                    "B": "To help decorate for the grand opening",
                    "C": "To take pictures of a building",
                    "D": "To meet with Mr. Roytenberg"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Tại sao cô Jordan mời cô Beker đến thăm Charlotte's vào ngày 29 tháng 1?<br/>(A) Để nếm thử một chiếc bánh sandwich.<br/>(B) Để giúp trang trí cho lễ khai trương.<br/>(C) Để chụp ảnh một tòa nhà.<br/>(D) Để gặp gỡ ông Roytenberg.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Liên kết email 1 và email 2:<br/>- Trong email 1, cô Beker ngỏ lời: <i>'Please let me know if I can stop by this week. I would like to take photos of the space. I remember your mentioning that the historic architecture of the building would be a draw for customers.'</i> (Tôi muốn đến chụp ảnh không gian nơi đây... kiến trúc lịch sử của tòa nhà sẽ là điểm thu hút khách).<br/>- Trong email 2, cô Jordan phản hồi: <i>'I know you had asked to come by the site—are you available tomorrow, January 29, at 3:00 P.M.?'</i> (Tôi biết bạn đã đề nghị ghé qua địa điểm—bạn có rảnh vào ngày mai, 29/1 lúc 3 giờ chiều không?). Mục đích chuyến ghé thăm là để cô Beker chụp ảnh tòa nhà (take pictures of a building).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Đối chiếu đề nghị chụp ảnh không gian tòa nhà ở Email 1 với lời hẹn gặp ở Email 2."
            },
            {
                "id": "ets22_t2_p7_200",
                "number": 200,
                "text": "What is located on the corner of Avenue D and Oak Street?",
                "options": {
                    "A": "Pinetown Weekly",
                    "B": "Kahn’s restaurant",
                    "C": "Charlotte’s cafe",
                    "D": "Charlotte’s corporate office"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Cơ sở nào tọa lạc tại góc Đại lộ D và Phố Oak?<br/>(A) Tòa soạn báo Pinetown Weekly.<br/>(B) Nhà hàng Kahn's.<br/>(C) Quán cà phê Charlotte's.<br/>(D) Văn phòng công ty của Charlotte's.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Liên kết bản thảo và email 2:<br/>- Trong bản thảo, cô Beker viết: <i>'Charlotte’s, located at Avenue D and Oak Street, will open its doors...'</i> (Charlotte's, tọa lạc tại Đại lộ D và Phố Oak...).<br/>- Trong email 2, cô Jordan đính chính lỗi sai này: <i>'The only major problem I see is that you have mixed up the location of our corporate office and the cafe. The cafe is actually on the corner of Avenue C and Maple Street.'</i> (Vấn đề lớn duy nhất tôi thấy là bạn đã nhầm lẫn giữa địa điểm văn phòng công ty và quán cà phê của chúng tôi. Quán cà phê thực sự nằm ở góc Đại lộ C và Phố Maple). Điều này chỉ ra rằng địa chỉ Đại lộ D và Phố Oak mà cô Beker ghi nhầm chính là địa chỉ văn phòng công ty (Charlotte’s corporate office).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Xác định câu đính chính địa chỉ của Ms. Jordan: nhầm giữa quán cà phê và văn phòng công ty."
            }
        ]
    }
]

with open('/private/tmp/part7_sets_11_15.json', 'w', encoding='utf-8') as f:
    json.dump(part7_sets_11_15, f, ensure_ascii=False, indent=2)

print("Saved sets 11-15!")
