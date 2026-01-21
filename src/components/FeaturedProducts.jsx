
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';

export default function FeaturedProducts({ content, lang }) {
  const [products, setProducts] = useState([]);
  const isRTL = lang === 'ar';

  useEffect(() => {
    const loadProducts = async () => {
      // Fetch featured products
      const data = await fetchProducts(null, true);
      setProducts(data);
    };
    loadProducts();
  }, []);

  if (products.length === 0) return null; // Don't show section if no products or loading

  return (
    <section className="py-24 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-secondary-green font-bold text-sm tracking-widest uppercase">{content.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3">{content.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div key={index} className="bg-white dark:bg-white/5 p-4 rounded-[2rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/10 group">
              <div className="aspect-square bg-gray-50 dark:bg-white/5 rounded-[1.5rem] overflow-hidden mb-6 relative">
                 {/* Check if main_image is absolute or relative */}
                <img 
                    className="w-full h-full object-cover mix-blend-multiply transition-transform group-hover:scale-105" 
                    src={product.main_image} 
                    alt={isRTL ? product.name_ar : product.name_en} 
                />
                {(isRTL ? product.tag_ar : product.tag_en) && (
                   <span className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-${product.tag_color || 'primary'} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest`}>
                    {isRTL ? product.tag_ar : product.tag_en}
                   </span>
                )}
              </div>
              <div className="px-2 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold">{isRTL ? product.name_ar : product.name_en}</h4>
                  <span className="text-primary font-black text-xl">{/* Price not in model yet, hidden or static */}</span>
                </div>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {isRTL ? product.description_short_ar : product.description_short_en}
                </p>
                <Link to={`/categories/${product.category?.slug || 'general'}/${product.slug}`} className="w-full">
                    <button className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                    {content.cta}
                    <span className={`material-symbols-outlined text-sm ${isRTL ? 'rtl-flip' : ''}`}>arrow_forward</span>
                    </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
