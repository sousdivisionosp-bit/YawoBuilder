"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { templates } from '@/data/templates';
import TemplateRenderer from '@/components/editor/TemplateRenderer';
import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone, ArrowLeft, Edit3, X } from 'lucide-react';
import Link from 'next/link';

export default function TemplateDemoPage() {
  const params = useParams();
  const router = useRouter();
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePageId, setActivePageId] = useState<string>('home');
  
  const templateId = params.templateId as string;
  const template = templates.find(t => t.id === templateId);

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Modèle introuvable</h1>
        <p className="text-gray-600 mb-8">Désolé, le modèle que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link href="/dashboard/templates">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 h-12 font-bold">
            Retour aux modèles
          </Button>
        </Link>
      </div>
    );
  }

  const activePage = template.pages.find(p => p.id === activePageId) || template.pages[0];

  const handleEdit = () => {
    const siteId = Math.random().toString(36).substring(7);
    router.push(`/editor/${siteId}?template=${template.id}`);
  };

  return (
    <div className="flex flex-col h-screen bg-[#111] overflow-hidden">
      {/* Demo Header */}
      <div className="h-16 bg-[#1a1a1a] border-b border-white/5 flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/templates">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          <div>
            <h1 className="text-sm font-bold text-white">{template.name}</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">
              Aperçu • {activePage.name}
            </p>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="hidden md:flex items-center bg-[#252525] p-1 rounded-xl border border-white/5 shadow-inner">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold ${
              device === 'desktop' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Monitor size={16} />
            <span className="hidden lg:inline">Ordinateur</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold ${
              device === 'tablet' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Tablet size={16} />
            <span className="hidden lg:inline">Tablette</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold ${
              device === 'mobile' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Smartphone size={16} />
            <span className="hidden lg:inline">Mobile</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 flex items-center gap-2 shadow-lg shadow-blue-600/20 h-10 text-sm transition-all hover:scale-105 active:scale-95"
          >
            <Edit3 size={16} />
            Modifier avec Yawo
          </Button>
          <Link href="/dashboard/templates">
            <button className="p-2 text-gray-400 hover:text-white transition-all">
              <X size={20} />
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-auto bg-[#0a0a0a] flex justify-center p-4 md:p-8 custom-scrollbar">
        <div 
          className={`bg-white shadow-2xl transition-all duration-500 overflow-hidden ${
            device === 'desktop' ? 'w-full max-w-6xl rounded-t-xl h-full' : 
            device === 'tablet' ? 'w-[768px] rounded-3xl border-[12px] border-[#222] h-[1024px] self-start' : 
            'w-[375px] rounded-[3rem] border-[12px] border-[#222] h-[812px] self-start'
          }`}
        >
          <div className="h-full overflow-auto no-scrollbar">
            <TemplateRenderer 
              elements={activePage.elements} 
              pages={template.pages}
              device={device}
              activePageId={activePage.id}
              onPageChange={setActivePageId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}