import React from 'react'
import { X, AlertTriangle } from 'lucide-react'

const DeleteGoalModal = ({ goal, onClose, onConfirm }) => {

    if(!goal){
        return null;
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-2xl shadow-xl max-w-md w-full p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h3 className='text-xl font-semibold text-gray-800'>Delete Goal</h3>
                <button 
                    onClick={onClose}
                    className='text-gray-400 hover:text-gray-600 transition'
                >
                    <X size={22}/>
                </button>
            </div>

            <div className='flex items-start gap-3 mb-6'>
                <div className='p-2 bg-red-100 rounded-full'>
                    <AlertTriangle className='text-red-600' size={22} />
                </div>
                <div>
                    <p className='text-gray-700 mb-1'>
                        Are you sure you want to delete the budget for <strong>{goal.title}</strong>? 
                    </p>
                    <p className='text-sm text-gray-500'>
                        This action cannot be undone.
                    </p>
                </div>
            </div>

            <div className='flex gap-3'>
                <button 
                    onClick={onClose}
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition'
                >
                    Cancel
                </button>
            
                <button 
                    onClick={onConfirm}
                    className='flex-1 px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition'
                >
                    Delete
                </button>
                
            </div>
        </div>
    </div>
  );
};

export default DeleteGoalModal