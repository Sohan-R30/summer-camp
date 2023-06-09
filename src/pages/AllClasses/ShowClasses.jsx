import { useState } from 'react';
import CardFlip from 'react-card-flip';
import cardbg from "../../assets/ShinyOverlay.svg"
import { Link } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
const ShowClasses = ({ singleClass }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { availableSeats, className, classPhoto, instructorName } = singleClass.storedClass || {}
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const backgrounStyle = {
        backgroundImage: `url(${cardbg})`,
    };
    const handleSelect = (id) => {
        console.log("🚀 ~ file: showClasses.jsx:13 ~ handleSelect ~ id:", id)
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
                    <p><span className="font-semibold text-gray-400">Total Enrolled Students</span> : <span>34</span></p>
                </div>
            </div>
            <div style={backgrounStyle} onMouseLeave={() => setIsFlipped(!isFlipped)} className="border-2 w-80 py-32 flex flex-col justify-center items-center shadow-xl rounded-lg ">
                <div className="text-center my-4">
                    <Link to="/select-classes">
                    <button
                        onClick={() => handleSelect(singleClass._id)}
                        disabled={isAdmin || isInstructor}
                        className={`${isAdmin || isInstructor ? "bg-gray-400 " : "bg-[#83e0f5] font-bold   hover:bg-[#7f9a9f] hover:text-white "}  py-2 px-3 rounded-lg`}
                    >Select Class</button>
                    </Link>
                </div>
            </div>
        </CardFlip>
    </div>
    );
};

export default ShowClasses;