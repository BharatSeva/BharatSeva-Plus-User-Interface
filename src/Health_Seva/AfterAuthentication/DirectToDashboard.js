import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";



export default function Redirect() {
    const [Authenticated, SetAuthenticated] = useState();
    
    useEffect(()=>{
        const IsAuthenticated = localStorage.getItem("IsAuhthenticated")
        if(IsAuthenticated){
            SetAuthenticated(IsAuthenticated);
        }
    },[])

    return (
        <div>
            {SetAuthenticated && <Dashboard/>}
        </div>
    )
}