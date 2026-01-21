import React, { useState, useEffect } from 'react';
import { fetchNews } from './services/api';
import Pagination from './components/Pagination';
import { Link } from 'react-router-dom';

export default function NewsPage({ content, lang }) {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const isRTL = lang === 'ar';
  const t = content; // content is passed as content.newsPage from App.jsx? Let's check App.jsx. 
  // In App.jsx: <NewsPage content={content.newsPage} ... /> so 'content' prop IS the newsPage object.

  // Fallback data
  const fallbackItems = [
    {
      id: 1,
      title_en: "Tanorin at Gulfood 2024: Showcasing Innovation",
      title_ar: "تانورين في جلفود ٢٠٢٤: عرض الابتكار",
      date_published: "2024-02-14",
      category: "Exhibitions",
      slug: "tanorin-at-gulfood-2024-showcasing-innovation", // Added slugs to fallback
      excerpt_en: "Our team successfully participated in the world's largest food exhibition, introducing our new organic product line to global partners.",
      excerpt_ar: "نجح فريقنا في المشاركة في أكبر معرض للأغذية في العالم، حيث قدمنا خط منتجاتنا العضوية الجديد للشركاء العالميين.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRi8eDbW2l1WWEA7yd8eubVi0H1m_98sQqTOSG1sjCMl7iJlVFkiV1IY1mmiGdHmR6AMPli7b5i356RN_chMtw9_PyYEj7-c2jivmttGQlQYLAuEerZfHT26hUanT9CKSfhactQ9KYbMs5rSXj3p3c8vYaDRNZJGEM3SUhgi-vQYJdn3463p53OBd0GSXc4Ty2co_-tWU0n2eUvXJjm-sCvzQt8eX3B2gqfjlnGjrnMohBoEAsqwiSaUHrPNI6dHIoUHU5_wSn_rU"
    },
    {
        id: 2,
        title_en: "New Sustainable Sourcing Initiative Launched",
        title_ar: "إطلاق مبادرة التوريد المستدام الجديدة",
        date_published: "2024-01-22",
        category: "CSR",
        slug: "new-sustainable-sourcing-initiative-launched",
        excerpt_en: "A commitment to partner with 500+ local small-scale farms to ensure ecological balance and premium crop quality.",
        excerpt_ar: "التزام بالشراكة مع أكثر من 500 مزرعة محلية صغيرة لضمان التوازن البيئي وجودة المحاصيل المتميزة.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSOSyE1dPvbGtYZKFlNlpP9iGoIzzHY5l4EATO3CmaYyuQU8WcHBiekVW_ihx9_m-cbOKiilXL_RKrYoC9euMxUD8eRHPVXGzvPdiz62zYrCP4pDLvjyH-6dGCFzpwllfyRwHz1rv6fVwrkIfUV_YDfTjQl3vwn1gah4dKrPS2MSmV-U4Ii2Wbmx4U4hc4z-i_2NllstNKySou0ngepQArhHjMfNUeupKJJ5N0_Y9nE2DZDkknLHq2lbZM8zCaNFSLVsDn4hccy88"
      },
      {
        id: 3,
        title_en: "Digital Transformation in Logistics & Warehousing",
        title_ar: "التحول الرقمي في الخدمات اللوجستية والتخزين",
        date_published: "2023-12-10",
        category: "Announcements",
        slug: "digital-transformation-in-logistics-warehousing",
        excerpt_en: "Implementation of AI-driven sorting and packaging systems at our main Cairo hub to enhance speed and precision.",
        excerpt_ar: "تطبيق أنظمة الفرز والتعبئة المدعومة بالذكاء الاصطناعي في مركزنا الرئيسي بالقاهرة لتعزيز السرعة والدقة.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUy6pgwcj8P9paW0ZsdHVsO8XSvPLIjH00G2YXf0y9xsoNU18rXz-Tsn9kWjlDVR8n7a1fCXcQZgz8XqFR0gpcPk9B0NX7jppWjSY1vL09GNmv710gV3sFsNdK3V519q2dhKxGEiE_jrfMhRgIK49e-sWyyoJObTULk4sllUAjQr4A3bsiZuvgoQpsrGVxBGKxUIsoZmoyh-HupwWXZB5-gPY6k2KfCFE2Ow51FnYsGg-Jw4B-ScOsuiMp41ltBWtPAyiQThxjT88"
      },
      {
          id: 4,
          title_en: "Supporting Local Communities Through Education",
          title_ar: "دعم المجتمعات المحلية من خلال التعليم",
          date_published: "2023-11-05",
          category: "CSR",
          slug: "supporting-local-communities-education",
          excerpt_en: "Launching a scholarship program for the children of our farming partners to ensure bright futures.",
          excerpt_ar: "إطلاق برنامج منح دراسية لأبناء شركائنا المزارعين لضمان مستقبل مشرق.",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJYnhZhPADD_SBvNt1O5CO5wwYtc-W3hni3CmsLTIHOK6H_PmfsT05Ipy9M68Dgjbu9wk_YnyHSVoSmINUgGhNh7aC2Bv6RU3ZqaayH-Gubw1MV0v-A0YV7P67ubeNJEacV1hZ7lnnN8u6zFoH19RKLGiGSFMgP3BczOH7zS3hZucbnZDJE-yFg5fFazMULJ6lfDcaX4s8OM6gjmJV6H58W3UmrrQdgKMjU06-09Myd32-xn32v_jSA37yBRXH804wkVzy0NRdfg8"
      },
      {
          id: 5,
          title_en: "Awarded 'Exporter of the Year' 2023",
          title_ar: "جائزة 'المصدر اعام' لعام ٢٠٢٣",
          date_published: "2023-10-12",
          category: "Announcements",
          slug: "awarded-exporter-of-the-year-2023",
          excerpt_en: "Tanorin recognized for excellence in international trade and quality assurance protocols.",
          excerpt_ar: "تم تكريم تانورين لتميزها في التجارة الدولية وبروتوكولات ضمان الجودة.",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8t5CLHh7S79nXSCmO_-o3xG3hPk7WKPJH5OFbI_PPfA1uxDPbKzF0Meh4clD-eBQ5Zi0O9RO0uKPKcrzQ6DtPCfLH4BJAmp2KlReYQ8lZ17HEh33KP6C4174IUa2heYn68L2b2aXbG4y1ZHo9HyPQnxEgG_oDy_0NOp6TaWESlx1_fSB-aBR8JHb6ETyBRAtR53XAp8PW_g9VYJNFhwMJlC-MrADAZpR4nd5weTzy9HzQ2ioQAiiZsQQflZZh1MBE2O-GbJ1gsXQ"
      },
      {
          id: 6,
          title_en: "Upcoming: Anuga 2024 Participation",
          title_ar: "القادم: مشاركة في أنوجا ٢٠٢٤",
          date_published: "2023-09-28",
          category: "Exhibitions",
          slug: "upcoming-anuga-2024-participation",
          excerpt_en: "Prepare to meet us in Cologne! We'll be bringing our finest organic grains and spices to the European stage.",
          excerpt_ar: "استعدوا للقائنا في كولونيا! سنحضر أرقى حبوبنا وبهاراتنا العضوية إلى الساحة الأوروبية.",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5xxoFEn7yR7ynystAvh93UYkZQe1m6do7orLVKF28W56nBQyYuGc8tRLKQ3UzwmyjKv9sGbBDY5EFznGUNtgkiY0TziqlFkXG_3MVxPSm4J9IQdLlyiUl5vuoMxlX1Y8qj2A42clmfojN9v_zCD2HSsdxSGL6uy8VHYzocrRTcXijJuomXsgEwlPo9Hh3rnO5dWAxKyFYE69oC8dqRXlyJKDgvbpnZEp-lMQXrz6lgV9efmpdT-8u1e4gRzser6OOigQopEjaqfY"
      }
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchNews();
      if (data && data.length > 0) {
        setNewsItems(data);
      } else {
        setNewsItems(fallbackItems);
      }
      setLoading(false);
    }
    load();
  }, []);

  // Filter Items
  const filteredItems = newsItems.filter(item => {
    // Check Category
    if (activeFilter !== 'All' && item.category !== activeFilter) return false;
    
    // Check Search
    const searchLower = searchQuery.toLowerCase();
    const title = lang === 'en' ? item.title_en : item.title_ar;
    const desc = lang === 'en' ? item.excerpt_en : item.excerpt_ar;
    
    if (searchQuery && !title.toLowerCase().includes(searchLower) && !desc.toLowerCase().includes(searchLower)) {
        return false;
    }

    return true;
  });

  // Featured Item (First item of all items, or first of filtered? Let's say newest overall is featured.)
  const featuredItem = newsItems[0] || fallbackItems[0];

  // Pagination Logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentNews = filteredItems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  return (
    <>
      <style>{`
        /* Add some specific styles for news page if needed */
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Journalistic food background" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAoc9Nriw3AG2rCxtnw6zHa6m4At4bn8s6qOwqMrGteC-ATC8yPaWeMtiL0VErKWKcu2faKhPfa4Hjzw3nuJum_9W_KqxT4LX0EPcfP9Dz_njuJYN4gUN5MwEfzXSsCVMx3OF7etCGTr3gyppSaJ1PLZMZBwwvEcHIn-n7snaQsK-mj1E17rWioR6__txWBV71HkVHOGKX8i72cVzSfl2gYto8TnGw08rTQF2Or2ETDUTCTjrFq-YqOJIr5QcL7VpNK4i9IyU-Bqc" 
          />
          <div className="absolute inset-0 bg-secondary-green/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6 mt-10">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm font-semibold tracking-wider mb-4 backdrop-blur-sm shadow-sm">{t.heroSubtitle}</span>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight drop-shadow-sm">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl font-normal opacity-90 max-w-2xl mx-auto drop-shadow-sm leading-relaxed">{t.heroDesc}</p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="mt-12 mb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full lg:w-auto">
              {[
                  { key: 'All', label: t.filterAll },
                  { key: 'Exhibitions', label: t.filterExhibitions },
                  { key: 'Announcements', label: t.filterAnnouncements },
                  { key: 'CSR', label: t.filterCSR }
              ].map(filter => (
                  <button 
                    key={filter.key}
                    onClick={() => { setActiveFilter(filter.key); setCurrentPage(1); }}
                    className={`px-6 py-2.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm md:text-base
                        ${activeFilter === filter.key 
                            ? 'bg-secondary-green text-white shadow-secondary-green/20' 
                            : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-secondary-green hover:text-secondary-green'
                        }`}
                  >
                      {filter.label}
                  </button>
              ))}
            </div>
            <div className="relative w-full lg:w-auto">
              <input 
                className="w-full lg:w-64 pl-10 pr-4 py-3 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:ring-2 focus:ring-secondary-green focus:border-transparent shadow-sm outline-none" 
                placeholder={t.searchPlaceholder}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className={`material-symbols-outlined absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-3 text-gray-400 select-none`}>search</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article & Grid */}
      <section className="mb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Featured Article (Only show on 'All' filter and no search, for best UX) */}
          {activeFilter === 'All' && !searchQuery && featuredItem && (
            <div className="relative bg-white dark:bg-[#251516] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-none grid grid-cols-1 lg:grid-cols-2 group border border-gray-100 dark:border-white/5 mb-20">
                <div className="relative h-[300px] lg:h-auto overflow-hidden">
                <img 
                    alt={lang === 'en' ? featuredItem.title_en : featuredItem.title_ar} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={featuredItem.image} 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:hidden"></div>
                </div>
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg uppercase tracking-wider">{t.majorNews}</span>
                    <span className="text-gray-400 text-sm font-medium">{featuredItem.date_published}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {lang === 'en' ? featuredItem.title_en : featuredItem.title_ar}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed line-clamp-3">
                    {lang === 'en' ? featuredItem.excerpt_en : featuredItem.excerpt_ar}
                </p>
                <Link to={`/news/${featuredItem.slug}`} className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-lg group/btn">
                    {t.readFullStory}
                    <span className={`material-symbols-outlined transition-transform group-hover/btn:${isRTL ? '-translate-x-1' : 'translate-x-1'} ${isRTL ? 'rtl-flip' : ''}`}>arrow_forward</span>
                </Link>
                </div>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNews.map(item => (
                  <article key={item.id} className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden shadow-lg shadow-gray-100 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-white/5 group h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                      <img 
                          alt={lang === 'en' ? item.title_en : item.title_ar} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          src={item.image} 
                      />
                      <div className="absolute top-4 left-4 right-auto bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider text-secondary-green shadow-sm">
                          {item.category}
                      </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                      <span className="text-gray-400 text-sm font-medium mb-3 block">{item.date_published}</span>
                      <h3 className="text-xl font-bold mb-4 leading-snug group-hover:text-primary transition-colors">
                          {lang === 'en' ? item.title_en : item.title_ar}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                          {lang === 'en' ? item.excerpt_en : item.excerpt_ar}
                      </p>
                      <Link to={`/news/${item.slug || '#'}`} className="inline-flex items-center gap-1 text-primary text-sm font-bold uppercase tracking-wider mt-auto group/link">
                          {t.readMore} <span className={`material-symbols-outlined text-base transition-transform group-hover/link:${isRTL ? '-translate-x-1' : 'translate-x-1'} ${isRTL ? 'rtl-flip' : ''}`}>chevron_right</span>
                      </Link>
                      </div>
                  </article>
              ))}
          </div>
          
          {filteredItems.length === 0 && (
              <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No news found matching your criteria.</p>
              </div>
          )}
        </div>
      </section>
      
      {/* Media Highlights Section */}
      <section className="mb-20 px-6">
        <div className="max-w-7xl mx-auto bg-gray-100 dark:bg-white/5 rounded-[3rem] p-8 md:p-16">
            <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black">{t.mediaHighlights}</h2>
            <a className="text-sm font-bold text-gray-500 hover:text-primary flex items-center gap-1 transition-colors" href="#">
                {t.viewArchive} <span className={`material-symbols-outlined text-base ${isRTL ? 'rtl-flip' : ''}`}>arrow_forward</span>
            </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
                <div className="relative rounded-[2rem] overflow-hidden mb-5 shadow-lg">
                <img alt="Video Thumbnail" className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjzXXFFFR4CA66RwH4pzKKfI_rO9pw0p_DeFkqCe-qNLaSJaiJwlWIKRHi2qG84jAd7LwNmndfL-iz7JYcDoOBYc3uLXn-zaV4EZYgxiPd3f-4QZ7oohXWh-hVjM1Sf5grI3M3mFnOsENxRnNHGDxAVlzTiXw-kx3XuAXgLTTRqv73i8fuJeTXiB6iLtzjqMHEwqPlqXGqHTjik2vg0DIqcxSmiG-e4qJm-3XgJmMObrY2WwThcBpl8Io8Bjq-2GV6FAN_IaZVEkU"/>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform shadow-xl">
                    <span className="material-symbols-outlined text-white text-5xl fill-1 ml-1">play_arrow</span>
                    </div>
                </div>
                </div>
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors mb-1">CEO Interview: The Future of Organic Trading</h4>
                <span className="text-gray-500 text-sm font-medium">Bloomberg TV • 12:45 min</span>
            </div>
            <div className="group cursor-pointer">
                <div className="relative rounded-[2rem] overflow-hidden mb-5 shadow-lg">
                <img alt="Video Thumbnail" className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAvSyQQX5x4-J06RAf4IdLO0qd2MghOQPnC-xOv0lsEGyqaOFwTibG_qrPIGlnGsPK6hSWAPi9a98C-Bb8LPvo2B276ahNxAl2imJu3OIWSipmSZelSmv1FsndWvzHVxjgm4A7qI3lVdTCvWDmvL0X52dplbR3Rzo_clTaGV8d6fJaf7hTVcikson_wbIewIY84e20ojkP-qJ_BMKoHMosaa7MQGqxl2EifETaejMraaN4hejan6QHpCzyeVd4nabOIO3RBtBkMlI"/>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform shadow-xl">
                    <span className="material-symbols-outlined text-white text-5xl fill-1 ml-1">play_arrow</span>
                    </div>
                </div>
                </div>
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors mb-1">Documentary: From Farm to Table Journey</h4>
                <span className="text-gray-500 text-sm font-medium">Tanorin Originals • 08:30 min</span>
            </div>
            </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="mb-24 px-6">
        <div className="max-w-7xl mx-auto">
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
