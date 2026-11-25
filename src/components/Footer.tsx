import React from 'react';
import { Lock, ShieldCheck, Github, Linkedin, Mail } from 'lucide-react';
import { NavSectionId } from './Navbar';
import { ProfileData } from '../types/portfolio';
import { Language, translations } from '../i18n/translations';

interface FooterProps {
  profile: ProfileData;
  lang: Language;
  unreadMessages: number;
  isAdminAuthenticated: boolean;
  onNavigate: (section: NavSectionId) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  lang,
  unreadMessages,
  isAdminAuthenticated,
  onNavigate,
  onOpenAdmin,
}) => {
  const t = translations[lang];
  const fullName =
    lang === 'ar' &&
    profile.firstName === 'Gehad' &&
    profile.lastName === 'Zaghlol'
      ? `${t.hero.firstName} ${t.hero.lastName}`
      : `${profile.firstName} ${profile.lastName}`;

  return (
    <footer className="py-12 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#030712] border-t border-slate-200 dark:border-blue-500/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-start">
          <span className="font-[var(--font-display)] font-bold text-slate-950 dark:text-white">
            {fullName}
          </span>
          <span className="hidden sm:inline text-slate-400" aria-hidden="true">
            ·
          </span>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-600 dark:text-slate-400"
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {t.nav.home}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {t.nav.about}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {t.nav.projects}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('skills')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {t.nav.skills}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {t.nav.blog}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {t.nav.contact}
          </button>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/30 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/30 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/30 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>

          {isAdminAuthenticated ? (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-500/40 bg-blue-50 dark:bg-blue-500/15 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>{t.nav.adminBtn}</span>
              {unreadMessages > 0 && (
                <span className="font-[var(--font-mono)] text-xs tabular-nums">
                  ({unreadMessages})
                </span>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAdmin}
              aria-label={t.footer.adminDashboard}
              title={t.footer.adminDashboard}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-transparent border border-slate-200/70 dark:border-blue-500/15 text-slate-400 dark:text-slate-600 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
