"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Package, AlertTriangle, BarChart3, 
  Plus, Download, Bell, ShoppingCart, 
  ArrowUpRight, ArrowDownRight, Search, 
  ChevronRight, MoreVertical, X, CheckCircle2,
  History, DollarSign, Minus, Store, Globe, WifiOff, RefreshCw, Edit2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  stock: number;
  minStock?: number;
  price: number;
  cost?: number;
}

interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  profit: number;
  timestamp: Date;
}

interface ClientAppDashboardProps {
  appName?: string;
  appLogo?: string | null;
  currency?: string;
  plan?: 'basic' | 'pro' | 'business';
  primaryColor?: string;
  initialProducts?: any[];
  isDemo?: boolean;
}

export default function ClientAppDashboard({ 
  appName = "Ma Boutique", 
  appLogo = null,
  currency = "$",
  plan = 'pro',
  primaryColor = '#2563eb',
  initialProducts,
  isDemo = false 
}: ClientAppDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedProductForAdd, setSelectedProductForAdd] = useState<string>('');
  const [addQuantity, setAddQuantity] = useState(5);
  
  // New Product State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    purchasePrice: '',
    stock: '',
    minStock: '5'
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedProductForSale, setSelectedProductForSale] = useState<string>('');
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null);
  const [saleQuantity, setSaleQuantity] = useState(1);

  // Initialize data from props
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts.map(p => ({
        ...p,
        price: parseFloat(p.price) || 0,
        cost: parseFloat(p.price) * 0.6 // Mock cost as 60% of price
      })));
    } else {
      setProducts([
        { id: '1', name: 'Chemise Slim Fit', stock: 15, minStock: 5, price: 25, cost: 15 },
        { id: '2', name: 'Jean Denim Blue', stock: 8, minStock: 5, price: 45, cost: 25 },
        { id: '3', name: 'Veste Cuir Black', stock: 2, minStock: 3, price: 120, cost: 80 },
      ]);
    }
  }, [initialProducts]);

  // Derived Stats
  const salesToday = sales.reduce((acc, s) => acc + s.totalPrice, 0);
  const profitToday = sales.reduce((acc, s) => acc + s.profit, 0);
  const criticalProducts = products.filter(p => p.stock <= (p.minStock || 5));

  const notifications = plan === 'basic' ? [] : products
    .filter(p => p.stock <= (p.minStock || 5))
    .map(p => ({
      id: p.id,
      type: p.stock === 0 ? 'danger' : 'warning',
      message: p.stock === 0 ? `${p.name} est en rupture !` : `${p.name} : Stock faible (${p.stock})`,
      time: 'Maintenant'
    }));

  const handleSale = () => {
    const product = products.find(p => p.id === selectedProductForSale);
    if (!product || product.stock < saleQuantity) return;

    const newSale: Sale = {
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      productName: product.name,
      quantity: saleQuantity,
      totalPrice: product.price * saleQuantity,
      profit: (product.price - (product.cost || 0)) * saleQuantity,
      timestamp: new Date()
    };

    setSales([newSale, ...sales]);
    setProducts(products.map(p => 
      p.id === product.id ? { ...p, stock: p.stock - saleQuantity } : p
    ));
    
    // Simulate sync if online
    if (isOnline) {
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 2000);
    }

    setShowSaleModal(false);
    setSelectedProductForSale('');
    setSaleQuantity(1);
  };

  const handleAddStock = () => {
    if (!selectedProductForAdd) return;

    setProducts(products.map(p => 
      p.id === selectedProductForAdd ? { ...p, stock: p.stock + addQuantity } : p
    ));
    
    setShowAddProductModal(false);
    setSelectedProductForAdd('');
    setAddQuantity(5);
  };

  const handleAddNewProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.purchasePrice) return;

    const p: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      price: parseFloat(newProduct.price) || 0,
      stock: parseInt(newProduct.stock) || 0,
      minStock: parseInt(newProduct.minStock) || 5,
      cost: parseFloat(newProduct.purchasePrice) || 0
    };

    setProducts([...products, p]);
    setShowNewProductModal(false);
    setNewProduct({ name: '', price: '', purchasePrice: '', stock: '', minStock: '5' });
  };

  const handleUpdateProduct = () => {
    if (!selectedProductForEdit) return;

    setProducts(products.map(p => 
      p.id === selectedProductForEdit.id ? selectedProductForEdit : p
    ));
    setShowEditProductModal(false);
    setSelectedProductForEdit(null);
  };

  useEffect(() => {
    if (isOnline && sales.length > 0) {
      setIsSyncing(true);
      const timer = setTimeout(() => setIsSyncing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const handleDownloadReport = () => {
    alert("Génération du rapport PDF pour " + sales.length + " ventes...");
  };

  return (
    <div className="bg-gray-50 h-full font-sans relative flex flex-col overflow-hidden" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      {/* App Header */}
      <header className="text-white p-6 rounded-b-[32px] shadow-lg shrink-0 z-30 transition-colors" style={{ backgroundColor: primaryColor }}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
              {appLogo ? (
                <img src={appLogo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Store size={22} style={{ color: primaryColor }} />
              )}
            </div>
            <div>
              <h1 className="text-lg font-black leading-none truncate max-w-[150px]">{appName}</h1>
              <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Live Demo</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isOnline ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-300 animate-pulse'
              }`}
              title={isOnline ? "En ligne" : "Hors ligne"}
            >
              {isSyncing ? <RefreshCw size={20} className="animate-spin" /> : isOnline ? <Globe size={20} /> : <WifiOff size={20} />}
            </button>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 rounded-full text-[8px] flex items-center justify-center font-bold" style={{ borderColor: primaryColor }}>
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <div className="min-w-[140px] bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
            <div className="text-[10px] font-black opacity-60 uppercase mb-1">Ventes</div>
            <div className="text-xl font-black">{currency}{salesToday.toFixed(1)}</div>
            <div className="text-[9px] font-bold text-green-300 mt-1 flex items-center gap-1">
              <TrendingUp size={10} /> +12.5%
            </div>
          </div>

          {plan !== 'basic' && (
            <div className="min-w-[140px] bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="text-[10px] font-black opacity-60 uppercase mb-1">Bénéfice</div>
              <div className="text-xl font-black">{currency}{profitToday.toFixed(1)}</div>
              <div className="text-[9px] font-bold text-blue-300 mt-1 flex items-center gap-1">
                <BarChart3 size={10} /> Net
              </div>
            </div>
          )}

          {plan !== 'basic' && (
            <div className="min-w-[140px] bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="text-[10px] font-black opacity-60 uppercase mb-1">Alertes</div>
              <div className="text-xl font-black">{criticalProducts.length}</div>
              <div className="text-[9px] font-bold text-orange-300 mt-1 flex items-center gap-1">
                <AlertTriangle size={10} /> Stock bas
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        
        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => setShowSaleModal(true)}
                className="h-20 rounded-2xl shadow-xl text-white flex flex-col items-center justify-center gap-1 transition-all hover:scale-[1.02] active:scale-95 border-none"
                style={{ backgroundColor: primaryColor, boxShadow: `0 10px 25px -5px ${primaryColor}40` }}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <DollarSign size={20} />
                </div>
                <span className="text-[10px] font-black uppercase">Nouvelle Vente</span>
              </Button>
              <Button 
                onClick={() => setShowNewProductModal(true)}
                className="h-20 rounded-2xl bg-white border-none shadow-sm text-gray-900 flex flex-col items-center justify-center gap-1 transition-all hover:bg-gray-50"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                  <Plus size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tight">Nouveau Produit</span>
              </Button>
            </div>

            {/* Recent Sales */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-widest">Ventes Récentes</h3>
                <button className="text-[10px] font-black uppercase" style={{ color: primaryColor }}>Historique</button>
              </div>
              <div className="space-y-3">
                {sales.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-200 text-center space-y-2">
                    <History size={32} className="mx-auto text-gray-300" />
                    <p className="text-xs font-bold text-gray-400 italic">Aucune vente aujourd'hui</p>
                  </div>
                ) : (
                  sales.map(sale => (
                    <div key={sale.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                          <ShoppingCart size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-gray-900">{sale.productName}</h4>
                          <p className="text-[9px] text-gray-400 font-bold">Qté: {sale.quantity} • {sale.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-gray-900">{currency}{sale.totalPrice}</div>
                        <div className="text-[9px] font-bold text-green-500">+{currency}{sale.profit.toFixed(1)}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'stock' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un produit..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {products
                .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(product => (
                <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${
                      product.stock === 0 ? 'bg-red-50 text-red-500' : 
                      product.stock <= (product.minStock || 5) ? 'bg-orange-50 text-orange-500' : 
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {product.stock}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{product.name}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{currency}{product.price} / unité</p>
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Achat: {currency}{product.cost || 0}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedProductForEdit(product);
                      setShowEditProductModal(true);
                    }}
                    className="p-2 bg-gray-50 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Edit2 size={18}/>
                  </button>
                </div>
              ))}
              
              {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <div className="text-center py-10 space-y-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <Search size={24} />
                  </div>
                  <p className="text-gray-500 font-bold">Aucun produit trouvé</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'reports' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-xs uppercase tracking-widest text-gray-900">Performance</h4>
                  <Button variant="outline" size="sm" onClick={handleDownloadReport} className="rounded-xl border-blue-100 text-blue-600 h-8 text-[10px] font-black">
                    <Download size={14} className="mr-1" /> PDF
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-bold">Ventes totales</span>
                    <span className="font-black">{currency}{salesToday.toFixed(1)}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-full" style={{ width: `${Math.min(100, (salesToday / 500) * 100)}%` }}></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-bold">Bénéfice net</span>
                    <span className="font-black text-green-600">{currency}{profitToday.toFixed(1)}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full" style={{ width: `${Math.min(100, (profitToday / (salesToday || 1)) * 100)}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                  <div className="text-center">
                    <div className="text-[9px] font-black text-gray-400 uppercase">Marge Moyenne</div>
                    <div className="text-lg font-black text-blue-600">
                      {salesToday > 0 ? ((profitToday / salesToday) * 100).toFixed(0) : 0}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-black text-gray-400 uppercase">Transactions</div>
                    <div className="text-lg font-black text-gray-900">{sales.length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marges par produit */}
            <div className="space-y-3">
              <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-widest">Marge par produit vendu</h3>
              <div className="space-y-2">
                {Array.from(new Set(sales.map(s => s.productId))).map(pid => {
                  const productSales = sales.filter(s => s.productId === pid);
                  const totalProdProfit = productSales.reduce((acc, s) => acc + s.profit, 0);
                  const totalProdRevenue = productSales.reduce((acc, s) => acc + s.totalPrice, 0);
                  const name = productSales[0].productName;
                  const marginPercent = totalProdRevenue > 0 ? (totalProdProfit / totalProdRevenue) * 100 : 0;

                  return (
                    <div key={pid} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${marginPercent < 0 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                          {marginPercent.toFixed(0)}%
                        </div>
                        <span className="text-xs font-bold text-gray-700">{name}</span>
                      </div>
                      <span className={`text-xs font-black ${totalProdProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {totalProdProfit < 0 ? '-' : '+'}{currency}{Math.abs(totalProdProfit).toFixed(1)}
                      </span>
                    </div>
                  );
                })}
                {sales.length === 0 && (
                  <p className="text-[10px] text-gray-400 italic text-center py-4">Effectuez des ventes pour voir l'analyse des marges</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Navigation Bottom */}
      <nav className="bg-white border-t border-gray-100 p-2 flex justify-around items-center z-40 pb-6 md:pb-2 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] shrink-0">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'home' ? '' : 'text-gray-400'}`}
          style={{ color: activeTab === 'home' ? primaryColor : undefined }}
        >
          <div className="w-12 h-8 rounded-2xl flex items-center justify-center" style={{ backgroundColor: activeTab === 'home' ? `${primaryColor}15` : undefined }}>
            <ShoppingCart size={20} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-tight">Ventes</span>
        </button>
        <button 
          onClick={() => setActiveTab('stock')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'stock' ? '' : 'text-gray-400'}`}
          style={{ color: activeTab === 'stock' ? primaryColor : undefined }}
        >
          <div className="w-12 h-8 rounded-2xl flex items-center justify-center" style={{ backgroundColor: activeTab === 'stock' ? `${primaryColor}15` : undefined }}>
            <Package size={20} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-tight">Stock</span>
        </button>
        {plan !== 'basic' && (
          <button 
            onClick={() => setActiveTab('reports')}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'reports' ? '' : 'text-gray-400'}`}
            style={{ color: activeTab === 'reports' ? primaryColor : undefined }}
          >
            <div className="w-12 h-8 rounded-2xl flex items-center justify-center" style={{ backgroundColor: activeTab === 'reports' ? `${primaryColor}15` : undefined }}>
              <BarChart3 size={20} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tight">Rapports</span>
          </button>
        )}
      </nav>

      {/* Sale Modal */}
      <AnimatePresence>
        {showSaleModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowSaleModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Nouvelle Vente</h2>
                <button onClick={() => setShowSaleModal(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sélectionner Produit</label>
                  <select 
                    value={selectedProductForSale}
                    onChange={(e) => setSelectedProductForSale(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Choisir un article...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id} disabled={p.stock === 0}>
                        {p.name} ({p.stock} en stock) - ${p.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantité</label>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSaleQuantity(Math.max(1, saleQuantity - 1))}
                      className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-200"
                    >
                      <Minus size={20} />
                    </button>
                    <div className="flex-1 text-center text-2xl font-black text-gray-900">{saleQuantity}</div>
                    <button 
                      onClick={() => setSaleQuantity(saleQuantity + 1)}
                      className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-200"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {selectedProductForSale && (
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex justify-between items-center">
                      <span className="text-sm font-bold text-blue-900">Total à payer</span>
                      <span className="text-xl font-black text-blue-600">
                        {currency}{(products.find(p => p.id === selectedProductForSale)?.price || 0) * saleQuantity}
                      </span>
                    </div>

                    {products.find(p => p.id === selectedProductForSale) && (products.find(p => p.id === selectedProductForSale)?.price || 0) < (products.find(p => p.id === selectedProductForSale)?.cost || 0) && (
                      <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3 text-red-600 animate-pulse">
                        <AlertTriangle size={18} />
                        <span className="text-[10px] font-black uppercase">Attention : Vente à perte détectée !</span>
                      </div>
                    )}
                  </div>
                )}

                  <Button 
                    disabled={!selectedProductForSale}
                    onClick={handleSale}
                    className="w-full h-16 text-white font-black text-lg rounded-2xl shadow-xl mt-4 border-none transition-all hover:opacity-90"
                    style={{ backgroundColor: primaryColor, boxShadow: `0 10px 25px -5px ${primaryColor}40` }}
                  >
                    Confirmer la vente
                  </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Product Modal */}
      <AnimatePresence>
        {showNewProductModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowNewProductModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Nouveau Produit</h2>
                <button onClick={() => setShowNewProductModal(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Désignation</label>
                  <input 
                    type="text" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom du produit..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prix d'Achat ({currency})</label>
                    <input 
                      type="number" 
                      value={newProduct.purchasePrice}
                      onChange={(e) => setNewProduct({...newProduct, purchasePrice: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Prix d'achat"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prix Vente ({currency})</label>
                    <input 
                      type="number" 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Prix de vente"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Initial</label>
                    <input 
                      type="number" 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Seuil d'alerte</label>
                    <input 
                      type="number" 
                      value={newProduct.minStock}
                      onChange={(e) => setNewProduct({...newProduct, minStock: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <Button 
                  disabled={!newProduct.name || !newProduct.price}
                  onClick={handleAddNewProduct}
                  className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-100 mt-4 border-none"
                >
                  Créer le produit
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Stock Modal */}
      <AnimatePresence>
        {showAddProductModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddProductModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Réapprovisionner</h2>
                <button onClick={() => setShowAddProductModal(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Produit à réapprovisionner</label>
                  <select 
                    value={selectedProductForAdd}
                    onChange={(e) => setSelectedProductForAdd(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Choisir un article...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} (Actuel: {p.stock})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantité à ajouter</label>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setAddQuantity(Math.max(1, addQuantity - 5))}
                      className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-200"
                    >
                      <Minus size={20} />
                    </button>
                    <div className="flex-1 text-center text-2xl font-black text-gray-900">{addQuantity}</div>
                    <button 
                      onClick={() => setAddQuantity(addQuantity + 5)}
                      className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-200"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <Button 
                  disabled={!selectedProductForAdd}
                  onClick={handleAddStock}
                  className="w-full h-16 bg-green-600 hover:bg-green-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-green-100 mt-4 border-none"
                >
                  Ajouter au stock
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {showEditProductModal && selectedProductForEdit && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowEditProductModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Modifier Produit</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{selectedProductForEdit.name}</p>
                </div>
                <button onClick={() => setShowEditProductModal(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prix d'Achat ({currency})</label>
                    <input 
                      type="number" 
                      value={selectedProductForEdit.cost}
                      onChange={(e) => setSelectedProductForEdit({...selectedProductForEdit, cost: parseFloat(e.target.value) || 0})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prix Vente ({currency})</label>
                    <input 
                      type="number" 
                      value={selectedProductForEdit.price}
                      onChange={(e) => setSelectedProductForEdit({...selectedProductForEdit, price: parseFloat(e.target.value) || 0})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Actuel</label>
                    <input 
                      type="number" 
                      value={selectedProductForEdit.stock}
                      onChange={(e) => setSelectedProductForEdit({...selectedProductForEdit, stock: parseInt(e.target.value) || 0})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Seuil Alerte</label>
                    <input 
                      type="number" 
                      value={selectedProductForEdit.minStock}
                      onChange={(e) => setSelectedProductForEdit({...selectedProductForEdit, minStock: parseInt(e.target.value) || 0})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Marge estimée</span>
                    <span className={`text-xs font-black ${selectedProductForEdit.price - (selectedProductForEdit.cost || 0) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {((selectedProductForEdit.price - (selectedProductForEdit.cost || 0)) / (selectedProductForEdit.price || 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-lg font-black text-blue-900">
                    {currency}{(selectedProductForEdit.price - (selectedProductForEdit.cost || 0)).toFixed(1)} <span className="text-xs font-bold text-blue-400">/ unité</span>
                  </div>
                </div>

                <Button 
                  onClick={handleUpdateProduct}
                  className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-100 mt-4 border-none"
                >
                  Mettre à jour
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notifications Overlay */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-[110] p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Alertes</h2>
              <button onClick={() => setShowNotifications(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle2 size={48} className="mx-auto text-green-500" />
                  <p className="text-sm font-bold text-gray-400">Tout est sous contrôle !</p>
                </div>
              ) : (
                notifications.map(notif => (
                  <div key={notif.id} className={`p-4 rounded-2xl border ${notif.type === 'danger' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-2 h-2 rounded-full ${notif.type === 'danger' ? 'bg-red-500' : 'bg-orange-500'} animate-pulse`} />
                      <span className={`text-[10px] font-black uppercase ${notif.type === 'danger' ? 'text-red-600' : 'text-orange-600'}`}>
                        {notif.type === 'danger' ? 'Rupture' : 'Stock Faible'}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">{notif.message}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
