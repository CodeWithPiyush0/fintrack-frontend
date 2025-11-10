import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || "User"}</h1>
            <p className="mb-8 text-gray-600">You're successfully logged in to FinTrack.</p>

            <button
                onClick={logout}
                className="px-6 py-2 bg-[#00b894] text-white rounded-md hover:bg-[#00dca0] transition-all"
            >
                Logout
            </button>
        </div>
    )
}

export default Dashboard