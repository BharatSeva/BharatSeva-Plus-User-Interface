import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../Message";

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
            const Authorization = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/userauth/userregister`, {
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
        <div className="flex justify-center items-center bg-gray-800 font-poppins">
            {IsAuthenticated.IsFetching ? <Message message="Registering..." /> : (IsAuthenticated.IsGood ? <Message message="Success!" /> : <Message message={`${IsAuthenticated.Message}`} />)}

            {IsAuthenticated.IsAuthenticated && (
                <div>
                    <Message message="Registration Successful..." />
                    <Navigate to="/user/dashboard" replace={true} />
                </div>
            )}
            
            <div className="flex shadow-lg rounded-2xl bg-white shadow-2xl overflow-hidden w-4/5 max-w-[1100px]">
                <div className="bg-[#d7f2e4] shadow-2xl flex-1 flex items-center justify-center p-8 relative">
                    <div className="bg-cover w-full h-full rounded-lg" style={{ backgroundImage: "url('../Images_Assests/Register.png')" }}></div>
                </div>

                <div className="flex-1 p-12 bg-gray-800 flex flex-col justify-center">
                    <h1 className="text-4xl text-white text-center">Bharat Seva+</h1>
                    <p className="text-base text-white text-center mb-8">Serving country with love and dedication</p>
                    <form className="space-y-4" onSubmit={preventDefault}>
                        
                        <label className="block text-white pt-4">Enter Your Name</label>
                        <input 
                            type="text" 
                            className="w-full p-3 rounded border border-gray-300 text-base mb-4" 
                            placeholder="Name" 
                            name="name" 
                            onChange={handleInput} 
                            required 
                        />
                        
                        <label className="block text-white">Enter Your Email</label>
                        <input 
                            type="email" 
                            className="w-full p-3 rounded border border-gray-300 text-base mb-4" 
                            placeholder="Email" 
                            name="email" 
                            onChange={handleInput} 
                            required 
                        />

                        <label className="block text-white">Enter Your Health ID</label>
                        <input 
                            type="number" 
                            className="w-full p-3 rounded border border-gray-300 text-base mb-4" 
                            placeholder="Health ID" 
                            name="health_id" 
                            onChange={handleInput} 
                            required 
                        />
                        
                        <label className="block text-white">Create a Password</label>
                        <input 
                            type="password" 
                            className="w-full p-3 rounded border border-gray-300 text-base mb-4" 
                            placeholder="Password" 
                            name="password" 
                            onChange={handleInput} 
                            required 
                        />
                        
                        <label className="block text-white">Confirm Password</label>
                        <input 
                            type="password" 
                            className="w-full p-3 rounded border border-gray-300 text-base mb-4" 
                            placeholder="Confirm Password" 
                            name="confirmPassword" 
                            onChange={handleInput} 
                            required 
                        />
                        
                        <input 
                            type="submit" 
                            value={`${IsAuthenticated.IsFetching ? "Registering..." : "Register"}`} 
                            disabled={IsAuthenticated.IsFetching} 
                            className="w-full bg-[#0b7dda] text-white text-base p-3 rounded border-none cursor-pointer mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        />
                    </form>
                    <p className="text-center mt-4 text-white">Already Have an Account? <Link to="/user/login" className="text-[#0b7dda] font-bold">Login Here</Link></p>
                </div>
            </div>
        </div>
    );
}