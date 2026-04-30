import React from 'react';
import { Category } from '../types';
import { CATEGORY_LABELS, CATEGORY_DESCRIPTIONS, CATEGORY_COLORS, CATEGORY_ICONS, PUZZLES } from '../constants';

interface Props {
  onSelect: (category: Category) => void;
  onBack: () => void;
}

const CARD_CLASS: Record<string, string> = {
  cyan: 'card-cyan', green: 'card-green', yellow: 'card-yellow', pink: 'card-pink',
};
const NEON_CLASS: Record<string, string> = {
  cyan: 'neon-cyan', green: 'neon-green', yellow: 'neon-yellow', pink: 'neon-pink',
};

const CategorySelector: React.FC<Props> = ({ onSelect, onBack }) => {
  const categories = Object.keys(CATEGORY_LABELS) as Category[];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 fade-in">
      <div className="text-center mb-8">
        <div className="font-orbitron text-2xl neon-cyan tracking-widest mb-1">SELECIONE</div>
        <div className="font-orbitron text-sm text-cyber-dim tracking-[0.4em]">CATEGORIA</div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
        {categories.map(cat => {
          const color = CATEGORY_COLORS[cat];
          const pts = PUZZLES[cat].reduce((s, p) => s + p.points, 0);
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`${CARD_CLASS[color]} rounded p-5 text-left transition-transform hover:scale-105 active:scale-95`}
              style={{ cursor: 'pointer' }}
            >
              <div className={`text-3xl mb-3 ${NEON_CLASS[color]}`}>{CATEGORY_ICONS[cat]}</div>
              <div className={`font-orbitron text-sm font-bold ${NEON_CLASS[color]} tracking-wider mb-1`}>
                {CATEGORY_LABELS[cat]}
              </div>
              <div className="text-cyber-dim text-xs leading-tight mb-3">
                {CATEGORY_DESCRIPTIONS[cat]}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cyber-dim text-xs">{PUZZLES[cat].length} puzzles</span>
                <span className={`text-xs ${NEON_CLASS[color]}`}>{pts}pts</span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="text-xs text-cyber-dim tracking-widest transition-colors"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#505080' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#00e5ff')}
        onMouseLeave={e => (e.currentTarget.style.color = '#505080')}
      >
        ← VOLTAR
      </button>
    </div>
  );
};

export default CategorySelector;
