import React from 'react'
import { useGoals } from '../context/GoalsContext'

const GoalCardList = ({ onEdit, onDelete }) => {

    const { getFilteredGoals } = useGoals();
    const goals = getFilteredGoals();

    const progress = (saved, target) => Math.min((saved / target) * 100, 100).toFixed(0);

    if(!goals.length){
        return (
            <div className='bg-white rounded-2xl shadow-md p-10 text-center text-gray-500'>
                No goals yet. Add your first goal to get started!
            </div>
        );
    }

  return (
    <div className='grid gap-4 md:grid-cols-3'>
        {goals.map((g) => (
            <div key={g.id} className='bg-white rounded-2xl shadow-md p-4 space-y-2'>
                <h4 className='text-sm font-semibold text-gray-800'>{g.title}</h4>
                <p className='text-xs text-gray-500'>
                    ₹{g.target.toLocaleString("en-IN")} Target | ₹{g.saved.toLocaleString("en-IN")} Saved
                </p>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                        className={`h-2 rounded-full ${g.saved >= g.target ? "bg-emerald-500" : "bg-teal-500"}`}
                        style={{ width: `${progress(g.saved, g.target)}%` }}
                    ></div>
                </div>
                <div className='flex items-center justify-between'>
                    <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                            g.saved >= g.target ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600" 
                        }`}
                    >
                        {g.saved >= g.target ? "Completed" : g.status}
                    </span>
                    <div className='flex gap-3 text-sm text-emerald-600'>
                        <button onClick={() => onEdit(g)} className='hover:text-emerald-700'>
                            Edit
                        </button>
                        <button onClick={() => onDelete(g)} className='text-red-500 hover:text-red-600'>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
};

export default GoalCardList