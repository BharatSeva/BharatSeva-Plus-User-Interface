import "./About.css";

export default function About() {
    const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"));
    
    return (
        <>
            <div className="Aboutcontainer">
                <h4>Hello, {UserData.fullname} 👋</h4>
                <p>Welcome to HealthUser Dashboard, Click On the Side Panel to Explore...</p>
                <p>This WebApp Is Still Under-Development with more features aligned till the next major updates, you are an early user. If you have any suggestions, I'm happy to hear them.</p>
                <p>This Project is Created and Maintained Only by <span className="Myname">Vaibhav Yadav</span></p>
            </div>
        </>
    );
}
