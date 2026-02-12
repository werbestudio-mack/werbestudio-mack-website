
import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section className="py-32 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-8">
              KLEINER KERN. <br />
              <span className="text-[#ef7800]">UNENDLICHE</span> REICHWEITE.
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-light">
              <p>
                Wir sind Mack – ein agiles Power-Team, das die Flexibilität einer kleinen Agentur mit der Expertise eines globalen Netzwerks verbindet.
              </p>
              <p>
                Anstatt uns mit aufgeblähten Strukturen aufzuhalten, setzen wir auf ein spezialisiertes Kernteam, das für jedes Projekt die weltweit besten Freelancer aktiviert. So garantieren wir maximale Qualität ohne Kompromisse.
              </p>
              <div className="p-8 bg-gradient-to-br from-[#ef7800]/20 to-transparent border border-[#ef7800]/20 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                  <svg className="w-16 h-16 text-[#ef7800]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ef7800] rounded-full animate-pulse" />
                  KI-EXPERTise AUF TÜV-NIVEAU
                </h3>
                <p className="text-sm text-zinc-300">
                  Unser Gründer ist <strong className="text-white">TÜV-zertifizierter KI-Trainer</strong>. Wir implementieren nicht nur Tools – wir transformieren Prozesse und schulen Teams für die Ära der Künstlichen Intelligenz.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-zinc-900 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
               <img 
                 src="https://picsum.photos/id/101/800/800" 
                 alt="Our Studio Space" 
                 className="w-full h-full object-cover opacity-60"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            
            <div className="absolute -bottom-10 -left-10 p-10 bg-white text-black rounded-2xl hidden md:block">
              <div className="text-5xl font-bold font-display tracking-tighter">100+</div>
              <div className="text-xs font-bold uppercase tracking-widest mt-2">Freelancer im Netzwerk</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
