import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import SingleInstructorCard from "./SingleInstructorCard";


const OneInsturorClasses = () => {
    const { email } = useParams()
    const { data: SingleInstrutorClasses } = useQuery({
        queryKey: ["classes",],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/singleInstructor/${email}`)
            return res?.data;
        }
    })
    console.log("🚀 ~ file: OneInsturorClasses.jsx:6 ~ OneInsturorClasses ~ email:", email, SingleInstrutorClasses)
    return (
        <div>
            <div className="flex gap-10 flex-wrap py-10">
                {
                    SingleInstrutorClasses && Array.isArray(SingleInstrutorClasses) ?  SingleInstrutorClasses?.map(singleClass => <SingleInstructorCard
                        singleClass={singleClass}
                        key={singleClass?._id}
                    ></SingleInstructorCard>) : ""
                }
            </div>
        </div>
    );
};

export default OneInsturorClasses;