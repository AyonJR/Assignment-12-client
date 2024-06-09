import { useForm } from "react-hook-form";
import { DateRange } from 'react-date-range';
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddTest = () => {
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure()

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(), // Set the initial endDate to avoid null issues
            key: 'selection'
        }
    ]);

    const handleDates = (item) => {
        console.log(item);
        setState([item.selection]); // Ensure the correct structure is maintained
    };

    const onSubmit = async (data) => {
        // Add the selected date range to the form data
        data.startDate = state[0].startDate;
        data.endDate = state[0].endDate;
        console.log(data);

     const allTests = {
        name : data.name ,
        image : data.image ,
        price : data.price ,
        slots : parseInt(data.slots) ,
        details : data.details ,
        startDate : data.startDate ,
        endDate : data.endDate
     }
    
     const testRes = await axiosSecure.post('/allTest' , allTests);
     console.log(testRes.data)
     if(testRes.data.insertedId){
        // show success toast here
        toast.success("Test added successfully!");

     }


    };

    return (
        <div className="container mx-auto p-6">
                        <ToastContainer />

            <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-8 animate__animated animate__fadeInDown">
                Add New Test
            </h2>
            <form className="max-w-xl mx-auto bg-white p-8 rounded-md shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Test Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Test name"
                        {...register("name")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        placeholder="Price"
                        {...register("price")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="image"
                        placeholder="Image URL"
                        {...register("image")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
                        Test Details
                    </label>
                    <textarea
                        id="details"
                        placeholder="Test details"
                        {...register("details")}
                        className="border border-gray-300 rounded-md p-2 w-full h-24"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Date
                    </label>
                    <div className="border border-gray-300 rounded-md p-2">
                        <DateRange
                            rangeColors={['#42A5F5']}
                            editableDateInputs={true}
                            onChange={handleDates}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slots">
                        Slots 
                    </label>
                    <input
                        type="text"
                        id="slots"
                        placeholder="Slots "
                        {...register("slots")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 font-semibold text-white rounded-md px-4 py-2">

                        Add Test
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTest;
