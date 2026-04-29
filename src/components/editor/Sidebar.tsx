import React, { useState } from 'react';
import { Type, Image, Square, MessageSquare, List, Layout, Plus, Settings, Palette, Eye, ChevronLeft, ChevronRight, CheckSquare, Circle, ChevronDown, Calendar, Star, Send, FileText, Phone, Mail, User, Columns, Grid, Layers, Copy, Maximize, Minimize, Menu, Library, X, Check, Sparkles, Wand2, Rocket } from 'lucide-react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { SitePage, SiteElement } from '@/types';
import { navbarPresets, heroPresets, footerPresets, cardPresets, sidebarPresets, ComponentPreset } from '@/data/componentLibrary';

interface SidebarProps {
  pages?: SitePage[];
  currentPageId?: string;
  onPageChange?: (id: string) => void;
  onUpdatePage?: (pageId: string, elements: SiteElement[]) => void;
  onAddPage?: () => void;
  onAddElement?: (element: SiteElement) => void;
}

const libraryComponents = [
  { type: 'section-navbar', label: 'NavBar', icon: <Menu size={20} />, presets: navbarPresets },
  { type: 'section-hero', label: 'Hero', icon: <Maximize size={20} />, presets: heroPresets },
  { type: 'section-footer', label: 'Footer', icon: <Minimize size={20} />, presets: footerPresets },
  { type: 'section-sidebar', label: 'SideBar', icon: <Layout size={20} />, presets: sidebarPresets },
  { type: 'card', label: 'Cartes', icon: <Square size={20} />, presets: cardPresets },
];

const componentCategories = [
  {
    id: 'ai-generator',
    label: 'Générateur IA',
    icon: <Sparkles size={22} className="text-amber-400" />,
    components: []
  },
  {
    id: 'basic',
    label: 'Basique',
    icon: <Plus size={22} />,
    components: [
      { type: 'text', icon: <Type size={20} />, label: 'Texte' },
      { type: 'image', icon: <Image size={20} />, label: 'Image' },
      { type: 'button', icon: <Square size={20} />, label: 'Bouton' },
    ]
  },
  {
    id: 'form',
    label: 'Formulaire',
    icon: <List size={22} />,
    components: [
      { type: 'form-input-text', icon: <Type size={20} />, label: 'Champ texte' },
      { type: 'form-input-email', icon: <Mail size={20} />, label: 'Email' },
      { type: 'form-input-tel', icon: <Phone size={20} />, label: 'Téléphone' },
      { type: 'form-textarea', icon: <FileText size={20} />, label: 'Zone de texte' },
      { type: 'form-select', icon: <ChevronDown size={20} />, label: 'Liste déroulante' },
      { type: 'form-radio', icon: <Circle size={20} />, label: 'Bouton radio' },
      { type: 'form-checkbox', icon: <CheckSquare size={20} />, label: 'Case à cocher' },
      { type: 'form-date', icon: <Calendar size={20} />, label: 'Date' },
      { type: 'form-rating', icon: <Star size={20} />, label: 'Évaluation' },
      { type: 'form-submit', icon: <Send size={20} />, label: 'Bouton envoi' },
    ]
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: <MessageSquare size={22} />,
    components: [
      { type: 'chat-widget', icon: <MessageSquare size={20} />, label: 'Widget chat' },
      { type: 'chat-bubble', icon: <Square size={20} />, label: 'Bulles de chat' },
      { type: 'chat-quick-replies', icon: <Layers size={20} />, label: 'Réponses rapides' },
      { type: 'chat-welcome', icon: <User size={20} />, label: 'Message bienvenue' },
    ]
  },
  {
    id: 'section',
    label: 'Section',
    icon: <Layout size={22} />,
    components: [
      { type: 'section-container', icon: <Layout size={20} />, label: 'Conteneur' },
      { type: 'section-columns-2', icon: <Columns size={20} />, label: '2 Colonnes' },
      { type: 'section-columns-3', icon: <Grid size={20} />, label: '3 Colonnes' },
      { type: 'section-columns-4', icon: <Grid size={20} />, label: '4 Colonnes' },
      { type: 'section-sidebar', icon: <Layout size={20} />, label: 'Sidebar + Contenu' },
      { type: 'section-hero', icon: <Maximize size={20} />, label: 'Hero' },
      { type: 'section-navbar', icon: <Menu size={20} />, label: 'NavBar' },
      { type: 'section-footer', icon: <Minimize size={20} />, label: 'Footer' },
    ]
  },
  {
    id: 'templates',
    label: 'Modèles',
    icon: <Copy size={22} />,
    components: [
      { type: 'template-hero-cta', icon: <Square size={20} />, label: 'Hero CTA' },
      { type: 'template-features', icon: <Grid size={20} />, label: 'Caractéristiques' },
      { type: 'template-pricing', icon: <List size={20} />, label: 'Tarification' },
      { type: 'template-testimonials', icon: <MessageSquare size={20} />, label: 'Témoignages' },
      { type: 'template-team', icon: <User size={20} />, label: 'Équipe' },
      { type: 'template-contact', icon: <Mail size={20} />, label: 'Contact' },
      { type: 'template-portfolio', icon: <Image size={20} />, label: 'Portfolio' },
      { type: 'template-blog', icon: <FileText size={20} />, label: 'Blog' },
    ]
  },
  {
    id: 'library',
    label: 'Librairie',
    icon: <Library size={22} />,
    components: []
  },
  {
    id: 'advanced',
    label: 'Avancé',
    icon: <Layout size={22} />,
    components: [
      { type: 'form', icon: <List size={20} />, label: 'Formulaire complet' },
      { type: 'chat', icon: <MessageSquare size={20} />, label: 'Chat complet' },
      { type: 'container', icon: <Layout size={20} />, label: 'Section complète' },
    ]
  },
  {
    id: 'style',
    label: 'Style',
    icon: <Palette size={22} />,
    components: []
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: <Settings size={22} />,
    components: []
  }
];

