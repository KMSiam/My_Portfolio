# PROJECT CONTEXT & KNOWLEDGE BASE
**Project:** Rebuilding Personal Portfolio for K.M. Siam  
**Target Repository:** `E:\VS Code\Web\MY_Portfolio`  
**Reference Repository:** `E:\VS Code\Web\portfolio-responsive-complete-main` (Live: `https://kmsiam.vercel.app/`)  
**Last Updated:** November 2026  

---

## 1. Repository Architecture & File Hierarchy

```text
E:\VS Code\Web\MY_Portfolio\
├── index.html                   # Single-page layout containing DOM nodes for all sections and inline scripts
├── package.json                 # Project configuration (type: "module", dependency: @fiddle-digital/string-tune)
├── README.md                    # Template documentation (ECHO by Jishnu Mondal)
├── PROJECT_CONTEXT.md           # Persistent project context, discovery records, and architecture guide
│
├── Core Interactive Engines (ES Modules):
│   ├── flex-carousel.js         # WebGL / OGL-powered liquid carousel engine (exports initFlexCarousel, DEFAULT_ITEMS)
│   ├── FlexCarousel.css         # Styling, focus rings, counters, and layout for FlexCarousel
│   ├── FlexCarousel.tsx         # TypeScript / React source reference for FlexCarousel
│   ├── works-wheel.js           # 3D Cylindrical drum reel component (exports initWorksWheel, DEFAULT_WORKS)
│   ├── scroll-expand-media.js   # Scroll-driven kinetic media expansion engine (exports initScrollExpandMedia)
│   ├── ScrollExpandMedia.tsx    # TypeScript / React source reference for ScrollExpandMedia
│   ├── experience-section.js    # Horizontal spatial timeline engine powered by StringTune runtime
│   └── particles.js             # Interactive particle constellation background engine from kmsiam.vercel.app
│
├── Assets & Media Directories:
│   ├── assets/                  # Hero headshots, background ambient textures, StringTune bundles
│   │   ├── hero_portrait.png    # Hero portrait image with mask
│   │   ├── about_bg.jpg / .png  # Atmospheric backgrounds for About section
│   │   ├── about_floating_light_hq.png # High-res unblur target for ScrollExpandMedia
│   │   ├── about_starry_castle_hq.jpg  # Background ambient layer
│   │   ├── string-tune.js       # UMD build of StringTune runtime
│   │   └── string-tune.mjs      # ES Module build of StringTune runtime
│   │
│   ├── Project Images/          # 6 preview captures used in FlexCarousel
│   ├── Landing Page Assest/     # 6 high-res full screenshots used in WorksWheel
│   └── .agents/skills/string-tune # Antigravity skill reference for @fiddle-digital/string-tune
```

---

## 2. Technology Stack & External Dependencies

| Domain | Technology / Library | Purpose & Version |
|---|---|---|
| **Markup & Semantics** | HTML5 Semantic Web | Modular single-page architecture (`#home`, `#about`, `#experience`, `#projects`, `#landing-pages`, `#services`, `#contact`) |
| **Styling & Utility** | Tailwind CSS v3 (CDN) | Loaded via `https://cdn.tailwindcss.com?plugins=forms,container-queries` with custom brand configuration |
| **Custom Styling** | Vanilla CSS (`FlexCarousel.css` + inline `<style>`) | High-performance CSS transforms, `will-change`, backdrop-filters, custom keyframes |
| **Typography** | Plus Jakarta Sans | Google Fonts (`weights: 300, 400, 500, 600, 700, 800, 900`) |
| **3D Graphics & WebGL**| OGL v1.0.11 | High-performance, lightweight WebGL library loaded via ESM (`https://esm.sh/ogl@1.0.11`) |
| **Scroll Kinetics** | `@fiddle-digital/string-tune` v1.2.0 | Hardware-accelerated progress interpolation, unblocking native browser scrolling |
| **Architecture** | Native Vanilla JavaScript (ES Modules) | Zero framework runtime overhead, instant cold start, native browser execution |

---

## 3. Detailed Component Responsibilities & Mechanics

