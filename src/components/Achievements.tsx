import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink, Calendar, Tag } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Achievements: React.FC = () => {
  const { data } = usePortfolio();
  const { achievements } = data;

  // Crucial requirement: If empty, hide completely. Never invent achievements.
  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Honors &amp; Recognition
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Key Achievements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <Trophy className="w-5 h-5" />
                  </div>
                  {ach.url && (
                    <a
                      href={ach.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-amber-500 transition-colors"
                      title="View Proof / Announcement"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 mb-1">
                  <Tag className="w-3 h-3" />
                  <span>{ach.category}</span>
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  {ach.title}
                </h3>

                {ach.organization && (
                  <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                    {ach.organization}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ach.date}</span>
                </div>
                {ach.proof && (
                  <span className="text-[11px] text-emerald-500">Verified</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
