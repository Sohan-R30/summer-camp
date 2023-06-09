import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import FeedbackModal from "./FeedbackModal";


const ClassTableRow = ({ SingleClass, index, refetch }) => {
    const { availableSeats, className, classPhoto, instructorEmail, instructorName, price, status } = SingleClass.storedClass || {}

    const [isOpen, setIsOpen] = useState(false)
    const [disabledApproved, setdisabledApproved] = useState(false);
    const [disabledDeny, setdisabledDeny] = useState(false);
    const [disabledFeedback, setdisabledFeedback] = useState(false);
    const [giveFeedback, setGiveFeedback] = useState("")


    const [axiosSecure] = useAxiosSecure();

    const handleApproved = (id) => {
        console.log(id);

        axiosSecure.patch(`/classes/admin/approved/${id}`)
            .then((data) => {
                console.log(data?.data)
                if (data?.data?.modifiedCount) {
                    refetch()
                    setdisabledApproved(true)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Class Approved',
                        showConfirmButton: false,
                        timer: 500
                    })
                }
            })
            .catch(error => console.log(error))
    }
    const handleDeny = (id) => {
        console.log(id);
        axiosSecure.patch(`/classes/admin/deny/${id}`)
            .then((data) => {
                if (data?.data?.modifiedCount) {
                    refetch()
                    setdisabledDeny(true)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Class Denied',
                        showConfirmButton: false,
                        timer: 500
                    })
                }
            })
    }
    const handleSendFeedBack = (id) => {
        console.log(id);
        console.log({ giveFeedback });
        axiosSecure.patch(`/classes/admin/feedback/${id}`, { giveFeedback })
            .then((data) => {
                if (data?.data?.modifiedCount) {
                    setIsOpen(false)
                    refetch()
                    setdisabledFeedback(true)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Successfully Send Your Feedback',
                        showConfirmButton: false,
                        timer: 500
                    })
                }
            })
    }
    console.log(SingleClass.feedback);

    return (
        <>
            <tr className="text-center divide-x divide-slate-300 divide-y divide-y-reverse divide-x-reverse shadow-sm">
                <td>{index + 1}</td>
                <td>
                    <div className="avatar">
                        <div className="mask mask-squircle w-14">
                            <img src={classPhoto} alt="user picture" />
                        </div>
                    </div>
                </td>
                <td>{instructorName}</td>
                <td>{instructorEmail}</td>
                <td>{className}</td>
                <td className="text-green-600 font-bold">{availableSeats}</td>
                <td className="text-red-600 font-bold">{price}</td>
                <td 
                className={`
                ${status === "pending" ? "text-pink-400" 
                : status === "approved" ? "text-green-400" 
                : status === "deny" ? "text-red-400" : "" } 
                font-bold `}
                >{status}</td>
                <th>
                    <button
                        onClick={() => handleApproved(SingleClass._id)}
                        disabled={disabledApproved || status === "approved" || status === "deny"}
                        className={`${(status === "approved" || status === "deny") || disabledApproved ? "bg-gray-400 " : "bg-[#83e0f5] font-bold   hover:bg-[#7f9a9f] hover:text-white "}  py-2 px-3 rounded-lg`}
                    >Aprroved</button>
                </th>
                <th>
                    <button
                        onClick={() => handleDeny(SingleClass._id)}
                        disabled={disabledDeny || status === "approved" || status === "deny"}
                        className={`${(status === "approved" || status === "deny") || disabledApproved ? "bg-gray-400 " : "bg-[#83e0f5] font-bold  hover:bg-[#7f9a9f] hover:text-white"}  py-2 px-3 rounded-lg`}
                    >Deny</button>
                </th>
                <th>
                    <button onClick={() => setIsOpen(true)}
                        disabled={disabledFeedback || SingleClass?.feedback}
                        className={`${SingleClass?.feedback ? "bg-gray-400" : "bg-[#83e0f5] font-bold  hover:bg-[#7f9a9f] hover:text-white"}  py-2 px-3 rounded-lg`}
                    >Send Feedback</button>
                    <FeedbackModal
                handleSendFeedBack={handleSendFeedBack}
                setGiveFeedback={setGiveFeedback}
                isOpen={isOpen}
                id={SingleClass._id}
                setIsOpen={setIsOpen}
            />
                </th>
            </tr>
            
        </>

    );
};

export default ClassTableRow;