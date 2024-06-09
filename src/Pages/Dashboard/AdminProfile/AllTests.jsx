import useAllTest from "../../../CustomHooks/useAllTest";
import { useState } from "react";
import Swal from 'sweetalert2';
import AllReservations from "./AllReservations";
import UpdateModal from "./UpdateModal";
import { Link } from "react-router-dom";

const AllTests = ({ queryClient }) => {
    const [allTest, isLoading, isError, error] = useAllTest();
    const [editTest, setEditTest] = useState(null); // Holds the test being edited
    const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    // Function to delete a test
    const handleDelete = async (id) => {
        const confirmResult = await Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to delete this test?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        });

        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/allTest/${id}`, {
                    method: 'DELETE',
                });
                const result = await response.json();
                if (response.ok) {
                    // Invalidate and refetch
                    queryClient.invalidateQueries(['allTest']);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Test has been deleted.',
                        icon: 'success'
                    });
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Error deleting test:", error);
            }
        }
    };

    // Function to open the edit modal
    const handleEdit = (test) => {
        setEditTest(test);
        setIsModalOpen(true);
    };

    // Function to update a test
    const handleUpdate = async (updatedTest) => {
        try {
            const response = await fetch(`http://localhost:5000/allTest/${updatedTest._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTest),
            });

            if (response.ok) {
                // Invalidate and refetch
                queryClient.invalidateQueries(['allTest']);
                setIsModalOpen(false);
            } else {
                const result = await response.json();
                alert(result.message);
            }
        } catch (error) {
            console.error("Error updating test:", error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <table className="min-w-full bg-white overflow-x-auto">
                <thead>
                    <tr>
                        <th className="w-1/3 px-4 py-2">Title</th>
                        <th className="w-1/3 px-4 py-2">Description</th>
                        <th className="w-1/6 px-4 py-2">Price</th>
                        <th className="w-1/6 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allTest.map((test) => (
                        <tr key={test._id}>
                            <td className="border px-4 py-2">{test.name}</td>
                            <td className="border px-4 py-2">{test.details}</td>
                            <td className="border px-4 py-2">${test.price}</td>
                            <td className="flex gap-2 m-2">
                                <Link to={`/dashboard/updateAdminTest/${test._id}`}>
                                <button className="btn bg-blue-400 text-white font-semibold" onClick={() => handleEdit(test)}>Update</button></Link>
                                <button className="btn bg-red-400 text-white font-semibold" onClick={() => handleDelete(test._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render the update modal if a test is being edited */}
            {isModalOpen && <UpdateModal test={editTest} onClose={() => setIsModalOpen(false)} onUpdate={handleUpdate} />}

            <div className="mt-16">
                <AllReservations />
            </div>
        </div>
    );
};

export default AllTests;
