import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaShoppingCart, FaHome, FaFlask, FaCalendarAlt, FaUserCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <div className="navbar bg-white shadow-lg px-6 py-4  w-full z-50">
            <div className="navbar-start">
                {/* Mobile Menu Button */}
                <div className="dropdown">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost lg:hidden hover:bg-blue-100 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-4 shadow-lg bg-white rounded-box w-52 space-y-2"
                    >
                        {user ? (
                            <>
                                <li><Link to="/" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaHome /><span>Home</span></Link></li>
                                <li><NavLink to="/allTest" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaFlask /><span>All Tests</span></NavLink></li>
                                <li><NavLink to="/healthPackage" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaCalendarAlt /><span>Health Packages</span></NavLink></li>
                                <li><NavLink to="/upcomingTests" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaCalendarAlt /><span>Upcoming Tests</span></NavLink></li>
                                <li><NavLink to="/research" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaFlask /><span>Research</span></NavLink></li>
                                <li><NavLink to="/dashboard" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaShoppingCart /><span>Dashboard</span></NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaHome /><span>Home</span></NavLink></li>
                                <li><NavLink to="/allTest" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaFlask /><span>All Tests</span></NavLink></li>
                                <li><NavLink to="/healthPackage" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaCalendarAlt /><span>Health Packages</span></NavLink></li>
                                <li><NavLink to="/upcomingTests" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaCalendarAlt /><span>Upcoming Tests</span></NavLink></li>
                                <li><NavLink to="/research" className="flex items-center space-x-2 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition"><FaFlask /><span>Research</span></NavLink></li>
                            </>
                        )}
                        <li className="mt-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border border-blue-500" />
                                    <span className="text-blue-500 font-semibold">{user.displayName}</span>
                                    <button onClick={logoutUser} className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center space-x-2">
                                        <FaSignOutAlt /><span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <NavLink to="/login" className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center space-x-2">
                                        <FaSignInAlt /><span>Login</span>
                                    </NavLink>
                                    <NavLink to="/register" className="btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center space-x-2">
                                        <FaUserCircle /><span>Register</span>
                                    </NavLink>
                                </>
                            )}
                        </li>
                    </ul>
                </div>

                {/* Logo */}
                <NavLink to="/" className="flex items-center">
                    <img className="w-32" src="https://i.ibb.co.com/VqQc6xN/Blue-white-and-green-Medical-care-logo-1-removebg-preview.png" alt="LabX Logo" />
                </NavLink>
            </div>

            {/* Links for Larger Screens */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal custom-font text-cyanCustom space-x-4">
                    {user ? (
                        <>
                            <li><NavLink to="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaHome /><span>Home</span></NavLink></li>
                            <li><NavLink to="/allTest" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaFlask /><span>All Tests</span></NavLink></li>
                            <li><NavLink to="/healthPackage" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaCalendarAlt /><span>Health Packages</span></NavLink></li>
                            <li><NavLink to="/upcomingTests" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaCalendarAlt /><span>Upcoming Tests</span></NavLink></li>
                            <li><NavLink to="/research" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaFlask /><span>Research</span></NavLink></li>
                            <li><NavLink to="/dashboard" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaShoppingCart /><span>Dashboard</span></NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaHome /><span>Home</span></Link></li>
                            <li><Link to="/allTest" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaFlask /><span>All Tests</span></Link></li>
                            <li><Link to="/healthPackage" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaCalendarAlt /><span>Health Packages</span></Link></li>
                            <li><Link to="/upcomingTests" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaCalendarAlt /><span>Upcoming Tests</span></Link></li>
                            <li><Link to="/research" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition"><FaFlask /><span>Research</span></Link></li>
                        </>
                    )}
                </ul>
            </div>

            {/* User Info */}
            <div className="navbar-end hidden lg:flex items-center space-x-4">
                {user ? (
                    <>
                        <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border border-blue-500 cursor-pointer" />
                        
                        <button onClick={logoutUser} className="btn bg-white text-cyanCustom border-2 border-cyanCustom px-4 py-2 rounded-md  transition flex items-center space-x-2">
                            <FaSignOutAlt /><span>Logout</span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn bg-cyanCustom text-white px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-110 hover:bg-cyanCustom flex items-center space-x-2">
                            <FaSignInAlt /><span>Login</span>
                        </Link>
                        
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
