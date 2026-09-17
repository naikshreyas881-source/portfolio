import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Star,
  Eye,
  EyeOff,
  ExternalLink,
  X,
  Layers,
  Code,
  FileText,
  Image as ImageIcon,
  BookOpen,
  Info
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project, ProjectCategory, ProjectStatus } from '../../types/portfolio';
import { ConfirmModal } from './ConfirmModal';

type EditorTab = 'basic' | 'description' | 'features' | 'technology' | 'links' | 'media' | 'casestudy';

export const ProjectEditor: React.FC = () => {
  const {
    data,
    addProject,
    updateProject,
    deleteProject,
    duplicateProject,
    reorderProjects,
    toggleProjectVisibility
  } = usePortfolio();

  const { projects } = data;

  const [searchQuery, setSearchQuery] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<EditorTab>('basic');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [newFeatureText, setNewFeatureText] = useState('');
  const [newTechText, setNewTechText] = useState('');
  const [newScreenshotText, setNewScreenshotText] = useState('');

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateNew = () => {
    const newProj: Project = {
      id: `project-${Date.now().toString().slice(-4)}`,
      title: 'New Engineering Project',
      shortDescription: 'Concise summary of the architectural problem and system solution.',
      fullDescription: 'Comprehensive overview detailing system design, user workflows, and engineering highlights.',
      category: 'Full Stack',
      status: 'In Progress',
      date: new Date().getFullYear().toString(),
      technologies: ['TypeScript', 'React', 'Node.js'],
      features: ['Core operational workflow with data validation'],
      challenges: 'Primary architectural challenge or network constraint.',
      solution: 'Applied pattern, library, or distributed technique to resolve constraints.',
      learning: 'Key technical insights gained during implementation.',
      githubUrl: 'https://github.com/naikshreyas881-source',
      liveUrl: '',
      image: '',
      screenshots: [],
      architecture: 'Client UI <-> Backend Service <-> Database',
      demoVideo: '',
      featured: false,
      teamSize: 'Individual Builder',
      role: 'Full-Stack Developer',
      howItWorks: 'End-to-end data lifecycle from user action to persistent state.',
      visible: true
    };
    addProject(newProj);
    setEditingProject(newProj);
    setActiveTab('basic');
  };

  const handleSaveModal = () => {
    if (!editingProject) return;
    updateProject(editingProject.id, editingProject);
    setEditingProject(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteProject(deleteConfirmId);
      if (editingProject?.id === deleteConfirmId) {
        setEditingProject(null);
      }
      setDeleteConfirmId(null);
    }
  };

  // Feature tag helpers
  const handleAddFeature = () => {
    if (!editingProject || !newFeatureText.trim()) return;
    setEditingProject({
      ...editingProject,
      features: [...editingProject.features, newFeatureText.trim()]
    });
    setNewFeatureText('');
  };

  const handleRemoveFeature = (idx: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      features: editingProject.features.filter((_, i) => i !== idx)
    });
  };

  // Tech tag helpers
  const handleAddTech = () => {
    if (!editingProject || !newTechText.trim()) return;
    const tech = newTechText.trim();
    if (!editingProject.technologies.includes(tech)) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, tech]
      });
    }
    setNewTechText('');
  };

  const handleRemoveTech = (tech: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      technologies: editingProject.technologies.filter(t => t !== tech)
    });
  };

  // Screenshots helpers
  const handleAddScreenshot = () => {
    if (!editingProject || !newScreenshotText.trim()) return;
    setEditingProject({
      ...editingProject,
      screenshots: [...editingProject.screenshots, newScreenshotText.trim()]
    });
    setNewScreenshotText('');
  };

  const handleRemoveScreenshot = (idx: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      screenshots: editingProject.screenshots.filter((_, i) => i !== idx)
    });
  };

  const projectToDelete = projects.find(p => p.id === deleteConfirmId);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderGit2 className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Project Case Studies</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Add, reorder, and edit full-stack engineering case studies. Changes appear automatically on both the home page and dedicated project pages.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Filter projects by title, stack, or category..."
          className="w-full max-w-sm px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <div className="text-xs font-mono text-zinc-400 shrink-0">
          {projects.length} Total Projects
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`p-5 rounded-2xl border transition-all bg-white dark:bg-zinc-900 ${
                project.visible === false
                  ? 'border-dashed border-zinc-300 dark:border-zinc-800 opacity-60'
                  : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-bold text-base text-zinc-900 dark:text-white">
                      {project.title}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {project.category}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-md font-mono font-medium ${
                        project.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-mono bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 6).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="text-[10px] font-mono text-zinc-400 self-center">
                        +{project.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                  {/* Reorder Buttons */}
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => reorderProjects(index, index - 1)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === projects.length - 1}
                    onClick={() => reorderProjects(index, index + 1)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => toggleProjectVisibility(project.id)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    title={project.visible === false ? 'Make visible' : 'Hide from public'}
                  >
                    {project.visible === false ? (
                      <EyeOff className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>

                  {/* Duplicate */}
                  <button
                    type="button"
                    onClick={() => duplicateProject(project.id)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    title="Duplicate project"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {/* Preview Case Study */}
                  <Link
                    to={`/projects/${project.id}`}
                    target="_blank"
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-emerald-500"
                    title="View case study page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(project);
                      setActiveTab('basic');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(project.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <FolderGit2 className="w-10 h-10 mx-auto text-zinc-400 mb-2 opacity-60" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">No projects found</h3>
            <p className="text-xs text-zinc-500 mt-1">Try clearing your search query or add a new project.</p>
          </div>
        )}
      </div>

      {/* Tabbed Project Editor Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="h-16 px-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-5 h-5 text-emerald-500" />
                <h2 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                  Editing: {editingProject.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="px-6 border-b border-zinc-200 dark:border-zinc-800 flex overflow-x-auto gap-1 py-2 bg-zinc-50 dark:bg-zinc-950">
              {[
                { id: 'basic' as const, label: 'Basic Info', icon: Info },
                { id: 'description' as const, label: 'Description', icon: FileText },
                { id: 'features' as const, label: 'Features', icon: Layers },
                { id: 'technology' as const, label: 'Tech Stack', icon: Code },
                { id: 'links' as const, label: 'Links', icon: ExternalLink },
                { id: 'media' as const, label: 'Media', icon: ImageIcon },
                { id: 'casestudy' as const, label: 'Case Study', icon: BookOpen }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs border border-zinc-200 dark:border-zinc-800'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Tab 1: Basic Info */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Category
                      </label>
                      <select
                        value={editingProject.category}
                        onChange={e => setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Web">Web</option>
                        <option value="Data">Data</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Status
                      </label>
                      <select
                        value={editingProject.status}
                        onChange={e => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Planned">Planned</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Year / Date
                      </label>
                      <input
                        type="text"
                        value={editingProject.date}
                        onChange={e => setEditingProject({ ...editingProject, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                        placeholder="2026"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={editingProject.role}
                        onChange={e => setEditingProject({ ...editingProject, role: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                        placeholder="Full-Stack Developer & System Designer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Team Size
                      </label>
                      <input
                        type="text"
                        value={editingProject.teamSize}
                        onChange={e => setEditingProject({ ...editingProject, teamSize: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                        placeholder="Solo / Individual Builder"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                      <input
                        type="checkbox"
                        checked={editingProject.featured}
                        onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="rounded text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>Mark as Featured Project</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                      <input
                        type="checkbox"
                        checked={editingProject.visible !== false}
                        onChange={e => setEditingProject({ ...editingProject, visible: e.target.checked })}
                        className="rounded text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>Publicly Visible</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Tab 2: Description */}
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Short Description (Card Summary)
                    </label>
                    <input
                      type="text"
                      value={editingProject.shortDescription}
                      onChange={e => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Full Description (Case Study Overview)
                    </label>
                    <textarea
                      rows={4}
                      value={editingProject.fullDescription}
                      onChange={e => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Problem Statement
                    </label>
                    <textarea
                      rows={3}
                      value={editingProject.problem || editingProject.challenges}
                      onChange={e => setEditingProject({
                        ...editingProject,
                        problem: e.target.value,
                        challenges: e.target.value
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Solution Architecture
                    </label>
                    <textarea
                      rows={3}
                      value={editingProject.solution || ''}
                      onChange={e => setEditingProject({ ...editingProject, solution: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      What I Learned
                    </label>
                    <textarea
                      rows={3}
                      value={editingProject.learning}
                      onChange={e => setEditingProject({ ...editingProject, learning: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Features */}
              {activeTab === 'features' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      Key Engineering Features
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {editingProject.features.length} Features
                    </span>
                  </div>

                  <div className="space-y-2">
                    {editingProject.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <input
                          type="text"
                          value={f}
                          onChange={e => {
                            const updated = [...editingProject.features];
                            updated[idx] = e.target.value;
                            setEditingProject({ ...editingProject, features: updated });
                          }}
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="p-1.5 text-zinc-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <input
                      type="text"
                      value={newFeatureText}
                      onChange={e => setNewFeatureText(e.target.value)}
                      placeholder="Add key feature..."
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl"
                    >
                      Add Feature
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 4: Technology */}
              {activeTab === 'technology' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    Technology Tags (Unlimited)
                  </span>

                  <div className="flex flex-wrap gap-2 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 min-h-[60px]">
                    {editingProject.technologies.map(tech => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-mono border border-zinc-200 dark:border-zinc-700"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tech)}
                          className="text-zinc-400 hover:text-rose-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechText}
                      onChange={e => setNewTechText(e.target.value)}
                      placeholder="Add technology (e.g. SQLite, Docker, JWT)..."
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 5: Links */}
              {activeTab === 'links' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="text"
                      value={editingProject.githubUrl}
                      onChange={e => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Live Application URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingProject.liveUrl}
                      onChange={e => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    />
                    <span className="text-[11px] text-zinc-400 mt-1 block">
                      If left empty, &quot;Live Demo&quot; button will be hidden safely on public pages.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Demo Video URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingProject.demoVideo}
                      onChange={e => setEditingProject({ ...editingProject, demoVideo: e.target.value })}
                      placeholder="https://youtube.com/..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>
              )}

              {/* Tab 6: Media */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Thumbnail Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingProject.image}
                      onChange={e => setEditingProject({ ...editingProject, image: e.target.value })}
                      placeholder="Leave empty to use clean typography and system diagram fallback"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Architecture Flow Summary
                    </label>
                    <input
                      type="text"
                      value={editingProject.architecture}
                      onChange={e => setEditingProject({ ...editingProject, architecture: e.target.value })}
                      placeholder="Client <-> REST API <-> Engine <-> Database"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  {/* Screenshots */}
                  <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      Additional Screenshots
                    </span>
                    {editingProject.screenshots.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={s}
                          onChange={e => {
                            const updated = [...editingProject.screenshots];
                            updated[idx] = e.target.value;
                            setEditingProject({ ...editingProject, screenshots: updated });
                          }}
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveScreenshot(idx)}
                          className="p-1.5 text-zinc-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newScreenshotText}
                        onChange={e => setNewScreenshotText(e.target.value)}
                        placeholder="Image URL..."
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                      />
                      <button
                        type="button"
                        onClick={handleAddScreenshot}
                        className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold rounded-xl"
                      >
                        Add Image
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 7: Case Study */}
              {activeTab === 'casestudy' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      How It Works (System Workflow Narrative)
                    </label>
                    <textarea
                      rows={4}
                      value={editingProject.howItWorks || ''}
                      onChange={e => setEditingProject({ ...editingProject, howItWorks: e.target.value })}
                      placeholder="Step-by-step technical explanation of the user journey, network requests, and algorithmic decisions..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="h-16 px-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
              >
                Save Project Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Project?"
        message={`Are you sure you want to permanently delete "${projectToDelete?.title || 'this project'}"? This action cannot be undone.`}
        confirmLabel="Delete Project"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
