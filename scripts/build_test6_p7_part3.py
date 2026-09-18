import json

part3_sets = [
    # Set 13: Q186 - Q190 (Triple Passage: Emails and Web Page)
    {
        "id": "ets22_t6_p7_s13",
        "type": "Triple Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s13_p1",
                "type": "Email",
                "title": "Email 1",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>From:</b> Michal Zezula &lt;m.zezula@gerlach-kozey.com.au&gt;<br/>"
                           "<b>To:</b> Dang Thi Lien &lt;dtlien@hermiston.com.au&gt;<br/>"
                           "<b>Date:</b> Thursday, 21 September, 1:44 P.M.<br/>"
                           "<b>Subject:</b> Conference dinner</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #ccc); margin: 12px 0;'/>"
                           "<p>Dear Ms. Lien,</p>"
                           "<p>I am looking forward to meeting you at the Business Leadership Conference in Sydney next month. I am delighted that you will be part of our panel, and I am looking forward to hearing you discuss your paper on local government initiatives.</p>"
                           "<p>As the panel chair, I am organizing a dinner for all the speakers immediately following the panel. Since you are locally based, perhaps you have insights about the places listed on the conference Web site? I am leaning towards Victoria Grill because it overlooks the harbor, but I would like to hear your opinion. Any place that can accommodate a large group would be especially desirable. I would visit these myself, but I am not arriving in Sydney until the day of our panel. I am hoping to make all arrangements by 1 October.</p>"
                           "<p>Best wishes,<br/>"
                           "Michal Zezula</p>"
                           "</div>"
            },
            {
                "id": "ets22_t6_p7_s13_p2",
                "type": "Web Page",
                "title": "Web Page",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px; background: var(--bg-card, #fafafa);'>"
                           "<p style='color: #666; font-size: 0.85rem; margin-top: 0;'>http://www.blcsydney.com.au/thingstodo</p>"
                           "<p style='font-size: 0.9rem;'><b>Schedule | Accommodations | Things to Do | Contacts | Map</b></p>"
                           "<h4 style='margin-bottom: 8px;'>Restaurant Recommendations</h4>"
                           "<p>All of these restaurants are located within walking distance of the conference site. Given the anticipated activity, reservations are recommended, especially for large groups.</p>"
                           "<p>• <b>Bombay Palace:</b> Contemporary Indian cuisine. Large menu with several vegetarian options. Price: Moderate.</p>"
                           "<p>• <b>Victoria Grill:</b> Innovative Australian cooking. Located on the top floor of the Hesiod Building, overlooking the spectacular Sydney Harbor. Price: Expensive.</p>"
                           "<p>• <b>Amir’s Kitchen:</b> Lebanese cuisine with a modern flair. Private rooms available; ideal for parties and group events. Price: Inexpensive.</p>"
                           "</div>"
            },
            {
                "id": "ets22_t6_p7_s13_p3",
                "type": "Email",
                "title": "Email 2",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<p><b>From:</b> Dang Thi Lien &lt;dtlien@hermiston.com.au&gt;<br/>"
                           "<b>To:</b> Michal Zezula &lt;m.zezula@gerlach-kozey.com.au&gt;<br/>"
                           "<b>Date:</b> Friday, 22 September, 10:02 A.M.<br/>"
                           "<b>Subject:</b> RE: Conference dinner</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #ccc); margin: 12px 0;'/>"
                           "<p>Dear Mr. Zezula,</p>"
                           "<p>I am looking forward to meeting you as well. As far as the recommended restaurants, I have been to the three listed on the Web site. They all have good food and a pleasant ambience. Victoria Grill is somewhat pricey and in fact would require a taxi ride from the conference site. In my opinion, Bombay Palace is likely the best for a group of our size. It is located right next to my office building. If you like, I could stop by after work and inquire about a dinner reservation at Bombay Palace on 6 October.</p>"
                           "<p>Sincerely,<br/>"
                           "Dang Thi Lien</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_186",
                "number": 186,
                "text": "What is the purpose of the first e-mail?",
                "options": {
                    "A": "To request advice about an event",
                    "B": "To give information about tourist sites",
                    "C": "To propose a topic for a paper",
                    "D": "To invite business leaders to a conference"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của bức email đầu tiên là gì?<br/>(A) Yêu cầu lời khuyên về một sự kiện (To request advice about an event).<br/>(B) Cung cấp thông tin về các địa điểm du lịch.<br/>(C) Đề xuất một chủ đề cho bài báo.<br/>(D) Mời các nhà lãnh đạo doanh nghiệp tham dự hội nghị.</p><p><b>Bằng chứng trích dẫn:</b> Ông Zezula là chủ tọa phiên thảo luận đang tổ chức bữa tối cho các diễn giả (<i>organizing a dinner for all the speakers</i>), ông hỏi cô Liên là người bản địa: <i>'Since you are locally based, perhaps you have insights about the places listed on the conference Web site? ... but I would like to hear your opinion.'</i> (xin ý kiến tư vấn về địa điểm tổ chức ăn tối). Chọn <b>(A)</b>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "Ông Zezula xin ý kiến cô Liên về nhà hàng để tổ chức bữa tối hội nghị."
            },
            {
                "id": "ets22_t6_p7_187",
                "number": 187,
                "text": "What is Ms. Lien’s role in the conference?",
                "options": {
                    "A": "Chairing a panel",
                    "B": "Giving a presentation",
                    "C": "Contacting catering companies",
                    "D": "Staffing an information desk"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Vai trò của cô Liên tại hội nghị là gì?<br/>(A) Chủ tọa phiên thảo luận.<br/>(B) Trình bày một bài thuyết trình (Giving a presentation).<br/>(C) Liên hệ các công ty phục vụ ăn uống.<br/>(D) Làm việc tại bàn thông tin.</p><p><b>Bằng chứng trích dẫn:</b> Văn bản 1 viết: <i>'I am delighted that you will be part of our panel, and I am looking forward to hearing you discuss your paper on local government initiatives.'</i> (trình bày/thảo luận bài báo cáo nghiên cứu). Do đó cô ấy là diễn giả thuyết trình <b>(B)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "'discuss your paper' = 'Giving a presentation'."
            },
            {
                "id": "ets22_t6_p7_188",
                "number": 188,
                "text": "Why is Mr. Zezula interested in dining at Victoria Grill?",
                "options": {
                    "A": "It offers vegetarian options.",
                    "B": "It offers private rooms.",
                    "C": "It is open relatively late.",
                    "D": "It has an attractive view."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao ông Zezula lại muốn ăn tối tại Victoria Grill?<br/>(A) Nó cung cấp các món ăn chay.<br/>(B) Nó cung cấp các phòng riêng.<br/>(C) Nó mở cửa tương đối muộn.<br/>(D) Nó có tầm nhìn đẹp/thu hút (It has an attractive view).</p><p><b>Bằng chứng trích dẫn:</b> Văn bản 1 ông Zezula nêu rõ: <i>'I am leaning towards Victoria Grill because it overlooks the harbor'</i> (nhìn ra cảng biển). Văn bản 2 xác nhận: <i>'overlooking the spectacular Sydney Harbor'</i>. Tầm nhìn ra cảng là <i>an attractive view</i>. Chọn <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "'overlooks the harbor' = 'has an attractive view'."
            },
            {
                "id": "ets22_t6_p7_189",
                "number": 189,
                "text": "When is the panel scheduled to take place?",
                "options": {
                    "A": "On September 21",
                    "B": "On September 22",
                    "C": "On October 1",
                    "D": "On October 6"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Phiên thảo luận được lên lịch diễn ra vào thời gian nào?<br/>(A) Vào ngày 21 tháng 9.<br/>(B) Vào ngày 22 tháng 9.<br/>(C) Vào ngày 1 tháng 10.<br/>(D) Vào ngày 6 tháng 10 (On October 6).</p><p><b>Bằng chứng trích dẫn chéo:</b> Văn bản 1 nói bữa tối diễn ra <i>immediately following the panel</i> (ngay sau phiên thảo luận). Văn bản 3 cô Liên đề nghị: <i>'inquire about a dinner reservation at Bombay Palace on 6 October'</i> (đặt bàn ăn tối vào ngày 6 tháng 10). Do đó phiên thảo luận diễn ra vào ngày 6/10 <b>(D)</b>.</p>",
                "questionType": "Cross-Passage Detail",
                "subCategory": "Detail",
                "strategyHint": "Bữa tối ngay sau phiên thảo luận; đặt bàn tối ngày 6/10 -> phiên thảo luận diễn ra ngày 6/10."
            },
            {
                "id": "ets22_t6_p7_190",
                "number": 190,
                "text": "What information on the conference Web site does Ms. Lien think is inaccurate?",
                "options": {
                    "A": "Bombay Palace’s ability to host large groups",
                    "B": "Victoria Grill’s distance from the conference site",
                    "C": "The price of food at the restaurants",
                    "D": "The need to make dinner reservations"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Thông tin nào trên trang web hội nghị mà cô Liên cho là không chính xác?<br/>(A) Khả năng tiếp đón các nhóm lớn của Bombay Palace.<br/>(B) Khoảng cách từ Victoria Grill đến địa điểm hội nghị (Victoria Grill’s distance from the conference site).<br/>(C) Giá đồ ăn tại các nhà hàng.<br/>(D) Sự cần thiết phải đặt bàn trước.</p><p><b>Bằng chứng trích dẫn chéo:</b> Trang web (văn bản 2) khẳng định: <i>'All of these restaurants are located within walking distance of the conference site.'</i> (tất cả đều nằm trong khoảng cách đi bộ được). Tuy nhiên, cô Liên (văn bản 3) đính chính: <i>'Victoria Grill is somewhat pricey and in fact would require a taxi ride from the conference site.'</i> (thực tế phải đi taxi mới tới được chứ không đi bộ được). Do đó thông tin khoảng cách bị sai <b>(B)</b>.</p>",
                "questionType": "Cross-Passage Detail",
                "subCategory": "Detail",
                "strategyHint": "Web bảo 'walking distance' nhưng cô Liên bảo 'would require a taxi ride'."
            }
        ]
    },

    # Set 14: Q191 - Q195 (Triple Passage: Email, Web Page, Invoice)
    {
        "id": "ets22_t6_p7_s14",
        "type": "Triple Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s14_p1",
                "type": "Email",
                "title": "Email",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>From:</b> amartin@netforceevents.com<br/>"
                           "<b>To:</b> mpresser@gerenukofficedesign.com<br/>"
                           "<b>Date:</b> September 3<br/>"
                           "<b>Subject:</b> Chairs (Item #10405)</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #ccc); margin: 12px 0;'/>"
                           "<p>Dear Mr. Presser,</p>"
                           "<p>As a result of our company's expansion last spring, we moved into a larger facility and needed new furniture. At that time we ordered 22 office chairs from Gerenuk Office Design (Item #10405-Blue). Within two months, many of the chairs were broken and unusable. We were initially happy with the replacement chairs that you delivered free of charge, but some of those have now broken as well.</p>"
                           "<p>I am hereby requesting that you replace all 22 with chairs from your new Executive line (Item #10612) at no extra charge—assuming that they are better quality. These are comparable in price to the original model we purchased. If you are unable to do this, we will be forced to look elsewhere for our furnishing needs.</p>"
                           "<p>Alexandra Martin, Office Administrator<br/>"
                           "Netforce Events</p>"
                           "</div>"
            },
            {
                "id": "ets22_t6_p7_s14_p2",
                "type": "Web Page",
                "title": "Web Page",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px; background: var(--bg-card, #fafafa);'>"
                           "<p style='color: #666; font-size: 0.85rem; margin-top: 0;'>http://www.hansons-office.com/ergonomic-task-chair</p>"
                           "<h4 style='margin: 0;'>HANSON’S: YOUR ONE-STOP SHOP FOR OFFICE SUPPLIES</h4>"
                           "<p style='font-size: 0.85rem; margin-top: 4px;'><b>Home | Products | About Us | Customer Help</b></p>"
                           "<p><b>Ergonomic Task Chair</b><br/>"
                           "The Ergonomic Task Chair is our best-selling swivel model. It is specially designed to promote good posture and avoid discomfort, and therefore it is perfect for those long workdays at the office. Best of all, it is built to last and comes with a lifetime warranty. The model is available in four attractive colors.<br/>"
                           "<b>$159 per unit</b></p>"
                           "<p>• Black, Item Code 429BL<br/>"
                           "• Blue, Item Code 469BB<br/>"
                           "• Green, Item Code 490GN<br/>"
                           "• Red, Item Code 459RD</p>"
                           "</div>"
            },
            {
                "id": "ets22_t6_p7_s14_p3",
                "type": "Invoice",
                "title": "Invoice",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<h4 style='margin-top: 0; text-align: center;'>HANSON’S: YOUR ONE-STOP SHOP FOR OFFICE SUPPLIES<br/>INVOICE</h4>"
                           "<p><b>Client:</b> Netforce Events<br/>"
                           "<b>Address:</b> 342 Collard Boulevard, Hampton, ME<br/>"
                           "<b>Date:</b> September 10</p>"
                           "<table style='width: 100%; border-collapse: collapse; margin-top: 8px;'>"
                           "<thead><tr style='border-bottom: 2px solid #ccc; text-align: left;'>"
                           "<th style='padding: 6px;'>Item</th><th style='padding: 6px;'>Quantity</th><th style='padding: 6px;'>Unit Price</th><th style='padding: 6px;'>Total</th>"
                           "</tr></thead>"
                           "<tbody>"
                           "<tr style='border-bottom: 1px solid #eee;'><td style='padding: 6px;'>Ergonomic Task Chair, Item 490GN</td><td style='padding: 6px;'>22</td><td style='padding: 6px;'>$159.00</td><td style='padding: 6px;'>$3,498.00</td></tr>"
                           "<tr><td colspan='3' style='padding: 6px; text-align: right;'><b>Subtotal:</b></td><td style='padding: 6px;'>$3,498.00</td></tr>"
                           "<tr><td colspan='3' style='padding: 6px; text-align: right;'><b>Discount for first-time customers:</b></td><td style='padding: 6px;'>-$159.00</td></tr>"
                           "<tr style='border-top: 1px solid #333;'><td colspan='3' style='padding: 6px; text-align: right;'><b>Total:</b></td><td style='padding: 6px;'><b>$3,339.00</b></td></tr>"
                           "</tbody></table>"
                           "<p style='font-size: 0.85rem; color: #555; margin-top: 8px;'>Please contact customerhelp@hansons-office.com if you have any questions.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_191",
                "number": 191,
                "text": "What is true about Netforce Events?",
                "options": {
                    "A": "It recently moved into another building.",
                    "B": "It manufactures furniture.",
                    "C": "It has just opened a new store.",
                    "D": "It was founded last spring."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì đúng về Netforce Events?<br/>(A) Gần đây công ty đã chuyển sang một tòa nhà khác (It recently moved into another building).<br/>(B) Công ty sản xuất đồ nội thất.<br/>(C) Công ty vừa mở một cửa hàng mới.<br/>(D) Công ty được thành lập vào mùa xuân năm ngoái.</p><p><b>Bằng chứng trích dẫn:</b> Trong email (văn bản 1), bà Martin viết: <i>'As a result of our company's expansion last spring, we moved into a larger facility and needed new furniture.'</i> (chúng tôi đã chuyển sang một cơ sở/tòa nhà lớn hơn). Chọn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "'moved into a larger facility' = 'recently moved into another building'."
            },
            {
                "id": "ets22_t6_p7_192",
                "number": 192,
                "text": "What is the purpose of the e-mail?",
                "options": {
                    "A": "To complain about available chair colors",
                    "B": "To request that some chairs be repaired",
                    "C": "To place an office stationery order",
                    "D": "To ask that some furniture be replaced"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của email là gì?<br/>(A) Để phàn nàn về các màu ghế có sẵn.<br/>(B) Để yêu cầu sửa chữa một số chiếc ghế.<br/>(C) Để đặt hàng văn phòng phẩm.<br/>(D) Để yêu cầu thay thế một số đồ nội thất (To ask that some furniture be replaced).</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 email nêu rõ: <i>'I am hereby requesting that you replace all 22 with chairs from your new Executive line... at no extra charge'</i> (yêu cầu đổi toàn bộ 22 chiếc ghế). Chọn <b>(D)</b>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "'requesting that you replace all 22 with chairs...' = 'ask that some furniture be replaced'."
            },
            {
                "id": "ets22_t6_p7_193",
                "number": 193,
                "text": "What is stated about the Ergonomic Task Chair?",
                "options": {
                    "A": "It is reasonably priced.",
                    "B": "It is a popular model.",
                    "C": "It comes with a limited warranty.",
                    "D": "It is made from a washable fabric."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được nêu về mẫu ghế Ergonomic Task Chair?<br/>(A) Nó có giá cả phải chăng.<br/>(B) Nó là một mẫu ghế rất được ưa chuộng/bán chạy (It is a popular model).<br/>(C) Nó đi kèm với chế độ bảo hành có giới hạn.<br/>(D) Nó được làm từ vải có thể giặt được.</p><p><b>Bằng chứng trích dẫn:</b> Trang web Hanson’s (văn bản 2) mô tả: <i>'The Ergonomic Task Chair is our best-selling swivel model.'</i> (mẫu ghế xoay bán chạy nhất của chúng tôi). <i>best-selling = popular</i>. Chọn <b>(B)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "best-selling = popular model."
            },
            {
                "id": "ets22_t6_p7_194",
                "number": 194,
                "text": "What is implied about Gerenuk Office Design?",
                "options": {
                    "A": "It offers a discount for first-time customers.",
                    "B": "It did not agree to Ms. Martin’s request.",
                    "C": "Its Executive chairs sell out quickly.",
                    "D": "It is under new management."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được ngụ ý về Gerenuk Office Design?<br/>(A) Công ty giảm giá cho khách hàng lần đầu.<br/>(B) Công ty đã không đồng ý với yêu cầu của cô Martin (It did not agree to Ms. Martin's request).<br/>(C) Các ghế Executive của công ty bán hết rất nhanh.<br/>(D) Công ty đang dưới sự quản lý mới.</p><p><b>Bằng chứng trích dẫn chéo:</b> Trong email ngày 3/9 gửi Gerenuk, cô Martin tuyên bố: <i>'If you are unable to do this, we will be forced to look elsewhere for our furnishing needs.'</i> (Nếu các vị không thể đổi 22 ghế miễn phí, chúng tôi buộc phải tìm nhà cung cấp khác). Và ở văn bản 3 (hóa đơn ngày 10/9), Netforce Events đã đặt mua 22 chiếc ghế mới từ công ty đối thủ là Hanson’s. Điều đó chứng minh Gerenuk đã từ chối yêu cầu đổi ghế của cô Martin <b>(B)</b>.</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "Dọa tìm nhà cung cấp khác nếu không đổi ghế -> hóa đơn mua ở Hanson's chứng minh yêu cầu bị từ chối."
            },
            {
                "id": "ets22_t6_p7_195",
                "number": 195,
                "text": "What color are the chairs Netforce Events ordered from Hanson’s?",
                "options": {
                    "A": "Black",
                    "B": "Blue",
                    "C": "Green",
                    "D": "Red"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Những chiếc ghế mà Netforce Events đặt mua từ Hanson’s có màu gì?<br/>(A) Đen.<br/>(B) Xanh dương.<br/>(C) Xanh lá cây (Green).<br/>(D) Đỏ.</p><p><b>Bằng chứng trích dẫn chéo:</b> Hóa đơn của Hanson’s ghi mã sản phẩm đặt mua: <i>'Item 490GN'</i>. Đối chiếu bảng mã màu ở trang web (văn bản 2):<br/>- Black, Item Code 429BL<br/>- Blue, Item Code 469BB<br/>- <b>Green, Item Code 490GN</b><br/>- Red, Item Code 459RD<br/>Do đó mã 490GN chính là màu xanh lá cây (Green). Chọn <b>(C)</b>.</p>",
                "questionType": "Cross-Passage Detail",
                "subCategory": "Detail",
                "strategyHint": "Item 490GN trên hóa đơn tương ứng với 'Green, Item Code 490GN' trên trang web."
            }
        ]
    },

    # Set 15: Q196 - Q200 (Triple Passage: Notice, Chart, Email)
    {
        "id": "ets22_t6_p7_s15",
        "type": "Triple Passage",
        "passages": [
            {
                "id": "ets22_t6_p7_s15_p1",
                "type": "Notice",
                "title": "Notice",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0; text-align: center;'>KLOOF PHOTOGRAPHY EVENT</h3>"
                           "<p>On 21 November, all Kloof employees are invited to a celebration to commemorate our first five years in business. Please attend our company picnic featuring a traditional braai as well as live music and competitive games. The company will provide meats fresh off the grill prepared in the traditional braai style. Beverages will also be provided. In exchange, we ask that attendees either plan to bring a side dish to share or volunteer to join the setup crew. To make the event run smoothly, we will need at least two people to help with setup.</p>"
                           "<p>Our gathering will convene from 1 to 8 P.M. on the patio of our headquarters building. If you plan to attend, please open the sign-up sheet saved on the company drive and indicate there how you will contribute. Employees are welcome to bring a guest, so long as they indicate their intention to do so. Any questions may be directed to our events coordinator, Noxolo Nwosu, at nnwosu@kloofphoto.sa.</p>"
                           "</div>"
            },
            {
                "id": "ets22_t6_p7_s15_p2",
                "type": "Chart",
                "title": "Sign-Up Sheet",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px; background: var(--bg-card, #fafafa);'>"
                           "<h4 style='margin-top: 0; text-align: center;'>Kloof Photography Sign-Up Sheet</h4>"
                           "<table style='width: 100%; border-collapse: collapse;'>"
                           "<thead><tr style='border-bottom: 2px solid #ccc; text-align: left;'>"
                           "<th style='padding: 6px;'>Name</th><th style='padding: 6px;'>Bringing a guest?</th><th style='padding: 6px;'>Side dish</th>"
                           "</tr></thead>"
                           "<tbody>"
                           "<tr style='border-bottom: 1px solid #eee;'><td style='padding: 6px;'>Mason Kivundu</td><td style='padding: 6px;'>No</td><td style='padding: 6px;'>sweet corn</td></tr>"
                           "<tr style='border-bottom: 1px solid #eee;'><td style='padding: 6px;'>Clara Singh</td><td style='padding: 6px;'>Yes</td><td style='padding: 6px;'>potato salad</td></tr>"
                           "<tr style='border-bottom: 1px solid #eee;'><td style='padding: 6px;'>Karl Williams</td><td style='padding: 6px;'>Yes</td><td style='padding: 6px;'>garlic bread</td></tr>"
                           "<tr style='border-bottom: 1px solid #eee;'><td style='padding: 6px;'>Said Diallo</td><td style='padding: 6px;'>Yes</td><td style='padding: 6px;'>jollof rice</td></tr>"
                           "<tr style='border-bottom: 1px solid #eee;'><td style='padding: 6px;'>Sekou Lombard</td><td style='padding: 6px;'>Yes</td><td style='padding: 6px;'></td></tr>"
                           "<tr><td style='padding: 6px;'>Patricia Williamson</td><td style='padding: 6px;'>Yes</td><td style='padding: 6px;'>drinks</td></tr>"
                           "</tbody></table>"
                           "</div>"
            },
            {
                "id": "ets22_t6_p7_s15_p3",
                "type": "Email",
                "title": "Email",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; margin-top: 12px;'>"
                           "<p><b>From:</b> Dawyd Johnson<br/>"
                           "<b>To:</b> Noxolo Nwosu<br/>"
                           "<b>Subject:</b> Kloof summer event<br/>"
                           "<b>Date:</b> 3 November</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #ccc); margin: 12px 0;'/>"
                           "<p>Dear Ms. Nwosu,</p>"
                           "<p>Thank you for organizing the upcoming event. Several of my Kloof colleagues have been discussing the dishes they intend to bring. However, since I have just arrived in South Africa, the culture surrounding a braai picnic is quite new to me. Also, I am not much of a cook, but I do want to contribute to the success of the picnic. Please let me know what would be most helpful.</p>"
                           "<p>Sincerely,<br/>"
                           "Dawyd Johnson</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t6_p7_196",
                "number": 196,
                "text": "What is the reason for the event?",
                "options": {
                    "A": "To promote a product",
                    "B": "To celebrate a store opening",
                    "C": "To welcome a new company president",
                    "D": "To mark a company anniversary"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Lý do tổ chức sự kiện là gì?<br/>(A) Để quảng bá một sản phẩm.<br/>(B) Để ăn mừng việc khai trương một cửa hàng.<br/>(C) Để chào đón chủ tịch công ty mới.<br/>(D) Để kỷ niệm ngày thành lập công ty (To mark a company anniversary).</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 thông báo nêu rõ: <i>'all Kloof employees are invited to a celebration to commemorate our first five years in business.'</i> (kỷ niệm 5 năm thành lập và hoạt động). Chọn <b>(D)</b>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "'commemorate our first five years in business' = 'mark a company anniversary'."
            },
            {
                "id": "ets22_t6_p7_197",
                "number": 197,
                "text": "According to the notice, where will the event be held?",
                "options": {
                    "A": "At a park",
                    "B": "Near an office building",
                    "C": "At a retail store",
                    "D": "On a sports field"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo thông báo, sự kiện sẽ được tổ chức ở đâu?<br/>(A) Tại một công viên.<br/>(B) Gần một tòa nhà văn phòng (Near an office building).<br/>(C) Tại một cửa hàng bán lẻ.<br/>(D) Trên một sân thể thao.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 ghi rõ: <i>'Our gathering will convene from 1 to 8 P.M. on the patio of our headquarters building.'</i> (tại hiên/sân ngoài trời của tòa nhà trụ sở chính công ty). Tức là gần tòa nhà văn phòng <b>(B)</b>.</p>",
                "questionType": "Location",
                "subCategory": "Detail",
                "strategyHint": "patio of our headquarters building = Near an office building."
            },
            {
                "id": "ets22_t6_p7_198",
                "number": 198,
                "text": "Based on the information in the chart, what mistake did Ms. Williamson make?",
                "options": {
                    "A": "She did not sign up to bring anything.",
                    "B": "She did not confirm her intention to attend.",
                    "C": "She plans to bring something that the company will provide.",
                    "D": "She intends to bring more guests than are permitted."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Dựa trên thông tin trong bảng, cô Williamson đã mắc phải sai lầm gì?<br/>(A) Cô ấy không đăng ký mang bất cứ thứ gì.<br/>(B) Cô ấy không xác nhận ý định tham dự.<br/>(C) Cô ấy dự định mang theo thứ mà công ty sẽ cung cấp (She plans to bring something that the company will provide).<br/>(D) Cô ấy dự định mang nhiều khách hơn số lượng cho phép.</p><p><b>Bằng chứng trích dẫn chéo:</b> Trong bảng đăng ký, Patricia Williamson đăng ký mang <i>'drinks'</i> (đồ uống). Trong khi đó thông báo (văn bản 1) đã nêu rõ: <i>'Beverages will also be provided. In exchange, we ask that attendees either plan to bring a side dish to share or volunteer to join the setup crew.'</i> (công ty đã lo toàn bộ đồ uống, nhân viên chỉ mang món ăn phụ hoặc phụ dựng rạp). Do đó việc cô đăng ký mang đồ uống là bị trùng với đồ công ty cung cấp <b>(C)</b>.</p>",
                "questionType": "Cross-Passage Detail",
                "subCategory": "Detail",
                "strategyHint": "Thông báo ghi 'Beverages will also be provided', nhưng cô Williamson lại đăng ký mang 'drinks'."
            },
            {
                "id": "ets22_t6_p7_199",
                "number": 199,
                "text": "What will Ms. Nwosu most likely encourage Mr. Johnson to do?",
                "options": {
                    "A": "Help with setting up",
                    "B": "Bring some meat",
                    "C": "Assist with grilling",
                    "D": "Lead one of the games"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Cô Nwosu nhiều khả năng sẽ khuyến khích ông Johnson làm điều gì?<br/>(A) Giúp đỡ khâu chuẩn bị/dựng rạp (Help with setting up).<br/>(B) Mang theo một ít thịt.<br/>(C) Hỗ trợ nướng thịt.<br/>(D) Dẫn dắt một trong các trò chơi.</p><p><b>Bằng chứng trích dẫn chéo:</b> Thông báo (văn bản 1) ghi: <i>'attendees either plan to bring a side dish to share or volunteer to join the setup crew. To make the event run smoothly, we will need at least two people to help with setup.'</i> (cần ít nhất 2 người giúp setup). Trong email (văn bản 3), ông Johnson nói: <i>'since I have just arrived in South Africa, the culture surrounding a braai picnic is quite new to me. Also, I am not much of a cook, but I do want to contribute'</i> (không biết nấu ăn, không quen món braai nhưng vẫn muốn đóng góp). Lựa chọn duy nhất còn lại cho người không nấu ăn là tham gia đội setup <b>(A)</b>.</p>",
                "questionType": "Cross-Passage Inference",
                "subCategory": "Inference",
                "strategyHint": "Không biết nấu ăn mang món phụ thì tình nguyện vào 'setup crew'."
            },
            {
                "id": "ets22_t6_p7_200",
                "number": 200,
                "text": "What does the e-mail suggest about Mr. Johnson?",
                "options": {
                    "A": "He is not a beginner photographer.",
                    "B": "He enjoys cooking.",
                    "C": "He is not from South Africa.",
                    "D": "He prefers indoor events."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Email gợi ý điều gì về ông Johnson?<br/>(A) Ông ấy không phải là một nhiếp ảnh gia mới bắt đầu.<br/>(B) Ông ấy thích nấu ăn.<br/>(C) Ông ấy không phải là người Nam Phi (He is not from South Africa).<br/>(D) Ông ấy thích các sự kiện trong nhà hơn.</p><p><b>Bằng chứng trích dẫn:</b> Ông Johnson viết: <i>'since I have just arrived in South Africa, the culture surrounding a braai picnic is quite new to me.'</i> (vì tôi vừa mới đến Nam Phi nên văn hóa tiệc nướng dã ngoại braai này khá mới mẻ đối với tôi). Do đó ông ấy là người nước ngoài chuyển đến, không phải người gốc Nam Phi <b>(C)</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Chi tiết 'I have just arrived in South Africa, the culture... is quite new to me'."
            }
        ]
    }
]
