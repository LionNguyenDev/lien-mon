# Hành trình khám phá TP.HCM

Website tương tác kể câu chuyện và giá trị di sản của TP.HCM qua các địa điểm trong dự án liên môn *"Lịch sử, giá trị và giải pháp bảo tồn, phát huy di sản tại TP.HCM"*. Người dùng đi qua bản đồ hành trình, đọc từng địa điểm, và nhận chứng nhận PNG khi khám phá đủ.

## Luồng trang

| Trang | Đường dẫn | Ghi chú |
| --- | --- | --- |
| Bắt đầu | `/` | Ảnh nền carousel các địa điểm, nút "Bắt đầu hành trình" |
| Bản đồ | `/ban-do` | Bản đồ minh họa, ghim chưa/đã khám phá, thanh tiến độ, nút "Làm lại từ đầu" |
| Chi tiết | `/dia-diem/[slug]` | Một template cho mọi địa điểm; đề mục A/B/C dạng accordion; bản đồ thu nhỏ |
| Chứng nhận | `/chung-nhan` | Chỉ mở khi đã khám phá đủ; nhập tên một lần, tải PNG xong thì hành trình tự làm mới |

Một địa điểm được ghi nhận "đã khám phá" khi mở đủ cả ba đề mục A, B, C hoặc bấm "Đánh dấu đã khám phá". Tiến độ lưu trong `localStorage` của trình duyệt; nếu trình duyệt chặn lưu trữ thì web vẫn chạy, chỉ không giữ được tiến độ khi tải lại.

## Chạy dự án

Yêu cầu Node.js >= 20 và pnpm 10 (`corepack enable` sẽ dùng đúng phiên bản ghi trong `package.json`).

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000).

| Biến môi trường | Ý nghĩa | Mặc định |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | Địa chỉ công khai của web (dùng cho sitemap, ảnh chia sẻ). Không có dấu `/` ở cuối | `http://localhost:3000` |

| Lệnh | Mô tả |
| --- | --- |
| `pnpm dev` | Chạy môi trường phát triển (Turbopack) |
| `pnpm build` / `pnpm start` | Build và chạy bản production (standalone) |
| `pnpm lint` / `pnpm lint:fix` | Kiểm tra / tự sửa lint bằng Biome |
| `pnpm format:check` / `pnpm format:fix` | Kiểm tra / tự format |
| `pnpm type-check` | Kiểm tra kiểu TypeScript |

## Cập nhật nội dung

Toàn bộ nội dung nằm trong một file: [`src/data/locations.ts`](src/data/locations.ts). Số địa điểm, thứ tự "01/05", tiến độ "X/N" và nội dung chứng nhận đều tự tính theo file này.

- **Sửa chữ:** đổi `name`, `label` (nhãn tiêu đề), `subtitle`, `facts` hoặc nội dung trong `sections` (A. Lịch sử, B. Đặc điểm và giá trị di sản, C. Giải pháp bảo tồn và phát huy).
- **Thêm ảnh thật:** đặt ảnh vào thư mục của địa điểm trong `public/images/` (mỗi địa điểm một thư mục, tên thư mục trùng `id`: `le-quy-don`, `bao-tang-chung-tich`, `dinh-doc-lap`, `cho-ben-thanh`, `lang-ong-ba-chieu`), rồi điền `images: [{ src: '/images/ten-anh.jpg', alt: 'Mô tả ảnh' }, …]`. Ảnh đầu tiên hiện ở carousel trang chủ; trang chi tiết hiện ảnh lớn kèm dải ảnh nhỏ để chọn; địa điểm chưa có ảnh sẽ hiện tranh minh họa.
- **Thêm địa điểm:** chép một phần tử trong mảng `LOCATIONS`, đổi `id`/`slug` (không dấu, duy nhất), và đặt vị trí ghim trên bản đồ bằng `map: { x, y, labelSide }` (khung 1000 × 700). Nếu chưa có ảnh, thêm tranh minh họa cho `id` mới trong [`landmark-art.tsx`](src/components/journey/landmark-art.tsx), không thì khung ảnh sẽ chỉ có nền.
- **Giải pháp chung, Kết luận, Thông điệp:** sửa trong `JOURNEY` ở cuối file.

Tên web, mô tả và ảnh chia sẻ nằm ở [`src/config/site.ts`](src/config/site.ts); biểu tượng và ảnh chia sẻ nằm trong `public/` (`favicon.svg`, `og-image.jpg`, `site.webmanifest`).

## Cấu trúc thư mục

```
src/
├── app/                    # Các trang (App Router): /, /ban-do, /dia-diem/[slug], /chung-nhan
├── components/
│   ├── journey/            # Bản đồ, carousel, tranh minh họa, chứng nhận (vẽ bằng canvas)
│   └── ui/                 # Nút, icon, thông báo (toast)
├── config/                 # Font, metadata, biến môi trường
├── data/locations.ts       # Nội dung các địa điểm
├── hooks/use-journey.tsx   # Tiến độ hành trình (localStorage)
└── lib/                    # Hằng số đường dẫn, tiện ích
.claude/skills/ui-ux-pro-max/  # Skill thiết kế UI/UX cho Claude Code (chỉ dùng trong project này)
```

## Thiết kế

Bảng màu: nền kem `#F5EBD7`, navy `#1F3A5F`, đỏ gạch `#B5432F`, vàng đồng `#C8963E` (khai báo trong `tailwind.config.ts`). Font: Playfair Display cho tiêu đề, Be Vietnam Pro cho nội dung, đều có đủ dấu tiếng Việt.

## Git conventions

- **pre-commit:** lint-staged runs `biome lint --write` and `biome format --write` on staged files.
- **commit-msg:** commitlint enforces [Conventional Commits](https://www.conventionalcommits.org/). Allowed types: `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `revert`, `perf`, `release`.

```bash
git commit -m "feat: add login page"
```

## CI

The GitHub Actions workflow in `.github/workflows/lint.yml` runs lint, type-check and a format check on pull requests to `main` and `dev`.

## Docker

```bash
cp .env.example .env
docker compose up --build
```

This builds the Next.js app (standalone output) and puts an Nginx reverse proxy in front of it at [http://localhost:8080](http://localhost:8080).

## Author

Made by Lưu Nguyễn Danh ([luund206@gmail.com](mailto:luund206@gmail.com))
