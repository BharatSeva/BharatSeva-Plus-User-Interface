import "./About.css"


export default function About() {

    const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))
    return (
        <>
            <div className="Aboutcontainer">
                <h4>Hello, {UserData.name} 👋</h4>
                <p>Welcome to HealthUser Dashboard, Click On the Side Panel to Explore...</p>
                <p>This WebApp Is Still Under-Development with more features aligned till the next major updates, you are early user, if you have any suggestion I'm happy to hear.</p>
                <p>This Project is Created and Maintained Only by <span className="Myname">Vaibhav Yadav</span></p>
            </div>
        </>
    )
}