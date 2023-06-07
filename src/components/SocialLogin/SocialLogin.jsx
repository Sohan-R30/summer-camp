
import googleLogo from "../../assets/gogle-logo.svg"
const SocialLogin = ({children}) => {
    return (
        <button className="btn font-bold mx-auto w-full rounded-md bg-[#83f5c247] hover:bg-[#3daf7c88]" >
            <img className="w-8" src={googleLogo} alt="google logo" />
            {children}
        </button >
    );
};

export default SocialLogin;