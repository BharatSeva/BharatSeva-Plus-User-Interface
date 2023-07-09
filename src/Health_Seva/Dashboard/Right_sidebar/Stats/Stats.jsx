import { useEffect, useState } from "react"
import "./stats.css"
import { FetchData } from "../../../FetchData"


export default function Stats() {

    const [response, Setresponse] = useState()
    const [ActivityResponse, SetActivityResponse] = useState()
    const [IsFetched, SetIsFetched] = useState({
        IsFetched: false,
        IsGood: true
    })


    async function GetActivity() {
        try {
            SetActivityResponse(false)
            const { data, res } = await FetchData(`http://localhost:5000/api/v1/userdetails/accountactivitylog`)
            if (res.ok) {
                SetActivityResponse(data)
            } else {
                SetActivityResponse(false)
            }
        } catch (err) {
            SetIsFetched((p) => ({ ...p, IsGood: true }))
            alert("Could Not Fetch Account Activity Logs")
        }
        SetIsFetched((p) => ({ ...p, IsFetched: true }))
    }

    async function GetStats() {
        Setresponse(false)
        try {

            const { data, res } = await FetchData(`http://localhost:5000/api/v1/userdetails/stats`)
            if (res.ok) {
                Setresponse(data)
            } else {
                Setresponse(false)
            }
        } catch (err) {
            SetIsFetched((p) => ({ ...p, IsGood: true }))
            alert("Something Went Wrong While Fetching Your Stats")
        }
        SetIsFetched((p) => ({ ...p, IsFetched: true }))
    }

    useEffect(() => {
        GetActivity(),
            GetStats()
    }, [])

    let ModifiedResponse, ViewedResponse
    if (ActivityResponse) {
        ModifiedResponse = ActivityResponse.Modified_Length > 0 ? (
            ActivityResponse.Modified_By.map((data) => (
                <div className="LogContainer StatsContainer">
                    <p><span>HealthCare:</span>{data.name}</p>
                    <p><span>Location:</span>{data.location.city}, {data.location.state}, {data.location.country}</p>
                    <p><span>Date:</span>{data.date}</p>
                </div>
            )
            )
        ) : (<p className="notavailabletext">No One Modified Your Records Till Now</p>)

        ViewedResponse = ActivityResponse.Viewed_Length > 0 ? (
            ActivityResponse.Viewed_By.map((data) => (
                <div className="LogContainer StatsContainer">
                    <p><span>HealthCare: </span>{data.name}</p>
                    <p><span>Location: </span>{data.location.city}, {data.location.state}, {data.location.country}</p>
                    <p><span>Date:</span>{data.date}</p>
                </div>
            )
            )
        ) : (<p className="notavailabletext">No One Viewed Your Records Till Now</p>)



    }



    return (
        <div className="WholeStatscontainer">
            {IsFetched.IsGood ? (<div>
                <div className="Account_Stats">
                    <h1 className="LockAccount_Header">Stats</h1>
                    {response ? (
                        <div>
                            <p>This Section Shows Your Current Account Status.</p>
                            <hr></hr>
                            <div className="StatsContainer">
                                <p><span>Account Status :</span> {response.account_status}</p>
                                <p><span>Available Credit :</span> {response.Available_Money}</p>
                                <p><span>Profile Viewed :</span> {response.Profile_Viewed}</p>
                                <p><span>Profile Updated :</span> {response.Profile_Updated}</p>
                                <p><span>Records Viewed :</span> {response.Records_Viewed}</p>
                                <p><span>Records Created :</span> {response.Records_Created}</p>
                            </div>
                        </div>
                    ) : (<p className="statuslogLoading">Loading...</p>)}
                </div>
                <div className="ListLogContainer">
                    <h2 className="LogText">Modified Log</h2>
                    <p className="LogText">This Section List Health Facilities Who Changed or Updated Your Health Data</p>
                    {ActivityResponse ? ModifiedResponse : (<p className="statuslogLoading">Loading...</p>)}
                </div>
                <div className="ListLogContainer">
                    <h2 className="LogText">Viewed Log</h2>
                    <p className="LogText">This Section List Health Facilities Who Viewed Your Health Data</p>
                    {ActivityResponse ? ViewedResponse : (<p className="statuslogLoading">Loading...</p>)}
                </div>
            </div>) : (<p className="CouldNOConnectstatus">Could Not Connect To Server...🙄</p>)}
        </div>
    )
}
