import React from 'react'
import logo from "../assets/logo.svg"


const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 font-inter">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <img src={logo} alt="Fintrack Logo" className="w-6 h-6"/>
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} FinTrack. All rights reserved.
                </p>
            </div>

            <div className="flex items-center gap-5 text-sm text-gray-600">
                <a href="#" className="hover:text-emerald-600 transition-colors">
                    Privacy Policy
                </a>
                <a href="#" className="hover:text-emerald-600 transition-colors">
                    Terms of Use
                </a>
                <a href="#" className="hover:text-emerald-600 transition-colors">
                    About
                </a>
                <a href="#" className="hover:text-emerald-600 transition-colors">
                    Contact
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer