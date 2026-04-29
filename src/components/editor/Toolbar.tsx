import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, Download, CreditCard, Monitor, Smartphone, Tablet, ChevronLeft, Undo, Redo, X, ExternalLink, Check, Copy, RotateCcw, Maximize2, Menu, Plus } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteElement, SitePage } from '@/types';

interface ToolbarProps {
  onSave: () => void;
  onPreview: () => void;
  onExport: () => void;
  isPaid: boolean;
  elements?: SiteElement[];
  pages?: SitePage[];
  currentPageId?: string;
  onPageChange?: (id: string) => void;
  onAddPage?: () => void;
  onDeletePage?: (id: string) => void;
  onUpdatePageName?: (id: string, name: string) => void;
  siteName?: string;
  onUpdateSiteName?: (name: string) => void;
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export default function Toolbar({ 
  onSave, 
  onPreview, 
  onExport, 
  isPaid, 
  elements = [], 
  pages = [], 
  currentPageId = '', 
  onPageChange,
  onAddPage,
  onDeletePage,
  onUpdatePageName,
  siteName = 'Mon Nouveau Site',
  onUpdateSiteName,
  device,
  onDeviceChange
}: ToolbarProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewPageId, setPreviewPageId] = useState(currentPageId);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [isPreviewMobileMenuOpen, setIsPreviewMobileMenuOpen] = useState(false);

