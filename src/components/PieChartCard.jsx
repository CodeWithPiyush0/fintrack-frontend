import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"
import { PieChart } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartCard = ({ filter }) => {

  const getDataByFilter = (filter) => {
    switch (filter){
      case "This Month":
        return [35, 25, 20, 10, 10];
      case "Last Year":
        return [20, 30, 25, 15, 10];
      default:
        return [25, 35, 15, 10, 15]; 
    }
  }
  const data = {
    labels: ["Food", "Rent", "Travel", "Shopping", "Others"],
    datasets: [
      {
        data: getDataByFilter(filter),
        backgroundColor: [
          "#00b894",
          "#ff6b6b",
          "#ffd166",
          "#4ecdc4",
          "#1e90ff",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
          color: "#334155",
          font: {
            family: "Inter",
            size: 13,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#e2e8f0",
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
    <div className='bg-white rounded-2xl shadow-md p-4 sm:p-6 h-[300px] sm:h-[400px] md:h-[420px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
      <div className='flex items-center justify-between mb-3 sm:mb-4'>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Expense Distribution</h3>
        <PieChart size={20} className="text-emerald-500 sm:w-5 sm:h-5"/>
      </div>

      <div className='h-[220px] sm:h-[320px] md:h-[360px] flex justify-center items-center'>
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}

export default PieChartCard