
import React, { useState, useEffect } from 'react';
import { BIBLE_STRUCTURE } from '../constants';
import { SelectionState } from '../types';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (ref: string) => void;
}

const NavigationModal: React.FC<NavigationModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [selection, setSelection] = useState<SelectionState>({ book: null, chapter: null });
  const [availableVerses, setAvailableVerses] = useState<number[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);

  useEffect(() => {
    if (selection.book && selection.chapter) {
      fetchVerses();
    }
  }, [selection.book, selection.chapter]);

  const fetchVerses = async () => {
    if (!selection.book || !selection.chapter) return;
    setIsLoadingVerses(true);
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(selection.book)}+${selection.chapter}?translation=almeida`);
      const data = await res.json();
      const count = data.verses.length;
      setAvailableVerses(Array.from({ length: count }, (_, i) => i + 1));
    } catch (e) {
      setAvailableVerses([]);
    } finally {
      setIsLoadingVerses(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-[2000] flex flex-col animate-in fade-in duration-300">
      <div className="p-6 bg-black flex justify-between items-center border-b border-[#d4af37]">
        <h2 className="font-cinzel text-[#d4af37] text-xl">Navegação Textual</h2>
        <button onClick={onClose} className="text-white text-3xl hover:text-[#d4af37] transition-colors">&times;</button>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#d4af37] overflow-hidden">
        {/* Books */}
        <div className="bg-[#121418] p-6 overflow-y-auto">
          <h3 className="font-cinzel text-white text-sm mb-4 sticky top-0 bg-[#121418] py-2 border-b border-white/10">1. Livro</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#b87333] mb-2">Antigo Testamento</p>
              <div className="flex flex-col gap-1">
                {BIBLE_STRUCTURE.ot.map(b => (
                  <button 
                    key={b} 
                    onClick={() => setSelection({ book: b, chapter: null })}
                    className={`text-left p-2 rounded transition-all text-sm ${selection.book === b ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#b87333] mb-2">Novo Testamento</p>
              <div className="flex flex-col gap-1">
                {BIBLE_STRUCTURE.nt.map(b => (
                  <button 
                    key={b} 
                    onClick={() => setSelection({ book: b, chapter: null })}
                    className={`text-left p-2 rounded transition-all text-sm ${selection.book === b ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="bg-[#121418] p-6 overflow-y-auto">
          <h3 className="font-cinzel text-white text-sm mb-4 sticky top-0 bg-[#121418] py-2 border-b border-white/10">2. Capítulo</h3>
          {!selection.book ? (
            <p className="text-gray-600 text-center mt-10 italic">Selecione um livro</p>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {Array.from({ length: BIBLE_STRUCTURE.chapters[selection.book] || 0 }, (_, i) => i + 1).map(c => (
                <button 
                  key={c}
                  onClick={() => setSelection(prev => ({ ...prev, chapter: c }))}
                  className={`aspect-square flex items-center justify-center rounded transition-all border border-transparent ${selection.chapter === c ? 'bg-[#d4af37] text-black font-bold' : 'bg-white/5 text-gray-400 hover:border-[#d4af37] hover:text-white'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Verses */}
        <div className="bg-[#121418] p-6 overflow-y-auto">
          <h3 className="font-cinzel text-white text-sm mb-4 sticky top-0 bg-[#121418] py-2 border-b border-white/10">3. Versículo</h3>
          {!selection.chapter ? (
            <p className="text-gray-600 text-center mt-10 italic">Selecione um capítulo</p>
          ) : isLoadingVerses ? (
            <p className="text-[#d4af37] text-center mt-10 animate-pulse">Carregando...</p>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {availableVerses.map(v => (
                <button 
                  key={v}
                  onClick={() => onSelect(`${selection.book} ${selection.chapter}:${v}`)}
                  className="aspect-square flex items-center justify-center rounded bg-white/5 text-gray-400 border border-transparent hover:border-[#d4af37] hover:text-white transition-all"
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationModal;
