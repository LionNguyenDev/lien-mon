Hãy thiết kế và dựng bản mẫu website tương tác (prototype chạy được) tên "HÀNH TRÌNH KHÁM PHÁ TP.HCM", ngôn ngữ giao diện tiếng Việt. Website kể câu chuyện và giá trị di sản của TP.HCM qua 10 địa điểm.

## 1. PHONG CÁCH CHUNG
- Cảm giác du lịch, khám phá, di sản: giống một cuốn nhật ký hành trình / tấm bản đồ cổ điển hiện đại.
- Bảng màu: [ví dụ: nền kem giấy cũ #F5EBD7, xanh đậm navy #1F3A5F, đỏ gạch/đỏ mộc #B5432F, vàng đồng #C8963E]. Màu hài hòa, tương phản đủ để dễ đọc.
- Font: tiêu đề dùng font serif có cá tính (ví dụ Playfair Display hoặc Be Vietnam Pro đậm), nội dung dùng sans-serif dễ đọc. BẮT BUỘC hỗ trợ đầy đủ dấu tiếng Việt.
- Phong cách thống nhất từ trang đầu đến trang cuối: cùng kiểu nút, bo góc, đổ bóng, icon, ghim bản đồ.
- Responsive: thiết kế mobile-first, hiển thị tốt trên điện thoại và máy tính. Nút và ghim bản đồ đủ lớn để chạm (tối thiểu 44px).

## 2. TRANG 1: MÀN HÌNH BẮT ĐẦU
- Hình nền toàn màn hình gợi du lịch + bản đồ + kiến trúc TP.HCM (ảnh/illustration có lớp phủ tối nhẹ để chữ nổi bật).
- Tiêu đề lớn: "HÀNH TRÌNH KHÁM PHÁ".
- Dòng phụ: "Khám phá những câu chuyện và giá trị di sản của TP.HCM".
- Nút nổi bật, đặt dễ thấy: "BẮT ĐẦU HÀNH TRÌNH" → chuyển sang Trang 2.
- Có hiệu ứng xuất hiện nhẹ nhàng (fade/slide), không rườm rà.

## 3. TRANG 2: BẢN ĐỒ HÀNH TRÌNH
- Bản đồ TP.HCM ở trung tâm, vẽ minh họa theo phong cách đã chọn (không dùng Google Maps).
- 10 ghim đánh số 1 → 10, có tên địa điểm bên cạnh mỗi ghim.
- Đường nét đứt nối các địa điểm theo thứ tự, thể hiện hành trình.
- Mỗi địa điểm có nút "CHI TIẾT". Bấm vào ghim, tên hoặc nút "CHI TIẾT" đều dẫn đến đúng trang chi tiết của địa điểm đó.
- Hai trạng thái ghim: CHƯA khám phá (màu trung tính) và ĐÃ khám phá (màu nổi bật + dấu tick).
- Thanh tiến độ ở phía trên: "Đã khám phá X/10 địa điểm".
- Trên điện thoại: bản đồ cho phép kéo/zoom, hoặc có danh sách địa điểm phía dưới để bấm thay thế.
- Người dùng được chọn địa điểm bất kỳ, KHÔNG bắt buộc đi theo thứ tự.

## 4. TRANG CHI TIẾT ĐỊA ĐIỂM (1 template dùng chung cho cả 10 địa điểm)
Nội dung đọc từ một file dữ liệu (JSON/object) để dễ cập nhật; chỉ thay tên, hình ảnh, nội dung.

Phần đầu trang:
- Số thứ tự địa điểm trong hành trình (ví dụ "01/10").
- Nhãn tiêu đề: địa điểm 1 là "NƠI BẮT ĐẦU", các địa điểm sau dùng tiêu đề riêng (lấy từ dữ liệu).
- Tên địa điểm nổi bật, đặt cạnh hình ảnh minh họa lớn (desktop: chia 2 cột; mobile: xếp dọc).
- Dưới hình ảnh: nút "TÌM HIỂU THÊM".

Phần tìm hiểu thêm:
- Ban đầu ẩn. Khi bấm "TÌM HIỂU THÊM", hiện 3 đề mục A, B, C: A. [Tên đề mục A] / B. [Tên đề mục B] / C. [Tên đề mục C].
- Mỗi đề mục là accordion: bấm vào thì nội dung mở ngay bên dưới, bấm lại thì đóng. Có thể mở/đóng từng mục độc lập. KHÔNG chuyển sang trang mới.
- Khi người dùng đã mở đủ A, B, C (hoặc bấm nút "Đánh dấu đã khám phá"), địa điểm được ghi nhận là ĐÃ KHÁM PHÁ và hiện thông báo nhỏ xác nhận.

Phần cuối trang (khu điều hướng):
- Bản đồ TP.HCM thu nhỏ, cùng phong cách với bản đồ Trang 2, chiều cao vừa phải, đánh dấu rõ "Vị trí hiện tại" và "Điểm tiếp theo".
- Nút "QUAY LẠI BẢN ĐỒ" → về Trang 2.
- Nút "ĐỊA ĐIỂM TIẾP THEO" → sang trang chi tiết kế tiếp.
- Ở địa điểm cuối cùng: thay bằng nút "HOÀN THÀNH HÀNH TRÌNH". Nếu còn địa điểm chưa khám phá, hiện thông báo "Bạn còn X địa điểm chưa khám phá" kèm nút về bản đồ; nếu đủ thì chuyển sang trang chứng nhận.

## 5. TRANG CUỐI: CHỨNG NHẬN HOÀN THÀNH
- Chỉ mở khi cả 10 địa điểm đã được đánh dấu khám phá. Nếu chưa đủ, chặn truy cập và đưa về bản đồ.
- Tiêu đề: "CHÚC MỪNG BẠN!"
- Dòng chính: "ĐÃ HOÀN THÀNH HÀNH TRÌNH KHÁM PHÁ TP.HCM".
- Tấm chứng nhận có khung viền hoa văn, họa tiết bản đồ mờ làm nền, dấu mộc kỷ niệm (con dấu tròn), ngày hoàn thành (tự lấy theo ngày hiện tại).
- Ô nhập tên người dùng, tên hiển thị trực tiếp lên chứng nhận.
- Nút "TẢI CHỨNG NHẬN" (xuất ảnh PNG, hoạt động thật) và nút "QUAY LẠI BẢN ĐỒ".

## 6. CHỨC NĂNG BẮT BUỘC
- Mọi nút đều hoạt động thật, không chỉ để trang trí.
- Tiến độ khám phá được lưu (localStorage, có try/catch và vẫn chạy bình thường nếu không lưu được) để người dùng tải lại trang không mất tiến độ.
- Có nút nhỏ "Làm lại từ đầu" để xóa tiến độ.
- Điều hướng không lỗi khi đi sai thứ tự, tải lại trang hoặc vào thẳng link chi tiết.

## 7. DỮ LIỆU MẪU (thay bằng nội dung thật của khách)
Dùng 10 địa điểm mẫu: [1. Địa điểm A ... 10. Địa điểm J]. Ví dụ tạm: Dinh Độc Lập, Nhà thờ Đức Bà, Bưu điện Trung tâm, Chợ Bến Thành, Nhà hát Thành phố, Bảo tàng Chứng tích Chiến tranh, Chùa Bà Thiên Hậu, Bến Nhà Rồng, Bảo tàng Mỹ thuật, Địa đạo Củ Chi. Mỗi địa điểm có: tên, tiêu đề phụ, ảnh (dùng ảnh placeholder), nội dung ngắn cho A, B, C (viết tạm 2-3 câu).

## 8. KẾT QUẢ MONG MUỐN
Một website chạy được, đủ 4 loại trang (bắt đầu, bản đồ, chi tiết, chứng nhận), có thể bấm thử toàn bộ luồng:
Trang 1 → Trang 2 → Chi tiết → Tìm hiểu A/B/C → Địa điểm tiếp theo → ... → Chứng nhận.