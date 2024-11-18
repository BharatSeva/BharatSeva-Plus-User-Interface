import "./About.css";

export default function About() {
    const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"));
    return (
        <>
            <div className="Aboutcontainer">
                <h4>Hello, {UserData.fullname} 👋</h4>
                <p>Welcome to the Bharat Seva+ User Dashboard! We are thrilled to have you explore our platform and its features. Use the side panel to navigate through the available options.</p>
                <p>
                    This platform is currently under active development 🚀. We’re excited to announce that a cutting-edge deep learning model is in the works, designed to bring innovative enhancements to your experience and functionality.
                </p>
                <p>
                    As an early user, your feedback is invaluable to us. While some functionalities might occasionally face downtime, our primary focus remains on building a robust and scalable backend. Your patience and insights are greatly appreciated!
                </p>
                <p className="vaibhavyadavmaintained">
                    This project is passionately created and maintained by
                    <span className="Myname"> Vaibhav Yadav</span>. <br />Stay connected and share your thoughts with me on
                    <a href="https://www.linkedin.com/in/vaibhav-yadav-4397351b9" target="_blank" rel="noopener noreferrer" className="LinkedInLink">
                        LinkedIn
                    </a>.
                </p>
            </div>


        </>
    );
}
