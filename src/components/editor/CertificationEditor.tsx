import React, { useState } from 'react';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff,
  FileCheck
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Certification } from '../../types/portfolio';
import { ConfirmModal } from './ConfirmModal';

export const CertificationEditor: React.FC = () => {
  const {
    data,
    addCertification,
    updateCertification,
    deleteCertification,
    duplicateCertification,
    reorderCertifications,
    toggleCertificationVisibility
  } = usePortfolio();

  const { certifications } = data;

  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleCreateNew = () => {
    const newCert: Certification = {
      id: `cert-${Date.now().toString().slice(-4)}`,
      name: 'Cloud / Developer Certification',
      organization: 'Issuing Body (e.g. AWS, Meta, Google)',
      date: '2026',
      credentialId: '',
      certificateUrl: '',
      description: 'Demonstrated proficiency in core principles and development workflows.',
      visible: true
    };
    addCertification(newCert);
    setEditingCert(newCert);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    updateCertification(editingCert.id, editingCert);
    setEditingCert(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteCertification(deleteConfirmId);
      if (editingCert?.id === deleteConfirmId) {
        setEditingCert(null);
      }
      setDeleteConfirmId(null);
    }
  };

  const certToDelete = certifications.find(c => c.id === deleteConfirmId);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Certifications &amp; Credentials</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Add verifiable industry certifications and badges. If no certifications are added, this section automatically hides completely from the public portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`p-5 rounded-2xl border transition-all bg-white dark:bg-zinc-900 ${
                cert.visible === false
                  ? 'border-dashed border-zinc-300 dark:border-zinc-800 opacity-60'
                  : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">
                      {cert.name}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      • {cert.organization}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
                    <span>{cert.date}</span>
                    {cert.credentialId && (
                      <>
                        <span>•</span>
                        <span>ID: {cert.credentialId}</span>
                      </>
                    )}
                    {cert.certificateUrl && (
                      <>
                        <span>•</span>
                        <a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-500 hover:underline flex items-center gap-1"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    )}
                  </div>

                  {cert.description && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => reorderCertifications(index, index - 1)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === certifications.length - 1}
                    onClick={() => reorderCertifications(index, index + 1)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCertificationVisibility(cert.id)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    title={cert.visible === false ? 'Show' : 'Hide'}
                  >
                    {cert.visible === false ? (
                      <EyeOff className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateCertification(cert.id)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCert(cert)}
                    className="p-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(cert.id)}
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
            <FileCheck className="w-10 h-10 mx-auto text-zinc-400 mb-2 opacity-60" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">No certifications recorded yet</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
              Per requirements, certifications are only displayed if authentic credentials exist. Click &quot;Add Certification&quot; once you complete verified industry courses.
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl animate-in fade-in duration-150">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
              Edit Certification
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  value={editingCert.name}
                  onChange={e => setEditingCert({ ...editingCert, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={editingCert.organization}
                  onChange={e => setEditingCert({ ...editingCert, organization: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Date Earned
                  </label>
                  <input
                    type="text"
                    value={editingCert.date}
                    onChange={e => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    placeholder="2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={editingCert.credentialId || ''}
                    onChange={e => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    placeholder="e.g. AWS-12345"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Verification URL
                </label>
                <input
                  type="text"
                  value={editingCert.certificateUrl || ''}
                  onChange={e => setEditingCert({ ...editingCert, certificateUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Brief Description
                </label>
                <textarea
                  rows={2}
                  value={editingCert.description || ''}
                  onChange={e => setEditingCert({ ...editingCert, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Certification?"
        message={`Are you sure you want to remove "${certToDelete?.name}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
