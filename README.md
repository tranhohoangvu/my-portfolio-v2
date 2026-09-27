# Portfolio — Next.js 16 (App Router) + Tailwind v4 + Motion

Trang portfolio 7 section, **10 theme** đổi tức thì (màu · font · bo góc · đổ bóng),
kèm preloader boot, marquee công nghệ, counter đếm số, terminal gõ từng ký tự, canvas hạt,
scroll progress, custom cursor, clock ICT trong footer — **và route chi tiết cho từng dự án**.

## Tính năng điều hướng nhanh

| Thứ | Cách dùng |
| --- | --- |
| **Đổi theme** | Bấm pill góc dưới-phải → popover liệt kê đủ 10 theme (bấm để áp dụng ngay) hoặc bấm card ở `#styles`. Phím **`T`** chuyển theme kế tiếp. |
| **Bảng lệnh** | Nhấn **`⌘K`** (Windows: `Ctrl+K`) hoặc bấm pill `⌘K bảng lệnh`. Gõ để lọc: tới section, mở dự án, đổi theme, sao chép email, tải CV, mở GitHub. `↑ ↓` di chuyển, `↵` chạy, `Esc` đóng. |
| **Thanh action bên trái** | Trên màn rộng (`≥1280px`) có rail dọc 6 section, mục đang xem được khoanh khung viền. Trên mobile dùng menu hamburger (cũng có vạch dẫn + khung viền như rail). |
| **Chi tiết dự án** | Bấm **xem chi tiết** hoặc tên dự án ở `#work` → mở route `/work/<slug>` (16 trang tĩnh, có metadata + JSON-LD `CreativeWork`). Nút `↗ Github` mở thẳng website thật. |
| **Hiệu ứng card** | Di chuột lên card → đèn spotlight chạy theo con trỏ + vệt sáng quét; card nổi lên 4px (`.fx-card` + `.fx-glow` + `.fx-sheen`).

## Chạy dự án

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build production (Turbopack)
npm run start   # chạy bản build
npm run lint    # eslint
```

## Đa ngôn ngữ (i18n)

| URL | Ngôn ngữ |
| --- | --- |
| `/vi`, `/vi/work/<slug>` | Tiếng Việt (**mặc định**) |
| `/en`, `/en/work/<slug>` | Tiếng Anh |

- `/` và `/work/<slug>` là **đường dẫn cũ** — `next.config.ts` chuyển hướng **308** sang bản tiếng Việt
  để mọi link đã chia sẻ, backlink và index cũ vẫn dẫn đúng nội dung.
- Toàn bộ chuỗi dịch nằm trong `src/lib/i18n.tsx`; nội dung dự án bản Anh nằm ở `src/data/content.en.ts`.
  `useContent()` chọn đúng nguồn dữ liệu theo `lang` hiện tại.
- Đổi ngôn ngữ: nút `VI/EN` ở header + thẻ chuyển ở footer. `<html lang>` cập nhật theo ngôn ngữ,
  `hreflang` (vi / en / x-default) khai báo trong `src/lib/seo.ts`.
- Kiểm tra nhanh: `npx next start -p 3210` rồi `node scripts/check-i18n.mjs`.

## Thay data cá nhân

**Toàn bộ nội dung nằm trong `src/data/` — không có chuỗi nào hardcode trong component.**

| File | Chứa gì |
| --- | --- |
| `src/data/profile.ts` | tên, vai trò, giới thiệu, counter, `about`, `profileJson`, học vấn, học bổng, nghiên cứu khoa học, liên hệ, **3 bản CV** (`cvs` + `cvHref`), dòng terminal, dòng preloader |
| `src/data/projects.ts` | dự án (`slug`, `type`, `summary`, `highlights`, `accent`…) + `workStats` + `marquee` (dải công nghệ) + helper `getProject`, `getProjectNeighbours` |
| `src/data/certificates.ts` | chứng chỉ (`pdf`, `issuer`, `certId`, `verifyUrl`, mức/ngày hết hạn) |
| `src/data/stack.ts` | 3 nhóm `frontend / backend / infra` kèm % tự đánh giá |
| `src/data/experience.ts` | timeline công việc |
| `src/data/console.ts` | nội dung console/terminal ở section console |
| `src/data/themes.ts` | 10 theme: id, tên, mô tả, 3 màu preview |
| `src/data/content.en.ts` | bản dịch tiếng Anh cho nội dung dài (mô tả dự án, về tôi…) |

> Thêm/xoá dự án: chỉ cần thêm/xoá phần tử trong mảng `projects`. `slug` là đường dẫn
> `/vi|/<en>/work/<slug>` (phải duy nhất, viết thường không dấu), `generateStaticParams` tự dựng
> trang tĩnh cho cả 2 ngôn ngữ, `workStats` và danh sách work tự động theo.

Ngoài ra cần sửa:

1. **Metadata / domain** — `src/lib/seo.ts`: hằng `SITE_URL`, `homeMetadata` (title, description,
   `keywords`, `authors`, `openGraph`, `twitter`, `alternates`) và `personJsonLd` (schema.org `Person`).
   Trang `/[lang]/work/[slug]` có `projectMetadata` riêng (title, description, canonical, OG article)
   và `projectJsonLd` (`CreativeWork`).
2. **File tĩnh** — 3 bản CV trong `public/TranHoHoangVu_*.pdf` (đổi tên file cho dễ, cập nhật
   `profile.cvs[].file` và bảng `PREVIEW` trong `src/components/sections/Cv.tsx`), ảnh xem trước
   `public/cv-*-preview.webp`, PDF chứng chỉ trong `public/certificates/`, và `public/images/portrait.webp`
   (ảnh OG card) — cập nhật `profile.cvHref` và `openGraph.images`.
3. **Link mạng xã hội / điện thoại** — trong `profile.contact`/`profile.github`/`profile.phone`.

## Theme

- Token màu + token layout của từng theme nằm ở cuối `src/app/globals.css`, dạng
  `[data-theme="<id>"] { --color-…; --radius-card: …; --panel-shadow: …; }`.
- Theme đang dùng gắn vào `<html data-theme="…">`; script anti-FOUC trong `layout.tsx` đọc
  `localStorage["portfolio-theme"]` **trước lần paint đầu** nên không nháy màu khi refresh.
- Đổi theme: bấm pill góc phải → popover 10 theme, bấm card ở section `#styles`, gõ `cyberpunk`
  trong bảng lệnh `⌘K`, hoặc nhấn phím **`T`**.
- **Thêm theme mới**: thêm 1 object vào `themes.ts` + thêm block `[data-theme="…"]` trong
  `globals.css` (copy từ theme gần nhất rồi đổi token). `themeIds` tự suy ra danh sách,
  popover theme và bảng lệnh tự có thêm mục.

## Cấu trúc thư mục

