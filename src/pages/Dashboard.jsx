import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import SummaryCard from "../components/SummaryCard"
import LineChartCard from "../components/LineChartCard"
import PieChartCard from "../components/PieChartCard"
import TransactionTable from "../components/TransactionTable"
import { TrendingUp, DollarSign, CreditCard, PieChart } from "lucide-react"

const summaryData = [
    {
        title: "Total Balance",
        value: "₹45,320",
        change: "+₹2,150 this month",
        positive: true,
        icon: <DollarSign size={20}/>
    },
    {
        title: "Total Income",
        value: "₹25,800",
        change: "+12% from last month",
        positive: true,
        icon: <TrendingUp size={20}/>
    },
    {
        title: "Total Expense",
        value: "₹18,600",
        change: "-8% from last month",
        positive: false,
        icon: <CreditCard size={20}/>
    },
    {
        title: "Savings Rate",
        value: "28%",
        change: "+3% improvement",
        positive: true,
        icon: <PieChart size={20}/>
    },
]

const Dashboard = () => {

    const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8fafc] font-inter pt-20">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
        </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-300">
                {summaryData.map((card) => (
                    <SummaryCard key={card.title} {...card} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LineChartCard />
                <PieChartCard />
            </div>

            <TransactionTable />

            <footer className="border-t mt-10 py-4 text-center text-sm text-gray-500">
                &copy; 2025 FinTrack. All rights reserved.
            </footer>
        </div>
    </div>
  )
}

export default Dashboard