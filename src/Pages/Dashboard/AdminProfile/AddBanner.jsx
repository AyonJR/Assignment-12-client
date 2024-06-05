import { useState } from 'react';
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';

const AddBanner = () => {
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        title: '',
        description: '',
        couponCodeName: '',
        couponRate: '',
        isActive: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.post('/addBanner', formData);
            console.log(response)
            if (response.data.insertedId) {
                toast.success("Banner added successfully!");
                
            }
        } catch (error) {
            console.error('Error adding banner:', error);
            toast.error('Failed to add banner. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <ToastContainer></ToastContainer>
            <h2 className="text-2xl font-bold mb-4">Add New Banner</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Coupon Code Name</label>
                    <input
                        type="text"
                        name="couponCodeName"
                        value={formData.couponCodeName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Coupon Rate</label>
                    <input
                        type="number"
                        name="couponRate"
                        value={formData.couponRate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Active</label>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="mr-2 leading-tight"
                    />
                    <span className="text-sm">Is Active</span>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add Banner</button>
            </form>
        </div>
    );
};

export default AddBanner;
