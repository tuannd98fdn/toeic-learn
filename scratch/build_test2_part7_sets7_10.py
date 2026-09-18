import json

part7_sets_7_10 = [
    # SET 7: Q161-163 (Advertisement)
    {
        "id": "ets22_t2_p7_s07",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s07_p1",
                "type": "Advertisement",
                "title": "Advertisement",
                "content": "<div style='border: 1px solid var(--border-color, #444); padding: 16px; border-radius: 8px;'><h3 style='margin-top:0; text-align:center;'>AKBAR STORAGE COMPANY</h3><p style='text-align:center;'>227 Wexham Road, Bridgetown<br/>Phone: 246-555-0147<br/><b>Satisfying storage needs in Barbados for 30 years!</b></p><ul><li>Units are available in small, standard, and premium sizes to fit your storage needs.</li><li>Your clean, dry storage unit is available to you around the clock.</li><li>Our storage facility is monitored by high-quality security cameras, and each customer is given a pass code. Our secure electronic gate can be released only by entering this code.</li><li>Our business office is open 9 A.M. to 6 P.M., Monday to Friday, and 9 A.M. to 2 P.M. on Saturday. Stop in to speak with one of our representatives.</li></ul><p style='text-align:center; font-weight:bold; margin-top:16px;'>And now, get 20 percent off with a twelve-month rental of our largest type of unit!</p></div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_161",
                "number": 161,
                "text": "According to the advertisement, when can customers access their storage units?",
                "options": {
                    "A": "At any time",
                    "B": "Monday to Friday only",
                    "C": "On Saturday and Sunday only",
                    "D": "When accompanied by a security person"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Theo quảng cáo, khi nào khách hàng có thể tiếp cận các kho lưu trữ của họ?<br/>(A) Bất kỳ lúc nào.<br/>(B) Chỉ từ Thứ Hai đến Thứ Sáu.<br/>(C) Chỉ vào Thứ Bảy và Chủ Nhật.<br/>(D) Khi có nhân viên an ninh đi cùng.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Quảng cáo ghi rõ: <i>'Your clean, dry storage unit is available to you around the clock.'</i> (Kho lưu trữ sạch sẽ, khô ráo của bạn luôn sẵn sàng phục vụ bạn suốt ngày đêm). Cụm từ <b>around the clock</b> có nghĩa là 24/24, tương đương với <b>At any time</b> (bất kỳ thời gian nào).</p><p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>around the clock = 24 hours a day = at any time</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét cụm từ chỉ thời gian 'available to you' trong danh sách tính năng."
            },
            {
                "id": "ets22_t2_p7_162",
                "number": 162,
                "text": "What do customers need to do in order to enter the storage facility?",
                "options": {
                    "A": "Stop at the business office",
                    "B": "Show an identification card",
                    "C": "Input a code at the gate",
                    "D": "Check in with the security guard"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Khách hàng cần làm gì để đi vào cơ sở lưu trữ?<br/>(A) Dừng lại tại văn phòng kinh doanh.<br/>(B) Xuất trình thẻ căn cước.<br/>(C) Nhập mã tại cổng.<br/>(D) Đăng ký với nhân viên bảo vệ.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Quảng cáo nêu: <i>'...each customer is given a pass code. Our secure electronic gate can be released only by entering this code.'</i> (mỗi khách hàng được cấp một mã số qua cổng. Cổng điện tử an ninh của chúng tôi chỉ có thể mở ra bằng cách nhập mã số này). Nhập mã để mở cổng điện tử chính là <i>Input a code at the gate</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét từ khóa 'electronic gate' và 'entering this code'."
            },
            {
                "id": "ets22_t2_p7_163",
                "number": 163,
                "text": "How can customers receive a discount?",
                "options": {
                    "A": "By cutting back on their storage space by 20 percent",
                    "B": "By renting a premium-size unit for one year",
                    "C": "By showing the advertisement to a service representative",
                    "D": "By agreeing to rent a unit for a second year"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Làm thế nào để khách hàng nhận được chiết khấu giảm giá?<br/>(A) Bằng cách cắt giảm 20% không gian lưu trữ.<br/>(B) Bằng cách thuê một kho cỡ cao cấp trong một năm.<br/>(C) Bằng cách đưa mẩu quảng cáo cho đại diện dịch vụ.<br/>(D) Bằng cách đồng ý thuê kho cho năm thứ hai.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Dòng cuối quảng cáo ghi: <i>'And now, get 20 percent off with a twelve-month rental of our largest type of unit!'</i> (Và hiện tại, nhận giảm giá 20% khi thuê kho loại lớn nhất trong mười hai tháng!). <i>Twelve-month = one year</i>; và <i>largest type of unit = premium-size unit</i> (theo dòng 1: small, standard, and premium sizes). Do đó chọn (B).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Kết hợp thông tin: 'twelve-month' = 'one year' và 'largest type' = 'premium-size'."
            }
        ]
    },

    # SET 8: Q164-167 (Article)
    {
        "id": "ets22_t2_p7_s08",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s08_p1",
                "type": "Article",
                "title": "Article",
                "content": "<p><b>Gamer Arcades Joins Forces with Frankie’s Burgers Franchises</b></p><p>LEEDS (9 July)—Gamer Arcades and fast-food franchise Frankie’s Burgers have announced a new partnership, which will formally start at the beginning of August. At that time, all Gamer Arcades will introduce a Frankie’s Burgers to their locations.</p><p>The president of Gamer Arcades, Allen Ingram, expressed his excitement about the possibilities of this strategic partnership. “The outstanding quality of Frankie’s Burgers will enhance customers' enjoyment of our arcades,” said Mr. Ingram. “Until now, there have been no food options on the premises. With this partnership, however, customers will be able to take a break for a delicious meal and then get back to enjoying our state-of-the-art gaming centers.”</p><p>This is not the first major change Mr. Ingram has made to the company since he took over from Justine Beckerman last November. A month after assuming the role of president, he brought virtual reality games to Gamer Arcades. Since that time, he has also expanded the company into Germany and Belgium, and he has launched several charity initiatives associated with Gamer Arcades.</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_164",
                "number": 164,
                "text": "When will the partnership become official?",
                "options": {
                    "A": "In July",
                    "B": "In August",
                    "C": "In November",
                    "D": "In December"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Khi nào quan hệ đối tác sẽ chính thức bắt đầu?<br/>(A) Vào tháng Bảy.<br/>(B) Vào tháng Tám.<br/>(C) Vào tháng Mười Một.<br/>(D) Vào tháng Mười Hai.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 1 nêu rõ: <i>'...announced a new partnership, which will formally start at the beginning of August.'</i> (...đã công bố quan hệ đối tác mới, quan hệ này sẽ chính thức bắt đầu vào đầu tháng Tám). Do đó, chọn (B) In August.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét mốc thời gian sau cụm từ 'formally start at...'."
            },
            {
                "id": "ets22_t2_p7_165",
                "number": 165,
                "text": "What is indicated about Gamer Arcades’ partnership with Frankie’s Burgers?",
                "options": {
                    "A": "It was agreed upon after months of negotiation.",
                    "B": "It will not apply to all Gamer Arcades sites.",
                    "C": "It is waiting for shareholder approval.",
                    "D": "It is Gamer Arcades’ first partnership with a restaurant."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Điều gì được chỉ ra về quan hệ đối tác của Gamer Arcades với Frankie’s Burgers?<br/>(A) Nó được thống nhất sau nhiều tháng đàm phán.<br/>(B) Nó sẽ không áp dụng cho tất cả các địa điểm của Gamer Arcades.<br/>(C) Nó đang chờ sự chấp thuận của cổ đông.<br/>(D) Đây là quan hệ đối tác đầu tiên của Gamer Arcades với một nhà hàng ăn uống.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Ông Ingram phát biểu ở đoạn 2: <i>'Until now, there have been no food options on the premises. With this partnership, however, customers will be able to take a break for a delicious meal...'</i> (Cho đến nay, chưa từng có lựa chọn ăn uống nào tại cơ sở. Tuy nhiên, với quan hệ đối tác này, khách hàng sẽ có thể nghỉ giải lao để thưởng thức bữa ăn ngon...). Điều này chứng minh từ trước tới nay họ chưa từng hợp tác với nhà hàng ăn nào, đây là đối tác nhà hàng đầu tiên.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Suy luận từ phát biểu 'Until now, there have been no food options on the premises'."
            },
            {
                "id": "ets22_t2_p7_166",
                "number": 166,
                "text": "According to the article, who is Ms. Beckerman?",
                "options": {
                    "A": "The president of a food supply company",
                    "B": "The owner of a Frankie’s Burgers franchise",
                    "C": "The owner of a game manufacturing company",
                    "D": "The former president of Gamer Arcades"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Theo bài báo, bà Beckerman là ai?<br/>(A) Chủ tịch một công ty cung cấp thực phẩm.<br/>(B) Chủ sở hữu một chi nhánh nhượng quyền của Frankie’s Burgers.<br/>(C) Chủ sở hữu một công ty sản xuất trò chơi.<br/>(D) Cựu chủ tịch của Gamer Arcades.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 3 viết: <i>'...since he took over from Justine Beckerman last November. A month after assuming the role of president...'</i> (...kể từ khi ông ấy tiếp quản vị trí từ Justine Beckerman vào tháng 11 năm ngoái. Một tháng sau khi đảm nhận vai trò chủ tịch...). Điều này khẳng định Justine Beckerman là người tiền nhiệm, tức cựu chủ tịch của Gamer Arcades (former president).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Từ khóa 'took over from Justine Beckerman... assuming the role of president' chỉ người tiền nhiệm."
            },
            {
                "id": "ets22_t2_p7_167",
                "number": 167,
                "text": "What did Mr. Ingram do first at Gamer Arcades?",
                "options": {
                    "A": "He introduced virtual reality games.",
                    "B": "He started several charity programs.",
                    "C": "He opened branches in Belgium.",
                    "D": "He moved the headquarters to Germany."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Ông Ingram đã làm điều gì đầu tiên tại Gamer Arcades?<br/>(A) Ông ấy giới thiệu các trò chơi thực tế ảo.<br/>(B) Ông ấy bắt đầu một số chương trình từ thiện.<br/>(C) Ông ấy mở các chi nhánh ở Bỉ.<br/>(D) Ông ấy chuyển trụ sở chính sang Đức.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 3 nêu thứ tự thời gian: <i>'A month after assuming the role of president, he brought virtual reality games to Gamer Arcades. Since that time, he has also expanded the company into Germany and Belgium, and he has launched several charity initiatives...'</i> (Một tháng sau khi đảm nhận vai trò chủ tịch, ông đã đưa các trò chơi thực tế ảo vào Gamer Arcades. Kể từ thời điểm đó, ông cũng đã mở rộng công ty sang Đức và Bỉ, và khởi động một số sáng kiến từ thiện...). Hành động diễn ra đầu tiên là đưa trò chơi thực tế ảo vào (virtual reality games).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Chú ý mốc thời gian 'A month after assuming the role' (hành động đầu tiên) so với 'Since that time'."
            }
        ]
    },

    # SET 9: Q168-171 (Letter)
    {
        "id": "ets22_t2_p7_s09",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s09_p1",
                "type": "Letter",
                "title": "Letter",
                "content": "<p>25 May<br/>Ms. Deborah Kiernan<br/>Sonicboom Distribution Agency<br/>84 Arthur Road<br/>London N7 6DR</p><p>Dear Ms. Kiernan:</p><p>Earthsky Films International is seeking a distributor for our latest production, Project Aerial. Having premiered in April at the North Brabant Film Festival in Eindhoven, the Netherlands, the film received strong reviews from critics and was honored with the Diamond Pen Award for best screenplay. [1]</p><p>Our film, Project Aerial, examines an exciting period in aviation history that began more than 150 years ago. The aviation industry owes its development to a number of brilliant and enterprising people. [2] The film highlights the major innovators as well as those who were lesser known.</p><p>The two lead roles are played by Winston Halsey and Virgil Golding, figures that are familiar to international audiences. [3] Mr. Golding is known for his role in, among others, The Rigby Conspiracy, and Mr. Halsey is recognized for his performance in Whereabouts Unknown.</p><p>If you are interested in marketing our film, I would be happy to e-mail you a secure link so that you can view it. [4] I hope to hear from you soon.</p><p>Sincerely,<br/>Jayesh Chaudhari, CEO<br/>Earthsky Films International</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_168",
                "number": 168,
                "text": "What would Mr. Chaudhari like to do?",
                "options": {
                    "A": "Promote a museum exhibit about aviation",
                    "B": "Hire a manager for a new business",
                    "C": "Become a film festival judge",
                    "D": "Introduce a movie to a wider audience"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Ông Chaudhari muốn làm gì?<br/>(A) Quảng bá một triển lãm bảo tàng về hàng không.<br/>(B) Thuê một người quản lý cho doanh nghiệp mới.<br/>(C) Trở thành giám khảo liên hoan phim.<br/>(D) Giới thiệu một bộ phim đến với lượng khán giả rộng rãi hơn.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Bức thư mở đầu: <i>'Earthsky Films International is seeking a distributor for our latest production, Project Aerial.'</i> (Earthsky Films International đang tìm kiếm một nhà phân phối cho sản phẩm mới nhất của chúng tôi, Project Aerial). Tìm nhà phân phối phim nhằm mục đích đưa phim phát hành rộng rãi tới đông đảo công chúng (Introduce a movie to a wider audience).</p>",
                "questionType": "Main Idea",
                "subCategory": "Main Idea & Purpose",
                "strategyHint": "Mục đích tìm nhà phân phối (distributor) phim đồng nghĩa với việc đưa phim tới khán giả rộng hơn."
            },
            {
                "id": "ets22_t2_p7_169",
                "number": 169,
                "text": "What is stated about Project Aerial?",
                "options": {
                    "A": "It was filmed in Eindhoven.",
                    "B": "It was completed last week.",
                    "C": "It is a historical film.",
                    "D": "It is an animated film."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Điều gì được nêu về Project Aerial?<br/>(A) Nó được quay ở Eindhoven.<br/>(B) Nó đã được hoàn thành vào tuần trước.<br/>(C) Nó là một bộ phim lịch sử.<br/>(D) Nó là một bộ phim hoạt hình.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 2 viết: <i>'Our film, Project Aerial, examines an exciting period in aviation history that began more than 150 years ago.'</i> (Bộ phim của chúng tôi, Project Aerial, nghiên cứu một giai đoạn thú vị trong lịch sử hàng không bắt đầu hơn 150 năm trước). Phim khai thác giai đoạn lịch sử hàng không nên đây là một bộ phim lịch sử (historical film).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét cụm từ 'aviation history that began more than 150 years ago'."
            },
            {
                "id": "ets22_t2_p7_170",
                "number": 170,
                "text": "In the letter, why does Mr. Chaudhari mention The Rigby Conspiracy and Whereabouts Unknown?",
                "options": {
                    "A": "To mention movies in which they appeared",
                    "B": "To recommend some award-winning films",
                    "C": "To describe films with similar themes",
                    "D": "To show the popularity of aviation films"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Trong thư, tại sao ông Chaudhari đề cập đến The Rigby Conspiracy và Whereabouts Unknown?<br/>(A) Để đề cập đến các bộ phim mà các diễn viên chính từng xuất hiện.<br/>(B) Để giới thiệu một số bộ phim từng đoạt giải thưởng.<br/>(C) Để miêu tả các bộ phim có cùng chủ đề.<br/>(D) Để cho thấy sự phổ biến của phim về hàng không.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Đoạn 3 nêu hai diễn viên chính Winston Halsey và Virgil Golding, sau đó nói rõ: <i>'Mr. Golding is known for his role in... The Rigby Conspiracy, and Mr. Halsey is recognized for his performance in Whereabouts Unknown.'</i> (Ông Golding được biết đến với vai diễn trong The Rigby Conspiracy, và ông Halsey được ghi nhận với màn trình diễn trong Whereabouts Unknown). Đây là các tác phẩm trước đây mà hai diễn viên này đã tham gia diễn xuất.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Đọc câu chứa tên 2 bộ phim: 'known for his role in' và 'performance in'."
            },
            {
                "id": "ets22_t2_p7_171",
                "number": 171,
                "text": "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n“Both have received critical acclaim over the years.”",
                "options": {
                    "A": "[1]",
                    "B": "[2]",
                    "C": "[3]",
                    "D": "[4]"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Câu sau phù hợp nhất ở vị trí nào: “Cả hai đều đã nhận được sự hoan nghênh nồng nhiệt từ giới phê bình trong suốt nhiều năm.”<br/>(A) [1]<br/>(B) [2]<br/>(C) [3]<br/>(D) [4]</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Câu trước vị trí [3] đề cập đến hai người: <i>'The two lead roles are played by Winston Halsey and Virgil Golding, figures that are familiar to international audiences.'</i> (Hai vai chính do Winston Halsey và Virgil Golding đảm nhận...). Từ <b>Both</b> (Cả hai người) ở câu cần điền liên kết trực tiếp với hai diễn viên này. Sau đó câu tiếp theo minh họa cụ thể sự công nhận của từng người qua các tác phẩm nổi tiếng. Do đó, vị trí [3] là hoàn hảo nhất.</p>",
                "questionType": "Sentence Placement & Intent",
                "subCategory": "Sentence Placement & Intent",
                "strategyHint": "Từ 'Both' liên kết trực tiếp với 'The two lead roles are played by Winston Halsey and Virgil Golding'."
            }
        ]
    },

    # SET 10: Q172-175 (Online chat discussion)
    {
        "id": "ets22_t2_p7_s10",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t2_p7_s10_p1",
                "type": "Chat",
                "title": "Online Chat Discussion",
                "content": "<p><b>Maria Andreou [9:06 A.M.]:</b> Good morning, Jakob and Sandra. I need help with the focus group with the photographers that is taking place on Thursday morning. I’m no longer available to lead it.<br/><b>Jakob Wendt [9:09 A.M.]:</b> That’s unfortunate. We need to follow up with that meeting to advise our client about what is important to potential customers.<br/><b>Maria Andreou [9:10 A.M.]:</b> Exactly. So I would rather not have to reschedule. The client is expecting our report early next week. Would either of you be able to conduct the group instead of me?<br/><b>Sandra Liu [9:12 A.M.]:</b> Sorry, Maria. I’m traveling out of town tomorrow for the marketing conference, and won’t be back until Friday.<br/><b>Jakob Wendt [9:15 A.M.]:</b> I’ve never led a focus group before, but I’m happy to do it.<br/><b>Maria Andreou [9:17 A.M.]:</b> Great. I’ll send you the participant consent form by e-mail. Remember that at the start of the group session, each participant will need to sign a copy.<br/><b>Jakob Wendt [9:18 A.M.]:</b> OK. How many copies will be needed?<br/><b>Sandra Liu [9:19 A.M.]:</b> Actually, there’s no need. I have copies left over from another group I ran last Tuesday. They’re still on my desk.<br/><b>Jakob Wendt [9:20 A.M.]:</b> I’ll stop by and pick them up later today.<br/><b>Maria Andreou [9:21 A.M.]:</b> Thank you both. This means we can meet and work on the advertising report for the client next Monday.</p>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t2_p7_172",
                "number": 172,
                "text": "For what type of business do the writers most likely work?",
                "options": {
                    "A": "A market research agency",
                    "B": "A printing shop",
                    "C": "A software development firm",
                    "D": "A photography studio"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Các nhân vật nhiều khả năng làm việc cho loại hình doanh nghiệp nào nhất?<br/>(A) Một công ty nghiên cứu thị trường.<br/>(B) Một cửa hàng in ấn.<br/>(C) Một công ty phát triển phần mềm.<br/>(D) Một studio chụp ảnh.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Các nhân vật bàn về việc tổ chức <i>'focus group'</i> (nhóm khảo sát tập trung), <i>'advise our client about what is important to potential customers'</i> (tư vấn cho khách hàng về điều quan trọng đối với người tiêu dùng tiềm năng), và làm <i>'advertising report for the client'</i> (báo cáo quảng cáo cho khách hàng). Đây là các nghiệp vụ cốt lõi của một công ty nghiên cứu thị trường (market research agency).</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "Dựa vào thuật ngữ chuyên môn: focus group, potential customers, client report."
            },
            {
                "id": "ets22_t2_p7_173",
                "number": 173,
                "text": "When will the focus group with the photographers meet?",
                "options": {
                    "A": "On Monday",
                    "B": "On Tuesday",
                    "C": "On Thursday",
                    "D": "On Friday"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Nhóm khảo sát các nhiếp ảnh gia sẽ gặp gỡ vào khi nào?<br/>(A) Vào thứ Hai.<br/>(B) Vào thứ Ba.<br/>(C) Vào thứ Năm.<br/>(D) Vào thứ Sáu.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Tin nhắn đầu tiên của Maria Andreou lúc 9:06 A.M. viết: <i>'I need help with the focus group with the photographers that is taking place on Thursday morning.'</i> (Tôi cần giúp đỡ về nhóm khảo sát các nhiếp ảnh gia diễn ra vào sáng thứ Năm). Do đó chọn (C) On Thursday.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Quét mốc thời gian ở câu đầu tiên của đoạn chat: 'on Thursday morning'."
            },
            {
                "id": "ets22_t2_p7_174",
                "number": 174,
                "text": "What is indicated about Mr. Wendt?",
                "options": {
                    "A": "He would prefer to attend a conference.",
                    "B": "He works downstairs from Ms. Liu’s office.",
                    "C": "He has never previously run a focus group.",
                    "D": "He is the most experienced member of the team."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Điều gì được chỉ ra về ông Wendt?<br/>(A) Ông ấy muốn tham dự một hội nghị hơn.<br/>(B) Ông ấy làm việc ở tầng dưới văn phòng cô Liu.<br/>(C) Ông ấy chưa từng điều hành một nhóm khảo sát nào trước đây.<br/>(D) Ông ấy là thành viên giàu kinh nghiệm nhất của nhóm.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Lúc 9:15 A.M., Jakob Wendt nói: <i>'I’ve never led a focus group before, but I’m happy to do it.'</i> (Tôi chưa từng dẫn dắt một nhóm khảo sát tập trung nào trước đây, nhưng tôi rất sẵn lòng làm). Điều này khớp hoàn toàn với phương án (C).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Tìm phát biểu trực tiếp của Jakob Wendt lúc 9:15 AM."
            },
            {
                "id": "ets22_t2_p7_175",
                "number": 175,
                "text": "At 9:19 A.M., what does Ms. Liu most likely mean when she writes, “there’s no need”?",
                "options": {
                    "A": "She can cancel her business trip.",
                    "B": "Focus group participants will not complete consent forms.",
                    "C": "A focus group can be rescheduled.",
                    "D": "Mr. Wendt should not print any consent forms."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa câu hỏi & đáp án:</b><br/>Vào lúc 9:19 sáng, cô Liu có ý gì nhất khi viết “there’s no need”?<br/>(A) Cô ấy có thể hủy chuyến công tác của mình.<br/>(B) Những người tham gia khảo sát sẽ không điền phiếu đồng thuận.<br/>(C) Một nhóm khảo sát có thể được dời lịch.<br/>(D) Ông Wendt không cần phải in bất kỳ bản biểu mẫu đồng thuận nào.</p><p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b><br/>Lúc 9:18 A.M., ông Wendt hỏi: <i>'How many copies will be needed?'</i> (Sẽ cần bao nhiêu bản in?). Cô Liu trả lời: <i>'Actually, there’s no need. I have copies left over from another group I ran last Tuesday. They’re still on my desk.'</i> (Thực ra không cần thiết đâu. Tôi có các bản in còn thừa từ nhóm khảo sát thứ Ba tuần trước. Chúng vẫn còn trên bàn làm việc của tôi). Ý của cô Liu là ông Wendt không cần phải in thêm bản sao nào nữa.</p>",
                "questionType": "Sentence Placement & Intent",
                "subCategory": "Sentence Placement & Intent",
                "strategyHint": "Liên hệ với câu hỏi ngay trước đó của Mr. Wendt về việc cần bao nhiêu bản in."
            }
        ]
    }
]

with open('/private/tmp/part7_sets_7_10.json', 'w', encoding='utf-8') as f:
    json.dump(part7_sets_7_10, f, ensure_ascii=False, indent=2)

print("Saved sets 7-10!")
