// src/pages/UpcomingTests.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Pages/shared/Navbar';
import Footer from '../Pages/shared/Footer';

const upcomingTestsData = [
    {
        id: 1,
        name: "Advanced MRI Scanner",
        description: "An advanced MRI scanner with higher resolution and faster scanning times.",
        image: "https://i.ibb.co/XFPyqDC/DJB-118.jpg",
        availabilityDate: "2024-07-15"
    },
    {
        id: 2,
        name: "3D Mammography",
        description: "A new 3D mammography machine for more accurate breast cancer detection.",
        image: "https://i.ibb.co/KqzkDgq/3-D-Mammography-161013-CC2175-1200x800.jpg",
        availabilityDate: "2024-08-01"
    },
    {
        id: 3,
        name: "AI-Powered Ultrasound",
        description: "An AI-powered ultrasound machine that provides instant and accurate diagnoses.",
        image: "https://i.ibb.co/dDQSVzS/Unknown-440x264.png",
        availabilityDate: "2024-09-10"
    },
    // Add more items as needed
];

const UpcomingTests = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="container mx-auto p-8">
            <section className="mb-16" data-aos="fade-up">
                <div className='flex justify-center'>
                <h2 className="text-4xl font-bold text-blue-600 mb-6">Upcoming Tests</h2>
                </div>
                <p className="text-gray-700 text-lg">
                    Discover the latest technologies and advancements coming to our diagnostic center. Stay tuned for these exciting updates!
                </p>
            </section>

            <section className="mb-16">
                <h3 className="text-2xl font-semibold mb-4" data-aos="fade-up">Upcoming Technologies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingTestsData.map(test => (
                        <div key={test.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 duration-300" data-aos="fade-up">
                            <img 
                                src={test.image} 
                                alt={test.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="text-xl font-semibold">{test.name}</h4>
                                <p className="text-gray-600">{test.description}</p>
                                <p className="text-blue-500 font-bold mt-2">Availability Date: {new Date(test.availabilityDate).toLocaleDateString()}</p>
                                <button className="mt-4 btn bg-blue-500 text-white">Learn More</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="text-center mb-16" data-aos="fade-up">
                <h3 className="text-2xl font-semibold mb-4">Interested in our upcoming technologies?</h3>
                <button className="btn bg-green-500 text-white text-xl px-8 py-4">Contact Us</button>
            </section>
        </div>
        <div className="mt-40">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default UpcomingTests;
