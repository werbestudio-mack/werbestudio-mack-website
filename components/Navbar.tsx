
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Page } from '../types';

interface NavbarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onPageChange }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-pointer"
          onClick={() => onPageChange(Page.Home)}
        >
          <span className="text-xl font-display font-bold tracking-tighter">MACK<span className="text-[#ef7800]">.</span></span>
        </motion.div>

        <div className="flex gap-8 items-center">
          {[
            { label: 'Agentur', id: Page.Home },
            { label: 'Portfolio', id: Page.Portfolio },
            { label: 'Kontakt', id: Page.Contact },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`text-sm font-medium tracking-wide transition-colors relative ${
                activePage === item.id ? 'text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <motion.div 
                  layoutId="underline" 
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#ef7800]" 
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
