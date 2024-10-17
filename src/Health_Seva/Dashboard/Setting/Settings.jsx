import Permission from "./Permission/Permission";
import Preferances from "./Preferances/Preferances";
import LockAccount from "./LockAccount/LockAccount";
import { useEffect, useState } from "react";
import { FetchData, PostData } from "../../FetchData";
import { Navigate } from "react-router-dom"


export default function Settings() {
    const [Isredirect, SetIsredirect] = useState(false)
    const [SettingResponse, SetSettingResponse] = useState(false)
    async function OnchangeData(e) {
        const { name, value } = e;
        SetSettingResponse(false)
        try {

            const { res } = await PostData(`/api/v1/userdetails/preferances`, { [name]: value })
            if (res.ok) {
                alert("Updated Successfully")
            }
            // Redirect Goes Here!
            else if (res.status === 405) { SetIsredirect(true) }
        } catch (err) {
            alert("Could Not Connect To Server...")
        }
        GetSettingData()
    }

    async function GetSettingData() {
        try {
            SetSettingResponse(false)
            const { data, res } = await FetchData(`/api/v1/userdetails/preferances`)
            if (res.ok) {
                SetSettingResponse(data)
            }
            else if (res.status === 405) { SetIsredirect(true) }
            else { SetSettingResponse(false) }
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
            {Isredirect && <Navigate to='/user/login' />}
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