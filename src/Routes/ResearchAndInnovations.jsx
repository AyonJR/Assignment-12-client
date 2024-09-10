// src/pages/ResearchAndInnovations.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Pages/shared/Navbar';
import Footer from '../Pages/shared/Footer';

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
    // Add more items as needed
];

const ResearchAndInnovations = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    return (
        <div>
            
            <div className="container mx-auto p-8">
            <section className="mb-16" data-aos="fade-up">
                <div className='flex justify-center'>
                <h2 className="text-4xl font-bold text-blue-600 mb-6">Research and Innovations</h2>
                </div>
                <p className="text-gray-700 text-lg">
                    Discover the cutting-edge research and innovations at our diagnostic center. Our dedicated team of scientists and researchers are working tirelessly to develop advanced diagnostic techniques and technologies.
                </p>
            </section>

            <section className="mb-16" data-aos="fade-up">
                <h3 className="text-2xl font-semibold mb-4">Research Focus</h3>
                <p className="text-gray-700 text-lg mb-4">
                    Our research is focused on leveraging the latest advancements in technology to improve diagnostic accuracy and efficiency. We are exploring various areas including:
                </p>
                <ul className="list-disc list-inside text-gray-700 text-lg mb-8">
                    <li>Artificial Intelligence and Machine Learning</li>
                    <li>Genomics and Personalized Medicine</li>
                    <li>Wearable Health Technologies</li>
                    <li>Advanced Imaging Techniques</li>
                </ul>
            </section>

            <section className="mb-16" data-aos="fade-up">
                <h3 className="text-2xl font-semibold mb-4">Ongoing and Upcoming Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {researchProjectsData.map(project => (
                        <div key={project.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="text-xl font-semibold">{project.title}</h4>
                                <p className="text-gray-600">{project.description}</p>
                                <p className="text-gray-600">Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                                <p className="text-gray-600">Status: {project.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-16" data-aos="fade-up">
                <h3 className="text-2xl font-semibold mb-4">News and Updates</h3>
                <p className="text-gray-700 text-lg mb-8">
                    Stay informed about the latest developments in our research projects and innovations. We regularly publish updates on our progress and key milestones.
                </p>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-2">Recent Achievements</h4>
                    <p className="text-gray-600">
                        Our team recently developed a new AI-based diagnostic tool that significantly reduces the time required for disease detection. This breakthrough was featured in several leading scientific journals.
                    </p>
                </div>
            </section>

            <section className="mb-16" data-aos="fade-up">
                <h3 className="text-2xl font-semibold mb-4">Testimonials from Researchers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="text-gray-600 italic">
                            "Our research into AI-driven diagnostics has the potential to revolutionize the way we detect and treat diseases. I'm excited to be part of this transformative journey."
                        </p>
                        <p className="text-gray-600 font-bold mt-4">- Dr. Irfan Ahmed</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="text-gray-600 italic">
                            "Working on genetic testing innovations is incredibly rewarding. We are making strides towards personalized medicine that can save countless lives."
                        </p>
                        <p className="text-gray-600 font-bold mt-4">- Dr. Siddiqur Rahman</p>
                    </div>
                </div>
            </section>
        </div>
        
        </div>
    );
};

export default ResearchAndInnovations;
