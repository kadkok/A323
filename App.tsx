
import React, { useState, useEffect, useCallback } from 'react';
import { analyzeVerse, performConcordanceSearch, expandConcordanceList } from './services/geminiService';
import { BibleApiResponse, AnalysisResult, ConcordanceResult, Project, Permission } from './types';
import NavigationModal from './components/NavigationModal';
import CollaboratorsPanel from './components/CollaboratorsPanel';
import AtmosphereBackground, { AtmosphereVariant } from './components/AtmosphereBackground';
import ParallaxContainer from './components/ParallaxContainer';

const App: React.FC = () => {
  // --- AUTH REMOVED: Default to "Guest Archaeologist" ---
  const currentUser = { name: "Visitante", email: "guest@codex.ai", id: "guest" };
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [showCollabModal, setShowCollabModal] = useState(false);
  
  // Theme State
  const [atmosphere, setAtmosphere] = useState<AtmosphereVariant>('tomb');

  // Search States
  const [searchMode, setSearchMode] = useState<'verse' | 'word'>('verse');
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // Verse Mode Data
  const [currentVerse, setCurrentVerse] = useState<BibleApiResponse | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [additionalParagraphs, setAdditionalParagraphs] = useState<string[]>([]);
  const [newParagraphInput, setNewParagraphInput] = useState('');
  
  // Concordance Mode Data
  const [concordanceData, setConcordanceData] = useState<ConcordanceResult | null>(null);
  const [isLoadingExpansion, setIsLoadingExpansion] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'philology' | 'archaeology'>('info');

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);

  const handleSearch = useCallback(async (customRef?: string) => {
    const query = customRef || searchInput;
    if (!query) return;

    setIsLoading(true);
    setError(null);

    // Reset previous states
    if (searchMode === 'verse') {
      setConcordanceData(null);
      setAnalysis(null);
      setAdditionalParagraphs([]);
    } else {
      setCurrentVerse(null);
      setAnalysis(null);
    }

    try {
      if (searchMode === 'verse') {
        // --- VERSE MODE ---
        const res = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=almeida`);
        if (!res.ok) throw new Error("Referência clássica não localizada.");
        
        const data: BibleApiResponse = await res.json();
        setCurrentVerse(data);
        const aiAnalysis = await analyzeVerse(data.text, data.reference);
        setAnalysis(aiAnalysis);
      } else {
        // --- WORD/CONCORDANCE MODE ---
        const result = await performConcordanceSearch(query);
        setConcordanceData(result);
      }
    } catch (err: any) {
      setError(err.message || "Erro na escavação de dados.");
    } finally {
      setIsLoading(false);
    }
  }, [searchInput, searchMode]);

  const handleExpandConcordance = async () => {
    if (!concordanceData) return;
    setIsLoadingExpansion(true);
    try {
      const allRefs = await expandConcordanceList(concordanceData.word);
      setConcordanceData(prev => prev ? { ...prev, allOccurrences: allRefs } : null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingExpansion(false);
    }
  };

  const onNavSelect = (ref: string) => {
    setSearchMode('verse'); // Force verse mode when picking from nav
    setSearchInput(ref);
    setIsNavOpen(false);
    handleSearch(ref);
  };

  const addParagraph = () => {
    if (!newParagraphInput.trim()) return;
    setAdditionalParagraphs(prev => [...prev, newParagraphInput.trim()]);
    setNewParagraphInput('');
  };

  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-gray-200 relative overflow-hidden transition-colors duration-1000">
      <AtmosphereBackground variant={atmosphere} />
      
      {/* Header */}
      <header className="sticky top-0 z-[100] backdrop-blur-xl bg-black/60 border-b border-[#d4af37]/20 p-4 md:px-12 flex justify-between items-center transition-colors duration-500">
        <div className="flex items-center gap-6">
          {/* LOGO A323 SVG */}
          <div className="relative group">
            <svg width="100" height="40" viewBox="0 0 140 50" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
              <defs>
                 <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Triangle A (Delta) */}
              <path 
                d="M25 5 L45 45 H5 Z" 
                fill="none" 
                stroke="#d4af37" 
                strokeWidth="4" 
                strokeLinejoin="round"
                filter="url(#gold-glow)"
                className="group-hover:stroke-white transition-colors duration-300"
              />
              {/* 323 Text */}
              <text 
                x="55" 
                y="45" 
                fontFamily="'Cinzel', serif" 
                fontSize="42" 
                fontWeight="bold" 
                fill="#d4af37" 
                letterSpacing="2"
                filter="url(#gold-glow)"
                className="group-hover:fill-white transition-colors duration-300"
              >
                323
              </text>
            </svg>
          </div>

          <div className="hidden md:block h-10 w-px bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent"></div>

          <div>
            <h1 className="font-cinzel text-[#d4af37] text-lg md:text-2xl tracking-[0.2em] leading-none uppercase drop-shadow-md">Bíbl.IA</h1>
            <p className="text-[10px] text-[#b87333] font-bold tracking-[0.3em] uppercase mt-1">de G.S.Oliver</p>
          </div>
        </div>
        
        {/* Theme Selector */}
        <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-full p-1">
           <button 
             onClick={() => setAtmosphere('tomb')} 
             className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all ${atmosphere === 'tomb' ? 'bg-[#d4af37] text-black shadow-[0_0_10px_#d4af37]' : 'text-gray-500 hover:text-white'}`}
             title="Tumba (Neblina)"
           >
             ☁
           </button>
           <button 
             onClick={() => setAtmosphere('desert')} 
             className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all ${atmosphere === 'desert' ? 'bg-[#3b82f6] text-black shadow-[0_0_10px_#3b82f6]' : 'text-gray-500 hover:text-white'}`}
             title="Deserto (Noite)"
           >
             ☾
           </button>
           <button 
             onClick={() => setAtmosphere('codex')} 
             className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all ${atmosphere === 'codex' ? 'bg-white text-black shadow-[0_0_10px_white]' : 'text-gray-500 hover:text-white'}`}
             title="Codex (Grade)"
           >
             ▦
           </button>
        </div>

        <div className="flex items-center gap-4 hidden md:flex">
          <span className="text-[10px] text-gray-500 font-cinzel tracking-widest uppercase">Acesso Convidado</span>
          <div className="w-8 h-8 rounded-full border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] font-cinzel text-xs">
            V
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1800px] mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-[300px_1fr_400px] gap-6 relative z-10">
        
        {/* LEFT: TOOLS & NAV */}
        <aside className="space-y-6">
          <div className="bg-[#0f1115]/80 backdrop-blur-md p-5 border-l-2 border-[#d4af37] shadow-2xl space-y-4 rounded-r-sm">
            <h4 className="font-cinzel text-[10px] text-[#d4af37] tracking-widest uppercase mb-2">Ferramenta de Escavação</h4>
            
            {/* Mode Toggle */}
            <div className="flex bg-black/50 p-1 mb-4 rounded border border-white/5">
               <button 
                 onClick={() => setSearchMode('verse')}
                 className={`flex-1 text-[9px] uppercase tracking-widest py-2 transition-all ${searchMode === 'verse' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-500 hover:text-white'}`}
               >
                 Versículo
               </button>
               <button 
                 onClick={() => setSearchMode('word')}
                 className={`flex-1 text-[9px] uppercase tracking-widest py-2 transition-all ${searchMode === 'word' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-500 hover:text-white'}`}
               >
                 Palavra
               </button>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={searchMode === 'verse' ? "Ex: Gênesis 1:1" : "Ex: Amor, Luz, Templo"}
                className="flex-1 bg-[#050505] border border-white/10 p-2 text-white font-cinzel text-xs focus:border-[#d4af37] outline-none"
              />
              <button onClick={() => handleSearch()} disabled={isLoading} className="bg-[#d4af37] text-black px-3 font-bold hover:brightness-110 text-xs">GO</button>
            </div>
            
            {searchMode === 'verse' && (
              <button onClick={() => setIsNavOpen(true)} className="w-full bg-white/5 border border-white/5 py-2 text-[9px] text-gray-400 tracking-[0.3em] uppercase hover:bg-white/10">
                Navegar Cânone
              </button>
            )}
          </div>
        </aside>

        {/* CENTER: THE SCROLL / CONTENT AREA (PARALLAX ENABLED) */}
        <section className="h-[80vh]">
          <ParallaxContainer>
            <div className="relative h-full w-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#d4af37]/30">
              <div className="p-8 md:p-12 min-h-full">
                
                {/* Loading State */}
                {isLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-sm rounded-sm">
                    <div className="w-20 h-20 border-t-2 border-b-2 border-[#d4af37] rounded-full animate-spin"></div>
                    <p className="mt-6 font-cinzel text-[#d4af37] text-[10px] tracking-[0.4em] uppercase animate-pulse">
                      {searchMode === 'verse' ? 'Escavando Dados...' : 'Mapeando Ocorrências...'}
                    </p>
                  </div>
                )}
                
                {/* --- VIEW: VERSE ANALYSIS --- */}
                {searchMode === 'verse' && (
                  <>
                    <div className="flex justify-between items-end mb-8 border-b border-[#d4af37]/20 pb-4">
                      <span className="font-cinzel text-[#d4af37] text-lg tracking-[0.2em] shadow-black drop-shadow-md">{currentVerse?.reference}</span>
                      <span className="text-[9px] text-gray-500 uppercase font-bold">Codex V.1</span>
                    </div>

                    <div className="font-playfair text-2xl md:text-3xl leading-[1.6] text-gray-100 text-center italic mb-12 px-4 drop-shadow-lg">
                      {currentVerse ? `"${currentVerse.text}"` : "O silêncio precede a revelação. Inicie a busca."}
                    </div>
                    
                    {analysis && (
                      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {analysis.sections.map((section, idx) => (
                          <div key={idx} className="relative group">
                            <h3 className="font-cinzel text-[#b87333] text-sm tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                              <span className="text-[10px] opacity-50">0{idx + 1}</span>
                              {section.title}
                            </h3>
                            <p className="text-gray-300 font-serif text-base leading-relaxed whitespace-pre-line border-l border-white/5 pl-4 group-hover:border-[#d4af37]/50 transition-colors">
                              {section.content}
                            </p>
                            
                            {section.footnotes && section.footnotes.length > 0 && (
                              <div className="mt-6 ml-4 bg-black/20 border border-[#d4af37]/20 p-4 rounded-sm relative">
                                <div className="absolute -top-3 left-4 bg-[#0d0f14] px-2 text-[9px] text-[#d4af37] uppercase tracking-widest border border-[#d4af37]/20">
                                  Referências Cruzadas & Apócrifas
                                </div>
                                <ul className="space-y-3 mt-1">
                                  {section.footnotes.map((note, noteIdx) => (
                                    <li key={noteIdx} className="text-xs text-gray-400 font-serif">
                                      <strong className="text-[#b87333] block mb-1 font-sans text-[10px] uppercase tracking-wide">{note.source}</strong>
                                      <span className="italic opacity-90">"{note.text}"</span>
                                      <span className="block mt-1 text-[10px] text-gray-500 font-sans border-t border-white/5 pt-1">{note.connection}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* --- VIEW: WORD CONCORDANCE --- */}
                {searchMode === 'word' && concordanceData && (
                  <div className="animate-in zoom-in-95 duration-700 space-y-10">
                    <div className="text-center border-b border-[#d4af37]/20 pb-6">
                       <h2 className="font-cinzel text-[#d4af37] text-3xl tracking-[0.3em] uppercase mb-2 drop-shadow-md">{concordanceData.word}</h2>
                       <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                         ~ {concordanceData.totalOccurrences} menções nas Escrituras
                       </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* ALPHA */}
                      <div className="bg-black/30 border border-[#d4af37]/20 p-6 relative group hover:border-[#d4af37] transition-all">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#050505] border border-[#d4af37] flex items-center justify-center text-2xl text-[#d4af37] font-serif shadow-[0_0_15px_#d4af37_40]">Α</div>
                        <h3 className="text-right font-cinzel text-[#b87333] text-xs uppercase tracking-widest mb-4">Gênesis da Palavra</h3>
                        <p className="font-serif italic text-gray-300 mb-4 text-lg">"{concordanceData.firstMention.text}"</p>
                        <div className="text-right border-t border-white/5 pt-2">
                           <span className="text-[#d4af37] font-bold text-xs">{concordanceData.firstMention.reference}</span>
                        </div>
                      </div>

                      {/* OMEGA */}
                      <div className="bg-black/30 border border-[#d4af37]/20 p-6 relative group hover:border-[#d4af37] transition-all">
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#050505] border border-[#d4af37] flex items-center justify-center text-2xl text-[#d4af37] font-serif shadow-[0_0_15px_#d4af37_40]">Ω</div>
                        <h3 className="text-left font-cinzel text-[#b87333] text-xs uppercase tracking-widest mb-4">Último Eco</h3>
                        <p className="font-serif italic text-gray-300 mb-4 text-lg">"{concordanceData.lastMention.text}"</p>
                        <div className="text-left border-t border-white/5 pt-2">
                           <span className="text-[#d4af37] font-bold text-xs">{concordanceData.lastMention.reference}</span>
                        </div>
                      </div>
                    </div>

                    {/* SHOW MORE / LIST */}
                    <div className="text-center pt-8">
                      {(!concordanceData.allOccurrences || concordanceData.allOccurrences.length === 0) ? (
                        <button 
                          onClick={handleExpandConcordance} 
                          disabled={isLoadingExpansion}
                          className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-[#d4af37]/10 border border-[#d4af37] hover:bg-[#d4af37] hover:text-black focus:outline-none"
                        >
                          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                          <span className="relative font-cinzel text-xs tracking-[0.2em]">
                            {isLoadingExpansion ? 'Desenrolando o Papiro...' : 'Mostrar Todas as Conexões'}
                          </span>
                        </button>
                      ) : (
                         <div className="space-y-4 text-left animate-in slide-in-from-bottom-10 fade-in duration-700">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1"></div>
                              <span className="font-cinzel text-[#d4af37] text-xs uppercase tracking-widest">Ocorrências Relevantes</span>
                              <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1"></div>
                            </div>
                            {concordanceData.allOccurrences.map((occ, i) => (
                              <div key={i} className="p-4 bg-white/5 border-l border-[#d4af37]/30 hover:bg-white/10 transition-colors">
                                 <div className="flex justify-between mb-2">
                                   <span className="text-[#b87333] font-bold text-xs">{occ.reference}</span>
                                 </div>
                                 <p className="text-gray-400 text-sm font-serif italic">"{occ.text}"</p>
                                 {occ.contextSummary && <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-wide">{occ.contextSummary}</p>}
                              </div>
                            ))}
                         </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!currentVerse && !concordanceData && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-gray-600 opacity-40">
                     <div className="text-6xl mb-4 drop-shadow-lg">☩</div>
                     <p className="font-cinzel tracking-widest text-xs uppercase">Aguardando Parâmetros de Busca</p>
                  </div>
                )}
              </div>
            </div>
          </ParallaxContainer>

          {/* ADDITIONAL PARAGRAPHS */}
          {searchMode === 'verse' && currentVerse && (
            <div className="bg-[#0f1115]/90 backdrop-blur-sm border border-[#d4af37]/10 p-6 shadow-xl mt-4 mx-4 mb-20 rounded-sm">
              <h4 className="font-cinzel text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4 text-center">Notas de Campo</h4>
              <div className="space-y-3 mb-4">
                {additionalParagraphs.map((para, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border-l-2 border-[#b87333] text-gray-400 font-serif italic text-sm">
                    "{para}"
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <textarea 
                  value={newParagraphInput}
                  onChange={(e) => setNewParagraphInput(e.target.value)}
                  className="flex-1 bg-black/50 border border-white/10 p-3 text-sm focus:border-[#b87333] outline-none h-20 resize-none font-serif text-gray-300"
                  placeholder="Registre suas correlações..."
                />
                <button onClick={addParagraph} className="w-10 bg-[#b87333]/10 border border-[#b87333] text-[#b87333] hover:bg-[#b87333] hover:text-black transition-all flex items-center justify-center text-xl font-serif">
                  ¶
                </button>
              </div>
            </div>
          )}
        </section>

        {/* RIGHT: DEEP CONTEXT SIDEBAR */}
        <aside className="bg-[#0f1115]/80 backdrop-blur-md border-l border-white/5 flex flex-col h-[85vh] sticky top-24 overflow-hidden shadow-2xl rounded-l-sm">
          {/* TABS */}
          <div className="flex border-b border-white/10">
            <button 
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-4 text-[9px] uppercase tracking-widest font-bold transition-all ${activeTab === 'info' ? 'text-[#d4af37] bg-white/5 border-b-2 border-[#d4af37]' : 'text-gray-600 hover:text-gray-400'}`}
            >
              Contexto
            </button>
            <button 
              onClick={() => setActiveTab('philology')}
              className={`flex-1 py-4 text-[9px] uppercase tracking-widest font-bold transition-all ${activeTab === 'philology' ? 'text-[#d4af37] bg-white/5 border-b-2 border-[#d4af37]' : 'text-gray-600 hover:text-gray-400'}`}
            >
              Linguística
            </button>
            <button 
              onClick={() => setActiveTab('archaeology')}
              className={`flex-1 py-4 text-[9px] uppercase tracking-widest font-bold transition-all ${activeTab === 'archaeology' ? 'text-[#d4af37] bg-white/5 border-b-2 border-[#d4af37]' : 'text-gray-600 hover:text-gray-400'}`}
            >
              Arqueologia
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800">
            {/* If in Word Mode, we can show generic dictionary info or hide */}
            {searchMode === 'word' && concordanceData ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <p className="text-center text-[10px] mb-4">ANÁLISE ETIMOLÓGICA DA PALAVRA</p>
                  <h2 className="text-2xl text-[#d4af37] font-serif italic mb-2">{concordanceData.word}</h2>
                  <p className="text-xs text-center px-4">Aprofunde-se nos originais clicando nas referências ao lado.</p>
               </div>
            ) : (!analysis ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-50">
                <div className="text-4xl mb-4">🏛️</div>
                <p className="text-[10px] uppercase tracking-widest text-center">Aguardando<br/>Escavação Digital</p>
              </div>
            ) : (
              <>
                {/* TAB: CONTEXTO */}
                {activeTab === 'info' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="bg-[#15171c]/50 p-4 border border-white/5">
                      <h5 className="text-[#b87333] text-[9px] uppercase tracking-widest mb-2 font-bold">Autor</h5>
                      <p className="text-gray-300 font-cinzel text-sm">{analysis.metadata.author}</p>
                    </div>
                    <div className="bg-[#15171c]/50 p-4 border border-white/5">
                      <h5 className="text-[#b87333] text-[9px] uppercase tracking-widest mb-2 font-bold">Datação Estimada</h5>
                      <p className="text-gray-300 font-cinzel text-sm">{analysis.metadata.date}</p>
                    </div>
                    <div className="bg-[#15171c]/50 p-4 border border-white/5">
                      <h5 className="text-[#b87333] text-[9px] uppercase tracking-widest mb-2 font-bold">Local & Audiência</h5>
                      <p className="text-gray-400 text-xs leading-relaxed">{analysis.metadata.location} — Para: {analysis.metadata.audience}</p>
                    </div>
                    <div className="bg-[#15171c]/50 p-4 border border-white/5">
                      <h5 className="text-[#b87333] text-[9px] uppercase tracking-widest mb-2 font-bold">Língua Original</h5>
                      <p className="text-gray-300 font-serif italic">{analysis.metadata.originalLanguage}</p>
                    </div>
                  </div>
                )}

                {/* TAB: FILOLOGIA & GEMATRIA */}
                {activeTab === 'philology' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h5 className="font-cinzel text-white text-xs border-b border-white/10 pb-2 mb-4">Dicionário Etimológico</h5>
                      <div className="space-y-3">
                        {analysis.etymology.map((etym, i) => (
                          <div key={i} className="group cursor-help">
                            <div className="flex justify-between text-[#d4af37] font-bold font-serif">
                              <span>{etym.word}</span>
                              <span className="opacity-70">{etym.original}</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mb-1">{etym.transliteration}</p>
                            <p className="text-gray-400 text-xs leading-tight border-l-2 border-[#d4af37]/0 pl-2 group-hover:border-[#d4af37] transition-all">{etym.definition}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-cinzel text-white text-xs border-b border-white/10 pb-2 mb-4">Calculadora Gematria</h5>
                      <div className="grid gap-3">
                        {analysis.gematria.map((gem, i) => (
                          <div key={i} className="bg-[#050505]/50 p-3 border border-[#d4af37]/30 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-1 bg-[#d4af37] text-black text-[9px] font-bold">∑ {gem.value}</div>
                            <p className="text-2xl text-gray-200 font-serif mb-1 mt-2">{gem.original}</p>
                            <p className="text-[10px] text-[#b87333] uppercase">{gem.word}</p>
                            <p className="text-[10px] text-gray-500 mt-2 italic border-t border-white/5 pt-2">"{gem.meaning}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: ARQUEOLOGIA */}
                {activeTab === 'archaeology' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    {analysis.archaeology.map((arc, i) => (
                      <div key={i} className="bg-[#121418]/50 border border-white/10 overflow-hidden group hover:border-[#b87333] transition-all">
                        <div className="h-24 bg-gradient-to-br from-gray-900 to-black relative flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                          <span className="font-cinzel text-4xl text-white/10 group-hover:text-[#b87333]/20 transition-colors">Artefato</span>
                        </div>
                        <div className="p-4">
                          <h6 className="text-[#d4af37] font-cinzel text-xs mb-1">{arc.title}</h6>
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-3">{arc.date}</p>
                          <p className="text-gray-400 text-xs leading-relaxed font-serif">{arc.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        </aside>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-6 bg-black/80 backdrop-blur-md border-t border-[#d4af37]/10 text-center z-50 relative">
        <p className="font-cinzel text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Todos os direitos reservados — <span className="text-[#d4af37]">Academy323</span> / A323
        </p>
      </footer>

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
