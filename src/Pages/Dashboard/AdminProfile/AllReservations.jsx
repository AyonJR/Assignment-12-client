import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from 'sweetalert2';

const AllReservations = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchEmail, setSearchEmail] = useState("");
    const [resultLink, setResultLink] = useState("");
    const [currentBooking, setCurrentBooking] = useState(null);

    const { data: allBookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['allBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allBookings`);
            return res.data;
        }
    });

    const cancelMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/cancelReservation/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['allBookings']);
            Swal.fire({
                title: 'Cancelled!',
                text: 'Reservation has been cancelled.',
                icon: 'success'
            });
        }
    });

    const resultMutation = useMutation({
        mutationFn: ({ id, link }) => axiosSecure.put(`/submit-pdf/${id}`, { resultLink: link }),
        onSuccess: () => {
            queryClient.invalidateQueries(['allBookings']);
            setCurrentBooking(null);
            setResultLink("");
            Swal.fire({
                title: 'Submitted!',
                text: 'Test result has been submitted.',
                icon: 'success'
            });
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

    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to cancel this reservation?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cancelMutation.mutate(id);
            }
        });
    };

    const handleSubmitResult = () => {
        if (currentBooking) {
            resultMutation.mutate({ id: currentBooking._id, link: resultLink });
        }
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
                                <td className="border px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <button className="btn bg-red-400 text-white font-semibold" onClick={() => handleCancel(booking._id)}>Cancel</button>
                                    <button className="btn bg-green-400 text-white font-semibold" onClick={() => setCurrentBooking(booking)}>Submit Result</button>
                                </td>
                                <td className="border font-bold text-blue-600 px-4 py-2">{booking.reportStatus}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">No reservations found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for submitting test result */}
            {currentBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-2xl mb-4">Submit Test Result for {currentBooking.name}</h2>
                        <input
                            type="text"
                            placeholder="Enter result link"
                            value={resultLink}
                            onChange={(e) => setResultLink(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <button className="btn bg-blue-400 text-white font-semibold mr-4" onClick={handleSubmitResult}>Submit</button>
                        <button className="btn bg-red-400 text-white font-semibold" onClick={() => setCurrentBooking(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllReservations;
