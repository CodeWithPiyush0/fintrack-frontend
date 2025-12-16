import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { useGoals } from '../context/GoalContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
ChartJS.defaults.font.family = "Inter, sans-serif";

const GoalProgressChart = () => {

    const { getProgressData } = useGoals();
    const data = getProgressData();

    const chartData = {
        labels: data.map((d) => d.label),
        datasets: [
            {
                label: "Saved",
                data: data.map((d) => d.saved),
                backgroundColor: "#10b981",
            },
            {
                label: "Remaining",
                data: data.map((d) => d.remaining),
                backgroundColor: "#cbd5e1",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "bottom" },
        },
        scales: {
            y: {
                ticks: {
                    callback: (val) => (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val),
                    color: "#475569",
                },
                grid: { color: "#e2e8f0"},
            },
            x: {
                ticks: { color: "#475569", maxRotation: 45, minRotation: 0 },
                grid: { display: false },
            },
        },
    };

  return (
    <div className='bg-white rounded-2xl shadow-md p-6 h-[360px]'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Goal Progress</h3>
        <div className='h-[280px]'>
            <Bar data={chartData} options={options}/>
        </div>
    </div>
  );
};

export default GoalProgressChart