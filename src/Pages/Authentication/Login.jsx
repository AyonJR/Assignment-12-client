import { Link } from "react-router-dom";
import  { useContext } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";


const Login = () => { 

	const {   loginUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    

	//login
	const handleLogin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");

        try {
            await loginUser(email, password);
            navigate(location?.state ? location.state.from : '/');
        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
                title: 'Error!',
                text: ' Login failed',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
  



    return (
        <div className="flex justify-center">
            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
	<h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
	<p className="text-sm text-center dark:text-gray-600">Dont have account?
		<Link to={"/register"}>
        <a href="#" rel="noopener noreferrer" className="focus:underline hover:underline  dark:text-violet-600">Sign up here</a>
        </Link>
	</p>
	
	<div className="flex items-center w-full my-4">
		<hr  className="w-full dark:text-gray-600" />
		<p className="px-3 dark:text-gray-600">OR</p>
		<hr  className="w-full dark:text-gray-600" />
	</div>
	<form noValidate="" action="" className="space-y-8">
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
		<button onClick={handleLogin} type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-gray-700 dark:text-gray-50">Sign in</button>
	</form>
</div>
        </div>
    );
};

export default Login;