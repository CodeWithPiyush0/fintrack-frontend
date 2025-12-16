import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useGoals } from "../context/GoalsContext";
import GoalCardList from "../components/GoalCardList";
import AddGoalModal from "../components/AddGoalModal";
import EditGoalModal from "../components/EditGoalModal";
import DeleteGoalModal from "../components/DeleteGoalModal";
import GoalProgressChart from "../components/GoalProgressChart";
import GoalStatusPie from "../components/GoalStatusPie";

const Goals = () => {
  const {
    statusFilter,
    setStatusFilter,
    periodFilter,
    setPeriodFilter,
    addGoal,
    updateGoal,
    deleteGoal,
    getStats,
  } = useGoals();

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const stats = getStats();

  const handleAdd = (data) => addGoal(data);
  const handleUpdate = (data) => updateGoal(selectedGoal.id, data);
  const handleDelete = () => deleteGoal(selectedGoal.id);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-inter pt-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Goal Planner</h2>
          <p className="text-sm text-gray-600">Set, track, and achieve your financial targets</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center bg-white rounded-2xl shadow-md p-4">
            <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                <option value="all">Status</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
            </select>

            <select 
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                <option value="all">Time Period</option>
                <option value="this-year">This Year</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-month">This Month</option>
            </select>

            <div className="ml-auto">
                <button
                    onClick={() => setShowAdd(true)}
                    className="px-5 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
                >
                    + Add Goal
                </button>
            </div>
        </div>

        <GoalCardList 
            onEdit={(g) => {
                setSelectedGoal(g);
                setShowEdit(true);
            }}
            onDelete={(g) => {
                setSelectedGoal(g);
                setShowDelete(true);
            }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GoalProgressChart />
            <GoalStatusPie />
        </div>
      </div>

      <Footer />

      {showAdd && (
        <AddGoalModal 
            onClose={() => setShowAdd(false)}
            onAdd={(data) => {
                handleAdd(data);
                setShowAdd(false);
            }}
        />
      )}

      {showEdit && (
        <EditGoalModal 
            goal={selectedGoal}
            onClose={() => {
                setShowEdit(false);
                setSelectedGoal(null);
            }}
            onUpdate={(data) => {
                handleUpdate(data);
                setShowEdit(false);
                setSelectedGoal(null);
            }}
        />
      )}

      {showDelete && (
        <DeleteGoalModal 
            goal={selectedGoal}
            onClose={() => {
                setShowDelete(false);
                setSelectedGoal(null);
            }}
            onConfirm={() => {
                handleDelete();
                setShowDelete(false);
                setSelectedGoal(null);
            }}
        />
      )}
    </div>
  );
};

export default Goals;