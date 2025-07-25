"use client";
import Image from "next/image";
import {useSanityData} from "@/context/SanityDataContext";
import {useState} from "react";

export default function Schedule({year, availableYears}: {year?: string; availableYears?: string[]}) {
  const {data} = useSanityData();
  // Use availableYears from prop if provided, else from schedule
  const years = availableYears ?? data.schedule?.map((entry) => entry.year);
  // If year prop is provided, use it; else use state (default to first year)
  const [selectedYear, setSelectedYear] = useState(year ?? years?.[0] ?? "");
  // If year prop is provided, always use it, otherwise use selectedYear state
  const filteredYear = year ?? selectedYear;
  const games = data.schedule?.find((entry) => entry.year === filteredYear)?.games || [];

  const sortedGames = [...games].sort((a, b) => new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime());
  const recordCounts = sortedGames.reduce(
    (acc, game) => {
      if (game.result === "win") acc.wins += 1;
      else if (game.result === "loss") acc.losses += 1;
      else if (game.result === "tie") acc.ties += 1;
      return acc;
    },
    {wins: 0, losses: 0, ties: 0}
  );

  const record = `${recordCounts.wins}-${recordCounts.losses}-${recordCounts.ties}`;

  return (
    <>
      <div className="w-full pt-4 mb-12 text-center">
        <h3 className="text-3xl uppercase lg:text-5xl font-bold text-neutral-50 text-center">{selectedYear} Schedule</h3>
        <h4 className="text-2xl">{record}</h4>
      </div>
      <div className="w-full relative">
        {/* change hidden to flex if i want to use a dropdown */}
        {!year && (
          <div className="hidden justify-end mb-6">
            <select className="px-2 py-1 rounded bg-neutral-800 text-white" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {years?.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-wrap justify-between items-end gap-y-12 text-neutral-50 relative z-10">
          {sortedGames.map((game, index) => {
            const imageFile = game.opponent.toLowerCase().replace(/\s+/g, "");
            const isHome = game.homeOrAway === "home";
            return (
              <div key={game._key || index} className="flex flex-col items-center min-h-[100px] w-1/5 sm:w-1/5 lg:flex-1 justify-between">
                <div className="relative flex justify-center items-center w-full h-10">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 z-0" />
                  <div className={`relative w-14 h-14 lg:w-22 lg:h-22 z-10 rounded-full border-4 bg-neutral-100 ${isHome ? "border-primary text-neutral-50" : "border-neutral-100"}`}>
                    <Image fill sizes="(min-width: 1024px) 88px, (min-width: 640px) 56px, 44px" src={`/${imageFile}.png`} alt={`${game.opponent} logo`} className="object-cover rounded-full" />
                    {game.result && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black opacity-80 text-white text-lg uppercase font-bold rounded-full z-20">
                        <span>{game.result}</span>
                        <span>{game.score}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-xs text-center capitalize">
                  <span>{game.opponent}</span>
                  <span>
                    {new Date(`${game.gameDate}T00:00:00`).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
