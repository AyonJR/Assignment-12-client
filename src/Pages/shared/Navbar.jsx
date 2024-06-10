import { NavLink } from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext) 

   


    return (
        <div className="navbar ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                    {user ? (
                    <>
                        <ul className="menu menu-horizontal mr-2 px-1">
                            <li><NavLink to="/"><a className=" p-2   rounded-lg">Home</a></NavLink></li>
                            <li>
                                <NavLink to="/allTest"><a className=" p-2 rounded-lg">All Tests</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/healthPackage"><a className=" p-2 rounded-lg">Health Package</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/upcomingTests"><a className=" p-2 rounded-lg">Upcoming Tests</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/research"><a className=" p-2 rounded-lg">Research</a></NavLink>
                            </li>
                            <li><NavLink to="/dashboard"><a className=" p-2 rounded-lg">
                                <FaShoppingCart></FaShoppingCart>
                                 </a></NavLink></li>
                           
                        </ul>
                    </>
                ) : (
                    <>

                        <ul className="menu menu-horizontal mr-2 px-1">
                            <li><NavLink to="/"><a className=" p-2   rounded-lg">Home</a></NavLink></li>
                            <li>
                                <NavLink to="/allTest"><a className=" p-2 rounded-lg">All Tests</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/healthPackage"><a className=" p-2 rounded-lg">Health Package</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/upcomingTests"><a className=" p-2 rounded-lg">Upcoming Tests</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/research"><a className=" p-2 rounded-lg">Research</a></NavLink>
                            </li>

                        </ul>

                    </>
                )}
                

                         
                         
                            <li>
                                {user ? (
                                    <>
                                        {/* User photo and logout button */}
                                        <div className="relative">
                                            <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 mr-4 rounded-full cursor-pointer" />
                                            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">{user.displayName}</span>
                                        </div>
                                        <button onClick={logoutUser} className="btn">Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/login"><a className="btn font-bold mr-2 ">Login</a></NavLink>
                                        <NavLink to="/register"><a className="btn font-bold ">Register</a></NavLink>
                                    </>
                                )}
                            </li>

                        </ul>
                </div>
                <h2 className="self-center text-3xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-blue-300 bg-clip-text">LabX</h2>
            </div>
            <div className="navbar-center hidden lg:flex">

                {user ? (
                    <>
                        <ul className="menu menu-horizontal mr-2 px-1">
                        <li><NavLink to="/"><a className=" p-2   rounded-lg">Home</a></NavLink></li>
                            <li>
                                <NavLink to="/allTest"><a className=" p-2 rounded-lg">All Tests</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/healthPackage"><a className=" p-2 rounded-lg">Health Package</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/upcomingTests"><a className=" p-2 rounded-lg">Upcoming Tests</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/research"><a className=" p-2 rounded-lg">Research</a></NavLink>
                            </li>
                            <li><NavLink to="/dashboard"><a className=" p-2 rounded-lg"> 
                            <FaShoppingCart></FaShoppingCart>
                            </a></NavLink></li>
                        </ul>
                    </>
                ) : (
                    <>

                        <ul className="menu menu-horizontal mr-2 px-1">
                        <li><NavLink to="/"><a className=" p-2   rounded-lg">Home</a></NavLink></li>
                            <li>
                                <NavLink to="/allTest"><a className=" p-2 rounded-lg">All Tests</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/healthPackage"><a className=" p-2 rounded-lg">Health Package</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/upcomingTests"><a className=" p-2 rounded-lg">Upcoming Tests</a></NavLink>
                            </li>
                            <li>
                                <NavLink to="/research"><a className=" p-2 rounded-lg">Research</a></NavLink>
                            </li>


                        </ul>

                    </>
                )}
            </div>
            <div className="navbar-end">
                
                {user ? (
                    <>
                        {/* User photo and logout button */}
                        <div className="relative ">
                            <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 mr-4 rounded-full cursor-pointer" />
                            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">{user.displayName}</span>
                        </div>
                        <button onClick={logoutUser} className="btn  hidden sm:inline-block">Logout</button>
                    </>
                ) : (
                    <div className="hidden sm:inline-block"> {/* Wrap the login and register buttons in a div with a conditional class */}
                        <NavLink to="/login"><a className="btn bg-gray-700  font-bold mr-2 text-white hover:bg-gray-800 hover:border-gray-800">Login</a></NavLink>
                        <NavLink to="/register"><a className="btn bg-gray-700  font-bold mr-2 text-white hover:bg-gray-800 hover:border-gray-800">Register</a></NavLink>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Navbar;
