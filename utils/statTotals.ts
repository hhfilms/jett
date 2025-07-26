import {Stat} from "@/types/types";

export function computeSeasonTotals(stats: Stat["games"]) {
  const totalCompletions = stats.reduce((sum, s) => sum + s.completions, 0);
  const totalAttempts = stats.reduce((sum, s) => sum + s.attempts, 0);
  const totalYards = stats.reduce((sum, s) => sum + s.passingYards, 0);
  const totalRushYards = stats.reduce((sum, s) => sum + s.rushingYards, 0);
  const totalRushTds = stats.reduce((sum, s) => sum + s.rushingTds, 0);
  const totalTDs = stats.reduce((sum, s) => sum + s.touchdowns, 0);
  const totalINTs = stats.reduce((sum, s) => sum + s.interceptions, 0);

  const totalCompPct = totalAttempts ? ((totalCompletions / totalAttempts) * 100).toFixed(1) : "0.0";
  const totalRating = totalAttempts
    ? (
        ((Math.max(0, Math.min(2.375, (totalCompletions / totalAttempts - 0.3) * 5)) +
          Math.max(0, Math.min(2.375, (totalYards / totalAttempts - 3) * 0.25)) +
          Math.max(0, Math.min(2.375, (totalTDs / totalAttempts) * 20)) +
          Math.max(0, Math.min(2.375, 2.375 - (totalINTs / totalAttempts) * 25))) /
          6) *
        100
      ).toFixed(1)
    : "0.0";

  return {
    totalCompletions,
    totalAttempts,
    totalYards,
    totalRushYards,
    totalRushTds,
    totalTDs,
    totalINTs,
    totalCompPct,
    totalRating,
  };
}
