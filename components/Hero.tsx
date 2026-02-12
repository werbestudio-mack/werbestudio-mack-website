
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  onNavigate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.2]);

  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Mesh Gradient */}
      <motion.div 
        animate={{ 
          background: [
            'radial-gradient(circle at 50% 50%, rgba(239, 120, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 70%, rgba(239, 120, 0, 0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 30%, rgba(239, 120, 0, 0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(239, 120, 0, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0"
      />

      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ef7800]/5 blur-[150px] rounded-full" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.span 
          custom={0} variants={textVariant} initial="hidden" animate="visible"
          className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.5em] text-[#ef7800] mb-10 bg-white/5"
        >
          TÜV-Certified AI Excellence
        </motion.span>
        
        <h1 className="text-[12vw] md:text-[8vw] font-display font-bold tracking-tighter leading-[0.8] mb-12">
          <motion.div custom={1} variants={textVariant} initial="hidden" animate="visible">
            CRAFTING
          </motion.div>
          <motion.div custom={2} variants={textVariant} initial="hidden" animate="visible" className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef7800] via-orange-400 to-white italic">
            DIGITAL SOUL.
          </motion.div>
        </h1>
        
        <motion.p 
          custom={3} variants={textVariant} initial="hidden" animate="visible"
          className="max-w-2xl mx-auto text-xl text-zinc-400 font-light leading-relaxed mb-16"
        >
          Wir verbinden präzise KI-Strategie mit kompromissloser Ästhetik. <br />
          Zwei Köpfe, ein globales Netzwerk, grenzenlose Visionen.
        </motion.p>
        
        <motion.div 
          custom={4} variants={textVariant} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <button 
            onClick={onNavigate}
            className="px-14 py-5 bg-white text-black font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all flex items-center group relative overflow-hidden"
          >
            <span className="relative z-10">PORTFOLIO</span>
            <motion.div className="absolute inset-0 bg-[#ef7800] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <button className="text-xs font-bold uppercase tracking-widest hover:text-[#ef7800] transition-colors border-b border-white/20 pb-2">
            Showreel 2024
          </button>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-zinc-600"
      >
        <span className="text-[8px] uppercase tracking-[0.6em] vertical-text">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#ef7800] to-transparent" />
      </motion.div>
    </section>
  );
};
