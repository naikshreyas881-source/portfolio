# Shreyas Naik — Premium Personal Developer Portfolio & Local Studio
### Computer Science & Engineering • JNNCE '28 (Class of 2028)

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-teal.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A high-performance, data-driven personal developer portfolio and local editor studio built for **Shreyas Naik**, a Computer Science & Engineering undergraduate at **J.N.N. College of Engineering (JNNCE)**, graduating in **2028 (JNNCE '28)**.

Engineered with a clean, single-source-of-truth architecture (`DATA -> CONTEXT -> COMPONENTS -> UI`) and an integrated **Local Developer Studio** (`/edit`) with 16 modular management interfaces.

---

## 🌟 Key Highlights

- **Data-Driven Architecture**: The entire public portfolio is dynamically populated from `src/data/portfolio.ts` with strict TypeScript contracts in `src/types/portfolio.ts`.
- **Zero Fabrication**: 100% authentic student profile. Features real engineering projects:
  - **FarmGrid** (In Progress) — Decentralized agricultural equipment sharing & micro-rental platform.
  - **RoutineX** (Completed) — Offline-first academic routine & task orchestration engine.
- **Complete Local Developer Studio (`/edit`)**: An in-browser administrative studio featuring 17 specialized sub-routes:
  - `/edit` — Studio dashboard overview and quick actions
  - `/edit/cgpa` — **[NEW]** Cumulative CGPA score, grading scale, classification standing, and semester records CRUD
  - `/edit/profile` — Name, roles, bio, college, graduation year (2028), and status badge
  - `/edit/contact` — Email, phone, location coordinates, and primary handles
  - `/edit/projects` — Project CRUD, case study write-ups, tech tags, and metrics
  - `/edit/skills` — Categorized technical skills, self-assessed progress, and learning tags
  - `/edit/experience` — Academic labs, hackathons, and software engineering experience
  - `/edit/education` — Degree information, institution, coursework, and honors
  - `/edit/certifications` — Industry certifications (auto-hides when empty)
  - `/edit/achievements` — Honors, awards, and hackathon wins (auto-hides when empty)
  - `/edit/learning` — Active study tracks, topics completed, and progress curves
  - `/edit/journey` — Chronological engineering milestones
  - `/edit/coding` — LeetCode, GitHub, HackerRank, CodeChef profile stats
  - `/edit/social` — Customizable social channels and links
  - `/edit/resume` — Resume PDF link and download settings
  - `/edit/settings` — Section visibility switches and default appearance
  - `/edit/backup` — JSON export/import with schema validation, TS code generation, and reset
- **Safety First**: Destructive actions (deletions, resets) require explicit modal confirmation.
- **Dedicated Case Studies (`/projects/:id`)**: Full-page architectural breakdowns detailing the Problem, Solution, Architecture Diagram, Features, Challenges, and Key Learnings.
- **Project Directory (`/projects`)**: Dedicated multi-category filter and live search project catalog.
- **Automated Graceful Hiding**: Unpopulated sections (e.g., Certifications, Achievements, Experience) and optional fields automatically hide without layout breakage.
- **Recruiter Snapshot**: Instant glanceable module highlighting graduation year, degree, and engineering focus.
- **Production Ready**: Zero runtime errors, strict TypeScript mode (`noUnusedLocals`), and Tailwind v4 dark/light themes.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, TypeScript ~6.0 |
| **Build & Tooling** | Vite 8, PostCSS |
| **Styling & Theme** | Tailwind CSS v4 (Zinc / Emerald dark palette) |
| **Animation** | Framer Motion 13 (respects `prefers-reduced-motion`) |
| **Icons** | Lucide React + custom SVG icons for brands (GitHub, LinkedIn, LeetCode) |
| **Routing** | React Router v7 with lazy loading and code-splitting |
| **State & Storage** | React Context API with LocalStorage sync and JSON backup/restore |

---

## 📂 Project Structure

```
shreyas-portfolio/
├── public/
│   ├── favicon.svg             # Clean monogram SVG favicon
│   └── resume.pdf              # Downloadable PDF resume
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.tsx          # Sticky navigation with section observer & dynamic year
│   │   ├── Hero.tsx            # Minimal hero with status badge & CTAs
│   │   ├── RecruiterSnapshot.tsx # Key facts for technical recruiters
│   │   ├── About.tsx           # Technical pillars & engineering philosophy
│   │   ├── Skills.tsx          # Categorized skills with self-assessed progress
│   │   ├── LearningProgress.tsx# Active study tracks (DSA, React, SQL, etc.)
│   │   ├── Projects.tsx        # Project showcase with category filter & live search
│   │   ├── ProjectCard.tsx     # Card with fallback graphics & safe links
│   │   ├── Experience.tsx      # Academic projects, labs & hackathons (auto-hidden if empty)
│   │   ├── Education.tsx       # JNNCE, B.E. in CSE (2024–2028) & curriculum details
│   │   ├── CgpaSection.tsx     # Dedicated Cumulative CGPA score & semester breakdown
│   │   ├── Certifications.tsx  # Auto-hidden when empty
│   │   ├── Achievements.tsx    # Auto-hidden when empty
│   │   ├── Journey.tsx         # Chronological milestones timeline
│   │   ├── CodingProfiles.tsx  # GitHub, LeetCode, HackerRank, CodeChef
│   │   ├── Contact.tsx         # Verified contact card & form with mailto fallback
│   │   ├── Footer.tsx          # Minimal footer with quick links
│   │   ├── ThemeToggle.tsx     # Dark / Light switcher
│   │   ├── SocialIcons.tsx     # Brand SVG icons (GitHub, LinkedIn, LeetCode, Twitter)
│   │   │
│   │   └── editor/             # 18 Modular Local Editor Studio Components
│   │       ├── ConfirmModal.tsx
│   │       ├── EditorSidebar.tsx
│   │       ├── EditorHeader.tsx
│   │       ├── DashboardOverview.tsx
│   │       ├── ProfileEditor.tsx
│   │       ├── ContactEditor.tsx
│   │       ├── ProjectEditor.tsx
│   │       ├── SkillEditor.tsx
│   │       ├── ExperienceEditor.tsx
│   │       ├── EducationEditor.tsx
│   │       ├── CgpaEditor.tsx
│   │       ├── CertificationEditor.tsx
│   │       ├── AchievementEditor.tsx
│   │       ├── LearningEditor.tsx
│   │       ├── JourneyEditor.tsx
│   │       ├── CodingProfileEditor.tsx
│   │       ├── SocialLinksEditor.tsx
│   │       ├── ResumeEditor.tsx
│   │       ├── SettingsEditor.tsx
│   │       └── BackupRestore.tsx
│   │
│   ├── context/
│   │   ├── PortfolioContext.tsx# Centralized CRUD, reordering, export & validation
│   │   └── ThemeContext.tsx    # Dark / light theme provider
│   │
│   ├── data/
│   │   └── portfolio.ts        # ⭐️ Source of truth data
│   │
│   ├── types/
│   │   └── portfolio.ts        # TypeScript interface definitions
│   │
│   ├── pages/
│   │   ├── Home.tsx            # Full single-page public portfolio
│   │   ├── ProjectsPage.tsx    # Dedicated /projects catalog
│   │   ├── ProjectDetails.tsx  # Dynamic deep-dive case study (/projects/:id)
│   │   └── EditPortfolio.tsx   # Local studio shell hosting sub-routes
│   │
│   ├── App.tsx                 # Route hierarchy with Suspense
│   ├── main.tsx                # Entry mount
│   └── index.css               # Tailwind CSS v4 directives
│
├── docs/
│   └── EDITING_GUIDE.md        # Beginner guide: update your site in 5 minutes
├── index.html                  # SEO, OpenGraph, and title tags
├── vite.config.ts              # Vite configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm (v10+ recommended)

### 1. Installation
```bash
# Navigate to the project folder
cd shreyas-portfolio

# Install dependencies
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
Runs `tsc -b && vite build` to generate an optimized production bundle in the `dist/` folder.

---

## ⚡ How to Update Your Portfolio in 5 Minutes

You have two simple ways to update your information:

### Method A: Using the In-Browser Studio (`/edit`)
1. Run `npm run dev` and navigate to `http://localhost:5173/edit` (or click **Editor** in the navigation bar).
2. Choose any section from the sidebar:
   - **Profile**: Change your headline, bio, or status availability.
   - **Projects**: Add a project, modify tech stacks, or write case studies.
   - **Education**: Update your semester records or current CGPA.
   - **Skills**: Add or adjust skill levels and categories.
3. Click **"Save Changes"** in the top bar.
4. Click **"Export TypeScript Code"** (or go to `/edit/backup` -> **"Generate TypeScript Code"**).
5. Click **"Copy Code"** and paste the result into `src/data/portfolio.ts`.
6. Commit your changes to Git!

### Method B: Directly in Code (`src/data/portfolio.ts`)
Open `src/data/portfolio.ts` in your favorite editor. The data is organized into clean objects and arrays:

```typescript
// Example: Updating profile information
export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Shreyas Naik",
    role: "Computer Science Student | Aspiring Software Engineer",
    college: "JNN College of Engineering (JNNCE)",
    graduationYear: 2028,
    graduationLabel: "JNNCE '28",
    statusAvailability: "Undergraduate @ JNNCE • Graduating 2028 (JNNCE '28)",
    // ...
  },
  // ...
};
```
Save the file, and Vite will hot-reload your updates instantly.

---

## 📋 Common Maintenance Tasks

### 1. Adding a Project
To add a new project, add an entry to the `projects` array in `src/data/portfolio.ts` (or use `/edit/projects`):
```typescript
{
  id: "your-project-id",
  title: "Your Project Title",
  shortDescription: "Concise summary for cards and previews.",
  fullDescription: "In-depth overview explaining the architectural design.",
  category: "Full Stack", // "Full Stack" | "Web" | "Data" | "Other"
  status: "Completed",    // "In Progress" | "Completed" | "Planned"
  date: "2026",
  technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  features: ["Feature A", "Feature B"],
  challenges: "Key engineering challenges encountered during development.",
  solution: "Architectural decisions and solutions implemented.",
  learning: "Key technical takeaways and patterns learned.",
  githubUrl: "https://github.com/your-username/repo",
  liveUrl: "",
  featured: true
}
```

### 2. Updating Your CGPA & Semester Records
Update the `education` array in `src/data/portfolio.ts` (or use `/edit/education`):
```typescript
education: [
  {
    id: "edu-jnnce",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science & Engineering",
    institution: "JNN College of Engineering (JNNCE)",
    startYear: 2024,
    endYear: 2028,
    cgpa: "8.95",
    semester: "4th Semester",
    semesterRecords: [
      { semester: "1st Semester", sgpa: "8.80", cgpa: "8.80", status: "Completed" },
      { semester: "2nd Semester", sgpa: "9.05", cgpa: "8.92", status: "Completed" },
      { semester: "3rd Semester", sgpa: "9.00", cgpa: "8.95", status: "Completed" }
    ],
    // ...
  }
]
```

### 3. Replacing Your Resume
1. Export your updated resume as a PDF file named `resume.pdf`.
2. Replace `public/resume.pdf` in your project folder.
3. All "Download Resume" and "View Resume" links across the site will immediately serve the new PDF.

### 4. Backing Up and Restoring Data
- Visit `/edit/backup` to download your full portfolio state as a validated `portfolio-backup.json` file.
- You can restore your data at any time by uploading a previously exported JSON backup.
- If you ever want to revert to factory defaults, click **"Reset to Default Data"** and confirm.

---

## 🌐 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit of Shreyas Naik portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"New Project"**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **"Deploy"**.

### Deploying to Netlify
1. Create a `netlify.toml` or connect your repository on [Netlify](https://www.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add SPA redirect rule in `public/_redirects`:
   ```text
   /*    /index.html   200
   ```

---

## 📄 License & Credits

Built with care for **Shreyas Naik** • Computer Science & Engineering • JNNCE '28.
Released under the [MIT License](LICENSE).
