import {lazy} from "react";
import { createBrowserRouter } from "react-router-dom";
import Surveys from "./views/Surveys";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import GuestLayout from "./components/GuestLayout";

const Login = lazy(() => import("./views/Login"))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard/>
    },
    {
        path: '/surveys',
        element: <Surveys/>
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'signup',
                element: <SignUp/>
            }
        ]
    },
    
])

export default router