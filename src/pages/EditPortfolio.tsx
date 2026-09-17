import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { EditorSidebar } from '../components/editor/EditorSidebar';
import { EditorHeader } from '../components/editor/EditorHeader';

export const EditPortfolio: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      {/* Navigation Sidebar */}
      <EditorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-200">
        {/* Sticky Header */}
        <EditorHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onShowToast={showToast}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
            {toastMessage}
          </div>
        )}

        {/* Studio View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EditPortfolio;
