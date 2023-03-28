import "./Left_sidebar.css"


export default function Left_sidebar({toggle, toggleHiddenMessage}){
    // This one for menu options
    function settingMenu(){
        let Extramenu_setting = document.querySelector(".Extramenu")
        Extramenu_setting.classList.toggle("Extramenu-settingDisplay")
    }

    // This one for Tools Menu Collapse
    const ToolsExtraMenu =()=>{
        let ToolsExtraMenu = document.querySelector(".ToolsExtraMenu")
        ToolsExtraMenu.classList.toggle("Extramenu-settingDisplay")
    }
    
    return(
        <div className="LLside">
            {/* Container Goes Here */}
            <div className="column_container">
                {/* <!-- Text COntainer Goes Here --> */}
                <div className="column_textcontainer">
                    <div className="col Home"><i className="fa-solid fa-house-user"></i> <div className="Home-innetxt">Home</div></div>
                    <div className="col Profile"><i className="fa-regular fa-id-badge"></i><div className="Profile-txt">My Records</div></div>
                    <div className="col Setting " onClick={settingMenu}><i className="fa-solid fa-gear"></i>
                        <div className="Setting-txt"><div className="Settingtxtcontent">Settings</div>
                        <div className="Setting-fontawesome"><i className="fa-solid fa-chevron-down"></i></div></div>
                    </div>
                    <div className="Extramenu">
                        <ul>
                            <li>Permission</li>
                            <li>Change Appearance</li>
                            <li>Preferances</li>
                            <li>Lock My Account</li>
                        </ul>
                    </div>
                    <div className="col Tools" onClick={ToolsExtraMenu} ><i className="fa-solid fa-wrench"></i>
                            <div className="Tools_Section">
                            <div className="Tools-txt">Tools</div>
                            <div className="Tools-fontawesome"><i className="fa-solid fa-chevron-down"></i></div>
                            </div>
                    </div>
                    {/* This one for Tools */}
                    <div className="Extramenu ToolsExtraMenu">
                        <ul>
                            <li>My Payments</li>
                            <li>Who Viewed My Records</li>
                            <li>Invoke Permission</li>
                            <li>Generate Report</li>
                        </ul>
                    </div>
                    {/* <div className="col Contact"><i className="fa-solid fa-location-dot"></i><div className="Contact-txt">Health Care Nearby</div></div> */}
                    {/* <div className="col logout"><i className="fa-solid fa-right-from-bracket"></i><div className="Log-Out-txt">Log Out</div></div> */}
                    {/* <div className="col About"><i className="fa-solid fa-user"></i><div className="About-txt">About</div></div> */}
                </div>
            
                <div className="LLside_downside">
                <ul>
                    <li>Contact Us</li>
                    <li onClick={()=>toggleHiddenMessage()}>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Security</li>
                    <li> Our Data Centers</li>
                </ul>
                </div>

            </div>  
               
        </div>
    )
}