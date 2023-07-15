import "./ActivityLog.css"
import { FetchData } from "../../../FetchData"
import { useState, useEffect } from "react"
const { v4: uuidv4 } = require('uuid');
import { Navigate } from "react-router-dom"
export default function ActivityLog() {

    const [ActivityResponse, SetActivityResponse] = useState()
    const [IsFetched, SetIsFetched] = useState({
        IsFetched: false,
        IsGood: true
    })
    const [Isredirect, SetIsredirect] = useState(false)

    async function GetActivity() {
        try {
            SetActivityResponse(false)
            const { data, res } = await FetchData(`/api/v1/userdetails/accountactivitylog`)
            if (res.ok) {
                SetActivityResponse(data)
            }
            else if (res.status === 405) { SetIsredirect(true) }
            else {
                SetActivityResponse(false)
            }
        } catch (err) {
            SetIsFetched((p) => ({ ...p, IsGood: true }))
            alert("Could Not Fetch Account Activity Logs")
        }
        SetIsFetched((p) => ({ ...p, IsFetched: true }))
    }

    useEffect(() => {
        GetActivity()
    }, [])
    let ModifiedResponse, ViewedResponse
    if (ActivityResponse) {
        ModifiedResponse = ActivityResponse.Modified_Length > 0 ? (
            ActivityResponse.Modified_By.map((data) => (
                <div key={uuidv4()} className="LogContainer StatsContainer">
                    <p><span>HealthCare:</span>{data.name}</p>
                    <p><span>Location:</span>{data.location.city}, {data.location.state}, {data.location.country}</p>
                    <p><span>Date:</span>{data.date}</p>
                </div>
            )
            )
        ) : (<p className="notavailabletext">No One Modified Your Records Till Now</p>)

        ViewedResponse = ActivityResponse.Viewed_Length > 0 ? (
            ActivityResponse.Viewed_By.map((data) => (
                <div key={uuidv4()} className="LogContainer StatsContainer">
                    <p><span>HealthCare: </span>{data.name}</p>
                    <p><span>Location: </span>{data.location.city}, {data.location.state}, {data.location.country}</p>
                    <p><span>Date:</span>{data.date}</p>
                </div>
            )
            )
        ) : (<p className="notavailabletext">No One Viewed Your Records Till Now</p>)



    }


    return (
        <>
            {Isredirect && <Navigate to='/bharatseva-user/login' />}
            {IsFetched.IsFetched ? (IsFetched.IsGood ? (<><div className="ListLogContainer">
                <h2 className="LogText">Modified Log</h2>
                <p className="LogText">This Section List Health Facilities Who Changed or Updated Your Health Data</p>
                {ActivityResponse ? ModifiedResponse : (<p className="statuslogLoading">Loading...</p>)}
            </div>
                <div className="ListLogContainer">
                    <h2 className="LogText">Viewed Log</h2>
                    <p className="LogText">This Section List Health Facilities Who Viewed Your Health Data</p>
                    {ActivityResponse ? ViewedResponse : (<p className="statuslogLoading">Loading...</p>)}
                </div></>) : <p>Could NOt Connect to Server...</p>) : (<div className="FetchingDataLogo"> Fetching Logs <i className="fa-solid fa-rotate"></i></div>)}
        </>
    )
}
