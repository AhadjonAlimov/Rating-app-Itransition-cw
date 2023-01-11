import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";


export default function LoggedInRoutes() {
    const { auth } = useSelector((state) => state.authReducer);
    return auth ? <Outlet /> : <Login />;
}