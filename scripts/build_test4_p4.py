import json

CDN_BASE = "https://github.com/tuannd98fdn/toeic-learn/releases/download/ets2022-assets"

part4_data = [
    # Set 1: Q71 - Q73
    {
        "id": "ets22_t4_p4_s01",
        "audioUrl": f"{CDN_BASE}/t4_p4_s01.mp3",
        "context": "Questions 71-73 refer to the following recorded message.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Hello, residents of Oakwood Apartments. This is an urgent maintenance update from the building management office. Due to a broken water main on Maple Street, municipal workers must shut off water service to our entire apartment complex for emergency repairs today. The shut-off will begin at ten o'clock this morning and is expected to last until approximately four o'clock this afternoon. During this time, clean bottled water will be available for residents in the main lobby. For real-time updates on the repair progress, please visit our resident portal online at www.oakwoodresidents.com. Thank you for your patience and cooperation.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_71",
                "number": 71,
                "text": "Who are the listeners?",
                "options": {
                    "A": "Residents in an apartment building",
                    "B": "Employees in an office building",
                    "C": "Visitors to a historical site",
                    "D": "Guests in a hotel"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nghe là ai?<br/>(A) Cư dân trong một tòa nhà chung cư.<br/>(B) Nhân viên trong tòa nhà văn phòng.<br/>(C) Khách tham quan địa điểm lịch sử.<br/>(D) Khách lưu trú tại khách sạn.</p><p><b>Phân tích chi tiết:</b> Lời nhắn mở đầu: <i>'Hello, residents of Oakwood Apartments.'</i> (Xin chào các cư dân của chung cư Oakwood). Chọn <b>(A) Residents in an apartment building</b>.</p>",
                "questionType": "Audience",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_72",
                "number": 72,
                "text": "What service does the speaker say will be unavailable?",
                "options": {
                    "A": "Telephone",
                    "B": "Electric",
                    "C": "Water",
                    "D": "Natural gas"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói cho biết dịch vụ nào sẽ tạm thời không có sẵn?<br/>(A) Điện thoại.<br/>(B) Điện.<br/>(C) Nước.<br/>(D) Khí đốt tự nhiên.</p><p><b>Phân tích chi tiết:</b> Người nói thông báo: <i>'workers must shut off water service to our entire apartment complex for emergency repairs today.'</i> (công nhân phải cắt dịch vụ cấp nước toàn bộ khu chung cư để sửa chữa khẩn cấp). Chọn <b>(C) Water</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p4_73",
                "number": 73,
                "text": "According to the speaker, why should the listeners go online?",
                "options": {
                    "A": "To download software",
                    "B": "To check for status updates",
                    "C": "To register a complaint",
                    "D": "To view a price list"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người nói, tại sao người nghe nên truy cập mạng trực tuyến?<br/>(A) Để tải phần mềm.<br/>(B) Để kiểm tra các cập nhật tình hình.<br/>(C) Để đăng ký khiếu nại.<br/>(D) Để xem bảng giá.</p><p><b>Phân tích chi tiết:</b> Người nói nhắc: <i>'For real-time updates on the repair progress, please visit our resident portal online...'</i> (Để nhận thông tin cập nhật theo thời gian thực về tiến độ sửa chữa, vui lòng truy cập cổng thông tin cư dân trực tuyến). Chọn <b>(B) To check for status updates</b>.</p>",
                "questionType": "Purpose",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 2: Q74 - Q76
    {
        "id": "ets22_t4_p4_s02",
        "audioUrl": f"{CDN_BASE}/t4_p4_s02.mp3",
        "context": "Questions 74-76 refer to the following announcement.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Good evening, waitstaff and kitchen team. Before we open the doors for our dinner rush tonight, I need to let you know about a couple of changes. First, our supplier informed us that the shipment of fresh salmon didn't pass quality inspection, so we won't be able to serve the grilled salmon entree tonight. Please make sure customers are told right away when you hand them the menus, so they aren't disappointed later when ordering. Tonight is Friday, and we're fully booked with over two hundred reservations. It's going to be very busy, so let's support each other and work together closely to make sure service runs smoothly.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_74",
                "number": 74,
                "text": "Where does the announcement most likely take place?",
                "options": {
                    "A": "At a train station",
                    "B": "At a convention center",
                    "C": "At a restaurant",
                    "D": "At an outdoor market"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Thông báo nhiều khả năng diễn ra ở đâu nhất?<br/>(A) Tại ga xe lửa.<br/>(B) Tại trung tâm hội nghị.<br/>(C) Tại một nhà hàng.<br/>(D) Tại chợ ngoài trời.</p><p><b>Phân tích chi tiết:</b> Người nói gọi <i>waitstaff and kitchen team</i> (đội ngũ phục vụ bàn và bếp) và chuẩn bị cho <i>dinner rush</i> (giờ cao điểm bữa tối) với 200 lượt đặt bàn (reservations). Bối cảnh là <b>(C) At a restaurant</b>.</p>",
                "questionType": "Location",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_75",
                "number": 75,
                "text": "According to the speaker, what should customers be told?",
                "options": {
                    "A": "The Wi-Fi is not working.",
                    "B": "A room is closed for renovations.",
                    "C": "A schedule has been changed.",
                    "D": "An item is unavailable."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người nói, khách hàng nên được thông báo về điều gì?<br/>(A) Wi-Fi không hoạt động.<br/>(B) Phòng đóng cửa để sửa chữa.<br/>(C) Lịch trình đã bị thay đổi.<br/>(D) Một món ăn/mặt hàng không có sẵn.</p><p><b>Phân tích chi tiết:</b> Người quản lý nhắc: <i>'we won't be able to serve the grilled salmon entree tonight. Please make sure customers are told right away...'</i> (món cá hồi nướng tối nay không phục vụ được, hãy báo khách ngay khi phát thực đơn). Chọn <b>(D) An item is unavailable</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p4_76",
                "number": 76,
                "text": "What does the speaker encourage the listeners to do?",
                "options": {
                    "A": "Work together",
                    "B": "Arrive early",
                    "C": "Take extra shifts",
                    "D": "Greet customers"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói khuyến khích người nghe làm gì?<br/>(A) Làm việc cùng nhau/hỗ trợ nhau.<br/>(B) Đến sớm.<br/>(C) Nhận thêm ca làm.<br/>(D) Chào đón khách hàng.</p><p><b>Phân tích chi tiết:</b> Người nói khích lệ: <i>'so let's support each other and work together closely to make sure service runs smoothly.'</i> (hãy hỗ trợ nhau và cùng làm việc chặt chẽ). Chọn <b>(A) Work together</b>.</p>",
                "questionType": "Recommendation",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 3: Q77 - Q79
    {
        "id": "ets22_t4_p4_s03",
        "audioUrl": f"{CDN_BASE}/t4_p4_s03.mp3",
        "context": "Questions 77-79 refer to the following excerpt from a meeting.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Thank you all for attending this presentation. I'm pleased to share with our group of prospective investors the tremendous growth our apparel company, Kingsley Menswear, has achieved over the past three fiscal years. As you may know, our brand specializes in high-end, tailored business suits crafted from premium sustainable fabrics. Demand for our corporate attire has exceeded expectations across North America. To meet this rising demand and reduce production lead times, our board of directors is planning to purchase state-of-the-art textile manufacturing equipment for our central facility. With your investment capital, we project a thirty percent increase in our manufacturing output by next spring.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_77",
                "number": 77,
                "text": "Who most likely are the listeners?",
                "options": {
                    "A": "Building contractors",
                    "B": "Potential investors",
                    "C": "Fashion models",
                    "D": "News reporters"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nghe nhiều khả năng nhất là ai?<br/>(A) Nhà thầu xây dựng.<br/>(B) Các nhà đầu tư tiềm năng.<br/>(C) Người mẫu thời trang.<br/>(D) Phóng viên tin tức.</p><p><b>Phân tích chi tiết:</b> Người thuyết trình nói: <i>'I'm pleased to share with our group of prospective investors...'</i> (Tôi rất vui được chia sẻ với nhóm các nhà đầu tư tiềm năng...). Chọn <b>(B) Potential investors</b>.</p>",
                "questionType": "Audience",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_78",
                "number": 78,
                "text": "What type of clothing does the company sell?",
                "options": {
                    "A": "Swimwear",
                    "B": "Hats",
                    "C": "Business suits",
                    "D": "Athletic shoes"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Công ty bán loại trang phục nào?<br/>(A) Đồ bơi.<br/>(B) Mũ nón.<br/>(C) Bộ vest công sở (business suits).<br/>(D) Giày thể thao.</p><p><b>Phân tích chi tiết:</b> Người nói nêu rõ: <i>'our brand specializes in high-end, tailored business suits crafted from premium sustainable fabrics.'</i> (thương hiệu chuyên về các bộ âu phục công sở cao cấp may đo). Chọn <b>(C) Business suits</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p4_79",
                "number": 79,
                "text": "What does the speaker’s company hope to purchase?",
                "options": {
                    "A": "A new software program",
                    "B": "A larger storage facility",
                    "C": "Some delivery trucks",
                    "D": "Some manufacturing equipment"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Công ty của người nói hy vọng mua sắm thứ gì?<br/>(A) Phần mềm mới.<br/>(B) Kho lưu trữ lớn hơn.<br/>(C) Xe tải giao hàng.<br/>(D) Thiết bị sản xuất.</p><p><b>Phân tích chi tiết:</b> Người nói chia sẻ: <i>'our board of directors is planning to purchase state-of-the-art textile manufacturing equipment...'</i> (ban giám đốc đang lên kế hoạch mua thiết bị sản xuất dệt may tối tân). Chọn <b>(D) Some manufacturing equipment</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 4: Q80 - Q82
    {
        "id": "ets22_t4_p4_s04",
        "audioUrl": f"{CDN_BASE}/t4_p4_s04.mp3",
        "context": "Questions 80-82 refer to the following talk.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "I'm Thomas Ortiz, Head of Human Resources here at Hamilton Power. On behalf of the company, I want to welcome you all to your new jobs. As you know, this is our most advanced power plant, and we provide electricity to over a half million homes. I'm sure you're all eager to go to your workstations, but there is a lot of paperwork to fill out. I'll be going over it with you in a moment, but first I'd like to take your pictures for your ID badges. They'll be ready for you after lunch.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_80",
                "number": 80,
                "text": "What industry do the listeners most likely work in?",
                "options": {
                    "A": "Construction",
                    "B": "Retail",
                    "C": "Energy",
                    "D": "Broadcast"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nghe nhiều khả năng làm việc trong ngành nào?<br/>(A) Xây dựng.<br/>(B) Bán lẻ.<br/>(C) Năng lượng.<br/>(D) Phát thanh truyền hình.</p><p><b>Phân tích chi tiết:</b> Người nói tự giới thiệu là HR của <i>Hamilton Power</i>, làm việc tại <i>power plant</i> (nhà máy điện) cung cấp điện (<i>provide electricity</i>) cho nửa triệu hộ gia đình. Ngành nghề là <b>(C) Energy</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_81",
                "number": 81,
                "text": "What does the speaker imply when he says, “But there is a lot of paperwork to fill out”?",
                "options": {
                    "A": "The listeners may have to work overtime.",
                    "B": "The listeners will not begin work immediately.",
                    "C": "A permit will be difficult to obtain.",
                    "D": "Additional help is needed for a project."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói ngụ ý điều gì khi nói: 'Nhưng có rất nhiều giấy tờ cần phải điền'?<br/>(A) Người nghe có thể phải làm thêm giờ.<br/>(B) Người nghe sẽ không bắt đầu công việc ngay lập tức.<br/>(C) Giấy phép sẽ khó xin.<br/>(D) Cần thêm trợ giúp cho dự án.</p><p><b>Phân tích chi tiết:</b> Trước câu này, người nói bảo: <i>'I'm sure you're all eager to go to your workstations, but there is a lot of paperwork to fill out.'</i> (Tôi chắc các bạn đều háo hức muốn đến bàn làm việc, nhưng còn nhiều giấy tờ phải điền lắm). Điều này ngụ ý các nhân viên mới chưa thể bắt tay vào việc ngay. Chọn <b>(B) The listeners will not begin work immediately</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Implication"
            },
            {
                "id": "ets22_t4_p4_82",
                "number": 82,
                "text": "What will the speaker do next?",
                "options": {
                    "A": "Take some photographs",
                    "B": "Look at a model home",
                    "C": "Collect some viewer feedback",
                    "D": "Go to the cafeteria"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói sẽ làm gì tiếp theo?<br/>(A) Chụp một số bức ảnh.<br/>(B) Xem nhà mẫu.<br/>(C) Thu thập phản hồi người xem.<br/>(D) Đi đến căng tin.</p><p><b>Phân tích chi tiết:</b> Người nói bảo: <i>'but first I'd like to take your pictures for your ID badges.'</i> (nhưng trước hết tôi muốn chụp ảnh các bạn để làm thẻ nhân viên). Do đó hành động tiếp theo là <b>(A) Take some photographs</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 5: Q83 - Q85
    {
        "id": "ets22_t4_p4_s05",
        "audioUrl": f"{CDN_BASE}/t4_p4_s05.mp3",
        "context": "Questions 83-85 refer to the following telephone message.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Hi, Mario. I'm calling about tonight. I know you plan to be at the product launch in Holtsville to announce the release of our new smartphone. You mentioned that you're taking the red subway line to that event. Well, I just found out that the subway line is closed unexpectedly for repairs, so I wanted to let you know I'll be driving to Holtsville from the office. Now, I have to make one stop on the way. I have to pick up the promotional materials that will be handed out to attendees, those phone cases with our company logo. But there's plenty of time to pick the cases up and still make it to the product launch before it starts.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_83",
                "number": 83,
                "text": "According to the speaker, what event will be held tonight?",
                "options": {
                    "A": "An anniversary party",
                    "B": "A press conference",
                    "C": "A board meeting",
                    "D": "A product launch"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người nói, sự kiện nào sẽ được tổ chức tối nay?<br/>(A) Tiệc kỷ niệm.<br/>(B) Buổi họp báo.<br/>(C) Cuộc họp hội đồng quản trị.<br/>(D) Buổi ra mắt sản phẩm.</p><p><b>Phân tích chi tiết:</b> Người nói nhắc đến: <i>'the product launch in Holtsville to announce the release of our new smartphone.'</i> (buổi ra mắt sản phẩm tại Holtsville để công bố phát hành điện thoại thông minh mới). Chọn <b>(D) A product launch</b>.</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_84",
                "number": 84,
                "text": "Why does the speaker say, “I’ll be driving to Holtsville from the office”?",
                "options": {
                    "A": "To correct a mistake",
                    "B": "To provide an excuse",
                    "C": "To make an offer",
                    "D": "To request directions"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người nói lại nói: 'Tôi sẽ lái xe đến Holtsville từ văn phòng'?<br/>(A) Để sửa chữa một sai sót.<br/>(B) Để đưa ra lý do thoái thác.<br/>(C) Để đưa ra lời đề nghị (cho đi nhờ xe).<br/>(D) Để hỏi đường.</p><p><b>Phân tích chi tiết:</b> Sau khi báo cho Mario biết tuyến tàu điện ngầm màu đỏ đang bị đóng cửa bất ngờ để sửa chữa, người nói cho biết anh ấy lái xe ô tô đến đó nhằm ngụ ý cho Mario đi nhờ xe (<i>to make an offer</i>). Chọn <b>(C) To make an offer</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Implication"
            },
            {
                "id": "ets22_t4_p4_85",
                "number": 85,
                "text": "What does the speaker say he needs to pick up?",
                "options": {
                    "A": "Some promotional materials",
                    "B": "Some refreshments",
                    "C": "Customer surveys",
                    "D": "Event programs"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói cho biết anh ấy cần ghé lấy thứ gì?<br/>(A) Một số tài liệu/vật phẩm quảng bá.<br/>(B) Một ít đồ ăn nhẹ.<br/>(C) Bản khảo sát khách hàng.<br/>(D) Chương trình sự kiện.</p><p><b>Phân tích chi tiết:</b> Người nói cho biết: <i>'I have to pick up the promotional materials that will be handed out to attendees, those phone cases with our company logo.'</i>. Do đó chọn <b>(A) Some promotional materials</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 6: Q86 - Q88
    {
        "id": "ets22_t4_p4_s06",
        "audioUrl": f"{CDN_BASE}/t4_p4_s06.mp3",
        "context": "Questions 86-88 refer to the following introduction.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Welcome to this computer security workshop hosted by the IT department. This workshop is intended to be interactive, so please ask questions at any time. We scheduled the workshop because several employees' computers have recently become infected with a virus, and they had to be fixed. Okay, so the first thing I'm going to show you is how to update your security software. Please open the program by clicking on the icon on the right-hand side of your computer screen.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_86",
                "number": 86,
                "text": "Which department does the speaker most likely work for?",
                "options": {
                    "A": "Product Development",
                    "B": "Research",
                    "C": "Engineering",
                    "D": "Information Technology"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói nhiều khả năng nhất làm việc cho phòng ban nào?<br/>(A) Phát triển sản phẩm.<br/>(B) Nghiên cứu.<br/>(C) Kỹ thuật.<br/>(D) Công nghệ thông tin (IT).</p><p><b>Phân tích chi tiết:</b> Người nói mở đầu: <i>'Welcome to this computer security workshop hosted by the IT department.'</i> (Chào mừng quý vị đến với hội thảo an ninh máy tính do phòng IT tổ chức). Chọn <b>(D) Information Technology</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_87",
                "number": 87,
                "text": "What does the speaker say recently happened?",
                "options": {
                    "A": "Some certification classes began.",
                    "B": "Name badges were handed out.",
                    "C": "A virus infected some computers.",
                    "D": "A manager retired."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói cho biết điều gì vừa xảy ra gần đây?<br/>(A) Một số lớp chứng chỉ đã bắt đầu.<br/>(B) Thẻ tên đã được phát.<br/>(C) Một loại virus đã lây nhiễm một số máy tính.<br/>(D) Một người quản lý đã nghỉ hưu.</p><p><b>Phân tích chi tiết:</b> Người nói giải thích lý do tổ chức buổi tập huấn: <i>'because several employees' computers have recently become infected with a virus, and they had to be fixed.'</i>. Chọn <b>(C) A virus infected some computers</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p4_88",
                "number": 88,
                "text": "What does the speaker ask the listeners to do?",
                "options": {
                    "A": "Sign an attendance sheet",
                    "B": "Open a software program",
                    "C": "Submit some photos",
                    "D": "View a slideshow"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói yêu cầu người nghe làm gì?<br/>(A) Ký vào bảng điểm danh.<br/>(B) Mở một chương trình phần mềm.<br/>(C) Nộp một số bức ảnh.<br/>(D) Xem trình chiếu.</p><p><b>Phân tích chi tiết:</b> Người nói chỉ dẫn: <i>'Please open the program by clicking on the icon on the right-hand side of your computer screen.'</i> (Vui lòng mở chương trình bằng cách nhấp vào biểu tượng ở góc phải màn hình máy tính). Chọn <b>(B) Open a software program</b>.</p>",
                "questionType": "Request",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 7: Q89 - Q91
    {
        "id": "ets22_t4_p4_s07",
        "audioUrl": f"{CDN_BASE}/t4_p4_s07.mp3",
        "context": "Questions 89-91 refer to the following excerpt from a meeting.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Okay, let's get started. There's a lot to cover. First, I want to thank the web design team for joining this weekly check-in of our editorial staff and reporters. An online organization like ours relies heavily on the support of its design and technical staff. Today, I'd like to discuss adding a section to the site that features our most popular news stories. Many other news sites already have a popular stories section. I'm concerned that we're not keeping up with them, and it could affect our readership. Now, I realize you're all busy, but I don't think this will involve too much work. Plus, remember, we have technology interns starting next week.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_89",
                "number": 89,
                "text": "Where do the listeners most likely work?",
                "options": {
                    "A": "At a software development company",
                    "B": "At a book publishing company",
                    "C": "At a graphic design firm",
                    "D": "At a news Web site"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nghe nhiều khả năng nhất làm việc ở đâu?<br/>(A) Công ty phát triển phần mềm.<br/>(B) Công ty xuất bản sách.<br/>(C) Công ty thiết kế đồ họa.<br/>(D) Trang web tin tức.</p><p><b>Phân tích chi tiết:</b> Người nói cảm ơn <i>web design team</i> đã họp cùng <i>editorial staff and reporters</i> (ban biên tập và phóng viên tin tức) của tổ chức trực tuyến để phát triển phần tin bài phổ biến. Chọn <b>(D) At a news Web site</b>.</p>",
                "questionType": "Location",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_90",
                "number": 90,
                "text": "What is the speaker concerned about?",
                "options": {
                    "A": "Addressing a customer complaint",
                    "B": "Keeping up with competitors",
                    "C": "Exceeding an annual budget",
                    "D": "Improving employee productivity"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói lo ngại về điều gì?<br/>(A) Giải quyết khiếu nại khách hàng.<br/>(B) Theo kịp các đối thủ cạnh tranh.<br/>(C) Vượt quá ngân sách năm.<br/>(D) Cải thiện năng suất nhân viên.</p><p><b>Phân tích chi tiết:</b> Người nói bày tỏ: <i>'Many other news sites already have a popular stories section. I'm concerned that we're not keeping up with them, and it could affect our readership.'</i> (Nhiều trang tin khác đã có mục này, tôi lo ngại chúng ta không theo kịp họ). Chọn <b>(B) Keeping up with competitors</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p4_91",
                "number": 91,
                "text": "What does the speaker imply when he says, “we have technology interns starting next week”?",
                "options": {
                    "A": "A task must be finished soon.",
                    "B": "An assignment should be delayed.",
                    "C": "Volunteers are needed to greet interns.",
                    "D": "Interns can assist with a new project."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói ngụ ý điều gì khi nói: 'chúng ta có các thực tập sinh công nghệ bắt đầu vào tuần tới'?<br/>(A) Nhiệm vụ phải xong sớm.<br/>(B) Công việc nên bị trì hoãn.<br/>(C) Cần tình nguyện viên đón thực tập sinh.<br/>(D) Thực tập sinh có thể hỗ trợ dự án mới.</p><p><b>Phân tích chi tiết:</b> Sau khi thừa nhận nhân viên đang bận rộn, người nói nhắc đến việc thực tập sinh sắp đến để trấn an rằng họ sẽ có người hỗ trợ chia sẻ khối lượng công việc cho tính năng mới. Chọn <b>(D) Interns can assist with a new project</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Implication"
            }
        ]
    },

    # Set 8: Q92 - Q94
    {
        "id": "ets22_t4_p4_s08",
        "audioUrl": f"{CDN_BASE}/t4_p4_s08.mp3",
        "context": "Questions 92-94 refer to the following broadcast.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Hello, this is Gia Liu reporting live from the Benton Public Library. Starting next week, the library will be undergoing major renovations. A new section will be added to the east side of this building. The addition will include a larger children's section and a computer lab. The library will be open during the renovations, though you may want to bring earplugs to wear. Susan Anderson, the head librarian, warns that the construction will be noisy. And now, back to the studio.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_92",
                "number": 92,
                "text": "Where is the speaker?",
                "options": {
                    "A": "At a public library",
                    "B": "At a history museum",
                    "C": "At a community center",
                    "D": "At a sports arena"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói đang ở đâu?<br/>(A) Tại thư viện công cộng.<br/>(B) Tại bảo tàng lịch sử.<br/>(C) Tại trung tâm cộng đồng.<br/>(D) Tại nhà thi đấu thể thao.</p><p><b>Phân tích chi tiết:</b> Phóng viên mở đầu: <i>'Hello, this is Gia Liu reporting live from the Benton Public Library.'</i> (Đây là Gia Liu đưa tin trực tiếp từ Thư viện Công cộng Benton). Chọn <b>(A) At a public library</b>.</p>",
                "questionType": "Location",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_93",
                "number": 93,
                "text": "What will happen next week?",
                "options": {
                    "A": "A new exhibit will be set up.",
                    "B": "A fund-raiser will take place.",
                    "C": "A local election will be held.",
                    "D": "A construction project will begin."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì sẽ xảy ra vào tuần tới?<br/>(A) Một triển lãm mới sẽ được dựng lên.<br/>(B) Sự kiện gây quỹ sẽ diễn ra.<br/>(C) Một cuộc bầu cử địa phương sẽ được tổ chức.<br/>(D) Một dự án xây dựng cải tạo sẽ bắt đầu.</p><p><b>Phân tích chi tiết:</b> Phóng viên cho biết: <i>'Starting next week, the library will be undergoing major renovations.'</i> (Bắt đầu từ tuần tới, thư viện sẽ trải qua đợt cải tạo lớn). Chọn <b>(D) A construction project will begin</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p4_94",
                "number": 94,
                "text": "What are visitors encouraged to do?",
                "options": {
                    "A": "Park on a side street",
                    "B": "Wear ear protection",
                    "C": "Donate money",
                    "D": "Take photographs"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Khách đến thư viện được khuyến khích làm gì?<br/>(A) Đỗ xe ở đường nhánh.<br/>(B) Đeo đồ bảo vệ tai/nút bịt tai.<br/>(C) Quyên góp tiền.<br/>(D) Chụp ảnh.</p><p><b>Phân tích chi tiết:</b> Phóng viên lưu ý: <i>'The library will be open during the renovations, though you may want to bring earplugs to wear. ...the construction will be noisy.'</i> (khách nên mang theo nút bịt tai vì việc thi công sẽ ồn ào). Chọn <b>(B) Wear ear protection</b>.</p>",
                "questionType": "Recommendation",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 9: Q95 - Q97 (With Graphic: t4_p4_g01.jpg)
    {
        "id": "ets22_t4_p4_s09",
        "audioUrl": f"{CDN_BASE}/t4_p4_s09.mp3",
        "image": f"{CDN_BASE}/t4_p4_g01.jpg",
        "context": "Questions 95-97 refer to the following announcement and store map.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Attention shoppers. Thanks for coming to Link Office Superstore's annual sale. We offer the best prices in town on office supplies, desks, and chairs. There are a lot of people here for our special deals today, so lines for the cashiers are rather long. To help speed up the checkout process, please use the express lane located near the exit if you're buying five items or fewer. Also, if you're purchasing a large item and need help moving it, just let one of the employees know and they'll help you bring the item to your vehicle.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_95",
                "number": 95,
                "text": "Where is the announcement being made?",
                "options": {
                    "A": "At a supermarket",
                    "B": "At a clothing store",
                    "C": "At an office supply store",
                    "D": "At a home garden center"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Thông báo đang được phát ở đâu?<br/>(A) Tại siêu thị.<br/>(B) Tại cửa hàng quần áo.<br/>(C) Tại cửa hàng văn phòng phẩm.<br/>(D) Tại trung tâm làm vườn tại nhà.</p><p><b>Phân tích chi tiết:</b> Người nói mở đầu: <i>'Thanks for coming to Link Office Superstore's annual sale. We offer the best prices in town on office supplies, desks, and chairs.'</i>. Do đó địa điểm là <b>(C) At an office supply store</b>.</p>",
                "questionType": "Location",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_96",
                "number": 96,
                "text": "Look at the graphic. Which lane is the express lane?",
                "options": {
                    "A": "Lane 1",
                    "B": "Lane 2",
                    "C": "Lane 3",
                    "D": "Lane 4"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào biểu đồ. Làn thanh toán nào là làn thanh toán nhanh (express lane)?<br/>(A) Làn 1.<br/>(B) Làn 2.<br/>(C) Làn 3.<br/>(D) Làn 4.</p><p><b>Phân tích chi tiết:</b> Người nói hướng dẫn: <i>'please use the express lane located near the exit if you're buying five items or fewer.'</i> (vui lòng sử dụng làn thanh toán nhanh nằm gần cửa ra nếu mua từ 5 món hàng trở xuống). Nhìn vào sơ đồ bố trí các quầy thu ngân:<br/>- Lối ra (Exit) nằm cạnh <b>Lane 4</b>.<br/>Do đó Lane 4 chính là quầy thanh toán nhanh. Chọn <b>(D) Lane 4</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Visual Link"
            },
            {
                "id": "ets22_t4_p4_97",
                "number": 97,
                "text": "According to the speaker, what can the listeners receive assistance with?",
                "options": {
                    "A": "Checking a price",
                    "B": "Moving large items",
                    "C": "Getting a refund",
                    "D": "Locating some merchandise"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người nói, người nghe có thể nhận được sự trợ giúp về việc gì?<br/>(A) Kiểm tra giá cả.<br/>(B) Vận chuyển các món hàng cồng kềnh/lớn.<br/>(C) Nhận tiền hoàn trả.<br/>(D) Tìm vị trí hàng hóa.</p><p><b>Phân tích chi tiết:</b> Người nói nhắc: <i>'if you're purchasing a large item and need help moving it, just let one of the employees know and they'll help you bring the item to your vehicle.'</i> (nếu mua đồ lớn cần người khiêng ra xe, hãy báo nhân viên hỗ trợ). Chọn <b>(B) Moving large items</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 10: Q98 - Q100 (With Graphic: t4_p4_g02.jpg)
    {
        "id": "ets22_t4_p4_s10",
        "audioUrl": f"{CDN_BASE}/t4_p4_s10.mp3",
        "image": f"{CDN_BASE}/t4_p4_g02.jpg",
        "context": "Questions 98-100 refer to the following talk and calendar.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Thanks for coming to today's painting class at the Lightdale Community Center. I hope you enjoyed learning some of the techniques I showed you. If you could collect your brushes and paints and leave them right here on this table, it'll make my cleanup easier. And before you go, I want to remind everyone about the other great events here at the center. There's a copy of the schedule at the door. I recommend the Mystery Book Club meeting because there will be a special guest that night. The author Gerard Messina will be reading from his latest novel.</p>",
        "questions": [
            {
                "id": "ets22_t4_p4_98",
                "number": 98,
                "text": "Who most likely is the speaker?",
                "options": {
                    "A": "A musician",
                    "B": "An actor",
                    "C": "A writing instructor",
                    "D": "An art teacher"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói nhiều khả năng nhất là ai?<br/>(A) Một nhạc sĩ.<br/>(B) Một diễn viên.<br/>(C) Một giảng viên viết lách.<br/>(D) Một giáo viên dạy mỹ thuật/hội họa.</p><p><b>Phân tích chi tiết:</b> Người nói cảm ơn học viên đã đến <i>today's painting class</i> (lớp học vẽ tranh hôm nay) và hướng dẫn thu dọn cọ vẽ và màu vẽ (<i>brushes and paints</i>). Do đó người nói là <b>(D) An art teacher</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p4_99",
                "number": 99,
                "text": "What are the listeners asked to do?",
                "options": {
                    "A": "Arrive early",
                    "B": "Help clean an area",
                    "C": "Silence mobile phones",
                    "D": "Provide feedback"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nghe được yêu cầu làm gì?<br/>(A) Đến sớm.<br/>(B) Giúp dọn dẹp khu vực.<br/>(C) Tắt chuông điện thoại di động.<br/>(D) Cung cấp phản hồi.</p><p><b>Phân tích chi tiết:</b> Người nói nhờ: <i>'If you could collect your brushes and paints and leave them right here on this table, it'll make my cleanup easier.'</i> (gom cọ và màu vẽ để lên bàn giúp việc dọn dẹp dễ dàng hơn). Chọn <b>(B) Help clean an area</b>.</p>",
                "questionType": "Request",
                "subCategory": "Next Action"
            },
            {
                "id": "ets22_t4_p4_100",
                "number": 100,
                "text": "Look at the graphic. On which date will there be a special guest?",
                "options": {
                    "A": "June 7",
                    "B": "June 9",
                    "C": "June 13",
                    "D": "June 15"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào biểu đồ lịch. Vào ngày nào sẽ có một vị khách đặc biệt tham dự?<br/>(A) Ngày 7 tháng 6.<br/>(B) Ngày 9 tháng 6.<br/>(C) Ngày 13 tháng 6.<br/>(D) Ngày 15 tháng 6.</p><p><b>Phân tích chi tiết:</b> Người nói khuyên nên tham gia buổi sinh hoạt của <b>Mystery Book Club</b> (Câu lạc bộ Sách Trinh thám) vì sẽ có nhà văn khách mời đặc biệt Gerard Messina đọc tiểu thuyết mới. Nhìn vào lịch sự kiện tháng 6:<br/>- Ngày 13 tháng 6 ghi: <i>Book Club</i>.<br/>Do đó ngày có khách mời đặc biệt là ngày <b>June 13</b>. Chọn <b>(C) June 13</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Visual Link"
            }
        ]
    }
]

with open("public/data/ets2022/test4/part4.json", "w", encoding="utf-8") as f:
    json.dump(part4_data, f, ensure_ascii=False, indent=2)

print("Generated public/data/ets2022/test4/part4.json successfully with", len(part4_data), "sets and", sum(len(s["questions"]) for s in part4_data), "questions.")
