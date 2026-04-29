"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layout, ArrowLeft, Eye, Edit3, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { templates as templatesData } from '@/data/templates';

const categories = ['Tous', 'Business', 'Portfolio', 'Gastronomie', 'Blog', 'Agence', 'Événement'];

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredTemplates = selectedCategory === 'Tous' 
    ? templatesData 
    : templatesData.filter(t => t.category === selectedCategory);

  const handleSelectTemplate = (id: string) => {
    const siteId = Math.random().toString(36).substring(7);
    router.push(`/editor/${siteId}?template=${id}`);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Choisir un modèle</h2>
            <p className="text-gray-500 mt-1 font-medium">Trouvez le point de départ idéal pour votre prochain grand projet.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden border-none shadow-xl shadow-gray-100/50 rounded-[32px] group transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/40 hover:-translate-y-2 bg-white flex flex-col h-full">
            <div className="aspect-[16/11] relative overflow-hidden m-3 rounded-[24px]">
              <img 
                src={template.thumbnail} 
                alt={template.name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6 backdrop-blur-[2px]">
                <Link href={`/demo/${template.id}`} target="_blank" className="w-full">
                  <Button 
                    variant="outline"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold h-12 rounded-xl backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <Eye size={18} />
                    Voir le démo
                  </Button>
                </Link>
                <Button 
                  onClick={() => handleSelectTemplate(template.id)} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Edit3 size={18} />
                  Modifier avec Yawo
                </Button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm">
                  {template.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 pt-2 flex flex-col flex-grow">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-xl font-black text-gray-900">{template.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-2">
                  {template.description}
                </p>
                <div className="mt-5 pt-5 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Responsive
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    SEO Ready
                  </span>
                  <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Gratuit</span>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
