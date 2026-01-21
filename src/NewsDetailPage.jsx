import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsArticle, fetchNews } from './services/api';

export default function NewsDetailPage({ lang }) {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRTL = lang === 'ar';

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      const data = await fetchNewsArticle(slug);
      setArticle(data);
      
      // Load related news (fetch all and filter out current, take 3)
      // Ideally related news logic should be smarter or handled by backend, but purely frontend filtering for now is fine.
      const allNews = await fetchNews();
      const others = allNews.filter(n => n.slug !== slug).slice(0, 3);
      setRelatedNews(others);
      
      setLoading(false);
    };
    if (slug) {
        loadArticle();
    }
  }, [slug]);

  if (loading) {
     return (
        <div className="min-h-screen flex justify-center items-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
     );
  }

  if (!article) {
      return (
          <div className="min-h-screen flex flex-col justify-center items-center gap-4">
              <h1 className="text-3xl font-bold">{isRTL ? "المقال غير موجود" : "Article Not Found"}</h1>
              <Link to="/news" className="bg-primary text-white px-6 py-2 rounded-full">
                  {isRTL ? "العودة للأخبار" : "Back to News"}
              </Link>
          </div>
      );
  }

  // Helper to split content paragraphs if it's one big block
  // Assuming content is standard text.
  const contentText = isRTL ? article.content_ar : article.content_en;
  // If content has no newlines, maybe just one p. If strictly from seed it might be lorem ipsum.
  
  return (
    <>
      <style>{`
        .curved-bottom {
            clip-path: ellipse(120% 100% at 50% 0%);
        }
        .content-area p {
            margin-bottom: 1.5rem;
            line-height: 1.8;
            color: #4b5563;
        }
        .dark .content-area p {
             color: #d1d5db;
        }
        .content-area h2 {
            font-weight: 800;
            font-size: 1.5rem;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            color: #111827;
        }
        .dark .content-area h2 {
            color: #ffffff;
        }
      `}</style>
      
      <main>
        {/* Breadcrumb */}
        <nav className="max-w-3xl mx-auto px-6 pt-8 pb-4">
            <div className={`flex items-center gap-2 text-xs font-semibold text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link to="/news" className="hover:text-primary">{isRTL ? "أخبارنا" : "News & Media"}</Link>
                <span className={`material-symbols-outlined text-xs ${isRTL ? 'rotate-180' : ''}`}>chevron_right</span>
                <span className="text-gray-600 dark:text-gray-300 truncate">{isRTL ? article.title_ar : article.title_en}</span>
            </div>
        </nav>

        {/* Hero Image & Title */}
        <section className="relative w-full h-[450px] overflow-hidden mb-12">
            <div className="absolute inset-0 z-0 curved-bottom">
                <img alt={isRTL ? article.title_ar : article.title_en} className="w-full h-full object-cover" src={article.image} />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative z-10 h-full max-w-3xl mx-auto px-6 flex flex-col justify-end pb-20 text-white">
                <span className="inline-block py-1 px-3 bg-primary text-[10px] font-bold rounded-lg uppercase tracking-widest mb-4 w-fit">
                    {article.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                    {isRTL ? article.title_ar : article.title_en}
                </h1>
                <div className="flex items-center gap-2 text-sm font-medium opacity-80">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span>{article.date_published}</span>
                </div>
            </div>
        </section>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-6 mb-20">
            <div className="content-area dark:text-gray-300">
                <p className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white leading-relaxed mb-8">
                    {/* Use excerpt as intro/lead */}
                    {isRTL ? article.excerpt_ar : article.excerpt_en}
                </p>
                
                {/* Main Content */}
                <div className="whitespace-pre-line">
                    {contentText}
                </div>
            </div>

            {/* Share & Print */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{isRTL ? "شارك المقال" : "Share this article"}</span>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-secondary-green hover:text-white transition-all">
                                <span className="material-symbols-outlined text-xl">link</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => window.print()} className="px-6 py-2 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold hover:border-primary transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">print</span> {isRTL ? "تصدير" : "Print"}
                        </button>
                    </div>
                </div>
            </div>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
        <section className="bg-gray-50 dark:bg-white/5 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-black mb-10">{isRTL ? "أخبار ذات صلة" : "Related News"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedNews.map((item) => (
                    <article key={item.id} className="bg-white dark:bg-background-dark rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-white/5 group">
                        <div className="h-48 overflow-hidden">
                            <img alt={isRTL ? item.title_ar : item.title_en} className="w-full h-full object-cover transition-transform group-hover:scale-110" src={item.image} />
                        </div>
                        <div className="p-6">
                            <span className="text-[10px] font-bold text-secondary-green uppercase mb-2 block">{item.category}</span>
                            <h3 className="text-lg font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                {isRTL ? item.title_ar : item.title_en}
                            </h3>
                            <Link to={`/news/${item.slug}`} className="text-xs font-bold text-primary flex items-center gap-1 uppercase">
                                {isRTL ? "اقرأ المزيد" : "Read More"} 
                                <span className={`material-symbols-outlined text-sm ${isRTL ? 'rotate-180' : ''}`}>chevron_right</span>
                            </Link>
                        </div>
                    </article>
                    ))}
                </div>
            </div>
        </section>
        )}
      </main>
    </>
  );
}
