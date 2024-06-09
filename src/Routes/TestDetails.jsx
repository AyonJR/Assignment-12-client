import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { AuthContext } from '../Pages/Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Pages/shared/Navbar';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const TestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: singleTest = {}, isLoading, isError, error } = useQuery({
        queryKey: ['allTest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allTest/${id}`);
            return res.data;
        }
    });

    const openModal = () => {
        if (user && user.email) {
            setIsModalOpen(true);
        } else {
            toast.error('You must be logged in to reserve a slot');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><div className='loading loading-spinner text-info'></div></div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    if (!singleTest) {
        return <div className="flex justify-center items-center h-screen">Test not found</div>;
    }
    console.log(singleTest)
    const testInfo = {
        image: singleTest.image,
        title: singleTest.title,
        name: singleTest.name,
        details: singleTest.details,
        startDate: singleTest.startDate,
        endDate: singleTest.endDate,
        price: singleTest.price,
        slots: singleTest.slots
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
    };
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="container mx-auto p-8">
                <ToastContainer />
                <div className="max-w-4xl mx-auto bg-white border rounded-lg shadow-lg overflow-hidden">
                    <img src={singleTest.image} alt={singleTest.title} className="w-full h-60 object-cover" />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{singleTest.name}</h3>
                        <p className="text-gray-700 mb-4">{singleTest.details}</p>
                        <div className="flex items-center mb-4">
                            <span className="text-gray-600 font-semibold mr-2">Date:</span>
                            <span className="text-gray-600">
                                {formatDate(singleTest.startDate)} ----- {formatDate(singleTest.endDate)}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 font-semibold mr-2">Slots:</span>
                            <span className="text-gray-600">
                                {singleTest.slots}
                            </span>
                        </div>
                        <div>
                            price : ${singleTest.price}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={openModal} className="btn bg-blue-400 text-white mb-5">Reserve</button>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white lg:w-[600px] p-6 rounded-lg shadow-lg">
                            <div className='mb-5'>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm testInfo={testInfo} />
                                </Elements>
                            </div>
                            <h2 className="text-2xl font-bold mb-4">{singleTest.name}</h2>
                            <button onClick={closeModal} className="btn bg-blue-400 text-white">Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestDetails;
