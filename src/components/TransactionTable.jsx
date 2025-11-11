import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const transactions = [
  {
    id: 1,
    name: "Salary Credit",
    category: "Income",
    amount: "+₹25,000",
    date: "Nov 10, 2025",
    type: "income",
  },
  {
    id: 2,
    name: "Grocery Shopping",
    category: "Expense",
    amount: "-₹1,850",
    date: "Nov 08, 2025",
    type: "expense",
  },
  {
    id: 3,
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: "-₹499",
    date: "Nov 05, 2025",
    type: "expense",
  },
  {
    id: 4,
    name: "Freelance Project",
    category: "Income",
    amount: "+₹5,000",
    date: "Nov 02, 2025",
    type: "income",
  },
  {
    id: 5,
    name: "Electricity Bill",
    category: "Expense",
    amount: "-₹1,200",
    date: "Oct 30, 2025",
    type: "expense",
  },
]

const TransactionTable = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Transaction</h3>
        <button className='text-emerald-600 text-sm hover:underline'>View All</button>
      </div>

      {/* table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase">
              <th className="py-3">Name</th>
              <th className="py-3">Category</th>
              <th className="py-3">Date</th>
              <th className="py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b last:border-none hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 font-medium text-gray-800 flex items-center gap-2">
                  {txn.type === "income" ? (
                    <ArrowUpRight className="text-emerald-500 w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="text-red-500 w-4 h-4" />
                  )}
                  {txn.name}
                </td>
                <td className="py-3">{txn.category}</td>
                <td className="py-3">{txn.date}</td>
                <td
                  className={`py-3 text-right font-semibold ${txn.type === "income" ? "text-emerald-600" : "text-red-500"
                    }`}
                >
                  {txn.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* card layout for mobile */}
      <div className="sm:hidden flex flex-col gap-3">
        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="border-gray-100 rounded-lg p-3 flex justify-between items-center shadow-md"
          >
              <div>
                <p className="font-medium text-gray-800">{txn.name}</p>
                <p className="text-xs text-gray-500">{txn.date}</p>
              </div>
              <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${txn.type === "income" ? "text-emerald-600" : "text-red-500"                      
                    }`}
                  >
                    {txn.amount}
                  </p>
                  <p className="text-xs text-gray-500">{txn.category}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;