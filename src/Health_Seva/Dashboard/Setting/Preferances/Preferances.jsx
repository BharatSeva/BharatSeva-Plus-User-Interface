import Select from "react-select"
import "./Preferances.css"


export default function Preferances({ OnchangeData, SettingResponse }) {

    let Key
    if (SettingResponse) {
        Key = `${SettingResponse.email}`
    } else {
        Key = "Updating..."
    }


    const values = [{ label: Key }]
    const Options = [
        { "label": "Weekly", "value": "Weekly", "name": "email" },
        { "label": "Monthly", "value": "Monthly", "name": "email" },
        { "label": "Every Event", "value": "Every Event", "name": "email" },
        { "label": "Opt Out", "value": "Opt Out", "name": "email" }
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