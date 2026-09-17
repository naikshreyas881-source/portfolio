import React, { useState, useRef } from 'react';
import {
  Database,
  Download,
  Upload,
  RotateCcw,
  Copy,
  Check,
  AlertTriangle,
  FileCode
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ConfirmModal } from './ConfirmModal';

export const BackupRestore: React.FC = () => {
  const {
    resetToDefaults,
    exportAsJson,
    exportAsTsCode,
    importFromJson
  } = usePortfolio();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [stagedImportData, setStagedImportData] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Export JSON
  const handleDownloadJson = () => {
    const jsonStr = exportAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shreyas-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported complete portfolio backup JSON!');
  };

  // 2. Export TS Code
  const handleCopyTs = () => {
    const tsCode = exportAsTsCode();
    navigator.clipboard.writeText(tsCode);
    showToast('Copied full portfolio.ts source code to clipboard!');
  };

  const handleDownloadTs = () => {
    const tsCode = exportAsTsCode();
    const blob = new Blob([tsCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.ts';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded portfolio.ts file!');
  };

  // 3. File Input Handler
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        setStagedImportData(content);
        setImportError(null);
      }
    };
    reader.readAsText(file);

    // Reset input value so same file can be re-selected if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 4. Confirm Import
  const handleConfirmImport = () => {
    if (!stagedImportData) return;
    const res = importFromJson(stagedImportData);
    if (res.success) {
      setStagedImportData(null);
      setImportError(null);
      showToast('Successfully imported portfolio data and updated studio state!');
    } else {
      setImportError(res.error || 'Failed to import JSON.');
      setStagedImportData(null);
    }
  };

  // 5. Confirm Reset Defaults
  const handleConfirmResetDefaults = () => {
    resetToDefaults();
    setShowResetConfirm(false);
    showToast('Restored default portfolio data from src/data/portfolio.ts.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Backup, Restore &amp; Export</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Export JSON backups, generate production TypeScript files, or restore default state. No data is ever silently overwritten.
          </p>
        </div>

        {toastMessage && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            {toastMessage}
          </span>
        )}
      </div>

      {/* Import Error Banner */}
      {importError && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-400 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">JSON Validation Failed</span>
            <span>{importError}</span>
          </div>
        </div>
      )}

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Export Data */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Export Portfolio Data (JSON)
            </h2>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Downloads a timestamped JSON file containing all customized projects, skills, education, milestones, settings, and profile entries.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadJson}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON Backup</span>
          </button>
        </div>

        {/* Card 2: Import Data */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Import Portfolio Data
            </h2>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Restore state from a previously exported JSON backup. Data is strictly validated against schemas before being applied.
            </p>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
            >
              <Upload className="w-4 h-4 text-blue-500" />
              <span>Select JSON File to Import</span>
            </button>
          </div>
        </div>

        {/* Card 3: Generate TypeScript Code */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit mb-3">
              <FileCode className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Generate Permanent Code (portfolio.ts)
            </h2>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Export clean TypeScript code formatted for <code className="text-emerald-500 font-mono font-bold">src/data/portfolio.ts</code>. Commit to Git to permanently preserve your edits!
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopyTs}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Code</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadTs}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download .ts</span>
            </button>
          </div>
        </div>

        {/* Card 4: Factory Reset */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 w-fit mb-3">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Restore Factory Defaults
            </h2>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Clears all browser local storage customizations and reverts back to the original <code className="text-zinc-700 dark:text-zinc-300 font-mono">src/data/portfolio.ts</code> file.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Local Changes</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Reset Defaults */}
      <ConfirmModal
        isOpen={showResetConfirm}
        title="Reset All Changes to Defaults?"
        message="This will wipe all local storage modifications in your browser and reload the default data from src/data/portfolio.ts. Make sure you have exported a backup if you wish to keep any custom entries."
        confirmLabel="Reset Everything"
        onConfirm={handleConfirmResetDefaults}
        onCancel={() => setShowResetConfirm(false)}
      />

      {/* Confirmation Modal for Staged File Import */}
      <ConfirmModal
        isOpen={Boolean(stagedImportData)}
        title="Confirm Data Import?"
        message="Importing this backup will overwrite current studio contents with the validated data from your file. Proceed?"
        confirmLabel="Import Data"
        isDestructive={false}
        onConfirm={handleConfirmImport}
        onCancel={() => setStagedImportData(null)}
      />
    </div>
  );
};
