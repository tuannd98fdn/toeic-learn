import json
import os

CDN_BASE = "https://github.com/tuannd98fdn/toeic-learn/releases/download/ets2022-assets"

part3_data = [
    # Set 1: Q32 - Q34
    {
        "id": "ets22_t5_p3_s01",
        "audioUrl": f"{CDN_BASE}/t5_p3_s01.mp3",
        "context": "Questions 32-34 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Hi. Welcome to Gonzalez and Partners.<br/>"
                      "<b>M:</b> Hi, I'm from Federal Portraits. I'm here to take the staff photos for the firm's website.<br/>"
                      "<b>W:</b> Oh, great. We've reserved a conference room down the hall for the photo shoot.<br/>"
                      "<b>M:</b> Thank you. There's just one thing. I have some heavy lighting equipment to bring in from my truck, and the only free parking space was several rows back. Do you have a cart I can use or...<br/>"
                      "<b>W:</b> I don't. But take this parking pass. You can use it to park in the VIP spot right by the front door.<br/>"
                      "<b>M:</b> Thanks. I'll do that now.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_32",
                "number": 32,
                "text": "Who most likely is the man?",
                "options": {
                    "A": "A photographer",
                    "B": "A journalist",
                    "C": "A florist",
                    "D": "A caterer"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông nhiều khả năng là ai?<br/>(A) Một nhiếp ảnh gia (A photographer).<br/>(B) Một nhà báo.<br/>(C) Người bán hoa.<br/>(D) Người phục vụ tiệc.</p><p><b>Phân tích:</b> Người đàn ông giới thiệu: <i>'I'm from Federal Portraits. I'm here to take the staff photos for the firm's website.'</i> (Tôi đến để chụp ảnh nhân viên cho trang web công ty). Do đó anh ấy là một nhiếp ảnh gia.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t5_p3_33",
                "number": 33,
                "text": "What is the man concerned about?",
                "options": {
                    "A": "Contacting his assistant",
                    "B": "Locating a conference room",
                    "C": "Moving some equipment",
                    "D": "Printing a document"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông lo lắng về điều gì?<br/>(A) Liên lạc với trợ lý.<br/>(B) Định vị phòng hội nghị.<br/>(C) Di chuyển một số thiết bị (Moving some equipment).<br/>(D) In ấn một tài liệu.</p><p><b>Phân tích:</b> Người đàn ông chia sẻ: <i>'I have some heavy lighting equipment to bring in from my truck, and the only free parking space was several rows back.'</i> (Tôi có một số thiết bị chiếu sáng nặng cần mang vào từ xe tải nhưng chỗ đỗ xe lại ở xa). Do đó anh ấy lo về việc vận chuyển thiết bị.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_34",
                "number": 34,
                "text": "What does the woman give the man?",
                "options": {
                    "A": "Some keys",
                    "B": "A parking pass",
                    "C": "A mobile phone charger",
                    "D": "A cart"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ đưa cho người đàn ông thứ gì?<br/>(A) Một vài chiếc chìa khóa.<br/>(B) Thẻ đỗ xe (A parking pass).<br/>(C) Sạc điện thoại di động.<br/>(D) Một chiếc xe đẩy.</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'take this parking pass. You can use it to park in the VIP spot right by the front door.'</i> (hãy cầm lấy thẻ đỗ xe này để đỗ ở chỗ VIP ngay trước cửa chính).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 2: Q35 - Q37
    {
        "id": "ets22_t5_p3_s02",
        "audioUrl": f"{CDN_BASE}/t5_p3_s02.mp3",
        "context": "Questions 35-37 refer to the following conversation with three speakers.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Hi, Barbara and Nancy. Now that our design's been selected for the new parking area at the airport, we can move forward to the next step. Barbara, do you have any updates?<br/>"
                      "<b>W1:</b> Yes. So now we need to consider residents in the surrounding neighborhoods, a preliminary survey showed their biggest concern is the potential increase in traffic.<br/>"
                      "<b>M:</b> Nancy, do we have a meeting set up at City Hall for residents to discuss those concerns with us?<br/>"
                      "<b>W2:</b> Yes. On October 2nd, but in a new location, the room at City Hall was too small for this purpose, so it'll be held at the high school auditorium instead.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_35",
                "number": 35,
                "text": "What will be constructed at an airport?",
                "options": {
                    "A": "A runway",
                    "B": "A parking area",
                    "C": "A storage facility",
                    "D": "A fueling station"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Công trình gì sẽ được xây dựng tại sân bay?<br/>(A) Đường băng.<br/>(B) Bãi đỗ xe (A parking area).<br/>(C) Cơ sở kho bãi.<br/>(D) Trạm tiếp nhiên liệu.</p><p><b>Phân tích:</b> Người đàn ông nói: <i>'Now that our design's been selected for the new parking area at the airport...'</i> (Bản thiết kế bãi đỗ xe mới tại sân bay của chúng ta đã được chọn). Chọn <b>(B)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_36",
                "number": 36,
                "text": "What is the residents’ biggest concern?",
                "options": {
                    "A": "Money",
                    "B": "Safety",
                    "C": "Noise",
                    "D": "Traffic"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Mối bận tâm lớn nhất của cư dân là gì?<br/>(A) Tiền bạc.<br/>(B) Sự an toàn.<br/>(C) Tiếng ồn.<br/>(D) Giao thông (Traffic).</p><p><b>Phân tích:</b> Barbara (W1) báo cáo: <i>'a preliminary survey showed their biggest concern is the potential increase in traffic.'</i> (khảo sát sơ bộ cho thấy mối bận tâm lớn nhất của họ là khả năng gia tăng lưu lượng giao thông).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_37",
                "number": 37,
                "text": "Why has a new meeting location been chosen?",
                "options": {
                    "A": "It is available on the weekend.",
                    "B": "It is closer to public transportation.",
                    "C": "It provides more space.",
                    "D": "It costs less to rent."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao địa điểm họp mới lại được lựa chọn?<br/>(A) Nó có sẵn vào cuối tuần.<br/>(B) Nó gần phương tiện giao thông công cộng hơn.<br/>(C) Nó cung cấp nhiều không gian hơn (It provides more space).<br/>(D) Chi phí thuê rẻ hơn.</p><p><b>Phân tích:</b> Nancy (W2) giải thích: <i>'the room at City Hall was too small for this purpose, so it'll be held at the high school auditorium instead.'</i> Phòng ở Tòa thị chính quá nhỏ nên chuyển sang giảng đường trường trung học để có nhiều chỗ rộng hơn.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 3: Q38 - Q40
    {
        "id": "ets22_t5_p3_s03",
        "audioUrl": f"{CDN_BASE}/t5_p3_s03.mp3",
        "context": "Questions 38-40 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Thanks for coming to see me, Helen. How are things going in your new position?<br/>"
                      "<b>W:</b> Great, Taro. Thanks for asking. The management training that human resources provided was very helpful.<br/>"
                      "<b>M:</b> Good. Since you're now part of the management team, I requested a corporate credit card for you. It just came in. Here it is.<br/>"
                      "<b>W:</b> Thanks. I should use this for small day-to-day expenses in my department, like office supplies, right?<br/>"
                      "<b>M:</b> Correct. By the way, for bigger expenses, like when you're traveling to a conference, you'll need to fill out an expense form when you return, so it's a good idea to save all your receipts.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_38",
                "number": 38,
                "text": "Who most likely is the woman?",
                "options": {
                    "A": "An event organizer",
                    "B": "A marketing consultant",
                    "C": "A department manager",
                    "D": "A travel agent"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nhiều khả năng là ai?<br/>(A) Người tổ chức sự kiện.<br/>(B) Chuyên viên tư vấn tiếp thị.<br/>(C) Trưởng phòng / Quản lý bộ phận (A department manager).<br/>(D) Đại lý du lịch.</p><p><b>Phân tích:</b> Taro nói: <i>'Since you're now part of the management team...'</i> và người phụ nữ hỏi về chi phí <i>'in my department'</i>. Do đó cô ấy là quản lý bộ phận mới được bổ nhiệm.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t5_p3_39",
                "number": 39,
                "text": "What did the man order for the woman?",
                "options": {
                    "A": "A computer tablet",
                    "B": "A credit card",
                    "C": "Some furniture",
                    "D": "Some office supplies"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông đã yêu cầu/đặt làm thứ gì cho người phụ nữ?<br/>(A) Máy tính bảng.<br/>(B) Thẻ tín dụng (A credit card).<br/>(C) Đồ nội thất.<br/>(D) Đồ dùng văn phòng phẩm.</p><p><b>Phân tích:</b> Người đàn ông nói: <i>'I requested a corporate credit card for you. It just came in. Here it is.'</i> (Tôi đã yêu cầu một chiếc thẻ tín dụng công ty cho bạn).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_40",
                "number": 40,
                "text": "What does the man suggest the woman do?",
                "options": {
                    "A": "Save receipts",
                    "B": "Return a handbook",
                    "C": "E-mail a client",
                    "D": "Consult with a supervisor"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông gợi ý người phụ nữ làm gì?<br/>(A) Lưu lại các biên lai (Save receipts).<br/>(B) Trả lại cuốn cẩm nang.<br/>(C) Gửi email cho khách hàng.<br/>(D) Tham khảo ý kiến người giám sát.</p><p><b>Phân tích:</b> Người đàn ông khuyên: <i>'so it's a good idea to save all your receipts.'</i> (do đó bạn nên giữ lại tất cả các hóa đơn/biên lai).</p>",
                "questionType": "Suggestion",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 4: Q41 - Q43
    {
        "id": "ets22_t5_p3_s04",
        "audioUrl": f"{CDN_BASE}/t5_p3_s04.mp3",
        "context": "Questions 41-43 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Hey, Martina. I'm going to a conference in Los Angeles next week.<br/>"
                      "<b>W:</b> Oh, that's where I'm from.<br/>"
                      "<b>M:</b> That's why I mentioned it. I'll probably be too busy with the conference to see any sites, but at least I can eat some good food while I'm there. I was hoping you could recommend some restaurants to try.<br/>"
                      "<b>W:</b> Of course. Do you know where your hotel is located? That way I can recommend places that are nearby.<br/>"
                      "<b>M:</b> I don't remember, but the address must be in the confirmation email from the hotel. Let me pull it up right now.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_41",
                "number": 41,
                "text": "What will the man do next week?",
                "options": {
                    "A": "Meet with some customers",
                    "B": "Attend a conference",
                    "C": "Go on vacation",
                    "D": "Move to another city"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông sẽ làm gì vào tuần tới?<br/>(A) Gặp gỡ một số khách hàng.<br/>(B) Tham dự một hội nghị (Attend a conference).<br/>(C) Đi nghỉ mát.<br/>(D) Chuyển đến một thành phố khác.</p><p><b>Phân tích:</b> Người đàn ông mở đầu cuộc đối thoại: <i>'I'm going to a conference in Los Angeles next week.'</i> (Tuần tới tôi sẽ đi dự một hội nghị ở Los Angeles).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_42",
                "number": 42,
                "text": "What does the man want the woman to recommend?",
                "options": {
                    "A": "City tours",
                    "B": "Transportation services",
                    "C": "Hotels",
                    "D": "Restaurants"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông muốn người phụ nữ gợi ý điều gì?<br/>(A) Các chuyến tham quan thành phố.<br/>(B) Dịch vụ vận tải.<br/>(C) Khách sạn.<br/>(D) Các nhà hàng ăn uống (Restaurants).</p><p><b>Phân tích:</b> Người đàn ông nói: <i>'I was hoping you could recommend some restaurants to try.'</i> (Tôi hy vọng bạn có thể gợi ý cho tôi vài nhà hàng để trải nghiệm).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_43",
                "number": 43,
                "text": "What does the man say he will do next?",
                "options": {
                    "A": "Look up an address",
                    "B": "Check a bus route",
                    "C": "Pack some equipment",
                    "D": "Activate a credit card"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông nói anh ấy sẽ làm gì tiếp theo?<br/>(A) Tra cứu địa chỉ (Look up an address).<br/>(B) Kiểm tra lộ trình xe buýt.<br/>(C) Đóng gói thiết bị.<br/>(D) Kích hoạt thẻ tín dụng.</p><p><b>Phân tích:</b> Khi được hỏi khách sạn ở đâu, người đàn ông nói: <i>'the address must be in the confirmation email from the hotel. Let me pull it up right now.'</i> (địa chỉ chắc chắn có trong email xác nhận, để tôi mở ra xem ngay bây giờ).</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 5: Q44 - Q46
    {
        "id": "ets22_t5_p3_s05",
        "audioUrl": f"{CDN_BASE}/t5_p3_s05.mp3",
        "context": "Questions 44-46 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> I wanted to talk about the results from the online customer questionnaires we sent out last week. I know you've been exceptionally busy, Mario, but have you had a chance to look at the data?<br/>"
                      "<b>M:</b> Yes. In fact, I just finished the report. I'll present it to the sales department later today.<br/>"
                      "<b>W:</b> Already? Fantastic. Did you want me to look it over before the meeting?<br/>"
                      "<b>M:</b> The report's only half a page long.<br/>"
                      "<b>W:</b> Ah, okay. Oh, I wanted to remind you to book us a table at your cousin's restaurant. The sales team wants to go there after the meeting tomorrow.<br/>"
                      "<b>M:</b> Sure. I'll do that now.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_44",
                "number": 44,
                "text": "What does the woman want to discuss?",
                "options": {
                    "A": "Job candidates",
                    "B": "Vendor selections",
                    "C": "Customer survey results",
                    "D": "Computer system updates"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ muốn thảo luận về điều gì?<br/>(A) Các ứng viên xin việc.<br/>(B) Lựa chọn nhà cung cấp.<br/>(C) Kết quả khảo sát khách hàng (Customer survey results).<br/>(D) Cập nhật hệ thống máy tính.</p><p><b>Phân tích:</b> Người phụ nữ nói câu đầu tiên: <i>'I wanted to talk about the results from the online customer questionnaires we sent out last week.'</i> (Tôi muốn nói về kết quả khảo sát bảng hỏi trực tuyến từ khách hàng).</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t5_p3_45",
                "number": 45,
                "text": "Why does the man say, “The report’s only half a page long”?",
                "options": {
                    "A": "To confirm some details",
                    "B": "To express disappointment",
                    "C": "To ask for another assignment",
                    "D": "To refuse an offer"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người đàn ông lại nói: 'Báo cáo chỉ dài nửa trang'?<br/>(A) Để xác nhận một số chi tiết.<br/>(B) Để bày tỏ sự thất vọng.<br/>(C) Để xin một nhiệm vụ khác.<br/>(D) Để từ chối một lời đề nghị (To refuse an offer).</p><p><b>Phân tích:</b> Người phụ nữ đề nghị xem qua báo cáo giúp anh ấy (<i>'Did you want me to look it over before the meeting?'</i>). Người đàn ông đáp báo cáo chỉ có nửa trang, ngụ ý rất ngắn và đơn giản nên không cần cô xem giúp, tức là từ chối lời đề nghị giúp đỡ.</p>",
                "questionType": "Inference / Speaker Meaning",
                "subCategory": "Inference"
            },
            {
                "id": "ets22_t5_p3_46",
                "number": 46,
                "text": "What does the woman remind the man about?",
                "options": {
                    "A": "Checking a social media account",
                    "B": "Unpacking some equipment",
                    "C": "Making a reservation",
                    "D": "Going to a print shop"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nhắc nhở người đàn ông về việc gì?<br/>(A) Kiểm tra tài khoản mạng xã hội.<br/>(B) Mở kiện thiết bị.<br/>(C) Đặt bàn trước (Making a reservation).<br/>(D) Đi tới tiệm in.</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'I wanted to remind you to book us a table at your cousin's restaurant.'</i> (Tôi muốn nhắc bạn đặt bàn ở nhà hàng của anh họ bạn).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 6: Q47 - Q49
    {
        "id": "ets22_t5_p3_s06",
        "audioUrl": f"{CDN_BASE}/t5_p3_s06.mp3",
        "context": "Questions 47-49 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Mount Elephant, Department of Parks and Recreation, how can I help you?<br/>"
                      "<b>W:</b> Hello. I read about your tree planting initiative, and I wanted to learn more about it.<br/>"
                      "<b>M:</b> Sure. Our department is now offering residents the opportunity to have a tree planted on their street in honor of someone special. It's part of our city's new beautification project.<br/>"
                      "<b>W:</b> That's great. How can I make a request to do this?<br/>"
                      "<b>M:</b> You'll need to fill out an online request form from our website. After you put in all your information and submit the form, you'll receive weekly email updates.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_47",
                "number": 47,
                "text": "What city department does the man work in?",
                "options": {
                    "A": "Parks and Recreation",
                    "B": "Water Management",
                    "C": "Transportation",
                    "D": "Education"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông làm việc ở phòng ban nào của thành phố?<br/>(A) Công viên và Giải trí (Parks and Recreation).<br/>(B) Quản lý Nước.<br/>(C) Giao thông vận tải.<br/>(D) Giáo dục.</p><p><b>Phân tích:</b> Người đàn ông chào điện thoại: <i>'Mount Elephant, Department of Parks and Recreation, how can I help you?'</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t5_p3_48",
                "number": 48,
                "text": "Why is the woman calling?",
                "options": {
                    "A": "To report a fallen tree",
                    "B": "To ask about city-job openings",
                    "C": "To find out the cost of a project",
                    "D": "To inquire about a tree planting program"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người phụ nữ lại gọi điện?<br/>(A) Để báo cáo về một cái cây bị đổ.<br/>(B) Để hỏi về cơ hội việc làm của thành phố.<br/>(C) Để tìm hiểu chi phí của một dự án.<br/>(D) Để hỏi về chương trình trồng cây (To inquire about a tree planting program).</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'I read about your tree planting initiative, and I wanted to learn more about it.'</i> (Tôi đã đọc về sáng kiến trồng cây và muốn tìm hiểu thêm về nó).</p>",
                "questionType": "Purpose",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t5_p3_49",
                "number": 49,
                "text": "What does the man tell the woman to do?",
                "options": {
                    "A": "Review a policy",
                    "B": "Make an appointment",
                    "C": "Complete an online form",
                    "D": "Contact a different office"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông bảo người phụ nữ làm gì?<br/>(A) Xem lại một chính sách.<br/>(B) Đặt một cuộc hẹn.<br/>(C) Điền vào biểu mẫu trực tuyến (Complete an online form).<br/>(D) Liên hệ với một văn phòng khác.</p><p><b>Phân tích:</b> Người đàn ông hướng dẫn: <i>'You'll need to fill out an online request form from our website.'</i> (Bạn sẽ cần điền vào mẫu đơn yêu cầu trực tuyến trên trang web của chúng tôi).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 7: Q50 - Q52
    {
        "id": "ets22_t5_p3_s07",
        "audioUrl": f"{CDN_BASE}/t5_p3_s07.mp3",
        "context": "Questions 50-52 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Rohan, I have a question about the production of our new model KT-17 wireless headphones. I just reviewed the quarterly sales report. They're selling even better than we expected.<br/>"
                      "<b>M:</b> Yeah. I've heard consumer demand is increasing for those.<br/>"
                      "<b>W:</b> That's what I wanted to discuss. Do you think we'll need to hire some temporary workers for the factory floor? I'm concerned that we won't be able to keep up with the demand over the holidays.<br/>"
                      "<b>M:</b> We do have a lot of existing inventory ready to ship, so we may not need to hire more people. I'll get an exact count of how many KT-17 headphones are available for shipment and let you know this afternoon.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_50",
                "number": 50,
                "text": "What did the woman recently review?",
                "options": {
                    "A": "A sales report",
                    "B": "An assembly line",
                    "C": "Some online brochures",
                    "D": "Some assembly directions"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ gần đây đã xem xét thứ gì?<br/>(A) Báo cáo bán hàng (A sales report).<br/>(B) Dây chuyền lắp ráp.<br/>(C) Một số tờ rơi trực tuyến.<br/>(D) Hướng dẫn lắp ráp.</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'I just reviewed the quarterly sales report.'</i> (Tôi vừa xem qua báo cáo bán hàng theo quý).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_51",
                "number": 51,
                "text": "What does the woman ask the man about?",
                "options": {
                    "A": "Packaging additional shipments",
                    "B": "Hiring temporary employees",
                    "C": "Changing a deadline",
                    "D": "Sending a press release"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ hỏi người đàn ông về điều gì?<br/>(A) Đóng gói thêm các lô hàng.<br/>(B) Tuyển dụng nhân viên tạm thời (Hiring temporary employees).<br/>(C) Thay đổi thời hạn.<br/>(D) Gửi thông cáo báo chí.</p><p><b>Phân tích:</b> Người phụ nữ hỏi: <i>'Do you think we'll need to hire some temporary workers for the factory floor?'</i> (Anh có nghĩ chúng ta sẽ cần thuê thêm công nhân thời vụ cho sàn nhà máy không?).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_52",
                "number": 52,
                "text": "What information will the man provide this afternoon?",
                "options": {
                    "A": "Overtime schedules",
                    "B": "Design improvements",
                    "C": "Production costs",
                    "D": "Inventory status"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông sẽ cung cấp thông tin gì vào chiều nay?<br/>(A) Lịch làm thêm giờ.<br/>(B) Cải tiến thiết kế.<br/>(C) Chi phí sản xuất.<br/>(D) Tình trạng hàng tồn kho (Inventory status).</p><p><b>Phân tích:</b> Người đàn ông hứa: <i>'I'll get an exact count of how many KT-17 headphones are available for shipment and let you know this afternoon.'</i> (Tôi sẽ kiểm đếm chính xác số tai nghe có sẵn sàng để giao và báo cho bạn chiều nay = tình trạng hàng trong kho / inventory status).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 8: Q53 - Q55
    {
        "id": "ets22_t5_p3_s08",
        "audioUrl": f"{CDN_BASE}/t5_p3_s08.mp3",
        "context": "Questions 53-55 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Ms. Chaudhry, I'm glad I caught you before you left for the day. About our meeting tomorrow...<br/>"
                      "<b>W:</b> Yes, it's in the afternoon, right? We have to go over your designs for the new advertising campaign for Softwell Shoes.<br/>"
                      "<b>M:</b> I'm sorry, but unfortunately I need to reschedule. I forgot that I have a doctor's appointment. Since we're presenting our ideas to the Softwell representative next week, we should discuss them soon. Are you free in the morning instead? At 10 o'clock?<br/>"
                      "<b>W:</b> Yes, that works. Okay, great. Oh, and could you post the images in the shared folder? I'd like to look at them in advance.<br/>"
                      "<b>M:</b> Sure, I'll take care of that now.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_53",
                "number": 53,
                "text": "What project are the speakers working on?",
                "options": {
                    "A": "A news article",
                    "B": "A training session",
                    "C": "An advertising campaign",
                    "D": "A research experiment"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói đang làm việc cho dự án nào?<br/>(A) Một bài báo.<br/>(B) Một buổi đào tạo.<br/>(C) Một chiến dịch quảng cáo (An advertising campaign).<br/>(D) Một thí nghiệm nghiên cứu.</p><p><b>Phân tích:</b> Người phụ nữ nhắc: <i>'We have to go over your designs for the new advertising campaign for Softwell Shoes.'</i> (Chúng ta phải xem qua các thiết kế của bạn cho chiến dịch quảng cáo mới của Softwell Shoes).</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t5_p3_54",
                "number": 54,
                "text": "What problem does the man mention?",
                "options": {
                    "A": "He has a scheduling conflict.",
                    "B": "He missed a presentation.",
                    "C": "Some data is unavailable.",
                    "D": "There are errors in a report."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông đề cập đến vấn đề gì?<br/>(A) Anh ấy bị trùng lịch (He has a scheduling conflict).<br/>(B) Anh ấy đã bỏ lỡ buổi thuyết trình.<br/>(C) Một số dữ liệu không có sẵn.<br/>(D) Có lỗi trong báo cáo.</p><p><b>Phân tích:</b> Người đàn ông giải thích: <i>'unfortunately I need to reschedule. I forgot that I have a doctor's appointment.'</i> (Tôi cần đổi lịch vì quên mất mình có cuộc hẹn với bác sĩ = xung đột lịch trình).</p>",
                "questionType": "Problem",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_55",
                "number": 55,
                "text": "What will the man do next?",
                "options": {
                    "A": "Make a phone call",
                    "B": "Share some images",
                    "C": "Change a password",
                    "D": "Edit a document"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông sẽ làm gì tiếp theo?<br/>(A) Gọi điện thoại.<br/>(B) Chia sẻ một số hình ảnh (Share some images).<br/>(C) Đổi mật khẩu.<br/>(D) Chỉnh sửa tài liệu.</p><p><b>Phân tích:</b> Người phụ nữ nhờ: <i>'could you post the images in the shared folder?'</i> và người đàn ông đáp: <i>'Sure, I'll take care of that now.'</i> (Tôi sẽ xử lý việc đó ngay bây giờ = tải hình ảnh lên thư mục chia sẻ).</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 9: Q56 - Q58
    {
        "id": "ets22_t5_p3_s09",
        "audioUrl": f"{CDN_BASE}/t5_p3_s09.mp3",
        "context": "Questions 56-58 refer to the following conversation with three speakers.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Welcome, everyone, to your second day of training to be an industrial fabric worker. You did a great job running the sewing machines yesterday. Before we get started, do you have any questions?<br/>"
                      "<b>M1:</b> This isn't about the training, but this morning, my security badge didn't work. The guard had to let me into the factory.<br/>"
                      "<b>W:</b> Okay, I'll follow up with you about that later. Any other questions?<br/>"
                      "<b>M2:</b> Ms. Park, yesterday you showed us how to make a castle knot on the machine. Could we practice that?<br/>"
                      "<b>W:</b> Of course, let's practice that knot. It's essential to sewing almost all shirts. Turn on your sewing machines.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_56",
                "number": 56,
                "text": "Where does the conversation most likely take place?",
                "options": {
                    "A": "At a hotel",
                    "B": "At a flower farm",
                    "C": "At a clothing factory",
                    "D": "At a ferry station"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Cuộc trò chuyện nhiều khả năng diễn ra ở đâu?<br/>(A) Tại khách sạn.<br/>(B) Tại trang trại hoa.<br/>(C) Tại nhà máy sản xuất quần áo / may mặc (At a clothing factory).<br/>(D) Tại bến phà.</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'training to be an industrial fabric worker... running the sewing machines... let me into the factory... essential to sewing almost all shirts.'</i> Bối cảnh là nhà máy may mặc.</p>",
                "questionType": "Location",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t5_p3_57",
                "number": 57,
                "text": "What did the man have a problem with this morning?",
                "options": {
                    "A": "An identification badge",
                    "B": "A parking pass",
                    "C": "A time card",
                    "D": "A uniform"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông gặp sự cố với thứ gì sáng nay?<br/>(A) Thẻ nhận dạng / thẻ an ninh (An identification badge).<br/>(B) Thẻ đỗ xe.<br/>(C) Thẻ chấm công.<br/>(D) Đồng phục.</p><p><b>Phân tích:</b> Người đàn ông (M1) nói: <i>'this morning, my security badge didn't work. The guard had to let me into the factory.'</i> (thẻ an ninh của tôi không hoạt động = identification badge).</p>",
                "questionType": "Problem",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_58",
                "number": 58,
                "text": "What will the speakers most likely do next?",
                "options": {
                    "A": "Fill out some forms",
                    "B": "Tour a facility",
                    "C": "Watch a video",
                    "D": "Practice a skill"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói nhiều khả năng sẽ làm gì tiếp theo?<br/>(A) Điền vào một số biểu mẫu.<br/>(B) Tham quan cơ sở.<br/>(C) Xem video.<br/>(D) Thực hành một kỹ năng (Practice a skill).</p><p><b>Phân tích:</b> Người nói M2 xin thực hành thắt nút may (<i>'Could we practice that?'</i>) và người hướng dẫn đồng ý: <i>'Of course, let's practice that knot... Turn on your sewing machines.'</i> (bật máy may lên và thực hành kỹ năng).</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 10: Q59 - Q61
    {
        "id": "ets22_t5_p3_s10",
        "audioUrl": f"{CDN_BASE}/t5_p3_s10.mp3",
        "context": "Questions 59-61 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Hi, Dolores. I know we were supposed to review applications for a medical assistant today, but I'm still working on my presentation for the International Surgeons Conference next week.<br/>"
                      "<b>W:</b> No problem. I've presented at that conference before. You'll need to be prepared.<br/>"
                      "<b>M:</b> So, should we reschedule for next week?<br/>"
                      "<b>W:</b> Actually, why don't we just postpone hiring someone until next month?<br/>"
                      "<b>M:</b> That would work better for me, but don't we need someone sooner?<br/>"
                      "<b>W:</b> No. Jerome just told me he could stay until we find his replacement.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_59",
                "number": 59,
                "text": "What field do the speakers most likely work in?",
                "options": {
                    "A": "Education",
                    "B": "Finance",
                    "C": "Law",
                    "D": "Medicine"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói nhiều khả năng làm việc trong lĩnh vực nào?<br/>(A) Giáo dục.<br/>(B) Tài chính.<br/>(C) Luật pháp.<br/>(D) Y học (Medicine).</p><p><b>Phân tích:</b> Cuộc hội thoại nhắc tới việc tuyển <i>'medical assistant'</i> (trợ lý y tế) và bài thuyết trình tại <i>'International Surgeons Conference'</i> (Hội nghị Bác sĩ Phẫu thuật Quốc tế). Do đó họ làm việc trong ngành y tế.</p>",
                "questionType": "Field",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t5_p3_60",
                "number": 60,
                "text": "What does the woman mean when she says, “I’ve presented at that conference before”?",
                "options": {
                    "A": "She has a lot of professional experience.",
                    "B": "She dislikes giving presentations.",
                    "C": "She understands the man’s situation.",
                    "D": "She has completed a requirement."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ có ý gì khi nói 'Tôi đã từng thuyết trình ở hội nghị đó trước đây'?<br/>(A) Cô ấy có nhiều kinh nghiệm chuyên môn.<br/>(B) Cô ấy không thích thuyết trình.<br/>(C) Cô ấy thấu hiểu hoàn cảnh của người đàn ông (She understands the man’s situation).<br/>(D) Cô ấy đã hoàn thành một yêu cầu.</p><p><b>Phân tích:</b> Người đàn ông xin hoãn duyệt hồ sơ vì bận chuẩn bị bài phát biểu, người phụ nữ thông cảm đáp: 'Tôi từng thuyết trình ở đó rồi nên tôi hiểu bạn cần phải chuẩn bị kỹ càng'. Cô ấy hoàn toàn thấu hiểu và đồng cảm với sự bận rộn của đồng nghiệp.</p>",
                "questionType": "Speaker Meaning",
                "subCategory": "Inference"
            },
            {
                "id": "ets22_t5_p3_61",
                "number": 61,
                "text": "What do the speakers agree to do?",
                "options": {
                    "A": "Temporarily close an office",
                    "B": "Postpone hiring an employee",
                    "C": "Work on a presentation together",
                    "D": "Contact some clients"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói đồng ý làm gì?<br/>(A) Tạm thời đóng cửa một văn phòng.<br/>(B) Hoãn việc tuyển dụng nhân viên (Postpone hiring an employee).<br/>(C) Cùng nhau làm bài thuyết trình.<br/>(D) Liên hệ với một số khách hàng.</p><p><b>Phân tích:</b> Người phụ nữ gợi ý: <i>'why don't we just postpone hiring someone until next month?'</i> và người đàn ông đồng ý: <i>'That would work better for me'</i>.</p>",
                "questionType": "Agreement",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 11: Q62 - Q64 (Graphic)
    {
        "id": "ets22_t5_p3_s11",
        "audioUrl": f"{CDN_BASE}/t5_p3_s11.mp3",
        "graphicImage": f"{CDN_BASE}/t5_p3_g01.jpg",
        "context": "Questions 62-64 refer to the following conversation and catalog page.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Thanks for calling Rosemount Pottery. How can I help you?<br/>"
                      "<b>M:</b> I'm interested in ordering some dishes that I saw in your catalog for my new restaurant. They're the ones with a large star in the middle and smaller ones around the edge.<br/>"
                      "<b>W:</b> Yes, I know the ones you mean. Did you notice that pattern's a limited edition?<br/>"
                      "<b>M:</b> Oh, no. I hope they're still available. The grand opening for my restaurant is in May.<br/>"
                      "<b>W:</b> Yes, they're still in stock, but I know that pattern will be discontinued at the end of the year. They'll be hard to replace after that.<br/>"
                      "<b>M:</b> I'm glad you told me. Then I'll order extra ones now.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_62",
                "number": 62,
                "text": "Look at the graphic. Which dish pattern is the man interested in?",
                "options": {
                    "A": "#4058",
                    "B": "#4062",
                    "C": "#4073",
                    "D": "#4081"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào hình ảnh. Người đàn ông quan tâm đến mẫu đĩa nào?<br/>(A) #4058.<br/>(B) #4062.<br/>(C) #4073.<br/>(D) #4081.</p><p><b>Phân tích:</b> Người đàn ông mô tả: <i>'They're the ones with a large star in the middle and smaller ones around the edge.'</i> (Mẫu đĩa có một ngôi sao lớn ở giữa và các ngôi sao nhỏ hơn xung quanh viền). Đối chiếu với hình ảnh đồ họa trang catalog, hoa văn đó chính là <b>Pattern #4058</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Graphic"
            },
            {
                "id": "ets22_t5_p3_63",
                "number": 63,
                "text": "According to the man, what will happen in May?",
                "options": {
                    "A": "A store will take inventory.",
                    "B": "A new restaurant will open.",
                    "C": "A product line will launch.",
                    "D": "A factory will move to a new location."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người đàn ông, điều gì sẽ diễn ra vào tháng Năm?<br/>(A) Một cửa hàng sẽ kiểm kê kho.<br/>(B) Một nhà hàng mới sẽ khai trương (A new restaurant will open).<br/>(C) Một dòng sản phẩm sẽ ra mắt.<br/>(D) Một nhà máy sẽ chuyển đến địa điểm mới.</p><p><b>Phân tích:</b> Người đàn ông nói: <i>'The grand opening for my restaurant is in May.'</i> (Lễ khai trương nhà hàng của tôi diễn ra vào tháng Năm).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_64",
                "number": 64,
                "text": "What problem does the woman mention?",
                "options": {
                    "A": "Some shipping fees will increase.",
                    "B": "Some items will become unavailable.",
                    "C": "Some items were damaged during shipping.",
                    "D": "Some catalogs contain inaccurate information."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ đề cập đến vấn đề gì?<br/>(A) Phí vận chuyển sẽ tăng.<br/>(B) Một số mặt hàng sẽ không còn nữa (Some items will become unavailable).<br/>(C) Hàng hóa bị hư hại khi giao.<br/>(D) Danh mục chứa thông tin không chính xác.</p><p><b>Phân tích:</b> Người phụ nữ thông báo: <i>'that pattern will be discontinued at the end of the year. They'll be hard to replace after that.'</i> (mẫu hoa văn đó sẽ ngừng sản xuất vào cuối năm và sau đó rất khó tìm mua thay thế = sẽ không còn hàng nữa).</p>",
                "questionType": "Problem",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 12: Q65 - Q67 (Graphic)
    {
        "id": "ets22_t5_p3_s12",
        "audioUrl": f"{CDN_BASE}/t5_p3_s12.mp3",
        "graphicImage": f"{CDN_BASE}/t5_p3_g02.jpg",
        "context": "Questions 65-67 refer to the following conversation and ticket confirmation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Tigard Railways, how may I help you?<br/>"
                      "<b>W:</b> Good morning. I had a question about a reservation for a trip to San Francisco. The confirmation code is 0146H.<br/>"
                      "<b>M:</b> Okay, let me look it up. I see you have three tickets.<br/>"
                      "<b>W:</b> That's right. I was wondering if there's a train leaving a day earlier, but at the same time.<br/>"
                      "<b>M:</b> Let me check. Yes, there is, and the tickets are the same price.<br/>"
                      "<b>W:</b> Perfect. Then I'd like to make that change.<br/>"
                      "<b>M:</b> Okay. Should I use the email associated with your original reservation to send you the new information?<br/>"
                      "<b>W:</b> Yes, please.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_65",
                "number": 65,
                "text": "What type of business is the woman calling?",
                "options": {
                    "A": "A railway company",
                    "B": "A bus company",
                    "C": "An airline",
                    "D": "A ferry service"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ đang gọi điện đến loại hình kinh doanh nào?<br/>(A) Một công ty đường sắt / xe lửa (A railway company).<br/>(B) Công ty xe buýt.<br/>(C) Hãng hàng không.<br/>(D) Dịch vụ phà.</p><p><b>Phân tích:</b> Người đàn ông nhấc máy nói: <i>'Tigard Railways, how may I help you?'</i> (Đường sắt Tigard xin nghe). Do đó đây là công ty đường sắt.</p>",
                "questionType": "Business Type",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t5_p3_66",
                "number": 66,
                "text": "Look at the graphic. What number will be updated?",
                "options": {
                    "A": "3",
                    "B": "22",
                    "C": "11",
                    "D": "14"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào hình ảnh. Con số nào sẽ được cập nhật lại?<br/>(A) 3.<br/>(B) 22.<br/>(C) 11.<br/>(D) 14.</p><p><b>Phân tích:</b> Người phụ nữ hỏi: <i>'if there's a train leaving a day earlier, but at the same time.'</i> Trên vé xác nhận ban đầu ghi ngày <b>Date: June 22</b>. Khách đổi sang chuyến đi sớm hơn 1 ngày cùng giờ, nên ngày đi sẽ đổi thành June 21, tức là con số <b>22</b> sẽ được cập nhật.</p>",
                "questionType": "Graphic",
                "subCategory": "Graphic"
            },
            {
                "id": "ets22_t5_p3_67",
                "number": 67,
                "text": "What will the man most likely do next?",
                "options": {
                    "A": "Collect some money",
                    "B": "Check a seat assignment",
                    "C": "Make an announcement",
                    "D": "Send an e-mail"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông nhiều khả năng sẽ làm gì tiếp theo?<br/>(A) Thu tiền.<br/>(B) Kiểm tra chỗ ngồi.<br/>(C) Đưa ra thông báo.<br/>(D) Gửi một email (Send an e-mail).</p><p><b>Phân tích:</b> Người đàn ông hỏi: <i>'Should I use the email associated with your original reservation to send you the new information?'</i> và người phụ nữ đồng ý: <i>'Yes, please.'</i> Do đó anh ấy sẽ gửi email thông tin vé mới cho khách hàng.</p>",
                "questionType": "Next Action",
                "subCategory": "Next Action"
            }
        ]
    },

    # Set 13: Q68 - Q70 (Graphic)
    {
        "id": "ets22_t5_p3_s13",
        "audioUrl": f"{CDN_BASE}/t5_p3_s13.mp3",
        "graphicImage": f"{CDN_BASE}/t5_p3_g03.jpg",
        "context": "Questions 68-70 refer to the following conversation and comparison chart.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Margaret, do you have any plastic zip ties? We used some to tie cables together when we installed the servers last week.<br/>"
                      "<b>W:</b> Sure, they're on my desk. Need help with anything?<br/>"
                      "<b>M:</b> No, I just need them to fasten some electronic trackers to my luggage. I'm flying to Shanghai tomorrow for a week to meet the new clients, and I want to be able to keep track of my suitcases while I'm travelling.<br/>"
                      "<b>W:</b> I need one of those. I misplace my keys all the time. How did you decide which one to buy?<br/>"
                      "<b>M:</b> The most important feature for me is battery life, so I bought the one with the longest lasting battery.</p>",
        "questions": [
            {
                "id": "ets22_t5_p3_68",
                "number": 68,
                "text": "What does the man ask the woman for?",
                "options": {
                    "A": "Some plastic ties",
                    "B": "Some computer cables",
                    "C": "An Internet password",
                    "D": "A storage room key"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông xin người phụ nữ thứ gì?<br/>(A) Dây thít nhựa (Some plastic ties).<br/>(B) Một số dây cáp máy tính.<br/>(C) Mật khẩu Internet.<br/>(D) Chìa khóa phòng kho.</p><p><b>Phân tích:</b> Người đàn ông hỏi: <i>'Margaret, do you have any plastic zip ties?'</i> (Margaret, bạn có dây rút/thít nhựa nào không?). Chọn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_69",
                "number": 69,
                "text": "What is the man doing tomorrow?",
                "options": {
                    "A": "Inspecting a factory",
                    "B": "Upgrading a company database",
                    "C": "Leading a tour",
                    "D": "Going on a business trip"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Ngày mai người đàn ông sẽ làm gì?<br/>(A) Thanh tra nhà máy.<br/>(B) Nâng cấp cơ sở dữ liệu công ty.<br/>(C) Dẫn đoàn tham quan.<br/>(D) Đi công tác (Going on a business trip).</p><p><b>Phân tích:</b> Người đàn ông nói: <i>'I'm flying to Shanghai tomorrow for a week to meet the new clients'</i> (Ngày mai tôi bay đến Thượng Hải 1 tuần để gặp khách hàng mới = đi công tác).</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t5_p3_70",
                "number": 70,
                "text": "Look at the graphic. Which brand did the man buy?",
                "options": {
                    "A": "Beep It",
                    "B": "Filez",
                    "C": "Loc Pro",
                    "D": "XMarks"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào hình ảnh. Người đàn ông đã mua thương hiệu nào?<br/>(A) Beep It.<br/>(B) Filez.<br/>(C) Loc Pro.<br/>(D) XMarks.</p><p><b>Phân tích:</b> Người đàn ông chia sẻ: <i>'The most important feature for me is battery life, so I bought the one with the longest lasting battery.'</i> (Tôi mua loại có thời lượng pin lâu nhất). Đối chiếu bảng so sánh:<br/>- Beep It: 6 months<br/>- Filez: 4 months<br/>- <b>Loc Pro: 2 years</b><br/>- XMarks: 1 year.<br/>Thương hiệu có thời lượng pin dài nhất là <b>Loc Pro</b> (2 năm).</p>",
                "questionType": "Graphic",
                "subCategory": "Graphic"
            }
        ]
    }
]

os.makedirs("public/data/ets2022/test5", exist_ok=True)
out_path = "public/data/ets2022/test5/part3.json"

with open(out_path, "w", encoding="utf-8") as f:
    json.dump(part3_data, f, ensure_ascii=False, indent=2)

total_q = sum(len(s["questions"]) for s in part3_data)
print(f"Generated {len(part3_data)} sets and {total_q} questions in {out_path}")
