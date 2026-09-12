# Báo Cáo Khắc Phục Vấn Đề 3: Phân Tích Lỗi Sai Bóc Tách Theo Sub-Skill & Chủ Điểm Ngữ Pháp (Part 5 & 6)

## 1. Vấn Đề & Mục Tiêu

* **Vấn đề ban đầu**: Báo cáo tiến độ và Sổ tay lỗi sai chỉ dừng ở cấp độ Part chung chung (*"Bạn yếu Part 5"*), chưa bóc tách người học sai vì ngữ pháp gì (Mệnh đề quan hệ, Chia thì, Đại từ, Liên từ / Giới từ, Từ loại hay Từ vựng). Ngân hàng câu hỏi chưa có trường phân loại `subCategory` / `grammarTag`, khiến hệ thống thống kê và Gia sư AI chỉ có thể đưa lời khuyên chung chung.
* **Mục tiêu đạt được**:
  1. Chuẩn hóa bộ taxonomy 8 nhóm chủ điểm ngữ pháp cốt lõi TOEIC Part 5 & 6.
  2. Gắn tag cho 100% câu hỏi Part 5 & 6 trong cả 2 bộ đề `ETS 2022 - Test 1` và `ETS 2022 - Test 2` (92 câu).
  3. Cập nhật Mistake Tracker & AI Tutor để nhận diện subCategory và bóc tách bẫy ETS theo từng chủ điểm.
  4. Trực quan hóa lỗ hổng kiến thức qua biểu đồ Radar Chart (sử dụng thư viện `recharts` có sẵn, không tăng dung lượng gói ngoài) và phân tích Top 3 điểm yếu kèm chiến thuật 15s tại `/stats`.
  5. Bổ sung bộ lọc Sub-skill trong Sổ tay lỗi sai (`/notebook`) để người học ôn luyện tập trung theo chuyên đề.
  6. Tuân thủ triệt để rule **NO UI EMOJIS (STRICT)**.

---

## 2. Hệ Thống Chủ Điểm Ngữ Pháp Chuẩn Hóa (Grammar Taxonomy)

| Mã Sub-Skill | Tên Tiếng Việt | Mô Tả & Trọng Tâm Bẫy ETS |
| :--- | :--- | :--- |
| `Word Form` | Từ loại | Nhận diện Noun, Adj, Adv, Verb; đuôi từ (-tion, -ment, -ful, -ive, -ly); cụm danh từ |
| `Verb Tense` | Thì & Thể động từ | Quá khứ đơn, hiện tại hoàn thành, câu bị động, dạng To-V / V-ing |
| `Preposition & Conjunction` | Giới từ & Liên từ | Although vs Despite, Because vs Due to, giới từ nơi chốn/thời gian, liên từ tương quan |
| `Pronoun` | Đại từ & Sở hữu | Tính từ sở hữu trước N, đại từ tân ngữ/phản thân sau V & giới từ, đại từ bất định |
| `Relative Clause` | Mệnh đề quan hệ | Phân biệt who, which, that, whose, rút gọn mệnh đề quan hệ chủ động/bị động |
| `Business Vocabulary` | Từ vựng thương mại | Collocations công sở (*reach an agreement, comply with, deliver a speech*) |
| `Sentence Structure` | Cấu trúc câu | Đảo ngữ phủ định (*seldom, rarely*), thức giả định, cấu trúc so sánh hơn/nhất |
| `Contextual Completion` | Điền câu ngữ cảnh | Dạng câu đặc thù Part 6 (chọn câu văn logic kết nối mạch đoạn văn) |

---

## 3. Các Thay Đổi Kỹ Thuật Đã Triển Khai

