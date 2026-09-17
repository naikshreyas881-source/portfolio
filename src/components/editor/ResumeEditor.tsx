import React from 'react';
import {
  FileText,
  Download,
  FolderOpen,
  Eye
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ResumeEditor: React.FC = () => {
  const { data, updateResumeConfig, updateContact } = usePortfolio();
  const resumeConfig = data.resume || { resumePath: '/resume.pdf', enabled: true };

  const handleToggleEnabled = (enabled: boolean) => {
    updateResumeConfig({ enabled });
  };

  const handlePathChange = (path: string) => {
    updateResumeConfig({ resumePath: path });
    updateContact({ resume: path });
  };

  const handleUrlChange = (url: string) => {
    updateResumeConfig({ resumeUrl: url });
  };

  const activeHref = resumeConfig.resumeUrl || resumeConfig.resumePath || '/resume.pdf';

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Resume Document Configuration</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Configure how your resume PDF is served, viewed, and downloaded across the hero section, navigation bar, and contact area.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={activeHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Resume</span>
          </a>
          <a
            href={activeHref}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* Settings Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
        <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
          Resume Links &amp; Display Options
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 cursor-pointer">
            <input
              type="checkbox"
              checked={resumeConfig.enabled}
              onChange={e => handleToggleEnabled(e.target.checked)}
              className="rounded text-emerald-500 focus:ring-emerald-500 w-4 h-4"
            />
            <div>
              <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                Enable Resume Download Buttons
              </span>
              <span className="text-[11px] text-zinc-500">
                When unchecked, the &quot;Download Resume&quot; buttons in the hero and navigation will be safely hidden.
              </span>
            </div>
          </label>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Local File Path (Inside public/ folder)
            </label>
            <input
              type="text"
              value={resumeConfig.resumePath}
              onChange={e => handlePathChange(e.target.value)}
              placeholder="/resume.pdf"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono"
            />
            <span className="text-[11px] text-zinc-400 mt-1 block">
              Default is <code className="text-emerald-500 font-bold">/resume.pdf</code>, pointing to <code className="text-zinc-600 dark:text-zinc-300">public/resume.pdf</code>.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              External Hosted PDF URL (Optional Fallback)
            </label>
            <input
              type="text"
              value={resumeConfig.resumeUrl || ''}
              onChange={e => handleUrlChange(e.target.value)}
              placeholder="e.g. https://drive.google.com/file/d/... or Notion link"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono"
            />
            <span className="text-[11px] text-zinc-400 mt-1 block">
              If provided, this URL overrides the local file path.
            </span>
          </div>
        </div>
      </div>

      {/* Guide: How to replace resume.pdf */}
      <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white uppercase font-mono">
          <FolderOpen className="w-4 h-4 text-emerald-500" />
          <span>How to update your resume file</span>
        </div>

        <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
          <li>
            Export your updated resume from Google Docs, Overleaf, or Word as a <strong>PDF file</strong>.
          </li>
          <li>
            Name the exported file exactly: <code className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-zinc-900 dark:text-zinc-100">resume.pdf</code>.
          </li>
          <li>
            Copy and replace the file into the portfolio repository at:
            <div className="mt-1 p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-emerald-600 dark:text-emerald-400 text-[11px]">
              public/resume.pdf
            </div>
          </li>
          <li>
            Rebuild or commit to git. All &quot;Download Resume&quot; links across your website will immediately deliver the new PDF without modifying code!
          </li>
        </ol>
      </div>
    </div>
  );
};
