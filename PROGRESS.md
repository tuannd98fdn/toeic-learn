# TOEIC Learn: Project Progress & Cross-Session Memory Ledger

Tài liệu này đóng vai trò là **Bộ Nhớ Chuyển Giao (Session Memory Ledger)** cho các AI Agent và lập trình viên giữa các session làm việc độc lập. Mọi session mới khi bắt đầu **BẮT BUỘC ĐỌC FILE NÀY** để nắm bắt toàn bộ ngữ cảnh, kiến trúc và tiến độ hiện tại mà không cần hỏi lại người dùng.

---

## 🏛️ Quy Tắc Kiến Trúc & Bất Biến (Architectural Invariants)

1. **NO UI EMOJIS (STRICT)**:
   - Tuyệt đối không đưa các emoji (🎯, 🤖, 🚀, 💡, 🎧, 📝, ➔, 🧹, 👁️, 💪, 🎉, ⏳, v.v.) vào các thành phần giao diện, nút bấm, huy hiệu (badges), tiêu đề, hoặc văn bản hiển thị cho người dùng.
   - Luôn sử dụng icon SVG sạch, chuyên nghiệp từ `@/components/icons/AppIcons`.
2. **Type Safety**:
   - Mọi thay đổi phải đảm bảo `npx tsc --noEmit` đạt 0 lỗi biên dịch.
3. **Non-Destructive Data Preservation**:
   - Khi cập nhật lộ trình học (Study Plan), không bao giờ xóa hoặc thay đổi các ngày học (`day.completed === true`) và nhiệm vụ (`task.completed === true`) mà người học đã hoàn thành. Chỉ tái cấu trúc các ngày/nhiệm vụ trong tương lai.
4. **Chu trình sản phẩm lý tưởng (Ideal Product Loop)**:
   - **Diagnose → Learn → Practice → Measure → Identify Weakness → Recommend → Practice Again**.
   - Mọi tính năng mới phải bám sát chu trình này để giúp người học tăng điểm thực chất.

---

## 📌 Lịch Sử Các Vấn Đề Đã Giải Quyết (Milestones 1 - 6)

### ✅ Vấn đề 1: Khởi tạo & Cấu trúc Dự án Cơ bản
* Thiết lập Next.js App Router, Tailwind/CSS modules, SQLite Prisma ORM, và hệ thống Auth cơ bản.

### ✅ Vấn đề 2: Dữ liệu Đề thi ETS Thực Tế & Giao diện Chuẩn ETS
* **Mô tả**: Dữ liệu đề thi ETS thực tế ban đầu còn mỏng và thiếu tính xác thực.
* **Giải pháp**:
  * Tích hợp đầy đủ bộ đề ETS chuẩn format (`ETS 2022 Test 1` và `ETS 2022 Test 2`) gồm 200 câu hỏi mỗi đề, phân chia chuẩn từ Part 1 đến Part 7.
  * Tích hợp trình phát âm thanh `ListeningAudioPlayer` cho LC (Part 1-4) và giao diện chia đôi (Split View) cho RC (Part 6-7).
  * Xây dựng chế độ Review toàn diện (lọc xem riêng các câu sai, đáp án đúng và lời giải chi tiết).

### ✅ Vấn đề 3: Phân tích Lỗi sai Bóc tách theo Sub-skill / Chủ điểm Ngữ pháp
* **Mô tả**: Báo cáo trước đây chỉ dừng ở mức Part (ví dụ: "Bạn yếu Part 5"), chưa chỉ ra người học sai vì ngữ pháp gì.
* **Giải pháp**:
  * Gắn tag phân loại `subCategory` và `grammarTag` chi tiết cho toàn bộ ngân hàng Part 5 & Part 6:
    * *Từ loại (Word Form)*
    * *Thì & Thể động từ (Verb Tense)*
    * *Giới từ & Liên từ (Preposition & Conjunction)*
    * *Mệnh đề quan hệ (Relative Clauses)*
    * *Đại từ (Pronoun)*
    * *Từ vựng công sở (Business Vocabulary)*
    * *Cấu trúc câu (Sentence Structure)*
  * Xây dựng component `GrammarRadarChart.tsx` trên trang Thống kê (`/stats`) hiển thị trực quan biểu đồ radar lỗ hổng kiến thức.

