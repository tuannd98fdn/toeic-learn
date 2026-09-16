# BÁO CÁO ĐÁNH GIÁ TOÀN DIỆN LUỒNG NGƯỜI HỌC (LEARNER FLOW AUDIT)
**Dự Án**: TOEIC Learn (ETS Practice & Adaptive Learning System)  
**Ngày Thực Hiện**: 16/09/2026  
**Phương Châm Cốt Lõi**: Data before assumptions • Evidence before recommendations • Minimal diff over elegant rewrite  
**Chu Trình Mục Tiêu**: **Diagnose → Learn → Practice → Measure → Identify Weakness → Recommend → Practice Again**

---

## 1. BẢN ĐỒ TỔNG THỂ HÀNH TRÌNH NGƯỜI HỌC (CURRENT USER JOURNEY)

```
[1. Khám phá & Nhập môn (FTUX)]
       │
       ▼
   /onboarding ──(Target, Level, Exam Date)──► Lưu LocalStorage
       │
       ▼
[2. Trung tâm Điều phối (Daily Command Center)]
       │
       ▼
   Trang Chủ (/) ──► Thanh Năng Lực (CompactInsightBar) + Hành Trình 3 Bước Hôm Nay
       │
       ├──► Bước 01: Khởi động (~5') ──► /study (Flashcard SRS Leitner)
       │
       ├──► Bước 02: Trọng tâm (~15') ──► /part1-7 (Targeted Sub-skill Practice) hoặc /masterclass
       │
       └──► Bước 03: Củng cố (~5') ──► /notebook/exam-quiz (Spaced Mistake Review)
       │
       ▼
[3. Đánh Giá & Phòng Thi Mô Phỏng]
   /diagnostic (Test Nhanh 20' - 28 câu) ──► Chẩn đoán CEFR & Part yếu
   /mini-test (15' - 20 câu) ──► Phản xạ nhanh P2 vs P5
   /exam (RC 75' / Full 120') ──► Scaled Score, Pacing Grid, Knowledge Gap Breakdown
       │
       ▼
[4. Khắc Phục Lỗ Hổng & Duy Trì Thói Quen]
   /notebook ──► Bóc tách nguyên nhân sai (Root-Cause: Bẫy/Từ vựng/Ngữ pháp/Bất cẩn)
   /tips ──► 30 Bẫy & Chiến thuật ETS 7 Parts
   /stats ──► Biểu đồ Radar Lỗ hổng Ngữ pháp & Lịch sử Tăng điểm
   /study-plan ──► Lộ trình thích ứng 30 ngày (Adaptive Rebalance)
```

---

## 2. ĐÁNH GIÁ CHI TIẾT TỪNG CHẶNG THEO TIÊU CHUẨN SƯ PHẠM ETS

### CHẶNG 1: NHẬP MÔN & THIẾT LẬP BAN ĐẦU (FTUX & ONBOARDING)
* **Hiện trạng**:
  - Người dùng mới truy cập `/` được chuyển hướng sang `/onboarding`.
  - Onboarding 3 bước: Chọn Target Score (`500+`, `600+`, `750+`, `900+`), Trình độ hiện tại (`beginner`, `intermediate`, `advanced`), Ngày thi (`date`).
  - Hoàn tất: Bắn confetti và chuyển hướng về `/`.
* **Điểm mạnh**:
  - Giao diện tối giản, tập trung, thao tác nhanh (< 30 giây).
  - Không bắt buộc đăng ký tài khoản rườm rà (0 friction).
