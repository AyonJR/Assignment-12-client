import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaStar } from "react-icons/fa";
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
    return <div className="flex justify-center items-center h-screen text-blue-500 text-xl">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-xl">Error: {error.message}</div>;
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

  const sortedTests = Object.values(testCounts).sort((a, b) => b.count - a.count);
  const featuredTests = sortedTests.slice(0, 5);

  return (
    <div className="container mx-auto p-8">
     <div className="flex gap-5 items-center mb-6 mx-10">
        <h2 className="w-2/3 font-semibold border-r-4 border-cyanCustom pr-4">
        Discover our top-rated tests, each chosen for their high demand and positive feedback. Our featured tests represent the most booked and sought-after services, reflecting their quality and effectiveness. Dive into these popular options to find the best fit for your needs and experience why they stand out among our offerings.
        </h2>
        <h2 className="text-4xl font-semibold w-1/3  text-black  text-center mb-2">
          Our <span className="text-cyanCustom">Featured Tests</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {featuredTests.map(({ booking, count }) => (
          <div
            key={booking._id}
            className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
            style={{ height: '400px' }}
          >
            {/* Background image with overlay and smooth zoom effect */}
            <div
              className="absolute  inset-0 bg-cover bg-center transition-transform duration-700 transform group-hover:scale-110"
              style={{ backgroundImage: `url(${booking.image})`, filter: 'brightness(70%)' }}
            />

            {/* Gradient and text overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

            {/* Main content */}
            <div className="absolute bottom-0 p-6 text-white transition-opacity duration-500 opacity-90 group-hover:opacity-100">
              <h4 className="text-3xl font-bold mb-2">{booking.name}</h4>
              <p className="text-sm text-gray-300 mb-4">{booking.description || 'No description available.'}</p>
              <div className="flex items-center space-x-4">
                <FaUsers className="text-cyanCustom text-lg" />
                <span className="text-lg font-semibold">Bookings: {count}</span>
              </div>
            </div>

            {/* Star icon with rotation effect */}
            <div className="absolute top-4 right-4 p-2 bg-black bg-opacity-70 text-white rounded-full shadow-lg transform transition-transform duration-500 group-hover:rotate-12">
              <FaStar className="text-2xl text-cyanCustom" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTests;
