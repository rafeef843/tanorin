import React, { useEffect, useState } from 'react';
import { fetchExhibitions } from './services/api';
import Pagination from './components/Pagination';

export default function ExhibitionsPage({ lang }) {
  const [exhibitions, setExhibitions] = useState([]);
  useEffect(() => {
    const loadExhibitions = async () => {
      const data = await fetchExhibitions();
      setExhibitions(data);
      // loading state removed as it was unused in render
    };
    loadExhibitions();
  }, []);

  // Helper to parse date and separate upcoming (future) from past
  const now = new Date();
  
  // Sort by date ascending for upcoming checks, descending for past
  const sortedExhibitions = [...exhibitions].sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
  
  const upcomingEvents = sortedExhibitions.filter(e => new Date(e.start_date) >= now);
  const pastEvents = sortedExhibitions.filter(e => new Date(e.start_date) < now).reverse(); // Most recent past first

  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  // Countdown logic for next event
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    if (!nextEvent) return;
    
    const interval = setInterval(() => {
      const eventDate = new Date(nextEvent.start_date);
      const difference = eventDate - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  // Format date helper
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (lang === 'ar') {
        // Simple Arabic formatting override needed? using locale for now
        return date.toLocaleDateString('ar-EG', { month: 'short', year: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  const getDay = (dateStr) => new Date(dateStr).getDate();
  const getMonthAbbr = (dateStr) => new Date(dateStr).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short' });

  // Pagination for Past Events
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil(pastEvents.length / itemsPerPage);
  const currentPastEvents = pastEvents.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  return (
    <>
      <style>{`
        .curved-divider { clip-path: ellipse(150% 100% at 50% 100%); }
        .map-dot {
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: #d71c24;
            border-radius: 50%;
            box-shadow: 0 0 0 4px rgba(215, 28, 36, 0.2);
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(215, 28, 36, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(215, 28, 36, 0); }
            100% { box-shadow: 0 0 0 0 rgba(215, 28, 36, 0); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden curved-divider">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" data-alt="Trade show floor background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ_RiPVStfLgog2qok8sb0D1eV5XggmoY5r88VS3TBuZIuKtlZwpf2Y39JOWWoUr9a7u579JWhUN7EFry-1lWLmyQgezB_bisuTx-TqoDAAWJDWsUOu_AORa_sMsnwnmrPEeDUrytYymxJGC1huKK_jxCr36RfFEkcwvtQmzIJCOgWUsbyuYlt7Xjlr3pDRZBV7w14_oQ_1dWTzN-6FU1gbyKMssivzslFzyVxCqGF6BNRzwRhutNnn5FEfpXqc_p0n2TfqwAyMY8"/>
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 via-background-dark/70 to-primary/20"></div>
        </div>
        <div className={`relative z-10 max-w-7xl mx-auto px-6 w-full text-white text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold tracking-widest uppercase mb-4 text-secondary-green">
                {isRTL ? "التجارة والتواصل" : "Trade & Connect"}
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                 {isRTL ? "التواجد العالمي:" : "Global Presence:"} <br/>
                 <span className="text-primary italic">{isRTL ? "المعارض" : "Exhibitions"}</span>
            </h1>
            <p className="text-lg md:text-xl font-normal opacity-90 mb-10 leading-relaxed max-w-lg">
                {isRTL 
                    ? "التق بفريق تانورين في المعارض التجارية الرائدة عالمياً للأغذية والمشروبات. اكتشف أحدث منتجاتنا وابتكاراتنا بشكل مباشر."
                    : "Meet the Tanorin team at the world's leading food and beverage trade shows. Discover our latest products and innovations firsthand."
                }
            </p>
          </div>
        </div>
      </section>

      {/* Next Upcoming Event */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-secondary-green rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-extrabold">{isRTL ? "الحدث القادم" : "Next Upcoming Event"}</h2>
          </div>
          
          {nextEvent ? (
          <div className="relative overflow-hidden rounded-[2.5rem] bg-background-dark text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/10 rounded-l-full transform translate-x-1/3 skew-x-12"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 h-64 lg:h-auto relative">
                <img alt={isRTL ? nextEvent.title_ar : nextEvent.title_en} className="absolute inset-0 w-full h-full object-cover" src={nextEvent.image} />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background-dark via-transparent to-transparent opacity-80 lg:opacity-100"></div>
                <div className="absolute top-6 left-6 bg-white text-primary font-black px-4 py-2 rounded-lg shadow-lg flex flex-col items-center leading-tight">
                  <span className="text-xs uppercase tracking-wide text-gray-500">{getMonthAbbr(nextEvent.start_date)}</span>
                  <span className="text-2xl">{getDay(nextEvent.start_date)}</span>
                </div>
              </div>
              <div className="lg:col-span-7 p-8 md:p-12 relative z-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{isRTL ? "مؤكد" : "Confirmed"}</span>
                  <span className="flex items-center gap-1 text-gray-300 text-sm font-semibold">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    {isRTL ? nextEvent.location_ar : nextEvent.location_en}
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-4">{isRTL ? nextEvent.title_ar : nextEvent.title_en}</h3>
                <p className="text-gray-400 text-lg mb-8 max-w-xl leading-relaxed">
                   {isRTL ? nextEvent.description_ar : nextEvent.description_en}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
                    <span className="block text-2xl font-bold text-primary">{timeLeft.days}</span>
                    <span className="text-xs text-gray-500 uppercase font-bold">{isRTL ? "أيام" : "Days"}</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
                    <span className="block text-2xl font-bold text-white">{timeLeft.hours}</span>
                    <span className="text-xs text-gray-500 uppercase font-bold">{isRTL ? "ساعات" : "Hours"}</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
                    <span className="block text-2xl font-bold text-white">{timeLeft.mins}</span>
                    <span className="text-xs text-gray-500 uppercase font-bold">{isRTL ? "دقائق" : "Mins"}</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
                    <span className="block text-2xl font-bold text-white">{timeLeft.secs}</span>
                    <span className="text-xs text-gray-500 uppercase font-bold">{isRTL ? "ثواني" : "Secs"}</span>
                  </div>
                </div>
                {nextEvent.booth_number && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-green/20 flex items-center justify-center text-secondary-green">
                      <span className="material-symbols-outlined">storefront</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 uppercase font-bold">{isRTL ? "زورونا في" : "Visit Us At"}</span>
                      <span className="font-bold text-lg">{nextEvent.booth_number}</span>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
          ) : (
            <div className="text-center py-10 bg-gray-100 dark:bg-white/5 rounded-3xl">
                <p className="text-gray-500">{isRTL ? "لا توجد أحداث قادمة حالياً" : "No upcoming events scheduled at the moment."}</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Exhibitions */}
      <section className="py-12 px-6 bg-background-light dark:bg-[#1a0d0e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-primary font-bold text-sm tracking-widest uppercase">{isRTL ? "تاريخنا" : "Our History"}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2">{isRTL ? "المعارض السابقة" : "Past Exhibitions"}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPastEvents.map((event, index) => (
            <div key={index} className="group bg-white dark:bg-white/5 rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-white/10 hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-60 overflow-hidden">
                <img alt={isRTL ? event.title_ar : event.title_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={event.image} />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                   {isRTL ? event.city_ar : event.city_en}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-secondary-green font-bold text-xs uppercase tracking-widest">{formatDate(event.start_date)}</span>
                  {event.booth_number && <span className="text-gray-400 text-xs font-bold">{event.booth_number}</span>}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{isRTL ? event.title_ar : event.title_en}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                   {isRTL ? event.description_ar : event.description_en}
                </p>
              </div>
            </div>
            ))}
          </div>
          {pastEvents.length === 0 && (
             <div className="text-center py-10">
                <p className="text-gray-500">{isRTL ? "لا توجد معارض سابقة للعرض" : "No past exhibitions to show."}</p>
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

      {/* Map Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] bg-[#1a2332] overflow-hidden min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="relative z-10 w-full max-w-4xl h-[300px]">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="material-symbols-outlined text-[300px] text-white select-none">public</span>
              </div>
              
              {/* Static Map Dots - In real app these could be dynamic based on event locations */}
              <div className="absolute top-[30%] left-[20%]" title="New York">
                <div className="map-dot"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">New York</div>
              </div>
              <div className="absolute top-[40%] right-[45%]" title="Paris">
                <div className="map-dot"></div>
              </div>
              <div className="absolute top-[38%] right-[42%]" title="Cologne">
                <div className="map-dot"></div>
              </div>
              <div className="absolute top-[50%] right-[38%]" title="Dubai">
                <div className="map-dot w-4 h-4 bg-secondary-green shadow-[0_0_0_4px_rgba(3,143,73,0.2)]"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">Upcoming: Dubai</div>
              </div>
              <div className="absolute top-[55%] right-[20%]" title="Bangkok">
                <div className="map-dot"></div>
              </div>
              <div className="absolute top-[52%] right-[43%]" title="Cairo">
                <div className="map-dot"></div>
              </div>

              <div className="absolute bottom-4 left-6 bg-white/10 backdrop-blur-md p-4 rounded-xl text-white max-w-xs border border-white/10">
                <h4 className="font-bold text-lg mb-1">{isRTL ? "تواجدنا العالمي" : "Our Global Footprint"}</h4>
                <p className="text-sm opacity-80">{isRTL ? "لقد عرضنا في أكثر من 15 دولة عبر 4 قارات." : "We have exhibited in over 15 countries across 4 continents."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
