import useAllTest from "../CustomHooks/useAllTest";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SingleTestCard from "./SingleTestCard";

const AllTest = () => {
    const [tests, setTests] = useState([]);
    const [searchDate, setSearchDate] = useState(new Date());
    const [allTest, isLoading, isError, error] = useAllTest();

    useEffect(() => {
        if (allTest.length > 0) {
            const filteredTests = allTest.filter(test => new Date(test.date) >= new Date());
            setTests(filteredTests);
        }
    }, [allTest]);

    const handleDateChange = (date) => {
        setSearchDate(date);
        const filteredTests = allTest.filter(test => new Date(test.date).toDateString() === date.toDateString());
        setTests(filteredTests);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-8 animate__animated animate__fadeInDown">
                All Tests
            </h2>
            <div className="flex justify-center mb-6">
                <DatePicker
                    selected={searchDate}
                    onChange={handleDateChange}
                    className="border border-gray-300 rounded-md p-2"
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            <div className="grid mt-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map(test => <SingleTestCard key={test._id} test={test}></SingleTestCard>


                )}
            </div>
        </div>
    );
};

export default AllTest;
