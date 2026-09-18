import json

# We already have sets 1-5 in scripts/build_test3_p7_data.py
import sys
sys.path.append('/Users/bravee06/toeic-learn/scripts')
from build_test3_p7_data import part7_data as sets_1_to_5

part7_sets_6_to_10 = [
  # Set 6: Q158-160 (Press Release)
  {
    "id": "ets22_t3_p7_s06",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s06_p1",
        "type": "Press Release",
        "title": "Press Release",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p style='color: #666; font-size: 0.9em; margin-top:0;'><b>FOR IMMEDIATE RELEASE</b><br/><b>Contact:</b> Sherylin Stevens, sstevens@tearsoncorp.ca</p><p><b>CALGARY (2 November)</b>—Yves Vernier, the Chief Information Officer of the Tearson Corporation, announced on Monday that 200 robots will soon appear in Tearson's grocery stores. The robots, which are all named Bailey, will be used to locate areas where boxes or bottles have fallen and broken, spilling cereal, juice, or other substances onto the floor. The robots will report the spills so that the locations can be cleaned by store employees before they become safety hazards.</p><p>The robots were tested in Calgary, where Tearson's head office is located. During the eighteen-month pilot programme, store managers consistently gave the robots high marks. Although the robots have been used in the company's warehouses for several years, this will be their first time working in stores and interacting with customers. All Tearson stores should have the robots by the beginning of December.</p><p style='font-size: 0.9em;'>For more information, visit Tearson Corporation at www.tearsoncorporation.ca.</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_158",
        "number": 158,
        "text": "What is the topic of the press release?",
        "options": {
          "A": "The promotion of a company executive",
          "B": "The use of technology in stores",
          "C": "The launch of new product lines",
          "D": "The relocation of a company’s head office"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Chủ đề của thông cáo báo chí là gì?<br/>(A) Sự thăng chức của một giám đốc công ty.<br/>(B) Việc sử dụng công nghệ trong các cửa hàng.<br/>(C) Việc ra mắt các dòng sản phẩm mới.<br/>(D) Việc chuyển địa điểm trụ sở chính của công ty.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 thông báo: <i>'200 robots will soon appear in Tearson’s grocery stores. The robots, which are all named Bailey, will be used to locate areas where boxes or bottles have fallen...'</i>. Việc đưa 200 robot vào hoạt động trong các cửa hàng tạp hóa là việc áp dụng công nghệ vào cửa hàng: <b>(B) The use of technology in stores</b>.</p>",
        "questionType": "Topic",
        "subCategory": "Overview",
        "strategyHint": "Xác định chủ đề chính qua câu mở đầu về việc triển khai 200 robot trong các cửa hàng."
      },
      {
        "id": "ets22_t3_p7_159",
        "number": 159,
        "text": "What can Bailey do?",
        "options": {
          "A": "Clean a mess on the floor",
          "B": "Create labels for products",
          "C": "Find areas that have spills",
          "D": "Locate items for customers"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Bailey có thể làm gì?<br/>(A) Dọn dẹp đồ bẩn trên sàn.<br/>(B) Tạo nhãn cho sản phẩm.<br/>(C) Tìm các khu vực bị đổ tràn chất lỏng/thức ăn.<br/>(D) Định vị mặt hàng cho khách hàng.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 nêu rõ chức năng của robot Bailey: <i>'will be used to locate areas where boxes or bottles have fallen and broken, spilling cereal, juice, or other substances onto the floor. The robots will report the spills so that the locations can be cleaned by store employees...'</i>. Lưu ý: nhân viên cửa hàng mới là người dọn, còn robot làm nhiệm vụ phát hiện/định vị nơi bị đổ tràn: <b>(C) Find areas that have spills</b>.</p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Tránh bẫy đáp án (A): robot chỉ phát hiện (locate/find) chứ không tự dọn (clean)."
      },
      {
        "id": "ets22_t3_p7_160",
        "number": 160,
        "text": "What is suggested in the press release?",
        "options": {
          "A": "A pilot program in Calgary was a success.",
          "B": "Tearson stores will be renovated in December.",
          "C": "A warehouse earned high marks for safety features.",
          "D": "Managers will be hired in several stores."
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được ngụ ý trong thông cáo báo chí?<br/>(A) Chương trình thử nghiệm tại Calgary đã thành công.<br/>(B) Các cửa hàng Tearson sẽ được cải tạo vào tháng 12.<br/>(C) Một nhà kho nhận được điểm đánh giá cao về tính năng an toàn.<br/>(D) Các nhà quản lý sẽ được tuyển dụng tại một số cửa hàng.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 viết: <i>'The robots were tested in Calgary... During the eighteen-month pilot programme, store managers consistently gave the robots high marks.'</i> (Các robot đã được thử nghiệm tại Calgary... Trong suốt chương trình thí điểm 18 tháng, các quản lý cửa hàng liên tục cho robot điểm số cao). Điểm đánh giá cao liên tục chứng tỏ chương trình thử nghiệm đã thành công: <b>(A) A pilot program in Calgary was a success.</b></p>",
        "questionType": "Inference",
        "subCategory": "Inference",
        "strategyHint": "Cụm 'store managers consistently gave the robots high marks' ngụ ý 'pilot program was a success'."
      }
    ]
  },
  # Set 7: Q161-163 (E-mail)
  {
    "id": "ets22_t3_p7_s07",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s07_p1",
        "type": "E-mail",
        "title": "E-mail",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>From:</b> Helen Dietrich &lt;hdietrich@morphospublishing.ca&gt;<br/><b>To:</b> Alia Cervantes &lt;alia.cervantes@gotomail.ca&gt;<br/><b>Date:</b> 3 March<br/><b>Subject:</b> Practical Gardening</p><p>Dear Ms. Cervantes:</p><p>I am sorry to report that next month's issue of <i>Practical Gardening</i> will be our last. After 62 years of monthly issues, we at Morphos Publishing have decided that <i>Practical Gardening</i> will be among the periodicals that we must discontinue. We plan to redirect the resources gained through cost-cutting toward growing our book publishing and instructional video production businesses.</p><p>We are grateful for your support as a longtime subscriber to <i>Practical Gardening</i>. For the remainder of your subscription term, we hope you will allow us to instead send you <i>Flora Discovery</i>, our popular publication about wild plants. However, if you would rather have the balance of your subscription account refunded to you, please contact us at (822) 555-0127.</p><p>Sincerely,<br/>Helen Dietrich<br/>Subscription Manager, Morphos Publishing</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_161",
        "number": 161,
        "text": "What is the purpose of the e-mail?",
        "options": {
          "A": "To apologize for a delay",
          "B": "To promote a new product",
          "C": "To announce a cancellation",
          "D": "To address a billing error"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của email là gì?<br/>(A) Xin lỗi vì sự chậm trễ.<br/>(B) Quảng bá một sản phẩm mới.<br/>(C) Thông báo về việc ngừng xuất bản/hủy bỏ.<br/>(D) Giải quyết lỗi thanh toán.</p><p><b>Bằng chứng trích dẫn:</b> Người gửi thông báo: <i>'I am sorry to report that next month’s issue of Practical Gardening will be our last... among the periodicals that we must discontinue.'</i> (Tôi rất tiếc phải thông báo số báo tháng tới sẽ là số cuối cùng... nằm trong số các ấn phẩm định kỳ chúng tôi phải ngừng phát hành). Do đó mục đích là thông báo dừng xuất bản: <b>(C) To announce a cancellation</b>.</p>",
        "questionType": "Purpose",
        "subCategory": "Overview",
        "strategyHint": "Từ khóa 'will be our last' và 'discontinue' đồng nghĩa với 'announcing a cancellation'."
      },
      {
        "id": "ets22_t3_p7_162",
        "number": 162,
        "text": "What most likely is Practical Gardening?",
        "options": {
          "A": "A film",
          "B": "A book",
          "C": "A Web site",
          "D": "A magazine"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Practical Gardening nhiều khả năng là gì nhất?<br/>(A) Một bộ phim.<br/>(B) Một cuốn sách.<br/>(C) Một trang web.<br/>(D) Một cuốn tạp chí.</p><p><b>Bằng chứng trích dẫn:</b> Văn bản nói: <i>'After 62 years of monthly issues... among the periodicals...'</i> và <i>'subscriber'</i>. Một ấn phẩm phát hành định kỳ hàng tháng (monthly issues / periodicals) với độc giả đăng ký định kỳ chính là tạp chí: <b>(D) A magazine</b>.</p>",
        "questionType": "Inference",
        "subCategory": "Inference",
        "strategyHint": "Các từ khóa 'monthly issues', 'periodicals', 'subscriber' đặc trưng cho tạp chí."
      },
      {
        "id": "ets22_t3_p7_163",
        "number": 163,
        "text": "The word “balance” in paragraph 2, line 4 is closest in meaning to",
        "options": {
          "A": "amount remaining",
          "B": "stability",
          "C": "increase in cost",
          "D": "production"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Từ 'balance' ở đoạn 2, dòng 4 có nghĩa gần nhất với từ nào?<br/>(A) số tiền còn lại.<br/>(B) sự ổn định.<br/>(C) sự tăng chi phí.<br/>(D) sự sản xuất.</p><p><b>Bằng chứng trích dẫn:</b> Trong ngữ cảnh tài chính tài khoản đăng ký báo: <i>'have the balance of your subscription account refunded to you'</i> (nhận lại số dư/khoản tiền còn lại trong tài khoản đăng ký). Từ <i>balance</i> ở đây mang nghĩa số dư tài khoản hay số tiền còn lại: <b>(A) amount remaining</b>.</p>",
        "questionType": "Vocabulary",
        "subCategory": "Vocabulary in Context",
        "strategyHint": "Trong ngữ cảnh tài chính ngân hàng/thuê bao, 'balance' luôn mang nghĩa số dư (amount remaining)."
      }
    ]
  },
  # Set 8: Q164-167 (Online chat discussion)
  {
    "id": "ets22_t3_p7_s08",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s08_p1",
        "type": "Chat",
        "title": "Online Chat Discussion",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>Lindsay Pokora [2:15 P.M.]</b><br/>Hello, Mr. Kopalinski. I need to place the monthly office supplies order. In addition to the regular items, can you let me know if anything extra is needed?</p><p><b>Craig Kopalinski [2:17 P.M.]</b><br/>Let me check with the other managers. Kaitlyn and Jeffrey, do you have any requests for office supplies in your departments?</p><p><b>Kaitlyn Daley [2:18 P.M.]</b><br/>Yes, we need more whiteboard markers.</p><p><b>Craig Kopalinski [2:19 P.M.]</b><br/>And how about accounting?</p><p><b>Jeffrey Carden [2:20 P.M.]</b><br/>Nothing here.</p><p><b>Lindsay Pokora [2:22 P.M.]</b><br/>Markers? I just checked our inventory and we still have a box in the supply room. Do you need a special kind?</p><p><b>Kaitlyn Daley [2:23 P.M.]</b><br/>No, just regular black markers. Three boxes should be enough. I tried some markers from the box we have, but they seem to have dried up. A group of new employees will be starting next week, and we'll need markers for the orientation and training sessions.</p><p><b>Craig Kopalinski [2:24 P.M.]</b><br/>OK. Lindsay, in addition to those markers, could you please order a new chair for the second-floor conference room to replace the one that is broken? You'll need to look up the model number. Thanks.</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_164",
        "number": 164,
        "text": "At 2:20 P.M., what does Mr. Carden most likely mean when he writes, “Nothing here”?",
        "options": {
          "A": "He has not heard from Ms. Pokora.",
          "B": "He does not need to place an order.",
          "C": "He does not have extra markers.",
          "D": "He has not checked the supply room."
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Vào lúc 2:20 chiều, ông Carden có ý gì nhất khi viết 'Nothing here'?<br/>(A) Ông ấy chưa nhận được tin từ cô Pokora.<br/>(B) Ông ấy không cần đặt thêm món đồ nào.<br/>(C) Ông ấy không có bút dạ thừa.<br/>(D) Ông ấy chưa kiểm tra phòng vật tư.</p><p><b>Bằng chứng trích dẫn:</b> Craig hỏi lúc 2:19: <i>'And how about accounting?'</i> (sau khi đã hỏi các bộ phận xem có cần thêm văn phòng phẩm gì không). Jeffrey trả lời <i>'Nothing here'</i> ngụ ý bộ phận kế toán của anh ấy không cần yêu cầu thêm đồ gì trong đợt đặt hàng này: <b>(B) He does not need to place an order.</b></p>",
        "questionType": "Inference",
        "subCategory": "Implication",
        "strategyHint": "Xem xét câu hỏi trước đó của Craig về nhu cầu đặt đồ của các phòng ban."
      },
      {
        "id": "ets22_t3_p7_165",
        "number": 165,
        "text": "What problem does Ms. Daley report?",
        "options": {
          "A": "Some presentations are too long.",
          "B": "Expenses in the office have increased.",
          "C": "Some office supplies cannot be used.",
          "D": "The conference room is not big enough."
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Cô Daley báo cáo vấn đề gì?<br/>(A) Một số bài thuyết trình quá dài.<br/>(B) Chi phí văn phòng đã tăng lên.<br/>(C) Một số đồ dùng văn phòng không thể sử dụng được.<br/>(D) Phòng hội nghị không đủ lớn.</p><p><b>Bằng chứng trích dẫn:</b> Kaitlyn Daley nói ở 2:23: <i>'I tried some markers from the box we have, but they seem to have dried up.'</i> (Tôi đã thử vài cây bút trong hộp chúng ta có sẵn nhưng chúng dường như đã bị khô mực hết rồi). Bút dạ bị khô không viết được tức là đồ dùng văn phòng không sử dụng được: <b>(C) Some office supplies cannot be used.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Chi tiết 'markers seem to have dried up' đồng nghĩa với 'supplies cannot be used'."
      },
      {
        "id": "ets22_t3_p7_166",
        "number": 166,
        "text": "In what department does Ms. Daley most likely work?",
        "options": {
          "A": "Accounting",
          "B": "Human Resources",
          "C": "Purchasing",
          "D": "Shipping"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Cô Daley nhiều khả năng làm việc ở bộ phận nào nhất?<br/>(A) Kế toán.<br/>(B) Nhân sự (HR).<br/>(C) Thu mua.<br/>(D) Vận chuyển.</p><p><b>Bằng chứng trích dẫn:</b> Cô Daley giải thích lý do cần bút dạ: <i>'A group of new employees will be starting next week, and we'll need markers for the orientation and training sessions.'</i> (Một nhóm nhân viên mới sẽ bắt đầu đi làm vào tuần tới và chúng tôi cần bút cho các buổi định hướng và đào tạo). Bộ phận phụ trách đón nhân viên mới, định hướng và đào tạo chính là phòng Nhân sự: <b>(B) Human Resources</b>.</p>",
        "questionType": "Inference",
        "subCategory": "Inference",
        "strategyHint": "Cụm từ 'new employees... orientation and training sessions' gắn liền với chức năng của phòng Nhân sự."
      },
      {
        "id": "ets22_t3_p7_167",
        "number": 167,
        "text": "What will Ms. Pokora most likely do next?",
        "options": {
          "A": "Locate some information",
          "B": "Review a training document",
          "C": "Conduct an orientation session",
          "D": "Contact department managers"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Cô Pokora có nhiều khả năng sẽ làm gì tiếp theo?<br/>(A) Tìm kiếm một số thông tin.<br/>(B) Xem lại tài liệu đào tạo.<br/>(C) Tiến hành buổi định hướng.<br/>(D) Liên hệ với các quản lý bộ phận.</p><p><b>Bằng chứng trích dẫn:</b> Craig Kopalinski dặn dò cô Pokora ở tin nhắn cuối: <i>'could you please order a new chair for the second-floor conference room to replace the one that is broken? You’ll need to look up the model number.'</i> (Bạn sẽ cần phải tra cứu số hiệu mẫu mã của chiếc ghế). Việc tra cứu mã sản phẩm (look up the model number) tương đương với việc tìm kiếm thông tin: <b>(A) Locate some information</b>.</p>",
        "questionType": "Next Action",
        "subCategory": "Next Action",
        "strategyHint": "Cụm từ 'look up the model number' đồng nghĩa với 'locate some information'."
      }
    ]
  },
  # Set 9: Q168-171 (E-mail)
  {
    "id": "ets22_t3_p7_s09",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s09_p1",
        "type": "E-mail",
        "title": "E-mail",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>To:</b> All staff<br/><b>From:</b> Jan Merchant<br/><b>Date:</b> October 15<br/><b>Subject:</b> Reginald Carmen</p><p>Dear Colleagues,</p><p>It is my pleasure to welcome Reginald Carmen to Edmonton Engineering Consultants, LLC. With his expertise in engineering and education, Dr. Carmen will be a valuable addition to our distinguished staff. — [1] —. Upon graduating from university, he spent six years designing telecommunications systems for AstroPart, Inc. — [2] —. He comes to us directly from the Glasse School of Engineering, where he spent the past nineteen years. While there, he served as a full-time professor for ten years, teaching advanced mathematics and various special courses in engineering. — [3] —. He was then appointed president of the school and served in that position for the remaining nine years of his tenure. During that time, he led the team that redesigned the school's electrical engineering curriculum. — [4] —.</p><p>Dr. Carmen's first day will be next Tuesday.</p><p>Jan Merchant, Director of Personnel</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_168",
        "number": 168,
        "text": "Why did Ms. Merchant send the e-mail?",
        "options": {
          "A": "To announce that she is retiring",
          "B": "To provide details about a new employee",
          "C": "To welcome a distinguished guest presenter",
          "D": "To publicize expansion into a new line of business"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Tại sao cô Merchant gửi email?<br/>(A) Để thông báo cô ấy sắp nghỉ hưu.<br/>(B) Để cung cấp thông tin chi tiết về một nhân viên mới.<br/>(C) Để chào đón một diễn giả khách mời xuất sắc.<br/>(D) Để công bố việc mở rộng sang lĩnh vực kinh doanh mới.</p><p><b>Bằng chứng trích dẫn:</b> Email mở đầu: <i>'It is my pleasure to welcome Reginald Carmen to Edmonton Engineering Consultants, LLC... Dr. Carmen’s first day will be next Tuesday.'</i>. Toàn bộ nội dung nêu kinh nghiệm và học vấn của Tiến sĩ Carmen chuẩn bị vào làm việc, do đó mục đích là giới thiệu nhân viên mới: <b>(B) To provide details about a new employee</b>.</p>",
        "questionType": "Purpose",
        "subCategory": "Overview",
        "strategyHint": "Nhận diện thể loại email chào mừng nhân viên mới (welcome ... Dr. Carmen's first day will be next Tuesday)."
      },
      {
        "id": "ets22_t3_p7_169",
        "number": 169,
        "text": "What is indicated about Dr. Carmen?",
        "options": {
          "A": "He has experience designing communications systems.",
          "B": "He worked as a consultant for Edmonton Engineering Consultants in the past.",
          "C": "He mentored Ms. Merchant at another company.",
          "D": "He graduated from the Glasse School of Engineering."
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về Tiến sĩ Carmen?<br/>(A) Ông ấy có kinh nghiệm thiết kế hệ thống truyền thông.<br/>(B) Ông ấy từng làm cố vấn cho Edmonton Engineering Consultants trong quá khứ.<br/>(C) Ông ấy từng cố vấn cho cô Merchant tại công ty khác.<br/>(D) Ông ấy đã tốt nghiệp từ Trường Kỹ thuật Glasse.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn văn viết: <i>'Upon graduating from university, he spent six years designing telecommunications systems for AstroPart, Inc.'</i> (Sau khi tốt nghiệp đại học, ông dành 6 năm thiết kế hệ thống viễn thông cho AstroPart, Inc.). Telecommunications systems tương đương với communications systems: <b>(A) He has experience designing communications systems.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Đối chiếu 'designing telecommunications systems' với 'designing communications systems'."
      },
      {
        "id": "ets22_t3_p7_170",
        "number": 170,
        "text": "How long did Dr. Carmen teach at the Glasse School of Engineering?",
        "options": {
          "A": "6 years",
          "B": "9 years",
          "C": "10 years",
          "D": "19 years"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Tiến sĩ Carmen đã giảng dạy tại Trường Kỹ thuật Glasse trong bao lâu?<br/>(A) 6 năm.<br/>(B) 9 năm.<br/>(C) 10 năm.<br/>(D) 19 năm.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn văn nêu: <i>'where he spent the past nineteen years. While there, he served as a full-time professor for ten years, teaching advanced mathematics and various special courses in engineering. He was then appointed president of the school and served in that position for the remaining nine years...'</i>. Trong tổng số 19 năm ở trường, thời gian ông trực tiếp làm giáo sư giảng dạy (teaching) là 10 năm (9 năm còn lại làm hiệu trưởng): <b>(C) 10 years</b>.</p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Đọc kỹ câu hỏi hỏi thời gian 'teach' (giảng dạy) chứ không phải tổng thời gian làm việc tại trường."
      },
      {
        "id": "ets22_t3_p7_171",
        "number": 171,
        "text": "In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong? “He is thus the perfect choice for redesigning our client training modules.”",
        "options": {
          "A": "[1]",
          "B": "[2]",
          "C": "[3]",
          "D": "[4]"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Câu 'Do đó, ông ấy là sự lựa chọn hoàn hảo cho việc tái thiết kế các mô-đun đào tạo khách hàng của chúng tôi' phù hợp nhất ở vị trí nào?<br/>(A) [1]<br/>(B) [2]<br/>(C) [3]<br/>(D) [4]</p><p><b>Bằng chứng trích dẫn:</b> Câu ngay trước vị trí [4] viết: <i>'During that time, he led the team that redesigned the school’s electrical engineering curriculum.'</i> (Trong thời gian đó, ông đã dẫn dắt nhóm tái thiết kế chương trình giảng dạy kỹ thuật điện của trường). Trạng từ <i>thus</i> (do đó) và hành động <i>redesigning our client training modules</i> liên kết trực tiếp với kinh nghiệm tái thiết kế chương trình đào tạo ở câu trước: <b>(D) [4]</b>.</p>",
        "questionType": "Sentence Insertion",
        "subCategory": "Text Insertion",
        "strategyHint": "Liên kết từ khóa 'redesigned curriculum' ở câu trước với 'redesigning our client training modules' qua liên từ 'thus'."
      }
    ]
  },
  # Set 10: Q172-175 (Review)
  {
    "id": "ets22_t3_p7_s10",
    "type": "Single Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s10_p1",
        "type": "Review",
        "title": "Review",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><h3 style='margin-top:0;'>Patrons See Big-City Art At Local Museum</h3><p>No need to venture into the big city to see an impressive art collection. — [1] —. Locals know Janford as a quiet town situated next to a forest that is popular with hikers. — [2] —. It is likewise home to Janford University and an unexpectedly outstanding museum. Considered one of the finest university art museums in the nation, the Janford University Art Museum (JUAM) houses over 94,000 pieces, with works dating from ancient times to the present. Due to the size of its collection, the museum regularly rotates the works on display. — [3] —. It also hosts temporary exhibitions featuring loans from other institutions.</p><p>Experts consider JUAM noteworthy as a home to a comprehensive collection of twentieth-century art. — [4] —. In particular, it holds the largest public collection of works by sculptor Robert Dabulis, with more than 50 of his pieces and an assortment of his sketches. The museum offers free admission and is open daily from 10 A.M. to 5 P.M. On Friday evenings, the museum has extended hours until 10 P.M.</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_172",
        "number": 172,
        "text": "What does the review indicate about the town of Janford?",
        "options": {
          "A": "It is in a peaceful setting.",
          "B": "It is more than 100 years old.",
          "C": "It has a thriving community of artists.",
          "D": "It has a well-known school of forestry."
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Bài đánh giá chỉ ra điều gì về thị trấn Janford?<br/>(A) Nơi đây nằm trong một khung cảnh thanh bình, yên tĩnh.<br/>(B) Thị trấn đã hơn 100 năm tuổi.<br/>(C) Nơi đây có cộng đồng nghệ sĩ phát triển thịnh vượng.<br/>(D) Nơi đây có trường lâm nghiệp nổi tiếng.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 viết: <i>'Locals know Janford as a quiet town situated next to a forest that is popular with hikers.'</i> (Người dân địa phương biết đến Janford như một thị trấn yên tĩnh nằm cạnh một khu rừng...). Thị trấn yên tĩnh nằm cạnh rừng tương đương với khung cảnh thanh bình: <b>(A) It is in a peaceful setting.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Từ 'quiet town next to a forest' đồng nghĩa với 'peaceful setting'."
      },
      {
        "id": "ets22_t3_p7_173",
        "number": 173,
        "text": "What is mentioned about the museum?",
        "options": {
          "A": "Its main focus is on ancient art.",
          "B": "It has received several national awards.",
          "C": "Its location makes it difficult for tourists to find.",
          "D": "It displays some items from its collection for only a limited time."
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được đề cập về bảo tàng?<br/>(A) Trọng tâm chính của nó là nghệ thuật cổ đại.<br/>(B) Bảo tàng đã nhận được nhiều giải thưởng quốc gia.<br/>(C) Vị trí của nó khiến khách du lịch khó tìm thấy.<br/>(D) Bảo tàng chỉ trưng bày một số hiện vật trong bộ sưu tập trong thời gian có hạn.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 nêu: <i>'Due to the size of its collection, the museum regularly rotates the works on display. It also hosts temporary exhibitions...'</i>. Việc thường xuyên luân phiên các tác phẩm trưng bày (regularly rotates) và tổ chức các triển lãm tạm thời (temporary exhibitions) có nghĩa là một số tác phẩm chỉ được trưng bày trong thời gian có hạn: <b>(D) It displays some items from its collection for only a limited time.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm 'regularly rotates the works on display' và 'temporary exhibitions' đồng nghĩa với việc trưng bày trong thời gian có hạn."
      },
      {
        "id": "ets22_t3_p7_174",
        "number": 174,
        "text": "What is most likely true about Mr. Dabulis?",
        "options": {
          "A": "He began his work as a painter.",
          "B": "He created sculptures specifically for JUAM.",
          "C": "He created art during the twentieth century.",
          "D": "He studied art at Janford University."
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì có nhiều khả năng đúng nhất về ông Dabulis?<br/>(A) Ông bắt đầu công việc với vai trò là một họa sĩ.<br/>(B) Ông sáng tác các tác phẩm điêu khắc dành riêng cho JUAM.<br/>(C) Ông đã sáng tác nghệ thuật trong thế kỷ 20.<br/>(D) Ông đã học nghệ thuật tại Đại học Janford.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 viết: <i>'home to a comprehensive collection of twentieth-century art... In particular, it holds the largest public collection of works by sculptor Robert Dabulis, with more than 50 of his pieces...'</i>. Bộ sưu tập nghệ thuật thế kỷ 20 có điểm nhấn nổi bật cụ thể là các tác phẩm của nhà điêu khắc Robert Dabulis, chứng tỏ ông là nghệ sĩ sáng tác trong thế kỷ 20: <b>(C) He created art during the twentieth century.</b></p>",
        "questionType": "Inference",
        "subCategory": "Inference",
        "strategyHint": "Liên kết logic: 'twentieth-century art' -> 'In particular, ... works by sculptor Robert Dabulis'."
      },
      {
        "id": "ets22_t3_p7_175",
        "number": 175,
        "text": "In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong? “Art enthusiasts can find it right here in Janford.”",
        "options": {
          "A": "[1]",
          "B": "[2]",
          "C": "[3]",
          "D": "[4]"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Câu 'Những người đam mê nghệ thuật có thể tìm thấy điều đó ngay tại Janford' phù hợp nhất ở vị trí nào?<br/>(A) [1]<br/>(B) [2]<br/>(C) [3]<br/>(D) [4]</p><p><b>Bằng chứng trích dẫn:</b> Câu mở đầu viết: <i>'No need to venture into the big city to see an impressive art collection.'</i> (Không cần phải mạo hiểm vào thành phố lớn để chiêm ngưỡng bộ sưu tập nghệ thuật ấn tượng). Câu cần điền tiếp lời bằng đại từ <i>it</i> (thay cho impressive art collection): 'Art enthusiasts can find it right here in Janford.' Do đó vị trí [1] là vị trí tự nhiên và logic nhất: <b>(A) [1]</b>.</p>",
        "questionType": "Sentence Insertion",
        "subCategory": "Text Insertion",
        "strategyHint": "Đại từ 'it' trong câu điền thay thế cho 'an impressive art collection' ở câu liền trước."
      }
    ]
  }
]

print('Sets 6-10 compiled.')
