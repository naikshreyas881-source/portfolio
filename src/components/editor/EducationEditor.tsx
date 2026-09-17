import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Trash2,
  ChevronUp,
  ChevronDown,
  Award,
  ArrowRight
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { EducationItem, SemesterRecord } from '../../types/portfolio';

export const EducationEditor: React.FC = () => {
  const {
    data,
    updateEducation,
    addSemesterRecord,
    deleteSemesterRecord,
    reorderSemesterRecords
  } = usePortfolio();

  const { education } = data;
  const primaryEdu = education[0];

  const [newCoursework, setNewCoursework] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newSemName, setNewSemName] = useState('');
  const [newSemCgpa, setNewSemCgpa] = useState('');

  if (!primaryEdu) {
    return (
      <div className="p-8 text-center text-zinc-500">
        No education entry found. Please reset to defaults in Backup &amp; Restore.
      </div>
    );
  }

  const handleUpdate = (field: keyof EducationItem, value: unknown) => {
    updateEducation(primaryEdu.id, { [field]: value });
  };

  const handleAddCoursework = () => {
    if (!newCoursework.trim()) return;
    const current = primaryEdu.relevantCoursework || [];
    handleUpdate('relevantCoursework', [...current, newCoursework.trim()]);
    setNewCoursework('');
  };

  const handleRemoveCoursework = (idx: number) => {
    const current = primaryEdu.relevantCoursework || [];
    handleUpdate('relevantCoursework', current.filter((_, i) => i !== idx));
  };

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    const current = primaryEdu.academicAchievements || [];
    handleUpdate('academicAchievements', [...current, newAchievement.trim()]);
    setNewAchievement('');
  };

  const handleRemoveAchievement = (idx: number) => {
    const current = primaryEdu.academicAchievements || [];
    handleUpdate('academicAchievements', current.filter((_, i) => i !== idx));
  };

  const handleAddSemester = () => {
    if (!newSemName.trim() || !newSemCgpa.trim()) return;
    const record: SemesterRecord = {
      id: `sem-${Date.now().toString().slice(-4)}`,
      semester: newSemName.trim(),
      cgpa: newSemCgpa.trim()
    };
    addSemesterRecord(primaryEdu.id, record);
    setNewSemName('');
    setNewSemCgpa('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Education &amp; Academics</h1>
          </div>
          <p className="text-xs text-zinc-500">
            JNNCE Class of 2028 academic curriculum, semester performance records, and core coursework.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
          Graduation: 2028 (JNNCE &apos;28)
        </div>
      </div>

      {/* CGPA Dedicated Quick Jump Banner */}
      <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Dedicated CGPA &amp; Semester Scorecard Editor Available
            </div>
            <div className="text-xs text-zinc-500">
              Manage cumulative CGPA, grading scale, honors standing, and semester-by-semester records in the dedicated workspace.
            </div>
          </div>
        </div>
        <Link
          to="/edit/cgpa"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-semibold shrink-0 shadow-xs transition-colors"
        >
          <span>Open CGPA Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Degree & College Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-5">
        <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
          Degree &amp; Institution
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Degree Title
            </label>
            <input
              type="text"
              value={primaryEdu.degree}
              onChange={e => handleUpdate('degree', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Branch / Field of Study
            </label>
            <input
              type="text"
              value={primaryEdu.field}
              onChange={e => handleUpdate('field', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Institution / College Name
            </label>
            <input
              type="text"
              value={primaryEdu.institution}
              onChange={e => handleUpdate('institution', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Start Year
              </label>
              <input
                type="number"
                value={primaryEdu.startYear}
                onChange={e => handleUpdate('startYear', parseInt(e.target.value) || 2024)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Graduation (2028)
              </label>
              <input
                type="number"
                value={primaryEdu.endYear}
                onChange={e => handleUpdate('endYear', parseInt(e.target.value) || 2028)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Cumulative CGPA (Optional)
            </label>
            <input
              type="text"
              value={primaryEdu.cgpa || ''}
              onChange={e => handleUpdate('cgpa', e.target.value)}
              placeholder="e.g. 8.8 / 10.0 (Leave blank if not yet announced)"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Current Semester
            </label>
            <input
              type="text"
              value={primaryEdu.semester || ''}
              onChange={e => handleUpdate('semester', e.target.value)}
              placeholder="e.g. 4th Semester"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
      </div>

      {/* Semester Performance Records Manager */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
              Semester GPA Records
            </h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Optionally track granular semester scores. If empty, only main degree details appear.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {(primaryEdu.semesterRecords || []).length} Records
          </span>
        </div>

        <div className="space-y-2">
          {(primaryEdu.semesterRecords || []).map((sem, idx) => (
            <div
              key={sem.id}
              className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-xs text-zinc-900 dark:text-white">
                  {sem.semester}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  GPA: {sem.cgpa}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => reorderSemesterRecords(primaryEdu.id, idx, idx - 1)}
                  className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                  title="Move up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === (primaryEdu.semesterRecords || []).length - 1}
                  onClick={() => reorderSemesterRecords(primaryEdu.id, idx, idx + 1)}
                  className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                  title="Move down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteSemesterRecord(primaryEdu.id, sem.id)}
                  className="p-1 text-zinc-400 hover:text-rose-500"
                  title="Delete semester record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add semester record */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <input
            type="text"
            value={newSemName}
            onChange={e => setNewSemName(e.target.value)}
            placeholder="Semester name (e.g. Semester 1)..."
            className="flex-1 min-w-[140px] px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
          />
          <input
            type="text"
            value={newSemCgpa}
            onChange={e => setNewSemCgpa(e.target.value)}
            placeholder="GPA (e.g. 8.9)..."
            className="w-28 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={handleAddSemester}
            className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl"
          >
            Add Record
          </button>
        </div>
      </div>

      {/* Coursework & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coursework */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
              Relevant Coursework
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              {(primaryEdu.relevantCoursework || []).length} Courses
            </span>
          </div>

          <div className="space-y-1.5">
            {(primaryEdu.relevantCoursework || []).map((course, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs">
                <span className="text-zinc-800 dark:text-zinc-200 truncate">{course}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCoursework(idx)}
                  className="p-1 text-zinc-400 hover:text-rose-500 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <input
              type="text"
              value={newCoursework}
              onChange={e => setNewCoursework(e.target.value)}
              placeholder="Add course (e.g. Operating Systems)..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
            <button
              type="button"
              onClick={handleAddCoursework}
              className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl"
            >
              Add
            </button>
          </div>
        </div>

        {/* Academic Achievements */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
              Academic Honors / Activities
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              {(primaryEdu.academicAchievements || []).length} Entries
            </span>
          </div>

          <div className="space-y-1.5">
            {(primaryEdu.academicAchievements || []).map((ach, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs">
                <span className="text-zinc-800 dark:text-zinc-200 truncate">{ach}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(idx)}
                  className="p-1 text-zinc-400 hover:text-rose-500 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <input
              type="text"
              value={newAchievement}
              onChange={e => setNewAchievement(e.target.value)}
              placeholder="Add achievement / activity..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            />
            <button
              type="button"
              onClick={handleAddAchievement}
              className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
