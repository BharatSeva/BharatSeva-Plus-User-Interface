import { useEffect, useRef, useState } from 'react';
import SearchBox from './SearchBox'; // Import the SearchBox component
import NotificationPop from './NotificationPop'; // Import the NotificationPop component
import AccountPopover from './AccountPopover'; // Import the AccountPopover component

export default function Dashboard() {
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [accountPopoverOpen, setAccountPopoverOpen] = useState(false);
    const [notificationPopoverOpen, setNotificationPopoverOpen] = useState(false);
    const innerMessageRef = useRef(null);

    useEffect(() => {
        document.title = "Dashboard | Bharat Seva";
    }, []);

    const toggleSidebar = () => {
        setLeftSidebarOpen((prev) => !prev);
        setRightSidebarOpen((prev) => !prev);
    };

    const toggleMessage = () => {
        if (innerMessageRef.current) {
            innerMessageRef.current.classList.toggle("DisplayInnerMessage");
        }
    };

    const toggleAccountPopover = () => {
        setAccountPopoverOpen((prev) => !prev);
    };

    const toggleNotificationPopover = () => {
        setNotificationPopoverOpen((prev) => !prev);
    };

    return (
        <div className="container">
            <div className="ToggleBtn">
                <div className="Hamburger">
                    <button 
                        onClick={toggleSidebar} 
                        aria-label="Toggle Sidebar" 
                        className="fa-solid fa-bars"
                    />
                    <div className="Icontxt">Bharat सेवा+</div>
                </div>
                <div className="RightSide_Nav">
                    <SearchBox />
                    <button 
                        onClick={toggleNotificationPopover} 
                        aria-label="Notifications" 
                        className={`NotificationBar ${notificationPopoverOpen ? "backgroundcolorbar" : ""}`}
                    >
                        <i className="fa-regular fa-bell fa-xl"></i>
                    </button>
                    {notificationPopoverOpen && <NotificationPop />}
                    <button 
                        onClick={toggleAccountPopover} 
                        aria-label="Account Options" 
                        className={`Account_Nav ${accountPopoverOpen ? "backgroundcolorbar" : ""}`}
                    >
                        <i className="fa-regular fa-circle-user fa-xl"></i>
                        <i className="fa-solid fa-caret-down"></i>
                    </button>
                    {accountPopoverOpen && <AccountPopover />}
                </div>
            </div>

            <div className="Left_Right_container">
                {/* Rest of your component content goes here */}
            </div>
        </div>
    );
}
