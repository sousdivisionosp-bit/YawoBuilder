"use client";

import React, { useEffect, useState } from 'react';
import { 
  Package, ExternalLink, Trash2, 
  Search, Filter, Globe, UtensilsCrossed, 
  ShoppingBag, CheckCircle2, Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Récupération des sites réels
    const storedSites = JSON.parse(localStorage.getItem('yawo_sites') || '[]');
    const storedUser = localStorage.getItem('yawo_user_name') || 'Admin';

    const realProjects = storedSites.map((site: any) => ({
      id: site.id,
      name: site.name,
      owner: storedUser, // Dans cette version locale, l'utilisateur actuel possède tout
      type: 'Site Web', // Par défaut pour l'instant
      status: site.isPaid ? 'Published' : 'Draft',
      date: site.updatedAt || new Date().toISOString(),
      paid: site.isPaid
    }));

    setProjects(realProjects);
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProject = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce projet de la base globale ?')) {
      const storedSites = JSON.parse(localStorage.getItem('yawo_sites') || '[]');
      const updatedSites = storedSites.filter((s: any) => s.id !== id);
      localStorage.setItem('yawo_sites', JSON.stringify(updatedSites));
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Site Web': return <Globe size={16} className="text-blue-500" />;
      case 'Restaurant': return <UtensilsCrossed size={16} className="text-orange-500" />;
      case 'Gestion': return <ShoppingBag size={16} className="text-indigo-500" />;
      default: return <Package size={16} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Tous les Projets</h1>
        <p className="text-slate-500 font-medium">Surveillez et gérez tous les projets créés sur YawoBuild.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher par nom de projet ou propriétaire..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-2xl border-slate-200 bg-white h-[52px] px-6 font-bold text-slate-600">
            Catégorie
          </Button>
          <Button variant="outline" className="rounded-2xl border-slate-200 bg-white h-[52px] px-6 font-bold text-slate-600">
            Statut
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Projet</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Propriétaire</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Paiement</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                        {getTypeIcon(project.type)}
                      </div>
                      <div className="text-sm font-black text-slate-900">{project.name}</div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600">{project.owner}</td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-500">{project.type}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${project.paid ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {project.paid ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                      {project.paid ? 'Payé' : 'Brouillon'}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-400">
                    {new Date(project.date).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                        <ExternalLink size={18} />
                      </button>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
