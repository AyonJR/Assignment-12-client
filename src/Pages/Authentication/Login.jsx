import { Link } from "react-router-dom";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.css";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const { loginUserWithGoogle, loginUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic(); 

    // Handle regular login
    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await loginUser(email, password);
            Swal.fire({
                title: 'Success!',
                text: 'Logged in successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            navigate(location?.state?.from || '/');
        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Login failed',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // Handle Google login
    const handleGoogleLogin = async () => {
        try {
            await loginUserWithGoogle();
            Swal.fire({
                title: 'Success!',
                text: 'Logged in with Google successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            navigate(location?.state?.from || '/'); // Redirect to home page or previous page
        } catch (error) {
            console.error("Google Login Error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Google login failed',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex custom-font justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-500">
                <h2 className="text-4xl font-semibold  text-cyanCustom mb-6 text-center animate-pulse">
                    Login
                </h2>
                <p className="text-sm text-center text-gray-600 mb-4">
                    Don't have an account? 
                    <Link to={"/register"} className="text-cyanCustom hover:underline"> Sign up here</Link>
                </p>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                            <FaEnvelope className="text-cyanCustom mr-2" />
                            Email address
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            className="w-full px-4 py-2 mt-1 border border-cyan-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 hover:border-cyan-500 transform hover:scale-105"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700">
                            <FaLock className="text-cyanCustom mr-2" />
                            Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••" 
                            className="w-full px-4 py-2 mt-1 border border-cyan-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 hover:border-cyan-500 transform hover:scale-105"
                        />
                    </div>
                    
                    <div className="flex justify-center items-center">
                        <button 
                            type="submit" 
                            className="px-6 py-3 bg-cyanCustom text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-110"
                        >
                            Log in
                        </button>
                    </div>
                </form>
                
                <div className="flex items-center my-6">
                    <hr className="flex-1 border-cyan-300" />
                    <span className="mx-4 text-cyan-600">or</span>
                    <hr className="flex-1 border-cyan-300" />
                </div>
                
                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full px-4 py-2 bg-cyanCustom text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
                >
                    <FaGoogle className="mr-2" />
                    Log in with Google
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
