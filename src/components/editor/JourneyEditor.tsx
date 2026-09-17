import React, { useState } from 'react';
import {
  Milestone,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff,
  Calendar
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { JourneyMilestone } from '../../types/portfolio';
import { ConfirmModal } from './ConfirmModal';

const CATEGORIES = ['Milestone', 'Project', 'Learning', 'Hackathon'];

export const JourneyEditor: React.FC = () => {
  const {
    data,
    addJourneyMilestone,
    updateJourneyMilestone,
    deleteJourneyMilestone,
    duplicateJourneyMilestone,
    reorderJourneyMilestones,
    toggleJourneyMilestoneVisibility
  } = usePortfolio();

  const { journey } = data;

  const [editingMilestone, setEditingMilestone] = useState<JourneyMilestone | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleCreateNew = () => {
    const newM: JourneyMilestone = {
      id: `j-${Date.now().toString().slice(-4)}`,
      date: '2026',
      title: 'New Engineering Milestone',
      description: 'Key technical step, breakthrough, or architecture implemented.',
      category: 'Milestone',
      visible: true
    };
    addJourneyMilestone(newM);
    setEditingMilestone(newM);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone) return;
    updateJourneyMilestone(editingMilestone.id, editingMilestone);
    setEditingMilestone(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteJourneyMilestone(deleteConfirmId);
      if (editingMilestone?.id === deleteConfirmId) {
        setEditingMilestone(null);
      }
      setDeleteConfirmId(null);
    }
  };

  const milestoneToDelete = journey.find(j => j.id === deleteConfirmId);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Milestone className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Engineering Journey Milestones</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Chronological engineering timeline highlighting growth, project releases, and competitive breakthroughs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {journey.map((m, index) => (
          <div
            key={m.id}
            className={`p-5 rounded-2xl border transition-all bg-white dark:bg-zinc-900 ${
              m.visible === false
                ? 'border-dashed border-zinc-300 dark:border-zinc-800 opacity-60'
                : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-zinc-900 dark:text-white">
                    {m.title}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {m.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{m.date}</span>
                  {m.link && (
                    <>
                      <span>•</span>
                      <a
                        href={m.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-500 hover:underline flex items-center gap-1"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {m.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => reorderJourneyMilestones(index, index - 1)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === journey.length - 1}
                  onClick={() => reorderJourneyMilestones(index, index + 1)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleJourneyMilestoneVisibility(m.id)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  title={m.visible === false ? 'Show' : 'Hide'}
                >
                  {m.visible === false ? (
                    <EyeOff className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => duplicateJourneyMilestone(m.id)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingMilestone(m)}
                  className="p-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(m.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl animate-in fade-in duration-150">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
              Edit Journey Milestone
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingMilestone.title}
                  onChange={e => setEditingMilestone({ ...editingMilestone, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Date / Year
                  </label>
                  <input
                    type="text"
                    value={editingMilestone.date}
                    onChange={e => setEditingMilestone({ ...editingMilestone, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    placeholder="2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editingMilestone.category}
                    onChange={e => setEditingMilestone({ ...editingMilestone, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  External Link (Optional)
                </label>
                <input
                  type="text"
                  value={editingMilestone.link || ''}
                  onChange={e => setEditingMilestone({ ...editingMilestone, link: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingMilestone.description}
                  onChange={e => setEditingMilestone({ ...editingMilestone, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingMilestone(null)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Milestone?"
        message={`Are you sure you want to remove "${milestoneToDelete?.title}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
