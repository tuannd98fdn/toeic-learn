import json
import os

CDN_BASE = "https://github.com/tuannd98fdn/toeic-learn/releases/download/ets2022-assets"

part3_data = [
    # Set 1: Q32 - Q34
    {
        "id": "ets22_t6_p3_s01",
        "audioUrl": f"{CDN_BASE}/t6_p3_s01.mp3",
        "context": "Questions 32-34 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> You've reached the customer service department of Handel's Label Company. My name's Taro Nakamura. I'm the owner of a small cosmetics company, and we recently started manufacturing a lip moisturizer. We placed a large rush order with you last week. We were supposed to get the labels yesterday, but they haven't come yet.<br/>"
                      "<b>W:</b> Sorry for the delay, Mr. Nakamura. What is your order number?<br/>"
                      "<b>M:</b> It's BX856.<br/>"
                      "<b>W:</b> There's a note here that we're having issues with transportation due to the construction on roads in your area, but your order will be delivered this afternoon.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_32",
                "number": 32,
                "text": "What kind of business does the man own?",
                "options": {
                    "A": "A laundry service",
                    "B": "A cosmetics company",
                    "C": "A public relations firm",
                    "D": "A beverage manufacturer"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông sở hữu loại hình kinh doanh nào?<br/>(A) Dịch vụ giặt ủi.<br/>(B) Một công ty mỹ phẩm (A cosmetics company).<br/>(C) Một công ty quan hệ công chúng.<br/>(D) Một nhà sản xuất đồ uống.</p><p><b>Phân tích:</b> Người đàn ông nói: <i>'I'm the owner of a small cosmetics company and we recently started manufacturing a lip moisturizer.'</i> (Tôi là chủ của một công ty mỹ phẩm nhỏ và gần đây chúng tôi bắt đầu sản xuất sáp dưỡng ẩm môi). Do đó đáp án là <b>(B)</b>.</p>",
                "questionType": "Business Type",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_33",
                "number": 33,
                "text": "What does the man want to know?",
                "options": {
                    "A": "How to place an order",
                    "B": "How much an item costs",
                    "C": "When an order will arrive",
                    "D": "Who will install some equipment"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông muốn biết điều gì?<br/>(A) Cách đặt hàng.<br/>(B) Một món hàng có giá bao nhiêu.<br/>(C) Khi nào đơn hàng sẽ đến nơi (When an order will arrive).<br/>(D) Ai sẽ lắp đặt một số thiết bị.</p><p><b>Phân tích:</b> Người đàn ông cho biết: <i>'We were supposed to get the labels yesterday, but they haven't come yet.'</i> (Lẽ ra chúng tôi nhận được nhãn dán ngày hôm qua nhưng hàng vẫn chưa tới). Do đó anh ấy gọi để hỏi tình trạng và thời gian đơn hàng sẽ tới <b>(C)</b>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_34",
                "number": 34,
                "text": "What does the woman ask the man to provide?",
                "options": {
                    "A": "An order number",
                    "B": "A home address",
                    "C": "A telephone number",
                    "D": "A credit card number"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ yêu cầu người đàn ông cung cấp điều gì?<br/>(A) Mã số đơn hàng (An order number).<br/>(B) Địa chỉ nhà.<br/>(C) Số điện thoại.<br/>(D) Số thẻ tín dụng.</p><p><b>Phân tích:</b> Người phụ nữ hỏi: <i>'What is your order number?'</i> (Mã số đơn hàng của bạn là gì?). Người đàn ông đáp: <i>'It's BX856.'</i> Chọn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 2: Q35 - Q37
    {
        "id": "ets22_t6_p3_s02",
        "audioUrl": f"{CDN_BASE}/t6_p3_s02.mp3",
        "context": "Questions 35-37 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Jerome, did you look at the options for in-flight entertainment? One of the options is e-books.<br/>"
                      "<b>M:</b> Oh, really? Are there any good books listed?<br/>"
                      "<b>W:</b> Yes, actually. There are quite a few best sellers, and you can read them right on the screen in front of your seat.<br/>"
                      "<b>M:</b> Interesting. But this is a short flight. What happens when we land and I haven't finished the book?<br/>"
                      "<b>W:</b> Apparently, if you provide your email address, the airline will send you a link so you can download the book to your personal electronic device. That's so convenient.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_35",
                "number": 35,
                "text": "Where most likely are the speakers?",
                "options": {
                    "A": "On a bus",
                    "B": "On a train",
                    "C": "On an airplane",
                    "D": "On a boat"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói nhiều khả năng đang ở đâu?<br/>(A) Trên xe buýt.<br/>(B) Trên tàu hỏa.<br/>(C) Trên máy bay (On an airplane).<br/>(D) Trên thuyền.</p><p><b>Phân tích:</b> Người phụ nữ hỏi: <i>'Jerome, did you look at the options for in-flight entertainment?'</i> (bạn đã xem các lựa chọn giải trí trên chuyến bay chưa?) và đề cập: <i>'the airline will send you a link'</i>. Do đó họ đang ở trên máy bay <b>(C)</b>.</p>",
                "questionType": "Location",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_36",
                "number": 36,
                "text": "What type of entertainment are the speakers discussing?",
                "options": {
                    "A": "Music",
                    "B": "Games",
                    "C": "Movies",
                    "D": "Books"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói đang thảo luận loại hình giải trí nào?<br/>(A) Âm nhạc.<br/>(B) Trò chơi.<br/>(C) Phim ảnh.<br/>(D) Sách (Books).</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'One of the options is e-books... There are quite a few best sellers, and you can read them right on the screen'</i>. Do đó loại hình giải trí là sách điện tử <b>(D)</b>.</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_37",
                "number": 37,
                "text": "What does the woman say is convenient?",
                "options": {
                    "A": "Being able to download an item",
                    "B": "Taking a direct route",
                    "C": "Having reclining seats",
                    "D": "Selecting meal options online"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nói điều gì là tiện lợi?<br/>(A) Có thể tải xuống một món đồ (Being able to download an item).<br/>(B) Đi theo lộ trình trực tiếp.<br/>(C) Có ghế ngả lưng.<br/>(D) Chọn món ăn trực tuyến.</p><p><b>Phân tích:</b> Người phụ nữ giải thích: <i>'if you provide your email address, the airline will send you a link so you can download the book to your personal electronic device. That's so convenient.'</i> Do đó điều tiện lợi là việc có thể download sách <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 3: Q38 - Q40
    {
        "id": "ets22_t6_p3_s03",
        "audioUrl": f"{CDN_BASE}/t6_p3_s03.mp3",
        "context": "Questions 38-40 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Thanks for inviting me to visit. As I said on the phone, I'm looking for a local farm to supply vegetables for my restaurant.<br/>"
                      "<b>W:</b> Sure. You can sample some of our seasonal produce when I show you around today.<br/>"
                      "<b>M:</b> Great. I'm concerned about variety, though. How wide is your selection of vegetables?<br/>"
                      "<b>W:</b> Well, we are constrained by what can be grown here in season. Let's tour the property now. I'll show you what we grow.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_38",
                "number": 38,
                "text": "What industry does the woman most likely work in?",
                "options": {
                    "A": "Landscaping",
                    "B": "Health care",
                    "C": "Transportation",
                    "D": "Agriculture"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nhiều khả năng làm việc trong ngành nào?<br/>(A) Thiết kế cảnh quan.<br/>(B) Chăm sóc sức khỏe.<br/>(C) Giao thông vận tải.<br/>(D) Nông nghiệp (Agriculture).</p><p><b>Phân tích:</b> Người đàn ông nói: <i>'I'm looking for a local farm to supply vegetables for my restaurant.'</i> và người phụ nữ mời tham quan nông trại của cô ấy: <i>'sample some of our seasonal produce when I show you around today... I'll show you what we grow.'</i> Do đó cô ấy làm trong ngành nông nghiệp <b>(D)</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_39",
                "number": 39,
                "text": "What does the man say he is concerned about?",
                "options": {
                    "A": "The price of some goods",
                    "B": "The variety of some items",
                    "C": "The delivery schedule",
                    "D": "The payment method"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông nói anh ấy lo lắng về điều gì?<br/>(A) Giá cả của một số mặt hàng.<br/>(B) Sự đa dạng của các mặt hàng (The variety of some items).<br/>(C) Lịch trình giao hàng.<br/>(D) Phương thức thanh toán.</p><p><b>Phân tích:</b> Người đàn ông nêu rõ: <i>'I'm concerned about variety, though. How wide is your selection of vegetables?'</i> Do đó anh ấy quan tâm/lo lắng về tính đa dạng của sản phẩm <b>(B)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_40",
                "number": 40,
                "text": "What will the speakers do next?",
                "options": {
                    "A": "Sign an agreement",
                    "B": "Call a supervisor",
                    "C": "Print a schedule",
                    "D": "Take a tour"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói sẽ làm gì tiếp theo?<br/>(A) Ký một thỏa thuận.<br/>(B) Gọi cho cấp trên.<br/>(C) In một thời khóa biểu.<br/>(D) Đi tham quan một vòng (Take a tour).</p><p><b>Phân tích:</b> Người phụ nữ đề nghị: <i>'Let's tour the property now. I'll show you what we grow.'</i> (Bây giờ chúng ta hãy cùng đi tham quan khuôn viên trang trại nhé). Chọn <b>(D)</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Action"
            }
        ]
    },

    # Set 4: Q41 - Q43
    {
        "id": "ets22_t6_p3_s04",
        "audioUrl": f"{CDN_BASE}/t6_p3_s04.mp3",
        "context": "Questions 41-43 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Hi, Elise. Did you see the feedback from the focus group about our company's latest fitness trackers?<br/>"
                      "<b>W:</b> No. Did the customers like the new features that were added?<br/>"
                      "<b>M:</b> Overall, they did. They liked the fact that the new tracker is water resistant and can be worn while swimming. But there were complaints about the battery life.<br/>"
                      "<b>W:</b> Yes, I was sure customers would complain about that. The battery life on the older model was seven days, and this one is only five.<br/>"
                      "<b>M:</b> Right. Then we need to create good marketing materials for this new tracker that emphasize the improved features. This will help us to sell the new product.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_41",
                "number": 41,
                "text": "What product are the speakers discussing?",
                "options": {
                    "A": "Cameras",
                    "B": "Fitness trackers",
                    "C": "Wireless speakers",
                    "D": "Mobile phones"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói đang thảo luận về sản phẩm nào?<br/>(A) Máy ảnh.<br/>(B) Thiết bị theo dõi thể chất/sức khỏe (Fitness trackers).<br/>(C) Loa không dây.<br/>(D) Điện thoại di động.</p><p><b>Phân tích:</b> Người đàn ông mở đầu: <i>'Did you see the feedback from the focus group about our company's latest fitness trackers?'</i>. Chọn <b>(B)</b>.</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_42",
                "number": 42,
                "text": "What complaint did customers have about the product?",
                "options": {
                    "A": "It was unavailable in stores.",
                    "B": "The price was too high.",
                    "C": "The battery life was short.",
                    "D": "Some features were difficult to use."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Khách hàng đã có phàn nàn gì về sản phẩm?<br/>(A) Sản phẩm không có sẵn tại các cửa hàng.<br/>(B) Giá quá cao.<br/>(C) Thời lượng pin ngắn (The battery life was short).<br/>(D) Một số tính năng khó sử dụng.</p><p><b>Phân tích:</b> Người đàn ông nói: <i>'But there were complaints about the battery life... The battery life on the older model was seven days, and this one is only five.'</i> Do đó phàn nàn là về pin ngắn <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_43",
                "number": 43,
                "text": "What does the man suggest doing?",
                "options": {
                    "A": "Revising a budget",
                    "B": "Postponing a product launch",
                    "C": "Visiting a manufacturing plant",
                    "D": "Creating a good marketing campaign"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông đề xuất làm gì?<br/>(A) Sửa đổi ngân sách.<br/>(B) Hoãn ra mắt sản phẩm.<br/>(C) Thăm nhà máy sản xuất.<br/>(D) Tạo một chiến dịch tiếp thị tốt (Creating a good marketing campaign).</p><p><b>Phân tích:</b> Người đàn ông gợi ý: <i>'Then we need to create good marketing materials for this new tracker that emphasize the improved features.'</i> (Tạo tài liệu/chiến dịch marketing nhấn mạnh các tính năng cải tiến). Chọn <b>(D)</b>.</p>",
                "questionType": "Suggestion",
                "subCategory": "Action"
            }
        ]
    },

    # Set 5: Q44 - Q46
    {
        "id": "ets22_t6_p3_s05",
        "audioUrl": f"{CDN_BASE}/t6_p3_s05.mp3",
        "context": "Questions 44-46 refer to the following conversation with three speakers.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M1:</b> We're making progress setting up our tour bus company, but finding the right drivers will be very important.<br/>"
                      "<b>W:</b> You're right. Should we use a recruitment agency?<br/>"
                      "<b>M2:</b> We could, but I was thinking, you know, I used to work at the Blue Eagle Hotel.<br/>"
                      "<b>W:</b> Yes.<br/>"
                      "<b>M2:</b> Well, the hotel had a lot of airport shuttle bus drivers. I have their contact info.<br/>"
                      "<b>M1:</b> Great. Maybe they'll come work for us. Why don't you reach out to them?<br/>"
                      "<b>M2:</b> I will, but after our meeting with the insurance company, remember, they'll be here in 20 minutes. I hope we can negotiate a good package to insure our drivers.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_44",
                "number": 44,
                "text": "What is the topic of the conversation?",
                "options": {
                    "A": "Recruiting staff",
                    "B": "Marketing a product",
                    "C": "Repairing a vehicle",
                    "D": "Booking a tour"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Chủ đề của cuộc trò chuyện là gì?<br/>(A) Tuyển dụng nhân viên (Recruiting staff).<br/>(B) Tiếp thị một sản phẩm.<br/>(C) Sửa chữa một chiếc xe.<br/>(D) Đặt một tour du lịch.</p><p><b>Phân tích:</b> Các nhân vật bàn luận: <i>'finding the right drivers will be very important... Should we use a recruitment agency?'</i> (tìm tài xế phù hợp, dùng công ty tuyển dụng). Do đó chủ đề là tuyển dụng nhân sự <b>(A)</b>.</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_45",
                "number": 45,
                "text": "Where does the man say he used to work?",
                "options": {
                    "A": "At a driving school",
                    "B": "At an automobile factory",
                    "C": "At a hotel",
                    "D": "At an airport"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông nói anh ấy từng làm việc ở đâu?<br/>(A) Tại trường dạy lái xe.<br/>(B) Tại nhà máy sản xuất ô tô.<br/>(C) Tại một khách sạn (At a hotel).<br/>(D) Tại sân bay.</p><p><b>Phân tích:</b> Người đàn ông thứ hai cho biết: <i>'you know, I used to work at the Blue Eagle Hotel.'</i> Do đó anh ấy từng làm tại một khách sạn <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_46",
                "number": 46,
                "text": "Who will the speakers meet with next?",
                "options": {
                    "A": "A real estate agent",
                    "B": "A delivery person",
                    "C": "Lawyers",
                    "D": "Insurance agents"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói sẽ gặp ai tiếp theo?<br/>(A) Một đại lý bất động sản.<br/>(B) Người giao hàng.<br/>(C) Các luật sư.<br/>(D) Các đại lý bảo hiểm (Insurance agents).</p><p><b>Phân tích:</b> Người đàn ông nhắc nhở: <i>'after our meeting with the insurance company, remember, they'll be here in 20 minutes.'</i> (cuộc gặp với công ty bảo hiểm). Chọn <b>(D)</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Action"
            }
        ]
    },

    # Set 6: Q47 - Q49
    {
        "id": "ets22_t6_p3_s06",
        "audioUrl": f"{CDN_BASE}/t6_p3_s06.mp3",
        "context": "Questions 47-49 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> I bought this phone here a few months ago, and the fingerprint recognition feature has stopped working.<br/>"
                      "<b>M:</b> You can still unlock your phone with your passcode, but it doesn't recognize your fingerprint anymore, correct?<br/>"
                      "<b>W:</b> That's right. If it makes a difference, I paid extra for the extended warranty.<br/>"
                      "<b>M:</b> That's good. I can replace it if I can't figure out how to fix it. Give me a few minutes while I check. And feel free to look at our accessories while you're waiting.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_47",
                "number": 47,
                "text": "What problem does the woman have?",
                "options": {
                    "A": "She lost her keys.",
                    "B": "Her phone screen has cracked.",
                    "C": "She injured her finger.",
                    "D": "Her phone is malfunctioning."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ gặp phải vấn đề gì?<br/>(A) Cô ấy bị mất chìa khóa.<br/>(B) Màn hình điện thoại bị nứt.<br/>(C) Cô ấy bị thương ở ngón tay.<br/>(D) Điện thoại của cô ấy bị trục trặc/lỗi hoạt động (Her phone is malfunctioning).</p><p><b>Phân tích:</b> Người phụ nữ trình bày: <i>'the fingerprint recognition feature has stopped working'</i> (tính năng nhận diện vân tay ngừng hoạt động). Do đó điện thoại của cô ấy bị lỗi chức năng <b>(D)</b>.</p>",
                "questionType": "Problem",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_48",
                "number": 48,
                "text": "What did the woman pay extra for?",
                "options": {
                    "A": "An extended warranty",
                    "B": "Twenty-four-hour assistance",
                    "C": "Express service",
                    "D": "A personalized design"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ đã trả thêm tiền cho cái gì?<br/>(A) Gói bảo hành mở rộng (An extended warranty).<br/>(B) Hỗ trợ 24/24.<br/>(C) Dịch vụ hỏa tốc.<br/>(D) Thiết kế cá nhân hóa.</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'If it makes a difference, I paid extra for the extended warranty.'</i> Do đó cô ấy đã mua thêm gói bảo hành mở rộng <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_49",
                "number": 49,
                "text": "What does the man suggest the woman do?",
                "options": {
                    "A": "Fill out a refund request",
                    "B": "Call another store",
                    "C": "Look at some accessories",
                    "D": "Change a pass code"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông gợi ý người phụ nữ làm gì?<br/>(A) Điền vào yêu cầu hoàn tiền.<br/>(B) Gọi cho cửa hàng khác.<br/>(C) Xem qua một số phụ kiện (Look at some accessories).<br/>(D) Đổi mật mã.</p><p><b>Phân tích:</b> Người đàn ông nhân viên gợi ý: <i>'And feel free to look at our accessories while you're waiting.'</i> Chọn <b>(C)</b>.</p>",
                "questionType": "Suggestion",
                "subCategory": "Action"
            }
        ]
    },

    # Set 7: Q50 - Q52
    {
        "id": "ets22_t6_p3_s07",
        "audioUrl": f"{CDN_BASE}/t6_p3_s07.mp3",
        "context": "Questions 50-52 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> I got your message, Rita. Since you're the factory manager, I wanted to run something by you. I think we should consider changing our lumber supplier. Epson Lumbermill sells very high-quality wood that would be perfect for the wood flooring we produce.<br/>"
                      "<b>W:</b> What's the difference in cost?<br/>"
                      "<b>M:</b> Actually, none. The mill is much closer to our factory, so the higher price of the wood would be cancelled out by the lower shipping costs, and we'd have a higher quality product.<br/>"
                      "<b>W:</b> Can you ask the mill to send us some samples? I'd like to see them.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_50",
                "number": 50,
                "text": "Who is the man?",
                "options": {
                    "A": "A software designer",
                    "B": "A landscape architect",
                    "C": "A factory supervisor",
                    "D": "A furniture store clerk"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông là ai?<br/>(A) Một nhà thiết kế phần mềm.<br/>(B) Kiến trúc sư cảnh quan.<br/>(C) Một giám sát viên nhà máy (A factory supervisor).<br/>(D) Nhân viên cửa hàng nội thất.</p><p><b>Phân tích:</b> Người đàn ông trao đổi với giám đốc nhà máy (<i>Since you're the factory manager, I wanted to run something by you</i>) về quy trình sản xuất ván sàn tại nhà máy của họ (<i>the wood flooring we produce</i>). Anh ấy đóng vai trò giám sát tại nhà máy <b>(C)</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_51",
                "number": 51,
                "text": "What reason does the woman give for making a change?",
                "options": {
                    "A": "The business hours would be more convenient.",
                    "B": "The quality of materials would be better.",
                    "C": "A discount is being offered.",
                    "D": "Fewer workers would be needed."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Lý do đưa ra cho việc thay đổi là gì?<br/>(A) Giờ làm việc sẽ thuận tiện hơn.<br/>(B) Chất lượng nguyên vật liệu sẽ tốt hơn (The quality of materials would be better).<br/>(C) Đang có chương trình giảm giá.<br/>(D) Cần ít công nhân hơn.</p><p><b>Phân tích:</b> Người đàn ông giải thích: <i>'Epson Lumbermill sells very high-quality wood... and we'd have a higher quality product.'</i> Do đó lý do chính để đổi nhà cung cấp gỗ là chất lượng tốt hơn <b>(B)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_52",
                "number": 52,
                "text": "What does the man ask the woman to do?",
                "options": {
                    "A": "Visit a work site",
                    "B": "Send a contract",
                    "C": "Make a counteroffer",
                    "D": "Request some samples"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ yêu cầu người đàn ông làm gì? (Đề bài hỏi hành động yêu cầu mẫu thử).<br/>(A) Thăm công trường.<br/>(B) Gửi hợp đồng.<br/>(C) Đưa ra đề nghị ngược lại.<br/>(D) Yêu cầu gửi một số hàng mẫu (Request some samples).</p><p><b>Phân tích:</b> Người phụ nữ yêu cầu: <i>'Can you ask the mill to send us some samples? I'd like to see them.'</i> (Anh hãy bảo xưởng gửi cho chúng ta một số mẫu thử nhé). Chọn <b>(D)</b>.</p>",
                "questionType": "Request",
                "subCategory": "Action"
            }
        ]
    },

    # Set 8: Q53 - Q55
    {
        "id": "ets22_t6_p3_s08",
        "audioUrl": f"{CDN_BASE}/t6_p3_s08.mp3",
        "context": "Questions 53-55 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Miguel, do you have a minute to chat about the upcoming trade show in Los Angeles?<br/>"
                      "<b>M:</b> Sure. What's up?<br/>"
                      "<b>W:</b> All I have left to do is to send specific instructions to the event organizers about setting up our booth.<br/>"
                      "<b>M:</b> Okay, I'm nearly ready, too, but I still need to print those extra business cards we talked about. I know you said the print shop is having a sale this week, so I'll head over there after work.<br/>"
                      "<b>W:</b> The office supply store has a sale.<br/>"
                      "<b>M:</b> Ah, thanks. Good thing I mentioned it.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_53",
                "number": 53,
                "text": "What are the speakers preparing for?",
                "options": {
                    "A": "A client visit",
                    "B": "An employee orientation",
                    "C": "A trade show",
                    "D": "A fund-raising event"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói đang chuẩn bị cho sự kiện gì?<br/>(A) Một chuyến thăm của khách hàng.<br/>(B) Buổi định hướng nhân viên.<br/>(C) Một triển lãm thương mại (A trade show).<br/>(D) Sự kiện gây quỹ.</p><p><b>Phân tích:</b> Người phụ nữ hỏi: <i>'do you have a minute to chat about the upcoming trade show in Los Angeles?'</i>. Chọn <b>(C)</b>.</p>",
                "questionType": "Event",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_54",
                "number": 54,
                "text": "What does the woman say she needs to do?",
                "options": {
                    "A": "Send some instructions",
                    "B": "Make a reservation",
                    "C": "Order some badges",
                    "D": "Write a speech"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nói cô ấy cần phải làm gì?<br/>(A) Gửi một số hướng dẫn (Send some instructions).<br/>(B) Đặt chỗ trước.<br/>(C) Đặt làm một số huy hiệu.<br/>(D) Viết một bài phát biểu.</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'All I have left to do is to send specific instructions to the event organizers about setting up our booth.'</i> (Tôi chỉ còn phải gửi các hướng dẫn cụ thể cho ban tổ chức về việc dựng gian hàng). Chọn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_55",
                "number": 55,
                "text": "Why does the woman say, “The office supply store has a sale”?",
                "options": {
                    "A": "To extend an invitation",
                    "B": "To make a correction",
                    "C": "To express satisfaction",
                    "D": "To explain a decision"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người phụ nữ lại nói: 'Cửa hàng văn phòng phẩm đang giảm giá'?<br/>(A) Để gửi lời mời.<br/>(B) Để đính chính/sửa lại thông tin (To make a correction).<br/>(C) Để bày tỏ sự hài lòng.<br/>(D) Để giải thích một quyết định.</p><p><b>Phân tích:</b> Người đàn ông vừa nói nhầm: <i>'I know you said the print shop is having a sale...'</i> (Tôi nhớ bạn bảo tiệm in đang giảm giá). Người phụ nữ lập tức đính chính: <i>'The office supply store has a sale.'</i> (Là cửa hàng văn phòng phẩm giảm giá chứ không phải tiệm in). Do đó mục đích là đính chính thông tin <b>(B)</b>.</p>",
                "questionType": "Inference / Speaker's Intent",
                "subCategory": "Inference"
            }
        ]
    },

    # Set 9: Q56 - Q58
    {
        "id": "ets22_t6_p3_s09",
        "audioUrl": f"{CDN_BASE}/t6_p3_s09.mp3",
        "context": "Questions 56-58 refer to the following conversation with three speakers.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Have you heard about the new robots that'll help us out organizing packages? They just arrived.<br/>"
                      "<b>W1:</b> Oh, yes. The robots to help us sort the shipments. Wait, that's a surprise. I wasn't expecting them until the end of the month.<br/>"
                      "<b>W2:</b> That's what I thought, too. They must have moved up the date so we can start using them sooner. And that means we'll probably get trained on how to use them next week.<br/>"
                      "<b>M:</b> Remember when they trained us on the new scanners last year?<br/>"
                      "<b>W1:</b> Yes, but we didn't get very much detailed information about how to use the scanners. It was very general.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_56",
                "number": 56,
                "text": "Which department do the speakers most likely work in?",
                "options": {
                    "A": "Human Resources",
                    "B": "Shipping",
                    "C": "Information Technology",
                    "D": "Sales"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nói nhiều khả năng làm việc ở bộ phận nào?<br/>(A) Nhân sự.<br/>(B) Giao nhận hàng (Shipping).<br/>(C) Công nghệ thông tin.<br/>(D) Bán hàng.</p><p><b>Phân tích:</b> Các nhân vật nói về thiết bị phân loại bưu phẩm: <i>'robots that'll help us out organizing packages... to help us sort the shipments'</i> (sắp xếp kiện hàng, phân loại các lô hàng vận chuyển). Do đó họ làm việc tại bộ phận vận chuyển/giao nhận <b>(B)</b>.</p>",
                "questionType": "Department",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p3_57",
                "number": 57,
                "text": "Why are the women surprised?",
                "options": {
                    "A": "An event was canceled.",
                    "B": "A coworker retired on short notice.",
                    "C": "Some business hours were changed.",
                    "D": "Some equipment arrived early."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao những người phụ nữ lại ngạc nhiên?<br/>(A) Một sự kiện đã bị hủy bỏ.<br/>(B) Một đồng nghiệp nghỉ hưu đột xuất.<br/>(C) Giờ làm việc đã bị thay đổi.<br/>(D) Một số thiết bị đã được giao tới sớm (Some equipment arrived early).</p><p><b>Phân tích:</b> Người phụ nữ 1 nói: <i>'Wait, that's a surprise. I wasn't expecting them until the end of the month.'</i> và người phụ nữ 2 đồng tình: <i>'They must have moved up the date so we can start using them sooner.'</i> Thiết bị robot giao sớm hơn dự kiến. Chọn <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_58",
                "number": 58,
                "text": "What complaint does the man have about a previous training?",
                "options": {
                    "A": "It was not offered to all workers.",
                    "B": "It was not detailed enough.",
                    "C": "It did not include lunch.",
                    "D": "It was not held during work hours."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Phàn nàn về buổi đào tạo trước đây là gì?<br/>(A) Nó không được mở cho tất cả công nhân.<br/>(B) Nó không đủ chi tiết (It was not detailed enough).<br/>(C) Nó không bao gồm bữa trưa.<br/>(D) Nó không được tổ chức trong giờ làm việc.</p><p><b>Phân tích:</b> Người phụ nữ nhận xét: <i>'we didn't get very much detailed information about how to use the scanners. It was very general.'</i> (thông tin không chi tiết, rất chung chung). Chọn <b>(B)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 10: Q59 - Q61
    {
        "id": "ets22_t6_p3_s10",
        "audioUrl": f"{CDN_BASE}/t6_p3_s10.mp3",
        "context": "Questions 59-61 refer to the following conversation.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>W:</b> Hi, Mr. Rashad. I just stopped by to let you know I won't be renewing my lease. I'm going to rent an apartment that's closer to my job. I'm tired of driving so far to work.<br/>"
                      "<b>M:</b> I'm sorry you are leaving. You're an excellent tenant. When will you be moving out?<br/>"
                      "<b>W:</b> The middle of next month. The contract requires that I pay rent for the full month, though, right?<br/>"
                      "<b>M:</b> Well, I should be able to lease that unit pretty quickly. I'll let you know what happens.<br/>"
                      "<b>W:</b> Alright, thanks.<br/>"
                      "<b>M:</b> Oh, and there's a form you'll need to fill out to make your notice official. I have it right here.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_59",
                "number": 59,
                "text": "Why does the woman want to move out of her current apartment?",
                "options": {
                    "A": "It is far from her workplace.",
                    "B": "It is too small.",
                    "C": "It is in a noisy area.",
                    "D": "It is too expensive."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người phụ nữ muốn chuyển khỏi căn hộ hiện tại?<br/>(A) Nó ở xa nơi làm việc của cô ấy (It is far from her workplace).<br/>(B) Nó quá nhỏ.<br/>(C) Nó nằm trong khu vực ồn ào.<br/>(D) Nó quá đắt đỏ.</p><p><b>Phân tích:</b> Người phụ nữ giải thích: <i>'I'm going to rent an apartment that's closer to my job. I'm tired of driving so far to work.'</i> (Tôi mệt mỏi vì phải lái xe đi làm quá xa). Chọn <b>(A)</b>.</p>",
                "questionType": "Reason",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_60",
                "number": 60,
                "text": "What does the man mean when he says, “I should be able to lease that unit pretty quickly”?",
                "options": {
                    "A": "A rental payment will likely be reduced.",
                    "B": "Investing in a property would be profitable.",
                    "C": "Some renovations will not take long.",
                    "D": "An apartment has a modern layout."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông có ý gì khi nói 'Tôi có thể cho thuê căn hộ đó khá nhanh thôi'?<br/>(A) Tiền thuê nhà nhiều khả năng sẽ được giảm (A rental payment will likely be reduced).<br/>(B) Đầu tư vào bất động sản sẽ có lãi.<br/>(C) Một số việc cải tạo sẽ không mất nhiều thời gian.<br/>(D) Một căn hộ có thiết kế hiện đại.</p><p><b>Phân tích:</b> Người phụ nữ hỏi liệu cô ấy có phải trả tiền thuê cho cả tháng đầy đủ dù chuyển đi giữa tháng không (<i>The contract requires that I pay rent for the full month, though, right?</i>). Chủ nhà đáp: <i>'Well, I should be able to lease that unit pretty quickly. I'll let you know what happens.'</i> Ý là nếu ông ấy nhanh chóng tìm được người mới vào thuê ngay giữa tháng thì cô ấy sẽ không phải trả toàn bộ tiền cả tháng (sẽ được giảm bớt). Đáp án <b>(A)</b>.</p>",
                "questionType": "Inference / Speaker's Intent",
                "subCategory": "Inference"
            },
            {
                "id": "ets22_t6_p3_61",
                "number": 61,
                "text": "What will the woman most likely do next?",
                "options": {
                    "A": "Post an advertisement",
                    "B": "Complete a form",
                    "C": "Order some supplies",
                    "D": "Provide a reference"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nhiều khả năng sẽ làm gì tiếp theo?<br/>(A) Đăng một mẩu quảng cáo.<br/>(B) Hoàn thành một biểu mẫu (Complete a form).<br/>(C) Đặt mua một số đồ dùng.<br/>(D) Cung cấp người tham chiếu.</p><p><b>Phân tích:</b> Người đàn ông đưa mẫu đơn: <i>'there's a form you'll need to fill out to make your notice official. I have it right here.'</i> Do đó cô ấy sẽ điền biểu mẫu thông báo <b>(B)</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Action"
            }
        ]
    },

    # Set 11: Q62 - Q64 (Graphic: Book inventory)
    {
        "id": "ets22_t6_p3_s11",
        "audioUrl": f"{CDN_BASE}/t6_p3_s11.mp3",
        "image": f"{CDN_BASE}/t6_p3_g01.jpg",
        "context": "Questions 62-64 refer to the following conversation and inventory list.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Hi, Gita. This is Ming. Sorry to call you on your day off, but I need someone to fill in for Stefan tomorrow at the bookstore. He injured his ankle playing basketball.<br/>"
                      "<b>W:</b> Sure, I can take Stefan's shift. Happy to help out.<br/>"
                      "<b>M:</b> Thanks. Also, I have another favor to ask.<br/>"
                      "<b>W:</b> Of course. What is it?<br/>"
                      "<b>M:</b> Well, I was checking our cookbook inventory. We only have seven copies of the book we need for the author event later this month. I'm worried seven won't be enough.<br/>"
                      "<b>W:</b> I see. I can definitely order more.<br/>"
                      "<b>M:</b> Thanks. I think the author's going to draw a big crowd. She's pretty well known and was recently on TV.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_62",
                "number": 62,
                "text": "Why does the man ask the woman to work an extra shift?",
                "options": {
                    "A": "The store needs cleaning.",
                    "B": "A sale will happen soon.",
                    "C": "A shipment is arriving.",
                    "D": "A coworker has an injury."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người đàn ông lại nhờ người phụ nữ làm thêm ca?<br/>(A) Cửa hàng cần dọn dẹp.<br/>(B) Một đợt giảm giá sắp diễn ra.<br/>(C) Một chuyến hàng sắp đến.<br/>(D) Một đồng nghiệp bị chấn thương (A coworker has an injury).</p><p><b>Phân tích:</b> Người đàn ông giải thích: <i>'I need someone to fill in for Stefan tomorrow at the bookstore. He injured his ankle playing basketball.'</i> (Stefan bị chấn thương mắt cá chân). Chọn <b>(D)</b>.</p>",
                "questionType": "Reason",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_63",
                "number": 63,
                "text": "Look at the graphic. Which book is needed for an upcoming event?",
                "options": {
                    "A": "Cooking with Kids",
                    "B": "Delicious Dinners",
                    "C": "Easy Meals at Home",
                    "D": "Extraordinary Desserts"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào hình ảnh. Cuốn sách nào cần cho sự kiện sắp tới?<br/>(A) Cooking with Kids.<br/>(B) Delicious Dinners.<br/>(C) Easy Meals at Home.<br/>(D) Extraordinary Desserts.</p><p><b>Phân tích hình ảnh:</b> Người đàn ông nói: <i>'We only have seven copies of the book we need for the author event later this month.'</i> (Chúng ta chỉ có 7 bản của cuốn sách cần cho sự kiện tác giả). Đối chiếu bảng số lượng sách trong kho: Số lượng <b>7</b> tương ứng với cuốn <b>Easy Meals at Home</b>. Chọn <b>(C)</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Graphic"
            },
            {
                "id": "ets22_t6_p3_64",
                "number": 64,
                "text": "Why does the man expect an event to be crowded?",
                "options": {
                    "A": "It is on a holiday weekend.",
                    "B": "It was advertised on television.",
                    "C": "An author is well-known.",
                    "D": "Free food will be served."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người đàn ông dự đoán sự kiện sẽ đông người?<br/>(A) Sự kiện diễn ra vào kỳ nghỉ cuối tuần.<br/>(B) Nó đã được quảng cáo trên truyền hình.<br/>(C) Tác giả là người nổi tiếng (An author is well-known).<br/>(D) Đồ ăn miễn phí sẽ được phục vụ.</p><p><b>Phân tích:</b> Người đàn ông nhận định: <i>'I think the author's going to draw a big crowd. She's pretty well known and was recently on TV.'</i> (Tác giả khá nổi tiếng và gần đây xuất hiện trên TV). Chọn <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 12: Q65 - Q67 (Graphic: Seating chart)
    {
        "id": "ets22_t6_p3_s12",
        "audioUrl": f"{CDN_BASE}/t6_p3_s12.mp3",
        "image": f"{CDN_BASE}/t6_p3_g02.jpg",
        "context": "Questions 65-67 refer to the following conversation and seating chart.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Hi, Yuri. Did you hear the East Lake Band is going to play a concert in town?<br/>"
                      "<b>W:</b> Yes. And now they have a great new guitarist. Simone Travers recently started playing with them.<br/>"
                      "<b>M:</b> Five of us from the marketing department plan to go together. Would you like to join us?<br/>"
                      "<b>W:</b> That sounds like fun. Where are you going to sit?<br/>"
                      "<b>M:</b> We thought about getting tickets for outdoor seating, but that would be a problem if it rains. Would the balcony be okay with you?<br/>"
                      "<b>W:</b> Sure. And I'd be happy to drive. My car has room for everyone.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_65",
                "number": 65,
                "text": "What did the East Lake Band recently do?",
                "options": {
                    "A": "They won a music award.",
                    "B": "They went on a national tour.",
                    "C": "They released a new recording.",
                    "D": "They added a new member to the group."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Ban nhạc East Lake Band gần đây đã làm gì?<br/>(A) Họ đã giành được giải thưởng âm nhạc.<br/>(B) Họ đã đi lưu diễn toàn quốc.<br/>(C) Họ đã phát hành một bản thu âm mới.<br/>(D) Họ đã kết nạp thêm một thành viên mới vào nhóm (They added a new member to the group).</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'And now they have a great new guitarist. Simone Travers recently started playing with them.'</i> (Họ có tay guitar mới xuất sắc vừa tham gia). Chọn <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_66",
                "number": 66,
                "text": "Look at the graphic. Where do the speakers plan to sit?",
                "options": {
                    "A": "In Section 1",
                    "B": "In Section 2",
                    "C": "In Section 3",
                    "D": "In Section 4"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào hình ảnh sơ đồ chỗ ngồi. Những người nói dự định ngồi ở đâu?<br/>(A) Ở Khu vực 1.<br/>(B) Ở Khu vực 2.<br/>(C) Ở Khu vực 3 (In Section 3).<br/>(D) Ở Khu vực 4.</p><p><b>Phân tích hình ảnh:</b> Người đàn ông hỏi: <i>'Would the balcony be okay with you?'</i> và người phụ nữ đồng ý (<i>Sure</i>). Đối chiếu sơ đồ sân khấu: <b>Section 3</b> chính là <b>Balcony</b> (khu vực ban công). Chọn <b>(C)</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Graphic"
            },
            {
                "id": "ets22_t6_p3_67",
                "number": 67,
                "text": "What does the woman offer to do?",
                "options": {
                    "A": "Pick up some tickets",
                    "B": "Provide transportation",
                    "C": "Bring some umbrellas",
                    "D": "Make a dinner reservation"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ đề nghị làm gì?<br/>(A) Đi lấy vé.<br/>(B) Cung cấp phương tiện đi lại / chở mọi người (Provide transportation).<br/>(C) Mang theo một vài chiếc ô.<br/>(D) Đặt chỗ ăn tối.</p><p><b>Phân tích:</b> Người phụ nữ nói: <i>'And I'd be happy to drive. My car has room for everyone.'</i> (Tôi rất sẵn lòng lái xe chở mọi người đi). Chọn <b>(B)</b>.</p>",
                "questionType": "Offer",
                "subCategory": "Action"
            }
        ]
    },

    # Set 13: Q68 - Q70 (Graphic: Schedule)
    {
        "id": "ets22_t6_p3_s13",
        "audioUrl": f"{CDN_BASE}/t6_p3_s13.mp3",
        "image": f"{CDN_BASE}/t6_p3_g03.jpg",
        "context": "Questions 68-70 refer to the following conversation and schedule.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "<b>M:</b> Natalia, I have a favor to ask. I have an important video call with the London office on Monday. I'll be interviewing some job candidates there.<br/>"
                      "<b>W:</b> Okay. How can I help?<br/>"
                      "<b>M:</b> Well, I want to use meeting room B. And due to the different international time zones, I need the morning slot. I saw that you have that time booked already.<br/>"
                      "<b>W:</b> Okay. I understand. In that case, I'll move my meeting to the afternoon instead. And that's actually good because it'll give me extra time to improve the presentation I'm preparing.</p>",
        "questions": [
            {
                "id": "ets22_t6_p3_68",
                "number": 68,
                "text": "What does the man plan to do during his meeting?",
                "options": {
                    "A": "Resolve a security issue",
                    "B": "Review a travel policy",
                    "C": "Conduct some job interviews",
                    "D": "Compare some software packages"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người đàn ông dự định làm gì trong cuộc họp của anh ấy?<br/>(A) Giải quyết sự cố an ninh.<br/>(B) Xem lại chính sách đi công tác.<br/>(C) Thực hiện một số cuộc phỏng vấn xin việc (Conduct some job interviews).<br/>(D) So sánh một số gói phần mềm.</p><p><b>Phân tích:</b> Người đàn ông nói: <i>'I have an important video call with the London office on Monday. I'll be interviewing some job candidates there.'</i> Do đó anh ấy phỏng vấn tuyển dụng <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p3_69",
                "number": 69,
                "text": "Look at the graphic. Which one of the woman’s meetings will be changed?",
                "options": {
                    "A": "Budget Meeting",
                    "B": "Training Meeting",
                    "C": "Team Meeting",
                    "D": "Contract Meeting"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào hình ảnh lịch biểu. Cuộc họp nào của người phụ nữ sẽ bị thay đổi?<br/>(A) Cuộc họp ngân sách (Budget Meeting).<br/>(B) Cuộc họp đào tạo.<br/>(C) Cuộc họp nhóm.<br/>(D) Cuộc họp hợp đồng.</p><p><b>Phân tích hình ảnh:</b> Người đàn ông xin dùng phòng vào sáng thứ Hai: <i>'on Monday... I want to use meeting room B. And due to the different international time zones, I need the morning slot. I saw that you have that time booked already.'</i> Người phụ nữ đồng ý chuyển sang buổi chiều. Nhìn vào lịch thứ Hai (Monday) 9-11 AM tại Room B: Đó chính là <b>Budget Meeting</b>. Chọn <b>(A)</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Graphic"
            },
            {
                "id": "ets22_t6_p3_70",
                "number": 70,
                "text": "What does the woman say she would like to improve?",
                "options": {
                    "A": "Her technical knowledge",
                    "B": "Her organizational skills",
                    "C": "A training manual",
                    "D": "A presentation"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phụ nữ nói cô ấy muốn cải thiện điều gì?<br/>(A) Kiến thức chuyên môn kỹ thuật.<br/>(B) Kỹ năng tổ chức.<br/>(C) Sổ tay hướng dẫn đào tạo.<br/>(D) Bài thuyết trình (A presentation).</p><p><b>Phân tích:</b> Người phụ nữ chia sẻ: <i>'that's actually good because it'll give me extra time to improve the presentation I'm preparing.'</i> (có thêm thời gian hoàn thiện bài thuyết trình). Chọn <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    }
]

out_dir = "public/data/ets2022/test6"
os.makedirs(out_dir, exist_ok=True)

with open(f"{out_dir}/part3.json", "w", encoding="utf-8") as f:
    json.dump(part3_data, f, ensure_ascii=False, indent=2)

print(f"Generated {out_dir}/part3.json ({len(part3_data)} sets, {sum(len(s['questions']) for s in part3_data)} questions)")
