import { useEffect, useState } from "react"
import "./Searchbox.css"


export default function SearchPopover({ Inputvalue }) {

    const [Name, SetName] = useState(false)
    const [IsData, SetIsData] = useState(true)

    async function GetHealthFacilities() {
        SetName(false)
        const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))
        try {
            let response = await fetch('http://localhost:5000/api/v1/user/gethealthcarename', {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${UserData.token}`
                }
            })
            let data = await response.json()
            response.ok ? SetName(data.healthcares) : alert("Something Went Wrong!")
        } catch (err) {
            SetIsData(false)
        }
    }

    useEffect(() => {
        GetHealthFacilities()
    }, [])

    function DisplayHealthPop(id) {
        const hide = document.querySelector(".SearchPopoverContainer")
        hide.classList.add("SearchPopDisplayNone")
        // const PopInfo = document.querySelector(".HealthCareInformationPopOuterContainer")
        // PopInfo.classList.remove("DisplaymeOne")
    }

    let NewName = [], i = 0
    let SearchedData = (<p className="SearchList">HealthCares Names Will List Here...⌨</p>)
    if (Inputvalue && Name) {
        NewName = Name.filter((data) => data.name.toLowerCase().includes(Inputvalue.toLowerCase()))
        NewName.length = NewName.length > 10 ? 10 : NewName.length // This will list maximum of Top 10 Search Result
        SearchedData = NewName.length > 0 ? NewName.map((data) => (<li onClick={DisplayHealthPop} className="SearchResultli" key={data.id}><i className="fa-brands fa-searchengin fa-lg"></i>{data.name}, <span className="HealthCareCityName">{data.location.city}, {data.location.state}</span></li>)) : (<p className="SearchListFailed">No Result Found...😔</p>)
    }
    return (
        <div className="SearchPopoverContainer SearchPopDisplayNone">
            {IsData ?
                Name ?
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