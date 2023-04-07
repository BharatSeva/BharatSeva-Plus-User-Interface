import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../Message";
import "./Login_page.css"



export default function LoginPage() {
    document.title = "Login | Bharat Seva";


    // UseEffect Condition Goes Here
    const [IsAuthenticated, SetAuthenticated] = useState(false);
    const [Health_ID, SetHealth_ID] = useState("")
    const [password, Setpassword] = useState("")
    console.log(Health_ID, password);

    const LoginAPI = async () => {

        const Authorization = await fetch(`http://localhost:5000/api/v1/patientAuth/PatientLogin`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "health_id": Health_ID,
                "password": `${password}`
            })
        })
        let datas = await Authorization.json()
        console.log(datas);
        if (datas.status === "Success") {
            datas.token = "Bearer " + datas.token;
            localStorage.setItem("BharatSevaToken", datas.token)
            localStorage.setItem("BharatSevaUserName", datas.user.name)
            localStorage.setItem("BharatSevaHealth_ID", Health_ID)
            SetAuthenticated(true);
        }
        else {
            alert(datas.message)
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
                        <input type="Number" placeholder="Enter Your Health ID" onChange={e => SetHealth_ID(e.target.value)} required ></input><br></br>

                        <label>Enter Your Password</label><br></br>
                        <input type="password" placeholder="Enter Your Password" onChange={e => Setpassword(e.target.value)} required ></input><br></br>

                        <input type="submit" className="Submitbtn"></input>
                        {/* <Link to="/"> <input type="submit" className="Submitbtn" ></input></Link> */}
                    </form>

                    <div className="Login">
                        <p>Don't Have A Account ? <Link to="/register" className="RegisterBtn">Register Here</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

