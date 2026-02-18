
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, LegalContent } from '../types';
import { supabase } from '../supabase';

interface AdminProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  legalContent: LegalContent;
  setLegalContent: React.Dispatch<React.SetStateAction<LegalContent>>;
}

export const Admin: React.FC<AdminProps> = ({ projects, setProjects, legalContent, setLegalContent }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'legal'>('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [croppingImage, setCroppingImage] = useState<{ src: string, index: number | null } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cropRatio] = useState<number>(16/9);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') setIsLoggedIn(true);
    else alert('Falsches Passwort.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setCroppingImage({ src: event.target?.result as string, index: null });
    reader.readAsDataURL(file);
  };

  const applyCrop = () => {
    if (!canvasRef.current || !croppingImage || !editingProject) return;
    const croppedDataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
    if (croppingImage.index === null) {
      setEditingProject({ ...editingProject, images: [...(editingProject.images || []), croppedDataUrl] });
    } else {
      const newImages = [...editingProject.images];
      newImages[croppingImage.index] = croppedDataUrl;
      setEditingProject({ ...editingProject, images: newImages });
    }
    setCroppingImage(null);
  };

  // PERSISTENCE LOGIC
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsSaving(true);

    try {
      const dbObject = {
        id: editingProject.id,
        title: editingProject.title,
        client: editingProject.client,
        year: editingProject.year,
        short_description: editingProject.shortDescription,
        long_description: editingProject.longDescription,
        categories: editingProject.categories,
        images: editingProject.images,
        preview_image_index: editingProject.previewImageIndex
      };

      const { error } = await supabase
        .from('projects')
        .upsert(dbObject);

      if (error) throw error;

      if (isAdding) setProjects([editingProject, ...projects]);
      else setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      
      // Fallback update
      localStorage.setItem('mack_projects', JSON.stringify(isAdding ? [editingProject, ...projects] : projects.map(p => p.id === editingProject.id ? editingProject : p)));
      
      setEditingProject(null);
      setIsAdding(false);
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Speichern fehlgeschlagen. Prüfen Sie die Datenbank-Verbindung.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Projekt wirklich löschen?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('mack_projects', JSON.stringify(updated));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const updateLegal = async () => {
    try {
      const { error } = await supabase
        .from('legal_content')
        .upsert({ id: 'singleton', ...legalContent });
      if (error) throw error;
      localStorage.setItem('mack_legal', JSON.stringify(legalContent));
      alert('Rechtliches gespeichert!');
    } catch (err) {
      console.error('Legal update error:', err);
    }
  };

  useEffect(() => {
    if (!croppingImage || !canvasRef.current) return;
    const img = new Image();
    img.src = croppingImage.src;
    img.onload = () => {
      const ctx = canvasRef.current!.getContext('2d');
      if (!ctx) return;
      const targetWidth = 1200;
      const targetHeight = targetWidth / cropRatio;
      canvasRef.current!.width = targetWidth;
      canvasRef.current!.height = targetHeight;
      const imgRatio = img.width / img.height;
      let drawW, drawH, drawX, drawY;
      if (imgRatio > cropRatio) {
        drawH = img.height; drawW = drawH * cropRatio;
        drawX = (img.width - drawW) / 2; drawY = 0;
      } else {
        drawW = img.width; drawH = drawW / cropRatio;
        drawX = 0; drawY = (img.height - drawH) / 2;
      }
      ctx.drawImage(img, drawX, drawY, drawW, drawH, 0, 0, targetWidth, targetHeight);
    };
  }, [croppingImage, cropRatio]);

  const createEmptyProject = (): Project => ({
    id: Date.now().toString(),
    title: '',
    client: '',
    category: '',
    categories: [],
    images: [],
    previewImageIndex: 0,
    shortDescription: '',
    longDescription: '',
    year: new Date().getFullYear().toString()
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-10 rounded-3xl">
          <h1 className="text-3xl font-display font-bold mb-8 text-center tracking-tighter">MACK BACKEND</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-4 outline-none text-white" placeholder="Passwort..." />
            <button className="w-full py-4 bg-[#ef7800] text-white font-bold rounded-full text-xs uppercase tracking-widest">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <span className="text-[#ef7800] font-bold uppercase tracking-widest text-[10px]">Dashboard</span>
            <h1 className="text-5xl font-display font-bold tracking-tighter mt-2">MACK CONTROL.</h1>
          </div>
          <div className="flex gap-4 p-1 bg-white/5 rounded-2xl">
            <button onClick={() => setActiveTab('projects')} className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>Portfolio</button>
            <button onClick={() => setActiveTab('legal')} className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'legal' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>Rechtliches</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'projects' ? (
            <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex justify-end mb-8">
                {!editingProject && <button onClick={() => { setEditingProject(createEmptyProject()); setIsAdding(true); }} className="px-8 py-3 bg-[#ef7800] text-white rounded-full text-xs font-bold uppercase tracking-widest">Neues Projekt</button>}
              </div>

              {editingProject ? (
                <div className="bg-zinc-900 p-10 rounded-3xl border border-white/10">
                  <form onSubmit={saveProject} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500">Projekt Titel</label>
                            <input required value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-white" placeholder="Titel" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500">Jahr</label>
                            <input required value={editingProject.year} onChange={e => setEditingProject({...editingProject, year: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-white" placeholder="2024" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-zinc-500">Kunde</label>
                          <input required value={editingProject.client} onChange={e => setEditingProject({...editingProject, client: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-white" placeholder="Name des Kunden" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-zinc-500">Kategorien (kommagetrennt)</label>
                          <input value={editingProject.categories?.join(', ') || ''} onChange={e => setEditingProject({...editingProject, categories: e.target.value.split(',').map(s => s.trim())})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-white" placeholder="Design, Strategie, Web..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-zinc-500">Kurzbeschreibung (Vorschau)</label>
                          <textarea rows={2} value={editingProject.shortDescription} onChange={e => setEditingProject({...editingProject, shortDescription: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-white resize-none" placeholder="Kurzer Teaser..." />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-zinc-500">Lange Beschreibung (Detailseite)</label>
                          <textarea rows={6} value={editingProject.longDescription} onChange={e => setEditingProject({...editingProject, longDescription: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-white resize-none" placeholder="Ausführliche Projektbeschreibung..." />
                        </div>
                        <div className="space-y-4">
                           <label className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs uppercase tracking-widest text-white block text-center border border-white/10">
                            + Bild Hochladen
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {editingProject.images.map((img, i) => (
                              <div key={i} className={`relative aspect-square rounded-xl overflow-hidden border ${i === editingProject.previewImageIndex ? 'border-[#ef7800]' : 'border-white/5'}`}>
                                <img src={img} className="w-full h-full object-cover" />
                                <div className="absolute inset-x-0 bottom-0 p-1 bg-black/60 backdrop-blur-md flex justify-around">
                                  <button type="button" onClick={() => setEditingProject({...editingProject, previewImageIndex: i})} className="text-[8px] uppercase tracking-tighter text-white">Vorschau</button>
                                  <button type="button" onClick={() => setEditingProject({...editingProject, images: editingProject.images.filter((_, idx) => idx !== i)})} className="text-[8px] uppercase tracking-tighter text-red-500">Lösch</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-8 border-t border-white/10">
                      <button type="button" onClick={() => { setEditingProject(null); setIsAdding(false); }} className="px-8 py-3 text-zinc-500 hover:text-white uppercase text-xs tracking-widest">Abbrechen</button>
                      <button type="submit" disabled={isSaving} className="px-12 py-4 bg-[#ef7800] text-white font-bold rounded-full uppercase text-xs tracking-widest shadow-xl shadow-orange-900/20 disabled:opacity-50">
                        {isSaving ? 'Speichert...' : 'Projekt Speichern'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {projects.map(p => (
                    <div key={p.id} className="bg-zinc-900 border border-white/5 p-6 rounded-3xl flex items-center gap-6 group hover:border-white/20 transition-all">
                      <img src={p.images[p.previewImageIndex] || ''} className="w-16 h-12 object-cover rounded-lg" />
                      <div className="flex-grow">
                        <h3 className="font-bold">{p.title}</h3>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{p.client} — {p.year}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingProject(p)} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all">Edit</button>
                        <button onClick={() => deleteProject(p.id)} className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all">Löschen</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="legal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
               <div className="bg-zinc-900 p-10 rounded-3xl border border-white/10">
                 <h2 className="text-xl font-bold mb-6 tracking-tighter uppercase">Impressum bearbeiten</h2>
                 <textarea rows={10} value={legalContent.impressum} onChange={e => setLegalContent({...legalContent, impressum: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-white font-mono text-sm leading-relaxed outline-none focus:border-[#ef7800] transition-colors" />
               </div>
               <div className="bg-zinc-900 p-10 rounded-3xl border border-white/10">
                 <h2 className="text-xl font-bold mb-6 tracking-tighter uppercase">Datenschutz bearbeiten</h2>
                 <textarea rows={10} value={legalContent.datenschutz} onChange={e => setLegalContent({...legalContent, datenschutz: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-white font-mono text-sm leading-relaxed outline-none focus:border-[#ef7800] transition-colors" />
               </div>
               <div className="flex justify-end">
                  <button onClick={updateLegal} className="px-10 py-4 bg-white text-black font-bold rounded-full uppercase text-xs tracking-widest hover:bg-[#ef7800] hover:text-white transition-all">Änderungen speichern</button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {croppingImage && (
            <motion.div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-10">
              <div className="max-w-xl w-full text-center">
                <canvas ref={canvasRef} className="max-w-full rounded-2xl mb-8 border border-white/10" />
                <button onClick={applyCrop} className="px-10 py-3 bg-[#ef7800] text-white rounded-full font-bold uppercase text-xs tracking-widest">Zuschneiden</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
