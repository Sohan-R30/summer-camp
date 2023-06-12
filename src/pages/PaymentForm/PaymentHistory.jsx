import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import HistoryTableRow from "./HistoryTableRow";
import BarLoader from "react-spinners/BarLoader";


const PaymentHistory = () => {

    const [axiosSecure] = useAxiosSecure();
    const { user, userLoading } = useContext(AuthContext)

    const { data: history = [], isLoading, } = useQuery({
        queryKey: ["classes", user?.email],
        enabled: !userLoading,
        queryFn: async () => {
            const res = await axiosSecure(`/classes/payments-history/${user?.email}`);
            return res?.data;
        },
    })

    const totalPrice = history?.reduce((sum, currentPrice) => {
        return parseFloat(sum) + parseFloat(currentPrice?.storedClass?.price);
    }, 0);
    return (
        <div className="overflow-x-auto px-10 sm:px-10 py-10 max-w-5xl my-2 mx-auto shadow-md rounded-lg">
            <div className="text-center mb-10 text-2xl font-bold bg-primaryColor py-5">
                {
                    totalPrice && <p>Your Total Payment Is : $ {totalPrice}</p>
                }
            </div>
            <table className="table bg-primaryColor">
                <thead>
                    <tr className="text-lg text-center divide-y divide-y-reverse divide-x divide-x-reverse divide-slate-300 bg-gray-400 text-white">
                        <th>Serial No</th>
                        <th>Class Photo</th>
                        <th>Class Name</th>
                        <th>Instructor Email</th>
                        <th>Price</th>
                        <th>TransactionId</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? (
                            <tr><td><BarLoader color="#38ecd4" /></td></tr>
                        ) : (
                            <>
                                {
                                    history && history?.map((SingleClass, index) => <HistoryTableRow
                                        index={index}
                                        SingleClass={SingleClass}
                                        key={SingleClass?._id}
                                    ></HistoryTableRow>)
                                }
                            </>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;