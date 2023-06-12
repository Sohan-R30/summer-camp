import { Helmet } from "react-helmet-async";
import FeaturedActivities from "./FeaturedActivities";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import TopSlider from "./TopSlider";


const Home = () => {


    return (
        <div className="">
            <Helmet>
                <title>Summer Camp | Home</title>
            </Helmet>
            <TopSlider></TopSlider>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <FeaturedActivities></FeaturedActivities>
        </div>
    );
};

export default Home;