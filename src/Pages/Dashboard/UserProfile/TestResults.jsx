import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaPrint, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion"; // For smooth animations

const TestResults = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: reports = [], isLoading, isError, error } = useQuery({
        queryKey: ['userReports', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-2xl animate-pulse">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-2xl">Error: {error.message}</div>;
    }

    const handlePrint = (resultLink) => {
        const newWindow = window.open(resultLink, '_blank');
        if (newWindow) {
            newWindow.onload = () => {
                newWindow.print();
            };
        } else {
            alert("Failed to open the document. Please check your popup settings.");
        }
    };

    // Filter reports to only include those with "Delivered" status
    const deliveredReports = reports.filter(report => report.reportStatus === 'Delivered');

    return (
        <motion.div 
            className="container bg-gradient-to-b from-white to-cyanCustom/20 mx-auto p-8" 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-4xl font-semibold text-black text-center mb-8">
                My Test <span className="text-cyanCustom">Reports</span>
            </h2>

            <motion.table 
                className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3, duration: 0.7 }}
            >
                <thead className="bg-cyanCustom text-white text-lg">
                    <tr>
                        <th className="w-1/4 px-6 py-3">Test Name</th>
                        <th className="w-1/4 px-6 py-3">Report Date</th>
                        <th className="w-1/4 px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveredReports.length > 0 ? (
                        deliveredReports.map((report) => (
                            <motion.tr 
                                key={report._id} 
                                className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <td className="px-6 py-4 text-gray-700">{report.name}</td>
                                <td className="px-6 py-4 text-gray-700">{new Date(report.data).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <a href={report.resultLink} target="_blank" rel="noopener noreferrer" className="btn flex items-center justify-center bg-blue-400 text-white font-semibold mr-2 transition-transform transform hover:scale-105 hover:shadow-lg">
                                        <FaEye className="mr-2" /> View
                                    </a>
                                    <button onClick={() => handlePrint(report.resultLink)} className="btn flex items-center justify-center bg-green-400 text-white font-semibold mr-2 transition-transform transform hover:scale-105 hover:shadow-lg">
                                        <FaPrint className="mr-2" /> Print
                                    </button>
                                    <a href={report.resultLink} download className="btn flex items-center justify-center bg-red-400 text-white font-semibold transition-transform transform hover:scale-105 hover:shadow-lg">
                                        <FaDownload className="mr-2" /> Download
                                    </a>
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4 text-lg text-gray-500 animate-pulse">No delivered reports found</td>
                        </tr>
                    )}
                </tbody>
            </motion.table>
        </motion.div>
    );
};

export default TestResults;
