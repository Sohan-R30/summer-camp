import { useState } from "react";
import CardFlip from 'react-card-flip';
import cardbg from "../../../assets/ShinyOverlay.svg"


// TODO : Total Student EnrolledMent

const SingleClass = ({handleSelect,singleClass}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    console.log(singleClass)
    const {availableSeats,className,classPhoto,instructorEmail,instructorName,price,status} = singleClass.storedClass    || {}
    

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
                <img className="h-60" src={classPhoto} alt="card image" />
                <div className="card-body bg-[#7dadad26]">
                    <div className="flex items-center">
                        <h2 className="card-title">{className}</h2>
                        <p className="text-end text-pink-400 font-bold ">{status}</p>
                    </div>
                    <p><span className="font-semibold text-gray-400">Instructor</span> : <span>{instructorName}</span></p>
                    <p><span className="font-semibold text-gray-400">Available Seats</span> : <span>{availableSeats}</span></p>
                    <p><span className="font-semibold text-gray-400">Total Enrolled Students</span> : <span>34</span></p>
                </div>
            </div>
            <div style={backgrounStyle} onMouseOut={() => setIsFlipped(!isFlipped)} className="border-2 w-80 py-32 flex flex-col justify-center items-center shadow-xl rounded-lg ">
                <div className="text-center my-4">
                    <p className="font-bold text-xl">Feedback.....</p>
                    <p className="">
                        Lorem ipsum dolor,
                        sit amet consectetur adipisicing elit.
                        Harum dolorum impedit, earum quia a accusantium culpa
                    </p>
                </div>
                <button  onClick={handleSelect} className="border px-8 py-2 bg-[#e29417] hover:bg-[#9ab751f2] rounded-lg border-none">Select Class</button>
            </div>
        </CardFlip>
            
        </>
    );
};

export default SingleClass;