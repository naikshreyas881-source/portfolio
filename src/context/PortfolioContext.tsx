import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  SemesterRecord,
  Certification,
  Achievement,
  CodingProfile,
  SocialLink,
  ResumeConfig,
  GlobalSettings,
  SectionVisibility
} from '../types/portfolio';
import { initialPortfolioData } from '../data/portfolio';

const STORAGE_KEY = 'portfolio_custom_data_v2';

interface PortfolioContextType {
  data: PortfolioData;
  hasCustomizations: boolean;
  hasUnsavedChanges: boolean;
  saveData: (newData: PortfolioData) => void;
  saveChanges: () => void;
  discardUnsavedChanges: () => void;
  updateProfile: (profile: Partial<Profile>) => void;
  updateContact: (contact: Partial<Contact>) => void;

  // Projects CRUD
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;
  toggleProjectVisibility: (id: string) => void;

  // Skills CRUD
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  duplicateSkill: (id: string) => void;
  reorderSkills: (fromIndex: number, toIndex: number) => void;
  toggleSkillVisibility: (id: string) => void;

  // Learning Goals CRUD
  addLearningGoal: (goal: LearningGoal) => void;
  updateLearningGoal: (id: string, goal: Partial<LearningGoal>) => void;
  deleteLearningGoal: (id: string) => void;
  duplicateLearningGoal: (id: string) => void;
  reorderLearningGoals: (fromIndex: number, toIndex: number) => void;
  toggleLearningGoalVisibility: (id: string) => void;

  // Journey CRUD
  addJourneyMilestone: (milestone: JourneyMilestone) => void;
  updateJourneyMilestone: (id: string, milestone: Partial<JourneyMilestone>) => void;
  deleteJourneyMilestone: (id: string) => void;
  duplicateJourneyMilestone: (id: string) => void;
  reorderJourneyMilestones: (fromIndex: number, toIndex: number) => void;
  toggleJourneyMilestoneVisibility: (id: string) => void;

  // Experience CRUD
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  duplicateExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;
  toggleExperienceVisibility: (id: string) => void;

  // Education CRUD
  addEducation: (edu: EducationItem) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  duplicateEducation: (id: string) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;
  toggleEducationVisibility: (id: string) => void;
  addSemesterRecord: (eduId: string, record: SemesterRecord) => void;
  updateSemesterRecord: (eduId: string, recordId: string, record: Partial<SemesterRecord>) => void;
  deleteSemesterRecord: (eduId: string, recordId: string) => void;
  reorderSemesterRecords: (eduId: string, fromIndex: number, toIndex: number) => void;

  // Certifications CRUD
  addCertification: (cert: Certification) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  duplicateCertification: (id: string) => void;
  reorderCertifications: (fromIndex: number, toIndex: number) => void;
  toggleCertificationVisibility: (id: string) => void;

  // Achievements CRUD
  addAchievement: (ach: Achievement) => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  duplicateAchievement: (id: string) => void;
  reorderAchievements: (fromIndex: number, toIndex: number) => void;
  toggleAchievementVisibility: (id: string) => void;

  // Coding Profiles CRUD
  addCodingProfile: (profile: CodingProfile) => void;
  updateCodingProfile: (id: string, profile: Partial<CodingProfile>) => void;
  deleteCodingProfile: (id: string) => void;
  reorderCodingProfiles: (fromIndex: number, toIndex: number) => void;
  toggleCodingProfileVisibility: (id: string) => void;

  // Social Links CRUD
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;
  reorderSocialLinks: (fromIndex: number, toIndex: number) => void;
  toggleSocialLinkVisibility: (id: string) => void;

  // Resume & Settings
  updateResumeConfig: (config: Partial<ResumeConfig>) => void;
  updateSettings: (settings: Partial<GlobalSettings>) => void;
  toggleSectionVisibility: (section: keyof SectionVisibility) => void;

