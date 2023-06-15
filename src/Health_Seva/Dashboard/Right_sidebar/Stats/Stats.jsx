import { useEffect, useState } from "react"
import "./stats.css"





export default function Stats() {

    const [response, Setresponse] = useState()

    async function GetStats() {
        Setresponse(false)
        let data = await fetch(`http://localhost:5000/api/v1/healthcare/Firebase/GET_HealthUser/${localStorage.getItem("BharatSevaHealth_ID")}`)
        let response = await data.json()
        Setresponse(response)
    }

    useEffect(() => {
        GetStats()
    }, [])


    return (
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
                ) : "Loading..."}
        </div>
    )
}
