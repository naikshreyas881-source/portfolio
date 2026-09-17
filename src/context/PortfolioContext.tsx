import React, { createContext, useContext, useState } from 'react';
import type {
  PortfolioData,
  Profile,
  Contact,
  Project,
  Skill,
  LearningGoal,
  JourneyMilestone,
  ExperienceItem,
  EducationItem,
  Certification,
  Achievement,
  CodingProfile
} from '../types/portfolio';
import { initialPortfolioData } from '../data/portfolio';

const STORAGE_KEY = 'portfolio_custom_data_v1';

interface PortfolioContextType {
  data: PortfolioData;
  hasCustomizations: boolean;
  saveData: (newData: PortfolioData) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  updateContact: (contact: Partial<Contact>) => void;
  // Projects
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  // Skills
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  // Learning Goals
  addLearningGoal: (goal: LearningGoal) => void;
  updateLearningGoal: (id: string, goal: Partial<LearningGoal>) => void;
  deleteLearningGoal: (id: string) => void;
  // Journey
  addJourneyMilestone: (milestone: JourneyMilestone) => void;
  updateJourneyMilestone: (id: string, milestone: Partial<JourneyMilestone>) => void;
  deleteJourneyMilestone: (id: string) => void;
  // Experience
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  // Education
  addEducation: (edu: EducationItem) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  // Certifications
  addCertification: (cert: Certification) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  // Achievements
  addAchievement: (ach: Achievement) => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  // Coding Profiles
  addCodingProfile: (profile: CodingProfile) => void;
  updateCodingProfile: (id: string, profile: Partial<CodingProfile>) => void;
  deleteCodingProfile: (id: string) => void;
  // Controls
  resetToDefaults: () => void;
  exportAsTsCode: () => string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved portfolio data:', e);
    }
    return initialPortfolioData;
  });

  const [hasCustomizations, setHasCustomizations] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  // Save changes to localStorage whenever data changes if modified
  const saveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setHasCustomizations(true);
    } catch (e) {
      console.error('Error saving portfolio data to localStorage:', e);
    }
  };

  const updateProfile = (profileUpdate: Partial<Profile>) => {
    saveData({
      ...data,
      profile: { ...data.profile, ...profileUpdate }
    });
  };

  const updateContact = (contactUpdate: Partial<Contact>) => {
    saveData({
      ...data,
      contact: { ...data.contact, ...contactUpdate }
    });
  };

  // Projects CRUD
  const addProject = (project: Project) => {
    saveData({
      ...data,
      projects: [project, ...data.projects]
    });
  };

  const updateProject = (id: string, projectUpdate: Partial<Project>) => {
    saveData({
      ...data,
      projects: data.projects.map(p => (p.id === id ? { ...p, ...projectUpdate } : p))
    });
  };

  const deleteProject = (id: string) => {
    saveData({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  const duplicateProject = (id: string) => {
    const existing = data.projects.find(p => p.id === id);
    if (!existing) return;
    const duplicated: Project = {
      ...existing,
      id: `${existing.id}-copy-${Date.now().toString().slice(-4)}`,
      title: `${existing.title} (Copy)`,
      featured: false
    };
    saveData({
      ...data,
      projects: [...data.projects, duplicated]
    });
  };

  // Skills CRUD
  const addSkill = (skill: Skill) => {
    saveData({
      ...data,
      skills: [...data.skills, skill]
    });
  };

  const updateSkill = (id: string, skillUpdate: Partial<Skill>) => {
    saveData({
      ...data,
      skills: data.skills.map(s => (s.id === id ? { ...s, ...skillUpdate } : s))
    });
  };

  const deleteSkill = (id: string) => {
    saveData({
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    });
  };

  // Learning Goals CRUD
  const addLearningGoal = (goal: LearningGoal) => {
    saveData({
      ...data,
      learningGoals: [...data.learningGoals, goal]
    });
  };

  const updateLearningGoal = (id: string, goalUpdate: Partial<LearningGoal>) => {
    saveData({
      ...data,
      learningGoals: data.learningGoals.map(g => (g.id === id ? { ...g, ...goalUpdate } : g))
    });
  };

  const deleteLearningGoal = (id: string) => {
    saveData({
      ...data,
      learningGoals: data.learningGoals.filter(g => g.id !== id)
    });
  };

  // Journey CRUD
  const addJourneyMilestone = (milestone: JourneyMilestone) => {
    saveData({
      ...data,
      journey: [milestone, ...data.journey]
    });
  };

  const updateJourneyMilestone = (id: string, milestoneUpdate: Partial<JourneyMilestone>) => {
    saveData({
      ...data,
      journey: data.journey.map(j => (j.id === id ? { ...j, ...milestoneUpdate } : j))
    });
  };

  const deleteJourneyMilestone = (id: string) => {
    saveData({
      ...data,
      journey: data.journey.filter(j => j.id !== id)
    });
  };

  // Experience CRUD
  const addExperience = (exp: ExperienceItem) => {
    saveData({
      ...data,
      experience: [exp, ...data.experience]
    });
  };

  const updateExperience = (id: string, expUpdate: Partial<ExperienceItem>) => {
    saveData({
      ...data,
      experience: data.experience.map(e => (e.id === id ? { ...e, ...expUpdate } : e))
    });
  };

  const deleteExperience = (id: string) => {
    saveData({
      ...data,
      experience: data.experience.filter(e => e.id !== id)
    });
  };

  // Education CRUD
  const addEducation = (edu: EducationItem) => {
    saveData({
      ...data,
      education: [edu, ...data.education]
    });
  };

  const updateEducation = (id: string, eduUpdate: Partial<EducationItem>) => {
    saveData({
      ...data,
      education: data.education.map(e => (e.id === id ? { ...e, ...eduUpdate } : e))
    });
  };

  const deleteEducation = (id: string) => {
    saveData({
      ...data,
      education: data.education.filter(e => e.id !== id)
    });
  };

  // Certifications CRUD
  const addCertification = (cert: Certification) => {
    saveData({
      ...data,
      certifications: [cert, ...data.certifications]
    });
  };

  const updateCertification = (id: string, certUpdate: Partial<Certification>) => {
    saveData({
      ...data,
      certifications: data.certifications.map(c => (c.id === id ? { ...c, ...certUpdate } : c))
    });
  };

  const deleteCertification = (id: string) => {
    saveData({
      ...data,
      certifications: data.certifications.filter(c => c.id !== id)
    });
  };

  // Achievements CRUD
  const addAchievement = (ach: Achievement) => {
    saveData({
      ...data,
      achievements: [ach, ...data.achievements]
    });
  };

  const updateAchievement = (id: string, achUpdate: Partial<Achievement>) => {
    saveData({
      ...data,
      achievements: data.achievements.map(a => (a.id === id ? { ...a, ...achUpdate } : a))
    });
  };

  const deleteAchievement = (id: string) => {
    saveData({
      ...data,
      achievements: data.achievements.filter(a => a.id !== id)
    });
  };

  // Coding Profiles CRUD
  const addCodingProfile = (profile: CodingProfile) => {
    saveData({
      ...data,
      codingProfiles: [...data.codingProfiles, profile]
    });
  };

  const updateCodingProfile = (id: string, profileUpdate: Partial<CodingProfile>) => {
    saveData({
      ...data,
      codingProfiles: data.codingProfiles.map(p => (p.id === id ? { ...p, ...profileUpdate } : p))
    });
  };

  const deleteCodingProfile = (id: string) => {
    saveData({
      ...data,
      codingProfiles: data.codingProfiles.filter(p => p.id !== id)
    });
  };

  // Reset to original data in src/data/portfolio.ts
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(initialPortfolioData);
    setHasCustomizations(false);
  };

  // Generate clean TypeScript code representation
  const exportAsTsCode = (): string => {
    const jsonString = JSON.stringify(data, null, 2);
    return `import type { PortfolioData } from '../types/portfolio';

/**
 * ============================================================
 * EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
 * ============================================================
 * Generated from the Portfolio Local Editor on ${new Date().toISOString().split('T')[0]}
 */
export const initialPortfolioData: PortfolioData = ${jsonString};
`;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        hasCustomizations,
        saveData,
        updateProfile,
        updateContact,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addLearningGoal,
        updateLearningGoal,
        deleteLearningGoal,
        addJourneyMilestone,
        updateJourneyMilestone,
        deleteJourneyMilestone,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addCodingProfile,
        updateCodingProfile,
        deleteCodingProfile,
        resetToDefaults,
        exportAsTsCode
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
