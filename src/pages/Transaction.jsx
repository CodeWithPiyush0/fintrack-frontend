import { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TransactionFilters from '../components/TransactionFilters';
import TransactionTableFull from '../components/TransactionTableFull';
import AddTransactionModal from '../components/AddTransactionModal';
import EditTransactionModal from '../components/EditTransactionModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import ImportTransactionsModal from '../components/ImportTransactionsModal';
import { useTransactions } from '../context/TransactionContext';
import toast from 'react-hot-toast';

const Transaction = () => {

    const { addTransaction, updateTransaction, deleteTransaction } = useTransactions();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    const [selectedTxn, setSelectedTxn] = useState(null);

    const [activeFilter, setActiveFilter] = useState('all');

    const handleAdd = (transactionData) => {
      addTransaction(transactionData);
      toast.success('Transaction added successfully!');
      setShowAddModal(false);
    }

    const handleUpdate = (updatedData) => {
      updateTransaction(selectedTxn.id, updatedData);
      toast.success('Transaction updated successfully!');
      setShowEditModal(false);
      setSelectedTxn(null);
    };

    const handleDelete = () => {
      deleteTransaction(selectedTxn.id);
      toast.success('Transaction deleted successfully!');
      setShowDeleteModal(false);
      setSelectedTxn(null);
    };

  return (
    <div className='min-h-screen bg-[#f8fafc] font-inter pt-20'>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Transactions</h2>

            <TransactionFilters 
              onAdd={() => setShowAddModal(true)} 
              onImport={() => setShowImportModal(true)}
              onFilterChange={setActiveFilter}
            />

            <TransactionTableFull 
              filter={activeFilter}
              onEdit={(txn) => {
                setSelectedTxn(txn);
                setShowEditModal(true);
              }}
              onDelete={(txn) => {
                setSelectedTxn(txn);
                setShowDeleteModal(true);
              }}
            />
        </div>

        <Footer />

        {showAddModal && (
            <AddTransactionModal 
                onClose={() => setShowAddModal(false)} 
                onAdd={handleAdd}
            />
        )}
        {showEditModal && (
          <EditTransactionModal
            transaction={selectedTxn}
            onClose={() => {
                setShowEditModal(false);
                setSelectedTxn(null);
            }} 
            onUpdate={handleUpdate}
          />
        )}
        {showDeleteModal && (
          <DeleteConfirmationModal
            transaction={selectedTxn}
            onClose={() => {
                setShowDeleteModal(false);
                setSelectedTxn(null);
            }} 
            onConfirm={handleDelete}
          />
        )}
        {showImportModal && (
          <ImportTransactionsModal
              onClose={() => setShowImportModal(false)}
          />
        )}
    </div>
  );
};

export default Transaction;