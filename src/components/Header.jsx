import { Link, NavLink } from 'react-router-dom';
import tanorinLogo from '../assets/logo.png';
import tanorinLogoAr from '../assets/logo-ar.png';

export default function Header({ content, lang, toggleLanguage }) {
  const isRTL = lang === 'ar';
  
  // Use the new logo for English, keep the old one for Arabic (or fallback)
  const logoSrc = lang === 'en' 
    ? tanorinLogo 
    : tanorinLogoAr;

  const navLinkClass = ({ isActive }) => 
    `text-sm transition-colors ${isRTL ? 'text-base' : ''} ${
      isActive 
        ? 'font-bold text-primary' 
        : 'font-semibold text-gray-500 hover:text-primary'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="relative w-32 h-12 flex items-center">
              <img alt="Tanorin Logo" className="h-full w-auto object-contain dark:hidden" src={logoSrc} />
              <img alt="Tanorin Logo" className="h-full w-auto object-contain hidden dark:block brightness-0 invert" src={logoSrc} />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>{content.home}</NavLink>
            <NavLink to="/about" className={navLinkClass}>{content.about}</NavLink>
            <NavLink to="/categories" className={navLinkClass}>{content.products}</NavLink>

            <NavLink to="/exhibitions" className={navLinkClass}>{content.exhibitions}</NavLink>
            <NavLink to="/news" className={navLinkClass}>{content.news}</NavLink>
            <NavLink to="/careers" className={navLinkClass}>{content.careers}</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div 
            className="bg-gray-100 dark:bg-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            onClick={toggleLanguage}
          >
            <span className="text-xs font-bold text-primary">{content.langSwitch}</span>
            <div className="w-px h-3 bg-gray-300"></div>
            <span className="text-xs font-bold text-gray-400">{lang === 'en' ? 'AR' : 'EN'}</span>
          </div>
          <button disabled className="md:hidden p-2 bg-gray-100 dark:bg-white/10 rounded-lg cursor-not-allowed opacity-50">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
