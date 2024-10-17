import { useEffect, useState } from "react"
import Select from "react-select"
import "./MyRecords.css"
import { FetchData } from "../../../FetchData"
import { Navigate } from "react-router-dom"
const { v4: uuidv4 } = require('uuid');

export default function MyRecords() {

    const [UserData, SetUserData] = useState()
    const [FilterM, SetFilterM] = useState(false)
    const [FilterS, SetFilterS] = useState(false)
    const [Searched, IsSearched] = useState(false)

    const [Fetched, SetIsFetched] = useState({
        IsFetched: false,
        IsGood: false
    })
    const [Isredirect, SetIsredirect] = useState(false)

    
    let val
    function ClearSelect() {
        val = null
        SetFilterM(false)
        SetFilterS(false)
        IsSearched(false)
    }

    function DisplayRecords(data) {
        return (<div key={uuidv4()} className="Health_Record_Containers">
            <div className="Health_Issue"> <div className="Issue_Statement">Issue :</div> <div className="Issues">{data.p_problem}</div>  </div>
            <div className="Description"> <div className="Issue_Statement">Description  :</div> <div className="Issues">{data.description}</div> </div>
            <div className="HIP_name"> <div className="Issue_Statement">HealthCare Name :</div> <div className="Issues">{data.healthcareName}</div></div>
            <div className="Issue_Date"> <div className="Issue_Statement">Issue Date :</div> <div className="Issues">{data.Created_At}</div></div>
            <div className="Medical_Severity"><div className="Issue_Statement">Medical Severity :</div><div className="Issues">{data.medical_severity}</div></div>
        </div>)
    }

    useEffect(() => {
        async function GetData() {
            SetIsFetched((p) => ({ ...p, IsFetched: false }));
            try {
                let { data, res } = await FetchData(`/api/v1/userdetails/records`)
                if (res.ok) {
                    SetUserData(data)
                    SetIsFetched((p) => ({ ...p, IsGood: true }))
                } 
                // Redirect Url Will Go Here
                else if (res.status === 405) { SetIsredirect(true) }

            } catch (err) {
                alert("Could Not Connect to Server!")
                console.log(err)
            }
            SetIsFetched((p) => ({ ...p, IsFetched: true }))
        }
        GetData()
    }, [])


    function FilterRecordsMonths(e) {
        if (UserData.records) {
            const { value } = e
            SetFilterM((UserData.records.filter((data) => value.includes(data.Created_At.split(" ")[1]))))
            IsSearched(true)
        }
    }
    let FilterRecord
    function FilterRecords(e) {
        if (UserData.records) {
            const { value } = e
            SetFilterS(FilterM.length ? (FilterM.filter((data) => data.medical_severity.includes(value))) : (UserData.records.filter((data) => data.medical_severity.includes(value))))
            IsSearched(true)
        }
    }

    if (FilterM.length && !FilterS) {
        FilterRecord = FilterM.map((data) => DisplayRecords(data))
        console.log("Yes")
    }
    else if (!FilterM.length && !FilterS.length) {
        FilterRecord = false
    }
    else if (!FilterM && FilterS.length) {
        FilterRecord = FilterS.map((data) => DisplayRecords(data))
    }
    else if (FilterM.length && !FilterS.length) {
        FilterRecord = false
    }
    else if (FilterM.length && FilterS.length) {
        FilterRecord = FilterS.map((data) => DisplayRecords(data))
    }
    let HealthRecords
    if (Fetched.IsGood) {
        HealthRecords = UserData.records_length ? UserData.records.map((data) => DisplayRecords(data)) : (<p className="MyRecordsEmpty">You Don't Have Any medical Records Yet</p>)
    }



    const Options = [
        { "label": "Dangerous", "value": "Dangerous", "name": "Medical" },
        { "label": "High", "value": "High", "name": "Medical" },
        { "label": "Semi-Mid", "value": "Semi-Mid", "name": "Medical" },
        { "label": "Low", "value": "Low", "name": "Medical" }
    ]
    const Month_Options = [
        { "label": "January", "value": "January", "name": "Months" },
        { "label": "February", "value": "February", "name": "Months" },
        { "label": "March", "value": "March", "name": "Months" },
        { "label": "April", "value": "April", "name": "Months" },
        { "label": "May", "value": "May", "name": "Months" },
        { "label": "June", "value": "June", "name": "Months" },
        { "label": "July", "value": "July", "name": "Months" },
        { "label": "August", "value": "August", "name": "Months" },
        { "label": "September", "value": "September", "name": "Months" },
        { "label": "October", "value": "October", "name": "Months" },
        { "label": "November", "value": "November", "name": "Months" },
        { "label": "December", "value": "December", "name": "Months" }
    ]

    return (
        <>
        {Isredirect && <Navigate to='/user/login' />}
            <div className="MyRecordsOuterContainer">

                {Fetched.IsFetched ? (Fetched.IsGood ? (
                    <div className="MyRecordsContainer">
                        <div className="MyRecordHeader">
                            <h3>My Records</h3>
                            <p>Last Updated At : {UserData.records_length ? UserData.records[0].Created_At : (<span>--/--</span>)}</p>
                            <div className="MyRecordsFilteContainer">
                                <p>Filter By Month</p>
                                <Select options={Month_Options} className="LockAccount_Select MyRecordsFilter FilterMonths" onChange={FilterRecordsMonths} value={val} />
                                <p>Filter By Medical Severity</p>
                                <Select options={Options} className="MyRecordsFilter LockAccount_Select FilterSeverity" onChange={FilterRecords} />
                                <button id="myrecordsFilterbtn" className={Searched ? "myrecordsClearbtn" : "btnnoseleceted"} onClick={ClearSelect}>Clear Filter</button>
                            </div>
                        </div>

                        {/* {!FilterM && !FilterS && HealthRecords} */}
                        {/* {HealthRecords} */}
                        <div className="Records">
                            {Searched ? (FilterRecord ? FilterRecord : (<p>No Result Found !</p>)) : HealthRecords}
                        </div>
                    </div>
                ) : <p className="Couldnotconnect">Could Not Connect to Server...🙄</p>) : (<div className="FetchingDataLogo"> Fetching Records <i className="fa-solid fa-rotate"></i></div>)}
            </div>

        </>
    )
}