import React, { useState, useCallback } from 'react';
import { Phase, Category, LeaderboardEntry } from './types';
import { PUZZLES, CATEGORY_COLORS } from './constants';
import HomeScreen from './components/HomeScreen';
import CategorySelector from './components/CategorySelector';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import Leaderboard from './components/Leaderboard';

const STORAGE_KEY = 'cyber_puzzle_lb';

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); } catch {}
}

const App: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('home');
  const [playerName, setPlayerName] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [finalSolved, setFinalSolved] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(loadLeaderboard);

  const handleStart = useCallback((name: string) => {
    setPlayerName(name);
    setPhase('category');
  }, []);

  const handleSelectCategory = useCallback((cat: Category) => {
    setCategory(cat);
    setPhase('playing');
  }, []);

  const handleGameOver = useCallback((score: number, solved: number) => {
    setFinalScore(score);
    setFinalSolved(solved);

    if (score > 0 && category) {
      const entry: LeaderboardEntry = {
        id: Date.now().toString(),
        name: playerName,
        score,
        category,
        puzzlesSolved: solved,
        date: new Date().toLocaleDateString('pt-BR'),
      };
      const updated = [...leaderboard, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
      setLeaderboard(updated);
      saveLeaderboard(updated);
    }
    setPhase('gameover');
  }, [playerName, category, leaderboard]);

  const puzzles = category ? PUZZLES[category] : [];

  return (
    <div className="min-h-screen" style={{ background: '#080810' }}>
      {phase === 'home' && (
        <HomeScreen
          onStart={handleStart}
          onLeaderboard={() => setPhase('leaderboard')}
          leaderboard={leaderboard}
        />
      )}
      {phase === 'category' && (
        <CategorySelector
          onSelect={handleSelectCategory}
          onBack={() => setPhase('home')}
        />
      )}
      {phase === 'playing' && category && (
        <GameScreen
          key={category}
          puzzles={puzzles}
          category={category}
          playerName={playerName}
          onGameOver={handleGameOver}
        />
      )}
      {phase === 'gameover' && category && (
        <ResultScreen
          score={finalScore}
          puzzlesSolved={finalSolved}
          totalPuzzles={puzzles.length}
          category={category}
          playerName={playerName}
          onPlayAgain={() => setPhase('category')}
          onLeaderboard={() => setPhase('leaderboard')}
          onHome={() => setPhase('home')}
        />
      )}
      {phase === 'leaderboard' && (
        <Leaderboard
          entries={leaderboard}
          playerName={playerName}
          onBack={() => setPhase('home')}
        />
      )}
    </div>
  );
};

export default App;
