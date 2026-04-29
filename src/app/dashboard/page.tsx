"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink, Edit2, Trash2, Globe, Clock, MoreVertical, Layout, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Site {
  id: string;
  userId?: string;
  name: string;
  isPaid: boolean;
  updatedAt: string;
  preview: string;
}

export default function DashboardPage() {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    const storedSites = JSON.parse(localStorage.getItem('yawo_sites') || '[]');
    const currentUser = localStorage.getItem('yawo_user_name');
    
    // Filtrage pour ne montrer que les projets de l'utilisateur connecté
    const userSites = storedSites.filter((site: Site) => site.userId === currentUser);
    
    setSites(userSites);
  }, []);

  const deleteSite = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      const updatedSites = sites.filter(s => s.id !== id);
      setSites(updatedSites);
      localStorage.setItem('yawo_sites', JSON.stringify(updatedSites));
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Tableau de bord</h2>
          <p className="text-gray-500 mt-2 font-medium">Vous avez <span className="text-blue-600 font-bold">{sites.length} projets</span> actifs en cours.</p>
        </motion.div>
        
        <Link href="/dashboard/templates">
          <Button className="flex items-center gap-2 rounded-xl h-12 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold transition-all hover:scale-105">
            <Plus size={20} strokeWidth={3} />
            Nouveau Projet
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sites.map((site, index) => (
          <motion.div
            key={site.id || `site-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500 rounded-[24px] bg-white border border-gray-100">
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img 
                  src={site.preview} 
                  alt={site.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Link href={`/editor/${site.id}`} className="w-full">
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl gap-2 shadow-xl">
                      <Edit2 size={16} /> Éditer le site
                    </Button>
                  </Link>
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                  site.isPaid ? 'bg-green-500 text-white' : 'bg-yellow-400 text-white'
                }`}>
                  {site.isPaid ? 'Payé' : 'Brouillon'}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{site.name}</CardTitle>
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                      <Clock size={12} />
                      {new Date(site.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                    <MoreVertical size={20} />
                  </Button>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 rounded-xl border-gray-100 font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all gap-2">
                    <Globe size={16} /> Voir
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => deleteSite(site.id)}
                    className="rounded-xl border-gray-100 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Create new card */}
        <motion.div
          key="add-new-site"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sites.length * 0.1 }}
        >
          <Link href="/dashboard/templates">
            <Card className="border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer h-full flex flex-col items-center justify-center p-10 min-h-[340px] rounded-[24px] group">
              <div className="w-20 h-20 rounded-[24px] bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                <Plus className="text-blue-600 group-hover:text-white transition-colors" size={40} strokeWidth={3} />
              </div>
              <p className="font-black text-xl text-gray-900 group-hover:text-blue-600 transition-colors">Nouveau Site</p>
              <p className="text-sm font-medium text-gray-400 text-center mt-3 max-w-[200px]">Lancez un nouveau projet à partir d'un modèle pro.</p>
              <ArrowRight className="mt-6 text-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </Card>
          </Link>
        </motion.div>
      </div>

      {/* Upgrade Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-200"
      >
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black mb-3">Passez à la vitesse supérieure ⚡️</h3>
            <p className="text-blue-100 font-medium max-w-xl">Débloquez l'exportation illimitée, le système de Menu QR intelligent, l'App de Gestion PWA et le support prioritaire avec le Plan Pro.</p>
          </div>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 font-black rounded-2xl h-14 px-10 text-lg shadow-xl shadow-black/10">
            Passer au Plan Pro
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
