import React from 'react'
import { useState } from 'react'
import { X, User, Mail } from 'lucide-react'

const EditProfileModal = ({ user, onClose, onUpdate }) => {

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if(!formData.name || !formData.email){
            setError("All fields are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.email)){
            setError("Please enter a valid email address");
            return;
        }

        onUpdate(formData);
    }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-2xl shadow-xl max-w-full p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-xl font-semibold text-gray-800'>Edit Profile</h1>
                <button
                    onClick={onClose}
                    className='text-gray-400 hover:text-gray-600 transition'
                >
                    <X size={24}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Full Name
                    </label>
                    <div className='relative'>
                        <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18}/>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                            placeholder='Enter your name'
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        EMail Address
                    </label>
                    <div className='relative'>
                        <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18}/>
                        <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                </div>

                {error && (
                    <p className='text-sm text-red-500'>{error}</p>
                )}

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
                        className='flex-1 px-4 py-2 bg-emerald-500 rounded-md text-white hover:bg-emerald-600 transition'
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditProfileModal