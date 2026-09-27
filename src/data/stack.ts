export type Skill = {
  id: string;
  name: string;
  /** class devicon, ví dụ "devicon-python-plain colored" */
  icon: string;
  /** số dự án thật đã dùng công nghệ này (đếm từ projectIds trong skills.json) */
  /** slug cua du an thuc su dung cong nghe nay (nguon: skills.json projectIds) */
  slugs: string[];
  /** framework đi kèm, ví dụ "Laravel", "PyTorch" */
  note?: string;
};

export type StackGroup = {
  id: string;
  file: string;
  label: string;
  meta: string;
  /** path `d` của icon svg nhóm (lấy từ web cũ) */
  icon: string;
  items: Skill[];
};

/** Nội dung lấy từ data/skills.json của portfolio cũ  không có % mức độ,
 *  dùng icon devicon + badge số dự án. */
export const stack: StackGroup[] = [
  {
    id: "core_languages",
    file: "core-languages.json",
    label: "Ngôn ngữ cốt lõi",
    meta: "Nền tảng lập trình & tư duy thuật toán",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    items: [
      { id: "c", name: "C", icon: "devicon-c-plain colored", slugs: [] },
      { id: "csharp", name: "C#", icon: "devicon-csharp-plain colored", slugs: ["warehouse"], note: ".NET WinForms" },
      { id: "java", name: "Java", icon: "devicon-java-plain colored", slugs: [] },
      { id: "python", name: "Python", icon: "devicon-python-plain colored", slugs: ["vietnamese-ocr", "nlp-translation", "stock-ml"], note: "PyTorch · TensorFlow" },
      { id: "javascript", name: "JavaScript", icon: "devicon-javascript-plain colored", slugs: ["schoolops", "bookingcare", "coursehub", "ecommerce"], note: "Next.js · Node · React" },
      { id: "php", name: "PHP", icon: "devicon-php-plain colored", slugs: ["pos"], note: "Laravel" },
    ],
  },
  {
    id: "backend_architecture",
    file: "backend-architecture.json",
    label: "Kiến trúc Backend & API",
    meta: "RESTful API, MVC, JWT RBAC & Microservices",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    items: [
      { id: "nodejs", name: "Node.js", icon: "devicon-nodejs-plain colored", slugs: ["schoolops", "coursehub", "ecommerce"] },
      { id: "express", name: "Express.js", icon: "devicon-express-original colored", slugs: ["schoolops", "coursehub", "ecommerce"] },
      { id: "laravel", name: "Laravel", icon: "devicon-laravel-plain colored", slugs: ["pos"] },
      { id: "restapi", name: "RESTful API", icon: "devicon-postman-plain colored", slugs: ["schoolops", "bookingcare", "pdf-vision-ocr", "coursehub", "ecommerce"] },
      { id: "dotnet", name: ".NET WinForms", icon: "devicon-dot-net-plain colored", slugs: ["warehouse"] },
      { id: "react", name: "React", icon: "devicon-react-original colored", slugs: ["schoolops", "bookingcare", "coursehub", "ecommerce"] },
    ],
  },
  {
    id: "databases_and_optimization",
    file: "databases-optimization.json",
    label: "Cơ sở dữ liệu & Tối ưu",
    meta: "Raw SQL, Indexing, Transactions & Schema Design",
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    items: [
      { id: "postgresql", name: "PostgreSQL", icon: "devicon-postgresql-plain colored", slugs: ["schoolops", "bookingcare", "coursehub"] },
      { id: "mysql", name: "MySQL", icon: "devicon-mysql-plain colored", slugs: ["warehouse", "pos"] },
      { id: "mongodb", name: "MongoDB", icon: "devicon-mongodb-plain colored", slugs: ["ecommerce"] },
      { id: "sqlserver", name: "SQL Server", icon: "devicon-microsoftsqlserver-plain colored", slugs: ["warehouse"] },
      { id: "rawsql", name: "Raw SQL", icon: "devicon-postgresql-plain colored", slugs: ["schoolops", "coursehub"], note: "Native pg · No ORM" },
    ],
  },
  {
    id: "ai_devops_and_tools",
    file: "ai-devops.json",
    label: "AI, DevOps & Công cụ",
    meta: "Mô hình Học sâu, Container hóa & CI/CD Pipeline",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    items: [
      { id: "pytorch", name: "PyTorch", icon: "devicon-pytorch-original colored", slugs: ["vietnamese-ocr", "nlp-translation"] },
      { id: "tensorflow", name: "TensorFlow", icon: "devicon-tensorflow-original colored", slugs: ["stock-ml"] },
      { id: "docker", name: "Docker", icon: "devicon-docker-plain colored", slugs: ["pdf-vision-ocr", "ecommerce"] },
      { id: "compose", name: "Docker Compose", icon: "devicon-docker-plain colored", slugs: ["ecommerce"] },
      { id: "nginx", name: "Nginx", icon: "devicon-nginx-original colored", slugs: ["ecommerce"] },
      { id: "git", name: "Git", icon: "devicon-git-plain colored", slugs: ["schoolops", "bookingcare", "pdf-vision-ocr", "coursehub", "ecommerce", "vietnamese-ocr", "nlp-translation", "stock-ml", "warehouse", "pos"] },
      { id: "github", name: "GitHub", icon: "devicon-github-original colored", slugs: ["schoolops", "bookingcare", "pdf-vision-ocr", "coursehub", "ecommerce", "vietnamese-ocr", "nlp-translation", "stock-ml", "warehouse", "pos"] },
      { id: "postman", name: "Postman", icon: "devicon-postman-plain colored", slugs: ["schoolops", "coursehub", "ecommerce"] },
      { id: "linux", name: "Linux", icon: "devicon-linux-plain colored", slugs: [] },
    ],
  },
];