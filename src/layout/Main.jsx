import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";
import Header from "../components/shared/Header/Header";


const Main = () => {
    return (
        <>
            <Header></Header>
            <div className=" min-h-[60vh]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Main;