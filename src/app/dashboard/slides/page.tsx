"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Presentation, Layout, Plus, Trash2, ChevronLeft, ChevronRight, 
  Download, Sparkles, Image as ImageIcon, Type, Palette, 
  PlayCircle, Save, CheckCircle2, Zap, Smartphone, ArrowRight,
  Info, CreditCard, Share2, Upload, RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SlidePreview from '@/components/slides/SlidePreview';

type FlowStep = 'landing' | 'editor' | 'payment' | 'export';

interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  layout: 'text-only' | 'split' | 'title-only';
}

export default function SlidesPage() {
  const [step, setStep] = useState<FlowStep>('landing');
  const [slides, setSlides] = useState<Slide[]>([
    { id: '1', title: 'Mon Super Projet', content: 'Une présentation générée avec YawoSlides.', layout: 'title-only' },
    { id: '2', title: 'Le Problème', content: 'Aujourd\'hui, créer des présentations prend trop de temps.', layout: 'split', image: null },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [isGeneratingIA, setIsGeneratingIA] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSlide = () => {
    const newSlide: Slide = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      content: '',
      layout: 'text-only'
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const updateSlide = (field: keyof Slide, value: any) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = { ...newSlides[currentSlideIndex], [field]: value };
    setSlides(newSlides);
  };

  const removeSlide = (id: string) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter(s => s.id !== id);
    setSlides(newSlides);
    setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
  };

  const generateAIImage = () => {
    setIsGeneratingIA(true);
    // Simulation d'appel API IA
    setTimeout(() => {
      const mockImages = [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
      ];
      updateSlide('image', mockImages[Math.floor(Math.random() * mockImages.length)]);
      setIsGeneratingIA(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSlide('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startExport = () => {
    setStep('export');
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-10 pb-20 px-4 lg:px-0">
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">Présentation Projet</h2>
                <p className="text-gray-500 mt-2 font-medium">Générez des slides professionnelles (.pptx) en quelques minutes avec l'IA.</p>
              </div>
              <Button 
                onClick={() => setStep('editor')}
                className="flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold transition-all hover:scale-105"
              >
                Créer une présentation
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center bg-white p-6 lg:p-12 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
              <div className="space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-xs font-black uppercase tracking-widest">
                  <Sparkles size={14} className="fill-current" /> Propulsé par l'IA
                </div>
                <h3 className="text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1]">
                  Fini le temps perdu sur <span className="text-blue-600">PowerPoint</span>.
                </h3>
                <p className="text-gray-500 font-medium text-lg">
                  YawoSlides transforme vos idées en présentations élégantes. Générez des images par IA, choisissez votre style et téléchargez le fichier .pptx prêt à l'emploi.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: <Zap size={20}/>, title: "Génération Rapide", desc: "Moins de 5 min" },
                    { icon: <Sparkles size={20}/>, title: "Images IA", desc: "Création automatique" },
                    { icon: <Download size={20}/>, title: "Format PPTX", desc: "Compatible Office" },
                    { icon: <Smartphone size={20}/>, title: "Éditeur Mobile", desc: "Créez partout" },
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        {feat.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-sm">{feat.title}</h4>
                        <p className="text-gray-500 text-xs font-medium">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={() => setStep('editor')} className="w-full sm:w-auto rounded-2xl h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-100 transition-all">
                  Commencer mon projet
                </Button>
              </div>
              <div className="hidden lg:block relative rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-video bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2">
                  <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
                    <Presentation size={64} className="text-blue-100" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 aspect-video w-2/3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2 -rotate-6">
                   <div className="w-full h-full bg-blue-600 rounded-xl flex items-center justify-center">
                    <Sparkles size={32} className="text-white opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'editor' && (
          <motion.div
            key="editor"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col lg:grid lg:grid-cols-12 gap-8"
          >
            {/* Toolbar / Config */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="border-none shadow-sm rounded-[24px] lg:rounded-[32px] overflow-hidden">
                <CardHeader className="p-6 border-b border-gray-50">
                  <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Palette size={20} className="text-blue-600" /> Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Couleur Principale</label>
                    <div className="flex flex-wrap gap-2">
                      {['#2563eb', '#4f46e5', '#9333ea', '#db2777', '#dc2626', '#ea580c', '#16a34a', '#171717'].map(color => (
                        <button
                          key={color}
                          onClick={() => setPrimaryColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${primaryColor === color ? 'border-gray-300 scale-110' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Typographie</label>
                    <select 
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none"
                    >
                      <option value="sans-serif">Moderne (Sans)</option>
                      <option value="serif">Élégant (Serif)</option>
                      <option value="monospace">Technique (Mono)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[24px] lg:rounded-[32px] overflow-hidden">
                <CardHeader className="p-6 border-b border-gray-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-black">Contenu Slide</CardTitle>
                  <span className="text-xs font-bold text-gray-400">{currentSlideIndex + 1} / {slides.length}</span>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Mise en page</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'title-only', icon: <Type size={18}/>, label: 'Titre' },
                        { id: 'text-only', icon: <Layout size={18}/>, label: 'Texte' },
                        { id: 'split', icon: <Plus size={18}/>, label: 'Image' },
                      ].map(l => (
                        <button
                          key={l.id}
                          onClick={() => updateSlide('layout', l.id)}
                          className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${slides[currentSlideIndex].layout === l.id ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-50 bg-gray-50 text-gray-400'}`}
                        >
                          {l.icon}
                          <span className="text-[10px] font-black uppercase">{l.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Titre</label>
                      <input 
                        type="text"
                        value={slides[currentSlideIndex].title}
                        onChange={(e) => updateSlide('title', e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Titre de la slide..."
                      />
                    </div>
                    {slides[currentSlideIndex].layout !== 'title-only' && (
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Description</label>
                        <textarea 
                          rows={4}
                          value={slides[currentSlideIndex].content}
                          onChange={(e) => updateSlide('content', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Détaillez votre idée..."
                        />
                      </div>
                    )}

                    {slides[currentSlideIndex].layout === 'split' && (
                      <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Média</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            onClick={generateAIImage}
                            disabled={isGeneratingIA}
                            variant="outline" 
                            className="h-20 rounded-xl border-blue-100 flex flex-col gap-1 hover:bg-blue-50"
                          >
                            {isGeneratingIA ? <RefreshCw size={18} className="animate-spin text-blue-600" /> : <Sparkles size={18} className="text-blue-600" />}
                            <span className="text-[10px] font-black uppercase">Générer IA</span>
                          </Button>
                          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                          <Button 
                            onClick={() => fileInputRef.current?.click()}
                            variant="outline" 
                            className="h-20 rounded-xl border-gray-100 flex flex-col gap-1"
                          >
                            <Upload size={18} className="text-gray-400" />
                            <span className="text-[10px] font-black uppercase text-gray-500">Upload</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex justify-between gap-4">
                    <Button 
                      onClick={() => removeSlide(slides[currentSlideIndex].id)}
                      disabled={slides.length <= 1}
                      variant="ghost" 
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl px-4"
                    >
                      <Trash2 size={18} />
                    </Button>
                    <Button 
                      onClick={addSlide}
                      className="flex-1 bg-gray-900 hover:bg-black text-white rounded-xl font-bold"
                    >
                      Nouvelle Slide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Side */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-gray-900 rounded-[32px] p-4 lg:p-12 shadow-2xl relative group overflow-hidden aspect-video flex flex-col">
                <div className="flex-1 relative rounded-2xl overflow-hidden bg-white shadow-inner">
                   <SlidePreview 
                    slides={slides} 
                    currentIndex={currentSlideIndex} 
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                   />
                </div>
                
                {/* Controls Overlay */}
                <div className="flex justify-between items-center mt-6">
                   <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                      className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-20"
                      disabled={currentSlideIndex === 0}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                      className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-20"
                      disabled={currentSlideIndex === slides.length - 1}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest hidden sm:block">Aperçu en temps réel</span>
                    <Button 
                      onClick={() => setStep('payment')}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 font-black shadow-lg shadow-blue-500/20"
                    >
                      Générer le PPTX
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`min-w-[120px] aspect-video rounded-xl border-2 transition-all overflow-hidden relative ${currentSlideIndex === i ? 'border-blue-600 scale-105 shadow-lg' : 'border-transparent bg-white opacity-60 hover:opacity-100'}`}
                  >
                    <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-2">
                      <div className="text-[6px] font-black text-gray-400 text-center uppercase truncate w-full">{s.title || `Slide ${i+1}`}</div>
                    </div>
                  </button>
                ))}
                <button 
                  onClick={addSlide}
                  className="min-w-[120px] aspect-video rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-all"
                >
                  <Plus size={20} />
                  <span className="text-[8px] font-black uppercase">Ajouter</span>
                </button>
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
              <div className="bg-gray-900 p-8 text-white">
                <h3 className="text-xl font-black">Exportation PPTX</h3>
                <p className="text-gray-400 text-xs uppercase font-black tracking-widest mt-1">Génération haute définition</p>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center space-y-2">
                  <div className="text-[10px] font-black text-blue-600 uppercase">Tarif unique</div>
                  <div className="text-3xl font-black text-blue-900">2 USD</div>
                  <p className="text-xs text-blue-700 font-bold">Pour télécharger votre présentation complète au format PowerPoint.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['M-Pesa', 'Orange', 'Airtel'].map((m) => (
                    <button key={m} className="p-4 border border-gray-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-gray-50 transition-all">
                       <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black text-sm">{m[0]}</div>
                       <span className="text-[10px] font-black uppercase text-gray-500">{m}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Numéro de téléphone</label>
                   <input type="tel" placeholder="08xxxxxxxx" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-lg font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep('editor')} className="h-14 px-6 rounded-2xl font-bold">Retour</Button>
                  <Button onClick={startExport} className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl">
                    Payer et Exporter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'export' && (
          <motion.div 
            key="export"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-8"
          >
             {loadingProgress < 100 ? (
               <>
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-gray-100 stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50"></circle>
                    <circle 
                      className="text-blue-600 stroke-current transition-all duration-300" 
                      strokeWidth="8" strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50"
                      strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * loadingProgress) / 100}
                      transform="rotate(-90 50 50)"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Presentation className="text-blue-600 animate-bounce" size={32} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-900">Conversion en .pptx...</h3>
                  <p className="text-gray-500 font-medium max-w-sm mx-auto">Vérification de la mise en page et intégration des images haute résolution.</p>
                </div>
               </>
             ) : (
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8">
                  <div className="w-24 h-24 bg-green-500 rounded-[32px] flex items-center justify-center text-white mx-auto shadow-2xl shadow-green-200">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-gray-900">C'est prêt !</h3>
                    <p className="text-gray-500 font-medium">Votre fichier PowerPoint a été généré avec succès.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button className="h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg flex items-center gap-3 shadow-xl">
                      <Download size={24} /> Télécharger maintenant
                    </Button>
                    <Button variant="ghost" onClick={() => setStep('landing')} className="text-gray-400 font-bold">Retour au dashboard</Button>
                  </div>
               </motion.div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
