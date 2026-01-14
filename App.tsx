
import React, { useState, useEffect, useCallback } from 'react';
import { ABBREVIATIONS } from './constants';
import { analyzeVerse } from './services/geminiService';
import { BibleApiResponse, AnalysisResult, User, Project, Permission } from './types';
import NavigationModal from './components/NavigationModal';
import AuthModal from './components/AuthModal';
import CollaboratorsPanel from './components/CollaboratorsPanel';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [showCollabModal, setShowCollabModal] = useState(false);
  
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<BibleApiResponse | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // New state for additional paragraphs
  const [additionalParagraphs, setAdditionalParagraphs] = useState<string[]>([]);
  const [newParagraphInput, setNewParagraphInput] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const activeProject = projects.find(p => p.id === activeProjectId);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleSearch = useCallback(async (customRef?: string) => {
    const query = customRef || searchInput;
    if (!query) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setAdditionalParagraphs([]); // Reset notes for new search

    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=almeida`);
      if (!res.ok) throw new Error("Referência clássica não localizada.");
      
      const data: BibleApiResponse = await res.json();
      setCurrentVerse(data);
      
      const aiAnalysis = await analyzeVerse(data.text, data.reference);
      setAnalysis(aiAnalysis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchInput]);

  const onNavSelect = (ref: string) => {
    setSearchInput(ref);
    setIsNavOpen(false);
    handleSearch(ref);
  };

  const addParagraph = () => {
    if (!newParagraphInput.trim()) return;
    setAdditionalParagraphs(prev => [...prev, newParagraphInput.trim()]);
    setNewParagraphInput('');
  };

  if (!currentUser) {
    return <AuthModal onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      <header className="sticky top-0 z-[100] backdrop-blur-xl bg-black/60 border-b border-[#d4af37]/20 p-4 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-[#d4af37] flex items-center justify-center font-cinzel text-[#d4af37] text-xl font-bold">B</div>
          <div>
            <h1 className="font-cinzel text-[#d4af37] text-xl md:text-2xl tracking-[0.2em] leading-none uppercase">Bíbl.IA Interlinear</h1>
            <p className="text-[9px] text-[#b87333] font-bold tracking-[0.3em] uppercase mt-1">Nexo Léxico & Clássico</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="text-[10px] text-gray-500 hover:text-[#d4af37] transition-colors font-cinzel tracking-widest uppercase">Logout</button>
          <div className="w-8 h-8 rounded-full border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] font-cinzel text-xs">
            {currentUser.name[0]}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1700px] mx-auto w-full p-4 md:p-10 grid grid-cols-1 lg:grid-cols-[350px_1fr_350px] gap-10">
        
        {/* Left: Research Engine */}
        <aside className="space-y-8">
          <div className="bg-[#0f1115] p-6 border-l-2 border-[#d4af37] shadow-2xl space-y-4">
            <h4 className="font-cinzel text-[10px] text-[#d4af37] tracking-widest uppercase mb-4">Mecanismo de Busca</h4>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ex: João 1:1"
                className="flex-1 bg-[#050505] border border-white/10 p-3 text-white font-cinzel text-sm focus:border-[#d4af37] outline-none transition-all"
              />
              <button onClick={() => handleSearch()} disabled={isLoading} className="bg-[#d4af37] text-black px-4 font-bold hover:brightness-110 transition-all">DECODAR</button>
            </div>
            <button 
              onClick={() => setIsNavOpen(true)}
              className="w-full bg-white/5 border border-white/5 py-3 text-[9px] text-gray-400 tracking-[0.3em] uppercase hover:bg-white/10 transition-all"
            >
              Cânone Bíblico Completo
            </button>
          </div>

          <div className="bg-[#0f1115] p-6 border-l-2 border-[#b87333]">
            <h4 className="font-cinzel text-[10px] text-[#b87333] tracking-widest uppercase mb-4">Bibliotecas de Colaboração</h4>
            <button onClick={() => alert('Feature em desenvolvimento')} className="w-full text-center border border-dashed border-white/10 p-4 text-[10px] text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
              + NOVA PESQUISA COLETIVA
            </button>
            {projects.map(p => (
              <div key={p.id} onClick={() => setActiveProjectId(p.id)} className={`mt-4 p-4 border cursor-pointer transition-all ${activeProjectId === p.id ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-white/5 opacity-60'}`}>
                <p className="font-cinzel text-xs text-white">{p.name}</p>
                <p className="text-[9px] text-gray-500 mt-2 uppercase">{p.items.length} Fragmentos Analisados</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Center: The Scroll of Analysis */}
        <section className="space-y-10">
          <div className="relative bg-[#0d0f14] p-8 md:p-14 border border-white/5 shadow-2xl rounded-sm">
            {isLoading && (
              <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-pulse"></div>
                <p className="mt-4 font-cinzel text-[#d4af37] text-[10px] tracking-[0.4em] uppercase">Consultando Manuscritos...</p>
              </div>
            )}
            
            <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
              <span className="font-cinzel text-[#d4af37] text-sm tracking-[0.2em]">{currentVerse?.reference || 'Nexo Iniciado'}</span>
              <span className="text-[10px] text-gray-600 uppercase font-bold tracking-tighter">Papyrus Codex System</span>
            </div>

            <div className="font-playfair text-3xl md:text-4xl leading-[1.8] text-gray-200 text-center italic">
              {currentVerse ? `"${currentVerse.text}"` : "Busque uma passagem para desvelar as raízes linguísticas e filosóficas."}
            </div>
            
            {currentVerse && analysis && (
              <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-1000">
                <div className="space-y-4">
                  <h5 className="font-cinzel text-[10px] text-[#d4af37] font-bold tracking-widest uppercase underline underline-offset-8">Interlinear & Léxico</h5>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line font-serif italic">{analysis.filologia}</p>
                </div>
                <div className="space-y-4">
                  <h5 className="font-cinzel text-[10px] text-[#d4af37] font-bold tracking-widest uppercase underline underline-offset-8">Mitologia & Símbolo</h5>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{analysis.simbolismo}</p>
                </div>
              </div>
            )}
          </div>

          {analysis && (
            <div className="bg-[#1a1d23] p-10 border-t-4 border-[#b87333] shadow-inner">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-white/5"></div>
                <h4 className="font-cinzel text-[#b87333] text-sm tracking-[0.4em] uppercase">Amparo Filosófico Clássico</h4>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>
              <div className="text-gray-300 font-serif text-lg leading-relaxed text-center whitespace-pre-line italic opacity-90">
                {analysis.paralelos}
              </div>
              <div className="flex justify-center mt-10 gap-8">
                {['Homer', 'Hesiod', 'Plato', 'Aristotle', 'Socrates'].map(name => (
                  <span key={name} className="text-[9px] text-gray-600 uppercase tracking-widest border border-white/5 px-3 py-1">{name}</span>
                ))}
              </div>
            </div>
          )}

          {/* New Section: Parágrafos Adicionais */}
          {currentVerse && (
            <div className="bg-[#0f1115] border border-[#d4af37]/10 p-8 shadow-2xl space-y-6">
              <h4 className="font-cinzel text-[#d4af37] text-xs tracking-[0.3em] uppercase flex items-center gap-3">
                <span className="w-8 h-px bg-[#d4af37]/30"></span>
                Parágrafos Adicionais
                <span className="w-8 h-px bg-[#d4af37]/30"></span>
              </h4>

              <div className="space-y-4">
                {additionalParagraphs.map((para, idx) => (
                  <div key={idx} className="p-4 bg-white/5 border-l border-[#d4af37]/50 animate-in slide-in-from-left-2 duration-300">
                    <p className="text-gray-300 font-playfair text-lg leading-relaxed italic">"{para}"</p>
                    <p className="text-[9px] text-[#b87333] uppercase mt-2 tracking-widest">— Nota de Rodapé Acadêmica</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-3">
                <textarea 
                  value={newParagraphInput}
                  onChange={(e) => setNewParagraphInput(e.target.value)}
                  placeholder="Insira notas adicionais, citações ou reflexões clássicas aqui..."
                  className="flex-1 bg-black border border-white/10 p-4 text-gray-300 font-serif text-sm focus:border-[#d4af37] outline-none resize-none transition-all"
                  rows={3}
                />
                <button 
                  onClick={addParagraph}
                  className="bg-transparent border border-[#d4af37] text-[#d4af37] px-6 py-2 font-cinzel text-xs hover:bg-[#d4af37] hover:text-black transition-all flex items-center justify-center self-end"
                >
                  REGISTRAR
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Right: Collaborative Timeline & Activity */}
        <aside className="space-y-8">
          <div className="bg-[#0f1115] p-6 border-r-2 border-[#d4af37] shadow-xl h-full">
            <h4 className="font-cinzel text-[10px] text-[#d4af37] tracking-widest uppercase mb-8 border-b border-white/5 pb-4">Timeline Acadêmica</h4>
            
            {activeProject ? (
              <div className="space-y-10">
                {activeProject.items.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-[#d4af37]/30">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-[#d4af37] rotate-45"></div>
                    <p className="font-cinzel text-[#d4af37] text-xs mb-2">{item.reference}</p>
                    <p className="text-[11px] text-gray-500 line-clamp-3 font-serif italic mb-3">"{item.verseText}"</p>
                    <div className="flex justify-between items-center text-[9px] text-gray-600 uppercase tracking-tighter">
                      <span>Analisado por {item.addedBy}</span>
                      <span className="text-[#b87333]">Ver Nexus</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-700">
                <div className="w-12 h-12 border border-gray-800 rounded-full flex items-center justify-center text-xl mb-4 opacity-50">?</div>
                <p className="text-[10px] text-center uppercase tracking-widest">Nenhuma pesquisa ativa</p>
              </div>
            )}
          </div>
        </aside>
      </main>

      <NavigationModal isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} onSelect={onNavSelect} />
      {showCollabModal && activeProject && (
        <CollaboratorsPanel 
          project={activeProject} 
          onInvite={(email, perm) => {}} 
          onClose={() => setShowCollabModal(false)} 
        />
      )}
    </div>
  );
};

export default App;
