import React, { useEffect, useState } from 'react';
import { fetchExhibitions } from '../services/api';
import { Link } from 'react-router-dom';

export default function GlobalPresence({ content, lang }) {
  const isRTL = lang === 'ar';
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExhibitions = async () => {
      const data = await fetchExhibitions();
      // Sort: Upcoming/Recent first (descending by start_date?) 
      // Actually typically homepage shows recent highlights or upcoming.
      // Let's sort by date descending to show the latest (or future) ones first.
      const sorted = data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
      setExhibitions(sorted.slice(0, 3)); // Show top 3
      setLoading(false);
    };
    loadExhibitions();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { month: 'short', year: 'numeric' });
  };

  if (!loading && exhibitions.length === 0) return null;

  return (
    <section className="py-24 bg-background-light dark:bg-[#1a0d0e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-primary font-bold text-sm tracking-widest uppercase">{content.subtitle}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-2">{content.title}</h2>
          </div>
          <div className="hidden md:flex gap-2">
             <Link to="/exhibitions">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:bg-primary hover:border-primary hover:text-white transition-all group font-bold text-sm">
                   {isRTL ? "عرض الكل" : "View All"}
                   <span className={`material-symbols-outlined text-sm ${isRTL ? 'rtl-flip' : ''}`}>{isRTL ? 'arrow_back' : 'arrow_forward'}</span>
                </button>
             </Link>
          </div>
        </div>
        
        {loading ? (
             <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exhibitions.map((item, index) => (
            <div key={index} className="group bg-white dark:bg-white/5 p-4 rounded-[2rem] shadow-xl shadow-gray-200/40 dark:shadow-none transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-white/10">
              <div className="relative h-64 rounded-[1.5rem] overflow-hidden mb-6">
                <img alt={isRTL ? item.title_ar : item.title_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.image} />
                <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm`}>
                  <span className="text-primary font-bold text-xs uppercase tracking-wider">{formatDate(item.start_date)}</span>
                </div>
              </div>
              <div className="px-2 pb-4">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{isRTL ? item.title_ar : item.title_en}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{isRTL ? item.description_ar : item.description_en}</p>
                <Link to="/exhibitions">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider cursor-pointer">
                    <span>{content.cta}</span>
                    <span className={`material-symbols-outlined text-base transition-transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} ${isRTL ? 'rtl-flip' : ''}`}>arrow_forward</span>
                    </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
        
        <div className="md:hidden mt-8 flex justify-center">
             <Link to="/exhibitions">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:bg-primary hover:border-primary hover:text-white transition-all group font-bold text-sm">
                   {isRTL ? "عرض الكل" : "View All"}
                   <span className={`material-symbols-outlined text-sm ${isRTL ? 'rtl-flip' : ''}`}>{isRTL ? 'arrow_back' : 'arrow_forward'}</span>
                </button>
             </Link>
        </div>
      </div>
    </section>
  );
}
