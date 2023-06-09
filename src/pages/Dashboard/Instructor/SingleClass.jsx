import { useState } from "react";
import CardFlip from 'react-card-flip';
import cardbg from "../../../assets/ShinyOverlay.svg"


// TODO : Total Student EnrolledMent

const SingleClass = ({singleClass}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    console.log("---------",singleClass)
    const {availableSeats,className,classPhoto,instructorName,status} = singleClass.storedClass    || {}
    

    const backgrounStyle = {
        backgroundImage: `url(${cardbg})`,
      };
    return (
        <>
        <CardFlip
            isFlipped={isFlipped}
            flipDirection="vertical"
            flipSpeedBackToFront={2}
            flipSpeedFrontToBack={2}
        > 
            <div  onMouseEnter={() => setIsFlipped(!isFlipped)} className="card w-80  shadow-xl border-2 ">
                <img className="h-52" src={classPhoto} alt="card image" />
                <div className="card-body bg-[#7dadad26]">
                    <div className="flex items-center">
                        <h2 className="card-title">{className}</h2>
                        <p 
                        className={`text-end 
                        ${status === "pending" ? "text-pink-400" 
                        : status === "approved" ? "text-green-400" 
                        : status === "deny" ? "text-red-400" : "" } 
                        font-bold `}>{status}</p>
                    </div>
                    <p><span className="font-semibold text-gray-400">Instructor</span> : <span>{instructorName}</span></p>
                    <p><span className="font-semibold text-gray-400">Available Seats</span> : <span>{availableSeats}</span></p>
                    <p><span className="font-semibold text-gray-400">Total Enrolled Students</span> : <span>34</span></p>
                </div>
            </div>
            <div style={backgrounStyle} onMouseOut={() => setIsFlipped(!isFlipped)} className="border-2 w-80 py-32 flex flex-col justify-center items-center shadow-xl rounded-lg ">
                <div className="text-center my-4">
                    <p className="font-bold text-xl">Feedback.....</p>
                    <p className="">  {singleClass?.feedback ? singleClass.feedback : "No Feedback"} </p>
                </div>
            </div>
        </CardFlip>
            
        </>
    );
};

export default SingleClass;