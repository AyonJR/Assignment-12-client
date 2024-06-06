import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineUpcoming } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { MdOutput } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { RiLayoutHorizontalLine } from "react-icons/ri";
import { RiReservedFill } from "react-icons/ri";
import { MdAddToQueue } from "react-icons/md";
import { PiFlagBannerFill } from "react-icons/pi";
import { SiStatista } from "react-icons/si";











const Dashboard = () => {




    const isAdmin = true;


    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-blue-400">
                <ul className="menu p-4">

                    {
                        isAdmin ?
                            <>
                                <li className="font-semibold"><NavLink to={"/dashboard/allUsers"}>
                                    <FaUsers></FaUsers>
                                    All Users</NavLink></li>
                                <li className="font-semibold"><NavLink to={"/dashboard/addTest"}>
                                <IoBagAdd />
                                    Add Test</NavLink></li>
                                <li className="font-semibold"><NavLink to={"/dashboard/allTests"}>
                                <RiLayoutHorizontalLine />
                                    All Tests</NavLink>
                                </li>
                               
                                <li className="font-semibold"><NavLink to={"/dashboard/addBanner"}>
                                <MdAddToQueue />
                                    Add Banner</NavLink>
                                </li>
                                <li className="font-semibold"><NavLink to={"/dashboard/allBanners"}>
                                <PiFlagBannerFill />
                                    All Banners</NavLink>
                                </li>
                                <li className="font-semibold"><NavLink to={"/dashboard/serviceChart"}>
                                <SiStatista />
                                    Statistics</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li className="font-semibold"><NavLink to={"/dashboard/myProfile"}>
                                    <ImProfile />
                                    My Profile</NavLink></li>
                                <li className="font-semibold"><NavLink to={"/dashboard/myAppointments"}>
                                    <MdOutlineUpcoming />
                                    My Appointments</NavLink></li>
                                <li className="font-semibold"><NavLink to={"/dashboard/testResult"}>
                                    <MdOutput />
                                    Test Result</NavLink>
                                </li>
                            </>
                    }



                    <div className="divider"></div>
                    <li className="font-semibold"><NavLink to={"/"}>
                        <IoHomeSharp />
                        Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;