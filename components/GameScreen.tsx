import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Puzzle, Category } from '../types';
import { CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';
import Timer from './Timer';

interface Props {
  puzzles: Puzzle[];
  category: Category;
  playerName: string;
  onGameOver: (score: number, puzzlesSolved: number) => void;
}

type Feedback = 'idle' | 'correct' | 'wrong' | 'timeout';

const ACCENT: Record<string, string> = {
  cyan: '#00e5ff', green: '#39ff14', yellow: '#ffd700', pink: '#ff00aa',
};
const CARD_CLASS: Record<string, string> = {
  cyan: 'card-cyan', green: 'card-green', yellow: 'card-yellow', pink: 'card-pink',
};
const BTN_CLASS: Record<string, string> = {
  cyan: 'btn-cyan', green: 'btn-green', yellow: 'btn-yellow', pink: 'btn-pink',
};
const NEON_CLASS: Record<string, string> = {
  cyan: 'neon-cyan', green: 'neon-green', yellow: 'neon-yellow', pink: 'neon-pink',
};
const DIFF_LABEL: Record<string, string> = { easy: 'FÁCIL', medium: 'MÉDIO', hard: 'DIFÍCIL' };
const DIFF_COLOR: Record<string, string> = { easy: '#39ff14', medium: '#ffd700', hard: '#ff0040' };

const GameScreen: React.FC<Props> = ({ puzzles, category, playerName, onGameOver }) => {
  const color = CATEGORY_COLORS[category];
  const accent = ACCENT[color];

  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>('idle');
  const [pointsEarned, setPointsEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(puzzles[0].timeLimit);

  // Stable refs for use inside interval/timeout callbacks
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const streakRef = useRef(0);
  const solvedRef = useRef(0);
  const idxRef = useRef(0);
  const feedbackRef = useRef<Feedback>('idle');
  const hintUsedRef = useRef(false);
  const timeRef = useRef(puzzles[0].timeLimit);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (transRef.current) clearTimeout(transRef.current);
  };

  const triggerGameOver = useCallback(() => {
    clearAll();
    onGameOver(scoreRef.current, solvedRef.current);
  }, [onGameOver]);

  const advancePuzzle = useCallback(() => {
    const nextIdx = idxRef.current + 1;
    if (nextIdx >= puzzles.length) {
      triggerGameOver();
      return;
    }
    idxRef.current = nextIdx;
    hintUsedRef.current = false;
    feedbackRef.current = 'idle';
    const t = puzzles[nextIdx].timeLimit;
    timeRef.current = t;
    setTimeLeft(t);
    setAnswer('');
    setShowHint(false);
    setFeedback('idle');
    setPuzzleIdx(nextIdx);
  }, [puzzles, triggerGameOver]);

  // Timer — one interval per puzzle, reads feedbackRef to skip ticks during feedback
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (feedbackRef.current !== 'idle') return;

      timeRef.current -= 1;
      setTimeLeft(timeRef.current);

      if (timeRef.current <= 0) {
        clearInterval(timerRef.current!);
        timerRef.current = null;

        feedbackRef.current = 'timeout';
        setFeedback('timeout');

        const newLives = livesRef.current - 1;
        livesRef.current = newLives;
        setLives(newLives);

        if (newLives <= 0) {
          transRef.current = setTimeout(triggerGameOver, 1500);
        } else {
          transRef.current = setTimeout(advancePuzzle, 2200);
        }
      }
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [puzzleIdx, triggerGameOver, advancePuzzle]);

  useEffect(() => () => clearAll(), []);

  const checkAnswer = (userAnswer: string) => {
    if (feedbackRef.current !== 'idle') return;

    const puzzle = puzzles[idxRef.current];
    const norm = userAnswer.toLowerCase().trim();
    const correct = puzzle.answer.toLowerCase().trim();
    const alts = puzzle.alternateAnswers?.map(a => a.toLowerCase().trim()) ?? [];
    const isCorrect = norm === correct || alts.includes(norm);

    const base = puzzle.points;
    const timeBonus = Math.floor(timeRef.current * 2);
    const streakBonus = Math.floor(base * 0.2 * Math.min(streakRef.current, 3));
    const hintPenalty = hintUsedRef.current ? Math.floor(base * 0.3) : 0;
    const earned = isCorrect ? Math.max(Math.floor(base / 2), base + timeBonus + streakBonus - hintPenalty) : 0;

    if (isCorrect) {
      scoreRef.current += earned;
      streakRef.current += 1;
      solvedRef.current += 1;
      setScore(scoreRef.current);
      setStreak(streakRef.current);
      setPointsEarned(earned);
      feedbackRef.current = 'correct';
      setFeedback('correct');
      transRef.current = setTimeout(advancePuzzle, 2000);
    } else {
      streakRef.current = 0;
      setStreak(0);
      setPointsEarned(0);
      const newLives = livesRef.current - 1;
      livesRef.current = newLives;
      setLives(newLives);
      feedbackRef.current = 'wrong';
      setFeedback('wrong');
      if (newLives <= 0) {
        transRef.current = setTimeout(triggerGameOver, 1500);
      } else {
        transRef.current = setTimeout(() => {
          feedbackRef.current = 'idle';
          setFeedback('idle');
          setAnswer('');
        }, 2200);
      }
    }
  };

  const puzzle = puzzles[puzzleIdx];
  const progressPct = (puzzleIdx / puzzles.length) * 100;

  return (
    <div className="min-h-screen flex flex-col px-4 py-4 max-w-lg mx-auto fade-in">

      {/* HUD */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`text-xl ${NEON_CLASS[color]}`}>{CATEGORY_ICONS[category]}</span>
          <div>
            <div className={`font-orbitron text-xs ${NEON_CLASS[color]} tracking-wider`}>
              {CATEGORY_LABELS[category]}
            </div>
            <div className="text-cyber-dim text-xs">{playerName}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <span key={i} style={{ color: i < lives ? '#ff0040' : '#303050', textShadow: i < lives ? '0 0 8px #ff0040' : 'none', fontSize: '1rem' }}>
                ♥
              </span>
            ))}
          </div>
          <div className="text-right">
            <div className="neon-yellow font-orbitron text-lg">{score.toLocaleString()}</div>
            <div className="text-cyber-dim text-xs">pts</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 rounded mb-3" style={{ background: '#1a1a3a' }}>
        <div
          className="h-full rounded transition-all duration-700"
          style={{ width: `${progressPct}%`, background: accent, boxShadow: `0 0 8px ${accent}` }}
        />
      </div>

      {/* Puzzle info row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-cyber-dim text-xs tracking-widest">
          PUZZLE {puzzleIdx + 1}/{puzzles.length}
        </span>
        <span className="text-xs tracking-widest font-orbitron" style={{ color: DIFF_COLOR[puzzle.difficulty] }}>
          {DIFF_LABEL[puzzle.difficulty]}
        </span>
      </div>

      {/* Timer */}
      <Timer timeLeft={timeLeft} totalTime={puzzle.timeLimit} accentColor={accent} />

      {/* Puzzle Card */}
      <div className={`${CARD_CLASS[color]} rounded p-5 mb-3 relative`}>
        {streak >= 2 && (
          <div className="absolute top-2 right-3 text-xs tracking-wider neon-yellow">
            ⚡ ×{streak}
          </div>
        )}
        <div className={`font-orbitron text-sm ${NEON_CLASS[color]} tracking-wider mb-3`}>
          {puzzle.title}
        </div>
        <div className="text-cyber-text text-sm leading-relaxed whitespace-pre-line">
          {puzzle.description}
        </div>
      </div>

      {/* Hint */}
      {!showHint ? (
        <button
          onClick={() => { setShowHint(true); hintUsedRef.current = true; }}
          disabled={feedback !== 'idle'}
          className="text-xs text-cyber-dim mb-3 transition-colors"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ffd700')}
          onMouseLeave={e => (e.currentTarget.style.color = '#505080')}
        >
          [ DICA −30% PONTOS ]
        </button>
      ) : (
        <div className="card-cyber rounded px-4 py-3 mb-3 text-xs text-cyber-dim">
          <span className="neon-yellow">DICA: </span>{puzzle.hint}
        </div>
      )}

      {/* Answer area */}
      {feedback === 'idle' && (
        <>
          {puzzle.answerType === 'multiple' && puzzle.options && (
            <div className="grid grid-cols-2 gap-3">
              {puzzle.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => checkAnswer(opt)}
                  className={`btn-cyber ${BTN_CLASS[color]} rounded py-3 px-3 text-sm tracking-wide`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {puzzle.answerType === 'text' && (
            <form onSubmit={e => { e.preventDefault(); if (answer.trim()) checkAnswer(answer); }} className="flex gap-2">
              <input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="sua resposta..."
                className="input-cyber flex-1 px-4 py-3 rounded text-sm"
                autoFocus
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!answer.trim()}
                className={`btn-cyber ${BTN_CLASS[color]} px-5 rounded`}
              >
                ↵
              </button>
            </form>
          )}
        </>
      )}

      {/* Feedback banners */}
      {feedback === 'correct' && (
        <div className="card-green rounded p-4 text-center">
          <div className="neon-green font-orbitron text-2xl mb-1">✓ CORRETO</div>
          <div className="neon-yellow text-lg font-orbitron">+{pointsEarned.toLocaleString()} pts</div>
          {hintUsedRef.current && <div className="text-cyber-dim text-xs mt-1">(dica: −30%)</div>}
        </div>
      )}

      {(feedback === 'wrong' || feedback === 'timeout') && (
        <div className="rounded p-4 text-center" style={{ background: '#0d0d1a', border: '1px solid #ff004040' }}>
          <div className="neon-red font-orbitron text-2xl mb-2">
            {feedback === 'timeout' ? '⏱ TEMPO ESGOTADO' : '✗ ERRADO'}
          </div>
          <div className="text-cyber-dim text-sm">
            Resposta: <span className="neon-cyan">{puzzle.answer}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
