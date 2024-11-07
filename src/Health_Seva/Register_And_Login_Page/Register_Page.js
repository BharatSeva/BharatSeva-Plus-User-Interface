import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../Message";
import "./Login_page.css";


export default function RegistrationPage() {
    document.title = "Register | Bharat Seva";

    const [IsAuthenticated, SetAuthenticated] = useState({
        IsAuthenticated: false,
        IsFetching: false,
        IsGood: false,
        Message: "😎"
    });
    const [Credentials, SetCredentials] = useState({
        name: '',
        email: '',
        health_id: '',
        password: '',
        confirmPassword: ''
    });

    function handleInput(e) {
        const { name, value } = e.target;
        SetCredentials((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const RegisterAPI = async () => {
        SetAuthenticated((p) => ({ ...p, IsFetching: true }));
        try {
            const Authorization = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
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
        RegisterAPI();
    };

    return (
        <div className="MainContainer">
            {IsAuthenticated.IsFetching ? <Message message="Registering..." /> : (IsAuthenticated.IsGood ? <Message message="Success!" /> : <Message message={`${IsAuthenticated.Message}`} />)}

            {IsAuthenticated.IsAuthenticated && (
                <div>
                    <Message message="Registration Successful..." />
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

                        <label>Enter Your Email</label>
                        <input type="email" className="InputField" placeholder="Email" name="email" onChange={handleInput} required />

                        <label>Enter Your Health ID</label>
                        <input type="text" className="InputField" placeholder="Health ID" name="health_id" onChange={handleInput} required />

                        <label>Create a Password</label>
                        <input type="password" className="InputField" placeholder="Password" name="password" onChange={handleInput} required />

                        <label>Confirm Password</label>
                        <input type="password" className="InputField" placeholder="Confirm Password" name="confirmPassword" onChange={handleInput} required />

                        <input type="submit" value={`${IsAuthenticated.IsFetching ? "Registering..." : "Register"}`} disabled={IsAuthenticated.IsFetching} className="SubmitBtn" />
                    </form>
                    <p className="AccountPrompt">Already Have an Account? <Link to="/user/login" className="RegisterBtn">Login Here</Link></p>
                </div>
            </div>
        </div>
    );
}

