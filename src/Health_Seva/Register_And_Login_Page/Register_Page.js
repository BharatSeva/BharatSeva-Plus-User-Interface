import { getDefaultNormalizer } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Message from "../Message";
import "./Register_Page.css";

export default function RegisterPage() {
    document.title = "Register | Bharat Seva";

    const [IsRegistered, SetIsregistered] = useState(false)
    const [Credentials, SetCredentials] = useState()
    function SetCredential(e) {
        const { name, value } = e.target
        SetCredentials((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Register API Goes here
    const RegisterPatient = async () => {
        try {
            const Response = await fetch(`http://localhost:5000/api/v1/userauth/userregister`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(Credentials)
            })
            const data = await Response.json()
            if (Response.ok) {
                SetIsregistered(data.status)
            } else {
                console.log(data.message)
                SetIsregistered(data.status)
            }
        } catch (err) {
            console.log(err.message)
            alert(err.message)
            SetIsregistered(false)
        }


    }

    const PasswordUser = document.querySelector("#PasswordUser")
    const PasswordAgainUser = document.querySelector("#AgainPasswordUser")
    const PasswordNotmatch = document.querySelector(".PasswordDonotmatch")
    const preventDefault = (e) => {
        SetIsregistered(false)
        e.preventDefault();
        if (PasswordUser.value === PasswordAgainUser.value && PasswordAgainUser.value && PasswordUser.value) {
            RegisterPatient();
            PasswordNotmatch.classList.remove("Displaypasstxt")
        } else {
            PasswordNotmatch.classList.add("Displaypasstxt")
        }
    }
    return (
        <>
            {IsRegistered && (
                <div>
                    <Message message={IsRegistered} />
                </div>
            )}
            <div className="RegisterContainer">
                <div className="Register">
                    <p className="BharatSeva_Registration">Bharat Seva</p >
                    <h2>Register Yourself</h2>
                    <form className="EnterDetails" onSubmit={preventDefault}>
                        <label>Enter Your Health ID</label><br></br>
                        <input type="Number" className="UserRegisterInput" id="UserRegiserhealthId" name="health_id" placeholder="Enter Your Health ID" onChange={SetCredential} onKeyUp={SetCredential} required></input><br></br>

                        <label>Enter Your Email</label><br></br>
                        <input type="email" className="UserRegisterInput" name="email" placeholder="Enter Your Email" onChange={SetCredential} onKeyUp={SetCredential} required></input><br></br>

                        <label>Enter Your Password</label><br></br>
                        <input type="password" id="PasswordUser" className="UserRegisterInput" name="password" placeholder="Enter Your Password" onChange={SetCredential} onKeyUp={SetCredential} required></input><br></br>

                        <label>Confirm Your Password</label><br></br>
                        <input type="password" id="AgainPasswordUser" className="UserRegisterInput" placeholder="Enter Your Password Again" required></input><br></br>
                        <p className="PasswordDonotmatch">Password Do no Match</p>

                        <div className="Submitbtncontainer"><input type="submit" value="Register" className="Submitbtn"></input></div>
                    </form>
                    <div className="Login">
                        <p className="RegisterLoginPage">Already Registered ?  <Link to="/login" className="LoginBtn">Login Here </Link> </p>
                    </div>
                </div>
            </div>
        </>
    )
}
