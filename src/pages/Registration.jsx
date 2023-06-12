import { useForm } from "react-hook-form";
import SocialLogin from "../components/SocialLogin/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import Swal from 'sweetalert2'



const Registration = () => {

    const [err, setErr] = useState("")

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setErr("");
        const formData = new FormData();
        formData.append('image', data?.photo[0])
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(photoUrl => {
                data.photo = photoUrl?.data?.display_url
                createUser(data.email, data.password)
                    .then(() => {
                        updateUserProfile(data.name, data.photo)
                            .then(() => {
                                const storedUser = {
                                    name: data?.name,
                                    email: data?.email,
                                    photo: data?.photo,
                                    gender: data?.gender,
                                    phone: data?.phone,
                                    address: data?.address
                                }

                                axios.put(`${import.meta.env.VITE_API_URL}/users/${data?.email}`, { storedUser })
                                    .then((data) => {

                                        if (data?.data?.upsertedCount > 0) {
                                            Swal.fire({
                                                position: 'top-center',
                                                icon: 'success',
                                                title: 'User Added Successfully',
                                                showConfirmButton: false,
                                                timer: 500
                                            })
                                            setTimeout(() => {
                                                navigate(-2)
                                            }, 500)
                                        }
                                    })
                            })
                    })
            })
    };
    return (
        <div>
            <div className='text-3xl text-center my-10'>
                <Fade delay={1e3} cascade damping={1e-1}>Please Registration </Fade>
            </div>

            {
                err && <p className="text-2xl text-red-500">{err}</p>
            }
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center gap-5"
                encType="multipart/form-data"
            >
                <div className="relative w-2/4  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="name" className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        name="name"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>Give Your Name</span>}
                </div>
                <div className="relative w-2/4  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="email" className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        name="email"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span>Provide A valid Email</span>}
                </div>

                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label
                        htmlFor="password"
                        className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Your Password"
                        autoComplete="on"
                        name="password"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none"
                        {...register("password", { required: true, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{6,})$/ },)}
                    />
                    {errors.password && <span>Provide Valid Password One Capital letter, One Special Character and minimum 6 character</span>}
                </div>

                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="confirmPassword" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Confirm</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        autoComplete="on"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none"
                        {...register("confirmPassword", { required: true, validate: (value) => value === watch('password') })}
                    />
                    {errors.confirmPassword && <span>Does not match Your Password</span>}
                </div>
                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="photo" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Upload Class Photo</label>
                    <input
                        type="file"
                        id="photo"
                        placeholder="Upload Your Class Photo"
                        name="photo"
                        accept="image/*"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none bg-white"
                        {...register("photo", { required: true })}
                    />
                    {errors.photo && <span>Please Upload A Photo</span>}
                </div>
                <div className=" w-2/4 mx-auto grid grid-cols-2 gap-2">
                    <div className="relative my-5 w-full  rounded-md  p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                        <label htmlFor="gender" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Gender</label>
                        <select {...register("gender")} id="gender" className="border py-4 px-2 mx-auto rounded-md w-full focus:outline-none">
                            <option value="select" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="relative my-5 w-full rounded-md p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                        <label htmlFor="phone" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Phone</label>
                        <input
                            type="number"
                            id="phone"
                            placeholder="Phone Number"
                            name="phone"
                            className="border-2 py-3 px-2 mx-auto rounded-md w-full focus:outline-none"
                            {...register("phone", { valueAsNumber: true, maxLength: 11 })}
                        />
                    </div>
                </div>
                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label
                        htmlFor="address"
                        className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Address</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Your Address"
                        name="address"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none"
                        {...register("address")}
                    />
                </div>
                <input
                    type="submit"
                    value="Sign Up"
                    className="btn font-bold mx-auto w-2/4 rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#77dcf0] to-[#83e0f5d3] hover:bg-[#63c6cfd3] hover:via-[#1c637188]" />
            </form>
            <div className="divider w-2/4 mx-auto"></div>
            <div className="w-2/4 mx-auto text-center  flex items-center ">
                <SocialLogin>Sign Up With Google</SocialLogin>
            </div>
            <div className="w-2/4 mx-auto py-2">
                <p>Already have an account? <Link to="/login" className="text-[#14b0d3]">Please Login</Link></p>
            </div>
        </div>
    );
};

export default Registration;