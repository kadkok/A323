
export interface User {
  id: string;
  email: string;
  name: string;
}

export type Permission = 'viewer' | 'editor' | 'owner';

export interface Collaborator {
  userId: string;
  email: string;
  permission: Permission;
}

export interface Project {
  id: string;
  name: string;
  ownerId: string;
  collaborators: Collaborator[];
  items: {
    reference: string;
    verseText: string;
    analysis?: AnalysisResult;
    addedBy: string;
  }[];
}

export interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleApiResponse {
  reference: string;
  verses: BibleVerse[];
  text: string;
  translation_id: string;
}

// Complex Data Structures for Deep Analysis

export interface CrossReference {
  source: string; // e.g., "Flavio Josefo, Antiguidades", "Livro de Enoque"
  text: string;   // The quote itself
  connection: string; // Why it matters
}

export interface AnalysisSection {
  title: string;
  content: string;
  footnotes: CrossReference[];
}

export interface GematriaEntry {
  word: string;
  original: string; // Hebrew/Greek
  value: number;
  meaning: string;
}

export interface EtymologyEntry {
  word: string;
  original: string;
  transliteration: string;
  definition: string;
}

export interface ArcheologyEntry {
  title: string;
  description: string;
  date: string;
}

export interface HistoricalMetadata {
  author: string;
  date: string;
  location: string;
  audience: string;
  originalLanguage: string;
}

export interface AnalysisResult {
  metadata: HistoricalMetadata;
  sections: AnalysisSection[];
  gematria: GematriaEntry[];
  etymology: EtymologyEntry[];
  archaeology: ArcheologyEntry[];
}

export interface SelectionState {
  book: string | null;
  chapter: number | null;
}

// Concordance / Word Search Types
export interface ConcordanceReference {
  reference: string;
  text: string;
  contextSummary?: string;
}

export interface ConcordanceResult {
  word: string;
  totalOccurrences: number; // Estimated or exact
  firstMention: ConcordanceReference;
  lastMention: ConcordanceReference;
  allOccurrences: ConcordanceReference[]; // Populated only when requested
}
