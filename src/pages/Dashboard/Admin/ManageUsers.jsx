import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TableRow from "./TableRow";



const ManageUsers = () => {


    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], isLoading, refetch, } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure(`/users`);
            return res?.data;
        },

    })


    return (
        <div className="overflow-x-auto">
            <table className="table bg-primaryColor">
                <thead>
                    <tr className="text-lg text-center divide-y divide-y-reverse divide-x divide-x-reverse divide-slate-300">
                        <th>Serial No</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Make Instructor</th>
                        <th>Make Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? (
                            <tr><td>Loading.....</td></tr>
                        ) : (
                            <>
                                {
                                    users && users?.map((user,index) => <TableRow
                                        index={index}
                                        refetch={refetch}
                                        user={user}
                                        key={user?._id}
                                    ></TableRow>)
                                }
                            </>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;