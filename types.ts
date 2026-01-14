
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

export interface AnalysisResult {
  filologia: string;
  simbolismo: string;
  paralelos: string;
}

export interface SelectionState {
  book: string | null;
  chapter: number | null;
}
