import React from 'react'
import { useState } from 'react'
import { X, Lock, Eye, EyeOff } from 'lucide-react'

const ChangePasswordModal = ({ onClose, onUpdate }) => {

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if(!formData.currentPassword || !formData.newPassword || !formData.confirmPassword){
            setError("All fields are required");
            return;
        }
        if(formData.newPassword.length < 6){
            setError("Password must be at least 6 characters");
            return;
        }
        if(formData.newPassword !== formData.confirmPassword){
            setError("New password do not match");
            return;
        }
        if(formData.currentPassword === formData.newPassword){
            setError("New password must be different from current password");
            return;
        }

        onUpdate();
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-2xl shadow-xl max-w-full p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-xl font-semibold text-gray-800'>Change Profile</h1>
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
                        Current Password
                    </label>
                    <div className='relative'>
                        <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18}/>
                        <input 
                            type={showCurrent ? "text" : "password"} 
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                            placeholder='Enter current password'
                            required
                        />
                        <button 
                            type='button'
                            onClick={() => setShowCurrent(!showCurrent)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        New Password
                    </label>
                    <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18}/>
                        <input 
                            type={showNew ? "text" : "password"} 
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                            placeholder='Enter new password'
                            required
                        />
                        <button 
                            type='button'
                            onClick={() => setShowNew(!showNew)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Confirm New Password
                    </label>
                    <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18}/>
                        <input 
                            type={showNew ? "text" : "password"} 
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                            placeholder='Confirm new password'
                            required
                        />
                        <button 
                            type='button'
                            onClick={() => setShowConfirm(!showConfirm)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
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
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePasswordModal