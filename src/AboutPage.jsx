import React from 'react';

export default function AboutPage({ content, lang }) {
  const isRTL = lang === 'ar';

  return (
    <>
      <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden curved-divider pb-20">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" data-alt="Agricultural fields and fresh produce" src={content.hero.image} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        <div className={`relative z-10 max-w-7xl mx-auto px-6 w-full text-white text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest mb-4">{content.hero.tag}</span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              {content.hero.title} <span className="text-primary italic">{content.hero.titleHighlight}</span>
            </h1>
            <p className={`text-lg md:text-xl font-normal opacity-90 mb-10 leading-relaxed max-w-lg mx-auto ${isRTL ? 'md:mr-0' : 'md:ml-0'}`}>
              {content.hero.description}
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-background-light dark:bg-background-dark py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary-green/10 rounded-[3rem] -rotate-3 z-0"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl z-10 aspect-[4/3]">
                <img alt="Professional food trading logistics" className="w-full h-full object-cover" src={content.intro.image} />
              </div>
              <div className={`absolute bottom-8 ${isRTL ? '-left-4 md:-left-8' : '-right-4 md:-right-8'} bg-white dark:bg-background-dark p-6 rounded-3xl shadow-xl z-20 max-w-[200px] animate-bounce-slow`}>
                <div className="text-4xl font-black text-primary mb-1">{content.intro.stat}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">{content.intro.statLabel}</div>
              </div>
            </div>
            <div>
              <span className="text-primary font-bold tracking-widest text-sm uppercase">{content.intro.subtitle}</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-8 leading-tight">{content.intro.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {content.intro.description1}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {content.intro.description2}
              </p>
              <div className="flex flex-wrap gap-4">
                {content.intro.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white dark:bg-white/5 px-5 py-3 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
                    <span className={`material-symbols-outlined text-${badge.color}`}>{badge.icon}</span>
                    <span className="font-bold text-sm">{badge.text}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white dark:bg-white/5 rounded-[3rem] mx-4 md:mx-auto max-w-7xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`bg-background-light dark:bg-black/20 p-8 md:p-12 rounded-[2.5rem] ${isRTL ? 'border-r-8' : 'border-l-8'} border-primary relative overflow-hidden group hover:shadow-lg transition-all`}>
            <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-8 opacity-10 group-hover:opacity-20 transition-opacity`}>
              <span className="material-symbols-outlined text-9xl text-primary">{content.missionVision.mission.bgIcon}</span>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">{content.missionVision.mission.icon}</span>
            </div>
            <h3 className="text-2xl font-black mb-4">{content.missionVision.mission.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {content.missionVision.mission.description}
            </p>
          </div>
          <div className={`bg-background-light dark:bg-black/20 p-8 md:p-12 rounded-[2.5rem] ${isRTL ? 'border-r-8' : 'border-l-8'} border-secondary-green relative overflow-hidden group hover:shadow-lg transition-all`}>
            <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-8 opacity-10 group-hover:opacity-20 transition-opacity`}>
              <span className="material-symbols-outlined text-9xl text-secondary-green">{content.missionVision.vision.bgIcon}</span>
            </div>
            <div className="w-16 h-16 bg-secondary-green/10 rounded-2xl flex items-center justify-center text-secondary-green mb-6">
              <span className="material-symbols-outlined text-3xl">{content.missionVision.vision.icon}</span>
            </div>
            <h3 className="text-2xl font-black mb-4">{content.missionVision.vision.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {content.missionVision.vision.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-secondary-green font-bold text-sm tracking-widest uppercase">{content.values.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-6">{content.values.title}</h2>
            <p className="text-gray-500 text-lg">{content.values.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.items.map((item, index) => (
                <div key={index} className={`bg-white dark:bg-white/5 p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-${item.color}/30 group`}>
                    <div className={`w-14 h-14 bg-${item.color}/10 text-${item.color} rounded-full flex items-center justify-center mb-6 group-hover:bg-${item.color} group-hover:text-white transition-colors`}>
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-background-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-4">{content.timeline.title}</h2>
            <p className="text-gray-500">{content.timeline.subtitle}</p>
          </div>
          <div className="space-y-16">
            {content.timeline.items.map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 group`}>
                    <div className={`md:w-1/2 text-center ${index % 2 === 0 ? (isRTL ? 'md:text-left order-2 md:order-3' : 'md:text-right order-2 md:order-1') : (isRTL ? 'md:text-right order-2 md:order-1' : 'md:text-left order-2 md:order-3')}`}>
                        {index % 2 === 0 ? (
                             <div className={`bg-background-light dark:bg-white/5 p-6 rounded-2xl shadow-lg border border-transparent group-hover:border-${item.color}/20 transition-all`}>
                             <h3 className={`text-xl font-bold text-${item.color} mb-2`}>{item.year}</h3>
                             <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                             <p className="text-gray-500 text-sm">{item.desc}</p>
                             </div>
                        ) : null}
                    </div>
                    
                    <div className={`w-12 h-12 bg-white dark:bg-background-dark border-4 border-${item.color} rounded-full flex items-center justify-center relative z-10 shadow-lg order-1 md:order-2`}>
                        <div className={`w-3 h-3 bg-${item.color} rounded-full`}></div>
                    </div>

                    <div className={`md:w-1/2 text-center ${index % 2 !== 0 ? (isRTL ? 'md:text-left order-2 md:order-3' : 'md:text-right order-2 md:order-1') : (isRTL ? 'md:text-right order-2 md:order-1' : 'md:text-left order-2 md:order-3')}`}>
                         {index % 2 !== 0 ? (
                             <div className={`bg-background-light dark:bg-white/5 p-6 rounded-2xl shadow-lg border border-transparent group-hover:border-${item.color}/20 transition-all`}>
                             <h3 className={`text-xl font-bold text-${item.color} mb-2`}>{item.year}</h3>
                             <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                             <p className="text-gray-500 text-sm">{item.desc}</p>
                             </div>
                         ) : null}
                    </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background-light dark:bg-[#150a0b]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">{content.team.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3">{content.team.title}</h2>
          </div>
          <div className="mb-20">
            <div className="bg-white dark:bg-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto border border-gray-100 dark:border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0"></div>
              <div className="w-full md:w-1/3 relative z-10">
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg">
                  <img alt={content.team.leadership.name} className="w-full h-full object-cover" src={content.team.leadership.image} />
                </div>
              </div>
              <div className="w-full md:w-2/3 relative z-10">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase mb-4">{content.team.leadership.tag}</div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{content.team.leadership.name}</h3>
                <p className="text-gray-400 font-medium text-lg mb-6">{content.team.leadership.role}</p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 italic text-lg">
                  {content.team.leadership.quote}
                </p>
                <div className="flex gap-4">
                  <a className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all text-gray-500" href="#">
                    <span className="text-lg font-bold">in</span>
                  </a>
                  <a className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-black hover:text-white transition-all text-gray-500" href="#">
                    <span className="text-lg font-bold">X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.team.members.map((member, index) => (
                <div key={index} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-lg group-hover:border-primary transition-all duration-300">
                    <img alt={member.name} className="w-full h-full object-cover" src={member.image} />
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
