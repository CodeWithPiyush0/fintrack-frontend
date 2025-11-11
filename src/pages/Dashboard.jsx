import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import Navbar from "../components/Navbar"
import SummaryCard from "../components/SummaryCard"
import LineChartCard from "../components/LineChartCard"
import PieChartCard from "../components/PieChartCard"
import TransactionTable from "../components/TransactionTable"
import { TrendingUp, DollarSign, CreditCard, PieChart } from "lucide-react"
import Footer from "../components/Footer"

const summaryData = [
    {
        title: "Total Balance",
        value: "₹45,320",
        change: "+₹2,150 this month",
        positive: true,
        icon: <DollarSign size={20} />
    },
    {
        title: "Total Income",
        value: "₹25,800",
        change: "+12% from last month",
        positive: true,
        icon: <TrendingUp size={20} />
    },
    {
        title: "Total Expense",
        value: "₹18,600",
        change: "-8% from last month",
        positive: false,
        icon: <CreditCard size={20} />
    },
    {
        title: "Savings Rate",
        value: "28%",
        change: "+3% improvement",
        positive: true,
        icon: <PieChart size={20} />
    },
]

const Dashboard = () => {

    const { user } = useAuth();
    const [filter, setFilter] = useState("This Year");

    return (
        <div className="min-h-screen bg-[#f8fafc] font-inter pt-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

                {/* Welcome text */}
                <div className="mt-3 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
                    </h2>
                    <p className="text-gray-500 text-sm">Here's a summary of your finances</p>
                </div>

                {/* summary cards */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 transition-all duration-300">
                    {summaryData.map((card) => (
                        <SummaryCard key={card.title} {...card} />
                    ))}
                </div>

                {/* chart section */}
                <div className="flex flex-col sm:flex-row md:items-center sm:justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Spending Overview</h2>
                    </div>

                    <div className="mt-3 sm:mt-0">
                        <select
                            aria-label="Select Time Filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="text-sm text-gray-700 border border-gray-200 rounded-md px-3 py-1 outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer appearance-none relative"
                        >
                            <option>This Year</option>
                            <option>Last Year</option>
                            <option>This Month</option>
                        </select>
                    </div>
                </div>

                {/* charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <LineChartCard filter={filter} />
                    <PieChartCard filter={filter} />
                </div>

                <TransactionTable />

            </div>
            <Footer />
        </div>
    )
}

export default Dashboard