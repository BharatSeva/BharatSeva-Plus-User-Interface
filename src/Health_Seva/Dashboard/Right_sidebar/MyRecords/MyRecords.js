import { ReactDOM, useEffect, useState } from "react"
import { json } from "react-router-dom"
import "./MyRecords.css"

function HealthData(props) {
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



export default function MyRecords() {
    
    const [UserData, SetUserData] = useState({})
    const [Fetched, IsFetched] = useState(false)
    useEffect(() => {
        const Health_ID = localStorage.getItem("BharatSevaHealth_ID")
        const TokenID = localStorage.getItem("BharatSevaToken");
        fetch(`http://localhost:5000/api/v1/patientDetails/get/${Health_ID}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `${TokenID}`,
                // 'Access-Control-Allow-Origin': '*'
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
            })
            console.log("API has been Fetched")
    }, [])

    let Health_id = []
    if (Fetched) {
        Health_id = [];
        if (UserData.Details_length > 0 ) {

            for (let i = 0; i < UserData.Details_length; i++) {
                Health_id.push(<HealthData key={i} 
                    p_problem={UserData.details[i].p_problem}
                    description={UserData.details[i].description}
                    HIP_name={UserData.details[i].HIP_name}
                    Created_At={UserData.details[i].Created_At}
                    medical_severity={UserData.details[i].medical_severity}
                    />)
            }
        }
        else{
            Health_id.push(<div style={{color:"red", textAlign:"center"}} >You Don't have any medical Record Yet </div>)
        }

    }


    return (
        <>
            {!Fetched && (<div className="FetchingDataLogo"> Fetching Records <i className="fa-solid fa-rotate"></i></div>)}
            {Fetched && (
                <div className="MyRecordsContainer">
                    <div className="MyRecordHeader">
                        <h3>My Records</h3>
                        <p>Last Updated At : { UserData.Details_length>0  && UserData.details[0].Created_At}</p>
                    </div>

                    <div className="Records">
                        {Health_id}
                    </div>
                </div>
            )}

        </>
    )
}