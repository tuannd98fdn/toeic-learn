import json
import os

part5_data = [
    {
        "id": "ets22_t6_p5_101",
        "number": 101,
        "text": "Chef Daniels impresses customers with _______ sophisticated entrees.",
        "options": {
            "A": "his",
            "B": "him",
            "C": "himself",
            "D": "he"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Đầu bếp Daniels gây ấn tượng với khách hàng bằng các món ăn chính tinh tế của mình.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng trước cụm danh từ <i>sophisticated entrees</i> (các món chính tinh tế). Ta cần một tính từ sở hữu bổ nghĩa cho danh từ theo sau. Tính từ sở hữu <b>(A) his</b> (của anh ấy) là đáp án chính xác.<br/>- (B) <i>him</i>: đại từ tân ngữ.<br/>- (C) <i>himself</i>: đại từ phản thân.<br/>- (D) <i>he</i>: đại từ chủ ngữ.</p>\n<p><b>Mẹo giải nhanh:</b> Đứng trước [Tính từ + Danh từ] luôn cần một Tính từ sở hữu (my/your/his/her/its/our/their).</p>",
        "type": "Pronoun",
        "subCategory": "Possessive Adjective",
        "grammarTag": "Possessive Pronoun",
        "clueHint": "Vị trí chỗ trống đứng trước cụm danh từ 'sophisticated entrees'. Cần từ loại nào để chỉ sở hữu?",
        "syntaxBreakdown": {
            "subject": "Chef Daniels",
            "verb": "impresses",
            "objectOrComplement": "customers with [his] sophisticated entrees",
            "blankRole": "Tính từ sở hữu bổ nghĩa cho cụm danh từ 'sophisticated entrees'"
        }
    },
    {
        "id": "ets22_t6_p5_102",
        "number": 102,
        "text": "Oil production _______ 5 percent from January to February.",
        "options": {
            "A": "drop",
            "B": "to drop",
            "C": "dropping",
            "D": "dropped"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Sản lượng dầu đã giảm 5% từ tháng Một đến tháng Hai.</p>\n<p><b>Phân tích ngữ pháp:</b> Câu đã có chủ ngữ là <i>Oil production</i> (danh từ số ít không đếm được) nhưng chưa có động từ chính chia thì (main verb). Cụm thời gian <i>from January to February</i> chỉ mốc sự kiện đã diễn ra và kết thúc trong quá khứ. Động từ chia ở quá khứ đơn <b>(D) dropped</b> là chuẩn xác.<br/>- (A) <i>drop</i>: động từ nguyên mẫu số nhiều (sai thì và không hòa hợp chủ ngữ số ít).<br/>- (B) <i>to drop</i>: to-infinitive (không làm vị ngữ chính).<br/>- (C) <i>dropping</i>: V-ing đứng một mình không làm vị ngữ chính.</p>\n<p><b>Mẹo giải nhanh:</b> Xác định câu thiếu động từ chính, loại ngay dạng to-V và V-ing đứng một mình.</p>",
        "type": "Verb Form",
        "subCategory": "Verb Tense",
        "grammarTag": "Past Simple",
        "clueHint": "Khoảng thời gian 'from January to February' diễn tả sự việc đã xảy ra. Cần động từ chính chia thì gì?",
        "syntaxBreakdown": {
            "subject": "Oil production",
            "verb": "[dropped]",
            "objectOrComplement": "5 percent from January to February",
            "blankRole": "Động từ chính của câu chia thì quá khứ đơn"
        }
    },
    {
        "id": "ets22_t6_p5_103",
        "number": 103,
        "text": "Ms. Ito has _______ suggestions to resolve the computer problems.",
        "options": {
            "A": "help",
            "B": "helper",
            "C": "helped",
            "D": "helpful"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Cô Ito có những đề xuất hữu ích để giải quyết các sự cố máy tính.</p>\n<p><b>Phân tích ngữ pháp:</b> Trong câu này, <i>has</i> đóng vai trò là ngoại động từ chính (có), theo sau là tân ngữ danh từ số nhiều <i>suggestions</i>. Chỗ trống đứng trước danh từ <i>suggestions</i> nên cần một tính từ bổ nghĩa. Tính từ <b>(D) helpful</b> (hữu ích, có ích) là lựa chọn chuẩn xác.<br/>- (A) <i>help</i>: danh từ/động từ giúp đỡ.<br/>- (B) <i>helper</i>: danh từ người trợ giúp.<br/>- (C) <i>helped</i>: quá khứ phân từ (không hợp nghĩa).</p>\n<p><b>Mẹo giải nhanh:</b> Tránh bẫy nhìn thấy <i>has</i> vội vàng chọn V-ed (hiện tại hoàn thành). Đọc tiếp thấy có danh từ <i>suggestions</i> làm tân ngữ, nên vị trí này cần Tính từ đứng trước Danh từ: <i>helpful suggestions</i>.</p>",
        "type": "Word Form",
        "subCategory": "Adjective",
        "grammarTag": "Adjective Modifying Noun",
        "clueHint": "Chỗ trống đứng trước danh từ 'suggestions' để bổ nghĩa cho nó: 'những đề xuất hữu ích'. Cần tính từ nào?",
        "syntaxBreakdown": {
            "subject": "Ms. Ito",
            "verb": "has",
            "objectOrComplement": "[helpful] suggestions to resolve the computer problems",
            "blankRole": "Tính từ bổ nghĩa cho danh từ tân ngữ 'suggestions'"
        }
    },
    {
        "id": "ets22_t6_p5_104",
        "number": 104,
        "text": "The Vidorn Hotel _______ to construct a fountain in the front entryway.",
        "options": {
            "A": "matches",
            "B": "plans",
            "C": "tells",
            "D": "praises"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Khách sạn Vidorn lên kế hoạch xây dựng một đài phun nước ở lối vào phía trước.</p>\n<p><b>Phân tích ngữ pháp & từ vựng:</b> Cấu trúc <i>plan to do something</i> (lên kế hoạch làm việc gì) là cụm diễn đạt chuẩn mực. Động từ <b>(B) plans</b> đi với động từ nguyên mẫu có 'to' (<i>to construct</i>) phù hợp cả ngữ pháp và ngữ nghĩa.<br/>- (A) <i>matches</i>: phù hợp, khớp với (ngoại động từ đi với tân ngữ trực tiếp).<br/>- (C) <i>tells</i>: bảo ai làm gì (cần tân ngữ: <i>tell somebody to do something</i>).<br/>- (D) <i>praises</i>: khen ngợi.</p>\n<p><b>Mẹo giải nhanh:</b> Thấy cấu trúc <i>_______ to + V</i>, các động từ quen thuộc hay đi cùng là <i>plan / intend / decide / hope / agree to do something</i>.</p>",
        "type": "Vocabulary",
        "subCategory": "Verb Usage",
        "grammarTag": "Verb + To-Infinitive",
        "clueHint": "Động từ nào đi trực tiếp với to-infinitive 'to construct' mang nghĩa lên kế hoạch?",
        "syntaxBreakdown": {
            "subject": "The Vidorn Hotel",
            "verb": "[plans]",
            "objectOrComplement": "to construct a fountain in the front entryway",
            "blankRole": "Động từ chính của câu đi cùng to-infinitive"
        }
    },
    {
        "id": "ets22_t6_p5_105",
        "number": 105,
        "text": "The schedule of events for the music _______ will be posted on Friday.",
        "options": {
            "A": "festival",
            "B": "situation",
            "C": "instrument",
            "D": "issue"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Lịch trình các sự kiện cho lễ hội âm nhạc sẽ được niêm yết vào thứ Sáu.</p>\n<p><b>Phân tích từ vựng:</b> Cụm danh từ ghép <i>music festival</i> (lễ hội âm nhạc) kết hợp hoàn hảo với cụm <i>schedule of events</i> (lịch trình các sự kiện). Đáp án <b>(A) festival</b> là lựa chọn chính xác.<br/>- (B) <i>situation</i>: tình huống.<br/>- (C) <i>instrument</i>: nhạc cụ (nhạc cụ không có 'lịch trình các sự kiện').<br/>- (D) <i>issue</i>: vấn đề, số phát hành.</p>\n<p><b>Mẹo giải nhanh:</b> Collocation quen thuộc: <i>music festival</i> (lễ hội âm nhạc) đi cùng <i>schedule of events</i>.</p>",
        "type": "Vocabulary",
        "subCategory": "Noun Collocation",
        "grammarTag": "Compound Noun",
        "clueHint": "Sự kiện âm nhạc nào có 'lịch trình các sự kiện' (schedule of events)?",
        "syntaxBreakdown": {
            "subject": "The schedule of events for the music [festival]",
            "verb": "will be posted",
            "objectOrComplement": "on Friday",
            "blankRole": "Danh từ tạo thành cụm danh từ 'music festival'"
        }
    },
    {
        "id": "ets22_t6_p5_106",
        "number": 106,
        "text": "When processing a medical leave request, the attending physician must fill out a form _______.",
        "options": {
            "A": "completes",
            "B": "completed",
            "C": "completely",
            "D": "completeness"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Khi xử lý yêu cầu nghỉ phép vì lý do y tế, bác sĩ điều trị phải điền đầy đủ/hoàn chỉnh vào biểu mẫu.</p>\n<p><b>Phân tích ngữ pháp:</b> Mệnh đề chính <i>the attending physician must fill out a form</i> đã đầy đủ thành phần: Chủ ngữ (<i>the attending physician</i>) + Động từ khuyết thiếu & cụm động từ (<i>must fill out</i>) + Tân ngữ (<i>a form</i>). Vị trí cuối câu cần một trạng từ chỉ cách thức bổ nghĩa cho hành động <i>fill out</i>. Trạng từ <b>(C) completely</b> (hoàn chỉnh, đầy đủ) là đáp án đúng.<br/>- (A) <i>completes</i>: động từ chia thì.<br/>- (B) <i>completed</i>: tính từ/động từ dạng quá khứ.<br/>- (D) <i>completeness</i>: danh từ sự trọn vẹn.</p>\n<p><b>Mẹo giải nhanh:</b> Câu đã trọn vẹn S + V + O, chỗ trống cuối câu thường là Trạng từ (-ly) bổ nghĩa cho động từ.</p>",
        "type": "Word Form",
        "subCategory": "Adverb",
        "grammarTag": "Adverb of Manner",
        "clueHint": "Câu S + V + O đã hoàn chỉnh. Vị trí cuối câu bổ nghĩa cho động từ 'fill out' cần từ loại nào?",
        "syntaxBreakdown": {
            "subject": "the attending physician",
            "verb": "must fill out",
            "objectOrComplement": "a form [completely]",
            "blankRole": "Trạng từ chỉ cách thức bổ nghĩa cho cụm động từ 'must fill out'"
        }
    },
    {
        "id": "ets22_t6_p5_107",
        "number": 107,
        "text": "Many fashion stylists _______ their online portfolios on a regular basis.",
        "options": {
            "A": "dress",
            "B": "invite",
            "C": "range",
            "D": "update"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Nhiều nhà tạo mẫu thời trang cập nhật hồ sơ năng lực trực tuyến của họ một cách thường xuyên.</p>\n<p><b>Phân tích từ vựng:</b> Tân ngữ của câu là <i>their online portfolios</i> (hồ sơ năng lực/danh mục tác phẩm trực tuyến). Động từ kết hợp hợp lý nhất với việc bổ sung tác phẩm mới vào portfolio định kỳ (<i>on a regular basis</i>) là <b>(D) update</b> (cập nhật).<br/>- (A) <i>dress</i>: mặc quần áo.<br/>- (B) <i>invite</i>: mời.<br/>- (C) <i>range</i>: dao động, phân loại.</p>\n<p><b>Mẹo giải nhanh:</b> Cụm từ hay gặp: <i>update online portfolio / website / profile</i> (cập nhật hồ sơ/trang web).</p>",
        "type": "Vocabulary",
        "subCategory": "Verb Usage",
        "grammarTag": "Action Verb",
        "clueHint": "Hành động nào thường đi với tân ngữ 'online portfolios' (hồ sơ trực tuyến) một cách định kỳ?",
        "syntaxBreakdown": {
            "subject": "Many fashion stylists",
            "verb": "[update]",
            "objectOrComplement": "their online portfolios on a regular basis",
            "blankRole": "Động từ vị ngữ chính của câu"
        }
    },
    {
        "id": "ets22_t6_p5_108",
        "number": 108,
        "text": "All flights were delayed three hours because of a heavy blanket of _______.",
        "options": {
            "A": "fog",
            "B": "fogger",
            "C": "foggy",
            "D": "fogged"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Tất cả các chuyến bay đã bị hoãn ba giờ đồng hồ vì một màn sương mù dày đặc.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng sau giới từ <i>of</i>, đóng vai trò là danh từ được chỉ định trong cụm <i>a heavy blanket of + [Noun]</i> (một lớp/màn dày đặc của cái gì). Danh từ không đếm được chỉ hiện tượng thời tiết <b>(A) fog</b> (sương mù) là đáp án đúng.<br/>- (B) <i>fogger</i>: máy phun sương.<br/>- (C) <i>foggy</i>: tính từ có sương mù.<br/>- (D) <i>fogged</i>: động từ quá khứ / phân từ bị làm mờ.</p>\n<p><b>Mẹo giải nhanh:</b> Sau giới từ <i>of</i> cần một danh từ. Thành ngữ quen thuộc: <i>a blanket of fog</i> (màn sương mù bao phủ).</p>",
        "type": "Word Form",
        "subCategory": "Noun",
        "grammarTag": "Noun after Preposition",
        "clueHint": "Sau giới từ 'of' cần một danh từ chỉ hiện tượng thời tiết khiến máy bay bị hoãn chuyến.",
        "syntaxBreakdown": {
            "subject": "All flights",
            "verb": "were delayed",
            "objectOrComplement": "three hours because of a heavy blanket of [fog]",
            "blankRole": "Danh từ làm tân ngữ cho giới từ 'of'"
        }
    },
    {
        "id": "ets22_t6_p5_109",
        "number": 109,
        "text": "The Northwick Orchestra will perform later this month _______ Reverbury Hall.",
        "options": {
            "A": "at",
            "B": "up",
            "C": "on",
            "D": "of"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Dàn nhạc giao hưởng Northwick sẽ biểu diễn vào cuối tháng này tại Khán phòng Reverbury.</p>\n<p><b>Phân tích ngữ pháp:</b> Trước một địa điểm cụ thể, khán phòng biểu diễn, tòa nhà (<i>Reverbury Hall</i>), ta sử dụng giới từ chỉ nơi chốn <b>(A) at</b>.<br/>- (B) <i>up</i>: lên trên.<br/>- (C) <i>on</i>: dùng cho tầng nhà, bề mặt, tên đường phố.<br/>- (D) <i>of</i>: của.</p>\n<p><b>Mẹo giải nhanh:</b> <i>perform at [venue/hall/theater]</i>: biểu diễn tại địa điểm cụ thể dùng giới từ <b>at</b>.</p>",
        "type": "Preposition",
        "subCategory": "Preposition of Place",
        "grammarTag": "Preposition 'At'",
        "clueHint": "Giới từ nào đứng trước một địa điểm khán phòng/tòa nhà cụ thể như 'Reverbury Hall'?",
        "syntaxBreakdown": {
            "subject": "The Northwick Orchestra",
            "verb": "will perform",
            "objectOrComplement": "later this month [at] Reverbury Hall",
            "blankRole": "Giới từ chỉ địa điểm cụ thể"
        }
    },
    {
        "id": "ets22_t6_p5_110",
        "number": 110,
        "text": "Only staff _______ based in the Toronto office may reserve the conference room.",
        "options": {
            "A": "possibly",
            "B": "currently",
            "C": "immediately",
            "D": "exactly"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Chỉ những nhân viên hiện đang làm việc tại văn phòng Toronto mới có thể đặt phòng hội nghị.</p>\n<p><b>Phân tích từ vựng:</b> Cụm phân từ rút gọn <i>based in the Toronto office</i> (đặt trụ sở / làm việc tại văn phòng Toronto). Trạng từ chỉ thời gian hiện tại <b>(B) currently</b> kết hợp tự nhiên: <i>currently based in...</i> (hiện đang làm việc/đóng quân tại...).<br/>- (A) <i>possibly</i>: có khả năng.<br/>- (C) <i>immediately</i>: ngay lập tức.<br/>- (D) <i>exactly</i>: một cách chính xác.</p>\n<p><b>Mẹo giải nhanh:</b> Collocation kinh điển trong TOEIC: <i>currently based in / located in</i> (hiện đang tọa lạc/làm việc tại).</p>",
        "type": "Vocabulary",
        "subCategory": "Adverb Usage",
        "grammarTag": "Adverb of Time",
        "clueHint": "Trạng từ nào đi cùng 'based in...' để chỉ tình trạng 'hiện tại đang làm việc tại'?",
        "syntaxBreakdown": {
            "subject": "Only staff [currently] based in the Toronto office",
            "verb": "may reserve",
            "objectOrComplement": "the conference room",
            "blankRole": "Trạng từ bổ nghĩa cho phân từ 'based in...'"
        }
    },
    {
        "id": "ets22_t6_p5_111",
        "number": 111,
        "text": "_______ of the employees have placed their order for a new standing desk.",
        "options": {
            "A": "Any",
            "B": "Several",
            "C": "Another",
            "D": "Either"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Một số nhân viên đã đặt mua bàn làm việc đứng mới.</p>\n<p><b>Phân tích ngữ pháp:</b> Động từ vị ngữ của câu là <i>have placed</i> (chia ở dạng số nhiều) và tính từ sở hữu là <i>their</i>. Do đó đại từ làm chủ ngữ phải mang nghĩa số nhiều. Đại từ định lượng <b>(B) Several</b> (một vài, một số) đi với <i>of the + danh từ số nhiều</i> và nhận động từ số nhiều.<br/>- (A) <i>Any</i>: thường dùng trong câu phủ định hoặc nghi vấn.<br/>- (C) <i>Another</i>: số ít, nhận động từ số ít <i>has</i>.<br/>- (D) <i>Either</i>: một trong hai, nhận động từ số ít <i>has</i>.</p>\n<p><b>Mẹo giải nhanh:</b> Nhìn thấy động từ số nhiều <i>have</i> và tính từ sở hữu <i>their</i>, loại ngay các từ số ít (<i>another, either</i>). Chọn <b>Several</b>.</p>",
        "type": "Pronoun / Quantifier",
        "subCategory": "Subject-Verb Agreement",
        "grammarTag": "Indefinite Pronoun",
        "clueHint": "Động từ số nhiều 'have placed' và 'their' đòi hỏi đại từ chủ ngữ số nhiều nào?",
        "syntaxBreakdown": {
            "subject": "[Several] of the employees",
            "verb": "have placed",
            "objectOrComplement": "their order for a new standing desk",
            "blankRole": "Đại từ chỉ số lượng số nhiều làm chủ ngữ chính"
        }
    },
    {
        "id": "ets22_t6_p5_112",
        "number": 112,
        "text": "Betsy Riley will seek support from _______ volunteers for our revised museum tours.",
        "options": {
            "A": "former",
            "B": "following",
            "C": "entire",
            "D": "gradual"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Betsy Riley sẽ tìm kiếm sự hỗ trợ từ các cựu tình nguyện viên cho các chuyến tham quan bảo tàng đã được sửa đổi của chúng tôi.</p>\n<p><b>Phân tích từ vựng:</b> Chỗ trống đứng trước danh từ số nhiều chỉ người <i>volunteers</i>. Tính từ <b>(A) former</b> (trước đây, cựu) tạo nên cụm <i>former volunteers</i> (các tình nguyện viên trước đây / cựu tình nguyện viên), phù hợp hoàn hảo với ngữ cảnh liên hệ lại những người từng tham gia.<br/>- (B) <i>following</i>: sau đây, tiếp theo.<br/>- (C) <i>entire</i>: toàn bộ (thường đi với danh từ số ít: <i>the entire team</i>).<br/>- (D) <i>gradual</i>: dần dần, từng bước (chỉ sự thay đổi).</p>\n<p><b>Mẹo giải nhanh:</b> <i>former + [chức danh/người]</i>: cựu nhân viên/cựu tình nguyện viên (<i>former employees, former volunteers</i>).</p>",
        "type": "Vocabulary",
        "subCategory": "Adjective Usage",
        "grammarTag": "Descriptive Adjective",
        "clueHint": "Tính từ nào đi với 'volunteers' để chỉ những người tình nguyện viên từng tham gia trước đây?",
        "syntaxBreakdown": {
            "subject": "Betsy Riley",
            "verb": "will seek",
            "objectOrComplement": "support from [former] volunteers for our revised museum tours",
            "blankRole": "Tính từ bổ nghĩa cho danh từ 'volunteers'"
        }
    },
    {
        "id": "ets22_t6_p5_113",
        "number": 113,
        "text": "Casorama customers receive store _______ instead of a cash refund upon returning an item.",
        "options": {
            "A": "acceptance",
            "B": "training",
            "C": "preference",
            "D": "credit"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Khách hàng của Casorama nhận được điểm tín dụng mua hàng tại cửa hàng thay vì tiền mặt hoàn lại khi trả lại một món đồ.</p>\n<p><b>Phân tích từ vựng:</b> Thuật ngữ thương mại bán lẻ kinh điển: <i>store credit</i> (phiếu tín dụng mua hàng / số dư mua hàng tại cửa hàng) thường được cấp thay cho việc hoàn tiền mặt (<i>instead of a cash refund</i>). Đáp án <b>(D) credit</b> là lựa chọn chuẩn xác.<br/>- (A) <i>acceptance</i>: sự chấp nhận.<br/>- (B) <i>training</i>: sự đào tạo.<br/>- (C) <i>preference</i>: sự ưu tiên/ưa thích.</p>\n<p><b>Mẹo giải nhanh:</b> Cụm danh từ cố định trong bán lẻ TOEIC: <i>store credit</i> (tiền tích lũy mua sắm tại cửa hàng).</p>",
        "type": "Vocabulary",
        "subCategory": "Business Vocabulary",
        "grammarTag": "Collocation",
        "clueHint": "Cụm từ thương mại đi cùng 'store' để chỉ khoản tiền ghi có mua sắm thay cho tiền mặt hoàn lại (cash refund).",
        "syntaxBreakdown": {
            "subject": "Casorama customers",
            "verb": "receive",
            "objectOrComplement": "store [credit] instead of a cash refund upon returning an item",
            "blankRole": "Danh từ tạo thành cụm danh từ 'store credit'"
        }
    },
    {
        "id": "ets22_t6_p5_114",
        "number": 114,
        "text": "Our factory in Mannheim was upgraded last year, but the loading dock _______ needs work.",
        "options": {
            "A": "such",
            "B": "very",
            "C": "still",
            "D": "even"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Nhà máy của chúng tôi ở Mannheim đã được nâng cấp vào năm ngoái, nhưng khu vực bốc dỡ hàng vẫn cần phải sửa chữa thêm.</p>\n<p><b>Phân tích ngữ pháp:</b> Liên từ <i>but</i> chỉ sự tương phản (năm ngoái đã nâng cấp nhưng một bộ phận vẫn tiếp tục cần sửa chữa). Trạng từ <b>(C) still</b> (vẫn còn) đứng trước động từ thường <i>needs</i> để diễn tả sự tiếp diễn của trạng thái chưa hoàn tất.<br/>- (A) <i>such</i>: như thế (tính từ/đại từ).<br/>- (B) <i>very</i>: rất (bổ nghĩa cho tính từ/trạng từ, không đứng trước động từ thường).<br/>- (D) <i>even</i>: thậm chí.</p>\n<p><b>Mẹo giải nhanh:</b> <i>still + Verb</i> diễn tả hành động/trạng thái vẫn đang tiếp diễn đối lập với mệnh đề trước đó.</p>",
        "type": "Grammar / Adverb",
        "subCategory": "Adverb Position",
        "grammarTag": "Adverb of Continuity",
        "clueHint": "Trạng từ nào đứng trước động từ 'needs' chỉ trạng thái 'vẫn còn' cần sửa chữa đối lập với việc đã nâng cấp năm ngoái?",
        "syntaxBreakdown": {
            "subject": "the loading dock",
            "verb": "[still] needs",
            "objectOrComplement": "work",
            "blankRole": "Trạng từ bổ nghĩa cho động từ 'needs'"
        }
    },
    {
        "id": "ets22_t6_p5_115",
        "number": 115,
        "text": "The recently _______ mayor said she plans to address the town’s traffic problems soon.",
        "options": {
            "A": "electing",
            "B": "election",
            "C": "elected",
            "D": "elects"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Thị trưởng vừa mới được đắc cử cho biết bà có kế hoạch sớm giải quyết các vấn đề giao thông của thị trấn.</p>\n<p><b>Phân tích ngữ pháp:</b> Chỗ trống đứng giữa trạng từ <i>recently</i> và danh từ <i>mayor</i> (thị trưởng). Thị trưởng là người được bầu cử (mang ý nghĩa bị động). Ta cần một quá khứ phân từ đóng vai trò tính từ mang nghĩa bị động. <b>(C) elected</b> tạo thành cụm <i>recently elected mayor</i> (thị trưởng vừa đắc cử).<br/>- (A) <i>electing</i>: hiện tại phân từ mang nghĩa chủ động (thị trưởng đi bầu ai đó - sai nghĩa).<br/>- (B) <i>election</i>: danh từ cuộc bầu cử.<br/>- (D) <i>elects</i>: động từ chia thì hiện tại đơn.</p>\n<p><b>Mẹo giải nhanh:</b> <i>recently + V-ed/P2 + Noun</i>: cụm phân từ bị động miêu tả người/vật vừa mới được làm gì (<i>recently appointed director, recently elected mayor</i>).</p>",
        "type": "Word Form",
        "subCategory": "Participle",
        "grammarTag": "Past Participle as Adjective",
        "clueHint": "Cần quá khứ phân từ mang nghĩa bị động (được bầu cử) đứng sau 'recently' bổ nghĩa cho 'mayor'.",
        "syntaxBreakdown": {
            "subject": "The recently [elected] mayor",
            "verb": "said",
            "objectOrComplement": "she plans to address the town's traffic problems soon",
            "blankRole": "Quá khứ phân từ đóng vai trò tính từ bổ nghĩa cho danh từ 'mayor'"
        }
    },
    {
        "id": "ets22_t6_p5_116",
        "number": 116,
        "text": "Mr. Kim’s research reveals that types of hay differ _______ in their nutritional content.",
        "options": {
            "A": "significant",
            "B": "signify",
            "C": "significance",
            "D": "significantly"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Nghiên cứu của ông Kim tiết lộ rằng các loại cỏ khô khác nhau đáng kể về hàm lượng dinh dưỡng của chúng.</p>\n<p><b>Phân tích ngữ pháp:</b> Mệnh đề sau <i>reveals that</i> có chủ ngữ <i>types of hay</i> và nội động từ <i>differ</i> (khác nhau). Để bổ nghĩa cho động từ <i>differ</i>, ta cần một trạng từ chỉ mức độ. Trạng từ <b>(D) significantly</b> (đáng kể) là lựa chọn duy nhất đúng.<br/>- (A) <i>significant</i>: tính từ.<br/>- (B) <i>signify</i>: động từ biểu thị.<br/>- (C) <i>significance</i>: danh từ tầm quan trọng.</p>\n<p><b>Mẹo giải nhanh:</b> Collocation thường gặp trong TOEIC: <i>differ significantly / vary significantly</i> (khác biệt/thay đổi một cách đáng kể).</p>",
        "type": "Word Form",
        "subCategory": "Adverb",
        "grammarTag": "Adverb Modifying Verb",
        "clueHint": "Từ loại nào đứng sau động từ 'differ' để bổ nghĩa mức độ 'khác biệt đáng kể'?",
        "syntaxBreakdown": {
            "subject": "types of hay",
            "verb": "differ",
            "objectOrComplement": "[significantly] in their nutritional content",
            "blankRole": "Trạng từ bổ nghĩa cho động từ 'differ'"
        }
    },
    {
        "id": "ets22_t6_p5_117",
        "number": 117,
        "text": "Let us extend our warmest welcome _______ Mr. Lam Keong Wu, our new vice president of marketing.",
        "options": {
            "A": "to",
            "B": "under",
            "C": "against",
            "D": "in"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Chúng ta hãy gửi lời chào đón nồng nhiệt nhất tới ông Lam Keong Wu, phó chủ tịch tiếp thị mới của chúng ta.</p>\n<p><b>Phân tích ngữ pháp & cụm từ:</b> Cấu trúc quen thuộc trong giao tiếp công sở: <i>extend a welcome TO somebody</i> (gửi lời chào đón tới ai). Giới từ <b>(A) to</b> là đáp án chính xác.<br/>- (B) <i>under</i>: dưới.<br/>- (C) <i>against</i>: chống lại.<br/>- (D) <i>in</i>: trong.</p>\n<p><b>Mẹo giải nhanh:</b> Collocation nghi thức: <i>extend our warmest welcome to someone</i>.</p>",
        "type": "Preposition",
        "subCategory": "Preposition Usage",
        "grammarTag": "Preposition 'To'",
        "clueHint": "Cấu trúc 'extend a welcome _______ somebody' (gửi lời chào đón tới ai) đi với giới từ nào?",
        "syntaxBreakdown": {
            "subject": "(You) Let us",
            "verb": "extend",
            "objectOrComplement": "our warmest welcome [to] Mr. Lam Keong Wu",
            "blankRole": "Giới từ chỉ hướng tiếp nhận của lời chào đón"
        }
    },
    {
        "id": "ets22_t6_p5_118",
        "number": 118,
        "text": "The latest polling shows increased public _______ for the stadium renovation project.",
        "options": {
            "A": "approve",
            "B": "approval",
            "C": "approving",
            "D": "approvingly"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Cuộc thăm dò ý kiến mới nhất cho thấy sự ủng hộ ngày càng tăng của công chúng đối với dự án cải tạo sân vận động.</p>\n<p><b>Phân tích ngữ pháp:</b> Động từ <i>shows</i> cần một danh từ làm tân ngữ. Đứng sau tính từ <i>increased</i> và <i>public</i> phải là một danh từ. Danh từ <b>(B) approval</b> (sự tán thành, sự chấp thuận/ủng hộ) tạo thành cụm <i>increased public approval for...</i> (sự ủng hộ của công chúng tăng lên đối với...).<br/>- (A) <i>approve</i>: động từ nguyên mẫu.<br/>- (C) <i>approving</i>: V-ing/tính từ.<br/>- (D) <i>approvingly</i>: trạng từ.</p>\n<p><b>Mẹo giải nhanh:</b> Đuôi <i>-al</i> của <i>approval</i> là danh từ (tương tự <i>proposal, removal, renewal</i>). Cần danh từ sau tính từ <i>public</i>.</p>",
        "type": "Word Form",
        "subCategory": "Noun",
        "grammarTag": "Noun Suffix -al",
        "clueHint": "Sau tính từ 'public' cần một danh từ chỉ sự tán thành/ủng hộ (đuôi -al).",
        "syntaxBreakdown": {
            "subject": "The latest polling",
            "verb": "shows",
            "objectOrComplement": "increased public [approval] for the stadium renovation project",
            "blankRole": "Danh từ chính làm tân ngữ cho động từ 'shows'"
        }
    },
    {
        "id": "ets22_t6_p5_119",
        "number": 119,
        "text": "Oshka Landscape Supply revenue is highly _______ on seasonal sales.",
        "options": {
            "A": "extensive",
            "B": "dependent",
            "C": "accessible",
            "D": "insightful"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Doanh thu của Công ty Cung ứng Cảnh quan Oshka phụ thuộc rất nhiều vào doanh số bán hàng theo mùa.</p>\n<p><b>Phân tích ngữ pháp & cụm từ:</b> Cấu trúc tính từ đi với giới từ <i>on</i>: <i>be dependent on something</i> (phụ thuộc vào cái gì). Tính từ <b>(B) dependent</b> kết hợp với <i>is highly dependent on</i> diễn tả doanh thu bị chi phối mạnh mẽ bởi doanh số theo mùa.<br/>- (A) <i>extensive</i>: sâu rộng, bao quát.<br/>- (C) <i>accessible</i>: có thể tiếp cận được (thường đi với <i>to</i>).<br/>- (D) <i>insightful</i>: sâu sắc.</p>\n<p><b>Mẹo giải nhanh:</b> Thấy giới từ <i>on</i> phía sau, chọn ngay cụm tính từ <i>dependent on</i> (phụ thuộc vào).</p>",
        "type": "Vocabulary / Prepositional Collocation",
        "subCategory": "Adjective + Preposition",
        "grammarTag": "Dependent on",
        "clueHint": "Tính từ nào đi với giới từ 'on' để tạo nghĩa 'phụ thuộc vào' doanh số bán hàng?",
        "syntaxBreakdown": {
            "subject": "Oshka Landscape Supply revenue",
            "verb": "is",
            "objectOrComplement": "highly [dependent] on seasonal sales",
            "blankRole": "Tính từ làm vị ngữ bổ nghĩa cho chủ ngữ (kết hợp với giới từ on)"
        }
    },
    {
        "id": "ets22_t6_p5_120",
        "number": 120,
        "text": "Tourism in Cork has slowed in recent weeks _______ the unseasonably cold weather.",
        "options": {
            "A": "as long as",
            "B": "in case of",
            "C": "because of",
            "D": "except for"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Ngành du lịch ở Cork đã chững lại trong những tuần gần đây vì thời tiết lạnh trái mùa.</p>\n<p><b>Phân tích ngữ pháp:</b> Phía sau chỗ trống là một cụm danh từ <i>the unseasonably cold weather</i> (thời tiết lạnh trái mùa) chỉ nguyên nhân khiến du lịch suy giảm. Cụm giới từ chỉ nguyên nhân <b>(C) because of + Noun Phrase</b> là đáp án chính xác.<br/>- (A) <i>as long as</i>: miễn là (liên từ đi với mệnh đề S + V).<br/>- (B) <i>in case of</i>: phòng khi, trong trường hợp xảy ra sự cố cấp bách.<br/>- (D) <i>except for</i>: ngoại trừ.</p>\n<p><b>Mẹo giải nhanh:</b> Phía sau là cụm danh từ chỉ lý do thời tiết xấu dẫn tới du lịch chậm lại, chọn <b>because of</b>.</p>",
        "type": "Preposition / Conjunction",
        "subCategory": "Preposition of Cause",
        "grammarTag": "Because of + Noun Phrase",
        "clueHint": "Cụm từ nào đi với cụm danh từ để chỉ nguyên nhân 'bởi vì thời tiết lạnh'?",
        "syntaxBreakdown": {
            "subject": "Tourism in Cork",
            "verb": "has slowed",
            "objectOrComplement": "in recent weeks [because of] the unseasonably cold weather",
            "blankRole": "Cụm giới từ chỉ nguyên nhân đứng trước cụm danh từ"
        }
    },
    {
        "id": "ets22_t6_p5_121",
        "number": 121,
        "text": "The Aznet Foundation is offering three $5,000 grants to entrepreneurs with the most _______ business ideas.",
        "options": {
            "A": "imagine",
            "B": "imagining",
            "C": "imaginative",
            "D": "imagination"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Quỹ Aznet đang cung cấp ba khoản tài trợ trị giá 5.000 đô la cho các doanh nhân có những ý tưởng kinh doanh giàu tính sáng tạo nhất.</p>\n<p><b>Phân tích ngữ pháp:</b> Cụm so sánh nhất <i>the most _______ business ideas</i> đứng trước cụm danh từ. Ta cần một tính từ dài bổ nghĩa cho danh từ <i>business ideas</i>. Tính từ <b>(C) imaginative</b> (giàu trí tưởng tượng, đầy tính sáng tạo) là đáp án đúng.<br/>- (A) <i>imagine</i>: động từ tưởng tượng.<br/>- (B) <i>imagining</i>: danh động từ.<br/>- (D) <i>imagination</i>: danh từ trí tưởng tượng.</p>\n<p><b>Mẹo giải nhanh:</b> Cấu trúc so sánh nhất: <i>the most + [Tính từ dài] + Danh từ</i>. Đuôi <i>-ive</i> là đuôi tính từ.</p>",
        "type": "Word Form",
        "subCategory": "Superlative Adjective",
        "grammarTag": "Superlative Degree",
        "clueHint": "Cấu trúc so sánh nhất 'the most + Tính từ + business ideas'. Cần tính từ đuôi -ive nào?",
        "syntaxBreakdown": {
            "subject": "The Aznet Foundation",
            "verb": "is offering",
            "objectOrComplement": "three $5,000 grants to entrepreneurs with the most [imaginative] business ideas",
            "blankRole": "Tính từ ở cấp so sánh nhất bổ nghĩa cho 'business ideas'"
        }
    },
    {
        "id": "ets22_t6_p5_122",
        "number": 122,
        "text": "Based on her _______ performance, Ms. Soares is likely to do quite well in the 50-meter race.",
        "options": {
            "A": "neither",
            "B": "past",
            "C": "apart",
            "D": "twice"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Dựa trên thành tích trong quá khứ của mình, cô Soares nhiều khả năng sẽ thi đấu khá tốt ở cự ly chạy 50 mét.</p>\n<p><b>Phân tích từ vựng & ngữ pháp:</b> Chỗ trống đứng sau tính từ sở hữu <i>her</i> và trước danh từ <i>performance</i>. Từ <b>(B) past</b> đóng vai trò tính từ (trong quá khứ, trước đây) tạo nên cụm <i>her past performance</i> (thành tích thi đấu trước đây của cô ấy).<br/>- (A) <i>neither</i>: không người nào trong hai.<br/>- (C) <i>apart</i>: tách rời (thường đi với <i>apart from</i>).<br/>- (D) <i>twice</i>: hai lần (trạng từ chỉ tần suất/số lượng).</p>\n<p><b>Mẹo giải nhanh:</b> Cụm từ thông dụng: <i>past performance</i> (thành tích trong quá khứ) dùng làm cơ sở đánh giá tương lai.</p>",
        "type": "Vocabulary",
        "subCategory": "Adjective Usage",
        "grammarTag": "Modifier",
        "clueHint": "Từ nào làm tính từ đứng trước 'performance' mang nghĩa 'thành tích trong quá khứ'?",
        "syntaxBreakdown": {
            "subject": "Ms. Soares",
            "verb": "is",
            "objectOrComplement": "likely to do quite well in the 50-meter race based on her [past] performance",
            "blankRole": "Tính từ bổ nghĩa cho danh từ 'performance'"
        }
    },
    {
        "id": "ets22_t6_p5_123",
        "number": 123,
        "text": "The manual provides a basic _______ of the R25100 camera’s primary features.",
        "options": {
            "A": "overview",
            "B": "adviser",
            "C": "challenge",
            "D": "instance"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Cuốn sổ tay hướng dẫn cung cấp một cái nhìn tổng quan cơ bản về các tính năng chính của máy ảnh R25100.</p>\n<p><b>Phân tích từ vựng:</b> Chủ ngữ là cuốn tài liệu hướng dẫn sử dụng (<i>The manual</i>). Động từ <i>provides a basic _______ of...</i> (cung cấp một ... cơ bản về các tính năng). Danh từ <b>(A) overview</b> (bản tóm tắt, cái nhìn tổng quan) kết hợp hoàn hảo cả về ngữ cảnh tài liệu và cấu trúc <i>an overview of something</i>.<br/>- (B) <i>adviser</i>: người cố vấn.<br/>- (C) <i>challenge</i>: thách thức.<br/>- (D) <i>instance</i>: trường hợp, ví dụ.</p>\n<p><b>Mẹo giải nhanh:</b> Collocation quen thuộc: <i>provide a basic overview of...</i> (cung cấp cái nhìn tổng quan cơ bản về...).</p>",
        "type": "Vocabulary",
        "subCategory": "Noun Collocation",
        "grammarTag": "Collocation",
        "clueHint": "Cuốn sổ tay hướng dẫn cung cấp điều gì tổng quan ('overview') về các tính năng chính?",
        "syntaxBreakdown": {
            "subject": "The manual",
            "verb": "provides",
            "objectOrComplement": "a basic [overview] of the R25100 camera's primary features",
            "blankRole": "Danh từ làm tân ngữ chính cho động từ 'provides'"
        }
    },
    {
        "id": "ets22_t6_p5_124",
        "number": 124,
        "text": "Be sure to _______ the wireless Internet option on your company mobile phone to avoid additional data fees.",
        "options": {
            "A": "return",
            "B": "pull",
            "C": "enable",
            "D": "inflate"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Hãy nhớ kích hoạt tùy chọn mạng Internet không dây (Wi-Fi) trên điện thoại di động của công ty để tránh các khoản phí dữ liệu bổ sung.</p>\n<p><b>Phân tích từ vựng:</b> Tân ngữ là <i>the wireless Internet option</i> (tùy chọn mạng Internet không dây). Trong thuật ngữ công nghệ và thiết bị di động, hành động bật/kích hoạt một chức năng hoặc cài đặt là <b>(C) enable</b> (kích hoạt, bật lên).<br/>- (A) <i>return</i>: trả lại.<br/>- (B) <i>pull</i>: kéo.<br/>- (D) <i>inflate</i>: thổi phồng, bơm căng.</p>\n<p><b>Mẹo giải nhanh:</b> Thuật ngữ công nghệ thiết bị: <i>enable/disable a feature or option</i> (bật/tắt tính năng hoặc tùy chọn).</p>",
        "type": "Vocabulary",
        "subCategory": "Technology Vocabulary",
        "grammarTag": "Collocation",
        "clueHint": "Động từ chuyên dụng trong cài đặt điện thoại/phần mềm có nghĩa là bật/kích hoạt tính năng (ngược với disable)?",
        "syntaxBreakdown": {
            "subject": "(You)",
            "verb": "Be sure to [enable]",
            "objectOrComplement": "the wireless Internet option on your company mobile phone",
            "blankRole": "Động từ nguyên mẫu theo sau 'to' trong câu mệnh lệnh"
        }
    },
    {
        "id": "ets22_t6_p5_125",
        "number": 125,
        "text": "The CEO of True Home Estates _______ hires agents who have overcome obstacles in their lives.",
        "options": {
            "A": "soon",
            "B": "most",
            "C": "enough",
            "D": "always"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Tổng giám đốc của True Home Estates luôn tuyển dụng các đại lý đã vượt qua những trở ngại trong cuộc sống của họ.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng giữa chủ ngữ <i>The CEO</i> và động từ chia thì hiện tại đơn <i>hires</i>. Ta cần một trạng từ chỉ tần suất diễn tả nguyên tắc/thói quen tuyển dụng kiên định. Trạng từ <b>(D) always</b> (luôn luôn) đứng trước động từ thường là vị trí chuẩn xác.<br/>- (A) <i>soon</i>: sớm (chỉ thời gian tương lai, không đi với hiện tại đơn chỉ thói quen).<br/>- (B) <i>most</i>: hầu hết (không làm trạng từ đứng trước động từ đơn lẻ dạng này).<br/>- (C) <i>enough</i>: đủ (đứng sau tính từ/trạng từ).</p>\n<p><b>Mẹo giải nhanh:</b> Trạng từ tần suất (always, usually, often, never) đứng trước động từ thường chia thì hiện tại đơn.</p>",
        "type": "Grammar / Adverb",
        "subCategory": "Adverb of Frequency",
        "grammarTag": "Adverb Position",
        "clueHint": "Trạng từ tần suất nào đứng trước động từ thường 'hires' diễn tả thói quen/nguyên tắc luôn tuyển dụng?",
        "syntaxBreakdown": {
            "subject": "The CEO of True Home Estates",
            "verb": "[always] hires",
            "objectOrComplement": "agents who have overcome obstacles in their lives",
            "blankRole": "Trạng từ chỉ tần suất bổ nghĩa cho động từ 'hires'"
        }
    },
    {
        "id": "ets22_t6_p5_126",
        "number": 126,
        "text": "To receive payment, vendors must submit an invoice online _______ twenty business days of finishing a project.",
        "options": {
            "A": "whether",
            "B": "whose",
            "C": "within",
            "D": "while"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Để nhận thanh toán, các nhà cung cấp phải nộp hóa đơn trực tuyến trong vòng hai mươi ngày làm việc kể từ khi hoàn thành một dự án.</p>\n<p><b>Phân tích ngữ pháp:</b> Phía sau là một khoảng thời gian cụ thể: <i>twenty business days of finishing a project</i>. Giới từ <b>(C) within</b> (+ khoảng thời gian) có nghĩa là 'trong vòng bao lâu'.<br/>- (A) <i>whether</i>: liệu rằng (liên từ).<br/>- (B) <i>whose</i>: đại từ quan hệ sở hữu.<br/>- (D) <i>while</i>: trong khi (liên từ nối mệnh đề S + V).</p>\n<p><b>Mẹo giải nhanh:</b> <i>within + khoảng thời gian</i> (vd: <i>within 20 days, within a week</i>): trong vòng bao lâu phải hoàn thành việc gì.</p>",
        "type": "Preposition",
        "subCategory": "Preposition of Time",
        "grammarTag": "Within + Time Period",
        "clueHint": "Giới từ nào đi với khoảng thời gian 'twenty business days' mang nghĩa 'trong vòng'?",
        "syntaxBreakdown": {
            "subject": "vendors",
            "verb": "must submit",
            "objectOrComplement": "an invoice online [within] twenty business days of finishing a project",
            "blankRole": "Giới từ chỉ thời hạn đứng trước khoảng thời gian"
        }
    },
    {
        "id": "ets22_t6_p5_127",
        "number": 127,
        "text": "_______ opening a bakery, Mr. Laxalt had worked in the food industry for fifteen years.",
        "options": {
            "A": "Prior to",
            "B": "Although",
            "C": "Then",
            "D": "If"
        },
        "correctAnswer": "A",
        "explanation": "<p><b>Dịch nghĩa:</b> Trước khi mở một tiệm bánh, ông Laxalt đã làm việc trong ngành thực phẩm suốt mười lăm năm.</p>\n<p><b>Phân tích ngữ pháp:</b> Phía sau chỗ trống là một danh động từ <i>opening a bakery</i> (V-ing). Cụm giới từ <b>(A) Prior to</b> mang nghĩa 'trước khi' (+ V-ing / Noun), tương đương với <i>Before</i>. Mệnh đề chính dùng thì quá khứ hoàn thành <i>had worked</i> để chỉ việc đã làm trước thời điểm mở tiệm bánh.<br/>- (B) <i>Although</i>: mặc dù (liên từ đi với mệnh đề S + V).<br/>- (C) <i>Then</i>: sau đó (phó từ liên kết, không đứng đầu cụm V-ing làm giới từ).<br/>- (D) <i>If</i>: nếu (liên từ đi với mệnh đề S + V).</p>\n<p><b>Mẹo giải nhanh:</b> <i>Prior to + V-ing / Noun</i> = <i>Before + V-ing / Noun</i> (trước khi làm gì).</p>",
        "type": "Preposition",
        "subCategory": "Preposition of Time",
        "grammarTag": "Prior to + Gerund",
        "clueHint": "Cụm giới từ nào mang nghĩa 'trước khi' đi được với danh động từ (V-ing) 'opening'?",
        "syntaxBreakdown": {
            "subject": "Mr. Laxalt",
            "verb": "had worked",
            "objectOrComplement": "in the food industry for fifteen years [Prior to] opening a bakery",
            "blankRole": "Cụm giới từ chỉ thời gian đứng trước danh động từ"
        }
    },
    {
        "id": "ets22_t6_p5_128",
        "number": 128,
        "text": "Investors’ initial fears were calmed by the _______ sales report issued this week.",
        "options": {
            "A": "remote",
            "B": "attentive",
            "C": "reassuring",
            "D": "restful"
        },
        "correctAnswer": "C",
        "explanation": "<p><b>Dịch nghĩa:</b> Nỗi lo sợ ban đầu của các nhà đầu tư đã được xoa dịu bởi báo cáo doanh số đầy tính trấn an/đáng khích lệ được phát hành trong tuần này.</p>\n<p><b>Phân tích từ vựng:</b> Vế trước diễn tả nỗi sợ của nhà đầu tư được xoa dịu (<i>initial fears were calmed</i>). Tính từ bổ nghĩa cho bản báo cáo bán hàng (<i>sales report</i>) phù hợp nhất với việc làm yên lòng người đọc là <b>(C) reassuring</b> (mang tính trấn an, làm yên lòng, đáng khích lệ).<br/>- (A) <i>remote</i>: xa xôi, hẻo lánh.<br/>- (B) <i>attentive</i>: ân cần, chăm chú.<br/>- (D) <i>restful</i>: yên tĩnh, mang lại cảm giác nghỉ ngơi.</p>\n<p><b>Mẹo giải nhanh:</b> Logic ngữ nghĩa: Báo cáo đem lại tin tức tích cực giúp xoa dịu nỗi sợ (<i>calm fears</i>) chính là một <i>reassuring report</i>.</p>",
        "type": "Vocabulary",
        "subCategory": "Adjective Usage",
        "grammarTag": "Descriptive Adjective",
        "clueHint": "Báo cáo doanh số có tính chất gì giúp xoa dịu (calmed) nỗi lo sợ của các nhà đầu tư?",
        "syntaxBreakdown": {
            "subject": "Investors' initial fears",
            "verb": "were calmed",
            "objectOrComplement": "by the [reassuring] sales report issued this week",
            "blankRole": "Tính từ bổ nghĩa cho cụm danh từ 'sales report'"
        }
    },
    {
        "id": "ets22_t6_p5_129",
        "number": 129,
        "text": "One distinctive aspect of the painter Chapin Kurek’s portrait style is her almost comic _______ of facial features.",
        "options": {
            "A": "exaggerate",
            "B": "exaggerated",
            "C": "exaggeratedly",
            "D": "exaggeration"
        },
        "correctAnswer": "D",
        "explanation": "<p><b>Dịch nghĩa:</b> Một khía cạnh đặc biệt trong phong cách vẽ chân dung của họa sĩ Chapin Kurek là sự cường điệu/phóng đại gần như hài hước về các đường nét trên khuôn mặt.</p>\n<p><b>Phân tích ngữ pháp:</b> Vị trí chỗ trống đứng sau tính từ <i>comic</i> và trước giới từ <i>of</i>. Ta cần một danh từ làm trung tâm của cụm từ chỉ định <i>her almost comic [Noun] of facial features</i>. Danh từ <b>(D) exaggeration</b> (sự phóng đại, cường điệu) là đáp án duy nhất đúng.<br/>- (A) <i>exaggerate</i>: động từ nguyên mẫu.<br/>- (B) <i>exaggerated</i>: tính từ / quá khứ phân từ.<br/>- (C) <i>exaggeratedly</i>: trạng từ.</p>\n<p><b>Mẹo giải nhanh:</b> Cấu trúc [Tính từ sở hữu + Tính từ + Danh từ + of]. Đuôi <i>-tion</i> là dấu hiệu nhận biết danh từ.</p>",
        "type": "Word Form",
        "subCategory": "Noun",
        "grammarTag": "Noun Suffix -tion",
        "clueHint": "Đứng sau tính từ 'comic' và trước giới từ 'of' cần một danh từ (đuôi -tion).",
        "syntaxBreakdown": {
            "subject": "One distinctive aspect of the painter Chapin Kurek's portrait style",
            "verb": "is",
            "objectOrComplement": "her almost comic [exaggeration] of facial features",
            "blankRole": "Danh từ làm bổ ngữ cho câu sau động từ liên kết 'is'"
        }
    },
    {
        "id": "ets22_t6_p5_130",
        "number": 130,
        "text": "Ramirez Instruments _______ high-quality acoustic guitars for over a century.",
        "options": {
            "A": "to be designed",
            "B": "has been designing",
            "C": "was designed",
            "D": "is designing"
        },
        "correctAnswer": "B",
        "explanation": "<p><b>Dịch nghĩa:</b> Hãng nhạc cụ Ramirez đã và đang thiết kế các cây đàn guitar mộc chất lượng cao trong hơn một thế kỷ qua.</p>\n<p><b>Phân tích ngữ pháp:</b> Cụm trạng ngữ thời gian <i>for over a century</i> (trong hơn một thế kỷ qua) chỉ hành động bắt đầu trong quá khứ, kéo dài liên tục đến hiện tại và có thể tiếp diễn trong tương lai. Mặt khác, chủ ngữ <i>Ramirez Instruments</i> chủ động thiết kế sản phẩm (tân ngữ là <i>high-quality acoustic guitars</i>). Thì hiện tại hoàn thành tiếp diễn thể chủ động <b>(B) has been designing</b> là chuẩn xác tuyệt đối.<br/>- (A) <i>to be designed</i>: dạng to-be-P2 không làm động từ chính.<br/>- (C) <i>was designed</i>: dạng bị động quá khứ đơn (sai nghĩa vì có tân ngữ và sai thì với <i>for over a century</i>).<br/>- (D) <i>is designing</i>: thì hiện tại tiếp diễn (không dùng cho khoảng thời gian kéo dài cả thế kỷ với <i>for</i>).</p>\n<p><b>Mẹo giải nhanh:</b> Dấu hiệu <i>for + khoảng thời gian</i> (for over a century) đi với thì hoàn thành (Present Perfect / Present Perfect Continuous).</p>",
        "type": "Verb Form",
        "subCategory": "Verb Tense & Voice",
        "grammarTag": "Present Perfect Continuous",
        "clueHint": "Dấu hiệu 'for over a century' chỉ hành động kéo dài suốt một thế kỷ đến nay. Cần thì hoàn thành chủ động nào?",
        "syntaxBreakdown": {
            "subject": "Ramirez Instruments",
            "verb": "[has been designing]",
            "objectOrComplement": "high-quality acoustic guitars for over a century",
            "blankRole": "Động từ vị ngữ chính chia thì hiện tại hoàn thành tiếp diễn ở thể chủ động"
        }
    }
]

out_dir = "public/data/ets2022/test6"
os.makedirs(out_dir, exist_ok=True)

with open(f"{out_dir}/part5.json", "w", encoding="utf-8") as f:
    json.dump(part5_data, f, ensure_ascii=False, indent=2)

print(f"Generated {out_dir}/part5.json ({len(part5_data)} questions)")
