import { useContext, useState } from 'react';
import CardFlip from 'react-card-flip';
import cardbg from "../../assets/ShinyOverlay.svg"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Providers/AuthProvider';

const PopularSingleClassCard = ({singleClass}) => {
    const { availableSeats, className, classPhoto, instructorName, totalEnrolledStudent, price } = singleClass.storedClass || {}
    const [isFlipped, setIsFlipped] = useState(false);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [axiosSecure] = useAxiosSecure();
    const location = useLocation();
    const backgrounStyle = {
        backgroundImage: `url(${cardbg})`,
    };

    const { data: role = {} } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/users/role/${user?.email}`)
            return res.data;
        },
    })
    const { data: selectOrEnroll = [] } = useQuery({
        queryKey: ['selectOrEnroll'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/selectOrEnroll?className=${className}&selectedEmail=${user?.email}`)
            return res.data;
        },
    })

    const handleSelect = () => {
        if (!(user === null)) {
            const selectedClass = {
                className: className,
                selectedEmail: user?.email,
                enrolled: false,
                selected: true,
            }
            axiosSecure.post(`/selectOrEnroll`, { selectedClass })
                .then(data => {
                    if (data?.data?.insertedId) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Class Selected Successfully',
                            showConfirmButton: false,
                            timer: 500
                        })
                        setTimeout(() => {
                            navigate("/dashboard/myselected-classes")
                        }, 500)
                    }
                })
        }
        else {
            navigate("/login", { from: location })
        }
    }
    return (
        <>
        <div className={`${availableSeats === 0 ? "bg-red-500" : ""} rounded-2xl w-auto sm:w-80 mx-auto`}>
            <CardFlip
                isFlipped={isFlipped}
                flipDirection="vertical"
                flipSpeedBackToFront={2}
                flipSpeedFrontToBack={2}
            >
                <div onMouseEnter={() => setIsFlipped(!isFlipped)} className="card shadow-xl border-2 ">
                    <img className="h-52" src={classPhoto} alt="card image" />
                    <div className="card-body bg-[#7dadad26]">
                        <div className="flex items-center">
                            <h2 className="card-title">{className}</h2>
                        </div>
                        <p>
                            <span className="font-semibold text-gray-400">Price</span> : <span>{price}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Instructor</span> : <span>{instructorName}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Available Seats</span> : <span>{availableSeats}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-400">Total Enrolled Students</span> : <span>{totalEnrolledStudent}</span>
                        </p>
                    </div>
                </div>
                <div style={backgrounStyle} onMouseLeave={() => setIsFlipped(!isFlipped)} className="border-2 w-52 sm:w-80 py-32 flex flex-col justify-center items-center shadow-xl rounded-lg mx-auto">
                    <div className="text-center my-4">
                        <button
                            onClick={() => handleSelect()}
                            disabled={selectOrEnroll.enrolled || selectOrEnroll.selected || availableSeats === 0 || role?.role === "instructor" || role?.role === "admin"}
                            className={`${role?.role === "instructor" || role?.role === "admin" || user === null || selectOrEnroll.enrolled || selectOrEnroll.selected || availableSeats === 0 ? 
                            "bg-gray-400 " : "bg-[#83e0f5] font-bold   hover:bg-[#7f9a9f] hover:text-white "}  py-2 px-3 rounded-lg`}>
                            Select Class
                        </button>
                    </div>
                </div>
            </CardFlip>
        </div>
        </>
    );
};

export default PopularSingleClassCard;
