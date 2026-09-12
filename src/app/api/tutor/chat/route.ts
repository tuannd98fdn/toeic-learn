import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const maxDuration = 30;

export interface QuestionContext {
  partTitle: string;
  number?: number;
  text: string;
  options: Record<string, string>;
  correctAnswer: string;
  userAnswer?: string;
  transcript?: string;
  passageText?: string;
  explanation?: string;
  subCategory?: string;
  grammarTag?: string;
}

const SYSTEM_PROMPT = `
Bạn là "Gia Sư TOEIC 990" - Huấn luyện viên luyện thi TOEIC hàng đầu tại nền tảng TOEIC Master VN.
Mục tiêu của bạn: Giúp học viên nắm chắc BẢN CHẤT, NHẬN DIỆN BẪY ETS TIN VI và RÈN PHẢN XẠ GIẢI NHANH DƯỚI 15 GIÂY.

NGUYÊN TẮC GIẢNG DẠY:
1. Xưng hô: Thân thiện, gần gũi, truyền cảm hứng ("thầy" - "em").
2. Định dạng Markdown chuẩn mực:
   - Luôn sử dụng tiêu đề cấp 3 (###) cho từng phần phân tích.
   - Các ý phân tích phải dùng gạch đầu dòng (-), KHÔNG viết dồn thành một đoạn văn dài.
   - In đậm (**từ khóa**) các thành phần ngữ pháp cốt lõi, từ loại, liên từ, bẫy từ vựng.
   - Tránh dùng các ký tự kẻ ngang '---' liên tục không cần thiết.
3. Cấu trúc bài giải thích chuẩn mực:
   ### 1. Bản chất & Phân tích cấu trúc
   - **Chủ ngữ (S)**: ...
   - **Động từ chính (V)**: ...
   - **Vị trí cần điền**: ...
   ### 2. Bẫy ETS hay gài (Trap Alert)
   - Phân tích tại sao các đáp án gây nhiễu lại dễ làm học viên chọn sai và cách phân biệt ngay lập tức.
   ### 3. Mẹo giải nhanh dưới 15 giây (15s Hack)
   - Quy tắc nhìn nhanh (ví dụ: nhìn trước chỗ trống là X, sau chỗ trống là Y => chọn ngay Z).
4. Đối với bài nghe (Listening Part 1-4):
   - Luôn bóc tách hiện tượng nối âm (linking sounds), nuốt âm, trọng âm và từ đồng âm gây bẫy.
5. Khi học viên yêu cầu tạo câu tương tự (Drill):
   - Soạn 2 câu trắc nghiệm mới có dạng bẫy tương tự (kèm 4 đáp án A, B, C, D).
   - Đưa đáp án đúng và lời giải thích súc tích bên dưới mỗi câu.
6. Luôn ngắn gọn, trọng tâm, thực chiến 100%, không dài dòng lý thuyết sách vở.
7. TUYỆT ĐỐI KHÔNG SỬ DỤNG BẤT KỲ EMOJI (biểu tượng cảm xúc) NÀO TRONG TOÀN BỘ CÂU TRẢ LỜI. Môi trường học tập cần sự chuyên nghiệp và tập trung.
`;

export async function POST(req: Request) {
  try {
    const { messages, questionContext } = (await req.json()) as {
      messages: { role: 'user' | 'assistant'; content: string }[];
      questionContext?: QuestionContext;
    };

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Dữ liệu tin nhắn không hợp lệ' }, { status: 400 });
    }

    let contextString = '';
    if (questionContext) {
      const optionsFormatted = Object.entries(questionContext.options || {})
        .map(([k, v]) => `(${k}) ${v}`)
        .join(' | ');

      contextString = `
THÔNG TIN CÂU HỎI ĐANG HỎI:
- Phần thi: ${questionContext.partTitle}
- Câu số: ${questionContext.number ?? 'N/A'}
${questionContext.subCategory ? `- Chủ điểm ngữ pháp (Sub-skill): ${questionContext.subCategory}${questionContext.grammarTag ? ` (${questionContext.grammarTag})` : ''}` : ''}
- Nội dung câu hỏi: "${questionContext.text}"
- Các lựa chọn: ${optionsFormatted}
- Đáp án đúng: (${questionContext.correctAnswer})
- Đáp án học viên chọn: ${questionContext.userAnswer ? `(${questionContext.userAnswer})` : 'Chưa chọn'}
${questionContext.transcript ? `- Transcript bài nghe: "${questionContext.transcript}"` : ''}
${questionContext.passageText ? `- Đoạn văn tham khảo: "${questionContext.passageText}"` : ''}
${questionContext.explanation ? `- Lời giải có sẵn: "${questionContext.explanation}"` : ''}
`;
    }

    const dynamicSystem = `${SYSTEM_PROMPT}\n\n${contextString}`;

    const result = await streamText({
      model: google('gemini-3.5-flash'),
      system: dynamicSystem,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error('[AI Tutor Chat Error]:', error);
    const err = error as { statusCode?: number; message?: string };

    if (err?.statusCode === 429) {
      return Response.json(
        { error: 'Hệ thống AI đang quá tải, vui lòng đợi 10 giây và thử lại!' },
        { status: 429 }
      );
    }

    return Response.json(
      { error: err?.message || 'Có lỗi xảy ra khi kết nối tới Gia sư AI.' },
      { status: 500 }
    );
  }
}
