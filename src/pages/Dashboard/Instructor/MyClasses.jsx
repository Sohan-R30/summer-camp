import SingleClass from "./SingleClass";
import useClasses from "../../../hooks/useClasses";

const MyClasses = () => {
    const [classes,] = useClasses();
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
             {
            classes.map(singleClass => <SingleClass
            singleClass={singleClass}
            key={classes?._id}
            ></SingleClass>)
        }
    
        </div>
    );
};

export default MyClasses;

// bg-gradient-to-t from-[#6aacb9] via-[#5bb2d1] to-[#09dceb]