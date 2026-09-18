import json

part1_sets = [
    # Set 1: Q147 - Q148 (Online Advertisement)
    {
        "id": "ets22_t5_p7_s01",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s01_p1",
                "type": "Online Advertisement",
                "title": "Online Advertisement",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p style='color: #666; font-size: 0.85rem; margin-top: 0;'>http://www.yummygoodfoods.com</p>"
                           "<h3 style='margin-top: 4px; text-align: center;'>Yummy Good Foods</h3>"
                           "<p style='text-align: center; font-style: italic;'>Is nutrition important to you?<br/>"
                           "Do you like high-quality, natural products?<br/>"
                           "Are you short on time?</p>"
                           "<p>Then consider our healthy, nutritional meals shipped right to your door! Yummy Good Foods is having a special one-time offer. We will send your first week of delicious meals from our Healthy Meal menu with complimentary shipping!</p>"
                           "<p>Go to <b>www.yummygoodfoods.com</b> and enter code: <b>BetterHealth4Me</b>.</p>"
                           "<p style='font-size: 0.9rem; color: #555;'><i>Offer valid through June with your first monthly purchase.</i></p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_147",
                "number": 147,
                "text": "What is the purpose of the advertisement?",
                "options": {
                    "A": "To promote a store opening",
                    "B": "To attract new customers",
                    "C": "To announce a new menu",
                    "D": "To report a Web site upgrade"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của bài quảng cáo là gì?<br/>(A) Để quảng bá việc khai trương cửa hàng.<br/>(B) Để thu hút khách hàng mới.<br/>(C) Để thông báo thực đơn mới.<br/>(D) Để báo cáo về việc nâng cấp trang web.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn quảng cáo ghi: <i>'special one-time offer. We will send your first week of delicious meals from our Healthy Meal menu with complimentary shipping! ... with your first monthly purchase.'</i> (ưu đãi một lần đặc biệt cho lần mua hàng tháng đầu tiên). Đây là ưu đãi nhằm thu hút khách hàng mới đăng ký trải nghiệm.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "Chú ý các cụm 'special one-time offer' và 'first monthly purchase' nhắm tới khách hàng mới."
            },
            {
                "id": "ets22_t5_p7_148",
                "number": 148,
                "text": "What is available through the month of June?",
                "options": {
                    "A": "A diet analysis",
                    "B": "A sample recipe",
                    "C": "A free delivery",
                    "D": "A magazine subscription"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được cung cấp trong suốt tháng 6?<br/>(A) Một phân tích chế độ ăn uống.<br/>(B) Một công thức mẫu.<br/>(C) Giao hàng miễn phí.<br/>(D) Đặt báo dài hạn.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn quảng cáo nêu: <i>'complimentary shipping!'</i> cùng với <i>'Offer valid through June with your first monthly purchase.'</i> Trong đó <i>complimentary shipping</i> đồng nghĩa với <i>free delivery</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "complimentary shipping = free delivery."
            }
        ]
    },

    # Set 2: Q149 - Q150 (E-mail)
    {
        "id": "ets22_t5_p7_s02",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s02_p1",
                "type": "E-mail",
                "title": "E-mail",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p><b>To:</b> All Residents<br/>"
                           "<b>From:</b> Dan Madsen<br/>"
                           "<b>Date:</b> 20 September<br/>"
                           "<b>Subject:</b> Georgetown Marathon</p>"
                           "<hr style='border: none; border-top: 1px solid var(--border-color, #eee); margin: 12px 0;'/>"
                           "<p>To all Thompson Towers residents:</p>"
                           "<p>The 25th annual Georgetown Marathon will be held next Saturday. This year, for the first time, the race will turn off of River Street and proceed onto Elmont Avenue. So on Saturday, there will be nearly 5,000 registered contestants running along the stretch of road that provides the only access to our Thompson Towers parking garage entrance.</p>"
                           "<p>Unsurprisingly, Elmont Avenue will be closed to all vehicle traffic between 7:00 A.M. and 10:45 A.M. This means that residents’ cars will not be able to enter or exit our parking garage during this event. If you know that you will need to use your car during this period, we recommend that you make arrangements ahead of time for either leaving early or parking elsewhere.</p>"
                           "<p>For more information about the race, including maps, registration guidelines, and alternative parking locations, please go to www.georgetownmarathon.co.uk.</p>"
                           "<p>Sincerely yours,<br/>Dan Madsen<br/>Property Manager, Thompson Towers</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_149",
                "number": 149,
                "text": "What is the purpose of the e-mail?",
                "options": {
                    "A": "To encourage participation in a race",
                    "B": "To warn of an upcoming road closure",
                    "C": "To reschedule a tenant meeting",
                    "D": "To announce a construction plan"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của email là gì?<br/>(A) Để khuyến khích tham gia cuộc đua.<br/>(B) Để cảnh báo về việc cấm đường sắp tới.<br/>(C) Để dời lại cuộc họp người thuê nhà.<br/>(D) Để thông báo kế hoạch xây dựng.</p><p><b>Bằng chứng trích dẫn:</b> Email nêu: <i>'Elmont Avenue will be closed to all vehicle traffic between 7:00 A.M. and 10:45 A.M. This means that residents’ cars will not be able to enter or exit our parking garage during this event.'</i> (Đại lộ Elmont sẽ đóng cửa đối với tất cả xe cộ...). Do đó chọn (B).</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview",
                "strategyHint": "Tìm thông tin chính: con đường duy nhất vào hầm gửi xe bị phong tỏa vì cuộc chạy đua."
            },
            {
                "id": "ets22_t5_p7_150",
                "number": 150,
                "text": "What is indicated about the Georgetown Marathon?",
                "options": {
                    "A": "It has close to 5,000 participants.",
                    "B": "It is being held for the first time.",
                    "C": "It starts on Elmont Avenue.",
                    "D": "It includes participants from Thompson Towers."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về Giải chạy Marathon Georgetown?<br/>(A) Nó có gần 5.000 người tham gia.<br/>(B) Nó được tổ chức lần đầu tiên.<br/>(C) Nó bắt đầu trên Đại lộ Elmont.<br/>(D) Nó bao gồm những người tham gia từ Thompson Towers.</p><p><b>Bằng chứng trích dẫn:</b> Trong đoạn 1 ghi: <i>'there will be nearly 5,000 registered contestants running along the stretch of road'</i> (gần 5.000 thí sinh đã đăng ký chạy trên đoạn đường này). <i>nearly 5,000</i> đồng nghĩa với <i>close to 5,000</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "nearly 5,000 registered contestants = close to 5,000 participants."
            }
        ]
    },

    # Set 3: Q151 - Q152 (Handbook Page)
    {
        "id": "ets22_t5_p7_s03",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s03_p1",
                "type": "Handbook Page",
                "title": "Handbook Page",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif; line-height: 1.6;'>"
                           "<p>One reason that corrugated fiberboard has become such a popular material for shipping fresh vegetables and fruits is the ease of labeling the containers. Information such as the brand, size, and grade of the produce can be printed directly on the box after it has been formed. Although this method, known as “postprinting,” is the most economical way of labeling fiberboard containers, it is limited to only one or two colors. Full-color graphics can be obtained by printing the information on the box before it has been formed. This method, known as “preprinting,” costs about 15 percent more, but many supermarket managers prefer it because customers are attracted to the colorful displays, which leads to increased sales.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_151",
                "number": 151,
                "text": "What is indicated about corrugated fiberboard boxes?",
                "options": {
                    "A": "They are easy to label.",
                    "B": "They hold more than other containers.",
                    "C": "They keep vegetables fresh.",
                    "D": "They are used less often than other types."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về các hộp carton lượn sóng (corrugated fiberboard)?<br/>(A) Chúng dễ dàng được dán/in nhãn.<br/>(B) Chúng chứa được nhiều hơn các thùng chứa khác.<br/>(C) Chúng giữ rau củ tươi lâu.<br/>(D) Chúng ít được sử dụng hơn các loại khác.</p><p><b>Bằng chứng trích dẫn:</b> Câu đầu tiên của đoạn văn: <i>'One reason that corrugated fiberboard has become such a popular material for shipping fresh vegetables and fruits is the ease of labeling the containers.'</i> (sự dễ dàng trong việc ghi nhãn các thùng chứa). <i>ease of labeling</i> đồng nghĩa với <i>easy to label</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "the ease of labeling = easy to label."
            },
            {
                "id": "ets22_t5_p7_152",
                "number": 152,
                "text": "Why do store managers generally prefer boxes with full-color graphics?",
                "options": {
                    "A": "They can be cleaned and reused.",
                    "B": "They come in a wide variety of sizes.",
                    "C": "They are often requested by customers.",
                    "D": "They increase customers’ purchases."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao các nhà quản lý cửa hàng nhìn chung lại thích hộp có đồ họa in màu đầy đủ hơn?<br/>(A) Chúng có thể được làm sạch và tái sử dụng.<br/>(B) Chúng có nhiều kích cỡ khác nhau.<br/>(C) Khách hàng thường xuyên yêu cầu chúng.<br/>(D) Chúng giúp gia tăng việc mua hàng của khách.</p><p><b>Bằng chứng trích dẫn:</b> Câu cuối đoạn văn: <i>'many supermarket managers prefer it because customers are attracted to the colorful displays, which leads to increased sales.'</i> (dẫn đến doanh số bán hàng gia tăng, tức tăng lượt mua của khách hàng).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "leads to increased sales = increase customers' purchases."
            }
        ]
    },

    # Set 4: Q153 - Q155 (Job Advertisement)
    {
        "id": "ets22_t5_p7_s04",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s04_p1",
                "type": "Job Advertisement",
                "title": "Job Advertisement",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<h3 style='margin-top: 0; text-align: center; letter-spacing: 1px;'>ADMINISTRATIVE ASSISTANT</h3>"
                           "<p><b>Position Summary:</b><br/>"
                           "Naidu Rai Electronics, one of the world’s leading manufacturers in the telecommunications industry, is seeking a full-time administrative assistant in our Jaipur office.</p>"
                           "<p><b>Responsibilities:</b></p>"
                           "<ol style='margin: 0; padding-left: 20px;'>"
                           "<li>Provide administrative support for members of the product design team, including travel and expense reports</li>"
                           "<li>Schedule appointments with prospective clients and designers</li>"
                           "<li>Maintain files, process documents, and compile reports</li>"
                           "</ol>"
                           "<p style='margin-top: 10px;'><b>Required Qualifications/Education:</b><br/>"
                           "Senior school certificate mandatory; business school certification preferred</p>"
                           "<p><b>Skills:</b></p>"
                           "<ol style='margin: 0; padding-left: 20px;'>"
                           "<li>Strong interpersonal skills</li>"
                           "<li>Strong organizational and planning skills</li>"
                           "<li>Software proficiency</li>"
                           "</ol>"
                           "<p style='margin-top: 12px;'>To be considered, e-mail your resume and cover letter to <b>s.mohta@naiduraielec.in</b>; candidates selected for an interview will be required to take a basic software proficiency test.</p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_153",
                "number": 153,
                "text": "What is indicated about the job?",
                "options": {
                    "A": "It involves working with product designers.",
                    "B": "It requires frequent travel.",
                    "C": "It is a temporary position.",
                    "D": "It has been available for several months."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về công việc này?<br/>(A) Công việc bao gồm làm việc với các nhà thiết kế sản phẩm.<br/>(B) Đòi hỏi phải đi công tác thường xuyên.<br/>(C) Đây là vị trí tạm thời.<br/>(D) Vị trí này đã tuyển dụng được vài tháng.</p><p><b>Bằng chứng trích dẫn:</b> Trong mục Responsibilities: <i>'1. Provide administrative support for members of the product design team... 2. Schedule appointments with prospective clients and designers'</i>. Do đó công việc liên quan mật thiết tới việc làm việc cùng các nhà thiết kế sản phẩm.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "support for members of the product design team = working with product designers."
            },
            {
                "id": "ets22_t5_p7_154",
                "number": 154,
                "text": "According to the advertisement, what must a person do to apply?",
                "options": {
                    "A": "Provide a client list",
                    "B": "Forward school transcripts",
                    "C": "Submit a resume",
                    "D": "Send a reference letter"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo bài quảng cáo, một người phải làm gì để ứng tuyển?<br/>(A) Cung cấp danh sách khách hàng.<br/>(B) Chuyển tiếp bảng điểm học tập.<br/>(C) Nộp sơ yếu lý lịch (resume).<br/>(D) Gửi thư giới thiệu.</p><p><b>Bằng chứng trích dẫn:</b> Câu cuối quảng cáo ghi rõ: <i>'To be considered, e-mail your resume and cover letter to s.mohta@naiduraielec.in'</i> (hãy gửi email sơ yếu lý lịch và thư xin việc). Do đó chọn (C).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "e-mail your resume and cover letter = Submit a resume."
            },
            {
                "id": "ets22_t5_p7_155",
                "number": 155,
                "text": "What will an applicant do at an interview?",
                "options": {
                    "A": "Answer a telephone call",
                    "B": "Take a computer test",
                    "C": "Submit a writing sample",
                    "D": "Compile a report"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Ứng viên sẽ làm gì tại buổi phỏng vấn?<br/>(A) Trả lời một cuộc điện thoại.<br/>(B) Làm một bài kiểm tra trên máy tính.<br/>(C) Nộp một mẫu bài viết.<br/>(D) Biên soạn một báo cáo.</p><p><b>Bằng chứng trích dẫn:</b> Câu cuối ghi: <i>'candidates selected for an interview will be required to take a basic software proficiency test.'</i> (các ứng viên được chọn phỏng vấn sẽ phải làm một bài kiểm tra thành thạo phần mềm cơ bản). Kiểm tra phần mềm chính là <i>Take a computer test</i>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "take a basic software proficiency test = Take a computer test."
            }
        ]
    },

    # Set 5: Q156 - Q158 (Web Page)
    {
        "id": "ets22_t5_p7_s05",
        "type": "Single Passage",
        "passages": [
            {
                "id": "ets22_t5_p7_s05_p1",
                "type": "Web Page",
                "title": "Web Page",
                "content": "<div style='border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 16px; font-family: sans-serif;'>"
                           "<p style='color: #666; font-size: 0.85rem; margin-top: 0;'>http://www.moorecountylibrary.gov/seminars</p>"
                           "<div style='display: flex; gap: 16px; font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 12px;'>"
                           "<span>Home</span><span>About Us</span><span style='color: var(--primary, #0284c7);'>Seminars</span><span>Contact Us</span>"
                           "</div>"
                           "<h3 style='margin-top: 0;'>MARKETING BASICS</h3>"
                           "<p><b>April 15, 6 P.M.</b><br/>"
                           "Moore County Library System, Newburg Branch<br/>"
                           "<b>Presenter:</b> Sal Quatrochi</p>"
                           "<p>Do you want to learn how to effectively market your business?<br/>"
                           "Come join us for this informative class, where you will learn how to:</p>"
                           "<ul style='margin: 0; padding-left: 20px;'>"
                           "<li>Determine your target customers and what motivates them to buy</li>"
                           "<li>Choose the best ways to reach your customers</li>"
                           "<li>Identify your competitors and stand out from them</li>"
                           "<li>Get the most out of your limited marketing budget</li>"
                           "</ul>"
                           "<p style='margin-top: 12px;'>The class is free, but registration is required and begins on March 1.</p>"
                           "<p style='font-size: 0.95rem; color: #444; border-top: 1px dashed #ccc; padding-top: 8px;'><i>Marketing Basics is part of Moore County Library's new ongoing series, <b>Marketing for Small Businesses</b>. Join us for our next class, <b>Digital Strategy</b>, on May 6 at the Lancaster Branch. Registration will open April 5.</i></p>"
                           "</div>"
            }
        ],
        "questions": [
            {
                "id": "ets22_t5_p7_156",
                "number": 156,
                "text": "When will the Marketing Basics class take place?",
                "options": {
                    "A": "On March 1",
                    "B": "On April 5",
                    "C": "On April 15",
                    "D": "On May 6"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Lớp học Căn bản Tiếp thị (Marketing Basics) sẽ diễn ra khi nào?<br/>(A) Vào ngày 1 tháng 3.<br/>(B) Vào ngày 5 tháng 4.<br/>(C) Vào ngày 15 tháng 4.<br/>(D) Vào ngày 6 tháng 5.</p><p><b>Bằng chứng trích dẫn:</b> Ngay dưới tiêu đề MARKETING BASICS ghi rõ thời gian tổ chức: <i>'April 15, 6 P.M.'</i>. Các ngày khác là ngày mở đăng ký (March 1, April 5) hoặc lớp học kế tiếp Digital Strategy (May 6).</p>",
                "questionType": "Detail",
                "subCategory": "Detail",
                "strategyHint": "Đọc kĩ tiêu đề lớp học và thời gian diễn ra: April 15."
            },
            {
                "id": "ets22_t5_p7_157",
                "number": 157,
                "text": "What topic will NOT be covered in the Marketing Basics class?",
                "options": {
                    "A": "Identifying potential customers",
                    "B": "Showing how a business is different from its competitors",
                    "C": "Choosing a graphic designer to create advertisements",
                    "D": "Spending marketing money efficiently"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Chủ đề nào KHÔNG được đề cập trong lớp học Marketing Basics?<br/>(A) Xác định khách hàng tiềm năng.<br/>(B) Cho thấy doanh nghiệp khác biệt như thế nào so với các đối thủ.<br/>(C) Lựa chọn nhà thiết kế đồ họa để tạo quảng cáo.<br/>(D) Chi tiêu ngân sách tiếp thị một cách hiệu quả.</p><p><b>Bằng chứng trích dẫn:</b><br/>- (A) tương ứng với <i>'Determine your target customers'</i>.<br/>- (B) tương ứng với <i>'Identify your competitors and stand out from them'</i>.<br/>- (D) tương ứng với <i>'Get the most out of your limited marketing budget'</i>.<br/>Chỉ có <b>(C) Choosing a graphic designer</b> không xuất hiện trong 4 gạch đầu dòng.</p>",
                "questionType": "Negative Fact",
                "subCategory": "Detail",
                "strategyHint": "Đối chiếu 4 lựa chọn với 4 gạch đầu dòng nội dung lớp học."
            },
            {
                "id": "ets22_t5_p7_158",
                "number": 158,
                "text": "What is indicated about the Marketing Basics class?",
                "options": {
                    "A": "It is taught by a marketing professor.",
                    "B": "It is one of several classes offered to business owners.",
                    "C": "It is designed for corporate executives.",
                    "D": "It will be offered again in the near future."
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì được chỉ ra về lớp học Marketing Basics?<br/>(A) Được giảng dạy bởi một giáo sư tiếp thị.<br/>(B) Là một trong số nhiều lớp học được cung cấp cho các chủ doanh nghiệp.<br/>(C) Được thiết kế dành cho các giám đốc điều hành tập đoàn.<br/>(D) Sẽ được mở lại trong tương lai gần.</p><p><b>Bằng chứng trích dẫn:</b> Đoạn cuối văn bản chỉ rõ: <i>'Marketing Basics is part of Moore County Library's new ongoing series, Marketing for Small Businesses.'</i> (là một phần của chuỗi chuyên đề mới đang diễn ra mang tên 'Tiếp thị dành cho các Doanh nghiệp Nhỏ'). Do đó đây là một trong các lớp học dành cho các chủ doanh nghiệp nhỏ.</p>",
                "questionType": "Inference",
                "subCategory": "Inference",
                "strategyHint": "part of new ongoing series, Marketing for Small Businesses = one of several classes offered to business owners."
            }
        ]
    }
]

with open("/private/tmp/ets5_extract/p7_part1.json", "w", encoding="utf-8") as f:
    json.dump(part1_sets, f, indent=2, ensure_ascii=False)

print(f"Generated {len(part1_sets)} sets ({sum(len(s['questions']) for s in part1_sets)} questions) in p7_part1.json")
