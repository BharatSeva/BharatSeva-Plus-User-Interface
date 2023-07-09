import Permission from "./Permission/Permission";
import Preferances from "./Preferances/Preferances";
import LockAccount from "./LockAccount/LockAccount";
import { useEffect, useState } from "react";
import { FetchData, PostData } from "../../FetchData";

export default function Settings() {

    const [SettingResponse, SetSettingResponse] = useState(false)
    async function OnchangeData(e) {
        const { name, value } = e;
        SetSettingResponse(false)
        try {

            const { data, res } = await PostData(`http://localhost:5000/api/v1/userdetails/preferances`, { [name]: value })
            if (res.ok) {
                alert("Updated Successfully")
            }
            // Redirect Goes Here!
        } catch (err) {
            alert("Could Not Connect To Server...")
        }
        GetSettingData()
    }

    async function GetSettingData() {
        try {
            SetSettingResponse(false)
            const { data, res } = await FetchData(`http://localhost:5000/api/v1/userdetails/preferances`)
            if (res.ok) {
                SetSettingResponse(data)
            } else { SetSettingResponse(false) }
            // Redirect Goes Here...
        } catch (err) {
            // SetSettingResponse({})
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