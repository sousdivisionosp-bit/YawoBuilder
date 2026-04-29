"use client";

import React from 'react';
import { 
  Database, HardDrive, RefreshCw, 
  Search, Shield, Server, Activity,
  CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminDatabasePage() {
  const tables = [
    { name: 'users', rows: '1,284', size: '256 KB', status: 'Healthy' },
    { name: 'projects', rows: '3,562', size: '1.2 MB', status: 'Healthy' },
    { name: 'payments', rows: '840', size: '128 KB', status: 'Healthy' },
    { name: 'templates', rows: '42', size: '4.5 MB', status: 'Healthy' },
    { name: 'logs', rows: '15,420', size: '8.2 MB', status: 'Healthy' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Base de données</h1>
          <p className="text-slate-500 font-medium">Surveillance et maintenance des données système (Supabase).</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white font-bold text-slate-600 flex items-center gap-2">
            <RefreshCw size={18} /> Rafraîchir
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl px-6 font-bold shadow-lg shadow-rose-100">
            Sauvegarde forcée
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Connexions Actives', value: '42', icon: Server, color: 'text-blue-500' },
          { label: 'Taille Totale', value: '14.3 MB', icon: HardDrive, color: 'text-indigo-500' },
          { label: 'Uptime', value: '99.99%', icon: Activity, color: 'text-emerald-500' },
        ].map((item) => (
          <Card key={item.label} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</div>
                <div className="text-xl font-black text-slate-900">{item.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-xl font-black text-slate-900">Tables Supabase</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Nom de la table</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Lignes</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Taille</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">État</th>
                  <th className="px-8 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tables.map((table) => (
                  <tr key={table.name} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <Database size={16} className="text-indigo-500" />
                        <span className="text-sm font-black text-slate-800">{table.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-600">{table.rows}</td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-500">{table.size}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        <CheckCircle2 size={12} />
                        {table.status}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">Analyser</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
