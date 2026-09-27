/**
 * Ban dich tieng Anh cho NOI DUNG dai ( dung UI da co san trong lib/i18n).
 * Chi dung khi lang === "en"; thieu du lieu se tu dong fallback ve tieng Viet.
 */

export const CONTENT_EN = {
  profile: {
    /** ten hien thi: ban EN dung dang khong dau de doc de khi share/OG */
    name: "Trần Hồ Hoàng Vũ",
    nameAscii: "Tran Ho Hoang Vu",
    role: "Backend · Frontend · AI Engineer",
    headline: ["Full-Stack", "AI Engineer"],
    location: "Ho Chi Minh City, Vietnam",
    workMode: "On-site · Hybrid · Remote",
    /** 4 so lieu o hero: nhan + gia tri */
    stats: [
      { value: 10, label: "Completed projects" },
      { value: 4, label: "AI / Deep Learning projects" },
      { value: 8, label: "Certificates" },
      { value: 3, label: "Tailored CV versions" },
    ],
    /** nhan tam nho tren the CV */
    cvNotes: [
      "Backend track",
      "Next.js · React · TypeScript",
      "ML/DL · NLP · Computer Vision",
    ],
    stackLine: "Next.js · Node.js · Laravel · Python · PyTorch",
    /** panel `c.profile.json` — khoa giong nhau, chi doi nhan/gia tri sang EN */
    profileJson: [
      ["name", "Tran Ho Hoang Vu"],
      ["role", "Backend · Frontend · AI Engineer"],
      ["based", "Ho Chi Minh City, Vietnam"],
      ["university", "Ton Duc Thang University"],
      ["major", "Computer Science"],
      ["certificates", "8 international"],
      ["projects", "10 completed projects"],
      ["cv", "3 versions: BE · FE · AI"],
    ],
    intro:
      "Computer Science graduate (Ton Duc Thang University). I went from deep learning models to products that actually run: REST API design, PostgreSQL tuning, Next.js/React interfaces and AI/ML pipelines. Open to Backend, Frontend or AI Engineer roles.",
    about: {
      paragraphs: [
        "I am Tran Ho Hoang Vu, a Computer Science graduate from Ton Duc Thang University. I like solutions that genuinely run: from RESTful API design and SQL tuning to modern Next.js/React interfaces and real AI/ML models.",
        "I moved from academic deep learning work — Vietnamese handwriting OCR, EN–VI machine translation, time-series forecasting — into products that serve real users: SchoolOps, BookingCare and CourseHub LMS. On every project I design the architecture and the schema first, then write code.",
        "I work comfortably with Node.js, Express.js, Laravel, Next.js, React, PostgreSQL and Python/PyTorch. I am open to Backend, Frontend or AI Engineer roles, on-site, hybrid or remote.",
      ],
      values: [
        { title: "Design first, code later", body: "Every project starts with the schema and the business flow, not a UI with a bolted-on API." },
        { title: "Full lifecycle ownership", body: "Database, API, interface, Docker, CI/CD and technical handover." },
        { title: "AI as a tool, not a stunt", body: "Applied only where it solves a real problem: document OCR, translation, forecasting." },
        { title: "Normalise data from day one", body: "Indexes, transactions and raw SQL are deliberate — not something left to break under load." },
      ],
    },
    education: {
      /** ten truong la ten rieng — giu nguyen, khong dich lai */
      school: "Ton Duc Thang University",
      major: "Computer Science",
      courses: [
        "Data Structures & Algorithms",
        "Databases",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Computer Networks",
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
      { title: "Vietnamese handwriting OCR", tag: "PyTorch · Computer Vision", body: "A ResNet34 backbone with Spatial Attention and a Transformer Decoder, trained on MCOCR to recognise handwritten Vietnamese text." },
      { title: "EN–VI machine translation", tag: "NLP · Transformer", body: "MarianMT fine-tuned with Hugging Face TRL under PPO/RLHF, with SentencePiece handling the bilingual vocabulary." },
    ],
    contact: {
      status: "Open to work · backend / frontend / ai",
      blurb: "I am looking for Backend, Frontend or AI Engineer roles, and I also take collaboration projects. Send me a few lines about what you are building — I reply within 24 hours.",
    },
    terminal: [
      { cmd: "$ whoami", out: "tranhohoangvu · backend / frontend / ai" },
      { cmd: "$ cat stack.json", out: "Next.js · Node.js · Laravel · Python · PyTorch" },
      { cmd: "$ ls ~/projects | wc -l", out: "10 completed projects" },
      { cmd: "$ ls ~/certificates | wc -l", out: "8 Certificates" },
    ],
    preloader: [
      "init portfolio.core",
      "load profile.json",
      "mount projects[10]",
      "connect stack: node · laravel · pytorch",
      "ready",
    ],
  },

  stack: {
    core_languages: { label: "Core languages", meta: "Programming foundations & algorithmic thinking" },
    backend_architecture: { label: "Backend architecture & APIs", meta: "RESTful API, MVC, JWT RBAC & microservices" },
    databases_and_optimization: { label: "Databases & optimisation", meta: "Raw SQL, indexing, transactions & schema design" },
    ai_devops_and_tools: { label: "AI, DevOps & tools", meta: "Deep learning, containerisation & CI/CD pipelines" },
  },

  experience: [
    {
      company: "TMA Solutions",
      period: "03/2026 — 06/2026",
      role: "Backend Developer Intern",
      place: "Ho Chi Minh City · On-site",
      body: "Built components of a modular backend automation system using OpenClaw to connect Discord with Jira, defining workflows for input handling, validation and data normalisation. Integrated the Jira REST API and JQL to query open, overdue and stale tasks; wrote a command parser that turns Discord messages into intents for task creation, status transitions and issue lookups; standardised request/response handling for JSON and the Atlassian Document Format (ADF).",
      tags: ["Node.js", "OpenClaw", "Jira REST API", "JQL", "Discord", "Atlassian ADF"],
    },
  ],

  projects: {
    schoolops: {
      desc: "Enterprise school operations platform on a Next.js 16 + Express monorepo: per-class dynamic RBAC, Fisher-Yates seating charts, a two-shift timetable with automatic teacher-conflict detection and 110 unit tests.",
      summary:
        "SchoolOps is an enterprise school management platform for lower-secondary schools (Nguyen Tat Thanh model 2026–2027), built as a Next.js 16 + Express/TypeScript monorepo. It manages 16 classes, 480 students and 24 teachers with class-scoped RBAC, an interactive dual-perspective seating chart for 20 desks, real-time attendance and automatic schedule conflict detection.",
      highlights: [
        "Dynamic per-class RBAC matrix",
        "Two-shift timetable with conflict detection",
        "Fisher-Yates seating with dual perspective",
      ],
    },
    bookingcare: {
      desc: "A full-stack medical appointment platform on Next.js 15 and Supabase: atomic slot booking, batch upserts for multi-day shifts and row-level security policies.",
      summary: "BookingCare is a full-stack healthcare platform built on Next.js 15 with Supabase (PostgreSQL, Auth SSR, RLS). It generates bookable slots per doctor and shift, prevents double bookings with atomic conditional updates backed by partial unique indexes, and guards every route with both Next.js middleware and database row-level security.",
      highlights: [
        "Atomic booking with partial unique indexes",
        "Batch upsert slot generation",
        "Edge guards combined with RLS policies",
      ],
    },
    "pdf-vision-ocr": {
      desc: "PDF Vision OCR: auto-detects digital PDFs for native text extraction, falls back to PaddleOCR for scans, and enriches structured fields with Gemini Vision.",
      summary: "A Python pipeline that ingests PDFs of any kind. It auto-detects digital documents and extracts the native text layer, while scanned pages go through PaddleOCR with Vietnamese support; structured fields are then extracted with the Gemini 2.5 Flash Vision API and exposed through a FastAPI service with a multi-mode Docker entrypoint.",
      highlights: [
        "Digital PDF detection with OCR fallback",
        "Gemini Vision structured extraction",
        "Multi-mode Docker entrypoint",
      ],
    },
    coursehub: {
      desc: "An LMS on React, Vite and Express with raw PostgreSQL (no ORM) and JWT RBAC, covering courses, enrolment, assignments and progress.",
      summary: "CourseHub is a learning management system built with React and Vite on the front end, and Node.js/Express with native pg raw SQL on the back end. Authentication and authorisation use JWT with role-based access control across courses, enrolments, assignments and progress tracking.",
      highlights: [
        "Raw SQL on native pg, no ORM",
        "JWT role-based access control",
        "Course, enrolment and progress tracking",
      ],
    },
    ecommerce: {
      desc: "An e-commerce platform with React 18, Express, MongoDB, Socket.IO for live stock, VNPAY payments and containerised deployment.",
      summary: "A full e-commerce platform combining React 18 and Vite with an Express/MongoDB back end. Socket.IO pushes real-time stock updates, VNPAY handles checkout, and the whole stack is containerised with Docker, Docker Compose and an Nginx reverse proxy.",
      highlights: [
        "Real-time stock via Socket.IO",
        "VNPAY checkout integration",
        "Docker Compose with Nginx",
      ],
    },
    "vietnamese-ocr": {
      desc: "Deep learning OCR for Vietnamese handwriting: ResNet34 with spatial attention and a Transformer decoder, trained on MCOCR.",
      summary: "A research project on Vietnamese handwritten text recognition. A ResNet34 backbone extracts visual features, a spatial attention module focuses on character regions, and a Transformer decoder produces the sequence  trained end-to-end on the MCOCR dataset.",
      highlights: [
        "ResNet34 + spatial attention",
        "Transformer decoder for sequence output",
        "Trained on the MCOCR dataset",
      ],
    },
    "nlp-translation": {
      desc: "ENVI machine translation: MarianMT fine-tuned with PPO/RLHF through Hugging Face TRL, with SentencePiece for the bilingual vocabulary.",
      summary: "A neural machine translation project between English and Vietnamese. The MarianMT model is fine-tuned with Proximal Policy Optimization (RLHF) via Hugging Face TRL, while SentencePiece provides a shared subword vocabulary that handles code-switching between the two languages.",
      highlights: [
        "MarianMT fine-tuned with PPO/RLHF",
        "SentencePiece bilingual vocabulary",
        "Handles code-switching",
      ],
    },
    "stock-ml": {
      desc: "Stock forecasting and benchmarking: LSTM, FFNN and CNN compared across seven optimisers to find the best configuration.",
      summary: "A time-series forecasting study that benchmarks LSTM, feed-forward and convolutional networks against each other. Each architecture is trained with seven different optimisers so the comparison is about the training setup, not just the architecture, with results documented for reproducible comparison.",
      highlights: [
        "LSTM, FFNN and CNN benchmarked",
        "Seven optimisers compared",
        "Reproducible benchmark suite",
      ],
    },
    warehouse: {
      desc: "WarehouseMA: a C# / .NET WinForms three-tier system with MySQL and SQL Server, QR code scanning and Google Forms intake.",
      summary: "A desktop warehouse management application built with C# and .NET WinForms on a three-tier architecture, backed by MySQL and SQL Server. It handles stock movement, QR code scanning for item lookup, and ingests intake forms through the Google Forms API, developed alongside SRS and BRD documents.",
      highlights: [
        "Three-tier C# / WinForms architecture",
        "QR code lookup and Google Forms intake",
        "Delivered with SRS and BRD documents",
      ],
    },
    pos: {
      desc: "An Khang Store POS on Laravel 10 and Livewire with MySQL: sales, stock movements and PDF invoices via DOMPDF.",
      summary: "A point-of-sale system for a retail store, built on Laravel 10 with Livewire for reactive interfaces and MySQL for persistence. It covers the sales flow, stock movement and generates PDF invoices with DOMPDF, on a Bootstrap 5 interface bundled by Vite.",
      highlights: [
        "Laravel 10 with Livewire components",
        "PDF invoices generated with DOMPDF",
        "Sales flow and stock movement",
      ],
    },
  },

  /** badge gan tren card du an */
  badgeLatest: "Latest",

  /** nhan loc chung chi */
  certCategories: {
    all: "All",
    ai: "AI & Deep Learning",
    data: "Data Analytics",
    software: "Process & Agile",
    language: "Languages",
  },

  /** the loai in tren the chung chi */
  certTags: {
    ai: "AI / Deep Learning",
    data: "Data Analytics",
    software: "Agile / DevOps",
    language: "English",
  },

  /** mo ta chung chi theo id */
  certDesc: {
    "Microsoft-ai-pm":
      "Five Microsoft-built courses: building enterprise AI products with Copilot, Azure, Power BI, market research and UX/UI design.",
    "Linux-lfs101":
      "Linux operating system fundamentals: command line, system administration, networking, bash shell and open-source security.",
    "Google-data-analytics":
      "Eight courses plus a capstone case study: processing, cleaning, analysing and visualising real data with SQL, R and Tableau.",
    "Gemini-educator":
      "Certified educator programme: applying advanced Google AI and Gemini models to optimise teaching and build course material.",
    "Gemini-student":
      "Assesses applied knowledge, hands-on skills and practical use of Gemini AI models in study and at work.",
    tensorflow:
      "Four courses: building and training deep neural networks, computer vision with CNNs, natural language processing and time-series forecasting.",
    "agile-scrum":
      "Awarded by Ton Duc Thang University: Scrum roles, sprints, backlog refinement and the Agile ceremonies.",
    "aptis-esol":
      "The British Council international English test, scoring four skills on the CEFR scale.",
  },

  /** ky nang 4 muc cua Aptis ESOL */
  certSkillsAptis: ["Listening", "Speaking", "Reading", "Writing"],

  /** mo ta nhanh trong console, khoa la lenh (vd "vu --help") */
  consoleQuick: {
    "vu --help": "List of available commands",
    "vu --bio": "Personal background & education",
    "vu --skills": "The four skill pillars",
    "vu --fetch-projects": "Fetch the project list",
    "vu --contact": "Email, GitHub, LinkedIn",
    "vu --cv": "Three role-focused CVs",
    "curl /api/v1/health": "System status",
    clear: "Clear the screen",
  },

  /** nhan endpoint REST, khoa la path */
  consoleApi: {
    "/api/v1/profile": "Personal background & education",
    "/api/v1/skills": "Skill list across four pillars",
    "/api/v1/projects": "All technical projects",
    "/api/v1/projects?category=backend": "Filter: Backend",
    "/api/v1/projects?category=ai": "Filter: AI / Deep Learning",
    "/api/v1/health": "Status & uptime",
    "/api/v1/contact": "Simulated message send",
  },
} as const;