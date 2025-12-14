import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

const initialTransactions = [
    {
        id: 1,
        name: "Salary Credit",
        category: "Salary",
        amount: 25000,
        type: "income",
        date: "2025-10-01",
    },
    {
        id: 2,
        name: "Grocery Shopping",
        category: "Food",
        amount: 1850,
        type: "expense",
        date: "2025-10-04",
    },
    {
        id: 3,
        name: "Netflix Subscription",
        category: "Entertainment",
        amount: 499,
        type: "expense",
        date: "2025-10-06",
    },
    {
        id: 4,
        name: "Freelance Project",
        category: "Income",
        amount: 5000,
        type: "income",
        date: "2025-10-07",
    },
    {
        id: 5,
        name: "Electricity Bill",
        category: "Utilities",
        amount: 1200,
        type: "expense",
        date: "2025-10-10",
    },
];

export const TransactionProvider = ({ children }) => {

    //Load transaction from localstorage or use initial data
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : initialTransactions;
    });

    // save to localstorage whenever transaction change
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    //add new transaction
    const addTransaction = (newTransaction) => {
        const transaction = {
            id: Date.now(),
            ...newTransaction,
            amount: parseFloat(newTransaction.amount),
        };
        setTransactions([transaction, ...transactions]);
    };

    // update transaction
    const updateTransaction = (id, updatedTransaction) => {
        setTransactions(transactions.map(txn => 
            txn.id === id
                ? { ...txn, ...updatedTransaction, amount: parseFloat(updatedTransaction.amount) }
                : txn
        ));
    };

    //delete transaction 
    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(txn => txn.id !== id));
    };

    //bulk import transaction 
    const importTransactions = (newTransactions) => {
        const transactionsWithIds = newTransactions.map((txn, index) => ({
            ...txn,
            id: Date.now() + index + Math.random(),
            amount: parseFloat(txn.amount),
        }));
        setTransactions([...transactionsWithIds, ...transactions]);
    };

    //Filter transactions
    const getFilteredTransactions = (filter = 'all') => {
        if(filter === 'all'){
            return transactions;
        }
        return transactions.filter(txn => txn.type === filter);
    };

    return (
        <TransactionContext.Provider value={{
            transactions,
            addTransaction,
            updateTransaction,
            deleteTransaction,
            importTransactions,
            getFilteredTransactions,
        }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionContext);