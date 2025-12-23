import React from 'react'
import { createContext, useContext } from 'react'
import { useTransactions } from './TransactionContext'
import { useBudgets } from './BudgetContext'
import { useGoals } from './GoalsContext'

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
    
    const { transactions } = useTransactions();
    const { budgets } = useBudgets();
    const { goals } = useGoals();

    const getIncomeExpenseTrend = () => {
        const map = {};

        transactions.forEach((t) =>{
            const month = new Date(t.date).toLocaleString("default", {
                month: "short",
            });

            if(!map[month]){
                map[month] = { income: 0, expense: 0 };
            }

            if(t.type === "income"){
                map[month].income += t.income;
            } else {
                map[month].expense += t.amount;
            }
        });

        return {
            labels: Object.keys(map),
            income: Object.values(map).map((m) => m.income),
            expense: Object.values(map).map((m) => m.expense),
        };
    };

    const getCategorySpend = () => {
        const map = {};

        transactions
            .filter((t) => t.type === "expense")
            .forEach((t) => {
                map[t.category] = (map[t.category] || 0) + t.amount;
            });
        
        return {
            labels: Object.keys(map),
            values: Object.values(map),
        };
    };

    const getBudgetComparison = () => {
        return budgets.map((b) => {
            const spent = transactions
                .filter(
                    (t) => t.type === "expense" && t.category === b.category
                )
                .reduce((sum, t) => sum + t.amount, 0);

            return {
                category: b.category,
                budget: b.amount,
                spent,
            };
        });
    };

    const getGoalSummary = () => {
        const completed = goals.filter((g) => g.saved >= g.target).length;

        return {
            total: goals.length,
            completed,
            ongoing: goals.length - completed,
        };
    };

  return (
    <ReportsContext.Provider
        value={{
            getIncomeExpenseTrend,
            getCategorySpend,
            getBudgetComparison,
            getGoalSummary,
        }}
    >
        {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => useContext(ReportsContext);