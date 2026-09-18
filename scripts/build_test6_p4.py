import json
import os

CDN_BASE = "https://github.com/tuannd98fdn/toeic-learn/releases/download/ets2022-assets"

part4_data = [
    # Set 1: Q71 - Q73
    {
        "id": "ets22_t6_p4_s01",
        "audioUrl": f"{CDN_BASE}/t6_p4_s01.mp3",
        "context": "Questions 71-73 refer to the following telephone message.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Hello. This is the Chesterfield Community Centre. We're calling to inform you about a change to our Movie Night event originally planned for this Tuesday. Unfortunately, another event had been booked at the Community Centre for the same day. As a result, Movie Night has been rescheduled for this upcoming weekend at 9 P.M. on Saturday. If you're no longer able to attend, we're happy to refund your ticket. You can request this refund by calling our office at 555-0126.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_71",
                "number": 71,
                "text": "Why has the Movie Night event been rescheduled?",
                "options": {
                    "A": "A projector is not available.",
                    "B": "A nearby road is being repaired.",
                    "C": "The space is double booked.",
                    "D": "The event organizer is ill."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao sự kiện Đêm chiếu phim bị đổi lịch?<br/>(A) Máy chiếu không có sẵn.<br/>(B) Một con đường gần đó đang được sửa chữa.<br/>(C) Địa điểm đã bị trùng lịch đặt trước (The space is double booked).<br/>(D) Người tổ chức sự kiện bị ốm.</p><p><b>Phân tích:</b> Người nói thông báo: <i>'Unfortunately, another event had been booked at the Community Centre for the same day.'</i> (Một sự kiện khác đã được đặt tại trung tâm cùng ngày, tức là bị trùng lịch/double booked). Chọn <b>(C)</b>.</p>",
                "questionType": "Reason",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p4_72",
                "number": 72,
                "text": "When will the event be held?",
                "options": {
                    "A": "Tomorrow",
                    "B": "This weekend",
                    "C": "In two weeks",
                    "D": "In one month"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Khi nào sự kiện sẽ được tổ chức?<br/>(A) Ngày mai.<br/>(B) Cuối tuần này (This weekend).<br/>(C) Trong hai tuần nữa.<br/>(D) Trong một tháng nữa.</p><p><b>Phân tích:</b> Người nói nêu rõ: <i>'Movie Night has been rescheduled for this upcoming weekend at 9 P.M. on Saturday.'</i> Chọn <b>(B)</b>.</p>",
                "questionType": "Time",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p4_73",
                "number": 73,
                "text": "How can the listener request a refund?",
                "options": {
                    "A": "By mailing a ticket",
                    "B": "By visiting an office",
                    "C": "By completing an online form",
                    "D": "By making a phone call"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nghe có thể yêu cầu hoàn tiền bằng cách nào?<br/>(A) Bằng cách gửi vé qua thư.<br/>(B) Bằng cách đến trực tiếp văn phòng.<br/>(C) Bằng cách điền vào mẫu trực tuyến.<br/>(D) Bằng cách gọi điện thoại (By making a phone call).</p><p><b>Phân tích:</b> Người nói hướng dẫn: <i>'You can request this refund by calling our office at 555-0126.'</i> Do đó cách thức là gọi điện thoại <b>(D)</b>.</p>",
                "questionType": "Method",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 2: Q74 - Q76
    {
        "id": "ets22_t6_p4_s02",
        "audioUrl": f"{CDN_BASE}/t6_p4_s02.mp3",
        "context": "Questions 74-76 refer to the following talk.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Welcome to Canyon River National Park. I'm Marisol, and I'll be training you in your new role as park rangers. Each of you will be assigned one area of the park. Your duties will vary, but one task you need to complete every day is to check your assigned area for hazardous conditions. For example, if you come across any fallen branches blocking the trails or roadways, you need to report them right away. Now, before I show you the grounds, let me give you your uniforms. Please make sure that you wear them at all times on the premises.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_74",
                "number": 74,
                "text": "Who most likely is the speaker?",
                "options": {
                    "A": "A park ranger",
                    "B": "A travel agent",
                    "C": "A landscaper",
                    "D": "A building inspector"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói nhiều khả năng là ai?<br/>(A) Kiểm lâm công viên (A park ranger).<br/>(B) Đại lý du lịch.<br/>(C) Người làm cảnh quan.<br/>(D) Thanh tra xây dựng.</p><p><b>Phân tích:</b> Người nói giới thiệu: <i>'Welcome to Canyon River National Park. I'm Marisol, and I'll be training you in your new role as park rangers.'</i> (Tôi sẽ đào tạo các bạn cho vai trò mới là kiểm lâm viên). Do đó cô ấy là một kiểm lâm viên có thâm niên <b>(A)</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p4_75",
                "number": 75,
                "text": "What are the listeners asked to check for?",
                "options": {
                    "A": "Expired identification cards",
                    "B": "Local construction regulations",
                    "C": "Hazardous outdoor conditions",
                    "D": "Sudden price increases"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nghe được yêu cầu kiểm tra điều gì?<br/>(A) Thẻ căn cước hết hạn.<br/>(B) Quy định xây dựng địa phương.<br/>(C) Các điều kiện ngoài trời nguy hiểm (Hazardous outdoor conditions).<br/>(D) Sự tăng giá đột ngột.</p><p><b>Phân tích:</b> Người nói dặn: <i>'one task you need to complete every day is to check your assigned area for hazardous conditions.'</i> (kiểm tra khu vực được giao xem có các điều kiện nguy hiểm nào không). Chọn <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p4_76",
                "number": 76,
                "text": "What does the speaker distribute?",
                "options": {
                    "A": "Maps",
                    "B": "Uniforms",
                    "C": "Visitor passes",
                    "D": "Employee handbooks"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói phát cái gì cho người nghe?<br/>(A) Bản đồ.<br/>(B) Đồng phục (Uniforms).<br/>(C) Thẻ khách tham quan.<br/>(D) Sổ tay nhân viên.</p><p><b>Phân tích:</b> Người nói thông báo: <i>'Now, before I show you the grounds, let me give you your uniforms.'</i> Chọn <b>(B)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 3: Q77 - Q79
    {
        "id": "ets22_t6_p4_s03",
        "audioUrl": f"{CDN_BASE}/t6_p4_s03.mp3",
        "context": "Questions 77-79 refer to the following excerpt from a meeting.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Hi, everyone. I'm excited to announce that we're going to try out a change to our work arrangements. Staff will be able to work from home one day a week. Whenever you do work from home, you must be reachable by phone and email during our business hours. Now, I know many of you have asked for this change for a long time. You should know that human resources will be monitoring productivity to determine whether these new work arrangements are a good idea. This is only a trial period. I'll be sending you a policy document that will explain everything in detail. Check your email later today.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_77",
                "number": 77,
                "text": "Who is the speaker addressing?",
                "options": {
                    "A": "Potential investors",
                    "B": "Tourists",
                    "C": "Staff members",
                    "D": "Job applicants"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói đang nói chuyện với ai?<br/>(A) Các nhà đầu tư tiềm năng.<br/>(B) Khách du lịch.<br/>(C) Các nhân viên trong công ty (Staff members).<br/>(D) Các ứng viên xin việc.</p><p><b>Phân tích:</b> Người nói thông báo chế độ làm việc cho nhân viên nội bộ: <i>'Staff will be able to work from home one day a week... Whenever you do work from home...'</i> Do đó người nghe là các nhân viên công ty <b>(C)</b>.</p>",
                "questionType": "Audience",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p4_78",
                "number": 78,
                "text": "Why does the speaker say, “This is only a trial period”?",
                "options": {
                    "A": "To correct a colleague’s statement",
                    "B": "To apologize for a meeting conflict",
                    "C": "To express surprise about a policy",
                    "D": "To encourage the listeners to remain productive"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người nói lại nói: 'Đây chỉ là giai đoạn thử nghiệm'?<br/>(A) Để sửa lại lời nói của một đồng nghiệp.<br/>(B) Để xin lỗi vì sự trùng lặp cuộc họp.<br/>(C) Để bày tỏ sự ngạc nhiên về một chính sách.<br/>(D) Để khuyến khích người nghe duy trì năng suất làm việc (To encourage the listeners to remain productive).</p><p><b>Phân tích:</b> Ngay trước câu này, người nói nhấn mạnh: <i>'human resources will be monitoring productivity to determine whether these new work arrangements are a good idea. This is only a trial period.'</i> (Phòng nhân sự sẽ theo dõi năng suất để quyết định xem có nên tiếp tục không, đây mới chỉ là thử nghiệm). Mục đích là nhắc nhở nhân viên phải làm việc chăm chỉ, duy trì năng suất tốt khi làm từ xa để chính sách này được áp dụng lâu dài <b>(D)</b>.</p>",
                "questionType": "Inference / Speaker's Intent",
                "subCategory": "Inference"
            },
            {
                "id": "ets22_t6_p4_79",
                "number": 79,
                "text": "What will the speaker do later?",
                "options": {
                    "A": "Send a document",
                    "B": "Make a phone call",
                    "C": "Leave for a business trip",
                    "D": "Introduce some managers"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói sẽ làm gì sau đó?<br/>(A) Gửi một tài liệu (Send a document).<br/>(B) Gọi một cuộc điện thoại.<br/>(C) Đi công tác.<br/>(D) Giới thiệu một số người quản lý.</p><p><b>Phân tích:</b> Người nói cho biết: <i>'I'll be sending you a policy document that will explain everything in detail. Check your email later today.'</i> Chọn <b>(A)</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Action"
            }
        ]
    },

    # Set 4: Q80 - Q82
    {
        "id": "ets22_t6_p4_s04",
        "audioUrl": f"{CDN_BASE}/t6_p4_s04.mp3",
        "context": "Questions 80-82 refer to the following broadcast.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Welcome to the KXS radio afternoon update. The traffic is heavy this afternoon because of the season's opening game at the baseball stadium. But the good news is, we're giving away tickets to next week's game. Call our radio station for a chance to win. The sixth caller will win the tickets. And after today's game, we will have an exclusive interview with the coach of our city's baseball team. Stay tuned.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_80",
                "number": 80,
                "text": "According to the speaker, what is causing traffic?",
                "options": {
                    "A": "Some bad weather",
                    "B": "Some construction projects",
                    "C": "A sporting event",
                    "D": "A city festival"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người nói, điều gì đang gây ra tắc đường?<br/>(A) Thời tiết xấu.<br/>(B) Một số công trình xây dựng.<br/>(C) Một sự kiện thể thao (A sporting event).<br/>(D) Lễ hội thành phố.</p><p><b>Phân tích:</b> Người dẫn bản tin giao thông cho biết: <i>'The traffic is heavy this afternoon because of the season's opening game at the baseball stadium.'</i> Trận đấu mở màn mùa giải bóng chày là một sự kiện thể thao <b>(C)</b>.</p>",
                "questionType": "Cause",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p4_81",
                "number": 81,
                "text": "Why should the listeners call the radio station?",
                "options": {
                    "A": "To ask a question",
                    "B": "To request a song",
                    "C": "To win some tickets",
                    "D": "To sign up as a volunteer"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao thính giả nên gọi điện tới đài phát thanh?<br/>(A) Để đặt một câu hỏi.<br/>(B) Để yêu cầu một bài hát.<br/>(C) Để trúng một số vé xem (To win some tickets).<br/>(D) Để đăng ký làm tình nguyện viên.</p><p><b>Phân tích:</b> Người nói thông báo: <i>'Call our radio station for a chance to win. The sixth caller will win the tickets.'</i> Chọn <b>(C)</b>.</p>",
                "questionType": "Purpose",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p4_82",
                "number": 82,
                "text": "What does the speaker say will be broadcast later?",
                "options": {
                    "A": "An interview",
                    "B": "A political debate",
                    "C": "A comedy show",
                    "D": "A concert"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói cho biết nội dung gì sẽ được phát sóng sau đó?<br/>(A) Một buổi phỏng vấn (An interview).<br/>(B) Một cuộc tranh luận chính trị.<br/>(C) Một chương trình hài kịch.<br/>(D) Một buổi hòa nhạc.</p><p><b>Phân tích:</b> Người nói kết thúc bằng: <i>'And after today's game, we will have an exclusive interview with the coach of our city's baseball team.'</i> Chọn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 5: Q83 - Q85
    {
        "id": "ets22_t6_p4_s05",
        "audioUrl": f"{CDN_BASE}/t6_p4_s05.mp3",
        "context": "Questions 83-85 refer to the following talk.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Good evening, everyone. Tonight's event is very important for our restaurant. To prepare for our official grand opening next week, we've invited people from neighboring businesses here. This is a great opportunity to get some feedback on our service and menu. Remember, several local business leaders will be here tonight. As you know, word-of-mouth recommendations are our best advertising tool. Hosts, I'd like you to distribute surveys to guests after their meals. Any feedback they have for us will help make this restaurant a success.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_83",
                "number": 83,
                "text": "What is the talk mainly about?",
                "options": {
                    "A": "A business opening",
                    "B": "A company anniversary",
                    "C": "A new advertising service",
                    "D": "A renovation project"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Bài nói chủ yếu nói về điều gì?<br/>(A) Sự kiện mở cửa/khai trương kinh doanh (A business opening).<br/>(B) Lễ kỷ niệm ngày thành lập công ty.<br/>(C) Dịch vụ quảng cáo mới.<br/>(D) Dự án cải tạo.</p><p><b>Phân tích:</b> Người quản lý nói với nhân viên nhà hàng: <i>'Tonight's event is very important for our restaurant. To prepare for our official grand opening next week...'</i> (chuẩn bị cho sự kiện đại khai trương chính thức vào tuần tới). Chọn <b>(A)</b>.</p>",
                "questionType": "Gist / Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p4_84",
                "number": 84,
                "text": "What does the speaker mean when she says, “several local business leaders will be here tonight”?",
                "options": {
                    "A": "Extra staff is needed.",
                    "B": "An event will be televised.",
                    "C": "A larger venue should be reserved.",
                    "D": "Employees should provide good service."
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói có ý gì khi nói 'một số nhà lãnh đạo doanh nghiệp địa phương sẽ có mặt ở đây tối nay'?<br/>(A) Cần thêm nhân viên.<br/>(B) Sự kiện sẽ được truyền hình trực tiếp.<br/>(C) Nên đặt một địa điểm lớn hơn.<br/>(D) Nhân viên nên phục vụ thật tốt (Employees should provide good service).</p><p><b>Phân tích:</b> Người quản lý nhắc nhở: Các nhà lãnh đạo doanh nghiệp địa phương sẽ đến dự và lời giới thiệu truyền miệng của họ là công cụ quảng cáo tốt nhất (<i>word-of-mouth recommendations are our best advertising tool</i>). Do đó ngụ ý là nhân viên phải phục vụ chu đáo, hết mình để tạo ấn tượng tốt <b>(D)</b>.</p>",
                "questionType": "Inference / Speaker's Intent",
                "subCategory": "Inference"
            },
            {
                "id": "ets22_t6_p4_85",
                "number": 85,
                "text": "What does the speaker ask some of the listeners to do?",
                "options": {
                    "A": "Arrive early",
                    "B": "Check a schedule",
                    "C": "Hand out some surveys",
                    "D": "Consult a manager about problems"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói yêu cầu một số người nghe làm gì?<br/>(A) Đến sớm.<br/>(B) Kiểm tra lịch trình.<br/>(C) Phát một số bảng khảo sát (Hand out some surveys).<br/>(D) Tham khảo ý kiến người quản lý về các vấn đề.</p><p><b>Phân tích:</b> Người nói giao việc: <i>'Hosts, I'd like you to distribute surveys to guests after their meals.'</i> (<i>distribute surveys = hand out surveys</i>). Chọn <b>(C)</b>.</p>",
                "questionType": "Request / Action",
                "subCategory": "Action"
            }
        ]
    },

    # Set 6: Q86 - Q88
    {
        "id": "ets22_t6_p4_s06",
        "audioUrl": f"{CDN_BASE}/t6_p4_s06.mp3",
        "context": "Questions 86-88 refer to the following telephone message.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Hi, Madoka. I'm calling you about some details of your trip to London next week. Your flight is on Monday morning at 4 A.M. I couldn't find a later flight. Adriana Lopez from the London office will meet you at the airport. She's my counterpart over there. Adriana will assist with your local itinerary and has already booked your hotel. Oh, and one last thing. Since this is your first trip since joining our company, you'll soon be receiving login credentials for a travel expense tracking application. You can download the app on your phone and load your receipts onto it.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_86",
                "number": 86,
                "text": "Why does the speaker say, “I couldn’t find a later flight”?",
                "options": {
                    "A": "To refuse an invitation",
                    "B": "To apologize for an inconvenience",
                    "C": "To suggest canceling a trip",
                    "D": "To ask for help"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Tại sao người nói lại nói: 'Tôi không thể tìm được chuyến bay muộn hơn'?<br/>(A) Để từ chối một lời mời.<br/>(B) Để xin lỗi vì một sự bất tiện (To apologize for an inconvenience).<br/>(C) Để đề xuất hủy chuyến đi.<br/>(D) Để nhờ giúp đỡ.</p><p><b>Phân tích:</b> Chuyến bay vào lúc 4 giờ sáng là rất sớm và gây bất tiện cho người đi (<i>Your flight is on Monday morning at 4 A.M. I couldn't find a later flight.</i>). Người nói giải thích câu này như một lời xin lỗi/phân trần vì không còn chuyến nào thuận tiện hơn <b>(B)</b>.</p>",
                "questionType": "Inference / Speaker's Intent",
                "subCategory": "Inference"
            },
            {
                "id": "ets22_t6_p4_87",
                "number": 87,
                "text": "Who most likely is Adriana Lopez?",
                "options": {
                    "A": "A repair technician",
                    "B": "An airline pilot",
                    "C": "An administrative assistant",
                    "D": "A city official"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Adriana Lopez nhiều khả năng là ai?<br/>(A) Kỹ thuật viên sửa chữa.<br/>(B) Phi công hàng không.<br/>(C) Trợ lý hành chính (An administrative assistant).<br/>(D) Quan chức thành phố.</p><p><b>Phân tích:</b> Người nói cho biết: <i>'Adriana Lopez from the London office will meet you at the airport. She's my counterpart over there. Adriana will assist with your local itinerary and has already booked your hotel.'</i> (Cô ấy là đồng cấp với tôi, hỗ trợ lịch trình và đã đặt khách sạn). Công việc hỗ trợ hành chính, đặt phòng, đón tiếp này là nhiệm vụ của trợ lý hành chính <b>(C)</b>.</p>",
                "questionType": "Occupation",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p4_88",
                "number": 88,
                "text": "What does the speaker say the listener will receive?",
                "options": {
                    "A": "A client file",
                    "B": "A list of restaurants",
                    "C": "Some log-in credentials",
                    "D": "Some promotional materials"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói cho biết người nghe sẽ nhận được gì?<br/>(A) Hồ sơ khách hàng.<br/>(B) Danh sách các nhà hàng.<br/>(C) Một số thông tin đăng nhập (Some log-in credentials).<br/>(D) Một số tài liệu quảng cáo.</p><p><b>Phân tích:</b> Người nói thông báo: <i>'you'll soon be receiving login credentials for a travel expense tracking application.'</i> (thông tin đăng nhập cho ứng dụng theo dõi chi phí công tác). Chọn <b>(C)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 7: Q89 - Q91
    {
        "id": "ets22_t6_p4_s07",
        "audioUrl": f"{CDN_BASE}/t6_p4_s07.mp3",
        "context": "Questions 89-91 refer to the following speech.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Welcome to this seminar, which focuses on one of the most challenging aspects of starting a new business, locating investors. Without startup funds, your business may never get off the ground. As a first step, I suggest compiling a list of firms that specialize in investing in your industry. But there's much more to know, of course. Mariam Farouk, founder of multiple information technology companies, has been particularly good at securing investment funding. She's here to answer questions and break down how she did it.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_89",
                "number": 89,
                "text": "What is the topic of the seminar?",
                "options": {
                    "A": "Choosing an advertising strategy",
                    "B": "Finding investors",
                    "C": "Leading focus groups",
                    "D": "Creating a budget"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Chủ đề của buổi hội thảo là gì?<br/>(A) Chọn chiến lược quảng cáo.<br/>(B) Tìm kiếm các nhà đầu tư (Finding investors).<br/>(C) Dẫn dắt các nhóm tập trung.<br/>(D) Lập ngân sách.</p><p><b>Phân tích:</b> Người nói mở đầu: <i>'Welcome to this seminar, which focuses on one of the most challenging aspects of starting a new business, locating investors.'</i> (<i>locating investors = finding investors</i>). Chọn <b>(B)</b>.</p>",
                "questionType": "Topic",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p4_90",
                "number": 90,
                "text": "What does the speaker recommend the listeners do first?",
                "options": {
                    "A": "Get employee input",
                    "B": "Hire a consultant",
                    "C": "Revise a plan",
                    "D": "Make a list"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói khuyên người nghe nên làm gì đầu tiên?<br/>(A) Lấy ý kiến đóng góp của nhân viên.<br/>(B) Thuê chuyên gia tư vấn.<br/>(C) Sửa đổi một kế hoạch.<br/>(D) Lập một danh sách (Make a list).</p><p><b>Phân tích:</b> Người nói gợi ý: <i>'As a first step, I suggest compiling a list of firms that specialize in investing in your industry.'</i> (<i>compiling a list = make a list</i>). Chọn <b>(D)</b>.</p>",
                "questionType": "Recommendation",
                "subCategory": "Action"
            },
            {
                "id": "ets22_t6_p4_91",
                "number": 91,
                "text": "What will most likely happen next?",
                "options": {
                    "A": "A video will be shown.",
                    "B": "Information packets will be distributed.",
                    "C": "Some questions will be answered.",
                    "D": "There will be a lunch break."
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì nhiều khả năng sẽ diễn ra tiếp theo?<br/>(A) Một video sẽ được trình chiếu.<br/>(B) Các gói thông tin sẽ được phát.<br/>(C) Một số câu hỏi sẽ được giải đáp (Some questions will be answered).<br/>(D) Sẽ có giờ nghỉ ăn trưa.</p><p><b>Phân tích:</b> Người nói giới thiệu diễn giả tiếp theo: <i>'Mariam Farouk... She's here to answer questions and break down how she did it.'</i> (Cô ấy ở đây để trả lời các câu hỏi). Chọn <b>(C)</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Action"
            }
        ]
    },

    # Set 8: Q92 - Q94
    {
        "id": "ets22_t6_p4_s08",
        "audioUrl": f"{CDN_BASE}/t6_p4_s08.mp3",
        "context": "Questions 92-94 refer to the following excerpt from a meeting.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Today's sales meeting is packed to capacity, and for good reason. Gerard has delivered on his promise to craft a new strategy that will enable us to broaden our market share in the Scandinavian region. As you'll soon see, his four-step approach is going to be critical to increasing our sales. Looks like he'll need a few minutes to get his computer up and running. So while we wait, let me remind you about the mentoring program that management is implementing. It provides an opportunity to guide our new employees during their transitional period. We need seasoned staff to participate as mentors, so be sure to sign up.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_92",
                "number": 92,
                "text": "What is the purpose of the meeting?",
                "options": {
                    "A": "To celebrate a recent contract",
                    "B": "To explain a new sales strategy",
                    "C": "To introduce a new employee",
                    "D": "To address employee concerns"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Mục đích của cuộc họp là gì?<br/>(A) Để ăn mừng hợp đồng gần đây.<br/>(B) Để giải thích một chiến lược bán hàng mới (To explain a new sales strategy).<br/>(C) Để giới thiệu một nhân viên mới.<br/>(D) Để giải quyết các mối quan tâm của nhân viên.</p><p><b>Phân tích:</b> Người chủ trì cuộc họp nêu rõ: <i>'Gerard has delivered on his promise to craft a new strategy that will enable us to broaden our market share... his four-step approach is going to be critical to increasing our sales.'</i> (chiến lược mới giúp mở rộng thị phần và tăng doanh số). Chọn <b>(B)</b>.</p>",
                "questionType": "Gist / Purpose",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p4_93",
                "number": 93,
                "text": "What is causing a delay?",
                "options": {
                    "A": "A computer is being set up.",
                    "B": "A microphone stopped working.",
                    "C": "Some additional chairs are needed.",
                    "D": "The speaker misplaced some notes."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Điều gì đang gây ra sự chậm trễ?<br/>(A) Máy tính đang được cài đặt/khởi động (A computer is being set up).<br/>(B) Micro ngừng hoạt động.<br/>(C) Cần thêm một số ghế ngồi.<br/>(D) Người nói để thất lạc ghi chú.</p><p><b>Phân tích:</b> Người nói thông báo lý do phải chờ: <i>'Looks like he'll need a few minutes to get his computer up and running. So while we wait...'</i> (anh ấy cần vài phút để khởi động máy tính). Chọn <b>(A)</b>.</p>",
                "questionType": "Problem",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p4_94",
                "number": 94,
                "text": "What are the listeners encouraged to sign up for?",
                "options": {
                    "A": "A staff feedback session",
                    "B": "A conference presentation",
                    "C": "A health initiative",
                    "D": "A mentoring program"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nghe được khuyến khích đăng ký tham gia cái gì?<br/>(A) Buổi phản hồi của nhân viên.<br/>(B) Bài thuyết trình hội nghị.<br/>(C) Sáng kiến sức khỏe.<br/>(D) Chương trình cố vấn (A mentoring program).</p><p><b>Phân tích:</b> Người nói kêu gọi: <i>'let me remind you about the mentoring program that management is implementing... We need seasoned staff to participate as mentors, so be sure to sign up.'</i> Chọn <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 9: Q95 - Q97 (Graphic: Coupon)
    {
        "id": "ets22_t6_p4_s09",
        "audioUrl": f"{CDN_BASE}/t6_p4_s09.mp3",
        "image": f"{CDN_BASE}/t6_p4_g01.jpg",
        "context": "Questions 95-97 refer to the following telephone message and coupon.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "Hey, Hassan. It's Emiko. I'm calling about the retirement party we're planning for Dimitri next Friday. Everyone from the accounting department is coming, plus a few from sales, so we'll have a total of 10 people. I made the reservation at the barbecue restaurant and even found a coupon that'll save us a lot of money since we have such a big group. Did you place the cake order with a bakery yet? Dimitri said he loves strawberry cake, and I want his retirement party to be perfect.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_95",
                "number": 95,
                "text": "What type of event will take place on Friday?",
                "options": {
                    "A": "A retirement party",
                    "B": "A graduation celebration",
                    "C": "A cooking competition",
                    "D": "An award ceremony"
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Loại sự kiện nào sẽ diễn ra vào thứ Sáu?<br/>(A) Tiệc nghỉ hưu (A retirement party).<br/>(B) Lễ tốt nghiệp.<br/>(C) Cuộc thi nấu ăn.<br/>(D) Lễ trao giải.</p><p><b>Phân tích:</b> Người phụ nữ mở đầu: <i>'I'm calling about the retirement party we're planning for Dimitri next Friday.'</i> Chọn <b>(A)</b>.</p>",
                "questionType": "Event",
                "subCategory": "Overview"
            },
            {
                "id": "ets22_t6_p4_96",
                "number": 96,
                "text": "Look at the graphic. Which discount will be applied?",
                "options": {
                    "A": "10%",
                    "B": "15%",
                    "C": "20%",
                    "D": "25%"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào phiếu giảm giá. Mức giảm giá nào sẽ được áp dụng?<br/>(A) 10%.<br/>(B) 15%.<br/>(C) 20%.<br/>(D) 25%.</p><p><b>Phân tích hình ảnh:</b> Người nói cho biết tổng số lượng người tham gia: <i>'so we'll have a total of 10 people.'</i> (tổng cộng 10 người). Đối chiếu phiếu giảm giá của nhà hàng Southern Barbecue Restaurant:<br/>- Groups 3-5: 10% off<br/>- Groups 5-9: 15% off<br/>- <b>Groups 10-15: 20% off</b><br/>- Groups 16-20: 25% off<br/>Với nhóm 10 người, mức giảm giá áp dụng là <b>20%</b>. Chọn <b>(C)</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Graphic"
            },
            {
                "id": "ets22_t6_p4_97",
                "number": 97,
                "text": "What does the speaker ask the listener?",
                "options": {
                    "A": "Who will decorate a space",
                    "B": "What type of gift will be purchased",
                    "C": "If an event should be rescheduled",
                    "D": "If an order has been placed"
                },
                "correctAnswer": "D",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói hỏi người nghe điều gì?<br/>(A) Ai sẽ trang trí không gian tiệc.<br/>(B) Loại quà tặng nào sẽ được mua.<br/>(C) Có nên dời lịch sự kiện không.<br/>(D) Liệu một đơn hàng đã được đặt chưa (If an order has been placed).</p><p><b>Phân tích:</b> Người nói hỏi: <i>'Did you place the cake order with a bakery yet?'</i> (Anh đã đặt bánh kem ở tiệm bánh chưa?). Chọn <b>(D)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            }
        ]
    },

    # Set 10: Q98 - Q100 (Graphic: Agenda)
    {
        "id": "ets22_t6_p4_s10",
        "audioUrl": f"{CDN_BASE}/t6_p4_s10.mp3",
        "image": f"{CDN_BASE}/t6_p4_g02.jpg",
        "context": "Questions 98-100 refer to the following excerpt from a meeting and agenda.",
        "transcript": "<p><b>Transcript:</b><br/>"
                      "I want to talk about our company's charitable giving program. As you know, employees can make a donation to an approved organization, and the company will match that amount. This year, we've expanded our list of approved organizations from 15 to 25. We've selected organizations in the community that will benefit the most from our contributions. And our company has been recognized for its philanthropy. In fact, it was featured last month in an article in the magazine Business Effect. I'll post a link to that on our website after this meeting.</p>",
        "questions": [
            {
                "id": "ets22_t6_p4_98",
                "number": 98,
                "text": "Look at the graphic. Who most likely is the speaker?",
                "options": {
                    "A": "William Schmidt",
                    "B": "Paul Cohen",
                    "C": "Jung-Soo Park",
                    "D": "Santiago Reyes"
                },
                "correctAnswer": "B",
                "explanation": "<p><b>Dịch nghĩa:</b> Nhìn vào chương trình nghị sự. Người nói nhiều khả năng là ai?<br/>(A) William Schmidt.<br/>(B) Paul Cohen.<br/>(C) Jung-Soo Park.<br/>(D) Santiago Reyes.</p><p><b>Phân tích hình ảnh:</b> Người nói mở đầu: <i>'I want to talk about our company's charitable giving program.'</i> (chương trình quyên góp từ thiện của công ty). Đối chiếu bảng Agenda:<br/>- Staff performance review: William Schmidt<br/>- <b>Corporate giving campaign: Paul Cohen</b><br/>- Public relations program: Jung-Soo Park<br/>- IT transformation initiative: Santiago Reyes<br/>Do đó diễn giả trình bày về chiến dịch quyên góp công ty chính là <b>Paul Cohen</b>. Chọn <b>(B)</b>.</p>",
                "questionType": "Graphic",
                "subCategory": "Graphic"
            },
            {
                "id": "ets22_t6_p4_99",
                "number": 99,
                "text": "According to the speaker, what is different about a program this year?",
                "options": {
                    "A": "A list of organizations is longer.",
                    "B": "A deadline has been extended.",
                    "C": "More employees are assigned to help.",
                    "D": "An operating budget has been increased."
                },
                "correctAnswer": "A",
                "explanation": "<p><b>Dịch nghĩa:</b> Theo người nói, điểm khác biệt về chương trình trong năm nay là gì?<br/>(A) Danh sách các tổ chức dài hơn (A list of organizations is longer).<br/>(B) Hạn chót đã được gia hạn.<br/>(C) Thêm nhiều nhân viên được phân công giúp đỡ.<br/>(D) Ngân sách hoạt động đã tăng lên.</p><p><b>Phân tích:</b> Người nói cho biết: <i>'This year, we've expanded our list of approved organizations from 15 to 25.'</i> (Năm nay chúng ta đã mở rộng danh sách tổ chức từ 15 lên 25). Tức là danh sách các tổ chức dài hơn <b>(A)</b>.</p>",
                "questionType": "Detail",
                "subCategory": "Detail"
            },
            {
                "id": "ets22_t6_p4_100",
                "number": 100,
                "text": "What will the speaker make available to the listeners?",
                "options": {
                    "A": "A research report",
                    "B": "A training video",
                    "C": "A magazine article",
                    "D": "A corporate calendar"
                },
                "correctAnswer": "C",
                "explanation": "<p><b>Dịch nghĩa:</b> Người nói sẽ cung cấp cái gì cho người nghe?<br/>(A) Báo cáo nghiên cứu.<br/>(B) Video đào tạo.<br/>(C) Một bài báo trên tạp chí (A magazine article).<br/>(D) Lịch công ty.</p><p><b>Phân tích:</b> Người nói cho biết: <i>'In fact, it was featured last month in an article in the magazine Business Effect. I'll post a link to that on our website after this meeting.'</i> (liên kết tới bài báo trên tạp chí). Chọn <b>(C)</b>.</p>",
                "questionType": "Next Action",
                "subCategory": "Action"
            }
        ]
    }
]

out_dir = "public/data/ets2022/test6"
os.makedirs(out_dir, exist_ok=True)

with open(f"{out_dir}/part4.json", "w", encoding="utf-8") as f:
    json.dump(part4_data, f, ensure_ascii=False, indent=2)

print(f"Generated {out_dir}/part4.json ({len(part4_data)} sets, {sum(len(s['questions']) for s in part4_data)} questions)")
