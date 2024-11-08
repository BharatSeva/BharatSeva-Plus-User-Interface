import "./Searchbox.css";
import { useEffect, useState } from "react";
import { FetchData } from "../../FetchData";
import { NavLink, Navigate } from "react-router-dom";
const { v4: uuidv4 } = require("uuid");

export default function SearchPopover({ Inputvalue }) {
    const [healthcareList, setHealthcareList] = useState([]);
    const [isDataAvailable, setIsDataAvailable] = useState(true);
    const [isRedirect, setIsRedirect] = useState(false);

    async function getHealthFacilities() {
        setHealthcareList([]);
        try {
            const { data, res } = await FetchData('/appointment/healthcare');
            if (res.ok) {
                setHealthcareList(data.healthcare || []);
            } else if (res.status === 405) {
                setIsRedirect(true);
            } else {
                alert("Something Went Wrong!");
            }
        } catch (err) {
            setIsDataAvailable(false);
        }
    }

    useEffect(() => {
        getHealthFacilities();
    }, []);

    function hidePopover() {
        const hide = document.querySelector(".SearchPopoverContainer");
        hide.classList.add("SearchPopDisplayNone");
    }

    let filteredHealthcare = [];
    let searchResults = (<p>Type something to search...</p>);

    if (Inputvalue && healthcareList.length > 0) {
        filteredHealthcare = healthcareList.filter((data) =>
            data.healthcare_name.toLowerCase().includes(Inputvalue.toLowerCase())
        );
        filteredHealthcare.length = Math.min(filteredHealthcare.length, 7);

        searchResults = filteredHealthcare.length > 0 ? (
            filteredHealthcare.map((data) => (
                <NavLink
                    key={uuidv4()}
                    to={`searchhealthcare?healthcare_id=${data.healthcare_id}&healthcarename=${data.healthcare_name}`}
                >
                    <li onClick={hidePopover} className="SearchResultli">
                        <i className="fa-brands fa-searchengin fa-lg"></i>
                        {data.healthcare_name}, <br/> <span className="HealthCareCityName">📍{data.city}, {data.state}</span>
                    </li>
                </NavLink>
            ))
        ) : (
            <p className="SearchListFailed">No Result Found...😔</p>
        );
    }

    return (
        <div className="SearchPopoverContainer SearchPopDisplayNone">
            {isRedirect && <Navigate to="/client/login" />}
            {isDataAvailable ? (
                healthcareList.length > 0 ? (
                    <ul id="SearchUILI">
                        {searchResults}
                    </ul>
                ) : (
                    <p className="SearchList">Updating List...</p>
                )
            ) : (
                <p className="SearchListFailed">Could Not Connect With Server...</p>
            )}
            <p id="RefreshSearcList" onClick={getHealthFacilities}>Refresh Search List</p>
        </div>
    );
}
