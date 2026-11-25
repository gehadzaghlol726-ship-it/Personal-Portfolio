import { useEffect, useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar, NavSectionId } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { CvModal } from './components/CvModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';

const ADMIN_AUTH_KEY = 'gehad_admin_auth';
const ADMIN_PASSCODE = 'gehad2026';

const checkIsAdminPath = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    window.location.pathname === '/admin' ||
    window.location.pathname.startsWith('/admin/') ||
    window.location.hash === '#admin'
  );
};

function PortfolioShell() {
  const {
    portfolio,
    isDark,
    toggleTheme,
    lang,
    toggleLanguage,
    unreadMessages,
    submitMessage,
  } = usePortfolio();

  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminPath);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Sync browser back/forward navigation with /admin route
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminRoute(checkIsAdminPath());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Track active scroll section on portfolio view
  useEffect(() => {
    if (isAdminRoute) return;

    const sectionIds: NavSectionId[] = [
      'home',
      'about',
      'projects',
      'skills',
      'blog',
      'contact',
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminRoute]);

  const scrollToSection = (section: NavSectionId) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigateToAdmin = () => {
    try {
      window.history.pushState({}, '', '/admin');
    } catch {
      window.location.hash = '#admin';
    }
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPortfolio = (section?: NavSectionId) => {
    try {
      window.history.pushState({}, '', '/');
    } catch {
      window.location.hash = '';
    }
    setIsAdminRoute(false);
    if (section) {
      setTimeout(() => scrollToSection(section), 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = () => {
    try {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } catch {
      // ignore storage errors
    }
    setIsAdminAuthenticated(true);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // ignore storage errors
    }
    setIsAdminAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <ScrollProgressBar />
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLanguage={toggleLanguage}
        onOpenCv={() => setIsCvOpen(true)}
        firstName={portfolio.profile.firstName}
        isAdminView={isAdminRoute}
        onExitAdmin={() => navigateToPortfolio()}
      />

      {isAdminRoute ? (
        isAdminAuthenticated ? (
          <AdminDashboard
            onLogout={handleLogout}
            onExitAdmin={() => navigateToPortfolio()}
          />
        ) : (
          <AdminLogin
            lang={lang}
            expectedPassword={ADMIN_PASSCODE}
            onSuccess={handleLoginSuccess}
            onBackToPortfolio={() => navigateToPortfolio()}
          />
        )
      ) : (
        <>
          <main>
            <HeroSection
              profile={portfolio.profile}
              lang={lang}
              onExploreWork={() => scrollToSection('projects')}
              onGetInTouch={() => scrollToSection('contact')}
            />

            <AboutSection
              profile={portfolio.profile}
              lang={lang}
              projectCount={portfolio.projects.length}
              skillCount={portfolio.skills.length}
            />

            <EducationSection profile={portfolio.profile} lang={lang} />

            <CertificationsSection
              certifications={portfolio.certifications}
              lang={lang}
            />

            <ProjectsSection projects={portfolio.projects} lang={lang} />

            <SkillsSection skills={portfolio.skills} lang={lang} />

            <BlogSection posts={portfolio.posts} lang={lang} />

            <ContactSection
              profile={portfolio.profile}
              lang={lang}
              onSubmitMessage={submitMessage}
            />
          </main>

          <Footer
            profile={portfolio.profile}
            lang={lang}
            unreadMessages={unreadMessages}
            onNavigate={scrollToSection}
            onOpenAdmin={navigateToAdmin}
          />
        </>
      )}

      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        portfolio={portfolio}
        lang={lang}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioShell />
    </PortfolioProvider>
  );
}
