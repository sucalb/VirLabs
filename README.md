# Phòng Lab Ảo

Bộ mô phỏng tương tác để giáo viên cấp 2 và cấp 3 trình chiếu trên lớp: 39 bài lab cho 6 môn, lọc được theo lớp 6 đến 12.

| Môn | Bài lab |
|---|---|
| Toán | Hàm số bậc ba, parabol, đường tròn lượng giác, hình khối và thiết diện, xác suất thực nghiệm |
| Vật lí | Mạch nối tiếp và song song, tự lắp mạch điện, thấu kính, khúc xạ (lớp 9); chuyển động thẳng biến đổi đều, rơi tự do và ném ngang, ném xiên, tổng hợp lực, va chạm và động lượng (lớp 10); dao động điều hoà, con lắc đơn, sóng trên dây, giao thoa sóng, điện trường, electron trong dây dẫn, định luật Ohm toàn mạch (lớp 11) |
| Hoá học | Bảng tuần hoàn, phân tử 3D, cân bằng phương trình, tốc độ phản ứng, kim loại tác dụng với nước và acid, chuẩn độ acid – base |
| Sinh học | Nguyên phân và giảm phân, lai Mendel, phả hệ, phiên mã và dịch mã, lưới thức ăn, quần thể thỏ – mèo rừng |
| Địa lí | Mùa và độ dài ngày đêm, ngày đêm và múi giờ, biểu đồ khí hậu |
| Tin học | Thuật toán sắp xếp, tìm kiếm tuần tự và nhị phân, hệ nhị phân |

Toàn bộ trang là một tệp `index.html`, không cần máy chủ hay cài đặt.

## Sửa và dựng lại

Mã nguồn nằm trong `src/`, chia theo môn:

- `1-page.html`: giao diện và CSS
- `2-core-toan.js`: phần lõi và các bài Toán
- `3-ly.js`, `4-hoa.js`, `5-sinh.js`, `7-dia.js`, `8-tin.js`: các bài theo môn
- `6-build.js`: bài tự lắp mạch điện
- `10-ly2.js`: các bài Vật lí lớp 10 và 11 bổ sung
- `9-boot.js`: khởi động trang

Sau khi sửa, chạy lệnh sau để tạo lại `index.html`:

```sh
./build.sh
```

Số liệu khí hậu là giá trị trung bình làm tròn, bản đồ ngày đêm vẽ phác đường bờ biển. Hai bài này dùng để minh hoạ, không thay thế số liệu trong SGK.
