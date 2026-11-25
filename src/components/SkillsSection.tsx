import React from 'react';
import {
  Code2,
  Smartphone,
  Globe,
  Database,
  Network,
  Cpu,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SkillCategory, SkillItem } from '../types/portfolio';
import { Language, translations } from '../i18n/translations';

interface SkillsSectionProps {
  skills: SkillItem[];
  lang: Language;
}

const categoryConfig: {
  id: SkillCategory;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'Programming Languages', icon: Code2 },
  { id: 'Mobile Development', icon: Smartphone },
  { id: 'Web Development', icon: Globe },
  { id: 'Databases', icon: Database },
  { id: 'Networking', icon: Network },
  { id: 'Tools & Hardware', icon: Cpu },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, lang }) => {
  const t = translations[lang];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#030712] border-t border-slate-200/80 dark:border-blue-500/15 overflow-hidden transition-colors duration-300"
    >
      {/* Subtle Futuristic Blue Aura */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 start-1/4 w-[480px] h-[360px] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[135px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wide">
              {t.skills.kicker}
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.skills.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categoryConfig.map((category, index) => {
              const Icon = category.icon;
              const categorySkills = skills.filter((s) => s.category === category.id);
              if (categorySkills.length === 0) return null;

              return (
                <motion.div
                  key={category.id}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-[#071124]/80 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25 hover:border-blue-500/65 dark:hover:border-cyan-400/60 shadow-sm dark:shadow-[0_0_24px_rgba(37,99,235,0.08)] hover:shadow-[0_0_34px_rgba(37,99,235,0.22)] transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors duration-200 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-[var(--font-display)] text-lg font-bold text-slate-950 dark:text-white">
                        {t.skills.categories[category.id]}
                      </h3>
                    </div>

                    <span className="font-[var(--font-mono)] text-xs tabular-nums text-slate-500 dark:text-blue-300/75">
                      {categorySkills.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {categorySkills.map((skill) => {
                      const displayLabel =
                        lang === 'ar' && t.skills.itemLabels[skill.name]
                          ? t.skills.itemLabels[skill.name]
                          : skill.name;

                      return (
                        <span
                          key={skill.id}
                          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium bg-slate-100/90 dark:bg-[#0B1B3B]/85 border border-slate-200 dark:border-blue-500/30 text-slate-800 dark:text-blue-100 hover:border-blue-500 dark:hover:border-cyan-400 hover:bg-blue-50 dark:hover:bg-blue-500/20 hover:text-blue-700 dark:hover:text-white hover:shadow-[0_0_14px_rgba(59,130,246,0.35)] transition-all duration-150"
                        >
                          {displayLabel}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
