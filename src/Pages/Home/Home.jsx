import AllTest from "../../Routes/AllTest";
import Banner from "../shared/Banner";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import FeaturedTests from "./FeaturedTests";
import Promotions from "./Promotions";
import Recommendations from "./Recommendations";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div className="custom-font">
           
           
            <div>
                <Banner></Banner>
            </div>
            <div className="mt-16">
                <Promotions></Promotions>
            </div>
            <div className="mt-16">
                <Recommendations></Recommendations>
            </div>
            <div className="mt-16">
                <FeaturedTests></FeaturedTests>
            </div>
            <div className="mt-16">
                <Testimonials></Testimonials>
            </div>
           
          
        </div>
    );
};

export default Home;