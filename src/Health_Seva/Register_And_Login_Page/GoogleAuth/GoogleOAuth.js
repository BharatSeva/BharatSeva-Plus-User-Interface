import './GoogleOAuth.css';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import googleimg from "./googleimg.png"
import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';

function GoogleOAuth() {
    const [Isstatus, Setstatus] = useState({
        IsAuthorized: false,
        statustxt: "👋",
        message: false,
        Newuser: false,
        name: ""
    })

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse.access_token } },
            ).catch((err) => alert(err))
            Setstatus((p) => ({ ...p, statustxt: "Sign In Successfull, Verifying User" }))
            try {
                const postdata = await fetch('http://bharatsevaplus.ap-south-1.elasticbeanstalk.com/api/v1/userauth/googleOAuth', {
                    method: "POST",
                    headers: { 'content-type': "application/json" },
                    body: JSON.stringify({ ...userInfo.data, guest_type: "Patient" })
                })
                const Postresponse = await postdata.json()
                if (postdata.status === 200) {
                    sessionStorage.setItem("BharatSevaUser", JSON.stringify({ ...Postresponse, IsAuthenticated: true }))
                    Setstatus((p) => ({ ...p, IsAuthorized: true }))
                }
                else if (postdata.status === 201) {
                    sessionStorage.setItem("BharatSevaUser", JSON.stringify({ ...Postresponse, IsAuthenticated: true }))
                    Setstatus((p) => ({ ...p, Newuser: true, name: userInfo.data.name }))
                }

                else {
                    Setstatus((p) => ({ ...p, statustxt: Postresponse.message }))
                }
            } catch (err) {
                Setstatus((p) => ({ ...p, statustxt: "Could Not Connect to Server..." }))
                console.log(err)
            }
        },
        onError: () => console.log("Something Went Wrong")
    },
    );


    return (
        <>
            {Isstatus.IsAuthorized && (<Navigate to="/user/dashboard" replace={true} />)}
            <div className='GoogleDesign'>
                <p onClick={() => { login(); Setstatus((p) => ({ ...p, statustxt: "Authorization Flow Initiated !", message: true })) }}>Sign Up With <img alt='googlelogo' src={googleimg} /></p>
            </div>


            <div className={`${Isstatus.message ? "HealthuserGoogleOAuth" : "DisplayNone"}`}>
                <p>{Isstatus.statustxt}</p>
            </div>

            <div className={`${Isstatus.Newuser ? "GreetNewGuestUser" : "DisplayNone"}`}>
                <p>Welcome {Isstatus.name}, Seems like this is your first time on this website,
                    I really appreciate
                    your Interest in my project. All the dummy data has been successfully generated, please explore this website and
                    let me know if there is any feedback or queries for me.</p>
                <NavLink to="/user/dashboard"><p className='Proceedbtnguestuser'>Proceed to Dashboard! </p></NavLink>
            </div>

        </>
    );
}

export default GoogleOAuth;
