import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

const TransactionTableFull = ({ onEdit, onDelete, filter = 'all' }) => {

    const { getFilteredTransactions } = useTransactions();
    const transactions = getFilteredTransactions(filter);

    //Format date
    const formatDate = (dateString) => {

        if(!dateString){
            return 'N/A';
        }

        let date;
        if(dateString.includes('-')){
            const parts = dateString.split('-');
            if(parts.length === 3 && parts[0].length === 2){
                date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            } else {
                date = new Date(dateString);
            }
        } else {
            date = new Date(dateString);
        }

        if(isNaN(date.getTime())){
            return dateString;
        }

        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount, type) => {
        const sign = type === 'income' ? '+' : '-';
        return `${sign}₹${amount.toLocaleString('en-IN')}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                All Transactions ({transactions.length})
            </h3>
            {transactions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No transactions found. Add your first transaction to get started!</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase">
                                <th className="py-3">Name</th>
                                <th className="py-3">Category</th>
                                <th className="py-3">Date</th>
                                <th className="py-3 text-right">Amount</th>
                                <th className="py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((txn) => (
                                <tr
                                    key={txn.id}
                                    className="border-b last:border-none hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3 font-medium text-gray-800 flex items-center gap-2">
                                        {txn.type === 'income' ? (
                                            <ArrowUpRight className="text-emerald-500 w-4 h-4" />
                                        ) : (
                                            <ArrowDownRight className="text-red-500 w-4 h-4" />
                                        )}
                                        {txn.name}
                                    </td>
                                    <td className="py-3">{txn.category}</td>
                                    <td className="py-3">{formatDate(txn.date)}</td>
                                    <td 
                                        className={`py-3 text-right font-semibold ${
                                            txn.type === 'income' ? 'text-emerald-600' : 'text-red-500'
                                        }`}
                                    >
                                        {formatAmount(txn.amount, txn.type)}
                                    </td>
                                    <td className="py-3 text-right">
                                        <button
                                            onClick={() => onEdit(txn)}
                                            className="text-emerald-600 hover:text-emerald-700 mr-3 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(txn)}
                                            className="text-red-600 hover:text-red-700 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionTableFull;

