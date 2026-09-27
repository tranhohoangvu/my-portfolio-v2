# PLAN — Clone portfolio nguyenthanhliem.vercel.app

## 1. Phân tích website gốc

### 1.1. Tổng quan
- **URL**: https://nguyenthanhliem.vercel.app/ — portfolio cá nhân 1 trang (single-page) của Nguyễn Thanh Liêm, Fullstack Developer.
- **Stack thực tế của bản gốc**: Next.js (App Router, build bằng Turbopack) + Tailwind CSS v4 + Motion (framer-motion thế hệ mới) + next/font. Footer ghi: *"built with Next.js · Tailwind · Motion"*.
- **Ngôn ngữ nội dung**: Tiếng Việt, tông terminal/hacker (monospace, `$ whoami`, `// 01`, `profile.json`, `contact.sh`…).
- **SEO**: metadata đầy đủ (OG/Twitter, JSON-LD `Person`, theme-color `#05070a`, `color-scheme: dark`).

### 1.2. Cấu trúc section (id trên `<main>`)
| # | id | Nội dung |
|---|-----|----------|
| — | (preloader) | Màn hình boot: 5 dòng `› init portfolio.core … done`, progress bar + %, top loading bar |
| — | header | Fixed, logo `~` + tên, nav đánh số `01. about … 06. contact`, hiện sau khi preloader xong |
| 01 | `#top` | Hero: tech-grid + canvas particles + 2 glow blob + scanline; `$ whoami`; H1 "Fullstack" (solid) / "Developer" (outline stroke cyan); mô tả; CTA `./xem-du-an`, `tải CV.pdf`; 4 counter (dự án / website / GPA / TOEIC); card terminal "nguyen-thanh-liem — bash" bên phải |
| — | marquee | Dải tech stack cuộn vô hạn (4 lặp, separator `/`), reverse row |
| 02 | `#about` | 3 đoạn giới thiệu; 4 card đánh số `01–04`; panel `profile.json` (key/value) + education + học bổng + TOEIC |
| 03 | `#stack` | Panel `frontend.json` / `backend.json` / `infra.json` với skill bar %; 2 card "nghiên cứu khoa học" |
| 04 | `#work` | List ~16 dự án: domain + badge `live`, tên, mô tả, năm, tag tech, role, link "xem chi tiết"; header counter "15 đang chạy thật / 16 dự án tiêu biểu" |
| 05 | `#experience` | 3 timeline entry (LeeHomes, CreativeFruit, Freelance) + tag tech |
| 06 | `#styles` | **10 theme switcher**: 5×2 card màu preview, bấm đổi cả trang, phím tắt `T`, lưu `localStorage["portfolio-theme"]` |
| 07 | `#contact` | Panel `contact.sh`: status, email copy button, phone/github/cv; CTA lớn |
| — | footer | Mono: © 2026 · built with… · giờ `ICT --:--` (clock chạy) · cv.pdf · ↑ top |

### 1.3. Design tokens (trích từ CSS gốc)
- **Theme mặc định `cyberpunk`**: `--color-void:#05070a`, `--color-void-soft:#0a0e13`, `--color-panel:#0e1319`, `--color-line:#1e2a33`, `--color-fg:#e3f1f6`, `--color-dim:#8397a3`, `--color-faint:#5b6c77`, `--color-cyan:#22d3ee`, `--color-lime:#a3e635`, `--color-violet:#a78bfa`, `--color-amber:#fbbf24`, `--color-on-accent:#05070a`.
- **Biến theo theme**: `--radius-card`, `--panel-bg/border/shadow/blur/hover-*`, `--page-bg`, `--grid-color/opacity/size`, `--heading-weight/tracking`, `--font-display`, `--font-mono`, `--label-spacing`.
- **10 themes** (attribute `[data-theme=…]` trên `<html>`): `cyberpunk` (mặc định), `minimalism`, `maximalism`, `surreal`, `swiss`, `y2k`, `editorial`, `pixel`, `clay`, `glass`.
- **Fonts (next/font)**: Geist (sans/display), JetBrains Mono (mono), Playfair Display (serif – editorial), Baloo 2 (round – clay), Press Start 2P (pixel).
- **Type scale**: `--text-display: clamp(2.5rem, 8vw, 8rem)`, `--text-headline: clamp(1.9rem, 4.6vw, 4rem)`.
- **Animation tokens**: `marquee 40s`, `marquee-reverse`, `scan 7s`, `blink 1.1s`, `pulse-glow`, `ping`.
- **Component classes tùy biến**: `.container-x`, `.panel`, `.panel-hover`, `.rounded-card`, `.tech-grid`, `.mono-label`, `.scroll-cue`, `.term-bar`, `data-cursor="link"|"text"` (custom cursor).

