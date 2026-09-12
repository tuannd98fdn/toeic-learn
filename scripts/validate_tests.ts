import * as fs from 'fs';
import * as path from 'path';
import {
  Part1DataSchema,
  Part2DataSchema,
  Part3DataSchema,
  Part4DataSchema,
  Part5DataSchema,
  Part6DataSchema,
  Part7DataSchema,
} from '../src/schema/toeic';

interface TestIndexItem {
  id: string;
  name: string;
  year: number;
  path: string;
}

function validateAllTests() {
  console.log('=== BẮT ĐẦU KIỂM ĐỊNH DỮ LIỆU ĐỀ THI (ZOD SCHEMA AUDIT) ===\n');

  const rootDir = path.resolve(__dirname, '..');
  const indexFilePath = path.join(rootDir, 'public', 'data', 'tests_index.json');

  if (!fs.existsSync(indexFilePath)) {
    console.error('❌ Không tìm thấy file tests_index.json tại:', indexFilePath);
    process.exit(1);
  }

  const testsIndex: TestIndexItem[] = JSON.parse(fs.readFileSync(indexFilePath, 'utf-8'));
  console.log(`Đã tìm thấy ${testsIndex.length} đề thi được đăng ký trong danh mục.\n`);

  let totalQuestionsCount = 0;
  let hasErrors = false;

  testsIndex.forEach((test) => {
    console.log(`----------------------------------------`);
    console.log(`Đang kiểm tra: [${test.id}] - ${test.name}`);
    console.log(`Đường dẫn thư mục: ${test.path}`);
    console.log(`----------------------------------------`);

    const testDir = path.join(rootDir, 'public', test.path);
    if (!fs.existsSync(testDir)) {
      console.error(`❌ Thư mục đề thi không tồn tại: ${testDir}`);
      hasErrors = true;
      return;
    }

    const partSchemas: [string, any][] = [
      ['part1.json', Part1DataSchema],
      ['part2.json', Part2DataSchema],
      ['part3.json', Part3DataSchema],
      ['part4.json', Part4DataSchema],
      ['part5.json', Part5DataSchema],
      ['part6.json', Part6DataSchema],
      ['part7.json', Part7DataSchema],
    ];

    let testQCount = 0;

    partSchemas.forEach(([fileName, schema]) => {
      const filePath = path.join(testDir, fileName);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Thiếu file: ${fileName}`);
        hasErrors = true;
        return;
      }

      try {
        const rawContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(rawContent);

        // Validate via Zod
        const result = schema.safeParse(parsed);
        if (!result.success) {
          console.error(`❌ Lỗi schema tại ${test.id}/${fileName}:`, result.error.errors.slice(0, 3));
          hasErrors = true;
          return;
        }

        // Count questions
        let partCount = 0;
        if (['part1.json', 'part2.json', 'part5.json'].includes(fileName)) {
          partCount = parsed.length;
        } else if (['part3.json', 'part4.json', 'part6.json', 'part7.json'].includes(fileName)) {
          parsed.forEach((set: any) => {
            partCount += set.questions?.length || 0;
          });
        }

        testQCount += partCount;
        console.log(`  ✓ ${fileName.padEnd(12)}: Hợp lệ (${partCount} câu)`);
      } catch (err: any) {
        console.error(`❌ Lỗi đọc/parse file ${fileName}:`, err.message);
        hasErrors = true;
      }
    });

    console.log(`=> Tổng câu hỏi cho [${test.id}]: ${testQCount} câu\n`);
    totalQuestionsCount += testQCount;
  });

  console.log(`========================================`);
  if (hasErrors) {
    console.error(`❌ KẾT QUẢ: Phát hiện lỗi trong cấu trúc đề thi! Cần sửa trước khi tiếp tục.`);
    process.exit(1);
  } else {
    console.log(`✅ KẾT QUẢ: 100% ĐỀ THI ĐẠT CHUẨN ZOD SCHEMA.`);
    console.log(`Tổng số câu hỏi toàn hệ thống: ${totalQuestionsCount} câu.`);
    console.log(`========================================\n`);
  }
}

validateAllTests();
