export type Category = 'logic' | 'cipher' | 'pattern' | 'riddle';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Phase = 'home' | 'category' | 'playing' | 'gameover' | 'leaderboard';
export type AnswerType = 'text' | 'multiple';

export interface Puzzle {
  id: number;
  category: Category;
  difficulty: Difficulty;
  title: string;
  description: string;
  hint: string;
  answer: string;
  alternateAnswers?: string[];
  options?: string[];
  answerType: AnswerType;
  timeLimit: number;
  points: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  category: Category;
  puzzlesSolved: number;
  date: string;
}
