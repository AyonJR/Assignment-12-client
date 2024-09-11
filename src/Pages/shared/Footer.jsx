import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-12 mx-auto">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
                            Stay updated with our latest news and articles by subscribing to our newsletter.
                        </h1>
                        <div className="flex flex-col mt-6 md:flex-row">
                            <input
                                id="email"
                                type="text"
                                className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                                placeholder="Email Address"
                            />
                            <button className="w-full px-6 py-2.5 mt-3 text-sm font-medium tracking-wider text-white bg-cyanCustom rounded-lg hover:bg-gray-700 md:mt-0 md:ml-4 md:w-auto">
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold   text-gray-800 dark:text-white">Quick Links</p>
						<hr  className='border-cyanCustom border-[1px] w-[82px] mt-1'/>
                        <div className="flex flex-col mt-5 space-y-2">
                            <a href="#" className="text-gray-600 hover:text-cyanCustom dark:text-gray-300 hover:underline">
                                Home
                            </a>
                            <a href="#" className="text-gray-600 hover:text-cyanCustom dark:text-gray-300 hover:underline">
                                About Us
                            </a>
                            <a href="#" className="text-gray-600 hover:text-cyanCustom dark:text-gray-300 hover:underline">
                                Services
                            </a>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Industries</p>
						<hr  className='border-cyanCustom border-[1px] w-[72px] mt-1'/>
                        <div className="flex flex-col mt-5 space-y-2">
                            <a href="#" className="text-gray-600 hover:text-cyanCustom dark:text-gray-300 hover:underline">
                                Retail & E-Commerce
                            </a>
                            <a href="#" className="text-gray-600 hover:text-cyanCustom dark:text-gray-300 hover:underline">
                                Tech & IT Solutions
                            </a>
                            <a href="#" className="text-gray-600 hover:text-cyanCustom dark:text-gray-300 hover:underline">
                                Finance & Banking
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 md:my-8 dark:border-cyanCustom" />

                <div className="flex items-center justify-between">
                    <a href="#">
                        <img
                            className="w-auto h-7"
                            src="https://i.ibb.co.com/VqQc6xN/Blue-white-and-green-Medical-care-logo-1-removebg-preview.png"
                            alt="Company Logo"
                        />
                    </a>
                    {/* <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 hover:underline">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 hover:underline">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.8 10.9H12.5V9.5C12.5 9.1 12.7 8.8 13.3 8.8H13.8V7.1H12.4C11.1 7.1 10.5 7.9 10.5 9.3V10.9H9.5V12.8H10.5V17H12.5V12.8H13.7L14.2 10.9H12.5z"></path>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 hover:underline">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.8 3H4.2C3.5 3 3 3.5 3 4.2v15.7C3 20.5 3.5 21 4.2 21h15.7c.7 0 1.2-.5 1.2-1.2V4.2c0-.7-.5-1.2-1.2-1.2zM8.5 17.7V9.6h3.4v1.1H9.7v.9h2.2v1H9.7v4.9h-1.2zm5.5 0v-4.9h2.1v.9h-1.3v1H15.5v3h-1.5zm0-7.8h-1.5V9.6h1.5v.3zm-3.5 0H9.5V9.6h1.5v.3z"></path>
                            </svg>
                        </a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