  const deviceWidths = {
    desktop: 'w-full max-w-6xl',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  const handlePreview = () => {
    setPreviewPageId(currentPageId);
    setIsPreviewOpen(true);
  };

  const currentPreviewPage = pages.find(p => p.id === previewPageId) || pages[0];
  const previewElements = currentPreviewPage?.elements || elements;

  const renderPreviewContent = () => {
    const isMobile = device === 'mobile';
    const isTablet = device === 'tablet';
    const isDesktop = device === 'desktop';

    const getElementStyles = (el: SiteElement) => {
      const baseStyles = el.styles || {};
      const tabletStyles = el.tabletStyles || {};
      const mobileStyles = el.mobileStyles || {};

      if (device === 'mobile') {
        return { ...baseStyles, ...tabletStyles, ...mobileStyles };
      } else if (device === 'tablet') {
        return { ...baseStyles, ...tabletStyles };
      }
      return baseStyles;
    };

    return previewElements.map((el) => {
      const styles = getElementStyles(el);
      
      return (
        <div key={el.id} style={{
          color: styles.color,
          fontSize: `${styles.fontSize || 16}px`,
          textAlign: styles.textAlign as any,
          backgroundColor: styles.backgroundColor,
          padding: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
          backgroundImage: styles.backgroundImage ? `linear-gradient(rgba(0,0,0,${styles.backgroundOpacity || 0.5}), rgba(0,0,0,${styles.backgroundOpacity || 0.5})), url(${styles.backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          {el.type === 'text' && <div dangerouslySetInnerHTML={{ __html: el.content || '' }} className="leading-relaxed" />}
          {el.type === 'button' && (
            <div className={`flex ${styles.textAlign === 'center' ? 'justify-center' : styles.textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
              <button 
                className={`${isMobile ? 'w-full px-6 py-3' : 'px-8 py-3'} rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95`} 
                style={{ backgroundColor: styles.backgroundColor || '#2563eb', color: styles.color || '#ffffff' }}
              >
                {el.content}
              </button>
            </div>
          )}
          {el.type === 'image' && (
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
              {el.content && el.content.startsWith('http') || el.content?.startsWith('data:image') ? (
                <img src={el.content} alt="Preview" className="w-full h-auto object-cover max-h-[500px]" />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                  Image placeholder
                </div>
              )}
            </div>
          )}
          {el.type === 'section-navbar' && (
            <div className="sticky top-0 z-50">
              <div className={`${isMobile ? 'py-3 px-4' : 'py-4 px-8'} flex items-center justify-between backdrop-blur-md bg-white/90 border-b border-gray-100 rounded-xl overflow-hidden`}>
                <div className="flex items-center gap-2 font-black text-xl text-blue-600 min-w-0">
                  {el.styles?.logoUrl ? (
                    <img src={el.styles.logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm shrink-0">
                      {el.content ? el.content.charAt(0).toUpperCase() : 'Y'}
                    </div>
                  )}
                  <span className={`truncate ${isMobile ? 'hidden' : 'block'}`}>{el.content || 'YawoBuild'}</span>
                </div>
                
                {/* Mobile Icon */}
                <div className={`${isMobile ? 'block' : 'hidden md:hidden'} p-2 text-gray-600 cursor-pointer`} onClick={() => setIsPreviewMobileMenuOpen(!isPreviewMobileMenuOpen)}>
                  {isPreviewMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </div>

                {/* Desktop Menu */}
                <div className={`${isMobile ? 'hidden' : 'hidden md:flex'} gap-8 text-sm font-bold text-gray-600`}>
                  {pages.map(page => (
                    <button 
                      key={page.id} 
                      onClick={() => setPreviewPageId(page.id)}
                      className={`hover:text-blue-600 transition-colors ${previewPageId === page.id ? 'text-blue-600' : ''}`}
                    >
                      {page.name}
                    </button>
                  ))}
                </div>
                <button className={`${isMobile ? 'hidden' : 'hidden sm:block'} px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-200`}>Démarrer</button>
              </div>

              {/* Mobile Menu Preview */}
              <AnimatePresence>
                {isMobile && isPreviewMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white border-b border-gray-100 overflow-hidden"
                  >
                    <div className="p-6 flex flex-col gap-6">
                      {pages.map(page => (
                        <button 
                          key={page.id} 
                          onClick={() => {
                            setPreviewPageId(page.id);
                            setIsPreviewMobileMenuOpen(false);
                          }}
                          className={`text-left text-sm font-bold ${previewPageId === page.id ? 'text-blue-600' : 'text-gray-600'}`}
                        >
                          {page.name}
                        </button>
                      ))}
                      <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200">
                        Démarrer
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        {el.type === 'section-hero' && (
          <div className={`${isMobile ? 'py-16 px-4' : isTablet ? 'py-24 px-8' : 'py-32 px-12'} text-center`}>
            <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'} font-black mb-6 leading-tight tracking-tight`}>
              {el.content && !el.content.startsWith('{') ? el.content : 'Créez votre futur numérique'}
            </h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed`}>
              La solution complète pour bâtir votre présence en ligne en quelques minutes, sans aucune compétence technique.
            </p>
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center gap-4`}>
              <button className={`${isMobile ? 'w-full' : ''} px-10 py-4 bg-blue-600 text-white rounded-full font-bold shadow-xl shadow-blue-500/30 hover:scale-105 transition-transform`}>
                Commencer maintenant
              </button>
              <button className={`${isMobile ? 'w-full' : ''} px-10 py-4 border-2 border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all`}>
                Voir la démo
              </button>
            </div>
          </div>
        )}
        {el.type === 'section-footer' && (
          <div className={`${isMobile ? 'py-12 px-6' : 'py-20 px-10'} border-t border-gray-100`}>
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-10' : 'md:grid-cols-4 gap-12'} mb-16`}>
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 font-black text-xl text-blue-600 mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">Y</div>
                  <span>YawoBuild</span>
                </div>
                <p className="opacity-60 max-w-xs leading-relaxed">La plateforme de création de sites web la plus intuitive du marché.</p>
              </div>
              <div className={isMobile ? 'border-t border-gray-100 pt-8' : ''}>
                <h4 className="font-black mb-6 text-xs uppercase tracking-[0.2em] text-blue-600">Navigation</h4>
                <div className="space-y-3 text-sm font-medium opacity-60">
                  {pages.map(page => (
                    <button key={page.id} onClick={() => setPreviewPageId(page.id)} className="block hover:text-blue-600 transition-colors">
                      {page.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className={isMobile ? 'border-t border-gray-100 pt-8' : ''}>
                <h4 className="font-black mb-6 text-xs uppercase tracking-[0.2em] text-blue-600">Social</h4>
                <div className="flex gap-4">
                  {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"><Smartphone size={18} /></div>)}
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-100 text-center text-xs font-bold opacity-30 uppercase tracking-widest">
              {el.content && !el.content.startsWith('{') ? el.content : `© ${new Date().getFullYear()} YawoBuild. Tous droits réservés.`}
            </div>
          </div>
        )}
        {/* Simplified templates for preview */}
        {el.type.startsWith('template-') && (
          <div className="py-24 px-10 text-center bg-gray-50/50 rounded-[40px] my-10 border border-gray-100">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest mb-6 inline-block">Section Professionnelle</span>
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">{el.type.replace('template-', '').replace('-', ' ').toUpperCase()}</h3>
            <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">Contenu pré-configuré pour une mise en page optimale et responsive.</p>
            <div className="inline-flex gap-4 p-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="w-20 h-20 bg-blue-50 rounded-xl" />
              <div className="w-20 h-20 bg-green-50 rounded-xl" />
              <div className="w-20 h-20 bg-purple-50 rounded-xl" />
            </div>
          </div>
        )}
        </div>
      );
    });
  };

  return (
    <>
      <div className="h-14 border-b border-gray-100 bg-white flex items-center justify-between px-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 gap-1 rounded-xl">
              <ChevronLeft size={18} />
              <span className="text-sm font-bold">Dashboard</span>
            </Button>
          </Link>
          <div className="h-6 w-px bg-gray-100"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Y</div>
            <input 
              type="text" 
              value={siteName}
              onChange={(e) => onUpdateSiteName?.(e.target.value)}
              className="bg-transparent border-none font-black text-gray-900 focus:ring-0 w-40 truncate p-0 text-sm"
              placeholder="Nom du projet..."
            />
          </div>
          <div className="h-6 w-px bg-gray-100"></div>
          
          {/* Page Selector */}
          <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200">
            {pages.map(page => (
              <div key={page.id} className="relative group/page">
                {editingPageId === page.id ? (
                  <input
                    autoFocus
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border-none focus:ring-2 focus:ring-blue-500/20 outline-none w-24"
                    value={page.name}
                    onChange={(e) => onUpdatePageName?.(page.id, e.target.value)}
                    onBlur={() => setEditingPageId(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingPageId(null)}
                  />
                ) : (
                  <button
                    onClick={() => onPageChange?.(page.id)}
                    onDoubleClick={() => setEditingPageId(page.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                      currentPageId === page.id 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {page.name}
                    {pages.length > 1 && currentPageId === page.id && (
                      <X 
                        size={10} 
                        className="hover:text-red-500" 
                        onClick={(e) => {
                          e.stopPropagation();
                          if(confirm(`Supprimer la page "${page.name}" ?`)) onDeletePage?.(page.id);
                        }} 
                      />
                    )}
                  </button>
                )}
              </div>
            ))}
            <button 
              onClick={onAddPage}
              className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ml-1" 
              title="Ajouter une page"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200">
          <button
            onClick={() => onDeviceChange('desktop')}
            className={`p-1.5 rounded-lg transition-all ${device === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            title="Desktop"
          >
            <Monitor size={16} />
          </button>
          <button
            onClick={() => onDeviceChange('tablet')}
            className={`p-1.5 rounded-lg transition-all ${device === 'tablet' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            title="Tablet"
          >
            <Tablet size={16} />
          </button>
          <button
            onClick={() => onDeviceChange('mobile')}
            className={`p-1.5 rounded-lg transition-all ${device === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            title="Mobile"
          >
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 rounded-lg" title="Annuler">
              <Undo size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 rounded-lg" title="Rétablir">
              <Redo size={16} />
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={handlePreview} className="text-gray-600 font-bold rounded-xl hover:bg-gray-50">
            <Eye size={16} className="mr-2" /> Aperçu
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onSave} className="text-gray-600 font-bold rounded-xl hover:bg-gray-50">
            <Save size={16} className="mr-2" /> Enregistrer
          </Button>

          {isPaid ? (
            <Button onClick={onExport} size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-100">
              <Download size={16} className="mr-2" /> Télécharger mon site
            </Button>
          ) : (
            <Button onClick={onExport} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100">
              <Download size={16} className="mr-2" /> Télécharger mon site
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-7xl h-full flex flex-col overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-8 shrink-0">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-4 w-[1px] bg-gray-200" />
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1">
                    <button
                      onClick={() => onDeviceChange('desktop')}
                      className={`p-2 rounded-lg transition-all ${device === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <Monitor size={16} />
                    </button>
                    <button
                      onClick={() => onDeviceChange('tablet')}
                      className={`p-2 rounded-lg transition-all ${device === 'tablet' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <Tablet size={16} />
                    </button>
                    <button
                      onClick={() => onDeviceChange('mobile')}
                      className={`p-2 rounded-lg transition-all ${device === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <Smartphone size={16} />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-2 rounded-full border border-gray-200 text-xs text-gray-400 font-bold flex items-center gap-3">
                  <Check size={14} className="text-green-500" />
                  yawo-build.com{currentPreviewPage?.slug}
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-gray-500 font-bold rounded-xl">
                    <Copy size={16} className="mr-2" /> Copier
                  </Button>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-gray-900"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-gray-50 overflow-auto p-4 md:p-12 custom-scrollbar">
                <div className={`${deviceWidths[device]} bg-white mx-auto min-h-full rounded-2xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out overflow-y-auto`}>
                  <div className="min-h-full">
                    {previewElements.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-96 text-gray-300">
                        <Eye size={64} className="mb-6 opacity-20" />
                        <p className="text-xl font-black uppercase tracking-widest">Site vide</p>
                      </div>
                    ) : (
                      renderPreviewContent()
                    )}
                  </div>
                </div>
              </div>

              <div className="h-14 border-t border-gray-100 bg-white flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 shrink-0">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> SSL sécurisé</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Vitesse optimisée</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> 100% Responsive</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}