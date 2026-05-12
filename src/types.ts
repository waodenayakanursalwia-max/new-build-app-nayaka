export type LevelId = 1 | 2 | 3;

export interface Challenge {
  id: string;
  question: string; // Use [___] for slots
  options: { id: string; label: string; icon?: string }[];
  correctIds: string[]; // Support multiple correct IDs for multi-slot
  complexity: 'simple' | 'medium' | 'boss';
}

export interface Level {
  id: LevelId;
  title: string;
  description: string;
  ageRange: string;
  color: string;
  challenges: Challenge[];
  emoji: string;
}

export interface UserState {
  currentLevel: LevelId | null;
  stars: number;
  unlockedLevels: LevelId[];
  stickers: string[];
}
