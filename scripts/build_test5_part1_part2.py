import json
import os

CDN_BASE = "https://github.com/tuannd98fdn/toeic-learn/releases/download/ets2022-assets"

# -------------------------------------------------------------
# PART 1 (6 questions)
# -------------------------------------------------------------
part1_data = [
    {
        "id": "ets22_t5_p1_01",
        "number": 1,
        "image": f"{CDN_BASE}/t5_p1_01.jpg",
        "audioUrl": f"{CDN_BASE}/t5_p1_01.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)",
            "D": "(D)"
        },
        "correctAnswer": "D",
        "transcript": "<p><b>Transcript:</b><br/>(A) The people are watching a presentation.<br/>(B) Some books are being placed on a cart.<br/>(C) The people are kneeling in front of a shelf.<br/><b>(D) The people are visiting a library.</b></p>",
        "explanation": "<p><b>Dịch nghĩa:</b><br/>(A) Mọi người đang xem một bài thuyết trình.<br/>(B) Một số cuốn sách đang được xếp lên xe đẩy.<br/>(C) Mọi người đang quỳ trước giá sách.<br/>(D) Mọi người đang đến thăm/ở trong một thư viện.</p><p><b>Phân tích chi tiết:</b><br/>Bức tranh chụp cảnh một nhóm người đang đứng và đi lại giữa các dãy kệ sách lớn trong một thư viện công cộng (<i>visiting a library</i>). Đáp án <b>(D)</b> miêu tả chính xác bối cảnh tổng quát của bức ảnh. Các đáp án (A), (B), (C) đều chứa chi tiết sai (không có bài thuyết trình, không có xe đẩy sách, không có ai đang quỳ gối).</p>",
        "questionType": "Multiple People",
        "subCategory": "Multiple People"
    },
    {
        "id": "ets22_t5_p1_02",
        "number": 2,
        "image": f"{CDN_BASE}/t5_p1_02.jpg",
        "audioUrl": f"{CDN_BASE}/t5_p1_02.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)",
            "D": "(D)"
        },
        "correctAnswer": "C",
        "transcript": "<p><b>Transcript:</b><br/>(A) The women are facing each other.<br/>(B) The women are walking together.<br/><b>(C) One of the women is removing an item from her purse.</b><br/>(D) One of the women is drinking from a coffee cup.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b><br/>(A) Những người phụ nữ đang đối mặt nhau.<br/>(B) Những người phụ nữ đang đi bộ cùng nhau.<br/>(C) Một trong những người phụ nữ đang lấy một món đồ ra khỏi túi xách.<br/>(D) Một trong những người phụ nữ đang uống nước từ tách cà phê.</p><p><b>Phân tích chi tiết:</b><br/>Trong bức ảnh, một trong hai người phụ nữ đang mở túi xách và thò tay lấy đồ ra (<i>removing an item from her purse</i>). Đáp án <b>(C)</b> miêu tả chính xác hành động cụ thể này. (A) sai vì họ không đối diện nhau, (B) không phản ánh hành động nổi bật nhất, (D) không ai uống nước.</p>",
        "questionType": "Multiple People",
        "subCategory": "Multiple People"
    },
    {
        "id": "ets22_t5_p1_03",
        "number": 3,
        "image": f"{CDN_BASE}/t5_p1_03.jpg",
        "audioUrl": f"{CDN_BASE}/t5_p1_03.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)",
            "D": "(D)"
        },
        "correctAnswer": "C",
        "transcript": "<p><b>Transcript:</b><br/>(A) One of the men is emptying out a plastic bag.<br/>(B) They're waiting in line at a checkout counter.<br/><b>(C) One of the men is pointing at some flowers.</b><br/>(D) They're selecting some fruits and vegetables.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b><br/>(A) Một người đàn ông đang đổ một túi nhựa ra ngoài.<br/>(B) Họ đang xếp hàng tại quầy thanh toán.<br/>(C) Một người đàn ông đang chỉ tay vào những bông hoa.<br/>(D) Họ đang lựa chọn một số loại trái cây và rau củ quả.</p><p><b>Phân tích chi tiết:</b><br/>Người đàn ông đứng phía trước đang đưa tay chỉ vào những bó hoa được bày bán ở quầy (<i>pointing at some flowers</i>). Đáp án <b>(C)</b> là miêu tả hành động chính xác nhất của nhân vật. (A), (B), (D) đều chứa hành động không xuất hiện trong hình.</p>",
        "questionType": "Multiple People",
        "subCategory": "Multiple People"
    },
    {
        "id": "ets22_t5_p1_04",
        "number": 4,
        "image": f"{CDN_BASE}/t5_p1_04.jpg",
        "audioUrl": f"{CDN_BASE}/t5_p1_04.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)",
            "D": "(D)"
        },
        "correctAnswer": "A",
        "transcript": "<p><b>Transcript:</b><br/><b>(A) Some plants have been arranged in a row.</b><br/>(B) The woman is leaning against a window sill.<br/>(C) Some cabinets have been opened at a workstation.<br/>(D) The woman is reading a billboard.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b><br/>(A) Một số cây cảnh đã được sắp xếp thành một hàng.<br/>(B) Người phụ nữ đang tựa vào bậu cửa sổ.<br/>(C) Một số tủ hồ sơ đã được mở tại nơi làm việc.<br/>(D) Người phụ nữ đang đọc một biển quảng cáo.</p><p><b>Phân tích chi tiết:</b><br/>Trên bậu cửa sổ hoặc giá kệ có một dãy các chậu cây nhỏ được xếp thẳng hàng ngay ngắn (<i>arranged in a row</i>). Đáp án <b>(A)</b> miêu tả chính xác trạng thái của đồ vật trong ảnh. Người phụ nữ không tựa vào cửa sổ (B), không có tủ mở (C), không có biển quảng cáo (D).</p>",
        "questionType": "Objects / Scene",
        "subCategory": "Objects"
    },
    {
        "id": "ets22_t5_p1_05",
        "number": 5,
        "image": f"{CDN_BASE}/t5_p1_05.jpg",
        "audioUrl": f"{CDN_BASE}/t5_p1_05.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)",
            "D": "(D)"
        },
        "correctAnswer": "D",
        "transcript": "<p><b>Transcript:</b><br/>(A) A house overlooks a fishing pier.<br/>(B) Ducks are swimming in a lake.<br/>(C) A bridge crosses over a river.<br/><b>(D) Some trees border a pond.</b></p>",
        "explanation": "<p><b>Dịch nghĩa:</b><br/>(A) Một ngôi nhà nhìn ra cầu tàu câu cá.<br/>(B) Những con vịt đang bơi trong hồ.<br/>(C) Một cây cầu bắc qua sông.<br/>(D) Một số cây cối viền quanh một cái ao.</p><p><b>Phân tích chi tiết:</b><br/>Bức tranh chụp một hồ/ao nước phẳng lặng với hàng cây xanh mọc bao bọc xung quanh bờ (<i>trees border a pond</i>). Đáp án <b>(D)</b> miêu tả đúng cảnh vật thiên nhiên. Không có cầu tàu (A), không có vịt bơi (B), không có cầu bắc qua (C).</p>",
        "questionType": "Scene",
        "subCategory": "Scene"
    },
    {
        "id": "ets22_t5_p1_06",
        "number": 6,
        "image": f"{CDN_BASE}/t5_p1_06.jpg",
        "audioUrl": f"{CDN_BASE}/t5_p1_06.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)",
            "D": "(D)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Transcript:</b><br/>(A) One of the women is picking up a suitcase.<br/><b>(B) One of the women is holding a notebook under her arm.</b><br/>(C) One of the women is standing in the doorway.<br/>(D) One of the women is posting a sign on the wall.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b><br/>(A) Một trong những người phụ nữ đang nhấc vali lên.<br/>(B) Một trong những người phụ nữ đang kẹp một cuốn sổ dưới cánh tay.<br/>(C) Một trong những người phụ nữ đang đứng ở ngưỡng cửa.<br/>(D) Một trong những người phụ nữ đang dán một biển báo lên tường.</p><p><b>Phân tích chi tiết:</b><br/>Một trong những người phụ nữ đang kẹp sổ tay/tài liệu dưới nách (<i>holding a notebook under her arm</i>). Đáp án <b>(B)</b> miêu tả cụ thể và chính xác nhất hành động/đặc điểm của nhân vật trong hình.</p>",
        "questionType": "Multiple People",
        "subCategory": "Multiple People"
    }
]

