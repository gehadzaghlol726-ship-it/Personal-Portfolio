import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ArrowUpRight,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ContactMessage, ProfileData } from '../types/portfolio';
import { initialPortfolioState } from '../data/initialPortfolio';
import { Language, translations } from '../i18n/translations';

interface ContactSectionProps {
  profile: ProfileData;
  lang: Language;
  onSubmitMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  lang,
  onSubmitMessage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = translations[lang];
  const shouldReduceMotion = useReducedMotion();

  const locationText =
    lang === 'ar' && profile.location === initialPortfolioState.profile.location
      ? t.about.locationValue
      : profile.location;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    onSubmitMessage({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim() || (lang === 'ar' ? 'رسالة من الموقع' : 'Portfolio Inquiry'),
      message: message.trim(),
    });

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactCards = [
    {
      icon: Mail,
      label: t.contact.infoEmail,
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
      ltr: true,
    },
    {
      icon: Phone,
      label: t.contact.infoPhone,
      value: profile.phone,
      href: `tel:${profile.phone}`,
      external: false,
      ltr: true,
    },
    {
      icon: MapPin,
      label: t.contact.infoLocation,
      value: locationText,
      href: undefined,
      external: false,
      ltr: false,
    },
    {
      icon: Linkedin,
      label: t.contact.infoLinkedIn,
      value: 'linkedin.com/in/gehad-zaghlol-443456373',
      href: profile.linkedinUrl,
      external: true,
      ltr: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#040917] border-t border-slate-200/80 dark:border-blue-500/15 overflow-hidden transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 end-1/4 w-[440px] h-[360px] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[135px]" />
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
              {t.contact.kicker}
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.contact.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {t.contact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: 4 Contact Info Glass Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactCards.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {item.label}
                        </p>
                        <p
                          dir={item.ltr ? 'ltr' : undefined}
                          className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white truncate"
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                    {item.href && (
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-cyan-400 shrink-0 rtl:-scale-x-100" />
                    )}
                  </div>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="group block p-5 rounded-2xl bg-slate-50/90 dark:bg-[#071124]/85 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25 hover:border-blue-500/65 dark:hover:border-cyan-400/60 shadow-sm hover:shadow-[0_0_28px_rgba(37,99,235,0.2)] transition-all duration-200"
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="p-5 rounded-2xl bg-slate-50/90 dark:bg-[#071124]/85 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Right Side: Glassmorphic Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-slate-50/90 dark:bg-[#071124]/85 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25 shadow-sm dark:shadow-[0_0_32px_rgba(37,99,235,0.1)] space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5"
                    >
                      {t.contact.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#030712]/90 border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5"
                    >
                      {t.contact.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#030712]/90 border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5"
                  >
                    {t.contact.subjectLabel}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t.contact.subjectPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#030712]/90 border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5"
                  >
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#030712]/90 border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_24px_rgba(37,99,235,0.45)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <Send className="w-4 h-4 rtl:-scale-x-100" />
                    <span>{t.contact.sendBtn}</span>
                  </button>

                  {submitted && (
                    <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.contact.sentSuccess}</span>
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
