/** Khoá session: app đã "boot" (preloader chạy 1 lần) */
export const SESSION_KEY = "portfolio-booted";

/** Tự kiểm tra đã boot trong phiên này chưa */
export function isBooted(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/** Đánh dấu đã boot + báo cho các component (Header, SectionRail) hiện giao diện */
export function markBooted() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private mode — bỏ qua */
  }
  window.dispatchEvent(new Event("portfolio:booted"));
}