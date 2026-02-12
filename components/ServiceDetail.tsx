
import React from 'react';
import { motion } from 'framer-motion';

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  onBack: () => void;
  onContact: () => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
  title,
  subtitle,
  description,
  features,
  image,
  onBack,
  onContact
}) => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-16 text-xs uppercase tracking-widest"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Zurück zur Übersicht
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-[#ef7800] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
              {subtitle}
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none mb-10">
              {title}
            </h1>
            <p className="text-2xl text-zinc-400 font-light leading-relaxed mb-12">
              {description}
            </p>

            <div className="space-y-6 mb-16">
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Was Sie erwartet:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:border-[#ef7800]/50 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ef7800]" />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              onClick={onContact}
              className="px-10 py-5 bg-[#ef7800] text-white font-bold rounded-full hover:bg-orange-600 transition-all uppercase tracking-widest text-xs shadow-lg shadow-orange-900/20"
            >
              Projekt anfragen
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative sticky top-32"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/5">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>
            
            <div className="absolute -bottom-10 -right-10 p-10 bg-white text-black rounded-2xl hidden md:block">
              <div className="text-xs font-bold uppercase tracking-widest">Innovation</div>
              <div className="text-3xl font-bold font-display tracking-tighter mt-1">MACK STD.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
