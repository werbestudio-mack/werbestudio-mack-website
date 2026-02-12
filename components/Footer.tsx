
import React from 'react';

interface FooterProps {
  onAdminClick?: () => void;
  onImpressumClick?: () => void;
  onDatenschutzClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onAdminClick, 
  onImpressumClick, 
  onDatenschutzClick 
}) => {
  return (
    <footer className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-8">
            <span className="text-xl font-display font-bold tracking-tighter">MACK.</span>
            <div className="flex gap-4">
               {['LinkedIn', 'Instagram', 'Behance'].map(social => (
                 <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">{social}</a>
               ))}
            </div>
          </div>
          
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-zinc-500 items-center">
            <button 
              onClick={onAdminClick}
              className="hover:text-[#ef7800] transition-colors cursor-pointer"
            >
              CMS Access
            </button>
            <button 
              onClick={onImpressumClick}
              className="hover:text-white transition-colors"
            >
              Impressum
            </button>
            <button 
              onClick={onDatenschutzClick} 
              className="hover:text-white transition-colors"
            >
              Datenschutz
            </button>
            <span>&copy; {new Date().getFullYear()} Mack Digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
