import { useEffect, useState } from "react";
import Select from "react-select";
import "./MyRecords.css";
import { FetchData } from "../../../FetchData";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SEVERITY_OPTIONS = [
    { label: "Dangerous", value: "Dangerous", name: "Medical" },
    { label: "High", value: "High", name: "Medical" },
    { label: "Semi-Mid", value: "Semi-Mid", name: "Medical" },
    { label: "Low", value: "Low", name: "Medical" }
];

const MONTH_OPTIONS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
].map(month => ({ label: month, value: month, name: "Months" }));



const formatDateAndTime = (rawDate) => {
    const dateObj = new Date(rawDate);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    const formattedTime = dateObj.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    return `${formattedDate} - ${formattedTime}`;
};

const RecordItem = ({ data }) => (
    <div className="health-record-container">
        <div className="record-field">
            <div className="field-label">Issue:</div>
            <div className="field-value">{data.issue}</div>
        </div>
        <div className="record-field">
            <div className="field-label">Description:</div>
            <div className="field-value">{data.description}</div>
        </div>
        <div className="record-field">
            <div className="field-label">Issue Date:</div>
            <div className="field-value">{formatDateAndTime(data.created_at)}</div>
        </div>
        <div className="record-field">
            <div className="field-label">Medical Severity:</div>
            <div className="field-value">{data.medical_severity}</div>
        </div>
        <div className="record-field">
            <div className="field-label">Healthcare:</div>
            <div className="field-value">{data.healthcare_name}</div>
        </div>
        <div className="record-field">
            <div className="field-label">Healthcare ID:</div>
            <div className="field-value">{data.health_id}</div>
        </div>
    </div>
);

export default function MyRecords() {
    const [userData, setUserData] = useState({ records: [] });
    const [filterMonth, setFilterMonth] = useState([]);
    const [filterSeverity, setFilterSeverity] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [fetchStatus, setFetchStatus] = useState({
        isFetched: false,
        isSuccess: false,
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [monthSelectValue, setMonthSelectValue] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            setFetchStatus(prev => ({ ...prev, isFetched: false }));
            try {
                const { data, res } = await FetchData("/issue");
                if (res.ok) {
                    setUserData(data);
                    setFetchStatus(prev => ({ ...prev, isSuccess: true }));
                } else if (res.status === 405) {
                    setShouldRedirect(true);
                }
            } catch (err) {
                console.error("Failed to fetch records:", err);
                alert("Could Not Connect to Server!");
            }
            setFetchStatus(prev => ({ ...prev, isFetched: true }));
        };

        fetchRecords();
    }, []);

    const handleMonthFilter = (selection) => {
        if (!userData.records.length) return;

        setMonthSelectValue(selection);
        const filteredRecords = userData.records.filter(data =>
            selection.value === new Date(data.created_at)
                .toLocaleString("default", { month: "long" })
        );
        setFilterMonth(filteredRecords);
        setIsSearched(true);
    };

    const handleSeverityFilter = (selection) => {
        if (!userData.records.length) return;

        const baseRecords = filterMonth.length ? filterMonth : userData.records;
        const filteredRecords = baseRecords.filter(
            data => data.medical_severity === selection.value
        );
        setFilterSeverity(filteredRecords);
        setIsSearched(true);
    };

    const clearFilters = () => {
        setMonthSelectValue(null);
        setFilterMonth([]);
        setFilterSeverity([]);
        setIsSearched(false);
    };

    const getDisplayRecords = () => {
        if (!isSearched) {
            return userData.records.map(data => (
                <RecordItem key={uuidv4()} data={data} />
            ));
        }

        const recordsToDisplay = filterSeverity.length ? filterSeverity :
            filterMonth.length ? filterMonth : [];

        return recordsToDisplay.length ?
            recordsToDisplay.map(data => <RecordItem key={uuidv4()} data={data} />) :
            <p>No Result Found!</p>;
    };

    if (shouldRedirect) {
        return <Navigate to="/client/login" />;
    }

    if (!fetchStatus.isFetched) {
        return (
            <div className="fetching-container">
                <span>Fetching Records</span>
                <i className="fa-solid fa-rotate" />
            </div>
        );
    }

    if (!fetchStatus.isSuccess) {
        return <p className="error-message">Could Not Connect to Server...🙄</p>;
    }

    return (
        <div className="records-outer-container">
            <div className="records-container">
                <div className="records-header">
                    <h3 className="poppins-thin">My Records</h3>
                    {userData.records.length > 0 && (
                        <p className="last-updated">
                            Last Updated At:{" "}
                            <span className="timestamp">
                                {formatDateAndTime(userData.records[0].created_at)}
                            </span>
                        </p>
                    )}
                    <div className="filters-container">
                        <div className="filter-group">
                            <p>Filter By Month</p>
                            <Select
                                options={MONTH_OPTIONS}
                                className="filter-select month-filter"
                                onChange={handleMonthFilter}
                                value={monthSelectValue}
                            />
                        </div>
                        <div className="filter-group">
                            <p>Filter By Medical Severity</p>
                            <Select
                                options={SEVERITY_OPTIONS}
                                className="filter-select severity-filter"
                                onChange={handleSeverityFilter}
                            />
                        </div>
                        <button
                            className={`filter-clear-btn ${isSearched ? "active" : ""}`}
                            onClick={clearFilters}
                            disabled={!isSearched}
                        >
                            Clear Filter
                        </button>
                    </div>
                </div>
                <div className="records-list">
                    {userData.records.length ? (
                        getDisplayRecords()
                    ) : (
                        <p className="empty-message">You don't have any medical records yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}