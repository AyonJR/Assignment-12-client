import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            
            <div>
              <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;