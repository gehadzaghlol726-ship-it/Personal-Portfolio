import React, { createContext, useContext, useEffect, useState } from 'react';
import { initialPortfolioState } from '../data/initialPortfolio';
import {
  BlogPost,
  CertificationItem,
  ContactMessage,
  PortfolioState,
  ProfileData,
  ProjectItem,
  SkillItem,
} from '../types/portfolio';
import { Language } from '../i18n/translations';

const STORAGE_KEY = 'gehad_portfolio_state_v7';
const THEME_KEY = 'gehad_portfolio_theme';
const LANG_KEY = 'gehad_portfolio_lang';

interface PortfolioContextValue {
  portfolio: PortfolioState;
  isDark: boolean;
  toggleTheme: () => void;
  lang: Language;
  toggleLanguage: () => void;
  unreadMessages: number;
  updateProfile: (profile: ProfileData) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  deleteSkill: (id: string) => void;
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  deleteCertification: (id: string) => void;
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  submitMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
  toggleMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  resetDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [portfolio, setPortfolio] = useState<PortfolioState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<PortfolioState>;
        return {
          ...initialPortfolioState,
          ...parsed,
          profile: {
            ...initialPortfolioState.profile,
            ...(parsed.profile || {}),
            portraitUrl:
              parsed.profile?.portraitUrl || initialPortfolioState.profile.portraitUrl,
            cvUrl: parsed.profile?.cvUrl ?? initialPortfolioState.profile.cvUrl,
          },
          certifications: parsed.certifications ?? initialPortfolioState.certifications,
          projects: (parsed.projects ?? initialPortfolioState.projects).map((p) => {
            const def = initialPortfolioState.projects.find((d) => d.id === p.id);
            if (!def) return p;
            return {
              ...p,
              imageUrl: p.imageUrl || def.imageUrl,
              gallery: p.gallery && p.gallery.length > 0 ? p.gallery : def.gallery,
            };
          }),
          skills: parsed.skills ?? initialPortfolioState.skills,
          posts: parsed.posts ?? initialPortfolioState.posts,
          messages: parsed.messages ?? initialPortfolioState.messages,
        };
      }
    } catch {
      // ignore storage errors
    }
    return initialPortfolioState;
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'light') return false;
    } catch {
      // ignore storage errors
    }
    return true;
  });

  const [lang, setLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(LANG_KEY);
      if (savedLang === 'ar' || savedLang === 'en') return savedLang;
    } catch {
      // ignore storage errors
    }
    return 'en';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    } catch {
      // ignore storage errors
    }
  }, [portfolio]);

  const updateProfile = (profile: ProfileData) => {
    setPortfolio((prev) => ({ ...prev, profile }));
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: [{ ...project, id: `proj-${Date.now()}` }, ...prev.projects],
    }));
  };

  const updateProject = (updated: ProjectItem) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === updated.id ? updated : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    setPortfolio((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: `sk-${Date.now()}` }],
    }));
  };

  const deleteSkill = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addCertification = (cert: Omit<CertificationItem, 'id'>) => {
    setPortfolio((prev) => ({
      ...prev,
      certifications: [{ ...cert, id: `cert-${Date.now()}` }, ...prev.certifications],
    }));
  };

  const deleteCertification = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    setPortfolio((prev) => ({
      ...prev,
      posts: [{ ...post, id: `post-${Date.now()}` }, ...prev.posts],
    }));
  };

  const updatePost = (updated: BlogPost) => {
    setPortfolio((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => (p.id === updated.id ? updated : p)),
    }));
  };

  const deletePost = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      posts: prev.posts.filter((p) => p.id !== id),
    }));
  };

  const submitMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
      read: false,
    };
    setPortfolio((prev) => ({
      ...prev,
      messages: [newMsg, ...prev.messages],
    }));
  };

  const toggleMessageRead = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      messages: prev.messages.map((m) =>
        m.id === id ? { ...m, read: !m.read } : m
      ),
    }));
  };

  const deleteMessage = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
  };

  const resetDefaults = () => {
    setPortfolio(initialPortfolioState);
  };

  const unreadMessages = portfolio.messages.filter((m) => !m.read).length;

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        isDark,
        toggleTheme: () => setIsDark((prev) => !prev),
        lang,
        toggleLanguage: () => setLang((prev) => (prev === 'en' ? 'ar' : 'en')),
        unreadMessages,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        deleteSkill,
        addCertification,
        deleteCertification,
        addPost,
        updatePost,
        deletePost,
        submitMessage,
        toggleMessageRead,
        deleteMessage,
        resetDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextValue => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
};
