import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Heart, ArrowUp, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { profile, contact } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#09090b] py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-800/60">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              {profile.name}
            </span>
            <span className="text-xs text-zinc-500 font-mono mt-0.5">
              {profile.role}
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {contact.leetcode && (
              <a
                href={contact.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="LeetCode Profile"
              >
                <Code2 className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> in Karnataka, India
            </span>
            <span>•</span>
            <Link
              to="/edit"
              className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Dev Editor</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
