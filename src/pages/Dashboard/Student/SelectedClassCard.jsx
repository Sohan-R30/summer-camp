import Button from "../../../components/shared/Button/Button";
import CardFlip from 'react-card-flip';
import cardbg from "../../../assets/ShinyOverlay.svg"
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";


const SelectedClassCard = ({ singleClass, refetch }) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const { availableSeats, className, classPhoto, instructorName, totalEnrolledStudent } = singleClass.storedClass || {}

    const backgrounStyle = {
        backgroundImage: `url(${cardbg})`,
    };

    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();

    const handleDelete = (id) => {

        axiosSecure.delete(`/selectedClass/delete?id=${id}&selectedEmail=${user?.email}`)
            .then(data => {
                if (data?.data?.deletedCount) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Delete From Selected Card',
                        showConfirmButton: false,
                        timer: 300
                    })
                    refetch()
                }
            })
    }

    return (
        <>
            <CardFlip
                isFlipped={isFlipped}
                flipDirection="vertical"
                flipSpeedBackToFront={2}
                flipSpeedFrontToBack={2}
            >
                <div onMouseEnter={() => setIsFlipped(!isFlipped)} className="card w-80  shadow-xl border-2 ">
                    <img className="h-52" src={classPhoto} alt="card image" />
                    <div className="card-body bg-[#7dadad26]">
                        <div className="flex items-center">
                            <h2 className="card-title">{className}</h2>
                            <p className="text-green-400 font-bold text-end text-xl" >{singleClass.selected && "selected"}</p>
                        </div>
                        <p><span className="font-semibold text-gray-400">Instructor</span> : <span>{instructorName}</span></p>
                        <p><span className="font-semibold text-gray-400">Available Seats</span> : <span>{availableSeats}</span></p>
                        <p><span className="font-semibold text-gray-400">Total Enrolled Students</span> : <span>{totalEnrolledStudent}</span></p>
                    </div>
                </div>
                <div style={backgrounStyle} onMouseLeave={() => setIsFlipped(!isFlipped)} className="border-2 w-80 py-32 flex flex-col justify-center items-center shadow-xl rounded-lg ">
                    <div className="text-center my-4 flex justify-around gap-5">
                        <div className="my-3" onClick={() => handleDelete(singleClass._id)}>
                            <Button>Delete</Button>
                        </div>
                        <Link to={`/dashboard/payment-stripe/${singleClass._id}`}>
                            <Button>Pay</Button>
                        </Link>
                    </div>
                </div>
            </CardFlip>

        </>
    )
};

export default SelectedClassCard;