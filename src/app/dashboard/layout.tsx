"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Globe, Settings, LogOut, Plus, Bell, Search, User, CreditCard, UtensilsCrossed, Package, Shield, Menu, X, Presentation } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulation de vérification d'auth
    const checkAuth = () => {
      const isAuth = localStorage.getItem('yawo_auth') === 'true';
      const storedName = localStorage.getItem('yawo_user_name');
      
      if (!isAuth) {
        router.push('/');
      } else {
        setUserName(storedName || 'Utilisateur');
        // On simule que l'admin est celui qui s'appelle 'Admin' ou 'SuperAdmin'
        if (storedName?.toLowerCase().includes('admin')) {
          setIsAdmin(true);
        }
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden font-sans relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-gray-100 flex flex-col shadow-sm z-50 
        transition-transform duration-300 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 lg:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">Y</div>
            <span className="text-2xl font-black tracking-tight text-gray-900">YawoBuild</span>
          </div>
          <button 
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
          <Link 
            href="/dashboard" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center space-x-3 px-4 py-3.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-100 transition-all"
          >
            <LayoutDashboard size={22} />
            <span className="font-bold">Mes Projets</span>
          </Link>
          <Link 
            href="/dashboard/templates" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all"
          >
            <Plus size={22} />
            <span className="font-bold">Nouveau Site</span>
          </Link>
          <Link 
            href="/dashboard/restaurant" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all"
          >
            <UtensilsCrossed size={22} />
            <span className="font-bold">Menu QR & Commandes</span>
          </Link>
          <Link 
            href="/dashboard/gestion" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all"
          >
            <Package size={22} />
            <span className="font-bold">Mon App de Gestion</span>
          </Link>
          <Link 
            href="/dashboard/slides" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all"
          >
            <Presentation size={22} />
            <span className="font-bold">Présentation Projet</span>
          </Link>
          <Link 
            href="/dashboard/billing" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all"
          >
            <CreditCard size={22} />
            <span className="font-bold">Facturation</span>
          </Link>

          {isAdmin && (
            <>
              <div className="pt-8 pb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Administration</div>
              <Link 
                href="/admin" 
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-3.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all border border-indigo-100"
              >
                <Shield size={22} />
                <span className="font-bold">Panel Admin</span>
              </Link>
            </>
          )}

          <div className="pt-8 pb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Paramètres</div>
          <Link 
            href="/dashboard/settings" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all"
          >
            <Settings size={22} />
            <span className="font-bold">Compte</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <button 
            onClick={() => {
              localStorage.removeItem('yawo_auth');
              router.push('/');
            }}
            className="flex items-center space-x-3 px-4 py-3.5 w-full text-left text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={22} />
            <span className="font-bold">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 lg:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block w-64 lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-10 pr-4 py-2 lg:py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            {/* Simple logo for mobile */}
            <div className="lg:hidden w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-100 md:hidden">Y</div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <button className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 lg:h-10 w-px bg-gray-100 mx-1 lg:mx-2"></div>
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs lg:text-sm font-bold text-gray-900 leading-tight">{userName}</div>
                <div className="text-[9px] lg:text-[10px] font-bold text-blue-600 uppercase tracking-wider">Plan Pro</div>
              </div>
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                <User className="w-[18px] h-[18px] lg:w-5 lg:h-5" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-10 bg-gray-50/30">
          {children}
        </main>
      </div>
    </div>
  );
}
