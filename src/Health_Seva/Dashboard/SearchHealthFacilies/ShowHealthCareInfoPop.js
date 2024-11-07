import "./ShowHealthCareInfoPop.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { FetchData, PostData } from "../../FetchData";
import { useSearchParams, Navigate } from "react-router-dom";

export default function ShowHealthInfo_PopOver() {
    const [listData, setListData] = useState(null);
    const [isRedirect, setIsRedirect] = useState(false);
    const [fetchStatus, setFetchStatus] = useState({ isFetched: false, isGood: false });
    const [appointment, setAppointment] = useState({});
    const [params] = useSearchParams();

    // Appointment POST handler
    async function handlePostAppointment(e) {
        e.preventDefault();
        try {
            const { data, res } = await PostData(`/appointment/create`, appointment);
            if (res.ok) {
                alert("Appointment Successful");
            } else if (res.status === 405) {
                setIsRedirect(true);
            } else {
                alert(data?.message || "Failed to create appointment.");
            }
            console.log("Data", data)
        } catch (error) {
            console.error("Error posting appointment:", error);
            alert("Failed to create appointment. Please try again.");
        }
    }

    // Fetch Healthcare Data
    useEffect(() => {
        async function fetchHealthcareData() {
            setFetchStatus({ isFetched: false, isGood: false });
            try {
                const { data, res } = await FetchData(`/appointment/healthcare/search?healthcare_id=${params.get("healthcare_id")}`);
                if (res.ok) {
                    setListData(data.healthcare);
                    setFetchStatus({ isFetched: true, isGood: true });
                } else if (res.status === 405) {
                    setIsRedirect(true);
                }
            } catch (error) {
                console.error("Error fetching healthcare data:", error);
                alert("Please check your internet connection.");
                setFetchStatus({ isFetched: true, isGood: false });
            }
        }
        fetchHealthcareData();

    }, [params]);

    // Set default appointment healthcare name
    useEffect(() => {
        setAppointment(prev => ({ ...prev, healthcare_name: params.get("healthcarename") }));
    }, [params]);

    // Handle changes for Select components
    function handleSelectChange(option) {
        const { name, value } = option;
        setAppointment(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Handle input field changes
    function handleInputChange(e) {
        const { name, value } = e.target;
        setAppointment(prev => ({
            ...prev,
            [name]: value,
            "healthcare_id": params.get("healthcare_id")
        }));
    }

    // Appointment time and department options
    const timeOptions = [
        { label: "10:00 AM To 12:00 PM", name: "appointment_time", value: "10:00 AM To 12:00 PM" },
        { label: "1:00 PM To 3:00 PM", name: "appointment_time", value: "1:00 PM To 3:00 PM" },
        { label: "4:00 PM To 6:00 PM", name: "appointment_time", value: "4:00 PM To 6:00 PM" },
        { label: "7:00 PM To 9:00 PM", name: "appointment_time", value: "7:00 PM To 9:00 PM" }
    ];
    const departmentOptions = [
        { label: "Medical/Surgical Department", name: "department", value: "Medical/Surgical Department" },
        { label: "Intensive Care Unit (ICU)", name: "department", value: "Intensive Care Unit (ICU)" },
        { label: "Pediatrics Department", name: "department", value: "Pediatrics Department" },
        { label: "Obstetrics and Gynecology Department", name: "department", value: "Obstetrics and Gynecology Department" },
        { label: "Cardiology Department", name: "department", value: "Cardiology Department" }
    ];

    return (
        <div className="HealthCareInformationPopOuterContainer">
            {isRedirect && <Navigate to="/user/login" replace />}
            {fetchStatus.isFetched ? (
                fetchStatus.isGood ? (
                    <div className="HealthCareInfo_PopOverContainer">
                        <div className="HealthCareLabelContainer textname">
                            <p>Health Facility</p>
                            <p> Healthcare_ID : {listData?.healthcare_id}</p>
                            {/* <p> Healthcare_license : {listData?.healthcare_license}</p> */}
                        </div>
                        <h1 className="textname">{listData?.healthcare_name}</h1>
                        <p className="textname">
                            <i className="fa-solid fa-location-dot"></i> {listData?.landmark}, {listData?.city}, {listData?.state}, {listData?.country}
                        </p>
                        <div className="HealthCareInformation">
                            <h3>About</h3>
                            <p>{listData?.about}</p>
                            <p>Email: {listData?.email}</p>
                            <p>Availability: {listData?.availability}</p>
                            <p>Total Facilities: {listData?.total_facilities}</p>
                            <p>Total MBBS Doctor: {listData?.total_mbbs_doc}</p>
                            <p>No. of Beds: {listData?.no_of_beds}</p>
                            <p> Date of Registration: {new Date(listData?.date_of_registration).toLocaleDateString()}</p>
                        </div>
                        <div className="HealthCareBookAppointMent">
                            <form onSubmit={handlePostAppointment}>
                                <h3>Book Appointment For This Health Facility?</h3>
                                <p className="ChargeHealthCare">Fee: ₹{listData?.appointment_fee} Per Person</p>
                                <p>Select Date</p>
                                <input type="date" name="appointment_date" onChange={handleInputChange} required />
                                <p>Select Time</p>
                                <Select options={timeOptions} onChange={handleSelectChange} className="LockAccount_Select" required />
                                <p>Select Department</p>
                                <Select options={departmentOptions} onChange={handleSelectChange} className="LockAccount_Select" required />
                                <p>Enter Note (optional)</p>
                                <textarea name="note" onChange={handleInputChange} placeholder="Enter Your Note Here...." className="textAreaNoteHealthCare"></textarea>
                                <p className="BookedText">
                                    <strong>Note:</strong> Once booked, no refund will be available.
                                </p>
                                <button id="AppointmentButton" type="submit">Book Appointment</button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <p className="Couldnotconnect">Could Not Connect To Server...🙄</p>
                )
            ) : (
                <div className="FetchingDataLogo"> Fetching Details <i className="fa-solid fa-rotate"></i></div>
            )}
        </div>
    );
}
