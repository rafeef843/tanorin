import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts } from './services/api';
import Pagination from './components/Pagination';

export default function ProductListPage({ content, lang }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9; // Increase page size for products
  const { categorySlug } = useParams();
  const isRTL = lang === 'ar';

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      // Fetch products for this category
      const data = await fetchProducts(categorySlug);
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, [categorySlug]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );


  return (
    <>
      <section className="relative w-full h-[360px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" data-alt="Texture background" src={content.hero.image} />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-primary/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center text-white mt-8">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-4 border border-white/30">{content.hero.tag}</span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 drop-shadow-xl">
            {content.hero.title}
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-95 max-w-2xl mx-auto leading-relaxed text-white/90">
            {content.hero.description}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-[calc(130%+1.3px)] h-[60px] -left-[15%]" data-name="Layer 1" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-background-light dark:fill-background-dark" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path className="fill-background-light dark:fill-background-dark" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path className="fill-background-light dark:fill-background-dark" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pt-4 pb-2">
        <nav aria-label="Breadcrumb" className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm">
            <li className="inline-flex items-center">
              <Link to="/categories" className="text-gray-500 hover:text-primary transition-colors font-medium">
                {content.breadcrumb.parent}
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className={`material-symbols-outlined text-gray-400 text-lg ${isRTL ? 'rtl-flip' : ''}`}>{isRTL ? 'chevron_left' : 'chevron_right'}</span>
                <span className={`${isRTL ? 'mr-1 md:mr-2' : 'ml-1 md:ml-2'} text-primary font-bold`}>{content.breadcrumb.current}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {loading ? (
             <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             </div>
          ) : products.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-10">
               <div className="bg-white dark:bg-white/5 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-100 dark:border-white/10 animate-fade-in-up">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                     <span className="material-symbols-outlined text-4xl text-gray-400">inventory_2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                     {content.emptyState?.title || "No Products Found"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                     {content.emptyState?.message || "There are no products in this category yet."}
                  </p>
                  <Link to="/categories">
                    <button className="px-8 py-3 bg-primary hover:bg-[#c0181f] text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
                       {content.emptyState?.action || "Return to Categories"}
                    </button>
                  </Link>
               </div>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product, index) => (
              <div key={index} className="bg-white dark:bg-white/5 rounded-[2rem] overflow-hidden shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/5 group hover:-translate-y-2 transition-transform duration-300">
                <div className="relative aspect-[4/3] bg-gray-50 dark:bg-white/5 overflow-hidden">
                  <img alt={isRTL ? product.name_ar : product.name_en} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700" src={product.main_image} />
                  {(isRTL ? product.tag_ar : product.tag_en) && (
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                      <span className={`bg-${product.tag_color || 'primary'}/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide`}>{isRTL ? product.tag_ar : product.tag_en}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{isRTL ? product.name_ar : product.name_en}</h3>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-gray-400 text-sm">scale</span>
                    <span className="text-sm text-gray-500 font-medium">{isRTL ? product.size_ar : product.size_en}</span>
                  </div>
                  <Link to={`/categories/${categorySlug}/${product.slug}`} className="w-full">
                    <button className="w-full py-3.5 bg-primary hover:bg-[#c0181f] text-white rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2">
                       {content.cta}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          )}
          
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
