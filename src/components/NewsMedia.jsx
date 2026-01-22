import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchNews } from '../services/api';

export default function NewsMedia({ content, lang }) {
  const isRTL = lang === 'ar';
  const [dynamicNews, setDynamicNews] = useState([]);
  
  useEffect(() => {
    const loadNews = async () => {
      const news = await fetchNews();
      if (news && news.length > 0) {
        // Take latest 3 items
        setDynamicNews(news.slice(0, 3));
      }
    };
    loadNews();
  }, []);

  // Use dynamic news if available, otherwise fallback to static content items
  const displayItems = dynamicNews.length > 0 
    ? dynamicNews.map(item => ({
        // Map API fields to UI fields
        title: lang === 'en' ? item.title_en : item.title_ar,
        date: item.date_published,
        desc: lang === 'en' ? item.excerpt_en : item.excerpt_ar,
        image: item.image,
        slug: item.slug
      }))
    : content.items;

  return (
    <section className="py-24 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-secondary-green font-bold text-sm tracking-widest uppercase">{content.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3">{content.title}</h2>
          </div>
          <Link className="inline-flex items-center gap-2 text-primary font-bold hover:underline" to="/news">
            {content.viewAll}
            <span className={`material-symbols-outlined text-sm ${isRTL ? 'rtl-flip' : ''}`}>arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayItems.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-lg shadow-gray-200 dark:shadow-none transition-transform duration-500 group-hover:scale-[1.02]">
                <img alt={item.title} className="w-full h-full object-cover" src={item.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="px-2">
                <span className="text-sm font-bold text-secondary-green mb-2 block">{item.date}</span>
                <h3 className="text-2xl font-extrabold mb-4 leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-500 mb-6 line-clamp-2">{item.desc}</p>
                <Link className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group/link" to={`/news/${item.slug || 'static'}`}>
                  {content.readMore}
                  <span className={`material-symbols-outlined text-base group-hover/link:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform ${isRTL ? 'rtl-flip' : ''}`}>chevron_right</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
