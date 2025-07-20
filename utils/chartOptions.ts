// utils/chartOptions.ts
import {ChartOptions} from "chart.js";
import type { Stat } from "@/types/types";
type Game = Stat["games"][number];

export function formatDate(input: string): string {
  const [year, month, day] = input.split("-");
  return `${month}-${day}-${year.slice(2)}`;
}

const sharedLayout = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {padding: {top: 20, bottom: 20}},
  legend: {
    display: true,
    position: "bottom" as const,
    align: "center" as const,
    labels: {padding: 20},
  },
};

const createOptions = (titleText: string, games?: Game[]): ChartOptions<"bar" | "line" | "pie"> => ({
  ...sharedLayout,
  plugins: {
    title: {
      display: true,
      text: titleText,
      align: "center",
      padding: {top: 10, bottom: 10},
    },
    legend: sharedLayout.legend,
    tooltip: games
      ? {
          callbacks: {
            title: (items) => {
              const index = items[0].dataIndex;
              const game = games?.[index];
              const opponent = game?.opponent || "Unknown";
              const gameDate = game?.gameDate || "0000-00-00";
              return `vs ${opponent} ${formatDate(gameDate)}`;
            },
          },
        }
      : {},
  },
});

export const getChartOptions = (games: Game[]) => ({
  passing: createOptions("Completions vs Attempts", games),
  yards: createOptions("Passing YPG", games),
  percentage: createOptions("Completion Percentage", games),
  rushing: createOptions("Rushing YPG", games),
  tds: {
    ...createOptions("Total TDs Per Game", games),
    scales: {x: {stacked: true}, y: {stacked: true, beginAtZero: true}},
  },
  tdsInts: {
    ...createOptions("TDs vs INTs Per Game", games),
  },
  pie: createOptions("TDs vs INTs Per Game"),
});
