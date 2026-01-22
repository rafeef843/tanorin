import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Mission from './components/Mission';
import FeaturedCategories from './components/FeaturedCategories';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import GlobalPresence from './components/GlobalPresence';
import NewsMedia from './components/NewsMedia';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutPage from './AboutPage';
import { content } from './data/content';
import { aboutPageContent } from './data/aboutContent';

import CategoriesPage from './CategoriesPage';
import { categoriesPageContent } from './data/categoriesPageContent';

import ProductListPage from './ProductListPage';
import { productListPageContent } from './data/productListPageContent';

import ProductDetailsPage from './ProductDetailsPage';
import { productDetailsContent } from './data/productDetailsContent';
import NewsPage from './NewsPage';
import NewsDetailPage from './NewsDetailPage';
import ErrorPage from './components/ErrorPage';
import ExhibitionsPage from './ExhibitionsPage';
import { fetchSiteContent } from './services/api';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout({ lang, toggleLanguage }) {
  // Get content for current language
  const [mergedContent, setMergedContent] = useState(content[lang]);
  
  useEffect(() => {
     setMergedContent(content[lang]);
  }, [lang]);

  // Fetch dynamic content
  useEffect(() => {
      const loadContent = async () => {
          const dbItems = await fetchSiteContent();
          if (dbItems && dbItems.length > 0) {
              setMergedContent(() => {
                  // Deep clone prev to avoid mutating original
                  const newContent = JSON.parse(JSON.stringify(content[lang])); // Reset to base then apply? Or apply to current?
                  // Better: Apply DB on top of base content[lang] always.
                  
                  dbItems.forEach(item => {
                      const keys = item.key.split('.');
                      let current = newContent;
                      
                      // Navigate to the parent object
                      for (let i = 0; i < keys.length - 1; i++) {
                          if (!current[keys[i]]) current[keys[i]] = {};
                          current = current[keys[i]];
                      }
                      
                      // Set the value
                      const val = lang === 'en' ? item.text_en : item.text_ar;
                      if (val) {
                          current[keys[keys.length - 1]] = val;
                      }
                      
                      // Handle image override if present
                      if (item.image) {
                          // item.image from Django is likely a relative URL or absolute. 
                          // If relative, we might need to prepend backend URL.
                          // Assuming item.image is the URL string we want.
                          
                          // If the key ITSELF represents the image (e.g. hero.image), we replace it.
                          // Or if the key is a container and we want to attach an image? 
                          // No, the key should point to the leaf node in the content object.
                          
                          // Issue: keys like 'hero.title' are text. 'hero.image' would be the image.
                          // So if key is 'hero.image', we use item.image.
                          // Check if val was empty? Or just prefer image if present?
                          // Usually a record is either text or image.
                          current[keys[keys.length - 1]] = item.image;
                      }
                  });
                  return newContent;
              });
          }
      };
      loadContent();
  }, [lang]); // Re-run when lang changes to pick correct text_en/text_ar

  const t = mergedContent; // Use the merged content
  const tAbout = aboutPageContent[lang];
  const tCategories = categoriesPageContent[lang];
  const tProductList = productListPageContent[lang];
  const tProductDetails = productDetailsContent[lang];

  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const handleBackendError = () => setServerError(true);
    window.addEventListener('backend-error', handleBackendError);
    return () => window.removeEventListener('backend-error', handleBackendError);
  }, []);

  if (serverError) {
    return (
      <>
        <Header content={t.header} lang={lang} toggleLanguage={toggleLanguage} />
         <main>
            <ErrorPage lang={lang} type="503" />
         </main>
        <Footer content={t.footer} lang={lang} />
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Header content={t.header} lang={lang} toggleLanguage={toggleLanguage} />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero content={t.hero} lang={lang} />
              <Mission content={t.mission} />
              <FeaturedCategories content={t.categories} lang={lang} />
              <FeaturedProducts content={t.products} lang={lang} />
              <About content={t.about} />
              <GlobalPresence content={t.exhibitions} lang={lang} />
              <NewsMedia content={t.news} lang={lang} />
              <Contact content={t.contact} lang={lang} />
            </>
          } />
          <Route path="/about" element={
            <AboutPage content={tAbout} lang={lang} />
          } />
          <Route path="/categories" element={
            <CategoriesPage content={tCategories} lang={lang} />
          } />
          <Route path="/categories/:categorySlug" element={
            <ProductListPage content={tProductList} lang={lang} />
          } />
          <Route path="/categories/:categorySlug/:productSlug" element={
            <ProductDetailsPage content={tProductDetails} lang={lang} />
          } />
          <Route path="/news" element={<NewsPage content={content.newsPage} lang={lang} />} />
          <Route path="/news/:slug" element={<NewsDetailPage lang={lang} />} />
          <Route path="/exhibitions" element={
            <ExhibitionsPage lang={lang} />
          } />
          <Route path="*" element={<ErrorPage lang={lang} />} />
        </Routes>
      </main>
      <Footer content={t.footer} lang={lang} />
      {/* Mobile Nav kept simple in layout */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-white/10 px-6 py-3 flex justify-around items-center z-50 shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.1)]">
        <Link to="/" className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary active:text-primary transition-colors">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">{t.header.home}</span>
        </Link>
        <Link to="/categories" className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary active:text-primary transition-colors">
          <span className="material-symbols-outlined">restaurant_menu</span>
          <span className="text-[10px] font-bold">{t.header.products}</span>
        </Link>
        <Link to="/about" className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary active:text-primary transition-colors">
          <span className="material-symbols-outlined">info</span>
          <span className="text-[10px] font-bold">{t.header.about}</span>
        </Link>
      </div>
    </>
  );
}


function App() {
  const [lang, setLang] = useState('en');
  
  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    if (lang === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.title = 'Tanorin';
      document.body.classList.remove('font-display');
      document.body.classList.add('font-cairo');
    } else {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      document.title = 'Tanorin';
      document.body.classList.remove('font-cairo');
      document.body.classList.add('font-display');
    }
  }, [lang]);

  return (
    <BrowserRouter>
      <MainLayout lang={lang} toggleLanguage={toggleLanguage} />
    </BrowserRouter>
  );
}

export default App;
