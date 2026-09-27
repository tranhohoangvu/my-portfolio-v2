export type Job = {
  company: string;
  period: string;
  role: string;
  place: string;
  body: string;
  tags: string[];
};

/** Kinh nghiệm thực tế (trích từ CV) */
export const experience: Job[] = [
  {
    company: "TMA Solutions",
    period: "03/2026 - 06/2026",
    role: "Backend Developer Intern",
    place: "TP. Hồ Chí Minh · On-site",
    body: "Xây dựng các thành phần của hệ thống tự động hoá backend dùng OpenClaw để kết nối Discord với Jira, định nghĩa workflow cho nhập liệu, kiểm tra và chuẩn hoá dữ liệu. Tích hợp Jira REST API và JQL để truy vấn task mở/quá hạn, viết command parser biến tin nhắn Discord thành intent tạo task, chuyển trạng thái và tra cứu issue, chuẩn hoá định dạng request/response theo JSON và Atlassian Document Format (ADF).",
    tags: [
      "Node.js",
      "OpenClaw",
      "Jira REST API",
      "JQL",
      "Discord",
      "Atlassian ADF",
    ],
  },
];