import json

part7_data = [
  # Set 1: Q147-148 (Text-message chain)
  {
    "id": "ets22_t3_p7_s01",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s01_p1",
        "type": "Text Message",
        "title": "Text-Message Chain",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>Jun Kambayashi [10:12 A.M.]</b><br/>Rachel, it looks as if Mr. Tanaka's flight will be arriving 30 minutes earlier this afternoon. I'm on my way to pick him up.</p><p><b>Rachel Newman [10:13 A.M.]</b><br/>The staff are excited that he finally is going to be working with us here. Do you think the two of you have time to stop here in the office before the end of the workday?</p><p><b>Jun Kambayashi [10:14 A.M.]</b><br/>Probably. And I agree; Mr. Tanaka has done great work at our Chiba branch.</p><p><b>Rachel Newman [10:15 A.M.]</b><br/>So I've always heard. It would be nice for him to get a quick tour of the lab and meet some members of the team before our welcome dinner.</p><p><b>Jun Kambayashi [10:16 A.M.]</b><br/>Sounds good. Since flight schedules can be unpredictable, I'll keep you posted as I arrive at the airport.</p><p><b>Rachel Newman [10:17 A.M.]</b><br/>Perfect. See you later.</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_147",
        "number": 147,
        "text": "Who most likely is Mr. Tanaka?",
        "options": {
          "A": "A new laboratory owner",
          "B": "An important client",
          "C": "A transferred staff member",
          "D": "An airline pilot"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Ông Tanaka có nhiều khả năng là ai nhất?<br/>(A) Chủ sở hữu phòng thí nghiệm mới.<br/>(B) Một khách hàng quan trọng.<br/>(C) Một nhân viên được điều chuyển công tác.<br/>(D) Phi công lái máy bay.</p><p><b>Bằng chứng trích dẫn:</b> Rachel viết: <i>'The staff are excited that he finally is going to be working with us here'</i> và Jun viết: <i>'Mr. Tanaka has done great work at our Chiba branch.'</i> (Ông Tanaka đã làm việc rất tốt tại chi nhánh Chiba của chúng ta). Điều này chứng minh ông Tanaka là nhân viên cùng công ty chuyển từ chi nhánh Chiba đến: <b>(C) A transferred staff member</b>.</p>",
        "questionType": "Inference",
        "subCategory": "Inference",
        "strategyHint": "Kết hợp thông tin nhân viên hào hứng vì ông ấy sắp làm việc tại đây và việc ông ấy từng làm ở chi nhánh Chiba."
      },
      {
        "id": "ets22_t3_p7_148",
        "number": 148,
        "text": "At 10:16 A.M., what does Mr. Kambayashi mean when he writes, “Sounds good”?",
        "options": {
          "A": "He is pleased with the dinner arrangements.",
          "B": "He likes the idea of stopping by the office before dinner.",
          "C": "He appreciates Mr. Tanaka’s professional reputation.",
          "D": "He is glad that team members have completed their work."
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Vào lúc 10:16 sáng, ông Kambayashi có ý gì khi viết 'Sounds good'?<br/>(A) Ông ấy hài lòng với việc sắp xếp bữa tối.<br/>(B) Ông ấy thích ý tưởng ghé qua văn phòng trước bữa tối.<br/>(C) Ông ấy đánh giá cao danh tiếng chuyên môn của ông Tanaka.<br/>(D) Ông ấy mừng vì các thành viên trong nhóm đã hoàn thành công việc.</p><p><b>Bằng chứng trích dẫn:</b> Ngay trước đó, lúc 10:15, Rachel gợi ý: <i>'It would be nice for him to get a quick tour of the lab and meet some members of the team before our welcome dinner.'</i> Câu trả lời <i>'Sounds good'</i> ở 10:16 của Jun thể hiện sự đồng ý với đề xuất dẫn ông Tanaka ghé qua văn phòng/lab trước bữa tối: <b>(B) He likes the idea of stopping by the office before dinner.</b></p>",
        "questionType": "Inference",
        "subCategory": "Implication",
        "strategyHint": "Đọc tin nhắn ngay trước câu nói ở 10:16 để tìm đối tượng được phản hồi."
      }
    ]
  },
  # Set 2: Q149-150 (E-mail)
  {
    "id": "ets22_t3_p7_s02",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s02_p1",
        "type": "E-mail",
        "title": "E-Mail Message",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>From:</b> jenkins@ourmarketfocus.au<br/><b>To:</b> hardesty@gallusmail.au<br/><b>Date:</b> 11 August<br/><b>Subject:</b> Workshop Notice</p><p>Dear Ms. Hardesty,</p><p>This is to share an important change concerning the 18 August, 4 P.M. Marketing Skills Workshop. Because many more attendees have signed up, we have changed the location of our event to The Rill Inn, PERTH.</p><p>Please acknowledge you are aware of the update. I would appreciate it if you could treat this request as urgent and reply as soon as convenient. Should you have any questions about participation, you can e-mail me.</p><p>Thank you,<br/>Andrew Jenkins<br/>Workshop Organizer</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_149",
        "number": 149,
        "text": "What is the purpose of the e-mail?",
        "options": {
          "A": "To cancel an event",
          "B": "To announce a new venue",
          "C": "To recruit new workshop presenters",
          "D": "To request volunteers for a workshop"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của email là gì?<br/>(A) Hủy một sự kiện.<br/>(B) Thông báo một địa điểm tổ chức mới.<br/>(C) Tuyển người thuyết trình hội thảo mới.<br/>(D) Yêu cầu tình nguyện viên cho hội thảo.</p><p><b>Bằng chứng trích dẫn:</b> Email viết: <i>'Because many more attendees have signed up, we have changed the location of our event to The Rill Inn, PERTH.'</i> (Vì có nhiều người đăng ký tham dự hơn, chúng tôi đã thay đổi địa điểm sự kiện sang The Rill Inn, Perth). Do đó mục đích là thông báo địa điểm mới: <b>(B) To announce a new venue</b>.</p>",
        "questionType": "Purpose",
        "subCategory": "Overview",
        "strategyHint": "Tìm cụm từ 'changed the location of our event to...' để xác định mục đích."
      },
      {
        "id": "ets22_t3_p7_150",
        "number": 150,
        "text": "What is Ms. Hardesty asked to do?",
        "options": {
          "A": "Share the notice with other attendees",
          "B": "Choose a convenient time to meet",
          "C": "Confirm receipt of the message",
          "D": "Update her contact information"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Cô Hardesty được yêu cầu làm gì?<br/>(A) Chia sẻ thông báo với những người tham dự khác.<br/>(B) Chọn thời gian thuận tiện để gặp mặt.<br/>(C) Xác nhận đã nhận được tin nhắn.<br/>(D) Cập nhật thông tin liên hệ của mình.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 nêu rõ: <i>'Please acknowledge you are aware of the update. I would appreciate it if you could treat this request as urgent and reply as soon as convenient.'</i> (Vui lòng xác nhận bạn đã nắm được thông tin cập nhật...). Xác nhận đã biết/nhận tin tương đương với <b>(C) Confirm receipt of the message</b>.</p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm 'Please acknowledge' đồng nghĩa với 'Confirm receipt'."
      }
    ]
  },
  # Set 3: Q151-152 (Advertisement)
  {
    "id": "ets22_t3_p7_s03",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s03_p1",
        "type": "Advertisement",
        "title": "Advertisement",
        "content": "<div style='border: 2px dashed var(--border-color, #444); border-radius: 8px; padding: 20px; text-align: center;'><h2 style='margin-top:0;'>Virens</h2><p style='font-size: 1.1em;'>Come to Virens for the best televisions, phones, tablets, and more!</p><h3 style='color: #0284c7;'>Grand Opening Celebration</h3><p>featuring comedian and DJ Declan Gibb from radio station KYX 93.8<br/><b>Saturday, October 2, 10:00 A.M.-8:00 P.M.</b><br/>234 Morris Avenue, next to Mike's Pizza</p><p style='font-style: italic;'>Complimentary snacks from Sarah's Bakery—home of Sarah's delicious pastries!</p><div style='border: 1px solid #999; padding: 10px; margin-top: 15px;'><p style='margin:0;'><b>Bring this ad for $5 off a purchase of $10 or more.</b><br/>Valid throughout October.</p></div></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_151",
        "number": 151,
        "text": "What type of business is Virens?",
        "options": {
          "A": "A pastry shop",
          "B": "A radio station",
          "C": "An electronics store",
          "D": "A pizza restaurant"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Virens là loại hình kinh doanh nào?<br/>(A) Tiệm bánh ngọt.<br/>(B) Đài phát thanh.<br/>(C) Cửa hàng đồ điện tử.<br/>(D) Quán pizza.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn quảng cáo mở đầu: <i>'Come to Virens for the best televisions, phones, tablets, and more!'</i> (Hãy đến Virens để có tivi, điện thoại, máy tính bảng tốt nhất...). Đây là các thiết bị điện tử, do đó Virens là cửa hàng điện tử: <b>(C) An electronics store</b>.</p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Nhìn vào danh mục sản phẩm: televisions, phones, tablets."
      },
      {
        "id": "ets22_t3_p7_152",
        "number": 152,
        "text": "According to the advertisement, what will happen on October 2?",
        "options": {
          "A": "Declan Gibb will perform at an event.",
          "B": "Two businesses will move to new locations.",
          "C": "A new product will be launched.",
          "D": "A coupon will expire."
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Theo quảng cáo, điều gì sẽ diễn ra vào ngày 2 tháng 10?<br/>(A) Declan Gibb sẽ biểu diễn tại một sự kiện.<br/>(B) Hai doanh nghiệp sẽ chuyển đến địa điểm mới.<br/>(C) Một sản phẩm mới sẽ được ra mắt.<br/>(D) Một phiếu giảm giá sẽ hết hạn.</p><p><b>Bằng chứng trích dẫn:</b> Dòng thông tin về sự kiện khai trương: <i>'Grand Opening Celebration featuring comedian and DJ Declan Gibb... Saturday, October 2, 10:00 A.M.-8:00 P.M.'</i>. Declan Gibb là diễn viên hài và DJ sẽ biểu diễn tại sự kiện: <b>(A) Declan Gibb will perform at an event.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Quét mốc thời gian Saturday, October 2 và đối chiếu người biểu diễn Declan Gibb."
      }
    ]
  },
  # Set 4: Q153-154 (Web page)
  {
    "id": "ets22_t3_p7_s04",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s04_p1",
        "type": "Web Page",
        "title": "Web Page",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p style='color: #666; font-size: 0.9em; margin-top:0;'>http://www.officenature.com</p><h3>Want to boost the health and morale of your employees?</h3><p>Office Nature delivers a box filled with delicious food right to your break room.</p><p><b>We focus on the following:</b></p><ul><li>providing natural treats such as nuts, granola, and dried fruit</li><li>working with local farmers to provide the freshest options</li><li>reducing impact on the environment</li><li>offering foods at reasonable prices</li></ul><p>Just choose your selections and delivery day, and a fresh box of healthy food items will be brought automatically each week. First-time customers receive 10% off their order with code YUM.</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_153",
        "number": 153,
        "text": "For whom is the Web page most likely intended?",
        "options": {
          "A": "Farmers",
          "B": "Business owners",
          "C": "Company employees",
          "D": "Office Nature staff"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Trang web này có nhiều khả năng hướng tới đối tượng nào nhất?<br/>(A) Nông dân.<br/>(B) Chủ doanh nghiệp.<br/>(C) Nhân viên công ty.<br/>(D) Nhân viên Office Nature.</p><p><b>Bằng chứng trích dẫn:</b> Câu tiêu đề: <i>'Want to boost the health and morale of your employees? Office Nature delivers a box filled with delicious food right to your break room.'</i> (Bạn muốn nâng cao sức khỏe và tinh thần của nhân viên mình? Office Nature giao hộp đồ ăn trực tiếp đến phòng nghỉ của bạn). Người có nhân viên (your employees) là người sử dụng lao động/chủ doanh nghiệp: <b>(B) Business owners</b>.</p>",
        "questionType": "Audience",
        "subCategory": "Overview",
        "strategyHint": "Cụm 'boost the health and morale of your employees' hướng tới người quản lý hoặc chủ doanh nghiệp."
      },
      {
        "id": "ets22_t3_p7_154",
        "number": 154,
        "text": "What is indicated about Office Nature?",
        "options": {
          "A": "It delivers healthy snacks.",
          "B": "It offers weekly discounts.",
          "C": "It makes its own baked goods.",
          "D": "It grows its own fruit."
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về Office Nature?<br/>(A) Công ty giao đồ ăn nhẹ lành mạnh.<br/>(B) Công ty giảm giá hàng tuần.<br/>(C) Công ty tự nướng bánh ngọt.<br/>(D) Công ty tự trồng trái cây.</p><p><b>Bằng chứng trích dẫn:</b> Các đặc điểm được liệt kê: <i>'providing natural treats such as nuts, granola, and dried fruit'</i> và <i>'delivers a fresh box of healthy food items... automatically each week'</i>. Các loại hạt, ngũ cốc, hoa quả khô là đồ ăn nhẹ lành mạnh (healthy snacks): <b>(A) It delivers healthy snacks.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Đối chiếu 'natural treats (nuts, granola, dried fruit)' với 'healthy snacks'."
      }
    ]
  },
  # Set 5: Q155-157 (Magazine article)
  {
    "id": "ets22_t3_p7_s05",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s05_p1",
        "type": "Article",
        "title": "Magazine Article",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><h3 style='margin-top:0;'>Spotlight on Geiger Travel</h3><p>Wanting to combine his passion for exploring places and cultures with his career as a corporate travel consultant, Marcus Geiger founded Geiger Travel Management (GTM). Now, ten years later, the company has offices in the United States, Canada, and several South American nations. It crafts itineraries and facilitates travel and accommodation arrangements for business professionals.</p><p>GTM also offers its clients secure, high-speed computers, conference call systems, and file management software through an agreement with Balefire Electronics, located in Mumbai. “We owe a lot of our success to Balefire,” says Mr. Geiger, “because their services enable our clients to work efficiently wherever they are.”</p><p>Mr. Geiger is optimistic that further growth is on the horizon for GTM. Two additional businesses, Apura Airways, based in Paramaribo, Suriname, and the restaurant chain Triggerfish, headquartered in Bridgetown, Barbados, have agreed to enter into strategic partnerships with GTM in August. And looking to launch operations in Europe, the company is currently in discussions with Krokushaus AG, a hospitality company with locations throughout Germany.</p><p>For more information about Geiger Travel Management, visit www.gtm.com.</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_155",
        "number": 155,
        "text": "What is indicated about Mr. Geiger?",
        "options": {
          "A": "He regularly goes to Mumbai for business.",
          "B": "He has overseen the expansion of a business.",
          "C": "He decided to become a travel writer ten years ago.",
          "D": "He used to work for a hospitality company."
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về ông Geiger?<br/>(A) Ông ấy thường xuyên đến Mumbai để công tác.<br/>(B) Ông ấy đã giám sát sự mở rộng của một doanh nghiệp.<br/>(C) Ông ấy quyết định trở thành người viết về du lịch 10 năm trước.<br/>(D) Ông ấy từng làm việc cho một công ty dịch vụ lưu trú.</p><p><b>Bằng chứng trích dẫn:</b> Bài báo viết: <i>'Marcus Geiger founded Geiger Travel Management (GTM). Now, ten years later, the company has offices in the United States, Canada, and several South American nations.'</i> (Marcus Geiger sáng lập GTM. Mười năm sau, công ty đã có văn phòng tại Mỹ, Canada và nhiều quốc gia Nam Mỹ). Việc mở rộng mạng lưới văn phòng quốc tế chứng minh ông ấy đã điều hành/giám sát sự mở rộng của doanh nghiệp: <b>(B) He has overseen the expansion of a business.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Tìm chi tiết về sự phát triển của công ty từ khi thành lập đến khi mở thêm nhiều văn phòng."
      },
      {
        "id": "ets22_t3_p7_156",
        "number": 156,
        "text": "What service does GTM offer?",
        "options": {
          "A": "Booking hotels for executives",
          "B": "Leading cross-cultural training workshops",
          "C": "Providing translation services at conferences",
          "D": "Furnishing overseas branch offices"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> GTM cung cấp dịch vụ gì?<br/>(A) Đặt phòng khách sạn cho các cấp quản lý/doanh nhân.<br/>(B) Tổ chức hội thảo đào tạo đa văn hóa.<br/>(C) Cung cấp dịch vụ dịch thuật tại hội nghị.<br/>(D) Trang bị nội thất cho văn phòng chi nhánh nước ngoài.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 viết: <i>'It crafts itineraries and facilitates travel and accommodation arrangements for business professionals.'</i> (Công ty xây dựng lịch trình và hỗ trợ sắp xếp việc đi lại và nơi ở cho các chuyên gia kinh doanh/doanh nhân). Sắp xếp nơi ở (accommodation arrangements) cho business professionals tương đương với <b>(A) Booking hotels for executives</b>.</p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm 'accommodation arrangements for business professionals' đồng nghĩa với 'booking hotels for executives'."
      },
      {
        "id": "ets22_t3_p7_157",
        "number": 157,
        "text": "GTM does NOT have an agreement in place with which company?",
        "options": {
          "A": "Balefire Electronics",
          "B": "Apura Airways",
          "C": "Triggerfish",
          "D": "Krokushaus AG"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> GTM KHÔNG có thỏa thuận sẵn có với công ty nào?<br/>(A) Balefire Electronics.<br/>(B) Apura Airways.<br/>(C) Triggerfish.<br/>(D) Krokushaus AG.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 và 3 nêu rõ: GTM đã có thỏa thuận với Balefire Electronics (<i>'agreement with Balefire Electronics'</i>), đã đạt thỏa thuận hợp tác chiến lược với Apura Airways và Triggerfish vào tháng 8 (<i>'have agreed to enter into strategic partnerships'</i>). Riêng với Krokushaus AG, công ty mới chỉ đang đàm phán (<i>'is currently in discussions with Krokushaus AG'</i>) chứ chưa có thỏa thuận chính thức: <b>(D) Krokushaus AG</b>.</p>",
        "questionType": "Negative",
        "subCategory": "Detail",
        "strategyHint": "Lưu ý câu phủ định NOT: phân biệt giữa 'agreement in place' (đã có) và 'currently in discussions' (mới đang thảo luận)."
      }
    ]
  }
]

print('Sets 1-5 compiled.')
