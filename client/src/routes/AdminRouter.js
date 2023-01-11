import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";


export default function AdminRouter() {
    const { auth } = useSelector((state) => state.authReducer);

    return auth.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
