import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import SelectedClassCard from "./selectedClassCard";
import BarLoader from "react-spinners/BarLoader";


const MyselectedClasses = () => {
    
    const { user, userLoading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    
    const { data: selectedClasses = [], isLoading, refetch } = useQuery({
        queryKey: ["classes", user?.email],
        enabled: !userLoading,
        queryFn: async () => {
            const res = await axiosSecure(`/classes/selected/${user?.email}`);
            return res?.data;
        },
    })

    return (
        <div>
            {
                isLoading ? (<p><BarLoader color="#38ecd4" /></p>) : (
                    <div className="flex gap-5 flex-wrap">
                        {
                            selectedClasses.map(singleClass => <SelectedClassCard
                                singleClass={singleClass}
                                refetch={refetch}
                                key={singleClass?._id}
                            ></SelectedClassCard>)
                        }
                    </div>
                )
            }

        </div>
    );
};

export default MyselectedClasses;