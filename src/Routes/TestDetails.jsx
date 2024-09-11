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
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaDollarSign, FaClock, FaRegHandPaper } from 'react-icons/fa';
import Footer from '../Pages/shared/Footer';

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // "MM/DD/YYYY"
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" min-h-screen"
        >
            <div className="container custom-font  mx-auto p-8 md:p-12 lg:p-16">
                <ToastContainer />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                    <div className="relative">
                        <img src={singleTest.image} alt={singleTest.name} className="w-full h-72 object-cover" />
                        <div className="absolute top-4 left-4 bg-cyanCustom text-white px-4 py-2 rounded-lg shadow-lg">
                            New
                        </div>
                    </div>
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{singleTest.name}</h1>
                        <p className="text-lg text-gray-600 mb-6">{singleTest.details}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <div className="flex items-center text-gray-700">
                                <FaCalendarAlt className="text-2xl mr-3 text-cyanCustom" />
                                <span className="text-lg">
                                    {formatDate(singleTest.startDate)} - {formatDate(singleTest.endDate)}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <FaClock className="text-2xl mr-3 text-cyanCustom" />
                                <span className="text-lg">
                                    {singleTest.slots} Slots Available
                                </span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <FaDollarSign className="text-2xl mr-3 text-cyanCustom" />
                                <span className="text-lg font-semibold">
                                    ${singleTest.price}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button onClick={openModal} className="btn bg-cyanCustom text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-cyan-600 transition-colors duration-300">
                                <FaRegHandPaper className="mr-2 text-xl" />
                                Reserve Now
                            </button>
                        </div>
                    </div>
                </motion.div>

                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg relative"
                        >
                            <h2 className="text-2xl font-bold mb-6">{singleTest.name}</h2>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm testInfo={singleTest} />
                            </Elements>
                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                                &times;
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default TestDetails;
