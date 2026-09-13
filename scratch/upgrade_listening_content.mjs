import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

// ==========================================
// 1. UPGRADE TEST 1 PART 1
// ==========================================
function upgradeTest1Part1() {
  const filePath = path.join(ROOT_DIR, 'public/data/ets2022/test1/part1.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const updates = [
    {
      number: 1,
      questionType: 'Multiple People',
      subCategory: 'Multiple People',
      explanation: "<p>Trong bức ảnh, các nhân vật đang đeo ba lô trên vai (<i>'carrying backpacks on their shoulders'</i>). Do đó đáp án <b>(D)</b> miêu tả chính xác nhất. Loại (A) vì họ không chào nhau, loại (B) vì không đi bộ cạnh hồ nước, loại (C) vì không tắm nắng trên bãi cỏ.</p>"
    },
    {
      number: 2,
      questionType: 'Object & Scene',
      subCategory: 'Object & Scene',
      explanation: "<p>Bức ảnh chụp máy bay đã hạ cánh và đang đỗ ở sân bay (<i>'The plane has landed at the airport'</i>). Đáp án <b>(C)</b> chính xác. Loại (A) vì không có hành khách đang lên máy bay, loại (B) vì máy bay không đang cất cánh, loại (D) vì bề mặt thân máy bay không bị hư hại.</p>"
    },
    {
      number: 3,
      questionType: 'Object & Scene',
      subCategory: 'Object & Scene',
      explanation: "<p>Bức ảnh chụp nhiều con tàu đang neo đậu tại cầu cảng (<i>'Several ships are docked at a pier'</i>). Do đó đáp án <b>(A)</b> miêu tả đúng nhất. Loại (B) vì không có tàu đi dưới cầu, loại (C) vì không có thủy thủ hạ buồm, loại (D) vì không có tàu ca-nô đang lướt sóng.</p>"
    },
    {
      number: 4,
      questionType: 'Object & Scene',
      subCategory: 'Object & Scene',
      explanation: "<p>Bức ảnh chụp một nhà hàng đang mở cửa phục vụ đón khách (<i>'The restaurant is open for business'</i>). Đáp án <b>(B)</b> đúng. Loại (A) vì không có người phụ nữ nào đang dọn bàn, loại (C) vì không có người ngồi ngoài trời, loại (D) vì ghế vẫn còn nhiều chỗ trống.</p>"
    },
    {
      number: 5,
      questionType: 'Multiple People',
      subCategory: 'Multiple People',
      explanation: "<p>Bức ảnh chụp dòng người đang đi bộ băng qua đường trên vạch kẻ sang đường (<i>'People are crossing the street'</i>). Đáp án <b>(C)</b> miêu tả đúng hành động tập thể. Loại (A) vì không ai đợi xe buýt, loại (B) vì không ai chặn lối vào, loại (D) vì mọi người không xếp hàng dọc.</p>"
    },
    {
      number: 6,
      questionType: 'Object & Scene',
      subCategory: 'Object & Scene',
      explanation: "<p>Bức ảnh chụp một chiếc thuyền đang bồng bềnh/trôi trên mặt nước (<i>'A boat is floating on the water'</i>). Đáp án <b>(B)</b> miêu tả đúng chủ thể tĩnh. Loại (A) vì không có sản phẩm nào trên giá, loại (C) vì không có ai đang chèo thuyền, loại (D) vì không có người đàn ông đội mũ.</p>"
    }
  ];

  data.forEach(q => {
    const u = updates.find(item => item.number === q.number);
    if (u) {
      q.questionType = u.questionType;
      q.subCategory = u.subCategory;
      q.explanation = u.explanation;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Upgraded Test 1 Part 1 (6 questions)');
}

// ==========================================
// 2. UPGRADE TEST 2 PART 1 (ADD TAGS)
// ==========================================
function upgradeTest2Part1() {
  const filePath = path.join(ROOT_DIR, 'public/data/ets2022/test2/part1.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const tags = [
    { number: 1, type: 'Single Person' },
    { number: 2, type: 'Single Person' },
    { number: 3, type: 'Multiple People' },
    { number: 4, type: 'Single Person' },
    { number: 5, type: 'Object & Scene' },
    { number: 6, type: 'Object & Scene' }
  ];

  data.forEach(q => {
    const t = tags.find(item => item.number === q.number);
    if (t) {
      q.questionType = t.type;
      q.subCategory = t.type;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Upgraded Test 2 Part 1 Tags (6 questions)');
}

// ==========================================
// 3. UPGRADE TEST 1 PART 2
// ==========================================
function upgradeTest1Part2() {
  const filePath = path.join(ROOT_DIR, 'public/data/ets2022/test1/part2.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const updates = [
    {
      number: 7,
      questionType: 'Request',
      subCategory: 'Request',
      explanation: "<p><b>Can you pack the shipment to Toronto now?</b> (Bạn có thể đóng gói lô hàng đi Toronto bây giờ không?)<br/>Đáp án đúng là <b>(B) Of course, just a minute.</b> (Dĩ nhiên rồi, chờ tôi một lát nhé) - thể hiện sự đồng ý lời yêu cầu. Loại (A) 'Đĩa dễ vỡ' và (C) 'Tôi cần nó sớm' không trả lời trực tiếp lời yêu cầu đóng gói.</p>"
    },
    {
      number: 8,
      questionType: 'Where',
      subCategory: 'Where',
      explanation: "<p><b>Where should I put the new laboratory equipment?</b> (Tôi nên đặt thiết bị thí nghiệm mới ở đâu?)<br/>Đáp án đúng là <b>(B) I'll ask the professor.</b> (Tôi sẽ hỏi giáo sư) - câu trả lời gián tiếp thường gặp trong TOEIC khi người được hỏi không biết câu trả lời chính xác. Loại (A) và (C) không liên quan nơi chốn.</p>"
    },
    {
      number: 9,
      questionType: 'Yes/No',
      subCategory: 'Yes/No',
      explanation: "<p><b>Has the plumber stopped the leak in the upstairs restroom?</b> (Thợ sửa ống nước đã xử lý xong chỗ rò rỉ ở nhà vệ sinh tầng trên chưa?)<br/>Đáp án đúng là <b>(A) Yes, it's working fine now.</b> (Rồi, bây giờ nó hoạt động tốt rồi). Bẫy từ liên tưởng ở (B) 'downstairs' đối lập với 'upstairs' trong câu hỏi.</p>"
    },
    {
      number: 10,
      questionType: 'When',
      subCategory: 'When',
      explanation: "<p><b>When do you want to leave for the concert hall?</b> (Khi nào bạn muốn xuất phát đến phòng hòa nhạc?)<br/>Câu hỏi bắt đầu bằng <b>When</b> (Khi nào), đáp án chỉ thời gian là <b>(A) How about an hour from now?</b> (Khoảng 1 tiếng nữa nhé?). Bẫy ở (B) 'At the Montgomery Theater' là đáp án cho câu hỏi Where (nơi chốn).</p>"
    },
    {
      number: 11,
      questionType: 'Choice',
      subCategory: 'Choice',
      explanation: "<p><b>Is gas also included in the monthly rent, or just electricity?</b> (Tiền thuê hàng tháng đã bao gồm tiền gas hay chỉ có tiền điện?)<br/>Đây là câu hỏi lựa chọn (A or B). Đáp án <b>(C) It covers all utilities.</b> (Nó bao gồm tất cả các tiện ích/điện nước) trả lời bao quát cho cả hai lựa chọn. Loại (A) chỉ mốc thời gian, (B) hỏi ngược giá thuê.</p>"
    },
    {
      number: 12,
      questionType: 'Where',
      subCategory: 'Where',
      explanation: "<p><b>Where is the section for your imported goods?</b> (Khu vực bán hàng nhập khẩu của bạn ở đâu?)<br/>Đáp án đúng là <b>(C) Right this way.</b> (Mời đi lối này) - câu chỉ dẫn đường đi trực quan. Cảnh giác bẫy phát âm tương đồng ở (B) 'important' nghe giống 'imported', và (A) 'From India' trả lời cho câu hỏi xuất xứ.</p>"
    },
    {
      number: 13,
      questionType: 'Tag Question',
      subCategory: 'Tag Question',
      explanation: "<p><b>I can pay the deposit by check, can't I?</b> (Tôi có thể đặt cọc bằng séc được không?)<br/>Đáp án <b>(B) People do it all the time.</b> (Mọi người vẫn thường làm như vậy) mang nghĩa xác nhận việc trả bằng séc hoàn toàn được chấp nhận. Bẫy lặp từ 'check' ở (A) 'I'll pay the check' (tính tiền hóa đơn nhà hàng).</p>"
    },
    {
      number: 14,
      questionType: 'When',
      subCategory: 'When',
      explanation: "<p><b>What time do you catch the bus in the morning?</b> (Buổi sáng bạn bắt xe buýt lúc mấy giờ?)<br/>Câu hỏi <b>What time</b> (mấy giờ). Đáp án chỉ khung giờ là <b>(B) Between seven and seven fifteen.</b> (Trong khoảng 7 giờ đến 7 giờ 15). Loại (A) nói về ngày trong tuần, (C) chỉ tuyến xe đi về trung tâm.</p>"
    },
    {
      number: 15,
      questionType: 'Yes/No',
      subCategory: 'Yes/No',
      explanation: "<p><b>Is your restaurant able to accommodate large groups?</b> (Nhà hàng của bạn có đủ chỗ phục vụ các đoàn khách lớn không?)<br/>Đáp án đúng là <b>(C) How large is your party?</b> (Đoàn của bạn có bao nhiêu người?) - người nói hỏi lại số lượng để xác nhận sức chứa. Bẫy cùng gốc từ ở (B) 'accommodations' (chỗ ở khách sạn).</p>"
    },
    {
      number: 16,
      questionType: 'Statement',
      subCategory: 'Statement',
      explanation: "<p><b>The lead singer gave an amazing performance.</b> (Ca sĩ chính đã có một màn trình diễn thật tuyệt vời.)<br/>Đây là câu trần thuật đưa ra lời khen. Đáp án <b>(A) She really did, didn't she?</b> (Cô ấy hát tuyệt thật đấy nhỉ?) thể hiện sự đồng tình cao. Bẫy lặp từ 'performance' ở (B) với nghĩa 'hiệu năng động cơ máy móc'.</p>"
    },
    {
      number: 17,
      questionType: 'Tag Question',
      subCategory: 'Tag Question',
      explanation: "<p><b>The economic analyst finished the report, didn't he?</b> (Chuyên viên phân tích kinh tế đã hoàn thành bản báo cáo rồi phải không?)<br/>Đáp án đúng là <b>(B) I'd have to ask him.</b> (Tôi sẽ phải hỏi anh ấy) - câu trả lời gián tiếp khi chưa có thông tin xác thực. Bẫy đa nghĩa ở (A) 'smooth finish' (lớp phủ mịn bề mặt).</p>"
    },
    {
      number: 18,
      questionType: 'Choice',
      subCategory: 'Choice',
      explanation: "<p><b>Which frame would you prefer, wooden or metal?</b> (Bạn thích khung gỗ hay khung kim loại hơn?)<br/>Câu hỏi lựa chọn 'wooden or metal'. Đáp án đúng là <b>(C) Do you carry plastic ones?</b> (Cửa hàng có bán loại khung nhựa không?) - người hỏi đưa ra một phương án thứ ba thay thế.</p>"
    },
    {
      number: 19,
      questionType: 'Why',
      subCategory: 'Why',
      explanation: "<p><b>Why don't you get an estimate for the repair costs?</b> (Sao bạn không xin một bản ước tính chi phí sửa chữa?)<br/>Cấu trúc 'Why don't you...' dùng để đưa ra lời gợi ý. Đáp án <b>(B) I've already called the mechanic.</b> (Tôi đã gọi cho thợ cơ khí rồi) giải thích rằng hành động đã được thực hiện.</p>"
    },
    {
      number: 20,
      questionType: 'How',
      subCategory: 'How',
      explanation: "<p><b>How will you get to the staff picnic?</b> (Bạn sẽ đến buổi dã ngoại của nhân viên bằng cách nào?)<br/>Câu hỏi phương tiện/cách thức đi lại <b>How</b>. Đáp án đúng là <b>(C) I'll take my car.</b> (Tôi sẽ tự lái xe của mình đi). Loại (A) vì trả lời mốc giờ, (B) là địa điểm dã ngoại.</p>"
    },
    {
      number: 21,
      questionType: 'Yes/No',
      subCategory: 'Yes/No',
      explanation: "<p><b>Isn't admission free at this museum?</b> (Vé vào cửa bảo tàng này miễn phí phải không?)<br/>Đáp án đúng là <b>(C) No. There's a small charge.</b> (Không, có một khoản phí nhỏ) - đính chính lại thông tin vé vào cửa. Bẫy cùng gốc từ ở (B) 'admitted' (thừa nhận).</p>"
    },
    {
      number: 22,
      questionType: 'Statement',
      subCategory: 'Statement',
      explanation: "<p><b>I'll help you carry your luggage to your room.</b> (Tôi sẽ giúp bạn mang hành lý lên phòng nhé.)<br/>Người nói đưa ra lời đề nghị giúp đỡ. Đáp án đúng là <b>(A) I'd really appreciate that.</b> (Thế thì tôi rất cảm kích/biết ơn) - lời đáp lại sự giúp đỡ tiêu chuẩn trong giao tiếp.</p>"
    },
    {
      number: 23,
      questionType: 'Why',
      subCategory: 'Why',
      explanation: "<p><b>Why did you run out of notepads so quickly?</b> (Tại sao bạn lại dùng hết sổ ghi chép nhanh thế?)<br/>Câu hỏi lý do <b>Why</b>. Đáp án <b>(C) I used a lot for my recent proposal.</b> (Tôi đã dùng rất nhiều cho bản đề xuất gần đây) giải thích trực tiếp nguyên nhân sử dụng nhiều.</p>"
    },
    {
      number: 24,
      questionType: 'Statement',
      subCategory: 'Statement',
      explanation: "<p><b>Three microphones have been set up on the main stage.</b> (Ba chiếc micro đã được lắp đặt trên sân khấu chính rồi.)<br/>Đáp án đúng là <b>(B) That should be enough.</b> (Số lượng như thế chắc là đủ rồi đấy) - nhận xét về số lượng đã chuẩn bị. Cảnh giác bẫy âm thanh tương đồng ở (C) 'microscopes' (kính hiển vi).</p>"
    },
    {
      number: 25,
      questionType: 'Who',
      subCategory: 'Who',
      explanation: "<p><b>Who attended the convention last year?</b> (Ai đã tham dự hội nghị vào năm ngoái?)<br/>Câu hỏi chỉ đối tượng người <b>Who</b>. Đáp án <b>(C) Mostly young job seekers.</b> (Phần lớn là các ứng viên tìm việc trẻ tuổi) chỉ nhóm người tham dự. Loại (B) vì là địa điểm tổ chức hội nghị.</p>"
    },
    {
      number: 26,
      questionType: 'Statement',
      subCategory: 'Statement',
      explanation: "<p><b>Let's assign the resume screening to Tim instead of Stacey.</b> (Chúng ta hãy giao việc sàng lọc hồ sơ ứng viên cho Tim thay vì Stacey đi.)<br/>Đáp án đúng là <b>(B) He might be too busy.</b> (Anh ấy có thể đang bận quá đấy) - phản hồi e ngại về tính khả thi của đề xuất. Bẫy ở (C) 'flat-screen' (màn hình phẳng) do nghe giống 'resume screening'.</p>"
    },
    {
      number: 27,
      questionType: 'Yes/No',
      subCategory: 'Yes/No',
      explanation: "<p><b>Do you have any furnished studio apartments in this neighborhood?</b> (Khu vực này bạn có căn hộ studio nào có sẵn nội thất không?)<br/>Đáp án đúng là <b>(A) I'll have to check our database.</b> (Tôi sẽ phải kiểm tra cơ sở dữ liệu của chúng tôi đã) - câu trả lời trì hoãn để tra cứu thông tin. Bẫy cùng gốc từ ở (B) 'furniture' (đồ nội thất).</p>"
    },
    {
      number: 28,
      questionType: 'Statement',
      subCategory: 'Statement',
      explanation: "<p><b>There's an exhibit of 19th-century paintings at the Hanover Gallery.</b> (Đang có buổi triển lãm tranh thế kỷ 19 ở phòng trưng bày Hanover đấy.)<br/>Đáp án <b>(C) I saw a commercial for it yesterday.</b> (Hôm qua tôi vừa xem một đoạn quảng cáo về nó xong) tiếp nối chủ đề về buổi triển lãm. Bẫy lặp từ ở (A) 'paint' (vẽ).</p>"
    },
    {
      number: 29,
      questionType: 'When',
      subCategory: 'When',
      explanation: "<p><b>When will we arrange the display for the new air purifier?</b> (Khi nào chúng ta sẽ bố trí quầy trưng bày máy lọc không khí mới?)<br/>Câu hỏi <b>When</b> (khi nào). Đáp án chỉ mốc thời điểm điều kiện là <b>(C) As soon as the brochures arrive.</b> (Ngay sau khi tập tài liệu giới thiệu được chuyển tới). Bẫy lặp từ ở (A) 'arrangement'.</p>"
    },
    {
      number: 30,
      questionType: 'Tag Question',
      subCategory: 'Tag Question',
      explanation: "<p><b>Investing in mining companies is risky, isn't it?</b> (Đầu tư vào các công ty khai thác mỏ khá rủi ro đúng không?)<br/>Câu hỏi đuôi xác nhận tính rủi ro. Đáp án <b>(C) My stock broker believes it is.</b> (Người môi giới chứng khoán của tôi cũng tin là như vậy) xác nhận rủi ro qua ý kiến chuyên gia. Bẫy lặp từ ở (A) 'investor'.</p>"
    },
    {
      number: 31,
      questionType: 'Who',
      subCategory: 'Who',
      explanation: "<p><b>Who will inspect the machinery on the production floor?</b> (Ai sẽ kiểm tra máy móc tại phân xưởng sản xuất?)<br/>Câu hỏi <b>Who</b> (ai chịu trách nhiệm). Đáp án <b>(B) They're still deciding.</b> (Họ vẫn đang bàn bạc quyết định) - dạng câu trả lời không cung cấp tên cụ thể nhưng trả lời trực tiếp trạng thái nhân sự. Bẫy lặp từ ở (A) 'floor'.</p>"
    }
  ];

  data.forEach(q => {
    const u = updates.find(item => item.number === q.number);
    if (u) {
      q.questionType = u.questionType;
      q.subCategory = u.subCategory;
      q.explanation = u.explanation;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Upgraded Test 1 Part 2 (25 questions)');
}

// ==========================================
// 4. UPGRADE TEST 2 PART 2 (ADD TAGS)
// ==========================================
function upgradeTest2Part2() {
  const filePath = path.join(ROOT_DIR, 'public/data/ets2022/test2/part2.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const tags = [
    { number: 7, type: 'When' },
    { number: 8, type: 'Where' },
    { number: 9, type: 'Who' },
    { number: 10, type: 'Why' },
    { number: 11, type: 'How' },
    { number: 12, type: 'Yes/No' },
    { number: 13, type: 'Choice' },
    { number: 14, type: 'Request' },
    { number: 15, type: 'Statement' },
    { number: 16, type: 'When' },
    { number: 17, type: 'Where' },
    { number: 18, type: 'Yes/No' },
    { number: 19, type: 'Why' },
    { number: 20, type: 'How' },
    { number: 21, type: 'Tag Question' },
    { number: 22, type: 'Who' },
    { number: 23, type: 'Statement' },
    { number: 24, type: 'Statement' },
    { number: 25, type: 'Choice' },
    { number: 26, type: 'Yes/No' },
    { number: 27, type: 'Statement' },
    { number: 28, type: 'Statement' },
    { number: 29, type: 'Offer' },
    { number: 30, type: 'Choice' },
    { number: 31, type: 'Statement' }
  ];

  data.forEach(q => {
    const t = tags.find(item => item.number === q.number);
    if (t) {
      q.questionType = t.type;
      q.subCategory = t.type;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Upgraded Test 2 Part 2 Tags (25 questions)');
}

// ==========================================
// 5. UPGRADE TEST 1 PART 3
// ==========================================
function upgradeTest1Part3() {
  const filePath = path.join(ROOT_DIR, 'public/data/ets2022/test1/part3.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const qMap = {
    // Set 1
    32: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người phụ nữ mở đầu cuộc đối thoại: <i>'Do you know where the budget file is? I can't find it.'</i> => Cô ấy đang tìm tệp tài liệu ngân sách (<b>A file</b>). Do đó chọn <b>(B)</b>.</p>"
    },
    33: {
      questionType: 'Inference',
      subCategory: 'Inference',
      explanation: "<p>Người phụ nữ nói về Patrick: <i>'Patrick's out of town right now, and I am sure he doesn't have it.'</i> Trong ngữ cảnh công sở, cụm <i>'out of town'</i> đồng nghĩa với đi công tác (<b>On a business trip</b>). Chọn <b>(D)</b>.</p>"
    },
    34: {
      questionType: 'Next Action',
      subCategory: 'Next Action',
      explanation: "<p>Người đàn ông kết thúc bằng câu: <i>'Well, I'll check once more, but I'll probably be giving you the same answer.'</i> => Anh ấy sẽ kiểm tra lại văn phòng của mình lần nữa. Do đó chọn <b>(A) Check his office</b>.</p>"
    },
    // Set 2
    35: {
      questionType: 'Topic / Main Idea',
      subCategory: 'Topic / Main Idea',
      explanation: "<p>Người phụ nữ nhắc đến: <i>'Look at all the robotics we are using on the manufacturing assembly line.'</i> (dây chuyền lắp ráp chế tạo) và người đàn ông nhắc tới <i>'factories'</i> => Cuộc trò chuyện diễn ra tại nhà máy sản xuất (<b>In a manufacturing plant</b>). Chọn <b>(D)</b>.</p>"
    },
    36: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người đàn ông bày tỏ ấn tượng: <i>'It's really impressive. You know, factories rarely use such high-quality devices these days.'</i> => Máy móc thiết bị có chất lượng rất cao (<b>The equipment is of high quality</b>). Chọn <b>(A)</b>.</p>"
    },
    37: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người phụ nữ hỏi: <i>'The system we're currently using needs to be upgraded. How much would it cost to do business with your company?'</i> => Cô ấy băn khoăn về chi phí nâng cấp hệ thống (<b>The cost of a system upgrade</b>). Chọn <b>(A)</b>.</p>"
    },
    // Set 3
    38: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người đàn ông nói: <i>'He sounded pretty upset about not receiving any design blueprints yet.'</i> => Ông Ransh khó chịu vì chưa nhận được tài liệu bản vẽ thiết kế (<b>He did not receive a document</b>). Chọn <b>(A)</b>.</p>"
    },
    39: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người phụ nữ nói: <i>'I sent him a blueprint by e-mail last week!'</i> => Cô ấy đã gửi email cho ông Ransh tuần trước. Chọn <b>(C) She sent an e-mail to Mr. Ransh</b>.</p>"
    },
    40: {
      questionType: 'Next Action',
      subCategory: 'Next Action',
      explanation: "<p>Người phụ nữ quyết định: <i>'Well, I should send him a blueprint again right away anyway.'</i> => Cô ấy sẽ gửi lại tài liệu bản vẽ ngay lập tức (<b>Send a document</b>). Chọn <b>(B)</b>.</p>"
    },
    // Set 4
    41: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Janice nói: <i>'My friends and I stayed at a cozy hotel in Athens for three weeks.'</i> => Cô ấy ở tại một khách sạn ấm cúng (<b>In a hotel</b>). Chọn <b>(A)</b>.</p>"
    },
    42: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người đàn ông chia sẻ: <i>'Oh, I remember last year when I visited Athens for business.'</i> => Anh ấy đến Athens vì chuyến công tác (<b>For a business trip</b>). Chọn <b>(C)</b>.</p>"
    },
    43: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Janice nói: <i>'We mostly spent our time walking, lying, and resting on the beach near the hotel.'</i> => Phần lớn thời gian cô ấy thư giãn trên bãi biển (<b>Relaxing on the beach</b>). Chọn <b>(B)</b>.</p>"
    },
    // Set 5
    44: {
      questionType: 'Topic / Main Idea',
      subCategory: 'Topic / Main Idea',
      explanation: "<p>Người phụ nữ hỏi: <i>'Everyone's here now. Is dinner ready to be served?'</i> và người đàn ông nhắc đến việc đặt đồ ăn với bên dịch vụ ăn uống (caterer) => Họ đang nói về bữa tối chiêu đãi khách (<b>A dinner for guests</b>). Chọn <b>(B)</b>.</p>"
    },
    45: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người đàn ông nói: <i>'...he thought the food was to be ready by 8 o'clock.'</i> => Thức ăn sẽ được phục vụ vào lúc 8 giờ (<b>Food will be served</b>). Chọn <b>(C)</b>.</p>"
    },
    46: {
      questionType: 'Next Action',
      subCategory: 'Next Action',
      explanation: "<p>Người phụ nữ kết luận: <i>'Oh well, I guess we'll have to change our plans and watch the presentation first.'</i> => Họ sẽ điều chỉnh kế hoạch để xem bài thuyết trình trước (<b>They will do the presentation</b>). Chọn <b>(A)</b>.</p>"
    },
    // Set 6
    47: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người phụ nữ mở đầu: <i>'The documents that I was planning to use at the presentation are missing.'</i> => Cô ấy lo lắng vì không tìm thấy tài liệu thuyết trình (<b>She cannot find her documents</b>). Chọn <b>(B)</b>.</p>"
    },
    48: {
      questionType: 'Request',
      subCategory: 'Request',
      explanation: "<p>Người phụ nữ đề nghị: <i>'Will you go first and get the conference room ready for the meeting?'</i> => Đề nghị người đàn ông đi chuẩn bị phòng họp (<b>Prepare for the meeting</b>). Chọn <b>(C)</b>.</p>"
    },
    49: {
      questionType: 'Next Action',
      subCategory: 'Next Action',
      explanation: "<p>Người phụ nữ nói: <i>'Let me just go back to my office and make some copies.'</i> => Cô ấy sẽ quay trở lại văn phòng làm việc để in sao tài liệu (<b>To her office</b>). Chọn <b>(C)</b>.</p>"
    },
    // Set 7
    50: {
      questionType: 'Inference',
      subCategory: 'Inference',
      explanation: "<p>Sau khi cô Landers nói cô ứng tuyển vào vị trí bán hàng sau khi thấy quảng cáo trên báo, ông Carper nhận xét: <i>'Well, you sure made a great choice there.'</i> kèm lời đề nghị tuyển dụng trước đó <i>'I am willing to offer you a position as a sales representative'</i> => Ông ấy đã quyết định tuyển cô vào vị trí nhân viên kinh doanh (<b>He decided to hire the woman as a salesperson</b>). Chọn <b>(B)</b>.</p>"
    },
    51: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người đàn ông nói: <i>'Now I'll introduce you to Ms. Clarkson in the Personnel Department for some papers you need to fill out.'</i> => Đến phòng nhân sự để điền giấy tờ thủ tục nhận việc (<b>To fill out some papers</b>). Chọn <b>(D)</b>.</p>"
    },
    52: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Khi được hỏi khi nào có thể bắt đầu làm việc, cô Landers trả lời: <i>'I'll be ready in about two weeks.'</i> => Cô sẽ bắt đầu trong khoảng 2 tuần nữa (<b>In two weeks</b>). Chọn <b>(D)</b>.</p>"
    },
    // Set 8
    53: {
      questionType: 'Inference',
      subCategory: 'Inference',
      explanation: "<p>Các nhân vật nhắc lại: <i>'...our 15th reunion'</i> và <i>'I can't believe it's already been 15 years since we graduated.'</i> và nói về giải cờ vua thời sinh viên (<i>'student chess tournament... in my college life'</i>) => Họ là bạn học cùng tốt nghiệp từ một trường đại học (<b>They graduated from the same university</b>). Chọn <b>(A)</b>.</p>"
    },
    54: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người nói nhắc: <i>'I can't believe it's already been 15 years since we graduated.'</i> => Đã 15 năm trôi qua kể từ khi họ ở khuôn viên này (<b>Fifteen</b>). Chọn <b>(C)</b>.</p>"
    },
    55: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người phụ nữ nói về kỷ niệm đoạt giải nhất cờ vua: <i>'How can I forget that? It was one of the best moments in my college life.'</i> (Làm sao tôi quên được, đó là khoảnh khắc tuyệt nhất thời đại học) => Đoạt giải thưởng (<b>Winning a prize</b>). Chọn <b>(C)</b>.</p>"
    },
    // Set 9
    56: {
      questionType: 'Speaker / Listener',
      subCategory: 'Speaker / Listener',
      explanation: "<p>Người đàn ông nói: <i>'...the refreshments for the workshop you're holding next Friday.'</i> (hội thảo cô tổ chức vào thứ Sáu tới) => Người phụ nữ là người tổ chức hội thảo (<b>A workshop organizer</b>). Chọn <b>(C)</b>.</p>"
    },
    57: {
      questionType: 'Inference',
      subCategory: 'Inference',
      explanation: "<p>Khi người đàn ông hỏi có chút thời gian để nói chuyện không, cô gái đáp: <i>'I have a weekly meeting soon, but go ahead.'</i> ngụ ý cô sắp phải họp nên không thể nói chuyện lâu được (<b>She cannot talk with the man for long</b>). Chọn <b>(A)</b>.</p>"
    },
    58: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Kimmy nói thêm ở cuối: <i>'Oh, I want one more thing. Let's add some fruit to the lunch menu.'</i> => Cô muốn thêm món trái cây vào thực đơn bữa trưa (<b>Additional food items</b>). Chọn <b>(B)</b>.</p>"
    },
    // Set 10
    59: {
      questionType: 'Topic / Main Idea',
      subCategory: 'Topic / Main Idea',
      explanation: "<p>Người phụ nữ mở đầu: <i>'Mr. Heath, I want to talk about scheduling interviews for the web-design position.'</i> (sắp xếp lịch phỏng vấn) => Cuộc thảo luận về việc sắp xếp lịch trình (<b>Making schedules</b>). Chọn <b>(B)</b>.</p>"
    },
    60: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người đàn ông đề xuất: <i>'Well, what about doing the interviews on Thursday before I leave?'</i> và người phụ nữ đồng ý => Các buổi phỏng vấn tuyển dụng sẽ diễn ra vào thứ Năm (<b>Job interviews will take place</b>). Chọn <b>(A)</b>.</p>"
    },
    61: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người đàn ông nói: <i>'The clients are starting to complain about the old designs of our website.'</i> => Khách hàng đang phàn nàn về thiết kế trang web (<b>A website</b>). Chọn <b>(A)</b>.</p>"
    },
    // Set 11
    62: {
      questionType: 'Speaker / Listener',
      subCategory: 'Speaker / Listener',
      explanation: "<p>Người phụ nữ nói: <i>'I guess they didn't know how much our sales department's grown.'</i> (bộ phận kinh doanh của chúng ta phát triển nhanh thế nào) => Những người tham gia cuộc họp ngày mai là nhân viên phòng kinh doanh (<b>A sales department</b>). Chọn <b>(D)</b>.</p>"
    },
    63: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người đàn ông nói về cuộc họp tháng trước ở nhà hàng Ý: <i>'I was disappointed with the tiny room they gave us last month.'</i> (Tôi thất vọng với căn phòng nhỏ xíu mà họ xếp cho chúng ta) => Phòng quá nhỏ (<b>The room was small</b>). Chọn <b>(C)</b>.</p>"
    },
    64: {
      questionType: 'Graphic / Map',
      subCategory: 'Graphic / Map',
      explanation: "<p>Người phụ nữ cho biết: <i>'The Royal Hotel didn't have any private rooms available, so we reserved a space at the Chinese restaurant near the city hall.'</i> (nhà hàng Trung Hoa gần tòa thị chính) => Đối chiếu sơ đồ, nhà hàng Trung Hoa là Pecking. Chọn <b>(B) Pecking</b>.</p>"
    },
    // Set 12
    65: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người phụ nữ nói: <i>'Frank, did you order some clothes? I just received this box from Macy's...'</i> => Cô ấy vừa nhận được một kiện hàng chứa quần áo (<b>She received some clothes</b>). Chọn <b>(D)</b>.</p>"
    },
    66: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Frank giải thích: <i>'I needed some suits and neckties to wear for my presentations and banquet next week.'</i> => Anh ấy cần vest và cà vạt cho buổi thuyết trình (<b>A presentation</b>). Chọn <b>(D)</b>.</p>"
    },
    67: {
      questionType: 'Graphic / Map',
      subCategory: 'Graphic / Map',
      explanation: "<p>Người phụ nữ giải thích: <i>'...since you put the department in the order instead of your own name.'</i> và người đàn ông xác nhận: <i>'I won't forget to put my name next time.'</i> => Anh ấy đã quên ghi tên mình vào đơn hàng (<b>Include his name</b>). Chọn <b>(A)</b>.</p>"
    },
    // Set 13
    68: {
      questionType: 'Topic / Main Idea',
      subCategory: 'Topic / Main Idea',
      explanation: "<p>Người đàn ông nói: <i>'I'm looking for healthy foods... How about this canned chicken soup?'</i> và người phụ nữ khuyên mua rau củ quả tươi => Họ đang đi mua sắm thực phẩm tại cửa hàng bách hóa/siêu thị (<b>In a grocery store</b>). Chọn <b>(C)</b>.</p>"
    },
    69: {
      questionType: 'Graphic / Map',
      subCategory: 'Graphic / Map',
      explanation: "<p>Người phụ nữ cảnh báo về hộp súp gà: <i>'Oh, no! That's almost 2 grams.'</i> Đối chiếu bảng thành phần dinh dưỡng, thành phần có hàm lượng gần 2 grams (1800mg - 2000mg) là Natri/Muối (<b>Sodium</b>). Chọn <b>(C)</b>.</p>"
    },
    70: {
      questionType: 'Recommendation',
      subCategory: 'Recommendation',
      explanation: "<p>Người phụ nữ khuyên: <i>'Why don't you buy some fresh fruits and vegetables?'</i> => Cô ấy gợi ý người đàn ông nên mua mặt hàng khác có lợi cho sức khỏe hơn (<b>Purchase a different item</b>). Chọn <b>(D)</b>.</p>"
    }
  };

  data.forEach(set => {
    set.questions.forEach(q => {
      const u = qMap[q.number];
      if (u) {
        q.questionType = u.questionType;
        q.subCategory = u.subCategory;
        q.explanation = u.explanation;
      }
    });
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Upgraded Test 1 Part 3 (39 questions)');
}

// ==========================================
// 6. UPGRADE TEST 1 PART 4
// ==========================================
function upgradeTest1Part4() {
  const filePath = path.join(ROOT_DIR, 'public/data/ets2022/test1/part4.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const qMap = {
    // Set 1
    71: {
      questionType: 'Speaker / Listener',
      subCategory: 'Speaker / Listener',
      explanation: "<p>Người nói tự giới thiệu: <i>'Welcome to Language Today on KXRP Radio. I'm Ted Costello, and I'll be your host this hour.'</i> => Ted Costello là người dẫn chương trình radio (<b>A radio host</b>). Chọn <b>(C)</b>.</p>"
    },
    72: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người dẫn giới thiệu: <i>'...interviewing language specialist Dr. Eric Alfson...'</i> => Tiến sĩ Alfson là chuyên gia chuyên nghiên cứu về ngôn ngữ (<b>The study of language</b>). Chọn <b>(D)</b>.</p>"
    },
    73: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người dẫn nhắc đến mốc thời gian: <i>'...even before his new book hits stores on August 4.'</i> (trước khi cuốn sách mới lên kệ vào ngày 4/8) => Cuốn sách mới của Tiến sĩ Alfson sẽ được phát hành (<b>Dr. Alfson's new book will be available</b>). Chọn <b>(A)</b>.</p>"
    },
    // Set 2
    74: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người thông báo giải thích: <i>'Tonight's performance of La Traviata will begin at 7:20 P.M. instead of 7:00 P.M. as some of our singers arrived at the theater late because of the icy roads.'</i> => Buổi diễn bị hoãn do một số ca sĩ đến muộn (<b>Some late arrivals</b>). Chọn <b>(B)</b>.</p>"
    },
    75: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người nói hướng dẫn: <i>'...please visit the table near the main entrance, where our staff is selling professionally produced copies of the soundtrack from the performance.'</i> => Bán đĩa nhạc/bản ghi âm buổi biểu diễn (<b>Purchase musical recordings</b>). Chọn <b>(D)</b>.</p>"
    },
    76: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người nói cho biết: <i>'On the back of your programs you will find details of our theater's membership program...'</i> => Mặt sau tờ rơi giới thiệu chi tiết về chương trình hội viên (<b>Information about becoming a member</b>). Chọn <b>(D)</b>.</p>"
    },
    // Set 3
    77: {
      questionType: 'Speaker / Listener',
      subCategory: 'Speaker / Listener',
      explanation: "<p>Người nói mở đầu: <i>'...to offer our sincere appreciation to Dr. Darren Heinz, who was the top donor to the Bright Future Research Foundation.'</i> => Tiến sĩ Darren Heinz là nhà hảo tâm/nhà tài trợ hàng đầu (<b>A donor</b>). Chọn <b>(D)</b>.</p>"
    },
    78: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người nói giải thích mục đích tiền tài trợ: <i>'...this money will allow the development of new initiatives to better assist disadvantaged children and teenagers.'</i> Cụm từ <i>'disadvantaged children and teenagers'</i> được diễn đạt lại (paraphrase) thành <i>'needy youth'</i> (thanh thiếu niên có hoàn cảnh khó khăn). Chọn <b>(A) To give assistance to needy youth</b>.</p>"
    },
    79: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người nói thông báo: <i>'We hope all of you will be able to attend a celebratory dinner to honor Dr. Heinz and our other supporters at the Eagle Club on November 12.'</i> => Một bữa tiệc tối đặc biệt sẽ được tổ chức vào ngày 12/11 (<b>A special dinner will be held</b>). Chọn <b>(B)</b>.</p>"
    },
    // Set 4
    80: {
      questionType: 'Speaker / Listener',
      subCategory: 'Speaker / Listener',
      explanation: "<p>Người gọi giới thiệu: <i>'This is Deidre Elliot calling with a message for the general manager.'</i> => Người gọi để lại tin nhắn cho tổng quản lý cửa hàng (<b>A store manager</b>). Chọn <b>(B)</b>.</p>"
    },
    81: {
      questionType: 'Purpose',
      subCategory: 'Purpose',
      explanation: "<p>Bà Elliot giải thích lý do gọi: <i>'...I wanted to tell you how pleased I was with your delivery person, Ivan Podolski. He arrived as scheduled and set up the dryer quickly.'</i> => Bà muốn khen ngợi sự tận tình của nhân viên giao hàng (<b>She wants to praise a staff member</b>). Chọn <b>(D)</b>.</p>"
    },
    82: {
      questionType: 'Next Action',
      subCategory: 'Next Action',
      explanation: "<p>Bà Elliot khẳng định: <i>'I will certainly be recommending you to my friends and will return myself for future purchases.'</i> => Bà sẽ giới thiệu cửa hàng cho bạn bè của mình (<b>Tell her friends about the business</b>). Chọn <b>(A)</b>.</p>"
    },
    // Set 5
    83: {
      questionType: 'Topic / Main Idea',
      subCategory: 'Topic / Main Idea',
      explanation: "<p>Bài nói cho biết: <i>'...the largest-ever study about the effects of caffeine on sleep.'</i> => Nghiên cứu tập trung vào tác động của một chất cụ thể (caffeine) lên giấc ngủ (<b>How a certain substance affects sleep</b>). Chọn <b>(C)</b>.</p>"
    },
    84: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Bác sĩ Senequa cho biết: <i>'participants will spend seven days at the clinic having their sleep patterns monitored and recorded.'</i> Bảy ngày (<i>'seven days'</i>) tương đương với một tuần (<b>For one week</b>). Chọn <b>(B)</b>.</p>"
    },
    85: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người nói nêu yêu cầu: <i>'They will be required to consume varying amounts of caffeine over the test period and keep a detailed journal.'</i> Cụm từ <i>'keep a detailed journal'</i> (viết nhật ký chi tiết) đồng nghĩa với ghi chép lại thông tin bằng văn bản (<b>Keep a written record</b>). Chọn <b>(B)</b>.</p>"
    },
    // Set 6
    86: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người gọi nói: <i>'I'm the one who visited your home earlier this week to discuss the renovation project for your basement.'</i> => Dự án cải tạo tầng hầm (<b>Renovating a basement</b>). Chọn <b>(B)</b>.</p>"
    },
    87: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Người gọi thông báo vấn đề: <i>'...a few of our crew members will be using vacation time in August, so we'll be short-staffed.'</i> Cụm từ <i>'short-staffed'</i> nghĩa là thiếu nhân lực (<b>There will be a lack of employees</b>). Chọn <b>(D)</b>.</p>"
    },
    88: {
      questionType: 'Offer',
      subCategory: 'Offer',
      explanation: "<p>Người gọi đề nghị: <i>'If you would be able to have the work done at the end of August instead, I could give you a lower price.'</i> Cụm từ <i>'give you a lower price'</i> đồng nghĩa với giảm giá (<b>Give the listener a discount</b>). Chọn <b>(A)</b>.</p>"
    },
    // Set 7
    89: {
      questionType: 'Speaker / Listener',
      subCategory: 'Speaker / Listener',
      explanation: "<p>Người nói mở đầu buổi gặp: <i>'It's great to see so much enthusiasm for your first day here at Blane Advertising. We're glad you'll be a part of our team.'</i> (ngày đầu tiên các bạn ở đây, gia nhập đội ngũ) => Đối tượng nghe là các nhân viên mới tuyển dụng (<b>New staff members</b>). Chọn <b>(D)</b>.</p>"
    },
    90: {
      questionType: 'Inference',
      subCategory: 'Inference',
      explanation: "<p>Người nói nói: <i>'I'm sure you're wondering exactly what your work will involve. Let's get to that. Each month, we create several marketing campaigns...'</i> => Câu <i>'Let's get to that'</i> ngụ ý người nói sẽ bắt đầu giải thích về nhiệm vụ và trách nhiệm công việc (<b>Some responsibilities will be explained</b>). Chọn <b>(A)</b>.</p>"
    },
    91: {
      questionType: 'Next Action',
      subCategory: 'Next Action',
      explanation: "<p>Người nói thông báo bước tiếp theo: <i>'I'll show you a brief video that highlights some of our best work, and then we'll discuss it together.'</i> => Trình chiếu video về các quảng cáo xuất sắc trước đây (<b>Show a video of past advertisements</b>). Chọn <b>(C)</b>.</p>"
    },
    // Set 8
    92: {
      questionType: 'Purpose',
      subCategory: 'Purpose',
      explanation: "<p>Đoạn quảng cáo nêu rõ: <i>'To celebrate our official opening on Saturday, April 5, we'll be providing free appetizers and half-price cocktails.'</i> => Mục đích quảng bá cho ngày khai trương nhà hàng (<b>To promote a grand opening</b>). Chọn <b>(A)</b>.</p>"
    },
    93: {
      questionType: 'Detail',
      subCategory: 'Detail',
      explanation: "<p>Bài nói giới thiệu vị trí: <i>'Trentini's, located across the street from Lindale Apartments.'</i> Cụm từ <i>'across the street from'</i> đồng nghĩa với <i>'opposite'</i> (đối diện) và <i>'Apartments'</i> là tòa nhà dân cư (<b>Opposite a residential building</b>). Chọn <b>(A)</b>.</p>"
    },
    94: {
      questionType: 'Inference',
      subCategory: 'Inference',
      explanation: "<p>Người nói quảng cáo: <i>'Have you been searching for your next favorite restaurant? Here's the answer. I guarantee you won't be disappointed.'</i> => Câu <i>'Here's the answer'</i> dùng để giới thiệu và đề xuất nhà hàng Trentini cho thực khách (<b>She is recommending a business</b>). Chọn <b>(C)</b>.</p>"
    },
    // Set 9
    95: {
      questionType: 'Purpose',
      subCategory: 'Purpose',
      explanation: "<p>Người gọi nói: <i>'I'm calling from Ace Movers for Luke Landers. I'd like to confirm the details of your upcoming move.'</i> => Cuộc gọi nhằm xác nhận thông tin chi tiết về việc chuyển nhà (<b>To confirm moving details</b>). Chọn <b>(A)</b>.</p>"
    },
    96: {
      questionType: 'Graphic / Map',
      subCategory: 'Graphic / Map',
      explanation: "<p>Người gọi thông báo: <i>'Since we have to use a smaller truck than planned, we expect it to take about two hours longer than originally scheduled.'</i> (chúng tôi dự kiến sẽ mất thêm 2 tiếng so với lịch trình ban đầu) => Thông tin thời gian hoàn thành dự kiến trên hóa đơn/bản kế hoạch hiện không còn chính xác nữa (<b>The estimated completion</b>). Chọn <b>(C)</b>.</p>"
    },
    97: {
      questionType: 'Request',
      subCategory: 'Request',
      explanation: "<p>Người gọi dặn dò: <i>'...we do request that you show the receipt to one of our employees when they arrive.'</i> Cụm từ <i>'show the receipt'</i> đồng nghĩa với xuất trình giấy tờ/hóa đơn cho nhân viên (<b>Present a document to a crew member</b>). Chọn <b>(D)</b>.</p>"
    },
    // Set 10
    98: {
      questionType: 'Topic / Main Idea',
      subCategory: 'Topic / Main Idea',
      explanation: "<p>Người nói mở đầu: <i>'I'd like to take a moment to talk about the upcoming Annual Conference for Healthcare...'</i> => Hội nghị chuyên ngành y tế/chăm sóc sức khỏe (<b>A medical conference</b>). Chọn <b>(A)</b>.</p>"
    },
    99: {
      questionType: 'Next Action',
      subCategory: 'Next Action',
      explanation: "<p>Người nói cho biết: <i>'I've given you each a pamphlet that highlights the event's activities and speakers. I hope it will encourage you to attend.'</i> Từ <i>'pamphlet'</i> đồng nghĩa với <i>'brochure'</i> (tờ gấp giới thiệu) => Người nghe sẽ đọc tài liệu giới thiệu (<b>Read a brochure</b>). Chọn <b>(A)</b>.</p>"
    },
    100: {
      questionType: 'Graphic / Map',
      subCategory: 'Graphic / Map',
      explanation: "<p>Người nói cho biết: <i>'And I'm planning to reserve a booth for both weekend days.'</i> (thuê gian hàng cho cả 2 ngày cuối tuần). Đối chiếu bảng giá, gói thuê gian hàng cho cả 2 ngày cuối tuần (Saturday & Sunday) có giá $1,600. Chọn <b>(C) $1,600</b>.</p>"
    }
  };

  data.forEach(set => {
    set.questions.forEach(q => {
      const u = qMap[q.number];
      if (u) {
        q.questionType = u.questionType;
        q.subCategory = u.subCategory;
        q.explanation = u.explanation;
      }
    });
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Upgraded Test 1 Part 4 (30 questions)');
}

// RUN ALL UPGRADES
upgradeTest1Part1();
upgradeTest2Part1();
upgradeTest1Part2();
upgradeTest2Part2();
upgradeTest1Part3();
upgradeTest1Part4();
console.log('🎉 ALL LISTENING CONTENT UPGRADED SUCCESSFULLY!');
