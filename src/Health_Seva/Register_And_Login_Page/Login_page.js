import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link, useSearchParams } from "react-router-dom";
import Message from "../Message";
import "./Login_page.css";
import GoogleOAuth from "./GoogleAuth/GoogleOAuth";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function LoginPage() {
    document.title = "Login | Bharat Seva";
    const [params] = useSearchParams();
    
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isFetching: false,
        isGood: false,
        message: "😎"
    });
    const [credentials, setCredentials] = useState({
        health_id: "",
        password: ""
    });

    useEffect(()=>{
        setCredentials(e => ({
            "health_id": params.get("health_id"),
            "password": params.get("pass")
        }));
    },[params])

    function handleInputChange(e) {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const loginUser = async () => {
        setAuthState(prev => ({ ...prev, isFetching: true }));
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (response.ok) {
                // Store all relevant user data from the response
                const userData = {
                    fullname: data.fullname,
                    health_id: data.health_id,
                    token: data.token,
                    isAuthenticated: true
                };

                // Save to session storage
                sessionStorage.setItem("BharatSevaUser", JSON.stringify(userData));

                // Update state to trigger navigation
                setAuthState(prev => ({
                    ...prev,
                    isAuthenticated: true,
                    isGood: true,
                    message: "Login Success!"
                }));
            } else {
                setAuthState(prev => ({
                    ...prev,
                    message: data.message || "Login failed",
                    isGood: false
                }));
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setAuthState(prev => ({
                ...prev,
                message: "Could not connect to server...",
                isGood: false
            }));
            alert("Could not connect to server...");
        } finally {
            setAuthState(prev => ({ ...prev, isFetching: false }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    };

    // If authenticated, show success message and redirect
    if (authState.isAuthenticated) {
        return (
            <>
                <Message message="Login Success..." />
                <Navigate to="/client/dashboard" replace={true} />
            </>
        );
    }

    // console.log(params.get("healthcare_id"))
    // console.log(params.get("pass"))

    return (
        <div className="MainContainer">
            <Message
                message={
                    authState.isFetching
                        ? "Validating..."
                        : authState.message
                }
            />

            <div className="LoginWrapper">
                <div className="IllustrationSection">
                    <div className="DoctorImage"></div>
                </div>

                <div className="FormSection">
                    <h1 className="BrandName">Bharat Seva+</h1>
                    <p className="Tagline">Serving country with love and dedication</p>

                    <form className="LoginForm" onSubmit={handleSubmit}>
                        <label>Enter Your Health ID</label>
                        <input
                            type="text"
                            className="InputField"
                            placeholder="Health ID"
                            name="health_id"
                            value={params.get("health_id") !== "" ? params.get("health_id") : credentials.health_id}
                            onChange={handleInputChange}
                            // disabled={!!credentials.health_id}
                            required
                        />

                        <label>Enter Your Password</label>
                        <input
                            type="password"
                            className="InputField"
                            placeholder="Password"
                            name="password"
                            value={params.get("pass") !== "" ? params.get("pass") : credentials.password}
                            onChange={handleInputChange}
                            // disabled={!!credentials.password}
                            required
                        />

                        <input
                            type="submit"
                            value={authState.isFetching ? "Validating..." : "Login"}
                            disabled={authState.isFetching}
                            className="SubmitBtn"
                        />
                    </form>

                    <div className="GoogleOAuthButton">
                        <p>Or</p>
                        <GoogleOAuthProvider clientId="476285565826-8smpt7q2bh9o1ace0iqn8lcmn52maele.apps.googleusercontent.com">
                            <GoogleOAuth />
                        </GoogleOAuthProvider>
                    </div>

                    <p className="AccountPrompt">
                        Don't Have an Account? <Link to="/client/register" className="RegisterBtn">Register Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}