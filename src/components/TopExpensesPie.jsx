import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useReports } from '../context/ReportsContext'

ChartJS.register(ArcElement, Tooltip, Legend);

const TopExpensesPie = () => {

    const { getCategorySpend } = useReports();
    const { labels, values } = getCategorySpend();

    const pairs = labels.map((label, i) => ({ label, value: values[i] || 0 }));
    const top5 = pairs 
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    const data = {
        labels: top5.map((p) => p.label),
        datasets: [
            {
                data: top5.map((p) => p.value),
                backgroundColor: [
                    "#f97316",
                    "#22c55e",
                    "#3b82f6",
                    "#a855f7",
                    "#ef4444",
                ],
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
            legend: {
                position: "right",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 16,
                    color: "#334155",
                    font: { family: "Inter", size: 13 },
                },
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        const label = ctx.label || "";
                        const value = ctx.parsed || 0;
                        return ` ${label}: ₹${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

  return (
    <div className='bg-white rounded-2xl shadow-md p-6 h-[360px]'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Top 5 Expenses
        </h3>
        <div className='h-[280px] flex items-center justify-center'>
            <Pie data={data} options={options} />
        </div>
    </div>
  )
}

export default TopExpensesPie