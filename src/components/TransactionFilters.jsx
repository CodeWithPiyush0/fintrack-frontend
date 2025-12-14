import React, { useState} from 'react';

const TransactionFilters = ({ onAdd, onImport, onFilterChange }) => {

    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { label: 'All', value: 'all' },
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
    ];

    const handleFilterChange = (filterValue) => {
        setActiveFilter(filterValue);
        if(onFilterChange){
            onFilterChange(filterValue);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-3">
                {filters.map((filterItem) => (
                    <button
                        key={filterItem.value}
                        onClick={() => handleFilterChange(filterItem.value)}
                        className={`px-4 py-2 text-sm rounded-md transition ${
                            activeFilter === filterItem.value
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {filterItem.label}
                    </button>
                ))}
            </div>
            <div className='flex gap-3'>
                <button
                    onClick={onImport}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition font-medium"
                >
                    Import CSV
                </button>
                <button
                    onClick={onAdd}
                    className="px-6 py-2 bg-[#00b894] text-white rounded-md hover:bg-[#00dca0] transition font-medium"
                >
                    + Add Transaction
            </button>
            </div>    
        </div>
    );
};

export default TransactionFilters;

