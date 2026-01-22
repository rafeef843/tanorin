import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProduct, fetchProducts } from './services/api';

export default function ProductDetailsPage({ content, lang }) {
  const isRTL = lang === 'ar';
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const loadProductAndRelated = async () => {
      const data = await fetchProduct(productSlug);
      setProduct(data);
      if (data && data.category) {
          const allCatProducts = await fetchProducts(data.category.slug);
          // Filter out current product and take 3
          const others = allCatProducts.filter(p => p.slug !== data.slug).slice(0, 3);
          setRelatedProducts(others);
      }
    };
    if (productSlug) {
        loadProductAndRelated();
        // Reset active image
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveImage(0);
    }
  }, [productSlug]);

  if (!product) {
      return (
        <div className="min-h-screen flex justify-center items-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
  }

  // Helper to get localized field
  const getLoc = (enField, arField) => isRTL ? (product[arField] || product[enField]) : product[enField];

  const title = getLoc('name_en', 'name_ar');
  const descriptionLong = getLoc('description_long_en', 'description_long_ar'); 
  const descriptions = descriptionLong ? descriptionLong.split('\n\n') : [];
  
  const tag = getLoc('tag_en', 'tag_ar');
  const highlights = getLoc('highlights_en', 'highlights_ar') || [];
  const specs = getLoc('specs_en', 'specs_ar') || {};
  
  // Category Name
  const categoryName = isRTL ? (product.category?.name_ar || product.category?.name_en) : product.category?.name_en;
  
  // Images
  const allImages = [product.main_image];
  if (product.gallery_images && product.gallery_images.length > 0) {
      product.gallery_images.forEach(img => allImages.push(img.image));
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
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
                <Link to={`/categories/${product.category?.slug}`} className="ml-1 text-gray-500 hover:text-primary font-medium md:ml-2">
                   {categoryName}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className={`material-symbols-outlined text-gray-400 text-lg ${isRTL ? 'rtl-flip' : ''}`}>{isRTL ? 'chevron_left' : 'chevron_right'}</span>
                <span className="ml-1 text-primary font-bold md:ml-2">{title}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <section className="py-8 px-6 pb-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square w-full bg-white dark:bg-white/5 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/5 overflow-hidden group">
              <img 
                alt={title} 
                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal p-8 group-hover:scale-105 transition-transform duration-700" 
                src={allImages[activeImage]} 
              />
              {tag && (
                  <div className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'}`}>
                    <span className={`bg-${product.tag_color || 'primary'}/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg shadow-primary/20`}>{tag}</span>
                  </div>
              )}
            </div>
            {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                    <button 
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-24 h-24 flex-shrink-0 bg-white dark:bg-white/5 rounded-2xl border-2 ${activeImage === index ? 'border-primary' : 'border-transparent hover:border-gray-200 dark:hover:border-white/20'} overflow-hidden p-2 transition-all`}
                    >
                    <img alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" src={img} />
                    </button>
                ))}
                </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              {title}
            </h1>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8">
              {descriptions.map((desc, i) => <p key={i}>{desc}</p>)}
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-4">{content.product.highlights.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary-green fill-1">check_circle</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden mb-8 shadow-sm">
              <table className={`w-full text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {Object.entries(specs).map(([key, value], index) => (
                    <tr key={index} className="flex flex-col sm:table-row">
                      <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 sm:w-1/3">{key}</th>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-auto">
              <button className="group w-full py-4 bg-primary hover:bg-[#c0181f] text-white rounded-xl font-bold text-lg tracking-wide shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3">
                <span>{content.product.cta.button}</span>
                <span className={`material-symbols-outlined transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} ${isRTL ? 'rtl-flip' : ''}`}>send</span>
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">{content.product.cta.subtext}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full overflow-hidden leading-[0] transform rotate-180 bg-gray-50 dark:bg-white/5">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-background-light dark:fill-[#1b0e0f]" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <section className="bg-gray-50 dark:bg-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{content.related.title}</h2>
            <Link to={`/categories/${product.category?.slug}`} className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              {content.related.viewAll} <span className={`material-symbols-outlined text-base ${isRTL ? 'rtl-flip' : ''}`}>arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.length > 0 ? relatedProducts.map((item) => {
               const itemTag = isRTL ? item.tag_ar : item.tag_en;
               const itemName = isRTL ? item.name_ar : item.name_en;
               
               return (
              <Link key={item.id} to={`/categories/${item.category?.slug}/${item.slug}`} className="bg-white dark:bg-[#1b0e0f] rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 dark:border-white/5 block">
                <div className="relative aspect-[4/3] bg-background-light dark:bg-white/5 rounded-xl overflow-hidden mb-4">
                  <img alt={itemName} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500" src={item.main_image} />
                  {itemTag && (
                    <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
                      <span className={`bg-${item.tag_color || 'primary'}/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase`}>{itemTag}</span>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{itemName}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-1">{isRTL ? item.description_short_ar : item.description_short_en}</p>
                <button className="w-full py-2.5 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-bold text-sm transition-all">
                  {content.related.cta}
                </button>
              </Link>
             )}) : (
               <div className="col-span-full text-center text-gray-400 py-10">
                   {isRTL ? "لا توجد منتجات ذات صلة حالياً." : "No related products found."}
               </div>
             )}
          </div>
        </div>
      </section>
    </>
  );
}

