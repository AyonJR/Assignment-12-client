import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles
import { FaHeartbeat, FaHandHoldingMedical, FaUserMd } from 'react-icons/fa';  // Import icons
import Navbar from '../Pages/shared/Navbar';
import Footer from '../Pages/shared/Footer';
import { Link } from 'react-router-dom';

const HealthPackages = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
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
    ];

    return (
        <div className="">
            <div className="container mx-auto p-8">
                {/* Header Section */}
                <section className="mb-16 text-center" data-aos="fade-up">
                <div className="flex gap-5 items-center mb-6 mx-10">
     <h2 className="text-4xl font-semibold w-1/3  text-black  text-center mb-2">
        Our <span className="text-cyanCustom">Packages</span>
      </h2>
      <h2 className="w-2/3 font-semibold border-l-4 border-cyanCustom pl-4">
      Maintaining a healthy lifestyle includes regular check-ups for early detection of health issues, a balanced diet to support overall wellness, proper sleep for mental and physical recovery, staying hydrated for optimal body function, and regular exercise to boost both physical and mental health.
      </h2>
     </div>
                </section>

                {/* Health Packages */}
                <section className="mb-16">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {packages.map(pkg => (
                            <div
                                key={pkg.id}
                                className="bg-white  overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
                                data-aos="fade-up"
                            >
                                <img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                        {pkg.name} <FaHeartbeat className="text-red-500" />
                                    </h4>
                                    <p className="text-gray-600 mt-2">{pkg.details}</p>
                                    <p className="text-cyanCustom font-bold text-lg mt-4">{pkg.price}</p>
                                    <button className="mt-4 bg-cyanCustom  text-white py-2 px-4 rounded-full font-semibold shadow-lg transition-all duration-300">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="mb-16" data-aos="fade-up">
                    <h3 className="text-3xl font-semibold mb-6 text-center">What Our Clients Say</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <p className="text-gray-600 mb-4">"The comprehensive health check-up was thorough, and the staff was very professional. Highly recommend!"</p>
                            <p className="text-gray-800 font-bold">- Shirin Akter</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <p className="text-gray-600 mb-4">"Excellent service and detailed health reports. Helped me understand my health better."</p>
                            <p className="text-gray-800 font-bold">- Abdul Latif</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <p className="text-gray-600 mb-4">"Professional and reliable service. The premium check-up package was worth every penny."</p>
                            <p className="text-gray-800 font-bold">- Hossain Rahman</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-16" data-aos="fade-up">
                    <h3 className="text-3xl font-semibold mb-6 text-center">Frequently Asked Questions</h3>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="mb-6">
                            <h4 className="text-xl font-semibold">What is included in the Basic Health Check-up?</h4>
                            <p className="text-gray-600">The Basic Health Check-up includes blood tests, urine tests, and a physical examination by a general physician.</p>
                        </div>
                        <div className="mb-6">
                            <h4 className="text-xl font-semibold">How do I book a health package?</h4>
                            <p className="text-gray-600">You can book a health package online through our website or by calling our customer service team.</p>
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <section className="text-center mb-16" data-aos="fade-up">
                    <h3 className="text-3xl font-semibold mb-6">Ready to Take Charge of Your Health?</h3>
                    <Link to={'/allTest'}>
                    <button className="bg-cyanCustom text-white text-xl px-8 py-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110">
                        Book Now <FaHandHoldingMedical className="inline-block ml-2" />
                    </button>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default HealthPackages;
