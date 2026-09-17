import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Calendar,
  User,
  Users,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Video,
  ChevronRight
} from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = usePortfolio();
  const navigate = useNavigate();

  const project = data.projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
            <p className="text-sm text-zinc-500 mb-6">
              The project case study you are looking for does not exist or has been removed.
            </p>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find next project for smooth case study browsing
  const currentIndex = data.projects.findIndex((p) => p.id === project.id);
  const nextProject = data.projects[(currentIndex + 1) % data.projects.length];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-6">
            <Link to="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Projects
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{project.title}</span>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate('/#projects')}
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>

          {/* Case Study Header */}
          <header className="mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                {project.category}
              </span>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
                  project.status === 'Completed'
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                {project.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              {project.shortDescription}
            </p>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 font-mono text-xs mb-6">
              <div>
                <div className="text-zinc-400 flex items-center gap-1 mb-1">
                  <Calendar className="w-3.5 h-3.5" /> Date
                </div>
                <div className="font-semibold text-zinc-800 dark:text-zinc-200">{project.date}</div>
              </div>
              <div>
                <div className="text-zinc-400 flex items-center gap-1 mb-1">
                  <User className="w-3.5 h-3.5" /> Role
                </div>
                <div className="font-semibold text-zinc-800 dark:text-zinc-200">{project.role || 'Full-Stack'}</div>
              </div>
              <div>
                <div className="text-zinc-400 flex items-center gap-1 mb-1">
                  <Users className="w-3.5 h-3.5" /> Team Size
                </div>
                <div className="font-semibold text-zinc-800 dark:text-zinc-200">{project.teamSize || 'Individual'}</div>
              </div>
              <div>
                <div className="text-zinc-400 flex items-center gap-1 mb-1">
                  <Layers className="w-3.5 h-3.5" /> Domain
                </div>
                <div className="font-semibold text-zinc-800 dark:text-zinc-200">{project.category}</div>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && project.githubUrl.trim().length > 0 && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium text-xs hover:bg-zinc-800 dark:hover:bg-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
              )}

              {project.liveUrl && project.liveUrl.trim().length > 0 && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-500" />
                  <span>Launch Live Application</span>
                </a>
              )}

              {project.demoVideo && project.demoVideo.trim().length > 0 && (
                <a
                  href={project.demoVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 text-xs font-medium"
                >
                  <Video className="w-4 h-4 text-rose-500" />
                  <span>Watch Walkthrough</span>
                </a>
              )}
            </div>
          </header>

          {/* Project Media or Architecture Visual Header */}
          <div className="mb-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-900 shadow-md">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full max-h-[420px] object-cover"
              />
            ) : (
              <div className="p-8 sm:p-12 bg-gradient-to-br from-zinc-900 via-zinc-950 to-[#09090b] text-white font-mono">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>SYSTEM TOPOLOGY &amp; ARCHITECTURE DIAGRAM</span>
                  </div>
                  <span>ID: {project.id.toUpperCase()}</span>
                </div>

                <div className="py-8 text-center space-y-4">
                  <div className="inline-block p-4 rounded-xl bg-zinc-800/80 border border-zinc-700">
                    <Cpu className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
                    <div className="text-sm font-bold text-zinc-100">{project.title} System Engine</div>
                    <div className="text-xs text-zinc-400 mt-1">{project.architecture || 'Distributed Application Architecture'}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex flex-wrap justify-between items-center text-xs text-zinc-400 gap-2">
                  <span>Stack: {project.technologies.slice(0, 4).join(' • ')}</span>
                  <span>Engineering Mode: Production Ready</span>
                </div>
              </div>
            )}
          </div>

          {/* Section: Overview */}
          <section className="mb-12 space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              Executive Overview
            </h2>
            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.fullDescription || project.shortDescription}
            </p>
          </section>

          {/* Section: Problem & Solution Split */}
          <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Problem */}
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs font-semibold mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>THE OPERATIONAL PROBLEM</span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                The Challenge Addressed
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.challenges}
              </p>
            </div>

            {/* The Solution */}
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>THE ARCHITECTED SOLUTION</span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Implementation Strategy
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Section: Key Features */}
          {project.features && project.features.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                Key Engineered Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Tech Stack */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              Technology Stack
            </h2>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Architecture & How It Works */}
          {project.architecture && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                Architecture &amp; System Flow
              </h2>
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-100 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                <div className="text-zinc-400 text-xs mb-3">// High-Level Component Interaction</div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400">
                  {project.architecture}
                </div>
              </div>
            </section>
          )}

          {/* Section: What I Learned */}
          {project.learning && (
            <section className="mb-12">
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>ENGINEERING TAKEAWAYS</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  What I Learned from Building This
                </h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.learning}
                </p>
              </div>
            </section>
          )}

          {/* Screenshots Gallery if available */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                Application Screenshots
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.screenshots.map((shot, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
                    <img src={shot} alt={`${project.title} screenshot ${idx + 1}`} className="w-full h-auto" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Next Project Footer Bar */}
          {nextProject && nextProject.id !== project.id && (
            <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-zinc-500">
                Next Project Case Study:
              </div>
              <Link
                to={`/project/${nextProject.id}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <span>{nextProject.title} ({nextProject.category})</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};
