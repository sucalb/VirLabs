# VirLabs

Phát triển bởi thầy Bùi Đức Hoàng.

Bộ mô phỏng tương tác để giáo viên cấp 2 và cấp 3 trình chiếu trên lớp: 62 bài lab cho 6 môn, bám theo Chương trình giáo dục phổ thông 2018 (đã sửa đổi, bổ sung theo Thông tư 17/2025/TT-BGDĐT), lọc được theo lớp 6 đến 12.

| Môn | Bài lab |
|---|---|
| Toán | Số nguyên trên trục số, phân số (lớp 6); tổng ba góc tam giác (7); định lí Pythagore (8); góc nội tiếp, parabol (9); xác suất thực nghiệm; đường tròn lượng giác, hình khối và thiết diện (11); hàm số bậc ba, tích phân (12) |
| Vật lí | Gương phẳng, âm thanh (KHTN 7); lực đẩy Archimedes, đòn bẩy (KHTN 8); mạch nối tiếp và song song, tự lắp mạch điện, thấu kính, khúc xạ (lớp 9); chuyển động thẳng biến đổi đều, rơi tự do và ném ngang, ném xiên, tổng hợp lực, va chạm và động lượng (lớp 10); dao động điều hoà, con lắc đơn, sóng trên dây, giao thoa sóng, điện trường, electron trong dây dẫn, định luật Ohm toàn mạch (lớp 11) |
| Hoá học | Bảng tuần hoàn, phân tử 3D, cân bằng phương trình, tốc độ phản ứng, lắp ráp nguyên tử, thang pH và chất chỉ thị, mol và khối lượng mol, cân bằng hoá học, kim loại tác dụng với nước và acid, chuẩn độ acid – base, pin điện hoá |
| Sinh học | Cơ thể người 3D (toàn thân, tim, não, hệ hô hấp, hệ tiêu hoá), cấu tạo tế bào, thẩm thấu, tuần hoàn máu, xác định giới tính, quang hợp, nguyên phân và giảm phân, lai Mendel, phả hệ, phiên mã và dịch mã, lưới thức ăn, quần thể thỏ – mèo rừng |
| Địa lí | Tỉ lệ bản đồ, mùa và độ dài ngày đêm, ngày đêm và múi giờ, biểu đồ khí hậu |
| Tin học | Thuật toán sắp xếp, tìm kiếm tuần tự và nhị phân, hệ nhị phân, mã màu RGB |

Toàn bộ trang là một tệp `index.html`, không cần máy chủ hay cài đặt.

## Sửa và dựng lại

Mã nguồn nằm trong `src/`, chia theo môn:

- `1-page.html`: giao diện và CSS
- `2-core-toan.js`: phần lõi và các bài Toán
- `3-ly.js`, `4-hoa.js`, `5-sinh.js`, `7-dia.js`, `8-tin.js`: các bài theo môn
- `6-build.js`: bài tự lắp mạch điện
- `10-ly2.js`: các bài Vật lí lớp 10 và 11 bổ sung
- `11-more.js`, `12-more2.js`: các bài bổ sung theo chương trình GDPT 2018
- `2b-art.js`: bộ minh hoạ tự vẽ (con vật, đồ vật, toà nhà) dùng chung
- `13-hoasinh.js`: các bài Hoá và Sinh bổ sung
- `14-body3d.js`: trình xem cơ thể người 3D (Three.js), đọc dữ liệu trong `models/`
- `9-boot.js`: ô chọn (dropdown) đồng bộ giao diện và khởi động trang

Sau khi sửa, chạy lệnh sau để tạo lại `index.html`:

```sh
./build.sh
```

Số liệu khí hậu là giá trị trung bình làm tròn, bản đồ ngày đêm vẽ phác đường bờ biển. Hai bài này dùng để minh hoạ, không thay thế số liệu trong SGK.

## Mô hình 3D

Bài "Cơ thể người 3D" dùng dữ liệu giải phẫu BodyParts3D, © The Database Center for Life Science, giấy phép CC BY-SA 2.1 Japan. Xem `models/README.md`.
