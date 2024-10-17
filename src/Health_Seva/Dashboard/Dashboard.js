

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
        setLeftSidebarOpen(!leftSidebarOpen);
        setRightSidebarOpen(!rightSidebarOpen);
    };

    const toggleMessage = () => {
        if (innerMessageRef.current) {
            innerMessageRef.current.classList.toggle("DisplayInnerMessage");
        }
    };

    const toggleAccountPopover = () => {
        setAccountPopoverOpen(!accountPopoverOpen);
    };

    const toggleNotificationPopover = () => {
        setNotificationPopoverOpen(!notificationPopoverOpen);
    };

    return (
        <div className="container">
            <div className="ToggleBtn">
                <div className="Hamburger">
                    <i onClick={toggleSidebar} className="fa-solid fa-bars"></i>
                    <div className="Icontxt">Bharat सेवा+</div>
                </div>
                <div className="RightSide_Nav">
                    <SearchBox />
                    <div className={`NotificationBar ${notificationPopoverOpen ? "backgroundcolorbar" : ""}`} onClick={toggleNotificationPopover}>
                        <i className="fa-regular fa-bell fa-xlg"></i>
                    </div>
                    {notificationPopoverOpen && <NotificationPop />}
                    <div className={`Account_Nav ${accountPopoverOpen ? "backgroundcolorbar" : ""}`} onClick={toggleAccountPopover}>
                        <i className="fa-regular fa-circle-user fa-xl"></i>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                    {accountPopoverOpen && <AccountPopover />}
                </div>
            </div>

            <div className="Left_Right_container">
