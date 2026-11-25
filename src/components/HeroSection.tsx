import React from 'react';
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Code2,
  Zap,
  Gem,
  Sparkles,
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { initialPortfolioState } from '../data/initialPortfolio';
import { Language, translations } from '../i18n/translations';

interface HeroSectionProps {
  profile: ProfileData;
  lang: Language;
  onExploreWork: () => void;
  onGetInTouch: () => void;
}

const badgeIcons = [Code2, Zap, Gem, Sparkles];

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  lang,
  onExploreWork,
  onGetInTouch,
}) => {
  const t = translations[lang];
  const defaultProfile = initialPortfolioState.profile;

  const firstName =
    lang === 'ar' && profile.firstName === defaultProfile.firstName
      ? t.hero.firstName
      : profile.firstName;
  const lastName =
    lang === 'ar' && profile.lastName === defaultProfile.lastName
      ? t.hero.lastName
      : profile.lastName;
  const roleTitle =
    lang === 'ar' && profile.roleTitle === defaultProfile.roleTitle
      ? t.hero.roleTitle
      : profile.roleTitle;
  const bio =
    lang === 'ar' && profile.bio === defaultProfile.bio
      ? t.hero.bio
      : profile.bio;

  const whatsappHref = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-10 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#030712] transition-colors duration-300"
    >
      {/* Atmospheric Futuristic Blue Background Layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-36 -left-32 w-[520px] h-[520px] rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-[130px]" />
        <div className="absolute top-1/4 right-[8%] w-[460px] h-[460px] rounded-full bg-blue-400/15 dark:bg-blue-600/25 blur-[135px]" />
        <div className="absolute -bottom-44 left-1/3 w-[640px] h-[340px] rounded-full bg-cyan-500/10 dark:bg-blue-500/15 blur-[120px]" />

        <svg
          className="absolute bottom-0 inset-x-0 w-full h-44 sm:h-56 opacity-45 dark:opacity-75"
          viewBox="0 0 1440 220"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveStroke1" x1="0" y1="120" x2="1440" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.65" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="waveFill1" x1="720" y1="40" x2="720" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 140C240 90 480 210 760 175C1040 140 1240 85 1440 130V220H0V140Z"
            fill="url(#waveFill1)"
          />
          <path
            d="M0 140C240 90 480 210 760 175C1040 140 1240 85 1440 130"
            stroke="url(#waveStroke1)"
            strokeWidth="1.6"
          />
          <path
            d="M0 175C310 215 620 115 950 165C1180 198 1340 155 1440 165"
            stroke="#3B82F6"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
        </svg>

        <svg
          className="hidden sm:block absolute top-44 left-[3.5%] w-7 h-7 text-blue-500/60 dark:text-blue-400/75"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 1L14.2 9.8L23 12L14.2 14.2L12 23L9.8 14.2L1 12L9.8 9.8L12 1Z" />
        </svg>
        <svg
          className="hidden sm:block absolute bottom-24 right-[3%] w-4 h-4 text-cyan-500/60 dark:text-cyan-300/75"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 1L14.2 9.8L23 12L14.2 14.2L12 23L9.8 14.2L1 12L9.8 9.8L12 1Z" />
        </svg>
      </div>

      {/* Main 2-Column Hero Grid */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* Left Column (or start column in RTL) */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            {/* Greeting Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/85 dark:bg-[#0B1730]/80 backdrop-blur-md border border-blue-500/30 dark:border-blue-400/35 shadow-[0_0_20px_rgba(37,99,235,0.16)] mb-6">
              <span className="text-sm font-medium text-slate-800 dark:text-slate-100 whitespace-nowrap">
                {t.hero.greeting} <span role="img" aria-label="waving hand">👋</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 rtl:rotate-180" />
            </div>

            {/* Large Bold Typography */}
            <h1 className="font-[var(--font-display)] font-extrabold tracking-tight leading-[1.08] text-5xl sm:text-6xl xl:text-[4.5rem] text-balance">
              <span className="block text-slate-950 dark:text-white">
                {firstName}
              </span>
              <span className="relative inline-block mt-1 pb-3">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-blue-500 dark:to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(37,99,235,0.3)]">
                  {lastName}
                </span>
                {/* Glowing Underline Accent */}
                <svg
                  className="absolute inset-x-0 -bottom-0.5 w-full h-4 overflow-visible"
                  viewBox="0 0 280 18"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="underlineGlow" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="55%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M4 11C75 4 195 3 274 9"
                    stroke="url(#underlineGlow)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(59,130,246,0.9)]"
                  />
                  <path
                    d="M48 16C115 11 190 10 245 14"
                    stroke="#60A5FA"
                    strokeOpacity="0.65"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              dir="ltr"
              className="mt-5 font-[var(--font-mono)] text-base sm:text-xl font-medium tracking-wide text-slate-700 dark:text-slate-200 flex items-center gap-2"
            >
              <span className="text-blue-600 dark:text-blue-400 font-semibold">&lt;</span>
              <span>{roleTitle}</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">/&gt;</span>
            </p>

            {/* Short Bio */}
            <p className="mt-5 max-w-xl text-base sm:text-[17px] leading-relaxed text-slate-600 dark:text-slate-300/90">
              {bio}
            </p>

            {/* Two CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreWork}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white whitespace-nowrap shrink-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_28px_rgba(37,99,235,0.5)] hover:shadow-[0_0_38px_rgba(59,130,246,0.75)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>{t.hero.exploreWork}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onGetInTouch}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 bg-white/80 dark:bg-[#09152B]/70 backdrop-blur-md border border-slate-300 dark:border-blue-500/40 text-slate-900 dark:text-white hover:border-blue-600 dark:hover:border-cyan-400 hover:bg-blue-50/80 dark:hover:bg-blue-500/15 shadow-sm dark:shadow-[0_0_20px_rgba(37,99,235,0.12)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{t.hero.getInTouch}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Fixed Tilted Neon Frame + Light Trails + Vertical Social Bar */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end gap-6 sm:gap-10">
            <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[390px] sm:h-[390px] xl:w-[430px] xl:h-[430px]">
              {/* Subtle Glowing Light Trails / Orbital Rings */}
              <svg
                className="pointer-events-none absolute -inset-12 w-[calc(100%+6rem)] h-[calc(100%+6rem)] animate-orbit-pulse"
                viewBox="0 0 520 520"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="trailBlue" x1="40" y1="80" x2="480" y2="430" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                    <stop offset="38%" stopColor="#38BDF8" stopOpacity="0.85" />
                    <stop offset="70%" stopColor="#2563EB" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M65 205C45 120 135 55 245 95C360 135 465 260 445 365C428 450 315 470 215 415C130 368 82 280 65 205Z"
                  stroke="url(#trailBlue)"
                  strokeWidth="1.5"
                />
                <path
                  d="M42 295C110 385 265 445 435 420"
                  stroke="#60A5FA"
                  strokeOpacity="0.7"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_10px_rgba(56,189,248,0.85)]"
                />
                <circle cx="178" cy="76" r="3" fill="#60A5FA" className="drop-shadow-[0_0_8px_#3B82F6]" />
                <circle cx="445" cy="290" r="2.5" fill="#38BDF8" className="drop-shadow-[0_0_8px_#38BDF8]" />
                <circle cx="95" cy="368" r="2" fill="#93C5FD" />
              </svg>

              {/* Glowing Electric Blue Butterfly Accent */}
              <div
                className="pointer-events-none absolute -top-2 right-0 sm:right-2 z-20 animate-float-slow"
                aria-hidden="true"
              >
                <svg
                  className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_18px_rgba(59,130,246,0.9)]"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="wingGrad" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M32 30C27 16 14 8 8 15C3 21 12 31 28 33C17 36 12 45 18 50C24 55 30 45 32 36C34 45 40 55 46 50C52 45 47 36 36 33C52 31 61 21 56 15C50 8 37 16 32 30Z"
                    fill="url(#wingGrad)"
                    stroke="#BAE6FD"
                    strokeWidth="1.4"
                  />
                  <line x1="32" y1="22" x2="32" y2="42" stroke="#E0F2FE" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>

              {/* Tilted Rounded-Square Glowing Frame (Fixed Portrait - No Visitor Upload) */}
              <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] xl:w-[370px] xl:h-[370px] -rotate-[10deg] rounded-[2.25rem] p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 shadow-[0_0_45px_rgba(37,99,235,0.45)] dark:shadow-[0_0_60px_rgba(37,99,235,0.5)]">
                <div className="relative w-full h-full rounded-[2.15rem] overflow-hidden bg-gradient-to-br from-[#0F2963] via-[#09183B] to-[#030712] flex items-center justify-center">
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(56,189,248,0.28),transparent_60%)]"
                    aria-hidden="true"
                  />

                  <div className="relative w-full h-full rotate-[10deg] scale-[1.16] flex items-center justify-center">
                    {profile.portraitUrl ? (
                      <img
                        src={profile.portraitUrl}
                        alt={t.hero.portraitAlt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-[50%_8%] select-none pointer-events-none"
                      />
                    ) : (
                      <div className="relative w-full h-full flex flex-col items-center justify-end pt-8">
                        <svg
                          viewBox="0 0 320 340"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[88%] h-[88%] drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
                          aria-label={t.hero.portraitAlt}
                        >
                          <defs>
                            <linearGradient id="silhouetteGrad" x1="160" y1="30" x2="160" y2="335" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.92" />
                              <stop offset="55%" stopColor="#64748B" stopOpacity="0.88" />
                              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
                            </linearGradient>
                            <linearGradient id="rimHighlight" x1="85" y1="60" x2="235" y2="300" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.65" />
                              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M160 56C124 56 96 86 96 124C96 162 124 192 160 192C196 192 224 162 224 124C224 86 196 56 160 56Z"
                            fill="url(#silhouetteGrad)"
                            stroke="url(#rimHighlight)"
                            strokeWidth="2"
                          />
                          <path
                            d="M52 332C58 258 102 214 160 214C218 214 262 258 268 332H52Z"
                            fill="url(#silhouetteGrad)"
                            stroke="url(#rimHighlight)"
                            strokeWidth="2"
                          />
                          <path
                            d="M146 266L138 274L146 282M174 266L182 274L174 282M164 263L156 285"
                            stroke="#60A5FA"
                            strokeOpacity="0.7"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Far Right Vertical Floating Social Icons */}
            <aside
              aria-label="Social Links"
              className="hidden sm:flex flex-col items-center gap-3.5 shrink-0"
            >
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/85 dark:bg-[#071124]/80 backdrop-blur-md border border-slate-300 dark:border-blue-500/35 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:border-blue-500 dark:hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/85 dark:bg-[#071124]/80 backdrop-blur-md border border-slate-300 dark:border-blue-500/35 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:border-blue-500 dark:hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                title="Email"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/85 dark:bg-[#071124]/80 backdrop-blur-md border border-slate-300 dark:border-blue-500/35 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:border-blue-500 dark:hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/85 dark:bg-[#071124]/80 backdrop-blur-md border border-slate-300 dark:border-blue-500/35 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:border-blue-500 dark:hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.03 2C6.51 2 2.04 6.47 2.04 11.99c0 1.76.46 3.48 1.33 5l-1.41 5.15 5.27-1.38c1.46.8 3.1 1.22 4.8 1.22 5.52 0 9.99-4.47 9.99-9.99C22.02 6.47 17.55 2 12.03 2zm5.82 14.12c-.24.68-1.41 1.3-1.95 1.38-.5.07-1.14.1-1.84-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.28-5.06-4.48-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.03-2.48.27-.3.59-.37.79-.37.2 0 .4.01.57.01.18 0 .43-.07.67.51.24.59.83 2.04.9 2.19.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.53-.15.15-.3.31-.13.61.18.3.78 1.29 1.67 2.08 1.15 1.02 2.11 1.34 2.41 1.49.3.15.48.13.66-.08.18-.2.76-.88.96-1.18.2-.3.41-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.58.35.07.12.07.72-.17 1.4z" />
                </svg>
              </a>
            </aside>
          </div>
        </div>

        {/* Mobile Horizontal Social Row */}
        <div className="sm:hidden mt-8 flex items-center justify-center gap-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/85 dark:bg-[#071124]/80 border border-slate-300 dark:border-blue-500/35 text-slate-700 dark:text-slate-200"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/85 dark:bg-[#071124]/80 border border-slate-300 dark:border-blue-500/35 text-slate-700 dark:text-slate-200"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/85 dark:bg-[#071124]/80 border border-slate-300 dark:border-blue-500/35 text-slate-700 dark:text-slate-200"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/85 dark:bg-[#071124]/80 border border-slate-300 dark:border-blue-500/35 text-slate-700 dark:text-slate-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.03 2C6.51 2 2.04 6.47 2.04 11.99c0 1.76.46 3.48 1.33 5l-1.41 5.15 5.27-1.38c1.46.8 3.1 1.22 4.8 1.22 5.52 0 9.99-4.47 9.99-9.99C22.02 6.47 17.55 2 12.03 2zm5.82 14.12c-.24.68-1.41 1.3-1.95 1.38-.5.07-1.14.1-1.84-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.28-5.06-4.48-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.03-2.48.27-.3.59-.37.79-.37.2 0 .4.01.57.01.18 0 .43-.07.67.51.24.59.83 2.04.9 2.19.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.53-.15.15-.3.31-.13.61.18.3.78 1.29 1.67 2.08 1.15 1.02 2.11 1.34 2.41 1.49.3.15.48.13.66-.08.18-.2.76-.88.96-1.18.2-.3.41-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.58.35.07.12.07.72-.17 1.4z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Bar of Hero: 4 Horizontal Badges */}
      <div className="relative z-10 max-w-5xl w-full mx-auto pt-8 border-t border-slate-200/70 dark:border-blue-500/15">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 items-center">
          {t.hero.badges.map((label, index) => {
            const Icon = badgeIcons[index];
            return (
              <div
                key={label}
                className={`flex items-center justify-center gap-3 py-2 px-4 ${
                  index < t.hero.badges.length - 1
                    ? 'md:border-e md:border-slate-200 dark:md:border-blue-500/20'
                    : ''
                }`}
              >
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 drop-shadow-[0_0_8px_rgba(59,130,246,0.55)]" />
                <span className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
