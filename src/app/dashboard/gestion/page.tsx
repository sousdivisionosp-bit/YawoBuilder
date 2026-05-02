"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, Box, ShoppingCart, TrendingUp, AlertTriangle, BarChart3,
  Smartphone, Zap, CheckCircle2, ArrowRight, 
  Layout, ShieldCheck, Download, RefreshCw, WifiOff, CreditCard, Plus, Trash2, Save,
  PlayCircle, Bell, Info, Check, Laptop, Image as ImageIcon, Upload,
  Settings as SettingsIcon, Database, Share2, Star, Shield, Building2, Store, Lightbulb,
  QrCode, Copy, X, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ClientAppDashboard from '@/components/gestion/ClientAppDashboard';

type FlowStep = 'landing' | 'config' | 'demo' | 'payment' | 'generation' | 'success' | 'manager';

interface Product {
  id: string;
  name: string;
  stock: number;
  price: string;
  category: string;
}

export default function GestionPage() {
  const [step, setStep] = useState<FlowStep>('landing');
  const [isMobileVendeur, setIsMobileVendeur] = useState(false);
  const [hasApp, setHasApp] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'orange' | 'airtel' | null>(null);
  const [phone, setPhone] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // App Config State
  const [appName, setAppName] = useState('');
  const [appLogo, setAppLogo] = useState<string | null>(null);
  const [currency, setCurrency] = useState('$');
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro' | 'business'>('pro');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [businessType, setBusinessType] = useState('Boutique');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Chemise Slim Fit', stock: 15, price: '25', category: 'Vêtements' },
    { id: '2', name: 'Jean Denim Blue', stock: 8, price: '45', category: 'Vêtements' }
  ]);
  const [appStats, setAppStats] = useState({ revenue: 0, profit: 0, transactions: 0 });
  const [recentSales, setRecentSales] = useState<any[]>([]);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
      
      const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      
      const params = new URLSearchParams(window.location.search);
      if (params.get('app')) {
        setIsMobileVendeur(true);
      }

      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallModal(false);
      }
    } else {
      // Si le prompt natif n'est pas dispo (ex: iPhone), on montre le guide
      setShowInstallModal(true);
    }
  };

  const getAppUrl = () => {
    const slug = appName.toLowerCase().replace(/\s+/g, '-');
    return `${baseUrl}/dashboard/gestion?app=${slug}`;
  };

  useEffect(() => {
    const currentUser = localStorage.getItem('yawo_user_name') || 'DemoUser';
    const configKey = `yawo_app_config_${currentUser}`;
    const dataKey = `yawo_gestion_data_${currentUser}`;
    
    const storedConfig = JSON.parse(localStorage.getItem(configKey) || 'null');
    const storedData = JSON.parse(localStorage.getItem(dataKey) || 'null');
    
    if (storedConfig) {
      setHasApp(true);
      setAppName(storedConfig.appName);
      setAppLogo(storedConfig.appLogo);
      setCurrency(storedConfig.currency);
      setSelectedPlan(storedConfig.selectedPlan);
      setPrimaryColor(storedConfig.primaryColor);
      setBusinessType(storedConfig.businessType);
      setStep('manager');
    }

    if (storedData) {
      const sales = storedData.sales || [];
      const revenue = sales.reduce((acc: number, s: any) => acc + s.totalPrice, 0);
      const profit = sales.reduce((acc: number, s: any) => acc + s.profit, 0);
      setAppStats({
        revenue,
        profit,
        transactions: sales.length
      });
      setRecentSales(sales.slice(0, 5));
    }
  }, []);

  useEffect(() => {
    if (step === 'generation') {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Sauvegarder la config finale
            const currentUser = localStorage.getItem('yawo_user_name') || 'DemoUser';
            const configKey = `yawo_app_config_${currentUser}`;
            localStorage.setItem(configKey, JSON.stringify({
              appName, appLogo, currency, selectedPlan, primaryColor, businessType
            }));
            setTimeout(() => setStep('manager'), 800);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step, appName, appLogo, currency, selectedPlan, primaryColor, businessType]);

  const addProduct = () => {
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      stock: 0,
      price: '',
      category: 'Général'
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAppLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Si c'est un vendeur sur mobile, on affiche l'app directement sans rien d'autre
  if (isMobileVendeur) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] overflow-auto">
        <ClientAppDashboard 
          appName={appName || 'Ma Boutique'} 
          appLogo={appLogo} 
          currency={currency} 
          plan={selectedPlan} 
          primaryColor={primaryColor}
          initialProducts={products} 
          isDemo={false} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 lg:space-y-10 pb-20 px-4 lg:px-0">
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 lg:space-y-10"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">Mon App de Gestion</h2>
                <p className="text-gray-500 mt-2 font-medium">Gérez votre stock, vos ventes et vos produits avec une app PWA sur-mesure.</p>
              </div>
              
              <div className="flex w-full md:w-auto">
                <Button 
                  onClick={() => setStep('config')}
                  className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold transition-all hover:scale-105"
                >
                  Créer mon application
                </Button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-10 items-center bg-white p-6 md:p-12 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
              <div className="space-y-6 lg:space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-xs font-black uppercase tracking-widest">
                  <Zap size={14} className="fill-current" /> Technologie PWA
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                  Votre business dans <span className="text-blue-600">votre poche</span>.
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <WifiOff className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-sm">Mode Offline</h4>
                      <p className="text-gray-500 text-[11px] lg:text-xs font-medium">Travaillez sans connexion, synchronisez plus tard.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                      <Download className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-sm">Installation Rapide</h4>
                      <p className="text-gray-500 text-[11px] lg:text-xs font-medium">S'installe comme une app native sur votre mobile.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button onClick={() => setStep('config')} className="w-full sm:w-auto rounded-2xl h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-100 transition-all">
                    Commencer maintenant
                  </Button>
                </div>
              </div>
              
              <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0">
                  <div className="relative w-full max-w-[280px] lg:max-w-[320px] aspect-[9/19.5] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-white overflow-auto no-scrollbar">
                      <ClientAppDashboard 
                        appName={appName || "Ma Boutique"} 
                        appLogo={appLogo} 
                        currency={currency} 
                        plan={selectedPlan} 
                        primaryColor={primaryColor}
                        initialProducts={products} 
                      />
                    </div>
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-50"></div>
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
            className="flex flex-col lg:grid lg:grid-cols-3 gap-8"
          >
            {/* Editor Side */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm rounded-[24px] lg:rounded-[32px] overflow-hidden">
                <CardHeader className="p-6 lg:p-8 border-b border-gray-50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl lg:text-2xl font-black">Configuration de l'App</CardTitle>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full">Étape 1/2</span>
                  </div>
                </CardHeader>
                <CardContent className="p-6 lg:p-8 space-y-8">
                  {/* Plan Selection */}
                  <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Choisir votre Plan</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { id: 'basic', name: 'Basic', price: '5$', period: '/ 3 mois', icon: <Star size={20} />, color: 'blue', feats: ['Vente', 'Stock simple', 'Offline'] },
                        { id: 'pro', name: 'Pro', price: '15$', period: '', icon: <Shield size={20} />, color: 'indigo', feats: ['Rapports', 'Alertes', 'Multi-utilisateurs'] },
                        { id: 'business', name: 'Business', price: '30$', period: '', icon: <Building2 size={20} />, color: 'purple', feats: ['Multi-boutiques', 'Analyse avancée', 'Support'] },
                      ].map((plan) => (
                        <div 
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id as any)}
                          className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer relative overflow-hidden group ${
                            selectedPlan === plan.id 
                              ? `border-${plan.color === 'blue' ? 'blue-600' : plan.color === 'indigo' ? 'indigo-600' : 'purple-600'} bg-${plan.color === 'blue' ? 'blue-50/50' : plan.color === 'indigo' ? 'indigo-50/50' : 'purple-50/50'}` 
                              : 'border-gray-100 bg-white hover:border-gray-200'
                          }`}
                        >
                          {selectedPlan === plan.id && (
                            <div className={`absolute top-2 right-2 w-5 h-5 bg-${plan.color === 'blue' ? 'blue-600' : plan.color === 'indigo' ? 'indigo-600' : 'purple-600'} rounded-full flex items-center justify-center text-white`}>
                              <Check size={12} strokeWidth={4} />
                            </div>
                          )}
                          <div className={`w-10 h-10 rounded-xl bg-${plan.color === 'blue' ? 'blue-100' : plan.color === 'indigo' ? 'indigo-100' : 'purple-100'} flex items-center justify-center text-${plan.color === 'blue' ? 'blue-600' : plan.color === 'indigo' ? 'indigo-600' : 'purple-600'} mb-4`}>
                            {plan.icon}
                          </div>
                          <div className="font-black text-gray-900">{plan.name}</div>
                          <div className="flex items-baseline gap-1 mb-3">
                            <span className={`text-xl font-black text-${plan.color === 'blue' ? 'blue-600' : plan.color === 'indigo' ? 'indigo-600' : 'purple-600'}`}>{plan.price}</span>
                            <span className="text-[10px] font-bold text-gray-400">{plan.period}</span>
                          </div>
                          <div className="space-y-1">
                            {plan.feats.map((f, i) => (
                              <div key={i} className="flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                                <div className={`w-1 h-1 rounded-full bg-${plan.color === 'blue' ? 'blue-400' : plan.color === 'indigo' ? 'indigo-400' : 'purple-400'}`} /> {f}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start pt-4 border-t border-gray-50">
                    {/* Logo Upload Simulation */}
                    <div className="space-y-2 w-full sm:w-auto">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Logo de l'App</label>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full sm:w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group overflow-hidden"
                      >
                        {appLogo ? (
                          <div className="relative w-full h-full group">
                            <img src={appLogo} alt="Logo" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <RefreshCw size={24} className="text-white animate-spin-slow" />
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload size={24} className="text-gray-300 group-hover:text-blue-500 mb-2" />
                            <span className="text-[10px] font-black text-gray-400 group-hover:text-blue-600 uppercase">Charger</span>
                          </>
                        )}
                      </div>
                      {appLogo && (
                        <button 
                          onClick={() => setAppLogo(null)}
                          className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors w-full text-center mt-2"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Nom de votre application</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Ma Boutique Gestion" 
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-base lg:text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          value={appName}
                          onChange={(e) => setAppName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Type d'activité</label>
                        <select 
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-base lg:text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                        >
                          <option>Boutique</option>
                          <option>Dépôt / Entrepôt</option>
                          <option>Services</option>
                          <option>Restaurant (Stock)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Monnaie de gestion</label>
                        <select 
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-base lg:text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="$">$ (Dollar)</option>
                          <option value="FC">FC (Franc Congolais)</option>
                          <option value="FCFA">FCFA (Franc CFA)</option>
                          <option value="€">€ (Euro)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Couleur Thème</label>
                        <div className="flex flex-wrap gap-2 lg:gap-3 p-2">
                          {[
                            { name: 'Bleu', hex: '#2563eb' },
                            { name: 'Indigo', hex: '#4f46e5' },
                            { name: 'Violet', hex: '#9333ea' },
                            { name: 'Rose', hex: '#db2777' },
                            { name: 'Rouge', hex: '#dc2626' },
                            { name: 'Orange', hex: '#ea580c' },
                            { name: 'Vert', hex: '#16a34a' },
                            { name: 'Noir', hex: '#171717' },
                          ].map((c) => (
                            <button
                              key={c.hex}
                              onClick={() => setPrimaryColor(c.hex)}
                              className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 lg:border-4 transition-all hover:scale-110 ${
                                primaryColor === c.hex ? 'border-gray-300 scale-110' : 'border-transparent'
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Fonctionnalités incluses</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                      {[
                        { icon: <TrendingUp size={18} />, label: "Ventes & Bénéfices", desc: "Suivi en temps réel" },
                        { icon: <Plus size={18} />, label: "Ajout Rapide", desc: "Produits & Stock" },
                        { icon: <AlertTriangle size={18} />, label: "Stock Critique", desc: "Alertes ruptures" },
                        { icon: <BarChart3 size={18} />, label: "Rapports PDF", desc: "Jour/Semaine/Mois" },
                        { icon: <Bell size={18} />, label: "Notifications", desc: "Alertes automatiques" },
                        { icon: <ShieldCheck size={18} />, label: "Sécurité", desc: "Données chiffrées" },
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                            {feat.icon}
                          </div>
                          <div>
                            <div className="text-sm font-black text-gray-900">{feat.label}</div>
                            <div className="text-[10px] text-gray-500 font-bold">{feat.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[24px] lg:rounded-[32px] overflow-hidden">
                <CardHeader className="p-6 lg:p-8 border-b border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-xl lg:text-2xl font-black">Inventaire Initial</CardTitle>
                  <Button onClick={addProduct} variant="outline" className="w-full sm:w-auto rounded-xl border-blue-100 text-blue-600 font-bold hover:bg-blue-50">
                    <Plus size={18} className="mr-2" /> Ajouter un produit
                  </Button>
                </CardHeader>
                <CardContent className="p-4 lg:p-8 space-y-4 lg:space-y-6">
                  {products.map((p) => (
                    <div key={p.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-end p-4 lg:p-6 bg-gray-50 rounded-[20px] lg:rounded-[24px] border border-gray-100 group transition-all hover:shadow-md hover:bg-white">
                      <div className="w-full sm:col-span-5 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase">Désignation</label>
                        <input 
                          type="text" 
                          value={p.name}
                          onChange={(e) => updateProduct(p.id, 'name', e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nom du produit..."
                        />
                      </div>
                      <div className="w-full grid grid-cols-2 sm:contents gap-4">
                        <div className="sm:col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase">Stock</label>
                          <input 
                            type="number" 
                            value={p.stock}
                            onChange={(e) => updateProduct(p.id, 'stock', parseInt(e.target.value) || 0)}
                            className="w-full bg-white border border-gray-100 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="sm:col-span-3 space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase">Prix Vente ($)</label>
                          <input 
                            type="text" 
                            value={p.price}
                            onChange={(e) => updateProduct(p.id, 'price', e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div className="w-full sm:col-span-2">
                        <Button 
                          onClick={() => removeProduct(p.id)}
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

            {/* Preview & Action Side */}
            <div className="space-y-6">
              <div className="lg:sticky lg:top-6 space-y-6">
                <Card className="border-none shadow-xl rounded-[24px] lg:rounded-[32px] bg-gray-900 text-white p-6 lg:p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-600 rounded-[16px] lg:rounded-[20px] flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Smartphone className="w-6 h-6 lg:w-7 lg:h-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg lg:text-xl">Prêt à Générer</h4>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Optimisé pour Mobile</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 lg:space-y-4 pt-4 border-t border-white/10">
                    {[
                      "Tableau de bord Ventes & Stock",
                      "Alertes de Stock Critique",
                      "Rapports PDF téléchargeables",
                      "Système de Notifications"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-white/5 flex items-center justify-center text-green-400"><Check className="w-3.5 h-3.5 lg:w-4 lg:h-4" /></div>
                        <span className="text-xs lg:text-sm font-medium">{text}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => setStep('demo')}
                    disabled={!appName}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl transition-all disabled:opacity-50"
                  >
                    Suivant : Aperçu de l'App
                  </Button>
                </Card>

                <div className="p-6 bg-blue-50 rounded-[24px] lg:rounded-[32px] border border-blue-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
                    <Info size={20} />
                  </div>
                  <p className="text-blue-900 text-xs font-bold leading-relaxed">
                    Une fois le paiement effectué, vous recevrez un lien unique pour installer votre application de gestion directement sur votre écran d'accueil.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'demo' && (
          <motion.div
            key="demo"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-black text-gray-900">Aperçu de votre Application</h2>
              <p className="text-gray-500 font-medium">Voici à quoi ressemblera votre application une fois installée sur votre téléphone. Testez l'interface avant de passer au paiement.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Phone Mockup */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-[340px] aspect-[9/19.5] bg-gray-900 rounded-[3.5rem] border-[10px] border-gray-800 shadow-2xl overflow-hidden ring-1 ring-gray-700">
                  <div className="absolute inset-0 bg-white overflow-auto no-scrollbar">
                    <ClientAppDashboard 
                      appName={appName} 
                      appLogo={appLogo} 
                      currency={currency} 
                      plan={selectedPlan} 
                      primaryColor={primaryColor}
                      initialProducts={products} 
                      isDemo={true} 
                    />
                  </div>
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-3xl z-50 flex items-center justify-center">
                    <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Info & Actions */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 space-y-4">
                    <h4 className="font-black text-blue-900 flex items-center gap-2">
                      <Zap size={20} className="fill-blue-600 text-blue-600" /> 
                      Prête pour l'installation
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Interface personnalisée avec '" + appName + "'",
                        "Gestion des " + products.length + " produits configurés",
                        "Tableau de bord Ventes & Bénéfices activé",
                        "Système de stock critique prêt",
                        "Rapports PDF & Notifications inclus"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-blue-800">
                          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                            <Check size={12} strokeWidth={4} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-gray-100 text-center">
                      <div className="text-2xl font-black text-gray-900">100%</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Responsive</div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-gray-100 text-center">
                      <div className="text-2xl font-black text-gray-900">PWA</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Installable</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={() => setStep('generation')}
                    className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-2xl shadow-2xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Tout est correct, générer mon App (Gratuit pour test)
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => setStep('config')}
                    className="w-full h-14 text-gray-500 font-bold rounded-2xl hover:bg-gray-100"
                  >
                    <ArrowRight size={18} className="mr-2 rotate-180" /> Modifier la configuration
                  </Button>
                </div>
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
                  <h3 className="text-xl font-black">Activation {appName}</h3>
                  <p className="text-gray-400 text-xs uppercase font-black tracking-widest mt-1">Plan {selectedPlan} • Accès Illimité</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-400">
                    {selectedPlan === 'basic' ? '5 USD' : selectedPlan === 'pro' ? '15 USD' : '30 USD'}
                  </div>
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

                {paymentMethod === 'orange' && (
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 space-y-2">
                    <div className="text-[10px] font-black text-orange-600 uppercase">Numéro de réception</div>
                    <div className="text-lg font-black text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                      +243 893 090 186
                    </div>
                    <p className="text-[10px] text-orange-700 font-bold leading-relaxed">
                      Veuillez effectuer le transfert vers ce numéro, puis saisissez votre numéro ci-dessous pour validation.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Votre numéro de téléphone</label>
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
                  <Button variant="ghost" onClick={() => setStep('demo')} className="h-14 px-6 rounded-2xl font-bold">Retour</Button>
                  <Button 
                    disabled={!paymentMethod || phone.length < 10}
                    onClick={() => setStep('generation')}
                    className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-100"
                  >
                    Confirmer le Paiement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'generation' && (
          <motion.div 
            key="generation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-8"
          >
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="text-gray-100 stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50"></circle>
                <circle 
                  className="text-blue-600 stroke-current transition-all duration-300 ease-out" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  fill="transparent" 
                  r="40" cx="50" cy="50"
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * loadingProgress) / 100}
                  transform="rotate(-90 50 50)"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="text-blue-600 animate-pulse" size={32} />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-900">Génération de votre App PWA...</h3>
              <p className="text-gray-500 font-medium max-w-sm">Optimisation des fichiers pour le mode hors-ligne et sécurisation de votre base de données.</p>
            </div>
            <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
              />
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center space-y-10 py-10"
          >
            <div className="w-24 h-24 bg-green-500 rounded-[32px] flex items-center justify-center text-white mx-auto shadow-2xl shadow-green-200 rotate-3">
              <CheckCircle2 size={48} />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gray-900">Votre App est Prête !</h2>
              <p className="text-gray-500 font-medium text-lg">
                Félicitations ! Votre application <span className="text-blue-600 font-bold">{appName}</span> a été générée avec succès.
              </p>
            </div>

            <Card className="border-none shadow-xl rounded-[40px] overflow-hidden bg-gray-900 text-white p-10 relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full blur-[80px] -mr-20 -mt-20 opacity-40"></div>
              <div className="relative z-10 space-y-8">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="p-6 bg-white rounded-3xl text-gray-900 shadow-2xl">
                    <Smartphone size={64} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black">Comment l'installer ?</h4>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">Ouvrez le lien ci-dessous sur votre téléphone, puis utilisez l'option "Ajouter à l'écran d'accueil" de votre navigateur.</p>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4 group cursor-pointer hover:bg-white/10 transition-all">
                  <code className="text-blue-400 font-bold text-sm">app.yawobuild.com/g/{Math.random().toString(36).substr(2, 6)}</code>
                  <Share2 size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-green-400 text-xs font-black uppercase tracking-widest">
                      <WifiOff size={14}/> Mode Offline
                    </div>
                    <p className="text-gray-400 text-[10px] font-medium leading-relaxed">
                      L'application fonctionne sans internet. Vos ventes sont enregistrées localement dans votre téléphone.
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest">
                      <RefreshCw size={14}/> Synchronisation
                    </div>
                    <p className="text-gray-400 text-[10px] font-medium leading-relaxed">
                      Dès que vous retrouvez une connexion, vos données se synchronisent automatiquement avec le serveur.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setStep('landing')}
                className="rounded-2xl h-14 px-8 border-gray-200 font-black text-gray-600"
              >
                Retour au Dashboard
              </Button>
              <Button 
                onClick={() => {
                  const win = window.open('', '_blank');
                  if (win) {
                    win.document.write('<html><head><title>Aperçu App</title></head><body><div id="root"></div></body></html>');
                    // This is a bit complex for a simple preview, let's just show it in a modal or a new state
                  }
                  setStep('landing'); // Just a placeholder
                }}
                className="rounded-2xl h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-100"
              >
                Accéder à mon interface admin
              </Button>
            </div>
          </motion.div>
        )}
        {step === 'manager' && (
          <motion.div
            key="manager"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* Real Installation Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 translate-x-1/2"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="bg-white p-4 rounded-3xl shadow-xl shrink-0">
                  <QrCode size={120} className="text-slate-900" />
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase rounded-full">Mode Test Activé</span>
                    <span className="px-3 py-1 bg-white/20 text-white text-[10px] font-black uppercase rounded-full border border-white/20">Gratuit</span>
                  </div>
                  <h3 className="text-2xl font-black italic">Installez votre App maintenant ! 🚀</h3>
                  <p className="text-blue-100 font-medium max-w-xl">
                    Scannez ce QR Code avec votre téléphone pour ouvrir votre application de gestion personnalisée et l'ajouter à votre écran d'accueil.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleNativeInstall}
                      className="bg-white text-blue-600 hover:bg-blue-50 font-black rounded-xl h-12 px-8 shadow-lg flex items-center gap-2"
                    >
                      <Download size={18} /> Installer sur mon mobile
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => setShowMobilePreview(true)}
                      className="text-white/80 hover:text-white hover:bg-white/10 font-bold rounded-xl h-12 px-6 flex items-center gap-2"
                    >
                      <Smartphone size={18} /> Tester l'aperçu
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
                  {appLogo ? <img src={appLogo} alt="Logo" className="w-full h-full object-cover rounded-2xl" /> : <Store size={28} />}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">{appName}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full border border-green-100">Actif</span>
                    <span className="text-gray-400 text-xs font-medium uppercase tracking-widest">Panel Propriétaire</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-xl border-gray-200 bg-white font-bold text-gray-600 h-12 px-6 flex items-center gap-2">
                  <SettingsIcon size={18} /> Configurer
                </Button>
                <Button 
                  onClick={() => {
                    const currentUser = localStorage.getItem('yawo_user_name') || 'DemoUser';
                    const configKey = `yawo_app_config_${currentUser}`;
                    localStorage.removeItem(configKey);
                    setStep('landing');
                  }}
                  variant="ghost" 
                  className="text-red-500 hover:bg-red-50 font-bold h-12 rounded-xl"
                >
                  Désactiver l'App
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              {/* Analytics & Stats */}
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-6">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Ventes Totales</div>
                      <div className="text-3xl font-black text-gray-900">{appStats.revenue.toFixed(1)}{currency}</div>
                      <div className="text-[10px] font-bold text-green-500 mt-2 flex items-center gap-1">
                        <TrendingUp size={12} /> {appStats.transactions} ventes
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-6">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Profit Net</div>
                      <div className="text-3xl font-black text-blue-600">{appStats.profit.toFixed(1)}{currency}</div>
                      <div className="text-[10px] font-bold text-blue-400 mt-2 flex items-center gap-1">
                        <BarChart3 size={12} /> Marge {appStats.revenue > 0 ? ((appStats.profit / appStats.revenue) * 100).toFixed(0) : 0}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-6">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Transactions</div>
                      <div className="text-3xl font-black text-gray-900">{appStats.transactions}</div>
                      <div className="text-[10px] font-bold text-gray-400 mt-2">Dernières activités</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Live Feed Simulator */}
                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-black text-gray-900 flex items-center gap-3">
                        Activités de Vente
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </CardTitle>
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Voir historique</button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-2">
                    <div className="space-y-6">
                      {recentSales.length > 0 ? (
                        recentSales.map((sale, i) => (
                          <div key={sale.id || i} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                            <div className="flex gap-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs">
                                <ShoppingCart size={18} />
                              </div>
                              <div>
                                <div className="text-sm font-black text-gray-900">{sale.productName}</div>
                                <div className="text-xs text-gray-500 font-medium">Quantité: {sale.quantity} • Vendu par Mobile</div>
                                <div className="text-[9px] text-gray-400 font-bold uppercase mt-1">
                                  {new Date(sale.timestamp).toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-black text-green-600">+{sale.totalPrice}{currency}</div>
                              <div className="text-[9px] font-bold text-blue-500">Marge: {sale.profit.toFixed(1)}{currency}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <WifiOff className="mx-auto text-gray-200 mb-4" size={40} />
                          <p className="text-sm font-bold text-gray-400">Aucune vente synchronisée pour le moment.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-indigo-600 text-white p-8 space-y-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Share2 size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">Lien d'Installation</h3>
                    <p className="text-indigo-100 text-sm mt-2 leading-relaxed">Partagez ce lien avec vos vendeurs pour qu'ils installent l'application sur leur téléphone.</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
                    <div className="text-[10px] font-black uppercase tracking-widest truncate">{getAppUrl().replace('https://', '')}</div>
                    <Button 
                      onClick={() => {
                        navigator.clipboard.writeText(getAppUrl());
                        alert('Lien copié !');
                      }}
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-3 rounded-lg bg-white text-indigo-600 font-black text-[10px]"
                    >
                      COPIER
                    </Button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-black rounded-xl h-12">Ouvrir l'App Web</Button>
                    <p className="text-[9px] text-center text-indigo-200 font-bold uppercase">QR Code disponible dans les paramètres</p>
                  </div>
                </Card>

                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white p-8 space-y-6">
                  <h3 className="text-lg font-black text-gray-900">Conseiller IA</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                      <Lightbulb className="text-yellow-600 shrink-0" size={20} />
                      <p className="text-[11px] text-yellow-800 font-medium">Vos ventes de 'Chemises' ont augmenté de 20%. Envisagez un réapprovisionnement.</p>
                    </div>
                    <div className="flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <Info className="text-blue-600 shrink-0" size={20} />
                      <p className="text-[11px] text-blue-800 font-medium">Le stock de 'Jeans Denim' est critique (8 restants). Alerte envoyée aux vendeurs.</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full h-12 rounded-xl border-gray-100 font-black text-[10px] uppercase tracking-widest">Voir tous les insights</Button>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Mobile Preview */}
      <AnimatePresence>
        {showMobilePreview && (
          <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col">
            <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Smartphone size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">{appName}</h3>
                  <p className="text-[10px] text-blue-400 font-black uppercase">Mode Aperçu Interactif</p>
                </div>
              </div>
              <Button 
                onClick={() => setShowMobilePreview(false)}
                variant="ghost" 
                className="text-white hover:bg-white/10 font-bold"
              >
                Fermer l'App
              </Button>
            </div>
            <div className="flex-1 overflow-hidden relative bg-gray-100 flex justify-center">
              <div className="w-full max-w-[500px] h-full bg-white shadow-2xl">
                <ClientAppDashboard 
                  appName={appName} 
                  appLogo={appLogo} 
                  currency={currency} 
                  plan={selectedPlan} 
                  primaryColor={primaryColor}
                  initialProducts={products} 
                  isDemo={false} 
                />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Installation Instructions Modal */}
      <AnimatePresence>
        {showInstallModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowInstallModal(false)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left Side: QR Code */}
              <div className="bg-slate-50 p-10 flex flex-col items-center justify-center border-r border-slate-100 md:w-5/12">
                <div className="bg-white p-6 rounded-[32px] shadow-2xl mb-6 ring-1 ring-slate-100">
                  <QrCode size={180} className="text-slate-900" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Scannez pour ouvrir</p>
                <div className="mt-8 flex flex-col gap-2 w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl h-12 text-xs">
                    <Smartphone size={16} className="mr-2" /> Ouvrir sur ce PC
                  </Button>
                </div>
              </div>

              {/* Right Side: Instructions */}
              <div className="p-10 flex-1 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Installation Mobile</h2>
                    <p className="text-sm text-slate-500 font-medium">Suivez ces étapes pour installer <span className="text-blue-600 font-bold">{appName}</span></p>
                  </div>
                  <button onClick={() => setShowInstallModal(false)} className="p-2 bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">1</div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-900">Ouvrez le lien sur votre mobile</p>
                      <p className="text-xs text-slate-500 leading-relaxed">Utilisez Chrome (Android) ou Safari (iPhone) pour scanner le QR code ou copier le lien.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">2</div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-900">Ajouter à l'écran d'accueil</p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Sur <span className="font-bold">Android</span>: Cliquez sur les 3 points (⋮) et "Installer l'application".<br/>
                        Sur <span className="font-bold">iPhone</span>: Cliquez sur l'icône Partager (↑) et "Sur l'écran d'accueil".
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">3</div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-900">Lancez votre boutique !</p>
                      <p className="text-xs text-slate-500 leading-relaxed">L'icône apparaîtra sur votre téléphone comme une application native. Vos ventes se synchroniseront ici.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText(getAppUrl());
                      alert('Lien copié !');
                    }}
                    variant="outline" 
                    className="flex-1 rounded-xl border-slate-200 font-bold text-slate-600 h-12 text-xs"
                  >
                    <Copy size={16} className="mr-2" /> Copier le lien
                  </Button>
                  <Button onClick={() => setShowInstallModal(false)} className="flex-1 bg-slate-900 hover:bg-black text-white font-black rounded-xl h-12 text-xs">
                    C'est compris !
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
