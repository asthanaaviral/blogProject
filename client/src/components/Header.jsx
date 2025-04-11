import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Header () {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState("Guest User");
    const [name, setName] = useState("-");
    const IP = import.meta.env.VITE_IP_ADDRESS;

    useEffect(() => {
        async function fetchUser() {
            try{
                const response = await fetch(`http://${IP}:3000/users`, {
                    credentials: "include"
                })
                if(response.status == 200) {
                    const data = await response.json();
                    setIsLoggedIn(true)
                    setName(data.name)
                    setEmail(data.email);
                }
            } catch (err) {
                console.log(err.message)
            }
            
        }
        fetchUser();
    }, [])

    
    return (
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-blue-600">📝 Blogify</Link>

        {!isLoggedIn ? (
            <div className="space-x-4">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition">
                    Login
                </Link>
                <Link to="/register" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition">
                    Register
                </Link>
                <Link to="/upload" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition">
                    Upload Blog
                </Link>
            </div>
        ) : (
            <div className="flex items-center space-x-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition">
                    Upload Blog
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-full transition flex items-center space-x-2"
                    >
                        <span className="font-medium">{user.name.split(" ")[0]}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-xl py-2 z-50 animate-fade-in-down">
                            <div className="px-4 py-2 text-sm text-gray-700 font-medium">{name}</div>
                            <div className="px-4 text-xs text-gray-500">{email}</div>
                            <hr className="my-2" />
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}
    </header>
    )
}

export default Header;