# Shreyas Naik — Personal Developer Portfolio System

A modern, data-driven personal developer portfolio built for **Shreyas Naik**, Computer Science & Engineering student at JNN College of Engineering (Class of 2027) in Karnataka, India.

Designed with a strict **Data-Driven Architecture** (`DATA -> COMPONENTS -> UI`), allowing you to continuously edit, expand, and maintain your portfolio throughout your engineering degree without ever modifying React UI components.

---

## 🌟 Key Highlights

- **Data-Driven Architecture**: The entire website is powered by a single centralized source of truth: `src/data/portfolio.ts`.
- **Zero Fabrication**: Authentic data reflecting real academic coursework, verified learning tracks, and real projects (**FarmGrid** and **RoutineX**).
- **Interactive Local Developer Editor (`/edit`)**: An in-browser editor allowing you to add, modify, duplicate, or delete projects, skills, education records, and milestones in real time.
- **1-Click Code Export**: Generates the exact TypeScript code to commit into `src/data/portfolio.ts` with a single click.
- **Dynamic Case Studies (`/project/:id`)**: Comprehensive project case study pages generated dynamically from your project data (Problem, Solution, Architecture, Key Features, Engineering Challenges, What I Learned).
- **Automatic Content Hiding**: Empty sections (e.g., Certifications, Achievements) and missing fields (e.g., live URLs, phone numbers) hide automatically with no broken cards or undefined links.
- **Recruiter Snapshot**: A dedicated glanceable module summarizing degree, graduation year, core focus areas, and verified technical readiness.
- **Theme System**: Premium dark theme by default, with instant support for light and system modes.
- **Production Optimized**: Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion with lazy code-splitting.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (TypeScript) |
| **Build Tool & Bundler** | Vite 8 with code-splitting |
| **Styling & Design System** | Tailwind CSS v4 (Zinc / Emerald palette) |
| **Animations** | Framer Motion (respects `prefers-reduced-motion`) |
| **Icons** | Lucide React + custom SVG icons |
| **Routing** | React Router v7 |
| **Data Architecture** | Centralized TypeScript state + LocalStorage |

---

## 📂 Project Structure

```
shreyas-portfolio/
├── public/
│   ├── favicon.svg             # Monogram favicon (SN)
│   └── resume.pdf              # Your downloadable PDF resume
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.tsx          # Sticky navigation with section observer
│   │   ├── Hero.tsx            # Minimal hero with status badge & CTAs
│   │   ├── RecruiterSnapshot.tsx # Key facts for technical recruiters
│   │   ├── About.tsx           # Technical pillars & engineering philosophy
│   │   ├── Skills.tsx          # Categorized skills with self-assessed progress
│   │   ├── LearningProgress.tsx# Active learning tracks (DSA, React, SQL, etc.)
│   │   ├── Projects.tsx        # Project directory with category filter & search
│   │   ├── ProjectCard.tsx     # Card with fallback graphics & safe links
│   │   ├── Experience.tsx      # Academic projects, labs & hackathons
│   │   ├── Education.tsx       # JNNCE, B.E. in CSE (2023–2027)
│   │   ├── Certifications.tsx  # Auto-hidden when empty
│   │   ├── Achievements.tsx    # Auto-hidden when empty
│   │   ├── Journey.tsx         # Chronological milestones timeline
│   │   ├── CodingProfiles.tsx  # GitHub, LeetCode, HackerRank, CodeChef
│   │   ├── Contact.tsx         # Verified contact card & form with mailto fallback
│   │   ├── Footer.tsx          # Minimal footer with quick links
│   │   ├── ThemeToggle.tsx     # Dark / Light / System switcher
│   │   └── SocialIcons.tsx     # Optimized SVG social icons
│   │
│   ├── context/
│   │   ├── PortfolioContext.tsx# State management, CRUD & code export
│   │   └── ThemeContext.tsx    # Multi-theme provider
│   │
│   ├── data/
│   │   └── portfolio.ts        # ⭐️ CENTRAL SOURCE OF TRUTH
│   │
│   ├── types/
│   │   └── portfolio.ts        # Strict TypeScript type contracts
│   │
│   ├── pages/
│   │   ├── Home.tsx            # Complete single-page portfolio
│   │   ├── ProjectDetails.tsx  # Dynamic deep-dive case study page
│   │   └── EditPortfolio.tsx   # Local developer editor dashboard
│   │
│   ├── App.tsx                 # Route declarations with Suspense lazy loading
│   ├── main.tsx                # Entry mount
│   └── index.css               # Tailwind CSS v4 directives & typography
│
├── docs/
│   └── EDITING_GUIDE.md        # Beginner guide: update your site in 5 minutes
├── index.html                  # SEO & OpenGraph meta tags
├── vite.config.ts              # Vite + Tailwind v4 config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm (v10+ recommended)

### 1. Installation

```bash
# Navigate to project directory
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

