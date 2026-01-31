import React from 'react';

export default function Hero({ content, lang }) {
  const isRTL = lang === 'ar';
  
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          className={`w-full h-full object-cover ${isRTL ? 'rtl-flip' : ''}`} 
          data-alt={content.imageAlt}
          src={content.image} 
        />
        <div className={`absolute inset-0 bg-gradient-to-${isRTL ? 'l' : 'r'} from-black/70 via-black/40 to-transparent`}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            {content.title} <br/><span className="text-primary italic">{content.titleHighlight}</span>
          </h1>
          <p className={`text-lg md:text-xl font-normal opacity-90 mb-10 leading-relaxed max-w-lg ${isRTL ? 'font-medium' : ''}`}>
            {content.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <button disabled className="bg-gray-400 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 cursor-not-allowed opacity-70">
              <span className={`material-symbols-outlined fill-1 ${isRTL ? 'rtl-flip' : ''}`}>play_circle</span>
              {content.videoButton}
            </button>
            <Link to="/categories" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all inline-block">
              {content.exploreButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
