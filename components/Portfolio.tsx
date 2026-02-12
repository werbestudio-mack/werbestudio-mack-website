
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';

interface PortfolioProps {
  projects: Project[];
  onProjectClick: (id: string) => void;
}

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 10 : -10]);
  
  const previewImage = project.images[project.previewImageIndex || 0] || 'https://via.placeholder.com/800x600?text=No+Image';

  return (
    <motion.div
      style={{ rotateX }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="perspective-card relative group cursor-pointer overflow-hidden rounded-3xl bg-zinc-900 aspect-[4/5] md:aspect-[4/3] break-inside-avoid mb-8"
      onClick={onClick}
    >
      <img 
        src={previewImage} 
        alt={project.title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-60 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#ef7800] font-bold mb-4">{project.categories?.[0] || project.category}</span>
        <h3 className="text-4xl font-display font-bold tracking-tighter">{project.title}</h3>
        <p className="text-zinc-400 mt-4 text-sm line-clamp-2 max-w-sm">{project.shortDescription}</p>
        <div className="mt-8 pt-8 border-t border-white/10">
          <span className="text-[10px] uppercase tracking-widest flex items-center gap-2">Projekt Details <span className="text-[#ef7800]">→</span></span>
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio: React.FC<PortfolioProps> = ({ projects, onProjectClick }) => {
  return (
    <section className="pt-32 pb-32 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-6 block">Our Legacy</span>
          <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter mb-6">AUSGEWÄHLTE <br />WERKE.</h1>
        </motion.div>

        <div className="columns-1 md:columns-2 gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={() => onProjectClick(p.id)} />
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-40 border border-dashed border-white/10 rounded-3xl">
            <p className="text-zinc-500 font-light italic">Das Archiv ist derzeit leer.</p>
          </div>
        )}
      </div>
    </section>
  );
};
