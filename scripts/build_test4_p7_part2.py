import json

# Sets 6 to 10: Q158 to Q175
part2_sets = [
    # Set 6: Q158 - Q160 (Bulletin)
    {
        "id": "ets22_t4_p7_s06",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s06_p1",
                "type": "Bulletin",
                "title": "Opera Bulletin",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0; text-align: center;'>Dalston Opera News</h3>"
                           "<p style='text-align: center; font-weight: bold;'>Season Tickets Now Available</p>"
                           "<p>Purchase your season tickets now at www.dalstonopera.com/seasontickets.<br/>"
                           "• <b>May 4–12:</b> <i>Sigrun</i> (2 hours with 1 intermission)<br/>"
                           "• <b>July 6–14:</b> <i>Le Lapin</i> (3 hours with 2 intermissions)<br/>"
                           "• <b>September 14–22:</b> <i>The Shipmaster's Garden</i> (90 minutes with no intermission)<br/>"
                           "• <b>November 30–December 8:</b> <i>Orkestia</i> (4 hours with 3 intermissions)</p>"
                           "<p>Performances will take place at the Saloudi Auditorium beginning promptly at 8:00 P.M.</p>"
                           "<p><b>Artist-in-Residence Series:</b><br/>"
                           "Our rotating artist-in-residence program aims to bring new voices into the performing arts community. Throughout each production, visiting vocalists, directors, and choreographers will teach masterclasses and conduct interactive workshops for local high school and college music students.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_158",
                "number": 158,
                "text": "What is indicated about the Dalston Opera’s upcoming season?",
                "options": {
                    "A": "It will feature performers from local universities.",
                    "B": "It will begin in April.",
                    "C": "It features performances of four different works.",
                    "D": "It includes shows at multiple venues."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về mùa diễn sắp tới của Dalston Opera?<br/>(A) Có sự tham gia của các nghệ sĩ biểu diễn từ các trường đại học địa phương.<br/>(B) Bắt đầu vào tháng 4.<br/>(C) Bao gồm các buổi biểu diễn của 4 tác phẩm khác nhau.<br/>(D) Bao gồm các buổi diễn tại nhiều địa điểm khác nhau.</p><p><b>Bằng chứng trích dẫn:</b> Bản tin liệt kê 4 vở opera: <i>Sigrun</i> (tháng 5), <i>Le Lapin</i> (tháng 7), <i>The Shipmaster's Garden</i> (tháng 9), và <i>Orkestia</i> (tháng 11-12). Chọn <b>(C) It features performances of four different works</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Đếm số tác phẩm được liệt kê trong lịch diễn (4 tác phẩm)."
            },
            {
                "id": "ets22_t4_p7_159",
                "number": 159,
                "text": "What is NOT true about the Dalston Opera?",
                "options": {
                    "A": "Shows begin at 8:00 P.M.",
                    "B": "Its tickets can only be purchased in person.",
                    "C": "All performances are held at Saloudi Auditorium.",
                    "D": "Some shows include intermissions."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì KHÔNG đúng về Dalston Opera?<br/>(A) Các buổi biểu diễn bắt đầu lúc 8:00 tối.<br/>(B) Vé chỉ có thể mua trực tiếp tại quầy.<br/>(C) Tất cả các buổi diễn được tổ chức tại Thính phòng Saloudi.<br/>(D) Một số buổi diễn có giờ giải lao.</p><p><b>Bằng chứng trích dẫn:</b> Bản tin hướng dẫn mua vé: <i>'Purchase your season tickets now at www.dalstonopera.com/seasontickets'</i> (mua vé trực tuyến trên trang web). Do đó câu khẳng định chỉ mua vé trực tiếp tại quầy <b>(B)</b> là sai sự thật.</p>",
                "questionType": "Negative Fact",
                "subCategory": "Detail",
                "strategyHint": "Đối chiếu kênh bán vé qua website với khẳng định 'only purchased in person'."
            },
            {
                "id": "ets22_t4_p7_160",
                "number": 160,
                "text": "According to the bulletin, what will the artists-in-residence do?",
                "options": {
                    "A": "Sell merchandise",
                    "B": "Conduct workshops",
                    "C": "Design stage costumes",
                    "D": "Direct rehearsals"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo bản tin, các nghệ sĩ lưu trú (artists-in-residence) sẽ làm gì?<br/>(A) Bán hàng hóa lưu niệm.<br/>(B) Điều hành/tổ chức các buổi hội thảo tập huấn (workshops).<br/>(C) Thiết kế trang phục sân khấu.<br/>(D) Chỉ đạo các buổi tổng duyệt.</p><p><b>Bằng chứng trích dẫn:</b> Bản tin ghi rõ: <i>'visiting vocalists, directors, and choreographers will teach masterclasses and conduct interactive workshops for local high school and college music students.'</i>. Chọn <b>(B) Conduct workshops</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "conduct interactive workshops = Conduct workshops."
            }
        ]
    },

    # Set 7: Q161 - Q163 (Article)
    {
        "id": "ets22_t4_p7_s07",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s07_p1",
                "type": "Article",
                "title": "News Article",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0;'>Muelker Shipyard Undergoes Transformation</h3>"
                           "<p><b>May 2—</b>The Muelker Shipyard, a once-bustling ship manufacturing center, is being given a new role. A team of engineers and architects is working to turn it into an open-air pedestrian mall with restaurants, a dozen retail businesses, and an outdoor patio that will feature live music performances.</p>"
                           "<p>Until June of last year, the city had planned to demolish the shipyard—a decision that caused a strong reaction from community members, especially former shipbuilders who viewed the site as a treasured industrial landmark. In response to public rallies and petitions signed by thousands of residents, the municipal council voted to preserve the historic brick structures and repurpose the land for commercial and recreational use.</p>"
                           "<p>Construction on the project began last month, and phase one is scheduled to open to the public by next spring.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_161",
                "number": 161,
                "text": "What was the shipyard previously used for?",
                "options": {
                    "A": "Building vessels",
                    "B": "Storing cargo containers",
                    "C": "Training naval officers",
                    "D": "Hosting public festivals"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Xưởng đóng tàu trước đây được sử dụng để làm gì?<br/>(A) Đóng tàu bè/phương tiện thủy.<br/>(B) Lưu trữ container hàng hóa.<br/>(C) Huấn luyện sĩ quan hải quân.<br/>(D) Tổ chức các lễ hội công cộng.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 viết: <i>'The Muelker Shipyard, a once-bustling ship manufacturing center...'</i> (Xưởng đóng tàu Muelker, một trung tâm sản xuất đóng tàu từng rất nhộn nhịp). <i>Ship manufacturing = Building vessels</i>. Chọn <b>(A) Building vessels</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Overview",
                "strategyHint": "ship manufacturing = building vessels."
            },
            {
                "id": "ets22_t4_p7_162",
                "number": 162,
                "text": "What is NOT mentioned as a feature of the transformed shipyard?",
                "options": {
                    "A": "Retail shops",
                    "B": "Dining establishments",
                    "C": "A museum",
                    "D": "A live music venue"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì KHÔNG được đề cập như một đặc điểm của xưởng đóng tàu sau cải tạo?<br/>(A) Các cửa hàng bán lẻ.<br/>(B) Cơ sở ăn uống.<br/>(C) Một viện bảo tàng.<br/>(D) Địa điểm biểu diễn âm nhạc trực tiếp.</p><p><b>Bằng chứng trích dẫn:</b> Bài báo liệt kê: <i>'restaurants (B), a dozen retail businesses (A), and an outdoor patio that will feature live music performances (D)'</i>. Không hề có bảo tàng <b>(C) A museum</b>.</p>",
                "questionType": "Negative Fact",
                "subCategory": "Detail",
                "strategyHint": "Đối chiếu 4 phương án với danh sách các tiện ích mới được liệt kê ở đoạn 1."
            },
            {
                "id": "ets22_t4_p7_163",
                "number": 163,
                "text": "Why did city officials decide not to demolish the shipyard?",
                "options": {
                    "A": "Environmental regulations prevented demolition.",
                    "B": "Community members objected.",
                    "C": "A private developer purchased the site.",
                    "D": "Demolition costs were too high."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao các quan chức thành phố lại quyết định không phá dỡ xưởng đóng tàu?<br/>(A) Quy định môi trường ngăn cản việc phá dỡ.<br/>(B) Người dân trong cộng đồng phản đối.<br/>(C) Một nhà phát triển tư nhân đã mua lại khu đất.<br/>(D) Chi phí phá dỡ quá cao.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 cho biết: <i>'a decision that caused a strong reaction from community members, especially former shipbuilders... In response to public rallies and petitions signed by thousands of residents...'</i> (quyết định vấp phải phản ứng mạnh mẽ từ cộng đồng, các cuộc biểu tình và đơn kiến nghị của hàng ngàn người dân). Chọn <b>(B) Community members objected</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Detail",
                "strategyHint": "strong reaction / public rallies / petitions = community members objected."
            }
        ]
    },

    # Set 8: Q164 - Q167 (Memo with Text Insertion)
    {
        "id": "ets22_t4_p7_s08",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s08_p1",
                "type": "Memo",
                "title": "Internal Memorandum",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>To:</b> Customer Service Team<br/>"
                           "<b>From:</b> Scott Davis, Director of Customer Service<br/>"
                           "<b>Date:</b> July 22<br/>"
                           "<b>Subject:</b> Customer Service Appreciation Week</p>"
                           "<p>Today kicks off Harkness Clothiers' Customer Service Appreciation Week. I want to take this opportunity to thank you for your dedication and professionalism this year. — [1] —. Each one of you has delivered exceptional customer service. Management is proud of what you have achieved as a team. — [2] —. We understand that last year's merger with Sporting Clothes, Inc., was confusing and difficult at times. Your service stayed steady throughout the process and your teamwork was truly admirable. — [3] —.</p>"
                           "<p>To show our sincere gratitude, daily prize drawings will be held, and on Thursday, management will host a catered luncheon in the main conference room from 12:00 P.M. to 2:00 P.M. — [4] —. Please stop by and enjoy the celebration!</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_164",
                "number": 164,
                "text": "What is the main purpose of the memo?",
                "options": {
                    "A": "To outline new customer service guidelines",
                    "B": "To announce changes to company benefits",
                    "C": "To express gratitude to a team",
                    "D": "To introduce a new department director"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích chính của bản ghi nhớ là gì?<br/>(A) Nêu đề cương hướng dẫn dịch vụ khách hàng mới.<br/>(B) Thông báo thay đổi phúc lợi công ty.<br/>(C) Bày tỏ lòng biết ơn tới một đội ngũ nhân viên.<br/>(D) Giới thiệu giám đốc phòng ban mới.</p><p><b>Bằng chứng trích dẫn:</b> Giám đốc viết: <i>'I want to take this opportunity to thank you for your dedication and professionalism this year... To show our sincere gratitude...'</i>. Mục đích là <b>(C) To express gratitude to a team</b>.</p>",
                "questionType": "Purpose",
                "subCategory": "Overview",
                "strategyHint": "thank you for your dedication / show our sincere gratitude = express gratitude."
            },
            {
                "id": "ets22_t4_p7_165",
                "number": 165,
                "text": "What happened at Harkness Clothiers last year?",
                "options": {
                    "A": "It merged with another company.",
                    "B": "It opened a new distribution center.",
                    "C": "It launched an online store.",
                    "D": "It recruited a new executive team."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì đã xảy ra tại Harkness Clothiers vào năm ngoái?<br/>(A) Công ty sáp nhập với một công ty khác.<br/>(B) Mở trung tâm phân phối mới.<br/>(C) Ra mắt cửa hàng trực tuyến.<br/>(D) Tuyển dụng ban điều hành mới.</p><p><b>Bằng chứng trích dẫn:</b> Bản ghi nhớ nhắc lại: <i>'We understand that last year's merger with Sporting Clothes, Inc., was confusing and difficult at times.'</i> (Chúng tôi hiểu rằng vụ sáp nhập vào năm ngoái với Sporting Clothes, Inc. đôi khi gây bối rối và khó khăn). Chọn <b>(A) It merged with another company</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "merger with Sporting Clothes, Inc. = merged with another company."
            },
            {
                "id": "ets22_t4_p7_166",
                "number": 166,
                "text": "What will occur on Thursday?",
                "options": {
                    "A": "A catered luncheon",
                    "B": "A training seminar",
                    "C": "A customer survey review",
                    "D": "A staff award ceremony"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì sẽ diễn ra vào thứ Năm?<br/>(A) Bữa tiệc trưa được đặt dịch vụ ăn uống (catered luncheon).<br/>(B) Buổi hội thảo đào tạo.<br/>(C) Đợt đánh giá khảo sát khách hàng.<br/>(D) Lễ trao giải nhân viên.</p><p><b>Bằng chứng trích dẫn:</b> Bản ghi nhớ nêu rõ: <i>'and on Thursday, management will host a catered luncheon in the main conference room from 12:00 P.M. to 2:00 P.M.'</i>. Chọn <b>(A) A catered luncheon</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "on Thursday ... management will host a catered luncheon."
            },
            {
                "id": "ets22_t4_p7_167",
                "number": 167,
                "text": "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n\n“In fact, customer satisfaction ratings reached an all-time high of 96 percent.”",
                "options": {
                    "A": "[1]",
                    "B": "[2]",
                    "C": "[3]",
                    "D": "[4]"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Vị trí nào trong số [1], [2], [3] và [4] là phù hợp nhất cho câu văn sau đây?\n'Trên thực tế, tỷ lệ hài lòng của khách hàng đã đạt mức cao kỷ lục mọi thời đại là 96%.'<br/>(A) [1]<br/>(B) [2]<br/>(C) [3]<br/>(D) [4]</p><p><b>Bằng chứng trích dẫn:</b> Trước vị trí [3], tác giả ca ngợi: <i>'Your service stayed steady throughout the process and your teamwork was truly admirable.'</i> Câu chứng minh <i>'In fact, customer satisfaction ratings reached an all-time high of 96 percent'</i> cung cấp số liệu thực tế củng cố cho lời khen ngợi đó trước khi chuyển sang đoạn thông báo phần thưởng tiệc mừng. Do đó vị trí <b>[3]</b> là chuẩn xác nhất. Chọn <b>(C) [3]</b>.</p>",
                "questionType": "Sentence Insertion",
                "subCategory": "Sentence Insertion",
                "strategyHint": "In fact + số liệu 96% bổ sung chứng cứ trực tiếp cho câu khen ngợi teamwork và dịch vụ ổn định trước đó."
            }
        ]
    },

    # Set 9: Q168 - Q171 (Notice)
    {
        "id": "ets22_t4_p7_s09",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s09_p1",
                "type": "Notice",
                "title": "Book Sale Notice",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0; text-align: center;'>Friends of the Chesterton Public Library Book Sale</h3>"
                           "<p>The Chesterton Public Library will host its annual book sale this weekend on the library's second floor. The hours are Saturday, November 16, 9:00 A.M. to 5:00 P.M., and Sunday, November 17, 12:00 noon to 5:00 P.M. A special preview sale for the Friends of Chesterton Public Library (FCPL), the library's volunteer support group, will be held on Friday, November 15, from 4:00 P.M. to 8:00 P.M.</p>"
                           "<p>The sale will include books that the library no longer lends, as well as books donated by the public. Hardcovers are $2 each and paperbacks are $1 each. In addition, on Sunday between 3:00 P.M. and 5:00 P.M., shoppers can purchase a grocery bag provided by the library and fill it with as many books as they want for just $5.</p>"
                           "<p>We are still accepting book donations through Thursday, November 14. Donations can be dropped off at the circulation desk during regular library hours. Tax receipts are available upon request from the staff.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_168",
                "number": 168,
                "text": "Who can attend the preview sale on November 15?",
                "options": {
                    "A": "Library staff only",
                    "B": "Members of a volunteer group",
                    "C": "Local school teachers",
                    "D": "City officials"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Ai có thể tham dự buổi bán xem trước vào ngày 15 tháng 11?<br/>(A) Chỉ nhân viên thư viện.<br/>(B) Thành viên của một nhóm tình nguyện.<br/>(C) Giáo viên các trường học địa phương.<br/>(D) Quan chức thành phố.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 1 nêu: <i>'A special preview sale for the Friends of Chesterton Public Library (FCPL), the library's volunteer support group, will be held on Friday, November 15...'</i>. Chọn <b>(B) Members of a volunteer group</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "FCPL, the library's volunteer support group = Members of a volunteer group."
            },
            {
                "id": "ets22_t4_p7_169",
                "number": 169,
                "text": "What is stated about the books being sold?",
                "options": {
                    "A": "Some were previously in the library’s collection.",
                    "B": "All books are newly published.",
                    "C": "They are organized alphabetically by author.",
                    "D": "They must be returned within two weeks."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được nêu về các cuốn sách được bán?<br/>(A) Một số cuốn trước đây từng nằm trong bộ sưu tập của thư viện.<br/>(B) Tất cả sách đều là sách mới xuất bản.<br/>(C) Chúng được sắp xếp theo thứ tự bảng chữ cái tác giả.<br/>(D) Phải được trả lại trong vòng hai tuần.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn 2 cho biết: <i>'The sale will include books that the library no longer lends, as well as books donated by the public.'</i> (Sách bao gồm những cuốn thư viện không còn cho mượn nữa). Điều đó chứng minh chúng từng thuộc bộ sưu tập mượn đọc của thư viện <b>(A) Some were previously in the library's collection</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "books that the library no longer lends = previously in the library's collection."
            },
            {
                "id": "ets22_t4_p7_170",
                "number": 170,
                "text": "According to the notice, what will happen on Sunday afternoon?",
                "options": {
                    "A": "Author signings will take place.",
                    "B": "Admission fees will be waived.",
                    "C": "Donated books will be auctioned.",
                    "D": "Books will be sold at a discount."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo thông báo, điều gì sẽ diễn ra vào chiều Chủ nhật?<br/>(A) Tác giả ký tặng sách.<br/>(B) Miễn phí vé vào cửa.<br/>(C) Đấu giá sách quyên góp.<br/>(D) Sách sẽ được bán với giá giảm/ưu đãi đặc biệt.</p><p><b>Bằng chứng trích dẫn:</b> Thông báo cho hay: <i>'In addition, on Sunday between 3:00 P.M. and 5:00 P.M., shoppers can purchase a grocery bag provided by the library and fill it with as many books as they want for just $5.'</i> (chiều Chủ nhật được mua cả túi đầy sách chỉ với 5 đô la). Đây là chính sách bán giảm giá <b>(D) Books will be sold at a discount</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Detail",
                "strategyHint": "fill a bag with as many books as they want for $5 = sold at a discount."
            },
            {
                "id": "ets22_t4_p7_171",
                "number": 171,
                "text": "What is indicated about donating books?",
                "options": {
                    "A": "Donations must be mailed to the director.",
                    "B": "Receipts for donations are available.",
                    "C": "Only hardcover books are accepted.",
                    "D": "Donors receive a free preview ticket."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về việc quyên góp sách?<br/>(A) Phải gửi quyên góp qua bưu điện đến giám đốc.<br/>(B) Có sẵn biên lai xác nhận quyên góp.<br/>(C) Chỉ chấp nhận sách bìa cứng.<br/>(D) Người quyên góp được tặng vé xem trước miễn phí.</p><p><b>Bằng chứng trích dẫn:</b> Câu cuối cùng nêu rõ: <i>'Tax receipts are available upon request from the staff.'</i> (Biên lai thuế có sẵn theo yêu cầu từ nhân viên). Chọn <b>(B) Receipts for donations are available</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Tax receipts are available = Receipts for donations are available."
            }
        ]
    },

    # Set 10: Q172 - Q175 (Chat Discussion)
    {
        "id": "ets22_t4_p7_s10",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t4_p7_s10_p1",
                "type": "Chat",
                "title": "Corporate Chat",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>Lily Park [4:03 P.M.]</b><br/>Hello, everyone. I just want to check in with you before the weekend. Kaz, how did your meeting with Blumfield Associates go?</p>"
                           "<p><b>Kaz Fedorowitz [4:10 P.M.]</b><br/>It could not have been better. They are purchasing 40 new laptops with a service agreement. I've got the signed contract in hand.</p>"
                           "<p><b>Lily Park [4:11 P.M.]</b><br/>Outstanding! Nice way to wrap up the week.</p>"
                           "<p><b>David Esposito [4:12 P.M.]</b><br/>Congratulations! This one puts you over the top. You are now the top salesperson for the third month in a row.</p>"
                           "<p><b>Danielle Becker [4:13 P.M.]</b><br/>That's amazing, Kaz! By the way, I submitted the travel reimbursement form for your trip to Blumfield's headquarters earlier today. Finance should process the refund by Tuesday.</p>"
                           "<p><b>Kaz Fedorowitz [4:17 P.M.]</b><br/>Thanks so much for taking care of that, Danielle. I really appreciate it.</p>"
                           "<p><b>Danielle Becker [4:18 P.M.]</b><br/>My pleasure!</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t4_p7_172",
                "number": 172,
                "text": "In what type of business are the writers involved?",
                "options": {
                    "A": "Real estate",
                    "B": "Travel services",
                    "C": "Office technology",
                    "D": "Financial consulting"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Những người nhắn tin tham gia vào loại hình kinh doanh nào?<br/>(A) Bất động sản.<br/>(B) Dịch vụ du lịch.<br/>(C) Công nghệ văn phòng (Office technology).<br/>(D) Tư vấn tài chính.</p><p><b>Bằng chứng trích dẫn:</b> Kaz thông báo chốt hợp đồng: <i>'They are purchasing 40 new laptops with a service agreement.'</i> (Họ mua 40 chiếc máy tính xách tay mới kèm hợp đồng bảo dưỡng dịch vụ). Công ty kinh doanh thiết bị máy tính văn phòng <b>(C) Office technology</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Overview",
                "strategyHint": "purchasing 40 new laptops with a service agreement -> Office technology."
            },
            {
                "id": "ets22_t4_p7_173",
                "number": 173,
                "text": "What most likely is Ms. Park’s job title?",
                "options": {
                    "A": "Advertising specialist",
                    "B": "Director of human resources",
                    "C": "Bookkeeper",
                    "D": "Sales division manager"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Chức danh công việc của cô Park nhiều khả năng nhất là gì?<br/>(A) Chuyên viên quảng cáo.<br/>(B) Giám đốc nhân sự.<br/>(C) Nhân viên kế toán sổ sách.<br/>(D) Quản lý bộ phận bán hàng (Sales division manager).</p><p><b>Bằng chứng trích dẫn:</b> Cô Park kiểm tra tiến độ của các nhân viên trước cuối tuần (<i>check in with you</i>), theo dõi cuộc gặp gỡ khách hàng ký hợp đồng của Kaz và khen ngợi thành tích chốt đơn bán hàng. Cô đóng vai trò quản lý bộ phận bán lẻ <b>(D) Sales division manager</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview",
                "strategyHint": "Người quản lý theo dõi và kiểm tra kết quả bán hàng của nhóm (check in, wrap up the week)."
            },
            {
                "id": "ets22_t4_p7_174",
                "number": 174,
                "text": "What is indicated about Mr. Fedorowitz?",
                "options": {
                    "A": "He will receive an award.",
                    "B": "He is transferring to a new branch.",
                    "C": "He designed a new laptop model.",
                    "D": "He recently started working at the company."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về ông Fedorowitz?<br/>(A) Ông ấy sẽ nhận được giải thưởng.<br/>(B) Ông ấy đang chuyển đến chi nhánh mới.<br/>(C) Ông ấy thiết kế một mẫu máy tính xách tay mới.<br/>(D) Ông ấy vừa mới bắt đầu làm việc tại công ty.</p><p><b>Bằng chứng trích dẫn:</b> David chúc mừng Kaz: <i>'Congratulations! This one puts you over the top. You are now the top salesperson for the third month in a row.'</i> (Xin chúc mừng! Hợp đồng này giúp anh đứng đầu bảng. Anh là nhân viên bán hàng xuất sắc nhất tháng thứ ba liên tiếp). Với danh hiệu đứng đầu liên tiếp 3 tháng, ông ấy sẽ được trao danh hiệu/phần thưởng xuất sắc <b>(A) He will receive an award</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Detail",
                "strategyHint": "top salesperson for the third month in a row -> He will receive an award."
            },
            {
                "id": "ets22_t4_p7_175",
                "number": 175,
                "text": "At 4:18 P.M., what does Ms. Becker most likely mean when she writes, “My pleasure!”?",
                "options": {
                    "A": "She is happy to help in refunding some travel expenses.",
                    "B": "She is pleased to have successfully obtained a new client.",
                    "C": "She feels relieved that it is the end of the workweek.",
                    "D": "She is glad to have suggested leasing equipment."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Vào lúc 4:18 chiều, cô Becker có ý gì nhất khi viết: 'Rất hân hạnh được giúp đỡ / Không có chi!'?<br/>(A) Cô ấy vui lòng được hỗ trợ trong việc hoàn trả chi phí đi lại.<br/>(B) Cô ấy vui mừng vì đã giành được khách hàng mới thành công.<br/>(C) Cô ấy thấy nhẹ nhõm vì đã đến cuối tuần làm việc.<br/>(D) Cô ấy vui vì đã gợi ý cho thuê thiết bị.</p><p><b>Bằng chứng trích dẫn:</b> Trước đó lúc 4:13, cô Becker báo: <i>'I submitted the travel reimbursement form for your trip to Blumfield's headquarters... Finance should process the refund by Tuesday.'</i> và Kaz cảm ơn cô lúc 4:17. Lời đáp <i>'My pleasure!'</i> ở 4:18 là phản hồi đáp lễ cho việc giúp nộp giấy tờ hoàn chi phí công tác. Chọn <b>(A) She is happy to help in refunding some travel expenses</b>.</p>",
                "questionType": "Inference",
                "subCategory": "Implication",
                "strategyHint": "travel reimbursement form / refund -> refunding travel expenses."
            }
        ]
    }
]

with open("scratch/test4_p7_part2.json", "w", encoding="utf-8") as f:
    json.dump(part2_sets, f, ensure_ascii=False, indent=2)

print("Part 2 (Sets 6-10, Q158-Q175) built successfully with", len(part2_sets), "sets and", sum(len(s["questions"]) for s in part2_sets), "questions.")
