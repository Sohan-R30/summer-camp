import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../Providers/AuthProvider"


const PrivateRoute = ({ children }) => {
    const { user, userloading } = useContext(AuthContext)
    const location = useLocation()
  
    if (userloading) {
      return <p>loding.....</p>
    }
  
    if (user) {
      return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
  }
  
  export default PrivateRoute;