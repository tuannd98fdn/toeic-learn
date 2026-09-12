import { test, expect } from '@playwright/test';

test.describe('Community Q&A Feature', () => {
  test('should display Community tab in AITutorDrawer', async ({ page }) => {
    // 1. Mở trang Part 5
    await page.setExtraHTTPHeaders({ 'x-playwright-test': 'true' });
    await page.goto('http://localhost:3000/part5');
    
    // 2. Chờ tải xong và click một đáp án bất kỳ (VD: đáp án đầu tiên)
    const optionBtn = page.locator('div[class*="optionsGrid"] > button').first();
    await expect(optionBtn).toBeVisible({ timeout: 15000 });
    await optionBtn.click();
    
    // 3. Hiển thị nút mở Gia Sư AI
    const tutorButton = page.getByRole('button', { name: /Gia Sư AI|Hiểu sâu hơn/i }).first();
    await expect(tutorButton).toBeVisible({ timeout: 5000 });
    
    // 4. Click mở Gia Sư AI
    await tutorButton.click();
    
    // 5. Kiểm tra xem Drawer đã mở chưa bằng cách tìm tab "Chat"
    const chatTab = page.getByRole('button', { name: 'Chat', exact: true });
    await expect(chatTab).toBeVisible();

    // 5. Kiểm tra tab "Cộng đồng" có xuất hiện không
    const communityTab = page.getByRole('button', { name: /Cộng đồng/i, exact: true });
    await expect(communityTab).toBeVisible();

    // 6. Chuyển sang tab "Cộng đồng"
    await communityTab.click();

    // 7. Xác nhận nội dung của tab Cộng đồng hiển thị đúng trạng thái
    const communityHeader = page.getByText(/Cộng đồng hỏi đáp|Thảo luận từ học viên/i).first();
    await expect(communityHeader).toBeVisible();

    // Giao diện sẽ hiển thị 1 trong 2 trạng thái: "Chưa có thảo luận nào" hoặc "Thảo luận từ học viên khác"
    const noDiscussionText = page.getByText(/Chưa có thảo luận nào/i);
    const hasDiscussionText = page.getByText(/Thảo luận từ học viên khác/i);

    // Dùng .or() để check 1 trong 2 điều kiện đều hợp lệ (tuỳ vào database)
    await expect(noDiscussionText.or(hasDiscussionText)).toBeVisible();
  });
});
