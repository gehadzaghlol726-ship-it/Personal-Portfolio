import React, { useState } from 'react';
import {
  Smartphone,
  Globe,
  Cpu,
  Terminal,
  ArrowUpRight,
  Award,
  X,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CertificationItem } from '../types/portfolio';
import { initialPortfolioState } from '../data/initialPortfolio';
import { Language, translations } from '../i18n/translations';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  lang: Language;
}

const categoryIconMap: Record<CertificationItem['category'], React.ComponentType<{ className?: string }>> = {
  Mobile: Smartphone,
  Web: Globe,
  'Hardware & IoT': Cpu,
  'Systems & OS': Terminal,
};

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  lang,
}) => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const t = translations[lang];
  const shouldReduceMotion = useReducedMotion();

  const getLocalizedCert = (cert: CertificationItem) => {
    const def = initialPortfolioState.certifications.find((d) => d.id === cert.id);
    if (
      lang === 'ar' &&
      def &&
      cert.title === def.title &&
      cert.issuer === def.issuer &&
      t.about.certificationsItems[cert.id]
    ) {
      const arData = t.about.certificationsItems[cert.id];
      return {
        ...cert,
        title: arData.title,
        issuer: arData.issuer,
        period: arData.period,
        focus: arData.focus,
        displayCategory: arData.category,
      };
    }
    return {
      ...cert,
      displayCategory: cert.category,
    };
  };

  const localizedCerts = certifications.map(getLocalizedCert);
  const activeLocalized = selectedCert ? getLocalizedCert(selectedCert) : null;

  return (
    <section
      id="certifications"
      className="relative py-20 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#040917] border-t border-slate-200/80 dark:border-blue-500/15 overflow-hidden transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 end-1/4 w-[440px] h-[360px] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[135px]" />
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
              {t.about.certificationsKicker}
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.about.certificationsHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localizedCerts.map((cert, index) => {
              const Icon = categoryIconMap[cert.category] || Award;
              return (
                <motion.button
                  key={cert.id}
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group text-start flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-50/90 dark:bg-[#071124]/85 backdrop-blur-xl border border-slate-200 dark:border-blue-500/20 hover:border-blue-500/70 dark:hover:border-cyan-400/65 shadow-sm dark:shadow-[0_0_24px_rgba(37,99,235,0.08)] hover:shadow-[0_0_36px_rgba(59,130,246,0.24)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors rtl:-scale-x-100" />
                    </div>

                    <p className="mt-5 text-xs font-[var(--font-mono)] text-slate-500 dark:text-slate-400">
                      {cert.displayCategory} <span aria-hidden="true">·</span> {cert.period}
                    </p>

                    <h3 className="mt-2 font-[var(--font-display)] text-lg sm:text-xl font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                      {cert.title}
                    </h3>

                    <p className="mt-1.5 text-sm font-medium text-blue-700 dark:text-blue-400">
                      {cert.issuer}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {cert.focus}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Interactive Certification Detail Modal */}
      {activeLocalized && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/40 p-6 sm:p-8 shadow-[0_0_48px_rgba(37,99,235,0.28)]">
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              aria-label={t.about.certificationsClose}
              className="absolute top-5 end-5 p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-blue-500/15 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-xs font-[var(--font-mono)] text-blue-600 dark:text-blue-400">
              {activeLocalized.displayCategory} · {activeLocalized.period}
            </p>
            <h3
              id="cert-modal-title"
              className="mt-2 font-[var(--font-display)] text-2xl font-bold text-slate-950 dark:text-white pe-8"
            >
              {activeLocalized.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-blue-700 dark:text-cyan-400">
              {activeLocalized.issuer}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {activeLocalized.focus}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
