import React, { useState } from 'react';
import {
  Home,
  User,
  Code2,
  Layers,
  FileText,
  Mail,
  Sun,
  Moon,
  Download,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { Language, translations } from '../i18n/translations';

export type NavSectionId = 'home' | 'about' | 'projects' | 'skills' | 'blog' | 'contact';

interface NavbarProps {
  activeSection: NavSectionId;
  onNavigate: (section: NavSectionId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  lang: Language;
  onToggleLanguage: () => void;
  onOpenCv: () => void;
  firstName: string;
  isAdminView: boolean;
  onExitAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isDark,
  onToggleTheme,
  lang,
  onToggleLanguage,
  onOpenCv,
  firstName,
  isAdminView,
  onExitAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navItems: {
    id: NavSectionId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'about', label: t.nav.about, icon: User },
    { id: 'projects', label: t.nav.projects, icon: Code2 },
    { id: 'skills', label: t.nav.skills, icon: Layers },
    { id: 'blog', label: t.nav.blog, icon: FileText },
    { id: 'contact', label: t.nav.contact, icon: Mail },
  ];

  const displayFirstName =
    lang === 'ar' && firstName === 'Gehad' ? t.brandName : firstName;

  const handleLinkClick = (id: NavSectionId) => {
    setMobileMenuOpen(false);
    if (isAdminView) {
      onExitAdmin();
      setTimeout(() => onNavigate(id), 50);
    } else {
      onNavigate(id);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-10 pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-6 pointer-events-auto">
        {/* Left: Custom glowing monogram logo "G" + "Gehad" */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="group flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl py-1 px-1 cursor-pointer"
          aria-label={`${displayFirstName} ${t.nav.home}`}
        >
          <div className="relative flex items-center justify-center w-10 h-10">
            <div
              className="absolute inset-0 rounded-xl bg-blue-500/25 blur-md group-hover:bg-blue-400/40 transition-all duration-200"
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative w-10 h-10 drop-shadow-[0_0_12px_rgba(59,130,246,0.75)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="monogramGrad" x1="6" y1="6" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="55%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <path
                d="M32.5 13.5C29.8 10.1 25.8 8 21.2 8C13.3 8 7 14.3 7 22C7 29.7 13.3 36 21.2 36C27.5 36 32.8 32 34.6 26.5"
                stroke="url(#monogramGrad)"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
              <path
                d="M21 22H33M33 22L28.5 17.5M33 22L26.5 29.5"
                stroke="#38BDF8"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35 8L36 10.5L38.5 11.5L36 12.5L35 15L34 12.5L31.5 11.5L34 10.5L35 8Z"
                fill="#60A5FA"
              />
            </svg>
          </div>
          <span className="font-[var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {displayFirstName}
          </span>
        </button>

        {/* Center: Floating Pill Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/85 dark:bg-[#071124]/80 backdrop-blur-xl border border-slate-200/90 dark:border-blue-500/25 shadow-[0_8px_32px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_32px_rgba(3,7,18,0.65),0_0_24px_rgba(37,99,235,0.14)]"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !isAdminView && activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-blue-500/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600/80 dark:text-blue-400/80'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Language Switch + Dark/Light toggle + Download CV outlined pill + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label={t.nav.switchLangLabel}
            title={t.nav.switchLangLabel}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-full bg-white/85 dark:bg-[#071124]/80 backdrop-blur-xl border border-slate-200 dark:border-blue-500/30 text-xs font-semibold text-slate-700 dark:text-blue-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-[0_0_16px_rgba(59,130,246,0.35)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{t.nav.langBadge}</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? t.nav.switchToLight : t.nav.switchToDark}
            title={isDark ? t.nav.switchToLight : t.nav.switchToDark}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/85 dark:bg-[#071124]/80 backdrop-blur-xl border border-slate-200 dark:border-blue-500/30 text-slate-700 dark:text-blue-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-[0_0_16px_rgba(59,130,246,0.35)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenCv}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 bg-white/85 dark:bg-[#071124]/75 backdrop-blur-xl border border-blue-600/40 dark:border-blue-400/45 text-slate-900 dark:text-white hover:border-blue-500 dark:hover:border-cyan-400 hover:bg-blue-50/80 dark:hover:bg-blue-500/15 shadow-[0_0_18px_rgba(37,99,235,0.12)] hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>{t.nav.downloadCv}</span>
            <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={t.nav.toggleMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/85 dark:bg-[#071124]/80 backdrop-blur-xl border border-slate-200 dark:border-blue-500/30 text-slate-700 dark:text-slate-200 hover:border-blue-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-md ms-auto rounded-2xl bg-white/95 dark:bg-[#071124]/95 backdrop-blur-xl border border-slate-200 dark:border-blue-500/30 p-3 shadow-2xl pointer-events-auto">
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !isAdminView && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-blue-500/15'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCv();
            }}
            className="sm:hidden mt-2.5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-blue-500/40 text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-500/10 cursor-pointer"
          >
            <span>{t.nav.downloadCv}</span>
            <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      )}
    </header>
  );
};
