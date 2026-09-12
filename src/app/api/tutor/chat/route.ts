import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

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
  questionId?: string;
  testId?: string;
}

const SYSTEM_PROMPT = `
Bạn là "Gia Sư TOEIC 990" - Huấn luyện viên luyện thi TOEIC hàng đầu tại nền tảng TOEIC Master VN.
Mục tiêu của bạn: Giúp học viên nắm chắc BẢN CHẤT, NHẬN DIỆN BẪY ETS TIN VI và RÈN PHẢN XẠ GIẢI NHANH DƯỚI 15 GIÂY.

NGUYÊN TẮC GIẢNG DẠY:
1. Xưng hô: Thân thiện, gần gũi ("thầy" - "em"). TUYỆT ĐỐI BỎ QUA các lời chào hỏi dài dòng (VD: "Chào em, thầy chúc mừng em đã chọn đúng..."). VÀO THẲNG VẤN ĐỀ ĐỂ TIẾT KIỆM THỜI GIAN ĐỌC.
2. Định dạng Markdown chuẩn mực:
   - Luôn sử dụng tiêu đề cấp 3 (###) cho từng phần phân tích.
   - Các ý phân tích phải dùng gạch đầu dòng (-), KHÔNG viết dồn thành một đoạn văn dài.
   - BẮT BUỘC bọc TẤT CẢ các từ vựng tiếng Anh, cụm từ tiếng Anh, và các đáp án (A, B, C, D) trong dấu backtick để làm nổi bật. Ví dụ: \`Masara Bankole\`, \`has agreed\`, đáp án \`(B)\`.
   - In đậm (**từ khóa**) các thành phần ngữ pháp cốt lõi tiếng Việt (VD: **Chủ ngữ**, **Động từ**).
   - Sử dụng thẻ Blockquote (>) dành riêng cho các MẸO hoặc BẪY. Ví dụ:
     > LƯU Ý MẸO 15 GIÂY: Nhìn trước có \`X\`, nhìn sau có \`Y\` => Chọn ngay \`Z\`.
3. Cấu trúc bài giải thích chuẩn mực:
   ### 1. Bản chất & Phân tích cấu trúc
   - **Chủ ngữ (S)**: ...
   - **Động từ chính (V)**: ...
   - **Vị trí cần điền**: ...
   ### 2. Bẫy ETS hay gài (Trap Alert)
   > CẢNH BÁO BẪY ETS: Tại sao đáp án nhiễu dễ làm học viên sai và cách phân biệt ngay lập tức.
   ### 3. Mẹo giải nhanh dưới 15 giây (15s Hack)
   > MẸO GIẢI NHANH: Quy tắc nhìn nhanh giải ngay.
4. Đối với bài nghe (Listening Part 1-4):
   - Luôn bóc tách hiện tượng nối âm (linking sounds), nuốt âm, trọng âm và từ đồng âm gây bẫy.
5. Khi học viên yêu cầu tạo câu tương tự (Drill):
   - Soạn 2 câu trắc nghiệm mới có dạng bẫy tương tự (kèm 4 đáp án \`(A)\`, \`(B)\`, \`(C)\`, \`(D)\`).
   - Đưa đáp án đúng và lời giải thích súc tích bên dưới mỗi câu.
6. Luôn ngắn gọn, trọng tâm, thực chiến 100%, không dài dòng lý thuyết sách vở.
7. TUYỆT ĐỐI KHÔNG SỬ DỤNG BẤT KỲ EMOJI (biểu tượng cảm xúc) NÀO TRONG TOÀN BỘ CÂU TRẢ LỜI. Bạn không được dùng emoji 💡, ⚠️, ⚡. Nếu cần nhấn mạnh, hãy dùng CHỮ IN HOA. Thay vì dùng emoji ở cấu trúc trên, hãy viết: > LƯU Ý MẸO 15 GIÂY: ... hoặc > CẢNH BÁO BẪY ETS: ...
`;

export async function POST(req: Request) {
  try {
    const { messages, questionContext } = (await req.json()) as {
      messages: { role: 'user' | 'assistant'; content: string }[];
      questionContext?: QuestionContext;
    };

    // Lấy session ngay từ đầu để có user.id, tránh lỗi mất context trong onFinish
    const session = await getServerSession(authOptions);
    let userId: string | undefined;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) userId = user.id;
    }
    console.log('[CHAT API] Session check. userId:', userId, 'email:', session?.user?.email);

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

    const userQuery = messages[messages.length - 1]?.content || '';

    // Phase 3: Semantic Caching (Exact match for MVP)
    if (questionContext?.testId && questionContext?.questionId && userQuery) {
      const cached = await prisma.questionDiscussion.findFirst({
        where: {
          testId: questionContext.testId,
          questionId: questionContext.questionId,
          query: userQuery,
        },
      });

      if (cached) {
        // Thêm câu dẫn để người dùng biết đây là câu trả lời lấy từ cache cộng đồng
        const cachePrefix = "> *Câu hỏi này đã được học viên khác hỏi và được Gia sư trả lời. Dưới đây là lời giải đáp:*\n\n";
        return new Response(cachePrefix + cached.response, {
          status: 200,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
    }

    const dynamicSystem = `${SYSTEM_PROMPT}\n\n${contextString}`;

    const result = await streamText({
      model: google('gemini-3.5-flash'),
      system: dynamicSystem,
      messages,
      onFinish: async (event) => {
        // Lưu câu trả lời vào Database (Community Q&A)
        console.log('[CHAT API] onFinish called. testId:', questionContext?.testId, 'questionId:', questionContext?.questionId, 'userId:', userId);
        if (questionContext?.testId && questionContext?.questionId && userQuery) {
          try {
            if (userId) {
              const newDiscussion = await prisma.questionDiscussion.create({
                data: {
                  userId: userId,
                  testId: questionContext.testId,
                  questionId: questionContext.questionId,
                  query: userQuery,
                  response: event.text,
                  isVerified: true, // AI trả lời nên tự động được verified
                },
              });
              console.log('[CHAT API] Saved discussion to DB:', newDiscussion.id);
            } else {
              console.log('[CHAT API] Cannot save because userId is missing.');
            }
          } catch (e) {
            console.error('[CHAT API] Lỗi khi lưu QuestionDiscussion:', e);
          }
        }
      }
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
