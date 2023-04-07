import { Link } from "react-router-dom"
import "./popups.css"





export default function AccountPopover() {
    const User_Name = localStorage.getItem("BharatSevaUserName")


    const ClearTokenAndName = () => {
        localStorage.clear();
    }




    return (
        <div className="Account_popover Account_popoverDisplay popups">
            <ul>
                <li>Signed in as</li>
                <li>{User_Name}</li>
                <div className="horizontalRule"></div>
                <li>Preferances</li>
                <li>Help</li>
                <li><a href="https://github.com/CaptainTron/BharatSeva_ReactJS/discussions/2" target="_blank">Community</a></li>
                <li onClick={ClearTokenAndName}><Link to="login" style={{ color: "white", textDecoration: "none" }}>Sign Out</Link></li>

            </ul>
        </div>
    )
}