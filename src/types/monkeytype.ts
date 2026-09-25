export type MonkeytypeMetricBest = {
  metric: number;
  wpm: number;
};

export type MonkeytypeSummary = {
  timeBest: MonkeytypeMetricBest | null;
  wordBest: MonkeytypeMetricBest | null;
};
