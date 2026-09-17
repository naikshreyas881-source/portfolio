import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  ExternalLink,
  Save,
  Check,
  RotateCcw,
  Search
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface EditorHeaderProps {
  onToggleSidebar: () => void;
  onShowToast: (message: string) => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  onToggleSidebar,
  onShowToast
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data,
    hasCustomizations,
    hasUnsavedChanges,
    saveChanges,
    discardUnsavedChanges
  } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Derive breadcrumb label from route pathname
  const path = location.pathname.replace('/edit', '').replace('/', '');
  const sectionName = path
    ? path.charAt(0).toUpperCase() + path.slice(1)
    : 'Dashboard';

  const handleSave = () => {
    saveChanges();
    onShowToast('All portfolio modifications saved to local storage!');
  };

  const handleDiscard = () => {
    if (window.confirm('Discard all unsaved edits made during this session?')) {
      discardUnsavedChanges();
      onShowToast('Reverted unsaved edits.');
    }
  };

  // Quick search matcher
  const searchResults = searchQuery.trim()
    ? [
        ...data.projects
          .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(p => ({ title: p.title, type: 'Project', link: '/edit/projects' })),
        ...data.skills
          .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(s => ({ title: s.name, type: 'Skill', link: '/edit/skills' })),
        ...data.learningGoals
          .filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(g => ({ title: g.name, type: 'Learning Goal', link: '/edit/learning' })),
        ...data.experience
          .filter(e => e.company.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(e => ({ title: e.company, type: 'Experience', link: '/edit/experience' }))
      ].slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link to="/edit" className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
            Studio
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{sectionName}</span>
        </div>

        {/* Status Indicators */}
        {hasUnsavedChanges && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Unsaved Edits
          </span>
        )}
        {hasCustomizations && !hasUnsavedChanges && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Check className="w-3 h-3" />
            Saved Locally
          </span>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search button / input */}
        <div className="relative">
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search studio..."
              className="w-32 sm:w-48 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Search className="absolute left-2.5 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          {/* Quick Search Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsSearchOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden py-1">
                <div className="px-3 py-1 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Quick Navigate
                </div>
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      navigate(res.link);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between"
                  >
                    <span className="truncate font-medium text-zinc-800 dark:text-zinc-200">
                      {res.title}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 shrink-0 ml-2">
                      {res.type}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Discard changes if unsaved */}
        {hasUnsavedChanges && (
          <button
            type="button"
            onClick={handleDiscard}
            title="Discard unsaved changes"
            className="p-1.5 text-zinc-400 hover:text-rose-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {/* Save button */}
        <button
          type="button"
          onClick={handleSave}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            hasUnsavedChanges
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs shadow-emerald-600/30 animate-pulse'
              : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white'
          }`}
        >
          <Save className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Save Changes</span>
        </button>

        {/* Live Preview Button */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-xs font-medium transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
          <span className="hidden sm:inline">View Site</span>
        </Link>
      </div>
    </header>
  );
};
