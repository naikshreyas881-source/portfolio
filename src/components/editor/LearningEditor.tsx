import React, { useState } from 'react';
import {
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { LearningGoal } from '../../types/portfolio';
import { ConfirmModal } from './ConfirmModal';

export const LearningEditor: React.FC = () => {
  const {
    data,
    addLearningGoal,
    updateLearningGoal,
    deleteLearningGoal,
    duplicateLearningGoal,
    reorderLearningGoals,
    toggleLearningGoalVisibility
  } = usePortfolio();

  const { learningGoals } = data;

  const [editingGoal, setEditingGoal] = useState<LearningGoal | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [newTopicDone, setNewTopicDone] = useState('');
  const [newTopicRemain, setNewTopicRemain] = useState('');

  const handleCreateNew = () => {
    const newGoal: LearningGoal = {
      id: `lg-${Date.now().toString().slice(-4)}`,
      name: 'New Technical Competency / Subject',
      progress: 30,
      status: 'Active',
      topicsCompleted: ['Foundational Concepts', 'Hello World Prototype'],
      topicsRemaining: ['Advanced Systems', 'Production Deep-Dive'],
      startDate: new Date().toISOString().slice(0, 7),
      lastUpdated: 'Current',
      priority: 'High',
      currentlyLearning: true,
      visible: true
    };
    addLearningGoal(newGoal);
    setEditingGoal(newGoal);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal) return;
    updateLearningGoal(editingGoal.id, editingGoal);
    setEditingGoal(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteLearningGoal(deleteConfirmId);
      if (editingGoal?.id === deleteConfirmId) {
        setEditingGoal(null);
      }
      setDeleteConfirmId(null);
    }
  };

  const goalToDelete = learningGoals.find(g => g.id === deleteConfirmId);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Learning Roadmap &amp; Goals</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Showcase continuous engineering growth and self-directed technical milestones to tech recruiters.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Learning Goal</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {learningGoals.map((goal, index) => (
          <div
            key={goal.id}
            className={`p-5 rounded-2xl border transition-all bg-white dark:bg-zinc-900 ${
              goal.visible === false
                ? 'border-dashed border-zinc-300 dark:border-zinc-800 opacity-60'
                : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-bold text-base text-zinc-900 dark:text-white">
                    {goal.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-medium ${
                      goal.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                    }`}
                  >
                    {goal.status}
                  </span>
                  {goal.priority && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      Priority: {goal.priority}
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        goal.progress >= 80
                          ? 'bg-emerald-500'
                          : goal.progress >= 50
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 shrink-0">
                    {goal.progress}%
                  </span>
                </div>

                {/* Topics snippet */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold block mb-1">
                      Completed ({goal.topicsCompleted.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {goal.topicsCompleted.slice(0, 4).map((t, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {t}
                        </span>
                      ))}
                      {goal.topicsCompleted.length > 4 && (
                        <span className="text-[10px] text-zinc-400">+{goal.topicsCompleted.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Remaining ({goal.topicsRemaining.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {goal.topicsRemaining.slice(0, 4).map((t, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                          {t}
                        </span>
                      ))}
                      {goal.topicsRemaining.length > 4 && (
                        <span className="text-[10px] text-zinc-400">+{goal.topicsRemaining.length - 4} more</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => reorderLearningGoals(index, index - 1)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === learningGoals.length - 1}
                  onClick={() => reorderLearningGoals(index, index + 1)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleLearningGoalVisibility(goal.id)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  title={goal.visible === false ? 'Show' : 'Hide'}
                >
                  {goal.visible === false ? (
                    <EyeOff className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => duplicateLearningGoal(goal.id)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingGoal(goal)}
                  className="p-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(goal.id)}
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
      {editingGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in duration-150">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
              Edit Learning Goal: {editingGoal.name}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Goal / Subject Title
                  </label>
                  <input
                    type="text"
                    value={editingGoal.name}
                    onChange={e => setEditingGoal({ ...editingGoal, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Status
                  </label>
                  <select
                    value={editingGoal.status}
                    onChange={e => setEditingGoal({ ...editingGoal, status: e.target.value as 'Active' | 'Paused' | 'Completed' })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Progress: <span className="font-mono text-emerald-600 font-bold">{editingGoal.progress}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={editingGoal.progress}
                    onChange={e => setEditingGoal({ ...editingGoal, progress: parseInt(e.target.value) })}
                    className="w-full accent-emerald-500 mt-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={editingGoal.priority || 'Medium'}
                    onChange={e => setEditingGoal({ ...editingGoal, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Topics Completed */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Topics Completed
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {editingGoal.topicsCompleted.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => {
                          setEditingGoal({
                            ...editingGoal,
                            topicsCompleted: editingGoal.topicsCompleted.filter((_, i) => i !== idx)
                          });
                        }}
                        className="text-emerald-700 hover:text-rose-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTopicDone}
                    onChange={e => setNewTopicDone(e.target.value)}
                    placeholder="Add mastered topic..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newTopicDone.trim()) return;
                      setEditingGoal({
                        ...editingGoal,
                        topicsCompleted: [...editingGoal.topicsCompleted, newTopicDone.trim()]
                      });
                      setNewTopicDone('');
                    }}
                    className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Topics Remaining */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Topics In Progress / Remaining
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {editingGoal.topicsRemaining.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-mono"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => {
                          setEditingGoal({
                            ...editingGoal,
                            topicsRemaining: editingGoal.topicsRemaining.filter((_, i) => i !== idx)
                          });
                        }}
                        className="text-zinc-400 hover:text-rose-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTopicRemain}
                    onChange={e => setNewTopicRemain(e.target.value)}
                    placeholder="Add upcoming topic..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newTopicRemain.trim()) return;
                      setEditingGoal({
                        ...editingGoal,
                        topicsRemaining: [...editingGoal.topicsRemaining, newTopicRemain.trim()]
                      });
                      setNewTopicRemain('');
                    }}
                    className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingGoal(null)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Learning Goal?"
        message={`Are you sure you want to remove "${goalToDelete?.name}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
