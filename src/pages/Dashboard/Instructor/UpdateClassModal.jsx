import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateClassModal = ({ setIsOpen, isOpen, singleClass, refetch }) => {

    const { availableSeats, className, price, status, totalEnrolledStudent } = singleClass.storedClass || {}
    const [err, setErr] = useState("")

    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setErr("");
        const formData = new FormData();
        formData.append('image', data?.updateClassPhoto[0])
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(photoUrl => {
                data.updateClassPhoto =  photoUrl?.data?.display_url
                const storedClass = {
                    className: data?.updateClassName,
                    classPhoto: data?.updateClassPhoto,
                    instructorName: data?.updateInstructorName,
                    instructorEmail: data?.upadeInstructorEmail,
                    availableSeats: data?.updateAvailableSeats,
                    price: data?.updatePrice,
                    status: status,
                    totalEnrolledStudent: totalEnrolledStudent
                }
                axiosSecure.patch(`/classes/update/${singleClass?._id}`, { storedClass })
                    .then(data => {
                        if (data?.data?.modifiedCount || data.status === 200) {
                            refetch()
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Class Updated Successfully',
                                showConfirmButton: false,
                                timer: 500
                            })
                            setIsOpen(false)
                        }
                    })
            })
    };
    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70 blur-md" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div>
                                        <div className='text-3xl text-center my-10'>
                                            <Fade delay={1e3} cascade damping={1e-1}>Update Your Class</Fade>
                                        </div>

                                        {
                                            err && <p className="text-2xl text-red-500">{err}</p>
                                        }
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="flex flex-col justify-center gap-5"
                                        >
                                            <div className="relative w-full  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                                                <label
                                                    htmlFor="updateClassName"
                                                    className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Class name</label>
                                                <input
                                                    type="text"
                                                    id="updateClassName"
                                                    placeholder="Update Your Class Name"
                                                    defaultValue={className}
                                                    name="updateClassName"
                                                    className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                                                    {...register("updateClassName", { required: true })}
                                                />
                                                {errors.updateClassName && <span>Give Your Class Name</span>}
                                            </div>
                                            <div className="relative my-5 w-full mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                                                <label
                                                    htmlFor="updateClassPhoto"
                                                    className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Update Class Photo</label>
                                                <input
                                                    type="file"
                                                    id="updateClassPhoto"
                                                    placeholder="Update Your Class Photo"
                                                    // defaultValue={classPhoto}
                                                    name="updateClassPhoto"
                                                    accept="image/*"
                                                    className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none bg-white"
                                                    {...register("updateClassPhoto", { required: true })}
                                                />
                                                {errors.updateClassPhoto && <span>Please Upload A Photo</span>}
                                            </div>

                                            <div className="relative w-full  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                                                <label
                                                    htmlFor="updateInstructorName"
                                                    className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Instructor name</label>
                                                <input
                                                    type="text"
                                                    id="updateInstructorName"
                                                    name="updateInstructorName"
                                                    defaultValue={user?.displayName}
                                                    readOnly
                                                    className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                                                    {...register("updateInstructorName", { required: true })}
                                                />
                                            </div>

                                            <div className="relative w-full  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                                                <label
                                                    htmlFor="upadeInstructorEmail"
                                                    className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Instructor Email</label>
                                                <input
                                                    type="email"
                                                    id="upadeInstructorEmail"
                                                    name="upadeInstructorEmail"
                                                    defaultValue={user?.email}
                                                    readOnly
                                                    className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                                                    {...register("upadeInstructorEmail", { required: true })}
                                                />
                                            </div>

                                            <div className="relative w-full  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                                                <label htmlFor="updateAvailableSeats" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Available Seats</label>
                                                <input
                                                    type="text"
                                                    id="updateAvailableSeats"
                                                    placeholder="Update Available Seats"
                                                    name="updateAvailableSeats"
                                                    defaultValue={availableSeats}
                                                    className="border-2 py-3 px-2 mx-auto rounded-md w-full focus:outline-none"
                                                    {...register("updateAvailableSeats", { valueAsNumber: true })}
                                                />
                                                {errors.updateAvailableSeats && <span>Give Your Class Name</span>}
                                            </div>
                                            <div className="relative w-full  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                                                <label htmlFor="updatePrice" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Price</label>
                                                <input
                                                    type="number"
                                                    id="updatePrice"
                                                    placeholder="Update Price"
                                                    defaultValue={price}
                                                    name="updatePrice"
                                                    className="border-2 py-3 px-2 mx-auto rounded-md w-full focus:outline-none"
                                                    {...register("updatePrice", { valueAsNumber: true })}
                                                />
                                                {errors.updatePrice && <span>Give Your Class Name</span>}
                                            </div>
                                            <input
                                                type="submit"
                                                value="Update Class"
                                                className="btn font-bold mx-auto w-full rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#77dcf0] to-[#83e0f5d3] hover:bg-[#63c6cfd3] hover:via-[#1c637188]"
                                            />
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default UpdateClassModal;