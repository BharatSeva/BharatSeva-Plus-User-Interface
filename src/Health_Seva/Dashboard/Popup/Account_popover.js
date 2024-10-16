import { Link } from "react-router-dom"
import "./popups.css"





export default function AccountPopover() {
    const User_Name = JSON.parse(sessionStorage.getItem("BharatSevaUser"))


    const ClearTokenAndName = () => {
        sessionStorage.clear();
    }
    return (
        <div className="Account_popover Account_popoverDisplay popups">
            <ul>
                <li>Signed in as</li>
                <li className="UserNameAccountSection">{User_Name ? User_Name.name : (<p>--/--</p>)}</li>
                <div className="horizontalRule"></div>
                <li>Preferances</li>
                <li>Help</li>
                <li><a href="https://github.com/CaptainTron/BharatSeva_ReactJS/discussions/2" target="_blank" rel="noreferrer">Community</a></li>
                <li onClick={ClearTokenAndName}><Link to="/user/login" style={{ color: "white", textDecoration: "none" }}>Sign Out</Link></li>

            </ul>
        </div>
    )
}