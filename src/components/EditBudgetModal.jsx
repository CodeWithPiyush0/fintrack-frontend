import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react' 

const EditBudgetModal = ({ budget, onClose, onUpdate }) => {

    const [formData, setFormData] = useState({
        category: '',
        limit: '',
    });

    useEffect(() => {
        if(budget){
            setFormData({
                category: budget.category,
                limit: budget.limit.toString(),
            });
        }
    }, [budget]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.category || !formData.limit || parseFloat(formData.limit) <= 0){
            return;
        }
        onUpdate(formData);
    };

    if(!budget){
        return null;
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-2xl shadow-xl max-w-md w-full p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h3 className='text-xl font-semibold text-gray-800'>Edit Budget</h3>
                <button
                    onClick={onClose}
                    className='text-gray-400 hover:text-gray-600 transition'
                >
                    <X size={24}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Category</label>
                    <input 
                        type="text"
                        value={formData.category}
                        disabled
                        className='w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600' 
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Budget Limit (₹)
                    </label>
                    <input 
                        type="number"
                        value={formData.limit}
                        onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500'
                        placeholder='Enter budget limit'
                        min="1"
                        step="0.01"
                        required
                    />
                </div>

                <div className='flex gap-3 pt-4'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='flex-1 px-4 py-2 bg-[#00b894] text-white rounded-md hover:bg-[#00dca0] transition'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditBudgetModal;