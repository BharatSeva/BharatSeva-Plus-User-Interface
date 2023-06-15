import { useEffect, useState } from "react"
import "./Home.css"

export default function Home() {

    const [GetData, SetGetData] = useState(false)
    const [SmWrong, SetSmwrong ] = useState(false)
    const [IsBioData, SetIsBioData] = useState(false)

    useEffect(() => {
        const TokenID = localStorage.getItem("BharatSevaToken");
        const GetBioApi = async () => {
            const GetHealthID = localStorage.getItem("BharatSevaHealth_ID")

            if (GetHealthID) {
                fetch(`http://localhost:5000/api/v1/patientDetails/patientBioData/patient/${GetHealthID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `${TokenID}`,
                    },
                    mode: 'cors'
                })
                    .then((data) => data.json())
                    .then((result) => {
                        SetIsBioData(true)
                        SetGetData(result)
                        if(result.Data === null){
                            console.log("Null Data is Detected")
                            alert("Can't Find Your Data")
                            SetGetData(false)
                        }
                    })
                    .catch((err) => {
                        alert('Server is not Responding Please try after some time')
                        console.log(err.message)
                    })
                    
            }else{
                SetSmwrong(true);
            }

        }

        GetBioApi()

    }, [])


    return (
        <>  
            {SmWrong && !GetData && (<div className="HomeLoadingScreen HomeLoadingScreenSWW ">Something Went Wrong ! 🙄</div>)}

            {!IsBioData && !SmWrong && (<div className="HomeLoadingScreen"><p>Fetching Data</p> <i className="fa-solid fa-rotate"></i></div>)}

            {IsBioData && !SmWrong && GetData && (
                <div className="HomeContainer">

                    <div className="profilebanner">
                        <div className="profileImage">

                        </div>
                        <div className="profilePhoto">
                            {/* <img src={profileImage}></img> */}
                        </div>
                        <div className="profiledetails">

                            <div className="profiledetails_Left">
                                <p>{GetData.Data.fname} {GetData.Data.lname}</p>
                                <p>{GetData.Data.health_id}</p>
                            </div>

                            <div className="profiledetails_Right">
                                <p>Health Score : 100</p>

                            </div>

                        </div>

                        {/* Bio Data Starts From Here */}
                        <div className="BioDataContainer">
                            <div className="BioDataAbout">

                                <h3 className="BioDataHeader">Bio Data</h3>

                                <div><p>First Name :</p>  <p>{GetData.Data.fname}</p></div>
                                <div><p>Middle Name :</p> <p>{GetData.Data.middlename}</p></div>
                                <div><p>Last Name :</p>  <p>{GetData.Data.lname}</p></div>
                                <div><p>Sex :</p>  <p>{GetData.Data.sex}</p></div>
                                <div><p>Blood Group :</p> <p>{GetData.Data.bloodgrp}</p></div>
                                <div><p>Weight :</p> <p>{GetData.Data.Weight}</p></div>
                                <div><p>BMI :</p> <p>{GetData.Data.BMI}</p></div>
                                <div><p>Marriage Status :</p><p> {GetData.Data.MarriageStatus}</p></div>
                                <div><p>DOB :</p><p> {GetData.Data.dob}</p></div>
                                <div><p>Email:</p><p>{GetData.Data.email}</p></div>
                                <div><p>Mobile Number:</p><p>{GetData.Data.mobilenumber}</p></div>
                                <div><p>Aadhaar Number:</p><p>{GetData.Data.aadharNumber}</p></div>
                                <div><p>Primary From:</p><p>{GetData.Data.Plocation}</p></div>
                                <div><p>Any Sibling: </p><p>{GetData.Data.sibling}</p></div>
                                <div><p>Twin: </p><p>{GetData.Data.twin}</p></div>

                                <div><p>Father's Name:</p><p>{GetData.Data.fathername}Pappa</p></div>
                                <div><p>Mother's Name:</p><p>{GetData.Data.mothername}Mummy</p></div>
                            </div>
                        </div>

                    </div>



                </div>
            )}

        </>
    )
}