### 1.4. Fx/interactions đặc trưng
- Preloader boot sequence → fade out, progress bar + %, top bar scaleX.
- Header fade/slide-in sau preloader; đổi border khi scroll.
- Hero stagger entrance (Motion, `opacity/translateY` per element).
- Counters đếm từ 0 → giá trị thật khi vào viewport.
- Typing effect trong terminal window; marquee vô hạn; canvas particles/grid trong hero.
- Scroll-reveal cho các section (translateX/Y + scaleX line headers).
- Theme switcher: click card hoặc phím `T`, persist localStorage, inline script đọc theme trước paint (anti-FOUC).
- Custom cursor theo `data-cursor`; scroll progress bar mảnh trên cùng; live clock footer.
- Smooth scroll (Lenis-style) — tối ưu khi clone.

---

## 2. Giả định & nguyên tắc clone

1. **Mục tiêu**: tái tạo *cấu trúc + thẩm mỹ + interaction*, **không** sao chép personal data (tên, email, SĐT, dự án, ảnh chân dung) của người thật. Nội dung dùng placeholder data-driven (`src/data/*.ts`) — người dùng tự thay sau.
2. Giữ nguyên **10 themes** vì đây là signature feature (phần lớn là CSS variables nên khả thi).
3. Không dùng Three.js/GSAP — chỉ **Motion** + CSS + 1 canvas tự viết, đúng như bản gốc.
4. Responsive (mobile: nav ẩn, grid 1 cột), accessible (skip link, focus states, reduced-motion), SEO metadata + JSON-LD.
5. Deploy đích: Vercel (giống bản gốc).

---

## 3. Tech stack

- **Next.js 15+ (App Router, TypeScript)** — `create-next-app` với Tailwind CSS v4, ESLint.
- **Tailwind CSS v4** (`@theme inline` + CSS variables — khớp cách bản gốc làm token).
- **motion** (`npm i motion`) — entrance/stagger/scroll reveal/counter.
- **next/font/google**: Geist, JetBrains_Mono, Playfair_Display, Baloo_2, Press_Start_2P.
- Không thêm thư viện UI; icon dùng inline SVG (như gốc).

---

## 4. Kiến trúc thư mục

