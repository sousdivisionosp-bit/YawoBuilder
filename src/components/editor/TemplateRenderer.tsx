"use client";

import React, { useState } from 'react';
import { SiteElement, SitePage } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Send } from 'lucide-react';

interface TemplateRendererProps {
  elements: SiteElement[];
  pages?: SitePage[];
  device?: 'desktop' | 'tablet' | 'mobile';
  activePageId?: string;
  onPageChange?: (pageId: string) => void;
}

export default function TemplateRenderer({ 
  elements, 
  pages = [], 
  device = 'desktop',
  activePageId,
  onPageChange
}: TemplateRendererProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';

  const getElementStyles = (el: SiteElement) => {
    if (isMobile && el.mobileStyles) return { ...el.styles, ...el.mobileStyles };
    if (isTablet && el.tabletStyles) return { ...el.styles, ...el.tabletStyles };
    return el.styles;
  };

  const renderElement = (el: SiteElement) => {
    const sectionType = el.type.startsWith('section-') ? el.type.replace('section-', '') : el.type;
    const styles = getElementStyles(el);

    if (sectionType === 'navbar') {
      return (
        <div key={el.id} className="relative mb-4">
          <div className="w-full py-3 px-4 md:py-4 md:px-8 flex items-center justify-between rounded-xl shadow-sm border border-gray-100 overflow-hidden" style={{ backgroundColor: styles.backgroundColor || '#ffffff', color: styles.color || '#1f2937' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                {el.content ? el.content.charAt(0).toUpperCase() : 'L'}
              </div>
              <span className="font-bold tracking-tight">{el.content || 'LOGO'}</span>
            </div>
            
            <div className={`${isMobile ? 'block' : 'md:hidden'} p-2 opacity-60 cursor-pointer`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </div>

            <div className={`${isMobile ? 'hidden' : 'hidden md:flex'} gap-6 font-medium text-sm opacity-80`}>
              {pages.length > 0 ? pages.map(page => (
                <span 
                  key={page.id} 
                  className={`cursor-pointer transition-colors ${activePageId === page.id ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
                  onClick={() => onPageChange?.(page.id)}
                >
                  {page.name}
                </span>
              )) : (
                <>
                  <span className="cursor-pointer hover:text-blue-600 transition-colors">Accueil</span>
                  <span className="cursor-pointer hover:text-blue-600 transition-colors">Services</span>
                  <span className="cursor-pointer hover:text-blue-600 transition-colors">Contact</span>
                </>
              )}
            </div>
            
            <button className={`${isMobile ? 'hidden' : 'hidden sm:block'} px-4 py-2 bg-blue-600 text-white rounded-lg text-xs md:text-sm font-bold shadow-md shadow-blue-100 shrink-0`}>
              Démarrer
            </button>
          </div>

          <AnimatePresence>
            {isMobile && isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                <div className="p-4 flex flex-col gap-4">
                  {pages.map(page => (
                    <button 
                      key={page.id} 
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activePageId === page.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        onPageChange?.(page.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {page.name}
                    </button>
                  ))}
                  <button className="w-full mt-2 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg">
                    Démarrer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (sectionType === 'hero') {
      const heroStyles = {
        backgroundColor: styles.backgroundColor || '#111827',
        color: styles.color || '#ffffff',
        backgroundImage: styles.backgroundImage ? `url(${styles.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative' as const,
      };

      return (
        <div key={el.id} className={`w-full ${isMobile ? 'py-16 px-6' : isTablet ? 'py-20 px-10' : 'py-32 px-12'} text-center rounded-2xl overflow-hidden mb-4`} style={heroStyles}>
          {styles.backgroundImage && (
            <div className="absolute inset-0 bg-black/50 z-0" style={{ backgroundColor: `rgba(0,0,0,${styles.backgroundOpacity || 0.5})` }} />
          )}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className={`${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-6xl'} font-black mb-6 leading-[1.1] tracking-tight`}>
              {el.content || 'Créez votre futur numérique'}
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-xl'} opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed`}>
              La solution complète pour bâtir votre présence en ligne en quelques minutes.
            </p>
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center gap-4`}>
              <button className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform">Démarrer</button>
              <button className="px-10 py-4 border-2 border-white/30 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-colors">En savoir plus</button>
            </div>
          </div>
        </div>
      );
    }

    if (sectionType === 'footer') {
      return (
        <div key={el.id} className={`w-full ${isMobile ? 'py-10 px-6' : 'py-12 px-8'} rounded-2xl mb-4`} style={{ backgroundColor: styles.backgroundColor || '#111827', color: styles.color || '#ffffff' }}>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-10' : 'grid-cols-1 md:grid-cols-3 gap-8'} mb-8`}>
            <div>
              <div className="flex items-center gap-2 mb-6">
                {styles.logoUrl ? (
                  <img src={styles.logoUrl} alt="Logo" className="w-8 h-8 object-contain rounded-lg" />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                    {el.content ? el.content.charAt(0).toUpperCase() : 'L'}
                  </div>
                )}
                <span className="font-bold tracking-tight">{el.content || 'LOGO'}</span>
              </div>
              <p className="text-sm opacity-60 leading-relaxed max-w-xs">
                Une plateforme intuitive pour créer des sites web professionnels sans code.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 opacity-90 text-sm uppercase tracking-wider">Navigation</h4>
              <div className="space-y-3 opacity-60 text-sm">
                {pages.map(page => (
                  <p 
                    key={page.id} 
                    className={`hover:opacity-100 cursor-pointer transition-opacity ${activePageId === page.id ? 'opacity-100 font-bold underline' : ''}`}
                    onClick={() => onPageChange?.(page.id)}
                  >
                    {page.name}
                  </p>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 opacity-90 text-sm uppercase tracking-wider">Contact</h4>
              <div className="space-y-3 opacity-60 text-sm">
                <p className="hover:opacity-100 cursor-pointer transition-opacity">email@example.com</p>
                <p className="hover:opacity-100 cursor-pointer transition-opacity">+243 00 000 0000</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center md:text-left text-xs opacity-40">
            {el.content || `© ${new Date().getFullYear()} YawBuild. Tous droits réservés.`}
          </div>
        </div>
      );
    }

    // Default rendering for other elements
    return (
      <div 
        key={el.id} 
        className="mb-4"
        style={styles}
        dangerouslySetInnerHTML={{ __html: el.content || '' }}
      />
    );
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className={`mx-auto transition-all duration-300 ${
        isMobile ? 'max-w-[375px]' : isTablet ? 'max-w-[768px]' : 'max-w-full'
      }`}>
        {elements.map(renderElement)}
      </div>
    </div>
  );
}