# -------------------------------------------------------------
# PART 2 (25 questions)
# -------------------------------------------------------------
part2_data = [
    {
        "id": "ets22_t5_p2_07",
        "number": 7,
        "audioUrl": f"{CDN_BASE}/t5_p2_07.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> Where is the parking garage?<br/>(A) The local park is nice.<br/><b>(B) Behind the office building.</b><br/>(C) During his commute to work.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Nhà để xe ở đâu?<br/>(A) Công viên địa phương rất đẹp.<br/>(B) Phía sau tòa nhà văn phòng.<br/>(C) Trong lúc anh ấy đi làm.</p><p><b>Phân tích:</b> Câu hỏi 'Where' hỏi về nơi chốn, chỉ phương án <b>(B) Behind the office building</b> (Phía sau tòa nhà văn phòng) là câu trả lời chỉ vị trí phù hợp.</p>",
        "questionType": "Where",
        "subCategory": "Where"
    },
    {
        "id": "ets22_t5_p2_08",
        "number": 8,
        "audioUrl": f"{CDN_BASE}/t5_p2_08.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> When will the design team meet?<br/>(A) No, I ordered five.<br/><b>(B) Sometime next month.</b><br/>(C) On top of the cabinet.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Khi nào nhóm thiết kế sẽ gặp nhau?<br/>(A) Không, tôi đã đặt năm cái.<br/>(B) Một lúc nào đó vào tháng tới.<br/>(C) Ở phía trên tủ.</p><p><b>Phân tích:</b> Câu hỏi 'When' hỏi về mốc thời gian, đáp án <b>(B) Sometime next month</b> đưa ra thời điểm gặp gỡ trong tương lai.</p>",
        "questionType": "When",
        "subCategory": "When"
    },
    {
        "id": "ets22_t5_p2_09",
        "number": 9,
        "audioUrl": f"{CDN_BASE}/t5_p2_09.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "A",
        "transcript": "<p><b>Question:</b> Should we consider Anita for the accountant position?<br/><b>(A) Yes, we're reviewing her application now.</b><br/>(B) Down the hall to the right.<br/>(C) The box is open.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Chúng ta có nên cân nhắc Anita cho vị trí kế toán không?<br/>(A) Có, chúng tôi đang xem xét hồ sơ ứng tuyển của cô ấy bây giờ.<br/>(B) Đi xuống cuối hành lang bên tay phải.<br/>(C) Chiếc hộp đang mở.</p><p><b>Phân tích:</b> Câu hỏi 'Should we consider...?' hỏi ý kiến về việc tuyển dụng nhân sự, đáp án <b>(A)</b> trả lời trực tiếp khẳng định việc đang duyệt hồ sơ của cô ấy.</p>",
        "questionType": "Yes/No Question",
        "subCategory": "Yes/No Question"
    },
    {
        "id": "ets22_t5_p2_10",
        "number": 10,
        "audioUrl": f"{CDN_BASE}/t5_p2_10.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> What are they building near the shopping center?<br/>(A) On the 18th floor.<br/><b>(B) An apartment complex.</b><br/>(C) I shop there on the weekends.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Họ đang xây dựng cái gì gần trung tâm mua sắm vậy?<br/>(A) Trên tầng 18.<br/>(B) Một khu phức hợp căn hộ.<br/>(C) Tôi mua sắm ở đó vào cuối tuần.</p><p><b>Phân tích:</b> Câu hỏi 'What are they building...?' hỏi về đối tượng xây dựng, phương án <b>(B) An apartment complex</b> (Khu căn hộ) là câu trả lời trực tiếp và logic.</p>",
        "questionType": "What",
        "subCategory": "What"
    },
    {
        "id": "ets22_t5_p2_11",
        "number": 11,
        "audioUrl": f"{CDN_BASE}/t5_p2_11.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "C",
        "transcript": "<p><b>Question:</b> How did you like the meal?<br/>(A) I like that idea.<br/>(B) By taxicab.<br/><b>(C) It was excellent.</b></p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Bạn cảm thấy bữa ăn thế nào?<br/>(A) Tôi thích ý kiến đó.<br/>(B) Bằng xe taxi.<br/>(C) Nó rất tuyệt vời.</p><p><b>Phân tích:</b> Câu hỏi 'How did you like...?' dùng để hỏi ý kiến/cảm nhận về một trải nghiệm, đáp án <b>(C) It was excellent</b> đưa ra lời khen ngợi phù hợp.</p>",
        "questionType": "How",
        "subCategory": "How"
    },
    {
        "id": "ets22_t5_p2_12",
        "number": 12,
        "audioUrl": f"{CDN_BASE}/t5_p2_12.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> Why did the manager email you?<br/>(A) Yes, I'm sure.<br/><b>(B) Because she wants me to work late.</b><br/>(C) Do you have any stamps?</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người quản lý lại gửi email cho bạn?<br/>(A) Vâng, tôi chắc chắn.<br/>(B) Vì cô ấy muốn tôi làm việc muộn/tăng ca.<br/>(C) Bạn có con tem nào không?</p><p><b>Phân tích:</b> Câu hỏi 'Why' hỏi lý do, phương án <b>(B) Because she wants me to work late</b> giải thích nguyên nhân rõ ràng.</p>",
        "questionType": "Why",
        "subCategory": "Why"
    },
    {
        "id": "ets22_t5_p2_13",
        "number": 13,
        "audioUrl": f"{CDN_BASE}/t5_p2_13.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> Will the prototype be ready in time for the trade show?<br/>(A) That's a wonderful TV show.<br/><b>(B) Yes, it'll be finished.</b><br/>(C) It's in Chicago this year.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Mẫu thử nghiệm liệu có sẵn sàng kịp cho hội chợ thương mại không?<br/>(A) Đó là một chương trình truyền hình tuyệt vời.<br/>(B) Có, nó sẽ được hoàn thành kịp.<br/>(C) Năm nay nó ở Chicago.</p><p><b>Phân tích:</b> Câu hỏi Yes/No hỏi về tiến độ mẫu sản phẩm thử nghiệm (prototype), đáp án <b>(B)</b> khẳng định tiến độ hoàn thành đúng hạn.</p>",
        "questionType": "Yes/No Question",
        "subCategory": "Yes/No Question"
    },
    {
        "id": "ets22_t5_p2_14",
        "number": 14,
        "audioUrl": f"{CDN_BASE}/t5_p2_14.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> Our office building is locked on the weekends, isn't it?<br/>(A) Right down Franklin Boulevard.<br/><b>(B) Just bring your employee badge.</b><br/>(C) To visit with some friends.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Tòa nhà văn phòng của chúng ta khóa cửa vào cuối tuần, đúng không?<br/>(A) Ngay dưới Đại lộ Franklin.<br/>(B) Cứ mang theo thẻ nhân viên của bạn là được.<br/>(C) Để thăm một vài người bạn.</p><p><b>Phân tích:</b> Câu hỏi đuôi xác nhận việc tòa nhà bị khóa vào cuối tuần, câu trả lời gián tiếp <b>(B)</b> hướng dẫn cách vào tòa nhà bằng thẻ nhân viên quẹt thẻ.</p>",
        "questionType": "Tag Question",
        "subCategory": "Tag Question"
    },
    {
        "id": "ets22_t5_p2_15",
        "number": 15,
        "audioUrl": f"{CDN_BASE}/t5_p2_15.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "C",
        "transcript": "<p><b>Question:</b> Can't you deliver both of these orders during the same trip?<br/>(A) It arrived in good condition.<br/>(B) Actually, we had a very nice trip.<br/><b>(C) Sure, they go to the same part of town.</b></p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Bạn không thể giao cả hai đơn hàng này trong cùng một chuyến đi sao?<br/>(A) Nó đã đến nơi trong tình trạng tốt.<br/>(B) Thực ra chúng tôi đã có một chuyến đi rất tuyệt.<br/>(C) Chắc chắn rồi, chúng đều được giao đến cùng một khu vực trong thị trấn.</p><p><b>Phân tích:</b> Câu hỏi phủ định gợi ý giao 2 đơn hàng cùng lúc, đáp án <b>(C) Sure, they go to the same part of town</b> đồng ý và giải thích vì cùng tuyến đường.</p>",
        "questionType": "Negative Question",
        "subCategory": "Negative Question"
    },
    {
        "id": "ets22_t5_p2_16",
        "number": 16,
        "audioUrl": f"{CDN_BASE}/t5_p2_16.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "A",
        "transcript": "<p><b>Question:</b> Do you want to purchase a laptop or desktop computer?<br/><b>(A) I have the model number here.</b><br/>(B) Yes, in the top drawer.<br/>(C) At the new furniture store.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Bạn muốn mua máy tính xách tay hay máy tính để bàn?<br/>(A) Tôi có mã sản phẩm ở đây.<br/>(B) Vâng, ở ngăn kéo trên cùng.<br/>(C) Tại cửa hàng đồ nội thất mới.</p><p><b>Phân tích:</b> Câu hỏi lựa chọn (A or B). Người nói <b>(A)</b> đưa ra câu trả lời gián tiếp cho biết đã chọn sẵn mẫu sản phẩm cụ thể và có mã số (model number).</p>",
        "questionType": "Choice Question",
        "subCategory": "Choice Question"
    },
    {
        "id": "ets22_t5_p2_17",
        "number": 17,
        "audioUrl": f"{CDN_BASE}/t5_p2_17.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> What did you think of the company newsletter?<br/>(A) About two pages long.<br/><b>(B) It had some interesting articles.</b><br/>(C) Please seal the envelope.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Bạn nghĩ gì về bản tin nội bộ của công ty?<br/>(A) Dài khoảng hai trang.<br/>(B) Nó có một số bài viết thú vị.<br/>(C) Xin vui lòng dán phong bì lại.</p><p><b>Phân tích:</b> Câu hỏi xin đánh giá/nhận xét 'What did you think of...?', phương án <b>(B) It had some interesting articles</b> nêu cảm nhận tích cực về nội dung bài viết.</p>",
        "questionType": "What",
        "subCategory": "What"
    },
    {
        "id": "ets22_t5_p2_18",
        "number": 18,
        "audioUrl": f"{CDN_BASE}/t5_p2_18.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> Can I help you move your furniture?<br/>(A) He bought a desk last week.<br/><b>(B) I think I can manage on my own.</b><br/>(C) The furniture store on Grove Street.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Tôi có thể giúp bạn chuyển đồ nội thất được không?<br/>(A) Anh ấy đã mua một cái bàn tuần trước.<br/>(B) Tôi nghĩ tôi có thể tự lo liệu được.<br/>(C) Cửa hàng đồ nội thất trên đường Grove.</p><p><b>Phân tích:</b> Lời đề nghị giúp đỡ 'Can I help you...?', đáp án <b>(B)</b> từ chối một cách lịch sự bằng cách nói bản thân có thể tự xoay xở được (manage on my own).</p>",
        "questionType": "Offer / Request",
        "subCategory": "Offer / Request"
    },
    {
        "id": "ets22_t5_p2_19",
        "number": 19,
        "audioUrl": f"{CDN_BASE}/t5_p2_19.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "C",
        "transcript": "<p><b>Question:</b> Why did Mr. Harrison resign from his position?<br/>(A) Two weeks ago.<br/>(B) It's just been signed.<br/><b>(C) He found a different job.</b></p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Tại sao ông Harrison lại từ chức khỏi vị trí của mình?<br/>(A) Cách đây hai tuần.<br/>(B) Nó vừa mới được ký.<br/>(C) Anh ấy đã tìm được một công việc khác.</p><p><b>Phân tích:</b> Câu hỏi 'Why' hỏi lý do thôi việc, đáp án <b>(C) He found a different job</b> giải thích lý do ông ấy chuyển việc.</p>",
        "questionType": "Why",
        "subCategory": "Why"
    },
    {
        "id": "ets22_t5_p2_20",
        "number": 20,
        "audioUrl": f"{CDN_BASE}/t5_p2_20.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "C",
        "transcript": "<p><b>Question:</b> Which client are we meeting with tomorrow morning?<br/>(A) They talked about the upcoming merger.<br/>(B) Just a light breakfast.<br/><b>(C) The Greendale Company representative.</b></p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Sáng mai chúng ta sẽ gặp khách hàng nào?<br/>(A) Họ đã nói về vụ sáp nhập sắp tới.<br/>(B) Chỉ là một bữa ăn sáng nhẹ.<br/>(C) Người đại diện của Công ty Greendale.</p><p><b>Phân tích:</b> Câu hỏi 'Which client...?' hỏi về đối tác khách hàng cụ thể, đáp án <b>(C)</b> chỉ đích danh đại diện Công ty Greendale.</p>",
        "questionType": "Which",
        "subCategory": "Which"
    },
    {
        "id": "ets22_t5_p2_21",
        "number": 21,
        "audioUrl": f"{CDN_BASE}/t5_p2_21.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "A",
        "transcript": "<p><b>Question:</b> Weren't those light bulbs replaced recently?<br/><b>(A) Yes, we just changed them.</b><br/>(B) Actually, this isn't very heavy.<br/>(C) It's on 4th Street.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Không phải những bóng đèn đó vừa mới được thay gần đây sao?<br/>(A) Đúng vậy, chúng tôi vừa mới thay chúng xong.<br/>(B) Thực ra cái này không nặng lắm.<br/>(C) Nó ở trên Phố số 4.</p><p><b>Phân tích:</b> Câu hỏi phủ định 'Weren't... replaced?', đáp án <b>(A)</b> xác nhận việc đã thay thế bằng cách dùng từ đồng nghĩa <i>changed them</i>.</p>",
        "questionType": "Negative Question",
        "subCategory": "Negative Question"
    },
    {
        "id": "ets22_t5_p2_22",
        "number": 22,
        "audioUrl": f"{CDN_BASE}/t5_p2_22.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "A",
        "transcript": "<p><b>Question:</b> Who knows how to start the conference call?<br/><b>(A) Alyssa can do it.</b><br/>(B) The conference registration fee.<br/>(C) Yes, we've got them all.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Ai biết cách bắt đầu cuộc gọi hội nghị không?<br/>(A) Alyssa có thể làm việc đó.<br/>(B) Phí đăng ký hội nghị.<br/>(C) Vâng, chúng tôi đã có tất cả chúng.</p><p><b>Phân tích:</b> Câu hỏi 'Who' hỏi về người biết cách thực hiện, đáp án <b>(A) Alyssa can do it</b> giới thiệu đúng người có khả năng phụ trách.</p>",
        "questionType": "Who",
        "subCategory": "Who"
    },
    {
        "id": "ets22_t5_p2_23",
        "number": 23,
        "audioUrl": f"{CDN_BASE}/t5_p2_23.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "A",
        "transcript": "<p><b>Question:</b> What should I do with the extra training materials?<br/><b>(A) Leave them on my desk.</b><br/>(B) No, they shouldn't.<br/>(C) Around 4:30.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Tôi nên làm gì với tài liệu đào tạo thừa này?<br/>(A) Cứ để chúng trên bàn làm việc của tôi.<br/>(B) Không, họ không nên.<br/>(C) Khoảng 4 giờ 30.</p><p><b>Phân tích:</b> Câu hỏi 'What should I do...?' xin chỉ dẫn xử lý tài liệu thừa, đáp án <b>(A) Leave them on my desk</b> đưa ra hướng xử lý trực tiếp.</p>",
        "questionType": "What",
        "subCategory": "What"
    },
    {
        "id": "ets22_t5_p2_24",
        "number": 24,
        "audioUrl": f"{CDN_BASE}/t5_p2_24.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> It's raining quite hard outside.<br/>(A) With an umbrella.<br/><b>(B) I can drive you to the store.</b><br/>(C) Yes, that was difficult.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Bên ngoài trời đang mưa khá to.<br/>(A) Với một chiếc ô.<br/>(B) Tôi có thể lái xe chở bạn đến cửa hàng.<br/>(C) Vâng, điều đó thật khó khăn.</p><p><b>Phân tích:</b> Câu trần thuật thông báo thời tiết xấu, người đáp <b>(B)</b> nhiệt tình đưa ra giải pháp giúp đỡ: 'Tôi có thể lái xe chở bạn đi'.</p>",
        "questionType": "Statement",
        "subCategory": "Statement"
    },
    {
        "id": "ets22_t5_p2_25",
        "number": 25,
        "audioUrl": f"{CDN_BASE}/t5_p2_25.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "C",
        "transcript": "<p><b>Question:</b> How many servers do we need waiting tables on Saturday?<br/>(A) Yes, you can leave it on the floor.<br/>(B) At 11 o'clock.<br/><b>(C) We have a party of 25 coming in.</b></p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Chúng ta cần bao nhiêu nhân viên phục vụ bàn vào thứ Bảy?<br/>(A) Vâng, bạn có thể để nó trên sàn.<br/>(B) Vào lúc 11 giờ.<br/>(C) Chúng ta có một đoàn khách 25 người sắp tới.</p><p><b>Phân tích:</b> Câu hỏi số lượng 'How many servers...?', câu trả lời gián tiếp <b>(C)</b> nêu quy mô đoàn khách để từ đó ước tính số nhân viên phục vụ cần thiết.</p>",
        "questionType": "How many",
        "subCategory": "How many"
    },
    {
        "id": "ets22_t5_p2_26",
        "number": 26,
        "audioUrl": f"{CDN_BASE}/t5_p2_26.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "C",
        "transcript": "<p><b>Question:</b> George, will you call our clients back?<br/>(A) The information packet.<br/>(B) Yes, she'll be back soon.<br/><b>(C) Anna left them a message.</b></p>",
        "explanation": "<p><b>Dịch nghĩa:</b> George, bạn sẽ gọi lại cho khách hàng của chúng ta chứ?<br/>(A) Tập tài liệu thông tin.<br/>(B) Vâng, cô ấy sẽ quay lại sớm.<br/>(C) Anna đã để lại tin nhắn cho họ rồi.</p><p><b>Phân tích:</b> Yêu cầu gọi lại cho khách, George đáp gián tiếp <b>(C)</b> rằng việc liên lạc đã được xử lý (Anna đã để lại tin nhắn rồi) nên không cần gọi lại nữa.</p>",
        "questionType": "Request",
        "subCategory": "Request"
    },
    {
        "id": "ets22_t5_p2_27",
        "number": 27,
        "audioUrl": f"{CDN_BASE}/t5_p2_27.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> Our quarterly sales results were lower than expected.<br/>(A) It's an easy hiking trail.<br/><b>(B) We do have a new competitor.</b><br/>(C) A quarter of an hour.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Kết quả doanh số hàng quý của chúng ta thấp hơn dự kiến.<br/>(A) Đó là một con đường mòn đi bộ đường dài dễ đi.<br/>(B) Chúng ta quả thật có một đối thủ cạnh tranh mới.<br/>(C) Mười lăm phút.</p><p><b>Phân tích:</b> Câu trần thuật chia sẻ về doanh số giảm sút, đáp án <b>(B)</b> giải thích nguyên nhân khách quan là do có đối thủ cạnh tranh mới trên thị trường.</p>",
        "questionType": "Statement",
        "subCategory": "Statement"
    },
    {
        "id": "ets22_t5_p2_28",
        "number": 28,
        "audioUrl": f"{CDN_BASE}/t5_p2_28.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "A",
        "transcript": "<p><b>Question:</b> When do you want to work on this new project?<br/><b>(A) I haven't been trained yet.</b><br/>(B) Yes, he got a full-time job.<br/>(C) I completely agree with you.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Khi nào bạn muốn làm việc cho dự án mới này?<br/>(A) Tôi vẫn chưa được đào tạo/hướng dẫn.<br/>(B) Vâng, anh ấy đã nhận được một công việc toàn thời gian.<br/>(C) Tôi hoàn toàn đồng ý với bạn.</p><p><b>Phân tích:</b> Câu hỏi 'When...?', câu trả lời gián tiếp <b>(A)</b> cho biết hiện tại chưa thể làm được vì chưa qua đào tạo tập huấn cho dự án này.</p>",
        "questionType": "When",
        "subCategory": "When"
    },
    {
        "id": "ets22_t5_p2_29",
        "number": 29,
        "audioUrl": f"{CDN_BASE}/t5_p2_29.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "C",
        "transcript": "<p><b>Question:</b> I'll be happy to take pictures at the company retreat.<br/>(A) Some coffee and desserts.<br/>(B) Yes, a digital camera.<br/><b>(C) They hired a photographer.</b></p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Tôi rất sẵn lòng chụp ảnh tại chuyến dã ngoại của công ty.<br/>(A) Một ít cà phê và đồ tráng miệng.<br/>(B) Vâng, một chiếc máy ảnh kỹ thuật số.<br/>(C) Họ đã thuê một nhiếp ảnh gia chuyên nghiệp rồi.</p><p><b>Phân tích:</b> Người nói tình nguyện chụp ảnh, đáp án <b>(C)</b> thông báo công ty đã thuê nhiếp ảnh gia nên người nói không cần phải chụp nữa.</p>",
        "questionType": "Statement",
        "subCategory": "Statement"
    },
    {
        "id": "ets22_t5_p2_30",
        "number": 30,
        "audioUrl": f"{CDN_BASE}/t5_p2_30.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "B",
        "transcript": "<p><b>Question:</b> These all-weather tires are very expensive.<br/>(A) A 15-minute drive.<br/><b>(B) They'll last for a long time.</b><br/>(C) Let me turn it on for you.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Những chiếc lốp xe bốn mùa này đắt tiền quá.<br/>(A) Một chuyến lái xe mất 15 phút.<br/>(B) Chúng sẽ sử dụng được rất lâu đấy.<br/>(C) Để tôi bật nó lên cho bạn.</p><p><b>Phân tích:</b> Câu trần thuật phàn nàn giá lốp xe đắt, đáp án <b>(B)</b> giải thích giá trị tương xứng của sản phẩm là độ bền cao (tiền nào của nấy).</p>",
        "questionType": "Statement",
        "subCategory": "Statement"
    },
    {
        "id": "ets22_t5_p2_31",
        "number": 31,
        "audioUrl": f"{CDN_BASE}/t5_p2_31.mp3",
        "options": {
            "A": "(A)",
            "B": "(B)",
            "C": "(C)"
        },
        "correctAnswer": "A",
        "transcript": "<p><b>Question:</b> Why aren't the trainees in the computer lab now?<br/><b>(A) Didn't you get a copy of the updated schedule?</b><br/>(B) Yes, at the next station.<br/>(C) There's a repair shop on Lancaster Avenue.</p>",
        "explanation": "<p><b>Dịch nghĩa:</b> Tại sao các thực tập sinh hiện không ở trong phòng máy tính?<br/>(A) Bạn không nhận được một bản lịch trình cập nhật mới sao?<br/>(B) Vâng, ở nhà ga tiếp theo.<br/>(C) Có một tiệm sửa chữa trên Đại lộ Lancaster.</p><p><b>Phân tích:</b> Câu hỏi 'Why aren't...?', đáp án <b>(A)</b> phản hồi bằng câu hỏi ngược cho biết lịch trình đào tạo đã có sự thay đổi mới mà người hỏi chưa cập nhật.</p>",
        "questionType": "Why",
        "subCategory": "Why"
    }
]

os.makedirs("public/data/ets2022/test5", exist_ok=True)

with open("public/data/ets2022/test5/part1.json", "w", encoding="utf-8") as f:
    json.dump(part1_data, f, ensure_ascii=False, indent=2)

with open("public/data/ets2022/test5/part2.json", "w", encoding="utf-8") as f:
    json.dump(part2_data, f, ensure_ascii=False, indent=2)

print(f"Generated Part 1: {len(part1_data)} questions in public/data/ets2022/test5/part1.json")
print(f"Generated Part 2: {len(part2_data)} questions in public/data/ets2022/test5/part2.json")
