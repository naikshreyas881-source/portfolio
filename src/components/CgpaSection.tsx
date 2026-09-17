import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, CheckCircle2, FileText, ArrowUpRight, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const CgpaSection: React.FC = () => {
  const { data } = usePortfolio();
  const { education, settings } = data;
  const primaryEdu = education[0];

  // If section is hidden in settings or no education entry exists, return null
  if (settings?.sectionVisibility?.cgpa === false) return null;
  if (!primaryEdu) return null;

  const cgpaValue = parseFloat(primaryEdu.cgpa || '0');
  const maxScale = parseFloat(primaryEdu.gradingScale || '10.0');
  const percentage = maxScale > 0 && !isNaN(cgpaValue) ? Math.min(100, Math.round((cgpaValue / maxScale) * 100)) : 0;
  const semesterRecords = primaryEdu.semesterRecords || [];

  return (
    <section id="academics" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Academic Performance
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              CGPA &amp; Semester Records
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
              Verified undergraduate academic standing, semester-wise grading records, and curriculum progression at JNNCE.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono text-zinc-600 dark:text-zinc-300 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Class of 2028 (JNNCE &apos;28)</span>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Cumulative CGPA Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-white to-zinc-50 dark:from-emerald-500/10 dark:via-zinc-900 dark:to-zinc-950 shadow-xs relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
                  Cumulative Grade Point Average
                </span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              {primaryEdu.cgpa ? (
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white font-mono">
                    {primaryEdu.cgpa}
                  </span>
                  <span className="text-xl font-bold text-zinc-400 font-mono">
                    / {primaryEdu.gradingScale || '10.0'}
                  </span>
                </div>
              ) : (
                <div className="text-2xl font-bold text-zinc-700 dark:text-zinc-300 mb-3">
                  Awaiting Semester Cycle
                </div>
              )}

              {/* Progress visual */}
              {percentage > 0 && (
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-mono text-zinc-500">
                    <span>Performance Efficiency</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )}

              {primaryEdu.academicStanding && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{primaryEdu.academicStanding}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-500 flex items-center justify-between font-mono">
              <span>{primaryEdu.institution}</span>
              <span>VTU Affiliation</span>
            </div>
          </motion.div>

          {/* Academic Context & Curriculum Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.3 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-zinc-500">
                  Program Details
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {primaryEdu.semester || '4th Semester'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {primaryEdu.degree} in {primaryEdu.field}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-5">
                {primaryEdu.institution} • 2024 – 2028 (JNNCE &apos;28)
              </p>

              {/* Coursework pill list */}
              {primaryEdu.relevantCoursework && primaryEdu.relevantCoursework.length > 0 && (
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Key Computer Science Coursework</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {primaryEdu.relevantCoursework.slice(0, 6).map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-500" />
                <span>Transcripts &amp; semester marksheets verified</span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                <span>Request Academic Transcript</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Semester-wise breakdown if populated */}
        {semesterRecords.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-zinc-800 dark:text-zinc-200">
                  Semester Performance Breakdown
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                {semesterRecords.length} Semesters Recorded
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {semesterRecords.map((sem, idx) => {
                const semGpa = parseFloat(sem.sgpa || sem.cgpa || '0');
                const semPercent = maxScale > 0 && !isNaN(semGpa) ? Math.round((semGpa / maxScale) * 100) : 0;

                return (
                  <motion.div
                    key={sem.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                    className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {sem.semester}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {sem.status || 'Completed'}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-3 my-2">
                        {sem.sgpa && (
                          <div>
                            <span className="text-[10px] font-mono uppercase text-zinc-400 block">SGPA</span>
                            <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                              {sem.sgpa}
                            </span>
                          </div>
                        )}
                        {sem.cgpa && (
                          <div>
                            <span className="text-[10px] font-mono uppercase text-zinc-400 block">Cumulative</span>
                            <span className="text-xl font-bold font-mono text-zinc-700 dark:text-zinc-300">
                              {sem.cgpa}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Small progress meter */}
                      <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden my-2">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${semPercent}%` }}
                        />
                      </div>

                      {sem.notes && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2">
                          {sem.notes}
                        </p>
                      )}
                    </div>

                    {sem.credits && (
                      <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px] font-mono text-zinc-400">
                        Credits Earned: <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{sem.credits}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
