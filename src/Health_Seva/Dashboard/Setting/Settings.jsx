import Permission from "./Permission/Permission";
import Preferances from "./Preferances/Preferances";
import LockAccount from "./LockAccount/LockAccount";
import { useEffect, useState } from "react";



export default function Settings() {

    const [SettingResponse, SetSettingResponse] = useState(false)

    async function OnchangeData(e) {
        const { name, value } = e;
        SetSettingResponse(false)
        try {
            let response = await fetch('http://localhost:5000/api/v1/healthcare/Firebase/putHealthCare', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("HealthCare_TOKEN")}`
                },
                body: JSON.stringify({ [name]: value, Health_ID: localStorage.getItem("BharatSevaHealth_ID") })
            })
            let data = await response.json()
            console.log("Preferance Updated Successfully")
            // alert("Updated Successfully")
        } catch (err) {
            console.log("Something went Wrong in Updating Your Preferances..", err.message)
            alert(err.message)
        }
        GetSettingData()
    }

    async function GetSettingData() {
        try {
            SetSettingResponse(false)
            let data = await fetch(`http://localhost:5000/api/v1/healthcare/Firebase/GET_HealthUser/${localStorage.getItem("BharatSevaHealth_ID")}`)
            let response = await data.json()
            SetSettingResponse(response)
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

                    <Permission OnchangeData={OnchangeData} SettingResponse={SettingResponse} />
                    <Preferances OnchangeData={OnchangeData} SettingResponse={SettingResponse} />
                    <LockAccount OnchangeData={OnchangeData} SettingResponse={SettingResponse} />

                </div>
            </div>
        </>
    )
}