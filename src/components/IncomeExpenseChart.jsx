import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js'
import { useReports } from '../context/ReportsContext'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const IncomeExpenseChart = () => {

    const { getIncomeExpenseTrend } = useReports();
    const { labels, income, expense } = getIncomeExpenseTrend();

    const data = {
        labels,
        datasets: [
            {
                label: "Income",
                data: income,
                borderColor: "#10b981",
                backgroundColor: "rgba(16, 185, 119, 0.2)",
                tension: 0.4,
            },
            {
                label: "Expense",
                data: expense,
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                tension: 0.4,
            },
        ]
    }
  return (
    <div className='bg-white rounded-2xl shadow-md p-6 h-[360px]'>
        <h3 className='text-lg font-semibold mb-4'>Income vs Expense</h3>
        <Line data={data}/>
    </div>
  )
}

export default IncomeExpenseChart