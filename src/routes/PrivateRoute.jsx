import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../Providers/AuthProvider"


const PrivateRoute = ({ children }) => {
    const { user, userLoading } = useContext(AuthContext)
    const location = useLocation()
  
    if(userLoading) {
      return <p>loding.....</p>
    }
    else if(user){
      return children
    }
    else{
      return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
  }
  
  export default PrivateRoute;