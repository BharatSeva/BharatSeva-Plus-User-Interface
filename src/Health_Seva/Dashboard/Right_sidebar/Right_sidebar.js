import Home from "./Home/Home"
import MyRecords from "./MyRecords/MyRecords"
import "./Right_sidebar.css"
import { Outlet, Link, Router } from "react-router-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from "../../Register_And_Login_Page/Register_Page";
import Issues from "./Issues/Issues";


import LockAccount from "../Setting/LockAccount/LockAccount";
import Preferances from "../Setting/Preferances/Preferances";
import Permission from "../Setting/Permission/Permission";
import Settings from "../Setting/Settings";
import Stats from "./Stats/Stats";


import ShowHealthInfo_PopOver from "../SearchHealthFacilies/ShowHealthCareInfoPop";
import Appointment from "./Appointment/Appointment";





export default function Right_sidebar({ toggle }) {


    return (
        <div className="RightSideContainerGoesHere">

            {/* <Routes> */}
            {/* <Route path=""> */}

            {/* <Route path="Home" element={<Home />} />
            </Routes> */}

            {/* </Route> */}

            {/* <Home /> */}
            {/* <MyRecords/> */}
            {/* <Issues/> */}
            {/* <Settings/> */}
            {/* <Stats/> */}

            {/* <ShowHealthInfo_PopOver/> */}
            {/* <Appointment/> */}


            <Outlet />
        </div >
    )
}