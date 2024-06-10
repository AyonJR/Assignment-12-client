// src/pages/HealthPackages.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles
import Navbar from '../Pages/shared/Navbar';

const HealthPackages = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    const packages = [
        {
            id: 1,
            name: 'Basic Health Check-up',
            details: 'Includes blood tests, urine tests, and physical examination.',
            price: '$99',
            image: 'https://i.ibb.co/bL18ZWL/1627478658niramaya-basichealthcheckup.jpg'
        },
        {
            id: 2,
            name: 'Comprehensive Health Check-up',
            details: 'Includes all basic tests plus advanced imaging and specialist consultation.',
            price: '$199',
            image: 'https://i.ibb.co/6PydsFb/1524807102841.jpg'
        },
        {
            id: 3,
            name: 'Premium Health Check-up',
            details: 'Includes comprehensive tests plus personalized health plan and diet consultation.',
            price: '$299',
            image: 'https://i.ibb.co/VjdYVLm/Hlv-KYzugu-I6z-HH0-UGd4k.jpg'
        },
        // Add more packages as needed
    ];

    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="container mx-auto p-8">
            <section className="mb-16" data-aos="fade-up">
                <div className='flex justify-center'>
                <h2 className="text-4xl font-bold text-blue-600 mb-6">Health Packages</h2>
                </div>
                <p className="text-gray-700 text-lg">
                    Explore our range of health packages tailored to meet your specific needs. Whether you're looking for a basic check-up or a comprehensive health plan, we have something for everyone.
                </p>
            </section>

            <section className="mb-16">
                <h3 className="text-2xl font-semibold mb-4" data-aos="fade-up">Our Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map(pkg => (
                        <div key={pkg.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 duration-300" data-aos="fade-up">
                            <img 
                                src={pkg.image} 
                                alt={pkg.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="text-xl font-semibold">{pkg.name}</h4>
                                <p className="text-gray-600">{pkg.details}</p>
                                <p className="text-blue-500 font-bold mt-2">{pkg.price}</p>
                                <button className="mt-4 btn bg-blue-500 text-white">Learn More</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-16" data-aos="fade-up">
                <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example Testimonials */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600">"The comprehensive health check-up was thorough and the staff were very professional. Highly recommend!"</p>
                        <p className="text-gray-800 font-bold mt-2">- Shirin Akter</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600">"Excellent service and detailed health reports. Helped me understand my health better."</p>
                        <p className="text-gray-800 font-bold mt-2">- Abdul Latif</p>
                    </div>
                </div>
            </section>

            <section className="mb-16" data-aos="fade-up">
                <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold">What is included in the Basic Health Check-up?</h4>
                        <p className="text-gray-600">The Basic Health Check-up includes blood tests, urine tests, and a physical examination by a general physician.</p>
                    </div>
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold">How do I book a health package?</h4>
                        <p className="text-gray-600">You can book a health package online through our website or by calling our customer service.</p>
                    </div>
                </div>
            </section>

            <section className="text-center mb-16" data-aos="fade-up">
                <h3 className="text-2xl font-semibold mb-4">Ready to book your Health Package?</h3>
                <button className="btn bg-green-500 text-white text-xl px-8 py-4">Book Now</button>
            </section>
        </div>
        </div>
    );
};

export default HealthPackages;
