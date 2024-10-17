import { Navigate, Outlet } from "react-router-dom";


export default function IsAuthenticated() {

    try {
        const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))
        if (UserData.healthId && UserData.token && UserData.name && UserData.IsAuthenticated) {
            return (
                <>
                    <Outlet />
                </>
            )
        } 
        else if (!UserData.IsAuthenticated) {
            alert("Request Limit Reached")
            return <Navigate to="/user/login" />
        }
        //  else {
        //     alert("Something Got Wrong With Your Session, Please Login Again!")
        //     return <Navigate to="/bharatseva-user/login" />
        // }
    } catch (err) {
        alert("Session Expired, Please Login!")
        return < Navigate to="/user/login" />
    }


    return (<Navigate to="/user/login" />)
}