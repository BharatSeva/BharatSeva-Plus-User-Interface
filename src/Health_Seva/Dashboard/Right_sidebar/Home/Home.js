import { useEffect, useState } from "react"
import "./Home.css"
import { FetchData } from "../../../FetchData"
import { Navigate } from "react-router-dom"
export default function Home() {

    const [GetData, SetGetData] = useState()
    const [IsFetched, SetIsFetched] = useState({
        IsFetched: false,
        IsGood: false
    })

    const [Isredirect, SetIsredirect] = useState(false)




    useEffect(() => {
        const GetBioApi = async () => {
            SetIsFetched((p) => ({ ...p, IsFetched: false }))
            try {
                let { data, res } = await FetchData(`/api/v1/userdetails/user`)
                if (res.ok) {
                    SetIsFetched((p) => ({ ...p, IsGood: true }))
                    SetGetData(data)
                }
                else if (res.status === 405) { SetIsredirect(true) }
                else {

                    SetIsFetched((p) => ({ ...p, IsGood: false }))
                }
            } catch (err) {
                alert('Server is not Responding... Please try after some time')
            }
            SetIsFetched((p) => ({ ...p, IsFetched: true }))
        }
        GetBioApi()
    }, [])

    return (
        <>
            {Isredirect && <Navigate to='/user/login' />}
            {IsFetched.IsFetched ? (IsFetched.IsGood ? (
                <div className="HomeContainer">

                    <div className="profilebanner">
                        <div className="profileImage">

                        </div>
                        <div className="profilePhoto">
                            {/* <img src={profileImage}></img> */}
                        </div>
                        <div className="profiledetails">

                            <div className="profiledetails_Left">
                                <p>{GetData.BioData.fname} {GetData.BioData.lname}</p>
                                <p>{GetData.BioData.health_id}</p>
                            </div>

                            <div className="profiledetails_Right">
                                <p>Health Score : 100</p>

                            </div>

                        </div>

                        {/* Bio Data Starts From Here */}
                        <div className="BioDataContainer">
                            <div className="BioDataAbout">

                                <h3 className="BioDataHeader">Bio Data</h3>

                                <div><p>First Name :</p>  <p>{GetData.BioData.fname}</p></div>
                                <div><p>Middle Name :</p> <p>{GetData.BioData.middlename}</p></div>
                                <div><p>Last Name :</p>  <p>{GetData.BioData.lname}</p></div>
                                <div><p>Sex :</p>  <p>{GetData.BioData.sex}</p></div>
                                <div><p>Blood Group :</p> <p>{GetData.BioData.bloodgrp}</p></div>
                                <div><p>Weight :</p> <p>{GetData.BioData.Weight}</p></div>
                                <div><p>BMI :</p> <p>{GetData.BioData.BMI}</p></div>
                                <div><p>Marriage Status :</p><p> {GetData.BioData.MarriageStatus}</p></div>
                                <div><p>DOB :</p><p> {GetData.BioData.dob}</p></div>
                                <div><p>Email:</p><p>{GetData.BioData.email}</p></div>
                                <div><p>Mobile Number:</p><p>{GetData.BioData.mobilenumber}</p></div>
                                <div><p>Aadhaar Number:</p><p>{GetData.BioData.aadharNumber}</p></div>
                                <div><p>Primary From:</p><p>{GetData.BioData.Plocation}</p></div>
                                <div><p>Any Sibling: </p><p>{GetData.BioData.sibling}</p></div>
                                <div><p>Twin: </p><p>{GetData.BioData.twin}</p></div>

                                <div><p>Father's Name:</p><p>{GetData.BioData.fathername}Pappa</p></div>
                                <div><p>Mother's Name:</p><p>{GetData.BioData.mothername}Mummy</p></div>
                            </div>
                        </div>

                    </div>



                </div>
            ) : <p className="Couldnotconnect">Could Not Connect to Server...🙄</p>) : (<div className="HomeLoadingScreen"><p>Fetching Data</p> <i className="fa-solid fa-rotate"></i></div>)}

        </>
    )
}