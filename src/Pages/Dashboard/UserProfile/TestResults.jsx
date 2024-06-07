import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const UserReports = ({ userId }) => {
    const axiosSecure = useAxiosSecure();

    const { data: reports = [], isLoading, isError, error } = useQuery({
        queryKey: ['userReports', userId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userReports/${userId}`);
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
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <tr key={report._id}>
                                <td className="border px-4 py-2">{report.name}</td>
                                <td className="border px-4 py-2">{new Date(report.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <a href={report.resultLink} target="_blank" rel="noopener noreferrer" className="btn bg-blue-400 text-white font-semibold mr-2">
                                        View
                                    </a>
                                    <button onClick={() => window.open(report.resultLink, '_blank').print()} className="btn bg-green-400 text-white font-semibold mr-2">
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

export default UserReports;
