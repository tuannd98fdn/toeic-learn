import json

CDN_BASE = "https://github.com/tuannd98fdn/toeic-learn/releases/download/ets2022-assets"

part3_data = [
    # Set 1: Q32 - Q34
    {
        "id": "ets22_t4_p3_s01",
        "audioUrl": f"{CDN_BASE}/t4_p3_s01.mp3",
        "context": "Questions 32-34 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Hi, welcome to the Riverfront Hotel. Are you here for the pharmaceutical conference?<br/>"
                      "<b>M:</b> Actually, no. I'm organizing a retirement party for a colleague this weekend, and I reserved the banquet hall on the second floor.<br/>"
                      "<b>W:</b> Oh, yes, Mr. Patel! Let me check the schedule for your event. Ah, you've requested twenty tables with eight chairs each.<br/>"
                      "<b>M:</b> That's right. But could we add two more chairs to each table? It turns out more people are attending than we initially expected.<br/>"
                      "<b>W:</b> That shouldn't be a problem at all. We have plenty of extra seating in storage. I'll make a note on your file right now.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_32",
                "number": 32,
                "text": "What is the man preparing for?",
                "options": {
                    "A": "A holiday raffle",
                    "B": "A retirement party",
                    "C": "A grand opening",
                    "D": "A charity event"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông đang chuẩn bị cho sự kiện gì?<br/>(A) Buổi rút thăm may mắn dịp lễ.<br/>(B) Bữa tiệc về hưu.<br/>(C) Lễ khai trương.<br/>(D) Sự kiện từ thiện.</p><p><b>Phân tích chi tiết:</b> Người đàn ông nói: <i>'I'm organizing a retirement party for a colleague this weekend...'</i> (Tôi đang tổ chức một bữa tiệc về hưu cho một đồng nghiệp vào cuối tuần này). Chọn <b>(B) A retirement party</b>.</p>",
                "questionType": "Purpose",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_33",
                "number": 33,
                "text": "According to the man, what did he request?",
                "options": {
                    "A": "Additional chairs",
                    "B": "Projection equipment",
                    "C": "Vegetarian meals",
                    "D": "An earlier start time"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người đàn ông, anh ấy yêu cầu điều gì?<br/>(A) Thêm ghế ngồi.<br/>(B) Thiết bị máy chiếu.<br/>(C) Các suất ăn chay.<br/>(D) Giờ bắt đầu sớm hơn.</p><p><b>Phân tích chi tiết:</b> Người đàn ông hỏi: <i>'could we add two more chairs to each table?'</i> (chúng tôi có thể thêm 2 chiếc ghế vào mỗi bàn được không?). Do đó đáp án là <b>(A) Additional chairs</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p3_34",
                "number": 34,
                "text": "What will the woman do next?",
                "options": {
                    "A": "Locate some keys",
                    "B": "Process a payment",
                    "C": "Make a phone call",
                    "D": "Update a file"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ sẽ làm gì tiếp theo?<br/>(A) Tìm chìa khóa.<br/>(B) Xử lý thanh toán.<br/>(C) Gọi điện thoại.<br/>(D) Cập nhật hồ sơ/hồ sơ lưu trữ.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ khẳng định: <i>'I'll make a note on your file right now.'</i> (Tôi sẽ ghi chú vào hồ sơ của bạn ngay bây giờ). Chọn <b>(D) Update a file</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 2: Q35 - Q37
    {
        "id": "ets22_t4_p3_s02",
        "audioUrl": f"{CDN_BASE}/t4_p3_s02.mp3",
        "context": "Questions 35-37 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Good afternoon, Ms. Kim. I'm calling from Summit Symphony Orchestra. We're currently planning our upcoming European tour for next spring, and our conductor suggested reaching out to you. We'd love to offer you the position of guest violinist.<br/>"
                      "<b>W:</b> Wow, that's such an honor! I'd love to join the orchestra for the tour. However, I have a concert series in Seoul scheduled during the first two weeks of April, so I might have a schedule conflict.<br/>"
                      "<b>M:</b> Oh, our tour doesn't start until May 3rd in Vienna, so that won't overlap with your performances in Seoul at all.<br/>"
                      "<b>W:</b> That's wonderful news! In that case, please email me the contract and repertoire details.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_35",
                "number": 35,
                "text": "What most likely is the woman’s profession?",
                "options": {
                    "A": "Sound engineer",
                    "B": "Travel agent",
                    "C": "Actor",
                    "D": "Musician"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Nghề nghiệp của người phụ nữ nhiều khả năng nhất là gì?<br/>(A) Kỹ sư âm thanh.<br/>(B) Đại lý du lịch.<br/>(C) Diễn viên.<br/>(D) Nhạc sĩ/Nhạc công.</p><p><b>Phân tích chi tiết:</b> Người đàn ông gọi đến từ dàn nhạc giao hưởng (Summit Symphony Orchestra) và mời cô ấy làm <i>guest violinist</i> (nghệ sĩ vĩ cầm khách mời). Do đó nghề nghiệp của cô ấy là <b>(D) Musician</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_36",
                "number": 36,
                "text": "Why is the man calling?",
                "options": {
                    "A": "To ask the woman for a favor",
                    "B": "To offer the woman a job",
                    "C": "To purchase some tickets",
                    "D": "To recommend a colleague"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người đàn ông lại gọi điện?<br/>(A) Để nhờ người phụ nữ giúp đỡ.<br/>(B) Để mời người phụ nữ nhận một công việc.<br/>(C) Để mua một số vé.<br/>(D) Để giới thiệu một đồng nghiệp.</p><p><b>Phân tích chi tiết:</b> Người đàn ông nói rõ: <i>'We'd love to offer you the position of guest violinist.'</i> (Chúng tôi rất mong muốn mời bạn nhận vị trí nghệ sĩ vĩ cầm khách mời). Chọn <b>(B) To offer the woman a job</b>.</p>",
                "questionType": "Purpose",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_37",
                "number": 37,
                "text": "According to the woman, what might cause a problem?",
                "options": {
                    "A": "A billing error",
                    "B": "A schedule conflict",
                    "C": "A visa requirement",
                    "D": "A mechanical failure"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người phụ nữ, điều gì có thể gây ra trở ngại?<br/>(A) Lỗi thanh toán hóa đơn.<br/>(B) Trùng lặp lịch trình.<br/>(C) Yêu cầu thị thực.<br/>(D) Trục trặc cơ khí.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ cho biết: <i>'I have a concert series in Seoul scheduled during the first two weeks of April, so I might have a schedule conflict.'</i> (Tôi có chuỗi hòa nhạc ở Seoul nên có thể bị trùng lịch). Chọn <b>(B) A schedule conflict</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 3: Q38 - Q40
    {
        "id": "ets22_t4_p3_s03",
        "audioUrl": f"{CDN_BASE}/t4_p3_s03.mp3",
        "context": "Questions 38-40 refer to the following conversation with three speakers.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M1:</b> Fatima, Carl, thanks for meeting with me. Our annual trade show in Chicago is only two weeks away, and we still need to finalize the booth setup.<br/>"
                      "<b>W:</b> I've already arranged for the shipping of our product samples and promotional banners. They should arrive at the convention center by next Tuesday.<br/>"
                      "<b>M2:</b> Great. But what about the digital display screens? We had requested three high-definition touchscreens for client demonstrations.<br/>"
                      "<b>M1:</b> Right. The audio-visual vendor sent an email confirming that the screens are reserved, but they require a signed authorization form from our department before delivery.<br/>"
                      "<b>W:</b> Don't worry. I have the digital form on my tablet. I'll sign it and submit it to the vendor right after this meeting.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_38",
                "number": 38,
                "text": "What kind of event is taking place?",
                "options": {
                    "A": "A fund-raiser",
                    "B": "A grand opening",
                    "C": "A trade show",
                    "D": "A job fair"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Loại sự kiện nào đang diễn ra?<br/>(A) Buổi gây quỹ.<br/>(B) Lễ khai trương.<br/>(C) Triển lãm thương mại.<br/>(D) Hội chợ việc làm.</p><p><b>Phân tích chi tiết:</b> Người nói đầu tiên mở đầu: <i>'Our annual trade show in Chicago is only two weeks away...'</i> (Triển lãm thương mại hằng năm của chúng ta tại Chicago chỉ còn hai tuần nữa). Chọn <b>(C) A trade show</b>.</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_39",
                "number": 39,
                "text": "What equipment was requested for the event?",
                "options": {
                    "A": "Touchscreen displays",
                    "B": "Vegetarian meals",
                    "C": "Additional parking",
                    "D": "An earlier start time"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Thiết bị nào đã được yêu cầu cho sự kiện?<br/>(A) Màn hình cảm ứng.<br/>(B) Suất ăn chay.<br/>(C) Thêm chỗ đỗ xe.<br/>(D) Giờ bắt đầu sớm hơn.</p><p><b>Phân tích chi tiết:</b> Người nói thứ hai nhắc đến: <i>'We had requested three high-definition touchscreens for client demonstrations.'</i> (Chúng ta đã yêu cầu 3 màn hình cảm ứng độ phân giải cao để trình diễn cho khách). Chọn <b>(A) Touchscreen displays</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p3_40",
                "number": 40,
                "text": "What will Fatima do next?",
                "options": {
                    "A": "Locate some keys",
                    "B": "Make a phone call",
                    "C": "Check some seating arrangements",
                    "D": "Submit an authorization form"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Fatima sẽ làm gì tiếp theo?<br/>(A) Tìm chìa khóa.<br/>(B) Gọi điện thoại.<br/>(C) Kiểm tra sắp xếp chỗ ngồi.<br/>(D) Nộp biểu mẫu ủy quyền.</p><p><b>Phân tích chi tiết:</b> Fatima nói: <i>'I have the digital form on my tablet. I'll sign it and submit it to the vendor right after this meeting.'</i> (Tôi có biểu mẫu điện tử trên máy tính bảng. Tôi sẽ ký và nộp cho bên cung cấp ngay sau cuộc họp). Chọn <b>(D) Submit an authorization form</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 4: Q41 - Q43
    {
        "id": "ets22_t4_p3_s04",
        "audioUrl": f"{CDN_BASE}/t4_p3_s04.mp3",
        "context": "Questions 41-43 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Excuse me, I'm looking for organic honeycrisp apples. I see plenty of red delicious and granny smith over here, but the bins for honeycrisp are completely empty.<br/>"
                      "<b>W:</b> Oh, let me check our inventory database on my handheld scanner. Yes, it looks like our morning shipment of organic produce just arrived at the loading dock twenty minutes ago.<br/>"
                      "<b>M:</b> Great! Would it be possible for someone to bring a crate of them out to the produce aisle?<br/>"
                      "<b>W:</b> Certainly. Our stockroom associate is unloading the truck right now. If you can wait by the bakery section for about five minutes, I'll have him bring out a fresh box for you.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_41",
                "number": 41,
                "text": "Where is the conversation most likely taking place?",
                "options": {
                    "A": "At a vegetable farm",
                    "B": "At an electronics store",
                    "C": "At a motorcycle repair shop",
                    "D": "At a grocery store"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Cuộc hội thoại nhiều khả năng nhất diễn ra ở đâu?<br/>(A) Tại một trang trại rau củ.<br/>(B) Tại cửa hàng đồ điện tử.<br/>(C) Tại xưởng sửa xe máy.<br/>(D) Tại một cửa hàng tạp hóa/siêu thị thực phẩm.</p><p><b>Phân tích chi tiết:</b> Người đàn ông hỏi mua các loại táo (<i>honeycrisp apples, produce aisle, bakery section</i>), nhân viên kiểm tra lô hàng rau củ quả vừa giao. Do đó bối cảnh là <b>(D) At a grocery store</b>.</p>",
                "questionType": "Location",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_42",
                "number": 42,
                "text": "What does the woman ask the man to do?",
                "options": {
                    "A": "Wait near a specific section",
                    "B": "Show a receipt",
                    "C": "Contact a manufacturer",
                    "D": "Speak to a mechanic"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ yêu cầu người đàn ông làm gì?<br/>(A) Chờ gần một khu vực cụ thể.<br/>(B) Xuất trình biên lai.<br/>(C) Liên hệ nhà sản xuất.<br/>(D) Nói chuyện với thợ cơ khí.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ hướng dẫn: <i>'If you can wait by the bakery section for about five minutes...'</i> (Nếu anh có thể đứng đợi ở khu vực quầy bánh mì khoảng 5 phút...). Do đó chọn <b>(A) Wait near a specific section</b>.</p>",
                "questionType": "Request",
                "subCategory": "Next Action"
            },
            {
                "id": "ets22_t4_p3_43",
                "number": 43,
                "text": "What information does the woman give the man?",
                "options": {
                    "A": "When an item will be available",
                    "B": "The name of a supervisor",
                    "C": "The price of an item",
                    "D": "The size of an order"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ cung cấp thông tin gì cho người đàn ông?<br/>(A) Khi nào món hàng sẽ có sẵn.<br/>(B) Tên người giám sát.<br/>(C) Giá của món hàng.<br/>(D) Quy mô đơn hàng.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ báo rằng hàng vừa tới bốc dỡ và chỉ khoảng 5 phút nữa nhân viên sẽ mang ra tận nơi (<i>about five minutes</i>). Chọn <b>(A) When an item will be available</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 5: Q44 - Q46
    {
        "id": "ets22_t4_p3_s05",
        "audioUrl": f"{CDN_BASE}/t4_p3_s05.mp3",
        "context": "Questions 44-46 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Hey, Omar. I know we planned to meet today to review resumes for the open Junior Accountant position, but I'm just swamped.<br/>"
                      "<b>M:</b> Oh, what's going on?<br/>"
                      "<b>W:</b> Well, you know I have to finish the quarterly tax filings for two of my top clients. So could we review the resumes tomorrow?<br/>"
                      "<b>M:</b> It won't take that long. I've already gone through them and separated out the candidates with the accounting experience we're looking for. We just need to decide who to interview.<br/>"
                      "<b>W:</b> Okay, but I'll have to leave right at five o'clock because I have a dentist appointment after work.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_44",
                "number": 44,
                "text": "What field do the speakers most likely work in?",
                "options": {
                    "A": "Accounting",
                    "B": "Engineering",
                    "C": "Education",
                    "D": "Agriculture"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Các diễn giả nhiều khả năng làm việc trong lĩnh vực nào nhất?<br/>(A) Kế toán.<br/>(B) Kỹ thuật.<br/>(C) Giáo dục.<br/>(D) Nông nghiệp.</p><p><b>Phân tích chi tiết:</b> Hai người nói chuyện về tuyển dụng <i>Junior Accountant</i>, hoàn thành <i>quarterly tax filings</i> (kê khai thuế hàng quý) và ứng viên có <i>accounting experience</i>. Do đó lĩnh vực của họ là <b>(A) Accounting</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_45",
                "number": 45,
                "text": "Why does the man say, “It won’t take that long”?",
                "options": {
                    "A": "To request the woman’s permission",
                    "B": "To convince the woman to meet",
                    "C": "To decline an invitation",
                    "D": "To express surprise about a decision"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người đàn ông lại nói: 'Sẽ không mất nhiều thời gian đâu'?<br/>(A) Để xin phép người phụ nữ.<br/>(B) Để thuyết phục người phụ nữ họp hôm nay.<br/>(C) Để từ chối một lời mời.<br/>(D) Để bày tỏ sự ngạc nhiên về một quyết định.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ muốn hoãn buổi họp duyệt hồ sơ sang ngày mai vì quá bận. Người đàn ông nói câu này kèm theo giải thích anh đã lọc sẵn hồ sơ rồi nhằm thuyết phục cô họp nhanh trong ngày hôm nay. Chọn <b>(B) To convince the woman to meet</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Implication"
            },
            {
                "id": "ets22_t4_p3_46",
                "number": 46,
                "text": "What does the woman say she will do after work?",
                "options": {
                    "A": "Pack for a business trip",
                    "B": "Go to a dental appointment",
                    "C": "Pick up a food order",
                    "D": "Attend a retirement party"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nói cô ấy sẽ làm gì sau giờ làm việc?<br/>(A) Thu xếp hành lý đi công tác.<br/>(B) Đi đến cuộc hẹn khám nha khoa.<br/>(C) Lấy một phần đồ ăn đã đặt.<br/>(D) Tham dự bữa tiệc về hưu.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ cho biết: <i>'I'll have to leave right at five o'clock because I have a dentist appointment after work.'</i> (Tôi phải về đúng 5 giờ vì có hẹn nha sĩ sau giờ làm). Chọn <b>(B) Go to a dental appointment</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 6: Q47 - Q49
    {
        "id": "ets22_t4_p3_s06",
        "audioUrl": f"{CDN_BASE}/t4_p3_s06.mp3",
        "context": "Questions 47-49 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Irina, do you have the results from our latest employee satisfaction survey?<br/>"
                      "<b>W:</b> Yes, and based on the comments, the majority of our employees want us to make the company more environmentally friendly. Apparently, they feel that we don't do enough to promote recycling efforts.<br/>"
                      "<b>M:</b> That reminds me about an article I read recently. It said that eco-friendly companies tend to have higher employee satisfaction rates.<br/>"
                      "<b>W:</b> In that case, why don't we bring in an outside consultant? We can hire someone who's an expert on finding ways to promote sustainability.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_47",
                "number": 47,
                "text": "According to the woman, what do the results of a survey indicate about the company?",
                "options": {
                    "A": "It should create an employee award.",
                    "B": "It should provide free transportation.",
                    "C": "Its employees are happy with a training program.",
                    "D": "Its employees are concerned about the environment."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người phụ nữ, kết quả khảo sát chỉ ra điều gì về công ty?<br/>(A) Công ty nên tạo giải thưởng nhân viên.<br/>(B) Công ty nên cung cấp phương tiện đi lại miễn phí.<br/>(C) Nhân viên hài lòng với chương trình đào tạo.<br/>(D) Nhân viên quan tâm đến môi trường.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ trả lời: <i>'the majority of our employees want us to make the company more environmentally friendly.'</i> (Đa số nhân viên muốn công ty thân thiện với môi trường hơn). Chọn <b>(D) Its employees are concerned about the environment</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p3_48",
                "number": 48,
                "text": "What does the man say he did recently?",
                "options": {
                    "A": "He accepted a job offer.",
                    "B": "He read an article.",
                    "C": "He downloaded a schedule.",
                    "D": "He met a sales goal."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông nói gần đây anh ấy đã làm gì?<br/>(A) Nhận lời mời làm việc.<br/>(B) Đọc một bài báo.<br/>(C) Tải xuống một lịch trình.<br/>(D) Đạt mục tiêu doanh số.</p><p><b>Phân tích chi tiết:</b> Người đàn ông nói: <i>'That reminds me about an article I read recently.'</i> (Điều đó làm tôi nhớ đến một bài báo tôi đọc gần đây). Chọn <b>(B) He read an article</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p3_49",
                "number": 49,
                "text": "What does the woman suggest?",
                "options": {
                    "A": "Hiring a consultant",
                    "B": "Changing a venue",
                    "C": "Modifying a production process",
                    "D": "Recruiting volunteers"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ đề xuất điều gì?<br/>(A) Thuê chuyên gia tư vấn.<br/>(B) Thay đổi địa điểm tổ chức.<br/>(C) Sửa đổi quy trình sản xuất.<br/>(D) Tuyển tình nguyện viên.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ gợi ý: <i>'why don't we bring in an outside consultant? We can hire someone who's an expert on finding ways to promote sustainability.'</i>. Chọn <b>(A) Hiring a consultant</b>.</p>",
                "questionType": "Suggestion",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 7: Q50 - Q52
    {
        "id": "ets22_t4_p3_s07",
        "audioUrl": f"{CDN_BASE}/t4_p3_s07.mp3",
        "context": "Questions 50-52 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Sophia, how was the graphic design conference in Sacramento?<br/>"
                      "<b>W:</b> Very good. I especially enjoyed the sessions on customer service. I think it'll help me serve our clients better.<br/>"
                      "<b>M:</b> Great. By the way, have you seen the latest expense report for our design department?<br/>"
                      "<b>W:</b> Not yet. Why?<br/>"
                      "<b>M:</b> We've already exceeded our quarterly budget. We really need to restrict our spending now. So I'm asking everyone to come up with ideas for cutting our department's expenses. Could you write up some ideas by two o'clock today?<br/>"
                      "<b>W:</b> That'll be quite challenging. I know you just got back, but this is important.<br/>"
                      "<b>W:</b> Okay. I'll talk to my assistant and have her clear my schedule for the rest of the morning.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_50",
                "number": 50,
                "text": "What type of event did the woman attend?",
                "options": {
                    "A": "A theater performance",
                    "B": "A grand opening",
                    "C": "A professional conference",
                    "D": "A retirement party"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ đã tham dự loại sự kiện nào?<br/>(A) Buổi biểu diễn kịch.<br/>(B) Lễ khai trương.<br/>(C) Hội nghị chuyên môn.<br/>(D) Bữa tiệc về hưu.</p><p><b>Phân tích chi tiết:</b> Người đàn ông hỏi: <i>'how was the graphic design conference in Sacramento?'</i> (Hội nghị thiết kế đồ họa ở Sacramento thế nào?). Do đó sự kiện là <b>(C) A professional conference</b>.</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_51",
                "number": 51,
                "text": "What does the woman imply when she says, “That’ll be quite challenging”?",
                "options": {
                    "A": "She wants to apply for a new position.",
                    "B": "She does not think she can meet a deadline.",
                    "C": "She will need additional funding for a project.",
                    "D": "She admires a colleague’s plan."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ ngụ ý điều gì khi nói: 'Việc đó sẽ khá là thử thách đấy'?<br/>(A) Cô ấy muốn ứng tuyển vị trí mới.<br/>(B) Cô ấy nghĩ mình khó có thể kịp hạn chót.<br/>(C) Cô ấy cần thêm kinh phí dự án.<br/>(D) Cô ấy ngưỡng mộ kế hoạch của đồng nghiệp.</p><p><b>Phân tích chi tiết:</b> Khi người đàn ông yêu cầu nộp ý tưởng trước 2 giờ chiều hôm nay (<i>by two o'clock today</i>), người phụ nữ kêu khó khăn vì thời gian quá gấp. Chọn <b>(B) She does not think she can meet a deadline</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Implication"
            },
            {
                "id": "ets22_t4_p3_52",
                "number": 52,
                "text": "What does the woman say she will do now?",
                "options": {
                    "A": "Speak with her assistant",
                    "B": "Print out her resume",
                    "C": "Order some food",
                    "D": "Make travel arrangements"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nói cô ấy sẽ làm gì bây giờ?<br/>(A) Nói chuyện với trợ lý của mình.<br/>(B) In sơ yếu lý lịch.<br/>(C) Đặt đồ ăn.<br/>(D) Thu xếp chuyến đi.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ nói: <i>'I'll talk to my assistant and have her clear my schedule for the rest of the morning.'</i> (Tôi sẽ trao đổi với trợ lý để cô ấy dọn trống lịch buổi sáng của tôi). Chọn <b>(A) Speak with her assistant</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 8: Q53 - Q55
    {
        "id": "ets22_t4_p3_s08",
        "audioUrl": f"{CDN_BASE}/t4_p3_s08.mp3",
        "context": "Questions 53-55 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> This is Springfield Community Centre. How can I help you?<br/>"
                      "<b>M:</b> Hi. I'm with the local historical club. We're looking for a place for our monthly meetings.<br/>"
                      "<b>W:</b> Okay. We have a few rooms that community organisations can reserve. When are your meetings held?<br/>"
                      "<b>M:</b> The first Saturday of each month.<br/>"
                      "<b>W:</b> Oh, that's a very popular time. You'll have to reserve the space well in advance.<br/>"
                      "<b>M:</b> No problem. I'll do that. Also, I saw that you have a message board at the front of the building. Can groups use it to advertise their events?<br/>"
                      "<b>W:</b> Yes. Notices can be posted a week in advance.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_53",
                "number": 53,
                "text": "Why is the man calling the Springfield Community Center?",
                "options": {
                    "A": "He is looking for a backpack.",
                    "B": "He is researching a historical place.",
                    "C": "He is asking about a meeting space.",
                    "D": "He is interested in joining a club."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người đàn ông lại gọi đến Trung tâm Cộng đồng Springfield?<br/>(A) Anh ấy tìm một chiếc ba lô.<br/>(B) Anh ấy nghiên cứu một địa điểm lịch sử.<br/>(C) Anh ấy hỏi về không gian họp.<br/>(D) Anh ấy quan tâm đến việc tham gia câu lạc bộ.</p><p><b>Phân tích chi tiết:</b> Người đàn ông nói: <i>'We're looking for a place for our monthly meetings.'</i> (Chúng tôi đang tìm một nơi cho các cuộc họp hàng tháng). Chọn <b>(C) He is asking about a meeting space</b>.</p>",
                "questionType": "Purpose",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_54",
                "number": 54,
                "text": "What does the woman warn the man about?",
                "options": {
                    "A": "A busy time of the month",
                    "B": "An early store closing",
                    "C": "The cost of an event",
                    "D": "A missing document"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ cảnh báo người đàn ông về điều gì?<br/>(A) Khoảng thời gian bận rộn trong tháng.<br/>(B) Cửa hàng đóng cửa sớm.<br/>(C) Chi phí của một sự kiện.<br/>(D) Một tài liệu bị thất lạc.</p><p><b>Phân tích chi tiết:</b> Khi người đàn ông nói cuộc họp vào thứ Bảy đầu tiên của tháng, người phụ nữ cảnh báo: <i>'Oh, that's a very popular time. You'll have to reserve the space well in advance.'</i>. Chọn <b>(A) A busy time of the month</b>.</p>",
                "questionType": "Warning",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p3_55",
                "number": 55,
                "text": "What does the man ask about using?",
                "options": {
                    "A": "A library",
                    "B": "A message board",
                    "C": "A mobile phone",
                    "D": "A projector"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông hỏi về việc sử dụng cái gì?<br/>(A) Thư viện.<br/>(B) Bảng thông báo.<br/>(C) Điện thoại di động.<br/>(D) Máy chiếu.</p><p><b>Phân tích chi tiết:</b> Người đàn ông hỏi: <i>'I saw that you have a message board at the front of the building. Can groups use it to advertise their events?'</i>. Chọn <b>(B) A message board</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 9: Q56 - Q58
    {
        "id": "ets22_t4_p3_s09",
        "audioUrl": f"{CDN_BASE}/t4_p3_s09.mp3",
        "context": "Questions 56-58 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Hi. I'm calling because I'm redesigning a hotel lobby for a client, and I'd like the reception countertop to be made of stone.<br/>"
                      "<b>M:</b> We have slabs of granite and marble here in our showroom. You can stop by and choose the one you want.<br/>"
                      "<b>W:</b> Great. I'll be there this afternoon. Also, how long will it take before the countertop's installed?<br/>"
                      "<b>M:</b> For a basic rectangular shape, it takes a week to cut it to size, polish it, and install it. If you have the exact length and width, we can get started as soon as you make your selection.<br/>"
                      "<b>W:</b> I'll bring the dimensions.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_56",
                "number": 56,
                "text": "Who most likely is the woman?",
                "options": {
                    "A": "A cafeteria manager",
                    "B": "A hotel receptionist",
                    "C": "A laboratory technician",
                    "D": "An interior designer"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nhiều khả năng nhất là ai?<br/>(A) Quản lý căng tin.<br/>(B) Lễ tân khách sạn.<br/>(C) Kỹ thuật viên phòng thí nghiệm.<br/>(D) Nhà thiết kế nội thất.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ nói: <i>'I'm calling because I'm redesigning a hotel lobby for a client...'</i> (Tôi gọi vì tôi đang thiết kế lại sảnh khách sạn cho một khách hàng...). Do đó cô ấy là <b>(D) An interior designer</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_57",
                "number": 57,
                "text": "Why will the woman visit the man’s business this afternoon?",
                "options": {
                    "A": "To perform an inspection",
                    "B": "To select a product",
                    "C": "To learn a new skill",
                    "D": "To interview for a job"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người phụ nữ sẽ đến cơ sở kinh doanh của người đàn ông vào chiều nay?<br/>(A) Để thực hiện kiểm tra.<br/>(B) Để lựa chọn sản phẩm.<br/>(C) Để học một kỹ năng mới.<br/>(D) Để phỏng vấn xin việc.</p><p><b>Phân tích chi tiết:</b> Người đàn ông bảo: <i>'You can stop by and choose the one you want.'</i> và người phụ nữ đáp: <i>'Great. I'll be there this afternoon.'</i> (Tôi sẽ đến đó vào chiều nay để chọn đá granite/marble). Chọn <b>(B) To select a product</b>.</p>",
                "questionType": "Purpose",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_58",
                "number": 58,
                "text": "What does the man recommend that the woman bring?",
                "options": {
                    "A": "Some measurements",
                    "B": "Some photographs",
                    "C": "A handbook",
                    "D": "A business card"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông khuyên người phụ nữ nên mang theo cái gì?<br/>(A) Số đo/kích thước.<br/>(B) Một số bức ảnh.<br/>(C) Sổ tay hướng dẫn.<br/>(D) Danh thiếp.</p><p><b>Phân tích chi tiết:</b> Người đàn ông nói: <i>'If you have the exact length and width, we can get started...'</i> và người phụ nữ chốt: <i>'I'll bring the dimensions.'</i> (Kích thước = measurements). Chọn <b>(A) Some measurements</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 10: Q59 - Q61
    {
        "id": "ets22_t4_p3_s10",
        "audioUrl": f"{CDN_BASE}/t4_p3_s10.mp3",
        "context": "Questions 59-61 refer to the following conversation with three speakers.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W1:</b> Congratulations. As top employees at NGR Industries, you've been selected for our future leaders program. In this program, you'll be rotating through jobs in each division to learn everything about our company. Now, my colleague, Ms. Park, will continue.<br/>"
                      "<b>W2:</b> Thanks, Margaret. This rotational program is critical to becoming a successful manager here.<br/>"
                      "<b>M:</b> Oh, there's a question in the back. Yes, thank you, Ms. Park. I was wondering how long we'll spend in each department.<br/>"
                      "<b>W2:</b> You'll work in one department for about two months, and then move to another area. Preferences for first assignments will be taken into consideration. You may indicate your preference on the form in front of you.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_59",
                "number": 59,
                "text": "Who most likely are the program participants?",
                "options": {
                    "A": "Sales recruiters",
                    "B": "Prospective clients",
                    "C": "Building inspectors",
                    "D": "Management trainees"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người tham gia chương trình nhiều khả năng là ai nhất?<br/>(A) Nhà tuyển dụng bán hàng.<br/>(B) Khách hàng tiềm năng.<br/>(C) Thanh tra xây dựng.<br/>(D) Học viên quản trị tiềm năng (management trainees).</p><p><b>Phân tích chi tiết:</b> Người nói khen ngợi nhân viên xuất sắc được chọn vào <i>future leaders program</i> (chương trình lãnh đạo tương lai) và luân chuyển bộ phận để trở thành quản lý thành công. Chọn <b>(D) Management trainees</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_60",
                "number": 60,
                "text": "What does the man ask about?",
                "options": {
                    "A": "An office location",
                    "B": "A budget amount",
                    "C": "A length of time",
                    "D": "A list of attendees"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông hỏi về điều gì?<br/>(A) Địa điểm văn phòng.<br/>(B) Số tiền ngân sách.<br/>(C) Khoảng thời gian.<br/>(D) Danh sách người tham dự.</p><p><b>Phân tích chi tiết:</b> Người đàn ông hỏi: <i>'I was wondering how long we'll spend in each department.'</i> (Tôi băn khoăn không biết chúng tôi sẽ dành thời gian bao lâu ở mỗi phòng ban). Cụm <i>how long</i> chỉ khoảng thời gian <b>(C) A length of time</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p3_61",
                "number": 61,
                "text": "How should the participants communicate a request?",
                "options": {
                    "A": "By making a phone call",
                    "B": "By speaking with Ms. Park",
                    "C": "By sending an e-mail",
                    "D": "By filling out a form"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người tham gia nên truyền đạt nguyện vọng/yêu cầu bằng cách nào?<br/>(A) Gọi điện thoại.<br/>(B) Nói chuyện với cô Park.<br/>(C) Gửi email.<br/>(D) Điền vào một biểu mẫu.</p><p><b>Phân tích chi tiết:</b> Cô Park hướng dẫn: <i>'You may indicate your preference on the form in front of you.'</i> (Bạn có thể ghi nguyện vọng vào biểu mẫu trước mặt). Chọn <b>(D) By filling out a form</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 11: Q62 - Q64 (With Graphic: t4_p3_g01.jpg)
    {
        "id": "ets22_t4_p3_s11",
        "audioUrl": f"{CDN_BASE}/t4_p3_s11.mp3",
        "image": f"{CDN_BASE}/t4_p3_g01.jpg",
        "context": "Questions 62-64 refer to the following conversation and model list.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Welcome to Smith Sports Equipment and More. How may I help you?<br/>"
                      "<b>M:</b> Hi. My brother and I often go biking in the mountains, and I'd like to buy an exterior bike rack for my car.<br/>"
                      "<b>W:</b> I can help you with that. We have several sizes available. What carrying capacity do you need?<br/>"
                      "<b>M:</b> Something small. One that can carry up to two bikes, but no more. Here's a list of our models. We have just what you need.<br/>"
                      "<b>M:</b> Okay. Is it difficult to attach to the car? I hope it's not too complicated.<br/>"
                      "<b>W:</b> Don't worry. It comes with detailed step-by-step instructions to install it.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_62",
                "number": 62,
                "text": "What kind of products does the woman’s store sell?",
                "options": {
                    "A": "Kitchen appliances",
                    "B": "Sporting goods",
                    "C": "Luggage",
                    "D": "Bathroom furnishings"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Cửa hàng của người phụ nữ bán loại sản phẩm nào?<br/>(A) Thiết bị nhà bếp.<br/>(B) Đồ thể thao.<br/>(C) Hành lý, vali.<br/>(D) Nội thất phòng tắm.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ chào mừng: <i>'Welcome to Smith Sports Equipment and More.'</i> (Chào mừng quý khách đến với Thiết bị Thể thao Smith). Do đó cửa hàng bán <b>(B) Sporting goods</b>.</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_63",
                "number": 63,
                "text": "Look at the graphic. Which model will the man buy?",
                "options": {
                    "A": "Country",
                    "B": "Classic",
                    "C": "Premier",
                    "D": "Deluxe"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào biểu đồ. Người đàn ông sẽ mua mẫu nào?<br/>(A) Country.<br/>(B) Classic.<br/>(C) Premier.<br/>(D) Deluxe.</p><p><b>Phân tích chi tiết:</b> Người đàn ông nói: <i>'One that can carry up to two bikes, but no more.'</i> (Loại chở được tối đa 2 xe đạp, không nhiều hơn). Nhìn vào biểu đồ:<br/>- Country: 1<br/>- Classic: 1-2<br/>- Premier: 3-4<br/>- Deluxe: 5<br/>Do đó loại chở được tối đa 2 xe đạp chính là mẫu <b>Classic</b>. Chọn <b>(B) Classic</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Visual Link"
            },
            {
                "id": "ets22_t4_p3_64",
                "number": 64,
                "text": "What is the man concerned about?",
                "options": {
                    "A": "A price",
                    "B": "A warranty",
                    "C": "The installation",
                    "D": "The quality"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông lo lắng về điều gì?<br/>(A) Giá cả.<br/>(B) Bảo hành.<br/>(C) Việc lắp đặt.<br/>(D) Chất lượng.</p><p><b>Phân tích chi tiết:</b> Người đàn ông hỏi: <i>'Is it difficult to attach to the car? I hope it's not too complicated.'</i> (Gắn vào xe có khó không? Tôi hy vọng nó không quá phức tạp). Điều này thể hiện sự lo lắng về <b>(C) The installation</b> (việc lắp đặt).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 12: Q65 - Q67 (With Graphic: t4_p3_g02.jpg)
    {
        "id": "ets22_t4_p3_s12",
        "audioUrl": f"{CDN_BASE}/t4_p3_s12.mp3",
        "image": f"{CDN_BASE}/t4_p3_g02.jpg",
        "context": "Questions 65-67 refer to the following conversation and map.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Hello. This is Vogel's laundry service.<br/>"
                      "<b>W:</b> Hi. I'm calling from the Happy Stay Hotel on Forbes Avenue. We're looking for an outside service to wash the hotel's bedding and towels. And I've heard good things about you.<br/>"
                      "<b>M:</b> I'm glad to hear that. Our customers will tell you that we're very trustworthy. We're known for our reliable service.<br/>"
                      "<b>W:</b> So, what time would you be delivering our clean linens each day?<br/>"
                      "<b>M:</b> It depends on the location. If you take a look at the online delivery map, you'll see that you're in zone two.<br/>"
                      "<b>W:</b> Oh, I see it now. That would work. The housekeeping staff doesn't start until nine o'clock, so that gives us plenty of time.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_65",
                "number": 65,
                "text": "What type of business is the woman calling?",
                "options": {
                    "A": "A catering company",
                    "B": "A laundry service",
                    "C": "A flower shop",
                    "D": "A furniture store"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ đang gọi điện đến loại hình doanh nghiệp nào?<br/>(A) Công ty phục vụ ăn uống.<br/>(B) Dịch vụ giặt là.<br/>(C) Tiệm hoa.<br/>(D) Cửa hàng nội thất.</p><p><b>Phân tích chi tiết:</b> Người đàn ông nghe máy giới thiệu: <i>'Hello. This is Vogel's laundry service.'</i>. Người phụ nữ cũng nói cần tìm đơn vị giặt khăn và ga trải giường khách sạn. Chọn <b>(B) A laundry service</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t4_p3_66",
                "number": 66,
                "text": "What does the man say his company is known for?",
                "options": {
                    "A": "Its prices",
                    "B": "Its locations",
                    "C": "Its reliability",
                    "D": "Its products"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông nói công ty của anh ấy nổi tiếng về điều gì?<br/>(A) Giá cả.<br/>(B) Địa điểm.<br/>(C) Sự đáng tin cậy/uy tín.<br/>(D) Sản phẩm.</p><p><b>Phân tích chi tiết:</b> Người đàn ông khẳng định: <i>'Our customers will tell you that we're very trustworthy. We're known for our reliable service.'</i>. <i>Reliable service = reliability</i>. Chọn <b>(C) Its reliability</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p3_67",
                "number": 67,
                "text": "Look at the graphic. What time will the delivery be made?",
                "options": {
                    "A": "6:00 A.M.",
                    "B": "7:00 A.M.",
                    "C": "8:00 A.M.",
                    "D": "9:00 A.M."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào biểu đồ bản đồ. Giao hàng sẽ được thực hiện vào lúc mấy giờ?<br/>(A) 6:00 sáng.<br/>(B) 7:00 sáng.<br/>(C) 8:00 sáng.<br/>(D) 9:00 sáng.</p><p><b>Phân tích chi tiết:</b> Người đàn ông nói khách sạn nằm trong <b>Zone 2</b> (<i>you're in zone two</i>). Nhìn vào biểu đồ bản đồ giao hàng, Zone 2 tương ứng với khung giờ giao hàng lúc <b>7:00 A.M.</b>. Chọn <b>(B) 7:00 A.M.</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Visual Link"
            }
        ]
    },

    # Set 13: Q68 - Q70 (With Graphic: t4_p3_g03.jpg)
    {
        "id": "ets22_t4_p3_s13",
        "audioUrl": f"{CDN_BASE}/t4_p3_s13.mp3",
        "image": f"{CDN_BASE}/t4_p3_g03.jpg",
        "context": "Questions 68-70 refer to the following conversation and schedule.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Hello, Midtown Health Clinic.<br/>"
                      "<b>M:</b> Hi. I have an appointment scheduled with Dr. Miller for two o'clock on Wednesday, but I need to change it. I have an important client meeting I need to attend.<br/>"
                      "<b>W:</b> Okay. What time would you be able to come in?<br/>"
                      "<b>M:</b> Well, I get out of work at five o'clock, so any time after that is fine.<br/>"
                      "<b>W:</b> Dr. Miller doesn't have anything past four o'clock this week, but there's an opening at five thirty on Friday with a different doctor.<br/>"
                      "<b>M:</b> Okay, that's fine.<br/>"
                      "<b>W:</b> Great. Let me ask you a few questions to be sure that none of your information has changed.</p>",
        "questions": [
            {
                "id": "ets22_t4_p3_68",
                "number": 68,
                "text": "Why does the man want to change an appointment?",
                "options": {
                    "A": "His car broke down.",
                    "B": "He has to attend a meeting.",
                    "C": "He has a family event.",
                    "D": "He has to wait for a delivery."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người đàn ông muốn đổi lịch hẹn?<br/>(A) Xe của anh ấy bị hỏng.<br/>(B) Anh ấy phải tham dự một cuộc họp.<br/>(C) Anh ấy có việc gia đình.<br/>(D) Anh ấy phải đợi nhận hàng.</p><p><b>Phân tích chi tiết:</b> Người đàn ông giải thích: <i>'I have an important client meeting I need to attend.'</i> (Tôi có một cuộc họp khách hàng quan trọng cần tham dự). Chọn <b>(B) He has to attend a meeting</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t4_p3_69",
                "number": 69,
                "text": "Look at the graphic. Who will the man see on Friday?",
                "options": {
                    "A": "Dr. Fontana",
                    "B": "Dr. Miller",
                    "C": "Dr. Smith",
                    "D": "Dr. Yang"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào biểu đồ. Người đàn ông sẽ khám với ai vào thứ Sáu?<br/>(A) Bác sĩ Fontana.<br/>(B) Bác sĩ Miller.<br/>(C) Bác sĩ Smith.<br/>(D) Bác sĩ Yang.</p><p><b>Phân tích chi tiết:</b> Người đàn ông có lịch hẹn lúc <b>5:30 chiều thứ Sáu</b> (<i>opening at five thirty on Friday</i>). Tra biểu đồ lịch làm việc của các bác sĩ:<br/>- Dr. Fontana: 8:00 AM - 5:00 PM<br/>- Dr. Miller: 10:00 AM - 4:00 PM<br/>- Dr. Smith: 10:00 AM - 6:00 PM<br/>- Dr. Yang: 8:00 AM - 3:00 PM<br/>Chỉ có <b>Dr. Smith</b> làm việc đến 6:00 PM và có thể khám lúc 5:30 PM. Chọn <b>(C) Dr. Smith</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Visual Link"
            },
            {
                "id": "ets22_t4_p3_70",
                "number": 70,
                "text": "What will the man most likely do next?",
                "options": {
                    "A": "Answer some questions",
                    "B": "Visit a Web site",
                    "C": "Make a payment",
                    "D": "Drive to an office"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông nhiều khả năng sẽ làm gì tiếp theo?<br/>(A) Trả lời một số câu hỏi.<br/>(B) Truy cập trang web.<br/>(C) Thanh toán tiền.<br/>(D) Lái xe đến văn phòng.</p><p><b>Phân tích chi tiết:</b> Người phụ nữ nói ở cuối hội thoại: <i>'Let me ask you a few questions to be sure that none of your information has changed.'</i> (Để tôi hỏi anh vài câu hỏi để đảm bảo không có thông tin nào bị thay đổi). Do đó người đàn ông sẽ <b>(A) Answer some questions</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    }
]

with open("public/data/ets2022/test4/part3.json", "w", encoding="utf-8") as f:
    json.dump(part3_data, f, ensure_ascii=False, indent=2)

print("Generated public/data/ets2022/test4/part3.json successfully with", len(part3_data), "sets and", sum(len(s["questions"]) for s in part3_data), "questions.")
