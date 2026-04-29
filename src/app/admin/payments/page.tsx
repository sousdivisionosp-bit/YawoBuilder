"use client";

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, ArrowUpRight, ArrowDownRight, 
  Smartphone, DollarSign, Search, Filter,
  CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState({ today: 0, month: 0, completed: 0, pending: 0, failed: 0 });

  useEffect(() => {
    const storedSites = JSON.parse(localStorage.getItem('yawo_sites') || '[]');
    const storedUser = localStorage.getItem('yawo_user_name') || 'Admin';

    const paidSites = storedSites.filter((s: any) => s.isPaid);
    const realPayments = paidSites.map((site: any, index: number) => ({
      id: `TX-${1000 + index}`,
      user: storedUser,
      amount: '25.00',
      currency: '$',
      method: 'Mobile Money',
      status: 'Completed',
      date: site.updatedAt ? new Date(site.updatedAt).toLocaleString() : 'Récemment',
      plan: 'Plan Pro'
    }));

    setPayments(realPayments);
    setStats({
      today: paidSites.length > 0 ? 25 : 0,
      month: paidSites.length * 25,
      completed: paidSites.length,
      pending: 0,
      failed: 0
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Paiements</h1>
          <p className="text-slate-500 font-medium">Suivez les transactions et les revenus de la plateforme.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-4 py-2 text-center border-r border-slate-100">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aujourd'hui</div>
            <div className="text-lg font-black text-slate-900">{stats.today}$</div>
          </div>
          <div className="px-4 py-2 text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ce Mois</div>
            <div className="text-lg font-black text-indigo-600">{stats.month}$</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Réussis', value: stats.completed.toString(), color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'En attente', value: stats.pending.toString(), color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Échecs', value: stats.failed.toString(), color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map((item) => (
          <Card key={item.label} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
              </div>
              <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color}`}>
                {item.label === 'Réussis' ? <CheckCircle2 size={24} /> : 
                 item.label === 'En attente' ? <Clock size={24} /> : <AlertCircle size={24} />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
        <CardHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-black text-slate-900">Transactions Récentes</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:bg-slate-50">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:bg-slate-50">
              <Filter size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">ID Transaction</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Utilisateur</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Montant</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Méthode</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Plan</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</th>
                  <th className="px-8 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {payments.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-5 text-xs font-bold text-slate-400">{tx.id}</td>
                    <td className="px-8 py-5 text-sm font-black text-slate-800">{tx.user}</td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900">{tx.currency}{tx.amount}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Smartphone size={14} className="text-slate-400" />
                        {tx.method}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-indigo-600">{tx.plan}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                        tx.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right text-xs font-medium text-slate-400">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 text-center border-t border-slate-50">
            <button className="text-sm font-black text-indigo-600 hover:underline uppercase tracking-widest">Voir tout le rapport financier</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
