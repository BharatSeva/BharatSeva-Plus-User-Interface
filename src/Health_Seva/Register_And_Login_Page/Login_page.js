import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Message from "../Message";
import GoogleOAuth from "./GoogleAuth/GoogleOAuth";
import { GoogleOAuthProvider } from '@react-oauth/google';
import loginImage from '../Images_Assests/Login.png';

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
        <div className="flex justify-center items-center h-screen bg-gray-800 font-sans">
            {IsAuthenticated.IsFetching ? (
                <Message message="Validating..." />
            ) : IsAuthenticated.IsGood ? (
                <Message message="Validating..." />
            ) : (
                <Message message={`${IsAuthenticated.Message}`} />
            )}

            {IsAuthenticated.IsAuthenticated && (
                <div>
                    <Message message="Login Success..." />
                    <Navigate to="/user/dashboard" replace={true} />
                </div>
            )}
            
            <div className="flex shadow-lg rounded-2xl bg-white overflow-hidden w-4/5 max-w-6xl">
            <div className="hidden md:flex md:flex-1 bg-green-100 shadow-lg p-8 items-center justify-center relative">
                <div 
                     className="w-full h-full rounded-lg bg-cover bg-center"
                     style={{ backgroundImage: `url(${loginImage})`}}
                    />
            </div>
                <div className="flex-1 p-12 bg-gray-800 flex flex-col justify-center">
                    <h1 className="text-4xl text-white text-center">Bharat Seva+</h1>
                    <p className="text-base text-white text-center mb-8">
                        Serving country with love and dedication
                    </p>
                    
                    <form className="flex flex-col" onSubmit={preventDefault}>
                        <label className="text-base pt-4 block text-white">
                            Enter Your Health ID
                        </label>
                        <input
                            type="number"
                            className="w-full p-3 rounded border border-gray-300 mb-4 text-base"
                            placeholder="Health ID"
                            name="health_id"
                            onChange={Credential}
                            onKeyUp={Credential}
                            required
                        />
                        
                        <label className="text-base pt-4 block text-white">
                            Enter Your Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-3 rounded border border-gray-300 mb-4 text-base"
                            placeholder="Password"
                            name="password"
                            onChange={Credential}
                            onKeyUp={Credential}
                            required
                        />
                        
                        <button
                            type="submit"
                            disabled={IsAuthenticated.IsFetching}
                            className={`w-full p-3 rounded text-base text-white mb-4 ${
                                IsAuthenticated.IsFetching
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {IsAuthenticated.IsFetching ? "Validating..." : "Login"}
                        </button>
                    </form>
                    
                    <div className="w-full text-center my-4">
                        <p className="flex justify-center items-center text-white">Or</p>
                        <GoogleOAuthProvider clientId="476285565826-8smpt7q2bh9o1ace0iqn8lcmn52maele.apps.googleusercontent.com">
                            <GoogleOAuth />
                        </GoogleOAuthProvider>
                    </div>
                    
                    <p className="text-center mt-4 text-white">
                        Don't Have an Account?{' '}
                        <Link to="/user/register" className="text-blue-500 font-bold hover:text-blue-600">
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
);
}