"use client";

import React from 'react';
import { 
  Settings as SettingsIcon, Shield, Bell, 
  Globe, Database, CreditCard, Save,
  CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Configuration Système</h1>
        <p className="text-slate-500 font-medium">Gérez les paramètres globaux de la plateforme YawoBuild.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Settings */}
        <div className="space-y-4">
          {[
            { id: 'general', label: 'Général', icon: SettingsIcon, active: true },
            { id: 'security', label: 'Sécurité & Auth', icon: Shield, active: false },
            { id: 'notifications', label: 'Notifications', icon: Bell, active: false },
            { id: 'payments', label: 'Passerelles de Paiement', icon: CreditCard, active: false },
            { id: 'storage', label: 'Stockage & Médias', icon: Database, active: false },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all text-left ${
                item.active 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black text-slate-900">Paramètres Généraux</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nom de la Plateforme</label>
                <input 
                  type="text" 
                  defaultValue="YawoBuild"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email de Support</label>
                <input 
                  type="email" 
                  defaultValue="support@yawobuild.cd"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Maintenance</label>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                    </div>
                    <span className="text-sm font-bold text-slate-600">Mode Maintenance</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Inscriptions</label>
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                    </div>
                    <span className="text-sm font-bold text-emerald-700">Ouvertes</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 h-12 font-bold flex items-center gap-2">
                  <Save size={18} /> Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
              <Info size={20} />
            </div>
            <div>
              <p className="text-blue-900 text-sm font-black mb-1">Dernière mise à jour</p>
              <p className="text-blue-700 text-xs font-medium leading-relaxed">
                Le système a été mis à jour le {new Date().toLocaleDateString()} à 10:45 AM. Toutes les configurations sont stables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
