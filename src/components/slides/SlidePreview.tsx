"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Type, Layout } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  layout: 'text-only' | 'split' | 'title-only';
}

interface SlidePreviewProps {
  slides: Slide[];
  currentIndex: number;
  primaryColor: string;
  fontFamily: string;
}

export default function SlidePreview({ slides, currentIndex, primaryColor, fontFamily }: SlidePreviewProps) {
  const slide = slides[currentIndex];

  if (!slide) return null;

  return (
    <div 
      className="w-full h-full bg-white shadow-2xl relative overflow-hidden flex flex-col"
      style={{ fontFamily }}
    >
      {/* Background Decor */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full"
        style={{ backgroundColor: primaryColor }}
      />
      <div 
        className="absolute bottom-0 left-0 w-16 h-16 opacity-10 rounded-tr-full"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="flex-1 p-12 flex flex-col justify-center relative z-10">
        {slide.layout === 'title-only' && (
          <div className="text-center space-y-6">
            <motion.h2 
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black leading-tight"
              style={{ color: primaryColor }}
            >
              {slide.title || "Titre de la Slide"}
            </motion.h2>
            <motion.div 
              className="w-24 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: primaryColor }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
            />
          </div>
        )}

        {slide.layout === 'text-only' && (
          <div className="space-y-8">
            <motion.h3 
              key={`title-text-${slide.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-black"
              style={{ color: primaryColor }}
            >
              {slide.title || "Titre de section"}
            </motion.h3>
            <motion.p 
              key={`content-text-${slide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed whitespace-pre-wrap"
            >
              {slide.content || "Votre texte ici..."}
            </motion.p>
          </div>
        )}

        {slide.layout === 'split' && (
          <div className="grid grid-cols-2 gap-12 items-center h-full">
            <div className="space-y-6">
              <motion.h3 
                key={`title-split-${slide.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-black"
                style={{ color: primaryColor }}
              >
                {slide.title || "Titre de section"}
              </motion.h3>
              <motion.p 
                key={`content-split-${slide.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap"
              >
                {slide.content || "Votre texte ici..."}
              </motion.p>
            </div>
            <motion.div 
              key={`image-split-${slide.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full min-h-[300px] bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden flex items-center justify-center relative group"
            >
              {slide.image ? (
                <img src={slide.image} alt="Slide" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-300">
                  <ImageIcon size={48} />
                  <span className="text-xs font-bold uppercase tracking-widest">Image</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="p-8 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-t border-gray-50">
        <span>YawoSlides • {currentIndex + 1} / {slides.length}</span>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{ backgroundColor: i === currentIndex ? primaryColor : '#e5e7eb' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
