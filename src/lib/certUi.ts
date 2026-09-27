/**
 * Lớp class dùng chung cho các nút trên thẻ chứng chỉ
 * ("Xem PDF" / "Xem credential" / "Yêu cầu bản gốc").
 *
 * Tách ra file riêng vì cả `Certificates.tsx` lẫn `Forms.tsx` đều cần —
 * đặt trong component sẽ tạo vòng import hai chiều.
 */
const BASE =
  "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-card border px-3 py-2.5 font-mono text-xs leading-5 transition-colors";

/** nút phụ (viền mảnh, hover lên cyan) */
export const CERT_BTN_MUTED = `${BASE} border-line text-dim hover:border-cyan hover:text-cyan`;

/** nút nhấn mạnh — dùng cho "Xem credential" */
export const CERT_BTN_ACCENT = `${BASE} border-lime/50 bg-lime/10 text-lime hover:border-lime hover:bg-lime/20`;
