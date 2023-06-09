import SingleClass from "./SingleClass";
import useClasses from "../../../hooks/useClasses";

const MyClasses = () => {
    const [classes,refetch] = useClasses();
    return (

        <div className="flex gap-5 flex-wrap">
             {
            classes.map(singleClass => <SingleClass
            singleClass={singleClass}
            refetch={refetch}
            key={singleClass?._id}
            ></SingleClass>)
        }
    
        </div>
    );
};

export default MyClasses;

// bg-gradient-to-t from-[#6aacb9] via-[#5bb2d1] to-[#09dceb]