import { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
            }
            setMessage("Reset link sent! check your email.");
        } catch (error) {
            setMessage(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
        <div className='bg-white p-8 rounded-2xl shadow-md w-[400px]'>
            <h2 className='text-2xl font-bold text-center mb-6'>Forgot Password</h2>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input 
                    type="text"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-gray-300 rounded-md p-3 focus:border-emerald-500 outline-none'
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='bg-[#00b894] hover:bg-[#00dca0] text-white py-2 rounded-md transition'
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
            {message && <p className='text-center mt-4 text-sm text-gray-600'>{message}</p>}
        </div>
    </div>
  )
}

export default ForgotPassword