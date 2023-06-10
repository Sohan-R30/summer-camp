import { useContext, useState } from 'react';
import CardFlip from 'react-card-flip';
import cardbg from "../../assets/ShinyOverlay.svg"
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const ShowClasses = ({ singleClass }) => {
    console.log("🚀 ~ file: showClasses.jsx:13 ~ ShowClasses ~ singleClass:", singleClass)
    const [isFlipped, setIsFlipped] = useState(false);
    const { availableSeats, className, classPhoto, instructorName,totalEnrolledStudent } = singleClass.storedClass || {}

    const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const navigate = useNavigate();
    const [axiosSecure] = useAxiosSecure();
    const location = useLocation();

    const backgrounStyle = {
        backgroundImage: `url(${cardbg})`,
    };
    const handleSelect = (id) => {
        if(!(user === null)) {
            const selectedClass = {
                selectedEmail: user?.email,
                enrolled: false,
                selected: true,
            }
            axiosSecure.patch(`/classes/selectOrEnroll/${id}`,{selectedClass})
                .then(data => {
                    if(data?.data?.modifiedCount){
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Class Selected Successfully',
                            showConfirmButton: false,
                            timer: 500
                          })
                          setTimeout(() => {
                            navigate("/dashboard/myselected-classes")
                          },500)
                    }
                })
                .catch(error => console.log(error))
        }
        else{
            navigate("/login", {from : location})
        }
    }
    return (
        <div className={`${availableSeats === 0 ? "bg-red-500" : ""} rounded-2xl`}>
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
                    </div>
                    <p><span className="font-semibold text-gray-400">Instructor</span> : <span>{instructorName}</span></p>
                    <p><span className="font-semibold text-gray-400">Available Seats</span> : <span>{availableSeats}</span></p>
                    <p><span className="font-semibold text-gray-400">Total Enrolled Students</span> : <span>{totalEnrolledStudent}</span></p>
                </div>
            </div>
            <div style={backgrounStyle} onMouseLeave={() => setIsFlipped(!isFlipped)} className="border-2 w-80 py-32 flex flex-col justify-center items-center shadow-xl rounded-lg ">
                <div className="text-center my-4">
                    <button
                        onClick={() => handleSelect(singleClass._id)}
                        disabled={isAdmin || isInstructor || singleClass.enrolled || singleClass.selected}
                        className={`${isAdmin || isInstructor || user === null || singleClass.enrolled || singleClass.selected ? "bg-gray-400 " : "bg-[#83e0f5] font-bold   hover:bg-[#7f9a9f] hover:text-white "}  py-2 px-3 rounded-lg`}
                    >Select Class</button>
                </div>
            </div>
        </CardFlip>
    </div>
    );
};

export default ShowClasses;