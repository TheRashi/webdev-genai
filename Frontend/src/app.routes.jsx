import { createBrowserRouter } from "react-router";
import Login from "./Features/Auth/Pages/login";
import Register from "./Features/Auth/Pages/register";
import Protected from "./Features/Auth/Component/protected";
import Home from "./Features/Interview/Pages/home";
import Interview from "./Features/Interview/Pages/interview";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
])