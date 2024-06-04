import useAllTest from "../../../CustomHooks/useAllTest";
import { Link } from "react-router-dom";

const AllTests = () => {
    const [allTest, isLoading, isError, error] = useAllTest();
    console.log(allTest)

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <table className="min-w-full bg-white overflow-x-auto">
                <thead>
                    <tr>
                        <th className="w-1/3 px-4 py-2">Title</th>
                        <th className="w-1/3 px-4 py-2">Description</th>
                        <th className="w-1/6 px-4 py-2">StartDate</th>
                        <th className="w-1/6 px-4 py-2">EndDate</th>

                        <th className="w-1/6 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allTest.map((test) => (
                        <tr key={test._id}>
                            <td className="border px-4 py-2">{test.name}</td>
                            <td className="border px-4 py-2">{test.details}</td>
                            <td className="border px-4 py-2">{test.startDate}</td>
                            <td className="border px-4 py-2">{test.endDate}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllTests;
