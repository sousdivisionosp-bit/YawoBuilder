import { SiteElement } from '@/types';

export type ComponentPreset = {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  element: SiteElement;
};

export type ComponentLibrary = {
  [key: string]: ComponentPreset[];
};

export const navbarPresets: ComponentPreset[] = [
  {
    id: 'navbar-default',
    name: 'Classique',
    description: 'Barre de navigation simple avec logo et liens',
    element: {
      id: 'nav-preset-1',
      type: 'section-navbar',
      content: 'MonLogo',
      styles: { backgroundColor: '#ffffff', color: '#1f2937' }
    }
  },
  {
    id: 'navbar-dark',
    name: 'Sombre',
    description: 'Navigation sombre élégante',
    element: {
      id: 'nav-preset-2',
      type: 'section-navbar',
      content: 'MonLogo',
      styles: { backgroundColor: '#111827', color: '#ffffff' }
    }
  },
  {
    id: 'navbar-gradient',
    name: 'Dégradé',
    description: 'Navigation avec dégradé bleu',
    element: {
      id: 'nav-preset-3',
      type: 'section-navbar',
      content: 'MonLogo',
      styles: { backgroundColor: '#3b82f6', color: '#ffffff' }
    }
  },
  {
    id: 'navbar-minimal',
    name: 'Minimaliste',
    description: 'Design épuré et moderne',
    element: {
      id: 'nav-preset-4',
      type: 'section-navbar',
      content: 'BRAND',
      styles: { backgroundColor: '#f9fafb', color: '#111827' }
    }
  },
  {
    id: 'navbar-bold',
    name: 'Audacieux',
    description: 'Style audacieux avec fond coloré',
    element: {
      id: 'nav-preset-5',
      type: 'section-navbar',
      content: 'BRAND',
      styles: { backgroundColor: '#8b5cf6', color: '#ffffff' }
    }
  },
  {
    id: 'navbar-corporate',
    name: 'Corporate',
    description: 'Style professionnel pour entreprises',
    element: {
      id: 'nav-preset-6',
      type: 'section-navbar',
      content: 'CorpSuite',
      styles: { backgroundColor: '#1e40af', color: '#ffffff' }
    }
  },
  {
    id: 'navbar-warm',
    name: 'Chaud',
    description: 'Ton chaleureux et accueillant',
    element: {
      id: 'nav-preset-7',
      type: 'section-navbar',
      content: 'Bienvenue',
      styles: { backgroundColor: '#ea580c', color: '#ffffff' }
    }
  },
  {
    id: 'navbar-nature',
    name: 'Nature',
    description: 'Couleurs naturelles et apaisantes',
    element: {
      id: 'nav-preset-8',
      type: 'section-navbar',
      content: 'EcoLife',
      styles: { backgroundColor: '#16a34a', color: '#ffffff' }
    }
  }
];

