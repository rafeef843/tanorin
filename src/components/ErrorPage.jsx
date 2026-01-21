import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage({ lang, type = '404' }) {
  const isRTL = lang === 'ar';
  


  
  const content = {
    en: {
      404: {
        code: "404",
        title: "Page Not Found",
        desc: "Oops! The page you are looking for might have been removed or temporarily unavailable.",
        cta: "Back to Homepage"
      },
      503: {
        code: "503",
        title: "Service Unavailable",
        desc: "We are currently experiencing technical difficulties. We cannot reach our servers right now. Please try again later.",
        cta: "Retry"
      }
    },
    ar: {
      404: {
        code: "٤٠٤",
        title: "الصفحة غير موجودة",
        desc: "عذراً! الصفحة التي تبحث عنها قد تكون حذفت أو غير متاحة مؤقتاً.",
        cta: "العودة للرئيسية"
      },
      503: {
        code: "٥٠٣",
        title: "الخدمة غير متاحة",
        desc: "نواجه حالياً صعوبات تقنية ولا يمكننا الوصول إلى الخوادم. يرجى المحاولة مرة أخرى لاحقاً.",
        cta: "إعادة المحاولة"
      }
    }
  };

  const t = (content[lang] || content.en)[type || '404'];

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-gray-50 dark:bg-background-dark relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
            <div className="absolute top-40 right-40 w-80 h-80 bg-secondary-green rounded-full blur-[100px]"></div>
        </div>

        <div className="text-center relative z-10 max-w-2xl mx-auto">
            <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 leading-none select-none animate-pulse">
                {t.code}
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-300 text-lg mb-10 leading-relaxed">
                {t.desc}
            </p>
            
            {type === '503' ? (
              <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-primary hover:bg-[#c0181f] text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto"
              >
                  {isRTL && <span className="material-symbols-outlined rtl-flip">refresh</span>}
                  <span>{t.cta}</span>
                  {!isRTL && <span className="material-symbols-outlined">refresh</span>}
              </button>
            ) : (
              <Link to="/">
                  <button className="px-8 py-4 bg-primary hover:bg-[#c0181f] text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                      {isRTL && <span className="material-symbols-outlined rtl-flip">arrow_forward</span>}
                      <span>{t.cta}</span>
                      {!isRTL && <span className="material-symbols-outlined">arrow_forward</span>}
                  </button>
              </Link>
            )}
        </div>
    </section>
  );
}
