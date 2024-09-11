import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { axiosSecure } from "../../../CustomHooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaTimesCircle } from "react-icons/fa";

const MyAppointments = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [isCanceling, setIsCanceling] = useState(false);

    const { data: userBookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['userBookings', user?.email], 
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/bookings/${user.email}`);
                return res.data;
            }
            return [];
        },
    });

    const handleCancel = async (appointmentId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            setIsCanceling(true);
            try {
                await axiosSecure.delete(`/bookings/${appointmentId}`);
                Swal.fire("Canceled!", "Your appointment has been canceled.", "success");
                queryClient.invalidateQueries(['userBookings', user?.email]);
            } catch (error) {
                console.error("Error canceling appointment:", error);
                Swal.fire("Error!", "Failed to cancel the appointment.", "error");
            } finally {
                setIsCanceling(false);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader animate-spin rounded-full border-t-4 border-cyanCustom h-12 w-12"></div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500 text-center">Error: {error.message}</div>;
    }

    return (
        <div className="container custom-font mx-auto py-12 px-4 lg:px-12 bg-gradient-to-b from-white to-cyanCustom/20 rounded-lg shadow-md">
            <motion.h2 
                className="text-4xl font-semibold text-black mb-8 text-center tracking-widest"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                My <span className="text-cyanCustom">Appointments</span>
            </motion.h2>
            {userBookings.length === 0 ? (
                <motion.p 
                    className="text-lg text-gray-600 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    No upcoming appointments found.
                </motion.p>
            ) : (
                <ul className="space-y-6">
                    {userBookings.map(appointment => (
                        <motion.li 
                            key={appointment._id} 
                            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-cyanCustom hover:shadow-lg transition-shadow duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-semibold text-cyanCustom mb-2">{appointment.name}</h3>
                                    <p className="text-gray-600 flex items-center gap-2">
                                        <FaCalendarAlt className="text-cyanCustom" />
                                        <span className="font-semibold">Date:</span> {new Date(appointment.startDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600 flex items-center gap-2">
                                        <FaClock className="text-cyanCustom" />
                                        <span className="font-semibold">Time:</span> {new Date(appointment.startDate).toLocaleTimeString()}
                                    </p>
                                </div>
                                <button
                                    className="flex items-center gap-2 px-6 py-2 bg-white text-cyanCustom font-semibold rounded-lg  hover:scale-105 transform transition-transform duration-300"
                                    onClick={() => handleCancel(appointment._id)}
                                    disabled={isCanceling}
                                >
                                    <FaTimesCircle />
                                    {isCanceling ? "Canceling..." : "Cancel"}
                                </button>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyAppointments;
