import React, { useState } from "react";
import { X } from "lucide-react";

const AddGoalModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    target: "",
    saved: "",
    status: "Ongoing",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.target) {
      return;
    }
    onAdd({
      ...form,
      target: parseFloat(form.target),
      saved: parseFloat(form.saved || 0),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Add Goal</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Goal Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={form.target}
              onChange={(e) => setForm({ ...form, target: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Target (₹)
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.target}
                onChange={(e) => setForm({ ...form, target: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Saved (₹)
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.saved}
                onChange={(e) => setForm({ ...form, target: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Status
            </label>
            <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="flex-1 px-4 py-2 border bg-[#00b894] border-emerald-500 text-white rounded-md hover:bg-emerald-600"
            >
                Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
