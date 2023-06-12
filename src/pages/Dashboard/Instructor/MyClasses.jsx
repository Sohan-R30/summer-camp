import SingleClass from "./SingleClass";
import useClasses from "../../../hooks/useClasses";
import BarLoader from "react-spinners/BarLoader";

const MyClasses = () => {

    const [classes, refetch,isLoading] = useClasses();
    
    return (

        <div className="flex gap-5 flex-wrap">
            {
                classes.map(singleClass => <SingleClass
                    singleClass={singleClass}
                    refetch={refetch}
                    key={singleClass?._id}
                ></SingleClass>)
            }
            {
                isLoading && (
                    <p><BarLoader color="#38ecd4" /></p>
                )
            }
        </div>
    );
};

export default MyClasses;

// bg-gradient-to-t from-[#6aacb9] via-[#5bb2d1] to-[#09dceb]