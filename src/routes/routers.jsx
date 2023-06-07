import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element:<Main></Main>,
            errorElement:<p>Something Wrong!!</p>,
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
                    path: "/instructors",
                    element:  <p className='text-3xl text-center my-10'>THis is from Classes</p>
                },
                {
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: "/registration",
                    element: <Registration></Registration>
                }
            ]
        }
    ]
);

export default router;