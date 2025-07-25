import {useSanityData} from "@/context/SanityDataContext";
import {useState} from "react";

export default function StatTable() {
  const {data} = useSanityData();
  // Extract unique seasons
  const seasons = Array.from(new Set(data.stats.map((stat) => stat.season)));
  // Default to the most recent season
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  // Find the selected season's stats and use its games array
  const seasonStats = data.stats.find((stat) => stat.season === selectedSeason);
  const filteredStats = seasonStats?.games || [];
  const headers = ["Vs", "C", "Att", "Yds", "C%", "TD", "Int", "Rating", "Rush Yds", "Rush TDs"];

  // Compute totals for the selected season
  const totalCompletions = filteredStats.reduce((sum, s) => sum + s.completions, 0);
  const totalAttempts = filteredStats.reduce((sum, s) => sum + s.attempts, 0);
  const totalYards = filteredStats.reduce((sum, s) => sum + s.passingYards, 0);
  const totalRushYards = filteredStats.reduce((sum, s) => sum + s.rushingYards, 0);
  const totalRushTds = filteredStats.reduce((sum, s) => sum + s.rushingTds, 0);
  const totalTDs = filteredStats.reduce((sum, s) => sum + s.touchdowns, 0);
  const totalINTs = filteredStats.reduce((sum, s) => sum + s.interceptions, 0);
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

  return (
    <main className="w-full px-6 relative text-neutral-600">
      <div className="flex space-x-2 justify-center mb-6">
        {seasons.map((season) => (
          <button
            key={season}
            className={`px-4 py-2 rounded-t-md border-b-2 ${selectedSeason === season ? "border-yellow-600 text-yellow-600" : "border-transparent text-gray-400"}`}
            onClick={() => setSelectedSeason(season)}>
            {season}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full max-w-6xl mx-auto border-collapse text-center">
          <thead className="border-b-2">
            <tr className="text-xl">
              {headers.map((header, idx) => (
                <th key={idx} className="px-4 py-2 w-[10%]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStats.map((stat) => (
              <tr key={stat._key} className="even:bg-neutral-100 odd:bg-white">
                <td className="px-4 py-2 w-[10%]">{stat.opponent}</td>
                <td className="px-4 py-2 w-[10%]">{stat.completions}</td>
                <td className="px-4 py-2 w-[10%]">{stat.attempts}</td>
                <td className="px-4 py-2 w-[10%]">{stat.passingYards}</td>
                <td className="px-4 py-2 w-[10%]">{((stat.completions / stat.attempts) * 100).toFixed(1)}%</td>
                <td className="px-4 py-2 w-[10%]">{stat.touchdowns}</td>
                <td className="px-4 py-2 w-[10%]">{stat.interceptions}</td>
                <td className="px-4 py-2 w-[10%]">
                  {(
                    ((Math.max(0, Math.min(2.375, (stat.completions / stat.attempts - 0.3) * 5)) +
                      Math.max(0, Math.min(2.375, (stat.passingYards / stat.attempts - 3) * 0.25)) +
                      Math.max(0, Math.min(2.375, (stat.touchdowns / stat.attempts) * 20)) +
                      Math.max(0, Math.min(2.375, 2.375 - (stat.interceptions / stat.attempts) * 25))) /
                      6) *
                    100
                  ).toFixed(1)}
                </td>
                <td className="px-4 py-2 w-[10%]">{stat.rushingYards}</td>
                <td className="px-4 py-2 w-[10%]">{stat.rushingTds}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold border-t">
              <td className="px-4 py-2 w-[10%] text-left">Totals</td>
              <td className="px-4 py-2 w-[10%]">{totalCompletions}</td>
              <td className="px-4 py-2 w-[10%]">{totalAttempts}</td>
              <td className="px-4 py-2 w-[10%]">{totalYards}</td>
              <td className="px-4 py-2 w-[10%]">{totalCompPct}%</td>
              <td className="px-4 py-2 w-[10%]">{totalTDs}</td>
              <td className="px-4 py-2 w-[10%]">{totalINTs}</td>
              <td className="px-4 py-2 w-[10%]">{totalRating}</td>
              <td className="px-4 py-2 w-[10%]">{totalRushYards}</td>
              <td className="px-4 py-2 w-[10%]">{totalRushTds}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
