# Tài Liệu Quản Lý Tính Năng (Features & Non-Functional Requirements)

Tài liệu này tổng hợp toàn bộ các tính năng (Functional) và phi tính năng (Non-Functional) của ứng dụng TOEIC Learn. Mục đích của tài liệu là giúp con người (Human) và Trí tuệ nhân tạo (AI) dễ dàng nắm bắt bức tranh toàn cảnh, quản lý, bảo trì và định hướng phát triển ứng dụng.

---

## 1. Tính Năng (Functional Features)

### 1.1. Luyện tập theo từng phần (TOEIC Parts Practice)
- **Hỗ trợ đầy đủ 7 phần (Part 1 - Part 7):** Các bài tập thực hành sát với định dạng đề thi TOEIC.
- **Trình phát Audio (Listening Audio Player):** Tích hợp công cụ nghe chuyên dụng cho các Part 1, 2, 3, 4, hỗ trợ điều chỉnh và nghe lại.

### 1.2. Thi thử & Đánh giá năng lực (Testing & Assessment)
- **Bài thi đầu vào (Diagnostic Test):** Đánh giá trình độ ban đầu của học viên để đưa ra lộ trình phù hợp.
- **Thi thử rút gọn (Mini-test):** Bài kiểm tra ngắn gọn giúp ôn tập nhanh.
- **Thi thử đầy đủ (Full Exam):** Trải nghiệm bài thi TOEIC hoàn chỉnh.
- **Bài trắc nghiệm ngắn (Quiz/QuizCard):** Đánh giá nhanh kiến thức ngữ pháp/từ vựng.

### 1.3. Học & Quản lý Từ vựng (Vocabulary Learning)
- **Thẻ ghi nhớ (Flashcards):** Học từ mới với hình ảnh, phiên âm, ví dụ.
- **Thuật toán lặp lại ngắt quãng (Spaced Repetition System):** Tích hợp `LeitnerBox` giúp tối ưu hóa thời gian ôn tập từ vựng, giúp nhớ lâu hơn.
- **Sổ tay cá nhân (Notebook):** Cho phép người dùng lưu lại từ khó và ghi chú cá nhân.

### 1.4. Lộ trình học tập (Study Plan & Roadmap)
- **Hệ thống Onboarding:** Quy trình thu thập thông tin mục tiêu khi người dùng mới tham gia.
- **Lộ trình cá nhân hóa (Study Plan):** Gợi ý bài học (Study module) dựa trên mục tiêu và năng lực hiện tại của người dùng.

### 1.5. Gia sư Trí Tuệ Nhân Tạo (AI Tutor Assistant)
- **Chatbot Gia sư (AI Tutor Drawer):** Trợ lý ảo tích hợp Google Gemini AI giải đáp thắc mắc về ngữ pháp, từ vựng và phương pháp học ngay trong quá trình làm bài.
- **Tạo từ vựng tự động:** Hệ thống tự động sinh ra ngữ cảnh/từ vựng mở rộng (generate-vocab API).

### 1.6. Gamification (Game hóa học tập)
- **Nhiệm vụ hàng ngày (Daily Mission):** Khuyến khích người học hoàn thành mục tiêu ngắn hạn mỗi ngày.
- **Chuỗi ngày học liên tục (Streak Counter):** Theo dõi số ngày duy trì việc học liên tục để tạo động lực.
- **Hiệu ứng khen thưởng (Confetti & Progress Ring):** Giao diện sinh động ăn mừng khi hoàn thành bài học, biểu diễn tiến độ trực quan.

### 1.7. Thống kê & Theo dõi tiến độ (Statistics)
- **Bảng điều khiển (Stats Dashboard):** Trực quan hóa dữ liệu học tập (thời gian học, điểm thi thử, tiến bộ qua từng tuần).

### 1.8. Hệ thống Người dùng (User Management)
- **Đăng nhập / Đăng ký:** Quản lý phiên đăng nhập an toàn thông qua NextAuth.
- **Chia sẻ thành tích (Share Button):** Khuyến khích người dùng lan tỏa kết quả lên mạng xã hội.

---

## 2. Phi Tính Năng (Non-Functional Features / NFRs)

### 2.1. Hiệu suất & Tối ưu hóa (Performance & SEO)
- **Server-Side Rendering (SSR) & Static Site Generation (SSG):** Tận dụng Next.js App Router để tăng tốc độ tải trang ban đầu và tối ưu cho công cụ tìm kiếm (SEO).
- **Tối ưu Assets:** Tự động tối ưu hóa phông chữ và hình ảnh.

### 2.2. Trải nghiệm Đa nền tảng (PWA - Progressive Web App)
- Hỗ trợ cài đặt web app trực tiếp lên màn hình chính của điện thoại hoặc máy tính (`next-pwa`), cho trải nghiệm mượt mà gần giống Native App.

### 2.3. Giao diện & Trải nghiệm (UI/UX & Responsive Design)
- **Thiết kế đáp ứng (Responsive):** Tương thích hoàn hảo trên Mobile, Tablet, và Desktop.
- **Giao diện hiện đại, tập trung (Premium UI):** Sử dụng Vanilla CSS Modules, CSS Variables, tránh rườm rà. Thiết kế hướng tới sự tập trung cho người học ngoại ngữ (không lạm dụng emoji, màu sắc hài hòa).

### 2.4. Công nghệ lõi & Trí tuệ nhân tạo (Tech Stack & AI-Powered)
- **Vercel AI SDK (`@ai-sdk/google`):** Quản lý luồng stream AI mượt mà, phản hồi real-time.
- **Biểu đồ (Recharts):** Hiển thị thống kê tiến độ học tập một cách trực quan, nhẹ nhàng.
- **Markdown Rendering:** Hỗ trợ render nội dung bài học, giải thích chi tiết phong phú (`react-markdown`, `remark-gfm`).

### 2.5. Bảo mật & Xác thực dữ liệu (Security & Validation)
- **Authentication:** Bảo vệ API và các trang nội bộ bằng hệ thống Middleware và NextAuth.
- **Type Safety & Data Validation:** Mã nguồn viết 100% bằng TypeScript kết hợp thư viện `zod` để kiểm tra chặt chẽ cấu trúc dữ liệu đầu vào (Ví dụ: kiểm tra định dạng đề thi, payload của API).

### 2.6. Khả năng bảo trì & Mở rộng (Maintainability & Scalability)
- **Kiến trúc rõ ràng:** Phân tách thư mục chuẩn mực (app, components, data, hooks, utils, schema).
- **Domain Driven Design (DDD) Concept:** Cấu trúc có định hướng rõ ràng về các miền học tập (luyện đề, từ vựng, tiến độ).
- **Đảm bảo chất lượng (Quality Assurance):** Tích hợp ESLint khắt khe, hỗ trợ kiểm thử tự động (E2E với Playwright) giúp ngăn chặn lỗi phát sinh.
