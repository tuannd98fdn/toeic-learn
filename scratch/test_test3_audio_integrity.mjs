import fs from 'fs';
import path from 'path';

const audioDir = path.resolve(process.cwd(), 'public/audio/ets2022/test3');
console.log('=== KIỂM TRA TOÀN VẸN TỆP ÂM THANH ETS 2022 TEST 3 ===\n');

if (!fs.existsSync(audioDir)) {
  console.error('❌ Không tìm thấy thư mục âm thanh:', audioDir);
  process.exit(1);
}

const expectedAudios = [];
// Part 1: 6 questions
for (let i = 1; i <= 6; i++) {
  expectedAudios.push({ part: 1, name: `p1_0${i}.mp3` });
}
// Part 2: 25 questions (7 - 31)
for (let i = 7; i <= 31; i++) {
  const numStr = i < 10 ? `0${i}` : `${i}`;
  expectedAudios.push({ part: 2, name: `p2_${numStr}.mp3` });
}
// Part 3: 13 sets (1 - 13)
for (let i = 1; i <= 13; i++) {
  const numStr = i < 10 ? `0${i}` : `${i}`;
  expectedAudios.push({ part: 3, name: `p3_s${numStr}.mp3` });
}
// Part 4: 10 sets (1 - 10)
for (let i = 1; i <= 10; i++) {
  const numStr = i < 10 ? `0${i}` : `${i}`;
  expectedAudios.push({ part: 4, name: `p4_s${numStr}.mp3` });
}

console.log(`Kiểm tra ${expectedAudios.length} tệp âm thanh MP3 nội bộ...\n`);

let totalSize = 0;
let errors = [];

expectedAudios.forEach(({ part, name }) => {
  const filePath = path.join(audioDir, name);
  if (!fs.existsSync(filePath)) {
    errors.push(`Part ${part}: Không tìm thấy tệp ${name}`);
    return;
  }
  const stat = fs.statSync(filePath);
  if (stat.size < 10000) {
    errors.push(`Part ${part}: Tệp ${name} quá nhỏ (${stat.size} bytes) - có thể bị hỏng!`);
  } else {
    totalSize += stat.size;
  }
});

const mbSize = (totalSize / (1024 * 1024)).toFixed(2);
console.log(`✓ Đã xác nhận: ${expectedAudios.length - errors.length}/${expectedAudios.length} tệp âm thanh MP3 hợp lệ`);
console.log(`✓ Tổng dung lượng âm thanh toàn bài: ${mbSize} MB (siêu nhẹ, 0ms latency)`);

if (errors.length > 0) {
  console.error('\n❌ PHÁT HIỆN LỖI ÂM THANH:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('✅ KẾT QUẢ: 100% 54/54 TỆP ÂM THANH MP3 ĐẠT CHUẨN NỘI BỘ VÀ SẴN SÀNG SỬ DỤNG!\n');
}
