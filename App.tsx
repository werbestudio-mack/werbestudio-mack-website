
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Services } from './components/Services.tsx';
import { Portfolio } from './components/Portfolio.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { ProjectDetail } from './components/ProjectDetail.tsx';
import { Admin } from './components/Admin.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { CookieConsent } from './components/CookieConsent.tsx';
import { Page, Project, LegalContent } from './types.ts';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabase.ts';

const DEFAULT_LEGAL: LegalContent = {
  impressum: "MACK Digital Agency\nBruchsaler Straße 4a\n74918 Angelbachtal\n\nVertreten durch: Mack Digital\nKontakt: hello@mack-digital.de",
  datenschutz: "DATENSCHUTZERKLÄRUNG\n\n1. Datenschutz auf einen Blick..."
};

const DEFAULT_PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Aurelia AI', 
    client: 'Aurelia Tech', 
    category: 'AI Architecture',
    categories: ['AI', 'Neural Tech'],
    images: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632'], 
    previewImageIndex: 0,
    year: '2024', 
    shortDescription: 'Zukunftsweisende KI-Architektur.',
    longDescription: 'Ein bahnbrechendes KI-System zur Analyse komplexer Datenstrukturen.',
  }
];

// Kleine interne Hilfskomponente für die Rechtstexte
const LegalView: React.FC<{ title: string; content: string; onBack: () => void }> = ({ title, content, onBack }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }}
    className="pt-40 pb-20 px-6 min-h-screen max-w-4xl mx-auto"
  >
    <button onClick={onBack} className="mb-12 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-[#ef7800] transition-colors flex items-center gap-2">
      ← Zurück
    </button>
    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-12 uppercase">{title}</h1>
    <div className="prose prose-invert max-w-none">
      <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap font-light text-lg">
        {content}
      </p>
    </div>
  </motion.section>
);

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [legalContent, setLegalContent] = useState<LegalContent>(DEFAULT_LEGAL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: projData, error: projError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (!projError && projData && projData.length > 0) {
          setProjects(projData.map(p => ({
            ...p,
            shortDescription: p.short_description,
            longDescription: p.long_description,
            previewImageIndex: p.preview_image_index
          })));
        }

        const { data: legalData, error: legalError } = await supabase
          .from('legal_content')
          .select('*')
          .single();

        if (!legalError && legalData) {
          setLegalContent({
            impressum: legalData.impressum,
            datenschutz: legalData.datenschutz
          });
        }
      } catch (err) {
        console.error('Backend fallback:', err);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(page);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      <CustomCursor />
      <CookieConsent onAccept={() => {}} />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div key="loader" exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            <h1 className="text-2xl font-display font-bold tracking-tighter">MACK</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar activePage={activePage} onPageChange={handlePageChange} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {!isLoading && activePage === Page.Home && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero onNavigate={() => handlePageChange(Page.Portfolio)} />
              <About />
              <Services onServiceClick={(id) => handlePageChange(id as Page)} />
            </motion.div>
          )}

          {!isLoading && activePage === Page.Portfolio && (
            <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Portfolio projects={projects} onProjectClick={(id) => { setSelectedProjectId(id); handlePageChange(Page.ProjectDetail); }} />
            </motion.div>
          )}

          {activePage === Page.Contact && <Contact />}
          {activePage === Page.Admin && <Admin projects={projects} setProjects={setProjects} legalContent={legalContent} setLegalContent={setLegalContent} />}
          
          {activePage === Page.Impressum && (
            <LegalView 
              key="impressum" 
              title="Impressum" 
              content={legalContent.impressum} 
              onBack={() => handlePageChange(Page.Home)} 
            />
          )}
          
          {activePage === Page.Datenschutz && (
            <LegalView 
              key="datenschutz" 
              title="Datenschutz" 
              content={legalContent.datenschutz} 
              onBack={() => handlePageChange(Page.Home)} 
            />
          )}
          
          {activePage === Page.ProjectDetail && selectedProject && (
            <ProjectDetail project={selectedProject} onBack={() => handlePageChange(Page.Portfolio)} onContact={() => handlePageChange(Page.Contact)} />
          )}
        </AnimatePresence>
      </main>

      <Footer 
        onAdminClick={() => handlePageChange(Page.Admin)} 
        onImpressumClick={() => handlePageChange(Page.Impressum)}
        onDatenschutzClick={() => handlePageChange(Page.Datenschutz)}
      />
    </div>
  );
};

export default App;
