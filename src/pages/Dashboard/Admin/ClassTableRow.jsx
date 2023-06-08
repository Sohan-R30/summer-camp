import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ClassTableRow = ({SingleClass,index,refetch}) => {
    const {availableSeats,className,classPhoto,instructorEmail,instructorName,price,status} = SingleClass.storedClass || {}

    const [disabledApproved, setdisabledApproved] = useState(false);
    const [disabledDeny, setdisabledDeny] = useState(false);
    const [disabledFeedback, setdisabledFeedback] = useState(false);
    const [axiosSecure] = useAxiosSecure();

    const handleApproved = (id) => {
        console.log(id);

        axiosSecure.patch(`/classes/admin/approved/${id}`)
            .then((data) => {
                console.log(data?.data)
                if(data?.data?.modifiedCount){
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
    

    return (
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
            <td>{availableSeats}</td>
            <td>{price}</td>
            <td>{status}</td>
            <th>
                <button
                 onClick={() => handleApproved(SingleClass._id)} 
                 disabled={disabledApproved || status === "approved" || status === "deny"}
                 className={`${(status === "approved" || status === "deny") || disabledApproved ? "bg-gray-400 " : "bg-[#83e0f5] font-bold   hover:bg-[#7f9a9f] hover:text-white "}  py-2 px-3 rounded-lg` }
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
                <button   onClick={() => handleSendFeedBack(SingleClass._id)} 
                // disabled={disabledFeedback || status === "approved" || status === "deny"}
                className={`bg-[#83e0f5] font-bold  hover:bg-[#7f9a9f] hover:text-white"}  py-2 px-3 rounded-lg`}
                >Send Feedback</button>
            </th>
        </tr>
    );
};

export default ClassTableRow;