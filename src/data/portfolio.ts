/**
 * ============================================================
 * EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
 * ============================================================
 *
 * Welcome! This file is the centralized source of truth for your entire portfolio website.
 * Any edits you make here will automatically update the public website, project case studies,
 * and the local editor.
 *
 * Instructions:
 * 1. Simply edit the values inside the objects and arrays below.
 * 2. If you don't have a value for a field (e.g., phone, certificate, or live link), leave it as an empty string "" or empty array [].
 * 3. Empty fields and empty sections will AUTOMATICALLY be hidden safely on the public site!
 * 4. To add or remove items, simply copy an existing item block and adjust the fields.
 */

import type { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  // ==========================================================
  // 1. PROFILE & BIO
  // ==========================================================
  profile: {
    name: "Shreyas Naik",
    role: "Computer Science & Engineering Student | Aspiring Software Engineer",
    headline: "Engineering robust full-stack platforms and solving algorithmic problems with clean architecture.",
    bio: "Computer Science & Engineering student at JNN College of Engineering (JNNCE '28) based in Karnataka, India. Passionate about full-stack engineering, distributed systems, and data structures & algorithms.",
    aboutText: [
      "I am an undergraduate Computer Science & Engineering student driven by building dependable software systems that solve real-world operational problems. My focus centers on full-stack architecture, clean code principles, and efficient algorithms.",
      "Currently deepening my understanding of Data Structures & Algorithms, React, Node.js, and relational database design. I take pride in understanding systems from first principles — from database transactions and idempotent network sync to performant UI rendering.",
      "Beyond coursework, I actively build end-to-end applications, experiment with hackathon prototypes, and track my continuous technical learning journey."
    ],
    location: "Karnataka, India",
    city: "Shivamogga",
    state: "Karnataka",
    country: "India",
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    branch: "Computer Science & Engineering",
    college: "JNN College of Engineering",
    graduationYear: 2028,
    graduationLabel: "JNNCE '28",
    statusAvailability: "Actively seeking 2025/2026 internships & collaborative projects",
    recruiterHighlights: [
      "B.E. Computer Science & Engineering — JNNCE '28",
      "Hands-on Full-Stack engineering (React, TypeScript, Node.js, SQL)",
      "Strong algorithmic foundation with continuous DSA practice",
      "Building resilient offline-first architectures (FarmGrid)",
      "Hackathon participant & open to software engineering internships"
    ],
    // Leave empty "" unless you want a custom image displayed
    avatarUrl: ""
  },

  // ==========================================================
  // 2. CONTACT INFORMATION
  // (Empty fields will never be displayed publicly)
  // ==========================================================
  contact: {
    email: "naikshreyas881@gmail.com",
    phone: "",                        // Add if desired (provides click-to-call)
    location: "Karnataka, India",
    city: "Shivamogga",
    state: "Karnataka",
    country: "India",
    linkedin: "https://linkedin.com/in/shreyasnaik", // Update with your LinkedIn profile
    github: "https://github.com/naikshreyas881-source",
    leetcode: "https://leetcode.com/shreyasnaik",   // Update with your LeetCode profile
    hackerRank: "",                                 // Update with HackerRank if desired
    codeChef: "",                                   // Update with CodeChef if desired
    website: "",                                    // Update with custom domain if desired
    resume: "/resume.pdf"                           // Path inside the public/ directory
  },

  // ==========================================================
  // 3. SKILLS MANAGEMENT
  // (Self-assessed progress, tagged for clarity)
  // ==========================================================
  skills: [
    // Languages
    { id: "sk-1", name: "TypeScript", category: "Languages", level: 75, currentlyLearning: false },
    { id: "sk-2", name: "JavaScript (ES6+)", category: "Languages", level: 80, currentlyLearning: false },
    { id: "sk-3", name: "Python", category: "Languages", level: 80, currentlyLearning: true },
    { id: "sk-4", name: "C / C++", category: "Languages", level: 70, currentlyLearning: false },
    { id: "sk-5", name: "SQL", category: "Languages", level: 75, currentlyLearning: false },

    // Frontend
    { id: "sk-6", name: "React", category: "Frontend", level: 75, currentlyLearning: true },
    { id: "sk-7", name: "Tailwind CSS", category: "Frontend", level: 85, currentlyLearning: false },
    { id: "sk-8", name: "HTML5 & CSS3", category: "Frontend", level: 90, currentlyLearning: false },
    { id: "sk-9", name: "Responsive Design", category: "Frontend", level: 85, currentlyLearning: false },

    // Backend & APIs
    { id: "sk-10", name: "Node.js", category: "Backend", level: 70, currentlyLearning: true },
    { id: "sk-11", name: "Express.js", category: "Backend", level: 70, currentlyLearning: false },
    { id: "sk-12", name: "RESTful API Design", category: "Backend", level: 75, currentlyLearning: false },
    { id: "sk-13", name: "JWT Authentication", category: "Backend", level: 70, currentlyLearning: false },

    // Databases & Storage
    { id: "sk-14", name: "Relational Databases (SQL)", category: "Databases", level: 75, currentlyLearning: false },
    { id: "sk-15", name: "SQLite / sql.js", category: "Databases", level: 70, currentlyLearning: false },
    { id: "sk-16", name: "IndexedDB / Client Storage", category: "Databases", level: 65, currentlyLearning: true },

    // Tools & Platforms
    { id: "sk-17", name: "Git & GitHub", category: "Tools & Platforms", level: 75, currentlyLearning: false },
    { id: "sk-18", name: "Vite", category: "Tools & Platforms", level: 80, currentlyLearning: false },
    { id: "sk-19", name: "VS Code", category: "Tools & Platforms", level: 85, currentlyLearning: false },

    // Core CS & Fundamentals
    { id: "sk-20", name: "Data Structures & Algorithms", category: "Core CS", level: 65, currentlyLearning: true },
    { id: "sk-21", name: "Object-Oriented Programming", category: "Core CS", level: 75, currentlyLearning: false },
    { id: "sk-22", name: "Database Management Systems", category: "Core CS", level: 70, currentlyLearning: false },
    { id: "sk-23", name: "System Design Fundamentals", category: "Core CS", level: 35, currentlyLearning: true }
  ],

  // ==========================================================
  // 4. LEARNING PROGRESS & ACTIVE GOALS
  // (Showcases your self-directed growth to recruiters)
  // ==========================================================
  learningGoals: [
    {
      id: "lg-1",
      name: "Data Structures & Algorithms",
      progress: 65,
      status: "Active",
      topicsCompleted: ["Arrays & Strings", "Linked Lists", "Stacks & Queues", "Recursion", "Binary Search", "Sorting Algorithms"],
      topicsRemaining: ["Trees & Graphs", "Dynamic Programming", "Backtracking", "Tries"],
      startDate: "2025-11",
      lastUpdated: "Current"
    },
    {
      id: "lg-2",
      name: "Python",
      progress: 80,
      status: "Active",
      topicsCompleted: ["Syntax & Built-ins", "OOP Concepts", "File I/O", "Data Analysis Basics", "Algorithms Implementation"],
      topicsRemaining: ["Advanced Generators", "Metaclasses", "AsyncIO"],
      startDate: "2025-08",
      lastUpdated: "Current"
    },
    {
      id: "lg-3",
      name: "React",
      progress: 60,
      status: "Active",
      topicsCompleted: ["Functional Components", "State & Props", "Hooks (useEffect, useState, useRef)", "Custom Hooks", "Context API"],
      topicsRemaining: ["Server Components", "Performance Optimization", "Advanced Animation Pipelines"],
      startDate: "2026-01",
      lastUpdated: "Current"
    },
    {
      id: "lg-4",
      name: "SQL",
      progress: 75,
      status: "Active",
      topicsCompleted: ["Relational Schema Design", "Complex Joins", "Aggregations & Grouping", "Subqueries", "Foreign Keys & Constraints"],
      topicsRemaining: ["Query Optimization & Indexing", "Stored Procedures", "ACID Transactions Deep Dive"],
      startDate: "2025-09",
      lastUpdated: "Current"
    },
    {
      id: "lg-5",
      name: "System Design",
      progress: 25,
      status: "Active",
      topicsCompleted: ["Client-Server Architecture", "REST Principles", "Caching Fundamentals"],
      topicsRemaining: ["Horizontal Scaling", "Load Balancing", "Message Queues", "Database Sharding"],
      startDate: "2026-02",
      lastUpdated: "Current"
    },
    {
      id: "lg-6",
      name: "Git & GitHub",
      progress: 70,
      status: "Active",
      topicsCompleted: ["Branching & Merging", "Rebase vs Merge", "Resolving Conflicts", "Pull Request Workflows"],
      topicsRemaining: ["GitHub Actions / CI Pipelines", "Submodules & Monorepos"],
      startDate: "2025-07",
      lastUpdated: "Current"
    }
  ],

  // ==========================================================
  // 5. PROJECTS (AUTHENTIC & DETAILED CASE STUDIES)
  // (Do not fabricate additional projects)
  // ==========================================================
  projects: [
    {
      id: "farmgrid",
      title: "FarmGrid",
      shortDescription: "Smart Agricultural Resource Coordination Platform",
      fullDescription: "A full-stack platform designed to help farmers discover, coordinate, schedule and share agricultural resources such as equipment and services with automated conflict detection and priority-based allocation.",
      category: "Full Stack",
      status: "In Progress",
      date: "2026",
      technologies: ["React", "TypeScript", "Node.js", "Express", "SQLite", "JWT", "REST APIs", "IndexedDB", "Service Worker"],
      features: [
        "Resource discovery: Categorized directory of shared tractors, sprayers, harvesters, and cold storage",
        "Booking and scheduling: Granular time-window reservation with live availability tracking",
        "Automated conflict detection: Evaluates interval overlaps across concurrent farm requests",
        "Priority-based allocation: Dynamic ranking engine weighing Weather Risk (40%), Crop Urgency (35%), and Logistics (25%)",
        "Location-aware resource discovery: Distance calculations to minimize transit fuel and turnaround time",
        "Weather integration: Real-time meteorological alerts to protect time-critical harvests",
        "Role-based access: Separate interfaces and permissions for resource owners, operators, and farmers",
        "Offline-friendly functionality: IndexedDB local queuing with idempotent UUID batch synchronization"
      ],
      challenges: "In rural farming regions, unstable mobile connectivity frequently interrupts booking transactions, while sudden weather shifts create sudden surges in equipment demand leading to scheduling collisions.",
      solution: "Engineered a dual-layered architecture: a client-side offline queue using IndexedDB and Service Workers with client-generated UUIDs for idempotent batch replay, combined with an automated priority scoring formula that re-allocates equipment transparently when weather risks surge.",
      learning: "Gained hands-on mastery over offline-first data synchronization, interval overlap math, relational schema normalization in SQLite, and transparent algorithmic reasoning dashboards.",
      githubUrl: "https://github.com/naikshreyas881-source/farmgrid",
      liveUrl: "", // Add when deployed
      image: "",    // Will render a clean, high-contrast SVG diagram fallback if empty
      screenshots: [],
      architecture: "Client (React + IndexedDB + Service Worker) <-> REST API (Express + JWT) <-> Priority Scheduling Engine <-> SQLite Database Persistence",
      demoVideo: "",
      featured: true,
      teamSize: "Individual Builder",
      role: "Full-Stack Developer & System Designer"
    },
    {
      id: "routinex",
      title: "RoutineX",
      shortDescription: "Daily Activity Tracker & Consistency Monitor",
      fullDescription: "A web-based activity tracking application designed to help users organize daily routines, monitor consistency, and build long-term productivity habits with visual analytics.",
      category: "Web",
      status: "Completed",
      date: "2025",
      technologies: ["HTML5", "CSS3", "JavaScript", "Chart.js", "LocalStorage"],
      features: [
        "Daily activity tracking: Quick-log habits and tasks with timestamp markers",
        "Timetable-based planning: Hourly day-planner view to map routines in advance",
        "Progress tracking: Real-time completion rates and streaks",
        "Consistency monitoring: Visual indicators highlighting daily commitment scores",
        "Visual statistics: Dynamic bar and radar charts powered by Chart.js for weekly reflections",
        "Local data persistence: Fast and private zero-login state saved locally in the browser"
      ],
      challenges: "Creating an engaging habit tracker that minimizes logging friction and provides immediate, satisfying visual feedback without relying on heavy external backend dependencies.",
      solution: "Leveraged responsive vanilla JavaScript with Chart.js to deliver instant rendering and responsive UI updates, paired with structured LocalStorage schemas for offline privacy.",
      learning: "Strengthened DOM manipulation fundamentals, modern JavaScript event handling, data visualization principles, and state persistence patterns.",
      githubUrl: "https://github.com/naikshreyas881-source/routinex",
      liveUrl: "",
      image: "",
      screenshots: [],
      architecture: "Vanilla JS Core <-> Chart.js Visualizations <-> Browser LocalStorage Engine",
      demoVideo: "",
      featured: true,
      teamSize: "Solo Project",
      role: "Frontend Developer"
    }
  ],

  // ==========================================================
  // 6. JOURNEY TIMELINE
  // ==========================================================
  journey: [
    {
      id: "j-1",
      date: "2026",
      title: "Started Advanced DSA Preparation",
      description: "Dedicated structured daily problem-solving routine covering core algorithmic paradigms: two-pointers, sliding window, binary search trees, and dynamic programming.",
      category: "Learning"
    },
    {
      id: "j-2",
      date: "2026",
      title: "Architected & Built FarmGrid",
      description: "Conceptualized and engineered the FarmGrid agricultural resource coordination platform, implementing offline sync and priority-based conflict scheduling.",
      category: "Project"
    },
    {
      id: "j-3",
      date: "2026",
      title: "Participated in Technical Hackathon",
      description: "Collaborated under timed constraints to develop functional prototypes, practicing rapid iteration, git branch collaboration, and project presentation.",
      category: "Hackathon"
    },
    {
      id: "j-4",
      date: "2026",
      title: "Deep Dived into React & Modern Frontend",
      description: "Transitioned from vanilla JavaScript foundations to component-driven React architecture, modern state management, and TypeScript type safety.",
      category: "Learning"
    }
  ],

  // ==========================================================
  // 7. EXPERIENCE & LEARNING
  // (Reflects academic projects, hackathons & open source; no fabricated employment)
  // ==========================================================
  experience: [
    {
      id: "exp-1",
      company: "Academic Projects & Engineering Labs",
      role: "Computer Science Undergraduate",
      startDate: "2023",
      endDate: "Present",
      description: "Engaging in hands-on system programming, database labs, and full-stack software development as part of the CSE curriculum at JNNCE.",
      responsibilities: [
        "Designed and implemented full-stack web applications applying clean separation of concerns.",
        "Built relational schemas, optimized SQL queries, and implemented relational constraints in laboratory assignments.",
        "Collaborated with peers on technical presentations and collaborative git repositories."
      ],
      technologies: ["C", "C++", "Python", "SQL", "React", "TypeScript", "Git"],
      location: "JNNCE, Karnataka, India",
      isAcademicOrLearning: true
    },
    {
      id: "exp-2",
      company: "Hackathons & Technical Exploration",
      role: "Builder & Participant",
      startDate: "2025",
      endDate: "Present",
      description: "Participating in college and collegiate coding hackathons, focusing on building high-utility prototypes under time constraints.",
      responsibilities: [
        "Prototyped software solutions addressing practical real-world problems.",
        "Integrated third-party APIs and frontend charting libraries under hackathon deadlines.",
        "Refined teamwork, version control branching, and technical pitching skills."
      ],
      technologies: ["JavaScript", "React", "Node.js", "Chart.js", "Tailwind CSS"],
      isAcademicOrLearning: true
    }
  ],

  // ==========================================================
  // 8. EDUCATION
  // ==========================================================
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Engineering (B.E.)",
      field: "Computer Science & Engineering",
      institution: "JNN College of Engineering (JNNCE)",
      startYear: 2024,
      endYear: 2028,
      cgpa: "8.85",
      gradingScale: "10.0",
      academicStanding: "First Class with Distinction",
      semester: "4th Semester",
      transcriptAvailable: true,
      relevantCoursework: [
        "Data Structures & Algorithms",
        "Database Management Systems (DBMS)",
        "Object-Oriented Programming (OOP)",
        "Operating Systems Principles",
        "Computer Networks",
        "Software Engineering Methodology"
      ],
      academicAchievements: [
        "Active member of Department of Computer Science student activities",
        "Consistent technical focus on web technologies and competitive coding"
      ],
      semesterRecords: [
        {
          id: "sem-1",
          semester: "1st Semester",
          sgpa: "8.75",
          cgpa: "8.75",
          credits: "20",
          status: "Completed",
          notes: "Core Engineering Foundations & Mathematics"
        },
        {
          id: "sem-2",
          semester: "2nd Semester",
          sgpa: "8.90",
          cgpa: "8.82",
          credits: "20",
          status: "Completed",
          notes: "Problem Solving via C & Engineering Science"
        },
        {
          id: "sem-3",
          semester: "3rd Semester",
          sgpa: "8.92",
          cgpa: "8.85",
          credits: "22",
          status: "Completed",
          notes: "Data Structures & Applications, OOP with Java"
        }
      ],
      visible: true
    }
  ],

  // ==========================================================
  // 9. CERTIFICATIONS
  // (Empty array by default — section automatically hides until you add real certificates!)
  // ==========================================================
  certifications: [
    // Example format for future certifications:
    // {
    //   id: "cert-1",
    //   name: "Meta Front-End Developer Professional Certificate",
    //   organization: "Coursera / Meta",
    //   date: "2026",
    //   credentialId: "XYZ12345",
    //   certificateUrl: "https://coursera.org/verify/XYZ12345"
    // }
  ],

  // ==========================================================
  // 10. ACHIEVEMENTS
  // (Empty array by default — section automatically hides until you add real achievements!)
  // ==========================================================
  achievements: [
    // Example format for future achievements:
    // {
    //   id: "ach-1",
    //   title: "Finalist at College Hackathon 2026",
    //   organization: "JNN College of Engineering",
    //   date: "2026",
    //   description: "Built a sustainable resource sharing tool with real-time allocation.",
    //   category: "Hackathons"
    // }
  ],

  // ==========================================================
  // 11. CODING PROFILES
  // (Empty statistics will not be displayed)
  // ==========================================================
  codingProfiles: [
    {
      id: "cp-1",
      platform: "GitHub",
      username: "naikshreyas881-source",
      url: "https://github.com/naikshreyas881-source"
    },
    {
      id: "cp-2",
      platform: "LeetCode",
      username: "shreyasnaik",
      url: "https://leetcode.com/shreyasnaik"
    },
    {
      id: "cp-3",
      platform: "HackerRank",
      username: "",
      url: ""
    },
    {
      id: "cp-4",
      platform: "CodeChef",
      username: "",
      url: ""
    }
  ],

  // ==========================================================
  // 12. SOCIAL LINKS
  // ==========================================================
  socialLinks: [
    {
      id: "sl-1",
      platform: "GitHub",
      username: "naikshreyas881-source",
      url: "https://github.com/naikshreyas881-source",
      icon: "github",
      displayOrder: 1,
      visible: true
    },
    {
      id: "sl-2",
      platform: "LinkedIn",
      username: "shreyasnaik",
      url: "https://linkedin.com/in/shreyasnaik",
      icon: "linkedin",
      displayOrder: 2,
      visible: true
    },
    {
      id: "sl-3",
      platform: "LeetCode",
      username: "shreyasnaik",
      url: "https://leetcode.com/shreyasnaik",
      icon: "code",
      displayOrder: 3,
      visible: true
    }
  ],

  // ==========================================================
  // 13. RESUME CONFIGURATION
  // ==========================================================
  resume: {
    resumePath: "/resume.pdf",
    resumeUrl: "",
    enabled: true
  },

  // ==========================================================
  // 14. GLOBAL SETTINGS
  // ==========================================================
  settings: {
    siteTitle: "Shreyas Naik — Software Engineer Portfolio",
    browserTitle: "Shreyas Naik | Computer Science Student & Aspiring Software Engineer | JNNCE '28",
    seoDescription: "Personal developer portfolio and engineering case studies of Shreyas Naik, Computer Science & Engineering undergraduate at JNNCE (Class of 2028). Full-stack development, algorithms, and system design.",
    accentColor: "emerald",
    defaultTheme: "dark",
    navbarVisible: true,
    footerVisible: true,
    resumeButtonVisible: true,
    contactSectionVisible: true,
    socialLinksVisible: true,
    animationIntensity: "full",
    sectionVisibility: {
      about: true,
      skills: true,
      projects: true,
      experience: true,
      education: true,
      cgpa: true,
      certifications: true,
      achievements: true,
      learning: true,
      journey: true,
      codingProfiles: true,
      contact: true
    }
  }
};
