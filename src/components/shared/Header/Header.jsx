import logo from "../../../assets/logo.png"
import userLogo from "../../../../src/assets/user.png"
import Button from "../Button/Button";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Switch } from '@headlessui/react'
const Header = () => {
    const [enabled, setEnabled] = useState(false)
    const { user, logOutUser } = useContext(AuthContext);
    const handleLogOut = () => {
        logOutUser()
            .then(() => {
            })
    }
    useEffect(() => {
        if(enabled){
            sessionStorage.setItem("theme", "dark")
        }
        else{
            sessionStorage.setItem("theme", "light")
        }
        const theme = sessionStorage.getItem("theme") || "light"
        document.querySelector("html").setAttribute("data-theme", theme)
    },[enabled])
    const [showProfileName, setShowProfileName] = useState(false)
    return (
        <div>
            <div className={`bg-primaryColor ${enabled ? "text-white" : "text-black"} px-10 py-2 flex flex-wrap justify-center gap-5 sm:justify-between items-center`}>
                <Link to="/">
                    <div className="flex items-center gap-4 ">
                        <img referrerPolicy="no-referrer" className="w-8 sm:w-10" src={logo} alt="logo" />
                        <h3 className="text-sm sm:text-2xl font-bold">Summer Camp</h3>
                    </div>
                </Link>
                <div>
                    {
                        user ? (
                            <div className="flex justify-center items-center gap-3">
                                <div 
                                    onClick={() => setShowProfileName(!showProfileName)} 
                                    className="avatar">
                                    <div className="w-10 rounded-full">
                                        {
                                            user.photoURL ? (
                                                <img src={user?.photoURL} />
                                            ) : (
                                                <img src={userLogo} />
                                            )
                                        }
                                    </div>
                                </div>
                                <div onClick={handleLogOut}>
                                    <Button>Log Out</Button>
                                </div>
                            </div>

                        ) : (
                            <div>
                                <Link to="/login"><Button>Login</Button></Link>
                            </div>
                        )
                    }
                </div>
                { enabled && <div className="flex flex-wrap justify-center items-center gap-2">
                    <p>Enable Light Mode</p>
                    <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-[#000]' : 'bg-[#1889af]'}
                      relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                        pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                }
                 { enabled || <div className="flex flex-wrap justify-center items-center gap-2">
                    <p>Enable Dark Mode</p>
                    <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-[#000]' : 'bg-[#1889af]'}
                      relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                        pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                }
            </div>
            <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-24 text-base sm:text-xl bg-[#fff7f795] py-3 ">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
                <NavLink to="/instructors" className={({ isActive }) => isActive ? 'active-link' : ''}>Instructors</NavLink>
                <NavLink to="/classes" className={({ isActive }) => isActive ? 'active-link' : ''}>Classes</NavLink>
                <Link to="/dashboard"><p>Dashboard</p></Link>
                {showProfileName && <p>{user.displayName}</p>}
            </div>
        </div>
    );
};

export default Header;

