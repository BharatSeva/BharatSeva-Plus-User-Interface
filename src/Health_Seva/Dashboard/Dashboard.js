import React, { useState, useRef } from "react";
import "./Dashboard.css";
import Left_sidebar from "./Left_sidebar/Left_sidebar";
import AccountPopover from "./Popup/Account_popover";
import NotificationPop from "./Popup/NotificationPop";
import Right_sidebar from "./Right_sidebar/Right_sidebar";
import SearchBox from "./SearchHealthFacilies/SearchBox";

export default function Dashboard() {
    // State to manage toggling of left and right sidebars
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

    // State to manage the visibility of Account and Notification popovers
    const [accountPopoverOpen, setAccountPopoverOpen] = useState(false);
    const [notificationPopoverOpen, setNotificationPopoverOpen] = useState(false);

    // useRef to store reference of the hidden message element
    const innerMessageRef = useRef(null);

    // Set document title
    document.title = "Dashboard | Bharat Seva";

    // Function to toggle the visibility of both sidebars
    const toggleSidebar = () => {
        setLeftSidebarOpen(!leftSidebarOpen);             // this will Toggle left sidebar
        setRightSidebarOpen(!rightSidebarOpen);           // this will Toggle right sidebar
    };

    // Function to toggle the display of the hidden message
    const toggleMessage = () => {
        if (innerMessageRef.current) {
            innerMessageRef.current.classList.toggle("DisplayInnerMessage");
        }
    };

    // Function to toggle the Account popover
    const toggleAccountPopover = () => {
        setAccountPopoverOpen(!accountPopoverOpen);
    };

    // Function to toggle the Notification popover
    const toggleNotificationPopover = () => {
        setNotificationPopoverOpen(!notificationPopoverOpen);
    };

    return (
        <div className="container">
            {/* Navbar Section */}
            <div className="ToggleBtn">
                {/* Hamburger Icon and App Name */}
                <div className="Hamburger">
                    <i onClick={toggleSidebar} className="fa-solid fa-bars"></i>
                    <div className="Icontxt">Bharat सेवा+</div>
                </div>

                {/* Right-side Navigation */}
                <div className="RightSide_Nav">
                    {/* SearchBox for exploring nearby facilities */}
                    <SearchBox />

                    {/* Notification Icon and Popover */}
                    <div className={`NoticationBar ${notificationPopoverOpen ? "backgroundcolorbar" : ""}`} onClick={toggleNotificationPopover}>
                        <i className="fa-regular fa-bell fa-xlg"></i>
                    </div>
                    {notificationPopoverOpen && <NotificationPop />} {/* Conditionally render NotificationPop */}

                    {/* Account Icon and Popover */}
                    <div className={`Account_Nav ${accountPopoverOpen ? "backgroundcolorbar" : ""}`} onClick={toggleAccountPopover}>
                        <i className="fa-regular fa-circle-user fa-xl"></i>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                    {accountPopoverOpen && <AccountPopover />} {/* Conditionally render AccountPopover */}
                </div>
            </div>

            {/* Container for Left and Right Sidebars */}
            <div className="Left_Right_container">
                {/* Left Sidebar */}
                <div className={`left_sidebar ${leftSidebarOpen ? "left_sidebarFlex" : ""}`}>
                    <Left_sidebar toggle={toggleSidebar} toggleHiddenMessage={toggleMessage} />
                </div>

                {/* Right Sidebar */}
                <div className={`right_sidebar ${rightSidebarOpen ? "right_sidebarFlex" : ""}`}>
                    <Right_sidebar toggle={toggleSidebar} />

                    {/* Hidden Message Section */}
                    <div ref={innerMessageRef} className="InnerMessage DisplayInnerMessage">
                        <p>Made By Vaibhav Yadav</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
