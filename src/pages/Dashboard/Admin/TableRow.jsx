import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TableRow = ({ user, refetch, index }) => {

    const { _id, storedUser, role } = user || {};
    const { photo, name, email, gender, address, } = storedUser || {}
    const [disabledAdmin, setDisabledAdmin] = useState(false);
    const [disableInstructor, setDisableInstructor] = useState(false);

    const [axiosSecure] = useAxiosSecure();

    const handleMakeAdmin = (id) => {
        console.log(id,role);

        axiosSecure.patch(`/users/admin/${id}`)
            .then((data) => {
                if(data?.data?.modifiedCount){
                    refetch()
                    setDisabledAdmin(true)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'User make admin Successfully',
                        showConfirmButton: false,
                        timer: 500
                      })
                }
            })
    }
    const handleMakeInstructor = (id) => {
        console.log(id);
       if(!(role === "admin")){
        axiosSecure.patch(`/users/instructor/${id}`)
        .then((data) => {
            if(data?.data?.modifiedCount){
                refetch()
                setDisableInstructor(true)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'User make instructor Successfully',
                    showConfirmButton: false,
                    timer: 500
                  })
            }
        })
       }
        
    }
    return (
        <tr className="text-center divide-x divide-slate-300 divide-y divide-y-reverse divide-x-reverse">
            <td>{index + 1}</td>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={photo} alt="user picture" />
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{gender}</td>
            <td>{address}</td>
            <td>{role}</td>
            <th>
                <button
                 onClick={() => handleMakeInstructor(_id)} 
                 disabled={disableInstructor}
                 className={`${disableInstructor ? "bg-gray-400 " : "bg-[#83e0f5] font-bold   hover:bg-[#7f9a9f] hover:text-white "}  py-2 px-3 rounded-lg` }
                 >Make Instructor</button>
            </th>
            <th>
                <button  
                onClick={() => handleMakeAdmin(_id)} 
                disabled={disabledAdmin || role === "admin"}
                className={`${role === "admin" || disabledAdmin ? "bg-gray-400" : "bg-[#83e0f5] font-bold  hover:bg-[#7f9a9f] hover:text-white"}  py-2 px-3 rounded-lg`}
                >Make Admin</button>
            </th>
        </tr>
    );
};

export default TableRow;