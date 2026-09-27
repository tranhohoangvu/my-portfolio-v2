/** khoa tra ve `CERT_LOGOS` (src/components/CertLogos.tsx) */
export type CertLogoId =
  | "microsoft"
  | "google"
  | "linux"
  | "deeplearning"
  | "techbase"
  | "britishcouncil";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  /** logo nha cap ve tren the */
  logo: CertLogoId;
  /** nhóm để lọc: "ai" | "data" | "software" | "language" */
  category: "ai" | "data" | "software" | "language";
  date: string;
  /** mã chứng chỉ do nhà cung cấp cấp */
  certId?: string;
  skills: string[];
  /** file PDF trong /public/certificates */
  pdf: string;
  /** trang (hoac file PDF) công khai chính thức của bên cấp */
  credential?: string;
  /** điểm số (chỉ có ở Aptis) */
  score?: { value: string; max: string; note: string };
  desc: string;
};

/** Nhan nhom in o goc the chung chi — `CERT_CATEGORIES` la nut loc,
 *  `CERT_TAGS` la nho nho hon in tren the. */
export const CERT_TAGS = {
  ai: "AI / Học sâu",
  data: "Phân tích dữ liệu",
  software: "Agile / DevOps",
  language: "Tiếng Anh",
} as const;

export const CERT_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "ai", label: "AI & Deep Learning" },
  { id: "data", label: "Phân tích dữ liệu" },
  { id: "software", label: "Quy trình & Agile" },
  { id: "language", label: "Ngoại ngữ" },
] as const;

export const certificates: Certificate[] = [
  {
    id: "Microsoft-ai-pm",
    title: "Microsoft AI Product Manager",
    issuer: "Microsoft · Coursera",
    logo: "microsoft",
    category: "ai",
    date: "01/2026",
    certId: "Y1B76ZTZXTCN",
    skills: ["Copilot", "Azure AI", "Power BI", "Product Strategy", "UX/UI"],
    pdf: "/certificates/TranHoHoangVu_Microsoft_AI_Product_Manager.pdf",
    credential: "https://coursera.org/verify/professional-cert/Y1B76ZTZXTCN",
    desc: "Chuyên môn gồm 5 khóa do Microsoft đào tạo: phát triển sản phẩm AI cho doanh nghiệp với Copilot, Azure, Power BI, nghiên cứu thị trường và thiết kế UX/UI.",
  },
  {
    id: "Linux-lfs101",
    title: "Introduction to Linux (LFS101)",
    issuer: "The Linux Foundation",
    logo: "linux",
    category: "software",
    date: "01/2026",
    certId: "LF-0korv3z00s",
    skills: ["Linux CLI", "Bash", "System Administration", "File Systems"],
    pdf: "/certificates/TranHoHoangVu_Linux_Foundation_LFS101.pdf",
    /* The Linux Foundation khong co trang verify cong khai theo ma, nen tro
       thang toi file credential chinh thuc tren S3 cua ho. */
    credential:
      "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/dc762e77-b6cb-4eee-aa23-b50aa5972e53-vu-tran-ho-hoang-b4bad79c-ac9f-4eac-83b5-405ef7710018-certificate.pdf",
    desc: "Nền tảng về hệ điều hành Linux: thao tác dòng lệnh, quản trị hệ thống, kiến trúc mạng, bash shell và bảo mật mã nguồn mở.",
  },
  {
    id: "Google-data-analytics",
    title: "Google Data Analytics",
    issuer: "Google · Coursera",
    logo: "google",
    category: "data",
    date: "01/2026",
    certId: "2256GOEWHB2O",
    skills: ["SQL", "R", "Tableau", "Spreadsheets", "Data Cleaning"],
    pdf: "/certificates/TranHoHoangVu_Google_Data_Analytics.pdf",
    credential: "https://coursera.org/verify/professional-cert/2256GOEWHB2O",
    desc: "8 khóa học cùng dự án Capstone: xử lý, làm sạch, phân tích và trực quan hoá dữ liệu thực tế với SQL, R, Tableau.",
  },
  {
    id: "Gemini-educator",
    title: "Gemini Certified Educator",
    issuer: "Google for Education",
    logo: "google",
    category: "ai",
    date: "01/2026",
    certId: "QwBRzFdp",
    skills: ["Gemini AI", "Google AI", "Prompt Engineering", "AI in Education"],
    pdf: "/certificates/TranHoHoangVu_Google_Gemini_Certified_Educator.pdf",
    credential: "https://edu.google.accredible.com/6a00f1fb-442c-423c-ac04-556950bbe4d0#acc.QwBRzFdp",
    desc: "Chứng chỉ chuyên gia giáo dục: ứng dụng nâng cao mô hình Google AI và Gemini để tối ưu hoá giảng dạy và soạn thảo học liệu.",
  },
  {
    id: "Gemini-student",
    title: "Gemini Certified Student",
    issuer: "Google for Education",
    logo: "google",
    category: "ai",
    date: "01/2026",
    certId: "DwFyn4bH",
    skills: ["Gemini AI", "Prompt Engineering", "Generative AI", "LLMs"],
    pdf: "/certificates/TranHoHoangVu_Google_Gemini_Certified_Student.pdf",
    credential: "https://edu.google.accredible.com/3d729d76-cba3-4376-8e5f-2bd6e53fd276#acc.DwFyn4bH",
    desc: "Đánh giá kiến thức chuyên môn, kỹ năng thực hành và ứng dụng mô hình Gemini AI trong học tập và công việc.",
  },
  {
    id: "tensorflow",
    title: "TensorFlow Developer",
    issuer: "DeepLearning.AI · Coursera",
    logo: "deeplearning",
    category: "ai",
    date: "01/2026",
    certId: "7VU0Y6P2472Z",
    skills: ["TensorFlow", "Deep Learning", "CNN", "NLP", "Time Series"],
    pdf: "/certificates/TranHoHoangVu_DeepLearning_TensorFlow.pdf",
    credential: "https://coursera.org/verify/professional-cert/7VU0Y6P2472Z",
    desc: "4 khóa học: xây dựng và huấn luyện mạng nơ-ron sâu, thị giác máy tính (CNN), xử lý ngôn ngữ tự nhiên và dự báo chuỗi thời gian.",
  },
  {
    id: "agile-scrum",
    title: "Agile & Scrum Framework 2024",
    issuer: "Techbase Viet Nam",
    logo: "techbase",
    category: "software",
    date: "10/2024",
    skills: ["Scrum Roles", "Sprints", "Backlog Refinement", "Agile Ceremonies"],
    pdf: "/certificates/TranHoHoangVu_Techbase_Agile.pdf",
    desc: "Cấp tại Đại học Tôn Đức Thắng: vai trò Scrum, Sprint, tinh chỉnh backlog và các nghi lễ Agile.",
  },
  {
    id: "aptis-esol",
    title: "Aptis ESOL",
    issuer: "British Council",
    logo: "britishcouncil",
    category: "language",
    date: "04/2024",
    certId: "ESOL 0155613",
    skills: ["Nghe", "Nói", "Đọc", "Viết"],
    pdf: "/certificates/TranHoHoangVu_Aptis_ESOL_Redacted.pdf",
    score: { value: "135", max: "200", note: "Overall CEFR level: B1" },
    desc: "Bài thi tiếng Anh quốc tế của British Council, đánh giá 4 kỹ năng theo thang CEFR.",
  },
];