import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../Message";
import "./Login_page.css";
import GoogleOAuth from "./GoogleAuth/GoogleOAuth";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function LoginPage() {
    document.title = "Login | Bharat Seva";

    const [IsAuthenticated, SetAuthenticated] = useState({
        IsAuthenticated: false,
        IsFetching: false,
        IsGood: false,
        Message: "😎"
    });
    const [Credentials, SetCredentials] = useState();

    function Credential(e) {
        const { name, value } = e.target;
        SetCredentials((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const LoginAPI = async () => {
        SetAuthenticated((p) => ({ ...p, IsFetching: true }));
        try {
            const Authorization = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/userauth/userlogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Credentials)
            });
            let Response = await Authorization.json();
            if (Authorization.ok) {
                sessionStorage.setItem("BharatSevaUser", JSON.stringify({ ...Response, IsAuthenticated: true }));
                SetAuthenticated((p) => ({ ...p, IsAuthenticated: true, IsGood: true }));
            } else {
                SetAuthenticated((p) => ({ ...p, Message: Response.message }));
                alert(Response.message);
            }
        } catch (err) {
            alert("Could Not Connect to Server...");
            SetAuthenticated((p) => ({ ...p, Message: "Could not Connect to Server..." }));
        }
        SetAuthenticated((p) => ({ ...p, IsFetching: false }));
    };

    const preventDefault = (e) => {
        e.preventDefault();
        LoginAPI();
    };

    return (
        <div className="MainContainer">
            {IsAuthenticated.IsFetching ? <Message message="Validating..." /> : (IsAuthenticated.IsGood ? <Message message="Validating..." /> : <Message message={`${IsAuthenticated.Message}`} />)}

            {IsAuthenticated.IsAuthenticated && (
                <div>
                    <Message message="Login Success..." />
                    <Navigate to="/user/dashboard" replace={true} />
                </div>
            )}
            
            <div className="LoginWrapper">
                <div className="IllustrationSection">
                    <div className="DoctorImage"></div>
                </div>

                <div className="FormSection">
                    <h1 className="BrandName">Bharat Seva+</h1>
                    <p className="Tagline">Serving country with love and dedication</p>
                    <form className="LoginForm" onSubmit={preventDefault}>
                        <label>Enter Your Health ID</label>
                        <input type="Number" className="InputField" placeholder="Health ID" name="health_id" onChange={Credential} onKeyUp={Credential} required />
                        
                        <label>Enter Your Password</label>
                        <input type="password" className="InputField" placeholder="Password" name="password" onChange={Credential} onKeyUp={Credential} required />
                        
                        <input type="submit" value={`${IsAuthenticated.IsFetching ? "Validating..." : "Login"}`} disabled={IsAuthenticated.IsFetching} className="SubmitBtn" />
                    </form>
                    
                    <div className="GoogleOAuthButton">
                        <p>Or</p>
                        <GoogleOAuthProvider clientId="476285565826-8smpt7q2bh9o1ace0iqn8lcmn52maele.apps.googleusercontent.com">
                            <GoogleOAuth />
                        </GoogleOAuthProvider>
                    </div>
                    
                    <p className="AccountPrompt">Don't Have an Account? <Link to="/user/register" className="RegisterBtn">Register Here</Link></p>
                </div>
            </div>
        </div>
    );
}
