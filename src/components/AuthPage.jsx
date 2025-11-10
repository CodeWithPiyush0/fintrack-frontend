import { useState } from "react"
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import logo from '../assets/logo 2.svg';

const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    //Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Handle form submission 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (isSignUp) {
            //Required fields check
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                setError("All fields are required");
                return;
            }

            //email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setError("Please enter a valid email address");
                return;
            }

            //password lenght
            if (formData.password.length < 6) {
                setError("Password must be at least 6 character");
                return;
            }

            //confirm passowrd check 
            if (formData.password !== formData.confirmPassword) {
                setError("Password does not match");
                return;
            }

        } else {
            // for login only email & pass required
            if (!formData.email || !formData.password) {
                setError("Please enter both email and passowrd");
                return;
            }

            //email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setError("Please enter a valid email address");
                return;
            }
        }

        const endpoint = isSignUp ? "signup" : "login";
        const url = `http://localhost:5000/api/auth/${endpoint}`;

        try {
            setLoading(true);
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // handle success and save token to localstorage
            if (isSignUp) {
                toast.success("Account created successfully! Please login.");

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

                setIsSignUp(false);
            } else {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    login(data.user);
                    toast.success("Logged in successfully!");

                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    });

                    navigate("/dashboard");
                }
            }

        } catch (error) {
            console.error("Auth error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center  bg-gray-100 font-inter">
            <div className="relative w-[800px] h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden flex">

                {/* Lft side form */}
                <motion.div
                    animate={{ x: isSignUp ? "320px" : "0px" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="relative z-20 w-[480px] h-full flex flex-col justify-center items-center px-[60px] py-[50px] bg-white"
                >

                    <h2 className="text-[32px] font-inter font-bold text-[#333333] leading-[40px] mb-5">
                        {isSignUp ? "Create Account" : "Sign in to FinTrack"}
                    </h2>

                    {/* Google sign in */}
                    <button
                        disabled={loading}
                        className="flex items-center justify-center gap-2 text-[#333333] hover:text-[00B894] transition-all duration-300 font-medium mb-3"
                    >
                        <FcGoogle size={20} />
                        {isSignUp ? "Sign up with Google" : "Sign in with Google"}
                    </button>

                    <p className="text-[#999999] text-[12px] leading-[20px] font-inter mb-4">
                        {isSignUp ? "or use your email for registration" : "or use your account "}
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                        {isSignUp && (
                            <div className="relative flex items-center border border-[#E0E0E0] rounded-md px-3 w-[320px] h-[50px] hover:border-[#00B894] transition-all">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="flex-1 bg-transparent outline-none text-[#333333] text-[14px] placeholder-[#999999] pl-9 pr-3"
                                />
                            </div>
                        )}

                        <div className="relative flex items-center border border-[#E0E0E0] rounded-md px-3 w-[320px] h-[50px] hover:border-[#00B894] transition-all">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="flex-1 bg-transparent outline-none text-[#333333] text-[14px] placeholder-[#999999] pl-9 pr-3"
                            />
                        </div>

                        <div className="relative flex items-center border border-[#E0E0E0] rounded-md px-3 w-[320px] h-[50px] hover:border-[#00B894] transition-all">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="flex-1 bg-transparent outline-none text-[#333333] text-[14px] placeholder-[#999999] pl-9 pr-3"
                            />
                            {showPassword ? (
                                <EyeOff
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" size={18}
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                    size={18}
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>

                        {isSignUp && (
                            <div className="relative flex items-center border border-[#E0E0E0] rounded-md px-3 w-[320px] h-[50px] hover:border-[#00B894] transition-all">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="flex-1 bg-transparent outline-none text-[#333333] text-[14px] placeholder-[#999999] pl-9 pr-3"
                                />
                                {showConfirmPassword ? (
                                    <EyeOff
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" size={18}
                                        onClick={() => setShowConfirmPassword(false)}
                                    />
                                ) : (
                                    <Eye
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                        size={18}
                                        onClick={() => setShowConfirmPassword(true)}
                                    />
                                )}
                            </div>
                        )}

                        {!isSignUp && (
                            <p 
                                onClick={() => navigate("/forgot-password")}
                                className="text-[#64748B] text-[14px] hover:text-[#00B894] cursor-pointer">
                                Forgot Password?
                            </p>
                        )}

                        {/* error message */}
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm mt-2 text-center font-medium"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className={`w-[160px] h-[40px] flex justify-center items-center bg-[#00B894]  text-white font-medium text-[16px] rounded-md transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#00DCA0]"}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                isSignUp ? "SIGN UP" : "SIGN IN"
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Right side panel */}
                <motion.div
                    animate={{ x: isSignUp ? "-480px" : "0px" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute right-0 w-[320px] h-full bg-gradient-to-br from-emerald-600 to-teal-500 text-white flex flex-col justify-center items-center text-center px-10 py-10 z-10"
                >

                    <div className="w-full flex justify-center mb-auto">
                        <img src={logo} alt="FinTrack Logo" className="w-[96px] h-[32] mb-2" />
                    </div>

                    <div className="flex flex-col items-center justify-center flex-1">
                        <h2 className="text-[32px] font-bold leading-[44px] mb-3 whitespace-nowrap">
                            {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
                        </h2>

                        <p className="text-[14px] leading-[20px] mb-6 max-w-[240px] text-white/90">
                            {isSignUp
                                ? "To keep connected, please login with your personal info"
                                : "Enter your personal details and start your journey with us"
                            }
                        </p>


                        <button
                            onClick={() => {
                                setFormData({
                                    name: "",
                                    email: "",
                                    password: "",
                                    confirmPassword: "",
                                });
                                setError("");
                                setShowPassword(false);
                                setShowConfirmPassword(false);
                                setIsSignUp(!isSignUp);
                            }}
                            disabled={loading}
                            className="w-[160px] h-[40px] bg-white text-[#00B894] font-medium text-[16px] rounded-md hover:bg-gray-100 transition-all"
                        >
                            {isSignUp ? "SIGN IN" : "SIGN UP"}
                        </button>

                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AuthPage