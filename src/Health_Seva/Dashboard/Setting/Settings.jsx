import Permission from "./Permission/Permission";
import Preferances from "./Preferances/Preferances";
import LockAccount from "./LockAccount/LockAccount";
import { useEffect, useState } from "react";
import { FetchData, PatchData } from "../../FetchData";
import { Navigate } from "react-router-dom"


export default function Settings() {
    const [Isredirect, SetIsredirect] = useState(false)
    const [SettingResponse, SetSettingResponse] = useState(false)

    async function OnchangeData(e) {
        const { name, value } = e;
        SetSettingResponse(false)
        try {

            const { res } = await PatchData(`/preferences/update`, { [name]: value })
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
            const { data, res } = await FetchData(`/preferences`)
            if (res.ok) {
                SetSettingResponse(data.preferences)
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
            {Isredirect && <Navigate to='/client/login' />}
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