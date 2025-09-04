import {Stat} from "@/types/types";

// Coerce possibly string or undefined values (e.g., "-", "", null) to a safe number
const toNum = (v: unknown): number => {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

export function computeSeasonTotals(stats: Stat["games"]) {
  const totalCompletions = stats.reduce((sum, s) => sum + toNum(s.completions), 0);
  const totalAttempts    = stats.reduce((sum, s) => sum + toNum(s.attempts), 0);
  const totalYards       = stats.reduce((sum, s) => sum + toNum(s.passingYards), 0);
  const totalRushYards   = stats.reduce((sum, s) => sum + toNum(s.rushingYards), 0);
  const totalRushTds     = stats.reduce((sum, s) => sum + toNum(s.rushingTds), 0);
  const totalTDs         = stats.reduce((sum, s) => sum + toNum(s.touchdowns), 0);
  const totalINTs        = stats.reduce((sum, s) => sum + toNum(s.interceptions), 0);

  const totalCompPct = totalAttempts > 0
    ? ((totalCompletions / totalAttempts) * 100).toFixed(1)
    : "-";

  const ratingA = Math.max(0, Math.min(2.375, ((totalAttempts > 0 ? totalCompletions / totalAttempts : 0) - 0.3) * 5));
  const ratingB = Math.max(0, Math.min(2.375, ((totalAttempts > 0 ? totalYards / totalAttempts : 0) - 3) * 0.25));
  const ratingC = Math.max(0, Math.min(2.375, (totalAttempts > 0 ? (totalTDs / totalAttempts) * 20 : 0)));
  const ratingD = Math.max(0, Math.min(2.375, (2.375 - (totalAttempts > 0 ? (totalINTs / totalAttempts) * 25 : 0))));

  const totalRating = totalAttempts > 0
    ? (((ratingA + ratingB + ratingC + ratingD) / 6) * 100).toFixed(1)
    : "-";

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
