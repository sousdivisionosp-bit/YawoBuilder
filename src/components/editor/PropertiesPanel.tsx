import React from 'react';
import { SiteElement } from '@/types';
import { Button } from '@/components/ui/button';
import { X, AlignLeft, AlignCenter, AlignRight, Type, Palette, Layout, Trash2, Settings, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertiesPanelProps {
  element: SiteElement | null;
  onUpdate: (element: SiteElement) => void;
  onClose: () => void;
  onRemove: (id: string) => void;
  device: 'desktop' | 'tablet' | 'mobile';
}

export default function PropertiesPanel({ element, onUpdate, onClose, onRemove, device }: PropertiesPanelProps) {
  if (!element) return null;

  const handleChange = (field: string, value: any) => {
    onUpdate({
      ...element,
      [field]: value,
    });
  };

  const handleStyleChange = (key: string, value: any) => {
    const styleKey = device === 'tablet' ? 'tabletStyles' : device === 'mobile' ? 'mobileStyles' : 'styles';
    const currentStyles = element[styleKey] || {};

    onUpdate({
      ...element,
      [styleKey]: {
        ...currentStyles,
        [key]: value,
      },
    });
  };

  const getEffectiveStyles = () => {
    const styles = { ...element.styles };
    if (device === 'tablet' && element.tabletStyles) {
      return { ...styles, ...element.tabletStyles };
    }
    if (device === 'mobile' && element.mobileStyles) {
      return { ...styles, ...element.mobileStyles };
    }
    return styles;
  };

  const currentStyles = getEffectiveStyles();

  return (
    <motion.div 
      initial={{ x: 320 }}
      animate={{ x: 0 }}
      exit={{ x: 320 }}
      className="w-80 bg-white border-l border-gray-100 h-full flex flex-col shadow-2xl z-40"
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
            <Settings size={18} />
          </div>
          <h3 className="font-bold text-sm text-gray-900">Propriétés de l'élément</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-gray-400 hover:text-gray-900">
          <X size={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Basic Info */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Type d'élément</span>
          <p className="text-sm font-medium text-gray-900 capitalize flex items-center gap-2">
            <Layout size={14} className="text-gray-400" />
            {element.type}
          </p>
        </div>

        {/* Content Section */}
        {(element.type === 'text' || 
          element.type === 'button' || 
          element.type === 'section-navbar' ||
          element.type.startsWith('form-') ||
          element.type.startsWith('chat-') ||
          element.type.startsWith('section-') || 
          element.type.startsWith('template-')) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-900">
              <Type size={16} />
              <h4 className="text-sm font-bold">
                {element.type === 'button' || element.type === 'form-submit' ? 'Texte du bouton' : 
                 element.type === 'text' ? 'Contenu du texte' : 
                 element.type === 'section-navbar' ? 'Texte du Logo' :
                 element.type.startsWith('form-') ? 'Label / Configuration' :
                 element.type.startsWith('chat-') ? 'Messages / Configuration' :
                 element.type.startsWith('section-') || element.type.startsWith('template-') ? 'Texte principal' : 'Contenu'}
              </h4>
            </div>
            
            {/* Special handling for JSON content elements (Form/Chat) */}
            {(element.type.startsWith('form-') || element.type.startsWith('chat-')) && element.content?.startsWith('{') ? (
              <div className="space-y-4">
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Configuration Avancée (JSON)</p>
                <textarea
                  className="w-full p-3 bg-gray-900 text-green-400 font-mono text-[11px] rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none min-h-[150px] transition-all border border-gray-800"
                  value={element.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                />
                <p className="text-[10px] text-gray-400 italic">Attention : Modifiez le JSON avec précaution pour ne pas casser l'élément.</p>
              </div>
            ) : (
              <input
                type="text"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                placeholder={element.type === 'section-navbar' ? 'Nom de votre marque' : 'Entrez votre texte ici...'}
                value={element.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
              />
            )}

            {(element.type === 'section-navbar' || element.type === 'section-footer') && (
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-gray-900">
                  <Image size={16} />
                  <h4 className="text-sm font-bold">Logo du site</h4>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">URL du Logo</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="https://votre-logo.com/image.png"
                    value={element.styles?.logoUrl || ''}
                    onChange={(e) => handleChange('styles', { ...element.styles, logoUrl: e.target.value })}
                  />
                  <p className="text-[10px] text-gray-400 italic">Laissez vide pour utiliser la première lettre du nom.</p>
                </div>

                {element.type === 'section-navbar' && (
                  <>
                    <div className="flex items-center gap-2 text-gray-900 pt-2">
                      <Layout size={16} />
                      <h4 className="text-sm font-bold">Configuration du Menu</h4>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      Le menu affiche automatiquement toutes les pages de votre site. Vous pouvez les renommer ou les supprimer directement depuis la barre d'outils en haut de l'écran.
                    </p>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-[10px] text-blue-700 font-medium">
                        💡 Astuce : Double-cliquez sur le nom d'une page dans la barre d'outils pour la renommer.
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {(element.type.startsWith('section-') && element.type !== 'section-navbar' || element.type.startsWith('template-')) && (
              <p className="text-[10px] text-gray-400 italic">Astuce : Pour les sections complexes, ce champ modifie généralement le titre principal ou le texte mis en avant.</p>
            )}
          </div>
        )}

        {/* Image Source Section */}
        {element.type === 'image' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-900">
              <Palette size={16} />
              <h4 className="text-sm font-bold">Source de l'image</h4>
            </div>
            <div 
              className="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all overflow-hidden group relative"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (re) => handleChange('content', re.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                };
                input.click();
              }}
            >
              {element.content && element.content.startsWith('data:image') ? (
                <>
                  <img src={element.content} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                    Changer l'image
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <Palette size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-xs text-gray-400 font-medium">Cliquez pour uploader une image</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ou via URL</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                placeholder="https://exemple.com/image.jpg"
                value={element.content && !element.content.startsWith('data:image') ? element.content : ''}
                onChange={(e) => handleChange('content', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Style Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-gray-900">
            <Palette size={16} />
            <h4 className="text-sm font-bold">Apparence</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500">Texte</label>
              <div className="flex items-center gap-2 p-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                <input
                  type="color"
                  className="w-6 h-6 rounded cursor-pointer bg-transparent"
                  value={currentStyles.color || '#000000'}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                />
                <span className="text-[10px] font-mono text-gray-400 uppercase">{currentStyles.color}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500">Taille</label>
              <input
                type="number"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                value={currentStyles.fontSize || '16'}
                onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              />
            </div>
          </div>

          {(element.type === 'button' || element.type === 'container' || element.type.startsWith('section-') || element.type.startsWith('template-')) && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500">Couleur de fond</label>
                <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded-xl">
                  <input
                    type="color"
                    className="w-8 h-8 rounded-lg cursor-pointer border-0"
                    value={currentStyles.backgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  />
                  <span className="text-sm font-mono text-gray-500 uppercase">{currentStyles.backgroundColor || '#FFFFFF'}</span>
                </div>
              </div>

              {(element.type === 'section-hero' || element.type === 'container') && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                      <Layout size={14} /> Image de fond
                    </label>
                    <div 
                      className="w-full h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all overflow-hidden relative group"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (re) => handleStyleChange('backgroundImage', re.target?.result as string);
                            reader.readAsDataURL(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      {currentStyles.backgroundImage ? (
                        <>
                          <img src={currentStyles.backgroundImage} className="w-full h-full object-cover" alt="Background" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                            Changer l'image
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <Palette size={24} className="mx-auto mb-2 text-gray-300" />
                          <p className="text-[10px] text-gray-400 font-medium">Cliquez pour uploader</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {currentStyles.backgroundImage && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-gray-500">Opacité du calque</label>
                        <span className="text-[10px] font-bold text-blue-600">{(currentStyles.backgroundOpacity || 0.5) * 100}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        value={currentStyles.backgroundOpacity || 0.5}
                        onChange={(e) => handleStyleChange('backgroundOpacity', parseFloat(e.target.value))}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500">Alignement</label>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {[
                { id: 'left', icon: <AlignLeft size={16} /> },
                { id: 'center', icon: <AlignCenter size={16} /> },
                { id: 'right', icon: <AlignRight size={16} /> }
              ].map((align) => (
                <button
                  key={align.id}
                  onClick={() => handleStyleChange('textAlign', align.id)}
                  className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${
                    currentStyles.textAlign === align.id 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {align.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-gray-50/30">
        <Button 
          variant="ghost" 
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 flex items-center justify-center gap-2 rounded-xl"
          onClick={() => onRemove(element.id)}
        >
          <Trash2 size={16} />
          Supprimer l'élément
        </Button>
      </div>
    </motion.div>
  );
}
