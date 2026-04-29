"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  QrCode, UtensilsCrossed, Smartphone, Zap, 
  CheckCircle2, ArrowRight, Layout, ClipboardList, 
  ChefHat, Store, Users, ShoppingBag, X, Loader2, CreditCard,
  Plus, Image as ImageIcon, Trash2, Save, Globe, Rocket,
  Camera, Link as LinkIcon, Grid2X2, Download, ShoppingCart,
  PlayCircle, Bell, Clock, Info, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FlowStep = 'landing' | 'config' | 'demo' | 'payment' | 'processing' | 'success';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string;
}

interface DemoOrder {
  id: string;
  table: string;
  items: MenuItem[];
  timestamp: Date;
  status: 'pending' | 'accepted' | 'ready';
}

export default function RestaurantPage() {
  const [step, setStep] = useState<FlowStep>('landing');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'orange' | 'airtel' | null>(null);
  const [phone, setPhone] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Restaurant Config State
  const [restauName, setRestauName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [tableCount, setTableCount] = useState(5);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Salade César', price: '12', category: 'Entrées', imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=150&q=80' },
    { id: '2', name: 'Burger Maison', price: '18', category: 'Plats', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80' }
  ]);

  // Demo State
  const [demoSubStep, setDemoSubStep] = useState(1);
  const [demoOrderItems, setDemoOrderItems] = useState<MenuItem[]>([]);
  const [demoOrdersQueue, setDemoOrdersQueue] = useState<DemoOrder[]>([
    {
      id: 'demo-1',
      table: '03',
      items: [{ id: '1', name: 'Salade César', price: '12', category: 'Entrées', imageUrl: '' }],
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 15),
      status: 'accepted'
    },
    {
      id: 'demo-2',
      table: '12',
      items: [{ id: '2', name: 'Burger Maison', price: '18', category: 'Plats', imageUrl: '' }],
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 5),
      status: 'accepted'
    }
  ]);
  const [isAcceptedByRestau, setIsAcceptedByRestau] = useState(false);

  useEffect(() => {
    if (step === 'processing') {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('success'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      price: '',
      category: 'Plats',
      imageUrl: ''
    };
    setMenuItems([...menuItems, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const updateMenuItem = (id: string, field: keyof MenuItem, value: string) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Generate QR Code URL using QR Server API
  const getQrUrl = (tableNum: number) => {
    const baseUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=`;
    const payload = JSON.stringify({
      restaurant: restauName || 'Restaurant',
      table: tableNum
    });
    return `${baseUrl}${encodeURIComponent(payload)}`;
  };

  const handleAcceptOrder = () => {
    setIsAcceptedByRestau(true);
    const newOrder: DemoOrder = {
      id: Math.random().toString(36).substr(2, 9),
      table: '05',
      items: [...demoOrderItems],
      timestamp: new Date(),
      status: 'accepted'
    };
    // Add to queue (chronological order: newest at the end)
    setDemoOrdersQueue(prev => [...prev, newOrder]);
  };

  const handleCompleteOrder = (orderId: string) => {
    setDemoOrdersQueue(prev => prev.filter(o => o.id !== orderId));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Menu QR Intelligent</h2>
                <p className="text-gray-500 mt-2 font-medium">Configurez votre restaurant gratuitement. Payez uniquement pour publier.</p>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => setStep('demo')}
                  className="flex items-center gap-2 rounded-xl h-12 px-6 border-blue-200 text-blue-600 font-bold transition-all hover:bg-blue-50"
                >
                  <PlayCircle size={18} /> Voir Démo
                </Button>
                <Button 
                  onClick={() => setStep('config')}
                  className="flex items-center gap-2 rounded-xl h-12 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold transition-all hover:scale-105"
                >
                  Configurer mon restaurant (Gratuit)
                </Button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-10 items-center bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
              <div className="space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-600 text-xs font-black uppercase tracking-widest">
                  <CheckCircle2 size={14} className="fill-current" /> Configuration Gratuite
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                  Créez votre menu <span className="text-blue-600">aujourd'hui</span>.
                </h3>
                <p className="text-gray-500 font-medium text-lg leading-relaxed">
                  Prenez le temps de configurer vos plats, prix et visuels. L'abonnement de 10$ ne sera requis qu'au moment où vous déciderez de mettre votre menu en ligne.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button onClick={() => setStep('config')} className="rounded-2xl h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-100 transition-all">
                    Commencer la configuration
                  </Button>
                  <Button onClick={() => setStep('demo')} variant="outline" className="rounded-2xl h-14 px-8 border-gray-200 font-black text-gray-600 hover:bg-gray-50 transition-all">
                    Voir comment ça marche
                  </Button>
                </div>
              </div>
              
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[320px] aspect-[9/16] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-white flex items-center justify-center p-8 text-center">
                    <div>
                      <Store size={48} className="text-gray-200 mx-auto mb-4" />
                      <p className="text-gray-400 font-bold text-sm">Votre futur menu s'affichera ici pendant la configuration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Editor Side */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-black">Identité du Restaurant</CardTitle>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full">Mode Édition</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Nom de l'établissement</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Chez Flore" 
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      value={restauName}
                      onChange={(e) => setRestauName(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <ImageIcon size={14} /> Logo du Restaurant (URL)
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <LinkIcon size={18} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="https://image.com/logo.png" 
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          value={logoUrl}
                          onChange={(e) => setLogoUrl(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Camera size={14} /> Couverture (URL)
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <LinkIcon size={18} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="https://image.com/banner.jpg" 
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          value={coverUrl}
                          onChange={(e) => setCoverUrl(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Table Management Section */}
              <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-black">Gestion des Tables & QR</CardTitle>
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
                      <Grid2X2 size={16} className="text-blue-600" />
                      <span className="text-blue-700 font-bold text-sm">{tableCount} Tables</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="flex-1 space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Nombre de tables</label>
                      <input 
                        type="number" 
                        min="1"
                        max="50"
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={tableCount}
                        onChange={(e) => setTableCount(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="pt-6">
                      <p className="text-gray-400 text-sm font-medium max-w-[200px]">
                        Un QR Code unique sera généré pour chaque table automatiquement.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
                    {Array.from({ length: Math.min(tableCount, 10) }).map((_, i) => (
                      <div key={i} className="group relative aspect-square bg-white border border-gray-100 rounded-[24px] p-3 flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:shadow-md transition-all">
                        <img 
                          src={getQrUrl(i + 1)} 
                          alt={`QR Table ${i + 1}`} 
                          className="w-full h-auto rounded-lg"
                        />
                        <span className="text-[10px] font-black text-gray-400 uppercase">Table {i + 1}</span>
                        <div className="absolute inset-0 bg-blue-600/90 rounded-[24px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                          <Download size={24} className="text-white" />
                        </div>
                      </div>
                    ))}
                    {tableCount > 10 && (
                      <div className="aspect-square bg-gray-50 rounded-[24px] border border-dashed border-gray-200 flex items-center justify-center text-center p-4">
                        <p className="text-xs font-bold text-gray-400">+{tableCount - 10} autres tables...</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-black">Carte du Menu</CardTitle>
                  <Button onClick={addMenuItem} variant="outline" className="rounded-xl border-blue-100 text-blue-600 font-bold hover:bg-blue-50">
                    <Plus size={18} className="mr-2" /> Ajouter un plat
                  </Button>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {menuItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-6 bg-gray-50 rounded-[24px] border border-gray-100 group transition-all hover:shadow-md hover:bg-white">
                      <div className="col-span-5 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase">Nom du plat</label>
                        <input 
                          type="text" 
                          value={item.name}
                          onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nom du plat..."
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase">Prix ($)</label>
                        <input 
                          type="text" 
                          value={item.price}
                          onChange={(e) => updateMenuItem(item.id, 'price', e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="col-span-4 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase">Image du plat (URL)</label>
                        <div className="relative">
                          <ImageIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input 
                            type="text" 
                            value={item.imageUrl}
                            onChange={(e) => updateMenuItem(item.id, 'imageUrl', e.target.value)}
                            className="w-full pl-9 bg-white border border-gray-100 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="URL de l'image..."
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button 
                          onClick={() => removeMenuItem(item.id)}
                          variant="ghost" 
                          className="w-full text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl h-[46px]"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Preview Side */}
            <div className="space-y-6">
              <div className="sticky top-6 space-y-6">
                <div className="relative w-full aspect-[9/16] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden flex flex-col">
                  <div className="flex-1 bg-white overflow-y-auto">
                    {/* Cover Preview */}
                    <div className="h-40 bg-gray-100 relative overflow-hidden">
                      {coverUrl ? (
                        <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <ImageIcon size={32} className="text-gray-200" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30"></div>
                      
                      {/* Logo Preview */}
                      <div className="absolute top-4 left-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-lg overflow-hidden flex items-center justify-center">
                          {logoUrl ? (
                            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                          ) : (
                            <Store size={20} className="text-gray-300" />
                          )}
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-black text-lg drop-shadow-md">{restauName || 'Nom du Resto'}</h4>
                        <p className="text-[10px] font-bold opacity-90 uppercase tracking-widest drop-shadow-md">Table n° 01</p>
                      </div>
                    </div>

                    <div className="p-4 space-y-6">
                      <div className="space-y-3">
                        {menuItems.map((item) => (
                          <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-50 items-center">
                            <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <UtensilsCrossed size={20} className="text-gray-100" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">{item.name || 'Nouveau plat...'}</p>
                              <p className="text-xs text-blue-600 font-black">{item.price ? `${item.price}$` : '--'}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] flex-shrink-0 shadow-lg shadow-blue-100">+</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Customer Action Bar (Preview) */}
                  <div className="p-4 bg-white border-t border-gray-50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                    <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black flex items-center justify-between px-6 transition-transform active:scale-95">
                      <div className="flex items-center gap-2">
                        <ShoppingCart size={18} />
                        <span className="text-sm">Ma Commande</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg">
                        <span className="text-xs">Valider</span>
                        <ArrowRight size={14} />
                      </div>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => setStep('demo')}
                    className="w-full h-12 rounded-2xl border-blue-100 text-blue-600 font-bold hover:bg-blue-50 transition-all"
                  >
                    <PlayCircle size={18} className="mr-2" /> Tester le flux complet
                  </Button>

                  <Card className="border-none shadow-xl rounded-[32px] bg-blue-600 text-white p-8 space-y-6">
                    <div className="space-y-2 text-center">
                      <p className="text-blue-100 text-xs font-black uppercase tracking-widest">Prêt à lancer ?</p>
                      <h4 className="text-2xl font-black">Publier mon Menu QR</h4>
                      <p className="text-blue-100 text-sm font-medium">L'activation coûte seulement 10$ pour 3 mois.</p>
                    </div>
                    <Button 
                      onClick={() => setStep('payment')}
                      className="w-full h-14 bg-white text-blue-600 hover:bg-blue-50 font-black text-lg rounded-2xl shadow-lg"
                    >
                      <Rocket size={20} className="mr-2" /> Publier & Payer 10$
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'demo' && (
          <motion.div 
            key="demo"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-gray-900">Démo Interactive</h2>
                <p className="text-gray-500 font-medium">Découvrez comment le client commande et comment vous recevez.</p>
              </div>
              <Button variant="ghost" onClick={() => setStep('config')} className="rounded-xl font-bold">Quitter la démo</Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left: Customer Experience */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-2xl text-blue-700 w-fit">
                  <Smartphone size={20} />
                  <span className="font-black text-sm uppercase tracking-widest">Côté Client (Mobile)</span>
                </div>

                <div className="relative mx-auto w-[280px] aspect-[9/16] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden flex flex-col">
                  {demoSubStep === 1 && (
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
                      <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 animate-bounce">
                        <QrCode size={40} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-black text-xl">Scannez le QR</h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">Le client arrive, scanne le code sur sa table et le menu s'ouvre instantanément.</p>
                      </div>
                      <Button onClick={() => setDemoSubStep(2)} className="w-full bg-blue-600 font-black rounded-xl">Simuler le scan</Button>
                    </div>
                  )}

                  {demoSubStep === 2 && (
                    <div className="flex-1 bg-white flex flex-col overflow-hidden">
                      <div className="h-32 bg-gray-100 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                          <h4 className="text-white font-black text-sm">Chez Flore - Table 05</h4>
                        </div>
                      </div>
                      <div className="p-4 flex-1 space-y-3 overflow-y-auto">
                        {menuItems.map(item => (
                          <div key={item.id} className="flex gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100 items-center">
                            <img src={item.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="flex-1 text-[10px] font-bold truncate">{item.name}</div>
                            <Button 
                              size="sm" 
                              onClick={() => setDemoOrderItems([...demoOrderItems, item])}
                              className="h-6 w-6 p-0 rounded-full bg-blue-600 text-white"
                            >
                              +
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-white border-t border-gray-100">
                        <Button 
                          disabled={demoOrderItems.length === 0}
                          onClick={() => setDemoSubStep(3)}
                          className="w-full h-10 bg-blue-600 font-black rounded-lg text-xs flex justify-between px-4"
                        >
                          <span>{demoOrderItems.length} articles</span>
                          <span>Commander</span>
                        </Button>
                      </div>
                    </div>
                  )}

                  {demoSubStep === 3 && (
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
                      <div className={`w-20 h-20 ${isAcceptedByRestau ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'} rounded-[2rem] flex items-center justify-center transition-colors duration-500`}>
                        {isAcceptedByRestau ? <ChefHat size={40} className="animate-pulse" /> : <CheckCircle2 size={40} />}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-black text-xl">{isAcceptedByRestau ? 'Commande Reçue !' : 'Commande Envoyée !'}</h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">
                          {isAcceptedByRestau 
                            ? "Votre commande est en préparation. Elle vous sera servie dans quelques instants." 
                            : "Le restaurant vient de recevoir votre commande sur son écran."}
                        </p>
                      </div>
                      <div className="w-full p-4 bg-gray-50 rounded-2xl text-left space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex justify-between">
                          <span>Résumé</span>
                          {isAcceptedByRestau && <span className="text-orange-600 animate-pulse">● En préparation</span>}
                        </p>
                        {demoOrderItems.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-xs font-bold">
                            <span>1x {it.name}</span>
                            <span>{it.price}$</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Owner Dashboard Experience */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-6 py-3 bg-purple-50 rounded-2xl text-purple-700 w-fit">
                  <Layout size={20} />
                  <span className="font-black text-sm uppercase tracking-widest">Côté Restaurateur (Dashboard)</span>
                </div>

                <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                  <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Bell size={20} className={(demoSubStep === 3 && !isAcceptedByRestau) ? "text-yellow-400 animate-pulse" : "text-gray-500"} />
                      <span className="font-black text-sm">Gestion des Commandes</span>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black uppercase rounded-full border border-green-500/30">En Direct</div>
                  </div>

                  <div className="p-6 flex-1 space-y-6 overflow-y-auto">
                    {/* Incoming Order (Alert) */}
                    {demoSubStep === 3 && !isAcceptedByRestau && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-blue-600 text-white rounded-[24px] shadow-lg shadow-blue-200 space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">05</div>
                            <div>
                              <h4 className="font-black text-sm">Nouvelle Commande</h4>
                              <p className="text-blue-100 text-[10px] font-bold">Table n° 05 • À l'instant</p>
                            </div>
                          </div>
                          <div className="p-2 bg-white/10 rounded-lg">
                            <Zap size={16} className="text-yellow-300 fill-current" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          {demoOrderItems.map((it, idx) => (
                            <div key={idx} className="flex justify-between text-xs font-bold bg-white/10 p-2 rounded-lg">
                              <span>1x {it.name}</span>
                              <span>{it.price}$</span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          onClick={handleAcceptOrder}
                          className="w-full bg-white text-blue-600 hover:bg-blue-50 font-black rounded-xl h-11"
                        >
                          Accepter & Lancer en cuisine
                        </Button>
                      </motion.div>
                    )}

                    {/* Orders Queue */}
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">File d'attente ({demoOrdersQueue.length})</h5>
                      <div className="space-y-3">
                        {demoOrdersQueue.length === 0 && demoSubStep < 3 && (
                          <div className="py-20 text-center opacity-30 flex flex-col items-center gap-3">
                            <ClipboardList size={40} className="text-gray-300" />
                            <p className="text-xs font-bold text-gray-400">Aucune commande en cours</p>
                          </div>
                        )}
                        <AnimatePresence>
                          {demoOrdersQueue.map((order, idx) => (
                            <motion.div 
                              key={order.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center font-black text-gray-900 shadow-sm">
                                  {order.table}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h6 className="font-black text-sm text-gray-900">Table {order.table}</h6>
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black rounded-full uppercase">En cours</span>
                                  </div>
                                  <p className="text-[10px] text-gray-400 font-bold">
                                    {order.items.length} articles • {order.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-right mr-3">
                                  <p className="text-xs font-black text-gray-900">{order.items.reduce((acc, it) => acc + parseFloat(it.price || '0'), 0)}$</p>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleCompleteOrder(order.id)}
                                  className="h-8 w-8 p-0 rounded-full text-green-500 hover:bg-green-50"
                                >
                                  <Check size={18} />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                {isAcceptedByRestau && (
                  <Card className="p-8 bg-blue-600 text-white border-none rounded-[32px] shadow-2xl shadow-blue-100 flex flex-col items-center text-center space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black">Convaincu ?</h4>
                      <p className="text-blue-100 text-sm font-medium">Activez votre restaurant pour commencer à recevoir des commandes réelles dès aujourd'hui.</p>
                    </div>
                    <Button 
                      onClick={() => setStep('payment')}
                      className="w-full h-14 bg-white text-blue-600 hover:bg-blue-50 font-black text-lg rounded-2xl shadow-lg"
                    >
                      <Rocket size={20} className="mr-2" /> Publier & Payer 10$
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div 
            key="payment"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto py-10"
          >
            <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden">
              <div className="bg-gray-900 p-8 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black">Activation {restauName}</h3>
                  <p className="text-gray-400 text-xs uppercase font-black tracking-widest mt-1">Pack 3 Mois</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-400">10 USD</div>
                </div>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'mpesa', name: 'M-Pesa', color: 'bg-red-500' },
                    { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
                    { id: 'airtel', name: 'Airtel', color: 'bg-red-600' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-4 border rounded-2xl flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === m.id ? 'border-blue-600 ring-4 ring-blue-50 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center text-white font-black text-sm shadow-sm`}>
                        {m.name[0]}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">{m.name}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Numéro de téléphone</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      placeholder="08xxxxxxxx"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-lg font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep('config')} className="h-14 px-6 rounded-2xl font-bold">Retour</Button>
                  <Button 
                    onClick={() => setStep('processing')}
                    disabled={!paymentMethod || phone.length < 10}
                    className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-100 transition-all active:scale-95"
                  >
                    Confirmer le paiement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto py-20 text-center space-y-8"
          >
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="text-gray-100 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                <circle 
                  className="text-blue-600 stroke-current transition-all duration-300" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * loadingProgress) / 100}
                  transform="rotate(-90 50 50)"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="text-blue-600 animate-spin" size={32} />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-900">Mise en ligne de votre menu...</h3>
              <p className="text-gray-500 font-medium">Vérification de la transaction sur votre téléphone.</p>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto py-10"
          >
            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white border border-gray-100 text-center p-12 space-y-8">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[32px] flex items-center justify-center mx-auto shadow-xl shadow-green-100">
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-gray-900">Félicitations ! 🚀</h2>
                <p className="text-gray-500 font-medium text-lg">Votre restaurant <strong>{restauName}</strong> est désormais en ligne pour 3 mois.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <Card className="p-6 bg-blue-50 border-blue-100 rounded-3xl">
                  <QrCode className="text-blue-600 mb-3" size={24} />
                  <h4 className="font-black text-blue-900 text-sm">Télécharger mes QR</h4>
                  <p className="text-blue-700 text-xs mt-1">Imprimez vos codes pour chaque table.</p>
                </Card>
                <Card className="p-6 bg-purple-50 border-purple-100 rounded-3xl">
                  <Globe className="text-purple-600 mb-3" size={24} />
                  <h4 className="font-black text-purple-900 text-sm">Lien Direct</h4>
                  <p className="text-purple-700 text-xs mt-1">Partagez votre menu sur vos réseaux sociaux.</p>
                </Card>
              </div>

              <Button 
                onClick={() => setStep('landing')}
                className="w-full h-16 rounded-[24px] bg-gray-900 hover:bg-black text-white font-black text-lg transition-all"
              >
                Gérer mes commandes en direct
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