This compiles your TypeScript and outputs a minified, code-split production bundle into the `dist/` directory.

---

## ⚡ How to Update Your Portfolio in 5 Minutes

You can update your portfolio using either the **Code-First Method** (recommended for Git) or the **In-Browser Editor**.

### Method A: Code-First (`src/data/portfolio.ts`)

Open [`src/data/portfolio.ts`](./src/data/portfolio.ts). It contains clearly marked sections:

```typescript
// 1. To update your headline or bio:
profile: {
  headline: "Your new headline...",
  bio: "Your updated bio...",
  statusAvailability: "Available for Summer 2026 Internships"
}

// 2. To add a new skill:
skills: [
  // ...
  { id: "sk-docker", name: "Docker", category: "Tools & Platforms", level: 60, currentlyLearning: true }
]

// 3. To update your CGPA:
education: [
  {
    institution: "JNN College of Engineering (JNNCE)",
    cgpa: "8.9", // Update here
    // ...
  }
]
```

Save the file, and Vite will hot-reload your updates instantly!

---

### Method B: In-Browser Local Developer Editor (`/edit`)

1. Start the app (`npm run dev`) and visit `http://localhost:5173/edit` (or click **Editor** in the navbar).
2. Use the left sidebar to navigate to **Projects**, **Skills**, **Contact**, **Education**, etc.
3. Make changes, add items, or test new project entries.
4. Changes save to your browser's **LocalStorage** in real time.
5. Click **"Live Preview"** to inspect your updates on the actual site.
6. When satisfied, click the green **"Export Code"** button in the top bar.
7. Paste the copied code into `src/data/portfolio.ts` to make your changes permanent.

---

## 📋 Step-by-Step Maintenance Guide

### How to Add a New Project

In `src/data/portfolio.ts`, add an object to the `projects` array:

```typescript
{
  id: "my-new-project",
  title: "My New Project",
  shortDescription: "One-sentence overview for the card.",
  fullDescription: "Detailed case study description explaining the motivation and architecture.",
  category: "Full Stack", // "Full Stack" | "Web" | "Data" | "Other"
  status: "Completed",    // "In Progress" | "Completed" | "Planned"
  date: "2026",
  technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  features: [
    "Feature 1: Real-time synchronization",
    "Feature 2: JWT role authentication"
  ],
  challenges: "Describe the hardest engineering challenge faced...",
  solution: "Explain how you solved it architecturally...",
  learning: "Key technical takeaways...",
  githubUrl: "https://github.com/shreyasnaik/my-new-project",
  liveUrl: "", // Leave blank if not deployed
  image: "",   // Leave blank for a clean SVG topology graphic
  screenshots: [],
  architecture: "Client (React) <-> REST API (Express) <-> PostgreSQL Database",
  demoVideo: "",
  featured: true,
  teamSize: "Solo Builder",
  role: "Full-Stack Developer"
}
```

The new project will automatically appear on the Home page and generate its own dedicated Case Study page at `/project/my-new-project`.

---

### How to Replace Your Resume

1. Export your latest resume as a PDF file.
2. Rename it to `resume.pdf`.
3. Copy it into the `public/` directory, replacing `public/resume.pdf`.
4. All "Download Resume" and "View Resume" buttons across the site will immediately serve your updated document.

---

### How to Add Certifications or Achievements

By default, `certifications: []` and `achievements: []` are empty arrays in `src/data/portfolio.ts`. Because of the zero-fabrication design, these sections are completely hidden from the public view until you add real credentials.

To display them, add an entry:

```typescript
certifications: [
  {
    id: "cert-aws",
    name: "AWS Certified Cloud Practitioner",
    organization: "Amazon Web Services",
    date: "2026",
    credentialId: "AWS-12345",
    certificateUrl: "https://aws.amazon.com/verification/..."
  }
]
```

As soon as at least one item is present, the section renders automatically.

---

## 🌐 Deployment Guide

### Deploying to Vercel (Recommended)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**. Vercel will automatically build and publish your site with HTTPS and global CDN caching.

---

## 📄 License

MIT License. Designed and engineered for **Shreyas Naik**.
