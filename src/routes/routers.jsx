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
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import AdminRoute from "./AdminRoute";
import MyselectedClasses from "../pages/Dashboard/Student/MyselectedClasses";
import MyenrolledClasses from "../pages/Dashboard/Student/MyenrolledClasses";
import InstructorRoute from "./InstructorRoute";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Addclasses from "../pages/Dashboard/Instructor/Addclasses";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import AllClasses from "../pages/AllClasses/AllClasses";
import PaymentPage from "../pages/PaymentForm/PaymentPage";
import PaymentHistory from "../pages/PaymentForm/PaymentHistory";
import AllInstructor from "../pages/AllInstructor/AllInstructor";
import OneInsturorClasses from "../pages/AllInstructor/OneInsturorClasses";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main></Main>,
            errorElement: <Error></Error>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>
                },
                {
                    path: "/instructors",
                    element: <AllInstructor></AllInstructor>
                },
                {
                    path: "/instructor/:email",
                    element: <OneInsturorClasses></OneInsturorClasses>
                },
                {
                    path: "/classes",
                    element: <AllClasses></AllClasses>
                },
                {
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: "/registration",
                    element: <Registration></Registration>
                },
            ]
        },
        {
            path: "dashboard",
            element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            errorElement: <Error></Error>,
            children: [
                {
                    path: "/dashboard",
                    element: <DashboardHome></DashboardHome>
                },
                {
                    path: "manage-users",
                    element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
                },
                {
                    path: "manage-classes",
                    element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
                },
                {
                    path: "myenrolled-classes",
                    element:<MyenrolledClasses></MyenrolledClasses>
                },
                {
                    path: "myselected-classes",
                    element:<MyselectedClasses></MyselectedClasses>
                },
                {
                    path: "myadded-classes",
                    element:<InstructorRoute> <Addclasses></Addclasses> </InstructorRoute>
                },
                {
                    path: "my-classes",
                    element:<InstructorRoute><MyClasses/></InstructorRoute>
                },
                {
                    path:"payment-stripe/:id",
                    element:<PaymentPage></PaymentPage>
                },
                {
                    path:"payment-history",
                    element: <PaymentHistory></PaymentHistory>
                }
            ]
        }

    ]
);

export default router;