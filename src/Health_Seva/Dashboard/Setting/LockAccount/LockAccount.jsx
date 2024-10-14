import "./LockAccount.css"
import Select from "react-select"
export default function LockAccount({ OnchangeData, SettingResponse }) {

    let Key
    if (SettingResponse) {
        Key = `${SettingResponse.LockedAccount}`
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


                <p className="LockAccount_NoticeRR">You can Reactivate Your Account Any Time You Want !</p>
            </div>
            <p className="LockAccount_Notice">If You Lock Your Account, HealthCare Can See still see Your Data but they can't make any changes to your records !</p>
            <p className="LockAccount_Notice">Account Can Also be Auto Locked If We Didn't notice any Activity Within 9-12 months,
                this usually happens when the account holder left.
            </p>
        </>
    )
}