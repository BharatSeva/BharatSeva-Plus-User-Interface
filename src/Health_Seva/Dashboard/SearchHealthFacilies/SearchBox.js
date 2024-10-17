import { useState } from "react"
import "./Searchbox.css"
import SearchPopover from "./SearchBoxPopOver"



export default function SearchBox() {
    const [SearchValue, SetSearchValue] = useState()
    const SearchBoxListHere = document.querySelector(".SearchPopoverContainer")
    const InputSearchBox = document.getElementById("SearchboxInput")
    InputSearchBox === document.activeElement ? (SearchValue ? SearchBoxListHere.classList.remove("SearchPopDisplayNone") : SearchBoxListHere.classList.add("SearchPopDisplayNone")) : console.log("Search For Facilities!")
    
    
    // document.addEventListener("click", () => {
        // const [Foucused, SetIsFoucused] = useState({
        //     IsFoucused: false
        // })
        //     if (Foucused.IsFoucused) {
    //         SetIsFoucused((p) => ({ ...p, IsFoucused: false }))
    //     } onFocus={() => SetIsFoucused((p) => ({ ...p, IsFoucused: true }))}
    // })



    // 

    return (
        <>
            <div className="NearBy_Nav"><input type="text" onKeyUp={(e) => SetSearchValue(e.target.value)} id="SearchboxInput" placeholder="Search Health Facilities..." autoComplete="off" /></div>
            <SearchPopover Inputvalue={SearchValue} />
        </>
    )
}