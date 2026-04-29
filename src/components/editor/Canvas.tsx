import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { SiteElement, SitePage } from '@/types';
import { Trash2, Move, Copy, Settings, Image, MessageSquare, Plus, X, Check, ChevronDown, Upload, User, Mail, Phone, Calendar, Star, Eye, EyeOff, Send, Clock, MapPin, Quote, DollarSign, FileText, CheckCircle, Circle, Square, Minus, Layout, CheckSquare, Type, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CanvasProps {
  elements: SiteElement[];
  pages?: SitePage[];
  device?: 'desktop' | 'tablet' | 'mobile';
  onRemove: (id: string) => void;
  onSelect: (element: SiteElement) => void;
  onUpdate: (element: SiteElement) => void;
  selectedId: string | null;
  onPreview?: () => void;
}

interface FormFieldConfig {
  id: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export default function Canvas({ elements, pages = [], device = 'desktop', onRemove, onSelect, onUpdate, selectedId, onPreview }: CanvasProps) {
  const [previewMode, setPreviewMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';
  const isDesktop = device === 'desktop';

  const renderFormBuilder = (el: SiteElement) => {
    const fields: FormFieldConfig[] = el.content ? JSON.parse(el.content) : getDefaultFormFields();

    if (previewMode) {
      return (
        <form className={`${isMobile ? 'p-6 space-y-4' : 'p-10 space-y-6'} max-w-2xl mx-auto border border-gray-100 rounded-3xl bg-white shadow-xl`} onSubmit={(e) => e.preventDefault()}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 mb-6 text-center`}>Contactez-nous</h3>
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea placeholder={field.placeholder} required={field.required} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none min-h-[120px] transition-all text-sm" />
              ) : field.type === 'select' ? (
                <div className="relative">
                  <select required={field.required} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none appearance-none transition-all text-sm">
                    <option value="">{field.placeholder || 'Sélectionnez...'}</option>
                    {field.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              ) : field.type === 'radio' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {field.options?.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 opacity-0" />
                      </div>
                      <span className="text-gray-700 text-sm truncate">{opt}</span>
                    </label>
                  ))}
                </div>
              ) : field.type === 'checkbox' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {field.options?.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-blue-600 opacity-0" />
                      </div>
                      <span className="text-gray-700 text-sm truncate">{opt}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all text-sm"
                />
              )}
            </div>
          ))}
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm">
            <Send size={18} /> Envoyer le message
          </motion.button>
        </form>
      );
    }

    return (
      <div className="max-w-2xl mx-auto p-8 border-2 border-dashed border-blue-200 rounded-3xl bg-blue-50/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-700">Formulaire - Mode Édition</h3>
          <div className="flex gap-2">
            <button onClick={() => setPreviewMode(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Eye size={14} /> Aperçu
            </button>
            <button onClick={() => setPreviewMode(false)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">
              <Settings size={14} /> Modifier
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  field.type === 'text' ? 'bg-blue-100 text-blue-600' :
                  field.type === 'email' ? 'bg-purple-100 text-purple-600' :
                  field.type === 'select' ? 'bg-green-100 text-green-600' :
                  field.type === 'radio' ? 'bg-orange-100 text-orange-600' :
                  field.type === 'checkbox' ? 'bg-pink-100 text-pink-600' :
                  'bg-gray-100 text-gray-600'
                }`}>{field.type}</span>
                <span className="text-sm font-semibold text-gray-700">{field.label}</span>
                {field.required && <span className="text-red-500 text-xs">*</span>}
              </div>
              <div className="text-xs text-gray-400">
                {field.type === 'radio' || field.type === 'checkbox' ? (
                  <span>Options: {field.options?.join(', ')}</span>
                ) : (
                  <span>Placeholder: {field.placeholder}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <button className="flex-1 py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-sm font-medium hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
            <Plus size={16} /> Ajouter un champ
          </button>
        </div>
      </div>
    );
  };

  const getDefaultFormFields = (): FormFieldConfig[] => [
    { id: '1', type: 'text', label: 'Nom complet', placeholder: 'Votre nom...', required: true },
    { id: '2', type: 'email', label: 'Email', placeholder: 'votre@email.com', required: true },
    { id: '3', type: 'tel', label: 'Téléphone', placeholder: '+243...', required: false },
    { id: '4', type: 'select', label: 'Sujet', placeholder: 'Choisir un sujet...', required: true, options: ['Question', 'Devis', 'Partenariat', 'Autre'] },
    { id: '5', type: 'textarea', label: 'Message', placeholder: 'Votre message...', required: true },
  ];

  const renderFormFieldElement = (el: SiteElement) => {
    const fieldType = el.type.replace('form-', '');
    
    // Safe JSON parse for form fields
    let fieldConfig: FormFieldConfig = {
      id: el.id,
      type: fieldType as FormFieldConfig['type'],
      label: `Champ ${fieldType}`,
      placeholder: `Entrez...`,
      required: false,
      options: fieldType === 'radio' || fieldType === 'checkbox' ? ['Option 1', 'Option 2'] : undefined,
    };

    if (el.content && el.content.trim().startsWith('{')) {
      try {
        fieldConfig = JSON.parse(el.content);
      } catch (e) {
        console.error("Failed to parse form field config", e);
      }
    }

    const typeIcons: Record<string, React.ReactNode> = {
      'input-text': <User size={16} />,
      'input-email': <Mail size={16} />,
      'input-tel': <Phone size={16} />,
      'textarea': <FileText size={16} />,
      'select': <ChevronDown size={16} />,
      'radio': <Circle size={16} />,
      'checkbox': <CheckSquare size={16} />,
      'date': <Calendar size={16} />,
      'rating': <Star size={16} />,
      'submit': <Send size={16} />,
    };

    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${fieldType === 'submit' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
            {typeIcons[el.type] || <Type size={16} />}
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">{el.type.replace('form-', '').replace('-', ' ')}</span>
            <h4 className="font-semibold text-gray-800">{fieldConfig.label}</h4>
          </div>
          {fieldConfig.required && <span className="ml-auto text-red-500 text-xs font-bold">*</span>}
        </div>

        {fieldType === 'textarea' ? (
          <textarea
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 min-h-[100px] resize-none"
            placeholder={fieldConfig.placeholder}
            disabled
          />
        ) : fieldType === 'select' ? (
          <div className="relative">
            <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 appearance-none" disabled>
              <option>{fieldConfig.placeholder || 'Sélectionnez...'}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        ) : fieldType === 'radio' ? (
          <div className="space-y-2">
            {fieldConfig.options?.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 opacity-0" />
                </div>
                <span className="text-gray-600 text-sm">{opt}</span>
              </label>
            ))}
          </div>
        ) : fieldType === 'checkbox' ? (
          <div className="space-y-2">
            {fieldConfig.options?.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
                <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center">
                  <Check size={14} className="text-blue-600 opacity-0" />
                </div>
                <span className="text-gray-600 text-sm">{opt}</span>
              </label>
            ))}
          </div>
        ) : fieldType === 'rating' ? (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} className="text-gray-300 fill-gray-300" />
            ))}
          </div>
        ) : fieldType === 'submit' ? (
          <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg">
            {fieldConfig.label || 'Envoyer'}
          </button>
        ) : (
          <input
            type={fieldType.replace('input-', '').replace('input', 'text')}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-600"
            placeholder={fieldConfig.placeholder}
            disabled
          />
        )}
      </div>
    );
  };

  const renderChatElement = (el: SiteElement) => {
    const chatType = el.type.replace('chat-', '');
    
    // Safe JSON parse for chat
    let chatConfig = {
      position: 'bottom-right',
      theme: 'blue',
      messages: [
        { type: 'greeting', text: 'Bonjour !', subtext: 'Comment puis-je vous aider ?' },
        { type: 'quick', options: ['Aide', 'Contact', 'FAQ'] }
      ]
    };

    if (el.content && el.content.trim().startsWith('{')) {
      try {
        chatConfig = JSON.parse(el.content);
      } catch (e) {
        console.error("Failed to parse chat config", e);
      }
    }

    const themeClasses: Record<string, string> = {
      blue: 'from-blue-600 to-indigo-600',
      green: 'from-green-600 to-emerald-600',
      purple: 'from-purple-600 to-pink-600',
      dark: 'from-gray-800 to-gray-900',
    };

    if (chatType === 'widget') {
      return (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`p-5 rounded-2xl bg-gradient-to-r ${themeClasses[chatConfig.theme]} text-white shadow-2xl flex items-center gap-4 cursor-pointer max-w-xs`}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">{chatConfig.messages[0].text}</p>
              <p className="text-xs opacity-80">{chatConfig.messages[0].subtext}</p>
            </div>
          </motion.div>
        </div>
      );
    }

    if (chatType === 'bubble') {
      return (
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-xs">
              <p className="text-gray-700 text-sm">Bonjour ! Comment puis-je vous aider ?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 max-w-xs">
              <p className="text-sm">J'ai une question...</p>
            </div>
          </div>
        </div>
      );
    }

    if (chatType === 'quick-replies') {
      return (
        <div className="flex flex-wrap gap-2 justify-center">
          {chatConfig.messages[1]?.options?.map((opt: string, i: number) => (
            <button key={i} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-100 transition-colors">
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (chatType === 'welcome') {
      return (
        <div className="text-center py-12 bg-gradient-to-b from-gray-50 to-white rounded-2xl">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Bienvenue !</h3>
          <p className="text-gray-500 mb-6">{chatConfig.messages[0].text}</p>
          <div className="flex justify-center gap-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">Commencer</button>
            <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">En savoir plus</button>
          </div>
        </div>
      );
    }

    return <div className="p-8 text-center text-gray-400">Chat element: {chatType}</div>;
  };

  const renderSectionElement = (el: SiteElement) => {
    const sectionType = el.type.replace('section-', '');
    
    // Safe JSON parse for config-based sections
    let sectionConfig = { columns: 2, gap: 'medium', padding: 'large' };
    if (el.content && el.content.trim().startsWith('{')) {
      try {
        sectionConfig = JSON.parse(el.content);
      } catch (e) {
        console.error("Failed to parse section config", e);
      }
    }

    const gapSizes: Record<string, string> = { 
      small: isMobile ? 'gap-2' : 'gap-4', 
      medium: isMobile ? 'gap-4' : 'gap-8', 
      large: isMobile ? 'gap-6' : 'gap-12' 
    };
    const paddingSizes: Record<string, string> = { 
      small: isMobile ? 'p-4' : 'p-6', 
      medium: isMobile ? 'p-6' : 'p-12', 
      large: isMobile ? 'p-8' : 'p-20' 
    };

    if (sectionType === 'container') {
      return (
        <div className={`w-full min-h-[200px] border-2 border-dashed border-gray-200 rounded-2xl ${paddingSizes[sectionConfig.padding]} flex items-center justify-center`}>
          <div className="text-center text-gray-300">
            <Layout size={isMobile ? 32 : 48} className="mx-auto mb-2" />
            <p className="font-medium text-sm">Conteneur de section</p>
          </div>
        </div>
      );
    }

    if (sectionType.includes('columns')) {
      const cols = parseInt(sectionType.replace('columns-', '')) || 2;
      let gridCols = 'grid-cols-1';
      if (isDesktop) {
        gridCols = `grid-cols-${cols}`;
      } else if (isTablet) {
        gridCols = cols > 2 ? 'grid-cols-2' : `grid-cols-${cols}`;
      } else {
        gridCols = 'grid-cols-1';
      }
      
      return (
        <div className={`grid ${gridCols} ${gapSizes[sectionConfig.gap]} ${isMobile ? 'p-4' : 'p-4 md:p-8'}`}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Layout size={isMobile ? 16 : 20} className="mx-auto mb-1 opacity-50" />
                <span className="text-[10px] font-medium">Colonne {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (sectionType === 'hero') {
      const styles = getElementStyles(el);
      const heroStyles = {
        backgroundColor: styles.backgroundColor || '#111827',
        color: styles.color || '#ffffff',
        backgroundImage: styles.backgroundImage ? `url(${styles.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative' as const,
      };

      return (
        <div className={`w-full ${isMobile ? 'py-16 px-6' : isTablet ? 'py-20 px-10' : 'py-32 px-12'} text-center rounded-2xl overflow-hidden group/hero`} style={heroStyles}>
          {styles.backgroundImage && (
            <div className="absolute inset-0 bg-black/50 z-0" style={{ backgroundColor: `rgba(0,0,0,${styles.backgroundOpacity || 0.5})` }} />
          )}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 
              contentEditable 
              suppressContentEditableWarning
              onBlur={(e) => {
                onUpdate({ ...el, content: e.currentTarget.innerText });
              }}
              className={`${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-6xl'} font-black mb-6 focus:outline-none cursor-text leading-[1.1] tracking-tight`}
            >
              {el.content && !el.content.startsWith('{') ? el.content : 'Créez votre futur numérique'}
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-xl'} opacity-80 mb-10 max-w-2xl mx-auto focus:outline-none leading-relaxed`}>
              La solution complète pour bâtir votre présence en ligne en quelques minutes, sans aucune compétence technique.
            </p>
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center gap-4`}>
              <button className={`${isMobile ? 'w-full' : ''} px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform`}>Démarrer</button>
              <button className={`${isMobile ? 'w-full' : ''} px-10 py-4 border-2 border-white/30 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-colors`}>En savoir plus</button>
            </div>
          </div>
          
          {!isMobile && (
             <button 
               className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur rounded-lg text-white opacity-0 group-hover/hero:opacity-100 transition-opacity flex items-center gap-2 text-[10px] font-bold"
               onClick={(e) => {
                 e.stopPropagation();
                 const input = document.createElement('input');
                 input.type = 'file';
                 input.accept = 'image/*';
                 input.onchange = (ie) => {
                   const file = (ie.target as HTMLInputElement).files?.[0];
                   if (file) {
                     const reader = new FileReader();
                     reader.onload = (re) => {
                       onUpdate({
                         ...el,
                         styles: { ...el.styles, backgroundImage: re.target?.result as string }
                       });
                     };
                     reader.readAsDataURL(file);
                   }
                 };
                 input.click();
               }}
             >
               <Image size={12} /> Changer le fond
             </button>
           )}
        </div>
      );
    }

    if (sectionType === 'navbar') {
      const styles = getElementStyles(el);
      
      return (
        <div className="relative mb-4">
          <div className="w-full py-3 px-4 md:py-4 md:px-8 flex items-center justify-between rounded-xl shadow-sm border border-gray-100 overflow-hidden" style={{ backgroundColor: styles.backgroundColor || '#ffffff', color: styles.color || '#1f2937' }}>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                {el.content ? el.content.charAt(0).toUpperCase() : 'L'}
              </div>
              <span className="font-bold tracking-tight truncate min-w-0">{el.content || 'LOGO'}</span>
            </div>
            
            {/* Mobile Menu Icon */}
            <div className={`${isMobile ? 'block' : 'md:hidden'} p-2 opacity-60 cursor-pointer`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
    
            {/* Desktop Menu - Dynamic from pages */}
            <div className={`${isMobile ? 'hidden' : 'hidden md:flex'} gap-6 font-medium text-sm opacity-80`}>
              {pages.length > 0 ? pages.map(page => (
                <span key={page.id} className="cursor-default hover:text-blue-600 transition-colors">
                  {page.name}
                </span>
              )) : (
                <>
                  <span>Accueil</span>
                  <span>Services</span>
                  <span>Contact</span>
                </>
              )}
            </div>
            
            <button className={`${isMobile ? 'hidden' : 'hidden sm:block'} px-4 py-2 md:px-5 md:py-2 bg-blue-600 text-white rounded-lg text-xs md:text-sm font-bold shadow-md shadow-blue-100 shrink-0`}>
              Démarrer
            </button>
          </div>

          {/* Mobile Menu Content */}
          <AnimatePresence>
            {isMobile && isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                <div className="p-4 flex flex-col gap-4">
                  {pages.length > 0 ? pages.map(page => (
                    <button 
                      key={page.id} 
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {page.name}
                    </button>
                  )) : (
                    <>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700">Accueil</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700">Services</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700">Contact</button>
                    </>
                  )}
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
  
    if (sectionType === 'footer') {
      const styles = getElementStyles(el);
      
      return (
        <div className={`w-full ${isMobile ? 'py-10 px-6' : 'py-12 px-8'} rounded-2xl`} style={{ backgroundColor: styles.backgroundColor || '#111827', color: styles.color || '#ffffff' }}>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-10' : 'grid-cols-1 md:grid-cols-3 gap-8'} mb-8`}>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">L</div>
                <span className="font-bold tracking-tight">LOGO</span>
              </div>
              <p className="text-sm opacity-60 leading-relaxed max-w-xs">
                Une plateforme intuitive pour créer des sites web professionnels sans code.
              </p>
            </div>
            
            <div className={isMobile ? 'border-t border-white/10 pt-8' : ''}>
              <h4 className="font-bold mb-4 opacity-90 text-sm uppercase tracking-wider">Navigation</h4>
              <div className="space-y-3 opacity-60 text-sm">
                {pages.length > 0 ? pages.map(page => (
                  <p key={page.id} className="hover:opacity-100 cursor-default transition-opacity">{page.name}</p>
                )) : (
                  <>
                    <p className="hover:opacity-100 cursor-default transition-opacity">Accueil</p>
                    <p className="hover:opacity-100 cursor-default transition-opacity">À propos</p>
                    <p className="hover:opacity-100 cursor-default transition-opacity">Contact</p>
                  </>
                )}
              </div>
            </div>
            
            <div className={isMobile ? 'border-t border-white/10 pt-8' : ''}>
              <h4 className="font-bold mb-4 opacity-90 text-sm uppercase tracking-wider">Contact</h4>
              <div className="space-y-3 opacity-60 text-sm">
                <p className="hover:opacity-100 cursor-pointer transition-opacity">email@example.com</p>
                <p className="hover:opacity-100 cursor-pointer transition-opacity">+243 00 000 0000</p>
                <div className="flex gap-3 mt-4">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" />
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" />
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between gap-4 opacity-40 text-xs">
            <span>{el.content && !el.content.startsWith('{') ? el.content : `© ${new Date().getFullYear()} YawBuild. Tous droits réservés.`}</span>
            <div className="flex justify-center gap-6">
              <span>Confidentialité</span>
              <span>Conditions</span>
            </div>
          </div>
        </div>
      );
    }

    if (sectionType === 'sidebar') {
      
      return (
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-[250px_1fr]'} gap-0 rounded-2xl overflow-hidden border border-gray-200`}>
          <div className="bg-gray-900 text-white p-8">
            <h3 className="font-bold text-lg mb-4">Sidebar</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p className="text-white">Menu Item 1</p>
              <p>Menu Item 2</p>
              <p>Menu Item 3</p>
            </div>
          </div>
          <div className="bg-gray-50 p-8">
            <h3 className="font-bold text-xl mb-4">Contenu principal</h3>
            <p className="text-gray-600 text-sm">Ajoutez votre contenu ici...</p>
          </div>
        </div>
      );
    }

    return <div className="p-8 text-center text-gray-400">Section: {sectionType}</div>;
  };

  const renderTemplateElement = (el: SiteElement) => {
    const templateType = el.type.replace('template-', '');

    const templatePreviews: Record<string, { title: string; description: string; color: string }> = {
      'hero-cta': { title: 'Hero avec CTA', description: 'Section hero avec boutons d\'action', color: 'from-blue-600 to-indigo-600' },
      'features': { title: 'Caractéristiques', description: 'Grille de fonctionnalités', color: 'from-green-500 to-emerald-600' },
      'pricing': { title: 'Tarification', description: 'Cartes de prix', color: 'from-purple-600 to-pink-600' },
      'testimonials': { title: 'Témoignages', description: 'Avis clients', color: 'from-orange-500 to-red-500' },
      'team': { title: 'Équipe', description: 'Présentation d\'équipe', color: 'from-cyan-500 to-blue-600' },
      'contact': { title: 'Contact', description: 'Formulaire de contact', color: 'from-pink-500 to-rose-600' },
      'portfolio': { title: 'Portfolio', description: 'Galerie de projets', color: 'from-amber-500 to-orange-600' },
      'blog': { title: 'Blog', description: 'Articles de blog', color: 'from-teal-500 to-green-600' },
    };

    const template = templatePreviews[templateType] || { title: 'Template', description: '', color: 'from-gray-400 to-gray-500' };

    return (
      <div className="w-full py-12 px-6 md:py-16 md:px-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-block px-4 py-1.5 bg-gradient-to-r ${template.color} text-white text-[10px] md:text-xs font-bold rounded-full mb-6`}>
            MODÈLE
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{template.title}</h3>
          <p className="text-sm md:text-base text-gray-500 mb-8">{template.description}</p>
          <div className={`p-6 md:p-8 rounded-2xl bg-gradient-to-r ${template.color} text-white`}>
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold mb-4">Contenu du modèle</p>
              <p className="text-xs md:text-sm opacity-80">Glissez des éléments ici pour personnaliser</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderChatBuilder = (el: SiteElement) => {
    const chatConfig = el.content ? JSON.parse(el.content) : { position: 'bottom-right', theme: 'blue', messages: [
      { type: 'greeting', text: 'Besoin d\'aide ?', subtext: 'Nous sommes là pour vous' },
      { type: 'quick', options: ['Oui, aidez-moi !', 'Je vais réfléchir'] }
    ]};

    const positionClasses = {
      'bottom-right': 'fixed bottom-6 right-6',
      'bottom-left': 'fixed bottom-6 left-6',
      'center-right': 'fixed top-1/2 right-6 -translate-y-1/2',
      'center-left': 'fixed top-1/2 left-6 -translate-y-1/2',
    };

    const themeClasses: Record<string, string> = {
      blue: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
      green: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
      purple: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
      dark: 'bg-gray-900 text-white',
    };

    return (
      <div className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
        {previewMode ? (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-5 rounded-2xl ${themeClasses[chatConfig.theme]} shadow-2xl flex items-center gap-4 cursor-pointer max-w-sm`}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="font-bold text-sm">{chatConfig.messages[0].text}</p>
                <p className="text-xs opacity-80">{chatConfig.messages[0].subtext}</p>
              </div>
              <button className="ml-auto p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={18} />
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Widget Chat</h3>
                <p className="text-sm text-gray-500 mt-1">Configurez votre widget de discussion</p>
              </div>
              <button onClick={() => setPreviewMode(true)} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                <Eye size={16} /> Tester
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['bottom-right', 'bottom-left'].map((pos) => (
                      <button key={pos} className={`p-3 rounded-xl text-xs font-semibold border-2 transition-all ${chatConfig.position === pos ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                        {pos.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Thème</label>
                  <div className="flex gap-2">
                    {['blue', 'green', 'purple', 'dark'].map((theme) => (
                      <button key={theme} className={`w-10 h-10 rounded-xl ${themeClasses[theme]} shadow-sm`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase">Message d'accueil</label>
                <input type="text" value={chatConfig.messages[0].text} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Message..." />
                <input type="text" value={chatConfig.messages[0].subtext} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Sous-texte..." />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase">Réponses rapides</label>
                <div className="flex flex-wrap gap-2">
                  {chatConfig.messages[1]?.options?.map((opt: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">{opt}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSectionBuilder = (el: SiteElement) => {
    // Safe JSON parse for section builder
    let sectionConfig = {
      columns: 2,
      gap: 'medium',
      background: 'white',
      padding: 'large',
      elements: []
    };

    if (el.content && el.content.trim().startsWith('{')) {
      try {
        sectionConfig = JSON.parse(el.content);
      } catch (e) {
        console.error("Failed to parse section builder config", e);
      }
    }

    const gapSizes: Record<string, string> = { small: 'gap-4', medium: 'gap-8', large: 'gap-12' };
    const paddingSizes: Record<string, string> = { small: 'p-6', medium: 'p-12', large: 'p-20' };

    return (
      <div className={`w-full min-h-[400px] bg-${sectionConfig.background} ${paddingSizes[sectionConfig.padding]} border-2 border-dashed border-gray-200 rounded-none`}>
        {previewMode ? (
          <div className={`grid grid-cols-${sectionConfig.columns} ${gapSizes[sectionConfig.gap]} h-full`}>
            {Array.from({ length: sectionConfig.columns }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 min-h-[200px]">
                <div className="text-center">
                  <Plus size={32} className="mx-auto mb-2 opacity-50" />
                  <span className="text-sm font-medium">Colonne {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Layout size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Section Multi-Colonnes</h3>
                  <p className="text-sm text-gray-500">Créez des mises en page avancées</p>
                </div>
              </div>
              <button onClick={() => setPreviewMode(true)} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                <Eye size={16} /> Aperçu
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Nombre de colonnes</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <button key={n} onClick={() => { sectionConfig.columns = n; }} className={`w-12 h-12 rounded-xl font-bold text-lg transition-all ${sectionConfig.columns === n ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Espacement</label>
                  <div className="flex gap-2">
                    {['small', 'medium', 'large'].map((size) => (
                      <button key={size} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${sectionConfig.gap === size ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: sectionConfig.columns }).map((_, i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <span className="text-2xl font-black text-gray-300">{i + 1}</span>
                    </div>
                    <button className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Minus size={14} />
                    </button>
                    <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg">
                      <Plus size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <MapPin size={16} /> Ajouter une carte
                </button>
                <button className="flex-1 py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <Quote size={16} /> Ajouter un témoignage
                </button>
                <button className="flex-1 py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <DollarSign size={16} /> Ajouter un tarif
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const deviceWidths = {
    desktop: 'max-w-5xl',
    tablet: 'max-w-3xl',
    mobile: 'max-w-[375px]',
  };

  const getElementStyles = (el: SiteElement) => {
    let baseStyles = { ...el.styles };
    if (device === 'tablet' && el.tabletStyles) {
      baseStyles = { ...baseStyles, ...el.tabletStyles };
    } else if (device === 'mobile' && el.mobileStyles) {
      baseStyles = { ...baseStyles, ...el.mobileStyles };
    }
    return baseStyles;
  };

  return (
    <div className="flex-1 bg-[#f0f0f0] p-8 overflow-y-auto min-h-screen custom-scrollbar flex flex-col items-center">
      <div className={`w-full ${deviceWidths[device]} bg-white min-h-[1200px] shadow-2xl rounded-sm border border-gray-200 transition-all duration-500 relative mx-auto`}>
        <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-1.5 rounded-t-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
        </div>

        <Droppable droppableId="canvas">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`min-h-[1100px] transition-all duration-300 p-0 relative ${
                snapshot.isDraggingOver ? 'bg-blue-50/30' : ''
              }`}
            >
              <AnimatePresence>
                {elements.length === 0 && !snapshot.isDraggingOver && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 pointer-events-none"
                  >
                    <div className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center mb-4">
                      <Move size={32} />
                    </div>
                    <p className="text-xl font-medium">Glissez vos sections ici pour commencer</p>
                    <p className="text-sm mt-2">Personnalisez chaque élément en cliquant dessus</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {elements.map((el, index) => {
                const styles = getElementStyles(el);
                return (
                <Draggable key={el.id} draggableId={el.id} index={index}>
                  {(provided, snapshot) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(el);
                      }}
                      className={`group relative transition-all duration-300 ${
                        snapshot.isDragging ? 'z-50 shadow-2xl ring-4 ring-blue-500/30 ring-offset-4 rounded-xl bg-white scale-[1.02]' :
                        selectedId === el.id ? 'ring-2 ring-blue-500 ring-offset-2 z-10 rounded-lg' : 'hover:ring-2 hover:ring-blue-200 hover:ring-offset-1 rounded-lg'
                      }`}
                    >
                      {/* Selection Indicator for professional look */}
                      {selectedId === el.id && (
                        <>
                          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white z-50 shadow-sm" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white z-50 shadow-sm" />
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white z-50 shadow-sm" />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white z-50 shadow-sm" />
                        </>
                      )}

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                         <div {...provided.dragHandleProps} className="p-1.5 bg-white/90 backdrop-blur rounded-lg shadow-md cursor-move text-gray-400 hover:text-blue-600 border border-gray-100">
                           <Move size={14} />
                         </div>
                      </div>

                      <AnimatePresence>
                        {selectedId === el.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute -top-14 left-0 flex items-center gap-0.5 bg-gray-900 text-white p-1 rounded-xl shadow-2xl z-50 border border-white/10"
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg cursor-move transition-colors"
                              title="Déplacer"
                            >
                              <Move size={16} />
                            </div>
                            <div className="w-[1px] h-4 bg-white/10 mx-1" />
                            <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Paramètres">
                              <Settings size={16} />
                            </button>
                            <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Dupliquer">
                              <Copy size={16} />
                            </button>
                            <div className="w-[1px] h-4 bg-white/10 mx-1" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemove(el.id);
                              }}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className={`w-full ${isMobile ? 'p-4' : 'p-8'} transition-all ${snapshot.isDragging ? 'p-6' : ''}`} style={{
                        color: styles.color,
                        fontSize: `${styles.fontSize}px`,
                        textAlign: styles.textAlign as any,
                        backgroundColor: styles.backgroundColor,
                      }}>
                        {el.type === 'text' && (
                          <div
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              onUpdate({
                                ...el,
                                content: e.currentTarget.innerText
                              });
                            }}
                            className="focus:outline-none min-h-[1.5em] leading-relaxed cursor-text"
                          >
                            {el.content || 'Double-cliquez pour éditer ce texte'}
                          </div>
                        )}

                        {el.type === 'image' && (
                          <div 
                            className="w-full aspect-[21/9] bg-gray-50 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl hover:bg-gray-100 transition-colors group/img cursor-pointer relative overflow-hidden"
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (re) => {
                                    onUpdate({
                                      ...el,
                                      content: re.target?.result as string
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              };
                              input.click();
                            }}
                          >
                            {el.content && el.content.startsWith('data:image') ? (
                              <img src={el.content} alt="Content" className="w-full h-full object-cover" />
                            ) : (
                              <>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                  <Image size={40} className="mb-2 text-gray-300 group-hover/img:text-blue-400 transition-colors" />
                                </motion.div>
                                <span className="text-sm font-medium">Cliquez pour ajouter une image</span>
                                <span className="text-xs mt-1 opacity-60">PNG, JPG, SVG jusqu'à 5MB</span>
                              </>
                            )}
                          </div>
                        )}

                        {el.type === 'button' && (
                          <div className={`flex w-full ${
                            styles.textAlign === 'center' ? 'justify-center' :
                            styles.textAlign === 'right' ? 'justify-end' : 'justify-start'
                          }`}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-8 py-3 rounded-full font-semibold shadow-lg transition-shadow hover:shadow-xl flex items-center gap-2"
                              style={{
                                backgroundColor: styles.backgroundColor || '#2563eb',
                                color: styles.color || '#ffffff'
                              }}
                            >
                              {el.content || 'Cliquez ici'}
                            </motion.button>
                          </div>
                        )}

                        {el.type === 'form' && renderFormBuilder(el)}
                        {el.type === 'chat' && renderChatBuilder(el)}
                        {el.type === 'container' && renderSectionBuilder(el)}

                        {el.type.startsWith('form-') && el.type !== 'form' && renderFormFieldElement(el)}
                        {el.type.startsWith('chat-') && el.type !== 'chat' && renderChatElement(el)}
                        {el.type.startsWith('section-') && el.type !== 'container' && renderSectionElement(el)}
                        {el.type.startsWith('template-') && renderTemplateElement(el)}
                      </div>
                    </motion.div>
                  )}
                </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}