/**
 * Bộ icon nội tuyến dùng chung.
 *
 * Project không cài thư viện icon, nên mỗi icon là 1 SVG nhỏ vẽ tay.
 * Tất cả dùng `currentColor` → tự đổi màu theo theme, và luôn `aria-hidden`
 * vì nhãn tiếng Anh/Việt đã nằm cạnh nó.
 */

type IconProps = { className?: string };

/** thuộc tính chung: nét 1.8px, bo tròn đầu/nối, ẩn khỏi trình đọc màn hình */
function line(className?: string) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  } as const;
}

/** tài liệu PDF (nút "Xem PDF") */
export function FileIcon({ className }: IconProps) {
  return (
    <svg {...line(className)}>
      <path d="M6.5 3h7l5 5v13h-12z" />
      <path d="M13.5 3v5h5" />
      <path d="M9.5 13h5M9.5 17h5" />
    </svg>
  );
}

/** mũi tên phải "→" */
export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...line(className)}>
      <path d="M4 12h15" />
      <path d="M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  );
}

/** mũi tên lên-phải "↗" (ra ngoài) */
export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg {...line(className)}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

/** dấu "#" cho mã chứng chỉ */
export function HashIcon({ className }: IconProps) {
  return (
    <svg {...line(className)}>
      <path d="M5 9h14M5 15h14" />
      <path d="M10.5 4 8 20M16 4l-2.5 16" />
    </svg>
  );
}

/** lịch cho ngày cấp */
export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...line(className)}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

/** huy hiệu trước tên nhà cấp */
export function AwardIcon({ className }: IconProps) {
  return (
    <svg {...line(className)}>
      <circle cx="12" cy="9" r="5.2" />
      <path d="M8.6 13.4 7.5 21l4.5-2.6 4.5 2.6-1.1-7.6" />
    </svg>
  );
}
