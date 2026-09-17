import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Home } from './pages/Home';
import { Loader2 } from 'lucide-react';

// Code-split heavier routes for optimal initial page-load speed
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage }))
);
const ProjectDetails = lazy(() =>
  import('./pages/ProjectDetails').then(m => ({ default: m.ProjectDetails }))
);
const EditPortfolio = lazy(() =>
  import('./pages/EditPortfolio').then(m => ({ default: m.EditPortfolio }))
);

// Editor sub-routes
const DashboardOverview = lazy(() =>
  import('./components/editor/DashboardOverview').then(m => ({ default: m.DashboardOverview }))
);
const ProfileEditor = lazy(() =>
  import('./components/editor/ProfileEditor').then(m => ({ default: m.ProfileEditor }))
);
const ContactEditor = lazy(() =>
  import('./components/editor/ContactEditor').then(m => ({ default: m.ContactEditor }))
);
const ProjectEditor = lazy(() =>
  import('./components/editor/ProjectEditor').then(m => ({ default: m.ProjectEditor }))
);
const SkillEditor = lazy(() =>
  import('./components/editor/SkillEditor').then(m => ({ default: m.SkillEditor }))
);
const ExperienceEditor = lazy(() =>
  import('./components/editor/ExperienceEditor').then(m => ({ default: m.ExperienceEditor }))
);
const EducationEditor = lazy(() =>
  import('./components/editor/EducationEditor').then(m => ({ default: m.EducationEditor }))
);
const CgpaEditor = lazy(() =>
  import('./components/editor/CgpaEditor').then(m => ({ default: m.CgpaEditor }))
);
const CertificationEditor = lazy(() =>
  import('./components/editor/CertificationEditor').then(m => ({ default: m.CertificationEditor }))
);
const AchievementEditor = lazy(() =>
  import('./components/editor/AchievementEditor').then(m => ({ default: m.AchievementEditor }))
);
const LearningEditor = lazy(() =>
  import('./components/editor/LearningEditor').then(m => ({ default: m.LearningEditor }))
);
const JourneyEditor = lazy(() =>
  import('./components/editor/JourneyEditor').then(m => ({ default: m.JourneyEditor }))
);
const CodingProfileEditor = lazy(() =>
  import('./components/editor/CodingProfileEditor').then(m => ({ default: m.CodingProfileEditor }))
);
const SocialLinksEditor = lazy(() =>
  import('./components/editor/SocialLinksEditor').then(m => ({ default: m.SocialLinksEditor }))
);
const ResumeEditor = lazy(() =>
  import('./components/editor/ResumeEditor').then(m => ({ default: m.ResumeEditor }))
);
const SettingsEditor = lazy(() =>
  import('./components/editor/SettingsEditor').then(m => ({ default: m.SettingsEditor }))
);
const BackupRestore = lazy(() =>
  import('./components/editor/BackupRestore').then(m => ({ default: m.BackupRestore }))
);

const PageLoader: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#09090b] text-zinc-500">
    <Loader2 className="w-6 h-6 animate-spin text-emerald-500 mb-2" />
    <span className="text-xs font-mono">Loading view...</span>
  </div>
);

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/project/:id" element={<ProjectDetails />} />

              {/* Studio Editor Nested Routes */}
              <Route path="/edit" element={<EditPortfolio />}>
                <Route index element={<DashboardOverview />} />
                <Route path="profile" element={<ProfileEditor />} />
                <Route path="contact" element={<ContactEditor />} />
                <Route path="projects" element={<ProjectEditor />} />
                <Route path="skills" element={<SkillEditor />} />
                <Route path="experience" element={<ExperienceEditor />} />
                <Route path="education" element={<EducationEditor />} />
                <Route path="cgpa" element={<CgpaEditor />} />
                <Route path="certifications" element={<CertificationEditor />} />
                <Route path="achievements" element={<AchievementEditor />} />
                <Route path="learning" element={<LearningEditor />} />
                <Route path="journey" element={<JourneyEditor />} />
                <Route path="coding" element={<CodingProfileEditor />} />
                <Route path="social" element={<SocialLinksEditor />} />
                <Route path="resume" element={<ResumeEditor />} />
                <Route path="settings" element={<SettingsEditor />} />
                <Route path="backup" element={<BackupRestore />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default App;
