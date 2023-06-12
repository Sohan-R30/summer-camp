import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
import PopularSingleClassCard from "./PopularSingleClassCard";
import BarLoader from "react-spinners/BarLoader";


const PopularClasses = () => {
    const { data: popularClasses = [], refetch,isLoading } = useQuery({
        queryKey: ['popularClasses'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/popularClasses`)
            return res.data;
        },
    })
    return (
        <div className="mt-20">
            <div className="text-4xl text-center font-bold">
                <h3>   
                <Typewriter
                        words={['Popular', 'Classes', 'Is', 'Here']}
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
                popularClasses && Array.isArray(popularClasses) ? popularClasses.map(singleClass => <PopularSingleClassCard
                    singleClass={singleClass}
                    refetch={refetch}
                    key={singleClass?._id}
                ></PopularSingleClassCard>) : ""
            }
            {
                isLoading && (
                    <p><BarLoader color="#38ecd4" /></p>
                )
            }

        </div>
        </div>
    );
};

export default PopularClasses;