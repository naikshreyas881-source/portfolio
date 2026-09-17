import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Code2, MapPin, Mail, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { profile, contact } = data;

  const socialLinks = [
    { label: 'GitHub', href: contact.github, icon: <GithubIcon className="w-4 h-4" /> },
    { label: 'LinkedIn', href: contact.linkedin, icon: <LinkedinIcon className="w-4 h-4" /> },
    { label: 'LeetCode', href: contact.leetcode, icon: <Code2 className="w-4 h-4" /> },
  ].filter(item => Boolean(item.href && item.href.trim().length > 0));

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background glow - minimal, not overdone */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{profile.statusAvailability || "Undergraduate @ JNNCE • Graduating 2027"}</span>
          </div>

          {/* Greeting & Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-4">
            Hi, I&apos;m <span className="text-zinc-900 dark:text-zinc-100">{profile.name}</span>
          </h1>

          <div className="text-lg sm:text-xl md:text-2xl font-medium text-zinc-600 dark:text-zinc-300 mb-6 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>{profile.role.split('|')[0]?.trim() || "Computer Science & Engineering Student"}</span>
            <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {profile.role.split('|')[1]?.trim() || "Aspiring Software Engineer"}
            </span>
          </div>

          {/* Bio */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-8">
            {profile.bio}
          </p>

          {/* Quick metadata pills */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-8 font-mono">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>{profile.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{profile.college}</span>
            </div>
            <span>•</span>
            <div>Class of {profile.graduationYear}</div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium text-sm hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-xs"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            {contact.resume && (
              <a
                href={contact.resume}
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 font-medium text-sm transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>Download Resume</span>
              </a>
            )}

            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 font-medium text-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </a>
            )}
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 w-full">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider mr-2">
                Connect:
              </span>
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white/60 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-xs font-medium transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
