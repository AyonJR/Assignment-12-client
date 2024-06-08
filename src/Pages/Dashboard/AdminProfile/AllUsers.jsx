import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import React, { useState } from "react";
import Modal from "react-modal";
import { jsPDF } from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedBooking, setSelectedBooking] = useState(null);

    const { data: allBookings = [], isLoading, isError, error , refetch } = useQuery({
        queryKey: ['allBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allBookings`);
            return res.data;
        }
    });

    const {data : logInUsers = []} = useQuery({
        queryKey : ['logInUsers'] , 
        queryFn : async () => {
            const res = await axiosSecure.get('/loginUsers')
            return res.data ;
        }
    }
    )

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    const handleDownload = (booking) => {
        const doc = new jsPDF();
        doc.text(`User Details`, 10, 10);
        doc.text(`Name: ${booking.displayName}`, 10, 20);
        doc.text(`Email: ${booking.email}`, 10, 30);
        doc.text(`Test: ${booking.name}`, 10, 40);
        doc.text(`Test Details: ${booking.details}`, 10, 50);
        doc.text(`Start Date: ${booking.startDate}`, 10, 60);
        doc.text(`End Date: ${booking.endDate}`, 10, 70);
        doc.text(`Report Status: ${booking.reportStatus}`, 10, 80);
        doc.save(`${booking.displayName}_details.pdf`);
    };

    const handleStatusChange = async (userId, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "blocked" : "active";
            await axiosSecure.put(`/updateUserStatus/${userId}`, { status: newStatus });
            queryClient.invalidateQueries('allBookings');
            toast.success(`User ${newStatus === 'active' ? 'unblocked' : 'blocked'} successfully!`);
        } catch (error) {
            console.error("Error updating user status:", error);
            toast.error("Error updating user status.");
        }
    };

    const groupedBookings = allBookings.reduce((acc, booking) => {
        if (!acc[booking.email]) {
            acc[booking.email] = [];
        }
        acc[booking.email].push(booking);
        return acc;
    }, {});

    const handleMakeAdmin = async (user) => {
        try {
          const res = await axiosSecure.patch(`/loginUsers/admin/${user._id}`);
          console.log(res.data);
          if (res.data.modifiedCount > 0) { 
            refetch()
            Swal.fire({
              title: 'Wow!',
              text: `${user.displayName} is admin now!`,
              icon: 'success'
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: `Failed to make ${user.displayName} an admin.`,
              icon: 'error'
            });
          }
        } catch (error) {
          console.error("Error making admin:", error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while making the user an admin.',
            icon: 'error'
          });
        }
      };
      
    return (
        <div className="container mx-auto p-8">
            <h2>total : {logInUsers.length}</h2>
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <table className="min-w-full bg-white overflow-x-auto">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Name</th>
                        <th className="w-1/4 px-4 py-2">Email</th>
                        <th className="w-1/4 px-4 py-2">Test</th>
                        <th className="w-1/6 px-4 py-2">See info</th>
                        <th className="w-1/6 px-4 py-2">Details</th>
                        <th className="w-1/6 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(groupedBookings).map((email) => (
                        <React.Fragment key={email}>
                            {groupedBookings[email].map((booking, index) => (
                                <tr key={booking._id}>
                                    <td className="border px-4 py-2">{booking.displayName}</td>
                                    {index === 0 && (
                                        <td className="border px-4 py-2" rowSpan={groupedBookings[email].length}>
                                            {email}
                                        </td>
                                    )}
                                    <td className="border px-4 py-2">{booking.name}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => setSelectedBooking(booking)}
                                            className="bg-blue-500 text-white font-semibold py-1 px-3 w-28 rounded hover:bg-blue-600 transition duration-300"
                                        >
                                            See info
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleDownload(booking)}
                                            className="bg-green-500 text-white font-semibold py-1 px-3 w-28 rounded hover:bg-green-600 transition duration-300"
                                        >
                                            Download
                                        </button>
                                    </td>
                                    {index === 0 && (
                                        <>
                                            <td className="border px-4 py-2" rowSpan={groupedBookings[email].length}>
                                                <button
                                                    onClick={() => handleStatusChange(booking.uid, booking.status)}
                                                    className={`font-semibold py-1 px-3 w-28 rounded transition duration-300 ${booking.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                                >
                                                    {booking.status === 'active' ? 'Block' : 'Unblock'}
                                                </button>
                                            </td>
                                          
                                        </>
                                    )}
                                </tr>
                            ))}
                        </React.Fragment>
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
            <div className="mt-20">
            <table className="w-full bg-white overflow-x-auto">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {logInUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {
                                    user.role === 'admin' ? 'Admin' :<button onClick={()=> handleMakeAdmin(user)} className="btn bg-blue-400 btn-lg">
                                    <FaUsers className="text-white text-2xl"></FaUsers>
                                </button>
                                }
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            </div>
            <ToastContainer />
        </div>
    );
};

export default AllUsers;
