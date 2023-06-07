import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { useContext } from 'react';

const AdminRoute = ({ children }) => {
    const { user, userLoading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (userLoading || isAdminLoading) {
        return <p>Loading.......</p>
    }
    else if (user && isAdmin) {
        return children;
    }
    else {
        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }
};


export default AdminRoute;