
import { useState } from "react";
import cardbg from "../../assets/ShinyOverlay.svg"
import CardFlip from "react-card-flip";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button/Button";

const SinglePopularInstructor = ({ singleInstructor }) => {
    const { address, email, gender, name, phone, photo } = singleInstructor.instructorDetails || {}

    // const [isFlipped, setIsFlipped] = useState();
    const [isFlipped, setIsFlipped] = useState(false);


    const backgrounStyle = {
        backgroundImage: `url(${cardbg})`,
    };


    return (
        <>
            <div className={`rounded-2xl ${singleInstructor?.perClassTotalStudent === 0 ? "bg-red-500" : ""}rounded-2xl w-auto sm:w-80 mx-auto`}>
                <CardFlip
                    isFlipped={isFlipped}
                    flipDirection="vertical"
                    flipSpeedBackToFront={2}
                    flipSpeedFrontToBack={2}
                >
                    <div onMouseEnter={() => setIsFlipped(!isFlipped)} className="card min-h-[450px]  shadow-xl border-2 ">
                        <img className="h-52 rounded-xl" src={photo} alt="card image" />
                        <div className="card-body bg-[#7dadad26]">
                            <div className="flex items-center">
                                <h2><span className="font-semibold text-gray-400">Instructor</span> : <span>{name}</span></h2>
                            </div>
                            <p><span className="font-semibold text-gray-400">Total Student</span> : <span>{singleInstructor?.perClassTotalStudent}</span></p>
                            {gender && <p><span className="font-semibold text-gray-400">Gender</span> : <span>{gender}</span></p>}
                            {phone && <p><span className="font-semibold text-gray-400">Phone</span> : <span>{phone}</span></p>}
                        </div>
                    </div>
                    <div
                        style={backgrounStyle}
                        onMouseLeave={() => setIsFlipped(!isFlipped)}
                        className="border-2 w-auto sm:w-80 py-32 flex flex-col gap-2 px-8 sm:justify-center sm:items-center shadow-xl rounded-lg mx-auto">
                        {address && <p className="sm:w-max ml-4 overflow-hidden"><span className="font-semibold text-gray-400">Address</span> : <span>{address.slice(0,12)}</span></p>}
                        {address && <p className="sm:w-max ml-4 overflow-hidden"><span>{address.slice(12)}</span></p>}
                        <p className="sm:w-max ml-4 overflow-hidden"><span className="font-semibold text-gray-400">Email</span> : <span>{email.slice(0,12)}</span></p>
                        <p className="sm:w-max ml-4 overflow-hidden"><span>{email.slice(12)}</span></p>
                        <div className="ml-4">
                        {
                            singleInstructor.perClassTotalStudent === 0 ? "" : (
                                <Link to={`/instructor/${email}`} className="mt-5">
                                    <Button>See  Classes</Button>
                                </Link>
                            )
                        }
                        </div>
                    </div>
                </CardFlip>
            </div>

        </>
    );
};

export default SinglePopularInstructor;