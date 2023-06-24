import { ReactDOM, useEffect, useRef, useState } from "react"
import Select from "react-select"
import "./MyRecords.css"

export default function MyRecords() {
    const [UserData, SetUserData] = useState()
    const [FilterM, SetFilterM] = useState(false)
    const [FilterS, SetFilterS] = useState(false)
    const [Fetched, IsFetched] = useState(false)
    const [Searched, IsSearched] = useState(false)
    let val
    function ClearSelect() {
        // Month.label == "Select" 
        val = null
        SetFilterM(false)
        SetFilterS(false)
        IsSearched(false)
    }

    function DisplayRecords(data) {
        return (<div className="Health_Record_Containers">
            <div className="Health_Issue"> <div className="Issue_Statement">Issue :</div> <div className="Issues">{data.p_problem}</div>  </div>
            <div className="Description"> <div className="Issue_Statement">Description  :</div> <div className="Issues">{data.description}</div> </div>
            <div className="HIP_name"> <div className="Issue_Statement">HIP :</div> <div className="Issues">{data.HIP_name}</div></div>
            <div className="Issue_Date"> <div className="Issue_Statement">Issue Date :</div> <div className="Issues">{data.Created_At}</div></div>
            <div className="Medical_Severity"><div className="Issue_Statement">Medical Severity :</div><div className="Issues">{data.medical_severity}</div></div>
        </div>)
    }

    useEffect(() => {

        const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))
        fetch(`http://localhost:5000/api/v1/userdetails/records/${UserData.healthId}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${UserData.token}`,
            },
            mode: "cors",
        })
            .then((result) => result.json())
            .then((data) => {
                SetUserData(data)
                IsFetched(true);
            })
            .catch((err) => {
                console.log(err.message)
                alert(err.message)
            })
        // console.log("Records API has been Fetched")
    }, [])


    function FilterRecordsMonths(e) {
        if (UserData.records) {
            const { value, name } = e
            SetFilterM((UserData.records.filter((data) => value.includes(data.Created_At.split(" ")[1]))))
            IsSearched(true)
        }
    }
    let FilterRecord
    function FilterRecords(e) {
        if (UserData.records) {
            const { name, value } = e
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
    if (Fetched) {
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
            <div className="MyRecordsOuterContainer">

                {!Fetched && (<div className="FetchingDataLogo"> Fetching Records <i className="fa-solid fa-rotate"></i></div>)}
                {Fetched && (
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
                )}
            </div>

        </>
    )
}