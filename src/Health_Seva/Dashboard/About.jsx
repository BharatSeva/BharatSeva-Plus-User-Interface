import "./About.css";

export default function About() {
    const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"));
    return (
        <>
            <div className="Aboutcontainer">
                <h4>Hello, {UserData.fullname} 👋</h4>
                <p>Welcome to the Bharat Seva+ User Dashboard! Explore our features by navigating through the side panel.</p>
                <p>
                    This project is currently under development 🚀. We are actively working on introducing exciting updates,
                    including the integration of a cutting-edge deep learning model to enhance user experience and functionality.
                </p>
                <p>
                    You are one of our early users, and we deeply value your feedback. If you have suggestions or ideas, feel free
                    to share them with us!
                </p>
                <p className="vaibhavyadavmaintained">
                    This project is passionately created and maintained by
                    <span className="Myname"> Vaibhav Yadav</span>. <br/>Connect with me on 
                    <a href="https://www.linkedin.com/in/vaibhav-yadav-4397351b9" target="_blank" rel="noopener noreferrer" className="LinkedInLink">
                         LinkedIn
                    </a>.
                </p>
            </div>

        </>
    );
}
