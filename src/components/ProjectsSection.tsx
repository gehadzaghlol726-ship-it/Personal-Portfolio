import React, { useState } from 'react';
import {
  ArrowUpRight,
  Github,
  X,
  Cpu,
  Globe,
  Smartphone,
  Network,
  ChevronLeft,
  ChevronRight,
  Images,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ProjectCategory, ProjectItem } from '../types/portfolio';
import { initialPortfolioState } from '../data/initialPortfolio';
import { Language, translations } from '../i18n/translations';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  lang: Language;
}

const filterOptions: ('All' | ProjectCategory)[] = [
  'All',
  'Web',
  'Mobile',
  'IoT & Hardware',
  'Networking',
];

const ProjectVisualBanner: React.FC<{
  category: ProjectCategory;
  imageUrl?: string;
  gallery?: string[];
  title: string;
  inModal?: boolean;
  activeSlide?: number;
  onSlideChange?: (nextIndex: number) => void;
}> = ({
  category,
  imageUrl,
  gallery,
  title,
  inModal = false,
  activeSlide = 0,
  onSlideChange,
}) => {
  const CategoryIcon =
    category === 'IoT & Hardware'
      ? Cpu
      : category === 'Networking'
      ? Network
      : category === 'Mobile'
      ? Smartphone
      : Globe;

  const slides = gallery && gallery.length > 0 ? gallery : imageUrl ? [imageUrl] : [];
  const currentSrc = slides[activeSlide] || imageUrl;

  if (currentSrc) {
    const hasMultiple = slides.length > 1;
    return (
      <div
        className={`relative w-full overflow-hidden rounded-t-2xl bg-[#040B1A] border-b border-blue-500/20 flex items-center justify-center ${
          inModal ? 'h-64 sm:h-80' : 'h-56'
        }`}
      >
        {/* Ambient matching backdrop */}
        <img
          src={currentSrc}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-35 select-none pointer-events-none"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-[#040B1A]/35 to-[#040B1A]/45"
          aria-hidden="true"
        />
        {/* Full uncropped foreground project image */}
        <img
          src={currentSrc}
          alt={title}
          referrerPolicy="no-referrer"
          className="relative z-10 w-full h-full object-contain p-1.5 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3.5 start-3.5 z-20 flex items-center justify-center w-9 h-9 rounded-xl bg-slate-950/75 border border-blue-400/40 text-cyan-300 backdrop-blur-md">
          <CategoryIcon className="w-4 h-4" />
        </div>

        {!inModal && hasMultiple && (
          <div className="absolute top-3.5 end-3.5 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-blue-400/40 text-xs font-[var(--font-mono)] tabular-nums text-blue-200 backdrop-blur-md">
            <Images className="w-3.5 h-3.5 text-cyan-300" />
            <span>{slides.length}</span>
          </div>
        )}

        {inModal && hasMultiple && onSlideChange && (
          <>
            <button
              type="button"
              onClick={() =>
                onSlideChange((activeSlide - 1 + slides.length) % slides.length)
              }
              aria-label="Previous screenshot"
              className="absolute start-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-slate-950/75 border border-blue-400/40 text-white hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => onSlideChange((activeSlide + 1) % slides.length)}
              aria-label="Next screenshot"
              className="absolute end-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-slate-950/75 border border-blue-400/40 text-white hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
            <div className="absolute bottom-3 end-3 z-20 px-2.5 py-1 rounded-full bg-slate-950/80 border border-blue-400/40 text-xs font-[var(--font-mono)] tabular-nums text-blue-200 backdrop-blur-md">
              {activeSlide + 1} / {slides.length}
            </div>
          </>
        )}
      </div>
    );
  }

  if (category === 'IoT & Hardware') {
    return (
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0B1E49] via-[#071330] to-[#030712] border-b border-blue-500/20 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.22),transparent_60%)]"
          aria-hidden="true"
        />
        <svg className="w-56 h-32 opacity-80" viewBox="0 0 220 120" fill="none" aria-hidden="true">
          <rect x="30" y="34" width="160" height="54" rx="12" stroke="#3B82F6" strokeOpacity="0.6" strokeWidth="1.5" fill="#09183B" />
          <circle cx="65" cy="88" r="14" stroke="#38BDF8" strokeWidth="2" fill="#030712" />
          <circle cx="155" cy="88" r="14" stroke="#38BDF8" strokeWidth="2" fill="#030712" />
          <path d="M168 48C184 40 198 40 208 48M174 58C186 52 196 52 204 58" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="52" y="48" width="44" height="22" rx="4" stroke="#60A5FA" strokeOpacity="0.7" />
          <line x1="108" y1="54" x2="145" y2="54" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1.5" />
          <line x1="108" y1="64" x2="135" y2="64" stroke="#3B82F6" strokeOpacity="0.6" strokeWidth="1.5" />
        </svg>
        <div className="absolute top-3.5 start-3.5 flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/35 text-cyan-300 backdrop-blur-md">
          <Cpu className="w-4 h-4" />
        </div>
      </div>
    );
  }

  if (category === 'Networking') {
    return (
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0B1E49] via-[#071330] to-[#030712] border-b border-blue-500/20 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.28),transparent_60%)]"
          aria-hidden="true"
        />
        <svg className="w-56 h-32 opacity-85" viewBox="0 0 220 120" fill="none" aria-hidden="true">
          <line x1="110" y1="28" x2="55" y2="82" stroke="#3B82F6" strokeOpacity="0.65" strokeWidth="1.6" />
          <line x1="110" y1="28" x2="110" y2="82" stroke="#38BDF8" strokeOpacity="0.75" strokeWidth="1.6" />
          <line x1="110" y1="28" x2="165" y2="82" stroke="#3B82F6" strokeOpacity="0.65" strokeWidth="1.6" />
          <circle cx="110" cy="28" r="14" fill="#09183B" stroke="#38BDF8" strokeWidth="1.8" />
          <rect x="40" y="76" width="30" height="20" rx="5" fill="#09183B" stroke="#60A5FA" strokeWidth="1.5" />
          <rect x="95" y="76" width="30" height="20" rx="5" fill="#09183B" stroke="#60A5FA" strokeWidth="1.5" />
          <rect x="150" y="76" width="30" height="20" rx="5" fill="#09183B" stroke="#60A5FA" strokeWidth="1.5" />
        </svg>
        <div className="absolute top-3.5 start-3.5 flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/35 text-cyan-300 backdrop-blur-md">
          <Network className="w-4 h-4" />
        </div>
      </div>
    );
  }

  if (category === 'Mobile') {
    return (
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0B1E49] via-[#071330] to-[#030712] border-b border-blue-500/20 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.22),transparent_60%)]"
          aria-hidden="true"
        />
        <svg className="w-40 h-32 opacity-85" viewBox="0 0 160 120" fill="none" aria-hidden="true">
          <rect x="52" y="14" width="56" height="92" rx="10" fill="#09183B" stroke="#38BDF8" strokeWidth="1.6" />
          <rect x="60" y="28" width="40" height="22" rx="4" fill="#1D4ED8" fillOpacity="0.4" stroke="#60A5FA" strokeOpacity="0.6" />
          <rect x="60" y="58" width="40" height="10" rx="3" fill="#3B82F6" fillOpacity="0.35" />
          <rect x="60" y="74" width="28" height="10" rx="3" fill="#38BDF8" fillOpacity="0.35" />
        </svg>
        <div className="absolute top-3.5 start-3.5 flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/35 text-cyan-300 backdrop-blur-md">
          <Smartphone className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // Web default visual
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0B1E49] via-[#071330] to-[#030712] border-b border-blue-500/20 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_45%_25%,rgba(59,130,246,0.28),transparent_60%)]"
        aria-hidden="true"
      />
      <svg className="w-56 h-32 opacity-85" viewBox="0 0 220 120" fill="none" aria-hidden="true">
        <rect x="24" y="18" width="172" height="84" rx="10" fill="#09183B" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="1.6" />
        <line x1="24" y1="36" x2="196" y2="36" stroke="#3B82F6" strokeOpacity="0.35" />
        <circle cx="38" cy="27" r="3" fill="#60A5FA" />
        <circle cx="48" cy="27" r="3" fill="#38BDF8" />
        <rect x="38" y="48" width="66" height="40" rx="6" fill="#1D4ED8" fillOpacity="0.35" stroke="#60A5FA" strokeOpacity="0.5" />
        <rect x="114" y="48" width="66" height="16" rx="4" fill="#38BDF8" fillOpacity="0.25" />
        <rect x="114" y="72" width="48" height="16" rx="4" fill="#3B82F6" fillOpacity="0.25" />
      </svg>
      <div className="absolute top-3.5 start-3.5 flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/35 text-cyan-300 backdrop-blur-md">
        <Globe className="w-4 h-4" />
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const t = translations[lang];
  const shouldReduceMotion = useReducedMotion();

  const getLocalizedProject = (project: ProjectItem) => {
    const def = initialPortfolioState.projects.find((d) => d.id === project.id);
    if (
      lang === 'ar' &&
      def &&
      project.title === def.title &&
      project.summary === def.summary &&
      project.description === def.description &&
      t.projects.items[project.id]
    ) {
      return {
        ...project,
        ...t.projects.items[project.id],
      };
    }
    return project;
  };

  const visibleProjects = (
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)
  ).map(getLocalizedProject);

  const activeLocalized = activeProject ? getLocalizedProject(activeProject) : null;

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#040917] border-t border-slate-200/80 dark:border-blue-500/15 overflow-hidden transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 end-0 w-[440px] h-[380px] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[135px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wide">
                {t.projects.kicker}
              </p>
              <h2 className="mt-2 font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                {t.projects.heading}
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label={t.projects.kicker}
              className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25 self-start lg:self-auto"
            >
              {filterOptions.map((category) => {
                const isSelected = selectedCategory === category;
                const label =
                  category === 'All'
                    ? t.projects.allFilter
                    : t.projects.categories[category];
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-[0_0_16px_rgba(37,99,235,0.45)]'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {visibleProjects.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-blue-500/20 bg-slate-50 dark:bg-[#071124]">
              <p className="text-slate-600 dark:text-slate-400">
                {t.projects.empty}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col justify-between rounded-2xl bg-slate-50/90 dark:bg-[#071124]/85 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25 hover:border-blue-500/65 dark:hover:border-cyan-400/60 shadow-sm dark:shadow-[0_0_24px_rgba(37,99,235,0.08)] hover:shadow-[0_0_36px_rgba(37,99,235,0.22)] transition-all duration-200 overflow-hidden"
                >
                  <div>
                    <ProjectVisualBanner
                      category={project.category}
                      imageUrl={project.imageUrl}
                      gallery={project.gallery}
                      title={project.title}
                    />

                    <div className="p-6">
                      <p className="text-xs font-[var(--font-mono)] text-slate-500 dark:text-blue-300/80">
                        {t.projects.categories[project.category]} <span aria-hidden="true">·</span> {project.year}
                      </p>

                      <h3 className="mt-2 font-[var(--font-display)] text-xl font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {project.summary}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#0B1B3B] border border-slate-200 dark:border-blue-500/30 text-slate-700 dark:text-blue-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Bar */}
                  <div className="px-6 pb-6 pt-4 border-t border-slate-200/80 dark:border-blue-500/15 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSlide(0);
                        setActiveProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_16px_rgba(37,99,235,0.35)] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>{t.projects.details}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
                    </button>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-slate-300 dark:border-blue-500/35 text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-cyan-400 hover:text-blue-600 dark:hover:text-white transition-colors whitespace-nowrap"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{t.projects.github}</span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {activeLocalized && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/35 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <ProjectVisualBanner
              category={activeLocalized.category}
              imageUrl={activeLocalized.imageUrl}
              gallery={activeLocalized.gallery}
              title={activeLocalized.title}
              inModal
              activeSlide={activeSlide}
              onSlideChange={setActiveSlide}
            />

            <button
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label={t.projects.closeModal}
              className="absolute top-4 end-4 z-30 p-2 rounded-lg bg-slate-950/70 text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {activeLocalized.gallery && activeLocalized.gallery.length > 1 && (
              <div className="px-6 pt-3 pb-1 flex items-center gap-2 overflow-x-auto bg-slate-100/70 dark:bg-[#040B1A] border-b border-slate-200 dark:border-blue-500/20">
                {activeLocalized.gallery.map((thumbUrl, idx) => (
                  <button
                    key={thumbUrl}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`${activeLocalized.title} ${idx + 1}`}
                    className={`relative w-16 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeSlide === idx
                        ? 'border-blue-500 dark:border-cyan-400 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumbUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 sm:p-8">
              <p className="text-xs font-[var(--font-mono)] text-blue-600 dark:text-blue-400">
                {t.projects.categories[activeLocalized.category]} · {activeLocalized.year}
              </p>
              <h3
                id="project-modal-title"
                className="mt-2 font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white"
              >
                {activeLocalized.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {activeLocalized.description}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-blue-500/20">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5">
                  {t.projects.techStack}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeLocalized.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-[#0B1B3B] border border-slate-200 dark:border-blue-500/30 text-slate-800 dark:text-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={activeLocalized.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{t.projects.openLive}</span>
                  <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
