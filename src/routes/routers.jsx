import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element:<Main></Main>,
            errorElement:<Error></Error>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>
                },
                {
                    path: "/instructors",
                    element:  <p className='text-3xl text-center my-10'>THis is from Instructor</p>
                },
                {
                    path: "/classes",
                    element:  <p className='text-3xl text-center my-10 text-black'>THis is from Classes</p>
                },
                {
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: "/registration",
                    element: <Registration></Registration>
                },
                {
                    path: "/dashboard",
                    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
                }
            ]
        },
        
    ]
);

export default router;