import { useEffect, useState } from "react"
import "./Appointment.css"
import { FetchData } from "../../../FetchData"
import { Navigate } from "react-router-dom"
const { v4: uuidv4 } = require('uuid');
export default function Appointment() {
    const DataSelected = document.getElementById("SelectDate")
    const [Isredirect, SetIsredirect] = useState(false)


    const [Data, SetData] = useState()
    const [Data3, SetData3] = useState()
    const [IsData, SetIsData] = useState({
        IsFetched: false,
        IsGood: false,
        Iserr: false

    })

    async function GetApppointment() {
        SetData(false)

        try {
            const { data, res } = await FetchData(`/api/v1/userdetails/appointment`)
            if (res.ok) {
                SetData(data.data)
                SetIsData((p) => ({ ...p, IsGood: true }))
            }
            // Redirect Goes Here...
            else if (res.status === 405) { SetIsredirect(true) }
        } catch (err) {
            alert("Could Not Connect to Server...")
            SetIsData((p) => ({ ...p, Iserr: true }))
        }
        SetIsData((p) => ({ ...p, IsFetched: true }))
    }
    useEffect(() => {
        GetApppointment()
    }, [])
    let Dataapp = Data
    var Appointment

    // This Function Will Create A Record
    function RecordsList(data) {
        return (<div key={uuidv4()} className="apppointment_log">
            <p><span>Status :</span>{(data.appointment_date > (new Date().toISOString().split('T')[0])) ? <span className="Upcoming">Upcoming</span> : <span className="Completed">Completed</span>}</p>
            <p><span>Health Care Name :</span> {data.healthcare_name}</p>
            <p><span>Department :</span> {data.department}</p>
            <p><span>Appointment Date :</span> {data.appointment_date}</p>
            <p><span>Appointment Time :</span> {data.appointment_time}</p>
            <p><span>Note :</span> <span id="AppointmentNoteSection">{data.note}</span></p>
        </div>)
    }

    function myvalue(e) {
        const { value } = e.target
        if (Data) {
            Dataapp = value ? (Data.filter((data) => (data.appointment_date === value))) : Data
            Dataapp.length ? SetData3(Dataapp.map((data) => RecordsList(data))) : SetData3(<p>No Records Found For the Selected Date</p>)
        }
        if (!value) {
            DataSelected.value = ""
        }
    }

    if (Data) {
        Appointment = (Dataapp.map((data) => RecordsList(data)))
        console.log("List Updated....")
    }

    return (
        <div className="AppointmentUserOuterContainer">
            {Isredirect && <Navigate to='/user/login' />}
            <div className="appointmentContainer">
                <h2 className="USerappointmentHeader">Appointments</h2>
                <p className="UserAppointmentSectionpara">This Section List Your Appointments You Have Scheduled with HealthCares</p>
                <hr></hr>
                <p>Filter By Date :</p>
                <input id="SelectDate" type="date" onChange={myvalue} />
                <button onClick={myvalue}>Clear Filter</button>
                <>
                    {
                        IsData.IsFetched ? (IsData.IsGood ? (Data3 ? Data3 : Appointment) : (IsData.Iserr ? (<p className="Couldnotconnect">Could Not Connect To Server...</p>) : <p>No Any Appointment Log...</p>)) : ((<div className="Fetchingappointmentlogo"> Fetching Appointment<i className="fa-solid fa-rotate"></i></div>))
                    }
                </>
            </div>
        </div>
    )
}