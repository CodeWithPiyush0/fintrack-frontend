import { createContext, useContext, useState, useEffect } from "react";
import { useTransactions } from "./TransactionContext";

const BudgetContext = createContext();

const initialBudgets = [
  {
    id: 1,
    category: "Food & Dining",
    limit: 10000,
    month: "2025-10",
    icon: "UtensilsCrossed",
  },
  {
    id: 2,
    category: "Transport",
    limit: 5000,
    month: "2025-10",
    icon: "Car",
  },
  {
    id: 3,
    category: "Shopping",
    limit: 8000,
    month: "2025-10",
    icon: "ShoppingBag",
  },
  {
    id: 4,
    category: "Bills & Utilities",
    limit: 12000,
    month: "2025-10",
    icon: "Receipt",
  },
  {
    id: 5,
    category: "Entertainment",
    limit: 3000,
    month: "2025-10",
    icon: "TrendingUp",
  },
  {
    id: 6,
    category: "Savings & Investments",
    limit: 22000,
    month: "2025-10",
    icon: "PiggyBank",
  },
];

export const BudgetProvider = ({ children }) => {
  const { transactions } = useTransactions();
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("budgets");
    return saved ? JSON.parse(saved) : initialBudgets;
  });

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  //get budgets for selected month and category
  const getFilteredBudgets = () => {
    let filtered = budgets.filter((b) => b.month === selectedMonth);

    if (selectedCategory !== "all") {
      filtered = filtered.filter((b) => b.category === selectedCategory);
    }

    return filtered;
  };

  //calculate spent amount for a budget category
  const getSpentAmount = (category, month) => {
    const monthTransactions = transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      const txnMonth = `${txnDate.getFullYear()}-${String(
        txnDate.getMonth() + 1
      ).padStart(2, "0")}`;
      return (
        txnMonth === month &&
        txn.type === "expense" &&
        txn.category === category
      );
    });

    return monthTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  };

  // get budget summary for selected month
  const getBudgetSummary = () => {
    const monthBudgets = budgets.filter((b) => b.month === selectedMonth);
    const totalBudget = monthBudgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = monthBudgets.reduce((sum, b) => {
      return sum + getSpentAmount(b.category, selectedMonth);
    }, 0);
    const remaining = totalBudget - totalSpent;
    const percentageUsed =
      totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    return { totalBudget, totalSpent, remaining, percentageUsed };
  };

  // add new budget
  const addBudget = (newBudget) => {
    const budget = {
      id: Date.now(),
      ...newBudget,
      limit: parseFloat(newBudget.limit),
    };
    setBudgets([...budgets, budget]);
  };

  //update budget
  const updateBudget = (id, updateBudget) => {
    setBudgets(
      budgets.map((b) =>
        b.id === id
          ? { ...b, ...updateBudget, limit: parseFloat(updateBudget.limit) }
          : b
      )
    );
  };

  //delete budget
  const deleteBudget = (id) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  //get chart data for budget insight
  const getBudgetChartData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const budgetData = [];
    const spentData = [];

    months.forEach((_, index) => {
      const month = `2025-${String(index + 1).padStart(2, "0")}`;
      const monthBudgets = budgets.filter((b) => b.month === month);
      const totalBudget = monthBudgets.reduce((sum, b) => sum + b.limit, 0);
      const totalSpent = monthBudgets.reduce((sum, b) => {
        return sum + getSpentAmount(b.category, month);
      }, 0);
      budgetData.push(totalBudget || 25000);
      spentData.push(totalSpent || 20000);
    });

    return { labels: months, budgetData, spentData };
  };

  //get pie chart data
  const getCategoryBudgetData = () => {
    const monthBudgets = budgets.filter((b) => b.month === selectedMonth);
    const total = monthBudgets.reduce((sum, b) => sum + b.limit, 0);

    return monthBudgets.map((b) => ({
      category: b.category,
      amount: b.limit,
      percentage: total > 0 ? ((b.limit / total) * 100).toFixed(0) : 0,
    }));
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        selectedMonth,
        selectedCategory,
        setSelectedMonth,
        setSelectedCategory,
        getFilteredBudgets,
        getSpentAmount,
        getBudgetSummary,
        addBudget,
        updateBudget,
        deleteBudget,
        getBudgetChartData,
        getCategoryBudgetData,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
