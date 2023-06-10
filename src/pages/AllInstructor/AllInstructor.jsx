import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ShowInstructors from "./ShowInstructors";


const AllInstructor = () => {

    const {data: allInstructor, isLoading: isAllInstructorLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await  axios(`${import.meta.env.VITE_API_URL}/users/allInstructor`);
            return res?.data;
        }
    })
console.log(allInstructor)
    return (
        <div className="flex gap-10 flex-wrap py-10">
        {
       allInstructor?.map(singleClass => <ShowInstructors
       singleClass={singleClass}
       key={singleClass?._id}
       ></ShowInstructors>)
   }

   </div>
    );
};

export default AllInstructor;