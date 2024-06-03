import { useForm } from "react-hook-form";

const AddTest = () => {

    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)

    return (
        <div className="container mx-auto p-6">
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
                <input
                    type="date"
                    id="date"
                    {...register("date")}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slots">
                    Slots (comma separated)
                </label>
                <input
                    type="text"
                    id="slots"
                    placeholder="Slots (comma separated)"
                    {...register("slots")}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
                    Add Test
                </button>
            </div>
        </form>
    </div>
    );
};

export default AddTest;