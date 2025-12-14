import { useState } from 'react'
import { X, Upload, FileSpreadsheet } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import toast from 'react-hot-toast';

const ImportTransactionsModal = ({ onClose }) => {

    const { importTransactions } = useTransactions();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    //handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile){
            setFile(selectedFile);
        }
    };

    // parse csv file
    const parseCSV = (text) => {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const transactions = [];

        for(let i = 1; i < lines.length; i++){
            if(!lines[i].trim()){
                continue;
            }

            const values = lines[i].split(',').map(v => v.trim());
            if(values.length < 4){
                continue;
            }

            // try to find columns
            const name = values[0] || 'Transaction';
            const amount = parseFloat(values[1]) || 0;
            const type = values[2]?.toLowerCase() || (amount >= 0 ? 'income' : 'expense');
            const category = values[3] || 'Others';
            const date = values[4] || new Date().toISOString().split('T')[0];

            transactions.push({
                name,
                amount: Math.abs(amount),
                type: type === 'income' ? 'income' : 'expense',
                category,
                date,
            });
        }

        return transactions;
    }

    //handle import
    const handleImport = async () => {
        if(!file){
            toast.error('Please select a file');
            return;
        }

        setLoading(true);

        try {
            const reader = new FileReader();

            reader.onload = (e) => {
                const text = e.target.result;
                let transactions = [];

                if(file.name.endsWith('.csv')){
                    transactions = parseCSV(text);
                } else {
                    toast.error("Only CSV files are supported for now");
                    setLoading(false);
                    return;
                }

                if(transactions.length === 0){
                    toast.error('No valid transactions found in file');
                    setLoading(false);
                    return;
                }
                
                importTransactions(transactions);
                toast.success(`Successfully imported ${transactions.length} transaction!`);
                onClose();
                setLoading(false);
            };

            reader.onerror = () => {
                toast.error('Error reading file');
                setLoading(false);
            }

            reader.readAsText(file);
        } catch (error) {
            toast.error('Error importing file');
            setLoading(false);
        }
    };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-2xl shadow-xl w-full max-w-md mx-4'>
            <div className='flex justify-between items-center p-6 border-b'>
                <h2 className='text-xl font-semibold text-gray-800'>Import Transactions</h2>
                <button
                    onClick={onClose}
                    className='text-gray-400 hover:text-gray-600 transition'
                >
                    <X size={24} />
                </button>
            </div>

            <div className='p-6 space-y-4'>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Select CSV File
                    </label>
                    <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition'>
                        <input 
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange} 
                            className="hidden"
                            id="file-upload"
                        />
                        <label 
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center gap-2"
                        >
                            <FileSpreadsheet className='text-emerald-500' size={40}/>
                            <span className="text-sm text-gray-600">
                                {file ? file.name : 'Click to upload CSV file'}
                            </span>
                            {file && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                    }}
                                    className="text-xs text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            )}
                        </label>
                    </div>
                </div>

                {/* Format instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800 font-medium mb-1">CSV Format:</p>
                    <p className="text-xs text-blue-700">
                        Name, Amount, Type (income/expense), Category, Date
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                        Example: Salary, 25000, income, Salary, 2025-01-10
                    </p>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={!file || loading}
                        className="flex-1 px-4 py-2 bg-[#00b894] text-white rounded-md hover:bg-[#00dca0] transition disabled:opacity-50"
                    >
                        {loading ? 'Importing...' : 'Import'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImportTransactionsModal;