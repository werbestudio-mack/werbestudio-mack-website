
import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../types';

interface ServicesProps {
  onServiceClick?: (page: string) => void;
}

const services = [
  {
    id: Page.ServiceKI,
    title: 'KI-Strategie & Training',
    desc: 'Als TÜV-zertifizierte Experten integrieren wir KI in Ihren Workflow und schulen Ihr Team.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: Page.ServiceWeb,
    title: 'High-End Webdesign',
    desc: 'Full-Responsive Interfaces, die durch Ästhetik und Performance überzeugen.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  {
    id: Page.ServicePrint,
    title: 'Print & Corporate',
    desc: 'Markenidentitäten, die physisch und digital eine konsistente Geschichte erzählen.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 4v4h4" />
      </svg>
    )
  },
  {
    id: Page.ServiceMedia,
    title: 'Foto & Videografie',
    desc: 'Visuelle Kommunikation auf höchstem Niveau – vom Imagefilm bis zum Social Content.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  }
];

export const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-[#ef7800] font-bold uppercase tracking-widest text-[10px]">What we do</span>
          <h2 className="text-5xl font-display font-bold tracking-tighter mt-4">UNSERE EXPERTISE.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: '#0c0c0c' }}
              className="bg-black p-10 flex flex-col h-full transition-all group cursor-pointer"
              onClick={() => onServiceClick?.(s.id)}
            >
              <div className="text-zinc-500 group-hover:text-[#ef7800] transition-colors mb-8">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed flex-grow">
                {s.desc}
              </p>
              <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-[#ef7800]"
                >
                  Mehr erfahren <span className="text-[#ef7800]">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
