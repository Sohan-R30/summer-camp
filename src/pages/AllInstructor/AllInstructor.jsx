import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ShowInstructors from "./ShowInstructors";
import { Helmet } from "react-helmet-async";
import BarLoader from "react-spinners/BarLoader";


const AllInstructor = () => {

    const { data: allInstructor, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/users/allInstructor`);
            return res?.data;
        }
    })
    
    return (
        <div className="flex gap-5 sm:gap-10 flex-wrap py-10 justify-center items-center w-full">
            <Helmet>
                <title>Summer Camp | Instructors</title>
            </Helmet>
           {
            isLoading ? (
                <p><BarLoader color="#38ecd4" /></p>
            ) : (
                <>
           {
                allInstructor?.map(singleClass => <ShowInstructors
                    singleClass={singleClass}
                    key={singleClass?._id}
                ></ShowInstructors>)
            }
           </>
            )
           }
        </div>
    );
};

export default AllInstructor;