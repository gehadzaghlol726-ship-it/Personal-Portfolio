import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface AdminLoginProps {
  lang: Language;
  allowedEmails: string[];
  expectedPassword: string;
  onSuccess: (email: string) => void;
  onBackToPortfolio: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  lang,
  allowedEmails,
  expectedPassword,
  onSuccess,
  onBackToPortfolio,
}) => {
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const isEmailAllowed = allowedEmails.some(
      (allowed) => allowed.trim().toLowerCase() === normalizedEmail
    );

    if (isEmailAllowed && password.trim() === expectedPassword) {
      setError('');
      onSuccess(normalizedEmail);
    } else {
      setError(t.adminLogin.errorInvalid);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 bg-slate-50 dark:bg-[#030712] overflow-hidden transition-colors duration-300">
      {/* Futuristic Blue Ambient Backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 start-1/4 w-[440px] h-[440px] rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-[140px]" />
        <div className="absolute bottom-1/4 end-1/4 w-[380px] h-[380px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/90 dark:bg-[#071124]/90 backdrop-blur-xl border border-slate-200 dark:border-blue-500/35 p-7 sm:p-9 shadow-xl dark:shadow-[0_0_50px_rgba(37,99,235,0.22)]">
        <div className="flex items-center justify-between gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.adminLogin.badge}</span>
          </span>

          <button
            type="button"
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{t.adminLogin.backToPortfolio}</span>
          </button>
        </div>

        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_0_28px_rgba(37,99,235,0.45)] mb-5">
          <Lock className="w-6 h-6" />
        </div>

        <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
          {t.adminLogin.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {t.adminLogin.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              {t.adminLogin.emailLabel}
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="admin-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder={t.adminLogin.emailPlaceholder}
                className="w-full ps-10 pe-4 py-3 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/30 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              {t.adminLogin.passwordLabel}
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder={t.adminLogin.passwordPlaceholder}
                className="w-full pe-11 ps-4 py-3 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/30 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? t.adminLogin.hidePassword : t.adminLogin.showPassword
                }
                className="absolute inset-y-0 end-0 px-3.5 flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl px-3.5 py-2.5"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_24px_rgba(37,99,235,0.45)] transition-all cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>{t.adminLogin.submitBtn}</span>
          </button>
        </form>
      </div>
    </main>
  );
};
