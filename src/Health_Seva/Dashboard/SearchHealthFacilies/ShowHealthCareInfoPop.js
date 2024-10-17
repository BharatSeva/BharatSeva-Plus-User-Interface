import "./ShowHealthCareInfoPop.css"
import Select from "react-select"
import { useEffect, useState } from "react";
import { FetchData, PostData } from "../../FetchData";
import { useSearchParams, Navigate } from "react-router-dom";

export default function ShowHealthInfo_PopOver() {

    const [ListData, SetListData] = useState()
    const [Isredirect, SetIsredirect] = useState(false)
    const [IsFetched, SetIsFetched] = useState({
        IsFetched: false,
        IsGood: false
    })

    const [params] = useSearchParams()

    const [Appointment, SetAppointment] = useState()
    // Post Appointment
    async function postAppointment(e) {

        e.preventDefault()
        try {
            const { data, res } = await PostData(`/api/v1/userdetails/${params.get("id")}/createappointment`, Appointment)
            if (res.ok) {
                alert("Appointment Successful")

            } 
            else if (res.status === 405) { SetIsredirect(true) }
            else {
                alert(data.message)

            }
        } catch (err) {
            alert(err.message)
            console.log(err)
        }
    }

    useEffect(() => {
        // Fetch HealthCareHEre
        async function GetHealthCareForAppointment() {
            SetIsFetched((p) => ({ ...p, IsFetched: false }))
            try {
                const { data, res } = await FetchData(`/api/v1/user/gethealthcare/${params.get("id")}`)
                if (res.ok) {
                    SetListData(data.healthcare)
                    SetIsFetched((p) => ({ ...p, IsGood: true }))
                }else if (res.status === 405) { SetIsredirect(true) }
            } catch (err) {
                alert("Please Check Your Internet Connection...")
                SetListData(false)
            }
            SetIsFetched((p) => ({ ...p, IsFetched: true }))
        }
        GetHealthCareForAppointment()
        SetAppointment((p) => ({ ...p, healthcare_name: `${params.get("healthcarename")}` }))
    }, [params])

    function dataselect(e) {
        const { name, value } = e
        SetAppointment((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function datainput(e) {
        const { name, value } = e.target
        SetAppointment((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const selecttime = [
        { "label": "10:00 AM To 12:00 AM", "name": "appointment_time", "value": "10:00 AM To 12:00 AM" },
        { "label": "1:00 PM To 3:00 PM", "name": "appointment_time", "value": "1:00 PM To 3:00 PM" },
        { "label": "4:00 PM To 6:00 PM", "name": "appointment_time", "value": "4:00 PM To 6:00 PM" },
        { "label": "7:00 PM To 9:00 PM", "name": "appointment_time", "value": "7:00 PM To 9:00 PM" }
    ]
    const option = [
        { "label": "Medical/Surgical Department", "name": "department", "value": "Medical/Surgical Department" },
        { "label": "Intensive Care Unit (ICU):", "name": "department", "value": "Intensive Care Unit (ICU):" },
        { "label": "Pediatrics Department:", "name": "department", "value": "Pediatrics Department:" },
        { "label": "Obstetrics and Gynecology Department", "name": "department", "value": "Obstetrics and Gynecology Department" },
        { "label": "Cardiology Department", "name": "department", "value": "Cardiology Department" }
    ]

    return (
        <div className="HealthCareInformationPopOuterContainer">
            {Isredirect && <Navigate to='/user/login' />}
            {IsFetched.IsFetched ? (IsFetched.IsGood ? (
                <div className="HealthCareInfo_PopOverContainer">
                    <div className="HealthCareLabelContainer textname"> <p>Health Facility</p> <p>Rating : {ListData.rating}</p></div>
                    <h1 className="textname">{ListData.name}</h1>
                    <p className="textname"><i className="fa-solid fa-location-dot"></i> {ListData.locate.landmark}, {ListData.locate.city}, {ListData.locate.state},{ListData.locate.country} </p>
                    <div className="HealthCareInformation">
                        <h3>About</h3>
                        <article>
                            {ListData.about}
                        </article>
                    </div>
                    <div className="HealthCareBookAppointMent">
                        <form onSubmit={postAppointment}>
                            <h3>Book Appointment For This Health Facility ?</h3>
                            <p className="ChargeHealthCare">Fee : <i className="fa-solid fa-indian-rupee-sign"></i> {ListData.appointment_fee} Per Person </p>
                            <p>Select  Date</p>
                            <input id="DateH" type="date" name="appointment_date" onChange={datainput} required />
                            <p>Select  Time</p>
                            <Select id="TimeH" options={selecttime} onChange={dataselect} className="LockAccount_Select" required />

                            <p>Select  Department</p>
                            <Select id="DepartmentH" options={option} onChange={dataselect} className="LockAccount_Select" required />
                            <p>Enter Note (optional)</p>
                            <textarea required name="note" onChange={datainput} placeholder="Enter Your Note Here...." id="textAreaNoteHealthCare">

                            </textarea>
                            <p className="BookedText"><strong>Note</strong> : Once Booked No Amount Will be Refunded In Any Case!</p>
                            <button id="AppointmentButton">Book Appointment</button>
                        </form>
                    </div>
                </div>
            ) : <p className="Couldnotconnect">Could Not Connect To Server...🙄</p>) : (<div className="FetchingDataLogo"> Fetching Details <i className="fa-solid fa-rotate"></i></div>)}
        </div>
    )
}