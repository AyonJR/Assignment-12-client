// TestDetails.js
import { useParams } from 'react-router-dom';
import { useAllTest } from "../CustomHooks/useAllTest";

const TestDetails = () => {
    const { id } = useParams();
    const [allTest, isLoading, isError, error] = useAllTest();
    const test = allTest.find(test => test._id === id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!test) {
        return <div>Test not found</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="border rounded-md p-4 shadow-md">
                <img src={test.image} alt={test.title} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-xl font-semibold mt-4">{test.title}</h3>
                <p className="mt-2">{test.description}</p>
                <p className="mt-2 text-gray-600">Date: {test.date}</p>
                <p className="mt-2 text-gray-600">Slots: {test.slots.join(", ")}</p>
            </div>
        </div>
    );
};

export default TestDetails;
