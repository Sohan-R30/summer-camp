import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DashboardHome = () => {
    const { user, userLoading } = useContext(AuthContext);
    
    const { data: userName, isLoading } = useQuery({
        queryKey: ['isAdminName', user?.email],
        enabled: !userLoading,
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/users/name/${user?.email}`);
            return res.data.storedUser;
        }
    })

    return (
        <div className="flex justify-center h-[60vh] items-center">
            {
                isLoading ? (
                    <p>loading...</p>
                ) : (
                    <div className="flex flex-col gap-5 text-center">
                        <p className="text-4xl">Hi, <span className="font-bold">{userName?.name}</span></p>
                        <p className="text-2xl">Welcome To Your Dashboard</p>
                        <p className="text-xl">To show your data please click on the side navigation bar</p>
                    </div>
                )
            }

        </div>
    );
};

export default DashboardHome;