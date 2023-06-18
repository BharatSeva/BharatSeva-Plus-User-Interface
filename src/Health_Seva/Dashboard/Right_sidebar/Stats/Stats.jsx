import { useEffect, useState } from "react"
import "./stats.css"





export default function Stats() {

    const [response, Setresponse] = useState()
    const [ActivityResponse, SetActivityResponse] = useState()

    async function GetActivity() {
        try {
            SetActivityResponse(false)
            let data = await fetch(`http://localhost:5000/api/v1/healthcare/Firebase/getUserActivityData/${localStorage.getItem("BharatSevaHealth_ID")}`)
            let response = await data.json()
            if (!data.ok) {
                SetActivityResponse(false)
            } else {
                SetActivityResponse(response)
            }
        } catch (err) {
            console.log(err.message)
            alert("Something Went Wrong", err.message)
        }
    }

    async function GetStats() {
        Setresponse(false)
        let data = await fetch(`http://localhost:5000/api/v1/healthcare/Firebase/GET_HealthUser/${localStorage.getItem("BharatSevaHealth_ID")}`)
        let response = await data.json()
        Setresponse(response)
    }

    useEffect(() => {
        GetActivity(),
            GetStats()
    }, [])

    let ModifiedResponse = <p className="statuslogLoading">Loading...</p>, ViewedResponse = <p className="statuslogLoading">Loading...</p>
    if (ActivityResponse) {
        ModifiedResponse = ActivityResponse.Data.Modified_Length > 0 ? (
            ActivityResponse.Data.Modified_By.map((data) => (
                <div className="LogContainer StatsContainer">
                    <p><span>Name:</span>{data.name}</p>
                    <p><span>Location:</span>{data.location}</p>
                </div>
            )
            )
        ) : (<p className="notavailabletext">No One Modified Your Records Till Now</p>)

        ViewedResponse = ActivityResponse.Data.Viewed_Length > 0 ? (
            ActivityResponse.Data.Viewed_By.map((data) => (
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
            <div className="Account_Stats">

                <h1 className="LockAccount_Header">Stats</h1>
                {response ? (
                    <div>
                        <p>This Section Shows Number of Times Health Facilities Viewed or Changed Your Health Data.</p>
                        <div className="StatsContainer">
                            <p><span>Profile Viewed :</span> {response.Data.Profile_Viewed}</p>
                            <p><span>Profile Updated :</span> {response.Data.Profile_Updated}</p>
                            <p><span>Records Viewed :</span> {response.Data.Records_Viewed}</p>
                            <p><span>Records Created :</span> {response.Data.Records_Created}</p>
                        </div>
                    </div>
                ) : (<p className="statuslogLoading">Loading...</p>)}
            </div>
            <div className="ListLogContainer">
                <h2 className="LogText">Modified Log</h2>
                <p className="LogText">This Section List Health Facilities Who Changed or Updated Your Health Data</p>
                {ModifiedResponse}
            </div>

            <div className="ListLogContainer">
                <h2 className="LogText">Viewed Log</h2>
                <p className="LogText">This Section List Health Facilities Who Viewed Your Health Data</p>
                {ViewedResponse}
            </div>
        </div>
    )
}
