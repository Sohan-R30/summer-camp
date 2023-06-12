import { Helmet } from "react-helmet-async";
import { useAllClasses } from "../../hooks/useClasses";
import ShowClasses from "./showClasses";
const AllClasses = () => {
    
    const [allClasses, refetch] = useAllClasses();

    return (
        <div className="flex gap-10 flex-wrap py-10">
            <Helmet>
                <title>Summer Camp | Class</title>
            </Helmet>
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