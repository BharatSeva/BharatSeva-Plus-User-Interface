import Home from "./Home/Home"
import MyRecords from "./MyRecords/MyRecords"
import "./Right_sidebar.css"
import { Outlet, Link, Router } from "react-router-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from "../../Register_And_Login_Page/Register_Page";
import Issues from "../Issues/Issues";

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
            <Issues/>

            <Outlet />
        </div >
    )
}