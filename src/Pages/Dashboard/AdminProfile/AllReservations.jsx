import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { Link } from "react-router-dom";

const AllReservations = () => {
    const axiosSecure = useAxiosSecure();
    const [searchEmail, setSearchEmail] = useState("");

    const { data: allBookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['allBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allBookings`);
            return res.data;
        }
    });

    // Filter bookings based on the search email
    const filteredBookings = allBookings.filter(booking => 
        booking.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    // Handle change in search input
    const handleSearchChange = (e) => {
        setSearchEmail(e.target.value);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-8">All Reservations</h2>
            
            <div className="mb-6 flex justify-center">
                <input 
                    type="text" 
                    placeholder="Search by email" 
                    value={searchEmail}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-md p-2"
                />
            </div>

            <table className="min-w-full bg-white overflow-x-auto">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Email</th>
                        <th className="w-1/4 px-4 py-2">Test Name</th>
                        <th className="w-1/4 px-4 py-2">Reservation Date</th>
                        <th className="w-1/4 px-4 py-2">Actions</th>
                        <th className="w-1/4 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                            <tr key={booking._id}>
                                <td className="border px-4 py-2">{booking.email}</td>
                                <td className="border px-4 py-2">{booking.name}</td>
                                <td className="border px-4 py-2">{new Date(booking.data).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <button className="btn bg-blue-400 text-white font-semibold">Cancel</button>
                                </td>
                                <td className="border px-4 py-2"> <button className="btn bg-blue-400 text-white font-semibold">{booking.reportStatus}</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">No reservations found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllReservations;
