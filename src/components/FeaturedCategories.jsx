

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/api';

export default function FeaturedCategories({ content, lang }) {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const isRTL = lang === 'ar';

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-background-light dark:bg-[#1a0d0e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-extrabold italic">{content.title}</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll(isRTL ? 'right' : 'left')}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
            >
              <span className={`material-symbols-outlined ${isRTL ? 'rtl-flip' : ''}`}>{isRTL ? 'chevron_right' : 'chevron_left'}</span>
            </button>
            <button 
              onClick={() => scroll(isRTL ? 'left' : 'right')}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
            >
              <span className={`material-symbols-outlined ${isRTL ? 'rtl-flip' : ''}`}>{isRTL ? 'chevron_left' : 'chevron_right'}</span>
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar">
          {categories.map((category, index) => (
            <Link key={index} to={`/categories/${category.slug}`} className="min-w-[280px] snap-start group cursor-pointer block">
              <div className="relative h-80 rounded-3xl overflow-hidden mb-4">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src={category.image} 
                  alt={isRTL ? category.name_ar : category.name_en} 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <h4 className="text-xl font-bold">{isRTL ? category.name_ar : category.name_en}</h4>
              <p className="text-gray-500 text-sm">{/* Count not available yet */}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
