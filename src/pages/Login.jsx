import { useForm } from "react-hook-form";
import SocialLogin from "../components/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const Login = () => {

    const { signIn } = useContext(AuthContext)
    const [err, setErr] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/"


    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(() => {
                reset();
                setErr("");
                navigate(from, { replace: true })

            })
            .catch(error => {
                setErr(error.message);
            })
    };


    return (
        <div>
            <div className='text-3xl text-center my-10'>
                <Fade delay={1e3} cascade damping={1e-1}>Please Login </Fade>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center gap-5"
            >
                <div className="relative w-2/4  mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label 
                    htmlFor="email" 
                    className="bg-[#83e0f5] rounded-md px-4 py-1 absolute -top-4 left-3 shadow-lg">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        name="email"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none "
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span>Provide a valid Email</span>}
                </div>

                <div className="relative my-5 w-2/4 mx-auto rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#ff11116f] to-[#e4de397e]">
                    <label 
                    htmlFor="password" 
                    className="bg-[#83e0f5] px-4 py-1 absolute -top-4 left-3 shadow-lg rounded-md">Password</label>
                    <input
                        type={`${showPassword ? "text" : "password"}`}
                        id="password"
                        autoComplete="on"
                        placeholder="Your Password"
                        name="password"
                        className="border-2 py-4 px-2 mx-auto rounded-md w-full focus:outline-none"
                        {...register("password", { required: true })}
                    />
                    {
                        showPassword ? (<p onClick={() => setShowPassword(false)} className="text-2xl absolute top-1/3 right-10"><FaEye /></p>) : (
                            <p onClick={() => setShowPassword(true)} className="text-2xl absolute top-1/3 right-10"><FaEyeSlash /></p>
                        )
                    }

                    {errors.password && <span>Password is not Correct</span>}
                </div>
                {
                err && <p className="text-xl text-center text-red-500">{err}</p>
            }
                <input 
                type="submit" 
                value="Login" 
                className="btn font-bold mx-auto w-2/4 rounded-md m-4 p-1 bg-gradient-to-r from-[#83e0f5d3] via-[#77dcf0] to-[#83e0f5d3] hover:bg-[#63c6cfd3] hover:via-[#1c637188]" />
            </form>
            <div className="divider w-2/4 mx-auto"></div>
            <div className="w-2/4 mx-auto text-center  flex items-center ">
                <SocialLogin>Login With Google</SocialLogin>
            </div>
            <div className="w-2/4 mx-auto py-2">
                <p>New to Summer Camp? <Link 
                to="/registration" className="text-[#14b0d3]">Please Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
