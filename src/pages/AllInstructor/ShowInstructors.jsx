import { useState } from "react";
import cardbg from "../../assets/ShinyOverlay.svg"
import CardFlip from "react-card-flip";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ClassesName from "./ClassesName";
import Button from "../../components/shared/Button/Button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";



const ShowInstructors = ({ singleClass }) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const { name, photo, gender, phone, address } = singleClass.storedUser || {}

    const backgrounStyle = {
        backgroundImage: `url(${cardbg})`,
    };

    const { data: instrutorClasses } = useQuery({
        queryKey: ["classes", singleClass?.email],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/users/classes/${singleClass?.email}`)
            return res?.data;
        }
    })

    return (
        <div className="rounded-2xl">
            <Helmet>
                <title>Summer Camp | {name}</title>
            </Helmet>
            <CardFlip
                isFlipped={isFlipped}
                flipDirection="vertical"
                flipSpeedBackToFront={2}
                flipSpeedFrontToBack={2}
            >
                <div onMouseEnter={() => setIsFlipped(!isFlipped)} className="card w-60 sm:w-80 min-h-[450px]  shadow-xl border-2 ">
                    <img className="h-52 rounded-xl" src={photo} alt="card image" />
                    <div className="card-body bg-[#7dadad26]">
                        <div className="flex items-center">
                            <h2><span className="font-semibold text-gray-400">Instructor</span> : <span>{name}</span></h2>
                        </div>
                        {gender && <p><span className="font-semibold text-gray-400">Gender</span> : <span>{gender}</span></p>}
                        {phone && <p><span className="font-semibold text-gray-400">Phone</span> : <span>{phone}</span></p>}
                        {instrutorClasses && Array.isArray(instrutorClasses) && <p>
                            <span className="font-semibold text-gray-400">Total Number of Classes </span> : <span>{instrutorClasses?.length}</span>
                        </p>}
                        <p>Class Names : </p>
                        <div className="flex flex-wrap justify-around">
                        {
                            instrutorClasses && Array.isArray(instrutorClasses) ? instrutorClasses?.map(classes => <ClassesName 
                                data={classes} key={classes._id}>
                                </ClassesName>) : ""
                        }
                        </div>
                    </div>
                </div>
                <div 
                style={backgrounStyle} 
                onMouseLeave={() => setIsFlipped(!isFlipped)} 
                className="border-2 w-auto sm:w-80 py-32 flex flex-col gap-2 px-8 sm:justify-center sm:items-center shadow-xl rounded-lg mx-auto">
                    {address && <p className="sm:w-max ml-4 overflow-hidden"><span className="font-semibold text-gray-400">Address</span> : <span>{address.slice(0,12)}</span></p>}
                    {address && <p className="sm:w-max ml-4 overflow-hidden"><span>{address.slice(12)}</span></p>}
                    <p className="sm:w-max ml-4 overflow-hidden"><span className="font-semibold text-gray-400">Email</span> : <span>{singleClass?.email.slice(0,12)}</span></p>
                    <p className="sm:w-max ml-4 overflow-hidden"><span>{singleClass?.email.slice(12)}</span></p>
                    <Link to={`/instructor/${singleClass?.email}`} className="mt-5">
                        <Button>See  Classes</Button>
                    </Link>
                </div>
            </CardFlip>
        </div>
    );
};

export default ShowInstructors;