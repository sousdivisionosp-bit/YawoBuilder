"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Image as ImageIcon, Type, Layout } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  layout: 'text-only' | 'split' | 'title-only';
  bullets?: string[];
}

interface SlidePreviewProps {
  slides: Slide[];
  currentIndex: number;
  primaryColor: string;
  fontFamily: string;
  templateStyle?: 'business' | 'startup' | 'ong' | 'academic';
}

export default function SlidePreview({ slides, currentIndex, primaryColor, fontFamily, templateStyle = 'business' }: SlidePreviewProps) {
  const slide = slides[currentIndex];

  if (!slide) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div 
      className={`w-full h-full bg-white shadow-2xl relative overflow-hidden flex flex-col transition-all duration-500 ${
        templateStyle === 'startup' ? 'bg-slate-900 text-white' : 
        templateStyle === 'academic' ? 'bg-gray-50' : 'bg-white'
      }`}
      style={{ fontFamily }}
    >
      {/* Dynamic Background Elements based on Template */}
      {templateStyle === 'business' && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 translate-x-1/2 z-0" />
          <div className="absolute top-10 left-10 w-20 h-1" style={{ backgroundColor: primaryColor }} />
        </>
      )}
      
      {templateStyle === 'startup' && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]" style={{ backgroundColor: primaryColor }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]" style={{ backgroundColor: primaryColor }} />
        </div>
      )}

      {templateStyle === 'ong' && (
        <div className="absolute top-0 left-0 w-full h-4" style={{ backgroundColor: primaryColor }} />
      )}

      <motion.div 
        variants={containerVariants as any}
        initial="hidden"
        animate="visible"
        key={slide.id}
        className="flex-1 p-16 flex flex-col justify-center relative z-10"
      >
        {slide.layout === 'title-only' && (
          <div className="text-center space-y-8">
            <motion.h2 
              variants={itemVariants as any}
              className={`text-6xl font-black leading-tight ${templateStyle === 'startup' ? 'text-white' : 'text-gray-900'}`}
              style={templateStyle !== 'startup' ? { color: primaryColor } : {}}
            >
              {slide.title || "Titre de la Présentation"}
            </motion.h2>
            <motion.div 
              variants={itemVariants as any}
              className="w-32 h-2 mx-auto rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        )}

        {slide.layout === 'text-only' && (
          <div className="space-y-10 max-w-4xl mx-auto w-full">
            <motion.h3 
              variants={itemVariants as any}
              className={`text-4xl font-black border-l-8 pl-6 ${templateStyle === 'startup' ? 'text-white' : 'text-gray-900'}`}
              style={{ borderColor: primaryColor }}
            >
              {slide.title || "Titre de section"}
            </motion.h3>
            <div className="space-y-6">
              {slide.bullets && slide.bullets.length > 0 ? (
                <ul className="space-y-4">
                  {slide.bullets.map((bullet, i) => (
                    <motion.li 
                      key={i}
                      variants={itemVariants as any}
                      className="flex items-start gap-4 text-2xl font-medium"
                    >
                      <span className="mt-2 w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: primaryColor }} />
                      <span className={templateStyle === 'startup' ? 'text-gray-300' : 'text-gray-600'}>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <motion.p 
                  variants={itemVariants as any}
                  className={`text-2xl leading-relaxed whitespace-pre-wrap ${templateStyle === 'startup' ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {slide.content || "Votre texte ici..."}
                </motion.p>
              )}
            </div>
          </div>
        )}

        {slide.layout === 'split' && (
          <div className="grid grid-cols-2 gap-16 items-center h-full max-w-6xl mx-auto">
            <div className="space-y-10">
              <motion.h3 
                variants={itemVariants as any}
                className={`text-4xl font-black ${templateStyle === 'startup' ? 'text-white' : 'text-gray-900'}`}
                style={templateStyle !== 'startup' ? { color: primaryColor } : {}}
              >
                {slide.title || "Analyse Stratégique"}
              </motion.h3>
              <div className="space-y-6">
                {slide.bullets && slide.bullets.length > 0 ? (
                  <ul className="space-y-4">
                    {slide.bullets.map((bullet, i) => (
                      <motion.li 
                        key={i}
                        variants={itemVariants as any}
                        className="flex items-start gap-3 text-xl font-medium"
                      >
                        <div className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: primaryColor }} />
                        <span className={templateStyle === 'startup' ? 'text-gray-300' : 'text-gray-600'}>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <motion.p 
                    variants={itemVariants as any}
                    className={`text-xl leading-relaxed whitespace-pre-wrap ${templateStyle === 'startup' ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    {slide.content || "Détails de l'analyse..."}
                  </motion.p>
                )}
              </div>
            </div>
            <motion.div 
              variants={itemVariants as any}
              className={`h-full min-h-[400px] rounded-[40px] shadow-2xl overflow-hidden relative group ${
                templateStyle === 'startup' ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'
              }`}
            >
              {slide.image ? (
                <img src={slide.image} alt="Slide" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-gray-400 h-full justify-center">
                  <ImageIcon size={64} className="opacity-20" />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Visuel IA</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Footer info */}
      <div className={`p-10 flex justify-between items-center text-xs font-black uppercase tracking-[0.3em] border-t transition-colors ${
        templateStyle === 'startup' ? 'border-white/5 text-gray-500' : 'border-gray-50 text-gray-400'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-[10px]">Y</div>
          <span>YawoSlides • Pro</span>
        </div>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className="h-1 rounded-full transition-all"
              style={{ 
                width: i === currentIndex ? '24px' : '8px',
                backgroundColor: i === currentIndex ? primaryColor : (templateStyle === 'startup' ? '#1e293b' : '#e2e8f0') 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
