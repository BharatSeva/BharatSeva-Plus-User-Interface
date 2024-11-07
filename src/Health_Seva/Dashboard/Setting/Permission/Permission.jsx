import { useState, useEffect } from "react";
import "./Permission.css";
import Select from "react-select";

export default function Permission({ OnchangeData, SettingResponse }) {
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        if (SettingResponse) {
            setSelectedValue({
                label: SettingResponse.view_permission ? "Yes" : "No",
                value: SettingResponse.view_permission,
            });
        }
    }, [SettingResponse]);

    const Options = [
        { label: "Yes", value: true, name: "view_permission" },
        { label: "No", value: false, name: "view_permission" },
    ];

    const handleChange = (option) => {
        setSelectedValue(option);
        OnchangeData(option);
    };

    return (
        <>
            <h2 className="PreferancesHeader">Permission</h2>
            <div className="LockAccount_container">
                <div>
                    <p>Allow HealthCare To View Your Data?</p>
                    <Select
                        value={selectedValue}
                        onChange={handleChange}
                        options={Options}
                        className="LockAccount_Select"
                    />
                </div>
            </div>
        </>
    );
}
