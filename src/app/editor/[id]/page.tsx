"use client";

import React, { useState, useEffect, use } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Sidebar from '@/components/editor/Sidebar';
import Canvas from '@/components/editor/Canvas';
import Toolbar from '@/components/editor/Toolbar';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import PaymentModal from '@/components/payment/PaymentModal';
import { SiteElement, SitePage, Template } from '@/types';
import { useSearchParams } from 'next/navigation';
import { templates } from '@/data/templates';
import { getPresetById } from '@/data/componentLibrary';
import { generateHTML, downloadFile } from '@/lib/export/generator';
import { AnimatePresence } from 'framer-motion';

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [pages, setPages] = useState<SitePage[]>([]);
  const [currentPageId, setCurrentPageId] = useState<string>('');
  const [selectedElement, setSelectedElement] = useState<SiteElement | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [siteName, setAppName] = useState('Mon Nouveau Site');

  // Derived current page and elements
  const currentPage = pages.find(p => p.id === currentPageId) || pages[0];
  const elements = currentPage?.elements || [];

  useEffect(() => {
    // Load from localStorage first
    const storedSites = JSON.parse(localStorage.getItem('yawo_sites') || '[]');
    const currentUser = localStorage.getItem('yawo_user_name');
    const existingSite = storedSites.find((s: any) => s.id === id);

    // Vérification de la confidentialité : l'utilisateur ne peut voir que ses propres projets
    if (existingSite) {
      if (existingSite.userId && existingSite.userId !== currentUser) {
        alert("Accès refusé : Ce projet ne vous appartient pas.");
        window.location.href = '/dashboard';
        return;
      }
      setPages(existingSite.pages);
      setCurrentPageId(existingSite.pages[0]?.id || '');
      setAppName(existingSite.name);
      setIsPaid(existingSite.isPaid);
    } else if (templateId) {
      const template = templates.find(t => t.id === templateId);
      if (template && template.pages.length > 0) {
        setPages(template.pages);
        setCurrentPageId(template.pages[0].id);
        setAppName(template.name);
      }
    }
  }, [id, templateId]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Dropping from sidebar to canvas
    if (source.droppableId === 'sidebar' && destination.droppableId === 'canvas') {
      let newElement: SiteElement;

      // Check if it's a library preset
      if (draggableId.startsWith('library-preset:')) {
        const [_, type, presetId] = draggableId.split(':');
        const preset = getPresetById(type, presetId);
        
        if (preset) {
          newElement = {
            ...preset.element,
            id: Math.random().toString(36).substr(2, 9),
          };
        } else {
          return;
        }
      } else {
        // Default elements
        newElement = {
          id: Math.random().toString(36).substr(2, 9),
          type: draggableId as SiteElement['type'],
          content: draggableId === 'text' ? 'Double-cliquez pour éditer' : 
                   draggableId === 'button' ? 'Cliquez ici' : '',
          styles: {
            color: draggableId === 'button' ? '#ffffff' : '#000000',
            backgroundColor: draggableId === 'button' ? '#2563eb' : 'transparent',
            fontSize: '16',
            textAlign: 'left',
          },
        };
      }
      
      const newElements = [...elements];
      newElements.splice(destination.index, 0, newElement);
      
      setPages(pages.map(p => p.id === currentPageId ? { ...p, elements: newElements } : p));
      setSelectedElement(newElement);
      return;
    }

    // Reordering within canvas
    if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
      const newElements = Array.from(elements);
      const [reorderedItem] = newElements.splice(source.index, 1);
      newElements.splice(destination.index, 0, reorderedItem);
      setPages(pages.map(p => p.id === currentPageId ? { ...p, elements: newElements } : p));
    }
  };

  const updateElement = (updatedEl: SiteElement) => {
    const newElements = elements.map(el => el.id === updatedEl.id ? updatedEl : el);
    setPages(pages.map(p => p.id === currentPageId ? { ...p, elements: newElements } : p));
    setSelectedElement(updatedEl);
  };

  const removeElement = (id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setPages(pages.map(p => p.id === currentPageId ? { ...p, elements: newElements } : p));
    if (selectedElement?.id === id) setSelectedElement(null);
  };

  const addElement = (element: SiteElement) => {
    const newElements = [...elements, element];
    setPages(pages.map(p => p.id === currentPageId ? { ...p, elements: newElements } : p));
    setSelectedElement(element);
  };

  const updatePage = (id: string, newElements: SiteElement[]) => {
    setPages(pages.map(p => p.id === id ? { ...p, elements: newElements } : p));
  };

  const addPage = () => {
    const newPageId = `page-${Math.random().toString(36).substr(2, 9)}`;
    
    const existingNavbar = pages.length > 0 ? pages[0].elements.find(el => el.type === 'section-navbar') : null;
    const navbarToCopy = existingNavbar || {
      id: `nav-${newPageId}`,
      type: 'section-navbar',
      content: 'Logo',
      styles: { backgroundColor: '#ffffff', color: '#000000' }
    };
    
    const newPage: SitePage = {
      id: newPageId,
      name: `Page ${pages.length + 1}`,
      slug: `/${newPageId}`,
      elements: [
        { ...navbarToCopy, id: `nav-${newPageId}` },
        {
          id: `hero-${newPageId}`,
          type: 'section-hero',
          content: 'Bienvenue sur votre nouvelle page',
          styles: { backgroundColor: '#f9fafb', color: '#111827' }
        },
        {
          id: `footer-${newPageId}`,
          type: 'section-footer',
          content: `© ${new Date().getFullYear()} Mon Site`,
          styles: { backgroundColor: '#ffffff', color: '#000000' }
        }
      ]
    };
    setPages([...pages, newPage]);
    setCurrentPageId(newPageId);
  };

  const updatePageName = (id: string, name: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, name, slug: `/${name.toLowerCase().replace(/\s+/g, '-')}` } : p));
  };

  const deletePage = (id: string) => {
    if (pages.length <= 1) return;
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    if (currentPageId === id) {
      setCurrentPageId(newPages[0].id);
    }
  };

  const handleSave = () => {
    const storedSites = JSON.parse(localStorage.getItem('yawo_sites') || '[]');
    const currentUser = localStorage.getItem('yawo_user_name') || 'Anonyme';
    const siteIndex = storedSites.findIndex((s: any) => s.id === id);

    const siteData = {
      id: id,
      userId: currentUser, // Association du projet à l'utilisateur actuel
      name: siteName,
      pages: pages,
      isPaid: isPaid,
      updatedAt: new Date().toISOString(),
      preview: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=400&q=80' // Default preview for now
    };

    if (siteIndex >= 0) {
      storedSites[siteIndex] = siteData;
    } else {
      storedSites.push(siteData);
    }

    localStorage.setItem('yawo_sites', JSON.stringify(storedSites));
    alert('Projet enregistré avec succès ! Retrouvez-le dans votre tableau de bord.');
  };

  const handleExport = () => {
    if (!isPaid) {
      setIsPaymentModalOpen(true);
    } else {
      // Export current page elements for now
      const html = generateHTML(elements);
      downloadFile(`${currentPage?.name || 'mon-site'}.html`, html);
      alert('Votre site a été généré et téléchargé avec succès !');
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Toolbar 
        onSave={handleSave} 
        onPreview={() => {}} 
        onExport={handleExport}
        isPaid={isPaid}
        elements={elements}
        pages={pages}
        currentPageId={currentPageId}
        onPageChange={setCurrentPageId}
        onAddPage={addPage}
        onDeletePage={deletePage}
        onUpdatePageName={updatePageName}
        siteName={siteName}
        onUpdateSiteName={setAppName}
        device={device}
        onDeviceChange={setDevice}
      />
      
      <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 flex overflow-hidden relative">
            <Sidebar 
              pages={pages}
              currentPageId={currentPageId}
              onPageChange={setCurrentPageId}
              onUpdatePage={updatePage}
              onAddPage={addPage}
              onAddElement={addElement}
            />
            <Canvas 
              elements={elements} 
              pages={pages}
              device={device}
            onRemove={removeElement} 
            onSelect={setSelectedElement}
            onUpdate={updateElement}
            selectedId={selectedElement?.id || null}
          />
          
          <AnimatePresence>
            {selectedElement && (
              <PropertiesPanel 
                element={selectedElement} 
                onUpdate={updateElement}
                onClose={() => setSelectedElement(null)}
                onRemove={removeElement}
                device={device}
              />
            )}
          </AnimatePresence>
        </div>
      </DragDropContext>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onSuccess={() => setIsPaid(true)}
      />
    </div>
  );
}
