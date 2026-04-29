import { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'saas-modern',
    name: 'SaaS Ultra-Moderne',
    category: 'Business',
    description: 'Une landing page complète pour votre startup avec Hero, Tarifs et Contact.',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    pages: [
      {
        id: 'home',
        name: 'Accueil',
        slug: '/',
        elements: [
          { id: 'nav-1', type: 'section-navbar', content: 'SaaS Ultra', styles: { backgroundColor: '#ffffff', color: '#1f2937' } },
          {
            id: 'hero-1',
            type: 'section-hero',
            content: 'Simplifiez votre workflow avec l\'IA de pointe',
            styles: { 
              backgroundColor: '#111827', 
              color: '#ffffff',
              backgroundImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
              backgroundOpacity: 0.8
            },
          },
          {
            id: 'features-1',
            type: 'template-features',
            content: JSON.stringify([
              { title: 'Automatisation', desc: 'Gagnez 10h par semaine sur vos tâches répétitives.' },
              { title: 'Analyses Pro', desc: 'Visualisez vos données en temps réel avec nos dashboards.' },
              { title: 'Sécurité Cloud', desc: 'Vos données sont protégées par un chiffrement de niveau bancaire.' }
            ]),
            styles: { backgroundColor: '#f9fafb' },
          },
          {
            id: 'stats-1',
            type: 'text',
            content: '<div class="grid grid-cols-3 gap-8 text-center py-20 bg-white"><div className="p-4"><div class="text-4xl font-black text-blue-600">99.9%</div><div class="text-gray-500 uppercase text-xs font-bold mt-2">Uptime</div></div><div className="p-4"><div class="text-4xl font-black text-blue-600">25k+</div><div class="text-gray-500 uppercase text-xs font-bold mt-2">Clients</div></div><div className="p-4"><div class="text-4xl font-black text-blue-600">150+</div><div class="text-gray-500 uppercase text-xs font-bold mt-2">Intégrations</div></div></div>',
            styles: { backgroundColor: '#ffffff' }
          },
          { id: 'footer-1', type: 'section-footer', content: '© 2026 SaaS Ultra Modern. Propulsé par Yawo.', styles: { backgroundColor: '#111827', color: '#ffffff' } }
        ]
      },
      {
        id: 'pricing-page',
        name: 'Tarifs',
        slug: '/tarifs',
        elements: [
          { id: 'nav-pricing', type: 'section-navbar', content: 'SaaS Ultra', styles: { backgroundColor: '#ffffff' } },
          { id: 'pricing-hero', type: 'section-hero', content: 'Choisissez le plan qui vous correspond', styles: { backgroundColor: '#f3f4f6', color: '#111827' } },
          {
            id: 'pricing-table',
            type: 'template-pricing',
            content: JSON.stringify([
              { name: 'Starter', price: '0€', features: ['3 Projets', 'Analyses de base', 'Support Email'] },
              { name: 'Pro', price: '29€', features: ['Projets illimités', 'Analyses avancées', 'Support 24/7'], recommended: true },
              { name: 'Enterprise', price: '99€', features: ['SLA garanti', 'Gestionnaire dédié', 'Sécurité avancée'] }
            ]),
            styles: { backgroundColor: '#ffffff' },
          },
          { id: 'footer-pricing', type: 'section-footer', content: '© 2026 SaaS Ultra Modern.', styles: { backgroundColor: '#111827', color: '#ffffff' } }
        ]
      },
      {
        id: 'contact-page',
        name: 'Contact',
        slug: '/contact',
        elements: [
          { id: 'nav-contact-saas', type: 'section-navbar', content: 'SaaS Ultra', styles: { backgroundColor: '#ffffff' } },
          { id: 'hero-contact-saas', type: 'section-hero', content: 'Contactez notre équipe commerciale', styles: { backgroundColor: '#111827', color: '#ffffff' } },
          { id: 'form-contact-saas', type: 'template-contact', content: '{"title": "Envoyez-nous un message", "subtitle": "Réponse garantie sous 24h"}', styles: { backgroundColor: '#ffffff' } },
          { id: 'footer-contact-saas', type: 'section-footer', content: '© 2026 SaaS Ultra Modern.', styles: { backgroundColor: '#111827', color: '#ffffff' } }
        ]
      }
    ]
  },
  {
    id: 'restaurant-deluxe',
    name: 'Restaurant Gourmet',
    category: 'Gastronomie',
    description: 'Un design élégant pour les restaurants, cafés et bistrots avec menu intégré.',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    pages: [
      {
        id: 'home',
        name: 'Accueil',
        slug: '/',
        elements: [
          { id: 'nav-rest', type: 'section-navbar', content: 'Gourmet', styles: { backgroundColor: '#000000', color: '#ffffff' } },
          {
            id: 'hero-rest',
            type: 'section-hero',
            content: 'L\'Art de la Gastronomie à votre table',
            styles: { 
              backgroundColor: '#000000', 
              color: '#ffffff',
              backgroundImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=80',
              backgroundOpacity: 0.6
            },
          },
          {
            id: 'menu-preview',
            type: 'text',
            content: '<div class="py-20 px-10 bg-white text-center"><h2 class="text-3xl font-serif mb-10">Nos Incontournables</h2><div class="grid grid-cols-2 gap-10 max-w-4xl mx-auto text-left"><div><h4 class="font-bold border-b pb-2 mb-2">Filet de Boeuf <span class="float-right text-gray-500">35€</span></h4><p class="text-sm text-gray-500 italic">Accompagné de sa purée truffée et légumes de saison.</p></div><div><h4 class="font-bold border-b pb-2 mb-2">Saumon Grillé <span class="float-right text-gray-500">28€</span></h4><p class="text-sm text-gray-500 italic">Risotto au safran et émulsion de citron vert.</p></div></div></div>',
            styles: { backgroundColor: '#ffffff' }
          },
          { id: 'footer-rest', type: 'section-footer', content: 'Ouvert du Lundi au Samedi, 12h-23h. Réservation conseillée.', styles: { backgroundColor: '#000000', color: '#ffffff' } }
        ]
      },
      {
        id: 'menu-page',
        name: 'Carte & Menu',
        slug: '/menu',
        elements: [
          { id: 'nav-menu', type: 'section-navbar', content: 'Gourmet', styles: { backgroundColor: '#000000', color: '#ffffff' } },
          { id: 'menu-header', type: 'section-hero', content: 'Notre Carte de Saison', styles: { backgroundColor: '#000000', color: '#ffffff', backgroundImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80', backgroundOpacity: 0.7 } },
          {
            id: 'full-menu',
            type: 'text',
            content: '<div class="max-w-4xl mx-auto py-20 px-6"><div class="mb-16 text-center"><h2 class="text-4xl font-serif mb-4">Entrées</h2><div class="h-1 w-20 bg-yellow-600 mx-auto"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"><div><h4 class="font-bold text-xl border-b pb-2 mb-2 italic font-serif">Escargots de Bourgogne <span class="float-right font-sans text-base">18€</span></h4><p class="text-sm text-gray-500">Beurre persillé et ail rose de Lautrec.</p></div><div><h4 class="font-bold text-xl border-b pb-2 mb-2 italic font-serif">Foie Gras Maison <span class="float-right font-sans text-base">24€</span></h4><p class="text-sm text-gray-500">Chutney de figues et pain brioché toasté.</p></div></div><div class="mb-16 text-center"><h2 class="text-4xl font-serif mb-4">Plats Signature</h2><div class="h-1 w-20 bg-yellow-600 mx-auto"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-12"><div><h4 class="font-bold text-xl border-b pb-2 mb-2 italic font-serif">Magret de Canard <span class="float-right font-sans text-base">32€</span></h4><p class="text-sm text-gray-500">Réduction au miel et épices douces.</p></div><div><h4 class="font-bold text-xl border-b pb-2 mb-2 italic font-serif">Risotto aux Cèpes <span class="float-right font-sans text-base">26€</span></h4><p class="text-sm text-gray-500">Parmesan 24 mois et huile de noisette.</p></div></div></div>',
            styles: { backgroundColor: '#fffcf7' }
          },
          { id: 'footer-menu', type: 'section-footer', content: 'Prix nets, service compris.', styles: { backgroundColor: '#000000', color: '#ffffff' } }
        ]
      },
      {
        id: 'booking-page',
        name: 'Réservation',
        slug: '/reservation',
        elements: [
          { id: 'nav-book', type: 'section-navbar', content: 'Gourmet', styles: { backgroundColor: '#000000', color: '#ffffff' } },
          { id: 'hero-book', type: 'section-hero', content: 'Réservez votre Table', styles: { backgroundColor: '#000000', color: '#ffffff', backgroundImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80', backgroundOpacity: 0.8 } },
          { id: 'form-book', type: 'template-contact', content: '{"title": "Détails de la réservation", "subtitle": "Indiquez le nombre de personnes et l\'horaire souhaité."}', styles: { backgroundColor: '#ffffff' } },
          { id: 'footer-book', type: 'section-footer', content: 'Une confirmation vous sera envoyée par SMS.', styles: { backgroundColor: '#000000', color: '#ffffff' } }
        ]
      }
    ]
  },
  {
    id: 'portfolio-pro',
    name: 'Portfolio Professionnel',
    category: 'Portfolio',
    description: 'Présentez vos projets de manière épurée et professionnelle.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    pages: [
      {
        id: 'home',
        name: 'Accueil',
        slug: '/',
        elements: [
          { id: 'nav-port', type: 'section-navbar', content: 'Alex Dev', styles: { backgroundColor: '#ffffff', color: '#111827' } },
          { id: 'hero-port', type: 'section-hero', content: 'Développeur Full-Stack & Designer UI', styles: { backgroundColor: '#f8fafc', color: '#111827', backgroundImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80', backgroundOpacity: 0.1 } },
          { 
            id: 'port-intro', 
            type: 'text', 
            content: '<div class="max-w-3xl mx-auto py-20 px-6 text-center"><h2 class="text-3xl font-bold mb-6">Je transforme vos idées en expériences numériques exceptionnelles.</h2><p class="text-gray-600 text-lg">Avec plus de 5 ans d\'expérience dans le développement web, j\'accompagne les entreprises dans leur transformation digitale avec des solutions modernes et performantes.</p></div>',
            styles: { backgroundColor: '#ffffff' } 
          },
          { id: 'footer-port', type: 'section-footer', content: '© 2026 Alex Dev. Disponible pour de nouveaux projets.', styles: { backgroundColor: '#ffffff', color: '#111827' } }
        ]
      },
      {
        id: 'projects-page',
        name: 'Projets',
        slug: '/projets',
        elements: [
          { id: 'nav-proj', type: 'section-navbar', content: 'Alex Dev', styles: { backgroundColor: '#ffffff' } },
          { id: 'hero-proj', type: 'section-hero', content: 'Mes Dernières Réalisations', styles: { backgroundColor: '#111827', color: '#ffffff' } },
          { 
            id: 'grid-proj', 
            type: 'text', 
            content: '<div class="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10"> <div class="group cursor-pointer"> <div class="aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden border border-gray-100 shadow-sm"> <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transition-transform group-hover:scale-105" /> </div> <h3 class="font-bold text-xl">Plateforme E-commerce</h3> <p class="text-gray-500 text-sm">Next.js, Stripe, Tailwind CSS</p> </div> <div class="group cursor-pointer"> <div class="aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden border border-gray-100 shadow-sm"> <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover transition-transform group-hover:scale-105" /> </div> <h3 class="font-bold text-xl">Dashboard Analytics</h3> <p class="text-gray-500 text-sm">React, D3.js, Firebase</p> </div> </div>',
            styles: { backgroundColor: '#ffffff' } 
          },
          { id: 'footer-proj', type: 'section-footer', content: 'Fait avec passion à Kinshasa.', styles: { backgroundColor: '#ffffff' } }
        ]
      },
      {
        id: 'contact-page',
        name: 'Contact',
        slug: '/contact',
        elements: [
          { id: 'nav-cont', type: 'section-navbar', content: 'Alex Dev', styles: { backgroundColor: '#ffffff' } },
          { id: 'hero-cont', type: 'section-hero', content: 'Travaillons ensemble', styles: { backgroundColor: '#111827', color: '#ffffff' } },
          { id: 'form-cont', type: 'template-contact', content: '{"title": "Dites-moi tout sur votre projet", "subtitle": "Je reviendrai vers vous sous 48h."}', styles: { backgroundColor: '#ffffff' } },
          { id: 'footer-cont', type: 'section-footer', content: '© 2026 Alex Dev.', styles: { backgroundColor: '#ffffff' } }
        ]
      }
    ]
  },
  {
    id: 'blog-minimal',
    name: 'Blog Minimaliste',
    category: 'Blog',
    description: 'Un espace de lecture pur et élégant pour vos pensées et articles.',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    pages: [
      {
        id: 'home',
        name: 'Accueil',
        slug: '/',
        elements: [
          { id: 'nav-blog', type: 'section-navbar', content: 'Minimalist', styles: { backgroundColor: '#ffffff' } },
          { id: 'hero-blog', type: 'section-hero', content: 'L\'Art de l\'Essentiel', styles: { backgroundColor: '#ffffff', color: '#000000' } },
          { 
            id: 'blog-list', 
            type: 'text', 
            content: '<div class="max-w-2xl mx-auto py-20 px-6"> <article class="mb-16 pb-16 border-b border-gray-100"> <span class="text-blue-600 text-xs font-bold uppercase tracking-widest">Design • 28 Avril 2026</span> <h2 class="text-3xl font-bold mt-2 mb-4 hover:text-blue-600 cursor-pointer">Pourquoi le minimalisme est le futur du web</h2> <p class="text-gray-600 leading-relaxed">Dans un monde saturé d\'informations, la clarté devient une monnaie rare. Découvrez comment épurer vos interfaces pour un impact maximum...</p> </article> <article class="mb-16 pb-16 border-b border-gray-100"> <span class="text-blue-600 text-xs font-bold uppercase tracking-widest">Productivité • 20 Avril 2026</span> <h2 class="text-3xl font-bold mt-2 mb-4 hover:text-blue-600 cursor-pointer">5 habitudes pour rester concentré</h2> <p class="text-gray-600 leading-relaxed">Le silence est parfois le meilleur outil de travail. Retour sur une semaine de digital detox et ses effets sur ma créativité...</p> </article> </div>', 
            styles: { backgroundColor: '#ffffff' } 
          },
          { id: 'footer-blog', type: 'section-footer', content: '© 2026 Minimalist Blog. Pensées & Réflexions.', styles: { backgroundColor: '#f9fafb' } }
        ]
      },
      {
        id: 'about-blog',
        name: 'À Propos',
        slug: '/a-propos',
        elements: [
          { id: 'nav-about-blog', type: 'section-navbar', content: 'Minimalist', styles: { backgroundColor: '#ffffff' } },
          { id: 'hero-about-blog', type: 'section-hero', content: 'Derrière les mots', styles: { backgroundColor: '#f9fafb', color: '#000000' } },
          { 
            id: 'text-about-blog', 
            type: 'text', 
            content: '<div class="max-w-2xl mx-auto py-20 px-6 space-y-8"> <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80" class="w-full rounded-2xl shadow-sm mb-10" /> <p class="text-xl text-gray-800 leading-relaxed italic">"La simplicité est la sophistication suprême." — Léonard de Vinci</p> <p class="text-gray-600 leading-relaxed">Je suis un rédacteur passionné par l\'intersection du design, de la technologie et du bien-être. Ce blog est un espace où j\'explore comment vivre et créer avec plus d\'intention.</p> <p class="text-gray-600 leading-relaxed">Mon objectif est de vous aider à filtrer le bruit numérique pour vous concentrer sur ce qui compte vraiment.</p> </div>', 
            styles: { textAlign: 'center' } 
          },
          { id: 'footer-about-blog', type: 'section-footer', content: 'Merci de faire partie de ce voyage.', styles: { backgroundColor: '#ffffff' } }
        ]
      },
      {
        id: 'contact-blog',
        name: 'Contact',
        slug: '/contact',
        elements: [
          { id: 'nav-cont-blog', type: 'section-navbar', content: 'Minimalist', styles: { backgroundColor: '#ffffff' } },
          { id: 'hero-cont-blog', type: 'section-hero', content: 'Collaborons', styles: { backgroundColor: '#111827', color: '#ffffff' } },
          { id: 'form-cont-blog', type: 'template-contact', content: '{"title": "Une question ou une proposition ?", "subtitle": "Je lis chaque message avec attention."}', styles: { backgroundColor: '#ffffff' } },
          { id: 'footer-cont-blog', type: 'section-footer', content: 'Restons en contact sur les réseaux.', styles: { backgroundColor: '#f9fafb' } }
        ]
      }
    ]
  },
  {
    id: 'agency-creative',
    name: 'Agence Créative',
    category: 'Agence',
    description: 'Design audacieux pour agences de marketing et studios créatifs.',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    pages: [
      {
        id: 'home',
        name: 'Accueil',
        slug: '/',
        elements: [
          { id: 'nav-ag', type: 'section-navbar', content: 'AgenceX', styles: { backgroundColor: '#111827', color: '#ffffff' } },
          { id: 'hero-ag', type: 'section-hero', content: 'Nous créons le futur du digital', styles: { backgroundColor: '#111827', color: '#ffffff', backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80', backgroundOpacity: 0.8 } },
          { 
            id: 'team-ag', 
            type: 'text', 
            content: '<div class="py-24 bg-white"><div class="max-w-6xl mx-auto px-6 text-center"><h2 class="text-4xl font-black mb-16">L\'équipe derrière le succès</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-12"><div class="text-center"><div class="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 overflow-hidden"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover" /></div><h4 class="font-bold text-xl">Jean-Marc Kabulo</h4><p class="text-blue-600 font-medium">Directeur Créatif</p></div><div class="text-center"><div class="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 overflow-hidden"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover" /></div><h4 class="font-bold text-xl">Sarah Lukusa</h4><p class="text-blue-600 font-medium">Lead Developer</p></div><div class="text-center"><div class="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 overflow-hidden"><img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover" /></div><h4 class="font-bold text-xl">Patrick Mbuyi</h4><p class="text-blue-600 font-medium">Expert Marketing</p></div></div></div></div>', 
            styles: { backgroundColor: '#ffffff' } 
          },
          { id: 'footer-ag', type: 'section-footer', content: '© 2026 AgenceX. Kinshasa, RD Congo.', styles: { backgroundColor: '#111827', color: '#ffffff' } }
        ]
      },
      {
        id: 'services-ag',
        name: 'Services',
        slug: '/services',
        elements: [
          { id: 'nav-serv-ag', type: 'section-navbar', content: 'AgenceX', styles: { backgroundColor: '#111827', color: '#ffffff' } },
          { id: 'hero-serv-ag', type: 'section-hero', content: 'Nos Expertises', styles: { backgroundColor: '#f3f4f6', color: '#111827' } },
          { 
            id: 'feat-serv-ag', 
            type: 'text', 
            content: '<div class="py-24 bg-white"><div class="max-w-6xl mx-auto px-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-20"><div><h3 class="text-2xl font-bold mb-4">Stratégie Digitale</h3><p class="text-gray-600 leading-relaxed mb-6">Nous analysons votre marché pour définir la meilleure trajectoire vers vos objectifs. Un plan d\'action clair et mesurable.</p><ul class="space-y-2 text-sm font-bold text-blue-600"><li>• Audit de marque</li><li>• Analyse concurrentielle</li><li>• Plan de croissance</li></ul></div><div><h3 class="text-2xl font-bold mb-4">Design & Expérience</h3><p class="text-gray-600 leading-relaxed mb-6">L\'esthétique au service de la performance. Nous créons des interfaces qui captivent et convertissent vos visiteurs.</p><ul class="space-y-2 text-sm font-bold text-blue-600"><li>• UI/UX Design</li><li>• Branding complet</li><li>• Prototypage rapide</li></ul></div></div></div></div>', 
            styles: { backgroundColor: '#ffffff' } 
          },
          { id: 'footer-serv-ag', type: 'section-footer', content: 'Prêt à décoller ? Contactez-nous.', styles: { backgroundColor: '#111827', color: '#ffffff' } }
        ]
      },
      {
        id: 'contact-ag',
        name: 'Contact',
        slug: '/contact',
        elements: [
          { id: 'nav-cont-ag', type: 'section-navbar', content: 'AgenceX', styles: { backgroundColor: '#111827', color: '#ffffff' } },
          { id: 'hero-cont-ag', type: 'section-hero', content: 'Parlons de votre prochain projet', styles: { backgroundColor: '#111827', color: '#ffffff' } },
          { id: 'form-cont-ag', type: 'template-contact', content: '{"title": "Discutons ensemble", "subtitle": "Nous avons hâte de découvrir vos idées."}', styles: { backgroundColor: '#ffffff' } },
          { id: 'footer-cont-ag', type: 'section-footer', content: '© 2026 AgenceX.', styles: { backgroundColor: '#111827', color: '#ffffff' } }
        ]
      }
    ]
  },
  {
    id: 'event-wedding',
    name: 'Célébration de Mariage',
    category: 'Événement',
    description: 'Un design romantique et informatif pour votre grand jour.',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    pages: [
      {
        id: 'home',
        name: 'Accueil',
        slug: '/',
        elements: [
          { id: 'nav-wed', type: 'section-navbar', content: 'Julie & Marc', styles: { backgroundColor: '#ffffff', color: '#7c2d12' } },
          { id: 'hero-wed', type: 'section-hero', content: 'Nous nous marions !', styles: { backgroundColor: '#fff7ed', color: '#7c2d12', backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80', backgroundOpacity: 0.2 } },
          { 
            id: 'details-wed', 
            type: 'text', 
            content: '<div class="py-20 text-center bg-white"><h2 class="text-3xl font-serif text-orange-900 mb-6">12 Juin 2026</h2><p class="text-lg text-gray-600 max-w-xl mx-auto italic">Nous sommes impatients de célébrer ce moment unique avec vous à la Villa des Oliviers, Kinshasa.</p></div>', 
            styles: { backgroundColor: '#ffffff' } 
          },
          { id: 'footer-wed', type: 'section-footer', content: 'Merci de confirmer votre présence avant le 1er Mai.', styles: { backgroundColor: '#fff7ed' } }
        ]
      },
      {
        id: 'galerie-wed',
        name: 'Galerie',
        slug: '/galerie',
        elements: [
          { id: 'nav-gal-wed', type: 'section-navbar', content: 'Julie & Marc', styles: { backgroundColor: '#ffffff' } },
          { id: 'hero-gal-wed', type: 'section-hero', content: 'Nos Moments Précieux', styles: { backgroundColor: '#fff7ed', color: '#7c2d12' } },
          { 
            id: 'grid-gal-wed', 
            type: 'text', 
            content: '<div class="py-20 px-6 max-w-5xl mx-auto"><div class="grid grid-cols-2 md:grid-cols-3 gap-4"><div class="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" /></div><div class="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" /></div><div class="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" /></div><div class="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1465495910483-0d6749ee9f4a?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" /></div><div class="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" /></div><div class="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" /></div></div></div>', 
            styles: { backgroundColor: '#ffffff' } 
          },
          { id: 'footer-gal-wed', type: 'section-footer', content: 'Une journée inoubliable.', styles: { backgroundColor: '#fff7ed' } }
        ]
      },
      {
        id: 'contact-wed',
        name: 'Infos Pratiques',
        slug: '/infos',
        elements: [
          { id: 'nav-info-wed', type: 'section-navbar', content: 'Julie & Marc', styles: { backgroundColor: '#ffffff' } },
          { id: 'hero-info-wed', type: 'section-hero', content: 'Organisation & RSVP', styles: { backgroundColor: '#7c2d12', color: '#ffffff' } },
          { 
            id: 'details-info-wed', 
            type: 'text', 
            content: '<div class="py-20 max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12"><div><h3 class="text-2xl font-serif text-orange-900 mb-4">Lieu de la cérémonie</h3><p class="text-gray-600 italic">Église Sainte-Anne, Kinshasa<br/>À partir de 14h30</p><h3 class="text-2xl font-serif text-orange-900 mt-10 mb-4">La Réception</h3><p class="text-gray-600 italic">Villa des Oliviers<br/>Cocktail à 18h00, Dîner à 20h00</p></div><div><h3 class="text-2xl font-serif text-orange-900 mb-4">Hébergement</h3><p class="text-gray-600 mb-4">Pour nos invités venant de loin, nous avons négocié des tarifs préférentiels au Pullman Grand Hôtel.</p><p class="text-gray-600 font-bold">Code Promo: WEDJULMARC26</p></div></div>', 
            styles: { backgroundColor: '#ffffff' } 
          },
          { id: 'form-info-wed', type: 'template-contact', content: '{"title": "Confirmez votre présence", "subtitle": "Veuillez nous indiquer toute restriction alimentaire."}', styles: { backgroundColor: '#fff7ed' } },
          { id: 'footer-info-wed', type: 'section-footer', content: 'Julie & Marc, 2026.', styles: { backgroundColor: '#ffffff' } }
        ]
      }
    ]
  }
];