### ✅ Vấn đề 4: Dung lượng Kho Từ vựng Cốt lõi & Spaced Repetition
* **Mô tả**: Kho từ vựng ban đầu chỉ có 34 từ mẫu, chưa đủ độ phủ cho các band điểm mục tiêu.
* **Giải pháp**:
  * Mở rộng ngân hàng từ vựng lên **hơn 400 từ vựng TOEIC tần suất cao**, phân chia theo 3 band điểm rõ ràng:
    * **Target 450+**: 100+ từ vựng nền tảng công sở hàng ngày.
    * **Target 650+**: 150+ từ vựng giao tiếp thương mại & hợp đồng.
    * **Target 800+**: 150+ từ vựng nâng cao chuyên sâu về tài chính, luật và quản trị.
  * Kết nối đầy đủ vào thuật toán học lặp lại ngắt quãng (Leitner Spaced Repetition Box 1-5).

### ✅ Vấn đề 5: Chế độ Luyện tập Chuyên sâu theo Chủ điểm Ngữ pháp (Targeted Sub-skill Mode)
* **Mô tả**: Người học thấy điểm yếu trên biểu đồ Radar nhưng không có công cụ luyện tập tập trung vào đúng chủ điểm đó.
* **Giải pháp**:
  * Xây dựng chế độ luyện tập Part 5 hỗ trợ query parameter `?subCategory=...`.
  * **Cross-test Pooling**: Hệ thống tự động gom câu hỏi của chủ điểm đó từ tất cả các đề ETS có sẵn (ví dụ: gom 17 câu *Từ loại* hoặc 19 câu *Từ vựng công sở* liên đề).
  * Tích hợp thanh chọn chủ điểm (Sub-skill Pill Selector) và kết nối 1-click trực tiếp từ Biểu đồ Radar (`/stats`) và Sổ tay câu hỏi sai (`/notebook`).

### ✅ Vấn đề 6: Lộ trình Học (Study Plan) Tự động Đồng bộ Thích ứng từ Kết quả Chẩn đoán & Lỗi sai
* **Mô tả**: Lộ trình học và widget "Mục tiêu Vàng hôm nay" trên Dashboard hoạt động biệt lập theo cấu hình ban đầu, không tự thích ứng khi người học làm bài test chẩn đoán, thi thử full test hoặc làm sai câu hỏi.
* **Giải pháp**:
  * Xây dựng `analyzeLearnerGaps()` và `rebalanceStudyPlan(plan, gaps)` trong `src/utils/studyPlanEngine.ts`.
  * Tự động nhận diện điểm số mới nhất, Part yếu nhất, và top lỗi ngữ pháp sai nhiều nhất trong Sổ tay lỗi sai.
  * Tái cân bằng các ngày học trong tương lai: tự động gán bài luyện chuyên sâu Part 5 theo đúng chủ điểm yếu (e.g. `Luyện Part 5: Chuyên đề Word Form [WORD FORM]` kèm link `/part5?subCategory=Word%20Form`) và tự động nhắc nhở số lượng câu hỏi đến hạn ôn tập trong Sổ tay (`filter=due`).
  * Bổ sung **Adaptive Sync Banner** trên `/study-plan` với nút 1-Click `"Đồng bộ theo lỗi sai mới"`.
  * Tự động kích hoạt đồng bộ ngầm khi người học nộp bài Test Chẩn đoán (`/diagnostic`) hoặc nộp bài Thi thử ETS 200 câu (`/exam`).
  * Dashboard hiển thị trực tiếp nhãn chuyên đề và nút "HỌC NGAY" chuyển thẳng vào bài tập chuyên sâu.

---

## 🎯 Vấn Đề Tiếp Theo (Current Milestone / Next Issue)

### 🚀 Vấn Đề 7: [Đang chờ người dùng cung cấp mô tả chi tiết]
* Khi người dùng gửi yêu cầu về Vấn đề 7, Agent sẽ:
  1. Ghi nhận Problem, Evidence, Recommendation, Effort.
  2. Phân tích các file liên quan và lập implementation plan tối giản, không phá vỡ các chức năng cũ.
  3. Lấy xác nhận từ người dùng trước khi triển khai.
  4. Kiểm thử với TypeScript (`npx tsc --noEmit`) và Playwright test script.
  5. Cập nhật lại kết quả vào file `PROGRESS.md` này sau khi hoàn tất.

---

## 🛠️ Lệnh Kiểm Thử & Chạy Môi Trường

* **Chạy Dev Server**: `npm run dev` (đang chạy ngầm tại `http://localhost:3000`).
* **Kiểm tra TypeScript**: `npx tsc --noEmit`.
* **Kiểm thử E2E Playwright mẫu**:
  * `node scratch/test_adaptive_study_plan_e2e.mjs` (Kiểm thử Lộ trình học thích ứng & Dashboard).
  * `node scratch/test_subskill_practice.mjs` (Kiểm thử Luyện tập chuyên đề Part 5 liên đề).
  * `node scratch/test_vocab_e2e.mjs` (Kiểm thử 400+ từ vựng & Spaced Repetition).
