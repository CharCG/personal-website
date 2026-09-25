export type MonkeytypePersonalBest = {
  wpm: number;
  accuracy: number;
  consistency: number;
  language: string;
  duration: number;
};

export type MonkeytypeSummary = {
  personalBest: MonkeytypePersonalBest | null;
  completedTests: number | null;
};
