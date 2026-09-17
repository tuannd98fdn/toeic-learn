import json
import re
import os

CDN_BASE = "https://github.com/tuannd98fdn/toeic-learn/releases/download/ets2022-assets"

# -------------------------------------------------------------
# 1. PART 2 (Q7 - Q31)
# -------------------------------------------------------------
p2_answers = {
    7: 'A', 8: 'C', 9: 'B', 10: 'A', 11: 'C', 12: 'B', 13: 'A', 14: 'C', 15: 'B',
    16: 'A', 17: 'B', 18: 'A', 19: 'B', 20: 'B', 21: 'A', 22: 'C', 23: 'C', 24: 'B',
    25: 'C', 26: 'A', 27: 'A', 28: 'B', 29: 'B', 30: 'B', 31: 'A'
}

# Accurate transcripts & options & explanations verified against official audio
p2_items_data = [
    {
        "number": 7,
        "type": "Who",
        "question": "Who should write the press release?",
        "A": "George can take care of that.",
        "B": "Press the red button.",
        "C": "At the corner newsstand.",
        "explanation": "Câu hỏi bắt đầu bằng <b>Who</b> (Ai nên viết thông cáo báo chí?). Đáp án đúng là <b>(A) George can take care of that</b> (George có thể đảm nhận việc đó). Phương án (B) bẫy lặp từ 'Press' (nhấn nút đỏ) và (C) trả lời cho câu hỏi Where."
    },
    {
        "number": 8,
        "type": "Where",
        "question": "Where is the company's headquarters?",
        "A": "Before we went to work.",
        "B": "His name is Mr. Lee.",
        "C": "In Berlin, Germany.",
        "explanation": "Câu hỏi <b>Where</b> hỏi về vị trí trụ sở công ty. Đáp án đúng là <b>(C) In Berlin, Germany</b> (Ở Berlin, Đức). Phương án (A) chỉ thời gian và (B) chỉ tên người."
    },
    {
        "number": 9,
        "type": "Why",
        "question": "Why are you visiting the clients tomorrow?",
        "A": "After two o'clock.",
        "B": "I need to renew their contract.",
        "C": "The Dubai Airport.",
        "explanation": "Câu hỏi <b>Why</b> hỏi lý do bạn đến thăm khách hàng ngày mai. Đáp án đúng là <b>(B) I need to renew their contract</b> (Tôi cần gia hạn hợp đồng của họ). Phương án (A) chỉ thời gian và (C) chỉ địa điểm."
    },
    {
        "number": 10,
        "type": "Choice",
        "question": "Does Dr. Allen work at the hospital or at a private practice?",
        "A": "At the hospital, I think.",
        "B": "We'll need to practice that.",
        "C": "An annual exam.",
        "explanation": "Câu hỏi lựa chọn 'ở bệnh viện hay phòng khám tư nhân?'. Đáp án đúng là <b>(A) At the hospital, I think</b> (Ở bệnh viện, tôi nghĩ vậy). Phương án (B) bẫy lặp từ 'practice' mang nghĩa luyện tập."
    },
    {
        "number": 11,
        "type": "What",
        "question": "What's the best way for us to get to the conference center?",
        "A": "I haven't heard from her either.",
        "B": "It was a great presentation.",
        "C": "Let's take a look at the train schedule.",
        "explanation": "Câu hỏi phương thức tốt nhất để đến trung tâm hội nghị. Đáp án đúng là <b>(C) Let's take a look at the train schedule</b> (Hãy xem lịch trình tàu hỏa nhé) - gợi ý đi bằng tàu hỏa."
    },
    {
        "number": 12,
        "type": "When",
        "question": "When will the forklift be repaired?",
        "A": "A fork and a knife, please.",
        "B": "Probably next week.",
        "C": "Several pairs.",
        "explanation": "Câu hỏi <b>When</b> khi nào xe nâng hàng được sửa. Đáp án đúng là <b>(B) Probably next week</b> (Có thể vào tuần tới). Phương án (A) bẫy từ đồng âm 'fork' (dĩa và dao ăn)."
    },
    {
        "number": 13,
        "type": "Offer",
        "question": "Would you like me to send you an appointment reminder?",
        "A": "Yes, I'd appreciate that.",
        "B": "The apartment downstairs.",
        "C": "Do you accept credit cards?",
        "explanation": "Lời đề nghị 'Bạn có muốn tôi gửi nhắc nhở cuộc hẹn không?'. Đáp án đúng là <b>(A) Yes, I'd appreciate that</b> (Vâng, tôi rất cảm kích). Phương án (B) bẫy từ phát âm gần giống 'apartment' vs 'appointment'."
    },
    {
        "number": 14,
        "type": "Yes/No",
        "question": "Did you remember to book a photographer for today's museum opening?",
        "A": "Oh, have you read it too?",
        "B": "I'd like to have it framed.",
        "C": "She should have been here by now.",
        "explanation": "Người hỏi nhắc đến việc đặt thợ chụp ảnh. Đáp án đúng là <b>(C) She should have been here by now</b> (Lẽ ra cô ấy phải có mặt ở đây rồi) - hàm ý đã đặt rồi nhưng cô ấy đang đến muộn."
    },
    {
        "number": 15,
        "type": "Why",
        "question": "Why is my computer so slow today?",
        "A": "The printer is down that hall.",
        "B": "Because some updates are being installed.",
        "C": "Next year's computer seminar.",
        "explanation": "Câu hỏi <b>Why</b> tại sao máy tính lại chạy chậm. Đáp án đúng là <b>(B) Because some updates are being installed</b> (Vì một số bản cập nhật đang được cài đặt)."
    },
    {
        "number": 16,
        "type": "Who",
        "question": "Who's going to stock these shelves?",
        "A": "The overnight workers will do it.",
        "B": "No, I haven't gone yet.",
        "C": "To make room for more items.",
        "explanation": "Câu hỏi <b>Who</b> ai sẽ sắp xếp hàng lên các kệ này. Đáp án đúng là <b>(A) The overnight workers will do it</b> (Các nhân viên ca đêm sẽ làm việc đó)."
    },
    {
        "number": 17,
        "type": "How many",
        "question": "How many bottles can these machines produce each hour?",
        "A": "Mainly soft drinks and juices.",
        "B": "I just started working here.",
        "C": "It stays fresh for a long time.",
        "explanation": "Câu hỏi về sản lượng máy móc mỗi giờ. Đáp án đúng là <b>(B) I just started working here</b> (Tôi mới vào làm việc ở đây thôi) - câu trả lời gián tiếp phổ biến trong TOEIC khi người nghe không nắm được số liệu."
    },
    {
        "number": 18,
        "type": "Negative",
        "question": "Aren't these hiking boots supposed to be discounted?",
        "A": "Oh yes, sorry about that.",
        "B": "Let's pose for a picture.",
        "C": "No, we haven't met yet.",
        "explanation": "Người mua thắc mắc đôi ủng leo núi này đáng ra phải được giảm giá chứ. Đáp án đúng là <b>(A) Oh yes, sorry about that</b> (Ồ đúng rồi, xin lỗi quý khách về sơ suất đó) - thừa nhận giá chưa được trừ chiết khấu."
    },
    {
        "number": 19,
        "type": "Yes/No",
        "question": "Do we have enough time to finish this report?",
        "A": "She borrowed your newspaper.",
        "B": "I'll reschedule my next appointment.",
        "C": "It's a beautiful trail.",
        "explanation": "Người hỏi lo lắng không đủ thời gian làm báo cáo. Đáp án đúng là <b>(B) I'll reschedule my next appointment</b> (Tôi sẽ dời lịch hẹn tiếp theo lại) - để dành trọn thời gian hoàn thành báo cáo."
    },
    {
        "number": 20,
        "type": "When",
        "question": "When do you usually start packing for a trip?",
        "A": "A round trip ticket.",
        "B": "About two days in advance.",
        "C": "They delivered the package.",
        "explanation": "Câu hỏi <b>When</b> bạn thường bắt đầu thu xếp hành lý khi nào. Đáp án đúng là <b>(B) About two days in advance</b> (Trước khoảng hai ngày). Phương án (A) bẫy từ 'trip' và (C) bẫy từ 'package'."
    },
    {
        "number": 21,
        "type": "Statement",
        "question": "I'm going to take a walk at lunchtime.",
        "A": "Oh, I'll be visiting clients then.",
        "B": "He took the survey.",
        "C": "A copy of the lunch menu.",
        "explanation": "Câu tuyên bố 'Tôi định đi dạo vào giờ ăn trưa'. Đáp án đúng là <b>(A) Oh, I'll be visiting clients then</b> (Ồ, lúc đó tôi lại bận đi thăm khách hàng rồi) - lời từ chối khéo léo không đi dạo cùng được."
    },
    {
        "number": 22,
        "type": "Request",
        "question": "Can you make sure we have a sign-up sheet available?",
        "A": "I just turned up the heat.",
        "B": "Sign here, please.",
        "C": "Sure, no problem.",
        "explanation": "Lời nhờ vả 'Bạn có thể đảm bảo là chúng ta có sẵn tờ phiếu đăng ký không?'. Đáp án đúng là <b>(C) Sure, no problem</b> (Chắc chắn rồi, không vấn đề gì)."
    },
    {
        "number": 23,
        "type": "Tag Question",
        "question": "They're going to give each of us copies of the press release, aren't they?",
        "A": "No, I don't drink coffee.",
        "B": "I can unlock that for you later.",
        "C": "I'd better remind them about that.",
        "explanation": "Họ sẽ phát cho mỗi chúng ta bản sao thông cáo báo chí phải không? Đáp án đúng là <b>(C) I'd better remind them about that</b> (Tốt hơn là tôi nên nhắc họ việc đó) - ngụ ý có thể họ sẽ quên nếu không nhắc."
    },
    {
        "number": 24,
        "type": "What",
        "question": "What did most people do for a living around here?",
        "A": "About 40 kilometers away.",
        "B": "They work at the car manufacturing plant.",
        "C": "Yes, the living room furniture is new.",
        "explanation": "Hầu hết người dân quanh đây làm nghề gì để kiếm sống? Đáp án đúng là <b>(B) They work at the car manufacturing plant</b> (Họ làm việc ở nhà máy sản xuất ô tô). Phương án (C) bẫy lặp từ 'living room'."
    },
    {
        "number": 25,
        "type": "How",
        "question": "How do you add toner to the printer?",
        "A": "No, it's not made of stone.",
        "B": "Because we ran out.",
        "C": "The instructions are on the box.",
        "explanation": "Làm thế nào để thêm mực vào máy in? Đáp án đúng là <b>(C) The instructions are on the box</b> (Hướng dẫn sử dụng được in ngay trên hộp) - chỉ dẫn cách làm."
    },
    {
        "number": 26,
        "type": "Request",
        "question": "Can you send me a link to that company's website?",
        "A": "Our email is not working right now.",
        "B": "Express delivery, please.",
        "C": "Sure, I'll drive you to the job site.",
        "explanation": "Bạn có thể gửi cho tôi đường dẫn tới trang web công ty đó không? Đáp án đúng là <b>(A) Our email is not working right now</b> (Hệ thống email của chúng ta đang bị lỗi rồi) - giải thích lý do không thể gửi liên kết ngay lúc này."
    },
    {
        "number": 27,
        "type": "Negative",
        "question": "Isn't the air conditioner set to turn off at night?",
        "A": "No, we always keep it on.",
        "B": "He's going to be late today.",
        "C": "Hair products are in aisle 4.",
        "explanation": "Điều hòa không được cài đặt tự tắt vào ban đêm à? Đáp án đúng là <b>(A) No, we always keep it on</b> (Không, chúng tôi luôn bật nó suốt)."
    },
    {
        "number": 28,
        "type": "Statement",
        "question": "Oh, there's no clock in this room.",
        "A": "A six-week training program.",
        "B": "It's about 2:30.",
        "C": "They took an early flight.",
        "explanation": "Ồ, trong phòng này không có đồng hồ. Đáp án đúng là <b>(B) It's about 2:30</b> (Bây giờ khoảng 2 giờ 30) - cung cấp ngay thông tin thời gian mà người nói đang cần."
    },
    {
        "number": 29,
        "type": "Where",
        "question": "Where can I go to have my car engine checked?",
        "A": "No, I don't need one. Thanks, though.",
        "B": "The mechanic around the corner.",
        "C": "In April of every year.",
        "explanation": "Tôi có thể đi đâu để kiểm tra động cơ xe hơi? Đáp án đúng là <b>(B) The mechanic around the corner</b> (Tiệm cơ khí ngay góc phố kia)."
    },
    {
        "number": 30,
        "type": "Choice",
        "question": "To get into the building, do I use an ID badge or a passcode?",
        "A": "A building next door.",
        "B": "Enter 343 on the keypad.",
        "C": "The exit is down the hall.",
        "explanation": "Để vào tòa nhà, tôi dùng thẻ nhân viên hay mật mã? Đáp án đúng là <b>(B) Enter 343 on the keypad</b> (Hãy nhập 343 trên bàn phím số) - lựa chọn phương án dùng mật mã."
    },
    {
        "number": 31,
        "type": "Tag Question",
        "question": "The order can still be changed, right?",
        "A": "That process is very complicated.",
        "B": "I still remember that day, too.",
        "C": "Yes, he does.",
        "explanation": "Đơn hàng vẫn có thể thay đổi được phải không? Đáp án đúng là <b>(A) That process is very complicated</b> (Quy trình đó rất phức tạp đấy) - phản hồi gián tiếp thể hiện việc thay đổi đơn hàng là không dễ dàng."
    }
]

part2_output = []
for item in p2_items_data:
    q_num = item["number"]
    correct = p2_answers[q_num]
    part2_output.append({
        "id": f"ets22_t2_p2_{q_num:02d}",
        "number": q_num,
        "audioUrl": f"{CDN_BASE}/p2_{q_num:02d}.mp3",
        "options": {
            "A": f"(A) {item['A']}",
            "B": f"(B) {item['B']}",
            "C": f"(C) {item['C']}"
        },
        "correctAnswer": correct,
        "transcript": f"<p><b>Transcript:</b><br/><b>{item['question']}</b><br/>(A) {item['A']}<br/>(B) {item['B']}<br/>(C) {item['C']}</p>",
        "explanation": f"<p><b>{item['question']}</b><br/>{item['explanation']}</p>",
        "questionType": item["type"],
        "subCategory": item["type"]
    })

p2_path = "/Users/bravee06/toeic-learn/public/data/ets2022/test2/part2.json"
with open(p2_path, "w", encoding="utf-8") as f:
    json.dump(part2_output, f, ensure_ascii=False, indent=2)

print(f"Generated {len(part2_output)} questions for Part 2 at {p2_path}!")
