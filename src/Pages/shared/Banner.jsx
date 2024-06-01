const Banner = () => {
    return (
        <header>
            <div className="w-full bg-center bg-cover h-[38rem]" style={{ backgroundImage: "url('https://i.ibb.co/0jKN3vn/side-view-doctor-holding-stethoscope.jpg')" }}>
                <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-white lg:text-4xl">Innovative <span className="text-blue-400">Health</span> Solutions</h1>
                        <h2 className="text-xl mt-3 text-white">Cutting-edge diagnostics for your health.</h2>
                        <p className="text-lg mt-3 text-white">Use coupon code <span className="font-bold">HEALTH20</span> for 20% off</p>
                        <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Start project</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Banner;
