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
                <li className="UserNameAccountSection">{User_Name ? User_Name.fullname : (<p>--/--</p>)}</li>
                <div className="horizontalRule"></div>
                <li><a href="https://github.com/orgs/BharatSeva/discussions" target="_blank" rel="noreferrer">Help</a></li>
                <li>Preferances</li>
                <li><a href="https://github.com/BharatSeva" target="_blank" rel="noreferrer">Community</a></li>
                <li onClick={ClearTokenAndName}><Link to="/user/login" style={{ color: "white", textDecoration: "none" }}>Sign Out</Link></li>

            </ul>
        </div>
    )
}