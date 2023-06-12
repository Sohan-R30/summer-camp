import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SinglePopularInstructor from "./singlePopularInstructor";
import { Typewriter } from "react-simple-typewriter";


const PopularInstructors = () => {

    const { data: popularInstructors = [], refetch } = useQuery({
        queryKey: ['popularInstructors'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/popularInstructors`)
            return res.data;
        },
    })
    return (
        <div className="mt-20">
             <div className="text-4xl text-center font-bold">
                <h3>
                <Typewriter
                        words={['Popular', 'Instructor', 'Is', 'Here']}
                        loop={true}
                        cursor
                        cursorStyle=' | '
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h3>
            </div>
            <div className="flex gap-5 sm:gap-10 flex-wrap py-10 justify-center items-center w-full">
            {
                popularInstructors && Array.isArray(popularInstructors) ? popularInstructors.map((singleInstructor,index) => <SinglePopularInstructor
                    singleInstructor={singleInstructor}
                    refetch={refetch}
                    key={index}
                ></SinglePopularInstructor>) : ""
            }


        </div>
        </div>
    );
};

export default PopularInstructors;