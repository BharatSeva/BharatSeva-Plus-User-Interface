import "./ActivityLog.css"
import { FetchData } from "../../../FetchData"
import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { RiArrowDropUpLine } from "@remixicon/react"
import { RiArrowDropDownLine } from "@remixicon/react"

const { v4: uuidv4 } = require('uuid');


export default function ActivityLog() {
    const [isOpenModified, setisOpenModified] = useState(false);

    const toggleDropdownModified = () => {
        setisOpenModified(!isOpenModified);
    };
    const [isOpenViewed, setisOpenViewed] = useState(false);

    const toggleDropdownViewed = () => {
        setisOpenViewed(!isOpenViewed);
    };

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
            ActivityResponse.Modified_By
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((data) => (
                    <div key={uuidv4()} className="text-black rounded-lg mx-8 my-4 border-black border-2" style={{ backgroundColor: "#EEECEC" }}>
                        <div className="flex flex-col gap-0">
                            <div className="font-semibold text-base mx-4 flex items-center"><p>HealthCare: </p><p className="font-normal inline text-sm">{data.name}</p></div>
                            <div className="h-0.5 bg-black w-full"></div>
                            <div className="font-semibold text-base w-full px-4 flex items-center" style={{ backgroundColor: "#F5F5F5" }}><p>Location: </p><p className="font-normal inline text-sm">{data.location.city}, {data.location.state}, {data.location.country}</p></div>
                            <div className="h-0.5 bg-black w-full"></div>
                            <div className="font-semibold text-base mx-4 flex items-center"><p>Date & Time: </p><p className="font-normal inline text-sm">{data.date}</p></div>
                        </div>
                    </div>
                )
                )
        ) : (<p className="notavailabletext">No One Modified Your Records Till Now</p>)

        ViewedResponse = ActivityResponse.Viewed_Length > 0 ? (
            ActivityResponse.Viewed_By
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((data) => (

                    <div key={uuidv4()} className="text-black rounded-lg mx-6 my-4 border-black border-2" style={{ backgroundColor: "#EEECEC" }}>
                        <div className="flex flex-col ">
                            <div className="font-semibold text-base mx-4 flex items-center"><p>HealthCare: </p><p className="font-normal inline text-sm">{data.name}</p></div>
                            <div className="h-0.5 bg-black w-full"></div>
                            <div className="font-semibold text-base w-full px-4 flex items-center" style={{ backgroundColor: "#F5F5F5" }}><p>Location: </p><p className="font-normal inline text-sm">{data.location.city}, {data.location.state}, {data.location.country}</p></div>
                            <div className="h-0.5 bg-black w-full"></div>
                            <div className="font-semibold text-base mx-4 flex items-center"><p>Date & Time: </p><p className="font-normal inline text-sm">{data.date.split(' ').slice(0, 5).join(' ')}</p></div>
                        </div>
                    </div>
                )
                )
        ) : (<p className="notavailabletext">No One Viewed Your Records Till Now</p>)
    }
    return (
        <>
            {Isredirect && <Navigate to='/user/login' />}
            {IsFetched.IsFetched ? (IsFetched.IsGood ? (
                <>
                    <div className="bg-white rounded-lg border-2 border-black mt-4">
                        <div className="flex gap-2 items-center justify-between px-8">
                            <div className="flex items-center">
                                <h2 className="LogText text-black text-xl font-semibold px-6 py-4">Modified Log</h2>
                                <p className="LogText font-light text-black text-base">Health facilities who changed or updated your health data</p>
                            </div>
                            <div onClick={toggleDropdownModified} className="cursor-pointer">
                                {isOpenModified ? (
                                    <RiArrowDropUpLine size={30} color="black" />
                                ) : (
                                    <RiArrowDropDownLine size={30} color="black" />
                                )}
                            </div>
                        </div>
                        <div className="h-0.5 w-full bg-black"></div>
                        {isOpenModified && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {ActivityResponse ? ModifiedResponse : (<p className="statuslogLoading">Loading...</p>)}
                            </div>
                        )}
                    </div>


                    <div className="ListLogContainer bg-white rounded-lg border-2 border-black mt-4">
                        <div className="flex gap-2 items-center justify-between px-8">
                            <div className="flex items-center">
                                <h2 className="LogText text-black text-xl font-semibold px-6 py-4">Viewed Log</h2>
                                <p className="LogText font-light text-black text-base">Health facilities who viewed your health data</p>
                            </div>
                            <div onClick={toggleDropdownViewed} className="cursor-pointer">
                                {isOpenViewed ? (
                                    <RiArrowDropUpLine size={30} color="black" />
                                ) : (
                                    <RiArrowDropDownLine size={30} color="black" />
                                )}
                            </div>
                        </div>
                        <div className="h-0.5 w-full bg-black"></div>

                        {isOpenViewed && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {ActivityResponse ? ModifiedResponse : (<p className="statuslogLoading">Loading...</p>)}
                            </div>
                        )}
                    </div>
                </>) : <p>Could NOt Connect to Server...</p>) : (<div className="FetchingDataLogo"> Fetching Logs <i className="fa-solid fa-rotate"></i></div>)}
        </>
    )
}
