import useActiveBanner from "../Dashboard/AdminProfile/useActiveBanner";

const Banner = () => {
    const { banner, isLoading, isError } = useActiveBanner();
    // console.log(banner)

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError || !banner) {
        return <div className="flex justify-center items-center h-screen">Error loading banner</div>;
    }

    return (
        <header>
            <div className="w-full bg-center bg-cover h-[38rem]" style={{ backgroundImage: `url('${banner.image}')` }}>
                <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-white lg:text-4xl">{banner.title}</h1>
                        
                        <p className="text-lg mt-3 text-white">{banner.description}</p>
                        {banner.couponCodeName && (
                            <p className="text-lg mt-3 text-white">
                                Use coupon code <span className="font-bold">{banner.couponCodeName}</span> for {banner.couponRate}% off
                            </p>
                        )}
                        <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Start project</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Banner;
