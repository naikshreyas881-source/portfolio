import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Education: React.FC = () => {
  const { data } = usePortfolio();
  const { education } = data;

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Academic Credentials
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Education
          </h2>
        </div>

        <div className="space-y-6">
          {education.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {item.degree} in {item.field}
                    </h3>
                    <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {item.institution}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.startYear} – {item.endYear}</span>
                  </div>

                  {item.cgpa && item.cgpa.trim().length > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      <span>CGPA: {item.cgpa}</span>
                    </div>
                  )}

                  {item.semester && item.semester.trim().length > 0 && (
                    <div className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80">
                      <span>{item.semester}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coursework */}
              {item.relevantCoursework && item.relevantCoursework.length > 0 && (
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Key Coursework</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.relevantCoursework.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Academic achievements if present */}
              {item.academicAchievements && item.academicAchievements.length > 0 && (
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                  <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400 list-disc list-inside">
                    {item.academicAchievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
