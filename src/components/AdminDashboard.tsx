import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  User,
  Code2,
  Layers,
  FileText,
  Mail,
  Plus,
  Trash2,
  Pencil,
  Check,
  RotateCcw,
  Upload,
  LogOut,
  ArrowLeft,
  Award,
  Menu,
  X,
  FileUp,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { initialPortfolioState } from '../data/initialPortfolio';
import {
  BlogPost,
  CertificationItem,
  ProfileData,
  ProjectCategory,
  ProjectItem,
  SkillItem,
} from '../types/portfolio';
import { translations } from '../i18n/translations';

interface AdminDashboardProps {
  onLogout: () => void;
  onExitAdmin: () => void;
}

type AdminSection = 'overview' | 'profile' | 'projects' | 'skills' | 'blog' | 'inbox';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onExitAdmin,
}) => {
  const {
    portfolio,
    lang,
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
    toggleMessageRead,
    deleteMessage,
    resetDefaults,
  } = usePortfolio();

  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<AdminSection>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Profile & CV form state
  const [profileForm, setProfileForm] = useState<ProfileData>(portfolio.profile);
  const [profileSaved, setProfileSaved] = useState(false);
  const [cvError, setCvError] = useState('');

  useEffect(() => {
    setProfileForm(portfolio.profile);
  }, [portfolio.profile]);

  // Project create / edit state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<ProjectCategory>('Web');
  const [projYear, setProjYear] = useState('2026');
  const [projStack, setProjStack] = useState('Flutter, Dart, Firebase');
  const [projSummary, setProjSummary] = useState('');
  const [projDescription, setProjDescription] = useState('');
  const [projImageUrl, setProjImageUrl] = useState('');
  const [projRepoUrl, setProjRepoUrl] = useState(portfolio.profile.githubUrl);

  // Skill create state
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] =
    useState<SkillItem['category']>('Programming Languages');
  const [skillLevel, setSkillLevel] = useState(85);

  // Certification create state
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certPeriod, setCertPeriod] = useState('');
  const [certCategory, setCertCategory] =
    useState<CertificationItem['category']>('Mobile');
  const [certFocus, setCertFocus] = useState('');

  // Blog create / edit state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Mobile Development');
  const [postReadTime, setPostReadTime] = useState('4 min read');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePortraitFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const updated = { ...profileForm, portraitUrl: reader.result };
        setProfileForm(updated);
        updateProfile(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCvPdfFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      setCvError(t.admin.profile.cvTooLarge);
      return;
    }
    setCvError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const updated = { ...profileForm, cvUrl: reader.result };
        setProfileForm(updated);
        updateProfile(updated);
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProjectImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProjImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjTitle('');
    setProjCategory('Web');
    setProjYear('2026');
    setProjStack('Flutter, Dart, Firebase');
    setProjSummary('');
    setProjDescription('');
    setProjImageUrl('');
    setProjRepoUrl(portfolio.profile.githubUrl);
  };

  const handleStartEditProject = (project: ProjectItem) => {
    setEditingProjectId(project.id);
    setProjTitle(project.title);
    setProjCategory(project.category);
    setProjYear(project.year);
    setProjStack(project.stack.join(', '));
    setProjSummary(project.summary);
    setProjDescription(project.description);
    setProjImageUrl(project.imageUrl || '');
    setProjRepoUrl(project.repoUrl);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projSummary.trim()) return;
    const payload = {
      title: projTitle.trim(),
      category: projCategory,
      summary: projSummary.trim(),
      description: projDescription.trim() || projSummary.trim(),
      stack: projStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      year: projYear.trim() || '2026',
      repoUrl: projRepoUrl.trim() || portfolio.profile.githubUrl,
      liveUrl: projRepoUrl.trim() || portfolio.profile.githubUrl,
      featured: true,
      imageUrl: projImageUrl.trim() || undefined,
    };

    if (editingProjectId) {
      updateProject({ ...payload, id: editingProjectId });
    } else {
      addProject(payload);
    }
    resetProjectForm();
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;
    addSkill({
      name: skillName.trim(),
      category: skillCategory,
      level: Number(skillLevel),
    });
    setSkillName('');
  };

  const handleCreateCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim() || !certIssuer.trim()) return;
    addCertification({
      title: certTitle.trim(),
      issuer: certIssuer.trim(),
      period: certPeriod.trim() || 'Completed',
      category: certCategory,
      focus: certFocus.trim() || certIssuer.trim(),
    });
    setCertTitle('');
    setCertIssuer('');
    setCertPeriod('');
    setCertFocus('');
  };

  const resetPostForm = () => {
    setEditingPostId(null);
    setPostTitle('');
    setPostCategory('Mobile Development');
    setPostReadTime('4 min read');
    setPostExcerpt('');
    setPostContent('');
  };

  const handleStartEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setPostTitle(post.title);
    setPostCategory(post.category);
    setPostReadTime(post.readTime);
    setPostExcerpt(post.excerpt);
    setPostContent(post.content);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postExcerpt.trim()) return;
    const formattedDate = new Date().toLocaleDateString(
      lang === 'ar' ? 'ar-EG' : 'en-US',
      { month: 'long', year: 'numeric' }
    );

    if (editingPostId) {
      const existing = portfolio.posts.find((p) => p.id === editingPostId);
      updatePost({
        id: editingPostId,
        title: postTitle.trim(),
        category: postCategory.trim() || 'Engineering',
        date: existing?.date || formattedDate,
        readTime: postReadTime.trim() || '4 min read',
        excerpt: postExcerpt.trim(),
        content: postContent.trim() || postExcerpt.trim(),
      });
    } else {
      addPost({
        title: postTitle.trim(),
        category: postCategory.trim() || 'Engineering',
        date: formattedDate,
        readTime: postReadTime.trim() || '4 min read',
        excerpt: postExcerpt.trim(),
        content: postContent.trim() || postExcerpt.trim(),
      });
    }
    resetPostForm();
  };

  const navItems: {
    id: AdminSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { id: 'overview', label: t.admin.nav.overview, icon: LayoutDashboard },
    { id: 'profile', label: t.admin.nav.profile, icon: User },
    {
      id: 'projects',
      label: t.admin.nav.projects,
      icon: Code2,
      badge: portfolio.projects.length,
    },
    {
      id: 'skills',
      label: t.admin.nav.skills,
      icon: Layers,
      badge: portfolio.skills.length,
    },
    {
      id: 'blog',
      label: t.admin.nav.blog,
      icon: FileText,
      badge: portfolio.posts.length,
    },
    {
      id: 'inbox',
      label: t.admin.nav.inbox,
      icon: Mail,
      badge: unreadMessages,
    },
  ];

  const handleSelectNav = (id: AdminSection) => {
    setActiveTab(id);
    setMobileSidebarOpen(false);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-10 bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Mobile Sidebar Header Bar */}
        <div className="lg:hidden flex items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25">
          <div>
            <h1 className="font-[var(--font-display)] text-lg font-bold text-slate-950 dark:text-white">
              {t.admin.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {navItems.find((i) => i.id === activeTab)?.label}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen((prev) => !prev)}
            aria-label={t.admin.menuLabel}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#0B1B3B] border border-slate-200 dark:border-blue-500/30 text-slate-700 dark:text-white cursor-pointer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Left Sidebar Navigation */}
        <aside
          className={`${
            mobileSidebarOpen ? 'flex' : 'hidden'
          } lg:flex flex-col justify-between w-full lg:w-72 shrink-0 rounded-2xl bg-white/95 dark:bg-[#071124]/90 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25 p-5 shadow-sm dark:shadow-[0_0_32px_rgba(37,99,235,0.12)] lg:sticky lg:top-24 lg:max-h-[calc(100vh-7.5rem)]`}
        >
          <div>
            <div className="hidden lg:block pb-5 mb-5 border-b border-slate-200 dark:border-blue-500/20">
              <h1 className="font-[var(--font-display)] text-xl font-bold text-slate-950 dark:text-white">
                {t.admin.title}
              </h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {t.admin.subtitle}
              </p>
            </div>

            <nav aria-label={t.admin.title} className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectNav(item.id)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-blue-500/10 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </span>
                    {typeof item.badge === 'number' && (
                      <span
                        className={`font-[var(--font-mono)] text-xs tabular-nums px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.id === 'inbox' && item.badge > 0
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-[#0B1B3B] text-slate-600 dark:text-blue-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-blue-500/20 space-y-2">
            <button
              type="button"
              onClick={resetDefaults}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-blue-500/25 text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.admin.resetBtn}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onExitAdmin}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#0B1B3B] text-slate-800 dark:text-blue-200 hover:bg-slate-200 dark:hover:bg-blue-500/20 transition-colors cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{t.admin.backToPortfolio}</span>
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border border-rose-300 dark:border-rose-500/35 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer whitespace-nowrap"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.admin.logoutBtn}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Workspace Panel */}
        <section className="flex-1 min-w-0 space-y-6">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25">
                <h2 className="font-[var(--font-display)] text-2xl font-bold text-slate-950 dark:text-white">
                  {t.admin.overview.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {t.admin.overview.subtitle}
                </p>

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {t.admin.kpis.projects}
                    </p>
                    <p className="mt-1 font-[var(--font-mono)] text-3xl font-bold tabular-nums text-slate-950 dark:text-white">
                      {portfolio.projects.length}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {t.admin.kpis.skills}
                    </p>
                    <p className="mt-1 font-[var(--font-mono)] text-3xl font-bold tabular-nums text-slate-950 dark:text-white">
                      {portfolio.skills.length}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {t.admin.kpis.articles}
                    </p>
                    <p className="mt-1 font-[var(--font-mono)] text-3xl font-bold tabular-nums text-slate-950 dark:text-white">
                      {portfolio.posts.length}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {t.admin.kpis.unread}
                    </p>
                    <p className="mt-1 font-[var(--font-mono)] text-3xl font-bold tabular-nums text-blue-600 dark:text-cyan-400">
                      {unreadMessages}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="font-[var(--font-display)] text-lg font-bold text-slate-950 dark:text-white">
                      {t.admin.overview.recentMessages}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('inbox')}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {t.admin.overview.viewAllInbox}
                    </button>
                  </div>

                  {portfolio.messages.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
                      {t.admin.overview.noMessages}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {portfolio.messages.slice(0, 3).map((msg) => (
                        <div
                          key={msg.id}
                          className="p-4 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20"
                        >
                          <div className="flex items-center justify-between gap-2 text-xs font-[var(--font-mono)]">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {msg.name}
                            </span>
                            <span
                              className={
                                msg.read
                                  ? 'text-slate-500 dark:text-slate-400'
                                  : 'text-blue-600 dark:text-cyan-400 font-semibold'
                              }
                            >
                              {msg.read ? t.admin.inboxTab.read : t.admin.inboxTab.unread}
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                            {msg.subject}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="xl:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25 space-y-3">
                  <h3 className="font-[var(--font-display)] text-lg font-bold text-slate-950 dark:text-white mb-2">
                    {t.admin.overview.quickLinks}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20 hover:border-blue-500 text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    <span>{t.admin.nav.profile}</span>
                    <User className="w-4 h-4 text-blue-500" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20 hover:border-blue-500 text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    <span>{t.admin.projectsTab.addTitle}</span>
                    <Plus className="w-4 h-4 text-blue-500" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('skills')}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20 hover:border-blue-500 text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    <span>
                      {t.admin.overview.certCount} ({portfolio.certifications.length})
                    </span>
                    <Award className="w-4 h-4 text-blue-500" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE & CV */}
          {activeTab === 'profile' && (
            <form
              onSubmit={handleSaveProfile}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25 space-y-6"
            >
              <h2 className="font-[var(--font-display)] text-xl font-bold text-slate-950 dark:text-white">
                {t.admin.profile.heading}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.firstName}
                  </label>
                  <input
                    type="text"
                    value={profileForm.firstName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.lastName}
                  </label>
                  <input
                    type="text"
                    value={profileForm.lastName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.roleTitle}
                  </label>
                  <input
                    type="text"
                    value={profileForm.roleTitle}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, roleTitle: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.location}
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Portrait Manager */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20 space-y-3">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {t.admin.profile.portraitUpload}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500/35 text-xs font-semibold text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>{t.admin.profile.uploadBtn}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePortraitFile}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = {
                        ...profileForm,
                        portraitUrl: initialPortfolioState.profile.portraitUrl,
                      };
                      setProfileForm(updated);
                      updateProfile(updated);
                    }}
                    className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-500 cursor-pointer"
                  >
                    {t.admin.profile.removeBtn}
                  </button>
                </div>
                <input
                  type="text"
                  aria-label={t.admin.profile.portraitUrlLabel}
                  placeholder={t.admin.profile.portraitUrlLabel}
                  value={profileForm.portraitUrl}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, portraitUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-[#071124] border border-slate-300 dark:border-blue-500/25 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {/* CV PDF Link / Upload */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-blue-500/20 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {t.admin.profile.cvSectionTitle}
                  </label>
                  {profileForm.cvUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...profileForm, cvUrl: '' };
                        setProfileForm(updated);
                        updateProfile(updated);
                      }}
                      className="text-xs text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                    >
                      {t.admin.profile.cvClearBtn}
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    aria-label={t.admin.profile.cvUrlLabel}
                    placeholder={t.admin.profile.cvUrlPlaceholder}
                    value={
                      profileForm.cvUrl.startsWith('data:')
                        ? `[PDF Uploaded]`
                        : profileForm.cvUrl
                    }
                    onChange={(e) => {
                      setCvError('');
                      setProfileForm({ ...profileForm, cvUrl: e.target.value });
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-[#071124] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  />
                  <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-blue-500/35 text-xs font-semibold text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 cursor-pointer whitespace-nowrap">
                    <FileUp className="w-4 h-4" />
                    <span>{t.admin.profile.cvUploadBtn}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleCvPdfFile}
                      className="hidden"
                    />
                  </label>
                </div>

                {cvError && (
                  <p className="text-xs text-rose-600 dark:text-rose-400">{cvError}</p>
                )}
                {profileForm.cvUrl && !cvError && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.admin.profile.cvUploadedReady}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  {t.admin.profile.bio}
                </label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  {t.admin.profile.aboutSummary}
                </label>
                <textarea
                  rows={3}
                  value={profileForm.aboutSummary}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, aboutSummary: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.education}
                  </label>
                  <input
                    type="text"
                    value={profileForm.education}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, education: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.institution}
                  </label>
                  <input
                    type="text"
                    value={profileForm.institution}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, institution: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.educationDuration}
                  </label>
                  <input
                    type="text"
                    value={profileForm.educationDuration}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        educationDuration: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.email}
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.phone}
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.whatsapp}
                  </label>
                  <input
                    type="text"
                    value={profileForm.whatsapp}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, whatsapp: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.githubUrl}
                  </label>
                  <input
                    type="url"
                    value={profileForm.githubUrl}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, githubUrl: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    {t.admin.profile.linkedinUrl}
                  </label>
                  <input
                    type="url"
                    value={profileForm.linkedinUrl}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, linkedinUrl: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{t.admin.profile.saveBtn}</span>
                </button>
                {profileSaved && (
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {t.admin.profile.savedMsg}
                  </span>
                )}
              </div>
            </form>
          )}

          {/* PROJECTS (CREATE, EDIT, DELETE) */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <form
                onSubmit={handleProjectSubmit}
                className="xl:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25 space-y-3.5 self-start"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-[var(--font-display)] text-lg font-bold text-slate-950 dark:text-white">
                    {editingProjectId
                      ? t.admin.projectsTab.editTitle
                      : t.admin.projectsTab.addTitle}
                  </h2>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={resetProjectForm}
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                    >
                      {t.admin.projectsTab.cancelEditBtn}
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  required
                  placeholder={t.admin.projectsTab.titlePlaceholder}
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Web">{t.projects.categories.Web}</option>
                    <option value="Mobile">{t.projects.categories.Mobile}</option>
                    <option value="IoT & Hardware">
                      {t.projects.categories['IoT & Hardware']}
                    </option>
                    <option value="Networking">{t.projects.categories.Networking}</option>
                  </select>
                  <input
                    type="text"
                    placeholder={t.admin.projectsTab.yearPlaceholder}
                    value={projYear}
                    onChange={(e) => setProjYear(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <input
                  type="text"
                  placeholder={t.admin.projectsTab.stackPlaceholder}
                  value={projStack}
                  onChange={(e) => setProjStack(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t.admin.projectsTab.imageUrlPlaceholder}
                    value={projImageUrl}
                    onChange={(e) => setProjImageUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-blue-500/35 text-xs font-semibold text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{t.admin.projectsTab.uploadImageBtn}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProjectImageFile}
                      className="hidden"
                    />
                  </label>
                </div>

                <input
                  type="url"
                  placeholder={t.admin.projectsTab.repoUrlPlaceholder}
                  value={projRepoUrl}
                  onChange={(e) => setProjRepoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                />

                <textarea
                  rows={2}
                  required
                  placeholder={t.admin.projectsTab.summaryPlaceholder}
                  value={projSummary}
                  onChange={(e) => setProjSummary(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                />

                <textarea
                  rows={3}
                  placeholder={t.admin.projectsTab.descriptionPlaceholder}
                  value={projDescription}
                  onChange={(e) => setProjDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                />

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  {editingProjectId ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>
                    {editingProjectId
                      ? t.admin.projectsTab.updateBtn
                      : t.admin.projectsTab.addBtn}
                  </span>
                </button>
              </form>

              <div className="xl:col-span-7 space-y-4">
                {portfolio.projects.map((p) => (
                  <div
                    key={p.id}
                    className={`flex items-start justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#071124] border transition-colors ${
                      editingProjectId === p.id
                        ? 'border-blue-500 dark:border-cyan-400'
                        : 'border-slate-200 dark:border-blue-500/20'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-[var(--font-mono)] text-blue-600 dark:text-blue-400">
                        {t.projects.categories[p.category]} · {p.year}
                      </p>
                      <h3 className="mt-1 font-semibold text-slate-950 dark:text-white">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {p.summary}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {p.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-[#0B1B3B] text-slate-700 dark:text-blue-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEditProject(p)}
                        aria-label={`${t.admin.projectsTab.editAction}: ${p.title}`}
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-500/10 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingProjectId === p.id) resetProjectForm();
                          deleteProject(p.id);
                        }}
                        aria-label={`${t.admin.projectsTab.deleteAction}: ${p.title}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS & CERTIFICATIONS */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              {/* Skills Manager */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <form
                  onSubmit={handleCreateSkill}
                  className="xl:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25 space-y-4 self-start"
                >
                  <h2 className="font-[var(--font-display)] text-lg font-bold text-slate-950 dark:text-white">
                    {t.admin.skillsTab.addTitle}
                  </h2>
                  <input
                    type="text"
                    required
                    placeholder={t.admin.skillsTab.namePlaceholder}
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  />
                  <select
                    value={skillCategory}
                    onChange={(e) =>
                      setSkillCategory(e.target.value as SkillItem['category'])
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Programming Languages">
                      {t.skills.categories['Programming Languages']}
                    </option>
                    <option value="Mobile Development">
                      {t.skills.categories['Mobile Development']}
                    </option>
                    <option value="Web Development">
                      {t.skills.categories['Web Development']}
                    </option>
                    <option value="Databases">{t.skills.categories.Databases}</option>
                    <option value="Networking">{t.skills.categories.Networking}</option>
                    <option value="Tools & Hardware">
                      {t.skills.categories['Tools & Hardware']}
                    </option>
                  </select>
                  <div>
                    <div className="flex justify-between text-xs mb-1 text-slate-600 dark:text-slate-300">
                      <span>{t.admin.skillsTab.proficiency}</span>
                      <span className="font-[var(--font-mono)] tabular-nums">
                        {skillLevel}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.admin.skillsTab.addBtn}</span>
                  </button>
                </form>

                <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 self-start">
                  {portfolio.skills.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/20"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-950 dark:text-white truncate">
                          {s.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {t.skills.categories[s.category]} ·{' '}
                          <span className="font-[var(--font-mono)] tabular-nums">
                            {s.level}%
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteSkill(s.id)}
                        aria-label={s.name}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Manager */}
              <div className="pt-6 border-t border-slate-200 dark:border-blue-500/20 grid grid-cols-1 xl:grid-cols-12 gap-6">
                <form
                  onSubmit={handleCreateCert}
                  className="xl:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25 space-y-3.5 self-start"
                >
                  <h2 className="font-[var(--font-display)] text-lg font-bold text-slate-950 dark:text-white">
                    {t.admin.skillsTab.addCertTitle}
                  </h2>
                  <input
                    type="text"
                    required
                    placeholder={t.admin.skillsTab.certTitlePlaceholder}
                    value={certTitle}
                    onChange={(e) => setCertTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder={t.admin.skillsTab.certIssuerPlaceholder}
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={certCategory}
                      onChange={(e) =>
                        setCertCategory(
                          e.target.value as CertificationItem['category']
                        )
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                    >
                      <option value="Mobile">Mobile</option>
                      <option value="Web">Web</option>
                      <option value="Hardware & IoT">Hardware & IoT</option>
                      <option value="Systems & OS">Systems & OS</option>
                    </select>
                    <input
                      type="text"
                      placeholder={t.admin.skillsTab.certPeriodPlaceholder}
                      value={certPeriod}
                      onChange={(e) => setCertPeriod(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder={t.admin.skillsTab.certFocusPlaceholder}
                    value={certFocus}
                    onChange={(e) => setCertFocus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.admin.skillsTab.addCertBtn}</span>
                  </button>
                </form>

                <div className="xl:col-span-7 space-y-3.5">
                  <h3 className="font-[var(--font-display)] text-base font-bold text-slate-950 dark:text-white">
                    {t.admin.skillsTab.certsTitle} ({portfolio.certifications.length})
                  </h3>
                  {portfolio.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/20"
                    >
                      <div>
                        <p className="text-xs font-[var(--font-mono)] text-blue-600 dark:text-blue-400">
                          {cert.category} · {cert.period}
                        </p>
                        <p className="mt-1 font-semibold text-slate-950 dark:text-white">
                          {cert.title}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {cert.issuer}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteCertification(cert.id)}
                        aria-label={cert.title}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BLOG POSTS (CREATE, EDIT, DELETE) */}
          {activeTab === 'blog' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <form
                onSubmit={handlePostSubmit}
                className="xl:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/25 space-y-3.5 self-start"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-[var(--font-display)] text-lg font-bold text-slate-950 dark:text-white">
                    {editingPostId
                      ? t.admin.blogTab.editTitle
                      : t.admin.blogTab.addTitle}
                  </h2>
                  {editingPostId && (
                    <button
                      type="button"
                      onClick={resetPostForm}
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                    >
                      {t.admin.blogTab.cancelEditBtn}
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  required
                  placeholder={t.admin.blogTab.titlePlaceholder}
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={t.admin.blogTab.categoryPlaceholder}
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder={t.admin.blogTab.readTimePlaceholder}
                    value={postReadTime}
                    onChange={(e) => setPostReadTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <textarea
                  rows={2}
                  required
                  placeholder={t.admin.blogTab.excerptPlaceholder}
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                />
                <textarea
                  rows={5}
                  placeholder={t.admin.blogTab.contentPlaceholder}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-300 dark:border-blue-500/25 text-sm text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  {editingPostId ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>
                    {editingPostId
                      ? t.admin.blogTab.updateBtn
                      : t.admin.blogTab.addBtn}
                  </span>
                </button>
              </form>

              <div className="xl:col-span-7 space-y-4">
                {portfolio.posts.map((post) => (
                  <div
                    key={post.id}
                    className={`flex items-start justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#071124] border transition-colors ${
                      editingPostId === post.id
                        ? 'border-blue-500 dark:border-cyan-400'
                        : 'border-slate-200 dark:border-blue-500/20'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-[var(--font-mono)] text-blue-600 dark:text-blue-400">
                        {post.category} · {post.date} · {post.readTime}
                      </p>
                      <h3 className="mt-1 font-semibold text-slate-950 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEditPost(post)}
                        aria-label={`${t.admin.blogTab.editAction}: ${post.title}`}
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-500/10 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingPostId === post.id) resetPostForm();
                          deletePost(post.id);
                        }}
                        aria-label={`${t.admin.blogTab.deleteAction}: ${post.title}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-[var(--font-display)] text-xl font-bold text-slate-950 dark:text-white">
                  {t.admin.inboxTab.title}
                </h2>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onExitAdmin();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>{t.admin.backToPortfolio}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {portfolio.messages.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/20">
                  <p className="text-slate-600 dark:text-slate-400">
                    {t.admin.inboxTab.empty}
                  </p>
                </div>
              ) : (
                portfolio.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#071124] border ${
                      msg.read
                        ? 'border-slate-200 dark:border-blue-500/20'
                        : 'border-blue-500/60 dark:border-cyan-400/60 shadow-[0_0_24px_rgba(37,99,235,0.12)]'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-[var(--font-mono)] text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {msg.name}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{msg.email}</span>
                        <span aria-hidden="true">·</span>
                        <span>{msg.createdAt}</span>
                        {!msg.read && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                              {t.admin.inboxTab.unread}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="mt-2 font-semibold text-slate-950 dark:text-white">
                        {msg.subject}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleMessageRead(msg.id)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-slate-300 dark:border-blue-500/30 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-colors cursor-pointer"
                      >
                        {msg.read ? t.admin.inboxTab.markUnread : t.admin.inboxTab.markRead}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteMessage(msg.id)}
                        aria-label={msg.name}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
