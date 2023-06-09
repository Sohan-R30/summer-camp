import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../components/shared/Footer/Footer";
import Header from "../../components/shared/Header/Header";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    return (
        <div>
            <Header></Header>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content min-h-screen">
                    <label htmlFor="my-drawer-2" className="btn bg-[#40b8f8] drawer-button lg:hidden drawer-end my-10">Open drawer</label>
                    <div className="m-10 ">
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div>
                        <>
                            {
                                isAdmin ? (
                                    <ul className="menu py-10 px-5 bg-primaryColor text-base-content font-bold text-xl flex  min-h-screen gap-5">
                                        <NavLink to="/dashboard/manage-classes"
                                            className={({ isActive }) => isActive ? 'active-link' : ''}
                                        >Manage Classes
                                        </NavLink>
                                        <NavLink
                                            to="/dashboard/manage-users"
                                            className={({ isActive }) => isActive ? 'active-link' : ''}
                                        >Manage Users
                                        </NavLink>
                                    </ul>
                                ) : isInstructor ? (
                                    <ul className="menu py-10 px-5 bg-primaryColor text-base-content font-bold text-xl flex  min-h-screen gap-5">
                                        <NavLink to="/dashboard/myadded-classes"
                                            className={({ isActive }) => isActive ? 'active-link' : ''}
                                        >Add a Class
                                        </NavLink>
                                        <NavLink
                                            to="/dashboard/my-classes"
                                            className={({ isActive }) => isActive ? 'active-link' : ''}
                                        >My Classes
                                        </NavLink>

                                    </ul>
                                ) : (
                                    <ul className="menu py-10 px-5 bg-primaryColor text-base-content font-bold text-xl flex  min-h-screen gap-5">
                                        <NavLink to="/dashboard/myselected-classes"
                                            className={({ isActive }) => isActive ? 'active-link' : ''}
                                        >My Selected Classes
                                        </NavLink>
                                        <NavLink
                                            to="/dashboard/myenrolled-classes"
                                            className={({ isActive }) => isActive ? 'active-link' : ''}
                                        >My Enrolled Classes
                                        </NavLink>
                                        <NavLink
                                            to="/dashboard/payment-history"
                                            className={({ isActive }) => isActive ? 'active-link' : ''}
                                        >My Payment History
                                        </NavLink>

                                    </ul>
                                )
                            }
                            
                        </>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;