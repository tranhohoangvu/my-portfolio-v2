import type { CertLogoId } from "@/data/certificates";

/**
 * Logo nhà cấp cho thẻ chứng chỉ.
 *
 * Vẽ tay bằng SVG nội tuyến (không nhúng ảnh `.svg` ngoài) để không phụ thuộc
 * đường dẫn `/public`, không nháy khi theme đổi và không tốn request mạng.
 * - Microsoft / Google: dùng màu thương hiệu gốc (4 ô / chữ G 4 màu).
 * - Còn lại: glyph một màu kế thừa `currentColor` nên hòa theo theme.
 */
export function CertLogo({
  id,
  className,
}: {
  id: CertLogoId;
  className?: string;
}) {
  const flat = {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className,
    "aria-hidden": true,
  } as const;

  switch (id) {
    /* 4 ô vuông Microsoft */
    case "microsoft":
      return (
        <svg {...flat} fill="none">
          <rect x="3" y="3" width="8.5" height="8.5" fill="#f25022" />
          <rect x="12.5" y="3" width="8.5" height="8.5" fill="#7fba00" />
          <rect x="3" y="12.5" width="8.5" height="8.5" fill="#00a4ef" />
          <rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#ffb900" />
        </svg>
      );

    /* chữ G của Google */
    case "google":
      return (
        <svg {...flat}>
          <path
            fill="#4285f4"
            d="M23.5 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.87z"
          />
          <path
            fill="#34a853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.01c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.71-4.96H1.29v3.09A12 12 0 0 0 12 24z"
          />
          <path
            fill="#fbbc05"
            d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28V6.63H1.29A12 12 0 0 0 0 12c0 1.94.47 3.77 1.29 5.37l4-3.09z"
          />
          <path
            fill="#ea4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.63l4 3.09C6.23 6.87 8.88 4.75 12 4.75z"
          />
        </svg>
      );

    /* chữ L + F của The Linux Foundation */
    case "linux":
      return (
        <svg {...flat}>
          <rect x="2.5" y="4.5" width="4.2" height="15" />
          <rect x="2.5" y="15.3" width="9.5" height="4.2" />
          <rect x="12.8" y="4.5" width="4.2" height="15" />
          <rect x="12.8" y="4.5" width="8.7" height="4" />
          <rect x="12.8" y="11" width="6.8" height="3.8" />
        </svg>
      );

    /* mạng nơ-ron: DeepLearning.AI */
    case "deeplearning":
      return (
        <svg {...flat}>
          <g stroke="currentColor" strokeWidth="1.4" opacity="0.55">
            <path d="M6.4 7.4 10.3 10.7M17.6 7.4 13.7 10.7" />
            <path d="M6.4 16.6 10.3 13.3M17.6 16.6 13.7 13.3" />
          </g>
          <circle cx="12" cy="12" r="2.7" />
          <circle cx="4.6" cy="5.6" r="2.1" />
          <circle cx="19.4" cy="5.6" r="2.1" />
          <circle cx="4.6" cy="18.4" r="2.1" />
          <circle cx="19.4" cy="18.4" r="2.1" />
        </svg>
      );

    /* mũ tốt nghiệp: Techbase */
    case "techbase":
      return (
        <svg {...flat}>
          <path d="M12 3.6 1.8 8.5 12 13.4l10.2-4.9z" />
          <path d="M6.2 10.8v4.4c0 1.7 2.6 3.1 5.8 3.1s5.8-1.4 5.8-3.1v-4.4L12 14z" />
          <rect x="20.4" y="9.1" width="1.5" height="6" rx="0.7" />
        </svg>
      );

    /* quả địa cầu: British Council */
    case "britishcouncil":
      return (
        <svg
          {...flat}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3.4 9.2h17.2M3.4 14.8h17.2" />
        </svg>
      );

    /* dự phòng: huy hiệu tròn */
    default:
      return (
        <svg {...flat} fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="9" r="5.4" />
          <path d="M8.5 13.6 7.4 21.2 12 18.6l4.6 2.6-1.1-7.6" />
        </svg>
      );
  }
}
