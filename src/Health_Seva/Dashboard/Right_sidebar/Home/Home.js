import { useEffect, useState } from "react";
import "./Home.css";
import { FetchData } from "../../../FetchData";
import { Navigate } from "react-router-dom";

export default function Home() {
    const [GetData, SetGetData] = useState();
    const [IsFetched, SetIsFetched] = useState({
        IsFetched: false,
        IsGood: false
    });

    const [Isredirect, SetIsredirect] = useState(false);

    useEffect(() => {
        const GetBioApi = async () => {
            SetIsFetched((p) => ({ ...p, IsFetched: false }));
            try {
                let { data, res } = await FetchData(`/profile?cache=true`);
                if (res.ok) {
                    SetIsFetched((p) => ({ ...p, IsGood: true }));
                    SetGetData(data.profile_data);
                    console.log(data.profile_data)
                } else if (res.status === 405) {
                    SetIsredirect(true);
                } else {
                    SetIsFetched((p) => ({ ...p, IsGood: false }));
                }
            } catch (err) {
                alert('Server is not Responding... Please try after some time');
            }
            SetIsFetched((p) => ({ ...p, IsFetched: true }));
        }
        GetBioApi();
    }, []);

    return (
        <>
            {Isredirect && <Navigate to='/client/login' />}
            {IsFetched.IsFetched ? (IsFetched.IsGood ? (
                <div className="HomeContainer">
                    <div className="profilebanner">
                        <div className="profileImage"></div>
                        <div className="profilePhoto">
                        </div>
                        <div className="profiledetails">
                            <div className="profiledetails_Left">
                                <p>{GetData.first_name} {GetData.last_name}</p>
                                <p>{GetData.health_id}</p>
                            </div>
                            <div className="profiledetails_Right">
                                <p>Health Score : 100</p>
                            </div>
                        </div>

                        {/* Bio Data Starts From Here */}
                        <div className="BioDataContainer">
                            <div className="BioDataAbout">
                                <h3 className="BioDataHeader">Bio Data</h3>
                                <div><p>First Name :</p> <p>{GetData.first_name}</p></div>
                                <div><p>Middle Name :</p> <p>{GetData.last_name}</p></div>
                                <div><p>Last Name :</p> <p>{GetData.lname}</p></div>
                                <div><p>Sex :</p> <p>{GetData.sex}</p></div>
                                <div><p>Blood Group :</p> <p>{GetData.blood_group}</p></div>
                                <div><p>Weight :</p> <p>{GetData.weight}</p></div>
                                <div><p>BMI :</p> <p>{GetData.bmi}</p></div>
                                <div><p>Marriage Status :</p> <p>{GetData.marriage_status}</p></div>
                                <div><p>DOB :</p> <p>{GetData.dob}</p></div>
                                <div><p>Email:</p> <p>{GetData.email}</p></div>
                                <div><p>Mobile Number:</p> <p>{GetData.mobile_number}</p></div>
                                <div><p>Aadhaar Number:</p> <p>{GetData.aadhaar_number}</p></div>
                                <div><p>Primary Location:</p> <p>{GetData.primary_location}</p></div>
                                <div><p>Any Sibling:</p> <p>{GetData.sibling}</p></div>
                                <div><p>Twin:</p> <p>{GetData.twin}</p></div>
                                <div><p>Father's Name:</p> <p>{GetData.father_name}</p></div>
                                <div><p>Mother's Name:</p> <p>{GetData.mother_name}</p></div>
                                <div><p>Emergency Number:</p> <p>{GetData.emergency_number}</p></div>
                                <div><p>Country:</p> <p>{GetData.country}</p></div>
                                <div><p>State:</p> <p>{GetData.state}</p></div>
                                <div><p>City:</p> <p>{GetData.city}</p></div>
                                <div><p>Landmark:</p> <p>{GetData.landmark}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <p className="Couldnotconnect">Could Not Connect to Server...🙄</p>) : (<div className="HomeLoadingScreen"><p>Fetching Data</p> <i className="fa-solid fa-rotate"></i></div>)}
        </>
    );
}
