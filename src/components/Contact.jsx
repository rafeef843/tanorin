import React from 'react';

export default function Contact({ content, lang }) {
  const isRTL = lang === 'ar';

  return (
    <section className="py-24 bg-background-light dark:bg-[#1a0d0e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-5/12">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">{content.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-6">{content.title}</h2>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed">
              {content.description}
            </p>
            <div className="space-y-8">
              {content.cards.map((card, index) => (
                <div key={index} className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{card.title}</h4>
                    <p className="text-gray-500 leading-relaxed">{card.text}<br/>{card.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-7/12">
            <div className="bg-white dark:bg-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-white/10">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className={`text-sm font-bold ${isRTL ? 'ms-1' : 'ml-1'}`} htmlFor="fullname">{content.form.name}</label>
                    <input className="w-full bg-background-light dark:bg-black/20 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400" id="fullname" placeholder={content.form.namePH} type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-bold ${isRTL ? 'ms-1' : 'ml-1'}`} htmlFor="email">{content.form.email}</label>
                    <input className="w-full bg-background-light dark:bg-black/20 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400" id="email" placeholder={content.form.emailPH} type="email" />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <label className={`text-sm font-bold ${isRTL ? 'ms-1' : 'ml-1'}`} htmlFor="subject">{content.form.subject}</label>
                  <input className="w-full bg-background-light dark:bg-black/20 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400" id="subject" placeholder={content.form.subjectPH} type="text" />
                </div>
                <div className="space-y-2 mb-8">
                  <label className={`text-sm font-bold ${isRTL ? 'ms-1' : 'ml-1'}`} htmlFor="message">{content.form.message}</label>
                  <textarea className="w-full bg-background-light dark:bg-black/20 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400 resize-none" id="message" placeholder={content.form.messagePH} rows="4"></textarea>
                </div>
                <button className="w-full bg-primary hover:bg-[#c0181f] text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all transform active:scale-[0.98]" type="submit">
                  {content.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
