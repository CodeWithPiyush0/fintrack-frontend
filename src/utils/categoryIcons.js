import React from 'react';
import { UtensilsCrossed, Wallet, Car, ShoppingBag, TrendingUp, Laptop, Receipt, Dumbbell, PiggyBank } from "lucide-react";

const iconMap = {
    "Food & Dining": { component: UtensilsCrossed, className: "text-emerald-600" },
    "Food": { component: UtensilsCrossed, className: "text-emerald-600" },
    "Salary": { component: Wallet, className: "text-blue-600" },
    "Transport": { component: Car, className: "text-orange-600" },
    "Transportation": { component: Car, className: "text-orange-600" },
    "Shopping": { component: ShoppingBag, className: "text-pink-600" },
    "Investment": { component: TrendingUp, className: "text-green-600" },
    "Entertainment": { component: TrendingUp, className: "text-purple-600" },
    "Freelance Work": { component: Laptop, className: "text-purple-600" },
    "Bills & Utilities": { component: Receipt, className: "text-yellow-600" },
    "Utilities": { component: Dumbbell, className: "text-yellow-600" },
    "Health & Fitness": { component: Dumbbell, className: "text-red-600" },
    "Savings & Investments": { component: PiggyBank, className: "text-indigo-600" },
    "Savings Account": { component: PiggyBank, className: "text-indigo-600" },
};

export const getCategoryIcon = (category, size = 18) => {
    const entry = iconMap[category] || { component: Wallet, className: "text-gray-600" };
    const Icon = entry.component;
    return React.createElement(Icon, { size, className: entry.className });
};