import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Terminal, CheckCircle2, Zap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const RecruiterSnapshot: React.FC = () => {
  const { data } = usePortfolio();
  const { profile, projects, learningGoals } = data;

  const projectCount = projects.length;
  const inProgressCount = projects.filter(p => p.status === 'In Progress').length;
  const activeLearningCount = learningGoals.filter(g => g.status === 'Active').length;

  const cards = [
    {
      title: 'Current Status',
      value: `${profile.degree.replace('Bachelor of Engineering in ', 'B.E. ')}`,
      detail: `${profile.college} (Graduating ${profile.graduationYear})`,
      icon: <GraduationCap className="w-4 h-4 text-indigo-400" />,
    },
    {
      title: 'Engineering Focus',
      value: 'Full-Stack & Systems',
      detail: 'React, Node.js, Relational DBs & Distributed Architecture',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
    },
    {
      title: 'Technical Portfolio',
      value: `${projectCount} Core Projects (${inProgressCount} Active)`,
      detail: projects.map(p => p.title).join(' • '),
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
    },
    {
      title: 'Algorithmic Foundation',
      value: 'Active DSA Practice',
      detail: `${activeLearningCount} active learning tracks tracked`,
      icon: <Code className="w-4 h-4 text-cyan-400" />,
    },
  ];

  return (
    <section className="py-6 border-y border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Recruiter &amp; Engineering Snapshot
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verifiable Academic &amp; Project Data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {card.title}
                </span>
                <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800">
                  {card.icon}
                </div>
              </div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                {card.value}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                {card.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
