import { getDefaultNormalizer } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Message from "../Message";
import "./Register_Page.css";

export default function RegisterPage() {
    document.title = "Register | Bharat Seva";

    const [IsRegistered, SetIsregistered] = useState(false)
    const [Health_ID, SetHealth_ID] = useState("")
    const [Email, SetEmail] = useState("")

    const [password, Setpassword] = useState("")
    const [password_A, Setpassword_A] = useState("")

    if (password !== password_A) {
        document.querySelector(".PasswordDonotmatch").classList.add("Displaypasstxt")
        document.querySelector(".pass").classList.add("wrongpass")
        document.querySelector("#cnfrmpass").classList.add("wrongpass")
    }
    if (password === password_A && password !== "") {
        document.querySelector(".PasswordDonotmatch").classList.remove("Displaypasstxt")
        document.querySelector(".pass").classList.remove("wrongpass")
        document.querySelector("#cnfrmpass").classList.remove("wrongpass")

        document.querySelector(".pass").classList.add("Rightpassword")
        document.querySelector("#cnfrmpass").classList.add("Rightpassword")

    }

    // Register API Goes here
    const RegisterPatient = () =>{

        fetch(`http://localhost:5000/api/v1/patientAuth/PatientRegister`, {
            method: "post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "health_id": Health_ID,
                "email": `${Email}`,
                "password": password
            })
    })
            .then((result) => result.json())
            .then((data) => {
            console.log(data)
            if(data.message){
                alert(data.message)
                return;
            }
            localStorage.setItem("BharatSevaUserName", data.user.name)
            data.token = "Bearer " + data.token
            localStorage.setItem("BharatSevaToken", data.token)
            localStorage.setItem("BharatSevaHealth_ID", Health_ID)
            SetIsregistered(true)
        })
        
}



const preventDefault = (e) => {
    e.preventDefault();
    RegisterPatient();
}
return (
    <>
        {IsRegistered && (
            <div>
                <Message message="Successfully Registered" />
                <Navigate to="/" replace={true} />
            </div>
        )}
        <div className="RegisterContainer">
            <div className="Register">
                <p className="BharatSeva_Registration">Bharat Seva</p >
                <h2>Register Yourself</h2>
                <form className="EnterDetails" onSubmit={preventDefault}>
                    <label>Enter Your Health ID</label><br></br>
                    <input type="Number" placeholder="Enter Your Health ID" onChange={(e) => SetHealth_ID(e.target.value)}></input><br></br>

                    <label>Enter Your Email</label><br></br>
                    <input type="email" placeholder="Enter Your Email" onChange={(e) => SetEmail(e.target.value)}></input><br></br>

                    <label>Enter Your Password</label><br></br>
                    <input type="password" placeholder="Enter Your Password" className="pass" onChange={(e) => Setpassword(e.target.value)}></input><br></br>

                    <label>Confirm Your Password</label><br></br>
                    <input type="password" placeholder="Enter Your Password Again" className="pass" id="cnfrmpass" onChange={(e) => Setpassword_A(e.target.value)}></input><br></br>
                    <p className="PasswordDonotmatch">Password Do no Match</p>

                    <div className="Submitbtncontainer"><input type="submit" className="Submitbtn"></input></div>
                </form>
                <div className="Login">
                    <p>Already Have A Account ?  <Link to="/login" className="LoginBtn">Login Here </Link> </p>
                </div>
            </div>
        </div>
    </>
)
}
