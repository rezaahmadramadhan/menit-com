import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
    if (localStorage.getItem("access_token")) {
        return <Navigate to="/" />
    }

    return <Outlet />
}