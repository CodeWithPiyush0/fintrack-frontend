import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGoals } from "../context/GoalContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const GoalStatusPie = () => {
  const { getStatusPie } = useGoals();
  const { labels, values } = getStatusPie();

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#10b981", "#0ea5e9"],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right" },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[360px]">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Completed vs Ongoing Goals
      </h3>
      <div className="h-[260px] flex justify-center items-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default GoalStatusPie;
