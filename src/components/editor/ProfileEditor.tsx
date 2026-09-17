import React, { useState } from 'react';
import { User, MapPin, Trash2, Check, Eye } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ProfileEditor: React.FC = () => {
  const { data, updateProfile } = usePortfolio();
  const { profile } = data;

  const [newAboutPara, setNewAboutPara] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const handleUpdate = (field: keyof typeof profile, value: unknown) => {
    updateProfile({ [field]: value });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleAddAbout = () => {
    if (!newAboutPara.trim()) return;
    updateProfile({
      aboutText: [...profile.aboutText, newAboutPara.trim()]
    });
    setNewAboutPara('');
  };

  const handleRemoveAbout = (index: number) => {
    updateProfile({
      aboutText: profile.aboutText.filter((_, i) => i !== index)
    });
  };

  const handleUpdateAbout = (index: number, text: string) => {
    const updated = [...profile.aboutText];
    updated[index] = text;
    updateProfile({ aboutText: updated });
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    updateProfile({
      recruiterHighlights: [...profile.recruiterHighlights, newHighlight.trim()]
    });
    setNewHighlight('');
  };

  const handleRemoveHighlight = (index: number) => {
    updateProfile({
      recruiterHighlights: profile.recruiterHighlights.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <User className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Profile &amp; Biography</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Configure your professional identity, graduation year (2028), academic details, and personal story.
          </p>
        </div>

        {saveToast && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Check className="w-3.5 h-3.5" />
            Changes saved
          </span>
        )}
      </div>

      {/* Live Mini Preview Box */}
      <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
          <Eye className="w-3.5 h-3.5 text-emerald-500" />
          <span>Live Hero Preview</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{profile.statusAvailability || "Actively seeking opportunities"}</span>
          </div>
          <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">
            Hi, I&apos;m {profile.name || "Your Name"}
          </h2>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
            {profile.role || "Role & Aspiring Title"}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-400" />
              {profile.location}
            </span>
            <span>•</span>
            <span>{profile.college}</span>
            <span>•</span>
            <span className="font-bold text-zinc-700 dark:text-zinc-300">{profile.graduationLabel} (Graduation: {profile.graduationYear})</span>
          </div>
        </div>
      </div>

      {/* Primary Details Form */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
          Core Identity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={e => handleUpdate('name', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Shreyas Naik"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Professional Role &amp; Subtitle
            </label>
            <input
              type="text"
              value={profile.role}
              onChange={e => handleUpdate('role', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Computer Science & Engineering Student | Aspiring Software Engineer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Graduation Year (2028)
            </label>
            <input
              type="number"
              value={profile.graduationYear}
              onChange={e => handleUpdate('graduationYear', parseInt(e.target.value) || 2028)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="2028"
            />
            <span className="text-[10px] text-emerald-500 font-mono mt-1 block">
              Graduation Year set to 2028.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Graduation Label
            </label>
            <input
              type="text"
              value={profile.graduationLabel}
              onChange={e => handleUpdate('graduationLabel', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="JNNCE '28"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              College / University
            </label>
            <input
              type="text"
              value={profile.college}
              onChange={e => handleUpdate('college', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="JNN College of Engineering"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Degree &amp; Branch
            </label>
            <input
              type="text"
              value={profile.degree}
              onChange={e => handleUpdate('degree', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Bachelor of Engineering in Computer Science & Engineering"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Location Summary
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={e => handleUpdate('location', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Karnataka, India"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Availability Status Pill
            </label>
            <input
              type="text"
              value={profile.statusAvailability}
              onChange={e => handleUpdate('statusAvailability', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Actively seeking 2025/2026 internships & collaborative projects"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            Hero Headline
          </label>
          <input
            type="text"
            value={profile.headline}
            onChange={e => handleUpdate('headline', e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Engineering robust full-stack platforms and solving algorithmic problems..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            Short Bio
          </label>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={e => handleUpdate('bio', e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            placeholder="A concise summary displayed in the hero section..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            Custom Profile Image URL (Optional)
          </label>
          <input
            type="text"
            value={profile.avatarUrl || ''}
            onChange={e => handleUpdate('avatarUrl', e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Leave empty to use clean developer initials fallback"
          />
          <span className="text-[11px] text-zinc-400 mt-1 block">
            If left blank, the website uses a minimalist typographic avatar fallback.
          </span>
        </div>
      </div>

      {/* About Section Paragraphs */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
            About Section Paragraphs
          </h2>
          <span className="text-xs font-mono text-zinc-400">{profile.aboutText.length} Paragraphs</span>
        </div>

        <div className="space-y-3">
          {profile.aboutText.map((text, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <span className="text-xs font-mono text-zinc-400 pt-2 shrink-0 w-6">
                #{idx + 1}
              </span>
              <textarea
                rows={3}
                value={text}
                onChange={e => handleUpdateAbout(idx, e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              />
              <button
                type="button"
                onClick={() => handleRemoveAbout(idx)}
                className="p-2 text-zinc-400 hover:text-rose-500 rounded-lg shrink-0 transition-colors"
                title="Remove paragraph"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add new paragraph */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
          <textarea
            rows={2}
            value={newAboutPara}
            onChange={e => setNewAboutPara(e.target.value)}
            placeholder="Write a new paragraph for the About section..."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={handleAddAbout}
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl hover:bg-zinc-800 dark:hover:bg-white shrink-0 self-end transition-colors"
          >
            Add Paragraph
          </button>
        </div>
      </div>

      {/* Recruiter Highlights */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
            Recruiter Snapshot Highlights
          </h2>
          <span className="text-xs font-mono text-zinc-400">{profile.recruiterHighlights.length} Highlights</span>
        </div>

        <div className="space-y-2">
          {profile.recruiterHighlights.map((hl, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <input
                type="text"
                value={hl}
                onChange={e => {
                  const updated = [...profile.recruiterHighlights];
                  updated[idx] = e.target.value;
                  updateProfile({ recruiterHighlights: updated });
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveHighlight(idx)}
                className="p-1.5 text-zinc-400 hover:text-rose-500 rounded-lg shrink-0 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
          <input
            type="text"
            value={newHighlight}
            onChange={e => setNewHighlight(e.target.value)}
            placeholder="Add new highlight (e.g. Hands-on distributed systems engineering)..."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={handleAddHighlight}
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl hover:bg-zinc-800 dark:hover:bg-white shrink-0 transition-colors"
          >
            Add Bullet
          </button>
        </div>
      </div>
    </div>
  );
};
