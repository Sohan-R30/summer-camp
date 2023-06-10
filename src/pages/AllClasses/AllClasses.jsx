import { useAllClasses } from "../../hooks/useClasses";
import ShowClasses from "./showClasses";
const AllClasses = () => {
    const  [allClasses, refetch] = useAllClasses();
    console.log("🚀 ~ file: AllClasses.jsx:5 ~ AllClasses ~ allClasses:", allClasses)

    return (
        <div className="flex gap-10 flex-wrap py-10">
        {
       allClasses && Array.isArray(allClasses) ? allClasses.map(singleClass => <ShowClasses
       singleClass={singleClass}
       refetch={refetch}
       key={singleClass?._id}
       ></ShowClasses>) : ""
   }

   </div>
    );
};

export default AllClasses;