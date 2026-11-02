# Kế hoạch & bối cảnh dự án

Cập nhật: 02/11/2026. File này để ai mở repo (kể cả Claude ở phiên làm việc sau) nắm được đã làm gì, đang chờ gì, đã quyết định gì và vì sao.

## Quy tắc làm việc

Trước khi làm một tính năng, phải đánh giá trước: **độ khó, khối lượng, nguồn lực cần có** (khóa API, chi phí chạy, hình ảnh mới, thời gian thử) và **rủi ro**. Chủ dự án đồng ý thì mới làm.

## Ưu tiên hiện tại: chánh điện "tích đức"

Bản chánh điện là sản phẩm chính. Mọi tính năng mới phục vụ bản này trước.

### Đã xong
- Overlay 9:16 chánh điện: ngồi thiền, gõ mõ, thỉnh chuông, thắp hương, rút thẻ an lạc (30 thẻ), lời nguyện có duyệt, mốc cộng đồng, âm lịch
- Quà: xướng tên hồi hướng, "lần thứ n", bảng công đức theo buổi và trọn đời, rút thẻ ưu tiên
- Người xem điều khiển nhân vật: `sang trái` / `sang phải` / `lên` / `xuống`, `kinh hành`, `lên lạy Phật`, bồ đoàn vàng cho top 3 người tặng
- Bảo mật mặc định, 26 test tự động

### Việc tiếp theo, theo thứ tự

| # | Việc | Độ khó | Nguồn lực | Ghi chú |
|---|---|---|---|---|
| 1 | **Thử một buổi live TikTok thật** | — | 1 buổi live khoảng 10–30 phút | Rủi ro lớn nhất: phần kết nối TikTok chưa từng chạy với live thật. Xem [CHECKLIST-LIVE.md](CHECKLIST-LIVE.md) |
| 2 | **Sửa bot thử**: tự tắt khi đang kết nối TikTok thật, gắn nhãn "·thử" | Dễ | Không | Hiện bot và người mẫu mang tên giống người thật. **Không bấm Bot hay Đổ người khi đang live thật** |
| 3 | **Danh hiệu trọn đời** (Phật tử → Thiện hữu → Hộ pháp → Đại thí chủ) | Dễ | Không | Tổng xu đã được lưu sẵn. Nên định danh người xem bằng mã số tài khoản thay vì @username, vì người xem đổi @username sẽ mất danh hiệu |
| 4 | **Bảng Lễ vật**: khung trên overlay ghi quà nào làm gì | Dễ (chia theo mức xu), trung bình (gán từng món quà) | Danh sách quà người xem hay tặng: tên và số xu | Danh sách quà TikTok thay đổi theo khu vực |
| 5 | **Mục tiêu đạo tràng mỗi buổi**: đủ X xu thì mở hiệu ứng đặc biệt | Trung bình | Không, nếu dùng lại hình có sẵn | Không đặt mục tiêu quá cao |

Ý tưởng khác cho bản chánh điện, chưa đánh giá chi tiết:
- hoa đăng hoặc đèn lồng mang tên treo suốt buổi
- bàn nến Dược Sư sáng dần lên
- "Trưởng đạo tràng" (người đứng đầu buổi) được chọn bài tụng, nhạc, cảnh
- rút thẻ theo chủ đề
- giờ an lạc nhân đôi công đức
- màn hình cảm tạ cuối buổi
- bảng vàng tuần

## Để sau: chế độ "Đày phiền não" (âm phủ)

Ý tưởng: người xem gõ một **phiền não hoặc thói xấu**, ví dụ `đày deadline`, `đày cơn lười`, `đày mất ngủ`, rồi tặng quà để chọn tầng địa ngục. Quà càng lớn thì xuống tầng càng sâu. Diêm Vương gõ búa phán bằng giọng đọc. Có bảng "phiền não bị đày nhiều nhất".

- **Bắt buộc: không cho đày tên người.** Người xem chọn từ danh sách phiền não có sẵn, hoặc gõ tự do nhưng chủ live duyệt trước.
- Độ khó trung bình. Khối lượng vừa đến lớn: cảnh mới, cách tính tầng theo quà, hoạt cảnh phán, bảng xếp hạng.
- Nguồn lực lớn nhất là **hình ảnh**: cảnh âm phủ nhiều tầng, Diêm Vương, quỷ sứ, lửa, xích.
- Trình tự đề xuất: làm bản thử với hình vẽ bằng code và live thử để xem phản ứng. Nếu khán giả thích thì tạo bộ hình đẹp bằng AI theo mô tả viết sẵn, rồi ghép vào.
- Rủi ro: cảnh địa ngục đặt cạnh chánh điện có thể bị một số người chê phản cảm.

## Đã quyết định không làm

| Ý tưởng | Lý do |
|---|---|
| Người xem giả, quà giả, tên giả trên bảng công đức | Đánh lừa người đang bỏ tiền thật; TikTok cấm tương tác giả, có thể mất quyền nhận quà hoặc bị khóa kênh |
| Địa ngục ghi **tên người** mình ghét | Trả tiền để bêu tên người thật là quấy rối; có thể vi phạm luật về xúc phạm danh dự (BLHS Điều 155); thu tiền trù ẻo dưới hình ảnh chùa dễ bị coi là mê tín và xúc phạm tôn giáo |
| Sư Trụ Trì AI trò chuyện với người xem | Chủ dự án bỏ (02/11/2026). Nếu làm lại: phải ghi rõ là AI, cần khóa API Anthropic, có chi phí theo giờ, và có rủi ro AI nói sai trên live |

## Rủi ro đã biết

- `tiktok-live-connector` là thư viện không chính thức. Kết nối qua máy chủ ký Euler Stream có thể bị giới hạn lượt; khi đó đặt `SIGN_API_KEY`.
- Edge TTS chập chờn trên mạng của chủ dự án. Đã có cơ chế thử lại 3 lần và dự phòng bằng giọng trình duyệt.
- Hình ảnh và nhạc do AI tạo, lấy từ kentjuno (MIT). Kiểm tra điều khoản trước khi dùng thương mại.
- Các repo tham khảo nằm ở `D:\RepoGithub\_research_chua`. Chỉ kentjuno/chanh-dien-online và Miinh2k4 có giấy phép MIT. Repo khác chỉ lấy ý tưởng, **không chép code hay hình**.
