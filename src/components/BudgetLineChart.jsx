import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { useBudget } from '../context/BudgetContext';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

ChartJS.defaults.font.family = "Inter, sans-serif";

const BudgetLineChart = () => {

    const { getBudgetChartData } = useBudget();
    const { labels, budgetData, spentData } = getBudgetChartData();

    const data = {
        labels,
        datasets: [
            {
                label: "Budget (₹)",
                data: budgetData,
                borderColor: "#1e90ff",
                backgroundColor: "rgba(30, 144, 255, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: "Spent (₹)",
                data: spentData,
                borderColor: "#ff6b6b",
                backgroundColor: "rgba(255, 107, 107, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    color: "#475569",
                    font: { family: "Inter", size: 13 },
                    padding: 25,
                },
            },
            tooltip: {
                backgroundColor: "#1e293b",
                titleColor: "#fff",
                bodyColor: "#e3e8f0",
                borderColor: "#00b894",
                borderWidth: 1,
                padding: 10,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#64748B",
                    font: { family: "Inter", size: 11 },
                },
                grid: { display: false },
            },
            y: {
                ticks: {
                    color: "#64748b",
                    font: { family: "Inter", size: 11 },
                    callback: (value) => {
                        if(value >= 1000){
                            return value / 1000 + "k";
                        }
                        return value;
                    },
                },
                grid: { color: "#E2E8F0" },
            },
        },
    };

  return (
    <div className='bg-white rounded-2xl shadow-md p-6 h-[400px]'>
        <div className='mb-4'>
            <h3 className='text-lg font-semibold text-gray-800'>Budget VS Spending Over Time</h3>
            <p className='text-sm text-gray-500'>Monthly trend</p>
        </div>
        <div className='h-[300px]'>
            <Line data={data} options={options}/>
        </div>
    </div>
  )
}

export default BudgetLineChart