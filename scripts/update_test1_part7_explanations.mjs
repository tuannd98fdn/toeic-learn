import fs from 'fs';
import path from 'path';

const part7Path = path.resolve('public/data/ets2022/test1/part7.json');
const part7Data = JSON.parse(fs.readFileSync(part7Path, 'utf8'));

const explanations = {
  // SET 1: Q147 - Q148 (TechRight 1400 Scanner)
  147: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Thông tin này có nhiều khả năng được tìm thấy ở đâu nhất?
<br>(A) Trong sách hướng dẫn sử dụng.
<br>(B) Trên biên lai mua hàng.
<br>(C) Trên bao bì sản phẩm.
<br>(D) Trong một mẩu quảng cáo.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn dòng 1-3: <i>"Thank you for purchasing the TechRight 1400 Scanner. In this publication, you will find everything you need to know to start scanning documents and images... You can learn about the various parts of your scanner, its advanced features, and review our start-up guide."</i>
<br>- (Cảm ơn bạn đã mua Máy quét TechRight 1400. Trong ấn phẩm này, bạn sẽ tìm thấy mọi thứ cần biết để bắt đầu quét tài liệu và hình ảnh... Bạn có thể tìm hiểu về các bộ phận khác nhau của máy quét, các tính năng nâng cao và xem lại hướng dẫn khởi động của chúng tôi.)
<br>- Nội dung giải thích chi tiết các bộ phận, hướng dẫn khởi động và sử dụng sau khi đã mua máy quét chính xác là nội dung của một cuốn sách hướng dẫn sử dụng (user manual).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Cụm từ mở đầu <i>"Thank you for purchasing..."</i> kết hợp với <i>"start-up guide"</i> và <i>"various parts of your scanner"</i> là dấu hiệu đặc trưng 100% của User Manual / User Guide trong đề thi TOEIC.</p>`,

  148: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Theo thông tin trên, điều gì được cung cấp trên trang web?
<br>(A) Phần mềm diệt virus.
<br>(B) Bản sao của ấn phẩm.
<br>(C) Hướng dẫn vận hành/sử dụng.
<br>(D) Hình ảnh chi tiết.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn câu cuối: <i>"For more detailed instructions on how to use your TechRight scanner, visit us at www.techright.com."</i>
<br>- (Để biết hướng dẫn chi tiết hơn về cách sử dụng máy quét TechRight của bạn, hãy truy cập trang web www.techright.com của chúng tôi.)
<br>- Cụm <i>"instructions on how to use"</i> (hướng dẫn cách sử dụng) được diễn đạt tương đương (paraphrase) bằng <i>"Operating instructions"</i> (hướng dẫn vận hành).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Kỹ năng Paraphrasing kinh điển: <i>instructions on how to use = operating instructions = user guide</i>.</p>`,

  // SET 2: Q149 - Q150 (Email to Mei Wan)
  149: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Mục đích của email là gì?
<br>(A) Báo cáo một vấn đề về giấy tờ.
<br>(B) Mời ứng viên đến phỏng vấn.
<br>(C) Yêu cầu cung cấp thêm thông tin.
<br>(D) Giải thích một quyết định tuyển dụng.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn câu đầu và câu 2: <i>"We regret to inform you that you have not been selected for the vehicle sales position you interviewed for last week. While we were impressed with your enthusiastic personality, we decided to hire someone with a more intimate knowledge of the individual makes and models in order to reduce the need for in-house training."</i>
<br>- (Chúng tôi rất tiếc phải thông báo rằng bạn đã không được chọn cho vị trí bán xe mà bạn đã phỏng vấn tuần trước. Mặc dù chúng tôi ấn tượng với tính cách nhiệt huyết của bạn, chúng tôi đã quyết định thuê một người có hiểu biết sâu sắc hơn về từng hãng và mẫu xe...)
<br>- Người gửi nêu rõ lý do từ chối ứng viên (cần người hiểu rõ sản phẩm xe hơi và có thể đi làm toàn thời gian ngay), tức là giải thích quyết định tuyển dụng (hiring decision).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Cụm từ <i>"We regret to inform you that you have not been selected..."</i> là mở đầu kinh điển của thư từ chối ứng viên (Rejection Letter), mục đích chính luôn là giải thích quyết định tuyển dụng (explain a hiring decision).</p>`,

  150: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được chỉ ra về cô Wan?
<br>(A) Cô ấy có một bản sơ yếu lý lịch ấn tượng.
<br>(B) Cô ấy hiện đang làm việc bán thời gian.
<br>(C) Cô ấy đã bỏ lỡ một thời hạn quan trọng.
<br>(D) Cô ấy đạt điểm kém trong bài kiểm tra kỹ năng.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn câu 3: <i>"You also mentioned that you are working mornings at a high-end boutique and that you would need to give at least 30 days' notice to your current employer."</i>
<br>- (Bạn cũng đã đề cập rằng bạn đang làm việc vào các buổi sáng tại một cửa hàng thời trang cao cấp và bạn sẽ cần phải thông báo trước ít nhất 30 ngày cho người sử dụng lao động hiện tại của mình.)
<br>- Việc cô chỉ làm vào các buổi sáng (<i>working mornings</i>) đồng nghĩa với việc cô hiện đang làm bán thời gian (<i>currently working part-time</i>).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Suy luận từ vựng: <i>working mornings = part-time job</i> đối lập với yêu cầu của công ty là <i>"a full-time worker"</i>.</p>`,

  // SET 3: Q151 - Q152 (Harrison's Home Merchandise Website)
  151: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Harrison's là loại hình doanh nghiệp nào?
<br>(A) Một công ty xây dựng.
<br>(B) Một công ty thiết kế nội thất.
<br>(C) Một nhà sản xuất đồ nội thất.
<br>(D) Một cửa hàng quần áo.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đoạn 1 và đoạn 2: <i>"For over 60 years, Harrison's has been Hartwick City's leading retailer of wooden tables, shelving, bed frames, and more... Our in-house carpenters and creative designers have been praised... for their ability to create in consultation with the client, one-of-a-kind pieces..."</i>
<br>- (Trong hơn 60 năm qua, Harrison's là nhà bán lẻ hàng đầu của Thành phố Hartwick về bàn gỗ, giá kệ, khung giường và nhiều thứ khác... Đội ngũ thợ mộc nội bộ và các nhà thiết kế sáng tạo của chúng tôi đã được ca ngợi... vì khả năng tạo ra các tác phẩm độc nhất vô nhị...)
<br>- Doanh nghiệp chuyên đóng bàn ghế, kệ, giường bằng gỗ với đội ngũ thợ mộc (carpenters) chính là nhà sản xuất đồ nội thất (furniture maker).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Các từ khóa: <i>wooden tables, shelving, bed frames</i> (bàn, giá kệ, giường) kết hợp cùng <i>in-house carpenters</i> (thợ mộc tại xưởng) quy tụ về nhóm hàng <i>furniture</i> (đồ nội thất).</p>`,

  152: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Trang web chỉ ra điều gì về Harrison's?
<br>(A) Cửa hàng giao hàng miễn phí tại địa phương.
<br>(B) Các đơn đặt hàng có thể được tùy chỉnh theo yêu cầu.
<br>(C) Cửa hàng có trách nhiệm với môi trường.
<br>(D) Cửa hàng từng được giới thiệu trên một ấn phẩm.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đoạn 2: <i>"Our in-house carpenters and creative designers have been praised in the local and national press for their ability to create in consultation with the client, one-of-a-kind pieces using materials that range from the mundane to the exotic."</i>
<br>- (Thợ mộc và nhà thiết kế sáng tạo của chúng tôi được ca ngợi vì khả năng tạo ra các món đồ độc nhất vô nhị dựa trên sự trao đổi/tư vấn trực tiếp với khách hàng.)
<br>- Khả năng thiết kế và chế tác riêng theo ý kiến của khách hàng (<i>create in consultation with the client, one-of-a-kind pieces</i>) đồng nghĩa với việc sản phẩm có thể tùy biến theo yêu cầu cá nhân (<i>customized orders</i>).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Cụm <i>"create in consultation with the client, one-of-a-kind pieces"</i> được paraphrase thành <i>"orders can be customized"</i> (đặt hàng theo yêu cầu riêng).</p>`,

  // SET 4: Q153 - Q155 (Dean Glover Email)
  153: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Email này nhiều khả năng nhất được gửi cho ai?
<br>(A) Các nhà quản lý tại trụ sở chính của công ty.
<br>(B) Nhân viên phòng kinh doanh (bán hàng).
<br>(C) Kỹ thuật viên tại phòng CNTT.
<br>(D) Các giám sát viên tại phòng tiếp thị.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đoạn 1: <i>"It seems that only the customer service, personnel, and marketing departments have been affected by this fault, with your phone lines in the sales department remaining unaffected."</i>
<br>- (Có vẻ như chỉ có các phòng chăm sóc khách hàng, nhân sự và tiếp thị bị ảnh hưởng bởi lỗi này, trong khi các đường dây điện thoại của các bạn tại phòng kinh doanh vẫn không bị ảnh hưởng.)
<br>- Cụm từ <i>"your phone lines in the sales department"</i> (đường dây điện thoại của các bạn tại phòng kinh doanh) khẳng định đối tượng người nhận (recipients) chính là các nhân viên thuộc phòng kinh doanh (Staff in the sales department).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Chú ý tính từ sở hữu <i>"your phone lines in the sales department"</i>. Đại từ sở hữu "your" hướng thẳng đến người đọc thư.</p>`,

  154: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được chỉ ra về ông Preece?
<br>(A) Ông ấy sẽ trực tiếp đến thăm từng phòng ban.
<br>(B) Ông ấy đã gọi điện để yêu cầu hỗ trợ một sự cố văn phòng.
<br>(C) Hiện tại không thể liên lạc với ông ấy qua điện thoại.
<br>(D) Ông ấy dự kiến sẽ hoàn thành việc sửa chữa vào cuối ngày.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn cuối đoạn 1: <i>"At this very moment, Terrence Preece from the IT department is working hard to restore full service to our phone network, and he is optimistic that this will be achieved by 6 P.M. today."</i>
<br>- (Ngay lúc này, Terrence Preece từ phòng CNTT đang nỗ lực khôi phục toàn bộ dịch vụ cho mạng điện thoại của chúng ta, và ông ấy lạc quan rằng điều này sẽ đạt được trước 6 giờ chiều hôm nay.)
<br>- Thời điểm <i>"6 P.M. today"</i> (6 giờ chiều hôm nay) tương ứng với <i>"by the end of the day"</i> (vào cuối ngày làm việc).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing mốc thời gian: <i>by 6 P.M. today = by the end of the day</i>.</p>`,

  155: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Ông Glover khuyên người nhận làm gì?
<br>(A) Khuyến khích nhân viên làm việc năng suất hơn.
<br>(B) Tránh sử dụng máy tính trong phần còn lại của ngày.
<br>(C) Sử dụng một phương tiện liên lạc thay thế.
<br>(D) Mang thiết bị hỏng đến cho ông Preece sửa chữa.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đầu đoạn 2: <i>"In the meantime, we ask that even those who are able to use your phones, please communicate with the affected departments using e-mail only."</i>
<br>- (Trong thời gian chờ đợi, chúng tôi yêu cầu ngay cả những người có thể sử dụng điện thoại, vui lòng chỉ liên lạc với các phòng ban bị ảnh hưởng bằng e-mail.)
<br>- Vì đường dây điện thoại bị hỏng nên việc chuyển sang dùng email chính là sử dụng phương tiện liên lạc thay thế (an alternative means of communication).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Cụm từ <i>"communicate ... using e-mail only"</i> (chỉ liên lạc qua email) được paraphrase thành <i>"alternative means of communication"</i>.</p>`,

  // SET 5: Q156 - Q157 (Chat: Elizabeth Tanner & Danny Olsen)
  156: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Một món đồ mà cô Tanner đang bị thiếu là gì?
<br>(A) Một chiếc máy chiếu.
<br>(B) Một chiếc máy tính xách tay.
<br>(C) Một tệp trình chiếu.
<br>(D) Một thiết bị kết nối.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn lúc 13:11 và 13:13: 
<br>Tanner (13:11): <i>"I'm setting up the conference room for the board meeting, but can't find the cable for the laptop."</i>
<br>Tanner (13:13): <i>"The one that hooks up a computer to the projector for videos and slideshows. I need one of those but it's missing."</i>
<br>- Dây cáp nối máy tính với máy chiếu (cable that hooks up a computer to the projector) chính là một thiết bị kết nối (a connection device).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Cụm <i>"cable... that hooks up A to B"</i> (dây cáp kết nối) được khái quát hóa thành <i>"connection device"</i>. Cẩn thận bẫy (A) và (B) vì máy chiếu và laptop cô ấy đã có, cô chỉ thiếu dây cáp nối.</p>`,

  157: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Vào lúc 13:14, ông Olsen có ý gì khi viết: "Oh, that's happened before" (Ồ, chuyện đó từng xảy ra trước đây rồi)?
<br>(A) Anh ấy hiểu tại sao một thiết bị bị trục trặc.
<br>(B) Anh ấy đoán trước rằng một đồng nghiệp sẽ đến muộn cuộc họp hội đồng.
<br>(C) Anh ấy biết cô Tanner đang cần món đồ nào.
<br>(D) Anh ấy đang liên hệ với phòng CNTT để khắc phục một sự cố phổ biến.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trước đó ở dòng 13:12, Olsen nói: <i>"I'm not sure which cable you mean."</i> (Tôi không chắc bạn đang nói tới sợi cáp nào).
<br>- Đến 13:13, Tanner mô tả: <i>"The one that hooks up a computer to the projector..."</i>.
<br>- Ngay sau lời giải thích đó, Olsen viết (13:14): <i>"Oh, that's happened before. I'll bring one down in a few minutes."</i>
<br>- Câu này thể hiện rằng sau khi nghe mô tả, Olsen đã nhận ra chính xác món đồ đó là gì và chuyện thất lạc sợi cáp này từng xảy ra trước đây, nên anh biết rõ cô cần gì và sẽ mang xuống ngay.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Dạng câu hỏi hàm ý trong tin nhắn (Contextual meaning): Luôn đọc câu trước và câu ngay sau để hiểu ý định của người nói. Câu sau anh bảo <i>"I'll bring one down"</i> chứng tỏ anh đã nhận diện được vật cần tìm.</p>`,

  // SET 6: Q158 - Q160 (Truck Advertisement)
  158: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được gợi ý về chiếc xe trong mẩu quảng cáo?
<br>(A) Đây là mẫu xe tiết kiệm nhiên liệu nhất hiện có.
<br>(B) Giá của nó có thể thương lượng được.
<br>(C) Xe đi kèm với giá chở đồ trên nóc.
<br>(D) Xe cần một vài sửa chữa nhỏ.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn cuối đoạn 1: <i>"Price reduced for quick sale to $19,000 (or nearest offer)."</i>
<br>- (Giá đã giảm để bán nhanh xuống còn 19.000 đô la (hoặc mức giá chào mua gần nhất).)
<br>- Cụm <i>"or nearest offer"</i> (hoặc giá chào mua gần nhất) là thuật ngữ mua bán xe/nhà đất, chỉ việc người bán sẵn sàng đàm phán giảm giá nếu người mua thiện chí trả giá gần với mức đó, tức là giá có thể thương lượng (price is subject to negotiation).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Thành ngữ thương mại: <i>or nearest offer (o.n.o) = subject to negotiation</i> (có thể thương lượng giá).</p>`,

  159: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì KHÔNG được chỉ ra là tính năng của xe Lunetta Silverback?
<br>(A) Khả năng kết nối điện thoại di động.
<br>(B) Hệ thống định vị.
<br>(C) Hệ thống âm thanh công nghệ cao.
<br>(D) Ghế sưởi ở phía trước.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Kiểm tra đoạn Features:
<br>+ <i>"seat heaters for both the driver and front passenger"</i> -> loại trừ (D).
<br>+ <i>"satellite navigation"</i> (định vị vệ tinh) -> loại trừ (B).
<br>+ <i>"a USB jack for any second-generation or higher smartphone"</i> -> loại trừ (A).
<br>- Trong toàn bộ bài quảng cáo hoàn toàn không có thông tin về hệ thống âm thanh công nghệ cao (a high-tech audio system).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Câu hỏi phủ định NOT: Dùng phương pháp loại trừ 3 đáp án có xuất hiện trong bài đọc để chọn đáp án không được nhắc tới.</p>`,

  160: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Có thể suy ra điều gì về Geraldine?
<br>(A) Cô ấy đã lắp đặt các tính năng mới cho chiếc xe.
<br>(B) Cô ấy là chủ sở hữu ban đầu của chiếc xe tải.
<br>(C) Cô ấy làm việc như một thợ cơ khí chuyên nghiệp.
<br>(D) Cô ấy sẽ trả lời tất cả email trong vòng 24 giờ.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Đoạn 1 nêu: <i>"it has been used by only one very careful owner."</i> (xe chỉ được sử dụng bởi duy nhất một người chủ rất cẩn thận).
<br>- Đoạn 3 nêu: <i>"The owner will arrange a test drive... Please call (201) 555-7586 and leave a message for Geraldine."</i> (Chủ xe sẽ sắp xếp lái thử... Vui lòng gọi... và để lại lời nhắn cho Geraldine).
<br>- Vì chiếc xe chỉ có duy nhất một chủ sở hữu từ đầu đến giờ và chủ xe là Geraldine, suy ra Geraldine chính là chủ sở hữu ban đầu (original owner).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Kết hợp 2 manh mối: <i>only one owner</i> (chỉ 1 chủ duy nhất) + <i>the owner = Geraldine</i> -> Geraldine là người chủ ban đầu duy nhất.</p>`,

  // SET 7: Q161 - Q164 (Ace HR Consulting Email)
  161: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Mục đích của email của ông Gibson là gì?
<br>(A) Lên lịch cho một buổi hội thảo quản lý.
<br>(B) Phản hồi thắc mắc/yêu cầu từ một khách hàng tiềm năng.
<br>(C) Thông báo các dịch vụ mới của công ty.
<br>(D) Đưa ra lời khuyên về việc tuyển dụng nhân viên.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Tiêu đề thư: <i>"Subject: RE: Consulting Services"</i> (ký hiệu RE: thể hiện đây là thư hồi đáp).
<br>- Câu mở đầu: <i>"Thank you for your interest in our services... We understand that you are looking for an HR consulting firm to help you establish a branch office here in the U.A.E."</i>
<br>- (Cảm ơn bạn đã quan tâm đến dịch vụ của chúng tôi... Chúng tôi hiểu rằng bạn đang tìm kiếm một công ty tư vấn nhân sự để giúp bạn thành lập văn phòng chi nhánh tại U.A.E.)
<br>- Bức thư nhằm phản hồi lại thư quan tâm hỏi dịch vụ từ phía ông Tyson (khách hàng tiềm năng).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Tiêu đề có tiền tố <i>"RE:"</i> và câu mở đầu <i>"Thank you for your interest in..."</i> là dấu hiệu chuẩn xác của thư hồi đáp yêu cầu thông tin (respond to an inquiry).</p>`,

  162: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được chỉ ra về công ty Ace HR Consulting, Inc.?
<br>(A) Công ty sẽ sáp nhập với một công ty có bề dày lịch sử.
<br>(B) Công ty đã chuyển trụ sở chính sang Vương quốc Anh.
<br>(C) Công ty phục vụ khách hàng ở nhiều hơn một quốc gia.
<br>(D) Công ty đã mua lại một số công ty thiết kế đồ họa.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đoạn 1: <i>"Ace HR Consulting, Inc., provides reliable human resource solutions and works closely with large companies, domestically and abroad, to develop effective work systems."</i>
<br>- (Ace HR Consulting, Inc. cung cấp các giải pháp nhân sự đáng tin cậy và hợp tác chặt chẽ với các công ty lớn, trong nước và nước ngoài, để phát triển các hệ thống làm việc hiệu quả.)
<br>- Cụm <i>"domestically and abroad"</i> (ở trong nước và ở nước ngoài) đồng nghĩa với việc phục vụ khách hàng ở nhiều quốc gia (in more than one country).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing địa lý: <i>domestically and abroad = in more than one country / international clients</i>.</p>`,

  163: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Từ "assure" trong đoạn 3 có nghĩa gần nhất với từ nào?
<br>(A) promote (thúc đẩy, quảng bá).
<br>(B) promise (hứa, cam đoan).
<br>(C) secure (đảm bảo an toàn, giành được).
<br>(D) convince (thuyết phục).</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Ngữ cảnh câu gốc đoạn 3: <i>"We assure you that if you decide to enter into a partnership with us, we will provide you with quality services to help you achieve your goals."</i>
<br>- (Chúng tôi cam đoan/hứa với bạn rằng nếu bạn quyết định hợp tác với chúng tôi, chúng tôi sẽ cung cấp cho bạn các dịch vụ chất lượng...)
<br>- Từ "assure" mang nghĩa cam đoan, quả quyết một điều gì chắc chắn sẽ xảy ra để người khác yên tâm, đồng nghĩa với "promise".</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Cấu trúc <i>assure someone that... = promise someone that...</i> (hứa/cam kết với ai điều gì).</p>`,

  164: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Câu sau đây phù hợp nhất ở vị trí nào: [1], [2], [3] hay [4]?
<br><i>"Therefore, choosing Dubai as the location for your satellite office is definitely a smart move."</i> (Do đó, việc chọn Dubai làm địa điểm cho văn phòng vệ tinh của bạn chắc chắn là một nước đi thông minh.)
<br>(A) [1]
<br>(B) [2]
<br>(C) [3]
<br>(D) [4]</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trước vị trí [2]: <i>"We have assisted other U.K.-based graphic design firms like yours with their expansion into Dubai and Abu Dhabi before, and we can say that they are fully satisfied with the outcome. The booming entertainment and tourism industries in the country have contributed much to their growth."</i> (Chúng tôi đã hỗ trợ các công ty thiết kế đồ họa của Anh mở rộng vào Dubai... Ngành giải trí và du lịch bùng nổ tại đây đã đóng góp rất nhiều vào sự phát triển của họ.)
<br>- Câu cần điền bắt đầu bằng liên từ kết quả <i>"Therefore"</i> (Do đó), giải thích rằng chính vì thị trường Dubai đang phát triển rực rỡ và các đối tác trước đã thành công lớn, nên việc chọn Dubai là một bước đi thông minh (smart move). Đặt vào vị trí [2] tạo sự kết nối nguyên nhân - kết quả hoàn hảo.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Chú ý từ nối <i>"Therefore"</i> (Vì vậy, Do đó). Câu trước nêu lợi ích và thành công tại Dubai -> câu kết luận khẳng định đây là lựa chọn thông minh.</p>`,

  // SET 8: Q165 - Q168 (Lagrange Clothing Article)
  165: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được chỉ ra về hãng may mặc Lagrange Clothing?
<br>(A) Doanh số toàn cầu của hãng đã cải thiện đáng kể.
<br>(B) Hãng ban đầu được thành lập tại Brussels.
<br>(C) Trước đây hãng tập trung vào bán hàng nội địa.
<br>(D) Hãng dự định mở một nhà máy sản xuất tại London.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Đoạn 1: <i>"...today announced his intention to take the thriving clothing retail business into international markets..."</i> (hôm nay công bố ý định đưa doanh nghiệp bán lẻ thời trang đang phát triển mạnh mẽ tiến vào thị trường quốc tế).
<br>- Đoạn 2: <i>"By moving operations into foreign markets for the first time, we aim to establish ourselves as one of the world's leading clothing manufacturers."</i> (Bằng cách mở rộng hoạt động sang các thị trường nước ngoài lần đầu tiên, chúng tôi hướng tới việc khẳng định vị thế...).
<br>- Cụm <i>"into foreign markets for the first time"</i> (lần đầu tiên ra thị trường nước ngoài) chứng tỏ trước thời điểm này, hãng chỉ tập trung bán hàng trong nước (domestic sales).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Suy luận đối lập: <i>entering foreign markets for the first time = previously focused on domestic sales</i>.</p>`,

  166: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được gợi ý về các cửa hàng tại châu Âu của Lagrange Clothing?
<br>(A) Các cửa hàng sẽ chủ yếu bán các thương hiệu thời trang nổi tiếng thế giới.
<br>(B) Chúng sẽ là những địa điểm lớn nhất của công ty.
<br>(C) Gần đây các cửa hàng đã được Peter Radcliffe tới thị sát.
<br>(D) Chúng dự kiến sẽ mở cửa kinh doanh vào tháng Ba tới.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Đoạn 1 nêu: <i>"Construction has already begun on a new manufacturing plant and distribution warehouse in Brussels, Belgium, and these are expected to begin operations in early February, just one month before the opening of the flagship stores."</i>
<br>- (Việc xây dựng đã bắt đầu tại nhà máy sản xuất và kho phân phối ở Brussels, Bỉ, và những nơi này dự kiến sẽ bắt đầu hoạt động vào đầu tháng Hai, chỉ một tháng trước ngày khai trương các cửa hàng hàng đầu.)
<br>- Nhà máy hoạt động vào đầu tháng Hai, và một tháng sau đó chính là tháng Ba (March).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Bài toán suy luận thời gian: <i>early February + one month before opening = opening in March</i>.</p>`,

  167: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Theo bài báo, Lagrange Clothing đã hoàn thành được điều gì trong năm nay?
<br>(A) Đạt doanh số cao hơn các đối thủ cạnh tranh.
<br>(B) Thực hiện một thỏa thuận kinh doanh với một công ty nước ngoài.
<br>(C) Khai trương cửa hàng thời trang mới nhất của mình.
<br>(D) Ra mắt một dòng sản phẩm quần áo mới.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đầu đoạn 2: <i>"This year has proven to be a banner year for Lagrange Clothing and saw Mr. Radcliffe attend the opening of the company's newest retail location in downtown Houston."</i>
<br>- (Năm nay chứng minh là một năm đại thành công của Lagrange Clothing và đã chứng kiến ông Radcliffe tham dự buổi khai trương địa điểm bán lẻ mới nhất của công ty ở trung tâm thành phố Houston.)
<br>- Việc khai trương cửa hàng ở Houston đồng nghĩa với <i>"opened its latest fashion store"</i>.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing từ vựng: <i>newest retail location = latest fashion store</i>.</p>`,

  168: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Câu sau đây phù hợp nhất ở vị trí nào: [1], [2], [3] hay [4]?
<br><i>"If Lagrange Clothing continues to expand so quickly, Mr. Radcliffe’s goal may become a reality."</i> (Nếu Lagrange Clothing tiếp tục mở rộng nhanh chóng như vậy, mục tiêu của ông Radcliffe có thể trở thành hiện thực.)
<br>(A) [1]
<br>(B) [2]
<br>(C) [3]
<br>(D) [4]</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Đứng ngay trước vị trí [3] là câu trích dẫn phát biểu của ông Radcliffe: <i>"...we aim to establish ourselves as one of the world's leading clothing manufacturers."</i> (chúng tôi đặt mục tiêu khẳng định vị thế là một trong những nhà sản xuất quần áo hàng đầu thế giới).
<br>- Cụm từ <i>"Mr. Radcliffe's goal"</i> (mục tiêu của ông Radcliffe) trong câu cần điền quy chiếu trực tiếp và giải thích cho <i>"we aim to establish..."</i> ở câu trước. Vị trí [3] là vị trí duy nhất tạo nên tính mạch lạc hoàn hảo.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Manh mối liên kết từ vựng: Động từ <i>"aim"</i> (mục tiêu hướng tới) ở câu trước nối tiếp với danh từ <i>"goal"</i> (mục tiêu) ở câu cần điền.</p>`,

  // SET 9: Q169 - Q171 (Water Supply Notice)
  169: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Mục đích của thông báo là gì?
<br>(A) Khuyến khích cư dân tiết kiệm nước.
<br>(B) Mời người thuê nhà tham dự một cuộc họp sắp tới.
<br>(C) Thông báo cho người thuê nhà về việc kiểm tra nguồn nước.
<br>(D) Thông báo cho cư dân về việc sửa chữa cần thiết.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đoạn 1: <i>"Please be advised that the water supply to the entire apartment complex will be shut off between the hours of 10 A.M. and 3 P.M. tomorrow. This is to enable the replacement of some old pipes, which have become corroded and fallen into a dangerous state of disrepair."</i>
<br>- (Xin thông báo rằng nguồn cung cấp nước cho toàn bộ khu chung cư sẽ bị ngắt từ 10 giờ sáng đến 3 giờ chiều ngày mai. Việc này nhằm phục vụ cho việc thay thế một số đường ống cũ đã bị ăn mòn và rơi vào tình trạng hư hỏng nguy hiểm.)
<br>- Việc thay thế đường ống bị ăn mòn chính là hoạt động sửa chữa cần thiết (necessary repairs).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrase: <i>replacement of some old pipes fallen into disrepair = necessary repairs</i>.</p>`,

  170: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Lý do thực hiện công việc này là gì?
<br>(A) Nước không còn an toàn để uống nữa.
<br>(B) Tình trạng của các đường ống đã trở nên tồi tệ hơn.
<br>(C) Một vụ rò rỉ đã gây ngập lụt trong tòa nhà.
<br>(D) Bình đun nước nóng phải được thay thế.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Đoạn 1 nêu rõ lý do: <i>"replacement of some old pipes, which have become corroded and fallen into a dangerous state of disrepair."</i>
<br>- (thay thế một số đường ống cũ đã bị rỉ sét ăn mòn và rơi vào tình trạng hư hỏng xuống cấp nguy hiểm).
<br>- Cụm <i>"fallen into a dangerous state of disrepair"</i> phản ánh tình trạng đường ống đã trở nên xấu đi/tồi tệ đi nhiều (the condition of pipes has worsened).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>fallen into disrepair = condition has worsened</i> (xuống cấp, trở nên tệ hơn).</p>`,

  171: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Cư dân được khuyên thực hiện biện pháp phòng ngừa nào?
<br>(A) Tránh sử dụng phòng tắm ở sảnh.
<br>(B) Tích trữ thêm nước trước đó.
<br>(C) Rút phích cắm các thiết bị gia dụng.
<br>(D) Hạn chế/kiêng xả bồn cầu.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Gạch đầu dòng thứ 3 của danh sách biện pháp phòng ngừa: <i>"• Toilets in your unit are not used throughout these hours. Toilets in the lobby will be available as normal."</i>
<br>- (Nhà vệ sinh trong căn hộ của bạn không được sử dụng trong suốt những giờ này. Nhà vệ sinh ở sảnh vẫn sử dụng bình thường.)
<br>- Yêu cầu không sử dụng bồn cầu trong căn hộ tương đương với việc kiêng xả nước bồn cầu (Refraining from flushing toilets).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Từ vựng đồng nghĩa: <i>not used = refraining from using/flushing</i> (kiềm chế, không sử dụng).</p>`,

  // SET 10: Q172 - Q175 (Camera Technical Forum)
  172: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Cô Adkins đề cập đến vấn đề gì?
<br>(A) Giấy bảo hành của cô ấy bị thất lạc.
<br>(B) Một thiết bị điện tử đang bị trục trặc.
<br>(C) Các bức ảnh của cô ấy bị một tạp chí từ chối.
<br>(D) Cô ấy không chắc chắn mình cần mẫu máy nào.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Dòng đầu tiên (8:40 P.M.): <i>"Can anyone help me with a problem that I'm having with my Viewsnap R-400 digital camera?"</i>
<br>- Dòng 8:45 P.M.: <i>"The shutter that covers the camera lens is stuck somehow. It only opens halfway when I turn the camera on. Obviously, I cannot take pictures."</i>
<br>- Chiếc máy ảnh kỹ thuật số (digital camera - an electronic device) bị kẹt màn trập không thể chụp ảnh được, tức là đang gặp trục trặc/hỏng hóc (malfunctioning).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Khái quát hóa từ vựng: <i>digital camera with stuck shutter = electronic device is malfunctioning</i>.</p>`,

  173: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì là đúng về chiếc Viewsnap R-400?
<br>(A) Nó được bán kèm theo một ống kính có thể điều chỉnh.
<br>(B) Nó chụp ảnh đen trắng.
<br>(C) Nó được thiết kế cho việc chụp ảnh ngoài trời.
<br>(D) Màn trập của nó nên được lau bụi thường xuyên.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Faye Montero (8:41 P.M.): <i>"It's intended for wildlife photography, so if you're using it to take pictures indoors that might be why it's not working as you want."</i>
<br>- Tracy Adkins (8:42 P.M.): <i>"That isn't my problem. I bought it because I take pictures for a nature magazine, so I know I've got the right model."</i>
<br>- Việc chụp ảnh động vật hoang dã (wildlife) và chụp cho tạp chí thiên nhiên (nature magazine) chính là hoạt động chụp ảnh ngoài trời (outdoor photography).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>wildlife / nature photography = outdoor photography</i>.</p>`,

  174: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Vào lúc 8:48 P.M., cô Adkins có ý gì khi viết: "I'm afraid not" (Tôi e là không được)?
<br>(A) Cô ấy không muốn trả tiền sửa chữa.
<br>(B) Cô ấy không thể nhận một chiếc máy mới thay thế.
<br>(C) Cô ấy không thể nâng cấp công nghệ.
<br>(D) Cô ấy không thể xóa các bức ảnh.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trước đó lúc 8:47 P.M., Faye Montero hỏi: <i>"Can't you just return it to Viewsnap and have them give you a new camera?"</i> (Bạn không thể gửi trả nó về cho Viewsnap và yêu cầu họ đưa một chiếc máy ảnh mới hay sao?).
<br>- Adkins trả lời (8:48 P.M.): <i>"I'm afraid not. My warranty has expired, so they won't do anything about it."</i>
<br>- Cụm "I'm afraid not" trả lời phủ định cho câu hỏi đổi máy mới ở trên: vì hết hạn bảo hành nên cô không thể đổi lấy một chiếc máy mới thay thế (unable to receive a replacement).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Đọc câu hỏi đứng ngay trước: <i>give you a new camera = replacement</i> -> "I'm afraid not" nghĩa là không thể nhận máy thay thế.</p>`,

  175: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Có thể suy ra điều gì về ông Wilkes?
<br>(A) Anh ấy quen thuộc với sự cố này.
<br>(B) Anh ấy tự rửa/tráng các bức ảnh của mình.
<br>(C) Anh ấy bán thiết bị tại một cửa hàng đồ điện tử.
<br>(D) Anh ấy sở hữu mẫu máy R-400.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Chad Wilkes (8:44 P.M.): <i>"I'm responsible for repairs at Viewsnap. What exactly is your issue? I should be able to help you."</i>
<br>- Chad Wilkes (8:50 P.M.): <i>"I have dealt with this problem before. The issue is a fault in the shutter's mechanism. Often, dust or particles become lodged among the components..."</i>
<br>- Câu <i>"I have dealt with this problem before"</i> (Tôi đã từng xử lý sự cố này trước đây) chứng tỏ anh rất quen thuộc với lỗi này (familiar with the problem).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Đồng nghĩa suy luận: <i>dealt with this problem before = familiar with the problem</i>.</p>`,

  // SET 11: Q176 - Q180 (Ready Hands Cleaning Service)
  176: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Tại sao ông Pearson lại gửi bức thư?
<br>(A) Để giới thiệu về các đồ dùng lau dọn mới.
<br>(B) Để quảng bá các hoạt động tái chế.
<br>(C) Để giới thiệu một dịch vụ vệ sinh.
<br>(D) Để giải thích về sự thay đổi quyền sở hữu.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Đoạn 1 của lá thư: <i>"If you or your coworkers are bogged down in office cleaning, then Ready Hands is the right choice for you! We offer a wide range of packages to ensure that your office or other commercial space is cleaned just the way you want it."</i>
<br>- (Nếu bạn hoặc các đồng nghiệp đang bận rộn ngập đầu trong việc dọn dẹp văn phòng, thì Ready Hands chính là sự lựa chọn phù hợp cho bạn! Chúng tôi cung cấp nhiều gói dịch vụ đa dạng để đảm bảo văn phòng... được dọn dẹp đúng như ý bạn muốn.)
<br>- Mục đích lá thư là quảng bá và giới thiệu dịch vụ dọn vệ sinh văn phòng của Ready Hands tới khách hàng tiềm năng.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Dạng thư chào hàng dịch vụ mới (Promotional Letter): Đọc 2 câu đầu để xác định ngay dịch vụ được chào bán.</p>`,

  177: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Theo bức thư, điều gì tạo nên nét độc đáo của Ready Hands?
<br>(A) Công ty dọn dẹp văn phòng và nhà ở với giá thấp.
<br>(B) Các chất tẩy rửa của công ty an toàn cho sông ngòi và các dòng suối.
<br>(C) Công ty chỉ thuê những nhân viên giàu kinh nghiệm nhất.
<br>(D) Công ty theo dõi chất lượng không khí trong nhà.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đoạn 2: <i>"You'll find many similar services available in our area, but what sets Ready Hands apart is our exclusive use of non-toxic cleaning products, which are proven to not pollute waterways and have no effect on the indoor air quality."</i>
<br>- (Bạn sẽ thấy nhiều dịch vụ tương tự tại khu vực của chúng ta, nhưng điều làm nên sự khác biệt của Ready Hands là việc độc quyền sử dụng các sản phẩm tẩy rửa không độc hại, đã được chứng minh là không gây ô nhiễm các nguồn nước...)
<br>- Cụm <i>"what sets Ready Hands apart"</i> (điều làm nên sự khác biệt/độc đáo) nối với việc sản phẩm không gây ô nhiễm nguồn nước (<i>not pollute waterways = safe for rivers and streams</i>).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>what sets apart = unique</i>; <i>not pollute waterways = safe for rivers and streams</i>.</p>`,

  178: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Đâu KHÔNG phải là dịch vụ mà Ready Hands cung cấp cho tất cả khách hàng?
<br>(A) Lau bụi các bề mặt.
<br>(B) Cọ rửa bồn rửa trong nhà vệ sinh.
<br>(C) Hút bụi sàn nhà.
<br>(D) Cọ rửa cửa sổ.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Đoạn 1 liệt kê các công việc mặc định trong gói cơ bản: <i>"In each office, we vacuum and sweep floors [loại C], dust surfaces [loại A], clean bathrooms [loại B], and take out trash."</i>
<br>- Câu tiếp theo nêu: <i>"Supplementary tasks include cleaning windows and vents, washing office dishes, and more."</i>
<br>- (Các công việc bổ sung bao gồm lau cửa sổ và lỗ thông gió, rửa bát đĩa văn phòng...). "Supplementary tasks" là các dịch vụ phụ/tùy chọn theo yêu cầu thêm, chứ không phải dịch vụ mặc định dành cho mọi khách hàng.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Phân biệt giữa <i>standard tasks</i> (công việc mặc định cho mọi văn phòng) và <i>supplementary tasks</i> (nhiệm vụ làm thêm theo yêu cầu đặc biệt).</p>`,

  179: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Có thể suy ra điều gì về cô Hargis?
<br>(A) Cô ấy thường mặc trang phục cổ điển.
<br>(B) Hiện tại cô ấy tự mình dọn dẹp văn phòng.
<br>(C) Doanh nghiệp của cô ấy nằm ở Longview.
<br>(D) Hàng hóa của cửa hàng cô thường xuyên bán hết sạch.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Đây là câu hỏi liên kết 2 đoạn văn (Cross-passage question):
<br>+ Trong Email: Cô Hargis gửi thư tới <i>"To: Emily Young (emily.young@readyhands.com)"</i> và mở đầu: <i>"I am interested in receiving more information about your services in my area."</i> (Tôi quan tâm đến việc nhận thêm thông tin về dịch vụ của bạn tại khu vực của tôi).
<br>+ Đối chiếu trong Thư (Passage 1): <i>"For Longview, contact Emily Young at emily.young@readyhands.com."</i> (Đối với khu vực Longview, vui lòng liên hệ Emily Young...).
<br>- Vì Emily Young phụ trách khu vực Longview và cô Hargis liên hệ Emily cho dịch vụ tại khu vực mình, suy ra doanh nghiệp của cô Hargis nằm tại Longview.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Dạng câu hỏi ghép thông tin 2 văn bản: Tên người nhận email (Emily Young) khớp với phụ trách địa bàn Longview ở văn bản 1.</p>`,

  180: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Cô Hargis đưa ra yêu cầu đặc biệt nào?
<br>(A) Dọn dẹp bàn làm việc của cô ấy.
<br>(B) Lau bụi nhà kho.
<br>(C) Vệ sinh các lỗ thông gió.
<br>(D) Di chuyển một số quần áo.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn email của cô Hargis: <i>"However, we are looking for a business that can also provide extra services occasionally, including helping us with rearranging the retail apparel from time to time. Would this be possible?"</i>
<br>- (Tuy nhiên, chúng tôi đang tìm kiếm một đơn vị có thể thỉnh thoảng cung cấp thêm các dịch vụ bổ sung, bao gồm việc hỗ trợ chúng tôi sắp xếp lại các trang phục bán lẻ theo định kỳ. Liệu điều này có khả thi không?)
<br>- Cụm <i>"rearranging the retail apparel"</i> (sắp xếp lại trang phục/quần áo bày bán) được paraphrase chính xác thành <i>"moving some clothes"</i>.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Từ đồng nghĩa: <i>apparel = clothes / garments</i>; <i>rearranging = moving / reorganizing</i>.</p>`,

  // SET 12: Q181 - Q185 (Total Communications Phone Plans)
  181: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Tại sao cô Cummings nên gọi đến số điện thoại được cung cấp?
<br>(A) Để kích hoạt những chiếc điện thoại cô đã mua.
<br>(B) Để thiết lập một gói cước di động trả trước.
<br>(C) Để nạp thêm tiền vào tài khoản điện thoại.
<br>(D) Để nhận thông tin về các nhà cung cấp dịch vụ.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đoạn 2 của email: <i>"To activate each phone, please have the user call (303) 555-3299 and follow the recorded instructions."</i>
<br>- (Để kích hoạt từng chiếc điện thoại, vui lòng yêu cầu người dùng gọi đến số (303) 555-3299 và làm theo hướng dẫn được ghi âm.)
<br>- Mục đích gọi đến số điện thoại là để kích hoạt các máy điện thoại vừa mua.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Câu hỏi trực tiếp chi tiết: Tìm cụm số điện thoại <i>(303) 555-3299</i> trong bài, đọc câu chứa số đó: <i>"To activate each phone..."</i>.</p>`,

  182: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được chỉ ra về các gói tài khoản?
<br>(A) Chúng chỉ dành cho các cuộc gọi nội địa.
<br>(B) Chúng được lập hóa đơn vào cùng một ngày mỗi tháng.
<br>(C) Chúng bị giới hạn cho các tài khoản công ty.
<br>(D) Chúng yêu cầu kiểm tra giấy tờ tùy thân trước.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn đoạn 3 của email: <i>"If you have an account associated with the phone, your bill will be issued on the 25th of each month."</i>
<br>- (Nếu bạn có một tài khoản liên kết với điện thoại, hóa đơn của bạn sẽ được phát hành vào ngày 25 hàng tháng.)
<br>- Ngày phát hành hóa đơn cố định vào <i>"the 25th of each month"</i> tương đương với <i>"on the same date every month"</i> (cùng một ngày mỗi tháng).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>on the 25th of each month = on the same date every month</i>.</p>`,

  183: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Thông tin nào có thể được tìm thấy trên trang web?
<br>(A) Hỗ trợ hộp thư thoại.
<br>(B) Giới hạn tải xuống dữ liệu.
<br>(C) Mã quay số quốc tế.
<br>(D) Các mức phí dịch vụ tài khoản.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Nhìn vào trang web (Passage 2), phần "Account Options" liệt kê chi tiết mức phí của từng gói:
<br>+ Voyager Package: no fee (pre-paid), Peak $0.15/min, Data $0.75/GB...
<br>+ Sterling Package: no fee, Peak $0.12/min...
<br>+ Prime Package: $35 per month, Peak $0.05/min...
<br>+ Champion Package: $65 per month, Peak $0.02/min...
<br>- Nội dung toàn bộ bảng này chính là các mức phí dịch vụ của từng gói tài khoản (Account service charges).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Cụm từ <i>charges / rates / fees / pricing</i> đều đồng nghĩa với nhau khi nói về biểu phí dịch vụ.</p>`,

  184: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Gói cước nào miễn phí các cuộc gọi quốc tế vào các buổi tối?
<br>(A) Gói Voyager.
<br>(B) Gói Sterling.
<br>(C) Gói Prime.
<br>(D) Gói Champion.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trong văn bản 2, phần giải thích khung giờ nêu rõ: <i>"'peak' refers to calls made between 9:00 A.M. and 6:00 PM. Monday through Friday, and 'non-peak' at all other times."</i>
<br>- Các buổi tối (sau 6:00 PM) thuộc khung giờ thấp điểm (<i>non-peak</i>).
<br>- Kiểm tra mô tả gói Champion Package: <i>"International calls are free during non-peak hours."</i> (Các cuộc gọi quốc tế được miễn phí trong các giờ thấp điểm).
<br>- Do đó, gói cước miễn phí gọi quốc tế vào các buổi tối chính là Champion Package.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Suy luận 2 bước: Bước 1: <i>evenings</i> rơi vào <i>non-peak hours</i> (ngoài khung 9h-18h). Bước 2: Tìm gói có <i>"International calls are free during non-peak hours"</i> -> Champion Package.</p>`,

  185: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Mẫu điện thoại nào yêu cầu kích hoạt qua tin nhắn văn bản?
<br>(A) RG243
<br>(B) PG399
<br>(C) TRX440
<br>(D) PT800</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Câu hỏi liên kết 2 văn bản (Double passage):
<br>+ Trong trang web (Passage 2), mục Voyager Package có lưu ý: <i>"(Note: Users of AR Mobile models will also need to reply to a text message to activate the service.)"</i> (Lưu ý: Người dùng các mẫu máy của AR Mobile cũng sẽ cần trả lời một tin nhắn văn bản để kích hoạt dịch vụ).
<br>+ Đối chiếu lại email (Passage 1) liệt kê 4 mẫu máy đã mua: <i>"HiStar RG243, KPRola PG399, AR Mobile TRX440, and Samkia PT800."</i>
<br>- Mẫu máy thuộc hãng AR Mobile chính là AR Mobile TRX440.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Khớp chéo thông tin: Hãng máy <i>AR Mobile</i> ở văn bản 2 dẫn tới mã hiệu máy <i>AR Mobile TRX440</i> ở văn bản 1.</p>`,

  // SET 13: Q186 - Q190 (Bates Museum Tours)
  186: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được bao gồm trong tour Exploring the Ocean?
<br>(A) Thước phim video.
<br>(B) Các bức ảnh chụp.
<br>(C) Các sinh vật sống.
<br>(D) Các màn hình tương tác.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn phần "Exploring the Ocean (June only)" trong tờ rơi (Passage 1):
<br><i>"Separated only by some glass walls, you will see live deep-sea animals up close and personal."</i>
<br>- (Chỉ ngăn cách bởi những bức tường kính, bạn sẽ được nhìn tận mắt các loài động vật biển sâu còn sống ở cự ly gần.)
<br>- Cụm <i>"live deep-sea animals"</i> (động vật biển sâu còn sống) được diễn đạt tương đương bằng <i>"Live creatures"</i> (các sinh vật sống).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>live animals = live creatures</i>.</p>`,

  187: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Trong tờ rơi, từ "figures" ở đoạn 6, dòng 1 có nghĩa gần nhất với từ nào?
<br>(A) people (con người, nhân vật).
<br>(B) numbers (con số).
<br>(C) characteristics (đặc điểm).
<br>(D) statues (bức tượng).</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Ngữ cảnh câu chứa từ: <i>"This tour takes you into the world of the First Nations, who were the first figures to live in North America."</i>
<br>- (Chuyến tham quan này đưa bạn vào thế giới của các Bộ tộc Đầu tiên, những con người/nhân vật đầu tiên sinh sống ở Bắc Mỹ.)
<br>- "Figures" ở đây đi kèm mệnh đề quan hệ chỉ người <i>"who were the first figures to live..."</i>, chỉ những cá nhân, con người đầu tiên sinh sống tại đó, do đó đồng nghĩa với "people".</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Chú ý đại từ quan hệ <i>"who"</i> đứng ngay trước: chỉ có thể thay thế cho danh từ chỉ người (people).</p>`,

  188: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Cô Turner nhiều khả năng nhất sẽ tham quan khu trưng bày nào?
<br>(A) Who Were the Vikings?
<br>(B) The History of the Railways
<br>(C) From the King’s Castle
<br>(D) Ancient Ancestors</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Câu hỏi liên kết 2 văn bản (Passage 1 và Passage 2):
<br>+ Trên phiếu đăng ký (Passage 2), cô Turner điền: <i>"Date: August 1"</i> (Ngày tham quan: 1 tháng 8).
<br>+ Đối chiếu lịch triển lãm trong tờ rơi (Passage 1):
<br>• Who Were the Vikings?: January-March
<br>• The History of the Railways: April-May
<br>• Exploring the Ocean: June only
<br>• From the King's Castle: <b>July-September</b>
<br>• Ancient Ancestors: October-December
<br>- Ngày 1 tháng 8 (August 1) thuộc khung thời gian từ tháng Bảy đến tháng Chín (July-September), tương ứng với triển lãm <i>"From the King's Castle"</i>.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Dạng câu hỏi đối chiếu ngày tháng: August 1 nằm trong khoảng July - September.</p>`,

  189: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được chỉ ra về các vị khách tham quan tour?
<br>(A) Các nhóm trên 6 người trả giá vé vào cửa thấp hơn.
<br>(B) Những người tham gia đến muộn chỉ được vào các khu vực trưng bày cụ thể.
<br>(C) Khách có thể mang đồ ăn nhẹ vào bảo tàng.
<br>(D) Trẻ nhỏ phải có người lớn đi kèm.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn quy định số 4 trong email xác nhận (Passage 3): <i>"4) Children under the age of 10 must be accompanied by an adult at all times."</i>
<br>- (Trẻ em dưới 10 tuổi phải luôn có người lớn đi kèm.)
<br>- Cụm <i>"accompanied by an adult"</i> được paraphrase thành <i>"escorted by an adult"</i> (được người lớn hộ tống/đi cùng).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>accompanied by = escorted by</i>. Lưu ý quy định số 3 cấm đồ ăn uống từ ngoài vào (<i>No outside food or drink is allowed</i>) nên (C) sai.</p>`,

  190: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì là đúng về nhóm tham quan của cô Turner?
<br>(A) Nhóm sẽ đến sớm 20 phút.
<br>(B) Nhóm sẽ được ghép chung với một đoàn khác.
<br>(C) Nhóm sẽ đi chuyến tham quan đầu tiên trong ngày.
<br>(D) Nhóm sẽ bao gồm trẻ em dưới 10 tuổi.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Câu hỏi liên kết 2 văn bản (Passage 2 và Passage 3):
<br>+ Trên phiếu đăng ký (Passage 2), cô Turner điền: <i>"Number of participants: five"</i> (Số người tham gia: 5 người).
<br>+ Quy định số 2 trong email xác nhận (Passage 3) nêu: <i>"Likewise, groups with fewer than 6 participants will be grouped together with another party, so we use our tour guides as efficiently as possible."</i> (Tương tự, các nhóm có ít hơn 6 người tham gia sẽ được ghép chung với một đoàn khác để chúng tôi sử dụng hướng dẫn viên hiệu quả nhất có thể).
<br>- Nhóm của cô có 5 người (< 6 người), nên theo quy định sẽ được ghép đoàn với nhóm khác (will be grouped together with another party = combined with another).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrase: <i>fewer than 6 (5 people) + grouped together with another party = combined with another</i>.</p>`,

  // SET 14: Q191 - Q195 (Sidewalk Upgrade & Houston Electronics)
  191: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Chủ đề chính của bài báo là gì?
<br>(A) Giới thiệu các luật giao thông mới.
<br>(B) Đề cử vào hội đồng thành phố.
<br>(C) Tạo thêm nhiều vỉa hè.
<br>(D) Công trình xây dựng sắp tới.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Tiêu đề bài báo: <i>"City Sidewalk Gets an Upgrade"</i> (Vỉa hè thành phố được nâng cấp).
<br>- Nội dung bài báo: <i>"Yesterday, Clarkton city officials announced that they will be repaving some of the city's oldest and most uneven sidewalks this summer... Construction begins on August 20 and is expected to last for two weeks..."</i>
<br>- (Hôm qua, các quan chức thành phố Clarkton đã thông báo rằng họ sẽ lát lại một số vỉa hè cũ và gồ ghề nhất của thành phố vào mùa hè này... Việc thi công bắt đầu vào ngày 20 tháng 8...)
<br>- Bài báo thông tin về công trình sửa chữa vỉa hè sắp diễn ra trong thành phố (upcoming construction work).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Đọc tiêu đề và câu mở đầu của bài báo: <i>"repaving sidewalks / construction begins"</i> phản ánh chủ đề xây dựng công trình (construction work).</p>`,

  192: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được ngụ ý về ông Houston?
<br>(A) Ông ấy đề nghị hoãn công việc lại một tháng.
<br>(B) Ông ấy đã viết một bài báo về kế hoạch đề xuất của thành phố.
<br>(C) Ông ấy lo lắng rằng một dự án của thành phố sẽ gây hại cho việc kinh doanh của mình.
<br>(D) Ông ấy ủng hộ những nỗ lực thực hiện cải tiến.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn email của ông Houston (Passage 2):
<br><i>"I think it could create a problem for our business since it will be happening right in front of our store. Businesses are encouraged to remain open, but I'm worried that customers won't want to walk through a construction zone to come here."</i>
<br>- (Tôi nghĩ việc này có thể gây ra vấn đề cho công việc kinh doanh của chúng ta vì nó sẽ diễn ra ngay trước cửa hàng. Các doanh nghiệp được khuyến khích mở cửa, nhưng tôi lo rằng khách hàng sẽ không muốn đi qua công trường xây dựng để vào đây.)
<br>- Ông bày tỏ sự lo lắng dự án của thành phố sẽ ảnh hưởng xấu tới việc kinh doanh (harm his business).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>create a problem for our business / worried that customers won't want to walk through = harm his business</i>.</p>`,

  193: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Cửa hàng Houston Electronics nằm ở đâu?
<br>(A) Trên Đại lộ Kincaid.
<br>(B) Trên Đường Palin.
<br>(C) Trên Đường Denton Parkway.
<br>(D) Trên Phố Cardin.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Câu hỏi liên kết 2 văn bản (Passage 1 và Passage 3):
<br>+ Trong biểu mẫu gửi Nicholas Dow (Passage 3), ông Edwin Houston nêu: <i>"I am the owner of Houston Electronics, which is in the middle of the first construction route."</i> (Tôi là chủ sở hữu của Houston Electronics, nơi nằm ngay giữa tuyến đường thi công đầu tiên).
<br>+ Đối chiếu bài báo (Passage 1): <i>"The first street to be repaired will be Kincaid Avenue. Construction begins on August 20..."</i> (Con đường đầu tiên được sửa chữa sẽ là Đại lộ Kincaid).
<br>- Vì cửa hàng nằm trên tuyến đường thi công đầu tiên và con đường đầu tiên được sửa là Kincaid Avenue, suy ra Houston Electronics tọa lạc tại Đại lộ Kincaid.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Khớp chéo: <i>first construction route = first street to be repaired (Kincaid Avenue)</i>.</p>`,

  194: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Cô Walker được yêu cầu làm gì?
<br>(A) Thiết kế một tấm biển quảng cáo.
<br>(B) Sửa đổi tiến độ thi công.
<br>(C) Sắp xếp các lựa chọn đỗ xe thay thế.
<br>(D) Liên hệ với một bộ phận khác trong công ty.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trích đoạn cuối email của ông Houston (Passage 2):
<br><i>"While I wait for his response, could you contact our marketing team and suggest making some large promotional signs that we can put out front?"</i>
<br>- (Trong khi chờ ông ấy trả lời, cô có thể liên hệ với đội ngũ tiếp thị của chúng ta và đề xuất làm một số biển quảng cáo lớn để chúng ta đặt ở phía trước không?)
<br>- Ông Houston yêu cầu cô liên hệ với phòng marketing (contact another department in the company) chứ không yêu cầu cô tự tay thiết kế biển hiệu.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Bẫy (A) "Design a promotional sign": Bài chỉ bảo cô <i>contact our marketing team</i> để họ làm, cô không phải là người trực tiếp thiết kế.</p>`,

  195: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Chức vụ của Nicholas Dow là gì?
<br>(A) Nhà báo của tòa soạn.
<br>(B) Công nhân xây dựng.
<br>(C) Quan chức chính quyền địa phương.
<br>(D) Quản lý xúc tiến thương mại.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Câu hỏi liên kết 2 văn bản (Passage 2 và Passage 3):
<br>+ Trong email (Passage 2), ông Houston viết: <i>"I've already submitted a contact request to our city councilor and suggested another time that they can do the work. While I wait for his response..."</i> (Tôi đã gửi một yêu cầu liên hệ tới ủy viên hội đồng thành phố của chúng ta và đề xuất một thời điểm khác... Trong khi chờ phản hồi của ông ấy...).
<br>+ Ngay sau đó (Passage 3) là trang web biểu mẫu mà ông đã gửi: <i>"www.nicholasdow.com ... My message to Nicholas Dow ... I am the owner of Houston Electronics..."</i>
<br>- Như vậy Nicholas Dow chính là vị ủy viên hội đồng thành phố (city councilor), tức là một quan chức chính quyền (Government official).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Khái quát hóa danh xưng: <i>city councilor (nghị viên / ủy viên hội đồng thành phố) = government official</i>.</p>`,

  // SET 15: Q196 - Q200 (HDA Broadcasting Membership)
  196: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Điều gì được chỉ ra về HDA Broadcasting?
<br>(A) Tư cách thành viên có thể bị hủy bất cứ lúc nào.
<br>(B) Tổ chức này có một cửa hàng trực tuyến trên mạng Internet.
<br>(C) Tổ chức tài trợ bốn sự kiện mỗi năm.
<br>(D) Tổ chức gửi email hàng tuần.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Kiểm tra bảng "Annual Membership Levels" trong thông báo (Passage 1):
<br>Ở gói SPONSOR ($300): <i>"Includes all FAMILY benefits plus four guest passes and a 20% discount on our online merchandise."</i>
<br>- (Bao gồm tất cả quyền lợi của gói FAMILY cộng thêm bốn vé khách mời và giảm giá 20% cho hàng hóa trực tuyến của chúng tôi.)
<br>- Việc bán hàng hóa trực tuyến (<i>online merchandise</i>) chứng tỏ tổ chức có một cửa hàng trên mạng Internet (Internet-based store).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>online merchandise = Internet-based store</i>. Chú ý bẫy (D): bài ghi gửi <i>monthly e-mail updates</i> (hàng tháng), không phải weekly (hàng tuần).</p>`,

  197: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Hạng thành viên của cô Potter là gì?
<br>(A) Individual
<br>(B) Family
<br>(C) Supporter
<br>(D) Sponsor</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Câu hỏi liên kết 2 văn bản (Passage 1 và Passage 3):
<br>+ Trong biểu mẫu phản hồi (Passage 3), cô Charlotte Potter viết: <i>"I think the $125/year rate is a little high for what my membership gives me in return."</i> (Tôi nghĩ mức giá 125 đô la/năm là hơi cao so với những gì tư cách thành viên mang lại cho tôi).
<br>+ Đối chiếu bảng giá trong thông báo gia hạn (Passage 1):
<br>• INDIVIDUAL: $75
<br>• FAMILY: $200
<br>• <b>SUPPORTER: $125</b>
<br>• SPONSOR: $300
<br>- Mức phí 125 đô la/năm tương ứng chính xác với hạng thành viên <i>Supporter</i>.</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Khớp chéo thông tin giá tiền: Con số $125/năm ở văn bản 3 tương ứng với hạng thẻ <i>SUPPORTER - $125</i> ở văn bản 1.</p>`,

  198: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Trong bức thư, từ "network" ở đoạn 1 có nghĩa gần nhất với từ nào?
<br>(A) community (cộng đồng).
<br>(B) station (đài phát thanh/truyền hình).
<br>(C) grid (mạng lưới đường dây/lưới điện).
<br>(D) structure (cấu trúc).</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Ngữ cảnh câu chứa từ trong bức thư (Passage 2):
<br><i>"As a non-profit network, we rely on private funding to provide high-quality programming to our listeners."</i>
<br>- (Là một mạng lưới/đài phát sóng phi lợi nhuận, chúng tôi dựa vào nguồn tài trợ tư nhân để cung cấp các chương trình chất lượng cao cho thính giả của mình.)
<br>- Trong lĩnh vực truyền thông phát thanh - truyền hình (broadcasting), từ "network" dùng để chỉ một đài phát thanh/truyền hình hoặc một tổ chức phát sóng, đồng nghĩa với "station" (hoặc broadcasting station).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Từ đa nghĩa theo ngữ cảnh: Trong ngữ cảnh <i>Broadcasting / programming to listeners</i>, từ <i>network = station</i> (đài phát sóng).</p>`,

  199: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Cô Potter gợi ý/nhận xét điều gì về tư cách thành viên của HDA Broadcasting?
<br>(A) Tổ chức có thể bổ sung thêm một cấp độ thành viên khác.
<br>(B) Nó có giá cả phù hợp với các lợi ích được cung cấp.
<br>(C) Tổ chức nên cung cấp một tùy chọn gia hạn trực tuyến.
<br>(D) Ấn phẩm hàng tháng của tổ chức mang tính giáo dục/cung cấp nhiều thông tin bổ ích.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Trong biểu mẫu phản hồi (Passage 3), mục <i>"What is the most important benefit of membership?"</i>:
<br>Cô Potter trả lời: <i>"I really enjoy my copies of the HDA Broadcasting magazine. It is quite interesting and full of useful information."</i>
<br>- (Tôi thực sự thích các cuốn tạp chí HDA Broadcasting của mình. Nó khá thú vị và tràn ngập thông tin hữu ích.)
<br>- Nhận xét tạp chí <i>"full of useful information"</i> (chứa đầy thông tin hữu ích) đồng nghĩa với việc ấn phẩm hàng tháng mang tính giáo dục/cung cấp kiến thức (<i>educational</i>).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Paraphrasing: <i>full of useful information = educational / informative</i>.</p>`,

  200: `<p><b>Dịch nghĩa câu hỏi & đáp án:</b>
<br>Cô Potter yêu cầu gửi món đồ nào?
<br>(A) Vé tham dự sự kiện.
<br>(B) Thẻ thành viên.
<br>(C) Phiếu giảm giá.
<br>(D) Thông báo gia hạn.</p>
<p><b>Bằng chứng trích dẫn & Phân tích chi tiết:</b>
<br>- Câu hỏi liên kết 2 văn bản (Passage 2 và Passage 3):
<br>+ Bức thư kèm bưu phẩm (Passage 2) nêu: <i>"Enclosed with this letter you will find your new membership card and your guest passes."</i> (Được đính kèm với bức thư này, bạn sẽ tìm thấy thẻ thành viên mới và các vé mời khách của mình). Theo dự kiến, bưu kiện phải gồm 2 món: thẻ thành viên (membership card) và vé mời (guest passes).
<br>+ Tuy nhiên, trong phần phản hồi (Passage 3), cô Potter báo lại: <i>"I recently renewed my membership, but only my free passes were included with the thank you letter I received. Could you please send me the item that I am still missing?"</i> (Gần đây tôi đã gia hạn... nhưng chỉ có vé miễn phí được đính kèm trong thư. Bạn có thể vui lòng gửi cho tôi món đồ mà tôi vẫn còn thiếu không?).
<br>- Món đồ bị thiếu mà cô yêu cầu gửi bổ sung chính là chiếc thẻ thành viên (membership card).</p>
<p><b>Mẹo làm bài & Bẫy ETS:</b> Suy luận logic loại trừ: Thư liệt kê gửi <i>card + passes</i>, nhưng khách báo chỉ nhận được <i>passes</i> -> món đồ còn thiếu chính là <i>membership card</i>.</p>`
};

let count = 0;
for (const passageSet of part7Data) {
  for (const q of passageSet.questions) {
    if (explanations[q.number]) {
      q.explanation = explanations[q.number];
      count++;
    } else {
      console.warn(`Missing explanation for Q${q.number}`);
    }
  }
}

fs.writeFileSync(part7Path, JSON.stringify(part7Data, null, 2), 'utf8');
console.log(`Successfully updated ${count}/54 Part 7 explanations in ${part7Path}`);
