import React from 'react'
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  layouts,
} from "chart.js"
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

ChartJS.defaults.font.family = "Inter, sans-serif";

const LineChartCard = ({ filter }) => {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    let labels, incomeData, expenseData;
    switch (filter) {
      case "This Month":
        labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
        incomeData = [4000, 4500, 4800, 5000];
        expenseData = [3200, 3500, 3700, 3900];
        break;
      case "Last Year":
        labels = ["Q1", "Q2", "Q3", "Q4"];
        incomeData = [42000, 46000, 49000, 51000];
        expenseData = [33000, 37000, 41000, 43000];
        break;
      default:
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        incomeData = [12000, 14000, 13000, 15000, 17000, 18000, 16000, 19000, 20000, 21000, 23000, 25000];
        expenseData = [9000, 10000, 9500, 11000, 13000, 12500, 14000, 13500, 15000, 15500, 16000, 16500];
        break;
    }

    setChartData({
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "#00b894",
          backgroundColor: "rgba(0, 184, 148, 0.15)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Expenses",
          data: expenseData,
          borderColor: "#ff6b6b",
          backgroundColor: "rgba(255, 107, 107, 0.15)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    });
  }, [filter]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
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
          maxRotation: 45,
          minRotatoin: 0,
        },
        grid: { display: false },
      },
      y: {
        ticks: { 
          color: "#64748B", 
          font: { family: "Inter", size: 11 },
          callback: (value) => (value >= 1000 ? value / 1000 + "k" : value),
        },
        grid: { color: "#E2E8F0" },
      },
    },
    layout: {
      padding: { top: 10, bottom: 0, left: 0, right: 0 },
    },
  };

  return (
    <div className='bg-white rounded-2xl shadow-md p-4 sm:p-6 h-[300px] sm:h-[400px] md:h-[420px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
      <div className='flex items-center justify-between mb-3 sm:mb-4'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-800'>Income vs Expenses</h3>
        <span className='text-xs sm:text-sm text-gray-500'>{filter}</span>
      </div>

      <div className='h-[220px] sm:h-[320px] md:h-[340px]'>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

export default LineChartCard