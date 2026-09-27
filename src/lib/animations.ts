import type { Variants } from "motion/react";

/** easing chung cho mọi chuyển động (giống bản gốc) */
export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

/** dòng kẻ ngang sau section header: scaleX 0 → 1 */
export const growLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/**
 * viewport config dùng chung — chạy 1 lần khi vào vùng nhìn.
 *
 * Dùng `margin` thay vì `amount`: `amount` tính theo TỈ LỆ phần tử nằm trong
 * viewport, nên với khối cao hơn viewport (danh sách 10 dự án ở #work cao tới
 * ~4700px khi màn 360px, viewport chỉ ~770px) tỉ lệ 0.25 là bất khả thi —
 * trình duyệt không bao giờ báo "đã vào vùng nhìn", phần tử kẹt ở `opacity: 0`
 * và người dùng thấy một khoảng trống.
 *
 * `margin` so sánh theo mép nên không phụ thuộc chiều cao phần tử. Âm = kích
 * hoạt sớm hơn (phần tử còn lệch trên viewport một chút đã bắt đầu chuyển),
 * dương = chỉ chạy khi đã lọt sâu vào giữa màn hình.
 */
export const inView = { once: true, margin: "0px 0px -15% 0px" } as const;
