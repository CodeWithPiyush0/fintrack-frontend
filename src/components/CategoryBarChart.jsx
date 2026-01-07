import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { useReports } from '../context/ReportsContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
ChartJS.defaults.font.family = "Inter, sans-serif";

const CategoryBarChart = () => {

    const { getCategorySpend } = useReports();
    const { labels, values } = getCategorySpend();

    const data = {
        labels, 
        datasets: [
            {
                label: "Amount Spent (₹)",
                data: values,
                backgroundColor: "#3b82f6",
                borderRadius: 6,
                barThickness: 28,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `₹${ctx.parsed.y.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#475569" },
                grid: { display: false },
            },
            y: {
                ticks: {
                    color: "#94a3b8",
                    callback: (val) => 
                        val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val,
                },
                grid: { color: "#e2e8f0" },
            },
        },
    };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[360px]">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
                Spending by Category
            </h3>
            <span className="text-xs text-gray-400">Amount Spent (₹)</span>
        </div>
        <div className="h-[280px]">
            <Bar data={data} options={options} />
        </div>
    </div>
  );
};

export default CategoryBarChart;