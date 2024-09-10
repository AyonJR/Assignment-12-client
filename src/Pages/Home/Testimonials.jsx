import React from 'react';

const Testimonials = () => {
    return (
        <section
            className="relative h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url('https://i.ibb.co/0YVTbBN/young-handsome-physician-medical-robe-with-stethoscope.jpg')` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyanCustom to-transparent opacity-90"></div>
            <div className="relative z-10 max-w-6xl px-6 py-10 mx-auto">
                <p className="text-xl font-medium text-blue-500"></p>

                <h1 className="mt-2 text-2xl font-semibold text-white capitalize lg:text-3xl">
                    Why <span className='text-black'>Choose</span> Us
                </h1>

                <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
                    <div className="w-full p-6 bg-cyanCustom md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                        <div className="mt-2 md:mx-6">
                            <div>
                                <p className="text-xl font-semibold tracking-tight text-white">Abdul Baset</p>
                                
                            </div>

                            <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
    “At our company, we are dedicated to delivering top-tier solutions tailored to your needs. Our team of experts leverages the latest technology to ensure that every project is executed with precision and care. We believe in building lasting relationships with our clients by offering unparalleled support and services.”
</p>

                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default Testimonials;
