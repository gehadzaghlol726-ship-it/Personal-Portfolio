import React from 'react';
import { MapPin, Languages, Sparkles, Compass } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ProfileData } from '../types/portfolio';
import { initialPortfolioState } from '../data/initialPortfolio';
import { Language, translations } from '../i18n/translations';

interface AboutSectionProps {
  profile: ProfileData;
  lang: Language;
  projectCount: number;
  skillCount: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  lang,
  projectCount,
  skillCount,
}) => {
  const t = translations[lang];
  const defaultProfile = initialPortfolioState.profile;
  const shouldReduceMotion = useReducedMotion();

  const summary =
    lang === 'ar' && profile.aboutSummary === defaultProfile.aboutSummary
      ? t.about.summary
      : profile.aboutSummary;
  const location =
    lang === 'ar' && profile.location === defaultProfile.location
      ? t.about.locationValue
      : profile.location;
  const languages =
    lang === 'ar' && profile.languages === defaultProfile.languages
      ? t.about.languagesValue
      : profile.languages;
  const strengths =
    lang === 'ar' && profile.strengths === defaultProfile.strengths
      ? t.about.strengthsValue
      : profile.strengths;

  const infoItems = [
    {
      icon: MapPin,
      title: t.about.locationTitle,
      value: location,
    },
    {
      icon: Languages,
      title: t.about.languagesTitle,
      value: languages,
    },
    {
      icon: Sparkles,
      title: t.about.strengthsTitle,
      value: strengths,
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#040917] border-t border-slate-200/80 dark:border-blue-500/15 overflow-hidden transition-colors duration-300"
    >
      {/* Subtle Futuristic Blue Glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 end-1/4 w-[420px] h-[420px] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* Left Column: Heading + Tabular Metrics */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wide">
              {t.about.kicker}
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.about.heading}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-blue-500/20">
              <div>
                <p className="font-[var(--font-mono)] text-3xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                  {projectCount}+
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {t.about.completedBuilds}
                </p>
              </div>
              <div>
                <p className="font-[var(--font-mono)] text-3xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                  {skillCount}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {t.about.coreTech}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Glowing Career Objective Glass Card + Quick Info Cards */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/90 dark:bg-[#071124]/80 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25 shadow-sm dark:shadow-[0_0_35px_rgba(37,99,235,0.12)] hover:border-blue-500/45 transition-all duration-200">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                <Compass className="w-4 h-4 shrink-0" />
                <span>{t.about.careerObjectiveLabel}</span>
              </div>
              <p className="text-base sm:text-[17px] leading-relaxed text-slate-700 dark:text-slate-200">
                {summary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {infoItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-5 rounded-2xl bg-slate-50/90 dark:bg-[#071124]/75 backdrop-blur-xl border border-slate-200 dark:border-blue-500/20 hover:border-blue-500/50 dark:hover:border-cyan-400/50 hover:shadow-[0_0_24px_rgba(37,99,235,0.16)] transition-all duration-200"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-slate-900 dark:text-slate-100 leading-snug">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
