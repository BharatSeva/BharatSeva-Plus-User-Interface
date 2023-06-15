import "./LockAccount.css"
import Select from "react-select"
import { useEffect } from "react"
export default function LockAccount({ OnchangeData, SettingResponse }) {

    let Key
    if (SettingResponse) {
        Key = `${SettingResponse.Data.LockedAccount}`
    } else {
        Key = "Updating..."
    }
    const values = [{ label: Key }]
    const Options = [{ "label": "Yes", "value": "Yes", "name": "LockedAccount" }, { "label": "No", "value": "No", "name": "LockedAccount" }]
    // const Options = [{ "label": "Yes", "value": true, "name":"EmailOpt" }, { "label": "No", "value": false, "name":"EmailOpt" }]
    return (
        <>
            <h2 className="LockAccount_Header">Lock Your Account</h2>
            <div className="LockAccount_container">
                <p>Do You Want To Lock Your Account ? (Not Recommended)</p>
                <Select value={values} className="LockAccount_Select" onChange={OnchangeData} options={Options} />


                <note className="LockAccount_NoticeRR">You can Reactivate Your Account Any Time You Want !</note>
            </div>
            <p className="LockAccount_Notice">If You Lock Your Account HealthCare Can See still see Your Data but <br></br>they can't update your records !</p>
            <p className="LockAccount_Notice">Account Can Also be Auto Locked If We Didn't notice any Activity <br></br>Within 9-12 months,
                this usually happens when the account holder died.
            </p>
        </>
    )
}