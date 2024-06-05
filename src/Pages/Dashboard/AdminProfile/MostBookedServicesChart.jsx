import { useQuery } from "@tanstack/react-query";
import { Bar } from 'react-chartjs-2';
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MostBookedServicesChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allBookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['allBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allBookings`);
            return res.data;
        }
    });

    // Debugging: Print allBookings
    console.log('All Bookings:', allBookings);

    // Process data to count bookings for each service
    const serviceBookingCounts = allBookings.reduce((acc, booking) => {
        const serviceName = booking.name; // Use 'name' property for the service name
        if (serviceName) {
            if (acc[serviceName]) {
                acc[serviceName]++;
            } else {
                acc[serviceName] = 1;
            }
        } else {
            console.warn('Booking without service name:', booking);
        }
        return acc;
    }, {});

    // Debugging: Print serviceBookingCounts
    console.log('Service Booking Counts:', serviceBookingCounts);

    const serviceNames = Object.keys(serviceBookingCounts);
    const bookingCounts = Object.values(serviceBookingCounts);

    // Chart Data
    const chartData = {
        labels: serviceNames,
        datasets: [
            {
                label: 'Number of Bookings',
                data: bookingCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h3 className="text-2xl font-bold mb-4">Most Booked Services</h3>
            <Bar data={chartData} />
        </div>
    );
};

export default MostBookedServicesChart;
