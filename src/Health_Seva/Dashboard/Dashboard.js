import { default as LeftSidebar }  from "./Left_sidebar/Left_sidebar"
import AccountPopover from "./Popup/Account_popover"
import NotificationPop from "./Popup/NotificationPop"
import { default as RightSidebar } from "./Right_sidebar/Right_sidebar"
import SearchBox from "./SearchHealthFacilies/SearchBox"

export default function Dashboard() {
    document.title = "Dashboard | Bharat Seva";

    const Change = (e) => {
        let left_sidebar = document.querySelector(".left_sidebar")
        left_sidebar.classList.toggle("left_sidebarFlex")
        let right_sidebar = document.querySelector(".right_sidebar")
        right_sidebar.classList.toggle("right_sidebarFlex")
    }

    const HiddenMsg = () => {
        let InnerMessage = document.querySelector(".InnerMessage")
        InnerMessage.classList.toggle("hidden")
    }

    const ShowAccountPop = () =>{
        let ShowAccountPop = document.querySelector(".Account_popover")
        ShowAccountPop.classList.toggle("Account_popoverDisplay")
        document.querySelector(".Account_Nav").classList.toggle("bg-gray-500")
    }

    const ShowNotificaionPop = ()=>{
        let ShowNotificaionPop = document.querySelector(".Notification_popover")
        ShowNotificaionPop.classList.toggle("Notification_popoverDisplay")
        document.querySelector(".NoticationBar").classList.toggle("bg-gray-500")
    }

    return (
        <div className="container">
            {/* Nav bar */}
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <i onClick={Change} className="fa-solid fa-bars border border-gray-600 cursor-pointer"></i> 
                    <div className="ml-2">Bharat सेवा+</div>
                </div>

                {/* Right Side Navigation Bar */}
                <div className="w-[35vw] flex justify-around items-center">
                    {/* Explore Near By */}
                    <SearchBox/>

                    {/* Notification bar */}
                    <div 
                        className="h-[4vh] w-[3vw] flex justify-center items-center border border-gray-600 rounded hover:bg-gray-500 hover:cursor-pointer transition-all duration-300" 
                        onClick={ShowNotificaionPop}
                    >
                        <i className="fa-regular fa-bell fa-xlg"></i>
                    </div>
                    <NotificationPop/>

                    {/* Account Navigation */}
                    <div 
                        className="w-[6vw] h-[6vh] flex justify-between items-center border border-gray-600 rounded p-2 hover:bg-gray-500 hover:cursor-pointer transition-all duration-300" 
                        onClick={ShowAccountPop}
                    >
                        <i className="fa-regular fa-circle-user fa-xl"></i> 
                        <i className="fa-solid fa-caret-down"></i> 
                    </div>
                    <AccountPopover/>
                </div>
            </div>

            {/* Left Side and Right Side Container */}
            <div className="flex">
                {/* Left Side View */}
                <div className="left_sidebar">
                    <LeftSidebar toggle={Change} toggleHiddenMessage={HiddenMsg} />
                </div>

                {/* Right Side View */}
                <div className="right_sidebar">
                    <RightSidebar toggle={Change} />

                    {/* Hidden Text */}
                    <div className="h-[50vh] w-screen flex justify-center items-center m-0 top-0 left-0 InnerMessage hidden transition-all duration-1000">
                        <p className="text-center text-[5vh] m-0">Made By Vaibhav Yadav</p>
                    </div>
                </div>
            </div>
        </div>
    )
}