import React, { useState } from 'react';
import { LeaderboardEntry, Category } from '../types';
import { CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';

interface Props {
  entries: LeaderboardEntry[];
  playerName: string;
  onBack: () => void;
}

const NEON_CLASS: Record<string, string> = {
  cyan: 'neon-cyan', green: 'neon-green', yellow: 'neon-yellow', pink: 'neon-pink',
};

type Filter = Category | 'all';

const Leaderboard: React.FC<Props> = ({ entries, playerName, onBack }) => {
  const [filter, setFilter] = useState<Filter>('all');

  const displayed = (filter === 'all' ? entries : entries.filter(e => e.category === filter)).slice(0, 10);
  const filters: Filter[] = ['all', 'logic', 'cipher', 'pattern', 'riddle'];

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-lg mx-auto fade-in">
      <div className="text-center mb-6">
        <div className="font-orbitron text-2xl neon-cyan tracking-widest">RANKING</div>
        <div className="font-orbitron text-xs text-cyber-dim tracking-[0.5em] mt-1">GLOBAL</div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {filters.map(f => {
          const isActive = filter === f;
          const color = f === 'all' ? 'cyan' : CATEGORY_COLORS[f];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-xs font-orbitron tracking-wider whitespace-nowrap transition-all btn-cyber ${isActive ? `btn-${color}` : 'text-cyber-dim'}`}
              style={isActive ? {} : { border: '1px solid #1a1a3a', opacity: 0.6 }}
            >
              {f === 'all' ? 'TODOS' : CATEGORY_LABELS[f]}
            </button>
          );
        })}
      </div>

      {displayed.length === 0 ? (
        <div className="card-cyber rounded p-10 text-center">
          <div className="text-cyber-dim text-sm tracking-widest mb-1">SEM ENTRADAS</div>
          <div className="text-cyber-dim text-xs">Jogue para aparecer no ranking!</div>
        </div>
      ) : (
        <div className="card-cyber rounded overflow-hidden">
          <div className="flex items-center px-4 py-2 text-cyber-dim text-xs tracking-widest" style={{ borderBottom: '1px solid #1a1a3a' }}>
            <span className="w-8">#</span>
            <span className="flex-1">AGENTE</span>
            <span className="w-12 text-center">CAT</span>
            <span className="w-20 text-right">PONTOS</span>
          </div>

          {displayed.map((entry, i) => {
            const isSelf = entry.name === playerName;
            const color = CATEGORY_COLORS[entry.category];
            const medalColor = i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : '#505080';

            return (
              <div
                key={entry.id}
                className="flex items-center px-4 py-3"
                style={{
                  borderBottom: '1px solid #1a1a3a',
                  background: isSelf ? '#00e5ff08' : 'transparent',
                }}
              >
                <span className="w-8 font-orbitron text-sm" style={{ color: medalColor }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm truncate ${isSelf ? 'neon-cyan' : 'text-cyber-text'}`}>
                    {entry.name}{isSelf ? ' ◀' : ''}
                  </div>
                  <div className="text-cyber-dim text-xs">{entry.puzzlesSolved} puzzles · {entry.date}</div>
                </div>
                <span className={`w-12 text-center text-base ${NEON_CLASS[color]}`}>
                  {CATEGORY_ICONS[entry.category]}
                </span>
                <span className={`w-20 text-right font-orbitron text-sm ${i === 0 ? 'neon-yellow' : 'text-cyber-text'}`}>
                  {entry.score.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={onBack}
        className="mt-6 text-xs text-cyber-dim text-center w-full transition-colors"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#00e5ff')}
        onMouseLeave={e => (e.currentTarget.style.color = '#505080')}
      >
        ← VOLTAR
      </button>
    </div>
  );
};

export default Leaderboard;
