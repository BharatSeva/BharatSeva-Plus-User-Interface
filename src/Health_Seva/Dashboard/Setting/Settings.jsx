import Permission from "./Permission/Permission";
import Preferances from "./Preferances/Preferances";
import LockAccount from "./LockAccount/LockAccount";
import { useEffect, useState } from "react";



export default function Settings() {

    const [SettingResponse, SetSettingResponse] = useState(false)


    const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))


    async function OnchangeData(e) {
        const { name, value } = e;
        SetSettingResponse(false)
        try {
            let response = await fetch(`http://localhost:5000/api/v1/userdetails/user/settings/${UserData.healthId}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${UserData.token}`
                },
                body: JSON.stringify({ [name]: value })
            })
            let data = await response.json()
            console.log("Preferance Updated Successfully")
            alert("Updated Successfully")
        } catch (err) {
            console.log("Something went Wrong in Updating Your Preferances..", err.message)
            alert(err.message)
        }
        GetSettingData()
    }

    async function GetSettingData() {
        try {
            SetSettingResponse(false)
            let data = await fetch(`http://localhost:5000/api/v1/userdetails/usertimesstats/${UserData.healthId}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${UserData.token}`,
                }
            })
            let response = await data.json()
            data.ok ? SetSettingResponse(response) : SetSettingResponse(false)
        } catch (err) {
            alert("Something Got wrong With Your Network Connection...")
        }

    }
    useEffect(() => {
        GetSettingData()
    }, [])
    return (
        <>
            <div className="SettingOuterContainer">
                <div className="SettingContainer">

                    <h1 className="LockAccount_Header">Settings</h1>
                    <hr></hr>

                    <Permission OnchangeData={OnchangeData} SettingResponse={SettingResponse} />
                    <Preferances OnchangeData={OnchangeData} SettingResponse={SettingResponse} />
                    <LockAccount OnchangeData={OnchangeData} SettingResponse={SettingResponse} />

                </div>
            </div>
        </>
    )
}