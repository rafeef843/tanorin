import React from 'react';

export default function About({ content }) {
  return (
    <section className="relative overflow-hidden bg-primary text-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        <div className="order-2 lg:order-1">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
             {/* Handling line breaks if they exist in content string or just rendering text */}
             {content.title}
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-xl">
            {content.description}
          </p>
          <div className="flex items-center gap-8">
            <div>
              <div className="text-4xl font-black mb-1">{content.stat1.check}</div>
              <div className="text-sm uppercase tracking-widest opacity-60">{content.stat1.label}</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div>
              <div className="text-4xl font-black mb-1">{content.stat2.check}</div>
              <div className="text-sm uppercase tracking-widest opacity-60">{content.stat2.label}</div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative group">
            <div className="absolute -inset-4 bg-white/10 rounded-3xl organic-shape group-hover:scale-105 transition-transform"></div>
            <img 
              className="relative rounded-[3rem] w-full h-[500px] object-cover shadow-2xl" 
              src={content.image} 
              alt="Chef" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