### 3.1 Hero Section (`#home`)
- **Wordmark & Navigation:** Floating pill navigation (`Home`, `About Me`, `Experience`, `Projects`, `Landing Pages`, `Services`) with active state tracking via `IntersectionObserver`.
- **Metallic Shader Typography:** Multi-layer metallic gradient text (`EXPLORE MY PORTFOLIO`) with responsive `clamp()` / `vw` font sizing.
- **Hero Portrait Mask:** Centered headshot container masked using CSS `hero-portrait-mask` to layer behind/in-front of oversized typography.
- **Micro-interactions:** Interactive hover states, quick discipline links (`UI/UX`, `Web Design`, `Landing Page`), and directional scroll button.

### 3.2 ScrollExpandMedia (`#about`)
- **Container Height:** `200vh` relative section with a sticky `100dvh` viewport theater.
- **Animation Mechanics:** As the user scrolls vertically through the section, `progress` (0.0 to 1.0) interpolates:
  1. Card width & height expand from initial `300px x 400px` to viewport-filling dimensions matching aspect ratio `1024 / 546` (`~1.875`).
  2. Dual-layer GPU-accelerated unblur: A pre-blurred layer (`filter: blur(18px)`) smoothly fades its opacity to `0` while the sharp base image scales subtly (`1.02` to `1.0`).
  3. Header text split: `ABOUT` translates left (`-textTranslateX vw`) while `ME` translates right (`+textTranslateX vw`) and fades out.
  4. Ambient background image opacity fades out smoothly.
  5. Minimal perimeter content (`#sem-media-content`) fades in, keeping the center 100% unobscured.

### 3.3 Experience Horizontal Spatial Canvas (`#experience`)
- **Container Height:** `280vh` scroll track with a sticky `100dvh` theater.
- **Camera Physics:** Translates vertical scroll distance into horizontal stage displacement (`translate3d(X px, 0, 0)`) across a `290vw` canvas with smooth lerp inertia (`0.09` factor).
- **Parallax Layers:**
  - Background dual tickers drifting horizontally in opposite directions.
  - Giant background year typography (`2023`, `2024`, `2025`, `2026`) with differential parallax factors (`0.15`).
  - Minimalist top HUD bar with real-time phase indicator (`ORIGIN & FOUNDATIONS` → `SELF-DIRECTED LEARNING` → `FREELANCE / INDEPENDENT`) and hairline progress bar.
  - Interactive milestone cards with expandable details and bottom jump pills.

### 3.4 FlexCarousel — Liquid WebGL Carousel (`#projects`)
- **Renderer:** OGL WebGL engine rendering planar meshes with custom liquid distortion shaders.
- **Interactive States:** Click to focus card, drag gestures with inertia, liquid ripple dispersion (`lensWidth: 0.74`, `lensHeight: 1.18`, `dispersion: 0.45`).
- **Modal Hook:** Clicking a card triggers `onSelect(index, item)`, opening the detailed Glassmorphic Project Inspection Modal (`#project-modal`).

### 3.5 WorksWheel — 3D Cylindrical Drum Reel (`#landing-pages`)
- **Projection Mathematics:** Calculates radial 3D coordinates for cards arranged along a cylindrical drum (`rotateX`, `rotateZ`, `translateZ`) with perspective lens (`LENS = 2.7`, `DRUM = 2.22`).
- **Interactions:** Mouse drag, touch swipe, wheel scroll, and Prev/Next button controls.
- **Modal Hook:** Clicking any card opens `#project-modal` with complete metadata (deliverables, tools, statistics, live URL).

### 3.6 Services Bento & Accordion (`#services`)
- Multi-row interactive accordion (`toggleService(index)`) showcasing service disciplines, deliverables, and quick inquiry buttons linking to the contact modal.

### 3.7 Project Inspection & Contact Modals
- **Project Detail Modal (`#project-modal`):** Glassmorphic overlay with dynamic injection of category, title, preview media, description, key deliverables list, technology badges, and "Visit Live Website" CTA.
- **Contact Form Modal (`#contact-modal`):** Full inquiry form with name, email, service selection dropdown, message area, and toast feedback.

---

## 4. Personal Profile Synthesis (K.M. Siam)

| Category | Information / Details | Source |
|---|---|---|
| **Full Name** | K.M. Siam (Khandakar Mohammad Siam) | Existing Portfolio, CV, University Reports |
| **Headline / Role** | Machine Learning & Full-Stack Engineer \| CSE Student | CV V2 & Existing Portfolio (`kmsiam.vercel.app`) |
| **Academic Degree** | B.Sc. in Computer Science & Engineering (2023 - Present, Expected 2027) | Southeast University, Dhaka (Student ID: `2023100000603`) |
| **Previous Education** | Higher Secondary Certificate (Science, GPA: 3.83/5.00, 2020 - 2022) | Barishal City College, Barishal |
| **Current / Past Experience** | **Machine Learning Engineering Intern** at FlyRank (`FL-GAIF-2026-0603`)<br>**Lead Android Developer** at HomZen (2025 - 2026) | Verified Credential, FlyRank Capstone, HomZen APK |
| **Location** | Tejgaon, Dhaka, Bangladesh (East Nakhalpara) | CV V2 & Contact Form |
| **Email** | `kmsiam2019@gmail.com` | CV V2 & Portfolio Code |
| **Phone** | `+880 1853086380` | CV V2 & Existing Portfolio |
| **GitHub** | `https://github.com/KMSiam` | GitHub Profile & Repos |
| **LinkedIn** | `https://www.linkedin.com/in/km-siam-973723291/` | LinkedIn Profile |
| **Twitter / X** | `https://x.com/KMSiam15` | Twitter Profile |
| **Instagram** | `https://www.instagram.com/k.m.siam15` | Instagram Profile |
| **Certifications** | Cisco Certified: Introduction to Cybersecurity (Apr 26, 2026)<br>FlyRank AI Verified Credential (`FL-GAIF-2026-0603`) | PDF Credentials on E: drive |

---

## 5. Comprehensive Project Discovery Across E: Drive

### 5.1 Machine Learning & AI Research

1. **AI-Generated Face Detection via Transfer Learning with Lightweight CNNs**
   - **Type:** Published / Academic Conference Research Paper & Implementation
   - **Location:** `E:\PYTHON_PROJECT_&_RECHARCH\AI_Recharch\`
   - **Paper PDF:** `Detection_of_AI_Generated_Faces_via_Transfer_Learning_with_Lightweight_CNNs__A_Digital_Forensics_Perspective.pdf`
   - **GitHub:** `https://github.com/KMSiam/AI_Research_Paper`
   - **Tech Stack:** Python 3.10+, TensorFlow / Keras, MobileNetV2, InceptionV3 / GoogLeNet, StyleGAN2 dataset, NumPy, Matplotlib.
   - **Highlights:** Evaluated lightweight architectures for digital forensics; MobileNetV2 achieved **90.0% real-world generalization** on unseen synthetic faces (vs. 60% for GoogLeNet) with an 11 MB model footprint and 8.2ms inference time.

2. **FlyRank ML Capstone: Content Refresh & Search Decay Prediction**
   - **Type:** Industry Machine Learning Internship Capstone
   - **Location:** `E:\FlyRank\flyrank-ml-internship-starter\`
   - **Report:** `work\capstone_report.md` & `work\figures\`
   - **GitHub:** `https://github.com/KMSiam/Flyrank-Internship-ML`
   - **Live Site:** `https://kmsiam.github.io/Flyrank-Internship-ML/`
   - **Credential:** FlyRank Verified Credential `FL-GAIF-2026-0603`
   - **Tech Stack:** Python, HistGBDT (Scikit-Learn), Pandas, NumPy, GroupShuffleSplit, Search Console telemetry.
   - **Highlights:** Processed 30,000 URLs across 79M rows of search telemetry. Replaced static staleness heuristics with an interpretable HistGBDT model achieving **Precision@10 of 90.0%** and **Precision@20 of 90.0%** (outperforming baseline by +70 pp) without cross-domain leakage.

3. **Holographic Gesture Interface**
   - **Type:** Computer Vision & Human-Computer Interaction
   - **Location:** `E:\PythonProject\` (`holographic_interface.py`)
   - **Tech Stack:** Python, OpenCV, MediaPipe, NumPy.
   - **Highlights:** Futuristic Iron Man / Matrix style HUD gesture interface tracking webcam hand movements to draw glowing mid-air trails, manipulate UI nodes, and trigger actions.

### 5.2 Full-Stack & Web Engineering

4. **NexMess — Next-Generation Real-Time Mess Management System**
   - **Type:** Production-Grade Academic Capstone Project (CSE 472 - Web & Internet Programming)
   - **Location:** `E:\VS Code\Web\NexMess` & `E:\VS Code\Web\nexmess-next`
   - **Documentation:** `E:\VS Code\Web\2023100000603_CSE471_Assignment.md`, `E:\VS Code\NexMess_Report.pdf`
   - **Screenshots:** 20+ pristine UI captures in `E:\VS Code\Web\NexMess\NexMess_Report\`
   - **GitHub:** `https://github.com/KMSiam/NexMess.git`
   - **Live Demo:** `https://nex-mess.vercel.app/`
   - **Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, Supabase (PostgreSQL with RLS, GoTrue Auth, Realtime WebSockets, Storage), Deno Edge Functions, PWA Web Push notifications.
   - **Highlights:** Multi-tenant shared living management with meal scheduling deadlines, automated expense ledger, and a **greedy debt settlement algorithm** minimizing net cash settlements.

5. **CivicPulse — AI-Powered Civic Incident Management & Triage Platform**
   - **Type:** Hackathon Project (AI & API Hackathon 2026 — IEEE Computer Society, SEU Chapter)
   - **Location:** `E:\VS Code\Web\Civic-Pulse`
   - **Documentation:** `E:\VS Code\Web\Civic-Pulse\PROJECT_DESCRIPTION.md`, `docs/ARCHITECTURE.md`
   - **GitHub:** `https://github.com/fardinhossain/Civic-Pulse_AI_API_Hackathon_2026`
   - **Live Demo:** `https://civicpulseai.vercel.app`
   - **Tech Stack:** Next.js 14 (App Router), TypeScript, PostgreSQL with **pgvector**, Drizzle ORM, Leaflet mapping, Tailwind CSS, Zod validation.
   - **Highlights:** Automated citizen issue triage via a 3-tier resilient AI fallback chain (**Gemini 3.5 Flash → Groq Llama-3.3 70B → OpenRouter DeepSeek V3**), semantic 768-dim duplicate detection, and automated smart routing to 11 city municipal departments.

6. **CrisisDesk AI — Emergency Incident Dispatch & Deduplication Engine**
   - **Type:** Hackathon Project (Team SEU Pirates)
   - **Location:** `E:\HackThon1\CrisisDesk` & `E:\HackThon1\CrisisDeskAi`
   - **Documentation:** `E:\HackThon1\Team_SEU_Pirates_CrisisDeskAI_API_Report.pdf`
   - **GitHub:** `https://github.com/KMSiam/CrisisDesk.git` (Demo) / `https://github.com/fardinhossain/CrisisDeskAI.git` (API)
   - **Live Demo:** `https://crisisdesk.vercel.app/`
   - **Swagger Docs:** `https://crisisdesk-ai-jczo.onrender.com/docs/`
   - **Video Demo:** `https://youtu.be/1ggtanUGbcY`
   - **Tech Stack:** Node.js, Express, Prisma ORM, Neon Serverless PostgreSQL, Nominatim Geocoder, Open-Meteo Weather API, Resend Email API, 3-tier AI fallback.
   - **Highlights:** Critical emergency management system featuring hybrid heuristic & cosine similarity duplicate detection, real-time dispatch alerts, and emergency triage.

7. **FacultyReview — Professor Rating & Course Evaluation Platform**
   - **Type:** Full-Stack Academic & Community Web Application
   - **Location:** `E:\VS Code\Web\Faculty-Review-main`
   - **Screenshots:** `E:\VS Code\Web\images\FacultyReview.png`
   - **Live Demo:** `https://facultyreview-bd.vercel.app/`
   - **Tech Stack:** React (Vite), Tailwind CSS, Node.js, Express, JWT, MongoDB Atlas, Lucide Icons.
   - **Highlights:** University professor directory with detailed rating metrics, difficulty scoring, student testimonials, and responsive dark-mode UI.

8. **StreamWeb — Responsive Multimedia Streaming Platform**
   - **Type:** Interactive Web Application
   - **Location:** `E:\VS Code\Web\Movie_page`
   - **Screenshots:** `E:\VS Code\Web\images\StreamWeb.png`
   - **Live Demo:** `https://streamweb-bd.vercel.app/`
   - **Tech Stack:** HTML5, CSS3, JavaScript ES6+, Supabase Authentication & Realtime database.
   - **Highlights:** Seamless streaming interface with media catalog, user watchlists, responsive media queries, and cloud-synced state.

### 5.3 Mobile & UI/UX Design

