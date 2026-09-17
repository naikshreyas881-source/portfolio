import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  FolderGit2,
  Cpu,
  TrendingUp,
  Clock,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  Terminal,
  FileText,
  Copy,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  Check,
  Eye,
  ExternalLink,
  Layers,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import type {
  Project,
  Skill,
  LearningGoal,
  JourneyMilestone,
  ExperienceItem,
  Certification,
  Achievement
} from '../types/portfolio';

type Tab =
  | 'overview'
  | 'profile'
  | 'contact'
  | 'projects'
  | 'skills'
  | 'learning'
  | 'journey'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'achievements'
  | 'codingProfiles'
  | 'resume';

export const EditPortfolio: React.FC = () => {
  const {
    data,
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
    deleteJourneyMilestone,
    addExperience,
    deleteExperience,
    updateEducation,
    addCertification,
    deleteCertification,
    addAchievement,
    deleteAchievement,
    updateCodingProfile,
    resetToDefaults,
    exportAsTsCode
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyTsCode = () => {
    const code = exportAsTsCode();
    navigator.clipboard.writeText(code);
    showToast('Copied full portfolio.ts code to clipboard!');
  };

  const handleDownloadTsFile = () => {
    const code = exportAsTsCode();
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.ts';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded portfolio.ts file!');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all data to default src/data/portfolio.ts values? Any unsaved local edits will be replaced.')) {
      resetToDefaults();
      showToast('Restored original portfolio defaults.');
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Dashboard', icon: <Layers className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & Bio', icon: <User className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Info', icon: <Mail className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects & Media', icon: <FolderGit2 className="w-4 h-4" />, count: data.projects.length },
    { id: 'skills', label: 'Skills Toolkit', icon: <Cpu className="w-4 h-4" />, count: data.skills.length },
    { id: 'learning', label: 'Learning Goals', icon: <TrendingUp className="w-4 h-4" />, count: data.learningGoals.length },
    { id: 'journey', label: 'Journey Timeline', icon: <Clock className="w-4 h-4" />, count: data.journey.length },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" />, count: data.experience.length },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" />, count: data.education.length },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" />, count: data.certifications.length },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" />, count: data.achievements.length },
    { id: 'codingProfiles', label: 'Coding Profiles', icon: <Terminal className="w-4 h-4" />, count: data.codingProfiles.length },
    { id: 'resume', label: 'Resume Management', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Developer Content Editor
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Local Mode
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold"
            title="Preview current changes on public layout"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </Link>

          <button
            onClick={handleCopyTsCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-xs"
            title="Copy TypeScript portfolio data"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Restore Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar + Form Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Portfolio Sections
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingProject(null);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === tab.id
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    activeTab === tab.id
                      ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}

          <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800 px-3 space-y-2">
            <button
              onClick={handleDownloadTsFile}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-500" />
              <span>Download portfolio.ts</span>
            </button>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs">
          {/* TAB 1: OVERVIEW / DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Portfolio Data System Overview
                </h2>
                <p className="text-xs text-zinc-500">
                  Manage all content for your developer portfolio without modifying React UI components.
                </p>
              </div>

              {/* Source-of-truth banner */}
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs text-zinc-700 dark:text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>How This Editor Works</span>
                </div>
                <p>
                  Edits made here are saved in your browser&apos;s <strong>LocalStorage</strong> and instantly reflect in the live site and preview.
                </p>
                <p>
                  The permanent source of truth for your portfolio repo is:
                  <code className="ml-1 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-emerald-600 dark:text-emerald-400">
                    src/data/portfolio.ts
                  </code>
                </p>
                <p>
                  When you are ready to commit your changes to git or deploy to Vercel/Netlify, click <strong>&quot;Export Code&quot;</strong> and paste the updated content into <code className="font-mono">src/data/portfolio.ts</code>.
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
                  <div className="text-zinc-400 text-[11px]">PROJECTS</div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{data.projects.length}</div>
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
                  <div className="text-zinc-400 text-[11px]">SKILLS</div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{data.skills.length}</div>
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
                  <div className="text-zinc-400 text-[11px]">LEARNING GOALS</div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{data.learningGoals.length}</div>
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
                  <div className="text-zinc-400 text-[11px]">MILESTONES</div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{data.journey.length}</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('projects')}
                  className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800"
                >
                  Manage Projects →
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Edit Contact &amp; Social →
                </button>
                <Link
                  to="/"
                  className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  View Public Website
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Profile &amp; Personal Information
                </h2>
                <p className="text-xs text-zinc-500">
                  Updates your hero headline, bio, location, and recruiter summary.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={data.profile.name}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      Role / Tagline *
                    </label>
                    <input
                      type="text"
                      value={data.profile.role}
                      onChange={(e) => updateProfile({ role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                    Concise Hero Bio
                  </label>
                  <textarea
                    rows={2}
                    value={data.profile.bio}
                    onChange={(e) => updateProfile({ bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      College / Institution
                    </label>
                    <input
                      type="text"
                      value={data.profile.college}
                      onChange={(e) => updateProfile({ college: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={data.profile.degree}
                      onChange={(e) => updateProfile({ degree: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="number"
                      value={data.profile.graduationYear}
                      onChange={(e) => updateProfile({ graduationYear: parseInt(e.target.value) || 2027 })}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={data.profile.city || ''}
                      onChange={(e) => updateProfile({ city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={data.profile.state || ''}
                      onChange={(e) => updateProfile({ state: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={data.profile.country || ''}
                      onChange={(e) => updateProfile({ country: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                    Availability / Status Badge
                  </label>
                  <input
                    type="text"
                    value={data.profile.statusAvailability}
                    onChange={(e) => updateProfile({ statusAvailability: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT INFORMATION */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Contact &amp; Social Information
                </h2>
                <p className="text-xs text-zinc-500">
                  Empty fields are safely hidden. Never displays broken or undefined links.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      Primary Email
                    </label>
                    <input
                      type="email"
                      value={data.contact.email}
                      onChange={(e) => updateContact({ email: e.target.value })}
                      placeholder="e.g. shreyas@example.com"
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      Phone Number (Optional - provides click-to-call)
                    </label>
                    <input
                      type="tel"
                      value={data.contact.phone}
                      onChange={(e) => updateContact({ phone: e.target.value })}
                      placeholder="+91 98765 43210 (Leave blank to hide)"
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={data.contact.linkedin}
                      onChange={(e) => updateContact({ linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={data.contact.github}
                      onChange={(e) => updateContact({ github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      LeetCode URL
                    </label>
                    <input
                      type="url"
                      value={data.contact.leetcode}
                      onChange={(e) => updateContact({ leetcode: e.target.value })}
                      placeholder="https://leetcode.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      HackerRank URL
                    </label>
                    <input
                      type="url"
                      value={data.contact.hackerRank}
                      onChange={(e) => updateContact({ hackerRank: e.target.value })}
                      placeholder="https://hackerrank.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                      CodeChef URL
                    </label>
                    <input
                      type="url"
                      value={data.contact.codeChef}
                      onChange={(e) => updateContact({ codeChef: e.target.value })}
                      placeholder="https://codechef.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                    Personal Website / Domain
                  </label>
                  <input
                    type="url"
                    value={data.contact.website}
                    onChange={(e) => updateContact({ website: e.target.value })}
                    placeholder="https://shreyasnaik.dev"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS & MEDIA */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Projects &amp; Media Management
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Add, edit, duplicate, or manage media for your project case studies.
                  </p>
                </div>

                {!editingProject && (
                  <button
                    onClick={() => {
                      const newProj: Project = {
                        id: `project-${Date.now().toString().slice(-4)}`,
                        title: 'New Project',
                        shortDescription: 'Short summary of the project...',
                        fullDescription: 'Detailed overview of the problem, engineering decisions, and architecture.',
                        category: 'Full Stack',
                        status: 'In Progress',
                        date: new Date().getFullYear().toString(),
                        technologies: ['React', 'TypeScript'],
                        features: ['Key feature 1', 'Key feature 2'],
                        challenges: 'Core challenge faced...',
                        solution: 'How it was solved...',
                        learning: 'Key learnings...',
                        githubUrl: '',
                        liveUrl: '',
                        image: '',
                        screenshots: [],
                        architecture: '',
                        demoVideo: '',
                        featured: true,
                        teamSize: 'Solo Builder',
                        role: 'Software Engineer'
                      };
                      setEditingProject(newProj);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                )}
              </div>

              {/* Editing Project Modal / Form */}
              {editingProject ? (
                <div className="p-5 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/80 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {data.projects.some(p => p.id === editingProject.id) ? 'Edit Project' : 'New Project'}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-mono"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">Project ID (URL slug) *</label>
                      <input
                        type="text"
                        value={editingProject.id}
                        onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">Project Title *</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Web">Web</option>
                        <option value="Data">Data</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">Status</label>
                      <select
                        value={editingProject.status}
                        onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Planned">Planned</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">Year / Date</label>
                      <input
                        type="text"
                        value={editingProject.date}
                        onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 mb-1">Short Description (Card tagline) *</label>
                    <input
                      type="text"
                      value={editingProject.shortDescription}
                      onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 mb-1">Full Description (Case Study Overview)</label>
                    <textarea
                      rows={3}
                      value={editingProject.fullDescription}
                      onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 mb-1">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={editingProject.technologies.join(', ')}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono"
                    />
                  </div>

                  {/* Media Section inside Project */}
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-xs text-zinc-900 dark:text-zinc-100">
                      <ImageIcon className="w-4 h-4 text-emerald-500" />
                      <span>Project Media &amp; Visuals</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">Thumbnail Image URL / Path</label>
                        <input
                          type="text"
                          value={editingProject.image}
                          onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                          placeholder="e.g. /projects/farmgrid.png (Leave blank for clean fallback)"
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">Demo Video URL</label>
                        <input
                          type="url"
                          value={editingProject.demoVideo}
                          onChange={(e) => setEditingProject({ ...editingProject, demoVideo: e.target.value })}
                          placeholder="https://youtube.com/... or loom.com/..."
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 mb-1">Architecture Summary / Diagram text</label>
                      <input
                        type="text"
                        value={editingProject.architecture}
                        onChange={(e) => setEditingProject({ ...editingProject, architecture: e.target.value })}
                        placeholder="e.g. React Frontend <-> Express REST API <-> SQLite DB"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">GitHub Repo URL</label>
                      <input
                        type="url"
                        value={editingProject.githubUrl}
                        onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">Live URL (Optional)</label>
                      <input
                        type="url"
                        value={editingProject.liveUrl}
                        onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                        placeholder="https://... (Leave blank to hide)"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-3 py-1.5 rounded-lg text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const exists = data.projects.some(p => p.id === editingProject.id);
                        if (exists) {
                          updateProject(editingProject.id, editingProject);
                          showToast(`Updated project: ${editingProject.title}`);
                        } else {
                          addProject(editingProject);
                          showToast(`Added project: ${editingProject.title}`);
                        }
                        setEditingProject(null);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              ) : (
                /* Projects List */
                <div className="space-y-3">
                  {data.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                            {proj.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            {proj.category}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                            {proj.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                          {proj.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Link
                          to={`/project/${proj.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                          title="Preview Case Study"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => duplicateProject(proj.id)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                          title="Duplicate Project"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-500"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              showToast(`Deleted ${proj.title}`);
                            }
                          }}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Skills Management
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Add or update technical skills. Progress is labeled as &quot;Self-assessed progress&quot;.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newSkill: Skill = {
                      id: `sk-${Date.now().toString().slice(-4)}`,
                      name: 'New Skill',
                      category: 'Languages',
                      level: 70,
                      currentlyLearning: false
                    };
                    addSkill(newSkill);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                          {skill.name}
                        </span>
                        {skill.currentlyLearning && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                            Learning
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        {skill.category} • {skill.level}%
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          const newLevel = prompt(`Update self-assessed progress for ${skill.name} (0-100):`, skill.level.toString());
                          if (newLevel !== null) {
                            const parsed = Math.min(100, Math.max(0, parseInt(newLevel) || 0));
                            updateSkill(skill.id, { level: parsed });
                          }
                        }}
                        className="p-1 rounded text-zinc-400 hover:text-emerald-500"
                        title="Quick Edit Level"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${skill.name}?`)) {
                            deleteSkill(skill.id);
                          }
                        }}
                        className="p-1 rounded text-zinc-400 hover:text-rose-500"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LEARNING GOALS */}
          {activeTab === 'learning' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Learning Progress &amp; Tracks
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Track ongoing technical mastery, completed topics, and next modules.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newGoal: LearningGoal = {
                      id: `lg-${Date.now().toString().slice(-4)}`,
                      name: 'New Learning Goal',
                      progress: 50,
                      status: 'Active',
                      topicsCompleted: ['Basics'],
                      topicsRemaining: ['Advanced Concepts'],
                      startDate: new Date().toISOString().slice(0, 7),
                      lastUpdated: 'Current'
                    };
                    addLearningGoal(newGoal);
                    showToast('Added new learning goal');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Goal</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.learningGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {goal.name}
                        </span>
                        <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          {goal.progress}%
                        </span>
                      </div>
                      <div className="text-xs text-zinc-500 font-mono mt-1">
                        Completed: {goal.topicsCompleted.slice(0, 3).join(', ')}...
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const newProgress = prompt(`Enter new progress for ${goal.name} (0-100):`, goal.progress.toString());
                          if (newProgress !== null) {
                            const val = Math.min(100, Math.max(0, parseInt(newProgress) || 0));
                            updateLearningGoal(goal.id, { progress: val, lastUpdated: 'Recent' });
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        Update %
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${goal.name}?`)) {
                            deleteLearningGoal(goal.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: JOURNEY TIMELINE */}
          {activeTab === 'journey' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Engineering Journey Timeline
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Chronological timeline milestones marking development and growth.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newMilestone: JourneyMilestone = {
                      id: `j-${Date.now().toString().slice(-4)}`,
                      date: new Date().getFullYear().toString(),
                      title: 'New Milestone',
                      description: 'Milestone description...',
                      category: 'Milestone'
                    };
                    addJourneyMilestone(newMilestone);
                    showToast('Added milestone');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.journey.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">
                          {m.date}
                        </span>
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {m.title}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                        {m.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete milestone "${m.title}"?`)) {
                          deleteJourneyMilestone(m.id);
                        }
                      }}
                      className="p-1 rounded text-zinc-400 hover:text-rose-500 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Experience &amp; Learning
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Captures authentic academic projects, engineering labs, and hackathons without fabricating corporate employment.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newExp: ExperienceItem = {
                      id: `exp-${Date.now().toString().slice(-4)}`,
                      company: 'Open Source / Engineering Labs',
                      role: 'Builder & Contributor',
                      startDate: '2025',
                      endDate: 'Present',
                      description: 'Hands-on technical engineering experience...',
                      responsibilities: ['Developed features', 'Maintained repositories'],
                      technologies: ['React', 'TypeScript'],
                      isAcademicOrLearning: true
                    };
                    addExperience(newExp);
                    showToast('Added experience entry');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Entry</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {exp.role} — <span className="text-emerald-600 dark:text-emerald-400">{exp.company}</span>
                      </div>
                      <div className="text-xs font-mono text-zinc-500 mt-0.5">
                        {exp.startDate} – {exp.endDate}
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                        {exp.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${exp.role}?`)) {
                          deleteExperience(exp.id);
                        }
                      }}
                      className="p-1 rounded text-zinc-400 hover:text-rose-500 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Education &amp; Academic Records
                </h2>
                <p className="text-xs text-zinc-500">
                  Manage college records, CGPA, semester, and relevant coursework.
                </p>
              </div>

              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">Degree *</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">Major / Branch *</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">CGPA (Optional)</label>
                      <input
                        type="text"
                        value={edu.cgpa || ''}
                        onChange={(e) => updateEducation(edu.id, { cgpa: e.target.value })}
                        placeholder="e.g. 8.8 (Leave blank if not shown)"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">Start Year</label>
                      <input
                        type="number"
                        value={edu.startYear}
                        onChange={(e) => updateEducation(edu.id, { startYear: parseInt(e.target.value) || 2023 })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 mb-1">End Year</label>
                      <input
                        type="number"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(edu.id, { endYear: parseInt(e.target.value) || 2027 })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 10: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Certifications
                  </h2>
                  <p className="text-xs text-zinc-500">
                    If this list is empty, the Certifications section is automatically hidden on the public site.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newCert: Certification = {
                      id: `cert-${Date.now().toString().slice(-4)}`,
                      name: 'Professional Certificate Name',
                      organization: 'Issuing Organization',
                      date: new Date().getFullYear().toString(),
                      credentialId: '',
                      certificateUrl: ''
                    };
                    addCertification(newCert);
                    showToast('Added certification placeholder');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certificate</span>
                </button>
              </div>

              {data.certifications.length === 0 ? (
                <div className="p-8 text-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 text-xs text-zinc-500">
                  No certifications currently added. The public Certifications section is cleanly hidden.
                </div>
              ) : (
                <div className="space-y-3">
                  {data.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {cert.name}
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">
                          {cert.organization} ({cert.date})
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${cert.name}?`)) {
                            deleteCertification(cert.id);
                          }
                        }}
                        className="p-1 rounded text-zinc-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 11: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Achievements &amp; Honors
                  </h2>
                  <p className="text-xs text-zinc-500">
                    If this list is empty, the Achievements section is automatically hidden on the public site.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newAch: Achievement = {
                      id: `ach-${Date.now().toString().slice(-4)}`,
                      title: 'Hackathon Finalist / Award',
                      description: 'Description of achievement...',
                      organization: 'Host Organization',
                      date: new Date().getFullYear().toString(),
                      category: 'Hackathons'
                    };
                    addAchievement(newAch);
                    showToast('Added achievement');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Achievement</span>
                </button>
              </div>

              {data.achievements.length === 0 ? (
                <div className="p-8 text-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 text-xs text-zinc-500">
                  No achievements currently added. The public Achievements section is cleanly hidden.
                </div>
              ) : (
                <div className="space-y-3">
                  {data.achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {ach.title}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {ach.organization} • {ach.date}
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                          {ach.description}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${ach.title}?`)) {
                            deleteAchievement(ach.id);
                          }
                        }}
                        className="p-1 rounded text-zinc-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 12: CODING PROFILES */}
          {activeTab === 'codingProfiles' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Coding Profiles Management
                </h2>
                <p className="text-xs text-zinc-500">
                  Configure GitHub, LeetCode, HackerRank, and CodeChef links. Empty fields disappear automatically.
                </p>
              </div>

              <div className="space-y-3">
                {data.codingProfiles.map((p) => (
                  <div
                    key={p.id || p.platform}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 space-y-2"
                  >
                    <div className="font-bold text-xs font-mono text-zinc-900 dark:text-zinc-100">
                      {p.platform} Profile
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">Profile URL</label>
                        <input
                          type="url"
                          value={p.url}
                          onChange={(e) => updateCodingProfile(p.id, { url: e.target.value })}
                          placeholder={`https://${p.platform.toLowerCase()}.com/...`}
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">Username (Optional)</label>
                        <input
                          type="text"
                          value={p.username || ''}
                          onChange={(e) => updateCodingProfile(p.id, { username: e.target.value })}
                          placeholder="e.g. shreyasnaik"
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 13: RESUME */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Resume Management
                </h2>
                <p className="text-xs text-zinc-500">
                  Update the resume URL or learn how to replace the local PDF file.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 space-y-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                    Resume Path / Link
                  </label>
                  <input
                    type="text"
                    value={data.contact.resume}
                    onChange={(e) => updateContact({ resume: e.target.value })}
                    placeholder="/resume.pdf"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono"
                  />
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
                  <a
                    href={data.contact.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Current Resume</span>
                  </a>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
                  <div className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span>How to replace your PDF resume:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Export your latest resume as a PDF file named <code className="font-mono text-emerald-500">resume.pdf</code>.</li>
                    <li>Copy it into your project folder at: <code className="font-mono text-zinc-700 dark:text-zinc-300">public/resume.pdf</code>.</li>
                    <li>The download and view links throughout the website will instantly point to your new document!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
