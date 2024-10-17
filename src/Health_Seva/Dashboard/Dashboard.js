import "./Dashboard.css"
import { default as LeftSidebar }  from "./Left_sidebar/Left_sidebar"
import AccountPopover from "./Popup/Account_popover"
import NotificationPop from "./Popup/NotificationPop"
import { default as RightSidebar } from "./Right_sidebar/Right_sidebar"
import SearchBox from "./SearchHealthFacilies/SearchBox"

export default function Dashboard() {

    document.title = "Dashboard | Bharat Seva";

    // Toggle On or off goes here
    const Change = (e) => {
        // Left side goes here
        let left_sidebar = document.querySelector(".left_sidebar")
        left_sidebar.classList.toggle("left_sidebarFlex")
        // Right One goes Here
        let right_sidebar = document.querySelector(".right_sidebar")
        right_sidebar.classList.toggle("right_sidebarFlex")
    }

    

    // Display My Message Herw
    const HiddenMsg = () => {
        let InnerMessage = document.querySelector(".InnerMessage")
        InnerMessage.classList.toggle("DisplayInnerMessage")
    }

    const ShowAccountPop = () =>{
        let ShowAccountPop = document.querySelector(".Account_popover")
        ShowAccountPop.classList.toggle("Account_popoverDisplay")
        document.querySelector(".Account_Nav").classList.toggle("backgroundcolorbar")
    }

    const ShowNotificaionPop = ()=>{
        let ShowNotificaionPop = document.querySelector(".Notification_popover")
        ShowNotificaionPop.classList.toggle("Notification_popoverDisplay")
        document.querySelector(".NoticationBar").classList.toggle("backgroundcolorbar")
    }


    return (
        <div className="container">
            {/* This One for Nav bar */}
            <div className="ToggleBtn">
                <div className="Hamburger"><i onClick={Change} className="fa-solid fa-bars"></i> <div className="Icontxt">Bharat सेवा+</div> </div>


                {/* Right Side Navigation Bar */}
                <div className="RightSide_Nav">

                    {/* Explore Near By */}
                    <SearchBox/>

                    {/* Notificaionbar */}
                    <div className="NoticationBar" onClick={ShowNotificaionPop}>
                        <i className="fa-regular fa-bell fa-xlg"></i>
                    </div>
                    <NotificationPop/>

                    {/* Account_Navigatin bar goes here */}
                    <div className="Account_Nav" onClick={ShowAccountPop}>
                        <i className="fa-regular fa-circle-user fa-xl"></i> <i className="fa-solid fa-caret-down"></i> 
                    </div>
                    <AccountPopover/>
            
                </div>
            </div>

            {/* This one for Left Side and Right Side */}
            <div className="Left_Right_container">

                {/* This One is for LeftSide View Goes Here */}
                <div className="left_sidebar">
                    <LeftSidebar toggle={Change} toggleHiddenMessage={HiddenMsg} />
                </div>


                {/* This one is for Right Side View */}
                <div className="right_sidebar">
                    <RightSidebar toggle={Change} />

                    {/* Hidden Text goes Here */}
                    <div className="InnerMessage DisplayInnerMessage">
                        <p>Made By Vaibhav Yadav</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

