import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const maxDuration = 30;

const SYSTEM_PROMPT = `
Bạn là Gia Sư TOEIC 990. Người dùng vừa hoàn thành một phiên luyện tập/thi TOEIC.
Nhiệm vụ của bạn là đọc toàn bộ lịch sử trò chuyện (Chat) và ghi chú (Note) của người dùng trong phiên học đó, sau đó tạo ra một "Bản Tổng Hợp Kiến Thức Cốt Lõi" (Summary).

Yêu cầu tóm tắt:
- Rất NGẮN GỌN, XÚC TÍCH, chia làm 3 phần chính.
- Sử dụng Markdown, in đậm các từ khóa quan trọng.
- KHÔNG dông dài, đi thẳng vào các lỗi sai, điểm cần lưu ý, mẹo hay đã được đề cập trong cuộc hội thoại.
- KHÔNG sử dụng emoji.

Cấu trúc gợi ý (chỉ dùng nếu phù hợp):
### 1. Từ vựng & Cấu trúc đã học
...
### 2. Bẫy ETS cần nhớ
...
### 3. Mẹo giải nhanh đã áp dụng
...
`;

export async function POST(req: Request) {
  try {
    const { chatLog, note } = await req.json();

    if (!chatLog || !Array.isArray(chatLog)) {
      return Response.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 });
    }

    let conversationContext = 'LỊCH SỬ CHAT TRONG PHIÊN:\n';
    chatLog.forEach((msg: any) => {
      conversationContext += `[${msg.role === 'user' ? 'Học viên' : 'Gia sư'}]: ${msg.content}\n\n`;
    });

    if (note) {
      conversationContext += `\nGHI CHÚ CỦA HỌC VIÊN:\n${note}\n`;
    }

    const dynamicSystem = `${SYSTEM_PROMPT}\n\n${conversationContext}`;

    const result = await streamText({
      model: google('gemini-3.5-flash'),
      system: dynamicSystem,
      prompt: 'Hãy tổng hợp lại những kiến thức quan trọng nhất từ phiên học này.',
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('[AI Summary Error]:', error);
    return Response.json(
      { error: error?.message || 'Lỗi tạo tóm tắt' },
      { status: 500 }
    );
  }
}
