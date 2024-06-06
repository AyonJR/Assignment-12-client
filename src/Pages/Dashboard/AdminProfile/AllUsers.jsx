import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useState } from "react";
import Modal from "react-modal";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedBooking, setSelectedBooking] = useState(null);

    const { data: allBookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['allBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allBookings`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <table className="min-w-full bg-white overflow-x-auto">
                <thead>
                    <tr>
                        <th className="w-1/3 px-4 py-2">Name</th>
                        <th className="w-1/3 px-4 py-2">Email</th>
                        <th className="w-1/3 px-4 py-2">Test</th>
                        <th className="w-1/6 px-4 py-2">See info</th>
                    </tr>
                </thead>
                <tbody>
                    {allBookings.map((booking) => (
                        <tr key={booking._id}>
                            <td className="border px-4 py-2">{booking.displayName}</td>
                            <td className="border px-4 py-2">{booking.email}</td>
                            <td className="border px-4 py-2">{booking.name}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => setSelectedBooking(booking)}
                                    className="bg-blue-500 text-white font-semibold py-1 px-3 w-28 rounded hover:bg-blue-600 transition duration-300"
                                >
                                    See info
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedBooking && (
                <Modal
                    isOpen={!!selectedBooking}
                    onRequestClose={() => setSelectedBooking(null)}
                    contentLabel="User Details"
                    className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50"
                    overlayClassName="overlay"
                >
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">User Details</h2>
                        <p className="mb-2"><strong>Name:</strong> {selectedBooking.displayName}</p>
                        <p className="mb-2"><strong>Email:</strong> {selectedBooking.email}</p>
                        {selectedBooking.photoURL && (
                            <img
                                src={selectedBooking.photoURL}
                                alt="User"
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                        )}
                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AllUsers;
