import { useForm } from "react-hook-form";
import SocialLogin from "../components/SocialLogin/SocialLogin";
import { Link } from "react-router-dom";
const Registration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div>
            <p className='text-3xl text-center my-10'>Please Registration</p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center gap-5"
            >
                <div className="relative w-2/4  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="name" className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Name</label>
                    <input
                        type="text"
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
                        placeholder="Your Email"
                        name="email"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span>Provide A valid Email</span>}
                </div>

                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="password" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Password</label>
                    <input
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span>Provide Valid Password</span>}
                </div>

                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="confirmPassword" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Confirm</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none"
                        {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && <span>Does not match Your Password</span>}
                </div>

                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="photo" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Photo</label>
                    <input
                        type="file"
                        placeholder="Upload Photo"
                        name="photo"
                        accept='image/*'
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none bg-white"
                        {...register("photo", { required: true })}
                    />
                    {errors.photo && <span>This field is required</span>}
                </div>
                <div className=" w-2/4 mx-auto grid grid-cols-2 gap-2">
                    <div className="relative my-5 w-full  rounded-md  p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                        <label htmlFor="gender" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Gender</label>
                        <select {...register("gender")} className="border py-4 px-2 mx-auto rounded-md w-full focus:outline-none">
                            <option value="female">female</option>
                            <option value="male">male</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                    <div className="relative my-5 w-full rounded-md p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                        <label htmlFor="phone" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Phone</label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            className="border-2 py-3 px-2 mx-auto rounded-md w-full focus:outline-none"
                            {...register("phone")}
                        />
                    </div>
                </div>
                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label htmlFor="address" className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Address</label>
                    <input
                        type="text"
                        placeholder="Your Address"
                        name="address"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none"
                        {...register("address")}
                    />
                </div>
                <input type="submit" value="Sign Up" className="btn font-bold mx-auto w-2/4 rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#77dcf0] to-[#83e0f5d3] hover:bg-[#63c6cfd3] hover:via-[#1c637188]" />
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