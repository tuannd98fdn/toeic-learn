import json
import os

part5_data = [
    {
        "id": "ets22_t5_p5_101",
        "number": 101,
        "text": "Ms. Abe will order supplies tomorrow, _______ tell her right away if you need anything.",
        "options": {
            "A": "than",
            "B": "wait",
            "C": "so",
            "D": "about"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Cô Abe sẽ đặt mua đồ dùng văn phòng vào ngày mai, vì vậy hãy báo cho cô ấy ngay nếu bạn cần bất cứ thứ gì.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng giữa hai mệnh đề độc lập ngăn cách bởi dấu phẩy, mang ý nghĩa quan hệ nguyên nhân - kết quả. Liên từ đẳng lập <b>(C) so</b> (vì vậy/do đó) nối mệnh đề chính và mệnh đề mệnh lệnh <i>tell her right away...</i> một cách chuẩn xác nhất.<br/>- (A) <i>than</i>: hơn (dùng trong so sánh hơn).<br/>- (B) <i>wait</i>: động từ chờ đợi (không làm liên từ nối câu).<br/>- (D) <i>about</i>: giới từ về khoảng/về điều gì.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Giữa hai mệnh đề có dấu phẩy mang tính nhân quả: Mệnh đề 1 (sự kiện) + , so + Mệnh đề 2 (hành động tiếp theo). Chọn ngay <b>so</b>.</p>",
        "type": "Conjunction",
        "subCategory": "Preposition & Conjunction",
        "grammarTag": "Coordinating Conjunction",
        "clueHint": "Hai mệnh đề nối nhau chỉ kết quả: 'Cô Abe sẽ đặt hàng ngày mai, [vì vậy] hãy nói với cô ấy ngay'. Cần liên từ nào?",
        "syntaxBreakdown": {
            "subject": "Ms. Abe",
            "verb": "will order",
            "objectOrComplement": "supplies tomorrow, [so] (you) tell her right away if you need anything",
            "blankRole": "Liên từ đẳng lập chỉ kết quả nối hai mệnh đề"
        }
    },
    {
        "id": "ets22_t5_p5_102",
        "number": 102,
        "text": "The Knysya Theater requests that all electronic devices be silenced _______ the play begins.",
        "options": {
            "A": "also",
            "B": "but",
            "C": "unless",
            "D": "before"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Nhà hát Knysya yêu cầu tắt chuông tất cả các thiết bị điện tử trước khi vở kịch bắt đầu.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng trước mệnh đề thời gian <i>the play begins</i>. Liên từ chỉ thời gian <b>(D) before</b> (trước khi) là lựa chọn duy nhất hợp logic ngữ cảnh.<br/>- (A) <i>also</i>: phó từ cũng (không làm liên từ nối mệnh đề thời gian).<br/>- (B) <i>but</i>: liên từ nối tương phản.<br/>- (C) <i>unless</i>: trừ khi (ngược nghĩa).</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Hành động tắt chuông điện thoại luôn diễn ra trước khi buổi biểu diễn bắt đầu. Cụm thời gian: <i>before the play begins</i>.</p>",
        "type": "Preposition & Conjunction",
        "subCategory": "Preposition & Conjunction",
        "grammarTag": "Time Conjunction",
        "clueHint": "Thiết bị điện tử cần tắt chuông vào thời điểm nào so với lúc vở kịch bắt đầu? 'Trước khi' dùng liên từ gì?",
        "syntaxBreakdown": {
            "subject": "all electronic devices",
            "verb": "be silenced",
            "objectOrComplement": "[before] the play begins",
            "blankRole": "Liên từ chỉ thời gian nối mệnh đề trạng ngữ chỉ thời gian"
        }
    },
    {
        "id": "ets22_t5_p5_103",
        "number": 103,
        "text": "_______ Human Resources if you have questions about taking time off from work.",
        "options": {
            "A": "Contacting",
            "B": "Contacted",
            "C": "Contacts",
            "D": "Contact"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Hãy liên hệ phòng Nhân sự nếu bạn có thắc mắc về việc xin nghỉ làm.</p>\n<p><b>Phân tích ngữ pháp:</b> Câu đứng trước mệnh đề điều kiện <i>if you have questions...</i> chưa có chủ ngữ và động từ chính. Đây là câu mệnh lệnh (Imperative sentence), bắt đầu bằng động từ nguyên mẫu không 'to' <b>(D) Contact</b>.<br/>- (A) <i>Contacting</i>: dạng V-ing.<br/>- (B) <i>Contacted</i>: quá khứ/phân từ.<br/>- (C) <i>Contacts</i>: động từ số ít hoặc danh từ số nhiều.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Đầu câu đứng trước tân ngữ mà không có chủ ngữ, mệnh đề sau là <i>if...</i>, đây là câu chỉ dẫn/mệnh lệnh: chọn động từ nguyên thể <b>V-bare</b>.</p>",
        "type": "Sentence Structure",
        "subCategory": "Sentence Structure",
        "grammarTag": "Imperative Sentence",
        "clueHint": "Đầu câu đưa ra lời chỉ dẫn 'Hãy liên hệ... nếu bạn có thắc mắc'. Dạng câu mệnh lệnh cần động từ ở thể nào?",
        "syntaxBreakdown": {
            "subject": "(You - ngụ ý)",
            "verb": "[Contact]",
            "objectOrComplement": "Human Resources if you have questions about taking time off from work",
            "blankRole": "Động từ nguyên mẫu đứng đầu câu tạo câu mệnh lệnh"
        }
    },
    {
        "id": "ets22_t5_p5_104",
        "number": 104,
        "text": "_______ eighty thousand people attended yesterday's soccer match.",
        "options": {
            "A": "Almost",
            "B": "More",
            "C": "Often",
            "D": "Enough"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Gần tám mươi nghìn người đã tham dự trận đấu bóng đá ngày hôm qua.</p>\n<p><b>Phân tích ngữ pháp:</b> Trước con số số lượng <i>eighty thousand people</i>, ta cần phó từ chỉ mức độ xấp xỉ <b>(A) Almost</b> (gần/suýt soát) để bổ nghĩa cho số đếm.<br/>- (B) <i>More</i>: cần đi kèm <i>than</i> (more than eighty thousand) mới bổ nghĩa được cho số lượng.<br/>- (C) <i>Often</i>: phó từ tần suất (không bổ nghĩa cho số lượng).<br/>- (D) <i>Enough</i>: đứng sau tính từ hoặc trước danh từ nhưng không đứng trước số đếm như vậy.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Đứng trước số lượng: <i>almost / nearly / approximately + number</i>. Chú ý <i>more</i> bắt buộc phải có <i>than</i> mới đúng.</p>",
        "type": "Adverb",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Adverb Modifying Numbers",
        "clueHint": "Từ nào đứng trước số đếm 'eighty thousand' mang nghĩa xấp xỉ 'gần / suýt soát 80 nghìn' mà không cần 'than'?",
        "syntaxBreakdown": {
            "subject": "[Almost] eighty thousand people",
            "verb": "attended",
            "objectOrComplement": "yesterday's soccer match",
            "blankRole": "Phó từ chỉ mức độ xấp xỉ bổ nghĩa cho cụm số đếm"
        }
    },
    {
        "id": "ets22_t5_p5_105",
        "number": 105,
        "text": "Online visitors report that our company's Web site is somewhat _______.",
        "options": {
            "A": "confuse",
            "B": "confuses",
            "C": "confusing",
            "D": "confusion"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Khách truy cập trực tuyến báo cáo rằng trang web của công ty chúng ta hơi khó hiểu/gây nhầm lẫn.</p>\n<p><b>Phân tích ngữ pháp:</b> Sau động từ tobe <i>is</i> và phó từ chỉ mức độ <i>somewhat</i> (hơi, phần nào), vị trí chỗ trống cần một tính từ vị ngữ (predicate adjective) để miêu tả bản chất của trang web (Web site). Tính từ mang đuôi <b>-ing</b> <b>(C) confusing</b> (gây bối rối/khó hiểu) là lựa chọn chuẩn xác.<br/>- (A) <i>confuse</i>: động từ nguyên mẫu.<br/>- (B) <i>confuses</i>: động từ số ít.<br/>- (D) <i>confusion</i>: danh từ sự bối rối.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Cấu trúc: <i>S (vật: Web site) + be + somewhat + Adj (-ing: confusing)</i> miêu tả tính chất của vật.</p>",
        "type": "Word Form",
        "subCategory": "Word Form",
        "grammarTag": "Predicate Adjective",
        "clueHint": "Sau tobe 'is somewhat', cần từ loại gì để miêu tả đặc điểm trang web? Tính từ đuôi gì?",
        "syntaxBreakdown": {
            "subject": "our company's Web site",
            "verb": "is",
            "objectOrComplement": "somewhat [confusing]",
            "blankRole": "Tính từ vị ngữ bổ nghĩa cho chủ ngữ trang web"
        }
    },
    {
        "id": "ets22_t5_p5_106",
        "number": 106,
        "text": "Traffic _______ are expected next week along Reimers Road.",
        "options": {
            "A": "drivers",
            "B": "crowds",
            "C": "delays",
            "D": "needs"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Tình trạng ùn tắc / chậm trễ giao thông được dự báo sẽ xảy ra vào tuần tới dọc theo Đường Reimers.</p>\n<p><b>Phân tích ngữ pháp:</b> Cụm danh từ ghép cố định trong tiếng Anh công sở và tin tức giao thông là <b>traffic delays</b> (sự chậm trễ/ách tắc giao thông). Do đó <b>(C) delays</b> là đáp án chính xác.<br/>- (A) <i>drivers</i>: người lái xe (traffic drivers không phải thuật ngữ phù hợp với nghĩa dự kiến dọc theo đường).<br/>- (B) <i>crowds</i>: đám đông.<br/>- (D) <i>needs</i>: nhu cầu.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Cụm danh từ thường gặp: <i>traffic delays / traffic congestion / traffic jam</i> nói về tình trạng chậm trễ giao thông.</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Compound Noun",
        "clueHint": "Cụm danh từ kết hợp với 'Traffic' chỉ sự chậm trễ, ách tắc giao thông là gì?",
        "syntaxBreakdown": {
            "subject": "Traffic [delays]",
            "verb": "are expected",
            "objectOrComplement": "next week along Reimers Road",
            "blankRole": "Danh từ số nhiều làm danh từ chính trong cụm danh từ ghép chủ ngữ"
        }
    },
    {
        "id": "ets22_t5_p5_107",
        "number": 107,
        "text": "Shaloub Hospital wants to hire several more _______ qualified laboratory workers.",
        "options": {
            "A": "higher",
            "B": "highest",
            "C": "high",
            "D": "highly"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Bệnh viện Shaloub muốn tuyển thêm một số nhân viên phòng xét nghiệm có trình độ chuyên môn cao.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng trước tính từ <i>qualified</i> (đủ tiêu chuẩn/có chuyên môn) để bổ nghĩa cho tính từ này. Ta cần một trạng từ chỉ mức độ <b>(D) highly</b>. Cụm từ cố định kinh điển: <i>highly qualified</i> (có trình độ cao).<br/>- (A) <i>higher</i>: tính từ so sánh hơn.<br/>- (B) <i>highest</i>: tính từ so sánh nhất.<br/>- (C) <i>high</i>: tính từ cao.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Quy tắc vị trí từ loại: Trạng từ đứng trước tính từ để bổ nghĩa (Adv + Adj). Collocation cực kỳ phổ biến trong đề ETS: <i>highly qualified / highly recommended / highly effective</i>.</p>",
        "type": "Word Form",
        "subCategory": "Word Form",
        "grammarTag": "Adverb Modifying Adjective",
        "clueHint": "Từ loại nào đứng trước tính từ 'qualified' để bổ nghĩa? Cụm '... qualified' rất quen thuộc.",
        "syntaxBreakdown": {
            "subject": "Shaloub Hospital",
            "verb": "wants to hire",
            "objectOrComplement": "several more [highly] qualified laboratory workers",
            "blankRole": "Trạng từ chỉ mức độ bổ nghĩa cho tính từ qualified"
        }
    },
    {
        "id": "ets22_t5_p5_108",
        "number": 108,
        "text": "Whenever you are the _______ person to exit a room, please turn off the lights.",
        "options": {
            "A": "last",
            "B": "inside",
            "C": "finish",
            "D": "near"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Bất cứ khi nào bạn là người cuối cùng rời khỏi phòng, xin vui lòng tắt đèn.</p>\n<p><b>Phân tích ngữ pháp:</b> Cụm danh từ <i>the _______ person</i> cần một tính từ xác định. Cụm từ thông dụng nơi công sở về tiết kiệm điện là <b>the last person to exit/leave</b> (người cuối cùng rời đi). Do đó chọn <b>(A) last</b>.<br/>- (B) <i>inside</i>: bên trong.<br/>- (C) <i>finish</i>: động từ/danh từ kết thúc.<br/>- (D) <i>near</i>: gần.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Mẫu câu nội quy văn phòng: <i>the last person to leave/exit... please turn off the lights</i>. Chọn ngay <b>last</b>.</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Adjective",
        "clueHint": "Người như thế nào khi rời phòng thì cần tắt đèn? 'Người cuối cùng' là từ gì?",
        "syntaxBreakdown": {
            "subject": "you",
            "verb": "are",
            "objectOrComplement": "the [last] person to exit a room",
            "blankRole": "Tính từ đứng trước bổ nghĩa cho danh từ person"
        }
    },
    {
        "id": "ets22_t5_p5_109",
        "number": 109,
        "text": "Following a brief _______ with the chief technician, Mr. Moore agreed to update the operations manual.",
        "options": {
            "A": "converses",
            "B": "conversation",
            "C": "conversational",
            "D": "conversationally"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Sau một cuộc trò chuyện ngắn với kỹ thuật viên trưởng, ông Moore đã đồng ý cập nhật sổ tay vận hành.</p>\n<p><b>Phân tích ngữ pháp:</b> Cụm <i>a brief _______ with...</i> có mạo từ <i>a</i> và tính từ <i>brief</i> (ngắn gọn), do đó vị trí chỗ trống bắt buộc phải là một danh từ đếm được số ít. Danh từ phù hợp duy nhất là <b>(B) conversation</b> (cuộc trò chuyện/trao đổi).<br/>- (A) <i>converses</i>: động từ chia thì.<br/>- (C) <i>conversational</i>: tính từ.<br/>- (D) <i>conversationally</i>: phó từ.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Cấu trúc cụm danh từ: <i>a/an + Adj + Noun</i>. Sau tính từ <i>brief</i> bắt buộc là danh từ <b>conversation</b>.</p>",
        "type": "Word Form",
        "subCategory": "Word Form",
        "grammarTag": "Noun Suffix",
        "clueHint": "Sau cụm 'a brief' (mạo từ + tính từ), cần từ loại nào để làm danh từ chính?",
        "syntaxBreakdown": {
            "subject": "Mr. Moore",
            "verb": "agreed to update",
            "objectOrComplement": "the operations manual [Following a brief conversation with the chief technician]",
            "blankRole": "Danh từ làm tân ngữ sau giới từ Following và tính từ brief"
        }
    },
    {
        "id": "ets22_t5_p5_110",
        "number": 110,
        "text": "After record profits, Golden Shamrock Jewelry's stock price increased _______ our expectations.",
        "options": {
            "A": "beside",
            "B": "beyond",
            "C": "behind",
            "D": "between"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Sau lợi nhuận kỷ lục, giá cổ phiếu của Hãng trang sức Golden Shamrock đã tăng vượt quá kỳ vọng của chúng tôi.</p>\n<p><b>Phân tích ngữ pháp:</b> Cụm giới từ cố định cực kỳ phổ biến trong TOEIC là <b>beyond one's expectations</b> (vượt quá mong đợi/kỳ vọng). Do đó <b>(B) beyond</b> là đáp án chính xác.<br/>- (A) <i>beside</i>: bên cạnh.<br/>- (C) <i>behind</i>: đằng sau.<br/>- (D) <i>between</i>: giữa hai đối tượng.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Collocation kinh điển: <i>beyond expectation(s) / beyond belief / beyond repair</i>. Gặp <i>expectations</i> chọn ngay <b>beyond</b>.</p>",
        "type": "Preposition",
        "subCategory": "Preposition & Conjunction",
        "grammarTag": "Prepositional Phrase",
        "clueHint": "Cụm thành ngữ mang nghĩa 'vượt quá kỳ vọng': '... our expectations'. Giới từ nào đi với expectations?",
        "syntaxBreakdown": {
            "subject": "Golden Shamrock Jewelry's stock price",
            "verb": "increased",
            "objectOrComplement": "[beyond] our expectations",
            "blankRole": "Giới từ tạo thành cụm trạng ngữ chỉ mức độ vượt qua kỳ vọng"
        }
    },
    {
        "id": "ets22_t5_p5_111",
        "number": 111,
        "text": "We cannot _______ the filming of our documentary, Morning after Night, without sufficient funding.",
        "options": {
            "A": "completely",
            "B": "completion",
            "C": "complete",
            "D": "completing"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Chúng tôi không thể hoàn thành việc quay bộ phim tài liệu 'Morning after Night' nếu không có đủ kinh phí.</p>\n<p><b>Phân tích ngữ pháp:</b> Sau trợ động từ khuyết thiếu <i>cannot (can not)</i> bắt buộc phải là một động từ nguyên mẫu không 'to' (bare infinitive). Chọn ngay động từ nguyên mẫu <b>(C) complete</b>.<br/>- (A) <i>completely</i>: phó từ hoàn toàn.<br/>- (B) <i>completion</i>: danh từ sự hoàn thành.<br/>- (D) <i>completing</i>: danh động từ V-ing.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Động từ khuyết thiếu: <i>Modal verb (can/could/may/must/should/will) + V-bare</i>. Chọn ngay <b>complete</b>.</p>",
        "type": "Verb Form",
        "subCategory": "Verbs & Tenses",
        "grammarTag": "Modal Verb",
        "clueHint": "Sau trợ động từ khiếm khuyết 'cannot', cần dạng động từ nào?",
        "syntaxBreakdown": {
            "subject": "We",
            "verb": "cannot [complete]",
            "objectOrComplement": "the filming of our documentary, Morning after Night, without sufficient funding",
            "blankRole": "Động từ nguyên mẫu đứng sau modal verb cannot"
        }
    },
    {
        "id": "ets22_t5_p5_112",
        "number": 112,
        "text": "Get to the station a few minutes early because Mr. Xu's train will arrive _______ at 7:00 P.M.",
        "options": {
            "A": "carefully",
            "B": "unexpectedly",
            "C": "promptly",
            "D": "clearly"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Hãy đến nhà ga sớm vài phút vì chuyến tàu của ông Xu sẽ đến đúng 7 giờ tối.</p>\n<p><b>Phân tích ngữ pháp:</b> Khi kết hợp với mốc thời gian cụ thể (at 7:00 P.M.), phó từ <b>(C) promptly</b> có nghĩa là 'chính xác / đúng vào giờ đó' (promptly at + time).<br/>- (A) <i>carefully</i>: cẩn thận.<br/>- (B) <i>unexpectedly</i>: bất ngờ/không lường trước (trái nghĩa với việc khuyên đến sớm chuẩn bị).<br/>- (D) <i>clearly</i>: rõ ràng.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Cụm từ chỉ giờ giấc chuẩn xác: <i>promptly at [thời gian] / precisely at [thời gian]</i> (đúng vào lúc...).</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Adverb of Time",
        "clueHint": "Phó từ nào đi với 'at 7:00 P.M.' mang nghĩa 'đúng chính xác vào lúc 7 giờ tối'?",
        "syntaxBreakdown": {
            "subject": "Mr. Xu's train",
            "verb": "will arrive",
            "objectOrComplement": "[promptly] at 7:00 P.M.",
            "blankRole": "Phó từ bổ nghĩa cho động từ arrive và mốc thời gian"
        }
    },
    {
        "id": "ets22_t5_p5_113",
        "number": 113,
        "text": "_______ can be done to revise your order, since the merchandise has already shipped.",
        "options": {
            "A": "Ours",
            "B": "Nobody",
            "C": "Others",
            "D": "Nothing"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Không có gì có thể làm được để sửa đổi đơn hàng của bạn, vì hàng hóa đã được gửi đi rồi.</p>\n<p><b>Phân tích ngữ pháp:</b> Mệnh đề chỉ lý do <i>since the merchandise has already shipped</i> giải thích việc hàng đã gửi đi, suy ra không thể can thiệp được nữa. Đại từ bất định chỉ vật <b>(D) Nothing</b> (không có việc gì/không điều gì) làm chủ ngữ mang nghĩa phủ định hợp ngữ cảnh nhất.<br/>- (A) <i>Ours</i>: đại từ sở hữu cái của chúng tôi.<br/>- (B) <i>Nobody</i>: không ai (chỉ người, không kết hợp với <i>done to revise order</i> như sự việc).<br/>- (C) <i>Others</i>: những cái/người khác.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Cấu trúc bị động: <i>Nothing can be done</i> (Không còn làm gì được nữa). Một mẫu câu rất hay xuất hiện trong giao dịch dịch vụ khách hàng.</p>",
        "type": "Pronoun",
        "subCategory": "Pronoun",
        "grammarTag": "Indefinite Pronoun",
        "clueHint": "Hàng đã gửi đi rồi thì 'Không việc gì có thể làm được nữa'. Cần đại từ bất định chỉ vật nào?",
        "syntaxBreakdown": {
            "subject": "[Nothing]",
            "verb": "can be done",
            "objectOrComplement": "to revise your order, since the merchandise has already shipped",
            "blankRole": "Đại từ bất định làm chủ ngữ của mệnh đề chính"
        }
    },
    {
        "id": "ets22_t5_p5_114",
        "number": 114,
        "text": "Recent graduates tend to _______ workplaces where teamwork and collaboration are encouraged.",
        "options": {
            "A": "think",
            "B": "apply",
            "C": "extend",
            "D": "prefer"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Những sinh viên mới tốt nghiệp có xu hướng ưa thích những nơi làm việc mà tinh thần đồng đội và sự hợp tác được khuyến khích.</p>\n<p><b>Phân tích ngữ pháp:</b> Cấu trúc <i>tend to + V (transitive) + workplaces</i>. Động từ ngoại động từ <b>(D) prefer</b> (thích hơn/ưa chuộng) nhận trực tiếp tân ngữ <i>workplaces</i>.<br/>- (A) <i>think</i>: cần giới từ <i>of/about</i>.<br/>- (B) <i>apply</i>: cần giới từ <i>for</i> (apply for a job) hoặc <i>to</i> (apply to a company).<br/>- (C) <i>extend</i>: mở rộng, gia hạn (không hợp nghĩa).</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> <i>prefer + Noun (workplaces)</i> mang nghĩa thích môi trường làm việc nào hơn. Chú ý <i>apply</i> luôn cần giới từ đi kèm.</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Transitive Verb",
        "clueHint": "Sinh viên mới ra trường có xu hướng 'thích/chuộng' nơi làm việc có tinh thần đồng đội. Động từ nào nhận trực tiếp tân ngữ 'workplaces'?",
        "syntaxBreakdown": {
            "subject": "Recent graduates",
            "verb": "tend to [prefer]",
            "objectOrComplement": "workplaces where teamwork and collaboration are encouraged",
            "blankRole": "Động từ nguyên mẫu đứng sau tend to"
        }
    },
    {
        "id": "ets22_t5_p5_115",
        "number": 115,
        "text": "Zhang Cleaning takes great care to ensure that all its employees follow specific cleaning _______.",
        "options": {
            "A": "proceeds",
            "B": "procedures",
            "C": "procedural",
            "D": "proceeding"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Công ty Vệ sinh Zhang rất cẩn trọng đảm bảo rằng tất cả nhân viên của mình đều tuân theo các quy trình vệ sinh cụ thể.</p>\n<p><b>Phân tích ngữ pháp:</b> Động từ <i>follow</i> cần một danh từ làm tân ngữ. Đứng sau tính từ <i>specific</i> và danh từ bổ nghĩa <i>cleaning</i>, ta cần danh từ chỉ quy trình hoạt động <b>(B) procedures</b> (các quy trình). Cụm <i>cleaning procedures</i> = quy trình dọn dẹp.<br/>- (A) <i>proceeds</i>: tiền thu được/lợi nhuận (danh từ số nhiều).<br/>- (C) <i>procedural</i>: tính từ thuộc về thủ tục.<br/>- (D) <i>proceeding</i>: sự tiến hành/vụ kiện.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Cụm từ thường gặp: <i>follow procedures / follow guidelines / follow regulations</i>. Chọn ngay danh từ số nhiều <b>procedures</b>.</p>",
        "type": "Word Form",
        "subCategory": "Word Form",
        "grammarTag": "Noun Plural",
        "clueHint": "Động từ 'follow' (tuân thủ) đi với 'cleaning ...' (các quy trình vệ sinh). Danh từ nào chỉ quy trình?",
        "syntaxBreakdown": {
            "subject": "all its employees",
            "verb": "follow",
            "objectOrComplement": "specific cleaning [procedures]",
            "blankRole": "Danh từ số nhiều làm tân ngữ cho động từ follow"
        }
    },
    {
        "id": "ets22_t5_p5_116",
        "number": 116,
        "text": "Mumbai Jewel is a widely acclaimed restaurant, mainly _______ its delicious buffet dinners.",
        "options": {
            "A": "such as",
            "B": "not only",
            "C": "because of",
            "D": "together with"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Mumbai Jewel là một nhà hàng được đánh giá rất cao, chủ yếu là vì các bữa tối tự chọn ngon miệng của họ.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng trước một cụm danh từ <i>its delicious buffet dinners</i> để chỉ lý do tại sao nhà hàng nổi tiếng. Cụm giới từ chỉ nguyên nhân <b>(C) because of</b> (+ Noun phrase) là đáp án hoàn toàn chính xác.<br/>- (A) <i>such as</i>: như là (dùng để liệt kê ví dụ).<br/>- (B) <i>not only</i>: không những (cần đi cặp với <i>but also</i>).<br/>- (D) <i>together with</i>: cùng với.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Sau chỗ trống là cụm danh từ (Noun phrase), chỉ nguyên nhân được ca ngợi: <i>acclaimed... mainly because of + Noun</i>. Chọn <b>because of</b>.</p>",
        "type": "Preposition",
        "subCategory": "Preposition & Conjunction",
        "grammarTag": "Preposition of Cause",
        "clueHint": "Đứng trước cụm danh từ 'its delicious buffet dinners' chỉ nguyên nhân được khen ngợi. Cụm từ nào mang nghĩa 'bởi vì'?",
        "syntaxBreakdown": {
            "subject": "Mumbai Jewel",
            "verb": "is",
            "objectOrComplement": "a widely acclaimed restaurant, mainly [because of] its delicious buffet dinners",
            "blankRole": "Cụm giới từ chỉ nguyên nhân bổ nghĩa cho tính từ acclaimed"
        }
    },
    {
        "id": "ets22_t5_p5_117",
        "number": 117,
        "text": "Before a job interview, it is critical to prepare _______ for answering the most commonly asked questions.",
        "options": {
            "A": "whose",
            "B": "whichever",
            "C": "theirs",
            "D": "oneself"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Trước buổi phỏng vấn xin việc, việc tự chuẩn bị bản thân để trả lời các câu hỏi phổ biến nhất là vô cùng quan trọng.</p>\n<p><b>Phân tích ngữ pháp:</b> Cấu trúc cố định: <i>to prepare oneself for something / doing something</i> (tự chuẩn bị tinh thần/kiến thức cho bản thân đối mặt với điều gì). Đại từ phản thân tổng quát <b>(D) oneself</b> đóng vai trò tân ngữ của <i>prepare</i>.<br/>- (A) <i>whose</i>: đại từ quan hệ sở hữu.<br/>- (B) <i>whichever</i>: bất kỳ cái nào.<br/>- (C) <i>theirs</i>: đại từ sở hữu của họ.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Khi chủ ngữ giả là <i>it is critical to...</i> (hướng đến đối tượng chung bất kỳ người nào), đại từ phản thân tương ứng là <b>oneself</b>.</p>",
        "type": "Pronoun",
        "subCategory": "Pronoun",
        "grammarTag": "Reflexive Pronoun",
        "clueHint": "Cấu trúc 'prepare ... for answering': tự chuẩn bị cho chính bản thân mình. Đại từ phản thân chung là gì?",
        "syntaxBreakdown": {
            "subject": "It (giả)",
            "verb": "is",
            "objectOrComplement": "critical [to prepare oneself for answering the most commonly asked questions]",
            "blankRole": "Đại từ phản thân làm tân ngữ cho động từ prepare"
        }
    },
    {
        "id": "ets22_t5_p5_118",
        "number": 118,
        "text": "While it is not _______, staff are encouraged to read Joan Frantz's book Balancing Work and Life.",
        "options": {
            "A": "required",
            "B": "published",
            "C": "limited",
            "D": "guaranteed"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Mặc dù không bắt buộc, nhân viên được khuyến khích đọc cuốn sách 'Cân bằng Công việc và Cuộc sống' của Joan Frantz.</p>\n<p><b>Phân tích ngữ pháp:</b> Mệnh đề nhượng bộ <i>While it is not _______</i> đối lập với mệnh đề chính <i>staff are encouraged...</i> (nhân viên được khuyến khích). Tương phản với 'được khuyến khích' chính là 'không mang tính bắt buộc'. Tính từ phân từ <b>(A) required</b> (bắt buộc) hoàn toàn hợp lý.<br/>- (B) <i>published</i>: được xuất bản.<br/>- (C) <i>limited</i>: bị giới hạn.<br/>- (D) <i>guaranteed</i>: được bảo đảm.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Cặp đối lập kinh điển trong môi trường doanh nghiệp: <i>not required (không bắt buộc) vs. encouraged (được khuyến khích)</i>.</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Passive Adjective",
        "clueHint": "Mặc dù 'không bắt buộc', nhưng nhân viên được khuyến khích. Từ nào mang nghĩa bắt buộc?",
        "syntaxBreakdown": {
            "subject": "it",
            "verb": "is not",
            "objectOrComplement": "[required]",
            "blankRole": "Tính từ vị ngữ bổ nghĩa cho chủ ngữ it trong mệnh đề phụ"
        }
    },
    {
        "id": "ets22_t5_p5_119",
        "number": 119,
        "text": "It is _______ to bring sturdy boots to wear on the hike.",
        "options": {
            "A": "advise",
            "B": "advisor",
            "C": "advisable",
            "D": "advises"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Bạn nên mang theo ủng cứng cáp để đi trong chuyến đi bộ đường dài.</p>\n<p><b>Phân tích ngữ pháp:</b> Cấu trúc chủ ngữ giả phổ biến: <i>It + is + Adjective + to-infinitive</i>. Vị trí chỗ trống đứng sau tobe <i>is</i> và trước <i>to bring</i> bắt buộc phải là một tính từ. Chọn tính từ <b>(C) advisable</b> (thích hợp, nên làm).<br/>- (A) <i>advise</i>: động từ khuyên bảo.<br/>- (B) <i>advisor</i>: danh từ người cố vấn.<br/>- (D) <i>advises</i>: động từ ngôi thứ 3 số ít.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Công thức bất hủ: <i>It is + Adj + to V</i>. Nhìn thấy đuôi <b>-able</b> (advisable) chọn ngay tính từ.</p>",
        "type": "Word Form",
        "subCategory": "Word Form",
        "grammarTag": "Adjective Suffix",
        "clueHint": "Cấu trúc 'It is ... to bring': sau 'It is' và trước 'to V' cần từ loại gì? Tìm từ có đuôi tính từ.",
        "syntaxBreakdown": {
            "subject": "It (giả)",
            "verb": "is",
            "objectOrComplement": "[advisable] to bring sturdy boots to wear on the hike",
            "blankRole": "Tính từ vị ngữ trong cấu trúc chủ ngữ giả It is + Adj + to V"
        }
    },
    {
        "id": "ets22_t5_p5_120",
        "number": 120,
        "text": "Nordel Park will open for the season once average daytime temperatures reach _______ 15 degrees.",
        "options": {
            "A": "at least",
            "B": "as of",
            "C": "along with",
            "D": "ahead of"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Công viên Nordel sẽ mở cửa đón mùa hoạt động một khi nhiệt độ ban ngày trung bình đạt tối thiểu 15 độ.</p>\n<p><b>Phân tích ngữ pháp:</b> Trước con số đo lường <i>15 degrees</i>, cụm từ <b>(A) at least</b> (ít nhất / tối thiểu) đóng vai trò bổ nghĩa mức nhiệt độ tối thiểu cần đạt được.<br/>- (B) <i>as of</i>: kể từ ngày/thời điểm.<br/>- (C) <i>along with</i>: cùng với.<br/>- (D) <i>ahead of</i>: trước (thời gian hoặc vị trí).</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Đứng trước số lượng / độ đo: <i>at least + number</i> (ít nhất / tối thiểu là bao nhiêu). Chọn ngay <b>at least</b>.</p>",
        "type": "Idiom & Preposition",
        "subCategory": "Preposition & Conjunction",
        "grammarTag": "Idiomatic Preposition",
        "clueHint": "Cụm từ nào đi trước con số '15 degrees' mang nghĩa 'ít nhất / tối thiểu là 15 độ'?",
        "syntaxBreakdown": {
            "subject": "average daytime temperatures",
            "verb": "reach",
            "objectOrComplement": "[at least] 15 degrees",
            "blankRole": "Cụm phó từ chỉ số lượng tối thiểu bổ nghĩa cho 15 degrees"
        }
    },
    {
        "id": "ets22_t5_p5_121",
        "number": 121,
        "text": "Before investing, Mr. Hwang will wait for greater _______ that Briomer Tech is fully committed to the project.",
        "options": {
            "A": "assure",
            "B": "assured",
            "C": "assuredly",
            "D": "assurance"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Trước khi đầu tư, ông Hwang sẽ chờ đợi sự bảo đảm chắc chắn hơn rằng Briomer Tech hoàn toàn cam kết với dự án.</p>\n<p><b>Phân tích ngữ pháp:</b> Cụm <i>wait for greater _______ that...</i> có giới từ <i>for</i> và tính từ so sánh hơn <i>greater</i>. Sau tính từ bắt buộc phải là một danh từ làm tân ngữ cho giới từ <i>for</i>. Danh từ mang đuôi <b>-ance</b> <b>(D) assurance</b> (sự cam đoan, sự bảo đảm) là đáp án đúng.<br/>- (A) <i>assure</i>: động từ cam đoan.<br/>- (B) <i>assured</i>: tính từ/quá khứ phân từ.<br/>- (C) <i>assuredly</i>: phó từ chắc chắn.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Sau tính từ so sánh hơn <i>greater</i> luôn là danh từ. Nhận diện đuôi danh từ <b>-ance</b> (assurance).</p>",
        "type": "Word Form",
        "subCategory": "Word Form",
        "grammarTag": "Noun Suffix",
        "clueHint": "Sau tính từ 'greater', cần từ loại gì để làm tân ngữ cho giới từ 'wait for'?",
        "syntaxBreakdown": {
            "subject": "Mr. Hwang",
            "verb": "will wait",
            "objectOrComplement": "for greater [assurance] that Briomer Tech is fully committed to the project",
            "blankRole": "Danh từ làm tân ngữ sau giới từ for và tính từ greater"
        }
    },
    {
        "id": "ets22_t5_p5_122",
        "number": 122,
        "text": "Tralim Consulting's annual profits are expected to _______ exceed €5 million.",
        "options": {
            "A": "exactly",
            "B": "extremely",
            "C": "eventually",
            "D": "evenly"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Lợi nhuận hàng năm của Công ty Tư vấn Tralim được kỳ vọng cuối cùng sẽ vượt mốc 5 triệu euro.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng giữa <i>to</i> và động từ <i>exceed</i> (vượt qua) để bổ nghĩa cho động từ này trong tương lai. Phó từ chỉ thời gian tương lai <b>(C) eventually</b> (cuối cùng/rốt cuộc sẽ) hoàn toàn phù hợp với ngữ cảnh dự báo kỳ vọng (are expected to).<br/>- (A) <i>exactly</i>: chính xác (không đi trước động từ exceed mang nghĩa vượt quá).<br/>- (B) <i>extremely</i>: cực kỳ (chỉ bổ nghĩa tính từ/phó từ, không bổ nghĩa trực tiếp động từ như vậy).<br/>- (D) <i>evenly</i>: đồng đều.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Đi với các động từ chỉ cột mốc phát triển: <i>eventually reach / eventually exceed / eventually become</i> mang nghĩa theo thời gian cuối cùng sẽ đạt được.</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Adverb",
        "clueHint": "Phó từ nào bổ nghĩa cho 'exceed' mang nghĩa 'cuối cùng rồi cũng sẽ vượt qua mốc đó'?",
        "syntaxBreakdown": {
            "subject": "Tralim Consulting's annual profits",
            "verb": "are expected",
            "objectOrComplement": "to [eventually] exceed €5 million",
            "blankRole": "Phó từ bổ nghĩa cho động từ nguyên mẫu exceed"
        }
    },
    {
        "id": "ets22_t5_p5_123",
        "number": 123,
        "text": "Although many factors contribute to a successful business, Mr. Lee thinks that keeping customers satisfied is the _______.",
        "options": {
            "A": "essential",
            "B": "most essential",
            "C": "essentially",
            "D": "more essentially"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Mặc dù nhiều yếu tố đóng góp vào một doanh nghiệp thành công, ông Lee cho rằng việc giữ cho khách hàng hài lòng là điều quan trọng nhất.</p>\n<p><b>Phân tích ngữ pháp:</b> Đứng sau mạo từ <i>the</i> trong ngữ cảnh so sánh giữa nhiều yếu tố (many factors), ta cần dạng so sánh nhất của tính từ <i>essential</i>. Cấu trúc so sánh nhất với tính từ dài là <i>the + most + Adj</i>. Chọn <b>(B) most essential</b>.<br/>- (A) <i>essential</i>: tính từ nguyên thể (thiếu so sánh nhất khi có 'the' đứng một mình làm vị ngữ so sánh giữa nhiều yếu tố).<br/>- (C) <i>essentially</i>: phó từ về bản chất.<br/>- (D) <i>more essentially</i>: so sánh hơn của phó từ.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Có <i>the</i> đứng trước chỗ trống và phạm vi ngụ ý giữa 'many factors' -> chọn dạng so sánh nhất <b>most essential</b>.</p>",
        "type": "Comparison",
        "subCategory": "Word Form",
        "grammarTag": "Superlative Adjective",
        "clueHint": "Đứng sau mạo từ 'the' trong so sánh giữa nhiều yếu tố (many factors): cần dạng so sánh gì?",
        "syntaxBreakdown": {
            "subject": "keeping customers satisfied",
            "verb": "is",
            "objectOrComplement": "the [most essential] (factor)",
            "blankRole": "Tính từ so sánh nhất làm vị ngữ bổ nghĩa cho danh động từ chủ ngữ"
        }
    },
    {
        "id": "ets22_t5_p5_124",
        "number": 124,
        "text": "Ms. Alshammari took a full hour to _______ each of the budget changes during the staff meeting.",
        "options": {
            "A": "detail",
            "B": "attend",
            "C": "respond",
            "D": "comply"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Cô Alshammari đã dành trọn một tiếng đồng hồ để giải thích chi tiết từng thay đổi ngân sách trong cuộc họp nhân viên.</p>\n<p><b>Phân tích ngữ pháp:</b> Cấu trúc <i>take time to do something</i>. Đứng trước tân ngữ trực tiếp <i>each of the budget changes</i>, ta cần ngoại động từ <b>(A) detail</b> (trình bày chi tiết / giải thích cụ thể từng mục).<br/>- (B) <i>attend</i>: tham dự (không thể attend a change).<br/>- (C) <i>respond</i>: cần đi với giới từ <i>to</i> (respond to something).<br/>- (D) <i>comply</i>: cần đi với giới từ <i>with</i> (comply with something).</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> <i>Detail</i> ngoài danh từ còn là một ngoại động từ rất hay gặp trong TOEIC: <i>to detail something</i> = trình bày chi tiết điều gì. Các phương án khác như <i>respond to</i>, <i>comply with</i> đều thiếu giới từ.</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Transitive Verb",
        "clueHint": "Động từ nào nhận trực tiếp tân ngữ 'each of the budget changes' mang nghĩa 'giải thích/trình bày chi tiết từng điểm'?",
        "syntaxBreakdown": {
            "subject": "Ms. Alshammari",
            "verb": "took",
            "objectOrComplement": "a full hour [to detail each of the budget changes during the staff meeting]",
            "blankRole": "Động từ nguyên mẫu có to chỉ mục đích hành động"
        }
    },
    {
        "id": "ets22_t5_p5_125",
        "number": 125,
        "text": "It is recommended that clients book the Desert Rose Ballroom for their event more than four months _______.",
        "options": {
            "A": "over time",
            "B": "in advance",
            "C": "up to now",
            "D": "far ahead"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Khách hàng được khuyến nghị nên đặt trước Phòng khiêu vũ Desert Rose cho sự kiện của họ trước hơn bốn tháng.</p>\n<p><b>Phân tích ngữ pháp:</b> Cụm thành ngữ chỉ thời gian đặt trước quen thuộc nhất trong các tình huống thương mại, khách sạn, nhà hàng là <b>(B) in advance</b> (trước). Cấu trúc: <i>[khoảng thời gian] + in advance</i> (ví dụ: four months in advance = trước 4 tháng).<br/>- (A) <i>over time</i>: theo thời gian trôi qua.<br/>- (C) <i>up to now</i>: cho đến tận bây giờ (dùng với thì hiện tại hoàn thành).<br/>- (D) <i>far ahead</i>: thường dùng <i>far ahead of time</i>, không đi trực tiếp sau khoảng thời gian cụ thể như <i>in advance</i>.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Cụm từ bất hủ khi đặt chỗ trước trong TOEIC: <i>book / reserve ... in advance</i>. Đi sau khoảng thời gian: <i>four months in advance</i>.</p>",
        "type": "Idiom",
        "subCategory": "Preposition & Conjunction",
        "grammarTag": "Idiomatic Time Phrase",
        "clueHint": "Cụm từ quen thuộc đi với hành động đặt phòng trước: 'book ... four months _______'?",
        "syntaxBreakdown": {
            "subject": "clients",
            "verb": "(should) book",
            "objectOrComplement": "the Desert Rose Ballroom for their event more than four months [in advance]",
            "blankRole": "Cụm giới từ trạng ngữ chỉ thời gian đặt trước"
        }
    },
    {
        "id": "ets22_t5_p5_126",
        "number": 126,
        "text": "For a true understanding of our production levels, data from oil-drilling sites must be as _______ as possible.",
        "options": {
            "A": "accurate",
            "B": "optimistic",
            "C": "exclusive",
            "D": "competitive"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Để hiểu đúng thực tế về mức sản xuất của chúng ta, dữ liệu từ các điểm khoan dầu phải chính xác nhất có thể.</p>\n<p><b>Phân tích ngữ pháp:</b> Cấu trúc so sánh ngang bằng: <i>as + Adjective + as possible</i>. Bổ nghĩa cho danh từ <i>data</i> (dữ liệu) để có được <i>a true understanding</i> (sự hiểu biết đúng đắn/chân thực), tính từ phù hợp nhất về nghĩa là <b>(A) accurate</b> (chính xác).<br/>- (B) <i>optimistic</i>: lạc quan.<br/>- (C) <i>exclusive</i>: độc quyền.<br/>- (D) <i>competitive</i>: cạnh tranh.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Dữ liệu phục vụ việc phân tích thực tế: <i>accurate data / accurate information</i>. Chọn ngay <b>accurate</b>.</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Adjective",
        "clueHint": "Dữ liệu phục vụ cho việc 'hiểu đúng thực tế' (true understanding) thì phải có tính chất gì nhất có thể?",
        "syntaxBreakdown": {
            "subject": "data from oil-drilling sites",
            "verb": "must be",
            "objectOrComplement": "as [accurate] as possible",
            "blankRole": "Tính từ vị ngữ trong cấu trúc so sánh ngang bằng as... as possible"
        }
    },
    {
        "id": "ets22_t5_p5_127",
        "number": 127,
        "text": "Adopting advanced billing software would improve Narrin Group's fiscal-management process _______.",
        "options": {
            "A": "substantial",
            "B": "substantially",
            "C": "more substantial",
            "D": "substances"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Việc áp dụng phần mềm lập hóa đơn tiên tiến sẽ cải thiện đáng kể quy trình quản lý tài chính của Tập đoàn Narrin.</p>\n<p><b>Phân tích ngữ pháp:</b> Câu đã đầy đủ thành phần: Chủ ngữ (<i>Adopting advanced billing software</i>) + Động từ (<i>would improve</i>) + Tân ngữ (<i>Narrin Group's fiscal-management process</i>). Đứng ở cuối câu sau một ngoại động từ và tân ngữ, vị trí này cần một phó từ phương thức để bổ nghĩa cho động từ <i>improve</i>. Chọn phó từ có đuôi <b>-ly</b> <b>(B) substantially</b> (đáng kể/rất nhiều).<br/>- (A) <i>substantial</i>: tính từ đáng kể.<br/>- (C) <i>more substantial</i>: tính từ so sánh hơn.<br/>- (D) <i>substances</i>: danh từ các chất.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Vị trí: <i>Subject + Verb + Object + Adverb</i>. Phó từ đứng cuối bổ nghĩa cho động từ <i>improve</i>. Cụm từ thường gặp: <i>improve substantially / increase substantially</i>.</p>",
        "type": "Word Form",
        "subCategory": "Word Form",
        "grammarTag": "Adverb of Manner",
        "clueHint": "Sau khi câu đã hoàn chỉnh S + V + O, từ loại nào đứng cuối câu để bổ nghĩa cho động từ 'improve'?",
        "syntaxBreakdown": {
            "subject": "Adopting advanced billing software",
            "verb": "would improve",
            "objectOrComplement": "Narrin Group's fiscal-management process [substantially]",
            "blankRole": "Phó từ phương thức bổ nghĩa cho động từ improve"
        }
    },
    {
        "id": "ets22_t5_p5_128",
        "number": 128,
        "text": "Thanks to the effective _______ of Drinkever's first beverage, last month's product launch was a success.",
        "options": {
            "A": "service",
            "B": "promotion",
            "C": "response",
            "D": "information"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Nhờ chiến dịch quảng bá hiệu quả cho loại đồ uống đầu tiên của Drinkever, đợt ra mắt sản phẩm tháng trước đã thành công tốt đẹp.</p>\n<p><b>Phân tích ngữ pháp:</b> Trong bối cảnh ra mắt sản phẩm mới (product launch), hoạt động đi cùng để tạo nên thành công chính là hoạt động quảng bá, tiếp thị sản phẩm <b>(B) promotion</b>. Cụm <i>effective promotion</i> = sự quảng bá hiệu quả.<br/>- (A) <i>service</i>: dịch vụ.<br/>- (C) <i>response</i>: phản hồi.<br/>- (D) <i>information</i>: thông tin.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Đi cùng với <i>product launch</i> (ra mắt sản phẩm) thì từ khóa trọng tâm luôn là <i>promotion / marketing campaign</i>.</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Noun",
        "clueHint": "Yếu tố nào liên quan đến đồ uống mới giúp buổi ra mắt sản phẩm (product launch) thành công? 'Chiến dịch quảng bá' là từ gì?",
        "syntaxBreakdown": {
            "subject": "last month's product launch",
            "verb": "was",
            "objectOrComplement": "a success [Thanks to the effective promotion of Drinkever's first beverage]",
            "blankRole": "Danh từ làm tân ngữ sau tính từ effective và giới từ Thanks to"
        }
    },
    {
        "id": "ets22_t5_p5_129",
        "number": 129,
        "text": "By this time next year, Grasswell Industries _______ two new plants in eastern Europe.",
        "options": {
            "A": "opens",
            "B": "will have opened",
            "C": "is opening",
            "D": "had opened"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Tính đến thời điểm này vào năm tới, Grasswell Industries sẽ đã mở hai nhà máy mới ở Đông Âu.</p>\n<p><b>Phân tích ngữ pháp:</b> Cụm trạng ngữ thời gian <i>By this time next year</i> (Trước thời điểm này năm tới) là dấu hiệu kinh điển của thì Tương lai hoàn thành (Future Perfect Tense). Thì tương lai hoàn thành diễn tả một hành động sẽ hoàn tất trước một thời điểm xác định trong tương lai. Cấu trúc: <b>will have + V3/ed</b>. Do đó <b>(B) will have opened</b> là đáp án chính xác duy nhất.<br/>- (A) <i>opens</i>: hiện tại đơn.<br/>- (C) <i>is opening</i>: hiện tại tiếp diễn.<br/>- (D) <i>had opened</i>: quá khứ hoàn thành.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Dấu hiệu nhận biết thì: <i>By + mốc thời gian tương lai (next year / next month / 2026...) -> chia Future Perfect (will have V3/ed)</i>.</p>",
        "type": "Verb Tense",
        "subCategory": "Verbs & Tenses",
        "grammarTag": "Future Perfect Tense",
        "clueHint": "Dấu hiệu 'By this time next year' (Trước thời điểm này năm sau). Cần thì gì diễn tả hành động sẽ hoàn tất trước một mốc trong tương lai?",
        "syntaxBreakdown": {
            "subject": "Grasswell Industries",
            "verb": "[will have opened]",
            "objectOrComplement": "two new plants in eastern Europe [By this time next year]",
            "blankRole": "Động từ vị ngữ chia thì tương lai hoàn thành"
        }
    },
    {
        "id": "ets22_t5_p5_130",
        "number": 130,
        "text": "Please put an _______ supply of premium snack items on the carts for the next flight.",
        "options": {
            "A": "absolute",
            "B": "earned",
            "C": "adequate",
            "D": "energetic"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Xin vui lòng xếp một lượng đầy đủ các món đồ ăn nhẹ cao cấp lên xe đẩy cho chuyến bay tiếp theo.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng sau mạo từ <i>an</i> (bắt đầu bằng nguyên âm) và trước danh từ <i>supply</i> (nguồn cung / lượng dự trữ). Tính từ <b>(C) adequate</b> (đầy đủ, thỏa đáng) kết hợp với <i>supply</i> tạo thành cụm từ cố định <i>an adequate supply of something</i> (nguồn cung cấp đầy đủ).<br/>- (A) <i>absolute</i>: tuyệt đối.<br/>- (B) <i>earned</i>: kiếm được/thu được.<br/>- (D) <i>energetic</i>: năng động, giàu năng lượng.</p>\n<p><b>Mẹo giải nhanh & Cảnh báo bẫy ETS:</b> Mạo từ <i>an</i> báo hiệu từ bắt đầu bằng nguyên âm. Collocation chuẩn mực: <i>an adequate supply / adequate funding / adequate preparation</i>.</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Adjective",
        "clueHint": "Mạo từ 'an' + tính từ + 'supply of premium snack items'. Tính từ nào mang nghĩa 'đầy đủ, đáp ứng đủ nhu cầu'?",
        "syntaxBreakdown": {
            "subject": "(You - ngụ ý)",
            "verb": "put",
            "objectOrComplement": "an [adequate] supply of premium snack items on the carts for the next flight",
            "blankRole": "Tính từ đứng sau an bổ nghĩa cho danh từ supply"
        }
    }
]

output_path = "public/data/ets2022/test5/part5.json"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(part5_data, f, indent=2, ensure_ascii=False)

print(f"Generated {len(part5_data)} questions in {output_path}")
