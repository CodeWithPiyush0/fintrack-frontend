import React, { useState } from 'react'

const timeOptions = ["This Month", "Last Month",  "Last 3 Month", "Last Year", "All Time"];
const categoryOptions = [
    "All Categories", 
    "Food & Dining",
    "Transport",
    "Entertainment",
    "Shopping",
    "Bills & Utilities",
    "Savings & Investments", 
];

const ReportFilters = ({ onChange }) => {
    const [time, setTime] = useState("This Month");
    const [category, setCategory] = useState("All Categories");

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setTime(value);
        onChange?.({ time: value, category });
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
        onChange?.({ time, category: value });
    };

  return (
    <div className='flex flex-wrap gap-4'>
        <div className='w-full sm:w-auto'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>
                Time Period
            </label>
            <select 
                value={time}
                onChange={handleTimeChange}
                className='w-full sm:w-56 px-3 py-2.5 rounded-xl border border-gray-200'
            >
                {timeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
        
        <div className='w-full sm:w-auto'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>
                All Categories
            </label>
            <select 
                value={category}
                onChange={handleCategoryChange}
                className='w-full sm:w-56 px-3 py-2.5 rounded-xl border border-gray-200'
            >
                {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    </div>
  );
};

export default ReportFilters