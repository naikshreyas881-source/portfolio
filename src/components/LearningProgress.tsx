import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, BookOpen, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const LearningProgress: React.FC = () => {
  const { data } = usePortfolio();
  const { learningGoals } = data;

  if (!learningGoals || learningGoals.length === 0) {
    return null;
  }

  return (
    <section id="learning" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Continuous Improvement
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Currently Learning &amp; My Progress
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
              Transparent tracking of active learning curves, core topics completed, and ongoing study tracks.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>{learningGoals.length} Active Tracks</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {learningGoals.map((goal, idx) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {goal.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {goal.status}
                  </span>
                </div>

                {/* Percentage & Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mb-1.5">
                    <span>Mastery Progress</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {/* Topics Completed */}
                {goal.topicsCompleted && goal.topicsCompleted.length > 0 && (
                  <div className="mb-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Completed Topics</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {goal.topicsCompleted.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next up / remaining */}
                {goal.topicsRemaining && goal.topicsRemaining.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      <BookOpen className="w-3 h-3 text-indigo-400" />
                      <span>Up Next</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {goal.topicsRemaining.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-[11px]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer metadata */}
              <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Started: {goal.startDate}</span>
                </div>
                <div>Updated: {goal.lastUpdated}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
