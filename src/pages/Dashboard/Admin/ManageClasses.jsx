import { useQuery } from "@tanstack/react-query";
import ClassTableRow from "./ClassTableRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], isLoading, refetch, } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const res = await axiosSecure(`/classes`);
            return res?.data;
        },
    })
    
    return (
        <div className="overflow-x-auto px-10 sm:px-10 py-10 max-w-5xl my-2 mx-auto shadow-md rounded-lg">
            <table className="table bg-primaryColor">
                <thead>
                    <tr className="text-lg text-center divide-y divide-y-reverse divide-x divide-x-reverse divide-slate-300 bg-gray-400 text-white">
                        <th>Serial No</th>
                        <th>Class Photo</th>
                        <th>Instructor Name</th>
                        <th>Instructor Email</th>
                        <th>Class Name</th>
                        <th>Available Seats</th>
                        <th>Total Enrolled Students</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Approve</th>
                        <th>Deny</th>
                        <th>Send Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? (
                            <tr><td>Loading.....</td></tr>
                        ) : (
                            <>
                                {
                                    classes && classes?.map((SingleClass, index) => <ClassTableRow
                                        index={index}
                                        refetch={refetch}
                                        SingleClass={SingleClass}
                                        key={SingleClass?._id}
                                    ></ClassTableRow>)
                                }
                            </>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageClasses;