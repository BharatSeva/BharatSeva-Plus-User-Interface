import "./Left_sidebar.css"
import { NavLink } from "react-router-dom"

export default function Left_sidebar({ toggle, toggleHiddenMessage }) {
    // This one for menu options
    function settingMenu() {
        let Extramenu_setting = document.querySelector(".Extramenu")
        Extramenu_setting.classList.toggle("Extramenu-settingDisplay")
    }

    return (
        <>
            {/* <Navigate to="/Home" replace={true}/> */}
            <div className="LLside">
                {/* Container Goes Here */}
                <div className="column_container">
                    {/* <!-- Text COntainer Goes Here --> */}
                    <div className="column_textcontainer">
                        <NavLink className={({ isActive }) => isActive ? "IsActive" : ""} to='home' end><div className="col Home"><i className="fa-solid fa-house-user"></i> <div className="Home-innetxt">Home</div></div></NavLink>
                        <NavLink className={({ isActive }) => isActive ? "IsActive" : ""} to='myrecords'><div className="col Profile"><i className="fa-regular fa-id-badge"></i><div className="Profile-txt">My Records</div></div></NavLink>
                        <NavLink className={({ isActive }) => isActive ? "IsActive" : ""} to='issues'><div className="col Issues"><i className="fa-solid fa-file-medical"></i><div className="Profile-txt">Issues</div></div></NavLink>
                        <NavLink className={({ isActive }) => isActive ? "IsActive" : ""} to='settings'><div className="col Setting " ><i className="fa-solid fa-gear"></i>
                            <div className="Setting-txt"><div className="Settingtxtcontent">Settings</div>
                                <div className="Setting-fontawesome"><i className="fa-solid fa-chevron-down" onClick={settingMenu}></i></div></div>
                        </div>
                        </NavLink>

                        <div className="Extramenu">
                            <ul>
                                <li>Permission</li>
                                <li>Preferances</li>
                                <li>Lock My Account</li>
                            </ul>
                        </div>

                        <NavLink className={({ isActive }) => isActive ? "IsActive" : ""} to='appointment'><div className="col Home"><i className="fa-solid fa-calendar-check"></i> <div className="Home-innetxt">Appointments</div></div></NavLink>
                        <NavLink className={({ isActive }) => isActive ? "IsActive" : ""} to='stats'><div className="col Home"><i className="fa-solid fa-clock-rotate-left"></i> <div className="Home-innetxt">Stats</div></div></NavLink>
                        <NavLink className={({ isActive }) => isActive ? "IsActive" : ""} to='activitylog'><div className="col Home"><i className="fa-solid fa-scroll"></i> <div className="Home-innetxt">Activity Log</div></div></NavLink>




                    </div>

                    <div className="LLside_downside">
                        <ul>
                            <li>Contact Us</li>
                            <NavLink to='user/dashboard'><li>About Us</li></NavLink>
                            <li>Privacy Policy</li>
                            <li>Security</li>
                            <li> Our Data Centers</li>
                        </ul>
                    </div>

                </div>

            </div>
        </>
    )
}