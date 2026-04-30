import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { CATEGORY_LABELS } from '../constants';

interface Props {
  onStart: (name: string) => void;
  onLeaderboard: () => void;
  leaderboard: LeaderboardEntry[];
}

const HomeScreen: React.FC<Props> = ({ onStart, onLeaderboard, leaderboard }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onStart(name.trim());
  };

  const top = leaderboard[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 fade-in">
      <div className="text-center mb-8">
        <div
          className="font-orbitron text-5xl font-black tracking-widest mb-1"
          style={{ color: '#00e5ff', textShadow: '0 0 20px #00e5ff, 0 0 40px #00e5ff60, 0 0 80px #00e5ff30' }}
        >
          CYBER
        </div>
        <div
          className="font-orbitron text-3xl font-bold tracking-[0.35em]"
          style={{ color: '#39ff14', textShadow: '0 0 15px #39ff14, 0 0 30px #39ff1460' }}
        >
          PUZZLE
        </div>
        <div className="text-cyber-dim text-xs tracking-[0.5em] mt-3 uppercase">
          challenge // v1.0
        </div>
      </div>

      <div
        className="w-64 h-px mb-8"
        style={{ background: 'linear-gradient(90deg,transparent,#00e5ff,transparent)' }}
      />

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4 mb-4">
        <div>
          <label className="block text-xs text-cyber-dim tracking-widest mb-2 uppercase">
            &gt; identificação do agente
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="seu_codinome"
            maxLength={20}
            className="input-cyber w-full px-4 py-3 text-base rounded"
            autoFocus
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={!name.trim()}
          className="btn-cyber btn-cyan w-full py-3 rounded font-orbitron text-sm tracking-widest"
        >
          INICIAR MISSÃO
        </button>
      </form>

      <button
        onClick={onLeaderboard}
        className="text-xs text-cyber-dim hover:neon-cyan tracking-widest transition-colors mb-8"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        [ VER RANKING GLOBAL ]
      </button>

      {top && (
        <div className="card-cyber rounded p-4 text-center w-full max-w-xs">
          <div className="text-xs text-cyber-dim tracking-widest mb-1">MELHOR PONTUAÇÃO</div>
          <div className="neon-yellow font-orbitron text-2xl mb-1">{top.score.toLocaleString()}</div>
          <div className="text-cyber-text text-sm">{top.name} · {CATEGORY_LABELS[top.category]}</div>
        </div>
      )}

      <div className="mt-10 text-cyber-dim text-xs text-center tracking-widest opacity-40">
        4 CATEGORIAS &nbsp;·&nbsp; 20 PUZZLES &nbsp;·&nbsp; LEADERBOARD
      </div>
    </div>
  );
};

export default HomeScreen;
