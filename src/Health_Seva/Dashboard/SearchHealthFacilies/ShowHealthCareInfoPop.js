import "./ShowHealthCareInfoPop.css"
import Select from "react-select"
import DateTimePicker from 'react-datetime-picker';
import { useEffect, useState } from "react";

export default function ShowHealthInfo_PopOver() {

    const [Appointment, SetAppointment] = useState({
        healthcare_name:"Vaibhav Hospital"
    })
    const [ListData, SetListData] = useState(false)

    // Post Appointment
    let healthId = "9AgdsnGYs229HxBBZdqY"
    function postAppointment(e) {
        e.preventDefault()
        fetch(`http://localhost:5000/api/v1/patientDetails/${healthId}/appointment/${localStorage.getItem("BharatSevaHealth_ID")}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `${localStorage.getItem("BharatSevaToken")}`
            },
            body: JSON.stringify(Appointment)
        })
            .then((data) => data.json())
            .then((res) => {
                alert(res.message)

            })
            .catch(err => alert("Appointment Not done !"))
    }

    // Fetch HealthCareHEre
    function GetHealthCareForAppointment() {
        fetch(`http://localhost:5000/api/v1/healthcare/appointment/${healthId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `${localStorage.getItem("BharatSevaToken")}`
            }
        })
            .then((data) => data.json())
            .then((res) => SetListData(res.data))
            .catch(err => {
                alert(err.message)
                SetListData(false)
            })
    }

    useEffect(()=>{
        GetHealthCareForAppointment()
    },[])

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

    let HealthCareName = "Vaibhav Hospital"
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
            {ListData ? (
                <div className="HealthCareInfo_PopOverContainer">
                    <div className="HealthCareLabelContainer textname"> <p>Health Facility</p> <p>Rating : {ListData.rating}</p></div>
                    <h1 className="textname">{ListData.name}</h1>
                    <p className="textname"><i className="fa-solid fa-location-dot"></i> {ListData.location.landmark},{ListData.location.street}, {ListData.location.city}, {ListData.location.state} </p>
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
            ) : (<p>Loading...</p>)}
        </div>
    )
}