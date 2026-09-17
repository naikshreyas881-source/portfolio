import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Settings, ExternalLink } from 'lucide-react';
import { resolveAssetUrl } from '../utils/assets';
import { ThemeToggle } from './ThemeToggle';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar: React.FC = () => {
  const { data, hasCustomizations } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHomePage) return;

      const sections = ['about', 'skills', 'projects', 'education', 'academics', 'learning', 'experience', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const visibility = data.settings?.sectionVisibility || {
    about: true,
    skills: true,
    projects: true,
    learning: true,
    experience: true,
    education: true,
    cgpa: true,
    journey: true,
    contact: true,
  };

  const navLinks = [
    { id: 'about', label: 'About', href: '#about', visible: visibility.about !== false },
    { id: 'skills', label: 'Skills', href: '#skills', visible: visibility.skills !== false },
    { id: 'projects', label: 'Projects', href: '#projects', visible: visibility.projects !== false },
    { id: 'academics', label: 'Academics', href: '#academics', visible: (visibility.cgpa !== false || visibility.education !== false) },
    { id: 'learning', label: 'Learning', href: '#learning', visible: visibility.learning !== false && Boolean(data.learningGoals?.length) },
    { id: 'experience', label: 'Experience', href: '#experience', visible: visibility.experience !== false && Boolean(data.experience?.length) },
    { id: 'journey', label: 'Journey', href: '#journey', visible: visibility.journey !== false && Boolean(data.journey?.length) },
    { id: 'contact', label: 'Contact', href: '#contact', visible: visibility.contact !== false },
  ].filter((item) => item.visible);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/85 dark:bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-800 border border-zinc-700/60 dark:border-zinc-700 flex items-center justify-center font-mono font-bold text-sm text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
            SN
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              {data.profile.name}
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono leading-none">
              {data.profile.graduationLabel || "JNNCE '28"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {isHomePage ? (
            navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })
          ) : (
            <Link
              to="/"
              className="px-3 py-1.5 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              ← Back to Portfolio
            </Link>
          )}
        </nav>

        {/* Right Actions: Resume, Edit Mode, Theme Toggle */}
        <div className="hidden md:flex items-center gap-2.5">
          {data.contact.resume && (
            <a
              href={resolveAssetUrl(data.contact.resume)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Resume</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}

          <Link
            to="/edit"
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-xs font-medium transition-colors"
            title="Open Local Developer Editor"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Editor</span>
            {hasCustomizations && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Customizations active" />
            )}
          </Link>

          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {isHomePage ? (
              navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                >
                  {link.label}
                </a>
              ))
            ) : (
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              >
                ← Back to Home
              </Link>
            )}
          </nav>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            {data.contact.resume && (
              <a
                href={resolveAssetUrl(data.contact.resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                <FileText className="w-4 h-4 text-emerald-500" />
                View Resume
              </a>
            )}

            <Link
              to="/edit"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <Settings className="w-4 h-4" />
              Editor Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
