import logo from "/public/logo.png"
import userLogo from "../../../../src/assets/user.png"
import Button from "../Button/Button";
import { useState } from "react";
import {Link, NavLink } from "react-router-dom";
const Header = () => {
    const user = false;
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
                                <Link to="/login"><Button>Login</Button></Link>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex justify-center items-center gap-24 text-xl bg-[#fff7f795] py-3 ">
            <NavLink to="/" className={({isActive}) => isActive ? 'active-link' : ''}>Home</NavLink>
            <NavLink to="/instructors" className={({isActive}) => isActive ? 'active-link' : ''}>Instructors</NavLink>
            <NavLink to="/classes" className={({isActive}) => isActive ? 'active-link' : ''}>Classes</NavLink>
            <p>Dashboard</p>
            {showProfileName && <p>Md. Zahidul Islam Shohan</p>}
            </div>
        </div>
    );
};

export default Header;

