"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Layout, Zap, Smartphone, Download, Globe, ShieldCheck, 
  ArrowRight, CheckCircle2, UtensilsCrossed, Package, 
  Mail, Lock, User, Eye, EyeOff, Star, Shield, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'authentification
    const nameToStore = authMode === 'signup' ? formData.name : (formData.email.split('@')[0]);
    localStorage.setItem('yawo_auth', 'true');
    localStorage.setItem('yawo_user_name', nameToStore);
    
    // Forcer un petit délai pour être sûr que le storage est prêt (optionnel mais plus sûr)
    setTimeout(() => {
      router.push('/dashboard');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar */}
      <nav className="border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">Y</div>
          <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">YawoBuild</span>
        </motion.div>
        
        <div className="hidden md:flex gap-10 font-semibold text-gray-500">
          <a href="#services" className="hover:text-blue-600 transition-colors relative group">
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors relative group">
            À propos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4"
        >
          <button 
            onClick={() => { setAuthMode('login'); setShowAuth(true); }}
            className="hidden sm:block font-bold text-gray-600 hover:text-blue-600 transition-colors"
          >
            Connexion
          </button>
          <Button 
            onClick={() => { setAuthMode('signup'); setShowAuth(true); }}
            className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold"
          >
            Démarrer
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-[100%] blur-3xl -z-10 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6 border border-blue-100 uppercase tracking-widest">
              Propulsez votre business en Afrique 🌍
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-gray-900">
              YawoBuild : Le futur du <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 italic">digital simplifié.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              La plateforme tout-en-un pour créer, gérer et développer votre présence en ligne. Payez par <span className="text-blue-600 font-black">Mobile Money</span> et lancez-vous en quelques minutes.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <Button 
              onClick={() => { setAuthMode('signup'); setShowAuth(true); }}
              size="lg" 
              className="rounded-full px-10 h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 group w-full sm:w-auto"
            >
              Créer mon compte
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center gap-6 text-sm font-black text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Pas de CB</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Mobile Money OK</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Nos Services Clés</h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Trois outils puissants conçus pour répondre à tous les besoins de votre entreprise.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-100 group transition-all"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Sites Web en quelques clics</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                Configurez votre site web professionnel sans coder. Choisissez un modèle, personnalisez-le et publiez-le instantanément.
              </p>
              <ul className="space-y-3 mb-8">
                {['Modèles modernes', 'Paiement Mobile Money', 'Hébergement inclus'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="p-0 font-black text-blue-600 hover:bg-transparent group">
                En savoir plus <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-100 group transition-all"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                <UtensilsCrossed size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Menu QR & Commandes</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                Digitalisez votre restaurant. Créez un menu QR interactif et recevez vos commandes directement sur WhatsApp ou votre dashboard.
              </p>
              <ul className="space-y-3 mb-8">
                {['QR Code unique', 'Gestion des commandes', 'Menu interactif'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="p-0 font-black text-orange-600 hover:bg-transparent group">
                En savoir plus <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-100 group transition-all"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <Package size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Mon App de Gestion</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                Gérez votre stock, vos ventes et vos bénéfices depuis votre téléphone. Une application PWA qui fonctionne même offline.
              </p>
              <ul className="space-y-3 mb-8">
                {['Suivi des ventes', 'Stock critique', 'Mode Offline & Sync'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="p-0 font-black text-indigo-600 hover:bg-transparent group">
                En savoir plus <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                La mission de <span className="text-blue-600">YawoBuild</span>
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Nous croyons que la technologie doit être accessible à tous les entrepreneurs africains. YawoBuild élimine les barrières techniques et financières pour vous permettre de digitaliser votre activité en un temps record.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-black text-blue-600">100%</div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Adapté au marché local</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black text-blue-600">24/7</div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Support technique</div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-600/5 rounded-[40px] blur-2xl"></div>
              <div className="relative bg-gray-900 rounded-[40px] p-8 aspect-video flex items-center justify-center text-white overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                    <Zap size={40} className="text-blue-400 fill-blue-400" />
                  </div>
                  <p className="font-black text-xl">Innover pour demain</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {showAuth && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuth(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-12">
                <div className="text-center mb-10 space-y-2">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-200 mx-auto mb-6">Y</div>
                  <h2 className="text-3xl font-black text-gray-900">
                    {authMode === 'login' ? 'Bienvenue à nouveau' : 'Rejoignez YawoBuild'}
                  </h2>
                  <p className="text-gray-500 font-medium">
                    {authMode === 'login' ? 'Connectez-vous pour gérer vos projets' : 'Commencez à digitaliser votre business aujourd\'hui'}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                  {authMode === 'signup' && (
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nom complet</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Jean Dupont"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="email" 
                        required
                        placeholder="nom@exemple.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Mot de passe</label>
                      {authMode === 'login' && (
                        <button type="button" className="text-[10px] font-black text-blue-600 uppercase">Oublié ?</button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-100 transition-all hover:scale-[1.02] active:scale-95 border-none"
                  >
                    {authMode === 'login' ? 'Se connecter' : 'Créer mon compte'}
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm font-bold text-gray-500">
                    {authMode === 'login' ? 'Pas encore de compte ?' : 'Déjà un compte ?'}{' '}
                    <button 
                      onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                      className="text-blue-600 font-black hover:underline"
                    >
                      {authMode === 'login' ? 'Inscrivez-vous' : 'Connectez-vous'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">Y</div>
            <span className="text-xl font-black tracking-tight text-gray-900">YawoBuild</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-blue-600 transition-colors">CGU</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <p className="text-sm font-bold text-gray-400">© 2026 YawoBuild. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
