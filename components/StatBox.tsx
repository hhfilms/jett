import React, {useEffect, useState} from "react";
import {motion, animate} from "framer-motion";

export default function StatBox({
  year,
  yds,
  tds,
  rating,
  ints,
  comp,
  classes,
}: {
  year: number;
  yds: number;
  tds: string | number;
  rating?: string | number;
  ints: number;
  comp?: string | number;
  classes?: string;
}) {
  const [ydsAnimated, setYdsAnimated] = useState(0);
  const [tdsAnimated, setTdsAnimated] = useState(0);
  const [ratingAnimated, setRatingAnimated] = useState(0);
  const [intsAnimated, setIntsAnimated] = useState(0);
  const [compAnimated, setCompAnimated] = useState(0);

  useEffect(() => {
    const controls = [
      animate(0, yds, {
        duration: 2.5,
        onUpdate: (v) => setYdsAnimated(Math.round(v)),
      }),
      animate(0, Number(tds), {
        duration: 2.5,
        onUpdate: (v) => setTdsAnimated(Math.round(v)),
      }),
      animate(0, Number(rating), {
        duration: 2.5,
        onUpdate: (v) => setRatingAnimated(Math.round(v)),
      }),
      animate(0, ints, {
        duration: 2.5,
        onUpdate: (v) => setIntsAnimated(Math.round(v)),
      }),
      animate(0, Number(comp), {
        duration: 2.5,
        onUpdate: (v) => setCompAnimated(Math.round(v)),
      }),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [yds, tds, rating, ints, comp]);

  return (
    <div className={classes}>
      <h4 className="uppercase mb-4">{year} Season Stats</h4>
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
          <motion.p className="text-3xl text-primary">{ratingAnimated}</motion.p>
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
