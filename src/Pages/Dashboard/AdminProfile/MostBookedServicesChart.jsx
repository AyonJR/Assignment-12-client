import { useQuery } from "@tanstack/react-query";
import { Bar, Pie } from 'react-chartjs-2';
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
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

    console.log('All Bookings:', allBookings);

    const serviceBookingCounts = allBookings.reduce((acc, booking) => {
        const serviceName = booking.name; 
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
           <div className="flex justify-center">
           <h3 className="text-2xl font-bold mb-4">Most Booked Services</h3>
           </div>
            <Bar data={chartData} />
            <ServiceDeliveryRatioChart allBookings={allBookings} />
        </div>
    );
};

const ServiceDeliveryRatioChart = ({ allBookings }) => {
    const statusCounts = allBookings.reduce((acc, booking) => {
        const status = booking.reportStatus;
        if (status) {
            if (acc[status]) {
                acc[status]++;
            } else {
                acc[status] = 1;
            }
        } else {
            console.warn('Booking without status:', booking);
        }
        return acc;
    }, {});

    console.log('Service Status Counts:', statusCounts);

    const statusNames = Object.keys(statusCounts);
    const statusData = Object.values(statusCounts);

    const pieChartData = {
        labels: statusNames,
        datasets: [
            {
                label: 'Service Delivery Status',
                data: statusData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', 
                    'rgba(54, 162, 235, 0.6)'  
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mx-auto p-8" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h3 className="text-2xl font-bold mb-4">Service Delivery Status Ratio</h3>
            <Pie data={pieChartData} width={300} height={300} />
        </div>
    );
};

export default MostBookedServicesChart;
