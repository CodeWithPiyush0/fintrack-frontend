import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { useTransactions } from '../context/TransactionContext'
import { useBudget } from '../context/BudgetContext'
import { useGoals } from '../context/GoalsContext'
import EditProfileModal from '../components/EditProfileModal'
import ChangePasswordModal from '../components/ChangePasswordModal'
import DeleteAccountModal from '../components/DeleteAccountModal'
import { User, Mail, Calendar, Edit2, Lock, Settings, Trash2, DollarSign, Target, Receipt } from 'lucide-react'
import toast from 'react-hot-toast'

const Profile = () => {

    const { user } = useAuth();
    const { transactions } = useTransactions();
    const { budgets } = useBudget();
    const { goals, getStats } = useGoals();
    
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    
    const totalTransactions = transactions.length;
    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalBudgets = budgets.length;
    const goalStats = getStats();

    const handleProfileUpdate = (updateData) => {
        const updatedUser = { ...user, ...updateData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully!");
        setShowEditProfile(false);
        window.location.reload();
    };

    const handlePasswordChange = () => {
        toast.success("Password changed successfully!");
        setShowChangePassword(false);
    };

    const handleDeleteAccount = () => {
        toast.success("Account deletion requested. This feature will be implemented soon.");
        setShowDeleteAccount(false);
    };

  return (
    <div className='min-h-screen bg-[#f8fafc] font-inter pt-20'>
        <Navbar />

        <div className='max-w-7xl mx-auto px-4 py-8 space-y-6'>
            <div>
                <h2 className='text-2xl font-semibold text-gray-800 mb-1'>Profile Setting</h2>
                <p className='text-sm text-gray-600'>Manage your account information and preferences</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='lg:col-span-2 space-y-6'>
                    <div className='bg-white rounded-2xl shadow-md p-6'>
                        <div className='flex justify-between items-center mb-6'>
                            <h3 className='text-lg font-semibold text-gray-800'>Personal Information</h3>
                            <button
                                onClick={() => setShowEditProfile(true)}
                                className='flex items-center gap-2 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-md transition'
                            >
                                <Edit2 size={16} />
                                Edit
                            </button>
                        </div>

                        <div className='space-y-4'>
                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-emerald-100 rounded-full'>
                                    <User className='text-emerald-600' size={24} />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Full Name</p>
                                    <p className='text-base font-medium text-gray-800'>{user?.name || "Not set"}</p>
                                </div>
                            </div>
                            
                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-emerald-100 rounded-full'>
                                    <Mail className='text-emerald-600' size={24} />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Email Address</p>
                                    <p className='text-base font-medium text-gray-800'>{user?.email || "Not set"}</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-purple-100 rounded-full'>
                                    <Calendar className='text-purple-600' size={24} />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Member Since</p>
                                    <p className='text-base font-medium text-gray-800'>
                                        {user?.createdAt 
                                            ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) : "N/A"
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl shadow-md p-6'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-6'>Account Statistics</h3>

                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                            <div className='p-4 bg-emerald-50 rounded-xl'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <Receipt className='text-emerald-600' size={20}/>
                                    <p className='text-sm text-gray-600'>Transactions</p>
                                </div>
                                <p className='text-2xl font-semibold text-gray-800'>{totalTransactions}</p>
                            </div>
                            
                            <div className='p-4 bg-blue-50 rounded-xl'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <DollarSign className='text-blue-600' size={20}/>
                                    <p className='text-sm text-gray-600'>Total Income</p>
                                </div>
                                <p className='text-2xl font-semibold text-gray-800'>₹{totalIncome.toLocaleString('en-IN')}</p>
                            </div>

                            <div className='p-4 bg-red-50 rounded-xl'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <DollarSign className='text-red-600' size={20}/>
                                    <p className='text-sm text-gray-600'>Totla Expense</p>
                                </div>
                                <p className='text-2xl font-semibold text-gray-800'>₹{totalExpense.toLocaleString('en-IN')}</p>
                            </div>

                            <div className='p-4 bg-purple-50 rounded-xl'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <Target className='text-purple-600' size={20}/>
                                    <p className='text-sm text-gray-600'>Budgets</p>
                                </div>
                                <p className='text-2xl font-semibold text-gray-800'>{totalBudgets}</p>
                            </div>

                            <div className='p-4 bg-orange-50 rounded-xl'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <Target className='text-orange-600' size={20}/>
                                    <p className='text-sm text-gray-600'>Goals</p>
                                </div>
                                <p className='text-2xl font-semibold text-gray-800'>{goalStats.total}</p>
                            </div>

                            <div className='p-4 bg-teal-50 rounded-xl'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <Target className='text-teal-600' size={20}/>
                                    <p className='text-sm text-gray-600'>Completed Goals</p>
                                </div>
                                <p className='text-2xl font-semibold text-gray-800'>{goalStats.completed}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='space-y-6'>
                    <div className='bg-white rounded-2xl shadow-md p-6'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-emerald-100 rounded-lg'>
                                <Lock className='text-emerald-600' size={20}/>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Security</h3>
                        </div>
                        <button
                            onClick={() => setShowChangePassword(true)}
                            className='w-full px-4 py-2 text-sm text-emerald-600 border border-emerald-600 rounded-md hover:bg-emerald-50 transition'
                        >
                            Change Password
                        </button>
                    </div>

                    <div className='bg-white rounded-2xl shadow-md p-6'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-blue-100 rounded-lg'>
                                <Settings className='text-blue-600' size={20} />
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Settings</h3>
                        </div>
                        
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm text-gray-600'>Email Notifications</span>
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <input type="checkbox" className='sr-only peer' defaultChecked/>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm text-gray-600'>Budget Alerts</span>
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <input type="checkbox" className='sr-only peer' defaultChecked/>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm text-gray-600'>Goal Reminders</span>
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <input type="checkbox" className='sr-only peer' defaultChecked/>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl shadow-md p-6 border-2 border-red-100'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-red-100 rounded-lg'>
                                <Trash2 className='text-red-600' size={20}/>
                            </div>
                            <h3 className='text-lg font-semibold text-red-600'>Danger Zone</h3>
                        </div>
                        <p className='text-sm text-gray-600 mb-4'>
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button 
                            onClick={() => setShowDeleteAccount(true)}
                            className='w-full px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition'
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <Footer />

        {showEditProfile && (
            <EditProfileModal 
                user={user}
                onClose={() => setShowEditProfile(false)}
                onUpdate={handleProfileUpdate}
            />
        )}
        
        {showChangePassword && (
            <ChangePasswordModal 
                user={user}
                onClose={() => setShowChangePassword(false)}
                onUpdate={handlePasswordChange}
            />
        )}

        {showDeleteAccount && (
            <DeleteAccountModal 
                user={user}
                onClose={() => setShowDeleteAccount(false)}
                onUpdate={handleDeleteAccount}
            />
        )}

    </div>
  )
}

export default Profile