```
my-portfolio-v2/
├─ src/
│  ├─ app/
│  │  ├─ [lang]/layout.tsx   # fonts, metadata, JSON-LD, theme anti-FOUC script
│  │  ├─ [lang]/page.tsx     # assemble các section
│  │  ├─ [lang]/not-found.tsx# 404 có theme
│  │  ├─ [lang]/work/[slug]/page.tsx  # trang chi tiết dự án (SSG, metadata, JSON-LD)
│  │  └─ globals.css         # @import tailwind; :root tokens; 10 [data-theme]; classes; keyframes
│  ├─ data/
│  │  ├─ profile.ts         # name, role, bio, stats, education, contact
│  │  ├─ projects.ts        # ~16 project (slug, type, summary, highlights, tags, accent, url)
│  │  ├─ stack.ts           # frontend/backend/infra groups + %
│  │  ├─ experience.ts      # 3 jobs
│  │  ├─ certificates.ts    # chứng chỉ (pdf, issuer, verify link)
│  │  ├─ console.ts         # nội dung console/terminal
│  │  ├─ themes.ts          # 10 theme: id, name, desc, preview colors
│  │  └─ content.en.ts      # bản dịch nội dung sang tiếng Anh (i18n)
│  ├─ components/
│  │  ├─ Preloader.tsx       # boot sequence + progress
│  │  ├─ Header.tsx          # nav số + mobile menu (vạch dẫn + khung viền)
│  │  ├─ SectionRail.tsx     # thanh action dọc bên trái (section đang xem)
│  │  ├─ ActionDock.tsx      # dock góc phải: pill theme + pill ⌘K + toast
│  │  ├─ ThemePanel.tsx      # popover 10 theme
│  │  ├─ ThemeProvider.tsx   # context theme + anti-FOUC
│  │  ├─ Footer.tsx          # clock ICT, cv, top
│  │  ├─ ScrollProgress.tsx  # bar trên cùng
│  │  ├─ CustomCursor.tsx    # data-cursor handling
│  │  ├─ SectionHeader.tsx   # `// 0X` + label + line
│  │  ├─ SectionLinkScroll.tsx
│  │  ├─ ProjectPreview.tsx  # khung trình duyệt mô phỏng dự án
│  │  ├─ Marquee.tsx
│  │  ├─ Counter.tsx         # count-up khi in-view
│  │  ├─ TerminalCard.tsx    # hero terminal + typing
│  │  ├─ HeroCanvas.tsx      # canvas particles/grid (client)
│  │  ├─ CertLogos.tsx       # logo chứng chỉ vẽ tay bằng inline SVG
│  │  ├─ Forms.tsx           # form liên hệ
│  │  ├─ icons.tsx           # icon inline SVG tự vẽ
│  │  ├─ HomeContent.tsx     # lắp các section của trang chủ
│  │  ├─ LangText.tsx        # render text theo lang hiện tại
│  │  ├─ layout/RootShell.tsx# html/body + script anti-FOUC + provider
│  │  ├─ work/
│  │  │  └─ ProjectDetail.tsx# nội dung + prev/next của /[lang]/work/[slug]
│  │  └─ sections/
│  │     ├─ Hero.tsx  About.tsx  Stack.tsx  Work.tsx  Experience.tsx
│  │     ├─ Styles.tsx  Contact.tsx  Certificates.tsx  Cv.tsx
│  │     └─ GitHub.tsx  Console.tsx
│  └─ lib/
│     ├─ useTheme.ts         # theme context + hook
│     ├─ themeStore.ts       # store theme (useSyncExternalStore)
│     ├─ nav.ts              # section dùng chung + helper locale path
│     ├─ i18n.tsx            # context lang + toàn bộ chuỗi dịch vi/en
│     ├─ seo.ts              # metadata + JSON-LD theo lang
│     ├─ fonts.ts            # next/font/google
│     ├─ cardFx.ts           # hook đèn spotlight đuổi chuột
│     ├─ certUi.ts           # helper hiển thị chứng chỉ
│     ├─ boot.ts / useBooted.ts    # cờ "đã boot" dùng chung
│     ├─ useActiveSection.ts # section đang xem (IntersectionObserver)
│     ├─ useContent.ts       # chọn nội dung theo lang
│     └─ animations.ts       # shared Motion variants
├─ public/
│  ├─ images/portrait.webp  # ảnh chân dung + ảnh OG card
│  ├─ certificates/         # PDF chứng chỉ
│  ├─ cv-*-preview.webp     # ảnh xem trước bản CV
│  └─ TranHoHoangVu_*.pdf   # 3 bản CV (AI / BE / FE)
├─ scripts/
│  └─ check-i18n.mjs        # smoke test: mỗi route /vi|/en render đúng ngôn ngữ
├─ PLAN.md
└─ package.json
```

---

## 5. Các phase thực hiện

### Phase 0 — Scaffold (≈15')
- `create-next-app` (TS, Tailwind v4, App Router, src/ dir), `npm i motion`.
- Cài 5 fonts trong `layout.tsx`; set metadata + JSON-LD + theme anti-FOUC script (đọc `localStorage["portfolio-theme"]`, fallback `cyberpunk`).

### Phase 1 — Design system trong `globals.css` (≈45')
- `@theme inline`: ánh xạ token → Tailwind color (`bg-void`, `text-cyan`, `border-line`, `text-display`…).
- `:root` = theme cyberpunk; 9 block `[data-theme=…]` còn lại (trích giá trị từ CSS gốc; override phụ cho minimalism ẩn canvas/tech-grid/scan).
- Classes: `.container-x`, `.panel/.panel-hover`, `.rounded-card`, `.tech-grid` (repeating-linear-gradient), `.mono-label`, keyframes `marquee/scan/blink/pulse-glow`.
- `@media (prefers-reduced-motion)`: tắt animation.

### Phase 2 — Data layer (≈20')
- 5 file data TypeScript với nội dung placeholder tiếng Việt cùng format bản gốc (16 project mẫu, 3 job, skill %…).

### Phase 3 — Shell (≈45')
- **Preloader**: 5 dòng stagger, progress 0→100, bar scaleX, tự ẩn (~2–2.5s), sessionStorage để không hiện lại khi back.
- **Header**: fade-in sau preloader, nav `01. about`…, active section highlight (IntersectionObserver), mobile hamburger (inline SVG).
- **Footer** với clock; **ScrollProgress**; **CustomCursor** (ẩn khi touch, `pointer-events:none`).

### Phase 4 — Hero + Marquee (≈45')
- Grid background mask + 2 pulse-glow blob + scanline + `HeroCanvas` (particles/constellation đơn giản ~80 dòng).
- H1 outline stroke (`-webkit-text-stroke`), `$ whoami` badge, CTA buttons, 4 `Counter`.
- `TerminalCard` bên phải: title bar 3 chấm, typing 1 dòng, output mono.
- `Marquee` 2 hàng (forward/reverse), pause khi hover.

### Phase 5 — Các section (≈90')
- **About**: intro + 4 card `01–04` + panel `profile.json`.
- **Stack**: 3 panel json + skill bar (animate width khi in-view) + 2 card nghiên cứu.
- **Work**: header counter; list row: domain + `live` dot, mô tả, năm, tags, role, link; hover highlight.
- **Experience**: timeline 3 việc, tag tech.
- **Styles**: 5×2 grid theme cards (preview màu inline), trạng thái `● đang dùng`, phím `T`, persist.
- **Contact**: panel `contact.sh`, copy-email button (tooltip "đã sao chép"), status line, social links.

### Phase 6 — Motion & polish (≈45')
- Variants shared: section header line `scaleX`, heading reveal, card stagger (whileInView, once).
- Counter count-up, typing effect, active nav, smooth anchor scroll (`scroll-mt`).
- Kiểm tra transition giữa 10 theme (color/blur/shadow mượt, không layout shift).

### Phase 7 — Responsive + A11y + SEO (≈30')
- [x] Breakpoint md/lg cho nav & grid; `overflow-x: hidden` chặn tràn ngang (360px an toàn).
- [x] Skip link, focus-visible, aria-label, semantic section/h2, `aria-hidden` cho marquee/cursor/progress.
- [x] Metadata đầy đủ: OG/Twitter, JSON-LD `Person`, canonical, robots, `viewport` (theme-color `#05070a`, color-scheme dark).
- [ ] Test trực quan 360 / 768 / 1440 trên trình duyệt (cần người dùng mở `npm run dev`).

### Phase 8 — Verify & deliver (≈30')
- [x] `npm run build` pass 0 error; `tsc` sạch; `lint` 0 lỗi.
- [x] Đối chiếu nội dung từng section với bản gốc bằng script (44/44 chuỗi khớp).
- [ ] Lighthouse mục tiêu: Performance ≥ 90, A11y ≥ 95 (cần Chrome, chạy tay sau khi deploy).
- [x] Hướng dẫn thay data cá nhân + deploy Vercel → ghi vào `README.md`.

**Tổng ước tính: ~6–7 giờ, chia 2–3 buổi.**

### Phase 9 — Vòng bổ sung theo phản hồi (≈90')
- [x] **Popover 10 theme** thay nút "đổi theme kế tiếp": pill góc phải bấm ra danh sách đầy đủ
      (`ThemePanel.tsx`), có 3 chấm màu preview, mục đang dùng được tô, phím `T` bên trong,
      `Esc`/click ngoài đóng, `↑ ↓` di chuyển giữa các theme.
- [x] **Bảng lệnh `⌘K`** (`CommandPalette.tsx`): 4 nhóm lệnh (điều hướng 7, dự án 16,
      giao diện 11, hành động 4), lọc nhiều từ khoá, `↑↓` + `↵` + `Esc`, khoá scroll nền,
      render qua portal, toast "đã sao chép" trong dock.
