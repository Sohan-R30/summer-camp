import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../Providers/AuthProvider"
import BarLoader from "react-spinners/BarLoader";


const PrivateRoute = ({ children }) => {
    const { user, userLoading } = useContext(AuthContext)
    const location = useLocation()
  
    if (userLoading) {
      return (
        <p><BarLoader color="#38ecd4" /></p>
      )
  }
  if (user) {
      return children
  }
  return (
      <Navigate state={{ from: location }} to="/login" replace></Navigate>
  );
};
export default PrivateRoute;