```
src/
├─ app/
│  ├─ [lang]/
│  │  ├─ layout.tsx        # font, metadata, JSON-LD, script anti-FOUC, provider i18n
│  │  ├─ page.tsx          # lắp các section
│  │  ├─ not-found.tsx     # 404 có theme, đọc lang từ provider
│  │  └─ work/[slug]/      # trang chi tiết dự án (SSG) + metadata + JSON-LD
│  └─ globals.css          # token, 10 theme, class dùng chung, keyframes
├─ components/
│  ├─ sections/            # Hero, About, Stack, Work, Experience, Styles, Contact, Certificates, Cv, GitHub, Console
│  ├─ work/ProjectDetail.tsx  # nội dung trang /[lang]/work/[slug]
│  ├─ layout/RootShell.tsx    # <html>/<body> + script anti-FOUC + provider
│  ├─ Preloader.tsx  Header.tsx  Footer.tsx  ScrollProgress.tsx
│  ├─ CustomCursor.tsx  SectionRail.tsx  SectionHeader.tsx  Marquee.tsx
│  ├─ ActionDock.tsx    # dock góc phải: pill theme + pill ⌘K + toast
│  ├─ ThemePanel.tsx    # popover chọn 10 theme
│  ├─ ThemeProvider.tsx # context theme
│  ├─ ProjectPreview.tsx# khung trình duyệt mô phỏng dự án
│  ├─ CertLogos.tsx     # logo chứng chỉ (inline SVG tự vẽ)
│  ├─ Forms.tsx         # form liên hệ
│  ├─ HomeContent.tsx   LangText.tsx  SectionLinkScroll.tsx  icons.tsx
│  └─ Counter.tsx  TerminalCard.tsx  HeroCanvas.tsx
├─ data/                  # toàn bộ nội dung (xem bảng ở trên)
└─ lib/
   ├─ i18n.tsx           # context lang + toàn bộ chuỗi dịch vi/en
   ├─ useContent.ts      # chọn nội dung theo lang
   ├─ seo.ts             # SITE_URL + metadata + JSON-LD
   ├─ fonts.ts           # next/font/google
   ├─ themeStore.ts      # store theme (useSyncExternalStore)
   ├─ useTheme.ts        # context + hook
   ├─ nav.ts             # section dùng chung + helper locale path
   ├─ cardFx.ts          # hook đèn spotlight đuổi chuột cho card
   ├─ certUi.ts          # helper hiển thị chứng chỉ
   ├─ boot.ts / useBooted.ts   # cờ "đã boot" dùng chung (preloader ↔ header/rail)
   ├─ useActiveSection.ts      # section đang xem (IntersectionObserver)
   └─ animations.ts      # variants dùng chung
scripts/check-i18n.mjs   # smoke test route /vi|/en
```

## Ghi chú kỹ thuật

- **Theme store** dùng `useSyncExternalStore`: server luôn render `cyberpunk` (khớp HTML tĩnh),
  client nâng lên theme đã lưu sau khi hydrate → không có hydration mismatch.
- **`<html>` và `<body>`** đều có `suppressHydrationWarning` vì script anti-FOUC và các tiện ích
  trình duyệt (extension) ghi attribute trực tiếp lên 2 node này.
- **`prefers-reduced-motion`** được tôn trọng ở cả CSS (tắt animation) và JS
  (preloader, counter, terminal, canvas hạt).
- Canvas hạt tự dừng khi tab bị ẩn và tự tắt trên màn hình nhỏ + `prefers-reduced-motion`.
- Custom cursor chỉ bật khi `(hover: hover) and (pointer: fine)` → không hiện trên touch.
- **`ActionDock`** cố tình không dùng `transform` ở node gốc, vì `transform`/`backdrop-filter`
  sẽ biến node đó thành containing block và làm lệch vị trí lớp `fixed` (bảng lệnh) bên trong.
  Hiệu ứng hover chỉ nằm ở các pill con.
- **Bảng lệnh** render qua `createPortal` sang `document.body` (chỉ sau khi `mounted`) để không
  bị giới hạn stacking context của dock, và khoá scroll nền khi mở.
- **Trang `/[lang]/work/[slug]`** dùng `<Header instant />`: không có preloader nên header hiện ngay và
  đánh dấu `portfolio-booted` để quay lại trang chủ không phải xem lại preloader.
- **`.fx-glow`** đặt `z-index: -1` + `isolation: isolate` trên `.fx-card` → đèn sáng nằm trên nền
  panel nhưng **dưới chữ**, không làm giảm độ tương phản.

## Deploy lên Vercel

1. Đẩy code lên GitHub:
   ```bash
   git add -A
   git commit -m "portfolio v2"
   git push -u origin main
   ```
2. Vào <https://vercel.com/new> → **Add New… → Project** → chọn repo vừa push.
3. Vercel tự nhận framework **Next.js**; để trống Build Command / Output Directory.
4. Bấm **Deploy**. Xong ở URL dạng `<repo>-<tên>.vercel.app`.
5. Trong **Project → Settings → Domains** gắn domain riêng, rồi sửa hằng `SITE_URL` trong
   `src/lib/seo.ts` cho khớp domain mới (để canonical + OG + `hreflang` đúng).

Không cần biến môi trường nào cho bản này.

## Kế hoạch chi tiết

Xem [`PLAN.md`](./PLAN.md) — phân tích bản gốc, design token, từng phase và tiêu chí nghiệm thu.