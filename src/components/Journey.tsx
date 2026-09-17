import React from 'react';
import { motion } from 'framer-motion';
import { Code, Rocket, Award, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Journey: React.FC = () => {
  const { data } = usePortfolio();
  const { journey } = data;

  if (!journey || journey.length === 0) return null;

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'project':
        return <Rocket className="w-3.5 h-3.5 text-emerald-400" />;
      case 'hackathon':
        return <Award className="w-3.5 h-3.5 text-amber-400" />;
      case 'learning':
        return <BookOpen className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Code className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <section id="journey" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Evolution &amp; Milestones
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Engineering Journey
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Key steps, project launches, and technical milestones marking my path as a software engineer.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-8">
          {journey.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.35 }}
              className="relative group"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-2 border-emerald-500 flex items-center justify-center shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>

              {/* Card */}
              <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      {item.date}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                      {getCategoryIcon(item.category)}
                      {item.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
