import { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../Message";
import "./Register_Page.css";

export default function RegisterPage() {
    document.title = "Register | Bharat Seva";

    const [IsRegistered, SetIsregistered] = useState(false)
    const [IsLoading, SetIsLoading] = useState(false)
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
        SetIsLoading(true);
        try {
            const Response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/userauth/userregister`, {
                method: "POST",
                headers: {
                    'content-type': "application/json"
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
            console.log(err)
            alert(err)
            SetIsregistered(false)
        } finally { 
            SetIsLoading(false)
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
                    <p className="BharatSeva_Registration">BharatSeva+ User Inter-Face</p >
                    <h2 className="Registerhealthuser">Register Yourself</h2>
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

                        <div className="Submitbtncontainer"><input type="submit" value={`${IsLoading ? "Validating..." : "Register"}`} className="Submitbtn" disabled={IsLoading}></input></div>
                    </form>
                    <div className="Login">
                        <p className="RegisterLoginPage">Registered ?  <Link to="/user/login" className="LoginBtn">Login Here </Link> </p>
                    </div>
                </div>
            </div>

            <div className="Registertextcontaine loginabouttextcontainer">
                <p>Points to Note</p>
                <ul>
                    <li>Before Registration, Healthcare Need to create a account with your HealthId.</li>
                    <li>Password should be 5 characters long.</li>
                    <li>Enter the same Email with which your account registered with. </li>
                </ul>
            </div>
            
            {/* Pop Up to show warning!! */}
            {/* <InsecureContent/> */}
        </>
    )
}
