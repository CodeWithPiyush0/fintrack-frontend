import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { LogOut, Menu, X, UserCircle } from "lucide-react"
import logo from "../assets/logo.svg"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const navItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Transactions", path: "/transactions" },
        { name: "Budget", path: "/budget" },
        { name: "Goals", path: "/goals" },
        { name: "Reports", path: "/reports" },
    ];

    return (
        <nav className="bg-white shadow-sm fixed w-full z-20 top-0 left-0">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                >
                    <img src={logo} alt="Fintrack logo" className="w-28" />
                </div>

                <div className="hidden md:flex items-center gap-8 text-gray-700 font-regular">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `relative group pb-1 transition-all duration-300 ${isActive ? "text-[#00b894]" : "hover:text-[#00b894]"
                                }`
                            }
                        >
                            {item.name}
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00B894] transition-all duration-300 group-hover:w-full"></span>

                        </NavLink>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <UserCircle 
                        onClick={() => navigate("/profile")}
                        className="w-6 h-6 text-gray-600 hover:text-[#00b894] transition" 
                    />
                    <LogOut
                        onClick={handleLogout}
                        className="w-6 h-6 text-gray-600 cursor-pointer hover:text-[#00b894] transition"
                    />
                </div>

                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="flex flex-col items-center py-4 space-y-4  text-gray-700 font-regular">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `relative pb-1 transition-all duration-300 ${isActive ? "text-[#00b894]" : "hover:text-[#00b894]"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    <div className="flex items-center gap-4 pt-2 border-t w-full justify-center">
                        <UserCircle 
                            onClick={() => {
                                navigate("/profile");
                                setMenuOpen(false);
                            }}
                            className="w-6 h-6 text-gray-600 cursor-pointer hover:text-[#00b894] transition" 
                        />
                        <LogOut
                            onClick={handleLogout}
                            className="w-6 h-6 text-gray-600 cursor-pointer hover:text-[#00b894] transition"
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar