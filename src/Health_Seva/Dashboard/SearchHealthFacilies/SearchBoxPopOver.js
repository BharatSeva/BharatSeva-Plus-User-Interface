import { useEffect, useState } from "react"
import "./Searchbox.css"


export default function SearchPopover({ Inputvalue }) {

    const [Data, SetData] = useState(false)
    const [IsData, SetIsData] = useState(true)

    async function GetHealthFacilities() {
        SetData(false)
        SetIsData(true)
        try {
            let response = await fetch('http://localhost:5000/api/v1/healthcare/Firebase/gethealthcare', {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `${localStorage.getItem("BharatSevaToken")}`
                }
            })
            let data = await response.json()
            SetData(data.healthcares)
            console.log("Search List Fetched")
        } catch (err) {
            SetIsData(false)
            alert("Could Not Fetch Search List From  Server...")
        }
    }

    useEffect(() => {
        GetHealthFacilities()
    }, [])

    let NewName = [], i = 0
    let SearchedData = (<p className="SearchList">HealthCares Names Will List Here...⌨</p>)
    if (Inputvalue && Data) {
        NewName = Data.filter((data) => data.toLowerCase().includes(Inputvalue.toLowerCase()))
        NewName.length = NewName.length > 10 ? 10 : NewName.length // This will list only Top 10 Search Result
        SearchedData = NewName.length > 0 ? NewName.map((data) => (<li key={i++}><i className="fa-brands fa-searchengin fa-lg"></i>{data}</li>)) : (<p className="SearchListFailed">No Result Found...😔</p>)
    }
    return (
        <div className="SearchPopoverContainer SearchPopDisplayNone">
            {IsData ?
                Data ?
                    (
                        <ul id="SearchUILI" >
                            {SearchedData}
                        </ul>
                    ) :
                    (<p className="SearchList">Updating List...</p>)
                : (<p className="SearchListFailed">Could Not Connect With Server...</p>)}

            <p id="RefreshSearcList" onClick={GetHealthFacilities}>Refresh Search List</p>
        </div >
    )
}