function AIGeneratorSection({ currentPageId, onUpdatePage }: { currentPageId?: string, onUpdatePage?: (id: string, elements: SiteElement[]) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    industry: 'business',
    description: '',
    tone: 'professional',
    includeImages: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const industryImages: Record<string, string[]> = {
    business: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
    ],
    creative: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80'
    ],
    restaurant: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80'
    ],
    tech: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
    ],
    other: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
    ]
  };

  const handleGenerate = async () => {
    if (!formData.name || !formData.description) return;
    
    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    await new Promise(resolve => setTimeout(resolve, 3500));
    
    const images = industryImages[formData.industry] || industryImages.other;
    const heroImage = images[0];
    const secondaryImages = images.slice(1);

    const generatedElements: SiteElement[] = [
      {
        id: 'nav-' + Math.random(),
        type: 'section-navbar',
        content: formData.name,
        styles: { 
          backgroundColor: '#ffffff', 
          color: '#1f2937',
          logoUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${formData.name}&backgroundColor=3b82f6`
        }
      },
      {
        id: 'hero-' + Math.random(),
        type: 'section-hero',
        content: `<h1>${formData.name}</h1><p className="text-xl opacity-90 mt-4">${formData.description}</p>`,
        styles: { 
          backgroundColor: formData.industry === 'creative' ? '#4f46e5' : '#1f2937', 
          color: '#ffffff',
          padding: '120px 20px',
          backgroundImage: formData.includeImages ? heroImage : undefined,
          backgroundOpacity: formData.includeImages ? 0.4 : 1,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      },
      {
        id: 'feat-' + Math.random(),
        type: 'text',
        content: `<div class="py-20 bg-white">
          <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-16">Nos Services d'Excellence</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              ${[1, 2, 3].map(i => `
                <div class="group">
                  ${formData.includeImages ? `
                    <div class="aspect-video rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                      <img src="${secondaryImages[i % secondaryImages.length] || images[0]}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ` : ''}
                  <h3 class="text-xl font-bold mb-3">Service Premium ${i}</h3>
                  <p class="text-gray-600 leading-relaxed">Une solution innovante et sur-mesure pour répondre à tous vos besoins en ${formData.industry}.</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>`,
        styles: { backgroundColor: '#ffffff' }
      },
      {
        id: 'footer-' + Math.random(),
        type: 'section-footer',
        content: formData.name,
        styles: { 
          backgroundColor: '#111827', 
          color: '#ffffff',
          logoUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${formData.name}&backgroundColor=3b82f6`
        }
      }
    ];

    if (currentPageId) {
      onUpdatePage?.(currentPageId, generatedElements);
    }
    
    setIsGenerating(false);
    setProgress(0);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-amber-400" size={20} />
          <h4 className="text-sm font-bold text-white text-balance">Générateur de site IA</h4>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          L'IA sélectionne désormais automatiquement des images **HD gratuites** adaptées à votre secteur.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Nom de l'entreprise / Projet</label>
          <input 
            type="text" 
            placeholder="Ex: Ma Super Agence"
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Secteur d'activité</label>
          <select 
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none transition-colors appearance-none cursor-pointer"
            value={formData.industry}
            onChange={(e) => setFormData({...formData, industry: e.target.value})}
          >
            <option value="business">Business & Services</option>
            <option value="creative">Créatif & Portfolio</option>
            <option value="restaurant">Restaurant & Food</option>
            <option value="tech">Tech & SaaS</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Description de votre activité</label>
          <textarea 
            rows={4}
            placeholder="Que faites-vous ? Quels sont vos points forts ?"
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none transition-colors resize-none"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] border border-white/5">
          <div className="flex items-center gap-2">
            <Image size={16} className="text-blue-400" />
            <span className="text-xs font-medium text-gray-300">Images HD modernes</span>
          </div>
          <button 
            onClick={() => setFormData({...formData, includeImages: !formData.includeImages})}
            className={`w-10 h-5 rounded-full transition-colors relative ${formData.includeImages ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.includeImages ? 'right-1' : 'left-1'}`} />
          </button>
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Ton de la communication</label>
          <div className="grid grid-cols-2 gap-2">
            {['Professionnel', 'Créatif', 'Amical', 'Minimaliste'].map((tone) => (
              <button
                key={tone}
                onClick={() => setFormData({...formData, tone: tone.toLowerCase()})}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  formData.tone === tone.toLowerCase()
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-[#1a1a1a] border-white/5 text-gray-400 hover:border-white/10'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isGenerating || !formData.name || !formData.description}
          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
            isGenerating || !formData.name || !formData.description
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/20'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Génération en cours... {progress}%</span>
            </>
          ) : (
            <>
              <Wand2 size={18} />
              <span>Générer mon site web</span>
            </>
          )}
        </button>

        {isGenerating && (
          <div className="w-full bg-white/5 rounded-full h-1 mt-4 overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-white/5">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Exemples de prompts</h4>
        <div className="space-y-2">
          <button 
            onClick={() => setFormData({
              ...formData,
              name: "EcoGarden",
              industry: "business",
              description: "Services de jardinage écologique et paysagisme durable à domicile.",
              tone: "amical"
            })}
            className="w-full p-2.5 rounded-lg bg-[#1a1a1a] border border-white/5 text-left hover:border-blue-500/50 transition-colors group"
          >
            <p className="text-[10px] font-bold text-blue-400 mb-1">Jardinage</p>
            <p className="text-[11px] text-gray-400 group-hover:text-gray-300 leading-tight">"Services de jardinage écologique et paysagisme..."</p>
          </button>
          <button 
            onClick={() => setFormData({
              ...formData,
              name: "Studio Prism",
              industry: "creative",
              description: "Agence de design graphique spécialisée dans l'identité visuelle et le branding.",
              tone: "créatif"
            })}
            className="w-full p-2.5 rounded-lg bg-[#1a1a1a] border border-white/5 text-left hover:border-blue-500/50 transition-colors group"
          >
            <p className="text-[10px] font-bold text-purple-400 mb-1">Design</p>
            <p className="text-[11px] text-gray-400 group-hover:text-gray-300 leading-tight">"Agence de design graphique spécialisée dans l'identité..."</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function LibrarySection({ onAddElement }: { onAddElement?: (element: SiteElement) => void }) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [presets, setPresets] = useState<ComponentPreset[]>([]);

  const handleComponentClick = (comp: typeof libraryComponents[0]) => {
    setSelectedComponent(comp.type);
    setPresets(comp.presets);
    setShowPresetModal(true);
    setSelectedPreset(null);
  };

  const handlePresetClick = (preset: ComponentPreset) => {
    setSelectedPreset(preset.id);
    const newElement: SiteElement = {
      ...preset.element,
      id: Math.random().toString(36).substr(2, 9),
    };
    onAddElement?.(newElement);
    setShowPresetModal(false);
    setSelectedComponent(null);
  };

  const getPresetPreview = (preset: ComponentPreset) => {
    const bgColor = preset.element.styles.backgroundColor || '#ffffff';
    const textColor = preset.element.styles.color || '#000000';
    
    if (preset.element.type === 'section-navbar') {
      return (
        <div className="h-12 rounded-lg flex items-center px-3 gap-2" style={{ backgroundColor: bgColor, color: textColor }}>
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">L</div>
          <div className="flex gap-2 ml-auto">
            <div className="w-12 h-2 rounded" style={{ backgroundColor: textColor, opacity: 0.5 }}></div>
            <div className="w-12 h-2 rounded" style={{ backgroundColor: textColor, opacity: 0.5 }}></div>
          </div>
        </div>
      );
    }
    
    if (preset.element.type === 'section-hero') {
      return (
        <div className="h-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: bgColor, color: textColor }}>
          <span className="text-xs font-bold opacity-80">{preset.element.content || 'Hero'}</span>
        </div>
      );
    }
    
    if (preset.element.type === 'section-footer') {
      return (
        <div className="h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: bgColor, color: textColor }}>
          <span className="text-xs opacity-70">© 2026</span>
        </div>
      );
    }
    
    if (preset.element.type === 'section-sidebar') {
      return (
        <div className="h-24 rounded-lg flex" style={{ backgroundColor: bgColor, color: textColor }}>
          <div className="w-2/5 p-2 flex flex-col gap-1">
            <div className="w-full h-2 rounded" style={{ backgroundColor: textColor, opacity: 0.3 }}></div>
            <div className="w-3/4 h-2 rounded" style={{ backgroundColor: textColor, opacity: 0.3 }}></div>
            <div className="w-1/2 h-2 rounded" style={{ backgroundColor: textColor, opacity: 0.3 }}></div>
          </div>
        </div>
      );
    }
    
    if (preset.element.type === 'container') {
      return (
        <div className="h-16 rounded-lg p-2" style={{ backgroundColor: bgColor }}>
          <div className="w-3/4 h-3 rounded mb-1" style={{ backgroundColor: textColor, opacity: 0.8 }}></div>
          <div className="w-full h-2 rounded" style={{ backgroundColor: textColor, opacity: 0.3 }}></div>
        </div>
      );
    }
    
    return (
      <div className="h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: bgColor, color: textColor }}>
        <span className="text-xs">{preset.name}</span>
      </div>
    );
  };

  if (showPresetModal && presets.length > 0) {
    return (
      <div className="animate-fadeIn">
        <button 
          onClick={() => { setShowPresetModal(false); setSelectedComponent(null); }}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm transition-colors"
        >
          <ChevronLeft size={16} /> Retour aux composants
        </button>
        
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          {libraryComponents.find(c => c.type === selectedComponent)?.label} - Styles
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {presets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              className={`relative p-3 rounded-xl transition-all text-left cursor-pointer ${
                selectedPreset === preset.id
                  ? 'bg-blue-600 ring-2 ring-blue-400'
                  : 'bg-[#2a2a2a] hover:bg-[#333]'
              }`}
            >
              {selectedPreset === preset.id && (
                <div className="absolute top-2 right-2">
                  <Check size={14} className="text-white" />
                </div>
              )}
              <div className="mb-3 pointer-events-none">
                {getPresetPreview(preset)}
              </div>
              <h5 className="text-xs font-bold text-white mb-1">{preset.name}</h5>
              <p className="text-xs text-gray-400 leading-tight">{preset.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Composants disponibles</h4>
      <Droppable droppableId="library-categories" isDropDisabled={true}>
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className="grid grid-cols-2 gap-3"
          >
            {libraryComponents.map((comp, index) => (
              <button
                key={comp.type}
                onClick={() => handleComponentClick(comp)}
                className="p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#333] transition-all flex flex-col items-center gap-3 group"
              >
                <div className="p-3 rounded-lg bg-[#1a1a1a] group-hover:bg-[#222] transition-colors">
                  {comp.icon}
                </div>
                <div className="text-center">
                  <h5 className="text-sm font-bold text-white mb-1">{comp.label}</h5>
                  <p className="text-xs text-gray-400">{comp.presets.length} styles</p>
                </div>
              </button>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <div className="mt-8 pt-6 border-t border-white/5">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Comment utiliser</h4>
        <div className="space-y-3 text-xs text-gray-400">
          <p>1. Sélectionnez un composant ci-dessus</p>
          <p>2. Choisissez un style prédéfini</p>
          <p>3. Le composant sera ajouté à votre page</p>
          <p>4. Modifiez-le via le panneau latéral</p>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ pages = [], currentPageId = '', onPageChange, onUpdatePage, onAddPage, onAddElement }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState('ai-generator');
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex h-full bg-[#1a1a1a] text-white">
      <div className="w-16 flex flex-col items-center py-6 gap-6 border-r border-white/10 shrink-0">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">
          Y
        </div>
        
        {componentCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setIsExpanded(true);
            }}
            className={`p-3 rounded-xl transition-all ${
              activeCategory === cat.id && isExpanded
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title={cat.label}
          >
            {cat.icon}
          </button>
        ))}

        <div className="mt-auto flex flex-col gap-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-3 text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-[#242424] overflow-hidden border-r border-white/5 flex flex-col"
          >
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
                {componentCategories.find(c => c.id === activeCategory)?.label}
              </h3>

              {activeCategory === 'ai-generator' && (
                <AIGeneratorSection currentPageId={currentPageId} onUpdatePage={onUpdatePage} />
              )}

              {activeCategory !== 'ai-generator' && activeCategory !== 'library' && (
                <Droppable droppableId="sidebar" isDropDisabled={true}>
                  {(provided) => (
                    <div 
                      {...provided.droppableProps} 
                      ref={provided.innerRef}
                      className="grid grid-cols-2 gap-3"
                    >
                      {componentCategories.find(c => c.id === activeCategory)?.components.map((comp, index) => (
                        <Draggable key={comp.type} draggableId={comp.type} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all cursor-grab group ${
                                snapshot.isDragging 
                                  ? 'bg-blue-600 text-white shadow-2xl scale-105' 
                                  : 'bg-[#2a2a2a] hover:bg-[#333] text-gray-300'
                              }`}
                            >
                              <div className={`p-3 rounded-lg ${snapshot.isDragging ? 'bg-white/20' : 'bg-[#1a1a1a] group-hover:bg-[#222]'}`}>
                                {comp.icon}
                              </div>
                              <span className="text-xs font-medium text-center">{comp.label}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}

              {activeCategory === 'basic' && (
                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Pages du site</h4>
                    <button 
                      onClick={onAddPage}
                      className="p-1 hover:bg-white/10 rounded-md text-blue-400 transition-colors"
                      title="Ajouter une page"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {pages.map(page => (
                      <button 
                        key={page.id}
                        onClick={() => onPageChange?.(page.id)}
                        className={`w-full text-left p-3 rounded-lg text-sm font-medium border transition-all ${
                          currentPageId === page.id 
                            ? 'bg-blue-600/10 text-blue-400 border-blue-600/20' 
                            : 'hover:bg-white/5 text-gray-400 border-transparent'
                        }`}
                      >
                        {page.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeCategory === 'templates' && (
                <div className="mt-8 pt-8 border-t border-white/5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Catégories de modèles</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 rounded-lg bg-blue-600/10 text-blue-400 text-xs font-medium border border-blue-600/20 text-center">
                      Business
                    </button>
                    <button className="p-3 rounded-lg hover:bg-white/5 text-gray-400 text-xs font-medium transition-colors text-center">
                      Portfolio
                    </button>
                    <button className="p-3 rounded-lg hover:bg-white/5 text-gray-400 text-xs font-medium transition-colors text-center">
                      E-commerce
                    </button>
                    <button className="p-3 rounded-lg hover:bg-white/5 text-gray-400 text-xs font-medium transition-colors text-center">
                      Blog
                    </button>
                  </div>
                </div>
              )}

              {activeCategory === 'library' && (
                <LibrarySection onAddElement={onAddElement} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}