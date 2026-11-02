# Checklist buổi live

## Trước giờ live (làm một lần)

- [ ] Máy đã cài **Node.js 20 trở lên**: mở cmd, gõ `node -v`
- [ ] Code mới nhất: `git pull` trong thư mục `chua-online-live`, hoặc tải repo về nếu là máy khác
- [ ] Đã cài **TikTok LIVE Studio** hoặc **OBS**, và tài khoản đã **được phép live từ máy tính**
- [ ] Tắt chế độ ngủ của máy: Settings → System → Power → Sleep: **Never** khi đang cắm sạc
- [ ] Mạng ổn định, tốc độ upload từ khoảng **6 Mbps** trở lên

## Chuẩn bị, khoảng 15 phút trước live

1. Nháy đúp **`start.bat`**. **Giữ cửa sổ đen này mở suốt buổi**, đóng là overlay ngừng chạy.
2. Bảng điều khiển tự mở. Nếu không, vào http://localhost:3000/control.html
3. Thử nhanh: bấm **Xin xăm**, **Chuông · 199**, **Kinh hành**, rồi xem overlay có phản ứng và **có tiếng đọc** không.
4. Bấm **Làm trống bồ đoàn** để xóa người thử. Bấm **Bắt đầu buổi mới** để đặt lại bảng công đức của buổi.
5. Trong TikTok LIVE Studio hoặc OBS, thêm **Browser source**:
   - URL: `http://localhost:3000/overlay.html`
   - Kích thước: **1080 × 1920**
   - Nếu phần mềm chỉ có Window capture: mở overlay bằng nút **Mở overlay (có âm thanh)**, bấm **Bật âm thanh** một lần trong cửa sổ đó, rồi capture cửa sổ.
6. Chỉ để **một** nguồn overlay có âm thanh. Các cửa sổ xem thử khác dùng `overlay.html?audio=0`.

## Lúc live

1. Bấm **Phát trực tiếp** trên TikTok trước.
2. Trong bảng điều khiển, nhập `@tênkênh` và bấm **Kết nối**. Trạng thái ở góc trên phải phải chuyển sang **"đang nhận sự kiện"**.
3. Nhờ một người bình luận thử "xin xăm" để kiểm tra.
4. **Không bấm Bot hay Đổ người khi đang live thật.** Các nhân vật này mang tên giống người thật, người xem sẽ tưởng là người thật. Lỗi này chưa sửa.
5. Thỉnh thoảng mở mục **Duyệt lời nguyện** để duyệt lời nguyện của người xem.

## Nếu có lỗi

| Hiện tượng | Cách xử lý |
|---|---|
| "chưa phát trực tiếp (offline)" | Bật LIVE trên TikTok trước, đợi khoảng 30 giây rồi bấm Kết nối lại |
| "Máy chủ ký… giới hạn lượt" | Đợi vài phút. Nếu lặp lại nhiều lần thì cần khóa `SIGN_API_KEY` (Euler Stream) |
| Mất kết nối giữa buổi | Server tự thử lại tối đa 8 lần. Nếu báo hết lượt thử thì bấm Kết nối lại |
| Không có tiếng đọc | Nhật ký báo "Giọng Edge lỗi" thì overlay tự chuyển sang giọng của trình duyệt. Nếu vẫn im lặng, kiểm tra đã bấm **Bật âm thanh** trong cửa sổ overlay chưa |
| Giọng đọc phát hai lần | Đang mở hai overlay có âm thanh. Đóng bớt một cái, hoặc thêm `?audio=0` cho cái còn lại |

**Sau buổi live**: chép toàn bộ khung **Nhật ký** trong bảng điều khiển (hoặc chụp màn hình cửa sổ đen) và gửi lại để kiểm tra kết nối TikTok thật có vấn đề gì không.
