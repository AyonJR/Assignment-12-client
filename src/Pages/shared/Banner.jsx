import { Link } from "react-router-dom";
import useActiveBanner from "../Dashboard/AdminProfile/useActiveBanner";

const Banner = () => {
    const { banner, isLoading, isError } = useActiveBanner();

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError || !banner) {
        return <div className="flex justify-center items-center h-screen">Error loading banner</div>;
    }

    return (
        <header>
            {/* Background with a Subtle Parallax Effect */}
            <div
                className="relative w-full h-[38rem] bg-fixed bg-center bg-cover"
                style={{ backgroundImage: `url(https://i.ibb.co.com/wgZGfrS/7310061.jpg)` }}
            >
                {/* Gradient Overlay for Enhanced Visual Appeal */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>

                <div className="flex items-center justify-center w-full h-full">
                    <div className="text-center z-10 space-y-5 px-6 md:px-12">
                        {/* Smoothly Fading Title with a Soft Shadow */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-md tracking-wide transition-opacity duration-1000 ease-in-out opacity-90">
                            {banner.title}
                        </h1>

                        {/* Description with a Light Shadow and Fading Animation */}
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto shadow-sm font-semibold animate__animated animate__fadeInUp animate__delay-1s">
                            {banner.description}
                        </p>

                        {/* Coupon Code Section with Subtle Highlight */}
                        {banner.couponCodeName && (
                            <p className="text-lg lg:text-xl text-white font-medium animate__animated animate__fadeInUp animate__delay-2s">
                                Use coupon code{" "}
                                <span className="text-cyanCustom underline decoration-dotted">
                                    {banner.couponCodeName}
                                </span>{" "}
                                for <span className="text-cyanCustom  font-bold">{banner.couponRate}% off</span>
                            </p>
                        )}

                        {/* Call-to-action Button with Smooth Hover Effects */}
                        <Link to="/allTest">
                            <button className="px-8 py-3 mt-6 text-lg font-medium text-white bg-cyanCustom rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out">
                                Explore All Tests
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Banner;
