import "./Right_sidebar.css"
import Home from "./Home/Home"
import MyRecords from "./MyRecords/MyRecords"
import Issues from "./Issues/Issues";
import Settings from "../Setting/Settings";
import Stats from "./Stats/Stats";
import { default as ShowHealthInfoPopOver } from "../SearchHealthFacilies/ShowHealthCareInfoPop";
import Appointment from "./Appointment/Appointment";
import { Route, Routes } from "react-router-dom";
import IsAuthenticated from "../../AfterAuthentication/IsAuthenticated";
import About from "../About";
import ActivityLog from "./ActivityLog/ActivityLog";





export default function Right_sidebar() {

    return (
        <div className="RightSideContainerGoesHere">
            <Routes>
                <Route element={<IsAuthenticated />}>
                    <Route index element={<About />} />
                    <Route path="home" element={<Home />} />
                    <Route path="myrecords" element={<MyRecords />} />
                    <Route path="issues" element={<Issues />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="stats" element={<Stats />} />
                    <Route path="searchhealthcare" element={<ShowHealthInfoPopOver />} />
                    <Route path="appointment" element={<Appointment />} />
                    <Route path="activitylog" element={<ActivityLog />} />
                </Route>
            </Routes>
        </div >
    )
}