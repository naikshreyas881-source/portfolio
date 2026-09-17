import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const { experience } = data;

  const hasCorporate = experience.some(e => !e.isAcademicOrLearning);
  const sectionTitle = hasCorporate ? 'Work Experience' : 'Experience & Learning';

  return (
    <section id="experience" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Technical Background
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {sectionTitle}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Focusing on applied undergraduate research, technical labs, hackathon initiatives, and project engineering.
          </p>
        </div>

        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.3 }}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.role}
                    </h3>
                    {exp.isAcademicOrLearning && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80">
                        Academic / Project
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <span>{exp.company}</span>
                    {exp.companyUrl && (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-75 hover:opacity-100"
                        title={exp.company}
                      >
                        <ExternalLink className="w-3 h-3 inline" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.startDate} – {exp.endDate}</span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Responsibilities list */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="space-y-1.5 mb-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 list-disc list-inside">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="leading-normal">
                      <span className="text-zinc-700 dark:text-zinc-300">{resp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Technologies used */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex-wrap">
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <Code2 className="w-3 h-3" />
                    Skills:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