9. **HomZen — Smart Home Automation & Multi-Service Mobile Platform**
   - **Type:** Native Android Application & Full UI/UX Design System
   - **Location:** `E:\AndroidStudioProjects\HomZen\`
   - **Production APK:** `E:\AndroidStudioProjects\HomZen\app\release\app-release.apk` (17.5 MB)
   - **Figma Community File:** `https://www.figma.com/community/file/1565414662140521763`
   - **GitHub:** `https://github.com/KMSiam/HomZen`
   - **Screenshots:** `E:\VS Code\Web\images\HomZen.png`, `HomZenFigma.png`
   - **Tech Stack:** Java, Android SDK, Firebase Authentication, Cloud Firestore (Batch Sync), Google Maps & Location APIs, Figma.
   - **Highlights:** Role as Lead Android Developer; architected modular UI components increasing reusability by 50%, implemented Firestore batch synchronization, and designed the full Figma UI design system.

10. **Mobile Banking Management System**
    - **Type:** Java Desktop Application
    - **Location:** `E:\JavaFX Project\MobileBanking\`
    - **Documentation:** `Mobile Banking Proposal Report.docx`
    - **Screenshots:** `E:\VS Code\Web\images\MobileBanking.png`
    - **Tech Stack:** Java, JavaFX, Object-Oriented Design patterns, MySQL.

---

## 6. Strategic Curation for the New Portfolio

To align with the template's dual-carousel architecture:

### Section A: FlexCarousel (Liquid 3D Showcase — 6 Flagship Projects)
1. **NexMess** — Real-time mess management system (React 19, Supabase, Zustand, PWA)
2. **CivicPulse** — AI-powered civic issue triage & vector deduplication (Next.js 14, pgvector, Gemini/Groq)
3. **AI Face Forensics** — Transfer learning lightweight CNN paper (MobileNetV2, 90% generalization)
4. **FlyRank ML Engine** — Search decay prediction & content triage (HistGBDT, Precision@10 90%)
5. **HomZen** — Smart home automation Android application (Java, Firestore, Google Maps)
6. **FacultyReview** — Professor rating community platform (React, Node.js, MongoDB Atlas)

### Section B: WorksWheel (3D Drum Reel — Interactive & Case Study Deep Dives)
1. **CrisisDesk AI** — Emergency incident dispatch engine (Prisma, Neon, AI Fallback, Resend)
2. **HomZen UI/UX System** — Figma Community architectural design system
3. **StreamWeb** — Responsive multimedia streaming platform (Supabase, JS ES6+)
4. **Holographic Gesture HUD** — Computer vision hand tracking interface (OpenCV, MediaPipe)
5. **Mobile Banking System** — Desktop financial management system (JavaFX, OOP)
6. **FlyRank UX/UI Case Study** — Enterprise AI workspace design system & developer handoff

---

## 7. Implementation Status & Progress Log

- [x] Complete codebase and drive investigation
- [x] Compile `PROJECT_CONTEXT.md` knowledge base
- [x] Extract and integrate real high-resolution project visual assets, screenshots, and diagrams
- [x] Update core component engines (`flex-carousel.js`, `works-wheel.js`, `experience-section.js`)
- [x] Personalize `index.html`:
  - Head metadata, OpenGraph, title, canonical URLs
  - Navigation wordmark (`SIAM.`), CV download link, social endpoints
  - Hero section, portrait mask, pitch, and technical disciplines
  - About section metrics, SEU CSE credentials, and bio
  - Experience horizontal timeline milestones (2020-2026)
  - Services bento & accordion (Machine Learning, Full-Stack, Mobile/UI)
  - Footer with "LET'S TALK", email pill, socials, and clean credits bar (removed verification badge)
  - Updated contact modal form with service dropdown options and mailto handler
  - Purged obsolete e-commerce relics (cart modal, cart JS functions, test buttons)
- [x] Complete `README.md` documenting K.M. Siam's portfolio, stack, projects, and attribution
- [x] Configure Git remote to `https://github.com/KMSiam/My_Portfolio.git`
- [x] Rewrote Git commit tree to orphan root commit (100% KMSiam sole author/contributor)
- [x] Implemented multi-tier contact form dispatch (`/api/send` Vercel function -> Formspree gateway -> mailto client)
- [x] Prepared production deployment configurations (`vercel.json`, `.nojekyll`, `404.html`)
- [x] Deployed and synchronized with GitHub Pages on `https://github.com/KMSiam/My_Portfolio.git`
