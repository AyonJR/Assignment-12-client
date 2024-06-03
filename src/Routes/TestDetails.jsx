// TestDetails.js

import { useParams } from 'react-router-dom';
import useAxiosSecure from '../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const TestDetails = () => {
    
    const {id} = useParams()

    const axiosSecure = useAxiosSecure();

    const { data: singleTest = {},   } = useQuery({
        queryKey: ['allTest' , id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allTest/${id}`);
            return res.data;
        }
    });

    console.log(singleTest)

    return (
        <div className="container mx-auto p-8">
        <div className="max-w-2xl mx-auto bg-white border rounded-lg shadow-lg overflow-hidden">
            <img src={singleTest.image} alt={singleTest.title} className="w-full h-60 object-cover" />
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{singleTest.title}</h3>
                <p className="text-gray-700 mb-4">{singleTest.description}</p>
                <div className="flex items-center mb-4">
                    <span className="text-gray-600 font-semibold mr-2">Date:</span>
                    <span className="text-gray-600">{singleTest.date}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-600 font-semibold mr-2">Slots:</span>
                    <span className="text-gray-600">{singleTest.slots.join(", ")}</span>
                </div>
            </div>
        </div>
    </div>
    );
};

export default TestDetails;
