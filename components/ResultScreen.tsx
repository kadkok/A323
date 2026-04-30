import React from 'react';
import { Category } from '../types';
import { CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_ICONS, PUZZLES } from '../constants';

interface Props {
  score: number;
  puzzlesSolved: number;
  totalPuzzles: number;
  category: Category;
  playerName: string;
  onPlayAgain: () => void;
  onLeaderboard: () => void;
  onHome: () => void;
}

const BTN_CLASS: Record<string, string> = {
  cyan: 'btn-cyan', green: 'btn-green', yellow: 'btn-yellow', pink: 'btn-pink',
};
const NEON_CLASS: Record<string, string> = {
  cyan: 'neon-cyan', green: 'neon-green', yellow: 'neon-yellow', pink: 'neon-pink',
};
const ACCENT: Record<string, string> = {
  cyan: '#00e5ff', green: '#39ff14', yellow: '#ffd700', pink: '#ff00aa',
};

const ResultScreen: React.FC<Props> = ({
  score, puzzlesSolved, totalPuzzles, category, playerName,
  onPlayAgain, onLeaderboard, onHome,
}) => {
  const color = CATEGORY_COLORS[category];
  const maxPts = PUZZLES[category].reduce((s, p) => s + p.points, 0);
  const pct = Math.round((score / maxPts) * 100);

  const rank = pct >= 80 ? 'ELITE' : pct >= 60 ? 'HACKER' : pct >= 40 ? 'INICIANTE' : 'OFFLINE';
  const rankColor = pct >= 80 ? '#00e5ff' : pct >= 60 ? '#39ff14' : pct >= 40 ? '#ffd700' : '#ff0040';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 fade-in">
      <div className="w-full max-w-xs">

        <div className="text-center mb-6">
          <div className="font-orbitron text-xs text-cyber-dim tracking-widest mb-3">
            MISSÃO CONCLUÍDA
          </div>
          <div
            className="font-orbitron text-4xl font-black mb-1"
            style={{ color: rankColor, textShadow: `0 0 20px ${rankColor}` }}
          >
            {rank}
          </div>
          <div className="text-cyber-dim text-sm">{playerName}</div>
        </div>

        <div className="card-cyber rounded p-5 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-cyber-dim text-sm">PONTUAÇÃO FINAL</span>
            <span className="neon-yellow font-orbitron text-2xl">{score.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-cyber-dim text-sm">CATEGORIA</span>
            <span className={`${NEON_CLASS[color]} font-orbitron text-xs tracking-wider`}>
              {CATEGORY_ICONS[category]} {CATEGORY_LABELS[category]}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-cyber-dim text-sm">RESOLVIDOS</span>
            <span className="text-cyber-text">{puzzlesSolved}/{totalPuzzles}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-cyber-dim text-sm">EFICIÊNCIA</span>
            <span className="text-cyber-text">{pct}%</span>
          </div>

          <div className="w-full h-2 rounded mt-2" style={{ background: '#1a1a3a' }}>
            <div
              className="h-full rounded transition-all duration-1000"
              style={{ width: `${pct}%`, background: ACCENT[color], boxShadow: `0 0 8px ${ACCENT[color]}` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className={`btn-cyber ${BTN_CLASS[color]} w-full py-3 rounded font-orbitron text-sm tracking-widest`}
          >
            JOGAR NOVAMENTE
          </button>
          <button
            onClick={onLeaderboard}
            className="btn-cyber btn-cyan w-full py-3 rounded font-orbitron text-sm tracking-widest"
          >
            VER RANKING
          </button>
          <button
            onClick={onHome}
            className="text-xs text-cyber-dim w-full text-center transition-colors mt-1"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00e5ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#505080')}
          >
            ← MENU PRINCIPAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
