import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";



export default function IsAuthenticated() {

    try {
        const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))
        if (UserData.healthId && UserData.token && UserData.name && UserData.IsAuthenticated) {
            return (
                <>
                    <Outlet />
                </>
            )
        } else {
            alert("Something Got Wrong With Your Session, Please Login Again!")
            return <Navigate to="/bharatseva-user/login" />
        }
    } catch (err) {
        alert("Session Expired, Please Login!")
        return < Navigate to="/bharatseva-user/login" />
    }


    return (<Outlet />)
}