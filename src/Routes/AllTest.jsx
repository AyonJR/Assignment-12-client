import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SingleTestCard from "./SingleTestCard";
import Navbar from "../Pages/shared/Navbar";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Footer from "../Pages/shared/Footer";

const AllTest = () => {
    const [filteredTests, setFilteredTests] = useState([]);
    const [searchDate, setSearchDate] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const axiosSecure = useAxiosSecure();

    const { data: allTests = [], isLoading, isError, error } = useQuery({
        queryKey: ['allTests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allTest`);
            return res.data;
        }
    });

    useEffect(() => {
        if (searchDate) {
            console.log("Filtering tests by date:", searchDate);
            const filtered = allTests.filter(test => {
                if (!test.date) {
                    return false; // Skip tests without a valid date
                }
                const testDate = new Date(test.date);
                if (isNaN(testDate.getTime())) {
                    return false; // Skip invalid dates
                }
                return testDate.toDateString() === searchDate.toDateString();
            });
            console.log("Filtered tests:", filtered);
            setFilteredTests(filtered);
        } else {
            setFilteredTests(allTests);
        }
    }, [searchDate, allTests]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const totalPages = Math.ceil(filteredTests.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTests = filteredTests.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(0); // Reset to the first page
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-4xl font-semibold text-blue-600 text-center mb-8 animate__animated animate__fadeInDown">
                    All Tests
                </h2>
                <div className="flex justify-center mb-6">
                    <DatePicker
                        selected={searchDate}
                        onChange={date => setSearchDate(date)}
                        className="border border-gray-300 rounded-md p-2"
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                    />
                </div>
                <div className="grid mt-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentTests.map((test) => (
                        <SingleTestCard key={test._id} test={test} />
                    ))}
                </div>
                <div className="text-center my-10">
                    <p>Page: {currentPage + 1} / {totalPages}</p>
                    <div className="flex justify-center items-center space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index)}
                                className={`btn ${index === currentPage ? 'btn-primary' : 'btn-outline'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4">
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="border border-gray-300 rounded-md p-2">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="mt-40">
                <Footer />
            </div>
        </div>
    );
};

export default AllTest;
