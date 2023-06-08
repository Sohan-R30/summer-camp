import { useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Addclasses = () => {
    const [err, setErr] = useState("")

    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit =  (data) => {
        setErr("");
        // console.log(data, data?.classPhoto)
        // const formData = new FormData();
        // formData.append('photo', data?.classPhoto[0])
        // fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(res => res.json())
        // .then(imgResponse => {
        //     console.log("🚀 ~ file: Addclasses.jsx:28 ~ onSubmit ~ imgURL:", imgResponse)
        // })
        const storedClass = {
            ...data,
            status: "pending",
        }
        console.log(storedClass)
        axiosSecure.post("/classes/add", {storedClass})
            .then(data => {
                console.log(data)
                if(data.data.insertedId || data.status=== 200){
                    reset();
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Class Added Successfully',
                        showConfirmButton: false,
                        timer: 500
                      })
                }
            })
            .catch(error => {
                console.log(error);
            })

    };
    return (
        <div>
            <div className='text-3xl text-center my-10'>
                <Fade delay={1e3} cascade damping={1e-1}>Add Your Class</Fade>
            </div>

            {
                err && <p className="text-2xl text-red-500">{err}</p>
            }
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center gap-5"
                // encType="multipart/form-data"
            >
                <div className="relative w-2/4  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="className" className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Class name</label>
                    <input
                        type="text"
                        id="className"
                        placeholder="Your Class Name"
                        name="className"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                        {...register("className", { required: true })}
                    />
                    {errors.className && <span>Give Your Class Name</span>}
                </div>

                {/* <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="classPhoto" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Class Photo</label>
                    <input
                        type="file"
                        id="classPhoto"
                        placeholder="Upload Your Class Photo"
                        name="classPhoto"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none bg-white"
                        {...register("classPhoto", { required: true })}
                    />
                    {errors.classPhoto && <span>Please Upload A Photo</span>}
                </div> */}
                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="classPhoto" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Class Photo Url</label>
                    <input
                        type="url"
                        id="classPhoto"
                        placeholder="Give Your Class Url"
                        name="classPhoto"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none bg-white"
                        {...register("classPhoto", { required: true })}
                    />
                    {errors.classPhoto && <span>Please Upload A Photo</span>}
                </div>

                <div className="relative w-2/4  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="instructorName" className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Instructor name</label>
                    <input
                        type="text"
                        id="instructorName"
                        name="instructorName"
                        defaultValue={user?.displayName}
                        readOnly
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                        {...register("instructorName", { required: true })}
                    />
                </div>

                <div className="relative w-2/4  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="instructorEmail" className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Instructor Email</label>
                    <input
                        type="email"
                        id="instructorEmail"
                        name="instructorEmail"
                        defaultValue={user?.email}
                        readOnly
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                        {...register("instructorEmail", { required: true })}
                    />
                </div>

                <div className="relative w-2/4  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="availableSeats" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Available Seats</label>
                    <input
                        type="text"
                        id="availableSeats"
                        placeholder="Available Seats"
                        name="availableSeats"
                        className="border-2 py-3 px-2 mx-auto rounded-md w-full focus:outline-none"
                        {...register("availableSeats", { valueAsNumber: true })}
                    />
                     {errors.availableSeats && <span>Give Your Class Name</span>}
                </div>
                <div className="relative w-2/4  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="price" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Price</label>
                    <input
                        type="number"
                        id="price"
                        placeholder="price"
                        name="price"
                        className="border-2 py-3 px-2 mx-auto rounded-md w-full focus:outline-none"
                        {...register("price", { valueAsNumber: true })}
                    />
                     {errors.price && <span>Give Your Class Name</span>}
                </div>


                <input type="submit" value="Add A Class" className="btn font-bold mx-auto w-2/4 rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#77dcf0] to-[#83e0f5d3] hover:bg-[#63c6cfd3] hover:via-[#1c637188]" />
            </form>
        </div>
    );
};

export default Addclasses;