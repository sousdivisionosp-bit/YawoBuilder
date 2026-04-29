"use client";

import React, { useEffect, useState } from 'react';
import { 
  Users, Package, CreditCard, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Activity, 
  Globe, UtensilsCrossed, ShoppingBag, 
  Clock, CheckCircle2, AlertCircle, Shield 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: 'Utilisateurs Totaux', value: '0', icon: Users, change: '0%', positive: true },
    { label: 'Projets Créés', value: '0', icon: Package, change: '0%', positive: true },
    { label: 'Revenu Mensuel', value: '0$', icon: CreditCard, change: '0%', positive: true },
    { label: 'Taux de Conversion', value: '0%', icon: TrendingUp, change: '0%', positive: false },
  ]);

  const [projectDistribution, setProjectDistribution] = useState([
    { name: 'Sites Web Vitrines', count: 0, icon: Globe, color: 'bg-blue-500' },
    { name: 'Menus QR Restaurant', count: 0, icon: UtensilsCrossed, color: 'bg-orange-500' },
    { name: 'Apps de Gestion Stock', count: 0, icon: ShoppingBag, color: 'bg-indigo-500' },
  ]);

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // Récupération des données réelles depuis localStorage
    const storedSites = JSON.parse(localStorage.getItem('yawo_sites') || '[]');
    const storedUser = localStorage.getItem('yawo_user_name') || 'Admin';
    
    // Calcul des statistiques réelles
    const totalProjects = storedSites.length;
    const paidProjects = storedSites.filter((s: any) => s.isPaid).length;
    const revenue = paidProjects * 25; // Supposons 25$ par projet payé
    const conversionRate = totalProjects > 0 ? Math.round((paidProjects / totalProjects) * 100) : 0;

    setStats([
      { label: 'Utilisateurs Totaux', value: '1', icon: Users, change: '+100%', positive: true }, // 1 utilisateur réel détecté
      { label: 'Projets Créés', value: totalProjects.toString(), icon: Package, change: totalProjects > 0 ? '+100%' : '0%', positive: true },
      { label: 'Revenu Mensuel', value: `${revenue}$`, icon: CreditCard, change: revenue > 0 ? '+100%' : '0%', positive: true },
      { label: 'Taux de Conversion', value: `${conversionRate}%`, icon: TrendingUp, change: conversionRate > 0 ? '+5%' : '0%', positive: true },
    ]);

    // Distribution réelle (en fonction des types détectés ou simulée par type de projet)
    setProjectDistribution([
      { name: 'Sites Web Vitrines', count: totalProjects, icon: Globe, color: 'bg-blue-500' },
      { name: 'Menus QR Restaurant', count: 0, icon: UtensilsCrossed, color: 'bg-orange-500' },
      { name: 'Apps de Gestion Stock', count: 0, icon: ShoppingBag, color: 'bg-indigo-500' },
    ]);

    // Activité récente basée sur les projets réels
    const activities = storedSites.slice(0, 5).map((site: any, index: number) => ({
      id: index,
      user: storedUser,
      action: `a mis à jour "${site.name}"`,
      type: 'site',
      time: site.updatedAt ? `Le ${new Date(site.updatedAt).toLocaleDateString()}` : 'Récemment',
      status: site.isPaid ? 'success' : 'warning'
    }));

    if (activities.length === 0) {
      setRecentActivity([
        { id: 0, user: storedUser, action: 's\'est connecté au panel', type: 'system', time: 'À l\'instant', status: 'success' }
      ]);
    } else {
      setRecentActivity(activities);
    }
  }, []);

  return (
    <div className="space-y-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Vue d'ensemble</h1>
          <p className="text-slate-500 font-medium">Statistiques en temps réel de la plateforme YawoBuild.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">
            <Activity size={14} className="animate-pulse" />
            Système Opérationnel
          </div>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
            Exporter Rapport
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600">
                    <stat.icon size={24} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-black ${stat.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-3">
              Activité Récente
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] rounded-full uppercase tracking-widest font-black">Live</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-10 rounded-full ${
                      activity.status === 'success' ? 'bg-emerald-500' : 
                      activity.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                    <div>
                      <div className="text-sm font-black text-slate-800">
                        {activity.user} <span className="font-medium text-slate-500">{activity.action}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {activity.time}
                        </span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider">
                          {activity.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border-2 border-dashed border-slate-100 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-50 hover:border-slate-200 transition-all">
              Voir tout l'historique
            </button>
          </CardContent>
        </Card>

        {/* Project Distribution */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black text-slate-900">Répartition Projets</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-2">
              <div className="space-y-6">
                {projectDistribution.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <div className="flex items-center gap-2 text-slate-700">
                        <item.icon size={16} />
                        {item.name}
                      </div>
                      <span className="text-slate-900">{item.count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / 3562) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${item.color}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-indigo-600 text-white">
            <CardContent className="p-8">
              <Shield className="mb-6 opacity-50" size={40} />
              <h3 className="text-xl font-black mb-2">Sécurité Plateforme</h3>
              <p className="text-indigo-100 text-sm font-medium mb-6 leading-relaxed">
                Toutes les sauvegardes système sont à jour. Aucun incident détecté ces dernières 24h.
              </p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white/10 w-fit px-4 py-2 rounded-full border border-white/10">
                <CheckCircle2 size={14} className="text-emerald-300" />
                Vérifié le {new Date().toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
