import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import { getCategoryIcon } from '../utils/categoryIcons';

const BudgetTable = ({ budgets, onEdit, onDelete }) => {

    const { getSpentAmount, selectedMonth } = useBudget();
    const formatAmount = (amount) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    }

    const getProgressPercentage = (limit, spent) => {
        if(limit === 0){
            return 0;
        }
        return Math.min((spent / limit) * 100, 100);
    };

    if(budgets.length === 0){
        return (
            <div className='bg-white rounded-2xl shadow-md p-12 text-center'>
                <p className='text-gray-500'>No budgets found. Add your first budget to get started!</p>
            </div>
        );
    }

  return (
    <div className='bg-white rounded-2xl shadow-md p-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Budget Categories ({budgets.length})
        </h3>
        <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm text-gray-600'>
                <thead>
                    <tr className='border-b border-gray-100 text-gray-500 text-xs uppercase'>
                        <th className='py-3'>Category</th>
                        <th className='py-3'>Limit</th>
                        <th className='py-3'>Spent</th>
                        <th className='py-3'>Remaining</th>
                        <th className='py-3'>Progress</th>
                        <th className='py-3 text-right'>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {budgets.map((budget) => {
                        const spent = getSpentAmount(budget.category, selectedMonth);
                        const remaining = budget.limit - spent;
                        const progress = getProgressPercentage(budget.limit, spent);
                        const isOverBudget = spent > budget.limit;

                        return (
                            <tr
                                key={budget.id}
                                className='border-b last:border-none hover:bg-gray-50 transition-colors'
                            >
                                <td className='py-3 font-medium text-gray-800 flex items-center gap-2'>
                                    {getCategoryIcon(budget.category)}
                                    {budget.category}
                                </td>
                                <td className='py-3'>{formatAmount(budget.limit)}</td>
                                <td className='py-3'>{formatAmount(spent)}</td>
                                <td className={`py-3 font-semibold ${remaining >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {formatAmount(remaining)}
                                </td>
                                <td className='py-3'>
                                    <div className='flex items-center gap-2'>
                                        <div className='flex-1 bg-gray-200 rounded-full h-2'>
                                            <div
                                                className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${Math.min(progress, 100)}%` }}
                                            ></div>
                                        </div>
                                        <span 
                                            className={`text-xs font-medium ${isOverBudget ? 'text-red-500' : 'text-emerald-600'}`}
                                        >
                                            {progress.toFixed(0)}%
                                        </span>
                                    </div>
                                </td>
                                
                                <td className='py-3 text-right'>
                                    <div className='flex justify-end gap-3'>
                                        <button
                                            onClick={() => onEdit(budget)}
                                            className='text-yellow-600 hover:text-yellow-700'
                                            title='Edit'
                                        >
                                            <Edit size={18} />
                                        </button>
                                        
                                        <button
                                            onClick={() => onDelete(budget)}
                                            className='text-red-600 hover:text-red-700'
                                            title='Delete'
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default BudgetTable;