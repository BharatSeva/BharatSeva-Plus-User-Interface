import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../Message";
import "./Login_page.css"



export default function LoginPage() {
    document.title = "Login | Bharat Seva";


    // UseEffect Condition Goes Here
    const [IsAuthenticated, SetAuthenticated] = useState(false);
    const [Credentials, SetCredentials] = useState()


    function Credential(e) {
        const { name, value } = e.target
        SetCredentials((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const LoginAPI = async () => {
        try {
            const Authorization = await fetch(`http://localhost:5000/api/v1/userauth/userlogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Credentials)
            })
            let Response = await Authorization.json()
            if (Authorization.ok) {
                sessionStorage.setItem("BharatSevaUser", JSON.stringify(Response))
                SetAuthenticated(true);
            } else {
                alert(Response.message)
            }
        } catch (err) {
            alert(err.message)
        }

    }

    const preventDefault = (e) => {
        e.preventDefault();
        LoginAPI();
    }

    return (
        <div>
            {/* This Will Redirect you to Dashboard if Condition is true */}
            {IsAuthenticated && (
                <div>
                    <Message message="Login Success..." />
                    <Navigate to="/" replace={true} />
                </div>
            )}


            <div className="RegisterContainer">
                <div className="LoginContainer">
                    <p className="BharatSeva_Registration">Bharat Seva</p >
                    <h2>Login Here</h2>

                    <form className="EnterDetails" onSubmit={preventDefault}>
                        <label>Enter Your Health ID</label><br></br>
                        <input type="Number" className="UserInputSectionLoginPage" placeholder="Enter Your Health ID" name="health_id" onChange={Credential} onKeyUp={Credential} required ></input><br></br>

                        <label>Enter Your Password</label><br></br>
                        <input type="password" className="UserInputSectionLoginPage" placeholder="Enter Your Password" name="password" onChange={Credential} onKeyUp={Credential} required ></input><br></br>

                        <input type="submit" value="Login" className="Submitbtn"></input>
                    </form>

                    <div className="Login">
                        <p className="RegisterLoginPage">Don't Have A Account ? <Link to="/register" className="RegisterBtn">Register Here</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

