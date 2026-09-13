import fs from 'fs';
import path from 'path';

const part6Path = path.resolve('public/data/ets2022/test1/part6.json');
const part6Data = JSON.parse(fs.readFileSync(part6Path, 'utf8'));

const explanations = {
  131: `<p><b>Dịch nghĩa:</b> Phòng CNTT duy trì trạng thái hoạt động tốt của tất cả phần cứng máy tính tại chỗ. Chúng tôi cũng đảm bảo rằng phần mềm đi kèm đang hoạt động ở mức hiệu suất cao nhất.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Cấu trúc mệnh đề danh từ sau động từ "ensure": <i>We also ensure that + S (the accompanying software) + V</i>.
<br>- Chủ ngữ <i>"the accompanying software"</i> là danh từ không đếm được số ít, nên mệnh đề cần một động từ vị ngữ chia số ít.
<br>- (A) functionally: phó từ, không làm vị ngữ.
<br>- (B) functional: tính từ, không làm vị ngữ.
<br>- (C) to function: to-V, không làm động từ chính chia thì.
<br>- (D) is functioning: động từ thì hiện tại tiếp diễn, số ít, phù hợp hoàn toàn về ngữ pháp và diễn tả tình trạng đang vận hành trơn tru.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Sau liên từ "that", ta cần một mệnh đề hoàn chỉnh (S + V). Đừng nhầm "accompanying" là động từ chính, nó chỉ là tính từ bổ nghĩa cho danh từ "software". Vì vậy vị trí trống bắt buộc phải là động từ chính (finite verb).</p>`,

  132: `<p><b>Dịch nghĩa:</b> Nếu bạn gặp sự cố với máy tính văn phòng của mình, vui lòng liên hệ với phòng CNTT theo số máy nhánh 233 và để lại lời nhắn giải thích sự cố.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- (A) problem: vấn đề, sự cố kỹ thuật (phù hợp với ngữ cảnh máy tính bị trục trặc).
<br>- (B) charge: chi phí, tiền phí.
<br>- (C) meeting: cuộc họp.
<br>- (D) decision: quyết định.
<br>- Cụm từ thông dụng: <i>explain the problem</i> (giải thích sự cố/trục trặc gặp phải).</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Câu trước có manh mối rõ ràng: <i>"having trouble with your office computer"</i> (gặp rắc rối với máy tính). Từ đồng nghĩa phù hợp nhất để thay thế cho "trouble" chính là "problem".</p>`,

  133: `<p><b>Dịch nghĩa:</b>
<br>- Câu trước: <i>"Điều này bao gồm cả thời điểm sự cố bắt đầu xuất hiện."</i>
<br>- (A) Việc tắt máy tính và bật lại sẽ không giải quyết được vấn đề.
<br>- (B) Hãy cho chúng tôi biết bạn đang làm gì ngay trước khi xảy ra sự cố.
<br>- (C) Hơn nữa, các kết nối không đúng cách có thể là nguyên nhân gây ra lỗi.
<br>- (D) Chúng tôi sẽ cố gắng trả lời mọi câu hỏi của bạn về thiết bị của bạn.
<br>- Câu sau: <i>"Chúng tôi càng có nhiều thông tin, chúng tôi càng tìm ra giải pháp nhanh hơn."</i></p>
<p><b>Phân tích logic điền câu:</b> Đoạn văn đang yêu cầu nhân viên cung cấp càng nhiều thông tin chi tiết càng tốt khi báo cáo sự cố (<i>"include as many details as possible"</i>). Câu (B) tiếp nối mạch liệt kê các thông tin cần báo cáo: câu trước nói về thời điểm bắt đầu (<i>when the issue began</i>), câu (B) bổ sung thêm thao tác ngay trước lúc lỗi (<i>what you were doing immediately prior to it</i>, với "it" quy chiếu cho "the issue").</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Chú ý đại từ thay thế: từ "it" ở cuối câu (B) chính là đại từ quy chiếu chính xác cho "the issue" ở câu đứng ngay trước. Mối liên kết đại từ quy chiếu là chìa khóa vàng trong dạng câu Sentence Insertion Part 6.</p>`,

  134: `<p><b>Dịch nghĩa:</b> Chúng tôi sẽ nhanh chóng liên hệ với bạn để sắp xếp thời gian cho một kỹ thuật viên đến kiểm tra.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Vị trí giữa trợ động từ "will" và động từ chính "contact" cần một trạng từ chỉ cách thức/thời gian để bổ nghĩa cho "contact".
<br>- (A) casually: một cách tình cờ, bình thường, xuề xòa.
<br>- (B) collectively: một cách tập thể, chung.
<br>- (C) frequently: thường xuyên.
<br>- (D) promptly: nhanh chóng, ngay lập tức, không chậm trễ.
<br>- Khi bộ phận hỗ trợ IT tiếp nhận sự cố, cam kết chuẩn mực luôn là phản hồi/liên hệ nhanh chóng (<i>promptly contact</i>).</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Trong thư từ và thông báo công vụ TOEIC, trạng từ "promptly" (hoặc "prompt response", "reply promptly") là từ vựng xuất hiện với tần suất cực cao để thể hiện sự phục vụ chuyên nghiệp và kịp thời.</p>`,

  135: `<p><b>Dịch nghĩa:</b> Tôi vừa nhận thấy rằng có một sự cố xảy ra với dự án Lambert. Rõ ràng là các áp phích cho buổi ra mắt sản phẩm của họ có chứa một lỗi in ấn.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Vị trí đứng sau mạo từ "a" cần một danh từ đếm được số ít.
<br>- (A) statement: bản tuyên bố, sao kê.
<br>- (B) correction: sự sửa đổi, hiệu đính.
<br>- (C) misprint: lỗi in ấn, lỗi chính tả khi in.
<br>- (D) location: vị trí, địa điểm.
<br>- Căn cứ câu tiếp theo: <i>"The company name was typed incorrectly in the heading"</i> (Tên công ty bị gõ sai trong tiêu đề), việc in sai tên công ty chính là một "misprint".</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Chú ý tiêu đề email: <i>"Subject: Spelling error on Lambert posters"</i>. Cụm "Spelling error" (lỗi chính tả) tương đương trực tiếp với "misprint" (lỗi in ấn).</p>`,

  136: `<p><b>Dịch nghĩa:</b> Với tư cách là người liên lạc cho khách hàng này, tôi cần bạn liên hệ với ông Lambert, thông báo cho ông ấy về vấn đề này và xin lỗi vì sự sơ suất đó.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Cấu trúc cấu tạo song hành (parallel structure) sau "need you to + V-bare":
<br><i>need you to [contact Mr. Lambert], [notify him of the issue], and [(136) apologize for the oversight]</i>.
<br>- Ba động từ nối với nhau bởi dấu phẩy và liên từ "and" phải cùng dạng nguyên mẫu (V-bare): contact, notify, và apologize.
<br>- (A) apologizing: dạng V-ing.
<br>- (B) apologized: dạng quá khứ V-ed.
<br>- (C) apologizes: dạng V-s/es.
<br>- (D) apologize: dạng động từ nguyên thể V-bare.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Cấu trúc song hành với liên từ "and" là dạng bài kinh điển của Part 6. Hãy tìm động từ nguyên mẫu đứng trước "and" để xác định dạng thức tương ứng.</p>`,

  137: `<p><b>Dịch nghĩa:</b> Vì chúng ta chịu trách nhiệm cho sai sót này, xin vui lòng trấn an ông Lambert rằng việc in lại áp phích sẽ được thực hiện bằng chi phí của chúng tôi và sẽ hoàn thành vào cuối tuần sau.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Mệnh đề chỉ lý do: <i>"Because we were responsible for this error"</i> (chủ ngữ là "we").
<br>- Vị trí cần một tính từ sở hữu đứng trước danh từ "expense".
<br>- (A) our: của chúng tôi (phù hợp với chủ ngữ "we").
<br>- (B) his: của anh ấy.
<br>- (C) its: của nó.
<br>- (D) them: đại từ tân ngữ (không thể đứng trước danh từ).
<br>- Cụm thành ngữ cố định: <i>at one's expense</i> (do ai chịu chi phí). Ở đây công ty in ấn nhận lỗi nên sẽ in lại bằng chi phí của công ty: <i>at our expense</i>.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Cụm từ "at our expense" / "at the company's expense" (tự chịu mọi chi phí) là cụm từ xuất hiện liên tục trong các tình huống đền bù, bảo hành của bài thi TOEIC.</p>`,

  138: `<p><b>Dịch nghĩa:</b>
<br>- (A) Ông Lambert đã phê duyệt phiên bản cuối cùng, vì vậy dự án này hiện đã hoàn tất.
<br>- (B) Mọi khiếu nại sản xuất thêm có thể được gửi trực tiếp cho tôi.
<br>- (C) Chúng ta hãy lên lịch một cuộc họp để xác định giải pháp phù hợp.
<br>- (D) Vui lòng liên hệ với tôi khi bạn nhận được tiền thanh toán cho các bản in lại.</p>
<p><b>Phân tích logic điền câu:</b> Người gửi email là Joseph Craig - Production Manager (Quản lý sản xuất). Sau khi hướng dẫn nhân viên liên hệ xin lỗi khách hàng và cam kết in lại miễn phí, với vai trò quản lý sản xuất, ông kết luận rằng nếu còn bất kỳ khiếu nại nào về khâu sản xuất thì chuyển thẳng cho ông xử lý.
<br>- (A) sai vì dự án đang bị lỗi in ấn, chưa thể hoàn tất.
<br>- (C) không phù hợp vì phương án xử lý đã được chốt xong (in lại miễn phí).
<br>- (D) sai vì công ty in lại bằng chi phí của mình (at our expense), không thu tiền khách.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Hãy để ý chức danh của người viết ở cuối thư: <i>"Production Manager"</i> kết nối chặt chẽ với cụm <i>"production complaints"</i> trong câu (B).</p>`,

  139: `<p><b>Dịch nghĩa:</b> Để ghi nhận những thành tích của mình, anh ấy đã được trao tặng một chuyến đi Tây Ban Nha miễn phí toàn bộ chi phí dành cho hai người, nơi anh sẽ ở trong một khách sạn sang trọng trong bảy ngày.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Vị trí đứng sau tính từ sở hữu "his" cần một danh từ.
<br>- (A) achievements: những thành tích, thành tựu đạt được.
<br>- (B) promotions: các đợt thăng chức, chương trình khuyến mãi.
<br>- (C) lessons: các bài học.
<br>- (D) studies: các nghiên cứu.
<br>- Cụm từ cố định: <i>in recognition of his achievements</i> (để ghi nhận/tưởng thưởng cho những thành tích của anh ấy).
<br>- Trước đó đoạn văn đề cập: <i>"won the National Negotiation Prize this year"</i> (đoạt giải thưởng đàm phán quốc gia) - đây chính là một thành tích nổi bật.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Cụm cố định <i>"in recognition of + achievements/contributions/service"</i> (nhằm ghi nhận thành tích/đóng góp) là mẫu câu kinh điển trong các thông báo khen thưởng nhân viên của đề thi TOEIC.</p>`,

  140: `<p><b>Dịch nghĩa:</b> Trong một vòng chung kết cạnh tranh gay cấn được tổ chức tại New York, Davis cuối cùng đã giành chiến thắng trước quán quân năm ngoái, Gupta Singh. Ngoài ra, Davis cũng đã ghi được số điểm cao nhất từ trước đến nay cho giai đoạn này của cuộc thi.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Đứng đầu câu trước dấu phẩy và nối tiếp ý nghĩa với câu trước, ta cần một liên từ/trạng từ liên kết.
<br>- (A) Namely: cụ thể là.
<br>- (B) In addition: thêm vào đó, ngoài ra.
<br>- (C) Consequently: do đó, kết quả là.
<br>- (D) On the other hand: mặt khác.
<br>- Phía sau có từ "also" (cũng): câu trước nói anh thắng giải, câu sau bổ sung thêm rằng anh còn đạt điểm số kỷ lục.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Sự xuất hiện của phó từ <i>"also"</i> trong vế sau chính là dấu hiệu mạnh nhất chỉ mối quan hệ bổ sung thông tin (addition), dẫn lối trực tiếp đến đáp án "In addition".</p>`,

  141: `<p><b>Dịch nghĩa:</b>
<br>- (A) Giải thưởng này được trao tại công ty chúng tôi mỗi năm.
<br>- (B) Các đồng nghiệp của anh ấy sẽ chia sẻ trách nhiệm trong thời gian anh vắng mặt.
<br>- (C) Ông Davis không thể đưa ra bình luận khi được hỏi về chuyến đi của mình.
<br>- (D) Tất cả chúng tôi đều rất tự hào về thành tích này.</p>
<p><b>Phân tích logic điền câu:</b> Bài viết mở đầu bằng giọng văn nội bộ công ty: <i>"Our very own Nigel Davis..."</i> (Người đồng nghiệp Nigel Davis của chính chúng ta...). Sau khi nêu việc Davis thắng giải và đạt điểm kỷ lục, câu (D) thể hiện cảm xúc tự hào của tập thể công ty về thành tích của đồng nghiệp (<i>"proud of this accomplishment"</i>).
<br>- (A) sai vì đây là giải thưởng quốc gia (National Negotiation Prize), không phải giải nội bộ công ty.
<br>- (B) chưa đề cập đến việc sắp xếp công việc thay thế.
<br>- (C) mang sắc thái tiêu cực/né tránh báo chí, không phù hợp bài viết chúc mừng.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Lưu ý tính nhất quán về văn phong: bài báo chúc mừng nhân viên đạt giải xuất sắc luôn đi kèm lời bày tỏ niềm tự hào từ phía tổ chức hoặc đồng nghiệp.</p>`,

  142: `<p><b>Dịch nghĩa:</b> Davis cho biết anh rất biết ơn sự hỗ trợ mà mình đã nhận được và anh sẽ tận hưởng khoảng thời gian ở nước ngoài.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Mệnh đề danh từ sau "that": <i>that he (142) ___ his time abroad</i>.
<br>- Chuyến đi Tây Ban Nha (time abroad) là phần thưởng mà Davis chuẩn bị đi trong tương lai gần.
<br>- (A) has enjoyed: hiện tại hoàn thành (đã trải nghiệm xong).
<br>- (B) had been enjoying: quá khứ hoàn thành tiếp diễn.
<br>- (C) enjoys: hiện tại đơn.
<br>- (D) will enjoy: tương lai đơn, diễn tả hành động sẽ diễn ra trong tương lai khi anh lên đường sang Tây Ban Nha.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Căn cứ vào diễn biến thực tế trong bài: Davis vừa mới đoạt giải và được trao thưởng chuyến đi Tây Ban Nha, anh chưa đi chuyến đi này. Vì thế động từ miêu tả cảm giác trong kỳ nghỉ phải dùng thì tương lai đơn "will enjoy".</p>`,

  143: `<p><b>Dịch nghĩa:</b> Sinh viên tương lai nên truy cập trang web của trường đại học và tải phần mềm E-University trực tiếp vào máy tính của mình.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Vị trí đứng sau cụm tân ngữ "the E-University software" để bổ nghĩa cho hành động tải phần mềm vào máy tính: <i>download ... directly onto their computers</i>.
<br>- (A) hardly: hầu như không.
<br>- (B) deliberately: một cách cố ý.
<br>- (C) continuously: một cách liên tục.
<br>- (D) directly: trực tiếp (tải thẳng về máy tính).</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Trong ngữ cảnh hướng dẫn cài đặt phần mềm trên website, cụm <i>"download directly onto/to..."</i> (tải trực tiếp về...) là cách diễn đạt phổ biến và tự nhiên nhất.</p>`,

  144: `<p><b>Dịch nghĩa:</b> Khi đăng ký nhập học, mỗi sinh viên sẽ được cung cấp một cuốn tài liệu giới thiệu chi tiết về các tính năng của phần mềm.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Cấu trúc: Giới từ <i>"Upon" + Noun/V-ing</i> mang nghĩa "ngay khi / khi thực hiện việc gì".
<br>- Sau giới từ "Upon" không có tân ngữ phía sau, nên ta cần một danh từ trừu tượng.
<br>- (A) enrollment: sự đăng ký nhập học (danh từ).
<br>- (B) enrolls: động từ chia số ít.
<br>- (C) enrolled: động từ quá khứ / phân từ.
<br>- (D) enroll: động từ nguyên thể.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Cụm từ cố định <i>"Upon enrollment"</i> (khi đăng ký học) hoặc <i>"Upon arrival"</i> (khi đến nơi), <i>"Upon request"</i> (khi có yêu cầu) là các cụm giới từ chỉ thời điểm cực kỳ phổ biến trong đề thi TOEIC.</p>`,

  145: `<p><b>Dịch nghĩa:</b> Bất kỳ lần đăng nhập nào tiếp theo vào tài khoản của bạn sẽ chỉ yêu cầu tên người dùng và mật khẩu của bạn.</p>
<p><b>Phân tích ngữ pháp / từ vựng:</b>
<br>- Vị trí đứng trước danh từ "login" cần một tính từ bổ nghĩa: <i>Any + Adj + login</i>.
<br>- (A) final: cuối cùng.
<br>- (B) subsequent: tiếp theo, sau đó.
<br>- (C) distinctive: đặc biệt, dễ phân biệt.
<br>- (D) failed: thất bại.
<br>- Ngữ cảnh: Câu trước đề cập đến lần đầu tiên sau khi cài đặt thì phải đăng ký thông tin sinh viên kèm tài khoản (<i>"Once you have installed the program, you need to register..."</i>). Do đó, những lần đăng nhập sau đó (subsequent login) chỉ cần nhập tài khoản và mật khẩu.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Tính từ <i>"subsequent"</i> mang nghĩa xảy ra sau một sự kiện trước đó, là từ vựng nâng cao thường xuất hiện trong các bài đọc hướng dẫn quy trình của Part 6 và Part 7.</p>`,

  146: `<p><b>Dịch nghĩa:</b>
<br>- (A) Phần mềm phải được mua trước cuối tháng.
<br>- (B) Tên người dùng giống với mã số sinh viên do trường đại học chỉ định.
<br>- (C) Nếu bạn gặp bất kỳ vấn đề nào với phần mềm, hãy gửi email tới it@quelearning.edu.
<br>- (D) Phần mềm có thể được cài đặt trên tối đa hai máy tính.</p>
<p><b>Phân tích logic điền câu:</b> Câu đứng ngay sau là: <i>"Alternatively, you can call the Queensville University E-Learning Office at 555-9090."</i> (Cách khác là, bạn có thể gọi cho Văn phòng E-Learning theo số 555-9090).
<br>- Từ liên kết "Alternatively" (Hoặc/Cách khác là) đưa ra phương án liên hệ thay thế (gọi điện thoại). Điều này đòi hỏi câu trước đó phải đưa ra một kênh hỗ trợ đầu tiên (gửi email hỗ trợ kỹ thuật khi gặp sự cố).
<br>- Do đó phương án (C) nói về việc gửi email cho bộ phận IT hoàn toàn ăn khớp và logic.</p>
<p><b>Mẹo giải nhanh & Bẫy ETS:</b> Hãy chú ý liên từ <i>"Alternatively"</i> ở câu phía sau. Đây là tín hiệu chỉ ra hai lựa chọn song song để xử lý cùng một vấn đề (Cách 1: Gửi email - Cách 2: Gọi điện thoại).</p>`
};

let count = 0;
for (const passage of part6Data) {
  for (const q of passage.questions) {
    if (explanations[q.number]) {
      q.explanation = explanations[q.number];
      count++;
    }
  }
}

fs.writeFileSync(part6Path, JSON.stringify(part6Data, null, 2), 'utf8');
console.log(`Successfully updated ${count}/16 Part 6 explanations in ${part6Path}`);
