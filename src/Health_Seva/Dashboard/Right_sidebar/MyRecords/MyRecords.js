import { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import "./MyRecords.css";
import { FetchData } from "../../../FetchData";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const formatDateAndTime = (rawDate) => {
    const dateObj = new Date(rawDate);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return `${formattedDate} - ${formattedTime}`;
};

const medicalSeverityOptions = [
    { label: "Dangerous", value: "Dangerous" },
    { label: "High", value: "High" },
    { label: "Semi-Mid", value: "Semi-Mid" },
    { label: "Low", value: "Low" },
];

export default function MyRecords() {
    const [userData, setUserData] = useState(null);
    const [filters, setFilters] = useState({ month: null, severity: null });
    const [isSearched, setIsSearched] = useState(false);
    const [fetchStatus, setFetchStatus] = useState({ isFetched: false, isGood: false });
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setFetchStatus({ isFetched: false, isGood: false });
            try {
                const { data, res } = await FetchData(`/records?limit=10`);
                if (res.ok) {
                    setUserData(data);
                    setFetchStatus({ isFetched: true, isGood: true });
                } else if (res.status === 405) {
                    setIsRedirect(true);
                } else {
                    throw new Error("Failed to fetch data.");
                }
            } catch (err) {
                alert("Could Not Connect to Server!");
                console.error(err);
                setFetchStatus({ isFetched: true, isGood: false });
            }
        };
        fetchData();
    }, []);

    const clearFilters = () => {
        setFilters({ month: null, severity: null });
        setIsSearched(false);
    };

    const handleFilterChange = (filterType) => (selectedOption) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: selectedOption?.value || null,
        }));
        setIsSearched(true);
    };

    const filteredRecords = useMemo(() => {
        if (!userData?.records) return [];
        let records = userData.records;
        if (filters.month) {
            records = records.filter((record) =>
                record.created_at.includes(filters.month)
            );
        }
        if (filters.severity) {
            records = records.filter((record) =>
                record.medical_severity.includes(filters.severity)
            );
        }
        return records;
    }, [userData, filters]);

    const displayRecords = (data) => (
        <div key={uuidv4()} className="Health_Record_Containers">
            <div className="Health_Issue">
                <div className="Issue_Statement">Issue :</div>
                <div className="Issues">{data.issue}</div>
            </div>
            <div className="Description">
                <div className="Issue_Statement">Description :</div>
                <div className="Issues">{data.description}</div>
            </div>
            <div className="HIP_name">
                <div className="Issue_Statement">Healthcare Name :</div>
                <div className="Issues">{data.healthcare_name}</div>
            </div>
            <div className="HIP_name">
                <div className="Issue_Statement">Healthcare ID :</div>
                <div className="Issues">{data.createdby_}</div>
            </div>
            <div className="Issue_Date">
                <div className="Issue_Statement">Issue Date :</div>
                <div className="Issues">{formatDateAndTime(data.created_at)}</div>
            </div>
            <div className="Medical_Severity">
                <div className="Issue_Statement">Medical Severity :</div>
                <div className={data.medical_severity==="High" ? "coloredofseverity Issues" : "Issues cololimeofseverity"}>{data.medical_severity}</div>
            </div>
        </div>
    );

    return (
        <>
            {isRedirect && <Navigate to="/client/login" />}
            <div className="MyRecordsOuterContainer">
                {fetchStatus.isFetched ? (
                    fetchStatus.isGood ? (
                        <div className="MyRecordsContainer">
                            <div className="MyRecordHeader">
                                <h3>My Records</h3>
                                <p>
                                    Last Updated At:{" "}
                                    {userData?.records?.[0]
                                        ? formatDateAndTime(userData.records[0].created_at)
                                        : "--/--"}
                                </p>
                                <div className="MyRecordsFilterContainer">
                                    <p>Filter By Medical Severity</p>
                                    <Select
                                        options={medicalSeverityOptions}
                                        className="MyRecordsFilter"
                                        onChange={handleFilterChange("severity")}
                                    />
                                    <button
                                        id="myrecordsFilterbtn"
                                        className={isSearched ? "myrecordsClearbtn" : "btnnoselected"}
                                        onClick={clearFilters}
                                    >
                                        Clear Filter
                                    </button>
                                </div>
                            </div> 
                            <div className="Records">
                                {isSearched && filteredRecords.length === 0 ? (
                                    <p>No Results Found!</p>
                                ) : (
                                    filteredRecords.map(displayRecords)
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="Couldnotconnect">Could Not Connect to Server...🙄</p>
                    )
                ) : (
                    <div className="FetchingDataLogo">
                        Fetching Records <i className="fa-solid fa-rotate"></i>
                    </div>
                )}
            </div>
        </>
    );
}
