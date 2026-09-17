import React, { useState } from 'react';
import {
  Settings,
  Palette,
  Check,
  Moon,
  Sun,
  Laptop,
  Layout,
  Globe
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type {
  AccentColor,
  AnimationIntensity,
  SectionVisibility
} from '../../types/portfolio';

export const SettingsEditor: React.FC = () => {
  const { data, updateSettings, toggleSectionVisibility } = usePortfolio();
  const settings = data.settings;
  const [saveToast, setSaveToast] = useState(false);

  const handleUpdate = (field: keyof typeof settings, value: unknown) => {
    updateSettings({ [field]: value });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const accentColors: { id: AccentColor; name: string; bg: string }[] = [
    { id: 'emerald', name: 'Emerald (Default)', bg: 'bg-emerald-500' },
    { id: 'blue', name: 'Electric Blue', bg: 'bg-blue-500' },
    { id: 'violet', name: 'Violet', bg: 'bg-violet-500' },
    { id: 'amber', name: 'Amber', bg: 'bg-amber-500' },
    { id: 'rose', name: 'Rose', bg: 'bg-rose-500' },
    { id: 'cyan', name: 'Cyan', bg: 'bg-cyan-500' }
  ];

  const sections: { id: keyof SectionVisibility; label: string; desc: string }[] = [
    { id: 'about', label: 'About Section', desc: 'Personal background, engineering philosophy, and focus areas.' },
    { id: 'skills', label: 'Skills Section', desc: 'Categorized technical languages, frameworks, and CS fundamentals.' },
    { id: 'projects', label: 'Projects Section', desc: 'Featured engineering case studies and architecture breakdowns.' },
    { id: 'learning', label: 'Learning Progress', desc: 'Active roadmaps and competency progress bars.' },
    { id: 'experience', label: 'Experience & Learning', desc: 'Undergraduate engineering labs, hackathons, and technical projects.' },
    { id: 'education', label: 'Education', desc: 'JNNCE Class of 2028 credentials, GPA records, and coursework.' },
    { id: 'cgpa', label: 'CGPA & Academic Records', desc: 'Prominent cumulative CGPA display, grading scale, and semester breakdown cards.' },
    { id: 'journey', label: 'Engineering Journey', desc: 'Chronological timeline of milestone breakthroughs.' },
    { id: 'codingProfiles', label: 'Coding Profiles', desc: 'GitHub, LeetCode, and competitive platforms.' },
    { id: 'certifications', label: 'Certifications', desc: 'Industry credentials (auto-hides if empty).' },
    { id: 'achievements', label: 'Achievements', desc: 'Hackathon finalist and competition honors (auto-hides if empty).' },
    { id: 'contact', label: 'Contact Section', desc: 'Direct message form and professional communication details.' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Global Studio Settings</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Control portfolio section visibility, brand appearance, animation fidelity, and SEO meta tags.
          </p>
        </div>

        {saveToast && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Check className="w-3.5 h-3.5" />
            Settings Saved
          </span>
        )}
      </div>

      {/* Brand & Theme */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
        <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
          <Palette className="w-4 h-4 text-emerald-500" />
          <span>Appearance &amp; Theme</span>
        </h2>

        {/* Theme selector */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Default Color Scheme
          </label>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[
              { id: 'dark' as const, label: 'Dark Mode', icon: Moon },
              { id: 'light' as const, label: 'Light Mode', icon: Sun },
              { id: 'system' as const, label: 'System', icon: Laptop }
            ].map(item => {
              const Icon = item.icon;
              const active = settings.defaultTheme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleUpdate('defaultTheme', item.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-xs font-medium transition-all ${
                    active
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Primary Accent Color
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {accentColors.map(color => {
              const active = settings.accentColor === color.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => handleUpdate('accentColor', color.id)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs transition-all ${
                    active
                      ? 'border-zinc-900 dark:border-white ring-1 ring-emerald-500 bg-zinc-50 dark:bg-zinc-950 font-bold text-zinc-900 dark:text-white'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-950'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${color.bg}`} />
                  <span className="truncate">{color.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animation Fidelity */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Animation Intensity
          </label>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {(['full', 'subtle', 'reduced'] as AnimationIntensity[]).map(intensity => {
              const active = settings.animationIntensity === intensity;
              return (
                <button
                  key={intensity}
                  type="button"
                  onClick={() => handleUpdate('animationIntensity', intensity)}
                  className={`p-2.5 rounded-xl border capitalize text-xs transition-all ${
                    active
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {intensity}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section Visibility Controls */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
            <Layout className="w-4 h-4 text-emerald-500" />
            <span>Public Section Visibility</span>
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Sections toggled off are excluded from public rendering and automatically removed from navbar links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sections.map(s => {
            const isVisible = settings.sectionVisibility?.[s.id] !== false;
            return (
              <div
                key={s.id}
                onClick={() => toggleSectionVisibility(s.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isVisible
                    ? 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50'
                    : 'border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-900/30 opacity-60'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {s.desc}
                  </div>
                </div>

                <div
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 ${
                    isVisible ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      isVisible ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEO & Browser Meta */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-500" />
          <span>SEO &amp; Browser Titles</span>
        </h2>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            Browser Window Title
          </label>
          <input
            type="text"
            value={settings.browserTitle}
            onChange={e => handleUpdate('browserTitle', e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            Meta Description (Search Engines &amp; OpenGraph)
          </label>
          <textarea
            rows={3}
            value={settings.seoDescription}
            onChange={e => handleUpdate('seoDescription', e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