export const heroPresets: ComponentPreset[] = [
  {
    id: 'hero-center-dark',
    name: 'Hero Sombre Central',
    description: 'Grande image de fond sombre avec texte centré',
    element: {
      id: 'hero-preset-1',
      type: 'section-hero',
      content: 'Bienvenue sur notre site',
      styles: {
        backgroundColor: '#111827',
        color: '#ffffff',
        backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80',
        backgroundOpacity: 0.7
      }
    }
  },
  {
    id: 'hero-split-light',
    name: 'Hero Clair Divisé',
    description: 'Design divisée avec image à droite',
    element: {
      id: 'hero-preset-2',
      type: 'section-hero',
      content: 'Propulsez votre activité',
      styles: {
        backgroundColor: '#ffffff',
        color: '#111827',
        backgroundImage: '',
        backgroundOpacity: 0
      }
    }
  },
  {
    id: 'hero-gradient',
    name: 'Hero Dégradé',
    description: 'Fond avec dégradé coloré',
    element: {
      id: 'hero-preset-3',
      type: 'section-hero',
      content: 'Créez l\'avenir',
      styles: {
        backgroundColor: '#667eea',
        color: '#ffffff',
        backgroundImage: '',
        backgroundOpacity: 0
      }
    }
  },
  {
    id: 'hero-minimal',
    name: 'Hero Minimaliste',
    description: 'Design épuré sans image de fond',
    element: {
      id: 'hero-preset-4',
      type: 'section-hero',
      content: 'Simple et efficace',
      styles: {
        backgroundColor: '#f9fafb',
        color: '#111827',
        backgroundImage: '',
        backgroundOpacity: 0
      }
    }
  },
  {
    id: 'hero-bold',
    name: 'Hero Audacieux',
    description: 'Style percutant avec couleurs vives',
    element: {
      id: 'hero-preset-5',
      type: 'section-hero',
      content: 'Osez la différence',
      styles: {
        backgroundColor: '#dc2626',
        color: '#ffffff',
        backgroundImage: '',
        backgroundOpacity: 0
      }
    }
  },
  {
    id: 'hero-professional',
    name: 'Hero Professionnel',
    description: 'Style corporate et raffiné',
    element: {
      id: 'hero-preset-6',
      type: 'section-hero',
      content: 'Excellence professionnelle',
      styles: {
        backgroundColor: '#1e3a8a',
        color: '#ffffff',
        backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
        backgroundOpacity: 0.8
      }
    }
  },
  {
    id: 'hero-creative',
    name: 'Hero Créatif',
    description: 'Design coloré pour esprits créatifs',
    element: {
      id: 'hero-preset-7',
      type: 'section-hero',
      content: 'Libérez votre créativité',
      styles: {
        backgroundColor: '#7c3aed',
        color: '#ffffff',
        backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80',
        backgroundOpacity: 0.6
      }
    }
  },
  {
    id: 'hero-nature',
    name: 'Hero Nature',
    description: 'Ambiance naturelle et sereine',
    element: {
      id: 'hero-preset-8',
      type: 'section-hero',
      content: 'Harmonie avec la nature',
      styles: {
        backgroundColor: '#16a34a',
        color: '#ffffff',
        backgroundImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80',
        backgroundOpacity: 0.5
      }
    }
  }
];

export const footerPresets: ComponentPreset[] = [
  {
    id: 'footer-dark',
    name: 'Footer Classique',
    description: 'Pied de page sombre simple',
    element: {
      id: 'footer-preset-1',
      type: 'section-footer',
      content: '© 2026 Mon Site. Tous droits réservés.',
      styles: { backgroundColor: '#111827', color: '#ffffff' }
    }
  },
  {
    id: 'footer-light',
    name: 'Footer Clair',
    description: 'Pied de page clair et discret',
    element: {
      id: 'footer-preset-2',
      type: 'section-footer',
      content: '© 2026 Mon Site. Tous droits réservés.',
      styles: { backgroundColor: '#f9fafb', color: '#374151' }
    }
  },
  {
    id: 'footer-gradient',
    name: 'Footer Dégradé',
    description: 'Footer avec dégradé coloré',
    element: {
      id: 'footer-preset-3',
      type: 'section-footer',
      content: '© 2026 Mon Site. Tous droits réservés.',
      styles: { backgroundColor: '#3b82f6', color: '#ffffff' }
    }
  },
  {
    id: 'footer-minimal',
    name: 'Footer Minimal',
    description: 'Design épuré et moderne',
    element: {
      id: 'footer-preset-4',
      type: 'section-footer',
      content: 'MonSite © 2026',
      styles: { backgroundColor: '#ffffff', color: '#9ca3af' }
    }
  },
  {
    id: 'footer-bold',
    name: 'Footer Audacieux',
    description: 'Style audacieux et coloré',
    element: {
      id: 'footer-preset-5',
      type: 'section-footer',
      content: '© 2026 BRAND. Créé avec passion.',
      styles: { backgroundColor: '#8b5cf6', color: '#ffffff' }
    }
  },
  {
    id: 'footer-corporate',
    name: 'Footer Corporate',
    description: 'Style professionnel',
    element: {
      id: 'footer-preset-6',
      type: 'section-footer',
      content: '© 2026 CorpSuite. Excellence en action.',
      styles: { backgroundColor: '#1e40af', color: '#ffffff' }
    }
  },
  {
    id: 'footer-warm',
    name: 'Footer Chaleureux',
    description: 'Ton chaleureux et accueillant',
    element: {
      id: 'footer-preset-7',
      type: 'section-footer',
      content: '© 2026 Bienvenue. À bientôt !',
      styles: { backgroundColor: '#ea580c', color: '#ffffff' }
    }
  },
  {
    id: 'footer-nature',
    name: 'Footer Nature',
    description: 'Ambiance naturelle',
    element: {
      id: 'footer-preset-8',
      type: 'section-footer',
      content: '© 2026 EcoLife. Respectons notre planète.',
      styles: { backgroundColor: '#16a34a', color: '#ffffff' }
    }
  }
];

