import React, { useState, useMemo } from 'react';
import { Search, FolderKanban } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { usePortfolio } from '../context/PortfolioContext';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamically extract distinct categories from data
  const categories = useMemo(() => {
    const defaultCategories = ['All', 'Web', 'Full Stack', 'Data', 'Other'];
    const projectCategories = Array.from(new Set(projects.map(p => p.category)));
    // Combine preserving order and ensuring unique entries
    const combined = ['All', ...defaultCategories.filter(c => c !== 'All')];
    for (const cat of projectCategories) {
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
    <section id="projects" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Portfolio Work
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Featured Engineering Projects
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Explore authentic platforms, architectural breakdowns, and implementation case studies.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-500">
            Showing <span className="font-semibold text-zinc-900 dark:text-zinc-100">{filteredProjects.length}</span> of {projects.length} Projects
          </div>
        </div>

        {/* Controls: Search & Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = cat === 'All'
                ? projects.length
                : projects.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

              return (
                <button
                  key={cat}
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
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              No projects match your filter criteria.
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Try resetting the search query or selecting &quot;All&quot;.
            </p>
            <button
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
    </section>
  );
};