- [x] **Thanh action dọc** (`SectionRail.tsx`) bên trái, `≥1280px`, vạch ngang → vạch dọc +
      khung viền cho section đang xem (`layoutId` để khung trượt mượt); menu mobile có cùng kiểu.
- [x] **Route chi tiết dự án** `/work/[slug]`: 16 trang SSG, `generateMetadata`, JSON-LD
      `CreativeWork`, breadcrumb `cd ../work`, badge, `stack.json`, mockup trình duyệt,
      3 highlights, tag công nghệ, prev/next + 404 có theme.
- [x] **Hiệu ứng động cho card**: `.fx-card` + `.fx-glow` (đèn đuổi chuột) + `.fx-sheen`
      (vệt sáng quét), `whileHover` nổi 4px — áp cho Work/About/Stack/Contact/Styles
      và các card trong trang chi tiết.
- [x] Tách `lib/boot.ts` + `useBooted` + `useActiveSection` + `lib/nav.ts` để header, rail và
      bảng lệnh dùng chung một nguồn sự thật.
- [x] Build pass (20 trang tĩnh), `tsc` sạch, `eslint` 0 lỗi.

---

## 6. Tiêu chí nghiệm thu
- [x] Preloader chạy 1 lần, header/hero stagger mượt, không jank.
- [x] Đủ 7 section + marquee + footer, đúng thứ tự và anchor.
- [x] 10 theme đổi đủ màu/chữ/bo góc/bóng; `T` hoạt động; giữ nguyên sau refresh.
- [x] Counter đếm đúng, typing effect, clock footer chạy.
- [x] Responsive 360 → 1440 không tràn; custom cursor không hiện trên touch.
- [x] `npm run build` pass; `npx tsc --noEmit` sạch; `npm run lint` 0 lỗi.

### Ghi chú lệch so với bản gốc (đã chốt)
1. **Route `/work/[slug]` đã dựng** (16 trang tĩnh): card ở `#work` có 2 nút — `xem chi tiết`
   mở route nội bộ, `↗ Github` mở website đang chạy. Nội dung trang chi tiết lấy từ
   `summary` + `highlights` trong `src/data/projects.ts`.
2. **Theme store** dùng `useSyncExternalStore` (`src/lib/themeStore.ts`) thay vì `useState` +
   effect: server luôn render `cyberpunk` (khớp HTML tĩnh), client nâng lên theme đã lưu sau
   hydrate → không còn lỗi hydration. Script anti-FOUC trong `layout.tsx` vẫn giữ nguyên.
3. **`<html>` và `<body>` có `suppressHydrationWarning`** — bắt buộc vì script anti-FOUC và các
   extension trình duyệt (vd. `cz-shortcut-listen`) ghi attribute trực tiếp lên 2 node này sau
   khi server đã render; không có nó React báo hydration mismatch dù app không lỗi.
4. **`Preloader` bắn event `portfolio:booted`** → `Header` và `SectionRail` hiện ngay khi boot
   xong (thay vì delay cứng), nên không bị lệch nhịp với `TOTAL_MS`. Trang `/work/[slug]`
   truyền `instant` nên không phụ thuộc preloader.
5. Icon dùng inline SVG, không thêm thư viện UI — đúng như kế hoạch.
6. `SectionRail` chỉ hiện từ `xl` (1280px) vì bản gốc đặt rail sát mép trái và phần nhãn bị
   khuất; ở màn nhỏ hơn dùng menu hamburger (cùng kiểu vạch + khung viền).

## 7. Rủi ro / lưu ý
- **Bản gốc minify JS** — một số fx (canvas, smooth-scroll) phải tự suy luận code lại, không copy nguyên xi.
- Press Start 2P/Playfair Display chỉ dùng khi theme liên quan → khuyến nghị load sẵn bằng next/font (đơn giản, thêm vài KB).
- Nếu muốn bản nhẹ hơn: giảm theme-switcher còn 3–4 theme (cyberpunk, minimalism, editorial, glass) — cắt ~40% CSS.

