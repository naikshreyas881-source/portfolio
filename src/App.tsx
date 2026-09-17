import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Home } from './pages/Home';
import { Loader2 } from 'lucide-react';

// Code-split heavier routes for optimal initial page-load speed
const ProjectDetails = lazy(() =>
  import('./pages/ProjectDetails').then(module => ({ default: module.ProjectDetails }))
);
const EditPortfolio = lazy(() =>
  import('./pages/EditPortfolio').then(module => ({ default: module.EditPortfolio }))
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
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/edit" element={<EditPortfolio />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default App;
