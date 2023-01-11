import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function NotLoggedInRoutes() {
    const { auth } = useSelector((state) => state.authReducer);

    return auth ? <Navigate to="/" /> : <Outlet />;
}