export const cardPresets: ComponentPreset[] = [
  {
    id: 'card-default',
    name: 'Carte Simple',
    description: 'Carte basique avec ombre légère',
    element: {
      id: 'card-preset-1',
      type: 'container',
      content: '<h3 class="font-bold text-lg">Titre de la carte</h3><p class="text-gray-600 mt-2">Description de la carte avec quelques détails.</p>',
      styles: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }
    }
  },
  {
    id: 'card-border',
    name: 'Carte Bordée',
    description: 'Carte avec bordure colorée',
    element: {
      id: 'card-preset-2',
      type: 'container',
      content: '<h3 class="font-bold text-lg">Titre de la carte</h3><p class="text-gray-600 mt-2">Description de la carte avec quelques détails.</p>',
      styles: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        borderLeft: '4px solid #3b82f6'
      }
    }
  },
  {
    id: 'card-gradient',
    name: 'Carte Dégradé',
    description: 'Carte avec fond dégradé',
    element: {
      id: 'card-preset-3',
      type: 'container',
      content: '<h3 class="font-bold text-lg text-white">Titre de la carte</h3><p class="text-white/80 mt-2">Description de la carte.</p>',
      styles: {
        backgroundColor: '#667eea',
        borderRadius: '16px',
        padding: '28px'
      }
    }
  },
  {
    id: 'card-dark',
    name: 'Carte Sombre',
    description: 'Carte avec fond sombre',
    element: {
      id: 'card-preset-4',
      type: 'container',
      content: '<h3 class="font-bold text-lg text-white">Titre de la carte</h3><p class="text-gray-300 mt-2">Description de la carte.</p>',
      styles: {
        backgroundColor: '#1f2937',
        borderRadius: '12px',
        padding: '24px'
      }
    }
  },
  {
    id: 'card-minimal',
    name: 'Carte Minimale',
    description: 'Design épuré sans ombre',
    element: {
      id: 'card-preset-5',
      type: 'container',
      content: '<h3 class="font-bold text-gray-900">Titre</h3><p class="text-gray-500 mt-1">Description simple.</p>',
      styles: {
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        padding: '16px',
        border: '1px solid #e5e7eb'
      }
    }
  },
  {
    id: 'card-highlight',
    name: 'Carte Mise en Avant',
    description: 'Carte avec accent coloré',
    element: {
      id: 'card-preset-6',
      type: 'container',
      content: '<h3 class="font-bold text-lg">Titre Premium</h3><p class="text-gray-600 mt-2">Description exclusive.</p>',
      styles: {
        backgroundColor: '#fef3c7',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #fbbf24'
      }
    }
  },
  {
    id: 'card-elegant',
    name: 'Carte Élégante',
    description: 'Style raffiné et sophistiqué',
    element: {
      id: 'card-preset-7',
      type: 'container',
      content: '<h3 class="font-bold text-lg text-gray-900">Titre de prestige</h3><p class="text-gray-600 mt-2">Une description élégante.</p>',
      styles: {
        backgroundColor: '#fdf4ff',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
      }
    }
  },
  {
    id: 'card-modern',
    name: 'Carte Moderne',
    description: 'Design contemporain',
    element: {
      id: 'card-preset-8',
      type: 'container',
      content: '<h3 class="font-bold text-white text-lg">Moderne</h3><p class="text-white/70 mt-2">Design du futur.</p>',
      styles: {
        backgroundColor: '#111827',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)'
      }
    }
  }
];

