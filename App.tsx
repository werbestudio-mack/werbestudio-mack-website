
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ServiceDetail } from './components/ServiceDetail';
import { ProjectDetail } from './components/ProjectDetail';
import { Admin } from './components/Admin';
import { CustomCursor } from './components/CustomCursor';
import { CookieConsent } from './components/CookieConsent';
import { Page, Project, LegalContent } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_LEGAL: LegalContent = {
  impressum: "MACK Digital Agency\nBruchsaler Straße 4a\n74918 Angelbachtal\n\nVertreten durch: [Ihr Name]\nKontakt: hello@mack-digital.de",
  datenschutz: "DATENSCHUTZERKLÄRUNG\n\n1. Datenschutz auf einen Blick\nAllgemeine Hinweise\nDie folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert..."
};

const DEFAULT_PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Aurelia AI', 
    client: 'Aurelia Tech', 
    category: 'AI Architecture',
    categories: ['AI', 'Neural Tech', 'Future'],
    images: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632', 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=1632'], 
    previewImageIndex: 0,
    year: '2024', 
    shortDescription: 'Zukunftsweisende KI-Architektur für Datenanalyse.',
    longDescription: 'Ein bahnbrechendes KI-System zur Analyse komplexer Datenstrukturen. Wir haben das gesamte Interface-Design und die visuelle Kommunikation für den Launch dieses Projekts übernommen.',
  }
];

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('mack_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });
  const [legalContent, setLegalContent] = useState<LegalContent>(() => {
    const saved = localStorage.getItem('mack_legal');
    return saved ? JSON.parse(saved) : DEFAULT_LEGAL;
  });

  useEffect(() => {
    localStorage.setItem('mack_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('mack_legal', JSON.stringify(legalContent));
  }, [legalContent]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(page);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const LegalPage = ({ title, content }: { title: string, content: string }) => (
    <div className="pt-40 pb-40 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-display font-bold mb-16 tracking-tighter">{title}.</h1>
      <div className="text-zinc-400 font-light leading-relaxed whitespace-pre-wrap text-lg">
        {content}
      </div>
      <button onClick={() => handlePageChange(Page.Home)} className="mt-20 text-[10px] font-bold uppercase tracking-widest text-[#ef7800] hover:text-white transition-colors">← Zurück zur Startseite</button>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#ef7800]/30 overflow-hidden">
      <CustomCursor />
      <CookieConsent onAccept={() => { /* Handled via local storage in component */ }} />
      
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
          {activePage === Page.Home && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero onNavigate={() => handlePageChange(Page.Portfolio)} />
              <About />
              <Services onServiceClick={(id) => handlePageChange(id as Page)} />
            </motion.div>
          )}

          {activePage === Page.Portfolio && (
            <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Portfolio projects={projects} onProjectClick={(id) => { setSelectedProjectId(id); handlePageChange(Page.ProjectDetail); }} />
            </motion.div>
          )}

          {activePage === Page.Contact && <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Contact /></motion.div>}
          
          {activePage === Page.Impressum && <LegalPage title="IMPRESSUM" content={legalContent.impressum} />}
          {activePage === Page.Datenschutz && <LegalPage title="DATENSCHUTZ" content={legalContent.datenschutz} />}

          {activePage === Page.Admin && (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Admin projects={projects} setProjects={setProjects} legalContent={legalContent} setLegalContent={setLegalContent} />
            </motion.div>
          )}

          {activePage === Page.ProjectDetail && selectedProject && (
            <motion.div key="project-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProjectDetail project={selectedProject} onBack={() => handlePageChange(Page.Portfolio)} onContact={() => handlePageChange(Page.Contact)} />
            </motion.div>
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
