import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Mail,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  TrendingUp,
  Milestone,
  Code2,
  Share2,
  FileText,
  Settings,
  Database,
  ArrowLeft,
  X
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface EditorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();

  const navItems = [
    {
      to: '/edit',
      end: true,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/edit/profile',
      label: 'Profile',
      icon: User,
      badge: null
    },
    {
      to: '/edit/contact',
      label: 'Contact',
      icon: Mail,
      badge: null
    },
    {
      to: '/edit/projects',
      label: 'Projects',
      icon: FolderGit2,
      badge: data.projects.length
    },
    {
      to: '/edit/skills',
      label: 'Skills',
      icon: Cpu,
      badge: data.skills.length
    },
    {
      to: '/edit/experience',
      label: 'Experience',
      icon: Briefcase,
      badge: data.experience.length
    },
    {
      to: '/edit/education',
      label: 'Education',
      icon: GraduationCap,
      badge: data.education.length
    },
    {
      to: '/edit/cgpa',
      label: 'CGPA & Academics',
      icon: Award,
      badge: data.education[0]?.cgpa ? `${data.education[0].cgpa}` : null
    },
    {
      to: '/edit/certifications',
      label: 'Certifications',
      icon: Award,
      badge: data.certifications.length
    },
    {
      to: '/edit/achievements',
      label: 'Achievements',
      icon: Trophy,
      badge: data.achievements.length
    },
    {
      to: '/edit/learning',
      label: 'Learning Progress',
      icon: TrendingUp,
      badge: data.learningGoals.length
    },
    {
      to: '/edit/journey',
      label: 'Journey',
      icon: Milestone,
      badge: data.journey.length
    },
    {
      to: '/edit/coding',
      label: 'Coding Profiles',
      icon: Code2,
      badge: data.codingProfiles.filter(p => p.username).length
    },
    {
      to: '/edit/social',
      label: 'Social Links',
      icon: Share2,
      badge: data.socialLinks?.length || 0
    },
    {
      to: '/edit/resume',
      label: 'Resume',
      icon: FileText,
      badge: null
    },
    {
      to: '/edit/settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    },
    {
      to: '/edit/backup',
      label: 'Backup & Restore',
      icon: Database,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm">
              SN
            </div>
            <div>
              <div className="font-bold text-xs text-zinc-900 dark:text-white leading-tight">
                Portfolio Studio
              </div>
              <div className="text-[10px] font-mono text-zinc-400">JNNCE &apos;28 Edition</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Link: Return to Public Site */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
