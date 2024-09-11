import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock, FaMapMarkerAlt, FaImage } from "react-icons/fa";
import { GiDrop } from "react-icons/gi";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Register = () => {
    const [districtData, setDistrictData] = useState([]);
    const [upazilaData, setUpazilaData] = useState([]);
    const { createUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const cyanCustom = '#00bcd4';

    useEffect(() => {
        fetch('District.json')
            .then(res => res.json())
            .then(data => setDistrictData(data));
    }, []);

    useEffect(() => {
        fetch('Upazila.json')
            .then(res => res.json())
            .then(data => setUpazilaData(data));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const avatar = form.avatar.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;

        const userInfo = {
            name,
            email,
            avatar,
            bloodGroup,
            district,
            upazila,
            password,
            confirmPassword,
            status: "active"
        };

        if (password === confirmPassword) {
            try {
                const result = await createUser(email, password);
                const loggedUser = result.user;
                form.reset();
                navigate('/');
                const loggedInUserInfo = { name, email, avatar };

                const res = await axiosPublic.post('/loginUsers', loggedInUserInfo);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Signed up successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                }

                const secureRes = await axiosPublic.post('/users', userInfo);
            } catch (error) {
                console.error("Error during user registration:", error);
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    return (
        <div className="min-h-screen custom-font flex flex-col justify-center items-center ">
            <section className="max-w-4xl mt-5 p-6 mx-auto bg-white rounded-md shadow-md transform transition-all duration-500 hover:scale-105">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center mb-6">
                        <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-cyanCustom">
                            Sign Up
                        </h2>
                    </div>
                    <p className="text-sm my-5 text-center text-gray-600">
                        Already have an account?
                        <Link to={"/login"} className="text-cyanCustom hover:underline ml-1 transition-colors duration-300">Login here</Link>
                    </p>

                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div className="relative">
                            <label htmlFor="username" className="block mb-1 text-sm text-gray-700">Username</label>
                            <FaUserAlt className="absolute left-3 top-10 text-cyanCustom" />
                            <input id="username" name="name" type="text" placeholder="Abdul Baset" className="block w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-colors duration-300" />
                        </div>

                        <div className="relative">
                            <label htmlFor="emailAddress" className="block mb-1 text-sm text-gray-700">Email Address</label>
                            <FaEnvelope className="absolute left-3 top-10 text-cyanCustom" />
                            <input id="emailAddress" name="email" type="email" placeholder="abdulbaset.ayon@gmail.com" className="block w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-colors duration-300" />
                        </div>

                        <div className="relative">
                            <label htmlFor="avatar" className="block mb-1 text-sm text-gray-700">Avatar</label>
                            <FaImage className="absolute left-3 top-10 text-cyanCustom" />
                            <input id="avatar" name="avatar" type="text" placeholder="Avatar URL" className="block w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-colors duration-300" />
                        </div>

                        <div className="relative">
                            <label className="block mb-1 text-sm text-gray-700">Blood Group</label>
                            <GiDrop className="absolute left-3 top-10 text-cyanCustom" />
                            <select id="bloodGroup" name="bloodGroup" className="block w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-colors duration-300">
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        <div className="relative">
                            <label className="block mb-1 text-sm text-gray-700">District</label>
                            <FaMapMarkerAlt className="absolute left-3 top-10 text-cyanCustom" />
                            <select name="district" className="block w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-colors duration-300">
                                {districtData.map(district => <option key={district.id} value={district.name}>{district.name}</option>)}
                            </select>
                        </div>

                        <div className="relative">
                            <label className="block mb-1 text-sm text-gray-700">Upazila</label>
                            <FaMapMarkerAlt className="absolute left-3 top-10 text-cyanCustom" />
                            <select name="upazila" className="block w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-colors duration-300">
                                {upazilaData.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)}
                            </select>
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block mb-1 text-sm text-gray-700">Password</label>
                            <FaLock className="absolute left-3 top-10 text-cyanCustom" />
                            <input id="password" name="password" type="password" placeholder="••••••••" className="block w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-colors duration-300" />
                        </div>

                        <div className="relative">
                            <label htmlFor="passwordConfirmation" className="block mb-1 text-sm text-gray-700">Confirm Password</label>
                            <FaLock className="absolute left-3 top-10 text-cyanCustom" />
                            <input id="passwordConfirmation" name="confirmPassword" type="password" placeholder="••••••••" className="block w-full pl-10 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-colors duration-300" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="w-full px-6 py-2 text-sm font-medium text-white transition-colors duration-300 transform bg-cyanCustom rounded-md hover:bg-gradient-to-l focus:bg-gradient-to-l focus:outline-none">
                            Sign Up
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Register;
