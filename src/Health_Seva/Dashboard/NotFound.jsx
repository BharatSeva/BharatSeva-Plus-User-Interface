import { NavLink } from "react-router-dom";
import "./NotFound.css"
export default function NotFound() {

    return (
        <>
            <div className="NotFoundContainer">
                <h2>Bharat Seva+ </h2>
                <h2>404</h2>
                <h3>Seems Like Page You are trying for does not Exists!</h3>
                <p>Invalid Link Or You Don't have access to this page!</p>
                <p>Go to <NavLink to="/bharatseva-user/dashboard">DashBoard</NavLink></p>
            </div>
        </>
    )
}