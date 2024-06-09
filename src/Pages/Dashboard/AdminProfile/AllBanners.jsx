import { useState, useEffect } from 'react';
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';

const AllBanners = () => {
    const axiosSecure = useAxiosSecure();
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axiosSecure.get('/allBanners');
                setBanners(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, [axiosSecure]);

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/deleteBanner/${id}`);
            setBanners(banners.filter(banner => banner._id !== id));
            toast.success('Banner deleted successfully');
        } catch (err) {
            toast.error('Failed to delete banner. Please try again.');
        }
    };

    const handleSetActive = async (id) => {
        try {
            await axiosSecure.patch(`/updateBannerStatus/${id}`);
            setBanners(banners.map(banner => ({
                ...banner,
                isActive: banner._id === id
            })));
            toast.success('Banner set as active successfully');
        } catch (err) {
            toast.error('Failed to set banner as active. Please try again.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    return (
        <div >
            <ToastContainer></ToastContainer>
            <h2 className="text-2xl p-8 font-bold mb-4">All Banners</h2>
            <div className='p-8'>
            <table className="min-w-full bg-white overflow-x-scroll">
                <thead>
                    <tr>
                        <th className="w-1/6 px-4 py-2">Name</th>
                        <th className="w-1/6 px-4 py-2">Image</th>
                        <th className="w-1/6 px-4 py-2">Title</th>
                        <th className="w-1/3 px-4 py-2">Description</th>
                        <th className="w-1/12 px-4 py-2">Active</th>
                        <th className="w-1/6 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {banners.map((banner) => (
                        <tr key={banner._id}>
                            <td className="border px-4 py-2">{banner.name}</td>
                            <td className="border px-4 py-2">
                                <img src={banner.image} alt={banner.name} className="w-20 h-20 object-cover"/>
                            </td>
                            <td className="border px-4 py-2">{banner.title}</td>
                            <td className="border px-4 py-2">{banner.description}</td>
                            <td className="border px-4 py-2">{banner.isActive ? 'Yes' : 'No'}</td>
                            <td className="border flex px-4 py-2">
                                <button
                                    onClick={() => handleSetActive(banner._id)}
                                    className="px-4 py-2 bg-blue-400 text-white font-bold rounded-lg mr-2"
                                    disabled={banner.isActive}
                                >
                                     Active
                                </button>
                                <button
                                    onClick={() => handleDelete(banner._id)}
                                    className="px-4 font-bold py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default AllBanners;
