import Banner from "../shared/Banner";
import Navbar from "../shared/Navbar";
import Promotions from "./Promotions";
import Recommendations from "./Recommendations";

const Home = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
           
            <div>
                <Banner></Banner>
            </div>
            <div className="mt-16">
                <Promotions></Promotions>
            </div>
            <div className="mt-16">
                <Recommendations></Recommendations>
            </div>
        </div>
    );
};

export default Home;