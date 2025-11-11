import React from 'react'

const SummaryCard = ({
  title,
  value,
  change,
  positive = true,
  icon = null,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between min-w-[200px] cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`} role="group">
      <div className='flex items-start justify-between gap-3'>
        <div>
          <p className='text-sm text-gray-500'>{title}</p>
          <h3 className='mt-2 text-2xl md:text-3xl font-semibold text-gray-900'>
            {value}
          </h3>
        </div>

        {icon && (
          <div className='ml-2 p-2 rounded-lg bg-gray-50 text-gray-600 transition-colors duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-600'>
            {icon}
          </div>
        )}
      </div>

      {change && (
        <div className='mt-4 flex items-center gap-2'>
          <span
            className={`inline-flex items-center gap-2 text-sm font-medium ${positive ? "text-green-600" : "text-red-500"}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${positive ? "rotate-0" : "rotate-180"}`}
            >
              <path
                d="M12 5v14M7 10l5-5 5 5"
                stroke={positive ? "#059669" : "#EF4444"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className='text-xs md:text-sm'>{change}</span>
          </span>
        </div>
      )}
    </div>
  )
}

export default SummaryCard