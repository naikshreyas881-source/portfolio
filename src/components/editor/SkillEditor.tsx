import React, { useState } from 'react';
import {
  Cpu,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Skill, SkillCategory } from '../../types/portfolio';
import { ConfirmModal } from './ConfirmModal';

const CATEGORIES: SkillCategory[] = [
  'Programming Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Tools & Platforms',
  'Core CS',
  'Other'
];

export const SkillEditor: React.FC = () => {
  const {
    data,
    addSkill,
    updateSkill,
    deleteSkill,
    duplicateSkill,
    reorderSkills,
    toggleSkillVisibility
  } = usePortfolio();

  const { skills } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // New skill inline form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCat, setNewSkillCat] = useState<SkillCategory>('Programming Languages');
  const [newSkillLevel, setNewSkillLevel] = useState(75);
  const [newSkillLearning, setNewSkillLearning] = useState(false);

  const filteredSkills = skills.filter(s => {
    if (selectedCategory === 'All') return true;
    return s.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSk: Skill = {
      id: `sk-${Date.now().toString().slice(-4)}`,
      name: newSkillName.trim(),
      category: newSkillCat,
      level: newSkillLevel,
      currentlyLearning: newSkillLearning,
      visible: true
    };

    addSkill(newSk);
    setNewSkillName('');
    setNewSkillLevel(75);
    setNewSkillLearning(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    updateSkill(editingSkill.id, editingSkill);
    setEditingSkill(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteSkill(deleteConfirmId);
      if (editingSkill?.id === deleteConfirmId) {
        setEditingSkill(null);
      }
      setDeleteConfirmId(null);
    }
  };

  const skillToDelete = skills.find(s => s.id === deleteConfirmId);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Technical Skills Inventory</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Categorize languages, frameworks, databases, and core CS fundamentals. Levels are transparently labeled as self-assessed progress.
          </p>
        </div>

        <span className="text-xs font-mono text-zinc-400">
          {skills.length} Registered Skills
        </span>
      </div>

      {/* Add New Skill Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
        <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-500" />
          <span>Add New Skill</span>
        </h2>

        <form onSubmit={handleCreateSkill} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Skill Name
              </label>
              <input
                type="text"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                placeholder="e.g. Go, Docker, Redis"
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Category
              </label>
              <select
                value={newSkillCat}
                onChange={e => setNewSkillCat(e.target.value as SkillCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Self-assessed progress: <span className="font-mono text-emerald-600">{newSkillLevel}%</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(parseInt(e.target.value))}
                className="w-full accent-emerald-500 mt-2"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium pb-2.5">
                <input
                  type="checkbox"
                  checked={newSkillLearning}
                  onChange={e => setNewSkillLearning(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-zinc-700 dark:text-zinc-300">Currently Learning</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              Add Skill to Portfolio
            </button>
          </div>
        </form>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory('All')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedCategory === 'All'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold'
              : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          All ({skills.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = skills.filter(s => s.category.toLowerCase() === cat.toLowerCase()).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.id}
            className={`p-4 rounded-xl border transition-all bg-white dark:bg-zinc-900 flex items-center justify-between gap-3 ${
              skill.visible === false
                ? 'border-dashed border-zinc-300 dark:border-zinc-800 opacity-50'
                : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-xs text-zinc-900 dark:text-white truncate">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                  {skill.category}
                </span>
                {skill.currentlyLearning && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-2.5 h-2.5" />
                    Learning
                  </span>
                )}
              </div>

              {/* Progress Bar & Label */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                  {skill.level}%
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => reorderSkills(index, index - 1)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                title="Move up"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={index === skills.length - 1}
                onClick={() => reorderSkills(index, index + 1)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                title="Move down"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => toggleSkillVisibility(skill.id)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                title={skill.visible === false ? 'Show' : 'Hide'}
              >
                {skill.visible === false ? (
                  <EyeOff className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => duplicateSkill(skill.id)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                title="Duplicate"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setEditingSkill(skill)}
                className="p-1 text-zinc-400 hover:text-emerald-500"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(skill.id)}
                className="p-1 text-zinc-400 hover:text-rose-500"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Skill Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl animate-in fade-in duration-150">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
              Edit Skill: {editingSkill.name}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editingSkill.name}
                  onChange={e => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Category
                </label>
                <select
                  value={editingSkill.category}
                  onChange={e => setEditingSkill({ ...editingSkill, category: e.target.value as SkillCategory })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Self-assessed progress: <span className="font-mono text-emerald-600">{editingSkill.level}%</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={editingSkill.level}
                  onChange={e => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 mt-2"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={editingSkill.currentlyLearning}
                    onChange={e => setEditingSkill({ ...editingSkill, currentlyLearning: e.target.checked })}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Currently Learning</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={editingSkill.visible !== false}
                    onChange={e => setEditingSkill({ ...editingSkill, visible: e.target.checked })}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Visible</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Skill?"
        message={`Are you sure you want to remove "${skillToDelete?.name || 'this skill'}" from your portfolio?`}
        confirmLabel="Delete Skill"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
