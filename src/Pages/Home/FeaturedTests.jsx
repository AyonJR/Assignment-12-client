import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../CustomHooks/useAxiosPublic';

const FeaturedTests = () => {
    const axiosPublic = useAxiosPublic();
    

    const { data: allBookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['allBookings'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allBookings`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    const testCounts = allBookings.reduce((acc, booking) => {
        const testName = booking.name;
        if (testName) {
            if (!acc[testName]) {
                acc[testName] = { count: 0, booking };
            }
            acc[testName].count += 1;
        }
        return acc;
    }, {});
    console.log(testCounts);

    const sortedTests = Object.values(testCounts).sort((a, b) => b.count - a.count);

    const featuredTests = sortedTests.slice(0, 5);
    console.log(featuredTests);

    return (
        <div className="container mx-auto p-8">
            <h3 className="text-2xl font-bold mb-4">Featured Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTests.map(({ booking, count }) => (
                    <div key={booking._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img 
                            src={booking.image} 
                            alt={booking.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold">{booking.name}</h4>
                            <p className="text-gray-600">Bookings: {count}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedTests;
