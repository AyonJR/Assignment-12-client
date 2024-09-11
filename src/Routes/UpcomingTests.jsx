// src/pages/UpcomingTests.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMicroscope, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import Navbar from '../Pages/shared/Navbar';
import Footer from '../Pages/shared/Footer';

const upcomingTestsData = [
  {
    id: 1,
    name: "Advanced MRI Scanner",
    description:
      "An advanced MRI scanner with higher resolution and faster scanning times.",
    image: "https://i.ibb.co/XFPyqDC/DJB-118.jpg",
    availabilityDate: "2024-07-15",
  },
  {
    id: 2,
    name: "3D Mammography",
    description:
      "A new 3D mammography machine for more accurate breast cancer detection.",
    image:
      "https://i.ibb.co/KqzkDgq/3-D-Mammography-161013-CC2175-1200x800.jpg",
    availabilityDate: "2024-08-01",
  },
  {
    id: 3,
    name: "AI-Powered Ultrasound",
    description:
      "An AI-powered ultrasound machine that provides instant and accurate diagnoses.",
    image: "https://i.ibb.co/dDQSVzS/Unknown-440x264.png",
    availabilityDate: "2024-09-10",
  },
  // Add more items as needed
];

const UpcomingTests = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      delay: 200,
    });
  }, []);

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto py-16">
        {/* Header Section */}
        <section className="text-center mb-16" data-aos="fade-up">
        <div className="flex gap-5 items-center mb-6 mx-10">
            <h2 className="text-4xl font-semibold w-1/3  text-black  text-center mb-2">
              Our <span className="text-cyanCustom">Upcoming</span> Tests 
            </h2>
            <h2 className="w-2/3 font-semibold border-l-4 border-cyanCustom pl-4">
            Discover the latest technologies and advancements coming to our diagnostic center. Stay tuned for these exciting updates!
            </h2>
          </div>
        </section>

        {/* Upcoming Technologies */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingTestsData.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
              >
                <div className="relative">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-cyanCustom p-3 rounded-full shadow-lg">
                    <FaMicroscope className="text-white text-xl" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {test.name}
                  </h4>
                  <p className="text-gray-600 mb-4">{test.description}</p>
                  <div className="flex items-center text-cyanCustom font-semibold mb-4">
                    <FaCalendarAlt className="mr-2" />
                    <p>
                      Availability Date:{' '}
                      {new Date(test.availabilityDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 mt-4 bg-cyanCustom text-white py-2 px-4 rounded-full font-semibold shadow-lg transition-transform duration-300 transform hover:scale-110">
                    Learn More <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16" data-aos="fade-up">
          <h3 className="text-3xl font-semibold mb-6">
            Interested in our upcoming technologies?
          </h3>
          <button className="bg-cyanCustom text-white text-xl px-8 py-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110">
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
};

export default UpcomingTests;
