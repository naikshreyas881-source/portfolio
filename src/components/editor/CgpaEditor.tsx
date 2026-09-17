import React, { useState } from 'react';
import {
  Award,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit2,
  Check,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ConfirmModal } from './ConfirmModal';
import type { SemesterRecord, EducationItem } from '../../types/portfolio';

export const CgpaEditor: React.FC = () => {
  const {
    data,
    updateEducation,
    addSemesterRecord,
    updateSemesterRecord,
    deleteSemesterRecord,
    reorderSemesterRecords,
    toggleSectionVisibility
  } = usePortfolio();

  const primaryEdu = data.education[0];
  const isSectionVisible = data.settings?.sectionVisibility?.cgpa !== false;

  // New semester record form state
  const [newSemName, setNewSemName] = useState('');
  const [newSemSgpa, setNewSemSgpa] = useState('');
  const [newSemCgpa, setNewSemCgpa] = useState('');
  const [newSemCredits, setNewSemCredits] = useState('');
  const [newSemStatus, setNewSemStatus] = useState('Completed');
  const [newSemNotes, setNewSemNotes] = useState('');

  // Editing existing record state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSemName, setEditSemName] = useState('');
  const [editSemSgpa, setEditSemSgpa] = useState('');
  const [editSemCgpa, setEditSemCgpa] = useState('');
  const [editSemCredits, setEditSemCredits] = useState('');
  const [editSemStatus, setEditSemStatus] = useState('Completed');
  const [editSemNotes, setEditSemNotes] = useState('');

  // Delete modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!primaryEdu) {
    return (
      <div className="p-8 text-center text-zinc-500">
        No primary education record found. Please reset to defaults in Backup &amp; Restore.
      </div>
    );
  }

  const handleUpdateEdu = (field: keyof EducationItem, value: unknown) => {
    updateEducation(primaryEdu.id, { [field]: value });
  };

  const handleAddSemester = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSemName.trim()) return;

    const newRecord: SemesterRecord = {
      id: `sem-${Date.now().toString().slice(-4)}`,
      semester: newSemName.trim(),
      sgpa: newSemSgpa.trim() || undefined,
      cgpa: newSemCgpa.trim() || newSemSgpa.trim() || '',
      credits: newSemCredits.trim() || undefined,
      status: newSemStatus.trim() || 'Completed',
      notes: newSemNotes.trim() || undefined
    };

    addSemesterRecord(primaryEdu.id, newRecord);

    // Reset form
    setNewSemName('');
    setNewSemSgpa('');
    setNewSemCgpa('');
    setNewSemCredits('');
    setNewSemNotes('');
    setNewSemStatus('Completed');
  };

  const startEdit = (rec: SemesterRecord) => {
    setEditingId(rec.id);
    setEditSemName(rec.semester);
    setEditSemSgpa(rec.sgpa || '');
    setEditSemCgpa(rec.cgpa);
    setEditSemCredits(rec.credits || '');
    setEditSemStatus(rec.status || 'Completed');
    setEditSemNotes(rec.notes || '');
  };

  const saveEdit = (id: string) => {
    updateSemesterRecord(primaryEdu.id, id, {
      semester: editSemName.trim(),
      sgpa: editSemSgpa.trim() || undefined,
      cgpa: editSemCgpa.trim(),
      credits: editSemCredits.trim() || undefined,
      status: editSemStatus.trim() || 'Completed',
      notes: editSemNotes.trim() || undefined
    });
    setEditingId(null);
  };

  const handleLoadSampleRecords = () => {
    const samples: SemesterRecord[] = [
      {
        id: 'sem-1',
        semester: '1st Semester',
        sgpa: '8.75',
        cgpa: '8.75',
        credits: '20',
        status: 'Completed',
        notes: 'Core Engineering Foundations, Mathematics & Physics'
      },
      {
        id: 'sem-2',
        semester: '2nd Semester',
        sgpa: '8.90',
        cgpa: '8.82',
        credits: '20',
        status: 'Completed',
        notes: 'Problem Solving via C, Engineering Science & Electronics'
      },
      {
        id: 'sem-3',
        semester: '3rd Semester',
        sgpa: '8.92',
        cgpa: '8.85',
        credits: '22',
        status: 'Completed',
        notes: 'Data Structures & Applications, Object-Oriented Programming (Java)'
      }
    ];

    handleUpdateEdu('semesterRecords', samples);
    handleUpdateEdu('cgpa', '8.85');
    handleUpdateEdu('gradingScale', '10.0');
    handleUpdateEdu('academicStanding', 'First Class with Distinction');
    handleUpdateEdu('semester', '4th Semester');
  };

  const semesterRecords = primaryEdu.semesterRecords || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
              CGPA &amp; Academic Performance Editor
            </h1>
          </div>
          <p className="text-xs text-zinc-500">
            Manage your cumulative CGPA, grading scale, academic distinction status, and semester-by-semester records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => toggleSectionVisibility('cgpa')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              isSectionVisible
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'
            }`}
          >
            {isSectionVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{isSectionVisible ? 'Section Visible' : 'Section Hidden'}</span>
          </button>

          <button
            type="button"
            onClick={handleLoadSampleRecords}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
            title="Load authentic sample records for semesters 1-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Sample Records</span>
          </button>
        </div>
      </div>

      {/* Main Score Configuration Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-5">
        <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
          <span>Primary Score &amp; Classification</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Cumulative CGPA *
            </label>
            <input
              type="text"
              value={primaryEdu.cgpa || ''}
              onChange={(e) => handleUpdateEdu('cgpa', e.target.value)}
              placeholder="e.g. 8.85"
              className="w-full px-3.5 py-2.5 text-sm font-mono font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Grading Scale (Max Score)
            </label>
            <input
              type="text"
              value={primaryEdu.gradingScale || '10.0'}
              onChange={(e) => handleUpdateEdu('gradingScale', e.target.value)}
              placeholder="e.g. 10.0 or 4.0"
              className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Current Semester
            </label>
            <input
              type="text"
              value={primaryEdu.semester || ''}
              onChange={(e) => handleUpdateEdu('semester', e.target.value)}
              placeholder="e.g. 4th Semester"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Academic Standing / Classification
            </label>
            <input
              type="text"
              value={primaryEdu.academicStanding || ''}
              onChange={(e) => handleUpdateEdu('academicStanding', e.target.value)}
              placeholder="e.g. First Class with Distinction"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Quick presets for standing */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <span className="text-[11px] font-mono text-zinc-400">Quick Classification Presets:</span>
          {['First Class with Distinction', 'First Class', "Dean's Honor List", 'Academic Scholar'].map(
            (preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleUpdateEdu('academicStanding', preset)}
                className="px-2.5 py-1 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {preset}
              </button>
            )
          )}
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="bg-gradient-to-br from-emerald-500/5 via-white to-zinc-50 dark:from-emerald-500/10 dark:via-zinc-900 dark:to-zinc-950 border border-emerald-500/20 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Portfolio Preview</span>
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            {primaryEdu.institution}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-zinc-900 dark:text-white">
                {primaryEdu.cgpa || '8.85'}
              </span>
              <span className="text-lg font-bold text-zinc-400 font-mono">
                / {primaryEdu.gradingScale || '10.0'}
              </span>
            </div>
            {primaryEdu.academicStanding && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{primaryEdu.academicStanding}</span>
              </div>
            )}
          </div>

          <div className="text-xs text-zinc-500 font-mono text-right space-y-1">
            <div>Program: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{primaryEdu.degree} in {primaryEdu.field}</span></div>
            <div>Semester: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{primaryEdu.semester || '4th Semester'}</span></div>
            <div>Graduation: <span className="font-semibold text-emerald-600 dark:text-emerald-400">Class of {primaryEdu.endYear} (JNNCE &apos;28)</span></div>
          </div>
        </div>
      </div>

      {/* Semester Records Management */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
              Semester Performance Records ({semesterRecords.length})
            </h2>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Record individual semester SGPA scores, cumulative progression, and completed subject highlights.
            </p>
          </div>

          {semesterRecords.length > 0 && (
            <button
              type="button"
              onClick={() => handleUpdateEdu('semesterRecords', [])}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* List of records */}
        <div className="space-y-3">
          {semesterRecords.map((rec, idx) => {
            const isEditing = editingId === rec.id;

            if (isEditing) {
              return (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                        Semester Title *
                      </label>
                      <input
                        type="text"
                        value={editSemName}
                        onChange={(e) => setEditSemName(e.target.value)}
                        placeholder="e.g. 1st Semester"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                        SGPA *
                      </label>
                      <input
                        type="text"
                        value={editSemSgpa}
                        onChange={(e) => setEditSemSgpa(e.target.value)}
                        placeholder="e.g. 8.90"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                        Cumulative CGPA
                      </label>
                      <input
                        type="text"
                        value={editSemCgpa}
                        onChange={(e) => setEditSemCgpa(e.target.value)}
                        placeholder="e.g. 8.82"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                        Credits Earned
                      </label>
                      <input
                        type="text"
                        value={editSemCredits}
                        onChange={(e) => setEditSemCredits(e.target.value)}
                        placeholder="e.g. 20"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                      Key Subjects / Notes
                    </label>
                    <input
                      type="text"
                      value={editSemNotes}
                      onChange={(e) => setEditSemNotes(e.target.value)}
                      placeholder="e.g. Data Structures, Algorithms, Discrete Math..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveEdit(rec.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Semester</span>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={rec.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {rec.semester}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {rec.status || 'Completed'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                    {rec.sgpa && (
                      <div>
                        <span className="text-zinc-400">SGPA: </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{rec.sgpa}</span>
                      </div>
                    )}
                    {rec.cgpa && (
                      <div>
                        <span className="text-zinc-400">Cumulative: </span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{rec.cgpa}</span>
                      </div>
                    )}
                    {rec.credits && (
                      <div>
                        <span className="text-zinc-400">Credits: </span>
                        <span className="text-zinc-600 dark:text-zinc-400">{rec.credits}</span>
                      </div>
                    )}
                  </div>

                  {rec.notes && (
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                      {rec.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => reorderSemesterRecords(primaryEdu.id, idx, idx - 1)}
                    className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === semesterRecords.length - 1}
                    onClick={() => reorderSemesterRecords(primaryEdu.id, idx, idx + 1)}
                    className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => startEdit(rec)}
                    className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title="Edit record"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingId(rec.id)}
                    className="p-1.5 text-zinc-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/10"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Semester Record Form */}
        <form
          onSubmit={handleAddSemester}
          className="p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-3"
        >
          <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-emerald-500" />
            <span>Add New Semester Record</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                Semester Title *
              </label>
              <input
                type="text"
                required
                value={newSemName}
                onChange={(e) => setNewSemName(e.target.value)}
                placeholder="e.g. 4th Semester"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                Semester SGPA *
              </label>
              <input
                type="text"
                value={newSemSgpa}
                onChange={(e) => setNewSemSgpa(e.target.value)}
                placeholder="e.g. 9.15"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                Cumulative CGPA
              </label>
              <input
                type="text"
                value={newSemCgpa}
                onChange={(e) => setNewSemCgpa(e.target.value)}
                placeholder="e.g. 8.95"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                Credits Earned
              </label>
              <input
                type="text"
                value={newSemCredits}
                onChange={(e) => setNewSemCredits(e.target.value)}
                placeholder="e.g. 22"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                Completed Subjects / Notes
              </label>
              <input
                type="text"
                value={newSemNotes}
                onChange={(e) => setNewSemNotes(e.target.value)}
                placeholder="e.g. Operating Systems, DBMS, Computer Networks..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                Status
              </label>
              <select
                value={newSemStatus}
                onChange={(e) => setNewSemStatus(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl hover:bg-zinc-800 dark:hover:bg-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Semester Record</span>
            </button>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Semester Record"
        message="Are you sure you want to delete this semester record? You can add it back at any time or load defaults."
        confirmLabel="Delete Record"
        isDestructive={true}
        onConfirm={() => {
          if (deletingId) {
            deleteSemesterRecord(primaryEdu.id, deletingId);
            setDeletingId(null);
          }
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
