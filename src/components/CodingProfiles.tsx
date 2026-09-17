import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Award, Terminal } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

export const CodingProfiles: React.FC = () => {
  const { data } = usePortfolio();
  const { codingProfiles } = data;

  // Filter out any profile that has neither a URL nor a username
  const activeProfiles = codingProfiles.filter(
    p => (p.url && p.url.trim().length > 0) || (p.username && p.username.trim().length > 0)
  );

  if (activeProfiles.length === 0) return null;

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />;
      case 'leetcode':
        return <Code2 className="w-5 h-5 text-amber-500" />;
      case 'hackerrank':
        return <Terminal className="w-5 h-5 text-emerald-500" />;
      case 'codechef':
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return <Code2 className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="profiles" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Verified Profiles
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Coding &amp; Open Source Profiles
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Direct links to authentic repositories, code repositories, and problem-solving platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeProfiles.map((p, idx) => {
            const hasLink = Boolean(p.url && p.url.trim().length > 0);
            const CardWrapper = hasLink ? 'a' : 'div';
            const cardProps = hasLink
              ? {
                  href: p.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  'aria-label': `Open ${p.platform} profile for ${p.username || 'Shreyas Naik'}`,
                }
              : {};

            return (
              <motion.div
                key={p.id || p.platform}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <CardWrapper
                  {...cardProps}
                  className={`block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all ${
                    hasLink ? 'group cursor-pointer hover:shadow-sm' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                        {getPlatformIcon(p.platform)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {p.platform}
                        </div>
                        {p.username && (
                          <div className="text-xs font-mono text-zinc-500 truncate max-w-[120px]">
                            @{p.username}
                          </div>
                        )}
                      </div>
                    </div>

                    {hasLink && (
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors" />
                    )}
                  </div>

                  {/* Optional authentic metrics (only displayed if provided) */}
                  {(p.rating || p.solvedProblems || p.stars) && (
                    <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono">
                      {p.rating && (
                        <div>
                          <div className="text-zinc-400">Rating</div>
                          <div className="font-semibold text-zinc-800 dark:text-zinc-200">{p.rating}</div>
                        </div>
                      )}
                      {p.solvedProblems && (
                        <div>
                          <div className="text-zinc-400">Solved</div>
                          <div className="font-semibold text-zinc-800 dark:text-zinc-200">{p.solvedProblems}</div>
                        </div>
                      )}
                      {p.stars && (
                        <div>
                          <div className="text-zinc-400">Stars</div>
                          <div className="font-semibold text-zinc-800 dark:text-zinc-200">{p.stars}</div>
                        </div>
                      )}
                    </div>
                  )}
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