  // Controls & Backup
  resetToDefaults: () => void;
  exportAsJson: () => string;
  exportAsTsCode: () => string;
  importFromJson: (jsonString: string) => { success: boolean; error?: string };
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Helper function to safely reorder array elements
function reorderArray<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure defaults for backwards compatibility
        return {
          ...initialPortfolioData,
          ...parsed,
          settings: { ...initialPortfolioData.settings, ...(parsed.settings || {}) },
          resume: { ...initialPortfolioData.resume, ...(parsed.resume || {}) },
          socialLinks: parsed.socialLinks || initialPortfolioData.socialLinks,
          profile: {
            ...initialPortfolioData.profile,
            ...(parsed.profile || {}),
            graduationYear: parsed.profile?.graduationYear === 2027 ? 2028 : (parsed.profile?.graduationYear || 2028),
            graduationLabel: parsed.profile?.graduationLabel || "JNNCE '28"
          }
        };
      }
    } catch (e) {
      console.error('Error loading saved portfolio data:', e);
    }
    return initialPortfolioData;
  });

  const [savedSnapshot, setSavedSnapshot] = useState<string>(() => JSON.stringify(data));
  const [hasCustomizations, setHasCustomizations] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  const hasUnsavedChanges = JSON.stringify(data) !== savedSnapshot;

  // Keep unsaved changes alert on window unload if edits are made
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Leave without saving?';
        return 'You have unsaved changes. Leave without saving?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Persist directly to storage and update snapshot
  const saveData = useCallback((newData: PortfolioData) => {
    setData(newData);
    try {
      const serialized = JSON.stringify(newData);
      localStorage.setItem(STORAGE_KEY, serialized);
      setSavedSnapshot(serialized);
      setHasCustomizations(true);
    } catch (e) {
      console.error('Error saving portfolio data to localStorage:', e);
    }
  }, []);

  const saveChanges = useCallback(() => {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, serialized);
      setSavedSnapshot(serialized);
      setHasCustomizations(true);
    } catch (e) {
      console.error('Error saving changes:', e);
    }
  }, [data]);

  const discardUnsavedChanges = useCallback(() => {
    try {
      const parsed = JSON.parse(savedSnapshot);
      setData(parsed);
    } catch (e) {
      console.error('Error discarding unsaved changes:', e);
    }
  }, [savedSnapshot]);

  // Profile & Contact
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

  const reorderProjects = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.projects.length || toIndex >= data.projects.length) return;
    saveData({
      ...data,
      projects: reorderArray(data.projects, fromIndex, toIndex)
    });
  };

  const toggleProjectVisibility = (id: string) => {
    saveData({
      ...data,
      projects: data.projects.map(p => (p.id === id ? { ...p, visible: p.visible === false ? true : false } : p))
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

  const duplicateSkill = (id: string) => {
    const existing = data.skills.find(s => s.id === id);
    if (!existing) return;
    const duplicated: Skill = {
      ...existing,
      id: `sk-${Date.now().toString().slice(-4)}`,
      name: `${existing.name} (Copy)`
    };
    saveData({
      ...data,
      skills: [...data.skills, duplicated]
    });
  };

  const reorderSkills = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.skills.length || toIndex >= data.skills.length) return;
    saveData({
      ...data,
      skills: reorderArray(data.skills, fromIndex, toIndex)
    });
  };

  const toggleSkillVisibility = (id: string) => {
    saveData({
      ...data,
      skills: data.skills.map(s => (s.id === id ? { ...s, visible: s.visible === false ? true : false } : s))
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

  const duplicateLearningGoal = (id: string) => {
    const existing = data.learningGoals.find(g => g.id === id);
    if (!existing) return;
    const duplicated: LearningGoal = {
      ...existing,
      id: `lg-${Date.now().toString().slice(-4)}`,
      name: `${existing.name} (Copy)`
    };
    saveData({
      ...data,
      learningGoals: [...data.learningGoals, duplicated]
    });
  };

  const reorderLearningGoals = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.learningGoals.length || toIndex >= data.learningGoals.length) return;
    saveData({
      ...data,
      learningGoals: reorderArray(data.learningGoals, fromIndex, toIndex)
    });
  };

  const toggleLearningGoalVisibility = (id: string) => {
    saveData({
      ...data,
      learningGoals: data.learningGoals.map(g => (g.id === id ? { ...g, visible: g.visible === false ? true : false } : g))
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

  const duplicateJourneyMilestone = (id: string) => {
    const existing = data.journey.find(j => j.id === id);
    if (!existing) return;
    const duplicated: JourneyMilestone = {
      ...existing,
      id: `j-${Date.now().toString().slice(-4)}`,
      title: `${existing.title} (Copy)`
    };
    saveData({
      ...data,
      journey: [...data.journey, duplicated]
    });
  };

  const reorderJourneyMilestones = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.journey.length || toIndex >= data.journey.length) return;
    saveData({
      ...data,
      journey: reorderArray(data.journey, fromIndex, toIndex)
    });
  };

  const toggleJourneyMilestoneVisibility = (id: string) => {
    saveData({
      ...data,
      journey: data.journey.map(j => (j.id === id ? { ...j, visible: j.visible === false ? true : false } : j))
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

  const duplicateExperience = (id: string) => {
    const existing = data.experience.find(e => e.id === id);
    if (!existing) return;
    const duplicated: ExperienceItem = {
      ...existing,
      id: `exp-${Date.now().toString().slice(-4)}`,
      company: `${existing.company} (Copy)`
    };
    saveData({
      ...data,
      experience: [...data.experience, duplicated]
    });
  };

  const reorderExperience = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.experience.length || toIndex >= data.experience.length) return;
    saveData({
      ...data,
      experience: reorderArray(data.experience, fromIndex, toIndex)
    });
  };

  const toggleExperienceVisibility = (id: string) => {
    saveData({
      ...data,
      experience: data.experience.map(e => (e.id === id ? { ...e, visible: e.visible === false ? true : false } : e))
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

  const duplicateEducation = (id: string) => {
    const existing = data.education.find(e => e.id === id);
    if (!existing) return;
    const duplicated: EducationItem = {
      ...existing,
      id: `edu-${Date.now().toString().slice(-4)}`,
      institution: `${existing.institution} (Copy)`
    };
    saveData({
      ...data,
      education: [...data.education, duplicated]
    });
  };

  const reorderEducation = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.education.length || toIndex >= data.education.length) return;
    saveData({
      ...data,
      education: reorderArray(data.education, fromIndex, toIndex)
    });
  };

  const toggleEducationVisibility = (id: string) => {
    saveData({
      ...data,
      education: data.education.map(e => (e.id === id ? { ...e, visible: e.visible === false ? true : false } : e))
    });
  };

  const addSemesterRecord = (eduId: string, record: SemesterRecord) => {
    const edu = data.education.find(e => e.id === eduId);
    if (!edu) return;
    const records = edu.semesterRecords || [];
    updateEducation(eduId, { semesterRecords: [...records, record] });
  };

  const updateSemesterRecord = (eduId: string, recordId: string, recordUpdate: Partial<SemesterRecord>) => {
    const edu = data.education.find(e => e.id === eduId);
    if (!edu || !edu.semesterRecords) return;
    const updated = edu.semesterRecords.map(r => (r.id === recordId ? { ...r, ...recordUpdate } : r));
    updateEducation(eduId, { semesterRecords: updated });
  };

  const deleteSemesterRecord = (eduId: string, recordId: string) => {
    const edu = data.education.find(e => e.id === eduId);
    if (!edu || !edu.semesterRecords) return;
    const updated = edu.semesterRecords.filter(r => r.id !== recordId);
    updateEducation(eduId, { semesterRecords: updated });
  };

  const reorderSemesterRecords = (eduId: string, fromIndex: number, toIndex: number) => {
    const edu = data.education.find(e => e.id === eduId);
    if (!edu || !edu.semesterRecords) return;
    const updated = reorderArray(edu.semesterRecords, fromIndex, toIndex);
    updateEducation(eduId, { semesterRecords: updated });
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

  const duplicateCertification = (id: string) => {
    const existing = data.certifications.find(c => c.id === id);
    if (!existing) return;
    const duplicated: Certification = {
      ...existing,
      id: `cert-${Date.now().toString().slice(-4)}`,
      name: `${existing.name} (Copy)`
    };
    saveData({
      ...data,
      certifications: [...data.certifications, duplicated]
    });
  };

  const reorderCertifications = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.certifications.length || toIndex >= data.certifications.length) return;
    saveData({
      ...data,
      certifications: reorderArray(data.certifications, fromIndex, toIndex)
    });
  };

  const toggleCertificationVisibility = (id: string) => {
    saveData({
      ...data,
      certifications: data.certifications.map(c => (c.id === id ? { ...c, visible: c.visible === false ? true : false } : c))
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

  const duplicateAchievement = (id: string) => {
    const existing = data.achievements.find(a => a.id === id);
    if (!existing) return;
    const duplicated: Achievement = {
      ...existing,
      id: `ach-${Date.now().toString().slice(-4)}`,
      title: `${existing.title} (Copy)`
    };
    saveData({
      ...data,
      achievements: [...data.achievements, duplicated]
    });
  };

  const reorderAchievements = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.achievements.length || toIndex >= data.achievements.length) return;
    saveData({
      ...data,
      achievements: reorderArray(data.achievements, fromIndex, toIndex)
    });
  };

  const toggleAchievementVisibility = (id: string) => {
    saveData({
      ...data,
      achievements: data.achievements.map(a => (a.id === id ? { ...a, visible: a.visible === false ? true : false } : a))
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

  const reorderCodingProfiles = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.codingProfiles.length || toIndex >= data.codingProfiles.length) return;
    saveData({
      ...data,
      codingProfiles: reorderArray(data.codingProfiles, fromIndex, toIndex)
    });
  };

  const toggleCodingProfileVisibility = (id: string) => {
    saveData({
      ...data,
      codingProfiles: data.codingProfiles.map(p => (p.id === id ? { ...p, visible: p.visible === false ? true : false } : p))
    });
  };

  // Social Links CRUD
  const addSocialLink = (link: SocialLink) => {
    saveData({
      ...data,
      socialLinks: [...(data.socialLinks || []), link]
    });
  };

  const updateSocialLink = (id: string, linkUpdate: Partial<SocialLink>) => {
    saveData({
      ...data,
      socialLinks: (data.socialLinks || []).map(l => (l.id === id ? { ...l, ...linkUpdate } : l))
    });
  };

  const deleteSocialLink = (id: string) => {
    saveData({
      ...data,
      socialLinks: (data.socialLinks || []).filter(l => l.id !== id)
    });
  };

  const reorderSocialLinks = (fromIndex: number, toIndex: number) => {
    const list = data.socialLinks || [];
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) return;
    saveData({
      ...data,
      socialLinks: reorderArray(list, fromIndex, toIndex)
    });
  };

  const toggleSocialLinkVisibility = (id: string) => {
    saveData({
      ...data,
      socialLinks: (data.socialLinks || []).map(l => (l.id === id ? { ...l, visible: l.visible === false ? true : false } : l))
    });
  };

  // Resume & Settings
  const updateResumeConfig = (config: Partial<ResumeConfig>) => {
    saveData({
      ...data,
      resume: { ...data.resume, ...config }
    });
  };

  const updateSettings = (settingsUpdate: Partial<GlobalSettings>) => {
    saveData({
      ...data,
      settings: { ...data.settings, ...settingsUpdate }
    });
  };

  const toggleSectionVisibility = (section: keyof SectionVisibility) => {
    const current = data.settings?.sectionVisibility || initialPortfolioData.settings.sectionVisibility;
    updateSettings({
      sectionVisibility: {
        ...current,
        [section]: !current[section]
      }
    });
  };

  // Reset to defaults
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(initialPortfolioData);
    setSavedSnapshot(JSON.stringify(initialPortfolioData));
    setHasCustomizations(false);
  };

  // Export JSON
  const exportAsJson = (): string => {
    return JSON.stringify(data, null, 2);
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

  // Import JSON with validation
  const importFromJson = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Imported data must be a valid JSON object.' };
      }
      if (!parsed.profile || typeof parsed.profile !== 'object') {
        return { success: false, error: 'Missing required "profile" object in portfolio data.' };
      }
      if (!parsed.projects || !Array.isArray(parsed.projects)) {
        return { success: false, error: 'Missing required "projects" array in portfolio data.' };
      }
      if (!parsed.skills || !Array.isArray(parsed.skills)) {
        return { success: false, error: 'Missing required "skills" array in portfolio data.' };
      }

      // Safe merge with defaults to avoid broken state
      const validatedData: PortfolioData = {
        ...initialPortfolioData,
        ...parsed,
        profile: {
          ...initialPortfolioData.profile,
          ...parsed.profile,
          graduationYear: parsed.profile.graduationYear === 2027 ? 2028 : (parsed.profile.graduationYear || 2028),
          graduationLabel: parsed.profile.graduationLabel || "JNNCE '28"
        },
        settings: {
          ...initialPortfolioData.settings,
          ...(parsed.settings || {})
        },
        resume: {
          ...initialPortfolioData.resume,
          ...(parsed.resume || {})
        },
        socialLinks: parsed.socialLinks || initialPortfolioData.socialLinks
      };

      saveData(validatedData);
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON file';
      return { success: false, error: msg };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        hasCustomizations,
        hasUnsavedChanges,
        saveData,
        saveChanges,
        discardUnsavedChanges,
        updateProfile,
        updateContact,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        reorderProjects,
        toggleProjectVisibility,
        addSkill,
        updateSkill,
        deleteSkill,
        duplicateSkill,
        reorderSkills,
        toggleSkillVisibility,
        addLearningGoal,
        updateLearningGoal,
        deleteLearningGoal,
        duplicateLearningGoal,
        reorderLearningGoals,
        toggleLearningGoalVisibility,
        addJourneyMilestone,
        updateJourneyMilestone,
        deleteJourneyMilestone,
        duplicateJourneyMilestone,
        reorderJourneyMilestones,
        toggleJourneyMilestoneVisibility,
        addExperience,
        updateExperience,
        deleteExperience,
        duplicateExperience,
        reorderExperience,
        toggleExperienceVisibility,
        addEducation,
        updateEducation,
        deleteEducation,
        duplicateEducation,
        reorderEducation,
        toggleEducationVisibility,
        addSemesterRecord,
        updateSemesterRecord,
        deleteSemesterRecord,
        reorderSemesterRecords,
        addCertification,
        updateCertification,
        deleteCertification,
        duplicateCertification,
        reorderCertifications,
        toggleCertificationVisibility,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        duplicateAchievement,
        reorderAchievements,
        toggleAchievementVisibility,
        addCodingProfile,
        updateCodingProfile,
        deleteCodingProfile,
        reorderCodingProfiles,
        toggleCodingProfileVisibility,
        addSocialLink,
        updateSocialLink,
        deleteSocialLink,
        reorderSocialLinks,
        toggleSocialLinkVisibility,
        updateResumeConfig,
        updateSettings,
        toggleSectionVisibility,
        resetToDefaults,
        exportAsJson,
        exportAsTsCode,
        importFromJson
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

