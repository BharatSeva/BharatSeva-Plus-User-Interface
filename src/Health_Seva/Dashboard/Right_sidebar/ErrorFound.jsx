import { NavLink } from "react-router-dom"
import "./ErrorFound.css"

export default function ErrorFound() {




    return (
        <>
            <div className="WrongSession">
                <h2>Bharatseva+ User Inter-Face</h2>
                <h3>Something Got Wrong With Your Session...</h3>
                <p>This Is Unusual. <NavLink to='/user/login'>Login Again</NavLink>. If Problem Persists <a href="mailto:21vaibhav11@gmail.com">Mail</a> Me</p>
            </div>
        </>
    )
}
