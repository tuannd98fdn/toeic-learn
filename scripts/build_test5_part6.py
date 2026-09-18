import json
import os

part6_data = [
    {
        "id": "ets22_t5_p6_s01",
        "title": "Questions 131-134 refer to the following article.",
        "type": "Article",
        "content": "<p><b>COPENHAGEN (25 May)</b>—Odense Media announced today that initial sales of the latest version of its tablet, Virtusonic, have [131] the company's expectations. Company spokesperson Kerstin Vestergaard attributes the [132] sales to a number of factors. First, there is the tablet's high-quality case. [133]. In addition, the Virtusonic has an adaptive screen brightness feature. This allows it to adjust automatically to less-than-ideal [134] conditions. Vestergaard believes that these characteristics make the Virtusonic a must-have for consumers.</p>",
        "questions": [
            {
                "id": "ets22_t5_p6_131",
                "number": 131,
                "text": "",
                "options": {
                    "A": "based",
                    "B": "surpassed",
                    "C": "invested",
                    "D": "progressed"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Doanh số bán ban đầu của phiên bản máy tính bảng mới nhất Virtusonic đã vượt xa kỳ vọng của công ty.</p><p><b>Phân tích từ vựng:</b> Động từ <b>(B) surpassed</b> (vượt trội/vượt qua) đi cùng cụm tân ngữ <i>one's expectations</i> tạo thành collocation kinh điển: <i>surpassed expectations</i> (vượt quá mong đợi).<br/>- (A) <i>based</i>: dựa trên.<br/>- (C) <i>invested</i>: đầu tư.<br/>- (D) <i>progressed</i>: tiến bộ.</p>",
                "type": "Vocabulary",
                "subCategory": "Business Vocabulary",
                "grammarTag": "Collocation"
            },
            {
                "id": "ets22_t5_p6_132",
                "number": 132,
                "text": "",
                "options": {
                    "A": "impress",
                    "B": "impressing",
                    "C": "impressive",
                    "D": "impressed"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người phát ngôn Kerstin Vestergaard quy doanh số ấn tượng này cho một số yếu tố.</p><p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng sau mạo từ <i>the</i> và trước danh từ số nhiều <i>sales</i>. Ta cần một tính từ miêu tả đặc điểm của doanh số bán hàng. Tính từ <b>(C) impressive</b> (đầy ấn tượng) là lựa chọn chuẩn xác.<br/>- (A) <i>impress</i>: động từ gây ấn tượng.<br/>- (B) <i>impressing</i>: danh động từ.<br/>- (D) <i>impressed</i>: tính từ chỉ cảm xúc của con người (bị ấn tượng).</p>",
                "type": "Word Form",
                "subCategory": "Word Form",
                "grammarTag": "Adjective Modifying Noun"
            },
            {
                "id": "ets22_t5_p6_133",
                "number": 133,
                "text": "",
                "options": {
                    "A": "Customers must consider what the tablet will be used for.",
                    "B": "The Virtusonic will be available in other colors next month.",
                    "C": "Check stores for the best deals on the new device.",
                    "D": "The protective shell ensures the durability of the device."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Câu trước vừa đề cập đến <i>the tablet's high-quality case</i> (vỏ bọc chất lượng cao của máy tính bảng). Câu tiếp nối phù hợp nhất về logic là <b>(D) The protective shell ensures the durability of the device</b> (Lớp vỏ bảo vệ đảm bảo độ bền cho thiết bị), giải thích lợi ích của chiếc vỏ chất lượng cao đó.</p>",
                "type": "Sentence Insertion",
                "subCategory": "Sentence Insertion",
                "grammarTag": "Contextual Flow"
            },
            {
                "id": "ets22_t5_p6_134",
                "number": 134,
                "text": "",
                "options": {
                    "A": "lighting",
                    "B": "noise",
                    "C": "temperature",
                    "D": "wind"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Câu trước nói về tính năng <i>adaptive screen brightness</i> (độ sáng màn hình thích ứng). Do đó, tính năng này giúp điều chỉnh tự động theo các điều kiện ánh sáng <b>(A) lighting</b> dưới mức lý tưởng.<br/>- (B) <i>noise</i>: tiếng ồn.<br/>- (C) <i>temperature</i>: nhiệt độ.<br/>- (D) <i>wind</i>: gió.</p>",
                "type": "Vocabulary",
                "subCategory": "Business Vocabulary",
                "grammarTag": "Contextual Vocabulary"
            }
        ]
    },
    {
        "id": "ets22_t5_p6_s02",
        "title": "Questions 135-138 refer to the following memo.",
        "type": "Memo",
        "content": "<p><b>To:</b> All employees<br/><b>From:</b> Marcus Sindhu, IT Director<br/><b>Date:</b> June 1<br/><b>Subject:</b> Web site maintenance</p><p>Please note that routine maintenance of the server will be performed this weekend, affecting the content of our company Web site. The server [135] down for approximately eight hours from 11 P.M. on Saturday, June 6, to 7 A.M. on Sunday, June 7. [136] this time, access to the Web site will be restricted, and e-mail delivery will be paused. [137]. Once the server is back up, please take some time to explore the [138] features on the Web site. These include a new scheduler and a more user-friendly search tool.</p><p>Your patience is greatly appreciated. Please direct any questions to me.</p>",
        "questions": [
            {
                "id": "ets22_t5_p6_135",
                "number": 135,
                "text": "",
                "options": {
                    "A": "is",
                    "B": "was",
                    "C": "will be",
                    "D": "had been"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Máy chủ sẽ ngừng hoạt động trong khoảng 8 giờ từ 11 giờ đêm Thứ Bảy, ngày 6 tháng 6, đến 7 giờ sáng Chủ Nhật, ngày 7 tháng 6.</p><p><b>Phân tích ngữ pháp:</b> Thông báo gửi ngày 1 tháng 6, bảo trì sẽ diễn ra vào cuối tuần tới (ngày 6-7 tháng 6). Sự việc xảy ra trong tương lai nên cần dùng thì tương lai đơn <b>(C) will be</b>.</p>",
                "type": "Verb Tense",
                "subCategory": "Verbs & Tenses",
                "grammarTag": "Future Simple"
            },
            {
                "id": "ets22_t5_p6_136",
                "number": 136,
                "text": "",
                "options": {
                    "A": "During",
                    "B": "Despite",
                    "C": "Following",
                    "D": "Prior to"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Trong suốt khoảng thời gian này, quyền truy cập vào trang web sẽ bị hạn chế và việc gửi thư điện tử sẽ tạm dừng.</p><p><b>Phân tích ngữ pháp:</b> Giới từ chỉ khoảng thời gian diễn ra sự việc <i>this time</i> là <b>(A) During</b> (trong suốt khoảng thời gian).<br/>- (B) <i>Despite</i>: mặc dù.<br/>- (C) <i>Following</i>: sau khi.<br/>- (D) <i>Prior to</i>: trước khi.</p>",
                "type": "Preposition",
                "subCategory": "Preposition & Conjunction",
                "grammarTag": "Preposition of Time"
            },
            {
                "id": "ets22_t5_p6_137",
                "number": 137,
                "text": "",
                "options": {
                    "A": "The work will be done during business hours.",
                    "B": "A team of seven programmers will be hard at work.",
                    "C": "All Web site operations will resume on Sunday morning.",
                    "D": "Feel free to check your e-mail as needed."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Đoạn trước thông báo bảo trì từ đêm thứ Bảy đến 7 giờ sáng Chủ Nhật. Câu sau nói <i>Once the server is back up...</i> (Một khi máy chủ hoạt động trở lại...). Do đó câu liên kết phù hợp nhất là <b>(C) All Web site operations will resume on Sunday morning</b> (Mọi hoạt động của trang web sẽ tiếp tục trở lại vào sáng Chủ Nhật).</p>",
                "type": "Sentence Insertion",
                "subCategory": "Sentence Insertion",
                "grammarTag": "Contextual Flow"
            },
            {
                "id": "ets22_t5_p6_138",
                "number": 138,
                "text": "",
                "options": {
                    "A": "safety",
                    "B": "updated",
                    "C": "portable",
                    "D": "temporary"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Hãy dành chút thời gian để khám phá các tính năng đã được cập nhật trên trang web.</p><p><b>Phân tích từ vựng:</b> Sau đợt bảo trì nâng cấp trang web, các tính năng mới/được cải tiến được gọi là tính năng cập nhật: <b>(B) updated</b> features.<br/>- (A) <i>safety</i>: an toàn.<br/>- (C) <i>portable</i>: có thể xách tay/mang theo.<br/>- (D) <i>temporary</i>: tạm thời.</p>",
                "type": "Vocabulary",
                "subCategory": "Business Vocabulary",
                "grammarTag": "Participle Adjective"
            }
        ]
    },
    {
        "id": "ets22_t5_p6_s03",
        "title": "Questions 139-142 refer to the following article.",
        "type": "Article",
        "content": "<p><b>Small Business Costs: An Overview for Beginners</b></p><p>There are two main kinds of costs. Variable costs are one kind; they include staff wages or the cost of supplies. [139] costs are considered fixed. These include such things as rent payments and property taxes.</p><p>A third kind of cost is called an opportunity cost. You incur an opportunity cost whenever you make a decision to do one specific thing [140] choosing some alternative option. This cost refers to the lost opportunities you could have benefited from had you made a different choice. Careful consideration of potential opportunity costs is important. Ideally this should [141] decision making.</p><p>[142]. You should consult a licensed accountant for a more complete understanding.</p>",
        "questions": [
            {
                "id": "ets22_t5_p6_139",
                "number": 139,
                "text": "",
                "options": {
                    "A": "Any",
                    "B": "Both",
                    "C": "Other",
                    "D": "Those"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Có hai loại chi phí chính. Chi phí biến đổi là một loại... Những chi phí khác được coi là chi phí cố định.</p><p><b>Phân tích ngữ pháp:</b> Khi liệt kê phân loại: <i>one kind ... other costs</i> (loại này... những chi phí khác). Từ xác định <b>(C) Other</b> đứng trước danh từ số nhiều <i>costs</i> là đáp án chính xác.<br/>- (A) <i>Any</i>: bất kỳ.<br/>- (B) <i>Both</i>: cả hai (sau đó chỉ nói về fixed costs, không thể dùng both).<br/>- (D) <i>Those</i>: những cái đó (chưa được xác định trước đó để dùng those).</p>",
                "type": "Determiner",
                "subCategory": "Word Form",
                "grammarTag": "Determiner"
            },
            {
                "id": "ets22_t5_p6_140",
                "number": 140,
                "text": "",
                "options": {
                    "A": "except for",
                    "B": "just as",
                    "C": "rather than",
                    "D": "only if"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Bạn phát sinh chi phí cơ hội bất cứ khi nào bạn đưa ra quyết định làm một việc cụ thể thay vì chọn một phương án thay thế khác.</p><p><b>Phân tích từ vựng & cấu trúc:</b> Cụm liên từ/giới từ mang nghĩa 'thay vì / hơn là' là <b>(C) rather than</b> (+ V-ing / Noun).<br/>- (A) <i>except for</i>: ngoại trừ.<br/>- (B) <i>just as</i>: ngay khi / giống như.<br/>- (D) <i>only if</i>: chỉ khi.</p>",
                "type": "Preposition & Conjunction",
                "subCategory": "Preposition & Conjunction",
                "grammarTag": "Comparative Conjunction"
            },
            {
                "id": "ets22_t5_p6_141",
                "number": 141,
                "text": "",
                "options": {
                    "A": "eliminate",
                    "B": "influence",
                    "C": "replace",
                    "D": "automate"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Việc xem xét cẩn thận các chi phí cơ hội tiềm ẩn là rất quan trọng. Lý tưởng nhất là điều này nên tác động / chi phối quá trình ra quyết định.</p><p><b>Phân tích từ vựng:</b> Động từ phù hợp ngữ cảnh đi với tân ngữ <i>decision making</i> (quá trình ra quyết định) là <b>(B) influence</b> (ảnh hưởng, tác động đến).<br/>- (A) <i>eliminate</i>: loại bỏ.<br/>- (C) <i>replace</i>: thay thế.<br/>- (D) <i>automate</i>: tự động hóa.</p>",
                "type": "Vocabulary",
                "subCategory": "Business Vocabulary",
                "grammarTag": "Transitive Verb"
            },
            {
                "id": "ets22_t5_p6_142",
                "number": 142,
                "text": "",
                "options": {
                    "A": "The number of employees is continuing to fluctuate.",
                    "B": "A sales manager controls employee commissions.",
                    "C": "The business used to have a larger inventory.",
                    "D": "There are other types of business costs as well."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Câu tiếp theo khuyên: <i>You should consult a licensed accountant for a more complete understanding</i> (Bạn nên tham khảo ý kiến kế toán viên có chứng chỉ để hiểu đầy đủ hơn). Do đó câu liên kết phù hợp nói về việc vẫn còn nhiều chi phí khác: <b>(D) There are other types of business costs as well</b> (Ngoài ra cũng còn các loại chi phí kinh doanh khác nữa).</p>",
                "type": "Sentence Insertion",
                "subCategory": "Sentence Insertion",
                "grammarTag": "Contextual Flow"
            }
        ]
    },
    {
        "id": "ets22_t5_p6_s04",
        "title": "Questions 143-146 refer to the following article.",
        "type": "Article",
        "content": "<p><b>Morlon Home Goods Set to Open</b></p><p><b>TISDALE (2 April)</b>—Morlon Home Goods will open this Friday in a 130 square meter space on Waverly Road that was formerly [143] by Binkley's Market. The store features home décor items, such as lamps, wall art, and small furniture from around the globe, all at affordable prices.</p><p>\"Morlon has a great variety of attractive items for the modern home. Our inventory changes [144]. Patrons like to stop in often to see what is new,\" said Naoko Sasaki, the chain's marketing director. This is the first Morlon in the local area. [145]. A grand opening [146] featuring free food, giveaways, and discount coupons will be held on Saturday, 13 April from 10:00 A.M. to 6:00 P.M.</p>",
        "questions": [
            {
                "id": "ets22_t5_p6_143",
                "number": 143,
                "text": "",
                "options": {
                    "A": "occupation",
                    "B": "occupied",
                    "C": "occupy",
                    "D": "occupying"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Không gian trên đường Waverly trước đây từng được thuê / sử dụng bởi Siêu thị Binkley.</p><p><b>Phân tích ngữ pháp:</b> Cấu trúc bị động: <i>was + formerly + V3/ed + by...</i> (từng được chiếm chỗ / thuê bởi ai). Động từ dạng phân từ hai là <b>(B) occupied</b>.</p>",
                "type": "Verb Form",
                "subCategory": "Verbs & Tenses",
                "grammarTag": "Passive Voice"
            },
            {
                "id": "ets22_t5_p6_144",
                "number": 144,
                "text": "",
                "options": {
                    "A": "elsewhere",
                    "B": "afterward",
                    "C": "properly",
                    "D": "frequently"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Hàng hóa trong kho của chúng tôi thay đổi thường xuyên. Khách hàng quen thích ghé vào thường xuyên để xem có gì mới.</p><p><b>Phân tích từ vựng:</b> Câu sau nói khách thích ghé thường xuyên (stop in often), tương ứng với việc hàng trong kho thay đổi thường xuyên: <b>(D) frequently</b>.<br/>- (A) <i>elsewhere</i>: ở nơi khác.<br/>- (B) <i>afterward</i>: sau đó.<br/>- (C) <i>properly</i>: đúng cách.</p>",
                "type": "Vocabulary",
                "subCategory": "Business Vocabulary",
                "grammarTag": "Adverb of Frequency"
            },
            {
                "id": "ets22_t5_p6_145",
                "number": 145,
                "text": "",
                "options": {
                    "A": "The company has fourteen other stores around the country.",
                    "B": "Profits increased 25 percent since last quarter.",
                    "C": "Morlon's biggest competitor is Country Home.",
                    "D": "Binkley's Market went out of business earlier this year."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Câu trước nói: <i>This is the first Morlon in the local area</i> (Đây là cửa hàng Morlon đầu tiên ở khu vực địa phương). Câu nối tự nhiên và phù hợp nhất về quy mô chuỗi cửa hàng là <b>(A) The company has fourteen other stores around the country</b> (Công ty đã có mười bốn cửa hàng khác trên khắp cả nước).</p>",
                "type": "Sentence Insertion",
                "subCategory": "Sentence Insertion",
                "grammarTag": "Contextual Flow"
            },
            {
                "id": "ets22_t5_p6_146",
                "number": 146,
                "text": "",
                "options": {
                    "A": "celebrates",
                    "B": "celebrating",
                    "C": "celebrate",
                    "D": "celebration"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Một lễ kỷ niệm khai trương hoành tráng bao gồm đồ ăn miễn phí, quà tặng và phiếu giảm giá sẽ được tổ chức vào Thứ Bảy, ngày 13 tháng 4.</p><p><b>Phân tích ngữ pháp:</b> Cụm chủ ngữ: <i>A grand opening _______ featuring... will be held...</i>. Đứng sau mạo từ <i>A</i> và cụm tính từ <i>grand opening</i> (đại khai trương), ta cần danh từ chính số ít <b>(D) celebration</b> (buổi lễ kỷ niệm / sự kiện ăn mừng). Cụm <i>grand opening celebration</i> là cụm danh từ rất phổ biến.</p>",
                "type": "Word Form",
                "subCategory": "Word Form",
                "grammarTag": "Compound Noun"
            }
        ]
    }
]

output_path = "public/data/ets2022/test5/part6.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(part6_data, f, indent=2, ensure_ascii=False)

print(f"Generated {len(part6_data)} passage sets in {output_path}")
