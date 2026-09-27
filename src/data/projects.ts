export type Project = {
  /** slug dùng cho route /work/[slug] */
  slug: string;
  domain: string;
  live: boolean;
  badge?: string;
  name: string;
  /** mô tả ngắn hiện trên card ở section #work */
  desc: string;
  /** đoạn giới thiệu dài hơn cho trang /work/[slug] */
  summary: string;
  /** 3 gạch đầu dòng "đã giải quyết" */
  highlights: string[];
  /** phân loại dự án: "Full-Stack", "AI / Deep Learning" */
  type: string;
  year: string;
  tags: string[];
  role: string;
  /** màu nhấn cho mockup trang chi tiết */
  accent: string;
  url?: string;
};

export const workStats = { live: 10, total: 10 };

export const marquee: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express.js",
  "Laravel",
  "Python",
  "PyTorch",
  "TensorFlow",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Docker",
  "REST API",
];

export const projects: Project[] = [
  {
    slug: "schoolops",
    domain: "github.com/tranhohoangvu/school-ops",
    live: false,
    badge: "Mới nhất",
    name: "SchoolOps",
    desc: "Nền tảng quản lý vận hành trường THCS enterprise-grade Monorepo Next.js 16 & Express: ma trận RBAC động theo từng lớp, sơ đồ chỗ ngồi thông minh Fisher-Yates, thời khóa biểu 2 ca chống xung đột giáo viên và 110 unit tests.",
    summary: "SchoolOps là nền tảng quản lý vận hành trường học cấp doanh nghiệp dành cho trường THCS (mô hình chuẩn THCS Nguyễn Tất Thành 2026–2027) với kiến trúc Monorepo Next.js 16 (Frontend) + Express/TypeScript (Backend). Quản lý 16 lớp học, 480 học sinh, 24 giáo viên với phân quyền RBAC động theo lớp, sơ đồ 20 bàn/40 chỗ ngồi tương tác dual-perspective, điểm danh thời gian thực và tự động phát hiện xung đột lịch dạy.",
    highlights: [
      "Ma trận Dynamic Per-Class RBAC — Phân quyền động theo ngữ cảnh từng lớp",
      "Thời khóa biểu 2 ca & Phát hiện xung đột giáo viên school-wide",
      "Sơ đồ chỗ ngồi 20 bàn/40 chỗ — Dual-perspective & Live Attendance Overlay",
    ],
    type: "Full-Stack",
    year: "2026",
    tags: ["Next.js 16", "React 19", "TypeScript", "TailwindCSS v4", "Node.js", "Express.js", "PostgreSQL 16", "Native pg (No ORM)", "JWT RBAC", "Vitest"],
    role: "Full-Stack Developer",
    accent: "#22d3ee",
    url: "https://github.com/tranhohoangvu/school-ops",
  },
  {
    slug: "bookingcare",
    domain: "github.com/tranhohoangvu/booking-care",
    live: false,
    badge: "Mới nhất",
    name: "BookingCare",
    desc: "Nền tảng đặt lịch khám bệnh trực tuyến full-stack Next.js 15 & Supabase: phân quyền RBAC 3 cấp, chống đặt trùng lịch bằng atomic PostgreSQL update, Bulk Schedule Generator và mã QR check-in.",
    summary: "BookingCare là nền tảng y tế số hóa đặt lịch khám bệnh trực tuyến hiện đại kết nối bệnh nhân, bác sĩ chuyên khoa và ban quản trị. Hệ thống triển khai kiến trúc Server Components & Actions trong Next.js 15, phân quyền RBAC 3 vai trò (Patient, Doctor, Admin), tích hợp thuật toán sinh lịch khám hàng loạt (Bulk Schedule Generator), bộ giả lập Offline Mock Engine và xuất biên nhận điện tử kèm mã QR check-in.",
    highlights: [
      "Chống đặt trùng lịch đồng thời (Anti-Race Condition Concurrency Booking)",
      "Quản lý lịch khám quy mô lớn với Bulk Schedule Generator",
      "Phân quyền đa cấp bảo mật sâu kết hợp SSR Session & RLS",
    ],
    type: "Full-Stack",
    year: "2026",
    tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "PostgreSQL", "Row Level Security (RLS)", "Database Triggers", "Atomic Updates", "RBAC"],
    role: "Full-Stack Developer",
    accent: "#22d3ee",
    url: "https://github.com/tranhohoangvu/booking-care",
  },
  {
    slug: "pdf-vision-ocr",
    domain: "github.com/tranhohoangvu/pdf-vision-ocr",
    live: false,
    badge: "Mới nhất",
    name: "PDF Vision OCR",
    desc: "Hệ thống trích xuất và nhận diện ký tự quang học (OCR) thông minh cho PDF tiếng Việt: tiền xử lý OpenCV (Deskew, khử bóng, CLAHE), hybrid Gemini Vision AI fallback, xuất Word/Excel/PDF/Markdown và giao diện kép Streamlit + FastAPI.",
    summary: "PDF Vision OCR là ứng dụng nhận diện ký tự quang học thông minh chuyên xử lý tài liệu PDF tiếng Việt (PDF scan, chụp nghiêng từ điện thoại và tài liệu số hóa). Hệ thống bảo toàn 100% tiếng Việt có dấu và cấu trúc bảng biểu, xuất đa định dạng (DOCX, XLSX, Searchable PDF, Markdown, Master ZIP) cùng hai giao diện song hành: Streamlit Web UI và FastAPI RESTful API.",
    highlights: [
      "Bảo toàn toàn vẹn dấu tiếng Việt và cấu trúc bảng biểu phức tạp",
      "Nhận diện chữ viết tay mờ và tài liệu scan chất lượng kém",
      "Kiến trúc Dual-Interface & Container hóa Docker đa chế độ",
    ],
    type: "AI / Deep Learning",
    year: "2026",
    tags: ["Python", "PaddleOCR", "Gemini Vision AI", "PyMuPDF", "OpenCV", "FastAPI", "Streamlit", "Docker", "Document Processing"],
    role: "AI Engineer",
    accent: "#f472b6",
    url: "https://github.com/tranhohoangvu/pdf-vision-ocr",
  },
  {
    slug: "coursehub",
    domain: "github.com/tranhohoangvu/coursehub-lms",
    live: false,
    name: "CourseHub LMS",
    desc: "Hệ thống Quản lý Học tập (LMS) full-stack: giao diện Udemy split-screen, phân quyền RBAC, tối ưu Raw SQL PostgreSQL (không dùng ORM), giỏ hàng lưu DB và bảng phân tích doanh thu.",
    summary: "CourseHub là hệ thống LMS full-stack thiết kế theo kiến trúc module hóa phục vụ vị trí Backend Developer. Hệ thống triển khai giao diện phòng học chuẩn phong cách Udemy (split-screen: giáo trình thu gọn bên phải, phát video YouTube bài giảng bên trái), đồng bộ URL query params để điều hướng mượt mà, giỏ hàng lưu database và bảng điều khiển phân tích doanh thu chi tiết.",
    highlights: [
      "Quản lý trạng thái học tập Udemy & Đồng bộ URL Navigation",
      "Tối ưu hóa truy vấn Raw SQL thay vì dùng ORM",
      "Phân quyền RBAC đa cấp & Ngăn ngừa leo thang đặc quyền",
    ],
    type: "Full-Stack",
    year: "2026",
    tags: ["React 18", "Vite", "Node.js", "Express.js", "PostgreSQL", "Native pg (No ORM)", "JWT RBAC", "RESTful API"],
    role: "Full-Stack Developer",
    accent: "#22d3ee",
    url: "https://github.com/tranhohoangvu/coursehub-lms",
  },
  {
    slug: "ecommerce",
    domain: "github.com/tranhohoangvu/E-Commerce-Website",
    live: false,
    name: "E-commerce Platform",
    desc: "Nền tảng thương mại điện tử full-stack tích hợp trợ lý ảo Gemini AI: giỏ hàng Zustand, cổng thanh toán VNPAY, cập nhật Socket.IO thời gian thực và triển khai Docker Compose CI/CD.",
    summary: "Nền tảng thương mại điện tử full-stack hiện đại tích hợp trợ lý ảo thông minh Gemini AI Chatbot hỗ trợ tư vấn sản phẩm thời gian thực. Hệ thống gồm đầy đủ tính năng: duyệt sản phẩm với bộ lọc đa tiêu chí, giỏ hàng Zustand, cổng thanh toán VNPAY Sandbox, tích điểm thành viên (Loyalty), gửi email qua Nodemailer/MailHog và dashboard thống kê trực quan Recharts.",
    highlights: [
      "Tích hợp Trợ lý Gemini AI Chatbot thời gian thực & Bảo mật API Key",
      "Tích hợp cổng thanh toán VNPAY & Toàn vẹn tồn kho đồng thời",
      "Container hóa đa dịch vụ & Tự động hóa CI/CD Pipeline",
    ],
    type: "Full-Stack",
    year: "2025",
    tags: ["React 18", "Node.js", "Express", "MongoDB", "Mongoose", "Socket.IO", "Gemini AI", "Docker", "VNPAY"],
    role: "Full-Stack Developer",
    accent: "#22d3ee",
    url: "https://github.com/tranhohoangvu/E-Commerce-Website",
  },
  {
    slug: "vietnamese-ocr",
    domain: "github.com/tranhohoangvu/Deep-Learning",
    live: false,
    name: "Vietnamese OCR (Deep Learning)",
    desc: "Khảo sát các cơ chế Attention (Self/Flash/Linear/Sparse) và xây dựng mô hình OCR nhận diện chữ tiếng Việt từ ảnh MCOCR bằng backbone ResNet34 + Spatial Attention + Transformer Decoder.",
    summary: "Đồ án học sâu Deep Learning gồm 2 nội dung chính: (1) Khảo sát thực nghiệm các cơ chế Attention trong LLMs (Self-Attention, FlashAttention block-wise, Linear Attention và Sparse Attention); (2) Xây dựng mô hình OCR nhận diện văn bản tiếng Việt từ ảnh thực tế (Scene Text Recognition) trên tập dữ liệu MCOCR.",
    highlights: [
      "Khảo sát thực nghiệm & Mô phỏng cơ chế FlashAttention / Linear Attention",
      "Nhận dạng chính xác các dấu thanh tiếng Việt nhỏ và dễ nhòe",
      "Đo lường chất lượng sinh chuỗi ký tự khách quan bằng BLEU Score",
    ],
    type: "AI / Deep Learning",
    year: "2025",
    tags: ["Python", "PyTorch", "ResNet34", "Transformer Decoder", "Spatial Attention", "MCOCR", "BLEU"],
    role: "AI Engineer",
    accent: "#f472b6",
    url: "https://github.com/tranhohoangvu/Deep-Learning",
  },
  {
    slug: "nlp-translation",
    domain: "github.com/tranhohoangvu/Natural-Language-Processing",
    live: false,
    name: "EN–VI Machine Translation (NLP)",
    desc: "Khảo sát căn chỉnh RLHF/PPO với Hugging Face TRL và thực nghiệm dịch máy Anh - Việt so sánh mô hình tự huấn luyện (Transformer/GPT + SentencePiece) và Pretrained (GPT-2, MarianMT).",
    summary: "Đồ án Xử lý Ngôn ngữ Tự nhiên (NLP) gồm 2 phần chuyên sâu: (1) Khảo sát Reinforcement Learning from Human Feedback (RLHF): cài đặt PPO trên CartPole-v1 và PPO tinh chỉnh mô hình ngôn ngữ nhân quả (Causal LM) với thư viện Hugging Face TRL; (2) So sánh toàn diện mô hình dịch máy Anh - Việt (EN↔VI) giữa phương pháp tự huấn luyện từ đầu (no-pretrain) và mô hình pretrained.",
    highlights: [
      "Triển khai thuật toán PPO phục vụ căn chỉnh RLHF cho Causal LM",
      "Giải quyết hiện tượng Out-of-Vocabulary (OOV) khi tự huấn luyện từ đầu",
      "Đo lường đối chiếu công bằng giữa mô hình Scratch và Pretrained",
    ],
    type: "AI / Deep Learning",
    year: "2025",
    tags: ["Python", "PyTorch", "Hugging Face", "TRL (RLHF/PPO)", "MarianMT", "SentencePiece", "SacreBLEU"],
    role: "AI Engineer",
    accent: "#f472b6",
    url: "https://github.com/tranhohoangvu/Natural-Language-Processing",
  },
  {
    slug: "stock-ml",
    domain: "github.com/tranhohoangvu/Machine-Learning",
    live: false,
    name: "Stock Forecasting & Benchmark (ML)",
    desc: "Khảo sát tốc độ hội tụ 7 thuật toán Gradient Descent (GD, Momentum, Adam...); dự báo giá mở cửa cổ phiếu bằng cửa sổ trượt 60 ngày (LSTM/FFNN); và phân loại chữ số MNIST bằng CNN.",
    summary: "Đồ án Machine Learning giải quyết 3 bài toán kinh điển: (1) Khảo sát thực nghiệm các thuật toán tối ưu hóa Gradient Descent trên bài toán hồi quy Boston Housing; (2) Dự báo giá mở cửa cổ phiếu (Stock Open Price) theo chuỗi thời gian bằng cửa sổ trượt sequence_length = 60; (3) Phân loại chữ số viết tay MNIST bằng mạng CNN tích chập.",
    highlights: [
      "Lập trình và trực quan hóa so sánh 7 thuật toán tối ưu Gradient",
      "Chuẩn bị chuỗi dữ liệu cửa sổ trượt (Sequence Length = 60) chống Data Leakage",
      "Kiểm soát Overfitting trên mạng nơ-ron dự báo chuỗi thời gian",
    ],
    type: "AI / Deep Learning",
    year: "2024",
    tags: ["Python", "TensorFlow / Keras", "scikit-learn", "LSTM / FFNN", "Time-Series", "CNN", "Optimization"],
    role: "AI Engineer",
    accent: "#f472b6",
    url: "https://github.com/tranhohoangvu/Machine-Learning",
  },
  {
    slug: "warehouse",
    domain: "github.com/tranhohoangvu/WarehouseMA",
    live: false,
    name: "WarehouseMA",
    desc: "Phần mềm quản lý kho tòa nhà WinForms C# kiến trúc 3 lớp: tích hợp Google Forms API tiếp nhận yêu cầu, quét mã QR kiểm kê, tính phí tự động và bộ hồ sơ tài liệu SRS/BRD/UML chuẩn mực.",
    summary: "Đồ án môn Công nghệ Phần mềm tại Trường Đại học Tôn Đức Thắng (TDTU). WarehouseMA là ứng dụng desktop quản lý kho hàng hóa, vật tư, dụng cụ trong tòa nhà, hỗ trợ 2 loại kho: Kho Nội Bộ (vận hành tòa nhà) và Kho Cho Thuê (dành cho cư dân/đơn vị thuê). Dự án được triển khai theo quy trình công nghệ phần mềm chuyên nghiệp: Phân tích, Thiết kế, Lập trình và Kiểm thử.",
    highlights: [
      "Thu thập yêu cầu nghiệp vụ phức tạp & Thiết kế tài liệu chuẩn BA",
      "Tự động hóa tiếp nhận yêu cầu với Google Forms API & Kiểm kê bằng QR Code",
      "Thuật toán gợi ý vị trí lưu trữ kho tối ưu (Storage Slotting Algorithm)",
    ],
    type: "Backend",
    year: "2024",
    tags: ["C#", ".NET WinForms", "MySQL / SQL Server", "3-Tier Architecture", "Google Forms API", "QR Code", "SRS / BRD"],
    role: "Backend Developer",
    accent: "#a3e635",
    url: "https://github.com/tranhohoangvu/WarehouseMA",
  },
  {
    slug: "pos",
    domain: "github.com/tranhohoangvu/Web-Programming-and-Applications",
    live: false,
    name: "An Khang Store POS",
    desc: "Hệ thống POS bán lẻ nội bộ cho cửa hàng điện thoại bằng Laravel 10 & Livewire: tìm kiếm mã vạch, tra cứu tự tạo khách hàng theo SĐT, email kích hoạt 1 phút và xuất hóa đơn PDF.",
    summary: "Đồ án môn Lập trình Web và Ứng dụng tại Đại học Tôn Đức Thắng (TDTU). AN KHANG STORE là ứng dụng Point of Sale (POS) xây dựng bằng Laravel 10 dành riêng cho nhân viên và ban quản trị cửa hàng bán lẻ điện thoại và phụ kiện điện tử (không phải e-commerce công khai). Hệ thống xử lý bán hàng nhanh, tìm kiếm khách hàng, gửi email tự động và báo cáo doanh thu.",
    highlights: [
      "Tự động gửi Email kích hoạt tài khoản nhân viên với Token hết hạn 1 phút",
      "Tra cứu khách hàng theo SĐT & Tự động tạo mới mượt mà",
      "Bán hàng theo Barcode, tính tiền thừa & Xuất hóa đơn PDF",
    ],
    type: "Backend",
    year: "2024",
    tags: ["Laravel 10", "Livewire", "MySQL", "Bootstrap 5", "DOMPDF", "Vite", "Toastr"],
    role: "Backend Developer",
    accent: "#a3e635",
    url: "https://github.com/tranhohoangvu/Web-Programming-and-Applications",
  },
];

/** Tìm dự án theo slug (dùng cho route /work/[slug]) */
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Dự án liền trước / liền sau (vòng tròn)  dùng cho footer trang chi tiết */
export function getProjectNeighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
