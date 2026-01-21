import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from './services/api';
import Pagination from './components/Pagination';

export default function CategoriesPage({ content, lang }) {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const isRTL = lang === 'ar';

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" data-alt="Green leaves texture" src={content.hero.image} />
          <div className="absolute inset-0 bg-secondary-green/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-secondary-green/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-4">{content.hero.tag}</span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 drop-shadow-lg">
            {content.hero.title}
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto leading-relaxed">
            {content.hero.description}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-[calc(130%+1.3px)] h-[80px] -left-[15%]" data-name="Layer 1" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-background-light dark:fill-background-dark" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path className="fill-background-light dark:fill-background-dark" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path className="fill-background-light dark:fill-background-dark" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCategories.map((category, index) => (
              <div key={index} className="bg-white dark:bg-white/5 rounded-[2.5rem] p-4 shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-white/5 group hover:-translate-y-2 transition-transform duration-300">
                <Link to={`/categories/${category.slug}`} className="block h-full">
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                    {/* Placeholder image if none provided */}
                    <img alt={isRTL ? category.name_ar : category.name_en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={category.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  </div>
                  <div className="px-2 pb-4">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{isRTL ? category.name_ar : category.name_en}</h3>
                    <div className="w-full py-4 bg-primary hover:bg-[#c0181f] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                      {content.cta}
                      <span className={`material-symbols-outlined text-sm ${isRTL ? 'rtl-flip' : ''}`}>arrow_forward</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isRTL={isRTL}
          />
        </div>
      </section>
    </>
  );
}
