import { ReactDOM } from "react"
import "./RightSideContainer.css"


export default function MyRecords(){

    function HealthData(props){
        return(
            <div className="Health_Record_Containers">
            <p className="Health_Issue"> <p className="Issue_Statement">Issue :</p> <p className="Issues">{props.p_problem}</p>  </p>
            <p className="Description"> <p className="Issue_Statement">Description  :</p> <p className="Issues">{props.description}</p> </p>
            <p className="HIP_name"> <p className="Issue_Statement">HIP :</p> <p className="Issues">{props.HIP_name}</p></p>
            <p className="Issue_Date"> <p className="Issue_Statement">Issue Date :</p> <p className="Issues">{props.Created_At}</p></p>
            </div>
        )
    }


    return(
        <>
        <div className="MyRecordsContainer">
                <div className="MyRecordHeader">
                <h3>My Health Records</h3>
                <p>Last Updated at : Sat Mar 18 2023 17:40:00 GMT+0530 (India Standard Time) </p>
                </div>
                
                <div className="Records">

                <HealthData p_problem="Headache" 
                            description="Faced Mild Fever, Vomiting, Headache, LooseMotion and several other effects that patient has faced uptill now....."
                            HIP_name="Shri Hospital, Near MMMUT Engineering College, Gorkhpur, UP, India 273010"
                            Created_At="Sat Mar 18 2023 17:40:00 GMT+0530 (India Standard Time)" />
                <HealthData p_problem="Headache" 
                            description="Mild Fever, loose Motion and Vomiting Occrred in midnest of night and given paracetomol 200mg"
                            HIP_name="Rajesh Hospital, Gorkhpur, UP, India 273010"
                            Created_At="Sat Mar 18 2023 17:40:00 GMT+0530 (India Standard Time)" />
                <HealthData p_problem="Headache" 
                            description="Mild Fever, loose Motion and Vomiting Occrred in midnest of night and given paracetomol 200mg"
                            HIP_name="Rajesh Hospital, Gorkhpur, UP, India 273010"
                            Created_At="Sat Mar 18 2023 17:40:00 GMT+0530 (India Standard Time)" />
                <HealthData p_problem="Headache" 
                            description="Mild Fever, loose Motion and Vomiting Occrred in midnest of night and given paracetomol 200mg"
                            HIP_name="Rajesh Hospital, Gorkhpur, UP, India 273010"
                            Created_At="Sat Mar 18 2023 17:40:00 GMT+0530 (India Standard Time)" />

                </div>
        </div>
        </>
    )
}