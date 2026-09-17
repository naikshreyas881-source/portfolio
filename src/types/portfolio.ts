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
  problem?: string;
  solution?: string;
  challenges: string;
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
  howItWorks?: string;
  displayOrder?: number;
  visible?: boolean;
}

export type SkillCategory =
  | 'Languages'
  | 'Programming Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Database'
  | 'Tools & Platforms'
  | 'Tools'
  | 'Core CS'
  | 'Computer Science'
  | 'Other'
  | string;

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100 (Self-assessed progress)
  currentlyLearning: boolean;
  description?: string;
  relatedProjects?: string[];
  displayOrder?: number;
  visible?: boolean;
}

export interface LearningGoal {
  id: string;
  name: string;
  progress: number; // 0-100
  status: 'Active' | 'Paused' | 'Completed';
  topicsCompleted: string[];
  topicsRemaining: string[];
  startDate: string;
  targetDate?: string;
  lastUpdated: string;
  notes?: string;
  priority?: 'High' | 'Medium' | 'Low';
  currentlyLearning?: boolean;
  displayOrder?: number;
  visible?: boolean;
}

export interface JourneyMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'Milestone' | 'Project' | 'Learning' | 'Hackathon' | string;
  link?: string;
  image?: string;
  displayOrder?: number;
  visible?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  currentPosition?: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyUrl?: string;
  location?: string;
  isAcademicOrLearning?: boolean;
  displayOrder?: number;
  visible?: boolean;
}

export interface SemesterRecord {
  id: string;
  semester: string;
  cgpa: string;
  sgpa?: string;
  credits?: string;
  status?: string;
  notes?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  startYear: number | string;
  endYear: number | string;
  cgpa?: string;
  gradingScale?: string;
  academicStanding?: string;
  transcriptAvailable?: boolean;
  semester?: string;
  semesterCgpa?: string;
  relevantCoursework: string[];
  academicAchievements?: string[];
  semesterRecords?: SemesterRecord[];
  visible?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  date: string;
  credentialId?: string;
  certificateUrl?: string;
  certificateImage?: string;
  description?: string;
  displayOrder?: number;
  visible?: boolean;
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
  displayOrder?: number;
  visible?: boolean;
}

export interface CodingProfile {
  id: string;
  platform: 'GitHub' | 'LeetCode' | 'HackerRank' | 'CodeChef' | string;
  username: string;
  url: string;
  rating?: string;
  stars?: string;
  solvedProblems?: string;
  rank?: string;
  displayOrder?: number;
  visible?: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
  displayOrder?: number;
  visible?: boolean;
}

export interface ResumeConfig {
  resumePath: string;
  resumeUrl?: string;
  enabled: boolean;
}

export interface SectionVisibility {
  about: boolean;
  skills: boolean;
  projects: boolean;
  experience: boolean;
  education: boolean;
  cgpa?: boolean;
  certifications: boolean;
  achievements: boolean;
  learning: boolean;
  journey: boolean;
  codingProfiles: boolean;
  contact: boolean;
  recruiterSnapshot?: boolean;
}

export type AccentColor = 'emerald' | 'blue' | 'violet' | 'amber' | 'rose' | 'cyan';
export type AppTheme = 'dark' | 'light' | 'system';
export type AnimationIntensity = 'full' | 'subtle' | 'reduced';

export interface GlobalSettings {
  siteTitle: string;
  browserTitle: string;
  seoDescription: string;
  accentColor: AccentColor;
  defaultTheme: AppTheme;
  navbarVisible: boolean;
  footerVisible: boolean;
  resumeButtonVisible: boolean;
  contactSectionVisible: boolean;
  socialLinksVisible: boolean;
  animationIntensity: AnimationIntensity;
  sectionVisibility: SectionVisibility;
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
  branch?: string;
  college: string;
  graduationYear: number | string;
  graduationLabel: string;
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
  socialLinks: SocialLink[];
  resume: ResumeConfig;
  settings: GlobalSettings;
}
