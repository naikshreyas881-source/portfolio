import React, { useState } from 'react';
import {
  Share2,
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  ExternalLink,
  Globe
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { SocialLink } from '../../types/portfolio';
import { ConfirmModal } from './ConfirmModal';

export const SocialLinksEditor: React.FC = () => {
  const {
    data,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    reorderSocialLinks,
    toggleSocialLinkVisibility
  } = usePortfolio();

  const socialLinks = data.socialLinks || [];

  const [newPlatform, setNewPlatform] = useState('GitHub');
  const [newUsername, setNewUsername] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlatform.trim() || !newUrl.trim()) return;

    const newLink: SocialLink = {
      id: `sl-${Date.now().toString().slice(-4)}`,
      platform: newPlatform.trim(),
      username: newUsername.trim(),
      url: newUrl.trim(),
      icon: newPlatform.toLowerCase(),
      displayOrder: socialLinks.length + 1,
      visible: true
    };

    addSocialLink(newLink);
    setNewPlatform('GitHub');
    setNewUsername('');
    setNewUrl('');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink) return;
    updateSocialLink(editingLink.id, editingLink);
    setEditingLink(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteSocialLink(deleteConfirmId);
      if (editingLink?.id === deleteConfirmId) {
        setEditingLink(null);
      }
      setDeleteConfirmId(null);
    }
  };

  const linkToDelete = socialLinks.find(l => l.id === deleteConfirmId);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Share2 className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Social &amp; Community Links</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Manage links displayed in the hero and footer (GitHub, LinkedIn, Twitter/X, Discord, Dev.to, etc.).
          </p>
        </div>

        <span className="text-xs font-mono text-zinc-400">
          {socialLinks.length} Links
        </span>
      </div>

      {/* Add New Link Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
        <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-500" />
          <span>Add New Social Link</span>
        </h2>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Platform Name
            </label>
            <input
              type="text"
              value={newPlatform}
              onChange={e => setNewPlatform(e.target.value)}
              placeholder="e.g. Twitter / X, Discord"
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Username / Handle (Optional)
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              placeholder="e.g. shreyasnaik"
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Full Destination URL
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
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shrink-0 shadow-xs"
              >
                Add Link
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="space-y-3">
        {socialLinks.map((link, index) => (
          <div
            key={link.id}
            className={`p-4 rounded-xl border transition-all bg-white dark:bg-zinc-900 flex items-center justify-between gap-4 ${
              link.visible === false
                ? 'border-dashed border-zinc-300 dark:border-zinc-800 opacity-50'
                : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-900 dark:text-white block truncate">
                  {link.platform}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 block truncate">
                  {link.url}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => reorderSocialLinks(index, index - 1)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                title="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={index === socialLinks.length - 1}
                onClick={() => reorderSocialLinks(index, index + 1)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                title="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => toggleSocialLinkVisibility(link.id)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                title={link.visible === false ? 'Show' : 'Hide'}
              >
                {link.visible === false ? (
                  <EyeOff className="w-4 h-4 text-amber-500" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="p-1 text-zinc-400 hover:text-emerald-500"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setEditingLink(link)}
                className="p-1 text-zinc-400 hover:text-emerald-500"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(link.id)}
                className="p-1 text-zinc-400 hover:text-rose-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl animate-in fade-in duration-150">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
              Edit Social Link: {editingLink.platform}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={editingLink.platform}
                  onChange={e => setEditingLink({ ...editingLink, platform: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Username (Optional)
                </label>
                <input
                  type="text"
                  value={editingLink.username}
                  onChange={e => setEditingLink({ ...editingLink, username: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  URL
                </label>
                <input
                  type="text"
                  value={editingLink.url}
                  onChange={e => setEditingLink({ ...editingLink, url: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingLink(null)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Social Link?"
        message={`Are you sure you want to remove "${linkToDelete?.platform}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
