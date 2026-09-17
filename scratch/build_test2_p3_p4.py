import json
import re

CDN_BASE = "https://github.com/tuannd98fdn/toeic-learn/releases/download/ets2022-assets"

# Answer keys
p3_answers = {
    32: 'D', 33: 'B', 34: 'C',
    35: 'D', 36: 'A', 37: 'C',
    38: 'B', 39: 'C', 40: 'A',
    41: 'D', 42: 'A', 43: 'C',
    44: 'C', 45: 'D', 46: 'C',
    47: 'B', 48: 'D', 49: 'A',
    50: 'B', 51: 'C', 52: 'A',
    53: 'A', 54: 'C', 55: 'B',
    56: 'A', 57: 'B', 58: 'C',
    59: 'D', 60: 'D', 61: 'B',
    62: 'A', 63: 'C', 64: 'B',
    65: 'D', 66: 'C', 67: 'A',
    68: 'D', 69: 'B', 70: 'A'
}

p4_answers = {
    71: 'B', 72: 'A', 73: 'C',
    74: 'D', 75: 'C', 76: 'A',
    77: 'A', 78: 'D', 79: 'C',
    80: 'B', 81: 'D', 82: 'A',
    83: 'C', 84: 'B', 85: 'D',
    86: 'D', 87: 'A', 88: 'C',
    89: 'C', 90: 'D', 91: 'B',
    92: 'D', 93: 'B', 94: 'D',
    95: 'A', 96: 'D', 97: 'C',
    98: 'C', 99: 'D', 100: 'B'
}

