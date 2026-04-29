"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, Package, 
  ArrowUpRight, ArrowDownRight, Calendar,
  Globe, Smartphone, UtensilsCrossed, ShoppingBag
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function AdminAnalyticsPage() {
  const [projectStats, setProjectStats] = useState<any[]>([]);

  useEffect(() => {
    const storedSites = JSON.parse(localStorage.getItem('yawo_sites') || '[]');
    const total = storedSites.length;
    const paid = storedSites.filter((s: any) => s.isPaid).length;
    
    setProjectStats([
      { label: 'Site Web Builder', conv: total > 0 ? `${Math.round((paid/total)*100)}%` : '0%', icon: Globe, color: 'text-blue-600' },
      { label: 'Menu QR Restaurant', conv: '0%', icon: UtensilsCrossed, color: 'text-orange-600' },
      { label: 'App de Gestion PWA', conv: '0%', icon: ShoppingBag, color: 'text-indigo-600' },
    ]);
  }, []);

  const deviceStats = [
    { label: 'Mobile', value: '64%', icon: Smartphone, color: 'bg-indigo-500' },
    { label: 'Desktop', value: '32%', icon: Globe, color: 'bg-blue-500' },
    { label: 'Tablette', value: '4%', icon: Smartphone, color: 'bg-slate-300' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Analytiques</h1>
          <p className="text-slate-500 font-medium">Analyse approfondie de l'utilisation de la plateforme.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white font-bold text-slate-600 flex items-center gap-2">
            <Calendar size={18} /> 30 derniers jours
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 font-bold">
            Télécharger PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-black text-slate-900 flex items-center justify-between">
              Croissance Utilisateurs
              <div className="flex items-center gap-2 text-xs font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">
                <ArrowUpRight size={14} /> +24%
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="h-[300px] w-full bg-slate-50 rounded-2xl flex items-center justify-center border border-dashed border-slate-200">
              <div className="text-slate-400 font-bold flex flex-col items-center gap-2">
                <BarChart3 size={40} className="opacity-20" />
                <span>Graphique de croissance (Simulé)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-black text-slate-900">Appareils</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-8 mt-4">
              {deviceStats.map((stat) => (
                <div key={stat.label} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${stat.color} text-white rounded-lg flex items-center justify-center`}>
                        <stat.icon size={16} />
                      </div>
                      <span className="text-sm font-black text-slate-700">{stat.label}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{stat.value}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color}`} style={{ width: stat.value }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-black text-slate-900">Conversion par Service</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {projectStats.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={item.color} />
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  </div>
                  <div className="text-sm font-black text-slate-900">{item.conv} <span className="text-[10px] text-slate-400 uppercase">Conv.</span></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-slate-900 text-white">
          <CardContent className="p-8 h-full flex flex-col justify-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-black mb-2">Performances au Sommet</h3>
            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
              Votre plateforme a enregistré une augmentation de 40% de l'engagement utilisateur ce mois-ci.
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 px-8 font-bold w-fit mx-auto shadow-lg shadow-indigo-600/20">
              Voir le Rapport Complet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
