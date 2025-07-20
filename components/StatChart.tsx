"use client";
import "chart.js/auto";
import {Bar, Line} from "react-chartjs-2";
import {getChartOptions} from "@/utils/chartOptions";
import {useSanityData} from "@/context/SanityDataContext";
import {useState} from "react";

export default function StatChart() {
  const {stats} = useSanityData();

  // Extract unique seasons
  const seasons = Array.from(new Set(stats.map((stat) => stat.season)));

  // Default to the most recent season
  const [selectedSeason, setSelectedSeason] = useState(seasons[seasons.length - 1]);

  // Find the selected season's stats and use its games array
  const seasonStats = stats.find((stat) => stat.season === selectedSeason);
  const filteredStats = seasonStats?.games || [];

  const {passing: passingOptions, yards: yardsOptions, percentage: percentageOptions, rushing: rushingOptions, tds: tdsOptions, tdsInts: tdsIntsOptions} = getChartOptions(filteredStats);

  const completionPercentage = filteredStats.map((game) => {
    const completions = game.completions || 0;
    const attempts = game.attempts || 1;
    return ((completions / attempts) * 100).toFixed(2);
  });

  const passingChartData = {
    labels: filteredStats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Completions",
        data: filteredStats.map((game) => game.completions),
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
      {
        label: "Attempts",
        data: filteredStats.map((game) => game.attempts),
        backgroundColor: "rgba(63, 105, 179, 0.5)",
      },
    ],
  };

  const tdsPerGameChartData = {
    labels: filteredStats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Passing TDs",
        data: filteredStats.map((game) => game.touchdowns),
        backgroundColor: "rgba(179, 137, 63, 0.5)",
        stack: "tds",
      },
      {
        label: "Rushing TDs",
        data: filteredStats.map((game) => game.rushingTds),
        backgroundColor: "rgba(63, 105, 179, 0.5)",
        stack: "tds",
      },
    ],
  };

  const tdsVsIntsChartData = {
    labels: filteredStats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Passing TDs",
        data: filteredStats.map((game) => game.touchdowns),
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
      {
        label: "Ints",
        data: filteredStats.map((game) => game.interceptions),
        backgroundColor: "rgba(63, 105, 179, 0.5)",
      },
    ],
  };

  const yardsPerGameChartData = {
    labels: filteredStats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Passing Yards",
        data: filteredStats.map((game) => game.passingYards),
        borderColor: "rgb(179, 137, 63)",
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
    ],
  };

  const percentageChartData = {
    labels: filteredStats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Completion Percentage",
        data: completionPercentage,
        borderColor: "rgb(179, 137, 63)",
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
    ],
  };

  const rushingChartData = {
    labels: filteredStats.map((_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: "Rushing Yards",
        data: filteredStats.map((game) => game.rushingYards),
        borderColor: "rgb(179, 137, 63)",
        backgroundColor: "rgba(179, 137, 63, 0.5)",
      },
    ],
  };

  return (
    <div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-2 justify-center align-bottom">
        <div className="px-4 h-[300px] flex justify-center">
          <Bar data={passingChartData} options={passingOptions as import("chart.js").ChartOptions<"bar">} />
        </div>
        <div className="px-4 h-[300px] flex justify-between">
          <Bar data={tdsPerGameChartData} options={tdsOptions as import("chart.js").ChartOptions<"bar">} />
        </div>
        <div className="px-4 h-[300px] flex justify-between">
          <Bar data={tdsVsIntsChartData} options={tdsIntsOptions as import("chart.js").ChartOptions<"bar">} />
        </div>
        <div className="px-4 h-[300px] flex justify-between">
          <Line data={yardsPerGameChartData} options={yardsOptions as import("chart.js").ChartOptions<"line">} />
        </div>
        <div className="px-4 h-[300px] flex justify-between">
          <Line data={percentageChartData} options={percentageOptions as import("chart.js").ChartOptions<"line">} />
        </div>
        <div className="px-4 h-[300px] flex justify-between">
          <Line data={rushingChartData} options={rushingOptions as import("chart.js").ChartOptions<"line">} />
        </div>
      </div>
    </div>
  );
}
