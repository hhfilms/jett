// utils/chartOptions.ts
import {ChartOptions} from "chart.js";
import {StatArray} from "@/types/types";

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

const createOptions = (titleText: string, stats?: StatArray): ChartOptions<"bar" | "line" | "pie"> => ({
  ...sharedLayout,
  plugins: {
    title: {
      display: true,
      text: titleText,
      align: "center",
      padding: {top: 10, bottom: 10},
    },
    legend: sharedLayout.legend,
    tooltip: stats
      ? {
          callbacks: {
            title: (items) => {
              const index = items[0].dataIndex;
              return `vs ${stats[index].opponent} ${formatDate(stats[index].gameDate)}`;
            },
          },
        }
      : {},
  },
});

export const getChartOptions = (stats: StatArray) => ({
  passing: createOptions("Completions vs Attempts", stats),
  yards: createOptions("Passing YPG", stats),
  percentage: createOptions("Completion Percentage", stats),
  rushing: createOptions("Rushing YPG", stats),
  tds: {
    ...createOptions("Total TDs Per Game", stats),
    scales: {x: {stacked: true}, y: {stacked: true, beginAtZero: true}},
  },
  tdsInts: {
    ...createOptions("TDs vs INTs Per Game", stats),
  },
  pie: createOptions("TDs vs INTs Per Game"),
});
