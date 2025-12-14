import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const DeleteConfirmationModal = ({ transaction, onClose, onConfirm }) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    if (!transaction) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Delete Transaction</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="text-red-500" size={24} />
                        <p className="text-gray-700">
                            Are you sure you want to delete this transaction?
                        </p>
                    </div>
                    {transaction.name && (
                        <div className="bg-gray-50 rounded-md p-3 mb-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Transaction:</span> {transaction.name}
                            </p>
                            {transaction.amount && (
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Amount:</span> {transaction.amount}
                                </p>
                            )}
                        </div>
                    )}
                    <p className="text-sm text-gray-500 mb-6">
                        This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;

