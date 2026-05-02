"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Presentation, Layout, Plus, Trash2, ChevronLeft, ChevronRight, 
  Download, Sparkles, Image as ImageIcon, Type, Palette, 
  PlayCircle, Save, CheckCircle2, Zap, Smartphone, ArrowRight,
  Info, CreditCard, Share2, Upload, RefreshCw, Building2, Heart, GraduationCap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SlidePreview from '@/components/slides/SlidePreview';

type FlowStep = 'landing' | 'editor' | 'payment' | 'export' | 'pdf-upload';

interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  layout: 'text-only' | 'split' | 'title-only';
  bullets?: string[];
}

export default function SlidesPage() {
  const [step, setStep] = useState<FlowStep>('landing');
  const [templateStyle, setTemplateStyle] = useState<'business' | 'startup' | 'ong' | 'academic'>('business');
  const [slides, setSlides] = useState<Slide[]>([
    { id: '1', title: 'Plan Stratégique 2026', content: 'Une présentation professionnelle générée avec YawoSlides.', layout: 'title-only' },
    { id: '2', title: 'Vision & Objectifs', content: '', layout: 'split', bullets: ['Expansion régionale', 'Digitalisation complète', 'Optimisation des coûts'], image: null },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [isGeneratingIA, setIsGeneratingIA] = useState(false);
  const [isAnalyzingPDF, setIsAnalyzingPDF] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzingPDF(true);
      setLoadingProgress(0);
      
      const fileName = file.name.replace('.pdf', '');
      
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      // Simulation d'analyse IA du PDF beaucoup plus riche
      setTimeout(() => {
        const generatedSlides: Slide[] = [
          { 
            id: 'p1', 
            title: fileName, 
            content: 'Présentation stratégique complète générée par l\'IA de YawoBuilder à partir de l\'analyse de votre document source.', 
            layout: 'title-only' 
          },
          { 
            id: 'p2', 
            title: 'Résumé Exécutif', 
            content: 'Ce document présente les points fondamentaux extraits de votre PDF pour une prise de décision rapide.', 
            layout: 'text-only', 
            bullets: [
              'Analyse approfondie du document : ' + fileName,
              'Identification des 3 piliers stratégiques majeurs',
              'Synthèse opérationnelle pour les parties prenantes',
              'Alignement avec les standards du marché'
            ] 
          },
          { 
            id: 'p3', 
            title: 'Analyse & Opportunités', 
            content: 'L\'extraction de données a révélé plusieurs axes de croissance et des points d\'optimisation clés.', 
            layout: 'split', 
            bullets: [
              'Potentiel de croissance estimé à +25%',
              'Optimisation des processus internes',
              'Réduction des coûts opérationnels identifiée',
              'Nouvelles opportunités de partenariat'
            ],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' 
          },
          { 
            id: 'p4', 
            title: 'Plan d\'Action IA', 
            content: 'Basé sur l\'intelligence contextuelle, voici les étapes recommandées pour la mise en œuvre.', 
            layout: 'text-only', 
            bullets: [
              'Phase 1 : Lancement pilote et tests de validation',
              'Phase 2 : Déploiement à grande échelle (Trimestre 3)',
              'Phase 3 : Analyse des résultats et ajustements',
              'Suivi en temps réel des indicateurs clés (KPI)'
            ] 
          },
          { 
            id: 'p5', 
            title: 'Conclusion & Prochaines Étapes', 
            content: 'Merci de votre attention. Nous sommes prêts pour la mise en œuvre immédiate.', 
            layout: 'title-only',
            bullets: ['Questions & Réponses', 'Validation du budget', 'Signature des accords']
          }
        ];
        
        setSlides(generatedSlides);
        setCurrentSlideIndex(0); // On commence par la première slide générée
        setIsAnalyzingPDF(false);
        setStep('editor');
      }, 3000);
    }
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      content: '',
      layout: 'text-only',
      bullets: []
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const updateSlide = (field: keyof Slide, value: any) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = { ...newSlides[currentSlideIndex], [field]: value };
    setSlides(newSlides);
  };

  const addBullet = () => {
    const newSlides = [...slides];
    const currentBullets = newSlides[currentSlideIndex].bullets || [];
    newSlides[currentSlideIndex].bullets = [...currentBullets, 'Nouveau point'];
    setSlides(newSlides);
  };

  const updateBullet = (index: number, value: string) => {
    const newSlides = [...slides];
    const bullets = [...(newSlides[currentSlideIndex].bullets || [])];
    bullets[index] = value;
    newSlides[currentSlideIndex].bullets = bullets;
    setSlides(newSlides);
  };

  const removeBullet = (index: number) => {
    const newSlides = [...slides];
    const bullets = [...(newSlides[currentSlideIndex].bullets || [])].filter((_, i) => i !== index);
    newSlides[currentSlideIndex].bullets = bullets;
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
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button onClick={() => setStep('editor')} className="w-full sm:w-auto rounded-2xl h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-100 transition-all">
                    Créer manuellement
                  </Button>
                  <input type="file" ref={pdfInputRef} className="hidden" accept=".pdf" onChange={handlePDFUpload} />
                  <Button 
                    onClick={() => pdfInputRef.current?.click()}
                    variant="outline" 
                    className="w-full sm:w-auto rounded-2xl h-14 px-10 border-blue-600 text-blue-600 font-black hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Upload size={20} /> Importer un PDF
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block relative rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-video bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2">
                  <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
                    <Presentation size={64} className="text-blue-100" />
                  </div>
                </div>
                {/* Template Preview Miniatures */}
                <div className="absolute -bottom-10 -left-10 grid grid-cols-2 gap-4 scale-75">
                  <div className="w-40 h-24 bg-slate-900 rounded-xl shadow-xl border border-white/10 p-2">
                    <div className="w-full h-1 bg-blue-500 mb-2 rounded" />
                    <div className="w-1/2 h-4 bg-white/20 rounded mb-1" />
                    <div className="w-3/4 h-2 bg-white/10 rounded" />
                  </div>
                  <div className="w-40 h-24 bg-white rounded-xl shadow-xl border border-gray-100 p-2">
                    <div className="w-1/2 h-4 bg-blue-600 rounded mb-2" />
                    <div className="flex gap-2">
                      <div className="w-1/3 h-12 bg-gray-100 rounded" />
                      <div className="flex-1 space-y-1">
                        <div className="w-full h-1 bg-gray-200 rounded" />
                        <div className="w-full h-1 bg-gray-200 rounded" />
                        <div className="w-full h-1 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {isAnalyzingPDF && (
          <motion.div 
            key="pdf-analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-full max-w-md space-y-8">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-8 border-blue-50 rounded-full" />
                <div 
                  className="absolute inset-0 border-8 border-blue-600 rounded-full transition-all duration-300"
                  style={{ 
                    clipPath: `inset(0 0 0 0)`,
                    strokeDasharray: '251.2',
                    strokeDashoffset: 251.2 - (251.2 * loadingProgress) / 100,
                    transform: 'rotate(-90deg)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Upload size={40} className="text-blue-600 animate-bounce" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-gray-900">Analyse de votre PDF...</h3>
                <p className="text-gray-500 font-medium">L'IA extrait les points clés pour générer votre présentation professionnelle.</p>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                  />
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
                    <Layout size={20} className="text-blue-600" /> Mise en page
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'title-only', label: 'Titre', icon: <Type size={16}/> },
                      { id: 'text-only', label: 'Texte', icon: <Layout size={16}/> },
                      { id: 'split', label: 'Mixte', icon: <Plus size={16}/> },
                    ].map(layout => (
                      <button
                        key={layout.id}
                        onClick={() => updateSlide('layout', layout.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${slides[currentSlideIndex].layout === layout.id ? 'border-blue-600 bg-blue-50' : 'border-gray-50 bg-white hover:border-gray-100'}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${slides[currentSlideIndex].layout === layout.id ? 'text-blue-600' : 'text-gray-400'}`}>
                          {layout.icon}
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest">{layout.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
                      {[
                        { id: 'business', label: 'Business', icon: <Building2 size={16}/>, color: 'bg-blue-600' },
                        { id: 'startup', label: 'Startup', icon: <Zap size={16}/>, color: 'bg-slate-900' },
                        { id: 'ong', label: 'ONG', icon: <Heart size={16}/>, color: 'bg-emerald-600' },
                        { id: 'academic', label: 'Scolaire', icon: <GraduationCap size={16}/>, color: 'bg-indigo-600' },
                      ].map(style => (
                      <button
                        key={style.id}
                        onClick={() => setTemplateStyle(style.id as any)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${templateStyle === style.id ? 'border-blue-600 bg-blue-50' : 'border-gray-50 bg-white hover:border-gray-100'}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${style.color}`}>
                          {style.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{style.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Couleur Thème</label>
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
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[24px] lg:rounded-[32px] overflow-hidden">
                <CardHeader className="p-6 border-b border-gray-50">
                  <CardTitle className="text-xl font-black">Édition Slide</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Titre</label>
                      <input 
                        type="text"
                        value={slides[currentSlideIndex].title}
                        onChange={(e) => updateSlide('title', e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-base font-bold outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Titre de la slide..."
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Puces (Bullet Points)</label>
                        <Button onClick={addBullet} variant="ghost" size="sm" className="text-blue-600 font-bold hover:bg-blue-50">
                          <Plus size={14} className="mr-1" /> Ajouter
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(slides[currentSlideIndex].bullets || []).length > 0 ? (
                          (slides[currentSlideIndex].bullets || []).map((bullet, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input 
                                type="text"
                                value={bullet}
                                onChange={(e) => updateBullet(idx, e.target.value)}
                                className="flex-1 p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium outline-none"
                              />
                              <button onClick={() => removeBullet(idx)} className="text-gray-300 hover:text-red-500">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-[10px] text-gray-400 italic">Aucune puce ajoutée</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        {slides[currentSlideIndex].layout === 'title-only' ? 'Sous-titre / Description' : 'Texte Libre'}
                      </label>
                      <textarea 
                        rows={3}
                        value={slides[currentSlideIndex].content}
                        onChange={(e) => updateSlide('content', e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={slides[currentSlideIndex].layout === 'title-only' ? 'Description courte...' : 'Contenu de la diapositive...'}
                      />
                    </div>
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

              {/* Media Card */}
              <Card className="border-none shadow-sm rounded-[24px] lg:rounded-[32px] overflow-hidden">
                <CardHeader className="p-6 border-b border-gray-50">
                  <CardTitle className="text-xl font-black">Médias</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
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
                </CardContent>
              </Card>
            </div>

            {/* Preview Side */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-900 rounded-[40px] p-6 lg:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] relative group overflow-hidden aspect-video flex flex-col border border-white/5">
                <div className="flex-1 relative rounded-3xl overflow-hidden bg-white shadow-2xl">
                   <SlidePreview 
                    slides={slides} 
                    currentIndex={currentSlideIndex} 
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    templateStyle={templateStyle}
                   />
                </div>
                
                {/* Controls Overlay */}
                <div className="flex justify-between items-center mt-10">
                   <div className="flex gap-4">
                    <button 
                      onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                      className="w-14 h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-20 border border-white/10"
                      disabled={currentSlideIndex === 0}
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button 
                      onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                      className="w-14 h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-20 border border-white/10"
                      disabled={currentSlideIndex === slides.length - 1}
                    >
                      <ChevronRight size={28} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Animations Actives</span>
                    </div>
                    <Button 
                      onClick={() => setStep('payment')}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-blue-600/20 text-lg"
                    >
                      Générer PPTX <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation Thumbnails */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Plan de la présentation ({slides.length} slides)</h4>
                  <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Importation PDF réussie !</p>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlideIndex(i)}
                      className={`min-w-[180px] aspect-video rounded-2xl border-4 transition-all overflow-hidden relative group ${currentSlideIndex === i ? 'border-blue-600 scale-105 shadow-2xl' : 'border-white bg-white/50 opacity-60 hover:opacity-100 shadow-sm'}`}
                    >
                      <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-4">
                        <div className="text-[10px] font-black text-gray-900 text-center uppercase truncate w-full mb-1">{s.title || `Slide ${i+1}`}</div>
                        <div className="text-[8px] text-gray-400 font-medium line-clamp-2 px-2">
                          {s.bullets && s.bullets.length > 0 ? `• ${s.bullets[0]}` : s.content}
                        </div>
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-white rounded-md flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100">
                          {i + 1}
                        </div>
                        {s.layout === 'split' && <ImageIcon size={10} className="absolute top-2 right-2 text-gray-300" />}
                      </div>
                    </button>
                  ))}
                  <button 
                    onClick={addSlide}
                    className="min-w-[180px] aspect-video rounded-2xl border-4 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-all bg-white/30"
                  >
                    <Plus size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Nouvelle</span>
                  </button>
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