export const sidebarPresets: ComponentPreset[] = [
  {
    id: 'sidebar-default',
    name: 'Sidebar Classique',
    description: 'Barre latérale sombre avec liens',
    element: {
      id: 'sidebar-preset-1',
      type: 'section-sidebar',
      content: JSON.stringify({ title: 'Navigation', links: ['Accueil', 'Services', 'Contact'] }),
      styles: {
        backgroundColor: '#1f2937',
        color: '#ffffff',
        width: '280px'
      }
    }
  },
  {
    id: 'sidebar-light',
    name: 'Sidebar Clair',
    description: 'Barre latérale claire et épurée',
    element: {
      id: 'sidebar-preset-2',
      type: 'section-sidebar',
      content: JSON.stringify({ title: 'Menu', links: ['Accueil', 'À propos', 'Services'] }),
      styles: {
        backgroundColor: '#f9fafb',
        color: '#374151',
        width: '260px'
      }
    }
  },
  {
    id: 'sidebar-gradient',
    name: 'Sidebar Dégradé',
    description: 'Sidebar avec dégradé violet',
    element: {
      id: 'sidebar-preset-3',
      type: 'section-sidebar',
      content: JSON.stringify({ title: 'Sections', links: ['Hero', 'Features', 'Pricing'] }),
      styles: {
        backgroundColor: '#7c3aed',
        color: '#ffffff',
        width: '300px'
      }
    }
  },
  {
    id: 'sidebar-blue',
    name: 'Sidebar Corporate',
    description: 'Style professionnel bleu',
    element: {
      id: 'sidebar-preset-4',
      type: 'section-sidebar',
      content: JSON.stringify({ title: 'Corporate', links: ['Dashboard', 'Rapports', 'Équipe'] }),
      styles: {
        backgroundColor: '#1e40af',
        color: '#ffffff',
        width: '280px'
      }
    }
  },
  {
    id: 'sidebar-minimal',
    name: 'Sidebar Minimale',
    description: 'Design minimaliste',
    element: {
      id: 'sidebar-preset-5',
      type: 'section-sidebar',
      content: JSON.stringify({ title: 'M', links: ['Home', 'Work', 'Contact'] }),
      styles: {
        backgroundColor: '#ffffff',
        color: '#6b7280',
        width: '200px',
        borderRight: '1px solid #e5e7eb'
      }
    }
  },
  {
    id: 'sidebar-bold',
    name: 'Sidebar Audacieuse',
    description: 'Style audacieux avec couleur vive',
    element: {
      id: 'sidebar-preset-6',
      type: 'section-sidebar',
      content: JSON.stringify({ title: 'Explore', links: ['Discover', 'Create', 'Share'] }),
      styles: {
        backgroundColor: '#dc2626',
        color: '#ffffff',
        width: '280px'
      }
    }
  },
  {
    id: 'sidebar-nature',
    name: 'Sidebar Nature',
    description: 'Ambiance naturelle et verte',
    element: {
      id: 'sidebar-preset-7',
      type: 'section-sidebar',
      content: JSON.stringify({ title: 'Green', links: ['Plants', 'Garden', 'Eco'] }),
      styles: {
        backgroundColor: '#16a34a',
        color: '#ffffff',
        width: '260px'
      }
    }
  },
  {
    id: 'sidebar-warm',
    name: 'Sidebar Chaleureuse',
    description: 'Ton chaleureux orange',
    element: {
      id: 'sidebar-preset-8',
      type: 'section-sidebar',
      content: JSON.stringify({ title: 'Welcome', links: ['Start', 'Learn', 'Grow'] }),
      styles: {
        backgroundColor: '#ea580c',
        color: '#ffffff',
        width: '280px'
      }
    }
  }
];

export const componentLibrary: ComponentLibrary = {
  'section-navbar': navbarPresets,
  'section-hero': heroPresets,
  'section-footer': footerPresets,
  'section-sidebar': sidebarPresets,
  'card': cardPresets
};

export const getPresetsForType = (type: string): ComponentPreset[] => {
  if (type === 'container') return cardPresets;
  return componentLibrary[type] || [];
};

export const getPresetById = (type: string, presetId: string): ComponentPreset | undefined => {
  const presets = getPresetsForType(type);
  return presets.find(p => p.id === presetId);
};
