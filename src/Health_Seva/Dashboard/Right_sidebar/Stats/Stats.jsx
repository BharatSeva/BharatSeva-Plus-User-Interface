import { useEffect, useState } from "react"
import "./stats.css"



export default function Stats() {

    const [response, Setresponse] = useState()
    const [ActivityResponse, SetActivityResponse] = useState()
    const [IsFetched, SetIsFetched] = useState(true)

    const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))
    if (!UserData) { alert("Something Went Wrong With Your Session") }
    async function GetActivity() {
        try {
            SetActivityResponse(false)
            let data = await fetch(`http://localhost:5000/api/v1/userdetails/userstats/${UserData.healthId}`, {
                method: "GET",
                headers: {
                    'content-type': "application/json",
                    "Authorization": `Bearer ${UserData.token}`
                }
            })
            let response = await data.json()
            data.ok ? SetActivityResponse(response) : SetActivityResponse(false)
        } catch (err) {
            console.log(err.message)
            SetIsFetched(false)
            alert("Something Went Wrong")
        }
    }

    async function GetStats() {
        Setresponse(false)
        try {
            let data = await fetch(`http://localhost:5000/api/v1/userdetails/usertimesstats/${UserData.healthId}`, {
                method: "GET",
                headers: {
                    'content-type': "application/json",
                    "Authorization": `Bearer ${UserData.token}`
                }
            })
            let response = await data.json()
            data.ok ? Setresponse(response) : Setresponse(false)
        } catch (err) {
            alert("Something Went Wrong While Fetching Your Stats")
            console.log(err.message)
            SetIsFetched(false)
        }
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
                    <p><span>Name:</span>{data.name}</p>
                    <p><span>Location:</span>{data.location}</p>
                </div>
            )
            )
        ) : (<p className="notavailabletext">No One Modified Your Records Till Now</p>)

        ViewedResponse = ActivityResponse.Viewed_Length > 0 ? (
            ActivityResponse.Viewed_By.map((data) => (
                <div className="LogContainer StatsContainer">
                    <p><span>Name: </span>{data.name}</p>
                    <p><span>Location: </span>{data.location}</p>
                </div>
            )
            )
        ) : (<p className="notavailabletext">No One Viewed Your Records Till Now</p>)



    }



    return (
        <div className="WholeStatscontainer">
            { IsFetched ? (<div>
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
            </div>) :(<p className="CouldNOConnectstatus">Could Not Connect To Server...🙄</p>)}
        </div>
    )
}
