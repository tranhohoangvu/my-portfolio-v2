export const profile = {
  name: "Trần Hồ Hoàng Vũ",
  slug: "tranhohoangvu",
  role: "Backend · Frontend · AI Engineer",
  headline: ["Full-Stack", "AI Engineer"],
  email: "Hoangvu2k4cmg@gmail.com",
  phone: "0858 041 045",
  github: "github.com/tranhohoangvu",
  linkedin: "linkedin.com/in/tranhohoangvu",
  youtube: "youtube.com/@tranhohoangvu",
  instagram: "instagram.com/_hoawq.vuz_",
  facebook: "facebook.com/TranHoHoangVu",
  location: "TP. Hồ Chí Minh, Việt Nam",
  workMode: "On-site · Hybrid · Remote",
  stackLine: "Next.js · Node.js · Laravel · Python · PyTorch",
  gpa: "8.04 / 10",
  /** 3 bản CV theo định hướng; cvHref là bản dùng cho nút tải nhanh */
  cvs: [
    { label: "Backend Developer Fresher", file: "TranHoHoangVu_BE.pdf", note: "Định hướng chính" },
    { label: "Frontend Developer Fresher", file: "TranHoHoangVu_FE.pdf", note: "Next.js · React · TypeScript" },
    { label: "AI Engineer Fresher", file: "TranHoHoangVu_AI.pdf", note: "ML/DL · NLP · Computer Vision" },
  ],
  cvHref: "/TranHoHoangVu_BE.pdf",
  /** đoạn dẫn ngắn hiện dưới tiêu đề ở hero */
  intro:
    "Tốt nghiệp Khoa học Máy tính (Đại học Tôn Đức Thắng). Mình đi từ mô hình học sâu cho tới sản phẩm chạy thật: thiết kế RESTful API, tối ưu PostgreSQL, dựng giao diện Next.js/React và triển khai pipeline AI/ML. Sẵn sàng nhận việc Backend, Frontend hoặc AI Engineer.",
  stats: [
    { value: 10, decimals: 0, label: "Dự án hoàn chỉnh" },
    { value: 4, decimals: 0, label: "Dự án AI / Deep Learning" },
    { value: 8, decimals: 0, label: "Chứng chỉ" },
    { value: 3, decimals: 0, label: "Bản CV chuyên ngành" },
  ] as { value: number; decimals: number; label: string }[],
  about: {
    paragraphs: [
      "Mình là Trần Hồ Hoàng Vũ, tốt nghiệp ngành Khoa học Máy tính tại Đại học Tôn Đức Thắng. Mình thích những giải pháp chạy được thật: từ thiết kế RESTful API, tối ưu cây truy vấn SQL, dựng giao diện Next.js/React cho tới huấn luyện và triển khai mô hình AI.",
      "Mình đi từ các bài toán học thuật về mô hình học sâu  nhận dạng ký tự tiếng Việt, dịch ENVI, dự báo chuỗi thời gian  sang những sản phẩm chạy thật như SchoolOps, BookingCare hay CourseHub LMS. Mỗi dự án mình đều tự thiết kế kiến trúc và schema rồi mới viết code.",
      "Mình làm việc thành thạo với Node.js, Express.js, Laravel, Next.js, React, PostgreSQL và Python/PyTorch. Hiện mình sẵn sàng nhận việc Backend, Frontend hoặc AI Engineer, làm việc cả on-site, hybrid lẫn remote.",
    ],
    values: [
      {
        title: "Thiết kế trước, code sau",
        body: "Mỗi dự án đều bắt đầu từ schema và luồng nghiệp vụ, không viết UI trước rồi vá API sau.",
      },
      {
        title: "Làm trọn vòng đời",
        body: "Từ database, API, giao diện tới Docker, CI/CD và bàn giao tài liệu kỹ thuật.",
      },
      {
        title: "AI là công cụ, không phải phô trương",
        body: "Ứng dụng AI khi giải quyết bài toán thật: OCR tài liệu, dịch thuật, dự báo chuỗi thời gian.",
      },
      {
        title: "Chuẩn hoá dữ liệu ngay từ đầu",
        body: "Index, transaction và raw SQL có chủ đích  không để hiệu năng gục khi dữ liệu lớn dần.",
      },
    ],
  },
  profileJson: [
    ["name", "Trần Hồ Hoàng Vũ"],
    ["role", "Backend · Frontend · AI Engineer"],
    ["based", "TP. Hồ Chí Minh, VN"],
    ["trường", "ĐH Tôn Đức Thắng"],
    ["ngành", "Khoa học Máy tính"],
    ["chứng chỉ", "8 quốc tế"],
    ["dự án", "10 dự án hoàn chỉnh"],
    ["cv", "3 bản: BE · FE · AI"],
  ],
  education: {
    school: "Trường Đại học Tôn Đức Thắng",
    major: "Khoa học Máy tính",
    courses: [
      "Cấu trúc dữ liệu & Giải thuật",
      "Cơ sở dữ liệu",
      "Lập trình hướng đối tượng",
      "Hệ quản trị cơ sở dữ liệu",
      "Mạng máy tính",
    ],
    awards: [
      { title: "Microsoft AI Product Manager", year: "01/2026" },
      { title: "Google Data Analytics", year: "01/2026" },
      { title: "Google Gemini Certified Educator", year: "01/2026" },
      { title: "DeepLearning.AI TensorFlow", year: "01/2026" },
      { title: "Introduction to Linux (LFS101)", year: "01/2026" },
    ],
  },
  research: [
    {
      title: "Nhận dạng ký tự tiếng Việt",
      tag: "PyTorch · Computer Vision",
      body: "Mô hình ResNet34 kết hợp Spatial Attention và Transformer Decoder, huấn luyện trên bộ dữ liệu MCOCR để nhận dạng chữ viết tay tiếng Việt.",
    },
    {
      title: "Dịch máy ENVI",
      tag: "NLP · Transformer",
      body: "Tinh chỉnh MarianMT bằng Hugging Face TRL theo PPO/RLHF, dùng SentencePiece để xử lý vốn từ song ngữ.",
    },
  ],
  contact: {
    status: "Sẵn sàng nhận việc · backend / frontend / ai",
    blurb:
      "Mình đang tìm cơ hội Backend, Frontend hoặc AI Engineer, và nhận dự án cộng tác. Gửi mình vài dòng về sản phẩm bạn đang làm  mình phản hồi trong vòng 24 giờ.",
  },
  terminal: [
    { cmd: "$ whoami", out: "tranhohoangvu  backend / frontend / ai" },
    { cmd: "$ cat stack.json", out: "Next.js · Node.js · Laravel · Python · PyTorch" },
    { cmd: "$ ls ~/projects | wc -l", out: "10 dự án hoàn chỉnh" },
    { cmd: "$ ls ~/certificates | wc -l", out: "8 Chứng chỉ" },
  ],
  preloader: [
    "init portfolio.core",
    "load profile.json",
    "mount projects[10]",
    "connect stack: node · laravel · pytorch",
    "ready",
  ],
  scrollCue: "scroll",
  terminalTitle: "tranhohoangvu — bash",
};
