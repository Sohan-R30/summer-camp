import { Helmet } from "react-helmet-async";
import { useAllClasses } from "../../hooks/useClasses";
import ShowClasses from "./showClasses";
import BarLoader from "react-spinners/BarLoader";
const AllClasses = () => {
    
    const [allClasses, refetch,isLoading] = useAllClasses();

    return (
        <div className="flex gap-10 flex-wrap py-10">
            <Helmet>
                <title>Summer Camp | Class</title>
            </Helmet>
            {
               isLoading || allClasses && Array.isArray(allClasses) ? allClasses.map(singleClass => <ShowClasses
                    singleClass={singleClass}
                    refetch={refetch}
                    key={singleClass?._id}
                ></ShowClasses>) : ""
            }
            {
                isLoading && (<div>
                    <p><BarLoader color="#38ecd4" /></p>
                </div>)
            }
        </div>
    );
};

export default AllClasses;