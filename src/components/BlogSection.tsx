import React, { useState } from 'react';
import { ArrowRight, BookOpen, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BlogPost } from '../types/portfolio';
import { initialPortfolioState } from '../data/initialPortfolio';
import { Language, translations } from '../i18n/translations';

interface BlogSectionProps {
  posts: BlogPost[];
  lang: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, lang }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const t = translations[lang];
  const shouldReduceMotion = useReducedMotion();

  const getLocalizedPost = (post: BlogPost) => {
    const def = initialPortfolioState.posts.find((d) => d.id === post.id);
    if (
      lang === 'ar' &&
      def &&
      post.title === def.title &&
      post.excerpt === def.excerpt &&
      post.content === def.content &&
      t.blog.posts[post.id]
    ) {
      return {
        ...post,
        ...t.blog.posts[post.id],
      };
    }
    return post;
  };

  const localizedPosts = posts.map(getLocalizedPost);
  const activeLocalized = selectedPost ? getLocalizedPost(selectedPost) : null;

  return (
    <section
      id="blog"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#030712] border-t border-slate-200/80 dark:border-blue-500/15 overflow-hidden transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 start-1/3 w-[440px] h-[340px] rounded-full bg-cyan-500/10 dark:bg-blue-600/15 blur-[135px]" />
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
              {t.blog.kicker}
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.blog.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localizedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-[#071124]/85 backdrop-blur-xl border border-slate-200 dark:border-blue-500/25 hover:border-blue-500/65 dark:hover:border-cyan-400/60 shadow-sm dark:shadow-[0_0_24px_rgba(37,99,235,0.08)] hover:shadow-[0_0_32px_rgba(37,99,235,0.2)] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-[var(--font-mono)] text-slate-500 dark:text-slate-400">
                      {post.date} · {post.readTime}
                    </p>
                  </div>

                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {post.category}
                  </p>

                  <h3 className="mt-2 font-[var(--font-display)] text-lg sm:text-xl font-bold text-slate-950 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {post.excerpt}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="mt-6 pt-4 border-t border-slate-200/80 dark:border-blue-500/15 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors w-full justify-between cursor-pointer"
                >
                  <span>{t.blog.readArticle}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </button>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      {activeLocalized && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#071124] border border-slate-200 dark:border-blue-500/40 p-6 sm:p-8 shadow-[0_0_48px_rgba(37,99,235,0.28)] max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              aria-label={t.blog.closeArticle}
              className="absolute top-5 end-5 p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-blue-500/15 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-xs font-[var(--font-mono)] text-blue-600 dark:text-blue-400">
              {activeLocalized.category} · {activeLocalized.date} · {activeLocalized.readTime}
            </p>
            <h3
              id="blog-modal-title"
              className="mt-2 font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white pe-8"
            >
              {activeLocalized.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {activeLocalized.content}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
