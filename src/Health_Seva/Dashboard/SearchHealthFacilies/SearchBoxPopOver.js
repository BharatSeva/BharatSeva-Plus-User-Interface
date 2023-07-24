import "./Searchbox.css"
import { useEffect, useState } from "react"
import { FetchData } from "../../FetchData"
import { NavLink, Navigate } from "react-router-dom"
const { v4: uuidv4 } = require('uuid');

export default function SearchPopover({ Inputvalue }) {

    const [Name, SetName] = useState(false)
    const [IsData, SetIsData] = useState(true)
    const [Isredirect, SetIsredirect] = useState(false)


    async function GetHealthFacilities() {
        SetName(false)

        try {
            const { data, res } = await FetchData('/api/v1/user/gethealthcarename')
            if (res.ok) {
                SetName(data.healthcares)
            }
            else if (res.status === 405) { SetIsredirect(true) }
            else {
                alert("Something Went Wrong!")
            }
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
    }

    let NewName = []
    let SearchedData = (<p>Type Something to search for...</p>)
    if (Inputvalue && Name) {
        NewName = Name.filter((data) => data.name.toLowerCase().includes(Inputvalue.toLowerCase()))
        NewName.length = NewName.length > 7 ? 7 : NewName.length // This will list maximum of Top 7 Search Result
        SearchedData = NewName.length > 0 ? NewName.map((data) => (<NavLink key={uuidv4()} to={`searchhealthcare?id=${data.id}&healthcarename=${data.name}`}><li onClick={DisplayHealthPop} className="SearchResultli"><i className="fa-brands fa-searchengin fa-lg"></i>{data.name}, <span className="HealthCareCityName">{data.location.city}, {data.location.state}</span></li></NavLink>)) : (<p className="SearchListFailed">No Result Found...😔</p>)
    }
    return (
        <div className={`SearchPopoverContainer SearchPopDisplayNone`}>
            {Isredirect && <Navigate to='/user/login' />}
            {IsData ?
                Name ?
                    (
                        <ul id="SearchUILI" key={uuidv4()}>
                            {SearchedData}
                        </ul>
                    ) :
                    (<p className="SearchList">Updating List...</p>)
                : (<p className="SearchListFailed">Could Not Connect With Server...</p>)}

            <p id="RefreshSearcList" onClick={GetHealthFacilities}>Refresh Search List</p>
        </div >
    )
}