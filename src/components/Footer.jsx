import React from 'react';
import { Link } from 'react-router-dom';
import tanorinLogo from '../assets/logo.png';
import tanorinLogoAr from '../assets/logo-ar.png';

export default function Footer({ content, lang }) {
  const isRTL = lang === 'ar';
  const logoSrc = lang === 'en' ? tanorinLogo : tanorinLogoAr;

  // Paths corresponding to content.quickLinks.items
  // Items order: ["About Tanorin", "Our Products", "Quality Control", "Global Logistics"]
  const quickLinkPaths = ['/about', '/categories', '#', '#'];

  return (
    <footer className="bg-background-dark text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="relative w-36 h-14 flex items-center">
                  <img alt="Tanorin Logo" className="h-full w-auto object-contain brightness-0 invert" src={logoSrc} />
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {content.desc}
              </p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-not-allowed opacity-50" onClick={(e) => e.preventDefault()} href="#">
                  <span className="material-symbols-outlined text-lg">share</span>
                </a>
                <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-not-allowed opacity-50" onClick={(e) => e.preventDefault()} href="#">
                  <span className="material-symbols-outlined text-lg">rss_feed</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">{content.quickLinks.title}</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                {content.quickLinks.items.map((item, index) => {
                  const path = quickLinkPaths[index] || '#';
                  const isInteractionValues = path === '#';
                  
                  return (
                    <li key={index}>
                      {isInteractionValues ? (
                        <a className="cursor-not-allowed opacity-50" onClick={(e) => e.preventDefault()} href="#">{item}</a>
                      ) : (
                        <Link className="hover:text-primary transition-colors" to={path}>{item}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">{content.contact.title}</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                  <span data-location="Cairo, Egypt">{content.contact.address}</span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">mail</span>
                  {content.contact.email}
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">call</span>
                  {content.contact.phone}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">{content.newsletter.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{content.newsletter.desc}</p>
              <div className="relative">
                <input className="w-full bg-white/5 border-white/10 rounded-xl py-3 px-4 text-sm focus:ring-primary focus:border-primary" placeholder={content.newsletter.placeholder} type="email" />
                <button disabled className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-2 bg-gray-500 p-1.5 rounded-lg cursor-not-allowed opacity-50`}>
                  <span className={`material-symbols-outlined text-sm ${isRTL ? 'rtl-flip' : ''}`}>send</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-xs">
            <p>{content.copyright}</p>
            <div className="flex gap-8">
              <a className="cursor-not-allowed opacity-50" onClick={(e) => e.preventDefault()} href="#">{content.privacy}</a>
              <a className="cursor-not-allowed opacity-50" onClick={(e) => e.preventDefault()} href="#">{content.terms}</a>
            </div>
          </div>
        </div>
      </footer>
  );
}
