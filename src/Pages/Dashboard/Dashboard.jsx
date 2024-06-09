import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdOutlineUpcoming, MdOutput, MdAddToQueue } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoHomeSharp, IoBagAdd } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { RiLayoutHorizontalLine } from "react-icons/ri";
import { PiFlagBannerFill } from "react-icons/pi";
import { SiStatista } from "react-icons/si";
import useAdmin from "../../CustomHooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { axiosSecure } from "../../CustomHooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import { TiThMenu } from "react-icons/ti";


const Dashboard = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data: userBookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['userBookings', user?.email], 
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/bookings/${user.email}`);
                return res.data;
            }
        },
    });

    const [isAdmin] = useAdmin();
    let isBlocked = false;
    if (userBookings && userBookings.length > 0) {
        userBookings.forEach(booking => {
            if (booking.status === "blocked") {
                isBlocked = true;
            }
        });
    }

    if (isBlocked) {
        toast.error("Try with another mail, you are not permissible");
        return (
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold">You cannot visit anymore</h1>
                <button onClick={logoutUser} className="btn">Logout</button>
                {navigate('/login')}
            </div>
        );
    }

    return (
        <div>
            {/* Drawer */}
            <div className="drawer ml-10 mt-10 lg:hidden">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" onChange={() => setIsDrawerOpen(!isDrawerOpen)} />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn text-white bg-blue-400 drawer-button">
                    <TiThMenu />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {isAdmin ? (
                            <>
                                <li className="font-semibold">
                                    <NavLink to={"/dashboard/allUsers"}>
                                        <FaUsers />
                                        All Users
                                    </NavLink>
                                </li>
                                <li className="font-semibold">
                                    <NavLink to={"/dashboard/addTest"}>
                                        <IoBagAdd />
                                        Add Test
                                    </NavLink>
                                </li>
                                <li className="font-semibold">
                                    <NavLink to={"/dashboard/allTests"}>
                                        <RiLayoutHorizontalLine />
                                        All Tests
                                    </NavLink>
                                </li>
                                <li className="font-semibold">
                                    <NavLink to={"/dashboard/addBanner"}>
                                        <MdAddToQueue />
                                        Add Banner
                                    </NavLink>
                                </li>
                                <li className="font-semibold">
                                    <NavLink to={"/dashboard/allBanners"}>
                                        <PiFlagBannerFill />
                                        All Banners
                                    </NavLink>
                                </li>
                                <li className="font-semibold">
                                    <NavLink to={"/dashboard/serviceChart"}>
                                        <SiStatista />
                                        Statistics
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="font-semibold">
                                    <NavLink to={"/dashboard/myProfile"}>
                                        <ImProfile />
                                        My Profile
                                    </NavLink>
                                </li>
                                <li className="font-semibold">
                                    <NavLink to={"/dashboard/myAppointments"}>
                                        <MdOutlineUpcoming />
                                        My Appointments
                                    </NavLink>
                                </li>
                                <li className="font-semibold">
                                    <NavLink to={"/dashboard/testResult"}>
                                        <MdOutput />
                                        Test Result
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className="flex">
                {!isDrawerOpen && (
                    <div className="w-64 min-h-screen bg-blue-400 hidden lg:block">
                        <ul className="menu p-4">
                            {isAdmin ? (
                                <>
                                    <li className="font-semibold">
                                        <NavLink to={"/dashboard/allUsers"}>
                                            <FaUsers />
                                            All Users
                                        </NavLink>
                                    </li>
                                    <li className="font-semibold">
                                        <NavLink to={"/dashboard/addTest"}>
                                            <IoBagAdd />
                                            Add Test
                                        </NavLink>
                                    </li>
                                    <li className="font-semibold">
                                        <NavLink to={"/dashboard/allTests"}>
                                            <RiLayoutHorizontalLine />
                                            All Tests
                                        </NavLink>
                                    </li>
                                    <li className="font-semibold">
                                        <NavLink to={"/dashboard/addBanner"}>
                                            <MdAddToQueue />
                                            Add Banner
                                        </NavLink>
                                    </li>
                                    <li className="font-semibold">
                                        <NavLink to={"/dashboard/allBanners"}>
                                            <PiFlagBannerFill />
                                            All Banners
                                        </NavLink>
                                    </li>
                                    <li className="font-semibold">
                                        <NavLink to={"/dashboard/serviceChart"}>
                                            <SiStatista />
                                            Statistics
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="font-semibold">
                                        <NavLink to={"/dashboard/myProfile"}>
                                            <ImProfile />
                                            My Profile
                                        </NavLink>
                                    </li>
                                    <li className="font-semibold">
                                        <NavLink to={"/dashboard/myAppointments"}>
                                            <MdOutlineUpcoming />
                                            My Appointments
                                        </NavLink>
                                    </li>
                                    <li className="font-semibold">
                                        <NavLink to={"/dashboard/testResult"}>
                                            <MdOutput />
                                            Test Result
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            <div className="divider"></div>
                            <li className="font-semibold">
                                <NavLink to={"/"}>
                                    <IoHomeSharp />
                                    Home
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}

                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Dashboard;