* **Lỗ hổng & Điểm nghẽn nghiêm trọng (Critical Gaps)**:
  1. **Bỏ quên Test Chẩn đoán (`/diagnostic`)**: Sau khi chọn mục tiêu, người học không hề được giới thiệu hay khuyến nghị làm bài Test Chẩn đoán 20 phút (28 câu chuẩn ETS). Ứng dụng tự động sinh lộ trình dựa trên điểm giả định mặc định (450 điểm) mà không đo lường thực tế.
  2. **Ghi đè mục tiêu của người học**: Trong `studyPlanEngine.ts`, hàm `syncAdaptivePlan()` tự tính lại `target = gaps.latestScore < 500 ? 650 : ...`, vô tình ghi đè mục tiêu mà người dùng vừa chọn ở Onboarding (ví dụ chọn 900+ vẫn bị ép về 650).
  3. **Khối "Bạn chưa có lộ trình" bị Dead Code**: Trên `/`, điều kiện hiển thị thẻ mời làm bài test chẩn đoán là `!studyPlan`. Nhưng do `page.tsx` luôn gọi `syncAdaptivePlan()` ngay khi mount nên `studyPlan` luôn tồn tại, khiến khối CTA làm test chẩn đoán không bao giờ hiển thị.

---

### CHẶNG 2: THỰC THI THÓI QUEN HỌC HÀNG NGÀY (DAILY ROUTINE EXECUTION)
* **Hiện trạng**:
  - Dashboard đã được tinh gọn thành Trung tâm điều phối với nút CTA 1-chạm chính và chuỗi 3 bước chuẩn sư phạm:
    - **Bước 01**: Thẻ Flashcards SRS Leitner (`/study`).
    - **Bước 02**: Luyện chuyên sâu theo điểm yếu (`/part5?subCategory=...` hoặc `/part2`, `/masterclass`).
    - **Bước 03**: Sổ tay câu hỏi đến hạn (`/notebook/exam-quiz`).
