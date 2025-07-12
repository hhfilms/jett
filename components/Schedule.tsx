"use client";
import Image from "next/image";

export default function Schedule() {
  const teams = [
    {
      opponent: "abilene",
      image: "abilene",
      date: "10/03/2025",
      time: "7pm",
      home: false,
    },
    {
      opponent: "caprock",
      image: "caprock",
      date: "10/09/2025",
      time: "7pm",
      home: true,
    },
    {
      opponent: "lubbock coronado",
      image: "coronado",
      date: "10/23/2025",
      time: "7pm",
      home: false,
    },
    {
      opponent: "lubbock",
      image: "lubbock",
      date: "10/31/2025",
      time: "7pm",
      home: true,
    },
    {
      opponent: "lubbock monterey",
      image: "monterey",
      date: "09/25/2025",
      time: "7pm",
      home: true,
    },
    {
      opponent: "san angelo central",
      image: "sanangelo",
      date: "09/05/2025",
      time: "7pm",
      home: false,
    },
    {
      opponent: "tascosa",
      image: "tascosa",
      date: "11/07/2025",
      time: "7pm",
      home: false,
    },
    {
      opponent: "Palo Duro",
      image: "paloduro",
      date: "09/19/2025",
      time: "7pm",
      home: true,
    },
    {
      opponent: "Odessa",
      image: "odessa",
      date: "08/29/2025",
      time: "7pm",
      home: true,
    },
    {
      opponent: "midland",
      image: "midland",
      date: "09/12/2025",
      time: "7pm",
      home: false,
    },
  ];

  // Sort by date before rendering
  const sortedTeams = [...teams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className="md:p-4 lg:p-0 flex-grow flex flex-col justify-center font-mukta">
      <div className="flex items-center justify-center mb-2 gap-2">
        <span className="bg-primary px-4 py-2">home</span> | <span className="bg-neutral-50 px-4 py-2 text-neutral-950">away</span>
      </div>

      {sortedTeams.length > 0 ? (
        <div className="w-full max-w-4xl">
          <div className="flex flex-col gap-1">
            {sortedTeams.map((team, index) => (
              <div key={index} className={`flex items-center justify-between p-2 shadow-md ${team.home ? "bg-primary text-neutral-50" : "bg-neutral-100 text-neutral-950"}`}>
                <div className="flex items-center gap-2 capitalize">
                  <div className="relative w-6 h-6 lg:w-12 lg:h-12">
                    <Image fill src={`/${team.image}.png`} alt={`${team.opponent} logo`} className="object-cover rounded-full" />
                  </div>
                  <span className="text-lg font-semibold">{team.opponent.charAt(0).toUpperCase() + team.opponent.slice(1)}</span>
                </div>
                <div className="text-sm">
                  {team.date ? (
                    <span>
                      {new Date(team.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  ) : (
                    <span className="italic">Date TBD</span>
                  )}
                  {team.time && <span className="ml-2">{team.time}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <h3 className="text-2xl uppercase lg:text-7xl font-bold text-neutral-950 text-center py-4">No Upcoming Games</h3>
          <p className="text-center">Check back later for updates.</p>
        </div>
      )}
    </main>
  );
}
