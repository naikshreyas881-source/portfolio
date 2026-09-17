import React, { useState } from 'react';
import {
  Trophy,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Achievement } from '../../types/portfolio';
import { ConfirmModal } from './ConfirmModal';

const CATEGORIES = [
  'Hackathons',
  'Coding',
  'Academics',
  'Open Source',
  'Technical Events'
];

export const AchievementEditor: React.FC = () => {
  const {
    data,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    duplicateAchievement,
    reorderAchievements,
    toggleAchievementVisibility
  } = usePortfolio();

  const { achievements } = data;

  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleCreateNew = () => {
    const newAch: Achievement = {
      id: `ach-${Date.now().toString().slice(-4)}`,
      title: 'Hackathon Finalist / Competition Award',
      organization: 'JNNCE / Tech Event',
      date: '2026',
      description: 'Built a practical engineering prototype under time constraints.',
      category: 'Hackathons',
      url: '',
      visible: true
    };
    addAchievement(newAch);
    setEditingAch(newAch);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAch) return;
    updateAchievement(editingAch.id, editingAch);
    setEditingAch(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteAchievement(deleteConfirmId);
      if (editingAch?.id === deleteConfirmId) {
        setEditingAch(null);
      }
      setDeleteConfirmId(null);
    }
  };

  const achToDelete = achievements.find(a => a.id === deleteConfirmId);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Honors &amp; Achievements</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Document verified awards, hackathon wins, and collegiate competition honors. The public section is safely hidden if empty.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {achievements.length > 0 ? (
          achievements.map((ach, index) => (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all bg-white dark:bg-zinc-900 ${
                ach.visible === false
                  ? 'border-dashed border-zinc-300 dark:border-zinc-800 opacity-60'
                  : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">
                      {ach.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {ach.category}
                    </span>
                    {ach.organization && (
                      <span className="text-xs text-zinc-400">
                        • {ach.organization}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
                    <span>{ach.date}</span>
                    {ach.url && (
                      <>
                        <span>•</span>
                        <a
                          href={ach.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-500 hover:underline flex items-center gap-1"
                        >
                          <span>Proof / Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => reorderAchievements(index, index - 1)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === achievements.length - 1}
                    onClick={() => reorderAchievements(index, index + 1)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleAchievementVisibility(ach.id)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    title={ach.visible === false ? 'Show' : 'Hide'}
                  >
                    {ach.visible === false ? (
                      <EyeOff className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateAchievement(ach.id)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingAch(ach)}
                    className="p-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(ach.id)}
                    className="p-1.5 text-zinc-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <Trophy className="w-10 h-10 mx-auto text-zinc-400 mb-2 opacity-60" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">No achievements recorded yet</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
              Per requirements, achievements are only displayed when authentic events occur. Click &quot;Add Achievement&quot; when you earn competition accolades.
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingAch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl animate-in fade-in duration-150">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
              Edit Achievement
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingAch.title}
                  onChange={e => setEditingAch({ ...editingAch, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Category
                </label>
                <select
                  value={editingAch.category}
                  onChange={e => setEditingAch({ ...editingAch, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={editingAch.organization || ''}
                    onChange={e => setEditingAch({ ...editingAch, organization: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={editingAch.date}
                    onChange={e => setEditingAch({ ...editingAch, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Proof / Verification URL (Optional)
                </label>
                <input
                  type="text"
                  value={editingAch.url || ''}
                  onChange={e => setEditingAch({ ...editingAch, url: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingAch.description}
                  onChange={e => setEditingAch({ ...editingAch, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingAch(null)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Achievement?"
        message={`Are you sure you want to remove "${achToDelete?.title}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
