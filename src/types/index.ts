export type SiteElement = {
  id: string;
  type: 
    | 'text' | 'image' | 'button' | 'container' | 'form' | 'chat'
    | 'form-input-text' | 'form-input-email' | 'form-input-tel' | 'form-textarea' | 'form-select' | 'form-radio' | 'form-checkbox' | 'form-date' | 'form-rating' | 'form-submit'
    | 'chat-widget' | 'chat-bubble' | 'chat-quick-replies' | 'chat-welcome'
    | 'section-container' | 'section-columns-2' | 'section-columns-3' | 'section-columns-4' | 'section-sidebar' | 'section-hero' | 'section-navbar' | 'section-footer'
    | 'template-hero-cta' | 'template-features' | 'template-pricing' | 'template-testimonials' | 'template-team' | 'template-contact' | 'template-portfolio' | 'template-blog';
  content?: string;
  styles: Record<string, any>;
  tabletStyles?: Record<string, any>;
  mobileStyles?: Record<string, any>;
  children?: SiteElement[];
};

export type SitePage = {
  id: string;
  name: string;
  slug: string;
  elements: SiteElement[];
};

export type Site = {
  id: string;
  name: string;
  description?: string;
  userId: string;
  pages: SitePage[];
  isPublished: boolean;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  pages: SitePage[];
};
