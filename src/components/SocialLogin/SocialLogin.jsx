
import { useContext } from "react";
import googleLogo from "../../assets/gogle-logo.svg"
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SocialLogin = ({children}) => {
    const {googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/"
    const handleGoogleSingIn = () => {
        googleSignIn()
            .then((data) => {
                console.log("-----",data.user);
                const storedUser = { 
                    name: data?.user?.displayName, 
                    email: data?.user?.email,
                    photo: data?.user?.photoURL,
                }
                axios.put(`${import.meta.env.VITE_API_URL}/users/${data?.user?.email}`, {storedUser })
                .then((data) => {
                    console.log(data);
                    navigate(from, {replace: true})
                  })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <button onClick={handleGoogleSingIn} className="btn font-bold mx-auto w-full rounded-md bg-[#83f5c247] hover:bg-[#3daf7c88]" >
            <img className="w-8" src={googleLogo} alt="google logo" />
            {children}
        </button >
    );
};

export default SocialLogin;