import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const vocabSchema = z.object({
  words: z.array(z.object({
    word: z.string().describe("The English word or phrase."),
    ipa: z.string().describe("The standard IPA pronunciation."),
    partOfSpeech: z.enum(["noun", "verb", "adjective", "adverb", "preposition", "conjunction", "idiom", "phrasal verb"]),
    vietnamese: z.string().describe("The Vietnamese translation, short and accurate in TOEIC context."),
    category: z.string().describe("A general topic category, e.g., 'Business & Corporate', 'Real Estate', etc."),
    targetBand: z.enum(["450+", "650+", "800+"]).describe("The TOEIC difficulty band for this word."),
    examples: z.array(z.string()).min(1).max(2).describe("1 or 2 practical example sentences in English that frequently appear in TOEIC tests."),
    mnemonicTip: z.string().describe("A short Vietnamese mnemonic tip (mẹo nhớ) to help remember the word."),
    emoji: z.string().optional().default("")
  }))
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, payload } = body; 
    // type: 'text_list' | 'topic'
    // payload: string (e.g. "revenue, budget" or "Airport")

    if (!type || !payload) {
      return NextResponse.json({ error: "Thiếu 'type' hoặc 'payload'." }, { status: 400 });
    }

    let userPrompt = "";
    if (type === 'single_word') {
      userPrompt = `Tạo thông tin flashcard từ vựng TOEIC chi tiết cho đúng 1 từ hoặc cụm từ tiếng Anh sau: "${payload}".
Yêu cầu bắt buộc:
- Bắt buộc trả về đúng 1 từ trong mảng words.
- word: chính xác từ/cụm từ được yêu cầu.
- ipa: phiên âm chuẩn quốc tế IPA.
- partOfSpeech: từ loại chính xác (noun, verb, adjective, adverb, preposition, conjunction, idiom, phrasal verb).
- vietnamese: nghĩa tiếng Việt ngắn gọn, thông dụng nhất trong ngữ cảnh công sở / bài thi TOEIC.
- category: chủ đề TOEIC phù hợp (ví dụ: 'Doanh nghiệp', 'Nhân sự', 'Hợp đồng', 'Tài chính', 'Văn phòng', 'Bán lẻ'...).
- targetBand: phân loại band điểm TOEIC ("450+", "650+", hoặc "800+").
- examples: 1 đến 2 câu ví dụ tiếng Anh thực tế trong môi trường kinh doanh/công sở thường gặp trong đề thi TOEIC.
- mnemonicTip: mẹo ghi nhớ ngắn gọn, thú vị bằng tiếng Việt (tuyệt đối KHÔNG dùng emoji).`;
    } else if (type === 'text_list') {
      userPrompt = `Tạo flashcard chi tiết cho các từ vựng sau: ${payload}. Hãy đảm bảo bao gồm đầy đủ nghĩa, ví dụ sát đề thi TOEIC, mẹo nhớ tiếng Việt và phiên âm chuẩn. Tuyệt đối KHÔNG dùng emoji.`;
    } else if (type === 'topic') {
      userPrompt = `Hãy gợi ý danh sách 10 từ vựng cốt lõi nhất thường xuất hiện trong đề thi TOEIC thuộc chủ đề: "${payload}". Cung cấp đầy đủ thông tin cho từng từ. Tuyệt đối KHÔNG dùng emoji.`;
    } else if (type === 'context_word') {
      const payloadObj = payload as { word: string; context: string };
      userPrompt = `Hãy giải nghĩa từ vựng tiếng Anh "${payloadObj.word}" DỰA TRÊN NGỮ CẢNH của câu sau đây: "${payloadObj.context}".
Chỉ trả về 1 từ duy nhất. Phần giải nghĩa tiếng Việt (vietnamese) cần ngắn gọn, chính xác tuyệt đối với ngữ cảnh câu trên. Từ loại (partOfSpeech) cũng phải chuẩn theo ngữ cảnh. Tuyệt đối KHÔNG dùng emoji.`;
    } else if (type === 'url') {
      try {
        const response = await fetch(payload);
        if (!response.ok) {
           throw new Error(`Failed to fetch URL: ${response.statusText}`);
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Remove unwanted elements
        $('script, style, noscript, iframe, img, svg, head, nav, footer, header').remove();
        
        // Get text content and clean up whitespace
        const textContent = $('body').text().replace(/\s+/g, ' ').trim();
        
        // Truncate to avoid exceeding prompt limits
        const truncatedText = textContent.slice(0, 15000);
        
        userPrompt = `Dưới đây là nội dung trích xuất từ một bài báo/trang web:
        
"""
${truncatedText}
"""

Hãy phân tích nội dung trên và chọn ra 10 từ vựng hoặc cụm từ tiếng Anh quan trọng, phổ biến trong bài thi TOEIC có xuất hiện trong bài viết đó để tạo flashcard. Cung cấp đầy đủ thông tin (nghĩa tiếng Việt, phiên âm, mẹo nhớ, ví dụ) cho từng từ theo đúng định dạng được yêu cầu. Ví dụ nên liên quan đến ngữ cảnh của bài viết nếu có thể.`;
      } catch (e: any) {
         return NextResponse.json({ error: "Không thể truy cập hoặc đọc nội dung từ đường link.", detail: e.message }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: "Type không hợp lệ." }, { status: 400 });
    }

    const systemPrompt = `Bạn là một chuyên gia đào tạo và luyện thi TOEIC hàng đầu. 
    Nhiệm vụ của bạn là cung cấp dữ liệu từ vựng TOEIC cực kỳ chuẩn xác và dễ hiểu cho người Việt học tiếng Anh.
    Các câu ví dụ (examples) cần phải là những mẫu câu thường gặp trong part 5, part 6, hoặc part 7 của bài thi TOEIC.
    Mẹo nhớ (mnemonicTip) nên sử dụng kỹ thuật âm thanh tương tự (từ đồng âm) hoặc hình ảnh liên tưởng hài hước bằng tiếng Việt để dễ nhớ.`;

    let generatedWords;
    try {
      const { object } = await generateObject({
        model: google('gemini-3.6-flash'),
        schema: vocabSchema,
        system: systemPrompt,
        prompt: userPrompt,
      });
      generatedWords = object.words;
    } catch (primaryError) {
      console.warn('Primary model gemini-3.6-flash encountered an issue, falling back to gemini-3.5-flash-lite:', primaryError);
      const { object } = await generateObject({
        model: google('gemini-3.5-flash-lite'),
        schema: vocabSchema,
        system: systemPrompt,
        prompt: userPrompt,
      });
      generatedWords = object.words;
    }

    return NextResponse.json({ words: generatedWords });
  } catch (error) {
    console.error("AI Generation Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Lỗi trong quá trình sinh từ vựng bằng AI.", detail: message }, { status: 500 });
  }
}
