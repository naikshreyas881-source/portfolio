import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, FolderKanban, ChevronRight, Sparkles } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProjectCard } from '../components/ProjectCard';
import { usePortfolio } from '../context/PortfolioContext';

export const ProjectsPage: React.FC = () => {
  const { data } = usePortfolio();
  const { projects, profile } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories
  const categories = useMemo(() => {
    const defaultCategories = ['All', 'Full Stack', 'Web', 'Data', 'Other'];
    const customCategories = Array.from(new Set(projects.map(p => p.category)));
    const combined = ['All', ...defaultCategories.filter(c => c !== 'All')];
    for (const cat of customCategories) {
      if (!combined.includes(cat)) {
        combined.push(cat);
      }
    }
    return combined;
  }, [projects]);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (project.visible === false) return false;

      const matchesCategory =
        selectedCategory === 'All' ||
        project.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        project.title.toLowerCase().includes(q) ||
        project.shortDescription.toLowerCase().includes(q) ||
        project.technologies.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-6">
            <Link to="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Projects</span>
          </div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{profile.graduationLabel} Engineering Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Engineering Projects &amp; Case Studies
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Explore real-world software platforms, architectural breakdowns, offline synchronization protocols, and algorithmic pipelines built by Shreyas Naik.
              </p>
            </div>

            <div className="text-xs font-mono text-zinc-500 shrink-0">
              Showing <span className="font-semibold text-zinc-900 dark:text-zinc-100">{filteredProjects.length}</span> of {projects.filter(p => p.visible !== false).length} Projects
            </div>
          </div>

          {/* Controls: Search & Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-10 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => {
                const count = cat === 'All'
                  ? projects.filter(p => p.visible !== false).length
                  : projects.filter(p => p.visible !== false && p.category.toLowerCase() === cat.toLowerCase()).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold shadow-xs'
                        : 'bg-white dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    {cat}
                    <span className="ml-1.5 text-[10px] opacity-60 font-mono">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by tech or title..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
              <FolderKanban className="w-8 h-8 mx-auto text-zinc-400 mb-2 opacity-60" />
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                No projects match your criteria.
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Try searching for a different keyword or select &quot;All&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-3 py-1.5 text-xs rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 font-medium transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
