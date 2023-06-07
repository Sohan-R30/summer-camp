import logo from "/public/logo.png"
import userLogo from "../../../../src/assets/user.png"
import Button from "../Button/Button";
import { useState } from "react";
const Header = () => {
    const user = "sohan";
    const [showProfileName, setShowProfileName] = useState(false)
    return (
        <div className="">
            <div className="bg-primaryColor text-black px-10 py-2 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img className="w-10" src={logo} alt="logo" />
                    <h3 className="text-2xl font-bold">Summer Camp</h3>
                </div>
                <div>
                    {
                        user ? (
                            <div onClick={() => setShowProfileName(!showProfileName)} className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={userLogo} />
                                </div>
                            </div>

                        ) : (
                            <div>
                                <Button>Login</Button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex justify-center items-center gap-24 text-xl bg-[#fff7f795] py-3 ">
                <p className="active-link">Home</p>
                <p className="active-link">Instructors</p>
                <p className="active-link">Classes</p>
                <p className="active-link">Dashboard</p>
                {showProfileName && <p className="active-link">Md. Zahidul Islam Shohan</p>}
            </div>
        </div>
    );
};

export default Header;
