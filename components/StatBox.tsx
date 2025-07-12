import React from "react";

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
  return (
    <div className={classes}>
      <h4 className="uppercase mb-4">{year} Season Stats</h4>
      <div className="flex flex-row gap-2 md:gap-6 text-center">
        <div>
          <h5 className="text-sm font-light">Yards</h5>
          <p className="text-3xl text-primary">{yds}</p>
        </div>
        <div>
          <h5 className="text-sm font-light">Touchdowns</h5>
          <p className="text-3xl text-primary">{tds}</p>
        </div>
        <div>
          <h5 className="text-sm font-light">Rating</h5>
          <p className="text-3xl text-primary">{rating}</p>
        </div>
        <div>
          <h5 className="text-sm font-light">Interceptions</h5>
          <p className="text-3xl text-primary">{ints}</p>
        </div>
        <div>
          <h5 className="text-sm font-light">Comp %</h5>
          <p className="text-3xl text-primary">{comp}%</p>
        </div>
      </div>
    </div>
  );
}
