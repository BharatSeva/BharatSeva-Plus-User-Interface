import "./Permission.css"
import Select from "react-select"

export default function Permission({ OnchangeData, SettingResponse }) {




    let Key
    if (SettingResponse) {
        Key = `${SettingResponse.Data.View_permission}`
    } else {
        Key = "Updating..."
    }


    const values = [{ label: Key }]

    const Options = [
        { "label": "No", "value": "No", "name": "View_permission" },
        { "label": "Yes", "value": "Yes", "name": "View_permission" }
    ]
    return (
        <>
            <h2 className="PreferancesHeader">Permission</h2>
            <div className="LockAccount_container">

                <div>
                    <p>Allow HealthCare To View Your Data ?</p>
                    <Select value={values} onChange={OnchangeData} options={Options} className="LockAccount_Select" />




                </div>
            </div>
        </>
    )
}

