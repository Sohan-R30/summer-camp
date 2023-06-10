import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../Providers/AuthProvider"


const PrivateRoute = ({ children }) => {
    const { user, userLoading } = useContext(AuthContext)
    const location = useLocation()
  
    if (userLoading) {
      return (
        <p>laoding...</p>
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