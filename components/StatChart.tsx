"use client";
import "chart.js/auto";
import {Bar, Line} from "react-chartjs-2";
import {getChartOptions} from "@/utils/chartOptions";
import {useSanityData} from "@/context/SanityDataContext";

export default function StatChart() {
  const {stats} = useSanityData();
  const {passing: passingOptions, yards: yardsOptions, percentage: percentageOptions, rushing: rushingOptions, tds: tdsOptions, tdsInts: tdsIntsOptions} = getChartOptions(stats);

  // data (unchanged)
  const completionPercentage = stats.map((stat) => {
    const completions = stat.completions || 0;
    const attempts = stat.attempts || 1;
    return ((completions / attempts) * 100).toFixed(2);
  });

  const passingChartData = {
    labels: stats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Completions",
        data: stats.map((stat) => stat.completions),
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
      {
        label: "Pass Attempts",
        data: stats.map((stat) => stat.attempts),
        backgroundColor: "rgba(63, 105, 179, 0.5)",
      },
    ],
  };

  const rushingChartData = {
    labels: stats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Rushing Yards",
        data: stats.map((stat) => stat.rushingYards),
        borderColor: "rgb(179, 137, 63)",
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
    ],
  };

  const percentageChartData = {
    labels: stats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Completion Percentage",
        data: completionPercentage,
        borderColor: "rgb(179, 137, 63)",
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
    ],
  };

  const yardsPerGameChartData = {
    labels: stats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Passing Yards",
        data: stats.map((stat) => stat.passingYards),
        borderColor: "rgb(179, 137, 63)",
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
    ],
  };

  const tdsPerGameChartData = {
    labels: stats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Rushing Touchdowns",
        data: stats.map((stat) => stat.rushingTds),
        backgroundColor: "rgba(63, 105, 179, 0.5)",
        stack: "tds",
      },
      {
        label: "Passing Touchdowns",
        data: stats.map((stat) => stat.touchdowns),
        backgroundColor: "rgba(179, 137, 63, 0.5)",
        stack: "tds",
      },
    ],
  };

  // const ints = stats.map((stat) => stat.interceptions);
  // const intSum = ints.reduce((acc, cur) => acc + cur, 0);
  // const tds = stats.map((stat) => stat.touchdowns);
  // const tdsSum = tds.reduce((acc, cur) => acc + cur, 0);

  const tdsVsIntsChartData = {
    labels: stats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Passing Touchdowns",
        data: stats.map((stat) => stat.touchdowns),
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
      {
        label: "Interceptions",
        data: stats.map((stat) => stat.interceptions),
        backgroundColor: "rgba(63, 105, 179, 0.5)",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-center align-bottom">
      <div className="p-4 h-[300px] flex justify-center">
        <Bar data={passingChartData} options={passingOptions as import("chart.js").ChartOptions<"bar">} />
      </div>
      <div className="p-4 h-[300px] flex justify-between">
        <Bar data={tdsPerGameChartData} options={tdsOptions as import("chart.js").ChartOptions<"bar">} />
      </div>
      <div className="p-4 h-[300px] flex justify-between">
        <Bar data={tdsVsIntsChartData} options={tdsIntsOptions as import("chart.js").ChartOptions<"bar">} />
      </div>
      <div className="p-4 h-[300px] flex justify-between">
        <Line data={yardsPerGameChartData} options={yardsOptions as import("chart.js").ChartOptions<"line">} />
      </div>
      <div className="p-4 h-[300px] flex justify-between">
        <Line data={percentageChartData} options={percentageOptions as import("chart.js").ChartOptions<"line">} />
      </div>
      <div className="p-4 h-[300px] flex justify-between">
        <Line data={rushingChartData} options={rushingOptions as import("chart.js").ChartOptions<"line">} />
      </div>
    </div>
  );
}
