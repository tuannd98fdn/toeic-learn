import json, sys
sys.path.append('/Users/bravee06/toeic-learn/scripts')
from build_test3_p7_data import part7_data as sets_1_to_5
from build_test3_p7_data2 import part7_sets_6_to_10 as sets_6_to_10

part7_sets_11_to_15 = [
  # Set 11: Q176-180 (Order Form & Email)
  {
    "id": "ets22_t3_p7_s11",
    "type": "Double Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s11_p1",
        "type": "Order Form",
        "title": "Order Form",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><h3 style='margin-top:0;'>Ready Barn</h3><p><b>Order #:</b> #13565<br/><b>Date:</b> June 3<br/><b>Delivery:</b> 24-hour Express Shipping<br/><b>Shipping Address:</b> Helen Kang, 45 Skyrise Road, Newten, NY 12039<br/><b>Payment Method:</b> Credit Card - Jay Shim</p><table style='width: 100%; border-collapse: collapse; margin-top: 12px;' border='1'><thead><tr style='background: var(--bg-muted, #f3f4f6);'><th>Item Number</th><th>Description</th><th style='text-align: right;'>Price</th></tr></thead><tbody><tr><td>7563</td><td>Countertop Electric Grill</td><td style='text-align: right;'>$49</td></tr><tr><td>7564</td><td>Egg Beater</td><td style='text-align: right;'>$14</td></tr><tr><td>7565</td><td>Tea Kettle</td><td style='text-align: right;'>$27</td></tr><tr><td>7566</td><td>Toaster</td><td style='text-align: right;'>$56</td></tr><tr><td>7567</td><td>Cheese Grater</td><td style='text-align: right;'>$16</td></tr><tr><td colspan='2'><b>24-hour Express Shipping</b></td><td style='text-align: right;'>$20</td></tr><tr><td colspan='2'><b>TOTAL</b></td><td style='text-align: right;'><b>$182</b></td></tr></tbody></table></div>"
      },
      {
        "id": "ets22_t3_p7_s11_p2",
        "type": "E-mail",
        "title": "E-mail",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>To:</b> customerservice@readybarn.com<br/><b>From:</b> jayshim@silyex.com<br/><b>Subject:</b> Order #13565<br/><b>Date:</b> June 6</p><p>Hello,</p><p>I recently placed an order (#13565) with Ready Barn. The items I purchased are housewarming gifts for my niece, Helen Kang, who recently purchased a new home. Therefore, her address was provided as the delivery destination. I paid higher shipping fees for 24-hour delivery, as I wanted the items to arrive well ahead of the housewarming party being held tomorrow evening. Several days have passed, and my niece has yet to receive these items. I would appreciate it if you could find out what has happened and let me know when my niece can expect delivery. Also, I would like to ask you to return the money I paid for expedited shipping.</p><p>Additionally, I do not recognize item number 7564 that I was charged $14 for on my receipt. Please let me know how to send it back.</p><p>I am a longtime customer of Ready Barn, and I am usually very satisfied with your products and services. Please reply as soon as possible.</p><p>Sincerely,<br/>Jay Shim</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_176",
        "number": 176,
        "text": "What most likely does Ready Barn specialize in?",
        "options": {
          "A": "Kitchen equipment",
          "B": "Party invitations",
          "C": "Shipping supplies",
          "D": "Large appliances"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Ready Barn có nhiều khả năng chuyên về mặt hàng nào nhất?<br/>(A) Thiết bị nhà bếp.<br/>(B) Thiệp mời tiệc.<br/>(C) Vật tư đóng gói vận chuyển.<br/>(D) Thiết bị gia dụng cỡ lớn.</p><p><b>Bằng chứng trích dẫn:</b> Danh sách sản phẩm trong hóa đơn gồm: <i>Countertop Electric Grill</i> (vỉ nướng điện để bàn), <i>Egg Beater</i> (dụng cụ đánh trứng), <i>Tea Kettle</i> (ấm đun trà), <i>Toaster</i> (máy nướng bánh mì), <i>Cheese Grater</i> (bàn nạo phô mai). Toàn bộ là thiết bị dụng cụ nhà bếp: <b>(A) Kitchen equipment</b>.</p>",
        "questionType": "Inference",
        "subCategory": "Inference",
        "strategyHint": "Tổng hợp các mặt hàng trong đơn hàng: grill, egg beater, kettle, toaster, grater."
      },
      {
        "id": "ets22_t3_p7_177",
        "number": 177,
        "text": "What is indicated about 45 Skyrise Road?",
        "options": {
          "A": "It is Ready Barn’s address.",
          "B": "It is Mr. Shim’s billing address.",
          "C": "It is Ms. Kang’s new address.",
          "D": "It is Mr. Shim’s former address."
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về địa chỉ 45 Skyrise Road?<br/>(A) Đó là địa chỉ của Ready Barn.<br/>(B) Đó là địa chỉ thanh toán của ông Shim.<br/>(C) Đó là địa chỉ mới của cô Kang.<br/>(D) Đó là địa chỉ cũ của ông Shim.</p><p><b>Bằng chứng trích dẫn:</b> Đơn hàng ghi địa chỉ giao hàng là: <i>Helen Kang, 45 Skyrise Road</i>. Trong email, ông Shim giải thích: <i>'gifts for my niece, Helen Kang, who recently purchased a new home. Therefore, her address was provided as the delivery destination.'</i> Do đó 45 Skyrise Road là địa chỉ nhà mới của cô Kang: <b>(C) It is Ms. Kang’s new address.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Kết nối thông tin giữa địa chỉ người nhận trong hóa đơn và giải thích mua quà tân gia cho cháu gái trong email."
      },
      {
        "id": "ets22_t3_p7_178",
        "number": 178,
        "text": "What does Mr. Shim request in his e-mail?",
        "options": {
          "A": "A discount",
          "B": "A refund",
          "C": "A receipt",
          "D": "A gift list"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Ông Shim yêu cầu điều gì trong email của mình?<br/>(A) Một khoản chiết khấu.<br/>(B) Một khoản hoàn tiền.<br/>(C) Một biên lai.<br/>(D) Một danh sách quà tặng.</p><p><b>Bằng chứng trích dẫn:</b> Ông Shim viết: <i>'Also, I would like to ask you to return the money I paid for expedited shipping.'</i> (Ngoài ra, tôi muốn yêu cầu bạn hoàn trả lại số tiền tôi đã trả cho dịch vụ chuyển phát nhanh). Hoàn lại tiền (return the money) tương đương với hoàn tiền (refund): <b>(B) A refund</b>.</p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm từ 'return the money I paid' đồng nghĩa với 'a refund'."
      },
      {
        "id": "ets22_t3_p7_179",
        "number": 179,
        "text": "What item did Mr. Shim not intend to buy?",
        "options": {
          "A": "The cheese grater",
          "B": "The grill",
          "C": "The toaster",
          "D": "The egg beater"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Món đồ nào ông Shim không có ý định mua?<br/>(A) Bàn nạo phô mai.<br/>(B) Vỉ nướng.<br/>(C) Máy nướng bánh mì.<br/>(D) Dụng cụ đánh trứng.</p><p><b>Bằng chứng trích dẫn:</b> Trong email, ông Shim viết: <i>'Additionally, I do not recognize item number 7564 that I was charged $14 for on my receipt. Please let me know how to send it back.'</i> (Tôi không nhận ra mã sản phẩm 7564 bị tính $14 trong hóa đơn). Tra cứu lại bảng đơn hàng ở đoạn 1: Mã 7564 tương ứng với món <i>Egg Beater</i> ($14). Do đó món ông không có ý định mua là máy đánh trứng: <b>(D) The egg beater</b>.</p>",
        "questionType": "Cross-Reference",
        "subCategory": "Detail Link",
        "strategyHint": "Liên kết chéo: tìm mã số 'item number 7564' trong email và đối chiếu với bảng đơn hàng để tìm tên sản phẩm."
      },
      {
        "id": "ets22_t3_p7_180",
        "number": 180,
        "text": "According to the e-mail, what is true about Mr. Shim?",
        "options": {
          "A": "He is satisfied with the items he purchased.",
          "B": "He has shopped with Ready Barn before.",
          "C": "He received his order on schedule.",
          "D": "He prefers to shop through a catalog."
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Theo email, điều gì là đúng về ông Shim?<br/>(A) Ông ấy hài lòng với những món đồ đã mua.<br/>(B) Ông ấy đã từng mua hàng tại Ready Barn trước đây.<br/>(C) Ông ấy đã nhận đơn hàng đúng hẹn.<br/>(D) Ông ấy thích mua sắm qua danh mục hơn.</p><p><b>Bằng chứng trích dẫn:</b> Ở đoạn cuối email, ông Shim khẳng định: <i>'I am a longtime customer of Ready Barn, and I am usually very satisfied with your products and services.'</i> (Tôi là khách hàng lâu năm của Ready Barn...). Khách hàng lâu năm chứng tỏ ông đã từng mua hàng tại đây trước đây: <b>(B) He has shopped with Ready Barn before.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm 'longtime customer' chứng minh 'has shopped with Ready Barn before'."
      }
    ]
  },
  # Set 12: Q181-185 (Email & Boarding Pass)
  {
    "id": "ets22_t3_p7_s12",
    "type": "Double Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s12_p1",
        "type": "E-mail",
        "title": "E-mail",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>To:</b> Yong-Sun Che &lt;ysche@buztech.com&gt;<br/><b>From:</b> Ginny Redman &lt;gredman@silvervaleair.com&gt;<br/><b>Subject:</b> RE: Seat problem<br/><b>Date:</b> February 12<br/><b>Attachment:</b> Voucher</p><p>Dear Mr. Che:</p><p>Thank you for contacting us regarding your recent flight. We apologize for the discomfort you experienced during your flight because of the nonfunctioning air-conditioning vent above your seat.</p><p>We value you as a customer and want to make sure your experience with Silvervale Air is positive, so we have attached Voucher 789798 in the amount of $200. This may be applied to a future domestic flight with us. The voucher expires after twelve months.</p><p>Thank you for choosing Silvervale Air.</p><p>Sincerely,<br/>Ginny Redman<br/>Silvervale Air Customer Service</p></div>"
      },
      {
        "id": "ets22_t3_p7_s12_p2",
        "type": "Boarding Pass",
        "title": "Boarding Pass",
        "content": "<div style='border: 2px solid var(--border-color, #444); border-radius: 8px; padding: 16px; font-family: sans-serif;'><div style='display: flex; justify-content: space-between;'><div><b>Passenger:</b> Mr. Yong-Sun Che<br/><b>Ticket number:</b> 0272125899649</div><div><b>Confirmation code:</b> CMOAAB</div></div><hr style='margin: 12px 0;'/><table style='width: 100%; text-align: left;'><tr><th>Flight</th><th>Departs</th><th>Arrives</th><th>Seat</th></tr><tr><td>Silvervale Air 29</td><td>Atlanta, GA (ATL)<br/>Mon., May 6, 11:43 A.M.</td><td>Los Angeles, CA (LAX)<br/>Mon., May 6, 1:35 P.M.</td><td>36D</td></tr></table><hr style='margin: 12px 0;'/><h4>Summary of airfare charges</h4><table style='width: 100%; border-collapse: collapse;'><tr><td>Base fare</td><td style='text-align: right;'>$259.54</td></tr><tr><td>Taxes and fees</td><td style='text-align: right;'>$33.76</td></tr><tr><td>Voucher 789798</td><td style='text-align: right;'>-$200.00</td></tr><tr style='font-weight: bold; border-top: 1px solid #ccc;'><td>Total</td><td style='text-align: right;'>$93.30</td></tr></table><p style='font-size: 0.85em; margin-top: 12px; color: #666;'>All passengers are entitled to travel with one complimentary carry-on and one checked bag.</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_181",
        "number": 181,
        "text": "Why did Ms. Redman e-mail Mr. Che?",
        "options": {
          "A": "To update him on the repair of some equipment",
          "B": "To announce changes to airfare pricing",
          "C": "To assign him a new seat",
          "D": "To offer him compensation"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Tại sao cô Redman gửi email cho ông Che?<br/>(A) Để cập nhật cho ông về việc sửa chữa một số thiết bị.<br/>(B) Để thông báo thay đổi giá vé máy bay.<br/>(C) Để chỉ định cho ông một chỗ ngồi mới.<br/>(D) Để đề nghị đền bù cho ông.</p><p><b>Bằng chứng trích dẫn:</b> Email viết: <i>'We apologize for the discomfort you experienced... so we have attached Voucher 789798 in the amount of $200.'</i> (Chúng tôi xin lỗi vì sự bất tiện... vì vậy chúng tôi đính kèm phiếu giảm giá trị giá $200). Việc gửi voucher $200 xin lỗi chính là hình thức đền bù: <b>(D) To offer him compensation</b>.</p>",
        "questionType": "Purpose",
        "subCategory": "Overview",
        "strategyHint": "Gửi voucher đền bù sự cố lỗ thông gió hỏng chính là 'compensation'."
      },
      {
        "id": "ets22_t3_p7_182",
        "number": 182,
        "text": "In the e-mail, the phrase “applied to” in paragraph 2, line 3, is closest in meaning to",
        "options": {
          "A": "asked for",
          "B": "used for",
          "C": "dealt with",
          "D": "kept with"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Trong email, cụm từ 'applied to' ở đoạn 2 dòng 3 gần nghĩa nhất với cụm từ nào?<br/>(A) yêu cầu.<br/>(B) được sử dụng cho.<br/>(C) giải quyết với.<br/>(D) giữ cùng với.</p><p><b>Bằng chứng trích dẫn:</b> Câu văn: <i>'This may be applied to a future domestic flight with us.'</i> (Phiếu này có thể được áp dụng/sử dụng cho một chuyến bay nội địa trong tương lai với chúng tôi). Cụm <i>applied to</i> ở đây có nghĩa là được sử dụng cho: <b>(B) used for</b>.</p>",
        "questionType": "Vocabulary",
        "subCategory": "Vocabulary in Context",
        "strategyHint": "Cụm 'applied to a flight' đồng nghĩa với 'used for a flight'."
      },
      {
        "id": "ets22_t3_p7_183",
        "number": 183,
        "text": "What does Ms. Redman mention about Voucher 789798?",
        "options": {
          "A": "It is valid for twelve months.",
          "B": "It has not been mailed yet.",
          "C": "It may be used for international flights.",
          "D": "It cannot be transferred to another passenger."
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Cô Redman đề cập điều gì về Phiếu giảm giá 789798?<br/>(A) Nó có hiệu lực trong 12 tháng.<br/>(B) Nó vẫn chưa được gửi qua đường bưu điện.<br/>(C) Nó có thể được sử dụng cho các chuyến bay quốc tế.<br/>(D) Nó không thể được chuyển nhượng cho hành khách khác.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 email khẳng định: <i>'The voucher expires after twelve months.'</i> (Phiếu giảm giá sẽ hết hạn sau 12 tháng). Hết hạn sau 12 tháng nghĩa là có giá trị trong 12 tháng: <b>(A) It is valid for twelve months.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Đối chiếu 'expires after twelve months' với 'valid for twelve months'."
      },
      {
        "id": "ets22_t3_p7_184",
        "number": 184,
        "text": "What can be inferred from the boarding pass about Mr. Che?",
        "options": {
          "A": "He redeemed the full value of a voucher.",
          "B": "He paid an additional fee for an upgrade.",
          "C": "He booked a round-trip flight.",
          "D": "He is a frequent flyer on Silvervale Air."
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Có thể suy ra điều gì từ thẻ lên máy bay về ông Che?<br/>(A) Ông ấy đã quy đổi toàn bộ giá trị của một phiếu giảm giá.<br/>(B) Ông ấy đã trả thêm phí để nâng hạng vé.<br/>(C) Ông ấy đã đặt chuyến bay khứ hồi.<br/>(D) Ông ấy là hành khách bay thường xuyên của Silvervale Air.</p><p><b>Bằng chứng trích dẫn:</b> Trong email, voucher 789798 có giá trị $200 (<i>'in the amount of $200'</i>). Trong thẻ lên máy bay, mục chi phí ghi nhận: <i>'Voucher 789798: -$200.00'</i>. Toàn bộ $200 đã được trừ thẳng vào tiền vé, chứng tỏ ông đã sử dụng toàn bộ giá trị voucher: <b>(A) He redeemed the full value of a voucher.</b></p>",
        "questionType": "Cross-Reference",
        "subCategory": "Inference Link",
        "strategyHint": "Liên kết chéo giá trị $200 của voucher ở email với dòng trừ $200 ở bảng tính tiền vé máy bay."
      },
      {
        "id": "ets22_t3_p7_185",
        "number": 185,
        "text": "What is indicated about Silvervale Air flight 29?",
        "options": {
          "A": "It departs from Los Angeles.",
          "B": "It arrives in the afternoon.",
          "C": "Its passengers do not have assigned seats.",
          "D": "Its passengers are allowed two free checked bags."
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về chuyến bay Silvervale Air 29?<br/>(A) Nó khởi hành từ Los Angeles.<br/>(B) Nó hạ cánh vào buổi chiều.<br/>(C) Hành khách không có ghế ngồi cố định.<br/>(D) Hành khách được mang miễn phí hai kiện hành lý ký gửi.</p><p><b>Bằng chứng trích dẫn:</b> Thông tin chuyến bay trên thẻ ghi: <i>'Arrives: Los Angeles, CA (LAX) Mon., May 6, 1:35 P.M.'</i> (Hạ cánh lúc 1:35 chiều). 1:35 P.M. là buổi chiều (in the afternoon): <b>(B) It arrives in the afternoon.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Đối chiếu giờ đến '1:35 P.M.' với 'in the afternoon'."
      }
    ]
  },
  # Set 13: Q186-190 (Triple Passage: Meeting Minutes, Email, Article)
  {
    "id": "ets22_t3_p7_s13",
    "type": "Triple Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s13_p1",
        "type": "Meeting Minutes",
        "title": "Meeting Minutes",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><h3 style='margin-top:0;'>Coffer Digital Management Steering Committee<br/>Meeting Minutes</h3><p><b>November 12</b></p><ol><li>Re-pitch is ready to be pilot tested.</li><li>The pilot test will be carried out during the first quarter of the fiscal year, January 3–March 31.</li><li>Five existing clients will use the experimental version of Re-pitch during the pilot test. They will then take a survey to rate the software's effectiveness, ease of use, and affordability.</li><li>If the Re-pitch pilot is successful, a large dollar investment will be needed to design and run an extensive marketing campaign.</li><li>Our company president will explore potential funding sources for this campaign.</li></ol></div>"
      },
      {
        "id": "ets22_t3_p7_s13_p2",
        "type": "E-mail",
        "title": "E-mail",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>To:</b> sales@coffer.com<br/><b>From:</b> tcao@ewest-taipei.com.tw<br/><b>Date:</b> 13 April<br/><b>Subject:</b> Pilot test</p><p>Dear Coffer Digital,</p><p>I wanted to follow up after having just submitted our thoughts regarding your Re-pitch marketing software. You will find that our pilot-test feedback is overwhelmingly positive, which is why we would like to be notified immediately upon the rollout of this product. We are very eager to add Re-pitch to our permanent digital marketing efforts.</p><p>Sincerely,<br/>Ting Cao, Director of Global Internet Marketing<br/>Ewest Clothing Ltd., Taipei</p></div>"
      },
      {
        "id": "ets22_t3_p7_s13_p3",
        "type": "Article",
        "title": "Business Briefs",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><h3 style='margin-top:0;'>Business Briefs</h3><p>Coffer Digital closed a deal yesterday with GPZ Capital. GPZ will make a significant investment in Coffer Digital, enabling the funding of a new online marketing application called Re-pitch. This sales-boosting software works by generating a pop-up window that reminds online shoppers of products they have already viewed, after they have navigated away from the product page.</p><p>GPZ's knowledge of data and marketing has enabled them to make successful investments in three other software development firms in the past five years. Coffer Digital's strong company reputation and top-notch employees easily support GPZ's decision to invest. “Coffer Digital has a solid plan for distributing Re-pitch, so it was an easy decision to invest with them,” said Jessica Gould, spokesperson for GPZ.</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_186",
        "number": 186,
        "text": "According to the meeting minutes, what is indicated about the pilot test?",
        "options": {
          "A": "The testing period will last about three months.",
          "B": "Problems identified during testing must be immediately reported.",
          "C": "Running the test will be costly.",
          "D": "The testing plan still needs the president’s approval."
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Theo biên bản cuộc họp, điều gì được chỉ ra về cuộc thử nghiệm thí điểm?<br/>(A) Giai đoạn thử nghiệm sẽ kéo dài khoảng ba tháng.<br/>(B) Các vấn đề phát hiện khi thử nghiệm phải báo cáo ngay.<br/>(C) Việc tiến hành thử nghiệm sẽ tốn kém.<br/>(D) Kế hoạch thử nghiệm vẫn cần sự phê duyệt của chủ tịch.</p><p><b>Bằng chứng trích dẫn:</b> Mục 2 trong biên bản ghi: <i>'The pilot test will be carried out during the first quarter of the fiscal year, January 3–March 31.'</i> (Từ ngày 3 tháng 1 đến 31 tháng 3). Khoảng thời gian từ đầu tháng 1 đến cuối tháng 3 kéo dài xấp xỉ 3 tháng: <b>(A) The testing period will last about three months.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Khoảng thời gian từ January 3 đến March 31 tương đương 'about three months'."
      },
      {
        "id": "ets22_t3_p7_187",
        "number": 187,
        "text": "What did Mr. Cao do?",
        "options": {
          "A": "He redesigned a Web site.",
          "B": "He submitted an annual report.",
          "C": "He completed a survey.",
          "D": "He started a new business."
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Ông Cao đã làm gì?<br/>(A) Ông ấy đã thiết kế lại một trang web.<br/>(B) Ông ấy đã nộp báo cáo thường niên.<br/>(C) Ông ấy đã hoàn thành một bài khảo sát.<br/>(D) Ông ấy đã khởi nghiệp một doanh nghiệp mới.</p><p><b>Bằng chứng trích dẫn:</b> Trong email, ông Cao viết: <i>'I wanted to follow up after having just submitted our thoughts regarding your Re-pitch marketing software. You will find that our pilot-test feedback...'</i>. Kết nối với mục 3 trong biên bản: khách hàng tham gia bản thử nghiệm <i>'will then take a survey to rate the software's effectiveness...'</i>. Nộp ý kiến phản hồi về phần mềm thí điểm chính là hoàn thành bài khảo sát (completed a survey): <b>(C) He completed a survey.</b></p>",
        "questionType": "Cross-Reference",
        "subCategory": "Inference Link",
        "strategyHint": "Nối thông tin 'take a survey' trong biên bản với 'submitted our thoughts / pilot-test feedback' trong email của ông Cao."
      },
      {
        "id": "ets22_t3_p7_188",
        "number": 188,
        "text": "What does Mr. Cao request?",
        "options": {
          "A": "To view the results of a test",
          "B": "To participate in future testing",
          "C": "To be notified when software is available for purchase",
          "D": "To set up a marketing consultation appointment"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Ông Cao yêu cầu điều gì?<br/>(A) Xem kết quả của một bài kiểm tra.<br/>(B) Tham gia vào các đợt thử nghiệm trong tương lai.<br/>(C) Được thông báo khi phần mềm có sẵn để mua.<br/>(D) Sắp xếp một cuộc hẹn tư vấn tiếp thị.</p><p><b>Bằng chứng trích dẫn:</b> Email của ông Cao nêu rõ: <i>'which is why we would like to be notified immediately upon the rollout of this product. We are very eager to add Re-pitch to our permanent digital marketing efforts.'</i> (chúng tôi muốn được thông báo ngay khi sản phẩm này được tung ra thị trường chính thức). Yêu cầu này tương đương với <b>(C) To be notified when software is available for purchase</b>.</p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm 'notified immediately upon the rollout of this product' đồng nghĩa với việc thông báo khi sản phẩm mở bán."
      },
      {
        "id": "ets22_t3_p7_189",
        "number": 189,
        "text": "According to the article, what does Re-pitch do?",
        "options": {
          "A": "It tracks the sales of online retailers.",
          "B": "It prevents pop-up windows in Internet browsers.",
          "C": "It offers customers discounts on products.",
          "D": "It displays products for online shoppers to consider buying."
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Theo bài báo, Re-pitch làm gì?<br/>(A) Nó theo dõi doanh số của các nhà bán lẻ trực tuyến.<br/>(B) Nó ngăn chặn các cửa sổ bật lên trong trình duyệt Internet.<br/>(C) Nó giảm giá sản phẩm cho khách hàng.<br/>(D) Nó hiển thị các sản phẩm để người mua sắm trực tuyến cân nhắc mua.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 bài báo mô tả: <i>'This sales-boosting software works by generating a pop-up window that reminds online shoppers of products they have already viewed, after they have navigated away from the product page.'</i> (tạo cửa sổ bật lên nhắc nhở người mua hàng về các sản phẩm họ đã xem). Điều này tương đương với việc hiển thị sản phẩm để người mua cân nhắc: <b>(D) It displays products for online shoppers to consider buying.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Đối chiếu chức năng 'generating a pop-up window that reminds online shoppers of products they have already viewed'."
      },
      {
        "id": "ets22_t3_p7_190",
        "number": 190,
        "text": "How will Coffer Digital most likely use the funds from GPZ Capital?",
        "options": {
          "A": "To purchase a smaller company",
          "B": "To advertise a product",
          "C": "To hire new employees",
          "D": "To invest in new equipment"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Coffer Digital có nhiều khả năng sẽ sử dụng số tiền từ GPZ Capital như thế nào?<br/>(A) Mua một công ty nhỏ hơn.<br/>(B) Để quảng cáo một sản phẩm.<br/>(C) Thuê nhân viên mới.<br/>(D) Đầu tư vào thiết bị mới.</p><p><b>Bằng chứng trích dẫn:</b> Trong biên bản họp, mục 4 và 5 nêu: <i>'If the Re-pitch pilot is successful, a large dollar investment will be needed to design and run an extensive marketing campaign. Our company president will explore potential funding sources for this campaign.'</i> Sau đó, bài báo đưa tin GPZ Capital đã đầu tư khoản tiền lớn cho Re-pitch. Nguồn quỹ này phục vụ chiến dịch tiếp thị/quảng bá sản phẩm (advertising a product): <b>(B) To advertise a product</b>.</p>",
        "questionType": "Cross-Reference",
        "subCategory": "Inference Link",
        "strategyHint": "Liên kết mục đích tìm vốn trong biên bản (design and run an extensive marketing campaign) với khoản đầu tư của GPZ trong bài báo."
      }
    ]
  },
  # Set 14: Q191-195 (Triple Passage: Article, Email, Sign)
  {
    "id": "ets22_t3_p7_s14",
    "type": "Triple Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s14_p1",
        "type": "Article",
        "title": "Article",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><h3 style='margin-top:0;'>TERMINAL C TO REOPEN</h3><p><b>(May 23)</b>—Harrison City Airport's Terminal C will reopen to the public on June 1 following a two-year renovation project.</p><p>The project added eleven new gates, allowing the terminal to accommodate more flights. The three major airlines that used Terminal C before the renovation will now be back in operation there. Also at Terminal C will be newcomer Paik Airways, a regional carrier that is expanding its routes.</p><p>The terminal's new lobby features an efficient check-in process and a state-of-the-art baggage-handling system. Passengers will enjoy free Wi-Fi in the waiting area, which also contains shops and restaurants.</p><p>At one point during the renovations, it looked as if the construction team would miss its deadline. An environmental impact review conducted by the city questioned the placement of a parking lot. The planners solved the problem by moving the parking lot to the other side of the airport and instituting a shuttle bus service.</p><p>“Thanks to the cooperative efforts of all stakeholders, the project was completed by the deadline with no budget overage,” said Arturo Benetti, the airport's chief operating officer.</p></div>"
      },
      {
        "id": "ets22_t3_p7_s14_p2",
        "type": "E-mail",
        "title": "E-mail",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>From:</b> Thomasina Yee &lt;thomasina.yee@cooverbrothers.com&gt;<br/><b>To:</b> Sven Paulsen &lt;sven.paulsen@cooverbrothers.com&gt;<br/><b>Date:</b> July 6<br/><b>Subject:</b> Meeting with Slonim Company buyers</p><p>Hello Sven,</p><p>I'm at the Harrison City Airport to catch the 3:30 flight home, but I want to give you a quick update. The meeting at Slonim went well. They are very pleased with Coover Brothers products and expect to double their orders next year. In fact, they offered to feature our bedroom and dining room sets at the upcoming Home and Garden Exposition. I'll give you all the details tomorrow.</p><p>Regards,<br/>Thomasina</p></div>"
      },
      {
        "id": "ets22_t3_p7_s14_p3",
        "type": "Sign",
        "title": "Airport Departures Sign",
        "content": "<div style='border: 2px solid #333; background: #000; color: #fff; border-radius: 8px; padding: 16px; font-family: monospace;'><h3 style='margin-top:0; color: #fbbf24; text-align: center;'>HARRISON CITY AIRPORT - TERMINAL C DEPARTURES</h3><table style='width: 100%; border-collapse: collapse; text-align: left;'><tr style='color: #9ca3af; border-bottom: 1px solid #444;'><th>Destination</th><th>Airline</th><th>Flight</th><th>Time</th><th>Gate</th><th>Status</th></tr><tr><td>Detroit</td><td>Brightway</td><td>BR417</td><td>1:25</td><td>11</td><td style='color: #4ade80;'>ON TIME</td></tr><tr><td>Omaha</td><td>Planet Z</td><td>PL700</td><td>2:06</td><td>3</td><td style='color: #ef4444;'>CANCELED</td></tr><tr><td>Cleveland</td><td>Paik</td><td>PA069</td><td>3:00</td><td>24</td><td style='color: #4ade80;'>ON TIME</td></tr><tr><td>Chicago</td><td>Windrover</td><td>WI645</td><td>3:30</td><td>6</td><td style='color: #fbbf24;'>DELAYED</td></tr></table></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_191",
        "number": 191,
        "text": "Why was it necessary to change the location of a parking lot?",
        "options": {
          "A": "To reduce construction costs",
          "B": "To protect the environment",
          "C": "To make travel easier for passengers",
          "D": "To provide spaces for large vehicles"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Tại sao cần phải thay đổi vị trí của một bãi đậu xe?<br/>(A) Để giảm chi phí xây dựng.<br/>(B) Để bảo vệ môi trường.<br/>(C) Để giúp hành khách đi lại dễ dàng hơn.<br/>(D) Để cung cấp không gian cho các phương tiện lớn.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 4 bài báo viết: <i>'An environmental impact review conducted by the city questioned the placement of a parking lot. The planners solved the problem by moving the parking lot to the other side of the airport...'</i> (Báo cáo đánh giá tác động môi trường do thành phố thực hiện đã đặt câu hỏi về vị trí bãi đậu xe...). Do đó việc di dời nhằm bảo vệ môi trường: <b>(B) To protect the environment</b>.</p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm 'environmental impact review' dẫn đến quyết định di dời bãi đậu xe để bảo vệ môi trường."
      },
      {
        "id": "ets22_t3_p7_192",
        "number": 192,
        "text": "What does Mr. Benetti emphasize about Terminal C?",
        "options": {
          "A": "It is the only terminal with free Wi-Fi.",
          "B": "It was designed by a famous architect.",
          "C": "Its renovation was funded by the city.",
          "D": "Its renovation was completed on time."
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Ông Benetti nhấn mạnh điều gì về Nhà ga C?<br/>(A) Đây là nhà ga duy nhất có Wi-Fi miễn phí.<br/>(B) Nó được thiết kế bởi một kiến trúc sư nổi tiếng.<br/>(C) Việc cải tạo nó được thành phố tài trợ.<br/>(D) Việc cải tạo nó đã được hoàn thành đúng thời hạn.</p><p><b>Bằng chứng trích dẫn:</b> Ông Arturo Benetti phát biểu: <i>'the project was completed by the deadline with no budget overage'</i> (dự án được hoàn thành trước thời hạn và không vượt ngân sách). Hoàn thành trước thời hạn (by the deadline) có nghĩa là hoàn thành đúng giờ/đúng hạn: <b>(D) Its renovation was completed on time.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm 'completed by the deadline' đồng nghĩa với 'completed on time'."
      },
      {
        "id": "ets22_t3_p7_193",
        "number": 193,
        "text": "What products does Coover Brothers most likely manufacture?",
        "options": {
          "A": "Furniture",
          "B": "Clothing",
          "C": "Kitchen appliances",
          "D": "Gardening tools"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Coover Brothers có nhiều khả năng sản xuất sản phẩm nào nhất?<br/>(A) Đồ nội thất.<br/>(B) Quần áo.<br/>(C) Thiết bị nhà bếp.<br/>(D) Dụng cụ làm vườn.</p><p><b>Bằng chứng trích dẫn:</b> Trong email, cô Yee viết: <i>'feature our bedroom and dining room sets at the upcoming Home and Garden Exposition.'</i> (trưng bày các bộ phòng ngủ và phòng ăn của chúng ta tại Triển lãm Nhà & Vườn). Bộ phòng ngủ và bộ bàn ăn là đồ nội thất gia đình: <b>(A) Furniture</b>.</p>",
        "questionType": "Inference",
        "subCategory": "Inference",
        "strategyHint": "Cụm 'bedroom and dining room sets' là các sản phẩm đồ gỗ nội thất (furniture)."
      },
      {
        "id": "ets22_t3_p7_194",
        "number": 194,
        "text": "What is implied about Brightway Airlines?",
        "options": {
          "A": "It is an international carrier.",
          "B": "It offers flights to Omaha.",
          "C": "It used Terminal C before the renovation.",
          "D": "It has a private waiting area for passengers."
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được ngụ ý về hãng hàng không Brightway Airlines?<br/>(A) Đây là một hãng hàng không quốc tế.<br/>(B) Hãng cung cấp các chuyến bay đến Omaha.<br/>(C) Hãng đã sử dụng Nhà ga C trước khi cải tạo.<br/>(D) Hãng có khu vực chờ riêng cho hành khách.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 bài báo viết: <i>'The three major airlines that used Terminal C before the renovation will now be back in operation there. Also at Terminal C will be newcomer Paik Airways...'</i>. Nhìn vào bảng điện tử các hãng bay ở Nhà ga C: có 4 hãng bay là Brightway, Planet Z, Paik, Windrover. Vì Paik là tân binh mới đến (newcomer), nên 3 hãng còn lại (Brightway, Planet Z, Windrover) chính là 3 hãng lớn từng hoạt động tại Nhà ga C trước cải tạo: <b>(C) It used Terminal C before the renovation.</b></p>",
        "questionType": "Cross-Reference",
        "subCategory": "Inference Link",
        "strategyHint": "Liên kết chéo danh sách 4 hãng trên bảng điện tử với mô tả: Paik là 'newcomer', còn 3 hãng còn lại (trong đó có Brightway) đã dùng Nhà ga C trước đây."
      },
      {
        "id": "ets22_t3_p7_195",
        "number": 195,
        "text": "What is suggested about Ms. Yee?",
        "options": {
          "A": "She works in Omaha.",
          "B": "She met with Mr. Benetti.",
          "C": "Her flight departed late.",
          "D": "Her luggage was lost."
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được ngụ ý về cô Yee?<br/>(A) Cô ấy làm việc ở Omaha.<br/>(B) Cô ấy đã gặp ông Benetti.<br/>(C) Chuyến bay của cô ấy đã khởi hành muộn.<br/>(D) Hành lý của cô ấy đã bị thất lạc.</p><p><b>Bằng chứng trích dẫn:</b> Cô Yee viết trong email: <i>'I’m at the Harrison City Airport to catch the 3:30 flight home...'</i>. Nhìn vào bảng giờ bay khởi hành lúc 3:30 (chuyến bay WI645 đi Chicago của hãng Windrover), cột trạng thái ghi rõ: <b>DELAYED</b> (Bị hoãn/chậm trễ). Do đó chuyến bay về của cô ấy bị trễ giờ: <b>(C) Her flight departed late.</b></p>",
        "questionType": "Cross-Reference",
        "subCategory": "Inference Link",
        "strategyHint": "Liên kết giờ bay 3:30 trong email với dòng chuyến bay 3:30 trên bảng điện tử hiển thị trạng thái DELAYED."
      }
    ]
  },
  # Set 15: Q196-200 (Triple Passage: Brochure, Form, Email)
  {
    "id": "ets22_t3_p7_s15",
    "type": "Triple Passage",
    "passages": [
      {
        "id": "ets22_t3_p7_s15_p1",
        "type": "Brochure",
        "title": "Brochure",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><h3 style='margin-top:0;'>Zell Exteriors</h3><p>Zell Exteriors' metal roofing products offer many advantages over traditional roofing materials.</p><p><b>Benefit 1—Weather resistance:</b> Technology that provides greater protection from hail, wind, and rain.<br/><b>Benefit 2—Wide selection:</b> Large selection of panel types, trim options, and paint colors to choose from.<br/><b>Benefit 3—Satisfaction guarantee:</b> 30-year warranty for added peace of mind.<br/><b>Benefit 4—Established reputation:</b> Quality roofing from a trusted company.</p><p>For questions about specific products or to request a quote from our sales staff, complete our online contact form. All our roofing panels are fabricated at one of our regional manufacturing facilities, precut to the necessary dimensions for your roof, and shipped to a branch near you. Our professional installers will then take it from there.</p></div>"
      },
      {
        "id": "ets22_t3_p7_s15_p2",
        "type": "Form",
        "title": "Contact Form",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><h3 style='margin-top:0;'>Online Contact Form</h3><p><b>Name:</b> Gus Keenan<br/><b>E-mail:</b> g.keenan@autoewrite.net<br/><b>Phone:</b> 555-0188</p><p><b>Comments:</b><br/>I have been looking at various roofing materials, and the wide range of paint options makes your company my top choice. My shed building is an odd shade of purple, and I want to find a color that complements it. But I have a question. I would like the new metal roof to be placed on top of the old shingle roof I have. This would save money on time, labor, and disposal. Is that something you recommend? I have spent a lot of time reading online forums for professional contractors, and there are mixed opinions about this.</p></div>"
      },
      {
        "id": "ets22_t3_p7_s15_p3",
        "type": "E-mail",
        "title": "E-mail",
        "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'><p><b>To:</b> g.keenan@autoewrite.net<br/><b>From:</b> nshertz@zellexteriors.com<br/><b>Date:</b> May 20<br/><b>Subject:</b> Roofing Inquiry<br/><b>Attachment:</b> Zell Exteriors catalog</p><p>Dear Mr. Keenan,</p><p>A sales representative will contact you by phone within 48 hours, but first please look over the attached product catalog. Here are the four basic roofing types that we offer:</p><ul><li><b>SLP Snap Lock</b> – Steel panels with a locking feature that enables rapid installation.</li><li><b>XM Panel</b> – Aluminum panels with superior corrosion resistance. Ideal for wet climates.</li><li><b>QR Rigid</b> – Low-cost panels that can be installed directly on top of an existing roof.</li><li><b>WT Panel</b> – Our most durable commercial-grade steel. Available only in white and gray.</li></ul><p>Thank you,<br/>Nicola Shertz, Administrative Assistant, Zell Exteriors</p></div>"
      }
    ],
    "questions": [
      {
        "id": "ets22_t3_p7_196",
        "number": 196,
        "text": "What does the brochure mention about Zell Exteriors?",
        "options": {
          "A": "It encourages people to visit a showroom.",
          "B": "It schedules projects several months in advance.",
          "C": "It requires an on-site inspection before installation.",
          "D": "It custom cuts products prior to delivery."
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Tờ rơi đề cập điều gì về Zell Exteriors?<br/>(A) Công ty khuyến khích mọi người đến thăm phòng trưng bày.<br/>(B) Công ty lên lịch các dự án trước vài tháng.<br/>(C) Công ty yêu cầu kiểm tra tại chỗ trước khi lắp đặt.<br/>(D) Công ty cắt sản phẩm theo kích thước tùy chỉnh trước khi giao hàng.</p><p><b>Bằng chứng trích dẫn:</b> Tờ rơi nêu: <i>'All our roofing panels are fabricated at one of our regional manufacturing facilities, precut to the necessary dimensions for your roof, and shipped to a branch near you.'</i> (được cắt sẵn theo kích thước cần thiết cho mái nhà của bạn rồi mới chuyển đến chi nhánh gần bạn). Việc cắt sẵn theo kích thước trước khi chuyển hàng chính là custom cuts products prior to delivery: <b>(D) It custom cuts products prior to delivery.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm từ 'precut to the necessary dimensions... and shipped' đồng nghĩa với 'custom cuts products prior to delivery'."
      },
      {
        "id": "ets22_t3_p7_197",
        "number": 197,
        "text": "Considering Mr. Keenan’s comments, what listed benefit is probably most attractive to him?",
        "options": {
          "A": "Benefit 1",
          "B": "Benefit 2",
          "C": "Benefit 3",
          "D": "Benefit 4"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Dựa trên bình luận của ông Keenan, lợi ích nào được liệt kê có lẽ hấp dẫn ông nhất?<br/>(A) Lợi ích 1.<br/>(B) Lợi ích 2.<br/>(C) Lợi ích 3.<br/>(D) Lợi ích 4.</p><p><b>Bằng chứng trích dẫn:</b> Ông Keenan viết: <i>'the wide range of paint options makes your company my top choice. My shed building is an odd shade of purple, and I want to find a color that complements it.'</i>. Đối chiếu với Brochure: <b>Benefit 2—Wide selection:</b> <i>'Large selection of panel types, trim options, and paint colors to choose from.'</i> (Lựa chọn phong phú về màu sơn). Do đó đó chính là Benefit 2: <b>(B) Benefit 2</b>.</p>",
        "questionType": "Cross-Reference",
        "subCategory": "Inference Link",
        "strategyHint": "Liên kết từ khóa 'paint options / color' trong bình luận với 'Benefit 2: Wide selection (...paint colors)'."
      },
      {
        "id": "ets22_t3_p7_198",
        "number": 198,
        "text": "What does the form indicate about Mr. Keenan?",
        "options": {
          "A": "He has researched about roofing options.",
          "B": "He made a mistake when installing some materials.",
          "C": "He wants his project completed quickly.",
          "D": "He is unhappy with a previous contractor."
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Biểu mẫu chỉ ra điều gì về ông Keenan?<br/>(A) Ông ấy đã tìm hiểu nghiên cứu về các lựa chọn lợp mái.<br/>(B) Ông ấy đã mắc lỗi khi lắp đặt một số vật liệu.<br/>(C) Ông ấy muốn dự án của mình hoàn thành nhanh chóng.<br/>(D) Ông ấy không hài lòng với nhà thầu trước đó.</p><p><b>Bằng chứng trích dẫn:</b> Ông Keenan cho biết: <i>'I have spent a lot of time reading online forums for professional contractors...'</i> (Tôi đã dành nhiều thời gian đọc các diễn đàn trực tuyến dành cho các nhà thầu chuyên nghiệp...). Điều này chứng minh ông đã tự mình nghiên cứu, tìm hiểu rất kỹ: <b>(A) He has researched about roofing options.</b></p>",
        "questionType": "Inference",
        "subCategory": "Inference",
        "strategyHint": "Cụm 'spent a lot of time reading online forums' đồng nghĩa với 'has researched'."
      },
      {
        "id": "ets22_t3_p7_199",
        "number": 199,
        "text": "What kind of roofing product will Mr. Keenan most likely select?",
        "options": {
          "A": "SLP Snap Lock",
          "B": "XM Panel",
          "C": "QR Rigid",
          "D": "WT Panel"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Ông Keenan nhiều khả năng sẽ chọn loại sản phẩm lợp mái nào nhất?<br/>(A) SLP Snap Lock.<br/>(B) XM Panel.<br/>(C) QR Rigid.<br/>(D) WT Panel.</p><p><b>Bằng chứng trích dẫn:</b> Trong biểu mẫu, ông Keenan nêu yêu cầu cụ thể: <i>'I would like the new metal roof to be placed on top of the old shingle roof I have.'</i> (Tôi muốn mái kim loại mới được đặt trực tiếp lên trên mái ngói cũ sẵn có). Trong email phản hồi của cô Shertz: <b>QR Rigid</b> được mô tả là <i>'Low-cost panels that can be installed directly on top of an existing roof.'</i> (Tấm lợp có thể lắp đặt trực tiếp lên trên mái nhà hiện có). Do đó sản phẩm phù hợp hoàn hảo với yêu cầu của ông là QR Rigid: <b>(C) QR Rigid</b>.</p>",
        "questionType": "Cross-Reference",
        "subCategory": "Detail Link",
        "strategyHint": "Khớp yêu cầu 'placed on top of the old shingle roof' trong form với tính năng của QR Rigid 'installed directly on top of an existing roof' trong email."
      },
      {
        "id": "ets22_t3_p7_200",
        "number": 200,
        "text": "What does Ms. Shertz tell Mr. Keenan?",
        "options": {
          "A": "He can save money by not delaying a decision.",
          "B": "He should look over a proposed contract.",
          "C": "He will be called by a Zell representative.",
          "D": "He ordered the wrong materials in the past."
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Cô Shertz nói gì với ông Keenan?<br/>(A) Ông có thể tiết kiệm tiền bằng cách không trì hoãn quyết định.<br/>(B) Ông nên xem qua bản hợp đồng đề xuất.<br/>(C) Ông sẽ nhận được cuộc gọi từ đại diện của Zell.<br/>(D) Ông đã đặt nhầm vật liệu trong quá khứ.</p><p><b>Bằng chứng trích dẫn:</b> Câu đầu tiên trong email của cô Shertz viết: <i>'A sales representative will contact you by phone within 48 hours...'</i> (Một đại diện bán hàng sẽ liên hệ với bạn qua điện thoại trong vòng 48 giờ...). Điều này tương đương với <b>(C) He will be called by a Zell representative.</b></p>",
        "questionType": "Detail",
        "subCategory": "Detail",
        "strategyHint": "Cụm từ 'A sales representative will contact you by phone' đồng nghĩa với 'He will be called by a Zell representative'."
      }
    ]
  }
]

# Merge all 15 sets
all_part7 = sets_1_to_5 + sets_6_to_10 + part7_sets_11_to_15

print(f'Total Part 7 sets: {len(all_part7)}')
total_questions = sum(len(s['questions']) for s in all_part7)
print(f'Total Part 7 questions: {total_questions}')

with open('/Users/bravee06/toeic-learn/public/data/ets2022/test3/part7.json', 'w', encoding='utf-8') as f:
    json.dump(all_part7, f, indent=2, ensure_ascii=False)

print('Part 7 JSON written successfully to public/data/ets2022/test3/part7.json!')
