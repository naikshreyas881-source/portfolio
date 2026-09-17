import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ExperienceItem } from '../../types/portfolio';
import { ConfirmModal } from './ConfirmModal';

export const ExperienceEditor: React.FC = () => {
  const {
    data,
    addExperience,
    updateExperience,
    deleteExperience,
    duplicateExperience,
    reorderExperience,
    toggleExperienceVisibility
  } = usePortfolio();

  const { experience } = data;

  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [newRespText, setNewRespText] = useState('');

  const handleCreateNew = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now().toString().slice(-4)}`,
      company: 'Open Source / Technical Labs',
      role: 'Software Developer & Contributor',
      startDate: '2025',
      endDate: 'Present',
      currentPosition: true,
      description: 'Building practical utilities, participating in technical labs, and implementing data-driven architectures.',
      responsibilities: [
        'Authored modular software components adhering to clean separation of concerns',
        'Implemented rigorous local testing workflows and Git branch management'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Git'],
      location: 'Karnataka, India',
      isAcademicOrLearning: true,
      visible: true
    };
    addExperience(newExp);
    setEditingExp(newExp);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    updateExperience(editingExp.id, editingExp);
    setEditingExp(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteExperience(deleteConfirmId);
      if (editingExp?.id === deleteConfirmId) {
        setEditingExp(null);
      }
      setDeleteConfirmId(null);
    }
  };

  const expToDelete = experience.find(e => e.id === deleteConfirmId);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Experience &amp; Learning</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Showcase authentic undergraduate engineering labs, hackathons, open-source initiatives, and internships. Never fabricate employment.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience Entry</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {experience.map((item, index) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all bg-white dark:bg-zinc-900 ${
              item.visible === false
                ? 'border-dashed border-zinc-300 dark:border-zinc-800 opacity-60'
                : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-zinc-900 dark:text-white">
                    {item.role}
                  </span>
                  <span className="text-xs text-zinc-500">@</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {item.company}
                  </span>
                  {item.isAcademicOrLearning && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      <GraduationCap className="w-3 h-3" />
                      Academic / Lab
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
                  <span>{item.startDate} – {item.endDate || 'Present'}</span>
                  {item.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                  {item.description}
                </p>

                {item.responsibilities && item.responsibilities.length > 0 && (
                  <ul className="space-y-1 mb-3">
                    {item.responsibilities.map((r, i) => (
                      <li key={i} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => reorderExperience(index, index - 1)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === experience.length - 1}
                  onClick={() => reorderExperience(index, index + 1)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleExperienceVisibility(item.id)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  title={item.visible === false ? 'Show' : 'Hide'}
                >
                  {item.visible === false ? (
                    <EyeOff className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => duplicateExperience(item.id)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingExp(item)}
                  className="p-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-500"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in duration-150">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
              Edit Experience Entry
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Role / Position Title
                  </label>
                  <input
                    type="text"
                    value={editingExp.role}
                    onChange={e => setEditingExp({ ...editingExp, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Company / Organization / Lab
                  </label>
                  <input
                    type="text"
                    value={editingExp.company}
                    onChange={e => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={editingExp.startDate}
                    onChange={e => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    placeholder="2025"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={editingExp.endDate}
                    onChange={e => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    placeholder="Present"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingExp.location || ''}
                    onChange={e => setEditingExp({ ...editingExp, location: e.target.value })}
                    placeholder="Karnataka, India"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Company / Project URL
                  </label>
                  <input
                    type="text"
                    value={editingExp.companyUrl || ''}
                    onChange={e => setEditingExp({ ...editingExp, companyUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Overview Narrative
                </label>
                <textarea
                  rows={2}
                  value={editingExp.description}
                  onChange={e => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 leading-relaxed"
                />
              </div>

              {/* Responsibilities */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Key Responsibilities &amp; Impact
                </label>
                {(editingExp.responsibilities || []).map((r, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={r}
                      onChange={e => {
                        const updated = [...editingExp.responsibilities];
                        updated[idx] = e.target.value;
                        setEditingExp({ ...editingExp, responsibilities: updated });
                      }}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExp({
                          ...editingExp,
                          responsibilities: editingExp.responsibilities.filter((_, i) => i !== idx)
                        });
                      }}
                      className="p-1.5 text-zinc-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRespText}
                    onChange={e => setNewRespText(e.target.value)}
                    placeholder="Add responsibility bullet..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newRespText.trim()) return;
                      setEditingExp({
                        ...editingExp,
                        responsibilities: [...(editingExp.responsibilities || []), newRespText.trim()]
                      });
                      setNewRespText('');
                    }}
                    className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl"
                  >
                    Add Bullet
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={editingExp.isAcademicOrLearning}
                    onChange={e => setEditingExp({ ...editingExp, isAcademicOrLearning: e.target.checked })}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Tag as Academic / Technical Learning</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={editingExp.visible !== false}
                    onChange={e => setEditingExp({ ...editingExp, visible: e.target.checked })}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Visible</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
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

      {/* Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Experience Entry?"
        message={`Are you sure you want to remove "${expToDelete?.role} @ ${expToDelete?.company}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
