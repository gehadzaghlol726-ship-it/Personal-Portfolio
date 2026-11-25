import React from 'react';
import { Download, ExternalLink, Printer, X } from 'lucide-react';
import { PortfolioState } from '../types/portfolio';
import { initialPortfolioState } from '../data/initialPortfolio';
import { Language, translations } from '../i18n/translations';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioState;
  lang: Language;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, portfolio, lang }) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const defaultProfile = initialPortfolioState.profile;
  const { profile, projects, skills } = portfolio;

  const fullName =
    lang === 'ar' &&
    profile.firstName === defaultProfile.firstName &&
    profile.lastName === defaultProfile.lastName
      ? `${t.hero.firstName} ${t.hero.lastName}`
      : `${profile.firstName} ${profile.lastName}`;
  const roleTitle =
    lang === 'ar' && profile.roleTitle === defaultProfile.roleTitle
      ? t.hero.roleTitle
      : profile.roleTitle;
  const location =
    lang === 'ar' && profile.location === defaultProfile.location
      ? t.about.locationValue
      : profile.location;
  const summary =
    lang === 'ar' && profile.aboutSummary === defaultProfile.aboutSummary
      ? t.about.summary
      : profile.aboutSummary;
  const education =
    lang === 'ar' &&
    profile.education === defaultProfile.education &&
    profile.institution === defaultProfile.institution
      ? `${t.about.educationDegree} — ${t.about.educationInstitution} (${t.about.educationDuration})`
      : `${profile.education} — ${profile.institution} (${profile.educationDuration})`;

  const getLocalizedProject = (p: PortfolioState['projects'][number]) => {
    const def = initialPortfolioState.projects.find((d) => d.id === p.id);
    if (
      lang === 'ar' &&
      def &&
      p.title === def.title &&
      p.summary === def.summary &&
      t.projects.items[p.id]
    ) {
      return t.projects.items[p.id];
    }
    return p;
  };

  const handleDownloadFile = () => {
    const content = [
      fullName,
      roleTitle,
      `${location} | ${profile.email} | ${profile.githubUrl}`,
      '',
      t.cv.summaryTitle,
      summary,
      '',
      t.cv.educationTitle,
      education,
      '',
      t.cv.skillsTitle,
      ...skills.map((s) => `- ${s.name} (${t.skills.categories[s.category]})`),
      '',
      t.cv.projectsTitle,
      ...projects.map((p) => {
        const localized = getLocalizedProject(p);
        return `- ${localized.title} (${p.year}): ${localized.summary} [${p.stack.join(', ')}]`;
      }),
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.firstName}_${profile.lastName}_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const hasCustomCvUrl = Boolean(profile.cvUrl && profile.cvUrl.trim());
  const isDataPdf = hasCustomCvUrl && profile.cvUrl.startsWith('data:');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/35 p-6 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.cv.closeCv}
          className="absolute top-5 end-5 p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-blue-500/15 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pe-10">
          <p className="text-xs font-[var(--font-mono)] text-blue-600 dark:text-blue-400">
            {t.cv.kicker}
          </p>
          <h2
            id="cv-modal-title"
            className="mt-1 font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white"
          >
            {fullName}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            {roleTitle} · {location}
          </p>
        </div>

        <div className="mt-6 space-y-5 text-sm text-slate-700 dark:text-slate-300">
          <div className="pt-4 border-t border-slate-200 dark:border-blue-500/20">
            <h3 className="font-semibold text-slate-950 dark:text-white mb-1.5">
              {t.cv.summaryTitle}
            </h3>
            <p className="leading-relaxed">{summary}</p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-blue-500/20">
            <h3 className="font-semibold text-slate-950 dark:text-white mb-1.5">
              {t.cv.educationTitle}
            </h3>
            <p>{education}</p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-blue-500/20">
            <h3 className="font-semibold text-slate-950 dark:text-white mb-2">
              {t.cv.skillsTitle}
            </h3>
            <p className="leading-relaxed">
              {skills.map((s) => s.name).join(' · ')}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-blue-500/20">
            <h3 className="font-semibold text-slate-950 dark:text-white mb-2">
              {t.cv.projectsTitle}
            </h3>
            <ul className="space-y-2.5">
              {projects.map((p) => {
                const localized = getLocalizedProject(p);
                return (
                  <li key={p.id}>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {localized.title}
                    </span>{' '}
                    <span className="text-slate-500 dark:text-slate-400">({p.year})</span> —{' '}
                    {localized.summary}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-blue-500/20">
          {hasCustomCvUrl && (
            <a
              href={profile.cvUrl}
              download={isDataPdf ? `${profile.firstName}_${profile.lastName}_CV.pdf` : undefined}
              target={isDataPdf ? undefined : '_blank'}
              rel={isDataPdf ? undefined : 'noopener noreferrer'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
            >
              {isDataPdf ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
              <span>{t.cv.downloadPdfBtn}</span>
            </a>
          )}
          <button
            type="button"
            onClick={handleDownloadFile}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              hasCustomCvUrl
                ? 'border border-slate-300 dark:border-blue-500/35 text-slate-800 dark:text-slate-200 hover:border-blue-500'
                : 'text-white bg-blue-600 hover:bg-blue-500'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{t.cv.downloadBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-300 dark:border-blue-500/35 text-slate-800 dark:text-slate-200 hover:border-blue-500 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.cv.printBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
