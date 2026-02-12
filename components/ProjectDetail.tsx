
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onContact: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onContact }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = project.images.length > 0 ? project.images : ['https://via.placeholder.com/800x600?text=No+Image'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-16 text-xs uppercase tracking-widest"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Portfolio
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
               <span className="text-[#ef7800] font-bold uppercase tracking-[0.3em] text-[10px]">
                {project.categories?.[0] || project.category}
              </span>
              <div className="h-[1px] w-8 bg-zinc-800" />
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest">{project.year}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-zinc-500 font-light mb-12 italic">{project.client}</p>
            
            <div className="space-y-8 text-2xl text-zinc-300 font-light leading-relaxed mb-12">
              <p>{project.longDescription || project.shortDescription}</p>
            </div>

            {project.categories && project.categories.length > 1 && (
              <div className="space-y-6 mb-16">
                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Scope & Categories:</h3>
                <div className="flex flex-wrap gap-3">
                  {project.categories.map((cat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="px-6 py-2 bg-white/5 border border-white/5 rounded-full text-zinc-400 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {cat}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={onContact}
              className="px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs"
            >
              Ähnliches Projekt anfragen
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl relative aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  alt={`${project.title} slide ${currentImageIndex}`}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-all z-10"
                  >
                    ←
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-all z-10"
                  >
                    →
                  </button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-[#ef7800] w-4' : 'bg-white/40'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
