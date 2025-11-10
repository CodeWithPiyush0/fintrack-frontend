import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage("Password does not match");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
            }

            setMessage("Password reset successful! Redirecting...");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-[400px]">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="password" 
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-md p-3 focus:border-emerald-500 outline-none"
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 rounded-md p-3 focus:border-emerald-500 outline-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#00b894] hover:bg-[#00dca0] text-white py-2 rounded-md transition"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
                {message && <p className="text-center mt-4 text-sm text-gray-600">{message}</p>}
            </div>
        </div>
    )
}

export default ResetPassword;