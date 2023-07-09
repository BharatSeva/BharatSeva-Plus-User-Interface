import { useEffect, useState } from "react"
import "./Issues.css"
import { FetchData } from "../../../FetchData"
const { v4: uuidv4 } = require('uuid');

function IssuesFormat(props) {
    return (
        <div key={uuidv4()} className="Health_Record_Containers">
            <div className="Health_Issue"> <div className="Issue_Statement">Issue :</div> <div className="Issues">{props.p_problem}</div>  </div>
            <div className="Description"> <div className="Issue_Statement">Description  :</div> <div className="Issues">{props.description}</div> </div>
            <div className="HIP_name"> <div className="Issue_Statement">HealthCare :</div> <div className="Issues">{props.healthcareName}</div></div>
            <div className="Issue_Date"> <div className="Issue_Statement">Issue Date :</div> <div className="Issues">{props.Created_At}</div></div>
            <div className="Medical_Severity MedicalSeverityDangerous"><div className="Issue_Statement">Medical Severity :</div><div className="Issues">{props.medical_severity}</div></div>
        </div>
    )
}

export default function Issues() {
    const [IsFetched, SetIsFetched] = useState({
        ISFetched: false,
        IsGood: false
    })
    const [Fetched, SetFetched] = useState()

    useEffect(() => {

        async function Fetchdata() {
            SetIsFetched((p) => ({ ...p, ISFetched: false }));
            try {
                const { data, res } = await FetchData(`http://localhost:5000/api/v1/userdetails/records`)
                if (res.ok) {
                    SetIsFetched((p) => ({ ...p, IsGood: true }));
                    SetFetched(data)
                }
                // Redirect Goes here
            } catch (err) {
                alert("Connection to Server Could Not Established!")
            }
            SetIsFetched((p) => ({ ...p, ISFetched: true }));
        }
        Fetchdata()
    }, [])

    let Issues, IssuesFetched
    if (IsFetched.IsGood) {
        Issues = (Fetched.records.filter((data) => data.medical_severity.includes("High") || data.medical_severity.includes("Dangerous")))
        IssuesFetched = Issues.length ? Issues.map((data) => IssuesFormat(data)) : (<p className="NoAnyIssues">You Have No Any Issues 🤗</p>)
    }

    return (
        <>

            {IsFetched.ISFetched
                ? (IsFetched.IsGood ? (<div className="IssuesOuterCOntaainer">
                    <div className="IssueContainer">
                        <div className="Issues_Header_Container">
                            <h3>Issues</h3>
                            <p>This Section Lists Your Serious Medical Problems</p>
                        </div>
                        <div className="MedicalIssues_Container">
                            {IssuesFetched}
                        </div>
                    </div>
                </div>) : <p className="Couldnotconnect">Could Not Connect to Server...😪</p>) : (<div className="FetchingDataLogo"> Fetching Issues<i className="fa-solid fa-rotate"></i></div>)
            }

        </>
    )
}