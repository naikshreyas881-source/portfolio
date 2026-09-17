import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="group flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all overflow-hidden shadow-xs hover:shadow-md"
    >
      <div>
        {/* Project Visual / Fallback Header */}
        <div className="relative w-full h-44 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden flex items-center justify-center">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            /* Professional Architectural Fallback Visual */
            <div className="w-full h-full p-5 flex flex-col justify-between bg-gradient-to-br from-zinc-100 via-zinc-100 to-zinc-200/70 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <Cpu className="w-4 h-4 text-emerald-500" />
                  <span>{project.category} Architecture</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  SYS://{project.id}
                </span>
              </div>

              <div className="py-2">
                <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  stack =&gt; [
                </div>
                <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 pl-4 truncate font-medium">
                  {project.technologies.slice(0, 4).map(t => `'${t}'`).join(', ')}
                </div>
                <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  ]
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-2">
                <span>Role: {project.role || 'Full-Stack'}</span>
                <span>{project.date}</span>
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium shadow-xs ${
                project.status === 'Completed'
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
              }`}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>{project.category}</span>
            <span>•</span>
            <span>{project.date}</span>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
            {project.title}
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Technologies tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-1.5 py-0.5 text-[11px] font-mono text-zinc-400">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/30 flex items-center justify-between">
        <Link
          to={`/project/${project.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group-hover:translate-x-0.5"
        >
          <span>Read Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          {project.githubUrl && project.githubUrl.trim().length > 0 && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
              title="View GitHub Repository"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {project.liveUrl && project.liveUrl.trim().length > 0 && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
              title="Open Live Application"
              aria-label={`Open live demo for ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
