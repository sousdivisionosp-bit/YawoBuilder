import { SiteElement } from '@/types';

export function generateHTML(elements: SiteElement[]): string {
  let customCSS = '';
  
  const toCSS = (styles: Record<string, any>) => {
    return Object.entries(styles)
      .map(([key, value]) => {
        const cssKey = key.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
        const cssValue = typeof value === 'number' || (!isNaN(Number(value)) && key !== 'opacity') ? `${value}px` : value;
        return `  ${cssKey}: ${cssValue};`;
      })
      .join('\n');
  };

  const elementsHTML = elements.map((el, index) => {
    const elId = `el-${el.id}`;
    
    // Generate CSS for this element
    let elCSS = `#${elId} {\n${toCSS(el.styles)}\n}\n`;
    
    if (el.tabletStyles && Object.keys(el.tabletStyles).length > 0) {
      elCSS += `@media (max-width: 1024px) {\n  #${elId} {\n  ${toCSS(el.tabletStyles)}\n  }\n}\n`;
    }
    
    if (el.mobileStyles && Object.keys(el.mobileStyles).length > 0) {
      elCSS += `@media (max-width: 768px) {\n  #${elId} {\n  ${toCSS(el.mobileStyles)}\n  }\n}\n`;
    }
    
    customCSS += elCSS;

    switch (el.type) {
      case 'text':
        return `<div id="${elId}" class="element-text">${el.content}</div>`;
      case 'button':
        return `
          <div class="mb-8">
            <a href="#" id="${elId}" class="element-button">
              ${el.content}
            </a>
          </div>`;
      case 'image':
        return `<div id="${elId}" class="element-image"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" alt="Image"></div>`;
      case 'form':
        return `
          <form id="${elId}" class="element-form">
            <div class="form-group">
              <label>Nom complet</label>
              <input type="text" placeholder="Votre nom...">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" placeholder="Email...">
            </div>
            <button type="button" class="form-submit">Envoyer le message</button>
          </form>`;
      case 'section-navbar':
        return `
          <nav id="${elId}" class="navbar">
            <div class="navbar-brand">
              ${el.styles?.logoUrl ? `<img src="${el.styles.logoUrl}" class="navbar-logo-img" style="width: 40px; height: 40px; object-fit: contain; border-radius: 8px;">` : `<div class="navbar-logo">${el.content ? el.content.charAt(0).toUpperCase() : 'L'}</div>`}
              <span class="navbar-name">${el.content || 'LOGO'}</span>
            </div>
            <div class="navbar-menu">
              <a href="#">Accueil</a><a href="#">Services</a><a href="#">Contact</a>
            </div>
            <div class="navbar-mobile-toggle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </div>
            <a href="#" class="navbar-cta">Démarrer</a>
          </nav>`;
      case 'section-hero':
        return `
          <section id="${elId}" class="hero">
            <div class="hero-content">
              <h1>${el.content || 'Titre Hero'}</h1>
              <p>Description de votre section hero personnalisable pour tous les écrans.</p>
              <div class="hero-actions">
                <a href="#" class="btn-primary">Commencer</a>
                <a href="#" class="btn-secondary">En savoir plus</a>
              </div>
            </div>
          </section>`;
      case 'section-footer':
        return `
          <footer id="${elId}" class="footer">
            <div class="footer-grid">
              <div class="footer-col">
                <div class="footer-brand">
                  ${el.styles?.logoUrl ? `<img src="${el.styles.logoUrl}" style="width: 32px; height: 32px; object-fit: contain; border-radius: 6px; margin-right: 8px;">` : `<div class="footer-logo">${el.content ? el.content.charAt(0).toUpperCase() : 'L'}</div>`}
                  <span>${el.content || 'LOGO'}</span>
                </div>
                <p>Créez des sites web professionnels sans code.</p>
              </div>
              <div class="footer-col">
                <h4>Navigation</h4>
                <div class="footer-links">
                  <a href="#">Accueil</a><a href="#">Services</a><a href="#">Contact</a>
                </div>
              </div>
              <div class="footer-col">
                <h4>Contact</h4>
                <div class="footer-contact">
                  <p>contact@exemple.com</p>
                  <p>+33 1 23 45 67 89</p>
                </div>
              </div>
            </div>
            <div class="footer-bottom">
              <p>© ${new Date().getFullYear()} Mon Site. Tous droits réservés.</p>
            </div>
          </footer>`;
      default:
        if (el.type.startsWith('section-columns-')) {
          const cols = parseInt(el.type.replace('section-columns-', ''));
          return `<div id="${elId}" class="columns columns-${cols}">${Array(cols).fill(`<div class="column">Colonne</div>`).join('')}</div>`;
        }
        return '';
    }
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Site YawoBuild</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #2563eb; --primary-hover: #1d4ed8; --text-main: #1e293b; --text-muted: #64748b; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; color: var(--text-main); line-height: 1.6; background: #ffffff; overflow-x: hidden; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Typography */
    h1 { font-size: 2.25rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
    @media (min-width: 768px) { h1 { font-size: 3.5rem; } }
    @media (min-width: 1024px) { h1 { font-size: 4.5rem; } }
    
    /* Elements */
    .element-text { margin-bottom: 1.5rem; font-size: 1rem; line-height: 1.6; }
    @media (min-width: 768px) { .element-text { font-size: 1.125rem; } }
    
    .element-button { display: inline-block; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); font-size: 0.875rem; }
    .element-button:hover { transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
    
    .element-image { margin-bottom: 2.5rem; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
    .element-image img { width: 100%; display: block; object-fit: cover; max-height: 600px; }
    
    /* Navbar */
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-radius: 16px; margin: 10px 0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); position: sticky; top: 10px; z-index: 100; border: 1px solid #f1f5f9; overflow: hidden; }
    .navbar-brand { display: flex; align-items: center; gap: 8px; font-weight: 800; color: var(--text-main); text-decoration: none; min-width: 0; }
    .navbar-logo { width: 32px; height: 32px; background: var(--primary); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
    .navbar-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .navbar-menu { display: none; gap: 32px; font-size: 0.875rem; font-weight: 700; }
    .navbar-menu a { text-decoration: none; color: var(--text-main); opacity: 0.6; transition: all 0.2s; }
    .navbar-menu a:hover { opacity: 1; color: var(--primary); }
    .navbar-cta { display: none; padding: 12px 24px; background: var(--primary); color: white; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 0.875rem; transition: all 0.2s; }
    .navbar-cta:hover { background: var(--primary-hover); transform: scale(1.05); }
    .navbar-mobile-toggle { cursor: pointer; opacity: 0.6; display: flex; align-items: center; }
    
    @media (min-width: 768px) {
      .navbar { padding: 20px 40px; }
      .navbar-menu, .navbar-cta { display: flex; }
      .navbar-mobile-toggle { display: none; }
    }

    /* Mobile Menu Overlay */
    .mobile-menu { position: fixed; inset: 0; background: white; z-index: 200; display: none; flex-direction: column; padding: 40px; }
    .mobile-menu.active { display: flex; }
    .mobile-menu-close { align-self: flex-end; margin-bottom: 40px; cursor: pointer; }
    .mobile-menu-links { display: flex; flex-direction: column; gap: 24px; }
    .mobile-menu-links a { font-size: 1.5rem; font-weight: 800; text-decoration: none; color: var(--text-main); }

    /* Hero */
    .hero { padding: 80px 20px; text-align: center; border-radius: 32px; margin-bottom: 40px; background: #111827; color: white; display: flex; align-items: center; justify-content: center; min-height: 500px; position: relative; overflow: hidden; }
    .hero-content { max-width: 900px; position: relative; z-index: 10; }
    .hero h1 { margin-bottom: 1.5rem; }
    .hero p { font-size: 1.125rem; opacity: 0.8; margin-bottom: 2.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }
    .hero-actions { display: flex; flex-direction: column; gap: 16px; align-items: center; }
    .btn-primary { padding: 16px 40px; background: white; color: #111827; border-radius: 50px; text-decoration: none; font-weight: 700; width: 100%; transition: all 0.2s; }
    .btn-secondary { padding: 16px 40px; border: 2px solid rgba(255,255,255,0.2); color: white; border-radius: 50px; text-decoration: none; font-weight: 700; width: 100%; transition: all 0.2s; }
    .btn-primary:hover { transform: scale(1.05); box-shadow: 0 20px 25px -5px rgba(255,255,255,0.1); }
    
    @media (min-width: 640px) {
      .hero { padding: 120px 40px; }
      .hero-actions { flex-direction: row; justify-content: center; }
      .btn-primary, .btn-secondary { width: auto; }
    }

    /* Columns */
    .columns { display: grid; gap: 24px; margin-bottom: 40px; }
    .columns-1 { grid-template-columns: 1fr; }
    .columns-2 { grid-template-columns: 1fr; }
    .columns-3 { grid-template-columns: 1fr; }
    .columns-4 { grid-template-columns: 1fr; }
    
    @media (min-width: 640px) {
      .columns-2 { grid-template-columns: repeat(2, 1fr); }
      .columns-3 { grid-template-columns: repeat(2, 1fr); }
      .columns-4 { grid-template-columns: repeat(2, 1fr); }
    }
    
    @media (min-width: 1024px) {
      .columns-3 { grid-template-columns: repeat(3, 1fr); }
      .columns-4 { grid-template-columns: repeat(4, 1fr); }
    }
    
    .column { padding: 48px 32px; background: #f8fafc; border-radius: 24px; text-align: center; color: var(--text-muted); border: 1px solid #f1f5f9; transition: all 0.3s; }
    .column:hover { border-color: var(--primary); transform: translateY(-5px); background: white; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); }

    /* Form */
    .element-form { background: #ffffff; padding: 40px; border-radius: 32px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; border: 1px solid #f1f5f9; }
    .form-group { margin-bottom: 24px; text-align: left; }
    .form-group label { display: block; font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 10px; }
    .form-group input, .form-group textarea { width: 100%; padding: 16px; border: 1px solid #e2e8f0; border-radius: 16px; background: #f8fafc; outline: none; font-family: inherit; font-size: 1rem; transition: all 0.2s; }
    .form-group input:focus { border-color: var(--primary); background: white; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
    .form-submit { width: 100%; padding: 18px; background: #0f172a; color: white; border: none; border-radius: 16px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: inherit; font-size: 1rem; }
    .form-submit:hover { transform: translateY(-2px); background: #1e293b; }

    /* Footer */
    .footer { padding: 80px 20px; border-radius: 32px; margin-top: 60px; background: #111827; color: white; }
    .footer-grid { display: grid; grid-template-columns: 1fr; gap: 48px; margin-bottom: 60px; }
    @media (min-width: 768px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr; } }
    .footer-brand { display: flex; align-items: center; gap: 12px; font-weight: 800; margin-bottom: 24px; font-size: 1.5rem; }
    .footer-logo { width: 40px; height: 40px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .footer-col h4 { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; margin-bottom: 32px; font-weight: 700; }
    .footer-links { display: flex; flex-direction: column; gap: 16px; }
    .footer-links a { color: white; opacity: 0.6; text-decoration: none; font-size: 0.9375rem; transition: all 0.2s; }
    .footer-links a:hover { opacity: 1; color: var(--primary); padding-left: 4px; }
    .footer-contact p { opacity: 0.6; font-size: 0.9375rem; margin-bottom: 12px; }
    .footer-bottom { padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; font-size: 0.875rem; opacity: 0.4; }

        /* Utilities */
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-left { text-align: left; }

        /* Custom Element Styles */
        ${customCSS}
    </style>
</head>
<body>
    <div class="container">
        ${elementsHTML}
    </div>
    <script>
      // Simple mobile menu toggle
      document.querySelector('.navbar-mobile-toggle')?.addEventListener('click', () => {
        alert('Menu mobile cliqué ! Dans une version réelle, ceci ouvrirait un tiroir de navigation.');
      });
    </script>
</body>
</html>`;
}

export function downloadFile(filename: string, content: string) {
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/html' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
