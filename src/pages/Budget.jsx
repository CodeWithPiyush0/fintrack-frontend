import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Budget = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] font-inter pt-20">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Budget</h2>
                <p className="text-gray-600">Budget view coming soon.</p>
            </div>
            <Footer />
        </div>
    );
};

export default Budget;