### A. Core Schemas, Types & Data Tagging
* [src/schema/toeic.ts](file:///Users/bravee06/toeic-learn/src/schema/toeic.ts):
  - Bổ sung `subCategory: z.string().optional()` và `grammarTag: z.string().optional()` vào `Part5QuestionSchema` và `Part6QuestionSchema`.
* [src/hooks/useMistakeNotebook.ts](file:///Users/bravee06/toeic-learn/src/hooks/useMistakeNotebook.ts):
  - Bổ sung `subCategory?: string` và `grammarTag?: string` vào `MistakeRecord`.
* [src/utils/questionFetcher.ts](file:///Users/bravee06/toeic-learn/src/utils/questionFetcher.ts):
  - Cập nhật `LoadedQuestion` và `fetchMistakeQuestions` để tự động map `subCategory` và `grammarTag` từ câu hỏi cho các bản ghi lỗi cũ trong localStorage.
* **Gắn Tag toàn bộ câu hỏi Part 5 & 6**:
  - `public/data/ets2022/test1/part5.json` (30 câu) & `public/data/ets2022/test1/part6.json` (16 câu).
  - `scripts/test2_data/part5.ts` (30 câu) & `scripts/test2_data/part6.ts` (16 câu).
  - Tái tạo và kiểm định thành công qua `scripts/build_test2_dataset.ts` và `scripts/validate_tests.ts` (100% 400 câu hỏi hợp lệ).

### B. Tích Hợp Practice Modes & AI Tutor
* [src/app/part5/page.tsx](file:///Users/bravee06/toeic-learn/src/app/part5/page.tsx) & [src/app/part6/page.tsx](file:///Users/bravee06/toeic-learn/src/app/part6/page.tsx):
  - Tự động truyền `subCategory` và `grammarTag` vào `addMistake` khi học viên làm sai hoặc hết giờ.
  - Hiển thị pill badge chủ điểm ngữ pháp (ví dụ: `PRONOUN`, `Possessive Adjective`, `Word Form`) ngay trên giao diện câu hỏi.
  - Truyền `subCategory` vào `openAITutor` / `tutorContext`.
* [src/app/exam/page.tsx](file:///Users/bravee06/toeic-learn/src/app/exam/page.tsx) & [src/app/mini-test/page.tsx](file:///Users/bravee06/toeic-learn/src/app/mini-test/page.tsx):
  - Ghi nhận `subCategory` và `grammarTag` vào Sổ tay lỗi sai khi chấm điểm bài thi thử.
* [src/components/AITutorDrawer.tsx](file:///Users/bravee06/toeic-learn/src/components/AITutorDrawer.tsx) & [src/app/api/tutor/chat/route.ts](file:///Users/bravee06/toeic-learn/src/app/api/tutor/chat/route.ts):
  - Header của Gia Sư AI hiển thị badge chủ điểm ngữ pháp đang học.
  - API Route đưa `subCategory` và `grammarTag` vào ngữ cảnh prompt để Gia Sư 990 tập trung phân tích chính xác bẫy ETS của chủ điểm đó.

### C. Biểu Đồ Radar & Bộ Lọc Lỗi Sai
* [NEW] [src/components/GrammarRadarChart.tsx](file:///Users/bravee06/toeic-learn/src/components/GrammarRadarChart.tsx) & [src/components/GrammarRadarChart.module.css](file:///Users/bravee06/toeic-learn/src/components/GrammarRadarChart.module.css):
  - Tận dụng `RadarChart`, `PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`, `Radar`, `ResponsiveContainer`, `Tooltip` từ `recharts`.
  - Phân tích phân bổ lỗi theo 8 chủ điểm ngữ pháp.
  - Tự động xuất ra danh sách Top 3 điểm yếu lớn nhất kèm "Chiến thuật 15s" thực chiến và nút CTA liên kết trực tiếp tới câu sai trong Sổ tay.
  - Thiết kế thích ứng mượt mà cả Light Mode và Dark Mode.
* [src/app/stats/page.tsx](file:///Users/bravee06/toeic-learn/src/app/stats/page.tsx):
  - Tích hợp khu vực *"Bản Đồ Năng Lực & Lỗ Hổng Ngữ Pháp (Part 5 & 6)"* ngay trên trang Thống kê.
* [src/app/notebook/ExamMistakeList.tsx](file:///Users/bravee06/toeic-learn/src/app/notebook/ExamMistakeList.tsx) & [src/app/notebook/page.tsx](file:///Users/bravee06/toeic-learn/src/app/notebook/page.tsx):
  - Bổ sung bộ lọc Dropdown: *"Chủ điểm ngữ pháp (Sub-skill)"* bên cạnh bộ lọc Part.
  - Hỗ trợ mở tab Đề thi và lọc tự động khi người học click *"Xem câu sai"* từ trang Thống kê qua URL param `?subCategory=...`.
  - Hiển thị badge chủ điểm trên từng thẻ câu hỏi sai.
  - Tuân thủ nghiêm ngặt React Rules of Hooks (di chuyển toàn bộ `useMemo` lên trước các lệnh return có điều kiện).

### D. Dọn Dẹp Tuyệt Đối Vi Phạm Emojis (NO UI EMOJIS Strict Rule)
* Đã rà soát và loại bỏ sạch sẽ các ký tự emoji còn sót lại:
  - `src/app/part5/page.tsx`: Xóa `💡` trong nút xem giải thích chi tiết.
  - `src/app/quiz/page.tsx`: Xóa `💡` trong label mẹo nhớ.
  - `src/app/diagnostic/page.tsx`: Xóa `💡` trong khối giải thích.
  - `src/app/api/tutor/chat/route.ts`: Xóa `⏳` trong thông báo lỗi 429.
  - `src/components/AITutorDrawer.tsx`: Thay thế `✕` (U+2715) bằng SVG `<CloseIcon />` sạch từ `AppIcons.tsx`.

---

## 4. Kết Quả Kiểm Định & Tự Đánh Giá (Self-Review)

1. **Kiểm tra Schema Zod**:
   - Chạy `npx tsx scripts/validate_tests.ts` -> **100% đạt chuẩn (400/400 câu hỏi)**.
2. **Kiểm tra Type Safety**:
   - Chạy `npx tsc --noEmit` -> **0 lỗi TypeScript**.
3. **Kiểm tra Giao Diện & Trực Quan (Playwright)**:
   - File test: `scratch/test_grammar_subskills.mjs`.
   - Kết quả: Biểu đồ Radar hiển thị chính xác các trục chủ điểm và số câu sai; Top 3 điểm yếu nhận diện chuẩn `Word Form` (5 câu sai), `Verb Tense` (4 câu sai), `Pronoun` (3 câu sai).
   - Nút *"Xem câu sai"* điều hướng thành công sang `/notebook?subCategory=Word%20Form`, lọc và hiển thị chính xác các câu hỏi liên quan.
   - Giao diện Part 5 và AI Tutor Drawer hiển thị đầy đủ badge chủ điểm.
   - Quét ký tự Emoji toàn trang: **100% CLEAN - 0 emoji xuất hiện trên UI**.
   - Thẩm định hiển thị Dark Mode & Light Mode: Tương phản rõ nét, không bị chìm text hay vỡ layout.
