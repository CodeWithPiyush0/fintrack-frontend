import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useBudget } from '../context/BudgetContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPieChart = () => {

    const { getCategoryBudgetData } = useBudget();
    const categoryData = getCategoryBudgetData();

    const colors = [
        "#00b894",
        "#1e90ff",
        "#ffd166",
        "#ff6b6b",
        "#9b59b6",
        "#4ecdc4",
    ];

    const data = {
        labels: categoryData.map(item => item.category),
        datasets: [
            {
                data: categoryData.map(item => item.percentage),
                backgroundColor: colors.slice(0, categoryData.length),
                borderWidth: 2,
                hoverOffset: 10,
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
                    padding: 15,
                    color: "#334155",
                    font: { family: "Inter", size: 13 },
                },
            },
            tooltip: {
                backgroundColor: "#1e293b",
                titleColor: "#fff",
                bodyColor: "#e3e8f0",
                borderColor: "#00b894",
                borderWidth: 1,
                padding: 10,
                callbacks: {
                    label: (context) => {
                        const label = context.label || "";
                        const value = context.parsed || 0;
                        return ` ${label}: ${value}%`;
                    },
                },
            },
        },
    };
  return (
    <div className='bg-white rounded-2xl shadow-md p-6 h-[400px]'>
        <div className='mb-4'>
            <h3 className='text-lg font-semibold text-gray-800'>Category-wise Budget Allocation </h3>
        </div>
        <div className='h-[300px] flex justify-center items-center'>
            {categoryData.length > 0 ? (
                <Pie data={data} options={options}/>
            ):(
                <p className='text-gray-500'>No budget data available</p>
            )}
        </div>
    </div>  )
}

export default BudgetPieChart