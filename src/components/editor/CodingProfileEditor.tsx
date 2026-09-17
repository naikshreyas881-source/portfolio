import React, { useState } from 'react';
import {
  Code2,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { CodingProfile } from '../../types/portfolio';

export const CodingProfileEditor: React.FC = () => {
  const {
    data,
    updateCodingProfile,
    addCodingProfile,
    deleteCodingProfile,
    reorderCodingProfiles,
    toggleCodingProfileVisibility
  } = usePortfolio();

  const { codingProfiles } = data;

  const [newPlatform, setNewPlatform] = useState('GitHub');
  const [newUsername, setNewUsername] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) return;

    const newProfile: CodingProfile = {
      id: `cp-${Date.now().toString().slice(-4)}`,
      platform: newPlatform,
      username: newUsername.trim(),
      url: newUrl.trim() || `https://${newPlatform.toLowerCase()}.com/${newUsername.trim()}`,
      visible: true
    };

    addCodingProfile(newProfile);
    setNewUsername('');
    setNewUrl('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Code2 className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Competitive Coding &amp; Platforms</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Connect developer accounts (GitHub, LeetCode, HackerRank, CodeChef). All statistics are completely optional—leave metrics empty unless you wish to feature them.
          </p>
        </div>

        <span className="text-xs font-mono text-zinc-400">
          {codingProfiles.filter(p => p.username).length} Connected Profiles
        </span>
      </div>

      {/* Existing Profiles */}
      <div className="space-y-4">
        {codingProfiles.map((item, index) => {
          const isConfigured = Boolean(item.username && item.username.trim().length > 0);

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all bg-white dark:bg-zinc-900 ${
                !isConfigured || item.visible === false
                  ? 'border-dashed border-zinc-300 dark:border-zinc-800 opacity-70'
                  : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold font-mono text-xs">
                    {item.platform}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                      {item.platform} Account
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {isConfigured ? `@${item.username}` : 'Not configured (hidden publicly)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => reorderCodingProfiles(index, index - 1)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === codingProfiles.length - 1}
                    onClick={() => reorderCodingProfiles(index, index + 1)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCodingProfileVisibility(item.id)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    title={item.visible === false ? 'Show' : 'Hide'}
                  >
                    {item.visible === false ? (
                      <EyeOff className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-emerald-500"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteCodingProfile(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-rose-500"
                    title="Delete profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Edit form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={item.username}
                    onChange={e => updateCodingProfile(item.id, { username: e.target.value })}
                    placeholder="e.g. shreyasnaik"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Direct Profile URL
                  </label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={e => updateCodingProfile(item.id, { url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Problems Solved (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.solvedProblems || ''}
                    onChange={e => updateCodingProfile(item.id, { solvedProblems: e.target.value })}
                    placeholder="e.g. 150+ problems"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Contest Rating (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.rating || ''}
                    onChange={e => updateCodingProfile(item.id, { rating: e.target.value })}
                    placeholder="e.g. 1650"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Stars / Badges (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.stars || ''}
                    onChange={e => updateCodingProfile(item.id, { stars: e.target.value })}
                    placeholder="e.g. 3-Star Coder"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Global / National Rank (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.rank || ''}
                    onChange={e => updateCodingProfile(item.id, { rank: e.target.value })}
                    placeholder="e.g. Top 15%"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Profile Form */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
        <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-500" />
          <span>Add Another Coding Platform</span>
        </h2>

        <form onSubmit={handleAddNew} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Platform Name
            </label>
            <input
              type="text"
              value={newPlatform}
              onChange={e => setNewPlatform(e.target.value)}
              placeholder="e.g. AtCoder, Kaggle"
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              placeholder="Username / Handle"
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Profile URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
