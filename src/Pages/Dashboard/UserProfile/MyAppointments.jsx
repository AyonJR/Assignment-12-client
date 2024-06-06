import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { axiosSecure } from "../../../CustomHooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

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
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <motion.h2 
                className="text-3xl font-bold mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Upcoming Appointments
            </motion.h2>
            {userBookings.length === 0 ? (
                <motion.p 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    You have no upcoming appointments.
                </motion.p>
            ) : (
                <ul className="space-y-4">
                    {userBookings.map(appointment => (
                        <motion.li 
                            key={appointment._id} 
                            className="p-4 border rounded-lg shadow-md bg-white"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    
                                    <div className="text-lg font-semibold">{appointment.name}</div>
                                    <div className="text-gray-600">
                                        <span className="font-semibold">Date:</span> {new Date(appointment.startDate).toLocaleDateString()}
                                    </div>
                                    <div className="text-gray-600">
                                        <span className="font-semibold">Time:</span> {new Date(appointment.startDate).toLocaleTimeString()}
                                    </div>
                                </div>
                                <button
                                    className="px-4 py-2 bg-red-400 text-white rounded-lg transition-colors duration-300 hover:bg-red-600"
                                    onClick={() => handleCancel(appointment._id)}
                                    disabled={isCanceling}
                                >
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
