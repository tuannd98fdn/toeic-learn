import json

# Sets 1 to 5: Q147 to Q157
part1_sets = [
    # Set 1: Q147 - Q148 (Advertisement)
    {
        "id": "ets22_t4_p7_s01",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s01_p1",
                "type": "Advertisement",
                "title": "Advertisement",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0; text-align: center;'>STAR FITNESS CLUB</h3>"
                           "<p style='text-align: center; font-weight: bold; color: var(--primary, #0284c7);'>Grand Opening Event on 25 April</p>"
                           "<p>Come and join us as we open our newest club in Summerlake City in our brand-new building located at 714 Shadow Road. Come and see our state-of-the-art equipment and meet our experienced fitness trainers and instructors while enjoying healthy refreshments.</p>"
                           "<p><b>Special Offer:</b> Take 20 percent off your first 3 months! The offer is for new members only and cannot be combined with any other offer. The offer is available at all Star Fitness locations and is good until 30 June.</p>"
                           "<p>Visit www.starfitness.ca for more information, including a schedule of our fitness classes and club hours.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_147",
                "number": 147,
                "text": "What is indicated about Star Fitness Club?",
                "options": {
                    "A": "It has just built a new facility.",
                    "B": "It provides refreshments with paid membership.",
                    "C": "It is currently selling its used exercise equipment.",
                    "D": "It is open seven days a week."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về Star Fitness Club?<br/>(A) Câu lạc bộ vừa xây dựng một cơ sở mới.<br/>(B) Cung cấp đồ ăn nhẹ khi mua thẻ thành viên.<br/>(C) Hiện đang bán thiết bị tập thể dục đã qua sử dụng.<br/>(D) Mở cửa bảy ngày một tuần.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn quảng cáo ghi: <i>'open our newest club in Summerlake City in our brand-new building located at 714 Shadow Road.'</i> (mở câu lạc bộ mới nhất tại Summerlake City trong tòa nhà hoàn toàn mới của chúng tôi). Do đó chọn <b>(A) It has just built a new facility</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Tìm thông tin về địa điểm và cơ sở vật chất mới (brand-new building = new facility)."
            },
            {
                "id": "ets22_t4_p7_148",
                "number": 148,
                "text": "What is NOT mentioned about the special offer?",
                "options": {
                    "A": "It expires at the end of June.",
                    "B": "It can be used at any location.",
                    "C": "It includes sessions with a personal trainer.",
                    "D": "It is intended for new customers only."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì KHÔNG được đề cập về chương trình ưu đãi đặc biệt?<br/>(A) Hết hạn vào cuối tháng 6.<br/>(B) Có thể sử dụng tại bất kỳ địa điểm nào.<br/>(C) Bao gồm các buổi tập với huấn luyện viên cá nhân.<br/>(D) Chỉ dành cho khách hàng mới.</p><p><b>Bằng chứng trích dẫn:</b><br/>- (A) có được nhắc: <i>'good until 30 June'</i>.<br/>- (B) có được nhắc: <i>'available at all Star Fitness locations'</i>.<br/>- (D) có được nhắc: <i>'for new members only'</i>.<br/>Chỉ có <b>(C) It includes sessions with a personal trainer</b> là không hề xuất hiện trong điều kiện ưu đãi.</p>",
                "questionType": "Negative Fact",
                "subCategory": "Detail",
                "strategyHint": "Đối chiếu 4 phương án với các điều khoản trong mục Special Offer."
            }
        ]
    },

    # Set 2: Q149 - Q150 (Note)
    {
        "id": "ets22_t4_p7_s02",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s02_p1",
                "type": "Note",
                "title": "Hotel Note",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>Westerly Hotel</b><br/>295 Prudence Ave.<br/>Atlanta, GA 30317</p>"
                           "<p>Dear Guest,</p>"
                           "<p>Welcome to Atlanta. We are pleased you have chosen the Westerly Hotel.</p>"
                           "<p>A complimentary breakfast is served daily from 6:00 A.M. to 10:30 A.M. in our dining area located in the lobby. Enjoy an array of selections including eggs, oatmeal, pastries, fresh fruit, cereal, juice, coffee, and tea. Please be aware, however, that on May 2 breakfast will be served in the Fin Restaurant, located on the third floor, to accommodate a private event.</p>"
                           "<p>Regards,<br/>Malcolm Anderson, Manager<br/>Westerly Hotel</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_149",
                "number": 149,
                "text": "What is a purpose of the note?",
                "options": {
                    "A": "To request feedback on a recent stay",
                    "B": "To inform a guest of a location change",
                    "C": "To invite a guest to a private event",
                    "D": "To announce the opening of a new hotel"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của bức thư nhắn là gì?<br/>(A) Yêu cầu phản hồi về kỳ nghỉ gần đây.<br/>(B) Thông báo cho khách về sự thay đổi địa điểm.<br/>(C) Mời khách tham dự một sự kiện riêng tư.<br/>(D) Thông báo khai trương một khách sạn mới.</p><p><b>Bằng chứng trích dẫn:</b> Quản lý khách sạn lưu ý khách: <i>'Please be aware, however, that on May 2 breakfast will be served in the Fin Restaurant, located on the third floor, to accommodate a private event.'</i> (vào ngày 2/5 bữa sáng sẽ phục vụ tại Nhà hàng Fin ở tầng 3 thay vì sảnh). Chọn <b>(B) To inform a guest of a location change</b>.</p>",
                "questionType": "Purpose",
                "subCategory": "Overview",
                "strategyHint": "Xác định thông điệp chính mà khách sạn muốn thông báo cho khách (đổi chỗ ăn sáng ngày 2/5)."
            },
            {
                "id": "ets22_t4_p7_150",
                "number": 150,
                "text": "What is stated about the breakfast?",
                "options": {
                    "A": "It is free of charge.",
                    "B": "It is not available on weekends.",
                    "C": "It will not be served on May 2.",
                    "D": "It will soon feature more selections."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được nêu rõ về bữa ăn sáng?<br/>(A) Nó được miễn phí.<br/>(B) Không phục vụ vào cuối tuần.<br/>(C) Sẽ không phục vụ vào ngày 2 tháng 5.<br/>(D) Sắp tới sẽ có thêm nhiều lựa chọn.</p><p><b>Bằng chứng trích dẫn:</b> Bức thư ghi: <i>'A complimentary breakfast is served daily from 6:00 A.M. to 10:30 A.M.'</i>. Từ <i>complimentary = free of charge</i> (miễn phí). Chọn <b>(A) It is free of charge</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "complimentary = free of charge."
            }
        ]
    },

    # Set 3: Q151 - Q152 (Notice)
    {
        "id": "ets22_t4_p7_s03",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s03_p1",
                "type": "Notice",
                "title": "Public Notice",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0;'>Things Are Happening with the Southeast Rail Line—Time to Get Involved!</h3>"
                           "<p>Plans are moving forward with the renovations to the Southeast Rail Line. The changes will create a faster, more convenient, more reliable alternative to traveling on the area's congested roadways. Construction begins this September. Public meetings to solicit comments regarding design options for the new stations are scheduled for June, July, and August. Learn more about the meetings by visiting www.southeastrailproject.com/communityaffairs.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_151",
                "number": 151,
                "text": "When will construction start on the project?",
                "options": {
                    "A": "In June",
                    "B": "In July",
                    "C": "In August",
                    "D": "In September"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Khi nào việc xây dựng dự án sẽ bắt đầu?<br/>(A) Vào tháng 6.<br/>(B) Vào tháng 7.<br/>(C) Vào tháng 8.<br/>(D) Vào tháng 9.</p><p><b>Bằng chứng trích dẫn:</b> Thông báo nêu rõ ràng: <i>'Construction begins this September.'</i> (Công tác thi công bắt đầu vào tháng 9 này). Chọn <b>(D) In September</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Phân biệt thời điểm họp lấy ý kiến cộng đồng (tháng 6, 7, 8) với thời điểm khởi công (tháng 9)."
            },
            {
                "id": "ets22_t4_p7_152",
                "number": 152,
                "text": "What will be discussed at the public meetings?",
                "options": {
                    "A": "The reduction of roadway traffic",
                    "B": "The source of construction materials",
                    "C": "The design of the train stations",
                    "D": "The schedule of the express trains"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì sẽ được thảo luận tại các cuộc họp cộng đồng?<br/>(A) Việc giảm thiểu giao thông đường bộ.<br/>(B) Nguồn cung ứng vật liệu xây dựng.<br/>(C) Thiết kế các nhà ga xe lửa.<br/>(D) Lịch trình các chuyến tàu tốc hành.</p><p><b>Bằng chứng trích dẫn:</b> Thông báo viết: <i>'Public meetings to solicit comments regarding design options for the new stations are scheduled...'</i> (Các buổi họp công cộng để xin ý kiến về các phương án thiết kế cho các nhà ga mới). Chọn <b>(C) The design of the train stations</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "design options for the new stations = design of the train stations."
            }
        ]
    },

    # Set 4: Q153 - Q154 (Text-Message Chain)
    {
        "id": "ets22_t4_p7_s04",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s04_p1",
                "type": "Text Message",
                "title": "Text-Message Chain",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>Lisa Dominguez [3:24 P.M.]</b><br/>Hi, Travis. I'm at the market shopping for tomatoes, but none of them are ripe. Can you check to see if we have any frozen tomato sauce on hand from last week? Otherwise, I guess I could get some canned tomatoes.</p>"
                           "<p><b>Travis Farley [3:27 P.M.]</b><br/>I'm afraid we are all out. Let me speak to the chef.</p>"
                           "<p><b>Lisa Dominguez [3:28 P.M.]</b><br/>That would be great.</p>"
                           "<p><b>Travis Farley [3:32 P.M.]</b><br/>She says that you can pick up red peppers instead. We will need to make a small change to the menu description, but the other ingredients can stay the same.</p>"
                           "<p><b>Lisa Dominguez [3:34 P.M.]</b><br/>OK. I've got it. Thank you!</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_153",
                "number": 153,
                "text": "For what kind of business does Mr. Farley most likely work?",
                "options": {
                    "A": "A farm",
                    "B": "A grocery store",
                    "C": "A restaurant",
                    "D": "A delivery service"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Ông Farley nhiều khả năng nhất làm việc cho loại hình kinh doanh nào?<br/>(A) Trang trại.<br/>(B) Cửa hàng tạp hóa.<br/>(C) Nhà hàng.<br/>(D) Dịch vụ giao hàng.</p><p><b>Bằng chứng trích dẫn:</b> Travis nói: <i>'Let me speak to the chef. She says that you can pick up red peppers instead. We will need to make a small change to the menu description...'</i> (Để tôi nói chuyện với bếp trưởng. Cô ấy bảo đổi sang ớt chuông đỏ và chỉnh sửa mô tả trên thực đơn). Các chi tiết về đầu bếp (chef) và thực đơn (menu) chứng minh đây là <b>(C) A restaurant</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Overview",
                "strategyHint": "Các từ khóa chef, menu description chỉ ra bối cảnh nhà hàng ẩm thực."
            },
            {
                "id": "ets22_t4_p7_154",
                "number": 154,
                "text": "At 3:27 P.M., what does Mr. Farley mean when he writes, “I’m afraid we are all out”?",
                "options": {
                    "A": "Staff members have no more ideas.",
                    "B": "A deadline was missed.",
                    "C": "Employees have left the workplace.",
                    "D": "An item is not available."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Vào lúc 3:27 chiều, ông Farley có ý gì khi viết: 'Tôi e rằng chúng ta đã hết sạch rồi'?<br/>(A) Nhân viên không còn ý tưởng nào.<br/>(B) Bị lỡ hạn chót.<br/>(C) Nhân viên đã rời khỏi nơi làm việc.<br/>(D) Một mặt hàng/nguyên liệu không còn sẵn có.</p><p><b>Bằng chứng trích dẫn:</b> Ở tin nhắn trước (3:24 P.M.), Lisa hỏi: <i>'Can you check to see if we have any frozen tomato sauce on hand from last week?'</i>. Travis trả lời <i>'I'm afraid we are all out'</i> mang nghĩa sốt cà chua đông lạnh trong bếp đã hết (không còn sẵn có). Chọn <b>(D) An item is not available</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Implication",
                "strategyHint": "be all out of something = không còn món đồ/nguyên liệu đó nữa."
            }
        ]
    },

    # Set 5: Q155 - Q157 (Notice with Text Insertion)
    {
        "id": "ets22_t4_p7_s05",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s05_p1",
                "type": "Notice",
                "title": "Club Notice",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0;'>Attention, Members of the Belle Coffee Club:</h3>"
                           "<p>— [1] —. Next week, Belle Coffee will debut our newest coffee creation, the Latte Slow Brew. — [2] —. Members of the Belle Coffee Club can get their first taste of this new treat at our flagship store at 200 Wellington Street. We invite you to stop by on January 12 and show your membership card for a complimentary cup of Latte Slow Brew and a pastry sample from our local partner, Yonge Confections. Choose from a variety of their fresh-baked muffins, including a flavour baked especially for Belle Coffee: the chocolate espresso muffin. — [3] —.</p>"
                           "<p>Rollout at our other Belle Coffee locations will follow over the next four weeks. To learn more, visit bellecoffee.ca. — [4] —.</p>"
                           "<p>Enjoy!</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_155",
                "number": 155,
                "text": "What will Belle Coffee do on January 12?",
                "options": {
                    "A": "Merge with Yonge Confections",
                    "B": "Open a second location",
                    "C": "Introduce a new product",
                    "D": "Start a membership program"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Belle Coffee sẽ làm gì vào ngày 12 tháng 1?<br/>(A) Sáp nhập với Yonge Confections.<br/>(B) Mở một địa điểm thứ hai.<br/>(C) Giới thiệu một sản phẩm mới.<br/>(D) Bắt đầu chương trình hội viên.</p><p><b>Bằng chứng trích dẫn:</b> Thông báo ghi: <i>'Belle Coffee will debut our newest coffee creation, the Latte Slow Brew. ... We invite you to stop by on January 12 ... for a complimentary cup of Latte Slow Brew...'</i>. <i>Debut / newest creation = Introduce a new product</i>. Chọn <b>(C) Introduce a new product</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "debut newest coffee creation = introduce a new product."
            },
            {
                "id": "ets22_t4_p7_156",
                "number": 156,
                "text": "According to the notice, what is available on the Web site?",
                "options": {
                    "A": "A coupon",
                    "B": "A recipe",
                    "C": "An application form",
                    "D": "A schedule"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo thông báo, điều gì có sẵn trên trang web?<br/>(A) Phiếu giảm giá.<br/>(B) Công thức pha chế.<br/>(C) Mẫu đơn đăng ký.<br/>(D) Lịch trình ra mắt.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn cuối viết: <i>'Rollout at our other Belle Coffee locations will follow over the next four weeks. To learn more, visit bellecoffee.ca.'</i> (Kế hoạch triển khai tại các chi nhánh khác sẽ diễn ra trong 4 tuần tới, xem thêm tại trang web). Trang web chứa lịch trình triển khai mở rộng <b>(D) A schedule</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Liên kết 'Rollout over the next four weeks' với thông tin trên trang web -> lịch trình (schedule)."
            },
            {
                "id": "ets22_t4_p7_157",
                "number": 157,
                "text": "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n\n“Additional coffee products and pastries will be available for purchase.”",
                "options": {
                    "A": "[1]",
                    "B": "[2]",
                    "C": "[3]",
                    "D": "[4]"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Vị trí nào trong số [1], [2], [3] và [4] là phù hợp nhất cho câu văn sau đây?\n'Các sản phẩm cà phê và bánh ngọt bổ sung sẽ có sẵn để mua.'<br/>(A) [1]<br/>(B) [2]<br/>(C) [3]<br/>(D) [4]</p><p><b>Bằng chứng trích dẫn:</b> Đoạn văn trước vị trí [3] nói về việc phát cà phê và bánh muffin dùng thử miễn phí (<i>complimentary cup ... and a pastry sample</i>). Đặt câu thông báo rằng khách cũng có thể mua thêm các sản phẩm cà phê và bánh ngọt khác tại vị trí <b>[3]</b> là hoàn toàn tự nhiên và liền mạch. Chọn <b>(C) [3]</b>.</p>",
                "questionType": "Sentence Insertion",
                "subCategory": "Sentence Insertion",
                "strategyHint": "Câu chèn nói về việc mua thêm coffee products and pastries, tiếp nối ngay sau câu tặng đồ nếm thử miễn phí."
            }
        ]
    }
]

with open("scratch/test4_p7_part1.json", "w", encoding="utf-8") as f:
    json.dump(part1_sets, f, ensure_ascii=False, indent=2)

print("Part 1 (Sets 1-5, Q147-Q157) built successfully with", len(part1_sets), "sets and", sum(len(s["questions"]) for s in part1_sets), "questions.")
