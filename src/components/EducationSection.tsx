import React from 'react';
import { GraduationCap, Calendar, Building2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ProfileData } from '../types/portfolio';
import { initialPortfolioState } from '../data/initialPortfolio';
import { Language, translations } from '../i18n/translations';

interface EducationSectionProps {
  profile: ProfileData;
  lang: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ profile, lang }) => {
  const t = translations[lang];
  const defaultProfile = initialPortfolioState.profile;
  const shouldReduceMotion = useReducedMotion();

  const degree =
    lang === 'ar' && profile.education === defaultProfile.education
      ? t.about.educationDegree
      : profile.education;
  const institution =
    lang === 'ar' && profile.institution === defaultProfile.institution
      ? t.about.educationInstitution
      : profile.institution;
  const duration =
    lang === 'ar' && profile.educationDuration === defaultProfile.educationDuration
      ? t.about.educationDuration
      : profile.educationDuration;

  return (
    <section
      id="education"
      className="relative py-20 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#030712] border-t border-slate-200/80 dark:border-blue-500/15 overflow-hidden transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 start-0 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-cyan-500/10 dark:bg-blue-600/15 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wide">
              {t.about.educationKicker}
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.about.educationHeading}
            </h2>
          </div>

          {/* Education Timeline Card */}
          <div className="relative ps-8 sm:ps-10">
            {/* Vertical Timeline Track */}
            <div
              className="absolute top-3 bottom-3 start-3 sm:start-3.5 w-px bg-gradient-to-b from-blue-500 via-cyan-400/60 to-transparent"
              aria-hidden="true"
            />
            {/* Timeline Node */}
            <div
              className="absolute top-7 start-1.5 sm:start-2 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20 shadow-[0_0_16px_rgba(59,130,246,0.9)]"
              aria-hidden="true"
            />

            <div className="group p-6 sm:p-8 rounded-2xl bg-white/90 dark:bg-[#071124]/85 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25 hover:border-blue-500/60 dark:hover:border-cyan-400/55 shadow-sm dark:shadow-[0_0_32px_rgba(37,99,235,0.12)] hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-[var(--font-mono)] text-blue-600 dark:text-blue-400">
                      {t.about.educationTitle} <span aria-hidden="true">·</span> {t.about.educationStatus}
                    </p>
                    <h3 className="mt-1 font-[var(--font-display)] text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                      {degree}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                      <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{institution}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-[var(--font-mono)] tabular-nums text-slate-700 dark:text-blue-200 md:text-end shrink-0">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{duration}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
