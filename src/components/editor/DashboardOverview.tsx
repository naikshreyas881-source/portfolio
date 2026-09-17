import React from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Cpu,
  Award,
  Trophy,
  TrendingUp,
  Briefcase,
  Milestone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Download,
  Plus,
  ShieldCheck,
  FileCode
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const DashboardOverview: React.FC = () => {
  const { data, exportAsTsCode } = usePortfolio();
  const {
    profile,
    contact,
    projects,
    skills,
    experience,
    education,
    certifications,
    achievements,
    learningGoals,
    journey,
    codingProfiles
  } = data;

  // Calculate actual completion score based on verifiable data presence
  const completionFactors = [
    { label: 'Profile information complete', check: Boolean(profile.name && profile.bio && profile.role) },
    { label: 'Graduation set to 2028', check: Number(profile.graduationYear) === 2028 },
    { label: 'Contact methods configured', check: Boolean(contact.email && contact.github) },
    { label: 'Featured projects added', check: projects.length >= 2 },
    { label: 'Skills inventory categorized', check: skills.length >= 10 },
    { label: 'Experience / Learning documented', check: experience.length >= 1 },
    { label: 'Education credentials recorded', check: education.length >= 1 },
    { label: 'Learning roadmap tracked', check: learningGoals.length >= 3 },
    { label: 'Engineering journey milestones', check: journey.length >= 2 },
    { label: 'Coding platforms linked', check: codingProfiles.some(p => p.username) }
  ];

  const completedCount = completionFactors.filter(f => f.check).length;
  const completionPercentage = Math.round((completedCount / completionFactors.length) * 100);

  const stats = [
    { label: 'Projects', count: projects.length, icon: FolderGit2, to: '/edit/projects', color: 'text-blue-500' },
    { label: 'Skills', count: skills.length, icon: Cpu, to: '/edit/skills', color: 'text-emerald-500' },
    { label: 'Learning Goals', count: learningGoals.length, icon: TrendingUp, to: '/edit/learning', color: 'text-indigo-500' },
    { label: 'Experience Entries', count: experience.length, icon: Briefcase, to: '/edit/experience', color: 'text-amber-500' },
    { label: 'Education Records', count: education.length, icon: CheckCircle2, to: '/edit/education', color: 'text-teal-500' },
    { label: 'CGPA & Academics', count: education[0]?.cgpa ? `${education[0].cgpa} / ${education[0]?.gradingScale || '10.0'}` : `${(education[0]?.semesterRecords || []).length} Sems`, icon: Award, to: '/edit/cgpa', color: 'text-emerald-500' },
    { label: 'Milestones', count: journey.length, icon: Milestone, to: '/edit/journey', color: 'text-purple-500' },
    { label: 'Certifications', count: certifications.length, icon: Award, to: '/edit/certifications', color: 'text-rose-500' },
    { label: 'Achievements', count: achievements.length, icon: Trophy, to: '/edit/achievements', color: 'text-yellow-500' }
  ];

  const handleDownloadTs = () => {
    const code = exportAsTsCode();
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{profile.graduationLabel} Engineering Edition</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Welcome back, {profile.name}
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 max-w-2xl leading-relaxed">
              Manage your engineering portfolio, update project case studies, and track technical learning milestones. All modifications are persisted instantly to your browser storage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/edit/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Manage Projects</span>
            </Link>
            <button
              type="button"
              onClick={handleDownloadTs}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-500" />
              <span>Download portfolio.ts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Completion & Health Meter */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
                Portfolio Completion Health
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Strictly calculated from authentic data entries without arbitrary numbers.
            </p>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {completionPercentage}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {completionFactors.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium"
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                  item.check
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
                }`}
              >
                {item.check ? '✓' : '○'}
              </span>
              <span className={item.check ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-400'}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Section Metrics */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-zinc-400 mb-4">
          Content Metrics &amp; Fast Navigation
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {stats.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-emerald-500/50 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-bold font-mono text-zinc-900 dark:text-white">
                    {item.count}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {item.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Architecture Note */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6 text-xs text-zinc-600 dark:text-zinc-400 space-y-2 font-mono">
        <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-200">
          <FileCode className="w-4 h-4 text-emerald-500" />
          <span>Data-Driven Architecture Principle</span>
        </div>
        <p>
          Permanent repository changes are stored in <span className="text-emerald-500 font-bold">src/data/portfolio.ts</span>. Changes made in this Studio update your browser local storage for instant real-time live preview. Whenever you are ready to commit changes to git, use the <strong>Backup &amp; Restore</strong> page to download or copy the updated TypeScript file!
        </p>
      </div>
    </div>
  );
};