* **Điểm mạnh**:
  - Cấu trúc 3 bước (Khởi động 5' → Trọng tâm 15' → Củng cố 5') rất chuẩn về tâm lý học tiếp thu, giúp người học không bị quá tải.
  - Có phím tắt nhanh `1`, `2`, `3` trên bàn phím.
* **Lỗ hổng & Điểm nghẽn nghiêm trọng (Critical Gaps)**:
  1. **ĐỨT GÃY GHI NHẬN TIẾN ĐỘ (LỖ HỔNG LỚN NHẤT HỆ THỐNG)**:
     - Khi người học bấm "HỌC NGAY" ở Bước 1 và học xong 10-15 từ vựng trên `/study`, hoặc luyện xong bài tập Bước 2 trên `/part5`, hoặc ôn xong các câu hỏi sai ở Bước 3 trên `/notebook/exam-quiz`: **HỆ THỐNG HOÀN TOÀN KHÔNG TỰ ĐỘNG ĐÁNH DẤU HOÀN THÀNH NHIỆM VỤ ĐÓ TRONG STUDY PLAN**.
     - Người học quay về trang chủ thấy nhiệm vụ vẫn ở trạng thái chưa hoàn thành (`completed: false`). Muốn hoàn thành, họ phải tự tay click vào nút check nhỏ xíu bên cạnh. Đây là trải nghiệm gây ức chế và làm giảm động lực tích lũy streak / XP.
  2. **LỖI HIỆU CHUẨN ĐO ĐIỂM DỰ ĐOÁN (PREDICTIVE SCORE BUG)**:
     - Trong `src/utils/scorePredictor.ts`, hàm kiểm tra kết quả test chẩn đoán tìm trường `diagResult.estimatedScore`, `diagResult.listeningScore`, `diagResult.readingScore`.
     - Tuy nhiên, `src/app/diagnostic/page.tsx` lại lưu dữ liệu dưới các tên: `totalScore`, `scaledLC`, `scaledRC`.
     - **Hệ quả**: Dù người học đã làm xong bài Test Chẩn đoán 20 phút, thanh `CompactInsightBar` trên Dashboard vẫn luôn hiển thị trạng thái "Chưa hiệu chuẩn" và dùng điểm dự đoán bừa!
  3. **THIẾU CẦU NỐI CHUYỂN BƯỚC (EXIT SCREEN DEAD-ENDS)**:
     - Màn hình kết thúc của `/study`, `/part5`, `/notebook/exam-quiz` hiện tại chỉ có các nút rời rạc: "Học lại", "Về trang chủ", "Xem biểu đồ".
     - Không có nút chuyển tiếp thông minh: *"Đã hoàn thành Bước 01! Tiếp tục Bước 02: [Luyện Part 5: Chuyên đề Word Form] →"* để giữ người học trong dòng chảy học tập (Flow State).

---

### CHẶNG 3: BÀI TEST CHẨN ĐOÁN & PHÂN TÍCH LỖ HỔNG (DIAGNOSTIC & GAP ANALYSIS)
* **Hiện trạng**:
  - `/diagnostic` cung cấp 28 câu hỏi trích xuất từ ETS 2022 Test 1 (4 câu mỗi Part từ Part 1 đến Part 7) giới hạn 20 phút.
  - Tính điểm Scaled LC/RC và xếp hạng CEFR.
* **Điểm mạnh**:
  - Giao diện thi tập trung, có audio player cho LC và chia đôi màn hình cho RC.
  - Có phân tích độ chính xác theo từng Part.
* **Lỗ hổng & Điểm nghẽn nghiêm trọng (Critical Gaps)**:
  1. **RƠI RỤNG METADATA SUB-CATEGORY (DATA LOSS)**:
     - Trong `src/app/diagnostic/page.tsx`, khi nạp 4 câu Part 5 và 4 câu Part 7, code đã bỏ qua các trường `subCategory` và `grammarTag`.
     - Khi người học trả lời sai, hàm `addMistake` ghi nhận câu sai vào Sổ tay nhưng trường `subCategory` bị `undefined`.
     - **Hệ quả**: Thuật toán `analyzeLearnerGaps()` quét qua Sổ tay lỗi sai nhưng không tìm thấy nhãn chuyên đề ngữ pháp nào từ bài chẩn đoán, buộc phải rơi về danh sách mặc định cứng `['Word Form', 'Verb Tense', 'Preposition & Conjunction']` thay vì điểm yếu thực sự của người học!
  2. **Luồng điều hướng sau thi chưa mượt**:
     - Sau khi nộp bài, nút CTA trỏ tới `/study-plan?fromDiagnostic=true...`. Khi sang trang Lộ trình, người học chỉ thấy bảng 30 ngày mà không có nút 1-chạm "Bắt đầu Ngày 01 ngay bây giờ".

---

### CHẶNG 4: LUYỆN TẬP 7 PHẦN THI (CORE PRACTICE 7 PARTS)
* **Hiện trạng**:
  - Part 1-4 (LC): 3 chế độ (Làm bài ETS, Chép chính tả Dictation Trainer, Lời thoại tương tác Interactive Transcript).
  - Part 5 (RC): Targeted Sub-skill mode (Word Form, Verb Tense, Prepositions...), Speed Trainer 20s, Grammar Cheatsheet.
  - Part 6 (RC): Targeted Practice theo dạng ô trống, Pacing Indicator 120s/bài đọc.
  - Part 7 (RC): Targeted Question Type (Inference, Detail, Main Idea...), Zoom chữ A-/A+, Soi vị trí bằng chứng tự động, Pacing Analysis.
  - Masterclass: Bẻ khóa âm bản xứ Connected Speech, Acoustic Alignment đối chiếu từng từ.
* **Điểm mạnh**:
  - Công cụ luyện tập cực kỳ chuyên sâu và sát đề thi thật ETS 2022.
  - 100% SVG icons, 0 UI emojis, giao diện sắc nét, Dark mode chuẩn mực.
* **Lỗ hổng & Điểm nghẽn**:
  - Thiếu cơ chế đồng bộ tự động trạng thái hoàn thành bài học vào Lộ trình ngày (Study Plan) khi học viên hoàn tất phiên luyện tập.

---

### CHẶNG 5: PHÒNG THI THỬ MÔ PHỎNG (MOCK EXAM ARENA)
* **Hiện trạng**:
  - 3 chế độ thi: Full Test 120' (200 câu), RC Mock Test 75' (100 câu), RC Sprint 30' (40 câu), Mini-test 15' (20 câu).
  - Màn hình kết quả có `KnowledgeGapBreakdown` bóc tách lỗ hổng ngữ pháp và kỹ năng đọc hiểu Part 7 kèm nút 1-click `Luyện chuyên đề ngay`.
* **Điểm mạnh**:
  - Đo lường chính xác điểm thi scaled ETS (5 - 990).
  - Bóc tách nhịp độ làm bài (Pacing Grid) từng phần để chống cháy giờ Part 7.
* **Lỗ hổng & Điểm nghẽn**:
  - Khi hoàn thành bài thi gán trong Lộ trình học (ví dụ nhiệm vụ ngày thi thử `task_i_exam`), bài thi chưa tự động cập nhật tick hoàn thành cho nhiệm vụ đó trong ngày.

---

### CHẶNG 6: SỔ TAY LỖI SAI & ÔN TẬP LẶP LẠI (REMEDIATION & RETENTION)
* **Hiện trạng**:
  - Sổ tay lỗi sai (`/notebook`) hỗ trợ gán nhãn nguyên nhân sai (5 Root Causes: Từ vựng, Ngữ pháp, Nghe không rõ, Mắc bẫy, Bất cẩn).
  - Chế độ Quiz chuộc lỗi (`/notebook/exam-quiz`) với giải thuật Spaced Repetition, giữ nguyên câu hỏi khi nộp đáp án.
* **Điểm mạnh**:
  - Tự phản tư (self-reflection) thông qua Root-Cause Tagging giúp chuyển hóa lỗi sai thành bài học sâu sắc.
* **Lỗ hổng & Điểm nghẽn**:
  - Khi hoàn tất phiên chuộc lỗi trên `/notebook/exam-quiz`, hệ thống chưa đánh dấu hoàn thành nhiệm vụ Bước 3 của ngày hôm nay, và chưa hiển thị trạng thái vinh danh hoàn thành mục tiêu ngày (+50 XP).

---

## 3. BẢNG XẾP HẠNG CẢI TIẾN THEO CHỈ SỐ I.C.E (IMPACT × CONFIDENCE ÷ EFFORT)

| Mã | Hạng mục Cải tiến Đề xuất | Vấn đề Giải quyết | Impact (1-10) | Confidence (1-10) | Effort (1-10) | Điểm ICE |
|---|---|---|---|---|---|---|
| **P1** | **Hệ thống Tự Động Ghi Nhận Hoàn Thành Nhiệm Vụ (Auto Task Completion Engine)** | Người học làm xong Bước 1, 2, 3 nhưng trên Dashboard vẫn chưa tick hoàn thành, phải tick thủ công. | **10** | **10** | **3** | **33.3** |
| **P2** | **Sửa Lỗi Hiệu Chuẩn Bộ Đo Điểm (`scorePredictor.ts`) & Giữ Nguyên Target Score** | Test chẩn đoán xong nhưng bộ đo điểm vẫn hiện "Chưa hiệu chuẩn" do lệch tên trường dữ liệu; target score bị ghi đè. | **9** | **10** | **2** | **45.0** |
| **P3** | **Cầu Nối Chuyển Bước Tức Thì (Next-Step Routine Bridging)** | Màn hình kết thúc của `/study`, `/part5`, `/notebook/exam-quiz` là ngõ cụt; cần nút 1-chạm đưa thẳng sang bước tiếp theo của ngày. | **9** | **9** | **3** | **27.0** |
| **P4** | **Bảo Toàn Sub-Category Trong Test Chẩn Đoán (`/diagnostic`)** | Part 5 & 7 trong test chẩn đoán bị rơi rụng `subCategory`, khiến thuật toán tìm điểm yếu không phát hiện được lỗ hổng thực tế. | **9** | **10** | **2** | **45.0** |
| **P5** | **Nâng Cấp Luồng Nhập Môn FTUX (Onboarding → Diagnostic Recommendation)** | Onboarding bỏ qua Test chẩn đoán; cần thêm lựa chọn làm Test 20' ngay hoặc vào Dashboard. | **8** | **9** | **3** | **24.0** |

---

## 4. KẾ HOẠCH HÀNH ĐỘNG CẢI TIẾN CHI TIẾT

1. **Khắc phục P2 & P4 (Dữ liệu & Đo lường chính xác)**:
   - Sửa `src/utils/scorePredictor.ts`: đọc chính xác `diagResult.totalScore`, `diagResult.scaledLC`, `diagResult.scaledRC`.
   - Sửa `src/app/diagnostic/page.tsx`: bảo toàn `subCategory`, `grammarTag`, `questionType` cho toàn bộ câu hỏi Part 5 & Part 7 khi tạo đề và khi gọi `addMistake`.
   - Tôn trọng `targetScore` do người dùng thiết lập trong Onboarding tại `studyPlanEngine.ts`.

2. **Khắc phục P1 (Auto-Completion Engine)**:
   - Bổ sung hàm tiện ích `completeActiveTaskByType(type, subCategory?)` trong `src/utils/studyPlanEngine.ts`.
   - Tích hợp kích hoạt tự động khi:
     - Hoàn thành phiên Flashcards 10 từ trên `/study` → tự động hoàn thành task `vocab`.
     - Hoàn thành bài luyện tập trên `/part5`, `/part7`, v.v. → tự động hoàn thành task `practice`.
     - Hoàn thành phiên chuộc lỗi trên `/notebook/exam-quiz` → tự động hoàn thành task `review`.
     - Nộp bài thi trên `/exam` → tự động hoàn thành task `exam` nếu có trong ngày.

3. **Khắc phục P3 (Next-Step Routine Bridging)**:
   - Xây dựng component hoặc khối CTA tiêu chuẩn `NextRoutineStepBanner`:
     - Trên `/study` sau khi học xong: Hiển thị thẻ *"Đã hoàn thành Bước 01 (+15 XP)! Tiếp tục Bước 02: [Tên bài tập trọng tâm] →"* với nút CTA 1-click.
     - Trên `/part5` sau khi luyện xong: Hiển thị thẻ *"Đã hoàn thành Bước 02 (+20 XP)! Tiếp tục Bước 03: [Ôn tập Sổ tay lỗi sai] →"*.
     - Trên `/notebook/exam-quiz` sau khi chuộc lỗi xong: Hiển thị thẻ *"Đã hoàn tất 100% Hành trình hôm nay! Nhận thưởng +50 XP & Về Dashboard →"*.

4. **Khắc phục P5 (Onboarding → Diagnostic Gateway)**:
   - Nâng cấp bước 3 của `/onboarding`: Sau khi chọn ngày thi, cung cấp 2 lựa chọn rõ ràng:
     - Lựa chọn 1 (Khuyến nghị): *"Làm bài Test Nhanh Chẩn Đoán (20 phút / 28 câu chuẩn ETS)"* để AI thiết kế lộ trình chuẩn xác nhất.
     - Lựa chọn 2: *"Vào học ngay với lộ trình đề xuất"* chuyển thẳng đến Dashboard.

---

## 5. TIÊU CHÍ KIỂM ĐỊNH & BẢO TOÀN KIẾN TRÚC (INVARIANTS)

- **Strict No Emojis**: Tuyệt đối 0 inline emoji trong bất kỳ file code, CSS, hoặc chuỗi hiển thị nào.
- **Type Safety**: `npx tsc --noEmit` đạt 0 lỗi biên dịch.
- **Zero Bundle Impact**: 0 KB thư viện ngoài thêm vào.
- **Non-destructive Data**: Không làm mất dữ liệu học tập cũ hay các ngày học đã hoàn thành của người dùng.
- **Playwright Verification**: Viết script test E2E kiểm chứng toàn bộ luồng người học từ Onboarding → Diagnostic → Hiệu chuẩn điểm → Bước 1 → Bước 2 → Bước 3 → Tự động hoàn thành & Vinh danh mục tiêu.
