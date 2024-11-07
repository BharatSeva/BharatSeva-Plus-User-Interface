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
            const { data, res } = await FetchData(`/api/v1/user/appointment/fetch`)
            if (res.ok) {
                SetData(data.appointments_details)
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
        let span = (<span className="Pending">Pending</span>)
        let status = data.status
        if (status === "Confirmed") span = (<span className="Confirmed">Confirmed</span>)
        else if(status==="Rejected") span = (<span className="Rejected">Rejected</span>)
        else if(status==="Not Available") span = (<span className="NotAvailable">Not Available</span>)


            return (<div key={uuidv4()} className="apppointment_log">
                <p><span>Status :</span>{span}</p>
                <p><span>Department :</span> {data.department}</p>
                <p><span>Appointment Date :</span> {data.appointment_date}</p>
                <p><span>Appointment Time :</span> {data.appointment_time}</p>
                <p><span>HealthCare :</span> {data.healthcare_name}</p>
                <p><span>HealthCare_ID :</span> {data.healthcare_id}</p>
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