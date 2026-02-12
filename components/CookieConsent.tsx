
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentProps {
  onAccept: (categories: string[]) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mediaEnabled, setMediaEnabled] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('mack_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (categories: string[]) => {
    localStorage.setItem('mack_cookie_consent', JSON.stringify(categories));
    onAccept(categories);
    setIsVisible(false);
  };

  const handleConfirmSelection = () => {
    const categories = ['essential'];
    if (mediaEnabled) categories.push('media');
    handleAction(categories);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-[400px] z-[10001]"
        >
          <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-lg font-display font-bold mb-4 tracking-tighter">COOKIE EINSTELLUNGEN.</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-8 uppercase tracking-wider">
              Wir nutzen Cookies, um Ihr Erlebnis zu verbessern. Externe Medien wie Google Maps benötigen Ihre Zustimmung.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center justify-between opacity-60">
                <span className="text-[10px] font-bold uppercase tracking-widest">Essenziell</span>
                <span className="text-[10px] text-[#ef7800] uppercase tracking-widest italic">Aktiv</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Externe Medien</span>
                  <span className="text-[8px] text-zinc-500 uppercase mt-1">Google Maps, Videos</span>
                </div>
                <button 
                  onClick={() => setMediaEnabled(!mediaEnabled)}
                  className={`w-10 h-5 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[#ef7800]/50 ${mediaEnabled ? 'bg-[#ef7800]' : 'bg-zinc-700'}`}
                  aria-label="Externe Medien umschalten"
                >
                  <motion.div 
                    animate={{ x: mediaEnabled ? 22 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleAction(['essential', 'media'])}
                className="w-full py-4 bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-[#ef7800] hover:text-white"
              >
                Alle Akzeptieren
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleAction(['essential'])}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Nur Nötige
                </button>
                <button 
                  onClick={handleConfirmSelection}
                  className="px-4 py-3 border border-white/10 hover:border-[#ef7800] rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Bestätigen
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
