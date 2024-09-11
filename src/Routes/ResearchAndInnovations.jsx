import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMicroscope, FaFlask, FaDna, FaHeartbeat, FaLaptopMedical } from 'react-icons/fa';
import { FaCalendarAlt, FaCheckCircle, FaHourglassHalf, FaRocket } from 'react-icons/fa';
import {   FaAward } from 'react-icons/fa';




// Custom color definition
const cyanCustom = '#00FFFF'; // Cyan custom color

const researchProjectsData = [
    {
        id: 1,
        title: "AI-Driven Diagnostics",
        description: "Developing AI algorithms for faster and more accurate disease diagnosis.",
        image: "https://i.ibb.co/93nxPzs/e1d2e2f760064cf9953c83907ddae649.png",
        startDate: "2024-01-15",
        status: "Ongoing"
    },
    {
        id: 2,
        title: "Genetic Testing Innovations",
        description: "Enhancing genetic testing for personalized medicine.",
        image: "https://i.ibb.co/L09BChF/innovation-DNA-company-1.jpg",
        startDate: "2023-12-01",
        status: "Ongoing"
    },
    {
        id: 3,
        title: "Wearable Health Monitors",
        description: "Creating advanced wearable devices for continuous health monitoring.",
        image: "https://i.ibb.co/GCMTLkx/1711945464054.png",
        startDate: "2024-03-20",
        status: "Upcoming"
    },
];

const ResearchAndInnovations = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    return (
        <div className=" min-h-screen">
            {/* Navbar */}
            
            {/* Main Content */}
            <div className="container mx-auto px-8 py-16">
                <section className="mb-16" data-aos="fade-up">
                <div className="flex gap-5 items-center mb-6 mx-10">
            <h2 className="text-4xl font-semibold w-1/3  text-black  text-center mb-2">
              Our <span className="text-cyanCustom">Researches</span> 
            </h2>
            <h2 className="w-2/3 font-semibold border-l-4 border-cyanCustom pl-4">
            Our scientists and researchers are at the forefront of developing cutting-edge diagnostic techniques and technologies. Explore our innovative projects below.
            </h2>
          </div>
                </section>
               
                {/* Research Focus */}
                <section className="mb-16" data-aos="fade-up">
                    <h3 className="text-3xl font-semibold text-gray-800 flex  justify-center items-center mb-6">
                        <FaFlask className="mr-3 text-cyan-500" /> Research Focus
                    </h3>
                    <p className="text-gray-700 text-lg mb-6">
                        We focus on leveraging the latest advancements to improve diagnostic accuracy and efficiency. Key research areas include:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <FaMicroscope className="text-3xl text-cyan-500 mb-4" />
                            <p className="text-xl font-semibold text-gray-800">Artificial Intelligence</p>
                            <p className="text-gray-600 mt-2">Implementing AI to revolutionize diagnostics.</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <FaDna className="text-3xl text-cyan-500 mb-4" />
                            <p className="text-xl font-semibold text-gray-800">Genomics</p>
                            <p className="text-gray-600 mt-2">Exploring DNA for personalized medicine.</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <FaHeartbeat className="text-3xl text-cyan-500 mb-4" />
                            <p className="text-xl font-semibold text-gray-800">Wearable Tech</p>
                            <p className="text-gray-600 mt-2">Health monitoring through smart devices.</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <FaLaptopMedical className="text-3xl text-cyan-500 mb-4" />
                            <p className="text-xl font-semibold text-gray-800">Imaging Techniques</p>
                            <p className="text-gray-600 mt-2">Advanced imaging for early detection.</p>
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section className="mb-16" data-aos="fade-up">
                    <h3 className="text-3xl justify-center font-semibold text-gray-800 flex items-center mb-6">
                        <FaMicroscope className="mr-3 text-cyan-500" /> Ongoing & Upcoming Projects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {researchProjectsData.map((project) => (
    <div
      key={project.id}
      className="bg-gradient-to-br from-white via-gray-50 to-cyan-50 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 hover:shadow-xl relative"
    >
      {/* Project Image */}
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4 bg-cyan-600 text-white px-2 py-1 rounded-lg flex items-center shadow-lg">
          {project.status === 'Ongoing' && <FaHourglassHalf className="mr-1" />}
          {project.status === 'Upcoming' && <FaRocket className="mr-1" />}
          {project.status === 'Completed' && <FaCheckCircle className="mr-1" />}
          <span className="font-bold">{project.status}</span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Project Title */}
        <h4 className="text-2xl font-semibold text-cyan-600 mb-2 flex items-center">
          {project.title}
        </h4>

        {/* Project Description */}
        <p className="text-gray-700 mb-4">{project.description}</p>

        {/* Start Date */}
        <p className="text-gray-500 flex items-center">
          <FaCalendarAlt className="mr-2" /> Start Date: {new Date(project.startDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  ))}
</div>
                </section>

             {/* News and Updates */}
<section className="mb-16" data-aos="fade-up">
    
    <div className="bg-gradient-to-br from-cyan-50 via-white to-white shadow-xl rounded-lg p-8 border-t-4 border-cyan-500 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center mb-4">
            <FaAward className="text-4xl text-cyan-500 mr-4" />
            <h4 className="text-2xl font-semibold text-gray-800">Recent Achievements</h4>
        </div>
        <p className="text-gray-700 leading-relaxed">
            Our team developed an AI-based diagnostic tool that significantly reduces disease detection time. This breakthrough has been featured in leading scientific journals.
        </p>
    </div>
</section>

{/* Testimonials */}
<section className="mb-16" data-aos="fade-up">
    <h3 className="text-3xl font-semibold text-gray-800 justify-center flex items-center mb-6">
        <FaFlask className="mr-3 text-cyan-500" /> Testimonials
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-white via-gray-100 to-cyan-50 shadow-lg rounded-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <p className="text-gray-600 italic">
                "Our research into AI-driven diagnostics has the potential to revolutionize the way we detect and treat diseases. I'm excited to be part of this transformative journey."
            </p>
            <p className="text-gray-800 font-bold mt-6 text-right">- Dr. Irfan Ahmed</p>
        </div>
        <div className="bg-gradient-to-br from-white via-gray-100 to-cyan-50 shadow-lg rounded-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <p className="text-gray-600 italic">
                "Working on genetic testing innovations is incredibly rewarding. We are making strides towards personalized medicine that can save countless lives."
            </p>
            <p className="text-gray-800 font-bold mt-6 text-right">- Dr. Siddiqur Rahman</p>
        </div>
    </div>
</section>
            </div>

            {/* Footer */}
        </div>
    );
};

export default ResearchAndInnovations;
