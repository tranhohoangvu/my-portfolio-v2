/** Dữ liệu cho section Console  lệnh CLI và endpoint REST mô phỏng */

export type ConsoleCommand = {
  /** chuỗi hiển thị trên chip lệnh nhanh */
  cmd: string;
  /** mô tả trong output */
  desc: string;
};

export const QUICK_COMMANDS: ConsoleCommand[] = [
  { cmd: "vu --help", desc: "Danh sách lệnh khả dụng" },
  { cmd: "vu --bio", desc: "Thông tin cá nhân & học vấn" },
  { cmd: "vu --skills", desc: "4 trụ cột kỹ năng" },
  { cmd: "vu --fetch-projects", desc: "Tải danh sách dự án" },
  { cmd: "vu --contact", desc: "Email, GitHub, LinkedIn" },
  { cmd: "vu --cv", desc: "3 bản CV theo định hướng" },
  { cmd: "Curl /api/v1/health", desc: "Trạng thái hệ thống" },
  { cmd: "clear", desc: "Xoá màn hình" },
];

export type ApiEndpoint = {
  method: "GET" | "POST";
  path: string;
  label: string;
};

export const API_ENDPOINTS: ApiEndpoint[] = [
  { method: "GET", path: "/api/v1/profile", label: "Thông tin cá nhân & học vấn" },
  { method: "GET", path: "/api/v1/skills", label: "Danh sách kỹ năng 4 trụ cột" },
  { method: "GET", path: "/api/v1/projects", label: "Toàn bộ dự án kỹ thuật" },
  { method: "GET", path: "/api/v1/projects?category=backend", label: "Lọc Backend" },
  { method: "GET", path: "/api/v1/projects?category=ai", label: "Lọc AI / Deep Learning" },
  { method: "GET", path: "/api/v1/health", label: "Trạng thái & uptime" },
  { method: "POST", path: "/api/v1/contact", label: "Mô phỏng gửi tin nhắn" },
];

/** Banner hiển thị khi mở terminal */
export const CONSOLE_BANNER = {
  version: "VU-CLI v2.4.0",
  host: "x86_64-pc-linux · Node.js v20.11 · REST Mock Server",
  sub: "Portfolio System Shell — Tran Ho Hoang Vu (CS @ TDTU)",
  user: "Guest@hoangvu",
  path: "~/portfolio",
};