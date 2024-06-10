import { Link } from "react-router-dom";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.css";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Login = () => { 
    const { loginUserWithGoogle, loginUser  } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic(); 
    

    // login
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
            })
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

    // Google login
    // const handleGoogleLogin = async () => {
    //     try {
    //         const result = await loginUserWithGoogle();
    //         Swal.fire({
    //             title: 'Success!',
    //             text: 'Logged in with Google successfully',
    //             icon: 'success',
    //             confirmButtonText: 'Cool'
    //         })
    //         .then(async (swalResult) => {
    //             if (swalResult.isConfirmed) {
    //                 navigate(location?.state?.from || "/");

    //                 const loggedInUserInfo = {
    //                     email: result.user?.email,
    //                     name: result.user?.displayName,
    //                 };

    //                 try {
    //                     const res = await axiosPublic.post('/loginUsers', loggedInUserInfo);
    //                     console.log(res.data);
    //                     navigate('/');
    //                 } catch (error) {
    //                     console.error("Error saving user info:", error);
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         console.error("Google login error:", error);
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'Google login failed',
    //             icon: 'error',
    //             confirmButtonText: 'OK'
    //         });
    //     }
    // };

    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="flex justify-center">
            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 ">
                <h2 className="mb-3 text-3xl font-semibold text-center text-blue-400">Login</h2>
                <p className="text-sm text-center dark:text-gray-600">
                    Don't have an account?
                    <Link to={"/register"} className="focus:underline hover:underline dark:text-violet-600"> Sign up here</Link>
                </p> 
                {/* <div className="my-6 space-y-4">
                    <button
                        aria-label="Login with Google"
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Login with Google</p>
                    </button>
                </div> */}
                
                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="email" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        </div>
                    </div>
                   <div className="flex justify-center">
                   <button type="submit" className=" px-8 py-3 font-semibold rounded-md bg-blue-400 text-white">Log in</button>
                   </div>
                </form>
            </div>
        </div>
        <div className="mt-40">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Login;
