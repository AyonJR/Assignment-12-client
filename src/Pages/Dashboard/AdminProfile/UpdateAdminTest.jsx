import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { DateRange } from "react-date-range";

const UpdateAdminTest = () => {  

   const  { _id, name , image , price , slots , details , startDate , endDate} = useLoaderData()

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
        slots : data.slots ,
        details : data.details ,
        startDate : data.startDate ,
        endDate : data.endDate
     }
    
     const testRes = await axiosSecure.patch(`/updateAdminTest/${_id}` , allTests);
     console.log(testRes.data)
     if(testRes.data.modifiedCount > 0){
        // show success toast here
        toast.success("Test Updated successfully!");

     }


    };
    
    return (
        <div>
            <div className="container mx-auto p-6">
            <ToastContainer></ToastContainer>
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
                        defaultValue={name}
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
                        defaultValue={price}

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
                        defaultValue={image}

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
                        defaultValue={details}

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
                        defaultValue={slots}
                        placeholder="Slots "
                        {...register("slots")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 font-semibold text-white rounded-md px-4 py-2">

                        Update Test
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default UpdateAdminTest;