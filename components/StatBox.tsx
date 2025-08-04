import React, {useEffect, useState} from "react";
import {motion, animate} from "framer-motion";
import {computeSeasonTotals} from "@/utils/statTotals";
import {useSanityData} from "@/context/SanityDataContext";

export default function StatBox({year, classes}: {year: number; classes?: string}) {
  const {data} = useSanityData();
  const seasonStats = data.stats.find((stat) => stat.season === year.toString());
  const filteredStats = seasonStats?.games || [];
  // OTHER DATA: totalCompletions, totalAttempts, totalRushYards, totalRushTds
  const {totalYards, totalTDs, totalINTs, totalCompPct, totalRating} = computeSeasonTotals(filteredStats);
  const [ydsAnimated, setYdsAnimated] = useState(0);
  const [tdsAnimated, setTdsAnimated] = useState(0);
  const [ratingAnimated, setRatingAnimated] = useState(0);
  const [intsAnimated, setIntsAnimated] = useState(0);
  const [compAnimated, setCompAnimated] = useState(0);

  useEffect(() => {
    const controls = [
      animate(0, totalYards, {
        duration: 2.5,
        onUpdate: (v) => setYdsAnimated(Math.round(v)),
      }),
      animate(0, Number(totalTDs), {
        duration: 2.5,
        onUpdate: (v) => setTdsAnimated(Math.round(v)),
      }),
      animate(0, Number(totalRating), {
        duration: 2.5,
        onUpdate: (v) => setRatingAnimated(Math.round(v)),
      }),
      animate(0, totalINTs, {
        duration: 2.5,
        onUpdate: (v) => setIntsAnimated(Math.round(v)),
      }),
      animate(0, Number(totalCompPct), {
        duration: 2.5,
        onUpdate: (v) => setCompAnimated(Math.round(v)),
      }),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [totalYards, totalTDs, totalRating, totalINTs, totalCompPct]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className={classes}>
      <h4 className="uppercase mb-4">{year} Season Totals</h4>
      <div className="flex flex-row gap-2 md:gap-4 2xl:gap-6 text-center">
        <div>
          <h5 className="text-sm font-light">Yards</h5>
          <motion.p className="text-3xl text-primary">{ydsAnimated}</motion.p>
        </div>
        <div>
          <h5 className="text-sm font-light">Touchdowns</h5>
          <motion.p className="text-3xl text-primary">{tdsAnimated}</motion.p>
        </div>
        <div>
          <h5 className="text-sm font-light">Rating</h5>
          <motion.p className="text-3xl text-primary">{ratingAnimated.toFixed(1)}</motion.p>
        </div>
        <div>
          <h5 className="text-sm font-light">Interceptions</h5>
          <motion.p className="text-3xl text-primary">{intsAnimated}</motion.p>
        </div>
        <div>
          <h5 className="text-sm font-light">Comp %</h5>
          <motion.p className="text-3xl text-primary">{compAnimated}%</motion.p>
        </div>
      </div>
    </div>
  );
}
