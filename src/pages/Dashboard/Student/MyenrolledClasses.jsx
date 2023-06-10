import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EnrolledClasses from "./enrolledClasses";
import { useQuery } from "@tanstack/react-query";

const MyenrolledClasses = () => {

    const { user, userLoading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();

    const { data: enrolledClasses = [], isLoading, } = useQuery({
        queryKey: ["classes", user?.email],
        enabled: !userLoading,
        queryFn: async () => {
            const res = await axiosSecure(`/classes/enrolled/${user?.email}`);
            return res?.data;
        },
    })

    return (
        <div>
            {
                isLoading ? (<p>loading....</p>) : (
                    <div className="flex gap-5 flex-wrap">
                        {
                            enrolledClasses.map(singleClass => <EnrolledClasses
                                singleClass={singleClass}
                                key={singleClass?._id}
                            ></EnrolledClasses>)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default MyenrolledClasses;