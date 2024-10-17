import Select from "react-select"
import "./Preferances.css"


export default function Preferances({ OnchangeData, SettingResponse }) {

    let Key
    if (SettingResponse) {
        Key = `${SettingResponse.Email}`
    } else {
        Key = "Updating..."
    }


    const values = [{ label: Key }]
    const Options = [
        { "label": "Weekly", "value": "Weekly", "name": "Email" },
        { "label": "Monthly", "value": "Monthly", "name": "Email" },
        { "label": "Every Events", "value": "Every Events", "name": "Email" },
        { "label": "Opt Out", "value": "Opt Out", "name": "Email" }
    ]
    return (
        <>
            <div>
                <h2 className="PreferancesHeader">Preferances</h2>

                <div className="EmailPreferancesContainer">
                    <h3 className="PreferancesHeader">Email</h3>
                    <p>I Want to Receive Email Notification </p>
                    <Select value={values} className="Email_Select" onChange={OnchangeData} options={Options} />
                    <p>You Will Still Receive Mail Regarding Activity in <br></br>Your Account..</p>
                </div>
            </div>
        </>

    )
}