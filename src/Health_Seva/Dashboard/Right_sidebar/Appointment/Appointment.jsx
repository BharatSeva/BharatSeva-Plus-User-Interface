import { useEffect, useState } from "react"
import "./Appointment.css"
import Select from "react-select"

export default function Appointment() {

    const DataSelected = document.getElementById("SelectDate")


    const [Data, SetData] = useState()
    const [Data3, SetData3] = useState()
    const [IsData, SetIsData] = useState(true)

    function GetApppointment() {
        SetIsData(true)
        SetData(false)

        const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))
        fetch(`http://localhost:5000/api/v1/userdetails/appointment/${UserData.healthId}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${UserData.token}`
            }
        })
            .then(data => data.json())
            .then((res) => {
                if (res.message) {
                    SetIsData(false)
                    return
                }
                SetData(res.data)
            })
            .catch(err => alert(err.message))
    }

    useEffect(() => {
        GetApppointment()
        // console.log("UPdated")
    }, [])
    let Dataapp = Data
    var Appointment, mymeet

    // This Function Will Create A Record
    function RecordsList(data) {
        return (<div className="apppointment_log">
            <p><span>Status :</span>{data.appointment_date > (new Date().toISOString().split('T')[0]) ? <span className="Upcoming">Upcoming</span> : <span className="Completed">Completed</span>}</p>
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
            Dataapp = value ? (Data.filter((data) => (data.appointment_date == value))) : Data
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
            <div className="appointmentContainer">
                <h2 className="USerappointmentHeader">Appointments</h2>
                <p className="UserAppointmentSectionpara">This Section List Your Appointments You Have Scheduled with HealthCares</p>
                <hr></hr>
                <p>Filter By Date :</p>
                {/* <Select options={Option} className="LockAccount_Select" onChange={ONChangevalue}/> */}
                <input id="SelectDate" type="date" onChange={myvalue} />
                <button onClick={myvalue}>Clear Filter</button>
                {IsData ? (Data ? (
                    <div>{Data3 ? Data3 : Appointment}</div>
                ) : (<p>Loading...</p>)) : (<p className="AppointmentLogtext">You Have No Any Appointment Log Yet...</p>)}
            </div>
        </div>
    )
}