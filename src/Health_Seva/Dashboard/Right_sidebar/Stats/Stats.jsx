import { useEffect, useState } from "react"
import "./stats.css"
import { FetchData } from "../../../FetchData"
import { Navigate } from "react-router-dom"

export default function Stats() {

    const [response, Setresponse] = useState()
    const [IsFetched, SetIsFetched] = useState({
        IsFetched: false,
        IsGood: true
    })
    const [Isredirect, SetIsredirect] = useState(false)
    async function GetStats() {
        Setresponse(false)
        try {

            const { data, res } = await FetchData(`/api/v1/user/stats`)
            if (res.ok) {
                Setresponse(data.stats)
            }
            else if (res.status === 405) { SetIsredirect(true) }
            else {
                Setresponse(false)
            }
        } catch (err) {
            SetIsFetched((p) => ({ ...p, IsGood: true }))
            alert("Something Went Wrong While Fetching Your Stats")
        }
        SetIsFetched((p) => ({ ...p, IsFetched: true }))
    }

    useEffect(() => {
        GetStats()
    }, [])

    return (
        <div className="WholeStatscontainer">
            {Isredirect && <Navigate to='/user/login' />}
            {IsFetched.IsGood ? (<div>
                <div className="Account_Stats">
                    <h1 className="LockAccount_Header">Stats</h1>
                    {response ? (
                        <div>
                            <p>This Section Shows Your Current Account Status.</p>
                            <hr></hr>
                            <div className="StatsContainer">
                                <p><span>Account Status :</span> {response.account_status}</p>
                                <p><span>Available Credit :</span> {response.available_money}</p>
                                <p><span>Profile Viewed :</span> {response.profile_viewed}</p>
                                <p><span>Profile Updated :</span> {response.profile_updated}</p>
                                <p><span>Records Viewed :</span> {response.records_viewed}</p>
                                <p><span>Records Created :</span> {response.records_created}</p>
                                <p><span>Last Updated :</span> {response.updatedAt}</p>
                            </div>
                        </div>
                    ) : (<p className="statuslogLoading">Loading...</p>)}
                </div>

            </div>) : (<p className="CouldNOConnectstatus">Could Not Connect To Server...🙄</p>)}
        </div>
    )
}
