import React from 'react';

export default function Mission({ content }) {
  return (
    <section className="relative bg-white dark:bg-background-dark py-20 px-6 -mt-10 rounded-t-[3rem] z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <span className="text-primary font-bold tracking-widest text-sm uppercase">{content.subtitle}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-2">{content.title}</h2>
          </div>
          <p className="text-gray-500 max-w-md text-lg leading-relaxed">
            {content.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.cards.map((card, index) => (
            <div key={index} className={`p-8 bg-background-light dark:bg-white/5 rounded-3xl border border-transparent hover:border-${card.color}/20 transition-all group`}>
              <div className={`w-16 h-16 bg-${card.color}/10 rounded-2xl flex items-center justify-center text-${card.color} mb-6 group-hover:bg-${card.color} group-hover:text-white transition-colors`}>
                <span className="material-symbols-outlined text-3xl">{card.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
