import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBudget } from "../context/BudgetContext";
import BudgetTable from "../components/BudgetTable";
import AddBudgetModal from "../components/AddBudgetModal";
import EditBudgetModal from "../components/EditBudgetModal";
import DeleteBudgetModal from "../components/DeleteBudgetModal";
import BudgetLineChart from "../components/BudgetLineChart";
import BudgetPieChart from "../components/BudgetPieChart";
import toast from "react-hot-toast";

const Budget = () => {

    const {
        selectedMonth,
        selectedCategory,
        setSelectedMonth,
        setSelectedCategory,
        getFilteredBudgets,
        getBudgetSummary,
        addBudget,
        updateBudget,
        deleteBudget,
    } = useBudget();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const budgets = getFilteredBudgets();
    const summary = getBudgetSummary();

    //generate month options
    const getMonthOptions = () => {
        const options = [];
        const now = new Date();
        for(let i = 0; i < 12; i++){
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            options.push({ value, label }); 
        }
        return options;
    };

    //get unique categories from budgets
    const getCategoryOptions = () => {
        const categories = [...new Set(budgets.map(b => b.category))];
        return categories;
    };

    const handleAdd = (budgetData) => {
        addBudget({ ...budgetData, month: selectedMonth });
        toast.success('Budget added successfully!');
        setShowAddModal(false);
    };

    const handleUpdate = (updateData) => {
        updateBudget(selectedBudget.id, updateData);
        toast.success('Budget updated successfully!');
        setShowEditModal(false);
        setSelectedBudget(null);
    };
    
    const handleDelete = () => {
        deleteBudget(selectedBudget.id);
        toast.success('Budget deleted successfully!');
        setShowDeleteModal(false);
        setSelectedBudget(null);
    };

    //pagination
    const totalPages = Math.ceil(budgets.length/itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBudgets = budgets.slice(startIndex, startIndex + itemsPerPage);

    const formatMonth = (monthString) => {
        const [year, month] = monthString.split('-');
        const date = new Date(year, parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };
    
    return (
        <div className="min-h-screen bg-[#f8fafc] font-inter pt-20">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Budget Planner</h2>
                    <p className="text-gray-600">Plan and monitor your monthly limits.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap gap-3">
                        <select 
                            value={selectedMonth}
                            onChange={(e) => {
                                setSelectedMonth(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {getMonthOptions().map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <select 
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="all">All Categories</option>
                            {getCategoryOptions().map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-6 py-2 bg-[#00b894] text-white rounded-md hover:bg-[#00dca0] transition font-medium"
                    >
                        + Add New Budget
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <p className="text-sm text-gray-500 mb-2">Total Budget</p>
                        <h3 className="text-2xl font-semibold text-gray-800">
                            ₹ {summary.totalBudget.toLocaleString('en-IN')}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{formatMonth(selectedMonth)}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <p className="text-sm text-gray-500 mb-2">Total Spent</p>
                        <h3 className="text-2xl font-semibold text-gray-800">
                            ₹ {summary.totalSpent.toLocaleString('en-IN')}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {summary.totalBudget > 0 ? `${summary.percentageUsed.toFixed(0)}% used` : '0% used'}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <p className="text-sm text-gray-500 mb-2">Remaining</p>
                        <h3 className={`text-2xl font-semibold ${summary.remaining >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            ₹ {summary.remaining.toLocaleString('en-IN')}
                        </h3>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${summary.percentageUsed > 100 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                style={{ width: `${Math.min(summary.percentageUsed, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <BudgetTable 
                    budgets={paginatedBudgets}
                    onEdit={(budget) => {
                        setSelectedBudget(budget);
                        setShowEditModal(true);
                    }}
                    onDelete={(budget) => {
                        setSelectedBudget(budget);
                        setShowDeleteModal(true);
                    }}
                />

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"                        
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded-md text-sm ${
                                    currentPage === i + 1
                                        ? 'bg-[#00b894] text-white'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Budget Insights</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <BudgetLineChart/>
                        <BudgetPieChart/>
                    </div>
                </div>
            </div>

            <Footer />

            {showAddModal && (
                <AddBudgetModal 
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAdd}
                />
            )}
            
            {showEditModal && (
                <EditBudgetModal 
                    budget={selectedBudget}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedBudget(null);
                    }}
                    onUpdate={handleUpdate}
                />
            )}
            
            {showDeleteModal && (
                <DeleteBudgetModal 
                    budget={selectedBudget}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedBudget(null);
                    }}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default Budget;

