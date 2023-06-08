import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useInstructor = () => {
    const {user, userLoading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !userLoading,
        queryFn: async () => {
            const res = await axiosSecure(`/users/instructor/${user?.email}`);
            return res.data.instructor;
        }
    })
    return [isInstructor, isInstructorLoading]
};

export default useInstructor;