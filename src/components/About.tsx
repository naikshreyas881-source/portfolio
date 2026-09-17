import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cpu, Rocket, Brain, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  const pillars = [
    {
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      title: "Full-Stack Development",
      description: "Developing end-to-end web architectures using modern React, TypeScript, and Node.js with emphasis on modular component design."
    },
    {
      icon: <Brain className="w-5 h-5 text-indigo-400" />,
      title: "DSA & Problem Solving",
      description: "Systematically strengthening algorithmic problem-solving skills across arrays, graph traversals, and dynamic programming."
    },
    {
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      title: "Databases & Persistence",
      description: "Designing normalized relational schemas in SQL, writing reliable queries, and exploring client-side caching with IndexedDB."
    },
    {
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      title: "System Thinking",
      description: "Understanding application boundaries, idempotent batch synchronization, API contract validation, and conflict resolution."
    },
    {
      icon: <Rocket className="w-5 h-5 text-rose-400" />,
      title: "Real-World Projects",
      description: "Translating complex operational workflows — like agricultural resource sharing in FarmGrid — into functional software."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      title: "Continuous Learning",
      description: "Tracking technical milestones transparently and keeping pace with evolving software engineering standards."
    }
  ];

  return (
    <section id="about" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              About Me
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Engineering software with curiosity, discipline, and practical rigor.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Narrative bio */}
          <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {profile.aboutText && profile.aboutText.length > 0 ? (
              profile.aboutText.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>{profile.bio}</p>
            )}

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-xs font-mono text-zinc-500 dark:text-zinc-400 space-y-1 mt-6">
              <div className="text-zinc-700 dark:text-zinc-200 font-semibold mb-1">
                // Quick Summary
              </div>
              <div>• Degree: {profile.degree}</div>
              <div>• University: {profile.college}</div>
              <div>• Expected Graduation: {profile.graduationYear}</div>
              <div>• Location: {profile.location}</div>
            </div>
          </div>

          {/* Technical Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="mb-2.5 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 inline-block">
                  {pillar.icon}
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
