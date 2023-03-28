import { Outlet, Link } from "react-router-dom";
import "./Register_Page.css";

export default function RegisterPage() {


    document.title = "Register | Bharat Seva" ;


    const preventDefault = (e) => {
        e.preventDefault();
    }
    return (
        <div className="RegisterContainer">
            <div className="Register">
                <p className="BharatSeva_Registration">Bharat Seva</p >
                <h2>Register Yourself</h2>
                <form className="EnterDetails" onSubmit={preventDefault}>
                    <label>Enter Your Health ID</label><br></br>
                    <input type="Number" placeholder="Enter Your Health ID"></input><br></br>

                    <label>Enter Your Email</label><br></br>
                    <input type="text" placeholder="Enter Your Email"></input><br></br>

                    <label>Enter Your Password</label><br></br>
                    <input type="text" placeholder="Enter Your Password"></input><br></br>
                    
                    <label>Confirm Your Password</label><br></br>
                    <input type="text" placeholder="Enter Your Password Again"></input><br></br>


                    <input type="submit" className="Submitbtn"></input>
                </form>
                <div className="Login">
                    <p>Already Have A Account ?  <Link to="/login" className="LoginBtn">Login Here </Link> </p>
                </div>


            </div>
        </div>
    )
}
