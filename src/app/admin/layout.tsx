"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, CreditCard, Settings, 
  LogOut, Bell, Search, Shield, BarChart3, 
  Database, Globe, Package, UtensilsCrossed 
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Simulation de vérification d'auth admin
    const checkAuth = () => {
      const isAuth = localStorage.getItem('yawo_auth') === 'true';
      const storedName = localStorage.getItem('yawo_user_name');
      
      // En production, on vérifierait un rôle 'admin' ici
      if (!isAuth) {
        router.push('/');
      } else {
        setUserName(storedName || 'Admin');
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
    { href: '/admin/users', icon: Users, label: 'Utilisateurs' },
    { href: '/admin/projects', icon: Package, label: 'Projets' },
    { href: '/admin/payments', icon: CreditCard, label: 'Paiements' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytiques' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Admin */}
      <aside className="w-72 bg-slate-900 flex flex-col shadow-2xl z-30">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">Y</div>
          <div>
            <span className="text-xl font-black tracking-tight text-white block">YawoAdmin</span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Platform Control</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          <div className="pb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Menu Principal</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={22} />
                <span className="font-bold">{item.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-8 pb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Système</div>
          <Link href="/admin/settings" className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Settings size={22} />
            <span className="font-bold">Configuration</span>
          </Link>
          <Link href="/admin/database" className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Database size={22} />
            <span className="font-bold">Base de données</span>
          </Link>
          <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-indigo-400 hover:bg-slate-800 hover:text-indigo-300 transition-all mt-4 border border-indigo-500/20">
            <Globe size={22} />
            <span className="font-bold">Vue Client</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => {
              localStorage.removeItem('yawo_auth');
              router.push('/');
            }}
            className="flex items-center space-x-3 px-4 py-3.5 w-full text-left text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
          >
            <LogOut size={22} />
            <span className="font-bold">Quitter</span>
          </button>
        </div>
      </aside>

      {/* Main content Admin */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Admin */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 z-20">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Shield size={18} />
            </div>
            <h2 className="font-black text-slate-800 uppercase tracking-wider text-sm">Panneau de Contrôle</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="relative w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
            <div className="h-10 w-px bg-slate-100 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-black text-slate-900">{userName}</div>
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">Super Admin</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                <Shield size={20} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
