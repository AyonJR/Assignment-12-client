import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

const Main = () => {
    return (
        <div>
            <div className="">
           <Header></Header>
            </div>
            <div className="">
                <Navbar></Navbar>
            </div>
            <div>
              <Outlet></Outlet>
            </div>
            <div className="mt-40">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;