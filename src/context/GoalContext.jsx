import { createContext, useContext, useEffect, useState } from "react";

const GoalsContext = createContext();

const initialGoals = [
    {
        id: 1,
        title: "Buy a New Laptop",
        target: 80000,
        saved: 50000,
        status: "Ongoing",
        category: "Tech"
    },
    {
        id: 2,
        title: "Emergency Fund",
        target: 100000,
        saved: 40000,
        status: "Ongoing",
        category: "Savings"
    },
    {
        id: 3,
        title: "Vacation Trip",
        target: 60000,
        saved: 60000,
        status: "Completed",
        category: "Travel"
    },
];

export const GoalsProvider = ({ children }) => {
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem("goals");
        return saved ? JSON.parse(saved) : initialGoals;
    });

    const [statusFilter, setStatusFilter] = useState("all");
    const [periodFilter, setPeriodFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("goals", JSON.stringify(goals));
    }, [goals]);

    const addGoal = (goal) => {
        setGoals([
            {
                id: Date.now(),
                ...goal,
                target: parseFloat(goal.target),
                saved: parseFloat(goal.saved) || 0,
            },
        ]);
    };

    const updateGoal = (id, data) => {
        setGoals((prev) => 
            prev.map((g) =>
                g.id === id
                    ? {
                        ...g,
                        ...data,
                        target: parseFloat(data.target),
                        saved: parseFloat(data.saved),
                    }
                : g
            )
        )
    };

    const deleteGoal = (id) => setGoals((prev) => prev.filter((g) => g.id !== id));

    const getFilteredGoals = () => {
        let list = [...goals];
        if(statusFilter !== "all"){
            list = list.filter((g) => g.status === statusFilter);
        }
        return list;
    };

    const getStats = () => {
        const totalTarget = goals.reduce((s, g) => s + g.target, 0);
        const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
        const completed = goals.filter((g) => g.saved >= g.target).length;
        const ongoing = goals.length - completed;
        return { totalTarget, totalSaved, completed, ongoing };
    };

    const getProgressData = () => {
        return goals.map((g) => ({
            label: g.title,
            saved: g.saved,
            remaining: Math.max(g.target - g.saved, 0),
        }));
    };

    const getStatusPie = () => {
        const completed = goals.filter((g) => g.saved >= g.target).length;
        const ongoing = goals.length - completed;
        const total = Math.max(goals.length, 1);
        return {
            labels: ["Completed", "Ongoing"],
            values: [
                ((completed / total) * 100).toFixed(1),
                ((ongoing / total) * 100).toFixed(1),
            ],
        };
    };

    return (
        <GoalsContext.Provider
            value={{
                goals,
                statusFilter,
                periodFilter,
                setStatusFilter,
                setPeriodFilter,
                addGoal,
                updateGoal,
                deleteGoal,
                getFilteredGoals,
                getStats,
                getProgressData,
                getStatusPie
            }}
        >
            {children}
        </GoalsContext.Provider>
    );
};

export const useGoals = () => useContext(GoalsContext);