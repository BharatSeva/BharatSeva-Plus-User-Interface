import { useEffect, useState } from "react"
import "./Issues.css"

function IssuesFormat(props) {
    return (
        <div className="Health_Record_Containers">
            <div className="Health_Issue"> <div className="Issue_Statement">Issue :</div> <div className="Issues">{props.p_problem}</div>  </div>
            <div className="Description"> <div className="Issue_Statement">Description  :</div> <div className="Issues">{props.description}</div> </div>
            <div className="HIP_name"> <div className="Issue_Statement">HIP :</div> <div className="Issues">{props.HIP_name}</div></div>
            <div className="Issue_Date"> <div className="Issue_Statement">Issue Date :</div> <div className="Issues">{props.Created_At}</div></div>
            <div className="Medical_Severity"><div className="Issue_Statement">Medical Severity :</div><div className="Issues">{props.medical_severity}</div></div>
        </div>
    )
}

export default function Issues() {


    const [IsFetched, SetIsFetched] = useState(false)
    const [Fetched, SetFetched] = useState({})

    useEffect(() => {
        const Health_ID = localStorage.getItem("BharatSevaHealth_ID")
        const TokenID = localStorage.getItem("BharatSevaToken");
        fetch(`http://localhost:5000/api/v1/patientDetails/get/${Health_ID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${TokenID}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                SetIsFetched(true);
                SetFetched(data)
            })
            .catch((err)=>{
                console.log(err.message)
                alert("Something Went Wrong")
            })

        console.log("Issues Data has Been Fetched")
    }, [])

    let Issues = [];
    let issues;
    if (IsFetched) {
        Issues = [];
        if (Fetched.Details_length > 0) {
            for (let i = 0; i < Fetched.Details_length; i++) {

                if (Fetched.details[i].medical_severity === 'High') {
                        Issues.push( 
                        <IssuesFormat key={i}
                        p_problem={Fetched.details[i].p_problem}
                        description={Fetched.details[i].description}
                        HIP_name={Fetched.details[i].HIP_name}
                        Created_At={Fetched.details[i].Created_At}
                        medical_severity={Fetched.details[i].medical_severity}
                    />
                    )
                }
            }
        }
        else{
            Issues.push(<div style={{color:"green", textAlign:"center"}} >You Don't have any Issues Yet </div>)
        }
    }



    return (
        <>
            <div className="IssueContainer">
                {!IsFetched && (<div className="FetchingDataLogo"> Fetching Issues<i className="fa-solid fa-rotate"></i></div>)}
                {IsFetched && (
                    <>
                        <div className="Issues_Header_Container">
                            <h3>Issues</h3>
                            <p>This Section Lists Your Serious Medical Problems</p>
                        </div>

                        <div className="MedicalIssues_Container">

                            {Issues}

                        </div>
                    </>
                )}

            </div>
        </>
    )
}