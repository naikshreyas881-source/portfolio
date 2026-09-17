export type ProjectCategory = 'Web' | 'Full Stack' | 'Data' | 'Other' | string;
export type ProjectStatus = 'In Progress' | 'Completed' | 'Planned' | string;

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  date: string;
  technologies: string[];
  features: string[];
  challenges: string;
  solution: string;
  learning: string;
  githubUrl: string;
  liveUrl: string;
  image: string;
  screenshots: string[];
  architecture: string;
  demoVideo: string;
  featured: boolean;
  teamSize: string;
  role: string;
}

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Tools & Platforms'
  | 'Core CS'
  | string;

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100 (Self-assessed progress)
  currentlyLearning: boolean;
}

export interface LearningGoal {
  id: string;
  name: string;
  progress: number; // 0-100
  status: 'Active' | 'Paused' | 'Completed';
  topicsCompleted: string[];
  topicsRemaining: string[];
  startDate: string;
  lastUpdated: string;
}

export interface JourneyMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'Milestone' | 'Project' | 'Learning' | 'Hackathon' | string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyUrl?: string;
  location?: string;
  isAcademicOrLearning?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  startYear: number | string;
  endYear: number | string;
  cgpa?: string;
  semester?: string;
  semesterCgpa?: string;
  relevantCoursework: string[];
  academicAchievements?: string[];
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  date: string;
  credentialId?: string;
  certificateUrl?: string;
  certificateImage?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  organization?: string;
  date: string;
  url?: string;
  proof?: string;
  category: 'Hackathons' | 'Coding' | 'Academics' | 'Open Source' | 'Technical Events' | string;
}

export interface CodingProfile {
  id: string;
  platform: 'GitHub' | 'LeetCode' | 'HackerRank' | 'CodeChef' | string;
  username: string;
  url: string;
  rating?: string;
  stars?: string;
  solvedProblems?: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  city: string;
  state: string;
  country: string;
  linkedin: string;
  github: string;
  leetcode: string;
  hackerRank: string;
  codeChef: string;
  website: string;
  resume: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  aboutText: string[];
  location: string;
  city: string;
  state: string;
  country: string;
  degree: string;
  college: string;
  graduationYear: number | string;
  statusAvailability: string;
  recruiterHighlights: string[];
  avatarUrl?: string;
}

export interface PortfolioData {
  profile: Profile;
  contact: Contact;
  skills: Skill[];
  projects: Project[];
  learningGoals: LearningGoal[];
  journey: JourneyMilestone[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  achievements: Achievement[];
  codingProfiles: CodingProfile[];
}
