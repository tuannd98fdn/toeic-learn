import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Sử dụng: npx tsx scripts/ingest_exam.ts <URL> <YEAR> <TEST_NUM>');
    console.log('Ví dụ: npx tsx scripts/ingest_exam.ts "https://study4.com/tests/2029/ets-toeic-2022-test-1/" 2022 1');
    process.exit(1);
  }

  const url = args[0];
  const year = args[1];
  const testNum = args[2];

  console.log(`\n========================================`);
  console.log(`🚀 BẮT ĐẦU QUÁ TRÌNH NHẬP LIỆU ĐỀ THI`);
  console.log(`========================================`);
  console.log(`URL: ${url}`);
  console.log(`Đề: ETS ${year} - Test ${testNum}`);
  console.log(`----------------------------------------`);

  const rawJsonPath = path.join(__dirname, 'raw_toeic.json');
  
  // Xóa file cũ nếu có để tránh parse nhầm dữ liệu cũ
  if (fs.existsSync(rawJsonPath)) {
    fs.unlinkSync(rawJsonPath);
  }

  try {
    console.log('\nBước 1: Chạy Crawler chặn API (Playwright)...');
    execSync(`npx tsx scripts/crawl.ts "${url}"`, { stdio: 'inherit' });

    if (!fs.existsSync(rawJsonPath)) {
      console.error('\n❌ Lỗi: Crawler đã chạy xong nhưng không tìm thấy file raw_toeic.json!');
      console.error('Có thể trang web không load đúng API hoặc cấu trúc đã thay đổi.');
      process.exit(1);
    }

    console.log('\nBước 2: Xử lý dữ liệu (Universal Parser)...');
    execSync(`npx tsx scripts/universal_parser.ts scripts/raw_toeic.json ${year} ${testNum}`, { stdio: 'inherit' });

    console.log(`\n🎉 HOÀN TẤT NHẬP LIỆU: ETS ${year} Test ${testNum}`);
    console.log(`Hãy kiểm tra thư mục public/data/ets${year}/test${testNum} và file public/data/tests_index.json`);
  } catch (error) {
    console.error('\n❌ Quá trình nhập liệu thất bại:', error);
    process.exit(1);
  }
}

main();
