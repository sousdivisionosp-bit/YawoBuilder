"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, Mail, Calendar, 
  Shield, MoreVertical, Search, Filter,
  UserCheck, UserX, ArrowUpRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Récupération de l'utilisateur actuel
    const storedUser = localStorage.getItem('yawo_user_name') || 'Admin';
    const storedSites = JSON.parse(localStorage.getItem('yawo_sites') || '[]');
    
    // Création d'une liste basée sur l'utilisateur réel détecté
    const realUsers = [
      { 
        id: 1, 
        name: storedUser, 
        email: `${storedUser.toLowerCase().replace(/\s+/g, '.')}@yawobuild.cd`, 
        role: 'Admin', 
        status: 'Active', 
        joined: '2026-04-29', 
        projects: storedSites.length 
      }
    ];

    setUsers(realUsers);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Utilisateurs</h1>
          <p className="text-slate-500 font-medium">Gérez les comptes et les accès de la plateforme.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 font-bold shadow-lg shadow-indigo-100">
          Ajouter un utilisateur
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher par nom ou email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
          />
        </div>
        <Button variant="outline" className="rounded-2xl border-slate-200 bg-white h-[52px] px-6 font-bold text-slate-600 flex items-center gap-2">
          <Filter size={18} /> Filtres
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Utilisateur</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Rôle</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Projets</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Rejoint le</th>
                <th className="px-8 py-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900">{user.name}</div>
                        <div className="text-xs font-medium text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      user.role === 'Admin' ? 'bg-indigo-50 text-indigo-600' : 
                      user.role === 'Client Pro' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span className="text-xs font-bold text-slate-700">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600">{user.projects}</td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-500">{new Date(user.joined).toLocaleDateString()}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors">
                        <UserCheck size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                        <UserX size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                        <MoreVertical size={18} />
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
