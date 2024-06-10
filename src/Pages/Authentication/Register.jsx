import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Register = () => {
    const [districtData, setDistrictData] = useState([]);
    const [upazilaData, setUpazilaData] = useState([]);
    const { createUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

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
                form.reset()
                navigate('/')
                const loggedInUserInfo = { name, email , avatar };


                const res = await axiosPublic.post('/loginUsers', loggedInUserInfo);
                if (res.data.insertedId) {
                    console.log("User added to the database");
                    Swal.fire({
                        title: 'Success!',
                        text: 'Signed up successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                }

                const secureRes = await axiosPublic.post('/users', userInfo);
                console.log(secureRes.data);
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
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
            <section className="max-w-4xl mt-5 p-6 mx-auto bg-white rounded-md shadow-md ">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                        <h2 className="text-3xl font-semibold text-blue-400">Sign Up</h2>
                    </div>
                    <p className="text-sm my-5 text-center dark:text-gray-600">
                    Already have an account?
                    <Link to={"/login"} className="focus:underline hover:underline dark:text-violet-600"> Login here</Link>
                </p> 
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="username">Username</label>
                            <input id="username" name="name" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label htmlFor="emailAddress">Email Address</label>
                            <input id="emailAddress" name="email" type="email" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label htmlFor="avatar">Avatar</label>
                            <input id="avatar" name="avatar" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label>Blood Group</label>
                            <select id="bloodGroup" name="bloodGroup" className="block w-full mt-2 px-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400">
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
                        <div>
                            <label>District</label>
                            <select name="district" className="block w-full mt-2 px-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400">
                                {districtData.map(district => <option key={district.id} value={district.name}>{district.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label>Upazila</label>
                            <select name="upazila" className="block w-full mt-2 px-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400">
                                {upazilaData.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label htmlFor="passwordConfirmation">Password Confirmation</label>
                            <input id="passwordConfirmation" name="confirmPassword" type="password" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-400 font-semibold rounded-md hover:bg-blue-600">Sign Up</button>
                    </div>
                </form>
            </section>
        </div>
        <div className="mt-40">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Register;
