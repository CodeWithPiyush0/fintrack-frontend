import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReportFilters from "../components/ReportFilters";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import CategoryBarChart from "../components/CategoryBarChart";
import TopExpensesPie from "../components/TopExpensesPie";
import { Download } from "lucide-react";

const Reports = () => {

    const handleFiltersChange = (filters) => {
        console.log("Report filters changed:", filters)
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] font-inter pt-20">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                                Reports / Analytics
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Get a detailed view of your income, expenses and spending patterns.
                            </p>
                        </div>

                        <button 
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 active:bg-emerald-700 transition-colors"
                        >
                            <Download size={16} />
                            Export
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-3 items-center bg-white rounded-2xl shadow-md p-4">
                        <ReportFilters onChange={handleFiltersChange}/>
                    </div>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <IncomeExpenseChart />
                        <CategoryBarChart />
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TopExpensesPie />
                    </section>
            </main>

            <Footer />
        </div>
    );
};

export default Reports;