# PART 3 sets data (13 sets, Q32 - Q70)
part3_sets = [
    {
        "set_index": 1,
        "q_range": (32, 34),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>M:</b> Hi, Anusha. This afternoon I'll be meeting with our financial consultant, Ms. Jefferson, for the last time. Since she's retiring next week, I wanted to get her some flowers. Do you know a good florist?<br/>\n<b>W:</b> The place I like best is called Greenwood Flower Shop. It's located just inside the train station on the right-hand side.<br/>\n<b>M:</b> Thanks. I just need to finalize this budget proposal, and then I'll head over to the station.</p>",
        "questions": [
            {
                "number": 32,
                "text": "Why does the man want to buy Ms. Jefferson some flowers?",
                "options": {
                    "A": "She was promoted.",
                    "B": "She won an award.",
                    "C": "She is moving.",
                    "D": "She is retiring."
                },
                "explanation": "Người đàn ông nói: <i>'Since she's retiring next week, I wanted to get her some flowers.'</i> (Vì cô ấy sẽ nghỉ hưu vào tuần tới nên tôi muốn mua hoa tặng cô ấy). Do đó chọn <b>(D) She is retiring</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 33,
                "text": "According to the woman, where is Greenwood Flower Shop?",
                "options": {
                    "A": "In a shopping mall",
                    "B": "In a train station",
                    "C": "Next to a cafe",
                    "D": "Across from the library"
                },
                "explanation": "Người phụ nữ trả lời: <i>'It's located just inside the train station on the right-hand side.'</i> (Nó nằm ngay bên trong ga xe lửa, phía bên tay phải). Do đó chọn <b>(B) In a train station</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 34,
                "text": "What does the man say he will do before he leaves the office?",
                "options": {
                    "A": "Fill out a time sheet",
                    "B": "Send an e-mail",
                    "C": "Finish a budget proposal",
                    "D": "Arrange a meeting"
                },
                "explanation": "Người đàn ông nói: <i>'I just need to finalize this budget proposal, and then I'll head over to the station.'</i> (Tôi chỉ cần hoàn thiện bản đề xuất ngân sách này rồi sẽ qua ga tàu). Chọn <b>(C) Finish a budget proposal</b>.",
                "questionType": "Next Action", "subCategory": "Next Action"
            }
        ]
    },
    {
        "set_index": 2,
        "q_range": (35, 37),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>M:</b> Ms. Webber, I just booked the accommodations for your trip to Melbourne next week. I found you a hotel within a mile of the conference center.<br/>\n<b>W:</b> That's great. Thank you for arranging that.<br/>\n<b>M:</b> No problem. And remember to keep your receipts. You'll need them to get reimbursed.<br/>\n<b>W:</b> Okay, I'll do that. Oh, and does the hotel have a restaurant on site? I'll be working in the hotel a lot, so it'd be convenient if I could eat there.</p>",
        "questions": [
            {
                "number": 35,
                "text": "What did the man just do?",
                "options": {
                    "A": "He upgraded a flight.",
                    "B": "He arranged for a rental car.",
                    "C": "He prepared some presentation slides.",
                    "D": "He made a hotel reservation."
                },
                "explanation": "Người đàn ông nói: <i>'I just booked the accommodations for your trip to Melbourne next week. I found you a hotel...'</i> (Tôi vừa đặt chỗ nghỉ cho chuyến đi Melbourne của cô. Tôi tìm được khách sạn...). Do đó chọn <b>(D) He made a hotel reservation</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 36,
                "text": "What does the man remind the woman to do?",
                "options": {
                    "A": "Save her receipts",
                    "B": "Bring her ID badge",
                    "C": "Sign a form",
                    "D": "Arrive early"
                },
                "explanation": "Người đàn ông nhắc nhở: <i>'And remember to keep your receipts. You'll need them to get reimbursed.'</i> (Và hãy nhớ giữ lại hóa đơn của cô. Cô sẽ cần chúng để được hoàn tiền). Do đó chọn <b>(A) Save her receipts</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 37,
                "text": "What does the woman ask the man about?",
                "options": {
                    "A": "A bank",
                    "B": "A post office",
                    "C": "A restaurant",
                    "D": "A conference center"
                },
                "explanation": "Người phụ nữ hỏi: <i>'Oh, and does the hotel have a restaurant on site?'</i> (Ồ, và khách sạn có nhà hàng bên trong không?). Do đó chọn <b>(C) A restaurant</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 3,
        "q_range": (38, 40),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>W:</b> Antonio, I'd like your input about how we can make our spring athletic clothing line more original.<br/>\n<b>M:</b> How about designing some geometric patterns that we can have printed onto our fabric? That would set our clothing apart from other brands that use muted solid colors.<br/>\n<b>W:</b> I like that idea, but I'm worried it would add a step or two to our production schedule. We have several hard deadlines coming up soon.<br/>\n<b>M:</b> Let's try designing one patterned fabric for now and see how the production goes.</p>",
        "questions": [
            {
                "number": 38,
                "text": "What industry do the speakers most likely work in?",
                "options": {
                    "A": "Television",
                    "B": "Fashion",
                    "C": "Home furnishings",
                    "D": "Advertising"
                },
                "explanation": "Người phụ nữ nhắc đến: <i>'our spring athletic clothing line'</i> (dòng trang phục thể thao mùa xuân) và người đàn ông nhắc đến <i>'fabric'</i> (vải). Do đó họ làm trong ngành thời trang may mặc <b>(B) Fashion</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 39,
                "text": "What does the man suggest doing?",
                "options": {
                    "A": "Providing tours of a facility",
                    "B": "Opening a branch office",
                    "C": "Designing special fabric",
                    "D": "Installing brighter lights"
                },
                "explanation": "Người đàn ông gợi ý: <i>'How about designing some geometric patterns that we can have printed onto our fabric?'</i> (Thiết kế các họa tiết hình học in lên vải). Do đó chọn <b>(C) Designing special fabric</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 40,
                "text": "What is the woman concerned about?",
                "options": {
                    "A": "A plan would be time-consuming.",
                    "B": "A color is too bright.",
                    "C": "Some sales figures have declined.",
                    "D": "Some supplies will be expensive."
                },
                "explanation": "Người phụ nữ bày tỏ lo ngại: <i>'I'm worried it would add a step or two to our production schedule. We have several hard deadlines coming up soon.'</i> (Tôi lo nó sẽ tốn thêm thời gian trong tiến độ sản xuất). Chọn <b>(A) A plan would be time-consuming</b>.",
                "questionType": "Inference", "subCategory": "Inference"
            }
        ]
    },
    {
        "set_index": 4,
        "q_range": (41, 43),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>W:</b> Hi, Yoon-Ho. Do you have a minute? Anita and I need your assistance with our email.<br/>\n<b>M:</b> Sure, what's going on?<br/>\n<b>W:</b> Well, neither of us can send or receive messages today. We called IT, but no one's answering.<br/>\n<b>M:</b> I had the same issue earlier this morning. It turns out the network router for our department was unplugged. Let me go check if it's still plugged into the wall.</p>",
        "questions": [
            {
                "number": 41,
                "text": "What problem is being discussed?",
                "options": {
                    "A": "A company manual contains some errors.",
                    "B": "A shipment was not delivered on time.",
                    "C": "Some materials are missing from a cabinet.",
                    "D": "An e-mail system is not functioning properly."
                },
                "explanation": "Người phụ nữ nói: <i>'neither of us can send or receive messages today... called IT'</i>. Hệ thống thư điện tử không hoạt động. Chọn <b>(D) An e-mail system is not functioning properly</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 42,
                "text": "Who most likely is the man?",
                "options": {
                    "A": "A coworker",
                    "B": "A security guard",
                    "C": "A warehouse manager",
                    "D": "A sales representative"
                },
                "explanation": "Người phụ nữ gọi tên 'Yoon-Ho' và người đàn ông nói 'I had the same issue earlier this morning... for our department'. Anh ấy là đồng nghiệp cùng phòng ban <b>(A) A coworker</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 43,
                "text": "What will the man do next?",
                "options": {
                    "A": "Replace a lightbulb",
                    "B": "Read an instruction manual",
                    "C": "Check a piece of equipment",
                    "D": "Contact an administrator"
                },
                "explanation": "Người đàn ông nói: <i>'Let me go check if it's still plugged into the wall.'</i> (Để tôi đi kiểm tra xem cục phát mạng có cắm vào tường không). Chọn <b>(C) Check a piece of equipment</b>.",
                "questionType": "Next Action", "subCategory": "Next Action"
            }
        ]
    },
    {
        "set_index": 5,
        "q_range": (44, 46),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>W:</b> Hello, I'm calling from Summit Bicycle Tours. I'd like to reserve an outdoor table for a group of twelve this coming Thursday at 7:00 P.M.<br/>\n<b>M:</b> I'm sorry, but our patio seating is completely booked for Thursday evening due to a corporate dinner. We do have indoor tables available, though.<br/>\n<b>W:</b> Our clients specifically requested patio seating so they can enjoy the view of the bay. How about the following Monday?<br/>\n<b>M:</b> Yes, Monday evening is wide open. I can reserve a large patio table for you then.</p>",
        "questions": [
            {
                "number": 44,
                "text": "Where does the woman work?",
                "options": {
                    "A": "At an amusement park",
                    "B": "At a fitness center",
                    "C": "At a bicycle-tour company",
                    "D": "At an automobile dealership"
                },
                "explanation": "Người phụ nữ giới thiệu: <i>'Hello, I'm calling from Summit Bicycle Tours.'</i> Do đó chọn <b>(C) At a bicycle-tour company</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 45,
                "text": "Why is the man unable to make a reservation for next Thursday?",
                "options": {
                    "A": "A calendar is fully booked.",
                    "B": "A restaurant is closed for renovations.",
                    "C": "A deposit has not been received.",
                    "D": "The outdoor seating area is reserved."
                },
                "explanation": "Người đàn ông giải thích: <i>'our patio seating is completely booked for Thursday evening due to a corporate dinner'</i>. Chỗ ngồi ngoài trời đã được đặt hết. Chọn <b>(D) The outdoor seating area is reserved</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 46,
                "text": "What does the man agree to do?",
                "options": {
                    "A": "Provide a discount",
                    "B": "Serve a special dish",
                    "C": "Book a table for a different date",
                    "D": "Send a confirmation e-mail"
                },
                "explanation": "Người đàn ông đồng ý đặt bàn vào tối thứ Hai tuần sau: <i>'Yes, Monday evening is wide open. I can reserve a large patio table for you then.'</i> Chọn <b>(C) Book a table for a different date</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 6,
        "q_range": (47, 49),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>M:</b> Ms. Khan, this is James Wilson, one of the freelance photographers for your magazine. I've finished taking the pictures for the feature story on historic architecture in Montreal.<br/>\n<b>W:</b> That was fast! The article isn't scheduled to run until next month. Did you have any trouble finding the buildings on the list?<br/>\n<b>M:</b> Not at all. I've already uploaded the high-resolution files to the shared folder. Also, I wanted to ask about submitting my travel expenses for reimbursement.<br/>\n<b>W:</b> Just fill out the standard expense form on our contributor portal and attach your train tickets and hotel receipts.</p>",
        "questions": [
            {
                "number": 47,
                "text": "Who is the man?",
                "options": {
                    "A": "An architect",
                    "B": "A photographer",
                    "C": "A travel agent",
                    "D": "A museum curator"
                },
                "explanation": "Người đàn ông giới thiệu: <i>'this is James Wilson, one of the freelance photographers for your magazine.'</i> Chọn <b>(B) A photographer</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 48,
                "text": "What has the man already done?",
                "options": {
                    "A": "Purchased train tickets",
                    "B": "Interviewed a historian",
                    "C": "Updated a contact list",
                    "D": "Uploaded some files"
                },
                "explanation": "Người đàn ông nói: <i>'I've already uploaded the high-resolution files to the shared folder.'</i> Chọn <b>(D) Uploaded some files</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 49,
                "text": "What does the woman instruct the man to do?",
                "options": {
                    "A": "Fill out an expense form",
                    "B": "Appear in a feature story",
                    "C": "Contact an editor",
                    "D": "Review an article draft"
                },
                "explanation": "Người phụ nữ hướng dẫn: <i>'Just fill out the standard expense form on our contributor portal and attach your train tickets and hotel receipts.'</i> Chọn <b>(A) Fill out an expense form</b>.",
                "questionType": "Next Action", "subCategory": "Next Action"
            }
        ]
    },
    {
        "set_index": 7,
        "q_range": (50, 52),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>M:</b> Emiko and Susan, could you give me an update on the negotiations with the city to build our new manufacturing facility there?<br/>\n<b>W1:</b> The city council was very receptive. They offered us a substantial property tax reduction for the first five years.<br/>\n<b>W2:</b> However, they asked that we commit to hiring at least sixty percent of our assembly line workers from the local community.<br/>\n<b>M:</b> That sounds reasonable and aligns with our corporate social responsibility goals. Let's schedule a formal signing ceremony with the mayor next week.</p>",
        "questions": [
            {
                "number": 50,
                "text": "What kind of business do the speakers most likely work for?",
                "options": {
                    "A": "An automobile manufacturer",
                    "B": "A manufacturing company",
                    "C": "A county hospital",
                    "D": "A real estate agency"
                },
                "explanation": "Người đàn ông hỏi về <i>'build our new manufacturing facility'</i> và <i>'assembly line workers'</i>. Do đó họ làm việc cho công ty sản xuất <b>(B) A manufacturing company</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 51,
                "text": "What incentive did the city council offer?",
                "options": {
                    "A": "Free utility connections",
                    "B": "Subsidized public transit",
                    "C": "A tax reduction",
                    "D": "Zoning exemptions"
                },
                "explanation": "Người phụ nữ 1 nói: <i>'They offered us a substantial property tax reduction for the first five years.'</i> (Họ đề xuất giảm đáng kể thuế bất động sản trong 5 năm đầu). Chọn <b>(C) A tax reduction</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 52,
                "text": "What condition did the city attach to their proposal?",
                "options": {
                    "A": "Hiring local workers",
                    "B": "Building a public park",
                    "C": "Completing construction by December",
                    "D": "Installing solar panels"
                },
                "explanation": "Người phụ nữ 2 nêu điều kiện: <i>'they asked that we commit to hiring at least sixty percent of our assembly line workers from the local community.'</i> Tuyển dụng nhân sự địa phương. Chọn <b>(A) Hiring local workers</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 8,
        "q_range": (53, 55),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>M:</b> Ms. Moreau, thank you for volunteering to participate in this product testing session for our upcoming kitchen appliance.<br/>\n<b>W:</b> I'm glad to help. I enjoy trying out new culinary gadgets.<br/>\n<b>M:</b> Today you'll be evaluating our new high-speed blender model. We have prepared several ingredients for you to make smoothies and soup.<br/>\n<b>W:</b> Sounds delicious. Should I write down my feedback as I go, or after I finish?<br/>\n<b>M:</b> Please fill out this short survey after trying each recipe. We're especially interested in your rating of the noise level and ease of cleaning.</p>",
        "questions": [
            {
                "number": 53,
                "text": "What has the woman volunteered to do?",
                "options": {
                    "A": "Try out some new products",
                    "B": "Purchase beverages for a luncheon",
                    "C": "Clean a laboratory",
                    "D": "Host a cooking show"
                },
                "explanation": "Người đàn ông cảm ơn: <i>'thank you for volunteering to participate in this product testing session for our upcoming kitchen appliance.'</i> Chọn <b>(A) Try out some new products</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 54,
                "text": "What item will the woman be testing?",
                "options": {
                    "A": "A microwave oven",
                    "B": "A coffee machine",
                    "C": "A food blender",
                    "D": "A dishwasher"
                },
                "explanation": "Người đàn ông nói: <i>'Today you'll be evaluating our new high-speed blender model.'</i> Chọn <b>(C) A food blender</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 55,
                "text": "What is the woman asked to complete?",
                "options": {
                    "A": "A safety waiver",
                    "B": "A feedback survey",
                    "C": "A recipe booklet",
                    "D": "An equipment log"
                },
                "explanation": "Người đàn ông yêu cầu: <i>'Please fill out this short survey after trying each recipe.'</i> Chọn <b>(B) A feedback survey</b>.",
                "questionType": "Next Action", "subCategory": "Next Action"
            }
        ]
    },
    {
        "set_index": 9,
        "q_range": (56, 58),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>M:</b> Hi, Irina. Are you all finished styling your client's hair?<br/>\n<b>W:</b> Yes, I cut and blow-dried her hair, and she just left. We've had a steady stream of appointments all morning.<br/>\n<b>M:</b> That's great, but remember that weekday afternoons are usually much slower. They don't have as many clients, though.<br/>\n<b>W:</b> That's true. While it's quiet, I can restock the shampoo bottles and sanitizing solution at all the stations.<br/>\n<b>M:</b> Good idea. The health and safety inspector will be here at 3:00 P.M. for our annual salon inspection.</p>",
        "questions": [
            {
                "number": 56,
                "text": "Where most likely are the speakers?",
                "options": {
                    "A": "At a hair salon",
                    "B": "At a catering hall",
                    "C": "At a laundry service",
                    "D": "At an energy company"
                },
                "explanation": "Người đàn ông hỏi: <i>'Are you all finished styling your client's hair?'</i> và người phụ nữ nhắc đến <i>'cut and blow-dried her hair'</i>, <i>'shampoo bottles'</i>, <i>'salon'</i>. Do đó họ ở tiệm làm tóc <b>(A) At a hair salon</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 57,
                "text": "Why does the woman say, \"They don't have as many clients, though\"?",
                "options": {
                    "A": "To express pride in her company's growth",
                    "B": "To explain why an expense is so high",
                    "C": "To acknowledge that business will slow down",
                    "D": "To question the accuracy of a client list"
                },
                "explanation": "Người nói đề cập rằng buổi chiều ngày trong tuần thường vắng khách để giải thích việc có thời gian làm việc dọn dẹp, sắp xếp. Chọn <b>(B) To acknowledge that business will slow down</b>.",
                "questionType": "Inference", "subCategory": "Inference"
            },
            {
                "number": 58,
                "text": "What will happen later today?",
                "options": {
                    "A": "Some supplies will be delivered.",
                    "B": "An employee meeting will be held.",
                    "C": "An inspection will be conducted.",
                    "D": "An expense report will be submitted."
                },
                "explanation": "Người đàn ông thông báo: <i>'The health and safety inspector will be here at 3:00 P.M. for our annual salon inspection.'</i> Chọn <b>(C) An inspection will be conducted</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 10,
        "q_range": (59, 61),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>W:</b> Thanks for meeting with me today, Diego. Our firm's been contracted by a ferry company to design a boat that runs on clean energy.<br/>\n<b>M:</b> That's an exciting project, but a hydrogen power source is going to need a lot of space. Since ferries usually transport cars, I'm concerned about where we'd place the fuel tanks without losing vehicle capacity.<br/>\n<b>W:</b> Actually, this ferry will operate purely for harbor sightseeing tours. It won't be carrying any cars, just foot passengers.<br/>\n<b>M:</b> In that case, we could install the hydrogen storage units beneath the passenger seating decks. Could you send me the vessel's exterior dimensions so I can run some weight distribution simulations?<br/>\n<b>W:</b> Absolutely, I'll email the CAD drawings right away.</p>",
        "questions": [
            {
                "number": 59,
                "text": "Which industry do the speakers most likely work in?",
                "options": {
                    "A": "Tourism",
                    "B": "Agriculture",
                    "C": "Education",
                    "D": "Engineering"
                },
                "explanation": "Họ bàn về việc thiết kế tàu phà chạy năng lượng sạch, bố trí khoang nhiên liệu và mô phỏng phân bố trọng lượng. Do đó họ làm trong ngành kỹ thuật thiết kế <b>(D) Engineering</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 60,
                "text": "What does the man say he is concerned about?",
                "options": {
                    "A": "Expenses",
                    "B": "Safety",
                    "C": "Competition",
                    "D": "Space"
                },
                "explanation": "Người đàn ông nói: <i>'a hydrogen power source is going to need a lot of space... I'm concerned about where we'd place the fuel tanks...'</i> (lo ngại về không gian/diện tích). Chọn <b>(D) Space</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 61,
                "text": "What does the man agree to do?",
                "options": {
                    "A": "Apply for some funding",
                    "B": "Do some research",
                    "C": "Organize a business trip",
                    "D": "Assemble a work crew"
                },
                "explanation": "Người đàn ông đồng ý nhận bản vẽ kích thước để nghiên cứu và chạy mô phỏng: <i>'run some weight distribution simulations'</i>. Chọn <b>(B) Do some research</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 11,
        "q_range": (62, 64),
        "graphic": f"{CDN_BASE}/p3_g01.jpg",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>M:</b> Dolores, thanks again for offering to drive to the technology seminar. I'm not very familiar with this highway.<br/>\n<b>W:</b> Don't worry, I used to live in this area, so I know the roads well. According to the event invitation, the convention center is located on Berk Street.<br/>\n<b>M:</b> Great. Let's look at the exit sign ahead so we don't miss our turn.<br/>\n<b>W:</b> There it is. We need Exit 8 for Berk Street.<br/>\n<b>M:</b> Perfect. I'll text our colleagues who are already there to save a few seats for us near the front of the auditorium.</p>",
        "questions": [
            {
                "number": 62,
                "text": "What does the woman remind the man about?",
                "options": {
                    "A": "She used to live in the area.",
                    "B": "She needs to stop at a store.",
                    "C": "She attended a seminar last year.",
                    "D": "She has just bought a new car."
                },
                "explanation": "Người phụ nữ nói: <i>'Don't worry, I used to live in this area, so I know the roads well.'</i> Chọn <b>(A) She used to live in the area</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 63,
                "text": "Look at the graphic. Which exit will the speakers take?",
                "options": {
                    "A": "Maple Road",
                    "B": "Carter Lane",
                    "C": "Berk Street",
                    "D": "High Road"
                },
                "explanation": "Người phụ nữ nói: <i>'the convention center is located on Berk Street... We need Exit 8 for Berk Street.'</i> Nhìn vào biển báo, Berk Street ứng với Exit 8. Chọn <b>(C) Berk Street</b>.",
                "questionType": "Graphic", "subCategory": "Graphic"
            },
            {
                "number": 64,
                "text": "What will the man ask his coworkers to do?",
                "options": {
                    "A": "Cancel a reservation",
                    "B": "Save some seats",
                    "C": "Sign in at an event",
                    "D": "Print some materials"
                },
                "explanation": "Người đàn ông nói: <i>'I'll text our colleagues who are already there to save a few seats for us near the front...'</i> (nhờ đồng nghiệp giữ chỗ ngồi). Chọn <b>(B) Save some seats</b>.",
                "questionType": "Next Action", "subCategory": "Next Action"
            }
        ]
    },
    {
        "set_index": 12,
        "q_range": (65, 67),
        "graphic": f"{CDN_BASE}/p3_g02.jpg",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>W:</b> Good work helping the school go paperless, Kentaro. You've scanned and shredded hundreds of outdated student records this week.<br/>\n<b>M:</b> Thanks, Principal Vance. I've filled three large bags with shredded white paper. Which recycling bin should I take them out to?<br/>\n<b>W:</b> Outside the back entrance by the cafeteria, there are four large colored bins. Paper goes into Bin 3.<br/>\n<b>M:</b> Got it, Bin 3. Those bags are quite heavy though.<br/>\n<b>W:</b> Why don't you use the hand cart in the custodial closet? That'll make transporting them much easier.</p>",
        "questions": [
            {
                "number": 65,
                "text": "Where does the conversation most likely take place?",
                "options": {
                    "A": "At a hotel",
                    "B": "At an accounting firm",
                    "C": "At a doctor's office",
                    "D": "At a school"
                },
                "explanation": "Người phụ nữ nói: <i>'helping the school go paperless... student records'</i> và người đàn ông gọi cô là <i>'Principal Vance'</i> (Hiệu trưởng Vance). Do đó cuộc trò chuyện diễn ra ở trường học <b>(D) At a school</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 66,
                "text": "Look at the graphic. Which bin will the man use?",
                "options": {
                    "A": "Bin 1",
                    "B": "Bin 2",
                    "C": "Bin 3",
                    "D": "Bin 4"
                },
                "explanation": "Người phụ nữ hướng dẫn: <i>'Paper goes into Bin 3.'</i> Nhìn vào hình vẽ 4 thùng rác phân loại, Bin 3 có nhãn 'Paper'. Do đó chọn <b>(C) Bin 3</b>.",
                "questionType": "Graphic", "subCategory": "Graphic"
            },
            {
                "number": 67,
                "text": "What does the woman suggest?",
                "options": {
                    "A": "Using a cart",
                    "B": "Waiting for a confirmation",
                    "C": "Giving an assignment to a colleague",
                    "D": "Rescheduling an appointment with a client"
                },
                "explanation": "Người phụ nữ gợi ý: <i>'Why don't you use the hand cart in the custodial closet? That'll make transporting them much easier.'</i> (Sao bạn không dùng chiếc xe đẩy trong phòng lao công?). Chọn <b>(A) Using a cart</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 13,
        "q_range": (68, 70),
        "graphic": f"{CDN_BASE}/p3_g03.jpg",
        "transcript": "<p><b>Transcript:</b><br/>\n<b>W:</b> Ricardo, could you take a look at this invitation? It's a draft I put together for our botanical society's annual charity gala and fund-raiser.<br/>\n<b>M:</b> It looks very professional! I notice on the schedule that you have dinner at 6:00 P.M. and live music at 7:00 P.M. Most guests will probably still be eating and chatting at 7:00. I think the musical performance should start at 8:00 P.M. instead.<br/>\n<b>W:</b> Good point. We can swap the speeches to 7:00 P.M. and have the live band play at 8:00 P.M.<br/>\n<b>M:</b> Also, guests will need to purchase admission tickets ahead of time, so let's make sure to include our event website address at the bottom of the card.</p>",
        "questions": [
            {
                "number": 68,
                "text": "What type of event are the speakers organizing?",
                "options": {
                    "A": "An award ceremony",
                    "B": "A grand-opening celebration",
                    "C": "A foreign official's reception",
                    "D": "A fund-raiser"
                },
                "explanation": "Người phụ nữ nói: <i>'for our botanical society's annual charity gala and fund-raiser'</i>. Chọn <b>(D) A fund-raiser</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 69,
                "text": "Look at the graphic. What time does the man think the music should begin?",
                "options": {
                    "A": "At 6:00 P.M.",
                    "B": "At 8:00 P.M.",
                    "C": "At 5:00 P.M.",
                    "D": "At 7:00 P.M."
                },
                "explanation": "Người đàn ông nhận xét lịch trình hiện tại (7:00 P.M. Live Music) và đề xuất: <i>'I think the musical performance should start at 8:00 P.M. instead.'</i> Chọn <b>(B) At 8:00 P.M.</b>.",
                "questionType": "Graphic", "subCategory": "Graphic"
            },
            {
                "number": 70,
                "text": "What information does the man suggest adding to the invitation?",
                "options": {
                    "A": "A Web site address",
                    "B": "The name of a sponsor",
                    "C": "The location of a concert hall",
                    "D": "A list of performers"
                },
                "explanation": "Người đàn ông đề xuất: <i>'so let's make sure to include our event website address at the bottom of the card.'</i> Chọn <b>(A) A Web site address</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    }
]

# PART 4 talks data (10 sets, Q71 - Q100)
part4_sets = [
    {
        "set_index": 1,
        "q_range": (71, 73),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\nYou're listening to Radio Station WKXL. Turning to local business updates, Monday marked the official opening of Starbright Corporation's newest manufacturing plant right here in Millfield. Starbright, renowned nationwide for its line of athletic footwear, expects this five-million-dollar facility to create more than three hundred new jobs by the end of the fiscal year. Company executives stated that the plant utilizes state-of-the-art automated machinery to assemble sneakers using recycled rubber and organic textiles. If you're interested in applying for a position, HR representatives will be holding a series of video interviews throughout this month. Visit starbright.com/careers to book your interview slot.</p>",
        "questions": [
            {
                "number": 71,
                "text": "What did Starbright Corporation recently do?",
                "options": {
                    "A": "It changed its company logo.",
                    "B": "It opened a new factory.",
                    "C": "It conducted a financial audit.",
                    "D": "It upgraded a product line."
                },
                "explanation": "Phát thanh viên đưa tin: <i>'Monday marked the official opening of Starbright Corporation's newest manufacturing plant...'</i> (nhà máy sản xuất mới). Chọn <b>(B) It opened a new factory</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 72,
                "text": "What type of product does Starbright Corporation make?",
                "options": {
                    "A": "Footwear",
                    "B": "Cosmetics",
                    "C": "Housewares",
                    "D": "Electronics"
                },
                "explanation": "Bản tin nhắc đến: <i>'renowned nationwide for its line of athletic footwear... assemble sneakers'</i>. Chọn <b>(A) Footwear</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 73,
                "text": "What is available online?",
                "options": {
                    "A": "An application",
                    "B": "A schedule",
                    "C": "A video interview",
                    "D": "A virtual tour"
                },
                "explanation": "Người nói thông báo: <i>'HR representatives will be holding a series of video interviews throughout this month. Visit starbright.com/careers to book your interview slot.'</i> Chọn <b>(C) A video interview</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 2,
        "q_range": (74, 76),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\nThank you all for coming to this celebration. I know I speak for everyone here at Apex Advertising when I say how much we will miss working alongside Mustafa Perez. Over his thirty-five years with our agency, Mustafa has directed campaigns for some of the biggest brand names in the world. He has been a mentor, a leader, and a dear friend to countless colleagues. While we are sad to see him retire, we are excited for his upcoming travels across Europe. To commemorate tonight, our graphic design department created a personalized slideshow chronicling his most iconic advertisements. Let's dim the lights and enjoy the retrospective.</p>",
        "questions": [
            {
                "number": 74,
                "text": "What event is taking place?",
                "options": {
                    "A": "An orientation session",
                    "B": "A gallery opening",
                    "C": "An awards ceremony",
                    "D": "A retirement party"
                },
                "explanation": "Người nói chia sẻ: <i>'how much we will miss working alongside Mustafa Perez... While we are sad to see him retire...'</i>. Đây là bữa tiệc chia tay nghỉ hưu. Chọn <b>(D) A retirement party</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 75,
                "text": "What type of business does Mustafa Perez work for?",
                "options": {
                    "A": "An art gallery",
                    "B": "A newspaper publisher",
                    "C": "An advertising agency",
                    "D": "A camera shop"
                },
                "explanation": "Người nói nhắc đến: <i>'everyone here at Apex Advertising... Over his thirty-five years with our agency...'</i>. Chọn <b>(C) An advertising agency</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 76,
                "text": "What has the speaker created for the event?",
                "options": {
                    "A": "A slideshow",
                    "B": "A T-shirt design",
                    "C": "A Web site",
                    "D": "A brochure"
                },
                "explanation": "Người nói giới thiệu: <i>'our graphic design department created a personalized slideshow chronicling his most iconic advertisements.'</i> Chọn <b>(A) A slideshow</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 3,
        "q_range": (77, 79),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\nThe last point on our safety meeting agenda concerns the cleanroom protocols at our pharmaceutical laboratory. As manufacturers of prescription medications, maintaining strict sterile conditions is non-negotiable. Recently, our compliance officers noticed that several technicians failed to secure their hairnets and protective footwear before entering Cleanroom B. Please remember that contamination risks could ruin entire production batches. We ask all shift supervisors to inspect their teams before each entry. You can review the updated safety manual and equipment donning procedures directly on our staff intranet portal.</p>",
        "questions": [
            {
                "number": 77,
                "text": "What does the speaker's company produce?",
                "options": {
                    "A": "Medications",
                    "B": "Textbooks",
                    "C": "Exercise clothing",
                    "D": "Construction materials"
                },
                "explanation": "Người nói nêu rõ: <i>'cleanroom protocols at our pharmaceutical laboratory. As manufacturers of prescription medications...'</i>. Chọn <b>(A) Medications</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 78,
                "text": "What are the listeners reminded to do?",
                "options": {
                    "A": "Recruit some staff",
                    "B": "Enter some data",
                    "C": "Attend some training sessions",
                    "D": "Follow safety procedures"
                },
                "explanation": "Người nói nhắc nhở nhân viên tuân thủ quy trình phòng sạch: <i>'maintaining strict sterile conditions... inspect their teams before each entry'</i>. Chọn <b>(D) Follow safety procedures</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 79,
                "text": "What can be found online?",
                "options": {
                    "A": "A product database",
                    "B": "An employee directory",
                    "C": "A handbook",
                    "D": "A contract"
                },
                "explanation": "Người nói kết luận: <i>'You can review the updated safety manual and equipment donning procedures directly on our staff intranet portal.'</i> Cẩm nang/sổ tay an toàn (manual / handbook). Chọn <b>(C) A handbook</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 4,
        "q_range": (80, 82),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\nHi, Aisha. I'm here at Oakridge Park setting up our booth for the weekend farmer's market. I just unloaded all the crates of fresh organic strawberries and blueberries we picked yesterday. Everything looks fantastic, though I did accidentally forget the canopy tent we normally use to shield the produce. I know you're worried about the berries spoiling in direct heat, but it's supposed to be cloudy all day, so they should stay cool and fresh without any problem. Anyway, the main reason I called was to remind you to submit our entry form for the regional agriculture competition by noon today. I really think our berries have a winning shot this year.</p>",
        "questions": [
            {
                "number": 80,
                "text": "What will the speaker do at a park?",
                "options": {
                    "A": "Watch a performance",
                    "B": "Sell fruit",
                    "C": "Plant trees",
                    "D": "Take photographs"
                },
                "explanation": "Người nói đang ở quầy chợ nông sản bán dâu tây và việt quất: <i>'setting up our booth for the weekend farmer's market... crates of fresh organic strawberries and blueberries'</i>. Chọn <b>(B) Sell fruit</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 81,
                "text": "Why does the speaker say, \"but it's supposed to be cloudy all day\"?",
                "options": {
                    "A": "To ask for help",
                    "B": "To express frustration",
                    "C": "To reject the listener's suggestion",
                    "D": "To reassure the listener"
                },
                "explanation": "Người nghe lo hoa quả bị hỏng do nắng nóng khi quên mang lều bạt, người nói trấn an rằng trời râm mát cả ngày nên không sao: <i>'I know you're worried... but it's supposed to be cloudy all day, so they should stay cool'</i>. Chọn <b>(D) To reassure the listener</b>.",
                "questionType": "Inference", "subCategory": "Inference"
            },
            {
                "number": 82,
                "text": "What does the speaker remind the listener to do?",
                "options": {
                    "A": "Register for a competition",
                    "B": "Purchase some supplies",
                    "C": "Prepare a shipment",
                    "D": "Speak to a customer"
                },
                "explanation": "Người nói nhắc nhở: <i>'remind you to submit our entry form for the regional agriculture competition by noon today.'</i> Đăng ký tham gia cuộc thi. Chọn <b>(A) Register for a competition</b>.",
                "questionType": "Next Action", "subCategory": "Next Action"
            }
        ]
    },
    {
        "set_index": 5,
        "q_range": (83, 85),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\nAttention, all assembly line staff here at Highland Furniture Factory. Please be aware that our electronic time-tracking system is currently offline due to a server malfunction. That means you won't be able to swipe your ID badges at the digital kiosks when clocking out at the end of your shift today. Instead, please report to the receptionist's desk in the main lobby and sign the paper attendance sheet before exiting the building. Our network engineering team is working on the problem, and they assure us that the software will be fully operational by tomorrow morning. Thank you for your patience and cooperation.</p>",
        "questions": [
            {
                "number": 83,
                "text": "Where is the announcement being made?",
                "options": {
                    "A": "At a technology firm",
                    "B": "At a repair shop",
                    "C": "At a factory",
                    "D": "At a law office"
                },
                "explanation": "Thông báo mở đầu: <i>'Attention, all assembly line staff here at Highland Furniture Factory.'</i> (nhà máy nội thất). Chọn <b>(C) At a factory</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 84,
                "text": "Where should the listeners go at the end of their shifts?",
                "options": {
                    "A": "To the company cafeteria",
                    "B": "To the receptionist's desk",
                    "C": "To the locker room",
                    "D": "To the parking area"
                },
                "explanation": "Người nói hướng dẫn: <i>'Instead, please report to the receptionist's desk in the main lobby and sign the paper attendance sheet...'</i>. Chọn <b>(B) To the receptionist's desk</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 85,
                "text": "What will happen tomorrow?",
                "options": {
                    "A": "Some office furniture will be delivered.",
                    "B": "New board members will be elected.",
                    "C": "A city official will conduct an inspection.",
                    "D": "Some time-reporting software will be fixed."
                },
                "explanation": "Người nói thông báo: <i>'they assure us that the software will be fully operational by tomorrow morning.'</i> Phần mềm chấm công sẽ được khắc phục xong. Chọn <b>(D) Some time-reporting software will be fixed</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 6,
        "q_range": (86, 88),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\nThe final item on our staff meeting agenda concerns the upcoming Community Health Expo next Saturday. As a family medical clinic, we've had an informational booth at this event for five consecutive years. However, since Nurse Jenkins recently retired, we currently do not have anyone designated to organize our health screening materials and oversee the volunteers. We need one staff member to step forward and take charge of coordinating our booth. The clinic will provide complimentary catered lunches for everyone who participates, and you'll receive overtime pay for your hours on Saturday.</p>",
        "questions": [
            {
                "number": 86,
                "text": "Where do the listeners work?",
                "options": {
                    "A": "At an employment agency",
                    "B": "At a sports arena",
                    "C": "At a conference center",
                    "D": "At a medical clinic"
                },
                "explanation": "Người nói nhắc đến: <i>'As a family medical clinic, we've had an informational booth...'</i> (phòng khám y tế gia đình). Chọn <b>(D) At a medical clinic</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 87,
                "text": "What does the speaker imply when she says, \"Nurse Jenkins has retired\"?",
                "options": {
                    "A": "A role needs to be filled.",
                    "B": "An e-mail will not be answered.",
                    "C": "A marketing strategy should be revised.",
                    "D": "A process will be less efficient."
                },
                "explanation": "Người nói giải thích lý do hiện tại chưa có người phụ trách gian hàng vì cô Jenkins đã nghỉ hưu, ngụ ý cần ai đó đảm nhận vị trí này: <i>'we currently do not have anyone designated... We need one staff member to step forward'</i>. Chọn <b>(A) A role needs to be filled</b>.",
                "questionType": "Inference", "subCategory": "Inference"
            },
            {
                "number": 88,
                "text": "What will be provided for those who volunteer?",
                "options": {
                    "A": "Free medical checkups",
                    "B": "Gift certificates",
                    "C": "A meal",
                    "D": "Transportation"
                },
                "explanation": "Người nói nêu đãi ngộ: <i>'The clinic will provide complimentary catered lunches for everyone who participates...'</i> (bữa ăn trưa miễn phí). Chọn <b>(C) A meal</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 7,
        "q_range": (89, 91),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\nGood morning, Martina. I'm calling about our upcoming client dinner with NVC Industries this Friday evening. As you know, the advertising business is very competitive, and keeping NVC satisfied is vital for our agency's quarterly revenue. I wanted to let you know that I've invited Isabel to join us for dinner. Since she was recently promoted to Senior Account Executive, she'll be taking over daily communications with NVC starting next month. Could you please call the restaurant and add one more person to our table reservation? Let me know once the reservation has been updated.</p>",
        "questions": [
            {
                "number": 89,
                "text": "What is scheduled for Friday?",
                "options": {
                    "A": "A job fair",
                    "B": "A wellness workshop",
                    "C": "A client meeting",
                    "D": "An employee luncheon"
                },
                "explanation": "Người gọi nhắc đến: <i>'our upcoming client dinner with NVC Industries this Friday evening'</i>. Bữa tối làm việc với khách hàng. Chọn <b>(C) A client meeting</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 90,
                "text": "Why does the speaker say, \"the advertising business is very competitive\"?",
                "options": {
                    "A": "To explain a decision to retire",
                    "B": "To justify an employee's promotion",
                    "C": "To question the listener's abilities",
                    "D": "To emphasize the importance of a client"
                },
                "explanation": "Người nói nhấn mạnh sự cạnh tranh gay gắt nhằm giải thích tại sao việc giữ chân khách hàng lớn NVC lại quan trọng sống còn: <i>'and keeping NVC satisfied is vital for our agency's quarterly revenue'</i>. Chọn <b>(D) To emphasize the importance of a client</b>.",
                "questionType": "Inference", "subCategory": "Inference"
            },
            {
                "number": 91,
                "text": "What does the speaker say about Isabel?",
                "options": {
                    "A": "She has recently joined the company.",
                    "B": "She was recently promoted.",
                    "C": "She will approve expense reports.",
                    "D": "She used to work on the NVC Industries account."
                },
                "explanation": "Người nói cho biết: <i>'Since she was recently promoted to Senior Account Executive...'</i> (vừa mới được thăng chức). Chọn <b>(B) She was recently promoted</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 8,
        "q_range": (92, 94),
        "graphic": "",
        "transcript": "<p><b>Transcript:</b><br/>\nGood morning, team. Over the past six months, our grocery chain has invested heavily in developing a home grocery delivery app. However, data shows that only fifteen percent of our regular supermarket customers have downloaded and placed orders through the app. Customers seem hesitant because they prefer selecting their own produce in person. To overcome this hurdle, our marketing team plans to upload a series of short demonstration videos to our website and social media channels. The videos will highlight how our personal shoppers carefully inspect and select only the freshest fruits and vegetables for each delivery order.</p>",
        "questions": [
            {
                "number": 92,
                "text": "What type of business does the speaker most likely work for?",
                "options": {
                    "A": "A television studio",
                    "B": "A hardware store",
                    "C": "A publishing company",
                    "D": "A grocery store"
                },
                "explanation": "Người nói nhắc đến: <i>'our grocery chain... supermarket customers... produce... vegetables'</i>. Chuỗi cửa hàng tạp hóa/siêu thị thực phẩm. Chọn <b>(D) A grocery store</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 93,
                "text": "What is the speaker concerned about?",
                "options": {
                    "A": "A business has lost customers.",
                    "B": "Low adoption of a service",
                    "C": "A stockroom is overcrowded.",
                    "D": "A Web site is not working."
                },
                "explanation": "Người nói lo lắng vì khách hàng chưa chịu dùng dịch vụ mới: <i>'only fifteen percent of our regular supermarket customers have downloaded and placed orders through the app'</i>. Chọn <b>(B) Low adoption of a service</b>.",
                "questionType": "Inference", "subCategory": "Inference"
            },
            {
                "number": 94,
                "text": "What does the speaker plan to do?",
                "options": {
                    "A": "Transfer to another location",
                    "B": "Offer discounts online",
                    "C": "Hire more employees",
                    "D": "Add videos to a Web site"
                },
                "explanation": "Người nói công bố kế hoạch: <i>'our marketing team plans to upload a series of short demonstration videos to our website...'</i>. Chọn <b>(D) Add videos to a Web site</b>.",
                "questionType": "Next Action", "subCategory": "Next Action"
            }
        ]
    },
    {
        "set_index": 9,
        "q_range": (95, 97),
        "graphic": f"{CDN_BASE}/p4_g01.jpg",
        "transcript": "<p><b>Transcript:</b><br/>\nHello, Mr. Harris. This is Nadia calling from Crestview Auto Dealership. I've been finalizing the documentation for the pre-owned sedan you purchased yesterday. When you come in to pick up the keys, you'll need to settle the administrative fees listed on your closing sheet. Please note that while most charges can be paid by credit card, the one-hundred-dollar fee must be paid strictly in cash or money order. Once everything is finalized, your official vehicle title will be processed and mailed to your home address within ten days. Don't forget that your purchase includes complimentary car washes at our facility for six months. Just show your customer account barcode to the attendant.</p>",
        "questions": [
            {
                "number": 95,
                "text": "Who most likely is the speaker?",
                "options": {
                    "A": "A car salesperson",
                    "B": "An auto mechanic",
                    "C": "A car rental agent",
                    "D": "A vehicle inspector"
                },
                "explanation": "Người nói gọi từ: <i>'Nadia calling from Crestview Auto Dealership... sedan you purchased yesterday'</i> (đại lý bán xe ô tô). Chọn <b>(A) A car salesperson</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 96,
                "text": "Look at the graphic. Which fee must be paid in cash?",
                "options": {
                    "A": "Filing",
                    "B": "Contract processing",
                    "C": "Vehicle title",
                    "D": "Vehicle registration"
                },
                "explanation": "Người nói lưu ý: <i>'the one-hundred-dollar fee must be paid strictly in cash'</i>. Nhìn vào bảng chi phí (List of Fees), khoản phí đúng $100.00 là <b>Vehicle registration</b>. Do đó chọn <b>(D) Vehicle registration</b>.",
                "questionType": "Graphic", "subCategory": "Graphic"
            },
            {
                "number": 97,
                "text": "What service does the speaker remind the listener about?",
                "options": {
                    "A": "Shuttle service",
                    "B": "Maintenance reminders",
                    "C": "Free car washes",
                    "D": "Replacement keys"
                },
                "explanation": "Người nói nhắc nhở: <i>'Don't forget that your purchase includes complimentary car washes at our facility for six months.'</i> (dịch vụ rửa xe miễn phí). Chọn <b>(C) Free car washes</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            }
        ]
    },
    {
        "set_index": 10,
        "q_range": (98, 100),
        "graphic": f"{CDN_BASE}/p4_g02.jpg",
        "transcript": "<p><b>Transcript:</b><br/>\nWelcome to this morning's staff meeting at Helgen's Music Shop. First, to celebrate our store's tenth anniversary and draw new foot traffic, we'll be hosting a local talent contest in September. I've already confirmed three regional musicians who have agreed to serve as guest judges. Second, take a look at the pie chart from our annual sales report on the screen. While guitars and keyboards continue to generate strong revenue, look at the slice representing twenty units sold. Pianos account for only twenty sales the entire year, yet they occupy nearly forty percent of our display showroom floor. Consequently, management has decided to discontinue stocking acoustic pianos and reallocate that floor space to band instruments and rental gear.</p>",
        "questions": [
            {
                "number": 98,
                "text": "Who most likely is the speaker?",
                "options": {
                    "A": "A jazz singer",
                    "B": "A music teacher",
                    "C": "A shop manager",
                    "D": "A radio host"
                },
                "explanation": "Người nói phát biểu trong cuộc họp nhân viên tại cửa hàng nhạc cụ: <i>'staff meeting at Helgen's Music Shop... management has decided'</i> (quản lý cửa hàng). Chọn <b>(C) A shop manager</b>.",
                "questionType": "Overview", "subCategory": "Overview"
            },
            {
                "number": 99,
                "text": "What event will take place in September?",
                "options": {
                    "A": "A music festival",
                    "B": "A press conference",
                    "C": "A charity dinner",
                    "D": "A talent contest"
                },
                "explanation": "Người nói thông báo: <i>'we'll be hosting a local talent contest in September.'</i> Chọn <b>(D) A talent contest</b>.",
                "questionType": "Detail", "subCategory": "Detail"
            },
            {
                "number": 100,
                "text": "Look at the graphic. Which type of instrument does the speaker focus on?",
                "options": {
                    "A": "Keyboards",
                    "B": "Pianos",
                    "C": "Drums",
                    "D": "Guitars"
                },
                "explanation": "Người nói chỉ vào phần có số lượng 20 chiếc bán ra: <i>'look at the slice representing twenty units sold. Pianos account for only twenty sales the entire year... discontinue stocking acoustic pianos'</i>. Nhìn vào biểu đồ tròn, 20 ứng với Pianos. Chọn <b>(B) Pianos</b>.",
                "questionType": "Graphic", "subCategory": "Graphic"
            }
        ]
    }
]

# Convert part3_sets to JSON format
part3_output = []
for s in part3_sets:
    q_objs = []
    for q in s["questions"]:
        q_num = q["number"]
        q_objs.append({
            "id": f"ets22_t2_p3_{q_num:02d}",
            "number": q_num,
            "text": q["text"],
            "options": q["options"],
            "correctAnswer": p3_answers[q_num],
            "explanation": f"<p>{q['explanation']}</p>",
            "questionType": q["questionType"],
            "subCategory": q["subCategory"]
        })
    part3_output.append({
        "id": f"ets22_t2_p3_s{s['set_index']:02d}",
        "audioUrl": f"{CDN_BASE}/p3_s{s['set_index']:02d}.mp3",
        "image": s["graphic"],
        "context": "",
        "transcript": s["transcript"],
        "questions": q_objs
    })

# Convert part4_sets to JSON format
part4_output = []
for s in part4_sets:
    q_objs = []
    for q in s["questions"]:
        q_num = q["number"]
        q_objs.append({
            "id": f"ets22_t2_p4_{q_num:02d}",
            "number": q_num,
            "text": q["text"],
            "options": q["options"],
            "correctAnswer": p4_answers[q_num],
            "explanation": f"<p>{q['explanation']}</p>",
            "questionType": q["questionType"],
            "subCategory": q["subCategory"]
        })
    part4_output.append({
        "id": f"ets22_t2_p4_s{s['set_index']:02d}",
        "audioUrl": f"{CDN_BASE}/p4_s{s['set_index']:02d}.mp3",
        "image": s["graphic"],
        "context": "",
        "transcript": s["transcript"],
        "questions": q_objs
    })

p3_path = "/Users/bravee06/toeic-learn/public/data/ets2022/test2/part3.json"
p4_path = "/Users/bravee06/toeic-learn/public/data/ets2022/test2/part4.json"

with open(p3_path, "w", encoding="utf-8") as f:
    json.dump(part3_output, f, ensure_ascii=False, indent=2)

with open(p4_path, "w", encoding="utf-8") as f:
    json.dump(part4_output, f, ensure_ascii=False, indent=2)

print(f"Generated Part 3 ({len(part3_output)} sets, 39 questions) at {p3_path}")
print(f"Generated Part 4 ({len(part4_output)} sets, 30 questions) at {p4_path}")
