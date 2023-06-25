import { useState } from "react"
import "./Searchbox.css"
import SearchPopover from "./SearchBoxPopOver"



export default function SearchBox() {
    const [SearchValue, SetSearchValue] = useState()
    const SearchBoxListHere = document.querySelector(".SearchPopoverContainer")
    const InputSearchBox = document.getElementById("SearchboxInput")
    InputSearchBox === document.activeElement ? (SearchValue ? SearchBoxListHere.classList.remove("SearchPopDisplayNone") : SearchBoxListHere.classList.add("SearchPopDisplayNone")) : console.log("Search For Facilities!")
    return (
        <>
            <div className="NearBy_Nav"><input type="text" onKeyUp={(e) => SetSearchValue(e.target.value)} id="SearchboxInput" placeholder="Search Health Facilities..." autoComplete="off" /></div>
            <SearchPopover Inputvalue={SearchValue} />
        </>
    )
}