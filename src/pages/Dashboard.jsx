import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import SummaryCard from "../components/SummaryCard"
import LineChartCard from "../components/LineChartCard"
import PieChartCard from "../components/PieChartCard"
import TransactionTable from "../components/TransactionTable"

const Dashboard = () => {

    const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8fafc] font-inter">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard title="Total Balance" amount="₹45,320" change="+2,150 this month" changeType="positive"/>
                <SummaryCard title="Total Income" amount="₹25,800" change="+12% from last month" changeType="positive"/>
                <SummaryCard title="Total Expense" amount="₹18,600" change="-8% from last month" changeType="negative"/>
                <SummaryCard title="Saving Rate" amount="28%" change="+3% improvement" changeType="positive"/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LineChartCard />
                <PieChartCard />
            </div>

            <TransactionTable />

            <footer className="border-t mt-10 py-4 text-center text-sm text-gray-500">
                &copy 2025 FinTrack. All rights reserved.
            </footer>
        </div>
    </div>
  )
}

export default Dashboard