import "./IndexPage.css";
import { NavLink } from "react-router-dom";
import BharatSevaLogo1 from "../Images_Assests/BharatSevaLogo1.png";

export default function IndexPage() {
    return (
        <>
            <div className="IndexPageContainer DisplayFlexX">
                <h2>Welcome to Bharat Seva+!</h2>
                <div className="IndexNameContainer DisplayFlexX">
                    <img src={BharatSevaLogo1} alt="Bharat Seva+ Logo" />
                </div>

                <div className="IndexAboutContainer">
                    <p>
                        Bharat Seva+ is your trusted healthcare management platform, designed to simplify health record management, appointments, and seamless communication between patients and healthcare professionals.
                    </p>
                    <p>
                        With its user-friendly interface, Bharat Seva+ empowers users to log comprehensive health records, access personalized insights*, and ensure secure storage for their vital health data.
                    </p>
                    <p>
                        Take charge of your healthcare journey with ease, convenience, and peace of mind. Your well-being, simplified!
                    </p>
                </div>

                <div className="projectinfo width80vw">
                    <h2>About the Project</h2>
                    <div className="IndexPageAboutApp">
                        <p>This project consists of two integrated web apps:</p>
                        <ul>
                            <a href="https://github.com/BharatSeva/HealthCare-Interface" target="_blank" rel="noreferrer">
                                <li>Healthcare Interface <span className="GoToSitePage">Visit Site</span></li>
                            </a>
                            <a href="https://github.com/BharatSeva/Client-Interface" target="_blank" rel="noreferrer">
                                <li>Client Interface <span className="GoToSitePage">Visit Site</span></li>
                            </a>
                        </ul>
                        <p>
                            The <i>Healthcare Interface</i> generates and manages health logs for HIPs and HIUs, enabling efficient handling of patient records and data.
                            Meanwhile, the <i>User Interface</i> serves as a platform for patients to access and manage their health records seamlessly.
                        </p>
                    </div>

                    <div className="projectdetails">
                        <h3>Project Highlights</h3>
                        <ul>
                            <li>
                                Learn more through my
                                <a href="https://github.com/BharatSeva" target="_blank" rel="noreferrer">
                                    <span className="GoToSitePage"> Org </span>
                                </a>
                                or watch the demo
                                <a href="https://youtube.com/playlist?list=PLXRQ5AMta2AI_jZlGr0A5owICnGkDpElO" target="_blank" rel="noreferrer">
                                    <span className="GoToSitePage"> View Playlist</span>
                                </a>.
                            </li>
                            <li>
                                Built using Golang, Express.js, Python, Nginx, Docker, CI/CD, Linux, Redis, RabbitMQ, PostgreSQL stack and managed by
                                <a href="https://vaibhavyadav-dev.github.io/MyPortfolio/" target="_blank" rel="noreferrer">
                                    <span className="GoToSitePage"> Vaibhav Yadav</span>
                                </a>.
                            </li>
                            <li>
                                Hosted on <a href="https://nginx.org/" target="_blank" rel="noreferrer">
                                    <span className="GoToSitePage">Nginx</span>
                                </a> and deployed via Docker on Linux Server.
                            </li>
                            <li>Development Time: ~3 months</li>
                            <li>
                                Upcoming Features*: AI to better monitor your health data, Video-Text messaging, enhanced mobile view, and more!
                            </li>
                            <li>
                                Queries or feedback? Feel free to
                                <a href="mailto:21vaibhav11@gmail.com">
                                    <span className="GoToSitePageMailMe">Email Me</span>
                                </a>.
                            </li>
                        </ul>
                        <h3>Thank You for Your Interest 💗</h3>
                    </div>
                </div>

                <p className="infomessage">*Planned for future updates</p>

                <NavLink to="/client/login">
                    <div className="gotologinpageIndex">
                        <p>Proceed to Login</p>
                    </div>
                </NavLink>
            </div>
        </>
    );
}
