"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Smartphone, CreditCard, CheckCircle2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [step, setStep] = useState<'selection' | 'processing' | 'success'>('selection');
  const [method, setMethod] = useState<'mpesa' | 'orange' | 'airtel' | null>(null);
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handlePayment = () => {
    if (!phone || !method) return;
    setStep('processing');
    // Simulate API call to FlexPay or MaxiCash
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Paiement YawoBuild</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </CardHeader>
        <CardContent>
          {step === 'selection' && (
            <div className="space-y-6">
              <p className="text-gray-600 text-sm">
                Pour télécharger votre site web en local, un paiement unique de <span className="font-bold text-blue-600">10 USD</span> est requis.
              </p>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'mpesa', name: 'M-Pesa', color: 'bg-red-500' },
                  { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
                  { id: 'airtel', name: 'Airtel', color: 'bg-red-600' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id as any)}
                    className={`p-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                      method === m.id ? 'border-blue-600 ring-4 ring-blue-50 bg-blue-50' : 'border-gray-100 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center text-white font-black text-sm shadow-sm`}>
                      {m.name[0]}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">{m.name}</span>
                  </button>
                ))}
              </div>

              {method === 'orange' && (
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 space-y-2">
                  <div className="text-[10px] font-black text-orange-600 uppercase">Numéro de réception</div>
                  <div className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    +243 893 090 186
                  </div>
                  <p className="text-[10px] text-orange-700 font-bold leading-relaxed">
                    Veuillez effectuer le transfert de 10 USD vers ce numéro, puis saisissez votre numéro ci-dessous pour validation.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Numéro de téléphone</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    placeholder="08xxxxxxxx"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-lg font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={handlePayment} 
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-100"
                disabled={!method || phone.length < 10}
              >
                Confirmer le Paiement
              </Button>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-medium text-gray-900">Traitement en cours...</p>
              <p className="text-sm text-gray-500 text-center">
                Veuillez confirmer la transaction sur votre téléphone <span className="font-bold">{phone}</span>.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle2 size={40} />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Paiement réussi !</h4>
              <p className="text-gray-500">Votre site est maintenant débloqué pour l'exportation.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
