import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import SurveyView from "./views/SurveyView";

const Surveys = lazy(() => import("./views/Surveys"));
const SignUp = lazy(() => import("./views/SignUp"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const Login = lazy(() => import("./views/Login"));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Navigate to='/' />
      },
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/surveys',
        element: <Surveys />
      },
      {
        path: '/surveys/create',
        element: <SurveyView />
      },
      {
        path: '/surveys/:id',
        element: <SurveyView />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  },

])

export default router