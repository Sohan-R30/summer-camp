import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../hooks/useInstructor";


const AdminRoute = ({ children }) => {
    const { user, userLoading } = useContext(AuthContext)
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if (userLoading || isInstructorLoading) {
        return <p>Loading.......</p>
    }
    else if (user && isInstructor) {
        return children;
    }
    else {
        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }
};


export default AdminRoute;