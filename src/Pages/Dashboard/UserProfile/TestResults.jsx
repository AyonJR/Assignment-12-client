import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

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
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
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
        <div className="container mx-auto p-8">
            <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-8">My Test Reports</h2>
            <table className="min-w-full bg-white overflow-x-auto">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Test Name</th>
                        <th className="w-1/4 px-4 py-2">Report Date</th>
                        <th className="w-1/4 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveredReports.length > 0 ? (
                        deliveredReports.map((report) => (
                            <tr key={report._id}>
                                <td className="border px-4 py-2">{report.name}</td>
                                <td className="border px-4 py-2">{new Date(report.data).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <a href={report.resultLink} target="_blank" rel="noopener noreferrer" className="btn bg-blue-400 text-white font-semibold mr-2">
                                        View
                                    </a>
                                    <button onClick={() => handlePrint(report.resultLink)} className="btn bg-green-400 text-white font-semibold mr-2">
                                        Print
                                    </button>
                                    <a href={report.resultLink} download className="btn bg-red-400 text-white font-semibold">
                                        Download
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4">No delivered reports found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TestResults;
