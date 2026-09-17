# ⏱️ How to Update Your Portfolio in 5 Minutes

Welcome! This guide is designed to be beginner-friendly. You do **not** need to know advanced React or touch any component code to update your portfolio.

---

## 🎯 The One File You Need to Know

Everything on your website is controlled by:
📁 `src/data/portfolio.ts`

Whenever you want to add or change something, open that file in VS Code or your favorite editor.

---

## 🚀 Quick Recipe Cheatsheet

### 1. Update Contact Information
Find the `contact` block around line 55:
```typescript
contact: {
  email: "your.real.email@gmail.com",
  phone: "+91 9876543210", // Leave blank "" if you don't want your phone public
  linkedin: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  leetcode: "https://leetcode.com/your-username",
  resume: "/resume.pdf"
}
```
*Note: Any field left as `""` (empty string) will not be shown on the website.*

---

### 2. Update College CGPA or Semester
Find the `education` block:
```typescript
education: [
  {
    id: "edu-1",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science & Engineering",
    institution: "JNN College of Engineering (JNNCE)",
    startYear: 2023,
    endYear: 2027,
    cgpa: "8.92", // <-- Set your CGPA here
    semester: "4th Semester", // <-- Update your current semester
    // ...
  }
]
```

---

### 3. Update Your Learning Progress (DSA, Python, etc.)
Find the `learningGoals` block:
```typescript
{
  id: "lg-1",
  name: "Data Structures & Algorithms",
  progress: 75, // <-- Change percentage (0 to 100)
  status: "Active",
  topicsCompleted: [
    "Arrays & Strings",
    "Linked Lists",
    "Trees & Graphs" // <-- Add newly mastered topics
  ],
  topicsRemaining: [
    "Dynamic Programming"
  ],
  startDate: "2025-11",
  lastUpdated: "March 2026"
}
```

---

### 4. Add a New Project
In the `projects` array, copy and paste this template:
```typescript
{
  id: "my-project-name", // Used in URL: /project/my-project-name
  title: "My Project Name",
  shortDescription: "Short one-liner describing the purpose.",
  fullDescription: "Detailed breakdown for the case study page.",
  category: "Full Stack", // "Full Stack", "Web", "Data", or "Other"
  status: "Completed",    // "In Progress" or "Completed"
  date: "2026",
  technologies: ["React", "Node.js", "SQL"],
  features: [
    "Feature 1 description",
    "Feature 2 description"
  ],
  challenges: "What was difficult about this project?",
  solution: "How did you solve it?",
  learning: "What did you learn while building it?",
  githubUrl: "https://github.com/shreyasnaik/repo-name",
  liveUrl: "", // Leave blank "" if not deployed yet
  image: "",   // Leave blank "" to show the automated SVG graphic
  screenshots: [],
  architecture: "Frontend <-> REST API <-> Database",
  demoVideo: "",
  featured: true,
  teamSize: "Individual",
  role: "Full-Stack Developer"
},
```

---

### 5. Replace Your Resume
1. Save your new resume as `resume.pdf`.
2. Move it to the `public/` folder in your project:
   `shreyas-portfolio/public/resume.pdf`
3. Done! All resume buttons on your portfolio will automatically download the new file.

---

### 6. Using the Interactive Visual Editor (`/edit`)
If you prefer a visual interface instead of editing code:
1. Start your portfolio locally:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173/edit` in your browser.
3. Edit fields with intuitive forms.
4. Preview the changes live.
5. Click **"Export Code"** in the top bar.
6. Paste the code into `src/data/portfolio.ts`.
7. Commit to git!
