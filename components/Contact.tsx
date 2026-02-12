
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [mapAccepted, setMapAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mack_cookie_consent');
    if (consent && JSON.parse(consent).includes('media')) {
      setMapAccepted(true);
    }
  }, []);

  return (
    <section className="pt-40 pb-20 px-6 min-h-[90vh]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none mb-10">
              SAG HALLO.
            </h1>
            <p className="text-2xl text-zinc-400 font-light leading-relaxed mb-12">
              Bereit für das nächste Level? Lassen Sie uns darüber sprechen, wie wir Ihre Marke transformieren können.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 block mb-2">Email</span>
                <a href="mailto:hello@mack-digital.de" className="text-xl hover:text-[#ef7800] transition-colors">hello@mack-digital.de</a>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 block mb-2">Standort</span>
                <address className="not-italic text-xl text-zinc-300">
                  Bruchsaler Straße 4a <br />
                  74918 Angelbachtal
                </address>
              </div>
            </div>

            {/* Google Maps Embed with Privacy Layer */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 group">
              {!mapAccepted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-sm">
                  <svg className="w-12 h-12 text-[#ef7800] mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest mb-6 max-w-xs">
                    Klicken Sie zum Laden der Karte. Hierbei werden Daten an Google übertragen.
                  </p>
                  <button 
                    onClick={() => setMapAccepted(true)}
                    className="px-6 py-3 bg-white/5 border border-white/20 hover:bg-white hover:text-black rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    Karte aktivieren
                  </button>
                </div>
              ) : (
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2612.4278453535!2d8.77353!3d49.23122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDEzJzUyLjQiTiA4wrA0NicyNC43IkU!5e0!3m2!1sde!2sde!4v1710000000000!5m2!1sde!2sde"
                  className="w-full h-full grayscale invert opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 p-10 rounded-3xl border border-white/10"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Ihr Name</label>
                <input type="text" className="w-full bg-transparent border-b border-zinc-700 py-4 focus:outline-none focus:border-[#ef7800] transition-colors" placeholder="Max Mustermann" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">E-Mail Adresse</label>
                <input type="email" className="w-full bg-transparent border-b border-zinc-700 py-4 focus:outline-none focus:border-[#ef7800] transition-colors" placeholder="max@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Ihre Nachricht</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-zinc-700 py-4 focus:outline-none focus:border-[#ef7800] transition-colors resize-none" placeholder="Erzählen Sie uns von Ihrem Projekt..." />
              </div>
              <button className="w-full py-6 bg-white text-black font-bold rounded-full hover:bg-[#ef7800] hover:text-white transition-all uppercase tracking-widest text-xs">
                Anfrage senden
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
