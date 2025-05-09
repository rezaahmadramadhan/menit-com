import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate('/login')
        }
    }, [navigate]);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <Outlet />
            </div>
            <Sidebar />
        </div>
    );
}