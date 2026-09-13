import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const p5Path = path.join(ROOT_DIR, 'public', 'data', 'ets2022', 'test1', 'part5.json');
const p5Data = JSON.parse(fs.readFileSync(p5Path, 'utf8'));

const explanations = {
  101: `<p><b>Dịch nghĩa:</b> Giá trị nhà ở tương đối đã giảm hơn 10% so với mức đỉnh điểm của chúng trong nửa đầu năm.</p>
<p><b>Phân tích ngữ pháp:</b> Chỗ trống đứng sau giới từ <i>'from'</i> và đứng trước danh từ <i>'peak'</i> (đỉnh điểm/mức cao nhất), vì vậy vị trí này bắt buộc cần một tính từ sở hữu để bổ nghĩa cho danh từ theo sau. Do đó, <b>(B) their</b> là đáp án chính xác.<br/>
- (A) <i>they</i>: đại từ nhân xưng chủ ngữ (đứng đầu câu làm S).<br/>
- (C) <i>them</i>: đại từ nhân xưng tân ngữ (đứng sau động từ hoặc giới từ đơn lẻ không có danh từ theo sau).<br/>
- (D) <i>theirs</i>: đại từ sở hữu (thay thế cho cụm tính từ sở hữu + danh từ, không đứng trước danh từ).</p>
<p><b>Mẹo giải nhanh:</b> Nhìn nhanh sau chỗ trống thấy danh từ <i>'peak'</i> -> chọn ngay tính từ sở hữu <b>their + N</b> trong 3 giây.</p>`,

  102: `<p><b>Dịch nghĩa:</b> Vườn bách thảo nằm ở phía nam của hòn đảo và có thể dễ dàng tìm thấy trên bất kỳ bản đồ nào.</p>
<p><b>Phân tích ngữ pháp:</b> Chủ ngữ <i>'The botanical garden'</i> (vườn bách thảo) là vật/địa điểm, không thể tự thực hiện hành động định vị mà được đặt tại vị trí đó, do vậy cần cấu trúc bị động: <b>be located + on/in/at</b> (nằm ở, tọa lạc tại). Xét về thì, câu diễn tả một sự thật hiển nhiên ở hiện tại (kết nối với <i>'and can easily be found'</i>), nên dạng bị động hiện tại đơn <b>(A) is located</b> là chính xác.<br/>
- (B) <i>locates</i>, (C) <i>locating</i>, (D) <i>was locating</i>: đều là các dạng chủ động.</p>
<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Cụm cố định kinh điển trong đề thi TOEIC: <b>be located in/on/at</b> = tọa lạc ở đâu. Thấy địa điểm làm chủ ngữ chọn ngay dạng bị động <i>is/are located</i>.</p>`,

  103: `<p><b>Dịch nghĩa:</b> Một bữa tiệc trưa đặc biệt dành cho đội ngũ quảng cáo sẽ được tổ chức tại sảnh tiệc chính của Khách sạn Phalya.</p>
<p><b>Phân tích từ vựng:</b> Câu có cấu trúc bị động ở tương lai <i>'will be ____'</i> và tân ngữ chỉ sự kiện <i>'A special luncheon'</i> (bữa trưa trang trọng). Trong tiếng Anh thương mại, cụm từ cố định để nói về việc tổ chức sự kiện/hội nghị/bữa tiệc là <b>hold an event/meeting/luncheon</b> (dạng bị động: <i>an event is held</i>). Do đó chọn <b>(C) held</b> (quá khứ phân từ của hold).<br/>
- (A) <i>staged</i>: dàn dựng (vở kịch, biểu tình).<br/>
- (B) <i>referred</i>: tham khảo (thường đi với <i>to</i>).<br/>
- (D) <i>went</i>: quá khứ của go (nội động từ, không dùng dạng bị động <i>be went</i>).</p>
<p><b>Mẹo giải nhanh:</b> Sự kiện/tiệc tùng (luncheon/meeting/conference/seminar) + be -> đi với <b>held</b> (được tổ chức).</p>`,

  104: `<p><b>Dịch nghĩa:</b> Bởi vì nhân viên mất nhiều thời gian ngoài dự kiến để làm quen với phần mềm mới, người quản lý văn phòng đang lên kế hoạch tổ chức một buổi hội thảo đào tạo.</p>
<p><b>Phân tích từ vựng:</b> Chỗ trống đứng trước tính từ <i>'long'</i> (kéo dài, lâu), cần một trạng từ chỉ mức độ để bổ nghĩa cho <i>'long'</i>. Dựa vào ngữ cảnh mệnh đề kết quả (quản lý phải mở lớp đào tạo), việc nhân viên làm quen phần mềm bị lâu bất thường/ngoài mong đợi. Do đó, <b>(B) unexpectedly</b> (một cách bất ngờ, ngoài dự kiến) là đáp án hợp lý nhất.<br/>
- (A) <i>immediately</i>: ngay lập tức.<br/>
- (C) <i>exactly</i>: một cách chính xác.<br/>
- (D) <i>attentively</i>: một cách chăm chú.</p>
<p><b>Mẹo giải nhanh:</b> Cụm <i>'unexpectedly long'</i> = lâu hơn dự tính ban đầu.</p>`,

  105: `<p><b>Dịch nghĩa:</b> Tất cả các nhân viên mới được tuyển dụng ở cấp quản lý nên tham dự buổi hội thảo đào tạo về các giá trị của công ty.</p>
<p><b>Phân tích ngữ pháp:</b> Danh từ sau chỗ trống là danh từ số nhiều đếm được: <i>'employees'</i> (các nhân viên). Ta xét các lượng từ ở 4 phương án:<br/>
- <b>(D) All</b>: đi với danh từ số nhiều đếm được (All + plural noun) hoặc danh từ không đếm được -> Phù hợp hoàn toàn với <i>'employees'</i>.<br/>
- (A) <i>Neither</i>: đi với danh từ số ít (Neither + singular noun).<br/>
- (B) <i>Every</i> và (C) <i>Each</i>: bắt buộc đi với danh từ số ít đếm được (Every/Each + singular noun).</p>
<p><b>Mẹo giải nhanh:</b> Thấy danh từ số nhiều <i>'employees'</i> -> loại ngay <i>Every, Each, Neither</i>, chọn ngay <b>All</b> trong 3 giây.</p>`,

  106: `<p><b>Dịch nghĩa:</b> Masara Bankole, một nhà báo từng đoạt giải thưởng tại tờ báo Toronto Star, đã đồng ý dẫn dắt chương trình phát thanh gây quỹ từ thiện.</p>
<p><b>Phân tích từ loại:</b> Cụm danh từ đồng vị đứng giữa hai dấu phẩy <i>'an award-winning ____'</i> bắt đầu bằng mạo từ <i>'an'</i> và tính từ ghép <i>'award-winning'</i>, do đó chỗ trống cần một danh từ số ít đếm được chỉ người để tương thích với tên riêng <i>'Masara Bankole'</i>. Hậu tố <b>-ist</b> là đuôi chỉ người, chọn <b>(B) journalist</b> (nhà báo).<br/>
- (A) <i>journal</i>: tạp chí, nhật ký (danh từ chỉ vật).<br/>
- (C) <i>journalism</i>: ngành báo chí (danh từ trừu tượng).<br/>
- (D) <i>journalistic</i>: thuộc về báo chí (tính từ).</p>
<p><b>Mẹo giải nhanh:</b> Masara Bankole là tên người + mạo từ <i>'an'</i> -> cần danh từ chỉ người số ít -> chọn đuôi <b>-ist (journalist)</b>.</p>`,

  107: `<p><b>Dịch nghĩa:</b> Mặc dù đã có đủ số lượng phòng ở khu nhà tập thể của công ty, một vài người tham dự đã lựa chọn ở tại một khách sạn gần đó.</p>
<p><b>Phân tích từ vựng:</b> Chỗ trống đứng trước danh từ <i>'hotel'</i>, cần một tính từ bổ nghĩa cho khách sạn. Trong văn cảnh đối lập với việc ở nhà công ty (housing), họ chọn ở khách sạn ở cự ly gần. <b>(C) nearby</b> là tính từ có nghĩa là 'ở gần, lân cận' (nearby hotel - khách sạn gần đó).<br/>
- (A) <i>next</i>: tiếp theo (thường dùng <i>next to</i> hoặc <i>the next day</i>).<br/>
- (B) <i>closest</i>: so sánh nhất, bắt buộc phải có <i>the</i> (the closest hotel).<br/>
- (D) <i>brief</i>: ngắn ngủi, vắn tắt.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Chú ý mạo từ <i>'a'</i> phía trước -> loại ngay <i>closest</i> vì so sánh nhất cần <i>the</i>.</p>`,

  108: `<p><b>Dịch nghĩa:</b> Trang phục Halloween của các giảng viên được hoan nghênh nhưng hoàn toàn là tùy chọn (không bắt buộc).</p>
<p><b>Phân tích từ vựng:</b> Cấu trúc <i>'be welcome but entirely ____'</i> thể hiện sự tương phản nhượng bộ: rất chào đón nhưng không ép buộc. Tính từ <b>(D) optional</b> mang nghĩa 'tùy ý, không bắt buộc' hoàn toàn khớp logic với từ nối <i>'but'</i>.<br/>
- (A) <i>open</i>: mở cửa, cởi mở.<br/>
- (B) <i>single</i>: đơn chiếc, độc thân.<br/>
- (C) <i>available</i>: có sẵn, rảnh rỗi.</p>
<p><b>Mẹo giải nhanh:</b> Cặp từ đối lập quen thuộc trong môi trường công sở: <i>mandatory (bắt buộc)</i> vs <i>optional (tùy chọn)</i>.</p>`,

  109: `<p><b>Dịch nghĩa:</b> Công ty xe hơi Saitama được kỳ vọng sẽ đạt được mục tiêu doanh số năm nay bằng cách đạt được con số doanh thu kỷ lục trong quý ba của năm.</p>
<p><b>Phân tích từ vựng:</b> Sau giới từ <i>'by'</i> cần danh động từ V-ing kết hợp với cụm tân ngữ <i>'record sales numbers'</i> (những con số doanh thu kỷ lục). Động từ diễn tả việc đạt được mục tiêu hoặc con số kỷ lục là <b>achieve</b> (achieve record sales numbers). Do đó chọn <b>(D) achieving</b>.<br/>
- (A) <i>arriving</i>: đến nơi (nội động từ, không có tân ngữ trực tiếp).<br/>
- (B) <i>cautioning</i>: cảnh báo.<br/>
- (C) <i>sympathizing</i>: thông cảm, đồng cảm.</p>
<p><b>Mẹo giải nhanh:</b> Cụm kết hợp từ (collocation): <b>achieve numbers/goals/targets</b> = đạt được con số/mục tiêu.</p>`,

  110: `<p><b>Dịch nghĩa:</b> Tập đoàn Image Horizon sáng nay đã thông báo rằng giám đốc tài chính của họ, bà Julia Park, sẽ thay thế bà Maholia Green làm tổng giám đốc điều hành vào ngày 22 tháng 3.</p>
<p><b>Phân tích từ vựng:</b> Sau trợ động từ <i>'will'</i> cần động từ nguyên mẫu diễn tả việc một nhân sự tiếp nhận vị trí của người tiền nhiệm. Động từ <b>replace someone as [position]</b> nghĩa là 'thay thế ai ở vị trí nào'. Do đó chọn <b>(C) replace</b>.<br/>
- (A) <i>organize</i>: tổ chức, sắp xếp.<br/>
- (B) <i>accomplish</i>: hoàn thành, đạt được.<br/>
- (D) <i>account</i>: giải thích (phải đi với <i>for</i>: account for).</p>
<p><b>Mẹo giải nhanh:</b> Cấu trúc nhân sự thăng chức: <b>replace A as B</b> (thay thế A làm chức vụ B).</p>`,

  111: `<p><b>Dịch nghĩa:</b> Hãng xe máy Montaz muốn làm cho mối quan hệ đối tác giữa bộ phận sản phẩm và bộ phận nghiên cứu trở nên bền chặt hơn.</p>
<p><b>Phân tích ngữ pháp:</b> Cấu trúc tác động của động từ <i>'make'</i>: <b>make + tân ngữ (O) + tính từ (adj)</b> (làm cho cái gì trở nên như thế nào). Tân ngữ ở đây là cụm <i>'the partnership between...'</i>, do đó chỗ trống cần một tính từ. <b>(C) stronger</b> là tính từ dạng so sánh hơn (bền chặt hơn/vững mạnh hơn).<br/>
- (A) <i>strength</i>: danh từ (sức mạnh).<br/>
- (B) <i>strengthens</i>: động từ chia ngôi thứ 3 số ít.<br/>
- (D) <i>strongly</i>: trạng từ.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Rất nhiều thí sinh nhầm tưởng động từ <i>'make'</i> đi với trạng từ (-ly). Hãy nhớ công thức: <b>make + O + adj</b>.</p>`,

  112: `<p><b>Dịch nghĩa:</b> Khu trưng bày tại Phòng trưng bày nghệ thuật Raymond sẽ giới thiệu một số tác phẩm nghệ thuật sáng tạo tuyệt vời của các nghệ sĩ đương đại đầy triển vọng.</p>
<p><b>Phân tích từ loại:</b> Cụm danh từ phía sau là <i>'creative art works'</i>, trong đó <i>'creative'</i> là tính từ bổ nghĩa cho danh từ <i>'art works'</i>. Đứng trước một tính từ để bổ nghĩa mức độ cho tính từ đó, ta cần một trạng từ (Adv + Adj + N). Trạng từ có đuôi <b>-ly</b> là <b>(D) amazingly</b> (một cách đáng kinh ngạc, tuyệt vời).<br/>
- (A) <i>amaze</i>: động từ nguyên mẫu.<br/>
- (B) <i>amazed</i>: tính từ (chỉ cảm xúc con người).<br/>
- (C) <i>amazement</i>: danh từ (sự kinh ngạc).</p>
<p><b>Mẹo giải nhanh:</b> Công thức trật tự từ: <b>Adv + Adj + Noun</b> (amazingly + creative + works).</p>`,

  113: `<p><b>Dịch nghĩa:</b> Dù các thành viên trong đoàn tham quan đi du thuyền ngắm cảnh trên đường thủy hay dành cả ngày ghé thăm bảo tàng, họ cũng sẽ cảm thấy thư thái và thoải mái.</p>
<p><b>Phân tích ngữ pháp:</b> Đầu câu có từ <i>'Whether'</i>. Liên từ tương quan chuẩn mực trong tiếng Anh là <b>Whether ... or ...</b> (dù ... hay ...). Do đó chọn <b>(D) or</b>.<br/>
- (A) <i>both</i>: đi với <i>and</i> (both ... and ...).<br/>
- (B) <i>also</i>: phó từ/trạng từ.<br/>
- (C) <i>nor</i>: đi với <i>neither</i> (neither ... nor ...).</p>
<p><b>Mẹo giải nhanh:</b> Thấy <i>Whether</i> ở đầu mệnh đề -> tìm ngay <b>or</b> để khép lại cặp liên từ tương quan.</p>`,

  114: `<p><b>Dịch nghĩa:</b> Động cơ diesel cải tiến mới hoạt động êm ái hơn so với các động cơ cạnh tranh khác của các công ty khác.</p>
<p><b>Phân tích ngữ pháp:</b> Động từ trong câu là <i>'works'</i> (hoạt động - nội động từ), cần một trạng từ đứng sau để bổ nghĩa (work quietly). Phía sau có từ so sánh <b>than</b>, do đó ta cần dạng so sánh hơn của trạng từ nhiều âm tiết: <b>more + adverb + than</b>. Do đó, <b>(D) more quietly</b> là đáp án chính xác.<br/>
- (A) <i>quiet</i>, (C) <i>more quiet</i>: tính từ.<br/>
- (B) <i>quietly</i>: trạng từ nguyên thể, thiếu <i>more</i> để so sánh với <i>than</i>.</p>
<p><b>Mẹo giải nhanh:</b> Bổ nghĩa cho động từ thường <i>'works'</i> cần trạng từ (-ly), kết hợp với <i>'than'</i> -> <b>more quietly</b>.</p>`,

  115: `<p><b>Dịch nghĩa:</b> Trung tâm dịch vụ được đề xuất sẽ cung cấp các dịch vụ bổ sung cho các khách hàng của Kovac Industry trong khu vực.</p>
<p><b>Phân tích cấu trúc:</b> Cấu trúc với động từ <i>'provide'</i>:<br/>
1. <b>provide someone with something</b> (cung cấp cho ai cái gì)<br/>
2. <b>provide something to/for someone</b> (cung cấp cái gì cho ai)<br/>
Ở đây tân ngữ trực tiếp là <i>'additional services'</i> (dịch vụ bổ sung) và đối tượng thụ hưởng là <i>'Kovac Industry customers'</i>. Do đó giới từ phù hợp là <b>(B) to</b>.<br/>
- (A) <i>up</i>, (C) <i>of</i>, (D) <i>out</i>: không tạo thành cụm ngữ nghĩa đúng với provide.</p>
<p><b>Mẹo giải nhanh:</b> <i>provide services TO customers</i> (cung cấp dịch vụ ĐẾN khách hàng).</p>`,

  116: `<p><b>Dịch nghĩa:</b> Công ty The Gift Boy có một hệ thống tự động gửi xác nhận về mỗi đơn hàng trực tuyến qua thư điện tử.</p>
<p><b>Phân tích từ loại:</b> Động từ ngoại động từ <i>'send'</i> (gửi) cần một tân ngữ danh từ theo sau (send + Noun). Trong 4 lựa chọn, từ có hậu tố danh từ <b>-tion</b> là <b>(D) confirmation</b> (giấy/thư xác nhận).<br/>
- (A) <i>confirms</i>: động từ thêm s.<br/>
- (B) <i>confirmed</i>: động từ quá khứ/phân từ.<br/>
- (C) <i>confirming</i>: danh động từ (nếu dùng V-ing thì cần tân ngữ trực tiếp sau nó, không đi liền với <i>of</i> theo cách này).</p>
<p><b>Mẹo giải nhanh:</b> Sau ngoại động từ <i>'send'</i> cần tân ngữ danh từ -> chọn ngay <b>confirmation</b> (đuôi -tion).</p>`,

  117: `<p><b>Dịch nghĩa:</b> Công ty Reed-Winton Machines gần đây đã thông báo rằng các nhà nghiên cứu của họ đang ở giai đoạn cuối cùng trong việc phát triển một động cơ chạy bằng khí tự nhiên mang tính cách mạng mới.</p>
<p><b>Phân tích từ vựng & thì:</b> Động từ trong câu chia ở thì quá khứ đơn <i>'announced'</i>. Trạng từ chỉ thời gian thường đi kèm thì quá khứ đơn hoặc hiện tại hoàn thành để chỉ sự việc vừa mới xảy ra là <b>(A) recently</b> (gần đây, vừa mới).<br/>
- (B) <i>financially</i>: về mặt tài chính.<br/>
- (C) <i>permanently</i>: một cách vĩnh viễn, lâu dài.<br/>
- (D) <i>hardly</i>: hầu như không (mang nghĩa phủ định).</p>
<p><b>Mẹo giải nhanh:</b> Dấu hiệu thì quá khứ đơn <i>'announced'</i> -> trạng từ chỉ thời gian rất hay gặp trong TOEIC: <b>recently</b> (gần đây).</p>`,

  118: `<p><b>Dịch nghĩa:</b> Những du khách quan tâm đến chuyến dã ngoại ngày mai tới Đảo Ko Kret có thể tham gia đoàn tham quan bằng cách đăng ký tại quầy lễ tân.</p>
<p><b>Phân tích từ vựng:</b> Sau sở hữu cách <i>'tomorrow’s'</i> cần một danh từ. Ngữ cảnh câu nói về chuyến đi đến hòn đảo và tham gia nhóm tour (tour group), vì vậy danh từ phù hợp nhất là <b>(A) excursion</b> (chuyến du ngoạn, chuyến dã ngoại ngắn ngày).<br/>
- (B) <i>itinerary</i>: lịch trình (bản kế hoạch các điểm đến).<br/>
- (C) <i>reservation</i>: sự đặt chỗ trước.<br/>
- (D) <i>proposal</i>: bản đề xuất.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Đi đến một địa danh đảo (to Ko Kret Island) chỉ một chuyến đi thực tế -> dùng <b>excursion to [place]</b>, không dùng itinerary (lịch trình giấy tờ).</p>`,

  119: `<p><b>Dịch nghĩa:</b> Trong số tất cả những khách hàng đã phản hồi khảo sát, 80% thường mua các sản phẩm công nghiệp trực tuyến.</p>
<p><b>Phân tích ngữ pháp:</b> Mệnh đề quan hệ bổ nghĩa cho danh từ chỉ người đi trước <i>'the customers'</i>. Mệnh đề này khuyết chủ ngữ đứng trước động từ <i>'responded'</i>, do đó cần một đại từ quan hệ thay thế cho người làm chủ ngữ: <b>(A) who</b>.<br/>
- (B) <i>whose</i>: đại từ quan hệ sở hữu (sau whose phải là danh từ).<br/>
- (C) <i>they</i>: đại từ nhân xưng (tạo thành hai mệnh đề không có liên từ nối, sai ngữ pháp).<br/>
- (D) <i>what</i>: không dùng làm đại từ quan hệ sau danh từ chỉ người.</p>
<p><b>Mẹo giải nhanh:</b> Danh từ chỉ người <i>(customers)</i> + chỗ trống + động từ <i>(responded)</i> -> chọn ngay <b>who</b>.</p>`,

  120: `<p><b>Dịch nghĩa:</b> Thư viện Quốc hội mở cửa cho tất cả công chúng, nhưng sách không được phép mượn về nhà.</p>
<p><b>Phân tích cụm từ cố định:</b> Cấu trúc diễn tả một địa điểm công cộng mở cửa đón chào mọi người vào tham quan, sử dụng là <b>be open to the public / someone</b> (mở cửa cho ai). Do đó chọn <b>(C) open</b>.<br/>
- (A) <i>invited</i>: được mời (thường là be invited to do something).<br/>
- (B) <i>right</i>: đúng đắn, phù hợp.<br/>
- (D) <i>intended</i>: được dự định dành cho (be intended for).</p>
<p><b>Mẹo giải nhanh:</b> Cụm từ cố định phổ biến: <b>be open to the public</b> (mở cửa cho công chúng).</p>`,

  121: `<p><b>Dịch nghĩa:</b> Nhà tuyển dụng phụ trách vị trí còn trống sẽ xem xét các hồ sơ ứng tuyển và liên hệ với các ứng viên trong vòng năm ngày làm việc tới.</p>
<p><b>Phân tích ngữ pháp:</b> Cụm từ chỉ khoảng thời gian phía sau là <i>'the next five working days'</i> (5 ngày làm việc tới). Giới từ dùng để chỉ hành động xảy ra bên trong một khoảng thời gian nhất định là <b>within + khoảng thời gian</b> (trong vòng / trong thời hạn). Do đó chọn <b>(D) within</b>.<br/>
- (A) <i>toward</i>: về phía (hướng di chuyển hoặc thời gian gần kề, không đi với khoảng ngày).<br/>
- (B) <i>between</i>: ở giữa hai mốc (phải có <i>and</i>: between A and B).<br/>
- (C) <i>among</i>: giữa nhiều người/vật (từ 3 đối tượng trở lên).</p>
<p><b>Mẹo giải nhanh:</b> Thấy cụm chỉ khoảng thời gian có số lượng ngày/giờ <i>(the next five working days)</i> -> chọn <b>within</b> (trong vòng).</p>`,

  122: `<p><b>Dịch nghĩa:</b> Do điều kiện thời tiết bất lợi, tất cả các con tàu dự kiến khởi hành từ Cảng Bremerhaven đã bị hoãn lại.</p>
<p><b>Phân tích từ vựng:</b> Mệnh đề chỉ nguyên nhân <i>'Due to ____ weather conditions'</i> giải thích cho việc tàu thuyền bị hoãn xuất bến (have been delayed). Vì vậy, tính từ bổ nghĩa cho thời tiết phải mang nghĩa tiêu cực/xấu. <b>(B) unfavorable</b> nghĩa là 'bất lợi, không thuận lợi' (unfavorable weather - thời tiết bất lợi).<br/>
- (A) <i>functional</i>: hoạt động tốt, có tính thực dụng.<br/>
- (C) <i>promoted</i>: được thăng chức, được quảng bá.<br/>
- (D) <i>incomplete</i>: chưa hoàn thành, dở dang.</p>
<p><b>Mẹo giải nhanh:</b> Thấy tàu xe, chuyến bay bị hoãn (delayed/cancelled) do thời tiết -> tìm ngay từ <b>unfavorable / severe / inclement</b> weather.</p>`,

  123: `<p><b>Dịch nghĩa:</b> Trong thập kỷ qua, đã có rất ít thành tựu nghiên cứu y khoa đáng kể liên quan đến các yếu tố có thể ảnh hưởng đến trí nhớ của con người.</p>
<p><b>Phân tích từ loại:</b> Chỗ trống đứng trước từ chỉ số lượng/tính từ <i>'little'</i> (rất ít). Để bổ nghĩa cho một tính từ hoặc từ hạn định, ta cần một trạng từ chỉ mức độ (Adverb + Adjective). Trạng từ <b>(A) remarkably</b> mang nghĩa 'một cách đáng kể, rõ rệt' (remarkably little - ít một cách đáng kể).<br/>
- (B) <i>remarked</i>: động từ quá khứ.<br/>
- (C) <i>remark</i>: danh từ/động từ nguyên mẫu.<br/>
- (D) <i>remarking</i>: phân từ hiện tại.</p>
<p><b>Mẹo giải nhanh:</b> Bổ nghĩa cho <i>little / few / high</i> cần một trạng từ đuôi <b>-ly (remarkably)</b>.</p>`,

  124: `<p><b>Dịch nghĩa:</b> Phải tuân theo đúng trình tự các bước để đảm bảo rằng chiếc tivi được gắn lên tường một cách chắc chắn.</p>
<p><b>Phân tích từ vựng:</b> Chỗ trống đứng sau tính từ <i>'proper'</i> (đúng đắn, chuẩn mực) và trước cụm <i>'of steps'</i> (các bước hướng dẫn). Cụm từ mang nghĩa 'trình tự/thứ tự các bước' là <b>sequence of steps</b>. Do đó chọn <b>(C) sequence</b>.<br/>
- (A) <i>expertise</i>: chuyên môn.<br/>
- (B) <i>direction</i>: phương hướng, sự chỉ dẫn.<br/>
- (D) <i>range</i>: phạm vi, dãy.</p>
<p><b>Mẹo giải nhanh:</b> Đi với <i>'of steps'</i> trong lắp ráp/quy trình chỉ có <b>sequence of steps</b> (trình tự các bước).</p>`,

  125: `<p><b>Dịch nghĩa:</b> Ông Fernandez đã gọi điện để hỏi xem liệu cuộc họp sáng thứ Hai của ông ấy có thể hoãn lại cho đến cuối tuần hay không.</p>
<p><b>Phân tích ngữ pháp:</b> Động từ là <i>'postponed'</i> (trì hoãn). Giới từ đi với hành động trì hoãn để chỉ mốc thời gian chuyển tới là <b>postpone until / till + time</b> (hoãn lại cho đến khi). Phía sau có mốc thời gian <i>'later in the week'</i> (cuối tuần), vì vậy chọn <b>(D) until</b>.<br/>
- (A) <i>during</i>: trong suốt (đi với khoảng thời gian, không đi với hành động hoãn lại).<br/>
- (B) <i>when</i>: liên từ chỉ thời gian (sau when cần một mệnh đề S + V).<br/>
- (C) <i>since</i>: kể từ khi (chỉ mốc bắt đầu trong quá khứ).</p>
<p><b>Mẹo giải nhanh:</b> Cặp động từ - giới từ cố định: <b>postpone / delay UNTIL [mốc thời gian]</b>.</p>`,

  126: `<p><b>Dịch nghĩa:</b> Công ty Công nghệ Delain đang tích cực tìm kiếm các lập trình viên máy tính dày dạn kinh nghiệm với các kỹ năng chuyên môn hóa giúp họ giải quyết các nhu cầu bảo mật khắt khe nhất của khách hàng.</p>
<p><b>Phân tích từ loại:</b> Chỗ trống đứng sau giới từ <i>'with'</i> và đứng trước danh từ <i>'skills'</i> (kỹ năng), do đó vị trí này cần một tính từ bổ nghĩa cho danh từ. Phân từ hai đóng vai trò tính từ mang nghĩa 'được chuyên môn hóa, mang tính chuyên môn' là <b>(B) specialized</b> (specialized skills - kỹ năng chuyên môn).<br/>
- (A) <i>specialize</i>: động từ nguyên mẫu.<br/>
- (C) <i>specializing</i>: phân từ chủ động (không dùng để mô tả tính chất kỹ năng).<br/>
- (D) <i>specialization</i>: danh từ (sự chuyên môn hóa).</p>
<p><b>Mẹo giải nhanh:</b> Cụm danh từ kinh điển trong tuyển dụng TOEIC: <b>specialized skills / knowledge</b> (kỹ năng / kiến thức chuyên môn).</p>`,

  127: `<p><b>Dịch nghĩa:</b> Công ty Năng lượng Watertrek gần đây đã phải tăng mức giá điện mà họ thu do các chi phí ngày càng tăng cao.</p>
<p><b>Phân tích từ vựng:</b> Sau <i>'had to'</i> cần động từ nguyên mẫu tác động lên tân ngữ <i>'the rate it charges for electricity'</i> (mức giá tính tiền điện). Dựa vào nguyên nhân <i>'rising expenses'</i> (chi phí leo thang), công ty buộc phải tăng giá. Động từ phù hợp là <b>(D) increase</b> (tăng lên).<br/>
- (A) <i>pretend</i>: giả vờ.<br/>
- (B) <i>repair</i>: sửa chữa.<br/>
- (C) <i>remind</i>: nhắc nhở.</p>
<p><b>Mẹo giải nhanh:</b> Cụm từ thường gặp: <b>increase the rate / price</b> (tăng giá/tỷ lệ) khi chi phí tăng <i>(rising expenses)</i>.</p>`,

  128: `<p><b>Dịch nghĩa:</b> Rèm cửa và màn sáo đầy màu sắc của Công ty Màn sáo Venetian được bảo đảm sẽ nâng tầm bầu không khí ngôi nhà của bạn.</p>
<p><b>Phân tích từ vựng:</b> Sau <i>'guaranteed to'</i> cần động từ nguyên mẫu kết hợp với tân ngữ <i>'your home atmosphere'</i> (bầu không khí gia đình). Động từ <b>enhance</b> mang nghĩa 'nâng cao, làm tăng thêm, làm đẹp thêm' giá trị/chất lượng hoặc không gian. Do đó chọn <b>(A) enhance</b>.<br/>
- (B) <i>illustrate</i>: minh họa bằng hình ảnh.<br/>
- (C) <i>describe</i>: miêu tả.<br/>
- (D) <i>accelerate</i>: tăng tốc (tốc độ xe, tiến độ dự án).</p>
<p><b>Mẹo giải nhanh:</b> <b>enhance atmosphere / quality / experience</b> = nâng cao bầu không khí / chất lượng / trải nghiệm.</p>`,

  129: `<p><b>Dịch nghĩa:</b> Chuỗi Cà phê Espresso Kilimanjaro phát tặng cốc sứ thay vì các mặt hàng khuyến mãi khác vì độ bền và tính dễ nhận diện của chúng.</p>
<p><b>Phân tích từ loại & ngữ pháp:</b> Phía sau chỗ trống là cụm danh từ số nhiều <i>'promotional items'</i> (các mặt hàng quảng bá). Ta xét cách dùng của các từ định lượng:<br/>
- <b>(A) other</b>: đi với danh từ số nhiều đếm được (other + plural N) mang nghĩa 'những cái khác'. Rất phù hợp với <i>'promotional items'</i>.<br/>
- (B) <i>another</i>: chỉ đi với danh từ số ít đếm được (another + singular N).<br/>
- (C) <i>another one</i>: bản thân là một đại từ, không đứng trước danh từ khác.<br/>
- (D) <i>each other</i>: đại từ mang nghĩa 'lẫn nhau' (tân ngữ chỉ sự tương tác giữa 2 người/vật).</p>
<p><b>Mẹo giải nhanh:</b> Thấy danh từ số nhiều có đuôi -s <i>(promotional items)</i> -> chọn ngay <b>other</b> (loại <i>another</i> vì another chỉ đi với danh từ số ít).</p>`,

  130: `<p><b>Dịch nghĩa:</b> Tại bữa tiệc tối nghỉ hưu vào tuần trước, ông Kenichi Tatsumi đã được vinh danh vì 30 năm cống hiến cho Tập đoàn Kỹ thuật Range.</p>
<p><b>Phân tích ngữ pháp & thì:</b><br/>
1. Về thì: Cụm trạng từ chỉ thời gian trong quá khứ <i>'last week'</i> (tuần trước) yêu cầu động từ chính phải chia ở thì quá khứ đơn.<br/>
2. Về thể: Chủ ngữ <i>'Kenichi Tatsumi'</i> là người được ban lãnh đạo và đồng nghiệp tôn vinh (chứ không phải tự vinh danh ai đó, phía sau không có tân ngữ người). Do đó cần dạng bị động của thì quá khứ đơn: <b>was/were + V3/ed</b> -> <b>(D) was honored</b>.<br/>
- (A) <i>honored</i>: chủ động quá khứ (thiếu tân ngữ).<br/>
- (B) <i>had honored</i>: quá khứ hoàn thành chủ động.<br/>
- (C) <i>to be honored</i>: dạng to-V, không thể làm động từ chính của câu.</p>
<p><b>Mẹo giải nhanh:</b> Có <i>'last week'</i> (quá khứ) + được tôn vinh vì sự cống hiến <i>(be honored for service)</i> -> chọn bị động quá khứ đơn <b>was honored</b>.</p>`
};

let updatedCount = 0;
p5Data.forEach(q => {
  if (explanations[q.number]) {
    q.explanation = explanations[q.number];
    updatedCount++;
  }
});

fs.writeFileSync(p5Path, JSON.stringify(p5Data, null, 2), 'utf8');
console.log(`✅ Successfully updated ${updatedCount}/30 Part 5 explanations in ${p5Path}`);
